import { TONE_COLOURS, isBlocked, toneOf, type Disposer } from "./shared";

// PLAYHEAD: the page as a video timeline. A thin line follows the pointer with a timecode, and
// a ruler runs down the left edge and moves as you scroll. Move the pointer or scroll and the
// timecode scrubs through the page, the way an editor scrubs through a cut.
const TOTAL_SECONDS = 150; // how long the whole page "runs"
const FPS = 24;

const pad = (n: number) => String(n).padStart(2, "0");
const timecode = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * FPS);
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
};

export function startPlayhead(): Disposer {
  const root = document.createElement("div");
  Object.assign(root.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "60",
    opacity: "0",
    transition: "opacity 200ms ease",
    color: TONE_COLOURS.site,
  });

  const ruler = (width: number, period: number, opacity: number) => {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: `${width}px`,
      opacity: String(opacity),
      backgroundImage: `repeating-linear-gradient(to bottom, currentColor 0, currentColor 1px, transparent 1px, transparent ${period}px)`,
    });
    return el;
  };
  const minor = ruler(6, 12, 0.3);
  const major = ruler(14, 60, 0.42);
  root.appendChild(minor);
  root.appendChild(major);

  const row = document.createElement("div");
  Object.assign(row.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "1px",
    willChange: "transform",
  });
  const line = document.createElement("div");
  Object.assign(line.style, {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "1px",
    background: "currentColor",
    opacity: "0.28",
  });
  const marker = document.createElement("div");
  Object.assign(marker.style, {
    position: "absolute",
    left: "14px",
    top: "-5px",
    width: "0",
    height: "0",
    borderTop: "5.5px solid transparent",
    borderBottom: "5.5px solid transparent",
    borderLeft: "8px solid currentColor",
  });
  const chip = document.createElement("div");
  Object.assign(chip.style, {
    position: "absolute",
    left: "28px",
    top: "-11px",
    padding: "3px 8px",
    borderRadius: "2px",
    background: "rgba(16, 19, 11, 0.9)",
    border: "1px solid currentColor",
    fontFamily: "var(--font-mono), ui-monospace, monospace",
    fontSize: "10px",
    letterSpacing: "0.12em",
    whiteSpace: "nowrap",
  });
  row.appendChild(line);
  row.appendChild(marker);
  row.appendChild(chip);
  root.appendChild(row);
  document.body.appendChild(root);

  let targetY = -100;
  let y = -100;
  let raf = 0;
  let fresh = true;

  const render = () => {
    raf = 0;
    if (fresh) {
      y = targetY;
      fresh = false;
    }
    y += (targetY - y) * 0.34;
    const scrollY = window.scrollY;
    const height = Math.max(1, document.documentElement.scrollHeight);
    row.style.transform = `translateY(${y.toFixed(1)}px)`;
    chip.textContent = timecode(((scrollY + y) / height) * TOTAL_SECONDS);
    // the ruler moves with the page
    minor.style.backgroundPositionY = `${-(scrollY % 12)}px`;
    major.style.backgroundPositionY = `${-(scrollY % 60)}px`;
    if (Math.abs(targetY - y) > 0.3) raf = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (isBlocked(event.target)) {
      root.style.opacity = "0";
      return;
    }
    root.style.opacity = "1";
    root.style.color = TONE_COLOURS[toneOf(event.target)];
    targetY = event.clientY;
    wake();
  };
  const onScroll = () => wake();
  const onLeave = () => {
    root.style.opacity = "0";
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", onScroll);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
    root.remove();
  };
}
