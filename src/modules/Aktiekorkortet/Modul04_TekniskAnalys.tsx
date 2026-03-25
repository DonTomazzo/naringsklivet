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
  BookOpen, HelpCircle, Video, TrendingUp, TrendingDown,
  Sparkles, Lightbulb, Target, BarChart3, Activity, Zap, LineChart
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { tekniskAnalysQuiz, tekniskAnalysSlutprovQuiz } from '../../data/quizzes/teknisk-analys-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const TekniskAnalysModule = () => {
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
      id: 'vad-ar-teknisk-analys',
      title: 'Vad är teknisk analys?',
      type: 'text',
      phase: 'grunderna',
      icon: LineChart,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'diagram-typer',
      title: 'Olika typer av diagram',
      type: 'text',
      phase: 'grunderna',
      icon: BarChart3,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'ljusstakar',
      title: 'Ljusstakediagram (Candlesticks)',
      type: 'text',
      phase: 'grunderna',
      icon: Activity,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'trender',
      title: 'Identifiera trender',
      type: 'text',
      phase: 'grunderna',
      icon: TrendingUp,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'video-diagram',
      title: 'Video: Läsa diagram som ett proffs',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'stod-motstand',
      title: 'Stöd och motstånd',
      type: 'text',
      phase: 'analys',
      icon: Target,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'trendlinjer',
      title: 'Trendlinjer och kanaler',
      type: 'text',
      phase: 'analys',
      icon: LineChart,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'formationer',
      title: 'Klassiska diagrammönster',
      type: 'text',
      phase: 'analys',
      icon: Activity,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'glidande-medelvarden',
      title: 'Glidande medelvärden (MA)',
      type: 'text',
      phase: 'analys',
      icon: TrendingUp,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Tekniska termer',
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
      id: 'rsi',
      title: 'RSI - Relative Strength Index',
      type: 'text',
      phase: 'indikatorer',
      icon: BarChart3,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'macd',
      title: 'MACD - Moving Average Convergence Divergence',
      type: 'text',
      phase: 'indikatorer',
      icon: Activity,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'volym',
      title: 'Volymanalys',
      type: 'text',
      phase: 'indikatorer',
      icon: BarChart3,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-indikatorer',
      title: 'Video: Använda tekniska indikatorer',
      type: 'video',
      phase: 'indikatorer',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha mönster',
      type: 'interactive',
      phase: 'indikatorer',
      icon: Lightbulb,
      duration: '10 min övning',
      points: 150
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'indikatorer',
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
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&q=80" 
            alt="Teknisk analys"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#EF4444] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 4
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Teknisk analys
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig läsa diagram, identifiera trender och använda tekniska indikatorer 
                för att tajma dina köp och försäljningar.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <LineChart className="w-12 h-12 text-[#EF4444] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">14 Lektioner</h3>
                  <p className="text-gray-300">Från diagram till avancerade indikatorer</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#EF4444] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2 Videor</h3>
                  <p className="text-gray-300">Praktiska genomgångar av diagram</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#EF4444] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1880 Poäng</h3>
                  <p className="text-gray-300">Bli teknisk analytiker</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('vad-ar-teknisk-analys')}
                  className="bg-[#EF4444] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#DC2626] transition-all flex items-center justify-center space-x-2"
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

        {/* Vad är teknisk analys - MED MYCKET INNEHÅLL */}
        <section data-section="vad-ar-teknisk-analys" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Vad är teknisk analys?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Teknisk analys är metoden att förutspå framtida prisrörelser genom att studera 
                  historiska prisdiagram och volymmönster. Till skillnad från fundamental analys 
                  som fokuserar på företagets värde, fokuserar teknisk analys på **prisrörelser** 
                  och **psykologin** bakom dem.
                </p>

                <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">De tre grundprinciperna inom teknisk analys</h3>
                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl mb-2">Marknaden diskonterar allt</h4>
                          <p className="text-sm text-gray-100">
                            Priset på en aktie reflekterar redan all tillgänglig information - både fundamental, 
                            ekonomisk och psykologisk. När nyheter kommer ut har marknaden ofta redan reagerat.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl mb-2">Prisrörelser följer trender</h4>
                          <p className="text-sm text-gray-100">
                            Priser rör sig oftast i trender - uppåtgående, nedåtgående eller sidledes. 
                            En trend tenderar att fortsätta tills den bryts. "The trend is your friend" är 
                            ett klassiskt uttryck inom teknisk analys.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl mb-2">Historien upprepar sig</h4>
                          <p className="text-sm text-gray-100">
                            Människors psykologi förändras inte. Samma mönster av girighet, rädsla och panik 
                            upprepas om och om igen, vilket skapar igenkännbara mönster i diagrammen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-6 mt-12">
                  Teknisk analys vs Fundamental analys
                </h3>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                      <LineChart className="w-6 h-6" />
                      <span>Teknisk analys</span>
                    </h4>
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Fokus:</strong> Prisrörelser och diagram</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Tidsperspektiv:</strong> Kortsiktigt till medellångt (dagar till månader)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Data:</strong> Historiska priser, volymer, indikatorer</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Mål:</strong> Tajma in- och utköp perfekt</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Bäst för:</strong> Daytraders, swingtraders, aktiva investerare</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center space-x-2">
                      <BarChart3 className="w-6 h-6" />
                      <span>Fundamental analys</span>
                    </h4>
                    <ul className="space-y-3 text-green-800">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>Fokus:</strong> Företagets värde och finansiella hälsa</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>Tidsperspektiv:</strong> Långsiktigt (år till decennier)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>Data:</strong> Årsredovisningar, nyckeltal, branschanalys</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>Mål:</strong> Hitta undervärderade företag</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span><strong>Bäst för:</strong> Buy-and-hold investerare, värdeinvesterare</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    Kan man kombinera teknisk och fundamental analys?
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    <strong>Absolut!</strong> Många framgångsrika investerare använder båda metoderna. 
                    En vanlig strategi är:
                  </p>
                  <div className="bg-white rounded-lg p-5 space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                      <p className="text-slate-700">
                        <strong>Fundamental analys först:</strong> Hitta bra företag som är undervärderade
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                      <p className="text-slate-700">
                        <strong>Teknisk analys sedan:</strong> Vänta på rätt tajming för att köpa
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                      <p className="text-slate-700">
                        <strong>Exempel:</strong> Du hittar ett undervärderat företag med P/E 8 (fundamental). 
                        Du väntar tills aktien brutit upp genom ett motstånd på 150 kr (teknisk) innan du köper.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Vanliga tekniska analysverktyg
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-gray-300">
                      <h4 className="text-white font-semibold mb-2">Diagramtyper:</h4>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>Linjediagram:</strong> Visar stängningskurser</span>
                      </p>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>Stapeldiagram:</strong> Visar öppning, stängning, högsta och lägsta</span>
                      </p>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>Ljusstakediagram:</strong> Mest populära, visar sentiment</span>
                      </p>
                    </div>
                    <div className="space-y-2 text-gray-300">
                      <h4 className="text-white font-semibold mb-2">Tekniska indikatorer:</h4>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>Glidande medelvärden (MA):</strong> Visar trender</span>
                      </p>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>RSI:</strong> Mäter överköpt/översålt</span>
                      </p>
                      <p className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span><strong>MACD:</strong> Momentum-indikator</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Viktigt att komma ihåg
                  </h4>
                  <ul className="space-y-2 text-yellow-800 text-sm">
                    <li>• Teknisk analys är inte 100% exakt - det är sannolikhet, inte säkerhet</li>
                    <li>• Fungerar bäst på likvida aktier med hög omsättning</li>
                    <li>• Kräver disciplin och att följa sin strategi</li>
                    <li>• Emotioner är din värsta fiende - håll dig till planen</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>12 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>120 poäng</span>
                </div>
              </div>

              {!completedLessons.has('vad-ar-teknisk-analys') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vad-ar-teknisk-analys')}
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

        {/* Lägg till fler sektioner här med samma detaljnivå... */}

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
                Visa att du förstår teknisk analys
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={tekniskAnalysQuiz}
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
              alt="Charts"
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
                Slutprov - Teknisk analys
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du kan läsa diagram som ett proffs
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={tekniskAnalysSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om teknisk analys"
        buttonColor="#EF4444"
      />
    </div>
  );
};

export default TekniskAnalysModule;
