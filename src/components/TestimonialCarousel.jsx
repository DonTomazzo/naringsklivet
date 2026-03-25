import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Importera ikoner och andra beroenden du använder, t.ex.
// import { Star } from 'lucide-react'; 

const TestimonialCarousel = ({ testimonials, activeTestimonial, setActiveTestimonial, StarIcon }) => {
  // Sätter upp ikon-komponenten som en prop (StarIcon), eller importera direkt om du vet källan.

  return (
    // Centrera och lägg till padding inuti karusellen
    <div className="mx-auto space-y-8 max-w-4xl"> 
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }} // Lägg till en övergångstid
          // Använd full bredd för kortet
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl" 
        >
          <div className="flex items-start gap-6 mb-6">
            <img 
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/70 flex-shrink-0"
            />
            <div>
              <div className="font-extrabold text-slate-900 text-xl mb-1">{testimonials[activeTestimonial].name}</div>
              <div className="text-slate-600 text-base">{testimonials[activeTestimonial].role}</div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
          
          <blockquote className="text-slate-800 text-xl italic leading-relaxed mb-6">
            <span className="text-3xl font-serif text-slate-400 mr-2">"</span>
            {testimonials[activeTestimonial].text}
            <span className="text-3xl font-serif text-slate-400 ml-2">"</span>
          </blockquote>
          
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <div className="font-bold text-green-600 text-lg mb-1 flex items-center">
              🎯 Konkret resultat: {testimonials[activeTestimonial].result}
            </div>
            <div className="text-slate-600">
              {testimonials[activeTestimonial].beforeAfter}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigationsprickar */}
      <div className="flex justify-center gap-2 pt-4"> 
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            onClick={() => setActiveTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeTestimonial === index ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            aria-label={`Visa testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;