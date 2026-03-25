import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, XCircle, Trophy, Star, Zap, AlertTriangle, Download, Award, RotateCcw } from 'lucide-react';
import { slutprovQuiz } from '../data/quizzes/slutprov-quiz';

// ─── Ordförandeklubba SVG ───
const GavelIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6L18 10L10 18L6 14L14 6Z" fill={color} opacity="0.9" />
    <path d="M14 6L18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 20L8 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="15" y="2" width="5" height="7" rx="1.5" transform="rotate(45 15 2)" fill={color} />
  </svg>
);

const questions = slutprovQuiz.questions;
const maxScore  = questions.reduce((s, q) => s + q.points, 0);
const PASS_PCT  = 80; // procent för godkänt + diplom

const getResult = (score) => {
  const pct = (score / maxScore) * 100;
  if (pct >= PASS_PCT) return {
    passed: true,
    label: 'Godkänt – du klarade slutprovet!',
    sub: 'Du har visat att du besitter de kunskaper som krävs för ett tryggt styrelseuppdrag.',
    icon: Trophy,
    color: '#FF5421'
  };
  if (pct >= 60) return {
    passed: false,
    label: 'Nästan – du saknar några poäng',
    sub: `Du fick ${Math.round(pct)}% – du behöver ${PASS_PCT}% för att bli godkänd. Repetera och försök igen.`,
    icon: Star,
    color: '#f59e0b'
  };
  return {
    passed: false,
    label: 'Inte godkänt den här gången',
    sub: `Du fick ${Math.round(pct)}% – du behöver ${PASS_PCT}% för godkänt. Gå igenom kursen igen och försök på nytt.`,
    icon: AlertTriangle,
    color: '#ef4444'
  };
};

// ─── Flygande klubba ───
const FlyingGavel = ({ id, onDone }) => (
  <motion.div
    key={id}
    initial={{ opacity: 1, scale: 1.4, y: 0, x: 0 }}
    animate={{ opacity: 0, scale: 0.6, y: -120, x: (Math.random() - 0.5) * 60 }}
    transition={{ duration: 0.9, ease: 'easeOut' }}
    onAnimationComplete={onDone}
    className="fixed pointer-events-none z-50"
    style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
  >
    <GavelIcon size={52} color="#FF5421" />
  </motion.div>
);

// ─── PageShell ───
const PageShell = ({ children, onClose }) => (
  <div
    className="min-h-screen relative flex flex-col"
    style={{
      backgroundImage: 'url(/t2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <div className="absolute inset-0 bg-[#171f32]/80 backdrop-blur-[2px]" />
    <div className="relative z-10 flex justify-end p-4 sm:p-6">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
      >
        <span className="hidden sm:block">Tillbaka</span>
        <div className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all group-hover:scale-110">
          <X size={18} />
        </div>
      </button>
    </div>
    <div className="relative z-10 flex-1 md:flex md:items-start md:justify-center md:px-4 pb-12">
      <div className="w-full md:max-w-xl">
        {children}
      </div>
    </div>
  </div>
);

// ─── DIPLOM-KOMPONENT ───
const Diploma = ({ score, maxScore, correctCount, total, userName }) => {
  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  const pct   = Math.round((score / maxScore) * 100);

  return (
    <div
      id="diploma"
      className="relative bg-white rounded-2xl overflow-hidden"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Övre banner */}
      <div className="h-3" style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }} />

      {/* Inre ram */}
      <div className="mx-6 my-6 border-2 border-[#FF5421]/20 rounded-xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Styrelsekörkortet" className="h-12 mx-auto mb-3 object-contain" />
          <div className="text-xs font-bold text-[#FF5421] uppercase tracking-[0.3em] mb-2">Utbildningsdiplom</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            Styrelsekörkortet
          </h2>
          <p className="text-sm text-gray-500 mt-1">Certifierad styrelseledamot</p>
        </div>

        {/* Dekorativ linje */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#FF5421]/30" />
          <GavelIcon size={20} color="#FF5421" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#FF5421]/30" />
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 mb-2">Härmed intygas att</p>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 border-b-2 border-[#FF5421]/30 pb-2 mb-4 inline-block px-8">
            {userName || 'Styrelseledamot'}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
            har genomfört och godkänts på slutprovet för <strong>Styrelsekörkortet</strong> och
            därmed visat tillräckliga kunskaper inom BRF-juridik, ekonomi och förvaltning.
          </p>
        </div>

        {/* Poäng-rad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: `${pct}%`, label: 'Resultat' },
            { val: `${correctCount}/${total}`, label: 'Rätt svar' },
            { val: score, label: 'Poäng' },
          ].map((s, i) => (
            <div key={i} className="text-center bg-orange-50 rounded-xl py-3">
              <div className="text-lg font-bold" style={{ color: '#FF5421' }}>{s.val}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dekorativ linje */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#FF5421]/30" />
          <Star size={14} className="text-[#FF5421]" fill="#FF5421" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#FF5421]/30" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs text-gray-400 mb-1">Datum</div>
            <div className="text-sm font-semibold text-gray-700">{today}</div>
          </div>
          <div className="text-center">
            <img src="/signatur.png" alt="Signatur" className="h-8 object-contain mx-auto mb-1"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <p className="font-bold text-gray-800 text-base italic hidden" style={{ fontFamily: 'cursive' }}>Tomas</p>
            <div className="text-xs text-gray-400">Grundare, Styrelsekörkortet</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Certifikat-ID</div>
            <div className="text-sm font-mono text-gray-500">SK-{Date.now().toString(36).toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Nedre banner */}
      <div className="h-3" style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }} />
    </div>
  );
};

// ─── HUVUD-KOMPONENT ───
export default function FinalQuiz() {
  const navigate = useNavigate();
  const [phase, setPhase]               = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState(null);         // single_choice
  const [multiSelected, setMultiSelected] = useState([]);         // multiple_choice
  const [feedback, setFeedback]         = useState(null);
  const [score, setScore]               = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers]           = useState([]);
  const [gavels, setGavels]             = useState([]);
  const [gavelResults, setGavelResults] = useState([]);
  const [userName, setUserName]         = useState('');
  const [showDiploma, setShowDiploma]   = useState(false);

  const current    = questions[currentIndex];
  const isMulti    = current?.question_type === 'multiple_choice';
  const progress   = (currentIndex / questions.length) * 100;
  const result     = getResult(score);
  const ResultIcon = result?.icon;
  const pct        = Math.round((score / maxScore) * 100);

  // ─── Kontrollera svar ───
  const handleCheck = () => {
    if (feedback) return;
    if (isMulti && multiSelected.length === 0) return;
    if (!isMulti && !selected) return;

    let isCorrect = false;
    if (isMulti) {
      const correct = Array.isArray(current.correct_answer) ? current.correct_answer : [current.correct_answer];
      isCorrect = correct.length === multiSelected.length &&
        correct.every(c => multiSelected.includes(c));
    } else {
      isCorrect = selected === current.correct_answer;
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setGavelResults(g => [...g, isCorrect]);
    if (isCorrect) {
      setScore(s => s + current.points);
      setCorrectCount(c => c + 1);
      setGavels(g => [...g, Date.now()]);
    }
    setAnswers(a => [...a, { q: current.question_text, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setMultiSelected([]);
      setFeedback(null);
    } else {
      setPhase('result');
    }
  };

  const handleRestart = () => {
    setPhase('quiz');
    setCurrentIndex(0);
    setSelected(null);
    setMultiSelected([]);
    setFeedback(null);
    setScore(0);
    setCorrectCount(0);
    setAnswers([]);
    setGavels([]);
    setGavelResults([]);
    setShowDiploma(false);
  };

  const toggleMulti = (opt) => {
    if (feedback) return;
    setMultiSelected(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
    );
  };

  // ─── INTRO ───
  if (phase === 'intro') {
    return (
      <PageShell onClose={() => navigate(-1)}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4 sm:px-0 pt-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF5421] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <Award size={13} /> Officiellt slutprov
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Slutprov –<br />
            <span style={{ color: '#FF5421' }}>Styrelsekörkortet</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg mb-4 max-w-md mx-auto leading-relaxed">
            Klara 80% och få ditt officiella utbildningsdiplom. Provet innehåller {questions.length} frågor
            om BRF-juridik, ekonomi, GDPR och förvaltning.
          </p>

          {/* Namn-input för diplom */}
          <div className="mb-8 max-w-sm mx-auto">
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Ditt namn (visas på diplomet)</label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Anna Svensson"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#FF5421] text-center font-medium"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { val: questions.length, label: 'Frågor' },
              { val: '80%', label: 'Godkänt' },
              { val: 'Diplom', label: 'Vid godkänt' }
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl py-4 px-2">
                <div className="text-xl font-bold text-white">{s.val}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(255,84,33,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPhase('quiz')}
            className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
          >
            Starta slutprovet <ArrowRight size={20} />
          </motion.button>
          <p className="text-white/30 text-xs mt-4">Du kan göra om provet om du inte klarar det</p>
        </motion.div>
      </PageShell>
    );
  }

  // ─── RESULT ───
  if (phase === 'result') {
    return (
      <PageShell onClose={() => navigate(-1)}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 px-4 sm:px-0">

          {/* Resultat-huvud */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: result.passed ? 'linear-gradient(135deg, #FF5421, #E04619)' : 'rgba(255,255,255,0.1)' }}
            >
              <ResultIcon size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{result.label}</h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed max-w-xs mx-auto">{result.sub}</p>

            {/* Stor procent */}
            <div className="mb-4">
              <div className="text-6xl font-bold mb-1" style={{ color: result.passed ? '#FF5421' : 'white' }}>
                {pct}<span className="text-2xl text-white/30">%</span>
              </div>
              <div className="text-white/40 text-sm">
                {score} av {maxScore} poäng · {correctCount} av {questions.length} rätt
              </div>
            </div>

            {/* Progress-bar med 80%-markering */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-visible mb-2 mx-4">
              <motion.div
                className="h-full rounded-full"
                style={{ background: result.passed ? 'linear-gradient(to right, #FF5421, #E04619)' : '#ef4444' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(pct, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              {/* 80%-markering */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-white/40" style={{ left: '80%' }} />
              <div className="absolute -bottom-5 text-white/40 text-xs" style={{ left: '80%', transform: 'translateX(-50%)' }}>80%</div>
            </div>
            <div className="mb-4 mt-6" />

            {/* Klubb-rad */}
            <div className="flex justify-center gap-1 mb-6 flex-wrap">
              {questions.map((_, i) => (
                <div key={i} className={gavelResults[i] ? 'opacity-100' : 'opacity-20'}>
                  <GavelIcon size={18} color={gavelResults[i] ? '#FF5421' : '#ffffff'} />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#FF5421' }}>
                <CheckCircle size={15} /> {correctCount} rätt
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-red-400">
                <XCircle size={15} /> {questions.length - correctCount} fel
              </div>
            </div>
          </div>

          {/* ─── GODKÄNT: Diplom ─── */}
          {result.passed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF5421]/20 flex items-center justify-center">
                    <Award size={20} style={{ color: '#FF5421' }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Ditt diplom är klart!</h3>
                    <p className="text-white/50 text-xs">Visa det för din förening eller spara det</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDiploma(!showDiploma)}
                  className="w-full py-3 rounded-xl font-bold text-sm border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  {showDiploma ? 'Dölj diplom' : 'Visa diplom'}
                </button>
              </div>

              <AnimatePresence>
                {showDiploma && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Diploma
                      score={score}
                      maxScore={maxScore}
                      correctCount={correctCount}
                      total={questions.length}
                      userName={userName}
                    />
                    <p className="text-white/30 text-xs text-center mt-3">
                      Tips: Ta en skärmdump för att spara ditt diplom
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Svarsöversikt */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-6">
            <h3 className="text-white/80 text-sm font-bold mb-4 uppercase tracking-wider">Dina svar</h3>
            <div className="space-y-2">
              {answers.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${a.correct ? 'bg-[#FF5421]/20' : 'bg-red-500/20'}`}>
                    {a.correct
                      ? <CheckCircle size={12} style={{ color: '#FF5421' }} />
                      : <XCircle size={12} className="text-red-400" />}
                  </div>
                  <span className={`text-xs leading-snug ${a.correct ? 'text-white/70' : 'text-white/30 line-through'}`}>
                    {a.q}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Knappar */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleRestart}
              className="py-4 rounded-2xl font-bold text-sm text-white border border-white/20 hover:bg-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={15} /> Gör om provet
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              className="py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
            >
              Till kursen <ArrowRight size={15} />
            </motion.button>
          </div>

        </motion.div>
      </PageShell>
    );
  }

  // ─── QUIZ ───
  const correctAnswers = Array.isArray(current.correct_answer)
    ? current.correct_answer
    : [current.correct_answer];
  const requiredCount = correctAnswers.length;

  return (
    <PageShell onClose={() => navigate(-1)}>
      <AnimatePresence>
        {gavels.map(id => (
          <FlyingGavel key={id} id={id} onDone={() => setGavels(g => g.filter(x => x !== id))} />
        ))}
      </AnimatePresence>

      <div className="px-4 sm:px-0">
        {/* Klubb-progress-rad */}
        <div className="flex justify-center gap-1 mb-5 flex-wrap">
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
                size={16}
                color={i < currentIndex && gavelResults[i] ? '#FF5421' : '#ffffff'}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Fråga {currentIndex + 1} av {questions.length}</span>
            <span>{score} poäng · {Math.round((score / maxScore) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Fråge-kort */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-5 sm:p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF5421' }}>
                  Fråga {currentIndex + 1}
                </div>
                {isMulti && (
                  <div className="text-xs text-white/40 bg-white/10 px-2.5 py-1 rounded-full">
                    Markera {requiredCount} alternativ
                  </div>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {current.question_text}
              </h2>

              <div className="space-y-3">
                {current.options.choices.map((opt, i) => {
                  const isSelected = isMulti ? multiSelected.includes(opt) : selected === opt;
                  const isCorrectOpt = correctAnswers.includes(opt);

                  let base = 'border-white/10 bg-white/5 text-white/80 hover:border-[#FF5421]/60 hover:bg-[#FF5421]/10';
                  if (!feedback && isSelected) base = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                  if (feedback) {
                    if (isCorrectOpt)      base = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                    else if (isSelected)   base = 'border-red-500 bg-red-500/10 text-red-300';
                    else                   base = 'border-white/5 bg-white/3 text-white/25';
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => isMulti ? toggleMulti(opt) : (!feedback && setSelected(opt))}
                      disabled={!!feedback}
                      whileHover={!feedback ? { scale: 1.01 } : {}}
                      whileTap={!feedback ? { scale: 0.99 } : {}}
                      className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${base}`}
                    >
                      <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center text-xs font-bold transition-all
                        ${isMulti ? 'rounded-md' : 'rounded-full'}
                        ${!feedback && isSelected
                          ? 'border-2 border-[#FF5421] bg-[#FF5421] text-white'
                          : 'border-2 border-white/20 text-white/40'
                        }`}
                      >
                        {isMulti
                          ? (isSelected && !feedback ? '✓' : String.fromCharCode(65 + i))
                          : String.fromCharCode(65 + i)
                        }
                      </div>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Feedback overlay */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center rounded-none sm:rounded-3xl overflow-hidden"
                  style={{ backdropFilter: 'blur(12px)', background: 'rgba(23,31,50,0.92)' }}
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
                        : <XCircle size={32} className="text-red-400" />}
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-3 ${feedback === 'correct' ? 'text-[#FF5421]' : 'text-red-400'}`}>
                      {feedback === 'correct' ? 'Rätt svar! 🎉' : 'Fel svar'}
                    </h3>
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
                      {currentIndex < questions.length - 1 ? 'Nästa fråga' : 'Se mitt resultat'}
                      <ArrowRight size={17} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kontrollera-knapp */}
            {!feedback && (
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={(isMulti ? multiSelected.length > 0 : selected) ? { scale: 1.03 } : {}}
                  whileTap={(isMulti ? multiSelected.length > 0 : selected) ? { scale: 0.97 } : {}}
                  onClick={handleCheck}
                  disabled={isMulti ? multiSelected.length === 0 : !selected}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                    (isMulti ? multiSelected.length > 0 : selected)
                      ? 'text-white shadow-lg'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                  style={(isMulti ? multiSelected.length > 0 : selected)
                    ? { background: 'linear-gradient(135deg, #FF5421, #E04619)' }
                    : {}}
                >
                  Kontrollera
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}