// Rediseño SVBLIME · versión final (idea 11 + ajustes finales).
import { gsap, ScrollTrigger, SplitText, A, REDUCED, TOUCH, smoothScroll, accent, followSpot, galleryTile, lazyVideo } from "./common.js";
import { swarm3 } from "./swarm3.js";
import { WORK, TEAM, LINEUP, CLIENTS, TOPGALLERY } from "./data.js";
const BRAND = ["#4EA9FF", "#FFCD59", "#8F00FF"];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const PILLARS = [
  { label: "Corporativos", photo: "work/min/blue-1.jpg", t: "Experiencia inmersiva de lujo", v: "Branding Blue Label" },
  { label: "TV y Videos", photo: "extra/yandel-sinfonico.jpg", video: "extra/yandel-sinfonico.mp4", t: "Yandel Sinfónico", v: "Festival de Viña 2025" },
  { label: "Artistas", photo: "work/min/polima-1.jpg", t: "Polima & Pailita", v: "Movistar Arena 360" },
];
const SERVICES = [
  ["01", "Dirección Creativa", "servicios/direccion-creativa.html"],
  ["02", "Experiencias Visuales", "servicios/experiencias-visuales.html"],
  ["03", "Producción Integral", "servicios/produccion-integral.html"],
  ["04", "Branding de Eventos", "servicios/branding-eventos.html"],
];
// Misma huincha de marcas de la web actual (mismo orden y mismas proporciones por logo)
const BRANDS = ["rock-out", "claro", "muno-bx", "premios-pulsar", "flow-fest", "pailita", "vitacura", "pod", "lollapalooza", "knotfest", "carolina-herrera", "copec", "pedro-aguirre-cerda", "wailers", "pudahuel", "shishi-gang", "tecate", "stellantis", "myriam-hernandez", "akriila", "axon-pharma", "jere-klein", "billboard", "chystemc", "combo-tortuga", "provetec", "resistance", "ultra", "carin-leon", "tvn", "nanpa-basico", "blue-label", "hilaria", "polima-westcoast", "inacap", "ipchile", "lotus", "breast-cancer", "vina-fest", "shamanes", "garras-amor", "crush-music", "chevrolet", "onyx", "caja-los-andes", "huaso-olmue", "alanys-lagos", "lara-project", "armonic", "yandel-artist", "facebrooklyn", "zumbale-primo", "entel"];
const BRAND_SCALE = { "carolina-herrera": 1.75, vitacura: 1.9, armonic: 2.0, chevrolet: 1.75, "blue-label": 1.55, hilaria: 1.9, pudahuel: 1.25, claro: 1.3, provetec: 1.55, onyx: 1.5, pod: 1.2, chystemc: 1.7, tecate: 1.7, "huaso-olmue": 1.6, "myriam-hernandez": 1.1, "flow-fest": 1.5, "jere-klein": 1.1, wailers: 1.3, "zumbale-primo": 1.15, "polima-westcoast": 1.4, "lara-project": 1.35, "nanpa-basico": 1.3, "alanys-lagos": 1.3, "yandel-artist": 1.4, pailita: 1.15, shamanes: 1.15, "premios-pulsar": 1.45, "rock-out": 1.05, knotfest: 1.1, "vina-fest": 1.2, "shishi-gang": 1.6, "garras-amor": 1.0, "combo-tortuga": 1.3, "crush-music": 1.4 };

export function build() {
  const plus = true;
  $$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));
  let lenis = null, loading = true;
  const header = headerMenu();
  // Intro de la web actual: el logo pasa rápido por blanco, azul, amarillo, púrpura y negro
  const loaded = runLoader().then(() => {
    loading = false;
    if (lenis) lenis.start();
    // Enlaces desde otras páginas (ej. index.html#trabajo): bajar directo a esa sección
    const t = location.hash.length > 1 && document.querySelector(location.hash);
    if (t && lenis) setTimeout(() => lenis.scrollTo(t, { offset: -70 }), 200);
  });

  // ---------- 1 · Inicio ----------
  const hero = $(".hero"), video = $(".hero-video"), veil = $(".veil"), canvas = $(".swarm");
  const lines = $$(".hero-title .l"), extras = $$(".hero-extra");
  swarm3(canvas, { shock: plus });
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
    header.reveal(); // el menú aparece igual que en la web actual
  };
  video.loop = false; video.playbackRate = 0.8;
  video.addEventListener("timeupdate", () => { if (video.duration && video.currentTime > video.duration * 0.5) showText(); });
  video.addEventListener("ended", goDark);
  loaded.then(() => {
    video.play().catch(goDark);
    setTimeout(showText, 3500);
    setTimeout(() => { if (!lit && video.paused) goDark(); }, 9000);
  });
  if (REDUCED) goDark();

  // ---------- 2 · Galería superior (aparece arriba, de sorpresa, para quien vuelva a subir) ----------
  // Se arma recién cuando aparece: así no descarga fotos ni videos al abrir la página.
  const rowsEl = $(".topgal");
  const buildTopGal = () => { if (rowsEl.children.length) return; TOPGALLERY.forEach((row) => {
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
  $$(".topgal video").forEach(lazyVideo); };

  // ---------- 3 · Pilares ----------
  $(".tri").innerHTML = PILLARS.map((p, i) => `<figure class="pill-col p${i + 1}">${p.video
      ? `<video class="pv-video" data-src="${A}${p.video}" poster="${A}${p.photo}" muted loop playsinline preload="none" aria-label="${p.t} · ${p.v}"></video>`
      : `<img src="${A}${p.photo}" alt="${p.t} · ${p.v}">`}
    <figcaption><span class="mono">${String(i + 1).padStart(2, "0")} · ${p.label}</span><span class="pv">${p.t} · ${p.v}</span></figcaption></figure>`).join("");

  $$(".pv-video").forEach(lazyVideo);

  // ---------- 4 · Servicios: colores de marca, sin líneas entre columnas ----------
  const track = $(".services-track");
  SERVICES.forEach(([n, name, href], i) => {
    const el = document.createElement("article");
    el.className = "service";
    el.style.background = ["#4EA9FF", "#FFCD59", "#8F00FF", "#F4F1EA"][i];
    el.style.color = i === 2 ? "#fff" : "#111";
    el.innerHTML = `<span class="num">${n}</span><h3>${twoLines(name)}</h3><a href="${href}">Ver servicio <span aria-hidden="true">→</span></a>`;
    track.appendChild(el);
  });

  // ---------- 5 · Galería ----------
  const PICK = ["hiphop", "blue", "tecate", "pampilla", "eaton", "movistar13", "polima", "chevrolet", "face", "meli", "summit"]; // + el video de Yandel = 12 piezas
  const grid = $(".work-grid");
  PICK.map((k) => WORK.find((w) => w.photos[0].includes(`/${k}-`))).filter(Boolean)
    .forEach((w, i) => grid.appendChild(galleryTile(w, { interval: 3000 + (i % 3) * 400, offset: i * 350 })));
  const yt = document.createElement("figure");
  yt.className = "tile tile-video";
  yt.innerHTML = `<video data-src="${A}extra/yandel-sinfonico.mp4" poster="${A}extra/yandel-sinfonico.jpg" muted loop playsinline preload="none"></video>
    <figcaption><span class="t">Yandel Sinfónico</span><span class="v">Festival de Viña 2025</span><span class="tags">Operación · Diseño · Contenido</span></figcaption>`;
  grid.insertBefore(yt, grid.children[1] || null);
  lazyVideo($("video", yt));

  // ---------- 6 · Equipo: solo el nombre; al pasar el mouse gira y muestra el rol en otro color ----------
  const list = $(".names");
  TEAM.forEach(([n, r, , , photo]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="n roll"><span class="a">${n}</span><span class="b" aria-hidden="true">${r}</span></span><span class="strip"><img src="${A}${photo}" alt="${n}" loading="lazy"></span><span class="r-touch mono">${r}</span>`;
    list.appendChild(li);
  });

  // ---------- 7 · Clientes al estilo SVBLIME Fest ----------
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

  // ---------- 8 · Huincha de marcas (la de la web actual, más pequeña) ----------
  brandStrip($(".brand-strip"));


  if (!TOUCH) customCursor();

  if (REDUCED) { $$(".curtain").forEach((c) => c.remove()); return; }
  lenis = smoothScroll();
  if (loading) lenis.stop();
  const scrollVel = () => (lenis ? lenis.velocity : 0);

  // Telón de tres colores, con el orden de colores rotando en cada sección
  $$(".act").forEach((act, ai) => {
    if (!$(".curtain", act)) return;
    const bars = $$(".curtain i", act);
    bars.forEach((b, i) => (b.style.background = BRAND[(i + ai) % 3]));
    const ends = ["top 48%", "top 30%", "top 12%"];
    bars.forEach((b, i) => gsap.fromTo(b, { scaleY: 1 }, { scaleY: 0, ease: "power2.inOut",
      scrollTrigger: { trigger: act, start: "top 98%", end: ends[i], scrub: true } }));
  });

  // Del inicio se pasa directo a Lo que hacemos. Cuando el inicio salió completo de la pantalla,
  // ese espacio guarda la galería: aparece de sorpresa para quien vuelva a subir.
  const stage = $(".welcome-stage"), gal = $(".topgal-wrap");
  let introSeen = false, gRows = [];
  ScrollTrigger.create({ trigger: ".hero", start: "bottom top", once: true,
    onEnter: () => {
      introSeen = true; canvas.style.visibility = "hidden"; buildTopGal();
      gRows = $$(".grow .gtrack");
      gsap.set(gal, { opacity: 1 }); gsap.set(stage, { opacity: 1 }); stage.style.pointerEvents = "auto";
    } });
  // Las filas de la galería corren solas (como hoy) y el scroll les da velocidad
  const gSpeeds = [0.62, 0.86, 1.12], gOff = [0, 0, 0];
  gsap.ticker.add((time, delta) => {
    if (!introSeen || scrollY > innerHeight * 1.6) return;
    const boost = Math.abs(scrollVel()) * 0.6;
    gRows.forEach((tr, i) => {
      const w = tr.firstElementChild.offsetWidth || 1;
      gOff[i] = (gOff[i] + (delta * 0.045 + boost) * gSpeeds[i]) % w;
      tr.style.transform = `translate3d(${-gOff[i]}px,0,0)`;
    });
  });

  if (plus) addEventListener("wheel", (e) => {
    if (introSeen && scrollY <= 1 && e.deltaY < 0) gOff.forEach((o, i) => (gOff[i] = o + Math.abs(e.deltaY) * gSpeeds[i]));
  }, { passive: true });

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
    tl.fromTo($("img, video", c), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, i * 1.2);
  });

  // Servicios: el cuadro blanco parte a pantalla completa y se achica hacia la izquierda
  const intro = $(".services-intro");
  const introW = () => {
    const pad = parseFloat(getComputedStyle(intro).paddingLeft) || 0;
    return Math.min(innerWidth * 0.94, intro.firstElementChild.offsetWidth + pad * 2);
  };
  const travel = () => Math.max(0, introW() + $$(".service").reduce((s, el) => s + el.offsetWidth, 0) - innerWidth);
  gsap.timeline({ scrollTrigger: { trigger: ".services-h", start: "top top", end: () => "+=" + (innerHeight * 0.9 + travel()), pin: true, scrub: 1, invalidateOnRefresh: true } })
    .fromTo(intro, { width: () => innerWidth }, { width: introW, ease: "power2.inOut", duration: 1 })
    .to(track, { x: () => -travel(), ease: "none", duration: () => Math.max(1, travel() / innerHeight) });

  // Galería: zoom ligado al scroll + profundidad
  $$(".work-grid .tile").forEach((t) => {
    gsap.fromTo(t, { clipPath: "inset(16% 6% 16% 6%)", scale: 0.94 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none",
      scrollTrigger: { trigger: t, start: "top 100%", end: "top 45%", scrub: true } });
    $$("img", t).forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none",
      scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: true } }));
  });

  // Trazo → relleno en todos los textos grandes (después del pin de servicios)
  strokeFill($(".services-intro .big"), { trigger: ".services-h", start: "top 85%", end: "top 5%" });
  strokeFill($(".work h2.big"));
  $$(".names .roll .a").forEach((n) => strokeFill(n, { trigger: n.closest("li"), start: "top 92%", end: "top 55%" }));
  strokeFill($(".giant-track"), { trigger: ".end", start: "top 75%", end: "top 5%" });
  strokeFill($(".end-copy"), { start: "top 88%", end: "bottom 55%" });
  // Un solo degradé recorre todo el bloque, como en la web actual: cada fila toma su tramo.
  const festDays = $(".fest-days");
  const paintFest = () => {
    festDays.style.setProperty("--gh", festDays.offsetHeight + "px");
    $$(".tier", festDays).forEach((t) => t.style.setProperty("--gy", t.offsetTop - festDays.offsetTop + "px"));
  };
  paintFest(); addEventListener("resize", paintFest);
  $$(".fest .tier").forEach((t) => gsap.fromTo(t, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none",
    scrollTrigger: { trigger: t, start: "top 96%", end: "top 70%", scrub: true } }));

  // Equipo: el fondo pasa de negro a magenta con el scroll (como la idea 2) y suma un degradé magenta.
  // Va después del pin de servicios para que sus posiciones consideren ese tramo.
  const crew = $(".crew"), glow = document.createElement("div");
  glow.className = "crew-glow"; crew.prepend(glow);
  gsap.timeline({ scrollTrigger: { trigger: crew, start: "top 85%", end: "bottom 15%", scrub: true } })
    .fromTo(crew, { backgroundColor: "#050506" }, { backgroundColor: "#8F00FF", ease: "none", duration: 0.12 })
    .fromTo(glow, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.12 }, 0)
    .to({}, { duration: 0.76 })
    .to(crew, { backgroundColor: "#050506", ease: "none", duration: 0.12 })
    .to(glow, { opacity: 0, ease: "none", duration: 0.12 }, "<");
  if (plus && !TOUCH) {
    // Idea 10: el brillo del degradé sigue al mouse
    const gx = gsap.quickTo(glow, "--gx", { duration: 0.8, ease: "power3" }), gy = gsap.quickTo(glow, "--gy", { duration: 0.8, ease: "power3" });
    crew.addEventListener("pointermove", (e) => { const r = crew.getBoundingClientRect(); gx((e.clientX - r.left) / r.width * 100); gy((e.clientY - r.top) / r.height * 100); });
  }

  $$(".names li").forEach((li) => gsap.from(li, { yPercent: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: li, start: "top 94%" } }));

  // Clientes: cada fila corre sola hacia su lado (más rápido); el scroll la acelera; el mouse la detiene
  const tiers = $$(".tier").map((el, i) => ({ el, tr: $(".ttrack", el), dir: +el.dataset.dir, off: 0, base: [0.12, 0.09, 0.075][i % 3], paused: false }));
  tiers.forEach((t) => {
    t.el.addEventListener("pointerenter", () => (t.paused = true));
    t.el.addEventListener("pointerleave", () => (t.paused = false));
  });
  let festOn = false;
  ScrollTrigger.create({ trigger: ".fest", start: "top bottom", end: "bottom top", onToggle: (st) => (festOn = st.isActive) });
  gsap.ticker.add((time, delta) => {
    if (!festOn) return;
    const boost = Math.abs(scrollVel()) * 1.4;
    tiers.forEach((t) => {
      const w = t.tr.firstElementChild.offsetWidth || 1;
      const v = t.paused ? 0 : delta * t.base + boost;
      t.off = (t.off + v) % w;
      t.tr.style.transform = `translate3d(${t.dir < 0 ? -t.off : t.off - w}px,0,0)`;
    });
  });
  gsap.from(".fest-head img", { opacity: 0, y: 30, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".fest-head", start: "top 85%" } });

  // Hablemos
  gsap.fromTo(".giant-track", { xPercent: 0 }, { xPercent: -50, ease: "none", scrollTrigger: { trigger: ".end", start: "top bottom", end: "bottom bottom", scrub: true } });

  ScrollTrigger.refresh();
}

// Intro igual a la web actual. Si está la pantalla de contraseña, espera a que se entre.
function runLoader() {
  const el = $(".loader");
  // Sin intro si se llega a una sección puntual (igual que la web actual)
  if (!el || REDUCED || location.hash.length > 1) { if (el) el.remove(); return Promise.resolve(); }
  document.documentElement.classList.add("locked");
  scrollTo(0, 0);
  const frames = $$(".lf", el);
  const gateGone = () => new Promise((res) => {
    const check = () => !document.getElementById("svb-gate");
    const start = () => {
      if (check()) return res();
      const mo = new MutationObserver(() => { if (check()) { mo.disconnect(); res(); } });
      mo.observe(document.body, { childList: true });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(start, 0));
    else setTimeout(start, 0);
  });
  return gateGone().then(() => new Promise((res) => {
    let i = 0;
    const step = () => {
      frames.forEach((f, k) => f.classList.toggle("on", k === i));
      if (i < frames.length - 1) { i++; setTimeout(step, 130); return; }
      setTimeout(() => {
        el.classList.add("out");
        document.documentElement.classList.remove("locked");
        res();
        setTimeout(() => el.remove(), 750);
      }, 420);
    };
    step();
  }));
}

// Menú igual al de la web actual: el isotipo (tres barras) abre el menú en línea,
// con Servicios desplegable; se cierra solo a los 5 s. A la derecha, el botón Hablemos.
export function headerMenu() {
  const hd = $(".svb-header"), btn = $(".svb-burger", hd), nav = $(".svb-nav", hd), svcLink = $(".svc-link", hd), svc = $(".svb-svcmenu", hd);
  const links = $$(".svb-nav > a", hd);
  let open = false, svcOpen = false, closeT = null, svcT = null;
  const setSvc = (v) => {
    svcOpen = v; svc.dataset.open = v; svcLink.setAttribute("aria-expanded", v); svcLink.classList.toggle("on", v);
    if (!v) arm();
  };
  const arm = () => { clearTimeout(closeT); if (open && !svcOpen) closeT = setTimeout(() => setOpen(false), 5000); };
  const setOpen = (v) => {
    open = v; hd.classList.toggle("open", v); nav.dataset.open = v;
    btn.setAttribute("aria-expanded", v); btn.setAttribute("aria-label", v ? "Cerrar menú" : "Abrir menú");
    links.forEach((a, i) => (a.style.transitionDelay = v ? 180 + i * 110 + "ms" : (links.length - 1 - i) * 90 + "ms"));
    if (!v) setSvc(false);
    arm();
  };
  btn.addEventListener("click", () => setOpen(!open));
  const svcEnter = () => { clearTimeout(svcT); setSvc(true); };
  const svcLeave = () => { clearTimeout(svcT); svcT = setTimeout(() => setSvc(false), 3000); };
  svcLink.addEventListener("mouseenter", svcEnter); svcLink.addEventListener("mouseleave", svcLeave);
  svc.addEventListener("mouseenter", svcEnter); svc.addEventListener("mouseleave", svcLeave);
  svcLink.addEventListener("click", (e) => { e.preventDefault(); setSvc(!svcOpen); });
  $$("a", hd).forEach((a) => a !== svcLink && a.addEventListener("click", () => setOpen(false)));
  return { reveal: () => hd.classList.add("in") };
}

// Huincha de marcas de la web actual (logos que destellan en los tres colores al pasar el mouse)
export function brandStrip(strip) {
  if (!strip) return;
  const seq = BRANDS.map((b, bi) => `<span class="svb-brand" style="--m:url(${new URL(A + "brands/" + b + ".png", location.href).href});--c:${["#4EA9FF", "#FFCD59", "#8F00FF"][bi % 3]};--k:${BRAND_SCALE[b] || 1}"><img src="${A}brands/${b}.png" alt="${b}" loading="lazy" decoding="async"></span>`).join("");
  strip.innerHTML = `<div class="bs-track"><div class="bs-seq">${seq}</div><div class="bs-seq" aria-hidden="true">${seq}</div></div>`;
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest && e.target.closest(".svb-brand");
    if (!el || el.classList.contains("flash")) return;
    el.classList.add("flash");
    const done = () => { el.classList.remove("flash"); el.removeEventListener("animationend", done); };
    el.addEventListener("animationend", done);
  });
}

// El texto parte solo con su contorno y se rellena palabra por palabra con el scroll.
export function strokeFill(el, trig = {}) {
  if (!el) return;
  const rgb = getComputedStyle(el).color.match(/[\d.]+/g).slice(0, 3).join(",");
  el.classList.add("sf");
  el.style.setProperty("--sf", `rgb(${rgb})`);
  const split = new SplitText(el, { type: "words" });
  gsap.fromTo(split.words, { color: `rgba(${rgb},0)` }, { color: `rgba(${rgb},1)`, stagger: 0.1, ease: "none",
    scrollTrigger: Object.assign({ trigger: el, start: "top 80%", end: "bottom 45%", scrub: true }, trig) });
}

// Cursor propio: un anillo que crece sobre enlaces y fotos.
export function customCursor() {
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

// Mismo formulario de la web actual (envía a la misma casilla que hoy).
export function contactForm(form) {
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

// Nombre del servicio siempre en dos filas: la última palabra (o las dos últimas, si la primera es corta) abajo.
function twoLines(name) {
  const w = name.split(" ");
  if (w.length === 2) return `<span>${w[0]}</span><span>${w[1]}</span>`;
  return `<span>${w[0]} ${w[1]}</span><span>${w.slice(2).join(" ")}</span>`;
}
