'use client';
import { useState, useEffect, useCallback } from 'react';

export default function NavBar() {
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Calculate navbar height dynamically
  const updateNavbarHeight = useCallback(() => {
    const navbar = document.querySelector('nav') as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // Update height on component mount and window resize
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [updateNavbarHeight]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementRect - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setIsOpen(false); // Close mobile menu if applicable
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkStyle = "cursor-pointer p-2 border border-gray-800 rounded-lg hover:border-gray-500";
  const hamburgerStyle = "text-white border p-1 border-white rounded-lg hover:border-gray-500";

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white italic font-bold">
          <a onClick={() => window.location.href = window.location.href.split('#')[0]} className={linkStyle}>
            Kemtech.be
          </a>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className={hamburgerStyle}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex space-x-6 text-white">
          <a onClick={() => handleScroll('electricity')} className={linkStyle}>
            Elektriciteitswerk
          </a>
          <a onClick={() => handleScroll('solar-panels')} className={linkStyle}>
            Zonnepanelen
          </a>
          <a onClick={() => handleScroll('aircos')} className={linkStyle}>
            Airco's
          </a>
          <a onClick={() => handleScroll('charging-stations')} className={linkStyle}>
            Laadpalen
          </a>
          <a onClick={() => handleScroll('contact')} className={linkStyle}>
            Contact
          </a>
          <a onClick={() => handleScroll('quote')} className={linkStyle}>
            Maak een Offerte
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white flex flex-col items-center space-y-4 mt-4 border-t border-gray-500 p-2">
          <a onClick={() => handleScroll('electricity')} className={linkStyle}>
            Elektriciteitswerk
          </a>
          <a onClick={() => handleScroll('solar-panels')} className={linkStyle}>
            Zonnepanelen
          </a>
          <a onClick={() => handleScroll('aircos')} className={linkStyle}>
            Airco's
          </a>
          <a onClick={() => handleScroll('charging-stations')} className={linkStyle}>
            Laadpalen
          </a>
          <a onClick={() => handleScroll('contact')} className={linkStyle}>
            Contact
          </a>
          <a onClick={() => handleScroll('quote')} className={linkStyle}>
            Maak een Offerte
          </a>
        </div>
      )}
    </nav>
  );
}
