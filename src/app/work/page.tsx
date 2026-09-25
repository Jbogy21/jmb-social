import type { Metadata } from "next";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import WorkGrid from "@/components/WorkGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from JMB Social across brand, content, social, web and paid media.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <SectionLabel label="Work" />
          <h1 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            A sample of the kind of work we do.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
            Illustrative placeholder projects, built to show our approach —
            real client case studies will replace these as work is completed.
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
