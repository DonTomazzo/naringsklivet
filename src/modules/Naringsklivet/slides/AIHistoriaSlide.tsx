// src/modules/Naringsklivet/slides/AIHistoriaSlide.tsx
// AI:ns historia – fyra klickbara SVG-pusselbitar
// Pedagogisk, mörkt tema, svartvit bakgrundsbild i modal

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O = '#FF5421';

interface Bit {
  id: string;
  emoji: string;
  år: string;
  rubrik: string;
  kort: string;
  lång: string;
  citat: string;
  bild: string;
  färg: string;
}

const bitar: Bit[] = [
  {
    id: 'turing',
    emoji: '🧠',
    år: '1950',
    rubrik: 'Turing & frågan',
    kort: 'Kan maskiner tänka?',
    lång: 'Alan Turing publicerar 1950 papperet "Computing Machinery and Intelligence" och ställer frågan som startade allt. Han föreslår Turing-testet — om en maskin kan föra en konversation omöjlig att skilja från en människa, har den "klarat" testet. ChatGPT klarar det med marginal idag.',
    citat: '"Can machines think?" — Alan Turing, 1950',
    bild: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
    färg: '#7c3aed',
  },
  {
    id: 'gamers',
    emoji: '🎮',
    år: '1999–2006',
    rubrik: 'Gamers & GPU',
    kort: 'Spelkort blev AI-motorer',
    lång: 'Spelindustrin krävde grafikkort som klarade miljoner parallella beräkningar för 3D-grafik. Det visade sig att exakt samma beräkningar krävs för att träna AI. År 2006 kom Nvidias CUDA-teknik och lät forskare använda spelkort för AI-träning — hundratals gånger snabbare än vanliga processorer.',
    citat: 'Utan gamers, inget ChatGPT.',
    bild: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    färg: '#059669',
  },
  {
    id: 'data',
    emoji: '📊',
    år: '2000-tal',
    rubrik: 'Internet & data',
    kort: 'Världens största träningsset',
    lång: 'AI lär sig av text — och internet skapade mer text än mänskligheten producerat under hela sin historia. Wikipedia, sociala medier, forum, böcker, kod. ChatGPT är tränad på en uppskattad 570 GB text, ungefär 300 miljarder ord. Utan internets explosion hade det inte funnits data att träna på.',
    citat: 'Varje sida du skrivit online har lärt AI:n något.',
    bild: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    färg: '#0284c7',
  },
  {
    id: 'transformer',
    emoji: '⚡',
    år: '2017',
    rubrik: 'Transformer',
    kort: 'Papperet som förändrade allt',
    lång: 'Googles forskare publicerar "Attention is All You Need" och introducerar transformer-arkitekturen. Det är det tekniska genombrott som möjliggjorde GPT, Claude, Gemini och alla moderna LLM:er. Attention-mekanismen är hjärtat i all modern AI — och titeln på papperet visade sig vara exakt rätt.',
    citat: '"Attention is All You Need" — Google Brain, 2017',
    bild: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
    färg: O,
  },
];

// ─── SVG pusselbit-former (2×2, 200×200 viewBox) ─────────
// Varje bit har tappar som passar med grannarna
const PATHS: Record<string, string> = {
  // Övre vänster: tapp ut →  och tapp ut ↓
  tl: 'M0,0 L130,0 C130,0 125,15 125,25 C125,40 135,50 150,50 C165,50 175,40 175,25 C175,15 170,0 170,0 L200,0 L200,130 C200,130 185,125 175,125 C160,125 150,135 150,150 C150,165 160,175 175,175 C185,175 200,170 200,170 L200,200 L0,200 Z',
  // Övre höger: tapp in ← och tapp ut ↓
  tr: 'M0,0 L30,0 C30,0 25,15 25,25 C25,40 35,50 50,50 C65,50 75,40 75,25 C75,15 70,0 70,0 L200,0 L200,200 L130,200 C130,200 125,185 125,175 C125,160 135,150 150,150 C165,150 175,160 175,175 C175,185 170,200 170,200 L0,200 Z',
  // Nedre vänster: tapp in ↑ och tapp ut →
  bl: 'M0,0 L200,0 L200,30 C200,30 185,25 175,25 C160,25 150,35 150,50 C150,65 160,75 175,75 C185,75 200,70 200,70 L200,200 L130,200 C130,200 125,185 125,175 C125,160 135,150 150,150 C165,150 175,160 175,175 C175,185 170,200 170,200 L0,200 Z',
  // Nedre höger: tapp in ↑ och tapp in ←
  br: 'M0,0 L200,0 L200,200 L70,200 C70,200 75,185 75,175 C75,160 65,150 50,150 C35,150 25,160 25,175 C25,185 30,200 30,200 L0,200 L0,70 C0,70 15,75 25,75 C40,75 50,65 50,50 C50,35 40,25 25,25 C15,25 0,30 0,30 Z',
};

const PIECES = [
  { pathKey: 'tl', bit: bitar[0], col: 0, row: 0 },
  { pathKey: 'tr', bit: bitar[1], col: 1, row: 0 },
  { pathKey: 'bl', bit: bitar[2], col: 0, row: 1 },
  { pathKey: 'br', bit: bitar[3], col: 1, row: 1 },
];

// ─── Modal ────────────────────────────────────────────────
const Modal = ({ bit, onClose }: { bit: Bit | null; onClose: () => void }) => (
  <AnimatePresence>
    {bit && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
          className="fixed z-50 rounded-3xl overflow-hidden flex flex-col"
          style={{
            inset: '10% auto',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(560px, 92vw)',
            maxHeight: '78vh',
          }}
        >
          {/* Bakgrund – svartvit bild */}
          <div className="absolute inset-0">
            <img
              src={bit.bild}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) brightness(0.3)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, rgba(15,22,35,0.6) 0%, rgba(15,22,35,0.92) 60%)' }}
            />
            {/* Färgad linje i botten */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: bit.färg }} />
          </div>

          {/* Stäng */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            <X size={16} className="text-white" />
          </button>

          {/* Text */}
          <div className="relative z-10 px-7 py-8 overflow-y-auto flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{bit.emoji}</span>
              <span
                className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${bit.färg}30`, color: bit.färg, border: `1px solid ${bit.färg}50` }}
              >
                {bit.år}
              </span>
            </div>

            <div>
              <h3
                className="text-3xl font-black text-white leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {bit.rubrik}
              </h3>
              <p className="text-white/50 text-sm mt-1">{bit.kort}</p>
            </div>

            <p className="text-white/80 text-base leading-relaxed">{bit.lång}</p>

            <div
              className="rounded-2xl px-5 py-4 border-l-4"
              style={{ borderColor: bit.färg, background: `${bit.färg}12` }}
            >
              <p className="text-white/70 text-sm italic">"{bit.citat}"</p>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Slide ────────────────────────────────────────────────
export const AIHistoriaSlide: React.FC = () => {
  const [active, setActive] = useState<Bit | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const SIZE = 200; // viewBox enhet per bit

  return (
    <div className="h-full relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(30%) brightness(0.35)' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.72)' }} />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">

          {/* Badge */}
          <div
            className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
            style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}
          >
            AI:ns historia · Fyra byggstenar
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Fyra saker som skapade AI
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl">
            Det tog 70 år, en filosof, miljoner gamers, hela internet och ett Google-papper.
            Klicka på varje pusselbit.
          </p>

          {/* SVG-pussel centrerat */}
          <div className="flex justify-center mb-8">
            <div style={{ width: 'min(380px, 86vw)', aspectRatio: '1' }}>
              <svg
                viewBox={`0 0 ${SIZE * 2} ${SIZE * 2}`}
                width="100%"
                height="100%"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  {PIECES.map(({ bit }) => (
                    <filter key={bit.id} id={`glow-${bit.id}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="6"
                        floodColor={bit.färg} floodOpacity={viewed.has(bit.id) ? 0.6 : 0.15} />
                    </filter>
                  ))}
                </defs>

                {PIECES.map(({ pathKey, bit, col, row }, i) => {
                  const isViewed = viewed.has(bit.id);
                  const tx = col * SIZE;
                  const ty = row * SIZE;

                  return (
                    <motion.g
                      key={bit.id}
                      transform={`translate(${tx}, ${ty})`}
                      initial={{ opacity: 0, scale: 0.8, x: col === 0 ? -20 : 20, y: row === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      transition={{ delay: i * 0.12, type: 'spring', stiffness: 180, damping: 18 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setActive(bit);
                        setViewed(p => new Set([...p, bit.id]));
                      }}
                      style={{ cursor: 'pointer', transformOrigin: `${SIZE / 2}px ${SIZE / 2}px` }}
                      filter={`url(#glow-${bit.id})`}
                    >
                      {/* Pusselbit-form */}
                      <path
                        d={PATHS[pathKey]}
                        fill={isViewed ? bit.färg : 'rgba(255,255,255,0.09)'}
                        stroke={isViewed ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.18)'}
                        strokeWidth="1.5"
                        style={{ transition: 'fill 0.4s ease' }}
                      />

                      {/* Emoji */}
                      <text x="60" y="72" fontSize="28" textAnchor="middle" dominantBaseline="middle" style={{ userSelect: 'none' }}>
                        {bit.emoji}
                      </text>

                      {/* Rubrik */}
                      <text
                        x="95" y="105"
                        fontSize="10.5"
                        fontWeight="800"
                        fontFamily="Nunito, sans-serif"
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ userSelect: 'none' }}
                      >
                        {bit.rubrik}
                      </text>

                      {/* År */}
                      <text
                        x="95" y="121"
                        fontSize="8.5"
                        fontFamily="Nunito, sans-serif"
                        fill="rgba(255,255,255,0.45)"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ userSelect: 'none' }}
                      >
                        {bit.år}
                      </text>

                      {/* Checkmark */}
                      {isViewed && (
                        <text x="155" y="28" fontSize="13" textAnchor="middle" dominantBaseline="middle" fill="white" style={{ userSelect: 'none' }}>
                          ✓
                        </text>
                      )}
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Progress */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              {viewed.size === bitar.length ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block rounded-2xl px-6 py-4"
                  style={{ background: `${O}15`, border: `1px solid ${O}30` }}
                >
                  <p className="text-white font-bold mb-1">✓ Pusslet är komplett</p>
                  <p className="text-white/50 text-sm">
                    Turing → Gamers → Data → Transformer. Resultatet: ChatGPT, Claude, Gemini.
                  </p>
                </motion.div>
              ) : (
                <motion.p key="prog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/30 text-sm">
                  {viewed.size}/{bitar.length} pusselbitar klickade
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <Modal bit={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default AIHistoriaSlide;
