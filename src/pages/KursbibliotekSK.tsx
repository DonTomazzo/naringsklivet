// src/pages/KursbibliotekSK.tsx
// Styrelsekörkortet — kursbibliotek med guidande landningssida
// Stil: StyrelsekorkortetLanding + ModulesSection modal + FastighetenOversikt-struktur

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Play, Lock, X,
  Clock, BookOpen, CheckCircle, ChevronRight, Star
} from 'lucide-react';
import { modulesData } from '../data/modules2';

// ── Design tokens (identiska med StyrelsekorkortetLanding) ──
const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  dark:    '#1A1A1A',
  mid:     '#4A4A4A',
  muted:   '#8A8A8A',
  bg:      '#FAFAF8',
  bgAlt:   '#F4F2EE',
  border:  '#E8E5E0',
  white:   '#FFFFFF',
  navy:    '#1e2d4a',
};

// ── Reveal helper ────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24, className = '' }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// KAPITEL-DEFINITION
// ════════════════════════════════════════════════════════
const KAPITEL = [
  {
    id: 'grunderna',
    emoji: '🏛️',
    titel: 'Grunderna',
    subtitle: 'Styrelsearbetets fundament',
    desc: 'Allt du behöver veta om styrelsens roller, ansvar och hur föreningen fungerar. Här börjar alla.',
    color: C.orange,
    bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    kategorier: ['GRUNDERNA'],
    fri: true,
  },
  {
    id: 'juridik',
    emoji: '⚖️',
    titel: 'Juridik',
    subtitle: 'Lagar & regler i praktiken',
    desc: 'Bostadsrättslagen, GDPR, diskrimineringslagen och föreningens principer. Trygg juridisk grund.',
    color: '#6366F1',
    bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    kategorier: ['Juridik', 'JURIDIK'],
    fri: false,
  },
  {
    id: 'ekonomi',
    emoji: '💰',
    titel: 'Ekonomi',
    subtitle: 'Siffror som styr föreningen',
    desc: 'Årsredovisning, budget och finansiell styrning. Lär dig läsa och förstå föreningens ekonomi.',
    color: '#10B981',
    bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80',
    kategorier: ['EKONOMI'],
    fri: false,
  },
  {
    id: 'fastigheten',
    emoji: '🏗️',
    titel: 'Fastigheten',
    subtitle: 'Säkerhet, underhåll & drift',
    desc: 'Brandskydd, OVK, energi och praktisk drift. Allt om fastighetens tekniska ansvar.',
    color: '#F59E0B',
    bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    kategorier: ['FASTIGHET', 'FÖRVALTNING'],
    fri: false,
    isOversikt: true,
    oversiktSlug: 'fastigheten',
  },
  {
    id: 'administration',
    emoji: '📋',
    titel: 'Administration',
    subtitle: 'Protokoll, möten & dokument',
    desc: 'Effektiva styrelsemöten, korrekt protokollföring och dokumenthantering.',
    color: '#8B5CF6',
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    kategorier: ['ADMINISTRATION'],
    fri: false,
  },
  {
    id: 'ledarskap',
    emoji: '🤝',
    titel: 'Ledarskap',
    subtitle: 'Kommunikation & beslut',
    desc: 'Konflikthantering, beslutsfattning och AI som verktyg för styrelsearbetet.',
    color: '#EC4899',
    bild: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    kategorier: ['LEDARSKAP', 'KOMMUNIKATION'],
    fri: false,
  },
];

// ════════════════════════════════════════════════════════
// MODAL — identisk känsla som ModulesSection
// ════════════════════════════════════════════════════════
const KursModal = ({ modul, onClose }: { modul: any; onClose: () => void }) => {
  const navigate = useNavigate();
  if (!modul) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Bild */}
        {modul.image_url && (
          <div className="aspect-video overflow-hidden rounded-t-2xl relative">
            <img src={modul.image_url} alt={modul.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {modul.category && (
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: C.orange }}>{modul.category}</span>
              )}
              {modul.isTrial && (
                <span className="text-xs font-bold px-3 py-1 rounded-full border"
                  style={{ color: C.orange, borderColor: C.orange }}>Prova gratis</span>
              )}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 ml-2 transition-colors">
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black mb-3 leading-snug"
            style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            {modul.title}
          </h2>

          {modul.subtitle && (
            <p className="text-sm mb-4" style={{ color: C.muted }}>{modul.subtitle}</p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-sm" style={{ color: C.mid }}>
            {modul.duration && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} style={{ color: C.orange }} />
                <span>{modul.duration}</span>
              </div>
            )}
            {modul.lessons && (
              <div className="flex items-center gap-1.5">
                <BookOpen size={13} style={{ color: C.orange }} />
                <span>{modul.lessons} avsnitt</span>
              </div>
            )}
            {modul.rating && (
              <div className="flex items-center gap-1.5">
                <Star size={13} fill={C.orange} style={{ color: C.orange }} />
                <span>{modul.rating}</span>
              </div>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: C.mid }}>
            {modul.short_description || modul.description || 'Mer information om denna modul kommer snart.'}
          </p>

          {/* Vad du lär dig */}
          {modul.learningPoints && modul.learningPoints.length > 0 && (
            <div className="mb-6 rounded-xl p-4" style={{ background: C.bgAlt }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>
                Vad du lär dig
              </p>
              <ul className="space-y-2">
                {modul.learningPoints.slice(0, 4).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.dark }}>
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          {modul.component ? (
            <Link to={`/module/${modul.slug}`}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
              <Play size={16} /> Starta kursen
            </Link>
          ) : (
            <div className="w-full py-4 rounded-xl font-bold text-center border-2 flex items-center justify-center gap-2"
              style={{ color: C.muted, borderColor: C.border }}>
              <Lock size={16} /> Lanseras snart
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// KURS-KORT
// ════════════════════════════════════════════════════════
const KursKort = ({ modul, index, onOpen }: { modul: any; index: number; onOpen: () => void }) => {
  const hasContent = !!modul.component;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -3 }}
      onClick={onOpen}
      className="rounded-2xl overflow-hidden border cursor-pointer group"
      style={{ borderColor: C.border, background: C.white, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

      {/* Bild */}
      <div className="relative overflow-hidden" style={{ height: 140 }}>
        <img src={modul.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
          alt={modul.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
        {modul.isTrial && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: C.orange }}>Gratis</div>
        )}
        {!hasContent && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <Lock size={11} color="rgba(255,255,255,0.6)" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-black text-sm leading-snug mb-1" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
          {modul.title}
        </h3>
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: C.muted }}>
          {modul.short_description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
            {modul.duration && <span>{modul.duration}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold" style={{ color: hasContent ? C.orange : C.muted }}>
            {hasContent ? <><Play size={10} className="fill-current" /> Tillgänglig</> : 'Snart'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// KAPITEL-SEKTION
// ════════════════════════════════════════════════════════
const KapitelSektion = ({ kap, onOpenModul }: { kap: typeof KAPITEL[0]; onOpenModul: (m: any) => void }) => {
  const navigate = useNavigate();
  const moduler = modulesData.filter((m: any) =>
    kap.kategorier.some(k => (m.category || '').toUpperCase() === k.toUpperCase())
  );

  if (moduler.length === 0) return null;

  return (
    <Reveal>
      <section className="py-14 sm:py-20">
        {/* Kapitel-header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden relative" style={{ height: 200 }}>
              <img src={kap.bild} alt={kap.titel} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)' }} />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="text-3xl mb-2">{kap.emoji}</div>
                <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {kap.titel}
                </h2>
                <p className="text-white/60 text-sm mt-0.5">{kap.subtitle}</p>
              </div>
              {kap.fri && (
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: C.orange }}>Börja här</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: kap.color }}>
              {moduler.length} {moduler.length === 1 ? 'kurs' : 'kurser'}
            </span>
            <p className="text-base leading-relaxed mb-4 max-w-lg" style={{ color: C.mid }}>
              {kap.desc}
            </p>
            {kap.isOversikt && (
              <motion.button whileHover={{ x: 4 }} onClick={() => navigate(`/modules/${kap.oversiktSlug}`)}
                className="inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: kap.color }}>
                Se alla kapitel <ChevronRight size={14} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: C.border }} />

        {/* Kurs-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moduler.map((m: any, i: number) => (
            <KursKort key={m.id} modul={m} index={i} onOpen={() => onOpenModul(m)} />
          ))}
        </div>
      </section>
    </Reveal>
  );
};

// ════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════
const Hero = () => {
  const navigate = useNavigate();
  const totalKurser = modulesData.length;
  const tillgangliga = modulesData.filter((m: any) => !!m.component).length;

  return (
    <section className="relative pt-28 pb-16 overflow-hidden" style={{ background: C.navy }}>
      {/* Subtil gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.orange}15 0%, transparent 70%)`, transform: 'translate(20%, -20%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)`, transform: 'translate(-20%, 20%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
              style={{ background: `${C.orange}22`, color: C.orange, border: `1px solid ${C.orange}44` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
              Styrelsekörkortet® — kursbibliotek
            </span>
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.0] mb-6 text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Allt du behöver<br />
              <span style={{ color: C.orange }}>som styrelseledamot.</span>
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-8 max-w-lg">
              {totalKurser} kurser inom juridik, ekonomi, fastighet och ledarskap. Börja var du vill — gå i din egen takt.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => { document.getElementById('kurser')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base text-white"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 8px 32px ${C.orange}40` }}>
                Utforska kurserna <ArrowRight size={16} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/modules/introduktion')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base"
                style={{ color: 'white', border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)' }}>
                Börja med gratis modul
              </motion.button>
            </div>
          </motion.div>

          {/* Stats-grid */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4">
            {[
              { val: `${totalKurser}`, label: 'Kurser totalt', emoji: '📚' },
              { val: `${tillgangliga}`, label: 'Tillgängliga nu', emoji: '▶️' },
              { val: '6', label: 'Ämnesområden', emoji: '🎯' },
              { val: '4,8 / 5', label: 'Genomsnittligt betyg', emoji: '⭐' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-2xl mb-2">{s.emoji}</div>
                <p className="text-3xl font-black text-white mb-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>{s.val}</p>
                <p className="text-xs text-white/40 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// FILTER-BAR
// ════════════════════════════════════════════════════════
const FilterBar = ({ aktiv, setAktiv }: { aktiv: string; setAktiv: (k: string) => void }) => (
  <div className="sticky top-0 z-30 border-b" style={{ background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-2 overflow-x-auto">
      <button onClick={() => setAktiv('alla')}
        className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        style={{ background: aktiv === 'alla' ? C.orange : C.bgAlt, color: aktiv === 'alla' ? 'white' : C.mid, border: `1px solid ${aktiv === 'alla' ? C.orange : C.border}` }}>
        Alla kurser
      </button>
      {KAPITEL.map(kap => (
        <button key={kap.id} onClick={() => setAktiv(kap.id)}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{ background: aktiv === kap.id ? kap.color : C.bgAlt, color: aktiv === kap.id ? 'white' : C.mid, border: `1px solid ${aktiv === kap.id ? kap.color : C.border}` }}>
          <span>{kap.emoji}</span> {kap.titel}
        </button>
      ))}
    </div>
  </div>
);

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
export default function KursbibliotekSK() {
  const navigate = useNavigate();
  const [valtModul, setValtModul] = useState<any>(null);
  const [aktivFilter, setAktivFilter] = useState('alla');

  const visadeKapitel = aktivFilter === 'alla'
    ? KAPITEL
    : KAPITEL.filter(k => k.id === aktivFilter);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>

      {/* Hero */}
      <Hero />

      {/* Sticky filter */}
      <FilterBar aktiv={aktivFilter} setAktiv={setAktivFilter} />

      {/* Kurssektioner */}
      <div id="kurser" className="max-w-7xl mx-auto px-5 sm:px-8">
        {visadeKapitel.map(kap => (
          <KapitelSektion key={kap.id} kap={kap} onOpenModul={setValtModul} />
        ))}
      </div>

      {/* CTA-banner */}
      <Reveal>
        <section className="py-4 px-4 sm:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl px-8 sm:px-14 py-14 relative overflow-hidden"
              style={{ background: C.navy }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(circle at 80% 50%, ${C.orange}15 0%, transparent 60%)` }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>
                    Hela paketet
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight"
                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Tillgång till alla kurser<br />
                    <span style={{ color: C.orange }}>i ett paket.</span>
                  </h2>
                  <p className="text-white/50 mt-3 max-w-md text-sm leading-relaxed">
                    Styrelsekörkortet® ger er styrelse tillgång till samtliga kurser, scenarios och quiz — med certifikat för varje avslutad modul.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                    className="px-8 py-4 rounded-2xl font-bold text-base"
                    style={{ background: C.orange, color: 'white' }}>
                    Kom igång →
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/seminarier')}
                    className="px-8 py-4 rounded-2xl font-bold text-base text-white"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)' }}>
                    Boka seminarium
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Modal */}
      <AnimatePresence>
        {valtModul && <KursModal modul={valtModul} onClose={() => setValtModul(null)} />}
      </AnimatePresence>
    </div>
  );
}