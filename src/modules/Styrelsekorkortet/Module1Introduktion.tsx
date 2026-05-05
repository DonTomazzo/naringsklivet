// src/modules/Styrelsekorkortet/ModuleStyrelsenArbete.tsx
// Modul: Hur BRF:en fungerar — historia, dokumentation, lagar & regler
// Quiz-design: QuizSalesPage-stil (persona + bubbla vänster, vit frågepanel höger)

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, FileText, Shield, HelpCircle, Award,
  CheckCircle, X, ChevronRight, XCircle, ArrowRight,
} from 'lucide-react';

import CourseHeader               from '../../components/CourseElements/CourseHeader';
import GlobalSidebar              from '../../components/GlobalSidebar';
import FloatingFAQ                from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout          from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide           from '../../components/CourseElements/ModuleIntroSlide';
import BrfFlödesdiagramSlide      from '../../components/CourseElements/BrfFlödesdiagramSlide';
import BuildingCrossSectionSection from '../../components/CourseElements/IntressenterSection';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import IntressenterElevatorSection from '../../components/CourseElements/IntressenterElevatorSection';
import ScenarioAndrahand          from '../../components/CourseElements/ScenarioAndrahand';
import BrfMissuppfattningsQuiz    from '../../components/CourseElements/BrfMissuppfattningsQuiz';
import GdprQuizOverlay            from '../../components/CourseElements/GdprQuizOverlay';
import BrfHistorieTidslinje from '../../components/CourseElements/BrfHistorieTidslinje';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

// ─── Bilder ──────────────────────────────────────────────
const IMGS = {
  historia:   'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  kooperativ: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80',
  modern:     'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
  dokument:   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
  stadgar:    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
  arkiv:      'https://images.unsplash.com/photo-1568667256549-094345857637?w=1920&q=80',
  juridik:    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  lag:        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
  eu:         'https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=1920&q=80',
  avslut:     'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
};

// Personas för quiz
const PERSONAS = {
  eva:    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  magnus: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  anna:   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  karin:  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
  lars:   'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
  sofia:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  peter:  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
};

// ─── Hjälpkomponenter ─────────────────────────────────────
const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.82)' }: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
    {text}
  </div>
);

const H = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Icon className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
    {title}
  </h2>
);

// ─── HighlightText ────────────────────────────────────────
const HighlightText = ({ text, words }: { text: string; words: string[] }) => {
  if (!words?.length) return <>{text}</>;
  const pattern = new RegExp(
    `(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi'
  );
  const parts = text.split(pattern);
  return <>{parts.map((p, i) =>
    words.some(w => w.toLowerCase() === p.toLowerCase())
      ? <span key={i} style={{ color: O, fontWeight: 900 }}>{p}</span>
      : <span key={i}>{p}</span>
  )}</>;
};

// ═══════════════════════════════════════════════════════════
// QUIZ-KOMPONENT — QuizSalesPage-stil
// ═══════════════════════════════════════════════════════════
interface QuizFraga {
  id: string;
  persona: string;
  roll: string;
  bild: string;
  kategori: string;
  highlight: string[];
  bubbla: string;
  fraga: string;
  alternativ: { text: string; korrekt: boolean; feedback: string }[];
  tips: string[];
}

const AlternativKnapp = ({ alt, valt, visar, onVälj }: {
  alt: { text: string; korrekt: boolean; feedback: string };
  valt: string | null; visar: boolean; onVälj: (t: string) => void;
}) => {
  const isValt = valt === alt.text;
  const visaRes = visar && isValt;
  const isCorrectUnselected = visar && alt.korrekt && !isValt;
  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { scale: 1.01, x: 3, boxShadow: `0 4px 20px ${O}25` } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '16px 20px', minHeight: 64,
        borderRadius: 14,
        background: visaRes ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)')
          : isCorrectUnselected ? `${O}08` : isValt ? OL : '#fff',
        border: `2px solid ${visaRes ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}50` : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 4px 16px ${O}20` : 'none',
      }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        background: visaRes ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}30` : isValt ? O : '#f0f0f0',
        border: `2px solid ${visaRes ? 'transparent' : isValt ? O : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900,
        color: isValt || visaRes ? '#fff' : '#9ca3af', transition: 'all 0.18s',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : isValt ? '●' : null}
      </div>
      <p style={{
        fontSize: 16, lineHeight: 1.45, flex: 1, fontWeight: isValt ? 700 : 500,
        color: visaRes ? (alt.korrekt ? '#b84400' : '#6b7280') : '#1f2937',
      }}>
        {alt.text}
      </p>
    </motion.button>
  );
};

const KapitelQuiz = ({
  quizId, fragor, bild, badge, onComplete, isDone,
}: {
  quizId: string; fragor: QuizFraga[]; bild: string;
  badge: string; onComplete: (id: string) => void; isDone: boolean;
}) => {
  const [idx, setIdx]       = useState(0);
  const [valt, setValt]     = useState<string | null>(null);
  const [visar, setVisar]   = useState(false);
  const [ratt, setRatt]     = useState(0);
  const [fas, setFas]       = useState<'quiz' | 'avslut'>('quiz');
  const videoRef             = useRef<HTMLVideoElement>(null);

  useEffect(() => { if (videoRef.current) videoRef.current.play().catch(() => {}); }, [idx]);

  const current  = fragor[idx];
  const valtAlt  = valt ? current.alternativ.find(a => a.text === valt) : null;

  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = current.alternativ.find(a => a.text === text)!;
    setValt(text); setVisar(true);
    if (alt.korrekt) setRatt(r => r + 1);
  };

  const handleNästa = () => {
    if (idx < fragor.length - 1) { setIdx(i => i + 1); setValt(null); setVisar(false); }
    else { setFas('avslut'); onComplete(quizId); }
  };

  const handleOm = () => { setIdx(0); setValt(null); setVisar(false); setRatt(0); setFas('quiz'); };

  if (fas === 'avslut') return (
    <div className="h-full relative overflow-hidden flex items-center justify-center"
      style={{ background: DARK }}>
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
        className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.15 }} />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-md mx-auto px-8">
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {ratt === fragor.length ? '🏆' : ratt >= fragor.length / 2 ? '⭐' : '💪'}
        </div>
        <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {ratt === fragor.length ? 'Perfekt!' : 'Bra jobbat!'}
        </h3>
        <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {ratt} av {fragor.length} rätt
        </p>
        {isDone && (
          <div className="rounded-2xl p-5 mb-6 flex items-center gap-3"
            style={{ background: `${O}18`, border: `1px solid ${O}35` }}>
            <CheckCircle size={22} style={{ color: O, flexShrink: 0 }} />
            <p className="text-white font-bold text-left">Avklarat! Gå vidare till nästa del.</p>
          </div>
        )}
        <button onClick={handleOm}
          className="flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl text-sm font-bold"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer' }}>
          Gör om quizet
        </button>
      </motion.div>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', fontFamily: "'Nunito', sans-serif" }}>
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.88)', zIndex: 1 }} />

      {/* Topbar */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
          <motion.div animate={{ width: `${(idx / fragor.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(to right, ${O}, ${OD})` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 24px', background: 'rgba(10,16,28,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>{badge}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{idx + 1} / {fragor.length}</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {fragor.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 20 : 8, height: 8, borderRadius: 4,
                background: i < idx ? O : i === idx ? O : 'rgba(255,255,255,0.12)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:grid" style={{ flex: 1, gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
        {/* Vänster — persona */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', gap: 24 }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%', maxWidth: 400 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <img src={current.bild} alt={current.persona}
                  style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${O}`, boxShadow: `0 0 36px ${O}50`, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{current.persona}</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{current.roll}</p>
                </div>
              </div>
              <div style={{ padding: '24px 28px', borderRadius: '4px 22px 22px 22px', background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(20px)', width: '100%' }}>
                <p style={{ fontSize: 19, color: '#ffffff', lineHeight: 1.75, fontWeight: 400, textAlign: 'center' }}>
                  "{current.bubbla}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Höger — fråga */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '36px 48px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`q${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#111827', lineHeight: 1.25, marginBottom: 28 }}>
                  <HighlightText text={current.fraga} words={current.highlight || []} />
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`f${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ padding: '20px 24px', borderRadius: 16, marginBottom: 18, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af40'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    {valtAlt?.korrekt
                      ? <CheckCircle size={26} style={{ color: O, flexShrink: 0 }} />
                      : <XCircle size={26} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 20, fontWeight: 900, color: '#111827' }}>
                      {valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}
                    </p>
                  </div>
                  <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.7 }}>{valtAlt?.feedback}</p>
                </div>
                <div style={{ padding: '16px 20px', borderRadius: 14, background: OL, border: `1px solid ${O}30`, marginBottom: 20 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 10 }}>Kom ihåg</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 8 }} />
                      <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                  style={{ width: '100%', padding: '18px', borderRadius: 14, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 17, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 6px 24px ${O}40` }}>
                  {idx < fragor.length - 1 ? <>Nästa fråga <ChevronRight size={20} /></> : <>Se sammanfattning <ChevronRight size={20} /></>}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBIL */}
      <div className="lg:hidden flex flex-col" style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '18px 18px 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <img src={current.bild} alt={current.persona}
              style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${O}`, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{current.persona}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{current.roll}</p>
            </div>
          </div>
          <div style={{ padding: '16px 18px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)' }}>
            <p style={{ fontSize: 15, color: '#fff', lineHeight: 1.7 }}>"{current.bubbla}"</p>
          </div>
        </div>
        <div style={{ borderRadius: '24px 24px 0 0', background: '#FAFAF8', flex: 1, overflowY: 'auto', padding: '20px 16px 36px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.12)', margin: '0 auto 16px' }} />
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`mq${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111827', lineHeight: 1.3, marginBottom: 16 }}>
                  <HighlightText text={current.fraga} words={current.highlight || []} />
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {current.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`mf${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ padding: '16px 18px', borderRadius: 16, marginBottom: 12, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.07)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af35'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    {valtAlt?.korrekt ? <CheckCircle size={22} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={22} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 17, fontWeight: 900, color: '#111827' }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                  </div>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65 }}>{valtAlt?.feedback}</p>
                </div>
                <div style={{ padding: '13px 15px', borderRadius: 12, background: OL, border: `1px solid ${O}30`, marginBottom: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>Kom ihåg</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 5 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 8 }} />
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleNästa}
                  style={{ width: '100%', padding: '16px', borderRadius: 14, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {idx < fragor.length - 1 ? 'Nästa fråga' : 'Se sammanfattning'} <ChevronRight size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// KAPITEL 1: HISTORIA — 3 slides
// ═══════════════════════════════════════════════════════════
const Historia1 = () => (
  <BgSlide bild={IMGS.historia}>
    <Badge text="Kapitel 1 · Historia" />
    <H icon={Users} title="Hur BRF:en uppstod" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Bostadsrättsföreningen är en svensk uppfinning med rötter i 1800-talets industrialisering.
      Förstå ursprunget — förstå varför modellen ser ut som den gör idag.
    </p>
    <div className="space-y-3 mb-6">
      {[
        { år: '1850–1900', rubrik: 'Urbaniseringen', text: 'Sverige industrialiserades snabbt. Arbetare strömmade till städerna men det saknades bostäder. Hyresspekulanter tog ut höga hyror för undermåliga lägenheter.' },
        { år: '1916', rubrik: 'HSB grundades', text: 'Hyresgästernas Sparkasse- och Byggnadsförening (HSB) bildades i Stockholm av Sven Wallander. Idén: arbetarna skulle äga sina egna bostäder gemensamt — kooperativt.' },
        { år: '1930', rubrik: 'Bostadsrättslagen', text: 'Sveriges första bostadsrättslag stiftades. Den gav den kooperativa bostadsmodellen en juridisk ram och skyddade innehavarna mot godtyckliga hyresvärdar.' },
        { år: '1971', rubrik: 'Modern lag', text: 'En moderniserad bostadsrättslag stiftades som lade grunden för nuvarande regler om föreningens skyldigheter, innehavarens rättigheter och stämmans befogenheter.' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span className="text-xs font-black flex-shrink-0 px-2 py-1 rounded-lg mt-0.5"
            style={{ background: `${O}30`, color: O }}>{item.år}</span>
          <div>
            <p className="text-white font-bold text-sm mb-1">{item.rubrik}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: `${O}12` }}>
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>Kärnan: </span>
        BRF-modellen byggdes för att ge vanliga människor makt över sitt eget boende — utan att vara beroende av en hyresvärd. Det kooperativa tänket lever kvar i varje stämmobeslut du fattar idag.
      </p>
    </div>
  </BgSlide>
);

const Historia2 = () => (
  <SplitSlide
    badge="Kapitel 1 · Historia"
    title="Det <span style='color:#FF5421'>kooperativa</span> tänket"
    ingress="En bostadsrättsförening är ingen vanlig fastighetsägare. Det är en ekonomisk förening där medlemmarna äger och styr gemensamt — med demokrati som fundament."
    bild={IMGS.kooperativ}
    bildPosition="right"
    badge2="Demokrati i praktiken"
    badge2Sub="En röst per lägenhet"
  >
    <StegLista steg={[
      { nr: '01', titel: 'Föreningen äger fastigheten', desc: 'Inte du som individ — utan föreningen gemensamt. Du äger rätten att nyttja din lägenhet, inte murarna i sig.' },
      { nr: '02', titel: 'Stämman är högsta beslutande organ', desc: 'Alla medlemmar har röst. Styrelsen fattar beslut i det dagliga — men de stora frågorna avgörs demokratiskt på stämman.' },
      { nr: '03', titel: 'Ekonomin är gemensam', desc: 'Fastighetens underhåll, lån och kostnader bärs av alla. En välskött förening gynnar alla innehavares värden.' },
      { nr: '04', titel: 'Transparens är ett krav', desc: 'Årsredovisning, protokoll och budget ska vara tillgängliga. Styrelsen förvaltar på uppdrag av alla.' },
    ]} />
    <InfoRuta>
      Det kooperativa tänket innebär att du som ledamot inte bara förvaltar en fastighet — du förvaltar ett demokratiskt uppdrag.
    </InfoRuta>
  </SplitSlide>
);

const Historia3 = () => (
  <BgSlide bild={IMGS.modern}>
    <Badge text="Kapitel 1 · Historia" />
    <H icon={Users} title="BRF:en idag — i siffror" />
    <p className="text-white/70 text-base leading-relaxed mb-8">
      Bostadsrätten har blivit den dominerande boendeformen i svenska städer.
      Förstå skalan — och varför välskötta föreningar är samhällsviktiga.
    </p>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      {[
        { v: '1,6M', l: 'bostadsrättslägenheter', sub: 'i Sverige' },
        { v: '27 000', l: 'bostadsrättsföreningar', sub: 'aktiva föreningar' },
        { v: '~3M', l: 'personer bor i BRF', sub: 'ca 30% av befolkningen' },
        { v: '1916', l: 'HSB grundades', sub: 'kooperativets år noll' },
        { v: '2004', l: 'ny bostadsrättslag', sub: 'senast reviderad' },
        { v: '100%', l: 'demokratiskt styrd', sub: 'en röst per lägenhet' },
      ].map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.06 }}
          className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
          <p className="text-2xl sm:text-3xl font-black" style={{ color: O }}>{s.v}</p>
          <p className="text-white text-xs font-bold mt-1">{s.l}</p>
          <p className="text-white/35 text-xs mt-0.5">{s.sub}</p>
        </motion.div>
      ))}
    </div>
    <div className="rounded-2xl p-5" style={{ background: `${O}15`, border: `1px solid ${O}35` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Varför det spelar roll</p>
      <p className="text-white/80 text-sm leading-relaxed">
        En välskött BRF bevarar och ökar fastighetsvärdet för alla innehavare. En dåligt skött förening kan tvinga till dramatiska avgiftshöjningar och minska boendenas marknadsvärde med hundratusentals kronor. Ditt styrelsearbete har direkt ekonomisk påverkan på alla som bor i föreningen.
      </p>
    </div>
  </BgSlide>
);

const historiaFragor: QuizFraga[] = [
  {
    id: 'h1', persona: 'Eva', roll: 'Ny styrelseledamot, BRF Kastanjen',
    bild: PERSONAS.eva, kategori: 'Historia', highlight: ['kooperativ', 'äger'],
    bubbla: 'Jag är ny i styrelsen och undrar — vad innebär det egentligen att vi "äger" vår lägenhet i en BRF? Det känns annorlunda mot att äga ett hus.',
    fraga: 'Vad äger en bostadsrättsinnehavare egentligen?',
    alternativ: [
      { text: 'Lägenheten och alla murarna i fastigheten', korrekt: false, feedback: 'Nej. Det är föreningen som äger fastigheten — inte den enskilde innehavaren.' },
      { text: 'Nyttjanderätten till lägenheten, inte fastigheten i sig', korrekt: true, feedback: 'Rätt. Du äger rätten att nyttja din lägenhet (bostadsrätten) — föreningen äger fastigheten gemensamt.' },
      { text: 'En andel av marken under fastigheten', korrekt: false, feedback: 'Fel. Marken ägs av föreningen, inte av de enskilda innehavarna.' },
      { text: 'Ingenting — man hyr av föreningen', korrekt: false, feedback: 'Fel. Bostadsrätt skiljer sig från hyresrätt — du äger en nyttjanderätt och kan sälja den på marknaden.' },
    ],
    tips: ['Föreningen äger fastigheten — du äger nyttjanderätten', 'Bostadsrätten kan säljas, pantsättas och ärvas', 'Värdet på din bostadsrätt påverkas av hur föreningen sköts'],
  },
  {
    id: 'h2', persona: 'Magnus', roll: 'Ordförande, BRF Ekbacken',
    bild: PERSONAS.magnus, kategori: 'Historia', highlight: ['HSB', '1916'],
    bubbla: 'En member frågade mig varför vi har den här föreningsmodellen alls — varför inte bara ha en vanlig hyresvärd?',
    fraga: 'Varför uppstod bostadsrättsmodellen i Sverige?',
    alternativ: [
      { text: 'Staten ville ha ett alternativ till villaägande för skatteändamål', korrekt: false, feedback: 'Fel. Modellen uppstod som ett svar på hyresspekulanter — inte av skatteskäl.' },
      { text: 'För att ge arbetare makt över sitt boende utan att vara beroende av spekulativa hyresvärdar', korrekt: true, feedback: 'Rätt. HSB grundades 1916 just för att ge vanliga människor kontroll över sitt boende genom kooperativt ägande.' },
      { text: 'För att underlätta för banker att ge bostadslån', korrekt: false, feedback: 'Fel. Bankernas roll kom senare — modellen skapades för att skydda hyresgästerna.' },
      { text: 'Modellen importerades från USA på 1920-talet', korrekt: false, feedback: 'Fel. Den svenska bostadsrättsmodellen är i huvudsak en inhemsk uppfinning med kooperativa rötter.' },
    ],
    tips: ['HSB grundades 1916 av Sven Wallander', 'Kooperativt ägande = gemensam makt över boendet', 'Första bostadsrättslagen kom 1930'],
  },
  {
    id: 'h3', persona: 'Anna', roll: 'Sekreterare, BRF Linden',
    bild: PERSONAS.anna, kategori: 'Historia', highlight: ['stämman', 'demokrati'],
    bubbla: 'En ledamot säger att styrelsen kan fatta alla beslut eftersom "vi är valda". Men är inte stämman viktigare?',
    fraga: 'Vem är det högsta beslutande organet i en BRF?',
    alternativ: [
      { text: 'Styrelsen, eftersom de är valda och har mandat', korrekt: false, feedback: 'Fel. Styrelsen sköter den löpande förvaltningen — men de stora besluten fattas av stämman.' },
      { text: 'Föreningsstämman, där alla medlemmar har röst', korrekt: true, feedback: 'Rätt. Stämman är det högsta beslutande organet. Styrelsen väljs av och rapporterar till stämman.' },
      { text: 'Revisorn, som granskar och godkänner beslut', korrekt: false, feedback: 'Fel. Revisorn granskar i efterhand — de fattar inte beslut.' },
      { text: 'Ordföranden, som har utslagsröst vid lika röstetal', korrekt: false, feedback: 'Ordföranden har utslagsröst i styrelsen — inte i förhållande till stämman.' },
    ],
    tips: ['Stämman = demokratisk grund, alla medlemmar röstar', 'Styrelsen förvaltar på stämmans uppdrag', 'Stora beslut (lån, stadgar, stora renoveringar) kräver stämmobeslut'],
  },
];

// ═══════════════════════════════════════════════════════════
// KAPITEL 2: DOKUMENTATION — 3 slides
// ═══════════════════════════════════════════════════════════
const Dokumentation1 = () => (
  <BgSlide bild={IMGS.stadgar}>
    <Badge text="Kapitel 2 · Dokumentation" />
    <H icon={FileText} title="Stadgarna — föreningens grundlag" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Stadgarna är det viktigaste dokumentet i föreningen. De styr vad styrelsen får och måste göra — och vad som kräver stämmobeslut.
    </p>
    <div className="space-y-3 mb-6">
      {[
        { ikon: '📋', titel: 'Vad stadgarna innehåller', text: 'Föreningens namn och ändamål, hur stämman fungerar, hur styrelsen väljs, antal ledamöter, räkenskapsår, och regler för överlåtelse av bostadsrätt.' },
        { ikon: '⚖️', titel: 'Stadgarna är bindande', text: 'Alla beslut som strider mot stadgarna kan ogiltigförklaras. Styrelsen måste känna till och följa stadgarna — okunnighet är inget försvar.' },
        { ikon: '🔄', titel: 'Ändra stadgarna', text: 'Kräver normalt 2/3 majoritet på två på varandra följande stämmor. Det är avsiktligt svårt — stadgarna ska vara stabila.' },
        { ikon: '🏛️', titel: 'Boverkets normalstadgar', text: 'Många föreningar baserar sina stadgar på HSBs eller Riksbyggens mallar. Alltid kontrollera era egna — de kan avvika.' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.ikon}</span>
          <div>
            <p className="text-white font-bold text-sm mb-1">{item.titel}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: `${O}12` }}>
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>Praktisk tips: </span>
        Läs igenom stadgarna vid varje nytt styrelseår. Skriv ut de viktigaste paragraferna och lägg dem som bilaga till protokollen.
      </p>
    </div>
  </BgSlide>
);

const Dokumentation2 = () => (
  <SplitSlide
    badge="Kapitel 2 · Dokumentation"
    title="Vilka <span style='color:#FF5421'>dokument</span> måste finnas?"
    ingress="En välskött BRF har ett komplett dokumentarkiv. Det skyddar föreningen vid tvister, revisioner och ägarbyten — och det är styrelsens ansvar att hålla det uppdaterat."
    bild={IMGS.dokument}
    bildPosition="left"
    badge2="Juridiskt skydd"
    badge2Sub="Dokumenterat = bevisat"
  >
    <StegLista steg={[
      { nr: '01', titel: 'Stadgar & föreningsregistrering', desc: 'Alltid tillgängliga. Bolagsverket har kopia. Ska finnas hos styrelsen och vara tillgängliga för medlemmar.' },
      { nr: '02', titel: 'Årsredovisning & revisionsberättelse', desc: 'Ska upprättas varje år och hållas tillgängliga minst en vecka före stämman. Ska sparas minst 10 år.' },
      { nr: '03', titel: 'Styrelseprotokoll', desc: 'Alla styrelsebeslut dokumenteras. Justeras av ordförande + en ledamot. Sparas permanent.' },
      { nr: '04', titel: 'Lägenhetsförteckning', desc: 'Förteckning över alla lägenheter, innehavare och insatser. Ska alltid vara aktuell.' },
      { nr: '05', titel: 'Underhållsplan', desc: 'Planerat underhåll med kostnadsuppskattningar. Grunden för rätt avgiftssättning.' },
    ]} />
    <InfoRuta>
      Tappa inte kontrollen över arkivet vid styrelsebyte. Överlämning ska ske skriftligt och kvitteras.
    </InfoRuta>
  </SplitSlide>
);

const Dokumentation3 = () => (
  <BgSlide bild={IMGS.arkiv}>
    <Badge text="Kapitel 2 · Dokumentation" />
    <H icon={FileText} title="Årsredovisningen — mer än siffror" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Årsredovisningen är föreningens visitkort. Den läses av mäklare, banker och köpare inför varje försäljning. En välskriven årsredovisning höjer förtroendet — och värdet.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        { titel: 'Förvaltningsberättelse', text: 'Styrelsens berättelse om verksamhetsåret. Vad som hänt, vad som planeras. Ska vara informativ — inte bara formell.' },
        { titel: 'Resultaträkning', text: 'Intäkter (avgifter, hyror) mot kostnader (drift, räntor, avskrivningar). Visar om föreningen går med vinst eller förlust.' },
        { titel: 'Balansräkning', text: 'Tillgångar (fastigheten) mot skulder (lån) och eget kapital. Visar föreningens ekonomiska ställning vid årets slut.' },
        { titel: 'Noter & nyckeltal', text: 'Fördjupad information om poster i räkenskaperna. Bankerna och mäklarna granskar skuldsättning per kvm.' },
      ].map((item, i) => (
        <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-white font-bold text-sm mb-2" style={{ color: O }}>{item.titel}</p>
          <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
    <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-red-400">Vanliga misstag</p>
      <div className="space-y-2">
        {[
          'Förvaltningsberättelse som inte nämner planerade renoveringar',
          'Skuldsättning per kvm som inte förklaras — väcker oro hos banker',
          'Underhållsfond som inte avsatts korrekt — felaktig bild av ekonomin',
          'Årsredovisning lämnad in efter deadline (7 månader efter räkenskapsårets slut)',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-red-400" />
            <p className="text-white/80 text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </BgSlide>
);

const dokumentationFragor: QuizFraga[] = [
  {
    id: 'd1', persona: 'Karin', roll: 'Ordförande, BRF Solbacken',
    bild: PERSONAS.karin, kategori: 'Dokumentation', highlight: ['stadgarna', 'bindande'],
    bubbla: 'Vi vill ta ett beslut som vi vet strider mot en paragraf i stadgarna — men alla i styrelsen är överens. Kan vi göra det?',
    fraga: 'Vad händer om styrelsen fattar ett beslut som strider mot stadgarna?',
    alternativ: [
      { text: 'Det är okej om alla ledamöter är eniga', korrekt: false, feedback: 'Fel. Enighet i styrelsen gör inte ett stadgestridigt beslut lagligt.' },
      { text: 'Beslutet kan ogiltigförklaras — stadgarna är bindande', korrekt: true, feedback: 'Rätt. Beslut som strider mot stadgarna kan angripas rättsligt och ogiltigförklaras. Stämman kan också vägra ansvarsfrihet.' },
      { text: 'Det beror på hur viktigt beslutet är', korrekt: false, feedback: 'Fel. Stadgarna gäller oavsett hur viktig frågan anses vara.' },
      { text: 'Revisorn kan godkänna ett undantag', korrekt: false, feedback: 'Fel. Revisorn granskar — de kan inte godkänna stadgebrott.' },
    ],
    tips: ['Stadgarna är föreningens grundlag — de gäller alltid', 'Okunnighet om stadgarna är inget försvar', 'Vill ni ändra stadgarna — ta det till stämman'],
  },
  {
    id: 'd2', persona: 'Lars', roll: 'Kassör, BRF Björken',
    bild: PERSONAS.lars, kategori: 'Dokumentation', highlight: ['årsredovisning', 'tillgänglig'],
    bubbla: 'Stämman är om 5 dagar och årsredovisningen är inte klar. Kan vi hålla stämman ändå och dela ut den på plats?',
    fraga: 'När måste årsredovisningen vara tillgänglig för medlemmarna?',
    alternativ: [
      { text: 'Det räcker att dela ut den på stämman', korrekt: false, feedback: 'Fel. Årsredovisningen ska vara tillgänglig minst en vecka innan stämman.' },
      { text: 'Minst en vecka innan stämman', korrekt: true, feedback: 'Rätt. Lagen kräver att årsredovisning och revisionsberättelse finns tillgängliga minst en vecka innan stämman.' },
      { text: 'Minst en månad innan stämman', korrekt: false, feedback: 'Lagens krav är en vecka — men god sed är att skicka den ännu tidigare.' },
      { text: 'Det finns inget lagkrav på när den ska vara klar', korrekt: false, feedback: 'Fel. Det finns tydliga lagkrav på både tidpunkt och tillgänglighet.' },
    ],
    tips: ['Minst 1 vecka innan stämman — helst 2–3 veckor', 'Årsredovisningen ska vara klar inom 6 månader efter räkenskapsårets slut', 'Skicka digitalt till alla medlemmar — spara tid och papper'],
  },
  {
    id: 'd3', persona: 'Sofia', roll: 'Ny ledamot, BRF Granbacken',
    bild: PERSONAS.sofia, kategori: 'Dokumentation', highlight: ['underhållsplan', 'avgift'],
    bubbla: 'Den avgående styrelsen lämnade ingen underhållsplan. Vi vet inte ens när taket eller hissen senast byttes. Vad gör vi?',
    fraga: 'Varför är underhållsplanen ett av föreningens viktigaste dokument?',
    alternativ: [
      { text: 'Den krävs för att få bygglov', korrekt: false, feedback: 'Fel. Underhållsplanen krävs inte för bygglov — men den är ändå avgörande för föreningens ekonomi.' },
      { text: 'Den är grunden för rätt avgiftssättning och förhindrar avgiftschocker', korrekt: true, feedback: 'Rätt. Utan underhållsplan riskerar föreningen att tvingas till drastiska avgiftshöjningar när stora åtgärder inte är budgeterade.' },
      { text: 'Den behövs bara vid nybyggda fastigheter', korrekt: false, feedback: 'Fel. Alla föreningar behöver en underhållsplan — äldre fastigheter kanske allra mest.' },
      { text: 'Den är bara ett rekommenderat hjälpmedel', korrekt: false, feedback: 'Den är i praktiken obligatorisk för en välskött förening och efterfrågas av revisorer och banker.' },
    ],
    tips: ['Underhållsplan = ekonomisk trygghet för alla innehavare', 'Ta in en besiktningsman för att upprätta en korrekt plan', 'Uppdatera planen varje år'],
  },
];

// ═══════════════════════════════════════════════════════════
// KAPITEL 3: LAGAR & REGLER — 3 slides
// ═══════════════════════════════════════════════════════════
const LagarRegler1 = () => (
  <BgSlide bild={IMGS.juridik}>
    <Badge text="Kapitel 3 · Lagar & regler" />
    <H icon={Shield} title="Lagarna som styr BRF:en" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Tre lagar är särskilt viktiga för varje styrelseledamot. Du behöver inte kunna dem utantill — men du måste veta var de gäller och vad de kräver av dig.
    </p>
    <div className="space-y-4 mb-6">
      {[
        {
          lag: 'Bostadsrättslagen (BRL)',
          år: 'SFS 1991:614',
          color: O,
          punkter: [
            'Innehavarens rättigheter och skyldigheter',
            'Föreningens skyldigheter mot innehavarna',
            'Regler för överlåtelse och pantsättning',
            'Villkor för andrahandsuthyrning',
            'Stämmans och styrelsens befogenheter',
          ],
        },
        {
          lag: 'Lagen om ekonomiska föreningar (LEF)',
          år: 'SFS 2018:672',
          color: '#6366f1',
          punkter: [
            'Hur styrelsen ska fungera och fatta beslut',
            'Revisorns roll och krav på revision',
            'Krav på bokföring och årsredovisning',
            'Regler för stämman och röstning',
          ],
        },
        {
          lag: 'Plan- och bygglagen (PBL)',
          år: 'SFS 2010:900',
          color: '#10b981',
          punkter: [
            'När bygglov krävs för åtgärder på fastigheten',
            'Krav på OVK (obligatorisk ventilationskontroll)',
            'Regler för tillgänglighet och säkerhet',
          ],
        },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="rounded-xl overflow-hidden"
          style={{ border: `1px solid ${item.color}30` }}>
          <div className="px-4 py-3 flex items-center justify-between"
            style={{ background: `${item.color}20` }}>
            <p className="font-bold text-white text-sm">{item.lag}</p>
            <span className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: `${item.color}30`, color: item.color }}>{item.år}</span>
          </div>
          <div className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {item.punkter.map((p, j) => (
              <div key={j} className="flex items-start gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: item.color }} />
                <p className="text-white/65 text-sm">{p}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const LagarRegler2 = () => (
  <SplitSlide
    badge="Kapitel 3 · Lagar & regler"
    title="<span style='color:#FF5421'>Likhetsprincipen</span> — allas lika värde"
    ingress="Likhetsprincipen är ett av de viktigaste juridiska skydden för enskilda bostadsrättsinnehavare. Den förbjuder styrelsen att gynna eller missgynna enskilda utan sakliga skäl."
    bild={IMGS.lag}
    bildPosition="right"
    badge2="BRL 7 kap 16 §"
    badge2Sub="Gäller alla beslut"
  >
    <StegLista steg={[
      { nr: '01', titel: 'Alla ska behandlas lika', desc: 'Styrelsen får inte fatta beslut som gynnar eller missgynnar en enskild innehavare jämfört med andra i samma situation.' },
      { nr: '02', titel: 'Sakliga skäl kan motivera skillnad', desc: 'Det är tillåtet att behandla situationer olika — men bara om det finns objektiva, sakliga skäl för skillnaden.' },
      { nr: '03', titel: 'Dokumentera alltid motiveringen', desc: 'Om ni nekar en ansökan eller godkänner ett undantag — skriv ner varför. Osäkra beslut utan dokumentation är sårbara.' },
      { nr: '04', titel: 'Konsekvenser vid brott', desc: 'Beslut som bryter mot likhetsprincipen kan ogiltigförklaras av domstol. Ledamöter kan bli skadeståndsskyldiga.' },
    ]} />
    <InfoRuta>
      Nekade du en ansökan förra året? Då måste du neka samma typ av ansökan i år — om inte omständigheterna tydligt skiljer sig åt.
    </InfoRuta>
  </SplitSlide>
);

const LagarRegler3 = () => (
  <BgSlide bild={IMGS.eu}>
    <Badge text="Kapitel 3 · Lagar & regler" />
    <H icon={Shield} title="GDPR och föreningens data" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Föreningen hanterar personuppgifter dagligen — namn, personnummer, kontaktuppgifter och betalningshistorik. GDPR gäller fullt ut, och styrelsen är personuppgiftsansvarig.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        { ikon: '📋', titel: 'Lägenhetsförteckning', text: 'Innehåller personuppgifter. Ska bara vara tillgänglig för dem som har legitimt behov.' },
        { ikon: '📧', titel: 'Medlemsregister & e-post', text: 'Kontaktuppgifter får bara användas för föreningsändamål. Inga listor till tredje part.' },
        { ikon: '🔐', titel: 'Protokoll med personuppgifter', text: 'Protokoll som namnger enskilda i känsliga sammanhang bör hanteras varsamt.' },
        { ikon: '🗑️', titel: 'Gallring', text: 'Uppgifter ska raderas när de inte längre behövs. Gamla listor och register ska rensas.' },
      ].map((item, i) => (
        <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>{item.ikon}</div>
          <p className="text-white font-bold text-sm mb-1">{item.titel}</p>
          <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
    <div className="rounded-2xl p-5" style={{ background: `${O}15`, border: `1px solid ${O}35` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Styrelsens skyldigheter</p>
      <div className="space-y-2">
        {[
          'Upprätta en förteckning över vilka personuppgifter som behandlas (registerförteckning)',
          'Informera innehavare om vilka uppgifter som lagras och varför',
          'Svara på begäran om registerutdrag inom 30 dagar',
          'Anmäla dataintrång till Integritetsskyddsmyndigheten (IMY) inom 72 timmar',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle size={14} style={{ color: O, flexShrink: 0, marginTop: 3 }} />
            <p className="text-white/80 text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </BgSlide>
);

const lagarFragor: QuizFraga[] = [
  {
    id: 'l1', persona: 'Peter', roll: 'Ordförande, BRF Almarna',
    bild: PERSONAS.peter, kategori: 'Lagar & regler', highlight: ['likhetsprincipen', 'lika'],
    bubbla: 'Vi gav en innehavare på plan 2 tillstånd att installera en altan. Nu vill grannen på plan 3 göra samma sak — men styrelsen vill neka för att de ogillar grannen personligen.',
    fraga: 'Vad strider detta mot?',
    alternativ: [
      { text: 'Ingenting — styrelsen bestämmer fritt vem som får bygga', korrekt: false, feedback: 'Fel. Styrelsen kan inte neka godtyckligt — besluten måste vara sakliga och konsekventa.' },
      { text: 'Likhetsprincipen — alla innehavare i samma situation ska behandlas lika', korrekt: true, feedback: 'Rätt. Om ni godkänt en altan för en innehavare måste ni godkänna det för en annan i samma situation — personliga sympatier räknas inte.' },
      { text: 'Plan- och bygglagen, som kräver bygglov för altaner', korrekt: false, feedback: 'PBL kan vara relevant, men det primära problemet här är likhetsprincipen i bostadsrättslagen.' },
      { text: 'Inget — grannen på plan 3 kan ju överklaga till hyresnämnden', korrekt: false, feedback: 'Rätt att hen kan överklaga — men styrelsen bör fatta korrekta beslut från början.' },
    ],
    tips: ['Dokumentera alltid skälen för era beslut', 'Lika situationer ska behandlas lika', 'Personliga sympatier är aldrig sakliga skäl'],
  },
  {
    id: 'l2', persona: 'Eva', roll: 'Sekreterare, BRF Kastanjen',
    bild: PERSONAS.eva, kategori: 'Lagar & regler', highlight: ['GDPR', 'personuppgifter'],
    bubbla: 'En ny ledamot vill skicka hela lägenhetsförteckningen med personnummer och e-postadresser till ett lokalt företag som erbjuder rabatter till boende.',
    fraga: 'Får föreningen dela lägenhetsförteckningen med ett externt företag?',
    alternativ: [
      { text: 'Ja, om styrelsen röstar för det', korrekt: false, feedback: 'Fel. Styrelsens röst kan inte godkänna brott mot GDPR.' },
      { text: 'Nej — personuppgifter får bara användas för föreningsändamål', korrekt: true, feedback: 'Rätt. GDPR förbjuder att personuppgifter delas med tredje part utan laglig grund. Rabatterbjudanden är inte ett föreningsändamål.' },
      { text: 'Ja, om boende informeras i efterhand', korrekt: false, feedback: 'Fel. Personuppgifter kräver laglig grund i förväg — inte information i efterhand.' },
      { text: 'Det beror på om företaget är lokalt eller nationellt', korrekt: false, feedback: 'Fel. GDPR gäller oavsett företagets storlek eller geografiska spridning.' },
    ],
    tips: ['Föreningen är personuppgiftsansvarig under GDPR', 'Personuppgifter får bara användas för föreningsändamål', 'Dataintrång ska anmälas till IMY inom 72 timmar'],
  },
  {
    id: 'l3', persona: 'Magnus', roll: 'Kassör, BRF Ekbacken',
    bild: PERSONAS.magnus, kategori: 'Lagar & regler', highlight: ['andrahandsuthyrning', 'beaktansvärda skäl'],
    bubbla: 'En innehavare vill hyra ut i andra hand i 18 månader medan hon arbetar i ett annat land. Styrelsen vill neka för att "det inte är föreningens policy".',
    fraga: 'Har innehavaren rätt att hyra ut i andra hand i detta fall?',
    alternativ: [
      { text: 'Nej — styrelsen bestämmer policy för andrahandsuthyrning', korrekt: false, feedback: 'Fel. Styrelsen kan inte neka utan sakliga skäl när innehavaren har beaktansvärda skäl.' },
      { text: 'Ja — tillfälligt arbete utomlands är ett beaktansvärt skäl', korrekt: true, feedback: 'Rätt. Bostadsrättslagen ger innehavare rätt till andrahandsuthyrning vid beaktansvärda skäl. Hyresnämnden kan överpröva nekandet.' },
      { text: 'Det beror på hur länge hon ägt lägenheten', korrekt: false, feedback: 'Ägandetiden påverkar inte rätten till andrahandsuthyrning.' },
      { text: 'Ja, men bara om hyresgästen godkänns av styrelsen i förväg', korrekt: false, feedback: 'Styrelsen godkänner hyresgästen — men kan inte neka utan sakliga skäl när grundkravet (beaktansvärt skäl) är uppfyllt.' },
    ],
    tips: ['Beaktansvärda skäl: arbete/studier på annan ort, provsamboende, vård av närstående', 'Neka alltid skriftligt med motivering', 'Hyresnämnden kan överpröva styrelsens beslut'],
  },
];

// ═══════════════════════════════════════════════════════════
// SLUTQUIZ — QuizSalesPage-stil med GdprQuizOverlay
// ═══════════════════════════════════════════════════════════
const SlutquizSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const fragor = [
    {
      id: 'sq1', question_text: 'Vad äger en bostadsrättsinnehavare egentligen?',
      question_type: 'single_choice', question_order: 1,
      options: { choices: ['Lägenheten och all mark under fastigheten', 'Nyttjanderätten till lägenheten — inte fastigheten i sig', 'En andel av fastighetens marknadsvärde', 'Ingenting — man hyr av föreningen'] },
      correct_answer: 'Nyttjanderätten till lägenheten — inte fastigheten i sig',
      explanation: 'Föreningen äger fastigheten gemensamt. Du äger rätten att nyttja din lägenhet (bostadsrätten) och kan sälja den på marknaden.', points: 100,
    },
    {
      id: 'sq2', question_text: 'Vilket organ är det högsta beslutande i en BRF?',
      question_type: 'single_choice', question_order: 2,
      options: { choices: ['Styrelsen', 'Ordföranden', 'Föreningsstämman', 'Revisorn'] },
      correct_answer: 'Föreningsstämman',
      explanation: 'Stämman är det högsta beslutande organet. Styrelsen väljs av och rapporterar till stämman.', points: 100,
    },
    {
      id: 'sq3', question_text: 'Vad innebär likhetsprincipen för styrelsearbetet?',
      question_type: 'single_choice', question_order: 3,
      options: { choices: ['Alla ledamöter ska ha lika lång mandatperiod', 'Innehavare i samma situation ska behandlas lika — utan godtyckliga undantag', 'Avgifterna ska vara lika höga för alla lägenheter', 'Alla beslut kräver enhällighet i styrelsen'] },
      correct_answer: 'Innehavare i samma situation ska behandlas lika — utan godtyckliga undantag',
      explanation: 'Likhetsprincipen förbjuder styrelsen att gynna eller missgynna enskilda innehavare utan sakliga skäl.', points: 100,
    },
    {
      id: 'sq4', question_text: 'När måste årsredovisningen vara tillgänglig för medlemmarna?',
      question_type: 'single_choice', question_order: 4,
      options: { choices: ['På stämmodagen', 'Minst en vecka innan stämman', 'Minst en månad innan stämman', 'Det finns inget lagkrav'] },
      correct_answer: 'Minst en vecka innan stämman',
      explanation: 'Lagen kräver att årsredovisning och revisionsberättelse finns tillgängliga minst en vecka innan stämman.', points: 100,
    },
    {
      id: 'sq5', question_text: 'Vad gäller vid andrahandsuthyrning när innehavaren arbetar utomlands?',
      question_type: 'single_choice', question_order: 5,
      options: { choices: ['Styrelsen kan alltid neka', 'Innehavaren har rätt att hyra ut — arbete utomlands är ett beaktansvärt skäl', 'Kräver stämmobeslut', 'Hyresnämnden måste godkänna i förväg'] },
      correct_answer: 'Innehavaren har rätt att hyra ut — arbete utomlands är ett beaktansvärt skäl',
      explanation: 'Bostadsrättslagen ger innehavare rätt till andrahandsuthyrning vid beaktansvärda skäl. Hyresnämnden kan överpröva ett orättfärdigt nekande.', points: 100,
    },
    {
      id: 'sq6', question_text: 'Vilken lag reglerar primärt styrelsens arbete och protokollkrav?',
      question_type: 'single_choice', question_order: 6,
      options: { choices: ['Bostadsrättslagen', 'Lagen om ekonomiska föreningar', 'Plan- och bygglagen', 'GDPR'] },
      correct_answer: 'Lagen om ekonomiska föreningar',
      explanation: 'LEF reglerar hur styrelsen ska fungera, krav på protokoll, revision och årsredovisning.', points: 100,
    },
  ];

  return (
    <BgSlide bild={IMGS.avslut} overlay="rgba(15,22,35,0.92)">
      <div className="text-center max-w-lg mx-auto">
        <Badge text="Sluttest · Hur BRF:en fungerar" />
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Testa dina kunskaper
        </h2>
        <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.6 }}>
          6 frågor om historia, dokumentation och lagar. 80% rätt krävs för godkänt.
        </p>
        <AnimatePresence>
          {isDone && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-5 mb-6 flex items-center gap-3"
              style={{ background: `${O}18`, border: `1px solid ${O}35` }}>
              <Award size={24} style={{ color: O, flexShrink: 0 }} />
              <div className="text-left">
                <p className="text-white font-bold">Modul avklarad! 🎉</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Du har klarat modulen om hur BRF:en fungerar.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizOpen(true)}
          className="w-full py-5 rounded-2xl font-black text-white text-xl flex items-center justify-center gap-3 mb-4"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 8px 32px ${O}40` }}>
          <HelpCircle size={24} /> Starta sluttest
        </motion.button>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Du kan göra om testet hur många gånger du vill
        </p>
      </div>
      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={fragor}
        passingPercent={80}
        onComplete={(passed: boolean) => { if (passed) onComplete('slutquiz'); }}
      />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════
const MODULE_FAQ = [
  { question: 'Vad är skillnaden på bostadsrätt och hyresrätt?', answer: 'Med bostadsrätt äger du nyttjanderätten till lägenheten och kan sälja den på marknaden. Med hyresrätt hyr du av en hyresvärd utan att äga något.' },
  { question: 'Vem äger fastigheten i en BRF?', answer: 'Föreningen äger fastigheten gemensamt. De enskilda innehavarna äger sin nyttjanderätt (bostadsrätt) — inte murarna i sig.' },
  { question: 'Måste föreningen ha en underhållsplan?', answer: 'Det finns inget uttryckligt lagkrav, men det är god sed och förväntas av revisorer och banker. Utan underhållsplan riskerar föreningen oväntade avgiftschocker.' },
  { question: 'Kan styrelsen neka andrahandsuthyrning?', answer: 'Ja, men bara av sakliga skäl. Om innehavaren har beaktansvärda skäl (arbete, studier, vård) kan hyresnämnden överpröva nekandet.' },
  { question: 'Vad händer om styrelsen bryter mot likhetsprincipen?', answer: 'Beslutet kan ogiltigförklaras av domstol. Ledamöter kan bli skadeståndsskyldiga. Stämman kan vägra ansvarsfrihet.' },
];

// ═══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════
const ModuleStyrelsenArbete: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    // ── 0: Intro ──────────────────────────────────────────
    {
      id: 'intro', title: 'Introduktion',
      audioSrc: '/audio/intro-brf-1.mp3',
      component: (
        <ModuleIntroSlide
          kategori="JURIDIK"
          titel="Så fungerar <span style='color:#FF5421'>bostadsrättsföreningen</span>"
          ingress="I det här avsnittet kommer vi att kika närmre på hur bostadsrättsföreningen fungerar"
          bild="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
          längd="2 timmar"
          avsnitt={11}
          onStart={() => setCurrentIndex(1)}
          videoUrl="/video/intro-brf2.mp4"
          videoTitel="Introduktion till bostadsrättsföreningen"
          vadLärDuDig={[
            'BRF:ens historia och kooperativa ursprung',
            'Föreningens viktigaste dokument',
            'Lagarna som styr styrelsearbetet',
            'Likhetsprincipen i praktiken',
            'GDPR och personuppgifter i föreningen',
            'Hur stämman och styrelsen samverkar',
          ]}
        />
      ),
    },

    // ── 1: Flödesdiagram ──────────────────────────────────
    { id: 'brf-struktur', title: 'Så fungerar BRF:en', component: <BrfFlödesdiagramSlide /> },

 { id: 'historia-tidslinje', title: '🏛️ BRF:ens historia',
  component: (
    <BrfHistorieTidslinje
      isCompleted={completedLessons.has('historia-tidslinje')}
      onComplete={handleComplete}
    />
  )
},

    // ── KAPITEL 2: DOKUMENTATION ──────────────────────────
    { id: 'dok-1', title: '📋 Stadgarna', component: <Dokumentation1 /> },
    { id: 'dok-2', title: '📁 Föreningens dokument', component: <Dokumentation2 /> },
    { id: 'dok-3', title: '📈 Årsredovisningen', component: <Dokumentation3 /> },
    {
      id: 'quiz-dokumentation', title: '🧠 Quiz: Dokumentation',
      component: (
        <KapitelQuiz
          quizId="quiz-dokumentation"
          fragor={dokumentationFragor}
          bild={IMGS.dokument}
          badge="Quiz · Dokumentation"
          onComplete={handleComplete}
          isDone={completedLessons.has('quiz-dokumentation')}
        />
      ),
    },

    // ── KAPITEL 3: LAGAR & REGLER ─────────────────────────
    { id: 'lag-1', title: '⚖️ Lagarna som styr BRF:en', component: <LagarRegler1 /> },
    { id: 'lag-2', title: '🔄 Likhetsprincipen', component: <LagarRegler2 /> },
    { id: 'lag-3', title: '🔐 GDPR i föreningen', component: <LagarRegler3 /> },
    {
      id: 'quiz-lagar', title: '🧠 Quiz: Lagar & regler',
      component: (
        <KapitelQuiz
          quizId="quiz-lagar"
          fragor={lagarFragor}
          bild={IMGS.juridik}
          badge="Quiz · Lagar & regler"
          onComplete={handleComplete}
          isDone={completedLessons.has('quiz-lagar')}
        />
      ),
    },

    // ── Befintliga importerade komponenter ────────────────
    {
      id: 'intressenter', title: 'Föreningens intressenter',
      component: (
        <IntressenterElevatorSection
          isCompleted={completedLessons.has('intressenter')}
          onComplete={() => handleComplete('intressenter')}
        />
      ),
    },
    {
      id: 'byggnad', title: 'Fastigheten',
      component: (
        <BuildingCrossSectionSection
          isCompleted={completedLessons.has('byggnad')}
          onComplete={handleComplete}
        />
      ),
    },
    {
      id: 'brf-missuppfattningar', title: '❓ Vanliga missuppfattningar',
      component: (
        <BrfMissuppfattningsQuiz
          onComplete={handleComplete}
          isDone={completedLessons.has('brf-missuppfattningar')}
          onNext={() => setCurrentIndex(i => i + 1)}
        />
      ),
    },
    {
      id: 'scenario-andrahand', title: '📋 Scenario: Andrahandsuthyrning',
      component: (
        <ScenarioAndrahand
          onComplete={handleComplete}
          isDone={completedLessons.has('scenario-andrahand')}
        />
      ),
    },

    // ── Slutquiz ──────────────────────────────────────────
    {
      id: 'slutquiz', title: '🎯 Sluttest',
      component: (
        <SlutquizSlide
          isDone={completedLessons.has('slutquiz')}
          onComplete={handleComplete}
        />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: DARK }}>
  
  {/* Fixed header */}
  <div className="flex-shrink-0" data-course-header>
    <CourseHeader
      isSidebarMinimized={false}
      isDesktop={isDesktop}
      userName={userData.name}
      userAvatar={userData.avatar}
      slideProgress={{ current: currentIndex, total: slides.length }}
    />
  </div>

  {/* Spacer som pushar innehållet under den fixade headern */}
  <div style={{ height: 'var(--header-height, 60px)', flexShrink: 0 }} />

  <GlobalSidebar />

  <div className="flex-1 overflow-hidden"
    style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
    <ModuleSlideLayout
      slides={slides}
      currentIndex={currentIndex}
      onNavigate={setCurrentIndex}
      showHeader={false}>
      {slides[currentIndex].component}
    </ModuleSlideLayout>
  </div>
      <FloatingFAQ
        faqs={MODULE_FAQ}
        title="Frågor om BRF:en"
        subtitle="Historia, dokumentation och lagar"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleStyrelsenArbete;