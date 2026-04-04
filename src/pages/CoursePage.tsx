// src/pages/CoursePage.tsx
// Route: /kurs/:slug
// Data hämtas från modulesData baserat på slug

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle, Clock, Users, Star, Play, Award,
  ChevronDown, ChevronRight, ArrowRight,
  Zap, BookOpen, Lock, Shield
} from 'lucide-react';
import DatePicker from '../components/DatePicker';
import { getModuleBySlug } from '../data/modules2';

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

// Ersätt med Supabase: const { data: { session } } = useSession(); const isLoggedIn = !!session;
const isLoggedIn = false;

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

// ── Auth-aware CTA-knappar ────────────────────────────────
const CourseCtaButtons = ({ slug, navigate }) => (
  <div className="flex flex-col gap-2.5 w-full">
    {isLoggedIn ? (
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/module/${slug}`)}
        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`,
          boxShadow: `0 4px 16px ${C.orange}35` }}>
        <Play size={15} className="fill-current" /> Återgå till kursen
      </motion.button>
    ) : (
      <>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/purchase/naringsklivet-ai')}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`,
            boxShadow: `0 4px 16px ${C.orange}35` }}>
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

// ── Modul-accordion ───────────────────────────────────────
const ModuleList = ({ modules, courseSlug }) => {
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
                <div className="px-5 pb-4">
                  {mod.free ? (
                    <button onClick={() => navigate(`/module/${courseSlug}`)}
                      className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg text-white"
                      style={{ background: C.orange }}>
                      <Play size={14} className="fill-current" /> Starta nu – gratis
                    </button>
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

// ── Hittades inte ─────────────────────────────────────────
const NotFound = ({ navigate }) => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
    <div className="text-center px-4">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>Kursen hittades inte</h2>
      <p className="text-sm mb-6" style={{ color: C.muted }}>
        Kontrollera länken eller gå tillbaka till alla kurser.
      </p>
      <button onClick={() => navigate('/modules')}
        className="px-6 py-3 rounded-xl font-bold text-white"
        style={{ background: C.orange }}>
        Tillbaka till alla kurser
      </button>
    </div>
  </div>
);

// ── HUVUDSIDA ─────────────────────────────────────────────
export default function CoursePage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const course    = getModuleBySlug(slug);

  const [activeTab, setActiveTab]   = useState('om');
  const [showSticky, setShowSticky] = useState(false);

  const TABS = [
    { id: 'om',         label: 'Om kursen' },
    { id: 'innehall',   label: 'Kursinnehåll' },
    { id: 'instruktor', label: 'Instruktör' },
    { id: 'omdomen',    label: 'Omdömen' },
    { id: 'datum',      label: 'Boka datum' },
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

  if (!course) return <NotFound navigate={navigate} />;

  // Fallbacks för fält som kanske saknas i äldre data
  const instructor  = course.instructor  || { name: 'Tomas Mauritzson', title: 'Kursledare', img: '/founder.png', bio: '' };
  const forWho      = course.forWho      || [];
  const testimonials = course.testimonials || [];
  const courseModules = course.modules   || [];
  const price       = course.price       || 1490;
  const priceTeam   = course.priceTeam   || 'Volymrabatt från 2 licenser';
  const subtitle    = course.subtitle    || course.short_description || '';
  const image       = course.image_url   || course.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85';

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #171f32 0%, #1e2d4a 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-10">

          {/* Brödsmula */}
          <div className="flex items-center gap-2 text-xs mb-6"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Hem</button>
            <ChevronRight size={12} />
            <button onClick={() => navigate('/modules')} className="hover:text-white transition-colors">Utbildningar</button>
            <ChevronRight size={12} />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            {/* Vänster */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: C.orangeL, color: C.orange }}>
                  {course.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {course.title}
                </h1>
                <p className="text-base text-white/70 mb-5 max-w-xl">{subtitle}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill={C.orange} color={C.orange} />
                      ))}
                    </div>
                    <span className="text-sm font-bold" style={{ color: C.orange }}>{course.rating}</span>
                    <span className="text-sm text-white/40">
                      ({(course.reviews || course.students || 0)} {course.reviews ? 'omdömen' : 'deltagare'})
                    </span>
                  </div>
                  {course.students && (
                    <>
                      <span className="text-white/30">·</span>
                      <span className="text-sm text-white/60 flex items-center gap-1.5">
                        <Users size={13} /> {course.students.toLocaleString('sv-SE')}
                      </span>
                    </>
                  )}
                  <span className="text-white/30">·</span>
                  <span className="text-sm text-white/60 flex items-center gap-1.5">
                    <Clock size={13} /> {course.duration}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-sm text-white/60 flex items-center gap-1.5">
                    <Award size={13} /> Certifikat
                  </span>
                </div>

                {/* Instruktör */}
                <div className="flex items-center gap-3">
                  <img src={instructor.img} alt={instructor.name}
                    className="w-8 h-8 rounded-full object-cover border-2"
                    style={{ borderColor: C.orange }} />
                  <span className="text-sm text-white/70">{instructor.name}</span>
                </div>
              </motion.div>
            </div>

            {/* Höger – pris + CTA */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl p-5 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
              <div className="mb-4">
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="text-3xl font-black text-white">
                    {price.toLocaleString('sv-SE')} kr
                  </span>
                  <span className="text-sm text-white/40">/licens</span>
                </div>
                <p className="text-xs font-semibold" style={{ color: C.orange }}>{priceTeam}</p>
              </div>
              <CourseCtaButtons slug={course.slug} navigate={navigate} />
              <p className="text-center text-xs mt-3 text-white/30">14 dagars öppet köp</p>
            </motion.div>

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

          {/* Vänster */}
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
                  <div className="rounded-2xl border p-5 space-y-3"
                    style={{ background: C.white, borderColor: C.border }}>
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
            <div id="tab-innehall">
              <Reveal>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-black" style={{ color: C.dark }}>Kursinnehåll</h2>
                  <span className="text-sm" style={{ color: C.muted }}>
                    {courseModules.length} moduler · {course.duration}
                  </span>
                </div>
                {courseModules.length > 0
                  ? <ModuleList modules={courseModules} courseSlug={course.slug} />
                  : (
                    <div className="rounded-2xl border p-8 text-center"
                      style={{ borderColor: C.border, background: C.white }}>
                      <p className="text-sm" style={{ color: C.muted }}>
                        Kursinnehåll publiceras snart.
                      </p>
                    </div>
                  )
                }
              </Reveal>
            </div>

            {/* Instruktör */}
            <div id="tab-instruktor">
              <Reveal>
                <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Instruktör</h2>
                <div className="rounded-2xl border p-6 flex gap-5"
                  style={{ background: C.white, borderColor: C.border }}>
                  <img src={instructor.img} alt={instructor.name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div>
                    <h3 className="font-black text-lg mb-0.5" style={{ color: C.dark }}>
                      {instructor.name}
                    </h3>
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
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={C.orange} color={C.orange} />
                      ))}
                    </div>
                    <span className="font-bold" style={{ color: C.dark }}>{course.rating}</span>
                  </div>
                </div>

                {testimonials.length > 0 ? (
                  <div className="space-y-4">
                    {testimonials.map((t, i) => (
                      <Reveal key={i} delay={i * 0.06}>
                        <div className="rounded-2xl border p-5"
                          style={{ background: C.white, borderColor: C.border }}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: C.orange }}>{t.name[0]}</div>
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
                          <p className="text-sm leading-relaxed" style={{ color: C.mid }}>"{t.text}"</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border p-8 text-center"
                    style={{ borderColor: C.border, background: C.white }}>
                    <p className="text-sm" style={{ color: C.muted }}>Inga omdömen ännu – bli den första!</p>
                  </div>
                )}
              </Reveal>
            </div>

            {/* Boka datum */}
            <div id="tab-datum">
              <Reveal>
                <h2 className="text-2xl font-black mb-2" style={{ color: C.dark }}>Boka uppstartsdatum</h2>
                <p className="text-sm mb-6" style={{ color: C.muted }}>
                  Välj ett datum för dig eller din organisation.
                </p>
                <DatePicker />
              </Reveal>
            </div>

            {/* CTA längre ner */}
            <Reveal>
              <div className="rounded-2xl p-6 border-2"
                style={{ borderColor: C.orange + '30', background: C.orangeL }}>
                <p className="font-black text-xl mb-1" style={{ color: C.dark }}>Redo att börja?</p>
                <p className="text-sm mb-5" style={{ color: C.mid }}>
                  {price.toLocaleString('sv-SE')} kr/licens · Faktura 30 dagar · 14 dagars öppet köp
                </p>
                <CourseCtaButtons slug={course.slug} navigate={navigate} />
              </div>
            </Reveal>

          </div>

          {/* Höger – sticky prisbox */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl border overflow-hidden shadow-lg" style={{ borderColor: C.border }}>
                <div className="px-5 py-4 border-b" style={{ background: C.bg, borderColor: C.border }}>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-3xl font-black" style={{ color: C.dark }}>
                      {price.toLocaleString('sv-SE')} kr
                    </span>
                    <span className="text-sm" style={{ color: C.muted }}>/licens</span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: C.orange }}>{priceTeam}</p>
                </div>
                <div className="p-4 space-y-3" style={{ background: C.white }}>
                  <CourseCtaButtons slug={course.slug} navigate={navigate} />
                  <div className="pt-2 space-y-2">
                    {[
                      [Award,    'Certifikat vid genomförd kurs'],
                      [Clock,    `${course.duration} · Din egen takt`],
                      [Shield,   '14 dagars öppet köp'],
                      [Zap,      'Tillgång direkt efter beställning'],
                      [BookOpen, '365 dagars åtkomst'],
                    ].map(([Icon, text], i) => (
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
                {price.toLocaleString('sv-SE')} kr
              </p>
            </div>
            {isLoggedIn ? (
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