import React, { useState } from 'react';
import { Plus, Trash2, Target, PenTool } from 'lucide-react';
import { Quiz, QuizQuestion, QuestionType, QUESTION_TYPES } from './types';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

interface QuestionBuilderProps {
  quiz: Quiz;
  onQuizChange: (quiz: Quiz) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ quiz, onQuizChange }) => {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      question_text: '',
      question_type: type,
      explanation: '',
      question_order: quiz.questions.length + 1,
      points: 1,
    };

    if (type === 'single_choice' || type === 'multiple_choice') {
      newQuestion.options = [
        { id: generateId(), text: '', isCorrect: type === 'single_choice' ? true : false }
      ];
    } else if (type === 'true_false') {
      newQuestion.options = [
        { id: 'true', text: 'Sant', isCorrect: true },
        { id: 'false', text: 'Falskt', isCorrect: false }
      ];
    } else if (type === 'fill_blank') {
      newQuestion.blank_correct_answer = '';
      newQuestion.case_sensitive = false;
    } else if (type === 'order_sequence') {
      newQuestion.wordBank = [''];
      newQuestion.correctOrder = [''];
    } else if (type === 'ranking') {
      newQuestion.rankingItems = [''];
      newQuestion.rankingCategories = ['Kategori 1', 'Kategori 2'];
    } else if (type === 'videolesson') {
      newQuestion.video_url = '';
      newQuestion.points = 0; // Lektioner ger 0 poäng
    } else if (type === 'textlesson') {
      newQuestion.pause_content = '';  
      newQuestion.points = 0; // Lektioner ger 0 poäng
    }

    const newQuestions = [...quiz.questions, newQuestion];
    onQuizChange({ ...quiz, questions: newQuestions });
    setEditingQuestionIndex(newQuestions.length - 1);
  };

  const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = updatedQuestion;
    onQuizChange({ ...quiz, questions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);
    // Update question orders
    newQuestions.forEach((q, i) => {
      q.question_order = i + 1;
    });
    onQuizChange({ ...quiz, questions: newQuestions });
    setEditingQuestionIndex(null);
  };

  const currentQuestion = editingQuestionIndex !== null ? quiz.questions[editingQuestionIndex] : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Bygg dina frågor</h2>
        <p className="text-white/80">Skapa engagerande frågor för ditt quiz.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Question List */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Target size={24} className="text-orange-400" />
                Frågelista
              </h3>
            </div>

            {quiz.questions.length === 0 ? (
              <div className="text-center py-8">
                <Target className="mx-auto mb-4 text-white/40" size={48} />
                <h4 className="text-lg font-medium text-white mb-2">Börja bygga ditt quiz</h4>
                <p className="text-white/70 mb-6">Välj en frågetyp för att komma igång.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {quiz.questions.map((q, index) => (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer border-2 ${
                      editingQuestionIndex === index 
                        ? 'bg-blue-500/30 border-blue-400' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => setEditingQuestionIndex(index)}
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-white">Fråga {index + 1}: </span>
                      <span className="text-white/80">{q.question_text || 'Ny fråga'}</span>
                      <div className="mt-1">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded text-white/80">
                          {QUESTION_TYPES[q.question_type]}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeQuestion(index); }}
                      className="text-red-300 hover:text-red-100 p-2 ml-4"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
  <button
    onClick={() => addQuestion('single_choice')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Envalsfråga
  </button>
  <button
    onClick={() => addQuestion('multiple_choice')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Flervalsfråga
  </button>
  <button
    onClick={() => addQuestion('true_false')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Sant/Falskt
  </button>
  <button
    onClick={() => addQuestion('fill_blank')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Lucktext
  </button>
  <button
    onClick={() => addQuestion('essay')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Fritextsvar
  </button>
  <button
    onClick={() => addQuestion('order_sequence')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Sortering
  </button>
  <button
    onClick={() => addQuestion('ranking')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Ranking
  </button>
  <button
    onClick={() => addQuestion('videolesson')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Videolektion
  </button>
  <button
    onClick={() => addQuestion('textlesson')}
    className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 text-sm"
  >
    <Plus size={16} />
    Textlektion
  </button>
</div>
          </div>
        </div>

        {/* Question Editor */}
        <div className="space-y-6">
          {currentQuestion ? (
            <QuestionEditor
              question={currentQuestion}
              onQuestionChange={(updatedQuestion) => updateQuestion(editingQuestionIndex!, updatedQuestion)}
              questionIndex={editingQuestionIndex!}
            />
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 text-center">
              <PenTool className="mx-auto mb-4 text-white/40" size={48} />
              <h4 className="text-lg font-medium text-white mb-2">Välj en fråga att redigera</h4>
              <p className="text-white/70">Klicka på en fråga till vänster för att börja redigera den.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Question Editor Component
interface QuestionEditorProps {
  question: QuizQuestion;
  onQuestionChange: (question: QuizQuestion) => void;
  questionIndex: number;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onQuestionChange, questionIndex }) => {
  const handleQuestionTypeChange = (type: QuestionType) => {
    let updatedQuestion: QuizQuestion = { ...question, question_type: type };
    
    if (type === 'single_choice' || type === 'multiple_choice') {
      updatedQuestion.options = [
        { id: generateId(), text: '', isCorrect: type === 'single_choice' ? true : false }
      ];
      delete updatedQuestion.blank_correct_answer;
      delete updatedQuestion.wordBank;
      delete updatedQuestion.rankingItems;
    } else if (type === 'true_false') {
      updatedQuestion.options = [
        { id: 'true', text: 'Sant', isCorrect: true },
        { id: 'false', text: 'Falskt', isCorrect: false }
      ];
      delete updatedQuestion.blank_correct_answer;
      delete updatedQuestion.wordBank;
      delete updatedQuestion.rankingItems;
    } else if (type === 'fill_blank') {
      updatedQuestion.blank_correct_answer = '';
      updatedQuestion.case_sensitive = false;
      delete updatedQuestion.options;
      delete updatedQuestion.wordBank;
      delete updatedQuestion.rankingItems;
    } else if (type === 'essay') {
      delete updatedQuestion.options;
      delete updatedQuestion.blank_correct_answer;
      delete updatedQuestion.wordBank;
      delete updatedQuestion.rankingItems;
    } else if (type === 'order_sequence') {
      updatedQuestion.wordBank = [''];
      updatedQuestion.correctOrder = [''];
      delete updatedQuestion.options;
      delete updatedQuestion.blank_correct_answer;
      delete updatedQuestion.rankingItems;
    } else if (type === 'ranking') {
      updatedQuestion.rankingItems = [''];
      updatedQuestion.rankingCategories = ['Kategori 1', 'Kategori 2'];
      delete updatedQuestion.options;
      delete updatedQuestion.blank_correct_answer;
      delete updatedQuestion.wordBank;
    }
    
    onQuestionChange(updatedQuestion);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      <h4 className="text-xl font-bold text-white mb-4">Redigera fråga {questionIndex + 1}</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Frågetext</label>
          <textarea
            value={question.question_text}
            onChange={(e) => onQuestionChange({ ...question, question_text: e.target.value })}
            placeholder="Skriv din fråga här..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Frågetyp</label>
          <select
            value={question.question_type}
            onChange={(e) => handleQuestionTypeChange(e.target.value as QuestionType)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          >
            <option value="single_choice">Envalsfråga</option>
            <option value="multiple_choice">Flervalsfråga</option>
            <option value="true_false">Sant/Falskt</option>
            <option value="fill_blank">Lucktext</option>
            <option value="essay">Fritextsvar</option>
            <option value="order_sequence">Sorteringsfråga</option>
            <option value="ranking">Rankningsfråga</option>
          </select>
        </div>

        {/* Question Type Editors */}
        {(question.question_type === 'single_choice' || question.question_type === 'multiple_choice') && (
          <ChoiceEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        {question.question_type === 'true_false' && (
          <TrueFalseEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        {question.question_type === 'fill_blank' && (
          <FillBlankEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        {question.question_type === 'essay' && (
          <EssayEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        {question.question_type === 'order_sequence' && (
          <OrderSequenceEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        {question.question_type === 'ranking' && (
          <RankingEditor question={question} onQuestionChange={onQuestionChange} />
        )}

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Förklaring (visas efter svar)</label>
          <textarea
            value={question.explanation || ''}
            onChange={(e) => onQuestionChange({ ...question, explanation: e.target.value })}
            placeholder="Varför är svaret rätt/fel?"
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Poäng</label>
          <input
            type="number"
            value={question.points || 1}
            onChange={(e) => onQuestionChange({ ...question, points: parseInt(e.target.value) || 1 })}
            min="1"
            className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
        </div>
      </div>
    </div>
  );
};

// Individual Question Type Editors
const ChoiceEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  const isSingleChoice = question.question_type === 'single_choice';

  const handleOptionChange = (optionIndex: number, field: string, value: any) => {
    const newOptions = [...(question.options || [])];
    
    if (field === 'isCorrect' && value && isSingleChoice) {
      // Only one option can be correct for single choice
      newOptions.forEach((opt, i) => {
        opt.isCorrect = i === optionIndex;
      });
    } else {
      newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
    }
    
    onQuestionChange({ ...question, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), { 
      id: generateId(),
      text: '', 
      isCorrect: false
    }];
    onQuestionChange({ ...question, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(index, 1);
    onQuestionChange({ ...question, options: newOptions });
  };

  return (
    <div className="space-y-3">
      <h5 className="font-medium text-white/90">
        Svarsalternativ {isSingleChoice ? '(endast ett rätt svar)' : '(flera rätta svar möjligt)'}
      </h5>
      {question.options?.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          <input
            type={isSingleChoice ? 'radio' : 'checkbox'}
            name={isSingleChoice ? `question-${question.id}` : undefined}
            checked={option.isCorrect}
            onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white/20 border-white/30"
          />
          <input
            type="text"
            value={option.text}
            onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
            placeholder={`Alternativ ${index + 1}`}
            className="flex-1 px-3 py-2 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
          {question.options!.length > 1 && (
            <button
              onClick={() => removeOption(index)}
              className="text-red-300 hover:text-red-100 p-1"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addOption}
        className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors backdrop-blur-lg"
      >
        + Lägg till alternativ
      </button>
    </div>
  );
};

const TrueFalseEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  const handleCorrectAnswerChange = (value: boolean) => {
    const newOptions = question.options?.map(opt => ({
      ...opt,
      isCorrect: (opt.id === 'true' && value) || (opt.id === 'false' && !value)
    }));
    onQuestionChange({ ...question, options: newOptions });
  };

  const correctAnswer = question.options?.find(opt => opt.isCorrect)?.id === 'true';

  return (
    <div className="space-y-3">
      <h5 className="font-medium text-white/90">Rätt svar</h5>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`tf-${question.id}`}
            checked={correctAnswer === true}
            onChange={() => handleCorrectAnswerChange(true)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white/20 border-white/30"
          />
          <span className="text-white">Sant</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={`tf-${question.id}`}
            checked={correctAnswer === false}
            onChange={() => handleCorrectAnswerChange(false)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white/20 border-white/30"
          />
          <span className="text-white">Falskt</span>
        </label>
      </div>
    </div>
  );
};

const FillBlankEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  return (
    <div className="space-y-3">
      <h5 className="font-medium text-white/90">Lucktextinställningar</h5>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Rätt svar</label>
        <input
          type="text"
          value={question.blank_correct_answer || ''}
          onChange={(e) => onQuestionChange({ ...question, blank_correct_answer: e.target.value })}
          placeholder="Skriv det rätta svaret här"
          className="w-full px-3 py-2 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={question.case_sensitive || false}
          onChange={(e) => onQuestionChange({ ...question, case_sensitive: e.target.checked })}
          className="w-4 h-4 text-blue-600 focus:ring-blue-500 bg-white/20 border-white/30"
        />
        <label className="text-white/80 text-sm">Skiftlägeskänsligt</label>
      </div>
      <p className="text-xs text-white/60">
        Tips: Använd _____ i frågetexten för att markera var luckan ska vara.
      </p>
    </div>
  );
};

const EssayEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  return (
    <div className="space-y-3">
      <h5 className="font-medium text-white/90">Fritextsvar</h5>
      <p className="text-sm text-white/70">
        Fritextfrågor rättas inte automatiskt. Användaren kan skriva ett längre svar som du sedan kan bedöma manuellt.
      </p>
    </div>
  );
};

const OrderSequenceEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  const handleWordBankChange = (index: number, value: string) => {
    const newWordBank = [...(question.wordBank || [])];
    const newCorrectOrder = [...(question.correctOrder || [])];
    newWordBank[index] = value;
    newCorrectOrder[index] = value;
    onQuestionChange({
      ...question,
      wordBank: newWordBank,
      correctOrder: newCorrectOrder,
    });
  };

  const addWord = () => {
    const newWordBank = [...(question.wordBank || []), ''];
    const newCorrectOrder = [...(question.correctOrder || []), ''];
    onQuestionChange({
      ...question,
      wordBank: newWordBank,
      correctOrder: newCorrectOrder,
    });
  };

  const removeWord = (index: number) => {
    const newWordBank = [...(question.wordBank || [])];
    const newCorrectOrder = [...(question.correctOrder || [])];
    newWordBank.splice(index, 1);
    newCorrectOrder.splice(index, 1);
    onQuestionChange({
      ...question,
      wordBank: newWordBank,
      correctOrder: newCorrectOrder,
    });
  };

  return (
    <div className="space-y-3">
      <h5 className="font-medium text-white/90">Ordbank & Rätt ordning</h5>
      {question.wordBank?.map((word, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-white/70 text-sm w-8">{index + 1}.</span>
          <input
            type="text"
            value={word}
            onChange={(e) => handleWordBankChange(index, e.target.value)}
            placeholder={`Ord ${index + 1}`}
            className="flex-1 px-3 py-2 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
          {question.wordBank!.length > 1 && (
            <button
              onClick={() => removeWord(index)}
              className="text-red-300 hover:text-red-100 p-1"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addWord}
        className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors backdrop-blur-lg"
      >
        + Lägg till ord
      </button>
      <p className="text-xs text-white/60">
        Användaren kommer att dra orden i rätt ordning från 1 till {question.wordBank?.length || 0}.
      </p>
    </div>
  );
};

const RankingEditor: React.FC<{ question: QuizQuestion; onQuestionChange: (q: QuizQuestion) => void }> = ({ question, onQuestionChange }) => {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...(question.rankingItems || [])];
    newItems[index] = value;
    onQuestionChange({ ...question, rankingItems: newItems });
  };

  const addItem = () => {
    const newItems = [...(question.rankingItems || []), ''];
    onQuestionChange({ ...question, rankingItems: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = [...(question.rankingItems || [])];
    newItems.splice(index, 1);
    onQuestionChange({ ...question, rankingItems: newItems });
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...(question.rankingCategories || [])];
    newCategories[index] = value;
    onQuestionChange({ ...question, rankingCategories: newCategories });
  };

  return (
    <div className="space-y-4">
      <h5 className="font-medium text-white/90">Rankningsinställningar</h5>
      
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Kategorier</label>
        {question.rankingCategories?.map((category, index) => (
          <input
            key={index}
            type="text"
            value={category}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            placeholder={`Kategori ${index + 1}`}
            className="w-full px-3 py-2 mb-2 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
          />
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Alternativ att rangordna</label>
        {question.rankingItems?.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <span className="text-white/70 text-sm w-8">{index + 1}.</span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`Alternativ ${index + 1}`}
              className="flex-1 px-3 py-2 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 backdrop-blur-lg"
            />
            {question.rankingItems!.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-300 hover:text-red-100 p-1"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors backdrop-blur-lg"
        >
          + Lägg till alternativ
        </button>
      </div>
      
      <p className="text-xs text-white/60">
        Användaren kommer att dra alternativen mellan kategorier och rangordna dem.
      </p>
    </div>
  );
};

export default QuestionBuilder;