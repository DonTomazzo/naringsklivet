export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay' | 'order_sequence' | 'ranking' | 'videolesson' | 'textlesson';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id?: string;
  question_text: string;
  question_type: QuestionType;
  question_order: number;
  options?: QuizOption[];
  correct_answer?: any;
  explanation?: string;
  points?: number;
  // Specific fields for different question types
  blank_correct_answer?: string;
  case_sensitive?: boolean;
  wordBank?: string[];
  correctOrder?: string[];
  rankingItems?: string[];
  rankingCategories?: string[];
  // Video lesson fields
  video_url?: string;
  // Text lesson fields  
  pause_content?: string;

}

export interface Quiz {
  id?: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  userId?: string;
  time_limit_seconds?: number;
  max_attempts?: number;
  passing_score?: number;
}

export const QUESTION_TYPES = {
  single_choice: 'Envalsfråga',
  multiple_choice: 'Flervalsfråga',
  true_false: 'Sant/Falskt',
  fill_blank: 'Lucktext',
  essay: 'Fritextsvar',
  order_sequence: 'Sorteringsfråga',
  ranking: 'Rankningsfråga',
  videolesson: 'Videolektion',
  textlesson: 'Textlektion',
} as const;

export const STEPS = [
  { id: 1, title: 'Quiz-information', icon: 'Info', description: 'Grundläggande information om quizet' },
  { id: 2, title: 'Skapa frågor', icon: 'Target', description: 'Lägg till och redigera frågor' },
  { id: 3, title: 'Förhandsgranska', icon: 'Eye', description: 'Testa ditt quiz' },
  { id: 4, title: 'Spara & Publicera', icon: 'CheckCircle', description: 'Spara och dela ditt quiz' }
];