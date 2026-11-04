import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";
import { Button } from "./Button";
import RevealOnScroll from "./RevealOnScroll";
import RiseHeading from "./RiseHeading";

export default function SelectedWork({
  index = "02",
  limit = 4,
}: {
  index?: string;
  limit?: number;
}) {
  const featured = projects.slice(0, limit);

  return (
    <section id="work" className="scroll-mt-20 border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Selected work" />
            <RiseHeading text="Work that shows the standard." className="font-display mt-6 max-w-xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-70">
            Websites, short-form video and ad creative for independent
            businesses across Sussex, Surrey and London, plus my own studio
            work.
          </p>
        </RevealOnScroll>

        <div className="-mx-6 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {featured.map((project, index) => (
            <RevealOnScroll
              key={project.slug}
              delay={index * 80}
              className={`w-[86%] shrink-0 snap-center md:w-auto ${index === 0 ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={project} size={index === 0 ? "large" : "regular"} />
            </RevealOnScroll>
          ))}
        </div>

        <p className="font-mono-label mt-1 text-[11px] text-fg-70 md:hidden">Swipe for more →</p>

        <RevealOnScroll className="mt-10 flex justify-center md:mt-16 md:justify-start">
          <Button href="/work" variant="secondary">
            View all work
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
