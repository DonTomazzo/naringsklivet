"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  Lock, 
  BookOpen, 
  Target, 
  Trophy, 
  Star, 
  ChevronRight,
  ChevronDown,
  Search,
  BarChart3,
  Award,
  User,
  X,
  Pause,
  RotateCcw,
  Volume2,
  Minimize2,
  Maximize2
} from 'lucide-react';

// Interfaces
interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface Lesson {
  id: string;
  title: string;
  content?: string;
  video_url?: string;
  video_duration?: number;
  thumbnail_url?: string;
  lesson_type: 'text' | 'video' | 'quiz' | 'assignment';
  level: number;
  sectionId: string;
  isCompleted: boolean;
  points?: number;
  questions?: Question[];
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface Section {
  id: string;
  title: string;
  description?: string;
  level: number;
  lessonsCount: number;
  isCollapsed: boolean;
}

// Mock data för demo (oförändrad)
const rawLessonsData = [
  {
    id: 'lesson-1',
    title: 'Introduktion till styrelsearbete',
    content: '<p>Välkommen till din första lektion om styrelsearbete...</p>',
    video_url: '/videos/lesson1.mp4',
    video_duration: 15,
    thumbnail_url: '/thumbnails/lesson1.jpg',
    lesson_type: 'video' as const,
    level: 1,
    sectionId: 'section-1',
    points: 100
  },
  {
    id: 'lesson-2',
    title: 'Quiz: Grundläggande begrepp',
    content: '<p>Testa dina kunskaper om grundläggande styrelsebegrepp...</p>',
    video_duration: 10,
    lesson_type: 'quiz' as const,
    level: 1,
    sectionId: 'section-1',
    points: 150,
    questions: [
      {
        id: 'q1',
        questionText: 'Vad är styrelsens huvudsakliga ansvar?',
        options: ['Daglig drift', 'Strategisk ledning', 'Marknadsföring', 'Personalrekrytering'],
        correctAnswer: 'Strategisk ledning'
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Ekonomisk översikt',
    content: '<p>Lär dig läsa ekonomiska rapporter och förstå föreningens ekonomi...</p>',
    video_url: '/videos/lesson3.mp4',
    video_duration: 25,
    lesson_type: 'text' as const,
    level: 2,
    sectionId: 'section-2',
    points: 120
  },
  {
    id: 'lesson-4',
    title: 'Budgetarbete',
    content: '<p>Lär dig skapa och hantera budgetar för föreningen...</p>',
    video_duration: 20,
    lesson_type: 'video' as const,
    level: 2,
    sectionId: 'section-2',
    points: 130
  }
];

// --- LessonModal komponent med navigation och helskärm ---

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (lessonId: string) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  isOpen, 
  onClose, 
  onComplete,
  onNavigate,
  hasPrev = false,
  hasNext = false
}) => {
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleComplete = useCallback(async () => {
    if (!lesson) return;
        
    setLoading(true);
        
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    
    // Anropa onComplete i parent (LearnPage) för att uppdatera state och auto-progressa
    onComplete?.(lesson.id); 
  }, [lesson, onComplete]);

  // Keyboard Navigation & Shortcuts (←, →, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
            
      if (e.key === 'ArrowLeft' && hasPrev) {
        e.preventDefault();
        onNavigate?.('prev');
      } else if (e.key === 'ArrowRight' && hasNext) {
        e.preventDefault();
        onNavigate?.('next');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        // Om i helskärm, avsluta helskärm. Annars stäng modalen.
        if (isFullscreen) {
            setIsFullscreen(false);
        } else {
            onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrev, hasNext, onNavigate, onClose, isFullscreen]);

  if (!isOpen || !lesson) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-300 ${
      isFullscreen ? 'bg-opacity-100' : 'bg-opacity-75 backdrop-blur-sm'
    }`}>
      {/* Navigation Arrows - döljs i helskärm för video/content focus */}
      {hasPrev && !isFullscreen && (
        <button
          onClick={() => onNavigate?.('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Föregående lektion (←)"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
      )}
            
      {hasNext && !isFullscreen && (
        <button
          onClick={() => onNavigate?.('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center text-white border border-white/20 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Nästa lektion (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Modal Content Container - använder flex för att hantera helskärmshöjden */}
      <div className={`relative w-full mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 
        ${isFullscreen 
          ? 'max-w-full h-full rounded-none flex flex-col' 
          : 'max-w-5xl max-h-[90vh]'
        }`}
      >
        {/* Header - flex-shrink-0 för att behålla fast höjd */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-500/10 to-purple-600/10 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.video_duration || 5} min</span>
                </div>
                <span className="capitalize bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {lesson.lesson_type}
                </span>
                {lesson.isCompleted && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Slutförd</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              title={isFullscreen ? "Avsluta helskärm (ESC)" : "Helskärm (ESC)"}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              title="Stäng (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area - flex-grow för att fylla utrymmet i helskärm */}
        {lesson.lesson_type === 'video' && lesson.video_url ? (
          <div className="relative bg-black flex-grow">
            <video 
              // Använd h-full när i helskärm för att fylla utrymmet
              className={`w-full ${isFullscreen ? 'h-full object-contain' : 'aspect-video'}`}
              src={lesson.video_url} 
              poster={lesson.thumbnail_url} 
              controls 
            />
          </div>
        ) : lesson.lesson_type === 'quiz' ? (
          <div className={`p-6 flex-grow overflow-y-auto ${!isFullscreen ? 'max-h-96' : ''}`}>
            {/* Quiz Content ... (oförändrad) */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz: {lesson.title}</h3>
              <div className="space-y-4">
                {lesson.questions?.map((question, qIndex) => (
                  <div key={question.id} className="bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-3">{question.questionText}</p>
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name={`quiz${qIndex}`} className="text-orange-500" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ... */}
          </div>
        ) : (
          <div className={`p-6 flex-grow overflow-y-auto ${!isFullscreen ? 'max-h-96' : ''}`}>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content || '' }} />
          </div>
        )}

        {/* Footer - flex-shrink-0 för att behålla fast höjd */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200/50 bg-gray-50/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose} 
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Stäng modalen"
            >
              Stäng
            </button>
            {hasPrev && (
              <button
                onClick={() => onNavigate?.('prev')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-1"
                title="Föregående lektion (←)"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Föregående</span>
              </button>
            )}
          </div>
          <div className="flex space-x-3">
            {!lesson.isCompleted && (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="px-6 py-2 bg-[#0c5370] text-white rounded-lg hover:bg-[#0a465c] disabled:opacity-50 flex items-center space-x-2 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{loading ? 'Sparar...' : 'Markera som slutförd'}</span>
              </button>
            )}
            {hasNext && (
              <button
                onClick={() => onNavigate?.('next')}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg hover:from-orange-500 hover:to-red-600 transition-all flex items-center space-x-1"
                title="Nästa lektion (→)"
              >
                <span>Nästa</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Resterande komponenter (oförändrade) ---

// LessonIcon komponent
const LessonIcon: React.FC<{ lesson: Lesson, size?: string }> = ({ lesson, size = "w-5 h-5" }) => {
  if (lesson.isCompleted) {
    return <CheckCircle className={`${size} text-white`} />;
  }
    
  switch (lesson.lesson_type) {
    case 'video':
      return <Play className={`${size} text-white`} />;
    case 'quiz':
      return <Target className={`${size} text-white`} />;
    case 'assignment':
      return <Trophy className={`${size} text-white`} />;
    default:
      return <BookOpen className={`${size} text-white`} />;
  }
};

// LessonCard komponent
const LessonCard: React.FC<{
  lesson: Lesson;
  onLessonSelect: (lesson: Lesson) => void;
}> = ({ lesson, onLessonSelect }) => {
  const getTheme = () => {
    if (lesson.isCompleted) {
      return {
        bgGradient: 'from-green-50 to-emerald-50',
        iconBg: 'from-green-400 to-emerald-500',
        border: 'border-green-200',
        statusText: 'text-green-600'
      };
    } else {
      switch (lesson.lesson_type) {
        case 'video':
          return {
            bgGradient: 'from-blue-50 to-cyan-50',
            iconBg: 'from-blue-400 to-cyan-500',
            border: 'border-blue-200',
            statusText: 'text-blue-600'
          };
        case 'quiz':
          return {
            bgGradient: 'from-purple-50 to-pink-50',
            iconBg: 'from-purple-500 to-pink-500',
            border: 'border-purple-200',
            statusText: 'text-purple-600'
          };
        default:
          return {
            bgGradient: 'from-indigo-50 to-purple-50',
            iconBg: 'from-indigo-400 to-purple-500',
            border: 'border-indigo-200',
            statusText: 'text-indigo-600'
          };
      }
    }
  };

  const theme = getTheme();
  const progress = lesson.isCompleted ? 100 : 0;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Video';
      case 'quiz': return 'Quiz';
      case 'assignment': return 'Uppgift';
      case 'text': return 'Läsning';
      default: return 'Lektion';
    }
  };

  return (
    <div 
      className={`relative bg-gradient-to-br ${theme.bgGradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${theme.border} cursor-pointer`}
      onClick={() => onLessonSelect(lesson)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${theme.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
          <LessonIcon lesson={lesson} />
        </div>
        {lesson.isCompleted && (
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Slutförd</span>
          </div>
        )}
      </div>

      <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
        {lesson.title}
      </h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Framsteg</span>
          <span className="text-sm font-bold text-gray-800">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{lesson.video_duration || 5} min</span>
        </div>
        <span className={`px-2 py-1 rounded-full bg-white ${theme.statusText} font-medium`}>
          {getTypeLabel(lesson.lesson_type)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Nivå {lesson.level}</span>
          {lesson.points && (
            <div className="flex items-center space-x-1 text-yellow-600">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{lesson.points}p</span>
            </div>
          )}
        </div>
                
        <div className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors">
          <span className="mr-1">
            {lesson.isCompleted ? 'Repetera' : 'Starta'}
          </span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

// SectionHeader komponent
const SectionHeader: React.FC<{
  section: Section;
  lessons: Lesson[];
  isCollapsed: boolean;
  onToggle: () => void;
}> = ({ section, lessons, isCollapsed, onToggle }) => {
  const sectionLessons = lessons.filter(l => l.sectionId === section.id);
  const completedCount = sectionLessons.filter(l => l.isCompleted).length;
  const totalCount = sectionLessons.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{section.level}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{section.title}</h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-xs text-gray-500">{completedCount}/{totalCount} slutförda</span>
              <div className="flex items-center space-x-1">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>
                
        <div className="flex items-center space-x-3">
          {completedCount === totalCount && totalCount > 0 && (
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          )}
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Huvudkomponent: LearnPage med Navigationslogik ---

const LearnPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['lesson-1']));
    
  const [sections, setSections] = useState<Section[]>([
    { id: 'section-1', title: 'Grundläggande Styrelsearbete', description: 'Introduktion till styrelsearbetet', level: 1, lessonsCount: 4, isCollapsed: false },
    { id: 'section-2', title: 'Ekonomi och Juridik', description: 'Fördjupning i föreningens ekonomi', level: 2, lessonsCount: 4, isCollapsed: false },
    { id: 'section-3', title: 'Kommunikation och Medlemskontakt', description: 'Hantering av medlemsmöten', level: 3, lessonsCount: 4, isCollapsed: false }
  ]);

  const lessons = useMemo(() => {
    return rawLessonsData.map((lesson, index) => {
      return {
        ...lesson,
        isCompleted: completedLessons.has(lesson.id),
        isUnlocked: true, // Alla lektioner är alltid tillgängliga
        description: `Lektion ${index + 1} i kursen`
      };
    });
  }, [completedLessons]);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || lesson.lesson_type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [lessons, searchTerm, filterType]);

  // Funktion för att öppna modalen, stabil med useCallback
  const openLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  }, []);

  // --- Navigationslogik ---

  const allLessons = lessons; // Använd den obearbetade listan för indexering

  const currentLessonIndex = useMemo(() => {
    if (!selectedLesson) return -1;
    return allLessons.findIndex(l => l.id === selectedLesson.id);
  }, [selectedLesson, allLessons]);

  const previousLesson = useMemo(() => {
    if (currentLessonIndex <= 0) return null;
    return allLessons[currentLessonIndex - 1];
  }, [currentLessonIndex, allLessons]);

  const nextLesson = useMemo(() => {
    if (currentLessonIndex === -1 || currentLessonIndex >= allLessons.length - 1) return null;
    return allLessons[currentLessonIndex + 1];
  }, [currentLessonIndex, allLessons]);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev' && previousLesson) {
      openLesson(previousLesson);
    } else if (direction === 'next' && nextLesson) {
      openLesson(nextLesson);
    }
  }, [previousLesson, nextLesson, openLesson]); // openLesson är nu stabil

  // --- Auto-Progression Logik ---

  const handleComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));

    // Auto-progression: hoppa till nästa lektion efter 0.5 sekunder
    if (nextLesson) {
      setTimeout(() => {
        openLesson(nextLesson);
      }, 500);
    } else {
      // Om sista lektionen, stäng modalen efter 0.5 sekunder
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    }
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isCollapsed: !section.isCollapsed }
        : section
    ));
  };

  const groupedLessons = filteredLessons.reduce((acc, lesson) => {
    if (!acc[lesson.sectionId]) acc[lesson.sectionId] = [];
    acc[lesson.sectionId].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const completedCount = completedLessons.size;
  const totalLessons = lessons.length;
  const totalPoints = Array.from(completedLessons).reduce((sum, lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    return sum + (lesson?.points || 0);
  }, 0);
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Bakgrundsbild med overlay - ingen skalning behövs längre */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          transform: 'scale(1)', // Ta bort sidebar-skalning
        }}
      />
      <div className="fixed inset-0 bg-[#a78bfa]/50 backdrop-blur-md bg-opacity-50"></div>
      
      {/* Huvudinnehåll - nu utan sidomenyjustering */}
      <div className="relative z-10">
        {/* Header */}
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Styrelsekörkortet - bli tryggare i din styrelseroll
                </h1>
                <div className="flex items-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{totalLessons} Lektioner</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{completedCount} Slutförda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{totalPoints} Poäng</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Header */}
              <div className="w-64">
                <div className="text-white text-sm font-medium mb-1">
                  Ditt Framsteg: {Math.round(progressPercentage)}%
                </div>
                <div className="w-full bg-white/20 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Filter och Sök */}
            <div className="flex items-center space-x-4 bg-white/20 p-3 rounded-xl border border-white/20 mb-8">
              <div className="relative flex-grow">
                <Search className="w-5 h-5 text-white/70 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Sök lektioner..."
                  className="w-full py-2 pl-10 pr-4 bg-white/10 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="py-2 px-4 bg-white/10 rounded-lg text-white border-0 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Alla Typer</option>
                <option value="video">Video</option>
                <option value="quiz">Quiz</option>
                <option value="text">Läsning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kursinnehåll - Sektioner */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="space-y-8">
            {sections.map(section => {
              const lessonsInSection = groupedLessons[section.id] || [];

              if (lessonsInSection.length === 0 && searchTerm !== '') return null; // Dölj tom sektion vid sökning

              return (
                <div key={section.id}>
                  <SectionHeader 
                    section={{ ...section, lessonsCount: lessonsInSection.length }}
                    lessons={lessons} // Skicka den fulla listan för räkning
                    isCollapsed={section.isCollapsed}
                    onToggle={() => toggleSection(section.id)}
                  />

                  {!section.isCollapsed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      {lessonsInSection.map((lesson) => (
                        <LessonCard 
                          key={lesson.id} 
                          lesson={lesson} 
                          onLessonSelect={openLesson}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lesson Modal */}
      <LessonModal 
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleComplete}
        onNavigate={handleNavigate}
        hasPrev={!!previousLesson}
        hasNext={!!nextLesson}
      />
    </div>
  );
};

export default LearnPage;