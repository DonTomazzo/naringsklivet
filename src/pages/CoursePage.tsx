// src/pages/CoursePage.tsx
// Route: /kurs/:slug
// Stöder: free | self-paced | live | program | bundle

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPopup from '../components/VideoPopup';
import {
  CheckCircle, Clock, Users, Star, Play, Award,
  ChevronDown, ChevronRight, ArrowRight,
  Zap, BookOpen, Lock, Shield, HelpCircle,
  MapPin, Calendar, Users2, Download,
} from 'lucide-react';
import DatePicker from '../components/DatePicker';
import { getModuleBySlug } from '../data/coursesData';
import { getModuleBySlug as getNKCourseBySlug } from '../data/naringsklivetData';
import { getModuleBySlug as getSKCourseBySlug } from '../data/modules2';

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

const isLoggedIn = false;

// ── Kurstyp-config ────────────────────────────────────────
const TYPE_CONFIG = {
  free:          { label: 'Gratis kurs',              color: C.orange,  bg: C.orangeL },
  'self-paced':  { label: 'Online · Egen takt',       color: C.orange,  bg: C.orangeL },
  live:          { label: 'Platsbaserad utbildning',  color: C.orange,  bg: C.orangeL },
  program:       { label: 'Program',                  color: C.orange,  bg: C.orangeL },
  bundle:        { label: 'Styrelsekörkortet',        color: C.orange,  bg: C.orangeL },
};

// ── YouTube ID ────────────────────────────────────────────
const getYouTubeId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
  return null;
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

// ── CTA-knappar (typmedveten) ─────────────────────────────
const CourseCtaButtons = ({ slug, navigate, isFree, isLive, isBundle }) => (
  <div className="flex flex-col gap-2.5 w-full">
    {isFree ? (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/module/${slug}`)}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
        <Play size={15} className="fill-current" /> Gå till kurs — gratis
      </motion.button>
    ) : isBundle && isLoggedIn ? (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/module/${slug}`)}
        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
        <Play size={15} className="fill-current" /> Gå till kursen
      </motion.button>
    ) : isBundle && !isLoggedIn ? (
      <>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/purchase/styrelsekorkortet')}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
          Beställ Styrelsekörkortet <ArrowRight size={15} />
        </motion.button>
        <button onClick={() => navigate(`/module/${slug}`)}
          className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:border-orange-300 hover:text-orange-500"
          style={{ borderColor: C.border, color: C.mid }}>
          Prova första modulen gratis
        </button>
      </>
    ) : isLive ? (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => document.getElementById('tab-datum')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
        <Calendar size={15} /> Boka uppstartsdatum
      </motion.button>
    ) : isLoggedIn ? (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/module/${slug}`)}
        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
        <Play size={15} className="fill-current" /> Återgå till kursen
      </motion.button>
    ) : (
      <>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/purchase/naringsklivet-ai')}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}35` }}>
          Beställ med faktura <ArrowRight size={15} />
        </motion.button>
        <button onClick={() => navigate(`/module/${slug}`)}
          className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:border-orange-300 hover:text-orange-500"
          style={{ borderColor: C.border, color: C.mid }}>
          Prova första modulen gratis
        </button>
      </>
    )}
  </div>
);

// ── PDF-knapp ─────────────────────────────────────────────
const PdfButton = ({ pdfUrl }: { pdfUrl?: string }) => {
  if (!pdfUrl) return null;
  return (
    <a href={pdfUrl} download
      className="w-full py-3 rounded-xl font-semibold text-sm border-2 flex items-center justify-center gap-2 transition-all hover:border-orange-300 hover:text-orange-500"
      style={{ borderColor: C.border, color: C.mid }}>
      <Download size={14} />
      Ladda ner kursinnehåll (PDF)
    </a>
  );
};

// ── Modul-accordion ───────────────────────────────────────
const ModuleList = ({ modules, courseSlug, isBundle, isLoggedIn }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {(modules || []).map((mod, i) => (
        <div key={i} className="rounded-xl border overflow-hidden"
          style={{ borderColor: C.border, background: C.white }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ background: mod.free || (isBundle && isLoggedIn) ? C.orangeL : C.bgAlt,
                       color: mod.free || (isBundle && isLoggedIn) ? C.orange : C.muted }}>
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
              {isBundle && isLoggedIn && !mod.free && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: C.orangeL, color: C.orange }}>Ingår</span>
              )}
              {!mod.free && !(isBundle && isLoggedIn) && (
                <Lock size={13} style={{ color: C.muted }} />
              )}
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={15} style={{ color: C.muted }} />
              </motion.div>
            </div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
                exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-4">
                  {mod.free || (isBundle && isLoggedIn) ? (
                    <button onClick={() => navigate(`/module/${courseSlug}`)}
                      className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg text-white"
                      style={{ background: C.orange }}>
                      <Play size={14} className="fill-current" /> Starta nu
                    </button>
                  ) : isBundle ? (
                    <p className="text-sm" style={{ color: C.muted }}>
                      Ingår i Styrelsekörkortet — <button onClick={() => navigate('/purchase/styrelsekorkortet')}
                        className="font-semibold underline" style={{ color: C.orange }}>beställ här</button>
                    </p>
                  ) : (
                    <p className="text-sm" style={{ color: C.muted }}>Köp kursen för att låsa upp alla moduler.</p>
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

// ── FAQ-item ──────────────────────────────────────────────
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: C.border, background: C.white }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-sm pr-4" style={{ color: C.dark }}>{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown size={16} style={{ color: C.muted }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}
            exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-4 border-t" style={{ borderColor: C.border }}>
              <p className="text-sm leading-relaxed pt-3" style={{ color: C.mid }}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Hittades inte ─────────────────────────────────────────
const NotFound = ({ navigate }) => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
    <div className="text-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>Kursen hittades inte</h2>
      <p className="text-sm mb-6" style={{ color: C.muted }}>Kontrollera länken eller gå tillbaka till alla kurser.</p>
      <button onClick={() => navigate('/modules')} className="px-6 py-3 rounded-xl font-bold text-white"
        style={{ background: C.orange }}>
        Tillbaka till alla kurser
      </button>
    </div>
  </div>
);

// ── HUVUDSIDA ─────────────────────────────────────────────
export default function CoursePage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const course = getModuleBySlug(slug) ?? getNKCourseBySlug(slug) ?? getSKCourseBySlug(slug);

  const [activeTab, setActiveTab]   = useState('om');
  const [showSticky, setShowSticky] = useState(false);
  const [videoOpen, setVideoOpen]   = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!course) return <NotFound navigate={navigate} />;

  // ── Kurstyp ─────────────────────────────────────────────
  const courseType = course.type || 'self-paced';
  const isFree     = courseType === 'free';
  const isLive     = courseType === 'live';
  const isBundle   = courseType === 'bundle';
  const typeConfig = TYPE_CONFIG[courseType] || TYPE_CONFIG['self-paced'];

  // ── Kursdata ────────────────────────────────────────────
  const instructor    = course.instructor   || { name: 'Tomas Mauritzson', title: 'Kursledare', img: '/founder.png', bio: '' };
  const forWho        = course.forWho       || [];
  const testimonials  = course.testimonials || [];
  const courseModules = course.modules      || [];
  const price         = course.price        || 1490;
  const priceTeam     = course.priceTeam    || 'Volymrabatt från 2 licenser';
  const subtitle      = course.subtitle     || course.short_description || '';
  const image         = course.image_url    || course.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85';
  const previewId     = getYouTubeId(course.previewVideoUrl);
  const courseFaq     = course?.faq || [];
  const hasFaq        = courseFaq.length > 0;
  const pdfUrl        = course.pdfUrl || null;

  // ── Tabs ────────────────────────────────────────────────
  const TABS = [
    { id: 'om',         label: 'Om kursen',        show: true },
    { id: 'innehall',   label: 'Kursinnehåll',     show: !isLive },
    { id: 'instruktor', label: 'Instruktör',        show: true },
    { id: 'omdomen',    label: 'Omdömen',           show: true },
    { id: 'datum',      label: 'Boka datum',        show: isLive },
    { id: 'faq',        label: 'Vanliga frågor',    show: hasFaq },
  ].filter(t => t.show);

  const scrollToTab = (id: string) => {
    setActiveTab(id);
    document.getElementById(`tab-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ── Features i prisbox ───────────────────────────────────
  const features = [
    !isFree && !isLive && [Award,    'Certifikat vid genomförd kurs'],
    isLive             && [Award,    'Certifikat vid genomförd utbildning'],
    [Clock,              `${course.duration} · Din egen takt`],
    isLive && course.location && [MapPin, course.location],
    isLive && course.maxParticipants && [Users2, `Max ${course.maxParticipants} deltagare`],
    !isFree && !isLive && !isBundle && [Shield, '14 dagars öppet köp'],
    !isFree && !isLive && !isBundle && [Zap,    'Tillgång direkt efter beställning'],
    !isLive            && [BookOpen, '365 dagars åtkomst'],
    isBundle           && [Users,    'Hela styrelsen ingår i licensen'],
  ].filter(Boolean);

  // ── Prisbox-innehåll ────────────────────────────────────
  const PrisBox = () => {
    if (isFree) return (
      <div className="px-5 py-4 border-b text-center" style={{ background: C.orangeL, borderColor: C.border }}>
        <p className="text-2xl font-black" style={{ color: C.orange }}>Gratis</p>
        <p className="text-xs mt-0.5" style={{ color: C.orangeD }}>Ingen registrering krävs</p>
      </div>
    );

    if (isBundle && isLoggedIn) return (
      <div className="px-5 py-4 border-b text-center" style={{ background: C.orangeL, borderColor: C.border }}>
        <p className="text-sm font-black" style={{ color: C.orange }}>✓ Ingår i ditt abonnemang</p>
        <p className="text-xs mt-0.5" style={{ color: C.mid }}>Full tillgång till alla moduler</p>
      </div>
    );

    if (isBundle && !isLoggedIn) return (
      <div className="px-5 py-4 border-b" style={{ background: C.bg, borderColor: C.border }}>
        <p className="text-xs font-semibold mb-1" style={{ color: C.muted }}>Ingår i Styrelsekörkortet</p>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-3xl font-black" style={{ color: C.dark }}>
            {price.toLocaleString('sv-SE')} kr
          </span>
          <span className="text-sm" style={{ color: C.muted }}>/licens</span>
        </div>
        <p className="text-xs font-semibold" style={{ color: C.orange }}>{priceTeam}</p>
      </div>
    );

    if (isLive) return (
      <div className="px-5 py-4 border-b" style={{ background: C.bg, borderColor: C.border }}>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-3xl font-black" style={{ color: C.dark }}>
            {price.toLocaleString('sv-SE')} kr
          </span>
          <span className="text-sm" style={{ color: C.muted }}>/person</span>
        </div>
        <p className="text-xs font-semibold" style={{ color: C.orange }}>
          {priceTeam || 'Grupprabatt från 5 deltagare'}
        </p>
      </div>
    );

    return (
      <div className="px-5 py-4 border-b" style={{ background: C.bg, borderColor: C.border }}>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-3xl font-black" style={{ color: C.dark }}>
            {price.toLocaleString('sv-SE')} kr
          </span>
          <span className="text-sm" style={{ color: C.muted }}>/licens</span>
        </div>
        <p className="text-xs font-semibold" style={{ color: C.orange }}>{priceTeam}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #171f32 0%, #1e2d4a 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-12">

          {/* Brödsmula */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Hem</button>
            <ChevronRight size={12} />
            <button onClick={() => navigate('/modules')} className="hover:text-white transition-colors">Utbildningar</button>
            <ChevronRight size={12} />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{course.title}</span>
          </div>

          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: C.orangeL, color: C.orange }}>
                  {course.category}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${typeConfig.color}25`, color: typeConfig.color }}>
                  {typeConfig.label}
                </span>
                {isFree && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: C.orange }}>
                    ✓ Ingen registrering krävs
                  </span>
                )}
                {isBundle && isLoggedIn && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: C.orange }}>
                    ✓ Ingår i ditt abonnemang
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
                style={{ fontFamily: "'Nunito', sans-serif" }}>
                {course.title}
              </h1>
              <p className="text-base text-white/70 mb-5 max-w-xl">{subtitle}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {course.rating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={C.orange} color={C.orange} />)}
                    </div>
                    <span className="text-sm font-bold" style={{ color: C.orange }}>{course.rating}</span>
                    <span className="text-sm text-white/40">
                      ({course.reviews || course.students || 0} {course.reviews ? 'omdömen' : 'deltagare'})
                    </span>
                  </div>
                )}
                {course.students > 0 && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-sm text-white/60 flex items-center gap-1.5">
                      <Users size={13} /> {course.students.toLocaleString('sv-SE')}
                    </span>
                  </>
                )}
                {course.duration && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-sm text-white/60 flex items-center gap-1.5">
                      <Clock size={13} /> {course.duration}
                    </span>
                  </>
                )}
                {!isFree && !isLive && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-sm text-white/60 flex items-center gap-1.5">
                      <Award size={13} /> Certifikat
                    </span>
                  </>
                )}
              </div>

              {/* Instruktör */}
              <div className="flex items-center gap-3">
                <img src={instructor.img} alt={instructor.name}
                  className="w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: C.orange }} />
                <span className="text-sm text-white/70">{instructor.name}</span>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Tab-navigation ────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b"
        style={{ background: 'rgba(250,248,245,0.96)', backdropFilter: 'blur(12px)', borderColor: C.border }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => scrollToTab(tab.id)}
                className="flex-shrink-0 px-5 py-4 text-sm font-semibold border-b-2 transition-all"
                style={{ borderColor: activeTab === tab.id ? C.orange : 'transparent',
                         color: activeTab === tab.id ? C.orange : C.muted }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Vänster kolumn ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Om kursen */}
            <div id="tab-om">
              <div className="rounded-2xl overflow-hidden mb-8" style={{ height: 320 }}>
                <img src={image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <Reveal>
                <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Vad lär du dig?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {(course.learningPoints || []).map((p, i) => (
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

              {forWho.length > 0 && (
                <Reveal delay={0.06}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: C.dark }}>För vem är kursen?</h3>
                  <div className="rounded-2xl border p-5 space-y-3" style={{ background: C.white, borderColor: C.border }}>
                    {forWho.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <ChevronRight size={16} style={{ color: C.orange }} className="flex-shrink-0" />
                        <span className="text-sm" style={{ color: C.mid }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Kursinnehåll */}
            {!isLive && (
              <div id="tab-innehall">
                <Reveal>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-black" style={{ color: C.dark }}>Kursinnehåll</h2>
                    <span className="text-sm" style={{ color: C.muted }}>
                      {courseModules.length} moduler · {course.duration}
                    </span>
                  </div>
                  {courseModules.length > 0
                    ? <ModuleList
                        modules={courseModules}
                        courseSlug={course.slug}
                        isBundle={isBundle}
                        isLoggedIn={isLoggedIn}
                      />
                    : (
                      <div className="rounded-2xl border p-8 text-center" style={{ borderColor: C.border, background: C.white }}>
                        <p className="text-sm" style={{ color: C.muted }}>Kursinnehåll publiceras snart.</p>
                      </div>
                    )
                  }
                </Reveal>
              </div>
            )}

            {/* Instruktör */}
            <div id="tab-instruktor">
              <Reveal>
                <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Instruktör</h2>
                <div className="rounded-2xl border p-6 flex gap-5" style={{ background: C.white, borderColor: C.border }}>
                  <img src={instructor.img} alt={instructor.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div>
                    <h3 className="font-black text-lg mb-0.5" style={{ color: C.dark }}>{instructor.name}</h3>
                    <p className="text-sm mb-3" style={{ color: C.orange }}>{instructor.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.mid }}>{instructor.bio}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Omdömen */}
            <div id="tab-omdomen">
              <Reveal>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-black" style={{ color: C.dark }}>Omdömen</h2>
                  {course.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={C.orange} color={C.orange} />)}
                      </div>
                      <span className="font-bold" style={{ color: C.dark }}>{course.rating}</span>
                    </div>
                  )}
                </div>
                {testimonials.length > 0 ? (
                  <div className="space-y-4">
                    {testimonials.map((t, i) => (
                      <Reveal key={i} delay={i * 0.06}>
                        <div className="rounded-2xl border p-5" style={{ background: C.white, borderColor: C.border }}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: C.orange }}>{t.name[0]}</div>
                            <div>
                              <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                              <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                            </div>
                            <div className="flex gap-0.5 ml-auto">
                              {[...Array(t.rating)].map((_, i) => <Star key={i} size={13} fill={C.orange} color={C.orange} />)}
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: C.mid }}>"{t.text}"</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border p-8 text-center" style={{ borderColor: C.border, background: C.white }}>
                    <p className="text-sm" style={{ color: C.muted }}>Inga omdömen ännu – bli den första!</p>
                  </div>
                )}
              </Reveal>
            </div>

            {/* Boka datum — bara för live */}
            {isLive && (
              <div id="tab-datum">
                <Reveal>
                  <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>Boka uppstartsdatum</h2>
                  <p className="text-sm mb-6" style={{ color: C.muted }}>
                    Välj ett datum som passar dig eller din organisation.
                  </p>
                  <DatePicker />
                </Reveal>
              </div>
            )}

            {/* FAQ */}
            {hasFaq && (
              <div id="tab-faq">
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <HelpCircle size={22} style={{ color: C.orange }} className="flex-shrink-0" />
                    <h2 className="text-2xl font-black" style={{ color: C.dark }}>Vanliga frågor</h2>
                  </div>
                  <div className="space-y-2">
                    {courseFaq.map((item, i) => (
                      <FaqItem key={i} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </Reveal>
              </div>
            )}

            {/* CTA-block längre ner */}
            <Reveal>
              <div className="rounded-2xl p-6 border-2"
                style={{ borderColor: C.orange + '30', background: C.orangeL }}>
                <p className="font-black text-xl mb-1" style={{ color: C.dark }}>
                  {isFree ? 'Kom igång direkt — helt gratis'
                    : isBundle && isLoggedIn ? 'Den här kursen ingår i ditt abonnemang'
                    : isBundle ? 'Ingår i Styrelsekörkortet'
                    : 'Redo att börja?'}
                </p>
                <p className="text-sm mb-5" style={{ color: C.mid }}>
                  {isFree
                    ? 'Ingen registrering. Inget kreditkort. Bara lärande.'
                    : isBundle && isLoggedIn
                    ? 'Du har full tillgång — starta kursen direkt.'
                    : isBundle
                    ? `Alla kurser i Styrelsekörkortet för ${price.toLocaleString('sv-SE')} kr/licens.`
                    : isLive
                    ? `${price.toLocaleString('sv-SE')} kr/person · Faktura 30 dagar`
                    : `${price.toLocaleString('sv-SE')} kr/licens · Faktura 30 dagar · 14 dagars öppet köp`
                  }
                </p>
                <CourseCtaButtons
                  slug={course.slug}
                  navigate={navigate}
                  isFree={isFree}
                  isLive={isLive}
                  isBundle={isBundle}
                />
                <div className="mt-2.5">
                  <PdfButton pdfUrl={pdfUrl} />
                </div>
              </div>
            </Reveal>

          </div>

          {/* ── Höger – sticky prisbox ──────────────────── */}
          <div className="hidden lg:block lg:col-span-1 sticky top-[60px] self-start z-20"
            style={{ marginTop: '-280px' }}>
            <div className="rounded-2xl border overflow-hidden shadow-lg" style={{ borderColor: C.border }}>

              {/* Videopreview eller kursbild */}
              <div className="relative cursor-pointer group"
                onClick={() => previewId ? setVideoOpen(true) : null}>
                <img
                  src={previewId ? `https://img.youtube.com/vi/${previewId}/hqdefault.jpg` : image}
                  alt="Förhandsgranska kursen"
                  className="w-full object-cover"
                  style={{ height: 180 }}
                />
                {previewId && (
                  <>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
                        <Play size={20} style={{ color: C.orange }} className="fill-current ml-1" />
                      </div>
                    </div>
                    <p className="absolute bottom-3 left-0 right-0 text-center text-white text-xs font-bold">
                      Förhandsgranska kursen
                    </p>
                  </>
                )}
              </div>
              {previewId && (
                <VideoPopup isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoId={previewId} />
              )}

              {/* Prisbox */}
              <PrisBox />

              {/* Knappar + features + PDF */}
              <div className="p-4 space-y-3" style={{ background: C.white }}>
                <CourseCtaButtons
                  slug={course.slug}
                  navigate={navigate}
                  isFree={isFree}
                  isLive={isLive}
                  isBundle={isBundle}
                />
                <PdfButton pdfUrl={pdfUrl} />
                <div className="pt-2 space-y-2">
                  {features.map(([Icon, text]: any, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Icon size={14} style={{ color: C.orange }} className="flex-shrink-0" />
                      <span className="text-xs" style={{ color: C.mid }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Mobil sticky CTA ──────────────────────────────── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t px-4 py-3 flex items-center gap-3"
            style={{ background: C.white, borderColor: C.border }}>
            <div className="flex-1">
              <p className="text-xs" style={{ color: C.muted }}>
                {isFree ? 'Gratis kurs'
                  : isBundle && isLoggedIn ? 'Ingår i abonnemanget'
                  : isBundle ? 'Styrelsekörkortet'
                  : isLive ? 'Platsbaserad'
                  : 'Kurs'}
              </p>
              <p className="font-black text-lg" style={{ color: C.dark }}>
                {isFree ? 'Gratis'
                  : isBundle && isLoggedIn ? '✓ Din kurs'
                  : `${price.toLocaleString('sv-SE')} kr`}
              </p>
            </div>
            {isFree ? (
              <button onClick={() => navigate(`/module/${course.slug}`)}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2"
                style={{ background: C.orange }}>
                <Play size={14} className="fill-current" /> Gå till kurs
              </button>
            ) : isBundle && isLoggedIn ? (
              <button onClick={() => navigate(`/module/${course.slug}`)}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2"
                style={{ background: C.orange }}>
                <Play size={14} className="fill-current" /> Starta
              </button>
            ) : isBundle ? (
              <button onClick={() => navigate('/purchase/styrelsekorkortet')}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: C.orange }}>
                Beställ
              </button>
            ) : isLive ? (
              <button onClick={() => document.getElementById('tab-datum')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: C.orange }}>
                Boka datum
              </button>
            ) : isLoggedIn ? (
              <button onClick={() => navigate(`/module/${course.slug}`)}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2"
                style={{ background: C.orange }}>
                <Play size={14} className="fill-current" /> Återgå
              </button>
            ) : (
              <button onClick={() => navigate('/purchase/naringsklivet-ai')}
                className="px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: C.orange }}>
                Beställ nu
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}