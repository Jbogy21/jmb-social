import { servicePackages } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import RevealOnScroll from "./RevealOnScroll";
import { Button } from "./Button";

export default function Packages({ index = "05" }: { index?: string }) {
  return (
    <section id="packages" className="border-b border-line py-24 md:py-32">
      <div className="container-edge">
        <RevealOnScroll className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index={index} label="Packages" />
            <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
              Several things done properly, at one lower rate.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-70">
            Each package bundles the disciplines that work best together for
            less than booking them separately, tailored in a short scoping
            call.
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-3">
          {servicePackages.map((pack, position) => (
            <RevealOnScroll key={pack.name} delay={position * 80} className="bg-cream">
              <div className="flex h-full flex-col p-8 sm:p-10">
                <p className="font-mono-label text-xs text-ink-50">{pack.name}</p>
                <p className="font-display mt-6 text-5xl font-medium leading-none text-ink">
                  <span className="font-mono-label mr-2 align-middle text-[11px] text-ink-50">
                    From
                  </span>
                  {pack.price}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink-70">{pack.forWho}</p>
                <ul className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-70">
                      <span aria-hidden="true" className="mt-[7px] h-px w-3 shrink-0 bg-ink-50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href="/contact" variant="secondary" arrow>
                    Discuss {pack.name}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-xs leading-relaxed text-ink-50">
          Introductory rates, offered while the studio builds its client
          portfolio. Indicative starting prices; every engagement is scoped to
          your goals and quoted in full before work begins.
        </p>
      </div>
    </section>
  );
}
