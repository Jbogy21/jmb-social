import { isBlocked, localPoint, setupCanvas, type Disposer, type Tone } from "./shared";

// FLUTED LIGHT: the ribbed fluted-glass look from the home page, lit up by a soft light that
// follows the mouse, as if torchlight were passing over ribbed glass. The ribs stay fixed on
// the screen like real glass; only the light moves, and it fades out when the mouse rests.
const RADIUS = 230; // reach of the light
const PERIOD = 7; // width of one rib
const LIGHT: Record<Tone, [number, number, number]> = {
  site: [238, 208, 132],
  creative: [255, 140, 94],
};

export function startFluted(canvas: HTMLCanvasElement, tone: Tone): Disposer {
  const cv = setupCanvas(canvas);
  if (!cv) return () => {};
  const { ctx } = cv;
  const dpr = cv.dpr();
  const [lr, lg, lb] = LIGHT[tone];
  const rgba = (a: number) => `rgba(${lr}, ${lg}, ${lb}, ${a})`;

  // The lit patch is drawn on a small canvas of its own, then stamped under the mouse.
  const lens = document.createElement("canvas");
  lens.width = Math.ceil(RADIUS * 2 * dpr);
  lens.height = Math.ceil(RADIUS * 2 * dpr);
  const lg2 = lens.getContext("2d");
  if (!lg2) return () => {};

  let targetX = -1000;
  let targetY = -1000;
  let x = targetX;
  let y = targetY;
  let energy = 0;
  let lastMove = 0;
  let raf = 0;
  let fresh = true;

  const draw = (now: number) => {
    raf = 0;
    if (fresh) {
      x = targetX;
      y = targetY;
      fresh = false;
    }
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    const idle = now - lastMove;
    const wanted = idle < 450 ? 1 : Math.max(0, 1 - (idle - 450) / 800);
    energy += (wanted - energy) * 0.18;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (energy < 0.015 && wanted === 0) return;

    // ribs, fixed to the screen, brightest near the light
    lg2.setTransform(dpr, 0, 0, dpr, 0, 0);
    lg2.globalCompositeOperation = "source-over";
    lg2.clearRect(0, 0, RADIUS * 2, RADIUS * 2);
    const left = x - RADIUS;
    const firstRib = Math.floor(left / PERIOD) * PERIOD;
    for (let rx = firstRib; rx < x + RADIUS; rx += PERIOD) {
      const u = (rx + PERIOD / 2 - x) / RADIUS; // -1 to 1 across the light
      const shift = -u * 2.2; // the highlight slides a little across each rib, like glass bending light
      const sx = rx - left;
      const g = lg2.createLinearGradient(sx, 0, sx + PERIOD, 0);
      g.addColorStop(0, rgba(0));
      g.addColorStop(0.18, rgba(0.78));
      g.addColorStop(0.5, rgba(0.14));
      g.addColorStop(1, rgba(0));
      lg2.save();
      lg2.translate(shift, 0);
      lg2.fillStyle = g;
      lg2.fillRect(sx, 0, PERIOD, RADIUS * 2);
      lg2.restore();
    }
    // fade the ribs out towards the edge of the light
    lg2.globalCompositeOperation = "destination-in";
    const mask = lg2.createRadialGradient(RADIUS, RADIUS, 0, RADIUS, RADIUS, RADIUS);
    mask.addColorStop(0, "rgba(0,0,0,1)");
    mask.addColorStop(0.5, "rgba(0,0,0,0.75)");
    mask.addColorStop(1, "rgba(0,0,0,0)");
    lg2.fillStyle = mask;
    lg2.fillRect(0, 0, RADIUS * 2, RADIUS * 2);

    // a soft glow underneath the ribs
    ctx.globalCompositeOperation = "lighter";
    const glow = ctx.createRadialGradient(x * dpr, y * dpr, 0, x * dpr, y * dpr, RADIUS * 1.3 * dpr);
    glow.addColorStop(0, rgba(0.17 * energy));
    glow.addColorStop(1, rgba(0));
    ctx.fillStyle = glow;
    ctx.fillRect((x - RADIUS * 1.3) * dpr, (y - RADIUS * 1.3) * dpr, RADIUS * 2.6 * dpr, RADIUS * 2.6 * dpr);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = Math.min(1, energy) * 0.95;
    ctx.drawImage(lens, (x - RADIUS) * dpr, (y - RADIUS) * dpr);
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isBlocked(event.target)) return;
    const { x: px, y: py, inside } = localPoint(canvas, event);
    if (!inside) return;
    targetX = px;
    targetY = py;
    lastMove = performance.now();
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
