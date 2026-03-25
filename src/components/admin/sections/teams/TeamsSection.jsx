import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../../../contexts/MockTeamContext';
import {
  Users, Plus, Search, Download, Building2,
  TrendingUp, Award, Target, Settings
} from 'lucide-react';
import TeamsList from './TeamsList';
import TeamDetailModal from './TeamDetailModal';
import TeamEditModal from './TeamEditModal';
import TeamCreateModal from './TeamCreateModal';
import TeamCoursesModal from './TeamCoursesModal';
import TeamDeleteModal from './TeamDeleteModal';
import { toast } from 'react-toastify';

function TeamsSection() {
  const { teams, users, courses } = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Convert teams object to array
  const teamsArray = Object.values(teams);

  // Filter teams
  const filteredTeams = teamsArray.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (team.company && team.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate stats
  const totalTeams = teamsArray.length;
  const totalMembers = Object.values(users).filter(u => u.teamId).length;
  const activeTeams = teamsArray.filter(t => t.status === 'active').length;
  const totalCourses = teamsArray.reduce((sum, team) => 
    sum + (team.assignedCourses?.length || 0), 0
  );

  // Handlers
  const handleViewTeam = (team) => {
    setSelectedTeam(team);
    setShowDetailModal(true);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setShowEditModal(true);
  };

  const handleManageCourses = (team) => {
    setSelectedTeam(team);
    setShowCoursesModal(true);
  };

  const handleDeleteTeam = (team) => {
    setSelectedTeam(team);
    setShowDeleteModal(true);
  };

  const handleCreateTeam = (teamData) => {
    console.log('Creating team:', teamData);
    toast.success(`Team "${teamData.name}" skapat!`);
    setShowCreateModal(false);
  };

  const handleUpdateTeam = (updatedTeam) => {
    console.log('Updating team:', updatedTeam);
    toast.success('Team uppdaterat!');
    setShowEditModal(false);
    setSelectedTeam(null);
  };

  const handleUpdateCourses = (teamId, courses) => {
    console.log('Updating courses for team:', teamId, courses);
    toast.success('Kurser uppdaterade!');
    setShowCoursesModal(false);
    setSelectedTeam(null);
  };

  const handleDelete = (teamId, reassignUsers) => {
    console.log('Deleting team:', teamId, 'Reassign users:', reassignUsers);
    toast.success('Team borttaget!');
    setShowDeleteModal(false);
    setSelectedTeam(null);
  };

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
            <Building2 className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalTeams}</div>
          <p className="text-sm text-slate-600 mt-1">Totala teams</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{activeTeams}</div>
          <p className="text-sm text-slate-600 mt-1">Aktiva teams</p>
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
          <div className="text-3xl font-bold text-slate-900">{totalMembers}</div>
          <p className="text-sm text-slate-600 mt-1">Medlemmar</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="text-orange-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalCourses}</div>
          <p className="text-sm text-slate-600 mt-1">Tilldelade kurser</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Teamhantering</h2>
              <p className="text-sm text-slate-600 mt-1">
                Skapa och hantera kundteams, tilldela kurser och generera koder
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} />
              Nytt team
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
              placeholder="Sök teams (namn, företag)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-600">
              Visar {filteredTeams.length} av {totalTeams} teams
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
              <Download size={18} />
              Exportera
            </button>
          </div>
        </div>

        {/* Teams List */}
        <TeamsList
          teams={filteredTeams}
          users={users}
          onViewTeam={handleViewTeam}
          onEditTeam={handleEditTeam}
          onManageCourses={handleManageCourses}
          onDeleteTeam={handleDeleteTeam}
        />
      </div>

      {/* Modals */}
      {showCreateModal && (
        <TeamCreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTeam}
        />
      )}

      {showDetailModal && selectedTeam && (
        <TeamDetailModal
          team={selectedTeam}
          users={users}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedTeam(null);
          }}
          onEdit={handleEditTeam}
          onManageCourses={handleManageCourses}
        />
      )}

      {showEditModal && selectedTeam && (
        <TeamEditModal
          team={selectedTeam}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTeam(null);
          }}
          onSave={handleUpdateTeam}
        />
      )}

      {showCoursesModal && selectedTeam && (
        <TeamCoursesModal
          team={selectedTeam}
          onClose={() => {
            setShowCoursesModal(false);
            setSelectedTeam(null);
          }}
          onSave={handleUpdateCourses}
        />
      )}

      {showDeleteModal && selectedTeam && (
        <TeamDeleteModal
          team={selectedTeam}
          users={users}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTeam(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default TeamsSection;