import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import ChristmasOffer from "@/components/ChristmasOffer";
import SelectedWork from "@/components/SelectedWork";
import ReelsShowcase from "@/components/ReelsShowcase";
import CallSheet from "@/components/CallSheet";
import PriceEstimator from "@/components/PriceEstimator";
import { isChristmasOfferActive } from "@/lib/data";
import Testimonials from "@/components/Testimonials";
import Capabilities from "@/components/Capabilities";
import LocalServices from "@/components/LocalServices";
import FreeReview from "@/components/FreeReview";
import FAQ from "@/components/FAQ";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";
import ReelPane from "@/components/ReelPane";
import { heroScenes } from "@/lib/heroScenes";

export const metadata: Metadata = {
  title: "Websites & Reels for local businesses",
  description:
    "Websites, short-form video and ads for trades, shops and workshops, with real client work, real results and starting prices shown up front.",
  alternates: { canonical: "/local-business" },
};

export default function LocalBusinessPage() {
  return (
    <>
      <section className="grain relative isolate -mt-[81px] overflow-hidden bg-ink pt-[81px] text-cream md:-mt-[97px] md:pt-[97px]">
        <div className="absolute inset-0 -z-10">
          <ReelPane scenes={heroScenes.trades} showWords={false} showCaption={false} dwell={3600} />
          <div className="absolute inset-0 bg-fg/50" />
        </div>
        <div className="container-edge relative pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="max-w-4xl">
            <SectionLabel label="Local business" tone="cream" />
            <h1 className="font-display mt-8 text-[13vw] font-medium leading-[0.98] tracking-tight text-cream [text-shadow:0_2px_22px_rgba(10,12,8,0.55)] sm:text-[9vw] md:text-[6.4vw] lg:text-[5.5rem]">
              Websites and Reels for local businesses.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
              Helping local businesses look more professional online, build
              trust and make it easier for customers to enquire. Made for
              trades, shops and workshops.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" variant="light">
                Start a project
              </Button>
              <Button href="#reels" variant="ghost" arrow>
                Watch the Reels
              </Button>
            </div>
            <p className="mt-6">
              <Link
                href="#work"
                className="font-mono-label underline-hover inline-flex min-h-8 items-center text-[11px] text-cream/80 hover:text-cream"
              >
                See the websites →
              </Link>
            </p>
          </div>

        </div>
      </section>

      <ChristmasOffer />
      <SelectedWork index="" limit={3} />
      <ReelsShowcase index="" />
      <CallSheet />
      <Testimonials index="" />
      <LocalServices index="" />
      <Capabilities index="" />
      <PriceEstimator offerActive={isChristmasOfferActive()} />
      <FreeReview />
      <FAQ index="" omit={["AI agent", "press coverage"]} />
      <AboutPreview />
      <CTASection
        heading="Want more people to find you?"
        copy="Tell me about the business and what isn't working. I'll tell you honestly where to start, and where not to spend."
      >
        <p className="mt-10">
          <Link
            href="/creative"
            className="font-mono-label underline-hover text-[11px] text-fg-70 hover:text-fg"
          >
            Looking for fashion, music or modelling content? →
          </Link>
        </p>
      </CTASection>
    </>
  );
}
