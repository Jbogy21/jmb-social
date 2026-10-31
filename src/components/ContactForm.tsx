"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { helpOptions, budgetOptions, christmasOffer } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const subscribeNothing = () => () => {};

const inputClasses =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink placeholder:text-ink-50 focus:border-ink focus:outline-none";

export default function ContactForm({ offerActive = false }: { offerActive?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[] | null>(null);

  // Arriving from the Creative side pre-selects that need and adjusts the prompt.
  const forCreative = useSyncExternalStore(
    subscribeNothing,
    () => new URLSearchParams(window.location.search).get("for") === "creative",
    () => false
  );
  const helpNeeded = picked ?? (forCreative ? ["Fashion, music or sport content"] : []);

  function toggleHelp(option: string) {
    setPicked(
      helpNeeded.includes(option)
        ? helpNeeded.filter((item) => item !== option)
        : [...helpNeeded, option]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      website: formData.get("website"),
      helpNeeded,
      budget: formData.get("budget"),
      details: formData.get("details"),
      christmasOffer: formData.get("christmasOffer") === "on",
      hp: formData.get("hp"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Something went wrong sending your enquiry.");
      }

      setStatus("success");
      form.reset();
      setPicked([]);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong sending your enquiry."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-cream-2 px-8 py-16 text-center">
        <p className="font-mono-label text-xs text-ink-70">Enquiry sent</p>
        <h3 className="font-display mt-4 text-3xl font-medium text-ink">
          Thanks — that&apos;s with us.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-70">
          I read every enquiry myself and reply within one to two working
          days. Speak soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-12" noValidate>
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </Field>
      </div>

      <fieldset>
        <legend className="font-mono-label text-xs text-ink-70">
          What do you need help with?
        </legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {helpOptions.map((option) => {
            const active = helpNeeded.includes(option);
            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleHelp(option)}
                aria-pressed={active}
                className={`font-mono-label border px-4 py-2.5 text-[11px] transition-colors duration-200 ${
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-70 hover:border-ink hover:text-ink"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field
        label={
          forCreative
            ? "Tell me about you and what you're building"
            : "Tell me a bit about the project"
        }
        htmlFor="details"
      >
        <textarea
          id="details"
          name="details"
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      {offerActive && (
        <label className="flex cursor-pointer items-start gap-4 border border-line bg-cream-2 p-5 has-[:checked]:border-ink">
          <input
            type="checkbox"
            name="christmasOffer"
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-green)]"
          />
          <span>
            <span className="font-mono-label block text-[11px] text-ink">
              Christmas offer · {christmasOffer.discount} off
            </span>
            <span className="mt-1.5 block text-sm leading-relaxed text-ink-70">
              I&apos;m a first-time client, please apply the offer. Booking by{" "}
              {christmasOffer.endsLabel}.
            </span>
          </span>
        </label>
      )}

      <details className="group border-t border-line pt-6">
        <summary className="font-mono-label flex cursor-pointer list-none items-center gap-3 text-xs text-ink-70 hover:text-ink [&::-webkit-details-marker]:hidden">
          <span
            aria-hidden="true"
            className="relative h-3 w-3 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-current after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
          />
          Add more detail (optional)
        </summary>

        <div className="mt-8 space-y-10">
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            <Field label="Company" htmlFor="company">
              <input id="company" name="company" type="text" autoComplete="organization" className={inputClasses} />
            </Field>

            <Field label="Website" htmlFor="website">
              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://"
                autoComplete="url"
                className={inputClasses}
              />
            </Field>
          </div>

          <fieldset>
            <legend className="font-mono-label text-xs text-ink-70">
              Approximate project budget
            </legend>
            <div className="mt-5 flex flex-wrap gap-3">
              {budgetOptions.map((option) => (
                <label
                  key={option}
                  className="font-mono-label has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-cream flex cursor-pointer items-center border border-line px-4 py-2.5 text-[11px] text-ink-70 transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  <input type="radio" name="budget" value={option} className="sr-only" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </details>

      {status === "error" && (
        <p role="alert" className="border border-ink/20 bg-ink/5 px-4 py-3 text-sm text-ink">
          {errorMessage} Please try again, or email us directly.
        </p>
      )}

      <div className="flex flex-col gap-5">
        <div>
          <Button type="submit" disabled={status === "submitting"} className="disabled:opacity-60">
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </Button>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-ink-70">
          I&apos;ll only use your details to reply to you. See the{" "}
          <Link href="/privacy" className="underline">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-mono-label text-xs text-ink-70">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}
