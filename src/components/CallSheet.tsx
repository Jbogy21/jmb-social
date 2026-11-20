import { callSheet } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";

// The way a project runs, laid out like the call sheet for a shoot: who, where and when at the
// top, then one row per scene. Used on the local business page and About.
export default function CallSheet({
  label = "How a project runs",
  heading = "Your project, laid out like a shoot.",
  intro = "Every job runs the same way. Here is the call sheet.",
}: {
  label?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-line py-16 sm:py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <SectionLabel label={label} />
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] text-fg sm:text-5xl">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-70 md:col-span-4 md:justify-self-end">
            {intro}
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 sm:mt-16">
          <div className="relative border border-line bg-surface-2">
            {/* registration marks, like the corners of a printed sheet */}
            <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-cream/70" aria-hidden="true" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-cream/70" aria-hidden="true" />

            <div className="font-mono-label flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 text-[11px] text-fg sm:px-8">
              <span className="flex items-center gap-3">
                <span className="rec-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                Call sheet
              </span>
              <span className="text-fg-70">JMB Social · Digital Studio</span>
            </div>

            <dl className="grid grid-cols-2 border-b border-line md:grid-cols-3 lg:grid-cols-6">
              {callSheet.fields.map((field) => (
                <div key={field.label} className="border-b border-line px-5 py-4 last:border-b-0 sm:px-8 md:border-r md:last:border-r-0 lg:border-b-0 lg:px-5">
                  <dt className="font-mono-label text-[10px] text-fg-50">{field.label}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-fg">{field.value}</dd>
                </div>
              ))}
            </dl>

            <div
              className="font-mono-label hidden grid-cols-[4.5rem_1fr_1.3fr_1fr_1fr] gap-6 border-b border-line px-8 py-3 text-[10px] text-fg-50 lg:grid"
              aria-hidden="true"
            >
              <span>Scene</span>
              <span />
              <span>What happens</span>
              <span>You get</span>
              <span>Time</span>
            </div>

            <ol>
              {callSheet.scenes.map((scene) => (
                <li
                  key={scene.number}
                  className="grid gap-x-6 gap-y-3 border-b border-line px-5 py-6 last:border-b-0 sm:px-8 lg:grid-cols-[4.5rem_1fr_1.3fr_1fr_1fr] lg:items-baseline lg:py-7"
                >
                  <span className="font-mono-label text-xs text-signal-soft">SC {scene.number}</span>
                  <h3 className="font-display text-2xl font-medium leading-tight text-fg">
                    {scene.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-70">{scene.what}</p>
                  <p className="text-sm leading-relaxed text-fg">
                    <span className="font-mono-label mr-2 text-[10px] text-fg-50 lg:hidden">You get</span>
                    {scene.youGet}
                  </p>
                  <p className="text-sm leading-relaxed text-fg-70">
                    <span className="font-mono-label mr-2 text-[10px] text-fg-50 lg:hidden">Time</span>
                    {scene.time}
                  </p>
                </li>
              ))}
            </ol>

            <p className="font-mono-label border-t border-line px-5 py-4 text-[10px] leading-relaxed text-fg-50 sm:px-8">
              {callSheet.note}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
