import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import QuestionnaireResultModal from './QuizResultModal';

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
      
      // Uppdatera streak - UTANFÖR onScoreUpdate
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
      
      // Återställ streak - UTANFÖR onScoreUpdate
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
      // Visa resultatmodalen istället
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
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-600">
            Fråga {currentQuestionIndex + 1} av {totalQuestions}
          </span>
          <span className="text-sm text-slate-500">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF5421] to-[#E04A1D] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            {currentQuestion.question_text}
          </h3>

          {/* Single Choice / True False */}
          {(currentQuestion.question_type === 'single_choice' || 
            currentQuestion.question_type === 'true_false') && (
            <div className="space-y-3 max-w-2xl mx-auto">
              {currentQuestion.options?.choices?.map((option: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => selectOption(option)}
                  disabled={feedback !== null}
                  whileHover={{ scale: feedback === null ? 1.02 : 1 }}
                  whileTap={{ scale: feedback === null ? 0.98 : 1 }}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all font-medium ${
  selectedOption === option
    ? 'border-[#FF5421] bg-[#FF5421]/20 text-white'
    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-[#FF5421]/50 hover:bg-slate-700'
                  } ${
                    feedback && option === currentQuestion.correct_answer
                      ? 'border-[#FF5421] bg-orange-50 text-[#FF5421]'
                      : ''
                  } ${
                    feedback && option !== currentQuestion.correct_answer && selectedOption === option
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : ''
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}

          {/* Multiple Choice */}
          {currentQuestion.question_type === 'multiple_choice' && (
            <div className="space-y-3 max-w-2xl mx-auto">
              <p className="text-sm text-slate-400 mb-4">Välj alla rätta alternativ</p>
              {currentQuestion.options?.choices?.map((option: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => selectOption(option)}
                  disabled={feedback !== null}
                  whileHover={{ scale: feedback === null ? 1.02 : 1 }}
                  whileTap={{ scale: feedback === null ? 0.98 : 1 }}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all font-medium ${
  selectedOptions.includes(option)
    ? 'border-[#FF5421] bg-[#FF5421]/20 text-white'
    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-[#FF5421]/50 hover:bg-slate-700'
                  } ${
                    feedback && Array.isArray(currentQuestion.correct_answer) &&
                    currentQuestion.correct_answer.includes(option)
                      ? 'border-blue-500 bg-green-50 text-blue-900'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedOptions.includes(option) ? 'border-[#FF5421] bg-[#FF5421]' : 'border-slate-600'
                    }`}>
                      {selectedOptions.includes(option) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Fill in the Blank */}
          {currentQuestion.question_type === 'fill_blank' && (
            <div className="max-w-lg mx-auto">
              <input
                type="text"
                value={blankInput}
                onChange={(e) => setBlankInput(e.target.value)}
                disabled={feedback !== null}
                onKeyUp={(e) => e.key === 'Enter' && !checkButtonDisabled && checkAnswer()}
                className={`w-full px-6 py-4 text-lg bg-slate-800 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5421] transition-all ${
                  feedback === 'correct' ? 'border-blue-500 bg-blue-50' : ''
                } ${
                  feedback === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-slate-200'
                }`}
                placeholder="Skriv ditt svar här..."
              />
            </div>
          )}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
            >
              <div className="text-center max-w-xl px-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    isCorrect ? 'bg-[#FF5421]' : 'bg-red-500'
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

                <h3 className={`text-2xl font-bold mb-6 ${
                  isCorrect ? 'text-[#FF5421]' : 'text-red-400'
                }`}>
                  {feedbackMessage}
                </h3>

                {currentQuestion.explanation && (
                  <div className="bg-white/10 rounded-xl p-6 mb-8">
                    <p className="text-white/90 leading-relaxed">
                      <span className="font-semibold">Förklaring: </span>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="bg-[#FF5421] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#E04A1D] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestionIndex < totalQuestions - 1 ? 'Nästa fråga' : 'Slutför quiz'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Check Answer Button */}
      {!feedback && (
        <div className="text-center mt-8">
          <motion.button
            onClick={checkAnswer}
            disabled={checkButtonDisabled}
            whileHover={!checkButtonDisabled ? { scale: 1.05 } : {}}
            whileTap={!checkButtonDisabled ? { scale: 0.95 } : {}}
            className={`px-10 py-4 rounded-xl font-semibold transition-all ${
              checkButtonDisabled
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FF5421] to-[#E04A1D] text-white hover:shadow-lg'
            }`}
          >
            Kontrollera svar
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default CourseQuiz;