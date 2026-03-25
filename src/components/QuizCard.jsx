import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Play, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import DownloadCourseMaterialButton from './DownloadCourseMaterialButton'; 

const categoryColors = {
  AI: 'from-sky-500 to-sky-600',
  GITHUB: 'from-slate-700 to-slate-800',
  HTML: 'from-orange-500 to-orange-600',
  JAVASCRIPT: 'from-amber-500 to-amber-600',
  CSS: 'from-sky-400 to-sky-500',
  REACT: 'from-cyan-500 to-cyan-600',
  CSHARP: 'from-indigo-600 to-indigo-700',
  PYTHON: 'from-emerald-500 to-emerald-600',
  AZURE: 'from-blue-500 to-blue-600',
  ALLA: 'from-[#FF5421] to-[#E04619]'
};

const categoryIcons = {
  AI: '💻',
  GITHUB: '🐙',
  HTML: '📄',
  JAVASCRIPT: '💡',
  CSS: '🎨',
  REACT: '⚛️',
  CSHARP: '💻',
  PYTHON: '🐍',
  AZURE: '☁️',
};

const StarRating = ({ rating, size = "default" }) => {
  const starSize = size === "small" ? "text-sm" : "text-lg";
  const textSize = size === "small" ? "text-xs" : "text-sm";
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="relative">
          {star <= Math.floor(rating) ? (
            <span className={`text-amber-400 ${starSize}`}>★</span>
          ) : star - 0.5 <= rating ? (
            <span className="relative inline-block">
              <span className={`text-slate-300 ${starSize}`}>★</span>
              <span className={`absolute inset-0 overflow-hidden w-1/2 text-amber-400 ${starSize}`}>★</span>
            </span>
          ) : (
            <span className={`text-slate-300 ${starSize}`}>★</span>
          )}
        </span>
      ))}
      <span className={`ml-1 font-semibold text-amber-400 ${textSize}`}>{rating.toFixed(1)}</span>
    </div>
  );
};

const CourseModal = ({ quiz, rating, students, description, duration, onClose }) => {
  const category = quiz.slug?.split('-')[0]?.toUpperCase() || 'ALLA';
  const cardIcon = categoryIcons[category] || '📚';
  const gradientClass = categoryColors[category] || categoryColors.ALLA;
  
  const videoLessonCount = quiz.questions?.filter(
    (q) => q.question_type === "videolesson"
  ).length || 0;

  const quizQuestionCount = quiz.questions?.filter(
    (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
  ).length || 0;

  const textLessonCount = quiz.questions?.filter(
    (q) => q.question_type === "textlesson"
  ).length || 0;

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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      >
        {/* Header med bild */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {quiz.image_url ? (
            <img
              src={quiz.image_url}
              alt={quiz.title}
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
            <X size={24} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">{cardIcon}</span>
              {quiz.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Om kursen</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Vad du kommer lära dig</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                <span>Grundläggande koncept och best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                <span>Praktiska exempel och övningar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-1 text-lg">✓</span>
                <span>Verkliga projekt och use cases</span>
              </li>
            </ul>
          </div>

          {quiz.questions && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Kursinnehåll</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quiz.pdf_url ? (
                  <DownloadCourseMaterialButton pdfUrl={quiz.pdf_url} />
                ) : (
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                    <div className="text-3xl mb-2">📚</div>
                    <div className="text-2xl font-bold text-slate-900">{quiz.questions.length}</div>
                    <div className="text-sm text-slate-600">Totalt steg</div>
                  </div>
                )}
                
                {videoLessonCount > 0 && (
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                    <div className="text-3xl mb-2">🎥</div>
                    <div className="text-2xl font-bold text-[#FF5421]">{videoLessonCount}</div>
                    <div className="text-sm text-slate-600">Videolektioner</div>
                  </div>
                )}

                {quizQuestionCount > 0 && (
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                    <div className="text-3xl mb-2">❓</div>
                    <div className="text-2xl font-bold text-[#FF5421]">{quizQuestionCount}</div>
                    <div className="text-sm text-slate-600">Quiz frågor</div>
                  </div>
                )}

                {textLessonCount > 0 && (
                  <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                    <div className="text-3xl mb-2">📝</div>
                    <div className="text-2xl font-bold text-[#FF5421]">{textLessonCount}</div>
                    <div className="text-sm text-slate-600">Textlektioner</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Link
              to={`/quizzes/${quiz.slug}`}
              className="flex-1 bg-gradient-to-r from-[#FF5421] to-[#E04619] hover:from-[#E04619] hover:to-[#FF5421] text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-center text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Starta kursen direkt
            </Link>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
            >
              Stäng
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// MAIN QUIZCARD COMPONENT
export default function QuizCard({ 
  quiz, 
  index = 0, 
  delay = 0,
  rating = 4.5,
  students = 1200,
  description = null,
  duration = "2h 30min",
  variant = "grid"
}) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const category = quiz.slug?.split('-')[0]?.toUpperCase() || 'ALLA';
  const gradientClass = categoryColors[category] || categoryColors.ALLA;
  
  const finalDescription = description || `Lär dig ${quiz.title.toLowerCase()} från grunden. Denna kurs täcker allt från grundläggande koncept till avancerade tekniker. Perfekt för både nybörjare och de som vill förbättra sina färdigheter.`;

  // CAROUSEL VARIANT
  if (variant === "carousel") {
    return (
      <>
        <motion.article
          onClick={() => setSelectedQuiz({ quiz, rating, students, description: finalDescription, duration })}
          whileHover={{ scale: 1.05 }}
          className="snap-start rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-2xl group relative"
        >
          <div className="w-full h-48 sm:h-56 overflow-hidden relative">
            <img
              src={quiz.image_url || `https://source.unsplash.com/400x300/?${encodeURIComponent(quiz.category || "learning")}`}
              alt={quiz.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {quiz.title}
              </h3>
              
              <div className="flex items-center justify-between">
                <StarRating rating={rating} size="small" />
                <span className="text-white/90 text-sm font-medium flex items-center gap-1">
                  <Clock size={14} />
                  {duration}
                </span>
              </div>
            </div>

            <div className="absolute top-3 left-3">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-white text-slate-900`}>
                {category}
              </span>
            </div>
          </div>
        </motion.article>

        <AnimatePresence>
          {selectedQuiz && (
            <CourseModal
              quiz={selectedQuiz.quiz}
              rating={selectedQuiz.rating}
              students={selectedQuiz.students}
              description={selectedQuiz.description}
              duration={selectedQuiz.duration}
              onClose={() => setSelectedQuiz(null)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // GRID VARIANT - Ljus stil matchande "Styrelsekörkortet"
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: delay,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.div
          onClick={() =>
            setSelectedQuiz({
              quiz,
              rating,
              students,
              description: finalDescription,
              duration,
            })
          }
          whileHover={{ y: -5 }}
          className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-slate-200 group"
        >
          {/* Bildsektion */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={
                quiz.image_url ||
                `https://source.unsplash.com/400x300/?${encodeURIComponent(
                  quiz.category || "learning"
                )}`
              }
              alt={quiz.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

            {/* Badge: Dag X–Y */}
            {quiz.dayRange && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow">
                {quiz.dayRange}
              </div>
            )}

            {/* Titel på bild */}
            <div className="absolute bottom-3 left-3 right-3">
              
            </div>
          </div>

          {/* Textsektion */}
          <div className="p-6">
            <h3 className="text-black font-bold text-lg leading-tight">
                {quiz.title}
              </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {quiz.short_description ||
                "Lär dig grunderna och bygg trygghet i din roll."}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // NYA KLASSER: Liten, rund, centrerad och flyttad till höger:
              className="w-12 h-12 rounded-lg bg-[#FF5421] text-white transition-all shadow-lg flex items-center justify-center mt-4" 
            >
              <Play size={20} fill="white" className="ml-[2px]" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedQuiz && (
          <CourseModal
            quiz={selectedQuiz.quiz}
            rating={selectedQuiz.rating}
            students={selectedQuiz.students}
            description={selectedQuiz.description}
            duration={selectedQuiz.duration}
            onClose={() => setSelectedQuiz(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// DEMO - Ta bort detta i produktion
function Demo() {
  const demoQuizzes = [
    {
      id: '1',
      title: 'Diskriminering',
      slug: 'html-diskriminering',
      image_url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
      dayRange: 'Dag 1-7',
      short_description: 'Lär dig om diskrimineringslagen och hur den påverkar styrelsearbetet.',
      category: 'Juridik',
      questions: Array(15).fill({ question_type: 'single_choice' })
    },
    {
      id: '2',
      title: 'Föreningens intressenter',
      slug: 'javascript-intressenter',
      image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      dayRange: 'Dag 8-21',
      short_description: 'Förstå alla aktörer och deras roller i bostadsrättsföreningen.',
      category: 'Ekonomi',
      questions: Array(20).fill({ question_type: 'single_choice' })
    },
    {
      id: '3',
      title: 'Likhetsprincipen',
      slug: 'react-likhetsprincipen',
      image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
      dayRange: 'Dag 22-42',
      short_description: 'Lär dig hur likhetsprincipen ska tillämpas i praktiken.',
      category: 'Juridik',
      questions: Array(18).fill({ question_type: 'single_choice' })
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          <span className="text-[#FF5421]">Våra</span> Kurser
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoQuizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              index={index}
              delay={index * 0.1}
              rating={4.8}
              students={1247}
              duration="2h 30min"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Exportera Demo för förhandsvisning
export { Demo };