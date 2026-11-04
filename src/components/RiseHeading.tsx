"use client";

import { useEffect, useRef, useState } from "react";

// A heading whose words rise out of a mask one after another when it is scrolled to.
export default function RiseHeading({
  text,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rise-view ${seen ? "is-in" : ""} ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={index}>
          <span className="rise-mask">
            <span className="rise-word" style={{ animationDelay: `${index * 55}ms` }}>
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
