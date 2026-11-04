"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLogo } from "./Logo";
import { navLinks } from "@/lib/data";

// A glass pill that floats over the page. It is clear at the very top and turns into a
// soft dark glass bar once the page has started to scroll.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-white/10 bg-[#10130b]/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-edge flex h-20 items-center justify-between gap-4 md:h-24">
        <NavLogo tone="cream" />

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-md lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const current = isCurrent(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`font-mono-label flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] transition-colors duration-200 ${
                  current
                    ? "bg-white/15 text-cream"
                    : "text-cream/80 hover:bg-white/10 hover:text-cream"
                }`}
              >
                {current && <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="font-mono-label group hidden items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[11px] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97] lg:inline-flex"
        >
          Start a project
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span
            className={`block h-px w-5 bg-cream transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-cream transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-20 z-40 origin-top border-b border-white/10 bg-[#10130b] transition-[transform,opacity] duration-300 md:top-24 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 py-6" aria-label="Mobile">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display border-b border-white/10 py-4 text-2xl font-medium text-cream transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + index * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6">
            <Link
              href="/contact"
              className="font-mono-label flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 text-[11px] text-ink"
            >
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
