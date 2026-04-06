// src/components/CourseElements/SplitSlide.tsx
// Ljus slide med text till vänster och bild till höger.
// Används som alternativ till BgSlide för ett mer pedagogiskt utseende.
// Hela skärmen utnyttjas, ingen mörk overlay.

import React from 'react';
import { motion } from 'framer-motion';

const O  = '#FF5421';
const OD = '#E04619';

interface SplitSlideProps {
  badge?: string;
  title: string;             // Stöder <span> för orange ord
  titleHtml?: string;        // Alternativt: HTML-sträng med <span style="color:#FF5421">
  ingress?: string;
  bild: string;
  bildAlt?: string;
  bildPosition?: 'right' | 'left';   // default: right
  dark?: boolean;                     // Ljus (default) eller mörk bakgrund
  children: React.ReactNode;          // Innehållet — punkter, kort, lista etc.
  badge2?: string;                    // Liten floating badge på bilden
  badge2Sub?: string;
}

const SplitSlide: React.FC<SplitSlideProps> = ({
  badge,
  title,
  ingress,
  bild,
  bildAlt = '',
  bildPosition = 'right',
  dark = false,
  children,
  badge2,
  badge2Sub,
}) => {
  const bg       = dark ? '#171f32'  : '#FAFAF8';
  const textMain = dark ? 'white'    : '#1A1A1A';
  const textSub  = dark ? 'rgba(255,255,255,0.6)' : '#6B7280';
  const badgeBg  = dark ? `${O}25`  : '#FFF0EB';

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: bildPosition === 'right' ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center min-h-full py-10 px-6 sm:px-10 lg:px-14 pb-24"
    >
      {badge && (
        <div className="inline-block self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: badgeBg, color: O }}>
          {badge}
        </div>
      )}

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5"
        style={{ color: textMain, fontFamily: "'Nunito', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {ingress && (
        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-md" style={{ color: textSub }}>
          {ingress}
        </p>
      )}

      <div className="space-y-0">{children}</div>
    </motion.div>
  );

  const bildCol = (
    <motion.div
      initial={{ opacity: 0, x: bildPosition === 'right' ? 24 : -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full"
    >
      <img
        src={bild}
        alt={bildAlt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          borderRadius: bildPosition === 'right'
            ? '1.5rem 0 0 1.5rem'
            : '0 1.5rem 1.5rem 0',
        }}
      />
      {badge2 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-6 px-5 py-3.5 rounded-2xl shadow-xl"
          style={{ background: 'white' }}
        >
          <p className="font-black text-xl" style={{ color: O }}>{badge2}</p>
          {badge2Sub && <p className="text-xs text-gray-500 mt-0.5">{badge2Sub}</p>}
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div
      className="h-full overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      style={{ background: bg, paddingTop: 'var(--header-height, 0px)' }}
    >
      {bildPosition === 'right' ? (
        <>
          <div className="overflow-y-auto h-full">{textCol}</div>
          <div className="hidden lg:flex relative h-full">{bildCol}</div>
        </>
      ) : (
        <>
          <div className="hidden lg:flex relative h-full">{bildCol}</div>
          <div className="overflow-y-auto h-full">{textCol}</div>
        </>
      )}
    </div>
  );
};

export default SplitSlide;

// ─── Hjälpkomponenter att använda inuti SplitSlide ───────

// Numrerade steg (som på bilden)
export const StegLista = ({ steg }: {
  steg: { nr: string; titel: string; desc?: string }[]
}) => (
  <div className="space-y-0">
    {steg.map((s, i) => (
      <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
        <span className="text-2xl font-black flex-shrink-0 w-10 leading-tight"
          style={{ color: 'rgba(255,84,33,0.4)' }}>
          {s.nr}
        </span>
        <div>
          <p className="font-bold text-gray-900 text-sm sm:text-base">{s.titel}</p>
          {s.desc && <p className="text-gray-500 text-sm mt-0.5">{s.desc}</p>}
        </div>
      </div>
    ))}
  </div>
);

// Enkel punktlista med orange checkmark
export const CheckLista = ({ punkter, dark = false }: {
  punkter: string[];
  dark?: boolean;
}) => (
  <div className="space-y-3">
    {punkter.map((p, i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: O }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-sm sm:text-base" style={{ color: dark ? 'rgba(255,255,255,0.8)' : '#374151' }}>{p}</p>
      </div>
    ))}
  </div>
);

// Två-kolumns faktarutor
export const FaktaGrid = ({ fakta, dark = false }: {
  fakta: { icon: string; titel: string; text: string }[];
  dark?: boolean;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {fakta.map((f, i) => (
      <div key={i} className="rounded-2xl p-4 border"
        style={{
          background: dark ? 'rgba(255,255,255,0.06)' : 'white',
          borderColor: dark ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
        }}>
        <span className="text-2xl block mb-2">{f.icon}</span>
        <p className="font-bold text-sm mb-1" style={{ color: dark ? 'white' : '#111827' }}>{f.titel}</p>
        <p className="text-xs leading-relaxed" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#6B7280' }}>{f.text}</p>
      </div>
    ))}
  </div>
);

// Orange info-ruta
export const InfoRuta = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl p-4 mt-6 border-l-4" style={{ borderColor: O, background: '#FFF0EB' }}>
    <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
  </div>
);
