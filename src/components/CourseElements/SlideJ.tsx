// ══════════════════════════════════════════════════════════
// SLIDE J — Interaktivt scenario-quiz
// Persona vänster + pratbubbla, fråga + svarsalternativ höger.
// All styling centraliserad — importera och skicka in frågor.
//
// ANVÄNDNING:
//   <SlideJ
//     fragor={mittQuizFragor}
//     bakgrundsbild="https://..."
//     onComplete={handleComplete}
//     onNext={() => setCurrentIndex(i => i + 1)}
//   />
// ══════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw,
  Award, HelpCircle, X
} from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ── TYPER ────────────────────────────────────────────────
export interface SlideJAlternativ {
  text: string;
  korrekt: boolean;
  feedback: string;
}

export interface SlideJFraga {
  id: number | string;
  persona: string;
  roll: string;
  bild: string;
  kategori: string;
  rubrik?: string;           // valfri rubrik överst (vit del)
  rubrikOrange?: string;     // valfri rubrik (orange del)
  bubbla: string;
  fraga: string;
  alternativ: SlideJAlternativ[];
  tips: string[];
}

export interface SlideJProps {
  /** Array med quiz-frågor */
  fragor: SlideJFraga[];
  /** Callback när hela quizet är klart */
  onComplete?: (id: string) => void;
  /** Callback när användaren klickar "Gå vidare" på resultatskärmen */
  onNext?: () => void;
  /** Om quizet redan är genomfört tidigare */
  isDone?: boolean;
  /** Bakgrundsbild bakom vänster persona-sida (default: kontorsbild) */
  bakgrundsbild?: string;
  /** Unikt id för att rapportera completion, t.ex. "quiz-brf-missuppfattningar" */
  completionId?: string;
  /** Visa intro-skärm innan quizet startar (default: true) */
  visaIntro?: boolean;
  /** Intro-rubrik (stöder <span>-taggar för färgning) */
  introRubrik?: string;
  /** Intro-beskrivning */
  introBeskrivning?: string;
}

// ── ALTERNATIV-KNAPP (intern hjälpkomponent) ─────────────
const AlternativKnapp = ({
  alt, valt, visar, onVälj,
}: {
  alt: SlideJAlternativ;
  valt: string | null;
  visar: boolean;
  onVälj: (t: string) => void;
}) => {
  const isValt              = valt === alt.text;
  const visaRes             = visar && isValt;
  const isCorrectUnselected = visar && alt.korrekt && !isValt;

  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { scale: 1.01, boxShadow: `0 4px 20px ${O}25`, borderColor: O } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left',
        padding: '16px 18px', minHeight: 60,
        borderRadius: 14,
        background: visaRes
          ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)')
          : isCorrectUnselected ? `${O}08`
          : isValt ? OL : '#fff',
        border: `2px solid ${
          visaRes ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}50`
          : isValt ? O : '#e5e7eb'
        }`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 14,
        transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 4px 16px ${O}20` : 'none',
      }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: visaRes
          ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}30`
          : isValt ? O : '#f0f0f0',
        border: `2px solid ${visaRes ? 'transparent' : isValt ? O : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900,
        color: isValt || visaRes ? '#fff' : '#9ca3af',
        transition: 'all 0.18s',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : isValt ? '●' : null}
      </div>
      <p style={{
        fontSize: 15, lineHeight: 1.5, flex: 1,
        color: visaRes ? (alt.korrekt ? '#b84400' : '#6b7280') : '#1f2937',
        fontWeight: isValt ? 700 : 500,
      }}>
        {alt.text}
      </p>
    </motion.button>
  );
};

// ── HUVUD-KOMPONENT ──────────────────────────────────────
export const SlideJ = ({
  fragor,
  onComplete,
  onNext,
  isDone = false,
  bakgrundsbild = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
  completionId = 'slide-j-quiz',
  visaIntro = true,
  introRubrik = "Vad tror du att du vet om <span style='color:#FF5421'>det här?</span>",
  introBeskrivning = 'Testa dina kunskaper på vanliga situationer och missuppfattningar.',
}: SlideJProps) => {
  const [fas, setFas]         = useState<'intro' | 'quiz' | 'result'>(visaIntro ? 'intro' : 'quiz');
  const [idx, setIdx]         = useState(0);
  const [valt, setValt]       = useState<string | null>(null);
  const [visar, setVisar]     = useState(false);
  const [poäng, setPoäng]     = useState(0);
  const [rätt, setRätt]       = useState(0);
  const [svar, setSvar]       = useState<boolean[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!fragor || fragor.length === 0) {
    return <div style={{ padding: 40, color: '#fff' }}>Inga frågor att visa.</div>;
  }

  const maxPoäng = fragor.length * 100;
  const current  = fragor[idx];
  const valtAlt  = valt ? current.alternativ.find(a => a.text === valt) : null;
  const pctNow   = Math.round((poäng / maxPoäng) * 100);

  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = current.alternativ.find(a => a.text === text)!;
    setValt(text); setVisar(true);
    if (alt.korrekt) { setPoäng(p => p + 100); setRätt(r => r + 1); }
    setSvar(s => [...s, alt.korrekt]);
  };

  const handleNästa = () => {
    if (idx < fragor.length - 1) { setIdx(i => i + 1); setValt(null); setVisar(false); }
    else { setFas('result'); onComplete?.(completionId); }
  };

  const handleOm = () => {
    setFas(visaIntro ? 'intro' : 'quiz');
    setIdx(0); setValt(null);
    setVisar(false); setPoäng(0); setRätt(0); setSvar([]);
  };

  const progress = (idx / fragor.length) * 100;

  // ── INTRO ──────────────────────────────────────────────
  if (fas === 'intro') return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1623' }}>
      <img src={bakgrundsbild} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(15,22,35,0.97) 0%,rgba(15,22,35,0.85) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 480, padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, marginBottom: 32, background: `${O}22`, color: O, border: `1px solid ${O}44`, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
          <HelpCircle size={13} /> {fragor.length} situationer
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1.2, fontFamily: "'Nunito', sans-serif", marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: introRubrik }} />
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 32 }}>
          {introBeskrivning}
        </p>
        {isDone && (
          <div style={{ marginBottom: 20, borderRadius: 12, padding: '10px 16px', fontSize: 14, fontWeight: 600, background: `${O}20`, color: O, border: `1px solid ${O}40` }}>
            ✓ Du har redan genomfört detta quiz
          </div>
        )}
        <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
          onClick={() => setFas('quiz')}
          style={{ width: '100%', padding: '18px', borderRadius: 16, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 17, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: `linear-gradient(135deg,${O},${OD})`, boxShadow: `0 8px 32px ${O}45` }}>
          {isDone ? 'Gör om quizet' : 'Starta quizet'} <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );

  // ── RESULT ─────────────────────────────────────────────
  if (fas === 'result') {
    const label = pctNow >= 80 ? 'Utmärkt! Du kan det här.'
      : pctNow >= 50 ? 'Bra jobbat — men några luckor finns kvar.'
      : 'Det finns mer att lära sig — och det är precis vad kursen ger dig.';
    return (
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1623' }}>
        <img src={bakgrundsbild} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.9)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 420, padding: '48px 32px', textAlign: 'center' }}>
          <Award size={48} style={{ color: O, marginBottom: 20 }} />
          <p style={{ fontSize: 60, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{pctNow}%</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>{rätt} av {fragor.length} rätt</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {svar.map((r, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: r ? O : 'rgba(255,255,255,0.2)' }} />)}
          </div>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 28 }}>{label}</p>
          {onNext && (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onNext}
              style={{ width: '100%', padding: '16px', borderRadius: 16, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12, background: `linear-gradient(135deg,${O},${OD})`, boxShadow: `0 8px 28px ${O}45` }}>
              Gå vidare <ChevronRight size={18} />
            </motion.button>
          )}
          <button onClick={handleOm}
            style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
            <RotateCcw size={14} /> Gör om quizet
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ───────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <img src={bakgrundsbild} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.88)', zIndex: 1 }} />

      {/* Topbar */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(to right,${O},${OD})` }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'rgba(10,16,28,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>{current.kategori}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{idx + 1} / {fragor.length}</span>
          </div>
          <div style={{ display: 'flex', gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {fragor.map((_, i) => (
              <div key={i} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, background: i < idx ? (svar[i] ? O : 'rgba(255,255,255,0.2)') : i === idx ? O : 'rgba(255,255,255,0.12)', transition: 'all 0.3s' }} />
            ))}
          </div>
          <button onClick={handleOm} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>
      </div>

      {/* DESKTOP */}
      <div style={{ display: isDesktop ? 'grid' : 'none', flex: 1, gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 10, overflow: 'hidden' }}>

        {/* Vänster */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '120px 56px 0', height: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%', maxWidth: 520 }}>

              {(current.rubrik || current.rubrikOrange) && (
                <h2 style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: 0, fontFamily: "'Nunito', sans-serif", alignSelf: 'flex-start' }}>
                  {current.rubrik}
                  {current.rubrik && current.rubrikOrange && <br />}
                  {current.rubrikOrange && <span style={{ color: O }}>{current.rubrikOrange}</span>}
                </h2>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%' }}>
                <img src={current.bild} alt={current.persona} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${O}`, boxShadow: `0 0 20px ${O}40`, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{current.persona}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{current.roll}</p>
                </div>
              </div>
              <div style={{ padding: '40px 48px', borderRadius: 28, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
                <p style={{ fontSize: 22, color: '#fff', lineHeight: 1.55, fontWeight: 600, margin: 0 }}>{current.bubbla}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Höger */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '120px 44px 36px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`q${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 26, fontWeight: 900, color: '#111827', lineHeight: 1.35, fontFamily: "'Nunito', sans-serif", marginBottom: 24 }}>{current.fraga}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />)}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`f${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ padding: '18px 22px', borderRadius: 14, marginBottom: 16, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)', border: `2px solid ${valtAlt?.korrekt ? O + '50' : '#9ca3af40'}`, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {valtAlt?.korrekt ? <CheckCircle size={22} style={{ color: O, flexShrink: 0, marginTop: 2 }} /> : <XCircle size={22} style={{ color: '#9ca3af', flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 6 }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                    <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65 }}>{valtAlt?.feedback}</p>
                  </div>
                </div>
                <div style={{ padding: '14px 18px', borderRadius: 12, background: OL, border: `1px solid ${O}30`, marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, marginBottom: 8 }}>Kom ihåg</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                  style={{ width: '100%', padding: '16px', borderRadius: 14, cursor: 'pointer', border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, background: `linear-gradient(135deg,${O},${OD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 6px 24px ${O}40` }}>
                  {idx < fragor.length - 1 ? <>Nästa situation <ChevronRight size={17} /></> : <>Se mitt resultat <ChevronRight size={17} /></>}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MOBIL */}
      <div style={{ display: isDesktop ? 'none' : 'flex', flex: 1, flexDirection: 'column', position: 'relative', zIndex: 10, overflowY: 'auto' }}>

        {/* Pratbubbla */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ padding: '14px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: O, lineHeight: 1.5, margin: 0, textAlign: 'center' }}>{current.bubbla}</p>
          </div>
        </div>

        {/* Vit ruta */}
        <div style={{ background: '#fff', borderRadius: 20, margin: '24px 32px 0', padding: '20px 16px 32px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`mq${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111827', lineHeight: 1.3, fontFamily: "'Nunito', sans-serif", marginBottom: 20, letterSpacing: '-0.02em' }}>
                  {current.fraga}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />)}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`mf${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ padding: '14px 16px', borderRadius: 14, marginBottom: 14, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)', border: `2px solid ${valtAlt?.korrekt ? O + '50' : '#9ca3af40'}`, display: 'flex', gap: 12 }}>
                  {valtAlt?.korrekt ? <CheckCircle size={20} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={20} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 5 }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{valtAlt?.feedback}</p>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', borderRadius: 12, background: OL, border: `1px solid ${O}30`, marginBottom: 14 }}>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleNästa} style={{ width: '100%', padding: '16px', borderRadius: 14, cursor: 'pointer', border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, background: `linear-gradient(135deg,${O},${OD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {idx < fragor.length - 1 ? 'Nästa situation' : 'Se mitt resultat'} <ChevronRight size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persona-block längst ner */}
        <div style={{ padding: '20px 16px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src={current.bild} alt={current.persona}
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${O}`, marginBottom: 8 }} />
          <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 2px' }}>{current.persona}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{current.roll}</p>
        </div>
      </div>
    </div>
  );
};