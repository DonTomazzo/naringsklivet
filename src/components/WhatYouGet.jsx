import { motion } from 'framer-motion';
import { CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    icon: "/icon1.png",
    title: "Kunskap",
    bg: "bg-white",
    border: "border-gray-200",
    items: [
      "14 moduler med praktiska AI-verktyg och metoder",
      "Videolektioner du ser i din egen takt",
      "Övningar direkt kopplade till din arbetsdag",
      "Konkreta exempel från verkliga arbetssituationer",
    ],
  },
  {
    icon: "/icon2.png",
    title: "Verktyg",
    bg: "bg-[#F8F7F4]",
    border: "border-gray-200",
    items: [
      "Färdiga promptmallar för vanliga arbetsuppgifter",
      "AI-verktygskartan 2026 – kategoriserad och uppdaterad",
      "Checklistor för säker AI-användning på jobbet",
      "Övningsuppgifter du kan applicera direkt",
    ],
  },
  {
    icon: "/icon3.png",
    title: "Trygghet",
    bg: "bg-white",
    border: "border-gray-200",
    items: [
      "Certifikat som visar att du genomfört utbildningen",
      "365 dagars åtkomst till allt material",
      "Uppdateras löpande när nya verktyg lanseras",
      "Stöd via e-post om du kör fast",
    ],
  },
];

const WhatYouGet = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block px-4 py-2 rounded-full font-semibold text-white text-sm mb-4"
            style={{ backgroundColor: '#FF5421' }}
          >
            VAD INGÅR?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Det här ingår i AI-träningsprogrammet
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Allt du behöver för att börja använda AI smartare – från dag ett
          </p>
        </motion.div>

        {/* Tre kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {columns.map((col, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className={`rounded-2xl border ${col.border} ${col.bg} p-7 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={col.icon} alt={col.title} className="w-12 h-12 object-contain flex-shrink-0" />
                <h3 className="text-lg font-bold text-[#1A1A1A]">{col.title}</h3>
              </div>

              <div className="h-px bg-gray-200 mb-5" />

              <ul className="space-y-3.5 flex-1">
                {col.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={17} className="mt-0.5 flex-shrink-0" style={{ color: '#FF5421' }} />
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom value statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-[#171f32] text-white p-7 sm:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-1.5 justify-center md:justify-start mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-current" />
              ))}
              <span className="text-white/60 text-sm ml-1">
                Lanseras 2026 · Introduktionspris
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
              INTRODUKTIONSPRIS! AI-träningsprogrammet +{' '}
              <span style={{ color: '#FF5421' }}>certifikat ingår</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Varje dag utan AI-kunskaper är en dag din konkurrent ligger steget före.
              Näringsklivets träningsprogram ger dig verktygen att jobba smartare – redan från första modulen.
            </p>
          </div>

          <div className="text-center shrink-0">
            <div className="text-white/40 text-sm line-through mb-1">Ord. pris 2 995 kr</div>
            <div className="text-4xl sm:text-5xl font-bold mb-1" style={{ color: '#FF5421' }}>
              1 995 kr
            </div>
            <div className="text-white/50 text-sm mb-5">exkl. moms · 365 dagars åtkomst</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/purchase/naringsklivet-ai')}
              className="px-8 py-4 rounded-xl font-bold text-white text-base shadow-lg min-h-[52px]"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            >
              Kom igång idag →
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhatYouGet;