import { NextRequest, NextResponse } from "next/server";

// IndexNow key — must match the file served at /<KEY>.txt in /public.
const KEY = "a1b2c3d4e5f60718293a4b5c6d7e8f90";
const HOST = (process.env.NEXT_PUBLIC_SITE_URL || "https://dtcwise.com").replace(/^https?:\/\//, "");
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function POST(req: NextRequest) {
  let urlList: string[] = [];
  try {
    const body = await req.json();
    urlList = Array.isArray(body.urlList) ? body.urlList.map(String) : [];
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (urlList.length === 0) {
    return NextResponse.json({ ok: false, error: "urlList is required" }, { status: 400 });
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const detail = await res.text();
  return NextResponse.json({ ok: res.ok, status: res.status, detail });
}
