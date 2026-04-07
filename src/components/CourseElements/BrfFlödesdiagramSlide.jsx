// src/components/CourseElements/BrfFlödesdiagramSlide.jsx
// Animerat flödesdiagram – Så fungerar bostadsrättsföreningen
// Rubrik ovanför diagram (vänster), förklaring täcker hela höger, mobil accordion

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const O    = '#FF5421';
const DARK = '#0f1623';

const NODER = [
  {
    id: 'medlemmar',
    label: 'Medlemmar',
    icon: '👥',
    beskrivning: 'Alla bostadsrättsägare är medlemmar och föreningens yttersta ägare. De utövar sin makt på föreningsstämman — en röst per lägenhet, oavsett storlek.',
    ansvar: ['Betalar årsavgift', 'Röstar på stämman', 'Följer stadgar och ordningsregler'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'stamma',
    label: 'Föreningsstämman',
    icon: '🗳️',
    beskrivning: 'Föreningens högsta beslutande organ. Hålls minst en gång per år på våren. Här godkänns årsredovisning, väljs styrelse och revisorer och fattas viktiga beslut.',
    ansvar: ['Väljer styrelse och revisorer', 'Godkänner årsredovisning', 'Beslutar om avgifter och stadgar'],
    audioUrl: '/audio/k3.mp3',
    sido: { label: 'Valberedning', icon: '📋', text: 'Föreslår kandidater till styrelsen. Väljs av stämman och arbetar självständigt.' },
  },
  {
    id: 'styrelse',
    label: 'Styrelsen',
    icon: '⚙️',
    beskrivning: 'Leder föreningens löpande arbete mellan stämmorna. Ansvarar juridiskt för fastigheten och ekonomin. Väljs av stämman för 1–2 år.',
    ansvar: ['Förvaltar fastighet och ekonomi', 'Fattar löpande beslut', 'Bär juridiskt ansvar'],
    audioUrl: '/audio/k3.mp3',
    sido: { label: 'Revisor', icon: '🔍', text: 'Granskar styrelsens arbete och räkenskaper. Rapporterar till stämman — inte styrelsen.' },
  },
  {
    id: 'forvaltare',
    label: 'Förvaltare',
    icon: '🏢',
    beskrivning: 'Sköter den dagliga driften på styrelsens uppdrag — bokföring, felanmälningar och leverantörskontakter. Styrelsen kan aldrig delegera bort sitt juridiska ansvar.',
    ansvar: ['Ekonomisk och teknisk förvaltning', 'Hanterar felanmälningar', 'Leverantörskontakter'],
    audioUrl: '/audio/k3.mp3',
  },
];

// ── Auto-play audio ───────────────────────────────────────
function useAutoAudio(url) {
  const ref = useRef(null);
  useEffect(() => {
    if (!url) return;
    if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
    const audio = new Audio(url);
    ref.current = audio;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.currentTime = 0; };
  }, [url]);
}

// ── Desktop nivå-diagram ──────────────────────────────────
function OrgChart({ aktiv, setAktiv }) {
  return (
    <div className="w-full space-y-1">
      {NODER.map((nod, i) => {
        const isAktiv = aktiv === nod.id;
        return (
          <div key={nod.id}>
            <div className="relative flex items-center">
              {/* Sido-badge */}
              {nod.sido && (
                <div
                  className="absolute right-full mr-3 px-3 py-2 rounded-xl border text-xs font-bold whitespace-nowrap"
                  style={{
                    background: isAktiv ? `${O}18` : 'rgba(255,255,255,0.04)',
                    borderColor: isAktiv ? `${O}50` : 'rgba(255,255,255,0.1)',
                    color: isAktiv ? O : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <span className="mr-1">{nod.sido.icon}</span>
                  {nod.sido.label}
                  <div style={{
                    position: 'absolute', left: '100%', top: '50%',
                    width: 12, height: 1,
                    background: isAktiv ? O : 'rgba(255,255,255,0.15)',
                  }} />
                </div>
              )}

              {/* Huvud-nod */}
              <motion.button
                onClick={() => setAktiv(nod.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-5 rounded-2xl border-2 text-left transition-all"
                style={{
                  background: isAktiv ? `${O}18` : 'rgba(255,255,255,0.04)',
                  borderColor: isAktiv ? O : 'rgba(255,255,255,0.1)',
                  boxShadow: isAktiv ? `0 0 28px ${O}30` : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{nod.icon}</span>
                  <div className="flex-1">
                    <p className="font-black text-base"
                      style={{ color: isAktiv ? O : 'rgba(255,255,255,0.85)', fontFamily: "'Nunito', sans-serif" }}>
                      {nod.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {nod.ansvar[0]}
                    </p>
                  </div>
                  {isAktiv && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: O }} />
                  )}
                </div>
              </motion.button>
            </div>

            {/* Pil */}
            {i < NODER.length - 1 && (
              <div className="flex justify-center py-1.5">
                <div className="flex flex-col items-center gap-0.5">
                  <motion.div animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ color: 'rgba(255,255,255,0.18)', fontSize: 13, lineHeight: 1 }}>↓</motion.div>
                  {nod.id === 'stamma' && (
                    <motion.div animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      style={{ color: 'rgba(255,255,255,0.12)', fontSize: 11, lineHeight: 1 }}>↑</motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Klicka på varje nivå för mer information
      </p>
    </div>
  );
}

// ── Mobil accordion ───────────────────────────────────────
function MobilAccordion({ aktiv, setAktiv }) {
  return (
    <div className="space-y-2 px-4 pb-28">
      {NODER.map((nod) => {
        const isAktiv = aktiv === nod.id;
        return (
          <div key={nod.id} className="rounded-2xl overflow-hidden border"
            style={{ borderColor: isAktiv ? O : 'rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setAktiv(isAktiv ? null : nod.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: isAktiv ? `${O}15` : 'rgba(255,255,255,0.04)' }}
            >
              <span className="text-xl">{nod.icon}</span>
              <span className="flex-1 font-bold text-sm"
                style={{ color: isAktiv ? O : 'rgba(255,255,255,0.8)', fontFamily: "'Nunito', sans-serif" }}>
                {nod.label}
              </span>
              <motion.div animate={{ rotate: isAktiv ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} style={{ color: isAktiv ? O : 'rgba(255,255,255,0.3)' }} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isAktiv && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-4 border-t" style={{ borderColor: `${O}25` }}>
                    <p className="text-sm text-white/70 leading-relaxed mb-3">{nod.beskrivning}</p>
                    {nod.sido && (
                      <div className="rounded-xl px-3 py-2 mb-3 border"
                        style={{ background: `${O}10`, borderColor: `${O}25` }}>
                        <p className="text-xs font-bold" style={{ color: O }}>
                          {nod.sido.icon} {nod.sido.label}
                        </p>
                        <p className="text-xs text-white/50 mt-0.5">{nod.sido.text}</p>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {nod.ansvar.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: O }} />
                          <p className="text-xs text-white/60">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── Huvud-komponent ───────────────────────────────────────
export default function BrfFlödesdiagramSlide() {
  const [aktiv, setAktiv] = useState('styrelse');
  const aktivNod = NODER.find(n => n.id === aktiv);

  useAutoAudio(aktivNod?.audioUrl);

  return (
    <div className="h-full overflow-hidden" style={{ paddingTop: 'var(--header-height, 60px)' }}>

      {/* ── DESKTOP ───────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-2 h-full">

        {/* Vänster: rubrik + diagram */}
        <div className="flex flex-col px-10 py-8 overflow-y-auto" style={{ background: DARK }}>

          {/* Rubrik ovanför diagrammet */}
          <div className="mb-6 flex-shrink-0 text-center">
  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
              Grunderna · BRF-struktur
            </p>
            <h2 className="text-3xl font-black leading-tight text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Så fungerar{' '}
              <span style={{ color: O }}>bostadsrättsföreningen</span>
            </h2>
            <p className="text-white/35 text-xs mt-2">
              Klicka på varje nivå för att förstå rollen.
            </p>
          </div>

          {/* Diagram */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <OrgChart aktiv={aktiv} setAktiv={setAktiv} />
            </div>
          </div>
        </div>

        {/* Höger: förklaring täcker hela ytan */}
        <div className="h-full overflow-y-auto flex flex-col justify-center px-10 lg:px-14 py-12 pb-28"
          style={{ background: '#FAFAF8' }}>

          <AnimatePresence mode="wait">
            {aktivNod && (
              <motion.div key={aktivNod.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}>

                {/* Nod-header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `${O}12`, border: `2px solid ${O}30` }}>
                    {aktivNod.icon}
                  </div>
                  <h3 className="text-3xl font-black leading-tight"
                    style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>
                    {aktivNod.label}
                  </h3>
                </div>

                {/* Beskrivning */}
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {aktivNod.beskrivning}
                </p>

                {/* Sido-info */}
                {aktivNod.sido && (
                  <div className="rounded-2xl px-5 py-4 mb-6 border"
                    style={{ background: `${O}07`, borderColor: `${O}20` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: O }}>
                      {aktivNod.sido.icon} {aktivNod.sido.label}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{aktivNod.sido.text}</p>
                  </div>
                )}

                {/* Ansvar */}
                <div className="rounded-2xl p-5 border-l-4" style={{ borderColor: O, background: `${O}06` }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
                    Ansvar & roll
                  </p>
                  <div className="space-y-3">
                    {aktivNod.ansvar.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: O }} />
                        <p className="text-sm text-gray-700">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBIL ─────────────────────────────────────── */}
      <div className="lg:hidden h-full overflow-y-auto" style={{ background: DARK }}>
        <div className="px-5 pt-6 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
            Grunderna · BRF-struktur
          </p>
          <h2 className="text-2xl font-black text-white mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Så fungerar <span style={{ color: O }}>BRF:en</span>
          </h2>
          <p className="text-white/40 text-xs mb-5">Tryck på varje nivå för att läsa mer</p>
        </div>
        <MobilAccordion aktiv={aktiv} setAktiv={setAktiv} />
      </div>

    </div>
  );
}
