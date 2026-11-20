import type { Metadata } from "next";
import Intro from "@/components/Intro";
import HomeHero from "@/components/HomeHero";
import ChapterStage from "@/components/ChapterStage";
import Chapter from "@/components/Chapter";
import ServiceStage from "@/components/ServiceStage";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";
import { stagePanels, wheelersReelsTotal, wheelersReelsCount } from "@/lib/data";
import { heroScenes } from "@/lib/heroScenes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const chapters = [
  <Chapter
    key="trades"
    side="trades"
    eyebrow="01 · Local business & trades"
    title={
      <>
        Run a trade, shop or{" "}
        <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">
          workshop?
        </span>
      </>
    }
    body="Before they call, people look you up. I help local businesses look more professional online, build trust and make it easier for customers to enquire."
    pills={["Websites", "Trust & proof", "Project content"]}
    proof={{ text: `${wheelersReelsTotal} combined views on ${wheelersReelsCount} Reels made for a local garage.` }}
    cta={{ label: "Yes, that's me", href: "/local-business" }}
    link={{ label: "Every service and price", short: "See prices", href: "/services" }}
    scenes={heroScenes.trades}
  />,
  <Chapter
    key="creative"
    side="creative"
    eyebrow="02 · Creative profile, campaign & PR"
    title={
      <>
        Building a name in{" "}
        <span className="font-display italic font-normal tracking-[-0.03em] text-signal-soft">
          fashion, music or modelling?
        </span>
      </>
    }
    body="Helping creative people and brands present themselves properly, build a stronger image and create more opportunities."
    pills={["Portfolios", "Campaigns", "Press kits"]}
    proof={{ text: "First creative collaboration, in production now.", live: true }}
    cta={{ label: "Yes, that's me", href: "/creative" }}
    link={{ label: "See the creative side", short: "See more", href: "/creative" }}
    scenes={heroScenes.creative}
    flip
  />,
];

export default function Home() {
  return (
    <>
      <Intro />
      <HomeHero />
      <ChapterStage
        chapters={chapters}
        cues={["Scroll for the creative side", "Scroll to continue"]}
        shortCues={["Scroll for creative", "Scroll to continue"]}
        skipTo="#what-i-do"
      />
      <ServiceStage panels={stagePanels} skipTo="#about-me" />
      <AboutPreview paragraphs={1} />
      <CTASection />
    </>
  );
}
