// src/components/Header.jsx
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importera stäng-ikonen

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-shrink-0 relative z-[60]">
      <button 
        onClick={toggleMenu} 
        className="text-white focus:outline-none relative h-16 w-16 flex items-center justify-center p-2"
      >
        <div className="flex flex-col space-y-3 transition-transform duration-300 transform">
          <span 
            className={`block h-2 w-12 bg-white transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-3.5' : ''
            }`}
          ></span>
          <span 
            className={`block h-2 w-12 bg-white transition-opacity duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span 
            className={`block h-2 w-12 bg-white transition-transform duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-3.5' : ''
            }`}
          ></span>
        </div>
        <span
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-white text-lg text-blink font-handwritten`}
        >
          Klicka här
        </span>
      </button>

      <nav
        className={`fixed top-0 right-0 h-screen w-80 shadow-lg p-8 transform transition-transform duration-500 ease-in-out z-40 font-sans bg-gray-900 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-white hover:text-teal-400 transition-colors duration-200 focus:outline-none"
        >
          <FaTimes size={36} /> {/* Stäng-ikonen */}
        </button>

        <ul className="space-y-6 pt-16">
          <li><a href="#hero" onClick={toggleMenu} className="hover:text-teal-400 transition-colors text-2xl">Hem</a></li>
          <li><a href="#about" onClick={toggleMenu} className="hover:text-teal-400 transition-colors text-2xl">Om mig</a></li>
          <li><a href="#projects" onClick={toggleMenu} className="hover:text-teal-400 transition-colors text-2xl">Projekt</a></li>
          <li><a href="#contact" onClick={toggleMenu} className="hover:text-teal-400 transition-colors text-2xl">Kontakt</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;