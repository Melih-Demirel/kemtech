import nodemailer from "nodemailer";

// Simple in-memory rate limit tracker (resets on server restart)
const ipTracker: Record<string, number> = {};

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  captcha?: string;
  company?: string; // honeypot field
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
        subject: s(form.get("subject")),
        captcha: s(form.get("captcha")),
        company: s(form.get("company")),
      };
    }
  } catch {
    // ignore parse errors
  }

  const name = s(data.name);
  const email = s(data.email);
  const message = s(data.message);
  const subject = s(data.subject) || "Nieuwe contactaanvraag";
  const captcha = s(data.captcha);
  const honeypot = s(data.company);

  // 🔒 1. Origin check (only allow your domain)
  const origin = req.headers.get("origin") || "";
  const allowedDomains = ["localhost", "kemtech.be"];

  // Check if the origin includes any of the allowed domains
  if (!allowedDomains.some(domain => origin.includes(domain))) {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid origin" }),
      { status: 403 }
    );
  }


  // 🔒 2. Rate limit (1 request per 30s per IP)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  const now = Date.now();
  const last = ipTracker[ip] || 0;
  const cooldown = 60_000; // 60 seconds

  if (now - last < cooldown) {
    const secondsLeft = Math.ceil((cooldown - (now - last)) / 1000);
    return new Response(
      JSON.stringify({ ok: false, error: `Please wait ${secondsLeft} second${secondsLeft > 1 ? 's and try sending again.' : ''}` }),
      { status: 429 }
    );
  }

  // Update the tracker
  ipTracker[ip] = now;

  // 🧠 Honeypot check
  if (honeypot) {
    return new Response(JSON.stringify({ ok: false, error: "Spam detected" }), { status: 400 });
  }

  // 🧩 reCAPTCHA verification
  try {
    if (!captcha) {
      return new Response(JSON.stringify({ ok: false, error: "Captcha missing" }), { status: 400 });
    }

    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: captcha,
      }),
    });

    const result = await verify.json();

    if (!result.success) {
      console.warn("Captcha failed:", result);
      return new Response(JSON.stringify({ ok: false, error: "Captcha verification failed" }), {
        status: 400,
      });
    }
  } catch (err) {
    console.error("Captcha error:", err);
    return new Response(JSON.stringify({ ok: false, error: "Captcha request failed" }), {
      status: 400,
    });
  }

  // Basic validation
  if (!email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
  }

  // ✉️ Nodemailer transport
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

  // Email content
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
