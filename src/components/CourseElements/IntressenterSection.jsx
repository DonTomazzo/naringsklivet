// src/components/CourseElements/IntressenterSection.jsx
// Komplett omskrivning med broschyrens designspråk:
// — Blob-bakgrund i navy/navy2/navy3
// — Cream/sand hotspot-etiketter istället för svarta boxar
// — Modal med eyebrow + rubrik + ingress-hierarki
// — SnabbfaktaRemsa i modalbotten med sand-variant
// — Titel med eyebrow ovanför

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O     = '#FF5421';
const OD    = '#E04619';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const NAVY3 = '#2a3f55';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';

const BUILDING_PARTS = [
  {
    id: 'forvaltaren', label: 'Förvaltaren',
    kategori: 'Extern part',
    x: 62, y: 8,
    bild: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Förvaltaren sköter den dagliga driften av fastigheten på styrelsens uppdrag. De hanterar allt från fakturor och bokföring till felanmälningar och leverantörskontakter.',
    relation: 'Uppdragstagare – styrelsen är alltid ytterst ansvarig.',
    fakta: [{ etikett: 'Roll', värde: 'Uppdragstagare' }, { etikett: 'Avtal', värde: 'Förvaltningsavtal' }, { etikett: 'GDPR', värde: 'Biträdesavtal krävs' }],
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
    fakta: [{ etikett: 'Nyckelorgan', värde: 'IMY, SKV, BV' }, { etikett: 'Granskning', värde: 'Löpande' }],
    tips: ['Anmäl nya styrelseledamöter till Bolagsverket direkt', 'Energideklaration måste uppdateras vart 10:e år', 'IMY kan granska er GDPR-hantering'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'fastighetsskotare', label: 'Fastighetsskötare',
    kategori: 'Anställd / Uppdragstagare',
    x: 78, y: 18,
    bild: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    description: 'Fastighetsskötaren utför det praktiska underhållet av fastigheten — sophantering, snöröjning, felavhjälpning och tillsyn.',
    relation: 'Anställd eller uppdragstagare – tydlig ansvarsfördelning krävs.',
    fakta: [{ etikett: 'Typ', värde: 'Anställd/Uppdr.' }, { etikett: 'Skatt', värde: 'F-skattsedel' }],
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
    fakta: [{ etikett: 'Krav', värde: 'Fastighetsförs.' }, { etikett: 'Extra', värde: 'Styrelseansvar' }],
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
    fakta: [{ etikett: 'Kontakt', värde: 'Vid överlåtelse' }, { etikett: 'Svarstid', värde: 'Rimlig tid' }],
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
    fakta: [{ etikett: 'Lag', värde: 'PBL' }, { etikett: 'Energiintyg', värde: 'Vart 10:e år' }],
    tips: ['Kontrollera Boverkets krav vid renovering', 'Energideklaration regleras av Boverket', 'PBL styr bygglov och detaljplaner'],
    audioUrl: '/audio/boverket.mp3',
  },
  {
    id: 'bolagsverket', label: 'Bolagsverket',
    kategori: 'Registermyndighet',
    x: 80, y: 62,
    bild: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
    description: 'Bolagsverket registrerar föreningens styrelse och stadgeändringar. Nya styrelseledamöter och firmatecknare måste anmälas hit.',
    relation: 'Registermyndighet – anmäl ändringar inom 4 veckor.',
    fakta: [{ etikett: 'Frist', värde: '4 veckor' }, { etikett: 'Bevis', värde: 'Max 1 år gammalt' }],
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
    fakta: [{ etikett: 'Kostnad', värde: 'Gratis' }, { etikett: 'Beslut', värde: 'Bindande' }],
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
    fakta: [{ etikett: 'Vald av', värde: 'Stämman' }, { etikett: 'Rapporterar', värde: 'Till stämman' }],
    tips: ['Revisorn ska inte delta i styrelsearbetet', 'Revisionsberättelsen presenteras på stämman', 'En auktoriserad revisor kan krävas beroende på föreningens storlek'],
    audioUrl: '/audio/revisorn.mp3',
  },
  {
    id: 'leverantorer', label: 'Leverantörer',
    kategori: 'Avtalspart',
    x: 15, y: 65,
    bild: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    description: 'Föreningen anlitar leverantörer för allt från sophantering och städning till el, bredband och underhåll.',
    relation: 'Avtalsparter – upphandla strukturerat och dokumenterat.',
    fakta: [{ etikett: 'Offerter', värde: 'Min 3 st' }, { etikett: 'GDPR', värde: 'Biträdesavtal' }],
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
    fakta: [{ etikett: 'Risk', värde: 'Räntebindning' }, { etikett: 'Krav', värde: 'Årsredovisning' }],
    tips: ['Jämför alltid räntor mellan banker vid omläggning', 'Sprid räntebindningen för att minska ränterisk', 'Banken kräver registreringsbevis och årsredovisning'],
    audioUrl: '/audio/banken-1.mp3',
  },
  {
    id: 'grannar', label: 'Grannar',
    kategori: 'Grannrelation',
    x: 38, y: 92,
    bild: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    description: 'Grannfastigheter och grannar påverkar och påverkas av föreningen. Gränsfrågor, buller, dagvatten och gemensamma vägar kan skapa konflikter.',
    relation: 'Grannrelation – dokumentera överenskommelser skriftligt.',
    fakta: [{ etikett: 'Vanligt', värde: 'Gränstvister' }, { etikett: 'Lösning', värde: 'Skriftliga avtal' }],
    tips: ['Upprätta skriftliga avtal vid gemensamma ledningar', 'Ta upp grannkonflikter tidigt', 'Kommunen kan medla i gränstvister'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'lagstiftaren', label: 'Lagstiftaren',
    kategori: 'Regelgivare',
    x: 62, y: 92,
    bild: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80',
    description: 'Riksdagen och EU stiftar de lagar som styr bostadsrättsföreningar — bostadsrättslagen, LEF, GDPR, PBL med flera.',
    relation: 'Regelgivare – håll koll på lagändringar som påverkar BRF.',
    fakta: [{ etikett: 'Lagar', värde: 'BRL, LEF, GDPR' }, { etikett: 'Nästa', värde: 'K3 2026' }],
    tips: ['Prenumerera på nyhetsbrev från branschorganisationer', 'K3-övergången 2026 är en viktig lagändring', 'GDPR uppdateras löpande av EU'],
    audioUrl: '/audio/k3.mp3',
  },
  {
    id: 'byggherre', label: 'Byggherre',
    kategori: 'Ursprungspart',
    x: 22, y: 42,
    bild: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    description: 'Byggherren är den som uppförde fastigheten. Vid nyare hus kan garantier och ansvar för byggfel fortfarande gälla.',
    relation: 'Ursprungspart – kontrollera garantitider för nybyggda fastigheter.',
    fakta: [{ etikett: 'Garanti', värde: 'Kontrollera' }, { etikett: 'Anmälan', värde: 'Skriftligt' }],
    tips: ['Kontrollera garantitider för nybyggda fastigheter', 'Anmäl byggfel skriftligt inom garantitiden', 'Vid ombyggnad — anlita en erfaren byggledare'],
    audioUrl: '/audio/byggherren.mp3',
  },
  {
    id: 'skatteverket', label: 'Skatteverket',
    kategori: 'Skattemyndighet',
    x: 18, y: 55,
    bild: 'https://images.unsplash.com/photo-1554224154-26032cdc0b11?w=800&q=80',
    description: 'Skatteverket hanterar föreningens skattedeklarationer, moms och arbetsgivaravgifter om personal finns.',
    relation: 'Skattemyndighet – deklarera i tid för att undvika böter.',
    fakta: [{ etikett: 'Risk', värde: 'Förseningsavg.' }, { etikett: 'Moms', värde: 'Vid lokalhyra' }],
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
    fakta: [{ etikett: 'Beslut', värde: 'K3 från 2026' }, { etikett: 'Källa', värde: 'BFN.se' }],
    tips: ['K3-övergången 2026 kräver förberedelse nu', 'Kontakta er revisor om K3-anpassningen', 'BFN:s vägledningar finns gratis på deras webbplats'],
    audioUrl: '/audio/k3.mp3',
  },
];

// ─── Modal ────────────────────────────────────────────────
const PartModal = ({ part, onClose }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(part.audioUrl);
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => { audio.pause(); audio.currentTime = 0; };
  }, [part.audioUrl]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,24,0.88)', backdropFilter: 'blur(7px)', zIndex: 50 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'fixed',
          top: 'var(--header-height, 60px)',
          left: 0, right: 0, bottom: 0,
          zIndex: 51,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16,
        }}
      >
        <div style={{
          width: '100%', maxWidth: 860,
          maxHeight: '100%',
          display: 'flex', flexDirection: 'column',
          background: '#FAFAF8',
          borderRadius: 20,
          boxShadow: '0 40px 80px rgba(0,0,0,0.40)',
          overflow: 'hidden',
        }}>
          {/* ── Topp: bild + navy-overlay med rubrik ── */}
          <div style={{ position: 'relative', flexShrink: 0, height: 220 }} className="sm:h-56 md:h-64">
            <img src={part.bild} alt={part.label}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.50)' }} />

            {/* SVG-blobbar i modalen */}
            <svg style={{ position: 'absolute', top: -20, right: -30, width: 200, height: 185, opacity: 0.70, zIndex: 1 }} viewBox="0 0 200 185">
              <path d="M105,16 C140,3 182,32 175,82 C168,132 130,165 87,158 C44,151 6,114 13,66 C20,18 70,29 105,16Z" fill={NAVY2}/>
            </svg>
            <svg style={{ position: 'absolute', top: 30, right: 55, width: 80, height: 74, opacity: 0.90, zIndex: 2 }} viewBox="0 0 80 74">
              <path d="M42,6 C58,1 74,16 70,38 C66,60 50,72 32,67 C14,62 2,44 8,24 C14,4 26,11 42,6Z" fill={O}/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 15%, #FAFAF8 100%)', zIndex: 3 }} />

            {/* Stäng */}
            <button onClick={onClose} style={{
              position: 'absolute', top: 14, right: 14, zIndex: 10,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}>
              <X size={15} style={{ color: NAVY }} />
            </button>

            {/* Eyebrow + rubrik i bild */}
            <div style={{ position: 'absolute', bottom: 20, left: 32, right: 60, zIndex: 5 }}>
              <p style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: O,
                fontFamily: 'monospace', margin: '0 0 6px',
              }}>
                {part.kategori}
              </p>
              <h2 style={{
                fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900,
                color: NAVY, lineHeight: 1.1,
                fontFamily: "'Nunito', sans-serif", margin: 0,
              }}>
                {part.label}
              </h2>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Beskrivning */}
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: '#4a4a4a', lineHeight: 1.75,
              fontFamily: "'Nunito', sans-serif", margin: 0,
            }}>
              {part.description}
            </p>

            {/* Relation */}
            <div style={{
              padding: '14px 18px', borderRadius: 12,
              background: CREAM, border: `1px solid ${SAND2}`,
              borderLeft: `4px solid ${O}`,
            }}>
              <p style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: O,
                fontFamily: 'monospace', margin: '0 0 6px',
              }}>
                Relation till föreningen
              </p>
              <p style={{
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: NAVY, fontWeight: 600,
                lineHeight: 1.6, margin: 0,
                fontFamily: "'Nunito', sans-serif",
              }}>
                {part.relation}
              </p>
            </div>

            {/* Styrelsens ansvar */}
            <div>
              <p style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: O,
                fontFamily: 'monospace', margin: '0 0 12px',
              }}>
                Styrelsens ansvar
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {part.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                      border: `1.5px solid ${O}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: 1,
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O }} />
                    </div>
                    <p style={{
                      fontSize: 'clamp(13px, 1.4vw, 15px)',
                      color: '#4a4a4a', lineHeight: 1.6,
                      fontFamily: "'Nunito', sans-serif", margin: 0,
                    }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Snabbfakta-remsa — sand-variant */}
            <div style={{
              borderRadius: 12, background: SAND,
              border: `1px solid ${SAND2}`, padding: '14px 18px',
            }}>
              <p style={{
                fontSize: 9, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: O,
                fontFamily: 'monospace', margin: '0 0 10px',
              }}>
                Snabbfakta
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${part.fakta.length}, 1fr)`,
                gap: 8,
              }}>
                {part.fakta.map((f, i) => (
                  <div key={i} style={{
                    borderLeft: i > 0 ? `1px solid ${SAND2}` : 'none',
                    paddingLeft: i > 0 ? 14 : 0,
                  }}>
                    <p style={{
                      fontSize: 9, fontWeight: 800, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: O,
                      fontFamily: 'monospace', margin: '0 0 3px',
                    }}>
                      {f.etikett}
                    </p>
                    <p style={{
                      fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 800,
                      color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0,
                    }}>
                      {f.värde}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─── Hotspot — cream-etikett ──────────────────────────────
const Hotspot = ({ part, isVisited, onClick }) => (
  <motion.button
    onClick={() => onClick(part)}
    style={{
      position: 'absolute',
      left: `${part.x}%`, top: `${part.y}%`,
      transform: 'translate(-50%, -50%)',
      zIndex: 20, background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    }}
    whileHover={{ scale: 1.18 }}
    whileTap={{ scale: 0.90 }}
  >
    {/* Puls-ring */}
    {!isVisited && (
      <motion.div
        animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 22, height: 22,
          top: -3, left: -3, borderRadius: '50%',
          background: O, pointerEvents: 'none',
        }}
      />
    )}

    {/* Nod */}
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: isVisited ? OD : O,
      border: '2.5px solid rgba(255,255,255,0.92)',
      boxShadow: `0 0 18px ${O}88, 0 2px 8px rgba(0,0,0,0.35)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 900, color: '#fff',
      position: 'relative',
    }}>
      {isVisited ? '✓' : '+'}
    </div>

    {/* Cream-etikett */}
    <div style={{
      position: 'absolute', top: '50%', left: 'calc(100% + 8px)',
      transform: 'translateY(-50%)', whiteSpace: 'nowrap',
      background: CREAM,
      border: `1px solid ${SAND2}`,
      borderRadius: 8, padding: '4px 10px',
      fontSize: 11, fontWeight: 700,
      color: isVisited ? O : NAVY,
      pointerEvents: 'none',
      boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    }}>
      {part.label}
    </div>
  </motion.button>
);

// ─── Huvud-komponent ──────────────────────────────────────
const IntressenterSection = ({ isCompleted, onComplete }) => {
  const [activePart, setActivePart]   = useState(null);
  const [visitedIds, setVisitedIds]   = useState(new Set());
  const introAudioRef                 = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/intressenter.mp3');
    introAudioRef.current = audio;
    const t = setTimeout(() => audio.play().catch(() => {}), 1000);
    return () => {
      clearTimeout(t);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleClick = (part) => {
    introAudioRef.current?.pause();
    setActivePart(part);
    setVisitedIds(prev => new Set([...prev, part.id]));
  };

  const allVisited = visitedIds.size >= BUILDING_PARTS.length;

  useEffect(() => {
    if (allVisited && onComplete) onComplete('intressenter');
  }, [allVisited]);

  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      paddingTop: 'calc(var(--header-height, 60px) + 8px)',
      paddingBottom: 48,
      background: NAVY,
      overflow: 'hidden',
    }}>

      {/* ── Blob-bakgrund ── */}
      <svg style={{ position: 'absolute', top: -60, right: -80, width: 480, height: 440, opacity: 0.75, pointerEvents: 'none' }} viewBox="0 0 480 440">
        <path d="M268,38 C348,12 448,72 434,178 C420,284 330,358 228,342 C126,326 46,242 68,142 C90,42 188,64 268,38Z" fill={NAVY2}/>
      </svg>
      <svg style={{ position: 'absolute', top: 60, right: 100, width: 140, height: 128, opacity: 0.88, pointerEvents: 'none' }} viewBox="0 0 140 128">
        <path d="M72,10 C98,2 126,22 120,58 C114,94 86,116 58,108 C30,100 8,72 16,40 C24,8 46,18 72,10Z" fill={O}/>
      </svg>
      <svg style={{ position: 'absolute', bottom: -40, left: -50, width: 340, height: 310, opacity: 0.68, pointerEvents: 'none' }} viewBox="0 0 340 310">
        <path d="M162,28 C220,8 298,52 288,138 C278,224 208,282 138,268 C68,254 12,186 28,106 C44,26 104,48 162,28Z" fill={NAVY3}/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 60, right: -20, width: 220, height: 200, opacity: 0.55, pointerEvents: 'none' }} viewBox="0 0 220 200">
        <path d="M108,18 C146,4 196,34 190,90 C184,146 142,182 96,174 C50,166 8,126 16,74 C24,22 70,32 108,18Z" fill={NAVY2}/>
      </svg>

      {/* Subtil orange glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(255,84,33,0.05) 0%, transparent 55%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 780, margin: '0 auto', padding: '0 16px' }}>

        {/* Titel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <p style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: O,
            fontFamily: 'monospace', margin: '0 0 10px',
          }}>
            Styrelsekörkortet · Modul 1
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
            color: '#fff', lineHeight: 1.08,
            fontFamily: "'Nunito', sans-serif", margin: '0 0 10px',
            letterSpacing: '-0.01em',
          }}>
            Föreningens <span style={{ color: O }}>intressenter</span>
          </h2>
          <p style={{
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: 'rgba(255,255,255,0.42)',
            fontFamily: "'Nunito', sans-serif",
            margin: 0,
          }}>
            Klicka på varje punkt för att lära dig om relationen till föreningen
          </p>

          {/* Progress */}
          {visitedIds.size > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: 10, fontSize: 12, fontWeight: 700,
                color: allVisited ? O : 'rgba(255,255,255,0.30)',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {allVisited
                ? '✓ Alla intressenter genomgångna'
                : `${visitedIds.size} av ${BUILDING_PARTS.length} genomgångna`}
            </motion.p>
          )}
        </motion.div>

        {/* Husbilden + hotspots */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ position: 'relative', borderRadius: 16, overflow: 'visible' }}
        >
          <img
            src="/images/hus.png"
            alt="Flerfamiljshus med intressenter"
            style={{
              width: '100%', height: 'auto', display: 'block',
              borderRadius: 16, maxHeight: '62vh', objectFit: 'contain',
            }}
          />
          {BUILDING_PARTS.map(part => (
            <Hotspot
              key={part.id}
              part={part}
              isVisited={visitedIds.has(part.id)}
              onClick={handleClick}
            />
          ))}
        </motion.div>

      </div>

      <AnimatePresence>
        {activePart && <PartModal part={activePart} onClose={() => setActivePart(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default IntressenterSection;