import Link from "next/link";
import { christmasOffer, isChristmasOfferActive } from "@/lib/data";
import Snowflake from "./Snowflake";

export default function AnnouncementBar() {
  if (!isChristmasOfferActive()) return null;

  return (
    <Link
      href="/contact"
      className="group flex items-center justify-center gap-3 bg-ink px-4 py-2.5 text-center text-cream transition-colors duration-300 hover:bg-green-deep"
    >
      <Snowflake size={14} className="shrink-0 text-sage" />
      <span className="font-mono-label text-[11px] leading-snug sm:text-[11px]">
        <span className="sm:hidden">{christmasOffer.short}</span>
        <span className="hidden sm:inline">
          {christmasOffer.short} · book by {christmasOffer.endsLabel}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="font-mono-label text-[11px] transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
