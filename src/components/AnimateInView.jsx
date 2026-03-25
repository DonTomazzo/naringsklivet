// src/components/AnimateInView.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Lägg till xOffset som en prop och sätt standardvärdet till 0
const AnimateInView = ({ children, delay = 0, duration = 0.5, yOffset = 50, xOffset = 0 }) => {
  return (
    <motion.div
      // 1. Initialt läge (Utanför vyn)
      // Använder både yOffset OCH xOffset
      initial={{ opacity: 0, y: yOffset, x: xOffset }} 
      
      // 2. Animerat läge (När det skrollas in i vyn)
      whileInView={{ opacity: 1, y: 0, x: 0 }} // x-värdet går till 0
      
      // 3. Ställ in animationens egenskaper
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      
      // 4. Se till att det bara animeras en gång och när elementet är synligt
      viewport={{ once: true, amount: 0.1 }} 
    >
      {children}
    </motion.div>
  );
};

export default AnimateInView;