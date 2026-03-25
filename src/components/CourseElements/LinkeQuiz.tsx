import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  AlertCircle, 
  Trophy, 
  Flame,
  ChevronRight,
  BookOpen,
  Clock
} from 'lucide-react';
import QuizResultModal from './QuizResultModal';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  question_order: number;
  options?: any;
  correct_answer?: any;
  explanation?: string;
  points: number;
}

interface CourseQuizProps {
  quizData: {
    id: string;
    title: string;
    slug: string;
    questions: QuizQuestion[];
  };
  onComplete: (score: number, maxScore: number) => void;
  onScoreUpdate?: (score: number, correct: number, incorrect: number) => void;
}

function CourseQuiz({ quizData, onComplete, onScoreUpdate }: CourseQuizProps) {
  const [questions] = useState<QuizQuestion[]>(
    quizData.questions.sort((a, b) => a.question_order - b.question_order)
  );
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [blankInput, setBlankInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [quizStartTime] = useState(Date.now());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  const selectOption = (optionText: string) => {
    if (feedback === null) {
      if (currentQuestion.question_type === 'multiple_choice') {
        setSelectedOptions(prev =>
          prev.includes(optionText)
            ? prev.filter(opt => opt !== optionText)
            : [...prev, optionText]
        );
      } else {
        setSelectedOption(optionText);
      }
    }
  };

  const checkAnswer = useCallback(() => {
    if (feedback !== null || !currentQuestion) return;
    
    let isAnswerCorrect = false;
    const correctAnswer = currentQuestion.correct_answer;

    switch (currentQuestion.question_type) {
      case 'single_choice':
      case 'true_false':
        isAnswerCorrect = selectedOption === correctAnswer;
        break;
      case 'multiple_choice':
        if (Array.isArray(correctAnswer)) {
          isAnswerCorrect = selectedOptions.length === correctAnswer.length &&
            selectedOptions.every(opt => correctAnswer.includes(opt));
        }
        break;
      case 'fill_blank':
        isAnswerCorrect = blankInput.trim().toLowerCase() ===
          (typeof correctAnswer === 'string' ? correctAnswer.trim().toLowerCase() : '');
        break;
    }

    if (isAnswerCorrect) {
      setFeedback('correct');
      setFeedbackMessage('Rätt svar!');
      setIsCorrect(true);
      const newScore = score + currentQuestion.points;
      setScore(newScore);
      const newCorrect = correctAnswers + 1;
      setCorrectAnswers(newCorrect);
      
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      
      if (onScoreUpdate) {
        onScoreUpdate(newScore, newCorrect, incorrectAnswers);
      }
    } else {
      setFeedback('incorrect');
      setFeedbackMessage('Fel svar');
      setIsCorrect(false);
      const newIncorrect = incorrectAnswers + 1;
      setIncorrectAnswers(newIncorrect);
      
      setCurrentStreak(0);
      
      if (onScoreUpdate) {
        onScoreUpdate(score, correctAnswers, newIncorrect);
      }
    }
  }, [currentQuestion, selectedOption, selectedOptions, blankInput, feedback, score, correctAnswers, incorrectAnswers, onScoreUpdate, currentStreak, maxStreak]);

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setFeedback(null);
      setFeedbackMessage('');
      setIsCorrect(false);
      setSelectedOption(null);
      setSelectedOptions([]);
      setBlankInput('');
    } else {
      setShowResultModal(true);
    }
  };

  const progressPercentage = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const checkButtonDisabled = useMemo(() => {
    if (!currentQuestion || feedback !== null) return true;
    
    switch (currentQuestion.question_type) {
      case 'single_choice':
      case 'true_false':
        return selectedOption === null;
      case 'multiple_choice':
        return selectedOptions.length === 0;
      case 'fill_blank':
        return blankInput.trim() === '';
      default:
        return true;
    }
  }, [currentQuestion, feedback, selectedOption, selectedOptions, blankInput]);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Card - LinkedIn Style */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FF5421] rounded flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{quizData.title}</h1>
                <p className="text-sm text-gray-600">{totalQuestions} frågor • {maxScore} poäng totalt</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-1 text-[#FF5421]">
                  <Trophy className="w-4 h-4" />
                  <span className="text-lg font-semibold">{score}</span>
                </div>
                <span className="text-xs text-gray-500">Poäng</span>
              </div>
              {currentStreak > 0 && (
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-orange-500">
                    <Flame className="w-4 h-4" />
                    <span className="text-lg font-semibold">{currentStreak}</span>
                  </div>
                  <span className="text-xs text-gray-500">Streak</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Fråga {currentQuestionIndex + 1} av {totalQuestions}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% slutfört
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF5421]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Question Card - LinkedIn Style */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Question Number Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#FF5421] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{currentQuestionIndex + 1}</span>
              </div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              {currentQuestion.question_text}
            </h3>

            {/* Single Choice / True False */}
            {(currentQuestion.question_type === 'single_choice' || 
              currentQuestion.question_type === 'true_false') && (
              <div className="space-y-3">
                {currentQuestion.options?.choices?.map((option: string, index: number) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = feedback && option === currentQuestion.correct_answer;
                  const isWrongSelected = feedback && option !== currentQuestion.correct_answer && isSelected;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => selectOption(option)}
                      disabled={feedback !== null}
                      whileHover={{ scale: feedback === null ? 1.01 : 1 }}
                      whileTap={{ scale: feedback === null ? 0.99 : 1 }}
                      className={`w-full p-5 text-left rounded-lg border-2 transition-all font-medium flex items-center space-x-3 ${
                        isSelected && !feedback
                          ? 'border-[#FF5421] bg-[#FF5421]/5'
                          : !feedback
                          ? 'border-gray-200 bg-white hover:border-[#FF5421]/50 hover:bg-gray-50'
                          : ''
                      } ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50'
                          : ''
                      } ${
                        isWrongSelected
                          ? 'border-red-500 bg-red-50'
                          : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected && !feedback
                          ? 'border-[#FF5421] bg-[#FF5421]'
                          : isCorrectAnswer
                          ? 'border-green-500 bg-green-500'
                          : isWrongSelected
                          ? 'border-red-500 bg-red-500'
                          : 'border-gray-300'
                      }`}>
                        {(isSelected || isCorrectAnswer || isWrongSelected) && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className={`flex-1 ${
                        isCorrectAnswer
                          ? 'text-green-900'
                          : isWrongSelected
                          ? 'text-red-900'
                          : isSelected
                          ? 'text-gray-900'
                          : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                      {isCorrectAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {isWrongSelected && (
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Multiple Choice */}
            {currentQuestion.question_type === 'multiple_choice' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Välj alla rätta alternativ</span>
                </p>
                {currentQuestion.options?.choices?.map((option: string, index: number) => {
                  const isSelected = selectedOptions.includes(option);
                  const isCorrectAnswer = feedback && Array.isArray(currentQuestion.correct_answer) &&
                    currentQuestion.correct_answer.includes(option);

                  return (
                    <motion.button
                      key={index}
                      onClick={() => selectOption(option)}
                      disabled={feedback !== null}
                      whileHover={{ scale: feedback === null ? 1.01 : 1 }}
                      whileTap={{ scale: feedback === null ? 0.99 : 1 }}
                      className={`w-full p-5 text-left rounded-lg border-2 transition-all font-medium ${
                        isSelected && !feedback
                          ? 'border-[#FF5421] bg-[#FF5421]/5'
                          : !feedback
                          ? 'border-gray-200 bg-white hover:border-[#FF5421]/50 hover:bg-gray-50'
                          : ''
                      } ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50'
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected && !feedback
                            ? 'border-[#FF5421] bg-[#FF5421]'
                            : isCorrectAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {(isSelected || isCorrectAnswer) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className={`flex-1 ${
                          isCorrectAnswer
                            ? 'text-green-900'
                            : isSelected
                            ? 'text-gray-900'
                            : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Fill in the Blank */}
            {currentQuestion.question_type === 'fill_blank' && (
              <div>
                <input
                  type="text"
                  value={blankInput}
                  onChange={(e) => setBlankInput(e.target.value)}
                  disabled={feedback !== null}
                  onKeyUp={(e) => e.key === 'Enter' && !checkButtonDisabled && checkAnswer()}
                  className={`w-full px-6 py-4 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all ${
                    feedback === 'correct'
                      ? 'border-green-500 bg-green-50'
                      : feedback === 'incorrect'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                  }`}
                  placeholder="Skriv ditt svar här..."
                />
              </div>
            )}

            {/* Check Answer Button */}
            {!feedback && (
              <div className="mt-8">
                <motion.button
                  onClick={checkAnswer}
                  disabled={checkButtonDisabled}
                  whileHover={!checkButtonDisabled ? { scale: 1.02 } : {}}
                  whileTap={!checkButtonDisabled ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    checkButtonDisabled
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#FF5421] text-white hover:bg-[#E04A1D] shadow-sm'
                  }`}
                >
                  <span>Kontrollera svar</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Feedback Overlay - Modern LinkedIn Style */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white rounded-lg border-2 flex items-center justify-center z-10 shadow-lg"
                style={{
                  borderColor: isCorrect ? '#10b981' : '#ef4444'
                }}
              >
                <div className="text-center max-w-xl px-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {isCorrect ? (
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.div>

                  <h3 className={`text-3xl font-bold mb-2 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {feedbackMessage}
                  </h3>

                  {isCorrect && (
                    <p className="text-gray-600 mb-6">
                      +{currentQuestion.points} poäng
                    </p>
                  )}

                  {currentQuestion.explanation && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                      <div className="flex items-start space-x-2">
                        <BookOpen className="w-5 h-5 text-[#FF5421] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">Förklaring</p>
                          <p className="text-gray-700 leading-relaxed">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={nextQuestion}
                    className="bg-[#FF5421] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E04A1D] transition-all shadow-sm flex items-center justify-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>
                      {currentQuestionIndex < totalQuestions - 1 ? 'Nästa fråga' : 'Se resultat'}
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Result Modal */}
        {showResultModal && (
          <QuizResultModal
            score={score}
            maxScore={maxScore}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            totalQuestions={totalQuestions}
            timeSpent={Math.floor((Date.now() - quizStartTime) / 1000)}
            maxStreak={maxStreak}
            onClose={() => {
              setShowResultModal(false);
              onComplete(score, maxScore);
            }}
            onRetry={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setCorrectAnswers(0);
              setIncorrectAnswers(0);
              setCurrentStreak(0);
              setMaxStreak(0);
              setFeedback(null);
              setSelectedOption(null);
              setSelectedOptions([]);
              setBlankInput('');
              setShowResultModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CourseQuiz;
