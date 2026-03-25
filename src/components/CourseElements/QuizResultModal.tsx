// QuestionnaireResultModal.tsx - Professionell resultat-modal för Questionnaire
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Download,
  RotateCcw,
  ArrowLeft,
  Zap
} from 'lucide-react';

interface QuestionnaireResultModalProps {
  isOpen: boolean;
  score: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  maxStreak: number;
  onRedoQuiz: () => void;
  onContinue: () => void;
  moduleTitle?: string;
  showDiploma?: boolean;
  onDownloadDiploma?: () => void;
}

export default function QuestionnaireResultModal({
  isOpen,
  score,
  maxScore,
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  timeTaken,
  maxStreak,
  onRedoQuiz,
  onContinue,
  moduleTitle = 'Quiz',
  showDiploma = false,
  onDownloadDiploma
}: QuestionnaireResultModalProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isPassing = percentage >= 70;
  const isExcellent = percentage >= 90;
  const isPerfect = percentage === 100;

  // Animate score
  useEffect(() => {
    if (isOpen) {
      setShowStats(false);
      let current = 0;
      const increment = score / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
          setTimeout(() => setShowStats(true), 300);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isOpen, score]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    if (isPerfect) return {
      title: 'Perfekt resultat!',
      subtitle: 'Du behärskar materialet fullständigt',
      emoji: '🎯'
    };
    if (isExcellent) return {
      title: 'Utmärkt arbete!',
      subtitle: 'Du har en mycket god förståelse',
      emoji: '🌟'
    };
    if (isPassing) return {
      title: 'Bra jobbat!',
      subtitle: 'Du har klarat modulen',
      emoji: '✅'
    };
    return {
      title: 'Fortsätt öva!',
      subtitle: 'Repetera materialet och försök igen',
      emoji: '📚'
    };
  };

  const result = getResultMessage();

  const getGradeColor = () => {
    if (isPerfect) return 'from-blue-500 to-emerald-600';
    if (isExcellent) return 'from-blue-500 to-cyan-600';
    if (isPassing) return 'from-[#FF5421] to-[#FF7851]';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onContinue()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
          >
            {/* Header with gradient */}
            <div className={`bg-gradient-to-br ${getGradeColor()} p-8 text-white relative overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                {/* Emoji */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4 text-center"
                >
                  {result.emoji}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-center mb-2"
                >
                  {result.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/90 text-center text-lg"
                >
                  {result.subtitle}
                </motion.p>

                {/* Module title */}
                {moduleTitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/70 text-center text-sm mt-2"
                  >
                    {moduleTitle}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Score Display */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="bg-slate-50 rounded-2xl p-8 mb-6 text-center border-2 border-slate-200"
              >
                <div className="text-sm text-slate-600 font-medium mb-2">
                  DIN POÄNG
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <motion.span
                    className="text-6xl font-bold text-slate-900"
                    key={displayScore}
                  >
                    {displayScore}
                  </motion.span>
                  <span className="text-3xl text-slate-400">/ {maxScore}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full max-w-xs mx-auto mb-3">
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getGradeColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Percentage */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className={`text-3xl font-bold ${
                    isPerfect ? 'text-green-600' :
                    isExcellent ? 'text-blue-600' :
                    isPassing ? 'text-[#FF5421]' :
                    'text-slate-600'
                  }`}
                >
                  {percentage}%
                </motion.div>
              </motion.div>

              {/* Stats Grid */}
              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                  >
                    {/* Correct Answers */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                      <div className="text-xs text-green-700 font-medium">Rätt</div>
                    </motion.div>

                    {/* Incorrect Answers */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center"
                    >
                      <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                      <div className="text-xs text-red-700 font-medium">Fel</div>
                    </motion.div>

                    {/* Time Taken */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center"
                    >
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{formatTime(timeTaken)}</div>
                      <div className="text-xs text-blue-700 font-medium">Tid</div>
                    </motion.div>

                    {/* Max Streak */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center"
                    >
                      <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{maxStreak}</div>
                      <div className="text-xs text-orange-700 font-medium">Streak</div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Performance Message */}
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`mb-6 p-4 rounded-xl border-2 ${
                    isPassing 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isPassing ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Target className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className={`font-semibold mb-1 ${
                        isPassing ? 'text-green-900' : 'text-amber-900'
                      }`}>
                        {isPassing ? 'Modul godkänd!' : 'Nära målet!'}
                      </div>
                      <div className={`text-sm ${
                        isPassing ? 'text-green-700' : 'text-amber-700'
                      }`}>
                        {isPassing 
                          ? 'Du har nått målen för denna modul och kan gå vidare.' 
                          : 'Du behöver minst 70% för att klara modulen. Repetera materialet och försök igen!'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Diploma Download (if applicable) */}
              {showDiploma && showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6"
                >
                  <button
                    onClick={onDownloadDiploma}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 font-semibold py-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Award className="w-5 h-5" />
                    Ladda ner ditt diplom
                  </button>
                </motion.div>
              )}

              {/* Action Buttons */}
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <button
                    onClick={onRedoQuiz}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border-2 border-slate-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Gör om quiz
                  </button>

                  <button
                    onClick={onContinue}
                    className={`flex-1 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isPassing
                        ? 'bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white hover:shadow-xl'
                        : 'bg-slate-700 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isPassing ? (
                      <>
                        <TrendingUp className="w-5 h-5" />
                        Fortsätt till nästa
                      </>
                    ) : (
                      <>
                        <ArrowLeft className="w-5 h-5" />
                        Tillbaka
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
