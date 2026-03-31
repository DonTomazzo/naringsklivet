// src/components/CourseElements/ModuleSlideLayout.jsx
// Horisontell slide-navigation wrapper för kursmoduler.
// Navigeringsknappar flyter transparent ovanpå innehållet och
// respekterar GlobalSidebar via CSS-variabeln --sidebar-width.

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────
// PROGRESSBAR
// ─────────────────────────────────────────────
export const SlideProgressBar = ({ total, current }) => (
  <div className="w-full h-1 bg-white/10">
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
        className="transition-all rounded-full"
        style={{
          width: i === current ? 24 : 8,
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
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
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
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const containerRef = useRef(null);

  const total   = slides.length;
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  const navigate = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    onNavigate(newIndex);
  };

  const prev = () => canPrev && navigate(currentIndex - 1);
  const next = () => canNext && navigate(currentIndex + 1);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy * 1.5) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="flex flex-col h-full" style={{ background: '#0f1623' }}>

      <SlideProgressBar total={total} current={currentIndex} />

      {showHeader !== false && (
        <div className="flex-shrink-0 pt-4 pb-2 px-4 space-y-3">
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

     {/* Navigeringsknappar */}
<div
  className="fixed bottom-0 right-0 flex items-center justify-center gap-6 py-4 pointer-events-none transition-all duration-300"
  style={{ left: 'var(--sidebar-width, 0px)' }}
>
  <button
    onClick={prev}
    disabled={!canPrev}
    className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all"
    style={canPrev
      ? { background: 'rgba(255,84,33,0.15)', color: '#FF5421',
          border: '1px solid rgba(255,84,33,0.3)' }
      : { background: 'transparent', color: 'transparent',
          cursor: 'default', pointerEvents: 'none', border: '1px solid transparent' }}
  >
    <ChevronLeft size={20} strokeWidth={2.5} />
  </button>

  <span className="text-xs font-semibold tabular-nums"
    style={{ color: 'rgba(255,255,255,0.3)', minWidth: '3rem', textAlign: 'center' }}>
    {currentIndex + 1} / {total}
  </span>

  <button
    onClick={next}
    disabled={!canNext}
    className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all"
    style={canNext
      ? { background: '#FF5421', color: '#fff',
          boxShadow: '0 4px 12px rgba(255,84,33,0.4)' }
      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)',
          cursor: 'default' }}
  >
    <ChevronRight size={20} strokeWidth={2.5} />
  </button>
</div>

    </div>
  );
};

export default ModuleSlideLayout;