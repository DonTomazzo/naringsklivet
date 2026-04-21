// src/components/SlideSidebar.tsx
// Sidebar för kursmoduler – visar avsnitt (slides) istället för kurser
// Samma utseende och funktioner som GlobalSidebar
// Används inuti ModuleAIGrunderna och alla andra moduler

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, Award, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

const O = '#FF5421';

interface Slide {
  id: string;
  title: string;
}

interface SlideSidebarProps {
  slides: Slide[];
  currentIndex: number;
  completedLessons: Set<string>;
  onNavigate: (index: number) => void;
  courseTitle?: string;
  userName?: string;
  onDiplomaDownload?: () => void;
}

const SlideSidebar: React.FC<SlideSidebarProps> = ({
  slides,
  currentIndex,
  completedLessons,
  onNavigate,
  courseTitle = 'Kursavsnitt',
  userName = '',
  onDiplomaDownload,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const completedCount = slides.filter(s => completedLessons.has(s.id)).length;
  const completionPercent = Math.round((completedCount / slides.length) * 100);
  const allComplete = completedCount === slides.length;

  // Skärmstorlek reaktivt
  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsMobileOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // CSS-variabel för main content margin
  useEffect(() => {
    if (isDesktop) {
      document.documentElement.style.setProperty(
        '--sidebar-width',
        isMinimized ? '100px' : '320px'
      );
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
  }, [isMinimized, isDesktop]);

  // Auto-minimera efter 5s på desktop
  useEffect(() => {
    if (!isDesktop) return;
    const timer = setTimeout(() => setIsMinimized(true), 5000);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  // Stäng mobil-sidebar vid navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentIndex]);

  const sidebarWidth = isMinimized ? 100 : 320;

  // Avsnitt-emoji baserat på titel
  const getEmoji = (title: string): string => {
    if (title.includes('🧠')) return '🧠';
    if (title.includes('🎯')) return '🎯';
    if (title.includes('🎮')) return '🎮';
    if (title.includes('Quiz') || title.includes('Kunskapstest')) return '🧠';
    if (title.includes('Sluttest') || title.includes('Slutprov')) return '🎯';
    if (title.includes('Intro')) return '👋';
    return '▸';
  };

  const getCleanTitle = (title: string): string =>
    title.replace(/^[🧠🎯🎮👋▸]\s*/, '').trim();

  return (
    <>
      {/* Mobil overlay */}
      {isMobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobil toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Stäng meny' : 'Öppna meny'}
        className="fixed top-3 right-4 z-50 lg:hidden bg-transparent p-2 rounded-lg"
      >
        {isMobileOpen
          ? <X className="w-6 h-6 text-white" />
          : <Menu className="w-6 h-6 text-white" />
        }
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{
          x: isDesktop ? 0 : isMobileOpen ? 0 : -sidebarWidth,
          width: sidebarWidth,
        }}
        transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen text-white overflow-y-auto z-40 custom-scrollbar"
        style={{ background: '#0f172a' }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(30,41,59,0.3); border-radius: 10px; margin: 8px 0; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.5); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.7); }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(100,116,139,0.5) rgba(30,41,59,0.3); }
        `}</style>

        <div className="p-4 lg:p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            {!isMinimized && (
              <div className="flex-1 min-w-0 pr-2">
                <h2 className="text-base font-bold leading-tight truncate">{courseTitle}</h2>
                {userName && (
                  <p className="text-sm text-slate-400 truncate mt-0.5">{userName}</p>
                )}
              </div>
            )}

            {/* Minimize – desktop */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all border-2 border-slate-700 hover:border-[#FF5421] ml-auto flex-shrink-0"
              title={isMinimized ? 'Visa mer' : 'Dölj'}
            >
              {isMinimized
                ? <ChevronRight className="w-5 h-5 text-white" />
                : <>
                    <ChevronLeft className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">Dölj</span>
                  </>
              }
            </button>

            {/* Stäng – mobil */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden ml-auto p-2 rounded-lg hover:bg-slate-800"
              aria-label="Stäng"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Utökad vy */}
          {!isMinimized && (
            <>
              {/* Progress */}
              <div className="mb-6 bg-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Framsteg</span>
                  <span className="text-base font-bold" style={{ color: O }}>
                    {completionPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-3 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)' }}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  {completedCount} av {slides.length} avsnitt klara
                </p>

                {allComplete && onDiplomaDownload && (
                  <button
                    onClick={onDiplomaDownload}
                    className="mt-3 w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    <Award size={18} />
                    Hämta kursbevis
                  </button>
                )}
              </div>

              {/* Avsnittslista */}
              <nav className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3 px-1 tracking-widest">
                  Avsnitt
                </h3>
                {slides.map((slide, index) => {
                  const isActive = index === currentIndex;
                  const isComplete = completedLessons.has(slide.id);
                  const isQuiz = slide.title.toLowerCase().includes('quiz') ||
                                 slide.title.toLowerCase().includes('kunskapstest') ||
                                 slide.title.toLowerCase().includes('sluttest') ||
                                 slide.title.toLowerCase().includes('slutprov');

                  return (
                    <motion.button
                      key={slide.id}
                      onClick={() => onNavigate(index)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all border-2 ${
                        isActive
                          ? 'text-white shadow-lg border-transparent'
                          : isComplete
                          ? 'bg-green-900/25 text-green-100 hover:bg-green-900/40 border-green-800/50'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-transparent hover:border-slate-600'
                      }`}
                      style={isActive ? { background: O, borderColor: 'transparent' } : {}}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Nummer eller check */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                          style={{
                            background: isActive
                              ? 'rgba(255,255,255,0.25)'
                              : isComplete
                              ? 'rgba(34,197,94,0.2)'
                              : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          {isComplete && !isActive
                            ? <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                            : <span style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.5)', fontSize: 10 }}>
                                {index + 1}
                              </span>
                          }
                        </div>

                        {/* Titel */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold leading-tight truncate ${
                            isActive ? 'text-white' : isComplete ? 'text-green-100' : 'text-slate-300'
                          }`}>
                            {slide.title}
                          </p>
                          {isQuiz && (
                            <p className={`text-xs mt-0.5 ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                              Kunskapstest
                            </p>
                          )}
                        </div>

                        {/* Aktiv indikator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </>
          )}

          {/* Minimerad vy */}
          {isMinimized && (
            <nav className="space-y-1.5">
              {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                const isComplete = completedLessons.has(slide.id);

                return (
                  <motion.button
                    key={slide.id}
                    onClick={() => onNavigate(index)}
                    whileHover={{ scale: 1.1 }}
                    title={`${index + 1}. ${slide.title}`}
                    className="w-full h-10 flex items-center justify-center rounded-lg transition-all relative"
                    style={{
                      background: isActive
                        ? O
                        : isComplete
                        ? 'rgba(34,197,94,0.2)'
                        : 'rgba(30,41,59,0.8)',
                    }}
                  >
                    <span className="text-xs font-bold text-white/80">{index + 1}</span>
                    {isComplete && !isActive && (
                      <CheckCircle className="w-3 h-3 text-green-400 absolute top-0.5 right-0.5" />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          )}

        </div>
      </motion.aside>
    </>
  );
};

export default SlideSidebar;