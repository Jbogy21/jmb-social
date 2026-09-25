import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";
import PlaceholderImage from "./PlaceholderImage";

export default function AboutPreview() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge grid gap-12 md:grid-cols-2 md:gap-16">
        <RevealOnScroll className="aspect-[4/5] md:order-2">
          <PlaceholderImage accent="charcoal" label="Founder portrait — coming soon" />
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col justify-center md:order-1">
          <SectionLabel index="06" label="About" />
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Small studio. Serious standards.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-70">
            JMB Social was built for businesses that want agency-quality
            creative and digital support without the unnecessary layers.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-70">
            Every project is approached with the same principle: understand
            what the business actually needs, make it look excellent, then
            focus on work that produces a commercial result. Founder-led and
            deliberately hands-on — clients get senior-level attention, not
            layers of agency account management.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              More about JMB
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
