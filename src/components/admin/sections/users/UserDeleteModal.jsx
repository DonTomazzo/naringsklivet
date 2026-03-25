import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

function UserDeleteModal({ user, onClose, onDelete }) {
  const [deleteData, setDeleteData] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    // Simulate API call
    setTimeout(() => {
      onDelete(user.id, deleteData);
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
          className="bg-white rounded-2xl shadow-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">Ta bort användare</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Är du säker på att du vill ta bort <strong>{user.name}</strong>?
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
                <strong>Varning:</strong> Detta går inte att ångra. Användaren kommer att tas bort permanent från systemet.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-slate-700">
                <strong>Följande kommer att tas bort:</strong>
              </div>
              <ul className="text-sm text-slate-600 space-y-2 ml-4">
                <li>• Användarens konto och inloggningsuppgifter</li>
                <li>• Team-medlemskap (om tillämpligt)</li>
                <li>• Genererade koder (om team leader)</li>
              </ul>
            </div>

            {/* Delete course data option */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteData}
                  onChange={(e) => setDeleteData(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-500 rounded focus:ring-red-500"
                />
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    Radera även kursdata
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Ta bort användarens progress, quiz-resultat och certifikat. 
                    Om detta inte är markerat behålls datan för statistik.
                  </div>
                </div>
              </label>
            </div>

            <div className="text-sm text-slate-600">
              <strong>Användarens uppgifter:</strong>
              <div className="mt-2 space-y-1 text-xs bg-gray-50 p-3 rounded">
                <div>Email: {user.email}</div>
                <div>Roll: {user.role}</div>
                {user.teamId && <div>Team ID: {user.teamId}</div>}
              </div>
            </div>
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
                  Ta bort användare
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserDeleteModal;