// src/components/SkillBar.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillBar = ({ name, level, color, delay = 0 }) => {
    // 1. Skapa en referens till elementet
    const ref = useRef(null);
    
    // 2. Kontrollera om elementet är synligt (useInView)
    // once: true ser till att animationen bara körs en gång
    const isInView = useInView(ref, { once: true, amount: 0.5 }); // amount: 0.5 = när 50% av elementet är synligt

    return (
        <div ref={ref} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            
            {/* Rubriker och nivå (de behöver inte animeras dynamiskt) */}
            <div className="flex justify-between mb-3">
                <span className="font-semibold text-lg">{name}</span>
                <span className="text-purple-400 font-bold">{level}%</span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                    
                    // Framer Motion Animation
                    initial={{ width: 0 }} // Starta med bredd 0
                    
                    animate={{ 
                        // Använd isInView för att sätta slutvärdet
                        width: isInView ? `${level}%` : 0 
                    }}
                    
                    transition={{ 
                        duration: 1.5, // Långsam och mjuk ifyllning
                        delay: delay, 
                        ease: "easeOut" 
                    }}
                />
            </div>
        </div>
    );
};

export default SkillBar;