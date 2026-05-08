// src/components/CourseElements/SlideL.tsx
// Broschyr split: navy vänster med blobbar + målgrupper, cream/sand/vit höger med lista

import React from 'react';
import { motion } from 'framer-motion';

const O     = '#FF5421';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const NAVY3 = '#2a3f55';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';

export interface SlideLTargetgrupp {
  titel: string;
  desc: string;
  accentColor?: string;
}

export interface SlideLItem {
  accent: string;
  titel: string;
  desc: string;
}

export interface SlideLProps {
  eyebrow?: string;
  rubrik: string;
  subRubrik?: string;
  ingress?: string;
  målgrupper?: SlideLTargetgrupp[];
  listaRubrik?: string;
  lista: SlideLItem[];
  högerBg?: 'white' | 'cream' | 'sand';
}

const SlideL: React.FC<SlideLProps> = ({
  eyebrow, rubrik, subRubrik, ingress, målgrupper,
  listaRubrik = 'Avsnitten', lista, högerBg = 'cream',
}) => {
  const högerBakgrund = högerBg === 'cream' ? CREAM : högerBg === 'sand' ? SAND : '#FFFFFF';

  return (
    <div style={{ height: '100%', display: 'flex', overflow: 'hidden' }}>

      {/* VÄNSTER: navy med blobbar */}
      <div
        style={{ width: '42%', flexShrink: 0, background: NAVY, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 36px' }}
        className="hidden lg:flex"
      >
        <svg style={{ position: 'absolute', top: -40, right: -50, width: 260, height: 240, opacity: 0.80 }} viewBox="0 0 260 240">
          <path d="M148,22 C194,6 254,48 246,118 C238,188 182,238 122,226 C62,214 16,158 32,90 C48,22 102,38 148,22Z" fill={NAVY2}/>
        </svg>
        <svg style={{ position: 'absolute', bottom: -30, left: -30, width: 190, height: 175, opacity: 0.70 }} viewBox="0 0 190 175">
          <path d="M90,16 C124,4 168,32 162,80 C156,128 118,162 76,156 C34,150 4,114 10,68 C16,22 56,28 90,16Z" fill={NAVY3}/>
        </svg>
        <svg style={{ position: 'absolute', top: 50, right: 30, width: 88, height: 80, opacity: 0.88 }} viewBox="0 0 88 80">
          <path d="M46,6 C64,1 82,16 78,40 C74,64 56,78 36,73 C16,68 3,48 10,26 C17,4 28,11 46,6Z" fill={O}/>
        </svg>

        <div style={{ position: 'relative', zIndex: 10 }}>
          {eyebrow && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 12px' }}>{eyebrow}</p>}
          <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, fontFamily: "'Nunito', sans-serif", margin: '0 0 6px', letterSpacing: '-0.01em' }}>{rubrik}</h2>
          {subRubrik && <p style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', color: O, fontFamily: "'Nunito', sans-serif", margin: '0 0 14px', fontWeight: 700 }}>{subRubrik}</p>}
          {ingress && <p style={{ fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, fontFamily: "'Nunito', sans-serif", margin: '0 0 28px' }}>{ingress}</p>}
          {målgrupper && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {målgrupper.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: m.accentColor ?? O, margin: '0 0 3px', fontFamily: "'Nunito', sans-serif" }}>{m.titel}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0, fontFamily: "'Nunito', sans-serif", lineHeight: 1.5 }}>{m.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* HÖGER: lista */}
      <div style={{ flex: 1, background: högerBakgrund, overflowY: 'auto', padding: '48px 44px', display: 'flex', flexDirection: 'column' }}>
        <div className="lg:hidden" style={{ marginBottom: 20 }}>
          {eyebrow && <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 6px' }}>{eyebrow}</p>}
          <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0 }}>{rubrik}</h2>
        </div>
        <p style={{ fontSize: 18, fontWeight: 900, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: '0 0 6px' }}>{listaRubrik}</p>
        <div style={{ width: 48, height: 3, borderRadius: 2, background: O, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lista.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '14px 0', borderBottom: i < lista.length - 1 ? `1px solid ${SAND2}` : 'none' }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: item.accent, flexShrink: 0, marginTop: 4 }} />
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 3px', fontFamily: "'Nunito', sans-serif", lineHeight: 1.25 }}>{item.titel}</p>
                <p style={{ fontSize: 12, color: MID, margin: 0, fontFamily: "'Nunito', sans-serif", lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideL;