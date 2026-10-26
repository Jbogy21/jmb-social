import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import SectionLabel from "./SectionLabel";
import { Button } from "./Button";
import RevealOnScroll from "./RevealOnScroll";

export default function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="02" label="Selected work" />
            <h2 className="font-display mt-6 max-w-xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Work that shows the standard.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Websites, short-form video and ad creative for independent
            businesses across Sussex, Surrey and London, plus our own studio
            work.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {featured.map((project, index) => (
            <RevealOnScroll
              key={project.slug}
              delay={index * 80}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} size={index === 0 ? "large" : "regular"} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-16 flex justify-center md:justify-start">
          <Button href="/work" variant="secondary">
            View all work
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
