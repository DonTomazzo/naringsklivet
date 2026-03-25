// src/components/CourseElements/Arsredovisning/NyckeltalSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

// ─── DATA: Alla ~15 obligatoriska + viktiga nyckeltal ───

const NYCKELTAL = [
  {
    id: 'arsavgift_kvm',
    label: 'Årsavgift kr/kvm',
    value: 923,
    unit: 'kr/kvm',
    low: 600, ok: 900, high: 1400,
    solbacken: 923,
    bransch: '750–1 100',
    signal: 'ok',
    kategori: 'Avgifter',
    forklaring: 'Visar hur hög avgiften är i förhållande till bostadsrättens storlek. Det viktigaste nyckeltalet för att jämföra föreningar med varandra.',
    tolkning: 'Under 750 kr/kvm kan vara ett tecken på underfinansiering. Över 1 400 kr/kvm kan tyda på hög skuldsättning eller höga kostnader.',
    obligatoriskt: true,
  },
  {
    id: 'skuldsattning_kvm',
    label: 'Skuldsättning kr/kvm',
    value: 5769,
    unit: 'kr/kvm',
    low: 2000, ok: 6000, high: 12000,
    solbacken: 5769,
    bransch: '3 000–8 000',
    signal: 'ok',
    kategori: 'Skulder',
    forklaring: 'Föreningens totala lån i förhållande till boyta. Avgörande för att bedöma föreningens risk – ju lägre desto bättre.',
    tolkning: 'Under 3 000 kr/kvm = mycket låg skuld. 3 000–8 000 = normalt. Över 10 000 kr/kvm = hög skuldsättning och risk.',
    obligatoriskt: true,
  },
  {
    id: 'skuldsattning_lgh',
    label: 'Skuldsättning kr/lgh',
    value: 254166,
    unit: 'kr/lgh',
    low: 100000, ok: 300000, high: 600000,
    solbacken: 254166,
    bransch: '150 000–400 000',
    signal: 'ok',
    kategori: 'Skulder',
    forklaring: 'Föreningens totala lån delat på antalet lägenheter. Enkelt att förstå – hur mycket skuld bär varje lägenhet?',
    tolkning: 'Under 200 000 kr/lgh = låg skuld. 200 000–400 000 = normalt. Över 500 000 kr/lgh = hög risk.',
    obligatoriskt: true,
  },
  {
    id: 'ranta_kvm',
    label: 'Räntekostnad kr/kvm',
    value: 136,
    unit: 'kr/kvm',
    low: 40, ok: 150, high: 350,
    solbacken: 136,
    bransch: '80–200',
    signal: 'ok',
    kategori: 'Avgifter',
    forklaring: 'Hur stor del av årsavgiften som går till att betala räntor. Ökar kraftigt vid stigande räntor.',
    tolkning: 'Räntekostnaden per kvm ökade kraftigt 2022–2024 pga Riksbankens räntehöjningar.',
    obligatoriskt: true,
  },
  {
    id: 'energi_kvm',
    label: 'Energikostnad kr/kvm',
    value: 243,
    unit: 'kr/kvm',
    low: 100, ok: 250, high: 450,
    solbacken: 243,
    bransch: '180–350',
    signal: 'ok',
    kategori: 'Drift',
    forklaring: 'Total energikostnad (el + värme) per kvadratmeter. Viktigt för att bedöma om föreningen är energieffektiv.',
    tolkning: 'Hög energikostnad kan tyda på dålig isolering, gamla fönster eller ineffektiva system. Investering lönar sig.',
    obligatoriskt: true,
  },
  {
    id: 'sparande_kvm',
    label: 'Sparande kr/kvm',
    value: 125,
    unit: 'kr/kvm',
    low: 75, ok: 150, high: 300,
    solbacken: 125,
    bransch: '100–200',
    signal: 'varning',
    kategori: 'Underhåll',
    forklaring: 'Hur mycket föreningen sätter av per kvm till underhållsfonden varje år. Avgörande för framtida underhåll.',
    tolkning: 'Branschrekommendation är minst 150 kr/kvm/år. Solbackens 125 kr/kvm är i underkant – framtida avgiftshöjning kan bli nödvändig.',
    obligatoriskt: true,
  },
  {
    id: 'soliditet',
    label: 'Soliditet %',
    value: -35,
    unit: '%',
    low: -60, ok: -20, high: 20,
    solbacken: -35,
    bransch: '-50 till +5',
    signal: 'info',
    kategori: 'Kapital',
    forklaring: 'Eget kapital i procent av totala tillgångar. I en BRF är negativt eget kapital normalt och inget farlighetstecken i sig.',
    tolkning: 'Negativt eget kapital beror på hur insatser och lån bokförs i BRF-modellen. Fokusera istället på likviditet och skuldsättning.',
    obligatoriskt: true,
  },
  {
    id: 'roreseintakter',
    label: 'Rörelseintäkter tkr',
    value: 68315,
    unit: 'tkr',
    low: 0, ok: 50000, high: 200000,
    solbacken: 68315,
    bransch: 'Varierar',
    signal: 'ok',
    kategori: 'Intäkter',
    forklaring: 'Föreningens totala intäkter från avgifter, hyror och övriga intäkter. Visar föreningens totala omsättning.',
    tolkning: 'Ökande rörelseintäkter kan bero på avgiftshöjningar eller ökade hyresintäkter.',
    obligatoriskt: true,
  },
  {
    id: 'fond_yttre',
    label: 'Fond yttre underhåll tkr',
    value: 13502,
    unit: 'tkr',
    low: 5000, ok: 10000, high: 50000,
    solbacken: 13502,
    bransch: 'Varierar efter storlek',
    signal: 'ok',
    kategori: 'Underhåll',
    forklaring: 'Det belopp som sparats upp i underhållsfonden för framtida renoveringar av tak, fasad, stammar m.m.',
    tolkning: 'Jämför med föreningens underhållsplan – är fonden tillräcklig för planerade åtgärder de närmaste 10 åren?',
    obligatoriskt: true,
  },
  {
    id: 'likvida',
    label: 'Likvida medel tkr',
    value: 1840,
    unit: 'tkr',
    low: 500, ok: 2000, high: 10000,
    solbacken: 1840,
    bransch: '1 000–5 000',
    signal: 'varning',
    kategori: 'Likviditet',
    forklaring: 'Pengarna på föreningens konton. En god likviditet är buffert mot oväntade kostnader.',
    tolkning: 'Solbacken har ca 38 000 kr per lägenhet i kassan – lite i underkant. Rekommendation är minst 50 000 kr/lgh.',
    obligatoriskt: false,
  },
  {
    id: 'avgift_andel',
    label: 'Avgifternas andel av intäkter %',
    value: 86,
    unit: '%',
    low: 70, ok: 85, high: 100,
    solbacken: 86,
    bransch: '80–95',
    signal: 'ok',
    kategori: 'Intäkter',
    forklaring: 'Hur stor andel av föreningens totala intäkter som kommer från årsavgifter. Hög andel = beroende av avgifterna.',
    tolkning: '86% är normalt. Föreningar med stora hyresintäkter från lokaler kan ha lägre andel.',
    obligatoriskt: true,
  },
  {
    id: 'taxeringsvarde',
    label: 'Taxeringsvärde tkr',
    value: 598400,
    unit: 'tkr',
    low: 0, ok: 100000, high: 1000000,
    solbacken: 598400,
    bransch: 'Varierar kraftigt',
    signal: 'info',
    kategori: 'Fastigheten',
    forklaring: 'Skatteverkets värdering av fastigheten. Används som underlag för fastighetsskatt och som referenspunkt.',
    tolkning: 'Taxeringsvärdet är normalt 75% av marknadsvärdet vid taxeringstillfället. Det uppdateras inte varje år.',
    obligatoriskt: true,
  },
  {
    id: 'balansomslutning',
    label: 'Balansomslutning tkr',
    value: 266373,
    unit: 'tkr',
    low: 10000, ok: 100000, high: 1000000,
    solbacken: 266373,
    bransch: 'Varierar',
    signal: 'ok',
    kategori: 'Fastigheten',
    forklaring: 'Summan av alla tillgångar (= summan av alla skulder + eget kapital). Visar föreningens totala ekonomiska storlek.',
    tolkning: 'Balansomslutningen förändras när fastigheten skrivs av eller om lån tas upp/amorteras.',
    obligatoriskt: true,
  },
  {
    id: 'resultat',
    label: 'Resultat tkr',
    value: -7275,
    unit: 'tkr',
    low: -20000, ok: 0, high: 5000,
    solbacken: -7275,
    bransch: 'Nära noll',
    signal: 'varning',
    kategori: 'Resultat',
    forklaring: 'Årets ekonomiska resultat – skillnaden mellan intäkter och kostnader. I en BRF bör detta ligga nära noll.',
    tolkning: 'Solbackens minusresultat 2024 beror på fönsterbytet (engångskostnad). Kolla om det är återkommande eller engångspost.',
    obligatoriskt: true,
  },
  {
    id: 'skulder_kreditinstitut',
    label: 'Skulder kreditinstitut tkr',
    value: 317861,
    unit: 'tkr',
    low: 0, ok: 200000, high: 800000,
    solbacken: 317861,
    bransch: 'Varierar',
    signal: 'ok',
    kategori: 'Skulder',
    forklaring: 'Det totala lånebeloppet hos banker och kreditinstitut. Viktigaste skulden för de flesta BRF-er.',
    tolkning: 'Jämför med flerårsöversikten – ökar skulden år för år, eller amorteras den?',
    obligatoriskt: true,
  },
];

const signalCfg = {
  ok:      { color: '#10B981', label: 'Normalt',   bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)'  },
  varning: { color: '#F59E0B', label: 'Notera',    bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)'  },
  info:    { color: '#0EA5E9', label: 'Info',       bg: 'rgba(14,165,233,0.12)',  border: 'rgba(14,165,233,0.3)'  },
  dåligt:  { color: '#FB7185', label: 'Varning',   bg: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.3)' },
};

const KATEGORIER = ['Alla', ...Array.from(new Set(NYCKELTAL.map(n => n.kategori)))];

function fmtVal(v, unit) {
  if (unit === '%') return `${v}%`;
  if (unit === 'tkr') return `${v.toLocaleString('sv-SE')} tkr`;
  if (unit === 'kr/kvm') return `${v} kr/kvm`;
  if (unit === 'kr/lgh') return `${v.toLocaleString('sv-SE')} kr/lgh`;
  return `${v.toLocaleString('sv-SE')} ${unit}`;
}

// Gauge bar: position value on a low→high scale
function GaugeBar({ nyckeltal, animate }) {
  const { value, low, high, signal } = nyckeltal;
  const cfg = signalCfg[signal];
  const pct = Math.max(2, Math.min(98, ((value - low) / (high - low)) * 100));

  return (
    <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      {/* Zones */}
      <div className="absolute inset-0 flex">
        <div className="h-full rounded-l-full" style={{ width: '33%', background: 'rgba(14,165,233,0.15)' }} />
        <div className="h-full" style={{ width: '34%', background: 'rgba(16,185,129,0.15)' }} />
        <div className="h-full rounded-r-full" style={{ width: '33%', background: 'rgba(251,113,133,0.15)' }} />
      </div>
      {/* Value bar */}
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: animate ? `${pct}%` : 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}80` }}
      />
    </div>
  );
}

// ─── Modal ───
const NyckeltalModal = ({ n, onClose }) => {
  const cfg = signalCfg[n.signal];
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
        onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 h-full"
          style={{ background: 'rgba(13,19,35,0.98)' }}>
          {/* Header */}
          <div className="p-5 flex items-start justify-between border-b border-white/8 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF542118, #FF542106)' }}>
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                  {cfg.label}
                </span>
                {n.obligatoriskt && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FF5421]/15 text-[#FF5421] border border-[#FF5421]/30">
                    Obligatoriskt nyckeltal
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{n.label}</h3>
              <p className="text-white/40 text-sm">{n.kategori}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center flex-shrink-0">
              <X size={18} className="text-white/60" />
            </button>
          </div>
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Värde stor */}
            <div className="text-center py-4">
              <p className="text-5xl font-black" style={{ color: cfg.color }}>
                {fmtVal(n.value, n.unit)}
              </p>
              <p className="text-white/35 text-sm mt-1">BRF Solbacken 2024</p>
            </div>
            {/* Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/30">
                <span>Lågt</span><span>Normalt</span><span>Högt</span>
              </div>
              <GaugeBar nyckeltal={n} animate={true} />
              <p className="text-white/35 text-xs text-center">Branschintervall: {n.bransch} {n.unit}</p>
            </div>
            {/* Förklaring */}
            <div className="bg-white/4 border border-white/8 rounded-xl p-4">
              <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2">Vad är det?</p>
              <p className="text-white/70 text-sm leading-relaxed">{n.forklaring}</p>
            </div>
            {/* Tolkning */}
            <div className="rounded-xl p-4 border" style={{ background: cfg.bg, borderColor: cfg.border }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: cfg.color }}>💡 Hur tolkar man det?</p>
              <p className="text-white/65 text-sm leading-relaxed">{n.tolkning}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─── Card ───
const NyckeltalCard = ({ n, onClick, visited }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cfg = signalCfg[n.signal];

  return (
    <motion.button
      ref={ref}
      onClick={() => onClick(n)}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="text-left rounded-2xl border p-4 transition-all w-full"
      style={{
        background: visited ? `${cfg.color}10` : 'rgba(255,255,255,0.03)',
        borderColor: visited ? `${cfg.color}45` : 'rgba(255,255,255,0.07)',
        boxShadow: visited ? `0 4px 16px ${cfg.color}15` : 'none',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
            {cfg.label}
          </span>
          {n.obligatoriskt && (
            <span className="text-xs text-[#FF5421]/60 font-bold">★ Obligatoriskt</span>
          )}
        </div>
        {visited && <span className="text-green-400 text-xs flex-shrink-0">✓</span>}
      </div>
      <p className="text-white/55 text-xs font-semibold uppercase tracking-wider mb-1">{n.kategori}</p>
      <p className="text-white font-bold text-sm mb-3 leading-snug">{n.label}</p>
      <p className="font-black text-2xl mb-3" style={{ color: cfg.color }}>{fmtVal(n.value, n.unit)}</p>
      <GaugeBar nyckeltal={n} animate={inView} />
    </motion.button>
  );
};

// ─── Main ───
const NyckeltalSection = ({ onComplete, isCompleted }) => {
  const [activeN, setActiveN] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [kategori, setKategori] = useState('Alla');

  const handleClick = (n) => {
    setActiveN(n);
    setVisited(prev => new Set([...prev, n.id]));
  };

  const filtered = kategori === 'Alla' ? NYCKELTAL : NYCKELTAL.filter(n => n.kategori === kategori);
  const allVisited = visited.size >= 6;

  return (
    <section data-section="ar-nyckeltal" className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(160deg, #0d1420 0%, #171f32 60%, #1c2640 100%)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Nyckeltal
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Förstå nyckeltalen
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Alla obligatoriska nyckeltal förklarade med BRF Solbacken som exempel. Klicka på ett nyckeltal för djupare förklaring.
          </p>
        </motion.div>

        {/* Kategorifilter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {KATEGORIER.map(k => (
            <button key={k} onClick={() => setKategori(k)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={kategori === k
                ? { background: '#FF5421', color: '#fff' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }
              }>
              {k}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <AnimatePresence mode="wait">
            {filtered.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04 }}
              >
                <NyckeltalCard n={n} onClick={handleClick} visited={visited.has(n.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Framsteg */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-[#FF5421]"
                animate={{ width: `${(visited.size / NYCKELTAL.length) * 100}%` }}
                transition={{ duration: 0.4 }} />
            </div>
            <span className="text-white/40 text-sm">{visited.size}/{NYCKELTAL.length} utforskade</span>
          </div>
          {!isCompleted && (
            <button
              onClick={() => allVisited && onComplete?.('ar-nyckeltal')}
              disabled={!allVisited}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              style={allVisited
                ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
              }>
              {allVisited ? '✓ Fortsätt (+100 poäng)' : `Utforska minst 6 nyckeltal`}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {activeN && <NyckeltalModal n={activeN} onClose={() => setActiveN(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default NyckeltalSection;