import type { ReactNode } from "react";
import { Button } from "./Button";
import ScheduleCallButton from "./ScheduleCallButton";
import RevealOnScroll from "./RevealOnScroll";
import RiseHeading from "./RiseHeading";
import { siteConfig } from "@/lib/data";

// The ending of a page: a big headline, one friendly line, and the two ways in (start a
// project, or book a call), with a phone chip so there is a person behind it.
export default function CTASection({
  heading = "Let's build something people notice.",
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
    <section className="border-t border-line bg-transparent">
      <div className="container-edge py-20 sm:py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-8">
          <RevealOnScroll className="md:col-span-7">
            <p className="font-mono-label text-[11px] text-fg-70">[ Get in touch ]</p>
            <RiseHeading
              text={heading}
              className="font-display mt-6 text-5xl font-medium leading-[1] text-fg sm:text-6xl lg:text-7xl"
            />
          </RevealOnScroll>

          <RevealOnScroll className="md:col-span-5" delay={120}>
            <p className="max-w-md text-base leading-relaxed text-fg-70 sm:text-lg">{copy}</p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button href={ctaHref}>{ctaLabel}</Button>
              <ScheduleCallButton />
            </div>
            {children}
            <a
              href={siteConfig.phoneHref}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] py-2 pl-2 pr-5 text-sm text-fg transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <span
                aria-hidden="true"
                className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-cream text-lg font-semibold text-ink"
              >
                J
              </span>
              <span>
                <span className="font-mono-label block text-[10px] text-fg-70">Call or text Jackson</span>
                {siteConfig.phone}
              </span>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
