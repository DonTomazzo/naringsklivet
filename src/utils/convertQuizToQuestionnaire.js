// src/utils/convertQuizToQuestionnaire.js
// Utility för att konvertera SoloQuiz-format till Questionnaire-format

/**
 * Konverterar SoloQuiz data till Questionnaire format
 * @param {Object} soloQuizData - Quiz-objekt från SoloQuiz
 * @returns {Array} - Array av Questionnaire-frågor
 */
export function convertQuizToQuestionnaire(soloQuizData) {
  if (!soloQuizData || !soloQuizData.questions) {
    console.error('Invalid quiz data');
    return [];
  }

  // Filtrera bort lektioner (video/text)
  const quizQuestions = soloQuizData.questions.filter(q => 
    q.question_type !== 'videolesson' && 
    q.question_type !== 'textlesson'
  );

  // Konvertera varje fråga
  return quizQuestions.map(q => {
    const converted = {
      id: q.id,
      question: q.question_text,
      explanation: q.explanation || '',
      points: q.points || 10
    };

    // Hantera olika frågetyper
    switch(q.question_type) {
      case 'single_choice':
        converted.type = 'multiple_choice';
        converted.options = q.options?.choices || [];
        converted.correctAnswer = q.correct_answer;
        break;

      case 'multiple_choice':
        converted.type = 'multiple_choice';
        converted.options = q.options?.choices || [];
        converted.correctAnswer = q.correct_answer;
        break;

      case 'true_false':
        converted.type = 'true_false';
        // Konvertera till boolean om det är string
        if (typeof q.correct_answer === 'string') {
          converted.correctAnswer = q.correct_answer.toLowerCase() === 'true';
        } else {
          converted.correctAnswer = Boolean(q.correct_answer);
        }
        break;

      case 'fill_blank':
      case 'fill_in_blank':
        converted.type = 'fill_blank';
        converted.correctAnswer = q.correct_answer;
        break;

      case 'order_sequence':
      case 'ordering':
        converted.type = 'order_sequence';
        // Se till att svaret är en array
        if (Array.isArray(q.correct_answer)) {
          converted.correctAnswer = q.correct_answer;
        } else if (typeof q.correct_answer === 'string') {
          converted.correctAnswer = q.correct_answer.split(',').map(s => s.trim());
        } else {
          console.warn(`Invalid correct_answer format for order_sequence: ${q.id}`);
          converted.correctAnswer = [];
        }
        break;

      default:
        console.warn(`Unknown question type: ${q.question_type} for question ${q.id}`);
        converted.type = 'multiple_choice';
        converted.options = [];
        converted.correctAnswer = '';
    }

    return converted;
  });
}

/**
 * Extraherar video-lektioner från SoloQuiz data
 * @param {Object} soloQuizData - Quiz-objekt från SoloQuiz
 * @returns {Array} - Array av video-lektioner
 */
export function extractVideoLessons(soloQuizData) {
  if (!soloQuizData || !soloQuizData.questions) {
    return [];
  }

  return soloQuizData.questions
    .filter(q => q.question_type === 'videolesson')
    .map(q => ({
      id: q.id,
      title: q.question_text,
      videoUrl: q.video_url,
      order: q.question_order
    }));
}

/**
 * Extraherar text-lektioner från SoloQuiz data
 * @param {Object} soloQuizData - Quiz-objekt från SoloQuiz
 * @returns {Array} - Array av text-lektioner
 */
export function extractTextLessons(soloQuizData) {
  if (!soloQuizData || !soloQuizData.questions) {
    return [];
  }

  return soloQuizData.questions
    .filter(q => q.question_type === 'textlesson')
    .map(q => ({
      id: q.id,
      title: q.question_text,
      content: q.pause_content || '',
      order: q.question_order
    }));
}

/**
 * Validerar att en konverterad fråga är giltig
 * @param {Object} question - Questionnaire-fråga
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateQuestion(question) {
  const errors = [];

  if (!question.id) errors.push('Missing id');
  if (!question.question) errors.push('Missing question text');
  if (!question.type) errors.push('Missing type');
  if (question.points === undefined) errors.push('Missing points');

  // Typ-specifik validering
  if (question.type === 'multiple_choice') {
    if (!Array.isArray(question.options) || question.options.length === 0) {
      errors.push('multiple_choice must have options array');
    }
    if (!question.correctAnswer) {
      errors.push('multiple_choice must have correctAnswer');
    }
    if (question.options && !question.options.includes(question.correctAnswer)) {
      errors.push('correctAnswer must be in options');
    }
  }

  if (question.type === 'true_false') {
    if (typeof question.correctAnswer !== 'boolean') {
      errors.push('true_false correctAnswer must be boolean');
    }
  }

  if (question.type === 'fill_blank') {
    if (!question.correctAnswer || typeof question.correctAnswer !== 'string') {
      errors.push('fill_blank must have string correctAnswer');
    }
  }

  if (question.type === 'order_sequence') {
    if (!Array.isArray(question.correctAnswer) || question.correctAnswer.length === 0) {
      errors.push('order_sequence must have array correctAnswer');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Konverterar och validerar hela quiz
 * @param {Object} soloQuizData - Quiz-objekt från SoloQuiz
 * @returns {Object} - { questions, videoLessons, textLessons, errors }
 */
export function convertAndValidateQuiz(soloQuizData) {
  const questions = convertQuizToQuestionnaire(soloQuizData);
  const videoLessons = extractVideoLessons(soloQuizData);
  const textLessons = extractTextLessons(soloQuizData);
  
  const errors = [];
  questions.forEach((q, index) => {
    const validation = validateQuestion(q);
    if (!validation.valid) {
      errors.push({
        questionId: q.id,
        index,
        errors: validation.errors
      });
    }
  });

  return {
    questions,
    videoLessons,
    textLessons,
    valid: errors.length === 0,
    errors
  };
}

/**
 * Genererar en Questionnaire-fil från SoloQuiz data
 * @param {Object} soloQuizData - Quiz-objekt från SoloQuiz
 * @param {string} exportName - Namn på export (default: 'questions')
 * @returns {string} - JavaScript-fil som string
 */
export function generateQuestionnaireFile(soloQuizData, exportName = 'questions') {
  const result = convertAndValidateQuiz(soloQuizData);
  
  if (!result.valid) {
    console.error('Validation errors:', result.errors);
  }

  let output = `// Generated from SoloQuiz data\n`;
  output += `// Title: ${soloQuizData.title}\n\n`;

  if (result.videoLessons.length > 0) {
    output += `// Note: ${result.videoLessons.length} video lesson(s) found. Add to moduleContent:\n`;
    result.videoLessons.forEach(v => {
      output += `// - ${v.title}: ${v.videoUrl}\n`;
    });
    output += '\n';
  }

  if (result.textLessons.length > 0) {
    output += `// Note: ${result.textLessons.length} text lesson(s) found. Add to moduleContent\n\n`;
  }

  output += `export const ${exportName} = ${JSON.stringify(result.questions, null, 2)};\n\n`;
  output += `export default ${exportName};\n`;

  return output;
}

// Default export
export default {
  convertQuizToQuestionnaire,
  extractVideoLessons,
  extractTextLessons,
  validateQuestion,
  convertAndValidateQuiz,
  generateQuestionnaireFile
};
