import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";
import ChristmasOffer from "@/components/ChristmasOffer";
import SelectedWork from "@/components/SelectedWork";
import ReelsShowcase from "@/components/ReelsShowcase";
import Testimonials from "@/components/Testimonials";
import Capabilities from "@/components/Capabilities";
import FreeReview from "@/components/FreeReview";
import FAQ from "@/components/FAQ";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Websites & Reels for local businesses",
  description:
    "Websites, short-form video and ads for trades, shops and workshops, with real client work, real results and starting prices shown up front.",
  alternates: { canonical: "/local-business" },
};

const delay = (ms: number) => ({ animationDelay: `calc(var(--intro-delay, 0s) + ${ms}ms)` });

export default function LocalBusinessPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-edge grid gap-12 pb-16 pt-12 md:grid-cols-12 md:items-end md:gap-8 md:pb-24 md:pt-20">
          <div className="md:col-span-8">
            <SectionLabel label="Local business" />
            <h1 className="font-display mt-8 text-[13vw] font-medium leading-[0.98] tracking-tight text-ink sm:text-[9vw] md:text-[6.4vw] lg:text-[5.5rem]">
              Websites and Reels for local businesses.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-70">
              I build the website, film the short videos and run the ads, so
              people nearby find you, trust you and pick up the phone. Made for
              trades, shops and workshops.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="#work" variant="secondary">
                See the work
              </Button>
            </div>
          </div>

          <a
            href="#reels"
            className="hero-reveal group relative block aspect-[9/16] w-full max-w-[16rem] overflow-hidden bg-green-deep md:col-span-4 md:justify-self-end"
            style={delay(150)}
          >
            <Image
              src="/work/video/reel-reliable-unreliable-sharp.jpg"
              alt="A mechanic at Wheelers Autoworks talking to camera in the workshop, from one of their Reels"
              fill
              priority
              sizes="256px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="font-mono-label absolute bottom-3 left-3 bg-cream px-2.5 py-1.5 text-[11px] text-ink">
              Wheelers Autoworks · Reel
            </span>
          </a>
        </div>
      </section>

      <ChristmasOffer />
      <SelectedWork index="" limit={3} />
      <ReelsShowcase index="" />
      <Testimonials index="" />
      <Capabilities index="" />
      <FreeReview />
      <FAQ index="" omit={["AI agent"]} />
      <AboutPreview />
      <CTASection
        heading="Want more people to find you?"
        copy="Tell me about the business and what isn't working. I'll tell you honestly where to start, and where not to spend."
      >
        <p className="mt-10">
          <Link
            href="/creative"
            className="font-mono-label underline-hover text-[11px] text-ink-70 hover:text-ink"
          >
            Looking for fashion, music or sport content? →
          </Link>
        </p>
      </CTASection>
    </>
  );
}
