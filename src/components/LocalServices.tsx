import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import RiseHeading from "./RiseHeading";

// The local business services, laid out as the journey a customer actually takes: they
// find you, they decide whether to trust you, and they get in touch. It is deliberately
// plain and structured (no promises about leads or rankings, just a clear path and proof).
const stages = [
  {
    number: "01",
    title: "They find you",
    outcome: "Easy to find, and clear about what you do before anyone picks up the phone.",
    items: [
      "Google Business Profile, reviews and local-trust direction",
      "Mobile-first service and booking websites",
      "Website design and redesigns",
    ],
  },
  {
    number: "02",
    title: "They trust you",
    outcome: "Proof of the work, shown properly, so the right customer can see you are the real thing.",
    items: ["Short-form project content", "Social media management", "Brand direction"],
  },
  {
    number: "03",
    title: "They get in touch",
    outcome: "A clear next step on every screen, so enquiring feels easy.",
    items: [
      "Landing pages and quote / enquiry journeys",
      "E-commerce, booking and service websites",
      "Paid social campaign creative",
    ],
  },
];

export default function LocalServices({ index = "" }: { index?: string }) {
  return (
    <section className="border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="max-w-3xl">
          <SectionLabel index={index} label="How it works for local businesses" />
          <RiseHeading
            text="Built for the way customers check you out."
            className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-70 sm:text-lg">
            A better website gives people a reason to trust you. This is what I make at each
            step, from the first search to the quote request.
          </p>
        </RevealOnScroll>

        <ol className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {stages.map((stage, position) => (
            <li key={stage.number}>
              <RevealOnScroll delay={position * 90} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-white/12 bg-white/[0.06] p-6 sm:p-8">
                  <span className="font-mono-label text-[11px] text-fg-70">{stage.number}</span>
                  <h3 className="font-display mt-3 border-t-2 border-cream/60 pt-4 text-3xl font-medium leading-tight text-fg">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-70">{stage.outcome}</p>
                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                    {stage.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-fg-70">
                        <span
                          aria-hidden="true"
                          className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-cream/80"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ol>

        <RevealOnScroll>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-fg-70">
            Clear customer journeys, real proof and professional presentation. I don&rsquo;t
            promise leads or search rankings.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
