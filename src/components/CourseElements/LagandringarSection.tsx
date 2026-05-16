// src/components/CourseElements/LagandringarSection.tsx
// Tidslinje-layout, inga ikoner, ren myndighetskänsla.

import React, { useState, useEffect. useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle, Download } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

const LAGAR = [
  {
    id: 'rostratt',
    år: '2023',
    label: 'En röst per lägenhet',
    short: 'Varje bostadslägenhet ger en röst på stämman — oavsett hur många lägenheter en person äger.',
    bild: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=1200&q=80',
    audioSrc: '/audio/rostratt.mp3',
    body: 'Från 1 januari 2023 gäller att varje bostadslägenhet ger en röst på stämman – oavsett hur många lägenheter en person eller ett företag äger. Äldre stadgar som tillät fler röster vid innehav av flera lägenheter är nu överspelda av lagen. Undantag gäller fortfarande för lokaler, garage och förråd.',
    atgard: 'Gå igenom era stadgar. Om de innehåller äldre rösträttsregler för bostadslägenheter – uppdatera dem på kommande stämma så att de stämmer överens med lagen.',
  },
  {
    id: 'matavfall',
    år: '2024',
    label: 'Obligatorisk matavfallssortering',
    short: 'Alla hushåll i BRF:er måste sortera matavfall separat — det är nu ett lagkrav, inte ett frivilligt val.',
    bild: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80',
    audioSrc: '/audio/matavfall.mp3',
    body: 'Sedan januari 2024 är det lag på att alla hushåll – inklusive de i BRF:er – ska sortera ut matavfall separat. Föreningen ansvarar för att det finns kärl och att de boende har möjlighet att göra rätt. Det är inte längre ett frivilligt miljöval utan ett lagkrav.',
    atgard: 'Kontrollera att ni har separata kärl för matavfall och att informationen till de boende är tydlig. Om ni saknar lösning – kontakta er renhållningsentreprenör.',
  },
  {
  id: 'moms',
  år: '2024–26',
  label: 'Moms på el, vatten & parkering',
  short: 'Ny praxis kring IMD och en dom som kan ge föreningar återbetalning.',
  bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80',
  audioSrc: '/audio/moms.mp3',
  body: [
    'IMD: Individuell debitering av el och vatten räknas som momspliktig tjänst. Momsregistrering krävs vid omsättning över 80 000 kr/år.',
    'Parkering: Skärpta regler från hösten 2026 påverkar hyresnivåer.',
    'NY DOM (mål 7071-24): Föreningar med blandad verksamhet kan ha rätt till återbetalning av momsavdrag.',
  ],
  atgard: '(1) Kartlägg er IMD-debitering. (2) Se över parkeringsavtal inför 2026. (3) Kontakta revisor om ni hyr ut lokaler med moms.',
},
  {
    id: 'k3',
    år: '2026',
    label: 'Från K2 till K3',
    short: 'BRF:er måste byta till K3-redovisning med komponentavskrivning från och med räkenskapsår 2026.',
    bild: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    audioSrc: '/audio/k3.mp3',
    body: 'Bokföringsnämnden har beslutat att BRF:er inte längre får använda det enklare regelverket K2 för räkenskapsår som börjar efter 31 december 2025. Alla måste gå över till K3. Den stora skillnaden är komponentavskrivning – fastigheten delas upp i delar (tak, fönster, stammar, hissar) som skrivs av separat utifrån deras faktiska livslängd. Det ger en mer rättvisande bild av husets skick men kräver mer administration.',
    atgard: 'Kontakta er revisor eller förvaltare redan nu för att starta en komponentuppdelning av fastigheten. Ju längre ni väntar, desto mer stressad blir övergången. Räkna med ökade redovisningskostnader det första året.',
  },
  {
    id: 'forpackningar',
    år: '2027',
    label: 'Fastighetsnära förpackningsinsamling',
    short: 'Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar direkt vid fastigheten.',
    bild: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1200&q=80',
    audioSrc: '/audio/forpackningar.mp3',
    body: 'Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar – plast, papper, metall och glas – i eller direkt i anslutning till fastigheten. Många föreningar behöver bygga om sina miljörum för att få plats med fler kärl. Förberedelserna bör starta nu.',
    atgard: 'Planera om ert miljörum redan nu. Ta in offerter, ansök om bygglov om nödvändigt och budgetera för ombyggnad under 2025–2026 så att ni är klara i god tid.',
  },
];

const Modal = ({
  lag, onClose, onFöregående, onNästa, harFöregående, harNästa,
}: {
  lag: typeof LAGAR[0] | null;
  onClose: () => void;
  onFöregående: () => void;
  onNästa: () => void;
  harFöregående: boolean;
  harNästa: boolean;
}) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => {
  const audio = new Audio('/audio/lagandringar-intro.mp3');
  audio.play().catch(() => {});
  return () => { audio.pause(); };
}, []);

  return (
    <AnimatePresence>
      {lag && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(23,31,50,0.55)',
              backdropFilter: 'blur(6px)',
              zIndex: 50,
            }}
            onClick={onClose}
          />

          <motion.div
            key={lag.id}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.30, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--header-height, 60px)',
              left: 0, right: 0, bottom: 0,
              zIndex: 51,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div style={{
              width: '100%', maxWidth: 1000,
              maxHeight: '100%',
              background: '#fafaf8',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              boxShadow: '0 24px 80px rgba(23,31,50,0.25)',
            }}>

              {/* ── VÄNSTER: bild ── */}
              <div style={{
                width: '42%', flexShrink: 0,
                position: 'relative', overflow: 'hidden',
              }}
                className="hidden md:block"
              >
                <img
                  src={lag.bild} alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.75) saturate(0.9)',
                  }}
                />
                {/* Gradient mot höger */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, transparent 60%, #fafaf8 100%)',
                }} />

                {/* Badge längst ner */}
                <div style={{
                  position: 'absolute', bottom: 24, left: 24,
                }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                    color: O, background: 'rgba(250,250,248,0.95)',
                    border: `1px solid ${O}40`,
                    borderRadius: 20, padding: '5px 14px',
                    fontFamily: 'monospace',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}>
                    Lagändring {lag.år}
                  </span>
                </div>

                {/* Nav-pilar på bilden */}
                {harFöregående && (
                  <motion.button whileHover={{ x: -2 }} onClick={onFöregående} style={{
                    position: 'absolute', left: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(250,250,248,0.88)',
                    border: '1px solid rgba(23,31,50,0.12)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}>
                    <ChevronLeft size={18} style={{ color: '#171f32' }} />
                  </motion.button>
                )}
                {harNästa && (
                  <motion.button whileHover={{ x: 2 }} onClick={onNästa} style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(250,250,248,0.88)',
                    border: '1px solid rgba(23,31,50,0.12)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}>
                    <ChevronRight size={18} style={{ color: '#171f32' }} />
                  </motion.button>
                )}
              </div>

              {/* ── HÖGER: innehåll ── */}
              <div style={{
                flex: 1, overflowY: 'auto',
                padding: '40px 44px 40px 36px',
                display: 'flex', flexDirection: 'column', gap: 24,
                background: '#fafaf8',
              }}>
                {/* Stäng */}
                <button onClick={onClose} style={{
                  position: 'absolute', top: 36, right: 36,
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#f0ede8',
                  border: '1px solid #e0d8d0',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 10,
                }}>
                  <X size={15} style={{ color: '#171f32' }} />
                </button>

                {/* Badge — mobil */}
                <div className="md:hidden">
                  <span style={{
                    display: 'inline-block',
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                    color: O, background: `${O}12`,
                    border: `1px solid ${O}30`,
                    borderRadius: 20, padding: '4px 12px',
                    fontFamily: 'monospace',
                  }}>
                    Lagändring {lag.år}
                  </span>
                </div>

                {/* Rubrik */}
                <div>
                  <p style={{
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                    color: O, marginBottom: 10,
                    fontFamily: 'monospace',
                  }}>
                    Kapitel 2 · Dokumentation
                  </p>
                  <h2 style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 900, color: '#171f32',
                    lineHeight: 1.1,
                    fontFamily: "'Nunito', sans-serif",
                    margin: '0 0 14px',
                  }}>
                    {lag.label}
                  </h2>
                  <div style={{
                    width: 40, height: 3, borderRadius: 2,
                    background: `linear-gradient(90deg, ${O}, ${OD})`,
                    marginBottom: 14,
                  }} />
                  <p style={{
                    fontSize: 16, color: '#6b5e52',
                    lineHeight: 1.65, margin: 0,
                    fontFamily: "'Nunito', sans-serif",
                  }}>
                    {lag.short}
                  </p>
                </div>

                {/* Vad innebär det */}
                <div>
                  <p style={{
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                    color: O, marginBottom: 16,
                    fontFamily: 'monospace',
                  }}>
                    Vad innebär det?
                  </p>
                  {Array.isArray(lag.body) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {lag.body.map((para, i) => (
                        <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                          <div style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: O, flexShrink: 0, marginTop: 10,
                          }} />
                          <p style={{
                            fontSize: 'clamp(14px, 1.4vw, 16px)',
                            color: '#2a2018', lineHeight: 1.78, margin: 0,
                            fontFamily: "'Nunito', sans-serif",
                          }}>
                            {para}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{
                      fontSize: 'clamp(14px, 1.4vw, 16px)',
                      color: '#2a2018', lineHeight: 1.78, margin: 0,
                      fontFamily: "'Nunito', sans-serif",
                    }}>
                      {lag.body}
                    </p>
                  )}
                </div>

                {/* Åtgärd */}
                <div style={{
                  borderRadius: 12,
                  background: '#F2E8DF',
                  border: `1px solid rgba(255,84,33,0.15)`,
                  borderLeft: `3px solid ${O}`,
                  borderRadius: 0,
                  padding: '16px 20px',
                }}>
                  <p style={{
                    fontSize: 10, fontWeight: 800,
                    letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                    color: O, marginBottom: 14,
                    fontFamily: 'monospace',
                  }}>
                    Vad bör ni göra?
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {lag.atgard.split(/\(\d+\)/).filter(Boolean).map((punkt, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: '50%',
                          background: O, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 900, color: '#fff',
                          fontFamily: "'Nunito', sans-serif",
                        }}>
                          {i + 1}
                        </div>
                        <p style={{
                          fontSize: 'clamp(13px, 1.3vw, 15px)',
                          color: '#3a2c20', lineHeight: 1.75,
                          margin: 0, paddingTop: 3,
                          fontFamily: "'Nunito', sans-serif",
                        }}>
                          {punkt.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Tidslinje-rad ────────────────────────────────────────
const TidslinjeRad = ({
  lag, index, isViewed, isLast, onClick,
}: {
  lag: typeof LAGAR[0];
  index: number;
  isViewed: boolean;
  isLast: boolean;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08 }}
    style={{ display: 'flex', position: 'relative' }}
  >
    {/* Tidslinje-kolumn */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
      <motion.div
        animate={{
          background: isViewed ? O : 'rgba(255,255,255,0.12)',
          borderColor: isViewed ? O : 'rgba(255,255,255,0.20)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: 13, height: 13, borderRadius: '50%',
          border: '2px solid',
          marginTop: 24, flexShrink: 0, zIndex: 1,
        }}
      />
      {!isLast && (
        <div style={{
          width: 1, flex: 1, minHeight: 16,
          background: 'rgba(255,255,255,0.09)',
          marginTop: 4,
        }} />
      )}
    </div>

    {/* Knapp */}
    <motion.button
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      style={{
        flex: 1, textAlign: 'left',
        background: isViewed ? `${O}0d` : 'transparent',
        border: `1px solid ${isViewed ? `${O}28` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12,
        padding: '18px 20px',
        cursor: 'pointer',
        marginBottom: isLast ? 0 : 8,
        marginLeft: 10,
        transition: 'background 0.2s, border-color 0.2s',
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 14,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontSize: 10, fontWeight: 800,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: O, fontFamily: 'monospace', marginBottom: 6,
        }}>
          {lag.år}
        </span>
        <p style={{
          fontSize: 'clamp(15px, 1.4vw, 17px)', fontWeight: 800,
          color: '#ffffff', lineHeight: 1.25,
          margin: '0 0 7px', fontFamily: "'Nunito', sans-serif",
        }}>
          {lag.label}
        </p>
        <p style={{
          fontSize: 'clamp(13px, 1.2vw, 15px)',
          color: 'rgba(255,255,255,0.42)',
          lineHeight: 1.60, margin: 0,
          fontFamily: "'Nunito', sans-serif",
        }}>
          {lag.short}
        </p>
      </div>

      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        {isViewed
          ? <CheckCircle size={17} style={{ color: O }} />
          : <div style={{
              width: 17, height: 17, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.18)',
            }} />
        }
      </div>
    </motion.button>
  </motion.div>
);

// ─── Huvudkomponent ───────────────────────────────────────
const LagandringarSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [viewed, setViewed]     = useState<Set<string>>(new Set());

  const activeIndex = LAGAR.findIndex(l => l.id === activeId);
  const activeLag   = activeIndex >= 0 ? LAGAR[activeIndex] : null;

  const öppna = (id: string) => {
    setActiveId(id);
    setViewed(prev => new Set([...prev, id]));
  };

  const allDone = viewed.size === LAGAR.length;

return (
  <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>

    {/* ── DESKTOP: horisontell tidslinje ── */}
    <div className="hidden lg:flex" style={{ alignItems: 'flex-start', position: 'relative' }}>
      {LAGAR.map((lag, i) => (
        <div key={lag.id} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', position: 'relative',
        }}>
          {/* Horisontell linje till nästa */}
          {i < LAGAR.length - 1 && (
            <div style={{
              position: 'absolute', top: 6,
              left: '50%', right: '-50%',
              height: 1, background: 'rgba(255,255,255,0.09)', zIndex: 0,
            }} />
          )}
          {/* Punkt */}
          <motion.div
            animate={{
              background: viewed.has(lag.id) ? O : 'rgba(255,255,255,0.12)',
              borderColor: viewed.has(lag.id) ? O : 'rgba(255,255,255,0.20)',
            }}
            style={{
              width: 13, height: 13, borderRadius: '50%',
              border: '2px solid', zIndex: 1, flexShrink: 0,
            }}
          />
          {/* Kort */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => öppna(lag.id)}
            style={{
              marginTop: 14, padding: '14px 12px',
              borderRadius: 12, cursor: 'pointer', textAlign: 'center',
              background: viewed.has(lag.id) ? `${O}0d` : 'transparent',
              border: `1px solid ${viewed.has(lag.id) ? `${O}28` : 'rgba(255,255,255,0.07)'}`,
              width: '90%', transition: 'all 0.2s',
            }}
          >
            <span style={{
              display: 'block', fontSize: 10, fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              color: O, fontFamily: 'monospace', marginBottom: 6,
            }}>
              {lag.år}
            </span>
            <p style={{
              fontSize: 13, fontWeight: 800, color: '#fff',
              lineHeight: 1.25, margin: '0 0 6px',
              fontFamily: "'Nunito', sans-serif",
            }}>
              {lag.label}
            </p>
            <p style={{
              fontSize: 11, color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.55, margin: 0,
              fontFamily: "'Nunito', sans-serif",
            }}>
              {lag.short}
            </p>
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
              {viewed.has(lag.id)
                ? <CheckCircle size={14} style={{ color: O }} />
                : <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                  }} />
              }
            </div>
          </motion.button>
        </div>
      ))}
    </div>

    {/* ── MOBIL: vertikal tidslinje (oförändrad) ── */}
    <div className="lg:hidden" style={{ paddingBottom: 4 }}>
      {LAGAR.map((lag, i) => (
        <TidslinjeRad
          key={lag.id}
          lag={lag}
          index={i}
          isViewed={viewed.has(lag.id)}
          isLast={i === LAGAR.length - 1}
          onClick={() => öppna(lag.id)}
        />
      ))}
    </div>

    {/* ── PDF-länk ── */}
<div style={{
  marginTop: 22,
  display: 'flex', justifyContent: 'center',
}}>
  <motion.a
    href="/pdf/Lagändringar_BRF_Kursmaterial.pdf"
    download
    whileHover={{ y: -1 }}
    style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 8,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.10)',
      textDecoration: 'none',
    }}
  >
    <Download size={13} style={{ color: 'rgba(255,255,255,0.38)' }} />
    <span style={{
      fontSize: 12, fontWeight: 600,
      color: 'rgba(255,255,255,0.38)',
      fontFamily: "'Nunito', sans-serif",
    }}>
      Ladda ner som PDF
    </span>
  </motion.a>
</div>

    <Modal
      lag={activeLag}
      onClose={() => setActiveId(null)}
      onFöregående={() => activeIndex > 0 && öppna(LAGAR[activeIndex - 1].id)}
      onNästa={() => activeIndex < LAGAR.length - 1 && öppna(LAGAR[activeIndex + 1].id)}
      harFöregående={activeIndex > 0}
      harNästa={activeIndex < LAGAR.length - 1}
    />
  </div>
);
};

export default LagandringarSection;