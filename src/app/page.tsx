import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Positioning from "@/components/Positioning";
import ServicesOverview from "@/components/ServicesOverview";
import FeaturedStatement from "@/components/FeaturedStatement";
import Process from "@/components/Process";
import AboutPreview from "@/components/AboutPreview";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Positioning />
      <ServicesOverview />
      <FeaturedStatement />
      <Process />
      <AboutPreview />
      <CTASection />
    </>
  );
}
