// src/components/AudioPlayerCompact.tsx
// Play-knapp för audio och/eller video.
// Om videoUrl finns → öppnar VideoModal vid klick.
// Om audioSrc finns → spelar upp ljud med pulse-animation.
// Tid visas vid hover (bara för audio).

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoModal from './CourseElements/VideoModal';

interface Props {
  audioSrc?: string;
  videoUrl?: string;
  videoTitle?: string;
}

const AudioPlayerCompact = ({ audioSrc, videoUrl, videoTitle }: Props) => {
  const [isPlaying, setIsPlaying]     = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [hovered, setHovered]         = useState(false);
  const [videoOpen, setVideoOpen]     = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isVideo = !!videoUrl;

  // Nollställ audio vid slide-byte
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioSrc]);

  const handleClick = () => {
    if (isVideo) {
      setVideoOpen(true);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else           audioRef.current.play();
    setIsPlaying(p => !p);
  };

  const fmt = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const timeLabel = !isVideo && duration
    ? (currentTime > 0 ? `${fmt(currentTime)} / ${fmt(duration)}` : fmt(duration))
    : '';

  const showPulse = isVideo ? !videoOpen : !isPlaying;

  return (
    <>
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Pulse-ringar – försvinner vid uppspelning/öppnad modal */}
        {showPulse && (
          <>
            <motion.span
              className="absolute rounded-full pointer-events-none"
              animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              style={{ width: 44, height: 44, background: 'rgba(255,84,33,0.25)' }}
            />
            <motion.span
              className="absolute rounded-full pointer-events-none"
              animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
              style={{ width: 44, height: 44, background: 'rgba(255,84,33,0.2)' }}
            />
          </>
        )}

        {/* Tooltip – tid för audio, "Se video" för video */}
        <AnimatePresence>
          {hovered && (timeLabel || isVideo) && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-10"
            >
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-md tabular-nums"
                style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.8)' }}
              >
                {isVideo ? 'Se video' : timeLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Knapp */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          onClick={handleClick}
          className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg z-10"
          style={{ background: '#FF5421' }}
        >
          <AnimatePresence mode="wait">
            {isVideo ? (
              <motion.span key="video" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                <Video className="w-4 h-4 text-white" />
              </motion.span>
            ) : isPlaying ? (
              <motion.span key="pause" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                <Pause className="w-4 h-4 text-white" />
              </motion.span>
            ) : (
              <motion.span key="play" initial={{ scale: 0.6 }} animate={{ scale: 1 }} exit={{ scale: 0.6 }}>
                <Play className="w-4 h-4 text-white ml-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Audio-element */}
        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
            onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
          />
        )}
      </div>

      {/* Video-modal */}
      {isVideo && (
        <VideoModal
          isOpen={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={videoUrl!}
          title={videoTitle}
        />
      )}
    </>
  );
};

export default AudioPlayerCompact;