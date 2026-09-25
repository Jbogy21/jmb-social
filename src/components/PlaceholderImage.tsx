const gradients: Record<string, string> = {
  green:
    "linear-gradient(155deg, #4a5633 0%, #333d22 48%, #20260f 100%)",
  charcoal:
    "linear-gradient(155deg, #37362e 0%, #201f19 55%, #131209 100%)",
  sage: "linear-gradient(155deg, #c3c6ac 0%, #a7ab8f 45%, #7d8266 100%)",
  cream: "linear-gradient(155deg, #efe8d4 0%, #e3dabd 50%, #cfc4a0 100%)",
};

const labelTone: Record<string, string> = {
  green: "text-cream-70",
  charcoal: "text-cream-70",
  sage: "text-ink-70",
  cream: "text-ink-70",
};

export default function PlaceholderImage({
  accent = "green",
  label,
  tag,
  className = "",
}: {
  accent?: "green" | "charcoal" | "sage" | "cream";
  label?: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={`grain relative flex h-full w-full items-end justify-between overflow-hidden ${className}`}
      style={{ backgroundImage: gradients[accent] }}
      role="img"
      aria-label={label ?? "Placeholder image — photography to be added"}
    >
      <svg
        className="pointer-events-none absolute -right-10 -top-10 opacity-[0.14]"
        width="220"
        height="220"
        viewBox="0 0 220 220"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="110" cy="110" r="90" stroke="currentColor" strokeWidth="1" className={labelTone[accent]} />
        <circle cx="110" cy="110" r="60" stroke="currentColor" strokeWidth="1" className={labelTone[accent]} />
      </svg>

      {tag && (
        <span
          className={`font-mono-label absolute left-5 top-5 rounded-none border px-2.5 py-1 text-[10px] ${labelTone[accent]} border-current/40`}
        >
          {tag}
        </span>
      )}

      {label && (
        <span className={`font-mono-label relative z-10 p-5 text-[10px] leading-relaxed ${labelTone[accent]}`}>
          {label}
        </span>
      )}

      <span
        className={`font-mono-label absolute bottom-5 right-5 text-[9px] opacity-60 ${labelTone[accent]}`}
      >
        Imagery — placeholder
      </span>
    </div>
  );
}
