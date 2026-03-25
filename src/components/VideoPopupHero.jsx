// src/components/VideoPopupHero.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // För att använda Lucide-ikonen för stängning

// Exempel på en YouTube "embed" URL. 
// Denna URL är konverterad från https://youtu.be/ifK5ANGy_VI
// OBS! videoUrl prop:en du skickar till denna komponent MÅSTE vara i detta embed-format.
// Exempel på hur du skickar URL:en från en förälderkomponent:
// videoUrl="https://www.youtube.com/embed/ifK5ANGy_VI"

const VideoPopupHero = ({ isOpen, onClose, videoUrl }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    // Dimmer/Bakgrund
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 cursor-pointer"
                >
                    <motion.div
                        // Modal Fönster (Skalar upp från mitten)
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()} // Hindrar stängning vid klick i modalen
                        className="relative w-full max-w-4xl h-auto rounded-xl shadow-2xl overflow-visible cursor-default"
                    >
                        {/* Stängknapp */}
                        <button
                            onClick={onClose}
                            className="absolute -top-4 -right-4 bg-white text-black p-2 rounded-full shadow-lg border-2 border-slate-300 transition-all hover:bg-slate-200 z-10"
                        >
                            <X size={24} />
                        </button>
                        
                        {/* Video Behållare */}
                        <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full border-0"
                                // Sätter autoplay=1 för att starta direkt
                                src={`${videoUrl}?autoplay=1`} 
                                title="Transformation Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoPopupHero;