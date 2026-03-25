Absolut! Här är den kompletta och korrekta versionen av YouTubePlayer-komponenten, helt fristående.

Denna komponent inkluderar all logik (tillstånd, URL-generering) internt och tar emot de variabla delarna (videoId och title) som props.

🎬 Komplett YouTubePlayer.jsx Komponent
JavaScript

import React, { useState } from 'react';
// Antar att du har Framer Motion installerat
import { motion } from 'framer-motion'; 

/**
 * En återanvändbar komponent för att visa en YouTube-video med 
 * en klickbar förhandsgranskningsbild (thumbnail) som laddar videon 
 * först vid klick för bättre prestanda.
 * * @param {string} videoId - Det unika ID:t för YouTube-videon (t.ex. "qz0aGYrrlhU").
 * @param {string} title - Tillgänglighetstiteln för iFrame:n.
 */
function YouTubePlayer({ videoId = "qz0aGYrrlhU", title = "Embedded video" }) {
  
  // 1. Tillstånd (State): Ligger INUTI komponenten där det används.
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 2. Data/URL:er: Genereras INUTI komponenten baserat på prop.
  // Genererar URL för högsta upplösningen av YouTube-thumbnail.
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; 
  
  // YouTube embed URL. Lägg till autoplay=1 för att starta vid klick.
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  // CSS-stil för 16:9-format (behövs för responsiv iFrame)
  const aspectRatioStyle = { paddingBottom: '56.25%', height: 0, maxWidth: '900px' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-2xl" 
      style={aspectRatioStyle}
    >
      {/* Villkorlig Rendering: Visar Bild ELLER Video baserat på isPlaying */}
      {!isPlaying ? (
        // --- BILDLAGER (Thumbnail Overlay) ---
        <div 
          className="absolute top-0 left-0 w-full h-full cursor-pointer bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
          // Vid klick ändras tillståndet, vilket renderar iFrame:n
          onClick={() => setIsPlaying(true)}
          role="button" 
          aria-label={`Spela upp video: ${title}`}
        >
          {/* Play-knappens overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition hover:bg-opacity-10">
            {/* Play-ikon (SVG) */}
            <svg 
              className="w-20 h-20 text-white opacity-80" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      ) : (
        // --- VIDEOLAGER (iFrame) ---
        <iframe
          // Använd en key för att säkerställa att iFrame laddas om vid ändring av videoId
          key={videoId} 
          src={videoUrl} 
          title={title}
          frameBorder="0"
          // allow-attributen är nödvändiga för att video och autoplay ska fungera
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      )}
    </motion.div>
  );
}

export default YouTubePlayer;