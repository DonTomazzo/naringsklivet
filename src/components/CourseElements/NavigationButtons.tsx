import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavigationButtonsProps {
  currentLessonId: string;
  onNavigate: (lessonId: string) => void;
  courseContent: any[];
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  currentLessonId, 
  onNavigate, 
  courseContent 
}) => {
  const currentIndex = courseContent.findIndex(l => l.id === currentLessonId);
  const previousLesson = currentIndex > 0 ? courseContent[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseContent.length - 1 ? courseContent[currentIndex + 1] : null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
      {previousLesson ? (
        <motion.button
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(previousLesson.id)}
          className="group relative"
          title={`Föregående: ${previousLesson.title}`}
        >
          {/* Circle */}
          <div className="w-16 h-16 rounded-full border-[3px] border-slate-300 bg-white flex items-center justify-center transition-all group-hover:border-slate-500 group-hover:shadow-lg">
            {/* Thick arrow up */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-slate-400 group-hover:text-slate-600 transition-colors">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Label */}
          <span className="absolute right-20 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-2 rounded-lg shadow-md">
            Föregående
          </span>
        </motion.button>
      ) : (
        <div className="w-16 h-16 opacity-0"></div>
      )}
      
      {/* Separator dots */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
      </div>
      
      {nextLesson && (
        <motion.button
          whileHover={{ y: 3, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(nextLesson.id)}
          className="group relative"
          title={`Nästa: ${nextLesson.title}`}
        >
          {/* Circle */}
          <div className="w-16 h-16 rounded-full border-[3px] border-[#FF5421]/40 bg-white flex items-center justify-center transition-all group-hover:border-[#FF5421] group-hover:shadow-lg group-hover:shadow-[#FF5421]/25">
            {/* Thick arrow down */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#FF5421]/70 group-hover:text-[#FF5421] transition-colors">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Label */}
          <span className="absolute right-20 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-2 rounded-lg shadow-md">
            Nästa
          </span>
        </motion.button>
      )}
    </div>
  );
};

export default NavigationButtons;




