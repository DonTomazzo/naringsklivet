// src/modules/Naringsklivet/ModuleNIS2.tsx
// NIS2 & ISO 27001 — för medarbetare
// Arkitektur: SlideTemplates + Scenario + SlideSidebar (som ModuleFastighetenUnderhall)

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ChevronRight, RotateCcw, XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';
import {
  SlideA, SlideB, SlideC, SlideE, SlideF, SlideH,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol, Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ── Bilder ────────────────────────────────────────
const IMGS = {
  eu:       'https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=1280&q=80',
  security: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
  office:   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
  risk:     'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1280&q=80',
  iso:      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1280&q=80',
  incident: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1280&q=80',
  team:     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&q=80',
  lock:     'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&q=80',
};

// ── Personas ──────────────────────────────────────
const P = {
  sara:   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  johan:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  anna:   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  peter:  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
};

// ════════════════════════════════════════════════════
// SCENARIO-KOMPONENT (identisk med ModuleFastighetenUnderhall)
// ════════════════════════════════════════════════════
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
  const [stegIdx, setStegIdx] = useState(0);
  const [fas, setFas]         = useState<'quiz'|'avslut'>('quiz');
  const [valt, setValt]       = useState<string|null>(null);
  const [visar, setVisar]     = useState(false);
  const [felCount, setFelCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
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
        {/* Vänster */}
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
        {/* Höger */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 40px' }}>
          <AnimatePresence mode="wait">
            {fas === 'quiz' ? (
              <motion.div key={`steg-${stegIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' as const, color: O, marginBottom: 10 }}>{aktivSteg.rubrik} · {stegIdx + 1}/{steg.length}</p>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1f2937', lineHeight: 1.5, fontFamily: "'Nunito', sans-serif", marginBottom: 20 }}>{aktivSteg.fraga}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                  {aktivSteg.alternativ.map(alt => (<AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />))}
                </div>
                <AnimatePresence>
                  {visar && valtAlt && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '14px 18px', borderRadius: 12, marginBottom: 18, background: valtAlt.korrekt ? `${O}10` : 'rgba(80,80,90,0.08)', border: `1.5px solid ${valtAlt.korrekt ? O+'40' : '#9ca3af50'}`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
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
                <div style={{ padding: '11px 14px', borderRadius: 10, marginBottom: 12, background: valtAlt.korrekt ? `${O}10` : 'rgba(80,80,90,0.08)', border: `1px solid ${valtAlt.korrekt ? O+'40' : '#9ca3af50'}`, display: 'flex', gap: 10 }}>
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

// ════════════════════════════════════════════════════
// QUIZ-FRÅGOR
// ════════════════════════════════════════════════════
const quizNIS2 = [
  {
    id: 'n1', question_text: 'Vad är NIS2?', question_type: 'single_choice' as const, question_order: 1,
    options: { choices: ['Ett frivilligt certifieringsprogram för IT-säkerhet', 'Ett EU-direktiv som ställer lagkrav på säkerhet i samhällsviktiga verksamheter', 'En ISO-standard för nätverkssäkerhet', 'Ett nationellt regelverk för banker'] },
    correct_answer: 'Ett EU-direktiv som ställer lagkrav på säkerhet i samhällsviktiga verksamheter',
    explanation: 'NIS2 (Network and Information Security Directive 2) är ett EU-direktiv som gäller från oktober 2024. Det ställer bindande krav på säkerhetsarbete och incidentrapportering i verksamheter som anses samhällsviktiga.', points: 100,
  },
  {
    id: 'n2', question_text: 'Inom hur många timmar ska en allvarlig incident rapporteras enligt NIS2?', question_type: 'single_choice' as const, question_order: 2,
    options: { choices: ['24 timmar', '72 timmar', '7 dagar', '30 dagar'] },
    correct_answer: '24 timmar',
    explanation: 'NIS2 kräver en initial tidig varning inom 24 timmar, en fullständig incidentanmälan inom 72 timmar och en slutrapport inom 30 dagar. Det är medarbetarnas ansvar att rapportera misstänkta incidenter direkt.', points: 100,
  },
  {
    id: 'n3', question_text: 'Vad är ditt ansvar som medarbetare under NIS2?', question_type: 'single_choice' as const, question_order: 3,
    options: { choices: ['Ingenting — det är IT-avdelningens ansvar', 'Följa organisationens säkerhetspolicyer och rapportera incidenter direkt', 'Skriva egna säkerhetsrapporter', 'Certifiera dig i ISO 27001'] },
    correct_answer: 'Följa organisationens säkerhetspolicyer och rapportera incidenter direkt',
    explanation: 'NIS2 gäller hela organisationen — inte bara IT. Du som medarbetare ska följa säkerhetspolicyer, delta i utbildningar och rapportera misstänkta incidenter omedelbart. Mänskliga faktorn är inblandad i 95% av alla incidenter.', points: 100,
  },
];

const quizISO = [
  {
    id: 'i1', question_text: 'Vad är ISO 27001?', question_type: 'single_choice' as const, question_order: 1,
    options: { choices: ['En lag om dataskydd', 'En internationell standard för systematiskt informationssäkerhetsarbete', 'Ett EU-direktiv om nätverk', 'En certifiering för IT-tekniker'] },
    correct_answer: 'En internationell standard för systematiskt informationssäkerhetsarbete',
    explanation: 'ISO 27001 är en frivillig internationell standard som ger ett ramverk för hur organisationer systematiskt ska hantera och skydda sin information. Den kan certifieras av ett ackrediterat organ.', points: 100,
  },
  {
    id: 'i2', question_text: 'Hur skiljer sig ISO 27001 från NIS2?', question_type: 'single_choice' as const, question_order: 2,
    options: { choices: ['De är identiska', 'NIS2 är ett lagkrav, ISO 27001 är ett frivilligt verktyg för att uppfylla det', 'ISO 27001 är strängare än NIS2', 'NIS2 gäller bara i Sverige, ISO 27001 globalt'] },
    correct_answer: 'NIS2 är ett lagkrav, ISO 27001 är ett frivilligt verktyg för att uppfylla det',
    explanation: 'NIS2 är lagen som ställer krav. ISO 27001 är standarden som hjälper organisationer att strukturera sitt säkerhetsarbete för att uppfylla de kraven. Många NIS2-skyldiga organisationer väljer ISO 27001 som ramverk.', points: 100,
  },
];

// ════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════
const ModuleNIS2: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>());
  const [isDesktop, setIsDesktop]               = useState(false);
  const [slutprovOpen, setSlutprovOpen]         = useState(false);
  const [userData]                              = useState({ name: 'Medarbetare', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  // ── Återanvändbar QuizSlide ──────────────────────
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

  // ── KapitelIntro ─────────────────────────────────
  const KapitelIntro = ({ emoji, rubrik, desc, bild, nextSlide }: {
    emoji: string; rubrik: string; desc: string; bild: string; nextSlide: number;
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
            NIS2 & ISO 27001 · {rubrik}
          </p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, marginBottom: 16 }}>
            {rubrik}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28, maxWidth: 420 }}>{desc}</p>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(nextSlide)}
            style={{ padding: '14px 28px', borderRadius: 14, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
            Starta →
          </motion.button>
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════
  // SLIDES
  // ════════════════════════════════════════════════
  const slides = [

    // ── 0: Kurs-intro ────────────────────────────
    {
      id: 'intro', title: '📋 NIS2 & ISO 27001',
      component: (
        <div className="h-full flex overflow-hidden" style={{ background: '#0f1623' }}>
          <div className="hidden lg:block w-1/2 flex-shrink-0 relative">
            <img src={IMGS.eu} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #0f1623)' }} />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto px-8 sm:px-14 py-10">
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' as const, color: O, marginBottom: 12 }}>Digital säkerhet · Ny kurs</p>
              <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.05, marginBottom: 20 }}>
                NIS2 & <span style={{ color: O }}>ISO 27001</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
                Från oktober 2024 gäller NIS2 i Sverige. Lär dig vad det betyder för dig som medarbetare — och hur ISO 27001 hänger ihop.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {[
                  'Vad NIS2 är och vilka det berör',
                  'Ditt ansvar som medarbetare',
                  'Vad du gör vid en incident',
                  'Vad ISO 27001 är och kopplingen till NIS2',
                  'Praktiska scenarier från verkligheten',
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${O}22`, border: `1px solid ${O}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={12} style={{ color: O }} />
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{p}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>⏱ ~25 min</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>📋 3 kapitel</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>🏆 Diplom vid godkänt</span>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex(1)}
                style={{ marginTop: 28, padding: '16px 32px', borderRadius: 16, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                Starta kursen →
              </motion.button>
            </div>
          </div>
        </div>
      ),
    },

    // ══════════════════════════════════════════════
    // KAPITEL 1 — VAD ÄR NIS2?
    // ══════════════════════════════════════════════
    {
      id: 'kap1-intro', title: '🇪🇺 Kapitel 1: Vad är NIS2?',
      component: <KapitelIntro emoji="🇪🇺" rubrik="Vad är NIS2?" nextSlide={2}
        desc="NIS2 trädde i kraft i hela EU i oktober 2024. Det är lag — inte en rekommendation. Lär dig vad det innebär och vilka det berör."
        bild={IMGS.eu} />,
    },

    {
      id: 'nis2-vad', title: '📖 NIS2 — bakgrund och syfte',
      component: (
        <SlideA bild={IMGS.eu} badge="Kapitel 1 · NIS2"
          title={"NIS2 — <span style='color:#FF5421'>EU:s skärpta säkerhetslag</span>"}>
          <Ingress>
            NIS2 (Network and Information Security Directive 2) är ett EU-direktiv som gäller från oktober 2024. Det ersätter det gamla NIS-direktivet och ställer betydligt hårdare krav på fler organisationer.
          </Ingress>
          <TwoCol
            left={<FrameBox title="🎯 Syftet">
              <CheckItem>Höja den gemensamma cybersäkerhetsnivån i hela EU</CheckItem>
              <CheckItem>Skydda samhällsviktig infrastruktur mot cyberattacker</CheckItem>
              <CheckItem>Säkerställa snabb incidentrapportering och hantering</CheckItem>
              <CheckItem>Öka ledningens ansvar för säkerhetsarbetet</CheckItem>
            </FrameBox>}
            right={<FrameBox title="🏢 Vilka berörs?">
              <CheckItem>Energi, transport och vattenförsörjning</CheckItem>
              <CheckItem>Hälso- och sjukvård</CheckItem>
              <CheckItem>Digital infrastruktur och molntjänster</CheckItem>
              <CheckItem>Offentlig förvaltning</CheckItem>
              <CheckItem>Livsmedel, kemikalier, post</CheckItem>
              <CheckItem>Medelstora och stora företag i dessa sektorer</CheckItem>
            </FrameBox>}
          />
          <InfoBox title="Viktigt att veta">
            NIS2 gäller inte bara IT-avdelningen. Hela organisationen — inklusive varje medarbetare — omfattas av kraven på säkerhetskultur, utbildning och incidentrapportering.
          </InfoBox>
        </SlideA>
      ),
    },

    {
      id: 'nis2-krav', title: '⚖️ NIS2 — vad krävs?',
      component: (
        <SlideH bild={IMGS.security} bildBg="#0a1a2a"
          badge="Kapitel 1 · NIS2 — Krav"
          title={"Vad ställer NIS2 <span style='color:#FF5421'>för krav?</span>"}
          ingress="NIS2 kräver att organisationer arbetar systematiskt med säkerhet — inte reaktivt. Det handlar om fyra huvudområden."
          punkter={[
            '<strong>Riskhantering</strong> — identifiera, bedöma och hantera cybersäkerhetsrisker löpande. Dokumenterat och regelbundet uppdaterat.',
            '<strong>Incidenthantering</strong> — ha en plan för när något händer. Rapportera allvarliga incidenter inom 24 timmar (tidig varning) och 72 timmar (fullständig rapport).',
            '<strong>Säkerhet i leveranskedjan</strong> — ställ krav på era leverantörer. En svag länk i kedjan är hela organisationens sårbarhet.',
            '<strong>Utbildning och kultur</strong> — ledningen ska ha kunskap om cybersäkerhet. Medarbetare ska utbildas regelbundet. Den här kursen är en del av det.',
            '<strong>Kryptering och åtkomstkontroll</strong> — känslig data ska krypteras. Principen om minsta möjliga åtkomst ska tillämpas.',
          ]}>
          <InfoBox title="Konsekvenser vid brister">
            Böter upp till 10 miljoner euro eller 2% av global omsättning för "viktiga" verksamheter. Upp till 7 miljoner euro eller 1,4% för andra. Ledningen kan hållas personligt ansvarig.
          </InfoBox>
        </SlideH>
      ),
    },

    {
      id: 'nis2-medarbetare', title: '👤 Ditt ansvar som medarbetare',
      component: (
        <SlideA bild={IMGS.team} badge="Kapitel 1 · NIS2 — Ditt ansvar"
          title={"Vad betyder NIS2 <span style='color:#FF5421'>för dig?</span>"}>
          <Ingress>
            NIS2 är inte bara ledningens eller IT:s problem. Som medarbetare är du en del av organisationens säkerhetskedja — och ofta den svagaste länken som angripare riktar sig mot.
          </Ingress>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { ikon: '📚', titel: 'Delta i utbildningar', text: 'NIS2 kräver att organisationen utbildar sina medarbetare. Den här kursen räknas.' },
              { ikon: '🔐', titel: 'Följ säkerhetspolicyer', text: 'Lösenordsregler, 2FA, VPN och riktlinjer för hantering av känslig data.' },
              { ikon: '🚨', titel: 'Rapportera direkt', text: 'Misstänker du ett intrång, phishing eller en incident — rapportera omedelbart. Vänta inte.' },
              { ikon: '🤫', titel: 'Hantera information rätt', text: 'Dela inte känslig information med obehöriga. Lämna inte enheter olåsta. Använd rätt kanaler.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px', borderRadius: 14, background: '#fff', border: '1.5px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.ikon}</div>
                <p style={{ fontSize: 13, fontWeight: 800, color: '#1f2937', marginBottom: 4 }}>{item.titel}</p>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Kom ihåg">
            95% av alla säkerhetsincidenter har den mänskliga faktorn inblandad. Du är inte problemet — men du är en del av lösningen.
          </InfoBox>
        </SlideA>
      ),
    },

    {
      id: 'sc-incident', title: '📋 Scenario: Misstänkt intrång',
      component: (
        <Scenario slideId="sc-incident" bild={P.sara} personNamn="Sara" personRoll="Ekonomiassistent, Nexia AB"
          titel="Sara upptäcker ett" accentTitel="misstänkt mejl" badge="Scenario · NIS2"
          steg={[
            {
              rubrik: 'Situation 1',
              bubbla: 'Jag fick ett mejl som verkade komma från vår VD. Han bad mig föra över 85 000 kr till ett nytt konto "för en brådskande affär". Jag klickade på länken och fyllde i mina inloggningsuppgifter innan jag insåg att något var fel.',
              fraga: 'Vad ska Sara göra NU — direkt?',
              alternativ: [
                { text: 'Vänta och se om pengarna dras', korrekt: false, feedback: 'Fel. Varje minut räknas. Snabb rapportering kan förhindra att skadan eskalerar och ger organisationen chans att begränsa intrånget.' },
                { text: 'Kontakta IT-support och chefen direkt, byt lösenord från en annan enhet', korrekt: true, feedback: 'Rätt. Under NIS2 måste organisationen ha kapacitet att rapportera incidenter inom 24 timmar. Det börjar med att du rapporterar direkt. Byt också lösenord omedelbart från en annan enhet.' },
                { text: 'Skicka ett mejl till IT och avvakta svar', korrekt: false, feedback: 'För långsamt. Ring IT-support direkt — mejl kan gå obevakat. NIS2 kräver snabb incidenthantering.' },
                { text: 'Berätta för en kollega och hoppas det löser sig', korrekt: false, feedback: 'Fel. Det här är en allvarlig incident som måste rapporteras officiellt till IT och säkerhetsansvarig — inte bara nämnas för en kollega.' },
              ],
            },
            {
              rubrik: 'Situation 2',
              bubbla: 'IT-chefen frågar mig om jag använde samma lösenord på andra system. Det gör jag — e-post, affärssystemet och HR-systemet har alla samma lösenord.',
              fraga: 'Varför är detta ett allvarligt NIS2-problem?',
              alternativ: [
                { text: 'Det är inte ett problem — lösenordet är starkt', korrekt: false, feedback: 'Fel. Styrkan spelar ingen roll om det är komprometterat. Ett stulet lösenord ger tillgång till alla system där det används.' },
                { text: 'Angriparen kan nu ta sig in i alla system Sara använder — med ett enda stulet lösenord', korrekt: true, feedback: 'Rätt. NIS2 kräver att organisationer tillämpar principen om minsta möjliga åtkomst och starka, unika lösenord per system. Återanvändning av lösenord är en av de vanligaste orsakerna till eskalerande intrång.' },
                { text: 'Det är IT:s fel — de borde ha blockerat gamla lösenord', korrekt: false, feedback: 'Delvis sant men inte hela bilden. NIS2 kräver att både organisationen och medarbetarna tar ansvar för säkerheten. Att följa lösenordspolicyn är ditt ansvar.' },
                { text: 'Det spelar ingen roll eftersom 2FA är aktiverat', korrekt: false, feedback: 'Tyvärr inte alltid. Om angriparen redan tagit sig in via länken kan 2FA vara kringgånget. Och inte alla system har 2FA aktiverat.' },
              ],
            },
          ]}
          tips={[
            'Rapportera alltid misstänkta incidenter direkt — vänta inte',
            'Använd unika lösenord för varje system',
            'NIS2 kräver incidentrapport inom 24 timmar — din rapportering utlöser processen',
            'Byt alltid lösenord från en annan enhet om du misstänker intrång',
          ]}
          onComplete={handleComplete} isDone={completedLessons.has('sc-incident')} />
      ),
    },

    {
      id: 'quiz-nis2', title: '🧠 Quiz: NIS2',
      component: <QuizSlide quizId="quiz-nis2" bild={IMGS.security} badge="Quiz · Kapitel 1 · NIS2" rubrik="Testa dina NIS2-kunskaper" questions={quizNIS2} />,
    },

    // ══════════════════════════════════════════════
    // KAPITEL 2 — ISO 27001
    // ══════════════════════════════════════════════
    {
      id: 'kap2-intro', title: '📐 Kapitel 2: ISO 27001',
      component: <KapitelIntro emoji="📐" rubrik="ISO 27001" nextSlide={8}
        desc="ISO 27001 är standarden som hjälper organisationer att uppfylla NIS2-kraven systematiskt. Lär dig vad det är och hur det hänger ihop."
        bild={IMGS.iso} />,
    },

    {
      id: 'iso-vad', title: '📐 Vad är ISO 27001?',
      component: (
        <SlideA bild={IMGS.iso} badge="Kapitel 2 · ISO 27001"
          title={"ISO 27001 — <span style='color:#FF5421'>verktyget som uppfyller NIS2</span>"}>
          <Ingress>
            ISO 27001 är en internationell standard för informationssäkerhetshantering. Den ger organisationer ett systematiskt ramverk för att hantera, skydda och förbättra sin informationssäkerhet.
          </Ingress>
          <TwoCol
            left={<FrameBox title="🔑 Vad standarden kräver">
              <CheckItem>Identifiera vilken information som finns och vad den är värd</CheckItem>
              <CheckItem>Analysera risker och bestämma åtgärder</CheckItem>
              <CheckItem>Implementera kontroller (tekniska och organisatoriska)</CheckItem>
              <CheckItem>Mäta, utvärdera och förbättra löpande</CheckItem>
              <CheckItem>Dokumentera allt — för revision och certifiering</CheckItem>
            </FrameBox>}
            right={<FrameBox title="🏅 Fördelar med certifiering">
              <CheckItem>Bevis på seriöst säkerhetsarbete mot kunder och partners</CheckItem>
              <CheckItem>Krävs allt oftare i offentliga upphandlingar</CheckItem>
              <CheckItem>Minskar risken för kostsamma säkerhetsincidenter</CheckItem>
              <CheckItem>Hjälper att uppfylla NIS2 och GDPR-krav</CheckItem>
              <CheckItem>Ger tydliga rutiner som alla i organisationen kan följa</CheckItem>
            </FrameBox>}
          />
          <InfoBox title="Frivilligt men strategiskt viktigt">
            ISO 27001 är frivilligt — men många kunder och myndigheter kräver det. Och för NIS2-skyldiga organisationer är det det mest naturliga sättet att strukturera säkerhetsarbetet.
          </InfoBox>
        </SlideA>
      ),
    },

    {
      id: 'iso-nis2-koppling', title: '🔗 NIS2 + ISO 27001',
      component: (
        <SlideH bild={IMGS.lock} bildBg="#0a1a2a"
          badge="Kapitel 2 · Kopplingen"
          title={"Hur hänger <span style='color:#FF5421'>NIS2 och ISO 27001 ihop?</span>"}
          ingress="NIS2 är lagen som ställer krav. ISO 27001 är verktyget som hjälper dig uppfylla dem. Tänk på det som skillnaden mellan byggregler och ett hantverkscertifikat."
          punkter={[
            '<strong>NIS2 kräver riskhantering</strong> → ISO 27001 har ett komplett ramverk för riskanalys och riskbehandling.',
            '<strong>NIS2 kräver incidenthantering</strong> → ISO 27001 kontroll A.16 täcker hela incidenthanteringsprocessen.',
            '<strong>NIS2 kräver säkerhet i leveranskedjan</strong> → ISO 27001 kontroll A.15 hanterar leverantörssäkerhet.',
            '<strong>NIS2 kräver utbildning</strong> → ISO 27001 kräver medvetenhetsprogram och regelbunden utbildning av all personal.',
            '<strong>NIS2 kräver dokumentation</strong> → ISO 27001 bygger på systematisk dokumentation av alla säkerhetsaktiviteter.',
          ]}>
          <InfoBox title="Praktisk konsekvens för dig">
            Om din organisation är ISO 27001-certifierad finns det policyer, rutiner och kontroller på plats. Din uppgift är att känna till och följa dem — inte att skapa dem.
          </InfoBox>
        </SlideH>
      ),
    },

    {
      id: 'sc-policy', title: '📋 Scenario: IT-säkerhetspolicy',
      component: (
        <Scenario slideId="sc-policy" bild={P.peter} personNamn="Peter" personRoll="Säljare, Nexia AB"
          titel="Peter hanterar" accentTitel="känslig kunddata" badge="Scenario · ISO 27001"
          steg={[
            {
              rubrik: 'Situation 1',
              bubbla: 'Jag ska presentera för en stor kund nästa vecka. Jag har sparat hela kundregistret på min privata Dropbox så jag kan komma åt det hemifrån. Det är ju bara temporärt.',
              fraga: 'Vad är problemet med Peters agerande enligt ISO 27001 och NIS2?',
              alternativ: [
                { text: 'Ingenting — det är bara temporärt och praktiskt', korrekt: false, feedback: 'Fel. "Temporärt" och "praktiskt" är de vanligaste motiveringarna till säkerhetsbrister som leder till riktiga incidenter. Informationen är nu utanför organisationens kontroll.' },
                { text: 'Kunddata ska hanteras i godkända system — privat Dropbox är inte ett godkänt verktyg', korrekt: true, feedback: 'Rätt. ISO 27001 kräver att känslig information bara hanteras i godkända system med rätt åtkomstkontroll. Privata molntjänster uppfyller inte organisationens säkerhetskrav och kan strida mot GDPR och NIS2.' },
                { text: 'Det är okej om han tar bort filen efteråt', korrekt: false, feedback: 'Fel. Skadan är redan skedd när filen laddades upp. Privata molntjänster kan ha synkroniserat, backuppat eller exponerat data.' },
                { text: 'Det är ett GDPR-brott men inte ett NIS2-problem', korrekt: false, feedback: 'Delvis fel. Det är både ett potentiellt GDPR-brott och ett NIS2-problem — NIS2 kräver att organisationen kontrollerar hur känslig information hanteras.' },
              ],
            },
            {
              rubrik: 'Situation 2',
              bubbla: 'IT-chefen säger att jag bröt mot IT-säkerhetspolicyn. Men jag har aldrig läst den — ingen informerade mig om den när jag började.',
              fraga: 'Vems ansvar är det att Peter känner till policyn?',
              alternativ: [
                { text: 'Helt Peters ansvar — han borde ha frågat', korrekt: false, feedback: 'Delvis fel. Peter har ansvar att följa policyn, men organisationen har ansvar att kommunicera, utbilda och säkerställa att medarbetare känner till den.' },
                { text: 'Helt organisationens ansvar — de borde ha informerat honom', korrekt: false, feedback: 'Delvis rätt men inte hela sanningen. NIS2 och ISO 27001 ställer krav på organisationen att utbilda — men medarbetaren har ansvar att ta till sig informationen.' },
                { text: 'Gemensamt ansvar — organisationen ska utbilda, medarbetaren ska följa', korrekt: true, feedback: 'Rätt. ISO 27001 kräver att organisationen har ett medvetenhetsprogram och utbildar all personal. NIS2 kräver samma sak. Men medarbetaren har ansvar att delta och följa policyn.' },
                { text: 'IT-chefens ansvar — de skapar och äger policyn', korrekt: false, feedback: 'Fel. IT-avdelningen skapar policyn men äger inte ansvaret ensam. Säkerhet är hela organisationens ansvar.' },
              ],
            },
          ]}
          tips={[
            'Hantera aldrig känslig data i privata molntjänster',
            'Känn till organisationens IT-säkerhetspolicy — fråga om du är osäker',
            'ISO 27001 kräver att alla medarbetare utbildas i säkerhetspolicyer',
            'NIS2 gäller hela organisationen — inte bara IT-avdelningen',
          ]}
          onComplete={handleComplete} isDone={completedLessons.has('sc-policy')} />
      ),
    },

    {
      id: 'quiz-iso', title: '🧠 Quiz: ISO 27001',
      component: <QuizSlide quizId="quiz-iso" bild={IMGS.iso} badge="Quiz · Kapitel 2 · ISO 27001" rubrik="Testa dina ISO 27001-kunskaper" questions={quizISO} />,
    },

    // ══════════════════════════════════════════════
    // KAPITEL 3 — INCIDENTHANTERING
    // ══════════════════════════════════════════════
    {
      id: 'kap3-intro', title: '🚨 Kapitel 3: Incidenthantering',
      component: <KapitelIntro emoji="🚨" rubrik="Incidenthantering" nextSlide={13}
        desc="När något händer — vad gör du? NIS2 kräver snabb och korrekt hantering. Lär dig stegen."
        bild={IMGS.incident} />,
    },

    {
      id: 'incident-steg', title: '🚨 Stegen vid en incident',
      component: (
        <SlideA bild={IMGS.incident} badge="Kapitel 3 · Incidenthantering"
          title={"Vad gör du <span style='color:#FF5421'>när något händer?</span>"}>
          <Ingress>
            NIS2 ställer hårda krav på hur snabbt incidenter ska rapporteras. Din snabba rapportering är avgörande — du utlöser processen.
          </Ingress>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { tid: '0–30 min', steg: 'Identifiera och begränsa', desc: 'Koppla från nätverket om nödvändigt. Byt lösenord från en annan enhet. Stoppa pågående skada.', color: '#ef4444' },
              { tid: '0–1 h', steg: 'Rapportera internt', desc: 'Ring IT-support och din chef direkt. Vänta inte på bekräftelse — ring och informera.', color: O },
              { tid: '24 h', steg: 'Tidig varning (NIS2)', desc: 'Organisationen ska skicka en tidig varning till NCSC (nationellt cybersäkerhetscenter) inom 24 timmar.', color: '#f59e0b' },
              { tid: '72 h', steg: 'Fullständig incidentanmälan', desc: 'Komplett rapport med orsak, påverkan och åtgärder skickas till myndighet.', color: '#10b981' },
              { tid: '30 dagar', steg: 'Slutrapport', desc: 'Fullständig analys och lärdomar dokumenteras. Förbättringsåtgärder implementeras.', color: '#6366f1' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', borderRadius: 12, background: '#fff', border: `1.5px solid ${item.color}30`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 60, flexShrink: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, color: item.color }}>{item.tid}</p>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#1f2937', marginBottom: 2 }}>{item.steg}</p>
                  <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <InfoBox title="Din roll">
            Du ansvarar för steg 1 och 2 — identifiera, begränsa och rapportera internt. Resten hanterar IT och ledningen. Men utan din snabba rapportering kan inte de jobba.
          </InfoBox>
        </SlideA>
      ),
    },

    // ── Sluttest ──────────────────────────────────
    {
      id: 'sluttest', title: '🎯 Sluttest',
      component: (
        <SlideF bild={IMGS.security} badge="Sluttest · NIS2 & ISO 27001">
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Sluttest</h2>
          <p className="text-gray-500 text-sm mb-6">5 frågor · 80% rätt krävs för godkänt</p>
          <AnimatePresence>
            {completedLessons.has('sluttest') && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 border mb-6 flex items-center gap-3"
                style={{ background: `${O}10`, borderColor: `${O}25` }}>
                <Award className="w-6 h-6 flex-shrink-0" style={{ color: O }} />
                <div>
                  <p className="font-bold text-gray-800">Kurs avklarad! 🎉</p>
                  <p className="text-sm text-gray-500">Du har klarat NIS2 & ISO 27001.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setSlutprovOpen(true)}
            className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 4px 16px ${O}35` }}>
            Starta sluttest →
          </motion.button>
          <GdprQuizOverlay
            isOpen={slutprovOpen}
            onClose={() => setSlutprovOpen(false)}
            passingPercent={80}
            onComplete={(passed: boolean) => { if (passed) handleComplete('sluttest'); }}
            questions={[
              { id: 'sq1', question_text: 'Vad är NIS2?', question_type: 'single_choice', question_order: 1,
                options: { choices: ['En frivillig säkerhetsstandard', 'Ett EU-direktiv med bindande säkerhetskrav', 'En ISO-certifiering', 'En nationell lag om dataskydd'] },
                correct_answer: 'Ett EU-direktiv med bindande säkerhetskrav',
                explanation: 'NIS2 är ett bindande EU-direktiv som gäller från oktober 2024 och ställer lagkrav på säkerhetsarbete i samhällsviktiga verksamheter.', points: 100 },
              { id: 'sq2', question_text: 'Inom hur många timmar ska en tidig varning skickas vid allvarlig incident?', question_type: 'single_choice', question_order: 2,
                options: { choices: ['1 timme', '24 timmar', '72 timmar', '7 dagar'] },
                correct_answer: '24 timmar',
                explanation: 'NIS2 kräver tidig varning inom 24 timmar, fullständig anmälan inom 72 timmar och slutrapport inom 30 dagar.', points: 100 },
              { id: 'sq3', question_text: 'Vad är ISO 27001?', question_type: 'single_choice', question_order: 3,
                options: { choices: ['En EU-lag om cybersäkerhet', 'En internationell standard för informationssäkerhetshantering', 'En certifiering för IT-tekniker', 'En typ av brandvägg'] },
                correct_answer: 'En internationell standard för informationssäkerhetshantering',
                explanation: 'ISO 27001 är ett frivilligt ramverk för systematiskt informationssäkerhetsarbete som hjälper organisationer att uppfylla NIS2-kraven.', points: 100 },
              { id: 'sq4', question_text: 'Vad ska du göra om du misstänker ett säkerhetsintrång?', question_type: 'single_choice', question_order: 4,
                options: { choices: ['Vänta och se om det löser sig', 'Berätta för en kollega', 'Rapportera direkt till IT-support och din chef', 'Skicka ett mejl och avvakta svar'] },
                correct_answer: 'Rapportera direkt till IT-support och din chef',
                explanation: 'Snabb rapportering är avgörande. NIS2 kräver att organisationen kan rapportera inom 24 timmar — det börjar med att du agerar direkt.', points: 100 },
              { id: 'sq5', question_text: 'Varför ska känslig kunddata inte lagras i privata molntjänster?', question_type: 'single_choice', question_order: 5,
                options: { choices: ['Det är för långsamt', 'Det bryter mot ISO 27001 och NIS2 krav på kontrollerad informationshantering', 'Det kostar för mycket', 'Det är bara ett problem om data läcker'] },
                correct_answer: 'Det bryter mot ISO 27001 och NIS2 krav på kontrollerad informationshantering',
                explanation: 'ISO 27001 kräver att känslig information bara hanteras i godkända system. Privata molntjänster uppfyller inte organisationens säkerhetskrav och kan strida mot GDPR och NIS2.', points: 100 },
            ]}
          />
        </SlideF>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0" data-course-header style={{ background: '#0f1623' }}>
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <motion.button onClick={() => navigate('/modules')}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: 'rgba(255,255,255,0.45)' }}>
            <ArrowLeft size={12} /> Alla kurser
          </motion.button>
          <span className="text-xs font-bold" style={{ color: O }}>📋 NIS2 & ISO 27001</span>
          <div style={{ width: 80 }} />
        </div>
        <CourseHeader isSidebarMinimized={false} isDesktop={isDesktop}
          userName={userData.name} userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }} />
      </div>
      <SlideSidebar slides={slides} currentIndex={currentIndex}
        completedLessons={completedLessons} onNavigate={setCurrentIndex}
        courseTitle="NIS2 & ISO 27001" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis — diplom laddas ner!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ
        faqs={[
          { question: 'Berör NIS2 alla företag?', answer: 'Nej — NIS2 gäller medelstora och stora organisationer inom utpekade sektorer som energi, transport, hälso- och sjukvård, digital infrastruktur och offentlig förvaltning.' },
          { question: 'Vad händer om vi inte följer NIS2?', answer: 'Böter upp till 10 miljoner euro eller 2% av global omsättning. Ledningen kan hållas personligt ansvarig för allvarliga brister.' },
          { question: 'Är ISO 27001-certifiering obligatoriskt?', answer: 'Nej — ISO 27001 är frivilligt. Men det är det vanligaste sättet att strukturera säkerhetsarbetet för att uppfylla NIS2-kraven.' },
          { question: 'Vad är NCSC?', answer: 'NCSC (Nationellt cybersäkerhetscenter) är den svenska myndighet som tar emot NIS2-incidentrapporter. Det är ett samarbete mellan NCSC, MSB, SÄPO, FRA och Försvarsmakten.' },
          { question: 'Måste jag rapportera om jag klickat på ett phishing-mejl?', answer: 'Ja — om du misstänker att känslig information kan ha exponerats ska du alltid rapportera till IT-support direkt. Det är bättre att rapportera något som visar sig vara ofarligt än att missa ett riktigt intrång.' },
        ]}
        title="Frågor om NIS2 & ISO 27001"
        subtitle="Vanliga frågor om direktivet och standarden"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleNIS2;