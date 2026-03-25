import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mb-6 max-w-md"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="bg-[#FF5421] hover:bg-[#E04A1D] text-white p-3 rounded-full transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Lyssna på avsnittet här</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 bg-white/20 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-[#FF5421] h-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  );
};

export default AudioPlayer;