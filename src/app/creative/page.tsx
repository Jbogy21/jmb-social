import type { Metadata } from "next";
import Link from "next/link";
import { serviceFamilies, cadenceLabel, creativePhotos, siteConfig } from "@/lib/data";
import SectionLabel from "@/components/SectionLabel";
import RevealOnScroll from "@/components/RevealOnScroll";
import RiseHeading from "@/components/RiseHeading";
import ScrollLine from "@/components/ScrollLine";
import PhotoSlot from "@/components/PhotoSlot";
import { Button } from "@/components/Button";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import FirstProjectsOffer from "@/components/FirstProjectsOffer";
import PressOffer from "@/components/PressOffer";
import ReelPane from "@/components/ReelPane";
import { heroScenes } from "@/lib/heroScenes";

export const metadata: Metadata = {
  title: "Creative: fashion, music & modelling",
  description:
    "Portfolios, launch pages and creative direction for models, fashion brands and musicians. First projects at an introductory price, plus a press kit pack.",
  alternates: { canonical: "/creative" },
};

function variantPrice(name: string) {
  for (const family of serviceFamilies) {
    const variant = family.variants.find((v) => v.name === name);
    if (variant) return `${variant.price} ${cadenceLabel[variant.cadence]}`.replace(" one-off", "");
  }
  return "";
}

const lanes = [
  {
    number: "01",
    slug: "models" as const,
    title: "Models & personal brands",
    outcome: "A stronger digital portfolio for people who need to be taken seriously quickly.",
    items: [
      "Portfolio and comp-card websites",
      "Profile and personal-brand direction",
      "Digitals, measurements and profiles kept current and professional",
      "Instagram setup, grid and content plan",
    ],
    note: "I don't push expensive portfolio shoots. I'll work with the photos you have and tell you honestly what is worth adding.",
    price: `Websites from ${variantPrice("Business website")}`,
    ghost: "Portfolio",
    tone: "a" as const,
  },
  {
    number: "02",
    slug: "fashion" as const,
    title: "Fashion & streetwear brands",
    outcome: "A launch page and campaign direction that gives a drop somewhere to land.",
    items: [
      "Drop and launch pages",
      "Product and collection storytelling",
      "A clear route from social to the website",
      "Email capture and customer retention ideas",
      "Campaign concepts and paid social creative",
    ],
    note: "",
    price: `Launch pages from ${variantPrice("Landing pages & funnels")}`,
    ghost: "Drop",
    tone: "b" as const,
  },
  {
    number: "03",
    slug: "music" as const,
    title: "Music, DJs & events",
    outcome: "A release, set or night with somewhere to land, and a route from the post to the fan.",
    items: [
      "Release storytelling and campaign visuals",
      "Artist site, EPK and booking information",
      "Release and event pages",
      "Ticket, merch, mailing-list or streaming pathways",
      "Social content direction",
    ],
    note: "",
    price: `Release and event pages from ${variantPrice("Landing pages & funnels")}`,
    ghost: "Release",
    tone: "c" as const,
  },
];

const keywords = [
  "Reels",
  "Lookbooks",
  "Comp cards",
  "Press kits",
  "Release pages",
  "Launch pages",
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
    <div className="creative-world">
      <section className="grain relative isolate -mt-[81px] overflow-hidden bg-ink pt-[81px] text-cream md:-mt-[97px] md:pt-[97px]">
        <div className="absolute inset-0 -z-10">
          <ReelPane
            scenes={heroScenes.creative}
            direction="down"
            italic
            showWords={false}
            showCaption={false}
            dwell={3600}
          />
          <div className="absolute inset-0 bg-fg/45" />
        </div>
        <div className="container-edge relative pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="hero-reveal flex items-center gap-3 font-mono-label text-xs text-cream-70">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            <span>JMB / Creative</span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 className="font-display text-[15vw] font-medium leading-[0.84] tracking-tight sm:text-[14.5vw] lg:col-span-8 lg:text-[min(9.5rem,10.3vw)]">
              <span className="block">Fashion,</span>
              <span className="block italic text-signal">music</span>
              <span className="block whitespace-nowrap">&amp; modelling.</span>
            </h1>

            <div className="lg:col-span-4">
              <p className="max-w-sm text-lg leading-relaxed text-cream/90">
                Portfolios, launch pages and creative direction for models, fashion brands,
                musicians and DJs. Your work, presented properly.
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

      <div className="overflow-hidden bg-signal py-4 text-ink" aria-hidden="true">
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

      <section
        id="lanes"
        className="ember-glow-r relative scroll-mt-20 border-b border-white/10 py-24 md:py-32"
      >
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="01" label="What I make" />
          </RevealOnScroll>
          <RiseHeading
            text="Creative direction for people building something worth noticing."
            className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl lg:text-6xl"
          />
          <RevealOnScroll delay={100}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-70">
              Presentation, not hype. The profile, portfolio and launch pages that give your
              work somewhere good to land.
            </p>
          </RevealOnScroll>

          <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
            {lanes.map((lane, position) => {
              const flipped = position % 2 === 1;

              return (
                <article key={lane.slug} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                  <RevealOnScroll
                    className={`reveal-wipe lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}
                  >
                    <PhotoSlot
                      photo={creativePhotos[lane.slug]}
                      ghost={lane.ghost}
                      tone={lane.tone}
                      label={`${lane.number} · ${lane.title.split(" ")[0]}`}
                      aspect="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
                    />
                  </RevealOnScroll>

                  <RevealOnScroll
                    className={`group/reveal lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}
                    delay={120}
                  >
                    <span className="font-mono-label text-[11px] text-fg-70">{lane.number}</span>
                    <h3 className="font-display mt-3 text-4xl font-medium leading-[1.02] text-fg sm:text-5xl lg:text-6xl">
                      {lane.title}
                    </h3>
                    <p className="font-display mt-5 max-w-xl text-xl italic leading-snug text-signal-soft sm:text-2xl">
                      {lane.outcome}
                    </p>

                    <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-white/12 pt-6 sm:grid-cols-2">
                      {lane.items.map((item, k) => (
                        <li
                          key={item}
                          className="flex translate-y-3 gap-3 text-sm leading-relaxed text-fg-70 opacity-0 transition-[opacity,transform] duration-700 group-[.is-visible]/reveal:translate-y-0 group-[.is-visible]/reveal:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
                          style={{ transitionDelay: `${350 + k * 90}ms` }}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {lane.note && (
                      <p className="mt-6 max-w-lg border-l-2 border-signal/70 pl-4 text-sm leading-relaxed text-fg-70">
                        {lane.note}
                      </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                      <p className="font-mono-label text-[11px] text-fg">{lane.price}</p>
                      <Link
                        href="/contact?for=creative"
                        className="font-mono-label underline-hover inline-flex min-h-8 items-center text-[11px] text-fg-70 hover:text-fg"
                      >
                        Ask about this →
                      </Link>
                    </div>
                  </RevealOnScroll>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 py-24 md:py-32">
        <div className="container-edge grid gap-12 lg:grid-cols-12 lg:gap-14">
          <RevealOnScroll className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel index="02" label="Where I am" />
              <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl lg:text-6xl">
                New to this world. <em className="italic text-signal-soft">Serious</em> about it.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-70">
                The creative side is new, so I won&rsquo;t dress it up. I&rsquo;m building it
                properly, starting with a first collaboration, and the results go on this page
                as they&rsquo;re finished.
              </p>
              <p className="mt-8">
                <Link
                  href="#first-projects"
                  className="font-mono-label underline-hover inline-flex min-h-8 items-center text-[11px] text-fg hover:text-signal-soft"
                >
                  Want to be next? See the first projects offer →
                </Link>
              </p>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {creativePhotos.collaboration.map((photo, position) => (
                <RevealOnScroll key={position} className="reveal-wipe" delay={position * 110}>
                  <PhotoSlot
                    photo={photo}
                    ghost={["Set", "Look", "Cut"][position]}
                    tone={(["a", "b", "c"] as const)[position]}
                    aspect="aspect-[3/4]"
                    sizes="(min-width: 1024px) 18vw, 30vw"
                  />
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll className="mt-6">
              <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 sm:p-8">
                <p className="font-mono-label flex items-center gap-2.5 text-[11px] text-fg">
                  <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                  First collaboration · In production
                </p>
                <p className="font-display mt-4 text-2xl font-medium leading-snug text-fg sm:text-3xl">
                  A starter portfolio and an Instagram, built with an emerging model.
                </p>
                <dl className="mt-8 border-t border-white/12">
                  {collaboration.map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-2 border-b border-white/12 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                    >
                      <dt className="font-mono-label text-[11px] text-fg-70">{item.label}</dt>
                      <dd className="text-sm leading-relaxed text-fg-70">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <FirstProjectsOffer index="03" />

      <PressOffer index="04" />

      <section className="relative border-b border-white/10 py-24 md:py-32">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="05" label="How it works" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Three steps, and you approve every one.
            </h2>
          </RevealOnScroll>

          <ScrollLine className="relative mt-14">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/15 md:block"
            />
            <span
              aria-hidden="true"
              className="scroll-line-h absolute left-0 right-0 top-[18px] hidden h-[3px] rounded-full bg-gradient-to-r from-signal to-signal-soft md:block"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[19px] top-0 w-px bg-white/15 md:hidden"
            />
            <span
              aria-hidden="true"
              className="scroll-line-v absolute bottom-0 left-[18px] top-0 w-[3px] rounded-full bg-gradient-to-b from-signal to-signal-soft md:hidden"
            />
            <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step, position) => (
                <li key={step.number} className="relative pl-16 md:pl-0 md:pt-16">
                  <span
                    aria-hidden="true"
                    className="font-mono-label absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-signal bg-[#130d0a] text-[11px] text-cream"
                  >
                    {step.number}
                  </span>
                  <RevealOnScroll delay={position * 90}>
                    <h3 className="font-display text-3xl font-medium text-fg">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-70">{step.text}</p>
                  </RevealOnScroll>
                </li>
              ))}
            </ol>
          </ScrollLine>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[radial-gradient(60%_90%_at_50%_100%,rgba(228,87,46,0.28),transparent_70%)] text-cream">
        <div className="container-edge relative py-24 text-center md:py-32">
          <RevealOnScroll>
            <h2 className="font-display mx-auto max-w-3xl text-5xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
              Ready to present your work{" "}
              <em className="italic text-signal">properly?</em>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-cream/90 sm:text-lg">
              Tell me about the project, the look you&rsquo;re after and where it needs to land.
              I&rsquo;ll reply within a couple of working days.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/contact?for=creative" variant="signal">
                Start a creative project
              </Button>
              <ScheduleCallButton />
            </div>
            <p className="mt-8">
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label underline-hover inline-flex min-h-8 items-center text-[11px] text-cream hover:text-white"
              >
                Or message me on WhatsApp ↗
              </a>
            </p>
            <p className="mt-2">
              <Link
                href="/local-business"
                className="font-mono-label underline-hover inline-flex min-h-8 items-center text-[11px] text-cream-70 hover:text-cream"
              >
                Need a website or Reels for a local business? →
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
