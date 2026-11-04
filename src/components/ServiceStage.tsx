"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "./SectionLabel";
import type { StagePanel } from "@/lib/data";

// How much scrolling (in screen heights) each service gets while the section is pinned.
const SEGMENT_SVH = 55;

const tones: Record<
  StagePanel["tone"],
  { box: string; muted: string; rule: string; glow: string }
> = {
  green: {
    box: "border border-white/12 bg-[linear-gradient(135deg,rgba(130,150,76,0.3),rgba(255,255,255,0.04))] text-cream",
    muted: "text-cream/75",
    rule: "border-cream/15",
    glow: "group-hover/panel:border-cream/45 group-hover/panel:bg-white/10",
  },
  deep: {
    box: "border border-white/12 bg-[linear-gradient(135deg,rgba(78,98,52,0.32),rgba(255,255,255,0.03))] text-cream",
    muted: "text-cream/75",
    rule: "border-cream/15",
    glow: "group-hover/panel:border-cream/45 group-hover/panel:bg-white/10",
  },
  khaki: {
    box: "border border-white/12 bg-[linear-gradient(135deg,rgba(222,190,104,0.3),rgba(255,255,255,0.04))] text-cream",
    muted: "text-cream/75",
    rule: "border-cream/15",
    glow: "group-hover/panel:border-cream/45 group-hover/panel:bg-white/10",
  },
  signal: {
    box: "border border-white/12 bg-[linear-gradient(135deg,rgba(228,87,46,0.4),rgba(255,255,255,0.04))] text-cream",
    muted: "text-cream/80",
    rule: "border-cream/20",
    glow: "group-hover/panel:border-cream/50 group-hover/panel:bg-white/10",
  },
};

function Exhibit({ exhibit }: { exhibit: StagePanel["exhibit"] }) {
  if (exhibit.kind === "image") {
    return (
      <figure className="w-full max-w-md">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)]"
          style={{ aspectRatio: exhibit.aspect }}
        >
          <Image
            src={exhibit.src}
            alt={exhibit.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 0px"
            className="object-cover"
          />
        </div>
        <figcaption className="font-mono-label mt-3 text-[11px] opacity-80">
          {exhibit.caption}
        </figcaption>
      </figure>
    );
  }

  if (exhibit.kind === "brand") {
    const formats = [
      { label: "1:1 Square", w: 56, h: 56 },
      { label: "4:5 Feed", w: 56, h: 70 },
      { label: "9:16 Story", w: 44, h: 78 },
    ];
    const swatches = [
      { name: "Olive", hex: "#333d22" },
      { name: "Khaki", hex: "#d6c795" },
      { name: "Cream", hex: "#ece2c8" },
      { name: "Ember", hex: "#e4572e" },
    ];
    return (
      <figure className="w-full max-w-md">
        <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm">
          <p className="font-mono-label text-[10px] text-cream/70">Ad formats</p>
          <div className="mt-4 flex items-end gap-5">
            {formats.map((format) => (
              <div key={format.label} className="flex flex-col items-start gap-2">
                <span
                  className="block rounded-md border border-cream/60 bg-white/[0.08]"
                  style={{ width: format.w, height: format.h }}
                />
                <span className="font-mono-label text-[10px] text-cream/75">{format.label}</span>
              </div>
            ))}
          </div>

          <p className="font-mono-label mt-7 text-[10px] text-cream/70">Brand kit</p>
          <ul className="mt-4 grid grid-cols-4 gap-3">
            {swatches.map((swatch) => (
              <li key={swatch.name} className="flex flex-col gap-2">
                <span
                  className="block h-12 rounded-xl border border-white/20"
                  style={{ background: swatch.hex }}
                />
                <span className="font-mono-label text-[10px] text-cream/75">{swatch.name}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-baseline gap-3 leading-none text-cream">
            <span className="font-display text-5xl font-medium">Aa</span>
            <span className="font-sans text-3xl font-light">Aa</span>
          </p>
        </div>
        <figcaption className="font-mono-label mt-3 text-[11px] opacity-80">
          {exhibit.caption}
        </figcaption>
      </figure>
    );
  }

  if (exhibit.kind === "stat") {
    return (
      <div className="max-w-xs">
        <p className="font-display text-8xl font-medium leading-none">{exhibit.value}</p>
        <p className="font-mono-label mt-4 max-w-[16rem] text-[11px] leading-relaxed opacity-80">
          {exhibit.label}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xs rounded-2xl border border-white/25 bg-white/[0.06] p-6">
      <p className="font-mono-label text-[11px]">{exhibit.label}</p>
      <p className="font-display mt-4 text-2xl font-medium leading-snug">{exhibit.text}</p>
    </div>
  );
}

// Services as side-by-side panels. The section holds still for a short while and opens one
// panel after another as the page scrolls; hovering (or tapping, or tabbing to) a panel
// opens it straight away, and Skip jumps past the whole thing.
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
      <div
        ref={wrap}
        className="stage-wrap relative [--hdr:81px] md:[--hdr:97px]"
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
