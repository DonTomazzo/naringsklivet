import { useState } from 'react';
import { motion } from 'framer-motion';
import Questionnaire, { QuestionnaireQuestion, QuestionnaireResult } from './Questionnaire';
import ModuleSidebar from './ModuleSidebar';

interface ModuleWithQuestionnaireProps {
  moduleTitle: string;
  moduleContent: React.ReactNode;
  questions?: QuestionnaireQuestion[];
  completedModules: number;
  totalModules: number;
  logoUrl?: string;
  onQuestionnaireComplete?: (result: QuestionnaireResult) => void;
  showDiploma?: boolean;
  onDownloadDiploma?: () => void;
}

export default function ModuleWithQuestionnaire({
  moduleTitle,
  moduleContent,
  questions,
  completedModules,
  totalModules,
  logoUrl,
  onQuestionnaireComplete,
  showDiploma = false,
  onDownloadDiploma
}: ModuleWithQuestionnaireProps) {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireComplete, setQuestionnaireComplete] = useState(false);
  const [quizStats, setQuizStats] = useState({
    score: 0,
    maxScore: 0,
    streak: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentQuestion: 0,
    totalQuestions: 0
  });

  const handleQuestionnaireComplete = (result: QuestionnaireResult) => {
    setQuestionnaireComplete(true);
    setShowQuestionnaire(false);
    if (onQuestionnaireComplete) {
      onQuestionnaireComplete(result);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto">
        <ModuleSidebar
          currentQuizScore={quizStats.score}
          currentQuizMaxScore={quizStats.maxScore}
          correctAnswers={quizStats.correctAnswers}
          incorrectAnswers={quizStats.incorrectAnswers}
          streak={quizStats.streak}
          currentQuestion={quizStats.currentQuestion}
          totalQuestions={quizStats.totalQuestions}
          completedModules={completedModules}
          totalModules={totalModules}
          moduleTitle={moduleTitle}
          logoUrl={logoUrl}
        />
      </div>

      {/* Mobile Stats Bar (syns bara på mobil när quiz körs) */}
      {showQuestionnaire && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] rounded-lg px-3 py-1">
                <span className="text-white font-bold">{quizStats.score}</span>
                <span className="text-white/70 text-sm">/{quizStats.maxScore}</span>
              </div>
              {quizStats.streak > 0 && (
                <div className="flex items-center gap-1">
                  <span>🔥</span>
                  <span className="text-white font-bold">{quizStats.streak}</span>
                </div>
              )}
            </div>
            <div className="text-white text-sm">
              {quizStats.currentQuestion}/{quizStats.totalQuestions}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Module Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {moduleTitle}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span>📚 Modul {completedModules + 1} av {totalModules}</span>
              {questionnaireComplete && <span className="text-green-600 font-semibold">✓ Quiz klarat</span>}
            </div>
          </motion.div>

          {/* Content or Questionnaire */}
          {!showQuestionnaire ? (
            <>
              {/* Module Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              >
                {moduleContent}
              </motion.div>

              {/* Start Questionnaire Button */}
              {questions && questions.length > 0 && !questionnaireComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setShowQuestionnaire(true)}
                    className="px-8 py-4 bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    📝 Starta Quiz ({questions.length} frågor)
                  </button>
                </motion.div>
              )}

              {/* Continue Button (if quiz is complete) */}
              {questionnaireComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="text-green-600 font-bold text-lg">
                    ✓ Quiz klarat!
                  </div>
                  <button
                    onClick={() => setShowQuestionnaire(true)}
                    className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-300 transition-all mr-4"
                  >
                    🔄 Gör om quiz
                  </button>
                  <button
                    className="px-8 py-4 bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Nästa modul →
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* Questionnaire */
            <div className="mt-8 lg:mt-0">
              <button
                onClick={() => setShowQuestionnaire(false)}
                className="mb-6 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-all flex items-center gap-2"
              >
                ← Tillbaka till innehåll
              </button>
              
              {questions && (
                <Questionnaire
                  questions={questions}
                  moduleTitle={moduleTitle}
                  onComplete={handleQuestionnaireComplete}
                  onUpdateStats={setQuizStats}
                  showDiploma={showDiploma}
                  onDownloadDiploma={onDownloadDiploma}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
