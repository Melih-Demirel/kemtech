import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center bg-gray-900 text-white border-t border-gray-700">
      <p className="font-mono text-xs md:text-base text-center px-4 pt-6 pb-6 leading-relaxed">
        © {currentYear} Kemtech
        &nbsp;|&nbsp; BE 1026.389.563
        &nbsp;|&nbsp;
        <a href="/privacy" className="hover:text-orange-400">Privacy</a>
        &nbsp;|&nbsp;
        <a href="/cookies" className="hover:text-orange-400">Cookies</a>
        &nbsp;|&nbsp;
        <a
          href="https://www.linkedin.com/in/melih-demirel-0009aa208/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-orange-400"
        >
          Made by M.D
        </a>
      </p>
    </footer>
  );
};
