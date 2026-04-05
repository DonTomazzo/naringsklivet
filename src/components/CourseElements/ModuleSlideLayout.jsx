// src/components/CourseElements/ModuleSlideLayout.jsx
// Horisontell slide-navigation wrapper för kursmoduler.
// Kontrollbar i YouTube/SVTPlay-stil med fullscreen, volym och progress.

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight,
  Maximize2, Minimize2,
  Volume2, VolumeX, Volume1,
  SkipBack, SkipForward,
} from 'lucide-react';
import AudioPlayerCompact from '../AudioPlayerCompact';

// ─────────────────────────────────────────────
// PROGRESSBAR (tunn linje längst upp)
// ─────────────────────────────────────────────
export const SlideProgressBar = ({ total, current }) => (
  <div className="w-full h-1 bg-white/10 flex-shrink-0">
    <motion.div
      className="h-full bg-[#FF5421]"
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    />
  </div>
);

// ─────────────────────────────────────────────
// DOTS
// ─────────────────────────────────────────────
const SlideDots = ({ slides, current, onNavigate }) => (
  <div className="flex items-center justify-center gap-2 flex-wrap px-4">
    {slides.map((slide, i) => (
      <button
        key={slide.id}
        onClick={() => onNavigate(i)}
        title={slide.title}
        className="transition-all rounded-full hover:scale-125"
        style={{
          width:  i === current ? 24 : 8,
          height: 8,
          background:
            i === current
              ? '#FF5421'
              : i < current
              ? 'rgba(255,84,33,0.4)'
              : 'rgba(255,255,255,0.15)',
        }}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────
// SLIDE TRANSITION
// ─────────────────────────────────────────────
const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

// ─────────────────────────────────────────────
// VOLYMIKON
// ─────────────────────────────────────────────
const VolumeIcon = ({ volume, muted }) => {
  if (muted || volume === 0) return <VolumeX size={16} strokeWidth={2} />;
  if (volume < 0.5)          return <Volume1  size={16} strokeWidth={2} />;
  return                            <Volume2  size={16} strokeWidth={2} />;
};

// ─────────────────────────────────────────────
// HUVUD-KOMPONENT
// ─────────────────────────────────────────────
const ModuleSlideLayout = ({
  slides,
  currentIndex,
  onNavigate,
  children,
  showHeader,
}) => {
  const [direction, setDirection]       = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume]             = useState(1);
  const [muted, setMuted]               = useState(false);
  const [showVolume, setShowVolume]     = useState(false);
  const [barVisible, setBarVisible]     = useState(true);
  const [hovering, setHovering]         = useState(false);

  const touchStartX  = useRef(null);
  const touchStartY  = useRef(null);
  const containerRef = useRef(null);
  const hideTimer    = useRef(null);
  const volumeRef    = useRef(null);

  const total   = slides.length;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  // ── Navigering ──────────────────────────────
  const navigate = useCallback((newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    onNavigate(newIndex);
  }, [currentIndex, onNavigate]);

  const prev = useCallback(() => { if (canPrev) navigate(currentIndex - 1); }, [canPrev, navigate, currentIndex]);
  const next = useCallback(() => { if (canNext) navigate(currentIndex + 1); }, [canNext, navigate, currentIndex]);

  // ── Tangentbord ─────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'l') next();
      if (e.key === 'ArrowLeft'  || e.key === 'j') prev();
      if (e.key === 'f' || e.key === 'F')          toggleFullscreen();
      if (e.key === 'm' || e.key === 'M')          setMuted(m => !m);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // ── Fullscreen ──────────────────────────────
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const handler = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      // Dölj CourseHeader i fullscreen
      const header = document.querySelector('[data-course-header]');
      if (header) header.style.display = fs ? 'none' : '';
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // ── Auto-hide kontrollbar i fullscreen ──────
  const showBar = () => {
    setBarVisible(true);
    clearTimeout(hideTimer.current);
    if (isFullscreen && !hovering) {
      hideTimer.current = setTimeout(() => setBarVisible(false), 3000);
    }
  };

  useEffect(() => {
    if (!isFullscreen) {
      setBarVisible(true);
      clearTimeout(hideTimer.current);
    } else {
      hideTimer.current = setTimeout(() => setBarVisible(false), 3000);
    }
    return () => clearTimeout(hideTimer.current);
  }, [isFullscreen]);

  // ── Volym stäng vid klick utanför ───────────
  useEffect(() => {
    const handler = (e) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target)) {
        setShowVolume(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Touch-swipe ─────────────────────────────
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy * 1.5) {
      if (dx < 0) next(); else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // ── Volymkontroll på globala AudioPlayer:s ──
  useEffect(() => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(a => {
      a.volume = muted ? 0 : volume;
      a.muted  = muted;
    });
  }, [volume, muted]);

  const currentSlide = slides[currentIndex];
  const progressPct  = ((currentIndex + 1) / total) * 100;

  // Stil för kontrollknappar
  const btnBase = "pointer-events-auto flex items-center justify-center rounded-full transition-all duration-150 hover:scale-110 active:scale-95";

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#0f1623' }}
      onMouseMove={showBar}
      onClick={showBar}
    >
      {/* Tunn progress-linje längst upp */}
      <SlideProgressBar total={total} current={currentIndex} />

      {/* Slide-titel + dots */}
      {showHeader !== false && (
        <div className="flex-shrink-0 pt-3 pb-2 px-4 space-y-2">
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-white/50 text-sm font-semibold"
              >
                {currentSlide.title}
              </motion.p>
            </AnimatePresence>
          </div>
          <SlideDots slides={slides} current={currentIndex} onNavigate={navigate} />
        </div>
      )}

      {/* Slide-innehåll */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── KONTROLLBAR – YouTube/SVTPlay-stil ─── */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => { setHovering(true);  clearTimeout(hideTimer.current); }}
            onMouseLeave={() => { setHovering(false); if (isFullscreen) hideTimer.current = setTimeout(() => setBarVisible(false), 2000); }}
            className="fixed bottom-0 right-0 z-50 pointer-events-none"
            style={{ left: isFullscreen ? '0px' : 'var(--sidebar-width, 0px)' }}
          >
            {/* Gradient fade upp */}
            <div
              className="w-full h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
            />

            {/* Slidebar */}
            <div className="w-full px-4 pb-1 pointer-events-auto">
              <div className="relative h-1 group cursor-pointer rounded-full bg-white/20 hover:h-2 transition-all duration-150"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct  = (e.clientX - rect.left) / rect.width;
                  const idx  = Math.round(pct * (total - 1));
                  navigate(Math.max(0, Math.min(total - 1, idx)));
                }}
              >
                {/* Redan sedd */}
                <div
                  className="absolute left-0 top-0 h-full bg-[#FF5421] rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
                {/* Tumme */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF5421] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Knapp-rad */}
            <div
  className="w-full px-4 pb-2 flex items-center gap-2 pointer-events-auto"
  style={{ background: '#0f1623' }}
>
              {/* ── Vänster: nav + volym + räknare ── */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={prev}
                  disabled={!canPrev}
                  title="Föregående (←)"
                  className={`${btnBase} w-8 h-8`}
                  style={canPrev
                    ? { color: 'rgba(255,255,255,0.85)' }
                    : { color: 'rgba(255,255,255,0.2)', cursor: 'default', pointerEvents: 'none' }}
                >
                  <SkipBack size={16} strokeWidth={2} />
                </button>

                <button
                  onClick={next}
                  disabled={!canNext}
                  title="Nästa (→)"
                  className={`${btnBase} w-8 h-8`}
                  style={canNext
                    ? { color: 'rgba(255,255,255,0.85)' }
                    : { color: 'rgba(255,255,255,0.2)', cursor: 'default', pointerEvents: 'none' }}
                >
                  <SkipForward size={16} strokeWidth={2} />
                </button>

                <div ref={volumeRef} className="relative flex items-center">
                  <button
                    onClick={() => setMuted(m => !m)}
                    onMouseEnter={() => setShowVolume(true)}
                    title={muted ? 'Ljud på (M)' : 'Ljud av (M)'}
                    className={`${btnBase} w-8 h-8`}
                    style={{ color: 'rgba(255,255,255,0.85)' }}
                  >
                    <VolumeIcon volume={volume} muted={muted} />
                  </button>
                  <AnimatePresence>
                    {showVolume && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 70 }}
                        exit={{ opacity: 0, width: 0 }}
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                        className="overflow-hidden flex items-center"
                      >
                        <input
                          type="range"
                          min={0} max={1} step={0.05}
                          value={muted ? 0 : volume}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            setVolume(v);
                            setMuted(v === 0);
                          }}
                          className="w-14 h-1 accent-[#FF5421] cursor-pointer"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className="text-xs font-semibold tabular-nums select-none"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {currentIndex + 1} / {total}
                </span>
              </div>

              {/* ── Mitten: AudioPlayer ── */}
              <div className="flex-1 flex justify-center px-2">
                <AnimatePresence mode="wait">
                  {currentSlide.audioSrc ? (
                    <motion.div
                      key={currentSlide.id + '-audio'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-full max-w-xs pointer-events-auto"
                    >
                      <AudioPlayerCompact audioSrc={currentSlide.audioSrc} />
                    </motion.div>
                  ) : (
                    <motion.div key="no-audio" className="w-full max-w-xs" />
                  )}
                </AnimatePresence>
              </div>

              {/* ── Höger: fullscreen ── */}
              <div className="flex-shrink-0">
                <button
                  onClick={toggleFullscreen}
                  title={isFullscreen ? 'Avsluta helskärm (F / Esc)' : 'Helskärm (F)'}
                  className={`${btnBase} w-8 h-8`}
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {isFullscreen
                    ? <Minimize2 size={15} strokeWidth={2} />
                    : <Maximize2 size={15} strokeWidth={2} />
                  }
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSlideLayout;