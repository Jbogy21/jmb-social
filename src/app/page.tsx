import type { Metadata } from "next";
import Intro from "@/components/Intro";
import HomeHero from "@/components/HomeHero";
import ChapterStage from "@/components/ChapterStage";
import Chapter from "@/components/Chapter";
import ServiceStage from "@/components/ServiceStage";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";
import { stagePanels } from "@/lib/data";
import { heroScenes } from "@/lib/heroScenes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const chapters = [
  <Chapter
    key="trades"
    side="trades"
    eyebrow="01 · Local business"
    title={
      <>
        Run a trade, shop or{" "}
        <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">
          workshop?
        </span>
      </>
    }
    body="Before they call, people look you up. I build the website that makes you easy to find, the Reels that show your work, and the ads that put you in front of people nearby."
    pills={["Websites", "Reels", "Ads"]}
    proof={{ text: "111.2K combined views on three Reels made for a local garage." }}
    cta={{ label: "Yes, that's me", href: "/local-business" }}
    link={{ label: "Every service and price", href: "/services" }}
    scenes={heroScenes.trades}
  />,
  <Chapter
    key="creative"
    side="creative"
    eyebrow="02 · Fashion, music & sport"
    title={
      <>
        Building a name in{" "}
        <span className="font-display italic font-normal tracking-[-0.03em] text-signal-soft">
          fashion, music or sport?
        </span>
      </>
    }
    body="Portfolio sites, content and an Instagram that looks the part, for models, artists and athletes who want to be seen properly."
    pills={["Portfolios", "Content", "Instagram"]}
    proof={{ text: "First creative collaboration, in production now.", live: true }}
    cta={{ label: "Yes, that's me", href: "/creative" }}
    link={{ label: "See how it works", href: "/creative" }}
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
        skipTo="#what-i-do"
      />
      <ServiceStage panels={stagePanels} skipTo="#about-me" />
      <AboutPreview paragraphs={1} />
      <CTASection />
    </>
  );
}
