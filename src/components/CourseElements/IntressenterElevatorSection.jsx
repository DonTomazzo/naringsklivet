// src/components/CourseElements/IntressenterElevatorSection.jsx

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

// ============================================
// 1. DATA
// ============================================

const SECTION_ID = 'intressenter';

const INTRESSENTER = [
  {
    id: 1, label: 'Förvaltaren', floor: '16', color: '#FF5421',
    description: 'Förvaltaren sköter den löpande administrativa och tekniska förvaltningen av fastigheten på uppdrag av styrelsen. Det kan vara en extern firma eller en person anställd av föreningen.',
    examples: ['Hanterar hyresavier och avgifter', 'Sköter felanmälningar', 'Upprättar årsredovisning', 'Hanterar kontakter med myndigheter'],
    audioUrl: '/audio/intressent-forvaltaren.mp3',
  },
  {
    id: 2, label: 'Fastighetsskötare', floor: '15', color: '#F59E0B',
    description: 'Fastighetsskötaren ansvarar för det praktiska underhållet av fastigheten – allt från att byta glödlampor till att sköta värmesystemet och hålla ordning i gemensamma utrymmen.',
    examples: ['Rondering och tillsyn', 'Felavhjälpning', 'Skötsel av utemiljö', 'Kontroll av tekniska installationer'],
    audioUrl: '/audio/intressent-fastighetsskotare.mp3',
  },
  {
    id: 3, label: 'Revisorer', floor: '14', color: '#10B981',
    description: 'Revisorn granskar styrelsens förvaltning och föreningens räkenskaper. Revisorn väljs av föreningsstämman och rapporterar direkt till medlemmarna.',
    examples: ['Granskar årsredovisningen', 'Kontrollerar bokföringen', 'Lämnar revisionsberättelse', 'Kan anmärka på styrelsens arbete'],
    audioUrl: '/audio/intressent-revisorer.mp3',
  },
  {
    id: 4, label: 'Bank', floor: '13', color: '#0EA5E9',
    description: 'Banken är en viktig intressent som hanterar föreningens lån, konton och finansiella transaktioner. Föreningens lån mot fastigheten påverkar direkt medlemmarnas månadsavgifter.',
    examples: ['Fastighetslån', 'Driftskonto och likviditetshantering', 'Ränteförhandlingar', 'Finansiella råd'],
    audioUrl: '/audio/intressent-bank.mp3',
  },
  {
    id: 5, label: 'Försäkringsbolag', floor: '12', color: '#8B5CF6',
    description: 'Föreningen måste ha en fastighetsförsäkring som täcker byggnaden och gemensamma utrymmen. Försäkringsbolaget är en viktig partner vid skador och olyckor.',
    examples: ['Fastighetsförsäkring', 'Skadehantering', 'Riskbedömning', 'Bostadsrättstillägg för medlemmar'],
    audioUrl: '/audio/intressent-forsakringsbolag.mp3',
  },
  {
    id: 6, label: 'Leverantörer', floor: '11', color: '#EC4899',
    description: 'Leverantörer tillhandahåller varor och tjänster till föreningen – allt från el och vatten till byggmaterial och städtjänster. Styrelsen ansvarar för att upphandla på ett affärsmässigt sätt.',
    examples: ['El- och fjärrvärmeleverantörer', 'Hisservice', 'Städfirmor', 'Byggentreprenörer'],
    audioUrl: '/audio/intressent-leverantorer.mp3',
  },
  {
    id: 7, label: 'Skatteverket', floor: '10', color: '#6366F1',
    description: 'Skatteverket är en myndighet som BRF:en har skyldigheter gentemot. Föreningen kan behöva betala skatt på vissa intäkter och måste lämna in skattedeklaration.',
    examples: ['Arbetsgivaravgifter om anställda finns', 'Moms på vissa tjänster', 'Inkomstdeklaration', 'Fastighetstaxering'],
    audioUrl: '/audio/intressent-skatteverket.mp3',
  },
  {
    id: 8, label: 'Bolagsverket', floor: '9', color: '#F97316',
    description: 'Bolagsverket registrerar och övervakar ekonomiska föreningar, inklusive bostadsrättsföreningar. Styrelseförändringar och stadgeändringar måste anmälas hit.',
    examples: ['Registrering av föreningen', 'Anmälan av styrelseledamöter', 'Stadgeändringar', 'Årsredovisning inlämning'],
    audioUrl: '/audio/intressent-bolagsverket.mp3',
  },
  {
    id: 9, label: 'Boverket', floor: '8', color: '#14B8A6',
    description: 'Boverket är den statliga myndigheten för samhällsplanering, byggande och boende. De ger ut föreskrifter och allmänna råd som påverkar hur fastigheter får byggas och förvaltas.',
    examples: ['Byggregler och BBR', 'Tillgänglighetskrav', 'Energikrav', 'Radon och inomhusmiljö'],
    audioUrl: '/audio/intressent-boverket.mp3',
  },
  {
    id: 10, label: 'Bokföringsnämnden', floor: '7', color: '#EF4444',
    description: 'Bokföringsnämnden (BFN) ger ut normgivning för hur föreningens bokföring och årsredovisning ska upprättas. Föreningen måste följa K2- eller K3-regelverket.',
    examples: ['K2-regelverket för mindre föreningar', 'K3 för större föreningar', 'Redovisningsprinciper', 'Årsredovisningslagen'],
    audioUrl: '/audio/intressent-bokforingsnamnden.mp3',
  },
  {
    id: 11, label: 'Hyresnämnd', floor: '6', color: '#84CC16',
    description: 'Hyresnämnden är en statlig nämnd som hanterar tvister mellan bostadsrättsföreningen och dess medlemmar, samt ärenden om andrahandsuthyrning och tillstånd.',
    examples: ['Andrahandsuthyrning', 'Tillstånd för åtgärder i lägenhet', 'Tvister om avgifter', 'Uteslutning av medlem'],
    audioUrl: '/audio/intressent-hyresnamnden.mp3',
  },
  {
    id: 12, label: 'Lagstiftaren', floor: '5', color: '#FF5421',
    description: 'Riksdagen och regeringen skapar de lagar och regler som styr bostadsrättsföreningens verksamhet. De viktigaste lagarna är Bostadsrättslagen och Lagen om ekonomiska föreningar.',
    examples: ['Bostadsrättslagen (BRL)', 'Lagen om ekonomiska föreningar', 'Plan- och bygglagen', 'Miljöbalken'],
    audioUrl: '/audio/intressent-lagstiftaren.mp3',
  },
  {
    id: 13, label: 'Byggherre', floor: '4', color: '#F59E0B',
    description: 'En byggherre är den som låter utföra byggnads- eller anläggningsarbeten. BRF:en är byggherre vid om- och tillbyggnader, och har då ett tydligt ansvar för att regler följs.',
    examples: ['Renovering av gemensamma ytor', 'Påbyggnad av fastigheten', 'Ansvar för bygglov', 'Kontakt med byggnadsinspektionen'],
    audioUrl: '/audio/intressent-byggherre.mp3',
  },
  {
    id: 14, label: 'Mäklare', floor: '3', color: '#10B981',
    description: 'När en bostadsrätt säljs är mäklaren en viktig part. Mäklaren begär ut information från föreningen och förmedlar denna till köparen. Styrelsen har informationsplikt.',
    examples: ['Begär årsredovisning och stadgar', 'Frågar om kommande renoveringar', 'Kontrollerar skuldfrihet', 'Överlåtelseavgift till föreningen'],
    audioUrl: '/audio/intressent-maklare.mp3',
  },
  {
    id: 15, label: 'Grannar', floor: '2', color: '#0EA5E9',
    description: 'Grannfastigheter och grannar är intressenter vid t.ex. byggnadsarbeten, bullerstörningar och gemensamma gränser. God grannrelation är viktig för föreningens rykte och trivsel.',
    examples: ['Gränsmarkeringar och servitut', 'Bullerklagomål vid renovering', 'Gemensamma parkeringslösningar', 'Grannsamverkan mot inbrott'],
    audioUrl: '/audio/intressent-grannar.mp3',
  },
  {
    id: 16, label: 'Samfällighet', floor: '1', color: '#8B5CF6',
    description: 'En samfällighet är mark eller anläggningar som ägs gemensamt av flera fastigheter, t.ex. gemensamma vägar, VA-anläggningar eller grönområden. BRF:en kan vara delägare i en samfällighetsförening.',
    examples: ['Gemensam parkering', 'Delade VA-ledningar', 'Samfällda grönområden', 'Kostnadsfördelning mellan fastigheter'],
    audioUrl: '/audio/intressent-samfallighet.mp3',
  },
  {
    id: 17, label: 'Myndigheter', floor: 'M', color: '#6366F1',
    description: 'Utöver de specifika myndigheterna finns ett brett spektrum av myndigheter som kan beröra föreningens verksamhet, från kommunen till länsstyrelsen och miljömyndigheter.',
    examples: ['Kommunens byggnadsnämnd', 'Länsstyrelsen', 'Miljöförvaltningen', 'Räddningstjänsten'],
    audioUrl: '/audio/intressent-myndigheter.mp3',
  },
];

// ============================================
// 2. AUDIO HOOK
// ============================================

const useAudio = (url) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { return () => { if (audioRef.current) audioRef.current.pause(); }; }, []);
  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) { audioRef.current.pause(); audioRef.current.currentTime = 0; setPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setPlaying(true); }
  };
  return { playing, toggle };
};

// ============================================
// 3. MODAL – endast #FF5421
// ============================================

const IntressentModal = ({ item, onClose }) => {
  const { playing, toggle } = useAudio(item.audioUrl);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 32 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 flex flex-col"
        style={{ maxHeight: '88vh' }}
      >
        <div
          className="flex flex-col rounded-2xl overflow-hidden border border-white/10 h-full"
          style={{ background: 'rgba(13,19,35,0.98)', backdropFilter: 'blur(24px)' }}
        >
          {/* Header – orange */}
          <div
            className="p-5 flex items-center justify-between flex-shrink-0 border-b border-white/8"
            style={{ background: 'linear-gradient(135deg, #FF542118, #FF542108)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                style={{ background: '#FF5421', boxShadow: '0 0 20px #FF542160' }}
              >
                {item.floor}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">Intressent</p>
                <h3 className="text-lg font-bold text-white leading-tight">{item.label}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white/60" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>

            <div className="bg-white/4 border border-white/8 rounded-xl p-4">
              <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-3">Exempel på kontakter</h4>
              <ul className="space-y-2">
                {item.examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                    {/* Orange punkt */}
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#FF5421]" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer – orange ljudknapp */}
          <div className="p-5 border-t border-white/8 flex-shrink-0">
            <button
              onClick={toggle}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={playing
                ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }
                : { background: '#FF5421', color: '#fff', boxShadow: '0 4px 20px #FF542150' }
              }
            >
              {playing
                ? <><VolumeX size={16} /> Stoppa ljudet</>
                : <><Volume2 size={16} /> Lyssna på förklaring</>
              }
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ============================================
// 4. ELEVATOR PANEL – behåller unika färger
// ============================================

const ElevatorButton = ({ item, isVisited, onClick }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onClick(item);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      className="relative flex flex-col items-center gap-1.5 group"
      title={item.label}
    >
      <div
        className="relative rounded-lg transition-all duration-150"
        style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(145deg, #3a3a3a, #222)',
          boxShadow: pressed
            ? 'inset 2px 2px 5px rgba(0,0,0,0.8), inset -1px -1px 3px rgba(255,255,255,0.05)'
            : '3px 3px 8px rgba(0,0,0,0.6), -1px -1px 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
          border: isVisited ? `2px solid ${item.color}` : '2px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-2 rounded-md flex items-center justify-center transition-all duration-150"
          style={{
            background: isVisited
              ? `radial-gradient(circle at 35% 35%, ${item.color}dd, ${item.color}88)`
              : pressed
                ? 'radial-gradient(circle at 35% 35%, #2a2a2a, #1a1a1a)'
                : 'radial-gradient(circle at 35% 35%, #484848, #2c2c2c)',
            boxShadow: isVisited
              ? `0 0 12px ${item.color}80, inset 0 1px 0 rgba(255,255,255,0.3)`
              : pressed
                ? 'inset 2px 2px 4px rgba(0,0,0,0.6)'
                : 'inset 0 1px 0 rgba(255,255,255,0.12), 1px 1px 3px rgba(0,0,0,0.4)',
          }}
        >
          <span
            className="font-bold text-sm select-none"
            style={{
              color: isVisited ? '#fff' : 'rgba(255,255,255,0.6)',
              textShadow: isVisited ? `0 0 8px ${item.color}, 0 1px 2px rgba(0,0,0,0.5)` : '0 1px 3px rgba(0,0,0,0.8)',
              fontFamily: 'monospace',
            }}
          >
            {item.floor}
          </span>
        </div>

        <div
          className="absolute top-1 left-1 right-1 h-3 rounded-t-md pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)' }}
        />

        {isVisited && (
          <motion.div
            className="absolute -inset-1 rounded-lg pointer-events-none"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: `0 0 10px ${item.color}60`, border: `1px solid ${item.color}40` }}
          />
        )}
      </div>

      <span
        className="text-center leading-tight transition-colors"
        style={{
          fontSize: '9px', maxWidth: '56px',
          color: isVisited ? item.color : 'rgba(255,255,255,0.35)',
          fontWeight: isVisited ? '700' : '400',
        }}
      >
        {item.label}
      </span>
    </motion.button>
  );
};

const ElevatorPanel = ({ onButtonClick, visitedIds }) => {
  const rows = [];
  for (let i = 0; i < INTRESSENTER.length; i += 2) rows.push(INTRESSENTER.slice(i, i + 2));
  rows.reverse();

  return (
    <div
      className="relative rounded-2xl overflow-hidden mx-auto"
      style={{
        maxWidth: '280px',
        background: 'linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #222 100%)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '24px 28px 20px',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)' }}
      />

      <div className="text-center mb-5 relative">
        <div
          className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase"
          style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace' }}
        >
          FÖRENINGENS INTRESSENTER
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      <div className="relative space-y-3">
        {rows.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-4">
            {row.map((item) => (
              <ElevatorButton key={item.id} item={item} isVisited={visitedIds.has(item.id)} onClick={onButtonClick} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 flex justify-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {['◀▶', '🔔', '⏹'].map((sym, i) => (
          <div key={i} className="w-10 h-10 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'radial-gradient(circle at 35% 35%, #383838, #242424)', boxShadow: '2px 2px 5px rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.04)' }}>
            {sym}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
          {visitedIds.size}/{INTRESSENTER.length} BESÖKTA
        </span>
      </div>
    </div>
  );
};

// ============================================
// 5. HUVUDKOMPONENT
// ============================================

const IntressenterElevatorSection = ({ isCompleted, onComplete }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set());

  const handleButtonClick = (item) => {
    setActiveItem(item);
    setVisitedIds(prev => new Set([...prev, item.id]));
  };

  const allVisited = visitedIds.size >= INTRESSENTER.length;

  return (
    <section
      data-section={SECTION_ID}
      className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,84,33,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(99,102,241,0.04) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Föreningens omvärld
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Föreningens intressenter
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            En bostadsrättsförening har kontakt med många olika aktörer. Tryck på varje våning för att lära dig mer om respektive intressent.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-16">

          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="w-full lg:w-auto flex justify-center flex-shrink-0"
          >
            <ElevatorPanel onButtonClick={handleButtonClick} visitedIds={visitedIds} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex-1 max-w-sm mx-auto lg:mx-0"
          >
            {/* Instruktioner */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
              <h3 className="font-bold text-white text-base mb-2">Hur det fungerar</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Varje knapp på panelen representerar en av föreningens intressenter. Tryck på en knapp för att läsa beskrivning och lyssna på en kort förklaring.
              </p>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div className="w-4 h-4 rounded" style={{ background: '#FF5421', boxShadow: '0 0 8px #FF5421' }} />
                <span>Knappen lyser när du besökt intressenten</span>
              </div>
            </div>

            {/* Framsteg */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-white text-sm">Framsteg</h3>
                <span className="text-[#FF5421] font-bold text-sm">{visitedIds.size}/{INTRESSENTER.length}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full bg-[#FF5421]"
                  animate={{ width: `${(visitedIds.size / INTRESSENTER.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {INTRESSENTER.map(item => (
                  <motion.div
                    key={item.id}
                    animate={visitedIds.has(item.id) ? { scale: [1.3, 1] } : {}}
                    className="text-xs px-2 py-1 rounded-lg font-medium transition-all"
                    style={{
                      background: visitedIds.has(item.id) ? `${item.color}25` : 'rgba(255,255,255,0.04)',
                      color: visitedIds.has(item.id) ? item.color : 'rgba(255,255,255,0.2)',
                      border: `1px solid ${visitedIds.has(item.id) ? item.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Slutför */}
            {!isCompleted && (
              <button
                onClick={() => allVisited && onComplete?.(SECTION_ID)}
                disabled={!allVisited}
                className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={allVisited
                  ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
                }
              >
                {allVisited ? '✓ Slutför lektion (+100 poäng)' : `Besök alla ${INTRESSENTER.length} intressenter`}
              </button>
            )}

            {isCompleted && (
              <div className="rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF5421]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF5421] font-bold">✓</span>
                </div>
                <span className="font-semibold text-white text-sm">Avsnitt slutfört! +100 poäng</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && <IntressentModal item={activeItem} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default IntressenterElevatorSection;