import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token as string;
}

export async function POST(req: NextRequest) {
  try {
    const { title, body, url } = await req.json();
    if (!title || !body) {
      return NextResponse.json({ error: "title y body requeridos" }, { status: 400 });
    }

    // Obtener todos los tokens guardados
    const snap = await getDocs(collection(db, "push_tokens"));
    const tokens = snap.docs.map(d => d.data().token as string);

    if (tokens.length === 0) {
      return NextResponse.json({ sent: 0, message: "No hay suscriptores aún" });
    }

    const accessToken = await getAccessToken();
    const endpoint = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

    let sent = 0;
    let failed = 0;

    for (const token of tokens) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: {
              token,
              notification: {
                title,
                body,
              },
              webpush: {
                notification: {
                  icon: "https://www.honestope.com/logo.png",
                  click_action: url || "https://www.honestope.com/mercado",
                },
                fcm_options: {
                  link: url || "https://www.honestope.com/mercado",
                },
              },
            },
          }),
        });
        if (res.ok) sent++;
        else failed++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({ sent, failed, total: tokens.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error enviando notificaciones" }, { status: 500 });
  }
}