import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSurvey } from '../../../../contexts/MockSurveyContext';
import {
  ClipboardList, Plus, Search, TrendingUp, Users, CheckCircle, Clock
} from 'lucide-react';
import SurveyList from './SurveyList';
import SurveyBuilder from './SurveyBuilder';
import SurveyEmailModal from './SurveyEmailModal';
import SurveyDetailModal from './SurveyDetailModal';

function SurveySection() {
  const { surveys, getSurveyStats } = useSurvey();
  const [searchTerm, setSearchTerm] = useState('');
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailingSurvey, setEmailingSurvey] = useState(null);

  const surveysArray = Object.values(surveys);

  // Filter surveys
  const filteredSurveys = surveysArray.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalSurveys = surveysArray.length;
  const activeSurveys = surveysArray.filter(s => s.isActive).length;
  const totalResponses = surveysArray.reduce((sum, survey) => {
    const stats = getSurveyStats(survey.id);
    return sum + stats.totalResponses;
  }, 0);

  const handleCreateNew = () => {
    setEditingSurvey(null);
    setShowBuilder(true);
  };

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
    setShowBuilder(true);
  };

  const handleViewDetails = (survey) => {
    setSelectedSurvey(survey);
    setShowDetailModal(true);
  };

  const handleSendEmails = (survey) => {
  setEmailingSurvey(survey);
  setShowEmailModal(true);
};

  const handleCloseBuilder = () => {
    setShowBuilder(false);
    setEditingSurvey(null);
  };

  if (showBuilder) {
    return (
      <SurveyBuilder
        survey={editingSurvey}
        onClose={handleCloseBuilder}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <ClipboardList className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalSurveys}</div>
          <p className="text-sm text-slate-600 mt-1">Totala enkäter</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{activeSurveys}</div>
          <p className="text-sm text-slate-600 mt-1">Aktiva enkäter</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalResponses}</div>
          <p className="text-sm text-slate-600 mt-1">Totala svar</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-orange-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {totalSurveys > 0 ? Math.round(totalResponses / totalSurveys) : 0}
          </div>
          <p className="text-sm text-slate-600 mt-1">Snitt svar/enkät</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Enkäter & Undersökningar</h2>
              <p className="text-sm text-slate-600 mt-1">
                Skapa och hantera enkäter för feedback och utvärdering
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} />
              Ny enkät
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök enkäter..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Survey List */}
        <SurveyList
          surveys={filteredSurveys}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onSendEmails={handleSendEmails}
        />
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedSurvey && (
        <SurveyDetailModal
          survey={selectedSurvey}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedSurvey(null);
          }}
          onEdit={() => {
            setShowDetailModal(false);
            handleEdit(selectedSurvey);
          }}
        />
      )}
      {showEmailModal && emailingSurvey && (
  <SurveyEmailModal
    survey={emailingSurvey}
    onClose={() => {
      setShowEmailModal(false);
      setEmailingSurvey(null);
    }}
    onSend={(invites) => {
      console.log('Sending invites:', invites);
      toast.success(`${invites.length} inbjudningar skickade!`);
      // TODO: Spara till context/database
      setShowEmailModal(false);
      setEmailingSurvey(null);
    }}
  />
)}
    </div>
  );
}

export default SurveySection;