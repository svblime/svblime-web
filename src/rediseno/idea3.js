// Idea 3 · Cue — la página corre como un show: timecode, cues y flashes de luz entre secciones.
import { gsap, ScrollTrigger, REDUCED, smoothScroll, accent } from "./common.js";
import { BRAND, heroSequence, manifesto, pillarsHTML, servicesHorizontal, workGrid, crew, clientRows, endHablemos } from "./sections.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
$$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));

heroSequence($(".hero"));
$(".tri").innerHTML = pillarsHTML("pill-col");

if (!REDUCED) smoothScroll();

manifesto($(".manifesto .scrub"));
servicesHorizontal($(".services-h"), $(".services-track"));
workGrid($(".work-grid"));
crew($(".crew"));
clientRows($(".clients"), $(".rows"), { stroke: "#fff" });
endHablemos($(".end"));

if (!REDUCED) {
  // Pilares: cada foto se abre hasta llenar la pantalla, una tras otra
  const cols = $$(".pill-col");
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".triptych", start: "top top", end: "bottom bottom", scrub: true } });
  cols.forEach((c, i) => {
    tl.to(cols, { flexGrow: (j) => (j === i ? 12 : 0.0001), ease: "power2.inOut", duration: 1 }, i * 1.2);
    tl.fromTo($("img", c), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, i * 1.2);
  });

  // Títulos que suben al aparecer
  $$(".work h2, .services-intro h2").forEach((h) =>
    gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }));

  // Consola: timecode y barra que avanzan con el scroll de toda la página
  const tc = $(".tc b"), bar = $(".hud-bar i"), TOTAL = (4 * 60 + 12) * 25; // 4 min 12 s a 25 cuadros
  const fmt = (f) => [f / 90000, (f / 1500) % 60, (f / 25) % 60, f % 25].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":");
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (st) => { tc.textContent = fmt(Math.round(st.progress * TOTAL)); gsap.set(bar, { scaleX: st.progress }); } });

  // Cada sección es un cue: al entrar, destello de color y cambia el nombre del cue
  const flash = $(".flash"), cue = $(".cue"), go = $(".go");
  $$("main > section").forEach((s, i) => {
    const fire = (dir) => {
      cue.textContent = `Cue ${String(i + 1).padStart(2, "0")} · ${s.dataset.cue}`;
      if (i === 0) return;
      go.classList.add("hit"); setTimeout(() => go.classList.remove("hit"), 260);
      gsap.timeline({ overwrite: true })
        .set(flash, { background: BRAND[i % 3], transformOrigin: dir > 0 ? "50% 100%" : "50% 0%", scaleY: 0, opacity: 1 })
        .to(flash, { scaleY: 1, duration: 0.28, ease: "power3.in" })
        .set(flash, { transformOrigin: dir > 0 ? "50% 0%" : "50% 100%" })
        .to(flash, { scaleY: 0, duration: 0.42, ease: "power3.out" });
    };
    ScrollTrigger.create({ trigger: s, start: "top 60%", onEnter: () => fire(1), onEnterBack: () => {} });
    ScrollTrigger.create({ trigger: s, start: "bottom 60%", onLeaveBack: () => fire(-1) });
  });
  ScrollTrigger.refresh();
}
