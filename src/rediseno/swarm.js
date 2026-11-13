// Enjambre de partículas: muchas, en movimiento constante, atraídas por el mouse (giran a su alrededor).
// Modo "logo" (idea 6): en reposo se ordenan formando las tres barras de la E de SVBLIME.
import { gsap } from "./common.js";

const COLORS = ["255,255,255", "78,169,255", "255,205,89", "143,0,255"];

export function swarm(canvas, { count, logo = false } = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const N = count || (innerWidth < 760 ? 380 : 1100);
  let w = 0, h = 0, pts = [];
  const mouse = { x: 0, y: 0, active: false, last: 0 };

  // Destino de cada partícula en modo logo: tres barras horizontales (azul, amarillo, púrpura)
  const homeFor = (i) => {
    const bar = i % 3, bw = Math.min(w * 0.27, 460), bh = Math.min(h * 0.045, 34), gap = bh * 0.9;
    const x0 = w * 0.77 - bw / 2, y0 = h * 0.36 - (bh * 3 + gap * 2) / 2 + bar * (bh + gap);
    return { hx: x0 + Math.random() * bw, hy: y0 + Math.random() * bh, c: COLORS[bar + 1] };
  };

  const resize = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: N }, (_, i) => {
      const p = { x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, s: Math.random() * 1.6 + 0.5, a: Math.random() * 0.55 + 0.35,
        c: COLORS[(Math.random() * COLORS.length) | 0], k: Math.random() * 0.6 + 0.7, ph: Math.random() * Math.PI * 2, att: Math.random() < 0.6 };
      return logo ? Object.assign(p, homeFor(i)) : p;
    });
  };
  resize(); addEventListener("resize", resize);

  const area = canvas.parentElement;
  const move = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; mouse.last = performance.now(); };
  area.addEventListener("pointermove", move);
  area.addEventListener("pointerdown", move);
  area.addEventListener("pointerleave", () => (mouse.active = false));

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

  gsap.ticker.add(() => {
    if (!visible || !w) return;
    const t = performance.now() / 1000;
    const idle = !mouse.active || t * 1000 - mouse.last > 2500;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const paths = {};
    for (const p of pts) {
      if (!idle && p.att) {
        // Atracción hacia el mouse con giro: las partículas orbitan y se arremolinan
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy) + 0.001;
        // Fuerte cerca del mouse y suave lejos: la pantalla nunca queda vacía
        const near = Math.exp(-d / 300), pull = (1.1 * near + 0.015) * p.k, spin = 0.75 * near * p.k;
        p.vx += (dx / d) * pull + (-dy / d) * spin + Math.cos(p.y * 0.006 + t * 0.6 + p.ph) * 0.05;
        p.vy += (dy / d) * pull + (dx / d) * spin + Math.sin(p.x * 0.006 + t * 0.5) * 0.05;
        if (d < 26) { p.vx -= (dx / d) * 2.4; p.vy -= (dy / d) * 2.4; } // no se amontonan en un punto
      } else if (logo && idle) {
        // En reposo vuelven a formar las barras del logo
        p.vx += (p.hx - p.x) * 0.012 + Math.cos(t * 2 + p.ph) * 0.05;
        p.vy += (p.hy - p.y) * 0.012 + Math.sin(t * 2 + p.ph) * 0.05;
      } else {
        // En reposo: corriente suave, como polvo flotando en un haz de luz
        p.vx += Math.cos(p.y * 0.006 + t * 0.6 + p.ph) * 0.06;
        p.vy += Math.sin(p.x * 0.006 + t * 0.5) * 0.06 - 0.03;
      }
      p.vx *= 0.94; p.vy *= 0.94;
      const sp = Math.hypot(p.vx, p.vy), max = 14;
      if (sp > max) { p.vx *= max / sp; p.vy *= max / sp; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      // Estela según la velocidad: da sensación de mucho movimiento
      const key = p.c + "|" + Math.round(p.s * 2);
      (paths[key] = paths[key] || []).push(p);
    }
    for (const key in paths) {
      const [c, s] = key.split("|");
      ctx.strokeStyle = `rgba(${c},0.75)`;
      ctx.lineWidth = s * 0.9;
      ctx.beginPath();
      for (const p of paths[key]) { ctx.moveTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2); ctx.lineTo(p.x + 0.01, p.y); }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  });
}
