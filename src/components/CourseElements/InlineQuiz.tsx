// src/components/CourseElements/InlineQuiz.tsx
// Kompakt quiz direkt i sliden – inga overlays eller steg.
// Frågor visas en i taget med direkt feedback.
// Används för mini-quiz (2-4 frågor) i lärande-läge.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const O = '#FF5421';

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
  questions: Question[];
  onComplete?: (ratt: number, total: number) => void;
  dark?: boolean;
}

const InlineQuiz: React.FC<Props> = ({ questions, onComplete, dark = true }) => {
  const [index, setIndex]       = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [ratt, setRatt]         = useState(0);
  const [klar, setKlar]         = useState(false);

  const current = questions[index];
  const isCorrect = selected === current?.correct_answer;

  const handleSelect = (choice: string) => {
    if (feedback || !current) return;
    setSelected(choice);
    const correct = choice === current.correct_answer;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setRatt(r => r + 1);
  };

  const handleNext = () => {
    const currentRatt = ratt + (isCorrect ? 1 : 0);
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setKlar(true);
      onComplete?.(currentRatt, questions.length);
    }
  };

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setRatt(0);
    setKlar(false);
  };

  const bg      = dark ? 'rgba(255,255,255,0.05)' : 'white';
  const border  = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.08)';
  const text    = dark ? 'text-white'              : 'text-slate-800';
  const subtext = dark ? 'text-white/60'           : 'text-slate-500';

  // Guard – visa ingenting om questions är tom eller index är utanför
  if (!questions || questions.length === 0 || !current) {
    return null;
  }

  if (klar) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 border text-center"
        style={{ background: bg, borderColor: border }}
      >
        <div className="text-3xl mb-2">
          {ratt === questions.length ? '🏆' : ratt >= questions.length * 0.6 ? '🎯' : '💪'}
        </div>
        <p className={`font-bold text-lg mb-1 ${text}`}>
          {ratt} / {questions.length} rätt
        </p>
        <p className={`text-sm mb-4 ${subtext}`}>
          {ratt === questions.length
            ? 'Perfekt! Du kan det här avsnittet.'
            : 'Bra försök – läs igenom avsnittet igen om du vill.'}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-75"
          style={{ background: `${O}20`, color: O }}
        >
          <RotateCcw size={12} /> Gör om
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 20 : 8,
                background: i < index ? O : i === index ? O : (dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'),
                opacity: i > index ? 0.4 : 1,
              }}
            />
          ))}
        </div>
        <span className={`text-xs ml-auto ${subtext}`}>
          {index + 1} / {questions.length}
        </span>
      </div>

      {/* Fråga */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.18 }}
        >
          <div
            className="rounded-2xl p-4 sm:p-5 border mb-3"
            style={{ background: bg, borderColor: border }}
          >
            <p className={`font-semibold text-sm sm:text-base leading-snug ${text}`}>
              {current.question_text}
            </p>
          </div>

          {/* Svarsalternativ */}
          <div className="space-y-2">
            {current.options.choices.map((choice, i) => {
              const isSelected = selected === choice;
              const isRight    = choice === current.correct_answer;

              let borderColor = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
              let bgColor     = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
              let textColor   = dark ? 'rgba(255,255,255,0.8)' : '#334155';

              if (feedback) {
                if (isRight) {
                  borderColor = 'rgba(34,197,94,0.6)';
                  bgColor     = 'rgba(34,197,94,0.1)';
                  textColor   = dark ? '#86efac' : '#166534';
                } else if (isSelected && !isRight) {
                  borderColor = 'rgba(239,68,68,0.6)';
                  bgColor     = 'rgba(239,68,68,0.1)';
                  textColor   = dark ? '#fca5a5' : '#991b1b';
                } else {
                  textColor = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
                }
              } else if (isSelected) {
                borderColor = O;
                bgColor     = `${O}18`;
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!feedback ? { scale: 1.01 } : {}}
                  whileTap={!feedback ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(choice)}
                  disabled={!!feedback}
                  className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3"
                  style={{ borderColor, background: bgColor, color: textColor }}
                >
                  {/* Bokstavs-badge */}
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                    style={{
                      borderColor: feedback && isRight ? '#22c55e' : feedback && isSelected ? '#ef4444' : isSelected ? O : borderColor,
                      background: feedback && isRight ? 'rgba(34,197,94,0.2)' : isSelected && !feedback ? `${O}30` : 'transparent',
                      color: feedback && isRight ? '#22c55e' : isSelected && !feedback ? O : textColor,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{choice}</span>
                  {feedback && isRight    && <CheckCircle size={15} className="flex-shrink-0 text-green-400" />}
                  {feedback && isSelected && !isRight && <XCircle size={15} className="flex-shrink-0 text-red-400" />}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback-ruta */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 rounded-xl p-4 border-l-4 flex items-start justify-between gap-3"
                style={{
                  borderColor: feedback === 'correct' ? '#22c55e' : '#ef4444',
                  background:  feedback === 'correct' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                }}
              >
                <div className="flex-1">
                  <p className="font-bold text-sm mb-0.5" style={{ color: feedback === 'correct' ? '#4ade80' : '#f87171' }}>
                    {feedback === 'correct' ? 'Rätt! ✓' : 'Inte rätt'}
                  </p>
                  <p className={`text-xs leading-relaxed ${subtext}`}>
                    {current.explanation}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg text-white"
                  style={{ background: O }}
                >
                  {index < questions.length - 1 ? 'Nästa' : 'Klar'}
                  <ArrowRight size={12} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InlineQuiz;
