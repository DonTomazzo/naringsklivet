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
  Sparkles, Lightbulb, Target, Zap, Home, Wrench, Zap as Lightning
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { htmlGrundrollerQuiz, htmlSlutprovQuiz } from '../../data/quizzes/html-grundroller-quiz';

const FastighetenModule = () => {
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
      id: 'underhallsplan',
      title: 'Underhållsplan och stambyten',
      type: 'text',
      phase: 'grunderna',
      icon: Wrench,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'energieffektivisering',
      title: 'Energieffektivisering',
      type: 'text',
      phase: 'grunderna',
      icon: Lightning,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'fastighetsskotsel',
      title: 'Fastighetsskötsel och drift',
      type: 'text',
      phase: 'grunderna',
      icon: Home,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-fastighet',
      title: 'Video: Fastighetsförvaltning',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '15 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
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
      id: 'renovering',
      title: 'Större renoveringsprojekt',
      type: 'text',
      phase: 'avancerat',
      icon: Target,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'halsosamma-miljoer',
      title: 'Hälsosamma inomhusmiljöer',
      type: 'text',
      phase: 'avancerat',
      icon: Sparkles,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-renovering',
      title: 'Video: Renoveringsprojekt',
      type: 'video',
      phase: 'avancerat',
      icon: Video,
      duration: '12 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 150
    },
    {
      id: 'hallbarhet',
      title: 'Hållbarhet och miljö',
      type: 'text',
      phase: 'avancerat',
      icon: Lightbulb,
      duration: '10 min läsning',
      points: 100
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
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80" 
            alt="Fastighet"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#22C55E] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 12
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Fastigheten
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig om fastighetsförvaltning och underhåll av bostadsrättsföreningens fastighet.
                Från underhållsplanering till energieffektivisering och renovering.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Home className="w-12 h-12 text-[#22C55E] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">11 Lektioner</h3>
                  <p className="text-gray-300">Omfattande fastighetskunskap</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#22C55E] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Video-lektioner</h3>
                  <p className="text-gray-300">Se renoveringsprojekt</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#22C55E] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1590 Poäng</h3>
                  <p className="text-gray-300">Samla poäng genom kursen</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('underhallsplan')}
                  className="bg-[#22C55E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#16A34A] transition-all flex items-center justify-center space-x-2"
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

        {/* Underhållsplan */}
        <section data-section="underhallsplan" className="min-h-screen flex items-center py-20 bg-white">
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
                Underhållsplan och stambyten
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  En underhållsplan är avgörande för att säkerställa fastighetens långsiktiga värde 
                  och undvika akuta och kostsamma reparationer. Planen ska täcka både löpande 
                  underhåll och större renoveringar.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Viktiga områden i underhållsplanen</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Stambyten:</strong> VA-stammar, el och ventilation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Tak och fasad:</strong> Utvändigt underhåll och renovering</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Fönster och dörrar:</strong> Byte och underhåll</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-[#22C55E] mt-1 flex-shrink-0" />
                      <span><strong className="text-slate-800">Gemensamma utrymmen:</strong> Trapphus, källare, vind</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Vanliga stambyten och livslängd</h3>
                  <div className="bg-black/50 p-4 rounded-lg">
                    <p className="text-gray-300 mb-3">• VA-stammar: 40-60 år</p>
                    <p className="text-gray-300 mb-3">• Elinstallationer: 40-50 år</p>
                    <p className="text-gray-300 mb-3">• Ventilation: 30-40 år</p>
                    <p className="text-gray-300 mb-3">• Tak: 30-50 år</p>
                    <p className="text-gray-300">• Fasad: 25-50 år beroende på material</p>
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

              {!completedLessons.has('underhallsplan') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('underhallsplan')}
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

        {/* Quiz Section */}
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
                Nu har du lärt dig grunderna. Är du redo att testa dina kunskaper?
              </p>

              {activeQuizId !== 'quiz-grunderna' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('quiz-grunderna')}
                  className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={htmlGrundrollerQuiz}
                  onComplete={(score, maxScore) => handleQuizComplete(score, maxScore, 'quiz-grunderna')}
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
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80" 
              alt="Building"
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
                Slutprov - Fastigheten
              </h2>

              {activeQuizId !== 'slutprov' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('slutprov')}
                  className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
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
        buttonColor="#22C55E"
      />
    </div>
  );
};

export default FastighetenModule;