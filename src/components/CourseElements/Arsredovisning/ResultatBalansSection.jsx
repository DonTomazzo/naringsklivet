// src/components/CourseElements/Arsredovisning/ResultatBalansSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ─── BRF Solbacken fiktiva siffror ───

const RESULTAT = [
  {
    id: 'avgifter', label: 'Årsavgifter', value: 4820000, prev: 4650000, type: 'intakt',
    forklaring: 'Årsavgifterna är föreningens största intäkt. De betalas av alla medlemmar månadsvis och sätts av styrelsen för att täcka föreningens kostnader.',
    exempel: 'BRF Solbacken har 48 lägenheter som betalar i snitt 8 375 kr/mån = 4 820 000 kr/år.',
    signal: 'ok',
  },
  {
    id: 'hyror', label: 'Hyresintäkter', value: 312000, prev: 290000, type: 'intakt',
    forklaring: 'Hyresintäkter från lokaler, parkeringsplatser eller antenn-/reklamtavlor som föreningen hyr ut till externa.',
    exempel: 'Solbacken hyr ut 3 parkeringsplatser à 800 kr/mån och en butikslokal för 18 000 kr/mån.',
    signal: 'ok',
  },
  {
    id: 'drift', label: 'Driftkostnader', value: -2140000, prev: -2050000, type: 'kostnad',
    forklaring: 'Driftkostnader inkluderar el, vatten, sophämtning, försäkringar, städning och fastighetsavgift.',
    exempel: 'Solbackens driftkostnader ökade med 90 000 kr jämfört med föregående år, främst pga höjda elpriser.',
    signal: 'varning',
  },
  {
    id: 'underhall', label: 'Underhållskostnader', value: -680000, prev: -320000, type: 'kostnad',
    forklaring: 'Kostnader för reparationer och planerat underhåll som genomförs under året. Kan variera kraftigt mellan år.',
    exempel: 'Under 2024 bytte Solbacken fönster i trapphuset – en engångskostnad på 360 000 kr.',
    signal: 'info',
  },
  {
    id: 'personal', label: 'Personalkostnader', value: -485000, prev: -460000, type: 'kostnad',
    forklaring: 'Kostnader för fastighetsskötare, styrelsearvoden och eventuell förvaltningspersonal.',
    exempel: 'Solbacken har en extern förvaltare på 20 000 kr/mån och en fastighetsskötare på 12 500 kr/mån.',
    signal: 'ok',
  },
  {
    id: 'ranta', label: 'Räntekostnader', value: -892000, prev: -710000, type: 'finansiell',
    forklaring: 'Räntan på föreningens banklån. Med stigande räntor har denna post ökat kraftigt de senaste åren.',
    exempel: 'Solbacken har 12 Mkr i lån. Vid 6,5% ränta = 780 000 kr/år + amorteringar.',
    signal: 'varning',
  },
  {
    id: 'avskrivning', label: 'Avskrivningar', value: -620000, prev: -620000, type: 'kostnad',
    forklaring: 'En bokföringsmässig kostnad som speglar att fastigheten minskar i bokfört värde över tid. Påverkar inte likviditeten.',
    exempel: 'Fastigheten skrivs av med 1% per år. Bokfört värde 62 Mkr × 1% = 620 000 kr.',
    signal: 'ok',
  },
];

const RESULTAT_SUMMA = RESULTAT.reduce((s, r) => s + r.value, 0);

const BALANS_TILLGANGAR = [
  {
    id: 'fastighet', label: 'Fastigheten', value: 62400000, type: 'tillgang',
    forklaring: 'Fastighetens bokförda värde – inköpspriset minus ackumulerade avskrivningar. Notera att marknadsvärdet ofta är mycket högre.',
    exempel: 'Solbacken köptes för 48 Mkr 1995. Med avskrivningar är bokfört värde nu 62,4 Mkr (pga ombyggnation).',
    signal: 'ok',
  },
  {
    id: 'likvida', label: 'Likvida medel', value: 1840000, type: 'tillgang',
    forklaring: 'Pengar på föreningens bankkonton. En viktig buffert för oväntade kostnader.',
    exempel: 'BRF Solbacken har ca 38 000 kr per lägenhet i kassan – en god buffert.',
    signal: 'ok',
  },
  {
    id: 'fordran', label: 'Övriga fordringar', value: 215000, type: 'tillgang',
    forklaring: 'Utestående betalningar som föreningen väntar på, t.ex. avgifter som ännu inte betalts.',
    exempel: 'Tre lägenheter har försenade avgiftsbetalningar på sammanlagt 215 000 kr.',
    signal: 'varning',
  },
];

const BALANS_SKULDER = [
  {
    id: 'lan', label: 'Lån, kreditinstitut', value: 12200000, type: 'skuld',
    forklaring: 'Föreningens banklån med fastigheten som säkerhet. Avgör räntekostnaderna och är avgörande för föreningens ekonomiska hälsa.',
    exempel: 'Solbackens skuld är 254 000 kr/lägenhet. Branschsnitt är ca 200 000–350 000 kr/lgh.',
    signal: 'varning',
  },
  {
    id: 'fond', label: 'Fond yttre underhåll', value: -2840000, type: 'eget_kapital',
    forklaring: 'Avsättningar för framtida planerat underhåll. En stor fond är ett gott tecken – föreningen sparar för kommande renoveringar.',
    exempel: 'Solbacken sätter av 59 000 kr/år till underhållsfonden. Nuvarande fond räcker för planerat takbyte om 4 år.',
    signal: 'ok',
  },
  {
    id: 'eget_kapital', label: 'Eget kapital', value: -49415000, type: 'eget_kapital',
    forklaring: 'Skillnaden mellan tillgångar och skulder. I en BRF är eget kapital ofta negativt – det är normalt och beror på hur insatserna bokförs.',
    exempel: 'Negativt eget kapital i en BRF är vanligt och inte farligt i sig – det viktiga är att löpande kostnader täcks av avgifterna.',
    signal: 'info',
  },
  {
    id: 'leverantor', label: 'Leverantörsskulder', value: 320000, type: 'skuld',
    forklaring: 'Fakturor som kommit in men ännu inte betalts vid bokslutstillfället.',
    exempel: 'Solbacken har obetald faktura för fönsterbytet (320 000 kr) som betalas i januari.',
    signal: 'ok',
  },
];

const signalColor = { ok: '#10B981', varning: '#F59E0B', info: '#0EA5E9' };
const signalLabel = { ok: 'Normalt', varning: 'Notera', info: 'Info' };

function fmt(v) {
  const abs = Math.abs(v);
  if (abs >= 1000000) return `${(v / 1000000).toFixed(2).replace('.', ',')} Mkr`;
  return `${v.toLocaleString('sv-SE')} kr`;
}

const RowModal = ({ row, onClose }) => (
  <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose} />
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 24 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50"
      style={{ maxHeight: '85vh' }}
    >
      <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10"
        style={{ background: 'rgba(13,19,35,0.98)', maxHeight: '85vh' }}>
        <div className="p-5 flex items-center justify-between border-b border-white/8"
          style={{ background: 'linear-gradient(135deg, #FF542118, #FF542106)' }}>
          <div>
            <p className="text-white/35 text-xs uppercase tracking-wider mb-0.5">
              {row.type === 'intakt' ? 'Intäkt' : row.type === 'kostnad' ? 'Kostnad' : row.type === 'finansiell' ? 'Finansiell post' : row.type === 'tillgang' ? 'Tillgång' : row.type === 'skuld' ? 'Skuld' : 'Eget kapital'}
            </p>
            <h3 className="text-lg font-bold text-white">{row.label}</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center">
            <X size={18} className="text-white/60" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 space-y-4">
          {/* Värde */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl p-4 border border-white/8 bg-white/4 text-center">
              <p className="text-white/35 text-xs mb-1">2024</p>
              <p className="font-bold text-white text-xl">{fmt(row.value)}</p>
            </div>
            {row.prev !== undefined && (
              <div className="flex-1 rounded-xl p-4 border border-white/8 bg-white/4 text-center">
                <p className="text-white/35 text-xs mb-1">2023</p>
                <p className="font-bold text-white/50 text-xl">{fmt(row.prev)}</p>
              </div>
            )}
          </div>
          {/* Signal */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: signalColor[row.signal] }} />
            <span className="text-xs font-bold" style={{ color: signalColor[row.signal] }}>{signalLabel[row.signal]}</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{row.forklaring}</p>
          <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,84,33,0.06)', borderColor: 'rgba(255,84,33,0.2)' }}>
            <p className="text-[#FF5421] text-xs font-bold uppercase tracking-wider mb-1">📊 BRF Solbacken</p>
            <p className="text-white/65 text-sm leading-relaxed">{row.exempel}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </>
);

const TableRow = ({ row, onClick, visited }) => {
  const isPos = row.value > 0;
  const isNeg = row.value < 0;
  const diff = row.prev !== undefined ? row.value - row.prev : null;

  return (
    <motion.tr
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      onClick={() => onClick(row)}
      className="cursor-pointer border-b border-white/5 transition-colors"
      style={{ background: visited ? 'rgba(255,84,33,0.04)' : 'transparent' }}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: signalColor[row.signal] }} />
          <span className="text-white/75 text-sm font-medium">{row.label}</span>
          {visited && <span className="text-[#FF5421] text-xs">●</span>}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <span className="font-bold text-sm" style={{ color: isPos ? '#10B981' : isNeg ? '#FB7185' : 'rgba(255,255,255,0.7)' }}>
          {fmt(row.value)}
        </span>
      </td>
      {row.prev !== undefined && (
        <td className="py-3 px-4 text-right hidden sm:table-cell">
          <span className="text-white/35 text-sm">{fmt(row.prev)}</span>
        </td>
      )}
      {diff !== null && (
        <td className="py-3 px-4 text-right hidden md:table-cell">
          <span className="text-xs font-bold flex items-center justify-end gap-1"
            style={{ color: diff > 0 ? (row.type === 'kostnad' ? '#FB7185' : '#10B981') : (row.type === 'kostnad' ? '#10B981' : '#FB7185') }}>
            {diff > 0 ? <TrendingUp size={12} /> : diff < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
            {fmt(Math.abs(diff))}
          </span>
        </td>
      )}
    </motion.tr>
  );
};

const ResultatBalansSection = ({ onComplete, isCompleted }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [tab, setTab] = useState('resultat');

  const handleClick = (row) => {
    setActiveRow(row);
    setVisited(prev => new Set([...prev, row.id]));
  };

  const allRows = [...RESULTAT, ...BALANS_TILLGANGAR, ...BALANS_SKULDER];
  const allVisited = visited.size >= Math.min(6, allRows.length);

  return (
    <section data-section="ar-siffror" className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(160deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Räkenskaperna
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">BRF Solbacken – räkenskaperna</h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Klicka på valfri rad för att förstå vad posten betyder och hur den ser ut i BRF Solbacken.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex' }}>
          {[
            { id: 'resultat', label: 'Resultaträkning' },
            { id: 'balans', label: 'Balansräkning' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={tab === t.id
                ? { background: '#FF5421', color: '#fff' }
                : { color: 'rgba(255,255,255,0.4)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tabell */}
        <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
          {tab === 'resultat' && (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="py-3 px-4 text-left text-xs font-bold text-white/30 uppercase tracking-wider">Post</th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-white/30 uppercase tracking-wider">2024</th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-white/30 uppercase tracking-wider hidden sm:table-cell">2023</th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-white/30 uppercase tracking-wider hidden md:table-cell">Förändring</th>
                </tr>
              </thead>
              <tbody>
                {/* Intäkter */}
                <tr><td colSpan={4} className="py-2 px-4 text-xs font-bold text-white/25 uppercase tracking-wider bg-white/2">Intäkter</td></tr>
                {RESULTAT.filter(r => r.type === 'intakt').map(r => (
                  <TableRow key={r.id} row={r} onClick={handleClick} visited={visited.has(r.id)} />
                ))}
                {/* Kostnader */}
                <tr><td colSpan={4} className="py-2 px-4 text-xs font-bold text-white/25 uppercase tracking-wider bg-white/2">Rörelsekostnader</td></tr>
                {RESULTAT.filter(r => r.type === 'kostnad').map(r => (
                  <TableRow key={r.id} row={r} onClick={handleClick} visited={visited.has(r.id)} />
                ))}
                {/* Finansiella */}
                <tr><td colSpan={4} className="py-2 px-4 text-xs font-bold text-white/25 uppercase tracking-wider bg-white/2">Finansiella poster</td></tr>
                {RESULTAT.filter(r => r.type === 'finansiell').map(r => (
                  <TableRow key={r.id} row={r} onClick={handleClick} visited={visited.has(r.id)} />
                ))}
                {/* Summa */}
                <tr style={{ borderTop: '2px solid rgba(255,255,255,0.12)' }}>
                  <td className="py-4 px-4 font-bold text-white">Årets resultat</td>
                  <td className="py-4 px-4 text-right font-bold text-xl"
                    style={{ color: RESULTAT_SUMMA >= 0 ? '#10B981' : '#FB7185' }}>
                    {fmt(RESULTAT_SUMMA)}
                  </td>
                  <td colSpan={2} className="hidden sm:table-cell" />
                </tr>
              </tbody>
            </table>
          )}

          {tab === 'balans' && (
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="py-3 px-4 text-left text-xs font-bold text-white/30 uppercase tracking-wider">Post</th>
                  <th className="py-3 px-4 text-right text-xs font-bold text-white/30 uppercase tracking-wider">Värde</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={2} className="py-2 px-4 text-xs font-bold text-white/25 uppercase tracking-wider bg-white/2">Tillgångar</td></tr>
                {BALANS_TILLGANGAR.map(r => (
                  <TableRow key={r.id} row={r} onClick={handleClick} visited={visited.has(r.id)} />
                ))}
                <tr><td colSpan={2} className="py-2 px-4 text-xs font-bold text-white/25 uppercase tracking-wider bg-white/2">Skulder & Eget kapital</td></tr>
                {BALANS_SKULDER.map(r => (
                  <TableRow key={r.id} row={r} onClick={handleClick} visited={visited.has(r.id)} />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-white/20 text-xs text-center mt-3">Klicka på en rad för förklaring • BRF Solbacken är en fiktiv förening</p>

        {/* Slutför */}
        <div className="flex justify-center mt-8">
          {!isCompleted && (
            <button
              onClick={() => allVisited && onComplete?.('ar-siffror')}
              disabled={!allVisited}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              style={allVisited
                ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
              }>
              {allVisited ? '✓ Fortsätt (+100 poäng)' : `Klicka på minst 6 rader för att fortsätta`}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeRow && <RowModal row={activeRow} onClose={() => setActiveRow(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ResultatBalansSection;