import { christmasOffer, isChristmasOfferActive } from "@/lib/data";
import RevealOnScroll from "./RevealOnScroll";
import Snowflake from "./Snowflake";
import { Button } from "./Button";

const flakes = [
  { top: "8%", right: "6%", size: 56, opacity: "opacity-25" },
  { top: "52%", right: "20%", size: 28, opacity: "opacity-20" },
  { top: "14%", right: "34%", size: 20, opacity: "opacity-15" },
  { top: "70%", right: "4%", size: 36, opacity: "opacity-20" },
  { top: "36%", right: "46%", size: 16, opacity: "opacity-10" },
];

export default function ChristmasOffer() {
  if (!isChristmasOfferActive()) return null;

  return (
    <section className="border-b border-line">
      <div className="container-edge py-10 md:py-14">
        <RevealOnScroll>
          <div className="grain relative overflow-hidden bg-green px-7 py-10 text-cream sm:px-12 sm:py-12 md:px-16 md:py-14">
            {flakes.map((flake) => (
              <Snowflake
                key={flake.top + flake.right}
                size={flake.size}
                className={`pointer-events-none absolute text-cream ${flake.opacity}`}
                style={{ top: flake.top, right: flake.right }}
              />
            ))}

            <div className="relative grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-8">
                <p className="font-mono-label inline-flex items-center gap-2.5 border border-line-on-green px-3 py-2 text-[11px] text-sage">
                  <Snowflake size={14} />
                  Christmas offer · First-time clients
                </p>
                <h2 className="font-display mt-6 text-5xl font-medium leading-[1.02] sm:text-6xl md:text-7xl">
                  {christmasOffer.headline}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-70 sm:text-lg">
                  {christmasOffer.detail}
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:col-span-4 md:items-end">
                <Button href="/contact" variant="light">
                  Claim the offer
                </Button>
                <p className="font-mono-label text-[11px] text-cream-70">
                  Book by {christmasOffer.endsLabel}
                </p>
              </div>
            </div>

            <p className="relative mt-10 max-w-2xl border-t border-line-on-green pt-5 text-xs leading-relaxed text-cream-50">
              {christmasOffer.terms}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
