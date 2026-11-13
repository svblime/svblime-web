#!/usr/bin/env bash
# Optimiza una propuesta exportada de Claude Design sin cambiar cómo se ve.
#
#   scripts/optimizar-propuesta.sh <carpeta-original> <carpeta-destino>
#   ej.: scripts/optimizar-propuesta.sh propuesta public/propuesta
#
# - Fotos JPG grandes: se reducen a 2400 px como máximo (calidad 82).
# - PNG sin transparencia (fotos): se convierten a JPG y se actualizan sus referencias.
# - PNG con transparencia: a WebP (mantiene la transparencia) si pesan más de 500 KB; si no, PNG reducido.
# - Videos: H.264 a 1920 px como máximo, inicio rápido (faststart); el audio se conserva.
# - Audio WAV: se convierte a MP3 y se actualizan sus referencias.
# El código de la página (incluida la contraseña) no se toca, salvo los nombres de archivo convertidos.
# Requiere ffmpeg e ImageMagick (convert/identify).
set -euo pipefail

SRC=${1:?Falta la carpeta original}
DST=${2:?Falta la carpeta destino}
[ -f "$SRC/index.html" ] || { echo "No encuentro $SRC/index.html"; exit 1; }

before=$(du -sb "$SRC" | cut -f1)
rm -rf "$DST"
mkdir -p "$(dirname "$DST")"
cp -a "$SRC" "$DST"
cd "$DST"

TEXT_FILES=$(find . -type f \( -name "*.html" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" \))
size() { stat -c%s "$1"; }

# Reemplaza un nombre de archivo por otro en todos los archivos de texto de la propuesta.
rename_refs() {
  local old new
  old=$(basename "$1"); new=$(basename "$2")
  # shellcheck disable=SC2086
  python3 -I - "$old" "$new" $TEXT_FILES <<'PY'
import sys
old, new, files = sys.argv[1], sys.argv[2], sys.argv[3:]
for f in files:
    s = open(f, encoding="utf-8", errors="surrogateescape").read()
    if old in s:
        open(f, "w", encoding="utf-8", errors="surrogateescape").write(s.replace(old, new))
PY
}


# Rutas que el código arma "al vuelo" (ej.: 'assets/btj/leaf-' + tipo + '.png'): esos archivos
# conservan su nombre y formato, porque no se puede actualizar la referencia.
# shellcheck disable=SC2086
python3 -I - $TEXT_FILES <<'PY' > .protegidos
import os, re, sys
text = "".join(open(f, encoding="utf-8", errors="ignore").read() for f in sys.argv[1:])
# 'prefijo/' + variable + '.ext'  →  se protegen los archivos que empiezan con ese prefijo y terminan en esa extensión
pairs = re.findall(r"""['"`]([^'"`\s]*/[^'"`\s]*)['"`]\s*\+[^;\n]{0,160}?\+\s*['"`][^'"`/]*\.(png|jpe?g|webp|wav|mp3|mp4)['"`]""", text)
for root, _, files in os.walk("."):
    for f in files:
        rel = os.path.join(root, f)[2:]
        if any(rel.startswith(p.lstrip("./")) and rel.lower().endswith("." + e.lower()) for p, e in pairs):
            print(rel)
PY
protegido() { grep -qxF -- "${1#./}" .protegidos; }

# Archivos de imagen, video o audio que la página no menciona en ningún lado: no se suben.
# shellcheck disable=SC2086
python3 -I - $TEXT_FILES <<'PY'
import os, sys
text = "".join(open(f, encoding="utf-8", errors="ignore").read() for f in sys.argv[1:])
protected = set(open(".protegidos").read().split("\n"))
media = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".mov", ".webm", ".wav", ".mp3", ".m4a", ".pdf")
removed = []
for root, dirs, files in os.walk("."):
    if root.startswith("./_ds"):
        continue
    for f in files:
        rel = os.path.join(root, f)[2:]
        if f.lower().endswith(media) and f not in text and rel not in protected:
            os.remove(os.path.join(root, f)); removed.append(rel)
for d, _, _ in sorted(os.walk("."), key=lambda x: -len(x[0])):
    if d != "." and not os.listdir(d):
        os.rmdir(d)
if removed:
    print("Sin uso (no se incluyen):", ", ".join(removed))
PY

# Imágenes
while IFS= read -r -d '' f; do
  case "${f,,}" in
    *.png)
      [ "$(size "$f")" -gt 300000 ] || continue
      if protegido "$f"; then
        convert "$f" -resize '2400x2400>' -strip -define png:compression-level=9 "$f.tmp.png" && mv "$f.tmp.png" "$f"
      elif [ "$(identify -format '%[opaque]' "$f" 2>/dev/null | head -c 4)" = "true" ]; then
        j="${f%.*}.jpg"
        [ -e "$j" ] && j="${f%.*}-opt.jpg"
        convert "$f" -resize '2400x2400>' -strip -interlace Plane -quality 82 "$j"
        rm "$f"; rename_refs "$f" "$j"
      elif [ "$(size "$f")" -gt 500000 ]; then
        w="${f%.*}.webp"; [ -e "$w" ] && w="${f%.*}-opt.webp"
        convert "$f" -resize '2400x2400>' -strip -quality 85 -define webp:alpha-quality=90 "$w"
        rm "$f"; rename_refs "$f" "$w"
      else
        convert "$f" -resize '2400x2400>' -strip -define png:compression-level=9 "$f.tmp.png" && mv "$f.tmp.png" "$f"
      fi ;;
    *.jpg|*.jpeg)
      [ "$(size "$f")" -gt 400000 ] || continue
      convert "$f" -resize '2400x2400>' -strip -interlace Plane -quality 82 "$f.tmp.jpg" && mv "$f.tmp.jpg" "$f" ;;
  esac
done < <(find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -not -path "./_ds/*" -print0)

# Videos
while IFS= read -r -d '' f; do
  out="$f.tmp.mp4"
  ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset slow -crf 26 \
    -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart "$out"
  if [ "$(size "$out")" -lt "$(size "$f")" ]; then mv "$out" "$f"; else rm "$out"; fi
done < <(find . -type f \( -iname "*.mp4" -o -iname "*.mov" \) -print0)

# Audio WAV → MP3
while IFS= read -r -d '' f; do
  protegido "$f" && continue
  m="${f%.*}.mp3"; [ -e "$m" ] && m="${f%.*}-opt.mp3"
  ffmpeg -nostdin -y -loglevel error -i "$f" -c:a libmp3lame -b:a 192k "$m"
  rm "$f"; rename_refs "$f" "$m"
done < <(find . -type f -iname "*.wav" -print0)

rm -f .protegidos
after=$(du -sb . | cut -f1)
echo "Listo: $(numfmt --to=si "$before")B → $(numfmt --to=si "$after")B  ($DST)"
