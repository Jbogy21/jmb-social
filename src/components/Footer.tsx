import Link from "next/link";
import { StackedLogo } from "./Logo";
import { siteConfig, navLinks, serviceFamilies } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green text-cream">
      <div className="container-edge grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:py-24">
        <div className="max-w-sm">
          <StackedLogo />
          <p className="mt-6 text-sm leading-relaxed text-cream-70">
            Websites, short-form video and ads for local businesses, and
            content and portfolios for people building a name in fashion,
            music and sport.
          </p>
        </div>

        <div>
          <p className="font-mono-label text-[11px] text-cream-50">Services</p>
          <ul className="mt-5 flex flex-col gap-3">
            {serviceFamilies.map((family) => (
              <li key={family.slug}>
                <Link
                  href={`/services#${family.slug}`}
                  className="underline-hover text-cream/90 hover:text-cream"
                >
                  {family.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-label text-[11px] text-cream-50">Navigate</p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline-hover text-cream/90 hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="underline-hover inline-flex items-center gap-1.5 text-cream/90 hover:text-cream"
              >
                Instagram
                <ExternalArrow />
              </a>
            </li>
            {siteConfig.social.linkedin && (
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-hover inline-flex items-center gap-1.5 text-cream/90 hover:text-cream"
                >
                  LinkedIn
                  <ExternalArrow />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-mono-label text-[11px] text-cream-50">Get in touch</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-display mt-5 block text-2xl font-medium leading-snug text-cream hover:text-sage"
          >
            {siteConfig.email}
          </a>
          <a
            href={siteConfig.phoneHref}
            className="font-display mt-3 block text-2xl font-medium leading-snug text-cream hover:text-sage"
          >
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="underline-hover mt-4 inline-flex items-center gap-1.5 text-cream/90 hover:text-cream"
          >
            Message on WhatsApp
            <ExternalArrow />
          </a>
          <p className="font-mono-label mt-6 text-[11px] text-cream-50">
            {siteConfig.location} / {siteConfig.foundedYear}
          </p>
        </div>
      </div>

      <div className="border-t border-line-on-green">
        <div className="container-edge flex flex-col gap-2 py-6 text-xs text-cream-50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} JMB Social. All rights reserved.</p>
          <p className="flex items-center gap-5">
            <Link href="/privacy" className="underline-hover hover:text-cream">
              Privacy notice
            </Link>
            <span>{siteConfig.descriptor}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ExternalArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 8L8 2M8 2H3.5M8 2V6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
