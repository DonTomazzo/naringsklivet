import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionnaireResultModal from './QuestionnaireResultModal';

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'order_sequence';
  options?: string[];
  correctAnswer: string | string[] | boolean;
  explanation?: string;
  points: number;
}

export interface QuestionnaireResult {
  score: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  maxStreak: number;
}

interface QuestionnaireProps {
  questions: QuestionnaireQuestion[];
  moduleTitle: string;
  onComplete: (result: QuestionnaireResult) => void;
  onUpdateStats?: (stats: {
    score: number;
    maxScore: number;
    streak: number;
    correctAnswers: number;
    incorrectAnswers: number;
    currentQuestion: number;
    totalQuestions: number;
  }) => void;
  showDiploma?: boolean;
  onDownloadDiploma?: () => void;
}

export default function Questionnaire({ 
  questions, 
  moduleTitle, 
  onComplete,
  onUpdateStats,
  showDiploma = false,
  onDownloadDiploma
}: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [blankInput, setBlankInput] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [quizResult, setQuizResult] = useState<QuestionnaireResult | null>(null);
  
  // Order sequence state
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  // Initialize order sequence
  useEffect(() => {
    if (currentQuestion?.type === 'order_sequence' && Array.isArray(currentQuestion.correctAnswer)) {
      const shuffled = [...currentQuestion.correctAnswer].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
    }
  }, [currentQuestionIndex, currentQuestion]);

  // Update parent stats
  useEffect(() => {
    if (onUpdateStats) {
      onUpdateStats({
        score,
        maxScore,
        streak,
        correctAnswers,
        incorrectAnswers,
        currentQuestion: currentQuestionIndex + 1,
        totalQuestions: questions.length
      });
    }
  }, [score, streak, correctAnswers, incorrectAnswers, currentQuestionIndex, onUpdateStats, maxScore, questions.length]);

  const checkAnswer = () => {
    let correct = false;
    const currentAnswer = currentQuestion.correctAnswer;

    // Check based on question type
    if (currentQuestion.type === 'multiple_choice') {
      correct = selectedAnswer === currentAnswer;
    } else if (currentQuestion.type === 'true_false') {
      correct = selectedAnswer === String(currentAnswer);
    } else if (currentQuestion.type === 'fill_blank') {
      correct = blankInput.trim().toLowerCase() === String(currentAnswer).toLowerCase();
    } else if (currentQuestion.type === 'order_sequence') {
      correct = JSON.stringify(selectedWords) === JSON.stringify(currentAnswer);
    }

    setIsCorrect(correct);
    setFeedback(correct ? '✅ Rätt svar!' : '❌ Fel svar');

    if (correct) {
      setScore(prev => prev + currentQuestion.points);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setIncorrectAnswers(prev => prev + 1);
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSelectedAnswers([]);
      setBlankInput('');
      setFeedback(null);
      setIsCorrect(false);
    } else {
      // Quiz complete - prepare result and show modal
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const result: QuestionnaireResult = {
        score,
        maxScore,
        correctAnswers,
        incorrectAnswers,
        totalQuestions: questions.length,
        timeTaken,
        maxStreak
      };
      setQuizResult(result);
      setShowResultModal(true);
    }
  };

  const handleResultModalContinue = () => {
    setShowResultModal(false);
    if (quizResult) {
      onComplete(quizResult);
    }
  };

  const handleRedoQuiz = () => {
    setShowResultModal(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setBlankInput('');
    setFeedback(null);
    setIsCorrect(false);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setStreak(0);
    setMaxStreak(0);
  };

  const addWord = (word: string, index: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    const word = selectedWords[index];
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
  };

  const checkButtonDisabled = 
    (currentQuestion.type === 'multiple_choice' && !selectedAnswer) ||
    (currentQuestion.type === 'true_false' && !selectedAnswer) ||
    (currentQuestion.type === 'fill_blank' && !blankInput.trim()) ||
    (currentQuestion.type === 'order_sequence' && selectedWords.length === 0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Fråga {currentQuestionIndex + 1} av {questions.length}
          </span>
          <span className="text-sm font-medium text-[#FF5421]">
            {score} / {maxScore} poäng
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF5421] to-[#FF7851]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        {/* Question Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#FF5421] text-white text-xs font-bold px-3 py-1 rounded-full">
              {currentQuestion.points} poäng
            </span>
            {streak > 2 && (
              <span className="flex items-center gap-1 text-sm font-medium text-orange-600">
                <span>🔥</span>
                {streak} i rad!
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Multiple Choice */}
        {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => !feedback && setSelectedAnswer(option)}
                disabled={feedback !== null}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                  selectedAnswer === option
                    ? feedback
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-700'
                        : option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500 text-green-700'
                          : 'bg-red-100 border-2 border-red-500 text-red-700'
                      : 'bg-[#FF5421] text-white border-2 border-[#FF5421]'
                    : feedback && option === currentQuestion.correctAnswer
                      ? 'bg-green-100 border-2 border-green-500 text-green-700'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
                whileHover={!feedback ? { scale: 1.02 } : {}}
                whileTap={!feedback ? { scale: 0.98 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}

        {/* True/False */}
        {currentQuestion.type === 'true_false' && (
          <div className="flex gap-4">
            {['true', 'false'].map((option) => (
              <motion.button
                key={option}
                onClick={() => !feedback && setSelectedAnswer(option)}
                disabled={feedback !== null}
                className={`flex-1 p-6 rounded-xl font-bold text-lg transition-all ${
                  selectedAnswer === option
                    ? feedback
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-700'
                        : 'bg-red-100 border-2 border-red-500 text-red-700'
                      : 'bg-[#FF5421] text-white border-2 border-[#FF5421]'
                    : 'bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                whileHover={!feedback ? { scale: 1.05 } : {}}
                whileTap={!feedback ? { scale: 0.95 } : {}}
              >
                {option === 'true' ? 'Sant' : 'Falskt'}
              </motion.button>
            ))}
          </div>
        )}

        {/* Fill in the Blank */}
        {currentQuestion.type === 'fill_blank' && (
          <div>
            <input
              type="text"
              value={blankInput}
              onChange={(e) => setBlankInput(e.target.value)}
              disabled={feedback !== null}
              placeholder="Skriv ditt svar här..."
              className={`w-full p-4 border-2 rounded-xl text-lg ${
                feedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-slate-300 focus:border-[#FF5421] focus:ring-2 focus:ring-[#FF5421]/20'
              }`}
            />
            {feedback && !isCorrect && (
              <p className="mt-2 text-sm text-green-600">
                Rätt svar: <span className="font-bold">{String(currentQuestion.correctAnswer)}</span>
              </p>
            )}
          </div>
        )}

        {/* Order Sequence */}
        {currentQuestion.type === 'order_sequence' && (
          <div className="space-y-4">
            {/* Selected words */}
            <div className="bg-slate-50 p-4 border-2 border-slate-200 rounded-xl min-h-[100px]">
              <p className="text-sm font-medium text-slate-600 mb-2">Din sekvens:</p>
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((word, index) => (
                  <motion.button
                    key={`selected-${index}`}
                    onClick={() => !feedback && removeWord(index)}
                    disabled={feedback !== null}
                    className={`px-4 py-2 rounded-full font-medium ${
                      feedback
                        ? isCorrect || (Array.isArray(currentQuestion.correctAnswer) && word === currentQuestion.correctAnswer[index])
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-[#FF5421] text-white hover:bg-[#E04A1D]'
                    }`}
                    whileHover={!feedback ? { scale: 1.05 } : {}}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
              {feedback && !isCorrect && Array.isArray(currentQuestion.correctAnswer) && (
                <p className="mt-4 text-sm text-green-600">
                  Rätt ordning: <span className="font-bold">{currentQuestion.correctAnswer.join(' → ')}</span>
                </p>
              )}
            </div>

            {/* Available words */}
            <div className="bg-slate-100 p-4 border-2 border-slate-200 rounded-xl">
              <p className="text-sm font-medium text-slate-600 mb-2">Tillgängliga ord:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <motion.button
                    key={`available-${index}`}
                    onClick={() => !feedback && addWord(word, index)}
                    disabled={feedback !== null}
                    className="px-4 py-2 rounded-full font-medium bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                    whileHover={!feedback ? { scale: 1.05 } : {}}
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm ${
                isCorrect ? 'bg-green-500/90' : 'bg-red-500/90'
              }`}
            >
              <h4 className="text-4xl font-bold text-white mb-4">
                {feedback}
              </h4>
              {currentQuestion.explanation && (
                <p className="text-white/90 text-lg max-w-lg mb-6">
                  {currentQuestion.explanation}
                </p>
              )}
              <motion.button
                onClick={nextQuestion}
                className="px-8 py-3 rounded-full font-semibold bg-white text-slate-800 hover:bg-slate-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Nästa fråga' : 'Slutför'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Check Answer Button */}
        {!feedback && (
          <div className="mt-8 text-center">
            <motion.button
              onClick={checkAnswer}
              disabled={checkButtonDisabled}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                checkButtonDisabled
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white hover:shadow-lg'
              }`}
              whileHover={!checkButtonDisabled ? { scale: 1.05 } : {}}
              whileTap={!checkButtonDisabled ? { scale: 0.95 } : {}}
            >
              Kontrollera svar
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Result Modal */}
      {quizResult && (
        <QuestionnaireResultModal
          isOpen={showResultModal}
          score={quizResult.score}
          maxScore={quizResult.maxScore}
          correctAnswers={quizResult.correctAnswers}
          incorrectAnswers={quizResult.incorrectAnswers}
          totalQuestions={quizResult.totalQuestions}
          timeTaken={quizResult.timeTaken}
          maxStreak={quizResult.maxStreak}
          onRedoQuiz={handleRedoQuiz}
          onContinue={handleResultModalContinue}
          moduleTitle={moduleTitle}
          showDiploma={showDiploma}
          onDownloadDiploma={onDownloadDiploma}
        />
      )}
    </div>
  );
}
