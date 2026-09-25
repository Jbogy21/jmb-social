import { servicePillars } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";

export default function ServicesOverview() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04" label="Services" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Everything your digital presence needs, under one roof.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Five connected disciplines. Use one, or run them together so your
            brand, content, social, web and ads actually pull in the same
            direction.
          </p>
        </RevealOnScroll>

        <div className="mt-16 border-t border-line">
          {servicePillars.map((service, index) => (
            <RevealOnScroll key={service.slug} delay={index * 70}>
              <div className="grid gap-4 border-b border-line py-10 md:grid-cols-12 md:items-start md:gap-8 md:py-12">
                <span className="font-mono-label text-xs text-ink-50 md:col-span-2">
                  {service.number}
                </span>
                <h3 className="font-display text-3xl font-medium text-ink md:col-span-3">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-70 md:col-span-4">
                  {service.summary}
                </p>
                <ul className="flex flex-col gap-1.5 text-sm text-ink-70 md:col-span-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
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
