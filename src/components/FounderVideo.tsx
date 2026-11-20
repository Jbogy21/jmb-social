"use client";

import { useState } from "react";
import Image from "next/image";
import { founderVideo } from "@/lib/data";

// The "Hi, I'm Jackson" intro, framed like a camera monitor: corner brackets, a REC dot and a
// timecode. With no video set in `founderVideo` (src/lib/data.ts) it shows an empty frame that
// says so plainly. With one, tap to play with sound.
export default function FounderVideo({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const live = Boolean(founderVideo.src);

  return (
    <figure className={className}>
      <div className="relative aspect-[9/16] overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#4a5633_0%,#262e19_55%,#13170d_100%)]">
        {live && playing ? (
          <video
            src={founderVideo.src}
            poster={founderVideo.poster || undefined}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            data-no-trail
          >
            {founderVideo.captions && (
              <track kind="captions" src={founderVideo.captions} srcLang="en" label="English" default />
            )}
          </video>
        ) : (
          <>
            {live && founderVideo.poster && (
              <Image
                src={founderVideo.poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 272px, 70vw"
                className="object-cover"
              />
            )}
            {live ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${founderVideo.title}`}
                data-cursor="PLAY ▸"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/90 text-ink">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                    <path d="M3 1.5v11l9-5.5z" />
                  </svg>
                </span>
              </button>
            ) : (
              <p className="font-display absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-3xl font-medium leading-tight text-cream/35">
                {founderVideo.title}
              </p>
            )}

            {/* camera-monitor chrome */}
            <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-cream/70" aria-hidden="true" />
            <span className="font-mono-label pointer-events-none absolute left-7 top-6 flex items-center gap-2 text-[10px] text-cream/85" aria-hidden="true">
              <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" />
              REC
            </span>
            <span className="font-mono-label pointer-events-none absolute right-7 top-6 text-[10px] text-cream/85" aria-hidden="true">
              00:00:00:00
            </span>
            {!live && (
              <span className="font-mono-label pointer-events-none absolute inset-x-0 bottom-7 text-center text-[10px] text-cream/70">
                Intro video · {founderVideo.length} · coming soon
              </span>
            )}
          </>
        )}
      </div>
      <figcaption className="font-mono-label mt-3 text-[10px] text-fg-50">
        {live ? `${founderVideo.title} · ${founderVideo.length} · sound on` : "A short hello, on its way."}
      </figcaption>
    </figure>
  );
}
