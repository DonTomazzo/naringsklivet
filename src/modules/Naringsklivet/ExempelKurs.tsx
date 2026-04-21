// src/modules/Naringsklivet/ExempelKurs.tsx
//
// Exempelkurs som demonstrerar alla slide-mallar från SlideTemplates.tsx
// Klistra in valfria slides i ModuleCopilotWord eller annan modul
//
// INNEHÅLL:
//   Slide 1 – SlideC  (Bild header + vitt content) → Intro
//   Slide 2 – SlideA  (Bild vänster, text höger)   → Förklaring
//   Slide 3 – SlideB  (Bild höger, text vänster)   → Fördjupning
//   Slide 4 – SlideD  (Pratbubbla-dialog)           → Scenario
//   Slide 5 – SlideE  (Checkpunktslista)            → Sammanfattning
//   Slide 6 – SlideF  (Quiz med bild header)        → Kunskapstest

import React, { useState, useEffect } from 'react';
import { Play, Award, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';

import {
  SlideA, SlideB, SlideC, SlideD, SlideE, SlideF, SlideG, SlideH, SlideI,
  Badge, Heading, Ingress,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

// ─── Bildvägar – byt mot dina egna ───────────────────────
const BILDER = {
  intro:      '/images/co1.png',
  forklaring: '/images/co2.png',
  fordupning: '/images/co3.png',
  scenario:   '/images/co4.png',
  lista:      '/images/co1.png',
  quiz:       '/images/co2.png',
  illustration:'/images/co3.png',
  person:     '/images/co4.png',
  avslut:     '/images/co1.png',
};

// ─── FAQ ─────────────────────────────────────────────────
const FAQ = [
  {
    question: 'Vilken slide-mall passar bäst för video?',
    answer: 'SlideC — bild som header ovanför, sedan video och text i det vita blocket under.',
  },
  {
    question: 'Vilken mall passar för dialog och scenarion?',
    answer: 'SlideD — pratbubbla-layouten. Perfekt för "Vad händer om..."-scenarion.',
  },
  {
    question: 'Kan jag blanda mallar i samma kurs?',
    answer: 'Absolut — det är hela poängen. Variation håller deltagarens uppmärksamhet.',
  },
];

// ─── EXEMPELQUIZ ─────────────────────────────────────────
const quizFragor = [
  {
    id: 'eq1',
    question_text: 'Vilken slide-mall har bild till höger och text till vänster?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: ['SlideA', 'SlideB', 'SlideC', 'SlideD'] },
    correct_answer: 'SlideB',
    explanation: 'SlideB speglar SlideA — bilden sitter till höger och texten till vänster.',
    points: 100,
  },
  {
    id: 'eq2',
    question_text: 'Vilken mall är bäst för checklistor och "Tillse att..."-innehåll?',
    question_type: 'single_choice' as const,
    question_order: 2,
    options: { choices: ['SlideA', 'SlideC', 'SlideE', 'SlideF'] },
    correct_answer: 'SlideE',
    explanation: 'SlideE är inspirerad av E.ON:s "Tillse att..."-konstruktion med bild i övre zonen och grön-checkade punkter under.',
    points: 100,
  },
  {
    id: 'eq3',
    question_text: 'Vilken mall används för dialog och pratbubblor?',
    question_type: 'single_choice' as const,
    question_order: 3,
    options: { choices: ['SlideB', 'SlideC', 'SlideD', 'SlideF'] },
    correct_answer: 'SlideD',
    explanation: 'SlideD är pratbubbla-layouten inspirerad av E.ON:s dialogscenarier med två personer.',
    points: 100,
  },
];

// ══════════════════════════════════════════════════════════
// SLIDE 1 — SlideC: Bild header + vitt content (Intro)
// ══════════════════════════════════════════════════════════
const Slide1Intro = ({ onStart }: { onStart: () => void }) => (
  <SlideC
    bild={BILDER.intro}
    bildHöjd="40%"
    badge="Introduktion · Slide-mallbiblioteket"
    title="Sex mallar — en <span style='color:#FF5421'>komplett verktygslåda</span>"
  >
    <Ingress>
      Den här exempelkursen visar hur du använder alla sex slide-mallar från
      SlideTemplates.tsx. Varje slide demonstrerar en annan konstruktion.
    </Ingress>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
      {[
        { mall: 'SlideA', desc: 'Bild vänster' },
        { mall: 'SlideB', desc: 'Bild höger' },
        { mall: 'SlideC', desc: 'Bild header' },
        { mall: 'SlideD', desc: 'Pratbubbla' },
        { mall: 'SlideE', desc: 'Checklista' },
        { mall: 'SlideF', desc: 'Quiz-layout' },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-3 border text-center"
          style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}
        >
          <p className="font-black text-sm" style={{ color: O }}>{item.mall}</p>
          <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
        </div>
      ))}
    </div>

    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onStart}
      className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white shadow-lg"
      style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
    >
      <Play className="w-5 h-5" />
      Starta genomgången
    </motion.button>
  </SlideC>
);

// ══════════════════════════════════════════════════════════
// SLIDE 2 — SlideA: Bild vänster, text höger
// ══════════════════════════════════════════════════════════
const Slide2A = () => (
  <SlideA
    bild={BILDER.forklaring}
    badge="Avsnitt 01 · SlideA"
    title="Bild vänster, text höger"
  >
    <Ingress>
      SlideA är grundmallen — bilden täcker hela vänster halva, texten sitter i
      en luftig kolumn till höger. Perfekt för förklarande innehåll.
    </Ingress>

    <StegRad
      nr="1"
      titel="Bild täcker hela vänster sida"
      desc="object-cover gör att bilden alltid fyller sin yta oavsett format."
    />
    <StegRad
      nr="2"
      titel="Text i scrollbar höger kolumn"
      desc="Innehållet kan vara hur långt som helst — det scrollar inom sin zon."
    />
    <StegRad
      nr="3"
      titel="Mobilanpassad automatiskt"
      desc="På mobil visas bilden som en avrundad header ovanför texten."
    />

    <InfoBox title="När använder du SlideA?">
      När du har en stark bild som stöder budskapet till vänster och vill ha
      gott om utrymme för förklarande text, steg eller listor till höger.
    </InfoBox>
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// SLIDE 3 — SlideB: Bild höger, text vänster
// ══════════════════════════════════════════════════════════
const Slide3B = () => (
  <SlideB
    bild={BILDER.fordupning}
    badge="Avsnitt 02 · SlideB"
    title="Bild höger, text <span style='color:#FF5421'>vänster</span>"
  >
    <Ingress>
      SlideB är speglingen av SlideA. Texten sitter till vänster, bilden till
      höger. Bra när du vill variera layouten och undvika enformighet.
    </Ingress>

    <TwoCol
      left={
        <FrameBox title="Bra för">
          <Bullet>Fördjupning efter en SlideA</Bullet>
          <Bullet>Jämförelser och kontraster</Bullet>
          <Bullet>Steg 2 i en process</Bullet>
        </FrameBox>
      }
      right={
        <FrameBox title="Undvik">
          <Bullet>Att använda samma bild som SlideA</Bullet>
          <Bullet>Extremt lång text (scrollar)</Bullet>
          <Bullet>Mer än 2 SlideB i rad</Bullet>
        </FrameBox>
      }
    />

    <InfoBox>
      Tänk på rytm: SlideA → SlideB → SlideC skapar naturlig variation som
      håller deltagarens uppmärksamhet utan att kännas kaotisk.
    </InfoBox>
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// SLIDE 4 — SlideD: Pratbubbla-dialog
// ══════════════════════════════════════════════════════════
const Slide4D = () => (
  <SlideD
    bild={BILDER.scenario}
    badge="Avsnitt 03 · SlideD – Pratbubbla"
    bubblor={[
      {
        text: 'Behöver jag verkligen lära mig alla sex mallar?',
        position: 'left-top',
        color: 'light',
      },
      {
        text: 'Nej! Börja med SlideA och SlideC — de täcker 80% av alla situationer.',
        position: 'right-top',
        color: 'orange',
      },
      {
        text: 'Och SlideD då? Den verkar komplicerad...',
        position: 'left-mid',
        color: 'light',
      },
      {
        text: 'SlideD är enklast av alla — du anger bara position och text på varje bubbla.',
        position: 'right-mid',
        color: 'dark',
      },
      {
        text: 'Ok, jag fattar. Variation håller deltagarens uppmärksamhet!',
        position: 'left-bot',
        color: 'orange',
      },
    ]}
  />
);

// ══════════════════════════════════════════════════════════
// SLIDE 5 — SlideE: Checklista (E.ON "Tillse att...")
// ══════════════════════════════════════════════════════════
const Slide5E = () => (
  <SlideE
    bild={BILDER.lista}
    badge="Avsnitt 04 · SlideE – Checklista"
    title="Tänk på detta när du väljer mall"
    punkter={[
      '<strong>Variation</strong> — Använd inte samma mall mer än 2-3 gånger i rad.',
      '<strong>Bildkvalitet</strong> — Alla bilder ska vara minst 1200px breda för skärpa.',
      '<strong>Textmängd</strong> — SlideA och SlideB klarar mer text. SlideC och SlideF bör vara kortare.',
      '<strong>SlideD kräver bra bild</strong> — Pratbubblorna sitter ovanpå bilden, den behöver ha "luft" att placera bubblorna i.',
      '<strong>SlideF för quiz</strong> — Bild som header skapar tydlig signal att det är dags att tänka efter.',
    ]}
    fotnot="Kontakta Tomas om du behöver en ny mall-variant — biblioteket utökas löpande."
    fotnotColor={O}
  />
);

// ══════════════════════════════════════════════════════════
// SLIDE 6 — SlideF: Quiz med bild header
// ══════════════════════════════════════════════════════════
const Slide6F = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideF
    bild={BILDER.quiz}
    badge="Kunskapstest · SlideF"
  >
    <div className="mb-5">
      <h2
        className="text-2xl font-black text-gray-900 mb-1"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Testa dina kunskaper
      </h2>
      <p className="text-gray-500 text-sm">
        Tre frågor om slide-mallarna du just sett.
      </p>
    </div>

    <AnimatePresence>
      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 border mb-5 flex items-center gap-3"
          style={{ background: `${O}10`, borderColor: `${O}25` }}
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: O }} />
          <p className="text-sm font-semibold text-gray-800">
            Quiz avklarat! Gå vidare för kursbeviset.
          </p>
        </motion.div>
      )}
    </AnimatePresence>

    <InlineQuiz
      questions={quizFragor}
      onComplete={onComplete}
    />
  </SlideF>
);

// ══════════════════════════════════════════════════════════
// SLIDE 7 — Avslut (SlideC)
// ══════════════════════════════════════════════════════════
const Slide7Avslut = ({
  isDone,
  onDiploma,
}: {
  isDone: boolean;
  onDiploma: () => void;
}) => (
  <SlideC
    bild={BILDER.avslut}
    bildHöjd="35%"
    badge="Klar!"
    title="Du har sett alla <span style='color:#FF5421'>sex mallar</span>"
  >
    <Ingress>
      Nu vet du hur du använder SlideA–F i dina kurser. Kombinera dem fritt
      för att skapa variation och engagemang.
    </Ingress>

    <div className="space-y-2 mb-6">
      {[
        'SlideA — Bild vänster, text höger',
        'SlideB — Bild höger, text vänster',
        'SlideC — Bild header fullwidth',
        'SlideD — Pratbubbla-dialog',
        'SlideE — Checklista med bild',
        'SlideF — Quiz med bild header',
        'SlideG — Video 75% av skärmen',
        'SlideH — Illustration vänster (Styrelsekörkortet-stil)',
        'SlideI — Person + pratbubbla (E.ON-stil)',
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
          <p className="text-gray-700 text-sm">{item}</p>
        </div>
      ))}
    </div>

    {isDone && (
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onDiploma}
        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white shadow-xl"
        style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
      >
        <Award className="w-5 h-5" />
        Hämta kursbevis
      </motion.button>
    )}
  </SlideC>
);

// ══════════════════════════════════════════════════════════
// SLIDE 7 — SlideG: Video 75% av skärmen
// ══════════════════════════════════════════════════════════
const Slide7G = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideG
    videoId="scTCyh1hR0c"
    badge="Avsnitt 05 · SlideG – Video"
    title="Video tar 75% av skärmen"
    desc="Maximalt fokus på videon — textremsan under ger kontext utan att störa."
    onComplete={onComplete}
    isDone={isDone}
  />
);

// ══════════════════════════════════════════════════════════
// SLIDE 8 — SlideH: Illustration vänster (Styrelsekörkortet-stilen)
// ══════════════════════════════════════════════════════════
const Slide8H = ({ onNext }: { onNext: () => void }) => (
  <SlideH
    bild={BILDER.illustration}
    bildBg="#FFF0EB"
    badge="Avsnitt 06 · SlideH"
    title="Illustration vänster,<br/><span style='color:#FF5421'>story</span> till höger"
    ingress="SlideH är inspirerad av Styrelsekörkortet-landningssidan — en rundad bildyta
    till vänster med bakgrundsfärg, och badge + rubrik + checkpunkter + knapp till höger."
    punkter={[
      'Bildytan är rundad med <strong>rounded-3xl</strong> och padding runt om',
      'Bakgrundsfärgen bakom bilden är konfigurerbar via <strong>bildBg</strong>-prop',
      'Perfekt för "Vår story"- och "Varför vi finns"-sektioner',
      'Knappen är valfri — utelämna <strong>knappText</strong> om du inte vill ha den',
    ]}
    knappText="Gå vidare"
    onKnapp={onNext}
  />
);

// ══════════════════════════════════════════════════════════
// SLIDE 9 — SlideI: Person + pratbubbla (E.ON-stilen)
// ══════════════════════════════════════════════════════════
const Slide9I = () => (
  <SlideI
    bild={BILDER.person}
    bubbla="SlideI — hur funkar pratbubblan egentligen?"
    bubblaSida="right"
    badge="Avsnitt 07 · SlideI"
    title="Person till vänster, dialog till höger"
    ingress="SlideI är inspirerad av E.ON:s 'Cirkulär ekonomi'-konstruktion — ett personfoton
    täcker vänster halva med en pratbubbla ovanpå, och rubrik + brödtext + punkter till höger."
    punkter={[
      'Pratbubblan positioneras automatiskt i övre delen av bilden',
      'Bubblan kan peka åt vänster eller höger via <strong>bubblaSida</strong>-prop',
      'Fungerar bäst med bilder där personen är centrerad eller till vänster',
      'Perfekt för scenarion, dialoger och "Har du tänkt på..."-innehåll',
    ]}
  >
    <InfoBox title="Tips">
      Välj bilder med gott om "luft" ovanför personens huvud — det ger pratbubblan
      plats att andas utan att täcka ansiktet.
    </InfoBox>
  </SlideI>
);

// ══════════════════════════════════════════════════════════
const ExempelKurs: React.FC = () => {
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

  const allDone = completedLessons.has('quiz') && completedLessons.has('video');

  const slides = [
    {
      id: 'intro',
      title: 'Introduktion',
      component: <Slide1Intro onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'slide-a',
      title: 'SlideA – Bild vänster',
      component: <Slide2A />,
    },
    {
      id: 'slide-b',
      title: 'SlideB – Bild höger',
      component: <Slide3B />,
    },
    {
      id: 'slide-d',
      title: 'SlideD – Pratbubbla',
      component: <Slide4D />,
    },
    {
      id: 'slide-e',
      title: 'SlideE – Checklista',
      component: <Slide5E />,
    },
    {
      id: 'quiz',
      title: '🧠 Kunskapstest (SlideF)',
      component: (
        <Slide6F
          isDone={completedLessons.has('quiz')}
          onComplete={() => handleComplete('quiz')}
        />
      ),
    },
    {
      id: 'video',
      title: '🎬 SlideG – Video 75%',
      component: (
        <Slide7G
          isDone={completedLessons.has('video')}
          onComplete={() => handleComplete('video')}
        />
      ),
    },
    {
      id: 'slide-h',
      title: 'SlideH – Illustration',
      component: <Slide8H onNext={() => setCurrentIndex(8)} />,
    },
    {
      id: 'slide-i',
      title: 'SlideI – Person + bubbla',
      component: <Slide9I />,
    },
    {
      id: 'avslut',
      title: '🏆 Kursbevis',
      component: (
        <Slide7Avslut
          isDone={allDone}
          onDiploma={() => alert(`Grattis ${userData.name}!`)}
        />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
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
        courseTitle="Slide-mallbiblioteket"
        userName={userData.name}
        onDiplomaDownload={() => alert(`Grattis ${userData.name}!`)}
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
        faqs={FAQ}
        title="Frågor om slide-mallarna"
        subtitle="Vanliga frågor om när och hur du använder mallarna"
        buttonColor={O}
      />
    </div>
  );
};

export default ExempelKurs;