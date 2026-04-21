// src/components/CourseElements/BrfFlödesdiagramSlide.jsx
// Centrerad hiss-panel med modaler

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O = '#FF5421';

const NODER = [
  {
    id: 'medlemmar', label: 'Medlemmar', floor: '4', icon: '👥', color: '#FF5421',
    beskrivning: 'Alla bostadsrättsägare är medlemmar och föreningens yttersta ägare. De utövar sin makt på föreningsstämman — en röst per lägenhet, oavsett storlek.',
    ansvar: ['Betalar årsavgift', 'Röstar på stämman', 'Följer stadgar och ordningsregler'],
    audioUrl: '/audio/medlemmarna.mp3', sidoNoder: [],
  },
  {
    id: 'stamma', label: 'Stämman', floor: '3', icon: '🗳️', color: '#818CF8',
    beskrivning: 'Föreningens högsta beslutande organ. Hålls minst en gång per år på våren. Här godkänns årsredovisning, väljs styrelse och revisorer och fattas viktiga beslut.',
    ansvar: ['Väljer styrelse och revisorer', 'Godkänner årsredovisning', 'Beslutar om avgifter och stadgar'],
    audioUrl: '/audio/foreningsstamman.mp3',
    sidoNoder: [
      { id: 'valberedning', label: 'Valberedning', icon: '📋', color: '#A78BFA',
        beskrivning: 'Valberedningen väljs av stämman och föreslår vilka som ska väljas in i styrelsen. De arbetar självständigt och tänker på mångfald och kompetens.',
        ansvar: ['Föreslår kandidater till styrelsen', 'Arbetar självständigt', 'Tänker på mångfald och kompetens'],
        audioUrl: '/audio/brf-valberedning.mp3' },
    ],
  },
  {
    id: 'styrelse', label: 'Styrelsen', floor: '2', icon: '⚙️', color: '#34D399',
    beskrivning: 'Leder föreningens löpande arbete mellan stämmorna. Ansvarar juridiskt för fastigheten och ekonomin. Väljs av stämman för 1–2 år.',
    ansvar: ['Förvaltar fastighet och ekonomi', 'Fattar löpande beslut', 'Bär juridiskt ansvar'],
    audioUrl: '/audio/brf-styrelse.mp3',
    sidoNoder: [
      { id: 'revisor', label: 'Revisorn', icon: '🔍', color: '#38BDF8',
        beskrivning: 'Revisorn väljs av föreningsstämman — inte av styrelsen. Revisorn granskar att årsredovisningen ger en rättvisande bild av ekonomin och uttalar sig om styrelsens förvaltning.',
        ansvar: ['Granskar årsredovisningen', 'Rapporterar till stämman', 'Oberoende granskare'],
        audioUrl: '/audio/brf-revisor.mp3' },
    ],
  },
  {
    id: 'forvaltare', label: 'Förvaltare', floor: '1', icon: '🏢', color: '#FBBF24',
    beskrivning: 'Sköter den dagliga driften på styrelsens uppdrag — bokföring, felanmälningar och leverantörskontakter. Styrelsen kan aldrig delegera bort sitt juridiska ansvar.',
    ansvar: ['Ekonomisk och teknisk förvaltning', 'Hanterar felanmälningar', 'Leverantörskontakter'],
    audioUrl: '/audio/forvaltaren.mp3', sidoNoder: [],
  },
];

function findNod(id) {
  for (const n of NODER) {
    if (n.id === id) return n;
    for (const s of (n.sidoNoder || [])) { if (s.id === id) return s; }
  }
  return null;
}

// ── Modal ─────────────────────────────────────────────────
function NodModal({ nod, onClose }) {
  const huvud = NODER.find(n => n.id === nod.id);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        style={{
          position: 'fixed', zIndex: 51,
          top: 'var(--header-height, 60px)', left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div style={{
          width: '100%', maxWidth: 560, maxHeight: '85vh',
          borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(160deg, #0f1623 0%, #171f32 100%)',
          border: `1px solid ${nod.color}30`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 40px ${nod.color}15`,
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Modal header */}
          <div style={{
            padding: '28px 28px 24px',
            background: `linear-gradient(135deg, ${nod.color}20, ${nod.color}08)`,
            borderBottom: `1px solid ${nod.color}20`,
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 18, flexShrink: 0,
                  background: `${nod.color}20`, border: `2px solid ${nod.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                  boxShadow: `0 0 24px ${nod.color}30`,
                }}>{nod.icon}</div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: nod.color, marginBottom: 5 }}>
                    {huvud ? `Nivå ${huvud.floor} · BRF-hierarki` : 'Extern roll'}
                  </p>
                  <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1 }}>{nod.label}</h3>
                </div>
              </div>
              <button onClick={onClose} style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
              }}><X size={18} /></button>
            </div>
          </div>

          {/* Modal body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 28px' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
              {nod.beskrivning}
            </p>
            <div style={{ borderRadius: 16, padding: 20, borderLeft: `4px solid ${nod.color}`, background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: nod.color, marginBottom: 14 }}>Ansvar & roll</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {nod.ansvar.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: nod.color, flexShrink: 0, marginTop: 7 }} />
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Huvud-knapp ───────────────────────────────────────────
function HissKnapp({ nod, isAktiv, isVisited, onClick }) {
  const [pressed, setPressed] = useState(false);
  const handleClick = () => { setPressed(true); setTimeout(() => setPressed(false), 220); onClick(nod.id); };
  return (
    <motion.button onClick={handleClick} whileTap={{ scale: 0.91 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
      <div style={{
        width: 76, height: 76, borderRadius: 15, position: 'relative',
        background: 'linear-gradient(145deg, #4c4c4c 0%, #1c1c1c 55%, #383838 100%)',
        boxShadow: pressed
          ? 'inset 5px 5px 14px rgba(0,0,0,0.97), inset -1px -1px 3px rgba(255,255,255,0.03)'
          : '5px 5px 14px rgba(0,0,0,0.85), -2px -2px 6px rgba(255,255,255,0.055), inset 0 1px 0 rgba(255,255,255,0.10)',
        border: isAktiv ? `2px solid ${nod.color}` : '2px solid rgba(255,255,255,0.07)',
        padding: 7, transition: 'box-shadow 0.12s, border-color 0.15s',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 9,
          background: isAktiv
            ? `radial-gradient(circle at 38% 32%, ${nod.color}ff, ${nod.color}99)`
            : pressed ? 'radial-gradient(circle at 38% 32%, #232323, #141414)'
            : 'radial-gradient(circle at 38% 32%, #525252, #2a2a2a)',
          boxShadow: isAktiv
            ? `0 0 28px ${nod.color}90, 0 0 8px ${nod.color}60, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.4)`
            : pressed ? 'inset 3px 3px 9px rgba(0,0,0,0.95)'
            : 'inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2,
          transition: 'all 0.12s',
        }}>
          <span style={{ fontSize: 24, lineHeight: 1, filter: isAktiv ? 'drop-shadow(0 0 8px rgba(255,255,255,0.9)) brightness(1.3)' : 'brightness(0.7)', transition: 'filter 0.15s' }}>{nod.icon}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 900, letterSpacing: 1,
            color: isAktiv ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.28)',
            textShadow: isAktiv ? `0 0 10px ${nod.color}, 0 1px 3px rgba(0,0,0,0.9)` : '0 1px 3px rgba(0,0,0,0.9)',
            transition: 'color 0.15s' }}>{nod.floor}</span>
        </div>
        {isAktiv && (
          <motion.div style={{ position: 'absolute', inset: -4, borderRadius: 18, border: `1px solid ${nod.color}55`, pointerEvents: 'none' }}
            animate={{ opacity: [0.4, 1, 0.4], boxShadow: [`0 0 10px ${nod.color}40`, `0 0 24px ${nod.color}70`, `0 0 10px ${nod.color}40`] }}
            transition={{ duration: 1.8, repeat: Infinity }} />
        )}
        {isVisited && !isAktiv && (
          <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%',
            background: nod.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 900, color: '#fff', boxShadow: `0 0 8px ${nod.color}80` }}>✓</div>
        )}
        <div style={{ position: 'absolute', top: 7, left: 7, right: 7, height: 14, borderRadius: '8px 8px 0 0',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)', pointerEvents: 'none' }} />
      </div>
      <span style={{ fontSize: 10, maxWidth: 76, color: isAktiv ? nod.color : isVisited ? `${nod.color}80` : 'rgba(255,255,255,0.28)',
        fontWeight: isAktiv ? 800 : 500, textAlign: 'center', lineHeight: 1.2,
        fontFamily: "'Nunito', sans-serif", transition: 'color 0.15s' }}>{nod.label}</span>
    </motion.button>
  );
}

// ── Sido-knapp ────────────────────────────────────────────
function SidoKnapp({ nod, isAktiv, isVisited, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.button onClick={() => { setPressed(true); setTimeout(() => setPressed(false), 180); onClick(nod.id); }}
      whileTap={{ scale: 0.91 }}
      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, cursor: 'pointer',
        background: isAktiv ? `linear-gradient(135deg, ${nod.color}28, ${nod.color}12)` : pressed ? 'rgba(0,0,0,0.5)' : 'linear-gradient(145deg, #3c3c3c, #1e1e1e)',
        border: isAktiv ? `1.5px solid ${nod.color}` : '1.5px solid rgba(255,255,255,0.07)',
        boxShadow: isAktiv ? `0 0 14px ${nod.color}40, inset 0 1px 0 rgba(255,255,255,0.1)` : pressed ? 'inset 2px 2px 7px rgba(0,0,0,0.9)' : '3px 3px 8px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
        fontSize: 11, fontWeight: 700, color: isAktiv ? nod.color : 'rgba(255,255,255,0.38)',
        whiteSpace: 'nowrap', transition: 'all 0.12s', backdropFilter: 'blur(8px)',
      }}>
      <span style={{ fontSize: 14 }}>{nod.icon}</span>
      <span style={{ fontFamily: "'Nunito', sans-serif" }}>{nod.label}</span>
      {isVisited && !isAktiv && <span style={{ fontSize: 9, color: nod.color }}>✓</span>}
    </motion.button>
  );
}

// ── Hiss-panel (centrerad) ────────────────────────────────
function HissPanel({ aktiv, visited, onKlick }) {
  const totalNoder = NODER.length + NODER.flatMap(n => n.sidoNoder || []).length;
  return (
    <div style={{
      borderRadius: 28, padding: '30px 28px 24px',
      background: 'linear-gradient(160deg, #333 0%, #181818 45%, #252525 100%)',
      boxShadow: '0 44px 88px rgba(0,0,0,0.92), inset 0 2px 0 rgba(255,255,255,0.07), inset 0 -2px 0 rgba(0,0,0,0.6)',
      border: '1px solid rgba(255,255,255,0.07)',
      position: 'relative', overflow: 'hidden',
      display: 'inline-block',
    }}>
      {/* Borstad metall-textur */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 28, opacity: 0.5,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.013) 2px, rgba(255,255,255,0.013) 4px)' }} />

      {/* Skylt */}
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ display: 'inline-block', padding: '5px 18px', borderRadius: 6,
          background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.06)',
          fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: 3,
          color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
          boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.7)' }}>BRF · HIERARKI</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 9 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #585858, #222)',
              boxShadow: '1px 1px 3px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.04)' }} />
          ))}
        </div>
      </div>

      {/* Knapp-rader — alla centrerade */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {NODER.map((nod, i) => (
          <div key={nod.id}>
            {/* Rad: sido (vänster) + huvud (mitten) + floor (höger) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>

              {/* Sido-knappar vänster */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end', minWidth: 120 }}>
                {(nod.sidoNoder || []).map(s => (
                  <SidoKnapp key={s.id} nod={s} isAktiv={aktiv === s.id} isVisited={visited.has(s.id)} onClick={onKlick} />
                ))}
              </div>

              {/* Kopplingsled */}
              {(nod.sidoNoder || []).length > 0 && (
                <div style={{ width: 12, height: 1, flexShrink: 0,
                  background: nod.sidoNoder[0] && aktiv === nod.sidoNoder[0].id ? nod.sidoNoder[0].color : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.2s' }} />
              )}
              {(nod.sidoNoder || []).length === 0 && <div style={{ width: 132, flexShrink: 0 }} />}

              {/* Huvud-knapp */}
              <HissKnapp nod={nod} isAktiv={aktiv === nod.id} isVisited={visited.has(nod.id)} onClick={onKlick} />

              {/* Floor-nummer höger */}
              <div style={{ width: 32, textAlign: 'left', flexShrink: 0,
                fontFamily: 'monospace', fontSize: 15, fontWeight: 900,
                color: aktiv === nod.id ? nod.color : 'rgba(255,255,255,0.13)',
                textShadow: aktiv === nod.id ? `0 0 10px ${nod.color}` : 'none',
                transition: 'color 0.2s' }}>{nod.floor}</div>
            </div>

            {/* Separator */}
            {i < NODER.length - 1 && (
              <div style={{ height: 1, margin: '14px auto', width: 76,
                background: `linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)` }} />
            )}
          </div>
        ))}
      </div>

      {/* Undre standard-knappar */}
      <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.055)',
        display: 'flex', justifyContent: 'center', gap: 10 }}>
        {[{ s: '▲', l: 'UPP' }, { s: '▼', l: 'NER' }, { s: '🔔', l: '' }, { s: '⏹', l: '' }].map((b, i) => (
          <div key={i} style={{ width: 42, height: 42, borderRadius: 10,
            background: 'radial-gradient(circle at 35% 35%, #424242, #222)',
            boxShadow: '2px 2px 7px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 1, fontSize: 16, color: 'rgba(255,255,255,0.16)' }}>
            {b.s}
            {b.l && <span style={{ fontSize: 5, fontFamily: 'monospace', color: 'rgba(255,255,255,0.1)', letterSpacing: 0.5 }}>{b.l}</span>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, textAlign: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.16)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
          {visited.size}/{totalNoder} UTFORSKADE
        </span>
      </div>
    </div>
  );
}

// ── Huvud-komponent ───────────────────────────────────────
export default function BrfFlödesdiagramSlide() {
  const [aktiv, setAktiv]     = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [modalNod, setModalNod] = useState(null);
  const audioRef              = useRef(null);
  const videoRef              = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const handleKlick = (id) => {
    if (!id) return;
    const nod = findNod(id);
    setVisited(prev => new Set([...prev, id]));
    setAktiv(id);
    setModalNod(nod);

    // Spela om video
    if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => {}); }

    // Ljud
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (nod?.audioUrl) { const a = new Audio(nod.audioUrl); audioRef.current = a; a.play().catch(() => {}); }
  };

  const handleCloseModal = () => {
    setModalNod(null);
    setAktiv(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  };

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', paddingTop: 'var(--header-height, 60px)' }}>
      <video ref={videoRef} src="/video/hiss.mp4" muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onEnded={e => e.target.pause()} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,22,35,0.80)', zIndex: 1 }} />

      {/* Innehåll — centrerat */}
      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '24px 20px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

          {/* Rubrik */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: O, marginBottom: 8 }}>
              Grunderna · BRF-struktur
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.15, marginBottom: 8 }}>
              Så fungerar <span style={{ color: O }}>bostadsrättsföreningen</span>
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
              Klicka på varje nivå — en ruta öppnas med förklaring och ljud
            </p>
          </div>

          {/* Hiss-panel centrerad */}
          <HissPanel aktiv={aktiv} visited={visited} onKlick={handleKlick} />

        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalNod && <NodModal nod={modalNod} onClose={handleCloseModal} />}
      </AnimatePresence>
    </div>
  );
}