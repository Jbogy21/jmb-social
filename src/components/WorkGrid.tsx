"use client";

import { useMemo, useState } from "react";
import { projectGroups, workGroups, type Project, type WorkGroup } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import KeeperRing from "./KeeperRing";

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
      <div className="font-mono-label mb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[11px] text-fg-70">
        <span>Contact sheet · {projects.length} frames</span>
        <span className="flex items-center gap-2">
          <span className="relative inline-flex px-1.5 py-0.5 text-fg">
            00
            <KeeperRing />
          </span>
          <span className="ml-3">Circled = made for a real client</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter work by group">
        <FilterChip label="All frames" active={active === "all"} onClick={() => setActive("all")} />
        {workGroups.map((group) => (
          <FilterChip
            key={group.id}
            label={group.label}
            active={active === group.id}
            onClick={() => setActive(group.id)}
          />
        ))}
      </div>

      <div className="sprockets mt-12" aria-hidden="true" />
      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            size="regular"
            frame={projects.indexOf(project) + 1}
          />
        ))}
      </div>
      <div className="sprockets mt-14" aria-hidden="true" />

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
