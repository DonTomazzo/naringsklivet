import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../../../contexts/MockTeamContext';
import {
  Users, Plus, Search, Filter, Download,
  TrendingUp, Award, Target
} from 'lucide-react';
import UsersList from './UsersList';
import UserDetailModal from './UserDetailModal';
import UserEditModal from './UserEditModal';
import UserCreateModal from './UserCreateModal';
import UserMessageModal from './UserMessageModal';
import UserDeleteModal from './UserDeleteModal';
import UserPasswordResetModal from './UserPasswordResetModal';
import { toast } from 'react-toastify';

function UsersSection() {
  const { users, teams } = useTeam();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Convert users object to array
  const usersArray = Object.values(users);

  // Filter users
  const filteredUsers = usersArray.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesTeam = filterTeam === 'all' || user.teamId === filterTeam;

    return matchesSearch && matchesRole && matchesTeam;
  });

  // Stats
  const totalUsers = usersArray.length;
  const teamLeaders = usersArray.filter(u => u.role === 'team_leader').length;
  const teamMembers = usersArray.filter(u => u.role === 'team_member').length;
  const totalTeams = Object.keys(teams).length;

  // Handlers
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCreateUser = () => {
    setShowCreateModal(true);
  };

  const handleSendMessage = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
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
            <Users className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalUsers}</div>
          <p className="text-sm text-slate-600 mt-1">Totala användare</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{teamLeaders}</div>
          <p className="text-sm text-slate-600 mt-1">Team Leaders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{teamMembers}</div>
          <p className="text-sm text-slate-600 mt-1">Team Members</p>
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
          <div className="text-3xl font-bold text-slate-900">{totalTeams}</div>
          <p className="text-sm text-slate-600 mt-1">Aktiva teams</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Användarhantering</h2>
              <p className="text-sm text-slate-600 mt-1">
                Hantera alla användare, roller och åtkomst
              </p>
            </div>
            <button
              onClick={handleCreateUser}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={20} />
              Ny användare
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök användare (namn, email)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Alla roller</option>
                <option value="admin">Admin</option>
                <option value="team_leader">Team Leader</option>
                <option value="team_member">Team Member</option>
              </select>
            </div>

            <div className="flex-1">
              <select
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">Alla teams</option>
                {Object.values(teams).map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
                <option value="null">Utan team</option>
              </select>
            </div>

            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={18} />
              <span className="hidden sm:inline">Exportera</span>
            </button>
          </div>

          {/* Results count */}
          <div className="text-sm text-slate-600">
            Visar {filteredUsers.length} av {totalUsers} användare
          </div>
        </div>

        {/* Users List */}
        <UsersList
          users={filteredUsers}
          teams={teams}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onSendMessage={handleSendMessage}
          onResetPassword={handleResetPassword}
          onDeleteUser={handleDeleteUser}
        />
      </div>

      {/* Modals */}
      {showDetailModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedUser(null);
          }}
          onEdit={(user) => {
            setShowDetailModal(false);
            handleEditUser(user);
          }}
        />
      )}

      {showEditModal && selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={(updatedUser) => {
            console.log('Saving user:', updatedUser);
            toast.success('Användare uppdaterad!');
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showCreateModal && (
        <UserCreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(newUser) => {
            console.log('Creating user:', newUser);
            toast.success('Användare skapad!');
            setShowCreateModal(false);
          }}
        />
      )}

      {showMessageModal && selectedUser && (
        <UserMessageModal
          user={selectedUser}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedUser(null);
          }}
          onSend={(messageData) => {
            console.log('Sending message:', messageData);
            toast.success('Meddelande skickat!');
            setShowMessageModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDeleteModal && selectedUser && (
        <UserDeleteModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onDelete={(userId, deleteData) => {
            console.log('Deleting user:', userId, 'Delete data:', deleteData);
            toast.success('Användare borttagen!');
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showPasswordModal && selectedUser && (
        <UserPasswordResetModal
          user={selectedUser}
          onClose={() => {
            setShowPasswordModal(false);
            setSelectedUser(null);
          }}
          onReset={(resetData) => {
            console.log('Password reset:', resetData);
            if (resetData.method === 'email') {
              toast.success('Återställningslänk skickad!');
            } else {
              toast.success('Lösenord återställt!');
            }
            setShowPasswordModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UsersSection;