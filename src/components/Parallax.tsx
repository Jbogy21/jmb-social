"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fills its box and moves its contents a little more slowly than the page as it scrolls
// past, which gives photos some depth. The movement is small (a few percent), only runs
// while the box is on screen, and is skipped entirely for people who ask for less motion.
export default function Parallax({
  children,
  amount = 6,
  className = "relative",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = box.current;
    const inner = layer.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      const half = window.innerHeight / 2;
      // -1 when the box is just below the screen, +1 when it has just gone off the top.
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - half) / (half + rect.height / 2)));
      inner.style.transform = `translate3d(0, ${(-progress * amount).toFixed(2)}%, 0) scale(1.14)`;
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
      { rootMargin: "80px 0px" }
    );
    observer.observe(outer);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [amount]);

  return (
    <div ref={box} className={`overflow-hidden ${className}`}>
      <div
        ref={layer}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.14)" }}
      >
        {children}
      </div>
    </div>
  );
}
