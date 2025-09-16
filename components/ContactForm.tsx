// components/ContactForm.tsx
"use client";
import React, { useState } from "react";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; text: string }>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    if (!consent) {
      setFeedback({ type: "err", text: "Je moet akkoord gaan met het privacybeleid om te versturen." });
      return;
    }

    // Basisvalidatie
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: "err", text: "Vul minstens naam, e-mail en bericht in." });
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Vervang dit met je eigen API-call of email-service
      // Voorbeeld: await fetch("/api/contact", { method: "POST", body: JSON.stringify({ name, email, tel, message, consent }) });

      // Simulatie:
      await new Promise((r) => setTimeout(r, 800));
      setFeedback({ type: "ok", text: "Bedankt! We nemen zo snel mogelijk contact op." });
      setName("");
      setEmail("");
      setTel("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      setFeedback({ type: "err", text: "Er ging iets mis bij het versturen. Probeer later opnieuw." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naam *</label>
          <input
            type="text"
            className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je naam"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail *</label>
          <input
            type="email"
            className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.be"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefoon</label>
          <input
            type="tel"
            className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-0"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="04xx xx xx xx"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bericht *</label>
          <textarea
            className="w-full min-h-[120px] rounded-md border-gray-300 focus:border-gray-900 focus:ring-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Vertel kort wat je nodig hebt (dienst, locatie, timing)…"
            required
          />
        </div>

        {/* Verplichte privacy-toestemming */}
        <div className="flex items-start gap-3">
          <input
            id="privacy-consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <label htmlFor="privacy-consent" className="text-sm text-gray-700">
            Ik ga akkoord met het{" "}
            <a href="/privacy" className="font-medium hover:text-orange-600 transition-colors">
              privacybeleid
            </a>&nbsp;van <i>Kemtech</i>.
          </label>
        </div>

        {feedback && (
          <p
            className={`text-sm ${feedback.type === "ok" ? "text-green-600" : "text-red-600"
              }`}
          >
            {feedback.text}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting || !consent}
            className="w-full rounded-lg bg-gray-900 text-white py-3 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Versturen..." : "Versturen"}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Vragen over privacy? Mail ons via <a href="mailto:info@kemtech.be" className="hover:text-orange-600">info@kemtech.be</a>.
        </p>
      </div>
    </form>
  );
};
