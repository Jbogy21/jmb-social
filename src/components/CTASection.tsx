import { Button } from "./Button";
import RevealOnScroll from "./RevealOnScroll";

export default function CTASection({
  heading = "Got something in mind?",
  copy = "A new website, an app, an AI agent to take work off your plate, or ads that finally have a strategy behind them. Tell us where you want the business to be and we'll map the route.",
  ctaLabel = "Start a project",
  ctaHref = "/contact",
}: {
  heading?: string;
  copy?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="border-t border-line bg-cream">
      <div className="container-edge py-24 md:py-32">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-70 sm:text-lg">{copy}</p>
          <div className="mt-10 flex justify-center">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
