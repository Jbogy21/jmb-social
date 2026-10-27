import { siteConfig } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message JMB Social on WhatsApp"
      className="font-mono-label group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 bg-green px-4 py-3.5 text-[11px] text-cream shadow-[0_14px_30px_-12px_rgba(38,46,25,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" />
        <path d="M9 8.8c0 3.3 2.9 6.2 6.2 6.2l1.3-1.5-2-1-.9.7a4 4 0 0 1-1.8-1.8l.7-.9-1-2z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
