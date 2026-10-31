import type { Metadata } from "next";
import Intro from "@/components/Intro";
import ChoiceScreen from "@/components/ChoiceScreen";
import ScrollStatement from "@/components/ScrollStatement";
import ServiceStage from "@/components/ServiceStage";
import RecentWork from "@/components/RecentWork";
import Testimonials from "@/components/Testimonials";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";
import { stagePanels } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Intro />
      <ChoiceScreen />
      <ScrollStatement />
      <ServiceStage panels={stagePanels} />
      <RecentWork />
      <Testimonials index="" />
      <AboutPreview paragraphs={1} />
      <CTASection />
    </>
  );
}
