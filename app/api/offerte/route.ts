// app/api/offerte/route.ts
import nodemailer from "nodemailer";

type OffertePayload = {
  name?: string;
  email?: string;     // optioneel (replyTo als aanwezig)
  tel?: string;
  street?: string;
  number?: string;
  bus?: string;
  zip?: string;
  city?: string;
  services?: string[]; // labels (bv. "Elektriciteitswerken")
  message?: string;
  subject?: string;    // optioneel
};

function s(v: unknown): string {
  return (v ?? "").toString().trim();
}
function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(x => s(x)).filter(Boolean);
  if (typeof v === "string") {
    return v.split(",").map(x => x.trim()).filter(Boolean);
  }
  return [];
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
  let data: OffertePayload = {};
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const form = await req.formData();
      data = {
        name: s(form.get("name")),
        email: s(form.get("email")),
        tel: s(form.get("tel")),
        street: s(form.get("street")),
        number: s(form.get("number")),
        bus: s(form.get("bus")),
        zip: s(form.get("zip")),
        city: s(form.get("city")),
        message: s(form.get("message")),
        subject: s(form.get("subject")),
        // ondersteunt zowel meerdere "services" velden als CSV string
        services:
          form.getAll("services").length > 0
            ? form.getAll("services").map(s)
            : arr(form.get("services")),
      };
    }
  } catch {
    // parsing errors vallen door naar validatie
  }

  const name = s(data.name);
  const email = s(data.email);
  const tel = s(data.tel);
  const street = s(data.street);
  const number = s(data.number);
  const bus = s(data.bus);
  const zip = s(data.zip);
  const city = s(data.city);
  const message = s(data.message);
  const services = (data.services ?? []).map(s).filter(Boolean);
  const subject = s(data.subject) || "Nieuwe offerte-aanvraag";

  // Validatie (sluit aan op je frontend)
  if (!name || !street || !number || !zip || !city || !message || services.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400 });
  }

  // Nodemailer transporter
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465; // TLS bij 465
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  // Tekst & HTML body
  const textBody = [
    `Naam: ${name}`,
    email ? `E-mail: ${email}` : null,
    tel ? `Telefoon: ${tel}` : null,
    `Adres: ${street} ${number}${bus ? ` bus ${bus}` : ""}, ${zip} ${city}`,
    `Diensten: ${services.join(", ")}`,
    "",
    "Bericht:",
    message,
  ].filter(Boolean).join("\n");

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111">
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      ${email ? `<p><strong>E-mail:</strong> ${escapeHtml(email)}</p>` : ""}
      ${tel ? `<p><strong>Telefoon:</strong> ${escapeHtml(tel)}</p>` : ""}
      <p><strong>Adres:</strong> ${escapeHtml(street)} ${escapeHtml(number)}${bus ? ` bus ${escapeHtml(bus)}` : ""}, ${escapeHtml(zip)} ${escapeHtml(city)}</p>
      <p><strong>Diensten:</strong> ${services.map(escapeHtml).join(", ")}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0" />
      <p><strong>Bericht:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Kemtech Offerte" <${process.env.SMTP_USER!}>`,
      to: process.env.CONTACT_TO_EMAIL!,   // jouw inbox
      replyTo: email || undefined,         // indien opgegeven
      subject,
      text: textBody,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("SMTP error:", err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Failed to send" }), { status: 500 });
  }
}
