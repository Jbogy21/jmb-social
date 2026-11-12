import type { Metadata } from "next";
import Link from "next/link";
import {
  serviceFamilies,
  servicePillars,
  biggerBuildSlugs,
  cadenceLabel,
  stagePanels,
  type ServiceVariant,
} from "@/lib/data";
import { ServiceFlow } from "@/components/ServiceCards";
import SectionLabel from "@/components/SectionLabel";
import PageHero from "@/components/PageHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/Button";
import ServiceIcon from "@/components/ServiceIcon";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Services for local businesses and trades, for creative people and brands, and for digital builds. Clear starting prices, and apps and AI agents quoted per project.",
  alternates: { canonical: "/services" },
};

const pricingPrinciples = [
  {
    title: "Scoped up front",
    description:
      "After a short discovery call you receive a written scope, timeline and quote. The price is agreed before any work begins.",
  },
  {
    title: "Transparent by default",
    description:
      "No padding, no surprise line items. If something is outside scope we say so early and price it separately.",
  },
  {
    title: "Built to scale with you",
    description:
      "Start with a landing page or an audit, then grow into a platform, a programme or a retainer when the results justify it.",
  },
];

const allVariants = serviceFamilies.flatMap((family) => family.variants);
const findVariant = (name: string) => allVariants.find((variant) => variant.name === name);
const resolve = (names: string[]) =>
  names.map(findVariant).filter((variant): variant is ServiceVariant => Boolean(variant));

function VariantRow({ variant }: { variant: ServiceVariant }) {
  return (
    <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:gap-12 sm:py-7">
      <div>
        <h3 className="font-display text-2xl font-medium leading-tight text-fg">{variant.name}</h3>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-fg-70">{variant.description}</p>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 sm:block sm:min-w-28 sm:text-right">
        <p className="font-mono-label text-[11px] text-fg-50">
          {!/\d/.test(variant.price) ? "Price" : variant.price.includes("–") ? "Typically" : "From"}
        </p>
        <p className="font-display whitespace-nowrap text-2xl font-medium leading-none text-fg sm:text-3xl">
          {variant.price}
        </p>
        <p className="font-mono-label text-[11px] text-fg-50 sm:mt-1.5">
          {cadenceLabel[variant.cadence]}
        </p>
      </div>
    </li>
  );
}

export default function ServicesPage() {
  const biggerBuilds = biggerBuildSlugs
    .map((slug) => serviceFamilies.find((family) => family.slug === slug))
    .filter((family): family is NonNullable<typeof family> => Boolean(family));

  return (
    <>
      <PageHero>
        <div className="container-edge">
          <SectionLabel label="Services & pricing" tone="cream" />
          <h1 className="mt-6 max-w-4xl font-sans text-[clamp(2.6rem,6.4vw,5.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)]">
            Clear services. <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">Clear prices.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
            Services for local businesses and trades, for creative people and
            brands, and for digital builds that either can use. Starting prices
            are shown below, and bigger builds are quoted per project.
          </p>
          <p className="font-mono-label mt-6 inline-block rounded-full border border-white/30 px-4 py-2 text-[11px] text-cream/85">
            Introductory rates for new clients
          </p>

          <nav aria-label="Jump to a service" className="mt-12 flex flex-wrap gap-2.5">
            {stagePanels.map((panel) => (
              <Link
                key={panel.slug}
                href={`#group-${panel.slug}`}
                className="font-mono-label group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-[11px] text-cream backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream hover:text-ink"
              >
                {panel.title}
              </Link>
            ))}
            <Link
              href="#prices"
              className="font-mono-label inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-[11px] text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              Prices
            </Link>
            <Link
              href="#packages"
              className="font-mono-label inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-[11px] text-cream transition-colors duration-200 hover:bg-cream hover:text-ink"
            >
              Packages
            </Link>
          </nav>
        </div>
      </PageHero>

      <ServiceFlow panels={stagePanels} />

      <section id="prices" className="scroll-mt-24 border-t border-line pb-2 pt-20 md:pt-28">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel label="Prices & options" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Starting prices, agreed in writing before anything begins.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-70">
              Every figure below is an introductory starting point. The final price depends on the
              scope, and it is always confirmed up front.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {servicePillars.map((pillar) => {
        const headline = resolve(pillar.headline);
        const more = resolve(pillar.more);

        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className="scroll-mt-24 border-b border-line py-20 md:py-28"
          >
            {pillar.aliases?.map((alias) => (
              <span key={alias} id={alias} className="block scroll-mt-24" aria-hidden="true" />
            ))}
            <div className="container-edge grid gap-12 md:grid-cols-12 md:gap-10">
              <RevealOnScroll className="md:col-span-4">
                <div className="md:sticky md:top-32">
                  <span className="font-mono-label text-xs text-fg-50">{pillar.number}</span>
                  <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
                    {pillar.title}
                  </h2>
                  <p className="font-display mt-5 text-xl leading-snug text-fg">{pillar.tagline}</p>
                  <p className="mt-5 text-base leading-relaxed text-fg-70">{pillar.summary}</p>
                  {pillar.note && (
                    <p className="mt-5 border-l border-fg/30 pl-4 text-xs leading-relaxed text-fg-70">
                      {pillar.note}
                    </p>
                  )}
                  <div className="mt-8">
                    <Button href="/contact" variant="secondary" arrow>
                      Discuss {pillar.title.toLowerCase()}
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>

              <div className="md:col-span-8">
                <p className="font-mono-label pb-4 text-xs text-fg-50">Options &amp; starting prices</p>
                <ul className="border-t border-line">
                  {headline.map((variant) => (
                    <VariantRow key={variant.name} variant={variant} />
                  ))}
                </ul>

                {more.length > 0 && (
                  <details className="group border-b border-line">
                    <summary className="font-mono-label flex cursor-pointer list-none items-center gap-3 py-6 text-xs text-fg-70 hover:text-fg [&::-webkit-details-marker]:hidden">
                      <span
                        aria-hidden="true"
                        className="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                      />
                      See all {headline.length + more.length} options
                    </summary>
                    <ul className="border-t border-line">
                      {more.map((variant) => (
                        <VariantRow key={variant.name} variant={variant} />
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section id="bigger-builds" className="scroll-mt-24 border-b border-line bg-surface-2/50 py-20 md:py-28">
        {biggerBuilds.map((family) => (
          <span key={family.slug} id={family.slug} className="block scroll-mt-24" aria-hidden="true" />
        ))}
        <div className="container-edge">
          <RevealOnScroll className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel index="04" label="Digital builds: AI & apps" />
              <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
                Apps and AI agents, quoted per project.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-fg-70 md:col-span-6 md:col-start-7 md:self-end">
              These are scoped around one real problem in your business, rather
              than priced off a menu. They&rsquo;re available to local businesses
              and creative clients alike. Tell me what you need and I&rsquo;ll
              come back with a clear written quote, a timeline and a phased plan,
              so you can start small and grow it.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {biggerBuilds.map((family, position) => (
              <RevealOnScroll key={family.slug} delay={position * 80}>
                <div className="flex h-full flex-col justify-between gap-8 border border-fg/25 bg-surface-2 p-8">
                  <div>
                    <ServiceIcon slug={family.slug} size={30} className="text-fg-70" />
                    <h3 className="font-display mt-5 text-3xl font-medium leading-tight text-fg">
                      {family.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-70">{family.summary}</p>
                    <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                      {family.variants.map((variant) => (
                        <li key={variant.name} className="flex gap-3 text-sm text-fg-70">
                          <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-ink-50" />
                          {variant.name}
                        </li>
                      ))}
                    </ul>
                    {family.note && (
                      <p className="mt-5 border-l border-fg/30 pl-4 text-xs leading-relaxed text-fg-70">
                        {family.note}
                      </p>
                    )}
                  </div>
                  <div>
                    <Button href="/contact" variant="secondary" arrow>
                      Request a quote
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Packages index="—" />

      <section className="border-b border-line py-24 md:py-32">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel label="How pricing works" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Fair prices, agreed before we start.
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {pricingPrinciples.map((item, position) => (
              <RevealOnScroll key={item.title} delay={position * 80}>
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-2xl font-medium text-fg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-70">{item.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="mt-12 max-w-xl text-xs leading-relaxed text-fg-50">
            All prices shown are introductory starting points rather than fixed
            quotes, offered while the studio builds its client portfolio. The
            final figure depends on scope, complexity and timeline.
          </p>
        </div>
      </section>

      <FAQ index="—" />

      <CTASection
        heading="Not sure which of these you need?"
        copy="That's what the first conversation is for. Tell me what's going on in the business and I'll tell you honestly where to start, and where not to spend."
        ctaLabel="Start a project"
      />
    </>
  );
}
