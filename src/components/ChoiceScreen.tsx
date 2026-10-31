import Link from "next/link";
import RiseText from "./RiseText";

const delay = (ms: number) => ({ animationDelay: `calc(var(--intro-delay, 0s) + ${ms}ms)` });

const chip = "font-mono-label border px-3 py-1.5 text-[11px]";

// Sizes follow the shorter of width and height so both questions fit on one screen.
const question =
  "font-display max-w-xl text-balance text-[clamp(1.75rem,min(8vw,5vh),2.4rem)] font-medium leading-[1.04] md:text-[clamp(2.25rem,min(8vh,5.2vw),4.5rem)]";

const half =
  "group relative flex flex-1 flex-col justify-end gap-6 px-6 transition-[flex-grow] duration-500 motion-reduce:transition-none sm:px-10 md:justify-between md:px-12 md:py-[clamp(2rem,6vh,3.5rem)] md:hover:flex-[1.15] lg:px-16";

const italic = "italic text-signal";

// The opening screen after the entrance: one clear question, two ways in.
export default function ChoiceScreen() {
  return (
    <section
      aria-labelledby="choice-heading"
      className="flex min-h-[calc(100svh-8.5rem)] flex-col border-b border-line"
    >
      <h1 id="choice-heading" className="sr-only">
        JMB Social: websites, short-form video and ads for local businesses, and content for
        models, artists and athletes
      </h1>

      <div className="flex flex-1 flex-col md:flex-row">
        <Link href="/local-business" className={`${half} bg-cream-2 pb-12 pt-8`}>
          <span
            className="hero-reveal font-mono-label hidden text-[11px] text-ink-70 md:inline"
            style={delay(100)}
          >
            Local business
          </span>
          <div>
            <h2 className={`${question} text-ink`}>
              <RiseText
                baseDelay={250}
                words={["Run", "a", "trade,", "shop", "or", "workshop?"]}
              />
            </h2>
            <div className="hero-reveal" style={delay(650)}>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-ink-70 sm:text-lg md:mt-5">
                A website that&rsquo;s easy to find and easy to call from, Reels people actually
                watch, and ads that look the part.
              </p>
              <ul className="mt-6 hidden flex-wrap gap-2 sm:flex" aria-label="What's included">
                {["Websites", "Reels", "Ads"].map((item) => (
                  <li key={item} className={`${chip} border-ink/30 text-ink`}>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="font-mono-label relative isolate mt-5 inline-flex items-center gap-2.5 overflow-hidden bg-green px-7 py-3.5 text-[11px] text-cream transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-signal before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-ink group-hover:shadow-[0_18px_32px_-14px_rgba(28,27,22,0.6)] group-hover:before:scale-x-100 motion-reduce:transition-none md:mt-8 md:py-4">
                Yes, that&rsquo;s me{" "}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>

        <div className="relative z-10 h-0 w-full md:h-auto md:w-0" aria-hidden="true">
          <span
            className="pop font-display absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 bg-cream text-xl italic text-ink md:h-20 md:w-20 md:text-3xl"
          >
            or
          </span>
        </div>

        <Link
          href="/creative"
          className={`${half} grain overflow-hidden bg-green-deep pb-8 pt-12 text-cream`}
        >
          <span
            className="hero-reveal font-mono-label relative hidden items-center gap-2.5 text-[11px] text-cream-70 md:flex"
            style={delay(100)}
          >
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Fashion, music &amp; sport
          </span>
          <div className="relative">
            <h2 className={question}>
              <RiseText
                baseDelay={400}
                words={[
                  "Building",
                  "a",
                  "name",
                  "in",
                  { text: "fashion,", className: italic },
                  { text: "music", className: italic },
                  "or",
                  { text: "sport?", className: italic },
                ]}
              />
            </h2>
            <div className="hero-reveal" style={delay(800)}>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-cream-70 sm:text-lg md:mt-5">
                Portfolio sites, content and Instagram help for models, artists and athletes who
                want to be seen properly.
              </p>
              <ul className="mt-6 hidden flex-wrap gap-2 sm:flex" aria-label="What's included">
                {["Portfolios", "Content", "Instagram"].map((item) => (
                  <li key={item} className={`${chip} border-cream/30 text-cream`}>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="font-mono-label relative isolate mt-5 inline-flex items-center gap-2.5 overflow-hidden bg-signal px-7 py-3.5 text-[11px] text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-cream before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_18px_32px_-14px_rgba(0,0,0,0.7)] group-hover:before:scale-x-100 motion-reduce:transition-none md:mt-8 md:py-4">
                Yes, that&rsquo;s me{" "}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </Link>
      </div>

      <p className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-line px-6 py-3.5">
        <Link
          href="/contact"
          className="font-mono-label underline-hover text-[11px] text-ink-70 hover:text-ink"
        >
          <span className="sm:hidden">Not sure? Message me →</span>
          <span className="hidden sm:inline">Not sure which one is you? Message me →</span>
        </Link>
        <Link
          href="/services"
          className="font-mono-label underline-hover hidden text-[11px] text-ink-70 hover:text-ink sm:inline"
        >
          Every service and price →
        </Link>
      </p>
    </section>
  );
}
