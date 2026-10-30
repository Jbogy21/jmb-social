import type { Metadata } from "next";
import Link from "next/link";
import { projects, serviceFamilies, cadenceLabel } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Creative: fashion, music & sport",
  description:
    "Short-form content, release rollouts and portfolio sites for emerging designers, models, artists and athletes, from JMB Social.",
  alternates: { canonical: "/creative" },
};

function variantPrice(name: string) {
  for (const family of serviceFamilies) {
    const variant = family.variants.find((v) => v.name === name);
    if (variant) return `${variant.price} ${cadenceLabel[variant.cadence]}`;
  }
  return "";
}

const lanes = [
  {
    number: "01",
    title: "Fashion & modelling",
    blurb: "For emerging designers, models, stylists and photographers.",
    items: [
      "Portfolio and comp-card websites",
      "Lookbook, styling and runway-recap Reels",
      "Instagram setup, grid and content plan",
    ],
    price: `Websites from ${variantPrice("Business website").replace(" one-off", "")}`,
  },
  {
    number: "02",
    title: "Music",
    blurb: "For artists, DJs, producers and small labels.",
    items: [
      "Release teasers and rollout content",
      "Lyric and visualiser videos",
      "Artist website with a simple press kit",
    ],
    price: `Short-form video from ${variantPrice("Short-form video ads").replace(" per pack", " a pack")}`,
  },
  {
    number: "03",
    title: "Sport & events",
    blurb: "For athletes, clubs and the people running the night.",
    items: [
      "Event highlight and recap Reels",
      "Athlete profile websites",
      "Behind-the-scenes content series",
    ],
    price: `Content from ${variantPrice("Short-form content engine").replace(" per month", " a month")}`,
  },
];

const keywords = [
  "Reels",
  "Lookbooks",
  "Comp-card sites",
  "Release teasers",
  "Visualisers",
  "Event recaps",
  "Behind the scenes",
  "Portfolio sites",
];

const steps = [
  {
    number: "01",
    title: "Brief",
    text: "A short chat about the look, the goal and the audience. No jargon, no pitch deck.",
  },
  {
    number: "02",
    title: "Shoot or build",
    text: "I plan it, shoot it, edit it and design it. You approve everything before it goes anywhere public.",
  },
  {
    number: "03",
    title: "Release",
    text: "A posting plan so the work lands with momentum instead of all at once.",
  },
];

export default function CreativePage() {
  const proof = ["wheelers-autoworks", "jmb-social-ad-creative"]
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-line-on-green bg-green-deep text-cream">
        <div className="container-edge relative pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="hero-reveal flex items-center gap-3 font-mono-label text-xs text-cream-70">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            <span>JMB / Creative</span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="font-display text-[22vw] font-medium leading-[0.84] tracking-tight sm:text-[17vw] lg:col-span-8 lg:text-[11.5rem]">
              <span className="block">Fashion,</span>
              <span className="block italic text-signal">music</span>
              <span className="block">&amp; sport.</span>
            </h1>

            <div className="lg:col-span-4">
              <p className="max-w-sm text-lg leading-relaxed text-cream-70">
                Short-form content, release rollouts and portfolio sites for
                emerging designers, models, artists and athletes.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="signal">
                  Start a creative project
                </Button>
                <Button href="#lanes" variant="ghost">
                  What I make
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-ink bg-signal py-4 text-ink" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {keywords.map((word) => (
                <span key={word + copy} className="flex items-center">
                  <span className="font-display px-6 text-3xl font-medium sm:text-4xl">{word}</span>
                  <span className="text-2xl">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="lanes" className="scroll-mt-20 border-b border-line py-24 md:py-32">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="01" label="What I make" />
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Content with a point of view, made for the scene it lives in.
            </h2>
          </RevealOnScroll>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {lanes.map((lane, position) => (
              <RevealOnScroll key={lane.title} delay={position * 80}>
                <div className="flex h-full flex-col justify-between gap-10 border border-ink/25 bg-cream-2 p-8 transition-colors duration-300 hover:border-ink">
                  <div>
                    <span className="font-mono-label text-[11px] text-ink-70">{lane.number}</span>
                    <h3 className="font-display mt-4 text-3xl font-medium leading-tight text-ink">
                      {lane.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-70">{lane.blurb}</p>
                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                      {lane.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-ink-70">
                          <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="font-mono-label text-[11px] text-ink">{lane.price}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream-2/50 py-24 md:py-32">
        <div className="container-edge grid gap-12 md:grid-cols-12 md:gap-8">
          <RevealOnScroll className="md:col-span-5">
            <SectionLabel index="02" label="Where I am" />
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              New to this world. <em className="italic">Serious</em> about it.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="md:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-ink-70">
              My proof so far is local business: websites for a garage, a
              furniture workshop and a tree care firm, and Reels that reached
              111.2K views between them. The creative portfolio is the next
              chapter, and I&rsquo;m building it with emerging models,
              designers and artists.
            </p>
            <div className="mt-10 border border-ink bg-cream p-8">
              <p className="font-mono-label flex items-center gap-2.5 text-[11px] text-ink">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                Collaboration projects
              </p>
              <p className="font-display mt-4 text-2xl font-medium leading-snug text-ink">
                I&rsquo;m taking on a small number of collaborations to build the
                creative portfolio.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-70">
                You get professional-quality content or a portfolio site at a
                reduced rate. In return I ask for permission to feature the
                work. Everything is agreed in writing first, and you approve
                what goes public.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Propose a collaboration
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-b border-line py-24 md:py-32">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="03" label="Proof so far" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Short-form and motion work I can already show.
            </h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {proof.map((project, position) => (
              <RevealOnScroll key={project.slug} delay={position * 80}>
                <ProjectCard project={project} size="regular" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-24 md:py-32">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="04" label="How it works" />
          </RevealOnScroll>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, position) => (
              <RevealOnScroll key={step.number} delay={position * 80}>
                <div className="border-t border-ink pt-6">
                  <span className="font-mono-label text-xs text-ink-70">{step.number}</span>
                  <h3 className="font-display mt-3 text-3xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-70">{step.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-green-deep text-cream">
        <div className="container-edge relative py-24 text-center md:py-32">
          <RevealOnScroll>
            <h2 className="font-display mx-auto max-w-3xl text-5xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
              Building something <em className="italic text-signal">creative?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream-70 sm:text-lg">
              Tell me about the project, the look you&rsquo;re after and where it
              needs to land. I&rsquo;ll reply within a couple of working days.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="signal">
                Start a creative project
              </Button>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label inline-flex items-center border border-cream/30 px-7 py-4 text-[11px] text-cream transition-colors duration-300 hover:bg-cream hover:text-green"
              >
                Message on WhatsApp
              </a>
            </div>
            <p className="mt-8">
              <Link
                href="/"
                className="font-mono-label underline-hover text-[11px] text-cream-70 hover:text-cream"
              >
                ← Back to the local business side
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
