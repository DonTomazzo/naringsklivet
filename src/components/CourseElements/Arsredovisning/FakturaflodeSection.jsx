// src/components/CourseElements/Arsredovisning/FakturaflodeSection.jsx
// (renamed from FakturaflödesSection – undvik ö i filnamn)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Eye, CheckCircle, BookOpen, BarChart2,
  ArrowRight, X, ChevronRight, RotateCcw, Zap
} from 'lucide-react';

const STEG = [
  {
    id: 'ankomst', icon: Mail, color: '#0EA5E9',
    rubrik: 'Fakturan anländer', kort: 'Fakturan kommer in',
    beskrivning: 'En faktura från Vattenfall på 5 000 kr exkl. moms (6 250 kr inkl. moms) landar i föreningens brevlåda eller mejl. Fakturan är föreningens bevis på att en kostnad uppstått.',
    historia: '📜 Dubbel bokföring uppfanns i Italien på 1400-talet av munken Luca Pacioli. Principen är enkel: varje ekonomisk händelse påverkar alltid minst två konton – en debet och en kredit.',
    brf: 'BRF Räkmackan tar emot en el-faktura från Vattenfall: 5 000 kr + 1 250 kr moms = 6 250 kr totalt.',
  },
  {
    id: 'attest', icon: Eye, color: '#8B5CF6',
    rubrik: 'Attest', kort: 'Fakturan godkänns',
    beskrivning: 'Innan en faktura betalas måste den attesteras – godkännas av en behörig person i styrelsen. Attestering bekräftar att varan/tjänsten levererats och att priset stämmer.',
    historia: '✍️ Attestering är ett kontrollsteg för att förhindra bedrägeri och felaktiga betalningar. Styrelsen bör ha en tydlig attestordning som bestämmer vem som får godkänna vilka belopp.',
    brf: 'Kassören i BRF Räkmackan kontrollerar fakturan: stämmer perioden? Är priset rätt? Sedan signerar hon fakturan digitalt.',
  },
  {
    id: 'kontering', icon: BookOpen, color: '#FF5421',
    rubrik: 'Kontering', kort: 'Fakturan konteras',
    beskrivning: 'Kontering innebär att man bestämmer vilka konton som ska påverkas. Varje transaktion bokförs alltid på minst två konton – ett i debet och ett i kredit. Summan ska alltid bli noll.',
    historia: '⚖️ Principen "debet = kredit" kallas för dubbel bokföring. Det är ett självkontrollerande system – stämmer inte summan, har ett fel gjorts.',
    brf: 'El-fakturan konteras: Debet 5220 (Elkostnad) 5 000 kr, Debet 2641 (Ingående moms) 1 250 kr, Kredit 2440 (Leverantörsskulder) 6 250 kr.',
  },
  {
    id: 'huvudbok', icon: BarChart2, color: '#10B981',
    rubrik: 'Huvudboken', kort: 'Bokförs i systemet',
    beskrivning: 'Transaktionen registreras i föreningens bokföringssystem. Här samlas alla verifikationer och man kan följa varje konto och se alla transaktioner som påverkat det.',
    historia: '📚 Varje konto i BAS-kontoplanen har ett nummer – kostnadskonton börjar på 5 eller 6, tillgångskonton på 1.',
    brf: 'Transaktionen sparas som verifikation V-2024-0342. Saldot på konto 2440 (Leverantörsskulder) ökar med 6 250 kr.',
  },
  {
    id: 'betalning', icon: CheckCircle, color: '#F59E0B',
    rubrik: 'Betalning & avslut', kort: 'Fakturan betalas',
    beskrivning: 'När förfallodagen kommer betalas fakturan från föreningens bankkonto. Betalningen nollställer leverantörsskulden och minskar kassan.',
    historia: '🏦 Betalning bokförs: Debet 2440 (Leverantörsskulder) 6 250 kr, Kredit 1930 (Bankkonto) 6 250 kr. Skulden är nu nollad.',
    brf: 'BRF Räkmackan betalar 6 250 kr. Leverantörsskulden till Vattenfall stängs och elkostnaden 5 000 kr hamnar i årets resultat.',
  },
];

const KONTON = [
  { nummer: '1930', namn: 'Bankkonto' },
  { nummer: '2440', namn: 'Leverantörsskulder' },
  { nummer: '2641', namn: 'Ingående moms' },
  { nummer: '5220', namn: 'Elkostnad' },
  { nummer: '5410', namn: 'Förbrukningsinventarier' },
  { nummer: '1510', namn: 'Kundfordringar' },
];

const RATT_SVAR = [
  { konto: '5220', sida: 'debet',  belopp: 5000,  label: 'Elkostnad' },
  { konto: '2641', sida: 'debet',  belopp: 1250,  label: 'Ingående moms' },
  { konto: '2440', sida: 'kredit', belopp: 6250,  label: 'Leverantörsskulder' },
];

// ── Fakturaflöde ──────────────────────────────

const FlodeSektion = ({ onAllDone }) => {
  const [activeSteg, setActiveSteg] = useState(0);
  const [visitedSteg, setVisitedSteg] = useState(new Set([0]));

  const handleSteg = (index) => {
    setActiveSteg(index);
    const nv = new Set([...visitedSteg, index]);
    setVisitedSteg(nv);
    if (nv.size >= STEG.length) onAllDone?.();
  };

  const steg = STEG[activeSteg];
  const Icon = steg.icon;

  return (
    <div className="space-y-6">
      {/* Stegindikatorer */}
      <div className="flex items-start justify-center gap-3 sm:gap-6 flex-wrap">
        {STEG.map((s, i) => {
          const SI = s.icon;
          const isActive = activeSteg === i;
          const isDone = visitedSteg.has(i) && !isActive;
          return (
            <motion.button key={s.id} onClick={() => handleSteg(i)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2">
              <motion.div
                animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
                style={{
                  background: isActive ? s.color : isDone ? `${s.color}28` : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${isActive || isDone ? s.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isActive ? `0 0 18px ${s.color}55` : 'none',
                }}>
                {isDone
                  ? <CheckCircle size={18} style={{ color: s.color }} />
                  : <SI size={18} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.3)' }} />
                }
              </motion.div>
              <p className="text-xs font-bold text-center leading-tight"
                style={{ color: isActive ? s.color : isDone ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)', maxWidth: 64 }}>
                {s.kort}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Aktivt steg */}
      <AnimatePresence mode="wait">
        <motion.div key={steg.id}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: `${steg.color}0c`, borderColor: `${steg.color}30` }}>
          <div className="p-5 border-b flex items-center gap-3" style={{ borderColor: `${steg.color}20` }}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${steg.color}25`, border: `1.5px solid ${steg.color}50` }}>
              <Icon size={20} style={{ color: steg.color }} />
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider">Steg {activeSteg + 1} av {STEG.length}</p>
              <h3 className="text-lg font-bold text-white">{steg.rubrik}</h3>
            </div>
          </div>
          <div className="p-5 grid sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <p className="text-white/70 text-sm leading-relaxed">{steg.beskrivning}</p>
              <div className="rounded-xl p-3 border border-white/8 bg-white/3">
                <p className="text-white/25 text-xs font-bold uppercase tracking-wider mb-1">Historik</p>
                <p className="text-white/50 text-xs leading-relaxed">{steg.historia}</p>
              </div>
            </div>
            <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,84,33,0.06)', borderColor: 'rgba(255,84,33,0.2)' }}>
              <p className="text-[#FF5421] text-xs font-bold uppercase tracking-wider mb-2">📋 BRF Räkmackan</p>
              <p className="text-white/65 text-sm leading-relaxed">{steg.brf}</p>
            </div>
          </div>
          {activeSteg < STEG.length - 1 && (
            <div className="px-5 pb-5">
              <button onClick={() => handleSteg(activeSteg + 1)}
                className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl"
                style={{ background: steg.color, color: '#fff' }}>
                Nästa steg <ArrowRight size={15} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ── Konteringsövning ──────────────────────────

const KonteringsOvning = ({ onComplete }) => {
  const [rader, setRader] = useState([
    { id: 1, konto: '', sida: '', belopp: '' },
    { id: 2, konto: '', sida: '', belopp: '' },
    { id: 3, konto: '', sida: '', belopp: '' },
  ]);
  const [resultat, setResultat] = useState(null);
  const [felRader, setFelRader] = useState([]);
  const [visaLedtrad, setVisaLedtrad] = useState(false);

  const sumDebet  = rader.reduce((s, r) => r.sida === 'debet'  ? s + Number(r.belopp || 0) : s, 0);
  const sumKredit = rader.reduce((s, r) => r.sida === 'kredit' ? s + Number(r.belopp || 0) : s, 0);
  const balanserar = sumDebet === sumKredit && sumDebet > 0;

  const uppdateraRad = (id, falt, varde) => {
    setRader(prev => prev.map(r => r.id === id ? { ...r, [falt]: varde } : r));
    setResultat(null);
  };

  const kontrollera = () => {
    const fel = rader.reduce((acc, rad, i) => {
      const r = RATT_SVAR[i];
      if (!(rad.konto === r.konto && rad.sida === r.sida && Number(rad.belopp) === r.belopp)) acc.push(i);
      return acc;
    }, []);
    setFelRader(fel);
    if (fel.length === 0) { setResultat('ratt'); onComplete?.(); }
    else setResultat('fel');
  };

  const nollstall = () => {
    setRader([{ id: 1, konto: '', sida: '', belopp: '' }, { id: 2, konto: '', sida: '', belopp: '' }, { id: 3, konto: '', sida: '', belopp: '' }]);
    setResultat(null); setFelRader([]);
  };

  return (
    <div className="space-y-5">
      {/* Fakturan */}
      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="p-4 border-b border-white/8 flex items-center gap-3">
          <Mail size={16} className="text-[#FF5421]" />
          <p className="font-bold text-white text-sm">Inkommen faktura – kontera denna!</p>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm">
            {[['Från', 'Vattenfall AB'], ['Beskrivning', 'Elförbrukning januari 2024'], ['Förfall', '2024-02-15']].map(([l, v]) => (
              <div key={l} className="flex gap-3"><span className="text-white/30 w-20 flex-shrink-0">{l}</span><span className="text-white/65">{v}</span></div>
            ))}
          </div>
          <div className="rounded-xl p-4 border border-white/8 bg-white/3 space-y-2">
            {[['Belopp ex. moms', '5 000 kr'], ['Moms (25%)', '1 250 kr']].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm"><span className="text-white/40">{l}</span><span className="text-white/60">{v}</span></div>
            ))}
            <div className="flex justify-between font-bold border-t border-white/10 pt-2">
              <span className="text-white">Totalt</span>
              <span className="text-[#FF5421] text-lg">6 250 kr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ledtråd */}
      <button onClick={() => setVisaLedtrad(!visaLedtrad)}
        className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
        <Zap size={14} />{visaLedtrad ? 'Dölj kontolistan' : 'Visa kontolistan'}
      </button>

      <AnimatePresence>
        {visaLedtrad && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              {KONTON.map(k => (
                <div key={k.nummer} className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-[#FF5421]">{k.nummer}</span>
                  <span className="text-white/50">{k.namn}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabell */}
      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-white/8">
          {[['Konto', 2], ['Kontonamn', 4], ['Debet / Kredit', 3], ['Belopp', 3]].map(([h, span]) => (
            <p key={h} className={`col-span-${span} text-white/25 text-xs font-bold uppercase tracking-wider`}>{h}</p>
          ))}
        </div>
        {rader.map((rad, i) => {
          const valtKonto = KONTON.find(k => k.nummer === rad.konto);
          const harFel = felRader.includes(i);
          return (
            <div key={rad.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/5 items-center"
              style={{ background: harFel ? 'rgba(251,113,133,0.06)' : resultat === 'ratt' ? 'rgba(16,185,129,0.05)' : 'transparent' }}>
              <div className="col-span-2">
                <select value={rad.konto} onChange={e => uppdateraRad(rad.id, 'konto', e.target.value)}
                  className="w-full bg-white/6 border border-white/10 rounded-lg px-2 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FF5421]">
                  <option value="">–</option>
                  {KONTON.map(k => <option key={k.nummer} value={k.nummer}>{k.nummer}</option>)}
                </select>
              </div>
              <div className="col-span-4"><p className="text-white/40 text-xs px-1 truncate">{valtKonto?.namn || '–'}</p></div>
              <div className="col-span-3 flex gap-1">
                {['debet', 'kredit'].map(sida => (
                  <button key={sida} onClick={() => uppdateraRad(rad.id, 'sida', sida)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
                    style={rad.sida === sida
                      ? { background: sida === 'debet' ? '#0EA5E9' : '#10B981', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>
                    {sida}
                  </button>
                ))}
              </div>
              <div className="col-span-3">
                <input type="number" value={rad.belopp} onChange={e => uppdateraRad(rad.id, 'belopp', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white/6 border border-white/10 rounded-lg px-2 py-2 text-xs text-white text-right font-mono focus:outline-none focus:border-[#FF5421]" />
              </div>
            </div>
          );
        })}
        {/* Summering */}
        <div className="grid grid-cols-2 gap-2 px-4 py-3 border-t border-white/10">
          <div className="text-right">
            <p className="text-white/25 text-xs">Debet</p>
            <p className="font-bold text-sm" style={{ color: sumDebet > 0 ? '#0EA5E9' : 'rgba(255,255,255,0.2)' }}>{sumDebet.toLocaleString('sv-SE')} kr</p>
          </div>
          <div className="text-right">
            <p className="text-white/25 text-xs">Kredit</p>
            <p className="font-bold text-sm" style={{ color: sumKredit > 0 ? '#10B981' : 'rgba(255,255,255,0.2)' }}>{sumKredit.toLocaleString('sv-SE')} kr</p>
          </div>
        </div>
        {(sumDebet > 0 || sumKredit > 0) && (
          <div className="px-4 pb-3">
            <div className="rounded-xl px-3 py-2 text-xs font-bold text-center"
              style={balanserar
                ? { background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }
                : { background: 'rgba(251,113,133,0.12)', color: '#FB7185', border: '1px solid rgba(251,113,133,0.3)' }}>
              {balanserar ? '✓ Debet = Kredit – konteringen balanserar!' : `⚠️ Differens: ${Math.abs(sumDebet - sumKredit).toLocaleString('sv-SE')} kr`}
            </div>
          </div>
        )}
      </div>

      {/* Knappar */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={kontrollera} disabled={rader.some(r => !r.konto || !r.sida || !r.belopp)}
          className="px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all"
          style={rader.every(r => r.konto && r.sida && r.belopp)
            ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
            : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }}>
          <CheckCircle size={15} /> Kontrollera
        </button>
        <button onClick={nollstall} className="px-4 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
          <RotateCcw size={13} /> Börja om
        </button>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {resultat === 'ratt' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl border p-5" style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.3)' }}>
            <div className="flex items-center gap-3 mb-3"><CheckCircle size={22} className="text-green-400" /><h4 className="font-bold text-green-300 text-lg">Perfekt! 🎉</h4></div>
            <div className="space-y-2">
              {RATT_SVAR.map(r => (
                <div key={r.konto} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="font-mono text-[#FF5421] w-10">{r.konto}</span>
                  <span className="flex-1">{r.label}</span>
                  <span className="font-bold px-2 py-0.5 rounded-lg text-xs"
                    style={{ background: r.sida === 'debet' ? 'rgba(14,165,233,0.2)' : 'rgba(16,185,129,0.2)', color: r.sida === 'debet' ? '#0EA5E9' : '#10B981' }}>
                    {r.sida}
                  </span>
                  <span className="font-mono">{r.belopp.toLocaleString('sv-SE')} kr</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {resultat === 'fel' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl border p-4" style={{ background: 'rgba(251,113,133,0.08)', borderColor: 'rgba(251,113,133,0.3)' }}>
            <div className="flex items-center gap-3 mb-2"><X size={20} className="text-red-400" /><h4 className="font-bold text-red-300">Inte riktigt – försök igen!</h4></div>
            <p className="text-white/50 text-sm">Tips: Elkostnaden (5 000 kr) och momsen (1 250 kr) är två separata debetposter. Skulden (6 250 kr) är kreditposten.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Huvud ─────────────────────────────────────

const FakturaflodeSection = ({ onComplete, isCompleted }) => {
  const [flodeDone, setFlodeDone] = useState(false);
  const [ovningDone, setOvningDone] = useState(false);
  const [tab, setTab] = useState('flode');

  useEffect(() => {
    if (flodeDone && ovningDone && !isCompleted) onComplete?.('ar-faktura');
  }, [flodeDone, ovningDone]);

  return (
    <section data-section="ar-faktura" className="min-h-screen relative py-12 sm:py-16"
      style={{ background: 'linear-gradient(160deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Bokföring</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Följ fakturan</h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">Från brevlåda till bokföring – och öva sedan att kontera den själv.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-2xl w-fit" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {[{ id: 'flode', label: '1. Fakturaflödet', done: flodeDone }, { id: 'ovning', label: '2. Kontera själv', done: ovningDone }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              style={tab === t.id ? { background: '#FF5421', color: '#fff' } : { color: 'rgba(255,255,255,0.4)' }}>
              {t.done && <CheckCircle size={13} className="text-green-400" />}
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'flode' && (
            <motion.div key="flode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FlodeSektion onAllDone={() => setFlodeDone(true)} />
              {flodeDone && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
                  <button onClick={() => setTab('ovning')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff' }}>
                    Nu kontera själv <ChevronRight size={15} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
          {tab === 'ovning' && (
            <motion.div key="ovning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <KonteringsOvning onComplete={() => setOvningDone(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isCompleted && flodeDone && ovningDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-center">
            <button onClick={() => onComplete?.('ar-faktura')}
              className="px-8 py-4 rounded-2xl font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }}>
              ✓ Slutför lektion (+125 poäng)
            </button>
          </motion.div>
        )}
        {isCompleted && (
          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8 px-6 py-4 flex items-center gap-3">
              <CheckCircle size={18} className="text-[#FF5421]" />
              <span className="font-semibold text-white text-sm">Avsnitt slutfört! +125 poäng</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FakturaflodeSection;