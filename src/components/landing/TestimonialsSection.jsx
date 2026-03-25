import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = ({ testimonials }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 sm:py-20 relative bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')" }}>
      <div className="absolute inset-0 bg-slate-900/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Vad säger våra deltagare?
          </h2>
          <p className="text-lg text-white/80">Verkliga resultat från verkliga styrelseledamöter</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <img src={testimonials[active].image} alt={testimonials[active].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white flex-shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-lg">{testimonials[active].name}</div>
                <div className="text-slate-600 text-sm">{testimonials[active].role}</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-current" />)}
                </div>
              </div>
            </div>
            <blockquote className="text-slate-800 text-lg sm:text-xl italic mb-5 leading-relaxed">
              "{testimonials[active].text}"
            </blockquote>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="font-bold mb-1" style={{ color: '#FF5421' }}>
                Konkret resultat: {testimonials[active].result}
              </div>
              <div className="text-slate-600 italic text-sm">{testimonials[active].beforeAfter}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                active === i ? 'w-8 bg-[#FF5421]' : 'w-3 bg-white/40 hover:bg-white/60'
              }`} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;