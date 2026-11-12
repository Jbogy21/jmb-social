import {
  christmasOffer,
  christmasPrice,
  creativePhotos,
  firstProjectsOffer as offer,
  isChristmasOfferActive,
  siteConfig,
} from "@/lib/data";
import RevealOnScroll from "./RevealOnScroll";
import PhotoSlot from "./PhotoSlot";
import { Button } from "./Button";

// The introductory offer on the Creative page, and the one bright moment on it: an ember
// frame with dark cards inside, so the text is always either dark on ember or light on
// near-black. Everything it says comes from `firstProjectsOffer` in src/lib/data.ts,
// including the price and how many places are open, so nothing is claimed here that is not
// set there.
export default function FirstProjectsOffer({ index = "03" }: { index?: string }) {
  const { placesOpen } = offer;
  const christmasActive = isChristmasOfferActive();
  const discounted = christmasPrice(offer.price);
  const full = placesOpen !== null && placesOpen <= 0;
  const placesLabel =
    placesOpen === null
      ? null
      : full
        ? "Currently full"
        : `${placesOpen} ${placesOpen === 1 ? "place" : "places"} open`;

  const message = full ? offer.waitlistMessage : offer.whatsappMessage;
  const whatsappHref = `${siteConfig.whatsappHref.split("?")[0]}?text=${encodeURIComponent(message)}`;

  return (
    <section
      id="first-projects"
      aria-labelledby="first-projects-heading"
      className="scroll-mt-20 border-b border-white/10 py-16 md:py-24"
    >
      <div className="container-edge">
        <RevealOnScroll>
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#f58259_0%,#f0724a_45%,#e8613a_100%)] p-3 text-ink sm:p-8 lg:p-12">
            <div className="grid gap-10 px-2 pb-1 pt-4 sm:p-0 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-8">
                <div className="font-mono-label flex items-center gap-4 text-xs text-ink/80">
                  <span>{index}</span>
                  <span className="h-px w-8 bg-ink/60" aria-hidden="true" />
                  <span>{offer.eyebrow}</span>
                </div>
                <h2
                  id="first-projects-heading"
                  className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.03] sm:text-5xl lg:text-6xl"
                >
                  {offer.headline}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/90">{offer.intro}</p>

                {placesLabel && (
                  <p className="font-mono-label mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-[11px] text-cream">
                    <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                    {placesLabel}
                  </p>
                )}
                {full && (
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/90">
                    Message me and I&rsquo;ll add you to the waitlist for the next places.
                  </p>
                )}
              </div>

              <div className="hidden lg:col-span-4 lg:block">
                <PhotoSlot
                  photo={creativePhotos.offer}
                  ghost="First"
                  tone="c"
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 28vw, 0px"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {offer.tracks.map((track, position) => (
                <RevealOnScroll key={track.slug} delay={position * 90}>
                  <article className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-[#150e0b] p-5 text-cream sm:p-7">
                    <div>
                      <p className="font-mono-label text-[11px] text-cream-70">{track.who}</p>
                      <h3 className="font-display mt-4 text-3xl font-medium leading-tight">
                        {track.title}
                      </h3>
                      <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/15 pt-5">
                        {track.included.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                            <span
                              aria-hidden="true"
                              className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="font-mono-label border-t border-white/15 pt-4 text-[11px] leading-relaxed">
                      <span className="text-cream-70">You get · </span>
                      {track.deliverables.join(" · ")}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-12">
              <RevealOnScroll className="md:col-span-5">
                <div className="h-full rounded-3xl bg-[#150e0b] p-5 text-cream sm:p-7">
                  <h3 className="font-mono-label text-[11px] text-cream-70">{offer.inReturnTitle}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {offer.inReturn.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-cream/90">
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-signal"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              <RevealOnScroll className="md:col-span-7" delay={80}>
                <div className="h-full rounded-3xl bg-[#150e0b] p-5 text-cream sm:p-7">
                  <h3 className="font-mono-label text-[11px] text-cream-70">How it works</h3>
                  <ol className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-5">
                    {offer.steps.map((step, position) => (
                      <li key={step.title} className="border-t border-white/25 pt-4">
                        <span className="font-mono-label text-[11px] text-signal-soft">
                          {String(position + 1).padStart(2, "0")}
                        </span>
                        <p className="font-display mt-2 text-xl font-medium leading-snug">
                          {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-cream/90">{step.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll>
              <div className="mt-3 flex flex-col gap-8 rounded-3xl bg-[#150e0b] p-5 text-cream sm:p-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono-label text-[11px] text-cream-70">Price</p>
                  {discounted ? (
                    <p className="font-display mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium leading-tight">
                      <span className="sr-only">Was </span>
                      <s className="text-2xl text-cream/75 decoration-signal decoration-2">
                        {offer.price}
                      </s>
                      <span aria-hidden="true" className="text-2xl text-signal-soft">
                        →
                      </span>
                      <span className="sr-only">now </span>
                      <span className="text-5xl">{discounted}</span>
                      <span className="font-mono-label rounded-full border border-signal/70 px-3 py-1.5 text-[11px]">
                        {christmasOffer.discount} off · Christmas offer
                      </span>
                    </p>
                  ) : (
                    <p className="font-display mt-2 text-3xl font-medium leading-tight">
                      {offer.price ?? offer.priceFallback}
                    </p>
                  )}
                  {offer.price && (
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/90">
                      {offer.priceDetail}
                    </p>
                  )}
                  {christmasActive && (
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/90">
                      {christmasOffer.discount} off for first-time clients who book by{" "}
                      {christmasOffer.endsLabel}.
                    </p>
                  )}
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/90">{offer.note}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Button href="/contact?for=first-projects" variant="signal" className="w-full justify-center px-5! text-center sm:w-auto sm:px-7!">
                    {full ? offer.waitlistLabel : offer.ctaLabel}
                  </Button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message on WhatsApp about the first projects offer"
                    className="font-mono-label inline-flex items-center rounded-full border border-cream/35 px-5 py-4 text-[11px] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink active:scale-[0.97] w-full justify-center text-center sm:w-auto sm:px-7"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
