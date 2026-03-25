// MiniCourseCard.jsx

import { motion } from 'framer-motion';
import { CheckCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Återanvänder ProgressBar-komponenten från din ModuleCard/ModuleModal fil!
// Beroende på var du placerar denna fil, måste du kanske importera ProgressBar.
// För enkelhetens skull, antar vi att du kan klistra in ProgressBar här, eller importera den:
// import { ProgressBar } from './ModuleCard'; // <- Om du exporterar den!

// ----------------------------------------------------
// ÅTERANVÄND PROGRESSBAR (Klistra in om du inte exporterar den)
// ----------------------------------------------------
const ProgressBar = ({ progress }) => {
  // progress är en siffra mellan 0 och 100
  const progressText = progress === 100 ? 'Färdig' : 'Pågående';
  const progressColor = progress === 100 ? 'bg-green-500' : 'bg-[#FF5421]';
  const textColor = progress === 100 ? 'text-green-500' : 'text-[#FF5421]';
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-semibold uppercase ${textColor}`}>
          {progressText}
        </span>
        <span className={`text-xs font-semibold ${textColor}`}>
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
// ----------------------------------------------------


export default function MiniCourseCard({ course, delay = 0 }) {
  const navigate = useNavigate();

  // Data kommer från useTeam/myCourses: { id, title, progress, slug, completedAt }
  const progress = course.progress || 0;
  const isCompleted = progress === 100;

  const statusTag = isCompleted
    ? { text: 'Klar', bg: 'bg-green-100', textC: 'text-green-700', icon: CheckCircle }
    : progress > 0
    ? { text: 'Pågående', bg: 'bg-orange-100', textC: 'text-orange-700', icon: Play }
    : { text: 'Ej startad', bg: 'bg-gray-100', textC: 'text-gray-700', icon: Play };

  const buttonBg = isCompleted
    ? 'bg-green-100 text-green-600 hover:bg-green-200'
    : 'bg-[#FF5421] text-white hover:bg-[#E04A1D]'; // Återanvänd din accentfärg

  const handleCardAction = (e) => {
    e.stopPropagation();
    // Navigerar till modulen, använder slug om tillgängligt
    navigate(`/module/${course.slug || course.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      // Basstil som matchar din mock-data-struktur
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-white"
      onClick={handleCardAction}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-4">
          <h4 className="font-semibold text-slate-900 mb-1 leading-snug">{course.title}</h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 ${statusTag.bg} ${statusTag.textC} rounded-full font-medium flex items-center gap-1`}>
              <statusTag.icon size={12} />
              {statusTag.text}
            </span>
          </div>
        </div>
        
        {/* Spela/Klar-knapp */}
        <button 
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${buttonBg}`}
          onClick={handleCardAction} 
        >
          {isCompleted ? <CheckCircle size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Återanvänd den befintliga ProgressBar-stilen */}
      <ProgressBar progress={progress} />

      {course.completedAt && isCompleted && (
        <p className="text-xs text-slate-500 mt-2">
          Avklarad: {new Date(course.completedAt).toLocaleDateString('sv-SE')}
        </p>
      )}
    </motion.div>
  );
}