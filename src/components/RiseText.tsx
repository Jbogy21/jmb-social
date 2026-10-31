type Word = string | { text: string; className: string };

// Headline whose words rise out of a mask one after another. Delays are measured from
// when the entrance finishes, so the words are never seen mid-intro.
export default function RiseText({
  words,
  baseDelay = 0,
  step = 70,
}: {
  words: Word[];
  baseDelay?: number;
  step?: number;
}) {
  return (
    <>
      {words.map((word, index) => {
        const text = typeof word === "string" ? word : word.text;
        const className = typeof word === "string" ? "" : word.className;
        return (
          <span key={index}>
            <span className="rise-mask">
              <span
                className={`rise-word ${className}`}
                style={{
                  animationDelay: `calc(var(--intro-delay, 0s) + ${baseDelay + index * step}ms)`,
                }}
              >
                {text}
              </span>
            </span>{" "}
          </span>
        );
      })}
    </>
  );
}
