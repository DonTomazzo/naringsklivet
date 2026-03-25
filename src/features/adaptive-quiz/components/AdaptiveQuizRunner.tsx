import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useAdaptiveQuiz } from '../hooks/useAdaptiveQuiz';

export const AdaptiveQuizRunner: React.FC = () => {
  const { activeSession, currentQuiz } = useQuiz();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isAnswered,
    selectedAnswer,
    attempts,
    submitAnswer,
    nextQuestion,
    skipQuestion,
    getHint,
    progress,
    isLastQuestion,
    currentScore,
  } = useAdaptiveQuiz();

  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!activeSession || !currentQuiz || !currentQuestion) {
    return null;
  }

  const handleAnswerClick = (answerIndex: number) => {
    if (!isAnswered) {
      submitAnswer(answerIndex);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    nextQuestion();
    setShowHint(false);
    setShowExplanation(false);
  };

  const isCorrect = isAnswered && selectedAnswer === currentQuestion.correctAnswerIndex;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-[#FF5421] to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Omgång {activeSession.currentRound}</h2>
            <p className="text-orange-100">
              {currentQuiz.title}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentScore}%</div>
            <div className="text-sm text-orange-100">Nuvarande poäng</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Fråga {currentQuestionIndex + 1} av {totalQuestions}</span>
            <span>{Math.round(progress)}% klart</span>
          </div>
          <div className="w-full bg-orange-800 bg-opacity-30 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {currentQuestion.topic}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
                {currentQuestion.difficulty}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {currentQuestion.question}
            </h3>
          </div>
        </div>

        {/* Hint Button */}
        {!isAnswered && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-[#FF5421] hover:text-slate-700 font-medium"
          >
            {showHint ? '🔽 Dölj hint' : '💡 Visa hint'}
          </button>
        )}

        {showHint && !isAnswered && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-900">{getHint()}</p>
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswerIndex;
            const shouldHighlight = isAnswered && (isSelected || isCorrectAnswer);

            let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all ';

            if (!isAnswered) {
              buttonClass += 'border-gray-200 hover:border-orange-400 hover:bg-orange-50 cursor-pointer';
            } else if (isCorrectAnswer) {
              buttonClass += 'border-green-500 bg-green-50';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-50';
            } else {
              buttonClass += 'border-gray-200 bg-gray-50 opacity-60';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center gap-3">
                  {/* Icon/Indicator */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2">
                    {!isAnswered && (
                      <span className="font-bold text-gray-600">{String.fromCharCode(65 + index)}</span>
                    )}
                    {isAnswered && isCorrectAnswer && (
                      <span className="text-green-600 text-xl">✓</span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="text-red-600 text-xl">✗</span>
                    )}
                  </div>

                  {/* Answer Text */}
                  <span className="flex-1 font-medium text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className={`rounded-xl p-6 border-2 ${
            isCorrect 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{isCorrect ? '🎉' : '💪'}</span>
              <div className="flex-1">
                <h4 className={`font-bold text-lg mb-2 ${
                  isCorrect ? 'text-green-900' : 'text-red-900'
                }`}>
                  {isCorrect 
                    ? 'Rätt svar! Bra jobbat!' 
                    : 'Inte helt rätt, men bra försök!'}
                </h4>
                
                {showExplanation && currentQuestion.explanation && (
                  <p className={`text-sm ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {!isAnswered && (
          <button
            onClick={skipQuestion}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            ⏭️ Hoppa över
          </button>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#FF5421] to-orange-600 text-white rounded-xl font-bold text-lg hover:from-[#E04A1D] hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
          >
            {isLastQuestion 
              ? '🏁 Avsluta omgång' 
              : '➡️ Nästa fråga'}
          </button>
        )}
      </div>

      {/* Round Info */}
      <div className="bg-gradient-to-r from-orange-50 to-slate-50 rounded-xl p-4 border border-orange-200">
        <p className="text-sm text-slate-700 text-center">
          {activeSession.currentRound === 1 && (
            <>
              <strong>Omgång 1:</strong> Alla frågor. Nästa omgång kommer fokusera på det du hade svårt med.
            </>
          )}
          {activeSession.currentRound === 2 && (
            <>
              <strong>Omgång 2:</strong> Fördjupande frågor på de områden där du hade fel. Fortsätt kämpa!
            </>
          )}
          {activeSession.currentRound === 3 && (
            <>
              <strong>Omgång 3:</strong> Enklare variationer för att befästa kunskapen. Du är nästan i mål!
            </>
          )}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-[#FF5421]">
            {attempts.filter(a => a.correct).length}
          </div>
          <div className="text-sm text-slate-600">Rätt svar</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-slate-600">
            {attempts.filter(a => !a.correct).length}
          </div>
          <div className="text-sm text-slate-600">Fel svar</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-slate-900">
            {totalQuestions - attempts.length}
          </div>
          <div className="text-sm text-slate-600">Kvar</div>
        </div>
      </div>
    </div>
  );
};
