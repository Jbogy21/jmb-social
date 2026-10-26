import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categoryLabels, projects } from "@/lib/data";
import ProjectVisual from "@/components/ProjectVisual";
import RevealOnScroll from "@/components/RevealOnScroll";
import VideoCard from "@/components/VideoCard";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: `${project.client}: ${project.title}`,
    description: project.description,
  };
}

const statusText = {
  client: "Client project, designed and delivered by JMB Social.",
  studio: "Studio project, made by JMB Social for JMB Social.",
  concept:
    "Concept project. Self-initiated work created to demonstrate how we approach a brief. It is not a client engagement, and no client results are claimed.",
} as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const videoColumns = project.videos?.length === 2 ? "sm:grid-cols-2 lg:max-w-3xl" : "sm:grid-cols-3";

  return (
    <>
      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <Link
            href="/work"
            className="font-mono-label underline-hover inline-flex items-center gap-2 text-xs text-ink-70"
          >
            ← All work
          </Link>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-label text-xs text-ink-70">
            <span>{project.client}</span>
            <span aria-hidden="true">—</span>
            <span>{project.industry}</span>
          </div>

          <h1 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.08] text-ink sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="font-mono-label border border-line px-3 py-1.5 text-[10px] text-ink-70"
              >
                {service}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <div className="mt-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label underline-hover inline-flex items-center gap-2 text-xs text-ink"
              >
                Visit the live site ↗
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-line">
        <div className="aspect-[4/3] sm:aspect-[16/9]">
          <ProjectVisual
            kind={project.kind}
            accent={project.accent}
            tag={categoryLabels[project.categories[0]]}
            status={project.status}
            media={project.media}
          />
        </div>
      </section>

      {project.metrics && (
        <section className="border-b border-line py-16 md:py-20">
          <div className="container-edge">
            <div className="flex flex-wrap gap-x-16 gap-y-10">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-6xl font-medium leading-none text-ink sm:text-7xl">
                    {metric.value}
                  </p>
                  <p className="font-mono-label mt-4 max-w-[16rem] text-[11px] leading-relaxed text-ink-70">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            {project.metricsNote && (
              <p className="mt-8 text-xs text-ink-50">{project.metricsNote}</p>
            )}
          </div>
        </section>
      )}

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-12 md:grid-cols-3 md:gap-8">
          <RevealOnScroll>
            <p className="font-mono-label text-xs text-ink-50">The brief</p>
            <p className="mt-4 text-base leading-relaxed text-ink-70">{project.brief}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="font-mono-label text-xs text-ink-50">The approach</p>
            <p className="mt-4 text-base leading-relaxed text-ink-70">{project.approach}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="font-mono-label text-xs text-ink-50">What&rsquo;s delivered</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {project.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-base text-ink-70">
                  <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-ink-50" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      {project.videos && (
        <section className="border-b border-line py-20 md:py-28">
          <div className="container-edge">
            <RevealOnScroll>
              <p className="font-mono-label text-xs text-ink-50">
                {project.categories.includes("SOCIAL") ? "The content" : "The creative"}
              </p>
            </RevealOnScroll>
            <div className={`mt-8 grid gap-10 sm:gap-6 lg:gap-10 ${videoColumns}`}>
              {project.videos.map((video, position) => (
                <RevealOnScroll key={video.src} delay={position * 80}>
                  <VideoCard video={video} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.gallery && (
        <section className="border-b border-line py-20 md:py-28">
          <div className="container-edge">
            <RevealOnScroll>
              <p className="font-mono-label text-xs text-ink-50">The website</p>
            </RevealOnScroll>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, position) => (
                <RevealOnScroll
                  key={image.src}
                  delay={position * 80}
                  className={project.gallery!.length % 2 === 1 && position === 0 ? "md:col-span-2" : undefined}
                >
                  <div className="overflow-hidden border border-line shadow-[0_24px_50px_-30px_rgba(28,27,22,0.45)]">
                    <Image
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-edge grid gap-10 md:grid-cols-3 md:gap-8">
          {project.tools.length > 0 && (
            <div>
              <p className="font-mono-label text-xs text-ink-50">Built with</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono-label border border-line px-3 py-1.5 text-[10px] text-ink-70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className={project.tools.length > 0 ? "md:col-span-2" : "md:col-span-3"}>
            <p className="font-mono-label text-xs text-ink-50">Project status</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-70">
              {statusText[project.status]}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-edge flex items-center justify-between gap-6">
          <span className="font-mono-label text-xs text-ink-50">Next project</span>
          <Link
            href={`/work/${next.slug}`}
            className="font-display underline-hover text-right text-2xl font-medium text-ink sm:text-3xl"
          >
            {next.client === "Concept" ? next.industry : next.client} →
          </Link>
        </div>
      </section>

      <CTASection
        heading="Want something like this?"
        copy="Every project starts with the same conversation: what the business needs, and what would actually move it forward."
      />
    </>
  );
}
