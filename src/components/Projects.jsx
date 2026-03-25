import React from 'react';

// Importera dina bilder från mappen src/assets/images/
import projectImage1 from '../assets/images/project-image-1.png'; 
import projectImage2 from '../assets/images/project-image-2.png';
import projectImage3 from '../assets/images/project-image-3.png';

// Importera din video från mappen src/assets/videos/ (eller annan plats)
import projectVideo from '../assets/videos/project-video-1.mp4'; 

// En array med dina projektdata
const projects = [
  {
    id: 1,
    title: 'Wordpress 2007-2025',
    description: 'Det har byggts matsidor, ehandelslösningar, tidningar & hotellsidor genom åren. Är familjär med i princip varje plugin som är värd att nämna',
    type: 'image', // Ny egenskap
    mediaSrc: projectImage1, // Bytte namn för att vara mer generellt
    link: 'https://github.com/ditt-användarnamn/ditt-repo-1'
  },
  {
    id: 1,
    title: 'Wordpress 2007-2025',
    description: 'Det har byggts matsidor, ehandelslösningar, tidningar & hotellsidor genom åren. Är familjär med i princip varje plugin som är värd att nämna',
    type: 'image', // Ny egenskap
    mediaSrc: projectImage1, // Bytte namn för att vara mer generellt
    link: 'https://github.com/ditt-användarnamn/ditt-repo-1'
  },
   {
    id: 1,
    title: 'Wordpress 2007-2025',
    description: 'Det har byggts matsidor, ehandelslösningar, tidningar & hotellsidor genom åren. Är familjär med i princip varje plugin som är värd att nämna',
    type: 'image', // Ny egenskap
    mediaSrc: projectImage1, // Bytte namn för att vara mer generellt
    link: 'https://github.com/ditt-användarnamn/ditt-repo-1'
  },
  {
    id: 2,
    title: 'E-handelssida',
    description: 'Ett simulerat e-handelsprojekt med produktsidor, kundvagn och en enkel betalningsprocess. Byggd med Node.js och Express.',
    type: 'video', // Detta projekt använder video
    mediaSrc: projectVideo, // Här använder vi den importerade videon
    link: 'https://github.com/ditt-användarnamn/ditt-repo-2'
  },
  {
    id: 3,
    title: 'Mobil Väder-app',
    description: 'En responsiv väderapp som hämtar data från ett externt API. Designad med fokus på användarvänlighet och moderna gränssnitt.',
    type: 'image', // Detta projekt använder bild
    mediaSrc: projectImage3, // Bytte namn för att vara mer generellt
    link: 'https://github.com/ditt-användarnamn/ditt-repo-3'
  },
  
  
];

const Projects = () => {
  return (
    <section id="projects" className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Mina Projekt</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
              
              {/* Rendera antingen en video eller en bild beroende på 'type' */}
              {project.type === 'video' ? (
                <video 
                  src={project.mediaSrc} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img 
                  src={project.mediaSrc} 
                  alt={project.title} 
                  className="w-full h-48 object-cover" 
                />
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                  Se projektet på GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;