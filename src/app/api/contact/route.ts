import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  website?: unknown;
  helpNeeded?: unknown;
  budget?: unknown;
  christmasOffer?: unknown;
  details?: unknown;
  hp?: unknown;
};

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (payload.hp) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const company = clean(payload.company, 160);
  const website = clean(payload.website, 300);
  const budget = clean(payload.budget, 60);
  const helpNeeded = Array.isArray(payload.helpNeeded)
    ? payload.helpNeeded.map((item) => clean(item, 60)).filter(Boolean).slice(0, 12)
    : [];
  const details =
    typeof payload.details === "string" ? payload.details.trim().slice(0, 5000) : "";
  const claimedOffer = payload.christmasOffer === true;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Website: ${website || "-"}`,
    `Needs: ${helpNeeded.length ? helpNeeded.join(", ") : "-"}`,
    `Budget: ${budget || "-"}`,
    `Christmas offer claimed: ${claimedOffer ? "YES (first-time client)" : "no"}`,
    "",
    "Details:",
    details || "-",
  ];

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("Contact form: RESEND_API_KEY is not set, enquiry not delivered.");
      return NextResponse.json({ error: "Email delivery is not set up yet." }, { status: 500 });
    }
    console.log("New JMB Social enquiry (no RESEND_API_KEY, logged only):\n" + lines.join("\n"));
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "JMB Social Website <onboarding@resend.dev>",
        to: [siteConfig.email],
        reply_to: email,
        subject: `${claimedOffer ? "[Christmas offer] " : ""}New enquiry from ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Contact form: Resend rejected the email", response.status, await response.text());
      return NextResponse.json({ error: "Could not send your enquiry." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form: could not reach Resend", error);
    return NextResponse.json({ error: "Could not send your enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
