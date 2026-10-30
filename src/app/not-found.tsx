import SectionLabel from "@/components/SectionLabel";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-edge">
        <SectionLabel label="Error 404" />
        <h1 className="font-display mt-6 max-w-3xl text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
          This page has wandered off.
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-70">
          The link may be old or mistyped. Here are the places most people are
          looking for.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/work" variant="secondary">
            See the work
          </Button>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
