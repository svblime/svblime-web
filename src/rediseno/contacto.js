// Rediseño SVBLIME · página de contacto
import { gsap, ScrollTrigger, TOUCH, REDUCED, smoothScroll, accent } from "./common.js";
const BRAND = ["#4EA9FF", "#FFCD59", "#8F00FF"];
import { headerMenu, contactForm, customCursor } from "./final.js";
import { mejoras } from "./mejoras.js";

document.querySelectorAll("[data-accent]").forEach((el) => (el.innerHTML = accent(el.innerHTML)));
headerMenu().reveal();
contactForm(document.querySelector(".contact-form"));
if (!TOUCH) customCursor();
if (!REDUCED) {
  smoothScroll();
  // Pasada de los tres colores al entrar a la página
  const bars = [...document.querySelectorAll(".curtain i")];
  bars.forEach((b, i) => (b.style.background = BRAND[i % 3]));
  gsap.to(bars, { scaleY: 0, duration: 1.1, ease: "power3.inOut", stagger: 0.12, delay: 0.15 });
  gsap.from(".contact-page .reveal", { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.5 });
} else document.querySelectorAll(".curtain").forEach((c) => c.remove());
mejoras();
