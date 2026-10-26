import { principles } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function Principles({ index = "06" }: { index?: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll>
          <SectionLabel index={index} label="Why JMB" />
          <h2 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Agency-grade craft, without the agency layers.
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {principles.map((item, position) => (
            <RevealOnScroll key={item.title} delay={position * 80}>
              <div className="border-t border-line pt-6">
                <h3 className="font-display text-2xl font-medium leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-70">{item.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
