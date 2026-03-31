import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play, Lock, Clock, BookOpen, Search } from 'lucide-react';
import { modulesData, categories } from '../../data/modules2.jsx';

// ── Brand tokens (matchar NaringsklivetLanding) ───────────
const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  dark:    '#1A1A1A',
  mid:     '#4A4A4A',
  muted:   '#8A8A8A',
  bg:      '#FAFAF8',
  bgAlt:   '#F4F2EE',
  bgCard:  '#FFFFFF',
  border:  '#E8E5E0',
  white:   '#FFFFFF',
};

// ── Reveal helper ─────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 20, className = '' }) => {
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

// ── Module card ───────────────────────────────────────────
const ModuleCard = ({ module, index }) => {
  const navigate = useNavigate();
  const hasContent = !!module.component;
  const isFirst = index === 0;

  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        onClick={() => navigate(`/kurs/${module.slug}`)}
        className="rounded-2xl overflow-hidden border group flex flex-col h-full"
        style={{
          borderColor: C.border,
          background: C.bgCard,
          cursor: hasContent ? 'pointer' : 'default',
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={module.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
            alt={module.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${C.dark}cc 0%, transparent 55%)` }} />

          {/* First module badge */}
          {isFirst && (
            <div className="absolute top-0 left-0 right-0 py-2 flex items-center justify-center gap-1.5 text-xs font-bold text-white"
              style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
              ★ PROVA PÅ – GRATIS FÖR ALLA
            </div>
          )}

          {/* Module number */}
          <div className="absolute top-3 left-3" style={{ marginTop: isFirst ? 28 : 0 }}>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: C.orange }}>
              Modul {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Category */}
          {module.category && (
            <div className="absolute top-3 right-3" style={{ marginTop: isFirst ? 28 : 0 }}>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: C.white }}>
                {module.category}
              </span>
            </div>
          )}

          {/* Lock overlay for unavailable */}
          {!hasContent && (
            <div className="absolute inset-0 flex items-end pb-4 pl-4">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.6)' }}>
                <Lock size={11} /> Kommer snart
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-bold text-base leading-snug mb-2" style={{ color: C.dark }}>
            {module.title}
          </h3>
          <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: C.mid }}>
            {module.short_description || module.description || '–'}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: C.muted }}>
            {module.duration && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {module.duration}
              </span>
            )}
            {module.lessons && (
              <span className="flex items-center gap-1">
                <BookOpen size={12} /> {module.lessons} lektioner
              </span>
            )}
          </div>

          {/* CTA */}
          {hasContent ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: C.orange }}>
                {isFirst ? 'Gratis' : 'Ingår i kursen'}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold transition-all
                              group-hover:gap-2.5"
                style={{ color: C.orange }}>
                <Play size={12} className="fill-current" /> Starta
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: C.muted }}>Snart tillgänglig</span>
              <Lock size={14} style={{ color: C.muted }} />
            </div>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────
export default function ModulesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('ALLA');
  const [query, setQuery] = useState('');

  const allCats = ['ALLA', ...categories.filter(c => c !== 'ALLA')];

  const filtered = modulesData.filter(m => {
    const matchCat = selectedCategory === 'ALLA' || m.category === selectedCategory;
    const matchQ   = !query || m.title.toLowerCase().includes(query.toLowerCase()) ||
                     (m.short_description || '').toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const available = filtered.filter(m => !!m.component).length;
  const totalStudents = modulesData.reduce((s, m) => s + (m.students || 0), 0);
  const avgRating = (modulesData.reduce((s, m) => s + (m.rating || 0), 0) / modulesData.length).toFixed(1);

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Nunito', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ background: C.bg }}>
        {/* Warm glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.orangeL} 0%, transparent 70%)`,
            transform: 'translate(30%, -30%)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-opacity hover:opacity-70"
            style={{ color: C.muted }}>
            ← Tillbaka
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: C.orangeL, color: C.orange }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.orange }} />
                Kursbibliotek
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-5"
                style={{ color: C.dark }}>
                Alla<br />
                <span style={{ color: C.orange }}>utbildningar.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-lg leading-relaxed max-w-lg"
                style={{ color: C.mid }}>
                Bläddra bland alla moduler. Första modulen är alltid gratis —
                inga kreditkort, ingen registrering.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="grid grid-cols-3 gap-3">
              {[
                { val: modulesData.length, label: 'Moduler totalt' },
                { val: available,          label: 'Tillgängliga nu' },
                { val: avgRating,          label: 'Snittbetyg' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl px-4 py-5 text-center border"
                  style={{ background: i === 0 ? C.orangeL : C.bgCard,
                    borderColor: i === 0 ? C.orange + '40' : C.border }}>
                  <p className="text-3xl font-black mb-1" style={{ color: i === 0 ? C.orange : C.dark }}>
                    {s.val}
                  </p>
                  <p className="text-xs font-medium" style={{ color: C.muted }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b"
        style={{ background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)',
          borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-shrink-0">
            {allCats.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all"
                style={selectedCategory === cat
                  ? { background: C.orange, color: C.white }
                  : { background: C.bgAlt, color: C.mid, border: `1px solid ${C.border}` }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: C.muted }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Sök modul..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none transition-all"
              style={{ background: C.bgCard, borderColor: C.border, color: C.dark,
                '--tw-ring-color': C.orange }} />
          </div>
        </div>

        {/* Result count */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-2">
          <p className="text-xs" style={{ color: C.muted }}>
            Visar <strong style={{ color: C.dark }}>{filtered.length}</strong> av {modulesData.length} moduler
            {selectedCategory !== 'ALLA' && <> i <strong style={{ color: C.orange }}>{selectedCategory}</strong></>}
          </p>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((module, i) => {
                  const realIndex = modulesData.findIndex(m => m.id === module.id);
                  return <ModuleCard key={module.id} module={module} index={realIndex} />;
                })}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl font-bold mb-2" style={{ color: C.dark }}>Inga moduler hittades</p>
                <p className="text-sm" style={{ color: C.muted }}>Prova en annan kategori eller sökterm</p>
                <button onClick={() => { setSelectedCategory('ALLA'); setQuery(''); }}
                  className="mt-6 px-6 py-3 rounded-xl font-bold text-white text-sm"
                  style={{ background: C.orange }}>
                  Visa alla
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA bottom ───────────────────────────────────── */}
      <section className="py-4 px-4 sm:px-8 pb-16" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="rounded-3xl px-8 sm:px-14 py-12 sm:py-16 relative overflow-hidden"
              style={{ background: C.dark }}>
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${C.orange}25 0%, transparent 65%)`,
                  transform: 'translate(30%,-30%)' }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: C.muted }}>Kom igång idag</p>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
                    Vill du ta hela paketet?
                  </h2>
                  <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Alla {modulesData.length} moduler. Livstidsåtkomst. Certifikat vid avslut.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/purchase/naringsklivet-ai')}
                    className="px-8 py-4 rounded-2xl font-bold text-white"
                    style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}50` }}>
                    Köp hela kursen →
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/seminarier')}
                    className="px-8 py-4 rounded-2xl font-bold"
                    style={{ color: C.white, background: 'rgba(255,255,255,0.08)',
                      border: '1.5px solid rgba(255,255,255,0.18)' }}>
                    Boka föreläsning
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}