// src/components/CourseElements/BrfHistorieTidslinje.tsx
// Ombyggd med split-layout: mörk navy vänster, ljus höger med vertikal tidslinje
// Desktop: tvåkolumns split. Mobil: staplat med kompakt lista.
// Klick öppnar BiografEpokModal (oförändrad).

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';
import BiografEpokModal from './BiografEpokModal';

const O    = '#FF5421';
const OD   = '#E04619';
const NAVY = '#171f32';
const NAVY2= '#1e2d3d';

interface Händelse {
  id: string;
  år: string;
  rubrik: string;
  kort: string;
  lång?: string;
  audioSrc?: string;
  ikon: string;
  färg: string;
  ingress?: string;
  bilder?: { src: string; bildtext?: string }[];
  stycken?: {
    text: string;
    bild?: string;
    bildtext?: string;
    nyckelhändelser?: string[];
  }[];
}

const HÄNDELSER: Händelse[] = [
  {
    id: 'katastrofen',
    år: '1850–1880',
    rubrik: 'Urbanisering & tidiga bostadsinitiativ',
    kort: 'Industrialism, trångboddhet och de första bostadsidéerna',
    ikon: '🏚️',
    färg: '#7A3B1E',
    audioSrc: '/audio/indu.mp3',
    stycken: [
      {
        text: 'I mitten av 1800-talet fick industrialismen sitt riktiga genombrott i Sverige. Bönderna lämnade åkrarna och i de industriella städerna behövdes arbetskraft. Malmö, Göteborg och Stockholm svällde på ett sätt som ingen hade förberett sig för.',
        bild: '/images/urbanisering.png',
        bildtext: 'Industrialisering och fabriksarbete, 1800-talets Sverige',
        nyckelhändelser: [
          'Industrialiseringen leder till massiv inflyttning till städerna',
          'Trångboddhet och sanitära problem blir ett akut samhällsproblem',
          'Bostaden etableras som en social fråga',
        ],
      },
    ],
  },
  {
    id: 'folkhem',
    år: '1920-tal',
    rubrik: 'Bostadsrätten tar form',
    kort: 'HSB, kooperativt ägande och statens engagemang',
    ikon: '🏘️',
    färg: '#1A3A5C',
    audioSrc: '/audio/historia-del2.mp3',
    ingress: 'På 1920-talet sker något avgörande. Det kooperativa tänket, politiken och en ny syn på boendet möts.',
    stycken: [
      {
        text: 'HSB grundas 1923 – idén är enkel men revolutionerande: arbetarna ska äga sina egna bostäder gemensamt, kooperativt, utan att vara beroende av en spekulativ hyresvärd.',
        bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        bildtext: 'HSB grundas 1923',
        nyckelhändelser: [
          'HSB bildas 1923 — startskottet för kooperativt bostadsbyggande',
          'De första moderna bostadsrättsföreningarna etableras',
          'Kooperativt ägande med demokratisk styrning får brett genomslag',
        ],
      },
    ],
  },
  {
    id: 'brffoods',
    år: '1930–1940-tal',
    rubrik: 'Folkhemmet & bostadspolitik',
    kort: 'Funkis, BRF:ens juridiska form och statlig styrning',
    ikon: '🏢',
    färg: '#2D4A1E',
    audioSrc: '/audio/historia-del3.mp3',
    ingress: 'Din bostadsrätt är resultatet av en svensk besatthet av den perfekta vardagen.',
    stycken: [
      {
        text: '1930 stiftas den första bostadsrättslagen och bostadsrättsföreningen får sin juridiska form. Samma år hålls Stockholmsutställningen — en hyllning till funktionalismen.',
        bild: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
        bildtext: 'Funktionalismen slår igenom 1930',
        nyckelhändelser: [
          'Folkhemmet etableras som politisk vision',
          'Funktionalismen slår igenom med Stockholmsutställningen 1930',
          'Första bostadsrättslagen stiftas',
        ],
      },
    ],
  },
  {
    id: 'miljonprogrammet',
    år: '1950–1970-tal',
    rubrik: 'Massproduktion & standardisering',
    kort: 'Miljonprogrammet — en miljon bostäder på tio år',
    ikon: '🏗️',
    färg: '#1E3A4A',
    audioSrc: '/audio/historia-del4.mp3',
    ingress: 'Det Sverige som plågades av dysenteri förvandlas. På tjugo år går landet från bostadsbrist till världens mest ambitiösa bostadsprogram.',
    stycken: [
      {
        text: 'Mellan 1965 och 1974 byggs en miljon nya bostäder i Sverige. Badrum med varmvatten, centralvärme och egna kök — saker som en generation tidigare var lyx — blir standard för alla.',
        bild: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
        bildtext: 'Miljonprogrammet 1965–1974',
        nyckelhändelser: [
          'Miljonprogrammet — en miljon bostäder på tio år',
          'Standardisering av kök, badrum och planlösningar',
          'Storskalig förortsutbyggnad förändrar svenska städer',
        ],
      },
    ],
  },
  {
    id: 'nutid',
    år: '1991–idag',
    rubrik: 'Marknad, lagar & förändring',
    kort: 'Avreglering, stigande priser och skärpta krav',
    ikon: '💰',
    färg: '#2A1A4A',
    audioSrc: '/audio/historia-del5.mp3',
    ingress: 'Det som byggdes som folkhem för alla är idag en av Sveriges mest värdefulla tillgångsklasser.',
    stycken: [
      {
        text: 'Skattereformen 1991 markerar marknadsanpassningens start. Den nuvarande bostadsrättslagen (SFS 1991:614) träder i kraft och ger den juridiska ram som gäller än idag.',
        bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        bildtext: 'Ny era — skattereformen 1991',
        nyckelhändelser: [
          'Skattereformen 1991 — marknadsanpassning inleds',
          'Nuvarande bostadsrättslag SFS 1991:614 träder i kraft',
          'Idag: 1,6 miljoner bostadsrätter i 27 000 föreningar',
        ],
      },
    ],
  },
];

// Dot-färger per epok — matchar broschyrens palett
const DOT_COLORS = [O, OD, NAVY2, '#6b7280', '#c8d4e0'];

interface Props {
  isCompleted?: boolean;
  onComplete?: (id: string) => void;
}

const BrfHistorieTidslinje: React.FC<Props> = ({ isCompleted, onComplete }) => {
  const [aktivIdx, setAktivIdx] = useState<number | null>(null);
  const [seddaIds, setSeddaIds] = useState<Set<string>>(new Set());
  const [aktivEpok, setAktivEpok] = useState<Händelse | null>(null);

  useEffect(() => {
    if (seddaIds.size === HÄNDELSER.length && !isCompleted) {
      onComplete?.('historia-tidslinje');
    }
  }, [seddaIds]);

  const välj = (idx: number) => {
    const h = HÄNDELSER[idx];
    setAktivIdx(idx);
    setSeddaIds(prev => new Set([...prev, h.id]));
    setAktivEpok(h);
  };

  const allDone = seddaIds.size === HÄNDELSER.length;

  return (
    <div className="h-full flex overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* ══════════════════════════════════════════
          VÄNSTER — Navy-kolumn (desktop only)
      ══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between flex-shrink-0"
        style={{
          width: 280,
          background: NAVY,
          padding: '40px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blob dekoration */}
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(255,84,33,0.08)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(30,45,61,0.9)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block', padding: '4px 12px',
            borderRadius: 20, marginBottom: 20,
            background: `${O}20`, border: `1px solid ${O}50`,
            fontSize: 10, fontWeight: 800, letterSpacing: 2,
            textTransform: 'uppercase' as const, color: O,
          }}>
            Kursinnehåll
          </div>

          {/* Rubrik */}
          <h2 style={{
            fontSize: 32, fontWeight: 900, color: '#fff',
            lineHeight: 1.1, marginBottom: 8,
          }}>
            BRF:ens historia
          </h2>
          <p style={{ fontSize: 14, color: O, fontWeight: 700, marginBottom: 20 }}>
            från 1850 till idag
          </p>
          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, marginBottom: 0,
          }}>
            Klicka på varje epok för att utforska historien, lyssna på berättelsen och se bilder.
          </p>
        </div>

        {/* Målgrupper / info-boxar */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Nya ledamöter', desc: 'Förstå ursprunget' },
            { label: 'Ordförande', desc: 'Sätt besluten i kontext' },
            { label: 'Alla i styrelsen', desc: 'Demokratins historia' },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '12px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: O, marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HÖGER — Ljus kolumn med tidslinje
      ══════════════════════════════════════════ */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: '#fafaf8', position: 'relative' }}
      >
        {/* Cream blob dekor top-right */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 260, height: 260, borderRadius: '50%',
          background: '#F2E8DF', opacity: 0.6,
          pointerEvents: 'none',
        }} />

        <div style={{ padding: '36px 48px 80px', maxWidth: 640, position: 'relative' }}>

          {/* Rubrik */}
          <div style={{ marginBottom: 8 }}>
            <h3 style={{
              fontSize: 28, fontWeight: 900, color: NAVY,
              lineHeight: 1.1, marginBottom: 4,
            }}>
              Tidslinje
            </h3>
            <div style={{
              width: 48, height: 3, borderRadius: 2,
              background: `linear-gradient(90deg, ${O}, ${OD})`,
              marginBottom: 28,
            }} />
          </div>

          {/* Framsteg */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 32, padding: '10px 16px',
            borderRadius: 10, background: allDone ? `${O}10` : '#f0ede8',
            border: `1px solid ${allDone ? `${O}30` : '#e5ddd5'}`,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: allDone ? O : '#c8bfb5',
              flexShrink: 0,
            }} />
            <p style={{
              fontSize: 13, fontWeight: 700,
              color: allDone ? '#b84400' : '#8a7d72',
              margin: 0,
            }}>
              {allDone
                ? '✓ Alla epoker utforskade!'
                : `${seddaIds.size} av ${HÄNDELSER.length} utforskade`}
            </p>
          </div>

          {/* Tidslinje-lista */}
          <div style={{ position: 'relative' }}>
            {/* Vertikal linje */}
            <div style={{
              position: 'absolute', left: 11, top: 12, bottom: 12,
              width: 1.5, background: '#e0d8d0', zIndex: 0,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {HÄNDELSER.map((h, i) => {
                const isAktiv = aktivIdx === i;
                const isSedd  = seddaIds.has(h.id);
                const dotColor = DOT_COLORS[i] || O;

                return (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}
                  >
                    {/* Dot */}
                    <div style={{
                      flexShrink: 0, width: 24,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      paddingTop: 20,
                    }}>
                      <motion.div
                        animate={{
                          background: isSedd ? dotColor : '#d4c8be',
                          scale: isAktiv ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: 12, height: 12, borderRadius: '50%',
                          border: `2px solid ${isSedd ? dotColor : '#c0b4aa'}`,
                          zIndex: 1,
                          boxShadow: isAktiv ? `0 0 0 4px ${dotColor}25` : 'none',
                        }}
                      />
                    </div>

                    {/* Kort */}
                    <motion.button
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => välj(i)}
                      style={{
                        flex: 1, textAlign: 'left',
                        padding: '16px 20px',
                        marginLeft: 16, marginBottom: 8,
                        borderRadius: 14, cursor: 'pointer',
                        background: isAktiv
                          ? `linear-gradient(135deg, ${O}15, ${O}08)`
                          : isSedd ? 'rgba(255,84,33,0.04)' : '#fff',
                        border: `1.5px solid ${isAktiv ? `${O}50` : isSedd ? `${O}20` : '#e8e0d8'}`,
                        transition: 'all 0.18s',
                        boxShadow: isAktiv ? `0 2px 16px ${O}18` : '0 1px 4px rgba(0,0,0,0.04)',
                        display: 'flex', alignItems: 'flex-start',
                        justifyContent: 'space-between', gap: 12,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* År */}
                        <span style={{
                          display: 'block',
                          fontSize: 10, fontWeight: 800,
                          letterSpacing: 2, textTransform: 'uppercase' as const,
                          color: isAktiv ? O : '#b8a898',
                          fontFamily: 'monospace', marginBottom: 5,
                        }}>
                          {h.år}
                        </span>

                        {/* Rubrik */}
                        <p style={{
                          fontSize: 15, fontWeight: 800,
                          color: isAktiv ? NAVY : '#2a2018',
                          lineHeight: 1.25, margin: '0 0 5px',
                        }}>
                          {h.rubrik}
                        </p>

                        {/* Kort beskrivning */}
                        <p style={{
                          fontSize: 13,
                          color: isAktiv ? '#5a4030' : '#9a8878',
                          lineHeight: 1.55, margin: 0,
                        }}>
                          {h.kort}
                        </p>
                      </div>

                      {/* Höger: check eller pil */}
                      <div style={{ flexShrink: 0, paddingTop: 2 }}>
                        {isSedd
                          ? <CheckCircle size={16} style={{ color: O }} />
                          : <ChevronRight size={16} style={{ color: '#c8bfb5' }} />
                        }
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBIL — staplat: header + lista
      ══════════════════════════════════════════ */}
      {/* Mobil hanteras av flex-kolumnen ovan som stackas automatiskt på sm */}

      {/* Modal */}
      <BiografEpokModal
        epok={aktivEpok}
        onStäng={() => { setAktivEpok(null); setAktivIdx(null); }}
        onFöregående={() => { if (aktivIdx !== null && aktivIdx > 0) välj(aktivIdx - 1); }}
        onNästa={() => { if (aktivIdx !== null && aktivIdx < HÄNDELSER.length - 1) välj(aktivIdx + 1); }}
        harFöregående={aktivIdx !== null && aktivIdx > 0}
        harNästa={aktivIdx !== null && aktivIdx < HÄNDELSER.length - 1}
      />
    </div>
  );
};

export default BrfHistorieTidslinje;
