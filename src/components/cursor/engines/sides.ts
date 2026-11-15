import { CLICKABLE, TONE_COLOURS, cursorLabel, isBlocked, toneOf, type Disposer, type Tone } from "./shared";

// TWO SIDES: a small dot with a ring that trails it. The ring takes the character of the side
// of the studio you are on: on the local business pages it is a precise square with tick marks
// (measured, reliable); on the Creative pages it is a round ember ring with an italic label.
// It grows over anything clickable and names it. The normal pointer is hidden while this runs.
const REST = 34;
const OVER = 68;

export function startSides(): Disposer {
  const html = document.documentElement;
  html.classList.add("jc-hide-native");

  const root = document.createElement("div");
  Object.assign(root.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "60",
    opacity: "0",
    transition: "opacity 160ms ease",
    color: TONE_COLOURS.site,
  });

  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "6px",
    height: "6px",
    marginLeft: "-3px",
    marginTop: "-3px",
    borderRadius: "50%",
    background: "currentColor",
    willChange: "transform",
  });

  const ring = document.createElement("div");
  Object.assign(ring.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: `${REST}px`,
    height: `${REST}px`,
    border: "1px solid currentColor",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    willChange: "transform",
    transition: "width 220ms cubic-bezier(0.16, 1, 0.3, 1), height 220ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 220ms ease, background-color 220ms ease",
  });

  // tick marks outside the square ring (the "measured" side)
  const ticks: HTMLSpanElement[] = [];
  (["top", "bottom", "left", "right"] as const).forEach((side) => {
    const tick = document.createElement("span");
    const horizontal = side === "left" || side === "right";
    Object.assign(tick.style, {
      position: "absolute",
      background: "currentColor",
      width: horizontal ? "7px" : "1px",
      height: horizontal ? "1px" : "7px",
      [side]: "-10px",
      ...(horizontal ? { top: "50%" } : { left: "50%" }),
    });
    ticks.push(tick);
    ring.appendChild(tick);
  });

  const label = document.createElement("span");
  Object.assign(label.style, { whiteSpace: "nowrap", opacity: "0", transition: "opacity 160ms ease" });
  ring.appendChild(label);

  root.appendChild(ring);
  root.appendChild(dot);
  document.body.appendChild(root);

  let px = -100;
  let py = -100;
  let rx = px;
  let ry = py;
  let over = false;
  let pressed = false;
  let tone: Tone = "site";
  let raf = 0;
  let fresh = true;

  const loop = () => {
    raf = 0;
    if (fresh) {
      rx = px;
      ry = py;
      fresh = false;
    }
    rx += (px - rx) * 0.22;
    ry += (py - ry) * 0.22;
    dot.style.transform = `translate(${px}px, ${py}px)`;
    ring.style.transform = `translate(${(rx - (over ? OVER : REST) / 2).toFixed(1)}px, ${(ry - (over ? OVER : REST) / 2).toFixed(1)}px) scale(${pressed ? 0.82 : 1})`;
    if (Math.abs(px - rx) > 0.3 || Math.abs(py - ry) > 0.3) raf = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  const dress = (nextTone: Tone, text: string) => {
    const creative = nextTone === "creative";
    root.style.color = TONE_COLOURS[nextTone];
    ring.style.borderRadius = creative ? "50%" : "3px";
    ticks.forEach((tick) => (tick.style.display = creative ? "none" : "block"));
    const size = over ? OVER : REST;
    ring.style.width = `${size}px`;
    ring.style.height = `${size}px`;
    // a dark backing when over something, so the label reads on any background (even a cream button)
    ring.style.backgroundColor = over ? "rgba(16, 19, 11, 0.7)" : "transparent";
    if (creative) {
      Object.assign(label.style, {
        fontFamily: "var(--font-display), Georgia, serif",
        fontStyle: "italic",
        fontSize: "16px",
        letterSpacing: "0",
        textTransform: "none",
      });
      label.textContent = text ? text.charAt(0) + text.slice(1).toLowerCase() : "";
    } else {
      Object.assign(label.style, {
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        fontStyle: "normal",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      });
      label.textContent = text;
    }
    label.style.opacity = over && text ? "1" : "0";
    dot.style.opacity = over ? "0" : "1"; // the label takes over from the dot
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    px = event.clientX;
    py = event.clientY;
    if (isBlocked(event.target)) {
      root.style.opacity = "0";
      return;
    }
    root.style.opacity = "1";
    const el = (event.target as Element | null)?.closest?.(CLICKABLE) ?? null;
    const nextOver = Boolean(el);
    const nextTone = toneOf(event.target);
    if (nextOver !== over || nextTone !== tone) {
      over = nextOver;
      tone = nextTone;
      dress(tone, el ? cursorLabel(el) : "");
    }
    wake();
  };
  const onDown = () => {
    pressed = true;
    wake();
  };
  const onUp = () => {
    pressed = false;
    wake();
  };
  const onLeave = () => {
    root.style.opacity = "0";
  };

  dress("site", "");
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  html.addEventListener("mouseleave", onLeave);
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    html.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
    html.classList.remove("jc-hide-native");
    root.remove();
  };
}
