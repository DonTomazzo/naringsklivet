import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from '../../components/CourseElements/CourseHeader.tsx';
import VideoButton from '../../components/CourseElements/VideoButton';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import { aktieFaqs } from '../../data/faq/faq-data';
import NavigationButtons from '../../components/CourseElements/NavigationButtons';
import DragMatchSection from '../../components/CourseElements/DragMatchSection';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play, Shield,
  BookOpen, HelpCircle, Video, AlertTriangle, TrendingDown,
  Sparkles, Lightbulb, Target, PieChart, Lock, Zap, AlertCircle
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { riskhanteringQuiz, riskhanteringSlutprovQuiz } from '../../data/quizzes/riskhantering-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const RiskhanteringModule = () => {
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
      id: 'vad-ar-risk',
      title: 'Vad är risk i aktiehandel?',
      type: 'text',
      phase: 'grunderna',
      icon: Shield,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'olika-risktyper',
      title: 'Olika typer av risk',
      type: 'text',
      phase: 'grunderna',
      icon: AlertTriangle,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'risktolerans',
      title: 'Bedöm din risktolerans',
      type: 'text',
      phase: 'grunderna',
      icon: Target,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'diversifiering',
      title: 'Diversifiering - sprid dina risker',
      type: 'text',
      phase: 'grunderna',
      icon: PieChart,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'video-diversifiering',
      title: 'Video: Bygga en diversifierad portfölj',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'positionsstorlek',
      title: 'Positionsstorlek och kapitalallokering',
      type: 'text',
      phase: 'strategi',
      icon: Target,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'stop-loss',
      title: 'Stop loss - skydda ditt kapital',
      type: 'text',
      phase: 'strategi',
      icon: Shield,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'risk-reward',
      title: 'Risk/Reward-ratio',
      type: 'text',
      phase: 'strategi',
      icon: Target,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'emotionell-risk',
      title: 'Emotionell riskhantering',
      type: 'text',
      phase: 'strategi',
      icon: AlertCircle,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Risktermer',
      type: 'interactive',
      phase: 'strategi',
      icon: Sparkles,
      duration: '10 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Riskhantering grunderna',
      type: 'quiz',
      phase: 'strategi',
      icon: HelpCircle,
      duration: '10 min quiz',
      points: 200
    },
    {
      id: 'portfoljstrategi',
      title: 'Långsiktig portföljstrategi',
      type: 'text',
      phase: 'avancerat',
      icon: Lock,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'rebalansering',
      title: 'Rebalansering av portföljen',
      type: 'text',
      phase: 'avancerat',
      icon: PieChart,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'black-swan',
      title: 'Black swan-händelser och kriser',
      type: 'text',
      phase: 'avancerat',
      icon: AlertTriangle,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'video-riskhantering',
      title: 'Video: Professionell riskhantering',
      type: 'video',
      phase: 'avancerat',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha riskstrategier',
      type: 'interactive',
      phase: 'avancerat',
      icon: Lightbulb,
      duration: '10 min övning',
      points: 150
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'avancerat',
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
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80" 
            alt="Riskhantering"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#F59E0B] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 5
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Riskhantering och diversifiering
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig skydda ditt kapital, hantera risk smart och bygga en portfölj 
                som klarar både upp- och nedgångar på marknaden.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Shield className="w-12 h-12 text-[#F59E0B] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">15 Lektioner</h3>
                  <p className="text-gray-300">Från grunderna till avancerad riskhantering</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#F59E0B] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2 Videor</h3>
                  <p className="text-gray-300">Praktiska strategier för riskhantering</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#F59E0B] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2480 Poäng</h3>
                  <p className="text-gray-300">Bli expert på kapitalskydd</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('vad-ar-risk')}
                  className="bg-[#F59E0B] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#D97706] transition-all flex items-center justify-center space-x-2"
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

        {/* VAD ÄR RISK - MASSIVT INNEHÅLL */}
        <section data-section="vad-ar-risk" className="min-h-screen flex items-center py-20 bg-white">
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
                Vad är risk i aktiehandel?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Risk i aktiehandel är sannolikheten att förlora pengar på dina investeringar. 
                  Varje investering innebär risk, men genom smart riskhantering kan du skydda 
                  ditt kapital och öka dina chanser att lyckas långsiktigt.
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                  <h4 className="font-bold text-red-900 mb-3 flex items-center text-xl">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Warren Buffetts två regler för investering
                  </h4>
                  <div className="space-y-3 text-red-800">
                    <p className="text-lg">
                      <strong>Regel 1:</strong> Förlora aldrig pengar.
                    </p>
                    <p className="text-lg">
                      <strong>Regel 2:</strong> Glöm aldrig regel 1.
                    </p>
                    <p className="text-sm italic mt-3">
                      Detta visar hur viktigt kapitalskydd är. Det tar längre tid att tjäna tillbaka 
                      en förlust än man tror - förlora 50% kräver 100% uppgång för att komma tillbaka!
                    </p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-6 mt-12">
                  Varför är riskhantering så viktigt?
                </h3>

                <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h4 className="text-2xl font-semibold mb-6">Matematiken bakom förluster</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <h5 className="font-semibold text-xl mb-3">Förlust: -10%</h5>
                      <p className="text-sm mb-2">Krävs för att återhämta sig: <strong className="text-2xl">+11.1%</strong></p>
                      <div className="bg-white/20 h-2 rounded-full mt-3">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <h5 className="font-semibold text-xl mb-3">Förlust: -20%</h5>
                      <p className="text-sm mb-2">Krävs för att återhämta sig: <strong className="text-2xl">+25%</strong></p>
                      <div className="bg-white/20 h-2 rounded-full mt-3">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <h5 className="font-semibold text-xl mb-3">Förlust: -50%</h5>
                      <p className="text-sm mb-2">Krävs för att återhämta sig: <strong className="text-2xl">+100%</strong></p>
                      <div className="bg-white/20 h-2 rounded-full mt-3">
                        <div className="bg-orange-400 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <h5 className="font-semibold text-xl mb-3">Förlust: -80%</h5>
                      <p className="text-sm mb-2">Krävs för att återhämta sig: <strong className="text-2xl">+400%</strong></p>
                      <div className="bg-white/20 h-2 rounded-full mt-3">
                        <div className="bg-red-400 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-white/90 text-sm italic">
                    Som du ser blir det exponentiellt svårare att återhämta sig från stora förluster. 
                    Detta är anledningen till att kapitalskydd är viktigare än att jaga stora vinster!
                  </p>
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-6 mt-12">
                  De fyra grundläggande risktyperna
                </h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-blue-900">Marknadsrisk</h4>
                    </div>
                    <p className="text-blue-800 mb-3">
                      Risken att hela marknaden faller, vilket påverkar alla aktier. 
                      Kallas också systematisk risk.
                    </p>
                    <div className="bg-blue-100 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-blue-900 mb-1">Exempel:</p>
                      <p className="text-blue-800">
                        2008 års finanskris, Covid-19 pandemin 2020 - nästan alla aktier föll kraftigt.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm text-blue-700">
                        <strong>Hur hantera:</strong> Diversifiering mellan tillgångsklasser, hedging, 
                        stop loss, ha kontanter som buffert.
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-purple-900">Företagsspecifik risk</h4>
                    </div>
                    <p className="text-purple-800 mb-3">
                      Risken att ett specifikt företag presterar dåligt eller går i konkurs. 
                      Kallas också osystematisk risk.
                    </p>
                    <div className="bg-purple-100 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-purple-900 mb-1">Exempel:</p>
                      <p className="text-purple-800">
                        Nokia missade smartphonetrenden och föll 90%, Wirecard-skandalen där företaget kollapsade helt.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <p className="text-sm text-purple-700">
                        <strong>Hur hantera:</strong> Diversifiera mellan många aktier i olika branscher. 
                        Äg minst 15-20 olika aktier.
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-green-900">Likviditetsrisk</h4>
                    </div>
                    <p className="text-green-800 mb-3">
                      Risken att du inte kan sälja dina aktier när du vill, eller bara till 
                      ett mycket lågt pris.
                    </p>
                    <div className="bg-green-100 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-green-900 mb-1">Exempel:</p>
                      <p className="text-green-800">
                        Småbolagsaktier med låg omsättning kan vara svåra att sälja. Du kanske måste 
                        acceptera 5-10% lägre pris för att hitta en köpare.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-sm text-green-700">
                        <strong>Hur hantera:</strong> Handla främst likvida aktier med hög daglig volym. 
                        Undvik tunt handlade småbolag om du behöver kunna sälja snabbt.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-red-900">Psykologisk risk</h4>
                    </div>
                    <p className="text-red-800 mb-3">
                      Risken att dina egna känslor - rädsla, girighet, panik - leder till 
                      dåliga beslut som kostar dig pengar.
                    </p>
                    <div className="bg-red-100 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-red-900 mb-1">Exempel:</p>
                      <p className="text-red-800">
                        Panikförsälja på botten av en krasch, köpa aktier i toppen av en bubbla 
                        driven av FOMO (fear of missing out), hålla förlustaffärer för länge av stolthet.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <p className="text-sm text-red-700">
                        <strong>Hur hantera:</strong> Ha en tydlig strategi, använd stop loss, 
                        undvik att kolla portföljen för ofta, investera bara pengar du har råd att förlora.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Verktyg för att mäta och hantera risk
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">Volatilitet (standardavvikelse)</h4>
                        <p className="text-slate-600 mb-2">
                          Mäter hur mycket en aktie rör sig upp och ner. Hög volatilitet = högre risk men också 
                          potential för högre avkastning.
                        </p>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p className="text-slate-700">
                            <strong>Exempel:</strong> Teknikaktier som Tesla har ofta 3-5% dagliga rörelser (hög volatilitet), 
                            medan stabila bolag som Coca-Cola kanske rör sig 0.5-1% per dag (låg volatilitet).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">Beta (β)</h4>
                        <p className="text-slate-600 mb-2">
                          Mäter hur mycket en aktie rör sig i förhållande till marknaden. Beta 1.0 = rör sig som marknaden, 
                          Beta 1.5 = rör sig 50% mer än marknaden.
                        </p>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p className="text-slate-700 mb-2">
                            <strong>Beta &lt; 1:</strong> Defensiv aktie, rör sig mindre än marknaden (ex: El-bolag, dagligvaror)
                          </p>
                          <p className="text-slate-700 mb-2">
                            <strong>Beta = 1:</strong> Rör sig som marknaden
                          </p>
                          <p className="text-slate-700">
                            <strong>Beta &gt; 1:</strong> Aggressiv aktie, rör sig mer än marknaden (ex: Tech, småbolag)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">Sharpe Ratio</h4>
                        <p className="text-slate-600 mb-2">
                          Mäter riskjusterad avkastning - hur mycket avkastning får du per enhet risk? 
                          Högre är bättre.
                        </p>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p className="text-slate-700">
                            <strong>Sharpe Ratio &lt; 1:</strong> Dålig riskjusterad avkastning<br/>
                            <strong>Sharpe Ratio 1-2:</strong> Bra riskjusterad avkastning<br/>
                            <strong>Sharpe Ratio &gt; 2:</strong> Utmärkt riskjusterad avkastning
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-[#F59E0B] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg mb-2">Maximum Drawdown (Max DD)</h4>
                        <p className="text-slate-600 mb-2">
                          Den största nedgången från topp till botten som en investering haft. 
                          Visar hur mycket du skulle ha förlorat i värsta fall.
                        </p>
                        <div className="bg-slate-100 rounded-lg p-3 text-sm">
                          <p className="text-slate-700">
                            <strong>Exempel:</strong> Om din portfölj värderades till 100 000 kr och sedan föll till 
                            70 000 kr innan den återhämtade sig, är Max DD -30% (30 000 kr).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-8 my-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    De 5 gyllene reglerna för riskhantering
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-base">
                        <strong className="text-white text-lg">1. Investera aldrig pengar du inte har råd att förlora:</strong>
                        <br/>
                        Använd endast "överskottspengar" för aktier. Hyran, maten och akuta besparingar ska 
                        ALDRIG vara i aktier. Du måste kunna tåla att se portföljen falla 30-50% utan panik.
                      </span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-base">
                        <strong className="text-white text-lg">2. Diversifiera brett:</strong>
                        <br/>
                        Lägg aldrig allt i en eller två aktier. Sprid över minst 15-20 aktier i olika branscher 
                        och helst olika länder. "Lägg inte alla ägg i samma korg."
                      </span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-base">
                        <strong className="text-white text-lg">3. Använd stop loss:</strong>
                        <br/>
                        Bestäm på förhand vid vilken förlust du säljer. Många använder 7-10% stop loss. 
                        Detta skyddar dig från att en investering tappar 50-80% av värdet.
                      </span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-base">
                        <strong className="text-white text-lg">4. Riskera max 1-2% per trade:</strong>
                        <br/>
                        Även om en investering går helt fel ska det inte förstöra din portfölj. 
                        Med 1-2% risk per position kan du ha 10 förluster i rad och bara förlora 10-20%.
                      </span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#F59E0B] mt-1 flex-shrink-0" />
                      <span className="text-base">
                        <strong className="text-white text-lg">5. Tänk långsiktigt:</strong>
                        <br/>
                        Kortsiktig volatilitet är oundviklig. På 1 dag kan aktier röra sig ±5%, på 1 år ±30%, 
                        men över 10 år jämnas allt ut. Panikförsälj inte vid tillfälliga nedgångar.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                  <h4 className="font-semibold text-yellow-900 mb-3 flex items-center text-lg">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Kom ihåg: Risk och avkastning går hand i hand
                  </h4>
                  <p className="text-yellow-800 mb-3">
                    Högre potentiell avkastning kommer ALLTID med högre risk. Det finns ingen "free lunch" 
                    på aktiemarknaden. Om någon lovar 20% årlig avkastning utan risk - spring åt andra hållet!
                  </p>
                  <p className="text-yellow-800 text-sm italic">
                    Din uppgift som investerare är inte att undvika all risk (det är omöjligt), utan att 
                    **ta kalkulerade risker** som du förstår och har råd med.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>15 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>150 poäng</span>
                </div>
              </div>

              {!completedLessons.has('vad-ar-risk') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vad-ar-risk')}
                  className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +150 poäng
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Lägg till fler massiva sektioner här... */}

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
                Visa att du förstår riskhantering
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={riskhanteringQuiz}
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
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80" 
              alt="Risk"
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
                Slutprov - Riskhantering
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du kan skydda ditt kapital som ett proffs
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={riskhanteringSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om riskhantering"
        buttonColor="#F59E0B"
      />
    </div>
  );
};

export default RiskhanteringModule;