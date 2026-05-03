// src/components/CourseElements/BiografVideo.tsx
// Biografgardin-komponent med röda gardiner som åker isär vid play
// Används i BrfHistorieTidslinje och kan återanvändas för valfri YouTube-video

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize2, Minimize2 } from 'lucide-react';



interface Props {
  videoId: string;           // YouTube video ID, t.ex. '7v2ZxNgaRis'
  titel?: string;            // Visas under playknappen
  undertitel?: string;       // Liten text under titel
}

const BiografVideo: React.FC<Props> = ({
  videoId,
  titel = 'Spela film',
  undertitel,
}) => {
  const [öppen, setÖppen]       = useState(false);
  const [gardin, setGardin]     = useState(false);
  const [filmLaddad, setFilm]   = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
const [fullskärm, setFullskärm] = useState(false);

const toggleFullskärm = () => {
  if (!document.fullscreenElement) {
    wrapperRef.current?.requestFullscreen().catch(() => {});
    setFullskärm(true);
  } else {
    document.exitFullscreen().catch(() => {});
    setFullskärm(false);
  }
};

// Lyssna på om användaren tryckt Escape
useEffect(() => {
  const handler = () => {
    if (!document.fullscreenElement) setFullskärm(false);
  };
  document.addEventListener('fullscreenchange', handler);
  return () => document.removeEventListener('fullscreenchange', handler);
}, []);

  const play = () => {
    setÖppen(true);
    setTimeout(() => setGardin(true), 400);
    setTimeout(() => setFilm(true), 2000);
  };

  const stäng = () => {
    setFilm(false);
    setGardin(false);
    setTimeout(() => setÖppen(false), 1500);
  };

  return (
    <div ref={wrapperRef} className="h-full w-full relative overflow-hidden">

      {/* ── PLAYKNAPP (visas när bio är stängd) ── */}
      <AnimatePresence>
        {!öppen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 5,
            }}
          >
            <motion.button
              onClick={play}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'rgba(26,18,8,0.88)',
                border: '3px solid #8B6914',
                borderRadius: 6,
                padding: '16px 28px',
                cursor: 'pointer',
                boxShadow: '0 0 0 1px #4a3808, 0 8px 40px rgba(0,0,0,0.7)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              }}
            >
              {/* Cirkel */}
              <div style={{
                width: 68, height: 68, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f0d080, #8B6914)',
                border: '3px solid #f0d080',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 28px rgba(200,160,40,0.45)',
              }}>
                <Play size={24} style={{ color: '#1a0e06', marginLeft: 4 }} />
              </div>

              {/* Text */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: 12, fontWeight: 800, letterSpacing: 3,
                  textTransform: 'uppercase' as const,
                  color: '#c8a048', fontFamily: 'monospace', marginBottom: 3,
                }}>
                  {titel}
                </p>
                {undertitel && (
                  <p style={{ fontSize: 10, color: '#6B5020', fontFamily: 'monospace', letterSpacing: 1 }}>
                    {undertitel}
                  </p>
                )}
                {/* Dekorativa bars */}
                <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 6 }}>
                  {[5, 9, 14, 9, 5].map((h, i) => (
                    <div key={i} style={{ width: 3, height: h, background: '#8B6914', borderRadius: 2 }} />
                  ))}
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BIOGRAF (visas när öppen) ── */}
      <AnimatePresence>
        {öppen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, zIndex: 10, overflow: 'hidden' }}
          >
            {/* Mörk bakgrund */}
            <div style={{
              position: 'absolute', inset: 0,
              background: '#0a0604',
            }} />

            {/* Dimmer */}
            <div style={{
              position: 'absolute', inset: 0,
              background: gardin ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0)',
              transition: 'background 0.8s ease',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Tak */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 28,
              background: 'linear-gradient(to bottom, #1a0e06, #2a1608)',
              borderBottom: '2px solid #8B4513', zIndex: 15,
            }} />

            {/* Golv */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
              background: 'linear-gradient(to top, #0d0906, #1a1008)',
              borderTop: '2px solid #3a2010', zIndex: 15,
            }} />

            {/* Gardinlist */}
            <div style={{
              position: 'absolute', top: 26, left: '6%', right: '6%', height: 10,
              background: 'linear-gradient(to bottom, #c8a050, #8B6914, #c8a050)',
              borderRadius: 5, zIndex: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}>
              {/* Ändhållar */}
              {[-1, 1].map((side) => (
                <div key={side} style={{
                  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                  [side === -1 ? 'left' : 'right']: -8,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f0d080, #8B6914)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                }} />
              ))}
            </div>

            {/* VÄNSTER GARDIN */}
            <div style={{
              position: 'absolute', top: 28, bottom: 38,
              left: '6%', width: '44%',
              transform: gardin ? 'translateX(-92%)' : 'translateX(0)',
              transition: 'transform 1.8s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 18, overflow: 'hidden',
            }}>
              {/* Tyg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0.10) 7px, rgba(0,0,0,0) 11px), linear-gradient(to right, #7a1515, #9B2020, #6B0f0f, #8B1a1a)',
              }} />
              {/* Veck */}
              {[14, 55, 100, 155, 210].map((l, i) => (
                <div key={i} style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: l, width: 16,
                  background: 'rgba(0,0,0,0.18)', borderRadius: '50%',
                }} />
              ))}
              {/* Nederkant — tyngd */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 20,
                background: 'rgba(0,0,0,0.25)',
              }} />
            </div>

            {/* HÖGER GARDIN */}
            <div style={{
              position: 'absolute', top: 28, bottom: 38,
              right: '6%', width: '44%',
              transform: gardin ? 'translateX(92%)' : 'translateX(0)',
              transition: 'transform 1.8s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 18, overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0.10) 7px, rgba(0,0,0,0) 11px), linear-gradient(to left, #7a1515, #9B2020, #6B0f0f, #8B1a1a)',
              }} />
              {[14, 55, 100, 155, 210].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute', top: 0, bottom: 0,
                  right: r, width: 16,
                  background: 'rgba(0,0,0,0.18)', borderRadius: '50%',
                }} />
              ))}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 20,
                background: 'rgba(0,0,0,0.25)',
              }} />
            </div>

            {/* FILMDUKEN */}
            <div style={{
              position: 'absolute', top: 34, bottom: 38,
              left: '6%', right: '6%',
              background: '#000',
              border: '5px solid #4a2c0a',
              boxShadow: '0 0 0 2px #8B4513, 0 0 0 3px #2a1608, 0 0 40px rgba(0,0,0,0.8)',
              zIndex: 16, overflow: 'hidden',
            }}>
              {/* Tom duk innan film laddas */}
              {!filmLaddad && (
                <div style={{ background: '#f0ece0', width: '100%', height: '100%' }} />
              )}

              {/* YouTube */}
              {filmLaddad && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title={titel}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Scan-lines */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
              }} />

              {/* Vinjett */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
                background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.35) 100%)',
              }} />
            </div>

            {/* Vägg-lampor vänster */}
            {[90, 200, 310].map((top, i) => (
              <div key={i} style={{
                position: 'absolute', left: 18, top,
                width: 8, height: 8, borderRadius: '50%',
                background: '#c8741a',
                boxShadow: '0 0 10px rgba(200,116,26,0.5)',
                zIndex: 16,
              }} />
            ))}

            {/* Vägg-lampor höger */}
            {[90, 200, 310].map((top, i) => (
              <div key={i} style={{
                position: 'absolute', right: 18, top,
                width: 8, height: 8, borderRadius: '50%',
                background: '#c8741a',
                boxShadow: '0 0 10px rgba(200,116,26,0.5)',
                zIndex: 16,
              }} />
            ))}

            {/* STÄNG-KNAPP */}
            <AnimatePresence>
              {filmLaddad && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={stäng}
                  style={{
                    position: 'absolute', top: 36, right: 'calc(6% + 8px)', zIndex: 25,
                    background: 'rgba(10,6,4,0.85)',
                    border: '1px solid #8B4513',
                    borderRadius: '50%', width: 32, height: 32,
                    cursor: 'pointer', color: '#c8a048',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  }}
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Fullskärmsknapp */}
<AnimatePresence>
  {filmLaddad && (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={toggleFullskärm}
      style={{
        position: 'absolute', top: 36, right: 'calc(6% + 48px)', zIndex: 25,
        background: 'rgba(10,6,4,0.85)',
        border: '1px solid #8B4513',
        borderRadius: '50%', width: 32, height: 32,
        cursor: 'pointer', color: '#c8a048',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
      }}
    >
      {fullskärm ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
    </motion.button>
  )}
</AnimatePresence>

            {/* Retro-label längst ned */}
            <div style={{
              position: 'absolute', bottom: 10, left: 0, right: 0,
              textAlign: 'center', zIndex: 16,
            }}>
              <span style={{
                fontSize: 9, color: '#3a2810', fontFamily: 'monospace',
                letterSpacing: 2, textTransform: 'uppercase' as const,
              }}>
                Styrelsekörkortet® · Historiskt Arkiv
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BiografVideo;