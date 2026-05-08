// src/pages/LoginPage.tsx
// Magic link login via Supabase — ljus cream/sand-design med blobbar

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const O     = '#FF5421';
const OD    = '#E04619';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const NAVY3 = '#2a3f55';
const CREAM = '#FFF4EF';
const SAND  = '#FAFAF8';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';

type State = 'idle' | 'loading' | 'sent' | 'error';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError('Något gick fel eller så har du inte köpt kursen. Kontrollera att du använder rätt e-postadress eller gå till kursköp.');
      setState('error');
    } else {
      setState('sent');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: SAND,
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Blob-bakgrund ── */}
      <svg style={{ position: 'absolute', top: -80, right: -100, width: 520, height: 480, opacity: 0.55, pointerEvents: 'none' }} viewBox="0 0 520 480">
        <path d="M290,42 C370,14 472,72 458,186 C444,300 356,372 248,356 C140,340 54,256 76,152 C98,48 210,70 290,42Z" fill={SAND2}/>
      </svg>
      <svg style={{ position: 'absolute', top: 40, right: 80, width: 160, height: 148, opacity: 0.80, pointerEvents: 'none' }} viewBox="0 0 160 148">
        <path d="M82,10 C112,2 144,24 138,66 C132,108 98,132 66,124 C34,116 8,82 16,46 C24,10 52,18 82,10Z" fill={O} fillOpacity="0.15"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: -60, left: -60, width: 380, height: 350, opacity: 0.50, pointerEvents: 'none' }} viewBox="0 0 380 350">
        <path d="M180,30 C246,8 334,56 322,152 C310,248 232,308 152,294 C72,280 10,202 30,114 C50,26 114,52 180,30Z" fill={NAVY} fillOpacity="0.08"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 40, right: -30, width: 240, height: 220, opacity: 0.45, pointerEvents: 'none' }} viewBox="0 0 240 220">
        <path d="M118,20 C158,5 212,38 206,100 C200,162 156,200 106,192 C56,184 8,140 18,84 C28,28 78,35 118,20Z" fill={SAND2}/>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', width: '100%', maxWidth: 440 }}
      >

        {/* ── Logo ── */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Styrelsekörkortet"
              style={{ width: 56, height: 56, objectFit: 'contain', margin: '0 auto 12px', display: 'block' }} />
            <h1 style={{
              fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em',
              fontFamily: "'Nunito', sans-serif", color: NAVY, margin: 0,
            }}>
              <span style={{ color: O }}>Styrelse</span>körkortet®
            </h1>
          </Link>
          <p style={{
            fontSize: 13, color: MID, marginTop: 6,
            fontFamily: "'Nunito', sans-serif",
          }}>
            Logga in för att fortsätta din utbildning
          </p>
        </div>

        {/* ── Kort ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: 24,
          border: `1px solid ${SAND2}`,
          boxShadow: '0 8px 40px rgba(23,31,50,0.10)',
          overflow: 'hidden',
        }}>

          <AnimatePresence mode="wait">

            {/* ── FORMULÄR ── */}
            {(state === 'idle' || state === 'loading' || state === 'error') && (
              <motion.div key="form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: '40px 40px 36px' }}
              >
                {/* Eyebrow + rubrik */}
                <p style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: O,
                  fontFamily: 'monospace', margin: '0 0 8px',
                }}>
                  Styrelsekörkortet · Logga in
                </p>
                <h2 style={{
                  fontSize: 26, fontWeight: 900, color: NAVY,
                  fontFamily: "'Nunito', sans-serif",
                  margin: '0 0 6px', letterSpacing: '-0.01em',
                }}>
                  Välkommen tillbaka
                </h2>
                <p style={{
                  fontSize: 14, color: MID, lineHeight: 1.6,
                  fontFamily: "'Nunito', sans-serif", margin: '0 0 28px',
                }}>
                  Ange din e-postadress så skickar vi en inloggningslänk.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* E-postfält */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{
                      display: 'block', fontSize: 11, fontWeight: 800,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: MID, marginBottom: 8, fontFamily: 'monospace',
                    }}>
                      E-postadress
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail style={{
                        position: 'absolute', left: 14, top: '50%',
                        transform: 'translateY(-50%)', width: 16, height: 16,
                        color: state === 'error' ? '#ef4444' : SAND2,
                      }} />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="din@email.se"
                        required
                        disabled={state === 'loading'}
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          paddingLeft: 42, paddingRight: 16,
                          paddingTop: 14, paddingBottom: 14,
                          borderRadius: 12, fontSize: 14, fontWeight: 500,
                          background: SAND,
                          border: `1.5px solid ${state === 'error' ? '#ef4444' : SAND2}`,
                          color: NAVY, outline: 'none',
                          fontFamily: "'Nunito', sans-serif",
                          transition: 'border-color 0.15s',
                        }}
                        onFocus={e => (e.target.style.borderColor = O)}
                        onBlur={e => (e.target.style.borderColor = state === 'error' ? '#ef4444' : SAND2)}
                      />
                    </div>
                  </div>

                  {/* Felmeddelande */}
                  <AnimatePresence>
                    {state === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                          marginBottom: 14, padding: '12px 16px', borderRadius: 10,
                          background: 'rgba(239,68,68,0.07)',
                          border: '1px solid rgba(239,68,68,0.20)',
                        }}
                      >
                        <p style={{ fontSize: 13, color: '#dc2626', lineHeight: 1.55, margin: 0, fontFamily: "'Nunito', sans-serif" }}>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Knapp */}
                  <motion.button
                    type="submit"
                    disabled={state === 'loading' || !email.trim()}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 8,
                      padding: '15px 20px', borderRadius: 12,
                      background: `linear-gradient(135deg, ${O}, ${OD})`,
                      border: 'none', cursor: 'pointer',
                      color: '#fff', fontSize: 15, fontWeight: 800,
                      fontFamily: "'Nunito', sans-serif",
                      boxShadow: `0 6px 20px ${O}35`,
                      opacity: (!email.trim() || state === 'loading') ? 0.55 : 1,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    {state === 'loading' ? (
                      <><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Skickar länk...</>
                    ) : (
                      <>Skicka inloggningslänk <ArrowRight style={{ width: 16, height: 16 }} /></>
                    )}
                  </motion.button>
                </form>

                {/* Info */}
                <p style={{
                  textAlign: 'center', fontSize: 12,
                  color: MID, marginTop: 20,
                  fontFamily: "'Nunito', sans-serif",
                }}>
                  Ingen länk? Kontakta{' '}
                  <a href="mailto:tomas@styrelsekorkortet.se"
                    style={{ color: O, fontWeight: 600, textDecoration: 'none' }}>
                    tomas@styrelsekorkortet.se
                  </a>
                </p>
              </motion.div>
            )}

            {/* ── SKICKAD ── */}
            {state === 'sent' && (
              <motion.div key="sent"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '40px 40px 36px', textAlign: 'center' }}
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `${O}15`, border: `2px solid ${O}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle style={{ width: 30, height: 30, color: O }} />
                </motion.div>

                <p style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: O,
                  fontFamily: 'monospace', margin: '0 0 8px',
                }}>
                  Länk skickad
                </p>
                <h2 style={{
                  fontSize: 24, fontWeight: 900, color: NAVY,
                  fontFamily: "'Nunito', sans-serif", margin: '0 0 10px',
                }}>
                  Kolla din mejl!
                </h2>
                <p style={{
                  fontSize: 14, color: MID, lineHeight: 1.65,
                  fontFamily: "'Nunito', sans-serif", margin: '0 0 24px',
                }}>
                  Vi har skickat en inloggningslänk till{' '}
                  <span style={{ fontWeight: 800, color: NAVY }}>{email}</span>.
                  Länken är giltig i 60 minuter.
                </p>

                {/* Sand-fakta-remsa */}
                <div style={{
                  borderRadius: 12, background: SAND,
                  border: `1px solid ${SAND2}`, padding: '16px 20px',
                  textAlign: 'left', marginBottom: 20,
                }}>
                  <p style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: O,
                    fontFamily: 'monospace', margin: '0 0 10px',
                  }}>
                    Hittar du ingen mejl?
                  </p>
                  {[
                    'Kontrollera skräpposten',
                    'Länken kan ta någon minut att komma',
                    'Mejladressen måste vara den du köpte kursen med',
                  ].map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 2 ? 8 : 0 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: O, flexShrink: 0, marginTop: 6,
                      }} />
                      <p style={{
                        fontSize: 13, color: MID, lineHeight: 1.55,
                        fontFamily: "'Nunito', sans-serif", margin: 0,
                      }}>
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setState('idle')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 700, color: O,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  ← Prova en annan adress
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── Footer ── */}
        <div style={{
          marginTop: 16, textAlign: 'center',
          padding: '14px 20px', borderRadius: 12,
          background: CREAM, border: `1px solid ${SAND2}`,
        }}>
          <p style={{
            fontSize: 13, color: MID,
            fontFamily: "'Nunito', sans-serif", margin: 0,
          }}>
            Har du inget konto?{' '}
            <Link to="/purchase/styrelsekorkortet-grund"
              style={{ color: O, fontWeight: 700, textDecoration: 'none' }}>
              Köp kurs här →
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;