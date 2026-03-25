// QuizSection.tsx - Standalone quiz component som kan droppas in i moduler
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, ChevronRight, Clock, Zap, Target, TrendingUp } from 'lucide-react';


export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct?: string;
  correctAnswer?: string; 
  explanation: string;
}

interface QuizEmbedProps {
  questions: QuizQuestion[];
  title?: string;
  subtitle?: string;
  onComplete?: (score: number, maxScore: number, correctAnswers: number) => void;
  onContinue?: () => void;  // ← Lägg till denna
  minPassingScore?: number;
}

export default function QuizEmbed({ 
  questions, 
  title = "Quiz",
  subtitle = "Testa dina kunskaper",
  onComplete,
  onContinue,  // ← LÄGG TILL DENNA!
  minPassingScore = 70
}: QuizEmbedProps) { 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeTaken, setTimeTaken] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set());

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const maxScore = questions.length * 10; // 10 points per question

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (hasSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answer
    });
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswers[currentQuestion.id]) {
      alert('Välj ett svar innan du fortsätter!');
      return;
    }

    const correctAnswer = currentQuestion.correct || currentQuestion.correctAnswer;
    const isCorrect = selectedAnswers[currentQuestion.id] === correctAnswer;
    
    // Update stats
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(max => Math.max(max, newStreak));
        return newStreak;
      });
    } else {
      setIncorrectAnswers(prev => prev + 1);
      setStreak(0);
    }

    // Reveal answer
    setRevealedQuestions(prev => new Set([...prev, currentQuestion.id]));
    setHasSubmitted(true);
  };

  const handleNextQuestion = () => {
  if (isLastQuestion) {
    // Show final results
    const endTime = Date.now();
    setTimeTaken(Math.floor((endTime - startTime) / 1000));
    setShowResults(true);
    
    if (onComplete) {
      const correctAnswer = currentQuestion.correct || currentQuestion.correctAnswer;
      const finalScore = score + (selectedAnswers[currentQuestion.id] === correctAnswer ? 10 : 0);
      const finalCorrect = correctAnswers + (selectedAnswers[currentQuestion.id] === correctAnswer ? 1 : 0);
      onComplete(finalScore, maxScore, finalCorrect);
    }
  } else {
    setCurrentQuestionIndex(prev => prev + 1);
    setHasSubmitted(false);
  }
};

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setStartTime(Date.now());
    setTimeTaken(0);
    setHasSubmitted(false);
    setRevealedQuestions(new Set());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isPassing = percentage >= minPassingScore;

  // Results Screen
  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className={`rounded-2xl p-8 mb-8 text-center bg-gradient-to-br ${
          percentage === 100 ? 'from-green-500 to-emerald-600' :
          percentage >= 90 ? 'from-blue-500 to-cyan-600' :
          isPassing ? 'from-[#FF5421] to-[#FF7851]' :
          'from-slate-500 to-slate-600'
        }`}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {percentage === 100 ? '🎯' : percentage >= 90 ? '🌟' : isPassing ? '✅' : '📚'}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {percentage === 100 ? 'Perfekt resultat!' : 
             percentage >= 90 ? 'Utmärkt arbete!' : 
             isPassing ? 'Bra jobbat!' : 
             'Fortsätt öva!'}
          </h2>
          <p className="text-white/90">
            {percentage === 100 ? 'Du behärskar materialet fullständigt' : 
             percentage >= 90 ? 'Du har en mycket god förståelse' : 
             isPassing ? 'Du har klarat quizet' : 
             'Repetera materialet och försök igen'}
          </p>
        </div>

        {/* Score */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-6 text-center border-2 border-slate-200">
          <div className="text-sm text-slate-600 font-medium mb-2">DIN POÄNG</div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-6xl font-bold text-slate-900">{score}</span>
            <span className="text-3xl text-slate-400">/ {maxScore}</span>
          </div>
          
          <div className="w-full max-w-xs mx-auto mb-3">
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${
                  percentage === 100 ? 'from-green-500 to-emerald-600' :
                  percentage >= 90 ? 'from-blue-500 to-cyan-600' :
                  isPassing ? 'from-[#FF5421] to-[#FF7851]' :
                  'from-slate-500 to-slate-600'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          <div className={`text-3xl font-bold ${
            percentage === 100 ? 'text-green-600' :
            percentage >= 90 ? 'text-blue-600' :
            isPassing ? 'text-[#FF5421]' :
            'text-slate-600'
          }`}>
            {percentage}%
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
            <div className="text-xs text-green-700 font-medium">Rätt</div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
            <div className="text-xs text-red-700 font-medium">Fel</div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{formatTime(timeTaken)}</div>
            <div className="text-xs text-blue-700 font-medium">Tid</div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
            <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{maxStreak}</div>
            <div className="text-xs text-orange-700 font-medium">Streak</div>
          </div>
        </div>

        {/* Performance Message */}
        <div className={`mb-6 p-4 rounded-xl border-2 ${
          isPassing ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
        }`}>
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
                {isPassing ? 'Quiz godkänt!' : 'Nära målet!'}
              </div>
              <div className={`text-sm ${
                isPassing ? 'text-green-700' : 'text-amber-700'
              }`}>
                {isPassing 
                  ? 'Du har nått målen för detta quiz och kan fortsätta.' 
                  : `Du behöver minst ${minPassingScore}% för att klara quizet. Försök igen!`}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border-2 border-slate-200"
          >
            <TrendingUp className="w-5 h-5" />
            Gör om quiz
          </button>

          {onContinue && (
            <button
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-semibold py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Fortsätt kursen
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    );  // ← LÄGG TILL DENNA RAD (stänger return statement)
  }

  // Quiz Question Screen
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-600">{subtitle}</p>
          </div>
          
          {/* Live stats */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] rounded-lg px-4 py-2">
              <span className="text-white font-bold text-lg">{score}</span>
              <span className="text-white/70 text-sm">/{maxScore}</span>
            </div>
            
            {streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-orange-100 border-2 border-orange-300 rounded-lg px-3 py-2 flex items-center gap-2"
              >
                <span className="text-xl">🔥</span>
                <span className="font-bold text-orange-700">{streak}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                const correctAnswer = currentQuestion.correct || currentQuestion.correctAnswer;
                const isCorrect = option === correctAnswer; 
                const isRevealed = revealedQuestions.has(currentQuestion.id);

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={isRevealed}
                    whileHover={!isRevealed ? { scale: 1.02 } : {}}
                    whileTap={!isRevealed ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isRevealed && isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isRevealed && isSelected && !isCorrect
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-[#FF5421] bg-orange-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        isRevealed && isCorrect ? 'text-green-900' :
                        isRevealed && isSelected && !isCorrect ? 'text-red-900' :
                        isSelected ? 'text-[#FF5421]' : 'text-slate-700'
                      }`}>
                        {option}
                      </span>
                      
                      {isRevealed && isCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {isRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation (after revealing) */}
            {revealedQuestions.has(currentQuestion.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Förklaring:</div>
                    <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswers[currentQuestion.id]}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kontrollera svar
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-4 bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {isLastQuestion ? 'Visa resultat' : 'Nästa fråga'} →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
