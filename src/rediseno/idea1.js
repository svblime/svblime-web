// Idea 1 · Escenario
import { gsap, ScrollTrigger, A, REDUCED, smoothScroll, accent, followSpot, particles, scrubWords, revealLines, galleryTile } from "./common.js";
import { WORK, LINEUP, SERVICES, TEAM } from "./data.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const COLORS = ["var(--blue)", "var(--amber)", "var(--violet)"];

// Letras en tipografía de contraste
$$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));

// ---- Contenido generado desde los datos reales ----
const track = $(".services-track");
SERVICES.forEach(([n, name, desc, href], i) => {
  const el = document.createElement("article");
  el.className = "service";
  el.innerHTML = `<span class="bar" style="background:${COLORS[i % 3]}"></span>
    <span class="num">${n}</span>
    <div><h3>${name.replace(" ", "<br>")}</h3></div>
    <div><p>${desc}</p><a href="${A}${href}">Ver servicio</a></div>`;
  track.appendChild(el);
});

const PICK = ["hiphop", "blue", "tecate", "pampilla", "eaton", "movistar13", "polima", "chevrolet", "face", "meli", "summit", "walmart"];
const works = PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean);
const grid = $(".work-grid");
works.forEach((w, i) => grid.appendChild(galleryTile(w, { interval: 3000 + (i % 3) * 400, offset: i * 350 })));

const tg = $(".team-grid");
TEAM.forEach(([n, r, d, main, alt]) => {
  const f = document.createElement("figure");
  f.className = "person";
  f.innerHTML = `<img class="main" src="${A}${main}" alt="${n}" loading="lazy"><img class="alt" src="${A}${alt}" alt="" loading="lazy">
    <figcaption><span class="n">${n}</span><span class="r">${r}</span><span class="d">${d}</span></figcaption>`;
  tg.appendChild(f);
});

const rows = $(".rows");
Object.values(LINEUP).forEach((g, gi) => {
  const names = [...g.head, ...g.rest];
  const html = names.map((n, i) => `<i class="dot" style="background:${COLORS[gi]}"></i><span class="${i % 2 ? "o" : ""}">${n}</span>`).join("");
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = html + html;
  rows.appendChild(row);
});

// ---- Movimiento ----
const stage = $(".hero-stage");
followSpot(stage, $(".veil"), { radius: Math.max(220, innerWidth * 0.2) });
particles($(".particles"), { count: innerWidth < 760 ? 70 : 150, colors: ["255,255,255", "78,169,255", "255,205,89", "143,0,255"] });

if (!REDUCED) {
  smoothScroll();

  // Inicio: los haces de luz se dibujan y el título entra por líneas
  $$(".beams *").forEach((el, i) => {
    const len = el.getTotalLength ? el.getTotalLength() : 2000;
    gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", delay: 0.2 + i * 0.08 });
  });
  revealLines($(".hero-title"), { delay: 0.4 });
  gsap.from(".kicker, .hint, .scroll-cue", { opacity: 0, duration: 1.2, delay: 1.1 });

  // Al bajar, el escenario se aleja hacia atrás y la sección crema entra encima
  ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", pin: true, pinSpacing: false });
  gsap.to(stage, {
    scale: 0.82, borderRadius: 28, opacity: 0.35, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.set(".manifesto", { position: "relative", zIndex: 2, backgroundColor: "var(--bone)" });

  // Manifiesto palabra por palabra
  scrubWords($(".manifesto .scrub"), { start: "top 75%", end: "bottom 35%" });

  // Interludio: imágenes que se reemplazan de abajo hacia arriba, sin texto
  const it = gsap.timeline({ scrollTrigger: { trigger: ".interlude", start: "top top", end: "bottom bottom", scrub: true } });
  it.fromTo(".s1", { scale: 1.18 }, { scale: 1, ease: "none", duration: 1 })
    .to(".s2", { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 }, 0.6)
    .fromTo(".s2", { scale: 1.2 }, { scale: 1, ease: "none", duration: 1.4 }, 0.6)
    .to(".s3", { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 }, 1.6)
    .fromTo(".s3", { scale: 1.2 }, { scale: 1, ease: "none", duration: 1.2 }, 1.6);

  // Servicios: la franja avanza hacia el lado mientras bajas
  const dist = () => track.scrollWidth - innerWidth;
  gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: { trigger: ".services", start: "top top", end: () => "+=" + dist(), pin: ".services-pin", scrub: 1, invalidateOnRefresh: true },
  });
  $$(".service .bar").forEach((b) => gsap.from(b, { scaleY: 0, ease: "none", scrollTrigger: { trigger: ".services", start: "top top", end: () => "+=" + dist() * 0.8, scrub: true } }));

  // Títulos que entran por líneas
  $$(".reveal").forEach((el) => revealLines(el));

  // Galería: cada foto se destapa al entrar
  $$(".work-grid .tile").forEach((t) =>
    gsap.from(t, { clipPath: "inset(18% 0 18% 0)", scale: 0.96, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 90%" } })
  );

  // Equipo: se queda y se aleja hacia atrás mientras la sección crema sube encima
  ScrollTrigger.create({ trigger: ".team", start: "bottom bottom", end: "+=100%", pin: true, pinSpacing: false });
  gsap.to(".team-inner", { scale: 0.86, opacity: 0.3, borderRadius: 28, ease: "none", scrollTrigger: { trigger: ".lineup", start: "top bottom", end: "top top", scrub: true } });

  // Lineup: filas que se mueven en direcciones opuestas con el scroll
  $$(".row").forEach((r, i) =>
    gsap.fromTo(r, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, ease: "none", scrollTrigger: { trigger: ".lineup", start: "top bottom", end: "bottom top", scrub: true } })
  );
}

// Video del inicio y vista sin animaciones
const v = $(".hero-video");
v.playbackRate = 0.8;
v.play().catch(() => {});
