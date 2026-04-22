// src/modules/Styrelsekorkortet/ModuleFastighetenDrift.tsx
// Kapitel: Praktisk drift — del av Fastigheten-utbildningen

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ChevronRight, RotateCcw, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import {
  SlideA, SlideB, SlideC, SlideE, SlideF, SlideH,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol, Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

interface Alternativ { text: string; korrekt: boolean; feedback: string; }
interface ScenarioSteg { rubrik: string; bubbla: string; fraga: string; alternativ: Alternativ[]; }
interface ScenarioProps {
  bild: string; personNamn: string; personRoll: string;
  titel: string; accentTitel: string; badge: string;
  steg: ScenarioSteg[]; tips: string[];
  onComplete?: (id: string) => void; isDone?: boolean; slideId: string;
}

function AlternativKnapp({ alt, valt, visar, onVälj }: {
  alt: Alternativ; valt: string | null; visar: boolean; onVälj: (id: string) => void;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ padding: '3px 10px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>{badge}</div>
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
  { id: 'sakerhet',   label: 'Säkerhet',          emoji: '🔥', desc: 'Brand, hissar, radon, legionella',         slideIdx: 2,  color: '#EF4444' },
  { id: 'underhall',  label: 'Underhåll',          emoji: '🔧', desc: 'Underhållsplan, OVK, egenkontroll',       slideIdx: 9,  color: '#F59E0B' },
  { id: 'energi',     label: 'Energi & miljö',     emoji: '⚡', desc: 'Energideklaration, solceller, laddning',  slideIdx: 15, color: '#10B981' },
  { id: 'drift',      label: 'Praktisk drift',     emoji: '🏗️', desc: 'Sopor, PCB, lekplatser, bygglov',         slideIdx: 21, color: '#6366F1' },
];

function Översikt({ onNavigate }: { onNavigate: (i: number) => void }) {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }, []);

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', paddingTop: 'var(--header-height, 60px)' }}>
      <video ref={videoRef} src="/video/hiss.mp4" muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        onEnded={e => (e.target as HTMLVideoElement).pause()} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.82)', zIndex: 1 }} />

      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', height: '100%', position: 'relative', zIndex: 2 }}>
        {/* Vänster — hissknapp-panel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 40px', gap: 16 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>Fastigheten · Översikt</p>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.15 }}>
              Välj ett <span style={{ color: O }}>kapitel</span>
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Klicka på ett kapitel för att gå direkt dit</p>
          </div>

          {/* Hissknapp-grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 380 }}>
            {KAPITEL.map((kap) => {
              const isAktiv = aktiv === kap.id;
              return (
                <motion.button key={kap.id}
                  onClick={() => { setAktiv(kap.id); setTimeout(() => onNavigate(kap.slideIdx), 200); }}
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95, y: 1 }}
                  style={{
                    padding: '20px 16px', borderRadius: 18, cursor: 'pointer', border: 'none',
                    background: isAktiv ? `${kap.color}30` : 'rgba(255,255,255,0.07)',
                    boxShadow: isAktiv ? `0 0 28px ${kap.color}40, inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    outline: isAktiv ? `2px solid ${kap.color}` : '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  }}>
                  <span style={{ fontSize: 28 }}>{kap.emoji}</span>
                  <p style={{ fontSize: 13, fontWeight: 800, color: isAktiv ? kap.color : 'rgba(255,255,255,0.85)', fontFamily: "'Nunito', sans-serif" }}>{kap.label}</p>
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

        {/* Höger — förklaring */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {aktiv ? (
              <motion.div key={aktiv} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                {(() => {
                  const kap = KAPITEL.find(k => k.id === aktiv)!;
                  return (
                    <>
                      <div style={{ fontSize: 52, marginBottom: 16 }}>{kap.emoji}</div>
                      <h3 style={{ fontSize: 28, fontWeight: 900, color: kap.color, fontFamily: "'Nunito', sans-serif", marginBottom: 12 }}>{kap.label}</h3>
                      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{kap.desc}</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>Navigerar dit om ett ögonblick...</p>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", marginBottom: 16 }}>
                  Din fastighet — <span style={{ color: O }}>ditt ansvar</span>
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
                  Som styrelseledamot bär du ett stort ansvar för fastighetens säkerhet, underhåll och lagstadgade krav. Den här kursen täcker allt du behöver veta.
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
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>Fastigheten · Översikt</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif" }}>Välj ett <span style={{ color: O }}>kapitel</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {KAPITEL.map(kap => (
            <motion.button key={kap.id} whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(kap.slideIdx)}
              style={{ padding: '16px 12px', borderRadius: 16, cursor: 'pointer', border: `1px solid ${kap.color}40`, background: `${kap.color}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 24 }}>{kap.emoji}</span>
              <p style={{ fontSize: 12, fontWeight: 800, color: kap.color, fontFamily: "'Nunito', sans-serif" }}>{kap.label}</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.3, textAlign: 'center' }}>{kap.desc}</p>
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
// KURSDATA
// ════════════════════════════════════════════════════════
export const courseData = {
  learningPoints: [
    'Förstå styrelsens ansvar för fastighetens säkerhet',
    'Känna till lagkrav för brandskydd, hissar och radon',
    'Planera och genomföra obligatoriska besiktningar (OVK, egenkontroll)',
    'Förstå vad en energideklaration kräver',
    'Ta beslut om solceller och laddstolpar på rätt sätt',
    'Hantera sopor, PCB och andra miljöfrågor',
    'Veta när bygglov krävs och hur man ansöker',
  ],
  forWho: [
    'Styrelseledamöter i BRF', 'Ordföranden och fastighetsansvariga',
    'Alla som vill förstå fastighetsjuridik och underhållskrav',
  ],
  faq: [
    { question: 'Hur ofta måste OVK-besiktning göras?', answer: 'Det beror på byggnadstyp. Flerbostadshus med FT- eller FTX-ventilation besiktigas vart 3:e år. S-ventilation vart 6:e år. Nybyggda hus besiktigas första gången inom 2 år.' },
    { question: 'Måste vi ha en energideklaration?', answer: 'Ja — energideklaration är obligatorisk för flerbostadshus och ska uppdateras minst vart 10:e år. Den ska finnas tillgänglig för presumtiva köpare.' },
    { question: 'Behöver vi bygglov för solceller?', answer: 'Vanligtvis inte om solcellerna följer takets lutning och inte sticker ut mer än 20 cm. Men det varierar med detaljplan och om fastigheten är kulturminnesmärkt.' },
    { question: 'Vad händer om vi missar en obligatorisk besiktning?', answer: 'Kommunen kan förelägga föreningen att genomföra besiktningen. Vid allvarliga brister kan fastigheten förbjudas att brukas. Styrelsen kan drabbas av personligt ansvar.' },
  ],
};

// ════════════════════════════════════════════════════════
// BILDER & PERSONAS
// ════════════════════════════════════════════════════════
const IMGS = {
  intro:      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1280&q=80',
  brand:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&q=80',
  hiss:       'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1280&q=80',
  radon:      'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1280&q=80',
  ovk:        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&q=80',
  egenkontroll: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1280&q=80',
  energi:     'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1280&q=80',
  solceller:  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=80',
  laddstolpar:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1280&q=80',
  sopor:      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1280&q=80',
  bygglov:    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1280&q=80',
  avslut:     'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1280&q=80',
};
const P = {
  eva:    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  peter:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  sara:   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  johan:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  anna:   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  lars:   'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
  karin:  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
};

// ════════════════════════════════════════════════════════
// QUIZ-FRÅGOR PER KAPITEL
// ════════════════════════════════════════════════════════
const quizSakerhet = [
  { id: 'ks1', question_text: 'Vad innebär SBA — systematiskt brandskyddsarbete?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['En engångskontroll av brandvarnare', 'Löpande, dokumenterat arbete för att förebygga och begränsa brandrisker', 'Att anlita brandkonsult en gång per år', 'Sprinkleranläggning i alla lägenheter'] }, correct_answer: 'Löpande, dokumenterat arbete för att förebygga och begränsa brandrisker', explanation: 'SBA är ett kontinuerligt och dokumenterat arbete — inte en engångshändelse. Föreningen ska ha en brandskyddspolicy, utse ansvarig och göra regelbundna kontroller.', points: 100 },
  { id: 'ks2', question_text: 'Hur ofta ska hissar i flerbostadshus besiktigas?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Vart 5:e år', 'Vart 2:e år', 'Varje år', 'Bara vid klagomål'] }, correct_answer: 'Vart 2:e år', explanation: 'Hissar ska besiktigas av ackrediterat organ vart annat år. Föreningen ansvarar för att boka besiktning i tid. Eftersatt besiktning kan ge föreläggande.', points: 100 },
  { id: 'ks3', question_text: 'Vad gäller för radonmätning i bostäder?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Det finns inget krav på radonmätning', 'Radon mäts automatiskt av kommunen', 'Föreningen rekommenderas mäta — gränsvärdet är 200 Bq/m³', 'Radonmätning krävs bara vid ny- och ombyggnad'] }, correct_answer: 'Föreningen rekommenderas mäta — gränsvärdet är 200 Bq/m³', explanation: 'Gränsvärdet för radon i inomhusluft är 200 Bq/m³. Det finns inget lagkrav på mätning i befintliga flerbostadshus, men Folkhälsomyndigheten rekommenderar det starkt. Vid försäljning förväntar sig köpare att mätning är gjord.', points: 100 },
];

const quizUnderhall = [
  { id: 'ku1', question_text: 'Vad är OVK?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Obligatorisk ventilationskontroll', 'Obligatorisk VVS-kontroll', 'Oberoende värmekontroll', 'Offentlig verksamhetskontroll'] }, correct_answer: 'Obligatorisk ventilationskontroll', explanation: 'OVK — Obligatorisk Ventilationskontroll — är en lagstadgad besiktning av byggnadens ventilationssystem. Den ska utföras av certifierad besiktningsman och upprepas regelbundet.', points: 100 },
  { id: 'ku2', question_text: 'Vad ingår i föreningens egenkontroll?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Bara brandvarnare', 'Löpande kontroll av säkerhetsutrustning, ventilation, VA och brandskydd', 'Bara vid styrelsebyte', 'Revisorns granskning av fastigheten'] }, correct_answer: 'Löpande kontroll av säkerhetsutrustning, ventilation, VA och brandskydd', explanation: 'Egenkontroll är föreningens eget system för att löpande kontrollera att fastigheten uppfyller lagar och krav. Det ska dokumenteras och följas upp regelbundet.', points: 100 },
  { id: 'ku3', question_text: 'Hur ofta ska OVK göras för ett flerbostadshus med FT-ventilation?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Vart 2:e år', 'Vart 3:e år', 'Vart 6:e år', 'Bara en gång vid bygglov'] }, correct_answer: 'Vart 3:e år', explanation: 'Flerbostadshus med FT- eller FTX-ventilation ska ha OVK vart 3:e år. S-ventilation (självdrag) vart 6:e år. Nybyggda hus besiktigas första gången inom 2 år från inflyttning.', points: 100 },
];

const quizEnergi = [
  { id: 'ke1', question_text: 'Hur ofta måste energideklarationen uppdateras?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Vart 5:e år', 'Vart 10:e år', 'Vart 15:e år', 'Bara vid byggnation'] }, correct_answer: 'Vart 10:e år', explanation: 'Energideklarationen för flerbostadshus ska uppdateras minst vart 10:e år. Den ska finnas tillgänglig för presumtiva köpare och vid uthyrning av lokaler.', points: 100 },
  { id: 'ke2', question_text: 'Vem får installera laddstolpar i en BRF?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Vem som helst som äger sin lägenhet', 'Bara styrelsen efter stämmobeslut', 'Bostadsrättsinnehavaren har rätt att installera i sin parkeringsplats med styrelsens godkännande', 'Kommunen installerar alltid laddstolpar'] }, correct_answer: 'Bostadsrättsinnehavaren har rätt att installera i sin parkeringsplats med styrelsens godkännande', explanation: 'Sedan 2022 har bostadsrättsinnehavare rätt att installera laddpunkt för fordon på sin parkeringsplats. Styrelsen kan inte neka utan sakliga skäl, men har rätt att ange hur installationen ska göras.', points: 100 },
  { id: 'ke3', question_text: 'Behövs bygglov för solceller på taket?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Alltid — solceller kräver alltid bygglov', 'Aldrig — solceller är alltid bygglovsbefriade', 'Vanligtvis inte, om de följer takets form och inte sticker ut mer än 20 cm', 'Bara om taket är lutande'] }, correct_answer: 'Vanligtvis inte, om de följer takets form och inte sticker ut mer än 20 cm', explanation: 'Sedan 2018 är solceller i de flesta fall bygglovsbefriade om de följer takets lutning och inte sticker ut mer än 20 cm. Undantag: kulturminnesmärkta byggnader, vissa detaljplaner. Kolla alltid med kommunen först.', points: 100 },
];

const quizDrift = [
  { id: 'kd1', question_text: 'Vad är PCB och varför är det ett problem för BRF-er?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['En typ av energisparande belysning', 'Ett miljögift som förbjöds på 1970-talet och kan finnas i fogar och fogmassor', 'En redovisningsstandard', 'En typ av brandskyddsutrustning'] }, correct_answer: 'Ett miljögift som förbjöds på 1970-talet och kan finnas i fogar och fogmassor', explanation: 'PCB är ett miljögift som användes i byggnader fram till 1970-talets slut, framför allt i fogmassor och halkskyddsgolv. Fastigheter byggda 1956–1973 kan behöva inventeras och saneras — det är ett miljölagkrav.', points: 100 },
  { id: 'kd2', question_text: 'När krävs bygglov för en åtgärd i en BRF?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Alltid — alla åtgärder kräver bygglov', 'Aldrig för underhållsåtgärder', 'Vid fasadändring, tillbyggnad, ändring av byggnads utseende eller användning', 'Bara vid nybyggnad'] }, correct_answer: 'Vid fasadändring, tillbyggnad, ändring av byggnads utseende eller användning', explanation: 'Bygglov krävs vid fasadändring, tillbyggnad, ändring av användning och andra väsentliga ändringar. Underhåll som inte ändrar byggnadens utseende kräver normalt inte bygglov. Tveka inte — fråga kommunen i förväg.', points: 100 },
  { id: 'kd3', question_text: 'Vem ansvarar för att lekplatsen är säker?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Kommunen om lekplatsen är utomhus', 'Föreningen ansvarar för alla lekplatser på föreningens mark', 'Föräldrarna som använder lekplatsen', 'Fastighetsförsäkringen täcker automatiskt'] }, correct_answer: 'Föreningen ansvarar för alla lekplatser på föreningens mark', explanation: 'Föreningen har produktansvar för lekredskapen och skadeståndsansvar om olycka sker. Lekplatsen ska besiktigas minst en gång per år av certifierad besiktningsman. Dokumentera besiktningarna.', points: 100 },
];

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
const ModuleFastighetenDrift: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>());
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Ledamot', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) => setCompletedLessons(prev => new Set([...prev, id]));
  const allDone = completedLessons.has('quiz-drift');


  const KapitelIntro = ({ emoji, rubrik, desc, bild, slideNr, total, nr }: {
    emoji: string; rubrik: string; desc: string; bild: string;
    slideNr?: number; total?: number; nr?: number;
  }) => (
    <div className="h-full flex overflow-hidden" style={{ background: '#0f1623' }}>
      <div className="hidden lg:block w-1/2 flex-shrink-0 relative">
        <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.45 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #0f1623)' }} />
      </div>
      <div className="flex-1 flex items-center overflow-y-auto px-8 sm:px-14 py-10">
        <div>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{emoji}</div>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 10 }}>
            Fastigheten · {rubrik}
          </p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, marginBottom: 16 }}>
            {rubrik}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>
            {desc}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentIndex(1)}
              style={{ padding: '14px 28px', borderRadius: 14, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
              Starta →
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/modules/fastigheten')}
              style={{ padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              ← Alla kapitel
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );


  const QuizSlide = ({ quizId, bild, badge, rubrik, questions }: {
    quizId: string; bild: string; badge: string; rubrik: string; questions: any[];
  }) => (
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
    // ── 22: Kapitel-intro ─────────────────────────────────
    {
      id: 'kap-drift', title: '🏗️ Kapitel 4: Praktisk drift',
      component: <KapitelIntro emoji="🏗️" rubrik="Praktisk drift" slideNr={4} total={4}
        desc="Sophantering, PCB, lekplatser och bygglov — vardagliga frågor med juridiska konsekvenser."
        bild={IMGS.sopor} />,
    },

    // ── 23: Sophantering & snöröjning ─────────────────────
    {
      id: 'sopor', title: '🗑️ Sophantering, snöröjning & PCB',
      component: (
        <SlideE bild={IMGS.sopor} badge="Kapitel 4 · Praktisk drift"
          title="Drift — <span style='color:#FF5421'>vardagliga skyldigheter</span>"
          punkter={[
            '<strong>Sophantering</strong> — föreningen ansvarar för avfallshantering enligt kommunens renhållningsordning. Soprum ska hållas rent och säkert. Källsortering är lagkrav.',
            '<strong>Snöröjning</strong> — styrelsen ansvarar för att gångar och entréer är halkfria. Dokumentera när åtgärder vidtas. Vid halkolycka är dokumentationen avgörande.',
            '<strong>PCB-inventering</strong> — fastigheter byggda 1956–1973 kan behöva inventeras på PCB-haltig fogmassa. Lagen kräver sanering vid höga halter. Kontakta miljöförvaltningen.',
            '<strong>Asbest</strong> — kan finnas i äldre isolering, golvplattor och takpapp. Kräver certifierad saneringsfirma vid rivning. Farligt att hantera fel.',
            '<strong>Lekplats</strong> — föreningens lekplatser ska besiktigas minst en gång per år av certifierad besiktningsman. Brister åtgärdas omedelbart. Spara protokollen.',
            '<strong>Ohyra & skadedjur</strong> — styrelsen ansvarar för gemensamma utrymmen. Vid råttproblem kontakta kommunens miljöförvaltning. Dokumentera klagomål och åtgärder.',
          ]}
          fotnot="Dokumentation är nyckeln — vid olycka, tillsyn eller tvist är det era protokoll och åtgärdslistor som avgör."
          fotnotColor={O}
        />
      ),
    },

    // ── 24: Bygglov ───────────────────────────────────────
    {
      id: 'bygglov', title: '🏗️ Bygglov & tekniska krav',
      component: (
        <SlideB bild={IMGS.bygglov} badge="Kapitel 4 · Praktisk drift"
          title={"Bygglov — <span style='color:#FF5421'>när krävs det?</span>"}
        >
          <Ingress>
            Bygglov är ett vanligt frågetecken för BRF-styrelser. Grundregeln: åtgärder som ändrar en byggnads utseende, användning eller konstruktion kräver normalt bygglov.
          </Ingress>
          <div className="space-y-3 mb-5">
            <div className="rounded-2xl p-4 border" style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>✅ Kräver vanligtvis bygglov</p>
              <div className="space-y-1.5">
                {['Tillbyggnad, påbyggnad eller ny komplementbyggnad', 'Fasadändring (färg, material, fönsterbyte)', 'Ändrad användning (t.ex. lokal till bostad)', 'Rivning av bärande konstruktioner'].map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: O }} />
                    <p className="text-xs text-gray-600">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4 border" style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>🔧 Kräver vanligtvis INTE bygglov</p>
              <div className="space-y-1.5">
                {['Underhåll som inte ändrar byggnadens utseende', 'Byte av fönster till likadana', 'Solceller som följer takets form (max 20 cm)', 'Målning med liknande kulör'].map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#9ca3af' }} />
                    <p className="text-xs text-gray-600">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <StegRad nr="1" titel="Osäker? Fråga kommunen" desc="Kontakta alltid kommunens bygglovsavdelning för ett förhandsbesked. Det är gratis och ger trygghet." />
          <StegRad nr="2" titel="Bygg aldrig utan lov" desc="Olovliga åtgärder kan krävas rivas och leda till byggsanktionsavgift. Det är alltid dyrare i efterhand." />
          <InfoBox title="Attefallsåtgärder">
            Vissa åtgärder kräver anmälan men inte bygglov — s.k. Attefallsåtgärder. Kontrollera kommunens hemsida för vad som gäller i ert fall.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 25: Scenario bygglov ──────────────────────────────
    {
      id: 'sc-bygglov', title: '📋 Scenario: Takpåbyggnad',
      component: (
        <Scenario slideId="sc-bygglov" bild={P.peter} personNamn="Magnus" personRoll="Styrelseordförande, BRF Höjden"
          titel="Magnus planerar" accentTitel="en takpåbyggnad" badge="Scenario · Bygglov"
          steg={[
            {
              rubrik: 'Fråga 1 — Stämmobeslut',
              bubbla: 'Vi vill bygga till en vindsvåning. Det är 2,4 mkr. Styrelsen är eniga. Kan vi beställa det utan att gå till stämman?',
              fraga: 'Kan styrelsen beställa en tillbyggnad på 2,4 mkr utan stämmobeslut?',
              alternativ: [
                { text: 'Ja — styrelsen sköter förvaltningen och kan fatta stora beslut', korrekt: false, feedback: 'Fel. En tillbyggnad på 2,4 mkr som väsentligt förändrar fastigheten och föreningens ekonomi är inte löpande förvaltning. Det kräver stämmobeslut.' },
                { text: 'Nej — en åtgärd av denna storlek kräver stämmobeslut', korrekt: true, feedback: 'Rätt. Tillbyggnader som väsentligt förändrar fastigheten och innebär stora kostnader ska beslutas av stämman. Styrelsen kan förbereda och presentera men inte beställa.' },
                { text: 'Bara om det finansieras med lån — annars kan styrelsen besluta', korrekt: false, feedback: 'Fel. Finansieringsformen avgör inte beslutsrätten. Det är åtgärdens karaktär och storlek som avgör om stämman behöver involveras.' },
                { text: 'Ja — om mer än hälften av styrelseledamöterna röstar ja', korrekt: false, feedback: 'Fel. Styrelsens interna majoritet ger inte rätt att fatta beslut som egentligen tillhör stämman.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Bygglovsprocess',
              bubbla: 'Stämman sa ja med 78% av rösterna. Hur går vi vidare med bygglovsansökan?',
              fraga: 'Vad är rätt ordning i bygglovsprocessen?',
              alternativ: [
                { text: 'Anlita byggfirma och börja bygga — sedan söka bygglov i efterhand', korrekt: false, feedback: 'Fel. Att bygga utan bygglov är olovlig byggnation och kan resultera i krav på rivning och sanktionsavgift. Bygglovet ska vara beviljat innan byggstart.' },
                { text: 'Söka förhandsbesked, sedan bygglov, invänta godkännande, därefter byggstart', korrekt: true, feedback: 'Rätt ordning. Förhandsbesked ger tidigt besked om åtgärden är möjlig. Sedan formell bygglovsansökan med ritningar. Bygglovet ska vinna laga kraft innan byggstart.' },
                { text: 'Anmäla till kommunen — tillbyggnader är alltid anmälningspliktiga, inte bygglovspliktiga', korrekt: false, feedback: 'Fel. Tillbyggnad av denna karaktär kräver bygglov — inte bara anmälan. Anmälan gäller för enklare Attefallsåtgärder.' },
                { text: 'Kontakta Boverket för nationellt bygglov', korrekt: false, feedback: 'Fel. Boverket utfärdar inte bygglov. Det gör kommunens byggnadsnämnd. Boverket är tillsyns- och normgivande myndighet.' },
              ],
            },
          ]}
          tips={['Tillbyggnad kräver alltid stämmobeslut och bygglov', 'Bygglov ska beviljas och vinna laga kraft INNAN byggstart', 'Anlita en erfaren bygglovsarkitekt — processen är komplex', 'Förhandsbesked ger tidig trygghet om projektet är möjligt']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-bygglov')} />
      ),
    },

    // ── 26: Quiz kapitel 4 ────────────────────────────────
    {
      id: 'quiz-drift', title: '🧠 Quiz: Praktisk drift',
      component: <QuizSlide quizId="quiz-drift" bild={IMGS.sopor} badge="Quiz · Kapitel 4 · Drift" rubrik="Testa dina driftkunskaper" questions={quizDrift} />,
    },

    // ── 27: Sammanfattning ────────────────────────────────
    {
      id: 'avslut', title: '✅ Sammanfattning',
      component: (
        <SlideC bild={IMGS.avslut} bildHöjd="30%"
          badge="Sammanfattning · Fastigheten"
          title={"Ditt <span style='color:#FF5421'>fastighetskit</span> från och med idag"}
        >
          <Ingress>
            Fem saker att ta med sig som gör er fastighetsförvaltning tryggare — direkt.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Utse en brandskyddsansvarig och dokumentera alla kontroller. SBA ska vara löpande — inte engångs.' },
              { nr: '02', text: 'Kalender-påminnelse för hissbesiktning och OVK — boka 6 månader i förväg. Missad besiktning = föreläggande.' },
              { nr: '03', text: 'Kontrollera energideklarationens datum på Boverkets register. Äldre än 10 år? Boka ny omedelbart.' },
              { nr: '04', text: 'Bostadsrättsinnehavare har rätt till laddpunkt. Ta fram en teknisk policy proaktivt — innan ansökningarna ramlar in.' },
              { nr: '05', text: 'Fråga alltid kommunen om bygglov är nödvändigt INNAN ni beställer. Olovlig byggnation kan krävas rivas.' },
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
          {allDone && (
            <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört kursen om fastigheten.')}
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
      <div className="flex-shrink-0" data-course-header style={{ background: '#0f1623' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <motion.button onClick={() => navigate('/modules/fastigheten')}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            <ArrowLeft size={12} /> Fastigheten
          </motion.button>
          <span className="text-xs font-bold" style={{ color: O }}>🏗️ Praktisk drift</span>
          <div className="flex gap-2">
          <motion.button onClick={() => navigate('/modules/fastigheten-energi')}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)' }}>
            ← Föregående
          </motion.button>

          </div>
        </div>
        <CourseHeader isSidebarMinimized={false} isDesktop={isDesktop}
          userName={userData.name} userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }} />
      </div>
      <SlideSidebar slides={slides} currentIndex={currentIndex}
        completedLessons={completedLessons} onNavigate={setCurrentIndex}
        courseTitle="Praktisk drift" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={[{ question: 'Vad är PCB?', answer: 'Miljögift i fogmassor — hus 1956–1973 kan behöva inventeras.' }, { question: 'När bygglov?', answer: 'Vid fasadändring, tillbyggnad eller ändrad användning.' }, { question: 'Lekplatsansvar?', answer: 'Föreningen — besiktning minst 1 gång/år.' }]}
        title="Frågor om praktisk drift"
        subtitle="Sopor, PCB, lekplatser och bygglov."
        buttonColor={O} />
    </div>
  );
};

export default ModuleFastighetenDrift;