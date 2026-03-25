import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------
// NY KOMPONENT: PROGRESSBAR
// ----------------------------------------------------
const ProgressBar = ({ progress }) => {
  // progress är en siffra mellan 0 och 100
  const progressText = progress === 100 ? 'Färdig' : 'Pågående';
  const progressColor = progress === 100 ? 'bg-green-500' : 'bg-[#FF5421]';
  const textColor = progress === 100 ? 'text-green-500' : 'text-[#FF5421]';
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold uppercase ${textColor}`}>
          {progressText}
        </span>
        <span className={`text-xs font-semibold ${textColor}`}>
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
// ----------------------------------------------------


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

// Modulen tar nu emot 'progress'
const ModuleModal = ({ module, onClose, progress }) => {
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
        className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200"
      >
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
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
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all text-slate-800 shadow-lg hover:scale-110"
          >
            ✕
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">{cardIcon}</span>
              {module.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
            {/* LÄGGER TILL PROGRESS BAR HÄR */}
            <div className="w-full">
                <ProgressBar progress={progress} />
            </div>
            {/* BORTTAGET: StarRating och studenter */}
            
            
          </div>

          {/* BORTTAGET: Skapad av (author/logo-blocket) */}
          {/* Följande block är nu helt borttaget:
            
            {(module.author || module.logo_url) && (
              <div className="mb-6 flex items-center gap-3">
                {module.logo_url && (
                  <img
                    src={module.logo_url}
                    alt={`${module.author || 'Modulägare'} logo`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FF5421]"
                  />
                )}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Skapad av</p>
                  <p className="text-slate-800 font-semibold">{module.author || 'Okänd Upphovsman'}</p>
                </div>
              </div>
            )}
            
          */}

          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3">Om modulen</h3>
            <p className="text-slate-600 leading-relaxed">
              {module.long_description || module.short_description}
            </p>
          </div>

          {module.learningPoints && module.learningPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Vad du kommer lära dig</h3>
              <ul className="space-y-2">
                {module.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6 p-4 bg-slate-50 rounded-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Modulinnehåll</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5421]">{module.lessons}</div>
                <div className="text-sm text-slate-600">Lektioner</div>
              </div>
              {module.videoLessons > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF5421]">{module.videoLessons}</div>
                  <div className="text-sm text-slate-600">Videor</div>
                </div>
              )}
              {module.quizzes > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF5421]">{module.quizzes}</div>
                  <div className="text-sm text-slate-600">Quiz</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF5421]">{module.level}</div>
                <div className="text-sm text-slate-600">Nivå</div>
              </div>
            </div>
          </div>

          {module.component ? (
            <Link
              to={`/module/${module.slug}`}
              className="w-full bg-[#FF5421] hover:bg-[#E04A1D] text-white py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Play size={20} />
              {progress === 100 ? 'Gå igenom igen' : 'Återuppta modulen'}
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-slate-300 text-slate-500 py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
            >
              Kommer snart
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ModuleCard tar nu emot 'progress' som en prop
export default function ModuleCard({ module, delay = 0, progress = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  // progress skickas med till ModuleModal
  const [selectedModule, setSelectedModule] = useState(null); 
  
  const category = module.category || 'ALLA';

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
            // Lade till dynamisk styling för att lyfta fram Prova På-kortet
          className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer 
                ${module.isTrial ? 'shadow-2xl ring-4 ring-[#FF5421]/50 border-transparent' : 'hover:shadow-2xl border border-slate-200 hover:border-[#FF5421]/30'}`
            }
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden">
                
                {/* ---------------------------------------------------- */}
                {/* UPPDATERAD: PROVA PÅ BANDEROLLEN (VÄNSTER HÖRN) */}
                {module.isTrial && (
                    <div 
                        className="absolute top-0 left-0 z-10 w-32 h-32 overflow-hidden pointer-events-none"
                    >
                        <div 
                            // -rotate-45 för vänster hörn
                            className="absolute top-6 -left-8 w-40 transform -rotate-45 text-center text-white font-bold text-sm shadow-md"
                            style={{ backgroundColor: '#FF5421', padding: '3px 0' }} // Din accentfärg
                        >
                            <span className="tracking-wider">PROVA PÅ</span>
                        </div>
                    </div>
                )}
                {/* ---------------------------------------------------- */}

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
                src={module.image_url || `https://source.unsplash.com/1280x720/?${encodeURIComponent(category)}`}
                alt={module.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            )}
                
            {/* BORTTAGEN: Hela Play-knappen och den mörka overlayen som omgav titel/kategori/speltid */}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/10 flex flex-col justify-end p-4">
              {/* BORTTAGEN: Kategori-taggen, som tidigare låg här */}

              {module.level && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow">
                  <span className="text-xs font-semibold text-[#FF5421]">{module.level}</span>
                </div>
              )}
                {/* OBS: Denna level-tagg ligger nu under banderollen om båda är aktiva, vilket är acceptabelt. */}

              {/* BORTTAGEN: Titel-elementet, som flyttats ner under bilden */}
              
              <div className="flex items-center justify-end text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {module.duration}
                </span>
              </div>

            </div>
          </div>

          <div className="p-6">
            {/* FLYTTAD: Titeln från bild-overlay till den vita botten */}
            <h3 className="text-slate-900 font-bold text-xl leading-tight mb-2">
                {/* Lade till Prova På-markering i rubriken */}
                {module.isTrial && <span className="text-green-600 mr-2">PROVA PÅ</span>} 
              {module.title}
            </h3>
            
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              {module.short_description || "Lär dig grunderna och bygg trygghet i din roll."}
            </p>
            
            <ProgressBar progress={progress} />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedModule && (
          <ModuleModal
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
            progress={progress} 
          />
        )}
      </AnimatePresence>
    </>
  );
}