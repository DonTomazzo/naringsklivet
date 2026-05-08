// src/modules/Styrelsekorkortet/ModuleBeslut.tsx
// Modul: Fatta rätt beslut i föreningen
// Använder SlideL, SlideM och nya designspråket genomgående

import React, { useState, useEffect } from 'react';
import type { SlideLProps } from '../../components/CourseElements/SlideTemplates';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, HelpCircle, ChevronRight, XCircle } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide  from '../../components/CourseElements/ModuleIntroSlide';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';
import SlideL from '../../components/CourseElements/SlideL';
import SlideM from '../../components/CourseElements/SlideM';

const O     = '#FF5421';
const OD    = '#E04619';
const OL    = '#FFF0EB';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const NAVY3 = '#2a3f55';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';
const DARK  = '#0f1623';

// ─── HighlightText ────────────────────────────────────────
const HL = ({ text, words }: { text: string; words: string[] }) => {
  if (!words?.length) return <>{text}</>;
  const pat = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return <>{text.split(pat).map((p, i) =>
    words.some(w => w.toLowerCase() === p.toLowerCase())
      ? <span key={i} style={{ color: O, fontWeight: 900 }}>{p}</span>
      : <span key={i}>{p}</span>
  )}</>;
};

// ─── BgSlide med blobbar ──────────────────────────────────
const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.80)' }: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
    <img src={bild} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.30 }} />
    <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    {/* Blobbar */}
    <svg style={{ position: 'absolute', top: -50, right: -70, width: 380, height: 350, opacity: 0.72, pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 380 350">
      <path d="M202,34 C268,12 352,66 338,164 C324,262 246,322 168,306 C90,290 32,214 52,128 C72,42 136,56 202,34Z" fill={NAVY2}/>
    </svg>
    <svg style={{ position: 'absolute', top: 50, right: 90, width: 110, height: 100, opacity: 0.88, pointerEvents: 'none', zIndex: 3 }} viewBox="0 0 110 100">
      <path d="M56,7 C78,1 102,18 98,48 C94,78 72,96 48,90 C24,84 6,60 14,34 C22,8 34,13 56,7Z" fill={O}/>
    </svg>
    <svg style={{ position: 'absolute', bottom: -30, left: -40, width: 260, height: 240, opacity: 0.60, pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 260 240">
      <path d="M124,22 C166,6 224,40 216,102 C208,164 162,202 110,192 C58,182 10,140 20,84 C30,28 82,38 124,22Z" fill={NAVY3}/>
    </svg>
    <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 100px' }}>
        {children}
      </div>
    </div>
  </div>
);

// ─── SlideHuvud ───────────────────────────────────────────
const SH = ({ eyebrow, rubrik, ingress }: { eyebrow: string; rubrik: React.ReactNode; ingress?: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>{eyebrow}</p>
    <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, fontFamily: "'Nunito', sans-serif", margin: '0 0 14px', letterSpacing: '-0.01em' }}>{rubrik}</h2>
    {ingress && <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontFamily: "'Nunito', sans-serif", margin: 0, maxWidth: 580 }}>{ingress}</p>}
  </div>
);

// ─── InfoRuta ─────────────────────────────────────────────
const IR = ({ children, titel }: { children: React.ReactNode; titel?: string }) => (
  <div style={{ borderRadius: 14, padding: '18px 22px', background: `${O}12`, border: `1px solid ${O}30`, borderLeft: `4px solid ${O}`, marginTop: 20 }}>
    {titel && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 8px' }}>{titel}</p>}
    <p style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{children}</p>
  </div>
);

// ─── Snabbfakta cream ─────────────────────────────────────
const SF = ({ fakta }: { fakta: { etikett: string; värde: string }[] }) => (
  <div style={{ borderRadius: 12, background: CREAM, border: `1px solid ${SAND2}`, padding: '14px 20px', marginTop: 20, display: 'grid', gridTemplateColumns: `repeat(${fakta.length}, 1fr)`, gap: 8 }}>
    {fakta.map((f, i) => (
      <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${SAND2}` : 'none', paddingLeft: i > 0 ? 14 : 0 }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 3px' }}>{f.etikett}</p>
        <p style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: 800, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{f.värde}</p>
      </div>
    ))}
  </div>
);

// ─── Quiz-alternativ ──────────────────────────────────────
const AltKnapp = ({ alt, valt, visar, onVälj }: {
  alt: { text: string; korrekt: boolean; feedback: string };
  valt: string | null; visar: boolean; onVälj: (t: string) => void;
}) => {
  const isValt = valt === alt.text;
  const visaRes = visar && isValt;
  const korrektEjVald = visar && alt.korrekt && !isValt;
  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { scale: 1.01, x: 3 } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '14px 18px',
        borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
        background: visaRes ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)') : korrektEjVald ? `${O}08` : isValt ? OL : '#fff',
        border: `2px solid ${visaRes ? (alt.korrekt ? O : '#9ca3af') : korrektEjVald ? `${O}50` : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        transition: 'all 0.15s',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: visaRes ? (alt.korrekt ? O : '#9ca3af') : korrektEjVald ? `${O}30` : isValt ? O : '#f0f0f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 900, color: isValt || visaRes ? '#fff' : '#9ca3af',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : isValt ? '●' : null}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.4, flex: 1, fontWeight: isValt ? 700 : 500, color: '#1f2937' }}>{alt.text}</p>
    </motion.button>
  );
};

// ─── KapitelQuiz ──────────────────────────────────────────
interface QuizFraga { id: string; persona: string; roll: string; bild: string; bubbla: string; fraga: string; highlight: string[]; alternativ: { text: string; korrekt: boolean; feedback: string }[]; tips: string[]; }

const KapitelQuiz = ({ quizId, fragor, badge, onComplete, isDone }: { quizId: string; fragor: QuizFraga[]; badge: string; onComplete: (id: string) => void; isDone: boolean }) => {
  const [idx, setIdx] = useState(0);
  const [valt, setValt] = useState<string | null>(null);
  const [visar, setVisar] = useState(false);
  const [ratt, setRatt] = useState(0);
  const [fas, setFas] = useState<'quiz' | 'avslut'>('quiz');

  const cur = fragor[idx];
  const valtAlt = valt ? cur.alternativ.find(a => a.text === valt) : null;

  const handleVälj = (t: string) => {
    if (visar) return;
    setValt(t); setVisar(true);
    if (cur.alternativ.find(a => a.text === t)?.korrekt) setRatt(r => r + 1);
  };

  const nästa = () => {
    if (idx < fragor.length - 1) { setIdx(i => i + 1); setValt(null); setVisar(false); }
    else { setFas('avslut'); onComplete(quizId); }
  };

  if (fas === 'avslut') return (
    <div style={{ height: '100%', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{ratt === fragor.length ? '🏆' : '⭐'}</div>
        <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", margin: '0 0 8px' }}>{ratt === fragor.length ? 'Perfekt!' : 'Bra jobbat!'}</h3>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', margin: '0 0 24px' }}>{ratt} av {fragor.length} rätt</p>
        {isDone && <div style={{ borderRadius: 14, padding: '16px 20px', background: `${O}18`, border: `1px solid ${O}35`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <CheckCircle size={20} style={{ color: O, flexShrink: 0 }} />
          <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 14 }}>Avklarat! Gå vidare till nästa del.</p>
        </div>}
        <button onClick={() => { setIdx(0); setValt(null); setVisar(false); setRatt(0); setFas('quiz'); }}
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
          Gör om quizet
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: DARK, fontFamily: "'Nunito', sans-serif" }}>
      {/* Topbar */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.10)' }}>
          <div style={{ height: '100%', width: `${(idx / fragor.length) * 100}%`, background: `linear-gradient(to right, ${O}, ${OD})`, transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '10px 24px', background: 'rgba(10,16,28,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>{badge}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{idx + 1} / {fragor.length}</span>
        </div>
      </div>

      {/* Desktop split */}
      <div className="hidden lg:grid" style={{ flex: 1, gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', gap: 20 }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%', maxWidth: 380 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={cur.bild} alt={cur.persona} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${O}`, boxShadow: `0 0 32px ${O}50`, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0 }}>{cur.persona}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', margin: '4px 0 0' }}>{cur.roll}</p>
                </div>
              </div>
              <div style={{ padding: '20px 24px', borderRadius: '4px 20px 20px 20px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)', width: '100%' }}>
                <p style={{ fontSize: 17, color: '#fff', lineHeight: 1.75, fontWeight: 400, textAlign: 'center', margin: 0 }}>"{cur.bubbla}"</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '36px 44px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`q${idx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: '#111827', lineHeight: 1.25, marginBottom: 24 }}>
                  <HL text={cur.fraga} words={cur.highlight ?? []} />
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cur.alternativ.map(a => <AltKnapp key={a.text} alt={a} valt={valt} visar={visar} onVälj={handleVälj} />)}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`f${idx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
                <div style={{ padding: '18px 22px', borderRadius: 14, marginBottom: 16, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af40'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    {valtAlt?.korrekt ? <CheckCircle size={22} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={22} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#111827', margin: 0 }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                  </div>
                  <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65, margin: 0 }}>{valtAlt?.feedback}</p>
                </div>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: OL, border: `1px solid ${O}30`, marginBottom: 18 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, margin: '0 0 8px' }}>Kom ihåg</p>
                  {cur.tips.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>{t}</p>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={nästa}
                  style={{ width: '100%', padding: '16px', borderRadius: 12, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {idx < fragor.length - 1 ? <>Nästa fråga <ChevronRight size={18} /></> : <>Se sammanfattning <ChevronRight size={18} /></>}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobil */}
      <div className="lg:hidden flex flex-col" style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ padding: '16px 16px 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <img src={cur.bild} alt={cur.persona} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${O}`, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: 0 }}>{cur.persona}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', margin: 0 }}>{cur.roll}</p>
            </div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: '4px 16px 16px 16px', background: 'rgba(255,255,255,0.12)' }}>
            <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.65, margin: 0 }}>"{cur.bubbla}"</p>
          </div>
        </div>
        <div style={{ borderRadius: '22px 22px 0 0', background: '#FAFAF8', flex: 1, overflowY: 'auto', padding: '18px 16px 36px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`mq${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, color: '#111827', lineHeight: 1.3, marginBottom: 14 }}><HL text={cur.fraga} words={cur.highlight ?? []} /></h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {cur.alternativ.map(a => <AltKnapp key={a.text} alt={a} valt={valt} visar={visar} onVälj={handleVälj} />)}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`mf${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ padding: '14px 16px', borderRadius: 14, marginBottom: 12, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.07)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af35'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    {valtAlt?.korrekt ? <CheckCircle size={18} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={18} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 16, fontWeight: 900, color: '#111827', margin: 0 }}>{valtAlt?.korrekt ? 'Rätt! 🎉' : 'Inte riktigt'}</p>
                  </div>
                  <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0 }}>{valtAlt?.feedback}</p>
                </div>
                <button onClick={nästa} style={{ width: '100%', padding: '14px', borderRadius: 12, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 15, fontWeight: 900 }}>
                  {idx < fragor.length - 1 ? 'Nästa fråga' : 'Se sammanfattning'} →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SLIDE-DATA
// ══════════════════════════════════════════════════════════
const IMGS = {
  beslut:     'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  stamma:     'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80',
  protokoll:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
  avtal:      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
  konflikt:   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80',
};

const PERSONAS = {
  eva:    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  magnus: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  anna:   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  karin:  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
  peter:  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
};

// ── Quiz-frågor ────────────────────────────────────────────
const beslutFragor: QuizFraga[] = [
  {
    id: 'b1', persona: 'Eva', roll: 'Ordförande, BRF Kastanjen',
    bild: PERSONAS.eva, highlight: ['enhällighet', 'majoritet'],
    bubbla: 'Vi har fem ledamöter i styrelsen. Tre vill renovera trapphuset nu, två vill vänta. Kan vi fatta beslutet?',
    fraga: 'Hur fattas beslut i en BRF-styrelse?',
    alternativ: [
      { text: 'Enhällighet krävs alltid — alla måste vara överens', korrekt: false, feedback: 'Fel. Styrelsebeslut fattas med enkel majoritet om inte annat framgår av stadgarna.' },
      { text: 'Enkel majoritet räcker — tre av fem är tillräckligt', korrekt: true, feedback: 'Rätt. Styrelsebeslut fattas med enkel majoritet. Vid lika röstetal har ordföranden utslagsröst.' },
      { text: 'Ordföranden bestämmer ensam vid oenighet', korrekt: false, feedback: 'Fel. Ordföranden har utslagsröst vid lika röstetal — men beslutet fattas av styrelsen gemensamt.' },
      { text: 'Beslutet måste godkännas av stämman', korrekt: false, feedback: 'Fel. Löpande förvaltningsbeslut fattas av styrelsen utan stämmans inblandning.' },
    ],
    tips: ['Enkel majoritet = mer än hälften av de röstande', 'Ordföranden har utslagsröst vid lika röstetal', 'Stora beslut (lån, stadgar) kräver stämmobeslut'],
  },
  {
    id: 'b2', persona: 'Magnus', roll: 'Kassör, BRF Ekbacken',
    bild: PERSONAS.magnus, highlight: ['protokoll', 'justeras'],
    bubbla: 'Vi håller styrelsemöte varannan månad men skriver sällan protokoll förrän en månad senare. Är det ett problem?',
    fraga: 'Vad gäller för styrelseprotokoll?',
    alternativ: [
      { text: 'Protokoll är frivilligt — det är upp till styrelsen', korrekt: false, feedback: 'Fel. Styrelseprotokoll är obligatoriskt enligt LEF och ska föras vid varje möte.' },
      { text: 'Protokollet ska skrivas och justeras inom rimlig tid efter mötet', korrekt: true, feedback: 'Rätt. Protokollet ska justeras av ordföranden och ytterligare en ledamot. Det ska vara tillgängligt för revisor och, vid begäran, för stämman.' },
      { text: 'Protokollet behöver bara skrivas om beslut fattades', korrekt: false, feedback: 'Fel. Protokoll ska skrivas vid varje styrelsemöte — även om inga formella beslut fattades.' },
      { text: 'En månad är rimlig tid för protokollskrivning', korrekt: false, feedback: 'En månad är för lång tid. God sed är att protokollet justeras inom ett par veckor.' },
    ],
    tips: ['Protokoll är obligatoriskt enligt LEF', 'Justeras av ordförande + ytterligare en ledamot', 'Sparas permanent och kan begäras av revisor'],
  },
  {
    id: 'b3', persona: 'Anna', roll: 'Sekreterare, BRF Linden',
    bild: PERSONAS.anna, highlight: ['firmateckning', 'avtal'],
    bubbla: 'En ledamot har utan styrelsens godkännande skrivit på ett 3-årsavtal med ett städföretag. Vad gäller?',
    fraga: 'Vem får teckna avtal för föreningens räkning?',
    alternativ: [
      { text: 'Vem som helst i styrelsen — alla ledamöter är behöriga', korrekt: false, feedback: 'Fel. Firmateckning sker enligt vad som är registrerat hos Bolagsverket — antingen av styrelsen gemensamt eller av firmatecknare.' },
      { text: 'Firmatecknare registrerade hos Bolagsverket — eller styrelsen gemensamt', korrekt: true, feedback: 'Rätt. Firmateckning sker av de som är registrerade hos Bolagsverket. Avtal som tecknas utan behörighet kan ogiltigförklaras.' },
      { text: 'Ordföranden kan alltid teckna avtal på egen hand', korrekt: false, feedback: 'Fel. Ordföranden är inte automatiskt firmatecknare. Det beror på vad som är registrerat.' },
      { text: 'Revisorn godkänner vilka avtal som är giltiga', korrekt: false, feedback: 'Fel. Revisorn granskar i efterhand — de utfärdar inte behörighet.' },
    ],
    tips: ['Kontrollera vem som är registrerad firmatecknare hos Bolagsverket', 'Avtal av stor ekonomisk betydelse bör ha styrelsebeslut bakom sig', 'Registreringsbeviset visar vem som är behörig'],
  },
];

const stämmaFragor: QuizFraga[] = [
  {
    id: 's1', persona: 'Karin', roll: 'Ordförande, BRF Solbacken',
    bild: PERSONAS.karin, highlight: ['kallelse', 'veckor'],
    bubbla: 'Vi ska ha ordinarie stämma om tre veckor. Är det tillräcklig framförhållning för kallelsen?',
    fraga: 'Hur lång tid i förväg ska kallelse till ordinarie stämma skickas?',
    alternativ: [
      { text: 'En vecka räcker', korrekt: false, feedback: 'Fel. Kallelse ska skickas ut i god tid — vanligtvis 2–6 veckor enligt stadgarna.' },
      { text: 'Enligt stadgarna — vanligtvis 2–6 veckor innan', korrekt: true, feedback: 'Rätt. Kallelsereglerna finns i era stadgar. Kontrollera alltid era egna stadgar — de är bindande.' },
      { text: 'Minst tre månader i förväg', korrekt: false, feedback: 'Fel. Tre månader är onödigt lång tid. Kontrollera era stadgar för exakt tidsgräns.' },
      { text: 'Det finns inget lagkrav på kallelse', korrekt: false, feedback: 'Fel. Kallelse är obligatoriskt och regleras i stadgarna och LEF.' },
    ],
    tips: ['Kallelsereglerna finns i era stadgar — läs dem', 'Kallelsen ska innehålla dagordning och tid/plats', 'Årsredovisning ska bifogas eller finnas tillgänglig 1 vecka innan'],
  },
  {
    id: 's2', persona: 'Peter', roll: 'Ny ledamot, BRF Almarna',
    bild: PERSONAS.peter, highlight: ['ansvarsfrihet', 'stämman'],
    bubbla: 'Vad händer om stämman vägrar ge styrelsen ansvarsfrihet? Vi i den nya styrelsen är lite oroliga för vad föregångarna gjort.',
    fraga: 'Vad innebär det om stämman vägrar ansvarsfrihet?',
    alternativ: [
      { text: 'Ingenting — det är bara en symbolisk omröstning', korrekt: false, feedback: 'Fel. Vägrad ansvarsfrihet är allvarligt — det öppnar för skadeståndskrav mot styrelseledamöterna.' },
      { text: 'Föreningen kan väcka skadeståndstalan mot de berörda ledamöterna', korrekt: true, feedback: 'Rätt. Vägrad ansvarsfrihet innebär att föreningen behåller rätten att stämma ledamöterna för skador de orsakat föreningen.' },
      { text: 'Ledamöterna måste avgå omedelbart', korrekt: false, feedback: 'Fel. Vägrad ansvarsfrihet leder inte automatiskt till avgångstvång — men det är ett allvarligt förtroendevotum.' },
      { text: 'Revisorn tar över styrelsens befogenheter', korrekt: false, feedback: 'Fel. Revisorn har ingen sådan befogenhet.' },
    ],
    tips: ['Ansvarsfrihet = stämman godkänner styrelsens förvaltning', 'Vägrad ansvarsfrihet öppnar för skadeståndskrav', 'Preskriptionstiden är normalt 5 år'],
  },
];

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleBeslut: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [userData] = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) => setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [

    // ── 0: Intro ──────────────────────────────────────────
    {
      id: 'intro', title: 'Introduktion',
      component: (
        <ModuleIntroSlide
          kategori="BESLUTSFATTANDE"
          titel="Fatta rätt beslut <span style='color:#FF5421'>i föreningen</span>"
          ingress="Lär dig hur styrelsen fattar beslut, håller stämma och hanterar konflikter — på rätt sätt."
          bild="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
          längd="1,5 timmar"
          avsnitt={8}
          onStart={() => setCurrentIndex(1)}
          videoUrl=""
          videoTitel="Introduktion till beslutsfattande"
          vadLärDuDig={[
            'Hur styrelsen fattar beslut — majoritet och enhällighet',
            'Protokollets krav och funktion',
            'Firmateckning och behörighet',
            'Stämmans roll och kallelseregler',
            'Ansvarsfrihet — vad det innebär',
            'Konflikthantering i styrelsearbetet',
          ]}
        />
      ),
    },

    // ── 1: Modulöversikt — SlideL ─────────────────────────
    {
      id: 'översikt', title: 'Avsnitten',
      component: (
        <SlideL
          eyebrow="Beslutsfattande · Översikt"
          rubrik="Fatta rätt beslut"
          subRubrik="ett tryggt styrelsearbete"
          ingress="Varje avsnitt ger dig konkreta verktyg för att fatta säkra, dokumenterade beslut — och undvika de vanligaste fallgroparna."
          målgrupper={[
            { titel: 'Nya ledamöter', desc: 'Förstå spelreglerna från dag ett', accentColor: O },
            { titel: 'Ordförande', desc: 'Led möten och beslut med säkerhet' },
            { titel: 'Sekreterare', desc: 'Protokollför rätt varje gång' },
          ]}
          listaRubrik="Avsnitten"
          lista={[
            { accent: O,         titel: 'Styrelsebeslut — majoritet och process',   desc: 'Hur beslut fattas, vad som krävs och hur ni dokumenterar.' },
            { accent: OD,        titel: 'Protokollets krav och funktion',            desc: 'Obligatoriskt enligt LEF — mall, justering och arkivering.' },
            { accent: NAVY,      titel: 'Firmateckning och behörighet',              desc: 'Vem får teckna avtal? Registrering och konsekvenser.' },
            { accent: NAVY2,     titel: 'Stämman — kallelse, dagordning, beslut',   desc: 'Ordinarie och extra stämma. Vad som kräver stämmobeslut.' },
            { accent: SAND2,     titel: 'Ansvarsfrihet — och vad det innebär',      desc: 'Vad händer om stämman säger nej? Skadestånd och preskription.' },
            { accent: '#6366f1', titel: 'Konflikthantering i styrelsearbetet',      desc: 'Hantera oenighet professionellt och dokumenterat.' },
          ]}
          högerBg="cream"
        />
      ),
    },

    // ── 2: Styrelsebeslut — SlideM (kort-grid) ────────────
    {
      id: 'beslut-process', title: '⚖️ Styrelsebeslut',
      component: (
        <SlideM
          eyebrow="Kapitel 1 · Styrelsebeslut"
          rubrik="Hur fattas ett styrelsebeslut?"
          ingress="Styrelsearbetet bygger på demokrati och dokumentation. Förstå processen — och vilka beslut som kräver stämmans godkännande."
          bg="sand"
          kort={[
            { nr: '01', titel: 'Enkel majoritet', kort: 'Mer än hälften av de röstande ledamöterna. Ordföranden har utslagsröst vid lika röstetal.', variant: 'navy' },
            { nr: '02', titel: 'Beslutsförhet', kort: 'Styrelsen är beslutsför när mer än hälften av ledamöterna är närvarande.', variant: 'orange' },
            { nr: '03', titel: 'Stämmobeslut krävs', kort: 'Lån, stadgeändringar, stora renoveringar och val av styrelse beslutas av stämman.', variant: 'sand' },
            { nr: '04', titel: 'Jäv', kort: 'En ledamot får inte delta i beslut där hen har ett personligt intresse som strider mot föreningens.', variant: 'cream' },
            { nr: '05', titel: 'Dokumentation', kort: 'Alla styrelsebeslut dokumenteras i protokollet — oavsett om de fattas på möte eller per capsulam.', variant: 'navy' },
            { nr: '06', titel: 'Per capsulam', kort: 'Beslut kan fattas utan möte om alla ledamöter är eniga och beslutet dokumenteras skriftligt.', variant: 'orange' },
          ]}
          snabbfakta={[
            { etikett: 'Majoritet', värde: 'Enkel (50%+1)' },
            { etikett: 'Utslagsröst', värde: 'Ordföranden' },
            { etikett: 'Beslutsför', värde: '>50% närvaro' },
            { etikett: 'Lag', värde: 'LEF 2018:672' },
          ]}
        />
      ),
    },

    // ── 3: Protokoll — BgSlide ────────────────────────────
    {
      id: 'protokoll', title: '📋 Protokollet',
      component: (
        <BgSlide bild={IMGS.protokoll}>
          <SH
            eyebrow="Kapitel 2 · Protokoll"
            rubrik={<>Protokollet — <span style={{ color: O }}>obligatoriskt och permanent</span></>}
            ingress="Styrelseprotokollet är ert juridiska skydd. Det dokumenterar att ni fattat rätt beslut, på rätt sätt, av rätt personer."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              { nr: '01', titel: 'Obligatoriskt enligt LEF', desc: 'Protokoll ska föras vid varje styrelsemöte — även om inga formella beslut fattades.' },
              { nr: '02', titel: 'Justeras av ordförande + en ledamot', desc: 'Protokollet justeras av ordföranden och ytterligare en ledamot inom rimlig tid.' },
              { nr: '03', titel: 'Sparas permanent', desc: 'Styrelseprotokoll har inget gallringsdatum. De sparas permanent och kan begäras av revisor.' },
              { nr: '04', titel: 'Tillgängligt för revisor', desc: 'Revisorn ska ha tillgång till alla protokoll. Vägrar styrelsen att visa protokoll är det ett allvarligt tecken.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: O, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif" }}>
                  {s.nr}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 4px', fontFamily: "'Nunito', sans-serif" }}>{s.titel}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6, margin: 0, fontFamily: "'Nunito', sans-serif" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <IR titel="Praktisk checklista">
            Datum, plats och närvarande → Dagordning → Beslut (vad, av vem, med vilken majoritet) → Eventuella reservationer → Justering av ordförande + ledamot.
          </IR>
          <SF fakta={[
            { etikett: 'Justering', värde: 'Ordförande + 1' },
            { etikett: 'Sparas', värde: 'Permanent' },
            { etikett: 'Lag', värde: 'LEF 2018:672' },
            { etikett: 'Tillgänglig', värde: 'Revisor & stämma' },
          ]} />
        </BgSlide>
      ),
    },

    // ── 4: Firmateckning — BgSlide ────────────────────────
    {
      id: 'firma', title: '✍️ Firmateckning',
      component: (
        <BgSlide bild={IMGS.avtal}>
          <SH
            eyebrow="Kapitel 3 · Firmateckning"
            rubrik={<>Vem får <span style={{ color: O }}>teckna avtal</span> för föreningen?</>}
            ingress="Firmateckning är en av de vanligaste källorna till problem i BRF-styrelser. Förstå vem som är behörig — och vad som händer om fel person skriver på."
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { titel: 'Registrerade firmatecknare', text: 'De som är registrerade hos Bolagsverket. Vanligtvis ordförande + kassör gemensamt, eller styrelsen gemensamt.', bg: NAVY },
              { titel: 'Styrelsen gemensamt', text: 'Om inte specifika firmatecknare är registrerade tecknar styrelsen gemensamt — vilket kräver närvaro av majoritet.', bg: `${O}15` },
              { titel: 'Obehörig firmateckning', text: 'Avtal tecknade utan behörighet kan ogiltigförklaras. Ledamoten kan bli personligt ansvarig.', bg: 'rgba(239,68,68,0.12)' },
              { titel: 'Uppdatera registret', text: 'Vid styrelsebyte — anmäl nya firmatecknare till Bolagsverket inom 4 veckor.', bg: 'rgba(255,255,255,0.07)' },
            ].map((k, i) => (
              <div key={i} style={{ padding: '14px 16px', borderRadius: 12, background: k.bg, border: '1px solid rgba(255,255,255,0.12)' }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: O, margin: '0 0 5px', fontFamily: "'Nunito', sans-serif" }}>{k.titel}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, margin: 0, fontFamily: "'Nunito', sans-serif" }}>{k.text}</p>
              </div>
            ))}
          </div>
          <IR titel="Kom ihåg">
            Kontrollera alltid registreringsbeviset från Bolagsverket innan ni skriver under avtal. Det ska inte vara äldre än ett år.
          </IR>
          <SF fakta={[
            { etikett: 'Registreras hos', värde: 'Bolagsverket' },
            { etikett: 'Anmäl inom', värde: '4 veckor' },
            { etikett: 'Bevisets ålder', värde: 'Max 1 år' },
          ]} />
        </BgSlide>
      ),
    },

    // ── 5: Quiz beslut ────────────────────────────────────
    {
      id: 'quiz-beslut', title: '🧠 Quiz: Beslut & protokoll',
      component: (
        <KapitelQuiz
          quizId="quiz-beslut"
          fragor={beslutFragor}
          badge="Quiz · Beslut & protokoll"
          onComplete={handleComplete}
          isDone={completedLessons.has('quiz-beslut')}
        />
      ),
    },

    // ── 6: Stämman — SlideM ───────────────────────────────
    {
      id: 'stamma', title: '🏛️ Stämman',
      component: (
        <SlideM
          eyebrow="Kapitel 4 · Föreningsstämman"
          rubrik="Stämmans roll och befogenheter"
          ingress="Stämman är föreningens högsta beslutande organ. Förstå vad som kräver stämmobeslut — och vad som händer om ni missar det."
          bg="sand"
          kort={[
            { nr: '01', titel: 'Ordinarie stämma', kort: 'Hålls en gång per år, vanligtvis inom 6 månader efter räkenskapsårets slut. Obligatorisk.', variant: 'navy' },
            { nr: '02', titel: 'Extra stämma', kort: 'Kan kallas när styrelsen anser det nödvändigt, eller när revisor eller 1/10 av medlemmarna kräver det.', variant: 'orange' },
            { nr: '03', titel: 'Kallelse', kort: 'Ska skickas enligt stadgarna — vanligtvis 2–6 veckor innan. Innehåller dagordning.', variant: 'sand' },
            { nr: '04', titel: 'Val av styrelse', kort: 'Stämman väljer styrelseledamöter och suppleanter. Mandatperiod regleras i stadgarna.', variant: 'cream' },
            { nr: '05', titel: 'Fastställa årsredovisning', kort: 'Stämman godkänner årsredovisningen och beviljar (eller vägrar) ansvarsfrihet.', variant: 'navy' },
            { nr: '06', titel: 'Stora ekonomiska beslut', kort: 'Lån som överstiger vad stadgarna tillåter styrelsen att besluta om kräver stämmobeslut.', variant: 'orange' },
          ]}
          snabbfakta={[
            { etikett: 'Ordinarie stämma', värde: 'Senast 6 mån' },
            { etikett: 'Kallelse', värde: '2–6 veckor' },
            { etikett: 'Årsredovisning', värde: '1 v. innan' },
            { etikett: 'Kräv extra stämma', värde: '1/10 av medl.' },
          ]}
        />
      ),
    },

    // ── 7: Ansvarsfrihet — BgSlide ────────────────────────
    {
      id: 'ansvarsfrihet', title: '🔍 Ansvarsfrihet',
      component: (
        <BgSlide bild={IMGS.stamma}>
          <SH
            eyebrow="Kapitel 5 · Ansvarsfrihet"
            rubrik={<>Ansvarsfrihet — <span style={{ color: O }}>vad det verkligen innebär</span></>}
            ingress="Ansvarsfrihet är ett av stämmans viktigaste verktyg för att hålla styrelsen ansvarig. Förstå vad ja och nej betyder."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { emoji: '✅', titel: 'Beviljad ansvarsfrihet', text: 'Stämman godkänner styrelsens förvaltning. Föreningen avsäger sig rätten att väcka skadeståndstalan för den aktuella perioden.' },
              { emoji: '❌', titel: 'Vägrad ansvarsfrihet', text: 'Stämman anser att styrelsen missköt uppdraget. Föreningen behåller rätten att stämma ledamöterna för skador de orsakat föreningen.' },
              { emoji: '⏱️', titel: 'Preskription', text: 'Skadeståndskrav mot styrelseledamöter preskriberas normalt efter 5 år. Vägrad ansvarsfrihet "stoppar klockan" om talan väcks i tid.' },
              { emoji: '📋', titel: 'Revisorns yttrande', text: 'Revisorn rekommenderar om ansvarsfrihet ska beviljas eller inte. Stämman är inte bunden av rekommendationen men den väger tungt.' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{r.emoji}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 4px', fontFamily: "'Nunito', sans-serif" }}>{r.titel}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.6, margin: 0, fontFamily: "'Nunito', sans-serif" }}>{r.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <IR titel="Praktisk konsekvens">
            Om ni i den nya styrelsen misstänker att föregångarna gjort fel — rådfråga revisor och juridisk rådgivare innan stämman beslutar om ansvarsfrihet.
          </IR>
        </BgSlide>
      ),
    },

    // ── 8: Quiz stämma ────────────────────────────────────
    {
      id: 'quiz-stamma', title: '🧠 Quiz: Stämma & ansvar',
      component: (
        <KapitelQuiz
          quizId="quiz-stamma"
          fragor={stämmaFragor}
          badge="Quiz · Stämma & ansvar"
          onComplete={handleComplete}
          isDone={completedLessons.has('quiz-stamma')}
        />
      ),
    },

    // ── 9: Slutquiz ───────────────────────────────────────
    {
      id: 'slutquiz', title: '🎯 Sluttest',
      component: (
        <BgSlide bild={IMGS.beslut} overlay="rgba(15,22,35,0.92)">
          <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>
              Sluttest · Fatta rätt beslut
            </p>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🏆</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", margin: '0 0 10px' }}>
              Testa dina kunskaper
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, margin: '0 0 28px' }}>
              6 frågor om styrelsebeslut, protokoll, stämma och ansvarsfrihet. 80% krävs för godkänt.
            </p>
            <AnimatePresence>
              {completedLessons.has('slutquiz') && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ borderRadius: 14, padding: '16px 20px', background: `${O}18`, border: `1px solid ${O}35`, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <Award size={22} style={{ color: O, flexShrink: 0 }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: '#fff', fontWeight: 800, margin: 0, fontSize: 14, fontFamily: "'Nunito', sans-serif" }}>Modul avklarad! 🎉</p>
                    <p style={{ color: 'rgba(255,255,255,0.50)', margin: 0, fontSize: 12, fontFamily: "'Nunito', sans-serif" }}>Du har klarat modulen om beslutsfattande.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setQuizOpen(true)}
              style={{ width: '100%', padding: '18px', borderRadius: 14, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 17, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 8px 28px ${O}38`, fontFamily: "'Nunito', sans-serif", marginBottom: 12 }}>
              <HelpCircle size={22} /> Starta sluttest
            </motion.button>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Nunito', sans-serif" }}>Du kan göra om testet hur många gånger du vill</p>
          </div>
          <GdprQuizOverlay
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            passingPercent={80}
            onComplete={(passed: boolean) => { if (passed) handleComplete('slutquiz'); }}
            questions={[
              { id: 'sq1', question_text: 'Hur fattas beslut i en BRF-styrelse?', question_type: 'single_choice', question_order: 1, options: { choices: ['Enhällighet krävs alltid', 'Enkel majoritet räcker', 'Ordföranden bestämmer', 'Stämman beslutar alltid'] }, correct_answer: 'Enkel majoritet räcker', explanation: 'Styrelsebeslut fattas med enkel majoritet. Ordföranden har utslagsröst vid lika röstetal.', points: 100 },
              { id: 'sq2', question_text: 'Vad är obligatoriskt att föra vid varje styrelsemöte?', question_type: 'single_choice', question_order: 2, options: { choices: ['Deltagarförteckning', 'Protokoll', 'Budget', 'Revisionsberättelse'] }, correct_answer: 'Protokoll', explanation: 'Styrelseprotokoll är obligatoriskt enligt LEF och ska justeras av ordförande och ytterligare en ledamot.', points: 100 },
              { id: 'sq3', question_text: 'Vem får teckna avtal för föreningens räkning?', question_type: 'single_choice', question_order: 3, options: { choices: ['Vilken ledamot som helst', 'Ordföranden ensam', 'Registrerade firmatecknare hos Bolagsverket', 'Kassören alltid'] }, correct_answer: 'Registrerade firmatecknare hos Bolagsverket', explanation: 'Firmateckning sker av de som är registrerade hos Bolagsverket. Kontrollera alltid registreringsbeviset.', points: 100 },
              { id: 'sq4', question_text: 'Hur lång tid i förväg ska kallelse till ordinarie stämma skickas?', question_type: 'single_choice', question_order: 4, options: { choices: ['En vecka', 'Tre månader', 'Enligt stadgarna — vanligtvis 2–6 veckor', 'Det finns inget krav'] }, correct_answer: 'Enligt stadgarna — vanligtvis 2–6 veckor', explanation: 'Kallelsereglerna finns i era stadgar. Kontrollera alltid era egna stadgar — de är bindande.', points: 100 },
              { id: 'sq5', question_text: 'Vad innebär vägrad ansvarsfrihet?', question_type: 'single_choice', question_order: 5, options: { choices: ['Ingenting — symbolisk omröstning', 'Föreningen kan väcka skadeståndstalan mot ledamöterna', 'Ledamöterna måste avgå', 'Revisorn tar över'] }, correct_answer: 'Föreningen kan väcka skadeståndstalan mot ledamöterna', explanation: 'Vägrad ansvarsfrihet innebär att föreningen behåller rätten att stämma ledamöterna för skador de orsakat.', points: 100 },
              { id: 'sq6', question_text: 'Inom hur lång tid ska nya firmatecknare anmälas till Bolagsverket?', question_type: 'single_choice', question_order: 6, options: { choices: ['En månad', '4 veckor', '6 månader', 'Innan nästa stämma'] }, correct_answer: '4 veckor', explanation: 'Nya styrelseledamöter och firmatecknare ska anmälas till Bolagsverket inom 4 veckor efter konstituerande möte.', points: 100 },
            ]}
          />
        </BgSlide>
      ),
    },
  ];

  const MODULE_FAQ = [
    { question: 'Måste styrelsen vara enig för att fatta ett beslut?', answer: 'Nej. Styrelsebeslut fattas med enkel majoritet. Ordföranden har utslagsröst vid lika röstetal.' },
    { question: 'Vad händer om vi glömmer att skriva protokoll?', answer: 'Protokoll är obligatoriskt enligt LEF. Saknade protokoll kan vara ett problem vid revision och vid tvist om vad som beslutades.' },
    { question: 'Kan vi fatta beslut via mejl?', answer: 'Ja, så kallat per capsulam-beslut. Alla ledamöter måste vara eniga och beslutet dokumenteras skriftligt.' },
    { question: 'Vad kräver stämmobeslut?', answer: 'Lån, stadgeändringar, val av styrelse, fastställande av årsredovisning och stora ekonomiska beslut som överstiger styrelsens befogenhet.' },
    { question: 'Kan vi neka att visa protokollet för en medlem?', answer: 'Nej. Protokoll ska vara tillgängliga för revisor. Medlemmar kan begära att få ta del av protokoll via stämman.' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: DARK }}>
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>
      <div style={{ height: 'var(--header-height, 60px)', flexShrink: 0 }} />
      <GlobalSidebar />
      <div className="flex-1 overflow-hidden" style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
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
        title="Frågor om beslutsfattande"
        subtitle="Beslut, protokoll, stämma och ansvar"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleBeslut;