// src/components/landing/WorkshopCta.jsx
// Placeras direkt under <EventsSection /> i FounderSection
// Samma visuella stil som WhatYouGet bottom-banner

import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkshopCta = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-4 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6"
      style={{ background: '#171f32' }}
    >
      {/* Vänster: text */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center gap-1.5 justify-center sm:justify-start mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-amber-400 fill-current" />
          ))}
          <span className="text-white/50 text-xs ml-1">Skräddarsydd utbildning</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
          Boka workshop eller{' '}
          <span style={{ color: '#FF5421' }}>AI one-on-one</span> här
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">
          Vill du ha en skräddarsydd session för ditt team eller en personlig
          genomgång? Vi anpassar innehållet helt efter era behov.
        </p>
      </div>

      {/* Höger: knapp */}
      <div className="flex-shrink-0 text-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/seminarier#events')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg"
          style={{
            background: 'linear-gradient(to right, #FF5421, #E04619)',
            boxShadow: '0 4px 16px rgba(255,84,33,0.30)',
          }}
        >
          Se alla datum & boka
          <ArrowRight size={15} />
        </motion.button>
        <p className="text-white/30 text-xs mt-2">
          Eller kontakta oss för offert
        </p>
      </div>
    </motion.div>
  );
};

export default WorkshopCta;