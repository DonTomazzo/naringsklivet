import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColors = {
  HTML: 'from-orange-500 to-orange-600',
  CSS: 'from-sky-400 to-sky-500',
  JAVASCRIPT: 'from-amber-500 to-amber-600',
  REACT: 'from-cyan-500 to-cyan-600',
  PYTHON: 'from-emerald-500 to-emerald-600',
  ALLA: 'from-[#FF5421] to-[#E04619]'
};

const categoryIcons = {
  HTML: '📄',
  CSS: '🎨',
  JAVASCRIPT: '💡',
  REACT: '⚛️',
  PYTHON: '🐍',
};

export const ModuleModal = ({ module, onClose }) => {
  const cardIcon = categoryIcons[module.category] || '📚';
  const gradientClass = categoryColors[module.category] || categoryColors.ALLA;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl border border-slate-200"
      >
        {/* Bild/video-header */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
          {module.previewVideoUrl ? (
            <iframe
              title={`${module.title} preview`}
              src={`${module.previewVideoUrl}?autoplay=0&controls=1`}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          ) : module.image_url ? (
            <img
              src={module.image_url}
              alt={module.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradientClass}`} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all text-slate-800 shadow-lg hover:scale-110"
          >
            ✕
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 leading-snug">
              <span className="text-3xl sm:text-4xl">{cardIcon}</span>
              {module.title}
            </h2>
          </div>
        </div>

        {/* Innehåll */}
        <div className="p-5 sm:p-8">

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {module.category && (
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: '#FF5421' }}>
                {module.category}
              </span>
            )}
            {module.level && (
              <span className="text-xs font-medium px-3 py-1 rounded-full border border-slate-200 text-slate-600">
                {module.level}
              </span>
            )}
          </div>

          {/* Beskrivning */}
          <div className="mb-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Om modulen</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {module.long_description || module.short_description || 'Mer information om denna modul kommer snart.'}
            </p>
          </div>

          {/* Lärandemål */}
          {module.learningPoints && module.learningPoints.length > 0 && (
            <div className="mb-5">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">Vad du kommer lära dig</h3>
              <ul className="space-y-2">
                {module.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#FF5421' }}>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modulinnehåll */}
          <div className="mb-6 p-4 bg-slate-50 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Modulinnehåll</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {module.lessons && (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: '#FF5421' }}>{module.lessons}</div>
                  <div className="text-xs text-slate-500">Lektioner</div>
                </div>
              )}
              {module.videoLessons > 0 && (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: '#FF5421' }}>{module.videoLessons}</div>
                  <div className="text-xs text-slate-500">Videor</div>
                </div>
              )}
              {module.quizzes > 0 && (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: '#FF5421' }}>{module.quizzes}</div>
                  <div className="text-xs text-slate-500">Quiz</div>
                </div>
              )}
              {module.level && (
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold" style={{ color: '#FF5421' }}>{module.level}</div>
                  <div className="text-xs text-slate-500">Nivå</div>
                </div>
              )}
            </div>
          </div>

          {/* CTA-knapp */}
          {module.component ? (
            <Link
              to={`/module/${module.slug}`}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            >
              <Play size={18} />
              Starta modulen nu
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-slate-200 text-slate-400 py-4 rounded-xl font-bold text-base cursor-not-allowed"
            >
              Kommer snart
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ModuleCard({ module, index = 0, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const isFirst = index === 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="group"
      >
        <div
          onClick={() => setSelectedModule(module)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* PROVA PÅ-banner för modul 1 */}
          {isFirst && (
            <div
              className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-1.5 py-2 text-xs font-bold tracking-wider text-white"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            >
              ★ PROVA PÅ – GRATIS FÖR ALLA
            </div>
          )}

          {/* Bild med overlay */}
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            {module.previewVideoUrl && isHovered ? (
              <iframe
                title={`${module.title} preview`}
                src={`${module.previewVideoUrl}?autoplay=1&mute=1&controls=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={module.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'}
                alt={module.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors duration-300" />

            {/* Text ovanpå */}
            <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-5 ${isFirst ? 'pt-10' : ''}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#FF5421' }}
                >
                  Modul {String(index + 1).padStart(2, '0')}
                </span>
                {module.category && (
                  <span className="text-xs text-white/60 font-medium">{module.category}</span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                {module.title}
              </h3>
            </div>

            {/* Play-ikon om previewvideo finns */}
            {module.previewVideoUrl && !isHovered && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={20} className="text-white" fill="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedModule && (
          <ModuleModal
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}