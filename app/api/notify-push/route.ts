import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Inicializar firebase-admin solo una vez
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { title, body, url } = await req.json();
    if (!title || !body) {
      return NextResponse.json({ error: "title y body requeridos" }, { status: 400 });
    }

    const snap = await getDocs(collection(db, "push_tokens"));
    const tokens = snap.docs.map(d => d.data().token as string).filter(Boolean);

    if (tokens.length === 0) {
      return NextResponse.json({ sent: 0, failed: 0, total: 0, message: "No hay suscriptores" });
    }

    const messaging = getMessaging();
    let sent = 0;
    let failed = 0;

    for (const token of tokens) {
      try {
        await messaging.send({
          token,
          notification: { title, body },
          webpush: {
            notification: {
              icon: "https://www.honestope.com/logo.png",
            },
            fcmOptions: {
              link: url || "https://www.honestope.com/mercado",
            },
          },
        });
        sent++;
      } catch {
        failed++;
      }
    }

    return NextResponse.json({ sent, failed, total: tokens.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}