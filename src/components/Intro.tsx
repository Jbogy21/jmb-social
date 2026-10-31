import IntroSkip from "./IntroSkip";

// The decision script that adds `intro-active` lives in the root layout so it runs
// once per page load (React will not run scripts rendered during navigation).
export default function Intro() {
  return (
    <>
      <div className="intro-overlay" aria-hidden="true">
        <span className="intro-door intro-door-l" />
        <span className="intro-door intro-door-r" />
        <div className="intro-mark">
          <p className="intro-word">
            <span className="intro-letter">J</span>
            <span className="intro-letter">M</span>
            <span className="intro-letter">B</span>
          </p>
          <span className="intro-line" />
          <p className="intro-caption">Social · Creative &amp; Growth Studio</p>
        </div>
      </div>
      <IntroSkip />
    </>
  );
}
