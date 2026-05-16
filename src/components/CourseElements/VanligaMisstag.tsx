// src/components/CourseElements/VanligaMisstag.tsx
// Interaktiv kortlek: 10 vanliga misstag i BRF-styrelsen
// Tinder-style swipe med audio + stack-visualisering
// Inspirerad av BiografEpokModal: större typografi, mer luft

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, AlertTriangle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { playAudio, stopAudio } from '../../utils/audioManager';

const O     = '#FF5421';
const OD    = '#E04619';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';

// ─── Data: 10 vanliga misstag ─────────────────────────────
const MISSTAG = [
  {
    id: 'underhallsplan',
    nr: '01',
    kategori: 'Ekonomi',
    titel: 'Glömmer uppdatera underhållsplanen',
    beskrivning: 'Styrelsen tar fram en underhållsplan när föreningen bildas — och rör den sedan aldrig igen. Åren går, fastigheten åldras, och planen blir snabbt inaktuell.',
    konsekvens: 'Plötsliga renoveringskostnader leder till avgiftschocker och missnöjda medlemmar.',
    losning: 'Uppdatera planen minst en gång per år. Ta in en besiktningsman vart femte år för en grundlig genomgång.',
    bild: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'protokoll-sent',
    nr: '02',
    kategori: 'Dokumentation',
    titel: 'Skriver protokoll veckor i efterhand',
    beskrivning: 'Mötet hålls, alla går hem, och sekreteraren tänker "jag skriver det imorgon". Sedan blir det nästa vecka, sedan månaden — och då minns ingen exakt vad som beslutades.',
    konsekvens: 'Otydliga eller felaktiga protokoll kan ogiltigförklara beslut och skapa konflikter.',
    losning: 'Skriv protokollet under eller direkt efter mötet. Justera inom en vecka.',
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'andrahand-godtyckligt',
    nr: '03',
    kategori: 'Juridik',
    titel: 'Nekar andrahandsuthyrning godtyckligt',
    beskrivning: 'Styrelsen tycker inte om idén med andrahandsuthyrning och nekar utan att motivera. Eller godkänner till några men nekar andra — utan saklig grund.',
    konsekvens: 'Bryter mot likhetsprincipen. Hyresnämnden kan överpröva, och föreningen kan bli skadeståndsskyldig.',
    losning: 'Behandla alla ansökningar lika. Beaktansvärda skäl (arbete, studier, vård) ska godkännas. Dokumentera alltid motivering.',
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'gdpr-personuppgifter',
    nr: '04',
    kategori: 'GDPR',
    titel: 'Delar personuppgifter utan grund',
    beskrivning: 'En ledamot skickar lägenhetsförteckningen till sin svåger som driver ett lokalt företag. Eller en lista över boende läggs ut på Facebook-gruppen.',
    konsekvens: 'GDPR-brott kan ge sanktionsavgifter upp till 4% av omsättningen. Föreningen är personuppgiftsansvarig.',
    losning: 'Personuppgifter får bara användas för föreningsändamål. Inga listor till tredje part — aldrig.',
    bild: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'utan-stamma',
    nr: '05',
    kategori: 'Juridik',
    titel: 'Tar stora beslut utan stämman',
    beskrivning: 'Styrelsen beslutar om en stor renovering, ett nytt lån eller en omfattande ombyggnad — utan att gå till stämman. "Det är ju vi som är valda."',
    konsekvens: 'Beslut som överskrider styrelsens befogenhet kan ogiltigförklaras. Ledamöter kan bli personligt skadeståndsskyldiga.',
    losning: 'Stora ekonomiska beslut, stadgeändringar och väsentliga renoveringar ska alltid till stämman.',
    bild: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'otydlig-rollfordelning',
    nr: '06',
    kategori: 'Styrelse',
    titel: 'Saknar tydlig rollfördelning',
    beskrivning: 'Alla i styrelsen "hjälper till" men ingen har formellt ansvar. När något akut händer vet ingen vem som ska agera. Arbetsbördan hamnar på ordföranden.',
    konsekvens: 'Beslut fastnar, ledamöter blir utbrända, viktiga frågor faller mellan stolarna.',
    losning: 'Dela upp ansvar redan första styrelsemötet. Ekonomi, fastighet, kommunikation, juridik — vem äger vad?',
    bild: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'underhallsfond',
    nr: '07',
    kategori: 'Ekonomi',
    titel: 'Avsätter för lite till underhållsfonden',
    beskrivning: 'För att hålla avgifterna låga avsätts minimalt — eller ingenting — till underhållsfonden. Det ser bra ut på årsredovisningen.',
    konsekvens: 'När taket eller stammarna behöver bytas finns inga pengar. Resultatet: tvångshöjning eller extralån med dålig ränta.',
    losning: 'Avsätt enligt underhållsplanens behov, inte enligt vad som "känns rimligt". Diskutera med revisorn.',
    bild: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'likhetsprincip',
    nr: '08',
    kategori: 'Juridik',
    titel: 'Behandlar medlemmar olika',
    beskrivning: 'Grannen som är kompis med ordföranden får tillstånd för altan. När någon annan ansöker om samma sak — neka. "Det är inte samma sak."',
    konsekvens: 'Bryter mot likhetsprincipen i bostadsrättslagen. Besluten kan ogiltigförklaras.',
    losning: 'Dokumentera tidigare beslut. Behandla lika situationer lika — oavsett vem som ansöker.',
    bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'overlamning',
    nr: '09',
    kategori: 'Styrelse',
    titel: 'Slarvar med styrelseöverlämning',
    beskrivning: 'Den gamla styrelsen lämnar över med en lös pärm, några mejl och "fråga om du undrar". Nyckelinformation försvinner när folk avgår.',
    konsekvens: 'Den nya styrelsen tappar månader på att förstå pågående ärenden. Avtal och underhåll faller mellan stolarna.',
    losning: 'Skriftlig överlämning som kvitteras. Digital pärm med alla aktiva ärenden, avtal, garantier och kontakter.',
    bild: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
  {
    id: 'arsredovisning-sent',
    nr: '10',
    kategori: 'Dokumentation',
    titel: 'Lämnar in årsredovisningen för sent',
    beskrivning: 'Årsredovisningen ska vara klar inom 6 månader efter räkenskapsårets slut och tillgänglig för medlemmar minst 1 vecka före stämman.',
    konsekvens: 'Stämman kan tvingas skjutas upp. Bolagsverket kan utfärda förseningsavgift. Föreningen ser oseriös ut för banker och mäklare.',
    losning: 'Planera in arbetet med revisorn redan i januari. Ha en hård deadline 5 månader efter räkenskapsårets slut.',
    bild: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
  },
];

// ─── Kortinnehåll ─────────────────────────────────────────
const KortInnehall: React.FC<{
  misstag: typeof MISSTAG[0];
  showAudioIndicator: boolean;
  dimmed?: boolean;
}> = ({ misstag, showAudioIndicator, dimmed }) => (
  <div style={{
    height: '100%',
    background: '#FAFAF8',
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: dimmed
      ? '0 6px 20px rgba(23,31,50,0.10)'
      : '0 24px 70px rgba(23,31,50,0.22)',
    border: `1px solid ${SAND2}`,
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Bild */}
    <div style={{ position: 'relative', flexShrink: 0, height: 220, minHeight: 180 }}>
      <img
        src={misstag.bild}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(23,31,50,0.15) 0%, rgba(23,31,50,0.65) 100%)',
      }} />

      {/* Orange blob i hörnet */}
      <svg style={{
        position: 'absolute', top: -25, right: -35,
        width: 160, height: 150, opacity: 0.65, zIndex: 1,
      }} viewBox="0 0 160 150">
        <path d="M88,14 C120,4 152,32 144,80 C136,128 104,142 68,134 C32,126 4,96 12,60 C20,24 56,24 88,14Z" fill={O}/>
      </svg>

      {/* Nummer + kategori uppe */}
      <div style={{
        position: 'absolute', top: 18, left: 22,
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 5, flexWrap: 'wrap',
      }}>
        <span style={{
          fontSize: 12, fontWeight: 800,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: O, background: 'rgba(250,250,248,0.96)',
          padding: '6px 14px', borderRadius: 24,
          fontFamily: 'monospace',
        }}>
          Misstag {misstag.nr} / 10
        </span>
        <span style={{
          fontSize: 11, fontWeight: 800,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: '#fff', background: 'rgba(255,255,255,0.18)',
          padding: '6px 12px', borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.30)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'monospace',
        }}>
          {misstag.kategori}
        </span>
      </div>

      {/* Audio-indikator */}
      {showAudioIndicator && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: 18, right: 18,
            width: 44, height: 44, borderRadius: '50%',
            background: O, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 6px 20px ${O}55`,
          }}>
          <Volume2 size={20} color="#fff" />
        </motion.div>
      )}

      {/* Titel */}
      <div style={{
        position: 'absolute', bottom: 18, left: 22, right: 80,
        zIndex: 5,
      }}>
        <h3 style={{
          fontSize: 'clamp(22px, 2.6vw, 30px)',
          fontWeight: 900, color: '#fff',
          lineHeight: 1.15, margin: 0,
          fontFamily: "'Nunito', sans-serif",
          textShadow: '0 2px 14px rgba(0,0,0,0.5)',
        }}>
          {misstag.titel}
        </h3>
      </div>
    </div>

    {/* Innehåll — scrollbart om långt */}
    <div style={{
      flex: 1, overflowY: 'auto',
      padding: '24px 28px 28px',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <p style={{
        fontSize: 'clamp(16px, 1.5vw, 18px)',
        color: '#2a2a2a', lineHeight: 1.7,
        margin: 0, fontFamily: "'Nunito', sans-serif",
      }}>
        {misstag.beskrivning}
      </p>

      {/* Konsekvens */}
      <div style={{
        borderRadius: 14,
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.20)',
        borderLeft: '4px solid #dc2626',
        padding: '16px 18px',
        display: 'flex', gap: 14,
      }}>
        <AlertTriangle size={20} style={{ color: '#dc2626', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#dc2626', fontFamily: 'monospace',
            margin: '0 0 6px',
          }}>
            Konsekvens
          </p>
          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 16px)',
            color: '#2a2a2a', lineHeight: 1.65,
            margin: 0, fontFamily: "'Nunito', sans-serif",
          }}>
            {misstag.konsekvens}
          </p>
        </div>
      </div>

      {/* Lösning */}
      <div style={{
        borderRadius: 14,
        background: SAND,
        border: `1px solid ${SAND2}`,
        borderLeft: `4px solid ${O}`,
        padding: '16px 18px',
        display: 'flex', gap: 14,
      }}>
        <CheckCircle2 size={20} style={{ color: O, flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: O, fontFamily: 'monospace',
            margin: '0 0 6px',
          }}>
            Gör så här istället
          </p>
          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 16px)',
            color: NAVY, lineHeight: 1.65,
            margin: 0, fontFamily: "'Nunito', sans-serif",
            fontWeight: 500,
          }}>
            {misstag.losning}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Stack-kort i bakgrunden ──────────────────────────────
const StackKort: React.FC<{
  misstag: typeof MISSTAG[0];
  position: number;
  side: 'left' | 'right';
}> = ({ misstag, position, side }) => {
  const offset = position * (side === 'left' ? -10 : 10);
  const rotation = position * (side === 'left' ? -3 : 3);
  const scaleFactor = 1 - position * 0.04;
  const opacityVal = Math.max(0.35, 1 - position * 0.25);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: opacityVal,
        x: offset,
        rotate: rotation,
        scale: scaleFactor,
      }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10 - position,
      }}
    >
      <KortInnehall misstag={misstag} showAudioIndicator={false} dimmed />
    </motion.div>
  );
};

// ─── Swipbart aktivt kort ────────────────────────────────
const AktivtKort: React.FC<{
  misstag: typeof MISSTAG[0];
  direction: number;
  onSwipe: (dir: number) => void;
}> = ({ misstag, direction, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);

  // Swipe-indikator-opacity baserat på drag
  const nextOpacity = useTransform(x, [-150, -50, 0], [1, 0, 0]);
  const prevOpacity = useTransform(x, [0, 50, 150], [0, 0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      onSwipe(1); // nästa
    } else if (offset > threshold || velocity > 500) {
      onSwipe(-1); // föregående
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      style={{
        x, rotate,
        position: 'absolute',
        inset: 0,
        cursor: 'grab',
        touchAction: 'pan-y',
        zIndex: 20,
      }}
      initial={{
        x: direction > 0 ? 500 : direction < 0 ? -500 : 0,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{
        x: direction > 0 ? -500 : 500,
        opacity: 0,
        scale: 0.9,
        rotate: direction > 0 ? -25 : 25,
        transition: { duration: 0.28 },
      }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      whileTap={{ cursor: 'grabbing' }}
    >
      {/* Swipe-indikatorer */}
      <motion.div
        style={{
          opacity: nextOpacity,
          position: 'absolute',
          top: 40, left: 30, zIndex: 50,
          padding: '10px 18px',
          borderRadius: 12,
          background: 'rgba(220,38,38,0.92)',
          color: '#fff',
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: 2,
          transform: 'rotate(-12deg)',
          border: '3px solid #fff',
          fontFamily: "'Nunito', sans-serif",
          pointerEvents: 'none',
        }}
      >
        NÄSTA →
      </motion.div>
      <motion.div
        style={{
          opacity: prevOpacity,
          position: 'absolute',
          top: 40, right: 30, zIndex: 50,
          padding: '10px 18px',
          borderRadius: 12,
          background: `rgba(255,84,33,0.92)`,
          color: '#fff',
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: 2,
          transform: 'rotate(12deg)',
          border: '3px solid #fff',
          fontFamily: "'Nunito', sans-serif",
          pointerEvents: 'none',
        }}
      >
        ← FÖREGÅENDE
      </motion.div>

      <KortInnehall misstag={misstag} showAudioIndicator />
    </motion.div>
  );
};

// ─── Klart-vy ─────────────────────────────────────────────
const KlartVy: React.FC<{ onOmstart: () => void }> = ({ onOmstart }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FAFAF8',
      borderRadius: 24,
      border: `1px solid ${SAND2}`,
      boxShadow: '0 24px 70px rgba(23,31,50,0.22)',
      padding: 40,
      textAlign: 'center',
    }}
  >
    <Sparkles size={56} style={{ color: O, marginBottom: 20 }} />
    <h3 style={{
      fontSize: 'clamp(26px, 3vw, 34px)',
      fontWeight: 900, color: NAVY,
      lineHeight: 1.1, margin: '0 0 14px',
      fontFamily: "'Nunito', sans-serif",
    }}>
      Bra jobbat!
    </h3>
    <p style={{
      fontSize: 'clamp(16px, 1.5vw, 18px)',
      color: MID, lineHeight: 1.6,
      maxWidth: 420, margin: '0 0 28px',
      fontFamily: "'Nunito', sans-serif",
    }}>
      Du har gått igenom alla 10 misstag. Använd kunskapen för att leda er styrelse rätt — och slippa lära er på det hårda sättet.
    </p>
    <motion.button
      onClick={onOmstart}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '14px 24px', borderRadius: 14,
        background: `linear-gradient(135deg, ${O}, ${OD})`,
        border: 'none',
        cursor: 'pointer',
        fontSize: 15, fontWeight: 800,
        color: '#fff',
        fontFamily: "'Nunito', sans-serif",
        boxShadow: `0 8px 24px ${O}50`,
      }}>
      <RotateCcw size={16} />
      Gå igenom igen
    </motion.button>
  </motion.div>
);

// ─── Huvudkomponent ───────────────────────────────────────
const VanligaMisstag: React.FC = () => {
  const [index, setIndex]         = useState(0);
  const [direction, setDirection] = useState(0);
  const [klart, setKlart]         = useState(false);
  const aktivt = MISSTAG[index];

  // Spela ljud när aktivt kort ändras
  useEffect(() => {
    if (klart || !aktivt?.audioSrc) return;
    playAudio(aktivt.audioSrc);
    return () => stopAudio();
  }, [aktivt?.id, aktivt?.audioSrc, klart]);

  const nästa = () => {
    if (index < MISSTAG.length - 1) {
      setDirection(1);
      setIndex(i => i + 1);
    } else {
      setKlart(true);
      stopAudio();
    }
  };

  const föregående = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(i => i - 1);
    }
  };

  const omstart = () => {
    setDirection(-1);
    setIndex(0);
    setKlart(false);
  };

  // Tangentbordsstöd
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (klart) return;
      if (e.key === 'ArrowRight') nästa();
      if (e.key === 'ArrowLeft')  föregående();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, klart]);

  return (
    <div style={{
      height: '100%',
      background: SAND,
      position: 'relative',
      overflowY: 'auto',
    }}>
      <div style={{
        padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Blob-bakgrund */}
        <svg style={{
          position: 'absolute', top: -40, right: -60,
          width: 340, height: 310, opacity: 0.55, pointerEvents: 'none',
        }} viewBox="0 0 340 310">
          <path d="M182,28 C242,8 318,54 306,142 C294,230 220,284 148,268 C76,252 14,182 32,104 C50,26 122,48 182,28Z" fill={SAND2}/>
        </svg>
        <svg style={{
          position: 'absolute', bottom: -30, left: -40,
          width: 250, height: 228, opacity: 0.40, pointerEvents: 'none',
        }} viewBox="0 0 250 228">
          <path d="M120,20 C162,5 218,38 212,98 C206,158 160,196 108,188 C56,180 8,138 18,82 C28,26 78,35 120,20Z" fill={CREAM}/>
        </svg>

        {/* Header */}
        <div style={{ position: 'relative', zIndex: 10, marginBottom: 'clamp(20px, 3vw, 28px)', maxWidth: 720 }}>
          <p style={{
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: O, fontFamily: 'monospace',
            margin: '0 0 10px',
          }}>
            Kapitel · Erfarenhet
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900, color: NAVY,
            lineHeight: 1.08, fontFamily: "'Nunito', sans-serif",
            margin: '0 0 12px', letterSpacing: '-0.01em',
          }}>
            10 vanliga misstag
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            color: MID, lineHeight: 1.65,
            fontFamily: "'Nunito', sans-serif",
            margin: 0,
          }}>
            Lär av andras misstag — innan ni gör dem själva. Dra korten åt sidan, klicka pilarna eller använd ← → på tangentbordet.
          </p>
        </div>

        {/* Kort-container */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          maxWidth: 640,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Kortarea med fast höjd */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(540px, 72vh, 720px)',
            marginBottom: 'clamp(20px, 3vw, 28px)',
          }}>
            {klart ? (
              <KlartVy onOmstart={omstart} />
            ) : (
              <>
                {/* Stack vänster — sedda kort */}
                {index > 0 && (
                  <StackKort
                    misstag={MISSTAG[index - 1]}
                    position={1}
                    side="left"
                  />
                )}
                {index > 1 && (
                  <StackKort
                    misstag={MISSTAG[index - 2]}
                    position={2}
                    side="left"
                  />
                )}

                {/* Stack höger — kommande kort */}
                {index < MISSTAG.length - 1 && (
                  <StackKort
                    misstag={MISSTAG[index + 1]}
                    position={1}
                    side="right"
                  />
                )}
                {index < MISSTAG.length - 2 && (
                  <StackKort
                    misstag={MISSTAG[index + 2]}
                    position={2}
                    side="right"
                  />
                )}

                {/* Aktivt kort */}
                <AnimatePresence custom={direction} mode="wait">
                  <AktivtKort
                    key={aktivt.id}
                    misstag={aktivt}
                    direction={direction}
                    onSwipe={(dir) => {
                      if (dir > 0) nästa();
                      else föregående();
                    }}
                  />
                </AnimatePresence>

                {/* ── PILAR — overlay på kortet (alltid synliga) ── */}
                <motion.button
                  onClick={föregående}
                  disabled={index === 0}
                  whileHover={index > 0 ? { scale: 1.08, x: -2 } : {}}
                  whileTap={index > 0 ? { scale: 0.94 } : {}}
                  style={{
                    position: 'absolute',
                    left: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 56, height: 56, borderRadius: '50%',
                    background: index === 0 ? 'rgba(250,250,248,0.5)' : 'rgba(250,250,248,0.96)',
                    border: `2px solid ${index === 0 ? 'rgba(23,31,50,0.08)' : 'rgba(23,31,50,0.12)'}`,
                    backdropFilter: 'blur(8px)',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 30,
                    boxShadow: index === 0 ? 'none' : '0 6px 20px rgba(23,31,50,0.18)',
                  }}>
                  <ChevronLeft size={26} style={{ color: index === 0 ? '#ccc' : NAVY }} />
                </motion.button>

                <motion.button
                  onClick={nästa}
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.94 }}
                  style={{
                    position: 'absolute',
                    right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 56, height: 56, borderRadius: '50%',
                    background: O,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 30,
                    boxShadow: `0 8px 24px ${O}55`,
                  }}>
                  <ChevronRight size={26} style={{ color: '#fff' }} />
                </motion.button>
              </>
            )}
          </div>

          {/* Räknare + dots under kortet */}
          {!klart && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}>
              <div style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                {MISSTAG.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    style={{
                      width: i === index ? 28 : 10,
                      height: 10,
                      borderRadius: 5,
                      background: i === index ? O : i < index ? `${O}50` : 'rgba(23,31,50,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <span style={{
                fontSize: 13, fontWeight: 700,
                color: MID, fontFamily: 'monospace',
                letterSpacing: '0.05em',
              }}>
                {index + 1} av {MISSTAG.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VanligaMisstag;