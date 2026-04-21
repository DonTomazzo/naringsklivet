// src/modules/Naringsklivet/ModuleCopilotWord.tsx
// Kortkurs: Copilot i Word
// Egna bilder fullscreen som bakgrund, text med ljust overlay ovanpå

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Play, CheckCircle, ChevronRight } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';

const O    = '#FF5421';
const OD   = '#E04619';
const DARK = '#0f1623';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Behöver jag en speciell licens för Copilot i Word?',
    answer: 'Ja, du behöver Microsoft 365 Copilot-licensen som är ett tillägg till din vanliga M365-licens. Kolla med din IT-avdelning eller administratör.',
  },
  {
    question: 'Fungerar Copilot på svenska?',
    answer: 'Ja, Copilot i Word fungerar utmärkt på svenska. Du kan skriva dina instruktioner på svenska och få svar på svenska.',
  },
  {
    question: 'Kan jag lita på allt Copilot skriver?',
    answer: 'Nej — se alltid AI-genererad text som ett första utkast. Granska fakta, justera språket och kontrollera att informationen stämmer innan du skickar vidare.',
  },
  {
    question: 'Kan Copilot läsa mina egna filer?',
    answer: 'Ja, med rätt licens kan du klicka på plus-tecknet och välja upp till tre befintliga dokument som Copilot ska använda som grund för ny text.',
  },
];

// ─── QUIZ-FRÅGOR ─────────────────────────────────────────
const quizFragor = [
  {
    id: 'q1',
    question_text: 'Var dyker Copilot-knappen upp i Word?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Endast i Arkiv-menyn',
      'I verktygsfältet, vid markören och i en sidopanel',
      'Endast om du högerklickar på skrivbordet',
      'Den syns bara när du sparar som PDF',
    ]},
    correct_answer: 'I verktygsfältet, vid markören och i en sidopanel',
    explanation: 'Copilot finns nästan överallt i Word — i verktygsfältet, som en flytande knapp vid markören, och som en sidopanel för att chatta med dokumentet.',
    points: 100,
  },
  {
    id: 'q2',
    question_text: 'Vad är fördelen med funktionen "Sammanfatta"?',
    question_type: 'single_choice' as const,
    question_order: 2,
    options: { choices: [
      'Den rättar alla stavfel i dokumentet',
      'Den översätter automatiskt till engelska',
      'Du får snabbt en överblick utan att läsa hela texten',
      'Den raderar onödig text permanent',
    ]},
    correct_answer: 'Du får snabbt en överblick utan att läsa hela texten',
    explanation: 'Med "Sammanfatta" kan Copilot läsa igenom ett långt dokument och ge dig de viktigaste punkterna direkt — perfekt för rapporter och mötesanteckningar.',
    points: 100,
  },
  {
    id: 'q3',
    question_text: 'Hur ändrar du tonen i en text du redan skrivit?',
    question_type: 'single_choice' as const,
    question_order: 3,
    options: { choices: [
      'Du måste skriva om allt manuellt',
      'Markera texten och välj "Skriv om" med Copilot',
      'Genom att byta typsnitt till Comic Sans',
      'Du kan bara ändra ton i Outlook, inte Word',
    ]},
    correct_answer: 'Markera texten och välj "Skriv om" med Copilot',
    explanation: 'Markera texten → klicka på "Skriv om". Du kan be Copilot göra texten kortare, mer formell eller mer säljande, och bläddra mellan olika förslag.',
    points: 100,
  },
  {
    id: 'q4',
    question_text: 'Vad bör du göra med text som Copilot har genererat?',
    question_type: 'single_choice' as const,
    question_order: 4,
    options: { choices: [
      'Kopiera och skicka direkt utan att läsa',
      'Lita på att all fakta är 100% korrekt',
      'Granska, faktakontrollera och justera språket',
      'Ingenting — Copilot-text går inte att redigera',
    ]},
    correct_answer: 'Granska, faktakontrollera och justera språket',
    explanation: 'Copilot är en fantastisk assistent men inte perfekt. Se alltid resultatet som ett första utkast — granska fakta och justera språket.',
    points: 100,
  },
  {
    id: 'q5',
    question_text: 'Hur ger du Copilot bäst förutsättningar när du skapar ny text?',
    question_type: 'single_choice' as const,
    question_order: 5,
    options: { choices: [
      'Genom att skriva så korta instruktioner som möjligt',
      'Genom att vara specifik med ämne, ton och målgrupp',
      'Genom att skriva med bara stora bokstäver',
      'Genom att inte ge några instruktioner alls',
    ]},
    correct_answer: 'Genom att vara specifik med ämne, ton och målgrupp',
    explanation: 'Ju mer detaljer du ger om målgrupp, syfte och ton, desto bättre blir resultatet.',
    points: 100,
  },
];

// ─── SLIDE 1: INTRO ───────────────────────────────────────
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img
      src="/images/co1.png"
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    

    <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-10 py-16 pb-28 w-full">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>

        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: `${O}20`, color: O, border: `1px solid ${O}40` }}
        >
          Kortkurs · Microsoft 365
        </div>

        

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-xl"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
        >
          <Play className="w-5 h-5" />
          Starta kursen
          <ChevronRight className="w-4 h-4" />
        </motion.button>

      </motion.div>
    </div>
  </div>
);

// ─── SLIDE 2: VIDEO ───────────────────────────────────────
const VideoSlide = ({ onComplete }: { onComplete: () => void }) => {
  const [watched, setWatched] = useState(false);

  return (
    <div className="min-h-full relative overflow-hidden">
      <img
        src="/images/co2.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10 pb-28">

          <div
            className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
            style={{ background: `${O}20`, color: O, border: `1px solid ${O}40` }}
          >
            Avsnitt 01 · Video
          </div>

          <h2
            className="text-3xl sm:text-4xl font-black mb-2 leading-tight"
            style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}
          >
            Skapa och redigera dokument med Copilot
          </h2>
          <p className="text-gray-500 text-base mb-6 leading-relaxed">
            Se videon och läs igenom punkterna nedan. Gör sedan kunskapstestet.
          </p>

          {/* YouTube embed */}
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-6 shadow-lg"
            style={{ paddingBottom: '56.25%', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/scTCyh1hR0c?rel=0&modestbranding=1"
              title="Copilot i Word"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Vad du lär dig */}
          <div
            className="rounded-2xl p-5 border mb-6"
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
              Vad du lär dig i videon
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Var du hittar Copilot i Word',
                'Sammanfatta långa dokument på sekunder',
                'Ställa specifika frågor om innehållet',
                'Skriva om text med annan ton eller stil',
                'Skapa nytt innehåll från scratch',
                'Hämta information från egna filer',
                'Granska och faktakontrollera AI-text',
              ].map((punkt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: O }} />
                  <p className="text-gray-600 text-sm leading-relaxed">{punkt}</p>
                </div>
              ))}
            </div>
          </div>

          {!watched ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setWatched(true); onComplete(); }}
              className="w-full py-4 rounded-2xl font-bold text-white text-base shadow-md"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
            >
              ✓ Jag har sett videon — fortsätt till quiz
            </motion.button>
          ) : (
            <div
              className="w-full py-4 rounded-2xl font-bold text-center text-sm border"
              style={{ background: `${O}12`, color: O, borderColor: `${O}30` }}
            >
              ✓ Video markerad som klar
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ─── SLIDE 3: QUIZ ────────────────────────────────────────
const QuizSlide = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <div className="min-h-full relative overflow-hidden">
    <img
      src="/images/co3.png"
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'rgba(255,255,255,0.88)' }}
    />

    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10 pb-28">

        <div
          className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
          style={{ background: `${O}20`, color: O, border: `1px solid ${O}40` }}
        >
          Avsnitt 02 · Kunskapstest
        </div>

        <h2
          className="text-3xl sm:text-4xl font-black mb-2 leading-tight"
          style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}
        >
          Testa dina kunskaper
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Fem frågor om det du precis lärt dig om Copilot i Word.
        </p>

        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-4 border mb-6 flex items-center gap-3"
              style={{ background: `${O}10`, borderColor: `${O}25` }}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: O }} />
              <p className="text-sm font-semibold" style={{ color: DARK }}>
                Quiz avklarat! Gå vidare för att hämta ditt kursbevis.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <InlineQuiz
          questions={quizFragor}
          onComplete={onComplete}
        />

      </div>
    </div>
  </div>
);

// ─── SLIDE 4: KLAR ────────────────────────────────────────
const KlarSlide = ({
  isDone,
  onDiploma,
}: {
  isDone: boolean;
  onDiploma: () => void;
}) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img
      src="/images/co4.png"
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(105deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.4) 100%)' }}
    />

    <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-10 py-16 pb-28 w-full text-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>

        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl"
          style={{ background: `${O}15`, border: `2px solid ${O}30` }}
        >
          🏆
        </div>

        <div
          className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
          style={{ background: `${O}20`, color: O, border: `1px solid ${O}40` }}
        >
          Kursen avslutad
        </div>

        <h2
          className="text-3xl sm:text-4xl font-black mb-3 leading-tight"
          style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}
        >
          Bra jobbat!
        </h2>

        <p className="text-gray-500 text-base leading-relaxed mb-8">
          Du har genomfört <strong style={{ color: DARK }}>Copilot i Word</strong> och
          vet nu hur du sammanfattar, skriver om och skapar dokument med AI.
        </p>

        <div
          className="rounded-2xl p-5 border mb-8 text-left"
          style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
            Du kan nu
          </p>
          <div className="space-y-2">
            {[
              'Hitta Copilot i Word och förstå var den finns',
              'Sammanfatta långa dokument på sekunder',
              'Skriva om text med annan ton eller stil',
              'Skapa nytt innehåll med detaljerade instruktioner',
              'Granska och faktakontrollera AI-genererad text',
            ].map((punkt, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
                <p className="text-gray-600 text-sm">{punkt}</p>
              </div>
            ))}
          </div>
        </div>

        {isDone && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDiploma}
            className="w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
          >
            <Award className="w-6 h-6" />
            Hämta kursbevis
          </motion.button>
        )}

      </motion.div>
    </div>
  </div>
);

// ─── HUVUD-KOMPONENT ──────────────────────────────────────
const ModuleCopilotWord: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const allDone = completedLessons.has('video') && completedLessons.has('quiz');

  const slides = [
    {
      id: 'intro',
      title: 'Introduktion',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'video',
      title: '🎬 Copilot i Word',
      component: <VideoSlide onComplete={() => handleComplete('video')} />,
    },
    {
      id: 'quiz',
      title: '🧠 Kunskapstest',
      component: (
        <QuizSlide
          isDone={completedLessons.has('quiz')}
          onComplete={() => handleComplete('quiz')}
        />
      ),
    },
    {
      id: 'avslut',
      title: '🏆 Kursbevis',
      component: (
        <KlarSlide
          isDone={allDone}
          onDiploma={() => alert(`Grattis ${userData.name}! Kursbevis laddas ner...`)}
        />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#f8f7f4' }}>
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>

      <SlideSidebar
        slides={slides}
        currentIndex={currentIndex}
        completedLessons={completedLessons}
        onNavigate={setCurrentIndex}
        courseTitle="Copilot i Word"
        userName={userData.name}
        onDiplomaDownload={() => alert(`Grattis ${userData.name}! Kursbevis laddas ner...`)}
      />

      <div
        className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}
      >
        <ModuleSlideLayout
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          showHeader={currentIndex > 0}
        >
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>

      <FloatingFAQ
        faqs={MODULE_FAQ}
        title="Frågor om Copilot i Word"
        subtitle="Vanliga frågor om Microsoft Copilot"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleCopilotWord;