import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AiDailyLifeSection from "../components/CourseElements/AiDailyLifeSection";
import CourseHeader from '../components/CourseElements/CourseHeader';
import VideoButton from '../components/CourseElements/VideoButton';
import FloatingFAQ from '../components/CourseElements/FloatingFAQ';
import { styrelseFaqs } from '../data/faq/faq-data';
import NavigationButtons from '../components/CourseElements/NavigationButtons';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play,
  BookOpen, FileText, HelpCircle, Video, ChevronRight, Code,
  Sparkles, Lightbulb, Target, Zap
} from 'lucide-react';
import Sidebar from '../components/CourseElements/Sidebar';
import CourseQuiz from '../components/CourseElements/CourseQuiz';
import { htmlGrundrollerQuiz, htmlSlutprovQuiz } from '../data/quizzes/html-grundroller-quiz';

const HTMLCoursePage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set(['intro']));
  const [isDesktop, setIsDesktop] = useState(true);
  const [reflection, setReflection] = useState('');
  
  // Quiz states
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizIncorrect, setQuizIncorrect] = useState(0);

  // 🆕 Global user data (ersätt med din faktiska data från context/state management)
  const [userData] = useState({
    name: 'Anna Svensson',
    avatar: '', // Lämna tom för att visa fallback-ikon, eller lägg till bild-URL
    totalPoints: 2450, // Total från ALLA moduler
  });

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Scroll-tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionHeight = section.getBoundingClientRect().height;
        const sectionId = section.getAttribute('data-section');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      // 🔧 FIXAD OFFSET - Tar hänsyn till header-höjden (ca 72px) + lite extra margin
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsSidebarOpen(false);
  };

  const handleCompleteLesson = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const handleQuizComplete = (score: number, maxScore: number, quizId: string) => {
    setActiveQuizId(null);
    handleCompleteLesson(quizId);
    // Reset quiz stats
    setQuizScore(0);
    setQuizCorrect(0);
    setQuizIncorrect(0);
  };

  const handleQuizScoreUpdate = (score: number, correct: number, incorrect: number) => {
    setQuizScore(score);
    setQuizCorrect(correct);
    setQuizIncorrect(incorrect);
  };

  const courseContent = [
    {
      id: 'intro',
      title: 'Välkommen',
      type: 'intro',
      phase: 'intro',
      icon: BookOpen,
      duration: '5 min läsning'
    },
    {
      id: 'ai-idag',
      title: 'Styrelsens olika roller',
      type: 'interactive',
      phase: 'grunderna',
      icon: Zap,
      duration: 'Interaktiv lektion', 
      points: 100 
    },
    {
      id: 'ordforande',
      title: 'Ordförande',
      type: 'text',
      phase: 'grunderna',
      icon: Target,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'vice-ordforande',
      title: 'Vice ordförande',
      type: 'text',
      phase: 'grunderna',
      icon: Sparkles,
      duration: '8 min läsning',
      points: 80
    },
    {
      id: 'sekreterare',
      title: 'Sekreterare',
      type: 'text',
      phase: 'grunderna',
      icon: FileText,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-styrelsemote',
      title: 'Video: Styrelsemöte',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'quiz-grundroller',
      title: 'Quiz: Grundroller',
      type: 'quiz',
      phase: 'grunderna',
      icon: HelpCircle,
      duration: '5 min quiz',
      points: 200
    },
    {
      id: 'kassör',
      title: 'Kassör',
      type: 'text',
      phase: 'avancerat',
      icon: Award,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'ledamoter',
      title: 'Ledamöter & Suppleanter',
      type: 'text',
      phase: 'avancerat',
      icon: Code,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-ekonomi',
      title: 'Video: Ekonomiansvar',
      type: 'video',
      phase: 'avancerat',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/kGW8Al_cga4',
      points: 150
    },
    {
      id: 'reflektion',
      title: 'Reflektion',
      type: 'reflection',
      phase: 'avancerat',
      icon: Lightbulb,
      duration: '10 min',
      points: 100
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'avancerat',
      icon: Award,
      duration: '10 min quiz',
      points: 300
    }
  ];

  const currentModulePoints = Array.from(completedLessons).reduce((sum, lessonId) => {
    const lesson = courseContent.find(l => l.id === lessonId);
    return sum + (lesson?.points || 0);
  }, 0);

  const progressPercentage = (completedLessons.size / courseContent.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🆕 NY HEADER KOMPONENT */}
      <CourseHeader
        completedLessonsCount={completedLessons.size}
        totalLessonsCount={courseContent.length}
        currentModulePoints={currentModulePoints}
        totalPoints={userData.totalPoints}
        progressPercentage={progressPercentage}
        isSidebarMinimized={isSidebarMinimized}
        isDesktop={isDesktop}
        userName={userData.name}
        userAvatar={userData.avatar}
      />

      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarMinimized={isSidebarMinimized}
        setIsSidebarMinimized={setIsSidebarMinimized}
        isDesktop={isDesktop}
        activeSection={activeSection}
        completedLessons={completedLessons}
        courseContent={courseContent}
        totalPoints={currentModulePoints}
        progressPercentage={progressPercentage}
        scrollToSection={scrollToSection}
        quizScore={activeQuizId ? quizScore : undefined}
        quizMaxScore={activeQuizId ? (activeQuizId === 'quiz-grundroller' ? 300 : 300) : undefined}
        quizCorrect={activeQuizId ? quizCorrect : undefined}
        quizIncorrect={activeQuizId ? quizIncorrect : undefined}
      />

      {/* Navigation Buttons - Global */}
      <NavigationButtons
        currentLessonId={activeSection}
        onNavigate={scrollToSection}
        courseContent={courseContent}
      />

      {/* Main Content */}
<div 
  className="transition-all duration-300 ease-in-out pt-20"
  style={{
    marginLeft: isDesktop ? (isSidebarMinimized ? '80px' : '320px') : '0'
  }}
>
  {/* Intro Section */}
  <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden">
    {/* Bakgrundsbild */}
    <img 
      src="/diskri.jpg" 
      alt="Code background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    
    {/* Overlay */}
    <div className="absolute inset-0 bg-slate-900/75"></div>

    {/* Innehåll */}
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ MODUL 1
        </div>

        <h1 className="text-6xl font-bold text-white mb-6">
          Styrelseroller i Bostadsrättsföreningen
        </h1>
        
        <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
          Lär dig om de olika rollerna i en bostadsrättsförenings styrelse. 
          Förstå ansvarsområden, uppgifter och hur styrelsen arbetar tillsammans.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
          >
            <Target className="w-12 h-12 text-[#FF5421] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">11 Lektioner</h3>
            <p className="text-gray-300">Från ordförande till suppleanter</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
          >
            <Video className="w-12 h-12 text-[#FF5421] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Video-lektioner</h3>
            <p className="text-gray-300">Se hur styrelsemöten fungerar</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
          >
            <Award className="w-12 h-12 text-[#FF5421] mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">1400 Poäng</h3>
            <p className="text-gray-300">Samla poäng och spåra din framsteg</p>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('ai-idag')}
            className="bg-[#FF5421] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#E04A1D] transition-all flex items-center justify-center space-x-2"
          >
            <span>Börja lära dig nu</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>

          <VideoButton
            videoUrl="https://www.youtube.com/embed/NO-Lq3w94Tg?autoplay=1"
            buttonText="Se introduktion"
            videoTitle="Kursintroduktion"
            variant="outline"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('slutprov')}
            className="bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all flex items-center justify-center space-x-2 backdrop-blur-sm border border-white/30"
          >
            <span>Gå direkt till kunskapstest</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

      </motion.div>
    </div>
  </section>

        {/* NY SEKTION: Interactive Image */}
        <section data-section="ai-idag">
          <AiDailyLifeSection 
            isCompleted={completedLessons.has('ai-idag')}
            onComplete={() => handleCompleteLesson('ai-idag')}
          />
        </section>

        {/* Ordförande */}
        <section data-section="ordforande" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Ordförande
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Ordföranden är styrelsens ledare och har ett övergripande ansvar för att 
                  styrelsen arbetar effektivt och i enlighet med lagar, stadgar och föreningens bästa.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Ordförandens huvuduppgifter</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Leda styrelsemöten:</strong> Planera agenda och hålla i diskussioner</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Representera föreningen:</strong> Företräda föreningen utåt och signera dokument</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Koordinera arbetet:</strong> Se till att alla i styrelsen vet sina uppgifter</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Kalla till möten:</strong> Ansvarar för att möten hålls regelbundet</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Exempel på ordförandens ansvar</h3>
                  <div className="bg-black/50 p-4 rounded-lg">
                    <p className="text-gray-300 mb-3">• Förbereda dagordning inför varje styrelsemöte</p>
                    <p className="text-gray-300 mb-3">• Signera protokoll och viktiga avtal</p>
                    <p className="text-gray-300 mb-3">• Hålla kontakt med förvaltare och entreprenörer</p>
                    <p className="text-gray-300 mb-3">• Kalla till extra möten vid behov</p>
                    <p className="text-gray-300">• Förbereda årsstämman tillsammans med styrelsen</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>10 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>100 poäng</span>
                </div>
              </div>

              {!completedLessons.has('ordforande') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('ordforande')}
                  className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +100 poäng
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Quiz Section */}
        <section data-section="quiz-grundroller" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
             

             <h2 className="text-5xl font-bold text-slate-800 mb-6 text-center">
              Testa dina kunskaper
            </h2>

              <p className="text-xl text-slate-600 mb-8 text-center">
                Nu har du lärt dig grunderna. Är du redo att testa dina kunskaper?
              </p>

              {activeQuizId !== 'quiz-grundroller' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grundroller')}
                  className="bg-gradient-to-r from-[#FF5421] to-[#E04A1D] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={htmlGrundrollerQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'quiz-grundroller')}
                  onScoreUpdate={handleQuizScoreUpdate}
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Slutprov Section */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80" 
              alt="Coding setup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#171f32]/90"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#FF5421] to-[#E04A1D] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={htmlSlutprovQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'slutprov')}
                  onScoreUpdate={handleQuizScoreUpdate}
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Övriga sektioner fortsätter här... */}

        
      </div>

      <FloatingFAQ 
        faqs={styrelseFaqs}
        title="Vanliga frågor"
        subtitle="Här är svaren på de vanligaste frågorna om kursen"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default HTMLCoursePage;




