import { projects } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import ReelsArc from "./ReelsArc";
import RiseHeading from "./RiseHeading";
import { Button } from "./Button";

// The arch shows the middle Reel first, so the most-watched one (first in the data) goes in the
// middle, the next to its right, the next to its left, and so on outwards.
function fanOrder<T>(items: T[]): T[] {
  const left: T[] = [];
  const right: T[] = [];
  items.slice(1).forEach((item, i) => (i % 2 === 0 ? right : left).push(item));
  return items.length ? [...left.reverse(), items[0], ...right] : items;
}

export default function ReelsShowcase({ index = "03" }: { index?: string }) {
  const project = projects.find((p) => p.slug === "wheelers-autoworks");
  if (!project?.videos) return null;

  const combined = project.metrics?.[0];

  return (
    <section id="reels" className="scroll-mt-20 overflow-hidden border-b border-line bg-surface-2/50 py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Short-form content" />
            <RiseHeading
              text="Check out the Reels I made for a local garage."
              className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-70">
            Made for {project.client}, an independent garage in West Sussex.
            Faults on real cars, explained plainly.
          </p>
        </RevealOnScroll>

        {combined && (
          <RevealOnScroll className="mt-10 flex items-baseline gap-4">
            <span className="font-display text-6xl font-medium leading-none text-fg sm:text-7xl">
              {combined.value}
            </span>
            <span className="font-mono-label max-w-[14rem] text-[11px] leading-relaxed text-fg-70">
              {combined.label}
            </span>
          </RevealOnScroll>
        )}

        <p className="font-mono-label mt-8 text-[11px] text-fg-50">
          <span className="hidden [@media(hover:hover)]:inline">
            Move across the arch to flick through. Click a Reel to play it.
          </span>
          <span className="[@media(hover:hover)]:hidden">Swipe to flick through. Tap the front Reel to play it.</span>
        </p>

        <ReelsArc videos={fanOrder(project.videos)} label={`Reels made for ${project.client}`} />

        <RevealOnScroll className="mt-10 flex flex-wrap items-center gap-4 sm:mt-14">
          <Button href={`/work/${project.slug}`} variant="secondary">
            See the full case study
          </Button>
          <Button href="/contact">Get content like this</Button>
        </RevealOnScroll>
        <p className="mt-6 text-xs text-fg-50">{project.metricsNote}</p>
      </div>
    </section>
  );
}
