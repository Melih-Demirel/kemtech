// app/api/contact/route.ts
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
};

function s(v: unknown): string {
  return (v ?? "").toString().trim();
}
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  let data: ContactPayload = {};
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const form = await req.formData();
      data = {
        name: s(form.get("name")),
        email: s(form.get("email")),
        message: s(form.get("message")),
        subject: "Contact via website",
      };
    }
  } catch {
    // parsing errors vallen door naar validatie
  }

  const name = s(data.name);            // optioneel
  const email = s(data.email);
  const message = s(data.message);
  const subject = s(data.subject) || "Nieuwe contactaanvraag";

  if (!email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing fields" }),
      { status: 400 }
    );
  }

  // Transporter (autodetect secure bij 465)
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  // Mail body
  const textBody = [
    name ? `Naam: ${name}` : null,
    `E-mail: ${email}`,
    "",
    "Bericht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111">
      ${name ? `<p><strong>Naam:</strong> ${escapeHtml(name)}</p>` : ""}
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0" />
      <p><strong>Bericht:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Kemtech Contact" <${process.env.SMTP_USER!}>`,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("SMTP error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || "Failed to send" }),
      { status: 500 }
    );
  }
}
