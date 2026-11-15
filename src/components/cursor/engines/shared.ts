export type Tone = "site" | "creative";
export type Disposer = () => void;

// Only with a real mouse, and never for people who ask for less motion.
export const mouseCapable = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Nothing happens over form fields (or anything marked data-no-trail).
export const isBlocked = (target: EventTarget | null) =>
  Boolean((target as Element | null)?.closest?.("input, textarea, select, [data-no-trail]"));

// The Creative pages get the ember colours, everywhere else the olive and cream ones.
export const toneOf = (target: EventTarget | null): Tone =>
  (target as Element | null)?.closest?.(".creative-world") ? "creative" : "site";

export const TONE_COLOURS: Record<Tone, string> = { site: "#ece2c8", creative: "#f0724a" };

// Things worth reacting to.
export const CLICKABLE = 'a, button, [role="button"], summary, label, img, video, figure, .pop-card';

// A short name for what a click on this would do.
export const cursorLabel = (el: Element): string => {
  const custom = el.getAttribute("data-cursor");
  if (custom) return custom;
  if (el.matches("a")) {
    const href = el.getAttribute("href") || "";
    if (href.startsWith("tel:")) return "CALL";
    if (href.startsWith("mailto:")) return "EMAIL";
    if (/wa\.me/.test(href)) return "CHAT";
    if (/^https?:/.test(href)) return "OPEN ↗";
    return "VIEW";
  }
  if (el.matches("button, [role='button'], summary")) return "PRESS";
  if (el.matches("img, video, figure, .pop-card")) return "VIEW";
  return "";
};

// A full-window canvas that scales itself for sharp screens and keeps its size up to date.
export function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  return { ctx, dpr: () => dpr, dispose: () => observer.disconnect() };
}

// Where the pointer is, in the canvas's own coordinates (and whether it is over the canvas).
export function localPoint(canvas: HTMLCanvasElement, event: PointerEvent) {
  const box = canvas.getBoundingClientRect();
  const x = event.clientX - box.left;
  const y = event.clientY - box.top;
  return { x, y, inside: x >= 0 && y >= 0 && x <= box.width && y <= box.height };
}
