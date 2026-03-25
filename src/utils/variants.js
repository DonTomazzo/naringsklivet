// src/utils/variants.js
// *****************************************************************
// Lägg till DESSA två (imageVariants & titleVariants) i din variants.js
// *****************************************************************

export const sectionVariants = {
  // Fyll på med dina befintliga värden här
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8 
    } 
  },
};

export const imageVariants = {
  // Variant för Hero-bilden (rad 30 i App.jsx)
  hidden: { opacity: 0, scale: 0.5, rotate: -180 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 10,
      delay: 0.5 // Lägg till en liten delay efter sectionVariants
    } 
  }
};

export const titleVariants = {
  // Variant för sektionsrubriker (H2)
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5 
    } 
  },
};