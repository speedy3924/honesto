import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  await fetch("https://ntfy.sh/honestope2026xk8", {
    method: "POST",
    headers: {
      "Title": "Nueva solicitud HONESTOpe",
      "Priority": "urgent",
      "Tags": "bell",
    },
    body: `${body.name} necesita ${body.service} en ${body.district}. Tel: ${body.phone}`,
  });

  return NextResponse.json({ ok: true });
}