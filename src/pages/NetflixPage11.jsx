// src/pages/StartsidaNy.jsx
// Ny startsida för utbildningsföretaget — matchar mockupen.
// Stack: React + Vite, react-router-dom, framer-motion, lucide-react, Tailwind.
//
// ─────────────────────────────────────────────────────────────
//  ASSETS DU LÄGGER I /public (byt ut mot dina egna):
//    /owl.png            → hero-maskoten (ugglan på podiet)
//    /logo.png           → logotyp i nav + footer (finns redan)
//    /card-book.png      → 3D-ikon, kurskort 1
//    /card-team.png      → 3D-ikon, kurskort 2
//    /card-shield.png    → 3D-ikon, kurskort 3
//    /card-laptop.png    → 3D-ikon, kurskort 4
//  Innehållsfoton nedan är Unsplash-placeholders — byt fritt.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, ArrowLeft, Check, Quote,
  GraduationCap, Users, BarChart3, ShieldCheck,
  Cpu, Landmark, HeartHandshake, MessagesSquare,
} from 'lucide-react';

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════
const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  dark:    '#171F32',
  mid:     '#4A4A4A',
  muted:   '#8A8A8A',
  bg:      '#FAF8F4',   // varm cream (mockupens bakgrund)
  bgAlt:   '#F1EEE8',   // ljusare panel
  panel:   '#FFFFFF',
  border:  '#EAE6DF',
  white:   '#FFFFFF',
};

// ══════════════════════════════════════════════════════════
//  UTIL: scroll-reveal
// ══════════════════════════════════════════════════════════
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

const OrangeRule = ({ className = '' }) => (
  <span className={`block rounded-full ${className}`}
    style={{ width: 48, height: 4, background: C.orange }} />
);

// ══════════════════════════════════════════════════════════
//  MENYDATA  (ubermeny: kategorier + utvalda kurser)
// ══════════════════════════════════════════════════════════
const CATEGORIES = [
  { icon: GraduationCap, label: 'Ledarskap & chef',      desc: 'Bli en tryggare ledare',        path: '/utbildningar/ledarskap' },
  { icon: Cpu,           label: 'Digitalisering & AI',   desc: 'AI i praktiken, från dag ett',   path: '/utbildningar/ai' },
  { icon: Landmark,      label: 'Ekonomi & juridik',     desc: 'Förstå siffrorna och ansvaret',  path: '/utbildningar/ekonomi' },
  { icon: HeartHandshake,label: 'Arbetsmiljö & HR',      desc: 'Friska team som håller',         path: '/utbildningar/arbetsmiljo' },
  { icon: MessagesSquare,label: 'Kommunikation & sälj',  desc: 'Nå fram varje gång',             path: '/utbildningar/kommunikation' },
];

const FEATURED = [
  {
    tag: 'Populärast', title: 'AI för hela teamet',
    desc: 'Kom igång med AI i det dagliga arbetet.', price: 'Från 1 490 kr',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
    path: '/utbildningar/ai-team',
  },
  {
    tag: 'Ny', title: 'Ledarskap i förändring',
    desc: 'Led ditt team tryggt genom omställning.', price: 'Från 2 900 kr',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    path: '/utbildningar/ledarskap-forandring',
  },
];

// ══════════════════════════════════════════════════════════
//  NAV  (pill-meny + ubermeny + hamburger)
// ══════════════════════════════════════════════════════════
const Nav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);        // desktop ubermeny
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileUtb, setMobileUtb] = useState(false); // accordion i hamburgaren
  const closeTimer = useRef(null);

  // go(): navigera + stäng allt (undviker att menyer hänger kvar)
  const go = useCallback((path) => {
    navigate(path);
    setMega(false);
    setMobileOpen(false);
    setMobileUtb(false);
  }, [navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape stänger ubermenyn
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMega(false); setMobileOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lås scroll när mobilmenyn är öppen
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMega  = () => { clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4"
      onMouseLeave={closeMega}>
      <div className="max-w-6xl mx-auto">
        {/* PILL-BAREN */}
        <div className="flex items-center justify-between rounded-full pl-5 pr-2.5 h-16 transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(14px)',
            border: `1px solid ${C.border}`,
            boxShadow: scrolled ? '0 12px 40px rgba(23,31,50,0.10)' : '0 6px 24px rgba(23,31,50,0.06)',
          }}>
          {/* Logo */}
          <button className="flex items-center gap-2.5" onClick={() => go('/')}>
            <img src="/logo.png" alt="" className="w-8 h-8 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-black text-base tracking-tight" style={{ color: C.dark }}>
              Utbildnings<span style={{ color: C.orange }}>bolaget</span>
            </span>
          </button>

          {/* Desktop-länkar */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Ubermeny-triggern */}
            <button
              onMouseEnter={openMega}
              onClick={() => setMega((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              style={{ color: mega ? C.orange : C.mid, background: mega ? C.orangeL : 'transparent' }}>
              Utbildningar
              <motion.span animate={{ rotate: mega ? 180 : 0 }} transition={{ duration: 0.2 }}
                className="inline-block">
                <ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} />
              </motion.span>
            </button>
            {[['Seminarier', '/seminarier'], ['Om oss', '/om-oss'], ['Kontakt', '/kontakt']].map(([l, p]) => (
              <button key={l} onClick={() => go(p)}
                className="text-sm font-semibold px-4 py-2 rounded-full transition-colors hover:bg-black/[0.03]"
                style={{ color: C.mid }}>{l}</button>
            ))}
          </nav>

          {/* Höger: logga in + CTA + hamburger */}
          <div className="flex items-center gap-2">
            <button onClick={() => go('/login')}
              className="hidden md:block text-sm font-semibold px-4 py-2.5 rounded-full transition-colors hover:bg-black/[0.03]"
              style={{ color: C.dark }}>
              Logga in
            </button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => go('/kom-igang')}
              className="hidden sm:inline-flex text-sm font-bold px-5 py-3 rounded-full text-white"
              style={{ background: C.orange }}>
              Kom igång
            </motion.button>

            {/* Hamburger */}
            <button aria-label="Öppna meny"
              className="md:hidden w-11 h-11 flex flex-col justify-center items-center gap-1.5 rounded-full"
              style={{ background: C.orangeL }}
              onClick={() => setMobileOpen((v) => !v)}>
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, transform: mobileOpen ? 'rotate(45deg) translate(3px,3px)' : 'none' }} />
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, opacity: mobileOpen ? 0 : 1 }} />
              <span className="w-5 h-0.5 rounded-full transition-all" style={{ background: C.dark, transform: mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── UBERMENY (desktop) ── */}
        <AnimatePresence>
          {mega && (
            <motion.div
              onMouseEnter={openMega} onMouseLeave={closeMega}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block absolute left-4 right-4 sm:left-6 sm:right-6 mt-3"
              style={{ zIndex: 40 }}>
              <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden"
                style={{ background: C.white, border: `1px solid ${C.border}`, boxShadow: '0 24px 60px rgba(23,31,50,0.14)' }}>
                <div className="grid grid-cols-5">
                  {/* Kategorier */}
                  <div className="col-span-3 p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>
                      Kategorier
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CATEGORIES.map(({ icon: Icon, label, desc, path }) => (
                        <button key={label} onClick={() => go(path)}
                          className="flex items-start gap-3 p-3 rounded-2xl text-left transition-colors hover:bg-black/[0.03] group">
                          <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: C.orangeL }}>
                            <Icon size={18} style={{ color: C.orange }} />
                          </span>
                          <span>
                            <span className="block text-sm font-bold" style={{ color: C.dark }}>{label}</span>
                            <span className="block text-xs mt-0.5" style={{ color: C.muted }}>{desc}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Utvalda kurser */}
                  <div className="col-span-2 p-6" style={{ background: C.bg, borderLeft: `1px solid ${C.border}` }}>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>
                      Utvalda utbildningar
                    </p>
                    <div className="space-y-3">
                      {FEATURED.map((f) => (
                        <button key={f.title} onClick={() => go(f.path)}
                          className="flex items-center gap-3 w-full text-left rounded-2xl p-2 transition-colors hover:bg-white group"
                          style={{ border: `1px solid transparent` }}>
                          <img src={f.img} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                          <span className="min-w-0">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1"
                              style={{ background: C.orangeL, color: C.orange }}>{f.tag}</span>
                            <span className="block text-sm font-bold truncate" style={{ color: C.dark }}>{f.title}</span>
                            <span className="block text-xs font-semibold" style={{ color: C.orange }}>{f.price}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottenrad */}
                <button onClick={() => go('/utbildningar')}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold transition-colors hover:opacity-90"
                  style={{ background: C.dark, color: C.white }}>
                  Se alla utbildningar <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MOBILMENY ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 pt-24 px-5 pb-8 flex flex-col overflow-y-auto"
            style={{ background: C.bg }}>
            <div className="flex flex-col gap-1">
              {/* Utbildningar-accordion */}
              <button onClick={() => setMobileUtb((v) => !v)}
                className="flex items-center justify-between text-left text-2xl font-black py-4 border-b"
                style={{ color: C.dark, borderColor: C.border }}>
                Utbildningar
                <motion.span animate={{ rotate: mobileUtb ? 45 : 0 }} transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-2xl font-light leading-none"
                  style={{ background: C.orangeL, color: C.orange }}>+</motion.span>
              </button>
              <AnimatePresence>
                {mobileUtb && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="py-2 pl-1 space-y-1">
                      {CATEGORIES.map(({ icon: Icon, label, path }) => (
                        <button key={label} onClick={() => go(path)}
                          className="flex items-center gap-3 w-full text-left py-3 px-2 rounded-xl"
                          style={{ color: C.mid }}>
                          <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: C.orangeL }}>
                            <Icon size={16} style={{ color: C.orange }} />
                          </span>
                          <span className="font-semibold">{label}</span>
                        </button>
                      ))}
                      <button onClick={() => go('/utbildningar')}
                        className="flex items-center gap-2 py-3 px-2 font-bold text-sm" style={{ color: C.orange }}>
                        Se alla utbildningar <ArrowRight size={15} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {[['Seminarier', '/seminarier'], ['Om oss', '/om-oss'], ['Kontakt', '/kontakt'], ['Logga in', '/login']].map(([l, p]) => (
                <button key={l} onClick={() => go(p)}
                  className="text-left text-2xl font-black py-4 border-b"
                  style={{ color: C.dark, borderColor: C.border }}>{l}</button>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.97 }} onClick={() => go('/kom-igang')}
              className="mt-auto w-full py-4 rounded-2xl text-white font-bold text-lg"
              style={{ background: C.orange }}>
              Kom igång
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ── HERO (bakgrundsbild med ugglan inbakad) ──
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden" style={{ background: C.bg }}>
      {/* Bakgrundsbilden – ugglan finns i den */}
      <img src="/bajs.png" alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'right center' }} />

      {/* Cream-scrim till vänster så texten alltid är läsbar */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${C.bg} 0%, ${C.bg} 28%, ${C.bg}cc 44%, transparent 68%)` }} />

      {/* Innehåll */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="min-h-[540px] sm:min-h-[620px] flex items-center pt-28 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-7"
              style={{ background: C.orangeL, color: C.orange }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
              Utbildning som gör skillnad
            </div>

           <h1 className="text-5xl sm:text-6xl font-black leading-[1.02] tracking-tight mb-6"
  style={{ color: C.dark }}>
  Utbildningar som<br />stärker er <span style={{ color: C.orange }}>organisation</span>
</h1>
            <OrangeRule className="mb-7" />

            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: C.mid }}>
              Praktiska och engagerande utbildningar som ger kunskap, skapar resultat
              och gör skillnad — på riktigt.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/utbildningar')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white"
                style={{ background: C.orange, boxShadow: `0 10px 30px ${C.orange}40` }}>
                Utforska utbildningar <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/demo')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base"
                style={{ color: C.dark, border: `2px solid ${C.border}`, background: C.white }}>
                Boka en demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
//  FEATURE-RAD (4 kort)
// ══════════════════════════════════════════════════════════
const FEATURES = [
  { icon: GraduationCap, title: 'Certifierade kurser', desc: 'Framtagna av experter, med kursbevis som räknas.' },
  { icon: Users,         title: 'Lärande i grupp',     desc: 'Hela teamet växer tillsammans, i egen takt eller live.' },
  { icon: BarChart3,     title: 'Mätbara resultat',    desc: 'Följ utveckling och effekt med tydlig uppföljning.' },
  { icon: ShieldCheck,   title: 'Trygg leverans',      desc: 'GDPR-säkert, med support och en plattform som fungerar.' },
];

const FeatureRow = () => (
  <section className="px-5 sm:px-8 -mt-2" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <div className="rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: C.panel, border: `1px solid ${C.border}`, boxShadow: '0 8px 30px rgba(23,31,50,0.05)' }}>
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div key={title}
              className="px-4 py-4 lg:py-2"
              style={{ borderLeft: i > 0 ? `1px solid ${C.border}` : 'none' }}>
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: C.bgAlt }}>
                <Icon size={22} style={{ color: C.dark }} />
              </span>
              <OrangeRule className="mb-3" />
              <h3 className="font-black text-base mb-1.5" style={{ color: C.dark }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
//  EFFEKT-SEKTION (bild + checklista)
// ══════════════════════════════════════════════════════════
const CHECKS = [
  'Innehåll anpassat efter er bransch och vardag',
  'Korta moduler som fungerar mellan mötena',
  'Kursbevis och uppföljning för hela teamet',
  'Support från riktiga människor, inte bottar',
];

const Effekt = () => (
  <section className="py-20 sm:py-28 px-5 sm:px-8" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Bild */}
      <Reveal>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[5/4] shadow-xl">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=85"
              alt="" className="w-full h-full object-cover" />
          </div>
          {/* Överlappande cirkel-badge */}
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: C.white, border: `1px solid ${C.border}` }}>
            <HeartHandshake size={34} style={{ color: C.orange }} />
          </div>
          {/* Prickdekor */}
          <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-1.5 opacity-40">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: C.orange }} />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Text */}
      <Reveal delay={0.1}>
        <OrangeRule className="mb-5" />
        <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6" style={{ color: C.dark }}>
          Utbildningar som<br />ger effekt
        </h2>
        <p className="text-lg leading-relaxed mb-8" style={{ color: C.mid }}>
          Vi bygger varje utbildning kring er verklighet — med scenarier, quiz och verktyg
          ni använder redan nästa vecka. Ingen hyllvara, ingen teori för teorins skull.
        </p>
        <div className="space-y-3">
          {CHECKS.map((c) => (
            <div key={c} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: C.orangeL }}>
                <Check size={14} strokeWidth={3} style={{ color: C.orange }} />
              </span>
              <span className="font-semibold" style={{ color: C.dark }}>{c}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
//  KURS-KARUSELL
// ══════════════════════════════════════════════════════════
const CARDS = [
  { img: '/card-book.png',   title: 'Ledarskap i praktiken', desc: 'Från kollega till chef, utan att tappa fotfästet.', path: '/utbildningar/ledarskap' },
  { img: '/card-team.png',   title: 'Effektiva team',        desc: 'Bygg samarbete som håller under press.',            path: '/utbildningar/team' },
  { img: '/card-shield.png', title: 'Arbetsmiljö & ansvar',  desc: 'Det systematiska arbetet, förklarat på svenska.',   path: '/utbildningar/arbetsmiljo' },
  { img: '/card-laptop.png', title: 'AI för alla',           desc: 'Kom igång med AI i det dagliga arbetet — idag.',    path: '/utbildningar/ai' },
];

const Carousel = () => {
  const navigate = useNavigate();
  const scroller = useRef(null);
  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };
  return (
    <section className="py-4 px-5 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto rounded-3xl p-6 sm:p-10"
        style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
        <div className="flex items-end justify-between gap-4 mb-8">
          <Reveal>
            <div>
              <OrangeRule className="mb-4" />
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: C.dark }}>
                Populära utbildningar
              </h2>
            </div>
          </Reveal>
          <div className="flex gap-2 flex-shrink-0">
            {[[-1, ArrowLeft], [1, ArrowRight]].map(([dir, Icon], i) => (
              <button key={i} onClick={() => scrollBy(dir)}
                aria-label={dir < 0 ? 'Föregående' : 'Nästa'}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <Icon size={18} style={{ color: C.dark }} />
              </button>
            ))}
          </div>
        </div>

        <div ref={scroller}
          className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}>
          {CARDS.map((c, i) => (
            <motion.button key={c.title} whileHover={{ y: -4 }}
              onClick={() => navigate(c.path)}
              className="snap-start flex-shrink-0 w-[80%] sm:w-[45%] lg:w-[calc(25%-15px)] text-left rounded-3xl overflow-hidden group"
              style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <div className="h-40 flex items-center justify-center" style={{ background: C.bg }}>
                <img src={c.img} alt="" className="h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.opacity = 0.2; }} />
              </div>
              <div className="p-5">
                <OrangeRule className="mb-3" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-base mb-1" style={{ color: C.dark }}>{c.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{c.desc}</p>
                  </div>
                  <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                    style={{ background: C.orangeL }}>
                    <ArrowUpRight size={16} style={{ color: C.orange }} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
//  TESTIMONIALS
// ══════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    text: 'Vi gick från spretiga internutbildningar till ett program alla faktiskt slutför. Engagemanget har aldrig varit högre.',
    name: 'Anna Lindqvist', role: 'HR-chef, Nordveda AB', result: '94% slutförandegrad',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=85',
  },
  {
    text: 'Äntligen utbildning som känns byggd för oss. Cheferna använder verktygen redan efter första modulen.',
    name: 'Erik Bergström', role: 'VD, Trelex Group', result: 'Sparar 4h/vecka per chef',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=85',
  },
  {
    text: 'Uppföljningen gör hela skillnaden. Nu ser vi svart på vitt vad utbildningen ger tillbaka.',
    name: 'Maria Johansson', role: 'L&D-ansvarig, Kaskad', result: '3x högre engagemang',
    img: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=700&q=85',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[active];

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5"
            style={{ background: C.panel, border: `1px solid ${C.border}`, boxShadow: '0 8px 30px rgba(23,31,50,0.05)' }}>
            {/* Text */}
            <div className="lg:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
              <Quote size={40} style={{ color: C.orange }} className="mb-6" fill={C.orange} />
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}>
                  <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
                    style={{ background: C.orangeL, color: C.orange }}>✓ {t.result}</div>
                  <blockquote className="text-xl sm:text-2xl font-bold leading-snug mb-7" style={{ color: C.dark }}>
                    {t.text}
                  </blockquote>
                  <div>
                    <p className="font-black text-sm" style={{ color: C.dark }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} aria-label={`Omdöme ${i + 1}`}
                    className="rounded-full transition-all"
                    style={{ width: active === i ? 28 : 10, height: 10, background: active === i ? C.orange : C.border }} />
                ))}
              </div>
            </div>
            {/* Foto */}
            <div className="lg:col-span-2 relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.img key={active} src={t.img} alt=""
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover" />
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
//  CTA-BANNER
// ══════════════════════════════════════════════════════════
const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-4 px-5 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-3xl px-8 sm:px-14 py-14 sm:py-16 relative overflow-hidden" style={{ background: C.orange }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 85% 40%, white 0%, transparent 55%)' }} />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Redo att börja?</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                  Ge er organisation<br />ett kunskapslyft.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/utbildningar')}
                  className="px-8 py-4 rounded-full font-bold text-base" style={{ background: C.white, color: C.orange }}>
                  Utforska utbildningar →
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/demo')}
                  className="px-8 py-4 rounded-full font-bold text-base text-white"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.3)' }}>
                  Boka en demo
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
//  FOOTER
// ══════════════════════════════════════════════════════════
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-14 mt-8 px-5 sm:px-8 border-t" style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="" className="w-8 h-8 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="font-black" style={{ color: C.dark }}>
                Närings<span style={{ color: C.orange }}>klivet</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Utbildningar som stärker organisationer.<br />Online & på plats i hela Sverige.
            </p>
          </div>
          {[
            ['Utbildningar', [['Ledarskap', '/utbildningar/ledarskap'], ['AI & digitalt', '/utbildningar/ai'], ['Ekonomi & juridik', '/utbildningar/ekonomi'], ['Arbetsmiljö', '/utbildningar/arbetsmiljo']]],
            ['Företaget', [['Om oss', '/om-oss'], ['Seminarier', '/seminarier'], ['Kontakt', '/kontakt']]],
            ['Konto', [['Logga in', '/login'], ['Kom igång', '/kom-igang']]],
          ].map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>{title}</p>
              <div className="space-y-2">
                {links.map(([l, p]) => (
                  <button key={l} onClick={() => navigate(p)}
                    className="block text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: C.dark }}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t" style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.muted }}>© 2026 Utbildningsbolaget. Alla rättigheter förbehållna.</p>
          <div className="flex gap-5">
            {['Integritetspolicy', 'Villkor'].map((l) => (
              <button key={l} className="text-xs hover:opacity-70 transition-opacity" style={{ color: C.muted }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ══════════════════════════════════════════════════════════
//  MAIN
// ══════════════════════════════════════════════════════════
export default function StartsidaNy() {
  // Säkerställ Nunito (om den inte redan laddas i index.html)
  useEffect(() => {
    const id = 'nunito-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>
      <Nav />
      <Hero />
      <FeatureRow />
      <Effekt />
      <Carousel />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
