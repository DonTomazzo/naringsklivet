import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play, Menu, X,
  BookOpen, FileText, HelpCircle, Video, ChevronRight, Code,
  Sparkles, Lightbulb, Target, Zap
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



const HTMLCoursePage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set(['intro']));
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState({});
  const [isDesktop, setIsDesktop] = useState(true);
  const [reflection, setReflection] = useState('');

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
      const offset = 100;
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

  const quizQuestions = {
    'quiz-grundroller': [
      {
        id: 'q1',
        question: 'Vem leder styrelsens möten?',
        options: ['Ordföranden', 'Vice ordföranden', 'Sekreteraren', 'Kassören'],
        correct: 'Ordföranden'
      },
      {
        id: 'q2',
        question: 'Vem ansvarar för mötesprotokoll?',
        options: ['Ordföranden', 'Sekreteraren', 'Kassören', 'Ledamot'],
        correct: 'Sekreteraren'
      },
      {
        id: 'q3',
        question: 'Vad gör vice ordföranden?',
        options: [
          'Ersätter ordföranden vid frånvaro',
          'Sköter ekonomin',
          'Skriver protokoll',
          'Kallar till möten'
        ],
        correct: 'Ersätter ordföranden vid frånvaro'
      }
    ],
    'slutprov': [
      {
        id: 'q1',
        question: 'Vem ansvarar för föreningens ekonomi?',
        options: [
          'Kassören',
          'Ordföranden',
          'Sekreteraren',
          'Vice ordföranden'
        ],
        correct: 'Kassören'
      },
      {
        id: 'q2',
        question: 'Vad är en suppleants roll?',
        options: [
          'Ersätter ledamot vid behov',
          'Leder möten',
          'Sköter ekonomin',
          'Skriver protokoll'
        ],
        correct: 'Ersätter ledamot vid behov'
      },
      {
        id: 'q3',
        question: 'Hur många ledamöter måste delta för beslut?',
        options: [
          'Minst hälften (beslutförhet)',
          'Alla måste vara där',
          'Endast ordföranden',
          'Minst tre stycken'
        ],
        correct: 'Minst hälften (beslutförhet)'
      }
    ]
  };

  const totalPoints = Array.from(completedLessons).reduce((sum, lessonId) => {
    const lesson = courseContent.find(l => l.id === lessonId);
    return sum + (lesson?.points || 0);
  }, 0);

  const progressPercentage = (completedLessons.size / courseContent.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
        <div 
          className="transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isDesktop ? (isSidebarMinimized ? '80px' : '320px') : '0'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-slate-800">
                  Styrelse<span className="text-[#FF5421]">körkortet</span>
                </div>
              </div>

              {/* Progress Info (desktop) */}
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-slate-700">
                    {completedLessons.size}/{courseContent.length} slutförda
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-slate-700">{totalPoints} poäng</span>
                </div>
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="bg-gradient-to-r from-[#FF5421] to-[#E04A1D] h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ 
          width: isDesktop ? (isSidebarMinimized ? 80 : 320) : 320,
          x: isDesktop ? 0 : (isSidebarOpen ? 0 : -320)
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{ backgroundColor: '#171f32' }}
        className="fixed left-0 top-0 h-screen text-white z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Logo/Title med minimize knapp */}
          <div className="flex items-center justify-between mb-8">
            {!isSidebarMinimized && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Styrelseroller</h2>
                <p className="text-sm text-slate-400">Bostadsrättsförening</p>
              </div>
            )}
            
            {/* Minimize/Maximize button - dold på mobil */}
            <button
              onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
              className="hidden lg:block p-2 rounded-lg transition-colors ml-auto"
              style={{ 
                ':hover': { backgroundColor: '#1f2937' }
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label={isSidebarMinimized ? "Maximera sidebar" : "Minimera sidebar"}
            >
              {isSidebarMinimized ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white rotate-90" />
              )}
            </button>
          </div>

          {!isSidebarMinimized && (
            <>
              {/* Progress */}
              <div className="mb-8 rounded-lg p-4" style={{ backgroundColor: '#1a2332' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Framsteg</span>
                  <span className="text-sm text-slate-400">{completedLessons.size}/{courseContent.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-slate-300">{totalPoints} poäng</span>
                </div>
              </div>
            </>
          )}

          {/* Navigation - samma som tidigare */}
          <nav className="space-y-6">
            {/* Introduktion */}
            <div>
              {!isSidebarMinimized && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Introduktion
                </h3>
              )}
              {courseContent.filter(l => l.phase === 'intro').map(lesson => {
                const Icon = lesson.icon;
                const isActive = activeSection === lesson.id;
                const isCompleted = completedLessons.has(lesson.id);

                return (
                  <motion.button
                    key={lesson.id}
                    onClick={() => scrollToSection(lesson.id)}
                    whileHover={{ x: isSidebarMinimized ? 0 : 5 }}
                    style={isActive ? { backgroundColor: '#FF5421' } : {}}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center group ${
                      isSidebarMinimized ? 'justify-center' : 'justify-between'
                    } ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    title={isSidebarMinimized ? lesson.title : ''}
                  >
                    {isSidebarMinimized ? (
                      <div className="relative">
                        <Icon className="w-5 h-5" />
                        {isCompleted && (
                          <CheckCircle className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Grunderna */}
            <div>
              {!isSidebarMinimized && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Grunderna
                </h3>
              )}
              <ul className="space-y-1">
                {courseContent.filter(l => l.phase === 'grunderna').map(lesson => {
                  const Icon = lesson.icon;
                  const isActive = activeSection === lesson.id;
                  const isCompleted = completedLessons.has(lesson.id);

                  return (
                    <motion.button
                      key={lesson.id}
                      onClick={() => scrollToSection(lesson.id)}
                      whileHover={{ x: isSidebarMinimized ? 0 : 5 }}
                      style={isActive ? { backgroundColor: '#FF5421' } : {}}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center group ${
                        isSidebarMinimized ? 'justify-center' : 'justify-between'
                      } ${
                        isActive
                          ? 'bg-[#FF5421] text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      title={isSidebarMinimized ? lesson.title : ''}
                    >
                      {isSidebarMinimized ? (
                        <div className="relative">
                          <Icon className="w-5 h-5" />
                          {isCompleted && (
                            <CheckCircle className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </ul>
            </div>

            {/* Avancerat */}
            <div>
              {!isSidebarMinimized && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                  Avancerat
                </h3>
              )}
              <ul className="space-y-1">
                {courseContent.filter(l => l.phase === 'avancerat').map(lesson => {
                  const Icon = lesson.icon;
                  const isActive = activeSection === lesson.id;
                  const isCompleted = completedLessons.has(lesson.id);

                  return (
                    <motion.button
                      key={lesson.id}
                      onClick={() => scrollToSection(lesson.id)}
                      whileHover={{ x: isSidebarMinimized ? 0 : 5 }}
                      style={isActive ? { backgroundColor: '#FF5421' } : {}}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center group ${
                        isSidebarMinimized ? 'justify-center' : 'justify-between'
                      } ${
                        isActive
                          ? 'bg-[#FF5421] text-white'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      title={isSidebarMinimized ? lesson.title : ''}
                    >
                      {isSidebarMinimized ? (
                        <div className="relative">
                          <Icon className="w-5 h-5" />
                          {isCompleted && (
                            <CheckCircle className="w-3 h-3 text-green-400 absolute -top-1 -right-1" />
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {isActive && <ChevronRight className="w-4 h-4" />}
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-30 lg:hidden text-white p-3 rounded-lg shadow-lg"
        style={{ backgroundColor: '#171f32' }}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Main Content */}
      <div 
        className="transition-all duration-300 ease-in-out pt-20"
        style={{
          marginLeft: isDesktop ? (isSidebarMinimized ? '80px' : '320px') : '0'
        }}
      >
        {/* Intro Section med blå överlagd bild */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden">
          {/* Background image med blå overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/diskri.jpg" 
              alt="Code background"
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
              <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ Gratis utbildning
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('ordforande')}
                className="bg-[#FF5421] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#E04A1D] transition-all flex items-center space-x-2"
              >
                <span>Börja lära dig nu</span>
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Ordförande - ljus bakgrund */}
        <section data-section="ordforande" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • Lektion 1
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
                currentLessonId="ordforande" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Video Section 1 med blå overlay */}
        <section data-section="video-styrelsemote" className="min-h-screen flex items-center relative overflow-hidden py-20">
          {/* Background med blå overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80" 
              alt="Laptop code"
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
              <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-400/30">
                Grunderna • Video
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                HTML Tutorial för Nybörjare
              </h2>

              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/qz0aGYrrlhU"
                  title="HTML Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <p className="text-xl text-gray-200 mb-6">
                Följ med i denna grundläggande HTML-tutorial som täcker de viktigaste koncepten.
              </p>

              <div className="flex items-center space-x-3 text-gray-300 mb-6">
                <Video className="w-5 h-5" />
                <span>15 minuter video</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-500" />
                <span>150 poäng</span>
              </div>

              {!completedLessons.has('video-styrelsemote') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('video-styrelsemote')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +150 poäng
                  </span>
                </div>
              )}

              <NavigationButtons 
                currentLessonId="video-styrelsemote" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* HTML Struktur - ljus bakgrund */}
        <section data-section="vice-ordforande" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • Lektion 2
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                HTML Dokumentstruktur
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Ett HTML-dokument har en tydlig struktur som alla webbläsare förstår.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <Code className="w-10 h-10 text-[#FF5421] mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">DOCTYPE</h3>
                    <p className="text-slate-600">Talar om för webbläsaren vilken version av HTML som används</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <Code className="w-10 h-10 text-[#FF5421] mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">&lt;html&gt;</h3>
                    <p className="text-slate-600">Rot-elementet som innehåller hela dokumentet</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <Code className="w-10 h-10 text-[#FF5421] mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">&lt;head&gt;</h3>
                    <p className="text-slate-600">Metadata, titel, stilmallar och scripts</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <Code className="w-10 h-10 text-[#FF5421] mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">&lt;body&gt;</h3>
                    <p className="text-slate-600">Allt synligt innehåll på sidan</p>
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

              {!completedLessons.has('sekreterare') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('sekreterare')}
                  className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
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
                currentLessonId="vice-ordforande" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Quiz Section */}
        <section data-section="quiz-grundroller" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#FF5421]/10 text-[#FF5421] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#FF5421]/30">
                Grunderna • Quiz
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Testa dina kunskaper
              </h2>

              <p className="text-xl text-slate-600 mb-8">
                Nu har du lärt dig grunderna i HTML. Är du redo att testa dina kunskaper?
              </p>

              <div className="space-y-6">
                {quizQuestions['quiz-grundroller'].map((q, index) => (
                  <div key={q.id} className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-sm">
                    <p className="font-semibold text-xl mb-4 text-slate-800">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option) => {
                        const answerId = `html-quiz-${q.id}`;
                        const isSelected = quizAnswers[answerId] === option;
                        const isCorrect = option === q.correct;
                        const showResult = showQuizResults['quiz-grundroller'];

                        return (
                          <label
                            key={option}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              showResult && isCorrect
                                ? 'border-green-500 bg-green-50'
                                : showResult && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-50'
                                : isSelected
                                ? 'border-[#FF5421] bg-orange-50'
                                : 'border-slate-200 hover:border-[#FF5421]/50 hover:bg-orange-50'
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
                            <span className="flex-1 text-slate-700">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {!showQuizResults['quiz-grundroller'] ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuizSubmit('quiz-grundroller', quizQuestions['quiz-grundroller'])}
                    className="w-full bg-[#FF5421] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#E04A1D] transition-all flex items-center justify-center space-x-2"
                  >
                    <Award className="w-5 h-5" />
                    <span>Lämna in svar</span>
                  </motion.button>
                ) : (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Bra jobbat!</h3>
                    <p className="text-slate-600 text-lg">Du har slutfört quizet och tjänat 200 poäng!</p>
                  </div>
                )}
              </div>

              <NavigationButtons 
                currentLessonId="quiz-grundroller" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Semantisk HTML med bild overlay */}
        <section data-section="kassör" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80" 
              alt="Code on screen"
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
              <div className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-purple-400/30">
                Avancerat • Lektion 1
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                Semantisk HTML
              </h2>

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-gray-200 leading-relaxed mb-6">
                  Semantisk HTML handlar om att använda HTML-element som beskriver innehållets betydelse, 
                  inte bara dess utseende.
                </p>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">Varför är semantik viktigt?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-[#FF5421] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Tillgänglighet:</strong>
                        <p className="text-gray-300 text-sm">Hjälper skärmläsare att förstå innehållet</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-[#FF5421] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-white">SEO:</strong>
                        <p className="text-gray-300 text-sm">Sökmotorer förstår strukturen bättre</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-[#FF5421] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Underhåll:</strong>
                        <p className="text-gray-300 text-sm">Enklare att läsa och underhålla kod</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-6 h-6 text-[#FF5421] mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Standarder:</strong>
                        <p className="text-gray-300 text-sm">Följer webbstandarder</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Exempel på semantiska element</h3>
                  <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400">{`<header> - Sidhuvud
<nav> - Navigation
<main> - Huvudinnehåll
<article> - Självständigt innehåll
<section> - Tematiskt grupperat innehåll
<aside> - Sidoinnehåll
<footer> - Sidfot`}</code>
                  </pre>
                </div>

                <div className="flex items-center space-x-3 text-gray-300 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>10 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>140 poäng</span>
                </div>
              </div>

              {!completedLessons.has('kassör') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('kassör')}
                  className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="mt-8 bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +140 poäng
                  </span>
                </div>
              )}

              <NavigationButtons 
                currentLessonId="kassör" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Video 2 - ljus bakgrund */}
        <section data-section="video-ekonomi" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Avancerat • Video
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Semantisk HTML i Praktiken
              </h2>

              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mb-8 border border-slate-200">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/kGW8Al_cga4"
                  title="Semantic HTML"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <p className="text-xl text-slate-600 mb-6">
                Lär dig hur du använder semantiska HTML-element för att bygga bättre webbsidor.
              </p>

              <div className="flex items-center space-x-3 text-slate-500 mb-6">
                <Video className="w-5 h-5" />
                <span>12 minuter video</span>
                <span className="mx-2">•</span>
                <Award className="w-5 h-5 text-yellow-600" />
                <span>150 poäng</span>
              </div>

              {!completedLessons.has('video-ekonomi') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('video-ekonomi')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Markera som slutförd</span>
                </motion.button>
              ) : (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900">
                    Slutförd! +150 poäng
                  </span>
                </div>
              )}

              <NavigationButtons 
                currentLessonId="video-ekonomi" 
                onNavigate={scrollToSection}
                courseContent={courseContent}
              />
            </motion.div>
          </div>
        </section>

        {/* Reflektion - ljus bakgrund */}
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
                Ta dig tid att reflektera över vad du har lärt dig. Hur kan du använda HTML i dina egna projekt?
              </p>

              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Reflektionsfrågor:</h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">1.</span>
                    <span>Vad är den viktigaste lärdomen du tar med dig från den här kursen?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">2.</span>
                    <span>Hur kan du använda semantisk HTML i ditt nästa projekt?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-[#FF5421] font-bold text-xl">3.</span>
                    <span>Vilka delar av HTML vill du lära dig mer om?</span>
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

        {/* Slutprov med bild overlay */}
        <section data-section="slutprov" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80" 
              alt="Coding setup"
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
                Nu är det dags att visa allt du har lärt dig. Lycka till!
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
                    <p className="text-slate-600 text-xl mb-2">Du har slutfört HTML-kursen!</p>
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

export default HTMLCoursePage;
