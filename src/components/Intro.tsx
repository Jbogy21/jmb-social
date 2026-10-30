import IntroSkip from "./IntroSkip";

// Runs before first paint: first visit in a session plays the entrance, later
// loads skip it. The page content is already in the HTML underneath.
const decide = `try{var s=sessionStorage.getItem('jmb-intro');if(!s){document.documentElement.classList.add('intro-active')}else{document.documentElement.classList.add('intro-seen')}}catch(e){document.documentElement.classList.add('intro-seen')}`;

export default function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: decide }} />
      <div className="intro-overlay" aria-hidden="true">
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
