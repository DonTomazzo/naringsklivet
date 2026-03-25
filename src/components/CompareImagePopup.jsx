// src/components/CompareImagePopup.jsx
import React from 'react';
import ReactCompareImage from 'react-compare-image';
import youngImage from '../assets/young-image.jpg';
import currentImage from '../assets/current-image.jpg';

const CompareImagePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div className="relative w-full max-w-xl p-4" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center border border-white focus:outline-none"
        >
          ×
        </button>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <ReactCompareImage 
            leftImage={currentImage} 
            rightImage={youngImage}
            sliderPositionPercentage={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CompareImagePopup;