from pathlib import Path
import re, json,zipfile
p=Path(__file__).parent
js=(p/'app.js').read_text(); html=(p/'index.html').read_text(); sw=(p/'service-worker.js').read_text()
ids=set(re.findall(r'\bid=["\']([^"\']+)',html)); required=set(re.findall(r"\$\('([^']+)'\)",js)); missing=sorted(required-ids)
print('Elements in HTML:',len(ids),'referenced in JS:',len(required),'missing:',missing)
assert not missing
assert 'app.js?v=060' in html
assert 'sunny-trade-v060' in sw
assert json.loads((p/'manifest.webmanifest').read_text())['display']=='standalone'
for f in ['index.html','app.js','styles.css','service-worker.js','manifest.webmanifest','icon-192.png','icon-512.png']:assert (p/f).stat().st_size>10
print('PASS static integration, manifest, cache version and assets')
