// src/pages/StyrelsekorkortetLandingUltimate.tsx
// Ultimat landningssida — skissens design + NetflixPage2-innehåll
// Orange/vit, illustrationer, steg-kort, testimonials, modulöversikt

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Check, Star, ChevronDown,
  BookOpen, Award, Users, Clock, Zap, Shield,
  Home, FileText, Gavel, PiggyBank, Wrench, Leaf,
} from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────
const C = {
  orange:   '#FF5421',
  orangeD:  '#E04619',
  orangeL:  '#FFF0EB',
  orangeM:  '#FFD4C4',
  dark:     '#1A1A1A',
  mid:      '#4A4A4A',
  muted:    '#8A8A8A',
  bg:       '#FAFAF8',
  bgAlt:    '#F4F2EE',
  border:   '#E8E5E0',
  white:    '#FFFFFF',
  green:    '#22C55E',
};

// ── Reveal ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 20, className = '' }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ── BRF-illustration SVG ──────────────────────────────────
const BrfIllustration = () => (
  <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Bakgrundscirkel */}
    <circle cx="180" cy="130" r="110" fill="#FFD4C4" opacity="0.4"/>
    {/* Byggnad huvudhus */}
    <rect x="80" y="80" width="120" height="130" rx="4" fill="white" stroke="#E8E5E0" strokeWidth="2"/>
    <rect x="80" y="80" width="120" height="20" rx="4" fill={C.orange}/>
    {/* Fönster rad 1 */}
    {[0,1,2].map(i => <rect key={i} x={95+i*35} y={115} width="22" height="18" rx="3" fill={C.orangeL} stroke={C.orange} strokeWidth="1.5"/>)}
    {/* Fönster rad 2 */}
    {[0,1,2].map(i => <rect key={i} x={95+i*35} y={148} width="22" height="18" rx="3" fill={C.orangeL} stroke={C.orange} strokeWidth="1.5"/>)}
    {/* Dörr */}
    <rect x="145" y="175" width="30" height="35" rx="4" fill={C.orange}/>
    <circle cx="170" cy="193" r="2.5" fill="white"/>
    {/* Sidohus */}
    <rect x="200" y="110" width="70" height="100" rx="3" fill="white" stroke="#E8E5E0" strokeWidth="1.5"/>
    <rect x="200" y="110" width="70" height="16" rx="3" fill="#FFB89A"/>
    {[0,1].map(i => <rect key={i} x={210+i*30} y={140} width="20" height="16" rx="2" fill={C.orangeL} stroke={C.orange} strokeWidth="1"/>)}
    {[0,1].map(i => <rect key={i} x={210+i*30} y={170} width="20" height="16" rx="2" fill={C.orangeL} stroke={C.orange} strokeWidth="1"/>)}
    {/* Mark */}
    <rect x="60" y="210" width="230" height="8" rx="4" fill="#E8E5E0"/>
    {/* Träd */}
    <rect x="55" y="180" width="6" height="32" rx="2" fill="#D4B896"/>
    <circle cx="58" cy="168" r="18" fill="#86EFAC"/>
    <circle cx="48" cy="175" r="12" fill="#4ADE80"/>
    {/* Sol/stjärna */}
    <circle cx="260" cy="60" r="20" fill="#FDE68A"/>
    <circle cx="260" cy="60" r="14" fill="#FCD34D"/>
    {/* Moln */}
    <ellipse cx="100" cy="55" rx="28" ry="14" fill="white"/>
    <ellipse cx="118" cy="50" rx="20" ry="12" fill="white"/>
    <ellipse cx="83" cy="52" rx="16" ry="10" fill="white"/>
  </svg>
);

// ══════════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════════
const Nav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(250,250,248,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.06)' : 'none',
        }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: C.orange }}>
              <Home size={16} style={{ color: '#fff' }} />
            </div>
            <span className="font-black text-base tracking-tight" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet
              <span style={{ color: C.orange }}>®</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[['Utbildningen', '#utbildning'], ['Metodik', '#metodik'], ['Omdömen', '#omdomen'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm font-semibold transition-colors hover:opacity-100"
                style={{ color: C.mid, textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="hidden md:block text-sm font-bold px-4 py-2 rounded-xl transition-all"
              style={{ color: C.dark, border: `1.5px solid ${C.border}` }}>
              Logga in
            </button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
              className="text-sm font-black px-5 py-2.5 rounded-xl text-white"
              style={{ background: C.orange, boxShadow: `0 4px 16px ${C.orange}45` }}>
              Börja utbildningen
            </motion.button>
          </div>
        </div>
      </header>
    </>
  );
};

// ══════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-28 pb-0 relative overflow-hidden" style={{ background: C.bg }}>
      {/* Bakgrundsdekor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.orangeL} 0%, transparent 70%)`, transform: 'translate(20%, -20%)' }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.orangeL} 0%, transparent 70%)`, transform: 'translate(-40%, 40%)' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[520px]">

          {/* Vänster — text */}
          <div className="py-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ background: C.orangeL, color: C.orange }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
              Certifieringsutbildning för BRF-styrelser
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="font-black leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Gör styrelsearbetet{' '}
              <span style={{ color: C.orange }}>enklare & roligare</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: C.mid }}>
              Praktisk utbildning för förtroendevalda i bostadsrättsföreningar.
              Juridik, ekonomi och mötesteknik — i din egen takt, med certifikat.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-base text-white"
                style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}45` }}>
                Börja utbildningen <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/modules')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base"
                style={{ color: C.dark, border: `2px solid ${C.border}`, background: C.white }}>
                Se alla moduler
              </motion.button>
            </motion.div>

            {/* Micro-trust */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap">
              {[
                { icon: '✓', text: '30 dagars garanti' },
                { icon: '✓', text: 'Faktura till föreningen' },
                { icon: '✓', text: '24 mån tillgång' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-sm font-bold" style={{ color: C.orange }}>{item.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: C.mid }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Höger — illustration */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex items-center justify-center">
            <div className="w-full max-w-[400px] mx-auto" style={{ height: 320 }}>
              <BrfIllustration />
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 right-4 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>Certifikat</p>
              <p className="text-sm font-black" style={{ color: C.dark }}>14 moduler</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-12 left-0 rounded-2xl px-4 py-3 shadow-lg"
              style={{ background: C.orange }}>
              <p className="text-xs font-bold text-white/80 mb-0.5">Genomsnittligt betyg</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="white" style={{ color: 'white' }} />)}
                <span className="text-sm font-black text-white ml-1">4,8</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Steg-korten — från skissen */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-0 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { nr: '1', titel: 'Starta', desc: 'Starta utbildningen för hela din styrelse.', emoji: '🚀', orange: true },
            { nr: '2', titel: 'Lär', desc: 'Lär dig grunderna om er BRF.', emoji: '🎓', orange: true },
            { nr: '3', titel: 'Praktisera', desc: 'Mer som konsekvensbedömning och åtgärdslistan.', emoji: '⚡', orange: false },
            { nr: '4', titel: 'Certifiera', desc: 'Certifieras och bekräfta rollen.', emoji: '🏅', orange: false },
          ].map((steg, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }}
                className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer"
                style={{
                  background: steg.orange ? C.orange : C.white,
                  border: steg.orange ? 'none' : `1.5px solid ${C.border}`,
                  boxShadow: steg.orange
                    ? `0 8px 32px ${C.orange}40`
                    : '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                <div className="text-2xl">{steg.emoji}</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: steg.orange ? 'rgba(255,255,255,0.7)' : C.muted }}>
                    {steg.nr}.
                  </p>
                  <p className="font-black text-base mb-1"
                    style={{ color: steg.orange ? '#fff' : C.dark, fontFamily: "'Nunito', sans-serif" }}>
                    {steg.titel}
                  </p>
                  <p className="text-xs leading-relaxed"
                    style={{ color: steg.orange ? 'rgba(255,255,255,0.75)' : C.muted }}>
                    {steg.desc}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// SIFFROR
// ══════════════════════════════════════════════════════════
const Siffror = () => (
  <section className="py-14 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { val: '14', label: 'Moduler', icon: <BookOpen size={20} /> },
          { val: '500+', label: 'Utbildade styrelser', icon: <Users size={20} /> },
          { val: '4,8/5', label: 'Genomsnittligt betyg', icon: <Star size={20} /> },
          { val: '24 mån', label: 'Tillgång till materialet', icon: <Clock size={20} /> },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3"
                style={{ background: C.orangeL, color: C.orange }}>
                {stat.icon}
              </div>
              <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: C.orange }}>
                {stat.val}
              </p>
              <p className="text-sm font-semibold" style={{ color: C.mid }}>{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// UTBILDNINGEN — modulöversikt
// ══════════════════════════════════════════════════════════
const MODULER = [
  { icon: <Gavel size={20} />, titel: 'Juridik & ansvar', desc: 'Bostadsrättslagen, styrelsens ansvar och beslutsfattande.', color: '#EF4444' },
  { icon: <PiggyBank size={20} />, titel: 'Ekonomi & budget', desc: 'Årsredovisning, budget, avgifter och ekonomisk planering.', color: '#F59E0B' },
  { icon: <FileText size={20} />, titel: 'Möten & protokoll', desc: 'Stämman, styrelsemöten, protokollskrivning och kallelser.', color: '#10B981' },
  { icon: <Wrench size={20} />, titel: 'Fastigheten', desc: 'Underhållsplan, OVK, energi och teknisk förvaltning.', color: '#6366F1' },
  { icon: <Shield size={20} />, titel: 'Dataskydd & GDPR', desc: 'Dataskyddsombudets roll och GDPR i BRF-praktiken.', color: '#8B5CF6' },
  { icon: <Leaf size={20} />, titel: 'Hållbarhet', desc: 'Energieffektivisering, solceller och miljöansvar.', color: '#22C55E' },
  { icon: <Users size={20} />, titel: 'Kommunikation', desc: 'Medlemsdialog, konflikter och informationshantering.', color: '#F97316' },
  { icon: <Zap size={20} />, titel: 'AI-verktyg för BRF', desc: 'Hur AI kan effektivisera styrelsearbetet i praktiken.', color: '#0EA5E9' },
];

const Utbildning = () => {
  const navigate = useNavigate();
  return (
    <section id="utbildning" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>
                Utbildningen
              </p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight"
                style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                Allt din styrelse<br />behöver veta.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <button onClick={() => navigate('/modules')}
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl"
              style={{ color: C.dark, border: `2px solid ${C.border}` }}>
              Se alla moduler <ArrowRight size={15} />
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULER.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <motion.div whileHover={{ y: -4 }}
                className="rounded-2xl p-5 cursor-pointer border h-full"
                style={{ background: C.white, borderColor: C.border }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${m.color}15`, color: m.color }}>
                  {m.icon}
                </div>
                <h3 className="font-black text-base mb-2"
                  style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                  {m.titel}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{m.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA under moduler */}
        <Reveal delay={0.2} className="mt-10 text-center">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-base text-white"
            style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}40` }}>
            Starta utbildningen <ArrowRight size={18} />
          </motion.button>
          <p className="text-sm mt-3" style={{ color: C.muted }}>
            Från 1 490 kr/styrelse · Faktura till föreningen
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// METODIK
// ══════════════════════════════════════════════════════════
const Metodik = () => {
  const navigate = useNavigate();
  return (
    <section id="metodik" className="py-20 sm:py-28 border-y"
      style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>
              Vår metodik
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Från osäker till trygg —{' '}
              <span style={{ color: C.orange }}>på några veckor.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: C.mid }}>
              Vi bygger utbildning som utgår från er faktiska situation. Inga onödiga
              juridiska floskler — bara det ni behöver för att fatta rätt beslut.
            </p>
            <div className="space-y-1">
              {[
                ['Förstå', 'Vad er styrelses faktiska ansvar innebär'],
                ['Lär', 'Moduler om juridik, ekonomi och mötesteknik'],
                ['Tillämpa', 'Ni testar direkt på era egna beslut'],
                ['Förankra', 'Delas i styrelsen för gemensam grund'],
              ].map(([nr, text], i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b"
                  style={{ borderColor: C.border }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: C.orangeL }}>
                    <span className="text-sm font-black" style={{ color: C.orange }}>{i + 1}</span>
                  </div>
                  <div>
                    <span className="font-black text-sm" style={{ color: C.orange }}>{nr} — </span>
                    <span className="font-semibold text-sm" style={{ color: C.dark }}>{text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                className="inline-flex items-center gap-2 font-black text-base px-8 py-4 rounded-2xl text-white"
                style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}40` }}>
                Kom igång idag <ArrowRight size={18} />
              </motion.button>
            </div>
          </Reveal>

          {/* Illustrationssida */}
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-48 h-48 rounded-3xl -z-10"
                style={{ background: C.orangeL }} />
              {/* Chat-bubblor från skissen */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border" style={{ borderColor: C.border }}>
                <div className="space-y-4">
                  {[
                    { from: 'Anna, ordförande', msg: 'Måste vi kalla till extra stämma för det här beslutet?', left: true },
                    { from: 'Styrelsekörkortet', msg: 'Nej — detta kan styrelsen besluta om själva enligt bostadsrättslagen. Extra stämma behövs bara vid stadgeändringar.', left: false },
                    { from: 'Anna, ordförande', msg: 'Perfekt, tack! Hittade svaret direkt.', left: true },
                  ].map((b, i) => (
                    <div key={i} className={`flex ${b.left ? '' : 'justify-end'}`}>
                      <div className="max-w-[75%]">
                        <p className="text-xs font-bold mb-1.5" style={{ color: b.left ? C.muted : C.orange }}>
                          {b.from}
                        </p>
                        <div className="rounded-2xl px-4 py-3"
                          style={{
                            background: b.left ? C.bgAlt : C.orange,
                            borderRadius: b.left ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                          }}>
                          <p className="text-sm leading-relaxed"
                            style={{ color: b.left ? C.dark : '#fff' }}>
                            {b.msg}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Emoji-reaktioner */}
                  <div className="flex gap-2 pt-1">
                    {['🎓', '✅', '👍'].map((e, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-full text-sm"
                        style={{ background: C.orangeL, border: `1px solid ${C.border}` }}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-4 shadow-lg"
                style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <p className="text-2xl font-black" style={{ color: C.orange }}>Direkt svar</p>
                <p className="text-xs font-bold mt-0.5" style={{ color: C.muted }}>Inbyggd AI-assistent</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// TESTIMONIALS
// ══════════════════════════════════════════════════════════
const TESTI = [
  { name: 'Maja Lindström', role: 'Ordförande, BRF Lönnen', text: 'Äntligen en utbildning som faktiskt förklarar vad vi ansvarar för — utan att göra oss livrädda. Hela styrelsen har gått den.', result: 'Hela styrelsen utbildad' },
  { name: 'Erik Johansson', role: 'Kassör, BRF Ekbacken', text: 'Vi undvek en stor ekonomisk miss på vårt första årsbokslut efter kursen. Den betalade sig själv direkt.', result: 'Rätt på första bokslutet' },
  { name: 'Sara Nilsson', role: 'Sekreterare, BRF Kastanjen', text: 'Jag var nervös över att bli invald utan erfarenhet. Efter Styrelsekörkortet vet jag vad som förväntas — och vad som inte gör det.', result: 'Trygg från dag ett' },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % TESTI.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTI[active];

  return (
    <section id="omdomen" className="py-20 sm:py-28" style={{ background: C.white }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>
              Testimoniar
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-3"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Hör styrelsemedlemmer{' '}
              <span style={{ color: C.orange }}>om utbildningen.</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: C.mid }}>
              Röster från styrelserummet.
            </p>
            <div className="flex gap-2">
              {TESTI.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="rounded-full transition-all"
                  style={{ width: active === i ? 28 : 10, height: 10, background: active === i ? C.orange : C.border }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="rounded-3xl p-8"
                style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
                  style={{ background: C.orangeL, color: C.orange }}>
                  ✓ {t.result}
                </div>
                <blockquote className="text-xl font-semibold leading-snug mb-6"
                  style={{ color: C.dark }}>
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
                    style={{ background: C.orange }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// FAQ
// ══════════════════════════════════════════════════════════
const FAQS = [
  { q: 'Passar utbildningen även små föreningar?', a: 'Absolut. Kursen är lika relevant för en styrelse med 10 lägenheter som för en med 200. Ansvaret och ramverket är detsamma — bara skalan skiljer.' },
  { q: 'Behöver hela styrelsen gå kursen?', a: 'Vi rekommenderar att minst ordförande och kassör går den, men hela styrelsen får mest värde. Ni får en gemensam grund att stå på.' },
  { q: 'Kan fakturan skickas till föreningen?', a: 'Ja. Vi fakturerar direkt till bostadsrättsföreningen med 30 dagars netto utan kreditkort.' },
  { q: 'Hur länge har vi tillgång till materialet?', a: 'Ni har tillgång i 24 månader från köpdatum. Nya ledamöter som väljs in under mandatperioden kan gå kursen utan extra kostnad.' },
  { q: 'Är kursen uppdaterad med senaste lagändringarna?', a: 'Ja. Vi uppdaterar innehållet löpande när bostadsrättslagen eller andra relevanta lagar ändras.' },
  { q: 'Vad gäller om vi inte är nöjda?', a: '30 dagars pengarna-tillbaka-garanti. Är ni inte nöjda returnerar vi hela beloppet utan frågor.' },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 sm:py-28 border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            Vanliga frågor.
          </h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border overflow-hidden"
                style={{ borderColor: C.border, background: C.white }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-bold text-base" style={{ color: C.dark }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }}
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: open === i ? C.orange : C.bgAlt }}>
                    <span className="text-lg font-black leading-none"
                      style={{ color: open === i ? '#fff' : C.muted }}>+</span>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                      exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: C.mid }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// CTA BANNER
// ══════════════════════════════════════════════════════════
const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8 px-4 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 relative overflow-hidden"
            style={{ background: C.orange }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
            {/* BRF illustration i bakgrunden */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 opacity-20 hidden lg:block">
              <BrfIllustration />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
                  Redo att ta klivet?
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Trygga styrelsens<br />arbete idag.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                  className="px-8 py-4 rounded-2xl font-black text-base"
                  style={{ background: C.white, color: C.orange }}>
                  Börja utbildningen →
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/seminarier')}
                  className="px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.3)' }}>
                  Boka seminarium
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-12 mt-4 border-t" style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: C.orange }}>
                <Home size={16} style={{ color: '#fff' }} />
              </div>
              <span className="font-black" style={{ color: C.dark }}>
                <span style={{ color: C.orange }}>Styrelse</span>körkortet
                <span style={{ color: C.orange }}>®</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Praktisk styrelseutbildning för BRF.<br />Malmö / Lund – online & på plats.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Utbildningar</p>
            <div className="space-y-2">
              {['Träningsprogram', 'Workshop', 'Seminarium', 'Rådgivning'].map(l => (
                <button key={l} onClick={() => navigate('/modules')}
                  className="block text-sm font-medium hover:opacity-80"
                  style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Företaget</p>
            <div className="space-y-2">
              {[['Om oss', '/om-oss'], ['Seminarier', '/seminarier'], ['Kontakt', '/om-oss']].map(([l, p]) => (
                <button key={l} onClick={() => navigate(p)}
                  className="block text-sm font-medium hover:opacity-80"
                  style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
          style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.muted }}>© 2026 Styrelsekörkortet®. Alla rättigheter förbehållna.</p>
          <div className="flex gap-5">
            {['Integritetspolicy', 'Villkor'].map(l => (
              <button key={l} className="text-xs hover:opacity-80" style={{ color: C.muted }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════
export default function StyrelsekorkortetLandingUltimate() {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>
      <Nav />
      <Hero />
      <Siffror />
      <Utbildning />
      <Metodik />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}