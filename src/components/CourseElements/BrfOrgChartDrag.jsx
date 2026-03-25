// src/components/CourseElements/BrfOrgChartDrag.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const CARDS = [
  { id: 'medlemmar',       label: 'Medlemmar',        emoji: '🏠', color: '#FEF9C3', border: '#FDE047', hint: 'De som äger lägenheterna' },
  { id: 'foreningsstamma', label: 'Föreningsstämma',  emoji: '🗳️', color: '#DBEAFE', border: '#60A5FA', hint: 'Det stora årliga mötet' },
  { id: 'valberedning',    label: 'Valberedning',     emoji: '📋', color: '#FCE7F3', border: '#F472B6', hint: 'Föreslår vem som ska väljas' },
  { id: 'styrelse',        label: 'Styrelse',         emoji: '🛡️', color: '#EDE9FE', border: '#A78BFA', hint: 'Sköter föreningen varje dag' },
  { id: 'revisor',         label: 'Revisor',          emoji: '🔍', color: '#D1FAE5', border: '#34D399', hint: 'Kontrollerar styrelsen' },
  { id: 'forvaltare',      label: 'Förvaltare',       emoji: '🔧', color: '#FFE4E6', border: '#FB7185', hint: 'Sköter fastigheten praktiskt' },
];

const SCHEMA = [
  { row: 0, slots: [{ slotId: 's0', correctId: 'medlemmar',       clue: 'Vem äger föreningen?',        wide: true,  rotation:  0.4 }] },
  { row: 1, slots: [{ slotId: 's1', correctId: 'foreningsstamma', clue: 'Väljer styrelsen varje år',   rotation:  1.2 },
                    { slotId: 's2', correctId: 'valberedning',    clue: 'Föreslår kandidater',         rotation: -1.5 }] },
  { row: 2, slots: [{ slotId: 's3', correctId: 'styrelse',        clue: 'Leder föreningens arbete',   rotation:  0.7 },
                    { slotId: 's4', correctId: 'revisor',         clue: 'Granskar oberoende',         rotation: -0.8 }] },
  { row: 3, slots: [{ slotId: 's5', correctId: 'forvaltare',      clue: 'Utför det praktiska arbetet', wide: true, rotation:  1.0 }] },
];

const ALL_SLOTS = SCHEMA.flatMap(r => r.slots);
const BANK_ROTATIONS = [-2, 1.5, -1, 2.2, -1.8, 0.8];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getCard = (id) => CARDS.find(c => c.id === id);

// ─────────────────────────────────────────────
// NÅL
// ─────────────────────────────────────────────

const Tack = ({ color = '#c0392b', size = 15 }) => (
  <div style={{ position: 'absolute', top: -(size / 2 + 2), left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), ${color})`,
      boxShadow: `0 2px 5px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.4)`,
      border: '1px solid rgba(0,0,0,0.18)',
    }} />
    <div style={{ width: 3, height: 5, background: 'rgba(0,0,0,0.22)', margin: '0 auto', borderRadius: '0 0 2px 2px' }} />
  </div>
);

// ─────────────────────────────────────────────
// DRAGGABLE LAPP (bank)
// ─────────────────────────────────────────────

const BankCard = ({ card, rotation, isPlaced, onDragStart, onDragEnd, isDragging }) => (
  <div
    draggable={!isPlaced}
    onDragStart={(e) => onDragStart(e, card.id, 'bank')}
    onDragEnd={onDragEnd}
    style={{
      position: 'relative',
      opacity: isPlaced ? 0.2 : isDragging ? 0.4 : 1,
      cursor: isPlaced ? 'default' : 'grab',
      transform: `rotate(${rotation}deg)`,
      transition: 'opacity 0.2s, transform 0.2s',
      pointerEvents: isPlaced ? 'none' : 'auto',
    }}
  >
    <Tack color="#c0392b" size={15} />
    <div style={{
      background: card.color,
      border: `2px solid ${card.border}`,
      borderRadius: 4,
      padding: '14px 14px 12px',
      minWidth: 105,
      boxShadow: '3px 5px 14px rgba(0,0,0,0.25), 1px 1px 0 rgba(255,255,255,0.6) inset',
      textAlign: 'center',
      userSelect: 'none',
    }}>
      <div style={{ fontSize: 26, marginBottom: 4 }}>{card.emoji}</div>
      <p style={{ fontWeight: 800, fontSize: 14, color: '#1e293b', lineHeight: 1.2, marginBottom: 3 }}>{card.label}</p>
      <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>{card.hint}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// SCHEMA SLOT
// ─────────────────────────────────────────────

const SchemaSlot = ({ slot, placedCard, isOver, onDrop, onDragOver, onDragLeave, onDragStart, onDragEnd, checked }) => {
  const isCorrect = checked && placedCard?.id === slot.correctId;
  const isWrong   = checked && placedCard && placedCard.id !== slot.correctId;

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{
        flex: slot.wide ? '1 1 100%' : '1 1 0%',
        minWidth: 0,
        minHeight: 100,
        position: 'relative',
      }}
    >
      {placedCard ? (
        // Nålat kort
        <div
          draggable={!checked}
          onDragStart={(e) => !checked && onDragStart(e, placedCard.id, slot.slotId)}
          onDragEnd={onDragEnd}
          style={{
            position: 'relative',
            transform: `rotate(${slot.rotation}deg)`,
            cursor: checked ? 'default' : 'grab',
          }}
        >
          <Tack color={isCorrect ? '#10B981' : isWrong ? '#EF4444' : '#c0392b'} size={17} />
          <motion.div
            initial={{ scale: 0.6, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              background: placedCard.color,
              border: `3px solid ${isCorrect ? '#10B981' : isWrong ? '#EF4444' : placedCard.border}`,
              borderRadius: 4,
              padding: '14px 12px 12px',
              boxShadow: isCorrect
                ? '3px 5px 16px rgba(16,185,129,0.35), 1px 1px 0 rgba(255,255,255,0.6) inset'
                : isWrong
                  ? '3px 5px 16px rgba(239,68,68,0.35), 1px 1px 0 rgba(255,255,255,0.6) inset'
                  : '3px 5px 14px rgba(0,0,0,0.22), 1px 1px 0 rgba(255,255,255,0.6) inset',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{placedCard.emoji}</div>
            <p style={{ fontWeight: 800, fontSize: 14, color: '#1e293b', lineHeight: 1.2, marginBottom: 3 }}>{placedCard.label}</p>
            <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>{placedCard.hint}</p>
            {checked && (
              <p style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: isCorrect ? '#059669' : '#DC2626' }}>
                {isCorrect ? '✓ Rätt!' : '✗ Fel'}
              </p>
            )}
          </motion.div>
        </div>
      ) : (
        // Tom slot
        <div style={{
          minHeight: 100,
          border: `3px dashed ${isOver ? '#FF5421' : 'rgba(255,255,255,0.28)'}`,
          borderRadius: 6,
          background: isOver ? 'rgba(255,84,33,0.12)' : 'rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 10,
          transition: 'all 0.15s',
          boxShadow: isOver ? '0 0 0 3px rgba(255,84,33,0.22), inset 0 0 20px rgba(255,84,33,0.06)' : 'inset 0 2px 4px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: 20, opacity: 0.4, marginBottom: 5 }}>📌</span>
          <p style={{ fontSize: 13, fontWeight: 700, color: isOver ? '#FF5421' : 'rgba(255,255,255,0.55)', lineHeight: 1.3, textAlign: 'center', marginBottom: 2 }}>
            {slot.clue}
          </p>
          <p style={{ fontSize: 11, color: isOver ? '#FF5421' : 'rgba(255,255,255,0.28)', textAlign: 'center' }}>
            {isOver ? 'Släpp här!' : 'Dra hit'}
          </p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// PIL
// ─────────────────────────────────────────────

const Arrow = ({ count = 1 }) => (
  <div style={{ display: 'flex', justifyContent: count === 1 ? 'center' : 'space-around', padding: count > 1 ? '0 40px' : '0', margin: '6px 0' }}>
    {[...Array(count)].map((_, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 1, height: 18, background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.38))' }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid rgba(255,255,255,0.32)' }} />
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// KORKBRÄDA wrapper
// ─────────────────────────────────────────────

const CorkBoard = ({ title, children }) => (
  <div style={{
    borderRadius: 10,
    padding: '18px 16px 16px',
    background: 'linear-gradient(145deg, #c9954c 0%, #b8813a 40%, #c49248 70%, #a87030 100%)',
    boxShadow: '0 10px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.22)',
    border: '7px solid #7a4f28',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Kork-textur */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `
        repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 6px),
        repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 6px)
      `,
    }} />
    {title && (
      <p style={{
        textAlign: 'center', fontWeight: 800, fontSize: 11,
        color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: 14,
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
        position: 'relative',
      }}>
        {title}
      </p>
    )}
    <div style={{ position: 'relative' }}>{children}</div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

const BrfOrgChartDrag = ({ onComplete }) => {
  const [cards]   = useState(() => shuffle(CARDS));
  const [placed,  setPlaced]  = useState({});   // slotId → cardId
  const [overSlot, setOverSlot] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score,   setScore]   = useState(null);
  const [dragging, setDragging] = useState(null); // cardId being dragged

  const placedCardIds = new Set(Object.values(placed));
  const allPlaced = ALL_SLOTS.every(s => placed[s.slotId]);

  // source: 'bank' | slotId
  const handleDragStart = (e, cardId, source) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('source', source);
    setDragging(cardId);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setOverSlot(null);
  };

  const handleDragOver = (e, slotId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverSlot(slotId);
  };

  const handleDragLeave = () => setOverSlot(null);

  const handleDrop = (e, targetSlotId) => {
    e.preventDefault();
    setOverSlot(null);
    setDragging(null);

    const cardId = e.dataTransfer.getData('cardId');
    const source = e.dataTransfer.getData('source');
    if (!cardId) return;

    setPlaced(prev => {
      const next = { ...prev };
      const existingInTarget = next[targetSlotId]; // kort som redan sitter i target

      // Ta bort kortet från source-slot (om det kom från ett slot)
      if (source !== 'bank') delete next[source];

      // Placera kortet i target
      next[targetSlotId] = cardId;

      // Om target hade ett kort och source var ett slot → byt plats (swap)
      if (existingInTarget && existingInTarget !== cardId && source !== 'bank') {
        next[source] = existingInTarget;
      }
      // Om target hade ett kort och source var banken → returnera det till banken (tas bort ur placed)
      // (det sker automatiskt eftersom vi inte lägger tillbaka det)

      return next;
    });

    setChecked(false);
    setScore(null);
  };

  // Droppzon för banken – för att kunna dra tillbaka kort från schemat
  const handleDropToBank = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const source = e.dataTransfer.getData('source');
    if (!cardId || source === 'bank') return;
    setPlaced(prev => {
      const next = { ...prev };
      delete next[source];
      return next;
    });
    setChecked(false);
    setScore(null);
    setDragging(null);
  };

  const handleCheck = () => {
    const correct = ALL_SLOTS.filter(s => placed[s.slotId] === s.correctId).length;
    setScore({ correct, total: ALL_SLOTS.length, passed: correct === ALL_SLOTS.length });
    setChecked(true);
    if (correct === ALL_SLOTS.length) onComplete?.('org-chart');
  };

  const handleReset = () => {
    setPlaced({}); setChecked(false); setScore(null); setDragging(null);
  };

  return (
    <section
      data-section="org-chart"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d1420 0%, #171f32 55%, #1c2640 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 30%, rgba(255,84,33,0.05) 0%, transparent 45%), radial-gradient(circle at 90% 70%, rgba(99,102,241,0.04) 0%, transparent 45%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
            Interaktiv övning
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hur är föreningen organiserad?
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Dra lapparna till rätt plats i schemat. Du kan också byta plats mellan lappar.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* VÄNSTER – kortbank */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="w-full lg:w-64 flex-shrink-0">
            <CorkBoard title="📌 Dra härifrån">
              <div
                onDrop={handleDropToBank}
                onDragOver={(e) => e.preventDefault()}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', padding: '4px 0 8px', minHeight: 80 }}
              >
                {cards.map((card, i) => (
                  <BankCard
                    key={card.id}
                    card={card}
                    rotation={BANK_ROTATIONS[i % BANK_ROTATIONS.length]}
                    isPlaced={placedCardIds.has(card.id)}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={dragging === card.id}
                  />
                ))}
              </div>
            </CorkBoard>

            <div className="mt-4 rounded-2xl border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/45 text-sm leading-relaxed">
                Dra en lapp till rätt plats i schemat. Du kan byta lappar genom att dra en lapp till en redan fylld plats.
              </p>
              <p className="text-white/25 text-xs mt-2">
                Dra tillbaka hit för att ångra.
              </p>
            </div>
          </motion.div>

          {/* HÖGER – schema */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex-1 min-w-0">
            <CorkBoard title="Organisationsschema – nåla fast lapparna">
              {SCHEMA.map((row, rowIdx) => (
                <React.Fragment key={row.row}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {row.slots.map(slot => (
                      <SchemaSlot
                        key={slot.slotId}
                        slot={slot}
                        placedCard={placed[slot.slotId] ? getCard(placed[slot.slotId]) : null}
                        isOver={overSlot === slot.slotId}
                        onDrop={(e) => handleDrop(e, slot.slotId)}
                        onDragOver={(e) => handleDragOver(e, slot.slotId)}
                        onDragLeave={handleDragLeave}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        checked={checked}
                      />
                    ))}
                  </div>
                  {rowIdx < SCHEMA.length - 1 && (
                    <Arrow count={SCHEMA[rowIdx + 1].slots.length} />
                  )}
                </React.Fragment>
              ))}
            </CorkBoard>

            {/* Feedback */}
            <AnimatePresence>
              {score && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 rounded-2xl border p-5 flex items-center gap-4"
                  style={{
                    borderColor: score.passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
                    background:  score.passed ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
                  }}>
                  {score.passed
                    ? <Trophy  size={28} className="text-yellow-400 flex-shrink-0" />
                    : <XCircle size={28} className="text-red-400 flex-shrink-0" />}
                  <div>
                    <p className="font-bold text-white text-base">
                      {score.passed ? '🎉 Perfekt! Allt rätt!' : `${score.correct} av ${score.total} rätt`}
                    </p>
                    <p className="text-white/50 text-sm mt-0.5">
                      {score.passed
                        ? 'Du förstår hur föreningen är uppbyggd! +150 poäng'
                        : 'De röda lapparna sitter fel – flytta dem och försök igen!'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Knappar */}
            <div className="flex gap-3 mt-4">
              <button onClick={handleCheck}
                disabled={!allPlaced || (checked && score?.passed)}
                className="flex-1 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all"
                style={allPlaced && !(checked && score?.passed)
                  ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }}>
                {checked && score?.passed ? <><CheckCircle size={18} /> Klart!</> : 'Kontrollera svaret'}
              </button>
              <button onClick={handleReset}
                className="px-5 py-4 rounded-2xl font-bold text-sm flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <RotateCcw size={15} /> Börja om
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BrfOrgChartDrag;