#!/usr/bin/env python3
"""Contract-pack validator (F1, DEC-0005).

Python 3.11+ standard library only. Validates, read-only:

1. Strict JSON with duplicate-key rejection for every contract-pack JSON file.
2. Schema well-formedness: every schema declares the 2020-12 dialect, a
   stable tag: $id, a titled object root with additionalProperties false and
   a schema_version const; internal and cross-schema $refs resolve.
3. Lifecycle machine well-formedness: closed transition maps over declared
   states, reachable states, terminal states without exits, entry states
   declared, inferred transitions documented.
4. Charter artifact coherence: accepted status, authority-host and approval
   -layer enumerations in schemas match the charter artifacts exactly.
5. Fixture validation: every fixture instance validates against its declared
   schema (subset validator) and round-trips deterministically
   (parse -> canonical serialize -> reparse -> equal).

Structural success proves contract shape only, never content correctness or
project readiness. Exit 0 on pass, 1 on any failure.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # packages/contracts
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def reject_duplicates(pairs):
    seen = {}
    for key, value in pairs:
        if key in seen:
            raise ValueError(f"duplicate key: {key}")
        seen[key] = value
    return seen


def load_strict(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=reject_duplicates)
    except (ValueError, OSError) as exc:
        fail(f"{path.relative_to(ROOT)}: {exc}")
        return None


# ---------------------------------------------------------------- subset validator
def validate_instance(instance, schema, registry, path="$"):
    """Subset of JSON Schema 2020-12 sufficient for this pack's contracts."""
    if "$ref" in schema:
        target = registry.get(schema["$ref"])
        if target is None:
            fail(f"{path}: unresolved $ref {schema['$ref']}")
            return
        validate_instance(instance, target, registry, path)
        return
    if "const" in schema and instance != schema["const"]:
        fail(f"{path}: expected const {schema['const']!r}")
        return
    if "enum" in schema and instance not in schema["enum"]:
        fail(f"{path}: {instance!r} not in enum")
        return
    types = schema.get("type")
    if types is not None:
        allowed = types if isinstance(types, list) else [types]
        kind = (
            "null" if instance is None
            else "boolean" if isinstance(instance, bool)
            else "integer" if isinstance(instance, int)
            else "number" if isinstance(instance, float)
            else "string" if isinstance(instance, str)
            else "array" if isinstance(instance, list)
            else "object"
        )
        ok = kind in allowed or (kind == "integer" and "number" in allowed)
        if not ok:
            fail(f"{path}: expected type {allowed}, got {kind}")
            return
    if isinstance(instance, str):
        if "pattern" in schema and not re.search(schema["pattern"], instance):
            fail(f"{path}: does not match pattern")
        if "minLength" in schema and len(instance) < schema["minLength"]:
            fail(f"{path}: shorter than minLength")
    if isinstance(instance, (int, float)) and not isinstance(instance, bool):
        if "minimum" in schema and instance < schema["minimum"]:
            fail(f"{path}: below minimum")
    if isinstance(instance, list):
        if "minItems" in schema and len(instance) < schema["minItems"]:
            fail(f"{path}: fewer than minItems")
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for index, item in enumerate(instance):
                validate_instance(item, item_schema, registry, f"{path}[{index}]")
    if isinstance(instance, dict):
        for req in schema.get("required", []):
            if req not in instance:
                fail(f"{path}: missing required property {req!r}")
        props = schema.get("properties", {})
        additional = schema.get("additionalProperties", True)
        for key, value in instance.items():
            if key in props:
                validate_instance(value, props[key], registry, f"{path}.{key}")
            elif additional is False:
                fail(f"{path}: unknown property {key!r}")


def collect_refs(node, out):
    if isinstance(node, dict):
        if "$ref" in node and isinstance(node["$ref"], str):
            out.append(node["$ref"])
        for value in node.values():
            collect_refs(value, out)
    elif isinstance(node, list):
        for value in node:
            collect_refs(value, out)


# ---------------------------------------------------------------- checks
def check_schemas():
    registry = {}
    schemas = {}
    for path in sorted((ROOT / "schemas").glob("*.schema.json")):
        doc = load_strict(path)
        if doc is None:
            continue
        rel = str(path.relative_to(ROOT))
        if doc.get("$schema") != "https://json-schema.org/draft/2020-12/schema":
            fail(f"{rel}: not declared as draft 2020-12")
        sid = doc.get("$id", "")
        if not re.fullmatch(r"tag:storyworld-platform,2026:contracts/[a-z0-9-]+/v[0-9]+", sid):
            fail(f"{rel}: $id missing or not a stable tag URI")
        if doc.get("type") != "object" or doc.get("additionalProperties") is not False:
            fail(f"{rel}: root must be a closed object")
        if not doc.get("title"):
            fail(f"{rel}: missing title")
        sv = doc.get("properties", {}).get("schema_version", {})
        if "const" not in sv:
            fail(f"{rel}: schema_version const missing")
        registry[sid] = doc
        schemas[rel] = doc
    for rel, doc in schemas.items():
        refs: list[str] = []
        collect_refs(doc, refs)
        for ref in refs:
            base = ref.split("#", 1)[0]
            if base and base not in registry:
                fail(f"{rel}: unresolved cross-schema $ref {base}")
    return registry


def check_lifecycles():
    for path in sorted((ROOT / "lifecycles").glob("*.lifecycle.json")):
        doc = load_strict(path)
        if doc is None:
            continue
        rel = str(path.relative_to(ROOT))
        states = doc.get("states", [])
        transitions = doc.get("transitions", {})
        entries = doc.get("entry_states", [])
        terminals = doc.get("terminal_states", [])
        if sorted(transitions.keys()) != sorted(states):
            fail(f"{rel}: transition map keys differ from declared states")
        for src, targets in transitions.items():
            for target in targets:
                if target not in states:
                    fail(f"{rel}: transition {src} -> {target} leaves declared states")
        for entry in entries:
            if entry not in states:
                fail(f"{rel}: entry state {entry} undeclared")
        for terminal in terminals:
            if transitions.get(terminal):
                fail(f"{rel}: terminal state {terminal} has outgoing transitions")
        reachable = set(entries)
        frontier = list(entries)
        while frontier:
            current = frontier.pop()
            for nxt in transitions.get(current, []):
                if nxt not in reachable:
                    reachable.add(nxt)
                    frontier.append(nxt)
        unreachable = [s for s in states if s not in reachable]
        if unreachable:
            fail(f"{rel}: unreachable states {unreachable}")
        if not isinstance(doc.get("inferred_transitions"), list):
            fail(f"{rel}: inferred_transitions must document inferred branches")


def check_charter_coherence(registry):
    matrix = load_strict(ROOT / "charter" / "authority-matrix.json")
    taxonomy = load_strict(ROOT / "charter" / "approval-taxonomy.json")
    if matrix is None or taxonomy is None:
        return
    for name, doc in [("authority-matrix", matrix), ("approval-taxonomy", taxonomy)]:
        if doc.get("status") != "accepted":
            fail(f"charter/{name}.json: status is not accepted")
    hosts = {"storyworld", "commerce_foundry", "bekindrewind_runtime"}
    layers = [layer["id"] for layer in taxonomy.get("layers", [])]
    envelope = registry.get("tag:storyworld-platform,2026:contracts/common-package-envelope/v1")
    receipt = registry.get("tag:storyworld-platform,2026:contracts/approval-receipt/v1")
    if envelope:
        declared = set(envelope["properties"]["authority_host"]["enum"])
        if declared != hosts:
            fail("common-package-envelope: authority_host enum diverges from charter")
    if receipt:
        declared_layers = receipt["properties"]["approval_layer"]["enum"]
        if declared_layers != layers:
            fail("approval-receipt: approval_layer enum diverges from charter approval-taxonomy order")
        declared_hosts = set(receipt["properties"]["authority_host"]["enum"])
        if declared_hosts != hosts:
            fail("approval-receipt: authority_host enum diverges from charter")


def canonical(doc) -> str:
    return json.dumps(doc, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def check_fixtures(registry):
    fixture_root = ROOT / "fixtures"
    instances = sorted(fixture_root.rglob("*.instance.json"))
    if not instances:
        fail("fixtures: no *.instance.json fixtures found (smoke fixture expected)")
    for path in instances:
        doc = load_strict(path)
        if doc is None:
            continue
        rel = str(path.relative_to(ROOT))
        declared = doc.get("$comment_schema")
        if not declared or declared not in registry:
            fail(f"{rel}: $comment_schema missing or does not name a known schema $id")
            continue
        instance = {k: v for k, v in doc.items() if k != "$comment_schema"}
        validate_instance(instance, registry[declared], registry, path=rel)
        first = canonical(instance)
        second = canonical(json.loads(first, object_pairs_hook=reject_duplicates))
        if first != second:
            fail(f"{rel}: canonical round-trip is not deterministic")


def main() -> int:
    registry = check_schemas()
    check_lifecycles()
    check_charter_coherence(registry)
    check_fixtures(registry)
    if ERRORS:
        for error in ERRORS:
            print(f"[FAIL] {error}")
        print(f"[FAIL] contract validation: {len(ERRORS)} finding(s)")
        return 1
    print("[PASS] contract pack: strict JSON, schemas, $refs, lifecycles, charter coherence, fixture round-trip")
    print("[INFO] structural checks only; content correctness and readiness are not established")
    return 0


if __name__ == "__main__":
    sys.exit(main())
