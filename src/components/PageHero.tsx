import GlowField from "./GlowField";
import CursorLayer from "./cursor/CursorLayer";

// The dark, softly glowing header shared by the inner pages. It slides up under the
// transparent nav, the same way the home page's first screen does.
export default function PageHero({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative isolate -mt-[81px] overflow-hidden pt-[81px] text-cream md:-mt-[97px] md:pt-[97px] ${className}`}
    >
      <GlowField variant="page" />
      <CursorLayer className="z-[1]" />
      <div className="relative z-10 pb-16 pt-14 md:pb-24 md:pt-24">{children}</div>
    </section>
  );
}
