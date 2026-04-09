// src/modules/Naringsklivet/slides/KallkritikSlide.tsx
// Slide: Källkritik och AI – verifiera innan du skickar vidare
// Målgrupp: Medarbetare i arbetslivet

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

const BgSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.87)' }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div
    className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}
  >
    {text}
  </div>
);

export const KallkritikSlide: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const signaler = [
    {
      signal: 'AI ger ett specifikt datum eller siffra',
      risk: 'Hög',
      action: 'Verifiera mot primärkälla. AI hittar ofta på exakta siffror som låter trovärdiga.',
    },
    {
      signal: 'AI namnger en källa eller rapport',
      risk: 'Hög',
      action: 'Sök upp källan och kontrollera att den faktiskt finns och säger det AI påstår.',
    },
    {
      signal: 'AI beskriver vad "experter säger"',
      risk: 'Medel',
      action: 'Fråga AI: "Vem specifikt? Vad är källan?" Vaga expertreferenser är ett varningstecken.',
    },
    {
      signal: 'AI beskriver juridik, regler eller lagar',
      risk: 'Hög',
      action: 'Kontrollera alltid mot officiell källa (riksdagen.se, myndighet). Lagar ändras och AI kan ha fel träningsdatum.',
    },
    {
      signal: 'Svaret låter perfekt och heltäckande',
      risk: 'Medel',
      action: 'AI tenderar att fylla i luckor med trovärdigt-klingande information. Ju mer perfekt, desto mer kritisk.',
    },
    {
      signal: 'Du ska skicka informationen vidare till kund eller chef',
      risk: 'Alltid',
      action: 'Verifiera alltid faktapåståenden innan du representerar dem som dina egna. Du är avsändaren.',
    },
  ];

  const scenarios = [
    {
      titel: 'Du skriver en rapport',
      situation: 'Du ber AI sammanfatta branschstatistik för din rapport till ledningen. AI ger dig siffror med tillhörande "källa".',
      fel: 'Du klistrar in siffrorna direkt i rapporten utan att kolla källan. Vid presentationen frågar chefen efter källan – den existerar inte.',
      rätt: 'Du söker upp källan AI angav. Den finns – men siffran AI citerade är från ett annat år. Du korrigerar och presenterar korrekt data.',
      läxa: 'Du är avsändare av rapporten, inte AI. Ditt namn står på den.',
    },
    {
      titel: 'Du svarar på en kundförfrågan',
      situation: 'En kund frågar om leveranstider. Du frågar AI som svarar med specifika siffror baserat på "branschstandard".',
      fel: 'Du vidarebefordrar AI:ns svar direkt till kunden. Siffrorna stämmer inte med er faktiska process – kunden blir missnöjd.',
      rätt: 'Du använder AI:ns svar som ett utkast och verifierar mot faktisk intern data innan du svarar kunden.',
      läxa: 'AI kan inte veta din organisations specifika processer. Intern data trumfar alltid AI:ns generella svar.',
    },
    {
      titel: 'Du delar ett AI-genererat inlägg',
      situation: 'Du ber AI skriva ett LinkedIn-inlägg om en ny studie i din bransch. AI nämner studien med detaljer.',
      fel: 'Du publicerar inlägget. Någon i kommentarsfältet påpekar att studien AI refererar till inte finns.',
      rätt: 'Du googlar studien innan du publicerar. Den finns men säger något lite annorlunda – du justerar texten.',
      läxa: 'AI-genererat innehåll du publicerar under ditt namn representerar dig professionellt.',
    },
  ];

  const riskFärg = (risk: string) => {
    if (risk === 'Hög') return { bg: 'rgba(239,68,68,0.12)', text: '#f87171', border: 'rgba(239,68,68,0.3)' };
    if (risk === 'Medel') return { bg: 'rgba(251,146,60,0.12)', text: '#fb923c', border: 'rgba(251,146,60,0.3)' };
    return { bg: `${O}15`, text: O, border: `${O}30` };
  };

  return (
    <BgSlide>
      <Badge text="Avsnitt 11 · Källkritik och AI" />

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 flex items-center gap-3"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <Search className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
        Källkritik – verifiera innan du skickar vidare
      </h2>

      <p className="text-white/70 text-base leading-relaxed mb-6">
        AI är övertygande. Det är dess styrka – och den största risken. Att använda
        AI-genererad information utan att verifiera den kan skada din trovärdighet,
        din organisations rykte eller leda till felaktiga beslut.
      </p>

      {/* Varningstecken */}
      <div
        className="rounded-2xl p-5 border mb-6"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: O }}
        >
          Varningstecken – verifiera extra noga när...
        </p>
        <div className="space-y-3">
          {signaler.map((s, i) => {
            const färg = riskFärg(s.risk);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ background: färg.bg, border: `1px solid ${färg.border}` }}
              >
                <span
                  className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5"
                  style={{ background: färg.border, color: färg.text }}
                >
                  {s.risk}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold leading-snug mb-1">
                    {s.signal}
                  </p>
                  <p className="text-white/50 text-xs leading-snug">{s.action}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scenarion */}
      <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">
        Scenarion – vad händer i praktiken?
      </p>
      <div className="space-y-3 mb-6">
        {scenarios.map((sc, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <button
              onClick={() => setActiveScenario(activeScenario === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <p className="text-white font-bold text-sm">{sc.titel}</p>
              <span style={{ color: O, fontSize: 18 }}>
                {activeScenario === i ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {activeScenario === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    <p className="text-white/60 text-sm leading-relaxed italic">
                      {sc.situation}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl p-3"
                        style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.2)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <XCircle size={13} className="text-red-400 flex-shrink-0" />
                          <p className="text-red-400 text-xs font-bold uppercase tracking-wide">Fel</p>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed">{sc.fel}</p>
                      </div>
                      <div className="rounded-xl p-3"
                        style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.2)' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                          <p className="text-green-400 text-xs font-bold uppercase tracking-wide">Rätt</p>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed">{sc.rätt}</p>
                      </div>
                    </div>
                    <div className="rounded-xl p-3"
                      style={{ background: `${O}12`, border: `1px solid ${O}25` }}
                    >
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>
                        Läxa
                      </p>
                      <p className="text-white/80 text-xs leading-relaxed">{sc.läxa}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Tumregler */}
      <div
        className="rounded-xl p-4 border-l-4"
        style={{ borderColor: O, background: `${O}10` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
          Tre tumregler
        </p>
        <div className="space-y-1.5">
          {[
            'Specifika siffror, datum och källhänvisningar – kontrollera alltid',
            'Be AI motivera sitt svar: "Hur vet du det?" avslöjar osäkerheter',
            'Du är avsändaren – inte AI. Ditt namn och din trovärdighet är på spel',
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                style={{ background: O }}
              />
              <p className="text-white/80 text-sm leading-snug">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </BgSlide>
  );
};

export default KallkritikSlide;