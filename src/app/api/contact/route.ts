import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  website?: string;
  helpNeeded?: string[];
  budget?: string;
  details?: string;
};

// Minimal enquiry endpoint. Currently logs submissions server-side.
// To send real notification emails, wire in a provider such as Resend here
// (see README for the recommended setup) — the form and its states above
// this route don't need to change.
export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email } = payload;

  if (!name || typeof name !== "string" || !email || typeof email !== "string") {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  console.log("New JMB Social enquiry:", payload);

  return NextResponse.json({ ok: true });
}
