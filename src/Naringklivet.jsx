import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import DynamicQuizPage from './components/DynamicQuizPage';
import VideoPopupHero from './components/VideoPopupHero'; 
import TestimonialCarousel from './components/TestimonialCarousel';
import TextModal from './components/TextModal';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NewsCards from './components/blog/NewsCards';
import ContactForm from './components/ContactForm';
import Events from './pages/Events';
import EventDetail from './pages/EventDetailPage';
import NetflixPage from './pages/NetflixPage.jsx';
import AnimatedHeroImage from './components/AnimatedHeroImage';
import HeroSlider from './components/HeroSlider';
import ModuleCard from './components/ModuleCard2';
import { modulesData } from './data/modules2.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import CourseFormPage from './pages/CourseFormPage';
import SimpleCourseForm from './components/CourseContactForm';
import PublicSurvey from './components/surveys/PublicSurvey';
import { SurveyProvider } from './contexts/MockSurveyContext';
import { DocumentProvider } from './contexts/MockDocumentContext';
import { AdaptiveHomeworkApp } from './features/adaptive-quiz/App';
import DemoPage4 from "./pages/DemoPages/DemoPage4";
import ModulesPage from './pages/Modules/ModulesPage';
import ModulePage from './pages/Modules/ModulePage';

import { EventsProvider } from './contexts/EventsContext';
import DocumentLibrary from './components/admin/sections/documents/DocumentLibrary.jsx';
import TeamView from './pages/TeamView';
import { useTranslation } from 'react-i18next';
import './i18n'; // Se till att i18n initialiseras
import AdminDashboard from './components/admin/AdminDashboard';

// ⭐ Auth komponenter
import { TeamProvider, useTeam } from './contexts/MockTeamContext';
import TeamCodeRegister from './components/auth/TeamCodeRegister';
import LoginForm from './components/auth/LoginForm';
import TeamMemberDashboard from './components/auth/TeamMemberDashboard';
import TeamLeaderDashboard from './components/auth/TeamLeaderDashboard';


import { 
  CheckCircle, Star, Users, Clock, Award, ChevronDown, 
  Play, Phone, Mail, MapPin, Calendar, BookOpen, Target,
  ArrowRight, Quote, Shield, TrendingUp, FileText, Menu, X,
  AlertCircle, ThumbsUp, Video, Download, Lock, Zap
} from 'lucide-react';


const QuizzesPage = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Quizzes</h1>
      <p className="text-slate-600">Quiz-sidan kommer snart...</p>
    </div>
  </div>
);

const heroSlides = [
    {
      title: "Bli tryggare i din styrelseroll och gå från lekman till styrelseproffs",
      subtitle: "Program framtaget för förtroendevalda i bostadsrättsföreningar",
      image: "/public/styrelsen.png",
      cta: "JA, jag vill kvalitetssäkra vår BRF"
    },
    {
      title: "Från osäker till expert på 15 moduler",
      subtitle: "Praktisk kunskap som du kan använda direkt i din styrelse",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
      cta: "Se vad kursen innehåller"
    },
    {
      title: "357+ nöjda kursdeltagare",
      subtitle: "Få samma kunskap och självförtroende som de",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
      cta: "Läs deras berättelser"
    }
  ];

  const handleHeroCtaClick = (type) => {
  if (type === 'primary') {
    // Scrolla till formulär eller öppna modal
    setIsFormModalOpen(true);
  } else {
    // Öppna VIDEO modal
    setIsVideoModalOpen(true);
  }
};




const QuizLeaderboardPage = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Leaderboard</h1>
      <p className="text-slate-600">Leaderboard kommer snart...</p>
    </div>
  </div>
);

// ⭐ Protected Route Component
const ProtectedRoute = ({ children, requireTeamLeader = false, requireAdmin = false }) => {
  const { isLoggedIn, isTeamLeader, currentUser } = useTeam();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ⭐ Check för admin-åtkomst (hårdkodat för utveckling)
  if (requireAdmin) {
    // Hårdkodat admin email för utveckling
    const isAdmin = currentUser?.email === 'admin@styrelsekorkortet.se';
    
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (requireTeamLeader && !isTeamLeader) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
    { code: 'da', flag: '🇩🇰', name: 'Danska' },
    { code: 'no', flag: '🇳🇴', name: 'Norska' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="relative">
      {/* Desktop version - Visar alla 3 flaggor */}
      <div className="hidden md:flex items-center gap-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`text-2xl p-2 rounded-lg transition-all ${
              i18n.language === lang.code 
                ? 'bg-orange-100 ring-2 ring-orange-500' 
                : 'hover:bg-gray-100'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </motion.button>
        ))}
      </div>

      {/* Mobile dropdown - Visar nuvarande flagga med dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2 rounded-lg hover:bg-gray-100"
        >
          {currentLanguage?.flag}
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 ${
                    i18n.language === lang.code ? 'bg-orange-50' : ''
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


const Naringsklivet = () => {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const VIDEO_URL = "https://www.youtube.com/embed/5K4fA0l4s04"; 

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => setShowFloatingCTA(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const urgencyMessages = [
    "🔥 217 utvecklare kollar på denna kurs just nu",
    "⚡ Endast 12 platser kvar i nästa omgång för att höja din 'vibe'",
    "🎯 Nästa start: 15 oktober - Din kodkarriär börjar nu!"
  ];

  const testimonials = [
    {
      name: "Alex Karlsson",
      role: "Frontendutvecklare, TechNova AB",
      text: "Efter kursen minskade jag buggarna med 40% och fick projektet godkänt i första omgången. Kursen lyfte min kod från 'meh' till 'magisk'!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Minskade buggar med 40%",
      beforeAfter: "Från 'stacka kod' till 'högpresterande arkitekt'"
    },
    {
      name: "Simon Johansson", 
      role: "Fullstack-aspirant, Frilans",
      text: "Jag gick från att vara osäker på basic syntax till att bygga och leda ett eget webbapp-projekt. Vibecoding gav mig både teknik och självförtroende.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Släppte egen app (v1.0)",
      beforeAfter: "Från tutorials till produktion"
    },
    {
      name: "Klara Dahlberg",
      role: "UX/UI Designer, Kreativbyrån", 
      text: "Tack vare kursen förstår jag utvecklarnas språk. Vi minskade design-till-kod-cykeln med 50% och 'viben' i teamet är fantastisk.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Snabbare iterationscykel",
      beforeAfter: "Från 'silotänk' till 'samkodning'"
    }
  ];

  const iconMap = {
    'Shield': '🛡️',
    'TrendingUp': '📈', 
    'Users': '👥',
    'Award': '🏆'
  };

const transformationSteps = [
  {
    phase: "Vecka 1-2",
    title: "Vibe Setup & Basic Syntax",
    description: "Slå på rätt mindset och bemästra grundläggande kodstruktur utan att 'gissa'",
    icon: 'Shield',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 3-4", 
    title: "Asynkron Vibe & API Flow",
    description: "Förstå hur datan flödar och optimera dina anrop för blixtsnabba laddtider",
    icon: 'TrendingUp',
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 5-6",
    title: "Clean Code & Refactoring", 
    description: "Lär dig skriva kod som teamet älskar att ärva och hantera konflikter i Git som ett proffs",
    icon: 'Users',
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 7-8",
    title: "Deployment Vibe & Skalning",
    description: "Avancerade tekniker för cloud-utplacering, testning och att designa skalbara lösningar",
    icon: 'Award',
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 9-10",
    title: "Performance & Debugging",
    description: "Lär dig lagarna och reglerna så du aldrig behöver gissa igen",
    icon: 'Shield',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 11-12", 
    title: "Frameworks & State Management",
    description: "Förstå varje post i budgeten och upptäck besparingspotential",
    icon: 'TrendingUp',
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 13-14",
    title: "Testning & QA-Vibe", 
    description: "Lär dig leda möten och hantera konflikter som en professionell",
    icon: 'Users',
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 15-16",
    title: "Senior Developer Mindset",
    description: "Avancerade tekniker för förhandling, projektstyrning och beslutsfattande",
    icon: 'Award',
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 17-18",
    title: "Vibe Setup & Basic Syntax",
    description: "Lär dig lagarna och reglerna så du aldrig behöver gissa igen",
    icon: 'Shield',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 19-20", 
    title: "Asynkron Vibe & API Flow",
    description: "Förstå varje post i budgeten och upptäck besparingspotential",
    icon: 'TrendingUp',
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 21-22",
    title: "Clean Code & Refactoring", 
    description: "Lär dig leda möten och hantera konflikter som en professionell",
    icon: 'Users',
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    phase: "Vecka 23-24",
    title: "Deployment Vibe & Skalning",
    description: "Avancerade tekniker för förhandling, projektstyrning och beslutsfattande",
    icon: 'Award',
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
];

  const faqs = [
    {
      question: "Är det här verkligen värt pengarna om jag redan kan koda lite?",
      answer: "Absolut! 81% av våra deltagare har redan grundläggande kunskaper. De flesta går från 'funktionell kod' till 'produktion-redo' och får högre lön efter kursen. Alex Karlsson minskade t.ex. buggarna med 40% efter kursen."
    },
    {
      question: "Hur lång tid tar det att genomföra kursen?",
      answer: "Kursen är designad för upptagna utvecklare. Du kan genomföra den på 8 veckor med ca 3-5 timmar per vecka, eller snabbare om du vill. Allt material finns tillgängligt direkt och du har livstidsåtkomst."
    },
    {
      question: "Vad händer om jag kör fast i ett kodproblem?",
      answer: "Som deltagare får du tillgång till vårt exklusiva community där du kan få snabb hjälp från både instruktörer och andra deltagare. Vi har dedikerade Q&A-sessioner varje vecka."
    },
    {
      question: "Är kursen uppdaterad med senaste framework-versionerna?",
      answer: "Ja! Vi uppdaterar kursen kontinuerligt. Som deltagare får du alla uppdateringar gratis för livet. Vi följer noga de senaste trenderna inom React, Vue, m.fl. för att säkerställa att du alltid har senaste informationen."
    },
    {
      question: "Fungerar garantin verkligen? Inga dolda villkor?",
      answer: "Garantin är 100% äkta. Om du inte känner att din 'vibe' höjts inom 60 dagar får du alla pengar tillbaka. Inga frågor, inga krångel. Vi har mindre än 1% som begär återbetalning, men garantin gäller för alla."
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      

      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <img 
                src="/logo.png" 
                alt="Vibecoding Logotyp"
                width={40} 
                height={40}
                className="object-contain" 
              />
              <div>
                <div className="text-xl font-bold text-slate-800">
                  <span className="text-[#FF5421]"> Styrelse</span>körkortet
                </div>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex space-x-8 text-[#FF5421]">
              {[
                { name: 'Programmet', id: 'transformation' },
                { name: 'Omdömen', id: 'results' },
                { name: 'Kodinnehåll', id: 'content' },
                { name: 'Se vår video', id: 'guarantee' },
                { name: 'FAQ', id: 'faq' } 
                
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ color: '#FF5421' }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-700 hover:text-orange-500 transition-colors font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} />
                <span></span>
              </div>

              {/* ⭐ DOLD TILLS VIDARE - Aktivera när du vill ha språkväxlare */}
              {/* <LanguageSwitcher /> */}

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF5421] text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
                style={{ backgroundColor: '#FF5421' }}
              >
                Jag har en gruppkod
              </motion.button>
              
              <button
                className="md:hidden text-slate-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-200 py-4"
              >
                <div className="flex flex-col space-y-4">
                  {[
                    { name: 'Transformationen', id: 'transformation' },
                    { name: 'Resultat', id: 'results' },
                    { name: 'Kodinnehåll', id: 'content' },
                    { name: 'Garanti', id: 'guarantee' },
                    { name: 'Vanliga frågor', id: 'faq' } 
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-slate-600 hover:text-orange-500 py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

     {/* Hero Section - nu med slider! */}
<HeroSlider 
    slides={heroSlides} 
    onCtaClick={handleHeroCtaClick}
/>
      {/* Social Proof Ticker */}
      <section className="py-4 bg-slate-900 text-white overflow-hidden">
        <motion.div 
          animate={{ x: [-1000, 1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {urgencyMessages.concat(urgencyMessages).map((message, index) => (
            <div key={index} className="text-sm font-medium">
              {message}
            </div>
          ))}
        </motion.div>
      </section>

<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    {/* Icons Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {/* Future Students */}
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
      >
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-full h-full text-[#FF5421]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            <path d="M12 14V9m0 0l3 3m-3-3l-3 3"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Future Students</h3>
      </motion.div>

      {/* International */}
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
      >
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-full h-full text-[#FF5421]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            <path d="M12 2v20"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">International</h3>
      </motion.div>

      {/* Current Students */}
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
      >
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-full h-full text-[#FF5421]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            <path d="M20 8v6m0 0l-3-3m3 3l3-3"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Current Students</h3>
      </motion.div>

      {/* Alumni & Donors */}
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all"
      >
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-full h-full text-[#FF5421]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-9 3l9 5 9-5"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Alumni & Donors</h3>
      </motion.div>
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column - Message */}
      <div>
        <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-lg text-sm font-semibold mb-6 uppercase tracking-wide">
          Meddelande
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Vi hjälper er till en bättre mandatperiod.
        </h2>
        
        <div className="space-y-4 text-lg text-slate-600 mb-12">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, eius to mod tempor 
            incidi dunt ut labore et dolore magna aliqua. Ut enims ad minim veniam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, eius to mod tempor 
            incidi dunt ut labore et dolore magna aliqua.
          </p>
        </div>

       {/* CEO Info */}
        <div className="flex items-center space-x-6">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
            alt="CEO"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          
            {/* Ändra denna yttre div till en flex-container med column-riktning */}
          <div className="flex flex-col"> 
            
            {/* Ny Flex-container för Namn, Titel och Knapp */}
            <div className="flex items-center space-x-4"> 
                
                {/* Container för Namn och Titel */}
                <div>
                  <div className="mb-2">
                    <svg width="120" height="40" viewBox="0 0 120 40" className="text-slate-800">
                      <text x="0" y="30" fontFamily="'Brush Script MT', cursive" fontSize="32" fill="currentColor">
                        Tomas M.
                      </text>
                    </svg>
                  </div>
                  <p className="text-slate-600 font-medium">Utbildningsansvarig</p>
                </div>
                
                {/* Read More Button - Flyttad hit */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#FF5421] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#E64A1E] transition-colors flex items-center space-x-2 shadow-lg"
                >
                  <BookOpen className="w-4 h-4" /> {/* Gjort ikonen mindre för att matcha storleken på texten */}
                  <span>Läs mer</span>
                </motion.button>
                
            </div>
            
            {/* Text Modal - Behöver vara kvar här eller i den yttersta komponenten */}
            <TextModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
</div>

      {/* Right Column - Latest Events */}
      <div>
        <div className="bg-[#FF5421] text-white px-6 py-4 rounded-t-xl">
          <h3 className="text-2xl font-bold">Kommande seminarier</h3>
        </div>
        
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
          {/* Event 1 */}
          <div className="flex items-start p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 text-center mr-6">
              <div className="text-sm text-slate-600 font-medium mb-1">Jul</div>
              <div className="text-4xl font-bold text-[#FF5421]">24</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>11:00 AM - 03:00 AM</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 hover:text-[#FF5421] transition-colors">
                Spicy Quince And Cranberry Chutney
              </h4>
            </div>
          </div>

          {/* Event 2 */}
          <div className="flex items-start p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 text-center mr-6">
              <div className="text-sm text-slate-600 font-medium mb-1">Jul</div>
              <div className="text-4xl font-bold text-[#FF5421]">24</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>11:00 AM - 03:00 AM</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 hover:text-[#FF5421] transition-colors">
                Persimmon, Pomegranate, And Massaged Kale Salad
              </h4>
            </div>
          </div>

          {/* Event 3 */}
          <div className="flex items-start p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 text-center mr-6">
              <div className="text-sm text-slate-600 font-medium mb-1">Jul</div>
              <div className="text-4xl font-bold text-[#FF5421]">24</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>11:00 AM - 03:00 AM</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 hover:text-[#FF5421] transition-colors">
                Essential Fall Fruits That Aren't Apples
              </h4>
            </div>
          </div>

          {/* Event 4 */}
          <div className="flex items-start p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex-shrink-0 text-center mr-6">
              <div className="text-sm text-slate-600 font-medium mb-1">Nov</div>
              <div className="text-4xl font-bold text-[#FF5421]">20</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>11:00 AM - 03:00 AM</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 hover:text-[#FF5421] transition-colors">
                Job Seekers From Overcoming Failure
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* MODULES SECTION */}
<section id="courses" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-10">
      <div className="inline-block px-4 py-2 text-white rounded-full font-semibold mb-4" 
           style={{ backgroundColor: '#FF5421' }}>
        ALL INCLUSIVE
      </div>
      <h2 className="text-4xl font-bold text-slate-900 mb-4">
        Från lekman till styrelseproffs i 15 enkla steg
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto"> 
        Följ vårt kompletta program som ger er styrelsemedlemmar den juridiska, ekonomiska och administrativa kunskap ni behöver för att fatta rätt beslut.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {modulesData.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <ModuleCard module={module} delay={index * 0.1} />
        </motion.div>
      ))}
    </div>
  </div>
</section>

          
            
     

  <section 
  id="results" 
  className="py-20 relative bg-cover bg-center bg-no-repeat"
  style={{ 
    backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
  }}
>
  <div className="absolute inset-0 bg-slate-900/80"></div>
  
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-white mb-4">
        Vad tycker våra kursdeltagare?
      </h2>
      <p className="text-xl text-white/80">
        Se exakt vad som händer när du går från junior till senior developer vibe
      </p>
    </motion.div>

    {/* ERSÄTT DEN GAMLA TVÅSPALTIGA LAYOUTEN (grid grid-cols-1 lg:grid-cols-2) med komponenten */}
    
    <TestimonialCarousel 
      testimonials={testimonials} 
      activeTestimonial={activeTestimonial} 
      setActiveTestimonial={setActiveTestimonial}
      StarIcon={Star} // Skicka in din ikon-komponent
    />
    
  </div>
</section>

      {/* Course Content with Images */}
      <section id="content" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Exakt vad du får för 3 995 kr
            </h2>
            <p className="text-xl text-slate-600">
              Komplett developer toolkit för att uppnå Senior Vibe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "📋 Praktiska Blueprints", // Ändrat från Verktyg/Mallar
                subtitle: "värde: 2 500 kr",
                items: [
                  "15+ färdiga kodmallar (Templates)", // Ändrat
                  "Debugging & Test-checklistor", // Ändrat
                  "Git & Merge-process mallar", // Ändrat
                  "Clean Code Planerare" // Ändrat
                ],
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "🏆 Community & Certifiering", 
                subtitle: "värde: 1 500 kr",
                items: [
                  "Officiellt Vibecoding Certifikat",
                  "Email-support i 6 månader",
                  "Månatliga Live-Coding Q&A sessioner", // Ändrat
                  "Livstidsuppdateringar till kursen" // Ändrat
                ],
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden group"
              >
                <div className="aspect-[3/2] relative">
                  <img 
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/70"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{section.subtitle}</p>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="text-green-400 mt-0.5" size={16} />
                          <span className="text-white/90 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-white rounded-2xl p-8 max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
              <h3 className="text-2xl font-bold mb-2">Totalt värde: 8 000 kr</h3>
                <AnimatedHeroImage 
              imagePath="/public/bild4.png"
              alt="Min häftiga bild"
              className="max-w-2xl"
            />
              <h4 className="text-3xl font-bold mb-4">Du betalar: 3 995 kr</h4>
              <p className="text-white/90 mb-6">
                Du sparar 4 005 kr och får allt du behöver för att lyckas som Senior Developer
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🔥 Få tillgång nu - Höj din Vibe!
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

   {/* Video Section */}
<section 
  id="video" 
  className="py-20 relative bg-cover bg-center bg-no-repeat"
  style={{ 
    backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
  }}
>
  <div className="absolute inset-0 bg-slate-900/80"></div>
    
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h2 className="text-5xl font-bold mb-4" style={{ color: '#FF5421' }}>
        Se videon om oss
      </h2>
      <p className="text-xl text-white/90">
        Lär känna oss och vår vision för din utveckling som förtroendevald
      </p>
    </motion.div>
      
    {/* YouTube Video Container */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-2xl" 
      style={{ paddingBottom: '56.25%', height: 0, maxWidth: '900px' }}
    >
      <iframe
        src="https://www.youtube.com/embed/qz0aGYrrlhU" 
        title="Om oss video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </motion.div>

    {/* Fotnotsektion */}
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/80 mt-8">
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-400" size={16} />
        <span>Säker betalning</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-400" size={16} />
        <span>Omedelbar tillgång till kursen</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="text-green-400" size={16} />
        <span>Livstids tillgång</span>
      </div>
    </div>
  </div>
</section>

{/* --- */}
{/* FAQ Section */}
<section id="faq" className="py-20 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-slate-900 mb-4">
        Vanliga frågor om Vibecoding
      </h2>
      <p className="text-xl text-slate-600">
        Här är svaren på de frågor vi får mest om AI-driven utveckling
      </p>
    </motion.div>

    <div className="space-y-4">
      {/* MAPPA HÄR DE NYA FAQ-OBJEKTEN */}
      {/* OBS: Jag behåller den ursprungliga logiken, men innehållet bör bytas ut i 'faqs'-arrayen */}
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
        >
          <motion.button
            whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
            className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors"
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          >
            <span className="font-bold text-slate-900 text-lg pr-4">{faq.question}</span>
            <motion.div
              animate={{ rotate: openFaq === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={24} className="flex-shrink-0" style={{ color: '#FF5421' }} />
            </motion.div>
          </motion.button>
            
          <AnimatePresence>
            {openFaq === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-slate-700 text-lg leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* --- */}

<NewsCards />

{/* --- */}

{/* Final CTA/Contact Section */}
<section 
  className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ 
    backgroundImage: `url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
  }}
>
  <div className="absolute inset-0 bg-slate-900/85"></div>
    
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="inline-block px-4 py-2 bg-slate-950 text-white rounded-full font-bold mb-6">
        🤝 Låt oss prata om ditt nästa AI-projekt
      </div>
        
      
      <p className="text-xl text-white/90 mb-8 leading-relaxed">
        Vår kurs handlar om att förverkliga idéer. Använd formuläret nedan för att se hur vi kan hjälpa dig bygga en **lanseringklar fullstack-app** med <span className="font-bold" style={{ color: '#FF5421' }}>kraftfulla AI-funktioner</span>.
      </p>

      {/* DET NYA GLASSMORPHISM FORMULÄRET */}
      <ContactForm /> 
        
      <p className="text-white/80 text-sm mt-8">
        Vi ser fram emot att höra om din AI-vision! 
        <span className="font-semibold" style={{ color: '#FF5421' }}>Vad väntar du på?</span>
      </p>
    </motion.div>
  </div>
</section>

{/* Floating CTA */}
<AnimatePresence>
  {showFloatingCTA && (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      className="fixed bottom-6 right-6 z-50 text-white rounded-full shadow-2xl border-4 border-white"
      style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFormModalOpen(true)} 
        className="px-6 py-4 font-bold flex items-center gap-2"
      >
        <Zap size={20} />
        Säkrfgfa din plats nu - **2 995 kr**
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>

{/* --- */}

{/* Course Form Modal */}
<AnimatePresence>
  {isFormModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={() => setIsFormModalOpen(false)} // Stäng vid klick på backdrop
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Förhindra stängning vid klick på formuläret
      >
        {/* Stäng-knapp */}
        <button
          onClick={() => setIsFormModalOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Formuläret */}
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
            **Säkra din plats!**  🚀
          </h2>
          <p className="text-slate-600 mb-6 text-center">
            Fyll i dina uppgifter och börja koda inom 5 minuter
          </p>
          
          <SimpleCourseForm />
          
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* --- */}

{/* Footer */}
<footer className="bg-slate-800 text-slate-300 py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-1 mb-4">
          <img
            // Antar att du har en logotyp för Vibecoding
            src="/logo.png" 
            alt="Vibecoding Logotyp"
            width={32}
            height={32}
            className="object-contain" 
          />
          <div className="text-xl font-bold text-white">
            <span className="text-[#FF5421]"> Styrelse</span>körkortet
          </div>
        </div>
        <p className="text-slate-400 mb-4">
          Styrelsekörkortet är ett effektivt utbildningsprogram framtaget för förtroendevalda i bostadsrättsföreningar.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div>⭐⭐⭐⭐⭐</div>
          <div>4.9/5 av 400+ utvecklare</div>
        </div>
      </motion.div>
        
      {[
        {
          title: 'Kursmoduler',
          links: ['Bostadsrättsföreningen', 'GDPR', 'Diskrimineringslagen', 'Likhetsprincipen','Bostadsrättsföreningen', 'GDPR', 'Diskrimineringslagen',]
        },
        {
          title: 'Support',
          links: ['Kontakt', 'FAQ', 'Teknisk hjälp', 'Kod-support']
        },
        {
          title: 'Företag',
          links: ['Om oss', 'Integritetspolicy', 'Användarvillkor', 'Mentorprogram']
        }
      ].map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <h4 className="font-bold text-white mb-4">{section.title}</h4>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <motion.a
                  whileHover={{ color: '#FF5421', x: 5 }}
                  href="#"
                  className="hover:text-orange-500 transition-all cursor-pointer"
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
        
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
    >
      <p className="text-slate-400 text-sm">
        © 2025 Styrelsekörkortet. Alla rättigheter förbehållna.
      </p>
      <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm">
        <span className="flex items-center gap-2">
          <Lock size={14} />
          Säkra betalningar med faktura 30 dgr
        </span>
        <span className="flex items-center gap-2">
          <Shield size={14} />
          60 dagars garanti
        </span>
      </div>
    </motion.div>
  </div>
</footer>

         {/* Video Modal (Ligger korrekt inuti PremiumCoursePage's return) */}
            <VideoPopupHero
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoUrl={VIDEO_URL}
            />
        </div> 
    );
};

/* 
===========================================
ROUTING - ANVÄNDS NÄR DETTA BLIR APP.JSX
===========================================
Kommentera IN detta när du byter ut App.jsx

STEG FÖR ATT AKTIVERA:
1. Lägg till denna import högst upp i filen:
   import { Routes, Route, Navigate } from 'react-router-dom';

2. Kommentera bort: export default PremiumCoursePage;

3. Kommentera IN allt nedan (ta bort kommentartecknen)

const AppRoutes = () => {
  return (
    <Routes>
      {/* Publika routes *\/}
      <Route path="/" element={<PremiumCoursePage />} /> 
      <Route path="/anmalan" element={<LandingPage />} />
      <Route path="/course-form" element={<CourseFormPage />} />
      <Route path="/survey/:slug" element={<PublicSurvey />} />

      {/* Auth routes *\/}
      <Route path="/register" element={<TeamCodeRegister />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes - Member Dashboard *\/}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <TeamMemberDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes - Team Leader Dashboard *\/}
      <Route 
        path="/team-leader-dashboard" 
        element={
          <ProtectedRoute requireTeamLeader={true}>
            <TeamLeaderDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Team View (Privat teamsida med slug) *\/}
      <Route 
        path="/teams/:teamSlug" 
        element={
          <ProtectedRoute>
            <TeamView />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes - Admin Dashboard *\/}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes - Documents *\/}
      <Route 
        path="/documents" 
        element={
          <ProtectedRoute>
            <DocumentLibrary />
          </ProtectedRoute>
        } 
      />

      {/* Quiz routes *\/}
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/quizzes/:slug" element={<DynamicQuizPage />} />
      <Route path="/quizzes/:slug/leaderboard" element={<QuizLeaderboardPage />} />
      
      {/* Event routes *\/}
      <Route path="/events" element={<Events />} />
      <Route path="/events/:slug" element={<EventDetail />} />

      {/* Module routes *\/}
      <Route path="/modules" element={<ModulesPage />} />
      <Route path="/module/:slug" element={<ModulePage />} />
      
      {/* Blog routes *\/}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />

      {/* Other pages *\/}
      <Route path="/netflix" element={<NetflixPage />} />
      <Route path="/demo4" element={<DemoPage4 />} />
      <Route path="/adaptive-homework" element={<AdaptiveHomeworkApp />} />

      {/* 404 *\/}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Sidan hittades inte</p>
            <a 
              href="/" 
              className="bg-[#FF5421] text-white px-6 py-3 rounded-lg hover:bg-[#E04A1D] transition-colors inline-block"
            >
              Tillbaka till startsidan
            </a>
          </div>
        </div>
      } /> 
    </Routes>
  );
};

const App = () => {
  return (
    <EventsProvider>
      <TeamProvider>
        <SurveyProvider> 
          <DocumentProvider>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <AppRoutes />
          </DocumentProvider> 
        </SurveyProvider>
      </TeamProvider>
    </EventsProvider>
  );
};

export default App;

===========================================
SLUT PÅ KOMMENTERAD ROUTING-KOD
===========================================
*/

// 👇 TEMPORÄR EXPORT - Används NU när detta är en vanlig sida
export default Naringsklivet;
