// src/modules/Styrelsekorkortet/slides/Slide5Personuppgifter.tsx
// Interaktiv slide – sortera kort i "Personuppgift" / "Inte personuppgift"
// Fullwidth, ingen SlideShell

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, ChevronRight, FileText, Users, Camera } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ── Data ──────────────────────────────────────────────────
const CARDS = [
  { id: 1, text: 'Personnummer',       emoji: '🪪', isPersonal: true,
    explanation: 'Direkt kopplad till en specifik levande person.' },
  { id: 2, text: 'IP-adress',          emoji: '🌐', isPersonal: true,
    explanation: 'Kan spåras till en individ via internetleverantören.' },
  { id: 3, text: 'Företagsnamn',       emoji: '🏢', isPersonal: false,
    explanation: 'Juridisk person – GDPR skyddar fysiska individer, inte bolag.' },
  { id: 4, text: 'E-postadress',       emoji: '✉️', isPersonal: true,
    explanation: 'Kopplas direkt till en person, t.ex. anna@brf.se.' },
  { id: 5, text: 'Husdjurets namn',    emoji: '🐾', isPersonal: false,
    explanation: 'Identifierar inte en fysisk person.' },
  { id: 6, text: 'Ansiktsigenkänning', emoji: '👤', isPersonal: true,
    explanation: 'Biometrisk data – extra känslig personuppgift enligt GDPR.' },
  { id: 7, text: 'Lägenhetsnummer',    emoji: '🏠', isPersonal: true,
    explanation: 'Kan kopplas till en specifik person i föreningens register.' },
  { id: 8, text: 'Aktiebolags-nr',     emoji: '📋', isPersonal: false,
    explanation: 'Identifierar ett bolag, inte en fysisk person.' },
];

const LOCATIONS = [
  { icon: FileText, title: 'Styrelseprotokoll',
    items: ['Namn på deltagare', 'Beslut som rör enskilda'] },
  { icon: Users,    title: 'Medlemsregister',
    items: ['Kontaktuppgifter', 'Ägarandelar och insatser'] },
  { icon: Camera,   title: 'Kamerasystem',
    items: ['Bildinspelningar', 'Passage-loggar'] },
];

type Phase = 'sorting' | 'result' | 'info';

// ── Sorteringsspel ────────────────────────────────────────
const SortingGame = ({ onDone }: { onDone: (score: number) => void }) => {
  const [remaining, setRemaining] = useState(CARDS);
  const [sorted, setSorted]       = useState<{ card: typeof CARDS[0]; correct: boolean }[]>([]);
  const [feedback, setFeedback]   = useState<null | { correct: boolean; text: string }>(null);
  const [animating, setAnimating] = useState(false);

  const current = remaining[0];
  const progress = ((CARDS.length - remaining.length) / CARDS.length) * 100;

  const answer = (val: boolean) => {
    if (animating || !current) return;
    const correct = val === current.isPersonal;
    setAnimating(true);
    setFeedback({ correct, text: current.explanation });

    setTimeout(() => {
      setSorted(prev => [...prev, { card: current, correct }]);
      setRemaining(prev => prev.slice(1));
      setFeedback(null);
      setAnimating(false);

      if (remaining.length === 1) {
        const finalCorrect = [...sorted, { card: current, correct }].filter(s => s.correct).length;
        setTimeout(() => onDone(finalCorrect), 300);
      }
    }, 1800);
  };

  if (!current) return null;

  return (
    <div className="flex flex-col items-center px-4 py-8 max-w-lg mx-auto">

      {/* Progress */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-xs text-white/50 mb-2">
          <span>{CARDS.length - remaining.length} av {CARDS.length} sorterade</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${O}, ${OD})` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Kort */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full rounded-2xl overflow-hidden shadow-2xl mb-6"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
            border: feedback
              ? `2px solid ${feedback.correct ? '#22c55e' : '#ef4444'}`
              : '2px solid rgba(255,255,255,0.12)' }}>

          <div className="p-8 text-center">
            <div className="text-6xl mb-4">{current.emoji}</div>
            <h3 className="text-2xl font-black text-white mb-1">{current.text}</h3>
            <p className="text-white/40 text-sm">Är detta en personuppgift?</p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-6 pb-5">
                <div className={`rounded-xl p-3 flex items-start gap-3`}
                  style={{ background: feedback.correct ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)' }}>
                  {feedback.correct
                    ? <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                    : <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className="font-bold text-sm mb-0.5"
                      style={{ color: feedback.correct ? '#4ade80' : '#f87171' }}>
                      {feedback.correct ? 'Rätt!' : 'Fel!'}{' '}
                      {current.isPersonal ? 'Ja, personuppgift' : 'Nej, inte personuppgift'}
                    </p>
                    <p className="text-xs text-white/60">{feedback.text}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Knappar */}
      {!feedback && (
        <div className="flex gap-4 w-full">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => answer(false)}
            className="flex-1 py-4 rounded-2xl font-black text-base border-2 transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white',
              background: 'rgba(255,255,255,0.06)' }}>
            ✗ Nej
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => answer(true)}
            className="flex-1 py-4 rounded-2xl font-black text-base text-white"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})`,
              boxShadow: `0 4px 20px ${O}50` }}>
            ✓ Ja
          </motion.button>
        </div>
      )}

      {/* Tidigare kort */}
      {sorted.length > 0 && (
        <div className="flex gap-2 mt-5 flex-wrap justify-center">
          {sorted.map((s, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
              style={{ background: s.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                border: `1.5px solid ${s.correct ? '#22c55e' : '#ef4444'}` }}>
              {s.correct ? '✓' : '✗'}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Resultat ──────────────────────────────────────────────
const Result = ({ score, onRetry, onContinue }: {
  score: number; onRetry: () => void; onContinue: () => void;
}) => {
  const pct = Math.round((score / CARDS.length) * 100);
  const perfect = score === CARDS.length;
  const good    = score >= CARDS.length * 0.75;

  return (
    <div className="flex flex-col items-center px-4 py-10 max-w-md mx-auto text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
        style={{ background: perfect ? O : good ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
          border: `3px solid ${perfect ? OD : good ? '#22c55e' : '#ef4444'}` }}>
        <span className="text-4xl font-black" style={{ color: perfect ? 'white' : good ? '#4ade80' : '#f87171' }}>
          {pct}%
        </span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-black text-white mb-2">
          {perfect ? 'Perfekt! 🎉' : good ? 'Bra jobbat!' : 'Fortsätt öva!'}
        </h2>
        <p className="text-white/60 text-base mb-2">
          Du fick <strong className="text-white">{score} av {CARDS.length}</strong> rätt
        </p>
        <p className="text-white/40 text-sm mb-8">
          {perfect
            ? 'Du har full koll på vad som är personuppgifter.'
            : good
            ? 'Du har god förståelse – några kanter att slipa.'
            : 'Gå gärna igenom exemplen igen innan du fortsätter.'}
        </p>

        <div className="flex gap-3">
          <button onClick={onRetry}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all">
            <RotateCcw size={15} /> Försök igen
          </button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
            Se mer info <ChevronRight size={15} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Info-sida ─────────────────────────────────────────────
const InfoPage = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
    <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Vad är en personuppgift?</h2>
    <p className="text-white/70 text-base leading-relaxed mb-8">
      En personuppgift är all information som direkt eller indirekt kan kopplas till en
      levande fysisk person. Ni hanterar troligtvis fler uppgifter än ni tror.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {/* Vanliga */}
      <div className="rounded-2xl overflow-hidden border border-white/10"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="px-5 py-3 border-b border-white/10">
          <p className="font-bold text-white text-sm">Vanliga personuppgifter</p>
        </div>
        <div className="p-4 space-y-2">
          {['Namn, adress, e-post, telefon', 'Lägenhetsnummer', 'Bankkontonummer för avgiftsavisering',
            'Köpeavtal och överlåtelsehandlingar', 'Protokoll där namn förekommer'].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: O }} />
              <p className="text-sm text-white/70">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Känsliga */}
      <div className="rounded-2xl overflow-hidden border border-red-500/30"
        style={{ background: 'rgba(239,68,68,0.05)' }}>
        <div className="px-5 py-3 border-b border-red-500/20">
          <p className="font-bold text-red-400 text-sm">Känsliga personuppgifter</p>
        </div>
        <div className="p-4 space-y-2">
          {['Hälsoinformation (t.ex. tillgänglighetsbehov)', 'Etniskt ursprung',
            'Religiös övertygelse', 'Politisk åsikt', 'Biometriska uppgifter'].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-red-400 flex-shrink-0" />
              <p className="text-sm text-white/70">{item}</p>
            </div>
          ))}
          <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-300 font-semibold">
              ⚠️ Kräver extra skydd och i princip alltid explicit samtycke
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Var i föreningen */}
    <h3 className="text-lg font-bold text-white mb-4">Var i föreningen finns uppgifterna?</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {LOCATIONS.map((loc, i) => {
        const Icon = loc.icon;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }} viewport={{ once: true }}
            className="rounded-xl p-4 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <Icon size={18} className="mb-2" style={{ color: O }} />
            <p className="font-bold text-white text-sm mb-2">{loc.title}</p>
            {loc.items.map((item, j) => (
              <p key={j} className="text-xs text-white/50">• {item}</p>
            ))}
          </motion.div>
        );
      })}
    </div>
  </div>
);

// ── HUVUD-SLIDE ───────────────────────────────────────────
const Slide5Personuppgifter: React.FC = () => {
  const [phase, setPhase]   = useState<Phase>('sorting');
  const [score, setScore]   = useState(0);

  const handleDone = (s: number) => {
    setScore(s);
    setPhase('result');
  };

  const handleRetry = () => {
    setPhase('sorting');
    setScore(0);
  };

  return (
    <div className="min-h-full relative overflow-hidden">
      {/* Bakgrundsbild */}
      <img
        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(15,22,35,0.93), rgba(23,31,50,0.88))' }} />

      <div className="relative z-10 min-h-full overflow-y-auto">

        {/* Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-8 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
                Interaktiv övning
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Vad är en personuppgift?
              </h2>
            </div>

            {/* Fas-indikatorer */}
            <div className="flex items-center gap-2">
              {(['sorting', 'result', 'info'] as Phase[]).map((p, i) => (
                <div key={p} className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: phase === p ? O
                      : ['sorting','result','info'].indexOf(phase) > i ? `${O}60` : 'rgba(255,255,255,0.2)',
                    width: phase === p ? 24 : 8,
                  }} />
              ))}
            </div>
          </div>
        </div>

        {/* Innehåll per fas */}
        <AnimatePresence mode="wait">
          {phase === 'sorting' && (
            <motion.div key="sorting"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <SortingGame onDone={handleDone} />
            </motion.div>
          )}
          {phase === 'result' && (
            <motion.div key="result"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Result score={score} onRetry={handleRetry} onContinue={() => setPhase('info')} />
            </motion.div>
          )}
          {phase === 'info' && (
            <motion.div key="info"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <InfoPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide5Personuppgifter;