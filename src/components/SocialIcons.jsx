// src/components/SocialIcons.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex items-center space-x-6">
      <a 
        href="https://www.linkedin.com/in/dittanvändarnamn" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-teal-400 transition-colors duration-200 bg-transparent"
      >
        <FaLinkedin size={36} />
      </a>
      <a 
        href="https://github.com/dittanvändarnamn" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-teal-400 transition-colors duration-200 bg-transparent"
      >
        <FaGithub size={36} />
      </a>
    </div>
  );
};

export default SocialIcons;