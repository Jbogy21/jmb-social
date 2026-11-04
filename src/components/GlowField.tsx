"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The abstract "motion blur" backdrop behind the first screen: soft khaki and orange light,
// a dark moving shape and fluted-glass stripes over the top. On a computer the light leans
// gently towards the pointer. A real motion-blurred photo can replace the shapes later by
// passing `image`.
export default function GlowField({
  image,
  alt = "",
  variant = "home",
}: {
  image?: string;
  alt?: string;
  variant?: "home" | "page";
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const step = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      node.style.setProperty("--mx", x.toFixed(3));
      node.style.setProperty("--my", y.toFixed(3));
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.002 ? requestAnimationFrame(step) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      targetX = (event.clientX - box.left) / box.width - 0.5;
      targetY = (event.clientY - box.top) / box.height - 0.5;
      if (!frame) frame = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className={`glow ${variant === "page" ? "glow-page" : ""}`} aria-hidden="true">
      {image ? (
        <Image src={image} alt={alt} fill priority sizes="100vw" className="glow-photo object-cover" />
      ) : (
        <>
          <span className="glow-layer glow-gold" />
          <span className="glow-layer glow-streak" />
          <span className="glow-layer glow-orange" />
          <span className="glow-layer glow-figure" />
        </>
      )}
      <span className="glow-flutes" />
      <span className="glow-vignette" />
    </div>
  );
}
