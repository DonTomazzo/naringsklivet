import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BookOpen, Play, ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { modulesData } from '../../data/modules3.jsx'; // ← AI-kursen

const SHOW_COUNT = 6;
const categories = ["Alla", "Verktyg", "Teknik", "Säkerhet", "Praktik"];

const LandingModuleCard = ({ module, index, onClick }) => {
  const isFirst = index === 0;
  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25, delay: index * 0.05 }}
      onClick={() => onClick(module)} className="relative rounded-2xl overflow-hidden group cursor-pointer">
      {isFirst && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2 text-xs font-bold tracking-wider text-white"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
          ★ PROVA PÅ – GRATIS FÖR ALLA
        </div>
      )}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img src={module.image_url || 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80'}
          alt={module.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors duration-300" />
        <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-5 ${isFirst ? 'pt-10' : ''}`}>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-1.5 self-start" style={{ backgroundColor: '#FF5421' }}>
            Modul {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">{module.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const ModuleModal = ({ module, onClose }) => {
  if (!module) return null;
  const realIndex = modulesData.findIndex(m => m.id === module.id);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        {(module.image_url || module.image) && (
          <div className="aspect-video overflow-hidden rounded-t-2xl">
            <img src={module.image_url || module.image} alt={module.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#FF5421' }}>
                Modul {String(realIndex + 1).padStart(2, '0')}
              </span>
              {module.category && (
                <span className="text-xs text-slate-400 font-medium border border-slate-200 px-2 py-1 rounded-full">{module.category}</span>
              )}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 ml-2 transition-colors">
              <X size={16} className="text-gray-600" />
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">{module.title}</h2>
          <div className="flex flex-wrap gap-4 mb-5 text-sm text-slate-500">
            {module.duration && <div className="flex items-center gap-1"><Clock size={14} /><span>{module.duration}</span></div>}
            {module.lessons && <div className="flex items-center gap-1"><BookOpen size={14} /><span>{module.lessons} lektioner</span></div>}
          </div>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
            {module.description || module.short_description || 'Mer information om denna modul kommer snart.'}
          </p>
          {module.topics && module.topics.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Vad du lär dig</h4>
              <ul className="space-y-2">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FF5421' }} />{topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {module.component ? (
            <Link to={`/ai-module/${module.slug}`}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
              <Play size={18} /> Starta modulen nu
            </Link>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white text-base"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
              Kom igång med AI-träningsprogrammet
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Alla moduler modal ───────────────────────────────────
const AllModulesModal = ({ onClose, onSelectModule }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    onClick={onClose}>
    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div>
          <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-0.5">Kursinnehåll</p>
          <h2 className="text-xl font-bold text-slate-900">Alla {modulesData.length} moduler</h2>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <X size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Lista */}
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
              style={{ borderColor: '#e2e8f0', background: i % 2 === 0 ? 'white' : '#F8F7F4' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: hasContent ? 'rgba(255,84,33,0.12)' : '#f1f5f9', color: hasContent ? '#FF5421' : '#94a3b8' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">{module.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{module.category} · {module.duration || '–'}</p>
              </div>
              <div className="flex-shrink-0">
                {hasContent
                  ? <span className="flex items-center gap-1 text-xs font-semibold text-[#FF5421]"><Play size={11} className="fill-current" /> Tillgänglig</span>
                  : <span className="flex items-center gap-1 text-xs text-slate-300"><Lock size={11} /> Snart</span>
                }
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[#FF5421] transition-colors flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <Link to="/purchase/naringsklivet-ai" onClick={onClose}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
          Kom igång med alla moduler →
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Sektion ───────────────────────────────────────────────
const ModulesSection = () => {
  const [activeCategory, setActiveCategory] = useState("Alla");
  const [selectedModule,  setSelectedModule]  = useState(null);
  const [showAllModules,  setShowAllModules]  = useState(false);

  const filtered = activeCategory === "Alla"
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
              style={{ backgroundColor: '#FF5421' }}>KURSMODULER</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-3">
              Lär dig använda AI steg för steg
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              14 praktiska moduler som tar dig från nybörjare till AI-säker –
              direkt applicerbara i din arbetsdag
            </p>
          </motion.div>

          {/* Kategorifiltrer */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {categories.map(cat => {
              const count = cat === "Alla"
                ? modulesData.length
                : modulesData.filter(m => m.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <motion.button key={cat} whileTap={{ scale: 0.96 }} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-lg border font-medium text-sm transition-all duration-200"
                  style={isActive
                    ? { backgroundColor: '#FF5421', borderColor: '#FF5421', color: 'white' }
                    : { backgroundColor: 'white', borderColor: '#e2e8f0', color: '#475569' }}>
                  {cat} <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </motion.button>
              );
            })}
          </div>

          {/* Modulkort */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((module) => {
                const realIndex = modulesData.findIndex(m => m.id === module.id);
                return (
                  <LandingModuleCard
                    key={module.id} module={module}
                    index={realIndex} onClick={setSelectedModule}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllModules(true)}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm border-2 transition-all"
              style={{ borderColor: '#FF5421', color: '#FF5421', background: 'white' }}>
              Se alla {modulesData.length} moduler i programmet
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {selectedModule && <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showAllModules && <AllModulesModal onClose={() => setShowAllModules(false)} onSelectModule={setSelectedModule} />}
      </AnimatePresence>
    </>
  );
};

export default ModulesSection;