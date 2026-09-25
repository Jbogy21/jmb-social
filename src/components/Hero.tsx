import { Button } from "./Button";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-edge pb-16 pt-14 md:pb-24 md:pt-20">
        <div
          className="hero-reveal flex flex-col gap-3 font-mono-label text-xs text-ink-70 sm:flex-row sm:items-center sm:gap-4"
          style={{ animationDelay: "0ms" }}
        >
          <span>JMB / 001</span>
          <span className="hidden h-px w-8 bg-ink-70 sm:block" aria-hidden="true" />
          <span>{siteConfig.descriptor}</span>
          <span className="hidden h-px w-8 bg-ink-70 sm:block" aria-hidden="true" />
          <span>
            {siteConfig.location} / {siteConfig.foundedYear}
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <h1
            className="hero-reveal font-display col-span-8 text-[13vw] font-medium leading-[0.98] tracking-tight text-ink sm:text-[9vw] md:text-[5.4vw] lg:text-[76px]"
            style={{ animationDelay: "80ms" }}
          >
            Make your business impossible to ignore.
          </h1>

          <div
            className="hero-reveal col-span-4 flex flex-col justify-end gap-8"
            style={{ animationDelay: "180ms" }}
          >
            <p className="max-w-sm text-lg leading-relaxed text-ink-70">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="secondary">
                See our work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
