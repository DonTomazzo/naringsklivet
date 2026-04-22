// src/modules/Styrelsekorkortet/ModuleAiBrfStyrelsen.tsx
// Kurs: AI för BRF-styrelsen
// 29 slides · 4 kapitel · Scenario per avsnitt

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ChevronRight, RotateCcw, XCircle } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';

import {
  SlideA, SlideB, SlideC, SlideE, SlideF, SlideH,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol,
  Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';
const DARK = '#0f1623';

// ════════════════════════════════════════════════════════
// SCENARIO-KOMPONENT
// ════════════════════════════════════════════════════════
interface Alternativ { text: string; korrekt: boolean; feedback: string; }
interface ScenarioSteg { rubrik: string; bubbla: string; fraga: string; alternativ: Alternativ[]; }
interface ScenarioProps {
  bild: string; personNamn: string; personRoll: string;
  titel: string; accentTitel: string; badge: string;
  steg: ScenarioSteg[]; tips: string[];
  onComplete?: (id: string) => void; isDone?: boolean; slideId: string;
}

function AlternativKnapp({ alt, valt, visar, onVälj }: {
  alt: Alternativ; valt: string | null; visar: boolean; onVälj: (t: string) => void;
}) {
  const isValt = valt === alt.text;
  const visaRes = visar && isValt;
  return (
    <motion.button onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { x: 3 } : {}} whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 12,
        background: visaRes ? (alt.korrekt ? `${O}12` : 'rgba(80,80,90,0.10)') : isValt ? OL : '#fff',
        border: `1.5px solid ${visaRes ? (alt.korrekt ? O : '#9ca3af') : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 0 0 3px ${O}20` : 'none',
      }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: visaRes ? (alt.korrekt ? O : '#9ca3af') : isValt ? O : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 900, color: isValt || visaRes ? '#fff' : '#9ca3af',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : null}
      </div>
      <p style={{ fontSize: 13, color: visaRes ? (alt.korrekt ? '#b84400' : '#374151') : '#1f2937', lineHeight: 1.5, flex: 1, fontFamily: "'Nunito', sans-serif" }}>
        {alt.text}
      </p>
    </motion.button>
  );
}

function Scenario({ bild, personNamn, personRoll, titel, accentTitel, badge, steg, tips, onComplete, isDone, slideId }: ScenarioProps) {
  const [stegIdx, setStegIdx]   = useState(0);
  const [fas, setFas]           = useState<'quiz'|'avslut'>('quiz');
  const [valt, setValt]         = useState<string|null>(null);
  const [visar, setVisar]       = useState(false);
  const [felCount, setFelCount] = useState(0);
  const videoRef                = useRef<HTMLVideoElement>(null);
  const aktivSteg = steg[stegIdx];
  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }, []);
  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = aktivSteg.alternativ.find(a => a.text === text)!;
    setValt(text); setVisar(true);
    if (!alt.korrekt) setFelCount(f => f + 1);
  };
  const handleNästa = () => {
    if (stegIdx < steg.length - 1) { setStegIdx(i => i + 1); setValt(null); setVisar(false); }
    else { setFas('avslut'); onComplete?.(slideId); }
  };
  const handleOm = () => { setStegIdx(0); setFas('quiz'); setValt(null); setVisar(false); setFelCount(0); };
  const valtAlt = valt ? aktivSteg.alternativ.find(a => a.text === valt) : null;

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', paddingTop: 'var(--header-height, 60px)' }}>
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.85)', zIndex: 1 }} />
      {/* DESKTOP */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', height: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 40px', gap: 20 }}>
          <div style={{ padding: '4px 12px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>{badge}</div>
          <h2 style={{ fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.15 }}>
            {titel}<br /><span style={{ color: O }}>{accentTitel}</span>
          </h2>
          <img src={bild} alt={personNamn} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${O}`, boxShadow: `0 0 24px ${O}40` }} />
          <AnimatePresence mode="wait">
            <motion.div key={stegIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ padding: '14px 18px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', maxWidth: 360 }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, fontFamily: "'Nunito', sans-serif" }}>"{aktivSteg.bubbla}"</p>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, paddingLeft: 4 }}>{personNamn} · {personRoll}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', gap: 6 }}>
            {steg.map((_, i) => (<div key={i} style={{ width: i === stegIdx ? 24 : 8, height: 8, borderRadius: 4, background: i <= stegIdx ? O : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />))}
          </div>
        </div>
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {fas === 'quiz' ? (
              <motion.div key={`steg-${stegIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' as const, color: O, marginBottom: 10, fontFamily: "'Nunito', sans-serif" }}>{aktivSteg.rubrik} · {stegIdx + 1}/{steg.length}</p>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif", marginBottom: 20 }}>{aktivSteg.fraga}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                  {aktivSteg.alternativ.map(alt => (<AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />))}
                </div>
                <AnimatePresence>
                  {visar && valtAlt && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 18,
                        background: valtAlt.korrekt ? `${O}10` : 'rgba(80,80,90,0.08)',
                        border: `1.5px solid ${valtAlt.korrekt ? O+'40' : '#9ca3af50'}`,
                        display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {valtAlt.korrekt ? <CheckCircle size={18} style={{ color: O, flexShrink: 0, marginTop: 2 }} /> : <XCircle size={18} style={{ color: '#9ca3af', flexShrink: 0, marginTop: 2 }} />}
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>{valtAlt.feedback}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {visar && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                    style={{ width: '100%', padding: '14px', borderRadius: 14, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 4px 16px ${O}35`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {stegIdx < steg.length - 1 ? <>Nästa fråga <ChevronRight size={16} /></> : <>Se sammanfattning <ChevronRight size={16} /></>}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div key="avslut" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontSize: 44, marginBottom: 10 }}>🎯</div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1f2937', fontFamily: "'Nunito', sans-serif", marginBottom: 6 }}>Bra jobbat!</h3>
                  <p style={{ fontSize: 13, color: felCount === 0 ? '#b84400' : '#6b7280' }}>{felCount === 0 ? 'Perfekt — inga fel!' : `${felCount} fel av ${steg.length} frågor.`}</p>
                </div>
                <div style={{ padding: '16px 20px', borderRadius: 16, background: OL, border: `1px solid ${O}25`, marginBottom: 18 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 10 }}>Kom ihåg</p>
                  {tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 6 }} />
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif" }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleOm} style={{ width: '100%', padding: '12px', borderRadius: 12, cursor: 'pointer', background: '#f3f4f6', border: '1.5px solid #e5e7eb', color: '#6b7280', fontSize: 13, fontWeight: 700, fontFamily: "'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <RotateCcw size={13} /> Gör om scenariot
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* MOBIL */}
      <div className="lg:hidden" style={{ position: 'relative', height: '100%', overflowY: 'auto', zIndex: 2, padding: '20px 16px 100px' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ padding: '3px 10px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, display: 'inline-block' }}>{badge}</div>
        </div>
        {fas === 'quiz' && (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <img src={bild} alt={personNamn} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${O}`, flexShrink: 0 }} />
              <div style={{ padding: '11px 14px', borderRadius: '4px 14px 14px 14px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>"{aktivSteg.bubbla}"</p>
              </div>
            </div>
            <div style={{ borderRadius: 18, background: '#fff', padding: '18px 16px' }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>{aktivSteg.rubrik}</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>{aktivSteg.fraga}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {aktivSteg.alternativ.map(alt => (<AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />))}
              </div>
              {visar && valtAlt && (
                <div style={{ padding: '11px 14px', borderRadius: 10, marginBottom: 12, background: valtAlt.korrekt ? `${O}10` : 'rgba(80,80,90,0.08)', border: `1px solid ${valtAlt.korrekt ? O+'40' : '#9ca3af50'}`, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {valtAlt.korrekt ? <CheckCircle size={15} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={15} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.55 }}>{valtAlt.feedback}</p>
                </div>
              )}
              {visar && (
                <button onClick={handleNästa} style={{ width: '100%', padding: '12px', borderRadius: 12, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  {stegIdx < steg.length - 1 ? 'Nästa fråga' : 'Se sammanfattning'} <ChevronRight size={14} />
                </button>
              )}
            </div>
          </>
        )}
        {fas === 'avslut' && (
          <div style={{ borderRadius: 18, background: '#fff', padding: '22px 18px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#1f2937', marginBottom: 6 }}>Bra jobbat!</h3>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 18 }}>{felCount === 0 ? 'Perfekt!' : `${felCount} fel av ${steg.length}.`}</p>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: OL, border: `1px solid ${O}25`, marginBottom: 14, textAlign: 'left' }}>
              {tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{tip}</p>
                </div>
              ))}
            </div>
            <button onClick={handleOm} style={{ width: '100%', padding: '10px', borderRadius: 10, cursor: 'pointer', background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <RotateCcw size={12} /> Gör om
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// ÖVERSIKT — HISSKNAPP-NAVIGATION
// ════════════════════════════════════════════════════════
const KAPITEL = [
  { id: 'verktyg',    label: 'Verktyg & grunder',      emoji: '🤖', desc: 'ChatGPT, Claude, Copilot & GDPR',         slideIdx: 2,  color: '#6366F1' },
  { id: 'protokoll',  label: 'Protokoll & dokument',   emoji: '📝', desc: 'Protokoll, kallelser & stämmomaterial',   slideIdx: 10, color: '#10B981' },
  { id: 'kommunik',   label: 'Kommunikation',          emoji: '✉️', desc: 'Brev, störningsärenden & Copilot',        slideIdx: 16, color: '#F59E0B' },
  { id: 'beslut',     label: 'Beslut & upphandling',   emoji: '💼', desc: 'Offerter, beslutsunderlag & juridik',     slideIdx: 22, color: '#EC4899' },
];

function Översikt({ onNavigate }: { onNavigate: (i: number) => void }) {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }, []);

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', paddingTop: 'var(--header-height, 60px)' }}>
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onEnded={e => (e.target as HTMLVideoElement).pause()} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.82)', zIndex: 1 }} />

      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', height: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 40px', gap: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>AI för BRF-styrelsen · Kursöversikt</p>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.15 }}>
              Välj ett <span style={{ color: O }}>kapitel</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 380 }}>
            {KAPITEL.map((kap) => {
              const isAktiv = aktiv === kap.id;
              return (
                <motion.button key={kap.id}
                  onClick={() => { setAktiv(kap.id); setTimeout(() => onNavigate(kap.slideIdx), 200); }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95, y: 1 }}
                  style={{ padding: '20px 16px', borderRadius: 18, cursor: 'pointer', border: 'none',
                    background: isAktiv ? `${kap.color}30` : 'rgba(255,255,255,0.07)',
                    boxShadow: isAktiv ? `0 0 28px ${kap.color}40, inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    outline: isAktiv ? `2px solid ${kap.color}` : '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 28 }}>{kap.emoji}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, color: isAktiv ? kap.color : 'rgba(255,255,255,0.85)', fontFamily: "'Nunito', sans-serif", textAlign: 'center' }}>{kap.label}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4, textAlign: 'center' }}>{kap.desc}</p>
                </motion.button>
              );
            })}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate(2)}
            style={{ marginTop: 8, padding: '14px 28px', borderRadius: 14, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>
            Starta från början →
          </motion.button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {aktiv ? (
              <motion.div key={aktiv} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                {(() => { const kap = KAPITEL.find(k => k.id === aktiv)!; return (
                  <>
                    <div style={{ fontSize: 52, marginBottom: 16 }}>{kap.emoji}</div>
                    <h3 style={{ fontSize: 28, fontWeight: 900, color: kap.color, fontFamily: "'Nunito', sans-serif", marginBottom: 12 }}>{kap.label}</h3>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{kap.desc}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>Navigerar dit om ett ögonblick...</p>
                  </>
                ); })()}
              </motion.div>
            ) : (
              <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", marginBottom: 16 }}>
                  AI för er styrelse — <span style={{ color: O }}>från dag ett</span>
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
                  Inga tekniska förkunskaper krävs. Varje avsnitt följs av ett scenario från verkligheten — för att ni ska kunna tillämpa kunskapen direkt.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {KAPITEL.map(kap => (
                    <div key={kap.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 20 }}>{kap.emoji}</span>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{kap.label}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{kap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* MOBIL */}
      <div className="lg:hidden" style={{ position: 'relative', height: '100%', overflowY: 'auto', zIndex: 2, padding: '24px 16px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>Kursöversikt</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif" }}>Välj ett <span style={{ color: O }}>kapitel</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {KAPITEL.map(kap => (
            <motion.button key={kap.id} whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(kap.slideIdx)}
              style={{ padding: '16px 12px', borderRadius: 16, cursor: 'pointer', border: `1px solid ${kap.color}40`, background: `${kap.color}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 24 }}>{kap.emoji}</span>
              <p style={{ fontSize: 11, fontWeight: 800, color: kap.color, fontFamily: "'Nunito', sans-serif", textAlign: 'center' }}>{kap.label}</p>
            </motion.button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => onNavigate(2)}
          style={{ width: '100%', padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800 }}>
          Starta från början →
        </motion.button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// KURSDATA & BILDER
// ════════════════════════════════════════════════════════
export const courseData = {
  learningPoints: [
    'Förstå vad AI är och vad det faktiskt kan göra för er styrelse',
    'Välja rätt verktyg — ChatGPT, Claude eller Copilot',
    'Använda prompt-formeln för att få svar som fungerar',
    'Skriva protokoll på 10 minuter istället för en timme',
    'Kommunicera professionellt med boende via AI',
    'Använda Copilot i Word, Outlook och Teams',
    'Ta fram bättre beslutsunderlag och jämföra offerter',
    'Veta vad ni ALDRIG ska skriva in — GDPR-grundregler',
  ],
  forWho: ['BRF-styrelser', 'Ordföranden och sekreterare', 'Kassörer och ledamöter', 'Alla utan teknisk bakgrund'],
  faq: [
    { question: 'Behöver vi förkunskaper i AI?', answer: 'Nej. Kursen börjar från noll och kräver ingen teknisk bakgrund.' },
    { question: 'Vilket verktyg ska vi använda?', answer: 'Vi rekommenderar Claude för känsliga BRF-dokument och ChatGPT för allmänna uppgifter. Copilot passar om ni redan kör Microsoft 365.' },
    { question: 'Är det GDPR-säkert?', answer: 'Vi går igenom exakt vad ni får och inte får skriva in. Grundregeln: aldrig personnummer, bankuppgifter eller känsliga personuppgifter utan att ha kontrollerat verktygets integritetspolicy.' },
    { question: 'Kan hela styrelsen delta?', answer: 'Ja — och det rekommenderas. Kurspriset gäller per styrelse.' },
  ],
};

const IMGS = {
  intro:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&q=80',
  verktyg:     'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1280&q=80',
  gdpr:        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1280&q=80',
  prompt:      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1280&q=80',
  protokoll:   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80',
  kallelse:    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1280&q=80',
  brev:        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1280&q=80',
  copilot:     'https://images.unsplash.com/photo-1488229297570-58520851e868?w=1280&q=80',
  offert:      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&q=80',
  juridik:     'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
  avslut:      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&q=80',
};

const P = {
  anna:   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  erik:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  maria:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  lars:   'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
  karin:  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
  johan:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  sara:   'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  peter:  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
};

// ════════════════════════════════════════════════════════
// QUIZ PER KAPITEL
// ════════════════════════════════════════════════════════
const quizVerktyg = [
  { id: 'v1', question_text: 'Vilket verktyg rekommenderas för känsliga BRF-dokument?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['ChatGPT', 'Claude', 'Google Bard', 'Siri'] }, correct_answer: 'Claude', explanation: 'Claude har bättre standardinställningar för integritet och rekommenderas för känsliga dokument som protokoll och personärenden.', points: 100 },
  { id: 'v2', question_text: 'Vad är en "hallucination" inom AI?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['När AI:n är långsam', 'När AI:n presenterar felaktig information med stor säkerhet', 'När AI:n svarar på fel språk', 'En funktion i Copilot'] }, correct_answer: 'När AI:n presenterar felaktig information med stor säkerhet', explanation: 'AI kan ibland hitta på saker som låter trovärdiga. Kontrollera alltid juridik, datum och namn.', points: 100 },
  { id: 'v3', question_text: 'Vad är GDPR-grundregeln för AI och personuppgifter?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Inga personuppgifter får användas', 'Personnummer och känsliga uppgifter ska inte matas in utan att kontrollera integritetspolicyn', 'Samtycke krävs från alla medlemmar', 'AI är alltid GDPR-säkert'] }, correct_answer: 'Personnummer och känsliga uppgifter ska inte matas in utan att kontrollera integritetspolicyn', explanation: 'Lägg aldrig in personnummer, bankuppgifter eller känsliga personuppgifter utan att ha stängt av träningsdelning.', points: 100 },
];

const quizProtokoll = [
  { id: 'p1', question_text: 'Vad är prompt-formelns fyra delar?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Titel, paragraf, bilaga och signatur', 'Roll, uppgift, kontext och format', 'Fråga, svar, kontroll och arkivering', 'Datum, plats, deltagare och beslut'] }, correct_answer: 'Roll, uppgift, kontext och format', explanation: 'Roll + uppgift + kontext + format = konsekvent bättre svar. Mer kontext ger alltid bättre resultat.', points: 100 },
  { id: 'p2', question_text: 'Vad ska alltid göras med ett AI-genererat protokollutkast?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Publiceras direkt på anslagstavlan', 'Granskas — kontrollera beslut, datum och namn', 'Arkiveras utan granskning', 'Skickas till Bolagsverket'] }, correct_answer: 'Granskas — kontrollera beslut, datum och namn', explanation: 'AI levererar råmaterialet — sekreteraren ansvarar. Kontrollera alltid att beslut är korrekt formulerade.', points: 100 },
  { id: 'p3', question_text: 'Hur mycket tid sparar man typiskt på protokollskrivning med AI?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['5 minuter per möte', 'Ingen tidsvinst', '45–70 minuter per möte', 'Beror på om man betalar för Plus-versionen'] }, correct_answer: '45–70 minuter per möte', explanation: 'Manuell protokollskrivning tar 60–90 min. Med AI: 10–15 min. Skillnaden är 45–70 minuter per möte.', points: 100 },
];

const quizKommunikation = [
  { id: 'k1', question_text: 'Vad ska man alltid tala om för AI när man skriver ett brev?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Ingenting — AI vet hur brev ska skrivas', 'Ton, mottagare och syfte', 'Bara ämnet', 'Hur länge man jobbat i styrelsen'] }, correct_answer: 'Ton, mottagare och syfte', explanation: 'Tala alltid om önskad ton (formellt men vänligt), vem mottagaren är och vad brevet ska uppnå. Det ger mycket bättre resultat.', points: 100 },
  { id: 'k2', question_text: 'Vad är Copilot i Microsoft 365?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Ett separat program man laddar ner', 'AI integrerat direkt i Word, Outlook och Teams', 'En e-postklient', 'Microsofts version av Google'] }, correct_answer: 'AI integrerat direkt i Word, Outlook och Teams', explanation: 'Copilot är Microsofts AI integrerat i hela Office-paketet. Skriv protokoll i Word, sammanfatta möten i Teams, hantera mejl i Outlook.', points: 100 },
  { id: 'k3', question_text: 'Vilken ton rekommenderas för ett störningsbrev?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Anklagande och bestämd', 'Formell men vänlig', 'Informell och kort', 'Juridisk och teknisk'] }, correct_answer: 'Formell men vänlig', explanation: 'Formellt men vänligt bygger förtroende och minskar risken för konflikter. Be AI specifikt om denna ton.', points: 100 },
];

const quizBeslut = [
  { id: 'b1', question_text: 'Vad är AI:s roll vid juridiska frågor i en BRF?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['AI kan ersätta juristen helt', 'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad rådgivning', 'AI är alltid juridiskt korrekt', 'AI-svar har rättskraft'] }, correct_answer: 'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad rådgivning', explanation: 'AI har rätt ungefär 90% av tiden — men den 10% kan kosta er. Anlita alltid jurist för bindande beslut.', points: 100 },
  { id: 'b2', question_text: 'Hur kan AI bäst hjälpa vid offertjämförelse?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Förhandla direkt med leverantören', 'Strukturera pro/cons och riskbedömning per alternativ', 'Välja det billigaste alternativet automatiskt', 'Skicka avtalet till Bolagsverket'] }, correct_answer: 'Strukturera pro/cons och riskbedömning per alternativ', explanation: 'AI är utmärkt på att strukturera jämförelser. Mata in offerterna och be om en analys med pro/cons och långsiktig bedömning.', points: 100 },
  { id: 'b3', question_text: 'Vad bör styrelsen alltid göra EFTER att ha fått ett AI-svar om ett viktigt beslut?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Publicera svaret direkt', 'Fatta beslutet baserat enbart på AI-svaret', 'Konsultera förvaltare, revisor eller jurist', 'Skicka till IMY för granskning'] }, correct_answer: 'Konsultera förvaltare, revisor eller jurist', explanation: 'AI är ett bollplank — inte sista ordet. Beslut med stor ekonomisk eller juridisk påverkan kräver alltid professionell rådgivning.', points: 100 },
];

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
const ModuleAiBrfStyrelsen: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Ledamot', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) => setCompletedLessons(prev => new Set([...prev, id]));

  const allDone = ['sc-verktyg','sc-prompt','sc-gdpr','sc-protokoll','sc-kallelse','sc-storning','sc-copilot','sc-offert','sc-juridik'].every(id => completedLessons.has(id));

  const KapitelIntro = ({ emoji, rubrik, desc, bild, nr }: { emoji: string; rubrik: string; desc: string; bild: string; nr: number }) => (
    <div className="h-full flex overflow-hidden" style={{ background: '#0f1623' }}>
      <div className="hidden lg:block w-1/2 flex-shrink-0 relative">
        <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #0f1623)' }} />
      </div>
      <div className="flex-1 flex items-center overflow-y-auto px-8 sm:px-14 py-10">
        <div>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{emoji}</div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 10 }}>Kapitel {nr} av 4</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, marginBottom: 16 }}>{rubrik}</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>{desc}</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            style={{ padding: '14px 28px', borderRadius: 14, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
            Starta kapitlet →
          </motion.button>
        </div>
      </div>
    </div>
  );

  const QuizSlide = ({ quizId, bild, badge, rubrik, questions }: { quizId: string; bild: string; badge: string; rubrik: string; questions: any[] }) => (
    <SlideF bild={bild} badge={badge}>
      <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{rubrik}</h2>
      <p className="text-gray-500 text-sm mb-6">{questions.length} frågor — testa vad du lärt dig</p>
      <AnimatePresence>
        {completedLessons.has(quizId) && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-3 border mb-5 flex items-center gap-2"
            style={{ background: `${O}10`, borderColor: `${O}25` }}>
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
            <p className="text-sm font-semibold text-gray-800">Avklarat! Gå vidare.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-xl">
        <InlineQuiz questions={questions} onComplete={() => handleComplete(quizId)} />
      </div>
    </SlideF>
  );

  const slides = [

    // ── 0: Intro ─────────────────────────────────────────
    {
      id: 'intro', title: 'Välkommen',
      component: (
        <div className="h-full flex overflow-hidden bg-white">
          <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto">
            <div className="w-full px-8 sm:px-12 py-10">
              <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
                <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white" style={{ background: O }}>
                Styrelsekörkortet · AI för BRF-styrelsen · 60–90 min
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
                AI för <span style={{ color: O }}>BRF-styrelsen</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Inga tekniska förkunskaper krävs. Den här kursen ger er styrelse superkrafter — protokoll på 10 minuter, professionella brev och bättre beslut. Från dag ett.
              </p>
              <div className="space-y-2 mb-8">
                {['ChatGPT, Claude och Copilot — vilket passar er?', 'Prompt-formeln som ger bra svar varje gång', 'Protokoll, kallelser och stämmomaterial med AI', 'Brev till boende, störningsärenden och Copilot i Teams', 'Beslutsunderlag, offerter och juridik som bollplank', '8 verklighetsnära scenarier att öva på'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${O}20` }}>
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
                    </div>
                    <p className="text-gray-700 text-sm">{p}</p>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex(1)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
                Starta kursen →
              </motion.button>
            </div>
          </div>
        </div>
      ),
    },

    // ── 1: Översikt ───────────────────────────────────────
    { id: 'oversikt', title: '🗺️ Kursöversikt', component: <Översikt onNavigate={setCurrentIndex} /> },

    // ════════════════════════════════════════════════════
    // KAPITEL 1: VERKTYG & GRUNDER
    // ════════════════════════════════════════════════════

    { id: 'kap-verktyg', title: '🤖 Kapitel 1: Verktyg & grunder',
      component: <KapitelIntro emoji="🤖" nr={1} rubrik="Verktyg & grunder"
        desc="ChatGPT, Claude och Copilot — vad är vad, vad kostar det och vad är GDPR-säkert för er BRF?"
        bild={IMGS.verktyg} /> },

    // ── 3: Verktyg jämförelse ────────────────────────────
    {
      id: 'verktyg', title: '🤖 ChatGPT · Claude · Copilot',
      component: (
        <SlideA bild={IMGS.verktyg} badge="Kapitel 1 · Verktyg & grunder"
          title={"Tre verktyg — <span style='color:#FF5421'>vilket passar er?</span>"}>
          <Ingress>
            ChatGPT, Claude och Copilot är de tre verktygen ni kommer stöta på mest. Alla tre är bra — men de passar olika situationer. Här är skillnaderna som faktiskt spelar roll för en BRF-styrelse.
          </Ingress>
          <div className="space-y-3 mb-5">
            {[
              { namn: 'ChatGPT', org: 'OpenAI', emoji: '💬', gratis: true, pris: '~200 kr/mån', styrka: 'Bäst känd, stor community, bra för allmänna uppgifter och brainstorming.', gdpr: 'Stäng av chatthistorik-träning i inställningarna under Privacy.', betyg: 4, rec: '' },
              { namn: 'Claude', org: 'Anthropic', emoji: '🤖', gratis: true, pris: '~200 kr/mån', styrka: 'Utmärkt på långa dokument och nyanserade svar. Bäst för protokoll och juridisk text.', gdpr: 'Bättre standardinställningar för integritet. Rekommenderas för känsliga dokument.', betyg: 5, rec: 'Rekommenderas' },
              { namn: 'Copilot', org: 'Microsoft', emoji: '⚡', gratis: true, pris: 'Ingår i M365', styrka: 'Integrerat i Word, Outlook och Teams. Bäst om ni redan kör Office 365.', gdpr: 'EU-datalagring i M365 Business-planer. Kontrollera er licens.', betyg: 4, rec: 'Om ni kör Office' },
            ].map((v, i) => (
              <div key={i} className="rounded-2xl p-4 border relative" style={{ background: v.rec ? OL : '#F8F7F4', borderColor: v.rec ? `${O}40` : '#e5e5e3' }}>
                {v.rec && <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: O }}>{v.rec}</div>}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{v.emoji}</span>
                  <div>
                    <p className="font-black text-gray-900">{v.namn} <span className="text-xs font-normal text-gray-400">· {v.org}</span></p>
                    <p className="text-xs text-gray-500">Gratis + betald ({v.pris})</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, j) => <div key={j} className="w-2 h-2 rounded-full" style={{ background: j < v.betyg ? O : '#e5e5e3' }} />)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{v.styrka}</p>
                <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <p className="text-xs" style={{ color: '#92400e' }}><span className="font-bold">GDPR: </span>{v.gdpr}</p>
                </div>
              </div>
            ))}
          </div>
          <InfoBox title="Vår rekommendation">
            Börja med Claude för känsliga BRF-dokument. Använd ChatGPT för brainstorming och allmänna frågor. Kör Copilot om hela styrelsen redan har Microsoft 365.
          </InfoBox>
        </SlideA>
      ),
    },

    // ── 4: Scenario verktyg ───────────────────────────────
    {
      id: 'sc-verktyg', title: '📋 Scenario: Välja verktyg',
      component: (
        <Scenario slideId="sc-verktyg" bild={P.anna} personNamn="Anna" personRoll="Ordförande, BRF Solgläntan"
          titel="Anna ska välja" accentTitel="rätt AI-verktyg" badge="Scenario · Verktyg"
          steg={[
            { rubrik: 'Fråga 1 — GDPR', bubbla: 'Vi ska börja använda AI för att skriva protokoll. Men vår sekreterare är orolig för GDPR — vad ska vi tänka på?',
              fraga: 'Vilken GDPR-regel är viktigast att följa när ni använder AI för protokoll?',
              alternativ: [
                { text: 'Inget — AI-verktyg är automatiskt GDPR-säkra', korrekt: false, feedback: 'Fel. Inget AI-verktyg är automatiskt GDPR-säkert. Ni måste kontrollera inställningarna och integritetspolicyn för varje verktyg.' },
                { text: 'Mata aldrig in personnummer, bankuppgifter eller känsliga personuppgifter utan att ha kontrollerat policyn', korrekt: true, feedback: 'Rätt. Det är grundregeln. Använd AI för struktur och formuleringar — inte som databas för känslig information.' },
                { text: 'Bara använda svenska AI-verktyg', korrekt: false, feedback: 'Fel. Det finns inga GDPR-krav på att använda svenska verktyg. Det handlar om hur ni hanterar data, inte var leverantören sitter.' },
                { text: 'Be alla boende om samtycke innan ni använder AI', korrekt: false, feedback: 'Fel. Samtycke krävs inte för att styrelsen internt använder AI för sitt arbete — men grundregeln om känsliga uppgifter gäller alltid.' },
              ] },
            { rubrik: 'Fråga 2 — Verktygsval', bubbla: 'Vi kör redan Microsoft 365 med Teams och Outlook. Vilket verktyg passar oss bäst?',
              fraga: 'Vilket AI-verktyg är bäst om ni redan använder Microsoft 365?',
              alternativ: [
                { text: 'ChatGPT — det är mest känt', korrekt: false, feedback: 'ChatGPT är utmärkt men integreras inte med er befintliga Microsoft-miljö. Det kräver ett separat konto och kopiering av text.' },
                { text: 'Claude — det är säkrast', korrekt: false, feedback: 'Claude är utmärkt för känsliga dokument men integreras inte heller med Microsoft 365. Det kräver ett separat flöde.' },
                { text: 'Microsoft Copilot — integrerat direkt i era befintliga verktyg', korrekt: true, feedback: 'Rätt! Copilot är integrerat direkt i Word, Outlook och Teams. Er styrelse kan skriva protokoll i Word med Copilot utan att byta verktyg.' },
                { text: 'Google Gemini — bättre integration', korrekt: false, feedback: 'Fel. Google Gemini integreras med Google Workspace, inte Microsoft 365.' },
              ] },
          ]}
          tips={['GDPR-grundregeln: aldrig känsliga personuppgifter utan att kontrollera policyn', 'Claude för känsliga dokument, ChatGPT för allmänt, Copilot om ni kör Microsoft 365', 'Stäng av träningsdelning i ChatGPT under Privacy settings', 'Börja med gratisversionen — den räcker för de flesta styrelseuppgifter']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-verktyg')} />
      ),
    },

    // ── 5: Prompt-formeln ─────────────────────────────────
    {
      id: 'prompt', title: '💬 Prompt-formeln',
      component: (
        <SlideH bild={IMGS.prompt} bildBg="#1a1a2e"
          badge="Kapitel 1 · Verktyg & grunder"
          title={"Prompt-formeln — <span style='color:#FF5421'>bra in, bra ut</span>"}
          ingress="Det viktigaste du lär dig i hela kursen. Hur du ställer frågor till AI avgör helt om svaret är bra eller dåligt. Fyra delar — alltid."
          punkter={[
            '<strong>Roll</strong> — "Du är sekreterare i BRF Solgläntan med 40 lägenheter." Ge AI ett sammanhang. Det gör svaret specifikt istället för generellt.',
            '<strong>Uppgift</strong> — "Skriv en formell protokollsparagraf om beslut att anlita Janssons VVS." Var konkret om vad du vill ha.',
            '<strong>Kontext</strong> — "Beloppet är 38 500 kr exkl. moms. Beslutet togs enhälligt. Ansvarig är kassören." Mer information = bättre svar.',
            '<strong>Format</strong> — "Svara med en §-numrerad paragraf med beslutsformulering, ansvarig och uppföljningsdatum." Tala om hur du vill ha svaret.',
          ]}
        >
          <div className="rounded-2xl p-4 border" style={{ background: OL, borderColor: `${O}30` }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>❌ Dålig prompt</p>
            <p className="text-sm text-gray-600 italic mb-4">"Skriv ett protokoll."</p>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>✅ Bra prompt</p>
            <p className="text-sm text-gray-700 italic">"Du är sekreterare i BRF Solgläntan. Skriv en formell protokollsparagraf om att anlita Janssons VVS för rörreparation till 38 500 kr exkl. moms. Inkludera beslutsformulering, ansvarig och uppföljningsdatum."</p>
          </div>
        </SlideH>
      ),
    },

    // ── 6: Scenario prompt ────────────────────────────────
    {
      id: 'sc-prompt', title: '📋 Scenario: Bra vs dålig prompt',
      component: (
        <Scenario slideId="sc-prompt" bild={P.erik} personNamn="Erik" personRoll="Sekreterare, BRF Björken"
          titel="Erik ska skriva" accentTitel="en bra prompt" badge="Scenario · Prompting"
          steg={[
            { rubrik: 'Fråga 1 — Vilken prompt är bättre?', bubbla: 'Jag ska be AI skriva ett störningsbrev. Vilken av de här prompterna ger bäst svar?',
              fraga: 'Vilken prompt ger det bästa störningsbrevet?',
              alternativ: [
                { text: '"Skriv ett brev om störningar."', korrekt: false, feedback: 'För vag. AI vet inte vem som skriver, till vem, om vilken störning, i vilken ton eller i vilket format. Resultatet blir generellt och oanvändbart.' },
                { text: '"Du är sekreterare i BRF Björken. Skriv ett formellt men vänligt brev till innehavaren av lgh 304 angående högt musik efter kl 22:00 lördag natt. Referera till ordningsreglerna och be om svar inom 14 dagar."', korrekt: true, feedback: 'Rätt! Roll (sekreterare i BRF Björken) + uppgift (störningsbrev) + kontext (lgh 304, musik, tid) + format (formellt men vänligt, svar inom 14 dagar). Perfekt prompt.' },
                { text: '"Hjälp mig med ett störningsbrev till granne som låter mycket."', korrekt: false, feedback: 'Bättre än den första men saknar fortfarande roll, specifik kontext och önskat format. AI:n vet inte att det gäller en BRF eller vilken ton som önskas.' },
                { text: '"Write a noise complaint letter to neighbor."', korrekt: false, feedback: 'Fel språk och för vag. AI svarar på engelska och utan BRF-kontext. Skriv alltid på svenska för svenska BRF-brev.' },
              ] },
            { rubrik: 'Fråga 2 — Vad saknas?', bubbla: 'Jag skriver: "Skriv en dagordning för styrelsemöte." AI svarar med en helt generell dagordning. Vad saknas i min prompt?',
              fraga: 'Vad behöver du lägga till för att få en relevant dagordning?',
              alternativ: [
                { text: 'Ingenting — AI borde förstå', korrekt: false, feedback: 'Fel. AI:n har ingen information om er BRF, vilket möte det gäller eller vad som ska avhandlas. Resultatet blir alltid generellt utan kontext.' },
                { text: 'Kontext: föreningens namn, datum och vilka ärenden som ska behandlas', korrekt: true, feedback: 'Rätt! Med kontext ("BRF Solgläntan, möte 15 april, ärenden: årsavstämning, val av revisor, underhållsplan") får ni en dagordning som faktiskt passar ert möte.' },
                { text: 'Be AI skriva på engelska istället', korrekt: false, feedback: 'Fel. Språket är inte problemet — bristen på kontext är problemet.' },
                { text: 'Fråga AI om lov att använda den för BRF-ändamål', korrekt: false, feedback: 'Fel. AI behöver inget tillstånd — det behöver information om vad du faktiskt vill ha.' },
              ] },
          ]}
          tips={['Roll + uppgift + kontext + format = bra prompt varje gång', 'Skriv alltid på svenska för svenska dokument', 'Mer kontext ger alltid bättre svar — ta 30 sekunder extra', 'Om svaret är dåligt: berätta det och be AI försöka igen med mer info']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-prompt')} />
      ),
    },

    // ── 7: GDPR ───────────────────────────────────────────
    {
      id: 'gdpr', title: '🔒 GDPR & AI — grundregler',
      component: (
        <SlideE bild={IMGS.gdpr} badge="Kapitel 1 · Verktyg & grunder"
          title="GDPR & AI — <span style='color:#FF5421'>vad ni aldrig ska skriva in</span>"
          punkter={[
            '<strong>Aldrig personnummer</strong> — mata aldrig in personnummer i något AI-verktyg utan att ha kontrollerat att träningsdelning är avstängt.',
            '<strong>Aldrig bankuppgifter</strong> — kontonummer, bankkortsnummer och avgiftshistorik med koppling till person hör inte hemma i AI-verktyg.',
            '<strong>Aldrig känsliga personuppgifter</strong> — hälsa, religion, sexuell läggning eller information om störningsärenden med fullständiga personuppgifter.',
            '<strong>Stäng av träningsdelning</strong> — i ChatGPT: Settings → Privacy → Improve the model for everyone → Av. I Claude: ingår inte i träning som standard.',
            '<strong>Anonymisera om möjligt</strong> — skriv "innehavaren av lgh 304" istället för "Johan Svensson, personnummer...". AI behöver inte veta namnet.',
            '<strong>PUB-avtal kan krävas</strong> — om er organisation systematiskt behandlar personuppgifter via ett AI-verktyg kan ett personuppgiftsbiträdesavtal krävas.',
          ]}
          fotnot="AI är ett skrivverktyg — inte ett register. Använd det för formuleringar och struktur. Personuppgifterna hanteras i era egna system."
          fotnotColor={O}
        />
      ),
    },

    // ── 8: Scenario GDPR ──────────────────────────────────
    {
      id: 'sc-gdpr', title: '📋 Scenario: GDPR-misstag',
      component: (
        <Scenario slideId="sc-gdpr" bild={P.maria} personNamn="Maria" personRoll="Kassör, BRF Linden"
          titel="Maria gör ett" accentTitel="GDPR-misstag" badge="Scenario · GDPR"
          steg={[
            { rubrik: 'Fråga 1 — Vad är fel?', bubbla: 'Jag klistrade in hela vår lägenhetsförteckning i ChatGPT för att be AI sammanfatta vilka som har obetalda avgifter. Det var smidigt! Är det OK?',
              fraga: 'Vad är problemet med det Maria gjorde?',
              alternativ: [
                { text: 'Ingenting — ChatGPT är säkert att använda för detta', korrekt: false, feedback: 'Fel. Lägenhetsförteckningen innehåller personnummer och personuppgifter. Det är en potentiell GDPR-överträdelse att mata in dessa i ett AI-verktyg utan att ha kontrollerat inställningarna.' },
                { text: 'Hon borde ha använt Claude istället', korrekt: false, feedback: 'Samma problem. Grundfrågan är inte vilket verktyg — det är att känsliga personuppgifter matades in utan att kontrollera integritetspolicyn och stänga av träningsdelning.' },
                { text: 'Lägenhetsförteckningen innehåller personnummer — det ska aldrig matas in utan att ha stängt av träningsdelning', korrekt: true, feedback: 'Rätt. Personnummer är känsliga personuppgifter. Maria borde ha anonymiserat listan (ta bort personnummer och namn) eller kontrollerat att träningsdelning är avstängt.' },
                { text: 'Hon borde ha bett stämman om godkännande', korrekt: false, feedback: 'Fel. Det är inte en stämmofråga — det är en GDPR-fråga som styrelsen ansvarar för direkt.' },
              ] },
            { rubrik: 'Fråga 2 — Rätt tillvägagångssätt', bubbla: 'Hur borde jag ha gjort istället för att hitta obetalta avgifter med AI?',
              fraga: 'Vad är rätt sätt att använda AI för ekonomiska ärenden med personuppgifter?',
              alternativ: [
                { text: 'Mata in allt men bara använda gratisversionen', korrekt: false, feedback: 'Fel. Gratisversionen har ofta sämre integritetsskydd än betalversionen. Gratis vs betald är inte relevant för GDPR-frågan.' },
                { text: 'Anonymisera datan — ta bort namn och personnummer, använd bara lägenhetsnummer och belopp', korrekt: true, feedback: 'Rätt! "Lgh 201: 2 månader obetalda avgifter, totalt 8 400 kr." AI behöver inte veta vem det är — bara strukturen och informationen ni vill analysera.' },
                { text: 'Fråga IMY om lov varje gång', korrekt: false, feedback: 'Fel. IMY är tillsynsmyndigheten — ni behöver inte fråga dem om lov för intern AI-användning. Ni ska bara följa GDPR-reglerna.' },
                { text: 'Aldrig använda AI för ekonomiska frågor', korrekt: false, feedback: 'För restriktivt. AI kan vara mycket hjälpsamt för ekonomiska analyser och strukturering — men utan känsliga personuppgifter.' },
              ] },
          ]}
          tips={['Anonymisera alltid — lägenhetsnummer istället för namn och personnummer', 'Stäng av träningsdelning i ChatGPT under Privacy settings', 'AI behöver struktur och belopp — inte personuppgifter', 'Claude har bättre standardinställningar för integritet']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-gdpr')} />
      ),
    },

    // ── 9: Quiz kap 1 ─────────────────────────────────────
    { id: 'quiz-verktyg', title: '🧠 Quiz: Verktyg & grunder',
      component: <QuizSlide quizId="quiz-verktyg" bild={IMGS.verktyg} badge="Quiz · Kapitel 1" rubrik="Verktyg, prompting & GDPR" questions={quizVerktyg} /> },

    // ════════════════════════════════════════════════════
    // KAPITEL 2: PROTOKOLL & DOKUMENTATION
    // ════════════════════════════════════════════════════

    { id: 'kap-protokoll', title: '📝 Kapitel 2: Protokoll & dokument',
      component: <KapitelIntro emoji="📝" nr={2} rubrik="Protokoll & dokumentation"
        desc="Protokoll på 10 minuter, smarta kallelser och stämmomaterial — utan att tappa en §."
        bild={IMGS.protokoll} /> },

    // ── 11: Protokoll ─────────────────────────────────────
    {
      id: 'protokoll', title: '📝 Protokoll på 10 minuter',
      component: (
        <SlideB bild={IMGS.protokoll} badge="Kapitel 2 · Protokoll & dokumentation"
          title={"Protokoll på 10 minuter — <span style='color:#FF5421'>inte en timme</span>"}>
          <Ingress>
            Manuell protokollskrivning tar 45–90 minuter. Med AI: 10–15 minuter. Stegen är enkla — det är rutinen som gör skillnaden.
          </Ingress>
          <StegRad nr="1" titel="Ta anteckningar under mötet" desc="Skriv stödord och beslut i fritext — behöver inte vara perfekt. Beslut, ansvariga och uppföljningsdatum är det viktigaste." />
          <StegRad nr="2" titel="Mata in i AI med rätt prompt" desc={`"Du är sekreterare i [BRF-namn]. Formatera dessa råanteckningar till formellt styrelsemötesprotokoll med §-numrerade punkter, tydliga beslut med 'Styrelsen beslutade att...', ansvarig person och uppföljningsdatum."`} />
          <StegRad nr="3" titel="Granska och justera" desc="Läs igenom utkastet. Kontrollera att beslut är korrekt formulerade. Dubbelkolla datum, namn och belopp — AI hallucinerar ibland." />
          <StegRad nr="4" titel="Justera och arkivera" desc="Skicka till justeringspersoner, samla signaturer och arkivera i föreningens gemensamma molnlagring — aldrig på privat dator." />
          <InfoBox title="Tidsvinst per år">
            10 möten × 60 min sparad tid = 10 timmar per år — bara på protokollskrivning. Det är en hel arbetsdag tillbaka till styrelsearbete som faktiskt spelar roll.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 12: Scenario protokoll ────────────────────────────
    {
      id: 'sc-protokoll', title: '📋 Scenario: Protokollskrivning',
      component: (
        <Scenario slideId="sc-protokoll" bild={P.lars} personNamn="Lars" personRoll="Sekreterare, BRF Ekbacken"
          titel="Lars ska skriva" accentTitel="styrelsemötesprotokoll" badge="Scenario · Protokoll"
          steg={[
            { rubrik: 'Fråga 1 — Anteckningsmetod', bubbla: 'Under mötet hinner jag knappt anteckna allt. Ska jag försöka skriva kompletta meningar direkt?',
              fraga: 'Vad är den bästa anteckningsstrategin inför AI-protokollskrivning?',
              alternativ: [
                { text: 'Ja — skriv kompletta meningar direkt så AI:n har mer att jobba med', korrekt: false, feedback: 'Onödigt. AI är mycket bra på att expandera stödord till formella meningar. Det är effektivare att anteckna beslut, ansvariga och uppföljningsdatum som stödord.' },
                { text: 'Nej — skriv stödord med fokus på: beslut, ansvarig, uppföljningsdatum', korrekt: true, feedback: 'Rätt! AI expanderar stödordet till formell text. Ni behöver bara fånga kärnan: vad beslutades, vem ansvarar, när följs det upp.' },
                { text: 'Spela in mötet och transkribera hela inspelningen', korrekt: false, feedback: 'Möjligt men riskabelt ur GDPR-perspektiv om inspelningen innehåller känsliga diskussioner. Stödord är enklare och säkrare.' },
                { text: 'Be AI delta i mötet live via telefon', korrekt: false, feedback: 'Det är inte möjligt — AI:n har ingen telefonnummer och kan inte delta i möten.' },
              ] },
            { rubrik: 'Fråga 2 — Granskning', bubbla: 'AI har skrivit ett fint protokollutkast. Styrelsen tycker det ser bra ut. Kan vi publicera det direkt?',
              fraga: 'Vad måste alltid göras med ett AI-genererat protokollutkast?',
              alternativ: [
                { text: 'Ja — om AI genererat det är det tillförlitligt', korrekt: false, feedback: 'Fel. AI kan hallusinera — hitta på datum, namn och belopp som låter trovärdiga men är fel. Aldrig publicera utan granskning.' },
                { text: 'Det räcker att ordföranden läser igenom det', korrekt: false, feedback: 'Bättre men inte tillräckligt. Sekreteraren ska granska alla beslut, datum och namn systematiskt — inte bara läsa igenom.' },
                { text: 'Sekreteraren granskar och kontrollerar beslut, datum, namn och belopp specifikt', korrekt: true, feedback: 'Rätt. AI levererar råmaterialet — sekreteraren ansvarar för innehållet. Kontrollera specifikt: är besluten korrekt formulerade? Stämmer alla datum och namn?' },
                { text: 'Skicka till Bolagsverket för godkännande', korrekt: false, feedback: 'Fel. Bolagsverket godkänner inte protokoll. De registrerar styrelseändringar — det är något annat.' },
              ] },
          ]}
          tips={['Anteckna stödord under mötet: beslut + ansvarig + datum', 'AI expanderar till formell text — ni kontrollerar och ansvarar', 'Granska alltid: beslut, datum, namn och belopp', 'Arkivera alltid i gemensam molnlagring — aldrig på privat dator']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-protokoll')} />
      ),
    },

    // ── 13: Kallelser & stämma ────────────────────────────
    {
      id: 'kallelse', title: '📅 Kallelser & stämmomaterial',
      component: (
        <SlideH bild={IMGS.kallelse} bildBg="#0a1a2a"
          badge="Kapitel 2 · Protokoll & dokumentation"
          title={"Kallelser & stämmomaterial — <span style='color:#FF5421'>rätt format, rätt tid</span>"}
          ingress="Kallelse till stämma, dagordning, verksamhetsberättelse och röstlängd — AI hjälper er producera professionellt material snabbare."
          punkter={[
            '<strong>Stämmokallelse</strong> — "Skriv en kallelse till ordinarie BRF-stämma [datum] kl [tid] i [plats]. Dagordning: val av ordförande, årsredovisning, ansvarsfrihet, val av styrelse. Inkludera hur man anmäler ombud."',
            '<strong>Dagordning</strong> — "Skapa en fullständig dagordning för BRF-stämma med 12 punkter enligt BRL:s krav. Föreningens namn: [namn]."',
            '<strong>Verksamhetsberättelse</strong> — "Skriv en kortfattad verksamhetsberättelse för [år] baserat på dessa anteckningar: [lista vad ni gjort]."',
            '<strong>Informationsbrev inför stämman</strong> — "Skriv ett tydligt informationsbrev till alla boende inför stämman om datum, tid, dagordning och hur man lämnar motioner."',
            '<strong>Kontrollera formkraven</strong> — Kolla alltid att kallelsens innehåll uppfyller era stadgar. AI känner inte er specifika stadgar.',
          ]}
        >
          <InfoBox title="Viktig varning">
            Kontrollera alltid att kallelsens formkrav stämmer med era stadgar. Kallelse- och beslutsprocessen regleras i era specifika stadgar — AI kan inte dem.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 14: Scenario kallelse ─────────────────────────────
    {
      id: 'sc-kallelse', title: '📋 Scenario: Fel i kallelsen',
      component: (
        <Scenario slideId="sc-kallelse" bild={P.karin} personNamn="Karin" personRoll="Ordförande, BRF Hasselbacken"
          titel="Karin skickade" accentTitel="en bristfällig kallelse" badge="Scenario · Kallelse"
          steg={[
            { rubrik: 'Fråga 1 — Vad är fel?', bubbla: 'Jag bad AI skriva stämmokallelsen och skickade ut den direkt. Nu säger en ledamot att vi missat en obligatorisk dagordningspunkt. Vad gick fel?',
              fraga: 'Vad var grundproblemet i Karins tillvägagångssätt?',
              alternativ: [
                { text: 'AI-verktyget fungerade inte korrekt', korrekt: false, feedback: 'Fel. AI-verktyget fungerade som det ska — det genererade en kallelse. Problemet var att Karin inte kontrollerade resultatet mot sina stadgar.' },
                { text: 'Hon skickade ut kallelsen utan att kontrollera mot era stadgar', korrekt: true, feedback: 'Rätt. AI känner inte era specifika stadgar. Kallelsen måste alltid kontrolleras mot stadgarna och BRL:s krav innan den skickas ut.' },
                { text: 'Hon borde ha använt ett dyrare AI-verktyg', korrekt: false, feedback: 'Fel. Priset på verktyget spelar ingen roll — felet var att inte granska mot era specifika stadgar.' },
                { text: 'Kallelser måste alltid skrivas manuellt', korrekt: false, feedback: 'Fel. AI kan hjälpa skriva kallelser utmärkt — men resultatet måste alltid kontrolleras mot er förenings specifika krav.' },
              ] },
            { rubrik: 'Fråga 2 — Rätt process', bubbla: 'Hur ska vi göra nästa gång för att undvika samma misstag?',
              fraga: 'Vad är rätt process för att producera en korrekt stämmokallelse med AI?',
              alternativ: [
                { text: 'Lita helt på AI — det är tillräckligt bra', korrekt: false, feedback: 'Fel. AI är ett utmärkt hjälpverktyg men ersätter inte granskning mot era stadgar och BRL.' },
                { text: 'Ge AI era stadgar som kontext → generera kallelse → kontrollera mot stadgarna', korrekt: true, feedback: 'Rätt! Ge AI era stadgar som underlag, generera kallelsen, och kontrollera sedan att alla formkrav uppfylls. Det ger bäst resultat och minimerar risken.' },
                { text: 'Anlita alltid en jurist för stämmokallelser', korrekt: false, feedback: 'Onödigt i de flesta fall. Med rätt process kan styrelsen producera korrekt kallelse själva — men AI-utkastet måste alltid granskas.' },
                { text: 'Skicka utkastet till kommunen för godkännande', korrekt: false, feedback: 'Fel. Kommunen har inget med BRF-stämmokallelser att göra.' },
              ] },
          ]}
          tips={['Ge alltid AI era stadgar som kontext när ni skriver kallelser', 'Granska alltid mot BRL:s minimikrav och era specifika stadgar', 'Skicka kallelseproven till styrelsen för granskning innan utskick', 'AI känner inte era stadgar — ni måste kontrollera formkraven']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-kallelse')} />
      ),
    },

    // ── 15: Quiz kap 2 ────────────────────────────────────
    { id: 'quiz-protokoll', title: '🧠 Quiz: Protokoll & dokument',
      component: <QuizSlide quizId="quiz-protokoll" bild={IMGS.protokoll} badge="Quiz · Kapitel 2" rubrik="Protokoll, kallelser & dokumentation" questions={quizProtokoll} /> },

    // ════════════════════════════════════════════════════
    // KAPITEL 3: KOMMUNIKATION
    // ════════════════════════════════════════════════════

    { id: 'kap-kommunik', title: '✉️ Kapitel 3: Kommunikation',
      component: <KapitelIntro emoji="✉️" nr={3} rubrik="Kommunikation"
        desc="Störningsbrev, informationsbrev, Copilot i Teams — kommunicera professionellt utan att lägga timmar på formuleringarna."
        bild={IMGS.brev} /> },

    // ── 17: Brev till boende ──────────────────────────────
    {
      id: 'brev', title: '✉️ Brev till boende — 4 typer',
      component: (
        <SlideA bild={IMGS.brev} badge="Kapitel 3 · Kommunikation"
          title={"Kommunicera professionellt — <span style='color:#FF5421'>rätt ton, rätt gång</span>"}>
          <Ingress>
            Störningsärenden, klagomål, informationsbrev om pågående arbeten. AI hjälper er hitta rätt ton och formulering — så att varje brev bygger förtroende.
          </Ingress>
          <TwoCol
            left={<FrameBox title="✉️ Störningsbrev">
              <Bullet>"Skriv ett formellt men respektfullt brev till innehavaren av lgh [nr] angående [typ av störning] efter kl [tid]. Referera till ordningsreglerna och be om svar inom 14 dagar."</Bullet>
              <Bullet>Tala om ton: "formellt men vänligt" — undvik anklagande språk</Bullet>
              <Bullet>Referera till §-nummer i ordningsreglerna</Bullet>
            </FrameBox>}
            right={<FrameBox title="📢 Informationsbrev">
              <Bullet>"Skriv ett informationsbrev till alla boende om stambyte som startar [datum]. Inkludera: vad som görs, hur länge, kontaktuppgifter."</Bullet>
              <Bullet>Be AI skriva på klarspråk — undvik teknisk jargong</Bullet>
              <Bullet>Be om en sammanfattning på max 150 ord för anslagstavlan</Bullet>
            </FrameBox>}
          />
          <TwoCol
            left={<FrameBox title="💬 Svar på klagomål">
              <Bullet>"En boende klagar på [problem]. Skriv ett svar som bekräftar att vi tagit emot klagomålet, förklarar vad vi gör och sätter realistiska förväntningar."</Bullet>
              <Bullet>Alltid bekräfta mottagandet — det minskar uppföljningskontakt</Bullet>
            </FrameBox>}
            right={<FrameBox title="📅 Stämmoinbjudan">
              <Bullet>"Skriv en kallelse till stämman [datum] kl [tid] i [plats]. Dagordning: [lista]. Bifoga hur man anmäler ombud."</Bullet>
              <Bullet>Kontrollera alltid mot stadgarna innan utskick</Bullet>
            </FrameBox>}
          />
        </SlideA>
      ),
    },

    // ── 18: Scenario störning ─────────────────────────────
    {
      id: 'sc-storning', title: '📋 Scenario: Störningsärende eskalerar',
      component: (
        <Scenario slideId="sc-storning" bild={P.sara} personNamn="Sara" personRoll="Ordförande, BRF Kronlunden"
          titel="Sara hanterar ett" accentTitel="störningsärende" badge="Scenario · Kommunikation"
          steg={[
            { rubrik: 'Fråga 1 — Rätt ton', bubbla: 'En boende klagar på grannen för tredje gången om buller. Vi måste skicka ett allvarligare brev nu. Hur formulerar jag det rätt?',
              fraga: 'Vilken promptformulering ger det bästa brevet för ett upprepat störningsärende?',
              alternativ: [
                { text: '"Skriv ett argt brev till störande granne."', korrekt: false, feedback: 'Fel ton. Arga brev eskalerar konflikter och kan skapa juridiska problem. AI borde instrueras att hålla en professionell ton.' },
                { text: '"Du är ordförande i BRF Kronlunden. Skriv ett formellt men bestämt brev till innehavaren av lgh 304 angående det tredje dokumenterade klagomålet om buller efter kl 22. Referera till ordningsreglerna §3 och informera om att styrelsen kan ta ärendet vidare till hyresnämnden."', korrekt: true, feedback: 'Rätt! Roll + uppgift + kontext (tredje gången, §-referens) + format (formellt men bestämt). Brevet är professionellt men tydligt med konsekvenser.' },
                { text: '"Skriv ett brev om störningar i BRF Kronlunden."', korrekt: false, feedback: 'För vag. AI vet inte om det är tredje gången, vilken ton, vilka regler som gäller eller vad konsekvenserna är.' },
                { text: 'Att involvera polisen direkt utan brev', korrekt: false, feedback: 'Fel ordning. Dokumenterat skriftligt varningsbrev ska skickas innan ärendet eskaleras till hyresnämnden eller polisen.' },
              ] },
            { rubrik: 'Fråga 2 — Dokumentation', bubbla: 'AI hjälpte mig skriva ett bra brev. Vad mer behöver vi tänka på?',
              fraga: 'Vad är viktigt att dokumentera när ett störningsärende hanteras?',
              alternativ: [
                { text: 'Ingenting — brevet räcker', korrekt: false, feedback: 'Otillräckligt. Om ärendet eskalerar till hyresnämnden eller domstol behöver ni ett dokumentationsspår som visar hela förloppet.' },
                { text: 'Datum för klagomål, vilket brev som skickades, datum för svar och åtgärder', korrekt: true, feedback: 'Rätt. Dokumentera hela förloppet: datum för klagomål, utskickat brev med datum, svar eller utebliven respons, och eventuella åtgärder. Det är ert bevismaterial.' },
                { text: 'Bara spara brevet i sin inbox', korrekt: false, feedback: 'Otillräckligt. Klagomål och åtgärder ska dokumenteras systematiskt — inte bara brev i inboxen.' },
                { text: 'Be AI hålla koll på ärendet löpande', korrekt: false, feedback: 'Fel. AI har inget minne mellan sessioner. Ni måste ha era egna system för ärendehantering och dokumentation.' },
              ] },
          ]}
          tips={['Säg alltid "formellt men bestämt" — undvik anklagande ton', 'Referera alltid till ordningsreglerna med §-nummer', 'Dokumentera hela ärendeförloppet — det behövs vid eskalering', 'AI skriver brevet — ni ansvarar för det juridiska innehållet']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-storning')} />
      ),
    },

    // ── 19: Copilot i Teams & Word ────────────────────────
    {
      id: 'copilot', title: '⚡ Copilot i Word, Teams & Outlook',
      component: (
        <SlideB bild={IMGS.copilot} badge="Kapitel 3 · Kommunikation"
          title={"Copilot — <span style='color:#FF5421'>AI direkt i er Office-miljö</span>"}>
          <Ingress>
            Microsoft Copilot är integrerat direkt i Word, Teams och Outlook. Om ni redan kör Microsoft 365 har ni troligen tillgång till det — och det kräver inga extra inloggningar.
          </Ingress>
          <div className="space-y-3 mb-5">
            {[
              { app: 'Word', emoji: '📄', desc: 'Öppna ett tomt dokument → klicka på Copilot-ikonen → be den skriva ett protokollutkast baserat på era anteckningar. Klistra in stödorden och be den formatera.', tips: 'Perfekt för sekreterare som redan jobbar i Word.' },
              { app: 'Teams', emoji: '📹', desc: 'Copilot kan transkribera och sammanfatta möten i realtid. Efter mötet: klicka "Sammanfatta mötet" → få beslut, åtgärdspunkter och ansvariga automatiskt.', tips: 'Kräver att mötet hålls i Teams med inspelning påslagen.' },
              { app: 'Outlook', emoji: '📧', desc: 'Copilot kan sammanfatta långa mejltrådar, föreslå svar och hjälpa er formulera professionella svar på klagomål direkt i mejlklienten.', tips: 'Markera en mejltråd → Summarize → Copilot sammanfattar och föreslår svar.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-4 border" style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>{item.emoji} Copilot i {item.app}</p>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                <p className="text-xs px-3 py-1.5 rounded-lg" style={{ background: OL, color: O }}>💡 {item.tips}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Kräver licens">
            Copilot för Microsoft 365 kostar extra utöver er M365-licens. Kolla om er förening redan har det aktiverat — ofta ingår det i Business Premium-planer.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 20: Scenario Copilot ──────────────────────────────
    {
      id: 'sc-copilot', title: '📋 Scenario: Teams-möte med Copilot',
      component: (
        <Scenario slideId="sc-copilot" bild={P.johan} personNamn="Johan" personRoll="IT-ansvarig, BRF Tallbacken"
          titel="Johan kör styrelsemöte" accentTitel="med Copilot" badge="Scenario · Copilot"
          steg={[
            { rubrik: 'Fråga 1 — Copilot i Teams', bubbla: 'Vi håller styrelsemöten via Teams nu. Vad kan Copilot göra för oss under och efter mötet?',
              fraga: 'Vad kan Copilot göra i Microsoft Teams för en BRF-styrelse?',
              alternativ: [
                { text: 'Ingenting — Copilot fungerar bara i Word', korrekt: false, feedback: 'Fel. Copilot är integrerat i hela Microsoft 365-paketet, inklusive Teams, Outlook och Word.' },
                { text: 'Transkribera mötet, sammanfatta beslut och åtgärdspunkter automatiskt', korrekt: true, feedback: 'Rätt! Copilot i Teams kan transkribera mötet i realtid och sammanfatta beslut och åtgärdspunkter direkt efter mötet. Perfekt underlag för protokollet.' },
                { text: 'Delta som röstberättigad ledamot', korrekt: false, feedback: 'Fel. Copilot är ett verktyg — det kan inte rösta eller delta i beslutsfattande.' },
                { text: 'Skicka kallelser automatiskt till alla boende', korrekt: false, feedback: 'Copilot kan hjälpa skriva kallelsen men skickar inte ut den automatiskt till boende.' },
              ] },
            { rubrik: 'Fråga 2 — GDPR i Teams', bubbla: 'Copilot transkriberar hela mötet automatiskt. Är det OK ur GDPR-perspektiv?',
              fraga: 'Vad måste ni tänka på när Copilot transkriberar era Teams-möten?',
              alternativ: [
                { text: 'Ingenting — Microsoft Teams är alltid GDPR-säkert', korrekt: false, feedback: 'Fel. Säkerhetsnivån beror på er specifika M365-licens och konfiguration. Det finns inga automatiska garantier.' },
                { text: 'Informera alla deltagare om att mötet transkriberas och att transkriptionen lagras', korrekt: true, feedback: 'Rätt. Alla deltagare ska informeras om att mötet transkriberas. Transkriptionen är en personuppgiftsbehandling och ska hanteras enligt GDPR.' },
                { text: 'Be alla boende om samtycke', korrekt: false, feedback: 'Inte nödvändigt för interna styrelsemöten. Men deltagare i mötet ska informeras om transkriptionen.' },
                { text: 'Radera transkriptionen omedelbart efter mötet', korrekt: false, feedback: 'Onödigt. Transkriptionen kan behållas för protokollarbetet — men ha en klar policy för hur länge den sparas.' },
              ] },
          ]}
          tips={['Copilot i Teams ger automatisk transkription och mötessammanfattning', 'Informera alltid alla deltagare om att mötet transkriberas', 'Sammanfattningen är ett utmärkt underlag för protokollet', 'Kräver M365-licens med Copilot — kolla om er förening har det']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-copilot')} />
      ),
    },

    // ── 21: Quiz kap 3 ────────────────────────────────────
    { id: 'quiz-kommunik', title: '🧠 Quiz: Kommunikation',
      component: <QuizSlide quizId="quiz-kommunik" bild={IMGS.brev} badge="Quiz · Kapitel 3" rubrik="Brev, störningar & Copilot" questions={quizKommunikation} /> },

    // ════════════════════════════════════════════════════
    // KAPITEL 4: BESLUT & UPPHANDLING
    // ════════════════════════════════════════════════════

    { id: 'kap-beslut', title: '💼 Kapitel 4: Beslut & upphandling',
      component: <KapitelIntro emoji="💼" nr={4} rubrik="Beslut & upphandling"
        desc="Jämför offerter, analysera risker och använd AI som juridiskt bollplank — utan att betala konsulten per timme."
        bild={IMGS.offert} /> },

    // ── 23: Beslutsunderlag ───────────────────────────────
    {
      id: 'offert', title: '💼 Offerter & beslutsunderlag',
      component: (
        <SlideH bild={IMGS.offert} bildBg="#0a1a0a"
          badge="Kapitel 4 · Beslut & upphandling"
          title={"Beslutsunderlag — <span style='color:#FF5421'>AI som second opinion</span>"}
          ingress="Jämför alternativ, lista risker och strukturera konsekvenser. AI är er second opinion som inte tar betalt per timme."
          punkter={[
            '<strong>Offertjämförelse</strong> — "Vi har fått tre offerter för fasadmålning: A 280 000 kr, B 310 000 kr (inkl 10-årsgaranti), C 265 000 kr. Strukturera en jämförelse med pro/cons och långsiktig bedömning."',
            '<strong>Riskanalys</strong> — "Vi planerar stambyte i BRF med 40 lägenheter. Skapa en riskanalys med de 8 vanligaste riskerna, sannolikhet, konsekvens och förebyggande åtgärder."',
            '<strong>Konsekvensanalys</strong> — "Vi överväger avgiftshöjning 8% eller lån på 2 mkr. Lista konsekvenser, risker och fördelar med varje alternativ för vår BRF."',
            '<strong>Kravlista vid upphandling</strong> — "Skapa en kravlista för upphandling av ny fastighetsförvaltare för BRF med 45 lägenheter och 12 milj. i årsomslutning."',
            '<strong>Frågelista för möte med leverantör</strong> — "Vilka 10 frågor bör vi ställa till en förvaltare vid upphandlingsmöte? Inkludera frågor om GDPR, rapportering och avtalets uppsägningstid."',
          ]}
        >
          <InfoBox title="AI är second opinion — inte sista ord">
            Använd AI för att strukturera och analysera. Beslutet fattar ni. Konsultera alltid förvaltare, revisor eller jurist för beslut med stor ekonomisk påverkan.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 24: Scenario offert ───────────────────────────────
    {
      id: 'sc-offert', title: '📋 Scenario: Tre offerter ska jämföras',
      component: (
        <Scenario slideId="sc-offert" bild={P.peter} personNamn="Peter" personRoll="Ordförande, BRF Granbacken"
          titel="Peter jämför" accentTitel="tre offerter" badge="Scenario · Beslutsunderlag"
          steg={[
            { rubrik: 'Fråga 1 — Rätt prompt', bubbla: 'Vi har tre offerter för takomläggning. Hur ber jag AI analysera dem på bästa sätt?',
              fraga: 'Vilken prompt ger den bästa offertjämförelsen?',
              alternativ: [
                { text: '"Vilken offert är bäst?"', korrekt: false, feedback: 'För vag. AI har ingen information om offerterna och kan inte svara utan att ha data. Ge alltid AI offerterna som underlag.' },
                { text: '"Vi har tre offerter: Firma A 850 000 kr (5-årsgaranti), B 920 000 kr (10-årsgaranti inkl service), C 780 000 kr (utan garanti). Strukturera en jämförelse med pro/cons per alternativ, total 10-årskostnad och rekommendation."', korrekt: true, feedback: 'Rätt! Tydlig kontext med alla tre offerterna, specifika detaljer och önskat format (pro/cons, 10-årskostnad, rekommendation). AI kan nu göra en riktigt bra analys.' },
                { text: '"Är 850 000 kr billigt för takomläggning?"', korrekt: false, feedback: 'Delvis bra fråga men jämför inte alternativen och saknar kontext om er fastighet och de andra offerterna.' },
                { text: 'Skicka offerterna till AI som PDF-bilagor', korrekt: false, feedback: 'Möjligt i Claude och ChatGPT Plus med filuppladdning — men att klistra in nyckeluppgifterna i text är ofta mer tillförlitligt.' },
              ] },
            { rubrik: 'Fråga 2 — Beslutsgranskning', bubbla: 'AI rekommenderar Firma B trots det högsta priset. Kan vi basera styrelsebeslutet enbart på AI:s analys?',
              fraga: 'Vad ska styrelsen göra med AI:s rekommendation?',
              alternativ: [
                { text: 'Ja — AI:n har analyserat det objektivt', korrekt: false, feedback: 'Fel. AI:n kan inte bedöma leverantörens rykte, referensuppdrag, lokal marknadskunskap eller er specifika fastighets behov. Det kräver mänsklig bedömning.' },
                { text: 'Använda AI:s analys som ett beslutsunderlag — sedan kontrollera referensuppdrag och konsultera förvaltaren', korrekt: true, feedback: 'Rätt. AI ger er ett utmärkt strukturerat underlag — men kolla alltid referensuppdrag, be förvaltaren om synpunkt och ta in styrelseledamöternas erfarenhet.' },
                { text: 'Ignorera AI:s rekommendation — den kan aldrig vara rätt', korrekt: false, feedback: 'Fel. AI:s analys kan vara värdefull som ett strukturerat underlag. Det handlar om att använda den rätt — inte att ignorera den.' },
                { text: 'Ta beslutet direkt per e-post utan styrelsemöte', korrekt: false, feedback: 'Fel. Beslut av denna storlek kräver ett formellt styrelsemöte med protokollföring.' },
              ] },
          ]}
          tips={['Ge AI konkreta siffror och villkor — ju mer data, desto bättre analys', 'Be om 10-årskostnad — garantier och service ändrar bilden', 'AI:s analys är ett underlag — kontrollera alltid referensuppdrag', 'Stora upphandlingar kräver formellt styrelsebeslut med protokoll']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-offert')} />
      ),
    },

    // ── 25: Juridik som bollplank ─────────────────────────
    {
      id: 'juridik', title: '⚖️ Juridik & stadgar som bollplank',
      component: (
        <SlideE bild={IMGS.juridik} badge="Kapitel 4 · Beslut & upphandling"
          title="Juridik & stadgar — <span style='color:#FF5421'>AI som bollplank</span>"
          punkter={[
            '<strong>Förstå BRL på klarspråk</strong> — "Förklara vad BRL §9 säger om styrelsens skadeståndsansvar på klarspråk för en styrelseledamot utan juridisk bakgrund."',
            '<strong>Ansvarsgränser</strong> — "Vad är skillnaden mellan underhållsansvar för BRF och bostadsrättsinnehavare? Ge konkreta exempel på vad som är föreningens respektive innehavarens ansvar."',
            '<strong>Stadgetolkning</strong> — "Våra stadgar säger [klistra in paragraf]. Vad innebär detta i praktiken om en boende vill [situation]?"',
            '<strong>Rätt frågor till juristen</strong> — "Vi har en tvist om [situation]. Hjälp mig formulera de rätta frågorna att ställa till vår jurist vid nästa möte."',
            '<strong>Vanliga misstag</strong> — "Lista de 5 vanligaste juridiska misstagen BRF-styrelser gör och hur man undviker dem."',
          ]}
          fotnot="AI har rätt ungefär 90% av tiden — men den 10% kan kosta er. Anlita alltid jurist för bindande juridiska beslut, tvister och avtalsskrivning."
          fotnotColor="#ef4444"
        />
      ),
    },

    // ── 26: Scenario juridik ──────────────────────────────
    {
      id: 'sc-juridik', title: '📋 Scenario: Tolkningsfråga i stadgarna',
      component: (
        <Scenario slideId="sc-juridik" bild={P.anna} personNamn="Sofia" personRoll="Ledamot, BRF Björkbacken"
          titel="Sofia har en" accentTitel="juridisk fråga" badge="Scenario · Juridik"
          steg={[
            { rubrik: 'Fråga 1 — AI och juridik', bubbla: 'En boende vill bygga till sin balkong. Jag frågade AI om vad lagen säger och fick ett detaljerat svar. Kan jag skicka det svaret till den boende som föreningens officiella ståndpunkt?',
              fraga: 'Vad är rätt att göra med AI:s juridiska svar?',
              alternativ: [
                { text: 'Ja — om AI gav ett detaljerat svar är det tillförlitligt', korrekt: false, feedback: 'Fel. AI har rätt ungefär 90% av tiden — men i juridiska frågor kan den 10% kosta er mycket. Aldrig presentera AI:s svar som föreningens officiella ståndpunkt.' },
                { text: 'Använda AI-svaret som bakgrundskunskap och konsultera förvaltaren eller en jurist innan svar ges', korrekt: true, feedback: 'Rätt. AI hjälper er förstå bakgrunden och ställa rätt frågor — men officiella svar i juridiska frågor ska alltid vara förankrade med kvalificerad rådgivning.' },
                { text: 'Be AI skriva om svaret på ett mer officiellt sätt och skicka det', korrekt: false, feedback: 'Fel. Problemet är inte formuleringen — det är att ni inte kan verifiera juridisk korrekthet. Omformatering löser inte det.' },
                { text: 'Aldrig använda AI för juridiska frågor', korrekt: false, feedback: 'För restriktivt. AI är utmärkt för att förstå juridik och förbereda frågor — men ersätter inte juridisk rådgivning för officiella beslut.' },
              ] },
            { rubrik: 'Fråga 2 — Bäst användning av AI för juridik', bubbla: 'Hur bör jag använda AI för juridiska frågor på bästa sätt?',
              fraga: 'Vad är den bästa användningen av AI för juridiska BRF-frågor?',
              alternativ: [
                { text: 'Aldrig — juridik är för viktigt för AI', korrekt: false, feedback: 'För restriktivt. AI kan ge stor värde för att förstå bakgrunden och förbereda möten med jurister — utan att ersätta dem.' },
                { text: 'Använda AI för bakgrundsförståelse och att formulera rätt frågor till juristen', korrekt: true, feedback: 'Rätt. Be AI förklara BRL-paragrafen på klarspråk, hjälpa er förstå alternativen och formulera rätt frågor. Sedan konsulterar ni juristen — väl förberedda och med bättre frågor.' },
                { text: 'Använda AI bara om frågan är under 10 000 kr', korrekt: false, feedback: 'Beloppet är irrelevant för om AI är lämpligt för juridisk rådgivning.' },
                { text: 'Alltid begära tre AI-svar och ta majoritetssvaret', korrekt: false, feedback: 'Inte ett bra tillvägagångssätt. Tre svar från samma modell ger inte mer tillförlitlighet — konsultera en jurist istället.' },
              ] },
          ]}
          tips={['AI för bakgrundsförståelse — jurist för bindande beslut', 'Be AI "förklara på klarspråk" — det ger bättre förståelse än att läsa lagtext', 'Använd AI för att formulera rätt frågor till juristen', 'AI har rätt ~90% av gångerna — i juridik kan den 10% vara kostsam']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-juridik')} />
      ),
    },

    // ── 27: Quiz kap 4 ────────────────────────────────────
    { id: 'quiz-beslut', title: '🧠 Quiz: Beslut & upphandling',
      component: <QuizSlide quizId="quiz-beslut" bild={IMGS.offert} badge="Quiz · Kapitel 4" rubrik="Offerter, beslutsunderlag & juridik" questions={quizBeslut} /> },

    // ── 28: Sammanfattning ────────────────────────────────
    {
      id: 'avslut', title: '✅ Sammanfattning',
      component: (
        <SlideC bild={IMGS.avslut} bildHöjd="30%"
          badge="Sammanfattning · AI för BRF-styrelsen"
          title={"Er styrelses <span style='color:#FF5421'>AI-verktygslåda</span> från och med idag"}>
          <Ingress>
            Fem saker ni kan börja med redan på nästa styrelsemöte.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Skapa konton i Claude (känsliga dokument) och ChatGPT (allmänt). Gratisversionen räcker för att komma igång.' },
              { nr: '02', text: 'Använd prompt-formeln: Roll + Uppgift + Kontext + Format. Det tar 30 sekunder extra och gör svaret tio gånger bättre.' },
              { nr: '03', text: 'Nästa protokoll — testa att mata in era råanteckningar och be AI formatera dem. Granska resultatet.' },
              { nr: '04', text: 'Stäng av träningsdelning i ChatGPT (Privacy → Improve the model → Av). Mata aldrig in personnummer.' },
              { nr: '05', text: 'Kör ni Microsoft 365? Kolla om Copilot är aktiverat i er tenant — det kan finnas utan att ni vet om det.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-lg font-black flex-shrink-0" style={{ color: `${O}60` }}>{item.nr}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl p-5 border mb-6" style={{ background: `${O}10`, borderColor: `${O}25` }}>
            <p className="font-bold text-gray-900 mb-1">👉 Er uppgift nu</p>
            <p className="text-sm text-gray-600">
              Öppna Claude eller ChatGPT och skriv: "Du är sekreterare i [er BRF]. Skriv en dagordning för styrelsemöte den [datum]. Vi ska behandla: [lista era ärenden]." Se resultatet på 10 sekunder.
            </p>
          </div>
          {allDone && (
            <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört AI för BRF-styrelsen.')}
              className="w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              <Award className="w-6 h-6" /> Hämta kursbevis
            </motion.button>
          )}
        </SlideC>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader isSidebarMinimized={false} isDesktop={isDesktop}
          userName={userData.name} userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }} />
      </div>
      <SlideSidebar slides={slides} currentIndex={currentIndex}
        completedLessons={completedLessons} onNavigate={setCurrentIndex}
        courseTitle="AI för BRF-styrelsen" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={courseData.faq} title="Frågor om AI-kursen"
        subtitle="Verktyg, GDPR och prompting för BRF-styrelser" buttonColor={O} />
    </div>
  );
};

export default ModuleAiBrfStyrelsen;