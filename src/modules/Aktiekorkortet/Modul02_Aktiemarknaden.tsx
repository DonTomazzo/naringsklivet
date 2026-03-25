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
  Sparkles, Lightbulb, Target, Zap, TrendingUp, Globe,
  DollarSign, Building, Users, Briefcase, BarChart3, LineChart
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { aktiemarknadenQuiz, aktiemarknadenSlutprovQuiz } from '../../data/quizzes/aktiemarknaden-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const AktiemarknadenModule = () => {
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
      id: 'vad-ar-en-bors',
      title: 'Vad är en börs?',
      type: 'text',
      phase: 'grunderna',
      icon: Building,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'olika-borser',
      title: 'Olika börser i världen',
      type: 'text',
      phase: 'grunderna',
      icon: Globe,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'borsindex',
      title: 'Börsindex och hur de fungerar',
      type: 'text',
      phase: 'grunderna',
      icon: BarChart3,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-borsen',
      title: 'Video: Så fungerar börsen',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '10 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'primar-sekundarmarknad',
      title: 'Primär- och sekundärmarknad',
      type: 'text',
      phase: 'marknaden',
      icon: Target,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'borsintroduktion-ipo',
      title: 'Börsintroduktion (IPO)',
      type: 'text',
      phase: 'marknaden',
      icon: TrendingUp,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'handel-under-borsdagen',
      title: 'Handel under börsdagen',
      type: 'text',
      phase: 'marknaden',
      icon: Clock,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Börstermer',
      type: 'interactive',
      phase: 'marknaden',
      icon: Sparkles,
      duration: '8 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Grunderna',
      type: 'quiz',
      phase: 'marknaden',
      icon: HelpCircle,
      duration: '8 min quiz',
      points: 200
    },
    {
      id: 'kop-saljorder',
      title: 'Köp- och säljorder',
      type: 'text',
      phase: 'handel',
      icon: Briefcase,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'courtage-avgifter',
      title: 'Courtage och avgifter',
      type: 'text',
      phase: 'handel',
      icon: DollarSign,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-handel',
      title: 'Video: Gör din första affär',
      type: 'video',
      phase: 'handel',
      icon: Video,
      duration: '8 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha börstermer',
      type: 'interactive',
      phase: 'handel',
      icon: Lightbulb,
      duration: '8 min övning',
      points: 150
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'handel',
      icon: Award,
      duration: '15 min quiz',
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
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1920&q=80" 
            alt="Börsen"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#3B82F6] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 2
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Aktiemarknaden och börsen
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Förstå hur börsen fungerar, lär dig om olika börser i världen och 
                hur aktier handlas varje dag.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Globe className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">14 Lektioner</h3>
                  <p className="text-gray-300">Från börsens grunder till handel</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2 Videor</h3>
                  <p className="text-gray-300">Se hur börsen fungerar live</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1750 Poäng</h3>
                  <p className="text-gray-300">Bli expert på börsen</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('vad-ar-en-bors')}
                  className="bg-[#3B82F6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#2563EB] transition-all flex items-center justify-center space-x-2"
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

        {/* Vad är en börs */}
        <section data-section="vad-ar-en-bors" className="min-h-screen flex items-center py-20 bg-white">
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
                Vad är en börs?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  En börs är en marknadsplats där köpare och säljare möts för att handla 
                  med värdepapper som aktier och obligationer. Tänk på det som en digital 
                  torghandel där priserna bestäms av utbud och efterfrågan.
                </p>

                <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">Börsens huvudfunktioner</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Building className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Marknadsplats</h4>
                      <p className="text-sm text-gray-100">Samlar köpare och säljare på ett ställe för transparent handel</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <DollarSign className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Prissättning</h4>
                      <p className="text-sm text-gray-100">Kontinuerlig prisupptäckt baserad på utbud och efterfrågan</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Users className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Likviditet</h4>
                      <p className="text-sm text-gray-100">Möjlighet att snabbt köpa eller sälja aktier</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <CheckCircle className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Transparens</h4>
                      <p className="text-sm text-gray-100">All handel är öppen och reglerad för att skydda investerare</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Hur fungerar börsen?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#3B82F6] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Företag listar sina aktier</h4>
                        <p className="text-slate-600 text-sm">Företag gör en börsintroduktion (IPO) och listar sina aktier på börsen</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#3B82F6] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Investerare lägger order</h4>
                        <p className="text-slate-600 text-sm">Köpare lägger köporder och säljare lägger säljorder via sina mäklare</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#3B82F6] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Order matchas</h4>
                        <p className="text-slate-600 text-sm">Börsens system matchar köp- och säljorder automatiskt</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#3B82F6] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Handel genomförs</h4>
                        <p className="text-slate-600 text-sm">När en köpare och säljare är överens om pris sker handeln direkt</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#3B82F6] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Avveckling</h4>
                        <p className="text-slate-600 text-sm">Efter 2 bankdagar (T+2) överförs aktierna och pengarna mellan parterna</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Varför är börsen viktig?</h3>
                  <div className="space-y-3 text-gray-300">
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">För företag:</strong> Möjlighet att få in kapital för expansion och tillväxt</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">För investerare:</strong> Möjlighet att äga delar av företag och tjäna pengar på deras framgång</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">För ekonomin:</strong> Effektiv kapitallokering som driver ekonomisk tillväxt</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">För samhället:</strong> Skapar arbetstillfällen och möjliggör innovation</span>
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

              {!completedLessons.has('vad-ar-en-bors') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vad-ar-en-bors')}
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
                Visa att du förstår hur börsen fungerar
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={aktiemarknadenQuiz}
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
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80" 
              alt="Stock exchange"
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
                Slutprov - Aktiemarknaden
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du behärskar hur börsen fungerar
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={aktiemarknadenSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om börsen"
        buttonColor="#3B82F6"
      />
    </div>
  );
};

export default AktiemarknadenModule;
