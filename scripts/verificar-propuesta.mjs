// Compara una propuesta original con su versión optimizada en un navegador.
//
//   node scripts/verificar-propuesta.mjs <carpeta-original> <carpeta-optimizada> [carpeta-capturas]
//
// Revisa en ambas: largo de la página, imágenes rotas y errores. Salta la pantalla de contraseña
// (lee la clave de sesión del index.html) y sirve React/Babel desde node_modules, porque las
// exportaciones de Claude Design los cargan desde unpkg.com. Guarda capturas lado a lado en
// [carpeta-capturas] (por defecto, /tmp/verificacion-propuesta) para revisarlas a ojo.
// Requiere Playwright (preinstalado en las sesiones de Claude Code en la nube) y `npm install`.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const [orig, opt, outDir = "/tmp/verificacion-propuesta"] = process.argv.slice(2);
if (!orig || !opt) { console.error("Uso: node scripts/verificar-propuesta.mjs <original> <optimizada> [capturas]"); process.exit(1); }
mkdirSync(outDir, { recursive: true });

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright"))); }

const TYPES = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".gif": "image/gif", ".mp4": "video/mp4", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".otf": "font/otf",
  ".ttf": "font/ttf", ".woff": "font/woff", ".woff2": "font/woff2" };

function serve(dir) {
  const root = resolve(dir);
  return new Promise((ok) => {
    const s = createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let f = join(root, p);
      if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
      if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
      if (!existsSync(f)) { res.writeHead(404).end(); return; }
      res.writeHead(200, { "Content-Type": TYPES[extname(f).toLowerCase()] || "application/octet-stream" });
      res.end(readFileSync(f));
    }).listen(0, "127.0.0.1", () => ok(s));
  });
}

const key = (readFileSync(join(opt, "index.html"), "utf8").match(/var KEY='([^']+)'/) || [])[1];
const NM = resolve("node_modules");
const browser = await chromium.launch();
const results = {};
const spots = [0.02, 0.15, 0.3, 0.5, 0.7, 0.9];

for (const [tag, dir] of [["original", orig], ["optimizada", opt]]) {
  const server = await serve(dir);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  if (key) await ctx.addInitScript((k) => sessionStorage.setItem(k, "1"), key);
  const page = await ctx.newPage();
  await page.route("https://unpkg.com/**", (r) => {
    const m = new URL(r.request().url()).pathname.slice(1).match(/^(@[^/]+\/[^@/]+|[^@/]+)@[^/]+\/(.*)$/);
    const f = m && join(NM, m[1], m[2]);
    return f && existsSync(f) ? r.fulfill({ path: f, contentType: "application/javascript" }) : r.continue();
  });
  const errors = [];
  page.on("response", (r) => { if (r.status() >= 400 && !/%7B%7B/.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
  page.on("pageerror", (e) => errors.push(`JS ${e.message}`));
  await page.goto(`http://127.0.0.1:${server.address().port}/`, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(3000);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (const [i, f] of spots.entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(height * f));
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(outDir, `${i}-${tag}.png`) });
  }
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")));
  results[tag] = { height, broken, errors };
  await ctx.close(); server.close();
}
await browser.close();

for (const [tag, r] of Object.entries(results)) {
  console.log(`${tag}: largo ${r.height}px · imágenes rotas ${r.broken.length} · errores ${r.errors.length}`);
  r.broken.slice(0, 5).forEach((b) => console.log(`   rota: ${b}`));
  r.errors.slice(0, 5).forEach((e) => console.log(`   error: ${e}`));
}
const o = results.original, n = results.optimizada;
const ok = n.broken.length <= o.broken.length && n.errors.length <= o.errors.length && Math.abs(o.height - n.height) < 40;
console.log(ok ? "OK: la versión optimizada se comporta igual que la original." : "REVISAR: hay diferencias entre original y optimizada.");
console.log(`Capturas en ${outDir} (pares <n>-original.png / <n>-optimizada.png).`);
process.exit(ok ? 0 : 1);
