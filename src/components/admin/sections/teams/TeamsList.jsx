import { motion } from 'framer-motion';
import { 
  Eye, Edit2, Trash2, Users, BookOpen, 
  Building2, Key, Settings
} from 'lucide-react';

function TeamsList({ teams, users, onViewTeam, onEditTeam, onManageCourses, onDeleteTeam }) {
  
  const getTeamMembersCount = (teamId) => {
    return Object.values(users).filter(u => u.teamId === teamId).length;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Aktiv', color: 'bg-green-100 text-green-700' },
      inactive: { label: 'Inaktiv', color: 'bg-gray-100 text-gray-700' },
      pending: { label: 'Väntar', color: 'bg-yellow-100 text-yellow-700' }
    };
    return badges[status] || badges.active;
  };

  if (teams.length === 0) {
    return (
      <div className="p-12 text-center">
        <Building2 className="mx-auto text-slate-300 mb-4" size={48} />
        <p className="text-slate-600">Inga teams hittades</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Företag
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Medlemmar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Kurser
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team, index) => {
            const membersCount = getTeamMembersCount(team.id);
            const statusBadge = getStatusBadge(team.status);
            const coursesCount = team.assignedCourses?.length || 0;

            return (
              <motion.tr
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onViewTeam(team)}
              >
                {/* Team Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {team.logoUrl ? (
                      <img 
                        src={team.logoUrl} 
                        alt={team.name}
                        className="w-10 h-10 rounded-lg object-contain bg-gray-100 p-1"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                        {team.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-900">{team.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Key size={12} />
                        {team.accessCode}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{team.company}</div>
                  {team.contactEmail && (
                    <div className="text-xs text-slate-500">{team.contactEmail}</div>
                  )}
                </td>

                {/* Members */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">
                      {membersCount} / {team.maxMembers || 50}
                    </span>
                  </div>
                </td>

                {/* Courses */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-900">
                      {coursesCount}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewTeam(team);
                      }}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                      title="Visa detaljer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTeam(team);
                      }}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition-colors"
                      title="Redigera"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onManageCourses(team);
                      }}
                      className="p-1.5 hover:bg-orange-50 text-orange-600 rounded transition-colors"
                      title="Hantera kurser"
                    >
                      <BookOpen size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTeam(team);
                      }}
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

export default TeamsList;