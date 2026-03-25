import { createContext, useContext, useState, useEffect } from 'react';
import { useTeam } from './MockTeamContext';

const CompletionContext = createContext(null);

export function useCompletion() {
  const context = useContext(CompletionContext);
  if (!context) throw new Error('useCompletion must be used within CompletionProvider');
  return context;
}

export function CompletionProvider({ children }) {
  const { currentUser } = useTeam();
  
  // Ladda från localStorage per användare
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Hämta current user's progress
  const currentProgress = currentUser 
    ? (userProgress[currentUser.id] || { completedModules: [], quizScores: {} })
    : { completedModules: [], quizScores: {} };

  // Spara när det ändras
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const completeModule = (moduleId, quizScore, quizMaxScore) => {
    if (!currentUser) return;

    const passed = (quizScore / quizMaxScore) >= 0.8;
    
    setUserProgress(prev => ({
      ...prev,
      [currentUser.id]: {
        ...prev[currentUser.id],
        completedModules: passed 
          ? [...new Set([...(prev[currentUser.id]?.completedModules || []), moduleId])]
          : (prev[currentUser.id]?.completedModules || []),
        quizScores: {
          ...(prev[currentUser.id]?.quizScores || {}),
          [moduleId]: { 
            score: quizScore, 
            maxScore: quizMaxScore, 
            passed,
            completedAt: new Date().toISOString()
          }
        }
      }
    }));
  };

  const isModuleComplete = (moduleId) => {
    return currentProgress.completedModules.includes(moduleId);
  };

  const getModuleProgress = (moduleId) => {
    return currentProgress.quizScores[moduleId] || null;
  };

  const allModulesComplete = (totalModules = 14) => {
    return currentProgress.completedModules.length >= totalModules;
  };

  const getCompletionPercentage = (totalModules = 14) => {
    return Math.round((currentProgress.completedModules.length / totalModules) * 100);
  };

  const getCompletedCount = () => {
    return currentProgress.completedModules.length;
  };

  return (
    <CompletionContext.Provider value={{
      completedModules: currentProgress.completedModules,
      quizScores: currentProgress.quizScores,
      completeModule,
      isModuleComplete,
      getModuleProgress,
      allModulesComplete,
      getCompletionPercentage,
      getCompletedCount  // ← NY funktion
    }}>
      {children}
    </CompletionContext.Provider>
  );
}