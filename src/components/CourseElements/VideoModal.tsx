import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  
  // Förhindra scrollning när modal är öppen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Stäng med Escape-tangenten
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700">
                {title && (
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-[#FF5421]" />
                    {title}
                  </h3>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                  aria-label="Stäng video"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative bg-black" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  src={videoUrl}
                  title={title || 'Video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>

              {/* Footer (optional) */}
              <div className="p-4 bg-slate-800/50 border-t border-slate-700">
                <p className="text-sm text-slate-400 text-center">
                  Tryck <kbd className="px-2 py-1 bg-slate-700 rounded text-white text-xs">ESC</kbd> eller klicka utanför för att stänga
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;






