// data/quiz/html-grundroller-quiz.js
export const htmlGrundrollerQuiz = {
  id: 'quiz-grundroller',
  title: 'Quiz: Grundroller',
  slug: 'html-grundroller',
  questions: [
    {
      id: 'q1',
      question_text: 'Vem leder styrelsens möten?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: ['Ordföranden', 'Vice ordföranden', 'Sekreteraren', 'Kassören']
      },
      correct_answer: 'Ordföranden',
      explanation: 'Ordföranden är den som leder styrelsens möten och ser till att diskussionerna följer dagordningen.',
      points: 100
    },
    {
      id: 'q2',
      question_text: 'Vem ansvarar för mötesprotokoll?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: ['Ordföranden', 'Sekreteraren', 'Kassören', 'Ledamot']
      },
      correct_answer: 'Sekreteraren',
      explanation: 'Sekreteraren är ansvarig för att dokumentera vad som sägs och beslutas på möten.',
      points: 100
    },
    {
      id: 'q3',
      question_text: 'Vad gör vice ordföranden?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: [
          'Ersätter ordföranden vid frånvaro',
          'Sköter ekonomin',
          'Skriver protokoll',
          'Kallar till möten'
        ]
      },
      correct_answer: 'Ersätter ordföranden vid frånvaro',
      explanation: 'Vice ordförandens huvudsakliga roll är att träda in när ordföranden inte kan närvara.',
      points: 100
    }
  ],
  userid: 'system',
  image_url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80'
};

export const htmlSlutprovQuiz = {
  id: 'slutprov',
  title: 'Slutprov',
  slug: 'html-slutprov',
  questions: [
    {
      id: 'q1',
      question_text: 'Vem ansvarar för föreningens ekonomi?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'Kassören',
          'Ordföranden',
          'Sekreteraren',
          'Vice ordföranden'
        ]
      },
      correct_answer: 'Kassören',
      explanation: 'Kassören har det övergripande ansvaret för föreningens ekonomi och bokföring.',
      points: 150
    },
    {
      id: 'q2',
      question_text: 'Vad är en suppleants roll?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Ersätter ledamot vid behov',
          'Leder möten',
          'Sköter ekonomin',
          'Skriver protokoll'
        ]
      },
      correct_answer: 'Ersätter ledamot vid behov',
      explanation: 'Suppleanter träder in när ordinarie ledamöter inte kan delta i styrelsemöten.',
      points: 150
    }
  ],
  userid: 'system',
  image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80'
};