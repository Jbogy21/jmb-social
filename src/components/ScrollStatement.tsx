import SectionLabel from "./SectionLabel";

const sentence =
  "I make websites, short-form video and ads for businesses that want to be found, and for people who want to be seen.";

const drift = ["Websites", "Reels", "Ads", "Portfolios", "Brand"];

// The sentence brightens word by word as it scrolls up the screen, and the strip
// beneath it drifts sideways with the scroll (both CSS-only, see globals.css).
export default function ScrollStatement() {
  return (
    <section className="grain relative overflow-hidden bg-green-deep text-cream">
      <div className="container-edge relative py-20 sm:py-28 md:py-36">
        <SectionLabel label="JMB Social" tone="cream" />
        <p className="font-display mt-10 max-w-5xl text-balance text-[2rem] font-medium leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl">
          {sentence.split(" ").map((word, index) => (
            <span key={index} className="lit-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="relative overflow-hidden border-t border-line-on-green py-6" aria-hidden="true">
        <div className="marquee-track marquee-scroll">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {drift.map((word) => (
                <span key={word + copy} className="flex items-center">
                  <span className="font-display px-8 text-5xl font-medium text-cream-70 sm:text-6xl md:text-7xl">
                    {word}
                  </span>
                  <span className="text-3xl text-signal-soft">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
