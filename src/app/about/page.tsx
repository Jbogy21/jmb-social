import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
import StudioPanel from "@/components/StudioPanel";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "JMB Social is a founder-led studio combining design, engineering, AI and paid media, built to be hands-on rather than layered.",
};

const disciplines = [
  {
    title: "Design",
    description:
      "Identity, interface and ad creative with a clear point of view, made to be recognised and remembered.",
  },
  {
    title: "Engineering",
    description:
      "Websites, apps and platforms on modern infrastructure, fast by default and ready to scale.",
  },
  {
    title: "AI & automation",
    description:
      "Agents and workflows that take real work off your team, grounded in your data and monitored in production.",
  },
  {
    title: "Growth",
    description:
      "Paid media, SEO and analytics run on tested hypotheses and reported in revenue, not impressions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel label="About" />
            <h1 className="font-display mt-6 text-5xl font-medium leading-[1.05] text-ink sm:text-6xl">
              Built to be hands-on.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-70">
              JMB Social is a founder-led studio for businesses that want to
              look better, work smarter and grow faster online.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-70">
              Great businesses often don&rsquo;t have a product problem —
              they have a presentation, a systems or an attention problem.
              JMB exists to close that gap with design, engineering,
              automation and advertising that are planned together.
            </p>
          </div>

          <div className="aspect-[4/5]">
            <StudioPanel />
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="—" label="What it combines" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Four disciplines, brought together deliberately.
            </h2>
          </RevealOnScroll>

          <div className="mt-14 grid border border-line sm:grid-cols-2">
            {disciplines.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 70}>
                <div
                  className={`h-full border-line p-8 sm:p-10 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  } ${index < disciplines.length - 2 ? "border-b" : ""}`}
                >
                  <h3 className="font-display text-2xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-70">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
          <RevealOnScroll className="md:col-span-4">
            <SectionLabel label="How we work" />
          </RevealOnScroll>
          <RevealOnScroll className="md:col-span-8">
            <p className="font-display max-w-2xl text-3xl font-medium leading-[1.2] text-ink sm:text-4xl">
              Clients get senior-level attention, not layers of agency
              account management.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-70">
              Every project is approached with the same principle: understand
              what the business actually needs, design and build it properly,
              then measure the commercial result. Nothing gets handed down a
              chain of account managers — the person planning the work is
              the person doing it.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <CTASection
        heading="Let's start with a conversation."
        copy="Tell us where the business is now and where you want it to go — we'll tell you honestly whether we're the right fit."
      />
    </>
  );
}
