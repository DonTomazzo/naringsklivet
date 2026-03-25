import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const ModuleBackButton = ({ onBack }) => {
  return (
    <div className="fixed top-24 left-6 z-30 hidden lg:block">
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-[#FF5421] px-4 py-3 rounded-xl shadow-lg transition-all group"
      >
        <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-[#FF5421] transition-colors" />
        <div className="text-left">
          <div className="text-xs text-slate-500 group-hover:text-[#FF5421] transition-colors">
            Tillbaka till
          </div>
          <div className="text-sm font-semibold text-slate-800 group-hover:text-[#FF5421] transition-colors">
            Alla moduler
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default ModuleBackButton;