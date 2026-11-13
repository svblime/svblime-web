// Enjambre fluido (ideas 7 y 8): las partículas viajan hacia el puntero y, al llegar,
// se ordenan formando el isotipo de SVBLIME (las tres barras de la E: azul, amarillo, púrpura).
// Movimiento con resortes suaves e inercia, independiente de los cuadros por segundo.
import { gsap } from "./common.js";

const BAR = ["78,169,255", "255,205,89", "143,0,255"];
const AMBIENT = ["255,255,255", "78,169,255", "255,205,89", "143,0,255"];

export function swarm2(canvas, { count, burst = false } = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const N = count || (innerWidth < 760 ? 760 : 2200);
  let w = 0, h = 0, pts = [], shape = null;
  const anchor = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  let pointerSeen = false, lastMove = 0;

  const makeShape = () => {
    const bw = Math.max(150, Math.min(w * 0.17, 280)), bh = bw * 0.14, gap = bh * 0.72;
    return { bw, bh, gap, total: bh * 3 + gap * 2 };
  };
  const offsetFor = (bar) => ({
    ox: (Math.random() - 0.5) * shape.bw,
    oy: -shape.total / 2 + bar * (shape.bh + shape.gap) + Math.random() * shape.bh,
  });

  const resize = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    shape = makeShape();
    if (!pointerSeen) { target.x = anchor.x = w * 0.74; target.y = anchor.y = h * 0.36; }
    pts = Array.from({ length: N }, (_, i) => {
      const form = i % 4 !== 0; // 3 de cada 4 forman el isotipo; el resto flota alrededor
      const bar = i % 3;
      return Object.assign({
        x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, form, bar,
        k: 0.008 + Math.random() * 0.03,          // rigidez distinta → llegan en oleadas
        s: form ? 0.9 + Math.random() * 1.3 : 0.5 + Math.random() * 1.4,
        c: form ? BAR[bar] : AMBIENT[(Math.random() * AMBIENT.length) | 0],
        ph: Math.random() * Math.PI * 2,
      }, offsetFor(bar));
    });
  };
  resize(); addEventListener("resize", resize);

  const area = canvas.parentElement;
  const move = (e) => {
    const r = canvas.getBoundingClientRect();
    target.x = e.clientX - r.left; target.y = e.clientY - r.top;
    pointerSeen = true; lastMove = performance.now();
  };
  area.addEventListener("pointermove", move);
  area.addEventListener("pointerdown", (e) => {
    move(e);
    if (!burst) return;
    // Idea 8: al hacer clic, el isotipo estalla en sus tres colores y se vuelve a formar
    for (const p of pts) {
      const dx = p.x - anchor.x, dy = p.y - anchor.y, d = Math.hypot(dx, dy) + 1;
      const f = 18 + Math.random() * 22;
      p.vx += (dx / d) * f; p.vy += (dy / d) * f;
    }
  });

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

  gsap.ticker.add(() => {
    if (!visible || !w) return;
    const dt = Math.min(gsap.ticker.deltaRatio(60), 3);
    const t = performance.now() / 1000;
    // Sin mouse un rato (o en celular): el isotipo flota suave en su lugar
    if (!pointerSeen || t * 1000 - lastMove > 4000) {
      const bx = pointerSeen ? target.x : w * 0.74, by = pointerSeen ? target.y : h * 0.36;
      target.x = bx + Math.sin(t * 0.7) * 0.6; target.y = by + Math.cos(t * 0.9) * 0.6;
    }
    // El centro del isotipo sigue al puntero con suavidad
    anchor.x += (target.x - anchor.x) * 0.14 * dt;
    anchor.y += (target.y - anchor.y) * 0.14 * dt;

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const batches = {};
    for (const p of pts) {
      let ax, ay;
      if (p.form) {
        const tx = anchor.x + p.ox + Math.sin(t * 2.2 + p.ph) * 1.2;
        const ty = anchor.y + p.oy + Math.cos(t * 1.8 + p.ph) * 1.2;
        const dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
        // Resorte + leve giro cuando están lejos: corrientes curvas y fluidas
        const swirl = Math.min(d / 400, 1) * 0.35;
        ax = dx * p.k - dy * p.k * swirl;
        ay = dy * p.k + dx * p.k * swirl;
      } else {
        // Polvo alrededor: corriente suave que rodea al isotipo
        const dx = anchor.x - p.x, dy = anchor.y - p.y, d = Math.hypot(dx, dy) + 1;
        ax = Math.cos(p.y * 0.005 + t * 0.5 + p.ph) * 0.05 + (-dy / d) * 0.04 + (dx / d) * 0.01;
        ay = Math.sin(p.x * 0.005 + t * 0.4) * 0.05 + (dx / d) * 0.04 + (dy / d) * 0.01;
      }
      p.vx = (p.vx + ax * dt) * Math.pow(0.9, dt);
      p.vy = (p.vy + ay * dt) * Math.pow(0.9, dt);
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (!p.form) {
        if (p.x < -30) p.x = w + 30; else if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30; else if (p.y > h + 30) p.y = -30;
      }
      const key = p.c + "|" + (p.s > 1.5 ? 2 : p.s > 0.9 ? 1 : 0);
      (batches[key] = batches[key] || []).push(p);
    }
    for (const key in batches) {
      const [c, sz] = key.split("|");
      ctx.strokeStyle = `rgba(${c},0.8)`;
      ctx.lineWidth = [0.8, 1.4, 2.1][+sz];
      ctx.beginPath();
      for (const p of batches[key]) { ctx.moveTo(p.x - p.vx * 1.6, p.y - p.vy * 1.6); ctx.lineTo(p.x + 0.1, p.y + 0.1); }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  });
}
