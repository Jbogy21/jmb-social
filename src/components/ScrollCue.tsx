// A small animated prompt telling the visitor to scroll: a circle with a drifting arrow.
// `compact` shrinks it on phones, where `shortLabel` can stand in for a long label.
export default function ScrollCue({
  href,
  label,
  shortLabel,
  compact = false,
  className = "",
}: {
  href: string;
  label: string;
  shortLabel?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center text-cream/90 transition-colors hover:text-white ${
        compact ? "gap-2.5 text-[13px] sm:gap-3 sm:text-sm" : "gap-3 text-sm"
      } ${className}`}
    >
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/35 transition-colors duration-300 group-hover:border-white/70 group-hover:bg-white/10 ${
          compact ? "h-9 w-9 sm:h-11 sm:w-11" : "h-11 w-11"
        }`}
      >
        <span aria-hidden="true" className="scroll-cue-arrow text-base leading-none">
          ↓
        </span>
      </span>
      {shortLabel ? (
        <>
          <span className="whitespace-nowrap sm:hidden">{shortLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </a>
  );
}
