"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectVideo } from "@/lib/data";

export default function VideoCard({ video }: { video: ProjectVideo }) {
  const [playing, setPlaying] = useState(false);
  const ratio = video.aspect === "4/5" ? "aspect-[4/5]" : "aspect-[9/16]";

  return (
    <figure>
      <div className={`relative overflow-hidden bg-ink ${ratio}`}>
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 text-left"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
              aria-hidden="true"
            />
            <span
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
            </span>
            {video.views && (
              <span className="font-mono-label absolute bottom-4 left-4 bg-cream px-2.5 py-1.5 text-[11px] text-ink">
                {video.views} views
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-display text-xl font-medium leading-snug text-ink">{video.title}</p>
        {video.caption && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-70">{video.caption}</p>
        )}
      </figcaption>
    </figure>
  );
}
