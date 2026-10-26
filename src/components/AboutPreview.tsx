import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";
import StudioPanel from "./StudioPanel";

export default function AboutPreview({ index = "09" }: { index?: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge grid gap-12 md:grid-cols-2 md:gap-16">
        <RevealOnScroll className="aspect-[4/5] md:order-2">
          <StudioPanel />
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col justify-center md:order-1">
          <SectionLabel index={index} label="About" />
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Small studio. Serious standards.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-70">
            JMB Social was built for businesses that want agency-quality
            design, engineering and growth work without the unnecessary
            layers.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-70">
            Every project starts with the same question: what does the
            business actually need to grow? Then we make it look excellent,
            build it properly and measure the result. Founder-led and
            deliberately hands-on, you get senior attention from first call
            to launch and beyond.
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
