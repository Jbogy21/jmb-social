import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with JMB Social — tell us what you need help with and your approximate budget, and we'll come back to you within one to two working days.",
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
            Tell us about the business and what you need: a new site, an app,
            an AI agent, ad management or something in between. We read every
            enquiry personally and reply within one to two working days.
          </p>
          <div className="mt-10 border-t border-line pt-6">
            <p className="font-mono-label text-xs text-ink-50">Or email us directly</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display underline-hover mt-2 block text-xl font-medium text-ink"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
