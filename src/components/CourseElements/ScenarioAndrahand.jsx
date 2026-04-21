// src/components/CourseElements/ScenarioAndrahand.jsx
// Scenario: Andrahandsuthyrning
// Split-layout: bild + pratbubbla vänster, frågor höger (ljus panel)
// Videobakgrund

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

const SARA_BILD = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80';

const STEG = [
  {
    id: 'ansökan',
    rubrik: 'Steg 1 — Ansökan',
    bubbla: 'Hej! Jag ska flytta utomlands i sex månader för jobbet. Kan jag hyra ut min lägenhet i andra hand under den tiden?',
    fraga: 'Sara kontaktar er styrelse muntligt i trapphuset och frågar om lov. Hur hanterar ni det?',
    alternativ: [
      { id: 'a', text: 'Säg ja direkt — det verkar rimligt', korrekt: false, feedback: 'Styrelsen får aldrig ge muntligt tillstånd. Andrahandsuthyrning kräver alltid en skriftlig ansökan som styrelsen formellt beslutar om på ett styrelsemöte.' },
      { id: 'b', text: 'Be Sara skicka in en skriftlig ansökan', korrekt: true, feedback: 'Rätt! Styrelsen ska alltid kräva en skriftlig ansökan med: vem som ska hyra, hur länge och skälet till uthyrningen.' },
      { id: 'c', text: 'Avslå direkt — andrahand är inte tillåtet', korrekt: false, feedback: 'Andrahandsuthyrning är tillåtet med styrelsens godkännande. Att avslå utan att pröva ansökan kan leda till att Sara vänder sig till hyresnämnden.' },
    ],
  },
  {
    id: 'bedomning',
    rubrik: 'Steg 2 — Bedömning',
    bubbla: 'Jag har nu skickat in min skriftliga ansökan. Vad händer nu? Vad tittar ni på?',
    fraga: 'Sara har skickat in ansökan. Skälet är arbete utomlands i 6 månader. Vad ska styrelsen beakta?',
    alternativ: [
      { id: 'a', text: 'Bara kontrollera att hyresgästen verkar seriös', korrekt: false, feedback: 'Inte tillräckligt. Styrelsen ska också bedöma om skälet är beaktansvärt och om uthyrningstiden är rimlig.' },
      { id: 'b', text: 'Skälet, hyresgästens lämplighet och uthyrningstidens längd', korrekt: true, feedback: 'Rätt! Styrelsen ska pröva: (1) om skälet är beaktansvärt — arbete utomlands godkänns normalt, (2) hyresgästens lämplighet och (3) om tiden är rimlig.' },
      { id: 'c', text: 'Neka — 6 månader är för länge', korrekt: false, feedback: '6 månader är en rimlig tid för andrahandsuthyrning vid arbete utomlands. Att neka utan saklig grund kan ge Sara rätt i hyresnämnden.' },
    ],
  },
  {
    id: 'beslut',
    rubrik: 'Steg 3 — Beslut',
    bubbla: 'Fick ni mitt ärende? Vad behöver ni göra nu när ni beslutat att godkänna?',
    fraga: 'Styrelsen beslutar att godkänna Saras ansökan. Vad måste ni göra nu?',
    alternativ: [
      { id: 'a', text: 'Ringa Sara och berätta att det är okej', korrekt: false, feedback: 'Beslutet måste vara skriftligt och protokollföras. En muntlig bekräftelse ger inget rättsligt skydd för vare sig föreningen eller Sara.' },
      { id: 'b', text: 'Skicka skriftligt tillstånd med villkor och protokollföra beslutet', korrekt: true, feedback: 'Rätt! Styrelsen ska: (1) skicka ett skriftligt tillståndsbesked med eventuella villkor och giltighetstid, (2) protokollföra beslutet på styrelsemötet.' },
      { id: 'c', text: 'Be Sara ordna ett kontrakt — det är hennes ansvar', korrekt: false, feedback: 'Sara ansvarar för hyresavtalet med sin hyresgäst — men styrelsen måste ändå ge ett formellt skriftligt tillstånd och protokollföra sitt beslut.' },
    ],
  },
];

const TIPS = [
  'Kräv alltid skriftlig ansökan — ge aldrig muntligt tillstånd',
  'Pröva skälet: arbete, studier, samboende = normalt beaktansvärt',
  'Ge ett skriftligt beslut med giltighetstid och villkor',
  'Protokollför beslutet på styrelsemötet',
  'Sara ansvarar själv för hyresavtalet med sin hyresgäst',
];

// ── Alternativ-knapp ──────────────────────────────────────
function AlternativKnapp({ alt, valt, visar, onVälj }) {
  const isValt = valt === alt.id;
  const visaRes = visar && isValt;

  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.id)}
      whileHover={!visar ? { x: 3 } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 12,
        background: visaRes
          ? alt.korrekt ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.10)'
          : isValt ? OL : '#fff',
        border: `1.5px solid ${visaRes
          ? alt.korrekt ? '#22c55e' : '#ef4444'
          : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 12,
        transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 0 0 3px ${O}20` : 'none',
      }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: visaRes
          ? alt.korrekt ? '#22c55e' : '#ef4444'
          : isValt ? O : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 900,
        color: isValt || visaRes ? '#fff' : '#9ca3af',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : alt.id.toUpperCase()}
      </div>
      <p style={{ fontSize: 13, color: visaRes ? (alt.korrekt ? '#15803d' : '#b91c1c') : '#1f2937', lineHeight: 1.5, flex: 1, fontFamily: "'Nunito', sans-serif" }}>
        {alt.text}
      </p>
    </motion.button>
  );
}

// ── Huvud-komponent ───────────────────────────────────────
export default function ScenarioAndrahand({ onComplete, isDone }) {
  const [stegIdx, setStegIdx]     = useState(0);
  const [fas, setFas]             = useState('quiz'); // quiz | avslut
  const [valt, setValt]           = useState(null);
  const [visar, setVisar]         = useState(false);
  const [felCount, setFelCount]   = useState(0);
  const videoRef                  = useRef(null);

  const steg = STEG[stegIdx];

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const handleVälj = (id) => {
    if (visar) return;
    const alt = steg.alternativ.find(a => a.id === id);
    setValt(id);
    setVisar(true);
    if (!alt.korrekt) setFelCount(f => f + 1);
  };

  const handleNästa = () => {
    if (stegIdx < STEG.length - 1) {
      setStegIdx(i => i + 1);
      setValt(null);
      setVisar(false);
    } else {
      setFas('avslut');
      onComplete?.('scenario-andrahand');
    }
  };

  const handleOm = () => {
    setStegIdx(0); setFas('quiz'); setValt(null); setVisar(false); setFelCount(0);
  };

  const valtAlt = valt ? steg.alternativ.find(a => a.id === valt) : null;

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', paddingTop: 'var(--header-height, 60px)' }}>

      {/* Videobakgrund */}
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.85)', zIndex: 1 }} />

      {/* ── DESKTOP split ──────────────────────────────── */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', height: '100%', position: 'relative', zIndex: 2 }}>

        {/* Vänster — Sara + pratbubbla */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 40px', gap: 24 }}>

          {/* Badge */}
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: '4px 12px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`,
              fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>Scenario</div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Andrahandsuthyrning</span>
          </div>

          {/* Titel */}
          <div style={{ alignSelf: 'flex-start' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#fff',
              fontFamily: "'Nunito', sans-serif", lineHeight: 1.15, marginBottom: 4 }}>
              Sara vill hyra ut<br /><span style={{ color: O }}>i andra hand</span>
            </h2>
          </div>

          {/* Bild + pratbubbla */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, width: '100%', maxWidth: 380 }}>
            {/* Bild */}
            <div style={{ position: 'relative' }}>
              <img src={SARA_BILD} alt="Sara"
                style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover',
                  border: `3px solid ${O}`, boxShadow: `0 0 28px ${O}40` }} />
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: '50%',
                background: '#22c55e', border: '2px solid #fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>

            {/* Pratbubbla */}
            <AnimatePresence mode="wait">
              <motion.div key={stegIdx}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                style={{ position: 'relative', maxWidth: '100%' }}>
                <div style={{ padding: '16px 20px', borderRadius: '4px 20px 20px 20px',
                  background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, margin: 0,
                    fontFamily: "'Nunito', sans-serif" }}>
                    "{steg.bubbla}"
                  </p>
                </div>
                {/* Pil */}
                <div style={{ position: 'absolute', top: 14, left: -8, width: 0, height: 0,
                  borderTop: '8px solid transparent', borderBottom: '8px solid transparent',
                  borderRight: '8px solid rgba(255,255,255,0.10)' }} />
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, paddingLeft: 4,
                  fontFamily: "'Nunito', sans-serif" }}>
                  Sara · Bostadsrättsägare, BRF Kastanjen
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start' }}>
            {STEG.map((_, i) => (
              <div key={i} style={{ width: i === stegIdx ? 24 : 8, height: 8, borderRadius: 4,
                background: i <= stegIdx ? O : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>

        {/* Höger — vit panel med frågor */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {fas === 'quiz' ? (
              <motion.div key={`steg-${stegIdx}`}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}>

                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase',
                  color: O, marginBottom: 10, fontFamily: "'Nunito', sans-serif" }}>
                  {steg.rubrik} · {stegIdx + 1}/{STEG.length}
                </p>

                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1f2937', lineHeight: 1.5,
                  fontFamily: "'Nunito', sans-serif", marginBottom: 24 }}>
                  {steg.fraga}
                </h3>

                {/* Alternativ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {steg.alternativ.map(alt => (
                    <AlternativKnapp key={alt.id} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {visar && valtAlt && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 20,
                        background: valtAlt.korrekt ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                        border: `1.5px solid ${valtAlt.korrekt ? '#22c55e50' : '#ef444450'}`,
                        display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {valtAlt.korrekt
                        ? <CheckCircle size={18} style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
                        : <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />}
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>
                        {valtAlt.feedback}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {visar && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleNästa}
                    style={{ width: '100%', padding: '14px', borderRadius: 14, cursor: 'pointer',
                      background: `linear-gradient(135deg, ${O}, ${OD})`,
                      boxShadow: `0 4px 16px ${O}35`, border: 'none',
                      color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif",
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {stegIdx < STEG.length - 1 ? <>Nästa steg <ChevronRight size={16} /></> : <>Se sammanfattning <ChevronRight size={16} /></>}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div key="avslut"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>

                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
                  <h3 style={{ fontSize: 22, fontWeight: 900, color: '#1f2937', fontFamily: "'Nunito', sans-serif", marginBottom: 6 }}>
                    Bra jobbat!
                  </h3>
                  <p style={{ fontSize: 14, color: felCount === 0 ? '#15803d' : '#6b7280', fontFamily: "'Nunito', sans-serif" }}>
                    {felCount === 0 ? 'Perfekt — inga fel!' : `${felCount} fel av ${STEG.length} steg.`}
                  </p>
                </div>

                {/* Tips */}
                <div style={{ padding: '18px 20px', borderRadius: 16,
                  background: OL, border: `1px solid ${O}25`, marginBottom: 20 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                    color: O, marginBottom: 12, fontFamily: "'Nunito', sans-serif" }}>Kom ihåg</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {TIPS.map((tip, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 6 }} />
                        <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif" }}>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={handleOm}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, cursor: 'pointer',
                    background: '#f3f4f6', border: '1.5px solid #e5e7eb',
                    color: '#6b7280', fontSize: 13, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <RotateCcw size={13} /> Gör om scenariot
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBIL ──────────────────────────────────────── */}
      <div className="lg:hidden" style={{ position: 'relative', height: '100%', overflowY: 'auto', zIndex: 2 }}>
        <div style={{ padding: '20px 16px 100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ padding: '3px 10px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`,
              fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>Scenario</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Andrahandsuthyrning</span>
          </div>

          {fas === 'quiz' && (
            <>
              {/* Pratbubbla mobil */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
                <img src={SARA_BILD} alt="Sara" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${O}`, flexShrink: 0 }} />
                <div style={{ padding: '12px 16px', borderRadius: '4px 16px 16px 16px',
                  background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>
                    "{steg.bubbla}"
                  </p>
                </div>
              </div>

              {/* Vit panel mobil */}
              <div style={{ borderRadius: 20, background: '#fff', padding: '20px 18px' }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, marginBottom: 8 }}>
                  {steg.rubrik}
                </p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, marginBottom: 18, fontFamily: "'Nunito', sans-serif" }}>
                  {steg.fraga}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 16 }}>
                  {steg.alternativ.map(alt => (
                    <AlternativKnapp key={alt.id} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
                {visar && valtAlt && (
                  <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 14,
                    background: valtAlt.korrekt ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                    border: `1px solid ${valtAlt.korrekt ? '#22c55e50' : '#ef444450'}`,
                    display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    {valtAlt.korrekt ? <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} /> : <XCircle size={16} style={{ color: '#ef4444', flexShrink: 0 }} />}
                    <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.55 }}>{valtAlt.feedback}</p>
                  </div>
                )}
                {visar && (
                  <button onClick={handleNästa}
                    style={{ width: '100%', padding: '13px', borderRadius: 12, cursor: 'pointer',
                      background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none',
                      color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {stegIdx < STEG.length - 1 ? 'Nästa steg' : 'Se sammanfattning'} <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </>
          )}

          {fas === 'avslut' && (
            <div style={{ borderRadius: 20, background: '#fff', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>🎯</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1f2937', marginBottom: 6 }}>Bra jobbat!</h3>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>{felCount === 0 ? 'Perfekt — inga fel!' : `${felCount} fel av ${STEG.length} steg.`}</p>
              <div style={{ padding: '16px', borderRadius: 12, background: OL, border: `1px solid ${O}25`, marginBottom: 16, textAlign: 'left' }}>
                {TIPS.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                    <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleOm} style={{ width: '100%', padding: '11px', borderRadius: 10, cursor: 'pointer',
                background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: 13, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <RotateCcw size={12} /> Gör om scenariot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}