// Idea 4 · Telón — actos claros que se abren con un telón de tres colores.
import { gsap, REDUCED, smoothScroll, accent } from "./common.js";
import { heroSequence, manifesto, pillarsHTML, servicesStack, workGrid, crew, clientRows, endHablemos } from "./sections.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
$$("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));

heroSequence($(".hero"));

// Pilares como arcos de escenario
$(".arches").innerHTML = pillarsHTML("arch").replace(/<img ([^>]+)>/g, '<span class="frame"><img $1></span>');

if (!REDUCED) smoothScroll();

manifesto($(".manifesto .scrub"));
servicesStack($(".cards"), [["#000", "#fff"], ["#4EA9FF", "#000"], ["#8F00FF", "#fff"], ["#FFCD59", "#000"]]);
workGrid($(".work-grid"));
crew($(".crew"));
clientRows($(".clients"), $(".rows"), { stroke: "#111" });
endHablemos($(".end"));

if (!REDUCED) {
  // Telón: las tres franjas suben, una tras otra, a medida que la sección entra
  $$(".act").forEach((act) =>
    gsap.fromTo($$(".curtain i", act), { scaleY: 1 }, {
      scaleY: 0, ease: "power2.inOut", stagger: 0.12,
      scrollTrigger: { trigger: act, start: "top 95%", end: "top 25%", scrub: true },
    }));

  // Arcos que suben desde abajo, desfasados
  gsap.from(".arch", { yPercent: 30, opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: ".arches", start: "top 80%" } });

  // Títulos que suben al aparecer
  $$(".stack-title, .work h2").forEach((h) =>
    gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }));
} else {
  $$(".curtain").forEach((c) => c.remove());
}
