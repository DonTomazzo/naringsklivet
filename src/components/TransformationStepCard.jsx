import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, Play, X } from 'lucide-react';

const CourseModal = ({ quiz, rating, students, description, duration, onClose }) => {
  const videoLessonCount = quiz.questions?.filter(
    (q) => q.question_type === "videolesson"
  ).length || 0;

  const quizQuestionCount = quiz.questions?.filter(
    (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
  ).length || 0;

  const textLessonCount = quiz.questions?.filter(
    (q) => q.question_type === "textlesson"
  ).length || 0;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.floor(rating) ? (
              <span className="text-amber-400 text-lg">★</span>
            ) : star - 0.5 <= rating ? (
              <span className="relative inline-block">
                <span className="text-slate-300 text-lg">★</span>
                <span className="absolute inset-0 overflow-hidden w-1/2 text-amber-400 text-lg">★</span>
              </span>
            ) : (
              <span className="text-slate-300 text-lg">★</span>
            )}
          </span>
        ))}
        <span className="ml-1 font-semibold text-amber-400 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

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
          {quiz.image_url ? (
            <img
              src={quiz.image_url}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF5421] to-[#E04619]" />
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
              <span className="text-5xl">{quiz.icon || '📚'}</span>
              {quiz.title}
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
            <StarRating rating={rating} />
            <div className="flex items-center gap-2 text-[#FF5421]">
              <Users size={20} />
              <span className="font-semibold">{students.toLocaleString()} studenter</span>
            </div>
            {duration && (
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={20} />
                <span className="font-semibold">{duration}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Om kursen</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Vad du kommer lära dig</h3>
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
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Kursinnehåll</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-[#FF5421] transition-colors">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-2xl font-bold text-slate-900">{quiz.questions.length}</div>
                  <div className="text-sm text-slate-600">Totalt steg</div>
                </div>
                
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
            <button
              onClick={() => {
                alert(`Navigera till: /quizzes/${quiz.slug}`);
              }}
              className="flex-1 bg-gradient-to-r from-[#FF5421] to-[#E04619] hover:from-[#E04619] hover:to-[#FF5421] text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-center text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Starta kursen direkt
            </button>
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

// TransformationStepCard - Matchar din exakta design
export default function TransformationStepCard({ 
  quiz,
  rating = 4.5,
  students = 1200,
  description = null,
  duration = "2h 30min"
}) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const finalDescription = description || `Lär dig ${quiz.title.toLowerCase()} från grunden. Denna kurs täcker allt från grundläggande koncept till avancerade tekniker.`;

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedQuiz({ quiz, rating, students, description: finalDescription, duration })}
        className="relative cursor-pointer"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Huvudkort */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          {/* Bildsektion med badge */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={quiz.image_url}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
            
            {/* Day Range Badge - övre vänster */}
            {quiz.dayRange && (
              <div className="absolute top-3 left-3 bg-white text-[#FF5421] text-xs font-bold px-3 py-1.5 rounded-md shadow-md">
                {quiz.dayRange}
              </div>
            )}

            {/* Prick - övre höger */}
            <div className="absolute top-3 right-3 w-12 h-12 bg-[#FF5421] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Innehållssektion */}
          <div className="p-6">
            {/* Ikon */}
            <div className="mb-4">
              <div className="w-14 h-14 bg-[#FF5421] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-2xl">{quiz.icon || '📚'}</span>
              </div>
            </div>

            {/* Titel */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {quiz.title}
            </h3>

            {/* Beskrivning */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {quiz.short_description}
            </p>
          </div>
        </div>

        {/* Hover Info Card */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-amber-400 text-sm">
                      {star <= Math.floor(rating) ? '★' : '☆'}
                    </span>
                  ))}
                  <span className="ml-1 text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-xs">
                  <Users size={12} />
                  <span className="font-medium">{students}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-gray-600 text-xs mb-3">
                <Clock size={12} />
                <span>{duration}</span>
              </div>

              <button
                onClick={() => setSelectedQuiz({ quiz, rating, students, description: finalDescription, duration })}
                className="w-full bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white text-sm font-semibold py-2 px-4 rounded-lg hover:from-[#E04619] hover:to-[#FF5421] transition-all flex items-center justify-center gap-2"
              >
                <Play size={14} />
                Visa mer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
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

// Demo
function Demo() {
  const demoQuizzes = [
    {
      id: '1',
      title: 'Föreningens intressenter',
      slug: 'foreningens-intressenter',
      image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      dayRange: 'Dag 57-70',
      icon: '🛡️',
      short_description: 'Lär dig lagarna och reglerna så du aldrig behöver gissa igen',
      category: 'Ekonomi',
      questions: Array(20).fill({ question_type: 'single_choice' })
    },
    {
      id: '2',
      title: 'Föreningens dokumentation',
      slug: 'foreningens-dokumentation',
      image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
      dayRange: 'Dag 70-91',
      icon: '📈',
      short_description: 'Förstå varje post i budgeten och upptäck besparingspotential',
      category: 'Ekonomi',
      questions: Array(18).fill({ question_type: 'single_choice' })
    },
    {
      id: '3',
      title: 'Likhetsprincipen',
      slug: 'likhetsprincipen',
      image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
      dayRange: 'Dag 22-42',
      icon: '👥',
      short_description: 'Lär dig leda möten och hantera konflikter som en professionell',
      category: 'Juridik',
      questions: Array(15).fill({ question_type: 'single_choice' })
    },
    {
      id: '4',
      title: 'Arbetsgivaransvar',
      slug: 'arbetsgivaransvar',
      image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
      dayRange: 'Dag 43-56',
      icon: '🏆',
      short_description: 'Avancerade tekniker för förhandling, projektstyrning och beslutsfattande',
      category: 'HR',
      questions: Array(22).fill({ question_type: 'single_choice' })
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Din <span className="text-[#FF5421]">Transformation</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {demoQuizzes.map((quiz) => (
            <TransformationStepCard
              key={quiz.id}
              quiz={quiz}
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

export { Demo };