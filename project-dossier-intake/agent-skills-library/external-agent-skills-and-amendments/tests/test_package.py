import pathlib, subprocess, sys, unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class PackageTests(unittest.TestCase):
    def test_validator(self):
        proc = subprocess.run([sys.executable, str(ROOT/'scripts/validate_package.py')], cwd=ROOT, text=True, capture_output=True)
        self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)

    def test_no_permission_grants(self):
        import json
        for p in (ROOT/'overlay/new-skills').glob('*/references/provenance.json'):
            data=json.loads(p.read_text())
            self.assertIs(data['permission_grant'], False)
            self.assertEqual(data['adoption_status'], 'generated_unadopted_baseline')

    def test_candidate_count(self):
        import json
        data=json.loads((ROOT/'02-prioritized-external-skill-register.json').read_text())
        self.assertGreaterEqual(data['count'], 50)
        self.assertEqual(data['count'], len(data['candidates']))

if __name__ == '__main__': unittest.main()
