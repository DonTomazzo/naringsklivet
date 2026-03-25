// src/components/CourseElements/KeyCabinetSection.jsx

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RotateCcw } from 'lucide-react';

const SECTION_ID = 'nyckelskap';

const HOOKS = [
  { id: 'ordforande',  label: 'Ordföranden',  color: '#FF5421' },
  { id: 'sekreterare', label: 'Sekreteraren', color: '#0EA5E9' },
  { id: 'kassoren',    label: 'Kassören',     color: '#10B981' },
  { id: 'revisor',     label: 'Revisorn',     color: '#8B5CF6' },
  { id: 'suppleant',   label: 'Suppleanten',  color: '#F59E0B' },
];

const KEYCHAINS = [
  {
    id: 'kc-ord', hookId: 'ordforande', label: 'Ordföranden',
    color: '#FF5421', ringColor: '#e8c060', tagBg: '#FF5421',
    keys: [
      { angle: -22, len: 52, w: 8, side: 1, bits: [10, 7, 12, 8] },
      { angle:   2, len: 60, w: 7, side: -1, bits: [8, 13, 7] },
      { angle:  24, len: 46, w: 8, side: 1, bits: [11, 6, 9] },
    ],
    tasks: ['Leda styrelsemöten', 'Kalla till möten', 'Teckna firma'],
  },
  {
    id: 'kc-sek', hookId: 'sekreterare', label: 'Sekreteraren',
    color: '#0EA5E9', ringColor: '#b8d0f0', tagBg: '#0EA5E9',
    keys: [
      { angle: -18, len: 48, w: 7, side: -1, bits: [9, 14, 7] },
      { angle:   4, len: 58, w: 8, side: 1,  bits: [12, 7, 10] },
      { angle:  20, len: 44, w: 7, side: -1, bits: [7, 11, 13] },
    ],
    tasks: ['Skriva protokoll', 'Lägenhetsförteckning', 'Hantera post'],
  },
  {
    id: 'kc-kas', hookId: 'kassoren', label: 'Kassören',
    color: '#10B981', ringColor: '#a0d8b8', tagBg: '#10B981',
    keys: [
      { angle: -20, len: 54, w: 8, side: 1,  bits: [11, 8, 13] },
      { angle:   0, len: 46, w: 7, side: -1, bits: [7, 12, 9] },
      { angle:  22, len: 62, w: 8, side: 1,  bits: [13, 7, 10] },
    ],
    tasks: ['Sköta bokföringen', 'Upprätta budget', 'Betala räkningar'],
  },
  {
    id: 'kc-rev', hookId: 'revisor', label: 'Revisorn',
    color: '#8B5CF6', ringColor: '#c8b8f0', tagBg: '#8B5CF6',
    keys: [
      { angle: -16, len: 50, w: 7, side: -1, bits: [9, 13, 8] },
      { angle:   6, len: 56, w: 8, side: 1,  bits: [12, 7, 11] },
      { angle:  24, len: 44, w: 7, side: -1, bits: [8, 14, 7] },
    ],
    tasks: ['Granska räkenskaperna', 'Revisionsberättelse', 'Rapportera till stämman'],
  },
  {
    id: 'kc-sup', hookId: 'suppleant', label: 'Suppleanten',
    color: '#F59E0B', ringColor: '#f8e070', tagBg: '#F59E0B',
    keys: [
      { angle: -14, len: 48, w: 7, side: 1,  bits: [8, 12, 9] },
      { angle:   8, len: 56, w: 8, side: -1, bits: [13, 7, 11] },
      { angle:  26, len: 42, w: 7, side: 1,  bits: [9, 13, 7] },
    ],
    tasks: ['Träda in vid frånvaro', 'Delta på möten', 'Stödja ledamöter'],
  },
];

// ── SVG för en enskild nyckel ──
const SingleKey = ({ angle, len, w, side, bits, colorStop }) => {
  const rad = (angle * Math.PI) / 180;
  const cx = 45; // pivot = ringcentrum
  const cy = 18;

  // Nyckelns axel: startar vid ringcentrum, pekar neråt roterat med angle
  const ex = cx + Math.sin(rad) * len;
  const ey = cy + Math.cos(rad) * len;

  // Huvud-ellips, placerat nära ringen
  const hx = cx + Math.sin(rad) * 6;
  const hy = cy + Math.cos(rad) * 6;
  const headRx = w * 1.4;
  const headRy = w * 1.6;

  // Kuggar längs skaftet
  const bitCount = bits.length;
  const bitSpacing = (len - 14) / (bitCount + 1);

  return (
    <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
      {/* Skaft */}
      <rect x={cx - w / 2} y={cy + 8} width={w} height={len - 8}
        rx={w * 0.4} fill="url(#keyMetal)" />
      {/* Huvud */}
      <ellipse cx={cx} cy={cy + 4} rx={headRx} ry={headRy} fill="url(#keyMetal)" />
      {/* Hål i huvud */}
      <circle cx={cx} cy={cy + 4} r={headRx * 0.4} fill="rgba(0,0,0,0.6)" />
      {/* Glans huvud */}
      <ellipse cx={cx - headRx * 0.3} cy={cy + 1} rx={headRx * 0.28} ry={headRy * 0.22}
        fill="rgba(255,255,255,0.45)" transform={`rotate(-15,${cx},${cy})`} />
      {/* Glans skaft */}
      <rect x={cx - w * 0.15} y={cy + 12} width={w * 0.18} height={len - 20}
        rx={w * 0.09} fill="rgba(255,255,255,0.22)" />
      {/* Kuggar */}
      {bits.map((bh, bi) => {
        const by = cy + 14 + bitSpacing * (bi + 1);
        const bw = (bh / 14) * 7;
        const bx = side > 0 ? cx + w / 2 : cx - w / 2 - bw;
        return (
          <rect key={bi} x={bx} y={by - 2.5} width={bw} height={5} rx={1.5}
            fill="url(#keyMetal)" style={{ filter: 'brightness(0.85)' }} />
        );
      })}
    </g>
  );
};

// ── SVG Nyckelknippe ──
const KeychainSVG = ({ chain, scale = 1, hanging = false }) => {
  const W = 90;
  const H = 140;
  const cx = 45;
  const ringY = hanging ? 14 : 18;
  const ringR = 14;

  return (
    <svg
      width={W * scale} height={H * scale}
      viewBox={`0 0 ${W} ${H}`}
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 ${hanging ? 8 : 4}px ${hanging ? 18 : 10}px ${hanging ? chain.color + '55' : 'rgba(0,0,0,0.55)'})`,
      }}
    >
      <defs>
        <radialGradient id={`ring-${chain.id}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor="#fffbe0" />
          <stop offset="45%" stopColor={chain.ringColor} />
          <stop offset="100%" stopColor="#7a6820" />
        </radialGradient>
        <linearGradient id="keyMetal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ddd8cc" />
          <stop offset="25%" stopColor="#c0b898" />
          <stop offset="55%" stopColor="#b0a888" />
          <stop offset="80%" stopColor="#989070" />
          <stop offset="100%" stopColor="#888060" />
        </linearGradient>
        <linearGradient id={`tag-${chain.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={chain.tagBg} />
          <stop offset="100%" stopColor={chain.tagBg} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Kopplings-tråd uppåt om hängande */}
      {hanging && (
        <line x1={cx} y1={0} x2={cx} y2={ringY - ringR}
          stroke={chain.ringColor} strokeWidth={2.5} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 2px ${chain.ringColor})` }} />
      )}

      {/* Nyckelring */}
      <circle cx={cx} cy={ringY} r={ringR}
        fill="none" stroke={`url(#ring-${chain.id})`} strokeWidth={4.5} />
      {/* Ring-glans */}
      <path d={`M ${cx - ringR * 0.65} ${ringY - ringR * 0.65} A ${ringR} ${ringR} 0 0 1 ${cx + ringR * 0.65} ${ringY - ringR * 0.65}`}
        fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinecap="round" />

      {/* Label-tag */}
      <rect x={cx - 17} y={ringY - 12} width={34} height={24} rx={5}
        fill={`url(#tag-${chain.id})`} />
      <rect x={cx - 16} y={ringY - 11} width={32} height={22} rx={4}
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
      <text x={cx} y={ringY + 3.5} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={7} fontWeight="800" fontFamily="system-ui, sans-serif"
        style={{ userSelect: 'none', letterSpacing: '0.05em' }}>
        {chain.label.split(' ')[0].slice(0, 5).toUpperCase()}
      </text>

      {/* Nycklar */}
      {chain.keys.map((key, ki) => (
        <SingleKey key={ki} {...key} colorStop={chain.color} />
      ))}
    </svg>
  );
};

// ── Metallkrok SVG ──
const HookSVG = ({ color, occupied }) => (
  <svg width={32} height={52} viewBox="0 0 32 52" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={`hm-${color.replace('#','')}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#909090" />
        <stop offset="40%" stopColor="#e0e0e0" />
        <stop offset="65%" stopColor="#c0c0c0" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
    </defs>
    {/* Skruv */}
    <circle cx="16" cy="7" r="7" fill="#6a6458" />
    <circle cx="16" cy="7" r="5" fill="#8a8270" />
    <circle cx="16" cy="7" r="2" fill="#4a4440" />
    <line x1="13" y1="7" x2="19" y2="7" stroke="#3a3430" strokeWidth="1.2" />
    <line x1="16" y1="4" x2="16" y2="10" stroke="#3a3430" strokeWidth="1.2" />
    {/* Arm nedåt */}
    <line x1="16" y1="13" x2="16" y2="32"
      stroke={`url(#hm-${color.replace('#','')})`} strokeWidth={5.5} strokeLinecap="round" />
    {/* Krökning */}
    <path d="M16 32 Q16 44 8 46 Q3 47 3 42"
      fill="none" stroke={`url(#hm-${color.replace('#','')})`}
      strokeWidth={5.5} strokeLinecap="round" />
    {/* Glans på arm */}
    <line x1="14.5" y1="14" x2="14.5" y2="31"
      stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeLinecap="round" />
    {/* Skugga om belagd */}
    {occupied && (
      <ellipse cx="8" cy="50" rx="7" ry="2" fill="rgba(0,0,0,0.35)" />
    )}
  </svg>
);

// ── Nyckelskåpet ──
const CabinetPanel = ({ placedMap, hookRefs, isCorrect, onRemove }) => (
  <div className="relative rounded-3xl overflow-visible"
    style={{
      background: 'linear-gradient(160deg, #6b4220 0%, #3d2010 40%, #502a12 70%, #381808 100%)',
      boxShadow: '0 28px 70px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,220,140,0.12), inset 0 -3px 0 rgba(0,0,0,0.5)',
      border: '3px solid #281008',
      padding: '24px 20px 40px',
    }}>

    {/* Träådror */}
    {[...Array(10)].map((_, i) => (
      <div key={i} className="absolute pointer-events-none left-0 right-0"
        style={{ top: `${5 + i * 9}%`, height: '1px', background: `rgba(0,0,0,${0.07 + (i % 3) * 0.015})`, transform: `skewY(${i % 2 === 0 ? 0.25 : -0.2}deg)` }} />
    ))}
    <div className="absolute inset-3 rounded-2xl pointer-events-none"
      style={{ border: '1px solid rgba(255,220,140,0.07)' }} />

    {/* Skylt */}
    <div className="text-center mb-10 relative">
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg"
        style={{ background: 'linear-gradient(135deg, #1e0c04, #281408)', border: '1px solid rgba(255,200,80,0.18)', boxShadow: 'inset 0 1px 0 rgba(255,200,80,0.08)' }}>
        <span style={{ fontSize: '16px' }}>🗝️</span>
        <span className="font-bold tracking-[0.18em] uppercase text-xs" style={{ color: '#c89840', fontFamily: 'Georgia, serif' }}>
          Ansvarsfördelning
        </span>
      </div>
    </div>

    {/* Krokar + knippen */}
    <div className="flex justify-around items-start">
      {HOOKS.map((hook) => {
        const chain = placedMap[hook.id];
        const correct = chain && isCorrect(chain.id, hook.id);
        return (
          <div key={hook.id} className="flex flex-col items-center gap-2" style={{ minWidth: '72px' }}>

            {/* Krok-area (drag target) */}
            <div ref={el => hookRefs.current[hook.id] = el}
              data-hook={hook.id}
              className="flex flex-col items-center relative"
              style={{ minHeight: '180px' }}>

              <HookSVG color={hook.color} occupied={!!chain} />

              {/* Hängande knippe */}
              <AnimatePresence>
                {chain && (
                  <motion.div
                    key={chain.id}
                    initial={{ opacity: 0, y: -30, rotate: -20 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: -20 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 180 }}
                    style={{ marginTop: '-6px', transformOrigin: 'top center', cursor: 'pointer' }}
                    title="Klicka för att ta ner"
                    onClick={() => onRemove(hook.id)}
                  >
                    {/* Vaggar efter att ha hängt */}
                    <motion.div
                      animate={{ rotate: [-4, 4, -2, 2, 0] }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      style={{ transformOrigin: 'top center' }}
                    >
                      <KeychainSVG chain={chain} scale={0.82} hanging />
                    </motion.div>

                    {/* Rätt/fel badge */}
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                      className="absolute -top-0 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                      style={{
                        background: correct ? '#10B981' : '#EF4444',
                        boxShadow: `0 0 10px ${correct ? '#10B98170' : '#EF444470'}`,
                        color: '#fff',
                        fontSize: '11px',
                      }}>
                      {correct ? '✓' : '✗'}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!chain && (
                <div className="w-10 h-1 rounded-full mt-1"
                  style={{ background: 'rgba(0,0,0,0.4)', filter: 'blur(2px)' }} />
              )}
            </div>

            {/* Namnskylt under krok */}
            <div className="px-2 py-1 rounded-lg text-center"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${correct ? hook.color + '55' : 'rgba(255,200,80,0.1)'}`,
                transition: 'all 0.4s',
              }}>
              <p style={{ color: correct ? hook.color : 'rgba(255,200,80,0.45)', fontSize: '9px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                {hook.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Draggable nyckelknippe ──
const DraggableKeychain = ({ chain, onDrop, hookRefs }) => (
  <motion.div
    drag
    dragMomentum={false}
    dragSnapToOrigin
    dragElastic={0.1}
    onDragEnd={(_, info) => {
      let closest = null;
      let closestDist = 110;
      Object.entries(hookRefs.current).forEach(([hookId, el]) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const hcx = rect.left + rect.width / 2;
        const hcy = rect.top + rect.height / 2;
        const dist = Math.sqrt((info.point.x - hcx) ** 2 + (info.point.y - hcy) ** 2);
        if (dist < closestDist) { closestDist = dist; closest = hookId; }
      });
      if (closest) onDrop(chain.id, closest);
    }}
    whileDrag={{ scale: 1.15, zIndex: 100, filter: `drop-shadow(0 16px 28px ${chain.color}90)` }}
    whileHover={{ scale: 1.06, y: -4 }}
    className="cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center"
    style={{ userSelect: 'none' }}
  >
    <KeychainSVG chain={chain} scale={1} />
    <div className="mt-1 text-center" style={{ maxWidth: '90px' }}>
      <p className="font-bold text-xs mb-1" style={{ color: chain.color }}>{chain.label}</p>
      {chain.tasks.map((t, i) => (
        <p key={i} className="text-white/35 leading-tight" style={{ fontSize: '8.5px' }}>{t}</p>
      ))}
    </div>
  </motion.div>
);

// ── Huvud ──
const KeyCabinetSection = ({ isCompleted, onComplete }) => {
  const [placedMap, setPlacedMap] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const hookRefs = useRef({});

  const isCorrect = (chainId, hookId) => KEYCHAINS.find(c => c.id === chainId)?.hookId === hookId;

  const handleDrop = (chainId, hookId) => {
    setPlacedMap(prev => {
      const next = {};
      // Kopiera allt utom om chainId redan hänger någonstans
      Object.entries(prev).forEach(([h, c]) => { if (c?.id !== chainId) next[h] = c; });
      next[hookId] = KEYCHAINS.find(c => c.id === chainId);

      const allCorrect = HOOKS.every(h => next[h.id] && isCorrect(next[h.id].id, h.id));
      if (allCorrect) setTimeout(() => setShowSuccess(true), 700);
      return next;
    });
  };

  const handleRemove = (hookId) => {
    setPlacedMap(prev => { const n = { ...prev }; delete n[hookId]; return n; });
    setShowSuccess(false);
  };

  const handleReset = () => { setPlacedMap({}); setShowSuccess(false); };

  const placedIds = new Set(Object.values(placedMap).map(c => c?.id).filter(Boolean));
  const unplaced = KEYCHAINS.filter(c => !placedIds.has(c.id));
  const correctCount = Object.entries(placedMap).filter(([h, c]) => c && isCorrect(c.id, h)).length;
  const allDone = correctCount === HOOKS.length;

  return (
    <section data-section={SECTION_ID} className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 55%, rgba(255,84,33,0.06) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(139,92,246,0.04) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Ansvarsfördelning
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Häng nyckelknipporna rätt
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Dra varje nyckelknippe till rätt krok i skåpet. Klicka på ett hängande knippe för att ta ner det igen.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">

          {/* Skåpet */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <CabinetPanel
              placedMap={placedMap}
              hookRefs={hookRefs}
              isCorrect={isCorrect}
              onRemove={handleRemove}
            />
          </motion.div>

          {/* Nedre rad */}
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Knippor */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 min-h-48">
              <h3 className="font-bold text-white text-sm mb-6">
                🗝️ Nyckelknippor att placera
                {unplaced.length === 0 && <span className="text-emerald-400 ml-2 font-normal text-xs">✓ Alla placerade</span>}
              </h3>
              {unplaced.length > 0 ? (
                <div className="flex flex-wrap gap-8 justify-center items-end">
                  {unplaced.map(chain => (
                    <DraggableKeychain key={chain.id} chain={chain} onDrop={handleDrop} hookRefs={hookRefs} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-white/40 text-sm">Alla knippen är på plats!</p>
                </div>
              )}
            </motion.div>

            {/* Status */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:w-60 space-y-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-white text-sm">Framsteg</h3>
                  <span className="text-[#FF5421] font-bold text-sm">{correctCount}/{HOOKS.length}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div className="h-full rounded-full bg-[#FF5421]"
                    animate={{ width: `${(correctCount / HOOKS.length) * 100}%` }}
                    transition={{ duration: 0.4 }} />
                </div>
                <div className="space-y-2">
                  {HOOKS.map(hook => {
                    const chain = placedMap[hook.id];
                    const correct = chain && isCorrect(chain.id, hook.id);
                    const wrong = chain && !correct;
                    return (
                      <div key={hook.id} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: correct ? hook.color : wrong ? '#EF4444' : 'rgba(255,255,255,0.12)' }} />
                        <span className="text-xs flex-1"
                          style={{ color: correct ? hook.color : wrong ? '#EF4444' : 'rgba(255,255,255,0.3)' }}>
                          {hook.label}
                        </span>
                        {wrong && <span className="text-red-400 text-xs">✗ Fel krok</span>}
                        {correct && <span className="text-xs" style={{ color: hook.color }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button onClick={handleReset}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <RotateCcw size={14} /> Börja om
              </button>

              {!isCompleted ? (
                <button onClick={() => allDone && onComplete?.(SECTION_ID)} disabled={!allDone}
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={allDone
                    ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
                  }>
                  {allDone ? '✓ Slutför lektion (+100 poäng)' : 'Häng alla knippen rätt'}
                </button>
              ) : (
                <div className="rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8 p-4 flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#FF5421] flex-shrink-0" />
                  <span className="font-semibold text-white text-sm">Avsnitt slutfört! +100 poäng</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && !isCompleted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(10px)' }}
            onClick={() => setShowSuccess(false)}>
            <motion.div
              initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8 }}
              className="rounded-3xl border border-[#FF5421]/25 p-10 text-center max-w-sm mx-4"
              style={{ background: 'rgba(13,19,35,0.98)' }}
              onClick={e => e.stopPropagation()}>
              <motion.div
                animate={{ rotate: [-10, 10, -5, 5, 0], y: [0, -10, 0] }}
                transition={{ duration: 1.1 }}
                className="text-6xl mb-5">🗝️</motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Alla nycklar på plats!</h3>
              <p className="text-white/50 text-sm mb-6">
                Du kan ansvarsfördelningen i en BRF-styrelse. Varje roll har sina nycklar!
              </p>
              <button
                onClick={() => { setShowSuccess(false); onComplete?.(SECTION_ID); }}
                className="w-full py-4 rounded-2xl font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }}>
                ✓ Slutför lektion (+100 poäng)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KeyCabinetSection;