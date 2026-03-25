import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QuizCard from './components/QuizCard';
import allQuizzes from './data/quizzes/index.js';
import DynamicQuizPage from './components/DynamicQuizPage';
import VideoPopupHero from './components/VideoPopupHero'; 
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NewsCards from './components/blog/NewsCards';
import Events from './pages/Events';
import EventDetail from './pages/EventDetailPage';
import AnimatedHeroImage from './components/AnimatedHeroImage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import CourseFormPage from './pages/CourseFormPage';
import SimpleCourseForm from './components/SimpleCourseForm';
import PublicSurvey from './components/surveys/PublicSurvey';
import { SurveyProvider } from './contexts/MockSurveyContext';
import { DocumentProvider } from './contexts/MockDocumentContext';
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


const PremiumCoursePage = () => {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [showDevMenu, setShowDevMenu] = useState(false);
  

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
          <div className="flex justify-between items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1"
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
                  <span className="text-[#FF5421]"> ...Vibe</span>coding-Bootcamp
                </div>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'Transformationen', id: 'transformation' },
                { name: 'Resultat', id: 'results' },
                { name: 'Kodinnehåll', id: 'content' },
                { name: 'Garanti', id: 'guarantee' },
                { name: 'Vanliga frågor', id: 'faq' } 
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
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
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

      {/* Hero Section with Background Image */}
      <section 
        className="pt-16 pb-20 relative min-h-screen flex items-center bg-no-repeat"
      >
        <img 
          src="https://wzpjchonkpandfuiofcb.supabase.co/storage/v1/object/public/course_thumbnails/c1.jpg" 
          alt="Bakgrundsbild för Vibecoding-kurs"
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/75"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              
              
              
              <h1 className="text-5xl font-bold text-white leading-tight">
                <span style={{ color: '#FF5421' }}>Kvalitetssäkra </span> din kodbas idag och få en 
                <span style={{ color: '#FF5421' }}> 'senior developer vibe'</span>
              </h1>

                    
              <div className="space-y-4">
                <p className="text-xl text-white/90">
                  Om 8 veckor kommer du att vara den utvecklare som:
                </p>
                <ul className="space-y-3">
                  {[
                    "Skriver Clean Code som är lätt att underhålla",
                    "Leder komplicerade arkitekturdiskussioner med självförtroende", 
                    "Sparar företaget tusentals kronor genom optimerad prestanda",
                    "Hanterar merge-konflikter och teamets 'vibe' innan de exploderar"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="text-green-400 mt-1" size={20} />
                      <span className="text-white/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
                >
                  <Zap size={24} />
                  JA, jag vill höja min Vibe!
                </motion.button>
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  // [NYTT] När du klickar på knappen, sätt state till true (öppna modalen)
                  onClick={() => setIsVideoModalOpen(true)}
                  
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Video size={20} />
                  Se transformation (2 min)
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 3).map((person, index) => (
                      <img 
                        key={index}
                        src={person.image} 
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt=""
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/80">1450+ nöjda utvecklare</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-white/80 ml-2">4.9/5 betyg</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm animate-pulse">
                  12 platser kvar
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-slate-900">Exklusivt Bootcamp</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-2xl text-slate-500 line-through">5 995 kr</span>
                    <span className="text-4xl font-bold" style={{ color: '#FF5421' }}>3 995 kr</span>
                  </div>
                  <div className="text-slate-600 mt-2">Spara 2 000 kr - bara denna vecka</div>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    "✅ 8 veckors steg-för-steg kod-transformation",
                    "✅ 15+ praktiska kodmallar och blueprints", 
                    "✅ Livstidsåtkomst + alla kursuppdateringar",
                    "✅ Certifikat i Senior Vibecoding",
                    "✅ 60 dagars Pengarna-Tillbaka Vibe-Garanti"
                  ].map((feature, index) => (
                    <div key={index} className="text-slate-700">{feature}</div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-slate-950 to-slate-950 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg"
                >
                  🔒 Säkra min plats nu
                </motion.button>
                
                <div className="text-center mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Lock size={14} />
                    <span>Säker betalning med Klarna/Swish</span>
                  </div>

                  
                  <div className="text-xs text-slate-500">
                    Nästa omgång startar {timeLeft.days} dagar, {timeLeft.hours}h, {timeLeft.minutes}min
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        
        </div>
      </section>

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

     {/* Features Section with Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full font-semibold mb-4">
              VARFÖR VIBECODING?
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Komplett Bootcamp för moderna utvecklare
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "All inclusive Stack",
                subtitle: "Frontend, Backend & Deployment",
                icon: "📚",
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Senior Developers", 
                subtitle: "Lär av branschens ledande experter",
                icon: "👨‍💻", // Ändrad från 👨‍🏫 till 👨‍💻
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Livstidsåtkomst",
                subtitle: "Koda och lär dig i din egen takt",
                icon: "🕐",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[4/3] relative">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
              <div className="inline-block px-4 py-2 text-white rounded-full font-semibold mb-4" style={{ backgroundColor: '#FF5421' }}>
                  DIN 8-VECKORS TRANSFORMATION
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  Från junior till senior Vibecoder i 4 enkla steg
              </h2>
              {/* Jag tog bort mx-auto från p-taggen då dess förälder är centrerad */}
              <p className="text-xl text-slate-600 max-w-3xl mx-auto"> 
                  Följ vår beprövade process som redan hjälpt 1450+ utvecklare att skriva clean, buggfri kod
              </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* allQuizzes och QuizCard behålls som de är tills vidare */}
          {allQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }} // Skapar staggered effekt
            >
              <QuizCard
                quiz={quiz}
                index={index}
                // OBS: Vi behåller de oanvända propsen här temporärt.
                // Vi tar bort dem i nästa steg om du vill.
                rating={4.8}
                students={1200 + index * 50}
                duration="2h 30min"
                variant="grid"
              />
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Transformation Journey with Images */}
      <section id="transformation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 text-white rounded-full font-semibold mb-4" style={{ backgroundColor: '#FF5421' }}>
              DIN 8-VECKORS KOD-TRANSFORMATION
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Från osäker kodare till senior Vibecoder i 4 enkla steg
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Följ vår beprövade process som redan hjälpt 1450+ utvecklare att bli trygga och kompetenta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* transformationSteps används från del 1 och är redan uppdaterade. */}
            {transformationSteps.map((step, index) => {
              // Ikonhantering måste vara korrekt i din miljö (t.ex. med Lucide-React eller liknande)
              // För att undvika fel behåller jag endast de ändrade textsträngarna här.
              // Ikonhanteringen som använder 'Shield', 'TrendingUp', etc. behålls tekniskt sett som den var.
              // const Icon = step.icon; 
              // Eftersom jag inte har tillgång till dina importerade komponenter (Icon, ArrowRight, etc.)
              // antar jag att de fungerar i din miljö och fokuserar på texten.
              
              const iconKey = step.icon; // Shield, TrendingUp, Users, Award
              const IconComponent = iconMap[iconKey]; // Ikon-mappning från del 1
              
              // NOTE: Jag behåller koden som du skickade, men byter ut JSX-ikon-komponenter till emoji-mappningen från del 1,
              // för att kunna visa resultatet korrekt i denna kontext. Du måste justera detta beroende på dina faktiska ikon-komponenter.
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 h-full hover:shadow-2xl transition-shadow">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/40"></div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-xs font-bold" style={{ color: '#FF5421' }}>{step.phase}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                         {/* Använder emoji från iconMap för att simulera ikonen */}
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: '#FF5421' }}>
                           {IconComponent}
                        </div>
                        {/* Den ursprungliga koden använde: <Icon className="text-white" size={24} /> */}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < transformationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 rounded-full flex items-center justify-center transform -translate-y-1/2 z-10" style={{ backgroundColor: '#FF5421' }}>
                      {/* Placeholder for ArrowRight component */}
                      → 
                      {/* Den ursprungliga koden använde: <ArrowRight className="text-white" size={16} /> */}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
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
              Verklig kod, Verkliga framgångshistorier
            </h2>
            <p className="text-xl text-white/80">
              Se exakt vad som händer när du går från junior till senior developer vibe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{testimonials[activeTestimonial].name}</div>
                      <div className="text-slate-600">{testimonials[activeTestimonial].role}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-800 text-lg italic mb-4">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="font-bold text-green-600 text-lg mb-1">
                      🎯 Konkret resultat: {testimonials[activeTestimonial].result}
                    </div>
                    <div className="text-slate-600">
                      {testimonials[activeTestimonial].beforeAfter}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeTestimonial === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/95 backdrop-blur-sm text-slate-900 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Genomsnittlig Vibe Boost:</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '40%', label: 'Färre buggar i produktion' },
                    { number: '87%', label: 'Känner sig säkrare i sin roll' },
                    { number: '4.9/5', label: 'Snittbetyg på kursen' },
                    { number: '94%', label: 'Rekommenderar till kollegor' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#FF5421' }}>{stat.number}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50/95 border border-green-200 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp className="text-green-600" size={24} />
                  <span className="font-bold text-green-800">100% Vibe-Garanti</span>
                </div>
                <p className="text-green-700">
                  Om du inte känner att din kod-vibe och ditt självförtroende höjts betydligt efter 60 dagar, 
                  får du alla pengar tillbaka. Inga krångliga villkor.
                </p>
              </div>
            </motion.div>
          </div>
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
              imagePath="/BILD.png"
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

     {/* Guarantee Video Section */}
<section 
  id="guarantee" 
  className="py-20 relative bg-cover bg-center bg-no-repeat"
  style={{ 
    // Behåll din ursprungliga bakgrundsbild
    backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
  }}
>
  <div className="absolute inset-0 bg-green-900/80"></div>
    
  <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
    {/* Jag behåller motion.div, men ersätter innehållet med video-containern */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20"
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Förstå vår **Kod- & Resultatgaranti**
      </h2>
        
      {/* 🎥 Responsiv YouTube Embed Container (Använder inbyggd CSS/Tailwind för responsivitet) */}
      <div 
        className="relative mb-6 mx-auto w-full" 
        style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '800px' }} // 16:9 aspect ratio
      >
        <iframe
          // BYT UT DENNA VIDEO TILL EN SOM HANDLAR OM KODNING/AI ELLER GARANTIER
          src="https://www.youtube.com/embed/VQjdgCfopqc?si=FFu6uHIeJw1PG1xc" 
          title="3 Insider Tips: How to Give a Money Back Guarantee Without Getting a TON of Refunds"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
        ></iframe>
      </div>
        
      <p className="text-xl text-slate-700 leading-relaxed mb-8">
        Vi är så säkra på att den här kursen kommer att ge dig en **fullt fungerande AI-driven Fullstack-app** att vi backar upp den med en **komplett 60-dagars 'Nöjd eller Pengarna Tillbaka' garanti**. Följ stegen, bygg appen – om det inte funkar får du pengarna tillbaka. Vi tar all risk!
      </p>

      {/* Fotnotsektion */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          {/* Använd dina egna ikonkomponenter här (Shield/CheckCircle) */}
          <CheckCircle className="text-green-600" size={16} />
          <span>Säker betalning</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" size={16} />
          <span>Omedelbar tillgång till koden</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" size={16} />
          <span>**60-dagars full återbetalning**</span>
        </div>
      </div>
    </motion.div>
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

{/* Final CTA Section */}
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
      <div className="inline-block px-4 py-2 bg-slate-950 text-white rounded-full font-bold mb-6 animate-pulse">
        ⏰ ENDAST 10 PLATSER KVAR!
      </div>
        
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Ditt val just nu avgör om du blir **AI-utvecklaren** eller **åskådaren**
      </h2>
        
      <p className="text-xl text-white/90 mb-8 leading-relaxed">
        Om 8 veckor kan du antingen ha en **lanseringklar fullstack-app** med <span className="font-bold" style={{ color: '#FF5421' }}>kraftfulla AI-funktioner</span>, eller <span className="text-red-400 font-bold">fortfarande sitta fast</span> i tutorial-träsket.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-red-400 mb-4">❌ Utan Vibecoding:</h3>
          <ul className="text-left space-y-2 text-white/90">
            <li>• Fortsätta lära dig gammal, icke-AI-relevant kod</li>
            <li>• Missa chansen att bli snabbast på marknaden</li>
            <li>• Få svårt att integrera moderna AI API:er</li>
            <li>• Förbli beroende av svaga online-tutorials</li>
          </ul>
        </div>
            
        <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-green-400 mb-4">✅ Med Vibecoding:</h3>
          <ul className="text-left space-y-2 text-white/90">
            <li>• **Bygg en komplett app** på 8 veckor</li>
            <li>• Lär dig integrera OpenAI:s API sömlöst</li>
            <li>• Få en kodbas redo för produktion</li>
            <li>• Få 1-mot-1 hjälp när du fastnar</li>
          </ul>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm text-slate-900 rounded-2xl p-8 mb-8 max-w-lg mx-auto border border-white/20">
        <div className="text-center">
          <div className="text-sm text-slate-600 mb-2">Specialpris slutar om:</div>
          <div className="flex justify-center gap-4 mb-4">
            {[
              // HÄR MÅSTE DU ERSÄTTA 'timeLeft' MED DE FAKTISKA variablerna från din komponent
              { value: timeLeft.days, label: 'dagar' },
              { value: timeLeft.hours, label: 'timmar' }, 
              { value: timeLeft.minutes, label: 'min' }
            ].map((time, index) => (
              <div key={index} className="bg-slate-900 text-white px-3 py-2 rounded-lg">
                <div className="text-2xl font-bold">{time.value}</div>
                <div className="text-xs">{time.label}</div>
              </div>
            ))}
          </div>
            
          <div className="text-3xl font-bold mb-2" style={{ color: '#FF5421' }}>**2 995 kr**</div>
          <div className="text-sm text-slate-600 line-through mb-4">Ordinarie pris: 4 995 kr</div>
            
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-xl mb-4"
          >
            🚀 JA, jag vill bygga min AI-app nu!
          </motion.button>
            
          <div className="text-xs text-slate-600 space-y-1">
            <div>✅ Omedelbar tillgång till koden</div>
            <div>✅ 60 dagars Resultatgaranti</div>
            <div>✅ Säker betalning via Stripe/Swish</div>
          </div>
        </div>
      </div>
        
      <p className="text-white/80 text-sm">
        Över 400+ utvecklare har redan börjat bygga sin Fullstack-app med AI. 
        <span className="font-semibold" style={{ color: '#FF5421' }}>Vad väntar du på?</span>
      </p>
    </motion.div>
  </div>
</section>

{/* --- */}

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
        Säkra din plats nu - **2 995 kr**
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
            **Säkra din plats!** Bygg din AI-app nu 🚀
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
<footer className="bg-slate-900 text-slate-300 py-12">
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
            src="/vibecoding-logo.png" 
            alt="Vibecoding Logotyp"
            width={32}
            height={32}
            className="object-contain" 
          />
          <div className="text-xl font-bold text-white">
            <span className="text-[#FF5421]"> Vibe</span>coding
          </div>
        </div>
        <p className="text-slate-400 mb-4">
          Framtidens kodningsutbildning. Lär dig bygga skalbara fullstack-applikationer med fokus på moderna API:er och AI-integration.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div>⭐⭐⭐⭐⭐</div>
          <div>4.9/5 av 400+ utvecklare</div>
        </div>
      </motion.div>
        
      {[
        {
          title: 'Kurser',
          links: ['Fullstack AI Bootcamp', 'Backend med Node.js', 'Frontend med React', 'AI & Prompt Engineering']
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
        © 2024 Vibecoding. Alla rättigheter förbehållna.
      </p>
      <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm">
        <span className="flex items-center gap-2">
          <Lock size={14} />
          Säkra betalningar
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Publika routes */}
      <Route path="/" element={<PremiumCoursePage />} /> 
      <Route path="/anmalan" element={<LandingPage />} />
      <Route path="/course-form" element={<CourseFormPage />} />
      <Route path="/survey/:slug" element={<PublicSurvey />} />

      {/* Auth routes */}
      <Route path="/register" element={<TeamCodeRegister />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes - Member Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <TeamMemberDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Protected routes - Team Leader Dashboard */}
      <Route 
        path="/team-leader-dashboard" 
        element={
          <ProtectedRoute requireTeamLeader={true}>
            <TeamLeaderDashboard />
          </ProtectedRoute>
        } 
      />

      {/* ⭐ NY - Team View (Privat teamsida med slug) */}
      <Route 
        path="/teams/:teamSlug" 
        element={
          <ProtectedRoute>
            <TeamView />
          </ProtectedRoute>
        } 
      />

      {/* ⭐ Protected routes - Admin Dashboard */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* ⭐ Protected routes - Documents (NY - LÄGG TILL DENNA) */}
<Route 
  path="/documents" 
  element={
    <ProtectedRoute>
      <DocumentLibrary />
    </ProtectedRoute>
  } 
/>

      {/* Quiz routes */}
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/quizzes/:slug" element={<DynamicQuizPage />} />
      <Route path="/quizzes/:slug/leaderboard" element={<QuizLeaderboardPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:slug" element={<EventDetail />} />
      
      {/* Blog routes */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />

      {/* 404 */}
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
            <BrowserRouter>
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
            </BrowserRouter>
          </DocumentProvider> 
        </SurveyProvider>
      </TeamProvider>
    </EventsProvider>
  );
};

export default App;