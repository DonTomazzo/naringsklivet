import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

interface VideoButtonProps {
  videoUrl: string;
  buttonText?: string;
  videoTitle?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const VideoButton: React.FC<VideoButtonProps> = ({ 
  videoUrl, 
  buttonText = "Se introduktionsvideo",
  videoTitle = "Introduktionsvideo",
  variant = 'outline'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Olika button-stilar baserat på variant
  const variantStyles = {
    primary: "bg-[#FF5421] text-white hover:bg-[#E04A1D]",
    secondary: "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30",
    outline: "bg-transparent text-white border-2 border-white/40 hover:border-white/60 hover:bg-white/10"
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className={`${variantStyles[variant]} px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2`}
      >
        <Play className="w-5 h-5" />
        <span>{buttonText}</span>
      </motion.button>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
        title={videoTitle}
      />
    </>
  );
};

export default VideoButton;






