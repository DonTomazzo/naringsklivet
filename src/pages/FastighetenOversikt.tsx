// src/pages/FastighetenOversikt.tsx
// Översiktssida för Fastigheten — entry point för alla 4 kapitel
// Route: /modules/fastigheten

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

// ── Kapitel-data ─────────────────────────────────────────
const KAPITEL = [
  {
    id: 'sakerhet',
    slug: 'fastigheten-sakerhet',
    emoji: '🔥',
    rubrik: 'Säkerhet',
    desc: 'Brand, hissar, radon och legionella — de lagstadgade krav som skyddar dina boende.',
    avsnitt: ['Brandskydd & SBA', 'Hissar & taksäkerhet', 'Radon & Legionella', '3 scenarios + quiz'],
    color: '#EF4444',
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    slides: 7,
    fri: true,
  },
  {
    id: 'underhall',
    slug: 'fastigheten-underhall',
    emoji: '🔧',
    rubrik: 'Underhåll & planering',
    desc: 'OVK, egenkontroll och underhållsplanering — systemen som håller fastigheten i skick.',
    avsnitt: ['OVK — obligatorisk ventilationskontroll', 'Egenkontroll', '2 scenarios + quiz'],
    color: '#F59E0B',
    bild: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    slides: 6,
    fri: false,
  },
  {
    id: 'energi',
    slug: 'fastigheten-energi',
    emoji: '⚡',
    rubrik: 'Energi & miljö',
    desc: 'Energideklaration, solceller och laddstolpar — hållbarhet och lagkrav i praktiken.',
    avsnitt: ['Energideklaration', 'Solceller & laddstolpar', '2 scenarios + quiz'],
    color: '#10B981',
    bild: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
    slides: 6,
    fri: false,
  },
  {
    id: 'drift',
    slug: 'fastigheten-drift',
    emoji: '🏗️',
    rubrik: 'Praktisk drift',
    desc: 'Sopor, PCB, lekplatser och bygglov — vardagliga frågor med juridiska konsekvenser.',
    avsnitt: ['Sophantering, snöröjning & PCB', 'Bygglov & tekniska krav', '1 scenario + quiz'],
    color: '#6366F1',
    bild: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    slides: 6,
    fri: false,
  },
];

// ── Helpers ───────────────────────────────────────────────
const getProgress = (slug: string): number => {
  try {
    const raw = localStorage.getItem(`progress_${slug}`);
    return raw ? parseInt(raw) : 0;
  } catch { return 0; }
};

const KapitelKort = ({ kap, index, onStart }: { kap: typeof KAPITEL[0]; index: number; onStart: () => void }) => {
  const progress = getProgress(kap.slug);
  const done = progress >= kap.slides;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl overflow-hidden border cursor-pointer group relative"
      style={{ borderColor: done ? kap.color : '#e5e5e3', background: '#fff', boxShadow: done ? `0 4px 24px ${kap.color}20` : '0 2px 8px rgba(0,0,0,0.06)' }}
      onClick={onStart}
      whileHover={{ y: -4, boxShadow: `0 12px 32px ${kap.color}25` }}
      whileTap={{ scale: 0.98 }}>

      {/* Bild-header */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <img src={kap.bild} alt={kap.rubrik} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)` }} />
        {/* Emoji badge */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: `${kap.color}25`, backdropFilter: 'blur(8px)', border: `1px solid ${kap.color}40` }}>
          {kap.emoji}
        </div>
        {/* Status badge */}
        {done && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{ background: kap.color }}>
            <CheckCircle size={11} /> Klar
          </div>
        )}
        {!done && progress > 0 && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            {progress}/{kap.slides} avsnitt
          </div>
        )}
        {kap.fri && (
          <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: O }}>
            Gratis
          </div>
        )}
        {/* Progress bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <div className="h-full transition-all" style={{ width: `${(progress / kap.slides) * 100}%`, background: kap.color }} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-black mb-1.5" style={{ color: '#1f2937', fontFamily: "'Nunito', sans-serif" }}>{kap.rubrik}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{kap.desc}</p>
        <ul className="space-y-1.5 mb-4">
          {kap.avsnitt.map((a, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: kap.color }} />
              {a}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: kap.color }}>{kap.slides} avsnitt</span>
          <motion.div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl text-white"
            style={{ background: done ? kap.color : `linear-gradient(135deg, ${kap.color}, ${kap.color}cc)` }}>
            {done ? 'Gör om' : progress > 0 ? 'Fortsätt' : 'Starta'} →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
const FastighetenOversikt: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const totalDone = KAPITEL.filter(k => getProgress(k.slug) >= k.slides).length;

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4', fontFamily: "'Nunito', sans-serif" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <video ref={videoRef} src="/video/hiss.mp4" muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          onEnded={e => (e.target as HTMLVideoElement).pause()} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,16,28,0.92) 0%, rgba(23,31,50,0.85) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: '30%', right: 0, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${O}08 0%, transparent 70%)`, zIndex: 1 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-24">
          {/* Tillbaka-knapp */}
          <motion.button initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/modules')}
            className="flex items-center gap-2 text-sm font-semibold mb-10 transition-opacity hover:opacity-80"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ArrowLeft size={16} /> Alla utbildningar
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
                  style={{ background: `${O}22`, color: O, border: `1px solid ${O}44` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: O }} />
                  Styrelsekörkortet · Fastigheten
                </span>
                <h1 className="text-5xl sm:text-6xl font-black leading-[1.0] text-white mb-5"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Fastigheten —<br /><span style={{ color: O }}>ditt ansvar.</span>
                </h1>
                <p className="text-lg text-white/55 leading-relaxed mb-8 max-w-lg">
                  Fyra kapitel. Välj ett och gå direkt dit — eller starta från början. Varje kapitel avslutas med quiz och kursbevis.
                </p>
                <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/modules/fastigheten-sakerhet')}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white"
                  style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 8px 32px ${O}45` }}>
                  Starta från Säkerhet <span>→</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Progress-grid */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-3">
              {KAPITEL.map((kap, i) => {
                const progress = getProgress(kap.slug);
                const done = progress >= kap.slides;
                return (
                  <motion.button key={kap.id}
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/modules/${kap.slug}`)}
                    className="rounded-2xl p-4 text-left border transition-all"
                    style={{ background: done ? `${kap.color}20` : 'rgba(255,255,255,0.06)', borderColor: done ? kap.color : 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                    <div className="text-2xl mb-2">{kap.emoji}</div>
                    <p className="text-sm font-black text-white mb-0.5">{kap.rubrik}</p>
                    <p className="text-xs" style={{ color: done ? kap.color : 'rgba(255,255,255,0.35)' }}>
                      {done ? '✓ Klar' : progress > 0 ? `${progress}/${kap.slides} avsnitt` : `${kap.slides} avsnitt`}
                    </p>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── KAPITEL-KORT ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Välj ett kapitel</p>
            <h2 className="text-3xl font-black" style={{ color: '#1f2937', fontFamily: "'Nunito', sans-serif" }}>
              {totalDone === 0 ? 'Var vill du börja?' : totalDone === KAPITEL.length ? 'Alla kapitel klara! 🎉' : `${totalDone} av 4 kapitel klara`}
            </h2>
          </div>
          {totalDone > 0 && (
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-2 w-32 rounded-full overflow-hidden" style={{ background: '#e5e5e3' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(totalDone / 4) * 100}%`, background: O }} />
              </div>
              <span className="text-sm font-bold" style={{ color: O }}>{Math.round((totalDone / 4) * 100)}%</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KAPITEL.map((kap, i) => (
            <KapitelKort key={kap.id} kap={kap} index={i}
              onStart={() => navigate(`/modules/${kap.slug}`)} />
          ))}
        </div>

        {/* Botten-info */}
        <div className="mt-12 rounded-2xl p-6 border" style={{ background: '#fff', borderColor: '#e5e5e3' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { val: '4', label: 'Kapitel', emoji: '📚' },
              { val: '25+', label: 'Avsnitt totalt', emoji: '📖' },
              { val: '8', label: 'Scenarios', emoji: '🎯' },
              { val: '4', label: 'Quiz + kursbevis', emoji: '🏆' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="text-2xl font-black" style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>{s.val}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastighetenOversikt;