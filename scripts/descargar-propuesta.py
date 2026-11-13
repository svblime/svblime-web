"""Descarga una propuesta publicada (página + todos los archivos que usa) a una carpeta local.

    python3 scripts/descargar-propuesta.py https://www.svblime.cl/<carpeta> <carpeta-local>

Sigue las referencias de index.html, .js y .css. Los avisos "MISS" de nombres sueltos son normales:
son textos que parecen archivos pero no lo son. Al final verifica con scripts/verificar-propuesta.mjs.
"""
import re, os, sys, subprocess, posixpath, urllib.parse
base, root = sys.argv[1].rstrip('/') + '/', sys.argv[2]
seen = set()
EXT = r"(?:png|jpe?g|webp|gif|svg|mp4|webm|mov|wav|mp3|m4a|otf|ttf|woff2?|ico|css|js|jsx|json|html|pdf)"
def fetch(rel):
    rel = posixpath.normpath(urllib.parse.unquote(rel)).lstrip('/')
    if rel in seen or rel.startswith('..'): return None
    seen.add(rel)
    dst = os.path.join(root, rel); os.makedirs(os.path.dirname(dst) or root, exist_ok=True)
    code = subprocess.run(['curl','-sS','-o',dst,'-w','%{http_code}',base+urllib.parse.quote(rel)],capture_output=True,text=True).stdout
    if code != '200':
        if os.path.exists(dst): os.remove(dst)
        print('MISS', code, rel); return None
    return dst
def scan(path, rel):
    s = open(path, encoding='utf-8', errors='ignore').read(); d = posixpath.dirname(rel)
    refs = set(re.findall(r"[\"'`(=]\s*(?:\./)?([A-Za-z0-9_][A-Za-z0-9_./ %-]*\." + EXT + r")(?=[\"'`)?#\s])", s))
    refs |= set(re.findall(r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)", s))
    for r in refs:
        if r.startswith(('http', 'data:', '//', '{')): continue
        t = posixpath.normpath(posixpath.join(d, r))
        p = fetch(t)
        if p and t.endswith(('.css', '.html', '.js', '.jsx')): scan(p, t)
p = fetch('index.html'); scan(p, 'index.html')
print('TOTAL', len(seen))
