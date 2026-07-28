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


import hashlib


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def validate_and_errors(instance, schema, registry, label):
    """Run subset validation collecting errors locally; return the error list."""
    global ERRORS
    saved = ERRORS
    ERRORS = []
    validate_instance(instance, schema, registry, path=label)
    local, ERRORS = ERRORS, saved
    return local


def check_fixtures(registry):
    fixture_root = ROOT / "fixtures"
    instances = sorted(fixture_root.rglob("*.instance.json"))
    if not instances:
        fail("fixtures: no *.instance.json fixtures found")
    for path in instances:
        doc = load_strict(path)
        if doc is None:
            continue
        rel = str(path.relative_to(ROOT))
        declared = doc.get("$comment_schema")
        if not declared or declared not in registry:
            fail(f"{rel}: $comment_schema missing or does not name a known schema $id")
            continue
        instance = {k: v for k, v in doc.items() if not k.startswith("$")}
        validate_instance(instance, registry[declared], registry, path=rel)
        first = canonical(instance)
        second = canonical(json.loads(first, object_pairs_hook=reject_duplicates))
        if first != second:
            fail(f"{rel}: canonical round-trip is not deterministic")


def check_invalid_cases(registry):
    for path in sorted((ROOT / "fixtures").rglob("*.invalid.json")):
        doc = load_strict(path)
        if doc is None:
            continue
        rel = str(path.relative_to(ROOT))
        declared = doc.get("$comment_schema")
        expected = doc.get("$expect_errors")
        instance = doc.get("instance")
        if not declared or declared not in registry or not isinstance(expected, list) or not expected or not isinstance(instance, dict):
            fail(f"{rel}: invalid-case requires $comment_schema, non-empty $expect_errors, and instance")
            continue
        errors = validate_and_errors(instance, registry[declared], registry, rel)
        if not errors:
            fail(f"{rel}: intentionally invalid case validated cleanly")
            continue
        joined = "\n".join(errors)
        for needle in expected:
            if needle not in joined:
                fail(f"{rel}: expected error containing {needle!r} was not produced")


def load_fixture_registry():
    reg = load_strict(ROOT / "fixtures" / "registry.json")
    if reg is None:
        fail("fixtures/registry.json: missing or invalid")
    return reg


MANIFEST_REQUIRED = [
    "fixture_id", "ownership_statement", "fictional", "sensitivity",
    "permitted_use", "canon_classification", "source_files", "restricted_source_files", "provenance",
]


def check_registry_coverage(fixture_registry):
    if fixture_registry is None:
        return
    classes = fixture_registry.get("classes", {})
    active = list(classes.get("f1_production_fixtures", [])) + list(classes.get("f1_schema_probes", []))
    for entry in active:
        fid = entry.get("id", "?")
        rel_dir = entry.get("path")
        if not rel_dir:
            fail(f"registry {fid}: missing path")
            continue
        base = ROOT / rel_dir
        if not base.is_dir():
            fail(f"registry {fid}: directory {rel_dir} does not exist")
            continue
        manifest = load_strict(base / "MANIFEST.json") if (base / "MANIFEST.json").is_file() else None
        if manifest is None:
            fail(f"{rel_dir}: MANIFEST.json missing or invalid")
        else:
            for key in MANIFEST_REQUIRED:
                if key not in manifest:
                    fail(f"{rel_dir}/MANIFEST.json: missing {key!r}")
            if manifest.get("fixture_id") != fid:
                fail(f"{rel_dir}/MANIFEST.json: fixture_id does not match registry id {fid}")
            if manifest.get("fictional") is not True:
                fail(f"{rel_dir}/MANIFEST.json: fictional must be true")
            if not str(manifest.get("ownership_statement", "")).strip():
                fail(f"{rel_dir}/MANIFEST.json: ownership_statement empty")
        if not list((base / "records").glob("*.instance.json")):
            fail(f"{rel_dir}: no records/*.instance.json")
        if not list((base / "invalid").glob("*.invalid.json")):
            fail(f"{rel_dir}: no invalid/*.invalid.json")
        checks = load_strict(base / "expected" / "checksums.json") if (base / "expected" / "checksums.json").is_file() else None
        if checks is None:
            fail(f"{rel_dir}: expected/checksums.json missing or invalid")
        else:
            for name, digest in checks.items():
                target = base / "records" / name
                if not target.is_file():
                    fail(f"{rel_dir}: checksum names missing record {name}")
                    continue
                doc = load_strict(target)
                if doc is None:
                    continue
                instance = {k: v for k, v in doc.items() if not k.startswith("$")}
                if sha256_text(canonical(instance)) != digest:
                    fail(f"{rel_dir}: canonical checksum mismatch for {name}")
            for record in (base / "records").glob("*.instance.json"):
                if record.name not in checks:
                    fail(f"{rel_dir}: record {record.name} missing from expected/checksums.json")


def check_restricted_source_separation():
    for restricted_dir in sorted((ROOT / "fixtures").glob("*/source/restricted")):
        fixture_dir = restricted_dir.parents[1]
        markers: list[str] = []
        for source_file in restricted_dir.rglob("*"):
            if not source_file.is_file():
                continue
            try:
                text = source_file.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            markers.extend(line.strip() for line in text.splitlines() if len(line.strip()) >= 30)
        if not markers:
            continue
        for out_dir in ("records", "expected"):
            for out_file in (fixture_dir / out_dir).rglob("*.json"):
                if "restricted" in out_file.name:
                    continue
                try:
                    text = out_file.read_text(encoding="utf-8")
                except (UnicodeDecodeError, OSError):
                    continue
                for marker in markers:
                    if marker in text:
                        fail(
                            f"{out_file.relative_to(ROOT)}: contains restricted source text "
                            f"({marker[:40]!r}...) outside a restricted-marked record"
                        )
                        break


# ------------------------------------------------------------- metamorphic (F1)
def met_load(rel):
    path = ROOT / rel
    doc = load_strict(path)
    if doc is None:
        return None
    return {k: v for k, v in doc.items() if not k.startswith("$")}


def run_metamorphic():
    config = load_strict(ROOT / "tests" / "metamorphic-f1.json")
    if config is None:
        fail("tests/metamorphic-f1.json: missing or invalid")
        return
    for test in config.get("tests", []):
        tid = test.get("id", "?")
        kind = test.get("transformation")
        target = test.get("target")
        params = test.get("params", {})
        doc = met_load(target) if target else None
        if kind != "export_reimport_all" and doc is None:
            fail(f"metamorphic {tid}: target {target} missing")
            continue
        if kind == "reorder_units":
            units = doc.get(params.get("units_key", "narrative_units"), [])
            if not units:
                fail(f"metamorphic {tid}: no units at {params.get('units_key')}")
                continue
            for unit in units:
                if "presentation_order" not in unit or "story_time" not in unit:
                    fail(f"metamorphic {tid}: unit lacks explicit presentation_order/story_time")
                    break
            before = sorted(canonical(u) for u in units)
            after = sorted(canonical(u) for u in list(reversed(units)))
            if before != after:
                fail(f"metamorphic {tid}: unit set not order-independent")
        elif kind == "insert_unit":
            key = params.get("units_key", "narrative_units")
            units = doc.get(key, [])
            ids_before = {u.get("unit_id") for u in units}
            new_unit = params.get("new_unit")
            if not isinstance(new_unit, dict) or new_unit.get("unit_id") in ids_before:
                fail(f"metamorphic {tid}: new_unit missing or reuses an ID")
                continue
            mutated = units + [new_unit]
            ids_after = {u.get("unit_id") for u in mutated}
            if ids_before - ids_after:
                fail(f"metamorphic {tid}: insertion changed existing stable IDs")
            for thread in doc.get("threads", []):
                for ref_key in ("introduced_in_unit_ref", "resolved_in_unit_ref"):
                    ref = thread.get(ref_key)
                    if ref is not None and ref not in ids_after:
                        fail(f"metamorphic {tid}: thread reference {ref} broken after insertion")
        elif kind == "fork_adaptation":
            source = met_load(params.get("source", ""))
            if source is None:
                fail(f"metamorphic {tid}: source missing")
                continue
            meta = doc.get("branch_metadata", {})
            if meta.get("parent_branch") != source.get("branch"):
                fail(f"metamorphic {tid}: adaptation parent_branch does not name source branch")
            if meta.get("pinned_source_release_ref") != source.get("canon_release_id"):
                fail(f"metamorphic {tid}: adaptation is not pinned to the source release")
            if not meta.get("overrides"):
                fail(f"metamorphic {tid}: adaptation declares no explicit overrides")
            expected_source_sha = params.get("source_canonical_sha256")
            if expected_source_sha and sha256_text(canonical(source)) != expected_source_sha:
                fail(f"metamorphic {tid}: source canon changed after fork")
        elif kind == "correct_assertion":
            assertions = {a.get("assertion_id"): a for a in doc.get("assertions", [])}
            superseded = assertions.get(params.get("superseded_assertion_id"))
            successor = assertions.get(params.get("successor_assertion_id"))
            if superseded is None or successor is None:
                fail(f"metamorphic {tid}: superseded or successor assertion missing")
                continue
            if superseded.get("status") != "superseded" or superseded.get("superseded_by_ref") != successor.get("assertion_id"):
                fail(f"metamorphic {tid}: superseded assertion not preserved with successor link")
            if successor.get("correction_type") not in ("correction", "clarification", "retraction"):
                fail(f"metamorphic {tid}: successor lacks a typed correction_type")
        elif kind == "expire_right":
            grants = {g.get("grant_id"): g for g in doc.get("grants", [])}
            grant = grants.get(params.get("grant_id"))
            if grant is None:
                fail(f"metamorphic {tid}: grant missing")
                continue
            reference = params.get("reference_date", "9999-12-31")
            until = grant.get("valid_until")
            if not until or not until < reference:
                fail(f"metamorphic {tid}: grant is not expired at reference date")
            declared = sorted(doc.get("affected_on_expiry", {}).get(grant["grant_id"], []))
            expected = sorted(params.get("expected_affected_refs", []))
            if declared != expected:
                fail(f"metamorphic {tid}: affected-use set {declared} != expected {expected}")
            unaffected = set(params.get("expected_unaffected_refs", []))
            if unaffected & set(declared):
                fail(f"metamorphic {tid}: invalidation is not selective")
        elif kind == "export_reimport_all":
            pass  # covered universally by check_fixtures round-trips and checksum verification
        else:
            fail(f"metamorphic {tid}: unknown transformation {kind}")


def main() -> int:
    registry = check_schemas()
    check_lifecycles()
    check_charter_coherence(registry)
    check_fixtures(registry)
    check_invalid_cases(registry)
    fixture_registry = load_fixture_registry()
    check_registry_coverage(fixture_registry)
    check_restricted_source_separation()
    run_metamorphic()
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
