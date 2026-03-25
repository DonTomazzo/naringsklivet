// src/components/CourseElements/GdprRolesSection.tsx
// Tre klickbara hotspots på bild – PUA, PUB och Biträdesavtal.
// Samma struktur som AiDailyLifeSection.
// Lägg bilden i: public/images/gdpr-roller.jpg

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Key, ChevronRight } from 'lucide-react';

// ============================================
// 1. DATA
// ============================================

const IMAGE_URL = '/images/gdpr2.png';

const HOTSPOT_DATA = [
  {
    x: 8, y: 58,
    title: 'Personuppgiftsansvarig',
    icon: Shield,
    color: 'bg-[#3B82F6]',
    hexColor: '#3B82F6',
    badge: 'Er förening',
    description: 'Er BRF bestämmer varför och hur personuppgifter behandlas. Styrelsen fattar beslut och bär det yttersta ansvaret för att GDPR följs i föreningen.',
    examples: [
      'Besluta vilka uppgifter ni samlar in',
      'Utforma rutiner och policyer',
      'Hantera begäran om registerutdrag',
    ],
  },
  {
    x: 43, y: 55,
    title: 'Personuppgiftsbiträde\n& underbiträerede',
    icon: FileText,
    color: 'bg-[#F59E0B]',
    hexColor: '#F59E0B',
    badge: 'Extern part',
    description: 'Extern part som behandlar uppgifter på ert uppdrag – t.ex. förvaltare, bokföringsbyrå eller IT-leverantör. De får bara använda uppgifterna för de ändamål ni bestämmer.',
    examples: [
      'Fastighetsbyrå med tillgång till medlemsregister',
      'Bokföringssystem i molnet',
      'Låssystem med passage-loggar',
    ],
  },
  {
    x: 78, y: 50,
    title: 'Biträdesavtal',
    icon: Key,
    color: 'bg-[#EF4444]',
    hexColor: '#EF4444',
    badge: 'Obligatoriskt',
    description: 'Med varje personuppgiftsbiträde måste ni ha ett skriftligt biträdesavtal som reglerar vad biträdet får och inte får göra. Kravet finns i GDPR artikel 28.',
    examples: [
      'Krav i GDPR artikel 28',
      'Ska täcka: ändamål, typ av uppgifter, säkerhetsåtgärder',
      'Biträdet får INTE använda uppgifterna för egna syften',
    ],
  },
];

// ============================================
// 2. MODAL
// ============================================

const Modal = ({ isOpen, onClose, hotspot }) => {
  if (!hotspot) return null;
  const Icon = hotspot.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-end px-5 pt-5">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="px-6 pb-4 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: hotspot.hexColor }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
                  style={{ background: `${hotspot.hexColor}18`, color: hotspot.hexColor }}
                >
                  {hotspot.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{hotspot.title}</h3>
              </div>
              <div className="h-px bg-slate-100 mx-6" />
              <div className="px-6 py-5 overflow-y-auto space-y-4">
                <p className="text-slate-600 leading-relaxed text-sm">{hotspot.description}</p>
                <div
                  className="rounded-2xl p-4 border-l-4"
                  style={{ borderColor: hotspot.hexColor, background: `${hotspot.hexColor}10` }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: hotspot.hexColor }}>
                    Exempel
                  </p>
                  <ul className="space-y-1.5">
                    {hotspot.examples.map((ex, i) => (
                      <li key={i} className="text-slate-700 text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: hotspot.hexColor }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ background: hotspot.hexColor }}
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
};

// ============================================
// 3. DESKTOP – Hotspot-bild
// ============================================

const Hotspot = ({ x, y, title, onClick }) => (
  <motion.div
    className="absolute cursor-pointer"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', pointerEvents: 'auto' }}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      animate={{ opacity: [1, 0.45, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        fontFamily: "'Caveat', 'Segoe Script', cursive",
        fontSize: '1.5rem',
        color: '#FF5421',
        fontWeight: 700,
        textShadow: '0 0 24px rgba(255,84,33,0.5), 0 1px 3px rgba(0,0,0,0.4)',
        whiteSpace: 'pre',
        display: 'block',
      }}
    >
      {title}
    </motion.span>
  </motion.div>
);

const DesktopView = ({ onHotspotClick }) => (
  <div className="relative w-full min-h-screen overflow-hidden" style={{ pointerEvents: 'none' }}>
    <img
      src={IMAGE_URL}
      alt="GDPR-roller"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

    {/* Rubrik */}
    <div className="absolute top-8 left-0 right-0 z-20 text-center px-6">
      <motion.h3
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-2xl"
      >
        Roller och ansvar
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-lg text-white/80 drop-shadow max-w-2xl mx-auto"
      >
        Klicka på texten för att förstå rollerna
      </motion.p>
    </div>

    {/* Hotspots – pointer-events endast på dessa */}
    <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}>
      {HOTSPOT_DATA.map((hotspot, i) => (
        <Hotspot key={i} {...hotspot} onClick={() => onHotspotClick(hotspot)} />
      ))}
    </div>
  </div>
);

// ============================================
// 4. MOBIL – Lista med rollkort
// ============================================

const MobileView = ({ onCardClick }) => (
  <div className="bg-[#171f32] min-h-screen">
    <div className="relative h-52 overflow-hidden">
      <img src={IMAGE_URL} alt="GDPR-roller" className="w-full h-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#171f32]/40 to-[#171f32]" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-2xl font-bold text-white leading-tight">Roller och ansvar</h3>
        <p className="text-white/60 text-sm mt-1">Tryck på en roll för att lära dig mer</p>
      </div>
    </div>
    <div className="px-4 py-4 grid grid-cols-1 gap-3">
      {HOTSPOT_DATA.map((hotspot, i) => {
        const Icon = hotspot.icon;
        return (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => onCardClick(hotspot)}
            className="w-full text-left bg-white/8 border border-white/10 rounded-2xl p-4 flex items-center gap-4 active:scale-98 transition-transform"
          >
            <div className={`w-12 h-12 rounded-full ${hotspot.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-base leading-snug">{hotspot.title}</h4>
              <p className="text-white/50 text-sm mt-0.5">{hotspot.badge}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ============================================
// 5. HUVUDKOMPONENT
// ============================================

const GdprRolesSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="relative w-full">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>
        <div className="hidden md:block">
          <DesktopView onHotspotClick={setActiveModal} />
        </div>
        <div className="block md:hidden">
          <MobileView onCardClick={setActiveModal} />
        </div>
      </motion.div>

      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        hotspot={activeModal}
      />
    </section>
  );
};

export default GdprRolesSection;