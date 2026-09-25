import { processSteps } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function Process() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll>
          <SectionLabel index="05" label="How we work" />
        </RevealOnScroll>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 80}>
              <div className="border-t border-line pt-6">
                <span className="font-mono-label text-xs text-ink-50">{step.number}</span>
                <h3 className="font-display mt-3 text-2xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-70">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
