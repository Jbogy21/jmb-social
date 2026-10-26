import Link from "next/link";
import ProjectVisual from "./ProjectVisual";
import { categoryLabels, type Project } from "@/lib/data";

export default function ProjectCard({
  project,
  size = "large",
}: {
  project: Project;
  size?: "large" | "regular";
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div
        className={`overflow-hidden ${
          size === "large" ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectVisual
            kind={project.kind}
            accent={project.accent}
            tag={categoryLabels[project.categories[0]]}
            status={project.status}
            media={project.media}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-label text-xs text-ink-70">
        <span>{project.client}</span>
        <span aria-hidden="true">—</span>
        <span>{project.industry}</span>
      </div>

      <h3
        className={`font-display mt-3 max-w-xl font-medium leading-tight text-ink ${
          size === "large" ? "text-3xl md:text-4xl" : "text-2xl"
        }`}
      >
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
          {project.title}
        </span>
      </h3>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-70">
        {project.description}
      </p>
    </Link>
  );
}
