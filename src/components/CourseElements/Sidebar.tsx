import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Award, ChevronDown, ChevronRight, X, Menu
} from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarMinimized: boolean;
  setIsSidebarMinimized: (minimized: boolean) => void;
  isDesktop: boolean;
  activeSection: string;
  completedLessons: Set<string>;
  courseContent: any[];
  totalPoints: number;
  progressPercentage: number;
  scrollToSection: (sectionId: string) => void;
  quizScore?: number;
  quizMaxScore?: number;
  quizCorrect?: number;
  quizIncorrect?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isSidebarMinimized,
  setIsSidebarMinimized,
  isDesktop,
  activeSection,
  completedLessons,
  courseContent,
  totalPoints,
  progressPercentage,
  scrollToSection,
  quizScore,
  quizMaxScore,
  quizCorrect,
  quizIncorrect
}) => {
  const isQuizActive = quizScore !== undefined && quizMaxScore !== undefined;
  
  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-30 lg:hidden text-white p-3 rounded-lg shadow-lg"
        style={{ backgroundColor: '#94A3B8' }}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        animate={{ 
          width: isDesktop ? (isSidebarMinimized ? 80 : 320) : 320,
          x: isDesktop ? 0 : (isSidebarOpen ? 0 : -320)
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{ backgroundColor: '#0f172a' }}
        className="fixed left-0 top-0 h-screen text-white z-50 overflow-y-auto custom-scrollbar"
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.3);
            border-radius: 10px;
            margin: 8px 0;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(100, 116, 139, 0.5);
            border-radius: 10px;
            transition: background 0.2s ease;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.7);
          }
          
          /* Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(100, 116, 139, 0.5) rgba(30, 41, 59, 0.3);
          }
        `}</style>
  
        <div className="p-6">
          {/* Logo/Title med minimize knapp */}
          <div className="flex items-center justify-between mb-8">
            {!isSidebarMinimized && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Styrelsens olika roller</h2>
                <p className="text-sm text-slate-400">Min kunskapsutveckling</p>
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
              {/* Kurs Progress (visas alltid) - GRÖN → #14b8a6 */}
              <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: '#1a2332' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Kurs Framsteg</span>
                  <span className="text-sm text-slate-400">{completedLessons.size}/{courseContent.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    style={{ background: 'linear-gradient(to right, #14b8a6, #0a4a61)' }}
                    className="h-2 rounded-full"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-slate-300">{totalPoints} poäng</span>
                </div>
              </div>

              {/* Quiz Stats (visas endast under quiz) */}
              {isQuizActive && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-lg p-4 border-2 border-[#FB923C]/40"
                  style={{ backgroundColor: '#1a2332' }}
                >
                  <div className="text-xs font-semibold text-[#FB923C] uppercase mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FF5421] rounded-full animate-pulse"></div>
                    Quiz Pågår
                  </div>
                  
                  {/* Poäng */}
                  <div className="mb-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm text-slate-300">Nuvarande Poäng</span>
                      <div>
                        <span className="text-3xl font-bold text-white">{quizScore}</span>
                        <span className="text-lg text-slate-400">/{quizMaxScore}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#FF5421] to-[#E04A1D] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(quizScore / quizMaxScore) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="mt-2 text-right text-slate-400 text-xs">
                      {Math.round((quizScore / quizMaxScore) * 100)}%
                    </div>
                  </div>

                  {/* Rätt/Fel - GRÖN → #2854A1*/}
                  {quizCorrect !== undefined && quizIncorrect !== undefined && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg px-3 py-2 border" style={{ backgroundColor: 'rgba(12, 83, 112, 0.2)', borderColor: 'rgba(12, 83, 112, 0.3)' }}>
                        <div className="text-xs font-medium mb-1" style={{ color: '#2854A1' }}>Rätt</div>
                        <div className="text-white font-bold text-xl">{quizCorrect}</div>
                      </div>
                      <div className="bg-red-500/20 rounded-lg px-3 py-2 border border-red-500/30">
                        <div className="text-red-400 text-xs font-medium mb-1">Fel</div>
                        <div className="text-white font-bold text-xl">{quizIncorrect}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          )}

          {/* Navigation */}
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
                          <CheckCircle className="w-3 h-3 absolute -top-1 -right-1" style={{ color: '#2854A1' }} />
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        {isCompleted && <CheckCircle className="w-4 h-4" style={{ color: '#2854A1' }} />}
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
                            <CheckCircle className="w-3 h-3 absolute -top-1 -right-1" style={{ color: '#0c5370' }} />
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          {isCompleted && <CheckCircle className="w-4 h-4" style={{ color: '#0c5370' }} />}
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
                            <CheckCircle className="w-3 h-3 absolute -top-1 -right-1" style={{ color: '#0c5370' }} />
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center space-x-3">
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          {isCompleted && <CheckCircle className="w-4 h-4" style={{ color: '#0c5370' }} />}
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
    </>
  );
};

export default Sidebar;