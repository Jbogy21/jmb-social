import { cursorFrames } from "@/lib/data";
import { isBlocked, localPoint, setupCanvas, type Disposer, type Tone } from "./shared";

// REEL FRAMES: a trail of tiny tilted portrait frames, like Reels or Stories. Each pops up
// along the mouse's path, then fades, with a thin story-style progress line along the top that
// fills as the frame runs out. The frames carry the ribbed fluted-glass look from the home
// page. With photos listed in `cursorFrames` (src/lib/data.ts) the frames show those.
const FRAME_W = 38;
const FRAME_H = 68;
const RADIUS = 5;
const PAD = 14; // room around each pre-drawn frame for its shadow
const LIFE = 1100;
const GAP = 66; // how far the mouse travels between frames
const MAX_FRAMES = 12;

type Palette = [string, string];
const PALETTES: Record<Tone, Palette[]> = {
  site: [
    ["#7a8c46", "#222b17"],
    ["#bba65c", "#5a4a20"],
    ["#6f7561", "#1a1e12"],
    ["#e0623a", "#6e2512"],
  ],
  creative: [
    ["#e0623a", "#6e2512"],
    ["#bba65c", "#5a4a20"],
    ["#a8431f", "#2a140d"],
    ["#7a8c46", "#222b17"],
  ],
};

const frameShape = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
};

export function startFrames(canvas: HTMLCanvasElement, tone: Tone): Disposer {
  const cv = setupCanvas(canvas);
  if (!cv) return () => {};
  const { ctx } = cv;
  const dpr = cv.dpr();

  const newSprite = () => {
    const sprite = document.createElement("canvas");
    sprite.width = Math.ceil((FRAME_W + PAD * 2) * dpr);
    sprite.height = Math.ceil((FRAME_H + PAD * 2) * dpr);
    return { sprite, g: sprite.getContext("2d") };
  };

  const finish = (g: CanvasRenderingContext2D, paint: () => void) => {
    g.save();
    g.scale(dpr, dpr);
    g.shadowColor = "rgba(0, 0, 0, 0.4)";
    g.shadowBlur = 10;
    g.shadowOffsetY = 3;
    frameShape(g, PAD, PAD, FRAME_W, FRAME_H, RADIUS);
    g.fillStyle = "#14170d";
    g.fill();
    g.shadowColor = "transparent";
    g.save();
    frameShape(g, PAD, PAD, FRAME_W, FRAME_H, RADIUS);
    g.clip();
    paint();
    g.restore();
    frameShape(g, PAD + 0.5, PAD + 0.5, FRAME_W - 1, FRAME_H - 1, RADIUS);
    g.strokeStyle = "rgba(236, 226, 200, 0.85)";
    g.lineWidth = 1;
    g.stroke();
    g.restore();
  };

  const artSprite = ([top, bottom]: Palette) => {
    const { sprite, g } = newSprite();
    if (!g) return sprite;
    finish(g, () => {
      const grad = g.createLinearGradient(PAD, PAD, PAD + FRAME_W * 0.4, PAD + FRAME_H);
      grad.addColorStop(0, top);
      grad.addColorStop(1, bottom);
      g.fillStyle = grad;
      g.fillRect(PAD, PAD, FRAME_W, FRAME_H);
      for (let x = PAD; x < PAD + FRAME_W; x += 3) {
        g.fillStyle = "rgba(255, 255, 255, 0.13)";
        g.fillRect(x, PAD, 1, FRAME_H);
        g.fillStyle = "rgba(0, 0, 0, 0.12)";
        g.fillRect(x + 1.5, PAD, 1, FRAME_H);
      }
    });
    return sprite;
  };

  const photoSprite = (image: HTMLImageElement) => {
    const { sprite, g } = newSprite();
    if (!g) return sprite;
    finish(g, () => {
      const scale = Math.max(FRAME_W / image.naturalWidth, FRAME_H / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      g.drawImage(image, PAD + (FRAME_W - w) / 2, PAD + (FRAME_H - h) / 2, w, h);
    });
    return sprite;
  };

  const sprites: HTMLCanvasElement[] = PALETTES[tone].map(artSprite);
  cursorFrames.forEach((src) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => sprites.push(photoSprite(image));
    image.src = src;
  });

  type Frame = { x: number; y: number; born: number; tilt: number; dx: number; dy: number; sprite: number };
  let frames: Frame[] = [];
  let raf = 0;
  let lastX = -1000;
  let lastY = -1000;
  let count = 0;
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const draw = (now: number) => {
    raf = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames = frames.filter((f) => now - f.born < LIFE);
    for (const f of frames) {
      const age = (now - f.born) / LIFE;
      const grow = ease(Math.min(1, age / 0.12));
      const fade = age < 0.68 ? 1 : 1 - (age - 0.68) / 0.32;
      const scale = (0.7 + 0.3 * grow) * (age < 0.68 ? 1 : 0.97 + 0.03 * fade);
      const drift = 16 * ease(age);
      const sprite = sprites[f.sprite % sprites.length];
      ctx.save();
      ctx.translate((f.x + f.dx * drift) * dpr, (f.y + f.dy * drift) * dpr);
      ctx.rotate(f.tilt);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.max(0, fade) * 0.92;
      ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
      const barW = (FRAME_W - 10) * dpr;
      const barY = (-FRAME_H / 2 + 6) * dpr;
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fillRect(-barW / 2, barY, barW, 2 * dpr);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fillRect(-barW / 2, barY, barW * Math.min(1, age * 1.05), 2 * dpr);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    if (frames.length) raf = requestAnimationFrame(draw);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isBlocked(event.target)) return;
    const { x, y, inside } = localPoint(canvas, event);
    if (!inside) return;
    const travelled = Math.hypot(x - lastX, y - lastY);
    if (travelled < GAP) return;
    const known = lastX > -500;
    const dirX = known ? (x - lastX) / travelled : 0;
    const dirY = known ? (y - lastY) / travelled : 0;
    count += 1;
    const side = count % 2 ? 1 : -1;
    frames.push({
      x: x - dirY * 9 * side,
      y: y + dirX * 9 * side,
      born: performance.now(),
      tilt: dirX * 0.1 + side * 0.07 + (((count * 37) % 9) - 4) * 0.012,
      dx: dirX,
      dy: dirY,
      sprite: count,
    });
    lastX = x;
    lastY = y;
    if (frames.length > MAX_FRAMES) frames.shift();
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
