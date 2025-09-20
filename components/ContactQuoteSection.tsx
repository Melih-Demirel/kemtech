"use client";
import React, { useEffect, useState } from "react";
import { ContactForm } from "@/components/FormContact";
import { QuoteForm, SERVICES } from "@/components/FormQuote";

export function ContactQuoteSection(): JSX.Element {
  const [tab, setTab] = useState<"contact" | "offerte">("offerte");

  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "contact" || h === "offerte") setTab(h);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const activate = (next: "contact" | "offerte") => {
    setTab(next);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${next}`);
    }
    // Force blur on all buttons to remove focus state
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <section id="contact-offerte" className="scroll-mt-12 py-16">
      <span id="offerte" className="block -mt-32 pt-32" aria-hidden />
      <span id="contact" className="block -mt-32 pt-32" aria-hidden />

      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="sr-only">Contact & Offerte</h2>

        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Kies formulier"
            className="inline-flex items-center gap-0 rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              role="tab"
              aria-selected={tab === "offerte"}
              onClick={() => activate("offerte")}
              className={`px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#e97500ff] focus:ring-offset-0 focus:z-10 relative
                ${tab === "offerte"
                  ? "bg-[#e97500ff] text-black"
                  : "bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100"}`}
            >
              Offerte
            </button>
            <button
              role="tab"
              aria-selected={tab === "contact"}
              onClick={() => activate("contact")}
              className={`px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold border-l border-gray-200 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 focus:z-10 relative
                ${tab === "contact"
                  ? "bg-[#e97500ff] text-black"
                  : "bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100"}`}
            >
              Contact
            </button>
          </div>
        </div>

        <div className="mt-10">
          {tab === "contact" ? <ContactForm /> : <QuoteForm services={SERVICES} />}
        </div>
      </div>
    </section>
  );
}