// A small animated prompt telling the visitor to scroll: a circle with a drifting arrow.
export default function ScrollCue({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 text-sm text-cream/90 transition-colors hover:text-white ${className}`}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/35 transition-colors duration-300 group-hover:border-white/70 group-hover:bg-white/10">
        <span aria-hidden="true" className="scroll-cue-arrow text-base leading-none">
          ↓
        </span>
      </span>
      {label}
    </a>
  );
}
