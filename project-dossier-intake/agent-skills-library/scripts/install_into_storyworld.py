#!/usr/bin/env python3
"""Dry-run or install this library's capabilities into a Storyworld checkout."""

from __future__ import annotations
import argparse
import json
import shutil
import sys
from pathlib import Path

LIB = Path(__file__).resolve().parents[1]

def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(2)

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("target", type=Path, help="Storyworld repository root")
    ap.add_argument("--apply", action="store_true", help="Copy files; default is dry-run")
    ap.add_argument("--include-library-registry", action="store_true",
                    help="Also copy registries/docs under .agents/storyworld-skill-library/")
    args = ap.parse_args()
    target = args.target.resolve()
    if not (target / "AGENTS.md").is_file():
        fail("target does not contain AGENTS.md")
    text = (target / "AGENTS.md").read_text(encoding="utf-8", errors="replace")
    if "Storyworld" not in text or not (target / ".agent").is_dir() or not (target / ".agents").is_dir():
        fail("target does not look like a Storyworld checkout with .agent and .agents")
    plan: list[tuple[Path, Path]] = []
    for source_root, target_root in [
        (LIB / ".agents/skills", target / ".agents/skills"),
        (LIB / ".agents/agents", target / ".agents/agents"),
        (LIB / ".agents/workflows", target / ".agents/workflows"),
    ]:
        for src in source_root.rglob("*"):
            if src.is_file():
                plan.append((src, target_root / src.relative_to(source_root)))
    if args.include_library_registry:
        source_root = LIB / "registry"
        target_root = target / ".agents/storyworld-skill-library/registry"
        for src in source_root.rglob("*"):
            if src.is_file():
                plan.append((src, target_root / src.relative_to(source_root)))
    collisions = [dst for _, dst in plan if dst.exists()]
    print(f"Target: {target}")
    print(f"Mode: {'APPLY' if args.apply else 'DRY RUN'}")
    print(f"Files planned: {len(plan)}")
    if collisions:
        print("Collisions:")
        for p in collisions:
            print(f"  {p.relative_to(target)}")
        fail("refusing to overwrite existing capability files; review and migrate explicitly")
    for src, dst in plan:
        print(f"{'COPY' if args.apply else 'WOULD COPY'} {src.relative_to(LIB)} -> {dst.relative_to(target)}")
        if args.apply:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
    if args.apply:
        print("\nCopied successfully. The capabilities are still unadopted.")
        print("Create/review adoption decisions and run Storyworld refresh, validation, harness tests, and project checks.")
    else:
        print("\nDry run only. Re-run with --apply under an explicitly authorized Storyworld repository task.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
