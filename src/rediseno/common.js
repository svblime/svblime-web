// Piezas compartidas por las dos ideas del rediseño.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);
export { gsap, ScrollTrigger, SplitText };

// Fotos y videos de las ideas: copia propia en /rediseno/media/, para que la carpeta funcione sola.
// Carpeta de fotos y videos: las páginas de servicio (en /servicios/) la declaran con <html data-media="../media/">.
export const A = (typeof document !== "undefined" && document.documentElement.dataset.media) || "media/";
export const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const TOUCH = window.matchMedia("(hover: none)").matches;

// Scroll suave sincronizado con las animaciones de scroll.
export function smoothScroll() {
  if (REDUCED) return null;
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); lenis.scrollTo(target, { duration: 1.6 }); }
    })
  );
  return lenis;
}

// Envuelve letras indicadas entre [corchetes] en la tipografía de contraste.
// "imagin[a]rlo" → imagin<em class="alt">a</em>rlo
export function accent(text) {
  // Cada palabra con letras de contraste queda en una pieza, para que no se corte entre líneas.
  return text.replace(/[^\s<>]*\[[^\]]+\][^\s<>]*/g, (word) =>
    `<span class="nw">${word.replace(/\[([^\]]+)\]/g, '<em class="alt">$1</em>')}</span>`);
}

// Seguidor de luz: el video se ve oscuro y donde está el mouse se ilumina.
// El elemento `veil` es una capa oscura con un agujero (máscara) que sigue al cursor.
export function followSpot(area, veil, { radius = 260 } = {}) {
  const state = { radius };
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const cur = { ...pos };
  let idle = 0;
  const set = (e) => {
    const r = area.getBoundingClientRect();
    pos.x = e.clientX - r.left; pos.y = e.clientY - r.top; idle = 0;
  };
  area.addEventListener("pointermove", set);
  area.addEventListener("pointerdown", set);
  // Solo se recalcula mientras el inicio está en pantalla, y solo se repinta si la luz se movió
  let visible = true, last = "";
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(area);
  gsap.ticker.add(() => {
    if (!visible || document.hidden) return;
    idle += 1;
    if (idle > 180 || TOUCH) {
      // Sin mouse: la luz recorre el escenario sola, como un seguidor en un show.
      const t = performance.now() / 1000;
      pos.x = area.clientWidth * (0.5 + 0.28 * Math.sin(t * 0.5));
      pos.y = area.clientHeight * (0.5 + 0.18 * Math.sin(t * 0.8));
    }
    cur.x += (pos.x - cur.x) * 0.09; cur.y += (pos.y - cur.y) * 0.09;
    const key = (cur.x | 0) + "," + (cur.y | 0) + "," + (state.radius | 0);
    if (key === last) return;
    last = key;
    veil.style.setProperty("--x", cur.x.toFixed(1) + "px");
    veil.style.setProperty("--y", cur.y.toFixed(1) + "px");
    veil.style.setProperty("--r", state.radius + "px");
  });
  return state; // state.radius se puede animar (ej. que la luz crezca al bajar)
}

// Partículas de polvo en el haz de luz: flotan y se apartan del mouse.
export function particles(canvas, { count = 140, colors = ["255,255,255"], repel = 140 } = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let w, h, pts = [];
  const mouse = { x: -9999, y: -9999 };
  const resize = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
      s: Math.random() * 1.8 + 0.4, a: Math.random() * 0.6 + 0.2,
      c: colors[(Math.random() * colors.length) | 0], d: Math.random() * Math.PI * 2,
    }));
  };
  resize(); addEventListener("resize", resize);
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
  gsap.ticker.add(() => {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.d += 0.004;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
      if (dist < repel) { const f = (1 - dist / repel) * 1.6; p.vx += (dx / dist) * f; p.vy += (dy / dist) * f; }
      p.vx = p.vx * 0.92 + Math.cos(p.d) * 0.04; p.vy = p.vy * 0.92 - 0.06;
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
    }
  });
}

// Texto que se ilumina palabra por palabra con el scroll.
export function scrubWords(el, { start = "top 80%", end = "bottom 45%", from = 0.12 } = {}) {
  const split = new SplitText(el, { type: "words" });
  gsap.fromTo(split.words, { opacity: from }, {
    opacity: 1, stagger: 0.08, ease: "none",
    scrollTrigger: { trigger: el, start, end, scrub: true },
  });
}

// Líneas que entran desde abajo, enmascaradas, al aparecer en pantalla.
export function revealLines(el, { delay = 0 } = {}) {
  const split = new SplitText(el, { type: "lines", mask: "lines" });
  gsap.from(split.lines, {
    yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.09, delay,
    scrollTrigger: { trigger: el, start: "top 88%" },
  });
}

// Tarjeta de galería: foto grande que cambia sola; el texto aparece solo al pasar el mouse.
export function galleryTile(w, { interval = 3200, offset = 0 } = {}) {
  const el = document.createElement("figure");
  el.className = "tile";
  el.innerHTML =
    w.photos.map((p, i) => `<img src="${A}${p}" alt="${w.t} · ${w.v}" loading="lazy" decoding="async"${i === 0 ? ' class="on"' : ""}>`).join("") +
    `<figcaption><span class="t">${w.t}</span><span class="v">${w.v}</span><span class="tags">${w.tags.join(" · ")}</span></figcaption>`;
  const imgs = el.querySelectorAll("img");
  let i = 0, hover = false, timer;
  const next = () => {
    if (!hover && imgs.length > 1) {
      imgs[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].classList.add("on");
    }
  };
  new IntersectionObserver(([e]) => {
    clearInterval(timer);
    if (e.isIntersecting) setTimeout(() => (timer = setInterval(next, interval)), offset);
  }).observe(el);
  el.addEventListener("pointerenter", () => (hover = true));
  el.addEventListener("pointerleave", () => (hover = false));
  return el;
}

// Celular: pantalla angosta. Ahí se usan las versiones livianas de los videos (archivo "-m.mp4").
export const MOBILE = window.matchMedia("(max-width: 760px)").matches;
export const videoSrc = (src) => (MOBILE && src ? src.replace(/\.mp4$/, "-m.mp4") : src);

// Video que solo se descarga y reproduce cuando está en pantalla, y se pausa al salir.
// En celular además se descarga al salir: los teléfonos reproducen pocos videos a la vez
// y, si se acumulan, algunos quedan en negro.
export function lazyVideo(video) {
  video.muted = true; video.defaultMuted = true;
  video.setAttribute("muted", ""); video.setAttribute("playsinline", ""); video.setAttribute("webkit-playsinline", "");
  let on = false;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      on = true;
      if (!video.getAttribute("src")) video.src = videoSrc(video.dataset.src);
      const tryPlay = () => on && video.play().catch(() => {});
      tryPlay();
      if (video.readyState < 2) video.addEventListener("canplay", tryPlay, { once: true });
    } else if (video.getAttribute("src")) {
      on = false;
      video.pause();
      if (MOBILE) { video.removeAttribute("src"); video.load(); }
    }
  }, { rootMargin: MOBILE ? "120px" : "200px" }).observe(video);
}
