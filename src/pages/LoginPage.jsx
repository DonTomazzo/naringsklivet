import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTeam } from '../contexts/MockTeamContext';
import { useCompletion } from '../contexts/CompletionContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { modulesData } from '../data/modules2';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useTeam();
  const { completedModules } = useCompletion();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);

    if (result.success) {
      // ⭐ Smart navigation logik
      
      // 1. Om användaren försökte nå en specifik sida, gå dit
      if (location.state?.from) {
        navigate(location.state.from);
        return;
      }

      // 2. Annars, hitta nästa oavslutade modul
      const nextIncompleteModule = modulesData.find(
        module => !completedModules.includes(module.id)
      );

      if (nextIncompleteModule) {
        // Gå till nästa modul som inte är klar
        navigate(`/module/${nextIncompleteModule.slug}`);
      } else {
        // Alla moduler klara - gå till dashboard
        navigate('/dashboard');
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative" style={{ backgroundImage: 'url(/diskri.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800">
              <span className="text-[#FF5421]">Styrelse</span>körkortet
            </h1>
          </Link>
          <p className="text-slate-600 mt-2">Logga in för att fortsätta</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                E-post
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent text-lg"
                  placeholder="din@email.se"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Lösenord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent text-lg"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF5421] to-[#E04A1D] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 shadow-lg"
            >
              {loading ? 'Loggar in...' : 'Logga in'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3 font-semibold">🎯 Testa med demo-konto:</p>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => {
                  setEmail('admin@styrelsekorkortet.se');
                  setPassword('admin123');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 p-3 rounded-lg text-left transition-colors border border-slate-200"
              >
                <p className="font-semibold text-slate-800">👨‍💼 Admin</p>
                <p className="text-slate-600 text-xs">admin@styrelsekorkortet.se / admin123</p>
              </button>
              <button
                onClick={() => {
                  setEmail('anna@test.se');
                  setPassword('test123');
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 p-3 rounded-lg text-left transition-colors border border-slate-200"
              >
                <p className="font-semibold text-slate-800">👩‍🎓 Anna (Användare)</p>
                <p className="text-slate-600 text-xs">anna@test.se / test123</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 mt-6">
          Har du inget konto?{' '}
          <Link to="/purchase/styrelsekorkortet-grund" className="text-[#FF5421] font-semibold hover:underline">
            Köp kurs här
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;