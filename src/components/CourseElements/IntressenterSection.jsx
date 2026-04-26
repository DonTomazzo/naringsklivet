// src/components/CourseElements/IntressenterSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O = '#FF5421';

// ─────────────────────────────────────────────
// DATA
// Alla intressenter använder samma orange (#FF5421) — ingen färgvariation
// Bilderna är valda från Unsplash, redaktionella och professionella
// ─────────────────────────────────────────────
const BUILDING_PARTS = [
  {
    id: 'forvaltaren', label: 'Förvaltaren',
    kategori: 'Extern part',
    x: 62, y: 8,
    bild: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Förvaltaren sköter den dagliga driften av fastigheten på styrelsens uppdrag. De hanterar allt från fakturor och bokföring till felanmälningar och leverantörskontakter.',
    relation: 'Uppdragstagare – styrelsen är alltid ytterst ansvarig.',
    tips: ['Kräv månadsrapporter med budgetuppföljning', 'Biträdesavtal enligt GDPR krävs', 'Styrelsen kan inte delegera bort sitt juridiska ansvar'],
    audioUrl: '/audio/forvaltaren.mp3',
  },
  {
    id: 'myndigheter', label: 'Myndigheter',
    kategori: 'Tillsynsorgan',
    x: 38, y: 8,
    bild: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80',
    description: 'Styrelsen har kontakt med flera myndigheter. Bolagsverket hanterar registrering av styrelseändringar. IMY granskar GDPR-efterlevnad. Skatteverket hanterar skattefrågor.',
    relation: 'Tillsynsorgan – ni rapporterar till och granskas av dem.',
    tips: ['Anmäl nya styrelseledamöter till Bolagsverket direkt', 'Energideklaration måste uppdateras vart 10:e år', 'IMY kan granska er GDPR-hantering'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'fastighetsskotare', label: 'Fastighetsskötare',
    kategori: 'Anställd / Uppdragstagare',
    x: 78, y: 18,
    bild: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    description: 'Fastighetsskötaren utför det praktiska underhållet av fastigheten — sophantering, snöröjning, felavhjälpning och tillsyn. Kan vara anställd av föreningen eller via förvaltaren.',
    relation: 'Anställd eller uppdragstagare – tydlig ansvarsfördelning krävs.',
    tips: ['Klargör ansvarsfördelning mellan förvaltare och fastighetsskötare', 'Skriftliga rutiner för felanmälan', 'F-skattsedel krävs om uppdragstagare anlitas'],
    audioUrl: '/audio/fastighetsskotaren.mp3',
  },
  {
    id: 'forsakringsbolag', label: 'Försäkringsbolag',
    kategori: 'Avtalspart',
    x: 15, y: 22,
    bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    description: 'Föreningen ska ha en fastighetsförsäkring som täcker byggnaden och gemensamma utrymmen. Styrelsen ansvarar för att försäkringen är aktuell och att skador anmäls korrekt.',
    relation: 'Avtalsparter – jämför villkor och premie regelbundet.',
    tips: ['Jämför minst 3 offerter vid omförhandling', 'Styrelseansvarsförsäkring är viktig', 'Dokumentera alla skador noga'],
    audioUrl: '/audio/forsakring.mp3',
  },
  {
    id: 'maklare', label: 'Mäklare',
    kategori: 'Extern part',
    x: 80, y: 35,
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    description: 'Mäklaren förmedlar bostadsrätter och kontaktar föreningen vid överlåtelser. Styrelsen ansvarar för att godkänna nya medlemmar och utfärda pantbrevsinformation.',
    relation: 'Extern part – kontakt vid varje överlåtelse.',
    tips: ['Svara på mäklarförfrågningar inom rimlig tid', 'Ekonomisk plan och årsredovisning ska tillhandahållas', 'Styrelsen godkänner — inte mäklaren — nya medlemmar'],
    audioUrl: '/audio/maklaren-1.mp3',
  },
  {
    id: 'boverket', label: 'Boverket',
    kategori: 'Normgivande myndighet',
    x: 80, y: 50,
    bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    description: 'Boverket är den statliga myndigheten för samhällsplanering, byggande och boende. De utfärdar föreskrifter och allmänna råd som gäller för bostadsrättsföreningars fastigheter.',
    relation: 'Normgivande myndighet – regler vid renovering och energi.',
    tips: ['Kontrollera Boverkets krav vid renovering', 'Energideklaration regleras av Boverket', 'PBL styr bygglov och detaljplaner'],
    audioUrl: '/audio/boverket.mp3',
  },
  {
    id: 'bolagsverket', label: 'Bolagsverket',
    kategori: 'Registermyndighet',
    x: 80, y: 62,
    bild: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    description: 'Bolagsverket registrerar föreningens styrelse och stadgeändringar. Nya styrelseledamöter och firmatecknare måste anmälas hit. Registreringsbeviset används vid avtal och bankärenden.',
    relation: 'Registermyndighet – anmäl ändringar inom 4 veckor.',
    tips: ['Anmäl inom 4 veckor efter konstituerande möte', 'Registreringsbevis ska vara max 1 år gammalt', 'Stadgeändringar måste registreras för att gälla'],
    audioUrl: '/audio/bolagsverket.mp3',
  },
  {
    id: 'hyresnamnden', label: 'Hyresnämnd',
    kategori: 'Tvistlösningsorgan',
    x: 80, y: 75,
    bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    description: 'Hyresnämnden prövar tvister mellan bostadsrättshavare och föreningen — t.ex. vid nekad andrahandsuthyrning. Beslut kan inte överklagas.',
    relation: 'Tvistlösningsorgan – gratis prövning, bindande beslut.',
    tips: ['Motivera alltid avslag på andrahandsuthyrning skriftligt', 'Hyresnämndens beslut är bindande', 'Anlita jurist vid komplicerade tvister'],
    audioUrl: '/audio/hyresnamnden.mp3',
  },
  {
    id: 'revisorer', label: 'Revisorer',
    kategori: 'Granskningsorgan',
    x: 80, y: 87,
    bild: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    description: 'Revisorn väljs av föreningsstämman och granskar styrelsens förvaltning och räkenskaper. Revisorn är medlemmarnas företrädare — inte styrelsens.',
    relation: 'Granskningsorgan – vald av stämman, rapporterar till stämman.',
    tips: ['Revisorn ska inte delta i styrelsearbetet', 'Revisionsberättelsen presenteras på stämman', 'En auktoriserad revisor kan krävas beroende på föreningens storlek'],
    audioUrl: '/audio/revisorn.mp3',
  },
  {
    id: 'leverantorer', label: 'Leverantörer',
    kategori: 'Avtalspart',
    x: 15, y: 65,
    bild: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    description: 'Föreningen anlitar leverantörer för allt från sophantering och städning till el, bredband och underhåll. Styrelsen ansvarar för att avtal är korrekta och att upphandling sker affärsmässigt.',
    relation: 'Avtalsparter – upphandla strukturerat och dokumenterat.',
    tips: ['Ta alltid in minst 3 offerter vid större upphandlingar', 'Biträdesavtal krävs om leverantören hanterar personuppgifter', 'Kontrollera F-skattsedel'],
    audioUrl: '/audio/leverantorer.mp3',
  },
  {
    id: 'bank', label: 'Bank',
    kategori: 'Kreditgivare',
    x: 15, y: 78,
    bild: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80',
    description: 'Banken hanterar föreningens lån, konton och betalningar. Styrelsen ansvarar för att låneavtal är fördelaktiga och att räntebindning är genomtänkt.',
    relation: 'Kreditgivare – räntekostnaden är ofta föreningens största utgift.',
    tips: ['Jämför alltid räntor mellan banker vid omläggning', 'Sprid räntebindningen för att minska ränterisk', 'Banken kräver registreringsbevis och årsredovisning'],
    audioUrl: '/audio/banken-1.mp3',
  },
  {
    id: 'grannar', label: 'Grannar',
    kategori: 'Grannrelation',
    x: 38, y: 92,
    bild: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    description: 'Grannfastigheter och grannar påverkar och påverkas av föreningen. Gränsfrågor, buller, dagvatten och gemensamma vägar kan skapa konflikter som styrelsen behöver hantera.',
    relation: 'Grannrelation – dokumentera överenskommelser skriftligt.',
    tips: ['Upprätta skriftliga avtal vid gemensamma ledningar', 'Ta upp grannkonflikter tidigt', 'Kommunen kan medla i gränstvister'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'lagstiftaren', label: 'Lagstiftaren',
    kategori: 'Regelgivare',
    x: 62, y: 92,
    bild: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80',
    description: 'Riksdagen och EU stiftar de lagar som styr bostadsrättsföreningar — bostadsrättslagen, lagen om ekonomiska föreningar, GDPR, plan- och bygglagen med flera.',
    relation: 'Regelgivare – håll koll på lagändringar som påverkar BRF.',
    tips: ['Prenumerera på nyhetsbrev från branschorganisationer', 'K3-övergången 2026 är en viktig lagändring', 'GDPR uppdateras löpande av EU'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'byggherre', label: 'Byggherre',
    kategori: 'Ursprungspart',
    x: 22, y: 42,
    bild: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    description: 'Byggherren är den som uppförde fastigheten. Vid nyare hus kan garantier och ansvar för byggfel fortfarande gälla. Vid ombyggnad är föreningen själv byggherre.',
    relation: 'Ursprungspart – kontrollera garantitider för nybyggda fastigheter.',
    tips: ['Kontrollera garantitider för nybyggda fastigheter', 'Anmäl byggfel skriftligt inom garantitiden', 'Vid ombyggnad — anlita en erfaren byggledare'],
    audioUrl: '/audio/byggherren.mp3',
  },
  {
    id: 'skatteverket', label: 'Skatteverket',
    kategori: 'Skattemyndighet',
    x: 18, y: 55,
    bild: 'https://images.unsplash.com/photo-1554224154-26032cdc0b11?w=800&q=80',
    description: 'Skatteverket hanterar föreningens skattedeklarationer, moms och arbetsgivaravgifter om personal finns. Fastighetsavgift och eventuella skattereduktioner hanteras här.',
    relation: 'Skattemyndighet – deklarera i tid för att undvika böter.',
    tips: ['Deklarera i tid — förseningsavgifter kan bli höga', 'Moms gäller på lokalhyror om föreningen är momsregistrerad', 'Skattereduktion för solceller söks via Skatteverket'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'bokforingsnamnden', label: 'Bokföringsnämnden',
    kategori: 'Normgivare',
    x: 50, y: 92,
    bild: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    description: 'Bokföringsnämnden (BFN) utfärdar normgivning för redovisning. Det är BFN som beslutat att BRF:er ska byta från K2 till K3 för räkenskapsår efter 2025.',
    relation: 'Normgivare – K3-övergången 2026 kräver förberedelse nu.',
    tips: ['K3-övergången 2026 kräver förberedelse nu', 'Kontakta er revisor om K3-anpassningen', 'BFN:s vägledningar finns gratis på deras webbplats'],
    audioUrl: '/audio/k3.mp3',
  },
];

// ─────────────────────────────────────────────
// MODAL — ljus, redaktionell, professionell
// ─────────────────────────────────────────────
const PartModal = ({ part, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(part.audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => {});
    document.body.style.overflow = 'hidden';

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.body.style.overflow = 'unset';
    };
  }, [part.audioUrl]);

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(15,22,35,0.85)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      {/* Modal-container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        className="fixed z-50"
        style={{
          top: 'var(--header-height, 60px)',
          left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <div
          className="w-full max-w-4xl max-h-full flex flex-col lg:flex-row overflow-hidden"
          style={{
            background: '#FAFAF8',
            borderRadius: 20,
            boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
          }}
        >
          {/* ── VÄNSTER: Bild ──────────────────────────── */}
          <div
            className="relative flex-shrink-0 lg:w-[42%]"
            style={{
              minHeight: 220,
              background: '#f0ede8',
            }}
          >
            <img
              src={part.bild}
              alt={part.label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtil overlay för att hålla tonen konsekvent */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, rgba(255,84,33,0.08), rgba(15,22,35,0.15))`,
              }}
            />
          </div>

          {/* ── HÖGER: Innehåll ───────────────────────── */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Close-knapp absolut positionerad */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              aria-label="Stäng"
            >
              <X size={16} style={{ color: '#1a1a1a' }} />
            </button>

            {/* Scrollbart innehåll */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: '36px 40px' }}
            >
              {/* Eyebrow */}
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: O,
                  marginBottom: 14,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {part.kategori}
              </p>

              {/* Rubrik */}
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: '#1a1a1a',
                  lineHeight: 1.15,
                  margin: '0 0 18px',
                  fontFamily: "'Nunito', sans-serif",
                  letterSpacing: '-0.01em',
                }}
              >
                {part.label}
              </h2>

              {/* Beskrivning */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: '#4a4a4a',
                  marginBottom: 24,
                }}
              >
                {part.description}
              </p>

              {/* Separator */}
              <div
                style={{
                  height: 1,
                  background: 'rgba(0,0,0,0.08)',
                  marginBottom: 22,
                }}
              />

              {/* Relation */}
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: O,
                  marginBottom: 8,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Relation till föreningen
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#1a1a1a',
                  fontWeight: 600,
                  marginBottom: 26,
                }}
              >
                {part.relation}
              </p>

              {/* Styrelsens ansvar */}
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: O,
                  marginBottom: 14,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Styrelsens ansvar
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {part.tips.map((tip, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    {/* Orange cirkel — tunn outline */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `1.5px solid ${O}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: O,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: '#4a4a4a',
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>

              <div style={{ height: 12 }} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─────────────────────────────────────────────
// HOTSPOT — alltid orange, ingen färgvariation
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
        style={{ width: 22, height: 22, top: -3, left: -3, background: O, borderRadius: '50%' }} />
    )}
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: isVisited ? O : `${O}dd`,
      border: '2.5px solid rgba(255,255,255,0.9)',
      boxShadow: `0 0 16px ${O}90, 0 2px 8px rgba(0,0,0,0.4)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 800, color: '#fff', position: 'relative',
    }}>
      {isVisited ? '✓' : '+'}
    </div>
    <div style={{
      position: 'absolute', top: '50%', left: 'calc(100% + 8px)',
      transform: 'translateY(-50%)', whiteSpace: 'nowrap',
      background: 'rgba(10,15,28,0.92)', backdropFilter: 'blur(8px)',
      border: `1px solid ${O}50`, borderRadius: 8,
      padding: '4px 10px', fontSize: 11, fontWeight: 700,
      color: isVisited ? O : 'rgba(255,255,255,0.9)',
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
  const introAudioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/intressenter.mp3');
    introAudioRef.current = audio;

    const startTimer = setTimeout(() => {
      audio.play().catch(() => {});
    }, 1000);

    return () => {
      clearTimeout(startTimer);
      if (introAudioRef.current) {
        introAudioRef.current.pause();
        introAudioRef.current.currentTime = 0;
        introAudioRef.current = null;
      }
    };
  }, []);

  const handleClick = (part) => {
    if (introAudioRef.current) {
      introAudioRef.current.pause();
      introAudioRef.current.currentTime = 0;
    }
    setActivePart(part);
    setVisitedIds(prev => new Set([...prev, part.id]));
  };

  const handleClose = () => setActivePart(null);

  return (
    <section className="min-h-screen relative py-12"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)', paddingTop: 'calc(var(--header-height, 60px) + 0.5rem)' }}>

      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,84,33,0.04) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">

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