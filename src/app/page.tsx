import type { Metadata } from "next";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import ChristmasOffer from "@/components/ChristmasOffer";
import SelectedWork from "@/components/SelectedWork";
import ReelsShowcase from "@/components/ReelsShowcase";
import Testimonials from "@/components/Testimonials";
import Capabilities from "@/components/Capabilities";
import FreeReview from "@/components/FreeReview";
import Packages from "@/components/Packages";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <ChristmasOffer />
      <SelectedWork />
      <ReelsShowcase index="03" />
      <Testimonials index="04" />
      <Capabilities index="05" />
      <FreeReview />
      <Packages index="06" />
      <Process index="07" />
      <FAQ index="08" />
      <AboutPreview index="09" />
      <CTASection />
    </>
  );
}
