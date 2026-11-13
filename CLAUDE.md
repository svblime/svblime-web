# svblime-web

Web de SVBLIME (svblime.cl), agencia creativa de experiencias en vivo (Chile), y las propuestas privadas para clientes que se publican en ella.

- Cambios en la web → skill `web-svblime`.
- Propuestas de clientes (`public/<carpeta>/`, con contraseña) → skill `publicar-propuesta`.

Reglas base:
- **No cambiar textos ni diseño visible sin que el usuario lo pida.** Se pueden hacer mejoras técnicas invisibles (velocidad, compresión).
- Verificar en navegador antes de entregar y compilar con `npm run build` si se tocó `src/`.
- Lo que se sube al hosting es solo `public/` (por FTP, con FileZilla). El `.htaccess` del servidor no se reemplaza sin revisarlo.
- Responder en español de Chile, claro y sin jerga técnica.
