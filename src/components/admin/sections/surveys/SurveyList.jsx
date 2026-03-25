import { motion } from 'framer-motion';
import { useSurvey } from '../../../../contexts/MockSurveyContext';
import { Eye, Edit2, Copy, Trash2, ExternalLink, ToggleLeft, ToggleRight, Clock, Users, TrendingUp, Send } from 'lucide-react';
import { toast } from 'react-toastify';

function SurveyList({ surveys, onEdit, onViewDetails, onSendEmails }) {

  const { deleteSurvey, duplicateSurvey, updateSurvey, getSurveyStats } = useSurvey();

  const handleCopyLink = (survey, e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/survey/${survey.slug}`;
    navigator.clipboard.writeText(link);
    toast.success('Länk kopierad!');
  };

  const handleDuplicate = (survey, e) => {
    e.stopPropagation();
    const result = duplicateSurvey(survey.id);
    if (result.success) {
      toast.success('Enkät duplicerad!');
    }
  };

  const handleDelete = (survey, e) => {
    e.stopPropagation();
    if (confirm(`Är du säker på att du vill ta bort "${survey.title}"?`)) {
      deleteSurvey(survey.id);
      toast.success('Enkät borttagen!');
    }
  };

  const handleSendEmails = (survey, e) => {
  e.stopPropagation();
  onSendEmails(survey);
};

  const handleToggleActive = (survey, e) => {
    e.stopPropagation();
    updateSurvey(survey.id, { isActive: !survey.isActive });
    toast.success(survey.isActive ? 'Enkät inaktiverad' : 'Enkät aktiverad');
  };

  if (surveys.length === 0) {
    return (
      <div className="p-12 text-center">
        <Copy className="mx-auto text-slate-300 mb-4" size={48} />
        <p className="text-slate-600">Inga enkäter hittades</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Enkät
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Statistik
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Skapad
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {surveys.map((survey, index) => {
            const stats = getSurveyStats(survey.id);
            
            return (
              <motion.tr
                key={survey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onViewDetails(survey)}
              >
                {/* Survey Info */}
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-slate-900">{survey.title}</div>
                    <div className="text-sm text-slate-500">{survey.description || 'Ingen beskrivning'}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {survey.questions.length} frågor
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={(e) => handleToggleActive(survey, e)}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      survey.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {survey.isActive ? (
                      <>
                        <ToggleRight size={14} />
                        Aktiv
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={14} />
                        Inaktiv
                      </>
                    )}
                  </button>
                </td>

                {/* Stats */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users size={14} />
                      <span>{stats.totalResponses}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Clock size={14} />
                      <span>{Math.floor(stats.avgTimeSeconds / 60)}m</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <TrendingUp size={14} />
                      <span>{stats.completionRate}%</span>
                    </div>
                  </div>
                </td>

                {/* Created */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">
                    {new Date(survey.createdAt).toLocaleDateString('sv-SE')}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(survey);
                      }}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                      title="Visa detaljer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(survey);
                      }}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition-colors"
                      title="Redigera"
                    >
                      <Edit2 size={18} />
                    </button>

                     <button
    onClick={(e) => handleSendEmails(survey, e)}
    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
    title="Skicka ut"
  >
    <Send size={18} />
  </button>

                    <button
                      onClick={(e) => handleCopyLink(survey, e)}
                      className="p-1.5 hover:bg-purple-50 text-purple-600 rounded transition-colors"
                      title="Kopiera länk"
                    >
                      <ExternalLink size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDuplicate(survey, e)}
                      className="p-1.5 hover:bg-green-50 text-green-600 rounded transition-colors"
                      title="Duplicera"
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(survey, e)}
                      className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                      title="Ta bort"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyList;