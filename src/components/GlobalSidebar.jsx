import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Award, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { modulesData } from '../data/modules2';
import { useCompletion } from '../contexts/CompletionContext';
import { useTeam } from '../contexts/MockTeamContext';

const C = {
  orange:  '#FF5421',
  orangeL: '#FFF0EB',
  navy:    '#171f32',
  dark:    '#1A1A1A',
  mid:     '#4A4A4A',
  muted:   '#9CA3AF',
  bg:      '#FFFFFF',
  bgAlt:   '#FAFAF8',
  border:  '#E8E5E0',
  green:   '#22C55E',
  greenL:  '#F0FDF4',
  greenB:  '#BBF7D0',
  greenT:  '#166534',
};

const GlobalSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useTeam();
  const {
    isModuleComplete,
    getModuleProgress,
    getCompletionPercentage,
    allModulesComplete,
  } = useCompletion();

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const completionPercent = getCompletionPercentage(modulesData.length);
  const modulesCompleted  = modulesData.filter(m => isModuleComplete(m.id)).length;

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

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isDesktop ? (isMinimized ? '64px' : '280px') : '0px'
    );
  }, [isMinimized, isDesktop]);

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!isDesktop) return;
    const t = setTimeout(() => setIsMinimized(true), 5000);
    return () => clearTimeout(t);
  }, [isDesktop, isMinimized]);

  const handleDiplomaDownload = () =>
    alert(`Grattis ${currentUser?.name}! Diplom laddas ner...`);

  const sidebarWidth = isMinimized ? 64 : 280;

  return (
    <>
      {isMobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <button
        onClick={() => setIsMobileOpen(p => !p)}
        aria-label={isMobileOpen ? 'Stäng meny' : 'Öppna meny'}
        className="fixed top-3 right-4 z-50 lg:hidden p-2 rounded-lg"
        style={{ background: C.orangeL, color: C.orange }}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <motion.aside
        animate={{
          x: isDesktop ? 0 : isMobileOpen ? 0 : -sidebarWidth,
          width: sidebarWidth,
        }}
        transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen overflow-y-auto z-40"
        style={{
          background: C.bg,
          borderRight: `1px solid ${C.border}`,
          scrollbarWidth: 'thin',
          scrollbarColor: `${C.border} transparent`,
        }}
      >
        <div className="h-full overflow-y-auto">
          <div style={{ padding: isMinimized ? '20px 10px' : '20px 16px' }}>

            {/* ── HEADER ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              {!isMinimized && (
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: C.orange, fontFamily: "'Nunito', sans-serif", marginBottom: 2 }}>
                    Mina Moduler
                  </h2>
                  <p style={{ fontSize: 12, color: C.muted }}>
                    {currentUser?.name || 'Användare'}
                  </p>
                </div>
              )}

              <button
                onClick={() => setIsMinimized(p => !p)}
                className="hidden lg:flex items-center gap-1.5 ml-auto rounded-lg px-2.5 py-2 transition-all"
                style={{
                  background: C.bgAlt,
                  border: `1px solid ${C.border}`,
                  color: C.mid,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title={isMinimized ? 'Visa mer' : 'Dölj'}
              >
                {isMinimized
                  ? <ChevronRight className="w-4 h-4" style={{ color: C.orange }} />
                  : (
                    <>
                      <ChevronLeft className="w-4 h-4" style={{ color: C.orange }} />
                      <span style={{ color: C.mid }}>Dölj</span>
                    </>
                  )
                }
              </button>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden ml-auto p-2 rounded-lg"
                style={{ color: C.mid }}
                aria-label="Stäng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ══════════════════════════════
                EXPANDED
            ══════════════════════════════ */}
            {!isMinimized && (
              <div>
                {/* Progress pill+prickar */}
                <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.orange }}>Framsteg</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.orange }}>
                      {modulesCompleted}/{modulesData.length}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                    {modulesData.map((module, i) => {
                      const done   = isModuleComplete(module.id);
                      const active = location.pathname.includes(module.slug);
                      return (
                        <motion.div
                          key={module.id}
                          onClick={() => navigate(`/module/${module.slug}`)}
                          animate={{
                            width:           active ? 24 : 6,
                            height:          6,
                            borderRadius:    active ? 3 : '50%',
                            backgroundColor: active ? C.orange : done ? C.orange : '#D1D5DB',
                            opacity:         done && !active ? 0.35 : 1,
                          }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ flexShrink: 0, cursor: 'pointer' }}
                          title={`Modul ${i + 1}`}
                        />
                      );
                    })}
                  </div>

                  {allModulesComplete(modulesData.length) && (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleDiplomaDownload}
                      style={{
                        marginTop: 12, width: '100%',
                        padding: '9px', borderRadius: 10,
                        background: C.orange, color: '#fff',
                        fontSize: 13, fontWeight: 700,
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 6,
                        boxShadow: `0 4px 16px ${C.orange}40`,
                      }}
                    >
                      <Award size={14} />
                      Ladda ner diplom
                    </motion.button>
                  )}
                </div>

                {/* Modul-lista */}
                <nav>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {modulesData.map((module, index) => {
                      const isComplete = isModuleComplete(module.id);
                      const progress   = getModuleProgress(module.id);
                      const isActive   = location.pathname.includes(module.slug);

                      return (
                        <motion.button
                          key={module.id}
                          onClick={() => {
                            navigate(`/module/${module.slug}`);
                            setIsMobileOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 4px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: `1px solid ${C.border}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12,
                            position: 'relative',
                          }}
                        >
                          {/* Active streck */}
                          {isActive && (
                            <div style={{
                              position: 'absolute',
                              left: -16, top: '20%', bottom: '20%',
                              width: 3, borderRadius: 2,
                              background: C.orange,
                            }} />
                          )}

                          {/* Siffra */}
                          <span style={{
                            fontSize: 17,
                            fontWeight: 800,
                            fontFamily: "'Nunito', sans-serif",
                            letterSpacing: '0.02em',
                            flexShrink: 0,
                            lineHeight: 1.25,
                            minWidth: 26,
                            color: isActive
                              ? C.orange
                              : isComplete
                              ? `${C.orange}66`
                              : `${C.orange}35`,
                            transition: 'color 0.2s',
                          }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          {/* Text */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                              <p style={{
                                fontSize: 13,
                                fontWeight: 700,
                                lineHeight: 1.3,
                                color: isActive ? C.orange : C.dark,
                              }}>
                                {module.title}
                              </p>
                              {isComplete && (
                                <CheckCircle style={{ width: 12, height: 12, color: C.green, flexShrink: 0 }} />
                              )}
                            </div>
                            <p style={{
                              fontSize: 11,
                              color: C.muted,
                              lineHeight: 1.5,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}>
                              {module.short_description}
                            </p>
                            {progress && (
                              <div style={{
                                marginTop: 5, paddingTop: 5,
                                borderTop: `1px solid ${C.border}`,
                                display: 'flex', justifyContent: 'space-between',
                              }}>
                                <span style={{ fontSize: 10, color: C.muted }}>Quiz:</span>
                                <span style={{
                                  fontSize: 10, fontWeight: 700,
                                  color: progress.passed ? C.green : '#F59E0B',
                                }}>
                                  {progress.score}/{progress.maxScore}p
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </nav>
              </div>
            )}

            {/* ══════════════════════════════
                MINIMERAD — stora siffror
            ══════════════════════════════ */}
            {isMinimized && (
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {modulesData.map((module, index) => {
                  const isComplete = isModuleComplete(module.id);
                  const isActive   = location.pathname.includes(module.slug);

                  return (
                    <motion.button
                      key={module.id}
                      onClick={() => {
                        navigate(`/module/${module.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      title={module.title}
                      style={{
                        width: '100%',
                        padding: '10px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: `1px solid ${C.border}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {/* Active streck vänster */}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          left: 0, top: '25%', bottom: '25%',
                          width: 3, borderRadius: 2,
                          background: C.orange,
                        }} />
                      )}

                      <span style={{
                        fontSize: 15,
                        fontWeight: 800,
                        fontFamily: "'Nunito', sans-serif",
                        letterSpacing: '0.02em',
                        color: isActive
                          ? C.orange
                          : isComplete
                          ? `${C.orange}66`
                          : `${C.orange}35`,
                        transition: 'color 0.2s',
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Grön check badge */}
                      {isComplete && !isActive && (
                        <div style={{
                          position: 'absolute',
                          top: 5, right: 5,
                          width: 10, height: 10,
                          borderRadius: '50%',
                          background: C.green,
                          border: `1.5px solid ${C.bg}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                            <polyline points="1.5,4 3,6 6.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            )}

          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default GlobalSidebar;