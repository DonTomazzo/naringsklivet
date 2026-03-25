// src/components/ScrollOnLoad.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollOnLoad = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Kontrollera om URL:en innehåller ett hash (#anchor)
    const hash = location.hash;

    if (hash) {
      // 2. Använd ett litet hack för att säkerställa att DOM är uppdaterat
      // (Denna setTimeout är mycket kortare och mer tillförlitlig nu)
      setTimeout(() => {
        // Ta bort # från hash-värdet för att få ID:t
        const elementId = hash.substring(1); 
        const element = document.getElementById(elementId);
        
        if (element) {
          // 3. Skrolla till elementet
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0); // 0ms delay, körs efter aktuell rendering
    }
  }, [location]); // Körs varje gång location-objektet ändras

  return null; // Denna komponent renderar inget synligt
};

export default ScrollOnLoad;