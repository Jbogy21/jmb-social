"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import ScrollCue from "./ScrollCue";

// How much scrolling (in screen heights) it takes to move from one chapter to the next.
const STEP_SVH = 85;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// With "reduce motion" on, the chapters are simply laid out one after another (see the CSS),
// so none of them should be switched off.
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const readReduced = () => window.matchMedia(reducedQuery).matches;
const serverReduced = () => false;

// A guided scroll: the page holds still while the chapters change places, each one fading
// and drifting out as the next arrives. Skip leaves the sequence at any point.
//
// The bottom controls sit in one short row. Every chapter reserves `--chrome` of room at
// the bottom of the screen for them, so content can never run underneath.
export default function ChapterStage({
  chapters,
  cues,
  shortCues,
  skipTo,
  id = "chapters",
  label = "Choose your side",
  stepSvh = STEP_SVH,
}: {
  chapters: ReactNode[];
  cues: string[];
  shortCues?: string[];
  skipTo: string;
  id?: string;
  label?: string;
  stepSvh?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, readReduced, serverReduced);
  const last = chapters.length - 1;

  useEffect(() => {
    const outer = wrap.current;
    const stage = pin.current;
    if (!outer || !stage) return;
    if (reduced) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const travel = outer.offsetHeight - stage.offsetHeight;
      const progress =
        travel > 0 ? clamp(-outer.getBoundingClientRect().top / travel, 0, 1) : 0;
      const t = progress * last;

      items.current.forEach((el, i) => {
        if (!el) return;
        const distance = Math.abs(t - i);
        const weight = clamp(1 - distance * 1.7, 0, 1);
        el.style.opacity = String(weight);
        el.style.transform = `translate3d(0, ${(i - t) * 5}vh, 0) scale(${0.97 + 0.03 * weight})`;
        el.style.filter = weight < 1 ? `blur(${((1 - weight) * 6).toFixed(1)}px)` : "none";
        el.style.pointerEvents = distance < 0.5 ? "auto" : "none";
      });

      setActive(Math.round(t));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          listening = true;
          update();
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          listening = false;
        }
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(outer);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [last, reduced]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cue = cues[active] ?? cues[last];
  const shortCue = shortCues ? (shortCues[active] ?? shortCues[last]) : undefined;

  return (
    <section id={id} aria-label={label} className="relative">
      <div
        ref={wrap}
        className="chapter-wrap relative [--chrome:4.75rem] [--hdr:81px] md:[--chrome:6rem] md:[--hdr:97px]"
        style={{ height: `calc(100svh + ${last * stepSvh}svh)` }}
      >
        <div ref={pin} className="chapter-pin sticky top-0 h-svh overflow-hidden">
          {chapters.map((chapter, i) => (
            <div
              key={i}
              ref={(el) => {
                items.current[i] = el;
              }}
              inert={!reduced && i !== active}
              className="chapter absolute inset-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {chapter}
            </div>
          ))}

          <div className="chapter-chrome pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="container-edge pb-4 md:pb-8">
              {/* On phones the row stops short of the floating WhatsApp button. */}
              <div className="flex items-center gap-3 pr-[3.75rem] sm:gap-4 lg:items-end lg:justify-between lg:pr-0">
                <div className="pointer-events-auto flex shrink-0 items-center gap-4">
                  <a
                    href={skipTo}
                    className="font-mono-label flex h-9 items-center rounded-full border border-white/30 px-4 text-[11px] text-cream transition-colors hover:bg-cream hover:text-ink sm:h-10"
                  >
                    Skip ↓
                  </a>
                  <span className="font-mono-label hidden text-[11px] text-cream/75 sm:inline">
                    {pad(active + 1)} / {pad(chapters.length)}
                  </span>
                  <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
                    {chapters.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === active ? "w-6 bg-cream" : "w-1.5 bg-white/30"
                        }`}
                      />
                    ))}
                  </span>
                </div>
                <div className="pointer-events-auto min-w-0 lg:pr-40">
                  <ScrollCue href={skipTo} label={cue} shortLabel={shortCue} compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
