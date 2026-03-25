// src/components/Navbar.jsx
import React, { useState } from 'react'; 
import SocialIcons from './SocialIcons';
import NavLinks from './NavLinks'; // <--- Importera NavLinks
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    // md:hidden på knappen och menyn, hidden md:flex på de synliga länkarna löser responsiviteten.
    <div className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      
      {/* 1. Vänster sida: Sociala ikoner och Header/Titel */}
      <div className="flex items-center space-x-6">
        <SocialIcons />
        
      </div>
      
      {/* 2. Desktop-Navigering: Visas ENDAST från medium skärmstorlek (md: - 768px) och uppåt */}
      <nav className="hidden md:flex items-center">
        <NavLinks isMobile={false} />
      </nav>

      {/* 3. Mobil-Knapp: Visas ENDAST upp till medium skärmstorlek (md:hidden) */}
      <button 
        onClick={toggleMenu} 
        className="text-white focus:outline-none md:hidden"
        aria-label="Toggle Navigation Menu"
      >
        {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* 4. Mobilmeny: Döljs automatiskt på desktop (md:hidden) */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-95 z-40 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col justify-center items-center
        `}
      >
        {/* Skickar med isMobile={true} och closeMenu-funktionen till NavLinks */}
        <NavLinks isMobile={true} closeMenu={closeMenu} />
      </div>
      
    </div>
  );
};

export default Navbar;