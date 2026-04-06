// src/components/CourseElements/ModuleIntroSlide.tsx
// Ljus intro-slide för modulstart – pedagogisk välkomst-känsla
// Används som första sliden i alla moduler

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, Play } from 'lucide-react';

const O = '#FF5421';

interface ModuleIntroSlideProps {
  kategori: string;           // t.ex. "EKONOMI"
  titel: string;              // Modulens namn
  ingress: string;            // 1-2 meningar
  bild: string;               // Hero-bild höger
  instruktör?: string;        // t.ex. "Tomas Mauritzson"
  instruktörBild?: string;    // Avatar
  längd?: string;             // t.ex. "2.5 timmar"
  avsnitt?: number;           // Antal avsnitt
  vadLärDuDig: string[];      // 4-6 punkter
  onStart?: () => void;       // Knapp → nästa slide
}

const ModuleIntroSlide: React.FC<ModuleIntroSlideProps> = ({
  kategori,
  titel,
  ingress,
  bild,
  instruktör = 'Tomas Mauritzson',
  instruktörBild = '/founder.png',
  längd = '2.5 timmar',
  avsnitt = 10,
  vadLärDuDig,
  onStart,
}) => {
  return (
    <div className="h-full overflow-hidden grid grid-cols-1 lg:grid-cols-2" style={{ background: '#FAFAF8' }}>

      {/* ── Vänster: text ─────────────────────────────── */}
      <div className="overflow-y-auto h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center min-h-full px-6 sm:px-10 lg:px-14 py-10 pb-28"
        >
          {/* Breadcrumb */}
          <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
            Styrelsekörkortet® · {kategori}
          </p>

          {/* Titel */}
          <h1
            className="text-4xl sm:text-5xl font-black leading-tight mb-4"
            style={{ color: '#1A1A1A', fontFamily: "'Nunito', sans-serif" }}
          >
            {titel}
          </h1>

          {/* Ingress */}
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 max-w-md">
            {ingress}
          </p>

          {/* Meta-rad */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock size={15} style={{ color: O }} />
              {längd}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <BookOpen size={15} style={{ color: O }} />
              {avsnitt} avsnitt
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Award size={15} style={{ color: O }} />
              Diplom vid godkänt
            </div>
          </div>

          {/* Instruktör */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={instruktörBild}
              alt={instruktör}
              className="w-9 h-9 rounded-full object-cover object-top border-2"
              style={{ borderColor: O }}
            />
            <p className="text-sm text-gray-600 font-medium">{instruktör}</p>
          </div>

          {/* Vad lär du dig */}
          <div className="border rounded-2xl p-5 mb-6" style={{ borderColor: '#E5E7EB', background: 'white' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
              Vad lär du dig?
            </p>
            <div className="space-y-2.5">
              {vadLärDuDig.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: O }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {onStart && (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white self-start"
              style={{ background: `linear-gradient(135deg, ${O}, #E04619)`, boxShadow: `0 8px 24px ${O}35` }}
            >
              <Play size={16} className="fill-white" />
              Starta modulen
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ── Höger: bild ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block relative h-full"
      >
        <img
          src={bild}
          alt={titel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ borderRadius: '1.5rem 0 0 1.5rem' }}
        />
        {/* Subtle gradient */}
        <div className="absolute inset-0 rounded-3xl"
          style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15) 100%)' }} />
      </motion.div>

    </div>
  );
};

export default ModuleIntroSlide;
