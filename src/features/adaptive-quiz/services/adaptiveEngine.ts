import type { Question } from '../context/QuizContext';
import { generateDeeperQuestions, generateEasierVariations } from './aiService';

export interface AdaptiveRoundConfig {
  round: number;
  questions: Question[];
  type: 'baseline' | 'deeper' | 'easier';
}

export class AdaptiveEngine {
  private wrongQuestions: Set<string> = new Set();
  private originalText: string = '';
  private allQuestions: Question[] = [];

  constructor(questions: Question[], text?: string) {
    this.allQuestions = questions;
    this.originalText = text || '';
  }

  /**
   * Markera en fråga som fel besvarad
   */
  markWrong(questionId: string): void {
    this.wrongQuestions.add(questionId);
  }

  /**
   * Rensa alla fel-markeringar
   */
  reset(): void {
    this.wrongQuestions.clear();
  }

  /**
   * Hämta frågor för omgång 1 (baseline)
   */
  getRound1Questions(): Question[] {
    return this.allQuestions;
  }

  /**
   * Generera frågor för omgång 2 (fördjupande)
   */
  async getRound2Questions(): Promise<Question[]> {
    const wrong = this.allQuestions.filter(q => this.wrongQuestions.has(q.id));
    
    if (wrong.length === 0) {
      // Inga fel - visa alla frågor igen
      return this.allQuestions;
    }

    try {
      // Generera fördjupande frågor med AI
      const deeperQs = await generateDeeperQuestions(wrong, this.originalText);
      
      // Returnera fel frågor + nya fördjupande frågor
      return [...wrong, ...deeperQs];
    } catch (error) {
      console.error('Error generating round 2 questions:', error);
      // Fallback: returnera bara de fel besvarade frågorna
      return wrong;
    }
  }

  /**
   * Generera frågor för omgång 3 (enklare variationer)
   */
  async getRound3Questions(round2Wrong: string[]): Promise<Question[]> {
    const stillWrong = this.allQuestions.filter(q => round2Wrong.includes(q.id));
    
    if (stillWrong.length === 0) {
      // Inga kvarvarande fel - visa slumpmässiga frågor
      return this.allQuestions.slice(0, 5);
    }

    try {
      // Generera enklare variationer med AI
      const easierQs = await generateEasierVariations(stillWrong, this.originalText);
      
      return easierQs.length > 0 ? easierQs : stillWrong;
    } catch (error) {
      console.error('Error generating round 3 questions:', error);
      // Fallback: returnera de svåra frågorna igen
      return stillWrong;
    }
  }

  /**
   * Få statistik om prestanda
   */
  getStats() {
    return {
      totalQuestions: this.allQuestions.length,
      wrongCount: this.wrongQuestions.size,
      correctCount: this.allQuestions.length - this.wrongQuestions.size,
      accuracy: ((this.allQuestions.length - this.wrongQuestions.size) / this.allQuestions.length) * 100,
    };
  }

  /**
   * Få lista över fel frågor
   */
  getWrongQuestions(): Question[] {
    return this.allQuestions.filter(q => this.wrongQuestions.has(q.id));
  }
}

/**
 * Hjälpfunktion för att skapa adaptiv motor
 */
export function createAdaptiveEngine(questions: Question[], text?: string): AdaptiveEngine {
  return new AdaptiveEngine(questions, text);
}
