import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, XCircle, CheckCircle, Trophy, Star, AlertTriangle, RotateCcw } from 'lucide-react';

// ─── Ordförandeklubba SVG ───
const GavelIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6L18 10L10 18L6 14L14 6Z" fill={color} opacity="0.9" />
    <path d="M14 6L18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 20L8 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="15" y="2" width="5" height="7" rx="1.5" transform="rotate(45 15 2)" fill={color} />
  </svg>
);

// ─── Flygande klubba ───
const FlyingGavel = ({ id, onDone }) => (
  <motion.div
    key={id}
    initial={{ opacity: 1, scale: 1.4, y: 0, x: 0 }}
    animate={{ opacity: 0, scale: 0.6, y: -100, x: (Math.random() - 0.5) * 60 }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
    onAnimationComplete={onDone}
    className="absolute pointer-events-none z-50"
    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
  >
    <GavelIcon size={44} color="#FF5421" />
  </motion.div>
);

const PASS_THRESHOLD = 0.8;

export default function QuizWidget({ questions = [], title, subtitle, onComplete }) {
  const [phase, setPhase] = useState('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [gavels, setGavels] = useState([]);
  const [gavelResults, setGavelResults] = useState([]);

  const maxScore = questions.reduce((s, q) => s + (q.points ?? 10), 0);
  const current = questions[currentIndex];
  const progress = questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  const handleCheck = () => {
    if (!selected || feedback) return;
    const isCorrect = selected === current.correct_answer;
    const pts = current.points ?? 10;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setGavelResults(g => [...g, isCorrect]);
    if (isCorrect) {
      setScore(s => s + pts);
      setCorrectCount(c => c + 1);
      setGavels(g => [...g, Date.now()]);
    }
    setAnswers(a => [...a, {
      question: current.question_text,
      selected,
      correct: current.correct_answer,
      isCorrect,
      explanation: current.explanation,
    }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      const finalCorrect = correctCount + (feedback === 'correct' ? 1 : 0);
      const finalScore = score + (feedback === 'correct' ? (current.points ?? 10) : 0);
      const passed = finalCorrect / questions.length >= PASS_THRESHOLD;
      const results = {
        score: finalScore,
        maxScore,
        correctCount: finalCorrect,
        totalQuestions: questions.length,
        passed,
        answers: [...answers, {
          question: current.question_text,
          selected,
          correct: current.correct_answer,
          isCorrect: feedback === 'correct',
          explanation: current.explanation,
        }],
      };
      setPhase('result');
      onComplete?.(results);
    }
  };

  const handleReset = () => {
    setPhase('quiz');
    setCurrentIndex(0);
    setSelected(null);
    setFeedback(null);
    setScore(0);
    setCorrectCount(0);
    setAnswers([]);
    setGavels([]);
    setGavelResults([]);
  };

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/10 p-8 text-center text-white/40 text-sm">
        Inga frågor tillgängliga.
      </div>
    );
  }

  // ─── RESULTAT ───
  if (phase === 'result') {
    const finalCorrect = correctCount;
    const passed = finalCorrect / questions.length >= PASS_THRESHOLD;
    const pct = Math.round((finalCorrect / questions.length) * 100);

    return (
      <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-md">
        <div className="p-6 sm:p-8 text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
          >
            {passed ? <Trophy size={28} className="text-white" />
              : pct >= 50 ? <Star size={28} className="text-white" />
              : <AlertTriangle size={28} className="text-white" />}
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-1">
            {passed ? 'Godkänt! 🎉' : pct >= 50 ? 'Nästan!' : 'Försök igen'}
          </h3>
          <p className="text-white/50 text-sm mb-5">
            {passed
              ? 'Du har klarat kunskapskontrollen.'
              : `Du behöver ${Math.ceil(PASS_THRESHOLD * questions.length)} rätt för att klara (du fick ${finalCorrect}).`}
          </p>
          <div className="text-5xl font-bold text-white mb-1">
            {pct}<span className="text-white/30 text-2xl">%</span>
          </div>
          <div className="text-white/40 text-xs mb-5">{finalCorrect} av {questions.length} rätt</div>
          <div className="flex justify-center gap-1.5 mb-5">
            {questions.map((_, i) => (
              <div key={i} className={gavelResults[i] ? 'opacity-100' : 'opacity-20'}>
                <GavelIcon size={18} color={gavelResults[i] ? '#FF5421' : '#ffffff'} />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 text-sm font-semibold">
            <span className="flex items-center gap-1.5" style={{ color: '#FF5421' }}>
              <CheckCircle size={14} /> {finalCorrect} rätt
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <XCircle size={14} /> {questions.length - finalCorrect} fel
            </span>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 space-y-3">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Genomgång</h4>
          {answers.map((a, i) => (
            <div key={i} className={`rounded-xl p-4 border text-sm ${
              a.isCorrect ? 'bg-[#FF5421]/10 border-[#FF5421]/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-start gap-2 mb-1">
                <div className={`mt-0.5 flex-shrink-0 ${a.isCorrect ? 'text-[#FF5421]' : 'text-red-400'}`}>
                  {a.isCorrect ? <CheckCircle size={15} /> : <XCircle size={15} />}
                </div>
                <p className="font-medium text-white leading-snug">{a.question}</p>
              </div>
              {!a.isCorrect && (
                <p className="text-xs text-white/40 ml-5 mb-1">
                  Rätt svar: <span className="font-semibold text-white/70">{a.correct}</span>
                </p>
              )}
              {a.explanation && (
                <p className="text-xs text-white/50 ml-5 leading-relaxed">{a.explanation}</p>
              )}
            </div>
          ))}
        </div>

        {!passed && (
          <div className="px-5 sm:px-6 pb-6">
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{ borderColor: '#FF5421', color: '#FF5421' }}
            >
              <RotateCcw size={15} /> Försök igen
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── QUIZ ───
  return (
    <div className="relative">

      {/* Flygande gavlar */}
      <AnimatePresence>
        {gavels.map(id => (
          <FlyingGavel key={id} id={id} onDone={() => setGavels(g => g.filter(x => x !== id))} />
        ))}
      </AnimatePresence>

      {/* ── Klubb-progress – UTANFÖR kortet ── */}
      <div className="flex justify-center gap-1.5 mb-4">
        {questions.map((_, i) => (
          <motion.div
            key={i}
            animate={i === currentIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`transition-all duration-300 ${
              i < currentIndex
                ? gavelResults[i] ? 'opacity-100' : 'opacity-20'
                : i === currentIndex ? 'opacity-100' : 'opacity-15'
            }`}
          >
            <GavelIcon
              size={18}
              color={i < currentIndex && gavelResults[i] ? '#FF5421' : '#ffffff'}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Progress bar – UTANFÖR kortet ── */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>Fråga {currentIndex + 1} av {questions.length}</span>
          <span>{score} poäng</span>
        </div>
        <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* ── Kortet ── */}
      <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-md relative">
        <div className="p-5 sm:p-6">

          {(title || subtitle) && (
            <div className="mb-4">
              {title && <h3 className="text-base sm:text-lg font-bold text-white mb-1">{title}</h3>}
              {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className=""
            >
              {/* Frågetext */}
              <div className="mb-5">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF5421' }}>
                  Fråga {currentIndex + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                  {current.question_text}
                </h4>
              </div>

              {/* Svarsalternativ */}
              <div className="space-y-2.5">
                {current.options.choices.map((opt, i) => {
                  let cls = 'border-white/10 bg-white/5 text-white/80 hover:border-[#FF5421]/60 hover:bg-[#FF5421]/10';
                  if (!feedback && selected === opt) cls = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                  if (feedback) {
                    if (opt === current.correct_answer) cls = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                    else if (selected === opt) cls = 'border-red-500 bg-red-500/10 text-red-300';
                    else cls = 'border-white/5 bg-white/3 text-white/25';
                  }
                  return (
                    <motion.button
                      key={i}
                      onClick={() => !feedback && setSelected(opt)}
                      disabled={!!feedback}
                      whileHover={!feedback ? { scale: 1.01 } : {}}
                      whileTap={!feedback ? { scale: 0.99 } : {}}
                      className={`w-full text-left p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${cls}`}
                    >
                      <div className={`w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all ${
                        !feedback && selected === opt
                          ? 'border-[#FF5421] bg-[#FF5421] text-white'
                          : 'border-white/20 text-white/40'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {/* ── Feedback overlay – täcker bara svarsalternativen ── */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(15,22,40,0.98)' }}
                  >
                    <div className="text-center px-6 py-8 max-w-sm w-full">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          feedback === 'correct' ? 'bg-[#FF5421]/20' : 'bg-red-500/20'
                        }`}
                      >
                        {feedback === 'correct'
                          ? <GavelIcon size={32} color="#FF5421" />
                          : <XCircle size={32} className="text-red-400" />
                        }
                      </motion.div>

                      <h4 className={`text-xl font-bold mb-3 ${feedback === 'correct' ? 'text-[#FF5421]' : 'text-red-400'}`}>
                        {feedback === 'correct' ? 'Rätt svar! 🎉' : 'Fel svar'}
                      </h4>

                      <p className="text-white/70 text-sm leading-relaxed mb-6">
                        {current.explanation}
                      </p>

                      <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleNext}
                        className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
                      >
                        {currentIndex < questions.length - 1 ? 'Nästa fråga' : 'Se resultat'}
                        <ArrowRight size={17} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Kontrollera-knapp */}
          {!feedback && (
            <div className="flex justify-end mt-4">
              <motion.button
                whileHover={selected ? { scale: 1.03 } : {}}
                whileTap={selected ? { scale: 0.97 } : {}}
                onClick={handleCheck}
                disabled={!selected}
                className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  selected ? 'text-white shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
                style={selected ? { background: 'linear-gradient(135deg, #FF5421, #E04619)' } : {}}
              >
                Kontrollera
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}