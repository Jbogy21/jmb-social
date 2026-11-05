"use client";

import { useEffect, useRef, useState } from "react";
import SceneArt from "./SceneArt";
import type { HeroScene } from "@/lib/heroScenes";

type State = { index: number; prev: number | null };

// A slow flick-through of scenes, used behind the questions on the opening screen and
// behind the heroes of the two path pages. Each new scene is wiped in over the last, with
// a gentle zoom, a caption and a progress line.
export default function ReelPane({
  scenes,
  dwell = 3200,
  startDelay = 0,
  direction = "up",
  italic = false,
  showWords = true,
  showCaption = true,
}: {
  scenes: HeroScene[];
  dwell?: number;
  startDelay?: number;
  direction?: "up" | "down";
  italic?: boolean;
  showWords?: boolean;
  showCaption?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({ index: 0, prev: null });
  const [running, setRunning] = useState(false);
  const total = scenes.length;

  useEffect(() => {
    const node = root.current;
    if (!node || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    let visible = true;

    const tick = () => {
      if (visible && !document.hidden) {
        setState((s) => ({ index: (s.index + 1) % total, prev: s.index }));
      }
      timer = window.setTimeout(tick, dwell);
    };

    // Wait for the entrance to finish before the first flick.
    const waiting = document.documentElement.classList.contains("intro-active") ? 2300 : 500;
    timer = window.setTimeout(() => {
      setRunning(true);
      timer = window.setTimeout(tick, dwell);
    }, waiting + startDelay);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(node);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [dwell, startDelay, total]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const current = scenes[state.index];

  return (
    <div ref={root} className="reel" data-dir={direction} aria-hidden="true">
      {scenes.map((scene, i) => {
        const cls = i === state.index ? "is-active" : i === state.prev ? "is-prev" : "";
        return (
          <div key={scene.label} className={`reel-scene ${cls}`}>
            <div className="reel-art" style={{ background: scene.image ? undefined : scene.bg }}>
              <SceneArt scene={scene} italic={italic} priority={i === 0} showWord={showWords} />
            </div>
            <div className="reel-shade" />
          </div>
        );
      })}

      {showCaption && (
        <div className="reel-caption font-mono-label text-[11px] text-cream-70">
          <p className="flex items-center gap-3">
            <span>
              {pad(state.index + 1)} / {pad(total)}
            </span>
            <span key={state.index} className="reel-label text-cream">
              {current.label}
            </span>
          </p>
          <span className="reel-progress">
            {running && <span key={state.index} style={{ animationDuration: `${dwell}ms` }} />}
          </span>
        </div>
      )}
    </div>
  );
}
