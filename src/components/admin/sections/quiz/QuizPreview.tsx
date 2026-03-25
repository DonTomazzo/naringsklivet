import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Target } from 'lucide-react';
import { Quiz, QuizQuestion } from './types';

interface QuizPreviewProps {
  quiz: Quiz;
}

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [singleSelectedOption, setSingleSelectedOption] = useState<string | null>(null);
  const [blankInput, setBlankInput] = useState('');
  const [essayInput, setEssayInput] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [rankingState, setRankingState] = useState<{[key: string]: string[]}>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (currentQuestion?.question_type === 'order_sequence' && currentQuestion.wordBank) {
      setAvailableWords(shuffleArray(currentQuestion.wordBank));
    } else if (currentQuestion?.question_type === 'ranking' && currentQuestion.rankingItems) {
      const initialState: {[key: string]: string[]} = {};
      currentQuestion.rankingCategories?.forEach(cat => {
        initialState[cat] = [];
      });
      initialState['Tillgängliga alternativ'] = [...currentQuestion.rankingItems];
      setRankingState(initialState);
    }
    
    // Reset states for new question
    setSelectedOptions([]);
    setSingleSelectedOption(null);
    setBlankInput('');
    setEssayInput('');
    setSelectedWords([]);
    setFeedback(null);
  }, [currentQuestionIndex, currentQuestion]);

  const addWord = (word: string, index: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const moveRankingItem = (item: string, fromCategory: string, toCategory: string) => {
    setRankingState(prev => {
      const newState = { ...prev };
      newState[fromCategory] = newState[fromCategory].filter(i => i !== item);
      newState[toCategory] = [...(newState[toCategory] || []), item];
      return newState;
    });
  };

  const checkAnswer = useCallback(() => {
    if (!currentQuestion || feedback !== null) return;

    let isCorrect = false;
    
    switch (currentQuestion.question_type) {
      case 'single_choice':
        const correctSingleOption = currentQuestion.options?.find(opt => opt.isCorrect);
        isCorrect = singleSelectedOption === correctSingleOption?.text;
        break;
        
      case 'multiple_choice':
        const correctMultipleOptions = currentQuestion.options?.filter(opt => opt.isCorrect).map(opt => opt.text) || [];
        isCorrect = correctMultipleOptions.length === selectedOptions.length &&
          correctMultipleOptions.every(opt => selectedOptions.includes(opt));
        break;
        
      case 'true_false':
        const correctTFOption = currentQuestion.options?.find(opt => opt.isCorrect);
        isCorrect = singleSelectedOption === correctTFOption?.text;
        break;
        
      case 'fill_blank':
        const userAnswer = blankInput.trim();
        const correctAnswer = currentQuestion.blank_correct_answer?.trim() || '';
        isCorrect = currentQuestion.case_sensitive 
          ? userAnswer === correctAnswer
          : userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        break;
        
      case 'essay':
        // Essays can't be auto-graded
        isCorrect = true; // Always mark as correct for preview
        break;
        
      case 'order_sequence':
        isCorrect = selectedWords.length === currentQuestion.correctOrder?.length &&
          selectedWords.every((word, index) => word === currentQuestion.correctOrder?.[index]);
        break;
        
      case 'ranking':
        // For preview, just check if user has moved items around
        isCorrect = Object.values(rankingState).some(items => items.length > 0) &&
          rankingState['Tillgängliga alternativ']?.length === 0;
        break;
    }

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setScore(prev => prev + 1);
  }, [currentQuestion, singleSelectedOption, selectedOptions, blankInput, essayInput, selectedWords, rankingState, feedback]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setFeedback(null);
  };

  const canCheckAnswer = useMemo(() => {
    if (!currentQuestion || feedback !== null) return false;

    switch (currentQuestion.question_type) {
      case 'single_choice':
      case 'true_false':
        return singleSelectedOption !== null;
      case 'multiple_choice':
        return selectedOptions.length > 0;
      case 'fill_blank':
        return blankInput.trim() !== '';
      case 'essay':
        return essayInput.trim() !== '';
      case 'order_sequence':
        return selectedWords.length > 0;
      case 'ranking':
        return rankingState['Tillgängliga alternativ']?.length === 0;
      default:
        return false;
    }
  }, [currentQuestion, feedback, singleSelectedOption, selectedOptions, blankInput, essayInput, selectedWords, rankingState]);

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Förhandsgranska ditt quiz</h2>
          <p className="text-white/80">Testa hur ditt quiz kommer att se ut för användarna.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
          <Target className="mx-auto mb-4 text-white/40" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Inga frågor att förhandsgranska</h3>
          <p className="text-white/70">Lägg till frågor för att förhandsgranska ditt quiz.</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isSuccessful = percentage >= 60;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl ${
            isSuccessful ? 'bg-green-500' : 'bg-orange-500'
          }`}>
            {isSuccessful ? '🏆' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Quiz avslutat!
          </h3>
          <p className="text-xl text-white/80 mb-6">
            Du fick {score} av {totalQuestions} frågor rätt ({percentage}%)
          </p>
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300"
          >
            Testa igen
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Förhandsgranska: {quiz.title}</h2>
        <p className="text-white/80">Testa hur ditt quiz kommer att se ut för användarna.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-sm">
            Fråga {currentQuestionIndex + 1} av {totalQuestions}
          </span>
          <span className="text-white/70 text-sm">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {currentQuestion.question_text}
        </h3>

        {/* Single Choice / True False */}
        {(currentQuestion.question_type === 'single_choice' || currentQuestion.question_type === 'true_false') && (
          <div className="grid gap-3 md:grid-cols-2">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={option.id}
                onClick={() => setSingleSelectedOption(option.text)}
                disabled={feedback !== null}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  singleSelectedOption === option.text
                    ? 'bg-blue-500/30 border-blue-400 text-white'
                    : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                } ${
                  feedback && option.isCorrect
                    ? 'bg-green-500/30 border-green-400'
                    : ''
                } ${
                  feedback && !option.isCorrect && singleSelectedOption === option.text
                    ? 'bg-red-500/30 border-red-400'
                    : ''
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {/* Multiple Choice */}
        {currentQuestion.question_type === 'multiple_choice' && (
          <div className="grid gap-3 md:grid-cols-2">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  if (selectedOptions.includes(option.text)) {
                    setSelectedOptions(prev => prev.filter(opt => opt !== option.text));
                  } else {
                    setSelectedOptions(prev => [...prev, option.text]);
                  }
                }}
                disabled={feedback !== null}
                className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  selectedOptions.includes(option.text)
                    ? 'bg-blue-500/30 border-blue-400 text-white'
                    : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                } ${
                  feedback && option.isCorrect
                    ? 'bg-green-500/30 border-green-400'
                    : ''
                } ${
                  feedback && !option.isCorrect && selectedOptions.includes(option.text)
                    ? 'bg-red-500/30 border-red-400'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.text)}
                    readOnly
                    className="w-4 h-4"
                  />
                  <span>{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Fill in the blank */}
        {currentQuestion.question_type === 'fill_blank' && (
          <div className="text-center">
            <div className="text-xl text-white mb-4">
              {currentQuestion.question_text.split('_____').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <input
                      type="text"
                      value={blankInput}
                      onChange={(e) => setBlankInput(e.target.value)}
                      disabled={feedback !== null}
                      className={`mx-2 px-4 py-2 text-xl bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg ${
                        feedback === 'correct' ? 'border-green-400 bg-green-500/20' : ''
                      } ${
                        feedback === 'incorrect' ? 'border-red-400 bg-red-500/20' : ''
                      }`}
                      placeholder="?"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Essay */}
        {currentQuestion.question_type === 'essay' && (
          <div>
            <textarea
              value={essayInput}
              onChange={(e) => setEssayInput(e.target.value)}
              disabled={feedback !== null}
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
              placeholder="Skriv ditt svar här..."
            />
          </div>
        )}

        {/* Order Sequence */}
        {currentQuestion.question_type === 'order_sequence' && (
          <div className="space-y-6">
            <div className="min-h-[60px] p-4 bg-white/5 border-2 border-dashed border-white/30 rounded-lg">
              <p className="text-white/70 text-sm mb-2">Ditt svar:</p>
              <div className="flex flex-wrap gap-2">
                {selectedWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => removeWord(index)}
                    disabled={feedback !== null}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {index + 1}. {word}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white/70 text-sm mb-2">Tillgängliga ord:</p>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => addWord(word, index)}
                    disabled={feedback !== null}
                    className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors border border-white/30"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ranking */}
        {currentQuestion.question_type === 'ranking' && (
          <div className="space-y-4">
            {Object.entries(rankingState).map(([category, items]) => (
              <div key={category} className="p-4 bg-white/5 border border-white/20 rounded-lg">
                <h4 className="text-white font-medium mb-2">{category}</h4>
                <div className="min-h-[40px] flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => {
                        if (category !== 'Tillgängliga alternativ') {
                          moveRankingItem(item, category, 'Tillgängliga alternativ');
                        } else {
                          // Move to first available category
                          const firstCategory = currentQuestion.rankingCategories?.[0];
                          if (firstCategory) {
                            moveRankingItem(item, category, firstCategory);
                          }
                        }
                      }}
                      disabled={feedback !== null}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`p-4 rounded-xl mb-6 border backdrop-blur-lg ${
          feedback === 'correct' 
            ? 'border-green-400/50 bg-green-500/10' 
            : 'border-red-400/50 bg-red-500/10'
        }`}>
          <p className={`text-xl font-bold mb-2 ${
            feedback === 'correct' ? 'text-green-300' : 'text-red-300'
          }`}>
            {feedback === 'correct' ? 'Rätt!' : 'Fel svar'}
          </p>
          {currentQuestion.explanation && (
            <p className="text-white/90 mb-4">
              <strong>Förklaring:</strong> {currentQuestion.explanation}
            </p>
          )}
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Nästa fråga' : 'Avsluta quiz'}
          </button>
        </div>
      )}

      {/* Check Answer Button */}
      {!feedback && (
        <div className="text-center">
          <button
            onClick={checkAnswer}
            disabled={!canCheckAnswer}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              !canCheckAnswer
                ? 'bg-gray-500 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
            }`}
          >
            Kontrollera svar
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPreview;