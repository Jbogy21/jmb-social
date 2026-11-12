"use client";

import { useMemo, useState } from "react";
import { projectGroups, workGroups, type Project, type WorkGroup } from "@/lib/data";
import ProjectCard from "./ProjectCard";

// Work is grouped by who it was for and what was made. Every group is always offered, so
// visitors can see the whole range; a group with nothing finished yet says so plainly
// instead of leading to a blank page.
export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<WorkGroup | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => projectGroups(p).includes(active))),
    [active, projects]
  );
  const current = workGroups.find((group) => group.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter work by group">
        <FilterChip label="All" active={active === "all"} onClick={() => setActive("all")} />
        {workGroups.map((group) => (
          <FilterChip
            key={group.id}
            label={group.label}
            active={active === group.id}
            onClick={() => setActive(group.id)}
          />
        ))}
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} size="regular" />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 max-w-xl text-base leading-relaxed text-fg-70" role="status">
          {current?.empty ?? "No projects in this group yet."}
        </p>
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
      className={`font-mono-label rounded-full border px-4 py-2.5 text-[11px] transition-colors duration-200 ${
        active
          ? "border-cream bg-cream text-ink"
          : "border-line text-fg-70 hover:border-fg hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}
