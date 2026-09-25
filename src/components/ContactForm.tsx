"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { helpOptions, budgetOptions } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink placeholder:text-ink-50 focus:border-ink focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [helpNeeded, setHelpNeeded] = useState<string[]>([]);

  function toggleHelp(option: string) {
    setHelpNeeded((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
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
      setHelpNeeded([]);
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
          We read every enquiry personally and reply within one to two working
          days. Speak soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12" noValidate>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </Field>

        <Field label="Company" htmlFor="company">
          <input id="company" name="company" type="text" autoComplete="organization" className={inputClasses} />
        </Field>

        <Field label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
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

      <Field label="Tell us a bit about the project" htmlFor="details">
        <textarea
          id="details"
          name="details"
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="border border-ink/20 bg-ink/5 px-4 py-3 text-sm text-ink">
          {errorMessage} Please try again, or email us directly.
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === "submitting"} className="disabled:opacity-60">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
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
