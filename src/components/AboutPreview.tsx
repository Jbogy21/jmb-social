import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";
import FounderCard from "./FounderCard";
import { founder, siteConfig } from "@/lib/data";

export default function AboutPreview({ index = "09" }: { index?: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge grid gap-12 md:grid-cols-2 md:gap-16">
        <RevealOnScroll className="aspect-[4/5] md:order-2">
          <FounderCard />
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col justify-center md:order-1">
          <SectionLabel index={index} label="Who you'll work with" />
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            {founder.intro}
          </h2>
          {founder.story.slice(0, 2).map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-md text-base leading-relaxed text-ink-70">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/about" variant="secondary">
              More about me
            </Button>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label underline-hover text-[11px] text-ink"
            >
              Message me on WhatsApp ↗
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
