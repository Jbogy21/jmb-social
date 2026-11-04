"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ScrollCue from "./ScrollCue";

// How much scrolling (in screen heights) it takes to move from one chapter to the next.
const STEP_SVH = 85;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

// A guided scroll: the page holds still while the chapters change places, each one fading
// and drifting out as the next arrives. Skip leaves the sequence at any point.
export default function ChapterStage({
  chapters,
  cues,
  skipTo,
}: {
  chapters: ReactNode[];
  cues: string[];
  skipTo: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const last = chapters.length - 1;

  useEffect(() => {
    const outer = wrap.current;
    const stage = pin.current;
    if (!outer || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
  }, [last]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="chapters" aria-label="Choose your side" className="relative">
      <div
        ref={wrap}
        className="chapter-wrap relative [--hdr:81px] md:[--hdr:97px]"
        style={{ height: `calc(100svh + ${last * STEP_SVH}svh)` }}
      >
        <div ref={pin} className="chapter-pin sticky top-0 h-svh overflow-hidden">
          {chapters.map((chapter, i) => (
            <div
              key={i}
              ref={(el) => {
                items.current[i] = el;
              }}
              inert={i !== active}
              className="chapter absolute inset-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {chapter}
            </div>
          ))}

          <div className="chapter-chrome pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="container-edge flex items-end justify-between gap-4 pb-6 md:pb-8">
              <div className="flex items-center gap-4">
                <a
                  href={skipTo}
                  className="font-mono-label pointer-events-auto rounded-full border border-white/30 px-4 py-2.5 text-[11px] text-cream transition-colors hover:bg-cream hover:text-ink"
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
              <div className="pointer-events-auto hidden pr-40 lg:block">
                <ScrollCue href={skipTo} label={cues[active] ?? cues[last]} />
              </div>
            </div>
            <div className="container-edge pointer-events-auto pb-4 lg:hidden">
              <ScrollCue href={skipTo} label={cues[active] ?? cues[last]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
