// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Tvingar fönstret att scrolla till position (0, 0)
    // varje gång sökvägen (pathname) ändras.
    window.scrollTo(0, 0); 
  }, [pathname]); // Körs varje gång pathname ändras

  // Komponenten renderar ingenting, den sköter bara sidoeffekten (scrollen)
  return null; 
};

export default ScrollToTop;