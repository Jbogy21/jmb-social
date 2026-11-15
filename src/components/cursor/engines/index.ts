import type { CursorEffect } from "../store";
import { startFluted } from "./fluted";
import { startFrames } from "./frames";
import { startLight } from "./light";
import { startPlayhead } from "./playhead";
import { startSides } from "./sides";
import { startViewfinder } from "./viewfinder";
import type { Disposer, Tone } from "./shared";

// Effects drawn on a canvas that sits in the page's background (behind the content).
export const backdropEngines: Partial<
  Record<CursorEffect, (canvas: HTMLCanvasElement, tone: Tone) => Disposer>
> = { frames: startFrames, fluted: startFluted, light: startLight };

// Effects that sit on top of the page, like a cursor does.
export const overlayEngines: Partial<Record<CursorEffect, () => Disposer>> = {
  viewfinder: startViewfinder,
  playhead: startPlayhead,
  sides: startSides,
};
