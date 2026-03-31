// src/components/CourseElements/GdprPrinciplesSection.tsx
// Bara cirklar + modal – ingen bakgrundsbild eller header.
// Föräldern (VadArGdprSlide) ansvarar för bakgrundsbild och layout.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

const PRINCIPLES = [
  {
    id: 'laglighet',
    label: 'Laglighet, hantering i god tro och transparens',
    short: 'Behandlingen ska ha en laglig grund.',
    body: 'Varje behandling av personuppgifter måste vila på en av de rättsliga grunderna i GDPR – exempelvis samtycke, avtal eller rättslig förpliktelse. Behandlingen ska dessutom vara rättvis mot den registrerade och transparent.',
    example: 'BRF Räkmackan informerar alla medlemmar i välkomstbrevet om vilka uppgifter föreningen sparar och varför.',
  },
  {
    id: 'andamal',
    label: 'Ändamål',
    short: 'Uppgifter får bara användas för det syfte de samlades in för.',
    body: 'Ni får inte samla in personuppgifter för ett syfte och sedan använda dem för något helt annat. Om ni samlar in e-post för kallelser till stämman får ni inte använda samma adress för marknadsföring utan ett nytt samtycke.',
    example: 'Medlemmarnas telefonnummer används bara för felanmälan – inte för att skicka nyhetsbrev.',
  },
  {
    id: 'minimering',
    label: 'Data­minimering',
    short: 'Samla bara in det som verkligen behövs.',
    body: 'Principen innebär att ni bara ska behandla de personuppgifter som är nödvändiga för ändamålet. Fråga er alltid: "Behöver vi verkligen den här uppgiften?" Onödiga uppgifter ska inte samlas in alls.',
    example: 'Felanmälningsformuläret frågar bara efter namn, lägenhetsnummer och felbeskrivning – inte personnummer.',
  },
  {
    id: 'noggrannhet',
    label: 'Noggrannhet',
    short: 'Uppgifter ska vara riktiga och uppdaterade.',
    body: 'Ni är skyldiga att se till att de personuppgifter ni behandlar är korrekta. Om en uppgift är felaktig ska den rättas eller raderas. Rutiner för att hålla register uppdaterade är viktiga, särskilt vid ägarbyten.',
    example: 'Vid varje ägarbyte uppdateras medlemsregistret direkt med nya kontaktuppgifter.',
  },
  {
    id: 'begransning',
    label: 'Begränsning av förvaring',
    short: 'Radera uppgifter när de inte längre behövs.',
    body: 'Personuppgifter får inte sparas längre än nödvändigt. Ni bör ha en policy för hur länge olika typer av uppgifter sparas. Kontaktuppgifter till tidigare medlemmar ska raderas när de inte längre behövs.',
    example: 'Kontaktuppgifter till utflyttade medlemmar raderas ur systemet inom 30 dagar efter avregistrering.',
  },
  {
    id: 'integritet',
    label: 'Integritet och sekretess',
    short: 'Skydda uppgifterna mot obehörig åtkomst.',
    body: 'Ni måste vidta lämpliga tekniska och organisatoriska åtgärder för att skydda personuppgifterna. Det kan handla om lösenordsskydd, begränsad åtkomst och säkra kommunikationskanaler.',
    example: 'Medlemsregistret är lösenordsskyddat och bara kassören och ordföranden har åtkomst.',
  },
  {
    id: 'ansvar',
    label: 'Ansvar',
    short: 'Ni ska kunna visa att ni följer reglerna.',
    body: 'Det räcker inte att följa GDPR – ni måste också kunna bevisa det. Det innebär att ha dokumenterade rutiner, behandlingsregister och kunna visa IMY hur ni arbetar med dataskydd om de frågar.',
    example: 'BRF Räkmackan har ett enkelt behandlingsregister i ett delat dokument som uppdateras varje år.',
  },
];

// ── Modal ─────────────────────────────────────────────────
const Modal = ({ principle, onClose }) => (
  <AnimatePresence>
    {principle && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex justify-end px-5 pt-5">
              <button onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            <div className="px-6 pb-5 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: O }}>
                <span className="text-white font-black text-lg">
                  {PRINCIPLES.findIndex(p => p.id === principle.id) + 1}
                </span>
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">
                {principle.label}
              </h3>
              <p className="text-sm text-gray-500">{principle.short}</p>
            </div>

            <div className="h-px bg-gray-100 mx-6" />

            <div className="px-6 py-5 overflow-y-auto space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{principle.body}</p>
              <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: OL }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: OD }}>
                  Exempel
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{principle.example}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <button onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
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
const GdprPrinciplesSection: React.FC = () => {
  const [active, setActive] = useState<typeof PRINCIPLES[0] | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (p: typeof PRINCIPLES[0]) => {
    setActive(p);
    setViewed(prev => new Set([...prev, p.id]));
  };

  const allDone = viewed.size === PRINCIPLES.length;

  return (
    <div className="w-full">
      {/* Cirklar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-8 px-4">
        {PRINCIPLES.map((p, i) => {
          const isViewed = viewed.has(p.id);
          return (
            <motion.button key={p.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(p)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}>
              {p.label}
            </motion.button>
          );
        })}
      </div>

      {/* Status */}
      {allDone ? (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>
          ✓ Du har utforskat alla 7 principer!
        </p>
      ) : viewed.size > 0 ? (
        <p className="text-center text-xs pb-4 text-white/40">
          {viewed.size}/{PRINCIPLES.length} utforskade – klicka på fler
        </p>
      ) : null}

      <Modal principle={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default GdprPrinciplesSection;