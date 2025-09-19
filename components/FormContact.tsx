"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  PaperAirplaneIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; text: string }>(null);

  // timer ref voor automatische reset na succes
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const fieldStyle =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400";

  const isFormValid = consent && name.trim() && email.trim() && message.trim();
  const disabled = submitting || !isFormValid || status === "sent";

  const baseBtn = "w-full rounded-full py-3 font-semibold inline-flex items-center justify-center gap-2 transition";
  const submitBtnClass =
    status === "sent"
      ? `${baseBtn} bg-emerald-600 text-white cursor-default`
      : disabled
        ? `${baseBtn} bg-gray-300 text-gray-600 cursor-not-allowed`
        : `${baseBtn} bg-[#ff8000] text-white hover:opacity-90`;

  const ButtonIcon = () => {
    if (status === "loading") return <ArrowPathIcon className="w-5 h-5 animate-spin" />;
    if (status === "sent") return <CheckCircleIcon className="w-5 h-5" />;
    return <PaperAirplaneIcon className="w-5 h-5" />;
  };

  const buttonText =
    status === "loading" ? "Versturen..." : status === "sent" ? "Verstuurd" : "Versturen";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    if (!isFormValid) {
      setFeedback({
        type: "err",
        text: "Vul minstens naam, e-mail en bericht in en ga akkoord met het privacybeleid.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setStatus("loading");

      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("message", message);
      fd.set("subject", "Contact via website");

      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setFeedback({ type: "ok", text: "Bedankt! We nemen zo snel mogelijk contact op." });
      setStatus("sent");

      // velden leegmaken
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);

      // 🔁 na 5s: feedback weg + button terug naar normaal
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setFeedback(null);
        setStatus("idle");
      }, 2500);
    } catch (err: any) {
      setStatus("idle");
      setFeedback({
        type: "err",
        text: err?.message || "Er ging iets mis bij het versturen. Probeer later opnieuw.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Pitch in form */}
      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
        <p className="text-sm">
          <span className="text-[#ff8000] font-medium">Vragen of advies?</span>{" "}
          <span className="text-slate-700">Laat je gegevens achter en we nemen snel contact op.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naam *</label>
          <input
            type="text"
            className={fieldStyle}
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
            className={fieldStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jij@voorbeeld.be"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bericht *</label>
          <textarea
            className={`${fieldStyle} min-h-[120px]`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Vertel kort je probleem of wat je wil (dienst, locatie, timing)…"
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
            <a href="/privacy" className="text-[#ff8000] font-medium hover:text-black transition-colors">
              privacybeleid
            </a>{" "}
            van <i className="not-italic text-[#ff8000]">Kemtech</i>.
          </label>
        </div>

        {feedback && (
          <p className={`text-sm ${feedback.type === "ok" ? "text-green-600" : "text-red-600"}`}>
            {feedback.text}
          </p>
        )}

        <div className="pt-2">
          <button type="submit" disabled={disabled} className={submitBtnClass}>
            <ButtonIcon />
            {buttonText}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Vragen over privacy? Mail ons via{" "}
          <a href="mailto:info@kemtech.be" className="text-[#ff8000] hover:text-black">
            info@kemtech.be
          </a>.
        </p>
      </div>
    </form>
  );
};
