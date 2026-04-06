// src/components/CourseElements/LagandringarSection.tsx
// Bara cirklar + modal – ingen bakgrundsbild eller header.
// Föräldern ansvarar för bakgrundsbild och layout.
// Samma struktur som GdprPrinciplesSection.

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Download } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

const LAGAR = [
  {
    id: 'rostratt',
    år: '2023',
    label: 'En röst per lägenhet',
    short: 'Tryggare bostadsrätt – en röst per bostadslägenhet.',
    bild: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=400&q=80',
    audioSrc: '/audio/rostratt.mp3',
    body: 'Från 1 januari 2023 gäller att varje bostadslägenhet ger en röst på stämman – oavsett hur många lägenheter en person eller ett företag äger. Äldre stadgar som tillät fler röster vid innehav av flera lägenheter är nu överspelda av lagen. Undantag gäller fortfarande för lokaler, garage och förråd.',
    atgard: 'Gå igenom era stadgar. Om de innehåller äldre rösträttsregler för bostadslägenheter – uppdatera dem på kommande stämma så att de stämmer överens med lagen.',
  },
  {
    id: 'matavfall',
    år: '2024',
    label: 'Obligatorisk matavfallssortering',
    short: 'Lag på att alla hushåll ska sortera matavfall.',
    bild: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80',
    audioSrc: '/audio/matavfall.mp3',
    body: 'Sedan januari 2024 är det lag på att alla hushåll – inklusive de i BRF:er – ska sortera ut matavfall separat. Föreningen ansvarar för att det finns kärl och att de boende har möjlighet att göra rätt. Det är inte längre ett frivilligt miljöval utan ett lagkrav.',
    atgard: 'Kontrollera att ni har separata kärl för matavfall och att informationen till de boende är tydlig. Om ni saknar lösning – kontakta er renhållningsentreprenör.',
  },
  {
    id: 'moms',
    år: '2024–26',
    label: 'Moms på el, vatten & parkering',
    short: 'IMD, parkeringsregler – och ny dom om momsavdrag.',
    bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&q=80',
    audioSrc: '/audio/moms.mp3',
    body: [
      'IMD: Högsta förvaltningsdomstolen har fastställt att individuell debitering av el, vatten eller elbilsladdning baserad på faktisk förbrukning räknas som momspliktig tjänst. Momsregistrering krävs om omsättningen överstiger 80 000 kr/år.',
      'Parkering: Från hösten 2026 skärps reglerna för parkeringsupplåtelser vilket påverkar hyresnivåer för medlemmarna.',
      'NY DOM – mål 7071-24: Högsta förvaltningsdomstolen ger SBC rätt mot Skatteverket. Föreningar med blandad verksamhet (t.ex. lokaler som hyrs ut med moms) har rätt till större momsavdrag än tidigare. Domen är prejudicerande och ny praxis gäller framöver. Vissa föreningar kan ha rätt till återbetalning av hundratusentals kronor.',
    ],
    atgard: 'Tre åtgärder: (1) Kartlägg om ni debiterar el/vatten individuellt och om ni passerar 80 000 kr-gränsen. (2) Se över parkeringssituationen inför 2026. (3) Om ni hyr ut lokaler med moms – kontakta er revisor eller SBC för att se om ni kan begära återbetalning med stöd av den nya domen.',
  },
  {
    id: 'k3',
    år: '2026',
    label: 'Från K2 till K3',
    short: 'Ny redovisningsstandard med komponentavskrivning.',
    bild: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    audioSrc: '/audio/k3.mp3',
    body: 'Bokföringsnämnden har beslutat att BRF:er inte längre får använda det enklare regelverket K2 för räkenskapsår som börjar efter 31 december 2025. Alla måste gå över till K3. Den stora skillnaden är komponentavskrivning – fastigheten delas upp i delar (tak, fönster, stammar, hissar) som skrivs av separat utifrån deras faktiska livslängd. Det ger en mer rättvisande bild av husets skick men kräver mer administration.',
    atgard: 'Kontakta er revisor eller förvaltare redan nu för att starta en komponentuppdelning av fastigheten. Ju längre ni väntar, desto mer stressad blir övergången. Räkna med ökade redovisningskostnader det första året.',
  },
  {
    id: 'forpackningar',
    år: '2027',
    label: 'Fastighetsnära förpackningsinsamling',
    short: 'Förpackningar ska samlas in vid fastigheten senast 2027.',
    bild: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&q=80',
    audioSrc: '/audio/forpackningar.mp3',
    body: 'Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar – plast, papper, metall och glas – i eller direkt i anslutning till fastigheten. Många föreningar behöver bygga om sina miljörum för att få plats med fler kärl. Förberedelserna bör starta nu.',
    atgard: 'Planera om ert miljörum redan nu. Ta in offerter, ansök om bygglov om nödvändigt och budgetera för ombyggnad under 2025–2026 så att ni är klara i god tid.',
  },
];

// ── Modal ─────────────────────────────────────────────────
const Modal = ({ lag, onClose }: {
  lag: (Omit<typeof LAGAR[0], 'body'> & { body: string | string[]; bild: string; audioSrc?: string }) | null;
  onClose: () => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Starta ljud när modal öppnas, stoppa när den stängs
  useEffect(() => {
    if (lag?.audioSrc) {
      audioRef.current = new Audio(lag.audioSrc);
      audioRef.current.volume = 0.9;
      audioRef.current.play().catch(() => {}); // ignorera om blocked
    }
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [lag?.id]);

  return (
  <AnimatePresence>
    {lag && (
      <>
        {/* Backdrop – klick utanför stänger */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed z-50"
          style={{
            // Mobil: kant-till-kant, under headern (ca 60px)
            top: 'var(--header-height, 60px)',
            left: 0,
            right: 0,
            bottom: 0,
            // Desktop: centrerad modal
          }}
        >
          {/* Desktop: centrera */}
          <div className="h-full flex items-center justify-center p-0 md:p-6">
          <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-3xl md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">

            {/* Bildtopp */}
            <div className="relative flex-shrink-0 h-44 sm:h-52 md:h-56">
              <img
                src={lag.bild}
                alt={lag.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)' }} />

              {/* X-knapp */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ background: 'rgba(0,0,0,0.4)' }}
              >
                <X size={16} className="text-white" />
              </button>

              {/* År-badge + rubrik */}
              <div className="absolute bottom-4 left-5 right-14">
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                  style={{ background: O, color: 'white' }}
                >
                  Lagändring {lag.år}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {lag.label}
                </h3>
                <p className="text-white/70 text-base mt-1">{lag.short}</p>
              </div>
            </div>

            {/* Body – scrollbar */}
            <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-6 flex-1">

              {/* Vad innebär det */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
                  Vad innebär det?
                </p>
                {Array.isArray(lag.body) ? (
                  <div className="space-y-3">
                    {lag.body.map((para, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: O }} />
                        <p className="text-base text-gray-600 leading-relaxed">{para}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base text-gray-600 leading-relaxed">{lag.body}</p>
                )}
              </div>

              {/* Åtgärd */}
              <div className="rounded-2xl p-5 border" style={{ background: OL, borderColor: `${O}20` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
                  Vad bör ni göra?
                </p>
                <div className="space-y-3">
                  {lag.atgard.split(/\(\d+\)/).filter(Boolean).map((punkt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm font-bold"
                        style={{ background: O, minWidth: 28 }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-base text-gray-700 leading-relaxed">{punkt.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra padding för mobil så innehållet inte döljs */}
              <div className="h-4 md:hidden" />
            </div>

          </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
};

// ── Huvudkomponent ────────────────────────────────────────
const LagandringarSection: React.FC = () => {
  const [active, setActive] = useState<typeof LAGAR[0] | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (lag: typeof LAGAR[0]) => {
    setActive(lag);
    setViewed(prev => new Set([...prev, lag.id]));
  };

  const allDone = viewed.size === LAGAR.length;

  return (
    <div className="w-full">
      {/* Cirklar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-8 px-4">
        {LAGAR.map((lag, i) => {
          const isViewed = viewed.has(lag.id);
          return (
            <motion.button
              key={lag.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(lag)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}
            >
              {lag.label}
            </motion.button>
          );
        })}
      </div>

      {/* Status */}
      {allDone ? (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>
          ✓ Du har utforskat alla 5 lagändringar!
        </p>
      ) : viewed.size > 0 ? (
        <p className="text-center text-xs pb-4 text-white/40">
          {viewed.size}/{LAGAR.length} utforskade – klicka på fler
        </p>
      ) : null}

      

      {/* Nedladdning */}
      <div className="flex flex-col items-center pb-8 gap-2">
        <motion.a
          href="/pdf/Lagändringar_BRF_Kursmaterial.pdf"
          download="Lagändringar_BRF_Kursmaterial.pdf"
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-3 group"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <Download size={22} className="text-white group-hover:text-[#FF5421] transition-colors" strokeWidth={2} />
          </div>
          <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors">
            Ladda ner kursmaterial
          </span>
        </motion.a>
      </div>

      <Modal lag={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default LagandringarSection;
