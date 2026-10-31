import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { siteConfig, isChristmasOfferActive } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with JMB Social: tell me what you need help with and I'll come back to you within one to two working days. Call, WhatsApp, email or use the form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-edge grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionLabel label="Contact" />
          <h1 className="font-display mt-6 text-5xl font-medium leading-[1.05] text-ink sm:text-6xl">
            Let&rsquo;s make something good.
          </h1>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-70">
            Tell me about the business or the project and what you need: a
            website, Reels, ads, content for your name in fashion, music or
            sport, or something in between. I read every enquiry myself and
            reply within one to two working days.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label inline-flex items-center justify-center gap-2.5 bg-green px-6 py-4 text-[11px] text-cream transition-colors duration-300 hover:bg-green-deep"
            >
              WhatsApp {siteConfig.phone}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="font-mono-label inline-flex items-center justify-center border border-ink/25 px-6 py-4 text-[11px] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              Call
            </a>
          </div>
          <div className="mt-8 border-t border-line pt-6">
            <p className="font-mono-label text-xs text-ink-70">Or email me directly</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display underline-hover mt-2 block text-xl font-medium text-ink"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-8">
          <ContactForm offerActive={isChristmasOfferActive()} />
        </div>
      </div>
    </section>
  );
}
