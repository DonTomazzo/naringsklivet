// src/components/CourseElements/BrfFlödesdiagramSlide.jsx
// Animerat flödesdiagram – Så fungerar bostadsrättsföreningen
// Videobakgrund, mörkt tema, autoplay-sekvens med ljud
//
// ÄNDRAT:
// - "valberedning" sido-nod borttagen
// - Ny topp-nod "bostadsrättsföreningen" som visuellt omsluter övriga noder som ett hus
// - BRF-noden spelas först i autoplay-sekvensen

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const O    = '#FF5421';
const DARK = '#0f1623';

// ── Autoplay-ordning ──────────────────────────────────────
// BRF-noden spelas först, sedan övriga
const AUTOPLAY_ORDER = [
  'brf',
  'medlemmar',
  'stamma',
  'revisor',
  'styrelse',
  'forvaltare',
];

// ── Topp-nod: bostadsrättsföreningen (husets yttre skal) ──
const BRF_NOD = {
  id: 'brf',
  label: 'Bostadsrättsföreningen',
  icon: '🏠',
  beskrivning: 'Bostadsrättsföreningen är den juridiska person som äger fastigheten. Den består av alla sina delar — medlemmarna, stämman, styrelsen, revisorn och förvaltaren — som tillsammans utgör en fungerande helhet.',
  ansvar: ['Äger fastigheten', 'Ekonomisk förening', 'Styrs demokratiskt av medlemmarna'],
  audioUrl: '/audio/bostadsrattsforeningen.mp3',
};

// ── Huvud-noder (inuti huset) ─────────────────────────────
const NODER = [
  {
    id: 'medlemmar',
    label: 'Medlemmar',
    icon: '👥',
    beskrivning: 'Alla bostadsrättsägare är medlemmar och föreningens yttersta ägare. De utövar sin makt på föreningsstämman — en röst per lägenhet, oavsett storlek.',
    ansvar: ['Betalar årsavgift', 'Röstar på stämman', 'Följer stadgar och ordningsregler'],
    audioUrl: '/audio/medlemmarna-2.mp3',
  },
  {
    id: 'stamma',
    label: 'Föreningsstämman',
    icon: '🗳️',
    beskrivning: 'Föreningens högsta beslutande organ. Hålls minst en gång per år på våren. Här godkänns årsredovisning, väljs styrelse och revisorer och fattas viktiga beslut.',
    ansvar: ['Väljer styrelse och revisorer', 'Godkänner årsredovisning', 'Beslutar om avgifter och stadgar'],
    audioUrl: '/audio/foreningsstamman-1.mp3',
  },
  {
    id: 'styrelse',
    label: 'Styrelsen',
    icon: '⚙️',
    beskrivning: 'Leder föreningens löpande arbete mellan stämmorna. Ansvarar juridiskt för fastigheten och ekonomin. Väljs av stämman för 1–2 år.',
    ansvar: ['Förvaltar fastighet och ekonomi', 'Fattar löpande beslut', 'Bär juridiskt ansvar'],
    audioUrl: '/audio/styrelsen-1.mp3',
    sidoId: 'revisor',
  },
  {
    id: 'forvaltare',
    label: 'Förvaltare',
    icon: '🏢',
    beskrivning: 'Sköter den dagliga driften på styrelsens uppdrag — bokföring, felanmälningar och leverantörskontakter. Styrelsen kan aldrig delegera bort sitt juridiska ansvar.',
    ansvar: ['Ekonomisk och teknisk förvaltning', 'Hanterar felanmälningar', 'Leverantörskontakter'],
    audioUrl: '/audio/forvaltaren-2.mp3',
  },
];

// ── Sido-noder ────────────────────────────────────────────
const SIDO_NODER = {
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
  BRF_NOD,
  ...NODER,
  ...Object.values(SIDO_NODER),
];

// ── Desktop org-chart ─────────────────────────────────────
function OrgChart({ aktiv, onKlick }) {
  const husAktiv = aktiv === 'brf';

  return (
    <div className="w-full">
      {/* Hus-wrapper med klickbar grundnod längst ner */}
      <motion.div
        className="relative rounded-3xl border-2 p-5 pb-4"
        animate={{
          borderColor: husAktiv ? O : 'rgba(255,255,255,0.18)',
          boxShadow: husAktiv ? `0 0 40px ${O}35` : `0 0 24px rgba(0,0,0,0.3)`,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Taklinje — visualiserar att det är ett hus */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -14,
            width: 0,
            height: 0,
            borderLeft: '120px solid transparent',
            borderRight: '120px solid transparent',
            borderBottom: `14px solid ${husAktiv ? O : 'rgba(255,255,255,0.18)'}`,
            transition: 'all 0.3s',
          }}
        />

        {/* Noderna inuti huset */}
        <div className="space-y-0 mb-4">
          {NODER.map((nod, i) => {
            const isAktiv   = aktiv === nod.id;
            const sidoNod   = nod.sidoId ? SIDO_NODER[nod.sidoId] : null;
            const sidoAktiv = sidoNod ? aktiv === sidoNod.id : false;

            return (
              <div key={nod.id}>
                <div className="relative flex items-center">

                  {/* Sido-nod */}
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
                    className="w-full py-3.5 px-5 rounded-2xl border-2 text-left transition-all"
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
        </div>

        {/* Grund — BRF-noden längst ner i huset */}
        <motion.button
          onClick={() => onKlick('brf')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border-t-2"
          style={{
            background: husAktiv ? `${O}22` : 'rgba(255,255,255,0.05)',
            borderColor: husAktiv ? O : 'rgba(255,255,255,0.1)',
            borderRadius: '0 0 16px 16px',
            marginLeft: -12,
            marginRight: -12,
            marginBottom: -12,
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 18,
            paddingTop: 14,
          }}
        >
          <span className="text-2xl">{BRF_NOD.icon}</span>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: husAktiv ? O : 'rgba(255,255,255,0.35)' }}>
              Grunden · Helheten
            </p>
            <p className="font-black text-base"
              style={{ color: husAktiv ? O : 'rgba(255,255,255,0.85)', fontFamily: "'Nunito', sans-serif" }}>
              {BRF_NOD.label}
            </p>
          </div>
          {husAktiv && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: O }} />
          )}
        </motion.button>
      </motion.div>

      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Klicka på grunden eller någon av nivåerna
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
        const isBrf   = nod.id === 'brf';
        return (
          <div key={nod.id} className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: isAktiv ? O : 'rgba(255,255,255,0.1)',
              // Markera BRF-noden tydligare som "omslaget"
              borderWidth: isBrf ? 2 : 1,
            }}>
            <button
              onClick={() => onKlick(isAktiv ? null : nod.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              style={{ background: isAktiv ? `${O}18` : 'rgba(255,255,255,0.04)' }}
            >
              <span className="text-xl">{nod.icon}</span>
              <div className="flex-1">
                {isBrf && (
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                    style={{ color: isAktiv ? O : 'rgba(255,255,255,0.35)' }}>
                    Helheten
                  </p>
                )}
                <span className="font-bold text-sm"
                  style={{ color: isAktiv ? O : 'rgba(255,255,255,0.8)', fontFamily: "'Nunito', sans-serif" }}>
                  {nod.label}
                </span>
              </div>
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
  // Startar på brf-noden så dess ljud spelas först
  const [aktiv, setAktiv] = useState('brf');
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

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(aktivNod.audioUrl);
    audioRef.current = audio;

    // Paus innan ljudet startar (ger tid att hinna läsa innan rösten kommer)
    const startTimer = setTimeout(() => {
      audio.play().catch(() => {});
    }, 1500);

    audio.onended = () => {
      const idx    = AUTOPLAY_ORDER.indexOf(aktiv);
      const nextId = AUTOPLAY_ORDER[idx + 1];
      // Paus innan nästa nod aktiveras
      if (nextId) {
        setTimeout(() => setAktiv(nextId), 1500);
      }
    };

    return () => {
      clearTimeout(startTimer);
      audio.pause();
      audio.onended = null;
    };
  }, [aktiv]);

  const handleKlick = (id) => {
    if (!id) return;
    setAktiv(id);
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
          <div className="flex-1 flex items-center justify-center py-4">
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

                {/* PDF-nedladdning */}
                <motion.a
                  href="/pdf/brf-struktur.pdf"
                  download
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="mt-5 w-full rounded-2xl border-2 flex items-center gap-4 px-6 py-5 cursor-pointer transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${O}25`, border: `1px solid ${O}40` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={O} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: O }}>
                      Ladda ner
                    </p>
                    <p className="text-white font-black text-lg leading-tight"
                      style={{ fontFamily: "'Nunito', sans-serif" }}>
                      BRF-struktur som PDF
                    </p>
                    <p className="text-xs text-white/45 mt-0.5">Sammanfattning av alla roller · 2 sidor</p>
                  </div>
                </motion.a>

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
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="text-4xl font-black text-white flex-1"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Så fungerar <span style={{ color: O }}>BRF:en</span>
            </h2>
            {/* PDF-nedladdning — kompakt ikonversion för mobil */}
            <motion.a
              href="/pdf/brf-struktur.pdf"
              download
              whileTap={{ scale: 0.92 }}
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border mt-1"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              aria-label="Ladda ner PDF"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={O} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </motion.a>
          </div>
          <p className="text-white/35 text-xs mb-5">Tryck på varje nivå för att läsa mer</p>
        </div>
        <MobilAccordion aktiv={aktiv} onKlick={handleKlick} />
      </div>

    </div>
  );
}