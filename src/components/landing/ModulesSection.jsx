// src/components/CourseElements/ModulesSection.jsx
// Hybrid: ModuleModal med utbyggt innehåll (lånat från CoursePage)
// + auth-medveten CTA (inloggad → direkt till modulen, ej inloggad → köp-flöde)

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, BookOpen, Play, ChevronRight, Lock,
  CheckCircle, Award, Shield, Zap, ArrowRight, ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { modulesData } from '../../data/modules2.jsx';

const SHOW_COUNT = 6;
const categories = ['Alla', 'Ekonomi', 'Juridik', 'Teknik', 'Ledarskap'];

// ── Inloggningsstatus (byt mot din auth-state) ────────────
const isLoggedIn = false;

// ── Brand-tokens ──────────────────────────────────────────
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

// ── Kort i grid ───────────────────────────────────────────
const LandingModuleCard = ({ module, index, onClick }) => {
  const isFirst = index === 0;
  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => onClick(module)} className="relative rounded-2xl overflow-hidden group cursor-pointer">
      {isFirst && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2 text-xs font-bold tracking-wider text-white"
          style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
          ★ PROVA PÅ – GRATIS FÖR ALLA
        </div>
      )}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img src={module.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
          alt={module.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors duration-300" />
        <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-5 ${isFirst ? 'pt-10' : ''}`}>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-1.5 self-start"
            style={{ backgroundColor: C.orange }}>
            Modul {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
            {module.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// ── HYBRID-MODAL (lånar struktur från CoursePage) ─────────
const ModuleModal = ({ module, onClose }) => {
  if (!module) return null;

  const realIndex = modulesData.findIndex(m => m.id === module.id);
  const hasContent = !!module.component;
  const isFirst = realIndex === 0;
  const isFree = module.type === 'free' || isFirst;

  // Features som visas i listan (lånat från CoursePage)
  const features = [
    [Clock,    `${module.duration || '—'} · I din egen takt`],
    module.lessons && [BookOpen, `${module.lessons} lektioner`],
    !isFree && [Award,    'Certifikat vid genomförd modul'],
    !isFree && [Zap,      'Tillgång direkt efter köp'],
    !isFree && [Shield,   '14 dagars öppet köp'],
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(15,22,35,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ fontFamily: "'Nunito', sans-serif" }}>

        {/* ── Bild överst med badge-overlay ── */}
        <div className="relative flex-shrink-0">
          <div className="aspect-[16/9] overflow-hidden bg-slate-200">
            <img
              src={module.image_url || module.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
              alt={module.title}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(15,22,35,0.65) 0%, transparent 50%)' }} />
          </div>

          {/* Stäng-knapp */}
          <button onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10">
            <X size={16} style={{ color: C.dark }} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: C.orange }}>
              Modul {String(realIndex + 1).padStart(2, '0')}
            </span>
            {module.category && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)' }}>
                {module.category}
              </span>
            )}
            {isFree && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
                ★ Gratis
              </span>
            )}
          </div>

          {/* Titel på bilden */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
              {module.title}
            </h2>
          </div>
        </div>

        {/* ── Body (scrollbar) ── */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">

          {/* Beskrivning */}
          {(module.description || module.short_description) && (
            <p className="text-sm sm:text-base leading-relaxed mb-5"
              style={{ color: C.mid }}>
              {module.description || module.short_description}
            </p>
          )}

          {/* Vad du lär dig — det viktigaste för en inloggad användare */}
          {module.topics && module.topics.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: C.orange }}>
                Vad du lär dig
              </h3>
              <div className="space-y-2.5">
                {module.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: C.orange }}>
                      <CheckCircle size={11} color="white" />
                    </div>
                    <span className="text-sm" style={{ color: C.mid }}>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features-rad (Clock, BookOpen, Award, ...) */}
          {features.length > 0 && (
            <div className="rounded-xl p-4 mb-2 space-y-2"
              style={{ background: C.bgAlt, border: `1px solid ${C.border}` }}>
              {features.map(([Icon, text], i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Icon size={14} style={{ color: C.orange }} className="flex-shrink-0" />
                  <span className="text-xs" style={{ color: C.mid }}>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer med CTA (auth-medveten) ── */}
        <div className="border-t flex-shrink-0 px-6 sm:px-8 py-5 space-y-2.5"
          style={{ borderColor: C.border, background: C.bg }}>

          {/* CTA-knapp(ar) */}
          {hasContent && (isLoggedIn || isFree) ? (
            // INLOGGAD eller GRATIS-modul: direkt till modulen
            <Link to={`/module/${module.slug}`} onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`,
                boxShadow: `0 4px 16px ${C.orange}40` }}>
              <Play size={16} className="fill-current" />
              {isFree && !isLoggedIn ? 'Starta gratis nu' : 'Starta modulen'}
            </Link>
          ) : !hasContent ? (
            // KOMMER SNART
            <div className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: C.bgAlt, color: C.muted, border: `1px solid ${C.border}` }}>
              <Lock size={14} /> Den här modulen publiceras snart
            </div>
          ) : (
            // EJ INLOGGAD + betalmodul: köp-flöde
            <>
              <Link to="/purchase/styrelsekorkortet" onClick={onClose}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`,
                  boxShadow: `0 4px 16px ${C.orange}40` }}>
                Kom igång med Styrelsekörkortet
                <ArrowRight size={15} />
              </Link>
            </>
          )}

          {/* Diskret länk till full kursinfo — för dem som vill djupdyka */}
          {hasContent && (
            <Link to={`/kurs/${module.slug}`} onClick={onClose}
              className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity"
              style={{ color: C.muted }}>
              Se hela kursinformationen
              <ExternalLink size={11} />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── "Alla moduler"-modal (lista) ──────────────────────────
const AllModulesModal = ({ onClose, onSelectModule }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    style={{ background: 'rgba(15,22,35,0.75)', backdropFilter: 'blur(8px)' }}
    onClick={onClose}>
    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      onClick={e => e.stopPropagation()}
      style={{ fontFamily: "'Nunito', sans-serif" }}>

      <div className="px-6 py-5 border-b flex items-center justify-between flex-shrink-0"
        style={{ borderColor: C.border }}>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>
            Kursinnehåll
          </p>
          <h2 className="text-xl font-bold" style={{ color: C.dark }}>
            Alla {modulesData.length} moduler
          </h2>
        </div>
        <button onClick={onClose}
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <X size={16} style={{ color: C.mid }} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-2">
        {modulesData.map((module, i) => {
          const hasContent = !!module.component;
          return (
            <motion.button key={module.id}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => { onSelectModule(module); onClose(); }}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border
                         hover:border-orange-200 hover:bg-orange-50 group transition-all text-left"
              style={{ borderColor: C.border, background: i % 2 === 0 ? C.white : '#F8F7F4' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: hasContent ? C.orangeL : C.bgAlt,
                  color: hasContent ? C.orange : C.muted }}>
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
                  ? <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: C.orange }}>
                      <Play size={11} className="fill-current" /> Tillgänglig
                    </span>
                  : <span className="flex items-center gap-1 text-xs" style={{ color: '#cbd5e1' }}>
                      <Lock size={11} /> Snart
                    </span>}
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[#FF5421] transition-colors flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t flex-shrink-0" style={{ borderColor: C.border }}>
        <Link to="/purchase/styrelsekorkortet" onClick={onClose}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
          style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}>
          Kom igång med alla moduler →
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

// ── Sektion ───────────────────────────────────────────────
const ModulesSection = () => {
  const [activeCategory, setActiveCategory] = useState('Alla');
  const [selectedModule, setSelectedModule] = useState(null);
  const [showAllModules, setShowAllModules] = useState(false);

  const filtered = activeCategory === 'Alla'
    ? modulesData
    : modulesData.filter(m => m.category === activeCategory);
  const visible = filtered.slice(0, SHOW_COUNT);

  return (
    <>
      <section id="modules" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-block px-4 py-2 text-white rounded-full font-semibold mb-4 text-sm"
              style={{ backgroundColor: C.orange }}>KURSMODULER</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#2C2C2C' }}>
              Lär dig styrelsearbete steg för steg
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Följ vår beprövade process som redan hjälpt 1 450+ styrelseledamöter att bli trygga och kompetenta
            </p>
          </motion.div>

          {/* Kategorier */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {categories.map(cat => {
              const count = cat === 'Alla'
                ? modulesData.length
                : modulesData.filter(m => m.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <motion.button key={cat} whileTap={{ scale: 0.96 }} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-lg border font-medium text-sm transition-all duration-200"
                  style={isActive
                    ? { backgroundColor: C.orange, borderColor: C.orange, color: 'white' }
                    : { backgroundColor: 'white', borderColor: '#e2e8f0', color: '#475569' }}>
                  {cat} <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </motion.button>
              );
            })}
          </div>

          {/* Modul-grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((module) => {
                const realIndex = modulesData.findIndex(m => m.id === module.id);
                return <LandingModuleCard key={module.id} module={module} index={realIndex} onClick={setSelectedModule} />;
              })}
            </AnimatePresence>
          </motion.div>

          {/* CTA — se alla moduler */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllModules(true)}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm border-2 transition-all"
              style={{ borderColor: C.orange, color: C.orange, background: 'white' }}>
              Se alla {modulesData.length} kursdelar i programmet
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>

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

export default ModulesSection;