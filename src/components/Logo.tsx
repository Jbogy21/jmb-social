import Link from "next/link";

type Tone = "ink" | "cream";

const toneClasses: Record<Tone, { primary: string; secondary: string }> = {
  ink: { primary: "text-ink", secondary: "text-ink-70" },
  cream: { primary: "text-cream", secondary: "text-cream-70" },
};

/** Horizontal lockup used in the site header: "JMB  SOCIAL". */
export function NavLogo({ tone = "ink" }: { tone?: Tone }) {
  const c = toneClasses[tone];
  return (
    <Link href="/" className="flex items-baseline gap-2.5" aria-label="JMB Social home">
      <span className={`font-display text-2xl font-semibold tracking-tight ${c.primary}`}>
        JMB
      </span>{" "}
      <span className={`font-mono-label text-[11px] ${c.secondary}`}>Social</span>
    </Link>
  );
}

/** Stacked lockup used in the footer: "JMB Social" over its descriptor. */
export function StackedLogo({ tone = "cream" }: { tone?: Tone }) {
  const c = toneClasses[tone];
  return (
    <div className="flex items-start gap-4">
      <Monogram tone={tone === "cream" ? "on-green" : "on-cream"} />
      <div>
        <p className={`font-display text-3xl font-semibold tracking-tight ${c.primary}`}>
          JMB Social
        </p>
        <p className={`font-mono-label mt-1 text-[11px] ${c.secondary}`}>
          Creative &amp; Growth Studio
        </p>
      </div>
    </div>
  );
}

/** Square monogram mark — doubles as the visual basis for the favicon/avatar. */
export function Monogram({
  tone = "on-cream",
  size = 44,
}: {
  tone?: "on-cream" | "on-green";
  size?: number;
}) {
  const bg = tone === "on-cream" ? "bg-green" : "bg-cream";
  const fg = tone === "on-cream" ? "text-cream" : "text-green";
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${bg} ${fg} font-display font-semibold`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      JMB
    </span>
  );
}
