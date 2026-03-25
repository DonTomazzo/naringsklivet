import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import SoloQuizComponent from '../components/SoloQuizComponent';
import CoursePlayer from '../components/CoursePlayer';
import githubquizzes from '../data/githubquizzes'; // Din mockdata

const Course = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [courseType, setCourseType] = useState(null); // 'quiz' eller 'course'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Försök först hitta i mockdata (dina gamla quizzes)
        const mockQuiz = githubquizzes.find(q => q.slug === slug);
        
        if (mockQuiz) {
          setCourseData(mockQuiz);
          setCourseType('quiz');
          setLoading(false);
          return;
        }

        // Annars, hämta från Supabase (nya kurser från CourseBuilder)
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (data) {
          setCourseType('course');
          setLoading(false);
        }

      } catch (error) {
        console.error('Error loading course:', error);
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Laddar...</div>
    </div>;
  }

  // Rendera rätt komponent baserat på typ
  if (courseType === 'quiz') {
    return <SoloQuizComponent quizData={courseData} />;
  }

  if (courseType === 'course') {
    return <CoursePlayer courseSlug={slug} userId="current-user-id" />;
  }

  return <div className="min-h-screen flex items-center justify-center">
    <div className="text-white">Kursen hittades inte</div>
  </div>;
};

export default Course;