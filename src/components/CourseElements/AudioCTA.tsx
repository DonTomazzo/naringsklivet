// src/components/CourseElements/AudioCTA.tsx
// Handskriven "Lyssna här!"-indikator med animerad pil som pekar uppåt mot AudioPlayer.
// Ligger under AudioPlayer i normalt flöde – ingen absolut positionering.
// Försvinner när användaren klickat play.
//
// Användning:
//   <AudioPlayer audioSrc="..." onPlay={() => setPlayed(true)} />
//   <AudioCTA visible={!played} />

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioCTAProps {
  visible: boolean;
}

const AudioCTA: React.FC<AudioCTAProps> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
          transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-start gap-0 pointer-events-none select-none"
        >
          {/* Böjd streckad SVG-pil som pekar uppåt */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Böjd streckad linje uppåt */}
              <path
  d="M4 22 C 14 18, 26 18, 36 22"
  stroke="rgba(255,255,255,0.7)"
  strokeWidth="2"
  strokeDasharray="4 3"
  strokeLinecap="round"
  fill="none"
/>
{/* Pilspets höger */}
<path
  d="M30 16 L36 22 L30 28"
  stroke="rgba(255,255,255,0.7)"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  fill="none"
/>
            </svg>
          </motion.div>

          {/* Handskriven text */}
          <motion.span
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: "'Caveat', 'Segoe Script', 'Comic Sans MS', cursive",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            Lyssna här! 🎧
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioCTA;