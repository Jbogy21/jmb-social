import type { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How JMB Social collects, uses and protects the personal information you share with us.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who I am",
    body: [
      `JMB Social is a UK web, content and advertising studio run by Jackson Booker. If you have any questions about this notice or your information, contact ${siteConfig.email} or ${siteConfig.phone}.`,
    ],
  },
  {
    title: "What I collect and why",
    body: [
      "When you use the contact form, I collect the details you choose to give me: your name, email address, and optionally your company, website, budget, what you need help with and a message. I use them to reply to you, discuss your project and send a quote.",
      "If you contact me by email, phone or WhatsApp, I will see your name, number or address and whatever you send.",
      "My lawful basis is taking steps at your request before a contract (answering your enquiry and quoting), and my legitimate interest in running a small business.",
    ],
  },
  {
    title: "Analytics and cookies",
    body: [
      "This site uses Vercel Web Analytics to count visits and see which pages are used. It does not use cookies for tracking, does not follow you across other sites and does not build a profile of you. I do not use advertising cookies.",
    ],
  },
  {
    title: "Who else sees your information",
    body: [
      "I use a small number of trusted services to run the site and answer you: Vercel (website hosting and analytics), Resend (which delivers contact-form messages to my inbox), Google (my email inbox) and, if you message me there, WhatsApp (Meta). They process information on my behalf. I do not sell your information or share it for marketing.",
    ],
  },
  {
    title: "How long I keep it",
    body: [
      "I keep enquiries for as long as I need to deal with them and for up to 24 months afterwards in case you come back to me. If you become a client, I keep project records for as long as needed to deliver the work and meet my legal and accounting obligations.",
    ],
  },
  {
    title: "Marketing",
    body: [
      "I will not add you to a mailing list without asking you first. If you take up an offer such as the Christmas offer or a free website review, I use your details only to deal with that.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to see the information I hold about you, have it corrected or deleted, restrict or object to how I use it, or ask for a copy of it. Contact me using the details above and I will reply promptly.",
      "If you are unhappy with how I handle your information, you can complain to the Information Commissioner's Office at ico.org.uk. I would appreciate the chance to put things right first.",
    ],
  },
  {
    title: "Changes",
    body: ["I may update this notice. The date below shows when it was last changed."],
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-edge grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionLabel label="Privacy" />
          <h1 className="font-display mt-6 text-5xl font-medium leading-[1.05] text-ink sm:text-6xl">
            Privacy notice.
          </h1>
          <p className="font-mono-label mt-8 text-[11px] text-ink-70">Last updated 27 October 2026</p>
        </div>

        <div className="md:col-span-8">
          <div className="max-w-2xl border-t border-line">
            {sections.map((section) => (
              <section key={section.title} className="border-b border-line py-8">
                <h2 className="font-display text-2xl font-medium text-ink">{section.title}</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-relaxed text-ink-70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
