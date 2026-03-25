import { motion } from 'framer-motion';
import React from 'react';

// Importera ikonerna du vill använda (t.ex. från 'lucide-react' eller liknande)
// För detta exempel använder vi enkla SVG:er
const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
);

const MaximizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M9 21H3v-6"/><path d="M3 16l8 8"/></svg>
);

interface CollapsibleSidebarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  streak: number;
  correctAnswers: number;
  incorrectAnswers: number;
  // Nytt prop: Tillståndet från föräldern
  isSidebarMaximized: boolean;
  // Nytt prop: Funktion för att ändra tillståndet i föräldern
  onToggle: () => void;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  streak,
  correctAnswers,
  incorrectAnswers,
  isSidebarMaximized,
  onToggle
}) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const accuracy = (correctAnswers + incorrectAnswers) > 0 
    ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100 
    : 0;

  // Bestäm bredd och om animationen ska användas
  const sidebarWidth = isSidebarMaximized ? 'w-80' : 'w-20';
  const logoSize = isSidebarMaximized ? 'w-8 h-8' : 'w-10 h-10';
  
  // Kontrollerar om skärmen är stor (lg:block)
  const baseClasses = `fixed left-0 top-0 h-full bg-slate-800/60 backdrop-blur-xl border-r border-slate-600/30 p-4 transition-all duration-300 hidden lg:block ${sidebarWidth}`;
  
  // Minimalt läge (endast siffror)
  if (!isSidebarMaximized) {
    return (
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={baseClasses}
        style={{ width: '80px' }} // Tvinga bredden för det minimerade läget
      >
        <div className="flex flex-col h-full items-center justify-between">
          
          {/* Topp-ikon för att maximera */}
          <button
            onClick={onToggle}
            className="text-white hover:text-[#FF5421] p-1 mb-6 transition-colors"
            title="Maximera Sidofält"
          >
            <MaximizeIcon className="w-6 h-6" />
          </button>
          
          {/* Minimerade statistik (Siffror i #FF5421) */}
          <div className="flex flex-col items-center space-y-8 mt-4">
            
            {/* Poäng */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-white/60 uppercase">Poäng</span>
              <span className="text-xl font-bold text-[#FF5421]">{score}</span>
              <span className="text-xs text-white/60">/{maxScore}</span>
            </div>
            
            {/* Frågor */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-white/60 uppercase">Fråga</span>
              <span className="text-xl font-bold text-[#FF5421]">{currentQuestion}</span>
              <span className="text-xs text-white/60">/{totalQuestions}</span>
            </div>
            
            {/* Rätt svar */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-white/60 uppercase">Rätt</span>
              <span className="text-xl font-bold text-[#FF5421]">{correctAnswers}</span>
              <span className="text-xs text-white/60">Fel: {incorrectAnswers}</span>
            </div>
          </div>
          
          {/* Logo (Kan bytas ut mot en ikon i minimiserat läge) */}
          <img 
            src="/logo.png" 
            alt="Logotyp" 
            className={`${logoSize} rounded-full mt-auto`}
          />
        </div>
      </motion.div>
    );
  }

  // Maximerat Läge (Din ursprungliga QuizStatsSidebar-logik, modifierad med Toggle-knapp)
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={baseClasses}
      style={{ width: '320px', padding: '1.5rem' }} // Tvinga bredden för det maximerade läget (w-80 = 320px)
    >
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <div className="flex items-center justify-between"> 
            
            <h2 className="text-2xl font-bold text-white">Din kompetensutveckling</h2>
            
            {/* Minimera-knappen */}
            <button
              onClick={onToggle}
              className="text-white hover:text-[#FF5421] transition-colors p-1"
              title="Minimera Sidofält"
            >
              <MinimizeIcon className="w-6 h-6" />
            </button>
            
          </div>
          <p className="text-slate-300 text-sm">Följ dina framsteg live</p>
        </div>
        
        {/* Resten av din statistikpanel från den ursprungliga QuizStatsSidebar */}
        <motion.div
          className="bg-slate-800/90 rounded-2xl p-6 mb-6 shadow-lg border border-slate-700/50"
          whileHover={{ scale: 1.02 }}
        >
          {/* ... Poäng, Procent och Progress Bars (Oförändrad) ... */}
          <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
            Nuvarande Poäng
          </div>
          <div className="flex items-baseline gap-2">
            <motion.span 
              className="text-5xl font-bold text-white"
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score}
            </motion.span>
            <span className="text-2xl text-white/60">/ {maxScore}</span>
          </div>
          <div className="mt-4 h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-right text-white/70 text-sm font-medium">
            {Math.round(percentage)}%
          </div>
        </motion.div>
        
        <div className="space-y-4 mb-6">
          {/* ... Fråga och Progress Bar (Oförändrad) ... */}
          <div className="bg-[#171f32]/20 rounded-xl p-4 border border-[#171f32]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm font-medium">Fråga</span>
              <span className="text-white font-bold">{currentQuestion} / {totalQuestions}</span>
            </div>
            <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* ... Streak (Oförändrad) ... */}
          <div className="bg-[#171f32]/20 rounded-xl p-4 border border-[#171f32]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <span className="text-slate-300 text-sm font-medium">Streak</span>
              </div>
              <motion.span 
                className="text-white font-bold text-2xl"
                key={streak}
                initial={{ scale: 1.5, color: '#facc15' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.3 }}
              >
                {streak}
              </motion.span>
            </div>
          </div>
          
          {/* ... Träffsäkerhet (Oförändrad) ... */}
          <div className="bg-[#171f32]/20 rounded-xl p-4 border border-[#171f32]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-sm font-medium">Träffsäkerhet</span>
              <span className="text-white font-bold">{Math.round(accuracy)}%</span>
            </div>
            <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF5421] to-[#E04619] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* ... Rätt/Fel (Oförändrad) ... */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FF5421] rounded-xl p-4 border border-[#FF5421]">
              <div className="text-white text-xs font-medium uppercase mb-1">Rätt</div>
              <div className="text-white font-bold text-2xl">{correctAnswers}</div>
            </div>
            <div className="bg-[#171f32] rounded-xl p-4 border border-[#171f32]">
              <div className="text-slate-300 text-xs font-medium uppercase mb-1">Fel</div>
              <div className="text-white font-bold text-2xl">{incorrectAnswers}</div>
            </div>
          </div>
        </div>
        
        {/* ... Feedback (Oförändrad) ... */}
        <div className="mt-auto">
          <div className="bg-[#171f32]/30 rounded-xl p-4 border border-[#171f32]/40">
            <p className="text-white text-sm text-center leading-relaxed">
              {percentage >= 80 && "Du gör det fantastiskt! 🌟"}
              {percentage >= 60 && percentage < 80 && "Bra jobbat! Fortsätt så! 💪"}
              {percentage < 60 && percentage > 0 && "Du klarar det! 🎯"}
              {percentage === 0 && "Lycka till! 🚀"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollapsibleSidebar;