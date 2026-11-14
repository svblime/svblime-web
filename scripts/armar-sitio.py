#!/usr/bin/env python3
"""Arma el sitio completo de svblime.cl listo para subir a public_html.

    python3 scripts/armar-sitio.py <carpeta-destino>

Deja en <carpeta-destino>/:
  - la web nueva en la raíz, sin contraseña y visible para Google (desde public/rediseno/);
  - /mejorada/: la versión mejorada, con contraseña y oculta para Google (usa las mismas
    fotos, videos y estilos de la raíz, así no se duplica el peso);
  - las propuestas de clientes (propuesta, propuestasuv, backtojungle), el ícono y robots.txt.
"""
import os, re, shutil, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PUB = os.path.join(ROOT, "public")
DST = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)

# 1 · Web nueva en la raíz (sin contraseña)
subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "publicar-rediseno.py"), DST], check=True)

# 2 · Versión mejorada en /mejorada/ (con contraseña)
SRC = os.path.join(PUB, "rediseno")
MEJ = os.path.join(DST, "mejorada")
for dirpath, _, files in os.walk(SRC):
    rel = os.path.relpath(dirpath, SRC)
    if rel.split(os.sep)[0] in ("media", "js"):
        continue
    for f in files:
        if not f.endswith(".html"):
            continue
        sub = rel != "."  # páginas dentro de servicios/
        s = open(os.path.join(dirpath, f), encoding="utf-8").read()
        up = "../../" if sub else "../"
        if sub:
            s = re.sub(r'(["\'(])\.\./(media|js)/', r"\g<1>../../\2/", s)
            s = s.replace('href="../final.css"', 'href="../../final.css"')
            s = s.replace('<html lang="es" data-media="../media/">', '<html lang="es" data-media="../../media/">')
        else:
            s = re.sub(r'(["\'(])(media|js)/', r"\g<1>../\2/", s)
            s = s.replace('href="final.css"', 'href="../final.css"')
            s = s.replace('<html lang="es">', '<html lang="es" data-media="../media/">', 1)
        s = re.sub(r'<body class="([^"]*)"', lambda m: f'<body class="{m.group(1)} mejorada"', s, count=1)
        s = s.replace("var KEY='svb-propuesta-rediseno';", "var KEY='svb-mejorada';")
        s = re.sub(r"<p>Rediseño web · [^<]*</p>", "<p>Versión mejorada · privada</p>", s)
        s = re.sub(r'<link rel="canonical"[^>]*>\n', "", s)
        assert "svb-gate" in s and "noindex" in s and "mejorada" in s, f
        out = os.path.join(MEJ, rel) if sub else MEJ
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, f), "w", encoding="utf-8").write(s)

# 3 · Propuestas y archivos base
for d in ("propuesta", "propuestasuv", "backtojungle"):
    shutil.copytree(os.path.join(PUB, d), os.path.join(DST, d))
shutil.copy(os.path.join(PUB, "favicon.ico"), DST)
open(os.path.join(DST, "robots.txt"), "w").write(
    "User-agent: *\nAllow: /\nDisallow: /mejorada/\n\nSitemap: https://svblime.cl/sitemap.xml\n")
print("Sitio completo listo en", DST)
