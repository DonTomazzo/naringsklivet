import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export interface QuizAttempt {
  questionId: string;
  userAnswer: number;
  correct: boolean;
  timeSpent: number;
  timestamp: Date;
}

export const useAdaptiveQuiz = () => {
  const {
    activeSession,
    currentQuiz,
    setIsGeneratingQuestions,
    setError,
  } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Guard clause - om data saknas
  if (!activeSession || !currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
    return {
      currentQuestion: null,
      currentQuestionIndex: 0,
      totalQuestions: 0,
      isAnswered: false,
      selectedAnswer: null,
      attempts: [],
      submitAnswer: () => {},
      nextQuestion: () => {},
      skipQuestion: () => {},
      getHint: () => '',
      progress: 0,
      isLastQuestion: false,
      currentScore: 0,
    };
  }

  // Reset när ny omgång startar
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAttempts([]);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setStartTime(new Date());
  }, [activeSession?.currentRound]);

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  /**
   * Hanterar när användaren väljer ett svar
   */
  const submitAnswer = (answerIndex: number) => {
    if (!currentQuestion || isAnswered) return;

    const endTime = new Date();
    const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      userAnswer: answerIndex,
      correct: answerIndex === currentQuestion.correctAnswerIndex,
      timeSpent,
      timestamp: new Date(),
    };

    setAttempts([...attempts, attempt]);
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
  };

  /**
   * Går till nästa fråga
   */
  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setStartTime(new Date());
    } else {
      finishRound();
    }
  };

  /**
   * Avslutar nuvarande omgång
   */
  const finishRound = () => {
    // TODO: Implementera omgångslogik när vi lägger till adaptivitet
    console.log('Round finished!', {
      attempts,
      score: calculateScore(attempts),
      round: activeSession.currentRound,
    });
  };

  /**
   * Hoppar över nuvarande fråga
   */
  const skipQuestion = () => {
    const attempt: QuizAttempt = {
      questionId: currentQuestion.id,
      userAnswer: -1,
      correct: false,
      timeSpent: Math.round((new Date().getTime() - startTime.getTime()) / 1000),
      timestamp: new Date(),
    };

    setAttempts([...attempts, attempt]);
    nextQuestion();
  };

  /**
   * Ger en hint för nuvarande fråga
   */
  const getHint = (): string => {
    if (!currentQuestion || !currentQuestion.hint) {
      return '💡 Tips: Tänk noga på frågan';
    }
    return currentQuestion.hint;
  };

  /**
   * Beräknar aktuell poäng
   */
  const calculateScore = (attempts: QuizAttempt[]): number => {
    if (attempts.length === 0) return 0;
    const correct = attempts.filter(a => a.correct).length;
    return Math.round((correct / attempts.length) * 100);
  };

  return {
    // Current state
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: currentQuiz.questions.length,
    isAnswered,
    selectedAnswer,
    attempts,

    // Actions
    submitAnswer,
    nextQuestion,
    skipQuestion,
    getHint,

    // Computed
    progress: ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100,
    isLastQuestion: currentQuestionIndex === currentQuiz.questions.length - 1,
    currentScore: calculateScore(attempts),
  };
};
