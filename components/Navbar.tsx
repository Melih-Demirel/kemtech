'use client';
import { useState, useEffect, useCallback } from 'react';
import Logo from '@/components/Logo';

export default function NavBar() {
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateNavbarHeight = useCallback(() => {
    const navbar = document.querySelector('nav') as HTMLElement;
    if (navbar) setNavbarHeight(navbar.offsetHeight);
  }, []);

  useEffect(() => {
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, [updateNavbarHeight]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(v => !v);

  const linkStyle =
    'cursor-pointer p-2 border border-gray-800 rounded-lg hover:border-gray-500';
  const hamburgerStyle =
    'text-white border p-1 border-white rounded-lg hover:border-gray-500';

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <div
          className="cursor-pointer"
          onClick={() => (window.location.href = window.location.href.split('#')[0])}
        >
          <Logo className="hover:scale-105 transition-transform duration-300" width={180} />
          <Logo
            className="hover:scale-110 transition-transform duration-300"
            width={180}
            letters="#d80909ff"
            symbol="#c56200ff"
          />
        </div>

        {/* HAMBURGER MENU */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className={hamburgerStyle} aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex space-x-3 text-white">
          <a onClick={() => handleScroll('electricity')} className={linkStyle}>Elektriciteitswerken</a>
          <a onClick={() => handleScroll('airco')} className={linkStyle}>Airco (lucht-lucht)</a>
          <a onClick={() => handleScroll('ventilation')} className={linkStyle}>Ventilatie</a>
          <a onClick={() => handleScroll('charging-stations')} className={linkStyle}>Laadpalen</a>
          <a onClick={() => handleScroll('contact')} className={linkStyle}>Contact</a>
          <a onClick={() => handleScroll('quote')} className={linkStyle}>Offerte</a>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white flex flex-col items-center space-y-4 mt-4 border-t border-gray-500 p-2">
          <a onClick={() => handleScroll('electricity')} className={linkStyle}>Elektriciteitswerken</a>
          <a onClick={() => handleScroll('airco')} className={linkStyle}>Airco (lucht-lucht)</a>
          <a onClick={() => handleScroll('ventilation')} className={linkStyle}>Ventilatie</a>
          <a onClick={() => handleScroll('charging-stations')} className={linkStyle}>Laadpalen</a>
          <a onClick={() => handleScroll('contact')} className={linkStyle}>Contact</a>
          <a onClick={() => handleScroll('quote')} className={linkStyle}>Offerte</a>
        </div>
      )}
    </nav>
  );
}
