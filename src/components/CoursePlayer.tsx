import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, FileText, CheckCircle, Trophy, ChevronRight, ChevronDown,
  Clock, Award, BookOpen, Lock, ArrowLeft
} from 'lucide-react';
import { supabase } from '../services/supabase';

const CoursePlayer = ({ courseSlug, userId }) => {
  const [course, setCourse] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState([0]);

  // Ladda kurs från Supabase
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        // Hämta kursen
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', courseSlug)
          .single();

        if (courseError) throw courseError;

        // Hämta sections och lessons
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('sections')
          .select(`
            *,
            lessons (*)
          `)
          .eq('course_id', courseData.id)
          .order('section_order');

        if (sectionsError) throw sectionsError;

        // Formatera data
        const formattedSections = sectionsData.map(section => ({
          ...section,
          lessons: section.lessons.sort((a, b) => a.lesson_order - b.lesson_order)
        }));

        setCourse({
          ...courseData,
          sections: formattedSections
        });

        // Ladda användarens progress om userId finns
        if (userId) {
          const { data: progressData } = await supabase
            .from('user_course_progress')
            .select('completed_lessons')
            .eq('user_id', userId)
            .eq('course_id', courseData.id)
            .single();

          if (progressData) {
            setCompletedLessons(progressData.completed_lessons || []);
          }
        }

      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug, userId]);

  // Markera lektion som slutförd
  const markLessonComplete = async (lessonId) => {
    if (!userId || completedLessons.includes(lessonId)) return;

    const newCompletedLessons = [...completedLessons, lessonId];
    setCompletedLessons(newCompletedLessons);

    // Spara till databas
    try {
      const { error } = await supabase
        .from('user_course_progress')
        .upsert({
          user_id: userId,
          course_id: course.id,
          completed_lessons: newCompletedLessons,
          last_accessed: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Gå till nästa lektion
  const goToNextLesson = () => {
    const currentSectionData = course.sections[currentSection];
    
    if (currentLesson < currentSectionData.lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    } else if (currentSection < course.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentLesson(0);
      setExpandedSections([currentSection + 1]);
    }
  };

  // Växla sektion expansion
  const toggleSection = (index) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Rendrera olika lektionstyper
  const renderLessonContent = (lesson) => {
    switch (lesson.lesson_type) {
      case 'video':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{lesson.title}</h2>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={lesson.video_url}
                title={lesson.title}
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {lesson.content && (
              <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/30">
                <p className="text-white/90 leading-relaxed">{lesson.content}</p>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{lesson.title}</h2>
            <div 
              className="bg-purple-500/20 rounded-xl p-8 border border-purple-400/30"
              dangerouslySetInnerHTML={{ __html: lesson.html_content || lesson.content }}
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">{lesson.title}</h2>
            <div className="bg-yellow-500/20 rounded-xl p-8 border border-yellow-400/30">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Quiz</h3>
              </div>
              <p className="text-white/80 mb-4">
                Testa dina kunskaper från denna sektion!
              </p>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Starta Quiz
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{lesson.title}</h2>
            <p className="text-white/70">Lektionstyp: {lesson.lesson_type}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-white border-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 text-lg font-light tracking-wide">Laddar kurs...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Kursen kunde inte hittas</p>
        </div>
      </div>
    );
  }

  const currentSectionData = course.sections[currentSection];
  const currentLessonData = currentSectionData?.lessons[currentLesson];
  const totalLessons = course.sections.reduce((acc, s) => acc + s.lessons.length, 0);
  const progress = (completedLessons.length / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      <div className="flex h-screen">
        {/* Sidebar - Course Navigation */}
        <div className="w-80 bg-purple-900/40 backdrop-blur-xl border-r border-purple-500/30 overflow-y-auto">
          <div className="p-6">
            {/* Course Header */}
            <div className="mb-6">
              <button className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                Tillbaka
              </button>
              <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Clock className="w-4 h-4" />
                <span>{course.duration_hours}h</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6 bg-purple-500/20 rounded-xl p-4 border border-purple-400/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-300 text-sm">Din progress</span>
                <span className="text-white font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Sections & Lessons */}
            <div className="space-y-2">
              {course.sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-purple-500/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className="w-full p-4 flex items-center justify-between hover:bg-purple-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-purple-300" />
                      <div className="text-left">
                        <div className="text-white font-medium">
                          Sektion {sectionIndex + 1}: {section.title}
                        </div>
                        <div className="text-xs text-purple-300">
                          {section.lessons.length} lektioner
                        </div>
                      </div>
                    </div>
                    {expandedSections.includes(sectionIndex) ? (
                      <ChevronDown className="w-5 h-5 text-purple-300" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-purple-300" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(sectionIndex) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 space-y-1">
                          {section.lessons.map((lesson, lessonIndex) => {
                            const isCompleted = completedLessons.includes(lesson.id);
                            const isCurrent = sectionIndex === currentSection && lessonIndex === currentLesson;
                            
                            const LessonIcon = 
                              lesson.lesson_type === 'video' ? Play :
                              lesson.lesson_type === 'text' ? FileText :
                              lesson.lesson_type === 'quiz' ? Trophy :
                              BookOpen;

                            return (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  setCurrentSection(sectionIndex);
                                  setCurrentLesson(lessonIndex);
                                }}
                                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                                  isCurrent
                                    ? 'bg-yellow-400/20 border border-yellow-400/50'
                                    : 'hover:bg-purple-500/20'
                                }`}
                              >
                                <div className={`p-2 rounded-lg ${
                                  isCurrent ? 'bg-yellow-400/30' : 'bg-purple-500/20'
                                }`}>
                                  <LessonIcon className={`w-4 h-4 ${
                                    isCurrent ? 'text-yellow-400' : 'text-purple-300'
                                  }`} />
                                </div>
                                
                                <div className="flex-1 text-left">
                                  <div className={`text-sm ${
                                    isCurrent ? 'text-white font-medium' : 'text-purple-200'
                                  }`}>
                                    {lesson.title}
                                  </div>
                                  {lesson.video_duration && (
                                    <div className="text-xs text-purple-300">
                                      {lesson.video_duration} min
                                    </div>
                                  )}
                                </div>

                                {isCompleted && (
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSection}-${currentLesson}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-purple-900/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8"
              >
                {currentLessonData && renderLessonContent(currentLessonData)}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-purple-500/30">
                  <button
                    onClick={() => {
                      if (currentLesson > 0) {
                        setCurrentLesson(prev => prev - 1);
                      } else if (currentSection > 0) {
                        setCurrentSection(prev => prev - 1);
                        setCurrentLesson(course.sections[currentSection - 1].lessons.length - 1);
                      }
                    }}
                    disabled={currentSection === 0 && currentLesson === 0}
                    className="px-6 py-3 bg-purple-500/20 text-white rounded-lg hover:bg-purple-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Föregående
                  </button>

                  <div className="flex gap-3">
                    {!completedLessons.includes(currentLessonData?.id) && (
                      <button
                        onClick={() => markLessonComplete(currentLessonData?.id)}
                        className="px-6 py-3 bg-green-500/20 text-green-300 border border-green-400/30 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Markera som slutförd
                      </button>
                    )}

                    <button
                      onClick={goToNextLesson}
                      disabled={
                        currentSection === course.sections.length - 1 &&
                        currentLesson === currentSectionData.lessons.length - 1
                      }
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                    >
                      Nästa
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;