import { projects } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import VideoCard from "./VideoCard";
import { Button } from "./Button";

export default function ReelsShowcase({ index = "03" }: { index?: string }) {
  const project = projects.find((p) => p.slug === "wheelers-autoworks");
  if (!project?.videos) return null;

  const combined = project.metrics?.[0];

  return (
    <section id="reels" className="scroll-mt-20 border-b border-line bg-cream-2/50 py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Short-form content" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Reels that get seen.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Made for {project.client}, an independent garage in West Sussex.
            Real faults, real cars, explained plainly.
          </p>
        </RevealOnScroll>

        {combined && (
          <RevealOnScroll className="mt-12 flex items-baseline gap-4">
            <span className="font-display text-6xl font-medium leading-none text-ink sm:text-7xl">
              {combined.value}
            </span>
            <span className="font-mono-label max-w-[14rem] text-[11px] leading-relaxed text-ink-70">
              {combined.label}
            </span>
          </RevealOnScroll>
        )}

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {project.videos.map((video, position) => (
            <RevealOnScroll key={video.src} delay={position * 80}>
              <VideoCard video={video} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-14 flex flex-wrap items-center gap-4">
          <Button href={`/work/${project.slug}`} variant="secondary">
            See the full case study
          </Button>
          <Button href="/contact">Get content like this</Button>
        </RevealOnScroll>
        <p className="mt-6 text-xs text-ink-50">{project.metricsNote}</p>
      </div>
    </section>
  );
}
