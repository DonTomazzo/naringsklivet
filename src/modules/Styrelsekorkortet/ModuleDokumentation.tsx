// src/modules/Styrelsekorkortet/ModuleDokumentation.tsx
// Kurs: Föreningens dokumentation
// Målgrupp: Förtroendevalda i bostadsrättsföreningar
// Längd: 45–60 min | 20 slides — innehåll + scenario per avsnitt

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

// ════════════════════════════════════════════════════════
// SCENARIO-KOMPONENT (inline — samma design som ScenarioAndrahand)
// ════════════════════════════════════════════════════════
interface Alternativ { text: string; korrekt: boolean; feedback: string; }
interface ScenarioSteg {
  rubrik: string;
  bubbla: string;
  fraga: string;
  alternativ: Alternativ[];
}
interface ScenarioProps {
  bild: string;
  personEmoji: string;
  personNamn: string;
  personRoll: string;
  titel: string;
  accentTitel: string;
  badge: string;
  steg: ScenarioSteg[];
  tips: string[];
  onComplete?: (id: string) => void;
  isDone?: boolean;
  slideId: string;
}

function AlternativKnapp({ alt, valt, visar, onVälj }: {
  alt: Alternativ; valt: string | null; visar: boolean; onVälj: (id: string) => void;
}) {
  const isValt = valt === alt.text;
  const visaRes = visar && isValt;
  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { x: 3 } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 12,
        background: visaRes ? (alt.korrekt ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.10)') : isValt ? OL : '#fff',
        border: `1.5px solid ${visaRes ? (alt.korrekt ? '#22c55e' : '#ef4444') : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 0 0 3px ${O}20` : 'none',
      }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
        background: visaRes ? (alt.korrekt ? '#22c55e' : '#ef4444') : isValt ? O : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 900, color: isValt || visaRes ? '#fff' : '#9ca3af',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : null}
      </div>
      <p style={{ fontSize: 13, color: visaRes ? (alt.korrekt ? '#15803d' : '#b91c1c') : '#1f2937', lineHeight: 1.5, flex: 1, fontFamily: "'Nunito', sans-serif" }}>
        {alt.text}
      </p>
    </motion.button>
  );
}

function Scenario({ bild, personEmoji, personNamn, personRoll, titel, accentTitel, badge, steg, tips, onComplete, isDone, slideId }: ScenarioProps) {
  const [stegIdx, setStegIdx]   = useState(0);
  const [fas, setFas]           = useState<'quiz'|'avslut'>('quiz');
  const [valt, setValt]         = useState<string|null>(null);
  const [visar, setVisar]       = useState(false);
  const [felCount, setFelCount] = useState(0);
  const videoRef                = useRef<HTMLVideoElement>(null);

  const aktivSteg = steg[stegIdx];

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = aktivSteg.alternativ.find(a => a.text === text)!;
    setValt(text);
    setVisar(true);
    if (!alt.korrekt) setFelCount(f => f + 1);
  };

  const handleNästa = () => {
    if (stegIdx < steg.length - 1) {
      setStegIdx(i => i + 1); setValt(null); setVisar(false);
    } else {
      setFas('avslut');
      onComplete?.(slideId);
    }
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
        {/* Vänster */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 40px', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: '4px 12px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>{badge}</div>
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.15, marginBottom: 4 }}>
            {titel}<br /><span style={{ color: O }}>{accentTitel}</span>
          </h2>

          {/* Person + pratbubbla */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 380 }}>
            <img src={bild} alt={personNamn}
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${O}`, boxShadow: `0 0 24px ${O}40` }} />
            <AnimatePresence mode="wait">
              <motion.div key={stegIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div style={{ padding: '14px 18px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, fontFamily: "'Nunito', sans-serif" }}>
                    "{aktivSteg.bubbla}"
                  </p>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, paddingLeft: 4, fontFamily: "'Nunito', sans-serif" }}>
                  {personNamn} · {personRoll}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 6 }}>
            {steg.map((_, i) => (
              <div key={i} style={{ width: i === stegIdx ? 24 : 8, height: 8, borderRadius: 4, background: i <= stegIdx ? O : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>

        {/* Höger — vit panel */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {fas === 'quiz' ? (
              <motion.div key={`steg-${stegIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: O, marginBottom: 10, fontFamily: "'Nunito', sans-serif" }}>
                  {aktivSteg.rubrik} · {stegIdx + 1}/{steg.length}
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif", marginBottom: 20 }}>
                  {aktivSteg.fraga}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                  {aktivSteg.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
                <AnimatePresence>
                  {visar && valtAlt && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 18,
                        background: valtAlt.korrekt ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                        border: `1.5px solid ${valtAlt.korrekt ? '#22c55e50' : '#ef444450'}`,
                        display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      {valtAlt.korrekt
                        ? <CheckCircle size={18} style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
                        : <XCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />}
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, fontFamily: "'Nunito', sans-serif" }}>{valtAlt.feedback}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {visar && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                    style={{ width: '100%', padding: '14px', borderRadius: 14, cursor: 'pointer',
                      background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 4px 16px ${O}35`,
                      border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif",
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {stegIdx < steg.length - 1 ? <>Nästa fråga <ChevronRight size={16} /></> : <>Se sammanfattning <ChevronRight size={16} /></>}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div key="avslut" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontSize: 44, marginBottom: 10 }}>🎯</div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1f2937', fontFamily: "'Nunito', sans-serif", marginBottom: 6 }}>Bra jobbat!</h3>
                  <p style={{ fontSize: 13, color: felCount === 0 ? '#15803d' : '#6b7280' }}>
                    {felCount === 0 ? 'Perfekt — inga fel!' : `${felCount} fel av ${steg.length} frågor.`}
                  </p>
                </div>
                <div style={{ padding: '16px 20px', borderRadius: 16, background: OL, border: `1px solid ${O}25`, marginBottom: 18 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, marginBottom: 10 }}>Kom ihåg</p>
                  {tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 6 }} />
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif" }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleOm}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, cursor: 'pointer',
                    background: '#f3f4f6', border: '1.5px solid #e5e7eb', color: '#6b7280',
                    fontSize: 13, fontWeight: 700, fontFamily: "'Nunito', sans-serif",
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
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
          <div style={{ padding: '3px 10px', borderRadius: 20, background: `${O}22`, border: `1px solid ${O}40`, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>{badge}</div>
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
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, marginBottom: 8 }}>{aktivSteg.rubrik}</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, marginBottom: 16, fontFamily: "'Nunito', sans-serif" }}>{aktivSteg.fraga}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {aktivSteg.alternativ.map(alt => (
                  <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                ))}
              </div>
              {visar && valtAlt && (
                <div style={{ padding: '11px 14px', borderRadius: 10, marginBottom: 12,
                  background: valtAlt.korrekt ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                  border: `1px solid ${valtAlt.korrekt ? '#22c55e50' : '#ef444450'}`,
                  display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {valtAlt.korrekt ? <CheckCircle size={15} style={{ color: '#22c55e', flexShrink: 0 }} /> : <XCircle size={15} style={{ color: '#ef4444', flexShrink: 0 }} />}
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.55 }}>{valtAlt.feedback}</p>
                </div>
              )}
              {visar && (
                <button onClick={handleNästa}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, cursor: 'pointer',
                    background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none',
                    color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
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
// KURSDATA
// ════════════════════════════════════════════════════════
export const courseData = {
  learningPoints: [
    'Känna till vilka grunddokument varje BRF måste ha',
    'Förstå skillnaden mellan stadgar, ekonomisk plan och årsredovisning',
    'Veta vad som ska finnas i ett korrekt stämmo- och styrelseprotokoll',
    'Hantera personuppgifter och GDPR rätt i föreningen',
    'Ha koll på bevarandetider för olika typer av dokument',
    'Genomföra ett korrekt styrelsebyte med dokumentöverlämning',
    'Undvika de vanligaste dokumentationsmissarna',
  ],
  forWho: [
    'Nya och erfarna styrelseledamöter i BRF',
    'Ordföranden och sekreterare',
    'Revisorer och valberedning',
    'Alla som vill förstå föreningens juridiska dokumentation',
  ],
  modules: [
    { title: 'Introduktion',                     duration: '3 min',  free: true  },
    { title: 'Stadgarna',                         duration: '4 min',  free: true  },
    { title: '📋 Scenario: Stadgeändring',        duration: '3 min',  free: true  },
    { title: 'Ekonomisk plan & upplåtelseavtal',  duration: '4 min',  free: true  },
    { title: '📋 Scenario: Avgiftshöjning',       duration: '3 min',  free: false },
    { title: 'Lägenhetsförteckning',              duration: '3 min',  free: false },
    { title: '📋 Scenario: Ny innehavare',        duration: '3 min',  free: false },
    { title: 'Stämmoprotokoll',                   duration: '4 min',  free: false },
    { title: '📋 Scenario: Klanderfristen',       duration: '3 min',  free: false },
    { title: 'Styrelseprotokoll',                 duration: '4 min',  free: false },
    { title: '📋 Scenario: Jäv i styrelsen',      duration: '3 min',  free: false },
    { title: 'Årsredovisning',                    duration: '4 min',  free: false },
    { title: '📋 Scenario: Ansvarsfrihet',        duration: '3 min',  free: false },
    { title: 'Underhållsplan',                    duration: '3 min',  free: false },
    { title: '📋 Scenario: Akut takläcka',        duration: '3 min',  free: false },
    { title: 'GDPR & personuppgifter',            duration: '3 min',  free: false },
    { title: '📋 Scenario: PUB-avtal',            duration: '3 min',  free: false },
    { title: 'Arkivering & bevarandetider',       duration: '3 min',  free: false },
    { title: '📋 Scenario: Styrelsebyte',         duration: '3 min',  free: false },
    { title: 'Slutquiz',                          duration: '5 min',  free: false },
    { title: 'Sammanfattning',                    duration: '2 min',  free: false },
  ],
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'Kursledare — Styrelsekörkortet',
    img:   '/founder.png',
    bio:   'Tomas Mauritzson har 15+ års erfarenhet av styrelsearbete, föreningsjuridik och utbildning. Grundare av Styrelsekörkortet — den enda utbildningen i Sverige skräddarsydd för BRF-styrelser.',
  },
  faq: [
    { question: 'Hur länge måste vi spara styrelseprotokoll?', answer: 'Styrelseprotokoll bör sparas minst 10 år — permanent rekommenderas. De kan behövas vid tvister, revisioner och överlåtelser lång tid efter att besluten fattades.' },
    { question: 'Vem har rätt att läsa styrelseprotokollen?', answer: 'Styrelseprotokoll är interna — bara styrelseledamöter har automatisk rätt. Stämmoprotokoll är alltid tillgängliga för alla medlemmar.' },
    { question: 'Måste stadgarna registreras hos Bolagsverket?', answer: 'Ja — stadgar och stadgeändringar måste registreras för att gälla. En ändring träder inte i kraft förrän den är registrerad.' },
    { question: 'Vad är skillnaden på ekonomisk plan och budget?', answer: 'Den ekonomiska planen är ett juridiskt grunddokument registrerat hos Bolagsverket. Budgeten är ett internt styrdokument som sätts varje år.' },
    { question: 'Vad är ett PUB-avtal?', answer: 'Personuppgiftsbiträdesavtal — ett skriftligt avtal med alla externa leverantörer som hanterar föreningens personuppgifter. Krävs enligt GDPR.' },
  ],
};

// ════════════════════════════════════════════════════════
// BILDER & PERSONBILDER
// ════════════════════════════════════════════════════════
const IMGS = {
  intro:      'https://images.unsplash.com/photo-1568695174537-f4e4f8b73688?w=1280&q=80',
  stadgar:    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
  ekonomi:    'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1280&q=80',
  lagenheter: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1280&q=80',
  stamman:    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1280&q=80',
  protokoll:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80',
  arsred:     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&q=80',
  underhall:  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&q=80',
  gdpr:       'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1280&q=80',
  arkiv:      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1280&q=80',
  avslut:     'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&q=80',
};

const PERSONER = {
  lars:    'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
  maria:   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  anna:    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  erik:    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  karin:   'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
  stefan:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  lena:    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  anders:  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
};

// ════════════════════════════════════════════════════════
// QUIZ-FRÅGOR (slutquiz)
// ════════════════════════════════════════════════════════
const slutquiz = [
  { id: 'sq1', question_text: 'Vilka dokument ska bevaras permanent i en BRF?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Bara årsredovisningarna', 'Stadgar, ekonomisk plan, upplåtelseavtal och stämmoprotokoll', 'Alla dokument äldre än 10 år', 'Styrelseprotokoll och budgetar'] }, correct_answer: 'Stadgar, ekonomisk plan, upplåtelseavtal och stämmoprotokoll', explanation: 'Dessa fyra är föreningens juridiska grundvalar och kan behövas långt i framtiden.', points: 100 },
  { id: 'sq2', question_text: 'Vad krävs för att den ekonomiska planen ska vara giltig?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Styrelsens underskrift', 'Revisorns godkännande', 'Intygande av två Boverket-godkända intygsgivare', 'Godkännande på stämman'] }, correct_answer: 'Intygande av två Boverket-godkända intygsgivare', explanation: 'Utan giltig ekonomisk plan kan bostadsrätter inte upplåtas.', points: 100 },
  { id: 'sq3', question_text: 'Har alla medlemmar rätt att läsa styrelseprotokoll?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Ja — alla föreningshandlingar är offentliga', 'Nej — styrelseprotokoll är interna handlingar', 'Ja — men bara senaste 12 månader', 'Det beror på vad stämman beslutat'] }, correct_answer: 'Nej — styrelseprotokoll är interna handlingar', explanation: 'Styrelseprotokoll är interna. Stämmoprotokoll ska däremot hållas tillgängliga för alla medlemmar.', points: 100 },
  { id: 'sq4', question_text: 'Hur länge ska bokföringsmaterial sparas enligt bokföringslagen?', question_type: 'single_choice' as const, question_order: 4, options: { choices: ['3 år', '5 år', '7 år', '10 år'] }, correct_answer: '7 år', explanation: 'Bokföringsmaterial inkl. fakturor och kvitton ska sparas minst 7 år.', points: 100 },
  { id: 'sq5', question_text: 'Vad är ett PUB-avtal?', question_type: 'single_choice' as const, question_order: 5, options: { choices: ['Ansvarsfördelning inom styrelsen', 'Avtal med externa leverantörer som hanterar föreningens personuppgifter', 'GDPR-policy för hemsidan', 'Revisorns sekretessavtal'] }, correct_answer: 'Avtal med externa leverantörer som hanterar föreningens personuppgifter', explanation: 'PUB-avtal krävs med t.ex. förvaltare, bokningssystem och låssystem. Utan det bryter föreningen mot GDPR.', points: 100 },
  { id: 'sq6', question_text: 'Inom hur många månader kan ett stämmobeslut klandras i domstol?', question_type: 'single_choice' as const, question_order: 6, options: { choices: ['1 månad', '3 månader', '6 månader', '1 år'] }, correct_answer: '3 månader', explanation: 'Klanderfristen är 3 månader från stämmodagen. Efter det kan beslutet inte längre överklagas i domstol.', points: 100 },
];

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
const ModuleDokumentation: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Ledamot', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const allDone = ['sc-stadgar','sc-ekonomi','sc-lagenheter','sc-stamman','sc-protokoll','sc-arsred','sc-underhall','sc-gdpr','sc-arkivering','slutquiz'].every(id => completedLessons.has(id));

  const slides = [

    // ── 0: Intro ─────────────────────────────────────────
    {
      id: 'intro', title: 'Välkommen',
      component: (
        <div className="h-full flex overflow-hidden bg-white">
          <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto">
            <div className="w-full px-8 sm:px-12 py-10">
              <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
                <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white" style={{ background: O }}>
                Styrelsekörkortet · Dokumentation · 45–60 min
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Föreningens <span style={{ color: O }}>dokumentation</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Rätt dokument, rätt plats, rätt tid. Varje avsnitt följs av ett verklighetsnära scenario — för att du ska kunna tillämpa kunskapen direkt.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Grunddokumenten — stadgar, ekonomisk plan, upplåtelseavtal',
                  'Löpande dokumentation — protokoll och årsredovisning',
                  'GDPR och personuppgifter i föreningen',
                  'Bevarandetider och säker arkivering',
                  '8 verklighetsnära scenarier att testa dig på',
                ].map((p, i) => (
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

    // ── 1: Stadgarna ─────────────────────────────────────
    {
      id: 'stadgar', title: '📜 Stadgarna',
      component: (
        <SlideH bild={IMGS.stadgar} bildBg="#1e2d4a"
          badge="Avsnitt 1 · Grunddokumenten"
          title={"Stadgarna — föreningens <span style='color:#FF5421'>grundlag</span>"}
          ingress="Stadgarna styr allt — hur styrelsen väljs, hur avgifter sätts och vad som krävs för att ändra reglerna. Alla styrelsebeslut måste vara förenliga med stadgarna."
          punkter={[
            '<strong>Vad regleras?</strong> — föreningens namn, ändamål, styrelsens sammansättning, stämmoregler, rösträttsregler och hur stadgarna ändras.',
            '<strong>Ändring kräver 2/3 majoritet</strong> — ofta på två på varandra följande stämmor. Träder inte i kraft förrän registrerat hos Bolagsverket.',
            '<strong>Gamla stadgar är en risk</strong> — många föreningar har stadgar från 1970–90-talen som inte stämmer med gällande lag. Granska minst vart femte år.',
            '<strong>Registrering är obligatorisk</strong> — skicka med vid överlåtelser, till mäklare och publicera gärna för alla boende.',
          ]}
        >
          <InfoBox title="Praktisk regel">
            Lägg stadgarna i en delad digital mapp. En styrelse som håller stadgarna tillgängliga undviker många onödiga konflikter.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 2: Scenario stadgar ───────────────────────────────
    {
      id: 'sc-stadgar', title: '📋 Scenario: Stadgeändring',
      component: (
        <Scenario
          slideId="sc-stadgar"
          bild={PERSONER.lars}
          personEmoji="👨"
          personNamn="Lars"
          personRoll="Ordförande, BRF Ekbacken"
          titel="Lars vill ändra"
          accentTitel="stadgarna"
          badge="Scenario · Stadgar"
          steg={[
            {
              rubrik: 'Fråga 1 — Beslutsprocess',
              bubbla: 'Vi vill ändra stadgarna så att bara ordföranden behöver skriva under avtal. Kan vi besluta det på nästa styrelsemöte?',
              fraga: 'Hur fattas beslut om stadgeändring?',
              alternativ: [
                { text: 'Ja — styrelsen kan ändra stadgarna på ett styrelsemöte', korrekt: false, feedback: 'Fel. Styrelsen kan aldrig ändra stadgarna. Det kräver beslut på föreningsstämman med kvalificerad majoritet.' },
                { text: 'Nej — det krävs beslut på föreningsstämma med minst 2/3 majoritet', korrekt: true, feedback: 'Rätt! Stadgeändring kräver beslut på stämma med kvalificerad majoritet — ofta 2/3 av rösterna. Styrelsen kan bara föreslå, inte besluta.' },
                { text: 'Ja — om alla styrelseledamöter är eniga räcker det', korrekt: false, feedback: 'Fel. Stadgar beslutas av medlemmarna på stämman — inte av styrelsen. Enhällighet i styrelsen spelar ingen roll.' },
                { text: 'Nej — det krävs godkännande från Bolagsverket först', korrekt: false, feedback: 'Delvis fel. Bolagsverket registrerar ändringen efter stämmobeslutet — de godkänner inte i förväg.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Ikraftträdande',
              bubbla: 'Stämman röstade ja med 2/3 majoritet. Nu kan vi börja tillämpa de nya stadgarna direkt?',
              fraga: 'När träder en stadgeändring i kraft?',
              alternativ: [
                { text: 'Direkt när stämman röstat ja', korrekt: false, feedback: 'Fel. Stämmobeslutet räcker inte — ändringen måste registreras hos Bolagsverket innan den gäller.' },
                { text: 'Från nästa räkenskapsår', korrekt: false, feedback: 'Fel. Det finns ingen automatisk koppling till räkenskapsår. Det är registreringen hos Bolagsverket som gäller.' },
                { text: 'Först efter registrering hos Bolagsverket', korrekt: true, feedback: 'Rätt! En stadgeändring träder inte i kraft förrän den är registrerad hos Bolagsverket. Skicka in protokollet från stämman och de nya stadgarna direkt.' },
                { text: 'När revisorerna har godkänt ändringen', korrekt: false, feedback: 'Fel. Revisorn granskar förvaltningen — de godkänner inte stadgeändringar.' },
              ],
            },
          ]}
          tips={[
            'Styrelsen kan aldrig ändra stadgarna — bara stämman',
            'Kräver 2/3 majoritet (kontrollera era egna stadgar — kan vara hårdare krav)',
            'Registrera hos Bolagsverket direkt efter stämman — ändringen gäller inte förrän',
            'Spara alla gamla versioner av stadgarna — de kan behövas vid tvister',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-stadgar')}
        />
      ),
    },

    // ── 3: Ekonomisk plan & upplåtelseavtal ──────────────
    {
      id: 'ekonomisk-plan', title: '📊 Ekonomisk plan & upplåtelseavtal',
      component: (
        <SlideB bild={IMGS.ekonomi}
          badge="Avsnitt 2 · Grunddokumenten"
          title={"Två dokument som <span style='color:#FF5421'>grundar föreningen</span>"}
        >
          <Ingress>
            Den ekonomiska planen och upplåtelseavtalet upprättas när föreningen bildas. De är juridiska grunddokument som ska bevaras permanent.
          </Ingress>
          <div className="space-y-4 mb-5">
            <div className="rounded-2xl p-4 border" style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>📊 Ekonomisk plan</p>
              <StegRad nr="1" titel="Juridiskt grunddokument" desc="Upprättas vid bildandet. Registreras hos Bolagsverket. Beskriver fastighetens värde, lånens storlek och avgiftsberäkning." />
              <StegRad nr="2" titel="Intygsgivare krävs" desc="Måste intygas av två Boverket-godkända intygsgivare. Utan giltig plan kan bostadsrätter inte upplåtas." />
              <StegRad nr="3" titel="Uppdatering vid väsentliga förändringar" desc="Vid stora nyupplåningar eller omstrukturering. Kräver ny intygsgivarprövning och registrering." />
            </div>
            <div className="rounded-2xl p-4 border" style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>🔑 Upplåtelseavtal</p>
              <StegRad nr="1" titel="Ett avtal per lägenhet" desc="Anger lägenhet, insats, upplåtelsedatum och villkor. Knutet till lägenheten — inte personen." />
              <StegRad nr="2" titel="Kvarstår vid överlåtelse" desc="Vid försäljning träder ny innehavare in. Avtalet ändras inte." />
              <StegRad nr="3" titel="Bevara permanent + digitalisera" desc="Föreningen bevarar kopior. Digitalisera gamla pappersavtal med backup." />
            </div>
          </div>
          <InfoBox title="Skillnad mot budgeten">
            Den ekonomiska planen är ett juridiskt grunddokument — budgeten är ett internt styrdokument. Förväxla dem inte.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 4: Scenario ekonomisk plan ────────────────────────
    {
      id: 'sc-ekonomi', title: '📋 Scenario: Avgiftshöjning',
      component: (
        <Scenario
          slideId="sc-ekonomi"
          bild={PERSONER.maria}
          personEmoji="👩"
          personNamn="Maria"
          personRoll="Bostadsrättsägare, BRF Linden"
          titel="Maria frågar om"
          accentTitel="avgiftshöjningen"
          badge="Scenario · Ekonomisk plan"
          steg={[
            {
              rubrik: 'Fråga 1 — Vad styr avgiften?',
              bubbla: 'Varför höjdes avgiften med 15% nu? Det stod ingenting om det när vi köpte! Är det mot reglerna?',
              fraga: 'Vad bestämmer hur avgiften beräknas och kan ändras?',
              alternativ: [
                { text: 'Avgiften är inlåst i upplåtelseavtalet och kan inte höjas', korrekt: false, feedback: 'Fel. Upplåtelseavtalet anger förutsättningarna men avgiften kan justeras av styrelsen utifrån föreningens ekonomi.' },
                { text: 'Styrelsen sätter avgiften fritt utan begränsningar', korrekt: false, feedback: 'Inte helt rätt. Styrelsen sätter avgiften men måste följa likhetsprincipen — alla ska behandlas lika i förhållande till sin andel.' },
                { text: 'Avgiften baseras på andelstal och föreningens ekonomiska behov — styrelsen beslutar', korrekt: true, feedback: 'Rätt! Styrelsen beslutar om avgiften utifrån föreningens kostnader och varje lägenhets andelstal. Den ekonomiska planen visar ursprunglig beräkning men avgiften justeras löpande.' },
                { text: 'Bolagsverket måste godkänna alla avgiftshöjningar', korrekt: false, feedback: 'Fel. Bolagsverket godkänner inte avgiftshöjningar. Det är styrelsens beslut.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Vad är andelstal?',
              bubbla: 'Grannens lägenhet är nästan lika stor men hen betalar mer. Hur hänger det ihop?',
              fraga: 'Vad avgör hur stor avgift en specifik lägenhet betalar?',
              alternativ: [
                { text: 'Lägenhetens storlek i kvadratmeter alltid', korrekt: false, feedback: 'Inte alltid. Det är andelstalet — inte enbart kvadratmeterna — som styr. Andelstal sätts vid bildandet och kan skilja sig från ren yta.' },
                { text: 'Andelstalet som fastställdes i den ekonomiska planen', korrekt: true, feedback: 'Rätt! Varje bostadsrätt tilldelas ett andelstal när föreningen bildas. Det speglar lägenhets andel av hela föreningens ekonomi — avgiften fördelas proportionellt.' },
                { text: 'Hur länge man bott i föreningen', korrekt: false, feedback: 'Fel. Boendetid påverkar inte avgiften. Andelstalet gäller oavsett.' },
                { text: 'Styrelsen bestämmer fritt per lägenhet', korrekt: false, feedback: 'Fel. Styrelsen kan inte sätta olika avgift godtyckligt — likhetsprincipen i BRL kräver att avgifterna fördelas efter andelstal.' },
              ],
            },
          ]}
          tips={[
            'Den ekonomiska planen visar ursprunglig beräkning — avgiften justeras löpande',
            'Andelstal fastställs vid bildandet och styr avgiftsfördelningen',
            'Likhetsprincipen: alla ska behandlas lika i förhållande till sin andel',
            'Styrelsen beslutar om avgiften — inget krav på stämmogodkännande',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-ekonomi')}
        />
      ),
    },

    // ── 5: Lägenhetsförteckning ───────────────────────────
    {
      id: 'lagenhetsforteckning', title: '📒 Lägenhetsförteckning',
      component: (
        <SlideE bild={IMGS.lagenheter}
          badge="Avsnitt 3 · Grunddokumenten"
          title="Lägenhetsförteckningen — ett <span style='color:#FF5421'>lagkrav</span>"
          punkter={[
            '<strong>BRL kräver det</strong> — styrelsen måste föra förteckning med innehavarens namn, adress, lägenhetsnummer, insats och överlåtelsedatum.',
            '<strong>Intern handling</strong> — innehavare har rätt att se egna uppgifter. Hela förteckningen lämnas inte ut okritiskt.',
            '<strong>GDPR-reglerad</strong> — innehåller personuppgifter. Kräver integritetspolicy och rutiner för radering.',
            '<strong>Uppdatera direkt vid överlåtelse</strong> — föreningens ansvar. Inte mäklarens eller köparens.',
            '<strong>Rätt system</strong> — förvaltarens system eller dedikerat register. Undvik Excel på privata datorer.',
          ]}
          fotnot="En felaktig lägenhetsförteckning kan orsaka allvarliga juridiska problem vid tvister om innehavet."
          fotnotColor={O}
        />
      ),
    },

    // ── 6: Scenario lägenhetsförteckning ─────────────────
    {
      id: 'sc-lagenheter', title: '📋 Scenario: Ny innehavare',
      component: (
        <Scenario
          slideId="sc-lagenheter"
          bild={PERSONER.anna}
          personEmoji="👩‍💼"
          personNamn="Anna"
          personRoll="Köpare, BRF Solbacken"
          titel="Anna har köpt"
          accentTitel="en bostadsrätt"
          badge="Scenario · Lägenhetsförteckning"
          steg={[
            {
              rubrik: 'Fråga 1 — Vem ansvarar?',
              bubbla: 'Jag köpte lägenheten för tre veckor sedan. Nu vill jag anmäla en felanmälan men förvaltaren säger att jag inte finns i registret. Vem har ansvaret?',
              fraga: 'Vems ansvar är det att lägenhetsförteckningen uppdateras?',
              alternativ: [
                { text: 'Mäklarens — de skickar automatiskt uppgifter till föreningen', korrekt: false, feedback: 'Fel. Mäklaren har inga lagstadgade skyldigheter gentemot föreningens register. Det är styrelseansvar.' },
                { text: 'Köparens — Anna borde ha meddelat föreningen', korrekt: false, feedback: 'Fel. Köparen ska visserligen söka medlemskap — men det är föreningens ansvar att registret är korrekt.' },
                { text: 'Styrelsens — de ska uppdatera förteckningen direkt vid varje överlåtelse', korrekt: true, feedback: 'Rätt! Styrelsen är ansvarig för att lägenhetsförteckningen uppdateras skyndsamt vid varje ägarbyte. Tre veckor utan uppdatering är för sent.' },
                { text: 'Förvaltarens — de sköter alla register', korrekt: false, feedback: 'Förvaltaren sköter ofta registret i praktiken, men det juridiska ansvaret ligger alltid på styrelsen.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Rätt rutin',
              bubbla: 'OK, vad ska styrelsen göra när en ny köpare meddelar att de köpt en lägenhet?',
              fraga: 'Vad är rätt rutin vid ett ägarbyte i BRF?',
              alternativ: [
                { text: 'Vänta tills tillträdesdagen och uppdatera då', korrekt: false, feedback: 'Inte optimalt. Styrelsen ska godkänna medlemskapet och uppdatera registret vid tillträdesdagen — men processen startar redan vid ansökan om medlemskap.' },
                { text: 'Godkänna medlemsansökan, uppdatera förteckningen och informera förvaltaren', korrekt: true, feedback: 'Rätt! Köparen ansöker om medlemskap, styrelsen godkänner, förteckningen uppdateras och förvaltaren informeras — allt helst i nära anslutning till tillträdet.' },
                { text: 'Be köparen skicka in alla dokument och hantera det vid nästa styrelsemöte', korrekt: false, feedback: 'För långsamt. Lägenhetsförteckningen ska uppdateras skyndsamt — att vänta till nästa möte skapar problem.' },
                { text: 'Inget behöver göras — förvaltaren sköter det automatiskt', korrekt: false, feedback: 'Fel. Styrelsen kan delegera praktiken till förvaltaren men kan inte ansvarsfriskriva sig.' },
              ],
            },
          ]}
          tips={[
            'Lägenhetsförteckningen ska uppdateras direkt vid varje överlåtelse',
            'Styrelsen är juridiskt ansvarig — kan delegera till förvaltaren men inte ansvaret',
            'Köparen ska ansöka om medlemskap — styrelsen godkänner',
            'Tre steg: godkänn medlemskap → uppdatera förteckning → informera förvaltare',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-lagenheter')}
        />
      ),
    },

    // ── 7: Stämmoprotokoll ────────────────────────────────
    {
      id: 'stammoprotokoll', title: '🗳️ Stämmoprotokoll',
      component: (
        <SlideH bild={IMGS.stamman} bildBg="#1e2d4a"
          badge="Avsnitt 4 · Löpande dokumentation"
          title={"Stämmoprotokollet — <span style='color:#FF5421'>offentlig handling</span>"}
          ingress="Stämmoprotokollet är föreningsstämmans officiella dokument. Till skillnad från styrelseprotokollet är det offentligt för alla medlemmar."
          punkter={[
            '<strong>Obligatoriskt innehåll</strong> — datum, plats, hur stämman tillkännagivits, antal röstberättigade, ordförande, sekreterare och varje beslut med omröstningsresultat.',
            '<strong>Justering skyndsamt</strong> — av ordföranden och minst en justeringsperson (inte sekreteraren). Normalt inom 2–4 veckor. Ojusterat protokoll har begränsad rättsverkan.',
            '<strong>Offentligt för alla medlemmar</strong> — publicera gärna digitalt. Skicka proaktivt — vänta inte på att de ska begära det.',
            '<strong>Klanderfristen 3 månader</strong> — felaktiga beslut kan klandras i domstol inom 3 månader från stämmodagen. Korrekt protokoll skyddar styrelsen.',
          ]}
        >
          <InfoBox title="Bra rutin">
            Skriv protokollet inom en vecka. Skicka ut direkt till alla — det bygger förtroende och minskar antalet frågor.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 8: Scenario stämmoprotokoll ───────────────────────
    {
      id: 'sc-stamman', title: '📋 Scenario: Klanderfristen',
      component: (
        <Scenario
          slideId="sc-stamman"
          bild={PERSONER.erik}
          personEmoji="👨‍⚖️"
          personNamn="Erik"
          personRoll="Medlem, BRF Kastanjen"
          titel="Erik är missnöjd med"
          accentTitel="ett stämmobeslut"
          badge="Scenario · Stämmoprotokoll"
          steg={[
            {
              rubrik: 'Fråga 1 — Rätten att klandra',
              bubbla: 'Stämman beslutade höja avgiften med 20% i april. Nu i oktober inser jag att beslutet kanske inte gick rätt till. Kan jag fortfarande klandra det?',
              fraga: 'Kan Erik fortfarande klandra beslutet i oktober?',
              alternativ: [
                { text: 'Ja — det finns ingen tidsgräns för att klandra stämmobeslut', korrekt: false, feedback: 'Fel. Det finns en tydlig tidsgräns — 3 månader från stämmodagen. Den kan inte förlängas.' },
                { text: 'Nej — klanderfristen är 3 månader och är nu passerad', korrekt: true, feedback: 'Rätt. Klanderfristen är 3 månader från stämmodagen. Om stämman hölls i april och det nu är oktober är fristen passerad — beslutet kan inte längre överklagas i domstol.' },
                { text: 'Ja — om han kan visa att protokollet var felaktigt', korrekt: false, feedback: 'Fel. Även om protokollet var bristfälligt gäller 3-månadersgränsen. Bevisbördan spelar ingen roll när fristen är gången.' },
                { text: 'Det beror på om avgiftshöjningen var orimlig', korrekt: false, feedback: 'Fel. Oavsett om höjningen var rimlig eller inte — 3 månader är en hård gräns. Efteråt är det bara att acceptera beslutet.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Protokollets roll',
              bubbla: 'Men styrelsen har ännu inte skickat ut protokollet från april! Påverkar det fristen?',
              fraga: 'Vad gäller om protokollet inte skickats ut inom rimlig tid?',
              alternativ: [
                { text: 'Fristen börjar inte löpa förrän protokollet är utskickat', korrekt: false, feedback: 'Fel. Klanderfristen räknas från stämmodagen — inte från när protokollet distribuerades.' },
                { text: 'Fristen räknas från stämmodagen oavsett när protokollet skickas', korrekt: true, feedback: 'Rätt. 3-månadersgränsen räknas från stämman. Att styrelsen dröjt med protokollet är ett separat problem — men det pausar inte klanderfristen.' },
                { text: 'Erik kan begära att stämman hålls om', korrekt: false, feedback: 'Fel. Man kan inte kräva att en stämma hålls om för att protokollet dröjt. Det är ett förvaltningsproblem, inte grund för omstämning.' },
                { text: 'Fristen förlängs automatiskt med 30 dagar', korrekt: false, feedback: 'Fel. Det finns ingen automatisk förlängning. 3 månader från stämman gäller alltid.' },
              ],
            },
          ]}
          tips={[
            'Klanderfristen är alltid 3 månader från stämmodagen — inte från protokolldistribution',
            'Skicka ut protokollet inom 2–4 veckor — annars missar medlemmar sin möjlighet att reagera',
            'Ojusterat protokoll har begränsad rättsverkan — justera snabbt',
            'Tillkännagivandet av stämman måste vara korrekt — annars kan beslutsfattigheten ifrågasättas',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-stamman')}
        />
      ),
    },

    // ── 9: Styrelseprotokoll ──────────────────────────────
    {
      id: 'styrelseprotokoll', title: '📝 Styrelseprotokoll',
      component: (
        <SlideA bild={IMGS.protokoll}
          badge="Avsnitt 5 · Löpande dokumentation"
          title={"Protokollet — ledamotens <span style='color:#FF5421'>juridiska försäkring</span>"}
        >
          <Ingress>
            Styrelseprotokollet dokumenterar besluten — inte diskussionerna. Det är styrelsens viktigaste interna dokument och skyddar ledamöterna vid tvist.
          </Ingress>
          <TwoCol
            left={
              <FrameBox title="✅ Måste finnas med">
                <CheckItem>Datum, plats och deltagare</CheckItem>
                <CheckItem>Att mötet var beslutsmässigt</CheckItem>
                <CheckItem>Vem som justerar protokollet</CheckItem>
                <CheckItem>Varje beslut som eget § med tydlig formulering</CheckItem>
                <CheckItem>Ansvarig och uppföljningsdatum per §</CheckItem>
                <CheckItem>Hur omröstningen föll vid oenighet</CheckItem>
                <CheckItem>Anmälan av jäv om relevant</CheckItem>
              </FrameBox>
            }
            right={
              <FrameBox title="❌ Behövs inte">
                <Bullet>Exakt vad varje ledamot sa</Bullet>
                <Bullet>Långa diskussioner ord för ord</Bullet>
                <Bullet>Personliga åsikter utan koppling till beslut</Bullet>
                <Bullet>Referat av information som inte ledde till beslut</Bullet>
              </FrameBox>
            }
          />
          <InfoBox title="Ledamotens skydd">
            En ledamot som röstat nej bör begära att en reservation antecknas i protokollet. Det skyddar ledamoten personligen.
          </InfoBox>
        </SlideA>
      ),
    },

    // ── 10: Scenario styrelseprotokoll (jäv) ─────────────
    {
      id: 'sc-protokoll', title: '📋 Scenario: Jäv i styrelsen',
      component: (
        <Scenario
          slideId="sc-protokoll"
          bild={PERSONER.karin}
          personEmoji="👩‍💼"
          personNamn="Karin"
          personRoll="Styrelseledamot, BRF Björken"
          titel="Karin befinner sig"
          accentTitel="i jäv"
          badge="Scenario · Styrelseprotokoll"
          steg={[
            {
              rubrik: 'Fråga 1 — Vad är jäv?',
              bubbla: 'Styrelsen ska besluta om att anlita ett städföretag. Det ägs av min bror. Jag tycker vi ska ta det — det är billigast. Kan jag delta i beslutet?',
              fraga: 'Är Karin jävig i detta ärende?',
              alternativ: [
                { text: 'Nej — hon har inte personlig ekonomisk vinning direkt', korrekt: false, feedback: 'Fel. Jäv gäller också när en närstående (bror) har ekonomiskt intresse i ärendet. Det räcker att det kan se ut som en intressekonflikt.' },
                { text: 'Ja — närstående med ekonomiskt intresse innebär jäv', korrekt: true, feedback: 'Rätt. Jäv uppstår när en ledamot eller närstående har ett ekonomiskt intresse i ärendet. Karin ska anmäla jävet, lämna rummet och inte delta i diskussion eller röstning.' },
                { text: 'Nej — om förslaget är billigast spelar jäv ingen roll', korrekt: false, feedback: 'Fel. Att det är ett bra erbjudande ekonomiskt är irrelevant för jävsbedömningen. Processen måste vara korrekt oavsett utfall.' },
                { text: 'Bara om hon äger mer än 50% av städföretaget', korrekt: false, feedback: 'Fel. Det finns ingen procentgräns i jävsreglerna. Nära relation (bror) med ekonomiskt intresse är tillräckligt.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Rätt hantering',
              bubbla: 'OK, jag förstår att jag är jävig. Men hur ska det hanteras i protokollet?',
              fraga: 'Hur ska jävet dokumenteras i styrelseprotokollet?',
              alternativ: [
                { text: 'Inget behöver skrivas — det räcker att Karin lämnar rummet', korrekt: false, feedback: 'Fel. Jävet ska alltid antecknas i protokollet. Att bara lämna rummet utan dokumentation ger inget skydd.' },
                { text: 'Jävet antecknas i protokollet: vem, vilket ärende och att personen lämnade diskussionen', korrekt: true, feedback: 'Rätt! Protokollet ska ange att Karin anmälde jäv i ärendet om städföretaget, att hon lämnade rummet och inte deltog i diskussion eller beslut. Det skyddar både Karin och styrelsen.' },
                { text: 'Det antecknas bara om någon annan ledamot begär det', korrekt: false, feedback: 'Fel. Jäv ska alltid dokumenteras oavsett om någon begär det. Det är god styrelsesed och juridiskt nödvändigt.' },
                { text: 'Karin skriver en separat reservation efter mötet', korrekt: false, feedback: 'Fel. En reservation är för ledamöter som röstat nej — det hanterar inte jäv. Jävet ska dokumenteras under det aktuella §:et i protokollet.' },
              ],
            },
          ]}
          tips={[
            'Jäv = ledamoten eller närstående har ekonomiskt intresse i ärendet',
            'Anmäl jävet, lämna rummet, delta inte i diskussion eller röstning',
            'Dokumentera alltid i protokollet: vem, vilket ärende, att personen lämnade',
            'Beslut fattat med jävig ledamot kan ogiltigförklaras',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-protokoll')}
        />
      ),
    },

    // ── 11: Årsredovisning ────────────────────────────────
    {
      id: 'arsredovisning', title: '📈 Årsredovisning',
      component: (
        <SlideB bild={IMGS.arsred}
          badge="Avsnitt 6 · Löpande dokumentation"
          title={"Årsredovisningen — <span style='color:#FF5421'>föreningens årsberättelse</span>"}
        >
          <Ingress>
            Årsredovisningen är föreningens officiella ekonomiska rapport. Granskas av revisorn, godkänns av stämman och är grunden för ansvarsfrihet.
          </Ingress>
          <StegRad nr="1" titel="Innehåll" desc="Förvaltningsberättelse, resultaträkning, balansräkning, noter och kassaflödesanalys. K3 med komponentavskrivning gäller från 2026." />
          <StegRad nr="2" titel="Tidsplan" desc="Klar senast 6 veckor före stämman. Stämman senast 6 månader efter räkenskapsårets slut. Kalenderår: klar ca 15 april, stämma senast 30 juni." />
          <StegRad nr="3" titel="Revisorns granskning" desc="Revisorn granskar och lämnar revisionsberättelse med rekommendation om ansvarsfrihet. Stämman beslutar." />
          <StegRad nr="4" titel="K3-övergången 2026" desc="Komponentavskrivning: tak, stammar, fönster skrivs av separat. Kontakta revisorn nu." />
          <InfoBox title="Proaktiv kommunikation">
            Skicka ut årsredovisningen minst en vecka före stämman. Förberedda medlemmar ger bättre stämmor.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 12: Scenario årsredovisning ───────────────────────
    {
      id: 'sc-arsred', title: '📋 Scenario: Ansvarsfrihet',
      component: (
        <Scenario
          slideId="sc-arsred"
          bild={PERSONER.stefan}
          personEmoji="👨‍💼"
          personNamn="Stefan"
          personRoll="Ordförande, BRF Granbacken"
          titel="Stefan undrar om"
          accentTitel="ansvarsfriheten"
          badge="Scenario · Årsredovisning"
          steg={[
            {
              rubrik: 'Fråga 1 — Vad innebär ansvarsfrihet?',
              bubbla: 'Stämman vägrade bevilja ansvarsfrihet i år. Vad innebär det egentligen för mig som ordförande?',
              fraga: 'Vad innebär det att stämman nekar ansvarsfrihet?',
              alternativ: [
                { text: 'Ingenting — det är bara en symbolisk omröstning', korrekt: false, feedback: 'Fel. Att neka ansvarsfrihet är inte symboliskt — det öppnar dörren för skadeståndstalan mot styrelseledamöter.' },
                { text: 'Styrelsen måste avgå omedelbart', korrekt: false, feedback: 'Inte direkt. Nekad ansvarsfrihet kräver inte automatisk avgång, men föreningen kan sedan välja att stämma styrelseledamöter på skadestånd för eventuell skada.' },
                { text: 'Föreningen behåller rätten att kräva skadestånd av styrelseledamöterna', korrekt: true, feedback: 'Rätt. Nekad ansvarsfrihet innebär att föreningen inte avsäger sig rätten att stämma styrelseledamöter. Det är ett första steg — inte en automatisk dom.' },
                { text: 'Årsredovisningen måste göras om', korrekt: false, feedback: 'Fel. Nekad ansvarsfrihet handlar om styrelsens förvaltning — inte om årsredovisningens form.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Revisorns roll',
              bubbla: 'Revisorn rekommenderade att bevilja ansvarsfrihet — men stämman röstade nej ändå. Kan de göra det?',
              fraga: 'Kan stämman neka ansvarsfrihet trots att revisorn rekommenderat att bevilja?',
              alternativ: [
                { text: 'Nej — revisorns rekommendation är bindande', korrekt: false, feedback: 'Fel. Revisorns revisionsberättelse är ett underlag — inte ett bindande beslut. Stämman är suverän i frågan om ansvarsfrihet.' },
                { text: 'Ja — stämman är suverän och kan rösta emot revisorns rekommendation', korrekt: true, feedback: 'Rätt. Stämman beslutar fritt om ansvarsfrihet. Revisorn ger en rekommendation baserat på granskningen — men det är alltid stämmans beslut.' },
                { text: 'Bara om minst 2/3 av rösterna är emot', korrekt: false, feedback: 'Fel. Det finns inget krav på kvalificerad majoritet för att neka ansvarsfrihet. Enkel majoritet räcker.' },
                { text: 'Nej — det kräver att revisorn också rekommenderat nekad ansvarsfrihet', korrekt: false, feedback: 'Fel. Stämman kan neka oberoende av revisorns ståndpunkt.' },
              ],
            },
          ]}
          tips={[
            'Ansvarsfrihet = föreningen avsäger sig rätten till skadeståndstalan',
            'Nekad ansvarsfrihet öppnar för skadeståndstalan — men är inte en dom',
            'Revisorn rekommenderar — stämman beslutar. Det är alltid stämmans val.',
            'Förvaltningsberättelsen i årsredovisningen är styrelsens chans att förklara sitt år',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-arsred')}
        />
      ),
    },

    // ── 13: Underhållsplan ────────────────────────────────
    {
      id: 'underhallsplan', title: '🔧 Underhållsplan',
      component: (
        <SlideH bild={IMGS.underhall} bildBg="#1a2a1a"
          badge="Avsnitt 7 · Löpande dokumentation"
          title={"Underhållsplanen — <span style='color:#FF5421'>fastigheten framåt i tid</span>"}
          ingress="Utan underhållsplan styrs underhållet av akuta behov — vilket alltid kostar mer och skapar avgiftschocker."
          punkter={[
            '<strong>Inventering</strong> — tak, fasad, fönster, hissar, stammar, värme, el. Med beräknad livslängd och kostnad per åtgärd.',
            '<strong>Tidplan 5–30 år</strong> — kopplas till fond för yttre underhåll. Avsättning ska matcha planens behov.',
            '<strong>Uppdatera vart 3–5 år</strong> — alltid efter genomförda större arbeten.',
            '<strong>Koppla till K3 från 2026</strong> — komponentavskrivningen ska stämma med underhållsplanen.',
            '<strong>Visa för medlemmarna</strong> — transparens skapar förtroende och höjer bostadsrättsvärden.',
          ]}
        >
          <InfoBox title="Enkel formel">
            Underhållsplan + korrekt fondering = inga avgiftsöverraskningar.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 14: Scenario underhållsplan ───────────────────────
    {
      id: 'sc-underhall', title: '📋 Scenario: Akut takläcka',
      component: (
        <Scenario
          slideId="sc-underhall"
          bild={PERSONER.lena}
          personEmoji="👩"
          personNamn="Lena"
          personRoll="Kassör, BRF Hasselbacken"
          titel="Lena hanterar en"
          accentTitel="akut takläcka"
          badge="Scenario · Underhållsplan"
          steg={[
            {
              rubrik: 'Fråga 1 — Underhållsplanens roll',
              bubbla: 'Taket läcker och det är akut. Offerten är 800 000 kr. Vi har 200 000 kr i fonden. Underhållsplanen säger att taket skulle hålla 10 år till. Vad gör vi?',
              fraga: 'Vad visar den här situationen om underhållsplanen?',
              alternativ: [
                { text: 'Underhållsplanen var korrekt — det är bara otur att taket gick sönder tidigare', korrekt: false, feedback: 'Inte nödvändigtvis. En läcka kan visa att takets tillstånd var sämre än bedömt — underhållsplanen kanske behövde uppdaterats efter senaste besiktning.' },
                { text: 'Underhållsplanen var felaktig och fonden otillräcklig — nu krävs troligen avgiftshöjning eller lån', korrekt: true, feedback: 'Rätt. Den här situationen är typexemplet på varför underhållsplanen måste hållas aktuell och fonderingen matcha behovet. Nu återstår avgiftshöjning, extra uttaxering eller lån.' },
                { text: 'Det spelar ingen roll vad planen sa — akuta skador täcks alltid av fonden', korrekt: false, feedback: 'Fel. Fonden har inga automatiska täckningsregler — det är inte en försäkring. 200 000 kr räcker uppenbarligen inte för 800 000 kr.' },
                { text: 'Styrelsen borde ha tagit ett lån förebyggande', korrekt: false, feedback: 'Det är inte standard. Rätt förebyggande åtgärd är korrekt underhållsplanering och fondering — inte att ta lån i förväg.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Beslutsprocess',
              bubbla: 'Vi måste fixa taket NU. Kan styrelsen besluta om att ta ett lån på 600 000 kr utan att fråga stämman?',
              fraga: 'Kan styrelsen självständigt besluta om ett lån på 600 000 kr?',
              alternativ: [
                { text: 'Ja — styrelsen har alltid rätt att ta lån för fastighetens underhåll', korrekt: false, feedback: 'Inte alltid. Det beror på lånets storlek och vad stadgarna säger. Stora lån som väsentligt påverkar föreningens ekonomi kan kräva stämmobeslut.' },
                { text: 'Det beror på vad stadgarna säger och om lånet är att betrakta som väsentlig förändring', korrekt: true, feedback: 'Rätt. Styrelsen kan ta lån för löpande förvaltning, men ett lån som väsentligt påverkar föreningens ekonomi eller är ovanligt stort kan kräva stämmobeslut — kontrollera stadgarna.' },
                { text: 'Nej — alla lån kräver stämmobeslut', korrekt: false, feedback: 'Inte alltid. Styrelsen kan ta mindre lån som del av löpande förvaltning utan att kalla extra stämma.' },
                { text: 'Ja — akuta situationer ger alltid styrelsen rätt att agera', korrekt: false, feedback: 'Delvis rätt att agera akut — men det ger inte styrelsen obegränsade befogenheter. Informera och involva stämman om det krävs enligt stadgarna.' },
              ],
            },
          ]}
          tips={[
            'Underhållsplanen måste uppdateras regelbundet — inte bara vid bildandet',
            'Fondering ska matcha planens behov — underskattat = framtida avgiftschock',
            'Stora lån kan kräva stämmobeslut — kontrollera stadgarna',
            'Uppdatera planen direkt efter genomförda arbeten',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-underhall')}
        />
      ),
    },

    // ── 15: GDPR ─────────────────────────────────────────
    {
      id: 'gdpr', title: '🔒 GDPR & personuppgifter',
      component: (
        <SlideE bild={IMGS.gdpr}
          badge="Avsnitt 8 · GDPR & arkivering"
          title="GDPR i föreningen — <span style='color:#FF5421'>styrelseansvar</span>"
          punkter={[
            '<strong>Föreningen är personuppgiftsansvarig</strong> — för lägenhetsförteckning, protokoll, e-post, störningsärenden och bilder från gemensamma utrymmen.',
            '<strong>Laglig grund krävs</strong> — lägenhetsförteckningen vilar på rättslig förpliktelse (BRL). Marknadsföring kräver samtycke.',
            '<strong>PUB-avtal obligatoriskt</strong> — med alla externa leverantörer som hanterar personuppgifter: förvaltare, bokningssystem, låssystem.',
            '<strong>Radering och bevarandetider</strong> — störningsärenden raderas när ärendet är avslutat. Avgiftshistorik: 7 år. Bilder: 30–90 dagar.',
            '<strong>Behandlingsregister</strong> — upprätta ett enkelt register över era behandlingar. Tar en timme och visar att ni tagit GDPR på allvar.',
          ]}
          fotnot="Tillsynsmyndigheten IMY kan granska föreningen. imy.se har mallar och vägledning anpassade för ideella föreningar."
          fotnotColor={O}
        />
      ),
    },

    // ── 16: Scenario GDPR ────────────────────────────────
    {
      id: 'sc-gdpr', title: '📋 Scenario: PUB-avtal',
      component: (
        <Scenario
          slideId="sc-gdpr"
          bild={PERSONER.anders}
          personEmoji="👨‍💻"
          personNamn="Anders"
          personRoll="IT-ansvarig, BRF Solbacken"
          titel="Anders inför ett"
          accentTitel="digitalt bokningssystem"
          badge="Scenario · GDPR"
          steg={[
            {
              rubrik: 'Fråga 1 — PUB-avtal',
              bubbla: 'Vi ska anlita ett digitalt bokningssystem för tvättstugan. Leverantören sparar allas namn och lägenhetsnummer. Behöver vi göra något speciellt?',
              fraga: 'Vad måste styrelsen göra innan systemet tas i bruk?',
              alternativ: [
                { text: 'Inget — leverantören ansvarar för sina egna system', korrekt: false, feedback: 'Fel. Föreningen är alltid personuppgiftsansvarig för sin data — oavsett vem som hanterar den tekniskt. Leverantören är biträde, inte ansvarig.' },
                { text: 'Teckna ett personuppgiftsbiträdesavtal (PUB-avtal) med leverantören', korrekt: true, feedback: 'Rätt. GDPR kräver ett skriftligt PUB-avtal med alla externa leverantörer som hanterar personuppgifter på föreningens uppdrag. Utan det bryter föreningen mot GDPR.' },
                { text: 'Fråga varje boende om samtycke via e-post', korrekt: false, feedback: 'Inte nödvändigt och inte tillräckligt. Bokningssystem för tvättstuga vilar sannolikt på berättigat intresse — inte samtycke. Huvudproblemet är PUB-avtalet.' },
                { text: 'Anmäla till IMY att ni ska börja behandla personuppgifter', korrekt: false, feedback: 'Fel. GDPR kräver inte att man anmäler behandlingar till IMY i förväg (undantag: vissa riskfyllda behandlingar som kräver konsekvensbedömning).' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Behandlingsregister',
              bubbla: 'Vi har nu tre externa system: bokningssystem, förvaltarens system och ett låssystem med portkoder. Behöver vi dokumentera det någonstans?',
              fraga: 'Vad bör föreningen ha för att visa att de hanterar personuppgifter korrekt?',
              alternativ: [
                { text: 'Nej — det räcker att PUB-avtalen finns', korrekt: false, feedback: 'PUB-avtal är nödvändigt men inte tillräckligt. GDPR kräver också att personuppgiftsansvariga kan redovisa sina behandlingar.' },
                { text: 'Ett behandlingsregister som listar vilka personuppgifter som behandlas, varför och hur länge', korrekt: true, feedback: 'Rätt. Föreningen ska föra ett register över behandlingsaktiviteter. Det tar en timme att upprätta och är det första IMY frågar efter vid en granskning.' },
                { text: 'En integritetspolicy på hemsidan räcker', korrekt: false, feedback: 'Integritetspolicyn är viktig för de registrerade — men behandlingsregistret är det interna dokumentet som visar styrelsens arbete.' },
                { text: 'Ingenting — det är förvaltarens ansvar att dokumentera', korrekt: false, feedback: 'Fel. Styrelsen kan delegera arbete men aldrig ansvaret. Behandlingsregistret är styrelsens dokument.' },
              ],
            },
          ]}
          tips={[
            'PUB-avtal krävs med alla externa leverantörer som hanterar er data',
            'Föreningen är alltid personuppgiftsansvarig — kan inte delegera bort det',
            'Upprätta ett behandlingsregister — tar en timme och visar god GDPR-hantering',
            'Integritetspolicyn är för de boende — behandlingsregistret är ert interna dokument',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-gdpr')}
        />
      ),
    },

    // ── 17: Arkivering ────────────────────────────────────
    {
      id: 'arkivering', title: '🗂️ Arkivering & bevarandetider',
      component: (
        <SlideA bild={IMGS.arkiv}
          badge="Avsnitt 9 · GDPR & arkivering"
          title={"Bevara rätt — <span style='color:#FF5421'>radera i tid</span>"}
        >
          <Ingress>
            Att veta vad som ska sparas och hur länge är en central del av styrelseansvaret. Felaktig hantering kan ge juridiska problem och förlorad historik.
          </Ingress>
          <div className="rounded-2xl overflow-hidden border mb-5" style={{ borderColor: '#e5e5e3' }}>
            <div className="px-4 py-3" style={{ background: `${O}15` }}>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: O }}>⏱️ Bevarandetider</p>
            </div>
            {[
              { tid: 'Permanent', dok: 'Stadgar, ekonomisk plan, upplåtelseavtal, stämmoprotokoll' },
              { tid: '≥ 10 år',   dok: 'Styrelseprotokoll, årsredovisningar, avtal, revisionsberättelser' },
              { tid: '7 år',      dok: 'Bokföringsmaterial (bokföringslagens krav)' },
              { tid: 'Löpande',   dok: 'Underhållsplan, lägenhetsförteckning (uppdateras kontinuerligt)' },
              { tid: '30–90 dgr', dok: 'Kamerabilder i gemensamma utrymmen' },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-4 px-4 py-3 border-t" style={{ borderColor: '#f0eeeb' }}>
                <span className="text-xs font-bold flex-shrink-0 w-20" style={{ color: O }}>{row.tid}</span>
                <span className="text-gray-600 text-xs">{row.dok}</span>
              </div>
            ))}
          </div>
          <TwoCol
            left={<FrameBox title="✅ Bra rutiner">
              <CheckItem>Digital arkivmapp med tydlig struktur</CheckItem>
              <CheckItem>Backup på minst två platser</CheckItem>
              <CheckItem>Gemensam föreningsadress — aldrig privata konton</CheckItem>
              <CheckItem>Checklista + kvittens vid styrelsebyte</CheckItem>
            </FrameBox>}
            right={<FrameBox title="❌ Undvik">
              <Bullet>Excel-filer på privata datorer</Bullet>
              <Bullet>Privata e-postkonton för föreningsärenden</Bullet>
              <Bullet>Kasta pappersprotokoll utan digitalisering</Bullet>
              <Bullet>Ny styrelse utan tillgång till historiken</Bullet>
            </FrameBox>}
          />
        </SlideA>
      ),
    },

    // ── 18: Scenario arkivering (styrelsebyte) ────────────
    {
      id: 'sc-arkivering', title: '📋 Scenario: Styrelsebyte',
      component: (
        <Scenario
          slideId="sc-arkivering"
          bild={PERSONER.maria}
          personEmoji="👩‍💼"
          personNamn="Petra"
          personRoll="Ny ordförande, BRF Lindarna"
          titel="Petra är ny"
          accentTitel="ordförande"
          badge="Scenario · Arkivering"
          steg={[
            {
              rubrik: 'Fråga 1 — Överlämning',
              bubbla: 'Jag valdes på stämman igår. Den förra ordföranden har slutat och är svår att nå. Styrelseprotokoll, avtal och hela arkivet finns bara på hans privata dator. Vad gör vi?',
              fraga: 'Vad borde ha gjorts för att undvika den här situationen?',
              alternativ: [
                { text: 'Ingenting — den avgående ordföranden är skyldig att lämna tillbaka allt', korrekt: false, feedback: 'Formellt korrekt att han är skyldig — men utan rutiner och delad lagring är det svårt att kräva i praktiken.' },
                { text: 'Styrelsen borde ha haft ett gemensamt digitalt arkiv tillgängligt för alla ledamöter', korrekt: true, feedback: 'Rätt. All dokumentation ska lagras i ett gemensamt system — inte på privata datorer. En gemensam mapp (Google Drive, SharePoint) med behörighet för alla aktiva ledamöter förhindrar exakt det här.' },
                { text: 'Revisorn borde ha en kopia av allt', korrekt: false, feedback: 'Revisorn har tillgång till det de granskar — men är inte föreningens arkiv. Det är styrelsens ansvar att ha ett fungerande arkiv.' },
                { text: 'Förvaltaren borde alltid ha kopior av alla styrelseprotokoll', korrekt: false, feedback: 'Förvaltaren har ofta ekonomisk dokumentation men är sällan ansvarig för hela styrelsens arkiv. Det är alltid styrelsens eget ansvar.' },
              ],
            },
            {
              rubrik: 'Fråga 2 — Rätt rutin',
              bubbla: 'Vi har löst det nu. Men till nästa styrelsebyte — hur ska vi göra det rätt?',
              fraga: 'Vad är den bästa rutinen för framtida styrelseskiften?',
              alternativ: [
                { text: 'Den avgående styrelsen skickar ett mejl med alla viktiga dokument till de nya', korrekt: false, feedback: 'Bättre än inget — men mejl är inte ett arkiv. Dokument kan försvinna, versioner bli fel och historik gå förlorad.' },
                { text: 'Gemensamt digitalt arkiv + skriftlig överlämningschecklista med kvittens', korrekt: true, feedback: 'Rätt. Bäst practice: ett permanent delat arkiv som alla ledamöter har tillgång till + en checklista som kvitteras skriftligen vid varje styrelseskifte. Inget förloras, allt dokumenteras.' },
                { text: 'Be förvaltaren ta över allt ansvar för arkiveringen', korrekt: false, feedback: 'Förvaltaren kan hjälpa till men kan inte ta det juridiska ansvaret. Det är styrelsens dokument och styrelsens ansvar.' },
                { text: 'Spara allt fysiskt i en pärm som förvaras i föreningslokalen', korrekt: false, feedback: 'Fysiska pärmars styr inte bra — de kan gå förlorade, bränna upp eller bli svåra att söka i. Digital lagring med backup är standard.' },
              ],
            },
          ]}
          tips={[
            'Gemensamt digitalt arkiv med behörighet för alla aktiva ledamöter — från dag ett',
            'Checklista + kvittens vid varje styrelsebyte — dokumentera överlämningen',
            'Aldrig föreningsärenden via privata e-postkonton eller privata datorer',
            'Backup på minst två platser — ett lokalt och ett i molnet',
          ]}
          onComplete={handleComplete}
          isDone={completedLessons.has('sc-arkivering')}
        />
      ),
    },

    // ── 19: Slutquiz ─────────────────────────────────────
    {
      id: 'slutquiz', title: '🧠 Slutquiz',
      component: (
        <SlideF bild={IMGS.arsred} badge="Slutquiz · 6 frågor">
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Testa dina kunskaper
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            6 frågor om dokumentation, bevarandetider, GDPR och K3.
          </p>
          <AnimatePresence>
            {completedLessons.has('slutquiz') && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-3 border mb-5 flex items-center gap-2"
                style={{ background: `${O}10`, borderColor: `${O}25` }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
                <p className="text-sm font-semibold text-gray-800">Quiz avklarat! Gå vidare för kursbeviset.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="max-w-xl">
            <InlineQuiz questions={slutquiz} onComplete={() => handleComplete('slutquiz')} />
          </div>
        </SlideF>
      ),
    },

    // ── 20: Sammanfattning ────────────────────────────────
    {
      id: 'avslut', title: '✅ Sammanfattning',
      component: (
        <SlideC bild={IMGS.avslut} bildHöjd="30%"
          badge="Sammanfattning · Föreningens dokumentation"
          title={"Ditt <span style='color:#FF5421'>dokumentationskit</span> från och med idag"}
        >
          <Ingress>
            Fem saker att ta med sig som gör er förenings dokumentation tryggare — direkt.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Granska stadgarna — stämmer de med gällande BRL? Uppdatera och registrera om inte.' },
              { nr: '02', text: 'Varje § i protokollet ska ha ett tydligt beslut, en ansvarig och ett uppföljningsdatum.' },
              { nr: '03', text: 'Teckna PUB-avtal med alla externa leverantörer som hanterar föreningens personuppgifter.' },
              { nr: '04', text: 'Koppla underhållsplanen till fonderingen — och förbered K3 med revisorn före 2026.' },
              { nr: '05', text: 'Gemensamt digitalt arkiv + överlämningschecklista. Gör det innan ni behöver det.' },
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
            <p className="font-bold text-gray-900 mb-1">👉 Din uppgift nu</p>
            <p className="text-sm text-gray-600">
              Öppna föreningens stadgar och kontrollera när de senast reviderades. Om det är mer än fem år sedan — ta upp en genomgång på nästa styrelsemöte.
            </p>
          </div>
          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört kursen om föreningens dokumentation.')}
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
        courseTitle="Föreningens dokumentation" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={courseData.faq} title="Frågor om dokumentation"
        subtitle="Protokoll, arkivering, GDPR och bevarandetider" buttonColor={O} />
    </div>
  );
};

export default ModuleDokumentation;
