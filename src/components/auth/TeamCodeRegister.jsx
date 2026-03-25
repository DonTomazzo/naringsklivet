import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../contexts/MockTeamContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, AlertCircle, User, Mail, Phone, Key } from 'lucide-react';

function TeamCodeRegister() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerWithTeamCode } = useTeam();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'code' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.code.trim()) {
      setError('Vänligen ange en teamkod');
      setLoading(false);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Vänligen fyll i alla fält');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Lösenorden matchar inte');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const result = registerWithTeamCode(formData.code, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      if (result.success) {
        if (result.user.role === 'team_leader') {
          navigate('/team-leader-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-orange-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Skapa ditt konto
            </h2>
            <p className="text-slate-600">
              Använd din teamkod för att komma igång
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Lock size={16} className="inline mr-1" />
                Teamkod *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="MASTER-XXXXX eller MEMBER-XXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all uppercase"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <User size={16} className="inline mr-1" />
                Namn *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Anna Lindberg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                E-post *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="anna@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Mobilnummer *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="070-123 45 67"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Key size={16} className="inline mr-1" />
                Lösenord * (minst 6 tecken)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Key size={16} className="inline mr-1" />
                Bekräfta lösenord *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
              >
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-red-700">{error}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Skapar konto...
                </span>
              ) : (
                'Skapa konto'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Har du redan ett konto?{' '}
              <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                Logga in här
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">
                💡 Testkod för demo:
              </p>
              <p className="text-sm text-blue-700">
                <code className="bg-blue-100 px-2 py-0.5 rounded">MASTER-DEMO123</code> - Bli Team Leader
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TeamCodeRegister;