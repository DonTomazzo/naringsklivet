// src/components/CourseElements/IntercomSection.jsx
// Porttelefon byggd helt i CSS – ingen bild behövs

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';

const SECTION_ID = 'intercom';

// ── Knappar på porttelefonen – t.ex. lägenheter / roller ──
const APARTMENTS = [
  { id: 1,  label: 'Lgh 101', name: 'Ordföranden',       sub: 'Styrelseledamot', color: '#FF5421',
    description: 'Ordföranden leder styrelsens arbete och representerar föreningen utåt. Det är ordföranden som kallar till möten, håller i diskussionerna och ser till att besluten fattas på rätt grund.',
    tips: ['Har utslagsröst vid lika röstetal', 'Skriver under avtal tillsammans med kassören', 'Ansvarar för att kallelser skickas i tid'] },
  { id: 2,  label: 'Lgh 102', name: 'Sekreteraren',      sub: 'Styrelseledamot', color: '#0EA5E9',
    description: 'Sekreteraren är föreningens dokumentansvarige. Protokoll, kallelser, post och arkiv – allt hanteras av sekreteraren. En nyckelroll för att styrelsearbetet ska fungera smidigt.',
    tips: ['Protokoll ska justeras och undertecknas', 'Ansvarar för lägenhetsförteckningen', 'GDPR gäller även för protokollshantering'] },
  { id: 3,  label: 'Lgh 103', name: 'Kassören',          sub: 'Styrelseledamot', color: '#10B981',
    description: 'Kassören ansvarar för föreningens ekonomi. Bokföring, budget, avgifter och årsredovisning – kassören är den som håller koll på kronorna och ser till att föreningen håller sig på rätt spår ekonomiskt.',
    tips: ['Firmatecknare tillsammans med ordföranden', 'Bokföring måste sparas i 7 år', 'Självkostnadsprincipen styr årsavgifterna'] },
  { id: 4,  label: 'Lgh 201', name: 'Vice ordförande',   sub: 'Styrelseledamot', color: '#8B5CF6',
    description: 'Vice ordföranden är ordförandens ställföreträdare och kliver in när ordföranden är frånvarande. Har ofta egna delegerade ansvarsområden och är ett viktigt stöd i styrelsearbetet.',
    tips: ['Träder in när ordföranden är jävig', 'Kan delegeras specifika projekt', 'Har samma juridiska ansvar som övriga'] },
  { id: 5,  label: 'Lgh 202', name: 'Ledamoten',         sub: 'Styrelseledamot', color: '#F59E0B',
    description: 'Ledamöterna bidrar med sina kompetenser och tar gemensamt ansvar för styrelsens beslut. Varje ledamot är lika ansvarig och bör förbereda sig inför möten.',
    tips: ['Dela det kollektiva styrelseansvar', 'Anmäl jäv om du har intressekonflikt', 'Använd din yrkeskompetens aktivt'] },
  { id: 6,  label: 'Lgh 203', name: 'Suppleanten',       sub: 'Ersättare',        color: '#EC4899',
    description: 'Suppleanter kallas in vid frånvaro och har rätt att delta men inte rösta om de inte ersätter en ordinarie ledamot. Suppleanter är viktiga för att styrelsen ska vara beslutsför.',
    tips: ['Rösträtt endast vid ordinarie ledamots frånvaro', 'Inget juridiskt ansvar som adjungerad', 'Bör delta på möten för att hålla sig uppdaterad'] },
  { id: 7,  label: 'Lgh 301', name: 'Revisorn',          sub: 'Vald av stämman',  color: '#14B8A6',
    description: 'Revisorn granskar styrelsens förvaltning och föreningens räkenskaper. Revisorn är inte en del av styrelsen utan rapporterar direkt till stämman.',
    tips: ['Väljs av föreningsstämman, inte styrelsen', 'Lämnar revisionsberättelse inför stämman', 'Kan anmärka på styrelsens arbete'] },
  { id: 8,  label: 'Lgh 302', name: 'Valberedningen',    sub: 'Stämmoorgan',      color: '#6366F1',
    description: 'Valberedningen föreslår kandidater till styrelsen inför föreningsstämman. De intervjuar kandidater och presenterar ett förslag som stämman sedan röstar om.',
    tips: ['Väljs av stämman, arbetar självständigt', 'Ska kontakta avgående ledamöter tidigt', 'Förslaget är en rekommendation – stämman beslutar'] },
];

// ── CSS Porttelefon ──
const IntercomDevice = ({ onButtonPress, activeId, callingId }) => {
  const rows = [];
  for (let i = 0; i < APARTMENTS.length; i += 2) rows.push(APARTMENTS.slice(i, i + 2));

  return (
    <div className="relative mx-auto select-none" style={{ width: '220px' }}>

      {/* Kropp */}
      <div className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #d4d0c8 0%, #b8b4aa 30%, #a8a49a 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
          border: '2px solid #9a9690',
          padding: '16px 14px 20px',
        }}>

        {/* Display-skärm */}
        <div className="rounded-lg mb-4 overflow-hidden"
          style={{
            background: '#1a2810',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
            border: '2px solid #2a2a2a',
            height: '52px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <AnimatePresence mode="wait">
            {callingId ? (
              <motion.div key="calling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center">
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold' }}>
                  RINGER...
                </motion.div>
                <div style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '10px' }}>
                  {APARTMENTS.find(a => a.id === callingId)?.label}
                </div>
              </motion.div>
            ) : activeId ? (
              <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '10px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>{APARTMENTS.find(a => a.id === activeId)?.label}</div>
                <div style={{ color: '#16a34a' }}>ÖPPNAD</div>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ color: '#166534', fontFamily: 'monospace', fontSize: '10px', textAlign: 'center' }}>
                <div>BRF KÖRKORTET</div>
                <div style={{ fontSize: '9px', color: '#14532d' }}>VÄLJ LÄGENHET</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Knappar */}
        <div className="space-y-2 mb-4">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((apt) => {
                const isActive = activeId === apt.id;
                const isCalling = callingId === apt.id;
                return (
                  <motion.button
                    key={apt.id}
                    onClick={() => onButtonPress(apt)}
                    whileTap={{ scale: 0.9 }}
                    className="flex-1 rounded-lg text-center transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${apt.color}, ${apt.color}bb)`
                        : isCalling
                          ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                          : 'linear-gradient(145deg, #c8c4bc, #a8a49c)',
                      boxShadow: isActive
                        ? `0 0 12px ${apt.color}80, inset 0 1px 0 rgba(255,255,255,0.3)`
                        : 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: isActive ? `1px solid ${apt.color}` : '1px solid #9a9690',
                      padding: '6px 4px',
                    }}>
                    <div style={{
                      fontSize: '8px', fontWeight: 'bold',
                      color: isActive ? '#fff' : '#3a3632',
                      lineHeight: 1.2,
                    }}>
                      {apt.label}
                    </div>
                    {isActive && (
                      <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full mx-auto mt-0.5"
                        style={{ background: '#fff' }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Högtalar-galler */}
        <div className="rounded-lg mb-4 flex flex-col gap-1 items-center justify-center py-3"
          style={{ background: 'linear-gradient(145deg, #8a8680, #9a9690)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)', border: '1px solid #7a7670' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-1">
              {[...Array(8)].map((_, j) => (
                <div key={j} className="w-0.5 h-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.4)' }} />
              ))}
            </div>
          ))}
          <div style={{ fontSize: '8px', color: 'rgba(0,0,0,0.3)', marginTop: '4px', fontFamily: 'monospace' }}>
            ▶ INTERCOM
          </div>
        </div>

        {/* Nedre knappar */}
        <div className="flex gap-3 justify-center">
          {/* Svara */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #4ade80, #16a34a)',
              boxShadow: '0 4px 12px rgba(74,222,128,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #15803d',
            }}>
            <Phone size={14} color="white" />
          </div>

          {/* Nyckel/lås */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #fbbf24, #d97706)',
              boxShadow: '0 4px 12px rgba(251,191,36,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #b45309',
            }}>
            <span style={{ fontSize: '14px' }}>🔑</span>
          </div>

          {/* Lägg på */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #f87171, #dc2626)',
              boxShadow: '0 4px 12px rgba(248,113,113,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              border: '1px solid #b91c1c',
            }}>
            <PhoneOff size={14} color="white" />
          </div>
        </div>

        {/* Fabrikat */}
        <div className="text-center mt-3">
          <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.25)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            BRF-SYSTEMS AB
          </span>
        </div>
      </div>

      {/* Skugga nedanför */}
      <div className="absolute -bottom-3 left-4 right-4 h-4 rounded-full"
        style={{ background: 'rgba(0,0,0,0.3)', filter: 'blur(8px)' }} />
    </div>
  );
};

// ── Info-panel till höger ──
const InfoPanel = ({ apt }) => {
  if (!apt) return (
    <div className="flex-1 max-w-sm mx-auto lg:mx-0 flex items-center justify-center min-h-64">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔔</span>
        </div>
        <p className="text-white/30 text-sm">Tryck på en knapp på porttelefonen för att läsa om rollen</p>
      </div>
    </div>
  );

  return (
    <motion.div
      key={apt.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 max-w-sm mx-auto lg:mx-0"
    >
      <div className="rounded-2xl overflow-hidden border border-white/10"
        style={{ background: 'rgba(13,19,35,0.95)' }}>
        {/* Header */}
        <div className="p-5 border-b border-white/8"
          style={{ background: `linear-gradient(135deg, ${apt.color}18, ${apt.color}08)` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
              style={{ background: apt.color, boxShadow: `0 0 20px ${apt.color}60` }}>
              {apt.label.split(' ')[1]}
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">{apt.sub}</p>
              <h3 className="text-lg font-bold text-white">{apt.name}</h3>
            </div>
          </div>
        </div>

        {/* Innehåll */}
        <div className="p-5 space-y-4">
          <p className="text-white/70 text-sm leading-relaxed">{apt.description}</p>
          <div className="bg-white/4 border border-white/8 rounded-xl p-4">
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-3">Viktigt att veta</h4>
            <ul className="space-y-2">
              {apt.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: apt.color }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Huvudkomponent ──
const IntercomSection = ({ isCompleted, onComplete }) => {
  const [activeApt, setActiveApt] = useState(null);
  const [callingId, setCallingId] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set());

  const handlePress = (apt) => {
    setCallingId(apt.id);
    setTimeout(() => {
      setCallingId(null);
      setActiveApt(apt);
      setVisitedIds(prev => new Set([...prev, apt.id]));
    }, 900);
  };

  const allVisited = visitedIds.size >= APARTMENTS.length;

  return (
    <section data-section={SECTION_ID} className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(255,84,33,0.05) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Roller i styrelsen
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Vem gör vad?</h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tryck på porttelefonen och "ring på" för att lära dig mer om varje roll i styrelsen.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex-shrink-0">
            <IntercomDevice onButtonPress={handlePress} activeId={activeApt?.id} callingId={callingId} />

            {/* Framsteg under porttelefonen */}
            <div className="mt-6 text-center">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2 mx-4">
                <motion.div className="h-full rounded-full bg-[#FF5421]"
                  animate={{ width: `${(visitedIds.size / APARTMENTS.length) * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>
              <span className="text-white/30 text-xs">{visitedIds.size}/{APARTMENTS.length} roller utforskade</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="w-full lg:w-auto flex-1 max-w-sm mx-auto lg:mx-0">
            <InfoPanel apt={activeApt} />

            {!isCompleted && (
              <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button onClick={() => allVisited && onComplete?.(SECTION_ID)} disabled={!allVisited}
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={allVisited
                    ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
                  }>
                  {allVisited ? '✓ Slutför lektion (+100 poäng)' : `Ring på alla ${APARTMENTS.length} lägenheter`}
                </button>
              </motion.div>
            )}

            {isCompleted && (
              <div className="mt-6 rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF5421]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF5421] font-bold">✓</span>
                </div>
                <span className="font-semibold text-white text-sm">Avsnitt slutfört! +100 poäng</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntercomSection;