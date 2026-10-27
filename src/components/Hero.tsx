import Link from "next/link";
import { Button } from "./Button";
import ServiceIcon from "./ServiceIcon";
import { siteConfig, serviceFamilies, coreServiceSlugs } from "@/lib/data";

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
            className="hero-reveal font-display md:col-span-8 text-[13vw] font-medium leading-[0.98] tracking-tight text-ink sm:text-[9vw] md:text-[5.4vw] lg:text-[76px]"
            style={{ animationDelay: "80ms" }}
          >
            Make your business impossible to ignore.
          </h1>

          <div
            className="hero-reveal flex flex-col justify-end gap-8 md:col-span-4"
            style={{ animationDelay: "180ms" }}
          >
            <p className="max-w-sm text-lg leading-relaxed text-ink-70">
              {siteConfig.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="secondary">
                See our work
              </Button>
            </div>
          </div>
        </div>

        <div
          className="hero-reveal mt-14 border-t border-line pt-6 md:mt-20"
          style={{ animationDelay: "280ms" }}
        >
          <p className="font-mono-label text-[11px] text-ink-70">What we do</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {serviceFamilies
              .filter((family) => coreServiceSlugs.includes(family.slug))
              .map((family) => (
                <Link
                  key={family.slug}
                  href={`/services#${family.slug}`}
                  className="font-mono-label group inline-flex items-center gap-2.5 bg-green px-4 py-3 text-[11px] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_12px_20px_-12px_rgba(28,27,22,0.6)]"
                >
                  <ServiceIcon
                    slug={family.slug}
                    size={16}
                    className="text-sage transition-colors duration-300 group-hover:text-cream"
                  />
                  {family.shortTitle}
                </Link>
              ))}
            <Link
              href="/services"
              className="font-mono-label inline-flex items-center border border-ink/40 px-4 py-3 text-[11px] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              Apps, AI, ads &amp; SEO →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
