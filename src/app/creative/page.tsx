import type { Metadata } from "next";
import Link from "next/link";
import { serviceFamilies, cadenceLabel } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
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

const collaboration = [
  {
    label: "What I'm making",
    text: "A set of edited portfolio photos, short Reels, and an Instagram that is set up and planned.",
  },
  {
    label: "How",
    text: "On location in natural light, with one camera and a tripod. No studio and no budget, so the planning does the work.",
  },
  {
    label: "What you'll see here",
    text: "The finished photos, the Reels with their real view counts and how the Instagram grows. Only real numbers, and nothing goes up until it's final.",
  },
  {
    label: "Ground rules",
    text: "A collaboration, not a client job, agreed in writing first. The model approves everything before it's public and can ask for anything to come down.",
  },
];

export default function CreativePage() {
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
                <Button href="/contact?for=creative" variant="signal">
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
                <div className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden border border-ink/25 bg-cream-2 p-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:origin-left before:scale-x-0 before:bg-signal before:transition-transform before:duration-500 hover:z-10 hover:-translate-y-3 hover:scale-[1.03] hover:border-ink hover:bg-cream hover:shadow-[0_32px_56px_-24px_rgba(28,27,22,0.55)] hover:before:scale-x-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
                  <div>
                    <span className="font-mono-label text-[11px] text-ink-70">{lane.number}</span>
                    <h3 className="font-display mt-4 text-3xl font-medium leading-tight text-ink">
                      {lane.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-70">{lane.blurb}</p>
                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                      {lane.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-ink-70">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-150"
                          />
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
              The creative side is new, so I won&rsquo;t dress it up. I&rsquo;m
              building it properly, starting with a first collaboration, and
              the results go on this page as they&rsquo;re finished.
            </p>
            <div className="mt-10 border border-ink bg-cream p-8">
              <p className="font-mono-label flex items-center gap-2.5 text-[11px] text-ink">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                First collaboration · In production
              </p>
              <p className="font-display mt-4 text-2xl font-medium leading-snug text-ink">
                A starter portfolio and an Instagram, built with an emerging model.
              </p>
              <dl className="mt-8 border-t border-line">
                {collaboration.map((item) => (
                  <div
                    key={item.label}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <dt className="font-mono-label text-[11px] text-ink-70">{item.label}</dt>
                    <dd className="text-sm leading-relaxed text-ink-70">{item.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-ink-70">
                Want to be next? I&rsquo;m taking on a small number of
                collaborations. You get professional-quality content or a
                portfolio site at a reduced rate, and in return I ask for
                permission to feature the work. Everything is agreed in writing
                first.
              </p>
              <div className="mt-6">
                <Button href="/contact?for=creative" variant="primary">
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
            <SectionLabel index="03" label="How it works" />
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
              <Button href="/contact?for=creative" variant="signal">
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
                href="/local-business"
                className="font-mono-label underline-hover text-[11px] text-cream-70 hover:text-cream"
              >
                Need a website or Reels for a local business? →
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
