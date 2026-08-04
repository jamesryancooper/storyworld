#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
errors = []

def err(msg): errors.append(msg)

def load(rel):
    try: return json.loads((ROOT/rel).read_text())
    except Exception as e:
        err(f"{rel}: {e}")
        return None

reg = load('02-prioritized-external-skill-register.json')
if reg:
    if reg.get('status') != 'research_only_unadopted': err('register status')
    if reg.get('permission_grant') is not False: err('register permission_grant')
    items = reg.get('candidates', [])
    if reg.get('count') != len(items): err('candidate count mismatch')
    ids = [x.get('id') for x in items]
    if len(ids) != len(set(ids)): err('duplicate candidate ids')
    for x in items:
        for k in ['name','repository','path','canonical_url','revision_assessed','primary_disposition','license','security_status','recommended_next_action']:
            if not x.get(k): err(f"{x.get('id')}: missing {k}")
        if x.get('primary_disposition') not in list('ABCDEFG'): err(f"{x.get('id')}: bad disposition")
        if not re.fullmatch(r'[0-9a-f]{40}', x.get('revision_assessed','')): err(f"{x.get('id')}: unpinned revision")

for p in sorted((ROOT/'overlay/new-skills').glob('*/SKILL.md')):
    text = p.read_text()
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m: err(f'{p}: missing frontmatter'); continue
    keys=[]
    for line in m.group(1).splitlines():
        if ':' in line: keys.append(line.split(':',1)[0].strip())
    if keys != ['name','description']: err(f'{p}: frontmatter keys {keys}')
    prov = load(p.parent.relative_to(ROOT).as_posix() + '/references/provenance.json')
    if prov:
        if prov.get('permission_grant') is not False: err(f'{p}: permission grant')
        if prov.get('adoption_status') != 'generated_unadopted_baseline': err(f'{p}: adoption status')
        if prov.get('adoption_decision_ref') is not None: err(f'{p}: adoption decision')
        auth=prov.get('authority',{})
        if auth.get('inherits_from')!='current_task' or auth.get('may_expand') is not False: err(f'{p}: authority')

manifest = load('MANIFEST.json')
if manifest:
    listed = {x['path']:x for x in manifest.get('files',[])}
    for rel, meta in listed.items():
        fp=ROOT/rel
        if not fp.exists(): err(f'manifest missing {rel}'); continue
        h=hashlib.sha256(fp.read_bytes()).hexdigest()
        if h != meta.get('sha256'): err(f'manifest hash {rel}')
    actual = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name not in {'MANIFEST.json','CHECKSUMS.sha256'} and '__pycache__' not in p.parts}
    if actual != set(listed):
        err(f'manifest inventory mismatch missing={sorted(actual-set(listed))[:5]} extra={sorted(set(listed)-actual)[:5]}')

if errors:
    print('FAIL')
    for e in errors: print('-',e)
    sys.exit(1)
print('PASS:', reg['count'] if reg else '?', 'candidates,', len(list((ROOT/'overlay/new-skills').glob('*/SKILL.md'))), 'new skills')
