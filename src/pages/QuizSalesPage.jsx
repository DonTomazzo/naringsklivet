import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, XCircle, Trophy, Star, Zap, AlertTriangle } from 'lucide-react';

// ─── Ordförandeklubba SVG ───
const GavelIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6L18 10L10 18L6 14L14 6Z" fill={color} opacity="0.9" />
    <path d="M14 6L18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 20L8 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="15" y="2" width="5" height="7" rx="1.5" transform="rotate(45 15 2)" fill={color} />
  </svg>
);

const questions = [
  {
    id: '1', points: 10,
    question_text: 'Vad är styrelsens viktigaste skyldighet gentemot medlemmarna i en BRF?',
    options: { choices: ['Att hålla låga avgifter', 'Att förvalta föreningen enligt lag och stadgar', 'Att genomföra så många renoveringar som möjligt', 'Att hålla så få möten som möjligt'] },
    correct_answer: 'Att förvalta föreningen enligt lag och stadgar',
    explanation: 'Styrelsen har ett lagstadgat ansvar att förvalta föreningen enligt bostadsrättslagen och föreningens egna stadgar.'
  },
  {
    id: '2', points: 10,
    question_text: 'Hur många dagar innan en stämma måste kallelsen skickas ut?',
    options: { choices: ['Minst 1 vecka', 'Minst 2 veckor', 'Minst 4 veckor', 'Minst 6 veckor'] },
    correct_answer: 'Minst 2 veckor',
    explanation: 'Kallelse till föreningsstämma ska skickas ut minst 2 veckor (14 dagar) och högst 6 veckor innan stämman.'
  },
  {
    id: '3', points: 10,
    question_text: 'Vem ansvarar för underhållet av ledningar för vatten och avlopp inne i en lägenhet?',
    options: { choices: ['Alltid bostadsrättshavaren', 'Alltid föreningen', 'Beror på om ledningen är ursprunglig eller tillkommande', 'Kommunen'] },
    correct_answer: 'Beror på om ledningen är ursprunglig eller tillkommande',
    explanation: 'Ursprungliga ledningar är föreningens ansvar, medan ledningar som bostadsrättshavaren installerat själv är dennes ansvar.'
  },
  {
    id: '4', points: 10,
    question_text: 'Vad innebär likhetsprincipen i en BRF?',
    options: { choices: ['Alla lägenheter ska ha samma storlek', 'Alla medlemmar ska behandlas lika', 'Avgifterna ska vara lika för alla', 'Styrelseledamöter ska ha samma arvode'] },
    correct_answer: 'Alla medlemmar ska behandlas lika',
    explanation: 'Likhetsprincipen innebär att styrelsen inte får gynna eller missgynna enskilda medlemmar – alla behandlas lika.'
  },
  {
    id: '5', points: 10,
    question_text: 'Hur länge ska en BRF spara räkenskapsmaterial enligt bokföringslagen?',
    options: { choices: ['3 år', '5 år', '7 år', '10 år'] },
    correct_answer: '7 år',
    explanation: 'Räkenskapsinformation ska sparas i minst 7 år från utgången av det kalenderår då räkenskapsåret avslutades.'
  },
  {
    id: '6', points: 10,
    question_text: 'Vad är en underhållsplan och varför är den viktig?',
    options: { choices: ['En plan för daglig städning', 'En långsiktig plan för föreningens renoveringar och underhåll', 'En lista på föreningens leverantörer', 'En plan för nya inköp'] },
    correct_answer: 'En långsiktig plan för föreningens renoveringar och underhåll',
    explanation: 'Underhållsplanen är avgörande för att planera framtida kostnader och sätta rätt avgiftsnivå.'
  },
  {
    id: '7', points: 10,
    question_text: 'Vad händer om en styrelseledamot fattar ett beslut som strider mot bostadsrättslagen?',
    options: { choices: ['Ingenting – styrelsen är skyddad', 'Ledamoten kan bli personligt skadeståndsansvarig', 'Bara föreningen ansvarar', 'Kommunen tar över förvaltningen'] },
    correct_answer: 'Ledamoten kan bli personligt skadeståndsansvarig',
    explanation: 'Styrelseledamöter kan bli personligt ansvariga om de uppsåtligen eller av oaktsamhet orsakar skada.'
  },
  {
    id: '8', points: 10,
    question_text: 'Vad är skillnaden mellan en ordinarie och en extra stämma?',
    options: { choices: ['Det är samma sak med olika namn', 'Ordinarie hålls årligen med fasta ärenden, extra hålls vid behov', 'Extra stämma är öppen för allmänheten', 'Ordinarie kräver kommunens godkännande'] },
    correct_answer: 'Ordinarie hålls årligen med fasta ärenden, extra hålls vid behov',
    explanation: 'Den ordinarie stämman hålls en gång per år. Extra stämma kallas när styrelsen eller tillräckligt många medlemmar begär det.'
  },
  {
    id: '9', points: 10,
    question_text: 'Vad menas med att en BRF redovisar enligt K2?',
    options: { choices: ['Föreningen har 2 000 kvm', 'Föreningen följer ett förenklat regelverk för årsredovisning', 'Föreningen har kategori 2-klassad fastighet', 'Föreningen har två revisorer'] },
    correct_answer: 'Föreningen följer ett förenklat regelverk för årsredovisning',
    explanation: 'K2 är ett förenklat regelverk för årsredovisning som mindre föreningar kan välja istället för K3.'
  },
  {
    id: '10', points: 10,
    question_text: 'Vad gäller om en bostadsrättshavare vill hyra ut sin lägenhet i andra hand?',
    options: { choices: ['Det är alltid tillåtet', 'Det krävs alltid styrelsens godkännande', 'Det är aldrig tillåtet', 'Kommunen beslutar'] },
    correct_answer: 'Det krävs alltid styrelsens godkännande',
    explanation: 'Andrahandsuthyrning kräver styrelsens godkännande. Styrelsen får bara neka om det finns beaktansvärda skäl.'
  },
];

const maxScore = questions.reduce((s, q) => s + q.points, 0);

const getResult = (score) => {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return { label: 'Imponerande kunskaper!', sub: 'Du är redan på god väg – Styrelsekörkortet ger dig det sista du behöver.', icon: Trophy };
  if (pct >= 50) return { label: 'Du är på rätt väg', sub: 'Det finns viktiga luckor. Styrelsekörkortet fyller dem snabbt och effektivt.', icon: Star };
  return { label: 'Du behöver Styrelsekörkortet', sub: 'Ditt resultat visar kunskapsluckor som kan kosta din förening dyrt. Vi fixar det.', icon: AlertTriangle };
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

export default function QuizSalesPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [gavels, setGavels] = useState([]);
  const [gavelResults, setGavelResults] = useState([]);

  const current = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const result = getResult(score);
  const ResultIcon = result.icon;

  const handleCheck = () => {
    if (!selected || feedback) return;
    const isCorrect = selected === current.correct_answer;
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
      setFeedback(null);
    } else {
      setPhase('result');
    }
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
            <Zap size={13} /> Gratis kunskapstest
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Hur trygg är du i din<br />
            <span style={{ color: '#FF5421' }}>styrelseroll?</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            10 frågor om BRF-juridik, ekonomi och förvaltning. Ta reda på var du står – det tar 3 minuter.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[{ val: '10', label: 'Frågor' }, { val: '3 min', label: 'Tid' }, { val: 'Gratis', label: 'Kostnad' }].map((s, i) => (
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
            Starta testet <ArrowRight size={20} />
          </motion.button>
          <p className="text-white/30 text-xs mt-4">1 450+ styrelseledamöter har redan testat sig</p>
        </motion.div>
      </PageShell>
    );
  }

  // ─── RESULT ───
  if (phase === 'result') {
    return (
      <PageShell onClose={() => navigate(-1)}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

          {/* Resultat-huvud */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-8 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
            >
              <ResultIcon size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{result.label}</h2>
            <p className="text-white/50 text-sm mb-6 leading-relaxed max-w-xs mx-auto">{result.sub}</p>
            <div className="text-5xl font-bold text-white mb-1">
              {score}<span className="text-white/30 text-2xl">/{maxScore}</span>
            </div>
            <div className="text-white/40 text-sm mb-6">poäng</div>

            {/* Klubb-rad */}
            <div className="flex justify-center gap-1.5 mb-6">
              {questions.map((_, i) => (
                <div key={i} className={gavelResults[i] ? 'opacity-100' : 'opacity-25'}>
                  <GavelIcon size={20} color={gavelResults[i] ? '#FF5421' : '#ffffff'} />
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

          {/* Svarsöversikt */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-none sm:rounded-3xl p-6">
            <h3 className="text-white/80 text-sm font-bold mb-4 uppercase tracking-wider">Dina svar</h3>
            <div className="space-y-2">
              {answers.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${a.correct ? 'bg-[#FF5421]/20' : 'bg-red-500/20'}`}>
                    {a.correct
                      ? <CheckCircle size={12} style={{ color: '#FF5421' }} />
                      : <XCircle size={12} className="text-red-400" />
                    }
                  </div>
                  <span className={`text-xs leading-snug ${a.correct ? 'text-white/70' : 'text-white/30 line-through'}`}>
                    {a.q}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA – WhatYouGet-design */}
          <div className="rounded-none bg-[#171f32] text-white p-7 sm:p-10 flex flex-col md:flex-row items-center gap-8 border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-1.5 justify-center md:justify-start mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-current" />
                ))}
                <span className="text-white/60 text-sm ml-1">4.9/5 av 1 450+ styrelseledamöter</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
                Undviker du ett enda felaktigt beslut har kursen betalat sig mångfalt
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Frågorna du missade täcks av Styrelsekörkortet. Gå med 1 450+ trygga styrelseledamöter.
              </p>
            </div>
            <div className="text-center shrink-0">
              <div className="text-white/40 text-sm line-through mb-1">Ord. pris 5 995 kr</div>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: '#FF5421' }}>
                3 995 kr
              </div>
              <div className="text-white/50 text-sm mb-5">inkl. moms · livstidsåtkomst</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                className="px-8 py-4 rounded-xl font-bold text-white text-base shadow-lg min-h-[52px]"
                style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
              >
                Kom igång idag →
              </motion.button>
            </div>
          </div>

        </motion.div>
      </PageShell>
    );
  }

  // ─── QUIZ ───
  return (
    <PageShell onClose={() => navigate(-1)}>
      <AnimatePresence>
        {gavels.map(id => (
          <FlyingGavel key={id} id={id} onDone={() => setGavels(g => g.filter(x => x !== id))} />
        ))}
      </AnimatePresence>

      <div className="px-4 sm:px-0">
        {/* Klubb-progress-rad */}
        <div className="flex justify-center gap-1.5 mb-5">
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
                size={22}
                color={i < currentIndex && gavelResults[i] ? '#FF5421' : '#ffffff'}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Fråga {currentIndex + 1} av {questions.length}</span>
            <span>{score} poäng</span>
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
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FF5421' }}>
                Fråga {currentIndex + 1}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {current.question_text}
              </h2>
              <div className="space-y-3">
                {current.options.choices.map((opt, i) => {
                  let base = 'border-white/10 bg-white/5 text-white/80 hover:border-[#FF5421]/60 hover:bg-[#FF5421]/10';
                  if (!feedback && selected === opt) base = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                  if (feedback) {
                    if (opt === current.correct_answer) base = 'border-[#FF5421] bg-[#FF5421]/20 text-white';
                    else if (selected === opt) base = 'border-red-500 bg-red-500/10 text-red-300';
                    else base = 'border-white/5 bg-white/3 text-white/25';
                  }
                  return (
                    <motion.button
                      key={i}
                      onClick={() => !feedback && setSelected(opt)}
                      disabled={!!feedback}
                      whileHover={!feedback ? { scale: 1.01 } : {}}
                      whileTap={!feedback ? { scale: 0.99 } : {}}
                      className={`w-full text-left p-4 rounded-2xl border-2 text-sm font-medium transition-all duration-150 flex items-center gap-3 ${base}`}
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
            </div>

            {/* Feedback popup overlay */}
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
                        : <XCircle size={32} className="text-red-400" />
                      }
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
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  );
}