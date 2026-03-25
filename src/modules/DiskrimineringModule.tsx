import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizEmbed from '../components/QuizEmbed';
import diskrimineringQuestions from '../data/questionnaires/diskrimineringQuestionnaire';
import { 
  CheckCircle, Clock, Award, ChevronDown, Menu, X,
  BookOpen, FileText, HelpCircle, ChevronRight,
  Shield, AlertTriangle, Users, Scale, Lightbulb, Target
} from 'lucide-react';

// Navigation Buttons Component
interface NavigationButtonsProps {
  currentLessonId: string;
  onNavigate: (lessonId: string) => void;
  courseContent: any[];
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentLessonId, onNavigate, courseContent }) => {
  const currentIndex = courseContent.findIndex(l => l.id === currentLessonId);
  const previousLesson = currentIndex > 0 ? courseContent[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseContent.length - 1 ? courseContent[currentIndex + 1] : null;

  return (
    <div className="mt-8 flex items-center justify-between">
      {previousLesson ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(previousLesson.id)}
          className="flex items-center space-x-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
          <span>Föregående</span>
        </motion.button>
      ) : (
        <div></div>
      )}
      
      {nextLesson && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(nextLesson.id)}
          className="flex items-center space-x-2 px-6 py-3 bg-[#FF5421] text-white rounded-lg hover:bg-[#E04A1D] transition-all"
        >
          <span>Nästa lektion</span>
          <ChevronDown className="w-5 h-5 -rotate-90" />
        </motion.button>
      )}
    </div>
  );
};

const DiskrimineringModule = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set(['intro']));
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState({});
  const [isDesktop, setIsDesktop] = useState(true);
  const [reflection, setReflection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('data-section');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsSidebarOpen(false);
  };

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const handleQuizSubmit = (quizId, questions) => {
    const allAnswered = questions.every(q => quizAnswers[`${quizId}-${q.id}`]);
    
    if (!allAnswered) {
      alert('Vänligen besvara alla frågor!');
      return;
    }

    setShowQuizResults(prev => ({ ...prev, [quizId]: true }));
    setTimeout(() => {
      handleCompleteLesson(quizId);
    }, 1500);
  };

  const openModal = (title, detailedText) => {
  setModalContent({ title, detailedText });
  setIsModalOpen(true);
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
      id: 'vad-ar-diskriminering',
      title: 'Vad är diskriminering?',
      type: 'text',
      phase: 'grunderna',
      icon: Shield,
      duration: '10 min läsning',
      points: 100
    },
    {
  id: 'quiz-grunderna',
  title: 'Quiz: Grunderna',
  type: 'quiz',
  phase: 'grunderna',
  icon: HelpCircle,
  duration: '5 min quiz',
  points: 200
},
    {
      id: 'diskrimineringsgrunder',
      title: 'De 7 diskrimineringsgrunderna',
      type: 'text',
      phase: 'grunderna',
      icon: Users,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'former-av-diskriminering',
      title: 'Former av diskriminering',
      type: 'text',
      phase: 'grunderna',
      icon: Target,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Grunderna',
      type: 'quiz',
      phase: 'grunderna',
      icon: HelpCircle,
      duration: '5 min quiz',
      points: 200
    },
    {
      id: 'styrelsens-ansvar',
      title: 'Styrelsens ansvar',
      type: 'text',
      phase: 'avancerat',
      icon: Scale,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'agera-vid-diskriminering',
      title: 'Agera vid diskriminering',
      type: 'text',
      phase: 'avancerat',
      icon: AlertTriangle,
      duration: '10 min läsning',
      points: 100
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
      phase: 'slutprov',
      icon: Award,
      duration: '15 min',
      points: 300
    }
  ];

  // Quiz questions
  const quizQuestions = {
    'quiz-grunderna': [
      {
        id: 1,
        question: 'Hur många diskrimineringsgrunder finns det i svensk lag?',
        options: ['5 stycken', '7 stycken', '9 stycken', '12 stycken'],
        correct: '7 stycken'
      },
      {
        id: 2,
        question: 'Vad kallas det när en regel som verkar neutral i praktiken missgynnar vissa grupper?',
        options: ['Direkt diskriminering', 'Indirekt diskriminering', 'Trakasserier', 'Repressalier'],
        correct: 'Indirekt diskriminering'
      },
      {
        id: 3,
        question: 'Vilken av följande är INTE en diskrimineringsgrund?',
        options: ['Ålder', 'Socioekonomisk bakgrund', 'Funktionsnedsättning', 'Religion'],
        correct: 'Socioekonomisk bakgrund'
      }
    ],
    'slutprov': [
      {
        id: 1,
        question: 'En bostadsrättsförening säger "Vi vill inte ha barn i styrelsen". Vad är detta?',
        options: ['Tillåtet, barn kan inte sitta i styrelser', 'Åldersdiskriminering', 'Funktionsdiskriminering', 'Inte diskriminering'],
        correct: 'Åldersdiskriminering'
      },
      {
        id: 2,
        question: 'Vad innebär repressalier?',
        options: [
          'Att diskriminera någon baserat på ålder',
          'Att missgynnna någon som anmält diskriminering',
          'Att trakassera någon verbalt',
          'Att neka någon medlemskap'
        ],
        correct: 'Att missgynnna någon som anmält diskriminering'
      },
      {
        id: 3,
        question: 'Vad ska styrelsen göra vid misstänkt diskriminering?',
        options: [
          'Ignorera det om ingen anmäler',
          'Utreda och agera snabbt',
          'Vänta på årsstämman',
          'Kontakta polisen direkt'
        ],
        correct: 'Utreda och agera snabbt'
      },
      {
        id: 4,
        question: 'Vilken myndighet ansvarar för diskrimineringsfrågor i Sverige?',
        options: ['Konsumentverket', 'Diskrimineringsombudsmannen (DO)', 'Arbetsförmedlingen', 'Socialstyrelsen'],
        correct: 'Diskrimineringsombudsmannen (DO)'
      }
    ]
  };

  const totalPoints = Array.from(completedLessons).reduce((sum, lessonId) => {
    const lesson = courseContent.find(l => l.id === lessonId);
    return sum + (lesson?.points || 0);
  }, 0);

  const completedCount = completedLessons.size;
  const totalLessons = courseContent.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 bg-[#FF5421] text-white p-3 rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <motion.aside
            initial={isDesktop ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed right-0 top-0 h-screen bg-[#171f32] text-white shadow-2xl z-40 overflow-y-auto ${
              isSidebarMinimized ? 'w-20' : 'w-80'
            }`}
          >
            <div className="p-6">
              {!isSidebarMinimized && (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-400">DIN PROGRESS</h3>
                      <span className="text-[#FF5421] font-bold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className="bg-gradient-to-r from-[#FF5421] to-orange-500 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      {completedCount} av {totalLessons} lektioner slutförda
                    </p>
                  </div>

                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold text-lg">{totalPoints} poäng</span>
                    </div>
                    <p className="text-xs text-gray-400">Fortsätt lära dig för att samla fler poäng!</p>
                  </div>
                </>
              )}

              <nav className="space-y-2">
                {['intro', 'grunderna', 'avancerat', 'slutprov'].map((phase) => {
                  const phaseLessons = courseContent.filter(l => l.phase === phase);
                  const phaseCompleted = phaseLessons.every(l => completedLessons.has(l.id));
                  
                  return (
                    <div key={phase} className="mb-4">
                      {!isSidebarMinimized && (
                        <div className="flex items-center space-x-2 mb-2 px-2">
                          {phaseCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {phase === 'intro' ? 'Introduktion' : 
                             phase === 'grunderna' ? 'Grunderna' :
                             phase === 'avancerat' ? 'Avancerat' : 'Slutprov'}
                          </h4>
                        </div>
                      )}
                      
                      {phaseLessons.map((lesson) => {
                        const Icon = lesson.icon;
                        const isActive = activeSection === lesson.id;
                        const isCompleted = completedLessons.has(lesson.id);

                        return (
                          <motion.button
                            key={lesson.id}
                            onClick={() => scrollToSection(lesson.id)}
                            whileHover={{ x: 4 }}
                            className={`w-full text-left p-3 rounded-xl transition-all ${
                              isActive
                                ? 'bg-[#FF5421] text-white shadow-lg'
                                : isCompleted
                                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                                : 'text-gray-400 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                              ) : (
                                <Icon className="w-5 h-5 flex-shrink-0" />
                              )}
                              {!isSidebarMinimized && (
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{lesson.title}</p>
                                  <p className="text-xs opacity-70">{lesson.duration}</p>
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isDesktop ? (isSidebarMinimized ? 'mr-20' : 'mr-80') : 'mr-0'} transition-all duration-300`}>
        
        {/* Intro Section */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80" 
              alt="Juridik och rättvisa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171f32]/95 to-[#171f32]/80"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-block bg-[#FF5421]/20 text-[#FF5421] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#FF5421]/30">
                Juridisk utbildning
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
                Diskriminering i <br />
                <span className="text-[#FF5421]">Bostadsrättsföreningar</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Lär dig identifiera, förebygga och hantera diskriminering i din förening. 
                En komplett guide till diskrimineringslagen för styrelseledamöter.
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5 text-[#FF5421]" />
                  <span>2 timmar</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <BookOpen className="w-5 h-5 text-[#FF5421]" />
                  <span>{totalLessons} lektioner</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>1170 poäng totalt</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('vad-ar-diskriminering')}
                className="bg-gradient-to-r from-[#FF5421] to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#E04A1D] hover:to-orange-700 transition-all flex items-center space-x-2"
              >
                <span>Börja lära dig</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              
            </motion.div>
          </div>
        </section>

       
    
  


        {/* Vad är diskriminering */}
<section data-section="vad-ar-diskriminering" className="min-h-screen flex items-center py-20 bg-white">
  <div className="max-w-5xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
    

      <h2 className="text-5xl font-bold text-slate-800 mb-6">
        <Shield className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
        Vad är diskriminering?
      </h2>

      {/* Här börjar det huvudsakliga textinnehållet. 
        All din text och dina informationsrutor ligger nu inuti den första <motion.div>
        och om jag antar att alla block ska ha samma maxbredd och typografi, 
        flyttar vi in allt innehåll i samma prose-wrapper för att förenkla:
      */}
      <div className="prose prose-lg prose-slate max-w-none">
        
        {/* Första stycket */}
        <p className="text-xl text-slate-600 mb-6">
          Diskriminering innebär att någon behandlas sämre än andra i en jämförbar situation 
          på grund av någon av de skyddade diskrimineringsgrunderna. Lagen är till för att 
          skydda människors lika värde och rätt till respekt. Lagen påverkar er eftersom bostadsrättsföreningar
          upplåter bostäder och tillhandahåller gemensamma utrymmen. 
                </p>
        
        {/* Lärandemål */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
          <h4 className="text-orange-900 font-bold mb-2">🎯 Lärandemål</h4>
          <ul className="text-orange-800 space-y-2 mb-0">
            <li>Förstå grundkonceptet diskriminering</li>
            <li>Känna till lagstiftningens syfte</li>
            <li>Förstå vikten av likvärdigt bemötande</li>
          </ul>
        </div>

        {/* START: YouTube Video Inbäddning */}
        <div className="my-8"> 
          {/* Omsluter för responsiv 16:9-skärm */}
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingTop: '56.25%' }}> 
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID?rel=0" // <--- ERSÄTT 'VIDEO_ID' HÄR
              title="YouTube video player - Vad är diskriminering?"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* SLUT: YouTube Video Inbäddning */}

        {/* Andra rubriken och text */}
        <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Varför finns diskrimineringslagen?</h3>
        <p className="text-slate-600">
          Diskrimineringslagen (2008:567) har som syfte att motverka diskriminering och på andra 
          sätt främja lika rättigheter och möjligheter oavsett kön, könsöverskridande identitet eller 
          uttryck, etnisk tillhörighet, religion eller annan trosuppfattning, funktionsnedsättning, 
          sexuell läggning eller ålder.
        </p>

        {/* Viktigt att veta ruta */}
        <div className="bg-blue-50 p-6 rounded-xl my-6">
          <p className="text-blue-900 font-medium mb-2">💡 Viktigt att veta:</p>
          <p className="text-blue-800 mb-0">
            Diskriminering kan vara både avsiktlig och oavsiktlig. Det spelar ingen roll om du 
            inte menade att diskriminera - det som räknas är hur handlingen påverkar den drabbade.
          </p>
        </div>

      </div> {/* SLUT: div className="prose..." */}

      {/* Info/poäng/slutför-knapp, dessa ligger utanför prose-wrapper men inuti motion.div */}
      <div className="flex items-center space-x-3 text-slate-500 mt-6">
        <Clock className="w-5 h-5" />
        <span>10 minuter</span>
        <span className="mx-2">•</span>
        <Award className="w-5 h-5 text-yellow-600" />
        <span>100 poäng</span>
      </div>

      {!completedLessons.has('vad-ar-diskriminering') ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCompleteLesson('vad-ar-diskriminering')}
          className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Markera som slutförd</span>
        </motion.button>
      ) : (
        <div className="mt-8 bg-slate-100 border-2 border-slate-700 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="font-semibold text-green-900">
            Slutförd! +100 poäng
          </span>
        </div>
      )}

      <NavigationButtons 
        currentLessonId="vad-ar-diskriminering" 
        onNavigate={scrollToSection}
        courseContent={courseContent}
      />
    </motion.div> {/* SLUT: motion.div (animation wrapper) */}
  </div> {/* SLUT: div className="max-w-5xl..." */}
</section> {/* SLUT: section data-section="vad-ar-diskriminering" */}

        {/* De 7 diskrimineringsgrunderna */}
        <section data-section="diskrimineringsgrunder" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                <Users className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                De 7 diskrimineringsgrunderna
              </h2>

              <p className="text-xl text-slate-600 mb-8">
                Svensk lag skyddar mot diskriminering på grund av sju specifika grunder. 
                Här går vi igenom var och en av dem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                {[
                  { title: '1. Kön', desc: 'Kvinna, man eller annan könsidentitet' },
                  { title: '2. Könsöverskridande identitet', desc: 'Transpersoner eller personer som uttrycker kön på annat sätt' },
                  { title: '3. Etnisk tillhörighet', desc: 'Nationellt eller etniskt ursprung, hudfärg, eller annat' },
                  { title: '4. Religion eller annan trosuppfattning', desc: 'Religiös tillhörighet eller världsåskådning' },
                  { title: '5. Funktionsnedsättning', desc: 'Fysisk, psykisk eller intellektuell nedsättning' },
                  { title: '6. Sexuell läggning', desc: 'Heterosexuell, homosexuell, bisexuell m.m.' },
                  { title: '7. Ålder', desc: 'Alla åldrar är skyddade' }
                ].map((grund, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-[#FF5421] transition-all"
                  >
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">{grund.title}</h4>
                    <p className="text-sm text-slate-600">{grund.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                <h4 className="text-red-900 font-bold mb-2">⚠️ Viktigt att komma ihåg</h4>
                <p className="text-red-800 mb-0">
                  Alla dessa grunder är lika viktiga och skyddade i lag. Det finns ingen rangordning 
                  mellan dem, och det är lika allvarligt att diskriminera på grund av vilken som helst 
                  av dessa grunder.
                </p>
              </div>

              <div className="flex items-center space-x-3 text-slate-500 mt-6">
                <Clock className="w-5 h-5" />
                <span>15 minuter</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>150 poäng</span>
              </div>

              {!completedLessons.has('diskrimineringsgrunder') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('diskrimineringsgrunder')}
                  className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-slate-100 border-2 border-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +150 poäng
                  </span>
                </div>
              )}

              <NavigationButtons 
                currentLessonId="diskrimineringsgrunder" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Former av diskriminering */}
        <section data-section="former-av-diskriminering" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                <Target className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                Former av diskriminering
              </h2>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 mb-8">
                  Diskriminering kan ta sig olika uttryck. Här lär du dig känna igen de olika formerna.
                </p>

                <div className="space-y-8">
                  {/* Direkt diskriminering */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Direkt diskriminering</h3>
                    <p className="text-slate-600 mb-4">
                      Direkt diskriminering innebär att någon behandlas sämre än någon annan behandlas, 
                      har behandlats eller skulle ha behandlats i en jämförbar situation, om behandlingen 
                      har samband med någon av diskrimineringsgrunderna.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-900 font-medium mb-2">📌 Exempel:</p>
                      <p className="text-blue-800 text-sm mb-0">
                        "Vi vill inte ha kvinnor i styrelsen eftersom de inte är tillräckligt erfarna."
                      </p>
                    </div>
                  </div>

                  {/* Indirekt diskriminering */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Indirekt diskriminering</h3>
                    <p className="text-slate-600 mb-4">
                      Indirekt diskriminering uppstår när en regel eller praxis som verkar neutral 
                      i praktiken missgynnar personer med viss diskrimineringsgrund, och regeln inte 
                      kan motiveras av ett berättigat mål.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-900 font-medium mb-2">📌 Exempel:</p>
                      <p className="text-blue-800 text-sm mb-0">
                        "Alla möten hålls på kvällarna" kan missgynna föräldrar med små barn, 
                        vilket oftare är kvinnor.
                      </p>
                    </div>
                  </div>

                  {/* Trakasserier */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Trakasserier</h3>
                    <p className="text-slate-600 mb-0">
                      Trakasserier är ett uppträdande som kränker någons värdighet och som har samband 
                      med någon av diskrimineringsgrunderna. Det kan vara ord, gester, skämt eller 
                      annat agerande.
                    </p>
                  </div>

                  {/* Sexuella trakasserier */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Sexuella trakasserier</h3>
                    <p className="text-slate-600 mb-0">
                      Ett uppträdande av sexuell natur som kränker någons värdighet. Det kan vara 
                      oönskade komplimanger, beröringar, blickar, kommentarer eller förslag.
                    </p>
                  </div>

                  {/* Repressalier */}
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Repressalier</h3>
                    <p className="text-slate-600 mb-0">
                      Repressalier innebär att någon missgynnas för att hen har påtalat, anmält eller 
                      på annat sätt medverkat i en utredning om diskriminering.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-500 mt-8">
                <Clock className="w-5 h-5" />
                <span>12 minuter</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>120 poäng</span>
              </div>

              {!completedLessons.has('former-av-diskriminering') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('former-av-diskriminering')}
                  className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all flex items-center space-x-2"
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

              <NavigationButtons 
                currentLessonId="former-av-diskriminering" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Quiz Grunderna */}
        <section data-section="quiz-grunderna" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80" 
              alt="Quiz"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#171f32]/90"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#FF5421]/20 text-[#FF5421] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#FF5421]/30">
                Quiz • Grunderna
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                <HelpCircle className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                Testa dina kunskaper
              </h2>

              <p className="text-xl text-gray-200 mb-8">
                Tre snabba frågor för att kontrollera att du förstått grunderna.
              </p>

              <div className="space-y-6">
                {quizQuestions['quiz-grunderna'].map((q, index) => (
                  <div key={q.id} className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6">
                    <p className="font-semibold text-xl mb-4 text-white">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option) => {
                        const answerId = `quiz-grunderna-${q.id}`;
                        const isSelected = quizAnswers[answerId] === option;
                        const isCorrect = option === q.correct;
                        const showResult = showQuizResults['quiz-grunderna'];

                        return (
                          <label
                            key={option}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              showResult && isCorrect
                                ? 'border-green-500 bg-green-500/20'
                                : showResult && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-500/20'
                                : isSelected
                                ? 'border-[#FF5421] bg-[#FF5421]/20'
                                : 'border-white/30 hover:border-[#FF5421]/50 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="radio"
                              name={answerId}
                              value={option}
                              checked={isSelected}
                              onChange={(e) => setQuizAnswers({ ...quizAnswers, [answerId]: e.target.value })}
                              disabled={showResult}
                              className="text-[#FF5421]"
                            />
                            <span className="flex-1 text-gray-200">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!showQuizResults['quiz-grunderna'] ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuizSubmit('quiz-grunderna', quizQuestions['quiz-grunderna'])}
                    className="w-full bg-[#FF5421] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#E04A1D] transition-all flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Lämna in svar</span>
                  </motion.button>
                ) : (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-center text-xl font-bold text-slate-800 mb-2">Bra jobbat!</p>
                    <p className="text-center text-[#FF5421] text-lg font-semibold">+200 poäng</p>
                  </div>
                )}
              </div>

              <NavigationButtons 
                currentLessonId="quiz-grunderna" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Styrelsens ansvar */}
        <section data-section="styrelsens-ansvar" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Avancerat • Lektion 1
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                <Scale className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                Styrelsens ansvar
              </h2>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 mb-8">
                  Som styrelseledamot har du ett särskilt ansvar att förebygga diskriminering och 
                  skapa en inkluderande miljö i föreningen.
                </p>

                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Styrelsens skyldigheter:</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start space-x-3">
                      <span className="text-[#FF5421] font-bold mt-1">•</span>
                      <span>Vara uppmärksam på diskriminering och trakasserier</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#FF5421] font-bold mt-1">•</span>
                      <span>Agera snabbt om diskriminering uppstår</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#FF5421] font-bold mt-1">•</span>
                      <span>Ha policyer och rutiner mot diskriminering</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#FF5421] font-bold mt-1">•</span>
                      <span>Se till att alla medlemmar behandlas lika och rättvist</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-[#FF5421] font-bold mt-1">•</span>
                      <span>Göra skäliga anpassningar för personer med funktionsnedsättning</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                  <h4 className="text-red-900 font-bold mb-2">⚠️ Personligt ansvar</h4>
                  <p className="text-red-800 mb-0">
                    Som styrelseledamot kan du personligen bli ansvarig om du inte agerar 
                    vid kännedom om diskriminering. Detta kan leda till skadeståndsskyldighet.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Förebyggande arbete</h3>
                <p className="text-slate-600">
                  Det bästa sättet att hantera diskriminering är att förebygga den. Detta kan göras genom:
                </p>
                <ul className="text-slate-600 space-y-2">
                  <li>Tydliga policydokument</li>
                  <li>Utbildning av styrelse och medlemmar</li>
                  <li>Öppen kommunikation</li>
                  <li>Regelbunden uppföljning av jämlikhetsfrågor</li>
                </ul>
              </div>

              <div className="flex items-center space-x-3 text-slate-500 mt-8">
                <Clock className="w-5 h-5" />
                <span>10 minuter</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>100 poäng</span>
              </div>

              {!completedLessons.has('styrelsens-ansvar') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('styrelsens-ansvar')}
                  className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
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

              <NavigationButtons 
                currentLessonId="styrelsens-ansvar" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Agera vid diskriminering */}
        <section data-section="agera-vid-diskriminering" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Avancerat • Lektion 2
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                <AlertTriangle className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                Agera vid diskriminering
              </h2>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 mb-8">
                  När diskriminering upptäcks är det viktigt att agera snabbt och strukturerat. 
                  Här är stegen du ska följa.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      step: '1',
                      title: 'Dokumentera',
                      desc: 'Skriv ner vad som hänt med datum, plats och eventuella vittnen'
                    },
                    {
                      step: '2',
                      title: 'Ta upp det',
                      desc: 'Prata med den som diskriminerat (om det känns säkert)'
                    },
                    {
                      step: '3',
                      title: 'Anmäl till styrelsen',
                      desc: 'Styrelsen ska utreda och agera'
                    },
                    {
                      step: '4',
                      title: 'Kontakta DO',
                      desc: 'Diskrimineringsombudsmannen kan hjälpa till'
                    },
                    {
                      step: '5',
                      title: 'Sök stöd',
                      desc: 'Prata med kollegor, fack eller annan organisation'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white border-2 border-slate-200 rounded-xl p-6 flex items-start space-x-4"
                    >
                      <div className="bg-[#FF5421] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                        <p className="text-slate-600 mb-0">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
                  <h4 className="text-green-900 font-bold mb-2">💡 Tips</h4>
                  <p className="text-green-800 mb-0">
                    Även om du inte är den drabbade kan du som vittne eller styrelseledamot 
                    anmäla diskriminering. Du behöver inte vänta på att den drabbade gör det.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Kontaktinformation</h3>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="font-semibold text-slate-800 mb-2">Diskrimineringsombudsmannen (DO)</p>
                  <p className="text-slate-600 mb-1">Telefon: 08-120 20 700</p>
                  <p className="text-slate-600 mb-1">Webbplats: www.do.se</p>
                  <p className="text-slate-600 text-sm mb-0">Här kan du anmäla diskriminering och få råd och stöd.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-500 mt-8">
                <Clock className="w-5 h-5" />
                <span>10 minuter</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>100 poäng</span>
              </div>

              {!completedLessons.has('agera-vid-diskriminering') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('agera-vid-diskriminering')}
                  className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-slate-100 border-2 border-slate-700 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +100 poäng
                  </span>
                </div>
              )}

              <NavigationButtons 
                currentLessonId="agera-vid-diskriminering" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Reflektion */}
        <section data-section="reflektion" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Avancerat • Reflektion
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                <Lightbulb className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                Tid för reflektion
              </h2>

              <p className="text-xl text-slate-600 mb-8">
                Ta dig tid att reflektera över vad du har lärt dig. Hur kan du arbeta för en mer inkluderande förening?
              </p>

              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Reflektionsfrågor:</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">1.</span>
                    <span>Hur kan din förening bli bättre på att förebygga diskriminering?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">2.</span>
                    <span>Vilka konkreta åtgärder kan du vidta som styrelseledamot?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">3.</span>
                    <span>Har du sett situationer i din förening som du nu inser kan vara problematiska?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <label className="block text-slate-800 font-semibold mb-3">
                  Skriv ner dina tankar (frivilligt):
                </label>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Dela dina reflektioner här..."
                  rows={6}
                  className="w-full bg-white text-slate-700 border-2 border-slate-200 rounded-lg p-4 focus:ring-2 focus:ring-[#FF5421] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 text-slate-500 mt-6">
                <Clock className="w-5 h-5" />
                <span>10 minuter</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>100 poäng</span>
              </div>

              {!completedLessons.has('reflektion') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('reflektion')}
                  className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
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

              <NavigationButtons 
                currentLessonId="reflektion" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Slutprov */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80" 
              alt="Slutprov"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#171f32]/90"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#FF5421]/20 text-[#FF5421] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#FF5421]/30">
                Slutprov
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                <Award className="inline-block w-12 h-12 text-yellow-400 mr-3" />
                Visa vad du kan!
              </h2>

              <p className="text-xl text-gray-200 mb-8">
                Nu är det dags att visa allt du har lärt dig om diskriminering i bostadsrättsföreningar. Lycka till!
              </p>

              <div className="space-y-6">
                {quizQuestions['slutprov'].map((q, index) => (
                  <div key={q.id} className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6">
                    <p className="font-semibold text-xl mb-4 text-white">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option) => {
                        const answerId = `slutprov-${q.id}`;
                        const isSelected = quizAnswers[answerId] === option;
                        const isCorrect = option === q.correct;
                        const showResult = showQuizResults['slutprov'];

                        return (
                          <label
                            key={option}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              showResult && isCorrect
                                ? 'border-green-500 bg-green-500/20'
                                : showResult && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-500/20'
                                : isSelected
                                ? 'border-[#FF5421] bg-[#FF5421]/20'
                                : 'border-white/30 hover:border-[#FF5421]/50 hover:bg-white/10'
                            }`}
                          >
                            <input
                              type="radio"
                              name={answerId}
                              value={option}
                              checked={isSelected}
                              onChange={(e) => setQuizAnswers({ ...quizAnswers, [answerId]: e.target.value })}
                              disabled={showResult}
                              className="text-[#FF5421]"
                            />
                            <span className="flex-1 text-gray-200">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!showQuizResults['slutprov'] ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuizSubmit('slutprov', quizQuestions['slutprov'])}
                    className="w-full bg-[#FF5421] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#E04A1D] transition-all flex items-center justify-center space-x-2"
                  >
                    <Award className="w-5 h-5" />
                    <span>Lämna in slutprov</span>
                  </motion.button>
                ) : (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                    <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-slate-800 mb-3">Grattis!</h3>
                    <p className="text-slate-600 text-xl mb-2">Du har slutfört kursen om diskriminering!</p>
                    <p className="text-[#FF5421] text-2xl font-bold">+300 poäng</p>
                    <p className="text-slate-500 mt-4">Totalt: {totalPoints} poäng</p>
                  </div>
                )}
              </div>

              <NavigationButtons 
                currentLessonId="slutprov" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DiskrimineringModule;
