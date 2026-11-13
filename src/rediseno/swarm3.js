// Enjambre de la idea 9: dos grupos de partículas.
//  P1 · fondo: polvo que flota suave por toda la pantalla.
//  P2 · isotipo: viajan hacia el puntero con poca atracción y mucha turbulencia, dejan estela
//       y al llegar forman las tres barras de la E (azul, amarillo, púrpura). Al hacer clic, explotan.
import { gsap } from "./common.js";

const BAR = ["78,169,255", "255,205,89", "143,0,255"];
const AMBIENT = ["255,255,255", "78,169,255", "255,205,89", "143,0,255"];

export function swarm3(canvas, { shock = false } = {}) {
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const N = innerWidth < 760 ? 760 : 2200;
  let w = 0, h = 0, p1 = [], p2 = [], shape = null;
  const anchor = { x: 0, y: 0, px: 0, py: 0 }, target = { x: 0, y: 0 };
  let pointerSeen = false, lastMove = 0, agitation = 0;

  const makeShape = () => {
    const bw = Math.max(150, Math.min(w * 0.17, 280)), bh = bw * 0.14, gap = bh * 0.72;
    return { bw, bh, gap, total: bh * 3 + gap * 2 };
  };

  const resize = () => {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    shape = makeShape();
    if (!pointerSeen) { target.x = anchor.x = anchor.px = w * 0.74; target.y = anchor.y = anchor.py = h * 0.36; }
    p1 = []; p2 = [];
    for (let i = 0; i < N; i++) {
      const p = { x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, ph: Math.random() * Math.PI * 2 };
      if (i % 4 === 0) {
        p.s = 0.5 + Math.random() * 1.2; p.c = AMBIENT[(Math.random() * AMBIENT.length) | 0];
        p1.push(p);
      } else {
        const bar = i % 3;
        p.c = BAR[bar]; p.s = 0.9 + Math.random() * 1.3;
        p.k = 0.0035 + Math.random() * 0.011;        // poca atracción: llegan sin apuro, en oleadas
        p.tu = 0.6 + Math.random() * 0.8;           // cuánto le afecta la turbulencia
        p.ox = (Math.random() - 0.5) * shape.bw;
        p.oy = -shape.total / 2 + bar * (shape.bh + shape.gap) + Math.random() * shape.bh;
        p2.push(p);
      }
    }
    ctx.clearRect(0, 0, w, h);
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
    // Explosión: cada partícula del isotipo sale disparada y luego vuelve a formarlo
    for (const p of p2) {
      const dx = p.x - anchor.x, dy = p.y - anchor.y, d = Math.hypot(dx, dy) + 1;
      const f = 22 + Math.random() * 38, sw = (Math.random() - 0.5) * 18;
      p.vx += (dx / d) * f - (dy / d) * sw; p.vy += (dy / d) * f + (dx / d) * sw;
    }
    agitation = 1;
    if (shock) {
      for (const p of p1) {
        const dx = p.x - anchor.x, dy = p.y - anchor.y, d = Math.hypot(dx, dy) + 1;
        const f = 14 * Math.exp(-d / 380);
        p.vx += (dx / d) * f; p.vy += (dy / d) * f;
      }
      rings.push({ x: anchor.x, y: anchor.y, r: 10, a: 0.9 });
    }
  });
  const rings = [];

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

  const batches = {};
  const add = (p, alpha) => {
    const key = p.c + "|" + (p.s > 1.5 ? 2 : p.s > 0.9 ? 1 : 0) + "|" + alpha;
    (batches[key] = batches[key] || []).push(p);
  };

  gsap.ticker.add(() => {
    if (!visible || !w) return;
    const dt = Math.min(gsap.ticker.deltaRatio(60), 3);
    const t = performance.now() / 1000;
    if (!pointerSeen || t * 1000 - lastMove > 4000) {
      const bx = pointerSeen ? target.x : w * 0.74, by = pointerSeen ? target.y : h * 0.36;
      target.x = bx + Math.sin(t * 0.7) * 0.6; target.y = by + Math.cos(t * 0.9) * 0.6;
    }
    anchor.px = anchor.x; anchor.py = anchor.y;
    anchor.x += (target.x - anchor.x) * 0.1 * dt;
    anchor.y += (target.y - anchor.y) * 0.1 * dt;
    // Agitación: sube cuando el mouse se mueve rápido o tras un clic, y se calma de a poco
    const sp = Math.hypot(anchor.x - anchor.px, anchor.y - anchor.py) / dt;
    agitation = Math.max(agitation * Math.pow(0.975, dt), Math.min(sp / 14, 1));

    // Estela: en vez de borrar todo, se desvanece el cuadro anterior
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    for (const k in batches) delete batches[k];

    // P1 · fondo
    for (const p of p1) {
      const ax = Math.cos(p.y * 0.005 + t * 0.5 + p.ph) * 0.04;
      const ay = Math.sin(p.x * 0.005 + t * 0.4) * 0.04 - 0.008;
      p.vx = (p.vx + ax * dt) * Math.pow(0.95, dt);
      p.vy = (p.vy + ay * dt) * Math.pow(0.95, dt);
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < -30) p.x = w + 30; else if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30; else if (p.y > h + 30) p.y = -30;
      add(p, 0.5);
    }

    // P2 · isotipo
    const turb = 0.05 + agitation * 0.55;
    for (const p of p2) {
      const tx = anchor.x + p.ox, ty = anchor.y + p.oy;
      const dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
      const swirl = Math.min(d / 300, 1) * 0.5;
      // turbulencia: un campo que cambia con el tiempo y con la posición (corrientes, remolinos)
      const n1 = Math.sin(p.y * 0.011 + t * 1.6 + p.ph), n2 = Math.cos(p.x * 0.011 - t * 1.3 + p.ph);
      const tf = turb * p.tu * (0.35 + Math.min(d / 160, 1));
      const ax = dx * p.k - dy * p.k * swirl + n1 * tf;
      const ay = dy * p.k + dx * p.k * swirl + n2 * tf;
      p.vx = (p.vx + ax * dt) * Math.pow(0.935, dt);
      p.vy = (p.vy + ay * dt) * Math.pow(0.935, dt);
      p.x += p.vx * dt; p.y += p.vy * dt;
      add(p, 0.6);
    }

    for (const key in batches) {
      const [c, sz, a] = key.split("|");
      ctx.strokeStyle = `rgba(${c},${a})`;
      ctx.lineWidth = [0.8, 1.3, 1.9][+sz];
      ctx.beginPath();
      for (const p of batches[key]) { ctx.moveTo(p.x - p.vx * 1.4, p.y - p.vy * 1.4); ctx.lineTo(p.x + 0.1, p.y + 0.1); }
      ctx.stroke();
    }
    // Onda del clic (idea 10): un anillo en los tres colores que se abre y se apaga
    for (let i = rings.length - 1; i >= 0; i--) {
      const g = rings[i];
      g.r += 14 * dt; g.a -= 0.022 * dt;
      if (g.a <= 0) { rings.splice(i, 1); continue; }
      BAR.forEach((c, k) => {
        ctx.strokeStyle = `rgba(${c},${g.a * 0.6})`; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(g.x, g.y, g.r + k * 8, 0, Math.PI * 2); ctx.stroke();
      });
    }
    ctx.globalCompositeOperation = "source-over";
  });
}
