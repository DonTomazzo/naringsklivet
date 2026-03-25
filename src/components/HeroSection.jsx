import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SimpleContactForm } from "./MultiStepForm"; // Importera nya komponenten
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ onSearch }) {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Gör lärandet roligt — skapa, dela och gå quiz på Lurndt
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl">
              Tusentals gratis quiz. Perfekt för onboarding, utbildningar och
              snabb repetition. Helt gratis — inget betalt än.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all">
                Utforska quiz
              </button>

              <button className="px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white shadow-lg transition-all">
                Skapa quiz
              </button>
            </div>

            <div className="mt-6">
              <div className="relative max-w-md">
                <input
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full rounded-full bg-gray-800/50 border border-gray-700 px-4 py-2 pr-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                  placeholder="Sök quiz, ämne eller kurs..."
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            {/* ✅ NYTT: Ersatt illustration med kontaktformulär */}
            <SimpleContactForm 
              onContinue={() => navigate('/contact-complete')} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}