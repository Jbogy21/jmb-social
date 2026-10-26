import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import ReelsShowcase from "@/components/ReelsShowcase";
import Capabilities from "@/components/Capabilities";
import FeaturedStatement from "@/components/FeaturedStatement";
import Packages from "@/components/Packages";
import Principles from "@/components/Principles";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ReelsShowcase index="03" />
      <Capabilities index="04" />
      <FeaturedStatement />
      <Packages index="05" />
      <Principles index="06" />
      <Process index="07" />
      <FAQ index="08" />
      <AboutPreview index="09" />
      <CTASection />
    </>
  );
}
