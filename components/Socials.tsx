import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = {
  instagram: "https://www.instagram.com/kemtech.be",
  github: "https://github.com/kemtech",     // ← voeg deze toe
  linkedin: "https://www.linkedin.com/company/kemtech-be", // ← voeg deze toe
};

export const Socials = () => {
  const baseDiv =
    "transition-transform duration-300 hover:scale-110 hover:text-[#ff8000ff]"; // subtiele zoom-in

  const iconBase =
    "text-2xl transition-colors duration-300"; // oranje hoverkleur

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Instagram */}
      <div className={baseDiv}>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="block p-1"
        >
          <FaInstagram className={iconBase} />
        </a>
      </div>
    </div>
  );
};
