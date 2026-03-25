// src/components/NavLinks.jsx (UPPDATERAD)
import React from 'react';
import { Link } from 'react-router-dom'; 
import ScrollToAnchor from './ScrollToAnchor'; // <--- Importera den nya komponenten

const NavLinks = ({ isMobile, closeMenu }) => {
  const links = [
    // Ändra type till 'anchor-smart' för de som ska skrolla
    { name: 'Hem', href: 'hero', type: 'anchor-smart' }, 
    { name: 'Om', href: 'about', type: 'anchor-smart' }, 
    { name: 'Färdigheter', href: 'skills', type: 'anchor-smart' }, 
    { name: 'Erfarenhet', href: 'experience', type: 'anchor-smart' }, 
    { name: 'Utbildning', href: 'education', type: 'anchor-smart' }, 
    { name: 'Portfölj', href: 'portfolio', type: 'anchor-smart' }, 
    { name: 'Kontakt', href: 'contact', type: 'anchor-smart' }, 
    
    // Dessa är React Router-vägar (Pathnames) och använder Link
    { name: 'Quiz', href: '/quiz', type: 'route' }, 
    { name: 'Leaderboard', href: '/leaderboard', type: 'route' },
  ];

  // Desktop-klassen: hidden som standard, visas som flex från md: (768px)
  const listClasses = isMobile 
    ? "flex flex-col space-y-6 text-2xl font-bold" // Mobil: Vertikal och stor
    : "flex space-x-6 text-lg font-medium";      // Desktop: Horisontell

  return (
    <ul className={listClasses}>
      {links.map((link) => (
        <li key={link.name}>
          {/* Hanterar både ankarlänkar (#section) och React Router-länkar (/quiz) */}
          {link.type === 'anchor' ? (
            <a 
              href={link.href} 
              className="hover:text-pink-400 transition duration-300"
              onClick={isMobile ? closeMenu : undefined} // Stäng menyn om det är mobilvy
            >
              {link.name}
            </a>
          ) : (
             <Link 
              to={link.href} 
              className="hover:text-pink-400 transition duration-300"
              onClick={isMobile ? closeMenu : undefined} // Stäng menyn om det är mobilvy
            >
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;