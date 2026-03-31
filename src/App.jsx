import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import QuizCard from './components/QuizCard';
import allQuizzes from './data/quizzes/index.js';
import DynamicQuizPage from './components/DynamicQuizPage';
import VideoPopupHero from './components/VideoPopupHero';
import SeminarierPage from './pages/SeminarierPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NewsCards from './components/blog/NewsCards';
import CoursePage from './pages/CoursePage';
import FinalQuiz from './pages/FinalQuiz'
import Events from './pages/Events';
import EventDetail from './pages/EventDetailPage';
import NetflixPage from './pages/NetflixPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import CourseFormPage from './pages/CourseFormPage';
import SimpleCourseForm from './components/SimpleCourseForm';
import PublicSurvey from './components/surveys/PublicSurvey';
import ScrollToTop from './components/ScrollToTop';
import { SurveyProvider } from './contexts/MockSurveyContext';
import { DocumentProvider } from './contexts/MockDocumentContext';
import { AdaptiveHomeworkApp } from './features/adaptive-quiz/App';
import DemoPage4 from './pages/DemoPages/DemoPage4';
import Styrelsekorkortet from './Styrelsekorkortet1';
import Aktiekorkortet from './Aktiekorkortet1';
import ModulesPage from './pages/Modules/ModulesPage';
import ModulePage from './pages/Modules/ModulePage';
import Navigation from './components/Navigation';
import PurchasePage from './pages/PurchasePage';
import { CompletionProvider } from './contexts/CompletionContext';
import { EventsProvider } from './contexts/EventsContext';
import DocumentLibrary from './components/admin/sections/documents/DocumentLibrary.jsx';
import TeamView from './pages/TeamView';
import { useTranslation } from 'react-i18next';
import './i18n';
import AdminDashboard from './components/admin/AdminDashboard';
import WhatYouGet from './components/WhatYouGet';
import QuizSalesPage from './pages/QuizSalesPage';
import VillkorPage from './pages/VillkorPage'
import IntegritetspolicyPage from './pages/IntegritetspolicyPage'
import OmOssPage from './pages/OmOssPage'

// Landing page section components
import HeroSection from './components/landing/HeroSection';
import FounderSection from './components/landing/FounderSection';
import SocialProofTicker from './components/landing/SocialProofTicker';
import WhySection from './components/landing/WhySection';
import ModulesSection from './components/landing/ModulesSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import QuizPromoSection from './components/landing/QuizPromoSection';

import FaqSection from './components/landing/FaqSection';
import SiteFooter from './components/landing/SiteFooter';
import FloatingCta from './components/landing/FloatingCta';

// Auth komponenter
import { TeamProvider, useTeam } from './contexts/MockTeamContext';
import TeamCodeRegister from './components/auth/TeamCodeRegister';
import LoginForm from './components/auth/LoginForm';
import TeamMemberDashboard from './components/auth/TeamMemberDashboard';
import TeamLeaderDashboard from './components/auth/TeamLeaderDashboard';
import MinaSidor from './pages/MinaSidor';

import {
  CheckCircle, Star, Users, Clock, Award, ChevronDown,
  Play, Phone, Mail, MapPin, Calendar, BookOpen, Target,
  ArrowRight, Quote, Shield, TrendingUp, FileText, Menu, X,
  AlertCircle, ThumbsUp, Video, Download, Lock, Zap
} from 'lucide-react';

// ─────────────────────────────────────────────
// Placeholder pages
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Protected Route
// ─────────────────────────────────────────────

const ProtectedRoute = ({ children, requireTeamLeader = false, requireAdmin = false }) => {
  const { isLoggedIn, isTeamLeader, currentUser } = useTeam();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (requireAdmin) {
    const isAdmin = currentUser?.email === 'admin@styrelsekorkortet.se';
    if (!isAdmin) return <Navigate to="/dashboard" replace />;
  }

  if (requireTeamLeader && !isTeamLeader) return <Navigate to="/dashboard" replace />;

  return children;
};

// ─────────────────────────────────────────────
// Language Switcher
// ─────────────────────────────────────────────

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
    { code: 'da', flag: '🇩🇰', name: 'Danska' },
    { code: 'no', flag: '🇳🇴', name: 'Norska' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="hidden md:flex items-center gap-2">
        {languages.map(lang => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`text-2xl p-2 rounded-lg transition-all ${
              i18n.language === lang.code ? 'bg-orange-100 ring-2 ring-orange-500' : 'hover:bg-gray-100'
            }`}
            title={lang.name}
          >
            {lang.flag}
          </motion.button>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl p-2 rounded-lg hover:bg-gray-100">
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
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { i18n.changeLanguage(lang.code); setIsOpen(false); }}
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

// ─────────────────────────────────────────────
// BRF-anpassade testimonials
// ─────────────────────────────────────────────

const testimonials = [
  {
    name: "Anna Lindqvist",
    role: "Styrelseordförande, BRF Solbacken",
    text: "Innan kursen kände jag mig alltid osäker på möten. Nu vet jag exakt vilket ansvar vi har och hur vi ska fatta beslut korrekt. Det har gett hela styrelsen ett lyft.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    result: "Tryggare i styrelserollen",
    beforeAfter: "Från osäker till kompetent styrelseledamot",
  },
  {
    name: "Marcus Bergström",
    role: "Kassaföre, BRF Högasten",
    text: "Ekonomidelen var ovärderlig. Jag förstår nu hur vi läser årsredovisningen och kan ställa rätt frågor till revisorn. Föreningen har sparat pengar tack vare bättre beslut.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    result: "Bättre ekonomisk kontroll",
    beforeAfter: "Från att gissa till att förstå siffrorna",
  },
  {
    name: "Eva Svensson",
    role: "Styrelseledamot, BRF Lillången",
    text: "Vi undvek en riktigt kostsam juridisk miss tack vare det jag lärde mig om underhållsansvar. Kursen betalade sig direkt.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    result: "Undvek kostsam juridisk miss",
    beforeAfter: "Från okunnig till föreningens trygghet",
  },
];

// ─────────────────────────────────────────────
// PremiumCoursePage – nu ren och oversiktlig
// ─────────────────────────────────────────────

const PremiumCoursePage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const VIDEO_URL = "https://www.youtube.com/embed/5K4fA0l4s04";

  useEffect(() => {
    const handleScroll = () => setShowFloatingCTA(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

     <HeroSection
  testimonials={testimonials}
  onVideoClick={() => setIsVideoModalOpen(true)}
/>

<FounderSection />

<SocialProofTicker />

<div id="transformation"><WhySection /></div>

<div id="content"><ModulesSection /></div>

<div id="results"><TestimonialsSection testimonials={testimonials} /></div>

<div id="guarantee"><WhatYouGet /></div>

<div id="faq"><FaqSection /></div>

<NewsCards />

     <FloatingCta show={showFloatingCTA} onClick={() => setIsFormModalOpen(true)} />

      {/* Kursanmälan modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setIsFormModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10"
              >
                <X size={20} className="text-gray-600" />
              </button>
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-center">
                  Säkra din plats i Styrelsekörkortet
                </h2>
                <p className="text-slate-600 mb-6 text-center text-sm sm:text-base">
                  Fyll i dina uppgifter så hör vi av oss inom en arbetsdag
                </p>
                <SimpleCourseForm />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuizPromoSection />

      <SiteFooter />

      <VideoPopupHero
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={VIDEO_URL}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// App Routes – OFÖRÄNDRAD
// ─────────────────────────────────────────────

const AppRoutes = () => {
  return (
    <Routes>
      {/* Publika routes */}
      <Route path="/" element={<PremiumCoursePage />} />
      <Route path="/anmalan" element={<LandingPage />} />
      <Route path="/course-form" element={<CourseFormPage />} />
      <Route path="/survey/:slug" element={<PublicSurvey />} />
      <Route path="/purchase/:courseId" element={<PurchasePage />} />
      <Route path="/testa-dig" element={<QuizSalesPage />} />
      <Route path="/mina-sidor" element={<MinaSidor />} />
      <Route path="/slutprov" element={<FinalQuiz />} />
      <Route path="/villkor" element={<VillkorPage />} />
      <Route path="/integritetspolicy" element={<IntegritetspolicyPage />} />
      <Route path="/om-oss" element={<OmOssPage />} />
      <Route path="/seminarier" element={<SeminarierPage />} />
      <Route path="/kurs/:slug" element={<CoursePage />} />

      {/* Auth routes */}
      <Route path="/register" element={<TeamCodeRegister />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected – Member Dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute><TeamMemberDashboard /></ProtectedRoute>
      } />

      {/* Protected – Team Leader Dashboard */}
      <Route path="/team-leader-dashboard" element={
        <ProtectedRoute requireTeamLeader={true}><TeamLeaderDashboard /></ProtectedRoute>
      } />

      {/* Protected – Team View */}
      <Route path="/teams/:teamSlug" element={
        <ProtectedRoute><TeamView /></ProtectedRoute>
      } />

      {/* Protected – Admin */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>
      } />

      {/* Protected – Documents */}
      <Route path="/documents" element={
        <ProtectedRoute><DocumentLibrary /></ProtectedRoute>
      } />

      {/* Quiz routes */}
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/quizzes/:slug" element={<DynamicQuizPage />} />
      <Route path="/quizzes/:slug/leaderboard" element={<QuizLeaderboardPage />} />

      {/* Events */}
      <Route path="/events" element={<Events />} />
      <Route path="/events/:slug" element={<EventDetail />} />

      {/* Modules */}
      <Route path="/modules" element={<ModulesPage />} />
      <Route path="/module/:slug" element={<ModulePage />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />

      {/* Ovriga sidor */}
      <Route path="/netflix" element={<NetflixPage />} />
      <Route path="/demo4" element={<DemoPage4 />} />
      <Route path="/styrelsekorkortet" element={<Styrelsekorkortet />} />
      <Route path="/aktiekorkortet" element={<Aktiekorkortet />} />
      <Route path="/adaptive-homework" element={<AdaptiveHomeworkApp />} />

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Sidan hittades inte</p>
            <a href="/"
              className="bg-[#FF5421] text-white px-6 py-3 rounded-lg hover:bg-[#E04A1D] transition-colors inline-block">
              Tillbaka till startsidan
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

// ─────────────────────────────────────────────
// App root – OFÖRÄNDRAD
// ─────────────────────────────────────────────

const App = () => {
  return (
    <EventsProvider>
      <TeamProvider>
        <CompletionProvider>
          <SurveyProvider>
            <DocumentProvider>
              <BrowserRouter>
                <ScrollToTop />
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
        </CompletionProvider>
      </TeamProvider>
    </EventsProvider>
  );
};

export default App;