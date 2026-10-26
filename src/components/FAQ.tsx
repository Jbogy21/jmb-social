import { faqs } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

export default function FAQ({ index = "08" }: { index?: string }) {
  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
        <RevealOnScroll className="md:col-span-4">
          <SectionLabel index={index} label="Questions" />
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Before you get in touch.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="md:col-span-8">
          <div className="border-t border-line">
            {faqs.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-ink after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-ink-70">{item.answer}</p>
              </details>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
