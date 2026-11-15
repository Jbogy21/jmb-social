"use client";

import { cursorOptions, demoEnabled, setCursorEffect, useCursorEffect } from "./store";

// A small bar for comparing the cursor effects side by side. It only appears on preview builds
// and the dev server, never on the live site, and goes when one effect is chosen.
export default function CursorDemoBar() {
  const effect = useCursorEffect();
  if (!demoEnabled) return null;
  const current = cursorOptions.find((option) => option.id === effect);

  return (
    <div
      data-no-trail=""
      className="fixed bottom-4 left-4 z-[70] hidden max-w-[34rem] rounded-3xl border border-white/20 bg-[#10130b]/92 p-3 text-cream shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md lg:block"
    >
      <p className="font-mono-label px-2 pb-2 text-[10px] text-cream/85">
        Cursor preview · move your mouse around
      </p>
      <div className="flex flex-wrap gap-1.5">
        {cursorOptions.map((option, index) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={effect === option.id}
            onClick={() => setCursorEffect(option.id)}
            className={`font-mono-label rounded-full border px-3 py-2 text-[10px] transition-colors duration-200 ${
              effect === option.id
                ? "border-cream bg-cream text-ink"
                : "border-white/25 text-cream hover:border-cream/70"
            }`}
          >
            {option.id === "off" ? "Off" : `${index + 1} ${option.label}`}
          </button>
        ))}
      </div>
      {current && <p className="px-2 pt-2.5 text-xs leading-relaxed text-cream/85">{current.note}</p>}
    </div>
  );
}
