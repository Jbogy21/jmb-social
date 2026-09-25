"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const categories: ProjectCategory[] = ["BRAND", "CONTENT", "SOCIAL", "WEB", "PAID"];

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "ALL">("ALL");

  const filtered = useMemo(
    () =>
      active === "ALL" ? projects : projects.filter((p) => p.categories.includes(active)),
    [active, projects]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter work by category">
        <FilterChip label="All" active={active === "ALL"} onClick={() => setActive("ALL")} />
        {categories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} size="regular" />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-sm text-ink-70">No projects in this category yet.</p>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`font-mono-label border px-4 py-2.5 text-[11px] transition-colors duration-200 ${
        active
          ? "border-ink bg-ink text-cream"
          : "border-line text-ink-70 hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
