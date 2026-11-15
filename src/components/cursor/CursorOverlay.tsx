"use client";

import { useEffect } from "react";
import { overlayEngines } from "./engines";
import { mouseCapable } from "./engines/shared";
import { useCursorEffect } from "./store";

// Mounted once for the whole site. Runs the cursor effects that sit ON TOP of the page, the
// way a cursor does (the viewfinder, the playhead, the dot and ring).
export default function CursorOverlay() {
  const effect = useCursorEffect();

  useEffect(() => {
    if (!mouseCapable()) return;
    const start = overlayEngines[effect];
    if (!start) return;
    return start();
  }, [effect]);

  return null;
}
