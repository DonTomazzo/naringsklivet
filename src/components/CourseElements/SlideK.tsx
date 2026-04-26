// ══════════════════════════════════════════════════════════
// SLIDE K — Djupare scenario-quiz med strukturerad feedback
//
// Syskon till SlideJ men för frågor där pedagogiken ligger i
// själva återkopplingen. Stödjer:
//   - Enkelval (typ: 'single') — feedback visas direkt
//   - Flerval (typ: 'multiple') — "Bekräfta svar"-knapp
//   - Strukturerad feedback med rubriker, sektioner och exempel
//
// ANVÄNDNING:
//   <SlideK
//     fragor={mittQuiz}
//     onComplete={handleComplete}
//     onNext={() => setCurrentIndex(i => i + 1)}
//   />
// ══════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw,
  Award, X
} from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ── TYPER ────────────────────────────────────────────────
export interface SlideKAlternativ {
  text: string;
  korrekt: boolean;
}

export interface SlideKFeedbackSektion {
  rubrik: string;
  text: string;
}

export interface SlideKFeedback {
  rubrik: string;
  sammanfattning: string;
  sektioner?: SlideKFeedbackSektion[];
  exempel?: string;
}

export interface SlideKFraga {
  id: number | string;
  persona: string;
  roll: string;
  bild: string;
  kategori: string;
  rubrik?: string;
  rubrikOrange?: string;
  bubbla: string;
  fraga: string;
  typ: 'single' | 'multiple';
  alternativ: SlideKAlternativ[];
  feedback: SlideKFeedback;
}

export interface SlideKProps {
  fragor: SlideKFraga[];
  onComplete?: (id: string) => void;
  onNext?: () => void;
  isDone?: boolean;
  bakgrundsbild?: string;
  completionId?: string;
}

// ── ALTERNATIV-KNAPP ─────────────────────────────────────
const AlternativKnapp = ({
  alt, valda, visar, onVälj, typ,
}: {
  alt: SlideKAlternativ;
  valda: Set<string>;
  visar: boolean;
  onVälj: (t: string) => void;
  typ: 'single' | 'multiple';
}) => {
  const isValt              = valda.has(alt.text);
  const visaRes             = visar;
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
          ? (isValt ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)') : (alt.korrekt ? `${O}08` : '#fff'))
          : isValt ? OL : '#fff',
        border: `2px solid ${
          visaRes
            ? (isValt ? (alt.korrekt ? O : '#9ca3af') : (alt.korrekt ? `${O}80` : '#e5e7eb'))
            : isValt ? O : '#e5e7eb'
        }`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 14,
        transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 4px 16px ${O}20` : 'none',
      }}>
      {/* Indicator — cirkel (single) eller kvadrat (multiple) */}
      <div style={{
        width: 28, height: 28,
        borderRadius: typ === 'multiple' ? 7 : '50%',
        flexShrink: 0,
        background: visaRes
          ? (isValt ? (alt.korrekt ? O : '#9ca3af') : (alt.korrekt ? `${O}30` : '#f0f0f0'))
          : isValt ? O : '#f0f0f0',
        border: `2px solid ${visaRes ? 'transparent' : isValt ? O : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900,
        color: isValt || (visaRes && alt.korrekt) ? '#fff' : '#9ca3af',
        transition: 'all 0.18s',
      }}>
        {visaRes
          ? (alt.korrekt ? '✓' : (isValt ? '✗' : null))
          : (isValt ? (typ === 'multiple' ? '✓' : '●') : null)
        }
      </div>
      <p style={{
        fontSize: 15, lineHeight: 1.5, flex: 1,
        color: visaRes
          ? (isValt
              ? (alt.korrekt ? '#b84400' : '#6b7280')
              : (alt.korrekt ? '#b84400' : '#6b7280'))
          : '#1f2937',
        fontWeight: isValt ? 700 : 500,
      }}>
        {alt.text}
      </p>
    </motion.button>
  );
};

// ── FEEDBACK-PANEL (strukturerad) ───────────────────────
const FeedbackPanel = ({
  feedback, korrekt,
}: {
  feedback: SlideKFeedback;
  korrekt: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      background: korrekt ? `${O}08` : '#f9fafb',
      border: `1.5px solid ${korrekt ? `${O}40` : '#e5e7eb'}`,
      borderRadius: 16,
      padding: '20px 22px',
      marginTop: 20,
    }}>

    {/* Huvud-rubrik med ikon */}
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
      {korrekt
        ? <CheckCircle size={22} style={{ color: O, flexShrink: 0, marginTop: 2 }} />
        : <XCircle size={22} style={{ color: '#9ca3af', flexShrink: 0, marginTop: 2 }} />}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: 11, fontWeight: 800, letterSpacing: 2,
          textTransform: 'uppercase', color: O,
          marginBottom: 4, fontFamily: "'Nunito', sans-serif",
        }}>
          {korrekt ? 'Rätt svar' : 'Inte riktigt'}
        </p>
        <p style={{
          fontSize: 17, fontWeight: 900, color: '#111827',
          lineHeight: 1.35, margin: 0,
          fontFamily: "'Nunito', sans-serif",
        }}>
          {feedback.rubrik}
        </p>
      </div>
    </div>

    {/* Sammanfattning */}
    <p style={{
      fontSize: 14.5, lineHeight: 1.65, color: '#374151',
      marginBottom: feedback.sektioner || feedback.exempel ? 18 : 0,
    }}>
      {feedback.sammanfattning}
    </p>

    {/* Sektioner */}
    {feedback.sektioner && feedback.sektioner.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: feedback.exempel ? 18 : 0 }}>
        {feedback.sektioner.map((sek, i) => (
          <div key={i}>
            <p style={{
              fontSize: 10.5, fontWeight: 800, letterSpacing: 1.8,
              textTransform: 'uppercase', color: O,
              marginBottom: 6, fontFamily: "'Nunito', sans-serif",
            }}>
              {sek.rubrik}
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#4b5563', margin: 0 }}>
              {sek.text}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Exempel */}
    {feedback.exempel && (
      <div style={{
        background: '#fff', borderRadius: 10,
        border: `1px solid ${O}25`, padding: '12px 14px',
        borderLeft: `3px solid ${O}`,
      }}>
        <p style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 2,
          textTransform: 'uppercase', color: O,
          marginBottom: 6, fontFamily: "'Nunito', sans-serif",
        }}>
          Praktiskt exempel
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#374151', margin: 0, fontStyle: 'italic' }}>
          {feedback.exempel}
        </p>
      </div>
    )}
  </motion.div>
);

// ── HUVUD-KOMPONENT ──────────────────────────────────────
export const SlideK = ({
  fragor,
  onComplete,
  onNext,
  isDone = false,
  bakgrundsbild = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
  completionId = 'slide-k-quiz',
}: SlideKProps) => {
  const [fas, setFas]           = useState<'quiz' | 'result'>('quiz');
  const [idx, setIdx]           = useState(0);
  const [valda, setValda]       = useState<Set<string>>(new Set());
  const [visar, setVisar]       = useState(false);
  const [poäng, setPoäng]       = useState(0);
  const [rätt, setRätt]         = useState(0);
  const [svar, setSvar]         = useState<boolean[]>([]);
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
  const pctNow   = Math.round((poäng / maxPoäng) * 100);

  // Beräkna om nuvarande val är korrekt
  const korrektaSvar = new Set(current.alternativ.filter(a => a.korrekt).map(a => a.text));
  const ärKorrekt = valda.size === korrektaSvar.size &&
                    [...valda].every(v => korrektaSvar.has(v));

  const handleVälj = (text: string) => {
    if (visar) return;

    if (current.typ === 'single') {
      // Enkelval — direkt submit
      const alt = current.alternativ.find(a => a.text === text)!;
      setValda(new Set([text]));
      setVisar(true);
      if (alt.korrekt) { setPoäng(p => p + 100); setRätt(r => r + 1); }
      setSvar(s => [...s, alt.korrekt]);
    } else {
      // Flerval — toggla i set
      setValda(prev => {
        const ny = new Set(prev);
        if (ny.has(text)) ny.delete(text);
        else ny.add(text);
        return ny;
      });
    }
  };

  const handleBekrafta = () => {
    if (visar || valda.size === 0) return;
    setVisar(true);
    if (ärKorrekt) { setPoäng(p => p + 100); setRätt(r => r + 1); }
    setSvar(s => [...s, ärKorrekt]);
  };

  const handleNästa = () => {
    if (idx < fragor.length - 1) {
      setIdx(i => i + 1);
      setValda(new Set());
      setVisar(false);
    } else {
      setFas('result');
      onComplete?.(completionId);
    }
  };

  const handleOm = () => {
    setFas('quiz');
    setIdx(0); setValda(new Set());
    setVisar(false); setPoäng(0); setRätt(0); setSvar([]);
  };

  const progress = (idx / fragor.length) * 100;

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
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
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
  const kanBekrafta = current.typ === 'multiple' && valda.size > 0 && !visar;

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '80px 56px 0', height: '100%', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, width: '100%', maxWidth: 520 }}>

              {(current.rubrik || current.rubrikOrange) && (
                <h2 style={{ fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: 0, fontFamily: "'Nunito', sans-serif", alignSelf: 'flex-start' }}>
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
              <div style={{ padding: '32px 40px', borderRadius: 24, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>
                <p style={{ fontSize: 19, color: '#fff', lineHeight: 1.55, fontWeight: 600, margin: 0 }}>{current.bubbla}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Höger — scrollbar */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '80px 44px 36px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={`q${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>

              {/* Hint om flerval */}
              {current.typ === 'multiple' && !visar && (
                <div style={{ marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 999, background: `${O}15`, color: O, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  Flera svar möjliga
                </div>
              )}

              <h3 style={{ fontSize: 28, fontWeight: 900, color: '#111827', lineHeight: 1.3, fontFamily: "'Nunito', sans-serif", marginBottom: 22 }}>{current.fraga}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {current.alternativ.map(alt => <AlternativKnapp key={alt.text} alt={alt} valda={valda} visar={visar} onVälj={handleVälj} typ={current.typ} />)}
              </div>

              {/* Bekräfta-knapp (endast flerval) */}
              {current.typ === 'multiple' && !visar && (
                <motion.button
                  onClick={handleBekrafta}
                  disabled={!kanBekrafta}
                  whileHover={kanBekrafta ? { scale: 1.01 } : {}}
                  whileTap={kanBekrafta ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', marginTop: 16, padding: '14px',
                    borderRadius: 14, border: 'none',
                    cursor: kanBekrafta ? 'pointer' : 'not-allowed',
                    color: '#fff', fontSize: 15, fontWeight: 800,
                    background: kanBekrafta ? `linear-gradient(135deg,${O},${OD})` : '#d1d5db',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: kanBekrafta ? `0 6px 20px ${O}35` : 'none',
                    transition: 'all 0.2s',
                  }}>
                  Bekräfta svar {kanBekrafta && `(${valda.size} valda)`}
                </motion.button>
              )}

              {/* Feedback */}
              {visar && (
                <>
                  <FeedbackPanel feedback={current.feedback} korrekt={ärKorrekt} />

                  <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                    style={{ width: '100%', marginTop: 20, padding: '16px', borderRadius: 14, cursor: 'pointer', border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, background: `linear-gradient(135deg,${O},${OD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 6px 24px ${O}40` }}>
                    {idx < fragor.length - 1 ? <>Nästa situation <ChevronRight size={17} /></> : <>Se mitt resultat <ChevronRight size={17} /></>}
                  </motion.button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBIL */}
      <div style={{ display: isDesktop ? 'none' : 'flex', flex: 1, flexDirection: 'column', position: 'relative', zIndex: 10, overflowY: 'auto' }}>

        {/* Pratbubbla */}
        <div style={{ padding: '16px 16px 0' }}>
          <div style={{ padding: '14px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: O, lineHeight: 1.5, margin: 0, textAlign: 'center' }}>{current.bubbla}</p>
          </div>
        </div>

        {/* Vit ruta */}
        <div style={{ background: '#fff', borderRadius: 20, margin: '24px 20px 0', padding: '22px 18px 28px' }}>

          {current.typ === 'multiple' && !visar && (
            <div style={{ marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: `${O}15`, color: O, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Flera svar möjliga
            </div>
          )}

          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111827', lineHeight: 1.3, fontFamily: "'Nunito', sans-serif", marginBottom: 20, letterSpacing: '-0.02em' }}>
            {current.fraga}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {current.alternativ.map(alt => <AlternativKnapp key={alt.text} alt={alt} valda={valda} visar={visar} onVälj={handleVälj} typ={current.typ} />)}
          </div>

          {current.typ === 'multiple' && !visar && (
            <button onClick={handleBekrafta} disabled={!kanBekrafta}
              style={{
                width: '100%', marginTop: 14, padding: '14px',
                borderRadius: 12, border: 'none',
                cursor: kanBekrafta ? 'pointer' : 'not-allowed',
                color: '#fff', fontSize: 14, fontWeight: 800,
                background: kanBekrafta ? `linear-gradient(135deg,${O},${OD})` : '#d1d5db',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
              Bekräfta svar {kanBekrafta && `(${valda.size} valda)`}
            </button>
          )}

          {visar && (
            <>
              <FeedbackPanel feedback={current.feedback} korrekt={ärKorrekt} />
              <button onClick={handleNästa}
                style={{ width: '100%', marginTop: 16, padding: '15px', borderRadius: 12, cursor: 'pointer', border: 'none', color: '#fff', fontSize: 15, fontWeight: 800, background: `linear-gradient(135deg,${O},${OD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {idx < fragor.length - 1 ? 'Nästa situation' : 'Se mitt resultat'} <ChevronRight size={16} />
              </button>
            </>
          )}
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