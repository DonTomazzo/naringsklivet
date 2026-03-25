// src/components/ImagePopup.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ImagePopup = ({ src, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Sätt en liten fördröjning för att CSS-övergången ska fungera
    // Detta låter komponenten renderas med scale-0 innan den byter till scale-100
    const timer = setTimeout(() => {
      setShow(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div 
        className={`
          relative w-4/5 max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg 
          transition-all duration-300 ease-in-out transform
          ${show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
        >
          <FaTimes size={24} />
        </button>
        <img src={src} alt="Popup" className="w-full h-auto rounded-md" />
      </div>
    </div>
  );
};

export default ImagePopup;