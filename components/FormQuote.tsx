"use client";
import React, { useMemo, useRef, useEffect, useState } from "react";
import { PaperAirplaneIcon, ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

export type ServiceKey = "electricity" | "airco" | "ventilation" | "charging-stations";

export const SERVICES: { key: ServiceKey; label: string }[] = [
  { key: "electricity", label: "Elektriciteitswerken" },
  { key: "airco", label: "Airco" },
  { key: "ventilation", label: "Ventilatie" },
  { key: "charging-stations", label: "Laadpalen" },
];

export const QuoteForm: React.FC<{
  services?: { key: ServiceKey; label: string }[];
}> = ({ services = SERVICES }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [bus, setBus] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [chosen, setChosen] = useState<ServiceKey[]>([]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [feedback, setFeedback] = useState<null | { type: "ok" | "err"; text: string }>(null);

  // auto-reset timer
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const valid = useMemo(
    () =>
      !!name.trim() &&
      !!street.trim() &&
      !!number.trim() &&
      !!zip.trim() &&
      !!city.trim() &&
      chosen.length > 0 &&
      !!message.trim() &&
      consent,
    [name, street, number, zip, city, chosen.length, message, consent]
  );

  const toggle = (key: ServiceKey) => {
    setChosen(prev => (prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    if (!valid) {
      setFeedback({ type: "err", text: "Gelieve alle verplichte velden in te vullen en minstens één dienst te kiezen." });
      return;
    }

    try {
      setSubmitting(true);
      setStatus("loading");

      // labels uitsturen (jouw API verwacht labels)
      const serviceLabels = services.filter(s => chosen.includes(s.key)).map(s => s.label);

      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("tel", tel);
      fd.set("street", street);
      fd.set("number", number);
      fd.set("bus", bus);
      fd.set("zip", zip);
      fd.set("city", city);
      serviceLabels.forEach(label => fd.append("services", label));
      fd.set("message", message);

      const res = await fetch("/api/offerte", { method: "POST", body: fd });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setFeedback({ type: "ok", text: "Bedankt! We bezorgen je zo snel mogelijk een vrijblijvende offerte." });
      setStatus("sent");

      // velden resetten
      setName("");
      setEmail("");
      setTel("");
      setStreet("");
      setNumber("");
      setBus("");
      setZip("");
      setCity("");
      setChosen([]);
      setMessage("");
      setConsent(false);

      // na 5s: feedback verbergen + knop terug naar normaal
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setFeedback(null);
        setStatus("idle");
      }, 2500);
    } catch (err: any) {
      setStatus("idle");
      setFeedback({ type: "err", text: err?.message || "Er ging iets mis bij het versturen. Probeer later opnieuw." });
    } finally {
      setSubmitting(false);
    }
  };

  // Consistente styling
  const fieldStyle =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400";

  // Button states
  const disabled = submitting || !valid || status === "sent";
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
  const buttonText = status === "loading" ? "Versturen..." : status === "sent" ? "Verstuurd" : "Verstuur aanvraag";

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-2xl bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Pitch in form: eerste zin oranje, tweede zin neutraal */}
      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
        <p className="text-sm">
          <span className="text-[#ff8000] font-medium">Beschrijf kort je project (type dienst, locatie, timing).</span>{" "}
          <span className="text-slate-700">We sturen je een heldere, vrijblijvende offerte.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naam *</label>
          <input type="text" className={fieldStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Je naam" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail *</label>
          <input type="email" className={fieldStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="Je e-mail" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">Straat *</label>
            <input type="text" className={fieldStyle} value={street} onChange={e => setStreet(e.target.value)} placeholder="Straat" required />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">Nr. *</label>
            <input type="text" className={fieldStyle} value={number} onChange={e => setNumber(e.target.value)} placeholder="Nr." required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bus</label>
            <input type="text" className={fieldStyle} value={bus} onChange={e => setBus(e.target.value)} placeholder="Bus" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Postcode *</label>
            <input type="text" className={fieldStyle} value={zip} onChange={e => setZip(e.target.value)} placeholder="Postcode" required />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium mb-1">Plaats *</label>
            <input type="text" className={fieldStyle} value={city} onChange={e => setCity(e.target.value)} placeholder="Plaats" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefoon *</label>
          <input type="text" className={fieldStyle} value={tel} onChange={e => setTel(e.target.value)} placeholder="04xx xx xx xx" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Voor welke diensten wil je graag een offerte?*</label>
          <div className="grid sm:grid-cols-1 gap-2">
            {services.map(s => (
              <label
                key={s.key}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer ${chosen.includes(s.key) ? "border-black bg-gray-50" : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input type="checkbox" className="rounded" checked={chosen.includes(s.key)} onChange={() => toggle(s.key)} />
                <span className="font-medium">{s.label}</span>
              </label>
            ))}
          </div>
          <p className={`text-xs mt-2 ${chosen.length ? "text-gray-500" : "text-red-600"}`}>
            {chosen.length ? `${chosen.length} geselecteerd` : "Kies minstens één dienst."}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bericht *</label>
          <textarea
            className={`${fieldStyle} min-h-[120px]`}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Vertel kort je probleem of wat je wil…"
            required
          />
        </div>

        <div className="flex items-start gap-3">
          <input id="quote-privacy-consent" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300" checked={consent} onChange={e => setConsent(e.target.checked)} required />
          <label htmlFor="quote-privacy-consent" className="text-sm text-gray-700">
            Ik ga akkoord met het{" "}
            <a href="/privacy" className="text-[#ff8000] font-medium hover:text-black transition-colors">
              privacybeleid
            </a>{" "}
            van <i className="not-italic text-[#ff8000]">Kemtech</i>.
          </label>
        </div>

        {feedback && <p className={`text-sm ${feedback.type === "ok" ? "text-green-600" : "text-red-600"}`}>{feedback.text}</p>}

        <div className="pt-2">
          <button type="submit" disabled={disabled} className={submitBtnClass}>
            <ButtonIcon />
            {buttonText}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Vragen over privacy? Mail ons via{" "}
          <a href="mailto:info@kemtech.be" className="text-[#ff8000] hover:text-black">info@kemtech.be</a>.
        </p>
      </div>
    </form>
  );
};
