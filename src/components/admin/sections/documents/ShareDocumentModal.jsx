import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocuments } from '../../../../contexts/MockDocumentContext';
import { useTeam } from '../../../../contexts/MockTeamContext';
import { X, Lock, Users, Globe, Check } from 'lucide-react';
import { toast } from 'react-toastify';

function ShareDocumentModal({ document, onClose, currentUser }) {
  const { shareDocument } = useDocuments();
  const { teams } = useTeam();

  const [visibility, setVisibility] = useState(document.visibility || 'private');
  const [selectedTeams, setSelectedTeams] = useState(document.sharedWithTeams || []);

  const userRole = currentUser?.role || 'team_member';
  const userTeamId = currentUser?.teamId;

  const handleSave = () => {
    // If team leader, auto-add their team
    let teamsToShare = selectedTeams;
    if (visibility === 'team' && userRole === 'team_leader' && userTeamId) {
      teamsToShare = [userTeamId];
    }

    shareDocument(document.id, visibility, teamsToShare, []);
    toast.success('Delningsinställningar uppdaterade!');
    onClose();
  };

  const toggleTeam = (teamId) => {
    setSelectedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
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
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Dela dokument</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-2 truncate">{document.title}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Private */}
            <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              visibility === 'private'
                ? 'border-gray-500 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value)}
                className="mt-1 text-gray-600 focus:ring-gray-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <Lock size={18} className="text-gray-600" />
                  Privat
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  Endast du kan se och redigera detta dokument
                </p>
              </div>
            </label>

            {/* Team (Only for Team Leaders and Admins) */}
            {(userRole === 'team_leader' || userRole === 'admin') && (
              <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                visibility === 'team'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="visibility"
                  value="team"
                  checked={visibility === 'team'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <Users size={18} className="text-blue-600" />
                    Team
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {userRole === 'team_leader' 
                      ? 'Dela med ditt team'
                      : 'Dela med specifika teams'}
                  </p>

                  {/* Team Selection (Admin only) */}
                  {visibility === 'team' && userRole === 'admin' && (
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                      {Object.values(teams).map(team => (
                        <label 
                          key={team.id} 
                          className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTeams.includes(team.id)}
                            onChange={() => toggleTeam(team.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-700">{team.name}</span>
                          <span className="text-xs text-slate-500 ml-auto">
                            {team.members?.length || 0} medlemmar
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Team Leader auto-share info */}
                  {visibility === 'team' && userRole === 'team_leader' && (
                    <div className="mt-2 text-xs text-blue-700 bg-blue-100 px-3 py-2 rounded flex items-center gap-2">
                      <Check size={14} />
                      <span>Delas automatiskt med ditt team</span>
                    </div>
                  )}
                </div>
              </label>
            )}

            {/* Public (Only for Admins) */}
            {userRole === 'admin' && (
              <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                visibility === 'public'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="mt-1 text-green-600 focus:ring-green-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <Globe size={18} className="text-green-600" />
                    Publikt
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Alla användare i systemet kan se detta dokument
                  </p>
                </div>
              </label>
            )}

            {/* Info box */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Tips:</strong> Du kan när som helst ändra delningsinställningar. 
                {userRole === 'admin' && ' Som admin har du alltid full kontroll över alla dokument.'}
                {userRole === 'team_leader' && ' Som team leader kan du dela med ditt team.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Avbryt
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              <Check size={18} />
              Spara ändringar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ShareDocumentModal;