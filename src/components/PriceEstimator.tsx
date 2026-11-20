"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";
import { christmasOffer, estimator, siteConfig } from "@/lib/data";

type Item = (typeof estimator.mains)[number];

const pounds = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const priceLine = (item: Item) =>
  `${item.label} (from ${item.price}${item.cadence === "month" ? " a month" : ""})`;

// An estimate in about thirty seconds. It only adds up the starting prices already shown on the
// Services page, says plainly that it is not a quote, and hands the picks to the contact form
// or WhatsApp so the conversation starts from them.
export default function PriceEstimator({ offerActive = false }: { offerActive?: boolean }) {
  const [main, setMain] = useState<string | null>(null);
  const [extras, setExtras] = useState<string[]>([]);

  const picked: Item[] = [
    ...estimator.mains.filter((item) => item.id === main),
    ...estimator.extras.filter((item) => extras.includes(item.id)),
  ];
  const oneOff = picked.filter((i) => i.cadence !== "month").reduce((sum, i) => sum + i.amount, 0);
  const monthly = picked.filter((i) => i.cadence === "month").reduce((sum, i) => sum + i.amount, 0);

  const percent = parseInt(christmasOffer.discount, 10);
  const discounted = (n: number) => (n * (100 - percent)) / 100;

  const summary = picked.length
    ? `Estimate from the website: ${picked.map(priceLine).join("; ")}. Total from ${[
        oneOff ? `${pounds(oneOff)} one-off` : "",
        monthly ? `${pounds(monthly)} a month` : "",
      ]
        .filter(Boolean)
        .join(" plus ")}.`
    : "";
  const contactHref = `/contact?for=estimate&est=${encodeURIComponent(summary)}`;
  const whatsappHref = `${siteConfig.whatsappHref.split("?")[0]}?text=${encodeURIComponent(
    `Hi JMB Social, I used the price estimator. ${summary}`,
  )}`;

  return (
    <section id="estimate" className="scroll-mt-24 border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <SectionLabel label="Price estimate" />
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              A price in thirty seconds.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-70 md:col-span-4 md:justify-self-end">
            Pick what you need. It adds up the same starting prices as the Services page, so
            nothing here is a surprise later.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-10 lg:col-span-7">
            <fieldset>
              <legend className="font-mono-label text-xs text-fg-70">1 · What do you need most?</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {estimator.mains.map((item) => (
                  <Chip
                    key={item.id}
                    label={item.label}
                    on={main === item.id}
                    onClick={() => setMain(main === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-mono-label text-xs text-fg-70">2 · Anything on top? (optional)</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {estimator.extras.map((item) => (
                  <Chip
                    key={item.id}
                    label={item.label}
                    on={extras.includes(item.id)}
                    onClick={() =>
                      setExtras(extras.includes(item.id) ? extras.filter((id) => id !== item.id) : [...extras, item.id])
                    }
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-line bg-surface-2">
              <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-cream/70" aria-hidden="true" />
              <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-cream/70" aria-hidden="true" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-cream/70" aria-hidden="true" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-cream/70" aria-hidden="true" />

              <p className="font-mono-label flex items-center gap-3 border-b border-line px-5 py-4 text-[11px] text-fg sm:px-6">
                <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                Your estimate
              </p>

              <div aria-live="polite" className="px-5 py-6 sm:px-6">
                {picked.length === 0 ? (
                  <p className="text-sm leading-relaxed text-fg-70">
                    Pick something on the left and the price shows up here.
                  </p>
                ) : (
                  <>
                    <ul className="flex flex-col gap-3">
                      {picked.map((item) => (
                        <li key={item.id} className="flex items-baseline justify-between gap-4 text-sm text-fg">
                          <span>{item.label}</span>
                          <span className="font-mono-label shrink-0 text-[11px] text-fg-70">
                            from {item.price}
                            {item.cadence === "month" ? " / mo" : ""}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-line pt-5">
                      {oneOff > 0 && (
                        <p className="font-display text-4xl font-medium leading-none text-fg">
                          from {pounds(oneOff)}
                          <span className="font-mono-label ml-3 text-[11px] text-fg-70">one-off</span>
                        </p>
                      )}
                      {monthly > 0 && (
                        <p
                          className={`font-display font-medium leading-none text-fg ${oneOff > 0 ? "mt-3 text-2xl" : "text-4xl"}`}
                        >
                          {oneOff > 0 ? "+ " : ""}from {pounds(monthly)}
                          <span className="font-mono-label ml-3 text-[11px] text-fg-70">a month</span>
                        </p>
                      )}
                      {offerActive && (
                        <p className="mt-4 text-sm leading-relaxed text-fg-70">
                          First-time client? With the Christmas offer ({christmasOffer.discount} off, book by{" "}
                          {christmasOffer.endsLabel}) {oneOff > 0 ? "the one-off part" : "your first month"} would
                          start from {pounds(discounted(oneOff > 0 ? oneOff : monthly))}.
                        </p>
                      )}
                      {extras.includes("ads") && (
                        <p className="mt-4 text-xs leading-relaxed text-fg-50">
                          Ad spend is extra and is paid by you straight to Facebook and Instagram.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={contactHref}>Send this to Jackson</Button>
                      <Button href={whatsappHref} variant="secondary">
                        WhatsApp this
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <p className="font-mono-label border-t border-line px-5 py-4 text-[10px] leading-relaxed text-fg-50 sm:px-6">
                Starting prices, not a quote. The final price is the one in your written scope.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      data-cursor={on ? "REMOVE" : "PICK"}
      className={`font-mono-label flex items-center gap-3 border-2 px-4 py-2.5 text-left text-[11px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${
        on ? "border-cream bg-cream text-ink" : "border-fg/45 bg-surface-2 text-fg hover:border-fg hover:bg-surface-3"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${on ? "border-ink bg-ink text-cream" : "border-fg/50"}`}
      >
        {on ? "✓" : ""}
      </span>
      {label}
    </button>
  );
}
