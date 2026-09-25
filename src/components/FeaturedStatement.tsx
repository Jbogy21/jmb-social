import RevealOnScroll from "./RevealOnScroll";

export default function FeaturedStatement() {
  return (
    <section className="bg-green py-28 text-cream md:py-40">
      <div className="container-edge">
        <RevealOnScroll>
          <p className="font-display max-w-5xl text-4xl font-medium leading-[1.12] sm:text-5xl md:text-6xl">
            Your website. Your content. Your social. Your ads.{" "}
            <span className="text-sage">
              Finally pulling in the same direction.
            </span>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
