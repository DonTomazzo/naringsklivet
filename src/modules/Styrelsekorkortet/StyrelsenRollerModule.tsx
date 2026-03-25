import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from '../../components/CourseElements/CourseHeader.tsx';
import VideoButton from '../../components/CourseElements/VideoButton';
import FloatingFAQ from '../../components/CourseElements/FloatingFAQ';
import { styrelseFaqs } from '../../data/faq/faq-data';
import NavigationButtons from '../../components/CourseElements/NavigationButtons';
import DragMatchSection from '../../components/CourseElements/DragMatchSection';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play,
  BookOpen, HelpCircle, Video, ChevronRight,
  Sparkles, Lightbulb, Target, Zap, Shield, AlertTriangle,
  Users, FileText, Gavel, Eye, PenTool, UserCheck, Scale,
  TrendingUp, Lock, CheckSquare, AlertCircle, Calendar
} from 'lucide-react';
import GlobalSidebar from '../../components/GlobalSidebar';
import { useCompletion } from '../../contexts/CompletionContext';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { styrelsenRollerQuiz, styrelsenSlutprovQuiz } from '../../data/quizzes/styrelsen-roller-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const StyrelsenRollerModule = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const { completeModule } = useCompletion();
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
  
  // ⭐ Spara till global completion när slutprovet är klart
  if (quizId === 'slutprov') {
    completeModule('styrelseroller', score, maxScore);
  }
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
      id: 'styrelsens-uppdrag',
      title: 'Styrelsens uppdrag och ansvar',
      type: 'text',
      phase: 'grunderna',
      icon: Shield,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'ordforande',
      title: 'Ordföranden - Ledare och representant',
      type: 'text',
      phase: 'grunderna',
      icon: Users,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'vice-ordforande',
      title: 'Vice ordföranden',
      type: 'text',
      phase: 'grunderna',
      icon: UserCheck,
      duration: '8 min läsning',
      points: 80
    },
    {
      id: 'video-ordforande',
      title: 'Video: Ordförandens roll i praktiken',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'sekreterare',
      title: 'Sekreteraren - Dokumentation och minne',
      type: 'text',
      phase: 'roller',
      icon: FileText,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'kassör',
      title: 'Kassören - Ekonomi och redovisning',
      type: 'text',
      phase: 'roller',
      icon: TrendingUp,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'ledamoter',
      title: 'Ordinarie och suppleanter',
      type: 'text',
      phase: 'roller',
      icon: Users,
      duration: '8 min läsning',
      points: 80
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Roller och ansvar',
      type: 'interactive',
      phase: 'roller',
      icon: Sparkles,
      duration: '10 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Styrelsens roller',
      type: 'quiz',
      phase: 'roller',
      icon: HelpCircle,
      duration: '8 min quiz',
      points: 200
    },
    {
      id: 'arbetsfordelning',
      title: 'Arbetsfördelning och delegering',
      type: 'text',
      phase: 'avancerat',
      icon: Target,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'beslutsprocesser',
      title: 'Beslutsprocesser och protokoll',
      type: 'text',
      phase: 'avancerat',
      icon: Gavel,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'firmatecknare',
      title: 'Firmatecknare och behörigheter',
      type: 'text',
      phase: 'avancerat',
      icon: PenTool,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha roller och ansvar',
      type: 'interactive',
      phase: 'avancerat',
      icon: Lightbulb,
      duration: '8 min övning',
      points: 150
    },
    {
      id: 'jav-och-intressekonflikter',
      title: 'Jäv och intressekonflikter',
      type: 'text',
      phase: 'avancerat',
      icon: Scale,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-avancerat',
      title: 'Video: Utmaningar i styrelsearbetet',
      type: 'video',
      phase: 'avancerat',
      icon: Video,
      duration: '10 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      type: 'quiz',
      phase: 'avancerat',
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
  isSidebarMinimized={false}  // Inte relevant längre
  isDesktop={isDesktop}
  userName={userData.name}
  userAvatar={userData.avatar}
/>

      <GlobalSidebar />  {/* ← LÄGG TILL DENNA */} 

      <NavigationButtons
        currentLessonId={activeSection}
        onNavigate={scrollToSection}
        courseContent={courseContent}
      />

      <div 
  className="transition-all duration-300 pt-20"
  style={{ marginLeft: 'var(--sidebar-width, 320px)' }}
>
        {/* Intro Section */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80" 
            alt="Styrelsearbete"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              

              <h1 className="text-6xl font-bold text-white mb-6">
                Styrelsens roller och ansvar
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig om de olika rollerna i styrelsen, från ordförande till suppleant.
                Förstå varje rolls specifika ansvar och hur ni samarbetar effektivt.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Users className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">16 Lektioner</h3>
                  <p className="text-gray-300">Komplett genomgång av alla roller</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Video & Övningar</h3>
                  <p className="text-gray-300">Praktiska exempel och interaktiva övningar</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1850 Poäng</h3>
                  <p className="text-gray-300">Bli expert på styrelsearbete</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('styrelsens-uppdrag')}
                  className="bg-[#FF5421] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#E64A1E] transition-all flex items-center justify-center space-x-2"
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

        {/* Styrelsens uppdrag och ansvar */}
        <section data-section="styrelsens-uppdrag" className="min-h-screen flex items-center py-20 bg-white">
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
                Styrelsens uppdrag och ansvar
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Styrelsen är bostadsrättsföreningens verkställande och förvaltande organ. 
                  Enligt bostadsrättslagen har styrelsen ett övergripande ansvar för föreningens 
                  angelägenheter och ska verka för medlemmarnas bästa.
                </p>

                <div className="bg-gradient-to-br from-[#FF5421] to-[#E64A1E] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">Styrelsens huvuduppgifter</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <Shield className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Förvaltning</h4>
                      <p className="text-sm text-gray-100">Ansvara för föreningens fastighet och ekonomi enligt god förvaltningssed</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <FileText className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Organisation</h4>
                      <p className="text-sm text-gray-100">Se till att bokföring, medelsförvaltning och ekonomiska förhållanden kontrolleras tillfredsställande</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <Gavel className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Beslut</h4>
                      <p className="text-sm text-gray-100">Förbereda och verkställa stämmobeslut samt fatta löpande beslut</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <Users className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Medlemmar</h4>
                      <p className="text-sm text-gray-100">Informera och kommunicera med föreningens medlemmar</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Kollektivt ansvar</h3>
                  <p className="text-slate-600 mb-4">
                    Ett viktigt begrepp inom styrelsearbete är det <strong>kollektiva ansvaret</strong>. 
                    Detta innebär att alla styrelseledamöter tillsammans ansvarar för styrelsens beslut 
                    och åtgärder, även om man inte personligen deltagit i beslutet.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-amber-900 font-semibold mb-1">Viktigt att veta</p>
                        <p className="text-amber-800 text-sm">
                          För att undgå ansvar för ett beslut man inte står bakom måste man antingen 
                          delta i mötet och reservera sig mot beslutet i protokollet, eller anmäla 
                          sitt ställningstagande till styrelsen utan dröjsmål.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Styrelsens juridiska grund</h3>
                  <div className="space-y-3 text-gray-300">
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Bostadsrättslagen (1991:614):</strong> Den grundläggande lagstiftningen</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Föreningens stadgar:</strong> Kompletterar och preciserar lagen</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">Stämmobeslut:</strong> Bindande direktiv från medlemmarna</span>
                    </p>
                    <p className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-1 flex-shrink-0" />
                      <span><strong className="text-white">God förvaltningssed:</strong> Branschpraxis och vedertagna metoder</span>
                    </p>
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

              {!completedLessons.has('styrelsens-uppdrag') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('styrelsens-uppdrag')}
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

        {/* Ordföranden */}
        <section data-section="ordforande" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 2
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Ordföranden - Ledare och representant
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Ordföranden är styrelsens formella ledare och föreningens främsta representant 
                  utåt. Rollen kräver ledarskap, organisation och god kommunikationsförmåga.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-[#FF5421] p-3 rounded-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800">Ledarskapets kärnuppgifter</h3>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Leda och kalla till styrelsemöten</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Sätta dagordning tillsammans med sekreteraren</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Leda diskussioner och fördela ordet</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Se till att beslut fattas och dokumenteras</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-[#FF5421] p-3 rounded-lg">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800">Övergripande ansvar</h3>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Bevaka att beslut verkställs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Samordna styrelsearbetet</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Representera föreningen utåt</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                        <span>Kontakt med externa parter</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 my-8 text-white">
                  <h3 className="text-2xl font-semibold mb-4">Ordförandens representationsrätt</h3>
                  <p className="text-gray-200 mb-4">
                    Ordföranden har enligt bostadsrättslagen en särskild ställning som 
                    <strong className="text-white"> föreningens företrädare</strong>. Detta innebär rätt att:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <CheckSquare className="w-6 h-6 mb-2" />
                      <p className="text-sm">Teckna föreningens firma tillsammans med annan firmatecknare</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <CheckSquare className="w-6 h-6 mb-2" />
                      <p className="text-sm">Representera föreningen i kontakter med myndigheter</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <CheckSquare className="w-6 h-6 mb-2" />
                      <p className="text-sm">Företräda föreningen vid förhandlingar</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <CheckSquare className="w-6 h-6 mb-2" />
                      <p className="text-sm">Svara på medlemmars frågor och klagomål</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                    <Lightbulb className="w-6 h-6" />
                    <span>Tips för en framgångsrik ordförande</span>
                  </h3>
                  <div className="space-y-3 text-blue-800">
                    <p><strong>Förbered dig väl:</strong> Läs igenom handlingar och sätt dig in i ärenden före möten</p>
                    <p><strong>Var neutral:</strong> Lyssna på alla åsikter och låt alla komma till tals</p>
                    <p><strong>Var tydlig:</strong> Sammanfatta diskussioner och formulera beslut klart och koncist</p>
                    <p><strong>Delegera:</strong> Fördela arbetsuppgifter mellan styrelseledamöter</p>
                    <p><strong>Kommunicera:</strong> Håll både styrelse och medlemmar informerade</p>
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

        {/* Vice ordföranden */}
        <section data-section="vice-ordforande" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 3
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Vice ordföranden
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Vice ordföranden är ordförandens ställföreträdare och träder in när ordföranden 
                  inte kan närvara eller är jävig. Rollen innebär att vara beredd att ta över 
                  ledningen vid kort varsel.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Vice ordförandens huvuduppgifter</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#FF5421] p-2 rounded-lg flex-shrink-0">
                        <UserCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Ersätta ordföranden</h4>
                        <p className="text-slate-600">Träda in som mötesordförande när ordinarie ordförande inte kan delta</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#FF5421] p-2 rounded-lg flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Stödja ordföranden</h4>
                        <p className="text-slate-600">Fungera som samtalsp artner och bollplank i styrelsefrågor</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#FF5421] p-2 rounded-lg flex-shrink-0">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">Särskilda ansvarsområden</h4>
                        <p className="text-slate-600">Ofta ansvarig för specifika arbetsområden eller projekt</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-2">Viktigt om jäv</h3>
                      <p className="text-amber-800">
                        Om både ordförande och vice ordförande är jäviga i samma ärende, ska styrelsen 
                        utse en annan ledamot att leda beslutsgången i det specifika ärendet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Vanliga ansvarsområden för vice ordföranden</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Fastighet & Teknik</h4>
                      <p className="text-gray-300 text-sm">Samordna underhållsprojekt och kontakt med fastighetsskötare</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Trygghetsarbete</h4>
                      <p className="text-gray-300 text-sm">Ansvara för säkerhetsfrågor och grannsamverkan</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Miljö & Hållbarhet</h4>
                      <p className="text-gray-300 text-sm">Driva föreningens miljöarbete och grönare initiativ</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Medlemskontakt</h4>
                      <p className="text-gray-300 text-sm">Koordinera kommunikation och medlemsmöten</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>8 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>80 poäng</span>
                </div>
              </div>

              {!completedLessons.has('vice-ordforande') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vice-ordforande')}
                  className="mt-8 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center space-x-2 shadow-lg shadow-amber-500/50"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +80 poäng
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Sekreteraren */}
        <section data-section="sekreterare" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Roller • 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Sekreteraren - Dokumentation och minne
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Sekreteraren är styrelsens minnesbank och ansvarar för all dokumentation. 
                  En välskött protokollföring är avgörande för styrelsens rättssäkerhet och 
                  möjlighet att följa upp beslut.
                </p>

                <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">Sekreterarens kärnuppgifter</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <FileText className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Protokollföring</h4>
                      <p className="text-sm text-gray-100">Föra protokoll från alla styrelsemöten och stämmor enligt god sed</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Calendar className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Kallelser</h4>
                      <p className="text-sm text-gray-100">Tillsammans med ordföranden förbereda och skicka ut kallelser</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Lock className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Arkivering</h4>
                      <p className="text-sm text-gray-100">Förvara protokoll och handlingar säkert och tillgängligt</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <CheckSquare className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Uppföljning</h4>
                      <p className="text-sm text-gray-100">Bevaka att beslutade åtgärder genomförs och följs upp</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Protokollets innehåll</h3>
                  <p className="text-slate-600 mb-4">Ett korrekt protokoll ska alltid innehålla:</p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Formalia</p>
                        <p className="text-slate-600 text-sm">Tid, plats, närvarande, frånvarande, mötesledare</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Beslut</p>
                        <p className="text-slate-600 text-sm">Tydligt formulerade beslut med vem som fattat dem</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Beslutsunderlag</p>
                        <p className="text-slate-600 text-sm">Kort redogörelse för varför beslutet fattades</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Reservationer</p>
                        <p className="text-slate-600 text-sm">Eventuella avvikande meningar som anmälts</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-slate-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Uppföljning</p>
                        <p className="text-slate-600 text-sm">Vem som ska göra vad och när</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                    <Lightbulb className="w-6 h-6" />
                    <span>Tips för effektiv protokollföring</span>
                  </h3>
                  <div className="space-y-3 text-blue-800">
                    <p><strong>Använd mallar:</strong> Ha en standardmall för att säkerställa att inget glöms bort</p>
                    <p><strong>Skriv klart snabbt:</strong> Skicka ut protokollet inom en vecka medan minnet är färskt</p>
                    <p><strong>Var objektiv:</strong> Dokumentera fakta och beslut, inte känslor eller tolkningar</p>
                    <p><strong>Spela in:</strong> Överväg ljudupptagning som stöd (raderas efter protokolljustering)</p>
                    <p><strong>Numrera paragrafer:</strong> Underlätt ar referering och uppföljning</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-2">Juridisk betydelse</h3>
                      <p className="text-amber-800">
                        Protokollet är den juridiska bevisningen för vad som beslutats. Vid tvister 
                        är protokollet det dokument som räknas. Därför är noggrannhet och tydlighet 
                        avgörande. Protokoll ska justeras (godkännas) av ordföranden och en justeringsman.
                      </p>
                    </div>
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

              {!completedLessons.has('sekreterare') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('sekreterare')}
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

        {/* Kassören */}
        <section data-section="kassör" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Roller • 2
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Kassören - Ekonomi och redovisning
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Kassören är ansvarig för föreningens ekonomiska förvaltning och redovisning. 
                  Rollen kräver noggrannhet, ekonomisk kompetens och förmåga att se helheten 
                  i föreningens finansiella situation.
                </p>

                <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">Kassörens huvudansvar</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <TrendingUp className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Löpande bokföring</h4>
                      <p className="text-sm text-gray-100">Säkerställa att all ekonomisk hantering bokförs korrekt och löpande</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <FileText className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Årsredovisning</h4>
                      <p className="text-sm text-gray-100">Upprätta föreningens årsredovisning enligt bokföringslagen</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Eye className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Ekonomisk kontroll</h4>
                      <p className="text-sm text-gray-100">Övervaka betalningar, fakturor och föreningens likviditet</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Target className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Budget och planering</h4>
                      <p className="text-sm text-gray-100">Förbereda budget och ekonomiska beslutsunderlag</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Praktiska arbetsuppgifter</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Månadsrutiner</h4>
                      <ul className="text-slate-600 space-y-1 text-sm">
                        <li>• Kontrollera bankavstämning</li>
                        <li>• Betala fakturor och leverantörer</li>
                        <li>• Skicka påminnelser till medlemmar med förfallna avgifter</li>
                        <li>• Uppdatera kassaflödesrapport</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Kvartalsrutiner</h4>
                      <ul className="text-slate-600 space-y-1 text-sm">
                        <li>• Rapportera ekonomiskt läge till styrelsen</li>
                        <li>• Uppdatera budgetuppföljning</li>
                        <li>• Kontrollera att momsredovisning är korrekt</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Årsrutiner</h4>
                      <ul className="text-slate-600 space-y-1 text-sm">
                        <li>• Upprätta årsredovisning</li>
                        <li>• Förbereda underlag till revisor/lekmannarevisor</li>
                        <li>• Ta fram förslag till ny budget</li>
                        <li>• Bokslutsdispositioner och skatter</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Viktiga ekonomiska nyckeltal</h3>
                  <p className="text-gray-300 mb-4">Kassören bör löpande följa dessa nyckeltal:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Soliditet</h4>
                      <p className="text-gray-300 text-sm">Eget kapital i relation till totala tillgångar - mått på finansiell styrka</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Likviditet</h4>
                      <p className="text-gray-300 text-sm">Föreningens förmåga att betala löpande kostnader</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Skuldkvot</h4>
                      <p className="text-gray-300 text-sm">Lån i förhållande till föreningens värde</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Vakansgrad</h4>
                      <p className="text-gray-300 text-sm">Andel lediga lägenheter och påverkan på ekonomi</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-2">Skatteskyldigheter</h3>
                      <p className="text-amber-800 mb-3">
                        Kassören ansvarar för att föreningen uppfyller sina skatteskyldigheter:
                      </p>
                      <ul className="text-amber-800 space-y-1 text-sm">
                        <li>• Deklarera och betala preliminärskatt</li>
                        <li>• Hantera moms om föreningen är momsregistrerad</li>
                        <li>• Rapportera arbetsgivaravgifter om föreningen har anställda</li>
                        <li>• Lämna kontrolluppgifter för utbetalningar</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                    <Lightbulb className="w-6 h-6" />
                    <span>Tips för en framgångsrik kassör</span>
                  </h3>
                  <div className="space-y-3 text-blue-800">
                    <p><strong>Använd ekonomisystem:</strong> Investera i bra bokföringsprogram anpassat för BRF</p>
                    <p><strong>Dokumentera allt:</strong> Spara alla verifikationer och underlag strukturerat</p>
                    <p><strong>Var proaktiv:</strong> Varna tidigt om ekonomiska problem eller avvikelser</p>
                    <p><strong>Utbilda dig:</strong> Delta i kurser om BRF-ekonomi och bokföring</p>
                    <p><strong>Samarbeta:</strong> Ha täta kontakter med förvaltare och revisor</p>
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

              {!completedLessons.has('kassör') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('kassör')}
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

        {/* Interactive Cards Section */}
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
                Nu har du lärt dig om styrelsens olika roller. Visa vad du kan!
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#FF5421] to-[#E64A1E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={styrelsenRollerQuiz}
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
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" 
              alt="Business success"
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
                Slutprov - Styrelsens roller
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du behärskar alla aspekter av styrelsearbetet
              </p>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#FF5421] to-[#E64A1E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Slutprov</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={styrelsenSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om styrelsens roller"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default StyrelsenRollerModule;
