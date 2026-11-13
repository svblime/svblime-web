---
name: web-svblime
description: Mantener la web de SVBLIME (svblime.cl) — cambiar textos o secciones, agregar fotos o videos al portafolio, mejorar velocidad o SEO, y entregar la versión para subir por FTP. Usar para cualquier cambio en la página de inicio o las páginas de servicios.
---

# Mantener la web de SVBLIME

## Cómo está armada

- `src/site.jsx`: la página de inicio (React). Los textos de la home se editan aquí.
- `src/ds-components.js`: componentes del design system de SVBLIME (Card, FounderCard, PillarCard, QuoteBlock, StatBlock, Badge, Button, Eyebrow, SpectrumBar).
- `public/`: todo lo que se sube al hosting. `public/servicios/*.html` son las páginas de servicios y preguntas frecuentes (HTML directo).
- `npm run build` compila `src/` → `public/js/app.min.js` y copia React de producción a `public/vendor/`. **Siempre compilar después de tocar `src/`.**
- Las propuestas de clientes también viven en `public/<carpeta>/` → ver la skill `publicar-propuesta`.

## Reglas del equipo (no negociables)

- **No cambiar ningún texto ni diseño visible sin que el usuario lo pida.** La web debe verse igual que la publicada. Esto incluye nombres escritos "mal" (ej. "Alanis Lago", "Lara Poyect"), la frase "Lo que merece ser recordado, lo hacemos realidad." y la tipografía: en la web publicada Hanken Grotesk y JetBrains Mono no cargan (el `@import` de `tokens/fonts.css` va después de un `@font-face` y el navegador lo ignora). Si se "arregla", la web se ve distinta. Proponer mejoras, pero aplicarlas solo con aprobación.
- Las mejoras técnicas que no cambian lo visible sí se pueden hacer: velocidad, compresión, carga diferida.
- Pantallazos de referencia de cómo debe verse: `pantallazos/`.
- Hablarle al usuario en español de Chile, sin jerga técnica.

## Medios

- Videos del portafolio: H.264, máx. 854 px de ancho, sin audio, `faststart`, y una portada en `public/work/poster/<nombre>.jpg` (cuadro del segundo 1). Los de galería y fichas cargan solo al aparecer en pantalla (`LazyVideo`, `useInView`).
- Video de inicio `public/hero.mp4`: 1600 px, CRF 28, sin audio; se reproduce en streaming apenas puede, y si no parte en 8 s se salta la intro.
- Fotos: JPG máx. 1600 px, calidad 82. Logos PNG máx. 1600 px.
- Comandos de referencia:
  ```bash
  ffmpeg -i in.mp4 -an -vf "scale='min(854,iw)':-2,fps=30" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart out.mp4
  ffmpeg -ss 1 -i out.mp4 -frames:v 1 -q:v 5 public/work/poster/<nombre>.jpg
  convert in.jpg -resize '1600x1600>' -strip -interlace Plane -quality 82 out.jpg
  ```

## Verificar antes de entregar

1. `npm run build` sin errores.
2. Servir `public/` (`python3 -m http.server 8765` desde `public/`) y revisar con Playwright en escritorio (1440×900) y celular (390×844): sin errores de JavaScript, sin imágenes rotas, videos que se reproducen al aparecer. Comparar con `pantallazos/`.
3. Si el usuario quiere ver la vista previa, dejar el servidor corriendo y avisar el puerto a la app.

## Entregar

- Commit en `main` y push.
- El usuario sube por FileZilla el **contenido de `public/`** a `public_html`. **Sin el `.htaccess`**: el del servidor tiene configuración propia que no conocemos; antes de reemplazarlo hay que ver el actual y combinarlos.
- Recordar respaldar la web actual antes de subir, y recargar con Ctrl+Shift+R.
- La publicación automática por FTP (GitHub Actions → "Publicar en svblime.cl (FTP)") existe pero necesita los secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR`.

## SEO: estado y plan (pendiente de aprobación del equipo)

Ya hecho: velocidad, `robots.txt`, `sitemap.xml`, canónicas de servicios corregidas (`.html`).

Etapa 1 (no cambia lo visible): convertir los títulos visibles de la home en H1/H2 y quitar los ocultos; quitar el texto oculto "Productora 360" (riesgo de penalización); generar la home en HTML estático (prerender); datos estructurados `FAQPage` en preguntas frecuentes; `og:image`; unificar `svblime.cl` / `www.svblime.cl`; guiar Google Search Console.

Etapa 2 (contenido nuevo, cada texto aprobado por el usuario): páginas `/servicios/agencia-360` y `/servicios/eventos-corporativos` según `SVBLIME_ARQUITECTURA_WEB_FINAL.md` (pedirlo si no está), con el diseño de las páginas de servicios existentes, y enlaces internos entre páginas.
