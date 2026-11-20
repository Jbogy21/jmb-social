"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fills in the timecode on every shot label (the ".shot-tc" spans in <SectionLabel />).
// A page is treated as one running take: the further down it a label sits, the later its
// timecode. It is a design touch, not data. Runs once per page and again if the page
// changes height (images and fonts loading, the window resizing).
const PX_PER_SECOND = 40;
const FPS = 25;

const two = (n: number) => String(n).padStart(2, "0");

function timecode(y: number) {
  const total = Math.max(0, y) / PX_PER_SECOND;
  const seconds = Math.floor(total);
  const frames = Math.floor((total - seconds) * FPS);
  return `${two(Math.floor(seconds / 3600))}:${two(Math.floor((seconds % 3600) / 60))}:${two(seconds % 60)}:${two(frames)}`;
}

export default function ShotClock() {
  const pathname = usePathname();

  useEffect(() => {
    const stamp = () => {
      document.querySelectorAll<HTMLElement>(".shot-tc").forEach((el) => {
        const box = (el.parentElement ?? el).getBoundingClientRect();
        if (box.width === 0 && box.height === 0) return;
        el.dataset.tc = timecode(box.top + window.scrollY);
      });
    };
    stamp();
    const settle = window.setTimeout(stamp, 600);
    const observer = new ResizeObserver(stamp);
    observer.observe(document.body);
    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
