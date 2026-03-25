// src/components/CourseElements/BuildingCrossSectionSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Clock, Wrench, AlertTriangle, Zap } from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const BUILDING_PARTS = [
  {
    id: 'tak',
    label: 'Tak & Ventilation',
    emoji: '🏠',
    color: '#6366F1',
    x: 52, y: 5,
    description: 'Taket skyddar byggnaden mot väder och vind. Ett välunderhållet tak är avgörande för att undvika fuktskador som kan sprida sig neråt i hela byggnaden. Ventilationssystemet säkerställer frisk luft i alla lägenheter.',
    livslangd: '30–50 år',
    underhall: 'Besiktning vart 5:e år, rensning av hängrännor varje höst',
    kostnad: '500 000 – 2 000 000 kr för omläggning',
    energi: 'Dålig takisolering kan stå för upp till 20% av värmeförlusterna',
    tips: ['Kontrollera tätskikt och plåtdetaljer regelbundet', 'Rensa hängrännor varje höst', 'OVK-besiktning av ventilation krävs vart 3:e år'],
    audioUrl: '/audio/byggnad-tak.mp3',
  },
  {
    id: 'fasad',
    label: 'Fasad & Fönster',
    emoji: '🪟',
    color: '#0EA5E9',
    x: 78, y: 35,
    description: 'Fasaden är byggnadens yttersta skydd och påverkar både energiförbrukning och utseende. Fönstren är ofta den svagaste länken i klimatskalet – gamla enkelfönster kan stå för enorma värmeförluster.',
    livslangd: 'Puts: 20–30 år, Fönster: 20–40 år',
    underhall: 'Målning/lagning vart 10–15 år, fönsterkittning regelbundet',
    kostnad: 'Fasadrenovering: 1 000–3 000 kr/m²',
    energi: 'Byte till treglasfönster kan minska värmeförlusterna med 50%',
    tips: ['Inspektera fogmassor och puts varje höst', 'Åtgärda sprickor omedelbart för att undvika vattenskador', 'Energifönster ger snabb återbetalningstid'],
    audioUrl: '/audio/byggnad-fasad.mp3',
  },
  {
    id: 'balkong',
    label: 'Balkonger',
    emoji: '🌿',
    color: '#EC4899',
    x: 25, y: 42,
    description: 'Balkonger är utsatta konstruktioner som kräver regelbunden tillsyn. Sprickor i balkongplattor kan leda till allvarliga konstruktionsfel. Styrelsen ansvarar för att balkonger är säkra för alla boende.',
    livslangd: 'Balkongtätskikt: 15–25 år',
    underhall: 'Besiktning vart 5:e år, tätskiktsbyte vid behov',
    kostnad: '50 000–150 000 kr per balkong vid renovering',
    energi: 'Inglasade balkonger kan minska värmeförlusten för bakomliggande rum',
    tips: ['Kontrollera att golvet lutar rätt så vatten rinner av', 'Sprickor i balkongplatta ska åtgärdas omedelbart', 'Räcken och infästningar kontrolleras för korrosion'],
    audioUrl: '/audio/byggnad-balkong.mp3',
  },
  {
    id: 'trapphus',
    label: 'Trapphus & Hiss',
    emoji: '🛗',
    color: '#8B5CF6',
    x: 48, y: 52,
    description: 'Trapphuset är den gemensamma artären i byggnaden. Hissen är den dyraste enskilda installationen och kräver regelbunden besiktning enligt lag. Brandskyddet i trapphuset är avgörande för allas säkerhet.',
    livslangd: 'Hiss: 20–30 år',
    underhall: 'Hissbesiktning varje år (lagkrav), service 4–6 ggr/år',
    kostnad: 'Hissrenovering: 500 000–1 500 000 kr',
    energi: 'Moderna hissar använder 30–50% mindre energi',
    tips: ['Hissen måste besiktigas av ackrediterat organ varje år', 'Nödbelysning i trapphuset är lagkrav', 'Brandcellsgränser i trapphus är viktiga för brandskyddet'],
    audioUrl: '/audio/byggnad-trapphus.mp3',
  },
  {
    id: 'vvs',
    label: 'Värmesystem & VVS',
    emoji: '🔥',
    color: '#FF5421',
    x: 18, y: 65,
    description: 'Värmesystemet är hjärtat i fastigheten. Fjärrvärme, värmepump eller panncentral fördelar värme till alla lägenheter. VVS-systemet hanterar kallt och varmt vatten samt avlopp.',
    livslangd: 'Stamledningar: 40–60 år, Värmepump: 15–20 år',
    underhall: 'Injustering vart 5:e år, stambyte vid behov',
    kostnad: 'Stambyte: 30 000–80 000 kr per lägenhet',
    energi: 'Rätt injusterat värmesystem kan spara 10–15% på energinotan',
    tips: ['Sänk inomhustemperaturen 1°C = ca 5% energibesparing', 'Termostatventiler ska fungera på alla radiatorer', 'Varmvattencirkulation minskar väntetid och vattenspill'],
    audioUrl: '/audio/byggnad-vvs.mp3',
  },
  {
    id: 'entre',
    label: 'Entré & Bottenvåning',
    emoji: '🚪',
    color: '#10B981',
    x: 42, y: 78,
    description: 'Entrén är byggnadens ansikte utåt och det första intrycket för boende och besökare. Porttelefon, passagesystem och belysning är viktiga säkerhets- och trivselaspekter som styrelsen ansvarar för.',
    livslangd: 'Porttelefon: 15–20 år, Dörrar: 30–50 år',
    underhall: 'Kontroll av portlås och belysning varje år',
    kostnad: 'Entréupprustning: 100 000–400 000 kr',
    energi: 'Tätning av entrédörrar minskar drag och värmeförluster',
    tips: ['Porttelefon och passagesystem ska fungera alltid', 'God belysning i entré ökar tryggheten', 'Tillgänglighetsanpassning kan vara krav vid renovering'],
    audioUrl: '/audio/byggnad-entre.mp3',
  },
  {
    id: 'utemiljo',
    label: 'Utemiljö & Mark',
    emoji: '🌳',
    color: '#F59E0B',
    x: 15, y: 88,
    description: 'Utemiljön – parkering, lekplats, gångar och grönyta – är föreningens ansvar och påverkar trivsel och fastighetsvärde. Snöröjning, sandning och trädgångsskötsel måste planeras och budgeteras.',
    livslangd: 'Asfalt: 15–25 år, Marksten: 30–50 år',
    underhall: 'Snöröjning vintertid, klippning och beskärning säsong',
    kostnad: 'Markupprustning: 500–1 500 kr/m²',
    energi: 'Utomhusbelysning med LED och rörelsesensorer sparar energi',
    tips: ['Dagvattenhantering är viktigt för att skydda grunden', 'Träd nära byggnaden kan skada ledningar och grund', 'Tillgänglighet för rullstol och barnvagn är lagkrav'],
    audioUrl: '/audio/byggnad-utemiljo.mp3',
  },
];

// ─────────────────────────────────────────────
// AUDIO HOOK
// ─────────────────────────────────────────────

const useAudio = (url) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => ref.current?.pause(), []);
  const toggle = () => {
    if (!ref.current) { ref.current = new Audio(url); ref.current.onended = () => setPlaying(false); }
    if (playing) { ref.current.pause(); ref.current.currentTime = 0; setPlaying(false); }
    else { ref.current.play().catch(() => {}); setPlaying(true); }
  };
  return { playing, toggle };
};

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────

const PartModal = ({ part, onClose }) => {
  const { playing, toggle } = useAudio(part.audioUrl);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
        onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 30 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 h-full"
          style={{ background: 'rgba(13,19,35,0.98)', backdropFilter: 'blur(24px)' }}>

          {/* Header */}
          <div className="p-5 flex items-center justify-between flex-shrink-0 border-b border-white/8"
            style={{ background: 'linear-gradient(135deg, #FF542118, #FF542106)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: '#FF542120', border: '1.5px solid #FF542145' }}>
                {part.emoji}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">Fastighetskomponent</p>
                <h3 className="text-xl font-bold text-white">{part.label}</h3>
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
              <X size={18} className="text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <p className="text-white/75 text-sm leading-relaxed">{part.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock,         label: 'Livslängd', value: part.livslangd,  color: '#0EA5E9' },
                { icon: Zap,           label: 'Energi',    value: part.energi,     color: '#F59E0B' },
                { icon: Wrench,        label: 'Underhåll', value: part.underhall,  color: '#10B981' },
                { icon: AlertTriangle, label: 'Kostnad',   value: part.kostnad,    color: '#FF5421' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-xl p-3 border border-white/8 bg-white/4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon size={13} style={{ color }} />
                    <span className="text-white/35 text-xs font-bold uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/4 border border-white/8 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-3">Styrelsens ansvar</h4>
              <ul className="space-y-2">
                {part.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-[#FF5421]" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/8 flex-shrink-0">
            <button onClick={toggle}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={playing
                ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }
                : { background: '#FF5421', color: '#fff', boxShadow: '0 4px 20px #FF542150' }
              }>
              {playing ? <><VolumeX size={16} /> Stoppa</> : <><Volume2 size={16} /> Lyssna på förklaring</>}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─────────────────────────────────────────────
// HOTSPOT
// ─────────────────────────────────────────────

const Hotspot = ({ part, isVisited, onClick }) => (
  <motion.button
    onClick={() => onClick(part)}
    className="absolute"
    style={{
      left: `${part.x}%`,
      top: `${part.y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 20,
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {/* Pulsande ring */}
    {!isVisited && (
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 22, height: 22,
          top: -3, left: -3,
          background: part.color,
          borderRadius: '50%',
        }}
      />
    )}

    {/* Knapp */}
    <div style={{
      width: 28, height: 28,
      borderRadius: '50%',
      background: isVisited ? part.color : `${part.color}dd`,
      border: '2.5px solid rgba(255,255,255,0.85)',
      boxShadow: `0 0 16px ${part.color}90, 0 2px 8px rgba(0,0,0,0.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 800, color: '#fff',
      position: 'relative',
    }}>
      {isVisited ? '✓' : '+'}
    </div>

    {/* Label-tag */}
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 'calc(100% + 8px)',
      transform: 'translateY(-50%)',
      whiteSpace: 'nowrap',
      background: 'rgba(10,15,28,0.92)',
      backdropFilter: 'blur(8px)',
      border: `1px solid ${part.color}50`,
      borderRadius: 8,
      padding: '4px 10px',
      fontSize: 11,
      fontWeight: 700,
      color: isVisited ? part.color : 'rgba(255,255,255,0.85)',
      pointerEvents: 'none',
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }}>
      {part.label}
    </div>
  </motion.button>
);

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────

const BuildingCrossSectionSection = ({ isCompleted, onComplete }) => {
  const [activePart, setActivePart] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set());

  const handleClick = (part) => {
    setActivePart(part);
    setVisitedIds(prev => new Set([...prev, part.id]));
  };

  const allVisited = visitedIds.size >= BUILDING_PARTS.length;

  return (
    <section
      data-section="byggnad"
      className="min-h-screen relative py-16 sm:py-20"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, rgba(255,84,33,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.04) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Fastighetsskötsel
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Byggnadens viktigaste delar
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Klicka på de färgade punkterna för att lära dig om varje del av fastigheten.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* BILD MED HOTSPOTS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex-1 min-w-0"
          >
            <div className="relative rounded-2xl overflow-visible">
              {/* Bilden */}
              <img
                src="/images/planima_HeaderImage_House_png.webp"
                alt="Flerfamiljshus"
                className="w-full h-auto"
                style={{ borderRadius: 16, display: 'block' }}
              />

              {/* Hotspots */}
              {BUILDING_PARTS.map(part => (
                <Hotspot
                  key={part.id}
                  part={part}
                  isVisited={visitedIds.has(part.id)}
                  onClick={handleClick}
                />
              ))}
            </div>
            <p className="text-white/25 text-xs text-center mt-3">
              Klicka på punkterna för mer information om varje del
            </p>
          </motion.div>

          {/* HÖGER: lista + framsteg */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="w-full lg:w-72 flex-shrink-0"
          >
            <div className="rounded-2xl border border-white/8 bg-white/3 p-5 mb-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-white/35 text-xs uppercase tracking-wider font-bold">Utforskade delar</p>
                <span className="text-[#FF5421] font-bold text-sm">{visitedIds.size}/{BUILDING_PARTS.length}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full bg-[#FF5421]"
                  animate={{ width: `${(visitedIds.size / BUILDING_PARTS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="space-y-2">
                {BUILDING_PARTS.map(part => (
                  <motion.button
                    key={part.id}
                    onClick={() => handleClick(part)}
                    animate={visitedIds.has(part.id) ? { x: [4, 0] } : {}}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                    style={{
                      background: visitedIds.has(part.id) ? `${part.color}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${visitedIds.has(part.id) ? part.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <span className="text-base">{part.emoji}</span>
                    <span className="text-sm font-semibold flex-1 truncate"
                      style={{ color: visitedIds.has(part.id) ? part.color : 'rgba(255,255,255,0.45)' }}>
                      {part.label}
                    </span>
                    {visitedIds.has(part.id) && <span className="text-xs text-green-400 flex-shrink-0">✓</span>}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Slutför */}
            {!isCompleted ? (
              <button
                onClick={() => allVisited && onComplete?.('byggnad')}
                disabled={!allVisited}
                className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={allVisited
                  ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
                }>
                {allVisited ? '✓ Slutför lektion (+150 poäng)' : `Utforska alla ${BUILDING_PARTS.length} delar`}
              </button>
            ) : (
              <div className="rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8 p-4 flex items-center gap-3">
                <span className="text-[#FF5421] font-bold text-lg">✓</span>
                <span className="font-semibold text-white text-sm">Avsnitt slutfört! +150 poäng</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activePart && <PartModal part={activePart} onClose={() => setActivePart(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default BuildingCrossSectionSection;