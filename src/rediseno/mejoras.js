// Versión mejorada (privada, con clave): detalles extra sobre la versión publicada.
// Solo se activa en las páginas con <body class="... mejorada">.
import { gsap, REDUCED, TOUCH } from "./common.js";

const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const BRAND = ["#4EA9FF", "#FFCD59", "#8F00FF"];

export function mejoras() {
  if (!document.body.classList.contains("mejorada") || REDUCED) return;

  // 1 · Pasada de tres colores entre páginas: al entrar se retiran, al salir cubren la pantalla
  const wipe = document.createElement("div");
  wipe.className = "page-wipe";
  wipe.innerHTML = BRAND.map((c) => `<i style="background:${c}"></i>`).join("");
  document.body.appendChild(wipe);
  const bars = $$("i", wipe);
  gsap.set(bars, { yPercent: 0 });
  gsap.to(bars, { yPercent: -100, duration: 0.8, ease: "power3.inOut", stagger: 0.08, delay: 0.05, onComplete: () => (wipe.style.visibility = "hidden") });
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname) || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    wipe.style.visibility = "visible";
    gsap.fromTo(bars, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "power3.in", stagger: 0.07, onComplete: () => (location.href = url.href) });
  });
  addEventListener("pageshow", (e) => { if (e.persisted) { gsap.set(bars, { yPercent: -100 }); wipe.style.visibility = "hidden"; } });

  // 2 · Barra de avance en los tres colores bajo el menú
  const prog = document.createElement("div");
  prog.className = "scroll-progress";
  document.body.appendChild(prog);
  const upd = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
  };
  addEventListener("scroll", upd, { passive: true }); upd();

  if (TOUCH) return;

  // 3 · Botones magnéticos: se acercan un poco al mouse
  $$(".cta-hablemos, .svb-talk, .service a, .srv-card a, .more-link").forEach((el) => {
    const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" }), qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - r.left - r.width / 2) * 0.3); qy((e.clientY - r.top - r.height / 2) * 0.4);
    });
    el.addEventListener("pointerleave", () => { qx(0); qy(0); });
  });

  // 4 · Pulseras con relieve: se inclinan siguiendo el mouse
  $$(".names li").forEach((li) => {
    const img = li.querySelector(".strip.band img");
    if (!img) return;
    li.addEventListener("pointermove", (e) => {
      const r = li.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, { rotateY: px * 18, rotateX: -py * 22, rotateZ: px * -2, duration: 0.5, ease: "power3", transformPerspective: 900 });
    });
    li.addEventListener("pointerleave", () => gsap.to(img, { rotateY: 0, rotateX: 0, rotateZ: 0, duration: 0.8, ease: "power3" }));
  });
}
