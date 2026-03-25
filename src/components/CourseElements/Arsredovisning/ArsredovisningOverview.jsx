// src/components/CourseElements/Arsredovisning/ArsredovisningOverview.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, TrendingUp, BarChart2, StickyNote, CheckSquare, RefreshCw, Play, Pause, Volume2, CheckCircle, X } from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const PARTS = [
  {
    id: 'forvaltning',
    number: '01',
    label: 'Förvaltningsberättelsen',
    icon: FileText,
    color: '#0EA5E9',
    tagline: 'Berättelsen om året',
    frontTeaser: 'Styrelsens egen berättelse – här börjar du alltid.',
    description: 'Förvaltningsberättelsen är styrelsens egen berättelse om hur det gått under året. Här beskrivs viktiga händelser, fastigheten, antal lägenheter och föreningens situation med egna ord.',
    innehall: [
      'Information om fastigheten och läget',
      'Viktiga händelser under året',
      'Planerade underhållsåtgärder',
      'Förändringar i styrelsen',
      'Förslag till resultatdisposition',
    ],
    tips: 'Läs alltid förvaltningsberättelsen först – den ger dig helhetsbilden innan du tittar på siffrorna.',
    audio: '/audio/arsredovisning-forvaltning.mp3',
  },
  {
    id: 'resultat',
    number: '02',
    label: 'Resultaträkningen',
    icon: TrendingUp,
    color: '#10B981',
    tagline: 'Årets intäkter och kostnader',
    frontTeaser: 'Visar om föreningen gick plus eller minus under året.',
    description: 'Resultaträkningen visar alla intäkter (avgifter, hyror) och kostnader (drift, underhåll, räntor) under ett år. Differensen är årets resultat – plus eller minus.',
    innehall: [
      'Årsavgifter och hyresintäkter',
      'Drifts- och underhållskostnader',
      'Räntekostnader på lån',
      'Avskrivningar på fastigheten',
      'Årets resultat (vinst eller förlust)',
    ],
    tips: 'Ett minusresultat är inte alltid farligt – men titta på om det är tillfälligt eller återkommande.',
    audio: '/audio/arsredovisning-resultat.mp3',
  },
  {
    id: 'balans',
    number: '03',
    label: 'Balansräkningen',
    icon: BarChart2,
    color: '#FF5421',
    tagline: 'Vad föreningen äger och är skyldig',
    frontTeaser: 'En ögonblicksbild av hela föreningens ekonomi.',
    description: 'Balansräkningen är en ögonblicksbild av föreningens ekonomi på årets sista dag. Den visar tillgångar (fastigheten, pengar) och skulder (banklån, leverantörsskulder).',
    innehall: [
      'Fastighetens bokförda värde',
      'Likvida medel (pengar på kontot)',
      'Skulder till kreditinstitut (banklån)',
      'Eget kapital',
      'Fond för yttre underhåll',
    ],
    tips: 'Kolla skulden per kvadratmeter – ett vanligt mått på hur belånad föreningen är.',
    audio: '/audio/arsredovisning-balans.mp3',
  },
  {
    id: 'noter',
    number: '04',
    label: 'Noterna',
    icon: StickyNote,
    color: '#8B5CF6',
    tagline: 'Förklaringarna till siffrorna',
    frontTeaser: 'Detaljerna som gör siffrorna begripliga.',
    description: 'Noterna är fotnoter och förklaringar till resultat- och balansräkningen. Här hittar du detaljer om räkenskapsprinciper, lån, pensioner och avskrivningsmetoder.',
    innehall: [
      'Redovisningsprinciper',
      'Specifikation av lån och räntor',
      'Avskrivningsprinciper för fastigheten',
      'Ställda säkerheter och ansvarsförbindelser',
      'Upplysningar om styrelsearvoden',
    ],
    tips: 'Noterna är detaljerade men viktiga – speciellt noterna om lån och säkerheter.',
    audio: '/audio/arsredovisning-noter.mp3',
  },
  {
    id: 'revision',
    number: '05',
    label: 'Revisionsberättelsen',
    icon: CheckSquare,
    color: '#F59E0B',
    tagline: 'Revisorns omdöme',
    frontTeaser: 'Revisorns godkännande – eller varningssignal.',
    description: 'Revisionsberättelsen är revisorns utlåtande om att räkenskaperna stämmer och att styrelsen skött sitt uppdrag. En "ren" berättelse är bra – en med anmärkningar är ett varningstecken.',
    innehall: [
      'Bekräftelse att räkenskaperna är riktiga',
      'Uttalande om styrelsens förvaltning',
      'Eventuella anmärkningar',
      'Förslag om ansvarsfrihet',
      'Revisorns underskrift',
    ],
    tips: 'En revisionsberättelse med anmärkningar ska alltid tas på allvar och diskuteras på stämman.',
    audio: '/audio/arsredovisning-revision.mp3',
  },
];

// ─────────────────────────────────────────────
// AUDIO PLAYER (i modalen)
// ─────────────────────────────────────────────

const ModalAudioPlayer = ({ src, color }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
    setProgress(pct * 100);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl p-3 border border-white/8 bg-white/3">
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={() => setPlaying(false)} />
      <button onClick={toggle}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
        style={{ background: color, boxShadow: `0 2px 14px ${color}55` }}>
        {playing ? <Pause size={15} className="text-white" /> : <Play size={15} className="text-white ml-0.5" />}
      </button>
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <Volume2 size={12} style={{ color }} />
          <span className="text-xs font-semibold" style={{ color }}>Lyssna på förklaringen</span>
        </div>
        <div className="w-full h-1.5 rounded-full cursor-pointer overflow-hidden bg-white/15" onClick={handleSeek}>
          <motion.div className="h-full rounded-full" style={{ background: color }}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────

const PartModal = ({ part, onClose }) => {
  const Icon = part.icon;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 flex flex-col"
        style={{ maxHeight: '88vh' }}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 h-full"
          style={{ background: 'rgba(13,19,35,0.98)' }}>

          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-white/8 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF542118, #FF542106)' }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: '#FF542120', border: '1.5px solid #FF542145' }}>
                <Icon size={20} style={{ color: '#FF5421' }} />
              </div>
              <div>
                <p className="text-white/35 text-xs uppercase tracking-wider">Del {part.number}</p>
                <h3 className="text-lg font-bold text-white leading-tight">{part.label}</h3>
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors">
              <X size={18} className="text-white/60" />
            </button>
          </div>

          {/* Innehåll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <p className="text-white/70 text-sm leading-relaxed">{part.description}</p>

            <div className="bg-white/4 border border-white/8 rounded-xl p-4">
              <p className="text-white/35 text-xs font-bold uppercase tracking-wider mb-3">Innehåller</p>
              <ul className="space-y-2">
                {part.innehall.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF5421' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-4 border"
              style={{ background: 'rgba(255,84,33,0.06)', borderColor: 'rgba(255,84,33,0.2)' }}>
              <p className="text-xs font-bold text-[#FF5421] uppercase tracking-wider mb-1">💡 Styrelsens tips</p>
              <p className="text-white/65 text-sm leading-relaxed">{part.tips}</p>
            </div>

            {/* Audio */}
            <ModalAudioPlayer src={part.audio} color={part.color} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─────────────────────────────────────────────
// FLIP CARD – animerar, sedan öppnar modal
// ─────────────────────────────────────────────

const FlipCard = ({ part, isVisited, onOpen }) => {
  const Icon = part.icon;
  const [flipping, setFlipping] = useState(false);

  const handleClick = () => {
    if (flipping) return;
    setFlipping(true);
    // Halvvägs in i flippen öppnas modalen
    setTimeout(() => onOpen(), 280);
    // Återställ kortets rotation efter att modalen öppnats
    setTimeout(() => setFlipping(false), 600);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: 220 }}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipping ? 90 : 0 }}
        transition={{ duration: 0.28, ease: 'easeIn' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all"
          style={{
            background: isVisited ? `${part.color}14` : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${isVisited ? part.color + '50' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: isVisited ? `0 4px 20px ${part.color}18` : 'none',
          }}>
          <div className="w-full h-full p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${part.color}22`, border: `1.5px solid ${part.color}45` }}>
                <Icon size={20} style={{ color: part.color }} />
              </div>
              <div className="flex items-center gap-2">
                {isVisited
                  ? <span className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: `${part.color}20`, color: part.color }}>✓</span>
                  : <span className="text-xs font-bold text-white/20">{part.number}</span>
                }
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/6">
                  <RefreshCw size={12} className="text-white/25" />
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white leading-snug mb-1">{part.label}</h3>
            <p className="text-xs font-semibold mb-2" style={{ color: part.color }}>{part.tagline}</p>
            <p className="text-white/40 text-xs leading-relaxed flex-1 line-clamp-2">{part.frontTeaser}</p>
            <p className="text-white/20 text-xs mt-3 text-center">Klicka för att läsa mer</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// HUVUD-KOMPONENT
// ─────────────────────────────────────────────

const ArsredovisningOverview = ({ onComplete, isCompleted }) => {
  const [active, setActive] = useState(null);
  const [visited, setVisited] = useState(new Set());

  const handleOpen = (part) => {
    setActive(part);
    setVisited(prev => new Set([...prev, part.id]));
  };

  const allVisited = visited.size >= PARTS.length;

  return (
    <section data-section="ar-overview" className="min-h-screen relative py-14 sm:py-20"
      style={{ background: 'linear-gradient(160deg, #0d1420 0%, #171f32 60%, #1c2640 100%)' }}>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Årsredovisningen
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Vad innehåller en årsredovisning?
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            En årsredovisning består av fem delar. Klicka på varje del för att förstå vad den innehåller – och lyssna på förklaringen.
          </p>
        </motion.div>

        {/* Kort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PARTS.map((part, i) => (
            <motion.div key={part.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}>
              <FlipCard
                part={part}
                isVisited={visited.has(part.id)}
                onOpen={() => handleOpen(part)}
              />
            </motion.div>
          ))}
        </div>

        {/* Framsteg + slutför */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-[#FF5421]"
                animate={{ width: `${(visited.size / PARTS.length) * 100}%` }}
                transition={{ duration: 0.4 }} />
            </div>
            <span className="text-white/40 text-sm">{visited.size}/{PARTS.length} delar lästa</span>
          </div>

          {!isCompleted ? (
            <button
              onClick={() => allVisited && onComplete?.('ar-overview')}
              disabled={!allVisited}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
              style={allVisited
                ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
              }>
              {allVisited ? '✓ Fortsätt (+50 poäng)' : `Läs alla ${PARTS.length} delar`}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-[#FF5421]/20 bg-[#FF5421]/8">
              <CheckCircle size={16} className="text-[#FF5421]" />
              <span className="text-white font-semibold text-sm">Avsnitt slutfört</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && <PartModal part={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ArsredovisningOverview;