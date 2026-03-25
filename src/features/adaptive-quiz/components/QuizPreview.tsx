import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useHomeworkAnalysis } from '../hooks/useHomeworkAnalysis';
import { Question } from '../types/quiz.types';

export const QuizPreview: React.FC = () => {
  const { currentAnalysis, startNewSession } = useQuiz();
  const { createQuizFromAnalysis, editQuestion, removeQuestion } = useHomeworkAnalysis();

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Question>>({});

  if (!currentAnalysis) return null;

  const handleStartEdit = (question: Question) => {
    setEditingQuestionId(question.id);
    setEditForm(question);
  };

  const handleSaveEdit = () => {
    if (editingQuestionId && editForm) {
      editQuestion(editingQuestionId, editForm);
      setEditingQuestionId(null);
      setEditForm({});
    }
  };

  const handlePublish = () => {
    const quiz = createQuizFromAnalysis(currentAnalysis);
    startNewSession(quiz);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '😊';
      case 'medium':
        return '🤔';
      case 'hard':
        return '🧠';
      default:
        return '❓';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              ✅ Analys klar!
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-700">
              <span className="flex items-center gap-2">
                <strong>Ämne:</strong> {currentAnalysis.subject}
              </span>
              <span className="flex items-center gap-2">
                <strong>Topic:</strong> {currentAnalysis.topic}
              </span>
              <span className="flex items-center gap-2">
                <strong>Svårighetsgrad:</strong>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentAnalysis.difficulty)}`}>
                  {getDifficultyEmoji(currentAnalysis.difficulty)} {currentAnalysis.difficulty}
                </span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">AI Confidence</div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(currentAnalysis.confidence * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Text */}
      {currentAnalysis.extractedText && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">📄 Extraherad Text</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {currentAnalysis.extractedText}
          </p>
        </div>
      )}

      {/* Questions Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            Förhandsgranska Quiz ({currentAnalysis.suggestedQuestions.length} frågor)
          </h3>
          <p className="text-sm text-gray-600">
            Granska och redigera frågorna innan du publicerar
          </p>
        </div>

        {currentAnalysis.suggestedQuestions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {editingQuestionId === question.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fråga
                  </label>
                  <input
                    type="text"
                    value={editForm.question || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm, question: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Svarsalternativ
                  </label>
                  {editForm.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        checked={editForm.correctAnswerIndex === optIndex}
                        onChange={() =>
                          setEditForm({ ...editForm, correctAnswerIndex: optIndex })
                        }
                        className="text-[#FF5421]"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(editForm.options || [])];
                          newOptions[optIndex] = e.target.value;
                          setEditForm({ ...editForm, options: newOptions });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Förklaring
                  </label>
                  <textarea
                    value={editForm.explanation || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm, explanation: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-[#FF5421] text-white rounded-lg hover:bg-[#E04A1D]"
                  >
                    Spara
                  </button>
                  <button
                    onClick={() => setEditingQuestionId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        Fråga {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {getDifficultyEmoji(question.difficulty)} {question.difficulty}
                      </span>
                      {question.topic && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {question.topic}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900 font-medium">{question.question}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStartEdit(question)}
                      className="p-2 text-[#FF5421] hover:bg-orange-50 rounded-lg transition-colors"
                      title="Redigera fråga"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Ta bort fråga"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-lg border-2 ${
                        optIndex === question.correctAnswerIndex
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {optIndex === question.correctAnswerIndex && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {question.explanation && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-slate-900">
                      <strong>💡 Förklaring:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Publish Button */}
      <div className="sticky bottom-6 bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Redo att börja träna?</h4>
            <p className="text-sm text-slate-600">
              Du kommer träna i 3 adaptiva omgångar
            </p>
          </div>
          <button
            onClick={handlePublish}
            className="px-8 py-4 bg-gradient-to-r from-[#FF5421] to-orange-600 text-white rounded-xl font-bold text-lg hover:from-[#E04A1D] hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
          >
            🚀 Publicera & Börja Träna
          </button>
        </div>
      </div>
    </div>
  );
};
