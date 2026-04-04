// src/pages/OmOssPage.jsx
// Fullwidth Om Oss sida för Näringsklivet
// Sektioner: Hero, Story, Metodik, Tjänster, Kontakt

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation'; // Notera de två punkterna ..
import {
  ArrowRight, CheckCircle, Zap, Users, Target,
  MessageSquare, Mic, Wrench, Brain,
  Mail, Phone, MapPin, ChevronDown
} from 'lucide-react';

// ─── Brand tokens ────────────────────────────────────────
const ORANGE = '#FF5421';
const DARK   = '#171f32';

// ─── Fade-in hook ────────────────────────────────────────
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
      x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 1. HERO – fullwidth
// ─────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK}f0, ${DARK}cc)` }} />

     

      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px]
                      rounded-full blur-3xl opacity-[0.08] pointer-events-none"
        style={{ background: ORANGE }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Vänster */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                               rounded-full mb-5 text-white"
                style={{ background: `${ORANGE}33`, border: `1px solid ${ORANGE}55`, color: ORANGE }}>
                Om Näringsklivet®
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5"
                style={{ fontFamily: "'Nunito', sans-serif" }}>
                Bli tryggare i<br />
                <span style={{ color: ORANGE, textShadow: `0 0 40px ${ORANGE}55` }}>
                  din arbetsroll
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
                Vi hjälper medarbetare, chefer och egenföretagare att använda AI
                på ett sätt som faktiskt frigör tid – och skapar resultat från dag ett.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/seminarier#events')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                             rounded-xl font-bold text-base text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ORANGE}, #E04619)`,
                    boxShadow: `0 4px 24px ${ORANGE}40`,
                  }}
                >
                  Boka ett möte <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/purchase/naringsklivet-ai')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4
                             rounded-xl font-semibold text-base text-white"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Se kursen
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Höger – stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { val: '14',       label: 'Moduler i träningsprogrammet',  icon: Brain },
              { val: '4',        label: 'Tjänster för din organisation', icon: Target },
              { val: '100%',     label: 'Praktikbaserat – ingen teori',  icon: Zap },
              { val: 'Dag ett',  label: 'Konkreta resultat direkt',       icon: CheckCircle },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-2xl p-5 border"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Icon size={22} className="mb-3" style={{ color: ORANGE }} />
                  <div className="text-2xl font-bold text-white mb-0.5">{s.val}</div>
                  <div className="text-xs text-white/45 leading-snug">{s.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────
// 2. GRUNDARENS STORY – bild + text
// ─────────────────────────────────────────────

const Story = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 sm:py-28" style={{ background: '#F8F7F4' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Bild */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl">
                <img
                  src="/founder.png"
                  alt="Grundare Näringsklivet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: ORANGE }}>
                  Näringsklivet®
                </p>
                <p className="text-sm font-bold text-slate-800">Grundat 2024</p>
              </div>
              {/* Accent blob */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-10 -z-10"
                style={{ background: ORANGE }} />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="left" delay={0.1}>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                               rounded-full mb-5 text-white" style={{ background: ORANGE }}>
                Vår story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-snug"
                style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
                Vi bygger broar mellan<br />
                <span style={{ color: ORANGE }}>AI och verkligheten</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Näringsklivet ® grundades ur en enkel insikt: det finns en enorm klyfta mellan
                vad AI kan göra och vad de flesta faktiskt använder det till på jobbet.
                Inte för att folk inte är intresserade – utan för att ingen har visat dem
                hur det fungerar i deras faktiska arbetsdag.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Vi har 15+ års erfarenhet av försäljning, kundrelationer och projektledning.
                Den erfarenheten kombinerar vi med djup AI-kunskap för att skapa utbildning
                som är praktisk från första minuten – utan teknisk jargong, utan onödig teori.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Praktikbaserad metodik – övningar direkt kopplade till din arbetsdag',
                  'Neutral – vi favoriserar inte verktyg, vi visar vad som passar dig',
                  'Aktuellt – kursmaterialet uppdateras löpande med nya verktyg',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: ORANGE }}>
                      <CheckCircle size={11} color="white" />
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/purchase/naringsklivet-ai')}
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
              >
                Se träningsprogrammet <ArrowRight size={15} />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// 3. METODIK – mörk sektion
// ─────────────────────────────────────────────

const Metodik = () => (
  <section className="py-20 sm:py-28" style={{ background: DARK }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-10">

      <FadeIn className="text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                         rounded-full mb-4 text-white" style={{ background: `${ORANGE}33`, color: ORANGE, border: `1px solid ${ORANGE}44` }}>
          Hur vi arbetar
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Vår metodik i fyra steg
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Från nollpunkt till AI-van yrkesperson – med en struktur som faktiskt fastnar.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            step: '01',
            title: 'Kartlägg',
            desc: 'Vi börjar med var du är och vad du faktiskt gör på jobbet. AI-lösningar utan kontext är värdelösa.',
            icon: Target,
          },
          {
            step: '02',
            title: 'Lär',
            desc: 'Korta, fokuserade moduler med direkt koppling till verkliga arbetsuppgifter. Inget onödigt.',
            icon: Brain,
          },
          {
            step: '03',
            title: 'Testa',
            desc: 'Du applicerar direkt i din vardag. Övningarna är designade för att ge konkreta tidsmätbara resultat.',
            icon: Zap,
          },
          {
            step: '04',
            title: 'Skala',
            desc: 'Bygg rutin, mät effekt, dela med kollegor. AI-kompetens sprider sig i organisationer som tar det på allvar.',
            icon: Users,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl p-6 h-full border"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-4xl font-black" style={{ color: `${ORANGE}33` }}>
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${ORANGE}18` }}>
                    <Icon size={18} style={{ color: ORANGE }} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// 4. TJÄNSTER – bild + text alternerande
// ─────────────────────────────────────────────

const services = [
  {
    id: 'one-on-one',
    icon: MessageSquare,
    label: 'One on One',
    title: 'Personlig AI-genomgång – anpassad helt efter dig',
    desc: 'En intensiv session där vi går igenom dina specifika arbetsuppgifter och identifierar exakt hur AI kan spara tid just för dig. Du lämnar med konkreta verktyg, promptmallar och en plan.',
    points: [
      '90 minuter via Zoom eller på plats',
      'Genomgång av dina topp 3 tidskrävande uppgifter',
      'Skräddarsydda promptmallar att använda direkt',
      'Uppföljningsmejl med resurser och nästa steg',
    ],
    cta: 'Boka One on One',
    path: '/seminarier#events',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    reverse: false,
  },
  {
    id: 'forelasning',
    icon: Mic,
    label: 'Föreläsning',
    title: 'AI-föreläsning som väcker din organisation',
    desc: 'En engagerande keynote eller halvdagsföreläsning om AI i arbetslivet. Praktiska demos, verkliga exempel och ett budskap som fastnar. Anpassas efter er bransch och era utmaningar.',
    points: [
      'Från 45 min keynote till halvdag',
      'Online, på plats eller hybrid',
      'Branschanpassat innehåll och exempel',
      'Interaktiva moment och Q&A',
    ],
    cta: 'Boka föreläsning',
    path: '/seminarier#events',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    reverse: true,
  },
  {
    id: 'workshop',
    icon: Wrench,
    label: 'Workshop',
    title: 'Hands-on workshop – lär genom att göra',
    desc: 'En praktisk halvdags- eller heldagsworkshop där deltagarna arbetar med sina egna arbetsuppgifter och AI-verktyg i realtid. Det är det snabbaste sättet att bygga kompetens som faktiskt fastnar.',
    points: [
      'Halvdag (3h) eller heldag (6h)',
      'Max 20 deltagare för djup interaktion',
      'Alla jobbar med sina egna use cases',
      'Certifikat och material med hem',
    ],
    cta: 'Boka workshop',
    path: '/seminarier#events',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    reverse: false,
  },
  {
    id: 'implementering',
    icon: Brain,
    label: 'AI-implementering',
    title: 'Strategisk AI-implementering för din organisation',
    desc: 'För organisationer som vill gå längre än enstaka utbildningar. Vi kartlägger era processer, identifierar de mest lönsamma AI-use cases och hjälper er bygga en AI-strategi med konkret handlingsplan.',
    points: [
      'Processgranskning och AI-kartläggning',
      'Prioriterad lista med use cases och ROI-estimat',
      'Policy och riktlinjer för säker AI-användning',
      'Implementeringsstöd och uppföljning',
    ],
    cta: 'Boka strategimöte',
    path: '/seminarier#events',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    reverse: true,
  },
];

const ServiceRow = ({ service, index }) => {
  const navigate = useNavigate();
  const Icon = service.icon;

  return (
    <section className={`py-20 sm:py-24 ${index % 2 === 0 ? 'bg-white' : ''}`}
      style={index % 2 !== 0 ? { background: '#F8F7F4' } : {}}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          service.reverse ? 'lg:grid-flow-col-dense' : ''
        }`}>

          {/* Bild */}
          <FadeIn direction={service.reverse ? 'left' : 'right'}
            className={service.reverse ? 'lg:col-start-2' : ''}>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${DARK}44, transparent)` }} />
              {/* Label badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold"
                style={{ background: ORANGE, boxShadow: `0 4px 16px ${ORANGE}60` }}>
                <Icon size={14} />
                {service.label}
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction={service.reverse ? 'right' : 'left'} delay={0.1}
            className={service.reverse ? 'lg:col-start-1' : ''}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase
                               tracking-widest mb-4 px-3 py-1.5 rounded-full text-white"
                style={{ background: `${ORANGE}18`, color: ORANGE, border: `1px solid ${ORANGE}30` }}>
                <Icon size={12} /> {service.label}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug"
                style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
                {service.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {service.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: ORANGE }}>
                      <CheckCircle size={11} color="white" />
                    </div>
                    <span className="text-slate-600 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate(service.path)}
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)`, boxShadow: `0 4px 16px ${ORANGE}30` }}
              >
                {service.cta} <ArrowRight size={15} />
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// 5. KONTAKT & CTA – mörk fullwidth
// ─────────────────────────────────────────────

const Kontakt = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ namn: '', epost: '', meddelande: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.namn || !form.epost) return;
    console.log('Kontaktformulär:', form);
    setSent(true);
  };

  const inp = `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none
    bg-white/5 border-white/10 text-white placeholder-white/25
    focus:border-[${ORANGE}] focus:bg-white/8`;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: DARK }}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: ORANGE }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Vänster – text */}
          <FadeIn>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                             rounded-full mb-5" style={{ background: `${ORANGE}25`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
              Kom i kontakt
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Redo att framtidssäkra<br />
              <span style={{ color: ORANGE }}>din organisation?</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8 text-lg">
              Hör av dig – vi svarar inom en arbetsdag och skräddarsyr alltid
              ett förslag utifrån dina faktiska behov.
            </p>

            {/* Kontaktinfo */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail,  label: 'E-post',  val: 'hej@naringsklivet.se' },
                { icon: Phone, label: 'Telefon', val: '+46 70 000 00 00' },
                { icon: MapPin,label: 'Plats',   val: 'Malmö / Lund – online & på plats' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ORANGE}18` }}>
                      <Icon size={16} style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-widest">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.val}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick CTA-knappar */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Boka workshop',        path: '/seminarier#events' },
                { label: 'Boka föreläsning',     path: '/seminarier#events' },
                { label: 'One on One-session',   path: '/seminarier#events' },
              ].map((b, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(b.path)}
                  className="text-sm font-semibold px-4 py-2.5 rounded-xl text-white transition-all"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)' }}
                >
                  {b.label}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          {/* Höger – formulär */}
          <FadeIn delay={0.15}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center border"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: `${ORANGE}20` }}>
                  <CheckCircle size={28} style={{ color: ORANGE }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tack för ditt meddelande!</h3>
                <p className="text-white/50 text-sm">Vi återkommer inom en arbetsdag.</p>
              </motion.div>
            ) : (
              <div className="rounded-2xl p-7 sm:p-8 border space-y-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <h3 className="text-lg font-bold text-white mb-2">Skicka ett meddelande</h3>

                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">Ditt namn</label>
                  <input
                    type="text"
                    placeholder="Anna Svensson"
                    value={form.namn}
                    onChange={e => setForm(f => ({ ...f, namn: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">E-post</label>
                  <input
                    type="email"
                    placeholder="anna@foretaget.se"
                    value={form.epost}
                    onChange={e => setForm(f => ({ ...f, epost: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-white/20 focus:outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-1.5">
                    Vad vill du veta mer om?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Beskriv kort vad ni behöver – föreläsning, workshop, implementeringsstöd..."
                    value={form.meddelande}
                    onChange={e => setForm(f => ({ ...f, meddelande: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-white/20 focus:outline-none transition-all resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)`, boxShadow: `0 4px 20px ${ORANGE}35` }}
                >
                  Skicka meddelande <ArrowRight size={16} />
                </motion.button>
                <p className="text-white/25 text-xs text-center">Vi svarar inom en arbetsdag</p>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER-STRIP
// ─────────────────────────────────────────────

const FooterStrip = () => {
  const navigate = useNavigate();
  return (
    <div className="py-6 border-t" style={{ background: '#0f1623', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="font-bold text-white">
            <span style={{ color: ORANGE }}>Närings</span>klivet®
          </span>
        </div>
        <p className="text-white/25 text-xs">© 2026 Näringsklivet. Alla rättigheter förbehållna.</p>
        <div className="flex gap-5">
          {['Integritetspolicy', 'Villkor'].map((link, i) => (
            <button key={i}
              onClick={() => navigate(`/${link.toLowerCase().replace('ä','a').replace('å','a').replace('ö','o').replace(' ','-')}`)}
              className="text-white/30 text-xs hover:text-white/60 transition-colors">
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// SIDAN
// ─────────────────────────────────────────────

const OmOssPage = () => (
  <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Navigation />
    <Hero />
    <Story />
    <Metodik />
    {services.map((service, i) => (
      <ServiceRow key={service.id} service={service} index={i} />
    ))}
    <Kontakt />
    <FooterStrip />
  </div>
);

export default OmOssPage;