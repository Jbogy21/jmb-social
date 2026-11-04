import Link from "next/link";
import { testimonials } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import RiseHeading from "./RiseHeading";

export default function Testimonials({ index = "—" }: { index?: string }) {
  if (testimonials.length === 0) return null;

  const columns = testimonials.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll>
          <SectionLabel index={index} label="In their words" />
          <RiseHeading text="What clients say." className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl" />
        </RevealOnScroll>

        <div className={`-mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden ${columns}`}>
          {testimonials.map((item, position) => (
            <RevealOnScroll key={item.business} delay={position * 80} className="w-[88%] shrink-0 snap-center sm:w-auto">
              <figure className="flex h-full flex-col border border-line bg-surface-2/60 p-8 sm:p-10">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-fg-50">
                  &ldquo;
                </span>
                <blockquote className="font-display -mt-2 text-xl font-medium leading-snug text-fg sm:text-2xl">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <p className="font-display text-xl font-medium text-fg">{item.business}</p>
                    <p className="font-mono-label mt-1.5 text-[11px] text-fg-70">{item.detail}</p>
                  </div>
                  {item.project && (
                    <Link
                      href={`/work/${item.project}`}
                      className="font-mono-label underline-hover text-[11px] text-fg"
                    >
                      Read the case study →
                    </Link>
                  )}
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
        <p className="font-mono-label mt-1 text-[11px] text-fg-70 sm:hidden">Swipe for more →</p>
      </div>
    </section>
  );
}
