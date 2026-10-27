import { testimonials } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function Testimonials({ index = "—" }: { index?: string }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll>
          <SectionLabel index={index} label="In their words" />
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            What clients say.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, position) => (
            <RevealOnScroll key={item.name + item.business} delay={position * 80}>
              <figure className="flex h-full flex-col border border-line bg-cream-2/60 p-8">
                <blockquote className="font-display text-xl font-medium leading-snug text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-4">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="font-mono-label mt-1 text-[11px] text-ink-70">{item.business}</p>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
