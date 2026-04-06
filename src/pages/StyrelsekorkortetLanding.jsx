// src/pages/StyrelsekorkortetLanding.jsx
// Landningssida för Styrelsekörkortet – BRF-styrelsekörkort
// Designprofil: Auktoritativ, trygg, professionell men tillgänglig
// Målgrupp: BRF-styrelseledamöter 40–75 år, ofta ovana med digital utbildning

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import FounderSection from '../components/landing/FounderSection';
import ModulesSection from '../components/landing/ModulesSection';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, ChevronDown, Award,
  Shield, BookOpen, Users, Clock, Star,
  FileText, Gavel, TrendingUp, Building2,
  Phone, Mail, MapPin, Play
} from 'lucide-react';

// ─── Design tokens ────────────────────────────────────────
const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  dark:    '#0f1623',
  dark2:   '#171f32',
  mid:     '#4A5568',
  muted:   '#8A95A3',
  bg:      '#FAFAF8',
  bgAlt:   '#F4F2EE',
  border:  '#E8E5E0',
  white:   '#FFFFFF',
};

// ─── Reveal helper ────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 28, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────
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
          background: scrolled ? 'rgba(250,250,248,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Styrelsekörkortet" className="w-8 h-8 object-contain" />
            <span className="font-bold text-base tracking-tight" style={{ color: scrolled ? C.dark : 'white' }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet®
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              ['Kursen', '#kurs'],
              ['Moduler', '#moduler'],
              ['Om utbildningen', '#om'],
              ['FAQ', '#faq'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: scrolled ? C.mid : 'rgba(255,255,255,0.75)' }}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="hidden md:block text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{
                color: scrolled ? C.dark : 'white',
                border: `1.5px solid ${scrolled ? C.border : 'rgba(255,255,255,0.3)'}`,
              }}>
              Logga in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/purchase/styrelsekörkortet')}
              className="text-sm font-bold px-5 py-2.5 rounded-xl text-white"
              style={{ background: C.orange, boxShadow: `0 4px 16px ${C.orange}40` }}>
              Starta kursen
            </motion.button>

            {/* Burger */}
            <button className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMobileOpen(p => !p)}>
              {[0,1,2].map(i => (
                <span key={i} className="w-5 h-0.5 rounded-full transition-all"
                  style={{
                    background: scrolled ? C.dark : 'white',
                    transform: i === 0 && mobileOpen ? 'rotate(45deg) translate(3px,3px)'
                             : i === 2 && mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none',
                    opacity: i === 1 && mobileOpen ? 0 : 1,
                  }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 pt-16 px-5 pb-8 flex flex-col"
            style={{ background: C.bg }}>
            <div className="flex flex-col gap-1 mt-8">
              {[['Kursen','#kurs'],['Moduler','#moduler'],['Om utbildningen','#om'],['FAQ','#faq']].map(([l,h]) => (
                <a key={l} href={h} onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold py-4 border-b block"
                  style={{ color: C.dark, borderColor: C.border }}>{l}</a>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/purchase/styrelsekörkortet')}
              className="mt-auto w-full py-4 rounded-2xl text-white font-bold text-lg"
              style={{ background: C.orange }}>
              Starta kursen nu
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bakgrundsbild */}
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${C.dark}f2 0%, ${C.dark2}d8 50%, rgba(15,22,35,0.7) 100%)` }} />

      {/* Orange accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${C.orange}, transparent 70%)`, transform: 'translate(20%, -20%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Vänster */}
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
                style={{ background: `${C.orange}25`, color: C.orange, border: `1px solid ${C.orange}40` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
                Sveriges första digitala styrelsekörkort
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
                style={{ fontFamily: "'Nunito', sans-serif", color: 'white' }}>
                Bli en<br />
                <span style={{ color: C.orange }}>trygg</span><br />
                styrelseledamot.
              </h1>

              <p className="text-lg sm:text-xl text-white/65 leading-relaxed mb-8 max-w-lg">
                Komplett utbildning i BRF-juridik, ekonomi och styrelsearbete.
                På din tid, i din takt. Med intyg när du är klar.
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {['bg-blue-400','bg-emerald-400','bg-violet-400','bg-rose-400'].map((c,i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold`}>
                      {['A','B','K','M'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/50 text-xs">Över 400 styrelseledamöter utbildade</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/purchase/styrelsekörkortet')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}50` }}>
                  Starta utbildningen <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('kurs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  Läs mer om kursen
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Höger – stats-kort */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="grid grid-cols-2 gap-4">
            {[
              { val: '11',       label: 'Moduler',              sub: 'BRL, ekonomi, GDPR, AI och mer', icon: BookOpen },
              { val: '4–6 h',    label: 'Total utbildningstid', sub: 'I din egen takt, online dygnet runt', icon: Clock },
              { val: 'Intyg',    label: 'Vid genomfört prov',   sub: 'Diplom att visa på stämman', icon: Award },
              { val: '1 490 kr', label: 'Per styrelse',         sub: 'Obegränsat antal ledamöter', icon: Shield },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-2xl p-5 border"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}>
                  <Icon size={20} className="mb-3" style={{ color: C.orange }} />
                  <div className="text-2xl font-black text-white mb-0.5">{s.val}</div>
                  <div className="text-sm font-bold text-white/80 mb-0.5">{s.label}</div>
                  <div className="text-xs text-white/40 leading-snug">{s.sub}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={22} className="text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// PROBLEM – VARFÖR STYRELSEKÖRKORTET?
// ─────────────────────────────────────────────────────────
const Problem = () => (
  <section className="py-20 sm:py-28 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Reveal className="text-center mb-16">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>
          Känner du igen dig?
        </p>
        <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5"
          style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
          Styrelsearbete är mer<br />komplext än det ser ut.
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: C.mid }}>
          De flesta styrelseledamöter väljs in utan utbildning. Ansvaret är stort,
          juridiken komplex och misstagen kan bli kostsamma – för föreningen och för dig personligen.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: '😟',
            problem: '"Jag vet inte vad jag får besluta om."',
            lösning: 'Vi går igenom exakt vad styrelsen får och ska besluta – och vad som kräver stämmobeslut.',
          },
          {
            icon: '📋',
            problem: '"Våra protokoll är ett enda virrvarr."',
            lösning: 'Du lär dig skriva korrekta protokoll som håller vid granskning och tvist.',
          },
          {
            icon: '💰',
            problem: '"Jag förstår inte årsredovisningen."',
            lösning: 'Vi förklarar resultat, balansräkning och nyckeltal på klarspråk – utan ekonomjargong.',
          },
          {
            icon: '⚖️',
            problem: '"Vad händer om vi gör fel?"',
            lösning: 'Du förstår ditt personliga ansvar och hur du skyddar dig som ledamot.',
          },
          {
            icon: '🏠',
            problem: '"Vem ansvarar för vad i lägenheten?"',
            lösning: 'Klart besked om gränsdragningen mellan BRF och bostadsrättsinnehavare.',
          },
          {
            icon: '🤖',
            problem: '"Kan vi använda AI i styrelsearbetet?"',
            lösning: 'Ja – vi visar hur. Protokoll på 10 minuter, brev på 1 minut, GDPR-säkert.',
          },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="rounded-2xl p-6 border h-full"
              style={{ background: C.white, borderColor: C.border }}>
              <span className="text-3xl block mb-4">{item.icon}</span>
              <p className="font-bold text-base mb-3 italic" style={{ color: C.dark }}>
                {item.problem}
              </p>
              <div className="h-px mb-3" style={{ background: C.border }} />
              <p className="text-sm leading-relaxed" style={{ color: C.mid }}>
                <span className="font-bold" style={{ color: C.orange }}>Lösning: </span>
                {item.lösning}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────
// STORY – Grundarens röst + bild (Om Oss-stil)
// ─────────────────────────────────────────────────────────
const Story = () => {
  const navigate = useNavigate();
  return (
    <section id="om" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Bild */}
          <Reveal direction="right" y={32}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl">
                <img src="/founder.png" alt="Grundare Styrelsekörkortet"
                  className="w-full h-full object-cover object-top" />
              </div>
              {/* Diplom-badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border"
                style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <Award size={16} style={{ color: C.orange }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: C.orange }}>
                    Styrelsekörkortet®
                  </p>
                </div>
                <p className="text-sm font-bold" style={{ color: C.dark }}>Grundat 2024</p>
              </div>
              {/* Accent */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-10 -z-10"
                style={{ background: C.orange }} />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.1} y={32}>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                               rounded-full mb-5 text-white" style={{ background: C.orange }}>
                Vår story
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-5 leading-tight"
                style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                Hundratusentals<br />
                <span style={{ color: C.orange }}>osäkra styrelseledamöter</span><br />
                förtjänar bättre.
              </h2>
              <p className="leading-relaxed mb-4 text-base" style={{ color: C.mid }}>
                I Sverige finns drygt 26 000 bostadsrättsföreningar. Varje år väljs
                tusentals nya styrelseledamöter in – utan någon som helst utbildning.
                Ansvaret är juridiskt bindande från dag ett.
              </p>
              <p className="leading-relaxed mb-8 text-base" style={{ color: C.mid }}>
                Styrelsekörkortet® skapades för att ge varje ledamot den kunskap de
                behöver för att fatta trygga beslut, skriva korrekta protokoll och
                förstå sitt ekonomiska ansvar – på ett sätt som faktiskt fastnar.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Skrivet av jurister och BRF-experter – inte av AI',
                  'Uppdateras löpande med nya lagändringar',
                  'Anpassat för den som aldrig jobbat med juridik eller ekonomi',
                  'Komplett från dag ett – inget att komplettera efteråt',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: C.orange }}>
                      <CheckCircle size={11} color="white" />
                    </div>
                    <span className="text-sm" style={{ color: C.mid }}>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/styrelsekörkortet')}
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                Se alla moduler <ArrowRight size={15} />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// MODULER
// ─────────────────────────────────────────────────────────
const MODULER = [
  { nr: '01', title: 'Introduktion till styrelsearbetet',  icon: Users,      desc: 'Rollerna, ansvaret, valbarhetsregler och Bolagsverkets krav.' },
  { nr: '02', title: 'Bostadsrättslagen – grunderna',      icon: Gavel,      desc: 'BRL på klarspråk. Vad säger lagen om er förening och era beslut?' },
  { nr: '03', title: 'GDPR i BRF',                         icon: Shield,     desc: 'Personuppgifter, register, CCTV och vad ni inte får göra.' },
  { nr: '04', title: 'Föreningsstämman',                   icon: FileText,   desc: 'Kallelse, dagordning, röstning, protokoll och klandertalan.' },
  { nr: '05', title: 'Styrelsemötets protokoll',           icon: BookOpen,   desc: 'Korrekt protokollskrivning, jäv och justering.' },
  { nr: '06', title: 'Ekonomi och årsredovisning',         icon: TrendingUp, desc: 'Resultat, balans, nyckeltal och K3-övergången 2026.' },
  { nr: '07', title: 'Föreningens dokumentation',          icon: FileText,   desc: 'Stadgar, underhållsplan, avtal och arkivering.' },
  { nr: '08', title: 'Diskrimineringslagen i BRF',         icon: Gavel,      desc: 'Vad gäller vid val, uthyrning och störningsärenden.' },
  { nr: '09', title: 'Föreningens intressenter',           icon: Building2,  desc: 'Förvaltare, revisorer, Bolagsverket, banker och myndigheter.' },
  { nr: '10', title: 'Hållbarhet & energieffektivisering', icon: TrendingUp, desc: 'Solceller, laddstolpar, ROI och lagkrav 2024–2027.' },
  { nr: '11', title: 'AI för BRF-styrelsen',               icon: Star,       desc: 'Spara tid med AI. Protokoll, brev och beslut – GDPR-säkert.' },
];

const Moduler = () => {
  const [visaAlla, setVisaAlla] = useState(false);
  const visade = visaAlla ? MODULER : MODULER.slice(0, 6);

  return (
    <section id="moduler" className="py-20 sm:py-28" style={{ background: C.dark }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>
              Kursen innehåller
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-white"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              11 moduler.<br />Allt du behöver.
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs">
            Varje modul innehåller video, interaktiva övningar och ett kunskapstest.
            Du får diplom när du klarat alla.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {visade.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl p-5 border group transition-all hover:border-orange-500/30"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <div className="flex items-start gap-4">
                    <div>
                      <span className="text-3xl font-black block leading-none mb-1"
                        style={{ color: `${C.orange}35` }}>
                        {m.nr}
                      </span>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${C.orange}18` }}>
                        <Icon size={17} style={{ color: C.orange }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm mb-1.5 leading-snug">{m.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {!visaAlla && (
          <div className="text-center">
            <button onClick={() => setVisaAlla(true)}
              className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all hover:bg-white/10"
              style={{ color: C.orange, border: `1.5px solid ${C.orange}40` }}>
              Visa alla 11 moduler <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// PRIS & CTA
// ─────────────────────────────────────────────────────────
const Pris = () => {
  const navigate = useNavigate();
  return (
    <section id="kurs" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>
            Priser
          </p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
            style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            Enkelt och rättvist.
          </h2>
          <p className="text-lg" style={{ color: C.mid }}>
            En licens per förening. Alla ledamöter ingår.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Grundkurs */}
          <Reveal delay={0.05}>
            <div className="rounded-3xl border p-8 flex flex-col h-full"
              style={{ background: C.white, borderColor: C.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.muted }}>
                Grundkurs
              </p>
              <div className="text-5xl font-black mb-1" style={{ color: C.dark }}>
                1 490 <span className="text-2xl font-bold">kr</span>
              </div>
              <p className="text-sm mb-6" style={{ color: C.muted }}>per styrelse · obegränsat antal ledamöter</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  '11 moduler med video och övningar',
                  'Kunskapstest per modul',
                  'Digitalt diplom vid genomfört kurs',
                  '365 dagars tillgång',
                  'Uppdateras vid nya lagändringar',
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.mid }}>
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
                    {p}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/purchase/styrelsekörkortet')}
                className="w-full py-4 rounded-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                Köp grundkursen
              </motion.button>
            </div>
          </Reveal>

          {/* Komplett paket */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border p-8 flex flex-col h-full relative overflow-hidden"
              style={{ background: C.dark, borderColor: C.orange + '60' }}>
              {/* Popular badge */}
              <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: C.orange, color: 'white' }}>
                Mest valt
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>
                Komplett paket
              </p>
              <div className="text-5xl font-black text-white mb-1">
                4 490 <span className="text-2xl font-bold">kr</span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
                per styrelse · inkl. live-session
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Allt i grundkursen',
                  '3 tim live-session med expert',
                  'Genomgång av er specifika situation',
                  'Skräddarsydda promptmallar för AI',
                  'Obegränsade frågor via Styrelsesupport',
                  'Prioriterad support',
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.orange }} />
                    {p}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/purchase/styrelsekörkortet-komplett')}
                className="w-full py-4 rounded-2xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                Välj komplett paket
              </motion.button>
            </div>
          </Reveal>
        </div>

        {/* Trygghet */}
        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-6 mt-10">
          {[
            { icon: Shield, text: '30 dagars nöjd-kund-garanti' },
            { icon: FileText, text: 'Faktura mot 30 dagars netto' },
            { icon: Users, text: 'Alla ledamöter ingår' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: C.muted }}>
                <Icon size={16} style={{ color: C.orange }} />
                {item.text}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Anna Svensson', role: 'Ordförande, BRF Ekbacken Lund',
    text: 'Äntligen förstår jag skillnaden på vad styrelsen får besluta och vad som kräver stämma. Sparade oss en potentiell klander.',
    result: 'Undvek juridiskt misstag',
    rating: 5,
  },
  {
    name: 'Lars Bergström', role: 'Kassör, BRF Solgläntan Malmö',
    text: 'Ekonomi-modulen var guld. Jag förstår nu årsredovisningen och kan förklara den för övriga ledamöter på ett begripligt sätt.',
    result: 'Tryggare ekonomisk hantering',
    rating: 5,
  },
  {
    name: 'Karin Nilsson', role: 'Sekreterare, BRF Kastanjen Helsingborg',
    text: 'Protokollmodulen gav mig en mall jag använder varje möte. AI-modulen sparar mig 45 minuter per protokoll.',
    result: '45 min sparad per möte',
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[active];

  return (
    <section className="py-20 sm:py-28" style={{ background: C.bgAlt }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>
              Vad styrelseledamöterna säger
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-10"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Från osäker<br />till trygg.
            </h2>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="rounded-full transition-all h-2.5"
                  style={{ width: active === i ? 28 : 10, background: active === i ? C.orange : C.border }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="rounded-3xl p-8 sm:p-10"
                style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
                  style={{ background: C.orangeL, color: C.orange }}>
                  <CheckCircle size={14} /> {t.result}
                </div>
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-xl font-semibold leading-snug mb-7"
                  style={{ color: C.dark }}>
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
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

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Passar kursen även den som aldrig jobbat med juridik?', a: 'Absolut – det är hela poängen. Vi förklarar allt på klarspråk utan juridisk jargong. Kursen är skapad för vanliga styrelseledamöter, inte jurister.' },
  { q: 'Hur lång tid tar kursen?', a: 'Totalt 4–6 timmar fördelat på 11 moduler. Varje modul tar 20–45 minuter. Du gör den i din egen takt – ingen deadline.' },
  { q: 'Kan hela styrelsen göra kursen med samma licens?', a: 'Ja – en licens gäller per förening och inkluderar obegränsat antal ledamöter. Alla kan logga in och göra kursen individuellt.' },
  { q: 'Vad händer om det ändras i lagen?', a: 'Kursen uppdateras löpande när ny lagstiftning träder i kraft. Du som köpt kursen får alltid tillgång till den senaste versionen utan extra kostnad.' },
  { q: 'Finns det ett diplom?', a: 'Ja – när du klarat kunskapstestet i alla moduler får du ett digitalt diplom att visa upp på stämman och i årsredovisningen.' },
  { q: 'Kan vi fakturera?', a: 'Ja. Vi fakturerar mot 30 dagars netto utan kreditkortskrav. Kontakta oss på hej@styrelsekörkortet.se för fakturaköp.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="py-20 sm:py-28 border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
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

// ─────────────────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────────────────
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
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
                  Redo att börja?
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Din styrelse förtjänar<br />rätt förutsättningar.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/purchase/styrelsekörkortet')}
                  className="px-8 py-4 rounded-2xl font-bold text-base"
                  style={{ background: C.white, color: C.orange }}>
                  Starta kursen nu →
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => window.location.href = 'mailto:hej@styrelsekörkortet.se'}
                  className="px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.3)' }}>
                  Kontakta oss
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────
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
              Sveriges kompletta digitala utbildning<br />för BRF-styrelseledamöter.<br />
              Malmö / Lund – online dygnet runt.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Kursen</p>
            <div className="space-y-2">
              {[['Alla moduler','#moduler'],['Priser','#kurs'],['Diplom','#kurs'],['FAQ','#faq']].map(([l,h]) => (
                <a key={l} href={h} className="block text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: C.dark }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Kontakt</p>
            <div className="space-y-3">
              {[
                { icon: Mail,  val: 'hej@styrelsekörkortet.se' },
                { icon: Phone, val: '+46 70 000 00 00' },
                { icon: MapPin,val: 'Malmö / Lund' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: C.mid }}>
                    <Icon size={14} style={{ color: C.orange }} />
                    {item.val}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
          style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.muted }}>
            © 2026 Styrelsekörkortet. Alla rättigheter förbehållna.
          </p>
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

// ─────────────────────────────────────────────────────────
// SIDAN
// ─────────────────────────────────────────────────────────
export default function StyrelsekorkortetLanding() {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>
      <Nav />
      <Hero />
      <Problem />
      <ModulesSection />   {/* ← ny */}
      <FounderSection />   {/* ← ny */}
      <Story />
      <Testimonials />
      <Pris />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
