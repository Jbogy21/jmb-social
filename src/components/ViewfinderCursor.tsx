"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/data";

// The JMB Social cursor: a camera viewfinder.
//
// Focus brackets follow the mouse and lock onto anything that can be clicked, with a small
// label for what it does (VIEW, OPEN, CALL...). A click fires a quick shutter flash and the
// brackets squeeze in, like a focus lock. The normal pointer stays visible; this goes with it.
//
// Desktop with a real mouse only (never phones or tablets), off for people who ask for less
// motion, hidden over form fields, and it never blocks a click. Turn it off in one place:
// `cursorEffect` in `siteConfig` (src/lib/data.ts). The thinking is in docs/cursor-options.md.

const IDLE = 30; // size of the brackets when there is nothing to lock onto
const PAD = 7; // breathing room around a locked element

const TONES = { site: "#ece2c8", creative: "#f0724a" } as const; // the Creative pages get ember
const CLICKABLE = 'a, button, [role="button"], summary, label, img, video, figure, .pop-card';

const mouseCapable = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Nothing happens over form fields (or anything marked data-no-trail).
const isBlocked = (target: EventTarget | null) =>
  Boolean((target as Element | null)?.closest?.("input, textarea, select, [data-no-trail]"));

const toneOf = (target: EventTarget | null) =>
  (target as Element | null)?.closest?.(".creative-world") ? TONES.creative : TONES.site;

// A short name for what a click on this would do. Add data-cursor="WATCH" to name your own.
const cursorLabel = (el: Element): string => {
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

function start() {
  const root = document.createElement("div");
  Object.assign(root.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "60",
    opacity: "0",
    transition: "opacity 180ms ease",
  });

  const frame = document.createElement("div");
  Object.assign(frame.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: `${IDLE}px`,
    height: `${IDLE}px`,
    color: TONES.site,
    willChange: "transform, width, height",
  });
  const corner = (top: boolean, left: boolean) => {
    const el = document.createElement("span");
    Object.assign(el.style, {
      position: "absolute",
      width: "11px",
      height: "11px",
      [top ? "top" : "bottom"]: "0",
      [left ? "left" : "right"]: "0",
      [top ? "borderTop" : "borderBottom"]: "1.5px solid currentColor",
      [left ? "borderLeft" : "borderRight"]: "1.5px solid currentColor",
    });
    return el;
  };
  [corner(true, true), corner(true, false), corner(false, true), corner(false, false)].forEach((el) =>
    frame.appendChild(el),
  );

  const dot = document.createElement("span");
  Object.assign(dot.style, {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "3px",
    height: "3px",
    margin: "-1.5px 0 0 -1.5px",
    borderRadius: "50%",
    background: "currentColor",
    transition: "opacity 160ms ease",
  });
  frame.appendChild(dot);

  const label = document.createElement("span");
  Object.assign(label.style, {
    position: "absolute",
    left: "0",
    top: "100%",
    marginTop: "7px",
    padding: "3px 7px",
    borderRadius: "2px",
    background: "rgba(16, 19, 11, 0.88)",
    border: "1px solid currentColor",
    fontFamily: "var(--font-mono), ui-monospace, monospace",
    fontSize: "10px",
    letterSpacing: "0.14em",
    whiteSpace: "nowrap",
    opacity: "0",
    transition: "opacity 160ms ease",
  });
  frame.appendChild(label);
  root.appendChild(frame);
  document.body.appendChild(root);

  // current, target and pointer positions; the brackets ease from one to the other
  let cx = -100;
  let cy = -100;
  let cw = IDLE;
  let ch = IDLE;
  let tx = -100;
  let ty = -100;
  let tw = IDLE;
  let th = IDLE;
  let px = -100;
  let py = -100;
  let pressed = false;
  let locked: Element | null = null;
  let seen = false; // true once the mouse has moved at all
  let raf = 0;
  let fresh = true;

  const aim = () => {
    if (locked && locked.isConnected) {
      const r = locked.getBoundingClientRect();
      tx = r.left - PAD;
      ty = r.top - PAD;
      tw = r.width + PAD * 2;
      th = r.height + PAD * 2;
    } else {
      tx = px - IDLE / 2;
      ty = py - IDLE / 2;
      tw = IDLE;
      th = IDLE;
    }
    if (pressed) {
      tx += 4;
      ty += 4;
      tw -= 8;
      th -= 8;
    }
  };

  // runs only while the brackets are still moving, then goes to sleep
  const loop = () => {
    raf = 0;
    aim();
    if (fresh) {
      cx = tx;
      cy = ty;
      cw = tw;
      ch = th;
      fresh = false;
    }
    cx += (tx - cx) * 0.26;
    cy += (ty - cy) * 0.26;
    cw += (tw - cw) * 0.26;
    ch += (th - ch) * 0.26;
    frame.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
    frame.style.width = `${cw.toFixed(1)}px`;
    frame.style.height = `${ch.toFixed(1)}px`;
    const settled =
      Math.abs(tx - cx) < 0.3 && Math.abs(ty - cy) < 0.3 && Math.abs(tw - cw) < 0.3 && Math.abs(th - ch) < 0.3;
    if (!settled) raf = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  // Works out what the pointer is on and aims at it. Called when the mouse moves, and again
  // a few times a second while it rests, so the brackets follow something that moves or
  // changes under a still pointer (a card turning, a video starting).
  const update = (target: EventTarget | null) => {
    if (px < 0) return;
    if (isBlocked(target)) {
      root.style.opacity = "0";
      return;
    }
    root.style.opacity = "1";
    frame.style.color = toneOf(target);
    // anything that names its own label (data-cursor) wins over a picture or button inside it
    const el =
      (target as Element | null)?.closest?.("[data-cursor]") ??
      (target as Element | null)?.closest?.(CLICKABLE) ??
      null;
    let next: Element | null = null;
    if (el) {
      const r = el.getBoundingClientRect();
      // huge things (full-width pictures, whole cards) are not worth locking onto
      const big = r.width * r.height > window.innerWidth * window.innerHeight * 0.3;
      if (!big && r.width > 8 && r.height > 8) next = el;
    }
    if (next !== locked) {
      locked = next;
      const text = next ? cursorLabel(next) : "";
      label.textContent = text;
      label.style.opacity = text ? "1" : "0";
      dot.style.opacity = next ? "0" : "1";
    }
    wake();
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    px = event.clientX;
    py = event.clientY;
    seen = true;
    update(event.target);
  };

  const rest = window.setInterval(() => {
    if (seen && root.style.opacity === "1") update(document.elementFromPoint(px, py));
  }, 150);

  const onScroll = () => {
    if (locked) wake(); // keep the brackets on the thing as the page moves under the mouse
  };

  const onDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || isBlocked(event.target)) return;
    pressed = true;
    // the shutter flash
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute",
      left: `${event.clientX - 70}px`,
      top: `${event.clientY - 70}px`,
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${toneOf(event.target)}99 0%, transparent 68%)`,
    });
    root.appendChild(flash);
    flash
      .animate(
        [
          { transform: "scale(0.35)", opacity: 0.9 },
          { transform: "scale(1.5)", opacity: 0 },
        ],
        { duration: 340, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      )
      .addEventListener("finish", () => flash.remove());
    wake();
  };
  const onUp = () => {
    pressed = false;
    wake();
  };
  const onLeave = () => {
    root.style.opacity = "0";
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("scroll", onScroll);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    window.clearInterval(rest);
    cancelAnimationFrame(raf);
    root.remove();
  };
}

export default function ViewfinderCursor() {
  useEffect(() => {
    if (siteConfig.cursorEffect !== "viewfinder" || !mouseCapable()) return;
    return start();
  }, []);

  return null;
}
