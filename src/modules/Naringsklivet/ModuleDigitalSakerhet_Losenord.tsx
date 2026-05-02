// src/modules/Naringsklivet/ModuleDigitalSakerhet_Losenord.tsx
// Digital säkerhet för alla — Modul 1: Lösenord & lösenordshanterare
// Struktur per slide: 1. Skräckexempel 2. Nuläge 3. Lösning 4. Nästa kapitel

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Shield, Key, Lock, CheckCircle,
  ChevronRight, ChevronLeft, Eye, EyeOff, Zap, X
} from 'lucide-react';

// ── Brand ─────────────────────────────────────────────────
const O = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';
const DARK = '#0f1623';
const CARD = '#1C2435';
const BORDER = 'rgba(255,255,255,0.1)';

// ── Quiz-frågor ───────────────────────────────────────────
const quizFragor = [
  {
    fraga: 'Vilket av dessa lösenord är säkrast?',
    alternativ: ['Fluffy1234', 'k#9mX!vQ2@nL', 'password', 'Sommar2024'],
    korrekt: 1,
    feedback: 'Rätt! Ett starkt lösenord är långt, slumpmässigt och innehåller en mix av bokstäver, siffror och specialtecken. Undvik ord och datum.',
  },
  {
    fraga: 'Vad är den största fördelen med en lösenordshanterare?',
    alternativ: [
      'Den är gratis',
      'Du slipper komma ihåg unika, starka lösenord för varje tjänst',
      'Den gör lösenorden kortare',
      'Den delar lösenord med kollegor automatiskt',
    ],
    korrekt: 1,
    feedback: 'Exakt. En lösenordshanterare genererar och lagrar unika starka lösenord — du behöver bara komma ihåg ett enda huvudlösenord.',
  },
];

// ── Slide-komponenter ────────────────────────────────────

// Slide 1 — Skräckexemplet
const SlideSkrack = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      {/* Varnings-badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', marginBottom: 32 }}>
        <AlertTriangle size={14} color="#ef4444" />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#ef4444' }}>Verklig konsekvens</span>
      </div>

      {/* Stor siffra */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 96, fontWeight: 900, color: '#ef4444', lineHeight: 1, fontFamily: "'Nunito', sans-serif" }}>3 434</p>
        <p style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>svenska arbetsplatser drabbades förra året</p>
      </div>

      <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75, maxWidth: 580, marginBottom: 40 }}>
        Orsaken? <span style={{ color: '#ef4444', fontWeight: 800 }}>Stulna eller svaga lösenord.</span> En angripare behöver i snitt bara 
        <span style={{ color: '#ef4444', fontWeight: 800 }}> 6 sekunder</span> för att knäcka ett lösenord som "Sommar2024".
      </p>

      {/* Exempel på läckta lösenord */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, maxWidth: 500 }}>
        {['123456', 'password', 'qwerty', 'Sommar2024', '111111', 'abc123'].map((pw, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
            style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', textAlign: 'center' }}>
            <p style={{ fontSize: 14, fontFamily: 'monospace', color: '#ef4444', fontWeight: 700 }}>{pw}</p>
          </motion.div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>Topp 6 vanligaste lösenorden i läckt svensk data</p>
    </motion.div>
  </div>
);

// Slide 2 — Nuläget
const SlideNulage = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: `${O}20`, border: `1px solid ${O}40`, marginBottom: 32 }}>
        <Eye size={14} color={O} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>Nuläget</span>
      </div>

      <h2 style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1.2, fontFamily: "'Nunito', sans-serif", marginBottom: 32 }}>
        Faktum är att de flesta<br /><span style={{ color: O }}>använder samma lösenord</span><br />överallt
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640, marginBottom: 36 }}>
        {[
          { siffra: '65%', text: 'återanvänder samma lösenord på flera tjänster' },
          { siffra: '45%', text: 'har aldrig bytt sitt e-postlösenord' },
          { siffra: '13s', text: 'tar det att knäcka ett 6-siffrigt lösenord' },
          { siffra: '81%', text: 'av intrång beror på svaga eller stulna lösenord' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            style={{ padding: '20px 22px', borderRadius: 16, background: CARD, border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 36, fontWeight: 900, color: O, fontFamily: "'Nunito', sans-serif" }}>{s.siffra}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginTop: 4 }}>{s.text}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: '#fff' }}>Det räcker att ett enda konto läcker</strong> — om du använder samma lösenord på jobbet som privat kan angriparen komma in överallt.
        </p>
      </div>
    </motion.div>
  </div>
);

// Slide 3 — Lösningen: Skapa starka lösenord
const SlideLosning1 = () => {
  const [visaLosenord, setVisaLosenord] = useState(false);
  const svagt = 'Sommar2024';
  const starkt = 'k#9mX!vQ2@nL';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', marginBottom: 32 }}>
          <Shield size={14} color="#10b981" />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#10b981' }}>Lösningen</span>
        </div>

        <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.2, fontFamily: "'Nunito', sans-serif", marginBottom: 32 }}>
          Så skapar du ett<br /><span style={{ color: '#10b981' }}>lösenord som håller</span>
        </h2>

        {/* Svagt vs starkt */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.3)' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#ef4444', letterSpacing: 1, marginBottom: 12 }}>✗ SVAGT</p>
            <p style={{ fontSize: 22, fontFamily: 'monospace', color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>{svagt}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Knäcks på 13 sekunder</p>
          </div>
          <div style={{ padding: '20px 24px', borderRadius: 16, background: 'rgba(16,185,129,0.08)', border: '2px solid rgba(16,185,129,0.3)' }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#10b981', letterSpacing: 1, marginBottom: 12 }}>✓ STARKT</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <p style={{ fontSize: 22, fontFamily: 'monospace', color: '#10b981', fontWeight: 700 }}>
                {visaLosenord ? starkt : '••••••••••••'}
              </p>
              <button onClick={() => setVisaLosenord(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                {visaLosenord ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Knäcks om ~34 miljoner år</p>
          </div>
        </div>

        {/* Regler */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { ikon: '📏', titel: 'Minst 12 tecken', text: 'Längd är viktigast — varje extra tecken gör det exponentiellt svårare' },
            { ikon: '🎲', titel: 'Slumpmässigt', text: 'Inga ord, datum eller namn — det är det första en angripare provar' },
            { ikon: '🔀', titel: 'Blandade tecken', text: 'Stora + små bokstäver, siffror och specialtecken (#!@$)' },
            { ikon: '🔑', titel: 'Unikt per tjänst', text: 'Aldrig samma lösenord på jobbet och privat' },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderRadius: 12, background: CARD, border: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: 20 }}>{r.ikon}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{r.titel}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{r.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Slide 4 — Lösenordshanterare
const SlideLosning2 = () => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: `${O}20`, border: `1px solid ${O}40`, marginBottom: 32 }}>
        <Key size={14} color={O} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>Lösenordshanterare</span>
      </div>

      <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.2, fontFamily: "'Nunito', sans-serif", marginBottom: 12 }}>
        Låt en app komma<br /><span style={{ color: O }}>ihåg åt dig</span>
      </h2>
      <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 32, lineHeight: 1.65 }}>
        En lösenordshanterare genererar, lagrar och fyller i unika starka lösenord automatiskt. Du behöver bara komma ihåg ett enda huvudlösenord.
      </p>

      {/* Rekommenderade verktyg */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
        {[
          { namn: 'Bitwarden', typ: 'Gratis & öppen källkod', emoji: '🔐', rec: true },
          { namn: '1Password', typ: 'Populär på arbetsplatser', emoji: '🔑', rec: false },
          { namn: 'Dashlane', typ: 'Enklast att komma igång', emoji: '🛡️', rec: false },
        ].map((v, i) => (
          <div key={i} style={{ padding: '18px 20px', borderRadius: 16, background: CARD, border: `2px solid ${v.rec ? O + '60' : BORDER}`, position: 'relative' }}>
            {v.rec && (
              <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', padding: '2px 10px', borderRadius: 10, background: O, fontSize: 10, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap' as const }}>
                REKOMMENDERAS
              </div>
            )}
            <p style={{ fontSize: 28, marginBottom: 8 }}>{v.emoji}</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 4 }}>{v.namn}</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{v.typ}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: '#fff' }}>Tips:</strong> Kolla om din e-postadress har läckt på <span style={{ color: '#10b981', fontWeight: 700 }}>haveibeenpwned.com</span> — det tar 10 sekunder.
        </p>
      </div>
    </motion.div>
  </div>
);

// Slide 5 — 5 minuter-checklistan
const SlideChecklista = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);

  const items = [
    'Gå till haveibeenpwned.com och kolla din e-post',
    'Installera Bitwarden (gratis) eller annan lösenordshanterare',
    'Byt ut ditt e-postlösenord till ett starkt, unikt lösenord',
    'Byt lösenord på 3 viktiga tjänster (bank, arbete, sociala medier)',
    'Aktivera autofyll i lösenordshanteraren i din webbläsare',
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', marginBottom: 32 }}>
          <Zap size={14} color="#10b981" />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#10b981' }}>Så här gör du på 5 minuter</span>
        </div>

        <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.2, fontFamily: "'Nunito', sans-serif", marginBottom: 8 }}>
          Din checklista
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>Bocka av när du är klar — du kan göra det direkt nu</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
          {items.map((item, i) => {
            const done = checked.includes(i);
            return (
              <motion.button key={i} onClick={() => toggle(i)} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 14, background: done ? 'rgba(16,185,129,0.1)' : CARD, border: `2px solid ${done ? 'rgba(16,185,129,0.5)' : BORDER}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#10b981' : 'rgba(255,255,255,0.08)', border: `2px solid ${done ? '#10b981' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  {done && <CheckCircle size={16} color="#fff" />}
                </div>
                <p style={{ fontSize: 16, color: done ? '#10b981' : 'rgba(255,255,255,0.8)', fontWeight: done ? 700 : 400, textDecoration: done ? 'line-through' : 'none', lineHeight: 1.45 }}>
                  {item}
                </p>
              </motion.button>
            );
          })}
        </div>

        {checked.length === items.length && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 24, padding: '16px 20px', borderRadius: 14, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>🎉 Utmärkt! Du är nu säkrare än 90% av alla användare.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Slide 6 — Quiz
const SlideQuiz = () => {
  const [fragaIdx, setFragaIdx] = useState(0);
  const [valt, setValt] = useState<number | null>(null);
  const [visar, setVisar] = useState(false);
  const [ratt, setRatt] = useState(0);
  const [klart, setKlart] = useState(false);

  const q = quizFragor[fragaIdx];

  const handleSvar = (i: number) => {
    if (visar) return;
    setValt(i);
    setVisar(true);
    if (i === q.korrekt) setRatt(r => r + 1);
  };

  const handleNästa = () => {
    if (fragaIdx < quizFragor.length - 1) {
      setFragaIdx(f => f + 1);
      setValt(null);
      setVisar(false);
    } else {
      setKlart(true);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: `${O}20`, border: `1px solid ${O}40`, marginBottom: 32 }}>
          <Lock size={14} color={O} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>Quiz — Testa dina kunskaper</span>
        </div>

        {!klart ? (
          <>
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
              {quizFragor.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < fragaIdx ? O : i === fragaIdx ? O : 'rgba(255,255,255,0.1)', opacity: i < fragaIdx ? 1 : i === fragaIdx ? 1 : 0.4, transition: 'all 0.3s' }} />
              ))}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.35, fontFamily: "'Nunito', sans-serif", marginBottom: 28 }}>
              {q.fraga}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {q.alternativ.map((alt, i) => {
                const isValt = valt === i;
                const isKorrekt = i === q.korrekt;
                let bg = CARD;
                let border = BORDER;
                let textColor = 'rgba(255,255,255,0.8)';
                if (visar) {
                  if (isKorrekt) { bg = 'rgba(16,185,129,0.15)'; border = 'rgba(16,185,129,0.6)'; textColor = '#10b981'; }
                  else if (isValt) { bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.5)'; textColor = '#ef4444'; }
                } else if (isValt) {
                  bg = `${O}15`; border = `${O}60`; textColor = '#fff';
                }
                return (
                  <motion.button key={i} onClick={() => handleSvar(i)} whileHover={!visar ? { x: 4 } : {}} whileTap={!visar ? { scale: 0.98 } : {}}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 14, background: bg, border: `2px solid ${border}`, cursor: visar ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.18s' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: visar && isKorrekt ? '#10b981' : visar && isValt ? '#ef4444' : isValt ? O : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 900, color: '#fff' }}>
                      {visar && isKorrekt ? '✓' : visar && isValt ? '✗' : String.fromCharCode(65 + i)}
                    </div>
                    <p style={{ fontSize: 17, color: textColor, lineHeight: 1.45, fontWeight: isValt ? 700 : 400 }}>{alt}</p>
                  </motion.button>
                );
              })}
            </div>
            {visar && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: BORDER, marginBottom: 16 }}>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{q.feedback}</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                  style={{ width: '100%', padding: '16px', borderRadius: 14, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 17, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {fragaIdx < quizFragor.length - 1 ? <>Nästa fråga <ChevronRight size={18} /></> : <>Se resultat <ChevronRight size={18} /></>}
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 72, fontWeight: 900, color: O, fontFamily: "'Nunito', sans-serif" }}>{ratt}/{quizFragor.length}</p>
            <p style={{ fontSize: 22, color: '#fff', fontWeight: 700, marginTop: 8, marginBottom: 12 }}>
              {ratt === quizFragor.length ? 'Perfekt! 🎉' : ratt >= quizFragor.length / 2 ? 'Bra jobbat! 👍' : 'Öva lite mer 💪'}
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
              {ratt === quizFragor.length ? 'Du behärskar grunderna i lösenordssäkerhet.' : 'Gå tillbaka och läs igenom materialet igen.'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// ── Slide-konfiguration ───────────────────────────────────
const slides = [
  { id: 'skrack',      titel: '3 434 intrång',              komponent: SlideSkrack },
  { id: 'nulage',      titel: 'Hur ser det ut idag?',       komponent: SlideNulage },
  { id: 'losning1',    titel: 'Skapa starka lösenord',      komponent: SlideLosning1 },
  { id: 'losning2',    titel: 'Lösenordshanterare',         komponent: SlideLosning2 },
  { id: 'checklista',  titel: 'Gör det nu — 5 minuter',     komponent: SlideChecklista },
  { id: 'quiz',        titel: 'Testa dina kunskaper',       komponent: SlideQuiz },
];

export const courseData = {
  id: 'digital-sakerhet-losenord',
  title: 'Lösenord & lösenordshanterare',
  description: 'Lär dig skapa starka lösenord och använda en lösenordshanterare.',
  totalSlides: slides.length,
};

// ── MAIN ──────────────────────────────────────────────────
export default function ModuleDigitalSakerhetLosenord() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const CurrentSlide = slides[currentIndex].komponent;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: DARK, fontFamily: "'Nunito', sans-serif", overflow: 'hidden' }}>

      {/* Header */}
      <header style={{ flexShrink: 0, background: '#131929', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/modules')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <ChevronLeft size={16} /> Digital säkerhet för alla
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Modul 1: Lösenord</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{currentIndex + 1} / {slides.length}</span>
          <button onClick={() => navigate('/modules')} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color="rgba(255,255,255,0.4)" />
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <motion.div animate={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ height: '100%', background: `linear-gradient(to right, ${O}, ${OD})` }} />
      </div>

      {/* Slide tabs */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 0, background: '#131929', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', overflowX: 'auto' }}>
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setCurrentIndex(i)}
            style={{ padding: '10px 16px', background: 'none', border: 'none', borderBottom: `2px solid ${i === currentIndex ? O : 'transparent'}`, cursor: 'pointer', fontSize: 12, fontWeight: i === currentIndex ? 700 : 500, color: i === currentIndex ? O : 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' as const, transition: 'all 0.2s', flexShrink: 0 }}>
            {i + 1}. {s.titel}
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ height: '100%', overflowY: 'auto' }}>
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: '#131929', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={isFirst}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: isFirst ? 'transparent' : 'rgba(255,255,255,0.07)', border: `1px solid ${isFirst ? 'transparent' : 'rgba(255,255,255,0.1)'}`, color: isFirst ? 'transparent' : 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, cursor: isFirst ? 'default' : 'pointer' }}>
          <ChevronLeft size={16} /> Föregående
        </motion.button>

        <div style={{ display: 'flex', gap: 6 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)}
              style={{ width: i === currentIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === currentIndex ? O : i < currentIndex ? O + '60' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
          ))}
        </div>

        {isLast ? (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/modules/digital-sakerhet-2fa')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${O}40` }}>
            Nästa modul: 2FA <ChevronRight size={16} />
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(i => Math.min(slides.length - 1, i + 1))}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 10, background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${O}40` }}>
            Nästa <ChevronRight size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
}