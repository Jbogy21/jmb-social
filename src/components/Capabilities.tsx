import Link from "next/link";
import { serviceFamilies } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import ServiceIcon from "./ServiceIcon";
import { Button } from "./Button";

export default function Capabilities({ index = "03" }: { index?: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Capabilities" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Everything your business needs to build, launch and grow online.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Seven connected disciplines. Hire one, or run them together so your
            site, ads, automations and brand are designed to work as one system.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceFamilies.map((family, position) => (
            <RevealOnScroll key={family.slug} delay={position * 50}>
              <Link
                href={`/services#${family.slug}`}
                className="group relative flex h-full sm:min-h-[23rem] flex-col justify-between overflow-hidden bg-green p-7 text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-green-tint hover:shadow-[0_24px_40px_-24px_rgba(38,46,25,0.8)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-label text-[11px] text-cream-50">{family.number}</span>
                  <ServiceIcon
                    slug={family.slug}
                    size={34}
                    className="text-sage transition-colors duration-300 group-hover:text-cream"
                  />
                </div>

                <div>
                  <h3 className="font-display text-[1.7rem] font-medium leading-[1.1]">
                    {family.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-70">{family.tagline}</p>
                  <ul className="mt-5 flex flex-col gap-1.5 border-t border-line-on-green pt-4 text-[13px] text-cream-70">
                    {family.variants.slice(0, 3).map((variant) => (
                      <li key={variant.name} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-sage" />
                        {variant.name}
                      </li>
                    ))}
                  </ul>
                  <span className="font-mono-label mt-6 inline-flex items-center gap-2 text-[11px] text-sage transition-all duration-300 group-hover:gap-3 group-hover:text-cream">
                    Options &amp; pricing <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={serviceFamilies.length * 50}>
            <Link
              href="/contact"
              className="group flex h-full sm:min-h-[23rem] flex-col justify-between border border-ink/25 bg-cream-2 p-7 text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-cream-3/60"
            >
              <span className="font-mono-label text-[11px] text-ink-50">08</span>
              <div>
                <h3 className="font-display text-[1.7rem] font-medium leading-[1.1]">
                  Not sure what you need?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-70">
                  Tell us where the business is stuck and we&rsquo;ll point you to the
                  right starting point, including where not to spend.
                </p>
                <span className="font-mono-label mt-6 inline-flex items-center gap-2 text-[11px] text-ink transition-all duration-300 group-hover:gap-3">
                  Start a conversation <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mt-12">
          <Button href="/services" variant="secondary">
            Explore all services
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
