// src/modules/Styrelsekorkortet/ModuleFastighetenEnergi.tsx
// Kapitel: Energi & miljö — del av Fastigheten-utbildningen

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
const ModuleFastighetenEnergi: React.FC = () => {
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


 const KapitelIntro = ({ emoji, rubrik, desc, bild, slideNr, total, nr }: {
  emoji: string; rubrik: string; desc: string; bild: string;
  slideNr?: number; total?: number; nr?: number;
}) => (
  <div className="h-full overflow-hidden" style={{ background: '#0f1623' }}>

    {/* Desktop — exakt 50/50 grid */}
    <div className="hidden lg:grid h-full" style={{ gridTemplateColumns: '1fr 1fr' }}>

      {/* Vänster — bild */}
      <div className="relative overflow-hidden">
        <img
          src={bild}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(15,22,35,0) 40%, #0f1623 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,22,35,0.7) 0%, transparent 50%)' }}
        />
        {slideNr && total && (
          <div className="absolute bottom-8 left-8">
            <p style={{
              fontSize: 11, fontWeight: 800, letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: 'rgba(255,255,255,0.35)',
            }}>
              Kapitel {slideNr} av {total}
            </p>
          </div>
        )}
      </div>

      {/* Höger — text */}
      <div
        className="flex items-center overflow-y-auto"
        style={{ padding: 'clamp(32px, 5vw, 72px) clamp(32px, 4vw, 60px)' }}
      >
        <div style={{ maxWidth: 480, width: '100%' }}>
          <div style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1, marginBottom: 'clamp(16px, 2vw, 24px)' }}>
            {emoji}
          </div>
          <p style={{
            fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: O, marginBottom: 10,
          }}>
            Fastigheten · {rubrik}
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900,
            color: '#fff', fontFamily: "'Nunito', sans-serif",
            lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: 'clamp(12px, 1.5vw, 20px)',
          }}>
            {rubrik}
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
            marginBottom: 'clamp(24px, 3vw, 40px)', maxWidth: 420,
          }}>
            {desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentIndex(1)}
              style={{
                padding: 'clamp(12px, 1.3vw, 16px) clamp(24px, 2.5vw, 36px)',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${O}, ${OD})`,
                border: 'none', color: '#fff',
                fontSize: 'clamp(13px, 1.2vw, 16px)',
                fontWeight: 800, cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
                boxShadow: `0 4px 20px ${O}40`,
              }}
            >
              Starta →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/modules/fastigheten')}
              style={{
                padding: 'clamp(12px, 1.3vw, 16px) clamp(16px, 1.8vw, 24px)',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'clamp(12px, 1vw, 15px)',
                fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              ← Alla kapitel
            </motion.button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobil */}
    <div className="lg:hidden flex flex-col h-full overflow-y-auto">
      <div className="w-full flex-shrink-0" style={{ height: 200 }}>
        <img src={bild} alt="" className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
      </div>
      <div className="flex-1 px-6 py-8">
        <div style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</div>
        <p style={{
          fontSize: 10, fontWeight: 800, letterSpacing: '0.2em',
          textTransform: 'uppercase' as const, color: O, marginBottom: 8,
        }}>
          Fastigheten · {rubrik}
        </p>
        <h2 style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, marginBottom: 12,
        }}>
          {rubrik}
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28 }}>
          {desc}
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(1)}
            style={{
              padding: '13px 28px', borderRadius: 14,
              background: `linear-gradient(135deg, ${O}, ${OD})`,
              border: 'none', color: '#fff', fontSize: 14,
              fontWeight: 800, cursor: 'pointer',
            }}
          >
            Starta →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/modules/fastigheten')}
            style={{
              padding: '13px 20px', borderRadius: 14,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.65)', fontSize: 13,
              fontWeight: 700, cursor: 'pointer',
            }}
          >
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
    // ── 16: Kapitel-intro ─────────────────────────────────
    {
      id: 'kap-energi', title: '⚡ Kapitel 3: Energi & miljö',
      component: <KapitelIntro emoji="⚡" rubrik="Energi & miljö" slideNr={3} total={4}
        desc="Energideklaration, solceller och laddstolpar — hållbarhet och lagkrav i praktiken."
        bild={IMGS.energi} />,
    },

    // ── 17: Energideklaration ─────────────────────────────
    {
      id: 'energi', title: '🏠 Energideklaration',
      component: (
        <SlideH bild={IMGS.energi} bildBg="#0a1a0a"
          badge="Kapitel 3 · Energi & miljö"
          title={"Energideklaration — <span style='color:#FF5421'>lagkrav vart 10:e år</span>"}
          ingress="Energideklarationen är obligatorisk för flerbostadshus och beskriver byggnadens energianvändning. Den ska uppdateras vart 10:e år och finnas tillgänglig vid försäljning."
          punkter={[
            '<strong>Vad ingår?</strong> — energiprestanda (kWh/m²/år), energiklass (A–G), rekommenderade åtgärder och uppgifter om uppvärmningssystem.',
            '<strong>Vart 10:e år obligatoriskt</strong> — Boverket håller register. Försenad deklaration kan ge föreläggande.',
            '<strong>Tillgänglig för köpare</strong> — vid försäljning av bostadsrätt ska energideklarationen finnas tillgänglig. Mäklare begär den.',
            '<strong>Certifierad energiexpert</strong> — deklarationen ska göras av ackrediterad expert registrerad hos Boverket.',
            '<strong>Åtgärdsrekommendationerna</strong> — tar ut ofta möjligheter till energieffektivisering. Koppla till underhållsplanen.',
          ]}
        >
          <InfoBox title="Kontrollera nu">
            Gå in på Boverkets register (boverket.se) och kontrollera när er energideklaration gjordes. Är den äldre än 10 år — boka ny omedelbart.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 18: Solceller & laddstolpar ───────────────────────
    {
      id: 'solceller', title: '☀️ Solceller & laddstolpar',
      component: (
        <SlideA bild={IMGS.solceller} badge="Kapitel 3 · Energi & miljö"
          title={"Solceller & laddstolpar — <span style='color:#FF5421'>rätt beslut, rätt process</span>"}
        >
          <Ingress>
            Solceller och laddstolpar är vanliga investeringsfrågor i BRF. Båda kräver rätt process — och styrelsen måste känna till vad de har rätt att besluta och vad som kräver stämmobeslut.
          </Ingress>
          <TwoCol
            left={<FrameBox title="☀️ Solceller">
              <CheckItem>Normalt ingen bygglovsplikt — om de följer takets form och max 20 cm</CheckItem>
              <CheckItem>Stämmobeslut rekommenderas vid större investering</CheckItem>
              <CheckItem>Skattereduktion för mikroproduktion söks via Skatteverket</CheckItem>
              <CheckItem>Nätavtal med elnätsbolag krävs för inmatning</CheckItem>
              <CheckItem>Kontrollera detaljplan och kulturminnesmärkning</CheckItem>
            </FrameBox>}
            right={<FrameBox title="⚡ Laddstolpar">
              <CheckItem>Bostadsrättsinnehavare har rätt att installera i sin P-plats</CheckItem>
              <CheckItem>Styrelsen kan inte neka utan sakliga skäl</CheckItem>
              <CheckItem>Styrelsen kan ange tekniska krav på installationen</CheckItem>
              <CheckItem>Kräver utredning av elnätets kapacitet</CheckItem>
              <CheckItem>Föreningen kan erbjuda gemensam laddlösning — effektivare</CheckItem>
            </FrameBox>}
          />
          <InfoBox title="Gemensam laddlösning">
            En samlad laddlösning för hela föreningen är ofta billigare och mer driftsäker än individuella installationer. Begär offert från laddoperatör och presentera för stämman.
          </InfoBox>
        </SlideA>
      ),
    },

    // ── 19: Scenario solceller ────────────────────────────
    {
      id: 'sc-solceller', title: '📋 Scenario: Solceller på taket',
      component: (
        <Scenario slideId="sc-solceller" bild={P.lars} personNamn="Lars" personRoll="Ordförande, BRF Solgården"
          titel="Lars vill installera" accentTitel="solceller" badge="Scenario · Energi"
          steg={[
            {
              rubrik: 'Fråga 1 — Beslutsprocess',
              bubbla: 'Vi har fått en offert på solceller — 280 000 kr. Kan styrelsen besluta om det eller måste vi till stämman?',
              fraga: 'Vem beslutar om en solcellsinvestering på 280 000 kr?',
              alternativ: [
                { text: 'Styrelsen kan alltid besluta om underhåll och förbättringar av fastigheten', korrekt: false, feedback: 'Inte alltid. Styrelsen sköter löpande förvaltning, men en investering på 280 000 kr som inte är ett underhållsbehov bör normalt tas till stämman.' },
                { text: 'Det beror på om det är att betrakta som underhåll eller ny investering — stämmobeslut rekommenderas', korrekt: true, feedback: 'Rätt. Solceller är inte underhåll utan en ny investering. Styrelsen kan initiera men stämmobeslut är god styrelsesed och rekommenderas starkt vid denna kostnadsnivå.' },
                { text: 'Stämmobeslut med 2/3 majoritet krävs alltid för fastighetsförbättringar', korrekt: false, feedback: 'Fel. Det finns inget generellt krav på 2/3 för fastighetsförbättringar. Men information till stämman och ett stämmobeslut är god sed för större investeringar.' },
                { text: 'Revisorns godkännande krävs', korrekt: false, feedback: 'Fel. Revisorn granskar i efterhand — de godkänner inte investeringar i förväg.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Bygglov',
              bubbla: 'Stämman sa ja! Nu undrar installatören om vi behöver bygglov. Vår fastighet är från 1965 och har ett pulpettak.',
              fraga: 'Vad gäller angående bygglov för solceller?',
              alternativ: [
                { text: 'Alltid bygglov för fastigheter äldre än 20 år', korrekt: false, feedback: 'Fel. Bygglovsplikten beror inte på fastighetens ålder utan på om solcellerna ändrar byggnadens utseende väsentligt.' },
                { text: 'Aldrig bygglov — solceller är alltid undantagna', korrekt: false, feedback: 'Fel. Det finns undantag. Kulturminnesmärkta byggnader, byggnader i särskilda miljöer och vissa detaljplaner kan kräva bygglov.' },
                { text: 'Troligen inget bygglov om panelerna följer takets form — men kolla med kommunen', korrekt: true, feedback: 'Rätt. Om solcellerna följer pulpettakets form och inte sticker ut mer än 20 cm är det normalt bygglovsbefriat. Men kontakta alltid kommunens bygglovsavdelning för ett förhandsbesked.' },
                { text: 'Bara strandskyddsområden kräver bygglov', korrekt: false, feedback: 'Fel. Strandskyddet handlar om andra frågor. Bygglovsplikten för solceller beror på lokala detaljplaner och hur installationen påverkar byggnadens utseende.' },
              ],
            },
          ]}
          tips={['Stämmobeslut vid investeringar > 100 000 kr — god styrelsesed', 'Kontakta alltid kommunen om bygglov innan beställning', 'Skattereduktion för överskottsel söks via Skatteverket', 'Begär alltid minst 3 offerter vid upphandling']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-solceller')} />
      ),
    },

    // ── 20: Scenario laddstolpar ──────────────────────────
    {
      id: 'sc-laddstolpar', title: '📋 Scenario: Laddstolpe-ansökan',
      component: (
        <Scenario slideId="sc-laddstolpar" bild={P.karin} personNamn="Karin" personRoll="Bostadsrättsinnehavare, BRF Tallbacken"
          titel="Karin ansöker om" accentTitel="laddstolpe" badge="Scenario · Laddstolpar"
          steg={[
            {
              rubrik: 'Fråga 1 — Rätten till laddpunkt',
              bubbla: 'Jag vill installera en laddpunkt för min elbil på min parkeringsplats. Styrelsen har nekat med motiveringen att det är för krångligt. Har de rätt?',
              fraga: 'Kan styrelsen neka Karins laddpunktsansökan?',
              alternativ: [
                { text: 'Ja — styrelsen bestämmer om fastighetens tekniska utrustning', korrekt: false, feedback: 'Fel. Sedan 2022 har bostadsrättsinnehavare en lagstadgad rätt att installera laddpunkt på sin parkeringsplats. Styrelsen kan inte neka utan sakliga skäl.' },
                { text: 'Nej — bostadsrättsinnehavare har lagstadgad rätt att installera laddpunkt', korrekt: true, feedback: 'Rätt. Sedan 1 oktober 2022 gäller att bostadsrättsinnehavare med egen parkeringsplats har rätt att installera laddpunkt. Styrelsen kan ange tekniska krav men kan inte neka utan sakliga skäl.' },
                { text: 'Beror på om det finns kapacitet i elnätet', korrekt: false, feedback: 'Delvis — nätkapacitet kan vara ett sakligt skäl för att senarelägga men inte neka permanent. Styrelsen måste utreda och lösa kapacitetsfrågan.' },
                { text: 'Frågan avgörs av stämman', korrekt: false, feedback: 'Fel. Det är inte en stämmofråga. Det är en rättighet som bostadsrättsinnehavaren har enligt lag.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Tekniska krav',
              bubbla: 'OK, styrelsen måste godkänna. Men vi vill säkerställa att installationen görs rätt. Vad kan styrelsen kräva?',
              fraga: 'Vad har styrelsen rätt att kräva av Karin?',
              alternativ: [
                { text: 'Ingenting — Karin bestämmer helt fritt hur installationen görs', korrekt: false, feedback: 'Fel. Styrelsen har rätt att ange tekniska krav för att säkerställa säkerhet, estetik och att elnätet inte överbelastas.' },
                { text: 'Att en auktoriserad elektriker utför installationen och att tekniska krav följs', korrekt: true, feedback: 'Rätt. Styrelsen kan och bör ange tekniska krav: auktoriserad elektriker, godkänd utrustning, anslutning på rätt sätt. Dokumentera kraven skriftligt.' },
                { text: 'Att Karin betalar hela föreningens elnätsuppgradering', korrekt: false, feedback: 'Fel. Karin kan inte tvingas bekosta uppgradering av elnätet för hela föreningen. Hon betalar sin installation — föreningens elnätskapacitet är föreningens ansvar.' },
                { text: 'Att stämman godkänner varje enskild installation', korrekt: false, feedback: 'Fel. Det är en rättighet — inte en stämmofråga per installation. Styrelsen kan ta fram en övergripande policy som stämman godkänner.' },
              ],
            },
          ]}
          tips={['Sedan 2022 har boende rätt att installera laddpunkt — styrelsen kan inte neka', 'Styrelsen kan ange tekniska krav — gör det skriftligt', 'Utred elnätets kapacitet proaktivt — vänta inte på ansökningar', 'En gemensam laddlösning är ofta mer kostnadseffektiv']}
          onComplete={handleComplete} isDone={completedLessons.has('sc-laddstolpar')} />
      ),
    },

    // ── 21: Quiz kapitel 3 ────────────────────────────────
    {
      id: 'quiz-energi', title: '🧠 Quiz: Energi & miljö',
      component: <QuizSlide quizId="quiz-energi" bild={IMGS.solceller} badge="Quiz · Kapitel 3 · Energi" rubrik="Testa dina energikunskaper" questions={quizEnergi} />,
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
          <span className="text-xs font-bold" style={{ color: O }}>⚡ Energi & miljö</span>
          <div className="flex gap-2">
          <motion.button onClick={() => navigate('/modules/fastigheten-underhall')}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)' }}>
            ← Föregående
          </motion.button>
          <motion.button onClick={() => navigate('/modules/fastigheten-drift')}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
            Praktisk drift →
          </motion.button>
          </div>
        </div>
        <CourseHeader isSidebarMinimized={false} isDesktop={isDesktop}
          userName={userData.name} userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }} />
      </div>
      <SlideSidebar slides={slides} currentIndex={currentIndex}
        completedLessons={completedLessons} onNavigate={setCurrentIndex}
        courseTitle="Energi & miljö" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
  onNavigate={setCurrentIndex} showHeader={false}>
  {slides[currentIndex].component}
</ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={[{ question: 'Energideklaration?', answer: 'Obligatorisk — vart 10:e år.' }, { question: 'Bygglov solceller?', answer: 'Vanligtvis inte om de följer takets form.' }, { question: 'Neka laddstolpar?', answer: 'Nej — lagstadgad rätt sedan 2022.' }]}
        title="Frågor om energi & miljö"
        subtitle="Energideklaration, solceller och laddstolpar."
        buttonColor={O} />
    </div>
  );
};

export default ModuleFastighetenEnergi;