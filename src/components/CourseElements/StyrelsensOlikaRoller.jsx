// src/modules/InteractiveImage_AiDailyLife.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Play, Pause, ShoppingCart, Car, Heart, Phone, X,
  Zap, Volume2, VolumeX 
} from 'lucide-react';

// ============================================
// 1. 📊 MOCKDATA (All data, inkl. ljud-URL:er, finns HÄR)
// ============================================

const SECTION_ID = 'ai-idag';
const SECTION_TITLE = 'Styrelsens olika roller';
const SECTION_SUBTITLE = 'Klicka på punkterna på bilden för att se var AI dyker upp i ditt liv.';
const SECTION_IMAGE_URL = '/styrelsen.jpg';
const BACKGROUND_AUDIO_URL = '/audio/background.mp3'; // <--- Bakgrundsljud HÄR
const SECTION_POINTS = 100;
const SECTION_ICON = Zap;
const COMPLETE_BUTTON_COLOR = "bg-slate-900";


const HOTSPOT_DATA = [
  {
    x: 15, y: 20,
    title: "Smartphone AI",
    icon: Phone,
    color: "bg-blue-500",
    description: "Din mobil är full av AI! Ansiktsigenkänning låser upp telefonen, röstassistenter som Siri förstår vad du säger, och autokorrigering hjälper dig skriva. Fotoappen kan till och med söka efter 'hund' eller 'semester' och hitta rätt bilder automatiskt.",
    examples: ["Face ID", "Siri/Google Assistant", "Autokorrigering", "Foto-sökning"],
    audioUrl: '/audio/test1.mp3' // <--- Modalljud HÄR
  },
  {
    x: 85, y: 25,
    title: "Streaming Services",
    icon: Play,
    color: "bg-red-500",
    description: "Netflix, Spotify och YouTube använder AI för att rekommendera innehåll du gillar. AI analyserar vad du tittar på, hur länge, vad du skippar - och hittar mönster för att föreslå nästa serie eller låt du kommer älska.",
    examples: ["Netflix rekommendationer", "Spotify Discover Weekly", "YouTube-förslag"],
    
    // 👇 NY RAD HÄR: Lägg till din video-URL (embed-format)
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1" // ERFÄTT MED DIN VIDEO-URL
},
  {
    x: 50, y: 45,
    title: "E-handel & Shopping",
    icon: ShoppingCart,
    color: "bg-green-500",
    description: "När du shoppar online använder AI för att visa produkter du troligen vill ha, optimera priser i realtid, och chatbots svarar på frågor 24/7. Amazon använder AI för att förutse vad du ska köpa innan du vet det själv!",
    examples: ["Produktrekommendationer", "Dynamic pricing", "Chatbots", "Fraud detection"],
    audioUrl: '/audio/test2.mp3'
  },
  // ... (Resten av hotspots)
];

// ============================================
// 2. 📦 UNDERKOMPONENTER (Inkl. Ljud-hooks och logik)
// ============================================

const Hotspot = ({ x, y, title, icon: Icon, color, onClick }) => {
    // ... (Hotspot JSX/Logik - Ingen ändring behövs)
    return (
        <motion.div
            className="absolute cursor-pointer group"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={onClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
        >
            {/* Pulse rings */}
            <motion.div
                className={`absolute inset-0 rounded-full ${color} opacity-30`}
                animate={{ scale: [1, 2, 2], opacity: [0.3, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{ width: '48px', height: '48px', marginLeft: '-24px', marginTop: '-24px' }}
            />
            {/* Main button */}
            <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white`}>
                {Icon && <Icon className="w-6 h-6 text-white" />}
            </div>
            {/* Tooltip on hover */}
            <div className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none">
                {title}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </div>
        </motion.div>
    );
};

// Modal Component (med UPPDATERAD ljudhantering)
// Modal Component (KORRIGERAD & FÖRENKLAD för Video/Audio)
const Modal = ({ isOpen, onClose, title, children, color = "bg-blue-500", audioUrl, videoUrl }) => {
    // VIKTIGT: Den komplexa useEffect-hooken för ljud har tagits bort. 
    // Vi använder istället HTML5 <audio controls autoPlay> i JSX.

    useEffect(() => {
        // Behåll endast overflow-hanteringen
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />
                
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50"
                >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto max-h-[90vh] flex flex-col">
                    {/* Header */}
                    <div className={`${color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                        <div className="relative flex items-center justify-between">
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="prose prose-slate max-w-none">
                            {/* 🚀 NY LOGIK HÄR: RENDERA VIDEO/AUDIO FÖRST 🚀 */}
                            
                            {/* 1. VIDEO EMBED (YouTube iframe) */}
                            {videoUrl && (
                                <div className="mb-6 relative" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                                    <iframe
                                        src={videoUrl} 
                                        title={title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                                    />
                                </div>
                            )}
                            
                            {/* 2. AUDIO PLAYER (Visas om audioUrl finns) */}
                            {audioUrl && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-slate-800 mb-2 flex items-center"><Volume2 className='w-4 h-4 mr-2' /> Lyssna:</h4>
                                    <audio controls autoPlay className="w-full rounded-lg">
                                        <source src={audioUrl} type="audio/mp3" />
                                        Din webbläsare stöder inte ljudelementet.
                                    </audio>
                                </div>
                            )}
                            
                            {/* 3. BARN-INNEHÅLLET (Den ursprungliga texten från InteractiveImage) */}
                            {children}
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="p-6 border-t border-slate-200 bg-slate-50">
                        <button
                        onClick={onClose}
                        className={`w-full ${color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
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
};


// InteractiveImage (med inbyggd ljudhantering)
const InteractiveImage = ({ imageUrl, hotspots, title, backgroundAudioUrl }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const buttonColor = "bg-[#FF5421]";
    
    // 1. Skapa Audio-objektet
    useEffect(() => {
        if (!backgroundAudioUrl) return;

        audioRef.current = new Audio(backgroundAudioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; 

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [backgroundAudioUrl]);

    // 2. Spela/Pausa logik
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Logik för bakgrundsljud, vi behöver inte hantera AbortError här
            // eftersom det startas av en användarklick och inte Strict Mode.
            audioRef.current.play().catch(error => console.warn("Kunde inte spela upp bakgrundsljud automatiskt:", error));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Hantera klick och stängning av modal
const handleHotspotClick = (hotspot) => {
    // VIKTIGT: Pausa bakgrundsljudet om hotspot har eget ljud
    if (hotspot.audioUrl && isPlaying) {
        setIsPlaying(false);
    }
    setActiveModal(hotspot);
};

const handleModalClose = () => {
    // Pausa/Återuppta-logiken togs bort här, vilket är korrekt.
    setActiveModal(null); 
}


    return (
        <div className="relative">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
              <p className="text-slate-600 text-sm">Klicka på de pulserande punkterna för mer info</p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-200">
                <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-auto"
                />
                
                {/* Ljudkontroll (visas bara om backgroundAudioUrl finns) */}
                {backgroundAudioUrl && (
                    <motion.button
                        className={`absolute top-4 left-4 z-10 w-12 h-12 rounded-full ${buttonColor} text-white flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    </motion.button>
                )}

                {/* Hotspots overlay */}
                <div className="absolute inset-0">
                    {hotspots.map((hotspot, index) => (
                        <Hotspot
                            key={index}
                            {...hotspot}
                            onClick={() => handleHotspotClick(hotspot)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for hotspot content */}
            {activeModal && (
                <Modal
                    isOpen={!!activeModal}
                    onClose={handleModalClose}
                    title={activeModal.title}
                    color={activeModal.color}
                    audioUrl={activeModal.audioUrl} // Skickar med URL
                    videoUrl={activeModal.videoUrl}
                >
                    <div className="prose prose-slate max-w-none">
                        {activeModal.icon && (
                            <div className="flex items-center justify-center mb-4">
                                <div className={`${activeModal.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                                <activeModal.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        )}
                        <p className="text-lg leading-relaxed">{activeModal.description}</p>
                        {activeModal.examples && (
                            <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                                <h4 className="font-bold text-slate-900 mb-2">Exempel:</h4>
                                <ul className="space-y-1">
                                    {activeModal.examples.map((example, i) => (
                                        <li key={i} className="text-sm text-slate-700">• {example}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

// ============================================
// 3. 🚀 EXPORTERBAR SLUTKOMPONENT (Modulen)
// ============================================

const AiDailyLifeSection = ({ isCompleted, onComplete }) => {
  const Icon = SECTION_ICON;
  
  return (
    <section data-section={SECTION_ID} className="min-h-screen flex items-center py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              <Icon className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
              {SECTION_TITLE}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {SECTION_SUBTITLE}
            </p>
          </div>

          <InteractiveImage
            imageUrl={SECTION_IMAGE_URL}
            hotspots={HOTSPOT_DATA} // Använder den hårdkodade datan
            title="Klicka på punkterna för att utforska detaljerna!"
            backgroundAudioUrl={BACKGROUND_AUDIO_URL} // Använder den hårdkodade URL:en
          />

          {!isCompleted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onComplete(SECTION_ID)}
              className={`mt-8 mx-auto block ${COMPLETE_BUTTON_COLOR} text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Slutför lektion ({SECTION_POINTS > 0 ? `+${SECTION_POINTS}p` : 'Klar'})</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AiDailyLifeSection;