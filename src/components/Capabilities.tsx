import Link from "next/link";
import { serviceFamilies, coreServiceSlugs } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import ServiceIcon from "./ServiceIcon";
import { Button } from "./Button";

export default function Capabilities({ index = "03" }: { index?: string }) {
  const core = coreServiceSlugs
    .map((slug) => serviceFamilies.find((family) => family.slug === slug))
    .filter((family): family is NonNullable<typeof family> => Boolean(family));
  const others = serviceFamilies.filter((family) => !coreServiceSlugs.includes(family.slug));

  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="What I do" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Three things done properly for local businesses.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Websites, short-form content and ad creative are what I have the
            proof for. Bigger builds are available on request.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {core.map((family, position) => (
            <RevealOnScroll key={family.slug} delay={position * 60}>
              <Link
                href={`/services#${family.slug}`}
                className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden bg-green p-7 text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-green-tint hover:shadow-[0_24px_40px_-24px_rgba(38,46,25,0.8)] sm:min-h-[24rem]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-label text-[11px] text-cream-70">
                    {String(position + 1).padStart(2, "0")}
                  </span>
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

          <RevealOnScroll delay={core.length * 60}>
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between gap-10 border border-ink/25 bg-cream-2 p-7 text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-cream-3/60 sm:min-h-[24rem]"
            >
              <span className="font-mono-label text-[11px] text-ink-70">04</span>
              <div>
                <h3 className="font-display text-[1.7rem] font-medium leading-[1.1]">
                  Not sure what you need?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-70">
                  Tell me where the business is stuck and I&rsquo;ll point you to the
                  right starting point, including where not to spend.
                </p>
                <span className="font-mono-label mt-6 inline-flex items-center gap-2 text-[11px] text-ink transition-all duration-300 group-hover:gap-3">
                  Start a conversation <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mt-14">
          <p className="font-mono-label text-[11px] text-ink-70">Also available</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((family) => (
              <Link
                key={family.slug}
                href={`/services#${family.slug}`}
                className="group flex items-start gap-4 border border-line p-5 transition-colors duration-300 hover:border-ink hover:bg-cream-2"
              >
                <ServiceIcon slug={family.slug} size={26} className="mt-0.5 shrink-0 text-ink-70" />
                <span>
                  <span className="font-display block text-xl font-medium leading-tight text-ink">
                    {family.shortTitle}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-ink-70">
                    {family.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12">
          <Button href="/services" variant="secondary">
            See every service and price
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
