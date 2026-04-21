// src/components/CourseElements/ClickableCircles.tsx
//
// Återanvändbar komponent: klickbara cirklar med modal.
// Inspirerad av GdprPrinciplesSection — generaliserad med props.
//
// ANVÄNDNING:
//
//   import ClickableCircles from '../../components/CourseElements/ClickableCircles';
//
//   <ClickableCircles
//     items={[
//       {
//         id: 'punkt-1',
//         label: 'Rubrik på cirkeln',
//         short: 'Kort beskrivning under rubriken i modalen',
//         body: 'Förklarande text i modalen.',
//         extra: { label: 'Tips', text: 'Praktiskt exempel eller lösning.' },
//         badge: { text: 'Hög risk', color: '#DC2626', bg: '#FEE2E2' },  // valfritt
//         emoji: '🔐',  // valfritt — visas i modal-header
//       },
//     ]}
//     dark={false}
//     instructionText="Klicka på varje punkt för att lära dig mer"
//   />

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ─── Typer ────────────────────────────────────────────────
export interface CircleItem {
  id: string;
  label: string;           // Text på cirkeln
  short?: string;          // Undertitel i modalen
  body: string;            // Huvudtext i modalen
  extra?: {                // Extra ruta (exempel, lösning, tips etc.)
    label: string;
    text: string;
  };
  badge?: {                // Valfri badge (risk-nivå, kategori etc.)
    text: string;
    color: string;
    bg: string;
  };
  emoji?: string;          // Ikon i modal-header
}

interface ClickableCirclesProps {
  items: CircleItem[];
  dark?: boolean;
  instructionText?: string;
  circleSize?: 'sm' | 'md' | 'lg';
  doneText?: string;
  onItemClick?: (id: string) => void; // NY
}

// ─── Modal ────────────────────────────────────────────────
const Modal = ({
  item,
  index,
  onClose,
}: {
  item: CircleItem | null;
  index: number;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {item && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Stängknapp */}
            <div className="flex justify-end px-5 pt-5">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            {/* Header */}
            <div className="px-6 pb-5 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: O }}
              >
                {item.emoji ? (
                  <span className="text-2xl">{item.emoji}</span>
                ) : (
                  <span className="text-white font-black text-lg">{index + 1}</span>
                )}
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">
                {item.label}
              </h3>
              {item.short && (
                <p className="text-sm text-gray-500">{item.short}</p>
              )}
            </div>

            <div className="h-px bg-gray-100 mx-6" />

            {/* Innehåll */}
            <div className="px-6 py-5 overflow-y-auto space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>

              {/* Badge */}
              {item.badge && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: item.badge.bg, color: item.badge.color }}
                >
                  {item.badge.text}
                </div>
              )}

              {/* Extra ruta */}
              {item.extra && (
                <div
                  className="rounded-xl p-4 border-l-4"
                  style={{ borderColor: O, background: OL }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: OD }}
                  >
                    {item.extra.label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.extra.text}</p>
                </div>
              )}
            </div>

            {/* Stäng-knapp */}
            <div className="px-6 pb-6 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
              >
                Stäng
              </button>
            </div>

          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Cirkelstorlekar ──────────────────────────────────────
const SIZES = {
  sm: 'w-24 h-24 sm:w-28 sm:h-28',
  md: 'w-28 h-28 sm:w-32 sm:h-32',
  lg: 'w-32 h-32 sm:w-36 sm:h-36',
};

// ─── Huvudkomponent ───────────────────────────────────────
const ClickableCircles: React.FC<ClickableCirclesProps> = ({
  items,
  dark = false,
  instructionText = 'Klicka på varje punkt för att lära dig mer',
  circleSize = 'md',
  doneText,
  onItemClick,
}) => {
  const [active, setActive]   = useState<CircleItem | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewed, setViewed]   = useState<Set<string>>(new Set());

const handleClick = (item: CircleItem, idx: number) => {
  setViewed(prev => new Set([...prev, item.id]));
  if (onItemClick) {
    onItemClick(item.id); // navigera direkt
  } else {
    setActive(item);      // annars öppna modal
    setActiveIdx(idx);
  }
};

  const allDone = viewed.size === items.length;

  const mutedColor  = dark ? 'rgba(255,255,255,0.5)' : '#6B7280';
  const statusColor = dark ? OL : O;
  const subtleColor = dark ? 'rgba(255,255,255,0.4)' : '#9CA3AF';

  return (
    <div className="w-full">

      {/* Instruktionstext */}
      {instructionText && (
        <p className="text-center text-sm mb-6 px-4" style={{ color: mutedColor }}>
          {instructionText}
        </p>
      )}

      {/* Cirklar */}
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto px-4 pb-4">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item, i)}
              className={`${SIZES[circleSize]} rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight`}
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}
            >
              {item.emoji && (
                <span className="block text-xl mb-0.5">{item.emoji}</span>
              )}
              <span className={item.emoji ? 'text-[10px] leading-tight' : ''}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Status */}
      {allDone ? (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: statusColor }}>
          {doneText || `✓ Du har utforskat alla ${items.length} punkter!`}
        </p>
      ) : viewed.size > 0 ? (
        <p className="text-center text-xs pb-4" style={{ color: subtleColor }}>
          {viewed.size}/{items.length} utforskade — klicka på fler
        </p>
      ) : null}

      <Modal item={active} index={activeIdx} onClose={() => setActive(null)} />
    </div>
  );
};

export default ClickableCircles;