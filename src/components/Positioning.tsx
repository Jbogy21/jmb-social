import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function Positioning() {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
        <RevealOnScroll className="md:col-span-4">
          <SectionLabel index="03" label="Positioning" />
        </RevealOnScroll>

        <div className="md:col-span-8">
          <RevealOnScroll>
            <h2 className="font-display max-w-3xl text-4xl font-medium leading-[1.08] text-ink sm:text-5xl md:text-6xl">
              One partner. Your entire digital presence.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
              Running a business already takes enough time. JMB brings the
              creative, content, social, web and advertising together so your
              digital presence feels consistent — and someone actually owns
              it.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
