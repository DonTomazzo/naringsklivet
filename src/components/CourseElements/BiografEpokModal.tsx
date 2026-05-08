// src/components/CourseElements/BiografEpokModal.tsx
// Biografmodal — 85% bredd, alternerande bild/text per stycke, luftig layout

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Volume2, VolumeX, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

export interface EpokStycke {
  text: string;
  bild?: string;       // Unsplash URL
  bildtext?: string;
}

export interface Epok {
  id: string;
  år: string;
  rubrik: string;
  ingress?: string;    // kort intro ovanför styckena
  stycken?: EpokStycke[];  // alternerande bild/text
  lång?: string;       // fallback om stycken saknas
  audioSrc?: string;
  färg: string;
}

interface Props {
  epok: Epok | null;
  onStäng: () => void;
  onFöregående?: () => void;
  onNästa?: () => void;
  harFöregående?: boolean;
  harNästa?: boolean;
}

// ── Gardin ───────────────────────────────────────────────
const Gardin = ({ sida, öppen }: { sida: 'left' | 'right'; öppen: boolean }) => (
  <div style={{
    position: 'absolute', top: 32, bottom: 42,
    [sida === 'left' ? 'left' : 'right']: 0,
    width: '50%',
    transform: öppen
      ? sida === 'left' ? 'translateX(-96%)' : 'translateX(96%)'
      : 'translateX(0)',
    transition: 'transform 1.6s cubic-bezier(0.4,0,0.2,1)',
    zIndex: 58, overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      background: sida === 'left'
        ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(0,0,0,0) 4px, rgba(0,0,0,0.12) 8px, rgba(0,0,0,0) 12px), linear-gradient(to right, #6B0f0f, #9B2020, #7a1515, #8B1a1a, #6B0f0f)'
        : 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(0,0,0,0) 4px, rgba(0,0,0,0.12) 8px, rgba(0,0,0,0) 12px), linear-gradient(to left, #6B0f0f, #9B2020, #7a1515, #8B1a1a, #6B0f0f)',
    }} />
    {[8, 40, 80, 130, 180, 230, 280].map((pos, i) => (
      <div key={i} style={{
        position: 'absolute', top: 0, bottom: 0,
        [sida === 'left' ? 'left' : 'right']: pos,
        width: 18, background: 'rgba(0,0,0,0.20)', borderRadius: '50%',
      }} />
    ))}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 24, background: 'rgba(0,0,0,0.30)' }} />
  </div>
);

// ── Huvud-komponent ───────────────────────────────────────
const BiografEpokModal: React.FC<Props> = ({
  epok, onStäng,
  onFöregående, onNästa,
  harFöregående, harNästa,
}) => {
  const [fas, setFas]             = useState<'stängd' | 'stänger' | 'öppnar' | 'öppen'>('stängd');
  const [visadEpok, setVisadEpok] = useState<Epok | null>(null);
  const [mutad, setMutad]         = useState(false);
  const [spelande, setSpelande]   = useState(false);
  const [fullskärm, setFullskärm] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [duration, setDuration]   = useState(0);
  const audioRef                  = useRef<HTMLAudioElement | null>(null);
  const wrapperRef                = useRef<HTMLDivElement>(null);
  const förraId                   = useRef<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
useEffect(() => {
  const check = () => setIsDesktop(window.innerWidth >= 1024);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);

  useEffect(() => {
    if (!epok) {
      if (fas === 'öppen') { stopAudio(); setFas('stänger'); setTimeout(() => setFas('stängd'), 1600); }
      return;
    }
    if (fas === 'stängd') {
      setVisadEpok(epok); förraId.current = epok.id; setFas('öppnar');
      setTimeout(() => { setFas('öppen'); spelAudio(epok); }, 1800);
    } else if (fas === 'öppen' && epok.id !== förraId.current) {
      stopAudio(); setFas('stänger');
      setTimeout(() => {
        setVisadEpok(epok); förraId.current = epok.id; setFas('öppnar');
        setTimeout(() => { setFas('öppen'); spelAudio(epok); }, 1800);
      }, 1600);
    }
  }, [epok]);

  const stopAudio = () => {
    audioRef.current?.pause(); audioRef.current = null;
    setSpelande(false); setProgress(0); setDuration(0);
  };

  const spelAudio = (e: Epok) => {
    stopAudio();
    if (!e.audioSrc) return;
    const audio = new Audio(e.audioSrc);
    audioRef.current = audio;
    audio.muted = mutad;
    audio.onplay  = () => setSpelande(true);
    audio.onpause = () => setSpelande(false);
    audio.onended = () => { setSpelande(false); setProgress(0); };
    audio.ontimeupdate    = () => setProgress(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.play().catch(() => {});
  };

  const toggleSpela = () => {
    if (!audioRef.current) return;
    spelande ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  };

  const toggleMut = () => {
    setMutad(m => { if (audioRef.current) audioRef.current.muted = !m; return !m; });
  };

  const toggleFullskärm = () => {
    if (!document.fullscreenElement) { wrapperRef.current?.requestFullscreen().catch(() => {}); }
    else { document.exitFullscreen().catch(() => {}); }
  };

  useEffect(() => {
    const h = () => setFullskärm(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  useEffect(() => () => stopAudio(), []);

  const formatTid = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  const gardinÖppen = fas === 'öppen';
  const visas = fas !== 'stängd';
  if (!visas) return null;

  return (
    <AnimatePresence>
      {visas && (
        <motion.div
  ref={wrapperRef}
  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: isDesktop ? 280 + 640 : 0,  // skip past navy column (280) + lista (640) på desktop
    right: 0,
    zIndex: 50,
    overflow: 'hidden',
    background: '#08080a',
  }}
>
          {/* Tak — filmremsa */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 32,
            background: 'repeating-linear-gradient(90deg, #1a0e06 0px, #1a0e06 18px, #0d0806 18px, #0d0806 20px)',
            borderBottom: '3px solid #8B4513', zIndex: 62,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px',
          }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {[...Array(8)].map((_, i) => <div key={i} style={{ width: 10, height: 14, borderRadius: 3, background: '#0d0806', border: '1px solid #3a2010' }} />)}
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#8B6914', fontFamily: 'monospace' }}>
              Styrelsekörkortet® · Historiskt Arkiv
            </span>
            <div style={{ display: 'flex', gap: 5 }}>
              {[...Array(8)].map((_, i) => <div key={i} style={{ width: 10, height: 14, borderRadius: 3, background: '#0d0806', border: '1px solid #3a2010' }} />)}
            </div>
          </div>

          {/* Golv — filmremsa */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 42,
            background: 'repeating-linear-gradient(90deg, #1a0e06 0px, #1a0e06 18px, #0d0806 18px, #0d0806 20px)',
            borderTop: '3px solid #8B4513', zIndex: 62,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            {[...Array(14)].map((_, i) => <div key={i} style={{ width: 10, height: 14, borderRadius: 3, background: '#0d0806', border: '1px solid #3a2010' }} />)}
          </div>

          {/* Vänster vägg */}
          <div style={{ position: 'absolute', top: 32, bottom: 42, left: 0, width: 22, background: 'linear-gradient(to right, #0a0604, #1a1008)', zIndex: 60 }}>
            {[70, 160, 250, 340].map((t, i) => <div key={i} style={{ position: 'absolute', left: 8, top: t, width: 6, height: 6, borderRadius: '50%', background: '#c8741a', boxShadow: '0 0 8px rgba(200,116,26,0.5)' }} />)}
          </div>

          {/* Höger vägg */}
          <div style={{ position: 'absolute', top: 32, bottom: 42, right: 0, width: 22, background: 'linear-gradient(to left, #0a0604, #1a1008)', zIndex: 60 }}>
            {[70, 160, 250, 340].map((t, i) => <div key={i} style={{ position: 'absolute', right: 8, top: t, width: 6, height: 6, borderRadius: '50%', background: '#c8741a', boxShadow: '0 0 8px rgba(200,116,26,0.5)' }} />)}
          </div>

          {/* Gardinlist */}
          <div style={{
            position: 'absolute', top: 30, left: 20, right: 20, height: 10,
            background: 'linear-gradient(to bottom, #d4a850, #8B6914, #d4a850)',
            borderRadius: 5, zIndex: 62, boxShadow: '0 2px 10px rgba(0,0,0,0.7)',
          }}>
            {[-1, 1].map(s => (
              <div key={s} style={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                [s === -1 ? 'left' : 'right']: -9,
                width: 20, height: 20, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f0d080, #8B6914)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }} />
            ))}
          </div>

          {/* Gardiner */}
          <Gardin sida="left"  öppen={gardinÖppen} />
          <Gardin sida="right" öppen={gardinÖppen} />

          {/* FILMDUKEN */}
          <div style={{
            position: 'absolute', top: 38, bottom: 40, left: 20, right: 20,
            background: '#0a0f1a',
            border: '4px solid #4a2c0a',
            boxShadow: '0 0 0 2px #8B4513, 0 0 0 3px #2a1608',
            zIndex: 55, overflow: 'hidden',
          }}>
            {/* ── V-PIL VÄNSTER — Föregående ── */}
            {gardinÖppen && harFöregående && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={onFöregående}
                whileHover={{ x: -4 }}
                style={{
                  position: 'absolute', left: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10, background: 'none', border: 'none',
                  cursor: 'pointer', padding: '20px 16px',
                  display: 'flex', alignItems: 'center',
                  opacity: 0.55,
                }}
              >
                <svg width="32" height="56" viewBox="0 0 32 56" fill="none">
                  <polyline points="28,4 4,28 28,52" stroke="#c8a048" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            )}

            {/* ── V-PIL HÖGER — Nästa ── */}
            {gardinÖppen && harNästa && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={onNästa}
                whileHover={{ x: 4 }}
                style={{
                  position: 'absolute', right: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10, background: 'none', border: 'none',
                  cursor: 'pointer', padding: '20px 16px',
                  display: 'flex', alignItems: 'center',
                  opacity: 0.55,
                }}
              >
                <svg width="32" height="56" viewBox="0 0 32 56" fill="none">
                  <polyline points="4,4 28,28 4,52" stroke="#c8a048" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            )}

            {/* Scan-lines */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)' }} />
            {/* Vinjett */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />

            <AnimatePresence mode="wait">
              {gardinÖppen && visadEpok && (
                <motion.div
                  key={visadEpok.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ position: 'absolute', inset: 0, zIndex: 6, display: 'flex', flexDirection: 'column' }}
                >
                  {/* Scrollbart innehåll */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '88%', maxWidth: 1100, padding: '36px 0 24px' }}>

                      {/* Eyebrow + rubrik + ingress */}
                      <div style={{ marginBottom: 40 }}>
                        <div style={{
                          display: 'inline-block', padding: '4px 14px', borderRadius: 20, marginBottom: 14,
                          background: `${O}25`, border: `1px solid ${O}50`,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' as const, color: O, fontFamily: 'monospace' }}>
                            {visadEpok.år}
                          </span>
                        </div>
                        <h2 style={{
                          fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#fff',
                          fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, marginBottom: 16,
                        }}>
                          {visadEpok.rubrik}
                        </h2>
                        {visadEpok.ingress && (
                          <p style={{
                            fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'rgba(255,255,255,0.60)',
                            lineHeight: 1.7, maxWidth: 720, fontFamily: "'Nunito', sans-serif",
                          }}>
                            {visadEpok.ingress}
                          </p>
                        )}
                      </div>

                      {/* Alternerande bild/text-sektioner */}
                      {visadEpok.stycken ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
                          {visadEpok.stycken.map((s, i) => {
                            const bildVänster = i % 2 === 0;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: s.bild ? '1fr 1fr' : '1fr',
                                  gap: 40,
                                  alignItems: 'center',
                                  flexDirection: bildVänster ? 'row' : 'row-reverse',
                                }}
                              >
                                {/* Bild — vänster på jämna, höger på ojämna */}
                                {s.bild && (
                                  <div style={{ order: bildVänster ? 0 : 1 }}>
                                    <div style={{
                                      borderRadius: 14, overflow: 'hidden',
                                      border: '1px solid rgba(255,255,255,0.10)',
                                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                      aspectRatio: '16/10',
                                    }}>
                                      <img
                                        src={s.bild}
                                        alt={s.bildtext ?? ''}
                                        style={{
                                          width: '100%', height: '100%',
                                          objectFit: 'cover',
                                          filter: 'sepia(10%) contrast(0.95)',
                                        }}
                                      />
                                    </div>
                                    {s.bildtext && (
                                      <p style={{
                                        fontSize: 12, color: 'rgba(255,255,255,0.30)',
                                        marginTop: 8, fontStyle: 'italic', fontFamily: 'monospace',
                                      }}>
                                        {s.bildtext}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Text */}
                                <div style={{ order: bildVänster ? 1 : 0 }}>
                                  <p style={{
                                    fontSize: 'clamp(16px, 1.6vw, 19px)',
                                    color: 'rgba(255,255,255,0.85)',
                                    lineHeight: 1.85,
                                    fontFamily: "'Nunito', sans-serif",
                                  }}>
                                    {s.text}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Fallback: lång-texten utan bilder */
                        <div>
                          {(visadEpok.lång ?? '').split('\n\n').map((stycke, i) => (
                            <p key={i} style={{
                              fontSize: 'clamp(16px, 1.6vw, 19px)',
                              color: 'rgba(255,255,255,0.85)',
                              lineHeight: 1.85, marginBottom: 22,
                              fontFamily: "'Nunito', sans-serif",
                            }}>
                              {stycke}
                            </p>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* ── X — stäng uppe till höger ── */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={onStäng}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'absolute', top: 16, right: 20, zIndex: 10,
                      background: 'rgba(139,69,19,0.20)',
                      border: '2px solid rgba(139,69,19,0.60)',
                      borderRadius: '50%', width: 48, height: 48,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <X size={22} style={{ color: '#c8a048' }} />
                  </motion.button>

                  {/* ── Audio — diskret längst ned ── */}
                  {visadEpok.audioSrc && (
                    <div style={{
                      position: 'absolute', bottom: 14, left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex', alignItems: 'center', gap: 10, zIndex: 10,
                    }}>
                      <button onClick={toggleSpela} style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${O}, ${OD})`,
                        border: 'none', cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 2px 12px ${O}60`,
                      }}>
                        {spelande
                          ? <Pause size={13} style={{ color: '#fff' }} />
                          : <Play  size={13} style={{ color: '#fff', marginLeft: 2 }} />}
                      </button>
                      <div style={{ width: 160 }}>
                        <div
                          style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.12)', cursor: 'pointer' }}
                          onClick={(e) => {
                            if (!audioRef.current) return;
                            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                            audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
                          }}
                        >
                          <div style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%`, height: '100%', background: O, borderRadius: 2, transition: 'width 0.2s linear' }} />
                        </div>
                      </div>
                      <button onClick={toggleMut} style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {mutad
                          ? <VolumeX size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                          : <Volume2 size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />}
                      </button>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BiografEpokModal;