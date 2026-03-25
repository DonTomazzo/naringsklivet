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
  Users, FileText, Briefcase, DollarSign, Scale, UserCheck,
  ClipboardCheck, TrendingUp, Lock, CheckSquare, AlertCircle,
  Calendar, FileCheck, UserX, Percent, Building
} from 'lucide-react';
import Sidebar from '../../components/CourseElements/Sidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { arbetsgivaransvarQuiz, arbetsgivaransvarSlutprovQuiz } from '../../data/quizzes/arbetsgivaransvar-quiz';
import BestUsesAISection from '../../components/CourseElements/InteractiveFlipCards_BestUsesAI';

const ArbetsgivaransvarModule = () => {
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
      id: 'nar-ar-foreningen-arbetsgivare',
      title: 'När är föreningen arbetsgivare?',
      type: 'text',
      phase: 'grunderna',
      icon: Building,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'anstallning-vs-uppdrag',
      title: 'Anställning vs Uppdrag - Skillnaderna',
      type: 'text',
      phase: 'grunderna',
      icon: Scale,
      duration: '15 min läsning',
      points: 150
    },
    {
      id: 'anstallningsformer',
      title: 'Olika anställningsformer',
      type: 'text',
      phase: 'grunderna',
      icon: Users,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'video-anstallning-uppdrag',
      title: 'Video: Anställning eller uppdrag?',
      type: 'video',
      phase: 'grunderna',
      icon: Video,
      duration: '8 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'interactive-cards',
      title: 'Interaktiva kort: Avgör formen',
      type: 'interactive',
      phase: 'grunderna',
      icon: Sparkles,
      duration: '10 min interaktion',
      points: 150
    },
    {
      id: 'quiz-grunderna',
      title: 'Quiz: Grunderna',
      type: 'quiz',
      phase: 'grunderna',
      icon: HelpCircle,
      duration: '8 min quiz',
      points: 200
    },
    {
      id: 'anstallningsavtal',
      title: 'Anställningsavtal och villkor',
      type: 'text',
      phase: 'arbetsgivarrollen',
      icon: FileText,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'skatter-avgifter',
      title: 'Skatter och arbetsgivaravgifter',
      type: 'text',
      phase: 'arbetsgivarrollen',
      icon: DollarSign,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'arbetsmiljo-ansvar',
      title: 'Arbetsmiljöansvar',
      type: 'text',
      phase: 'arbetsgivarrollen',
      icon: Shield,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'kollektivavtal',
      title: 'Kollektivavtal och fackförbund',
      type: 'text',
      phase: 'arbetsgivarrollen',
      icon: Users,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'konsultavtal',
      title: 'Konsultavtal och upphandling',
      type: 'text',
      phase: 'uppdrag',
      icon: Briefcase,
      duration: '10 min läsning',
      points: 100
    },
    {
      id: 'f-skatt-rut-rot',
      title: 'F-skatt, RUT och ROT',
      type: 'text',
      phase: 'uppdrag',
      icon: Percent,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'video-arbetsgivaransvar',
      title: 'Video: Arbetsgivaransvar i praktiken',
      type: 'video',
      phase: 'uppdrag',
      icon: Video,
      duration: '10 min video',
      videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      points: 120
    },
    {
      id: 'drag-match',
      title: 'Övning: Matcha ansvar och skyldigheter',
      type: 'interactive',
      phase: 'avancerat',
      icon: Lightbulb,
      duration: '8 min övning',
      points: 150
    },
    {
      id: 'uppsagning-avsked',
      title: 'Uppsägning och avsked',
      type: 'text',
      phase: 'avancerat',
      icon: UserX,
      duration: '12 min läsning',
      points: 120
    },
    {
      id: 'vanliga-fallgropar',
      title: 'Vanliga fallgropar att undvika',
      type: 'text',
      phase: 'avancerat',
      icon: AlertTriangle,
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
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" 
            alt="Arbetsgivaransvar"
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
                ✨ MODUL 4
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Föreningens arbetsgivaransvar
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                Lär dig skillnaden mellan anställning och uppdrag, arbetsgivaransvar, 
                skatter och avgifter samt hur ni hanterar personal och konsulter korrekt.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Scale className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">17 Lektioner</h3>
                  <p className="text-gray-300">Från grunderna till avancerad hantering</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Video className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Video & Praktik</h3>
                  <p className="text-gray-300">Verkliga exempel och övningar</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Award className="w-12 h-12 text-[#3B82F6] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1950 Poäng</h3>
                  <p className="text-gray-300">Bli expert på arbetsgivarfrågor</p>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('nar-ar-foreningen-arbetsgivare')}
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

        {/* När är föreningen arbetsgivare */}
        <section data-section="nar-ar-foreningen-arbetsgivare" className="min-h-screen flex items-center py-20 bg-white">
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
                När är föreningen arbetsgivare?
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  En bostadsrättsförening blir arbetsgivare när den anställer någon för att 
                  utföra arbete under föreningens ledning och kontroll. Detta innebär ett antal 
                  skyldigheter och ansvar som styrelsen måste känna till.
                </p>

                <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-xl p-8 my-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-6">När blir föreningen arbetsgivare?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Users className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Fast anställd personal</h4>
                      <p className="text-sm text-gray-100">Fastighetsskötare, vaktmästare eller administratör med tillsvidareanställning</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Calendar className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Visstidsanställning</h4>
                      <p className="text-sm text-gray-100">Tidsbegränsade anställningar för specifika projekt eller säsongsarbete</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <Clock className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Timanställda</h4>
                      <p className="text-sm text-gray-100">Personal som arbetar på timarvode men i anställningsförhållande</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                      <CheckCircle className="w-8 h-8 mb-3" />
                      <h4 className="font-semibold text-lg mb-2">Provanställning</h4>
                      <p className="text-sm text-gray-100">Provperiod innan beslut om fast anställning</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Arbetsgivarens huvudsakliga skyldigheter</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Betala lön och sociala avgifter</p>
                        <p className="text-slate-600 text-sm">Arbetsgivaravgifter (cirka 31,42%), skatt och semesterersättning</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Teckna försäkringar</p>
                        <p className="text-slate-600 text-sm">Arbetsskadeförsäkring, tjänstegrupplivförsäkring och trygghetsförsäkring</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Arbetsmiljöansvar</p>
                        <p className="text-slate-600 text-sm">Säkerställa en god och säker arbetsmiljö enligt arbetsmiljölagen</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-800">Administrativa skyldigheter</p>
                        <p className="text-slate-600 text-sm">Lönerapporter, kontrolluppgifter, arbetsgivardeklarationer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-amber-900 mb-2">Viktigt att veta</h3>
                      <p className="text-amber-800 mb-3">
                        Arbetsgivaransvaret följer oavsett om ni kallar det "anställning", "uppdrag" 
                        eller något annat. Det är arbetets karaktär och utförande som avgör, inte vad 
                        ni kallar det. Skatteverket och Försäkringskassan bedömer själva om en person 
                        ska räknas som anställd.
                      </p>
                      <p className="text-amber-800 font-semibold">
                        Vid osäkerhet - kontakta alltid Skatteverket för ett förhandsbesked!
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

              {!completedLessons.has('nar-ar-foreningen-arbetsgivare') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('nar-ar-foreningen-arbetsgivare')}
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

        {/* Anställning vs Uppdrag - HUVUDSEKTION */}
        <section data-section="anstallning-vs-uppdrag" className="min-h-screen flex items-center py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Grunderna • 2
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                Anställning vs Uppdrag - De avgörande skillnaderna
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  Det är absolut avgörande att förstå skillnaden mellan anställning och uppdrag. 
                  Väljer ni fel kan det få stora ekonomiska och juridiska konsekvenser för föreningen.
                </p>

                {/* Jämförelsetabell */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden my-8">
                  <div className="grid md:grid-cols-2 divide-x divide-gray-200">
                    {/* Anställning */}
                    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-blue-600 p-3 rounded-lg">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-blue-900">Anställning</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Kännetecken
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Arbetar under ledning och kontroll</li>
                            <li>• Fast arbetstid och arbetsplats</li>
                            <li>• Använder föreningens verktyg</li>
                            <li>• Integrerad i verksamheten</li>
                            <li>• Personligt arbete (kan inte skicka ersättare)</li>
                            <li>• Fortlöpande arbetsuppgifter</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Ekonomi
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Fast lön varje månad</li>
                            <li>• Arbetsgivaravgifter (31,42%)</li>
                            <li>• Föreningens skatteavdrag</li>
                            <li>• Semesterersättning</li>
                            <li>• Sjuklön</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Skyldigheter
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Anställningsavtal krävs</li>
                            <li>• Arbetsmiljöansvar</li>
                            <li>• Försäkringar obligatoriska</li>
                            <li>• LAS gäller (anställningsskydd)</li>
                            <li>• Möjligt kollektivavtal</li>
                          </ul>
                        </div>

                        <div className="bg-blue-200 rounded-lg p-4 mt-4">
                          <p className="font-semibold text-blue-900 text-sm">
                            Exempel: Fastighetsskötare som arbetar 20h/vecka, 
                            följer schema och rapporterar till styrelsen
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Uppdrag */}
                    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-green-600 p-3 rounded-lg">
                          <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-green-900">Uppdrag</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                            <Target className="w-5 h-5 mr-2" />
                            Kännetecken
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Självständigt arbete</li>
                            <li>• Bestämmer själv hur och när</li>
                            <li>• Egna verktyg och utrustning</li>
                            <li>• Fristående från verksamheten</li>
                            <li>• Kan anlita ersättare</li>
                            <li>• Tidsbegränsat projekt</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Ekonomi
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Fakturerar för utfört arbete</li>
                            <li>• F-skattsedel krävs</li>
                            <li>• Ingen arbetsgivaravgift</li>
                            <li>• Konsulten sköter egen skatt</li>
                            <li>• Ingen semester/sjukersättning</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                            <Scale className="w-5 h-5 mr-2" />
                            Skyldigheter
                          </h4>
                          <ul className="text-slate-700 space-y-2 text-sm">
                            <li>• Konsultavtal/beställning</li>
                            <li>• Inget arbetsmiljöansvar</li>
                            <li>• Egna försäkringar</li>
                            <li>• LAS gäller EJ</li>
                            <li>• Inget kollektivavtal</li>
                          </ul>
                        </div>

                        <div className="bg-green-200 rounded-lg p-4 mt-4">
                          <p className="font-semibold text-green-900 text-sm">
                            Exempel: Elektriker med F-skatt som kommer och 
                            byter armatur vid behov, bestämmer själv hur
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gränsdragningsprövning */}
                <div className="bg-[#171f32] border border-slate-700 rounded-xl p-8 my-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Skatteverkets gränsdragningsprövning
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    Skatteverket bedömer följande faktorer när de avgör om det är anställning eller uppdrag:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-5">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <CheckSquare className="w-5 h-5 mr-2 text-blue-400" />
                        Talar för ANSTÄLLNING
                      </h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>→ Arbetsledning och kontroll</li>
                        <li>→ Fast arbetstid</li>
                        <li>→ Arbete på bestämd plats</li>
                        <li>→ Löpande ersättning</li>
                        <li>→ Använder föreningens verktyg</li>
                        <li>→ Arbetet är del av ordinarie verksamhet</li>
                        <li>→ Kan inte skicka ersättare</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-lg p-5">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <CheckSquare className="w-5 h-5 mr-2 text-green-400" />
                        Talar för UPPDRAG
                      </h4>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        <li>→ Självständigt arbete</li>
                        <li>→ Bestämmer själv när</li>
                        <li>→ Arbetar var som helst</li>
                        <li>→ Resultatbaserad ersättning</li>
                        <li>→ Egna verktyg</li>
                        <li>→ Tidsbegränsat projekt</li>
                        <li>→ Kan anlita ersättare</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-6">
                    <p className="text-red-300 text-sm">
                      <strong className="text-red-200">OBS!</strong> Det är ingen enskild faktor som avgör, 
                      utan en helhetsbedömning av alla omständigheter. Vid tvivel - begär förhandsbesked från Skatteverket!
                    </p>
                  </div>
                </div>

                {/* Praktiska exempel */}
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Klassisk anställning
                    </h4>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p><strong>Fastighetsskötare:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Arbetar 30h/vecka enligt schema</li>
                        <li>Använder föreningens verktyg</li>
                        <li>Rapporterar till ordföranden</li>
                        <li>Fast månadslön</li>
                        <li>Kan inte skicka ersättare</li>
                      </ul>
                      <p className="font-semibold text-blue-900 mt-3">
                        → Detta ÄR en anställning
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                      <Briefcase className="w-6 h-6 mr-2" />
                      Klassiskt uppdrag
                    </h4>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p><strong>Rörmokarfirma:</strong></p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Anlitas vid behov för reparation</li>
                        <li>Egna verktyg och bil</li>
                        <li>Bestämmer själv hur jobbet görs</li>
                        <li>Fakturerar per uppdrag</li>
                        <li>Kan skicka annan rörmokare</li>
                      </ul>
                      <p className="font-semibold text-green-900 mt-3">
                        → Detta ÄR ett uppdrag
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gråzonsexempel */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 my-8">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Gråzonsexempel som ofta blir fel
                  </h3>
                  
                  <div className="space-y-4 text-slate-700">
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-amber-900 mb-2">Exempel 1: "Timanställd" städare</p>
                      <p className="text-sm mb-2">
                        Städar trappor varje onsdag kl 09-12, får 200 kr/timme, använder föreningens 
                        städmaterial, kan inte skicka ersättare.
                      </p>
                      <p className="text-sm font-semibold text-red-700">
                        → Även om ni kallar det "uppdrag" är detta en anställning! Kräver arbetsgivaravgifter.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-amber-900 mb-2">Exempel 2: "Konsult" för administration</p>
                      <p className="text-sm mb-2">
                        Sköter ekonomi och administration 10h/vecka, arbetar hemifrån, får fast ersättning 
                        varje månad, har F-skatt.
                      </p>
                      <p className="text-sm font-semibold text-amber-700">
                        → Gråzon! Trots F-skatt kan detta räknas som anställning om arbetet är fortlöpande 
                        och integrerat. Begär förhandsbesked!
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-amber-900 mb-2">Exempel 3: Vaktmästare "på entreprenad"</p>
                      <p className="text-sm mb-2">
                        Har avtal om att utföra alla vaktmästeriarbeten, kommer när föreningen ringer, 
                        fakturerar per timme, egna verktyg.
                      </p>
                      <p className="text-sm font-semibold text-green-700">
                        → Detta kan vara uppdrag OM personen verkligen är självständig och kan tacka nej 
                        till uppdrag utan konsekvenser.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-500 mt-8">
                  <Clock className="w-5 h-5" />
                  <span>15 minuter läsning</span>
                  <span className="mx-2">•</span>
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>150 poäng</span>
                </div>
              </div>

              {!completedLessons.has('anstallning-vs-uppdrag') ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('anstallning-vs-uppdrag')}
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
                Visa att du förstår skillnaden mellan anställning och uppdrag
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
                  quizData={arbetsgivaransvarQuiz}
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
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80" 
              alt="Business documents"
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
                Slutprov - Arbetsgivaransvar
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du behärskar alla aspekter av arbetsgivaransvaret
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
                  quizData={arbetsgivaransvarSlutprovQuiz}
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
        subtitle="Här är svaren på de vanligaste frågorna om arbetsgivaransvar"
        buttonColor="#3B82F6"
      />
    </div>
  );
};

export default ArbetsgivaransvarModule;
