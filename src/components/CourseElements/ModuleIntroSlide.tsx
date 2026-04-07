// src/components/CourseElements/ModuleIntroSlide.tsx
// Ljus intro-slide för modulstart – med staggered entrance-animationer

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, Play } from 'lucide-react';

const O = '#FF5421';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface ModuleIntroSlideProps {
  kategori: string;
  titel: string;
  ingress: string;
  bild: string;
  instruktör?: string;
  instruktörBild?: string;
  längd?: string;
  avsnitt?: number;
  vadLärDuDig: string[];
  onStart?: () => void;
  audio?: React.ReactNode;
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
  audio,
}) => {
  return (
    <div
      className="h-full overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      style={{ background: '#FAFAF8', paddingTop: 'var(--header-height, 60px)' }}
    >
      {/* ── Vänster: text ─────────────────────────────── */}
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col min-h-full px-6 sm:px-10 lg:px-14 py-8 pb-28">

          {/* Breadcrumb */}
          <motion.p {...fadeUp(0.1)}
            className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
            Styrelsekörkortet® · {kategori}
          </motion.p>

          {/* Titel */}
          <motion.h1 {...fadeUp(0.2)}
            className="text-4xl sm:text-5xl font-black leading-tight mb-4"
            style={{ color: '#1A1A1A', fontFamily: "'Nunito', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: titel }}
          />

          {/* Ingress */}
          <motion.p {...fadeUp(0.3)}
            className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6 max-w-md">
            {ingress}
          </motion.p>

          {/* Audio */}
          {audio && (
            <motion.div {...fadeUp(0.35)} className="mb-6 w-full max-w-md">
              {audio}
            </motion.div>
          )}

          {/* Meta-rad */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-4 mb-6">
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
          </motion.div>

          {/* Instruktör */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-3 mb-8">
            <img
              src={instruktörBild}
              alt={instruktör}
              className="w-9 h-9 rounded-full object-cover object-top border-2"
              style={{ borderColor: O }}
            />
            <p className="text-sm text-gray-600 font-medium">{instruktör}</p>
          </motion.div>

          {/* Vad lär du dig */}
          <motion.div {...fadeUp(0.6)}
            className="border rounded-2xl p-5 mb-6"
            style={{ borderColor: '#E5E7EB', background: 'white' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
              Vad lär du dig?
            </p>
            <div className="space-y-2.5 text-left">
              {vadLärDuDig.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.7 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: O }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">{p}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          {onStart && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7 + vadLärDuDig.length * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white mt-2"
                style={{
                  background: `linear-gradient(135deg, ${O}, #E04619)`,
                  boxShadow: `0 8px 24px ${O}35`,
                }}
              >
                <Play size={16} className="fill-white" />
                Starta modulen
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Höger: bild ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block relative h-full"
      >
        <img
          src={bild}
          alt={titel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ borderRadius: '1.5rem 0 0 1.5rem' }}
        />
        <div className="absolute inset-0 rounded-3xl"
          style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15) 100%)' }} />
      </motion.div>
    </div>
  );
};

export default ModuleIntroSlide;
