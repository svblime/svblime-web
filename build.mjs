// Compila el sitio: componentes del design system + src/site.jsx → public/js/app.min.js
// y copia React en versión de producción a public/vendor/.
import { transformSync, buildSync } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";

const ds = readFileSync("src/ds-components.js", "utf8");
const site = readFileSync("src/site.jsx", "utf8");
const mount = `
(function mount() {
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(window.SiteSeo));
})();
`;

const siteJs = transformSync(site, { loader: "jsx", jsxFactory: "React.createElement", jsxFragment: "React.Fragment" }).code;
const out = transformSync(`${ds}\n;(() => {\n${siteJs}\n})();\n${mount}`, {
  loader: "js",
  minify: true,
  target: "es2018",
  legalComments: "none",
}).code;

mkdirSync("public/js", { recursive: true });
mkdirSync("public/vendor", { recursive: true });
writeFileSync("public/js/app.min.js", out);
copyFileSync("node_modules/react/umd/react.production.min.js", "public/vendor/react.production.min.js");
copyFileSync("node_modules/react-dom/umd/react-dom.production.min.js", "public/vendor/react-dom.production.min.js");
console.log(`app.min.js: ${(out.length / 1024).toFixed(0)} KB`);

// Rediseño (versión final): portada y página de contacto en public/rediseno/js/.
for (const name of ["inicio", "contacto", "pagina"]) {
  buildSync({ entryPoints: [`src/rediseno/${name}.js`], bundle: true, minify: true, format: "iife", target: "es2019",
    outfile: `public/rediseno/js/${name}.min.js`, legalComments: "none", logLevel: "warning" });
}
