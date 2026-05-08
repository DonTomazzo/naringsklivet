// src/components/CourseElements/KapitelIntro.tsx
// Återanvändbar intro-slide för kapitel i Styrelsekörkortet
// Design: fullskärms hero-bild vänster, mörk overlay mot höger, text/knappar höger
//
// Usage:
// <KapitelIntro
//   emoji="🔧"
//   rubrik="Underhåll & planering"
//   badge="Fastigheten · Kapitel 2"
//   desc="OVK, egenkontroll och underhållsplanering..."
//   bild={IMGS.ovk}
//   pills={["OVK", "Egenkontroll", "Underhållsplan"]}
//   onStart={() => setCurrentIndex(1)}
//   onBack={() => navigate('/modules/fastigheten')}
//   backLabel="Alla kapitel"
// />

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Buildings, Gavel, Lightning, Sparkle, ArrowRight, ArrowLeft } from '@phosphor-icons/react';

const O  = '#FF5421';
const OD = '#E04619';

interface KapitelIntroProps {
  emoji:      string;
  rubrik:     string;           // "Underhåll & planering"
  badge?:     string;           // "Fastigheten · Kapitel 2"
  desc:       string;           // ingress-text
  bild:       string;           // URL till bakgrundsbild
  pills?:     string[];         // valfria ämnes-pills
  onStart:    () => void;
  onBack?:    () => void;
  backLabel?: string;           // default "← Alla kapitel"
  // Valfritt: lägg in en videobakgrund istället för bild
  video?:     string;
  audioSrc?: string;
  icon?: React.ReactNode;  // ← ersätter emoji
}

// ─── Stagger-animation helpers ───────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

// ─── Komponent ───────────────────────────────────────────────────────────────
const KapitelIntro: React.FC<KapitelIntroProps> = ({
  emoji, rubrik, badge, desc, bild, pills = [],
  onStart, onBack, backLabel = 'Alla kapitel', video, audioSrc, icon,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#0a101e', paddingTop: 'var(--header-height, 60px)' }}
    >
      {/* ── Bakgrundsbild / video ─────────────────────────────────────────── */}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.5, zIndex: 0 }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bild})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.42,
            zIndex: 0,
          }}
        />
      )}

      {/* ── Gradient overlay: transparent vänster → tätt mörkt höger ─────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(10,16,30,0.15) 0%, rgba(10,16,30,0.55) 35%, rgba(10,16,30,0.92) 65%, rgba(10,16,30,0.98) 100%)',
          zIndex: 1,
        }}
      />
      {/* Nedre gradient för läsbarhet */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 60%, rgba(10,16,30,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Orange accent-linje längst ner ───────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 3, background: `linear-gradient(90deg, ${O}, ${OD})`, zIndex: 10 }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP — tvåkolumnslayout
          ════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex relative h-full"
        style={{ zIndex: 2 }}
      >
        {/* Vänster: tomt (bara bakgrundsbilden syns) */}
        <div className="flex-1" />

        {/* Höger: innehåll */}
        <div
          className="flex flex-col justify-center"
          style={{ width: '52%', padding: '48px 52px 48px 40px', gap: 0 }}
        >
          {/* Badge */}
          {badge && (
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 14px', borderRadius: 20, marginBottom: 20,
                background: `${O}1a`, border: `1px solid ${O}50`,
                fontSize: 10, fontWeight: 800, letterSpacing: 2.5,
                textTransform: 'uppercase', color: O,
                width: 'fit-content',
              }}
            >
              {badge}
            </motion.div>
          )}

       {/* Ikon eller emoji fallback */}
<motion.div
  custom={1} variants={fadeUp} initial="hidden" animate="visible"
  style={{ marginBottom: 14, color: O }}
>
  {icon ?? <span style={{ fontSize: 52, lineHeight: 1 }}>{emoji}</span>}
</motion.div>

          {/* Rubrik */}
          <motion.h2
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 46px)',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: "'Nunito', sans-serif",
              lineHeight: 1.08,
              marginBottom: 18,
              letterSpacing: '-0.5px',
            }}
          >
            {rubrik}
          </motion.h2>

          {/* Beskrivning */}
          <motion.p
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.72,
              marginBottom: pills.length ? 22 : 36,
              maxWidth: 400,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {desc}
          </motion.p>

          {/* Pills */}
          {pills.length > 0 && (
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}
            >
              {pills.map((pill) => (
                <span
                  key={pill}
                  style={{
                    padding: '5px 13px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    fontSize: 11, fontWeight: 700,
                    color: 'rgba(255,255,255,0.65)',
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          )}

         
          {/* Knappar */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 8px 28px ${O}50` }}
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              style={{
                padding: '14px 32px', borderRadius: 14,
                background: `linear-gradient(135deg, ${O} 0%, ${OD} 100%)`,
                border: 'none', color: '#fff',
                fontSize: 15, fontWeight: 800,
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer', letterSpacing: 0.2,
                boxShadow: `0 4px 18px ${O}40`,
              }}
            >
              Starta →
            </motion.button>

            {onBack && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBack}
                style={{
                  padding: '14px 22px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: 13, fontWeight: 700,
                  fontFamily: "'Nunito', sans-serif",
                  cursor: 'pointer',
                }}
              >
                ← {backLabel}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBIL — centrerat staplat
          ════════════════════════════════════════════════════════════════ */}
      <div
        className="lg:hidden relative h-full overflow-y-auto"
        style={{ zIndex: 2, padding: '28px 20px 100px' }}
      >
        {/* Badge */}
        {badge && (
          <div
            style={{
              display: 'inline-flex', padding: '4px 12px', borderRadius: 20,
              marginBottom: 20, background: `${O}1a`,
              border: `1px solid ${O}50`,
              fontSize: 9, fontWeight: 800, letterSpacing: 2,
              textTransform: 'uppercase', color: O,
            }}
          >
            {badge}
          </div>
        )}

        <div style={{ fontSize: 44, marginBottom: 12 }}>{emoji}</div>

        <h2
          style={{
            fontSize: 32, fontWeight: 900, color: '#fff',
            fontFamily: "'Nunito', sans-serif",
            lineHeight: 1.1, marginBottom: 14, letterSpacing: '-0.3px',
          }}
        >
          {rubrik}
        </h2>

        <p
          style={{
            fontSize: 14, color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, marginBottom: 24,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {desc}
        </p>

        {pills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }}>
            {pills.map((pill) => (
              <span
                key={pill}
                style={{
                  padding: '4px 11px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  fontSize: 11, fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            style={{
              width: '100%', padding: '15px',
              borderRadius: 14,
              background: `linear-gradient(135deg, ${O}, ${OD})`,
              border: 'none', color: '#fff',
              fontSize: 15, fontWeight: 800,
              fontFamily: "'Nunito', sans-serif",
              cursor: 'pointer',
              boxShadow: `0 4px 18px ${O}40`,
            }}
          >
            Starta →
          </motion.button>

          {onBack && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 13, fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
              }}
            >
              ← {backLabel}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KapitelIntro;


// ════════════════════════════════════════════════════════════════════════════
// ANVÄNDNINGSEXEMPEL — ersätter KapitelIntro i ModuleFastighetenUnderhall
// ════════════════════════════════════════════════════════════════════════════
//
// INNAN (lokal inliner):
// ─────────────────────
// const KapitelIntro = ({ emoji, rubrik, desc, bild, ... }) => (
//   <div className="h-full flex overflow-hidden" style={{ background: '#0f1623' }}>
//     ...allt hardkodat...
//   </div>
// );
//
// EFTER (en rad per slide):
// ─────────────────────────
// import KapitelIntro from '../../components/CourseElements/KapitelIntro';
//
// // I slides-arrayen:
// {
//   id: 'kap-underhall',
//   title: '🔧 Kapitel 2: Underhåll',
//   component: (
//     <KapitelIntro
//       emoji="🔧"
//       rubrik="Underhåll & planering"
//       badge="Fastigheten · Kapitel 2"
//       desc="OVK, egenkontroll och underhållsplanering — systemen som håller fastigheten i skick."
//       bild={IMGS.ovk}
//       pills={['OVK', 'Egenkontroll', 'Underhållsplan']}
//       onStart={() => setCurrentIndex(currentIndex + 1)}
//       onBack={() => navigate('/modules/fastigheten')}
//     />
//   ),
// },
//
// // Kapitel Säkerhet:
// {
//   id: 'kap-sakerhet',
//   title: '🔥 Kapitel 1: Säkerhet',
//   component: (
//     <KapitelIntro
//       emoji="🔥"
//       rubrik="Säkerhet & lagkrav"
//       badge="Fastigheten · Kapitel 1"
//       desc="Brand, hissar, radon, legionella — förstå styrelsens ansvar för fastighetens säkerhet."
//       bild={IMGS.brand}
//       pills={['Brandskydd', 'Hissar', 'Radon', 'Legionella']}
//       onStart={() => setCurrentIndex(currentIndex + 1)}
//       onBack={() => navigate('/modules/fastigheten')}
//     />
//   ),
// },
//
// // Modul-intro (hela modulen, inte bara kapitel):
// {
//   id: 'module-intro',
//   title: 'Välkommen',
//   component: (
//     <KapitelIntro
//       emoji="🏛️"
//       rubrik="Styrelsearbete & juridik"
//       badge="Modul 1"
//       desc="BRL, föreningens stadgar, ansvar och befogenheter — allt du behöver veta som nybliven styrelseledamot."
//       bild={IMGS.intro}
//       pills={['BRL', 'Stadgar', 'Ansvar', 'Befogenheter']}
//       onStart={() => setCurrentIndex(1)}
//       onBack={() => navigate('/modules')}
//       backLabel="Alla moduler"
//     />
//   ),
// },