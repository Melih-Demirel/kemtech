"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ChevronRightIcon, BoltIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Socials } from "@/components/Socials";

export default function NavBar({
  bgClass = "bg-neutral-100",
  textClass = "text-black",
  menuBgClass,
}: {
  bgClass?: string;
  textClass?: string;
  /** If not provided, mobile menu will reuse bgClass */
  menuBgClass?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const updateNavbarHeight = useCallback(() => {
    setNavbarHeight(navRef.current?.offsetHeight ?? 0);
  }, []);

  useEffect(() => {
    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, [updateNavbarHeight]);

  // Handle hash changes on page load and navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && !["contact", "offerte"].includes(hash)) {
        // For service sections, scroll to them
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => {
            const navH = navRef.current?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Handle initial hash on page load
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, []);

  // Mount/unmount with exit animation delay
  useEffect(() => {
    if (isOpen) {
      setRenderMenu(true);
    } else {
      const timeout = setTimeout(() => setRenderMenu(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Lock background scroll when menu is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu on any hash change
  useEffect(() => {
    const onHash = () => setIsOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Scroll to section with proper offset
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navH = navRef.current?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Handle service section navigation
  const handleServiceClick = (id: string) => {
    // Update URL hash
    window.location.hash = id;

    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => scrollToId(id), 260);
    } else {
      scrollToId(id);
    }
  };

  // Handle CTA clicks - close menu and navigate
  const handleCTAClick = (href: string) => {
    setIsOpen(false);
    // Small delay to let the menu close animation start
    setTimeout(() => {
      window.location.hash = href.replace('#', '');
    }, 100);
  };

  // Desktop link style
  const linkStyle =
    "cursor-pointer flex items-center gap-1 p-2 font-bold transform transition-all ease-out " +
    "duration-300 hover:scale-110 hover:text-[#ff8000ff] " +
    "text-sm sm:text-base md:text-lg";

  // CTA style (desktop + mobile)
  const ctaStyle =
    "group cursor-pointer rounded-full border border-[#e97500ff] bg-[#e97500ff] text-black font-bold shadow-sm " +
    "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 " +
    "transform transition-all duration-300 ease-out hover:scale-105 hover:bg-black hover:text-[#e97500ff] hover:border-black " +
    "inline-flex items-center gap-2";

  const mobileMenuBg = menuBgClass ?? bgClass;

  return (
    <nav ref={navRef} className={`${bgClass} ${textClass} p-2 sm:p-3 fixed w-full top-0 z-50`}>
      <div className="container mx-auto flex items-center justify-between relative">
        {/* LEFT SECTION → LOGO + DIENSTEN */}
        <div className="flex items-center space-x-12 mx-auto">
          {/* LOGO */}
          <Link href="/" className="cursor-pointer">
            <Logo
              width={140}
              className="hover:scale-105 transition-transform duration-300 sm:w-[170px] md:w-[190px]"
              letters={textClass.includes("text-white") ? "#ffffffff" : "#000000ff"}
              symbol="#ff8000ff"
            />
          </Link>

          {/* DESKTOP LINKS (only at ≥2xl) */}
          <div className="hidden 2xl:flex space-x-5 xl:space-x-6 items-center">
            <a onClick={() => handleServiceClick("elektriciteitswerken")} className={`group ${linkStyle}`}>
              Elektriciteitswerken
              <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a onClick={() => handleServiceClick("airco")} className={`group ${linkStyle}`}>
              Airco
              <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a onClick={() => handleServiceClick("ventilatie")} className={`group ${linkStyle}`}>
              Ventilatie
              <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a onClick={() => handleServiceClick("laadpalen")} className={`group ${linkStyle}`}>
              Laadpalen
              <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* CTA KNOPPEN */}
            <a onClick={(e) => { e.preventDefault(); handleCTAClick("contact"); }} className={ctaStyle}>
              <EnvelopeIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black transition-all duration-300 transform group-hover:text-[#e97500ff] group-hover:-rotate-6 group-hover:scale-110" />
              Contact
            </a>
            <a onClick={(e) => { e.preventDefault(); handleCTAClick("offerte"); }} className={ctaStyle}>
              <BoltIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black transition-all duration-300 transform group-hover:text-[#e97500ff] group-hover:rotate-6 group-hover:scale-110" />
              Offerte aanvragen
            </a>
          </div>
        </div>

        {/* RIGHT SECTION → SOCIALS (only at ≥2xl) */}
        <div className="hidden 2xl:flex absolute right-4 top-1/2 -translate-y-1/2">
          <Socials />
        </div>

        {/* HAMBURGER / CLOSE (below 2xl) */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`2xl:hidden absolute right-4 top-1/2 -translate-y-1/2 ${textClass} p-1 rounded-full z-50`}
          aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          aria-controls="mobile-nav"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <XMarkIcon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          ) : (
            <Bars3Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
          )}
        </button>

        {/* MOBILE MENU - fullscreen below the navbar (below 2xl) */}
        {renderMenu && (
          <div
            id="mobile-nav"
            className={`select-none 2xl:hidden fixed inset-x-0 bottom-0 z-40 ${mobileMenuBg} ${textClass}
                        flex flex-col items-center p-8 space-y-8 overflow-auto
                        mobile-menu-anim ${isOpen ? "animate-in" : "animate-out"}`}
            style={{ top: navbarHeight || 72 }}
          >
            {/* CTA top (Offerte) */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => handleCTAClick("#offerte")}
                className={ctaStyle + " justify-center"}
              >
                <BoltIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black transition-all duration-300 transform group-hover:text-[#e97500ff] group-hover:rotate-6 group-hover:scale-110" />
                Offerte aanvragen
              </button>
            </div>

            {/* Diensten */}
            <div className="flex flex-col items-center space-y-4">
              {[
                { id: "elektriciteitswerken", label: "Elektriciteitswerken" },
                { id: "airco", label: "Airco" },
                { id: "ventilatie", label: "Ventilatie" },
                { id: "laadpalen", label: "Laadpalen" },
              ].map((item) => (
                <a
                  key={item.id}
                  onClick={() => handleServiceClick(item.id)}
                  className="group cursor-pointer inline-flex items-center gap-1 font-bold text-lg
                             transition-colors duration-200 hover:text-[#ff8000ff]"
                >
                  {item.label}
                  <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            {/* CTA bottom (Contact) */}
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => handleCTAClick("#contact")}
                className={ctaStyle + " justify-center"}
              >
                <EnvelopeIcon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black transition-all duration-300 transform group-hover:text-[#e97500ff] group-hover:-rotate-6 group-hover:scale-110" />
                Contact
              </button>
            </div>

            {/* Socials */}
            <div className="pt-2">
              <Socials />
            </div>
          </div>
        )}
      </div>

      {/* Animations (entry/exit) + reduced-motion support */}
      <style jsx global>{`
        @keyframes slideFadeDownIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideFadeDownOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-10px); }
        }
        .mobile-menu-anim.animate-in {
          animation: slideFadeDownIn 240ms ease-out forwards;
          will-change: transform, opacity;
        }
        .mobile-menu-anim.animate-out {
          animation: slideFadeDownOut 200ms ease-in forwards;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-anim { animation: none !important; }
        }
      `}</style>
    </nav>
  );
}