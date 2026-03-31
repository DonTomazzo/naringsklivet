// src/pages/CoursePage.tsx
// Kurssida för Näringsklivet – visas när man klickar på en utbildning
// Route: /kurs/:slug  eller  /module/:slug
// Data hämtas från modulesData baserat på slug

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle, Clock, Users, Star, Play, Award,
  ChevronDown, ChevronRight, ArrowLeft, ArrowRight,
  Shield, Zap, BookOpen, Lock, FileText
} from 'lucide-react';
import DatePicker from '../components/DatePicker';

// ── Brand ─────────────────────────────────────────────────
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
};

// ── Mock kursdata – ersätt med modulesData[slug] ──────────
const COURSE = {
  slug:      'ai-for-yrkesverksamma',
  title:     'AI för yrkesverksamma',
  subtitle:  'Från nollpunkt till AI-van – med konkreta resultat från dag ett',
  category:  'Träningsprogram',
  level:     'Alla nivåer',
  duration:  '4–6 veckor',
  students:  1450,
  rating:    4.9,
  reviews:   312,
  price:     1490,
  priceTeam: 'Volymrabatt från 2 licenser',
  image:     'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85',
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'AI-utbildare & grundare, Näringsklivet',
    img:   '/founder.png',
    bio:   '15+ års erfarenhet av försäljning, kundrelationer och projektledning. Kombinerar praktisk AI-kunskap med djup förståelse för hur yrkesverksamma faktiskt arbetar.',
  },
  learningPoints: [
    'Använd ChatGPT, Claude och Copilot professionellt på jobbet',
    'Skriv promptar som ger bra resultat första gången',
    'Automatisera repetitiva uppgifter och spara timmar i veckan',
    'Skapa dokument, rapporter och presentationer med AI-stöd',
    'Sammanfatta långa texter och möten på sekunder',
    'Välj rätt AI-verktyg för rätt uppgift',
    'Hantera personuppgifter och AI på ett GDPR-säkert sätt',
    'Bygga AI-vana som faktiskt håller i längden',
  ],
  modules: [
    { title: 'Ditt AI-team – rekrytera rätt verktyg',      duration: '35 min', free: true  },
    { title: 'Vad är generativ AI? Tekniken, enkelt',      duration: '25 min', free: false },
    { title: 'Promptkonstens grunder',                     duration: '40 min', free: false },
    { title: 'AI för e-post och kommunikation',            duration: '30 min', free: false },
    { title: 'Dokumentation och rapporter med AI',         duration: '35 min', free: false },
    { title: 'Möten, sammanfattningar och protokoll',      duration: '25 min', free: false },
    { title: 'Research och informationssökning',           duration: '30 min', free: false },
    { title: 'Presentationer och visuellt innehåll',       duration: '35 min', free: false },
    { title: 'AI för analys och beslutsunderlag',          duration: '40 min', free: false },
    { title: 'Automation – gör mer med mindre',            duration: '45 min', free: false },
    { title: 'AI i din specifika yrkesroll',               duration: '35 min', free: false },
    { title: 'GDPR, integritet och säker AI-användning',   duration: '30 min', free: false },
    { title: 'Bygg din AI-rutin',                          duration: '25 min', free: false },
    { title: 'Certifieringsprov & diplom',                 duration: '20 min', free: false },
  ],
  forWho: [
    'Medarbetare som vill jobba smartare och spara tid',
    'Chefer som vill förstå AI:s möjligheter för teamet',
    'Egenföretagare som vill effektivisera sin vardag',
    'Dig som är nyfiken men inte vet var du ska börja',
  ],
  testimonials: [
    {
      name: 'Maja Lindström', role: 'Marknadschef',
      text: 'Jag sparar minst 2 timmar om dagen. Inte en överdrift – faktiska mätningar.',
      rating: 5,
    },
    {
      name: 'Erik Johansson', role: 'VD, Byrå & Co',
      text: 'Hela teamet jobbar annorlunda nu. Bästa utbildningsinvesteringen vi gjort.',
      rating: 5,
    },
    {
      name: 'Sara Nilsson', role: 'Projektledare',
      text: 'Äntligen en kurs som visar hur man faktiskt integrerar AI i arbetsflödet.',
      rating: 5,
    },
  ],
};

// ── Reveal ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ── Sticky köp-box ────────────────────────────────────────
const BuyBox = ({ course, onBuy, onTrial }) => (
  <div className="rounded-2xl overflow-hidden border shadow-xl" style={{ borderColor: C.border }}>
    {/* Mörk header */}
    <div className="p-6" style={{ background: C.dark }}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-black text-white">{course.price.toLocaleString('sv-SE')} kr</span>
        <span className="text-sm text-white/40">/licens</span>
      </div>
      <p className="text-xs font-medium" style={{ color: C.orange }}>{course.priceTeam}</p>
    </div>

    <div className="p-5 space-y-4" style={{ background: C.white }}>
      {/* Primär CTA */}
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onBuy}
        className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`,
          boxShadow: `0 4px 20px ${C.orange}40` }}>
        Beställ med faktura <ArrowRight size={17} />
      </motion.button>

      {/* Provitta */}
      <button onClick={onTrial}
        className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:border-orange-300 hover:text-orange-500"
        style={{ borderColor: C.border, color: C.mid }}>
        Prova första modulen gratis
      </button>

      {/* Vad ingår */}
      <div className="pt-2 space-y-2.5">
        {[
          [Award,   'Certifikat vid genomförd kurs'],
          [Clock,   '4–6 veckor · Din egen takt'],
          [Shield,  '14 dagars öppet köp'],
          [Zap,     'Tillgång direkt efter beställning'],
          [BookOpen,'365 dagars åtkomst'],
        ].map(([Icon, text], i) => (
          <div key={i} className="flex items-center gap-3">
            <Icon size={15} style={{ color: C.orange }} className="flex-shrink-0" />
            <span className="text-sm" style={{ color: C.mid }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Garanti */}
      <div className="pt-3 border-t text-center" style={{ borderColor: C.border }}>
        <p className="text-xs" style={{ color: C.muted }}>
          Nöjd-kund-garanti · SSL-krypterat · Faktura 30 dagar netto
        </p>
      </div>
    </div>
  </div>
);

// ── Modul-accordion ───────────────────────────────────────
const ModuleList = ({ modules }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {modules.map((mod, i) => (
        <div key={i} className="rounded-xl border overflow-hidden"
          style={{ borderColor: C.border, background: C.white }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ background: mod.free ? C.orangeL : C.bgAlt,
                color: mod.free ? C.orange : C.muted }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: C.dark }}>{mod.title}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>{mod.duration}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {mod.free && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: C.orangeL, color: C.orange }}>Gratis</span>
              )}
              {!mod.free && <Lock size={13} style={{ color: C.muted }} />}
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={15} style={{ color: C.muted }} />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-4 flex items-center gap-3">
                  {mod.free ? (
                    <Link to="/module/ai-team"
                      className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                      style={{ background: C.orange }}>
                      <Play size={14} className="fill-current" /> Starta nu – gratis
                    </Link>
                  ) : (
                    <p className="text-sm" style={{ color: C.muted }}>
                      Köp kursen för att låsa upp alla moduler.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// ── HUVUDSIDA ─────────────────────────────────────────────
export default function CoursePage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const course     = COURSE; // ersätt med: modulesData.find(m => m.slug === slug)
  const [activeTab, setActiveTab] = useState('om');
  const [showSticky, setShowSticky] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const TABS = [
    { id: 'om',        label: 'Om kursen' },
    { id: 'innehall',  label: 'Kursinnehåll' },
    { id: 'instruktor',label: 'Instruktör' },
    { id: 'omdomen',   label: 'Omdömen' },
    { id: 'datum',     label: 'Boka datum' },
  ];

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollToTab = (id: string) => {
    setActiveTab(id);
    document.getElementById(`tab-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #171f32 0%, #1e2d4a 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-10">
          {/* Brödsmula */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Hem</button>
            <ChevronRight size={12} />
            <button onClick={() => navigate('/modules')} className="hover:text-white transition-colors">Utbildningar</button>
            <ChevronRight size={12} />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Vänster */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: C.orangeL, color: C.orange }}>
                  {course.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {course.title}
                </h1>
                <p className="text-lg text-white/70 mb-6 max-w-2xl">{course.subtitle}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-5 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={C.orange} color={C.orange} />
                      ))}
                    </div>
                    <span className="text-sm font-bold" style={{ color: C.orange }}>{course.rating}</span>
                    <span className="text-sm text-white/40">({course.reviews} omdömen)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <Users size={14} /> {course.students.toLocaleString('sv-SE')} deltagare
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <Clock size={14} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <Award size={14} /> Certifikat ingår
                  </div>
                </div>

                {/* Instruktör-rad */}
                <div className="flex items-center gap-3">
                  <img src={course.instructor.img} alt={course.instructor.name}
                    className="w-9 h-9 rounded-full object-cover border-2"
                    style={{ borderColor: C.orange }} />
                  <div>
                    <p className="text-sm text-white/50">Instruktör</p>
                    <p className="text-sm font-bold text-white">{course.instructor.name}</p>
                  </div>
                </div>
              </motion.div>
            </div>

           
          </div>
        </div>

       
      </div>

      {/* ── Tab-navigation ──────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b"
        style={{ background: 'rgba(250,248,245,0.96)', backdropFilter: 'blur(12px)',
          borderColor: C.border }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => scrollToTab(tab.id)}
                className="flex-shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all"
                style={{
                  borderColor: activeTab === tab.id ? C.orange : 'transparent',
                  color: activeTab === tab.id ? C.orange : C.muted,
                }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Vänster – innehåll */}
          <div className="lg:col-span-2 space-y-12">

          <div id="tab-om">
  {/* Kursbild */}
  <div className="rounded-2xl overflow-hidden mb-8" style={{ height: 320 }}>
    <img src={course.image} alt={course.title}
      className="w-full h-full object-cover" />
  </div>

  <Reveal>
    <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>
      Vad lär du dig?
    </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {course.learningPoints.map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: C.orange }}>
                        <CheckCircle size={11} color="white" />
                      </div>
                      <span className="text-sm" style={{ color: C.mid }}>{p}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>För vem är kursen?</h3>
                <div className="rounded-2xl border p-5 space-y-3"
                  style={{ background: C.white, borderColor: C.border }}>
                  {course.forWho.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ChevronRight size={16} style={{ color: C.orange }} className="flex-shrink-0" />
                      <span className="text-sm" style={{ color: C.mid }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Kursinnehåll */}
            <div id="tab-innehall">
              <Reveal>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black" style={{ color: C.dark }}>Kursinnehåll</h2>
                  <span className="text-sm" style={{ color: C.muted }}>
                    {course.modules.length} moduler · {course.duration}
                  </span>
                </div>
                <ModuleList modules={course.modules} />
              </Reveal>
            </div>

            {/* Instruktör */}
            <div id="tab-instruktor">
              <Reveal>
                <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Instruktör</h2>
                <div className="rounded-2xl border p-6 flex gap-5"
                  style={{ background: C.white, borderColor: C.border }}>
                  <img src={course.instructor.img} alt={course.instructor.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div>
                    <h3 className="font-black text-lg mb-0.5" style={{ color: C.dark }}>
                      {course.instructor.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: C.orange }}>{course.instructor.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.mid }}>
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Omdömen */}
            <div id="tab-omdomen">
              <Reveal>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-black" style={{ color: C.dark }}>Omdömen</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={C.orange} color={C.orange} />
                      ))}
                    </div>
                    <span className="font-bold" style={{ color: C.dark }}>{course.rating}</span>
                    <span className="text-sm" style={{ color: C.muted }}>
                      ({course.reviews} omdömen)
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {course.testimonials.map((t, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <div className="rounded-2xl border p-5"
                        style={{ background: C.white, borderColor: C.border }}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                            style={{ background: C.orange }}>
                            {t.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                            <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                          </div>
                          <div className="flex gap-0.5 ml-auto">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={13} fill={C.orange} color={C.orange} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: C.mid }}>
                          "{t.text}"
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Boka datum */}
            <div id="tab-datum">
              <Reveal>
                <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>Boka uppstartsdatum</h2>
                <p className="text-sm mb-6" style={{ color: C.muted }}>
                  Välj ett datum för dig eller din organisation. En licens per deltagare.
                </p>
                <DatePicker />
              </Reveal>
            </div>

          </div>

          {/* Höger – sticky köpbox (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <BuyBox course={course}
                onBuy={() => navigate('/purchase/naringsklivet-ai')}
                onTrial={() => navigate('/module/ai-team')} />
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobil sticky CTA ────────────────────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t px-4 py-3 flex items-center gap-3"
            style={{ background: C.white, borderColor: C.border }}>
            <div className="flex-1">
              <p className="text-xs" style={{ color: C.muted }}>Kurs</p>
              <p className="font-black text-lg" style={{ color: C.dark }}>
                {course.price.toLocaleString('sv-SE')} kr
              </p>
            </div>
            <button onClick={() => navigate('/purchase/naringsklivet-ai')}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
              Beställ nu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}