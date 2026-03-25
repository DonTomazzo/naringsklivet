import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number; // ← Ändrat från correctAnswer
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  hint?: string;
  category?: string;
  topic?: string; // ← Nytt
}

export interface Quiz {
  id: string;
  title: string;
  subject: string; // ← Nytt (används av QuizPreview)
  questions: Question[];
  createdAt: Date;
  imageUrl?: string;
  extractedText?: string; // ← Ändrat från textContent
}

// ← Nytt interface för AI-analys
export interface HomeworkAnalysis {
  extractedText: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestedQuestions: Question[];
  confidence: number;
}

// ← Nytt interface för quiz session
export interface QuizSession {
  id: string;
  quizId: string;
  currentRound: number;
  status: 'in_progress' | 'completed';
  startedAt: Date;
}

export interface QuizAttempt {
  round: number;
  answers: Record<string, number>;
  correctCount: number;
  totalQuestions: number;
  timestamp: Date;
}

interface QuizContextType {
  // ← Nya properties för AI-analys
  currentAnalysis: HomeworkAnalysis | null;
  setCurrentAnalysis: (analysis: HomeworkAnalysis | null) => void;
  
  // ← Nya properties för session
  activeSession: QuizSession | null;
  startNewSession: (quiz: Quiz) => void;
  completeSession: () => void;
  
  // ← Nya loading states
  isAnalyzing: boolean;
  setIsAnalyzing: (loading: boolean) => void;
  isGeneratingQuestions: boolean;
  setIsGeneratingQuestions: (loading: boolean) => void;
  
  // ← Ny error state
  error: string | null;
  setError: (error: string | null) => void;
  
  // Befintliga properties
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz | null) => void;
  attempts: QuizAttempt[];
  addAttempt: (attempt: QuizAttempt) => void;
  currentRound: number;
  setCurrentRound: (round: number) => void;
  wrongQuestions: Set<string>;
  addWrongQuestion: (questionId: string) => void;
  clearWrongQuestions: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ← Nya states
  const [currentAnalysis, setCurrentAnalysis] = useState<HomeworkAnalysis | null>(null);
  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Befintliga states
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [wrongQuestions, setWrongQuestions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ← Nya funktioner
  const startNewSession = (quiz: Quiz) => {
    const session: QuizSession = {
      id: `session-${Date.now()}`,
      quizId: quiz.id,
      currentRound: 1,
      status: 'in_progress',
      startedAt: new Date(),
    };
    setActiveSession(session);
    setCurrentQuiz(quiz);
  };

  const completeSession = () => {
    if (activeSession) {
      setActiveSession({
        ...activeSession,
        status: 'completed',
      });
    }
  };

  // Befintliga funktioner
  const addAttempt = (attempt: QuizAttempt) => {
    setAttempts(prev => [...prev, attempt]);
  };

  const addWrongQuestion = (questionId: string) => {
    setWrongQuestions(prev => new Set(prev).add(questionId));
  };

  const clearWrongQuestions = () => {
    setWrongQuestions(new Set());
  };

  return (
    <QuizContext.Provider
      value={{
        // Nya values
        currentAnalysis,
        setCurrentAnalysis,
        activeSession,
        startNewSession,
        completeSession,
        isAnalyzing,
        setIsAnalyzing,
        isGeneratingQuestions,
        setIsGeneratingQuestions,
        error,
        setError,
        // Befintliga values
        currentQuiz,
        setCurrentQuiz,
        attempts,
        addAttempt,
        currentRound,
        setCurrentRound,
        wrongQuestions,
        addWrongQuestion,
        clearWrongQuestions,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};