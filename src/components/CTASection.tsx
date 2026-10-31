import type { ReactNode } from "react";
import { Button } from "./Button";
import RevealOnScroll from "./RevealOnScroll";

export default function CTASection({
  heading = "Got something in mind?",
  copy = "Tell me what you're working on and where you want it to go. I'll come back with a plan and a clear price.",
  ctaLabel = "Start a project",
  ctaHref = "/contact",
  children,
}: {
  heading?: string;
  copy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-t border-line bg-cream">
      <div className="container-edge py-16 sm:py-24 md:py-32">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-70 sm:text-lg">{copy}</p>
          <div className="mt-10 flex justify-center">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
          {children}
        </RevealOnScroll>
      </div>
    </section>
  );
}
