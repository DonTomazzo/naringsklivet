// src/components/VideoPopup.jsx
import React from 'react';

const VideoPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div className="relative w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-white text-3xl md:text-4xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center border border-white focus:outline-none"
        >
          &times;
        </button>
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/5K4fA0l4s04?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;