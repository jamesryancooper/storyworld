#!/usr/bin/env python3
"""Validate the generated Storyworld agent skill library using only stdlib."""

from __future__ import annotations
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
WARNINGS: list[str] = []

def error(msg: str) -> None:
    ERRORS.append(msg)

def warn(msg: str) -> None:
    WARNINGS.append(msg)

def load_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        error(f"{path.relative_to(ROOT)}: invalid JSON: {exc}")
        return None

def parse_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        error(f"{path.relative_to(ROOT)}: missing YAML frontmatter")
        return {}
    data = {}
    for line in m.group(1).splitlines():
        if not line.strip():
            continue
        if ":" not in line:
            error(f"{path.relative_to(ROOT)}: malformed frontmatter line {line!r}")
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip()
    return data

def check_cycles(graph: dict[str, list[str]]) -> None:
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []
    def dfs(node: str):
        if node in visiting:
            idx = stack.index(node)
            error("skill dependency cycle: " + " -> ".join(stack[idx:] + [node]))
            return
        if node in visited:
            return
        visiting.add(node)
        stack.append(node)
        for dep in graph.get(node, []):
            dfs(dep)
        stack.pop()
        visiting.remove(node)
        visited.add(node)
    for node in graph:
        dfs(node)

def validate_skills() -> tuple[set[str], dict[str, list[str]]]:
    reg = load_json(ROOT / "registry/skills.json")
    if not reg:
        return set(), {}
    records = reg.get("skills", [])
    if reg.get("count") != len(records):
        error("registry/skills.json count does not match skills array")
    ids = [r.get("id") for r in records]
    if len(ids) != len(set(ids)):
        error("duplicate skill IDs")
    idset = set(ids)
    graph = {}
    required_provenance = {
        "schema_version","id","version","adoption_status","adoption_decision_ref",
        "permission_grant","entrypoint","purpose","scope","authority","side_effects",
        "inputs","outputs","prohibited","validation","owner","included_material",
        "provenance","deprecated_at","removal_version","successor","limitations"
    }
    for rec in records:
        sid = rec["id"]
        base = ROOT / ".agents/skills" / sid
        skill = base / "SKILL.md"
        prov = base / "references/provenance.json"
        if not skill.exists():
            error(f"{sid}: missing SKILL.md")
            continue
        fm = parse_frontmatter(skill)
        if set(fm) != {"name","description"}:
            error(f"{sid}: SKILL.md frontmatter keys must be exactly name and description; got {sorted(fm)}")
        if fm.get("name") != sid:
            error(f"{sid}: frontmatter name mismatch")
        if not fm.get("description"):
            error(f"{sid}: empty description")
        if not prov.exists():
            error(f"{sid}: missing provenance.json")
            continue
        p = load_json(prov)
        if not p:
            continue
        missing = required_provenance - set(p)
        if missing:
            error(f"{sid}: provenance missing fields {sorted(missing)}")
        if p.get("schema_version") != "harness.skill-provenance.v1":
            error(f"{sid}: wrong provenance schema_version")
        if p.get("id") != sid:
            error(f"{sid}: provenance ID mismatch")
        if p.get("adoption_status") != "generated_unadopted_baseline":
            error(f"{sid}: package must remain generated_unadopted_baseline")
        if p.get("adoption_decision_ref") is not None:
            error(f"{sid}: adoption_decision_ref must be null in distribution")
        if p.get("permission_grant") is not False:
            error(f"{sid}: permission_grant must be false")
        auth = p.get("authority", {})
        if auth.get("inherits_from") != "current_task" or auth.get("may_expand") is not False:
            error(f"{sid}: authority must inherit current_task and may_expand=false")
        if p.get("entrypoint") != f".agents/skills/{sid}/SKILL.md":
            error(f"{sid}: entrypoint mismatch")
        included = p.get("provenance", {}).get("included_files", [])
        for rel in included:
            if not (ROOT / rel).is_file():
                error(f"{sid}: provenance included file missing: {rel}")
        actual = {str(x.relative_to(ROOT)) for x in base.rglob("*") if x.is_file()}
        declared = set(included)
        if actual != declared:
            error(f"{sid}: provenance file set differs; missing={sorted(actual-declared)} extra={sorted(declared-actual)}")
        deps = rec.get("dependencies", [])
        graph[sid] = deps
        for dep in deps:
            if dep not in idset:
                error(f"{sid}: unknown dependency {dep}")
        if rec.get("permission_grant") is not False:
            error(f"{sid}: registry permission_grant must be false")
        if rec.get("adoption_status") != "generated_unadopted_baseline":
            error(f"{sid}: registry adoption status must remain unadopted")
        for rel in rec.get("files", []):
            if not (ROOT / rel).is_file():
                error(f"{sid}: registry file missing: {rel}")
    check_cycles(graph)
    dirs = {p.name for p in (ROOT / ".agents/skills").iterdir() if p.is_dir()}
    if dirs != idset:
        error(f"skill directory/registry mismatch: dirs-only={sorted(dirs-idset)} registry-only={sorted(idset-dirs)}")
    return idset, graph

def validate_agent(skill_ids: set[str]) -> None:
    path = ROOT / ".agents/agents/storyworld-engineering-router.json"
    a = load_json(path)
    if not a:
        return
    if a.get("schema_version") != "harness.agent.v1":
        error("router agent schema_version")
    if a.get("adoption_status") != "generated_unadopted_baseline":
        error("router agent must remain unadopted")
    if a.get("permission_grant") is not False:
        error("router agent permission_grant must be false")
    unknown = set(a.get("skill_refs", [])) - skill_ids
    if unknown:
        error(f"router agent has unknown skill refs: {sorted(unknown)}")

def validate_workflows() -> None:
    for path in sorted((ROOT / ".agents/workflows").glob("*.json")):
        w = load_json(path)
        if not w:
            continue
        if w.get("schema_version") != "harness.workflow.v1":
            error(f"{path.name}: wrong schema_version")
        if w.get("adoption_status") != "generated_unadopted_baseline":
            error(f"{path.name}: must remain unadopted")
        if w.get("permission_grant") is not False:
            error(f"{path.name}: permission_grant must be false")
        states = w.get("states", [])
        ids = [s.get("id") for s in states]
        if len(ids) != len(set(ids)):
            error(f"{path.name}: duplicate states")
        idset = set(ids)
        if w.get("initial_state") not in idset or w.get("cancellation_state") not in idset:
            error(f"{path.name}: initial/cancellation state missing")
        for t in w.get("terminal_states", []):
            if t not in idset:
                error(f"{path.name}: terminal state {t} missing")
        for s in states:
            for key in ("on_success","on_failure","on_actionable_findings"):
                target = s.get(key)
                if target is not None and target not in idset:
                    error(f"{path.name}: state {s.get('id')} targets missing {target}")

def validate_routing(skill_ids: set[str]) -> None:
    r = load_json(ROOT / "registry/routing.json")
    if not r:
        return
    external = set(r.get("external_existing_skills", []))
    allowed = skill_ids | external
    if r.get("default_router") not in skill_ids:
        error("routing default router missing")
    route_ids = []
    for route in r.get("routes", []):
        route_ids.append(route.get("id"))
        if route.get("primary") not in allowed:
            error(f"route {route.get('id')}: unknown primary {route.get('primary')}")
        for comp in route.get("companions", []):
            if comp not in allowed:
                error(f"route {route.get('id')}: unknown companion {comp}")
    if len(route_ids) != len(set(route_ids)):
        error("duplicate routing IDs")

def validate_manifest() -> None:
    path = ROOT / "MANIFEST.json"
    checksums = ROOT / "CHECKSUMS.sha256"
    if not path.exists() or not checksums.exists():
        warn("manifest/checksums not present yet; package-finalization step must create them")
        return
    m = load_json(path)
    if not m:
        return
    listed = {x["path"]: x["sha256"] for x in m.get("files", [])}
    ignored = {"MANIFEST.json","CHECKSUMS.sha256"}
    actual = {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in ROOT.rglob("*") if p.is_file() and str(p.relative_to(ROOT)) not in ignored}
    if listed != actual:
        missing = sorted(set(actual)-set(listed))
        extra = sorted(set(listed)-set(actual))
        changed = sorted(k for k in set(actual)&set(listed) if actual[k] != listed[k])
        error(f"manifest mismatch missing={missing} extra={extra} changed={changed}")
    checksum_lines = [line for line in checksums.read_text(encoding="utf-8").splitlines() if line.strip()]
    expected = [f"{actual[p]}  {p}" for p in sorted(actual)]
    if checksum_lines != expected:
        error("CHECKSUMS.sha256 does not match actual files")

def main() -> int:
    skill_ids, _ = validate_skills()
    validate_agent(skill_ids)
    validate_workflows()
    validate_routing(skill_ids)
    validate_manifest()
    for w in WARNINGS:
        print(f"WARNING: {w}")
    if ERRORS:
        for e in ERRORS:
            print(f"ERROR: {e}")
        print(f"FAIL: {len(ERRORS)} error(s), {len(WARNINGS)} warning(s)")
        return 1
    print(f"PASS: {len(skill_ids)} skills, "
          f"{len(list((ROOT/'.agents/workflows').glob('*.json')))} workflows, "
          f"1 router agent, {len(WARNINGS)} warning(s)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
