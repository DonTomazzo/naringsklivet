import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { HomeworkUploader } from './components/HomeworkUploader';
import { QuizPreview } from './components/QuizPreview';
import { AdaptiveQuizRunner } from './components/AdaptiveQuizRunner';
import { ResultsDashboard } from './components/ResultsDashboard';

/**
 * Inner component som använder Quiz Context
 */
const AdaptiveHomeworkContent: React.FC = () => {
  const { currentAnalysis, activeSession, isGeneratingQuestions } = useQuiz();

  // Visa loader när nya frågor genereras mellan omgångar
  if (isGeneratingQuestions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-2xl max-w-md text-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF5421] mx-auto"></div>
          <h2 className="text-2xl font-bold text-slate-900">
            Förbereder nästa omgång...
          </h2>
          <p className="text-slate-600">
            AI skapar personliga fördjupningsfrågor baserat på dina svar
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-[#FF5421] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Visa ResultsDashboard om sessionen är avslutad
  if (activeSession?.status === 'completed') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <ResultsDashboard />
      </div>
    );
  }

  // Visa QuizRunner om det finns en aktiv session
  if (activeSession?.status === 'in_progress') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <AdaptiveQuizRunner />
      </div>
    );
  }

  // Visa QuizPreview om det finns en analys klar
  if (currentAnalysis) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <QuizPreview />
      </div>
    );
  }

  // Annars visa HomeworkUploader
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <HomeworkUploader />
    </div>
  );
};

/**
 * Main App Component
 */
export const AdaptiveHomeworkApp: React.FC = () => {
  return (
    <QuizProvider>
      <AdaptiveHomeworkContent />
    </QuizProvider>
  );
};

export default AdaptiveHomeworkApp;
