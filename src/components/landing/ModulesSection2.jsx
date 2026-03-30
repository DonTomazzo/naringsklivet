import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, Clock, BookOpen, Play, ChevronRight, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { modulesData } from '../../data/modules2.jsx';

// ── Brand tokens – matchar NaringsklivetLanding ───────────
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
};

const SHOW_COUNT  = 6;
const CATEGORIES  = ['Alla', 'Ekonomi', 'Juridik', 'Teknik', 'Ledarskap'];

// ── Reveal ────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ── Modul-kort på landningssidan ──────────────────────────
const LandingModuleCard = ({ module, index, onClick }) => {
  const isFirst = index === 0;
  const hasContent = !!module.component;

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}
      onClick={() => onClick(module)}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer border flex flex-col"
      style={{ borderColor: C.border, background: C.bgCard }}>

      {/* Prova på-banner */}
      {isFirst && (
        <div className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
          ★ PROVA PÅ – GRATIS FÖR ALLA
        </div>
      )}

      {/* Bild */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={module.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
          alt={module.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${C.dark}aa 0%, transparent 55%)` }} />

        {/* Modul-nummer */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: C.orange }}>
            Modul {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Lås */}
        {!hasContent && (
          <div className="absolute inset-0 flex items-end pb-3 pl-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.45)', color: 'rgba(255,255,255,0.6)' }}>
              <Lock size={10} /> Snart
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-sm leading-snug mb-1.5 line-clamp-2" style={{ color: C.dark }}>
          {module.title}
        </h3>
        <div className="flex items-center gap-3 mt-auto pt-2" style={{ color: C.muted }}>
          {module.duration && (
            <span className="flex items-center gap-1 text-xs">
              <Clock size={11} /> {module.duration}
            </span>
          )}
          {module.lessons && (
            <span className="flex items-center gap-1 text-xs">
              <BookOpen size={11} /> {module.lessons} lekt.
            </span>
          )}
          <div className="ml-auto">
            <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: C.orangeL }}>
              <ChevronRight size={14} style={{ color: C.orange }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Modul-detalj modal ────────────────────────────────────
const ModuleModal = ({ module, onClose }) => {
  if (!module) return null;
  const realIndex = modulesData.findIndex(m => m.id === module.id);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ background: C.bgCard }}
        onClick={e => e.stopPropagation()}>

        {(module.image_url || module.image) && (
          <div className="aspect-video overflow-hidden rounded-t-2xl">
            <img src={module.image_url || module.image} alt={module.title}
              className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: C.orange }}>
                Modul {String(realIndex + 1).padStart(2, '0')}
              </span>
              {module.category && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                  style={{ color: C.muted, borderColor: C.border }}>
                  {module.category}
                </span>
              )}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: C.bgAlt }}>
              <X size={15} style={{ color: C.mid }} />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-snug" style={{ color: C.dark }}>
            {module.title}
          </h2>

          <div className="flex flex-wrap gap-4 mb-5 text-sm" style={{ color: C.muted }}>
            {module.duration && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} /> {module.duration}
              </div>
            )}
            {module.lessons && (
              <div className="flex items-center gap-1.5">
                <BookOpen size={13} /> {module.lessons} lektioner
              </div>
            )}
          </div>

          <p className="leading-relaxed mb-6 text-sm sm:text-base" style={{ color: C.mid }}>
            {module.description || module.short_description || 'Mer information kommer snart.'}
          </p>

          {module.topics && module.topics.length > 0 && (
            <div className="mb-6">
              <p className="font-bold text-xs uppercase tracking-widest mb-3"
                style={{ color: C.muted }}>Vad du lär dig</p>
              <ul className="space-y-2">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.mid }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: C.orange }} />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {module.component ? (
            <Link to={`/module/${module.slug}`}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
              <Play size={17} /> Starta modulen nu
            </Link>
          ) : (
            <button onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white text-base"
              style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
              Kom igång med Styrelsekörkortet
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Alla moduler modal ────────────────────────────────────
const AllModulesModal = ({ onClose, onSelectModule }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    onClick={onClose}>
    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 26, stiffness: 300 }}
      className="rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      style={{ background: C.bgCard }}
      onClick={e => e.stopPropagation()}>

      <div className="px-6 py-5 border-b flex items-center justify-between flex-shrink-0"
        style={{ borderColor: C.border }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: C.orange }}>Kursinnehåll</p>
          <h2 className="text-xl font-bold" style={{ color: C.dark }}>
            Alla {modulesData.length} moduler
          </h2>
        </div>
        <button onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: C.bgAlt }}>
          <X size={15} style={{ color: C.mid }} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-1.5">
        {modulesData.map((module, i) => {
          const hasContent = !!module.component;
          return (
            <motion.button key={module.id}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025 }}
              onClick={() => { onSelectModule(module); onClose(); }}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border
                         transition-all text-left group"
              style={{ borderColor: C.border,
                background: i % 2 === 0 ? C.bgCard : C.bg }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.orange + '40';
                e.currentTarget.style.background = C.orangeL;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.background = i % 2 === 0 ? C.bgCard : C.bg;
              }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{
                  background: hasContent ? C.orangeL : C.bgAlt,
                  color: hasContent ? C.orange : C.muted,
                }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: C.dark }}>{module.title}</p>
                <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                  {module.category} · {module.duration || '–'}
                </p>
              </div>
              <div className="flex-shrink-0">
                {hasContent
                  ? <span className="flex items-center gap-1 text-xs font-semibold"
                      style={{ color: C.orange }}>
                      <Play size={10} className="fill-current" /> Tillgänglig
                    </span>
                  : <span className="flex items-center gap-1 text-xs"
                      style={{ color: C.muted }}>
                      <Lock size={10} /> Snart
                    </span>
                }
              </div>
              <ChevronRight size={14} style={{ color: C.muted }} className="flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t flex-shrink-0" style={{ borderColor: C.border }}>
        <Link to="/purchase/styrelsekorkortet-grund" onClick={onClose}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
          Kom igång med alla moduler →
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

// ── SEKTION ───────────────────────────────────────────────
const ModulesSection2 = () => {
  const [activeCategory, setActiveCategory] = useState('Alla');
  const [selectedModule, setSelectedModule]  = useState(null);
  const [showAllModules, setShowAllModules]   = useState(false);

  const filtered = activeCategory === 'Alla'
    ? modulesData
    : modulesData.filter(m => m.category === activeCategory);

  const visible = filtered.slice(0, SHOW_COUNT);

  return (
    <>
      <section id="modules" className="py-20 sm:py-28" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: C.orange }}>
                Kursmoduler
              </p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight"
                style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                Lär dig steg för steg.
              </h2>
              <p className="text-base mt-3 max-w-lg" style={{ color: C.mid }}>
                Följ vår beprövade process som hjälpt 1 450+ styrelseledamöter
                att bli trygga och kompetenta.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="flex-shrink-0">
              <Link to="/modules"
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border-2 transition-all"
                style={{ borderColor: C.border, color: C.dark, background: C.bgCard }}>
                Se alla <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          {/* Kategorifilter */}
          <Reveal delay={0.08} className="mb-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const count = cat === 'Alla'
                  ? modulesData.length
                  : modulesData.filter(m => m.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <motion.button key={cat} whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all border"
                    style={isActive
                      ? { background: C.orange, borderColor: C.orange, color: '#fff' }
                      : { background: C.bgCard, borderColor: C.border, color: C.mid }}>
                    {cat}
                    <span className="ml-1.5 text-xs opacity-60">({count})</span>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          {/* Grid */}
          <motion.div layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map(module => {
                const realIndex = modulesData.findIndex(m => m.id === module.id);
                return (
                  <LandingModuleCard
                    key={module.id}
                    module={module}
                    index={realIndex}
                    onClick={setSelectedModule}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllModules(true)}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm border-2 transition-all"
              style={{ borderColor: C.orange, color: C.orange, background: C.bgCard }}>
              Se alla {modulesData.length} kursdelar i programmet
              <ChevronRight size={16} />
            </motion.button>
          </Reveal>

        </div>
      </section>

      <AnimatePresence>
        {selectedModule && (
          <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAllModules && (
          <AllModulesModal
            onClose={() => setShowAllModules(false)}
            onSelectModule={setSelectedModule}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ModulesSection2;