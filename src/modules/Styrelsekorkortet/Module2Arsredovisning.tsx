// src/pages/modules/Module2Arsredovisning.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Award, Target, BarChart2 } from 'lucide-react';

import CourseHeader from '../../components/CourseElements/CourseHeader';
import GlobalSidebar from '../../components/GlobalSidebar';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer from '../../components/AudioPlayer';
import QuizWidget from '../../components/QuizWidget';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';

import ArsredovisningOverview      from '../../components/CourseElements/Arsredovisning/ArsredovisningOverview';
import ResultatBalansSection       from '../../components/CourseElements/Arsredovisning/ResultatBalansSection';
import NyckeltalSection            from '../../components/CourseElements/Arsredovisning/NyckeltalSection';
import OrdlistaSection             from '../../components/CourseElements/Arsredovisning/OrdlistaSection';
import RevisionsberattelsenSection from '../../components/CourseElements/Arsredovisning/RevisionsberattelsenSection';
import FakturaflodeSection         from '../../components/CourseElements/Arsredovisning/FakturaflodeSection';

import { arsredovisningQuiz } from '../../data/quizzes/arsredovisning-quiz';

const MODULE_FAQ = [
  { question: 'Måste vi anlita revisor?', answer: 'Ja, alla bostadsrättsföreningar är skyldiga att ha en revisor. Revisorn väljs av föreningsstämman och granskar räkenskaperna varje år.' },
  { question: 'Vad är K2 och K3?', answer: 'K2 och K3 är redovisningsregelverk. De flesta BRF-er använder K2. K3 kräver komponentavskrivning men ger en mer rättvisande bild av fastighetens underhållsbehov.' },
  { question: 'Hur ofta måste vi upprätta årsredovisning?', answer: 'En gång per år. Årsredovisningen ska skickas in till Bolagsverket senast 7 månader efter räkenskapsårets slut.' },
  { question: 'Vad är de obligatoriska nyckeltalen?', answer: 'Sedan 2023 ska BRF-er redovisa standardiserade nyckeltal: årsavgift kr/kvm, skuldsättning kr/kvm, räntekostnad kr/kvm, energikostnad kr/kvm, sparande kr/kvm, soliditet % med flera.' },
];

// ── Intro-slide ───────────────────────────────

const IntroSlide = ({ onStart }) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img src="/arsredovisning-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,22,35,0.93), rgba(23,31,50,0.86))' }} />
    <div className="max-w-4xl mx-auto px-6 relative z-10 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">MODUL 2</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Att läsa en årsredovisning
        </h1>
        <AudioPlayer audioSrc="/audio/arsredovisning-intro.mp3" />
        <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
          Lär dig tyda en årsredovisning från pärm till pärm. Förstå resultaträkning, balansräkning, nyckeltal och revisionsberättelse.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Target,    title: '7 Avsnitt',    sub: 'Från förvaltningsberättelse till kontering' },
            { icon: BarChart2, title: '15 Nyckeltal', sub: 'Alla obligatoriska nyckeltal förklarade' },
            { icon: Award,     title: '675 Poäng',    sub: 'Testa dina kunskaper i slutquizet' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
              <item.icon className="w-10 h-10 text-[#FF5421] mb-3" />
              <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.sub}</p>
            </motion.div>
          ))}
        </div>
        <button onClick={onStart}
          className="flex items-center gap-2 bg-[#FF5421] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#E04A1D] transition-all">
          Börja lära dig <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  </div>
);

// ── Quiz-slide ────────────────────────────────

const QuizSlide = ({ onComplete, isDone }) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#171f32]/90" />
    <div className="max-w-xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">KUNSKAPSKONTROLL</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Testa dina kunskaper</h2>
          <p className="text-white/60 text-sm">Du behöver 80% rätt för att klara kontrollen.</p>
        </div>
        <QuizWidget
          questions={arsredovisningQuiz.questions}
          onComplete={(results) => { if (results.passed) onComplete('ar-quiz'); }}
        />
        {isDone && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/10 border-2 border-green-400 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <span className="font-semibold text-green-300">Godkänt! +200 poäng</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  </div>
);

// ── Modul ─────────────────────────────────────

const Module2Arsredovisning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set(['intro']));
  const [isDesktop, setIsDesktop] = useState(false);
  const [userData] = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCompleteLesson = (id) => setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    {
      id: 'intro',
      title: 'Introduktion',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'ar-overview',
      title: 'Årsredovisningens delar',
      component: <ArsredovisningOverview isCompleted={completedLessons.has('ar-overview')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-siffror',
      title: 'Resultat & Balansräkning',
      component: <ResultatBalansSection isCompleted={completedLessons.has('ar-siffror')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-faktura',
      title: 'Följ fakturan',
      component: <FakturaflodeSection isCompleted={completedLessons.has('ar-faktura')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-nyckeltal',
      title: 'Nyckeltal',
      component: <NyckeltalSection isCompleted={completedLessons.has('ar-nyckeltal')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-ordlista',
      title: 'Ordlista',
      component: <OrdlistaSection isCompleted={completedLessons.has('ar-ordlista')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-revision',
      title: 'Revisionsberättelsen',
      component: <RevisionsberattelsenSection isCompleted={completedLessons.has('ar-revision')} onComplete={handleCompleteLesson} />,
    },
    {
      id: 'ar-quiz',
      title: 'Kunskapskontroll',
      component: <QuizSlide onComplete={handleCompleteLesson} isDone={completedLessons.has('ar-quiz')} />,
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0f1623' }}>

      {/* CourseHeader – progressbar skickas in som prop */}
      <div className="flex-shrink-0">
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>

      <GlobalSidebar />

      {/* Slide-layout */}
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
        title="Vanliga frågor"
        subtitle="Svar på vanliga frågor om årsredovisningen"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default Module2Arsredovisning;