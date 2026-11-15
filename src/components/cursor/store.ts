"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/data";

// Which cursor effect is showing. In normal use this is just `siteConfig.cursorEffect`. While
// the options are being compared (a preview build, or the dev server) it can also be changed
// with the switcher at the bottom of the screen, or with ?cursor=<id> in the address.
export type CursorEffect = "frames" | "viewfinder" | "fluted" | "playhead" | "sides" | "light" | "off";

export const cursorOptions: { id: CursorEffect; label: string; note: string }[] = [
  { id: "frames", label: "Reel frames", note: "Tiny Reel frames pop up behind the page and fade, with story-style progress lines." },
  { id: "viewfinder", label: "Viewfinder", note: "Camera-focus brackets snap onto anything clickable. Click for a shutter flash." },
  { id: "fluted", label: "Fluted light", note: "A soft light moves over the ribbed glass, lighting up the ribs under your mouse." },
  { id: "playhead", label: "Playhead", note: "A timeline playhead with a timecode follows you. Scroll to scrub the page." },
  { id: "sides", label: "Two sides", note: "Dot and ring. Square and precise for local business, round and ember for creative." },
  { id: "light", label: "Light trail", note: "A long-exposure streak of warm light follows the mouse and fades." },
  { id: "off", label: "Off", note: "No cursor effect." },
];

export const demoEnabled =
  process.env.NEXT_PUBLIC_CURSOR_DEMO === "1" || process.env.NODE_ENV !== "production";

const valid = (value: string | null): value is CursorEffect =>
  cursorOptions.some((option) => option.id === value);

let current = siteConfig.cursorEffect as CursorEffect;
let started = false;
const listeners = new Set<() => void>();

const start = () => {
  if (started || typeof window === "undefined") return;
  started = true;
  if (!demoEnabled) return;
  let pick: string | null = new URLSearchParams(window.location.search).get("cursor");
  if (!valid(pick)) {
    try {
      pick = window.sessionStorage.getItem("jmb-cursor");
    } catch {
      pick = null;
    }
  }
  if (valid(pick)) current = pick;
};

export const getCursorEffect = (): CursorEffect => {
  start();
  return current;
};

export const setCursorEffect = (next: CursorEffect) => {
  current = next;
  try {
    window.sessionStorage.setItem("jmb-cursor", next);
    const url = new URL(window.location.href);
    url.searchParams.set("cursor", next);
    window.history.replaceState(window.history.state, "", url);
  } catch {
    /* storage or history unavailable: the choice just lasts until the page is reloaded */
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useCursorEffect = (): CursorEffect =>
  useSyncExternalStore(subscribe, getCursorEffect, () => siteConfig.cursorEffect as CursorEffect);
