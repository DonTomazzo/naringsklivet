// src/components/CourseElements/LagandringarSection.tsx
// Bara cirklar + modal – ingen bakgrundsbild eller header.
// Föräldern ansvarar för bakgrundsbild och layout.
// Samma struktur som GdprPrinciplesSection.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AudioPlayer from '../AudioPlayer';
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
    body: 'Från 1 januari 2023 gäller att varje bostadslägenhet ger en röst på stämman – oavsett hur många lägenheter en person eller ett företag äger. Äldre stadgar som tillät fler röster vid innehav av flera lägenheter är nu överspelda av lagen. Undantag gäller fortfarande för lokaler, garage och förråd.',
    atgard: 'Gå igenom era stadgar. Om de innehåller äldre rösträttsregler för bostadslägenheter – uppdatera dem på kommande stämma så att de stämmer överens med lagen.',
  },
  {
    id: 'matavfall',
    år: '2024',
    label: 'Obligatorisk matavfallssortering',
    short: 'Lag på att alla hushåll ska sortera matavfall.',
    body: 'Sedan januari 2024 är det lag på att alla hushåll – inklusive de i BRF:er – ska sortera ut matavfall separat. Föreningen ansvarar för att det finns kärl och att de boende har möjlighet att göra rätt. Det är inte längre ett frivilligt miljöval utan ett lagkrav.',
    atgard: 'Kontrollera att ni har separata kärl för matavfall och att informationen till de boende är tydlig. Om ni saknar lösning – kontakta er renhållningsentreprenör.',
  },
  {
    id: 'moms',
    år: '2024–26',
    label: 'Moms på el, vatten & parkering',
    short: 'IMD, parkeringsregler – och ny dom om momsavdrag.',
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
    label: 'K2 till K3',
    short: 'Ny redovisningsstandard med komponentavskrivning.',
    body: 'Bokföringsnämnden har beslutat att BRF:er inte längre får använda det enklare regelverket K2 för räkenskapsår som börjar efter 31 december 2025. Alla måste gå över till K3. Den stora skillnaden är komponentavskrivning – fastigheten delas upp i delar (tak, fönster, stammar, hissar) som skrivs av separat utifrån deras faktiska livslängd. Det ger en mer rättvisande bild av husets skick men kräver mer administration.',
    atgard: 'Kontakta er revisor eller förvaltare redan nu för att starta en komponentuppdelning av fastigheten. Ju längre ni väntar, desto mer stressad blir övergången. Räkna med ökade redovisningskostnader det första året.',
  },
  {
    id: 'forpackningar',
    år: '2027',
    label: 'Fastighetsnära förpackningsinsamling',
    short: 'Förpackningar ska samlas in vid fastigheten senast 2027.',
    body: 'Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar – plast, papper, metall och glas – i eller direkt i anslutning till fastigheten. Många föreningar behöver bygga om sina miljörum för att få plats med fler kärl. Förberedelserna bör starta nu.',
    atgard: 'Planera om ert miljörum redan nu. Ta in offerter, ansök om bygglov om nödvändigt och budgetera för ombyggnad under 2025–2026 så att ni är klara i god tid.',
  },
];

// ── Modal ─────────────────────────────────────────────────
const Modal = ({ lag, onClose }: { lag: (Omit<typeof LAGAR[0], 'body'> & { body: string | string[] }) | null; onClose: () => void }) => (
  <AnimatePresence>
    {lag && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex justify-end px-5 pt-5">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            <div className="px-6 pb-5 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: O }}
              >
                <span className="text-white font-black text-sm leading-tight px-1 text-center">
                  {lag.år}
                </span>
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">
                {lag.label}
              </h3>
              <p className="text-sm text-gray-500">{lag.short}</p>
            </div>

            <div className="h-px bg-gray-100 mx-6" />

            <div className="px-6 py-5 overflow-y-auto space-y-4">
              {Array.isArray(lag.body) ? (
                <div className="space-y-3">
                  {lag.body.map((para, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{lag.body}</p>
              )}
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: OL }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OD }}>
                  Åtgärd för er styrelse
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{lag.atgard}</p>
              </div>
            </div>

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

      {/* Ljudspelare – centrerad under cirklarna */}
      <div className="max-w-xl mx-auto px-4 pb-4">
        <AudioPlayer audioSrc="/audio/lagandringar.mp3" />
      </div>

      {/* Nedladdning */}
      <div className="flex flex-col items-center pb-8 gap-2">
        <motion.a
          href="/pdf/lagandringar.pdf"
          download="lagandringar.pdf"
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