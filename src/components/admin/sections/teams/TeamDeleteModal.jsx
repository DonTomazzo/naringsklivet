// ============================================
// TeamDeleteModal.jsx
// ============================================

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, AlertTriangle, Trash2, Users } from 'lucide-react';

function TeamDeleteModal({ team, users, onClose, onDelete }) {
  const [reassignUsers, setReassignUsers] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Get team members
  const teamMembers = Object.values(users).filter(u => u.teamId === team.id);

  const handleDelete = async () => {
    setDeleting(true);
    setTimeout(() => {
      onDelete(team.id, reassignUsers);
      setDeleting(false);
    }, 1000);
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
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">Ta bort team</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Är du säker på att du vill ta bort <strong>{team.name}</strong>?
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                <strong>Varning:</strong> Detta går inte att ångra. Teamet kommer att tas bort permanent från systemet.
              </p>
            </div>

            {/* Team Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Teaminformation</h4>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Företag:</dt>
                  <dd className="font-medium text-slate-900">{team.company}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Medlemmar:</dt>
                  <dd className="font-medium text-slate-900">{teamMembers.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Tilldelade kurser:</dt>
                  <dd className="font-medium text-slate-900">{team.assignedCourses?.length || 0}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-slate-700">
                <strong>Följande kommer att tas bort:</strong>
              </div>
              <ul className="text-sm text-slate-600 space-y-2 ml-4">
                <li>• Teamets information och åtkomstkod</li>
                <li>• Kopplingen mellan teamet och kurser</li>
                <li>• Team leader-status för befintliga ledare</li>
              </ul>
            </div>

            {/* Handle users option */}
            {teamMembers.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reassignUsers}
                    onChange={(e) => setReassignUsers(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-blue-900 flex items-center gap-2">
                      <Users size={16} />
                      Behåll användarna ({teamMembers.length})
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      Om markerat kommer användarna att flyttas till "Utan team" istället för att tas bort.
                      De kan sedan tilldelas ett nytt team.
                    </div>
                  </div>
                </label>
              </div>
            )}

            {!reassignUsers && teamMembers.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm text-red-800">
                  <strong>OBS!</strong> Om du inte behåller användarna kommer alla {teamMembers.length} medlemmar 
                  att tas bort permanent. Deras kursdata och progress kommer att förloras.
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              disabled={deleting}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors font-medium"
            >
              Avbryt
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {deleting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Tar bort...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  Ta bort team
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TeamDeleteModal;