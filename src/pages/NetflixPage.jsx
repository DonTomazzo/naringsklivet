// src/pages/StyrelsekorkortetLanding.jsx
// Landningssida för Styrelsekörkortet® — förtroendevalda i BRF

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle, ChevronDown } from 'lucide-react';

const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  dark:    '#171f32',
  mid:     '#4A4A4A',
  muted:   '#8A8A8A',
  bg:      '#FAFAF8',
  bgAlt:   '#F4F2EE',
  border:  '#E8E5E0',
  white:   '#FFFFFF',
};

const Reveal = ({ children, delay = 0, y = 24, className = '' }) => {
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
          background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Styrelsekörkortet" className="w-8 h-8 object-contain" />
            <span className="font-bold text-base tracking-tight" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet®
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[['Utbildningar', '/modules'], ['Seminarier', '/seminarier'], ['Om oss', '/om-oss']].map(([label, path]) => (
              <button key={label} onClick={() => navigate(path)}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: C.mid }}>{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="hidden md:block text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ color: C.dark, border: `1.5px solid ${C.border}` }}>
              Logga in
            </button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/seminarier')}
              className="text-sm font-bold px-4 py-2 rounded-lg text-white"
              style={{ background: C.orange }}>
              Boka 
            </motion.button>
            <button className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMobileOpen(p => !p)}>
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, transform: mobileOpen ? 'rotate(45deg) translate(3px,3px)' : 'none' }} />
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, opacity: mobileOpen ? 0 : 1 }} />
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, transform: mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 pt-16 px-5 pb-8 flex flex-col" style={{ background: C.bg }}>
            <div className="flex flex-col gap-1 mt-8">
              {[['Utbildningar','/modules'],['Seminarier','/seminarier'],['Om oss','/om-oss']].map(([l,p]) => (
                <button key={l} onClick={() => { navigate(p); setMobileOpen(false); }}
                  className="text-left text-2xl font-bold py-4 border-b"
                  style={{ color: C.dark, borderColor: C.border }}>{l}</button>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/seminarier')}
              className="mt-auto w-full py-4 rounded-2xl text-white font-bold text-lg"
              style={{ background: C.orange }}>
              Boka seminarium
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ══════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-28 pb-0 overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.orangeL} 0%, transparent 70%)`, transform: 'translate(30%, -20%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{ background: C.orangeL, color: C.orange }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
          Certfieringsutbildning för förtroendevalda i bostadsrättsföreningar 
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Vänster */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
            <h1 className="text-5xl sm:text-7xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}> <br />
              Bli tryggare<br />
              <span style={{ color: C.orange }}>i din styrelseroll </span><br /> 
              för en bättre mandatperiod
            </h1> 
            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-lg" style={{ color: C.mid }}>
              Det enda träningsprogrammet i Sverige skräddarsydd för förtroendevalda i bostadsrättsföreningar.
              Lär dig juridik, ekonomi, AI och förvaltning — utan krångel. 
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/modules')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white"
                style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}40` }}>
                Se hela innehållet <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/seminarier')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base"
                style={{ color: C.dark, border: `2px solid ${C.border}`, background: C.white }}>
                Boka till din BRF
              </motion.button>
            </div>
          </motion.div>

          {/* Höger — grundarbild */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }} className="relative">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl">
                <img src="/founder.png" alt="Tomas Mauritzson — Styrelsekörkortet"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>Styrelsekörkortet®</p>
                <p className="text-sm font-bold text-slate-800">164+ utbildade styrelser</p>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-10 -z-10" style={{ background: C.orange }} />
            </div>
          </motion.div>
        </div>

        {/* Story-sektion under hero-grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }} className="w-full mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            <div className="lg:col-span-3 text-center lg:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 text-white"
                style={{ background: C.orange }}>Varför Styrelsekörkortet?</span>
              <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight"
                style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                Styrelseuppdrag är <span style={{ color: C.orange }}>juridiskt ansvar.</span><br />
                Inte frivilligarbete.
              </h2>
              <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Som styrelseledamot i en BRF bär du ett personligt juridiskt ansvar för fastigheten,
                  ekonomin och de boende. Det är ett uppdrag som kräver kunskap — men de flesta lämnas
                  utan utbildning, utan stöd och utan en klar bild av vad som faktiskt förväntas av dem.
                </p>
                <p>
                  Styrelsekörkortet® täcker allt du behöver: bostadsrättslagen, föreningsekonomi,
                  protokoll och dokumentation, underhållsplanering, GDPR och hur ni använder AI för att
                  halvera administrationen — helt utan teknisk bakgrund.
                </p>
              </div>
              <div className="mt-10">
                <button onClick={() => navigate('/modules')}
                  className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-xl text-white transition-transform hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                  Se hela innehållet <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative w-full max-w-[200px] lg:max-w-full">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src="/founder3.png" alt="" className="w-full h-auto object-cover" />
                </div>
                <div className="absolute -z-10 -bottom-3 -left-3 w-12 h-12 rounded-full opacity-20" style={{ background: C.orange }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero bottom image */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36 }}
          className="mt-12 rounded-t-3xl overflow-hidden relative"
          style={{ height: '420px', marginLeft: '-1.25rem', marginRight: '-1.25rem' }}>
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=85"
            alt="BRF-styrelsemöte" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${C.dark}55 0%, transparent 50%, ${C.orange}22 100%)` }} />
          <div className="absolute bottom-6 left-6 sm:left-10 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.orange }} />
            <span className="text-sm font-bold" style={{ color: C.dark }}>
              Nästa BRF-seminarium: <span style={{ color: C.orange }}>maj 2026</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

{/* Story-sektion under hero-grid */}
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65, delay: 0.2 }} className="w-full mt-20">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
    
    {/* BILDEN (Nu först i koden = till vänster) */}
    <div className="lg:col-span-1 flex justify-center">
      <div className="relative w-full max-w-[200px] lg:max-w-full">
        <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white -rotate-3 hover:rotate-0 transition-transform duration-300">
          <img src="/founder3.png" alt="" className="w-full h-auto object-cover" />
        </div>
        {/* Justerade cirkeln bakom till höger istället för vänster */}
        <div className="absolute -z-10 -bottom-3 -right-3 w-12 h-12 rounded-full opacity-20" style={{ background: C.orange }} />
      </div>
    </div>

    {/* TEXTEN (Nu efter bilden = till höger) */}
    <div className="lg:col-span-3 text-center lg:text-left">
      <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 text-white"
        style={{ background: C.orange }}>Varför Styrelsekörkortet?</span>
      <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight"
        style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
        Styrelseuppdrag är <span style={{ color: C.orange }}>juridiskt ansvar.</span><br />
        Inte frivilligarbete.
      </h2>
      <div className="max-w-3xl mx-auto lg:mx-0 space-y-6 text-lg text-slate-600 leading-relaxed">
        <p>
          Som styrelseledamot i en BRF bär du ett personligt juridiskt ansvar för fastigheten,
          ekonomin och de boende. Det är ett uppdrag som kräver kunskap — men de flesta lämnas
          utan utbildning, utan stöd och utan en klar bild av vad som faktiskt förväntas av dem.
        </p>
        <p>
          Styrelsekörkortet® täcker allt du behöver: bostadsrättslagen, föreningsekonomi,
          protokoll och dokumentation, underhållsplanering, GDPR och hur ni använder AI för att
          halvera administrationen — helt utan teknisk bakgrund.
        </p>
      </div>
      <div className="mt-10">
        <button onClick={() => navigate('/modules')}
          className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-xl text-white transition-transform hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
          Se hela utbildningen <ArrowRight size={18} />
        </button>
      </div>
    </div>

  </div>
</motion.div>

// ══════════════════════════════════════════════════════════
// LOGO BAND — partner-symboler
// ══════════════════════════════════════════════════════════
const LogoBand = () => (
  <section className="py-10 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-center mb-6" style={{ color: C.muted }}>
        Utbildar styrelser i hela Sverige
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {['BRF Kastanjen', 'BRF Ekbacken', 'BRF Solbacken', 'BRF Linden', 'BRF Granbacken'].map((name, i) => (
          <span key={i} className="text-base font-black tracking-tight opacity-30" style={{ color: C.dark }}>{name}</span>
        ))}
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// UTBILDNINGAR
// ══════════════════════════════════════════════════════════
const COURSES = [
  {
    tag: 'Certifieringsprogram',
    title: 'Styrelsekörkortet — hela programmet',
    desc: '14 moduler. Bostadsrättslagen, ekonomi, protokoll, GDPR, underhållsplanering och AI. I din egen takt.',
    price: 'Från 1 490 kr / styrelse',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    path: '/modules',
    // featured borttaget
  },
  {
    tag: '+ Tilläggskurs på plats eller online',
    title: 'AI för BRF-styrelsen',
    desc: '3 timmar live. Protokoll på 10 min, brev till boende och ChatGPT/Claude i praktiken. Online eller på plats.',
    price: '4 900 kr / styrelse',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    path: '/seminarier',
  },
  {
    tag: 'Modul',
    title: 'Bostadsrättslagen — ditt ansvar',
    desc: 'Förstå BRL utan juridisk bakgrund. Vad du får och inte får besluta. Scenarier från verkligheten.',
    price: 'Ingår i programmet',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    path: '/modules',
  },
  // Fastigheten-objektet borttaget
];

const CourseCard = ({ course, index }) => {
  const navigate = useNavigate();
  return (
    <Reveal delay={index * 0.07}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`rounded-3xl overflow-hidden border cursor-pointer group ${course.featured ? 'lg:col-span-2' : ''}`}
        style={{ borderColor: C.border, background: C.white }}
        onClick={() => navigate(course.path)}>
        <div className={`relative overflow-hidden ${course.featured ? 'h-72 sm:h-80' : 'h-52'}`}>
          <img src={course.img} alt={course.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0"
            style={{ background: course.featured ? `linear-gradient(to top, ${C.dark}cc 0%, transparent 60%)` : `linear-gradient(to top, ${C.dark}88 0%, transparent 60%)` }} />
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{ background: C.orange }}>{course.tag}</div>
          {course.featured && (
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">{course.title}</h3>
              <p className="text-white/70 text-sm">{course.desc}</p>
            </div>
          )}
        </div>
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            {!course.featured && <h3 className="font-black text-lg mb-1" style={{ color: C.dark }}>{course.title}</h3>}
            {!course.featured && <p className="text-sm leading-relaxed mb-3" style={{ color: C.mid }}>{course.desc}</p>}
            <span className="text-sm font-bold" style={{ color: C.orange }}>{course.price}</span>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
            style={{ background: C.orangeL }}>
            <ArrowUpRight size={18} style={{ color: C.orange }} />
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
};

const Utbildningar = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Utbildningar</p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight"
                style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>Våra utbildningar.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <button onClick={() => navigate('/modules')}
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all"
              style={{ color: C.dark, border: `2px solid ${C.border}` }}>
              Se alla <ArrowRight size={15} />
            </button>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((c, i) => <CourseCard key={i} course={c} index={i} />)}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// METODIK — vad kursen täcker
// ══════════════════════════════════════════════════════════
const Metodik = () => (
  <section className="py-20 sm:py-28 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Vad kursen täcker</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6"
            style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            Från nybörjare<br />till trygg ledamot —<br />
            <span style={{ color: C.orange }}>på riktigt.</span>
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: C.mid }}>
            Inga generella kurser. Allt innehåll är byggt för en BRF-styrelses
            faktiska vardag — med scenarier, quiz och verkliga exempel.
          </p>
          <div className="space-y-3">
            {[
              'Bostadsrättslagen — ditt juridiska ansvar som ledamot',
              'Föreningsekonomi — förstå årsredovisning och fondering',
              'Protokoll & dokumentation — rätt format, rätt arkivering',
              'Fastigheten — brandskydd, OVK, hissar och bygglov',
              'GDPR — hantera personuppgifter rätt i föreningen',
              'AI för styrelsen — halvera administrationen från dag ett',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b" style={{ borderColor: C.border }}>
                <span className="text-2xl font-black flex-shrink-0 w-8"
                  style={{ color: `${C.orange}50` }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="font-semibold" style={{ color: C.dark }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-48 h-48 rounded-3xl -z-10"
              style={{ background: C.orangeL }} />
            <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl">
              <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=85"
                alt="Styrelsearbete" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 shadow-xl"
              style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <p className="text-3xl font-black" style={{ color: C.orange }}>14</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: C.muted }}>Moduler med scenarier & quiz</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// TESTIMONIALS
// ══════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    name: 'Anna Lindqvist', role: 'Ordförande, BRF Kastanjen Malmö',
    text: 'Äntligen förstår jag vad jag faktiskt ansvarar för som ordförande. Styrelsekörkortet gav mig en helhetsbild på tre timmar som jag inte fått på fem år i styrelsen.',
    result: 'Trygg i ordföranderollen',
  },
  {
    name: 'Erik Bergström', role: 'Sekreterare, BRF Ekbacken Lund',
    text: 'Vi skriver nu protokoll på 15 minuter med AI-hjälp. Innan tog det 2–3 timmar. Och vi vet nu hur vi ska hantera GDPR rätt utan att anlita konsult.',
    result: 'Sparar 2h per möte',
  },
  {
    name: 'Maria Johansson', role: 'Kassör, BRF Solbacken',
    text: 'Modulen om föreningsekonomi öppnade ögonen. Jag förstår nu vad K3 innebär för vår fondering och kan föra ett vettigt samtal med revisorn.',
    result: 'Förstår ekonomin på djupet',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section className="py-20 sm:py-28" style={{ background: C.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Omdömen</p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-10"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Styrelser som<br />gjort det — berättar.
            </h2>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
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
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                className="rounded-3xl p-8 sm:p-10"
                style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                  style={{ background: C.orangeL, color: C.orange }}>✓ {t.result}</div>
                <blockquote className="text-xl sm:text-2xl font-semibold leading-snug mb-8"
                  style={{ color: C.dark }}>"{t.text}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: C.orange }}>{t.name[0]}</div>
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
  { q: 'Passar kursen mig som är helt ny i styrelsen?', a: 'Absolut. Styrelsekörkortet börjar från grunden och förutsätter ingen juridisk eller ekonomisk bakgrund. Kursen är designad för vanliga människor som tagit på sig ett stort ansvar.' },
  { q: 'Hur lång tid tar det att genomföra hela programmet?', a: 'De flesta styrelser genomför det på 3–6 veckor i sin egen takt. Varje modul är 20–45 minuter. Ni kan börja med de moduler ni behöver mest.' },
  { q: 'Kan hela styrelsen delta med ett konto?', a: 'Ja. Kurspriset gäller per styrelse — oavsett hur många ledamöter ni är. Alla ledamöter kan delta och ta del av kursbeviset.' },
  { q: 'Ingår AI-modulen i priset?', a: 'Ja. Modulen "AI för BRF-styrelsen" ingår i det fullständiga Styrelsekörkortet. Det finns även som separat seminarium för styrelser som bara vill ha AI-utbildningen.' },
  { q: 'Hur fungerar betalning?', a: 'Vi fakturerar mot 30 dagars netto. Inga kreditkort krävs. Ni kan också betala på stämmans uppdrag om föreningen bekostar utbildningen.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 sm:py-28 border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>Vanliga frågor.</h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl border overflow-hidden"
                style={{ borderColor: C.border, background: C.white }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-bold text-base" style={{ color: C.dark }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: open === i ? C.orange : C.bgAlt }}>
                    <span className="text-lg font-black leading-none"
                      style={{ color: open === i ? C.white : C.muted }}>+</span>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                      exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
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
    <section className="py-4 px-4 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 relative overflow-hidden"
            style={{ background: C.orange }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Redo att börja?</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Ge er styrelse<br />det stöd den förtjänar.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/modules')}
                  className="px-8 py-4 rounded-2xl font-bold text-base"
                  style={{ background: C.white, color: C.orange }}>
                  Se hela programmet →
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Styrelsekörkortet" className="w-8 h-8 object-contain" />
              <span className="font-bold" style={{ color: C.dark }}>
                <span style={{ color: C.orange }}>Styrelse</span>körkortet®
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Utbildning för BRF-styrelser.<br />Malmö / Lund – online & på plats.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Utbildningar</p>
            <div className="space-y-2">
              {['Hela programmet', 'AI-seminarium', 'Bostadsrättslagen', 'Fastigheten'].map(l => (
                <button key={l} onClick={() => navigate('/modules')}
                  className="block text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Företaget</p>
            <div className="space-y-2">
              {[['Om oss','/om-oss'],['Seminarier','/seminarier'],['Kontakt','/om-oss']].map(([l,p]) => (
                <button key={l} onClick={() => navigate(p)}
                  className="block text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
          style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.muted }}>© 2026 Styrelsekörkortet®. Alla rättigheter förbehållna.</p>
          <div className="flex gap-5">
            {['Integritetspolicy','Villkor'].map(l => (
              <button key={l} className="text-xs hover:opacity-80 transition-opacity"
                style={{ color: C.muted }}>{l}</button>
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
export default function StyrelsekorkortetLanding() {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>
      <Nav />
      <Hero />
      <LogoBand />
      <Utbildningar />
      <Metodik />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}