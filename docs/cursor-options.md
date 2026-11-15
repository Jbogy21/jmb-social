# JMB Social cursor options

The cursor effect is a deliberate brand choice. Everything here is original to JMB Social and
is not copied from another studio's site. Six options were built and compared; one is chosen
and the rest removed. This file is the log, so no idea gets lost.

All of them:
- run only with a real mouse (never on phones or tablets), and not for people who ask for less motion
- stay off over form fields, and never block clicks
- use the brand colours (olive, khaki, cream, with ember on the Creative side)

## 1. Reel frames (built first, logged 2026-11-15)
A trail of tiny tilted portrait (9:16) frames, like Reels or Stories, pops up behind the page as
the mouse moves and fades. Each frame has a thin story-style progress line along the top that
fills as the frame runs out, and the ribbed fluted-glass texture from the home page. Until there
are photos the frames show brand-coloured artwork; add pictures to `cursorFrames` in
`src/lib/data.ts` and the trail is made of the studio's own work. Sits behind the page content.

## 2. Viewfinder
Camera-focus corner brackets follow the pointer and snap onto whatever can be clicked, with a
small label (VIEW, OPEN, CALL...). A click fires a quick shutter flash.

## 3. Fluted light
A soft light moves with the mouse and lights up the ribs of the fluted-glass look, as if
torchlight were passing over ribbed glass. Sits behind the page content.

## 4. Playhead
A thin timeline line follows the pointer with a timecode, and a ruler runs down the left edge.
Scrolling scrubs the page like a video timeline.

## 5. Two sides
A small dot and ring. On the local business pages the ring is a precise square with tick marks
(measured, reliable); on the Creative pages it is a round ember ring with an italic label.
It grows over anything clickable and names it.

## 6. Light trail
A long-exposure streak of warm light follows the mouse and fades, in the colours of the home
page glow. Sits behind the page content.

## Choosing one
1. Pick a winner and set `cursorEffect` in `siteConfig` (`src/lib/data.ts`) to its id:
   `frames`, `viewfinder`, `fluted`, `playhead`, `sides`, `light` (or `off`).
2. Delete the unused engines in `src/components/cursor/engines/`, the preview switcher
   (`CursorDemoBar.tsx`), and the demo parts of `store.ts`.
