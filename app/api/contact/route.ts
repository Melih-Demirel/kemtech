import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  let email = "";
  let message = "";
  let subject = "";

  // Accept BOTH JSON (fetch) and form POSTs (<form action="/api/contact" method="POST">)
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = (body?.email ?? "").toString();
      message = (body?.message ?? "").toString();
      subject = (body?.subject ?? "").toString();
    } else {
      const form = await req.formData();
      email = String(form.get("email") ?? "");
      message = String(form.get("message") ?? "");
      subject = String(form.get("subject") ?? "");
    }
  } catch {
    // ignore; we'll validate below
  }

  if (!email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: `Melih.eu Contact <${process.env.CONTACT_FROM_EMAIL!}>`, // now from your verified domain
    to: [process.env.CONTACT_TO_EMAIL!],                     // array is safest
    replyTo: email,
    subject: subject || "New contact form message",
    text: `From: ${email}\n\n${message}`,
  });
  if (error) {
    console.error("Resend error:", error); // check Vercel → Functions → Logs if it still fails
    return new Response(JSON.stringify({ ok: false, error: error.message || "Failed to send" }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
