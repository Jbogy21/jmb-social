import { christmasOffer, christmasPrice, pressOffer as offer, siteConfig } from "@/lib/data";
import RevealOnScroll from "./RevealOnScroll";
import ScrollLine from "./ScrollLine";
import SectionLabel from "./SectionLabel";
import { Button } from "./Button";

// "Press kit and introductions" on the Creative page: a press kit, a researched list of
// contacts and pitch drafts. It is design and research work, so the section says plainly
// what it is not (no promised replies, coverage or paid work, no agent or manager role).
// Everything comes from `pressOffer` in src/lib/data.ts.
export default function PressOffer({ index = "04" }: { index?: string }) {
  const discounted = christmasPrice(offer.price);
  const whatsappHref = `${siteConfig.whatsappHref.split("?")[0]}?text=${encodeURIComponent(offer.whatsappMessage)}`;

  return (
    <section
      id="press"
      aria-labelledby="press-heading"
      className="ember-glow-l relative scroll-mt-20 border-b border-white/10 py-24 md:py-32"
    >
      <div className="container-edge grid gap-14 lg:grid-cols-12 lg:gap-16">
        <RevealOnScroll className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={index} label={offer.eyebrow} />
            <h2
              id="press-heading"
              className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl lg:text-6xl"
            >
              {offer.headline}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-70">{offer.intro}</p>

            <p className="mt-8 max-w-lg text-sm leading-relaxed text-fg-70">
              <span className="font-mono-label mr-2 text-[11px] text-fg">{offer.whoForTitle}</span>
              {offer.whoFor}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg-70">{offer.alongside}</p>

            <div className="mt-10 border-t border-white/12 pt-8">
              <p className="font-mono-label text-[11px] text-fg-70">Price</p>
              {discounted ? (
                <p className="font-display mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium leading-tight text-fg">
                  <span className="sr-only">Was </span>
                  <s className="text-2xl text-fg-70 decoration-signal decoration-2">{offer.price}</s>
                  <span aria-hidden="true" className="text-2xl text-signal">
                    →
                  </span>
                  <span className="sr-only">now </span>
                  <span className="text-5xl">{discounted}</span>
                  <span className="font-mono-label rounded-full border border-signal/60 px-3 py-1.5 text-[11px]">
                    {christmasOffer.discount} off · Christmas offer
                  </span>
                </p>
              ) : (
                <p className="font-display mt-2 text-3xl font-medium leading-tight text-fg">
                  {offer.price ?? offer.priceFallback}
                </p>
              )}
              {offer.price && (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-70">{offer.priceDetail}</p>
              )}
              {discounted && (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-70">
                  {christmasOffer.discount} off for first-time clients who book by{" "}
                  {christmasOffer.endsLabel}.
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button href="/contact?for=press" variant="signal" className="w-full justify-center text-center sm:w-auto">
                  {offer.ctaLabel}
                </Button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message on WhatsApp about the press kit and introductions pack"
                  className="font-mono-label inline-flex items-center rounded-full border border-cream/30 px-7 py-4 text-[11px] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink active:scale-[0.97] w-full justify-center text-center sm:w-auto"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="lg:col-span-7">
          <h3 className="sr-only">What the pack includes</h3>
          <ScrollLine className="relative pl-12 sm:pl-16">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[15px] top-6 w-px bg-white/15 sm:left-[19px]"
            />
            <span
              aria-hidden="true"
              className="scroll-line-v absolute bottom-6 left-[14px] top-6 w-[3px] rounded-full bg-gradient-to-b from-signal to-signal-soft sm:left-[18px]"
            />
            <ol className="flex flex-col gap-4">
              {offer.included.map((item, position) => (
                <li key={item.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="font-mono-label absolute -left-12 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-signal bg-[#130d0a] text-[11px] text-cream sm:-left-16 sm:h-10 sm:w-10"
                  >
                    {position + 1}
                  </span>
                  <RevealOnScroll delay={position * 60}>
                    <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
                      <h4 className="font-display text-2xl font-medium leading-tight text-fg sm:text-3xl">
                        {item.title}
                      </h4>
                      <p className="mt-3 max-w-lg text-base leading-relaxed text-fg-70">{item.text}</p>
                    </div>
                  </RevealOnScroll>
                </li>
              ))}
            </ol>
          </ScrollLine>

          <RevealOnScroll className="mt-8">
            <div className="rounded-3xl border border-signal/50 bg-signal/[0.07] p-6 sm:p-8">
              <h3 className="font-mono-label text-[11px] text-fg">{offer.notTitle}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {offer.notIncluded.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-fg-70">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8">
            <h3 className="font-mono-label text-[11px] text-fg">How it works</h3>
            <ol className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-5">
              {offer.steps.map((step, position) => (
                <li key={step.title} className="border-t border-fg/50 pt-4">
                  <span className="font-mono-label text-[11px] text-fg-70">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display mt-2 text-xl font-medium leading-snug text-fg">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-70">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-fg-70">{offer.note}</p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
