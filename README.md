# svblime-web

Sitio web de SVBLIME · [svblime.cl](https://svblime.cl)

## Estructura

| Carpeta / archivo | Qué es |
|---|---|
| `public/` | El sitio tal como se sube al servidor. Todo lo que está aquí se publica. |
| `src/site.jsx` | La página de inicio (React). **Los textos de la home se editan aquí.** |
| `src/ds-components.js` | Componentes del design system de SVBLIME (Button, Badge, Eyebrow, SpectrumBar, Card, ServiceCard, QuoteBlock, FounderCard, StatBlock). |
| `public/servicios/*.html` | Páginas de servicios y preguntas frecuentes (HTML directo). |
| `public/tokens/` | Colores, tipografía, espaciado y efectos del design system. |
| `build.mjs` | Compila `src/` → `public/js/app.min.js` y copia React a `public/vendor/`. |

## Compilar

```bash
npm install
npm run build
```

Después de cambiar `src/site.jsx` hay que compilar para que el cambio llegue a `public/js/app.min.js`.

## Publicar

**Automático (recomendado):** en GitHub, pestaña **Actions → "Publicar en svblime.cl (FTP)" → Run workflow**. Compila y sube `public/` por FTP. Necesita estos *secrets* en Settings → Secrets and variables → Actions:

| Secret | Ejemplo |
|---|---|
| `FTP_SERVER` | `ftp.svblime.cl` |
| `FTP_USERNAME` | usuario FTP del hosting |
| `FTP_PASSWORD` | contraseña FTP |
| `FTP_SERVER_DIR` | `public_html/` (carpeta del sitio en el servidor, con `/` al final) |

Usa FTPS (FTP cifrado). Si el hosting no lo soporta, cambiar `protocol: ftps` por `protocol: ftp` en `.github/workflows/deploy-ftp.yml`.

**Manual:** subir el contenido de `public/` a la carpeta del sitio con el cliente FTP de siempre (por ejemplo, FileZilla).

## Propuestas para clientes

Cada propuesta vive en su propia carpeta dentro de `public/` y se ve en `svblime.cl/<carpeta>/` (por ejemplo `public/backtojungle/` → `svblime.cl/backtojungle/`).

Para agregar una propuesta nueva exportada de Claude Design:

```bash
scripts/optimizar-propuesta.sh <carpeta-exportada> public/<nombre-carpeta>
```

La herramienta deja fuera los archivos que la página no usa y comprime fotos, videos y audio sin cambiar cómo se ve. El código de la página no se toca: la pantalla de contraseña y las protecciones (clic derecho, captura de pantalla, pantalla negra al cambiar de ventana) siguen igual. Requiere `ffmpeg` e ImageMagick.

Para ponerle la pantalla de contraseña de SVBLIME (si la exportación no la trae):

```bash
scripts/agregar-contrasena.sh public/<nombre-carpeta> "Propuesta privada · <Cliente>" <contraseña>
```

Para subirla al hosting basta con subir esa carpeta de `public/` con FileZilla.
