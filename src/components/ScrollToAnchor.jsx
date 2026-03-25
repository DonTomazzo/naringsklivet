// src/components/ScrollToAnchor.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollToAnchor = ({ anchorId, children, className }) => {
  const navigate = useNavigate();
  const targetPath = '/'; // Vi navigerar alltid till startsidan

  const handleClick = (e) => {
    e.preventDefault(); // Stoppa den vanliga länk-hanteringen (som inte fungerar över sidor)
    
    // 1. Navigera till startsidan. Skicka med ankaret i state.
    // 'replace: true' säkerställer att startsidan ersätter den tidigare sidan i historiken.
    navigate(targetPath, { replace: true });
    
    // 2. Använd sedan ett litet fördröjning för att ge React tid att rendera startsidan,
    // innan vi skrollar till rätt ID. 
    // OBS: En liten fördröjning behövs nästan alltid för att säkerställa att DOM är uppdaterat.
    setTimeout(() => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // 100ms är oftast tillräckligt snabbt

  };

  return (
    // Vi använder en vanlig <a>-tagg för att behålla utseendet av en länk/knapp
    <a 
      href={targetPath + anchorId} // Behåll href för tillgänglighet (fallback)
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default ScrollToAnchor;