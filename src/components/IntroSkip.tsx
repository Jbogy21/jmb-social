"use client";

import { useEffect } from "react";

function finish() {
  const root = document.documentElement;
  root.classList.remove("intro-active");
  root.classList.add("intro-seen");
}

export default function IntroSkip() {
  useEffect(() => {
    try {
      sessionStorage.setItem("jmb-intro", "1");
    } catch {
      /* storage unavailable: the entrance simply plays each visit */
    }
    const timer = window.setTimeout(finish, 3900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button type="button" className="intro-skip" onClick={finish}>
      Skip
    </button>
  );
}
