"use client";

import { useEffect, useRef } from "react";
import { backdropEngines } from "./engines";
import { mouseCapable, type Tone } from "./engines/shared";
import { useCursorEffect } from "./store";

// A canvas that sits in the page's BACKGROUND, for the cursor effects that live behind the
// content (text, cards, buttons and pictures are drawn over it). Put it where the backdrop
// is: once at the bottom of the page, and once inside each hero.
//
//   mode "fixed"  covers the whole window and stays put as the page scrolls
//   mode "fill"   covers its parent, which must be positioned (a hero, for example)
export default function CursorLayer({
  mode = "fill",
  tone = "site",
  className = "",
}: {
  mode?: "fixed" | "fill";
  tone?: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const effect = useCursorEffect();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!mouseCapable()) {
      canvas.style.display = "none";
      return;
    }
    const start = backdropEngines[effect];
    if (!start) return;
    return start(canvas, tone);
  }, [effect, tone]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-cursor-trail=""
      className={`pointer-events-none ${mode === "fixed" ? "fixed" : "absolute"} inset-0 h-full w-full ${className}`}
    />
  );
}
