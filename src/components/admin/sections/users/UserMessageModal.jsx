import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, Mail, Paperclip } from 'lucide-react';

function UserMessageModal({ user, onClose, onSend }) {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Ämne krävs';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Meddelande krävs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSending(true);

    // Simulate API call
    setTimeout(() => {
      onSend({
        to: user.email,
        ...formData,
        sentAt: new Date().toISOString()
      });
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
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Skicka meddelande</h2>
              <p className="text-sm text-slate-600 mt-1">Till: {user.name} ({user.email})</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Recipient (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Mottagare
              </label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-700">
                {user.name} &lt;{user.email}&gt;
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ämne *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="t.ex. Viktig information om din kurs"
                autoFocus
              />
              {errors.subject && (
                <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Meddelande *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Skriv ditt meddelande här..."
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Attachment (future feature) */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                disabled
              >
                <Paperclip size={16} />
                Bifoga fil (kommer snart)
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Avbryt
            </button>
            <button
              onClick={handleSubmit}
              disabled={sending}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Skickar...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Skicka meddelande
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserMessageModal;