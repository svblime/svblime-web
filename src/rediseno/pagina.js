// Rediseño SVBLIME · páginas de servicio y preguntas frecuentes (mismo lenguaje de la portada).
import { gsap, ScrollTrigger, A, REDUCED, TOUCH, smoothScroll, accent, isoSpot, lazyVideo } from "./common.js";
import { headerMenu, customCursor, strokeFill, brandStrip } from "./final.js";
import { mejoras } from "./mejoras.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const BRAND = ["#4EA9FF", "#FFCD59", "#8F00FF"];

$$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));
headerMenu().reveal();
brandStrip($(".brand-strip"));
if (!TOUCH) customCursor();
$$("video[data-src]").forEach(lazyVideo);

// Casos con varias fotos: pasan solas, una tras otra
$$(".slides").forEach((box, k) => {
  const imgs = $$("img", box);
  if (imgs.length < 2) return;
  let i = 0;
  setTimeout(() => setInterval(() => { imgs[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].classList.add("on"); }, 3200), k * 500);
});

// Inicio de la página: el video corre de fondo y el círculo lo deja ver sobre negro, como en la portada
const hero = $(".srv-hero");
if (hero) {
  const veil = $(".veil", hero);
  // El video de fondo parte solo (en celular también, sin sonido)
  const hv = $("video.hero-video", hero);
  if (hv) { hv.muted = true; hv.play().catch(() => {}); }
  isoSpot(hero, veil);
  if (!REDUCED) {
    gsap.from($$(".hero-title .l", hero), { yPercent: 110, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, delay: 0.25 });
    gsap.from($$(".hero-extra", hero), { opacity: 0, y: 14, duration: 1, ease: "power2.out", stagger: 0.12, delay: 0.7 });
  }
}

if (REDUCED) {
  $$(".curtain").forEach((c) => c.remove());
} else {
  const lenis = smoothScroll();

  // Pasada de los tres colores al comienzo de cada sección
  $$(".act").forEach((act, ai) => {
    const bars = $$(".curtain i", act);
    if (!bars.length) return;
    bars.forEach((b, i) => (b.style.background = BRAND[(i + ai) % 3]));
    const ends = ["top 48%", "top 30%", "top 12%"];
    bars.forEach((b, i) => gsap.fromTo(b, { scaleY: 1 }, { scaleY: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: act, start: "top 98%", end: ends[i], scrub: true } }));
  });

  // Casos: las tres piezas se abren una tras otra (como los pilares de la portada)
  const cols = $$(".case-col");
  if (cols.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".cases", start: "top top", end: "bottom bottom", scrub: true } });
    cols.forEach((c, i) => {
      tl.to(cols, { flexGrow: (j) => (j === i ? 12 : 0.0001), ease: "power2.inOut", duration: 1 }, i * 1.2);
      tl.fromTo($$("img, video", c), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, i * 1.2);
      tl.fromTo($("figcaption", c), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, i * 1.2 + 0.5);
    });
  }

  // Trazo → relleno en los textos grandes
  $$(".sf-scroll").forEach((el) => strokeFill(el));

  // Preguntas: cada grupo entra desde abajo
  $$(".faq-q").forEach((d) => gsap.from(d, { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: d, start: "top 92%" } }));

  // Hablemos gigante
  const giant = $(".giant-track");
  if (giant) {
    // Hablemos quieto: solo cambia a amarillo al pasar el mouse
  }
  ScrollTrigger.refresh();
  if (lenis && location.hash) setTimeout(() => { const t = $(location.hash); if (t) lenis.scrollTo(t, { offset: -70 }); }, 300);
}
mejoras();
