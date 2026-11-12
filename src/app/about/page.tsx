import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import PageHero from "@/components/PageHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import FounderCard from "@/components/FounderCard";
import Principles from "@/components/Principles";
import CTASection from "@/components/CTASection";
import { background, founder, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "JMB Social is a founder-led digital studio, founded in West Sussex. You work directly with Jackson on websites, creative direction and digital builds.",
  alternates: { canonical: "/about" },
};

const routes = [
  {
    title: "Local business & trades",
    description:
      "For builders, landscapers, garages and workshops: a website, project content and a clear route to an enquiry, built so customers can trust you before they call.",
  },
  {
    title: "Creative, campaign & PR",
    description:
      "For models, fashion brands, musicians and DJs: portfolios, launch pages and creative direction that present your work properly and give it somewhere to land.",
  },
  {
    title: "Digital builds",
    description:
      "For either: AI agents, apps, client portals and workflow tools, scoped around one real problem in your business.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero>
        <div className="container-edge grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel label="About" tone="cream" />
            <h1 className="mt-6 font-sans text-[clamp(2.6rem,6.4vw,5.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)]">
              Built to be <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">hands-on.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/85">
              JMB Social is a founder-led digital studio, founded in West
              Sussex and working with local businesses, brands and emerging
              talent across Sussex, Surrey and London.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/90">
              You work with me directly, from the first conversation to the
              finished work. There&rsquo;s no account manager and no
              hand-off: the person planning your project is the person doing
              it.
            </p>
            {siteConfig.social.linkedin && (
              <div className="mt-8">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-label underline-hover inline-flex items-center gap-2 text-xs text-cream"
                >
                  Connect with the founder on LinkedIn ↗
                </a>
              </div>
            )}
          </div>

          <div className="aspect-[4/5]">
            <FounderCard />
          </div>
        </div>
      </PageHero>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
          <RevealOnScroll className="md:col-span-4">
            <SectionLabel label="From the founder" />
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              {founder.intro}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll className="md:col-span-8">
            <div className="flex max-w-2xl flex-col gap-5">
              {founder.story.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-fg-70">
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
          <RevealOnScroll className="md:col-span-4">
            <SectionLabel label="Background" />
            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Where the work comes from.
            </h2>
          </RevealOnScroll>
          <div className="md:col-span-8">
            <ul className="border-t border-line">
              {background.map((item, position) => (
                <li key={item.org} className="border-b border-line">
                  <RevealOnScroll delay={position * 80}>
                    <div className="grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:gap-10">
                    <div>
                      <h3 className="font-display text-2xl font-medium leading-tight text-fg">
                        {item.role},{" "}
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-hover"
                          >
                            {item.org}
                          </a>
                        ) : (
                          item.org
                        )}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-70">
                        {item.description}
                      </p>
                    </div>
                    <p className="font-mono-label text-[11px] text-fg-50 sm:text-right">
                      {item.dates}
                    </p>
                  </div>
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge">
          <RevealOnScroll>
            <SectionLabel index="—" label="Who I work with" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              Two kinds of client, one studio.
            </h2>
          </RevealOnScroll>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {routes.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 70}>
                <div className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-7 sm:p-8">
                  <h3 className="font-display text-2xl font-medium text-fg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-70">{item.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20 md:py-28">
        <div className="container-edge grid gap-10 md:grid-cols-12 md:gap-8">
          <RevealOnScroll className="md:col-span-4">
            <SectionLabel label="How we work" />
          </RevealOnScroll>
          <RevealOnScroll className="md:col-span-8">
            <p className="font-display max-w-2xl text-3xl font-medium leading-[1.2] text-fg sm:text-4xl">
              Clients get direct, hands-on attention from the person doing the work, not layers of
              agency account management.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-70">
              Every project starts the same way: understand what you actually need, design and build
              it properly, and show you the work as it goes. I&rsquo;ll tell you honestly what is
              worth doing and what isn&rsquo;t, and nothing is promised that I can&rsquo;t control.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <Principles index="—" />

      <CTASection
        heading="Let's start with a conversation."
        copy="Tell me where things are now and where you want them to go. I'll tell you honestly whether I'm the right fit."
      />
    </>
  );
}
