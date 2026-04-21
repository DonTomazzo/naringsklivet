// src/components/CourseElements/BrfFlödesdiagramSlide.jsx
// Animerat flödesdiagram – Så fungerar bostadsrättsföreningen
// Videobakgrund, mörkt tema, autoplay-sekvens med ljud

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const O    = '#FF5421';
const DARK = '#0f1623';

// ── Autoplay-ordning ──────────────────────────────────────
const AUTOPLAY_ORDER = [
  'medlemmar',
  'valberedning',
  'stamma',
  'revisor',
  'styrelse',
  'forvaltare',
];

// ── Huvud-noder ───────────────────────────────────────────
const NODER = [
  {
    id: 'medlemmar',
    label: 'Medlemmar',
    icon: '👥',
    beskrivning: 'Alla bostadsrättsägare är medlemmar och föreningens yttersta ägare. De utövar sin makt på föreningsstämman — en röst per lägenhet, oavsett storlek.',
    ansvar: ['Betalar årsavgift', 'Röstar på stämman', 'Följer stadgar och ordningsregler'],
    audioUrl: '/audio/medlemmarna.mp3',
  },
  {
    id: 'stamma',
    label: 'Föreningsstämman',
    icon: '🗳️',
    beskrivning: 'Föreningens högsta beslutande organ. Hålls minst en gång per år på våren. Här godkänns årsredovisning, väljs styrelse och revisorer och fattas viktiga beslut.',
    ansvar: ['Väljer styrelse och revisorer', 'Godkänner årsredovisning', 'Beslutar om avgifter och stadgar'],
    audioUrl: '/audio/foreningsstamman.mp3',
    sidoId: 'valberedning',
  },
  {
    id: 'styrelse',
    label: 'Styrelsen',
    icon: '⚙️',
    beskrivning: 'Leder föreningens löpande arbete mellan stämmorna. Ansvarar juridiskt för fastigheten och ekonomin. Väljs av stämman för 1–2 år.',
    ansvar: ['Förvaltar fastighet och ekonomi', 'Fattar löpande beslut', 'Bär juridiskt ansvar'],
    audioUrl: '/audio/brf-styrelse.mp3',
    sidoId: 'revisor',
  },
  {
    id: 'forvaltare',
    label: 'Förvaltare',
    icon: '🏢',
    beskrivning: 'Sköter den dagliga driften på styrelsens uppdrag — bokföring, felanmälningar och leverantörskontakter. Styrelsen kan aldrig delegera bort sitt juridiska ansvar.',
    ansvar: ['Ekonomisk och teknisk förvaltning', 'Hanterar felanmälningar', 'Leverantörskontakter'],
    audioUrl: '/audio/forvaltaren.mp3',
  },
];

// ── Sido-noder ────────────────────────────────────────────
const SIDO_NODER = {
  valberedning: {
    id: 'valberedning',
    label: 'Valberedning',
    icon: '📋',
    beskrivning: 'Valberedningen väljs av stämman och föreslår vilka som ska väljas in i styrelsen. De ska ha god kontakt med många medlemmar och veta vilka kompetenser som behövs. En välfungerande valberedning tänker på ålder, bakgrund och kön för en balanserad styrelse.',
    ansvar: ['Föreslår kandidater till styrelsen', 'Arbetar självständigt från styrelsen', 'Tänker på mångfald och kompetens'],
    audioUrl: '/audio/k3.mp3',
  },
  revisor: {
    id: 'revisor',
    label: 'Revisorn',
    icon: '🔍',
    beskrivning: 'Revisorn väljs av föreningsstämman — inte av styrelsen. Revisorn granskar att årsredovisningen ger en rättvisande bild av ekonomin och uttalar sig om styrelsens förvaltning. Det är viktigt att revisorn inte blir för involverad i styrelsearbetet.',
    ansvar: ['Granskar årsredovisningen', 'Rapporterar till stämman — inte styrelsen', 'Oberoende granskare'],
    audioUrl: '/audio/brf-revisor.mp3',
  },
};

const ALLA_NODER = [
  ...NODER,
  ...Object.values(SIDO_NODER),
];

// ── Desktop org-chart ─────────────────────────────────────
function OrgChart({ aktiv, onKlick }) {
  return (
    <div className="w-full space-y-0">
      {NODER.map((nod, i) => {
        const isAktiv   = aktiv === nod.id;
        const sidoNod   = nod.sidoId ? SIDO_NODER[nod.sidoId] : null;
        const sidoAktiv = sidoNod ? aktiv === sidoNod.id : false;

        return (
          <div key={nod.id}>
            <div className="relative flex items-center">

              {/* Sido-nod — i sidofältet, klickbar */}
              {sidoNod && (
                <motion.button
                  onClick={() => onKlick(sidoNod.id)}
                  whileHover={{ scale: 1.06, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-full mr-3 px-3 py-2 rounded-xl border text-xs font-bold whitespace-nowrap cursor-pointer"
                  style={{
                    background: sidoAktiv ? `${O}20` : 'rgba(255,255,255,0.06)',
                    borderColor: sidoAktiv ? O : 'rgba(255,255,255,0.12)',
                    color: sidoAktiv ? O : 'rgba(255,255,255,0.45)',
                    boxShadow: sidoAktiv ? `0 0 16px ${O}30` : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="mr-1">{sidoNod.icon}</span>
                  {sidoNod.label}
                  <div style={{
                    position: 'absolute', left: '100%', top: '50%',
                    width: 12, height: 1,
                    background: sidoAktiv ? O : 'rgba(255,255,255,0.15)',
                  }} />
                  {sidoAktiv && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ background: O }}
                    />
                  )}
                </motion.button>
              )}

              {/* Huvud-nod */}
              <motion.button
                onClick={() => onKlick(nod.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-5 rounded-2xl border-2 text-left transition-all"
                style={{
                  background: isAktiv ? `${O}20` : 'rgba(255,255,255,0.06)',
                  borderColor: isAktiv ? O : 'rgba(255,255,255,0.12)',
                  boxShadow: isAktiv ? `0 0 28px ${O}30` : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{nod.icon}</span>
                  <div className="flex-1">
                    <p className="font-black text-base"
                      style={{ color: isAktiv ? O : 'rgba(255,255,255,0.85)', fontFamily: "'Nunito', sans-serif" }}>
                      {nod.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
                    style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, lineHeight: 1 }}>↓</motion.div>
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
      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Klicka på varje nivå — även revisor och valberedning
      </p>
    </div>
  );
}

// ── Mobil accordion ───────────────────────────────────────
function MobilAccordion({ aktiv, onKlick }) {
  return (
    <div className="space-y-2 px-4 pb-28">
      {ALLA_NODER.map((nod) => {
        const isAktiv = aktiv === nod.id;
        return (
          <div key={nod.id} className="rounded-2xl overflow-hidden border"
            style={{ borderColor: isAktiv ? O : 'rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => onKlick(isAktiv ? null : nod.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: isAktiv ? `${O}18` : 'rgba(255,255,255,0.04)' }}
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
  const [aktiv, setAktiv] = useState('medlemmar');
  const audioRef          = useRef(null);
  const videoRef          = useRef(null);

  const aktivNod = ALLA_NODER.find(n => n.id === aktiv);

  // Video autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Ljud + autoplay nästa nod när klart
  useEffect(() => {
    if (!aktivNod?.audioUrl) return;

    // Stoppa föregående
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(aktivNod.audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => {});

    // När klart — gå till nästa i sekvensen
    audio.onended = () => {
      const idx    = AUTOPLAY_ORDER.indexOf(aktiv);
      const nextId = AUTOPLAY_ORDER[idx + 1];
      if (nextId) setAktiv(nextId);
    };

    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, [aktiv]);

  const handleKlick = (id) => {
  if (!id) return;
  setAktiv(id);
  // Spela om videon från början vid varje klick
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }
};

  return (
    <div className="h-full overflow-hidden relative"
      style={{ paddingTop: 'var(--header-height, 60px)' }}>

      {/* Videobakgrund */}
      <video
        ref={videoRef}
        src="/video/hus2.mp4"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        onEnded={e => e.target.pause()}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.78)', zIndex: 1 }} />

      {/* ── DESKTOP ──────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-2 h-full relative" style={{ zIndex: 2 }}>

        {/* Vänster */}
        <div className="flex flex-col px-10 py-2 overflow-y-auto">
          <div className="mb-0 flex-shrink-0 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
              Grunderna · BRF-struktur
            </p>
            <h2 className="text-3xl font-black leading-tight text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Så fungerar <span style={{ color: O }}>bostadsrättsföreningen</span>
            </h2>
            <p className="text-white/30 text-xs mt-2">Spelar automatiskt — klicka för att hoppa.</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <OrgChart aktiv={aktiv} onKlick={handleKlick} />
            </div>
          </div>
        </div>

        {/* Höger */}
        <div className="h-full overflow-y-auto flex flex-col justify-center px-10 lg:px-14 py-12 pb-28">
          <AnimatePresence mode="wait">
            {aktivNod && (
              <motion.div key={aktivNod.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `${O}18`, border: `2px solid ${O}35` }}>
                    {aktivNod.icon}
                  </div>
                  <h3 className="text-3xl font-black leading-tight"
                    style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>
                    {aktivNod.label}
                  </h3>
                </div>

                <p className="text-white/75 text-base leading-relaxed mb-6">
                  {aktivNod.beskrivning}
                </p>

                <div className="rounded-2xl p-5 border-l-4"
                  style={{ borderColor: O, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
                    Ansvar & roll
                  </p>
                  <div className="space-y-3">
                    {aktivNod.ansvar.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: O }} />
                        <p className="text-sm text-white/70">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBIL ──────────────────────────────────────── */}
      <div className="lg:hidden h-full overflow-y-auto relative" style={{ zIndex: 2 }}>
        <div className="px-5 pt-6 pb-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
            Grunderna · BRF-struktur
          </p>
          <h2 className="text-4xl font-black text-white mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Så fungerar <span style={{ color: O }}>BRF:en</span>
          </h2>
          <p className="text-white/35 text-xs mb-5">Tryck på varje nivå för att läsa mer</p>
        </div>
        <MobilAccordion aktiv={aktiv} onKlick={handleKlick} />
      </div>

    </div>
  );
}