// src/components/Knowledge.jsx
import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

const skills = [
  { name: 'Wordpress +20 år', percentage: 100 },
  { name: 'Woocommerce', percentage: 90 },
  { name: 'Shopify', percentage: 90 },
  { name: 'Beatmaker/mix/master', percentage: 90 },
  { name: 'CSS', percentage: 85 },
  { name: 'JavaScript', percentage: 80 },
  { name: 'React', percentage: 75 },
  { name: 'Tailwind CSS', percentage: 95 },
  { name: 'Node.js', percentage: 65 },
  { name: 'Express.js', percentage: 60 },
  { name: 'MongoDB', percentage: 55 },
];

const Knowledge = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const sectionRef = useRef(null);

  // Denna useEffect hanterar IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Denna useEffect lyssnar på `isVisible` och triggar konfettin
  useEffect(() => {
    if (isVisible) {
      // Visa konfettin efter en kort fördröjning
      const showTimer = setTimeout(() => {
        setShowConfetti(true);
      }, 500);
      
      // Stäng av konfettin efter några sekunder
      const hideTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 3500); // 500ms + 3000ms

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible]);

  return (
    <section id="knowledge" ref={sectionRef} className="py-20 bg-gray-900 text-white">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }}
          colors={['#FFD700', '#DAA520', '#B8860B', '#FFBF00']}
        />
      )}
      <div className="max-w-6xl mx-auto px-8"> 
        <h2 className="text-4xl font-bold text-center mb-12">Mina kunskaper</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-medium">{skill.name}</span>
                <span className="text-sm font-medium">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ease-in-out bg-teal-500`}
                  style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Knowledge;