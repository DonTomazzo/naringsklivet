import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Lock, Mail, Copy, RefreshCw, Check } from 'lucide-react';

function UserPasswordResetModal({ user, onClose, onReset }) {
  const [method, setMethod] = useState('email'); // 'email' or 'manual'
  const [newPassword, setNewPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setNewPassword(password);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    setSending(true);

    // Simulate API call
    setTimeout(() => {
      if (method === 'email') {
        onReset({
          userId: user.id,
          method: 'email',
          email: user.email
        });
      } else {
        onReset({
          userId: user.id,
          method: 'manual',
          newPassword
        });
      }
      setSending(false);
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Återställ lösenord</h2>
              <p className="text-sm text-slate-600 mt-1">För: {user.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Method Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Välj metod
              </label>
              <div className="space-y-3">
                {/* Email method */}
                <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  method === 'email' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="method"
                    value="email"
                    checked={method === 'email'}
                    onChange={(e) => setMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <Mail size={18} />
                      Skicka återställningslänk via email
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Användaren får ett email med en länk för att återställa sitt lösenord själv.
                    </p>
                  </div>
                </label>

                {/* Manual method */}
                <label className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  method === 'manual' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="method"
                    value="manual"
                    checked={method === 'manual'}
                    onChange={(e) => setMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <Lock size={18} />
                      Generera nytt lösenord
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Du skapar ett nytt lösenord som du kan dela med användaren.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Manual password generation */}
            {method === 'manual' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nytt lösenord
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Klicka på generera..."
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                      title="Generera lösenord"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>

                {newPassword && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="text-blue-600 mt-0.5" size={18} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-900 mb-2">
                          Nytt lösenord genererat
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded text-sm font-mono text-blue-900">
                            {newPassword}
                          </code>
                          <button
                            onClick={copyToClipboard}
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Kopierat!' : 'Kopiera'}
                          </button>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                          ⚠️ Glöm inte att dela detta lösenord med användaren på ett säkert sätt!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Email confirmation */}
            {method === 'email' && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-slate-600 mt-0.5" size={18} />
                  <div>
                    <div className="text-sm font-medium text-slate-900 mb-1">
                      Email skickas till:
                    </div>
                    <div className="text-sm text-slate-700 font-mono bg-white px-3 py-1 rounded border border-slate-300">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              disabled={sending}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors font-medium"
            >
              Avbryt
            </button>
            <button
              onClick={handleSubmit}
              disabled={sending || (method === 'manual' && !newPassword)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {method === 'email' ? 'Skickar...' : 'Återställer...'}
                </>
              ) : (
                <>
                  <Lock size={18} />
                  {method === 'email' ? 'Skicka email' : 'Återställ lösenord'}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserPasswordResetModal;