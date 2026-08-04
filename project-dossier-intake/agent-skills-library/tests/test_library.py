from __future__ import annotations
import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class LibraryTests(unittest.TestCase):
    def test_validator_passes(self):
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts/validate_library.py")],
            cwd=ROOT, text=True, capture_output=True
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_expected_skill_count_and_ids(self):
        reg = json.loads((ROOT / "registry/skills.json").read_text())
        self.assertEqual(reg["count"], 33)
        ids = {x["id"] for x in reg["skills"]}
        for expected in [
            "storyworld-engineering",
            "storyworld-creative-command-implementation",
            "storyworld-provider-adapter",
            "storyworld-native-media-workspace",
            "storyworld-external-editor-connector",
            "storyworld-conformance-and-release",
        ]:
            self.assertIn(expected, ids)

    def test_all_capabilities_are_non_authorizing(self):
        for path in (ROOT / ".agents/skills").glob("*/references/provenance.json"):
            data = json.loads(path.read_text())
            self.assertFalse(data["permission_grant"])
            self.assertEqual(data["adoption_status"], "generated_unadopted_baseline")
            self.assertIsNone(data["adoption_decision_ref"])
            self.assertFalse(data["authority"]["may_expand"])
        agent = json.loads((ROOT / ".agents/agents/storyworld-engineering-router.json").read_text())
        self.assertFalse(agent["permission_grant"])
        for path in (ROOT / ".agents/workflows").glob("*.json"):
            data = json.loads(path.read_text())
            self.assertFalse(data["permission_grant"])

    def test_vendor_specific_guidance_is_profiled(self):
        expected = [
            ".agents/skills/storyworld-provider-adapter/references/profiles/openrouter.md",
            ".agents/skills/storyworld-provider-adapter/references/profiles/fal.md",
            ".agents/skills/storyworld-external-editor-connector/references/profiles/blender.md",
            ".agents/skills/storyworld-external-editor-connector/references/profiles/invokeai.md",
            ".agents/skills/storyworld-external-editor-connector/references/profiles/kdenlive.md",
            ".agents/skills/storyworld-external-editor-connector/references/profiles/resolve.md",
            ".agents/skills/storyworld-runtime-adapter/references/profiles/browser.md",
            ".agents/skills/storyworld-runtime-adapter/references/profiles/godot.md",
        ]
        for rel in expected:
            self.assertTrue((ROOT / rel).is_file(), rel)

if __name__ == "__main__":
    unittest.main()
