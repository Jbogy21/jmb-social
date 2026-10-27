import type { Metadata } from "next";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
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
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <SectionLabel label="Work" />
          <h1 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Selected work.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
            Websites, short-form video and ad creative for independent
            businesses across Sussex, Surrey and London, plus our own studio
            work. Concept projects are clearly labelled and show how we would
            approach apps and AI agents.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-edge">
          <WorkGrid projects={projects} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
