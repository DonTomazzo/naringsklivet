import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle, Lock, Award, Download, ChevronLeft, 
  ChevronRight, Menu, X
} from 'lucide-react';
import { modulesData } from '../data/modules2';
import { useCompletion } from '../contexts/CompletionContext';
import { useTeam } from '../contexts/MockTeamContext';

const GlobalSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useTeam();
  const { 
    isModuleComplete, 
    getModuleProgress, 
    getCompletionPercentage,
    allModulesComplete 
  } = useCompletion();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  

  const completionPercent = getCompletionPercentage(modulesData.length);

  // Kolla skärmstorlek reaktivt
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // Stäng mobil-sidebar när man går till desktop
      if (desktop) setIsMobileOpen(false);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Uppdatera CSS-variabel för main content margin
  useEffect(() => {
    if (isDesktop) {
      document.documentElement.style.setProperty(
        '--sidebar-width',
        isMinimized ? '100px' : '320px'
      );
    } else {
      // På mobil: inget margin, sidebar lägger sig ovanpå
      document.documentElement.style.setProperty('--sidebar-width', '0px');
    }
  }, [isMinimized, isDesktop]);

  // Stäng mobil-sidebar vid navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

   useEffect(() => {
  if (!isDesktop) return;
  const timer = setTimeout(() => {
    setIsMinimized(true);
  }, 5000);
  return () => clearTimeout(timer);
}, [isDesktop, isMinimized]);

  const handleDiplomaDownload = () => {
    alert(`Grattis ${currentUser?.name}! Diplom laddas ner...`);
  };

  const sidebarWidth = isMinimized ? 100 : 320;

  return (
    <>
      {/* Overlay för mobil – stänger sidebar vid klick */}
      {isMobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Stäng meny" : "Öppna meny"}
        className="fixed top-3 right-4 z-50 lg:hidden bg-transparent p-2 rounded-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
{/* Sidebar */}
<motion.aside
  animate={{
    x: isDesktop ? 0 : isMobileOpen ? 0 : -sidebarWidth,
    width: sidebarWidth,
  }}
  transition={{ type: "tween", duration: 0.50, ease: "easeInOut" }}
  className="fixed left-0 top-0 h-screen bg-slate-900 text-white overflow-y-auto z-40 custom-scrollbar"
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
              <div>
                <h2 className="text-xl lg:text-2xl font-bold mb-1">Mina Moduler</h2>
                <p className="text-sm text-slate-400">
                  {currentUser?.name || 'Användare'}
                </p>
              </div>
            )}

            {/* Minimize-knapp – bara desktop */}
<button
  onClick={() => setIsMinimized(!isMinimized)}

              className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all border-2 border-slate-700 hover:border-[#FF5421] ml-auto"
              title={isMinimized ? "Visa mer" : "Dölj"}
            >
              {isMinimized ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium text-white">Dölj</span>
                </>
              )}
            </button>

            {/* Stäng-knapp – bara mobil */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden ml-auto p-2 rounded-lg hover:bg-slate-800"
              aria-label="Stäng"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Progress */}
              <div className="mb-6 bg-slate-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Total framsteg</span>
                  <span className="text-base font-bold text-[#FF5421]">{completionPercent}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercent}%` }}
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  {modulesData.filter(m => isModuleComplete(m.id)).length} av {modulesData.length} moduler klara
                </p>

                {allModulesComplete(modulesData.length) && (
                  <button
                    onClick={handleDiplomaDownload}
                    className="mt-3 w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
                  >
                    <Download size={20} />
                    Ladda ner diplom
                  </button>
                )}
              </div>

              {/* Module List */}
              <nav className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2 px-1">
                  Alla Moduler
                </h3>
                {modulesData.map((module, index) => {
                  const isComplete = isModuleComplete(module.id);
                  const progress = getModuleProgress(module.id);
                  const isActive = location.pathname.includes(module.slug);
                  const isLocked = false;

                  return (
                    <motion.button
                      key={module.id}
                      onClick={() => {
                        if (!isLocked) {
                          navigate(`/module/${module.slug}`);
                          setIsMobileOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      disabled={isLocked}
                      whileHover={{ x: isLocked ? 0 : 4 }}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#FF5421] text-white shadow-lg'
                          : isComplete
                          ? 'bg-green-900/30 text-green-100 hover:bg-green-900/50 border-2 border-green-700'
                          : isLocked
                          ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-transparent hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                              Modul {index + 1}
                            </span>
                            {isComplete && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
                            {isLocked && <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                          </div>
                          <h3 className="font-bold text-sm leading-tight truncate">{module.title}</h3>
                          <p className={`text-xs line-clamp-1 mt-0.5 ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                            {module.short_description}
                          </p>

                          {progress && (
                            <div className="mt-2 pt-2 border-t border-slate-700">
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Quiz:</span>
                                <span className={`text-xs font-bold ${progress.passed ? 'text-green-400' : 'text-amber-400'}`}>
                                  {progress.score}/{progress.maxScore}p
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </>
          )}

          {/* Minimerad vy */}
          {isMinimized && (
            <nav className="space-y-2">
              {modulesData.map((module, index) => {
                const isComplete = isModuleComplete(module.id);
                const isActive = location.pathname.includes(module.slug);
                return (
                  <motion.button
                    key={module.id}
                    onClick={() => {
                      navigate(`/module/${module.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.1 }}
                    className={`w-full h-12 flex items-center justify-center rounded-lg transition-all relative ${
                      isActive ? 'bg-[#FF5421]' : isComplete ? 'bg-green-900/30' : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`Modul ${index + 1}: ${module.title}`}
                  >
                    <span className="text-sm font-bold">{index + 1}</span>
                    {isComplete && (
                      <CheckCircle className="w-3 h-3 text-green-400 absolute top-1 right-1" />
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

export default GlobalSidebar;