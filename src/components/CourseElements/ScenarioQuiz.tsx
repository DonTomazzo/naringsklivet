// src/components/CourseElements/ScenarioQuiz.tsx
//
// Quiz-komponent med bild + pratbubbla som fråga + svarsalternativ under.
// Ersätter InlineQuiz på quiz-slides för ett mer engagerande scenario-format.
//
// ANVÄNDNING:
//   <ScenarioQuiz
//     bild="/images/fildelning.jpg"
//     bubbla="Jag har bråttom — kan jag bara skicka länken med 'Anyone with the link'?"
//     bubblaSida="left"
//     fråga="Vad bör du göra?"
//     alternativ={[
//       { text: 'Ja, det går snabbt och smidigt', korrekt: false },
//       { text: 'Dela med specifik person istället', korrekt: true },
//       { text: 'Skicka filen som bilaga istället', korrekt: false },
//       { text: 'Det spelar ingen roll internt', korrekt: false },
//     ]}
//     förklaring="Öppna länkar kan spridas okontrollerat. Dela alltid med specifika personer."
//     onComplete={() => handleComplete('quiz-1')}
//   />

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

interface Alternativ {
  text: string;
  korrekt: boolean;
}

interface ScenarioQuizProps {
  bild: string;
  bubbla: string;
  bubblaSida?: 'left' | 'right';
  fråga?: string;
  alternativ: Alternativ[];
  förklaring: string;
  onComplete?: () => void;
  isDone?: boolean;
}

const ScenarioQuiz: React.FC<ScenarioQuizProps> = ({
  bild,
  bubbla,
  bubblaSida = 'left',
  fråga,
  alternativ,
  förklaring,
  onComplete,
  isDone = false,
}) => {
  const [vald, setVald]         = useState<number | null>(null);
  const [visaFeedback, setVisaFeedback] = useState(isDone);

  const handleVälj = (idx: number) => {
    if (visaFeedback) return;
    setVald(idx);
    setVisaFeedback(true);
    if (alternativ[idx].korrekt && onComplete) {
      onComplete();
    }
  };

  const korrektIdx = alternativ.findIndex(a => a.korrekt);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">

      {/* Övre del — bild med pratbubbla */}
      <div className="relative flex-shrink-0" style={{ height: '45%', minHeight: 200, maxHeight: 340 }}>
        <img
          src={bild}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Mörkt overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />

        {/* Pratbubbla */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
          className="absolute z-10"
          style={{
            bottom: '1.5rem',
            ...(bubblaSida === 'left'
              ? { left: '1rem', maxWidth: '65%' }
              : { right: '1rem', maxWidth: '65%' }),
          }}
        >
          {/* Bubbla */}
          <div
            className="rounded-2xl px-4 py-3 text-white text-sm font-semibold leading-snug shadow-xl"
            style={{ background: O }}
          >
            💬 {bubbla}
          </div>
          {/* Pil */}
          <div
            className="w-0 h-0"
            style={{
              marginLeft: bubblaSida === 'left' ? '1.5rem' : 'auto',
              marginRight: bubblaSida === 'right' ? '1.5rem' : 'auto',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `10px solid ${O}`,
            }}
          />
        </motion.div>
      </div>

      {/* Nedre del — fråga + alternativ */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28">

        {/* Fråga */}
        {fråga && (
          <p className="font-black text-gray-900 text-base mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {fråga}
          </p>
        )}

        {/* Alternativ */}
        <div className="space-y-2.5 mb-4">
          {alternativ.map((alt, idx) => {
            let bg      = '#FAFAF8';
            let border  = '#E8E5E0';
            let textCol = '#1A1A1A';
            let icon    = null;

            if (visaFeedback) {
              if (idx === korrektIdx) {
                bg      = '#FFF5F2';
                border  = O;
                textCol = O;
                icon    = <CheckCircle size={16} style={{ color: O }} className="flex-shrink-0" />;
              } else if (idx === vald && !alt.korrekt) {
                bg      = '#FEF2F2';
                border  = '#EF4444';
                textCol = '#EF4444';
                icon    = <XCircle size={16} className="text-red-400 flex-shrink-0" />;
              } else {
                textCol = '#9CA3AF';
                border  = '#F3F4F6';
              }
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleVälj(idx)}
                disabled={visaFeedback}
                whileHover={!visaFeedback ? { scale: 1.01, x: 4 } : {}}
                whileTap={!visaFeedback ? { scale: 0.99 } : {}}
                className="w-full text-left px-4 py-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-150 font-medium text-sm"
                style={{ background: bg, borderColor: border, color: textCol }}
              >
                {icon}
                <span>{alt.text}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {visaFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-4 border-l-4"
              style={{
                borderColor: vald === korrektIdx ? O : '#EF4444',
                background:  vald === korrektIdx ? '#FFF5F2' : '#FEF2F2',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: vald === korrektIdx ? O : '#EF4444' }}
              >
                {vald === korrektIdx ? '✓ Rätt!' : '✗ Inte riktigt'}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{förklaring}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redan avklarad */}
        {isDone && !visaFeedback && (
          <div
            className="rounded-xl p-3 border flex items-center gap-2"
            style={{ background: `${O}10`, borderColor: `${O}25` }}
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
            <p className="text-sm font-semibold text-gray-800">Redan avklarad — gå vidare!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ScenarioQuiz;