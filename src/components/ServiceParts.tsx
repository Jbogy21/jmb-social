import Image from "next/image";
import type { StagePanel } from "@/lib/data";

// Shared by the three ways the services are shown: the hover-to-open panels on wide
// screens, the pinned cards on phones, and the open flow on the Services page.

export const tones: Record<
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

// The picture (or number, or note) that goes with a service. `compact` fills a box of
// whatever height it is given, for phones; the full version is for the wide panels.
export function Exhibit({
  exhibit,
  compact = false,
}: {
  exhibit: StagePanel["exhibit"];
  compact?: boolean;
}) {
  if (exhibit.kind === "image") {
    if (compact) {
      return (
        <figure className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15">
          <Image
            src={exhibit.src}
            alt={exhibit.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="object-cover object-left-top"
          />
          <figcaption className="font-mono-label absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-black/65 px-2.5 py-1 text-[9px] text-cream">
            {exhibit.caption}
          </figcaption>
        </figure>
      );
    }
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
    if (compact) {
      return (
        <figure className="flex h-full w-full flex-col justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2.5">
          <div className="flex items-end gap-3">
            {formats.map((format) => (
              <span
                key={format.label}
                className="block rounded-[4px] border border-cream/60 bg-white/[0.08]"
                style={{ width: format.w * 0.4, height: format.h * 0.4 }}
              />
            ))}
            <span className="font-mono-label text-[9px] leading-none text-cream/75">
              Square · Feed · Story
            </span>
          </div>
          <ul className="grid grid-cols-4 gap-2">
            {swatches.map((swatch) => (
              <li key={swatch.name} className="flex flex-col gap-1">
                <span
                  className="block h-4 rounded-md border border-white/20"
                  style={{ background: swatch.hex }}
                />
                <span className="font-mono-label text-[9px] leading-none text-cream/75">
                  {swatch.name}
                </span>
              </li>
            ))}
          </ul>
        </figure>
      );
    }
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
    if (compact) {
      return (
        <div className="flex h-full w-full flex-col justify-center gap-1.5 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.06] px-5">
          <p className="font-display text-[clamp(2rem,8vh,3.4rem)] font-medium leading-none">
            {exhibit.value}
          </p>
          <p className="font-mono-label text-[9px] leading-snug opacity-85">{exhibit.label}</p>
        </div>
      );
    }
    return (
      <div className="max-w-xs">
        <p className="font-display text-8xl font-medium leading-none">{exhibit.value}</p>
        <p className="font-mono-label mt-4 max-w-[16rem] text-[11px] leading-relaxed opacity-80">
          {exhibit.label}
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/25 bg-white/[0.06] px-4">
        <p className="font-mono-label text-[9px]">{exhibit.label}</p>
        <p className="font-display mt-1.5 line-clamp-3 text-[15px] font-medium leading-snug">
          {exhibit.text}
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
