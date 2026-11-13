// Idea 2 · Señal
import { gsap, ScrollTrigger, A, REDUCED, TOUCH, smoothScroll, accent, followSpot, particles, galleryTile } from "./common.js";
import { WORK, LINEUP, SERVICES, TEAM } from "./data.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));

// ---- Contenido generado desde los datos reales ----
const CARD = [["#000", "#fff"], ["#4EA9FF", "#000"], ["#8F00FF", "#fff"], ["#F4F1EA", "#000"]];
const cards = $(".cards");
SERVICES.forEach(([n, name, desc, href], i) => {
  const c = document.createElement("article");
  c.className = "card";
  c.style.background = CARD[i][0]; c.style.color = CARD[i][1];
  c.innerHTML = `<span class="n">${n}</span><span></span><h3>${name.replace(" ", "<br>")}</h3><p>${desc}</p><a href="../${href}">Ver servicio</a>`;
  cards.appendChild(c);
});

const PICK = ["hiphop", "tecate", "blue", "pampilla", "movistar13", "polima", "eaton", "chevrolet", "face", "summit", "meli", "walmart"];
const works = PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean);
const reel = $(".reel-track");
works.forEach((w, i) => reel.appendChild(galleryTile(w, { interval: 2800, offset: i * 300 })));
$(".tot").textContent = String(works.length).padStart(2, "0");

const names = $(".names");
TEAM.forEach(([n, r, d, main, alt]) => {
  const li = document.createElement("li");
  li.dataset.photo = A + alt;
  li.innerHTML = `<span class="n">${n}</span><span class="r">${r}<span class="d">${d}</span></span>`;
  names.appendChild(li);
});

const COLORS = ["#4EA9FF", "#FFCD59", "#8F00FF"];
const cols = $(".trust-cols");
Object.entries(LINEUP).forEach(([k, g], i) => {
  const d = document.createElement("div");
  d.className = "trust-col";
  d.innerHTML = `<h4><i style="background:${COLORS[i]}"></i>${k}</h4><p class="head">${g.head.join(" · ")}</p><p class="rest">${g.rest.join(" · ")}</p>`;
  cols.appendChild(d);
});

// ---- Inicio: lente que sigue al mouse + partículas de colores ----
const hero = $(".hero");
const spot = followSpot(hero, $(".lens"), { radius: Math.min(innerWidth * 0.3, 380) });
particles($(".particles"), { count: innerWidth < 760 ? 90 : 230, colors: ["78,169,255", "255,205,89", "143,0,255", "255,255,255"], repel: 180 });

// Equipo: la foto aparece y sigue al mouse al pasar por cada nombre
const photo = $(".crew-photo");
if (!TOUCH) {
  const qx = gsap.quickTo(photo, "x", { duration: 0.6, ease: "power3" });
  const qy = gsap.quickTo(photo, "y", { duration: 0.6, ease: "power3" });
  addEventListener("pointermove", (e) => { qx(e.clientX); qy(e.clientY); });
  $$(".names li").forEach((li) => {
    li.addEventListener("pointerenter", () => { photo.src = li.dataset.photo; gsap.to(photo, { opacity: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: 0.4 }); });
    li.addEventListener("pointerleave", () => gsap.to(photo, { opacity: 0, scale: 0.9, duration: 0.3 }));
  });
}

if (!REDUCED) {
  smoothScroll();

  // Inicio: el título sube línea por línea; al bajar, la lente crece hasta llenar la pantalla
  gsap.from(".hero-title .l", { yPercent: 110, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, delay: 0.3 });
  gsap.from(".hero-foot", { opacity: 0, duration: 1, delay: 1 });
  gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, pin: true, pinSpacing: true } })
    .to(spot, { radius: Math.hypot(innerWidth, innerHeight), ease: "power1.in" }, 0)
    .to(".hero-title", { yPercent: -40, opacity: 0, ease: "none" }, 0.2);

  // Bandas de servicios que corren en direcciones opuestas
  gsap.fromTo(".b1", { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".bands", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".b2", { xPercent: -35 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: ".bands", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".bands-copy", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".bands-copy", start: "top 85%" } });

  // Imagen que crece a pantalla completa, se reemplaza y luego aparece la frase
  gsap.timeline({ scrollTrigger: { trigger: ".expand", start: "top top", end: "bottom bottom", scrub: true } })
    .fromTo(".e1", { scale: 1.25 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none", duration: 1 })
    .to(".e2", { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 0.8 }, 1.2)
    .fromTo(".e2", { scale: 1.2 }, { scale: 1.05, ease: "none", duration: 1.4 }, 1.2)
    .from(".expand-title .nw, .expand-title", { yPercent: 40, opacity: 0, ease: "power2.out", duration: 0.6 }, 2);

  // Servicios apilados: cada tarjeta empuja a la anterior hacia atrás
  const cardEls = $$(".card");
  cardEls.forEach((c, i) => {
    const next = cardEls[i + 1];
    if (next) gsap.to(c, { scale: 0.9, opacity: 0.35, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true } });
  });
  gsap.from(".stack-title", { yPercent: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".stack-title", start: "top 85%" } });

  // Galería horizontal guiada por el scroll
  const dist = () => reel.scrollWidth - innerWidth;
  gsap.to(reel, {
    x: () => -dist(), ease: "none",
    scrollTrigger: {
      trigger: ".reel", start: "top top", end: () => "+=" + dist(), pin: ".reel-pin", scrub: 1, invalidateOnRefresh: true,
      onUpdate: (st) => ($(".cur").textContent = String(Math.min(works.length, 1 + Math.floor(st.progress * works.length))).padStart(2, "0")),
    },
  });

  // Nombres del equipo que entran desde abajo
  $$(".names li").forEach((li) => gsap.from(li, { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 92%" } }));

  // "Hablemos" gigante corriendo con el scroll
  gsap.fromTo(".giant-track", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".end", start: "top bottom", end: "bottom bottom", scrub: true } });
  // (Se crea al final para que considere el espacio de las secciones fijadas.)
  // El fondo de toda la página cambia de color según la sección
  $$("section[data-bg]").forEach((s) =>
    ScrollTrigger.create({
      trigger: s, start: "top 55%", end: "bottom 55%",
      onToggle: (st) => st.isActive && gsap.to("body", { backgroundColor: s.dataset.bg, color: s.dataset.fg, duration: 0.8, ease: "power2.out", overwrite: true }),
    })
  );

  ScrollTrigger.refresh();
} else {
  spot.radius = 9999;
}

const v = $(".lens");
v.playbackRate = 0.8;
v.play().catch(() => {});
