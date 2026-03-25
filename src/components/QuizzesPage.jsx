import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import allQuizzes from "../data/quizzes";

const categoryColors = {
  AI: 'border-sky-500',
  GITHUB: 'border-blue-500',
  HTML: 'border-orange-500',
  JAVASCRIPT: 'border-yellow-500',
  CSS: 'border-blue-400',
  REACT: 'border-cyan-400',
  CSHARP: 'border-purple-600',
  PYTHON: 'border-green-500',
  AZURE: 'border-sky-500',
  ALLA: 'border-gray-300'
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

const getMockRating = (index) => {
  const ratings = [4.8, 4.6, 4.9, 4.5, 4.7, 4.4, 4.3, 4.8, 4.6, 4.9, 4.7, 4.5];
  return ratings[index % ratings.length];
};

const getMockStudents = (index) => {
  const students = [1247, 2341, 3156, 892, 1523, 678, 945, 2103, 1678, 3421, 1890, 756];
  return students[index % students.length];
};

const getMockDescription = (title) => {
  return `Lär dig ${title.toLowerCase()} från grunden. Denna kurs täcker allt från grundläggande koncept till avancerade tekniker. Perfekt för både nybörjare och de som vill förbättra sina färdigheter.`;
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: star * 0.05, type: "spring" }}
          className="relative"
        >
          {star <= Math.floor(rating) ? (
            <span className="text-yellow-400 text-lg">★</span>
          ) : star - 0.5 <= rating ? (
            <span className="relative inline-block">
              <span className="text-gray-300 text-lg">★</span>
              <span className="absolute inset-0 overflow-hidden w-1/2 text-yellow-400 text-lg">★</span>
            </span>
          ) : (
            <span className="text-gray-300 text-lg">★</span>
          )}
        </motion.span>
      ))}
      <span className="ml-1 text-sm font-semibold text-yellow-500">{rating.toFixed(1)}</span>
    </div>
  );
};

// Modal Component
const CourseModal = ({ quiz, rating, students, onClose, index }) => {
  const category = quiz.slug.split('-')[0].toUpperCase();
  const cardIcon = categoryIcons[category] || '📚';
  
  const videoLessonCount = quiz.questions.filter(
    (q) => q.question_type === "videolesson"
  ).length;

  const quizQuestionCount = quiz.questions.filter(
    (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
  ).length;

  const textLessonCount = quiz.questions.filter(
    (q) => q.question_type === "textlesson"
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
      >
        {/* Header med bild */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {quiz.image_url ? (
            <img
              src={quiz.image_url}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all text-gray-800 text-2xl font-bold shadow-lg"
          >
            ×
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">{cardIcon}</span>
              {quiz.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Betyg och studenter */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
            <StarRating rating={rating} />
            <div className="flex items-center gap-2 text-cyan-600">
              <span className="text-2xl">👥</span>
              <span className="font-semibold text-lg">{students.toLocaleString()} studenter</span>
            </div>
          </div>

          {/* Beskrivning */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-600 mb-3">Om kursen</h3>
            <p className="text-gray-700 leading-relaxed">
              {getMockDescription(quiz.title)}
            </p>
          </div>

          {/* Vad du kommer lära dig */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-600 mb-3">Vad du kommer lära dig</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Grundläggande koncept och best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Praktiska exempel och övningar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Verkliga projekt och use cases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Tips och tricks från professionella utvecklare</span>
              </li>
            </ul>
          </div>

          {/* Kursinnehåll */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-purple-600 mb-4">Kursinnehåll</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-2xl font-bold text-purple-600">{quiz.questions.length}</div>
                <div className="text-sm text-gray-600">Totalt steg</div>
              </div>
              
              {videoLessonCount > 0 && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎥</div>
                  <div className="text-2xl font-bold text-cyan-600">{videoLessonCount}</div>
                  <div className="text-sm text-gray-600">Videolektioner</div>
                </div>
              )}

              {quizQuestionCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">❓</div>
                  <div className="text-2xl font-bold text-yellow-600">{quizQuestionCount}</div>
                  <div className="text-sm text-gray-600">Quiz frågor</div>
                </div>
              )}

              {textLessonCount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-green-600">{textLessonCount}</div>
                  <div className="text-sm text-gray-600">Textlektioner</div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Link
              to={`/quizzes/${quiz.slug}`}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 text-center text-lg shadow-lg"
            >
              🚀 Starta kursen direkt
            </Link>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold rounded-lg transition-all text-center"
            >
              Stäng
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Hover Preview Component
const HoverPreview = ({ quiz, rating, students }) => {
  const videoLessonCount = quiz.questions.filter(
    (q) => q.question_type === "videolesson"
  ).length;

  const quizQuestionCount = quiz.questions.filter(
    (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-xl p-6 z-10 flex flex-col justify-between border-2 border-purple-300 shadow-2xl"
    >
      <div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {getMockDescription(quiz.title)}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">📚 Totalt steg:</span>
            <span className="text-gray-900 font-semibold">{quiz.questions.length}</span>
          </div>
          {videoLessonCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🎥 Videos:</span>
              <span className="text-cyan-600 font-semibold">{videoLessonCount}</span>
            </div>
          )}
          {quizQuestionCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">❓ Frågor:</span>
              <span className="text-yellow-600 font-semibold">{quizQuestionCount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs text-gray-600 text-center">
          Klicka för mer info eller:
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm">
            🚀 Starta
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all text-sm border border-gray-300">
            📖 Mer info
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuizzesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [hoveredQuiz, setHoveredQuiz] = useState(null);

  const categories = ["Alla", "AI", "GitHub", "HTML", "JavaScript", "CSS", "React", "Csharp", "Python", "Azure"];

  const filteredQuizzes = selectedCategory === "Alla" 
    ? allQuizzes 
    : allQuizzes.filter((quiz) => quiz.slug.startsWith(selectedCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent text-center"
        >
          Alla Quiz
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 mb-12 text-lg"
        >
          Välj från {allQuizzes.length} olika quizzes och börja din läranderesa idag! 🚀
        </motion.p>

        <div className="md:hidden mb-6 flex justify-center">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all shadow-md"
          >
            {mobileFilterOpen ? "Dölj Filter" : "Visa Filter"} 📂
          </button>
        </div>

        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Kategorier</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setMobileFilterOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz, index) => {
              const category = quiz.slug.split('-')[0].toUpperCase();
              const cardColorClass = categoryColors[category] || categoryColors.ALLA;
              const cardIcon = categoryIcons[category] || '📚';
              
              const videoLessonCount = quiz.questions.filter(
                (q) => q.question_type === "videolesson"
              ).length;

              const quizQuestionCount = quiz.questions.filter(
                (q) => q.question_type !== "videolesson" && q.question_type !== "textlesson"
              ).length;

              const rating = getMockRating(index);
              const students = getMockStudents(index);
              
              return (
                <motion.div
                  key={quiz.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredQuiz(quiz.slug)}
                  onMouseLeave={() => setHoveredQuiz(null)}
                >
                  <div
                    onClick={() => setSelectedQuiz({ quiz, rating, students, index })}
                    className="block h-full cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative h-full p-6 bg-white rounded-xl border-t-4 ${cardColorClass} hover:shadow-xl transition-all shadow-md flex flex-col justify-between`}
                    >
                      <div>
                        {quiz.image_url && (
                          <div className="relative overflow-hidden rounded-lg mb-4 group">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              src={quiz.image_url}
                              alt={quiz.title}
                              className="w-full h-40 object-cover shadow-sm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                        
                        <h3 className="text-2xl font-bold mb-3 flex items-center text-purple-700">
                          <span className="mr-3 text-3xl">{cardIcon}</span>
                          {quiz.title}
                        </h3>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                          <StarRating rating={rating} />
                          <motion.div 
                            className="flex items-center gap-1 text-cyan-600"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-xl">👥</span>
                            <span className="font-semibold">{students.toLocaleString()}</span>
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium border border-purple-200"
                          >
                            📚 {quiz.questions.length} steg
                          </motion.span>
                          
                          {videoLessonCount > 0 && (
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="text-sm px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium border border-cyan-200"
                            >
                              🎥 {videoLessonCount} videos
                            </motion.span>
                          )}

                          {quizQuestionCount > 0 && (
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium border border-yellow-200"
                            >
                              ❓ {quizQuestionCount} frågor
                            </motion.span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${cardColorClass}`}>
                            {category}
                          </span>
                          <motion.span 
                            className="text-white bg-purple-600 hover:bg-purple-700 font-semibold py-2 px-4 rounded-lg transition-all"
                            whileHover={{ x: 5 }}
                          >
                            Visa →
                          </motion.span>
                        </div>
                      </div>

                      {/* Hover Preview - endast desktop */}
                      <AnimatePresence>
                        {hoveredQuiz === quiz.slug && window.innerWidth >= 768 && (
                          <HoverPreview quiz={quiz} rating={rating} students={students} />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-600 text-lg">
                Inga quiz tillgängliga i kategorin "{selectedCategory}" 😔
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedQuiz && (
          <CourseModal
            quiz={selectedQuiz.quiz}
            rating={selectedQuiz.rating}
            students={selectedQuiz.students}
            index={selectedQuiz.index}
            onClose={() => setSelectedQuiz(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizzesPage;