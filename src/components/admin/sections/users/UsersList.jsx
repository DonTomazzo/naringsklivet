import { motion } from 'framer-motion';
import { 
  Eye, Edit2, Mail, Lock, Trash2, 
  Crown, Users as UsersIcon, Shield 
} from 'lucide-react';

function UsersList({ users, teams, onViewUser, onEditUser }) {
  const getRoleBadge = (role) => {
    const badges = {
      admin: { label: 'Admin', color: 'bg-purple-100 text-purple-700', icon: Shield },
      team_leader: { label: 'Team Leader', color: 'bg-blue-100 text-blue-700', icon: Crown },
      team_member: { label: 'Member', color: 'bg-green-100 text-green-700', icon: UsersIcon }
    };
    return badges[role] || badges.team_member;
  };

  const getTeamName = (teamId) => {
    if (!teamId) return '-';
    return teams[teamId]?.name || 'Okänt team';
  };

  const handleDelete = (user, e) => {
    e.stopPropagation();
    if (confirm(`Är du säker på att du vill ta bort ${user.name}?`)) {
      console.log('Delete user:', user);
      // TODO: Implement delete
    }
  };

  const handleResetPassword = (user, e) => {
    e.stopPropagation();
    if (confirm(`Skicka återställningslänk till ${user.email}?`)) {
      console.log('Reset password for:', user);
      // TODO: Implement password reset
    }
  };

  const handleSendMessage = (user, e) => {
    e.stopPropagation();
    console.log('Send message to:', user);
    // TODO: Open message modal
  };

  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <UsersIcon className="mx-auto text-slate-300 mb-4" size={48} />
        <p className="text-slate-600">Inga användare hittades</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Användare
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Roll
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
              Kontakt
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
              Åtgärder
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => {
            const roleBadge = getRoleBadge(user.role);
            const RoleIcon = roleBadge.icon;

            return (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onViewUser(user)}
              >
                {/* User Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge.color}`}>
                    <RoleIcon size={12} />
                    {roleBadge.label}
                  </span>
                </td>

                {/* Team */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{getTeamName(user.teamId)}</div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">{user.phone || '-'}</div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewUser(user);
                      }}
                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                      title="Visa detaljer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditUser(user);
                      }}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 rounded transition-colors"
                      title="Redigera"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => handleSendMessage(user, e)}
                      className="p-1.5 hover:bg-green-50 text-green-600 rounded transition-colors"
                      title="Skicka meddelande"
                    >
                      <Mail size={18} />
                    </button>
                    <button
                      onClick={(e) => handleResetPassword(user, e)}
                      className="p-1.5 hover:bg-orange-50 text-orange-600 rounded transition-colors"
                      title="Återställ lösenord"
                    >
                      <Lock size={18} />
                    </button>
                    {user.role !== 'admin' && (
                      <button
                        onClick={(e) => handleDelete(user, e)}
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                        title="Ta bort"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
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

export default UsersList;