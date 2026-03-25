import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTeam } from '../../../../contexts/MockTeamContext';
import { X, UserPlus, Mail, Phone, User, Shield, Key, RefreshCw } from 'lucide-react';

function UserCreateModal({ onClose, onCreate }) {
  const { teams } = useTeam();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'team_member',
    teamId: '',
    sendWelcomeEmail: true
  });
  const [errors, setErrors] = useState({});
  const [creating, setCreating] = useState(false);

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Namn krävs';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email krävs';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ogiltig email-adress';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Lösenord krävs';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Lösenordet måste vara minst 6 tecken';
    }

    if (!formData.role) {
      newErrors.role = 'Roll krävs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setCreating(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        ...formData
      };
      onCreate(newUser);
      setCreating(false);
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
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Skapa ny användare</h2>
              <p className="text-sm text-slate-600 mt-1">Lägg till en ny användare i systemet</p>
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
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <User size={16} className="inline mr-1" />
                Namn *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Anna Lindberg"
                autoFocus
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="anna@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="+46 70 123 45 67"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Key size={16} className="inline mr-1" />
                Lösenord *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Minst 6 tecken"
                />
                <button
                  type="button"
                  onClick={generatePassword}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="Generera slumpmässigt lösenord"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                Tips: Använd generera-knappen för ett starkt lösenord
              </p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Shield size={16} className="inline mr-1" />
                Roll *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="team_member">Team Member</option>
                <option value="team_leader">Team Leader</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role}</p>
              )}
            </div>

            {/* Team */}
            {formData.role !== 'admin' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Team
                </label>
                <select
                  value={formData.teamId}
                  onChange={(e) => handleChange('teamId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Inget team (valfritt)</option>
                  {Object.values(teams).map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Användare kan tilldelas team senare
                </p>
              </div>
            )}

            {/* Welcome Email */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendWelcomeEmail}
                  onChange={(e) => handleChange('sendWelcomeEmail', e.target.checked)}
                  className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                />
                <div>
                  <div className="text-sm font-medium text-blue-900">
                    Skicka välkomstmail
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    Användaren får ett email med inloggningsuppgifter och en välkomsthälsning
                  </div>
                </div>
              </label>
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
              disabled={creating}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {creating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Skapar...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Skapa användare
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserCreateModal;