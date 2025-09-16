import nodemailer from "nodemailer";

export async function POST(req: Request) {
  let email = "", message = "", subject = "";
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
  } catch { }

  if (!email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });


  try {
    await transporter.sendMail({
      from: `"Kemtech Contact" <${process.env.SMTP_USER!}>`,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: subject || "New contact form message",
      text: `From: ${email}\n\n${message}`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("SMTP error:", err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Failed to send" }), { status: 500 });
  }
}
