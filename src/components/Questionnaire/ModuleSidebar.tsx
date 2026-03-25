import { motion } from 'framer-motion';
import { Trophy, Award, Target, TrendingUp } from 'lucide-react';

interface ModuleSidebarProps {
  // Current quiz stats
  currentQuizScore?: number;
  currentQuizMaxScore?: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  streak?: number;
  currentQuestion?: number;
  totalQuestions?: number;
  
  // Overall module progress
  completedModules: number;
  totalModules: number;
  moduleTitle: string;
  
  // Optional logo
  logoUrl?: string;
}

export default function ModuleSidebar({
  currentQuizScore = 0,
  currentQuizMaxScore = 0,
  correctAnswers = 0,
  incorrectAnswers = 0,
  streak = 0,
  currentQuestion = 0,
  totalQuestions = 0,
  completedModules,
  totalModules,
  moduleTitle,
  logoUrl
}: ModuleSidebarProps) {
  const percentage = currentQuizMaxScore > 0 ? (currentQuizScore / currentQuizMaxScore) * 100 : 0;
  const accuracy = (correctAnswers + incorrectAnswers) > 0 
    ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100 
    : 0;
  const moduleProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Calculate trophy level based on completion
  const getTrophyLevel = () => {
    if (completedModules === totalModules) return { icon: '🏆', text: 'Diplom!', color: 'text-yellow-400' };
    if (completedModules >= totalModules * 0.75) return { icon: '🥇', text: 'Guld!', color: 'text-yellow-500' };
    if (completedModules >= totalModules * 0.50) return { icon: '🥈', text: 'Silver!', color: 'text-slate-400' };
    if (completedModules >= totalModules * 0.25) return { icon: '🥉', text: 'Brons!', color: 'text-orange-600' };
    return { icon: '🎯', text: 'Nybörjare', color: 'text-blue-500' };
  };

  const trophyLevel = getTrophyLevel();

  return (
    <div className="w-80 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold">Din Progress</h2>
          <p className="text-slate-400 text-sm">{moduleTitle}</p>
        </div>
        {logoUrl && (
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="w-10 h-10 rounded-full border-2 border-[#FF5421]"
          />
        )}
      </div>

      {/* Current Quiz Score (om quiz är aktivt) */}
      {totalQuestions > 0 && (
        <motion.div
          className="bg-gradient-to-br from-[#FF5421] to-[#FF7851] rounded-2xl p-6 shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">
            Nuvarande Poäng
          </div>
          <div className="flex items-baseline gap-2">
            <motion.span 
              className="text-5xl font-bold"
              key={currentQuizScore}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              {currentQuizScore}
            </motion.span>
            <span className="text-2xl text-white/70">/ {currentQuizMaxScore}</span>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-white h-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-white/80 text-sm text-right font-semibold">
            {Math.round(percentage)}%
          </div>
        </motion.div>
      )}

      {/* Streak (om quiz är aktivt) */}
      {totalQuestions > 0 && streak > 0 && (
        <motion.div
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 flex items-center gap-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-4xl">🔥</span>
          <div>
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-white/80">i rad!</div>
          </div>
        </motion.div>
      )}

      {/* Rätt/Fel Stats (om quiz är aktivt) */}
      {totalQuestions > 0 && (correctAnswers > 0 || incorrectAnswers > 0) && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <div className="text-green-400 text-sm font-medium mb-1">Rätt</div>
            <div className="text-3xl font-bold">{correctAnswers}</div>
          </div>
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <div className="text-red-400 text-sm font-medium mb-1">Fel</div>
            <div className="text-3xl font-bold">{incorrectAnswers}</div>
          </div>
        </div>
      )}

      {/* Accuracy (om quiz är aktivt) */}
      {totalQuestions > 0 && (correctAnswers > 0 || incorrectAnswers > 0) && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Träffsäkerhet</span>
            <Target className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold">
            {Math.round(accuracy)}%
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-slate-700 my-6"></div>

      {/* Overall Module Progress */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Moduler</h3>
          <TrendingUp className="w-5 h-5 text-[#FF5421]" />
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm">Progress</span>
          <span className="text-2xl font-bold">
            {completedModules}/{totalModules}
          </span>
        </div>

        <div className="bg-slate-700 rounded-full h-3 overflow-hidden mb-3">
          <motion.div
            className="bg-gradient-to-r from-[#FF5421] to-[#FF7851] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${moduleProgress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="text-[#FF5421] text-sm font-semibold text-center">
          {Math.round(moduleProgress)}% genomfört
        </div>
      </div>

      {/* Trophy Display */}
      <motion.div
        className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-6xl mb-3">{trophyLevel.icon}</div>
        <div className={`text-xl font-bold ${trophyLevel.color} mb-2`}>
          {trophyLevel.text}
        </div>
        <div className="text-slate-400 text-sm">
          {completedModules === totalModules 
            ? '🎉 Alla moduler klarade!' 
            : `${totalModules - completedModules} kvar till diplom`}
        </div>
      </motion.div>

      {/* Diplom Button (when complete) */}
      {completedModules === totalModules && (
        <motion.button
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 font-bold py-4 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Award className="w-5 h-5 inline mr-2" />
          Ladda ner diplom
        </motion.button>
      )}

      {/* Trophy Collection */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <h4 className="text-sm font-medium text-slate-400 mb-3">Dina Trofeer</h4>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalModules }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-full aspect-square rounded-lg flex items-center justify-center text-2xl ${
                index < completedModules
                  ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                  : 'bg-slate-700/50'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {index < completedModules ? '🏆' : '🔒'}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
