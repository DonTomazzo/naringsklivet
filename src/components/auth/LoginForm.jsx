import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../contexts/MockTeamContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle, Mail, Key } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useTeam();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!email || !password) {
    setError('Vänligen fyll i alla fält');
    setLoading(false);
    return;
  }

  setTimeout(() => {
    const result = login(email, password);
    
    if (result.success) {
      // ⭐ Navigera baserat på roll
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'team_leader') {
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
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ backgroundImage: 'url(/t5.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

      
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-orange-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Välkommen tillbaka!
            </h2>
            <p className="text-slate-600">
              Logga in för att fortsätta din utbildning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                E-post
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Key size={16} className="inline mr-1" />
                Lösenord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Loggar in...
                </span>
              ) : (
                'Logga in'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-slate-600">
              Har du ingen kod än?{' '}
              <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium">
                Registrera dig här
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <p className="text-sm text-blue-800 font-medium mb-2">
      💡 Testkonton:
    </p>
    <ul className="text-sm text-blue-700 space-y-1">
      <li>• <strong>Admin:</strong> admin@styrelsekorkortet.se / admin123</li>
      <li>• <strong>Team Leader:</strong> anna@test.se / test123</li>
      <li>• <strong>Team Member:</strong> erik@test.se / test123</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;