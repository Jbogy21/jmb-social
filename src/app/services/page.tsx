import type { Metadata } from "next";
import { serviceDetails } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/Button";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, content, social, web and paid media — five connected disciplines JMB Social uses to build and grow a business's digital presence.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <SectionLabel label="Services" />
          <h1 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Five disciplines. One studio.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
            Use one, or run them together so your brand, content, social, web
            and advertising actually pull in the same direction.
          </p>
        </div>
      </section>

      {serviceDetails.map((service) => (
        <section
          key={service.slug}
          id={service.slug}
          className="border-b border-line py-20 md:py-28"
        >
          <div className="container-edge">
            <RevealOnScroll className="grid gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <span className="font-mono-label text-xs text-ink-50">{service.number}</span>
                <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
                  {service.title}
                </h2>
              </div>

              <div className="grid gap-10 md:col-span-8 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="font-mono-label text-xs text-ink-50">What we do</p>
                    <p className="mt-3 text-base leading-relaxed text-ink-70">
                      {service.whatWeDo}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono-label text-xs text-ink-50">The problem it solves</p>
                    <p className="mt-3 text-base leading-relaxed text-ink-70">
                      {service.problem}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-mono-label text-xs text-ink-50">Example deliverables</p>
                  <ul className="mt-3 flex flex-col gap-2.5 border-t border-line pt-4">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="border-b border-line pb-2.5 text-sm text-ink-70 last:border-b-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href="/contact" variant="secondary" arrow>
                      Talk to us about {service.title.toLowerCase()}
                    </Button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      ))}

      <CTASection
        heading="Not sure which of these you need?"
        copy="That's the point of a first conversation. Tell us what's going on and we'll tell you honestly where to start."
        ctaLabel="Start a project"
      />
    </>
  );
}
