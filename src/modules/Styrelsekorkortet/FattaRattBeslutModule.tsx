import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from '../../components/CourseElements/CourseHeader.tsx';
import VideoButton from '../../components/CourseElements/VideoButton';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import { styrelseFaqs } from '../../data/faq/faq-data';
import NavigationButtons from '../../components/CourseElements/NavigationButtons';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play,
  BookOpen, HelpCircle, Video, ChevronRight,
  Sparkles, Lightbulb, Target, Zap, Brain, GitBranch, CheckSquare
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { htmlGrundrollerQuiz, htmlSlutprovQuiz } from '../../data/quizzes/html-grundroller-quiz';

const FattaRattBeslutModule = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['intro']));
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCorrect, setQuizCorrect] = useState<number>(0);
  const [quizIncorrect, setQuizIncorrect] = useState<number>(0);

  const [userData] = useState({
    name: 'Anna Svensson',
    avatar: '',
    totalPoints: 2450,
  });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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
      id: 'beslutsprocessen',
      title: 'Beslutsprocessen steg-för-steg',
      type: 'text',
      phase: 'grunderna',
      icon: GitBranch,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'riskanalys',
      title: 'Riskanalys och konsekvenser',
      type: 'text',
      phase: 'grunderna',
      icon: Target,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'beslutsunderlag',
      title: 'Beslutsunderlag och dokumentation',
      type: 'text',
      phase: 'grunderna',
      icon: CheckSquare,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-beslut',
      title: 'Video: Beslutsfattande',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '10 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'gruppbeslut',
      title: 'Gruppbeslut vs individuella beslut',
      type: 'text',
      phase: 'avancerat',
      icon: Brain,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'beslutsverktyg',
      title: 'Beslutsverktyg och metoder',
      type: 'text',
      phase: 'avancerat',
      icon: Sparkles,
      duration: '10 min läsning',
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
        quizMaxScore={activeQuizId ? 300 : undefined}
        quizCorrect={activeQuizId ? quizCorrect : undefined}
        quizIncorrect={activeQuizId ? quizIncorrect : undefined}
      />

      <NavigationButtons
        currentLessonId={activeSection}
        onNavigate={scrollToSection}
        courseContent={courseContent}
      />

      <div 
        className="transition-all duration-300 ease-in-out pt-20"
        style={{
          marginLeft: isDesktop ? (isSidebarMinimized ? '80px' : '320px') : '0'
        }}
      >
        {/* Intro Section */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" 
            alt="Beslut"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#F97316] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 10
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Fatta rätt beslut
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig strukturerad beslutsfattande och beslutsunderlag.
                Metoder och verktyg för att fatta välgrundade beslut i styrelsearbetet.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Brain className="w-12 h-12 text-[#F97316] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">7 Lektioner</h3>
                  <p className="text-gray-300">Från process till verktyg</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#F97316] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Video-lektioner</h3>
                  <p className="text-gray-300">Praktiska exempel</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#F97316] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">970 Poäng</h3>
                  <p className="text-gray-300">Samla poäng genom kursen</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('beslutsprocessen')}
                  className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#EA580C] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Börja lära dig nu</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.button>

                <VideoButton
                  videoUrl="https://www.youtube.com/embed/qz0aGYrrlhU?autoplay=1"
                  buttonText="Se introduktion"
                  videoTitle="Kursintroduktion"
                  variant="outline"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Beslutsprocessen */}
        <section data-section="beslutsprocessen" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Beslutsprocessen steg-för-steg
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  En strukturerad beslutsprocess hjälper styrelsen att fatta välgrundade beslut 
                  och minimera risken för felinvesteringar eller dåliga beslut.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">De 7 stegen i beslutsprocessen</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">1. Identifiera problemet:</strong> Vad är det egentliga problemet?</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">2. Samla information:</strong> Hämta relevant data och fakta</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">3. Identifiera alternativ:</strong> Vilka lösningar finns?</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">4. Analysera konsekvenser:</strong> För- och nackdelar med varje alternativ</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">5. Välj lösning:</strong> Fatta beslutet baserat på analysen</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">6. Implementera:</strong> Verkställ beslutet</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">7. Utvärdera:</strong> Följ upp och lär av resultatet</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Tips för bättre beslut</h3>
                  <div className="bg-black/50 p-4 rounded-lg">
                    <p className="text-gray-300 mb-3">• Ta dig tid - brådska leder ofta till dåliga beslut</p>
                    <p className="text-gray-300 mb-3">• Involvera rätt personer med relevant kompetens</p>
                    <p className="text-gray-300 mb-3">• Utmana antaganden och sök alternativa perspektiv</p>
                    <p className="text-gray-300">• Dokumentera processen för framtida referens</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>12 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>120 poäng</span>
                </div>
              </div>

              {!completedLessons.has('beslutsprocessen') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('beslutsprocessen')}
                  className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +120 poäng
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Slutprov Section */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" 
              alt="Decision making"
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
              <h2 className="text-5xl font-bold text-white mb-6 text-center">
                Slutprov - Fatta rätt beslut
              </h2>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
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
      </div>

      <FloatingFAQ 
        faqs={styrelseFaqs}
        title="Vanliga frågor"
        subtitle="Här är svaren på de vanligaste frågorna om kursen"
        buttonColor="#F97316"
      />
    </div>
  );
};

export default FattaRattBeslutModule;