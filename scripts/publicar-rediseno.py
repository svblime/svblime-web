#!/usr/bin/env python3
"""Prepara la web nueva para publicarla como página principal de svblime.cl.

    python3 scripts/publicar-rediseno.py <carpeta-destino>

Copia public/rediseno/ a <carpeta-destino>/ y en cada página saca la pantalla de
contraseña y el aviso "no indexar", para que se vea abierta y Google la encuentre.
El contenido de <carpeta-destino>/ se sube a la raíz del hosting (public_html).
"""
import os, re, shutil, sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "rediseno")
DST = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)

if os.path.exists(DST):
    shutil.rmtree(DST)
shutil.copytree(SRC, DST)

# Bloque de la contraseña: desde la etiqueta robots hasta el cierre de su <script>
GATE = re.compile(r'<meta name="robots" content="noindex[^"]*">\n<style>\n#svb-gate.*?</script>\n', re.S)
n = 0
for root, _, files in os.walk(DST):
    for f in files:
        if not f.endswith(".html"):
            continue
        p = os.path.join(root, f)
        s = open(p, encoding="utf-8").read()
        s2, k = GATE.subn("", s)
        if k != 1 or "svb-gate" in s2 or "noindex" in s2:
            sys.exit(f"No pude sacar la contraseña de {p}")
        open(p, "w", encoding="utf-8").write(s2)
        n += 1
print(f"Listo: {n} páginas sin contraseña en {DST}")
