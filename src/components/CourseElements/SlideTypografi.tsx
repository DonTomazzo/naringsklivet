// src/components/CourseElements/SlideTypografi.tsx
// Konsekvent typografisk hierarki hämtad från broschyrens designspråk.
// Eyebrow (liten orange) → Rubrik (stor vit) → Ingress (grå).
// Ersätter de ad-hoc Badge + H + p-kombinationerna i BgSlide-slides.

import React from 'react';

const O = '#FF5421';

// ── Eyebrow — liten orange etikett ovanför rubrik ─────────
export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: O,
    fontFamily: 'monospace',
    marginBottom: 10,
    margin: '0 0 10px',
  }}>
    {children}
  </p>
);

// ── SlideRubrik — stor vit huvudrubrik ────────────────────
export const SlideRubrik: React.FC<{
  children: React.ReactNode;
  size?: 'xl' | 'lg' | 'md';
}> = ({ children, size = 'xl' }) => {
  const fontSize =
    size === 'xl' ? 'clamp(32px, 4.5vw, 52px)' :
    size === 'lg' ? 'clamp(26px, 3.5vw, 40px)' :
                    'clamp(22px, 2.8vw, 32px)';
  return (
    <h2 style={{
      fontSize,
      fontWeight: 900,
      color: '#ffffff',
      lineHeight: 1.08,
      fontFamily: "'Nunito', sans-serif",
      margin: '0 0 16px',
      letterSpacing: '-0.01em',
    }}>
      {children}
    </h2>
  );
};

// ── SlideIngress — grå brödtext ───────────────────────────
export const SlideIngress: React.FC<{
  children: React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
}> = ({ children, size = 'md' }) => {
  const fontSize =
    size === 'lg' ? 'clamp(16px, 1.8vw, 20px)' :
    size === 'md' ? 'clamp(14px, 1.5vw, 17px)' :
                    'clamp(13px, 1.3vw, 15px)';
  return (
    <p style={{
      fontSize,
      color: 'rgba(255,255,255,0.55)',
      lineHeight: 1.75,
      fontFamily: "'Nunito', sans-serif",
      margin: '0 0 28px',
      maxWidth: 640,
    }}>
      {children}
    </p>
  );
};

// ── SlideHuvud — convenience wrapper: eyebrow + rubrik + ingress ──
interface SlideHuvudProps {
  eyebrow: string;
  rubrik: React.ReactNode;
  ingress?: React.ReactNode;
  rubrikSize?: 'xl' | 'lg' | 'md';
  ingressSize?: 'lg' | 'md' | 'sm';
}

export const SlideHuvud: React.FC<SlideHuvudProps> = ({
  eyebrow,
  rubrik,
  ingress,
  rubrikSize = 'xl',
  ingressSize = 'md',
}) => (
  <div style={{ marginBottom: ingress ? 0 : 28 }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <SlideRubrik size={rubrikSize}>{rubrik}</SlideRubrik>
    {ingress && <SlideIngress size={ingressSize}>{ingress}</SlideIngress>}
  </div>
);

export default SlideHuvud;