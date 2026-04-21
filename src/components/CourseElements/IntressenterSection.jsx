// src/components/CourseElements/IntressenterSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O = '#FF5421';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const BUILDING_PARTS = [
  {
    id: 'forvaltaren', label: 'Förvaltaren', emoji: '🏢', color: '#FF5421',
    x: 62, y: 8,
    description: 'Förvaltaren sköter den dagliga driften av fastigheten på styrelsens uppdrag. De hanterar allt från fakturor och bokföring till felanmälningar och leverantörskontakter.',
    relation: 'Uppdragstagare – styrelsen är alltid ytterst ansvarig.',
    tips: ['Kräv månadsrapporter med budgetuppföljning', 'Biträdesavtal enligt GDPR krävs', 'Styrelsen kan inte delegera bort sitt juridiska ansvar'],
    audioUrl: '/audio/forvaltaren.mp3',
  },
  {
    id: 'myndigheter', label: 'Myndigheter', emoji: '🏛️', color: '#6366F1',
    x: 38, y: 8,
    description: 'Styrelsen har kontakt med flera myndigheter. Bolagsverket hanterar registrering av styrelseändringar. IMY granskar GDPR-efterlevnad. Skatteverket hanterar skattefrågor.',
    relation: 'Tillsynsorgan – ni rapporterar till och granskas av dem.',
    tips: ['Anmäl nya styrelseledamöter till Bolagsverket direkt', 'Energideklaration måste uppdateras vart 10:e år', 'IMY kan granska er GDPR-hantering'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'fastighetsskotare', label: 'Fastighetsskötare', emoji: '🔧', color: '#10B981',
    x: 78, y: 18,
    description: 'Fastighetsskötaren utför det praktiska underhållet av fastigheten — sophantering, snöröjning, felavhjälpning och tillsyn. Kan vara anställd av föreningen eller via förvaltaren.',
    relation: 'Anställd eller uppdragstagare – tydlig ansvarsfördelning krävs.',
    tips: ['Klargör ansvarsfördelning mellan förvaltare och fastighetsskötare', 'Skriftliga rutiner för felanmälan', 'F-skattsedel krävs om uppdragstagare anlitas'],
    audioUrl: '/audio/fastighetsskotaren.mp3',
  },
  {
    id: 'forsakringsbolag', label: 'Försäkringsbolag', emoji: '🛡️', color: '#0EA5E9',
    x: 15, y: 22,
    description: 'Föreningen ska ha en fastighetsförsäkring som täcker byggnaden och gemensamma utrymmen. Styrelsen ansvarar för att försäkringen är aktuell och att skador anmäls korrekt.',
    relation: 'Avtalsparter – jämför villkor och premie regelbundet.',
    tips: ['Jämför minst 3 offerter vid omförhandling', 'Styrelseansvarsförsäkring är viktig', 'Dokumentera alla skador noga'],
    audioUrl: '/audio/forsakring.mp3',
  },
  {
    id: 'maklare', label: 'Mäklare', emoji: '🏠', color: '#EC4899',
    x: 80, y: 35,
    description: 'Mäklaren förmedlar bostadsrätter och kontaktar föreningen vid överlåtelser. Styrelsen ansvarar för att godkänna nya medlemmar och utfärda pantbrevsinformation.',
    relation: 'Extern part – kontakt vid varje överlåtelse.',
    tips: ['Svara på mäklarförfrågningar inom rimlig tid', 'Ekonomisk plan och årsredovisning ska tillhandahållas', 'Styrelsen godkänner — inte mäklaren — nya medlemmar'],
    audioUrl: '/audio/maklaren-1.mp3',
  },
  {
    id: 'boverket', label: 'Boverket', emoji: '📋', color: '#8B5CF6',
    x: 80, y: 50,
    description: 'Boverket är den statliga myndigheten för samhällsplanering, byggande och boende. De utfärdar föreskrifter och allmänna råd som gäller för bostadsrättsföreningars fastigheter.',
    relation: 'Normgivande myndighet – regler vid renovering och energi.',
    tips: ['Kontrollera Boverkets krav vid renovering', 'Energideklaration regleras av Boverket', 'PBL styr bygglov och detaljplaner'],
    audioUrl: '/audio/boverket.mp3',
  },
  {
    id: 'bolagsverket', label: 'Bolagsverket', emoji: '📝', color: '#14B8A6',
    x: 80, y: 62,
    description: 'Bolagsverket registrerar föreningens styrelse och stadgeändringar. Nya styrelseledamöter och firmatecknare måste anmälas hit. Registreringsbeviset används vid avtal och bankärenden.',
    relation: 'Registermyndighet – anmäl ändringar inom 4 veckor.',
    tips: ['Anmäl inom 4 veckor efter konstituerande möte', 'Registreringsbevis ska vara max 1 år gammalt', 'Stadgeändringar måste registreras för att gälla'],
    audioUrl: '/audio/bolagsverket.mp3',
  },
  {
    id: 'hyresnamnden', label: 'Hyresnämnd', emoji: '⚖️', color: '#F59E0B',
    x: 80, y: 75,
    description: 'Hyresnämnden prövar tvister mellan bostadsrättshavare och föreningen — t.ex. vid nekad andrahandsuthyrning. Beslut kan inte överklagas.',
    relation: 'Tvistlösningsorgan – gratis prövning, bindande beslut.',
    tips: ['Motivera alltid avslag på andrahandsuthyrning skriftligt', 'Hyresnämndens beslut är bindande', 'Anlita jurist vid komplicerade tvister'],
    audioUrl: '/audio/hyresnamnden.mp3',
  },
  {
    id: 'revisorer', label: 'Revisorer', emoji: '🔍', color: '#6366F1',
    x: 80, y: 87,
    description: 'Revisorn väljs av föreningsstämman och granskar styrelsens förvaltning och räkenskaper. Revisorn är medlemmarnas företrädare — inte styrelsens.',
    relation: 'Granskningsorgan – vald av stämman, rapporterar till stämman.',
    tips: ['Revisorn ska inte delta i styrelsearbetet', 'Revisionsberättelsen presenteras på stämman', 'En auktoriserad revisor kan krävas beroende på föreningens storlek'],
    audioUrl: '/audio/revisorn.mp3',
  },
  {
    id: 'leverantorer', label: 'Leverantörer', emoji: '🚛', color: '#FF5421',
    x: 15, y: 65,
    description: 'Föreningen anlitar leverantörer för allt från sophantering och städning till el, bredband och underhåll. Styrelsen ansvarar för att avtal är korrekta och att upphandling sker affärsmässigt.',
    relation: 'Avtalsparter – upphandla strukturerat och dokumenterat.',
    tips: ['Ta alltid in minst 3 offerter vid större upphandlingar', 'Biträdesavtal krävs om leverantören hanterar personuppgifter', 'Kontrollera F-skattsedel'],
    audioUrl: '/audio/leverantorer.mp3',
  },
  {
    id: 'bank', label: 'Bank', emoji: '🏦', color: '#0EA5E9',
    x: 15, y: 78,
    description: 'Banken hanterar föreningens lån, konton och betalningar. Styrelsen ansvarar för att låneavtal är fördelaktiga och att räntebindning är genomtänkt.',
    relation: 'Kreditgivare – räntekostnaden är ofta föreningens största utgift.',
    tips: ['Jämför alltid räntor mellan banker vid omläggning', 'Sprid räntebindningen för att minska ränterisk', 'Banken kräver registreringsbevis och årsredovisning'],
    audioUrl: '/audio/banken-1.mp3',
  },
  {
    id: 'grannar', label: 'Grannar', emoji: '👋', color: '#10B981',
    x: 38, y: 92,
    description: 'Grannfastigheter och grannar påverkar och påverkas av föreningen. Gränsfrågor, buller, dagvatten och gemensamma vägar kan skapa konflikter som styrelsen behöver hantera.',
    relation: 'Grannrelation – dokumentera överenskommelser skriftligt.',
    tips: ['Upprätta skriftliga avtal vid gemensamma ledningar', 'Ta upp grannkonflikter tidigt', 'Kommunen kan medla i gränstvister'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'lagstiftaren', label: 'Lagstiftaren', emoji: '📜', color: '#8B5CF6',
    x: 62, y: 92,
    description: 'Riksdagen och EU stiftar de lagar som styr bostadsrättsföreningar — bostadsrättslagen, lagen om ekonomiska föreningar, GDPR, plan- och bygglagen med flera.',
    relation: 'Regelgivare – håll koll på lagändringar som påverkar BRF.',
    tips: ['Prenumerera på nyhetsbrev från branschorganisationer', 'K3-övergången 2026 är en viktig lagändring', 'GDPR uppdateras löpande av EU'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'byggherre', label: 'Byggherre', emoji: '👷', color: '#EC4899',
    x: 22, y: 42,
    description: 'Byggherren är den som uppförde fastigheten. Vid nyare hus kan garantier och ansvar för byggfel fortfarande gälla. Vid ombyggnad är föreningen själv byggherre.',
    relation: 'Ursprungspart – kontrollera garantitider för nybyggda fastigheter.',
    tips: ['Kontrollera garantitider för nybyggda fastigheter', 'Anmäl byggfel skriftligt inom garantitiden', 'Vid ombyggnad — anlita en erfaren byggledare'],
    audioUrl: '/audio/byggherren.mp3',
  },
  {
    id: 'skatteverket', label: 'Skatteverket', emoji: '💰', color: '#F59E0B',
    x: 18, y: 55,
    description: 'Skatteverket hanterar föreningens skattedeklarationer, moms och arbetsgivaravgifter om personal finns. Fastighetsavgift och eventuella skattereduktioner hanteras här.',
    relation: 'Skattemyndighet – deklarera i tid för att undvika böter.',
    tips: ['Deklarera i tid — förseningsavgifter kan bli höga', 'Moms gäller på lokalhyror om föreningen är momsregistrerad', 'Skattereduktion för solceller söks via Skatteverket'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'bokforingsnamnden', label: 'Bokföringsnämnden', emoji: '📊', color: '#14B8A6',
    x: 50, y: 92,
    description: 'Bokföringsnämnden (BFN) utfärdar normgivning för redovisning. Det är BFN som beslutat att BRF:er ska byta från K2 till K3 för räkenskapsår efter 2025.',
    relation: 'Normgivare – K3-övergången 2026 kräver förberedelse nu.',
    tips: ['K3-övergången 2026 kräver förberedelse nu', 'Kontakta er revisor om K3-anpassningen', 'BFN:s vägledningar finns gratis på deras webbplats'],
    audioUrl: '/audio/k3.mp3',
  },
];

// ─────────────────────────────────────────────
// MODAL med auto-play ljud
// ─────────────────────────────────────────────
const PartModal = ({ part, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto-play när modal öppnas
    const audio = new Audio(part.audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => {});
    document.body.style.overflow = 'hidden';

    return () => {
      // Stoppa när modal stängs
      audio.pause();
      audio.currentTime = 0;
      document.body.style.overflow = 'unset';
    };
  }, [part.audioUrl]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
        onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        className="fixed z-50"
        style={{
          top: 'var(--header-height, 60px)', left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div className="w-full max-w-md max-h-full flex flex-col rounded-3xl overflow-hidden"
          style={{ background: '#0f1623', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>

          {/* Header med färg från intressenten */}
          <div className="relative flex-shrink-0 h-32"
            style={{ background: `linear-gradient(135deg, ${part.color}40, ${part.color}15)` }}>
            <div className="absolute inset-0 flex items-center px-6 gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: `${part.color}25`, border: `2px solid ${part.color}50` }}>
                {part.emoji}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: part.color }}>Föreningens intressent</p>
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {part.label}
                </h3>
              </div>
            </div>
            <button onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ background: 'rgba(0,0,0,0.3)' }}>
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

            {/* Beskrivning */}
            <p className="text-white/75 text-sm leading-relaxed">{part.description}</p>

            {/* Relation-badge */}
            <div className="rounded-2xl px-4 py-3 border-l-4"
              style={{ borderColor: part.color, background: `${part.color}12` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: part.color }}>
                Relation till föreningen
              </p>
              <p className="text-white/80 text-sm">{part.relation}</p>
            </div>

            {/* Styrelsens ansvar */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/35">
                Styrelsens ansvar
              </p>
              <ul className="space-y-2.5">
                {part.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: part.color }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-2" />
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
    style={{ left: `${part.x}%`, top: `${part.y}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {!isVisited && (
      <motion.div className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 22, height: 22, top: -3, left: -3, background: part.color, borderRadius: '50%' }} />
    )}
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: isVisited ? part.color : `${part.color}dd`,
      border: '2.5px solid rgba(255,255,255,0.85)',
      boxShadow: `0 0 16px ${part.color}90, 0 2px 8px rgba(0,0,0,0.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 800, color: '#fff', position: 'relative',
    }}>
      {isVisited ? '✓' : '+'}
    </div>
    <div style={{
      position: 'absolute', top: '50%', left: 'calc(100% + 8px)',
      transform: 'translateY(-50%)', whiteSpace: 'nowrap',
      background: 'rgba(10,15,28,0.92)', backdropFilter: 'blur(8px)',
      border: `1px solid ${part.color}50`, borderRadius: 8,
      padding: '4px 10px', fontSize: 11, fontWeight: 700,
      color: isVisited ? part.color : 'rgba(255,255,255,0.85)',
      pointerEvents: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    }}>
      {part.label}
    </div>
  </motion.button>
);

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
const IntressenterSection = ({ isCompleted, onComplete }) => {
  const [activePart, setActivePart] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set());

  const handleClick = (part) => {
    setActivePart(part);
    setVisitedIds(prev => new Set([...prev, part.id]));
  };

  const handleClose = () => setActivePart(null);

  const allVisited = visitedIds.size >= BUILDING_PARTS.length;

  return (
    <section className="min-h-screen relative py-12"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)', paddingTop: 'calc(var(--header-height, 60px) + 0.5rem)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,84,33,0.04) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Föreningens <span style={{ color: O }}>intressenter</span>
          </h2>
          <p className="text-white/45 text-sm">
            Klicka på varje punkt för att lära dig om relationen till föreningen
          </p>
        </motion.div>

        {/* Bild med hotspots – centrerad */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <div className="relative rounded-2xl overflow-visible">
            <img
  src="/images/hus.png"
  alt="Flerfamiljshus med intressenter"
  className="w-full h-auto"
  style={{
    borderRadius: 16,
    display: 'block',
    maxHeight: '65vh',
    objectFit: 'contain',
  }}
/>
            {BUILDING_PARTS.map(part => (
              <Hotspot key={part.id} part={part}
                isVisited={visitedIds.has(part.id)} onClick={handleClick} />
            ))}
          </div>
        </motion.div>

       

        
      </div>

      <AnimatePresence>
        {activePart && <PartModal part={activePart} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
};

export default IntressenterSection;
