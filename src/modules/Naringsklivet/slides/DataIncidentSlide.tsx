// src/modules/Naringsklivet/slides/DataIncidentSlide.tsx
//
// SlideD-inspirerad slide med helbild och 4 klickbara pratbubblor.
// Varje bubbla triggar ett ljud + öppnar en modal med incident-detaljer.
// Används i ModuleDatalackor som en kontextuell "det händer på riktigt"-slide.

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

// ─── Incident-data ────────────────────────────────────────
const INCIDENTS = [
  {
    id: 'sportadmin',
    label: 'SportAdmin\n2024',
    position: { top: '18%', left: '8%' },
    color: O,
    audioSrc: '/audio/sportadmin.mp3',
    title: 'SportAdmin — 1,3 miljoner drabbade',
    bild: '/images/sportadmin.png',
    year: '2024',
    vad: 'En tredjepartsleverantör till idrottsföreningar läckte personuppgifter för 1,3 miljoner svenska idrottsutövare — namn, adresser, e-post och i vissa fall personnummer.',
    misstag: 'Bristande säkerhet hos ett personuppgiftsbiträde. Organisationerna hade inte kontrollerat att leverantören följde GDPR.',
    larda: 'Kontrollera alltid att era biträdesavtal är på plats och att leverantörer faktiskt lever upp till dem.',
    antal: '1,3 miljoner',
    typ: 'Biträdesincident',
  },
  {
    id: 'transportstyrelsen',
    label: 'Transport-\nstyrelsen\n2017',
    position: { top: '12%', left: '30%' },
    color: '#3B82F6',
    audioSrc: '/audio/datastyrelsen.mp3',
    bild: '/images/transportstyrelsen.png',
    title: 'Transportstyrelsen — rikets säkerhet',
    year: '2017',
    vad: 'Transportstyrelsen outsourcade sitt IT-system utan tillräckliga säkerhetskontroller. Känsliga uppgifter om militärfordon, vittnesskydd och körkortsinnehavare exponerades för utländska tekniker.',
    misstag: 'Fel vid upphandling — säkerhetskraven sattes inte i upphandlingsunderlaget. Inget personuppgiftsbiträdesavtal med rätt skyddsnivå.',
    larda: 'Säkerhetskrav måste ställas redan i upphandlingsfasen. "Ingen attack" räcker inte — felhantering av data är också en incident.',
    antal: 'Okänt — klassificerat',
    typ: 'Upphandlingsmisstag',
  },
  {
    id: 'vardguiden',
    label: '1177\nVårdguiden\n2019',
    position: { top: '12%', right: '30%' },
    color: '#06B6D4',
    audioSrc: '/audio/vardguiden.mp3',
    bild: '/images/vardguiden.png',
    title: '1177 Vårdguiden — 2,7 miljoner samtal',
    year: '2019',
    vad: '2,7 miljoner inspelade patientsamtal till 1177 låg öppet tillgängliga på en oskyddad server. Vem som helst med rätt URL kunde lyssna på känsliga medicinska samtal.',
    misstag: 'En underleverantör hade konfigurerat sin server fel — ingen autentisering krävdes för åtkomst. Ingen kontrollerade att servern var säkert konfigurerad.',
    larda: 'Teknisk konfiguration måste granskas regelbundet. Medicinska uppgifter kräver extra skyddsnivå enligt GDPR.',
    antal: '2,7 miljoner samtal',
    typ: 'Felkonfiguration',
  },
  {
    id: 'tietoevry',
    label: 'Tietoevry\n2024',
    position: { top: '18%', right: '8%' },
    color: '#EF4444',
    audioSrc: '/audio/vardguiden.mp3',
    bild: '/images/tietoevry.png',
    audioSrc: '/audio/datalackor-incident-tietoevry.mp3',
    title: 'Tietoevry — ransomware mot kommuner',
    year: '2024',
    vad: 'En ransomware-attack mot IT-leverantören Tietoevry slog ut system för ett stort antal svenska kommuner och organisationer. Känslig data krypterades och verksamheter stod utan sina system.',
    misstag: 'Många organisationer hade all sin data hos en enda leverantör utan tillräckliga backup-rutiner eller incidentplaner.',
    larda: 'Vendor lock-in är en säkerhetsrisk. Ha alltid en incidentplan och säkerhetskopior som är isolerade från produktionssystemen.',
    antal: 'Hundratals organisationer',
    typ: 'Ransomware-attack',
  },
];

// ─── Modal ────────────────────────────────────────────────
const Modal = ({
  incident,
  onClose,
}: {
  incident: typeof INCIDENTS[0] | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {incident && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-50"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            

            {/* Bild-banner */}
{incident.bild && (
  <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
    <img
      src={incident.bild}
      alt={incident.title}
      className="w-full h-full object-cover"
    />
    {/* Gradient overlay nedåt */}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }}
    />
    {/* Text ovanpå bilden */}
    <div className="absolute bottom-0 left-0 p-4">
      <div
        className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-1"
        style={{ background: incident.color, color: 'white' }}
      >
        {incident.typ} · {incident.year}
      </div>
      <h3 className="text-white font-black text-lg leading-tight drop-shadow-lg">
        {incident.title}
      </h3>
      <p className="text-white/80 text-xs font-semibold mt-0.5">
        {incident.antal} drabbade
      </p>
    </div>
  </div>
)}

            {/* Innehåll */}
            <div className="px-6 py-5 overflow-y-auto space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Vad hände?</p>
                <p className="text-sm text-gray-700 leading-relaxed">{incident.vad}</p>
              </div>
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderColor: '#EF4444', background: '#FEF2F2' }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1 text-red-500">Misstaget</p>
                <p className="text-sm text-gray-700 leading-relaxed">{incident.misstag}</p>
              </div>
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderColor: O, background: '#FFF5F2' }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>
                  Vad vi lär oss
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{incident.larda}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
              >
                Stäng
              </button>
            </div>

          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── Pratbubbla ───────────────────────────────────────────
const Bubbla = ({
  incident,
  onClick,
  isPlaying,
}: {
  incident: typeof INCIDENTS[0];
  onClick: () => void;
  isPlaying: boolean;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: INCIDENTS.indexOf(incident) * 0.12, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="absolute z-10 flex flex-col items-center gap-1"
    style={incident.position}
  >
    {/* Bubbla */}
    <div
      className="rounded-2xl px-3 py-2.5 text-white text-xs font-bold leading-snug shadow-xl text-center whitespace-pre-line"
      style={{
        background: isPlaying
          ? `linear-gradient(135deg, ${incident.color}, ${incident.color}cc)`
          : `${incident.color}dd`,
        border: isPlaying ? `2px solid white` : '2px solid transparent',
        minWidth: 80,
        maxWidth: 110,
        backdropFilter: 'blur(4px)',
      }}
    >
      {isPlaying && (
        <span className="block text-base mb-0.5">🔊</span>
      )}
      {incident.label}
    </div>
    {/* Pil nedåt */}
    <div
      className="w-0 h-0"
      style={{
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderTop: `9px solid ${incident.color}dd`,
      }}
    />
  </motion.button>
);

// ─── Huvudkomponent ───────────────────────────────────────
interface DataIncidentSlideProps {
  bild?: string;
}

const DataIncidentSlide: React.FC<DataIncidentSlideProps> = ({
  bild = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
}) => {
  const [active, setActive]     = useState<typeof INCIDENTS[0] | null>(null);
  const [playing, setPlaying]   = useState<string | null>(null);
  const audioRef                = useRef<HTMLAudioElement | null>(null);

  const handleClick = (incident: typeof INCIDENTS[0]) => {
    // Stoppa föregående ljud
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Spela ljud om fil finns
    if (incident.audioSrc) {
      const audio = new Audio(incident.audioSrc);
      audioRef.current = audio;
      setPlaying(incident.id);
      audio.play().catch(() => {});
      audio.onended = () => setPlaying(null);
    }

    // Öppna modal
    setActive(incident);
  };

  const handleClose = () => {
    setActive(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(null);
  };

  return (
    <div className="h-full relative overflow-hidden">
      {/* Bakgrundsbild */}
      <img
        src={bild}
        alt="Svenska dataläckor"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Svagt overlay för läsbarhet */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />

      {/* Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div
          className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: O }}
        >
          Det händer på riktigt — svenska exempel
        </div>
      </div>

      {/* Instruktion */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <div
          className="px-4 py-2 rounded-full text-white text-xs font-semibold"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          👆 Klicka på ett fall för att lära dig mer
        </div>
      </div>

      {/* Pratbubblor */}
      {INCIDENTS.map(incident => (
        <Bubbla
          key={incident.id}
          incident={incident}
          onClick={() => handleClick(incident)}
          isPlaying={playing === incident.id}
        />
      ))}

      {/* Modal */}
      <Modal incident={active} onClose={handleClose} />
    </div>
  );
};

export default DataIncidentSlide;