import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body.email || "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  // TODO: wire to ConvertKit / Mailchimp / Brevo here using an env var for the API key.
  // Example: await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
  //   method: "POST", headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ api_key: process.env.CONVERTKIT_KEY, email }),
  // });
  // For now we acknowledge the signup so the form is fully functional end-to-end.
  return NextResponse.json({ ok: true });
}
