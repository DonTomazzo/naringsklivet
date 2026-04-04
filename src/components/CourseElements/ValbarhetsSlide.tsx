// src/components/CourseElements/ValbarhetsSlide.tsx
// Dra cirklar till källarlokalen → modal med fakta
// Färger: orange (#FF5421) = valbar, mörkblå (#1e3a5f) = inte valbar
// Hover-tooltip visar kort info innan drag/tap

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';


interface Person {
  id: string;
  namn: string;
  roll: string;
  kortInfo: string;   // visas vid hover
  avatar: string;
  valbar: boolean;
  rubrik: string;
  forklaring: string;
}

const ORANGE   = '#FF5421';
const DARKBLUE = '#1e3a5f';
const ORANGE_L = 'rgba(255,84,33,0.12)';
const BLUE_L   = 'rgba(30,58,95,0.35)';

const PERSONER: Person[] = [
  {
    id: 'anna',
    namn: 'Anna',
    roll: 'Registrerad ägare, lgh 4A',
    kortInfo: 'Myndig bostadsrättsinnehavare sedan 3 år.',
    avatar: '👩',
    valbar: true,
    rubrik: 'Valbar',
    forklaring: 'Registrerad bostadsrättsinnehavare och myndig. Uppfyller alla krav enligt BRL.',
  },
  {
    id: 'bjorn',
    namn: 'Björn',
    roll: 'Hyr i andrahand, lgh 2B',
    kortInfo: 'Hyresgäst i andrahand – inte medlem i föreningen.',
    avatar: '👨',
    valbar: false,
    rubrik: 'Inte valbar',
    forklaring: 'Andrahandshyresgäster är inte medlemmar i föreningen och saknar valbarhet – oavsett hur länge de bott där.',
  },
  {
    id: 'emma',
    namn: 'Emma',
    roll: 'Registrerad ägare, 19 år',
    kortInfo: 'Myndig sedan förra året, nyinflyttad ägare.',
    avatar: '👧',
    valbar: true,
    rubrik: 'Valbar',
    forklaring: 'Myndig och registrerad ägare. Det finns ingen övre åldersgräns – 19 år uppfyller myndighetskravet.',
  },
  {
    id: 'peter',
    namn: 'Peter',
    roll: 'Ägare, personlig konkurs',
    kortInfo: 'Försatt i konkurs för 2 månader sedan.',
    avatar: '🧑',
    valbar: false,
    rubrik: 'Inte valbar',
    forklaring: 'Den som är försatt i personlig konkurs kan inte sitta i styrelsen under konkurstiden, oavsett om de äger en bostadsrätt.',
  },
  {
    id: 'bolag',
    namn: 'Fastighets AB',
    roll: 'Äger lgh 5B, utser VD',
    kortInfo: 'Juridisk person – kan utse en fysisk representant.',
    avatar: '🏢',
    valbar: true,
    rubrik: 'Valbar via representant',
    forklaring: 'En juridisk person kan utse en myndig fysisk representant. Representanten väljs formellt in och uppfyller övriga krav.',
  },
  {
    id: 'maria',
    namn: 'Maria',
    roll: 'Ägare, förvaltarskap',
    kortInfo: 'Har förvaltare med begränsad rättshandlingsförmåga.',
    avatar: '👵',
    valbar: false,
    rubrik: 'Inte valbar',
    forklaring: 'Den som har förvaltare förordnad enligt föräldrabalken med begränsad rättshandlingsförmåga kan inte sitta i styrelsen.',
  },
  {
    id: 'lars',
    namn: 'Lars',
    roll: 'Registrerad ägare, 72 år',
    kortInfo: 'Pensionär med lång erfarenhet av föreningsliv.',
    avatar: '👴',
    valbar: true,
    rubrik: 'Valbar',
    forklaring: 'Ingen övre åldersgräns finns i lagen. Lars är myndig och registrerad ägare – fullt valbar.',
  },
  {
    id: 'sofia',
    namn: 'Sofia',
    roll: 'Adjungerad, utan rösträtt',
    kortInfo: 'Deltar på möten men är inte formellt vald.',
    avatar: '🎓',
    valbar: false,
    rubrik: 'Inte formellt vald',
    forklaring: 'En adjungerad ledamot deltar på möten utan rösträtt och utan juridiskt ansvar. Adjungering är bra för inskolning men ersätter inte ett ordinarie uppdrag.',
  },
  {
    id: 'makar',
    namn: 'Karin & Erik',
    roll: 'Gift par, äger varsitt lgh',
    kortInfo: 'Båda är registrerade ägare i föreningen.',
    avatar: '💑',
    valbar: true,
    rubrik: 'Båda valbara – men…',
    forklaring: 'Gifta/sambos kan sitta i styrelsen samtidigt om de äger var sin bostadsrätt och är separata medlemmar. Observera dock jäv: vid beslut som rör den andres lägenhet bör båda kolla om jäv föreligger. Rekommendation: dokumentera jävssituationer noga.',
  },
  {
    id: 'revisor',
    namn: 'Thomas',
    roll: 'F.d. styrelseledamot, vill bli revisor',
    kortInfo: 'Lämnade styrelsen för 4 månader sedan.',
    avatar: '🔍',
    valbar: false,
    rubrik: 'Inte valbar som revisor',
    forklaring: 'Enligt BRL får den som suttit i styrelsen under det räkenskapsår som ska granskas inte väljas till revisor. Thomas måste vänta tills minst ett helt räkenskapsår passerat sedan han lämnade styrelsen. Revisorns uppgift är att granska styrelsen – det kräver full oberoende ställning.',
  },
];

// ── Tooltip vid hover ─────────────────────────────────
const Tooltip = ({ text, visible }: { text: string; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 4, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
        style={{ width: 160 }}
      >
        <div
          className="rounded-lg px-2.5 py-1.5 text-center shadow-xl"
          style={{ background: '#1a2235', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-white text-xs leading-tight">{text}</p>
        </div>
        {/* Pil */}
        <div
          className="w-2 h-2 rotate-45 mx-auto -mt-1"
          style={{ background: '#1a2235' }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Modal ──────────────────────────────────────────────
const InfoModal = ({ person, onClose }: { person: Person; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.7)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      onClick={e => e.stopPropagation()}
      className="w-full max-w-xs rounded-2xl overflow-hidden"
      style={{ background: '#111827' }}
    >
      <div
        className="h-1 w-full"
        style={{ background: person.valbar ? ORANGE : DARKBLUE }}
      />

      <div className="px-5 py-5">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-400 transition-colors">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="text-center mb-4">
          <span className="text-4xl block mb-2">{person.avatar}</span>
          <p className="text-white font-semibold text-sm">{person.namn}</p>
          <p className="text-gray-500 text-xs mt-0.5">{person.roll}</p>
        </div>

        <div
          className="rounded-lg px-3 py-2 text-center text-sm font-semibold mb-4"
          style={{
            background: person.valbar ? ORANGE_L : BLUE_L,
            color:      person.valbar ? ORANGE   : '#93c5fd',
          }}
        >
          {person.valbar ? '✅' : '❌'} {person.rubrik}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          {person.forklaring}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-80 transition-opacity"
          style={{ background: ORANGE }}
        >
          Förstår →
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ── Personkort med tooltip ─────────────────────────────
const PersonCircle = ({
  person, isPlaced, isDragging,
  onTap, onDragStart, onDragEnd,
}: {
  person: Person;
  isPlaced: boolean;
  isDragging: boolean;
  onTap: () => void;
  onDragStart: () => void;
  onDragEnd: (e: any) => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <Tooltip text={person.kortInfo} visible={hovered && !isPlaced && !isDragging} />

      <motion.div
        drag={!isPlaced}
        dragSnapToOrigin
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={() => !isPlaced && onTap()}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={!isPlaced ? { scale: 1.1 } : {}}
        whileDrag={{ scale: 1.2, zIndex: 50, cursor: 'grabbing' }}
        whileTap={!isPlaced ? { scale: 0.93 } : {}}
        animate={isPlaced ? { opacity: 0.2, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col items-center gap-1.5"
        style={{ touchAction: 'none', userSelect: 'none', cursor: isPlaced ? 'default' : 'grab' }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all"
          style={{
            background:  isPlaced ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.07)',
            borderColor: isPlaced ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.18)',
            boxShadow:   isDragging ? '0 12px 32px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {person.avatar}
        </div>
        <p
          className="text-xs font-medium text-center leading-tight max-w-[60px]"
          style={{ color: isPlaced ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.55)' }}
        >
          {person.namn}
        </p>
      </motion.div>
    </div>
  );
};

// ── Huvud-komponent ────────────────────────────────────
const ValbarhetsSlide: React.FC = () => {
  const [placed, setPlaced]     = useState<Set<string>>(new Set());
  const [modal, setModal]       = useState<Person | null>(null);
  const [ratt, setRatt]         = useState(0);
  const [dragging, setDragging] = useState<string | null>(null);
  const dropRef                 = useRef<HTMLDivElement>(null);
  const klar = placed.size === PERSONER.length && !modal;

  const place = (person: Person) => {
    if (placed.has(person.id)) return;
    setPlaced(prev => new Set([...prev, person.id]));
    if (person.valbar) setRatt(r => r + 1);
    setModal(person);
  };

  const handleDragEnd = (person: Person, e: any) => {
    setDragging(null);
    if (placed.has(person.id)) return;
    const drop = dropRef.current;
    if (!drop) return;
    const rect   = drop.getBoundingClientRect();
    const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const clientY = e.clientY ?? e.changedTouches?.[0]?.clientY;
    if (!clientX || !clientY) return;
    if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
      place(person);
    }
  };

  const reset = () => {
    setPlaced(new Set());
    setModal(null);
    setRatt(0);
  };

  const placedPersons = PERSONER.filter(p => placed.has(p.id));

  return (
    <div className="min-h-full w-full overflow-y-auto pb-28" style={{ background: '#0f1623' }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">

        {/* Rubrik */}
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,84,33,0.6)' }}>
          Om styrelsen · 2
        </p>
        <h2 className="text-2xl font-bold text-white mb-5">
          Vem får sitta i styrelsen?
        </h2>

       

        <p className="text-gray-500 text-sm mt-5 mb-8 leading-relaxed">
          Hovra över en cirkel för att läsa mer. Dra eller tryck sedan för att placera
          personen i styrelserummet – du får direkt information om valbarheten.
        </p>

        {/* Cirklar */}
        <div className="flex flex-wrap gap-5 justify-center mb-10">
          {PERSONER.map(person => (
            <PersonCircle
              key={person.id}
              person={person}
              isPlaced={placed.has(person.id)}
              isDragging={dragging === person.id}
              onTap={() => place(person)}
              onDragStart={() => setDragging(person.id)}
              onDragEnd={(e) => handleDragEnd(person, e)}
            />
          ))}
        </div>

        {/* Drop-zon med källarbild */}
        <motion.div
          ref={dropRef}
          animate={{
            boxShadow: dragging
              ? `0 0 0 3px ${ORANGE}, 0 0 32px rgba(255,84,33,0.2)`
              : '0 0 0 1px rgba(255,255,255,0.08)',
          }}
          transition={{ duration: 0.15 }}
          className="rounded-2xl overflow-hidden mb-6 relative"
          style={{ minHeight: 200 }}
        >
          {/* Källarbild */}
          <img
            src="/images/kallarlokal.png"
            alt="Styrelserummet"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay – mörkare vid drag */}
          <motion.div
            className="absolute inset-0"
            animate={{ background: dragging ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.45)' }}
            transition={{ duration: 0.15 }}
          />

          {/* Innehåll */}
          <div className="relative z-10 p-5">
            <p
              className="text-center text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              🏛️ Styrelserummet — Källarlokalen
            </p>

            {placedPersons.length === 0 ? (
              <div className="flex flex-col items-center py-8">
                <p className="text-white/30 text-sm">
                  {dragging ? 'Släpp här →' : 'Dra hit eller tryck på en cirkel'}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                <AnimatePresence>
                  {placedPersons.map(p => (
                    <motion.div
                      key={p.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 16 }}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      onClick={() => setModal(p)}
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 shadow-lg"
                        style={{
                          borderColor: p.valbar ? ORANGE   : DARKBLUE,
                          background:  p.valbar ? ORANGE_L : BLUE_L,
                        }}
                      >
                        {p.avatar}
                      </div>
                      <p
                        className="text-xs font-bold"
                        style={{ color: p.valbar ? ORANGE : '#93c5fd' }}
                      >
                        {p.valbar ? '✓' : '✗'}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress */}
        {placed.size > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-0.5 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: ORANGE }}
                  animate={{ width: `${(placed.size / PERSONER.length) * 100}%` }}
                />
              </div>
              <span className="text-gray-600 text-xs tabular-nums">
                {placed.size} / {PERSONER.length}
              </span>
            </div>

            {klar && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <p className="text-4xl mb-3">{ratt === PERSONER.length ? '🏆' : '🎯'}</p>
                <p className="text-white text-sm font-semibold mb-1">
                  {ratt} / {PERSONER.length} rätt bedömda
                </p>
                <p className="text-gray-600 text-xs mb-5">
                  {ratt === PERSONER.length
                    ? 'Du kan alla valbarhetsregler!'
                    : 'Tryck på cirklarna i rummet för att läsa förklaringarna igen.'}
                </p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
                  style={{ color: ORANGE }}
                >
                  <RotateCcw size={11} /> Börja om
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <InfoModal person={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default ValbarhetsSlide;