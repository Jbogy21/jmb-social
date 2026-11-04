import { siteConfig } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp: message JMB Social"
      className="font-mono-label group fixed bottom-4 right-4 z-40 inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-[#1b2113]/85 px-3.5 text-[11px] text-cream shadow-[0_14px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-cream hover:text-ink active:scale-95 sm:bottom-5 sm:right-5 sm:px-5"
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
