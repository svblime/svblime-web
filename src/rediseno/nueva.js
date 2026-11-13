// Ideas 5 y 6: la web armada con lo elegido por el equipo. La idea 6 suma mejoras (opciones `plus`).
import { gsap, ScrollTrigger, SplitText, A, REDUCED, TOUCH, smoothScroll, accent, followSpot, galleryTile } from "./common.js";
import { swarm } from "./swarm.js";
import { WORK, TEAM, CLIENTS } from "./data.js";
import { BRAND, pillarsHTML, servicesHorizontal } from "./sections.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function build({ plus = false } = {}) {
  $$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));

  // ---------- Inicio (idea Escenario) en tres tiempos, con el enjambre de partículas ----------
  const hero = $(".hero"), video = $(".hero-video"), veil = $(".veil"), canvas = $(".swarm");
  const lines = $$(".hero-title .l"), extras = $$(".hero-extra");
  swarm(canvas, { logo: plus });
  if (!REDUCED) {
    gsap.set(veil, { opacity: 0 }); gsap.set(canvas, { opacity: 0 });
    gsap.set(lines, { yPercent: 110, opacity: 0 }); gsap.set(extras, { opacity: 0 });
    $$(".beams *").forEach((el) => { const len = el.getTotalLength ? el.getTotalLength() : 2000; gsap.set(el, { strokeDasharray: len, strokeDashoffset: len }); });
  }
  let textIn = false, lit = false;
  const showText = () => {
    if (textIn || REDUCED) return; textIn = true;
    gsap.to(lines, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 });
    gsap.to(canvas, { opacity: 1, duration: 1.4 });
    gsap.to(extras, { opacity: 1, duration: 1, delay: 0.6 });
    gsap.to(".beams *", { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", stagger: 0.08 });
  };
  const goDark = () => {
    if (lit) return; lit = true; showText();
    followSpot(hero, veil, { radius: Math.max(240, innerWidth * 0.22) });
    gsap.to(veil, { opacity: 1, duration: 1.6, ease: "power2.inOut" });
    video.loop = true; video.play().catch(() => {});
  };
  video.loop = false; video.playbackRate = 0.8;
  video.addEventListener("timeupdate", () => { if (video.duration && video.currentTime > video.duration * 0.5) showText(); });
  video.addEventListener("ended", goDark);
  video.play().catch(goDark);
  setTimeout(showText, 3500); setTimeout(goDark, 9000);
  if (REDUCED) goDark();

  // ---------- Contenido ----------
  $(".tri").innerHTML = pillarsHTML("pill-col");
  servicesHorizontal($(".services-h"), $(".services-track"));

  // Galería (idea 3)
  const PICK = ["hiphop", "blue", "tecate", "pampilla", "eaton", "movistar13", "polima", "chevrolet", "face", "meli", "summit", "walmart"];
  const grid = $(".work-grid");
  PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean)
    .forEach((w, i) => grid.appendChild(galleryTile(w, { interval: 3000 + (i % 3) * 400, offset: i * 350 })));

  // Equipo: lista en una columna; la foto aparece recortada al tamaño de la fila del nombre
  const list = $(".names");
  TEAM.forEach(([n, r, d, main, alt]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="n">${n}</span><span class="strip"><img src="${A}${alt}" alt="${n}" loading="lazy"></span><span class="r">${r}<span class="d">${d}</span></span>`;
    list.appendChild(li);
  });
  if (TOUCH) $$(".names li").forEach((li) => li.classList.add("show"));

  // Clientes: todos los de SVBLIME Fest y más, repartidos en muchas filas
  const rows = $(".rows"), groups = Object.values(CLIENTS);
  groups.forEach((names, gi) => {
    const half = Math.ceil(names.length / 2);
    [names.slice(0, half), names.slice(half)].forEach((part) => {
      const html = part.map((n, i) => `<i class="dot" style="background:${BRAND[gi]}"></i><span class="${i % 2 ? "o" : ""}">${n}</span>`).join("");
      const row = document.createElement("div");
      row.className = "row"; row.innerHTML = html + html + html;
      rows.appendChild(row);
    });
  });

  // Formulario de contacto (idea 6): el mismo de la web actual
  if (plus) contactForm($(".contact-form"));

  if (REDUCED) { $$(".curtain").forEach((c) => c.remove()); return; }
  smoothScroll();

  // ---------- Telón de tres colores, cada franja a su propia velocidad, en todas las secciones ----------
  $$(".act").forEach((act, ai) => {
    const bars = $$(".curtain i", act);
    // En la idea 6 el color que va primero rota con cada sección
    if (plus) bars.forEach((b, i) => (b.style.background = BRAND[(i + ai) % 3]));
    const ends = ["top 48%", "top 30%", "top 12%"];
    bars.forEach((b, i) => gsap.fromTo(b, { scaleY: 1 }, { scaleY: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: act, start: "top 98%", end: ends[i], scrub: true } }));
  });

  // ---------- Manifiesto: palabras de solo trazo que se rellenan con el scroll ----------
  const m = $(".manifesto .scrub");
  const split = new SplitText(m, { type: "words" });
  gsap.fromTo(split.words, { color: "rgba(17,17,17,0)" }, { color: "rgba(17,17,17,1)", stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: m, start: "top 72%", end: "bottom 38%", scrub: true } });

  // ---------- Pilares (idea 3): cada foto se abre hasta llenar la pantalla ----------
  const cols = $$(".pill-col");
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".triptych", start: "top top", end: "bottom bottom", scrub: true } });
  cols.forEach((c, i) => {
    tl.to(cols, { flexGrow: (j) => (j === i ? 12 : 0.0001), ease: "power2.inOut", duration: 1 }, i * 1.2);
    tl.fromTo($("img", c), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, i * 1.2);
  });

  // ---------- Galería: zoom ligado al scroll, que se devuelve al subir ----------
  $$(".work-grid .tile").forEach((t) => {
    gsap.fromTo(t, { clipPath: "inset(16% 6% 16% 6%)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none",
      scrollTrigger: { trigger: t, start: "top 100%", end: "top 45%", scrub: true } });
    if (plus) $$("img", t).forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none",
      scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: true } }));
  });
  if (plus) $$(".work-grid .tile").forEach((t) => (t.style.setProperty("--depth", "1")));

  // ---------- Equipo: entran desde abajo ----------
  $$(".names li").forEach((li) => gsap.from(li, { yPercent: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 94%" } }));

  // ---------- Clientes: filas en direcciones opuestas, a distintas velocidades ----------
  $$(".row").forEach((r, i) => {
    const amt = 24 + (i % 3) * 8;
    gsap.fromTo(r, { xPercent: i % 2 ? -amt : 0 }, { xPercent: i % 2 ? 0 : -amt, ease: "none",
      scrollTrigger: { trigger: ".clients", start: "top bottom", end: "bottom top", scrub: true } });
  });

  // ---------- Hablemos ----------
  gsap.fromTo(".giant-track", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".end", start: "top bottom", end: "bottom bottom", scrub: true } });

  // ---------- Idea 6: índice de sección en el menú ----------
  if (plus) {
    const idx = $(".sec-idx"), name = $(".sec-name"), secs = $$("main > section[data-name]");
    secs.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 50%", end: "bottom 50%",
      onToggle: (st) => { if (st.isActive) { idx.textContent = String(i + 1).padStart(2, "0"); name.textContent = s.dataset.name; } } }));
    $(".sec-tot").textContent = String(secs.length).padStart(2, "0");
  }
  ScrollTrigger.refresh();
}

// Mismo formulario y textos de la web actual (envía a la misma casilla que hoy).
function contactForm(form) {
  if (!form) return;
  const msg = $(".form-msg", form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (!data.get("nombre") || !data.get("email") || !data.get("mensaje")) { msg.textContent = "Completa nombre, email y mensaje."; return; }
    data.append("_subject", "Nuevo contacto desde svblime.cl - " + data.get("nombre"));
    form.classList.add("sending");
    try {
      const r = await fetch("https://formsubmit.co/ajax/svblime.lab@gmail.com", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(r.status);
      form.reset(); msg.textContent = "Gracias por escribirnos. Revisamos la idea general y te proponemos una bajada clara y realista.";
    } catch (err) {
      msg.innerHTML = 'No pudimos enviar el mensaje. Escríbenos directo a <a href="mailto:hola@svblime.cl">hola@svblime.cl</a>';
    } finally { form.classList.remove("sending"); }
  });
}
