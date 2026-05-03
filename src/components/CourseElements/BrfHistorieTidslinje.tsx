// src/components/CourseElements/BrfHistorieTidslinje.tsx
// Fullskärms tidslinje med historisk bakgrundsbild
// Desktop: bilden täcker hela ytan, tidslinje ovanpå
// Mobil: scrollbar lista med kompakt UI
// Audio spelas vid klick på händelse

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, X } from 'lucide-react';
import BiografVideo from './BiografVideo';
import BiografEpokModal from './BiografEpokModal';

const O  = '#FF5421';
const OD = '#E04619';

interface Händelse {
  id: string;
  år: string;
  rubrik: string;
  kort: string;
  lång: string;
  audioSrc?: string;
  ikon: string;
  färg: string;
  bilder?: { src: string; bildtext?: string }[]; 
}



// Ersätt hela const HÄNDELSER i BrfHistorieTidslinje.tsx med detta
// Kom ihåg att uppdatera Händelse-interfacet med:
//   ingress?: string;
//   stycken?: { text: string; bild?: string; bildtext?: string; nyckelhändelser?: string[] }[];
//   lång?: string;

const HÄNDELSER: Händelse[] = [
  {
    id: 'katastrofen',
    år: '1850–1880',
    rubrik: 'Urbanisering & tidiga bostadsinitiativ',
    kort: 'Industrialism, trångboddhet och de första bostadsidéerna',
    ikon: '🏚️',
    färg: '#7A3B1E',
    audioSrc: '/audio/historia-del1.mp3',
    ingress: 'Det som en gång byggdes för en trångbodd arbetarklass utanför stadskärnorna kan idag vara attraktiva bostäder för en köpstark medel- och överklass. Men vägen dit gick genom fattigdom, sjukdom och kamp.',
    stycken: [
      {
        text: 'I mitten av 1800-talet fick industrialismen sitt riktiga genombrott i Sverige. Mängder av nya företag etablerades inom verkstad, kraft, pappers- och konfektionsindustrin. Bönderna lämnade åkrarna och i de industriella städerna behövdes arbetskraft. Malmö, Göteborg och Stockholm svällde på ett sätt som ingen hade förberett sig för — och ingen hade heller byggt bostäder åt alla som kom.',
        bild: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&q=80',
        bildtext: 'Industrialisering och fabriksarbete, 1800-talets Sverige',
        nyckelhändelser: [
          'Industrialiseringen leder till massiv inflyttning till städerna',
          'Trångboddhet och sanitära problem blir ett akut samhällsproblem',
          'Bostaden etableras som en social fråga — inte bara privat angelägenhet',
        ],
      },
      {
        text: 'Det som mötte de nyanlända arbetarna var inte frihet — utan trångboddhet av ett slag vi knappt kan föreställa oss idag. En familj på sex, sju, åtta personer delade ett enda rum som var sovrum, vardagsrum och kök på samma gång. Utan rinnande vatten. Utan avlopp. Ända in på 1930-talet saknade fyra av fem svenska bostäder tillgång till vatten och avlopp inomhus.',
        bild: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
        bildtext: 'Trångboddhet och eländiga levnadsförhållanden i 1800-talets städer',
        nyckelhändelser: [
          'Filantropiska bostadsprojekt — arbetsgivare börjar bygga bostäder åt sina anställda',
          'Tidiga bostadsföreningar och kooperativa idéer växer fram',
          'De första sanitära reformerna genomdrivs i städerna',
        ],
      },
      {
        text: 'När man bodde så tätt och i sådan misär spred sig sjukdomarna lätt. Under 1857 dog mer än 10 000 svenskar enbart i dysenteri. Tuberkulos förblev den vanligaste dödsorsaken under hela perioden. I slutet av 1800-talet börjar folk organisera sig — fröet till det vi idag kallar bostadsrättsföreningen har såtts.',
        bild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
        bildtext: 'Folkrörelsernas framväxt i slutet av 1800-talet',
        nyckelhändelser: [
          'Epidemier av dysenteri och tuberkulos skördar tusentals liv',
          'Fackliga och politiska folkrörelser organiserar arbetarklassen',
          'Missnöjet med spekulation och usla bostäder leder till de första bostadsföreningarna',
        ],
      },
    ],
  },

  {
    id: 'folkhem',
    år: '1920-tal',
    rubrik: 'Bostadsrätten tar form',
    kort: 'HSB, kooperativt ägande och statens engagemang',
    ikon: '🏘️',
    färg: '#1A3A5C',
    audioSrc: '/audio/historia-del2.mp3',
    ingress: 'På 1920-talet sker något avgörande. Det kooperativa tänket, politiken och en ny syn på boendet möts — och resultatet förändrar hur Sverige bygger och bor för alltid.',
    stycken: [
      {
        text: 'HSB — Hyresgästernas Sparkasse- och Byggnadsförening — grundas 1923, tätt följt av Riksbyggen och SBC. Idén är enkel men revolutionerande: arbetarna ska äga sina egna bostäder gemensamt, kooperativt, utan att vara beroende av en spekulativ hyresvärd. Det kooperativa tänket innebär att alla medlemmar har lika röst och gemensamt ansvar för fastigheten.',
        bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        bildtext: 'HSB grundas 1923 — det kooperativa boendet tar form',
        nyckelhändelser: [
          'HSB bildas 1923 — startskottet för modernt kooperativt bostadsbyggande',
          'De första moderna bostadsrättsföreningarna etableras i svenska städer',
          'Kooperativt ägande med demokratisk styrning får brett genomslag',
        ],
      },
      {
        text: 'Staten börjar på allvar engagera sig i bostadsfrågan. Fokus ligger på rimliga hyror och bättre boendestandard för alla samhällsklasser. Det är inte längre enbart filantropers eller arbetsgivares ansvar att lösa bostadsfrågan — bostaden börjar ses som en del av samhällskontraktet.',
        bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        bildtext: 'Staten tar ansvar för bostadsfrågan på 1920-talet',
        nyckelhändelser: [
          'Staten börjar aktivt engagera sig i bostadsbyggande och -finansiering',
          'Fokus på rimliga hyror och förbättrad boendestandard för alla',
          'Bostaden etableras som en del av det framväxande välfärdssamhället',
        ],
      },
    ],
  },

  {
    id: 'brffoods',
    år: '1930–1940-tal',
    rubrik: 'Folkhemmet & bostadspolitik',
    kort: 'Funkis, BRF:ens juridiska form och statlig styrning',
    ikon: '🏢',
    färg: '#2D4A1E',
    audioSrc: '/audio/historia-del3.mp3',
    ingress: 'Din bostadsrätt är inte bara en lägenhet — den är resultatet av en svensk besatthet av den perfekta vardagen. På 1930- och 40-talen formar staten bostaden inifrån och ut.',
    stycken: [
      {
        text: '1930 stiftas den första bostadsrättslagen och bostadsrättsföreningen får sin juridiska form. Rätten att nyttja lägenheten på obegränsad tid slås fast. Samma år hålls Stockholmsutställningen — en hyllning till funktionalismen. "Funkis" slår igenom som arkitekturideal: ljusa, rationella hem med rena linjer, inbyggda garderober och moderna kök.',
        bild: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
        bildtext: 'Funktionalismen slår igenom — Stockholmsutställningen 1930',
        nyckelhändelser: [
          'Folkhemmet etableras som politisk vision av Per Albin Hansson',
          'Funktionalismen ("funkis") slår igenom med Stockholmsutställningen 1930',
          'Första bostadsrättslagen stiftas — BRF:en får sin juridiska form',
          'Staten inför aktiv bostadspolitik med subventioner och stöd',
        ],
      },
      {
        text: 'Genom Hemmens Forskningsinstitut — HFI — skickas observatörer ut med tidtagarur och måttband. De sitter i folks kökshörn för att mäta varje steg mellan vask och spis, allt i den heliga rationaliseringens namn. Det svenska standardköket föds. Din bostadsrätt är resultatet av en svensk besatthet av den perfekta vardagen.',
        bild: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        bildtext: 'HFI rationaliserar det svenska hemmet — varje rörelse mäts',
        nyckelhändelser: [
          'Hemmens Forskningsinstitut (HFI) standardiserar den svenska bostaden',
          'Bostaden blir en del av välfärdssystemet — inte bara ett privat val',
          '1942 införs prisreglering på bostadsrätter som en följd av krigets ekonomi',
        ],
      },
    ],
  },

  {
    id: 'miljonprogrammet',
    år: '1950–1970-tal',
    rubrik: 'Massproduktion & standardisering',
    kort: 'Miljonprogrammet — en miljon bostäder på tio år',
    ikon: '🏗️',
    färg: '#1E3A4A',
    audioSrc: '/audio/historia-del4.mp3',
    ingress: 'Det Sverige som en gång plågades av dysenteri och trångboddhet förvandlas i grunden. På tjugo år går landet från bostadsbrist till ett av världens mest ambitiösa bostadsbyggnadsprogram.',
    stycken: [
      {
        text: 'Mellan 1965 och 1974 byggs en miljon nya bostäder i Sverige — ett av de mest ambitiösa bostadsbyggnadsprogrammen i världshistorien. Modernitet, funktionalitet och jämlikhet är ledorden. Badrum med varmvatten, centralvärme och egna kök — saker som en generation tidigare var en lyx — blir standard för alla. Sopnedkastet blir symbol för det moderna hemmet.',
        bild: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
        bildtext: 'Miljonprogrammet — storskalig förortsutbyggnad 1965–1974',
        nyckelhändelser: [
          'Miljonprogrammet (1965–1974) — en miljon bostäder byggs på tio år',
          'Standardisering av bostäder: kök, badrum och planlösningar normeras',
          'Sopnedkastet och centralvärmen blir symboler för modern bekvämlighet',
          'Storskalig förortsutbyggnad förändrar svenska städers struktur',
        ],
      },
      {
        text: 'Bostadsrättsföreningar blir ett populärt sätt att organisera och finansiera det nya byggandet — demokratiskt ägt av de boende. 1971 träder en ny och mer modern bostadsrättslag i kraft som klargör styrelsens ansvar, stämmans befogenheter och innehavarnas rättigheter. Stark statlig styrning av bostadsmarknaden råder under hela perioden.',
        bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        bildtext: 'Ny bostadsrättslag 1971 — modern reglering för en växande boendeform',
        nyckelhändelser: [
          'Bostadsrättsföreningen etableras som dominerande boendeform i städerna',
          'Stark statlig styrning av priser, hyror och byggande',
          'Ny bostadsrättslag 1971 ger tydligare regler för styrelse och stämma',
        ],
      },
    ],
  },

  {
    id: 'nutid',
    år: '1991–idag',
    rubrik: 'Marknad, lagar & förändring',
    kort: 'Avreglering, stigande priser och skärpta krav',
    ikon: '💰',
    färg: '#2A1A4A',
    audioSrc: '/audio/historia-del5.mp3',
    ingress: 'Det som en gång byggdes som folkhem för alla är idag en av Sveriges mest värdefulla tillgångsklasser. Hyreskaserner med eländiga levnadsförhållanden rymmer nu moderna lägenheter — och inga medlemmar behöver bekymra sig för dysenteri.',
    stycken: [
      {
        text: 'Skattereformen 1991 markerar början på marknadsanpassningen av bostadssektorn. Den nuvarande bostadsrättslagen (SFS 1991:614) träder i kraft samma år och ger den juridiska ram som gäller än idag. Avregleringen av bostadsmarknaden inleds och priserna börjar röra sig mer fritt.',
        bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        bildtext: 'Skattereformen 1991 och ny bostadsrättslag markerar en ny era',
        nyckelhändelser: [
          'Skattereformen 1991 — startskottet för marknadsanpassning av bostäder',
          'Nuvarande bostadsrättslag SFS 1991:614 träder i kraft',
          'Avreglering av bostadsmarknaden inleds gradvis',
        ],
      },
      {
        text: 'Under 2000-talet ombildas mängder av hyresrätter till bostadsrätter, särskilt i storstäderna. Bostadsrättspriserna stiger kraftigt och bostaden förvandlas från en social rättighet till en finansiell investering. Det som en gång byggdes som folkhem för alla blir i många fall en tillgång för dem med kapital nog att köpa in sig.',
        bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
        bildtext: 'Kraftigt stigande bostadspriser och ombildningar under 2000-talet',
        nyckelhändelser: [
          'Kraftigt stigande bostadspriser — bostaden blir en investering',
          'Ombildningar från hyresrätt till bostadsrätt i stor skala',
          'Ny lagstiftning med skärpta krav på ekonomi, styrelseansvar och transparens',
          'Idag: 1,6 miljoner bostadsrätter i 27 000 föreningar — ca 30% av befolkningen',
        ],
      },
    ],
  },
];

interface Props {
  isCompleted?: boolean;
  onComplete?: (id: string) => void;
}

const BrfHistorieTidslinje: React.FC<Props> = ({ isCompleted, onComplete }) => {
  const [aktivIdx, setAktivIdx]       = useState<number | null>(null);
  const [seddaIds, setSeddaIds]       = useState<Set<string>>(new Set());
  const [spelande, setSpelande]       = useState(false);
  const [mutad, setMutad]             = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const audioRef                      = useRef<HTMLAudioElement | null>(null);
  const progressRef                   = useRef<HTMLDivElement>(null);
  const aktivHändelse = aktivIdx !== null ? HÄNDELSER[aktivIdx] : null;
  const [videoOpen, setVideoOpen] = useState(false);
  const [aktivEpok, setAktivEpok] = useState<Händelse | null>(null);

  useEffect(() => {
  const audio = new Audio('/audio/historia-intro.mp3');
  audio.play().catch(() => {});
  return () => { audio.pause(); };
}, []);

  useEffect(() => {
    if (seddaIds.size === HÄNDELSER.length && !isCompleted) {
      onComplete?.('historia-tidslinje');
    }
  }, [seddaIds]);

  const spelAudio = (händelse: Händelse) => {
    if (audioRef.current) audioRef.current.pause();
    if (!händelse.audioSrc) return;
    const audio = new Audio(händelse.audioSrc);
    audioRef.current = audio;
    audio.muted = mutad;
    audio.ontimeupdate    = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onplay  = () => setSpelande(true);
    audio.onpause = () => setSpelande(false);
    audio.onended = () => setSpelande(false);
    audio.play().catch(() => {});
  };

  const välj = (idx: number) => {
  const h = HÄNDELSER[idx];
  setAktivIdx(idx);
  setSeddaIds(prev => new Set([...prev, h.id]));
  setAktivEpok(h);  // ← öppnar biografen
};

  const stäng = () => {
    audioRef.current?.pause();
    setAktivIdx(null);
    setSpelande(false);
  };

  const toggleSpela = () => {
    if (!audioRef.current) return;
    spelande ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  };

  const toggleMut = () => {
    setMutad(m => {
      if (audioRef.current) audioRef.current.muted = !m;
      return !m;
    });
  };

  const föregående = () => { if (aktivIdx !== null && aktivIdx > 0) välj(aktivIdx - 1); };
  const nästa      = () => { if (aktivIdx !== null && aktivIdx < HÄNDELSER.length - 1) välj(aktivIdx + 1); };

  const formatTid = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full relative overflow-hidden">

      {/* Bakgrundsbild */}
      <img
        src="/historia2.png"
        alt="BRF:ens historia"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      />

      {/* Gradient overlay — endast topp och botten, mitten är öppen */}
<div className="absolute inset-0" style={{
  background: 'linear-gradient(to bottom, rgba(5,10,20,0.90) 0%, rgba(5,10,20,0) 25%, rgba(5,10,20,0) 60%, rgba(5,10,20,0.85) 100%)',
}} />

     {/* Video-spelare i biografstil */}
<div style={{
  position: 'absolute',
  top: '12%', bottom: '28%',
  left: '15%', right: '15%',
  zIndex: 15,
}}>
  <BiografVideo
    videoId="7v2ZxNgaRis"
    titel="Spela film"
    undertitel="BRF:ens historia"
  />
</div>

      {/* Blur-overlay när modal är öppen */}
      <AnimatePresence>
        {aktivHändelse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 25,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'rgba(5,10,20,0.28)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Video-modal */}
<AnimatePresence>
  {videoOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={() => setVideoOpen(false)}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 40 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        style={{
           position: 'absolute',
  top: '42%',
  left: '10%',      // ← inte 50%
  right: '10%',
  margin: '0 auto',
  width: 'fit-content',
  zIndex: 15,
        }}
      >
        <div style={{
          background: '#1a1208',
          border: '4px solid #8B6914',
          borderRadius: 4,
          boxShadow: '0 0 0 2px #4a3808, 0 0 0 4px #8B6914, 0 32px 80px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Retro-ram top */}
          <div style={{
            background: 'linear-gradient(to bottom, #2a1e0a, #1a1208)',
            padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '2px solid #8B6914',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B6914' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6B4E14' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4a3808' }} />
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: 'uppercase' as const, color: '#8B6914',
              fontFamily: 'monospace',
            }}>
              ▶ BRF:ens Historia
            </span>
            <button onClick={() => setVideoOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#8B6914', fontSize: 18, lineHeight: 1,
              fontFamily: 'monospace',
            }}>
              ✕
            </button>
          </div>

          {/* Video */}
          <div style={{ position: 'relative', aspectRatio: '16/9' }}>
            {/* Retro scan-lines overlay */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }} />
            <iframe
              src="https://www.youtube.com/embed/7v2ZxNgaRis?autoplay=1&rel=0"
              title="BRF:ens historia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>

          {/* Retro-ram bottom */}
          <div style={{
            background: 'linear-gradient(to top, #2a1e0a, #1a1208)',
            padding: '8px 16px',
            borderTop: '2px solid #8B6914',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: 10, color: '#4a3808', fontFamily: 'monospace', letterSpacing: 2 }}>
              STYRELSEKÖRKORTET® · HISTORISKT ARKIV
            </span>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* ── HEADER ── */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-5 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2"
            style={{ background: `${O}30`, color: O, border: `1px solid ${O}50` }}>
            Kapitel 1 · Historia
          </div>
          <h2 className="text-white font-black leading-tight"
            style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', fontFamily: "'Nunito', sans-serif", textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            BRF:ens historia — från 1850 till idag
          </h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)', marginTop: 4, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
            Klicka på en epok för att läsa mer och lyssna
          </p>
        </motion.div>
      </div>

      {/* Framsteg-badge */}
      <div className="absolute top-5 right-5 z-20">
        <div style={{
          padding: '6px 14px', borderRadius: 20,
          background: 'rgba(10,20,40,0.80)',
          border: `1px solid ${seddaIds.size === HÄNDELSER.length ? O : 'rgba(255,255,255,0.15)'}`,
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: seddaIds.size === HÄNDELSER.length ? O : 'rgba(255,255,255,0.6)' }}>
            {seddaIds.size === HÄNDELSER.length ? '✓ Alla utforskade!' : `${seddaIds.size} / ${HÄNDELSER.length} utforskade`}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — Horisontell tidslinje
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 z-20 flex-col"
        style={{ paddingBottom: 72 }}>

        {/* Linje */}
        <div className="relative mx-10 mb-3">
          <div className="w-full h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.20)' }} />
          <div className="absolute left-0 top-0 h-0.5 rounded-full transition-all duration-700"
            style={{ background: O, width: `${(seddaIds.size / HÄNDELSER.length) * 100}%` }} />
        </div>

        {/* Händelse-knappar */}
        <div className="flex items-end justify-between px-10 gap-4">
          {HÄNDELSER.map((h, i) => {
            const isAktiv = aktivIdx === i;
            const isSedd  = seddaIds.has(h.id);
            return (
              <motion.button
                key={h.id}
                onClick={() => välj(i)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2"
                style={{ flex: 1, minWidth: 0 }}
              >
                {/* Dot */}
                <div style={{
                  width: isAktiv ? 20 : 12, height: isAktiv ? 20 : 12,
                  borderRadius: '50%',
                  background: isAktiv ? O : isSedd ? `${O}80` : 'rgba(255,255,255,0.30)',
                  border: `2px solid ${isAktiv ? '#fff' : 'transparent'}`,
                  boxShadow: isAktiv ? `0 0 24px ${O}90` : 'none',
                  transition: 'all 0.25s', marginBottom: 4,
                }} />

                {/* Kort */}
                <div style={{
                  background: isAktiv
                    ? `linear-gradient(135deg, ${O}, ${OD})`
                    : isSedd
                    ? 'rgba(255,255,255,0.16)'
                    : 'rgba(10,20,40,0.70)',
                  border: `1px solid ${isAktiv ? O : 'rgba(255,255,255,0.14)'}`,
                  borderRadius: 16, padding: '12px 10px',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  textAlign: 'center', width: '100%',
                  boxShadow: isAktiv ? `0 6px 28px ${O}55` : 'none',
                  transition: 'all 0.25s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
  <img src="/icons/icon1.png" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
</div>
                  <p style={{ fontSize: 12, fontWeight: 900, color: '#fff', fontFamily: "'Nunito', sans-serif", lineHeight: 1.2 }}>{h.år}</p>
                  <p style={{ fontSize: 10, color: isAktiv ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.55)', lineHeight: 1.3, marginTop: 3 }}>{h.rubrik}</p>
                  {h.audioSrc && (
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Volume2 size={9} style={{ color: isAktiv ? '#fff' : 'rgba(255,255,255,0.35)' }} />
                      <span style={{ fontSize: 9, color: isAktiv ? '#fff' : 'rgba(255,255,255,0.35)' }}>Lyssna</span>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBIL — Vertikal scrolllista
      ══════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-10 overflow-y-auto"
        style={{ paddingTop: 130, paddingBottom: 100 }}>
        <div className="px-4 space-y-3">
          {HÄNDELSER.map((h, i) => {
            const isAktiv = aktivIdx === i;
            const isSedd  = seddaIds.has(h.id);
            return (
              <motion.button
                key={h.id}
                onClick={() => välj(i)}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', textAlign: 'left',
                  background: isAktiv ? `linear-gradient(135deg, ${O}EE, ${OD}EE)` : 'rgba(10,20,40,0.78)',
                  border: `1px solid ${isAktiv ? O : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 16, padding: '14px 16px',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex', alignItems: 'center', gap: 14,
                  boxShadow: isAktiv ? `0 4px 20px ${O}50` : 'none',
                }}>
                <div style={{ fontSize: 30, flexShrink: 0 }}>{h.ikon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 14, fontWeight: 900, color: isAktiv ? '#fff' : O }}>{h.år}</span>
                    {isSedd && !isAktiv && (
                      <span style={{ fontSize: 10, color: `${O}90`, fontWeight: 700 }}>✓ Sedd</span>
                    )}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: "'Nunito', sans-serif" }}>{h.rubrik}</p>
                  <p style={{ fontSize: 13, color: isAktiv ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)', lineHeight: 1.4, marginTop: 3 }}>{h.kort}</p>
                  {h.audioSrc && (
                    <div className="flex items-center gap-1 mt-2">
                      <Volume2 size={12} style={{ color: isAktiv ? '#fff' : `${O}80` }} />
                      <span style={{ fontSize: 12, color: isAktiv ? '#fff' : `${O}80` }}>Klicka för att lyssna</span>
                    </div>
                  )}
                </div>
                <ChevronRight size={18} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
              </motion.button>
            );
          })}
        </div>
      </div>

       <BiografEpokModal
  epok={aktivEpok}
  onStäng={() => { setAktivEpok(null); setAktivIdx(null); }}
  onFöregående={() => { if (aktivIdx !== null && aktivIdx > 0) välj(aktivIdx - 1); }}
  onNästa={() => { if (aktivIdx !== null && aktivIdx < HÄNDELSER.length - 1) välj(aktivIdx + 1); }}
  harFöregående={aktivIdx !== null && aktivIdx > 0}
  harNästa={aktivIdx !== null && aktivIdx < HÄNDELSER.length - 1}
/>

    </div>
  );
};

export default BrfHistorieTidslinje;