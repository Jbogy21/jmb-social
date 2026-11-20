import Link from "next/link";
import GlowField from "./GlowField";
import HeroClips from "./HeroClips";
import ScrollCue from "./ScrollCue";
import { serviceFamilies, cadenceLabel, heroClips, wheelersReelsTotal } from "@/lib/data";

const delay = (ms: number) => ({ animationDelay: `calc(var(--intro-delay, 0s) + ${ms}ms)` });

const findVariant = (name: string) => {
  for (const family of serviceFamilies) {
    const variant = family.variants.find((v) => v.name === name);
    if (variant) return variant;
  }
  return null;
};

const priceRows = [
  { title: "Websites", detail: "Business website", name: "Business website" },
  { title: "Content & Reels", detail: "Short-form content engine", name: "Short-form content engine" },
  { title: "Ads", detail: "Meta Ads (Facebook & Instagram)", name: "Meta Ads (Facebook & Instagram)" },
];

const features = [
  "Real work for real local businesses",
  "Fast, mobile-first websites",
  `Reels with ${wheelersReelsTotal} combined views`,
  "Starting prices shown up front",
  "You deal with me directly",
];

// The first screen: who JMB Social is, in one calm frame. The "this or that" choice
// follows as soon as you scroll.
export default function HomeHero() {
  return (
    <section className="relative isolate -mt-[81px] flex min-h-[calc(100svh-3.1rem)] flex-col overflow-hidden bg-[#1a2013] pt-[81px] text-cream md:-mt-[97px] md:min-h-[calc(100svh-2.4rem)] md:pt-[97px]">
      <GlowField />
      <HeroClips clips={heroClips} />

      <div className="container-edge relative z-10 flex flex-1 flex-col justify-between gap-10 pb-6 pt-8 md:pt-10">
        <div className="flex items-start justify-between gap-6">
          <p
            className="hero-reveal font-mono-label flex items-center gap-2.5 text-[11px] text-cream/80"
            style={delay(150)}
          >
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            JMB Social<span className="max-sm:hidden"> · Digital Studio</span> · UK
          </p>
        </div>

        <div className="pointer-events-none absolute right-6 top-4 hidden md:right-10 md:block xl:right-16">
          <div
            className="hero-reveal pointer-events-auto w-[20.5rem] rounded-[1.75rem] border border-white/20 bg-white/10 p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl [@media(max-height:800px)]:hidden"
            style={delay(300)}
          >
            <span className="mx-auto mb-3 block h-1 w-14 rounded-full bg-white/80" aria-hidden="true" />
            <p className="font-mono-label px-2 pb-3 text-[10px] text-cream/75">
              Starting prices · introductory rates
            </p>
            <ul className="flex flex-col gap-2">
              {priceRows.map((row) => {
                const variant = findVariant(row.name);
                if (!variant) return null;
                return (
                  <li key={row.title} className="rounded-2xl bg-white/10 p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-medium text-cream">{row.title}</p>
                        <p className="mt-0.5 text-xs text-cream/70">{row.detail}</p>
                      </div>
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] text-cream/90">
                        {cadenceLabel[variant.cadence]}
                      </span>
                    </div>
                    <p className="mt-2 text-[1.7rem] font-light leading-none tracking-tight text-cream">
                      <span className="mr-2 text-xs font-normal text-cream/65">From</span>
                      {variant.price}
                    </p>
                    <span
                      className="mt-3 block h-2 opacity-60"
                      style={{
                        background:
                          "repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 6px)",
                      }}
                      aria-hidden="true"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="font-sans text-[clamp(3rem,8.2vw,8rem)] font-light leading-[0.94] tracking-[-0.045em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)]">
              <span className="block">Be impossible</span>
              <span className="font-display block font-normal italic tracking-[-0.03em] text-[#f1e3b0]">
                to ignore.
              </span>
            </h1>
            <p
              className="hero-reveal mt-6 max-w-md text-base leading-relaxed text-cream [text-shadow:0_1px_2px_rgba(10,12,8,0.55),0_2px_22px_rgba(10,12,8,0.75)]"
              style={delay(450)}
            >
              Websites, creative direction and digital support for local businesses, brands and
              emerging talent. I&rsquo;m Jackson, and I do the work myself.
            </p>
          </div>

          <div
            className="hero-reveal flex flex-wrap items-center gap-5 max-md:pr-16 md:col-span-4 md:justify-end"
            style={delay(600)}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97]"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            <ScrollCue href="#chapters" label="Scroll to choose your side" />
          </div>
        </div>

        <ul className="hidden grid-cols-5 gap-6 border-t border-white/25 pt-5 md:grid lg:pr-40">
          {features.map((text, index) => (
            <li
              key={text}
              className="hero-reveal flex flex-col gap-3 text-[13px] leading-snug text-cream/65 first:text-cream"
              style={delay(750 + index * 90)}
            >
              <span className="font-mono-label text-[10px] opacity-80">0{index + 1}</span>
              {text}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
