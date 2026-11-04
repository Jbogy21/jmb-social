"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

// On touch screens there is no hover, so an element "lights up" instead while it is in the
// middle band of the screen. The CSS (data-active) mirrors what hover does on a computer.
function useSpot<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "-38% 0px -38% 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, active] as const;
}

export function Spot({ className = "", children }: { className?: string; children: ReactNode }) {
  const [ref, active] = useSpot<HTMLDivElement>();
  return (
    <div ref={ref} data-active={active} className={className}>
      {children}
    </div>
  );
}

export function SpotLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const [ref, active] = useSpot<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={href} data-active={active} className={className}>
      {children}
    </Link>
  );
}
