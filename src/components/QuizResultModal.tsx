import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Target, Award, Medal, Download, Sparkles } from 'lucide-react';

interface QuizResultModalProps {
  isOpen: boolean;
  score: number;
  maxScore: number;
  totalQuestions: number;
  onRedoQuiz: () => void;
  onGoBack: () => void;
  showNameInput?: boolean;
  playerName?: string;
  onPlayerNameChange?: (name: string) => void;
  onSaveResult?: (name: string) => Promise<boolean>;
  quizSlug?: string;
  timeTaken?: number;
  maxStreak?: number;
}

// Achievement System
const ACHIEVEMENTS = [
  {
    id: 'perfect',
    name: 'Perfekt Score',
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-600',
    textColor: 'text-yellow-400',
    description: '100% rätt!',
    check: (percentage: number) => percentage === 100
  },
  {
    id: 'excellent',
    name: 'Utmärkt',
    icon: Star,
    color: 'from-purple-400 to-purple-600',
    textColor: 'text-purple-400',
    description: '90%+ rätt',
    check: (percentage: number) => percentage >= 90
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    icon: Zap,
    color: 'from-orange-400 to-red-500',
    textColor: 'text-orange-400',
    description: '5+ rätt i rad',
    check: (percentage: number, maxStreak?: number) => (maxStreak || 0) >= 5
  },
  {
    id: 'speed_demon',
    name: 'Snabbtänkare',
    icon: Target,
    color: 'from-blue-400 to-cyan-500',
    textColor: 'text-blue-400',
    description: 'Klart på < 5 min',
    check: (percentage: number, maxStreak?: number, timeTaken?: number) => (timeTaken || 999) < 300
  }
];

// Simple Confetti Component
const SimpleConfetti = () => {
  const [particles] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      rotation: Math.random() * 360,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)]
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: -20
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            opacity: 0,
            rotate: particle.rotation + 720
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
};

const QuizResultModal: React.FC<QuizResultModalProps> = ({
  isOpen,
  score,
  maxScore,
  totalQuestions,
  onRedoQuiz,
  onGoBack,
  showNameInput,
  playerName = '',
  onPlayerNameChange,
  onSaveResult,
  quizSlug,
  timeTaken = 0,
  maxStreak = 0
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [downloadingDiploma, setDownloadingDiploma] = useState(false);
  
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const isSuccessful = percentage >= 70;
  const isPerfectScore = percentage === 100;

  // Check earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter(achievement => 
    achievement.check(percentage, maxStreak, timeTaken)
  );

  useEffect(() => {
    if (showConfetti && isPerfectScore) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti, isPerfectScore]);

  // Animera poängen
  useEffect(() => {
    if (isOpen) {
      let current = 0;
      const increment = score / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isOpen, score]);

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', color: 'from-yellow-400 to-yellow-500', emoji: '🌟' };
    if (percentage >= 80) return { grade: 'B', color: 'from-purple-400 to-fuchsia-500', emoji: '⭐' };
    if (percentage >= 70) return { grade: 'C', color: 'from-fuchsia-400 to-pink-500', emoji: '✨' };
    return { grade: 'F', color: 'from-purple-600 to-fuchsia-600', emoji: '📚' };
  };

  const gradeInfo = getGrade();

  const downloadDiploma = () => {
    setDownloadingDiploma(true);
    setTimeout(() => {
      setDownloadingDiploma(false);
      alert('Diplom nedladdat! (Mock - Här skulle PDF genereras)');
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.95) 100%)'
          }}
        >
          {showConfetti && isPerfectScore && <SimpleConfetti />}

          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl"
          >
            {/* Glow Effect */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
              style={{
                background: isSuccessful 
                  ? 'radial-gradient(circle, #10b981 0%, transparent 70%)'
                  : 'radial-gradient(circle, #f97316 0%, transparent 70%)'
              }}
            />

            {/* Main Card */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Top Accent Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-1 bg-gradient-to-r ${gradeInfo.color}`}
                style={{ transformOrigin: 'left' }}
              />

              <div className="p-8 sm:p-12">
                
                {/* Grade Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                  className="relative mx-auto mb-8"
                  style={{ width: 'fit-content' }}
                >
                  <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${gradeInfo.color} p-1 shadow-2xl`}>
                    <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-white">{gradeInfo.grade}</span>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -right-4 text-5xl"
                  >
                    {gradeInfo.emoji}
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center"
                >
                  {isSuccessful ? 'Fantastiskt jobbat!' : 'Bra försök!'}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70 text-center text-lg mb-8"
                >
                  {isSuccessful 
                    ? 'Du har klarat testet med glans! 🎉'
                    : 'Fortsätt öva så når du målet snart! 💪'}
                </motion.p>

                {/* Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-white/10"
                >
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
                        Poäng
                      </div>
                      <motion.div className="text-4xl font-bold text-white" key={displayScore}>
                        {displayScore}
                        <span className="text-2xl text-white/50">/{maxScore}</span>
                      </motion.div>
                    </div>

                    <div>
                      <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
                        Procent
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {Math.round(percentage)}
                        <span className="text-2xl text-white/50">%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
                        Frågor
                      </div>
                      <div className="text-4xl font-bold text-white">
                        {totalQuestions}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white/60 text-sm font-medium">Ditt resultat</span>
                      <span className="text-white/60 text-sm font-medium">
                        {isSuccessful ? 'Godkänt!' : 'Behöver 70%'}
                      </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${gradeInfo.color} relative`}
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                      </motion.div>
                      <div 
                        className="absolute top-0 h-full w-0.5 bg-white/40"
                        style={{ left: '70%' }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Achievements Section */}
                {earnedAchievements.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 text-center flex items-center justify-center gap-2">
                      <Award className="w-6 h-6 text-yellow-400" />
                      Upplåsta Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {earnedAchievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <motion.div
                            key={achievement.id}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 1.0 + (index * 0.1),
                              type: "spring",
                              stiffness: 200 
                            }}
                            className="bg-purple-800/50 backdrop-blur-xl rounded-xl p-4 border border-purple-400/30"
                          >
                            <div className={`bg-gradient-to-br ${achievement.color} w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`font-bold text-center mb-1 ${achievement.textColor}`}>
                              {achievement.name}
                            </div>
                            <div className="text-xs text-center text-purple-300">
                              {achievement.description}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Stats Grid - Visa alltid */}
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 1.1 }}
  className="grid grid-cols-2 gap-4 mb-8"
>
  {/* Visa streak OM större än 0 */}
  {maxStreak > 0 && (
    <div className="bg-purple-800/50 rounded-xl p-4 text-center">
      <div className="text-2xl font-bold text-yellow-400">{maxStreak}</div>
      <div className="text-xs text-purple-300">Max Streak</div>
    </div>
  )}
  
  {/* Visa TID ALLTID (även om 0) */}
  <div className="bg-purple-800/50 rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-green-400">
      {formatTime(timeTaken)}
    </div>
    <div className="text-xs text-purple-300">Total Tid</div>
  </div>
</motion.div>
                

                {/* Diploma Download */}
                {percentage >= 80 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mb-6"
                  >
                    <button
                      onClick={downloadDiploma}
                      disabled={downloadingDiploma}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {downloadingDiploma ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Genererar diplom...
                        </>
                      ) : (
                        <>
                          <Medal className="w-5 h-5" />
                          Ladda ner diplom
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Name Input for Leaderboard */}
                {showNameInput && !showLeaderboard && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                  >
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Ange ditt namn för leaderboard:
                    </label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => onPlayerNameChange?.(e.target.value)}
                      placeholder="Ditt namn..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all"
                      onKeyPress={async (e) => {
                        if (e.key === 'Enter' && playerName.trim()) {
                          const success = await onSaveResult?.(playerName.trim());
                          if (success) setShowLeaderboard(true);
                        }
                      }}
                    />
                    <motion.button
                      onClick={async () => {
                        if (playerName.trim()) {
                          const success = await onSaveResult?.(playerName.trim());
                          if (success) setShowLeaderboard(true);
                        }
                      }}
                      disabled={!playerName.trim()}
                      whileHover={{ scale: playerName.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: playerName.trim() ? 0.98 : 1 }}
                      className={`w-full mt-4 py-3 px-6 rounded-xl font-semibold transition-all ${
                        playerName.trim()
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:shadow-lg'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      Spara till Leaderboard
                    </motion.button>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    onClick={onRedoQuiz}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all shadow-lg ${
                      isSuccessful
                        ? 'bg-gradient-to-r from-white to-gray-100 text-black hover:shadow-white/20'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-orange-500/30'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {isSuccessful ? 'Försök slå rekordet' : 'Gör om testet'}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={onGoBack}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 px-8 rounded-xl font-semibold text-lg bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-all backdrop-blur-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Gå tillbaka
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizResultModal;