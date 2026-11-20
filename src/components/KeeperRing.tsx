// A hand-drawn ring, like the pencil mark round a keeper on a contact sheet. Put it inside
// something with `relative` and a bit of padding. Inside a `.group` it redraws on hover.
export default function KeeperRing() {
  return (
    <svg
      viewBox="0 0 44 26"
      fill="none"
      className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)] text-signal-soft"
      aria-hidden="true"
    >
      <path
        d="M6 15C3 7 14 2 26 3c11 1 17 6 16 12-1 6-13 9-25 8C9 22 3 19 4 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        className="keeper-ring"
      />
    </svg>
  );
}
