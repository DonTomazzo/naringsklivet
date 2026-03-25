// src/components/CourseElements/AiDailyLifeSection.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Download, X, Zap, Volume2, VolumeX, Car, Heart, ChevronRight
} from 'lucide-react';

// ============================================
// 1. DATA
// ============================================

const SECTION_ID = 'ai-idag';
const SECTION_TITLE = 'Styrelsens olika roller';
const SECTION_SUBTITLE = 'Klicka på de pulserande punkterna för att utforska rollerna';
const SECTION_IMAGE_URL = '/styrelsen2.png';
const BACKGROUND_AUDIO_URL = '/audio/background.mp3';
const INTRO_VIDEO_URL = 'https://www.youtube.com/embed/NO-Lq3w94Tg?autoplay=1';
const SECTION_ICON = Zap;

const HOTSPOT_DATA = [
  {
    x: 17, y: 50,
    title: "Revisorn",
    icon: Play,
    color: "bg-[#A8D5BA]",
    cardColor: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-[#A8D5BA]",
    description: "Revisorns uppgift är att granska föreningens ekonomi och styrelsens förvaltning under året. Denna oberoende granskning är en trygghet för dig som medlem. Revisorn säkerställer att årsredovisningen ger en rättvis bild, att bokföringen sköts korrekt och att styrelsen följer lagar, stadgar och föreningsstämmans beslut.",
    examples: ["Granskar årsredovisning", "Kontrollerar bokföring", "Säkerställer regelefterlevnad", "Rapporterar till stämman"],
    audioUrl: '/audio/revisorn.mp3',
    pdfUrl: '/pdf/arbetsbeskrivning-revisorn.pdf',
    imageUrl: '/images/revisor.jpg'
  },
  {
    x: 35, y: 45,
    title: "Ordföranden",
    icon: Play,
    color: "bg-[#FF5421]",
    modalColor: "bg-[#171f32]",
    cardColor: "bg-orange-50 border-orange-200",
    iconBg: "bg-[#FF5421]",
    description: "Ordföranden är styrelsens ledare och har ett övergripande ansvar för att styrelsen arbetar effektivt och i enlighet med lagar, stadgar och föreningens bästa. Ordföranden leder styrelsemöten, representerar föreningen utåt och säkerställer att beslut fattas och följs upp.",
    examples: ["Leder styrelsemöten", "Representerar föreningen", "Koordinerar arbetet", "Kallar till möten"],
    audioUrl: '/audio/ordforanden.mp3',
    pdfUrl: '/pdf/ordforande.pdf',
    imageUrl: '/images/ordforande.png'
  },
  {
    x: 57, y: 45,
    title: "Sekreteraren",
    icon: Play,
    color: "bg-[#C8D9E6]",
    cardColor: "bg-sky-50 border-sky-200",
    iconBg: "bg-[#C8D9E6]",
    description: "Sekreteraren är styrelsens minnesbank och ansvarar för all dokumentation. En välskött protokollföring är avgörande för styrelsens rättssäkerhet och möjlighet att följa upp beslut.",
    examples: ["Protokollföring", "Kallelser", "Arkivering", "Uppföljning av beslut"],
    audioUrl: '/audio/sekreteraren.mp3',
    pdfUrl: '/pdf/arbetsbeskrivning-sekreteraren.pdf'
  },
  {
    x: 30, y: 70,
    title: "Kassören",
    icon: Car,
    color: "bg-[#FFD9E8]",
    cardColor: "bg-pink-50 border-pink-200",
    iconBg: "bg-[#FFD9E8]",
    description: "Kassören är ansvarig för föreningens ekonomiska förvaltning och redovisning. Rollen kräver noggrannhet, ekonomisk kompetens och förmåga att se helheten i föreningens finansiella situation.",
    examples: ["Löpande bokföring", "Årsredovisning", "Ekonomisk kontroll", "Budget och planering"],
    audioUrl: '/audio/kassoren.mp3',
    pdfUrl: '/pdf/arbetsbeskrivning-kassoren.pdf'
  },
  {
    x: 70, y: 65,
    title: "Vice ordföranden",
    icon: Heart,
    color: "bg-[#E8D4F2]",
    cardColor: "bg-purple-50 border-purple-200",
    iconBg: "bg-[#E8D4F2]",
    description: "Vice ordföranden är ordförandens ställföreträdare och träder in när ordföranden inte kan närvara eller är jävig. Rollen innebär att vara beredd att ta över ledningen vid kort varsel.",
    examples: ["Ersätter ordföranden", "Stödjer ordföranden", "Särskilda ansvarsområden", "Samtalspartner"],
    audioUrl: '/audio/vice-ordforanden.mp3',
    pdfUrl: '/pdf/arbetsbeskrivning-vice-ordforanden.pdf'
  }
];

// ============================================
// 2. MODAL (delad mellan desktop & mobil)
// ============================================

const Modal = ({ isOpen, onClose, hotspot }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!hotspot) return null;

  const handleDownloadPDF = () => {
    if (hotspot.pdfUrl) {
      const link = document.createElement('a');
      link.href = hotspot.pdfUrl;
      link.download = hotspot.pdfUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className={`${hotspot.modalColor || hotspot.color} p-5 sm:p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold">{hotspot.title}</h3>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {hotspot.imageUrl && (
                  <img src={hotspot.imageUrl} alt={hotspot.title} className="w-full h-auto rounded-xl shadow" />
                )}

                {hotspot.audioUrl && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Volume2 className="w-4 h-4" /> Lyssna på arbetsbeskrivningen
                    </p>
                    <audio controls autoPlay className="w-full rounded-lg">
                      <source src={hotspot.audioUrl} type="audio/mp3" />
                    </audio>
                  </div>
                )}

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{hotspot.description}</p>

                {hotspot.examples && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-800 mb-2 text-sm">Exempel på uppgifter</h4>
                    <ul className="space-y-1">
                      {hotspot.examples.map((ex, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5421] flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-slate-100 bg-slate-50">
                {hotspot.pdfUrl ? (
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
                  >
                    <Download className="w-5 h-5" />
                    Ladda ner PDF – Arbetsbeskrivning
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="w-full py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
                  >
                    Stäng
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// 3. VIDEO MODAL
// ============================================

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full z-50"
          >
            <div className="bg-slate-900 rounded-2xl overflow-hidden">
              <div className="bg-[#FF5421] p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={videoUrl} title={title} frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// 4. DESKTOP – Hotspot-bild
// ============================================

const Hotspot = ({ x, y, title, icon: Icon, color, onClick }) => (
  <motion.div
    className="absolute cursor-pointer group"
    style={{ left: `${x}%`, top: `${y}%` }}
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className={`absolute inset-0 rounded-full ${color} opacity-30`}
      animate={{ scale: [1, 2, 2], opacity: [0.3, 0, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      style={{ width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px' }}
    />
    <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white`}>
      {Icon && <Icon className="w-7 h-7 text-white" />}
    </div>
    <div className="absolute left-1/2 -translate-x-1/2 top-16 bg-slate-900/90 text-white text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap pointer-events-none shadow-xl">
      {title}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/90 rotate-45" />
    </div>
  </motion.div>
);

const DesktopView = ({ onHotspotClick, isPlaying, setIsPlaying, onVideoClick }) => (
  <div className="relative w-full min-h-screen overflow-hidden">
    <img
      src={SECTION_IMAGE_URL} alt={SECTION_TITLE}
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

    {/* Rubrik */}
    <div className="absolute top-8 left-0 right-0 z-20 text-center px-6">
      <motion.h3
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl"
      >
        {SECTION_TITLE}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-white/80 drop-shadow max-w-2xl mx-auto"
      >
        {SECTION_SUBTITLE}
      </motion.p>
    </div>

    {/* Video-knapp */}
    {INTRO_VIDEO_URL && (
      <motion.button
        onClick={onVideoClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 rounded-full bg-[#FF5421] text-white flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
      >
        <motion.div className="absolute inset-0 rounded-full bg-[#FF5421] opacity-30"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.3, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }} />
        <Play className="w-12 h-12 relative z-10 ml-2" />
      </motion.button>
    )}

    {/* Ljudkontroll */}
    {BACKGROUND_AUDIO_URL && (
      <motion.button
        className="absolute top-4 left-4 z-30 w-14 h-14 rounded-full bg-[#FF5421] text-white flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>
    )}

    {/* Hotspots */}
    <div className="absolute inset-0 z-10">
      {HOTSPOT_DATA.map((hotspot, i) => (
        <Hotspot key={i} {...hotspot} onClick={() => onHotspotClick(hotspot)} />
      ))}
    </div>
  </div>
);

// ============================================
// 5. MOBIL – Grid med rollkort
// ============================================

const MobileView = ({ onCardClick, onVideoClick }) => (
  <div className="bg-[#171f32] min-h-screen">
    {/* Header med bild */}
    <div className="relative h-52 overflow-hidden">
      <img src={SECTION_IMAGE_URL} alt={SECTION_TITLE} className="w-full h-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#171f32]/40 to-[#171f32]" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-2xl font-bold text-white leading-tight">{SECTION_TITLE}</h3>
        <p className="text-white/60 text-sm mt-1">Tryck på en roll för att lära dig mer</p>
      </div>
    </div>

    {/* Video-knapp */}
    {INTRO_VIDEO_URL && (
      <div className="px-4 py-4">
        <button
          onClick={onVideoClick}
          className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
        >
          <Play className="w-5 h-5" />
          Se introduktionsvideo
        </button>
      </div>
    )}

    {/* Rollkort i grid */}
    <div className="px-4 pb-8 grid grid-cols-1 gap-3">
      {HOTSPOT_DATA.map((hotspot, i) => {
        const Icon = hotspot.icon;
        return (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => onCardClick(hotspot)}
            className="w-full text-left bg-white/8 border border-white/10 rounded-2xl p-4 flex items-center gap-4 active:scale-98 transition-transform"
          >
            {/* Ikon */}
            <div className={`w-12 h-12 rounded-full ${hotspot.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-base leading-snug">{hotspot.title}</h4>
              <p className="text-white/50 text-sm mt-0.5 line-clamp-1">
                {hotspot.examples?.[0]} · {hotspot.examples?.[1]}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-white/30 flex-shrink-0" />
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ============================================
// 6. HUVUDKOMPONENT
// ============================================

const AiDailyLifeSection = ({ isCompleted, onComplete }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!BACKGROUND_AUDIO_URL) return;
    audioRef.current = new Audio(BACKGROUND_AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <section data-section={SECTION_ID} className="relative w-full">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }}>

        {/* Desktop: hotspot-bild */}
        <div className="hidden md:block">
          <DesktopView
            onHotspotClick={setActiveModal}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onVideoClick={() => setShowVideoModal(true)}
          />
        </div>

        {/* Mobil: grid med rollkort */}
        <div className="block md:hidden">
          <MobileView
            onCardClick={setActiveModal}
            onVideoClick={() => setShowVideoModal(true)}
          />
        </div>

      </motion.div>

      {/* Delad modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        hotspot={activeModal}
      />

      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        videoUrl={INTRO_VIDEO_URL}
        title="Introduktion till Styrelseroller"
      />
    </section>
  );
};

export default AiDailyLifeSection;