import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from '../../components/CourseElements/CourseHeader.tsx';
import VideoButton from '../../components/CourseElements/VideoButton';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import { aktieFaqs } from '../../data/faq/faq-data';
import NavigationButtons from '../../components/CourseElements/NavigationButtons';
import DragMatchSection from '../../components/CourseElements/DragMatchSection';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play, TrendingUp,
  BookOpen, HelpCircle, Video, Zap, Timer,
  Sparkles, Lightbulb, Target, BarChart3, Briefcase, DollarSign, Calendar
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { investeringsstrategierQuiz, investeringsstrategierSlutprovQuiz } from '../../data/quizzes/investeringsstrategier-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const InvesteringsstrategierModule = () => {
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
      id: 'olika-strategier',
      title: 'Översikt: Olika investeringsstrategier',
      type: 'text',
      phase: 'grunderna',
      icon: Target,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'buy-and-hold',
      title: 'Buy and Hold - långsiktig investering',
      type: 'text',
      phase: 'grunderna',
      icon: Calendar,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'vardeinvestering',
      title: 'Värdeinvestering (Value Investing)',
      type: 'text',
      phase: 'grunderna',
      icon: DollarSign,
      duration: '22 min läsning',
      points: 220
    },
    {
      id: 'tillvaxtinvestering',
      title: 'Tillväxtinvestering (Growth Investing)',
      type: 'text',
      phase: 'grunderna',
      icon: TrendingUp,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'video-strategier',
      title: 'Video: Jämföra investeringsstrategier',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'utdelningsinvestering',
      title: 'Utdelningsinvestering (Dividend Investing)',
      type: 'text',
      phase: 'strategi',
      icon: DollarSign,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'momentum-investering',
      title: 'Momentuminvestering',
      type: 'text',
      phase: 'strategi',
      icon: Zap,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'contrarian-investering',
      title: 'Contrarian-investering (motströmsinvestering)',
      type: 'text',
      phase: 'strategi',
      icon: Target,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'indexinvestering',
      title: 'Indexinvestering och passiv förvaltning',
      type: 'text',
      phase: 'strategi',
      icon: BarChart3,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Strategitermer',
      type: 'interactive',
      phase: 'strategi',
      icon: Sparkles,
      duration: '10 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Investeringsstrategier',
      type: 'quiz',
      phase: 'strategi',
      icon: HelpCircle,
      duration: '10 min quiz',
      points: 200
    },
    {
      id: 'daytrading',
      title: 'Daytrading och swingtrading',
      type: 'text',
      phase: 'avancerat',
      icon: Timer,
      duration: '22 min läsning',
      points: 220
    },
    {
      id: 'dollar-cost-averaging',
      title: 'Dollar Cost Averaging (DCA)',
      type: 'text',
      phase: 'avancerat',
      icon: Calendar,
      duration: '18 min läsning',
      points: 180
    },
    {
      id: 'hitta-din-strategi',
      title: 'Hitta DIN investeringsstrategi',
      type: 'text',
      phase: 'avancerat',
      icon: Target,
      duration: '20 min läsning',
      points: 200
    },
    {
      id: 'video-implementering',
      title: 'Video: Implementera din strategi',
      type: 'video',
      phase: 'avancerat',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha strategier',
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
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" 
            alt="Investeringsstrategier"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#10B981] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 6
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Investeringsstrategier
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Upptäck olika sätt att investera - från långsiktig buy-and-hold till aktiv daytrading. 
                Hitta strategin som passar DIG bäst!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Target className="w-12 h-12 text-[#10B981] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">15 Lektioner</h3>
                  <p className="text-gray-300">Från buy-and-hold till daytrading</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#10B981] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2 Videor</h3>
                  <p className="text-gray-300">Praktisk strategiimplementering</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#10B981] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">2830 Poäng</h3>
                  <p className="text-gray-300">Bli strategiexpert</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('olika-strategier')}
                  className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#059669] transition-all flex items-center justify-center space-x-2"
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

        {/* OLIKA STRATEGIER - MASSIVT INNEHÅLL */}
        <section data-section="olika-strategier" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Översikt: Olika investeringsstrategier
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Det finns inte EN rätt strategi för alla. Din investeringsstrategi beror på ditt 
                  tidsperspektiv, risktolerans, kapital, och hur mycket tid du vill lägga på dina 
                  investeringar. Låt oss utforska de viktigaste strategierna!
                </p>

                <div className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">De 3 viktigaste dimensionerna</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <Timer className="w-10 h-10 mb-4" />
                      <h4 className="font-semibold text-xl mb-3">Tidsperspektiv</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Kortsiktigt:</strong> Dagar till veckor (daytrading, swingtrading)</p>
                        <p><strong>Medellångt:</strong> Månader till 2-3 år (momentuminvestering)</p>
                        <p><strong>Långsiktigt:</strong> 5-30+ år (buy-and-hold, värdeinvestering)</p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <Target className="w-10 h-10 mb-4" />
                      <h4 className="font-semibold text-xl mb-3">Aktivitetsnivå</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Passiv:</strong> Köp indexfonder, vänta 30 år</p>
                        <p><strong>Semi-aktiv:</strong> Handla några gånger per år</p>
                        <p><strong>Aktiv:</strong> Daglig handel och analys</p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <BarChart3 className="w-10 h-10 mb-4" />
                      <h4 className="font-semibold text-xl mb-3">Analysfokus</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fundamental:</strong> Företagsvärdering (värdeinvestering)</p>
                        <p><strong>Teknisk:</strong> Diagram och mönster (daytrading)</p>
                        <p><strong>Kvantitativ:</strong> Matematiska modeller</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-800 mb-6 mt-12">
                  De 9 viktigaste investeringsstrategierna
                </h3>

                <div className="space-y-6 my-8">
                  {/* 1. Buy and Hold */}
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-semibold text-blue-900 mb-3">Buy and Hold</h4>
                        <p className="text-blue-800 mb-4">
                          Köp kvalitetsaktier och håll dem i många år, oavsett kortsiktig volatilitet. 
                          Den mest populära strategin för långsiktiga investerare.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-100 rounded-lg p-4">
                            <p className="font-semibold text-blue-900 mb-2">✅ Fördelar:</p>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Låg stress och tidsåtgång</li>
                              <li>• Minimala transaktionskostnader</li>
                              <li>• Drar nytta av ränta-på-ränta effekten</li>
                              <li>• Skattefördelar (ej skatt förrän försäljning)</li>
                            </ul>
                          </div>
                          <div className="bg-blue-100 rounded-lg p-4">
                            <p className="font-semibold text-blue-900 mb-2">❌ Nackdelar:</p>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• Måste tåla stora nedgångar (-30-50%)</li>
                              <li>• Tar lång tid att se resultat</li>
                              <li>• Risk att hålla förlustaffärer för länge</li>
                              <li>• Kräver tålamod och disciplin</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 bg-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900">
                            <strong>Bäst för:</strong> Långsiktiga investerare med 10+ års horisont, 
                            de som inte vill spendera tid på aktiv handel, pensionssparande.
                          </p>
                        </div>
                        <div className="mt-3 bg-blue-100 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Exempel:</strong> Warren Buffett äger Coca-Cola sedan 1988 (35+ år!). 
                            Han har aldrig sålt en aktie trots många nedgångar.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Värdeinvestering */}
                  <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-semibold text-purple-900 mb-3">Värdeinvestering (Value Investing)</h4>
                        <p className="text-purple-800 mb-4">
                          Hitta undervärderade företag som handlas under sitt verkliga värde. 
                          "Köp en dollar för 50 cent" - Benjamin Graham.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-purple-100 rounded-lg p-4">
                            <p className="font-semibold text-purple-900 mb-2">✅ Fördelar:</p>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Stor säkerhetsmarginal (safety margin)</li>
                              <li>• Köper när andra panikförsäljer</li>
                              <li>• Beprövad strategi (Warren Buffett)</li>
                              <li>• Mindre risk - köper "billigt"</li>
                            </ul>
                          </div>
                          <div className="bg-purple-100 rounded-lg p-4">
                            <p className="font-semibold text-purple-900 mb-2">❌ Nackdelar:</p>
                            <ul className="text-sm text-purple-800 space-y-1">
                              <li>• Kräver mycket analys och research</li>
                              <li>• Kan ta år innan värdet upptäcks</li>
                              <li>• "Value traps" - billigt av en anledning</li>
                              <li>• Svårt i stigande marknader</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 bg-purple-200 rounded-lg p-3">
                          <p className="text-sm text-purple-900">
                            <strong>Bäst för:</strong> Tålmodiga investerare som gillar att gräva i årsredovisningar, 
                            de som söker "fynd" på börsen, långsiktig horisont.
                          </p>
                        </div>
                        <div className="mt-3 bg-purple-100 rounded-lg p-3">
                          <p className="text-sm text-purple-800">
                            <strong>Exempel:</strong> Köpa banker efter 2008-krisen när P/E var 5-6 
                            (normalvärde 12-15), eller svenska kvalitetsbolag under Corona-kraschen 2020.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Tillväxtinvestering */}
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-semibold text-green-900 mb-3">Tillväxtinvestering (Growth Investing)</h4>
                        <p className="text-green-800 mb-4">
                          Investera i snabbväxande företag även om de verkar dyra. Fokus på framtida vinster, 
                          inte dagens värdering.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-100 rounded-lg p-4">
                            <p className="font-semibold text-green-900 mb-2">✅ Fördelar:</p>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Enorm uppåtpotential (10x, 100x möjligt)</li>
                              <li>• Rider på tillväxttrenden</li>
                              <li>• Spännande innovativa företag</li>
                              <li>• Kan ge snabb avkastning</li>
                            </ul>
                          </div>
                          <div className="bg-green-100 rounded-lg p-4">
                            <p className="font-semibold text-green-900 mb-2">❌ Nackdelar:</p>
                            <ul className="text-sm text-green-800 space-y-1">
                              <li>• Högre risk - dyra värderingar</li>
                              <li>• Stora fall om tillväxten bromsar in</li>
                              <li>• Hög volatilitet</li>
                              <li>• Svårt att värdera</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 bg-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-900">
                            <strong>Bäst för:</strong> Risktoleranta investerare, yngre personer med lång horisont, 
                            de som förstår tech och innovation.
                          </p>
                        </div>
                        <div className="mt-3 bg-green-100 rounded-lg p-3">
                          <p className="text-sm text-green-800">
                            <strong>Exempel:</strong> Amazon 2001-2010 (P/E över 100 men tillväxte 40% årligen), 
                            Tesla 2015-2020, Nvidia 2016-2024.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fortsätt med fler strategier... */}
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Jämförelsetabell: Strategier
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-200">
                          <th className="p-3 text-left">Strategi</th>
                          <th className="p-3 text-left">Tidsperspektiv</th>
                          <th className="p-3 text-left">Risk</th>
                          <th className="p-3 text-left">Tidsåtgång</th>
                          <th className="p-3 text-left">Nybörjarvänlig?</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 font-semibold">Buy & Hold</td>
                          <td className="p-3">10-30+ år</td>
                          <td className="p-3 text-green-700">Låg-Medel</td>
                          <td className="p-3 text-green-700">Mycket låg</td>
                          <td className="p-3 text-green-700">✅ Ja</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold">Värdeinvestering</td>
                          <td className="p-3">3-10 år</td>
                          <td className="p-3 text-green-700">Låg-Medel</td>
                          <td className="p-3 text-yellow-700">Medel</td>
                          <td className="p-3 text-yellow-700">⚠️ Kräver analys</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">Tillväxtinvestering</td>
                          <td className="p-3">2-10 år</td>
                          <td className="p-3 text-yellow-700">Medel-Hög</td>
                          <td className="p-3 text-yellow-700">Medel</td>
                          <td className="p-3 text-yellow-700">⚠️ Delvis</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold">Utdelningsinvestering</td>
                          <td className="p-3">5-30+ år</td>
                          <td className="p-3 text-green-700">Låg</td>
                          <td className="p-3 text-green-700">Låg</td>
                          <td className="p-3 text-green-700">✅ Ja</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">Indexinvestering</td>
                          <td className="p-3">10-30+ år</td>
                          <td className="p-3 text-green-700">Låg-Medel</td>
                          <td className="p-3 text-green-700">Mycket låg</td>
                          <td className="p-3 text-green-700">✅ Ja, bäst!</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3 font-semibold">Momentuminvestering</td>
                          <td className="p-3">Veckor-Månader</td>
                          <td className="p-3 text-yellow-700">Medel-Hög</td>
                          <td className="p-3 text-red-700">Hög</td>
                          <td className="p-3 text-red-700">❌ Nej</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">Daytrading</td>
                          <td className="p-3">Minuter-Dagar</td>
                          <td className="p-3 text-red-700">Mycket hög</td>
                          <td className="p-3 text-red-700">Heltid</td>
                          <td className="p-3 text-red-700">❌ Absolut nej</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                  <h4 className="font-semibold text-yellow-900 mb-3 flex items-center text-lg">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Viktig insikt: Du behöver inte välja EN strategi
                  </h4>
                  <p className="text-yellow-800 mb-3">
                    Många framgångsrika investerare kombinerar flera strategier! Du kan ha:
                  </p>
                  <ul className="text-yellow-800 space-y-2 ml-6">
                    <li>• 70% i indexfonder (passivt, buy-and-hold)</li>
                    <li>• 20% i utdelningsaktier (kassaflöde)</li>
                    <li>• 10% i tillväxtaktier (hög risk/reward)</li>
                  </ul>
                  <p className="text-yellow-800 text-sm italic mt-3">
                    Din strategi kan också förändras över tid. Många börjar aktivt men blir mer passiva 
                    med åren när kapitalet växer och tid blir dyrare.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>18 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>180 poäng</span>
                </div>
              </div>

              {!completedLessons.has('olika-strategier') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('olika-strategier')}
                  className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +180 poäng
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

        {/* Quiz */}
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
                Visa att du förstår olika investeringsstrategier
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={investeringsstrategierQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'quiz-grunderna')}
                  onScoreUpdate={handleQuizScoreUpdate}
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* DragMatch */}
        <section data-section="drag-match" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <DragMatchSection
              isCompleted={completedLessons.has('drag-match')}
              onComplete={() => handleCompleteLesson('drag-match')}
            />
          </div>
        </section>

        {/* Slutprov */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" 
              alt="Strategy"
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
                Slutprov - Investeringsstrategier
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du kan välja rätt strategi för olika situationer
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={investeringsstrategierSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om investeringsstrategier"
        buttonColor="#10B981"
      />
    </div>
  );
};

export default InvesteringsstrategierModule;