import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import PageHero from "@/components/PageHero";
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
    <>
      <PageHero>
        <div className="container-edge grid gap-12 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <SectionLabel label="Contact" tone="cream" />
            <h1 className="mt-6 font-sans text-[clamp(2.6rem,6.4vw,5.5rem)] font-light leading-[0.98] tracking-[-0.045em] text-cream [text-shadow:0_2px_30px_rgba(10,12,8,0.35)]">
              Let&rsquo;s build something{" "}
              <span className="font-display whitespace-nowrap font-normal italic tracking-[-0.03em] text-[#f1e3b0]">
                people notice.
              </span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/85">
              Tell me about the business, the brand or the project and what you need: a website,
              creative direction, content, or something in between. I read every enquiry myself and
              reply within one to two working days.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 text-sm font-medium text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97] md:w-auto"
            >
              WhatsApp {siteConfig.phone}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-4 text-sm text-cream transition-colors duration-300 hover:bg-cream hover:text-ink md:w-auto"
            >
              Call
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display underline-hover mt-2 text-xl font-medium text-cream"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-edge max-w-4xl">
          <ContactForm offerActive={isChristmasOfferActive()} />
        </div>
      </section>
    </>
  );
}
