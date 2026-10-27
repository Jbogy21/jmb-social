import type { Metadata } from "next";
import Link from "next/link";
import { serviceFamilies, cadenceLabel } from "@/lib/data";
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
    "Website design and redesign, app development, AI agents and automation, Meta and Google ads, ad creative, social media management and SEO — with clear starting prices.",
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

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <SectionLabel label="Services & pricing" />
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Everything you need to build, launch and grow online.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
            Seven disciplines, each with clear options and starting prices. Hire
            one, or combine them so your website, apps, automations and
            advertising are designed to work as one system.
          </p>
          <p className="font-mono-label mt-6 inline-block border border-ink/30 px-3.5 py-2 text-[11px] text-ink-70">
            Introductory rates for new clients
          </p>

          <nav aria-label="Jump to a service" className="mt-12 flex flex-wrap gap-2.5">
            {serviceFamilies.map((family) => (
              <Link
                key={family.slug}
                href={`#${family.slug}`}
                className="font-mono-label group inline-flex items-center gap-2.5 bg-green px-4 py-3 text-[11px] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                <ServiceIcon
                  slug={family.slug}
                  size={16}
                  className="text-sage transition-colors duration-300 group-hover:text-cream"
                />
                {family.shortTitle}
              </Link>
            ))}
            <Link
              href="#packages"
              className="font-mono-label inline-flex items-center border border-ink px-4 py-3 text-[11px] text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
            >
              Packages
            </Link>
          </nav>
        </div>
      </section>

      {serviceFamilies.map((family) => (
        <section
          key={family.slug}
          id={family.slug}
          className="scroll-mt-24 border-b border-line py-20 md:py-28"
        >
          <div className="container-edge grid gap-12 md:grid-cols-12 md:gap-10">
            <RevealOnScroll className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <span className="font-mono-label text-xs text-ink-50">{family.number}</span>
                <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
                  {family.title}
                </h2>
                <p className="font-display mt-5 text-xl leading-snug text-ink">
                  {family.tagline}
                </p>
                <p className="mt-5 text-base leading-relaxed text-ink-70">{family.summary}</p>
                {family.note && (
                  <p className="mt-5 border-l border-ink/30 pl-4 text-xs leading-relaxed text-ink-70">
                    {family.note}
                  </p>
                )}
                <div className="mt-8">
                  <Button href="/contact" variant="secondary" arrow>
                    Discuss {family.shortTitle}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            <div className="md:col-span-8">
              <p className="font-mono-label pb-4 text-xs text-ink-50">
                Options &amp; starting prices
              </p>
              <ul className="border-t border-line">
                {family.variants.map((variant, position) => (
                  <RevealOnScroll key={variant.name} delay={position * 40}>
                    <li className="grid gap-4 border-b border-line py-7 sm:grid-cols-[1fr_auto] sm:gap-12">
                      <div>
                        <h3 className="font-display text-2xl font-medium leading-tight text-ink">
                          {variant.name}
                        </h3>
                        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-70">
                          {variant.description}
                        </p>
                      </div>
                      <div className="sm:min-w-28 sm:text-right">
                        <p className="font-mono-label text-[11px] text-ink-50">
                          {variant.price.includes("–") ? "Typically" : "From"}
                        </p>
                        <p className="font-display text-3xl font-medium leading-none text-ink whitespace-nowrap">
                          {variant.price}
                        </p>
                        <p className="font-mono-label mt-1.5 text-[11px] text-ink-50">
                          {cadenceLabel[variant.cadence]}
                        </p>
                      </div>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

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
        copy="That's what the first conversation is for. Tell us what's going on in the business and we'll tell you honestly where to start, and where not to spend."
        ctaLabel="Start a project"
      />
    </>
  );
}
