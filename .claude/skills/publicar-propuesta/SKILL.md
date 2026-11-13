---
name: publicar-propuesta
description: Optimizar y publicar una propuesta de cliente de SVBLIME (página exportada de Claude Design que vive en svblime.cl/<carpeta>/, con pantalla de contraseña). Usar cuando el usuario pide subir, optimizar, alivianar, revisar o ponerle contraseña a una propuesta, o pasa un link svblime.cl/<carpeta>/.
---

# Publicar una propuesta de SVBLIME

Las propuestas son páginas exportadas de Claude Design (`index.html` + `support.js` + `_ds/` + imágenes, videos y audio). Cada una vive en `public/<carpeta>/` y se ve en `svblime.cl/<carpeta>/`. Hoy existen `propuesta` (Los Huasos del Algarrobal), `propuestasuv` (KWYK) y `backtojungle` (BACK TO JUNGLE · Franco el Gorila).

## Reglas

- **La propuesta debe verse exactamente igual** que la exportada. Solo se optimizan los archivos; el código de la página (textos, diseño, animaciones) no se toca.
- **La contraseña es una señal de confidencialidad**, no seguridad real: queda escrita en el código. El equipo lo sabe y así lo quiere. No proponer otro sistema salvo que lo pidan.
- Las protecciones que trae la exportación (clic derecho bloqueado, aviso de captura, pantalla negra al cambiar de ventana) se mantienen.
- Los originales pesados **no se guardan en el repositorio**: se descargan a una carpeta temporal. Solo la versión optimizada va a `public/`.
- Hablarle al usuario en español de Chile, sin jerga técnica: es una agencia creativa, no un equipo de desarrollo.

## Pasos

1. **Conseguir la propuesta original.** Lo normal es que el equipo la suba al hosting y pase el link. Descargarla:
   ```bash
   python3 scripts/descargar-propuesta.py https://www.svblime.cl/<carpeta> /tmp/orig-<carpeta>
   ```
   Si la descarga falla por red, el entorno necesita `www.svblime.cl` en sus dominios permitidos (configuración del entorno → acceso a red). Si el equipo sube la carpeta a GitHub, usar esa carpeta y **sacarla del repositorio** después (`git rm -r`), porque es pesada.

2. **Optimizar:**
   ```bash
   scripts/optimizar-propuesta.sh /tmp/orig-<carpeta> public/<carpeta>
   ```
   Deja fuera archivos sin uso, pasa fotos PNG a JPG, PNG con transparencia grandes a WebP, WAV a MP3, y recomprime videos a H.264 (máx. 1920 px, inicio rápido). Respeta los archivos cuyo nombre arma el código "al vuelo" (ej. `'assets/btj/leaf-' + tipo + '.png'`). Requiere `ffmpeg` e ImageMagick.

3. **Contraseña.** Si la exportación no trae pantalla de contraseña (buscar `svb-gate` en `index.html`), agregarla:
   ```bash
   scripts/agregar-contrasena.sh public/<carpeta> "Propuesta privada · <Cliente>" <contraseña>
   ```
   Preguntar al usuario el texto y la contraseña. También agrega `noindex` para que no aparezca en Google.

4. **Verificar** contra la original (obligatorio antes de entregar):
   ```bash
   npm install   # una vez por sesión
   node scripts/verificar-propuesta.mjs /tmp/orig-<carpeta> public/<carpeta> /tmp/verif-<carpeta>
   ```
   Debe decir `OK`. Mirar algunas capturas de `/tmp/verif-<carpeta>` lado a lado. Diferencias esperables: el cuadro de un video en el momento de la captura y elementos con posición aleatoria (hojas, partículas). Imágenes rotas o un largo distinto **no** son aceptables: corregir antes de seguir.

5. **Guardar en GitHub**: commit en `main` con el antes/después de peso y push.

6. **Explicarle al usuario cómo subirla**: descargar el ZIP del repo (Code → Download ZIP) y con FileZilla subir **solo** `public/<carpeta>` encima de la carpeta `<carpeta>` del servidor, reemplazando archivos. Decir el peso antes y después, y que la contraseña sigue igual (o cuál es, si se agregó).
