"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroClip } from "@/lib/data";

// Full-screen clips that flick through behind the first screen while the headline stays put.
// It does nothing until clips are listed in `heroClips` (src/lib/data.ts), so the glow behind
// the headline stays exactly as it is.
//
// Built to be light: only the clip on screen and the one coming next are downloaded, only the
// visible one plays, everything pauses when the first screen is out of view or the tab is in
// the background, and people who ask for less motion (or are saving data) get one still frame.
export default function HeroClips({
  clips,
  dwell = 3600,
}: {
  clips: HeroClip[];
  dwell?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const total = clips.length;

  useEffect(() => {
    const node = root.current;
    if (!node || total < 1) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData === true;

    let timer = 0;
    let visible = true;

    const tick = () => {
      if (visible && !document.hidden && total > 1) setIndex((i) => (i + 1) % total);
      timer = window.setTimeout(tick, dwell);
    };

    if (!still) {
      // Wait for the entrance to finish before the first flick.
      const waiting = document.documentElement.classList.contains("intro-active") ? 2300 : 500;
      timer = window.setTimeout(tick, waiting + dwell);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      const current = videos.current[index];
      if (!current || still) return;
      if (visible) void current.play().catch(() => {});
      else current.pause();
    });
    observer.observe(node);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [dwell, total, index]);

  // Play the clip that is showing; let the one fading out finish its fade, then pause it.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    videos.current.forEach((video, i) => {
      if (!video) return;
      if (i === index && !reduced) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        timers.push(window.setTimeout(() => video.pause(), 900));
      }
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [index]);

  if (total < 1) return null;

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {clips.map((clip, i) => {
        const showing = i === index;
        const next = i === (index + 1) % total;
        return (
          <video
            key={clip.src}
            ref={(el) => {
              videos.current[i] = el;
            }}
            src={showing || next ? clip.src : undefined}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              showing ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
      {/* Brand colour over the footage, so the headline always reads and the clips feel like
          part of the same page as the glow. */}
      <span className="absolute inset-0 bg-[#10130b]/45" />
      <span className="glow-flutes" />
      <span className="glow-vignette" />
    </div>
  );
}
