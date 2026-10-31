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
import ServiceStage from "@/components/ServiceStage";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/Button";
import ServiceIcon from "@/components/ServiceIcon";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Websites, short-form content and social, and ads and brand, each with clear starting prices. Apps and AI agents are quoted per project.",
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
    <li className="grid gap-4 border-b border-line py-7 sm:grid-cols-[1fr_auto] sm:gap-12">
      <div>
        <h3 className="font-display text-2xl font-medium leading-tight text-ink">{variant.name}</h3>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-70">{variant.description}</p>
      </div>
      <div className="sm:min-w-28 sm:text-right">
        <p className="font-mono-label text-[11px] text-ink-50">
          {variant.price.includes("–") ? "Typically" : "From"}
        </p>
        <p className="font-display whitespace-nowrap text-3xl font-medium leading-none text-ink">
          {variant.price}
        </p>
        <p className="font-mono-label mt-1.5 text-[11px] text-ink-50">
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
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <SectionLabel label="Services & pricing" />
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Clear services. Clear prices.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
            Three things done properly: websites, content and social, and ads
            and brand. Bigger builds, like apps and AI agents, are quoted per
            project.
          </p>
          <p className="font-mono-label mt-6 inline-block border border-ink/30 px-3.5 py-2 text-[11px] text-ink-70">
            Introductory rates for new clients
          </p>

          <nav aria-label="Jump to a service" className="mt-12 flex flex-wrap gap-2.5">
            {servicePillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`#${pillar.slug}`}
                className="font-mono-label group inline-flex items-center gap-2.5 bg-green px-4 py-3 text-[11px] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                <ServiceIcon
                  slug={pillar.slug}
                  size={16}
                  className="text-sage transition-colors duration-300 group-hover:text-cream"
                />
                {pillar.title}
              </Link>
            ))}
            <Link
              href="#bigger-builds"
              className="font-mono-label inline-flex items-center border border-ink/40 px-4 py-3 text-[11px] text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
            >
              Apps &amp; AI
            </Link>
            <Link
              href="#packages"
              className="font-mono-label inline-flex items-center border border-ink px-4 py-3 text-[11px] text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
            >
              Packages
            </Link>
          </nav>
        </div>
      </section>

      <ServiceStage panels={stagePanels} />

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
                  <span className="font-mono-label text-xs text-ink-50">{pillar.number}</span>
                  <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
                    {pillar.title}
                  </h2>
                  <p className="font-display mt-5 text-xl leading-snug text-ink">{pillar.tagline}</p>
                  <p className="mt-5 text-base leading-relaxed text-ink-70">{pillar.summary}</p>
                  {pillar.note && (
                    <p className="mt-5 border-l border-ink/30 pl-4 text-xs leading-relaxed text-ink-70">
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
                <p className="font-mono-label pb-4 text-xs text-ink-50">Options &amp; starting prices</p>
                <ul className="border-t border-line">
                  {headline.map((variant) => (
                    <VariantRow key={variant.name} variant={variant} />
                  ))}
                </ul>

                {more.length > 0 && (
                  <details className="group border-b border-line">
                    <summary className="font-mono-label flex cursor-pointer list-none items-center gap-3 py-6 text-xs text-ink-70 hover:text-ink [&::-webkit-details-marker]:hidden">
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

      <section id="bigger-builds" className="scroll-mt-24 border-b border-line bg-cream-2/50 py-20 md:py-28">
        {biggerBuilds.map((family) => (
          <span key={family.slug} id={family.slug} className="block scroll-mt-24" aria-hidden="true" />
        ))}
        <div className="container-edge">
          <RevealOnScroll className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel index="04" label="Bigger builds" />
              <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
                Apps and AI agents, quoted per project.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-relaxed text-ink-70 md:col-span-6 md:col-start-7 md:self-end">
              These are scoped properly rather than priced off a menu. Tell me
              what you need and I&rsquo;ll come back with a clear written quote,
              a timeline and a phased plan, so you can start small and grow it.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {biggerBuilds.map((family, position) => (
              <RevealOnScroll key={family.slug} delay={position * 80}>
                <div className="flex h-full flex-col justify-between gap-8 border border-ink/25 bg-cream p-8">
                  <div>
                    <ServiceIcon slug={family.slug} size={30} className="text-ink-70" />
                    <h3 className="font-display mt-5 text-3xl font-medium leading-tight text-ink">
                      {family.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-70">{family.summary}</p>
                    <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
                      {family.variants.map((variant) => (
                        <li key={variant.name} className="flex gap-3 text-sm text-ink-70">
                          <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-ink-50" />
                          {variant.name}
                        </li>
                      ))}
                    </ul>
                    {family.note && (
                      <p className="mt-5 border-l border-ink/30 pl-4 text-xs leading-relaxed text-ink-70">
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
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Fair prices, agreed before we start.
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {pricingPrinciples.map((item, position) => (
              <RevealOnScroll key={item.title} delay={position * 80}>
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-2xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-70">{item.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <p className="mt-12 max-w-xl text-xs leading-relaxed text-ink-50">
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
