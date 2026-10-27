import { freeReview, siteConfig } from "@/lib/data";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";

export default function FreeReview() {
  return (
    <section className="border-b border-line">
      <div className="container-edge py-16 md:py-20">
        <RevealOnScroll>
          <div className="grid gap-10 border border-ink/25 bg-cream-2 px-7 py-10 sm:px-12 md:grid-cols-12 md:items-center md:gap-8 md:px-14 md:py-12">
            <div className="md:col-span-8">
              <p className="font-mono-label text-[11px] text-ink-70">{freeReview.title}</p>
              <h2 className="font-display mt-4 text-3xl font-medium leading-[1.1] text-ink sm:text-4xl md:text-5xl">
                {freeReview.headline}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-70">
                {freeReview.detail}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
              <Button href="/contact">Request my free review</Button>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label underline-hover text-[11px] text-ink"
              >
                Or message {siteConfig.phone} on WhatsApp ↗
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
