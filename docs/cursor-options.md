# JMB Social cursor options

The cursor effect is a deliberate brand choice. Everything here is original to JMB Social and
is not copied from another studio's site. Six options were built and compared on a preview.

**Chosen: the Viewfinder (2026-11-15).** It lives in `src/components/ViewfinderCursor.tsx` and
is switched on by `cursorEffect: "viewfinder"` in `siteConfig` (`"off"` turns it off). The other
five were removed from the site. Their code is not lost: it is in git history at commit
`5ddfcdf` ("Add Schedule a call, a new page ending, hero clips and six cursor options"), under
`src/components/cursor/`. This file is the log, so no idea gets lost.

All of them:
- run only with a real mouse (never on phones or tablets), and not for people who ask for less motion
- stay off over form fields, and never block clicks
- use the brand colours (olive, khaki, cream, with ember on the Creative side)

## 1. Reel frames (built first, logged 2026-11-15)
A trail of tiny tilted portrait (9:16) frames, like Reels or Stories, pops up behind the page as
the mouse moves and fades. Each frame has a thin story-style progress line along the top that
fills as the frame runs out, and the ribbed fluted-glass texture from the home page. Until there
are photos the frames show brand-coloured artwork; with photos from a shoot the trail could be
made of the studio's own work. Sits behind the page content. (Removed; see commit `5ddfcdf`.)

## 2. Viewfinder (CHOSEN, live)
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

## Using the chosen one
- Name what a click does on any element with `data-cursor="WATCH"` (otherwise it says CALL,
  EMAIL, CHAT, OPEN, VIEW or PRESS from the link or button type).
- Anything inside a `data-no-trail` element, and every form field, hides it.
- Colours: cream on the main site, ember inside `.creative-world`.
- To bring back one of the other ideas: `git show 5ddfcdf:src/components/cursor/engines/<name>.ts`.
