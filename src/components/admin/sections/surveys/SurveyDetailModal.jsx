import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useSurvey } from '../../../../contexts/MockSurveyContext';
import SurveyAnalytics from './SurveyAnalytics';
import {
  X, Edit2, ExternalLink, Users, Clock, TrendingUp,
  Mail, Download, BarChart3, Copy, CheckCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

function SurveyDetailModal({ survey, onClose, onEdit }) {
  const { getSurveyResponses, getSurveyStats } = useSurvey();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Om showAnalytics är true, visa analytics istället för modal
  if (showAnalytics) {
    return <SurveyAnalytics survey={survey} onClose={() => setShowAnalytics(false)} />;
  }

  const responses = getSurveyResponses(survey.id);
  const stats = getSurveyStats(survey.id);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/survey/${survey.slug}`;
    navigator.clipboard.writeText(link);
    toast.success('Länk kopierad!');
  };

  const handleExportResults = () => {
    const data = {
      survey: survey.title,
      totalResponses: stats.totalResponses,
      responses: responses.map(r => ({
        email: r.respondentEmail,
        completedAt: r.completedAt,
        answers: r.answers
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${survey.slug}-results.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Resultat exporterade!');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{survey.title}</h2>
                <p className="text-orange-100">{survey.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} />
                  <span className="text-sm">Svar</span>
                </div>
                <div className="text-2xl font-bold">{stats.totalResponses}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={16} />
                  <span className="text-sm">Snitt-tid</span>
                </div>
                <div className="text-2xl font-bold">{Math.floor(stats.avgTimeSeconds / 60)}m</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-sm">Genomförd</span>
                </div>
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-orange-500 text-orange-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Översikt
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'responses'
                    ? 'border-orange-500 text-orange-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Svar ({stats.totalResponses})
              </button>
              <button
                onClick={() => setShowAnalytics(true)}
                className="py-4 border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors"
              >
                Analys
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Survey Info */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Enkätinformation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Slug</div>
                      <div className="font-mono text-sm text-slate-900">/survey/{survey.slug}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Status</div>
                      <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${
                        survey.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {survey.isActive ? 'Aktiv' : 'Inaktiv'}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Skapad</div>
                      <div className="text-sm text-slate-900">
                        {new Date(survey.createdAt).toLocaleDateString('sv-SE')}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">Antal frågor</div>
                      <div className="text-sm text-slate-900">{survey.questions.length} frågor</div>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Frågor</h3>
                  <div className="space-y-2">
                    {survey.questions.map((question, index) => (
                      <div key={question.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{question.text}</div>
                            <div className="text-xs text-slate-500 mt-1">{question.type}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'responses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Alla svar</h3>
                  <button
                    onClick={handleExportResults}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Download size={16} />
                    Exportera
                  </button>
                </div>

                {responses.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-slate-600">Inga svar än</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {responses.map((response) => (
                      <div key={response.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-slate-900">
                              {response.respondentEmail || 'Anonym'}
                            </div>
                            <div className="text-sm text-slate-500">
                              {new Date(response.completedAt).toLocaleString('sv-SE')}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={14} />
                            {Math.floor(response.timeTakenSeconds / 60)}m {response.timeTakenSeconds % 60}s
                          </div>
                        </div>
                        <div className="text-sm text-slate-700">
                          {Object.keys(response.answers).length} frågor besvarade
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Copy size={18} />
              Kopiera länk
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onEdit();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Edit2 size={18} />
                Redigera enkät
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SurveyDetailModal;