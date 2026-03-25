// src/components/Gallery.jsx
import React from 'react';

const Gallery = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto my-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Galleri bild ${index + 1}`}
          onClick={() => onImageClick(index)}
          className="w-full h-auto rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
        />
      ))}
    </div>
  );
};

export default Gallery;