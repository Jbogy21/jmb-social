import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type CommonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "signal";
  className?: string;
  arrow?: boolean;
};

const base =
  "font-mono-label inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[11px] transition-[color,background-color,border-color,transform] duration-300 active:scale-[0.97]";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-cream text-ink hover:bg-white",
  secondary: "border border-cream/30 text-cream hover:bg-cream hover:text-ink",
  ghost: "border border-cream/30 text-cream hover:bg-cream hover:text-green",
  light: "bg-cream text-green hover:bg-sage hover:text-green-deep",
  signal: "bg-signal text-ink hover:bg-signal-deep",
};

function Arrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "", arrow = true } = props;
  const classes = `group ${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
        {arrow && <Arrow />}
      </Link>
    );
  }

  const {
    href: _href,
    variant: _v,
    className: _c,
    arrow: _a,
    children: _children,
    ...buttonProps
  } = props as ButtonAsButton;

  return (
    <button className={classes} {...buttonProps}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
