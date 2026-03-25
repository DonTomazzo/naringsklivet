// TeamEditModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Save, Building2, Mail, Phone, Image, Users } from 'lucide-react';

function TeamEditModal({ team, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: team.name,
    company: team.company,
    contactEmail: team.contactEmail || '',
    contactPhone: team.contactPhone || '',
    logoUrl: team.logoUrl || '',
    description: team.description || '',
    maxMembers: team.maxMembers || 50,
    status: team.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Teamnamn krävs';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Företagsnamn krävs';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email krävs';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Ogiltig email-adress';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      onSave({
        ...team,
        ...formData
      });
      setSaving(false);
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
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-2xl font-bold text-slate-900">Redigera team</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Building2 size={16} className="inline mr-1" />
                Teamnamn *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="t.ex. Stockholm Syd"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Building2 size={16} className="inline mr-1" />
                Företag *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="t.ex. Acme AB"
              />
              {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Kontaktemail *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="contact@company.com"
              />
              {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Telefon
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+46 8 123 456 78"
              />
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Image size={16} className="inline mr-1" />
                Logotyp URL
              </label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Beskrivning
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Beskriv teamet..."
              />
            </div>

            {/* Max Members */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Users size={16} className="inline mr-1" />
                Max antal medlemmar
              </label>
              <input
                type="number"
                value={formData.maxMembers}
                onChange={(e) => handleChange('maxMembers', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Aktiv</option>
                <option value="inactive">Inaktiv</option>
                <option value="pending">Väntar</option>
              </select>
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
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sparar...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Spara ändringar
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TeamEditModal;
