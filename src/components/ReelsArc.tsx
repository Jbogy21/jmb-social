"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectVideo } from "@/lib/data";

// The Reels as a fan of 9:16 cards riding an arch, like a hand of cards under a rainbow.
//
//  - Mouse: sweep your cursor along the arch. Whichever Reel is under that part of the
//    rainbow lifts forward and straightens, and a marker slides along the arc to show it.
//    Rest on it and it previews, muted. Click to play it with sound.
//  - Phone: drag or swipe to turn the fan, tap the front Reel to play it. A bold "Swipe" sign,
//    dots, big arrow buttons and a one-off gentle sway on first sight say so, because a small
//    caption was too easy to miss.
//  - Keyboard and screen readers: the arrow keys, Enter, or the Previous and Next buttons.
//
// Only the Reel you are on ever loads any video, so the page stays light. Positions are written
// straight to the elements every frame (not through React state), which keeps it smooth.
// Kept light for phones: the rainbow is one small SVG (not huge circles with a mask), and the
// cards use plain rounded corners and small shadows instead of clipping and big blurs.

// The rainbow, outside in: sage, cream, soft ember, ember. Each fades out towards the edges.
const ARC_COLOURS = [
  { rgb: "167, 171, 143", alpha: 0.42, width: 1.5 },
  { rgb: "236, 226, 200", alpha: 0.5, width: 1.5 },
  { rgb: "240, 114, 74", alpha: 0.62, width: 1.5 },
  { rgb: "228, 87, 46", alpha: 0.85, width: 2 },
];

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const pad = (n: number) => String(n).padStart(2, "0");

export default function ReelsArc({ videos, label }: { videos: ProjectVideo[]; label: string }) {
  const count = videos.length;
  const start = Math.floor((count - 1) / 2);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const gradRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const dragged = useRef(false);
  const api = useRef<{
    activate: (index: number) => void;
    select: (index: number) => void;
    step: (by: number) => void;
    stop: () => void;
  } | null>(null);

  // front: the Reel at the middle of the fan. hover: the Reel under the cursor. playing: the
  // Reel playing with sound. previewing: the Reel on its muted preview.
  const [front, setFront] = useState(start);
  const [hover, setHover] = useState<number | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [previewing, setPreviewing] = useState<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || count === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseLike = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    const canPreview = mouseLike && !reduced && !saveData;

    const g = { cardW: 0, cardH: 0, R: 0, step: 0, pivotX: 0, pivotY: 0, outer: 0 };
    const m = {
      focus: start,
      target: start,
      shown: start,
      hover: null as number | null,
      playing: null as number | null,
      playOnArrive: null as number | null,
      lift: Array.from({ length: count }, () => 0),
      thumb: 0,
      raf: 0,
      dwell: 0,
      dragX: 0,
      dragFrom: 0,
      dragging: false,
      touched: false, // true once a person has moved the fan themselves
    };

    const paint = () => {
      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        const d = i - m.focus;
        const far = Math.abs(d);
        const lift = m.lift[i];
        // a lifted Reel rises out of the arch where it is (so it stays under the cursor) and
        // turns upright a little
        const place = d * g.step;
        const tilt = place * (1 - 0.65 * lift);
        const radius = g.R + 26 * lift;
        const x = g.pivotX + radius * Math.sin(place);
        const y = g.pivotY - radius * Math.cos(place);
        const scale = 1.05 - 0.11 * Math.min(1, far) + 0.08 * lift;
        card.style.transform = `translate3d(${(x - g.cardW / 2).toFixed(1)}px, ${(y - g.cardH / 2).toFixed(1)}px, 0) rotate(${tilt.toFixed(4)}rad) scale(${scale.toFixed(3)})`;
        card.style.zIndex = String(lift > 0.4 ? 70 : 50 - Math.round(far * 10));
        const hidden = far > 2.6;
        card.style.opacity = hidden ? "0" : "1";
        card.style.pointerEvents = hidden ? "none" : "auto";
        const dim = dimRefs.current[i];
        if (dim) dim.style.opacity = (Math.min(0.6, far * 0.5) * (1 - lift)).toFixed(2);
        const tick = tickRefs.current[i];
        if (tick) {
          const a = d * g.step;
          tick.style.transform = `translate3d(${(g.pivotX + g.outer * Math.sin(a) - 3).toFixed(1)}px, ${(g.pivotY - g.outer * Math.cos(a) - 3).toFixed(1)}px, 0)`;
        }
      }
      const thumb = thumbRef.current;
      if (thumb) {
        thumb.style.transform = `translate3d(${(g.pivotX + g.outer * Math.sin(m.thumb) - 8).toFixed(1)}px, ${(g.pivotY - g.outer * Math.cos(m.thumb) - 8).toFixed(1)}px, 0)`;
      }
    };

    const play = (index: number) => {
      window.clearTimeout(m.dwell);
      m.playing = index;
      m.hover = index;
      setHover(index);
      setPreviewing(null);
      setPlaying(index);
      m.raf ||= requestAnimationFrame(tick);
    };

    const tick = () => {
      m.raf = 0;
      let busy = false;

      const diff = m.target - m.focus;
      m.focus = reduced || Math.abs(diff) < 0.002 ? m.target : m.focus + diff * 0.14;
      if (m.focus !== m.target) busy = true;

      for (let i = 0; i < count; i++) {
        const goal = m.hover === i ? 1 : 0;
        const d = goal - m.lift[i];
        m.lift[i] = reduced || Math.abs(d) < 0.004 ? goal : m.lift[i] + d * 0.2;
        if (m.lift[i] !== goal) busy = true;
      }

      const sel = m.hover ?? clamp(Math.round(m.focus), 0, count - 1);
      const aim = (sel - m.focus) * g.step;
      const td = aim - m.thumb;
      m.thumb = reduced || Math.abs(td) < 0.0006 ? aim : m.thumb + td * 0.22;
      if (m.thumb !== aim) busy = true;

      paint();

      const nearest = clamp(Math.round(m.focus), 0, count - 1);
      if (nearest !== m.shown) {
        m.shown = nearest;
        setFront(nearest);
        if (m.playing !== null && m.playing !== nearest) {
          m.playing = null;
          setPlaying(null);
        }
      }
      if (m.playOnArrive !== null && m.focus === m.target && nearest === m.playOnArrive) {
        const index = m.playOnArrive;
        m.playOnArrive = null;
        play(index);
      }
      if (busy) m.raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!m.raf) m.raf = requestAnimationFrame(tick);
    };

    const measure = () => {
      const W = stage.clientWidth;
      if (!W) return;
      const small = W < 640;
      g.cardW = small ? Math.min(W * 0.58, 236) : Math.min(W * 0.215, 268);
      g.cardH = (g.cardW * 16) / 9;
      g.R = g.cardH * (small ? 1 : 1.1);
      g.step = ((small ? 30 : 26) * Math.PI) / 180;
      const top = small ? 84 : 92;
      const centreY = top + g.cardH / 2;
      g.pivotX = W / 2;
      g.pivotY = centreY + g.R;

      stage.style.height = `${Math.round(centreY + g.cardH / 2 + (small ? 74 : 96))}px`;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.width = `${g.cardW}px`;
        card.style.height = `${g.cardH}px`;
      });
      ARC_COLOURS.forEach((_, k) => {
        const r = g.R + g.cardH / 2 + 22 + k * 15;
        if (k === ARC_COLOURS.length - 1) g.outer = r;
        // an arc across the stage, from just past the left edge to just past the right
        const sweep = Math.asin(Math.min(1, (W / 2 + 40) / r));
        const x1 = g.pivotX - r * Math.sin(sweep);
        const x2 = g.pivotX + r * Math.sin(sweep);
        const y = g.pivotY - r * Math.cos(sweep);
        pathRefs.current[k]?.setAttribute("d", `M ${x1.toFixed(1)} ${y.toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y.toFixed(1)}`);
        gradRefs.current[k]?.setAttribute("x2", String(W));
      });
      stage.dataset.ready = "1";
      m.thumb = (clamp(Math.round(m.focus), 0, count - 1) - m.focus) * g.step;
      paint();
    };

    // Which Reel is the cursor on? Measured by the angle around the middle of the arch, so the
    // Reels never have to move out from under the cursor to be chosen.
    const pick = (clientX: number, clientY: number): number | null => {
      const box = stage.getBoundingClientRect();
      const dx = clientX - box.left - g.pivotX;
      const dy = g.pivotY - (clientY - box.top);
      const r = Math.hypot(dx, dy);
      if (r < g.R - g.cardH * 0.66 || r > g.R + g.cardH * 0.66 + 70) return null;
      const phi = Math.atan2(dx, dy);
      let best = -1;
      let bestGap = Infinity;
      for (let i = 0; i < count; i++) {
        const gap = Math.abs(phi - (i - m.focus) * g.step);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      }
      if (bestGap > g.step * 0.8) return null;
      if (m.hover !== null && best !== m.hover) {
        const current = Math.abs(phi - (m.hover - m.focus) * g.step);
        if (current - bestGap < g.step * 0.15) return m.hover;
      }
      return best;
    };

    const setHovered = (index: number | null) => {
      if (index === m.hover) return;
      m.hover = index;
      setHover(index);
      setPreviewing(null);
      window.clearTimeout(m.dwell);
      if (index !== null && canPreview) {
        m.dwell = window.setTimeout(() => setPreviewing(index), 450);
      }
      wake();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        if (m.playing !== null) return;
        setHovered(pick(event.clientX, event.clientY));
        return;
      }
      if (!m.dragging) return;
      const dx = event.clientX - m.dragX;
      if (Math.abs(dx) > 6) dragged.current = true;
      m.playOnArrive = null;
      m.target = clamp(m.dragFrom - dx / (g.cardW * 0.85), -0.3, count - 0.7);
      wake();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (m.playing === null) setHovered(null); // a finger takes over from any leftover mouse hover
      m.dragging = true;
      m.touched = true;
      m.dragX = event.clientX;
      m.dragFrom = m.target;
      dragged.current = false;
      stage.setPointerCapture?.(event.pointerId);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || !m.dragging) return;
      m.dragging = false;
      m.target = clamp(Math.round(m.target), 0, count - 1);
      wake();
      window.setTimeout(() => {
        dragged.current = false;
      }, 60);
    };
    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || m.playing !== null) return;
      setHovered(null);
    };

    api.current = {
      select: (index) => {
        m.touched = true;
        m.playOnArrive = null;
        m.target = clamp(index, 0, count - 1);
        wake();
      },
      activate: (index) => {
        m.touched = true;
        const here = clamp(Math.round(m.focus), 0, count - 1);
        if (index === here && m.focus === m.target) {
          play(index);
          return;
        }
        // another Reel: bring it to the middle, and (with a mouse) play it once it gets there
        m.target = index;
        m.playOnArrive = mouseLike ? index : null;
        wake();
      },
      step: (by) => {
        m.touched = true;
        m.playOnArrive = null;
        m.target = clamp(Math.round(m.target) + by, 0, count - 1);
        wake();
      },
      stop: () => {
        if (m.playing === null) return;
        m.playing = null;
        setPlaying(null);
        setHovered(null);
      },
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") api.current?.stop();
    };
    window.addEventListener("keydown", onKey);

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerdown", onDown, { passive: true });
    stage.addEventListener("pointerup", onUp, { passive: true });
    stage.addEventListener("pointercancel", onUp, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });

    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    // On a phone, the first time the arch is properly in view it sways left and right once, so
    // it is obvious it moves. It stops at once if a finger touches it, and never happens with
    // reduced motion.
    const swayTimers: number[] = [];
    let swayed = false;
    const view = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setPreviewing(null);
        if (entry.intersectionRatio < 0.55 || swayed || mouseLike || reduced) return;
        swayed = true;
        [0.45, -0.45, 0].forEach((offset, i) => {
          swayTimers.push(
            window.setTimeout(() => {
              if (m.touched || m.dragging || m.playing !== null) return;
              m.target = start + offset;
              wake();
            }, 500 + i * 800),
          );
        });
      },
      { threshold: [0, 0.55] },
    );
    view.observe(stage);
    measure();

    return () => {
      cancelAnimationFrame(m.raf);
      window.clearTimeout(m.dwell);
      swayTimers.forEach((id) => window.clearTimeout(id));
      resize.disconnect();
      view.disconnect();
      window.removeEventListener("keydown", onKey);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("pointerleave", onLeave);
      api.current = null;
    };
  }, [count, start]);

  const shown = videos[hover ?? front];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") api.current?.step(-1);
        if (event.key === "ArrowRight") api.current?.step(1);
      }}
    >
      {/* The sign. Big, plain and on its own line, so nobody has to guess it moves. */}
      <div className="mt-8 flex justify-center">
        <p className="inline-flex items-center gap-3 rounded-full bg-cream px-5 py-3 text-[15px] font-semibold leading-none tracking-tight text-ink shadow-[0_10px_22px_-12px_rgba(0,0,0,0.7)] sm:px-6 sm:py-3.5 sm:text-base">
          <span aria-hidden="true" className="arc-nudge-l text-lg">
            ←
          </span>
          <span className="[@media(hover:hover)]:hidden">Swipe to see more Reels</span>
          <span className="hidden [@media(hover:hover)]:inline">Move across the arch to flick through</span>
          <span aria-hidden="true" className="arc-nudge-r text-lg">
            →
          </span>
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative min-h-[520px] touch-pan-y overflow-hidden [&:not([data-ready])_.arc-card]:invisible"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          background: "radial-gradient(ellipse 75% 70% at 50% 100%, rgba(240, 114, 74, 0.08), transparent 70%)",
        }}
      >
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            {ARC_COLOURS.map((colour, k) => (
              <linearGradient
                key={colour.rgb}
                id={`${uid}-arc-${k}`}
                ref={(el) => {
                  gradRefs.current[k] = el;
                }}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
              >
                <stop offset="0" stopColor={`rgb(${colour.rgb})`} stopOpacity="0" />
                <stop offset="0.12" stopColor={`rgb(${colour.rgb})`} stopOpacity={colour.alpha} />
                <stop offset="0.88" stopColor={`rgb(${colour.rgb})`} stopOpacity={colour.alpha} />
                <stop offset="1" stopColor={`rgb(${colour.rgb})`} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {ARC_COLOURS.map((colour, k) => (
            <path
              key={colour.rgb}
              ref={(el) => {
                pathRefs.current[k] = el;
              }}
              fill="none"
              stroke={`url(#${uid}-arc-${k})`}
              strokeWidth={colour.width}
            />
          ))}
        </svg>

        {videos.map((video, i) => (
          <span
            key={`tick-${video.src}`}
            ref={(el) => {
              tickRefs.current[i] = el;
            }}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cream/70"
          />
        ))}
        <span
          ref={thumbRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[80] h-4 w-4 rounded-full border-2 border-signal bg-cream shadow-[0_0_14px_rgba(240,114,74,0.7)]"
        />

        {videos.map((video, i) => {
          const isPlaying = playing === i;
          const isPreview = previewing === i && !isPlaying;
          const isFront = front === i;
          return (
            <div
              key={video.src}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="arc-card absolute left-0 top-0 rounded-[1.1rem] border border-white/15 bg-ink shadow-[0_14px_26px_-16px_rgba(0,0,0,0.85)] will-change-transform"
            >
              {isPlaying ? (
                <>
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    data-no-trail
                    onEnded={() => api.current?.stop()}
                    className="h-full w-full rounded-[inherit] object-cover"
                  />
                  <button
                    type="button"
                    autoFocus
                    onClick={() => api.current?.stop()}
                    className="font-mono-label absolute right-2 top-2 z-10 bg-black/70 px-2.5 py-1.5 text-[10px] text-cream"
                  >
                    Close ✕
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (dragged.current) return;
                    api.current?.activate(i);
                  }}
                  aria-label={`Play Reel: ${video.title}`}
                  data-cursor="PLAY ▸"
                  className="group absolute inset-0 block rounded-[inherit] text-left"
                >
                  <Image
                    src={video.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 270px, 240px"
                    className="rounded-[inherit] object-cover"
                  />
                  {isPreview && (
                    <video
                      src={video.src}
                      poster={video.poster}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="auto"
                      className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
                    />
                  )}
                  <span
                    className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/60 via-transparent to-black/10"
                    aria-hidden="true"
                  />
                  {!isPreview && (
                    <span
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-ink"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M3 1.5v11l9-5.5z" />
                      </svg>
                    </span>
                  )}
                  {isFront && !isPreview && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-[calc(50%+2.6rem)] -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[13px] font-semibold tracking-tight text-cream [@media(hover:hover)]:hidden"
                    >
                      Tap to play
                    </span>
                  )}
                  <span className="font-mono-label absolute bottom-3 left-3 bg-cream px-2 py-1 text-[10px] text-ink">
                    {isPreview ? "Click for sound" : `${video.views ?? ""} views`}
                  </span>
                </button>
              )}
              <span
                ref={(el) => {
                  dimRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black"
                style={{ opacity: 0 }}
              />
            </div>
          );
        })}
      </div>

      {/* Dots: one per Reel, so it is clear there are more, and you can jump to one. */}
      <div className="mt-1 flex justify-center" role="group" aria-label="Choose a Reel">
        {videos.map((video, i) => (
          <button
            key={`dot-${video.src}`}
            type="button"
            onClick={() => api.current?.select(i)}
            aria-label={`Show Reel ${i + 1}: ${video.title}`}
            aria-current={front === i}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                front === i ? "w-6 bg-cream" : "w-2.5 bg-cream/35"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-end justify-between gap-5">
        <div aria-live="polite" className="min-w-0">
          <p className="font-mono-label text-[11px] text-fg-70">
            Reel {pad(videos.indexOf(shown) + 1)} / {pad(count)}
            {shown.views ? ` · ${shown.views} views` : ""}
          </p>
          <p className="font-display mt-2 text-2xl font-medium leading-snug text-fg sm:text-3xl">
            {shown.title}
          </p>
          {shown.caption && (
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-fg-70">{shown.caption}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={() => api.current?.step(-1)}
            disabled={front === 0}
            aria-label="Previous Reel"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/60 text-xl text-cream transition-colors hover:bg-cream hover:text-ink active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => api.current?.step(1)}
            disabled={front === count - 1}
            aria-label="Next Reel"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/60 text-xl text-cream transition-colors hover:bg-cream hover:text-ink active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
