"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionLabel from "./SectionLabel";
import type { StagePanel } from "@/lib/data";

const tones: Record<
  StagePanel["tone"],
  { box: string; muted: string; rule: string; glow: string }
> = {
  green: {
    box: "grain bg-green text-cream",
    muted: "text-cream-70",
    rule: "border-cream/20",
    glow: "group-hover/panel:border-cream/60 group-hover/panel:bg-white/10",
  },
  deep: {
    box: "grain bg-green-deep text-cream",
    muted: "text-cream-70",
    rule: "border-cream/20",
    glow: "group-hover/panel:border-cream/60 group-hover/panel:bg-white/10",
  },
  khaki: {
    box: "bg-cream-3 text-ink",
    muted: "text-ink-70",
    rule: "border-ink/20",
    glow: "group-hover/panel:border-ink/50 group-hover/panel:bg-black/5",
  },
  signal: {
    box: "grain bg-signal text-ink",
    muted: "text-ink",
    rule: "border-ink/25",
    glow: "group-hover/panel:border-ink/60 group-hover/panel:bg-black/5",
  },
};

function Exhibit({ exhibit }: { exhibit: StagePanel["exhibit"] }) {
  if (exhibit.kind === "image") {
    return (
      <figure className="w-full max-w-md">
        <div
          className="relative w-full overflow-hidden border border-black/10 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)]"
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
    <div className="max-w-xs border border-ink/40 p-6">
      <p className="font-mono-label text-[11px]">{exhibit.label}</p>
      <p className="font-display mt-4 text-2xl font-medium leading-snug">{exhibit.text}</p>
    </div>
  );
}

// Services as side-by-side panels: hovering (or tapping, or tabbing to) a panel opens it.
// It scrolls like any other section, so visitors can always carry on past it.
export default function ServiceStage({ panels }: { panels: StagePanel[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);

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

  return (
    <section
      aria-labelledby="stage-heading"
      className="border-b border-line py-16 sm:py-24 md:py-28"
    >
      <h2 id="stage-heading" className="sr-only">
        What I do
      </h2>
      <div className="container-edge">
        <div className="flex items-center justify-between gap-4">
          <SectionLabel label="What I do" />
          <p className="font-mono-label text-[11px] text-ink-70">
            <span className="hidden [@media(hover:hover)]:inline">Hover a panel to open it</span>
            <span className="[@media(hover:hover)]:hidden">Tap a panel to open it</span>
            <span className="ml-4">
              {String(active + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="mt-6 flex h-[42rem] flex-col gap-2 lg:h-[40rem] lg:flex-row">
          {panels.map((panel, i) => {
            const isActive = i === active;
            const tone = tones[panel.tone];

            return (
              <div
                key={panel.slug}
                onMouseEnter={() => openSoon(i)}
                onMouseLeave={clear}
                className={`group/panel relative min-h-0 overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${tone.box} ${
                  isActive ? "flex-[1_1_0%]" : "flex-[0_0_3.25rem] lg:flex-[0_0_5.5rem]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openNow(i)}
                  onFocus={() => openNow(i)}
                  aria-expanded={isActive}
                  aria-label={`${panel.title}${isActive ? "" : ": open"}`}
                  tabIndex={isActive ? -1 : 0}
                  className={`absolute inset-0 z-10 flex items-center gap-4 px-5 text-left transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-start lg:gap-8 lg:px-0 lg:py-6 lg:pl-6 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-mono-label text-[11px]">{panel.number}</span>
                  <span className="font-display text-xl font-medium lg:text-2xl lg:[writing-mode:vertical-rl]">
                    {panel.title}
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
                      <p className={`mt-3 max-w-md text-sm leading-relaxed sm:text-base ${tone.muted}`}>
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
    </section>
  );
}
