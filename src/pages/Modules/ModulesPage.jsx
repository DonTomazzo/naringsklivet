import { useState } from 'react';
import { motion } from 'framer-motion';
import ModuleCard2 from '../../components/ModuleCard2';
import { modulesData, categories } from '../../data/modules2.jsx';

export default function ModulesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALLA');
  
  const filteredModules = selectedCategory === 'ALLA' 
    ? modulesData 
    : modulesData.filter(module => module.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Våra <span className="text-yellow-300">Moduler</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Lär dig i din egen takt med våra interaktiva moduler. Från grunderna till avancerade koncept.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[#FF5421] text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredModules.map((module, index) => (
              <ModuleCard2
                key={module.id}
                module={module}
                delay={index * 0.1}
              />
            ))}
          </motion.div>

          {filteredModules.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-400">
                Inga moduler hittades i denna kategori ännu. 🚧
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Redo att börja lära dig?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Välj en modul ovan och starta din läranderesa idag!
          </p>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF5421]">
                {modulesData.length}
              </div>
              <div className="text-slate-400">Moduler</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF5421]">
                {modulesData.reduce((sum, m) => sum + m.students, 0).toLocaleString()}
              </div>
              <div className="text-slate-400">Studenter</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF5421]">
                {(modulesData.reduce((sum, m) => sum + m.rating, 0) / modulesData.length).toFixed(1)}
              </div>
              <div className="text-slate-400">Snittbetyg</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}