import React, { useState, useEffect, useCallback } from 'react';
import {
  Info, Target, Eye, CheckCircle, ArrowRight, ArrowLeft, 
  Check, Save, Loader, AlertCircle
} from 'lucide-react';
import { Quiz, STEPS } from './types';
import QuestionBuilder from './QuestionBuilder';
import QuizPreview from './QuizPreview';
import { supabase } from '../../../../lib/supabase';

const validateQuiz = (quiz: Quiz): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!quiz.title.trim()) errors.push('Quiz-titel krävs');
  if (quiz.questions.length === 0) errors.push('Minst en fråga krävs');
  
  quiz.questions.forEach((q, index) => {
    if (!q.question_text.trim()) errors.push(`Fråga ${index + 1} behöver en frågetext`);
    
    if (q.question_type === 'single_choice' || q.question_type === 'multiple_choice') {
      if (!q.options || q.options.length === 0) {
        errors.push(`Fråga ${index + 1} behöver svarsalternativ`);
      } else if (!q.options.some(opt => opt.isCorrect)) {
        errors.push(`Fråga ${index + 1} behöver minst ett rätt svar`);
      }
    }
    
    if (q.question_type === 'fill_blank' && !q.blank_correct_answer?.trim()) {
      errors.push(`Fråga ${index + 1} behöver ett rätt svar för luckan`);
    }
    
    if (q.question_type === 'order_sequence' && (!q.wordBank || q.wordBank.length === 0)) {
      errors.push(`Fråga ${index + 1} behöver ord i ordbanken`);
    }
    
    if (q.question_type === 'ranking' && (!q.rankingItems || q.rankingItems.length === 0)) {
      errors.push(`Fråga ${index + 1} behöver alternativ att rangordna`);
    }
  });

  return { isValid: errors.length === 0, errors };
};

// Supporting Components
const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
      <div
        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const StepNavigation: React.FC<{
  currentStep: number;
  steps: typeof STEPS;
  onStepClick: (step: number) => void;
}> = ({ currentStep, steps, onStepClick }) => {
  const iconComponents = {
    Info,
    Target,
    Eye,
    CheckCircle
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-8 gap-3">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const IconComponent = iconComponents[step.icon as keyof typeof iconComponents];

        return (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(step.id)}
              className={`
                flex items-center md:flex-col gap-3 md:gap-2 p-3 md:p-4 rounded-xl transition-all duration-200 w-full
                ${isActive
                  ? 'bg-orange-500 text-white shadow-lg'
                  : isCompleted
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }
              `}
            >
              <div className={`
                w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${isActive
                  ? 'bg-white/20'
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200'
                }
              `}>
                {isCompleted ? <Check size={20} /> : <IconComponent size={20} />}
              </div>
              <div className="text-left md:text-center flex-1 md:flex-initial">
                <span className="text-sm font-semibold block">{step.title}</span>
                <span className="text-xs opacity-80 hidden md:block mt-1">{step.description}</span>
              </div>
            </button>
            {index < steps.length - 1 && (
              <div className={`
                hidden md:block w-8 h-0.5 mx-2
                ${currentStep > step.id ? 'bg-green-300' : 'bg-slate-200'}
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ErrorAlert: React.FC<{ errors: string[] }> = ({ errors }) => {
  if (errors.length === 0) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-2">
        <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="font-medium text-red-800 mb-1">Vänligen rätta till följande:</p>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Step 1: Quiz Information
const Step1QuizInfo: React.FC<{
  quiz: Quiz;
  onChange: (quiz: Quiz) => void;
}> = ({ quiz, onChange }) => {
  const handleFieldChange = (field: keyof Quiz, value: any) => {
    onChange({ ...quiz, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Skapa ditt quiz</h2>
        <p className="text-slate-600">Vad skulle du vilja kalla ditt quiz? Du kan alltid ändra detta senare.</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Quiz-titel *</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="t.ex. 'Grundläggande matematik' eller 'Personlighetstest'"
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Beskrivning</label>
          <textarea
            value={quiz.description || ''}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="En kort beskrivning av vad ditt quiz handlar om..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tidsgräns (sek)</label>
            <input
              type="number"
              value={quiz.time_limit_seconds || ''}
              onChange={(e) => handleFieldChange('time_limit_seconds', parseInt(e.target.value) || undefined)}
              placeholder="Ingen gräns"
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max försök</label>
            <input
              type="number"
              value={quiz.max_attempts || 3}
              onChange={(e) => handleFieldChange('max_attempts', parseInt(e.target.value) || 3)}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Godkänt (%)</label>
            <input
              type="number"
              value={quiz.passing_score || 70}
              onChange={(e) => handleFieldChange('passing_score', parseInt(e.target.value) || 70)}
              min="0"
              max="100"
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 4: Save & Publish
const Step4SavePublish: React.FC<{
  quiz: Quiz;
  onSave: () => void;
  saving: boolean;
}> = ({ quiz, onSave, saving }) => {
  const stats = {
    totalQuestions: quiz.questions.length,
    questionTypes: quiz.questions.reduce((acc, q) => {
      acc[q.question_type] = (acc[q.question_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Spara & Publicera</h2>
        <p className="text-slate-600">Granska ditt quiz och spara det för framtida användning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz-översikt</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-slate-600">Titel:</span>
                <p className="text-slate-900">{quiz.title || 'Ingen titel'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Beskrivning:</span>
                <p className="text-slate-700 text-sm">{quiz.description || 'Ingen beskrivning'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Antal frågor:</span>
                <p className="text-slate-900 font-semibold">{stats.totalQuestions}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600">Frågetyper:</span>
                <div className="mt-1 space-y-1">
                  {Object.entries(stats.questionTypes).map(([type, count]) => (
                    <p key={type} className="text-slate-700 text-sm">
                      {type}: {count}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Redo att spara?</h3>
            <p className="text-slate-700 text-sm mb-6">
              Ditt quiz kommer att sparas och du kan dela det med andra eller använda det senare.
            </p>
            <button
              onClick={onSave}
              disabled={saving || !quiz.title || quiz.questions.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {saving ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Sparar...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Spara quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Quiz Builder Wizard Component
const QuizBuilderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quiz, setQuiz] = useState<Quiz>({
    title: '',
    description: '',
    questions: [],
    time_limit_seconds: undefined,
    max_attempts: 3,
    passing_score: 70,
  });
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let savedUserId = localStorage.getItem('quiz-builder-user-id');
    if (!savedUserId) {
      savedUserId = crypto.randomUUID();
      localStorage.setItem('quiz-builder-user-id', savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  const handleQuizChange = useCallback((updatedQuiz: Quiz) => {
    setQuiz(updatedQuiz);
  }, []);

  const handleNext = () => {
    let errors: string[] = [];
    
    if (currentStep === 1 && !quiz.title.trim()) {
      errors.push('Quiz-titel krävs för att fortsätta');
    }
    
    if (currentStep === 2 && quiz.questions.length === 0) {
      errors.push('Minst en fråga krävs för att fortsätta');
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      setValidationErrors([]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors([]);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep || step === 1) {
      setCurrentStep(step);
      setValidationErrors([]);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      setValidationErrors(['Användar-ID saknas']);
      return;
    }

    const validation = validateQuiz(quiz);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setSaving(true);
    setValidationErrors([]);

    try {
      const { data: quizData, error: quizError } = await supabase
        .from('soloquizzes')
        .insert({
          title: quiz.title,
          questions: JSON.stringify(quiz.questions),
          userid: userId
        })
        .select()
        .single();

      if (quizError) {
        console.error('Error saving quiz:', quizError);
        setValidationErrors(['Ett fel uppstod vid sparandet av quizet']);
        return;
      }

      if (quizData) {
        const questionsToInsert = quiz.questions.map((question, index) => ({
          quiz_id: quizData.id,
          question_text: question.question_text,
          question_type: question.question_type,
          question_order: index + 1,
          options: JSON.stringify(question.options || []),
          correct_answer: JSON.stringify({
            blank_answer: question.blank_correct_answer,
            case_sensitive: question.case_sensitive,
            word_bank: question.wordBank,
            correct_order: question.correctOrder,
            ranking_items: question.rankingItems,
            ranking_categories: question.rankingCategories
          }),
          explanation: question.explanation,
          points: question.points || 1
        }));

        const { error: questionsError } = await supabase
          .from('soloquestions')
          .insert(questionsToInsert);

        if (questionsError) {
          console.warn('Error saving individual questions:', questionsError);
        }
      }

      setMessage('Quiz sparat framgångsrikt!');
      setTimeout(() => setMessage(null), 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setValidationErrors(['Ett oväntat fel uppstod vid sparandet']);
    } finally {
      setSaving(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1QuizInfo quiz={quiz} onChange={handleQuizChange} />;
      case 2:
        return <QuestionBuilder quiz={quiz} onQuizChange={handleQuizChange} />;
      case 3:
        return <QuizPreview quiz={quiz} />;
      case 4:
        return <Step4SavePublish quiz={quiz} onSave={handleSave} saving={saving} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Quiz Builder</h1>
          <p className="text-slate-600">Skapa engagerande quiz steg för steg</p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
        <StepNavigation
          currentStep={currentStep}
          steps={STEPS}
          onStepClick={handleStepClick}
        />

        {message && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
            <p className="text-green-700 font-medium">{message}</p>
          </div>
        )}

        <ErrorAlert errors={validationErrors} />

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-8 mb-8">
          {renderCurrentStep()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-lg transition-all duration-300 font-semibold"
          >
            <ArrowLeft size={20} />
            Tillbaka
          </button>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Nästa
              <ArrowRight size={20} />
            </button>
          ) : (
            <div className="text-sm text-slate-500 text-center sm:text-right">
              Spara ditt quiz i steg 4
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBuilderWizard;