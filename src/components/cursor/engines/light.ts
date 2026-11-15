import { isBlocked, localPoint, setupCanvas, type Disposer, type Tone } from "./shared";

// LIGHT TRAIL: a long-exposure streak of warm light that follows the mouse and fades, in the
// colours of the home page glow (ember halo, golden middle, a pale hot core), like a light
// painting photographed with a slow shutter.
const LIFE = 950;
const MAX_POINTS = 70;

const COLOURS: Record<Tone, { halo: string; mid: string; core: string }> = {
  site: { halo: "228, 87, 46", mid: "240, 190, 96", core: "255, 240, 205" },
  creative: { halo: "240, 114, 74", mid: "255, 168, 108", core: "255, 228, 205" },
};

export function startLight(canvas: HTMLCanvasElement, tone: Tone): Disposer {
  const cv = setupCanvas(canvas);
  if (!cv) return () => {};
  const { ctx } = cv;
  const dpr = cv.dpr();
  const c = COLOURS[tone];

  type Point = { x: number; y: number; t: number };
  let points: Point[] = [];
  let raf = 0;

  const draw = (now: number) => {
    raf = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = points.filter((p) => now - p.t < LIFE);
    if (points.length < 2) return;

    ctx.globalCompositeOperation = "lighter";
    ctx.lineJoin = "round";
    const passes = [
      // the soft outer glow has round ends (they overlap too faintly to show); the bright core
      // has butt ends, so its pieces meet cleanly instead of overlapping into bright beads
      { width: 38, alpha: 0.075, colour: c.halo, cap: "round" as const },
      { width: 16, alpha: 0.15, colour: c.mid, cap: "round" as const },
      { width: 3.4, alpha: 0.95, colour: c.core, cap: "butt" as const },
    ];

    // The path is drawn in a few chunks, the older ones fainter and thinner, so the tail fades
    // away first. Each chunk is stroked once, so its pieces never overlap into bright beads.
    const CHUNK = 7;
    const mid = (p: Point, q: Point) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
    for (let start = 1; start < points.length - 1; start += CHUNK) {
      const end = Math.min(points.length - 1, start + CHUNK);
      const centre = points[Math.min(points.length - 2, start + (CHUNK >> 1))];
      const age = (now - centre.t) / LIFE;
      const fade = Math.pow(Math.max(0, 1 - age), 1.7);
      const taper = 0.35 + 0.65 * (1 - age);
      for (const pass of passes) {
        const from = mid(points[start - 1], points[start]);
        ctx.beginPath();
        ctx.moveTo(from.x * dpr, from.y * dpr);
        for (let i = start; i < end; i++) {
          const to = mid(points[i], points[i + 1]);
          ctx.quadraticCurveTo(points[i].x * dpr, points[i].y * dpr, to.x * dpr, to.y * dpr);
        }
        ctx.lineCap = pass.cap;
        ctx.lineWidth = pass.width * taper * dpr;
        ctx.strokeStyle = `rgba(${pass.colour}, ${pass.alpha * fade})`;
        ctx.stroke();
      }
    }

    // the bright head of the streak
    const head = points[points.length - 1];
    const headFade = Math.pow(1 - (now - head.t) / LIFE, 1.4);
    const glow = ctx.createRadialGradient(head.x * dpr, head.y * dpr, 0, head.x * dpr, head.y * dpr, 22 * dpr);
    glow.addColorStop(0, `rgba(${c.core}, ${0.9 * headFade})`);
    glow.addColorStop(0.35, `rgba(${c.mid}, ${0.35 * headFade})`);
    glow.addColorStop(1, `rgba(${c.halo}, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect((head.x - 24) * dpr, (head.y - 24) * dpr, 48 * dpr, 48 * dpr);
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(draw);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isBlocked(event.target)) return;
    const { x, y, inside } = localPoint(canvas, event);
    if (!inside) return;
    const last = points[points.length - 1];
    if (last && Math.hypot(x - last.x, y - last.y) < 5) return;
    points.push({ x, y, t: performance.now() });
    if (points.length > MAX_POINTS) points.shift();
    if (!raf) raf = requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    cv.dispose();
    cancelAnimationFrame(raf);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
