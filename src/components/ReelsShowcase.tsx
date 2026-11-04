import { projects } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import VideoCard from "./VideoCard";
import RiseHeading from "./RiseHeading";
import { Button } from "./Button";

export default function ReelsShowcase({ index = "03" }: { index?: string }) {
  const project = projects.find((p) => p.slug === "wheelers-autoworks");
  if (!project?.videos) return null;

  const combined = project.metrics?.[0];

  return (
    <section id="reels" className="scroll-mt-20 border-b border-line bg-surface-2/50 py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Short-form content" />
            <RiseHeading text="Reels that get seen." className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-70">
            Made for {project.client}, an independent garage in West Sussex.
            Real faults, real cars, explained plainly.
          </p>
        </RevealOnScroll>

        {combined && (
          <RevealOnScroll className="mt-12 flex items-baseline gap-4">
            <span className="font-display text-6xl font-medium leading-none text-fg sm:text-7xl">
              {combined.value}
            </span>
            <span className="font-mono-label max-w-[14rem] text-[11px] leading-relaxed text-fg-70">
              {combined.label}
            </span>
          </RevealOnScroll>
        )}

        <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-10 [&::-webkit-scrollbar]:hidden">
          {project.videos.map((video, position) => (
            <RevealOnScroll key={video.src} delay={position * 80} className="w-[74%] shrink-0 snap-center sm:w-auto">
              <VideoCard video={video} />
            </RevealOnScroll>
          ))}
        </div>

        <p className="font-mono-label mt-1 text-[11px] text-fg-70 sm:hidden">Swipe for more →</p>

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
