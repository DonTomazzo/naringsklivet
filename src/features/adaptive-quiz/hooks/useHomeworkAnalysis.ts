import { useState } from 'react';
import { claudeService } from '../services/aiService';
import { HomeworkAnalysis, Quiz } from '../types/quiz.types';
import { useQuiz } from '../context/QuizContext';

export const useHomeworkAnalysis = () => {
  const { setCurrentAnalysis, setIsAnalyzing, setError, setCurrentQuiz } = useQuiz();
  const [uploadProgress, setUploadProgress] = useState(0);

  /**
   * Konverterar en fil till base64
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Ta bort "data:image/jpeg;base64," prefixet
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };
    });
  };

  /**
   * Analyserar en bild av läxa
   */
  const analyzeImage = async (file: File, numQuestions: number = 8): Promise<HomeworkAnalysis> => {
    setIsAnalyzing(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Validera filtyp
      if (!file.type.startsWith('image/')) {
        throw new Error('Vänligen ladda upp en bildfil (JPEG, PNG, etc.)');
      }

      // Validera filstorlek (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Bilden är för stor. Max storlek är 5MB.');
      }

      // Konvertera till base64
      const base64 = await fileToBase64(file);

      // Anropa Claude API
      const analysis = await claudeService.analyzeHomeworkImage(base64, numQuestions);

      setCurrentAnalysis(analysis);
      setUploadProgress(100);

      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ett fel uppstod vid analys';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Analyserar text istället för bild
   */
  const analyzeText = async (text: string, numQuestions: number = 8): Promise<HomeworkAnalysis> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      if (!text.trim()) {
        throw new Error('Vänligen ange lite text att analysera');
      }

      const analysis = await claudeService.analyzeHomeworkText(text, numQuestions);
      setCurrentAnalysis(analysis);

      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ett fel uppstod vid analys';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Skapar ett Quiz-objekt från analys
   */
  const createQuizFromAnalysis = (analysis: HomeworkAnalysis, imageUrl?: string): Quiz => {
    const quiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: `${analysis.subject}: ${analysis.topic}`,
      subject: analysis.subject,
      questions: analysis.suggestedQuestions,
      createdAt: new Date(),
      imageUrl,
      extractedText: analysis.extractedText,
    };

    setCurrentQuiz(quiz);
    return quiz;
  };

  /**
   * Redigerar en fråga i förhandsvisningen
   */
  const editQuestion = (questionId: string, updates: Partial<typeof analysis.suggestedQuestions[0]>) => {
    setCurrentAnalysis((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        suggestedQuestions: prev.suggestedQuestions.map((q) =>
          q.id === questionId ? { ...q, ...updates } : q
        ),
      };
    });
  };

  /**
   * Tar bort en fråga från förhandsvisningen
   */
  const removeQuestion = (questionId: string) => {
    setCurrentAnalysis((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        suggestedQuestions: prev.suggestedQuestions.filter((q) => q.id !== questionId),
      };
    });
  };

  return {
    analyzeImage,
    analyzeText,
    createQuizFromAnalysis,
    editQuestion,
    removeQuestion,
    uploadProgress,
  };
};
