import type { ReactNode } from "react";
import Link from "next/link";
import ReelPane from "./ReelPane";
import type { HeroScene } from "@/lib/heroScenes";

type Side = "trades" | "creative";

const tone: Record<
  Side,
  { dot: string; accent: string; cta: string; glow: string }
> = {
  trades: {
    dot: "bg-cream-3",
    accent: "text-[#f1e3b0]",
    cta: "bg-cream text-ink hover:bg-white hover:shadow-[0_0_0_4px_rgba(236,226,200,0.25),0_18px_32px_-14px_rgba(0,0,0,0.8)]",
    glow: "from-[#8a9a52]/30",
  },
  creative: {
    dot: "bg-signal",
    accent: "text-signal-soft",
    cta: "bg-signal text-ink hover:bg-signal-soft hover:shadow-[0_0_0_4px_rgba(228,87,46,0.35),0_18px_32px_-14px_rgba(0,0,0,0.8)]",
    glow: "from-signal/30",
  },
};

// One half of the story on the home page: a question, a few honest lines, one proof point
// and one way in, beside a framed flick-through of the scenes that belong to it.
export default function Chapter({
  side,
  eyebrow,
  title,
  body,
  pills,
  proof,
  cta,
  link,
  scenes,
  flip = false,
}: {
  side: Side;
  eyebrow: string;
  title: ReactNode;
  body: string;
  pills: string[];
  proof: { text: string; live?: boolean };
  cta: { label: string; href: string };
  link: { label: string; href: string };
  scenes: HeroScene[];
  flip?: boolean;
}) {
  const t = tone[side];

  return (
    <div className="container-edge grid h-full content-center items-center gap-6 pb-28 pt-[calc(var(--hdr)+0.5rem)] md:grid-cols-12 md:gap-14 md:pb-24">
      <div className={`order-2 md:col-span-6 ${flip ? "md:order-2" : "md:order-1"}`}>
        <p className="font-mono-label flex items-center gap-2.5 text-[11px] text-cream/75">
          <span className={`h-2 w-2 rounded-full ${t.dot}`} aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-[clamp(2.1rem,4.9vw,4.5rem)] font-light leading-[1] tracking-[-0.04em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)] md:mt-5">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/80 md:mt-6 md:text-base">
          {body}
        </p>

        <ul className="mt-5 hidden flex-wrap gap-2 md:flex" aria-label="What's included">
          {pills.map((pill) => (
            <li
              key={pill}
              className="font-mono-label rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[11px] text-cream/90 backdrop-blur-sm"
            >
              {pill}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex items-center gap-2.5 text-sm text-cream/70">
          {proof.live && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
          )}
          {proof.text}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-8">
          <Link
            href={cta.href}
            className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] ${t.cta}`}
          >
            {cta.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </Link>
          <Link
            href={link.href}
            className="group inline-flex min-h-8 items-center gap-1.5 text-sm text-cream/85 transition-colors hover:text-white"
          >
            {link.label}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className={`order-1 md:col-span-6 ${flip ? "md:order-1" : "md:order-2"}`}>
        <div
          className={`relative mx-auto h-[24svh] min-h-[9.5rem] w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:h-[min(64svh,34rem)] md:rounded-[2.25rem] ${
            flip ? "md:ml-0" : "md:mr-0 md:ml-auto"
          }`}
        >
          <ReelPane
            scenes={scenes}
            direction={side === "trades" ? "up" : "down"}
            italic={side === "creative"}
            startDelay={side === "creative" ? 900 : 0}
          />
          <span
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.glow} via-transparent to-transparent`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
