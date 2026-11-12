import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import { Exhibit, tones } from "./ServiceParts";
import type { StagePanel } from "@/lib/data";

// One service as a single card that fits the screen, for the pinned phone sequence on the
// home page. Its picture takes a share of the screen height, so the whole card stays
// between the header and the bottom controls on any iPhone.
export function ServiceFit({ panel }: { panel: StagePanel }) {
  const tone = tones[panel.tone];

  return (
    <div className="container-edge flex h-full flex-col justify-center pb-[calc(var(--chrome)+0.5rem)] pt-[calc(var(--hdr)+0.75rem)]">
      <article className={`flex shrink-0 flex-col gap-3 overflow-hidden rounded-3xl p-4 sm:p-6 ${tone.box}`}>
        <div className="h-[clamp(4rem,15svh,12rem)] shrink-0">
          <Exhibit exhibit={panel.exhibit} compact />
        </div>

        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono-label text-[11px]">{panel.number}</span>
            <h3 className="font-display text-[clamp(1.5rem,6.4vw,1.875rem)] font-medium leading-none sm:text-3xl">
              {panel.title}
            </h3>
          </div>
          <p
            className={`mt-2 text-sm leading-snug ${tone.muted} [@media(max-height:640px)]:hidden`}
          >
            {panel.blurb}
          </p>
        </div>

        <ul className={`border-t ${tone.rule}`}>
          {panel.items.map((item) => (
            <li key={item.label} className={`border-b ${tone.rule}`}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 py-2 active:opacity-70 [@media(min-height:640px)]:py-2.5"
              >
                <span className="font-display text-lg font-medium leading-tight">{item.label}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={panel.cta.href}
          className="font-mono-label underline-hover inline-flex min-h-8 items-center self-start text-[11px]"
        >
          {panel.cta.label} →
        </Link>
      </article>
    </div>
  );
}

// The Services page version: every service is already open, one after another down the
// page. Nothing is pinned and nothing needs scrolling to open; each card simply rises into
// place as it reaches the screen, with its list following a beat behind.
export function ServiceFlow({ panels }: { panels: StagePanel[] }) {
  return (
    <section id="what-i-do" aria-labelledby="flow-heading" className="py-12 md:py-20">
      <h2 id="flow-heading" className="sr-only">
        What I do
      </h2>
      <div className="container-edge flex flex-col gap-4 md:gap-6">
        {panels.map((panel) => {
          const tone = tones[panel.tone];

          return (
            <RevealOnScroll key={panel.slug} className="group/reveal">
              <article
                id={`group-${panel.slug}`}
                className={`grid scroll-mt-24 gap-6 overflow-hidden rounded-3xl p-5 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-12 ${tone.box}`}
              >
                <div className="h-48 sm:h-60 lg:order-2 lg:h-80">
                  <Exhibit exhibit={panel.exhibit} compact />
                </div>

                <div className="lg:order-1">
                  <span className="font-mono-label text-[11px]">{panel.number}</span>
                  <h3 className="font-display mt-2 text-4xl font-medium leading-[1.02] sm:text-5xl">
                    {panel.fullTitle ?? panel.title}
                  </h3>
                  <p className={`mt-3 max-w-md text-base leading-relaxed ${tone.muted}`}>
                    {panel.blurb}
                  </p>

                  {panel.scope ? (
                    <>
                      <ul className={`mt-6 grid gap-x-6 gap-y-2.5 border-t pt-5 sm:grid-cols-2 ${tone.rule}`}>
                        {panel.scope.map((line, k) => (
                          <li
                            key={line}
                            className="flex translate-y-3 gap-3 text-sm leading-relaxed opacity-0 transition-[opacity,transform] duration-700 group-[.is-visible]/reveal:translate-y-0 group-[.is-visible]/reveal:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                            style={{ transitionDelay: `${300 + k * 60}ms` }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-cream/80"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                      {panel.note && (
                        <p
                          className={`mt-6 max-w-lg border-l-2 border-cream/40 pl-4 text-sm leading-relaxed ${tone.muted}`}
                        >
                          {panel.note}
                        </p>
                      )}
                    </>
                  ) : (
                  <ul className={`mt-6 border-t ${tone.rule}`}>
                    {panel.items.map((item, k) => (
                      <li
                        key={item.label}
                        className={`border-b ${tone.rule} translate-y-3 opacity-0 transition-[opacity,transform] duration-700 group-[.is-visible]/reveal:translate-y-0 group-[.is-visible]/reveal:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
                        style={{ transitionDelay: `${350 + k * 100}ms` }}
                      >
                        <Link
                          href={item.href}
                          className="group/item flex items-center justify-between gap-4 py-3.5 transition-[padding,opacity] duration-300 hover:pl-2 active:opacity-70"
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
                  )}

                  <Link
                    href={panel.cta.href}
                    className="font-mono-label underline-hover mt-5 inline-flex min-h-8 items-center text-[11px]"
                  >
                    {panel.cta.label} →
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
