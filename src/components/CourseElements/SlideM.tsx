// src/components/CourseElements/SlideM.tsx
// Broschyr kortgrid + snabbfakta-remsa (sand/cream/vit bakgrund med blobbar)

import React from 'react';
import { motion } from 'framer-motion';

const O     = '#FF5421';
const NAVY  = '#171f32';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';

export interface SlideMKort {
  nr: string;
  titel: string;
  kort: string;
  variant: 'navy' | 'orange' | 'sand' | 'cream';
}

export interface SlideMProps {
  eyebrow?: string;
  rubrik: string;
  ingress?: string;
  kort: SlideMKort[];
  snabbfakta?: { etikett: string; värde: string }[];
  bg?: 'sand' | 'cream' | 'white';
}

const kortFärg = (variant: SlideMKort['variant']) => {
  switch (variant) {
    case 'navy':   return { bg: NAVY,  text: '#fff',  sub: 'rgba(255,255,255,0.60)', nr: 'rgba(255,255,255,0.22)' };
    case 'orange': return { bg: O,     text: '#fff',  sub: 'rgba(255,255,255,0.72)', nr: 'rgba(255,255,255,0.28)' };
    case 'sand':   return { bg: SAND,  text: NAVY,    sub: MID,                       nr: `${O}38` };
    case 'cream':  return { bg: CREAM, text: NAVY,    sub: MID,                       nr: `${O}38` };
  }
};

const SlideM: React.FC<SlideMProps> = ({ eyebrow, rubrik, ingress, kort, snabbfakta, bg = 'sand' }) => {
  const bakgrund = bg === 'cream' ? CREAM : bg === 'white' ? '#fff' : SAND;

  return (
    <div style={{ height: '100%', background: bakgrund, overflowY: 'auto', position: 'relative' }}>
      <svg style={{ position: 'absolute', top: -40, right: -60, width: 320, height: 295, opacity: 0.50, pointerEvents: 'none' }} viewBox="0 0 320 295">
        <path d="M172,26 C230,7 302,52 290,136 C278,220 208,272 140,256 C72,240 12,172 30,98 C48,24 114,45 172,26Z" fill={SAND2}/>
      </svg>
      <svg style={{ position: 'absolute', bottom: -28, left: -38, width: 240, height: 220, opacity: 0.38, pointerEvents: 'none' }} viewBox="0 0 240 220">
        <path d="M116,20 C156,5 210,36 204,94 C198,152 154,190 104,182 C54,174 8,132 16,78 C24,24 76,35 116,20Z" fill={CREAM}/>
      </svg>

      <div style={{ padding: '48px 40px', position: 'relative', zIndex: 10 }}>
        {eyebrow && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>{eyebrow}</p>}
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 900, color: NAVY, lineHeight: 1.08, fontFamily: "'Nunito', sans-serif", margin: '0 0 10px', letterSpacing: '-0.01em' }}>{rubrik}</h2>
        {ingress && <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', color: MID, lineHeight: 1.7, fontFamily: "'Nunito', sans-serif", maxWidth: 540, margin: '0 0 28px' }}>{ingress}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 12, marginBottom: snabbfakta ? 20 : 0 }}>
          {kort.map((k, i) => {
            const s = kortFärg(k.variant);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ background: s.bg, borderRadius: 14, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 150 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: s.nr, fontFamily: "'Nunito', sans-serif", lineHeight: 1 }}>{k.nr}</span>
                <p style={{ fontSize: 15, fontWeight: 800, color: s.text, fontFamily: "'Nunito', sans-serif", margin: 0, lineHeight: 1.25 }}>{k.titel}</p>
                <p style={{ fontSize: 12, color: s.sub, lineHeight: 1.55, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{k.kort}</p>
              </motion.div>
            );
          })}
        </div>

        {snabbfakta && (
          <div style={{ borderRadius: 12, background: CREAM, border: `1px solid ${SAND2}`, padding: '14px 20px', display: 'grid', gridTemplateColumns: `repeat(${Math.min(snabbfakta.length, 4)}, 1fr)`, gap: 8 }}>
            {snabbfakta.map((f, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${SAND2}` : 'none', paddingLeft: i > 0 ? 14 : 0 }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 3px' }}>{f.etikett}</p>
                <p style={{ fontSize: 'clamp(12px, 1.3vw, 14px)', fontWeight: 800, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{f.värde}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideM;