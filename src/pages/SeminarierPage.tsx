// src/pages/SeminarierPage.jsx
// AI-seminarium för BRF-styrelser — komplett landningssida
// Inspirerad av OmOssPage + NaringsklivetLanding

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, ChevronDown,
  Users, Award, Zap, Shield, MapPin,
  Monitor, Calendar, Clock, Star,
  FileText, MessageSquare, Brain, Lock
} from 'lucide-react';
import EventsSection from '../components/EventsSection';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';
const DARK = '#171f32';

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 28 : 0, x: direction === 'left' ? 28 : direction === 'right' ? -28 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════
const Hero = ({ onScrollToEvents }) => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${DARK}f5 0%, ${DARK}cc 55%, ${DARK}99 100%)` }} />
    <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
      style={{ background: O }} />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Vänster */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
              style={{ background: `${O}22`, color: O, border: `1px solid ${O}44` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: O }} />
              AI-seminarium för BRF-styrelser 2026
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl sm:text-6xl font-black leading-[1.05] mb-6 text-white"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Framtidssäkra<br />
            er styrelse med<br />
            <span style={{ color: O, textShadow: `0 0 40px ${O}55` }}>AI — live.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
            Interaktiva seminarier där er BRF-styrelse lär sig använda AI för protokoll,
            kommunikation och förvaltning — med direktsvar på era verkliga frågor.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="flex flex-col sm:flex-row gap-3 mb-10">
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={onScrollToEvents}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 8px 32px ${O}45` }}>
              Boka er styrelses plats <ArrowRight size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = '/kurs/ai-brf-styrelsen'}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base text-white"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              Se hela onlinekursen
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6">
            {[
              { icon: '🏢', text: 'Skräddarsytt för BRF' },
              { icon: '👥', text: 'Max 20 deltagare' },
              { icon: '📜', text: 'Intyg ingår' },
              { icon: '💻', text: 'Online & på plats' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-white/45 text-sm">
                <span>{s.icon}</span><span>{s.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Höger — stats */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-4">
          {[
            { val: '3h',      label: 'Fokuserat seminarium',         emoji: '⏱️' },
            { val: '4 900:-', label: 'Per styrelse — hela teamet',   emoji: '💰' },
            { val: '100%',    label: 'Praktiska övningar i realtid', emoji: '⚡' },
            { val: 'Dag ett', label: 'Konkreta verktyg ni tar hem',  emoji: '🎯' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-2xl p-5 border"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>{s.val}</div>
              <div className="text-xs text-white/40 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// PROBLEMET — empati-sektion
// ══════════════════════════════════════════════════════════
const Problemet = () => (
  <section className="py-20 sm:py-28" style={{ background: '#F8F7F4' }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <FadeIn direction="right">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1280&q=80"
              alt="Styrelsemöte" className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${DARK}cc 0%, transparent 50%)` }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>
                  Igenkänt av alla BRF-styrelser
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  "Vi vet att AI kan hjälpa — men ingen vet var man börjar."
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.1}>
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 text-white"
            style={{ background: O }}>
            Varför detta seminarium?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-5 leading-snug"
            style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
            BRF-styrelser har unika<br />
            <span style={{ color: O }}>utmaningar — och möjligheter.</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Protokollskrivning, kommunikation till boende, upphandlingar, GDPR,
            underhållsplanering — allt tar tid. AI kan halvera den administrativa
            bördan. Men generella AI-kurser utgår inte från BRF-världen.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Det här seminariet är byggt specifikt för förtroendevalda i bostadsrättsföreningar.
            Varje övning, varje exempel, varje prompt är anpassad efter er faktiska vardag.
          </p>
          <div className="space-y-3">
            {[
              'Skriv styrelseprotokoll på 10 minuter istället för en timme',
              'Formulera tydliga brev till boende — utan att tänka på tonen',
              'Analysera offerter och avtal med AI som stöd',
              'Hantera GDPR, stadgar och underhållsfrågor smartare',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: O }}>
                  <CheckCircle size={11} color="white" />
                </div>
                <span className="text-slate-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// PROGRAM — vad ni lär er
// ══════════════════════════════════════════════════════════
const Program = () => (
  <section className="py-20 sm:py-28" style={{ background: DARK }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-10">

      <FadeIn className="text-center mb-14">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
          style={{ background: `${O}25`, color: O, border: `1px solid ${O}44` }}>
          Seminarieprogram
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Tre timmar — konkret och praktiskt
        </h2>
        <p className="text-white/45 text-lg max-w-xl mx-auto">
          Ingen teori för teorins skull. Ni övar med era egna dokument och frågor från dag ett.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {[
          {
            tid: '09:00–09:30', emoji: '🚀', nr: '01',
            rubrik: 'AI för BRF — demo live',
            desc: 'Vad AI faktiskt kan göra för er styrelse. Demo med riktiga BRF-dokument i realtid.',
          },
          {
            tid: '09:30–10:30', emoji: '📝', nr: '02',
            rubrik: 'Protokoll & dokumentation',
            desc: 'Skriv protokoll, kallelser och stämmomaterial med AI. Ni tar hem färdiga mallar.',
          },
          {
            tid: '10:30–11:30', emoji: '✉️', nr: '03',
            rubrik: 'Kommunikation & brev',
            desc: 'Formulera brev till boende, hantera störningsärenden och klagomål professionellt.',
          },
          {
            tid: '11:30–12:00', emoji: '💡', nr: '04',
            rubrik: 'Era frågor — live',
            desc: 'Öppen Q&A. Ta med er svåraste styrelseuppgift och lös den live med AI.',
          },
        ].map((block, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="rounded-2xl p-6 h-full border relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}>
              <span className="text-5xl font-black absolute top-4 right-4 opacity-[0.07] select-none"
                style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>{block.nr}</span>
              <div className="text-3xl mb-4">{block.emoji}</div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>{block.tid}</p>
              <h3 className="text-base font-black text-white mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}>{block.rubrik}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{block.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Vad ni tar hem */}
      <FadeIn>
        <div className="rounded-3xl p-8 sm:p-10"
          style={{ background: `${O}15`, border: `1px solid ${O}30` }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
                Ni tar hem
              </p>
              {[
                'Promptmall för styrelseprotokoll',
                'Brevmallar för kommunikation till boende',
                'GDPR-prompt för personuppgifter',
                'Underhållsplanerings-prompt',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-2.5">
                  <CheckCircle size={14} style={{ color: O }} />
                  <span className="text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
                Praktisk info
              </p>
              {[
                '3 timmar fokuserat seminarium',
                'Max 20 deltagare per tillfälle',
                'Online via Teams eller på plats i Malmö/Lund',
                'Inspelning skickas inom 24h',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-2.5">
                  <CheckCircle size={14} style={{ color: O }} />
                  <span className="text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
                Pris & villkor
              </p>
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <p className="text-3xl font-black text-white mb-1"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>4 900 kr</p>
                <p className="text-white/50 text-xs mb-3">Per styrelse · exkl. moms</p>
                <p className="text-white/55 text-xs leading-relaxed">
                  Hela styrelsen deltar. Avboka upp till 7 dagar innan — full återbetalning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// VAD ANDRA STYRELSER SÄGER
// ══════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    namn: 'Anna Lindqvist', roll: 'Ordförande, BRF Kastanjen Malmö',
    text: 'Vi skriver nu protokoll på 15 minuter. Tidigare tog det 2–3 timmar. Det enda vi ångrar är att vi inte gjort det här tidigare.',
    resultat: 'Sparar 2h per möte',
  },
  {
    namn: 'Erik Bergström', roll: 'Sekreterare, BRF Ekbacken Lund',
    text: 'Tomas vet exakt vilka frågor en BRF-styrelse brottas med. Inget onödigt — bara saker vi kunde börja använda samma dag.',
    resultat: 'Halverat administrationen',
  },
  {
    namn: 'Maria Johansson', roll: 'Styrelseledamot, BRF Solbacken',
    text: 'Äntligen en kurs anpassad för oss. Mallar och prompts som faktiskt fungerar för BRF-ärenden. Varmt rekommenderat.',
    resultat: 'Professionellare brev direkt',
  },
];

const Testimonials = ({ onScrollToEvents }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  return (
    <section className="py-20 sm:py-28" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
              Omdömen
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-8"
              style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
              Styrelser som<br />gjort det — berättar.
            </h2>
            <div className="flex gap-2 mb-8">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="rounded-full transition-all"
                  style={{ width: active === i ? 28 : 10, height: 10, background: active === i ? O : '#e5e5e3' }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={onScrollToEvents}
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              Boka er plats <ArrowRight size={15} />
            </motion.button>
          </FadeIn>

          <FadeIn delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="rounded-3xl p-8 sm:p-10 border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5"
                  style={{ background: OL, color: O }}>
                  ✓ {TESTIMONIALS[active].resultat}
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl font-semibold leading-snug mb-8"
                  style={{ color: DARK }}>
                  "{TESTIMONIALS[active].text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base"
                    style={{ background: O }}>
                    {TESTIMONIALS[active].namn[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: DARK }}>{TESTIMONIALS[active].namn}</p>
                    <p className="text-xs text-slate-500">{TESTIMONIALS[active].roll}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// FORMAT
// ══════════════════════════════════════════════════════════
const FormatSection = () => (
  <section className="py-16" style={{ background: '#F8F7F4' }}>
    <div className="max-w-5xl mx-auto px-5 sm:px-10">
      <FadeIn className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black mb-3"
          style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
          Välj ert format
        </h2>
        <p className="text-slate-500 text-sm">Samma innehåll — tre sätt att delta.</p>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            icon: '💻', type: 'Online via Teams',
            color: '#3b82f6', bg: 'rgba(59,130,246,0.05)',
            desc: 'Delta hemifrån eller från kontoret. Länk i bekräftelsemejlet. Inspelning ingår.',
            includes: ['Microsoft Teams-länk', 'Inspelning skickas efteråt', 'Interaktiv Q&A i realtid'],
          },
          {
            icon: '📍', type: 'På plats Malmö/Lund',
            color: O, bg: OL,
            desc: 'Fysisk träff — nätverkstillfälle med andra BRF-styrelser i regionen.',
            includes: ['Adress i bekräftelsen', 'Kaffe & fika ingår', 'Nätverka med andra BRF-styrelser'],
            featured: true,
          },
          {
            icon: '🔀', type: 'Hybrid',
            color: '#9333ea', bg: 'rgba(147,51,234,0.05)',
            desc: 'Välj själv — delta på plats eller digitalt. Samma upplevelse för alla.',
            includes: ['Teams-länk + fysisk plats', 'Välj format vid anmälan', 'Inspelning för alla'],
          },
        ].map((f, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className={`rounded-2xl p-6 h-full border-2 ${f.featured ? 'shadow-lg' : ''}`}
              style={{ background: f.bg, borderColor: f.featured ? f.color : `${f.color}25` }}>
              {f.featured && (
                <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-3"
                  style={{ background: f.color }}>Populärast</div>
              )}
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-black text-slate-800 mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}>{f.type}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{f.desc}</p>
              <ul className="space-y-2">
                {f.includes.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle size={12} style={{ color: f.color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// KURSLEDAREN — bild + text (som OmOssPage Story)
// ══════════════════════════════════════════════════════════
const Kursledaren = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 sm:py-28" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <FadeIn direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img src="/founder.png" alt="Kursledare Tomas Mauritzson"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: O }}>
                  Kursledare
                </p>
                <p className="text-sm font-bold text-slate-800">Styrelsekörkortet®</p>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-10 -z-10"
                style={{ background: O }} />
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 text-white"
              style={{ background: O }}>
              Din kursledare
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-5 leading-snug"
              style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
              Tomas Mauritzson —<br />
              <span style={{ color: O }}>BRF & AI-expert</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              15+ års erfarenhet av försäljning, kundrelationer och projektledning.
              Grundare av Styrelsekörkortet® — den enda utbildningen i Sverige skräddarsydd
              för BRF-styrelser. IPMA-certifierad projektledare.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Tomas kombinerar djup AI-kunskap med praktisk BRF-erfarenhet.
              Han har suttit i styrelse själv och vet exakt vilka administrativautmaningar
              ni möter — och hur AI faktiskt löser dem.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { val: '15+', label: 'Års erfarenhet' },
                { val: 'IPMA', label: 'Certifierad PM' },
                { val: '100+', label: 'Utbildade styrelser' },
                { val: '2024', label: 'Grundade SK®' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4 text-center border"
                  style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                  <p className="text-2xl font-black mb-0.5"
                    style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>{s.val}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/om-oss')}
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              Läs mer om Tomas <ArrowRight size={15} />
            </motion.button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// EVENTS
// ══════════════════════════════════════════════════════════
const EventsWrapper = () => (
  <section id="events" className="py-20 sm:py-28" style={{ background: '#F8F7F4' }}>
    <div className="max-w-5xl mx-auto px-5 sm:px-10">
      <FadeIn className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 text-white"
          style={{ background: O }}>
          Boka plats
        </span>
        <h2 className="text-3xl sm:text-4xl font-black mb-3"
          style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
          Kommande seminarier
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Välj datum och format. Hela er styrelse deltar för en fast avgift på 4 900 kr exkl. moms.
        </p>
      </FadeIn>
      <div className="max-w-2xl mx-auto">
        <EventsSection />
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════
// FAQ — mörk bakgrund (som NaringsklivetLanding)
// ══════════════════════════════════════════════════════════
const FAQS = [
  { q: 'Hur många från styrelsen kan delta?', a: 'Hela er styrelse kan delta för en fast avgift på 4 900 kr exkl. moms. Det spelar ingen roll om ni är 3 eller 7 ledamöter.' },
  { q: 'Behöver vi förkunskaper i AI?', a: 'Nej. Seminariet är designat för styrelser utan tidigare AI-erfarenhet. Vi börjar från grunden och bygger upp praktisk kompetens direkt.' },
  { q: 'Vad händer om vi inte kan delta?', a: 'Avboka upp till 7 dagar innan och få full återbetalning. Kortare varsel ger tillgodokvitto. Vid sjukdom gör vi alltid undantag.' },
  { q: 'Kan vi boka ett privat seminarium bara för vår styrelse?', a: 'Absolut. Hör av dig för offert på ett skräddarsytt seminarium för er styrelse — online eller på plats i er förening.' },
  { q: 'Utfärdas ett intyg?', a: 'Ja, alla deltagare får ett digitalt närvaro­intyg efter genomfört seminarium.' },
  { q: 'Kan vi se en inspelning efteråt?', a: 'Alla online-seminarier spelas in och skickas till anmälda deltagare inom 24 timmar.' },
];

const FaqSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-20 sm:py-28" style={{ background: DARK }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-10">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Vanliga frågor.
          </h2>
          <p className="text-white/40 text-sm">Hittar du inte svaret? Hör av dig — vi svarar samma dag.</p>
        </FadeIn>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-bold text-sm text-white">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: open === i ? O : 'rgba(255,255,255,0.08)' }}>
                    <span className="text-lg font-black leading-none text-white">+</span>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                      exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/55">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// BOTTOM CTA — orange banner (som NaringsklivetLanding)
// ══════════════════════════════════════════════════════════
const BottomCta = ({ onScrollToEvents }) => {
  const navigate = useNavigate();
  return (
    <section className="py-6 px-4 sm:px-8" style={{ background: '#F8F7F4' }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 relative overflow-hidden"
            style={{ background: O }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">
                  Redo att börja?
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Boka er styrelses plats<br />på nästa seminarium.
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={onScrollToEvents}
                  className="px-8 py-4 rounded-2xl font-bold text-base"
                  style={{ background: '#fff', color: O }}>
                  Se kommande datum →
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/kurs/ai-brf-styrelsen')}
                  className="px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.3)' }}>
                  Se hela onlinekursen
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════
// SIDAN
// ══════════════════════════════════════════════════════════
const SeminarierPage = () => {
  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4', fontFamily: "'Nunito', sans-serif" }}>
      <Hero onScrollToEvents={scrollToEvents} />
      <Problemet />
      <Program />
      <Testimonials onScrollToEvents={scrollToEvents} />
      <FormatSection />
      <Kursledaren />
      <EventsWrapper />
      <FaqSection />
      <BottomCta onScrollToEvents={scrollToEvents} />
    </div>
  );
};

export default SeminarierPage;