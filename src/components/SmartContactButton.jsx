// src/components/SmartContactButton.jsx (UPPDATERAD LOGIK)
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react'; 

const SmartContactButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // Kollar om sökvägen är exakt startsidan '/'
    const isOnHomePage = location.pathname === '/'; 

    if (isOnHomePage) {
      // FALLET 1: ÄR PÅ STARTSIDAN (scrolla till #contact)
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // FALLET 2: INTE PÅ STARTSIDAN (byt sida till frågeformuläret /quiz)
      // Navigerar direkt till Quiz-sidan oavsett vilken sida användaren befinner sig på
      navigate('/quiz'); 
    }
  };

  return (
    <button
      // Vi behåller "contact" som sektions-ID här, men funktionen hanterar logiken
      onClick={() => scrollToSection('contact')} 
      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
    >
      <Mail size={18} /> 
      <span className="text-sm">Kontakta mig</span>
    </button>
  );
};

export default SmartContactButton;