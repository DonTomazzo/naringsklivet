export const convertQuizDataToCourseFormat = (quizData) => {
  return {
    id: quizData.id,
    title: quizData.title,
    slug: quizData.slug,
    teacher_id: quizData.userid,
    thumbnail_url: quizData.image_url,
    difficulty_level: 'beginner',
    course_type: 'internal',
    sections: [
      {
        id: `section-${quizData.id}`,
        title: 'Huvudsektion',
        section_order: 0,
        lessons: quizData.questions.map((q, index) => {
          // Konvertera olika frågetyper
          switch (q.question_type) {
            case 'videolesson':
              return {
                id: q.id,
                title: q.question_text,
                lesson_type: 'video',
                lesson_order: index,
                video_url: q.video_url,
                video_duration: 10,
                content: ''
              };
            
            case 'textlesson':
              return {
                id: q.id,
                title: q.question_text,
                lesson_type: 'text',
                lesson_order: index,
                content: q.pause_content,
                html_content: `<p>${q.pause_content}</p>`
              };
            
            default:
              // Quiz-frågor blir quiz-lektioner
              return {
                id: q.id,
                title: q.question_text,
                lesson_type: 'quiz',
                lesson_order: index,
                passing_score: 70,
                max_attempts: 3,
                questions: [{
                  question_text: q.question_text,
                  question_type: q.question_type,
                  question_order: 0,
                  options: q.options?.choices?.map((choice, i) => ({
                    option_text: choice,
                    is_correct: choice === q.correct_answer || 
                               (Array.isArray(q.correct_answer) && q.correct_answer.includes(choice)),
                    option_order: i
                  })) || [],
                  explanation: q.explanation
                }]
              };
          }
        })
      }
    ]
  };
};