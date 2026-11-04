import type { Metadata } from "next";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import PageHero from "@/components/PageHero";
import WorkGrid from "@/components/WorkGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from JMB Social across websites, apps, AI agents, paid media and brand.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero>
        <div className="container-edge">
          <SectionLabel label="Work" tone="cream" />
          <h1 className="mt-6 max-w-3xl font-sans text-[clamp(2.6rem,6.4vw,5.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)]">
            Selected <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">work.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
            Websites, short-form video and ad creative for independent
            businesses across Sussex, Surrey and London, plus our own studio
            work. Concept projects are clearly labelled and show how we would
            approach apps and AI agents.
          </p>
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-edge">
          <h2 className="sr-only">All projects</h2>
          <WorkGrid projects={projects} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
