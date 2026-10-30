import Link from "next/link";
import { Button } from "./Button";
import { siteConfig } from "@/lib/data";

const delay = (ms: number) => ({ animationDelay: `calc(var(--intro-delay, 0s) + ${ms}ms)` });

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-edge pb-16 pt-14 md:pb-24 md:pt-20">
        <div
          className="hero-reveal flex flex-col gap-3 font-mono-label text-xs text-ink-70 sm:flex-row sm:items-center sm:gap-4"
          style={delay(0)}
        >
          <span>JMB / 001</span>
          <span className="hidden h-px w-8 bg-ink-70 sm:block" aria-hidden="true" />
          <span>{siteConfig.descriptor}</span>
          <span className="hidden h-px w-8 bg-ink-70 sm:block" aria-hidden="true" />
          <span>
            {siteConfig.location} / {siteConfig.foundedYear}
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <h1 className="font-display text-[13vw] font-medium leading-[0.98] tracking-tight text-ink sm:text-[9vw] md:col-span-8 md:text-[5.4vw] lg:text-[76px]">
            Make your business impossible to ignore.
          </h1>

          <div
            className="hero-reveal flex flex-col justify-end gap-8 md:col-span-4"
            style={delay(180)}
          >
            <p className="max-w-sm text-lg leading-relaxed text-ink-70">
              {siteConfig.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="secondary">
                See our work
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-reveal mt-14 md:mt-20" style={delay(300)}>
          <p className="font-mono-label text-[11px] text-ink-70">Choose your path</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Link
              href="#work"
              className="group flex min-h-[15rem] flex-col justify-between gap-10 border border-ink/25 bg-cream-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink sm:p-9"
            >
              <span className="font-mono-label text-[11px] text-ink-70">01 · Local business</span>
              <div>
                <h2 className="font-display max-w-md text-3xl font-medium leading-[1.08] text-ink sm:text-4xl">
                  Websites, Reels and ads for trades, shops and workshops.
                </h2>
                <span className="font-mono-label mt-6 inline-flex items-center gap-2 text-[11px] text-ink transition-all duration-300 group-hover:gap-3">
                  See the work <span aria-hidden="true">↓</span>
                </span>
              </div>
            </Link>

            <Link
              href="/creative"
              className="group relative flex min-h-[15rem] flex-col justify-between gap-10 overflow-hidden bg-green-deep p-7 text-cream transition-all duration-300 hover:-translate-y-1 sm:p-9"
            >
              <span className="font-mono-label flex items-center gap-2.5 text-[11px] text-cream-70">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                02 · Fashion, music &amp; sport
              </span>
              <div>
                <h2 className="font-display max-w-md text-3xl font-medium leading-[1.08] sm:text-4xl">
                  Content and portfolios for the <em className="text-signal">creative</em> side.
                </h2>
                <span className="font-mono-label mt-6 inline-flex items-center gap-2 text-[11px] text-signal transition-all duration-300 group-hover:gap-3">
                  Enter the creative side <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
          <p className="mt-6">
            <Link
              href="/services"
              className="font-mono-label underline-hover text-[11px] text-ink-70 hover:text-ink"
            >
              Every service and price, including apps, AI, ads &amp; SEO →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
