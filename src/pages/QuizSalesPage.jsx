import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, CheckCircle, XCircle, Trophy, Star, Zap, AlertTriangle } from 'lucide-react';

// ─── Samma ikon som FinalQuiz ───
const GavelIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6L18 10L10 18L6 14L14 6Z" fill={color} opacity="0.9" />
    <path d="M14 6L18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 20L8 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="15" y="2" width="5" height="7" rx="1.5" transform="rotate(45 15 2)" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────
// SITUATIONSBASERADE FRÅGOR
// ─────────────────────────────────────────────

const questions = [
  {
    id: '1',
    points: 10,
    category: 'Promptteknik',
    persona: 'Lisa',
    question_text: 'Lisa ska skriva en produktbeskrivning för sitt företags nya tjänst med hjälp av ChatGPT. Hon skriver: "Skriv en produktbeskrivning." Resultatet är generiskt och oanvändbart. Vad borde Lisa ha gjort?',
    options: { choices: [
      'Provat ett annat AI-verktyg istället',
      'Gett AI en roll, målgrupp, ton och exempel på hur texten ska låta',
      'Skrivit prompten på engelska för bättre resultat',
      'Lagt till fler adjektiv i sin prompt',
    ]},
    correct_answer: 'Gett AI en roll, målgrupp, ton och exempel på hur texten ska låta',
    explanation: 'En bra prompt innehåller roll ("Du är en erfaren copywriter"), kontext (vad tjänsten gör), målgrupp (vem den riktar sig till) och format. Ju mer specifik Lisa är, desto mer användbart blir svaret.',
  },
  {
    id: '2',
    points: 10,
    category: 'AI-säkerhet & GDPR',
    persona: 'Johan',
    question_text: 'Johan är säljchef och vill använda ChatGPT för att analysera en lista med 200 kundnamn, e-postadresser och köphistorik. Han är på väg att klistra in hela listan. Vad bör Johan tänka på?',
    options: { choices: [
      'Ingenting – ChatGPT är säkert att använda för all data',
      'Han bör kontrollera att företaget har ett dataskyddsavtal med OpenAI innan personuppgifter hanteras',
      'Han bör byta till Google Docs istället',
      'Han bör fråga kunderna om lov innan han analyserar datan',
    ]},
    correct_answer: 'Han bör kontrollera att företaget har ett dataskyddsavtal med OpenAI innan personuppgifter hanteras',
    explanation: 'Personuppgifter som namn och e-post täcks av GDPR. Gratisversionerna av ChatGPT kan använda data för träning. Johan bör använda en företagsversion med dataskyddsavtal – eller anonymisera datan innan.',
  },
  {
    id: '3',
    points: 10,
    category: 'Verktygsval',
    persona: 'Maria',
    question_text: 'Maria är konsult och behöver analysera ett 80-sidigt avtal och sammanfatta de viktigaste riskerna. Vilket AI-verktyg passar bäst för den uppgiften?',
    options: { choices: [
      'Midjourney – för att visualisera avtalet',
      'Claude – känt för att hantera långa dokument och ge nyanserade analyser',
      'ChatGPT gratisversionen – den vanligaste och enklaste',
      'Canva AI – för att presentera resultatet snyggt',
    ]},
    correct_answer: 'Claude – känt för att hantera långa dokument och ge nyanserade analyser',
    explanation: 'Claude är byggt för att hantera mycket långa texter och håller kontexten över hela dokumentet. För avtal, rapporter och komplexa analyser är Claude generellt sett starkare än ChatGPT.',
  },
  {
    id: '4',
    points: 10,
    category: 'AI-strategi & implementering',
    persona: 'Lars',
    question_text: 'Lars är VD på ett medelstort bolag och vill implementera AI i organisationen. Han funderar på att köpa in sex olika AI-verktyg för olika avdelningar på en gång. Vad är den bästa strategin?',
    options: { choices: [
      'Köp in alla sex verktyg direkt – det ger mest värde',
      'Börja med ett verktyg, bygg kompetens, mät resultatet och skala sedan upp',
      'Vänta tills AI-tekniken är mer mogen om 2–3 år',
      'Låt IT-avdelningen bestämma vilka verktyg som ska användas',
    ]},
    correct_answer: 'Börja med ett verktyg, bygg kompetens, mät resultatet och skala sedan upp',
    explanation: 'AI-implementering misslyckas ofta för att man försöker göra för mycket på en gång. Välj ett tydligt use case, mät effekten och bygg sedan vidare. Att äga sex verktyg halvhjärtat är sämre än att behärska ett fullt ut.',
  },
  {
    id: '5',
    points: 10,
    category: 'Källkritik',
    persona: 'Emma',
    question_text: 'Emma ber ChatGPT ta fram tre studier som visar att hennes produkt är effektiv. AI presenterar tre konkreta studier med titlar, tidskrifter och årtal. Emma är på väg att citera dem i sin marknadsföring. Vad bör hon göra?',
    options: { choices: [
      'Publicera direkt – AI:n är pålitlig för akademiska källor',
      'Verifiera att studierna faktiskt existerar innan hon citerar dem',
      'Be AI om tre till studier för att ha fler att välja bland',
      'Byta till en annan AI som är mer pålitlig för forskning',
    ]},
    correct_answer: 'Verifiera att studierna faktiskt existerar innan hon citerar dem',
    explanation: 'AI-hallucination är ett verkligt problem. ChatGPT kan generera trovärdigt-ljungande referenser som inte existerar. Emma måste söka upp varje studie och bekräfta att den är verklig innan hon använder den.',
  },
  {
    id: '6',
    points: 10,
    category: 'Egenföretagande med AI',
    persona: 'Sara',
    question_text: 'Sara driver en konsultfirma ensam och lägger 10 timmar i veckan på att skriva offerter, mejl och rapporter. Hon har aldrig använt AI. Vad är det smartaste första steget?',
    options: { choices: [
      'Köpa in det dyraste AI-verktyget direkt',
      'Läsa på i 3 månader innan hon testar något',
      'Välja en uppgift hon gör varje vecka och testa AI-hjälp på just den under en vecka',
      'Anställa en AI-specialist som kan hjälpa henne',
    ]},
    correct_answer: 'Välja en uppgift hon gör varje vecka och testa AI-hjälp på just den under en vecka',
    explanation: 'Börja litet och konkret. Välj den uppgift du lägger mest tid på och som inte kräver din unika expertis. Mät tidsbesparing. Det är så AI-vana byggs – inte genom att läsa om det, utan genom att göra det.',
  },
  {
    id: '7',
    points: 10,
    category: 'AI för chefer & team',
    persona: 'Anders',
    question_text: 'Anders är chef och märker att hans team börjar använda AI-verktyg på jobbet utan att han frågat om lov. Han funderar på att förbjuda all AI-användning tills vidare. Vad är det klokaste beslutet?',
    options: { choices: [
      'Förbjud all AI-användning direkt – säkerheten går före',
      'Ignorera det – om det fungerar är det okej',
      'Ta fram en enkel AI-policy och ha ett teammöte om vad som är tillåtet och inte',
      'Byt ut alla anställda som använder AI utan lov',
    ]},
    correct_answer: 'Ta fram en enkel AI-policy och ha ett teammöte om vad som är tillåtet och inte',
    explanation: 'Förbud utan policy skapar en skuggkultur där folk fortsätter använda AI men döljer det. En enkel policy (godkända verktyg, vad som inte får läggas in) och ett öppet samtal är mycket effektivare.',
  },
  {
    id: '8',
    points: 10,
    category: 'Promptteknik',
    persona: 'Karin',
    question_text: 'Karin har bett AI skriva ett mejl tre gånger och är fortfarande inte nöjd. Varje gång skriver hon en helt ny prompt från noll. Vad borde hon göra istället?',
    options: { choices: [
      'Byta till ett annat AI-verktyg',
      'Acceptera att AI inte kan skriva bra mejl',
      'Ge feedback i konversationen: "Bra, men gör det kortare och mer avslappnat i tonen"',
      'Lägga till fler instruktioner i den ursprungliga prompten och börja om',
    ]},
    correct_answer: 'Ge feedback i konversationen: "Bra, men gör det kortare och mer avslappnat i tonen"',
    explanation: 'AI kommer ihåg konversationen. Istället för att börja om är det mer effektivt att ge specifik feedback i samma tråd. "Gör det 30% kortare" eller "byt tonläge till mer personligt" ger snabba, precisa förbättringar.',
  },
  {
    id: '9',
    points: 10,
    category: 'Verktygsval',
    persona: 'Peter',
    question_text: 'Peter arbetar på ett företag som använder Microsoft 365 och Teams dagligen. Han vill använda AI för att sammanfatta möten och hjälpa till i Word och Excel. Vilket verktyg är mest logiskt?',
    options: { choices: [
      'ChatGPT – det är mest känt och används av flest',
      'Microsoft Copilot – inbyggt direkt i hans befintliga Office-verktyg',
      'Claude – bäst på långa dokument',
      'Gemini – har starkast koppling till sökmotorn',
    ]},
    correct_answer: 'Microsoft Copilot – inbyggt direkt i hans befintliga Office-verktyg',
    explanation: 'Copilot lever direkt i Word, Excel, Outlook och Teams. Om organisationen redan har Microsoft 365 är Copilot det naturliga valet – inget byte av verktyg behövs och data stannar i företagets miljö.',
  },
  {
    id: '10',
    points: 10,
    category: 'AI-strategi & implementering',
    persona: 'Lena',
    question_text: 'Lena är HR-chef och ska rekrytera en ny medarbetare. En kollega föreslår att AI ska göra den slutliga bedömningen av kandidaterna för att undvika bias. Vad är Lenas klokaste svar?',
    options: { choices: [
      '"Ja – AI är alltid mer objektiv än människor"',
      '"AI kan stödja urvalsprocessen, men det slutliga beslutet måste fattas av en människa med etiskt ansvar"',
      '"Nej – AI bör inte användas alls i rekrytering"',
      '"Ja, men bara om vi använder den dyraste AI-modellen"',
    ]},
    correct_answer: '"AI kan stödja urvalsprocessen, men det slutliga beslutet måste fattas av en människa med etiskt ansvar"',
    explanation: 'AI är ett kraftfullt stödverktyg – men den är inte neutral. Den tränas på historisk data och kan reproducera bias. Beslut med stor påverkan på människor kräver mänskligt omdöme och ansvar. AI assisterar, människan beslutar.',
  },
];

const maxScore = questions.reduce((s, q) => s + q.points, 0);

const getResult = (score) => {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return {
    label: 'Imponerande AI-mognad!',
    sub: 'Du tänker redan som en AI-van yrkesperson. Näringsklivets kurs ger dig strukturen och verktygen för att ta det hela vägen.',
    icon: Trophy,
  };
  if (pct >= 50) return {
    label: 'Du är på rätt väg',
    sub: 'Det finns viktiga luckor – men du har grunderna. Näringsklivets träningsprogram fyller dem snabbt och konkret.',
    icon: Star,
  };
  return {
    label: 'Här finns mycket att vinna',
    sub: 'Ditt resultat visar att rätt AI-kunskap kan frigöra timmar varje vecka. Vi hjälper dig dit.',
    icon: AlertTriangle,
  };
};

// ─── Flygande ikon ───
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

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function QuizSalesPage() {
  const navigate = useNavigate();
  const [phase,         setPhase]         = useState('intro');
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [selected,      setSelected]      = useState(null);
  const [feedback,      setFeedback]      = useState(null);
  const [score,         setScore]         = useState(0);
  const [correctCount,  setCorrectCount]  = useState(0);
  const [answers,       setAnswers]       = useState([]);
  const [gavels,        setGavels]        = useState([]);
  const [gavelResults,  setGavelResults]  = useState([]);

  const current    = questions[currentIndex];
  const progress   = (currentIndex / questions.length) * 100;
  const result     = getResult(score);
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
            <Zap size={13} /> Gratis AI-test
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Hur redo är du att jobba<br />
            <span style={{ color: '#FF5421' }}>smartare med AI?</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            10 verkliga situationer. Vad gör du? Ta reda på var du står – och vad du kan vinna på att lära dig mer.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { val: '10',     label: 'Situationer' },
              { val: '3 min',  label: 'Tid' },
              { val: 'Gratis', label: 'Kostnad' },
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
            Starta testet <ArrowRight size={20} />
          </motion.button>
          <p className="text-white/30 text-xs mt-4">Används av medarbetare, chefer och egenföretagare</p>
        </motion.div>
      </PageShell>
    );
  }

  // ─── RESULT ───
  if (phase === 'result') {
    return (
      <PageShell onClose={() => navigate(-1)}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

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
                    {questions[i]?.persona && <span className="text-white/40">{questions[i].persona}: </span>}
                    {a.q.substring(0, 70)}...
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-none bg-[#171f32] text-white p-7 sm:p-10 flex flex-col md:flex-row items-center gap-8 border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-1.5 justify-center md:justify-start mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-current" />
                ))}
                <span className="text-white/60 text-sm ml-1">Lanseras 2026 · Introduktionspris</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
                Situationerna du missade täcks av{' '}
                <span style={{ color: '#FF5421' }}>AI-träningsprogrammet</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                14 praktiska moduler som gör dig trygg i exakt de situationer du just testade – och många fler.
              </p>
            </div>
            <div className="text-center shrink-0">
              <div className="text-white/40 text-sm line-through mb-1">Ord. pris 2 995 kr</div>
              <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: '#FF5421' }}>
                1 995 kr
              </div>
              <div className="text-white/50 text-sm mb-5">exkl. moms · 365 dagars åtkomst</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/naringsklivet-ai')}
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
        {/* Ikon-progress */}
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
            <span>Situation {currentIndex + 1} av {questions.length}</span>
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

        {/* Frågekort */}
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

              {/* Kategori + persona */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF5421' }}>
                  {current.category}
                </span>
                {current.persona && (
                  <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                    {current.persona}s situation
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white mb-6 leading-snug">
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
                        : <XCircle size={32} className="text-red-400" />
                      }
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-3 ${feedback === 'correct' ? 'text-[#FF5421]' : 'text-red-400'}`}>
                      {feedback === 'correct' ? 'Rätt tänkt! 🎉' : 'Inte riktigt'}
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
                      {currentIndex < questions.length - 1 ? 'Nästa situation' : 'Se mitt resultat'}
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