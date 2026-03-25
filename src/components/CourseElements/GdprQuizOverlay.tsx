// src/components/CourseElements/GdprQuizOverlay.tsx
// Fullscreen quiz overlay – mountas ovanpå kursen, stängs med X.
// Importera gdprQuiz och skicka frågorna som prop.
//
// Användning i Module3Gdpr.tsx:
//   const [quizOpen, setQuizOpen] = useState(false);
//   <button onClick={() => setQuizOpen(true)}>Starta quiz</button>
//   <GdprQuizOverlay
//     isOpen={quizOpen}
//     onClose={() => setQuizOpen(false)}
//     questions={gdprQuiz.questions}
//     onComplete={(passed) => { if (passed) handleComplete('quiz-gdpr'); }}
//   />

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowRight, CheckCircle, XCircle,
  Trophy, Star, AlertTriangle, Zap, Shield
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────
interface Question {
  id: string;
  question_text: string;
  question_type: string;
  question_order: number;
  options: { choices: string[] };
  correct_answer: string;
  explanation: string;
  points: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onComplete?: (passed: boolean) => void;
  passingPercent?: number;
}

// ─── Helpers ────────────────────────────────────────────
const isMultiple = (q: Question) => q.question_type === 'multiple_choice';

const getCorrectSet = (q: Question): string[] => {
  try {
    const parsed = JSON.parse(q.correct_answer);
    return Array.isArray(parsed) ? parsed : [q.correct_answer];
  } catch {
    return [q.correct_answer];
  }
};

const isAnswerCorrect = (q: Question, selected: string[]): boolean => {
  const correct = getCorrectSet(q);
  return (
    correct.length === selected.length &&
    correct.every(c => selected.includes(c))
  );
};

// ─── Result ─────────────────────────────────────────────
const getResult = (pct: number) => {
  if (pct >= 80) return {
    label: 'Utmärkt! Du har koll på GDPR.',
    sub: 'Du är väl förberedd att hantera dataskydd i din BRF.',
    icon: Trophy, color: '#FF5421',
  };
  if (pct >= 50) return {
    label: 'Bra grund – men luckor finns.',
    sub: 'Gå igenom avsnitten igen så har du full koll.',
    icon: Star, color: '#F59E0B',
  };
  return {
    label: 'Viktiga kunskapsluckor.',
    sub: 'Läs igenom modulen noggrant – det skyddar din förening.',
    icon: AlertTriangle, color: '#EF4444',
  };
};

// ─── Progress dots ───────────────────────────────────────
const ProgressDots = ({ total, current, results }: { total: number; current: number; results: boolean[] }) => (
  <div className="flex gap-1.5 flex-wrap justify-center">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="transition-all duration-300 rounded-full"
        style={{
          width: i === current ? 20 : 8,
          height: 8,
          background: i < results.length
            ? results[i] ? '#FF5421' : '#EF4444'
            : i === current ? '#FF5421' : 'rgba(255,255,255,0.15)',
        }}
      />
    ))}
  </div>
);

// ─── Main overlay ────────────────────────────────────────
const GdprQuizOverlay: React.FC<Props> = ({
  isOpen,
  onClose,
  questions,
  onComplete,
  passingPercent = 80,
}) => {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const maxScore = questions.reduce((s, q) => s + q.points, 0);
  const current = questions[currentIndex];
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const result = getResult(pct);
  const ResultIcon = result.icon;
  const passed = pct >= passingPercent;

  const reset = () => {
    setPhase('intro');
    setCurrentIndex(0);
    setSelected([]);
    setFeedback(null);
    setScore(0);
    setCorrectCount(0);
    setResults([]);
  };

  const handleClose = () => {
    onClose();
    // reset after animation
    setTimeout(reset, 400);
  };

  const toggleChoice = (opt: string) => {
    if (feedback) return;
    if (isMultiple(current)) {
      setSelected(prev =>
        prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
      );
    } else {
      setSelected([opt]);
    }
  };

  const handleCheck = () => {
    if (!selected.length || feedback) return;
    const correct = isAnswerCorrect(current, selected);
    setFeedback(correct ? 'correct' : 'incorrect');
    if (correct) {
      setScore(s => s + current.points);
      setCorrectCount(c => c + 1);
    }
    setResults(r => [...r, correct]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected([]);
      setFeedback(null);
    } else {
      setPhase('result');
      onComplete?.(passed);
    }
  };

  const getChoiceStyle = (opt: string) => {
    const isSelected = selected.includes(opt);
    const correctSet = current ? getCorrectSet(current) : [];
    const isCorrectOpt = correctSet.includes(opt);

    if (!feedback) {
      return isSelected
        ? 'border-[#FF5421] bg-[#FF5421]/15 text-white'
        : 'border-white/10 bg-white/5 text-white/70 hover:border-[#FF5421]/50 hover:bg-[#FF5421]/8 hover:text-white';
    }
    if (isCorrectOpt) return 'border-[#FF5421] bg-[#FF5421]/20 text-white';
    if (isSelected && !isCorrectOpt) return 'border-red-500 bg-red-500/10 text-red-300';
    return 'border-white/5 bg-white/3 text-white/20';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{
            backgroundImage: 'url(/t2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0f1623]/88" />

          {/* Header bar */}
          <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FF5421]" />
              <span className="text-white/60 text-sm font-medium">GDPR-quiz</span>
              {phase === 'quiz' && (
                <span className="text-white/30 text-sm">
                  · {currentIndex + 1}/{questions.length}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">

              {/* ── INTRO ── */}
              {phase === 'intro' && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 bg-[#FF5421]/20 text-[#FF5421] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Zap className="w-3 h-3" /> Kunskapskontroll
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                    GDPR-quiz
                  </h2>
                  <p className="text-white/50 text-base mb-8 max-w-sm mx-auto leading-relaxed">
                    {questions.length} frågor om dataskydd i BRF. Du behöver {passingPercent}% rätt för att bli godkänd.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { val: `${questions.length}`, label: 'Frågor' },
                      { val: `${passingPercent}%`, label: 'Godkänt' },
                      { val: `${maxScore}`, label: 'Max poäng' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/8 border border-white/10 rounded-2xl py-4 px-2">
                        <div className="text-xl font-bold text-white">{s.val}</div>
                        <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPhase('quiz')}
                    className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-xl"
                    style={{ background: 'linear-gradient(135deg,#FF5421,#E04619)' }}
                  >
                    Starta quiz <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* ── QUIZ ── */}
              {phase === 'quiz' && current && (
                <div>
                  {/* Progress */}
                  <div className="mb-6">
                    <ProgressDots
                      total={questions.length}
                      current={currentIndex}
                      results={results}
                    />
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(to right,#FF5421,#E04619)' }}
                        animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -32 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      {/* Fråga */}
                      <div className="bg-white/8 border border-white/10 rounded-2xl p-5 sm:p-7 mb-4">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#FF5421] mb-3">
                          Fråga {currentIndex + 1}
                          {isMultiple(current) && (
                            <span className="ml-2 text-white/30 normal-case tracking-normal font-normal">
                              (flera svar möjliga)
                            </span>
                          )}
                        </div>
                        <p className="text-white font-semibold text-base sm:text-lg leading-snug">
                          {current.question_text}
                        </p>
                      </div>

                      {/* Svarsalternativ */}
                      <div className="space-y-2.5 mb-4">
                        {current.options.choices.map((opt, i) => (
                          <motion.button
                            key={i}
                            onClick={() => toggleChoice(opt)}
                            disabled={!!feedback}
                            whileHover={!feedback ? { scale: 1.01 } : {}}
                            whileTap={!feedback ? { scale: 0.99 } : {}}
                            className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${getChoiceStyle(opt)}`}
                          >
                            <div className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all ${
                              selected.includes(opt)
                                ? 'border-[#FF5421] bg-[#FF5421] text-white'
                                : 'border-white/20 text-white/40'
                            }`}>
                              {String.fromCharCode(65 + i)}
                            </div>
                            {opt}
                          </motion.button>
                        ))}
                      </div>

                      {/* Kontrollera-knapp */}
                      {!feedback && (
                        <div className="flex justify-end">
                          <motion.button
                            whileHover={selected.length ? { scale: 1.03 } : {}}
                            whileTap={selected.length ? { scale: 0.97 } : {}}
                            onClick={handleCheck}
                            disabled={!selected.length}
                            className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                              selected.length
                                ? 'text-white shadow-lg'
                                : 'bg-white/8 text-white/25 cursor-not-allowed'
                            }`}
                            style={selected.length ? { background: 'linear-gradient(135deg,#FF5421,#E04619)' } : {}}
                          >
                            Kontrollera
                          </motion.button>
                        </div>
                      )}

                      {/* Feedback – overlay ovanpå fråga + alternativ */}
                      <AnimatePresence>
                        {feedback && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden"
                            style={{ backdropFilter: 'blur(12px)', background: 'rgba(15,22,35,0.93)' }}
                          >
                            <div className="text-center px-6 py-8 max-w-sm w-full">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.05 }}
                                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                  feedback === 'correct' ? 'bg-[#FF5421]/20' : 'bg-red-500/20'
                                }`}
                              >
                                {feedback === 'correct'
                                  ? <CheckCircle className="w-7 h-7 text-[#FF5421]" />
                                  : <XCircle className="w-7 h-7 text-red-400" />
                                }
                              </motion.div>
                              <h3 className={`text-lg font-bold mb-3 ${feedback === 'correct' ? 'text-[#FF5421]' : 'text-red-400'}`}>
                                {feedback === 'correct' ? 'Rätt svar! 🎉' : 'Fel svar'}
                              </h3>
                              <p className="text-white/65 text-sm leading-relaxed mb-6">
                                {current.explanation}
                              </p>
                              <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleNext}
                                className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 shadow-lg"
                                style={{ background: 'linear-gradient(135deg,#FF5421,#E04619)' }}
                              >
                                {currentIndex < questions.length - 1 ? 'Nästa fråga' : 'Se mitt resultat'}
                                <ArrowRight className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ── RESULT ── */}
              {phase === 'result' && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white/8 border border-white/10 rounded-2xl p-7 text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: `${result.color}22`, border: `2px solid ${result.color}44` }}
                    >
                      <ResultIcon className="w-7 h-7" style={{ color: result.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{result.label}</h3>
                    <p className="text-white/50 text-sm mb-6 leading-relaxed max-w-xs mx-auto">{result.sub}</p>

                    <div className="text-5xl font-bold text-white mb-1">
                      {score}
                      <span className="text-white/25 text-2xl">/{maxScore}</span>
                    </div>
                    <div className="text-white/30 text-xs mb-4">poäng</div>

                    {/* Progressbar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(to right, ${result.color}, ${result.color}cc)` }}
                      />
                    </div>

                    <div className="flex justify-center gap-6 text-sm font-semibold">
                      <span className="flex items-center gap-1.5 text-[#FF5421]">
                        <CheckCircle className="w-4 h-4" /> {correctCount} rätt
                      </span>
                      <span className="flex items-center gap-1.5 text-red-400">
                        <XCircle className="w-4 h-4" /> {questions.length - correctCount} fel
              </span>
                    </div>

                    {passed && (
                      <div className="mt-4 bg-[#FF5421]/15 border border-[#FF5421]/30 rounded-xl p-3 text-[#FF5421] text-sm font-semibold">
                        ✓ Godkänd – {passingPercent}% uppnått
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 py-3.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-semibold transition-colors"
                    >
                      Försök igen
                    </button>
                    <button
                      onClick={handleClose}
                      className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm"
                      style={{ background: 'linear-gradient(135deg,#FF5421,#E04619)' }}
                    >
                      Tillbaka till kursen
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GdprQuizOverlay;