import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import LeaderboardComponent from './Leaderboard';
import QuizResultModal from './QuizResultModal'; 
import { useSound } from '../hooks/useSound';
import { VideoLesson } from './VideoLesson';
import CollapsibleSidebar from './CollapsibleSidebar'; 
import { TextLesson } from './TextLesson';

const DEFAULT_QUIZ_BACKGROUND = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80';

interface SoloQuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  question_order: number;
  options?: any;
  correct_answer?: any;
  explanation?: string;
  points: number;
  video_url?: string;
  pause_content?: string;
}

interface QuizStatsSidebarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore: number;
  streak: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

interface SoloQuizData {
  id: string;
  title: string;
  slug: string;
  questions: SoloQuizQuestion[];
  userid: string;
  image_url?: string;
}

interface SoloQuizComponentProps {
  quizData: SoloQuizData;
}

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
}

// ✨ NY KOMPONENT - MobileStatsBar
const MobileStatsBar: React.FC<{
  score: number;
  maxScore: number;
  streak: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentQuestion: number;
  totalQuestions: number;
}> = ({
  score,
  maxScore,
  streak,
  correctAnswers,
  incorrectAnswers,
  currentQuestion,
  totalQuestions
}) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="lg:hidden mb-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#FF5421] to-[#FF7851] rounded-xl px-4 py-2">
            <span className="text-white font-bold text-lg">{score}</span>
            <span className="text-white/70 text-sm">/{maxScore}</span>
          </div>
          <div className="text-white/60 text-sm">
            {Math.round(percentage)}%
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xl">🔥</span>
            <span className="text-white font-bold">{streak}</span>
          </div>
          <div className="text-white/60 text-sm">
            {currentQuestion}/{totalQuestions}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
  <div className="flex-1 bg-[#FF5421]/10 rounded-lg px-3 py-2 border border-[#FF5421]/30 flex items-center justify-between">
    <span className="text-[#FF5421] text-xs font-medium">Rätt</span>
    <span className="text-white font-bold">{correctAnswers}</span>
  </div>
  <div className="flex-1 bg-[#171f32]/50 rounded-lg px-3 py-2 border border-[#171f32]/70 flex items-center justify-between">
    <span className="text-slate-300 text-xs font-medium">Fel</span>
    <span className="text-white font-bold">{incorrectAnswers}</span>
        </div>
      </div>
    </motion.div>
  );
};

const QuizStatsSidebar: React.FC<QuizStatsSidebarProps> = ({
  currentQuestion,
  totalQuestions,
  score,
  maxScore,
  streak,
  correctAnswers,
  incorrectAnswers
}) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const accuracy = (correctAnswers + incorrectAnswers) > 0 
    ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100 
    : 0;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-80 bg-slate-800/60 backdrop-blur-xl border-r border-slate-600/30 p-6 hidden lg:block"
    >
      <div className="flex flex-col h-full">
    <div className="mb-8">
        {/* Använder flex och justify-between för att placera elementen längst ut på kanten */}
        <div className="flex items-center justify-between"> 
            
            {/* Rubriken till VÄNSTER */}
            <h2 className="text-2xl font-bold text-white">Din kompetensutveckling</h2>

            {/* Logotypen till HÖGER */}
            <img 
                src="/logo.png" 
                alt="Din företagslogotyp" 
                className="w-8 h-8 rounded-full" // Behåller storleken
            />
        </div>
        <p className="text-slate-300 text-sm">Följ dina framsteg live</p>
    </div>
    <motion.div
        className="bg-slate-800/90 rounded-2xl p-6 mb-6 shadow-lg border border-slate-700/50"
        whileHover={{ scale: 1.02 }}
        >
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

const SoloQuizComponent: React.FC<SoloQuizComponentProps> = ({ quizData }) => {
  const [isSidebarMaximized, setIsSidebarMaximized] = useState(true); 
  const [questions, setQuestions] = useState<SoloQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [blankInput, setBlankInput] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [videoTimer, setVideoTimer] = useState(0);
  const MINIMUM_VIDEO_DURATION = 10;
  
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const { initializeSounds, playCorrect, playIncorrect, playFinished } = useSound();

  const toggleSidebar = () => {
    setIsSidebarMaximized(prev => !prev);
  };

  useEffect(() => {
    initializeSounds();
  }, [initializeSounds]);

  useEffect(() => {
    if (questions.length > 0 && !startTime) {
      setStartTime(new Date());
    }
  }, [questions, startTime]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const actualQuestions = questions.filter(q => !['videolesson', 'textlesson'].includes(q.question_type));
  const currentActualQuestionIndex = questions.slice(0, currentQuestionIndex + 1)
    .filter(q => !['videolesson', 'textlesson'].includes(q.question_type)).length;
  const totalActualQuestions = actualQuestions.length;

  const isLessonType = currentQuestion && ['videolesson', 'textlesson'].includes(currentQuestion.question_type);

  const fetchSoloQuiz = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const quizQuestions = quizData.questions
        .sort((a, b) => a.question_order - b.question_order);
      setQuestions(quizQuestions);
      setStartTime(new Date());
      loadQuestion(quizQuestions, 0);
    } catch (err) {
      console.error('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  }, [quizData]);

  const loadQuestion = useCallback((q: SoloQuizQuestion[], index: number) => {
    if (index >= q.length) {
      setQuizCompleted(true);
      return;
    }
    setFeedback(null);
    setFeedbackMessage('');
    setIsCorrect(false);
    setSelectedOption(null);
    setSelectedOptions([]);
    setBlankInput('');
    setSelectedWords([]);
    setVideoTimer(0);
    const currentQ = q[index];
    if (currentQ.question_type === 'order_sequence' && currentQ.options?.wordBank) {
      const shuffledWords = [...currentQ.options.wordBank];
      for (let i = shuffledWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
      }
      setAvailableWords(shuffledWords);
    }
  }, []);

  const selectOption = (optionText: string) => {
    if (feedback === null && !isLessonType) {
      if (currentQuestion.question_type === 'multiple_choice') {
        setSelectedOptions(prev =>
          prev.includes(optionText)
            ? prev.filter(opt => opt !== optionText)
            : [...prev, optionText]
        );
      } else {
        setSelectedOption(optionText);
      }
    }
  };

  const addWord = (word: string, index: number) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const removeWord = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const checkAnswer = useCallback(() => {
    if (feedback !== null || !currentQuestion || isLessonType) return;
    let isAnswerCorrect = false;
    const correctAnswer = currentQuestion.correct_answer;
    switch (currentQuestion.question_type) {
      case 'single_choice':
      case 'true_false': {
        isAnswerCorrect = selectedOption === correctAnswer;
        break;
      }
      case 'multiple_choice': {
        if (Array.isArray(correctAnswer)) {
          isAnswerCorrect = selectedOptions.length === correctAnswer.length &&
            selectedOptions.every(opt => correctAnswer.includes(opt));
        }
        break;
      }
      case 'fill_blank': {
        isAnswerCorrect = blankInput.trim().toLowerCase() ===
          (typeof correctAnswer === 'string' ? correctAnswer.trim().toLowerCase() : '');
        break;
      }
      case 'order_sequence': {
        if (Array.isArray(correctAnswer)) {
          isAnswerCorrect = selectedWords.length === correctAnswer.length &&
            selectedWords.every((word, index) => word === correctAnswer[index]);
        }
        break;
      }
    }
    if (isAnswerCorrect) {
      playCorrect();
      setFeedback('correct');
      setFeedbackMessage('Rätt svar!');
      setIsCorrect(true);
      setScore(prev => prev + currentQuestion.points);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      playIncorrect();
      setFeedback('incorrect');
      setFeedbackMessage('Fel svar');
      setIsCorrect(false);
      setIncorrectAnswers(prev => prev + 1);
      setStreak(0);
    }
  }, [currentQuestion, selectedOption, selectedOptions, blankInput, selectedWords, feedback, isLessonType, playCorrect, playIncorrect]);

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      loadQuestion(questions, currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

 const finishQuiz = () => {
  let finalTime = timeTaken;
  
  if (startTime) {
    const endTime = new Date();
    const seconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    setTimeTaken(seconds);
    finalTime = seconds; // Använd detta värde direkt
  }
  
  console.log('Quiz finished:', {
    score,
    correctAnswers,
    incorrectAnswers,
    streak,
    timeTaken: finalTime
  });
  
  setQuizCompleted(true);
  playFinished();
  setShowNameInput(true);
  
  setTimeout(() => {
    setShowResultModal(true);
  }, 500);
};

  const saveQuizResult = async (name: string) => {
  const finalTime = startTime 
    ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) 
    : timeTaken; // Beräkna igen för säkerhets skull
  
  const maxScore = actualQuestions.reduce((sum, q) => sum + q.points, 0);
  
  console.log('Saving result:', {
    score,
    maxScore,
    correctAnswers,
    incorrectAnswers,
    streak,
    timeTaken: finalTime
  });
  
  try {
    const { error } = await supabase
      .from('quiz_leaderboard')
      .insert({
        quiz_slug: quizData.slug,
        player_name: name,
        score: score,
        max_score: maxScore,
        percentage: (score / maxScore) * 100,
        time_taken_seconds: finalTime,
        correct_answers: correctAnswers,
        incorrect_answers: incorrectAnswers,
        streak: streak
      });
    
    if (error) {
      console.error('Error saving result:', error);
      return false;
    }
    
    setShowNameInput(false);
    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
};

  const startQuiz = useCallback(() => {
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setQuizCompleted(false);
    setShowResultModal(false);
    setStartTime(null);
    setStreak(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setVideoTimer(0);
    fetchSoloQuiz();
  }, [fetchSoloQuiz]);

  const handleRedoQuiz = () => {
    setShowResultModal(false);
    startQuiz();
  };

  const handleGoBack = () => {
    setShowResultModal(false);
    startQuiz();
  };

  const checkButtonDisabled = useMemo(() => {
    if (!currentQuestion || feedback !== null || isLessonType) return true;
    switch (currentQuestion.question_type) {
      case 'single_choice':
      case 'true_false':
        return selectedOption === null;
      case 'multiple_choice':
        return selectedOptions.length === 0;
      case 'fill_blank':
        return blankInput.trim() === '';
      case 'order_sequence':
        if (Array.isArray(currentQuestion.correct_answer)) {
          return selectedWords.length !== currentQuestion.correct_answer.length;
        }
        return selectedWords.length === 0;
      default:
        return true;
    }
  }, [currentQuestion, feedback, selectedOption, selectedOptions, blankInput, selectedWords, isLessonType]);

  const progressPercentage = useMemo(() => {
    if (totalActualQuestions === 0) return 0;
    return (currentActualQuestionIndex / totalActualQuestions) * 100;
  }, [currentActualQuestionIndex, totalActualQuestions]);

  useEffect(() => {
    fetchSoloQuiz();
  }, [fetchSoloQuiz]);

  useEffect(() => {
    if (isLessonType && currentQuestion.question_type === 'videolesson') {
      setVideoTimer(MINIMUM_VIDEO_DURATION);
      const timer = setInterval(() => {
        setVideoTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLessonType, currentQuestion]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-white border-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 text-lg font-light tracking-wide">Laddar quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${quizData.image_url || DEFAULT_QUIZ_BACKGROUND})`
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <CollapsibleSidebar
          currentQuestion={currentActualQuestionIndex}
          totalQuestions={totalActualQuestions}
          score={score}
          maxScore={actualQuestions.reduce((sum, q) => sum + q.points, 0)}
          streak={streak}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          isSidebarMaximized={isSidebarMaximized} // Skickar tillstånd
          onToggle={toggleSidebar} // Skickar toggle-funktion
        />
        <div className="flex-1 flex items-center justify-center px-6">
          {!showResultModal && !quizCompleted && currentQuestion && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl"
            >
              {/* ✨ NY - MobileStatsBar läggs till här */}
              <MobileStatsBar
                score={score}
                maxScore={actualQuestions.reduce((sum, q) => sum + q.points, 0)}
                streak={streak}
                correctAnswers={correctAnswers}
                incorrectAnswers={incorrectAnswers}
                currentQuestion={currentActualQuestionIndex}
                totalQuestions={totalActualQuestions}
              />
              
              {!isLessonType && (
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-light tracking-wide text-yellow-400">
                      {currentActualQuestionIndex} / {totalActualQuestions}
                    </span>
                    <span className="text-sm font-light text-slate-300">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-slate-400" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
              <div className="relative">
  {isLessonType && currentQuestion.question_type === 'videolesson' && (
  <VideoLesson videoUrl={currentQuestion.video_url || ''} />
)}

{isLessonType && currentQuestion.question_type === 'textlesson' && (
  <TextLesson content={currentQuestion.pause_content || ''} />
)}

  <motion.div
                
  className="backdrop-blur-xl bg-slate-100/95 border border-slate-300 rounded-3xl p-6 shadow-2xl"
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.2 }}
>
  
                  
                  {!isLessonType && (
                    <>
                      <h2 className="text-xl md:text-2xl font-thin text-black mb-8 leading-relaxed text-center">
                        {currentQuestion.question_text}
                      </h2>
                      {(currentQuestion.question_type === 'single_choice' || currentQuestion.question_type === 'true_false') && (
                        <div className="space-y-4 max-w-2xl mx-auto">
                          {currentQuestion.options?.choices?.map((option: string, index: number) => (
                            <motion.button
                              key={index}
                              onClick={() => selectOption(option)}
                              disabled={feedback !== null}
                              className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 font-light text-lg ${
  selectedOption === option
    ? 'border-slate-400 bg-slate-700/30 text-white'
    : 'border-slate-600/30 bg-slate-800/20 text-white hover:border-slate-500/50 hover:bg-slate-700/30'
                              } ${
                                feedback && option === currentQuestion.correct_answer
                                  ? 'border-yellow-400 bg-yellow-500/30 text-black'
                                  : ''
                              } ${
                                feedback && option !== currentQuestion.correct_answer && selectedOption === option
                                  ? 'border-red-400 bg-red-500/20 text-red-200'
                                  : ''
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      )}
                      {currentQuestion.question_type === 'multiple_choice' && (
                        <div className="space-y-4 max-w-2xl mx-auto">
                          {currentQuestion.options?.choices?.map((option: string, index: number) => (
                            <motion.button
                              key={index}
                              onClick={() => selectOption(option)}
                              disabled={feedback !== null}
                              className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 font-light text-lg ${
  selectedOption === option
    ? 'border-slate-400 bg-slate-700/30 text-white'
    : 'border-slate-600/30 bg-slate-800/20 text-white hover:border-slate-500/50 hover:bg-slate-700/30'
                              } ${
                                feedback && Array.isArray(currentQuestion.correct_answer) &&
                                currentQuestion.correct_answer.includes(option)
                                  ? 'border-yellow-400 bg-yellow-500/30 text-white'
                                  : ''
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      )}
                      {currentQuestion.question_type === 'fill_blank' && (
                        <div className="text-center max-w-lg mx-auto">
                          <input
                            type="text"
                            value={blankInput}
                            onChange={(e) => setBlankInput(e.target.value)}
                            disabled={feedback !== null}
                            onKeyUp={(e) => e.key === 'Enter' && checkAnswer()}
                            className={`w-full px-8 py-6 text-2xl bg-slate-800/30 border border-slate-600/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 backdrop-blur-xl font-light text-center ${
    feedback === 'correct' ? 'border-green-400 bg-green-500/20' : ''
  } ${
    feedback === 'incorrect' ? 'border-red-400 bg-red-500/20' : ''
                            }`}
                            placeholder="Skriv ditt svar..."
                          />
                        </div>
                      )}
                      {currentQuestion.question_type === 'order_sequence' && (
                        <div className="space-y-8 max-w-3xl mx-auto">
  <div className="min-h-[120px] p-6 bg-slate-800/20 border border-dashed border-slate-600/30 rounded-2xl">
    <p className="text-slate-300 text-sm mb-4 font-light tracking-wide">DITT SVAR</p>
    <div className="flex flex-wrap gap-3">
      {selectedWords.map((word, index) => (
        <motion.button
          key={`selected-${index}`}
          onClick={() => removeWord(index)}
          disabled={feedback !== null}
          className="px-6 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                                >
                                  {word}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-orange-600 text-sm mb-4 font-light tracking-wide">TILLGÄNGLIGA ORD</p>
                            <div className="flex flex-wrap gap-3">
                              {availableWords.map((word, index) => (
                                <motion.button
                                  key={`bank-${index}`}
                                  onClick={() => addWord(word, index)}
                                  disabled={feedback !== null}
                                  className="px-6 py-3 bg-cyan-900/20 text-white rounded-xl border border-cyan-800/30 font-light hover:bg-fuchsia-500/30 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {word}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
                <AnimatePresence>
                  {feedback && !isLessonType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 z-20 backdrop-blur-2xl bg-slate-900/70 rounded-3xl flex items-center justify-center"
                    >
                      <div className="text-center max-w-2xl mx-auto p-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
                            isCorrect ? 'bg-yellow-500' : 'bg-purple-600'
                          }`}
                        >
                          {isCorrect ? (
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.4 }}
                          className={`text-3xl font-light mb-8 ${
                            isCorrect ? 'text-yellow-300' : 'text-red-300'
                          }`}
                        >
                          {feedbackMessage}
                        </motion.h3>
                        {currentQuestion.explanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="mb-10"
                          >
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                              <p className="text-white/90 text-lg leading-relaxed font-light">
                                <span className="text-white font-medium">Förklaring: </span>
                                {currentQuestion.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.3 }}
                          onClick={nextQuestion}
                          className="bg-white text-black px-12 py-4 rounded-full font-medium tracking-wide hover:bg-white/90 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentQuestionIndex < totalQuestions - 1 ? 'Nästa fråga' : 'Slutför test'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {!feedback && !isLessonType && (
                <motion.div
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
  onClick={checkAnswer}
  disabled={checkButtonDisabled}
  className={`px-12 py-4 rounded-full font-medium tracking-wide transition-all ${
    checkButtonDisabled
      ? 'bg-[#171f32]/50 text-white/30 cursor-not-allowed border border-[#171f32]/70'
      : 'bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white hover:from-[#E04619] hover:to-[#FF5421] border-none shadow-lg shadow-[#FF5421]/30'
  }`}
  whileHover={!checkButtonDisabled ? { scale: 1.05 } : {}}
  whileTap={!checkButtonDisabled ? { scale: 0.95 } : {}}
>
  Kontrollera svar
</motion.button>
                </motion.div>
              )}
              {!feedback && isLessonType && (
                <motion.div
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={nextQuestion}
                    disabled={currentQuestion.question_type === 'videolesson' && videoTimer > 0}
                    className={`px-12 py-4 rounded-full font-medium tracking-wide transition-all ${
                      currentQuestion.question_type === 'videolesson' && videoTimer > 0
                        ? 'bg-purple-500/20 text-white/30 cursor-not-allowed border border-purple-500/20'
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-300 hover:to-yellow-400 border-none shadow-lg shadow-yellow-500/30'
                    }`}
                    whileHover={currentQuestion.question_type === 'videolesson' && videoTimer > 0 ? {} : { scale: 1.05 }}
                    whileTap={currentQuestion.question_type === 'videolesson' && videoTimer > 0 ? {} : { scale: 0.95 }}
                  >
                    {currentQuestion.question_type === 'videolesson' && videoTimer > 0
                      ? `Vänta ${videoTimer}s`
                      : 'Fortsätt'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
        <QuizResultModal
          isOpen={showResultModal}
          score={score}
          maxScore={actualQuestions.reduce((sum, q) => sum + q.points, 0)}
          totalQuestions={totalActualQuestions}
          onRedoQuiz={handleRedoQuiz}
          onGoBack={handleGoBack}
          showNameInput={showNameInput}
          playerName={playerName}
          onPlayerNameChange={setPlayerName}
          onSaveResult={saveQuizResult}
          quizSlug={quizData.slug}
          timeTaken={timeTaken}
          maxStreak={streak}
        />
      </div>
    </div>
  );
};

export default SoloQuizComponent;