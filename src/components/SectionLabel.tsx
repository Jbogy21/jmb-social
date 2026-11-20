// The small mono label above a section, set up like a shot list.
//
// A label at the top of a page (the cream ones on the dark hero) is the camera going live:
// a pulsing REC dot. Every other label is a numbered shot ("SHOT 03"). The numbers come from
// a CSS counter that restarts on every page (see globals.css), so sections never need
// numbering by hand. The timecode on the right is filled in by <ShotClock /> from where the
// label sits on the page, so the page reads like one running take.
export default function SectionLabel({
  label,
  tone = "ink",
  rec = tone === "cream",
}: {
  label: string;
  tone?: "ink" | "cream";
  /** Show the REC dot instead of a shot number. On by default for the cream labels on a page's hero. */
  rec?: boolean;
  /** Old manual numbering. Ignored now: shots number themselves. */
  index?: string;
}) {
  const color = tone === "cream" ? "text-cream-70" : "text-fg-70";
  const line = tone === "cream" ? "bg-cream-70" : "bg-fg-70";
  const live = rec;

  return (
    <div
      className={`${live ? "shot-rec" : "shot-label"} flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-xs ${color}`}
    >
      <span className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${live ? "rec-dot bg-signal" : "bg-current opacity-60"}`}
          aria-hidden="true"
        />
        {live ? <span aria-hidden="true">REC</span> : <span className="shot-no" aria-hidden="true" />}
      </span>
      <span className={`h-px w-6 ${line}`} aria-hidden="true" />
      <span>{label}</span>
      <span className="shot-tc text-[10px] opacity-60" data-tc="" aria-hidden="true" />
    </div>
  );
}
