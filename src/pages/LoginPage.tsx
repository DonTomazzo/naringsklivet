// src/pages/LoginPage.tsx
// Magic link login via Supabase — ersätter MockTeamContext-login

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const O  = '#FF5421';
const OD = '#E04619';

type State = 'idle' | 'loading' | 'sent' | 'error';

const LoginPage = () => {
  const [email, setEmail]   = useState('');
  const [state, setState]   = useState<State>('idle');
  const [error, setError]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: false, // bara registrerade användare
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      // Supabase returnerar inte explicit "user not found" av säkerhetsskäl
      // men vi visar ett generiskt felmeddelande
      setError('Något gick fel. Kontrollera att du använder rätt e-postadress.');
      setState('error');
    } else {
      setState('sent');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        background: 'linear-gradient(135deg, #171f32 0%, #0f1623 60%, #1a1200 100%)',
      }}
    >
      {/* Bakgrundsdekor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${O}12 0%, transparent 70%)`,
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff06 0%, transparent 70%)',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="Styrelsekörkortet" className="w-16 h-16 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-black tracking-tight"
              style={{ color: '#fff', fontFamily: "'Nunito', sans-serif" }}>
              <span style={{ color: O }}>Styrelse</span>körkortet®
            </h1>
          </Link>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Logga in för att fortsätta din utbildning
          </p>
        </div>

        {/* Kort */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)' }}>

          <AnimatePresence mode="wait">

            {/* ── FORMULÄR ── */}
            {(state === 'idle' || state === 'loading' || state === 'error') && (
              <motion.div key="form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-8 sm:p-10">

                <h2 className="text-xl font-black text-white mb-1"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Välkommen tillbaka
                </h2>
                <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Ange din e-postadress så skickar vi en inloggningslänk.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: 'rgba(255,255,255,0.5)' }}>
                      E-postadress
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="din@email.se"
                        required
                        disabled={state === 'loading'}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: `1.5px solid ${state === 'error' ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
                          color: '#fff',
                        }}
                        onFocus={e => e.target.style.borderColor = O}
                        onBlur={e => e.target.style.borderColor = state === 'error' ? '#ef4444' : 'rgba(255,255,255,0.12)'}
                      />
                    </div>
                  </div>

                  {/* Felmeddelande */}
                  <AnimatePresence>
                    {state === 'error' && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm px-4 py-3 rounded-xl"
                        style={{ background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={state === 'loading' || !email.trim()}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-white text-sm transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${O}, ${OD})`,
                      boxShadow: `0 8px 24px ${O}40`,
                      opacity: (!email.trim() || state === 'loading') ? 0.6 : 1,
                    }}>
                    {state === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Skickar länk...</>
                    ) : (
                      <>Skicka inloggningslänk <ArrowRight className="w-4 h-4" /></>
                    )}
                  </motion.button>
                </form>

                {/* Info */}
                <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Ingen länk? Kontakta{' '}
                  <a href="mailto:tomas@styrelsekorkortet.se"
                    className="underline hover:opacity-80 transition-opacity"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    tomas@styrelsekorkortet.se
                  </a>
                </p>
              </motion.div>
            )}

            {/* ── SKICKAD ── */}
            {state === 'sent' && (
              <motion.div key="sent"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-10 text-center">

                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: `${O}20`, border: `2px solid ${O}40` }}>
                  <CheckCircle className="w-8 h-8" style={{ color: O }} />
                </motion.div>

                <h2 className="text-xl font-black text-white mb-3"
                  style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Kolla din mejl!
                </h2>
                <p className="text-sm leading-relaxed mb-6"
                  style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Vi har skickat en inloggningslänk till{' '}
                  <span className="font-bold" style={{ color: 'rgba(255,255,255,0.8)' }}>{email}</span>.
                  Länken är giltig i 60 minuter.
                </p>

                <div className="rounded-2xl p-4 mb-6 text-left"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Hittar du ingen mejl?
                  </p>
                  {['Kontrollera skräpposten','Länken kan ta någon minut att komma','Mejladressen måste vara den du är registrerad med'].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: O }} />
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{tip}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setState('idle'); }}
                  className="text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: O }}>
                  ← Prova en annan adress
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Har du inget konto?{' '}
          <Link to="/purchase/styrelsekorkortet-grund"
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Köp kurs här
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;