import React from 'react';
// Importera två olika bilder här
import myImage1 from '../assets/my-image-1.png';
import myImage2 from '../assets/my-image-2.jpg';

const About = () => {
  return (
    <section id="about" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl"> {/* Maxbredden har ökats */}
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">Om mig</h2>
        <div className="flex flex-col md:flex-row items-start md:space-x-8">
          
          {/* Vänstra bilden */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <img 
              src={myImage1} 
              alt="Beskrivning av bild 1" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>
          
          {/* Texten i mitten */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <p className="text-lg text-gray-400 mb-4">
              Här kan du skriva en kort introduktion om dig själv. Berätta om dina erfarenheter, din passion för webbutveckling, och vad som driver dig.
            </p>
            <p className="text-lg text-gray-400">
              Du kan lägga till fler stycken eller punkter här för att ge mer information om din bakgrund och dina färdigheter.
            </p>
          </div>
          
          {/* Högra bilden */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <img 
              src={myImage2} 
              alt="Beskrivning av bild 2" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;