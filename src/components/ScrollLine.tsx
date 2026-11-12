"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Sets a `--p` value from 0 to 1 on its box as the box scrolls through the screen, so
// that a child with the `scroll-line-v` or `scroll-line-h` class can draw itself in step
// with the reader. Does nothing (and the lines simply show in full) for people who ask for
// less motion.
export default function ScrollLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the top reaches 80% of the screen height, 1 as the bottom reaches 45%.
      const progress = (vh * 0.8 - rect.top) / (rect.height + vh * 0.35);
      node.style.setProperty("--p", Math.max(0, Math.min(1, progress)).toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          listening = true;
          update();
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          listening = false;
        }
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={box} className={className}>
      {children}
    </div>
  );
}
