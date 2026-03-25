import React, { useState } from 'react';
import backgroundVideo from '../assets/background-video.mp4';
import ReactCompareImage from 'react-compare-image';
import youngImage from '../assets/young-image.jpg';
import currentImage from '../assets/current-image.jpg';

const Hero = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openCompareImagePopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <section 
      id="hero" 
      className="flex flex-col items-center justify-center h-screen text-white p-6 relative overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Din webbläsare stöder inte video-taggen.
      </video>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Letar ni efter en <span className="text-teal-400">kreativ utvecklingspartner?</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-8">
          Passionerade fullstack-utvecklare som gör video, webb och ljud.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#projects"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Se mina projekt
          </a>
          <a
            href="#"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              openCompareImagePopup();
            }}
          >
            Se min tidsresa
          </a>
          <a
            href="#contact"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Kontakta mig
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closePopup}
        >
          <div className="relative w-full max-w-5xl p-4" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={closePopup} 
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
      )}
    </section>
  );
};

export default Hero;