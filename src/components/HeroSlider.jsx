import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const HeroSlider = ({ slides, onCtaClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[600px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[activeSlide].image}
              alt="Hero"
              className="w-full h-full object-cover opacity-30"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Educavo-style gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/95 via-[#1a2642]/70 to-[#2a3f5f]/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {slides[activeSlide].title}
              </motion.h1>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtitle-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 }}
                className="text-xl mb-8 text-slate-200"
              >
                {slides[activeSlide].subtitle}
              </motion.p>
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 84, 33, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCtaClick && onCtaClick('primary')}
                className="bg-[#FF5421] hover:bg-[#E04A1D] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2 border-2 border-[#FF5421]"
              >
                <Play size={20} />
                {slides[activeSlide].cta}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCtaClick && onCtaClick('secondary')}
                className="border-2 border-white/40 hover:border-white text-white bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Läs mer
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSlide === index ? 'bg-[#FF5421]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;