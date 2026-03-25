import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Clock, Award, ChevronDown, Play, Calculator,
  BookOpen, Video, X, ChevronRight, FileText, Edit3, MessageSquare,
  Star, Users, TrendingUp, Bookmark, Share2, Download, Menu,
  Pause, SkipForward, SkipBack, Volume2, Maximize, Settings,
  Target, Trophy, Flame, Brain
} from 'lucide-react';
import LinkedInCourseQuiz from '../../components/CourseElements/LinkeQuiz';

// ==================== TYPES ====================
interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'interactive' | 'quiz' | 'reading';
  description?: string;
  content?: any;
}

interface Chapter {
  chapter: string;
  duration: string;
  lessons: Lesson[];
}

interface RelatedCourse {
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  students: string;
  thumbnail: string;
}

interface UserData {
  name: string;
  avatar: string;
  totalPoints: number;
}

type TabType = 'overview' | 'notebook' | 'transcript';

// ==================== MOCK DATA ====================

// Quiz data för P/E-tal quiz
const QUIZ_DATA_GRUNDERNA = {
  id: 'pe-tal-grunderna-quiz',
  title: 'Quiz: P/E-tal Grunderna',
  slug: 'pe-tal-grunderna',
  questions: [
    {
      id: 'q1',
      question_text: 'Vad står P/E för?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'Price to Earnings',
          'Profit to Equity',
          'Performance to Earnings',
          'Price to Equity'
        ]
      },
      correct_answer: 'Price to Earnings',
      explanation: 'P/E står för Price to Earnings, vilket på svenska betyder aktiens pris i förhållande till företagets vinst per aktie.',
      points: 10
    },
    {
      id: 'q2',
      question_text: 'Ett företag har ett P/E-tal på 15. Vad betyder det?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Aktien kostar 15 kr',
          'Företaget tjänar 15 kr per aktie',
          'Det tar 15 år att tjäna tillbaka investeringen vid nuvarande vinst',
          'Företaget har 15% tillväxt'
        ]
      },
      correct_answer: 'Det tar 15 år att tjäna tillbaka investeringen vid nuvarande vinst',
      explanation: 'Ett P/E-tal på 15 innebär att du betalar 15 gånger företagets årliga vinst per aktie. Det kan tolkas som att det teoretiskt tar 15 år att tjäna tillbaka din investering om vinsten förblir konstant.',
      points: 15
    },
    {
      id: 'q3',
      question_text: 'Vilka av följande påståenden är sanna om P/E-tal?',
      question_type: 'multiple_choice',
      question_order: 3,
      options: {
        choices: [
          'Ett högt P/E-tal kan indikera höga tillväxtförväntningar',
          'P/E-tal är mest användbart när man jämför företag i samma bransch',
          'Ett lågt P/E-tal betyder alltid att aktien är billig',
          'P/E-talet påverkas av företagets skuldnivå'
        ]
      },
      correct_answer: [
        'Ett högt P/E-tal kan indikera höga tillväxtförväntningar',
        'P/E-tal är mest användbart när man jämför företag i samma bransch'
      ],
      explanation: 'Ett högt P/E-tal kan betyda att marknaden förväntar sig stark tillväxt. P/E-tal fungerar bäst för jämförelser inom samma bransch. Ett lågt P/E-tal kan även indikera problem, och P/E-talet påverkas inte direkt av skulder (det är EV/EBIT som gör det).',
      points: 20
    },
    {
      id: 'q4',
      question_text: 'Teknologibolag har ofta _____ P/E-tal än traditionella industribolag.',
      question_type: 'fill_blank',
      question_order: 4,
      correct_answer: 'högre',
      explanation: 'Teknologibolag har generellt högre P/E-tal eftersom marknaden förväntar sig snabbare tillväxt och högre framtida vinster.',
      points: 15
    },
    {
      id: 'q5',
      question_text: 'När är P/E-talet INTE användbart?',
      question_type: 'single_choice',
      question_order: 5,
      options: {
        choices: [
          'När företaget gör förlust',
          'När aktien handlas för 100 kr',
          'När vinsten är stabil',
          'När P/E-talet är under 20'
        ]
      },
      correct_answer: 'När företaget gör förlust',
      explanation: 'P/E-talet blir missvisande eller omöjligt att beräkna när företaget gör förlust, eftersom du då får ett negativt tal som inte är meningsfullt.',
      points: 10
    }
  ]
};

const QUIZ_DATA_PRAKTISK = {
  id: 'pe-tal-praktisk-quiz',
  title: 'Quiz: Praktisk Tillämpning',
  slug: 'pe-tal-praktisk',
  questions: [
    {
      id: 'p1',
      question_text: 'Företag A har P/E 25 och företag B har P/E 10. Båda är i samma bransch. Vad kan detta betyda?',
      question_type: 'multiple_choice',
      question_order: 1,
      options: {
        choices: [
          'Marknaden förväntar sig högre tillväxt från företag A',
          'Företag B är undervärderat',
          'Företag A är övervärderat',
          'Man måste analysera mer än bara P/E-talet'
        ]
      },
      correct_answer: [
        'Marknaden förväntar sig högre tillväxt från företag A',
        'Man måste analysera mer än bara P/E-talet'
      ],
      explanation: 'Högre P/E kan indikera tillväxtförväntningar, men det kan också betyda övervärdering. Lågt P/E kan betyda undervärdering ELLER att företaget har problem. Man behöver alltid titta på fler faktorer!',
      points: 20
    },
    {
      id: 'p2',
      question_text: 'En aktie kostar 150 kr och vinsten per aktie är 10 kr. Vad är P/E-talet?',
      question_type: 'fill_blank',
      question_order: 2,
      correct_answer: '15',
      explanation: 'P/E = Aktiekurs / Vinst per aktie = 150 / 10 = 15',
      points: 15
    },
    {
      id: 'p3',
      question_text: 'Vilket genomsnittligt P/E-tal har börsen historiskt haft?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Cirka 5-8',
          'Cirka 15-18',
          'Cirka 25-30',
          'Cirka 40-50'
        ]
      },
      correct_answer: 'Cirka 15-18',
      explanation: 'Börsen (t.ex. S&P 500) har historiskt haft ett genomsnittligt P/E-tal runt 15-18. Detta används ofta som referenspunkt.',
      points: 10
    },
    {
      id: 'p4',
      question_text: 'Vad kallas det när man använder förväntad framtida vinst istället för historisk?',
      question_type: 'single_choice',
      question_order: 4,
      options: {
        choices: [
          'Forward P/E',
          'Trailing P/E',
          'Future P/E',
          'Expected P/E'
        ]
      },
      correct_answer: 'Forward P/E',
      explanation: 'Forward P/E använder förväntad framtida vinst (nästa 12 månader), medan Trailing P/E använder de senaste 12 månadernas faktiska vinst.',
      points: 15
    }
  ]
};

const QUIZ_DATA_AVANCERAT = {
  id: 'pe-tal-slutprov',
  title: 'Slutprov: P/E-tal Mastery',
  slug: 'pe-tal-slutprov',
  questions: [
    {
      id: 's1',
      question_text: 'Kortbolaget AB handlas för 200 kr/aktie och hade en vinst på 15 kr/aktie förra året. För innevarande år förväntas vinsten bli 20 kr/aktie. Vad är Forward P/E?',
      question_type: 'fill_blank',
      question_order: 1,
      correct_answer: '10',
      explanation: 'Forward P/E = Aktiekurs / Förväntad framtida vinst = 200 / 20 = 10',
      points: 20
    },
    {
      id: 's2',
      question_text: 'Vilka faktorer kan påverka ett företags P/E-tal?',
      question_type: 'multiple_choice',
      question_order: 2,
      options: {
        choices: [
          'Tillväxttakt',
          'Branschens genomsnitt',
          'Ränteläget',
          'Företagets omsättning',
          'Marknadsentiment'
        ]
      },
      correct_answer: [
        'Tillväxttakt',
        'Branschens genomsnitt',
        'Ränteläget',
        'Marknadsentiment'
      ],
      explanation: 'P/E-talet påverkas av tillväxtförväntningar, branschnormer, ränteläget (påverkar diskonteringsräntan), och allmänt marknadsentiment. Omsättning påverkar inte P/E direkt - det är vinsten som räknas.',
      points: 25
    },
    {
      id: 's3',
      question_text: 'PEG-talet (Price/Earnings to Growth) är användbart för att:',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Jämföra företag med olika tillväxttakt',
          'Beräkna framtida aktiekurs',
          'Förutse börskrascher',
          'Värdera fastigheter'
        ]
      },
      correct_answer: 'Jämföra företag med olika tillväxttakt',
      explanation: 'PEG-talet (P/E-tal / Tillväxttakt) hjälper till att jämföra företag med olika tillväxthastigheter. Ett PEG under 1 kan indikera att aktien är undervärderad relativt sin tillväxt.',
      points: 15
    },
    {
      id: 's4',
      question_text: 'Varför kan cykliska bolag ha missvisande P/E-tal?',
      question_type: 'single_choice',
      question_order: 4,
      options: {
        choices: [
          'Deras vinster varierar kraftigt med konjunkturen',
          'De betalar ingen utdelning',
          'De har för många anställda',
          'De handlas på fel börs'
        ]
      },
      correct_answer: 'Deras vinster varierar kraftigt med konjunkturen',
      explanation: 'Cykliska bolag (som gruvor, verkstad) har vinster som varierar mycket med konjunkturen. Vid högkonjunktur kan P/E se lågt ut (hög vinst), men då kan det faktiskt vara dyrt eftersom vinsten snart kan falla.',
      points: 20
    }
  ]
};

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

const COURSE_STRUCTURE: Chapter[] = [
  {
    chapter: 'Kom igång',
    duration: '15 min',
    lessons: [
      { 
        id: 'intro', 
        title: 'Välkommen till P/E-tal', 
        duration: '2:30', 
        type: 'video',
        description: 'En introduktion till kursen och vad du kommer att lära dig'
      },
      { 
        id: 'overview', 
        title: 'Kursöversikt och förväntningar', 
        duration: '3:45', 
        type: 'video',
        description: 'Översikt över kursens struktur och vad som förväntas av dig'
      },
      { 
        id: 'why-pe-matters', 
        title: 'Varför P/E-tal är viktigt', 
        duration: '5:20', 
        type: 'video',
        description: 'Förstå varför P/E-tal är ett av de mest använda värderingsverktygen'
      }
    ]
  },
  {
    chapter: 'Grunderna',
    duration: '60 min',
    lessons: [
      { 
        id: 'vad-ar-pe-tal', 
        title: 'Vad är P/E-tal?', 
        duration: '8:20', 
        type: 'video',
        description: 'Grundläggande förklaring av vad P/E-tal är och hur det beräknas'
      },
      { 
        id: 'formula', 
        title: 'Formeln förklarad i detalj', 
        duration: '6:15', 
        type: 'video',
        description: 'Djupdykning i P/E-formelns komponenter'
      },
      { 
        id: 'trailing-vs-forward', 
        title: 'Trailing vs Forward P/E', 
        duration: '7:40', 
        type: 'video',
        description: 'Skillnaden mellan historisk och framåtblickande P/E'
      },
      { 
        id: 'calculator-demo', 
        title: 'Kalkylator-demonstration', 
        duration: '6:40', 
        type: 'video',
        description: 'Lär dig använda P/E-kalkylatorn steg för steg'
      },
      { 
        id: 'calculator-exercise', 
        title: 'Övning: Använd kalkylatorn', 
        duration: '10:00', 
        type: 'interactive',
        description: 'Praktisk övning där du räknar P/E-tal själv'
      },
      { 
        id: 'quiz-grunderna', 
        title: 'Quiz: Grunderna', 
        duration: '15:00', 
        type: 'quiz',
        description: 'Testa dina kunskaper om P/E-tal grunderna',
        content: QUIZ_DATA_GRUNDERNA
      }
    ]
  },
  {
    chapter: 'Praktisk tillämpning',
    duration: '70 min',
    lessons: [
      { 
        id: 'tolka-hoga-pe', 
        title: 'Tolka höga P/E-tal', 
        duration: '9:30', 
        type: 'video',
        description: 'Vad betyder det när ett företag har högt P/E-tal?'
      },
      { 
        id: 'tolka-laga-pe', 
        title: 'Tolka låga P/E-tal', 
        duration: '8:15', 
        type: 'video',
        description: 'Är lågt P/E alltid bra? Lär dig tolka signalerna'
      },
      { 
        id: 'bransch-jamforelse', 
        title: 'Jämföra olika branscher', 
        duration: '11:30', 
        type: 'video',
        description: 'Förstå varför olika branscher har olika P/E-nivåer'
      },
      { 
        id: 'kortbolaget-exempel', 
        title: 'Case: Kortbolaget AB', 
        duration: '14:15', 
        type: 'video',
        description: 'Verkligt exempel: Analysera ett svenskt företag'
      },
      { 
        id: 'hog-vs-lag-pe', 
        title: 'Högt vs lågt P/E-tal - sammanfattning', 
        duration: '8:45', 
        type: 'video',
        description: 'Sammanfattning av när högt/lågt P/E är bra eller dåligt'
      },
      { 
        id: 'quiz-praktik', 
        title: 'Quiz: Praktisk tillämpning', 
        duration: '18:00', 
        type: 'quiz',
        description: 'Testa din förmåga att tillämpa P/E-tal i praktiken',
        content: QUIZ_DATA_PRAKTISK
      }
    ]
  },
  {
    chapter: 'Avancerade koncept',
    duration: '65 min',
    lessons: [
      { 
        id: 'peg-ratio', 
        title: 'PEG-talet (P/E to Growth)', 
        duration: '10:20', 
        type: 'video',
        description: 'Lär dig om PEG-talet för att justera för tillväxt'
      },
      { 
        id: 'foretagsvardering', 
        title: 'Företagsvärdering med P/E', 
        duration: '12:20', 
        type: 'video',
        description: 'Använd P/E för att värdera hela företag'
      },
      { 
        id: 'cykliska-bolag', 
        title: 'P/E-tal för cykliska bolag', 
        duration: '9:15', 
        type: 'video',
        description: 'Särskilda överväganden för cykliska branscher'
      },
      { 
        id: 'anvanda-pe-strategier', 
        title: 'Investeringsstrategier med P/E', 
        duration: '13:45', 
        type: 'video',
        description: 'Hur professionella investerare använder P/E-tal'
      },
      { 
        id: 'fallgropar', 
        title: 'Vanliga fallgropar att undvika', 
        duration: '7:30', 
        type: 'video',
        description: 'Misstag som nybörjare ofta gör med P/E-tal'
      },
      { 
        id: 'slutprov', 
        title: 'Slutprov: P/E-tal Mastery', 
        duration: '25:00', 
        type: 'quiz',
        description: 'Visa att du behärskar P/E-tal på djupet',
        content: QUIZ_DATA_AVANCERAT
      }
    ]
  },
  {
    chapter: 'Bonusmaterial',
    duration: '30 min',
    lessons: [
      { 
        id: 'andra-multiplar', 
        title: 'Andra värderingsmultiplar', 
        duration: '12:00', 
        type: 'video',
        description: 'P/B, EV/EBIT, P/S och andra nyckeltal'
      },
      { 
        id: 'verktyg-resources', 
        title: 'Verktyg och resurser', 
        duration: '8:00', 
        type: 'video',
        description: 'Var hittar man P/E-data och andra verktyg?'
      },
      { 
        id: 'next-steps', 
        title: 'Nästa steg i din investeringsresa', 
        duration: '10:00', 
        type: 'video',
        description: 'Vad ska du lära dig härnäst?'
      }
    ]
  }
];

const RELATED_COURSES: RelatedCourse[] = [
  {
    title: 'Fundamental analys för nybörjare',
    instructor: 'Erik Johansson',
    duration: '2h 15m',
    rating: 4.8,
    students: '12,453',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop'
  },
  {
    title: 'Teknisk analys: Diagram och mönster',
    instructor: 'Maria Andersson',
    duration: '3h 45m',
    rating: 4.7,
    students: '8,921',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop'
  },
  {
    title: 'Aktieportfölj: Bygg din strategi',
    instructor: 'Lars Nilsson',
    duration: '1h 50m',
    rating: 4.9,
    students: '15,234',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
  }
];

const NEXT_STEPS = [
  'Läs årsredovisningar för 5 olika företag och jämför deras P/E-tal',
  'Jämför P/E-tal inom samma bransch på Nasdaq Stockholm',
  'Använd kalkylatorn på verkliga aktier från din watchlist',
  'Beräkna PEG-tal för 3 tillväxtbolag',
  'Ta kursen: Fundamental analys för nybörjare'
];

const KEY_LEARNINGS = [
  'Förstå vad P/E-tal betyder och hur det beräknas korrekt',
  'Tolka höga och låga P/E-tal i rätt kontext',
  'Jämföra företag inom samma bransch med P/E',
  'Använda både Trailing och Forward P/E',
  'Undvika vanliga fallgropar när du analyserar P/E-tal',
  'Integrera P/E-tal i din investeringsstrategi'
];

// ==================== UTILITY FUNCTIONS ====================
const calculateProgress = (completed: Set<string>, total: number): number => {
  return (completed.size / total) * 100;
};

const getTotalLessons = (structure: Chapter[]): number => {
  return structure.reduce((sum, ch) => sum + ch.lessons.length, 0);
};

const getLessonIcon = (type: Lesson['type'], isCompleted: boolean) => {
  if (isCompleted) {
    return <CheckCircle className="w-4 h-4 text-[#FF5421]" />;
  }
  
  switch (type) {
    case 'video':
      return <Play className="w-4 h-4 text-gray-500" />;
    case 'quiz':
      return <Brain className="w-4 h-4 text-gray-500" />;
    case 'interactive':
      return <Calculator className="w-4 h-4 text-gray-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};

// ==================== MAIN COMPONENT ====================
const LinkedInStylePETalModule: React.FC = () => {
  // State
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['intro']));
  const [notes, setNotes] = useState<string>('');
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const [quizScore, setQuizScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);

  const [userData] = useState<UserData>({
    name: 'Anna Svensson',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Svensson&background=FF5421&color=fff',
    totalPoints: 450,
  });

  // Computed values
  const totalLessons = getTotalLessons(COURSE_STRUCTURE);
  const progressPercentage = calculateProgress(completedLessons, totalLessons);

  // Get current lesson
  const getCurrentLesson = useCallback((): Lesson => {
    for (const chapter of COURSE_STRUCTURE) {
      const lesson = chapter.lessons.find(l => l.id === activeSection);
      if (lesson) return lesson;
    }
    return COURSE_STRUCTURE[0].lessons[0];
  }, [activeSection]);

  const currentLesson = getCurrentLesson();

  // Handlers
  const handleLessonClick = useCallback((lessonId: string) => {
    setActiveSection(lessonId);
    setCurrentTime(0);
    setIsPlaying(false);
    setActiveTab('overview'); // Reset to overview when changing lesson
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const toggleChapter = useCallback((chapterIndex: number) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterIndex)) {
        newSet.delete(chapterIndex);
      } else {
        newSet.add(chapterIndex);
      }
      return newSet;
    });
  }, []);

  const markLessonComplete = useCallback(() => {
    setCompletedLessons(prev => new Set([...prev, activeSection]));
  }, [activeSection]);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  }, []);

  const handleQuizComplete = useCallback((score: number, maxScore: number) => {
    console.log(`Quiz completed! Score: ${score}/${maxScore}`);
    markLessonComplete();
  }, [markLessonComplete]);

  const handleQuizScoreUpdate = useCallback((score: number, correct: number, incorrect: number) => {
    setQuizScore(score);
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
  }, []);

  // Auto-save notes
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (notes) {
        localStorage.setItem(`course-notes-${activeSection}`, notes);
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [notes, activeSection]);

  // Load notes for current lesson
  useEffect(() => {
    const savedNotes = localStorage.getItem(`course-notes-${activeSection}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [activeSection]);

  // Render quiz if current lesson is a quiz
  const renderLessonContent = () => {
    if (currentLesson.type === 'quiz' && currentLesson.content) {
      return (
        <div className="p-6">
          <LinkedInCourseQuiz
            quizData={currentLesson.content}
            onComplete={handleQuizComplete}
            onScoreUpdate={handleQuizScoreUpdate}
          />
        </div>
      );
    }

    // Otherwise render video player (for video/interactive lessons)
    return (
      <>
        {/* Video Player Section */}
        <div className="bg-black relative">
          <div className="relative aspect-video">
            {/* Video Thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&h=1080&fit=crop"
              alt="Video lektion"
              className="w-full h-full object-cover"
            />

            {/* Play Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:bg-white transition-colors"
                    aria-label="Spela upp video"
                  >
                    <Play className="w-8 h-8 text-[#FF5421] ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pausa" : "Spela"}
                  className="hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button aria-label="Hoppa bakåt 10 sekunder" className="hover:scale-110 transition-transform">
                  <SkipBack className="w-5 h-5 text-white" />
                </button>
                <button aria-label="Hoppa framåt 10 sekunder" className="hover:scale-110 transition-transform">
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
                <button aria-label="Volym" className="hover:scale-110 transition-transform">
                  <Volume2 className="w-5 h-5 text-white" />
                </button>

                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
                    <div className="h-full bg-[#FF5421]" style={{ width: '30%' }} />
                  </div>
                </div>

                <span className="text-white text-sm font-mono">1:25 / {currentLesson.duration}</span>

                {/* Speed Control */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-white text-sm px-2 py-1 hover:bg-white/20 rounded transition-colors"
                    aria-label="Ändra uppspelningshastighet"
                  >
                    {playbackSpeed}x
                  </button>
                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-xl py-1 min-w-[80px]"
                      >
                        {PLAYBACK_SPEEDS.map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors ${
                              playbackSpeed === speed ? 'bg-gray-700 font-medium' : ''
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button aria-label="Inställningar" className="hover:scale-110 transition-transform">
                  <Settings className="w-5 h-5 text-white" />
                </button>
                <button aria-label="Helskärm" className="hover:scale-110 transition-transform">
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex space-x-8 px-6" role="tablist">
            {[
              { id: 'overview' as const, label: 'Översikt', icon: BookOpen },
              { id: 'notebook' as const, label: 'Anteckningar', icon: Edit3 },
              { id: 'transcript' as const, label: 'Transkription', icon: MessageSquare }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#FF5421] text-[#FF5421]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - 2/3 */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {currentLesson.title}
                      </h2>
                      <p className="text-gray-600">
                        {currentLesson.description || 'Lär dig hur P/E-tal fungerar och hur du kan använda det för att värdera aktier.'}
                      </p>
                    </div>

                    {/* Course Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>8,432 studerande</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>3h 50m total längd</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8 (573 betyg)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{totalLessons} lektioner</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Instruktör</h3>
                      <div className="flex items-center space-x-3">
                        <img
                          src={userData.avatar}
                          alt="Tomas Malmborg"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Tomas Malmborg</p>
                          <p className="text-sm text-gray-600">Utbildningsansvarig, Aktiekörkortet</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Vad du kommer lära dig</h3>
                      <ul className="space-y-2">
                        {KEY_LEARNINGS.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-[#FF5421] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mark as Complete Button */}
                    {!completedLessons.has(activeSection) && currentLesson.type !== 'quiz' && (
                      <div className="border-t border-gray-200 pt-6">
                        <button
                          onClick={markLessonComplete}
                          className="w-full bg-[#FF5421] text-white px-6 py-3 rounded-lg hover:bg-[#E04A1D] transition-colors font-medium flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Markera som slutförd</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'notebook' && (
                  <motion.div
                    key="notebook"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Dina anteckningar</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Anteckningar sparas automatiskt för varje lektion
                    </p>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Skriv dina anteckningar här..."
                      className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent resize-none"
                      aria-label="Anteckningar"
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        💾 Sparar automatiskt
                      </p>
                      <p className="text-xs text-gray-500">
                        {notes.length} tecken
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'transcript' && (
                  <motion.div
                    key="transcript"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Transkription</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Klicka på en tidsstämpel för att hoppa till den delen av videon
                    </p>
                    <div className="space-y-3 text-gray-700">
                      {[
                        { time: '0:00', text: 'Välkommen till denna lektion om P/E-tal. Idag ska vi lära oss grunderna i hur man använder detta fundamentala nyckeltal för att värdera aktier.' },
                        { time: '0:18', text: 'P/E står för Price to Earnings, vilket betyder aktiens pris delat med vinsten per aktie. Det är ett av de mest använda nyckeltalen inom aktieinvestering.' },
                        { time: '0:45', text: 'För att förstå detta koncept behöver vi först förstå vad vinst per aktie betyder. Vinst per aktie, eller EPS (Earnings Per Share), är företagets totala vinst delat på antalet utestående aktier.' },
                        { time: '1:20', text: 'Låt oss ta ett konkret exempel. Om en aktie kostar 100 kronor och företaget tjänar 10 kronor per aktie, så blir P/E-talet 100 delat med 10, vilket är 10.' },
                        { time: '2:05', text: 'Ett högt P/E-tal kan betyda att marknaden förväntar sig stark tillväxt i framtiden. Men det kan också betyda att aktien är övervärderad. Därför måste vi alltid se till kontexten.' }
                      ].map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left hover:bg-gray-50 p-3 rounded transition-colors"
                          onClick={() => {/* Jump to timestamp logic */}}
                        >
                          <span className="text-[#FF5421] font-mono text-sm mr-3 font-medium">
                            {item.time}
                          </span>
                          <span className="text-gray-700">{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar - 1/3 */}
            <div className="space-y-6">
              {/* Next Steps */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Nästa steg</h3>
                <ul className="space-y-2">
                  {NEXT_STEPS.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ChevronRight className="w-4 h-4 text-[#FF5421] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Courses */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Relaterade kurser</h3>
                <div className="space-y-4">
                  {RELATED_COURSES.map((course, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex space-x-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-24 h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {course.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">{course.instructor}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{course.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Växla sidofält"
              >
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF5421] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-semibold text-gray-900">P/E-tal: Värdera aktier som proffsen</h1>
                  <p className="text-xs text-gray-500">Tomas Malmborg</p>
                </div>
              </div>
            </div>

            {/* Center - Progress */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-[#FF5421]"
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {completedLessons.size}/{totalLessons}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Bokmärk kurs"
              >
                <Bookmark className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Dela kurs"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button className="hidden sm:flex items-center space-x-2 bg-[#FF5421] text-white px-4 py-2 rounded-lg hover:bg-[#E04A1D] transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Ladda ner certifikat</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Contents */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 bg-[#1D2226] text-white overflow-y-auto border-r border-gray-700 hidden lg:block"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Innehåll</span>
                  </h2>
                  <button
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    aria-label="Stäng sidofält"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Course Progress Overview */}
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Framsteg</span>
                    <span className="text-[#FF5421] font-semibold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-[#FF5421]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {completedLessons.size} av {totalLessons} lektioner slutförda
                  </p>
                </div>

                {/* Chapters */}
                <nav className="space-y-2" aria-label="Kursinnehåll">
                  {COURSE_STRUCTURE.map((chapter, chapterIndex) => {
                    const isExpanded = expandedChapters.has(chapterIndex);
                    const chapterLessons = chapter.lessons;
                    const completedInChapter = chapterLessons.filter(l => completedLessons.has(l.id)).length;
                    
                    return (
                      <div key={chapterIndex} className="border-b border-gray-700 pb-2">
                        <button
                          onClick={() => toggleChapter(chapterIndex)}
                          className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded transition-colors"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: isExpanded ? 0 : -90 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </motion.div>
                            <span className="font-medium text-sm">{chapter.chapter}</span>
                            <span className="text-xs text-gray-500">
                              ({completedInChapter}/{chapterLessons.length})
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{chapter.duration}</span>
                        </button>

                        {/* Lessons */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 mt-1 space-y-1 overflow-hidden"
                            >
                              {chapter.lessons.map((lesson) => {
                                const isActive = activeSection === lesson.id;
                                const isCompleted = completedLessons.has(lesson.id);
                                
                                return (
                                  <button
                                    key={lesson.id}
                                    onClick={() => handleLessonClick(lesson.id)}
                                    className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                                      isActive
                                        ? 'bg-gray-700 text-white'
                                        : 'hover:bg-gray-800 text-gray-300'
                                    }`}
                                    aria-current={isActive ? 'page' : undefined}
                                  >
                                    <div className="flex items-center space-x-2">
                                      {getLessonIcon(lesson.type, isCompleted)}
                                      <span className="text-sm text-left">{lesson.title}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                      {lesson.duration}
                                    </span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderLessonContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LinkedInStylePETalModule;
