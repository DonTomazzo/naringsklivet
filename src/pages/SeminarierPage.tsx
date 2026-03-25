// src/pages/SeminarierPage.jsx
// Dedikerad landningssida för seminarier & workshops
// Route: /seminarier

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, ChevronDown,
  Users, Award, Zap, Shield, MapPin,
  Monitor, Calendar, Clock, Star
} from 'lucide-react';
import EventsSection from '../components/EventsSection';

// ─── Brand tokens ────────────────────────────────────────
const ORANGE = '#FF5421';
const DARK   = '#171f32';

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = ({ onScrollToEvents }) => (
  <section className="relative min-h-[60vh] flex items-center overflow-hidden">
    <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#0f1623]/88" />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 w-[500px] h-[250px] rounded-full blur-3xl opacity-[0.08] pointer-events-none"
      style={{ background: ORANGE }}
    />

    <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 py-20 text-center">
      <motion.div {...fu(0)}>
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
          style={{ background: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}44` }}>
          Seminarier & Workshops 2026
        </span>
      </motion.div>

      <motion.h1 {...fu(0.08)}
        className="text-3xl sm:text-5xl font-bold text-white leading-[1.1] mb-5"
        style={{ fontFamily: "'Nunito', sans-serif" }}>
        Lär dig använda AI –{' '}
        <span style={{ color: ORANGE, textShadow: `0 0 40px ${ORANGE}55` }}>
          live, med en expert
        </span>
      </motion.h1>

      <motion.p {...fu(0.14)}
        className="text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-xl mx-auto">
        Interaktiva seminarier och workshops där du får svar på dina frågor i realtid.
        Online, platsbaserat eller hybrid – välj formatet som passar dig.
      </motion.p>

      <motion.div {...fu(0.2)} className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
          onClick={onScrollToEvents}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                     rounded-xl font-bold text-base text-white"
          style={{
            background: `linear-gradient(135deg, ${ORANGE}, #E04619)`,
            boxShadow: `0 4px 24px ${ORANGE}40`,
          }}>
          Se alla event
          <ArrowRight size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
          onClick={() => window.location.href = '/purchase/naringsklivet-ai'}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                     rounded-xl font-semibold text-base text-white"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
          }}>
          Se hela kursen istället
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div {...fu(0.28)}
        className="flex flex-wrap justify-center gap-6 mt-10">
        {[
          { icon: '💻', text: 'Online & platsbaserat' },
          { icon: '🎯', text: 'Max 20 deltagare' },
          { icon: '🏷', text: 'Early bird-priser' },
          { icon: '📅', text: 'Kalenderinbjudan ingår' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-white/55 text-sm">
            <span>{s.icon}</span>
            <span>{s.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// SÄLJARGUMENT
// ─────────────────────────────────────────────

const WhyLive = () => (
  <section className="py-16 sm:py-20" style={{ background: '#F8F7F4' }}>
    <div className="max-w-5xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                         rounded-full mb-4 text-white"
          style={{ background: ORANGE }}>
          VARFÖR LIVE?
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: DARK,  fontFamily: "'Nunito', sans-serif" }}>
          Mer än en kurs – ett tillfälle att ställa dina frågor
        </h2>
        <p className="text-gray-500 text-base max-w-xl mx-auto">
          Självstudier är bra. Men ingenting slår att sitta i ett rum (eller Zoom-call)
          med en expert som kan svara på just din situation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: Users,
            title: 'Liten grupp – stor skillnad',
            desc: 'Max 15–30 deltagare per tillfälle. Du är inte ett ansikte i mängden – dina frågor och din bransch ryms.',
            color: '#3b82f6',
          },
          {
            icon: Zap,
            title: 'Direktsvar i realtid',
            desc: 'Fastnar du? Ställ frågan direkt. Ingen FAQ-sökning, inga forum – bara ett direkt svar från en AI-expert.',
            color: ORANGE,
          },
          {
            icon: Award,
            title: 'Certifikat & dokumentation',
            desc: 'Alla deltagare får ett digitalt närvaro­intyg efter genomfört seminarium – perfekt för LinkedIn eller HR.',
            color: '#16a34a',
          },
          {
            icon: MapPin,
            title: 'Välj ditt format',
            desc: 'Online via Zoom eller Teams, platsbaserat i Malmö/Kristianstad, eller hybrid – du bestämmer hur du deltar.',
            color: '#9333ea',
          },
          {
            icon: Calendar,
            title: 'Inspelning ingår',
            desc: 'Missade du något? Alla online-seminarium spelas in och skickas till deltagare inom 24 timmar.',
            color: '#d97706',
          },
          {
            icon: Shield,
            title: 'Full återbetalning',
            desc: 'Kan du inte delta? Avboka upp till 7 dagar innan och få pengarna tillbaka – inga frågor ställs.',
            color: '#ef4444',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${item.color}15` }}>
                <Icon size={20} style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FORMAT-FÖRKLARING
// ─────────────────────────────────────────────

const FormatSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-4xl mx-auto px-4">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-xl font-bold mb-8" style={{ color: DARK }}>
        Tre format – ett val
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: '💻', type: 'Online',
            color: '#3b82f6', bg: 'rgba(59,130,246,0.06)',
            desc: 'Zoom eller Microsoft Teams. Delta hemifrån eller från kontoret.',
            includes: ['Zoom/Teams-länk i bekräftelsen', 'Inspelning skickas efteråt', 'Interaktiv chat & Q&A'],
          },
          {
            icon: '📍', type: 'Platsbaserat',
            color: '#16a34a', bg: 'rgba(34,197,94,0.06)',
            desc: 'Fysisk plats i Malmö, Kristianstad eller annan angiven ort.',
            includes: ['Adress i bekräftelsen', 'Kaffe & fika ingår', 'Nätverkstillfälle'],
          },
          {
            icon: '🔀', type: 'Hybrid',
            color: '#9333ea', bg: 'rgba(168,85,247,0.06)',
            desc: 'Välj själv – delta på plats eller digitalt. Samma upplevelse.',
            includes: ['Zoom-länk + fysisk plats', 'Välj format vid anmälan', 'Inspelning för alla'],
          },
        ].map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-5 border-2"
            style={{ background: f.bg, borderColor: `${f.color}30` }}>
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-slate-800 mb-1">{f.type}</h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">{f.desc}</p>
            <ul className="space-y-1.5">
              {f.includes.map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle size={12} style={{ color: f.color, flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

const FAQS = [
  {
    q: 'Kan jag anmäla mig nära inpå eventet?',
    a: 'Ja, så länge det finns platser kvar. Vi rekommenderar tidig anmälan – populära datum fylls snabbt och early bird-priset gäller bara fram till ett visst datum.',
  },
  {
    q: 'Vad händer om jag inte kan delta?',
    a: 'Avboka upp till 7 dagar innan eventet och du får full återbetalning. Kortare varsel ger tillgodokvitto för framtida event. Vid sjukdom gör vi alltid undantag.',
  },
  {
    q: 'Får jag en inspelning om jag missar något?',
    a: 'Alla online-seminarium spelas in och skickas till anmälda deltagare inom 24 timmar. Platsbaserade event spelas inte in.',
  },
  {
    q: 'Kan jag anmäla flera från samma företag?',
    a: 'Ja. Anmäl varje person separat, eller kontakta oss för grupprabatt om ni är tre eller fler från samma organisation.',
  },
  {
    q: 'Vilken teknisk utrustning behöver jag för online-event?',
    a: 'En dator eller surfplatta med webbkamera och mikrofon. Zoom eller Teams – länken skickas i bekräftelsemejlet.',
  },
  {
    q: 'Utfärdas ett intyg eller certifikat?',
    a: 'Ja, alla deltagare får ett digitalt närvaro­intyg efter genomfört seminarium. Klara du hela kursprogrammet på naringsklivet.se får du dessutom ett fullständigt kurs­certifikat.',
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 sm:py-20" style={{ background: '#F8F7F4' }}>
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: DARK }}>
            Vanliga frågor om seminarierna
          </h2>
          <p className="text-gray-500 text-sm">Hittar du inte svaret? Hör av dig till oss.</p>
        </motion.div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                className="w-full px-5 py-4 text-left flex justify-between items-center gap-4"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                  className="flex-shrink-0">
                  <ChevronDown size={18} style={{ color: ORANGE }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden">
                    <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// BOTTOM CTA
// ─────────────────────────────────────────────

const BottomCta = ({ onScrollToEvents }) => {
  const navigate = useNavigate();
  return (
    <section className="py-16" style={{ background: DARK }}>
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-amber-400 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Redo att framtidssäkra ditt arbete?
          </h2>
          <p className="text-white/55 text-sm mb-8 leading-relaxed">
            Välj ett datum som passar dig – online, på plats eller hybrid.
            Early bird-priser på alla kommande event.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onScrollToEvents}
              className="px-7 py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)`, boxShadow: `0 4px 20px ${ORANGE}40` }}>
              Välj ditt event
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/purchase/naringsklivet-ai')}
              className="px-7 py-3.5 rounded-xl font-semibold text-white"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              Se hela kursen
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SIDAN
// ─────────────────────────────────────────────

const SeminarierPage = () => {
  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>
      <Hero onScrollToEvents={scrollToEvents} />
      <WhyLive />
      <FormatSection />

      {/* Kalender / event-lista */}
      <section id="events" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                             rounded-full mb-4 text-white" style={{ background: ORANGE }}>
              BOKA PLATS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: DARK, fontFamily: "'Nunito', sans-serif" }}>
              Kommande seminarier & workshops
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Klicka på ett event för att läsa mer och anmäla dig.
              Early bird-priser gäller tills angivet datum.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <EventsSection />
          </div>
        </div>
      </section>

      <FaqSection />
      <BottomCta onScrollToEvents={scrollToEvents} />
    </div>
  );
};

export default SeminarierPage;