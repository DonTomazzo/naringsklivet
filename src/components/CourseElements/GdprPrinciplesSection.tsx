// src/components/CourseElements/GdprPrinciplesSection.tsx
// De 7 GDPR-principerna som klickbara kort med modal och bakgrundsbild.
// Byt BACKGROUND_IMAGE_URL mot valfri bild.
//
// Användning i VadArGdprSlide:
//   import GdprPrinciplesSection from '../../components/CourseElements/GdprPrinciplesSection';
//   <GdprPrinciplesSection />

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ChevronRight } from 'lucide-react';

// ─── Byt ut denna URL mot valfri bakgrundsbild ───
const BACKGROUND_IMAGE_URL =
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80';

// ─── Principdata ───
const PRINCIPLES = [
  {
    n: '1',
    title: 'Laglig, rättvis och öppen',
    short: 'Behandlingen ska ha en laglig grund.',
    color: '#3B82F6',
    body: `Varje behandling av personuppgifter måste vila på en av de rättsliga grunderna i GDPR – exempelvis samtycke, avtal eller rättslig förpliktelse. Behandlingen ska dessutom vara rättvis mot den registrerade och transparent, det vill säga att personen ska veta om att uppgifterna behandlas och varför.`,
    example: 'BRF Räkmackan informerar alla medlemmar i välkomstbrevet om vilka uppgifter föreningen sparar och varför.',
  },
  {
    n: '2',
    title: 'Ändamålsbegränsning',
    short: 'Uppgifter får bara användas för det syfte de samlades in för.',
    color: '#8B5CF6',
    body: `Ni får inte samla in personuppgifter för ett syfte och sedan använda dem för något helt annat. Om ni samlar in e-post för att skicka kallelser till stämman får ni inte använda samma adress för marknadsföring utan ett nytt samtycke.`,
    example: 'Medlemmarnas telefonnummer används bara för felanmälan – inte för att skicka nyhetsbrev.',
  },
  {
    n: '3',
    title: 'Uppgiftsminimering',
    short: 'Samla bara in det som verkligen behövs.',
    color: '#10B981',
    body: `Principen innebär att ni bara ska behandla de personuppgifter som är nödvändiga för ändamålet. Fråga er alltid: "Behöver vi verkligen den här uppgiften?" Onödiga uppgifter ska inte samlas in alls.`,
    example: 'Felanmälningsformuläret frågar bara efter namn, lägenhets­nummer och felbeskrivning – inte personnummer.',
  },
  {
    n: '4',
    title: 'Korrekthet',
    short: 'Uppgifter ska vara riktiga och uppdaterade.',
    color: '#F59E0B',
    body: `Ni är skyldiga att se till att de personuppgifter ni behandlar är korrekta. Om en uppgift är felaktig ska den rättas eller raderas. Rutiner för att hålla register uppdaterade är viktiga, särskilt vid ägarbyten i föreningen.`,
    example: 'Vid varje ägarbyte uppdateras medlemsregistret direkt med nya kontaktuppgifter.',
  },
  {
    n: '5',
    title: 'Lagringsminimering',
    short: 'Radera uppgifter när de inte längre behövs.',
    color: '#EF4444',
    body: `Personuppgifter får inte sparas längre än nödvändigt. Ni bör ha en policy för hur länge olika typer av uppgifter sparas. Protokoll och ekonomihandlingar kan behöva sparas länge av andra juridiska skäl, men kontaktuppgifter till tidigare medlemmar ska raderas.`,
    example: 'Kontaktuppgifter till utflyttade medlemmar raderas ur systemet inom 30 dagar efter avregistrering.',
  },
  {
    n: '6',
    title: 'Integritet och konfidentialitet',
    short: 'Skydda uppgifterna mot obehörig åtkomst.',
    color: '#06B6D4',
    body: `Ni måste vidta lämpliga tekniska och organisatoriska åtgärder för att skydda personuppgifterna. Det kan handla om lösenordsskydd, begränsad åtkomst och säkra kommunikationskanaler. Tänk på att ett osäkrat kalkylblad med alla medlemmars uppgifter är ett säkerhetsproblem.`,
    example: 'Medlemsregistret är lösenordsskyddat och bara kassören och ordföranden har åtkomst.',
  },
  {
    n: '7',
    title: 'Ansvarsskyldighet',
    short: 'Ni ska kunna visa att ni följer reglerna.',
    color: '#FF5421',
    body: `Det räcker inte att följa GDPR – ni måste också kunna bevisa det. Det innebär att ha dokumenterade rutiner, behandlingsregister och kunna visa IMY hur ni arbetar med dataskydd om de frågar. Styrelsen är personligt ansvarig för att föreningen lever upp till kraven.`,
    example: 'BRF Räkmackan har ett enkelt behandlingsregister i ett delat dokument som uppdateras varje år.',
  },
];

// ─── Modal ───
const PrincipleModal = ({
  principle,
  onClose,
}: {
  principle: (typeof PRINCIPLES)[0] | null;
  onClose: () => void;
}) => {
  if (!principle) return null;
  return (
    <AnimatePresence>
      {principle && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

              {/* Stäng-knapp */}
              <div className="flex justify-end px-5 pt-5">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Header */}
              <div className="px-6 pb-4 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4"
                  style={{ background: principle.color }}
                >
                  {principle.n}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {principle.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{principle.short}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 mx-6" />

              {/* Body */}
              <div className="px-6 py-5 overflow-y-auto space-y-4">
                <p className="text-slate-600 leading-relaxed text-sm">{principle.body}</p>

                <div
                  className="rounded-2xl p-4 border-l-4"
                  style={{
                    borderColor: principle.color,
                    background: `${principle.color}10`,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: principle.color }}>
                    Exempel – BRF Räkmackan
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">{principle.example}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl font-bold text-white transition-opacity hover:opacity-90 text-sm"
                  style={{ background: principle.color }}
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


// ─── Huvud-komponent ───
const GdprPrinciplesSection: React.FC = () => {
  const [active, setActive] = useState<(typeof PRINCIPLES)[0] | null>(null);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      {/* Bakgrundsbild */}
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="GDPR bakgrund"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0f1623]/80 backdrop-blur-[2px]" />

      {/* Innehåll */}
      <div className="relative z-10 p-5 sm:p-8">
        {/* Rubrik */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#FF5421] flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
              Grunderna
            </p>
            <h2 className="text-white font-bold text-xl leading-tight">
              De 7 grundprinciperna
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRINCIPLES.map((p, i) => (
            <motion.button
              key={p.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActive(p)}
              className="w-full text-left flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
            >
              {/* Nummer-badge */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                style={{ background: p.color }}
              >
                {p.n}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm leading-snug">{p.title}</p>
                <p className="text-white/50 text-xs mt-0.5 leading-relaxed line-clamp-1">
                  {p.short}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 flex-shrink-0 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <PrincipleModal principle={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default GdprPrinciplesSection;