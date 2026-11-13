// Secciones compartidas por las ideas 3 y 4 (lo que el equipo eligió de las ideas 1 y 2).
import { gsap, ScrollTrigger, A, REDUCED, TOUCH, followSpot, particles, scrubWords, galleryTile } from "./common.js";
import { WORK, SERVICES, TEAM, PILLARS, CLIENTS } from "./data.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const BRAND = ["#4EA9FF", "#FFCD59", "#8F00FF"];

// ---------- Inicio en tres tiempos (como la web actual) ----------
// 1) el video se ve limpio · 2) entra el texto con las partículas · 3) el escenario se oscurece
// y el mouse pasa a ser el seguidor de luz que vuelve a encender el video.
export function heroSequence(root, { onStage } = {}) {
  const video = $(".hero-video", root), veil = $(".veil", root), canvas = $(".particles", root);
  const lines = $$(".hero-title .l", root), extras = $$(".hero-extra", root);
  gsap.set(veil, { opacity: 0 });
  gsap.set(canvas, { opacity: 0 });
  gsap.set(lines, { yPercent: 110, opacity: 0 });
  gsap.set(extras, { opacity: 0 });
  particles(canvas, { count: innerWidth < 760 ? 70 : 150, colors: ["255,255,255", "78,169,255", "255,205,89", "143,0,255"] });
  let textIn = false, lit = false;
  const showText = () => {
    if (textIn) return; textIn = true;
    gsap.to(lines, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 });
    gsap.to(canvas, { opacity: 1, duration: 1.6 });
    gsap.to(extras, { opacity: 1, duration: 1, delay: 0.6 });
  };
  const goDark = () => {
    if (lit) return; lit = true; showText();
    followSpot(root, veil, { radius: Math.max(220, innerWidth * 0.2) });
    gsap.to(veil, { opacity: 1, duration: 1.6, ease: "power2.inOut" });
    video.loop = true; video.play().catch(() => {});
    onStage && onStage();
  };
  video.loop = false;
  video.playbackRate = 0.8;
  video.addEventListener("timeupdate", () => { if (video.duration && video.currentTime > video.duration * 0.5) showText(); });
  video.addEventListener("ended", goDark);
  video.play().catch(() => goDark());
  setTimeout(showText, 3500);   // por si el video tarda en partir
  setTimeout(goDark, 9000);
  if (REDUCED) { showText(); goDark(); }
}

// ---------- Manifiesto: palabra por palabra ----------
export function manifesto(el) { if (!REDUCED) scrubWords(el, { start: "top 75%", end: "bottom 40%" }); }

// ---------- Pilares: una foto de corporativos, una de TV y una de artistas ----------
export function pillarsHTML(cls = "pillar") {
  return PILLARS.map((p, i) => `<figure class="${cls} p${i + 1}"><img src="${A}${p.photo}" alt="${p.t} · ${p.v}">
    <figcaption><span class="mono">${String(i + 1).padStart(2, "0")} · ${p.label}</span><span class="pv">${p.t} · ${p.v}</span></figcaption></figure>`).join("");
}

// ---------- Servicios ----------
export function servicesHorizontal(section, track) {
  SERVICES.forEach(([n, name, desc, href], i) => {
    const el = document.createElement("article");
    el.className = "service";
    el.innerHTML = `<span class="bar" style="background:${BRAND[i % 3]}"></span><span class="num">${n}</span>
      <div><h3>${name.replace(" ", "<br>")}</h3></div><div><p>${desc}</p><a href="../${href}">Ver servicio</a></div>`;
    track.appendChild(el);
  });
  if (REDUCED) return;
  const dist = () => track.scrollWidth - innerWidth;
  gsap.to(track, { x: () => -dist(), ease: "none",
    scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
}

export function servicesStack(container, palette) {
  SERVICES.forEach(([n, name, desc, href], i) => {
    const c = document.createElement("article");
    c.className = "card";
    c.style.background = palette[i][0]; c.style.color = palette[i][1];
    c.innerHTML = `<span class="n">${n}</span><span></span><h3>${name.replace(" ", "<br>")}</h3><p>${desc}</p><a href="../${href}">Ver servicio</a>`;
    container.appendChild(c);
  });
  if (REDUCED) return;
  const cards = $$(".card", container);
  cards.forEach((c, i) => {
    const next = cards[i + 1];
    if (next) gsap.to(c, { scale: 0.9, opacity: 0.35, ease: "none", scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true } });
  });
}

// ---------- Galería (idea 1): fotos grandes que cambian solas, texto al pasar el mouse ----------
const PICK = ["hiphop", "blue", "tecate", "pampilla", "eaton", "movistar13", "polima", "chevrolet", "face", "meli", "summit", "walmart"];
export function workGrid(grid) {
  const works = PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean);
  works.forEach((w, i) => grid.appendChild(galleryTile(w, { interval: 3000 + (i % 3) * 400, offset: i * 350 })));
  if (REDUCED) return;
  $$(".tile", grid).forEach((t) =>
    gsap.from(t, { clipPath: "inset(18% 0 18% 0)", scale: 0.96, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 90%" } }));
}

// ---------- Equipo (idea 2): la foto sigue al mouse sobre cada nombre ----------
// Corrección: la foto se esconde al hacer scroll fuera de los nombres y al salir de la sección.
export function crew(section) {
  const list = $(".names", section), photo = $(".crew-photo", section);
  TEAM.forEach(([n, r, d, main, alt]) => {
    const li = document.createElement("li");
    li.dataset.photo = A + alt;
    li.innerHTML = `<span class="n">${n}</span><span class="r">${r}<span class="d">${d}</span></span>`;
    list.appendChild(li);
  });
  if (!REDUCED) $$("li", list).forEach((li) => gsap.from(li, { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 92%" } }));
  if (TOUCH) return;
  // La foto vive fuera del flujo de la página, para que nada la "arrastre" con el scroll.
  document.body.appendChild(photo);
  const qx = gsap.quickTo(photo, "x", { duration: 0.6, ease: "power3" });
  const qy = gsap.quickTo(photo, "y", { duration: 0.6, ease: "power3" });
  let mx = -1, my = -1, current = null;
  const show = (li) => {
    if (li === current) return;
    current = li;
    if (li) { photo.src = li.dataset.photo; gsap.to(photo, { opacity: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: 0.35, overwrite: "auto" }); }
    else gsap.to(photo, { opacity: 0, scale: 0.9, duration: 0.25, overwrite: "auto" });
  };
  const check = () => {
    const el = mx < 0 ? null : document.elementFromPoint(mx, my);
    const li = el && el.closest ? el.closest(".names li") : null;
    show(li && list.contains(li) ? li : null);
  };
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; qx(mx); qy(my); check(); }, { passive: true });
  addEventListener("scroll", check, { passive: true });
  document.addEventListener("pointerleave", () => show(null));
  ScrollTrigger.create({ trigger: section, start: "top bottom", end: "bottom top", onLeave: () => show(null), onLeaveBack: () => show(null) });
}

// ---------- Clientes (idea 1): filas que avanzan en horizontal con el scroll ----------
export function clientRows(section, rowsEl, { stroke = "currentColor" } = {}) {
  Object.values(CLIENTS).forEach((names, gi) => {
    const html = names.map((n, i) => `<i class="dot" style="background:${BRAND[gi]}"></i><span class="${i % 2 ? "o" : ""}">${n}</span>`).join("");
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = html + html;
    rowsEl.appendChild(row);
  });
  section.style.setProperty("--stroke", stroke);
  if (REDUCED) return;
  $$(".row", rowsEl).forEach((r, i) =>
    gsap.fromTo(r, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, ease: "none",
      scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } }));
}

// ---------- Hablemos (idea 2) ----------
export function endHablemos(section) {
  if (REDUCED) return;
  gsap.fromTo($(".giant-track", section), { xPercent: 0 }, { xPercent: -50, ease: "none",
    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: true } });
}
