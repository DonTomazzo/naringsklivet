import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from '../../components/CourseElements/CourseHeader.tsx';
import VideoButton from '../../components/CourseElements/VideoButton';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import { aktieFaqs } from '../../data/faq/faq-data';
import NavigationButtons from '../../components/CourseElements/NavigationButtons';
import DragMatchSection from '../../components/CourseElements/DragMatchSection';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play,
  BookOpen, HelpCircle, Video, ChevronRight,
  Sparkles, Lightbulb, Target, Zap, TrendingUp, PieChart,
  DollarSign, Building, FileText, BarChart3, Calculator, Search
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { fundamentalAnalysQuiz, fundamentalAnalysSlutprovQuiz } from '../../data/quizzes/fundamental-analys-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const FundamentalAnalysModule = () => {
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
    totalPoints: 0,
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
      id: 'vad-ar-fundamental-analys',
      title: 'Vad är fundamental analys?',
      type: 'text',
      phase: 'grunderna',
      icon: Search,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'arsredovisningen',
      title: 'Företagets årsredovisning',
      type: 'text',
      phase: 'grunderna',
      icon: FileText,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'resultatrakning',
      title: 'Resultaträkningen',
      type: 'text',
      phase: 'grunderna',
      icon: TrendingUp,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'balansrakning',
      title: 'Balansräkningen',
      type: 'text',
      phase: 'grunderna',
      icon: PieChart,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'video-arsredovisning',
      title: 'Video: Läsa årsredovisningar',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'kassaflodesanalys',
      title: 'Kassaflödesanalys',
      type: 'text',
      phase: 'analys',
      icon: DollarSign,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'nyckeltal-pe',
      title: 'P/E-tal och värdering',
      type: 'text',
      phase: 'analys',
      icon: Calculator,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'nyckeltal-pb-ps',
      title: 'P/B-tal och P/S-tal',
      type: 'text',
      phase: 'analys',
      icon: BarChart3,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'lonsamhet-marginal',
      title: 'Lönsamhet och vinstmarginal',
      type: 'text',
      phase: 'analys',
      icon: TrendingUp,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Nyckeltal',
      type: 'interactive',
      phase: 'analys',
      icon: Sparkles,
      duration: '10 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Grunderna',
      type: 'quiz',
      phase: 'analys',
      icon: HelpCircle,
      duration: '10 min quiz',
      points: 200
    },
    {
      id: 'skuldsattning-soliditet',
      title: 'Skuldsättning och soliditet',
      type: 'text',
      phase: 'fordjupning',
      icon: Target,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'branschanalys',
      title: 'Branschanalys',
      type: 'text',
      phase: 'fordjupning',
      icon: Building,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'konkurrentanalys',
      title: 'Konkurrentanalys',
      type: 'text',
      phase: 'fordjupning',
      icon: Search,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-vardera-foretag',
      title: 'Video: Värdera ett företag',
      type: 'video',
      phase: 'fordjupning',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha nyckeltal',
      type: 'interactive',
      phase: 'fordjupning',
      icon: Lightbulb,
      duration: '10 min övning',
      points: 150
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'fordjupning',
      icon: Award,
      duration: '20 min quiz',
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" 
            alt="Analys"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#8B5CF6] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 3
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Fundamental analys
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig analysera företag som en professionell investerare. 
                Förstå årsredovisningar, nyckeltal och hur du värderar aktier.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Calculator className="w-12 h-12 text-[#8B5CF6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">15 Lektioner</h3>
                  <p className="text-gray-300">Från nybörjare till analytiker</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#8B5CF6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2 Videolektioner</h3>
                  <p className="text-gray-300">Praktiska exempel och genomgångar</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#8B5CF6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1850 Poäng</h3>
                  <p className="text-gray-300">Bli expert på företagsanalys</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('vad-ar-fundamental-analys')}
                  className="bg-[#8B5CF6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#7C3AED] transition-all flex items-center justify-center space-x-2"
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

        {/* Vad är fundamental analys */}
        <section data-section="vad-ar-fundamental-analys" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Vad är fundamental analys?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Fundamental analys är metoden att analysera ett företags verkliga värde genom 
                  att studera dess finansiella hälsa, affärsmodell, bransch och framtidsutsikter. 
                  Målet är att avgöra om en aktie är undervärderad eller övervärderad.
                </p>

                <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">Fundamental analys i tre steg</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <FileText className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">1. Kvantitativ analys</h4>
                      <p className="text-sm text-gray-100">Analysera siffror - resultaträkning, balansräkning, kassaflöde och nyckeltal</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Building className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">2. Kvalitativ analys</h4>
                      <p className="text-sm text-gray-100">Bedöma affärsmodell, konkurrensfördelar, ledning och branschutsikter</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Calculator className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">3. Värdering</h4>
                      <p className="text-sm text-gray-100">Beräkna företagets verkliga värde och jämför med aktiekursen</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Varför är fundamental analys viktig?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Hitta undervärderade aktier</h4>
                        <p className="text-slate-600 text-sm">Upptäck företag som marknaden har missat och som handlas under sitt verkliga värde</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Undvik värdefällor</h4>
                        <p className="text-slate-600 text-sm">Identifiera företag med problem som ser billiga ut men egentligen är dåliga investeringar</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Långsiktig investering</h4>
                        <p className="text-slate-600 text-sm">Bygga en portfölj baserad på företagens fundamenta istället för kortsiktig spekulation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Förstå vad du äger</h4>
                        <p className="text-slate-600 text-sm">Känna till företagen du investerar i och deras potential för framgång</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6" />
                      <span>Kvantitativa faktorer</span>
                    </h4>
                    <ul className="space-y-2 text-green-800 text-sm">
                      <li>• Intäkter och intäktstillväxt</li>
                      <li>• Vinst och vinstmarginal</li>
                      <li>• Kassaflöde</li>
                      <li>• Skuldsättning</li>
                      <li>• Nyckeltal (P/E, P/B, etc)</li>
                      <li>• Utdelningshistorik</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                      <Building className="w-6 h-6" />
                      <span>Kvalitativa faktorer</span>
                    </h4>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>• Affärsmodell och konkurrensfördelar</li>
                      <li>• Ledningens kvalitet</li>
                      <li>• Varumärke och marknadsposition</li>
                      <li>• Branschutveckling</li>
                      <li>• Regleringar och risker</li>
                      <li>• Innovation och framtidsutsikter</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Warren Buffetts tillvägagångssätt</h3>
                  <p className="text-gray-300 mb-4">
                    En av världens mest framgångsrika investerare, Warren Buffett, använder fundamental analys 
                    och letar efter företag med:
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <p className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">"Economic moat":</strong> Konkurrensfördel som skyddar företaget</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Stark ledning:</strong> Kompetenta och trovärdiga chefer</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Förståelig verksamhet:</strong> Företag han förstår</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#8B5CF6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Attraktivt pris:</strong> Handlas under sitt verkliga värde</span>
                    </p>
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

              {!completedLessons.has('vad-ar-fundamental-analys') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vad-ar-fundamental-analys')}
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

        {/* Interactive Cards */}
        <BestUsesAISection
          isCompleted={completedLessons.has('interactive-cards')}
          onComplete={() => handleCompleteLesson('interactive-cards')}
        />

        {/* Quiz Grunderna */}
        <section data-section="quiz-grunderna" className="min-h-screen flex items-center py-20 bg-gray-50">
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
                Visa att du förstår fundamental analys
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={fundamentalAnalysQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'quiz-grunderna')}
                  onScoreUpdate={handleQuizScoreUpdate}
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* DragMatch Section */}
        <section data-section="drag-match" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <DragMatchSection
              isCompleted={completedLessons.has('drag-match')}
              onComplete={() => handleCompleteLesson('drag-match')}
            />
          </div>
        </section>

        {/* Slutprov Section */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1920&q=80" 
              alt="Analysis"
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
                Slutprov - Fundamental analys
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du kan analysera företag som en professionell investerare
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={fundamentalAnalysSlutprovQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'slutprov')}
                  onScoreUpdate={handleQuizScoreUpdate}
                />
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <FloatingFAQ 
        faqs={aktieFaqs}
        title="Vanliga frågor"
        subtitle="Här är svaren på de vanligaste frågorna om fundamental analys"
        buttonColor="#8B5CF6"
      />
    </div>
  );
};

export default FundamentalAnalysModule;
