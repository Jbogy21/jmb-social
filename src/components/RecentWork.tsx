import Image from "next/image";
import Link from "next/link";
import { projects, categoryLabels } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";

const slugs = ["wheelers-autoworks", "c-m-booker", "beechwood-tree-care"];
const shortNames: Record<string, string> = { "beechwood-tree-care": "Beechwood Tree Care" };

type Row = {
  href: string;
  name: string;
  meta: string;
  place: string;
  image?: string;
  live?: boolean;
};

export default function RecentWork() {
  const rows: Row[] = slugs.flatMap((slug) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return [];
    return [
      {
        href: `/work/${project.slug}`,
        name: shortNames[slug] ?? project.client,
        meta: project.categories.map((category) => categoryLabels[category]).join(" · "),
        place: project.industry.split(",").slice(-1)[0].trim(),
        image: project.media?.images?.[0],
      },
    ];
  });

  rows.push({
    href: "/creative",
    name: "First creative collaboration",
    meta: "Portfolio · Reels · Instagram",
    place: "In production",
    live: true,
  });

  return (
    <section className="border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel label="Recent work" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Real businesses, real work so far.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Local businesses first. The creative side is starting now, and it gets added here as it
            is finished.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14">
          <ul className="border-t border-ink">
            {rows.map((row) => (
              <li key={row.href} className="border-b border-line">
                <Link
                  href={row.href}
                  className="group relative grid items-baseline gap-2 py-7 transition-colors duration-300 hover:bg-cream-2/60 sm:py-9 md:grid-cols-12 md:gap-8"
                >
                  <span className="font-display flex items-center gap-4 text-4xl font-medium leading-tight text-ink transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl md:col-span-6 md:text-6xl">
                    {row.live && (
                      <span className="h-3 w-3 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    )}
                    {row.name}
                  </span>
                  <span className="font-mono-label text-[11px] text-ink-70 md:col-span-3">
                    {row.meta}
                  </span>
                  <span className="font-mono-label text-[11px] text-ink-70 md:col-span-3 md:text-right">
                    {row.place} <span aria-hidden="true">→</span>
                  </span>

                  {row.image && (
                    <span
                      className="pointer-events-none absolute right-[27%] top-1/2 z-10 hidden h-44 w-72 -translate-y-1/2 overflow-hidden border border-black/10 opacity-0 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)] transition-opacity duration-300 group-hover:opacity-100 lg:block"
                      aria-hidden="true"
                    >
                      <Image src={row.image} alt="" fill sizes="288px" className="object-cover" />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12">
          <Button href="/work" variant="secondary">
            View all work
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
