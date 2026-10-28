import Link from "next/link";
import { testimonials } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function Testimonials({ index = "—" }: { index?: string }) {
  if (testimonials.length === 0) return null;

  const columns = testimonials.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll>
          <SectionLabel index={index} label="In their words" />
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            What clients say.
          </h2>
        </RevealOnScroll>

        <div className={`mt-14 grid gap-8 ${columns}`}>
          {testimonials.map((item, position) => (
            <RevealOnScroll key={item.business} delay={position * 80}>
              <figure className="flex h-full flex-col border border-line bg-cream-2/60 p-8 sm:p-10">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-ink-50">
                  &ldquo;
                </span>
                <blockquote className="font-display -mt-2 text-xl font-medium leading-snug text-ink sm:text-2xl">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <p className="font-display text-xl font-medium text-ink">{item.business}</p>
                    <p className="font-mono-label mt-1.5 text-[11px] text-ink-70">{item.detail}</p>
                  </div>
                  {item.project && (
                    <Link
                      href={`/work/${item.project}`}
                      className="font-mono-label underline-hover text-[11px] text-ink"
                    >
                      Read the case study →
                    </Link>
                  )}
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
