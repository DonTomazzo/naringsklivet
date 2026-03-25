export const convertAdaptiveToStandard = (adaptiveQuiz) => {
  return {
    id: adaptiveQuiz.id,
    title: adaptiveQuiz.title,
    slug: `adaptive-${Date.now()}`,
    userid: currentUser.id,
    type: "adaptive",
    image_url: adaptiveQuiz.imageUrl || "/default.jpg",
    questions: adaptiveQuiz.questions.map((q, index) => ({
      id: q.id,
      question_text: q.question,
      question_type: "single_choice",
      question_order: index + 1,
      options: {
        choices: q.options
      },
      correct_answer: q.options[q.correctAnswerIndex],
      explanation: q.explanation,
      points: 10,
      difficulty: q.difficulty,  // Extra metadata
      topic: q.topic
    }))
  };
};