import Image from "next/image";
import Parallax from "./Parallax";
import type { Photo } from "@/lib/data";

// Ember-toned stand-ins, used until a real photo is set in `creativePhotos` (src/lib/data.ts).
const tones = {
  a: "radial-gradient(120% 90% at 28% 22%, #e4572e 0%, #6a2312 46%, #15100d 100%)",
  b: "radial-gradient(90% 80% at 66% 36%, #f0724a 0%, #5a2414 48%, #130e0c 100%)",
  c: "linear-gradient(155deg, #c9471f 0%, #3c1a10 56%, #110c0a 100%)",
} as const;

// A framed picture slot. With a photo it shows the photo (drifting slightly as the page
// scrolls); without one it shows a designed placeholder and hides itself from screen readers.
export default function PhotoSlot({
  photo,
  ghost,
  label,
  aspect = "aspect-[4/5]",
  tone = "a",
  sizes = "(min-width: 1024px) 40vw, 92vw",
  className = "",
}: {
  photo: Photo;
  /** A large faint word shown on the placeholder only. */
  ghost?: string;
  /** A small caption shown in the corner. */
  label?: string;
  /** A Tailwind aspect-ratio class, so it can change with screen size (e.g. "aspect-[4/3] sm:aspect-[4/5]"). */
  aspect?: string;
  tone?: keyof typeof tones;
  sizes?: string;
  className?: string;
}) {
  const hasPhoto = Boolean(photo.src);

  return (
    <figure
      aria-hidden={hasPhoto ? undefined : true}
      className={`relative isolate overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ${aspect} ${className}`}
    >
      <Parallax className="absolute inset-0">
        {hasPhoto ? (
          <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: tones[tone] }}>
            <span
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 38px)",
              }}
            />
            {ghost && (
              <span className="font-display absolute bottom-3 left-3 select-none text-[clamp(3.5rem,11vw,7.5rem)] font-normal italic leading-none text-cream/10">
                {ghost}
              </span>
            )}
          </div>
        )}
      </Parallax>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
      />
      {label && (
        <figcaption className="font-mono-label absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1.5 text-[10px] text-cream">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
