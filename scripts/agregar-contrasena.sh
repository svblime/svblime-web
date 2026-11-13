#!/usr/bin/env bash
# Agrega la pantalla de contraseña de SVBLIME a una propuesta (la misma que usan las otras propuestas).
#
#   scripts/agregar-contrasena.sh <carpeta> "<texto bajo SVBLIME>" <contraseña>
#   ej.: scripts/agregar-contrasena.sh public/backtojungle "Propuesta privada · BACK TO JUNGLE" gorila
#
# La contraseña no distingue mayúsculas. Es una protección visual (muestra que la información es
# confidencial), no una protección real: queda escrita en el código de la página.
set -euo pipefail
DIR=${1:?Falta la carpeta}; LABEL=${2:?Falta el texto}; CLAVE=${3:?Falta la contraseña}
HERE=$(cd "$(dirname "$0")" && pwd)
python3 -I - "$DIR/index.html" "$HERE/pantalla-contrasena.html" "$LABEL" "$CLAVE" "$(basename "$DIR")" <<'PY'
import sys, re
page, tpl, label, clave, name = sys.argv[1:]
s = open(page, encoding="utf-8").read()
if "svb-gate" in s:
    sys.exit("Esta propuesta ya tiene pantalla de contraseña.")
esc = lambda t: t.replace("\\", "\\\\").replace("'", "\\'")
block = (open(tpl, encoding="utf-8").read()
         .replace("__KEY__", "svb-propuesta-" + re.sub(r"[^a-z0-9-]", "", name.lower()))
         .replace("__LABEL__", esc(label))
         .replace("__CLAVE__", esc(clave.strip().lower())))
extra = '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">\n'
# Va después de <meta charset> (si existe), para que tildes y eñes se lean bien.
m = re.search(r"<meta[^>]+charset[^>]*>", s[:1024], re.I)
if m:
    s = s[:m.end()] + "\n" + extra + block + s[m.end():]
else:
    s = s.replace("<head>", '<head>\n<meta charset="utf-8">\n' + extra + block, 1)
open(page, "w", encoding="utf-8").write(s)
print("Contraseña agregada a", page)
PY
