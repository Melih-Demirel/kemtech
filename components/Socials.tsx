import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = {
  instagram: "https://www.instagram.com/melihdemire1",
  github: "https://github.com/Melih-Demirel",
  linkedin: "https://www.linkedin.com/in/melih-demirel-0009aa208/"
};

const baseDiv = "border-2 border-gray-500 rounded-lg sm:border-black active:bg-gray-700 hover:sm:border-gray-500"

export const Socials = () => {
  return (
    <div className="w-11/12 md:w-3/4 flex items-center mx-auto justify-center space-x-5">
      <div
        className={baseDiv}
      >
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2"
        >
          <FaInstagram className="text-3xl" />
        </a>
      </div>
      <div
        className={baseDiv}
      >
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2"
        >
          <FaGithub className="text-3xl" />
        </a>
      </div>
      <div
        className={baseDiv}
      >
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2"
        >
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
    </div>
  );
};