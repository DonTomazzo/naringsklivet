import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSurvey } from '../../../../contexts/MockSurveyContext';
import {
  ArrowLeft, Save, Eye, Plus, Trash2, GripVertical,
  CheckSquare, Circle, Type, BarChart3, List, Settings
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';

function SurveyBuilder({ survey, onClose }) {
  const { createSurvey, updateSurvey, generateSlug } = useSurvey();
  
  const [formData, setFormData] = useState({
    title: survey?.title || '',
    description: survey?.description || '',
    slug: survey?.slug || '',
    isActive: survey?.isActive ?? true,
    questions: survey?.questions || [],
    settings: survey?.settings || {
      allowAnonymous: true,
      showProgressBar: true,
      shuffleQuestions: false,
      oneResponsePerEmail: true
    }
  });

  const [activeTab, setActiveTab] = useState('questions');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !survey) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
    }
  }, [formData.title, survey, generateSlug]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Titel krävs');
      return;
    }

    if (formData.questions.length === 0) {
      toast.error('Minst en fråga krävs');
      return;
    }

    setSaving(true);

    setTimeout(() => {
      if (survey) {
        updateSurvey(survey.id, formData);
        toast.success('Enkät uppdaterad!');
      } else {
        createSurvey(formData);
        toast.success('Enkät skapad!');
      }
      setSaving(false);
      onClose();
    }, 1000);
  };

  const handleAddQuestion = (type) => {
    const questionTemplates = {
      'single-choice': {
        id: `q-${Date.now()}`,
        type: 'single-choice',
        title: `Fråga ${formData.questions.length + 1}`,
        text: 'Ny fråga',
        options: ['Alternativ 1', 'Alternativ 2', 'Alternativ 3'],
        required: true
      },
      'multiple-choice': {
        id: `q-${Date.now()}`,
        type: 'multiple-choice',
        title: `Fråga ${formData.questions.length + 1}`,
        text: 'Ny fråga',
        options: ['Alternativ 1', 'Alternativ 2', 'Alternativ 3'],
        required: true
      },
      'text-input': {
        id: `q-${Date.now()}`,
        type: 'text-input',
        title: `Fråga ${formData.questions.length + 1}`,
        text: 'Ny fråga',
        placeholder: 'Skriv ditt svar här...',
        required: false
      },
      'likert': {
        id: `q-${Date.now()}`,
        type: 'likert',
        title: `Fråga ${formData.questions.length + 1}`,
        text: 'Håller du med om följande påstående?',
        required: true
      },
      'sorting': {
        id: `q-${Date.now()}`,
        type: 'sorting',
        title: `Fråga ${formData.questions.length + 1}`,
        text: 'Rangordna följande:',
        items: [
          { id: 'item-1', name: 'Alternativ 1' },
          { id: 'item-2', name: 'Alternativ 2' },
          { id: 'item-3', name: 'Alternativ 3' }
        ],
        required: true
      }
    };

    const newQuestion = questionTemplates[type];
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    setEditingQuestion(newQuestion);
  };

  const handleUpdateQuestion = (questionId, updates) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  const handleDeleteQuestion = (questionId) => {
    if (confirm('Är du säker på att du vill ta bort denna fråga?')) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId)
      }));
      if (editingQuestion?.id === questionId) {
        setEditingQuestion(null);
      }
      toast.success('Fråga borttagen');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formData.questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData(prev => ({ ...prev, questions: items }));
  };

  const getQuestionIcon = (type) => {
    const icons = {
      'single-choice': Circle,
      'multiple-choice': CheckSquare,
      'text-input': Type,
      'likert': BarChart3,
      'sorting': List
    };
    return icons[type] || Circle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {survey ? 'Redigera enkät' : 'Skapa ny enkät'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Bygg din enkät steg för steg
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors font-semibold"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sparar...
              </>
            ) : (
              <>
                <Save size={20} />
                Spara enkät
              </>
            )}
          </button>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Titel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="t.ex. Medarbetarenkät 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Beskrivning
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Kort beskrivning av enkäten..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              URL-slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">/survey/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="medarbetar-enkat-2025"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 border-b-2 transition-colors font-medium ${
                activeTab === 'questions'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Frågor ({formData.questions.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 border-b-2 transition-colors font-medium ${
                activeTab === 'settings'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Inställningar
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'questions' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Question List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Frågor</h3>
                  <div className="flex gap-2">
                    {[
                      { type: 'single-choice', label: 'Enval', icon: Circle },
                      { type: 'multiple-choice', label: 'Flerval', icon: CheckSquare },
                      { type: 'text-input', label: 'Text', icon: Type },
                      { type: 'likert', label: 'Skala', icon: BarChart3 },
                      { type: 'sorting', label: 'Sortering', icon: List }
                    ].map(({ type, label, icon: Icon }) => (
                      <button
                        key={type}
                        onClick={() => handleAddQuestion(type)}
                        className="px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors flex items-center gap-2"
                        title={`Lägg till ${label}`}
                      >
                        <Icon size={16} />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.questions.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-lg">
                    <Plus className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-slate-600 mb-4">Inga frågor än</p>
                    <p className="text-sm text-slate-500">Klicka på en knapp ovan för att lägga till din första fråga</p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-3"
                        >
                          {formData.questions.map((question, index) => {
                            const Icon = getQuestionIcon(question.type);
                            
                            return (
                              <Draggable
                                key={question.id}
                                draggableId={question.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`p-4 border rounded-lg transition-all cursor-pointer ${
                                      editingQuestion?.id === question.id
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                                    onClick={() => setEditingQuestion(question)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="cursor-grab active:cursor-grabbing"
                                      >
                                        <GripVertical className="text-gray-400" size={20} />
                                      </div>
                                      <Icon className="text-slate-600" size={20} />
                                      <div className="flex-1">
                                        <div className="font-medium text-slate-900">{question.text}</div>
                                        <div className="text-xs text-slate-500">{question.type}</div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteQuestion(question.id);
                                        }}
                                        className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>

              {/* Question Editor */}
              <div className="lg:col-span-1">
                {editingQuestion ? (
                  <QuestionEditor
                    question={editingQuestion}
                    onUpdate={(updates) => handleUpdateQuestion(editingQuestion.id, updates)}
                  />
                ) : (
                  <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Eye className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-slate-600">Välj en fråga för att redigera</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <SettingsPanel
              settings={formData.settings}
              onUpdate={(updates) => setFormData(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Question Editor Component
function QuestionEditor({ question, onUpdate }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 sticky top-4">
      <h4 className="font-semibold text-slate-900">Redigera fråga</h4>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Frågetext
        </label>
        <textarea
          value={question.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
        />
      </div>

      {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Alternativ
          </label>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index] = e.target.value;
                    onUpdate({ options: newOptions });
                  }}
                  
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => {
                    const newOptions = question.options.filter((_, i) => i !== index);
                    onUpdate({ options: newOptions });
                  }}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newOptions = [...(question.options || []), `Alternativ ${question.options.length + 1}`];
                onUpdate({ options: newOptions });
              }}
              className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 text-sm text-slate-600 transition-colors"
            >
              + Lägg till alternativ
            </button>
          </div>
        </div>
      )}

      {question.type === 'text-input' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Placeholder
          </label>
          <input
            type="text"
            value={question.placeholder || ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="t.ex. Skriv ditt svar här..."
          />
        </div>
      )}

      {question.type === 'sorting' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Alternativ att sortera
          </label>
          <div className="space-y-2">
            {question.items?.map((item, index) => (
              <div key={item.id} className="flex gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...question.items];
                    newItems[index].name = e.target.value;
                    onUpdate({ items: newItems });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => {
                    const newItems = question.items.filter((_, i) => i !== index);
                    onUpdate({ items: newItems });
                  }}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [
                  ...(question.items || []),
                  { id: `item-${Date.now()}`, name: `Alternativ ${question.items.length + 1}` }
                ];
                onUpdate({ items: newItems });
              }}
              className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 text-sm text-slate-600 transition-colors"
            >
              + Lägg till alternativ
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => onUpdate({ required: e.target.checked })}
            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-slate-700">Obligatorisk fråga</span>
        </label>
      </div>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel({ settings, onUpdate }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Enkätinställningar</h3>
        
        <div className="space-y-6">
          {/* Anonymity Level */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Anonymitet & Identifiering
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                <input
                  type="radio"
                  name="anonymity"
                  value="anonymous"
                  checked={settings.anonymityLevel === 'anonymous'}
                  onChange={(e) => onUpdate({ anonymityLevel: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-900">Helt Anonym</div>
                  <div className="text-sm text-slate-600">
                    Inget email krävs. Användare kan svara anonymt. Perfekt för ärlig feedback.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="anonymity"
                  value="email_required"
                  checked={settings.anonymityLevel === 'email_required'}
                  onChange={(e) => onUpdate({ anonymityLevel: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-900">Email Krävs (Anonym i Resultat)</div>
                  <div className="text-sm text-slate-600">
                    Email krävs för att svara, men svar visas anonymt. Bra för uppföljning utan att kompromissa anonymitet.
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                <input
                  type="radio"
                  name="anonymity"
                  value="fully_identified"
                  checked={settings.anonymityLevel === 'fully_identified'}
                  onChange={(e) => onUpdate({ anonymityLevel: e.target.value })}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-slate-900">Fullständigt Identifierad</div>
                  <div className="text-sm text-slate-600">
                    Email krävs och svar kopplas till användare. Du ser exakt vem som svarade vad.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Designtema
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="theme"
                  value="professional"
                  checked={settings.theme === 'professional'}
                  onChange={(e) => onUpdate({ theme: e.target.value })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 rounded-lg transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-500 rounded"></div>
                    <span className="font-medium text-slate-900">Professional</span>
                  </div>
                  <p className="text-xs text-slate-600">Företag, HR, formell feedback</p>
                </div>
              </label>

              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="theme"
                  value="playful"
                  checked={settings.theme === 'playful'}
                  onChange={(e) => onUpdate({ theme: e.target.value })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 rounded-lg transition-all peer-checked:border-pink-500 peer-checked:bg-pink-50 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded"></div>
                    <span className="font-medium text-slate-900">Fun & Playful</span>
                  </div>
                  <p className="text-xs text-slate-600">Events, casual, team-building</p>
                </div>
              </label>

              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="theme"
                  value="academic"
                  checked={settings.theme === 'academic'}
                  onChange={(e) => onUpdate({ theme: e.target.value })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 rounded-lg transition-all peer-checked:border-blue-700 peer-checked:bg-blue-50 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-slate-600 rounded"></div>
                    <span className="font-medium text-slate-900">Academic</span>
                  </div>
                  <p className="text-xs text-slate-600">Research, universitet, studier</p>
                </div>
              </label>

              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="theme"
                  value="minimalist"
                  checked={settings.theme === 'minimalist'}
                  onChange={(e) => onUpdate({ theme: e.target.value })}
                  className="peer sr-only"
                />
                <div className="p-4 border-2 rounded-lg transition-all peer-checked:border-slate-900 peer-checked:bg-slate-50 hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-600 rounded"></div>
                    <span className="font-medium text-slate-900">Minimalist</span>
                  </div>
                  <p className="text-xs text-slate-600">Modern, ren design</p>
                </div>
              </label>
            </div>
          </div>

          {/* Other Settings */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={settings.showProgressBar}
                onChange={(e) => onUpdate({ showProgressBar: e.target.checked })}
                className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <div>
                <div className="font-medium text-slate-900">Visa förloppsindikator</div>
                <div className="text-sm text-slate-600">Visar hur långt användaren har kommit</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={settings.shuffleQuestions}
                onChange={(e) => onUpdate({ shuffleQuestions: e.target.checked })}
                className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <div>
                <div className="font-medium text-slate-900">Slumpa frågorna</div>
                <div className="text-sm text-slate-600">Visa frågor i slumpmässig ordning</div>
              </div>
            </label>

            {settings.anonymityLevel !== 'anonymous' && (
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.oneResponsePerEmail}
                  onChange={(e) => onUpdate({ oneResponsePerEmail: e.target.checked })}
                  className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <div>
                  <div className="font-medium text-slate-900">Ett svar per email</div>
                  <div className="text-sm text-slate-600">Förhindra duplicerade svar från samma email</div>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyBuilder;