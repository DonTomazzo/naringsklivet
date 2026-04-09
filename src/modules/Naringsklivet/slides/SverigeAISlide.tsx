// src/modules/Naringsklivet/slides/SverigeAISlide.tsx
// Slide: Sverige och AI – statistik och varför du sitter här
// Källa: Great Place to Work European Workforce Study 2025,
//        Internetstiftelsen Svenskarna och internet 2025, EY Work Reimagined 2024

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

const O    = '#FF5421';
const OD   = '#E04619';
const DARK = '#0f1623';

const BgSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div
    className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}
  >
    {text}
  </div>
);

export const SverigeAISlide: React.FC = () => {
  const stats = [
    {
      siffra: '17/19',
      label: 'Sveriges placering i Europa',
      sub: 'Motivation att förbättra jobbet med AI',
      källa: 'Great Place to Work, European Workforce Study 2025',
      varning: true,
    },
    {
      siffra: '27%',
      label: 'Motiverade att använda AI på jobbet',
      sub: 'Europa-snittet är 34%. Spanien toppar med 43%.',
      källa: 'Great Place to Work 2025',
      varning: true,
    },
    {
      siffra: '28%',
      label: 'Använder AI i sitt arbete',
      sub: '42% av tjänstemän – men bara 10% av arbetare',
      källa: 'Internetstiftelsen, Svenskarna och internet 2025',
      varning: false,
    },
    {
      siffra: '22%',
      label: 'Tycker arbetsgivaren satsar tillräckligt',
      sub: 'På att förbättra medarbetarnas AI-kompetens',
      källa: 'Great Place to Work 2025',
      varning: true,
    },
  ];

  return (
    <BgSlide>
      <Badge text="Avsnitt 02 · Sverige och AI" />

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <BarChart2 className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
        Sverige halkar efter – och det är en möjlighet
      </h2>

      <p className="text-white/70 text-base leading-relaxed mb-8">
        Sverige är ett av världens nöjdaste länder att arbeta i – men när det gäller AI
        hamnar vi näst sist i Europa. Det betyder att du som lär dig nu ligger i absolut
        framkant.
      </p>

      {/* Statistikkort */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl p-5 border"
            style={{
              background: s.varning ? 'rgba(239,68,68,0.08)' : `${O}12`,
              border: s.varning ? '1px solid rgba(239,68,68,0.25)' : `1px solid ${O}30`,
            }}
          >
            <p
              className="text-4xl font-black mb-1"
              style={{ color: s.varning ? '#f87171' : O }}
            >
              {s.siffra}
            </p>
            <p className="text-white font-bold text-sm mb-1">{s.label}</p>
            <p className="text-white/50 text-xs mb-3 leading-snug">{s.sub}</p>
            <p className="text-white/25 text-xs italic">Källa: {s.källa}</p>
          </motion.div>
        ))}
      </div>

      {/* Klyftan tjänstemän vs arbetare */}
      <div
        className="rounded-2xl p-5 border mb-6"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>
          Klyftan på svenska arbetsplatser
        </p>
        <div className="space-y-3">
          {[
            { label: 'Tjänstemän', pct: 42, color: O },
            { label: 'Arbetare',   pct: 10, color: '#60a5fa' },
          ].map((bar, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-white/70 text-sm">{bar.label}</span>
                <span className="text-white font-bold text-sm">{bar.pct}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: bar.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs mt-3 italic">
          Källa: Internetstiftelsen, Svenskarna och internet 2025
        </p>
      </div>

      {/* Takeaway */}
      <div
        className="rounded-xl p-4 border-l-4"
        style={{ borderColor: O, background: `${O}12` }}
      >
        <p className="text-white text-sm leading-relaxed">
          <span className="font-bold" style={{ color: O }}>Det här betyder för dig: </span>
          De som lär sig använda AI produktivt nu bygger ett försprång som är svårt att
          ta igen. Det är inte en fråga om ifall AI förändrar arbetslivet – det är en
          fråga om när du väljer att hänga på.
        </p>
      </div>
    </BgSlide>
  );
};

export default SverigeAISlide;
