"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";
import ChapterStage from "./ChapterStage";
import { ServiceFit } from "./ServiceCards";
import { Exhibit, tones } from "./ServiceParts";
import type { StagePanel } from "@/lib/data";

// How much scrolling (in screen heights) each service gets while the section is pinned.
const SEGMENT_SVH = 55;

const phoneCues = ["Scroll for creative", "Scroll for builds", "Scroll to continue"];
const wideCues = [
  "Scroll for creative, campaign & PR",
  "Scroll for digital builds",
  "Scroll to continue",
];

// Services as side-by-side panels. The section holds still for a short while and opens one
// panel after another as the page scrolls; hovering (or tabbing to) a panel opens it
// straight away, and Skip jumps past the whole thing. Below the desktop width the same
// four services become pinned cards that fit the screen, one after another, each with its
// picture.
export default function ServiceStage({
  panels,
  skipTo = "#about-me",
}: {
  panels: StagePanel[];
  skipTo?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timer = useRef<number | null>(null);
  const scrollIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const last = panels.length - 1;

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // A short pause stops panels flickering open as the pointer passes over them.
  const openSoon = (index: number) => {
    clear();
    timer.current = window.setTimeout(() => setActive(index), 90);
  };

  const openNow = (index: number) => {
    clear();
    setActive(index);
  };

  useEffect(() => clear, []);

  // Scrolling moves through the panels. A panel chosen by hand stays open until the
  // scroll reaches the next one.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const outer = wrap.current;
      const pin = stage.current;
      if (!outer || !pin) return;
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const travel = outer.offsetHeight - pin.offsetHeight;
      const progress =
        travel > 0
          ? Math.min(1, Math.max(0, (pinTop - outer.getBoundingClientRect().top) / travel))
          : 0;
      const index = Math.round(progress * last);
      if (index !== scrollIndex.current) {
        scrollIndex.current = index;
        setActive(index);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame = requestAnimationFrame(measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [last]);

  // The panels slide in one after another the first time the section is reached.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      aria-labelledby="stage-heading"
      className="text-cream"
    >
      <h2 id="stage-heading" className="sr-only">
        What I do
      </h2>
      <div className="lg:hidden">
        <ChapterStage
          id="what-i-do-cards"
          label="What I do"
          chapters={panels.map((panel) => (
            <ServiceFit key={panel.slug} panel={panel} />
          ))}
          cues={wideCues}
          shortCues={phoneCues}
          skipTo={skipTo}
          stepSvh={70}
        />
      </div>

      <div
        ref={wrap}
        className="stage-wrap relative hidden [--hdr:81px] md:[--hdr:97px] lg:block"
        style={{ height: `calc(100svh - var(--hdr) + ${last * SEGMENT_SVH}svh)` }}
      >
        <div
          ref={stage}
          className="stage-pin sticky top-[var(--hdr)] flex h-[calc(100svh-var(--hdr))] flex-col"
        >
          <div className="container-edge flex min-h-0 flex-1 flex-col gap-3 py-4 md:gap-4 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <SectionLabel label="What I do" tone="cream" />
              <div className="flex items-center gap-4">
                <span className="font-mono-label shrink-0 text-[11px] text-cream-70">
                  {String(active + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                </span>
                <a
                  href={skipTo}
                  className="font-mono-label border border-cream/30 px-3 py-1.5 text-[11px] text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  Skip ↓
                </a>
              </div>
            </div>
            <p className="font-mono-label text-[11px] text-cream-70">
              <span className="hidden [@media(hover:hover)]:inline">
                Scroll through, or hover a panel to open it
              </span>
              <span className="[@media(hover:hover)]:hidden">
                Scroll through, or tap a panel to open it
              </span>
            </p>

            <div
              className={`stage-panels flex min-h-0 flex-1 flex-col gap-2 lg:flex-row ${
                seen ? "stage-in" : "opacity-0"
              }`}
            >
              {panels.map((panel, i) => {
                const isActive = i === active;
                const tone = tones[panel.tone];

                return (
                  <div
                    key={panel.slug}
                    onMouseEnter={() => openSoon(i)}
                    onMouseLeave={clear}
                    className={`group/panel relative min-h-0 overflow-hidden rounded-3xl backdrop-blur-md transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${tone.box} ${
                      isActive ? "flex-[1_1_0%]" : "flex-[0_0_3.25rem] lg:flex-[0_0_5.5rem]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => openNow(i)}
                      onFocus={() => openNow(i)}
                      aria-expanded={isActive}
                      tabIndex={isActive ? -1 : 0}
                      className={`absolute inset-0 z-10 flex items-center gap-4 px-5 text-left transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:px-0 lg:py-6 lg:pl-6 ${
                        isActive ? "pointer-events-none opacity-0" : "opacity-100"
                      }`}
                    >
                      <span className="font-mono-label text-[11px]">{panel.number}</span>
                      <span className="font-display text-xl font-medium lg:text-2xl lg:[writing-mode:vertical-rl]">
                        {panel.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="nudge ml-auto text-xl leading-none lg:hidden"
                      >
                        +
                      </span>
                    </button>

                    <div
                      inert={!isActive}
                      className={`absolute inset-0 flex gap-8 p-5 transition-opacity duration-500 sm:p-8 lg:p-10 ${
                        isActive ? "opacity-100 delay-500" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-y-auto pr-1 lg:max-w-[36rem]">
                        <div>
                          <span className="font-mono-label text-[11px]">{panel.number}</span>
                          <h3 className="font-display mt-2 text-4xl font-medium leading-[1.02] sm:text-5xl">
                            {panel.title}
                          </h3>
                          <p
                            className={`mt-3 max-w-md text-sm leading-relaxed sm:text-base ${tone.muted}`}
                          >
                            {panel.blurb}
                          </p>
                        </div>

                        <ul className={`mt-auto border-t ${tone.rule}`}>
                          {panel.items.map((item, k) => (
                            <li
                              key={item.label}
                              className={`border-b transition-[opacity,transform] duration-500 ${tone.rule} ${
                                isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                              }`}
                              style={{ transitionDelay: isActive ? `${650 + k * 90}ms` : "0ms" }}
                            >
                              <Link
                                href={item.href}
                                className="group/item flex items-center justify-between gap-4 py-3 transition-[padding] duration-300 hover:pl-2 sm:py-3.5"
                              >
                                <span className="font-display text-xl font-medium sm:text-2xl">
                                  {item.label}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="transition-transform duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-1"
                                >
                                  ↗
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={panel.cta.href}
                          className="font-mono-label underline-hover self-start pb-1 text-[11px]"
                        >
                          {panel.cta.label} →
                        </Link>
                      </div>

                      <div className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
                        <Exhibit exhibit={panel.exhibit} />
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 z-20 border-2 border-transparent transition-colors duration-300 ${tone.glow}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
