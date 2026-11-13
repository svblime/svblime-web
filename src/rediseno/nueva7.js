// Ideas 7 y 8 (correcciones sobre la idea 6). La idea 8 suma mejoras propias (`plus`).
import { gsap, ScrollTrigger, SplitText, A, REDUCED, TOUCH, smoothScroll, accent, followSpot, galleryTile, lazyVideo } from "./common.js";
import { swarm2 } from "./swarm2.js";
import { WORK, TEAM, LINEUP, CLIENTS, TOPGALLERY } from "./data.js";
import { BRAND } from "./sections.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const PILLARS7 = [
  { label: "Corporativos", photo: "work/min/blue-1.jpg", t: "Experiencia inmersiva de lujo", v: "Branding Blue Label" },
  { label: "TV y Videos", photo: "extra/yandel-sinfonico.jpg", t: "Yandel Sinfónico", v: "Festival de Viña 2025" },
  { label: "Artistas", photo: "work/min/polima-1.jpg", t: "Polima & Pailita", v: "Movistar Arena 360" },
];
const SERVICES7 = [
  ["01", "Dirección Creativa", "servicios/direccion-creativa.html"],
  ["02", "Experiencias Visuales", "servicios/experiencias-visuales.html"],
  ["03", "Producción Integral", "servicios/produccion-integral.html"],
  ["04", "Branding de Eventos", "servicios/branding-eventos.html"],
];

export function build({ plus = false } = {}) {
  $$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));
  let lenis = null;

  // ---------- 1 · Inicio: video → texto + partículas → negro total; el círculo deja ver el último cuadro ----------
  const hero = $(".hero"), video = $(".hero-video"), veil = $(".veil"), canvas = $(".swarm");
  const lines = $$(".hero-title .l"), extras = $$(".hero-extra");
  swarm2(canvas, { burst: plus });
  const spot = { radius: Math.max(220, innerWidth * 0.2) };
  if (!REDUCED) {
    gsap.set(veil, { opacity: 0 }); gsap.set(canvas, { opacity: 0 });
    gsap.set(lines, { yPercent: 110, opacity: 0 }); gsap.set(extras, { opacity: 0 });
    $$(".beams *").forEach((el) => { const len = el.getTotalLength ? el.getTotalLength() : 2000; gsap.set(el, { strokeDasharray: len, strokeDashoffset: len }); });
  }
  let textIn = false, lit = false;
  const showText = () => {
    if (textIn) return; textIn = true;
    gsap.to(lines, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 });
    gsap.to(canvas, { opacity: 1, duration: 1.4 });
    gsap.to(extras, { opacity: 1, duration: 1, delay: 0.6 });
    gsap.to(".beams *", { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", stagger: 0.08 });
  };
  const goDark = () => {
    if (lit) return; lit = true; showText();
    video.pause(); // queda detenido en el último cuadro
    Object.assign(spot, followSpot(hero, veil, { radius: spot.radius }));
    gsap.to(veil, { opacity: 1, duration: 1.4, ease: "power2.inOut" });
  };
  video.loop = false; video.playbackRate = 0.8;
  video.addEventListener("timeupdate", () => { if (video.duration && video.currentTime > video.duration * 0.5) showText(); });
  video.addEventListener("ended", goDark);
  video.play().catch(goDark);
  setTimeout(showText, 3500);
  setTimeout(() => { if (!lit && video.paused) goDark(); }, 9000);
  if (REDUCED) goDark();

  // ---------- 2 · Bienvenidos a SVBLIME + galería superior (como la web actual) ----------
  const rowsEl = $(".topgal");
  TOPGALLERY.forEach((row) => {
    const items = row.map((m, ii) => {
      const ar = m.type === "video" ? "16 / 9" : ["3 / 4", "1 / 1", "4 / 3"][ii % 3];
      const media = m.type === "video"
        ? `<video data-src="${A}${m.src}" poster="${A}${m.src.replace("work/", "work/poster/").replace(".mp4", ".jpg")}" muted loop playsinline preload="none"></video>`
        : `<img src="${A}${m.src}" alt="" loading="lazy" decoding="async">`;
      return `<div class="gi${m.big ? "" : " sm"}" style="aspect-ratio:${ar}">${media}<div class="gcap"><span>${m.t}</span><div>${m.tags.map((g) => `<i>${g}</i>`).join("")}</div></div></div>`;
    }).join("");
    const r = document.createElement("div");
    r.className = "grow";
    r.innerHTML = `<div class="gtrack"><div class="gseq">${items}</div><div class="gseq">${items}</div></div>`;
    rowsEl.appendChild(r);
  });
  $$(".topgal video").forEach(lazyVideo);

  // ---------- 3 · Pilares ----------
  $(".tri").innerHTML = PILLARS7.map((p, i) => `<figure class="pill-col p${i + 1}"><img src="${A}${p.photo}" alt="${p.t} · ${p.v}">
    <figcaption><span class="mono">${String(i + 1).padStart(2, "0")} · ${p.label}</span><span class="pv">${p.t} · ${p.v}</span></figcaption></figure>`).join("");

  // ---------- 4 · Servicios: solo el nombre y el enlace ----------
  const track = $(".services-track");
  SERVICES7.forEach(([n, name, href], i) => {
    const el = document.createElement("article");
    el.className = "service";
    // Idea 7: los servicios aparecen del mismo blanco del cuadro; idea 8: cada uno en un color de marca
    el.style.background = plus ? ["#4EA9FF", "#FFCD59", "#8F00FF", "#F4F1EA"][i] : "#fff";
    el.style.color = plus && i === 2 ? "#fff" : "#111";
    el.innerHTML = `<span class="bar" style="background:${BRAND[i % 3]}"></span><span class="num">${n}</span>
      <h3>${name.replace(" ", "<br>")}</h3><a href="../${href}">Ver servicio <span aria-hidden="true">→</span></a>`;
    track.appendChild(el);
  });

  // ---------- 5 · Galería ----------
  const PICK = ["hiphop", "blue", "tecate", "pampilla", "eaton", "movistar13", "polima", "chevrolet", "face", "meli", "summit", "walmart"];
  const grid = $(".work-grid");
  PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean)
    .forEach((w, i) => grid.appendChild(galleryTile(w, { interval: 3000 + (i % 3) * 400, offset: i * 350 })));

  // ---------- 6 · Equipo: fondo magenta, sin fotos ----------
  const list = $(".names");
  TEAM.forEach(([n, r, d]) => {
    const li = document.createElement("li");
    const name = plus ? `<span class="n roll"><span>${n}</span><span aria-hidden="true">${n}</span></span>` : `<span class="n">${n}</span>`;
    li.innerHTML = `${name}<span class="r">${r}<span class="d">${d}</span></span>`;
    list.appendChild(li);
  });

  // ---------- 7 · Clientes al estilo SVBLIME Fest: jerarquía por tamaño, todos en movimiento ----------
  const fest = $(".fest-days");
  const DAYS = [["Marcas", "marcas", "#4EA9FF"], ["Festivales", "festivales", "#FFCD59"], ["Artistas", "artistas", "#C77DFF"]];
  DAYS.forEach(([label, key, tint], di) => {
    const head = LINEUP[key].head, main = LINEUP[key].rest.slice(0, Math.ceil(LINEUP[key].rest.length / 2));
    const used = new Set([...head, ...main]);
    const small = CLIENTS[key].filter((n) => !used.has(n));
    const tier = (names, cls, dir) => {
      const seq = names.map((n) => `<span>${n}</span><i>◆</i>`).join("");
      return `<div class="tier ${cls}" data-dir="${dir}"><div class="ttrack"><div class="tseq">${seq}</div><div class="tseq">${seq}</div></div></div>`;
    };
    const d = document.createElement("div");
    d.className = "day"; d.style.setProperty("--tint", tint);
    d.innerHTML = `<p class="mono day-label"><span></span>${label}<span></span></p>` +
      tier(head, "t1", di % 2 ? 1 : -1) + tier(main, "t2", di % 2 ? -1 : 1) + tier(small, "t3", di % 2 ? 1 : -1);
    fest.appendChild(d);
  });

  contactForm($(".contact-form"));
  if (plus && !TOUCH) customCursor();

  if (REDUCED) { $$(".curtain").forEach((c) => c.remove()); gsap.set(".welcome-logo", { opacity: 0 }); return; }
  lenis = smoothScroll();
  const scrollVel = () => (lenis ? lenis.velocity : 0);

  // Telón de tres colores, cada franja a su velocidad, en todas las secciones
  $$(".act").forEach((act, ai) => {
    const bars = $$(".curtain i", act);
    if (plus) bars.forEach((b, i) => (b.style.background = BRAND[(i + ai) % 3]));
    const ends = ["top 48%", "top 30%", "top 12%"];
    bars.forEach((b, i) => gsap.fromTo(b, { scaleY: 1 }, { scaleY: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: act, start: "top 98%", end: ends[i], scrub: true } }));
  });

  // Idea 8: al bajar, el círculo crece y muestra el último cuadro completo antes de pasar a la bienvenida
  if (plus) gsap.to(spot, { radius: Math.hypot(innerWidth, innerHeight), ease: "power2.in",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

  // Bienvenidos a SVBLIME → la galería superior aparece mientras el logo se va
  gsap.timeline({ scrollTrigger: { trigger: ".welcome", start: "top top", end: "bottom bottom", scrub: true } })
    .fromTo(".welcome-logo .wl", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
    .fromTo(".welcome-logo img", { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 0.7 }, 0.15)
    .to(".welcome-logo", { opacity: 0, scale: 1.04, duration: 0.6 }, 1.4)
    .fromTo(".topgal-wrap", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.5)
    .to({}, { duration: 1.6 });
  // Las filas corren solas (como hoy) y el scroll les da velocidad
  const gRows = $$(".grow .gtrack"), gSpeeds = [0.62, 0.86, 1.12], gOff = [0, 0, 0];
  gsap.ticker.add((time, delta) => {
    const boost = Math.abs(scrollVel()) * 0.6;
    gRows.forEach((tr, i) => {
      const w = tr.firstElementChild.offsetWidth || 1;
      gOff[i] = (gOff[i] + (delta * 0.045 + boost) * gSpeeds[i]) % w;
      tr.style.transform = `translate3d(${-gOff[i]}px,0,0)`;
    });
  });

  // Manifiesto: trazo → relleno
  const m = $(".manifesto .scrub");
  const split = new SplitText(m, { type: "words" });
  gsap.fromTo(split.words, { color: "rgba(17,17,17,0)" }, { color: "rgba(17,17,17,1)", stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: m, start: "top 72%", end: "bottom 38%", scrub: true } });

  // Pilares que se abren uno tras otro
  const cols = $$(".pill-col");
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".triptych", start: "top top", end: "bottom bottom", scrub: true } });
  cols.forEach((c, i) => {
    tl.to(cols, { flexGrow: (j) => (j === i ? 12 : 0.0001), ease: "power2.inOut", duration: 1 }, i * 1.2);
    tl.fromTo($("img", c), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, i * 1.2);
  });

  // Servicios: el cuadro blanco parte a pantalla completa y se achica hacia la izquierda; luego avanzan los servicios
  const intro = $(".services-intro");
  const introW = () => Math.min(innerWidth * (innerWidth < 760 ? 0.86 : 0.42), 680);
  const travel = () => Math.max(0, introW() + $$(".service").reduce((s, el) => s + el.offsetWidth, 0) - innerWidth);
  gsap.timeline({ scrollTrigger: { trigger: ".services-h", start: "top top", end: () => "+=" + (innerHeight * 0.9 + travel()), pin: true, scrub: 1, invalidateOnRefresh: true } })
    .fromTo(intro, { width: () => innerWidth }, { width: introW, ease: "power2.inOut", duration: 1 })
    .to(track, { x: () => -travel(), ease: "none", duration: () => Math.max(1, travel() / innerHeight) });

  // Galería: zoom ligado al scroll (se devuelve al subir) + profundidad
  $$(".work-grid .tile").forEach((t) => {
    gsap.fromTo(t, { clipPath: "inset(16% 6% 16% 6%)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none",
      scrollTrigger: { trigger: t, start: "top 100%", end: "top 45%", scrub: true } });
    $$("img", t).forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none",
      scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: true } }));
  });

  // Trazo → relleno en todos los textos grandes de más abajo (igual que "Lo que hacemos").
  // Se crean después del pin de servicios para que sus posiciones consideren ese tramo.
  strokeFill($(".services-intro .big"), { trigger: ".services-h", start: "top 85%", end: "top 5%" });
  strokeFill($(".work h2.big"));
  $$(".names .n").forEach((n) => strokeFill(n, { start: "top 92%", end: "top 55%" }));
  strokeFill($(".giant-track"), { trigger: ".end", start: "top 75%", end: "top 5%" });
  $$(".fest .day").forEach((d) => gsap.fromTo($$(".tier span", d), { color: "rgba(255,255,255,0)" }, { color: "rgba(255,255,255,1)", ease: "none",
    scrollTrigger: { trigger: d, start: "top 88%", end: "top 30%", scrub: true } }));

  $$(".names li").forEach((li) => gsap.from(li, { yPercent: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 94%" } }));

  // Clientes: cada fila corre sola hacia su lado; el scroll la acelera
  const tiers = $$(".tier").map((el, i) => ({ el, tr: $(".ttrack", el), dir: +el.dataset.dir, off: 0, base: [0.05, 0.035, 0.028][i % 3], paused: false }));
  if (plus) tiers.forEach((t) => {
    t.el.addEventListener("pointerenter", () => (t.paused = true));
    t.el.addEventListener("pointerleave", () => (t.paused = false));
  });
  let festOn = false;
  ScrollTrigger.create({ trigger: ".fest", start: "top bottom", end: "bottom top", onToggle: (st) => (festOn = st.isActive) });
  gsap.ticker.add((time, delta) => {
    if (!festOn) return;
    const boost = Math.abs(scrollVel()) * 0.9;
    tiers.forEach((t) => {
      const w = t.tr.firstElementChild.offsetWidth || 1;
      const v = t.paused ? 0 : (delta * t.base + boost) * (1 + (t.el.classList.contains("t3") ? 0.2 : 0));
      t.off = (t.off + v) % w;
      t.tr.style.transform = `translate3d(${t.dir < 0 ? -t.off : t.off - w}px,0,0)`;
    });
  });
  gsap.from(".fest-head img", { opacity: 0, y: 30, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".fest-head", start: "top 85%" } });

  // Hablemos
  gsap.fromTo(".giant-track", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".end", start: "top bottom", end: "bottom bottom", scrub: true } });

  ScrollTrigger.refresh();
}

// El texto parte solo con su contorno y se rellena palabra por palabra con el scroll.
function strokeFill(el, trig = {}) {
  if (!el) return;
  const rgb = getComputedStyle(el).color.match(/[\d.]+/g).slice(0, 3).join(",");
  el.classList.add("sf");
  el.style.setProperty("--sf", `rgb(${rgb})`);
  const split = new SplitText(el, { type: "words" });
  gsap.fromTo(split.words, { color: `rgba(${rgb},0)` }, { color: `rgba(${rgb},1)`, stagger: 0.1, ease: "none",
    scrollTrigger: Object.assign({ trigger: el, start: "top 80%", end: "bottom 45%", scrub: true }, trig) });
}

// Idea 8: cursor propio — un anillo que crece sobre enlaces y fotos.
function customCursor() {
  const c = document.createElement("div");
  c.className = "cursor";
  document.body.appendChild(c);
  const qx = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3" }), qy = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3" });
  addEventListener("pointermove", (e) => {
    qx(e.clientX); qy(e.clientY);
    const over = e.target.closest && e.target.closest("a, button, .tile, input, textarea");
    c.classList.toggle("big", !!over);
    c.classList.toggle("hide", !!(e.target.closest && e.target.closest(".hero")));
  }, { passive: true });
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
