"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLogo } from "./Logo";
import { Button } from "./Button";
import { navLinks } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
      <div className="container-edge flex h-20 items-center justify-between md:h-24">
        <NavLogo />

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-hover font-mono-label text-[11px] text-ink/80 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" arrow>
            Start a project
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-20 z-40 origin-top border-b border-line bg-cream transition-[transform,opacity] duration-300 md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 py-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display border-b border-line py-4 text-2xl font-medium text-ink"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6">
            <Button href="/contact" className="w-full justify-center">
              Start a project
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
