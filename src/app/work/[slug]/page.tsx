import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import PlaceholderImage from "@/components/PlaceholderImage";
import RevealOnScroll from "@/components/RevealOnScroll";
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
    title: project.client,
    description: project.description,
  };
}

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
        </div>
      </section>

      <section className="border-b border-line">
        <div className="aspect-[16/9]">
          <PlaceholderImage accent={project.accent} tag={project.categories[0]} />
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-12 md:grid-cols-3 md:gap-8">
          <RevealOnScroll>
            <p className="font-mono-label text-xs text-ink-50">Challenge</p>
            <p className="mt-4 text-base leading-relaxed text-ink-70">{project.challenge}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="font-mono-label text-xs text-ink-50">Approach</p>
            <p className="mt-4 text-base leading-relaxed text-ink-70">{project.approach}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="font-mono-label text-xs text-ink-50">Creative</p>
            <p className="mt-4 text-base leading-relaxed text-ink-70">{project.creative}</p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-3 md:grid-cols-2">
          <div className="aspect-[4/3]">
            <PlaceholderImage accent={project.accent === "cream" ? "sage" : "cream"} />
          </div>
          <div className="aspect-[4/3]">
            <PlaceholderImage accent={project.accent === "charcoal" ? "green" : "charcoal"} />
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge max-w-2xl">
          <p className="font-mono-label text-xs text-ink-50">Results</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-70">{project.results}</p>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-edge flex items-center justify-between">
          <span className="font-mono-label text-xs text-ink-50">Next project</span>
          <Link
            href={`/work/${next.slug}`}
            className="font-display underline-hover text-2xl font-medium text-ink sm:text-3xl"
          >
            {next.client} →
          </Link>
        </div>
      </section>

      <CTASection
        heading="Want something like this?"
        copy="Every project starts with the same conversation — what the business needs, and what would actually move it forward."
      />
    </>
  );
}
