// src/components/CourseElements/DokumentationSection.tsx
// Broschyr-inspirerad sektion: sand-bakgrund, navy/orange/cream-kort, blob-dekorationer.
// Visar föreningens viktigaste dokument i ett kortgrid med "Snabbfakta"-remsa.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O     = '#FF5421';
const OD    = '#E04619';
const NAVY  = '#171f32';
const NAVY2 = '#1e2d3d';
const CREAM = '#FFF4EF';
const SAND  = '#F2E8DF';
const SAND2 = '#E5D5C8';
const MID   = '#3a4a5c';

// ─── Data ─────────────────────────────────────────────────
const DOKUMENT = [
  {
    id: 'stadgar',
    nr: '01',
    titel: 'Stadgarna',
    kort: 'Föreningens grundlag — styr allt styrelsen får och måste göra.',
    variant: 'navy' as const,
    bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    body: 'Stadgarna är det viktigaste dokumentet i föreningen. De innehåller föreningens namn och ändamål, hur stämman fungerar, hur styrelsen väljs, antal ledamöter, räkenskapsår och regler för överlåtelse av bostadsrätt.',
    punkter: [
      'Alla beslut som strider mot stadgarna kan ogiltigförklaras',
      'Ändring kräver 2/3 majoritet på två på varandra följande stämmor',
      'Bolagsverket registrerar stadgeändringar — de gäller inte förrän registrerade',
    ],
    fakta: [
      { etikett: 'Ändring', värde: '2/3 majoritet' },
      { etikett: 'Stämmor', värde: '2 st krävs' },
      { etikett: 'Kopia hos', värde: 'Bolagsverket' },
    ],
  },
  {
    id: 'arsredovisning',
    nr: '02',
    titel: 'Årsredovisning',
    kort: 'Föreningens visitkort — läses av banker, mäklare och köpare.',
    variant: 'orange' as const,
    bild: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    body: 'Årsredovisningen innehåller förvaltningsberättelse, resultaträkning, balansräkning och noter. Den ska upprättas varje år och hållas tillgänglig minst en vecka innan stämman.',
    punkter: [
      'Ska vara klar inom 6 månader efter räkenskapsårets slut',
      'Tillgänglig för medlemmar minst 1 vecka innan stämman',
      'Banker och mäklare granskar skuldsättning per kvm',
    ],
    fakta: [
      { etikett: 'Frist', värde: '6 månader' },
      { etikett: 'Tillgänglig', värde: '1 v. före stämma' },
      { etikett: 'Sparas', värde: 'Min 10 år' },
    ],
  },
  {
    id: 'underhallsplan',
    nr: '03',
    titel: 'Underhållsplan',
    kort: 'Grunden för rätt avgiftssättning — förhindrar avgiftschocker.',
    variant: 'sand' as const,
    bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    body: 'Underhållsplanen listar planerat underhåll med kostnadsuppskattningar och tidpunkter. Utan underhållsplan riskerar föreningen oväntade avgiftshöjningar när tak, stammar eller hissar behöver åtgärdas.',
    punkter: [
      'Uppdateras minst en gång per år',
      'Ta in besiktningsman för korrekt bedömning',
      'Grunden för hur mycket ni behöver fondera',
    ],
    fakta: [
      { etikett: 'Uppdatering', värde: 'Varje år' },
      { etikett: 'Lagkrav', värde: 'God sed' },
      { etikett: 'Efterfrågas av', värde: 'Banker & revisorer' },
    ],
  },
  {
    id: 'protokoll',
    nr: '04',
    titel: 'Styrelseprotokoll',
    kort: 'Alla beslut dokumenteras — justeras av ordförande och en ledamot.',
    variant: 'cream' as const,
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    body: 'Styrelseprotokoll dokumenterar alla styrelsebeslut och ska justeras av ordföranden och ytterligare en ledamot. De sparas permanent och kan begäras ut av medlemmar.',
    punkter: [
      'Justeras inom rimlig tid efter mötet',
      'Sparas permanent — inget gallringsdatum',
      'Känsliga personuppgifter hanteras varsamt enligt GDPR',
    ],
    fakta: [
      { etikett: 'Justering', värde: 'Ordförande + 1' },
      { etikett: 'Sparas', värde: 'Permanent' },
      { etikett: 'Tillgänglig', värde: 'För medlemmar' },
    ],
  },
  {
    id: 'lagenhetsforteckning',
    nr: '05',
    titel: 'Lägenhetsförteckning',
    kort: 'Förteckning över alla lägenheter, innehavare och insatser.',
    variant: 'navy' as const,
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    body: 'Lägenhetsförteckningen ska alltid vara aktuell och innehåller information om alla lägenheter, deras innehavare och insatser. Den innehåller personuppgifter och ska hanteras enligt GDPR.',
    punkter: [
      'Ska uppdateras vid varje överlåtelse',
      'Innehåller personuppgifter — biträdesavtal kan krävas',
      'Används vid pantförskrivning och överlåtelse',
    ],
    fakta: [
      { etikett: 'Uppdatering', värde: 'Vid överlåtelse' },
      { etikett: 'GDPR', värde: 'Begränsad åtkomst' },
      { etikett: 'Innehåll', värde: 'Inneh. + insatser' },
    ],
  },
  {
    id: 'ekonomiskplan',
    nr: '06',
    titel: 'Ekonomisk plan',
    kort: 'Grunddokumentet vid föreningsbildning — revideras vid stora förändringar.',
    variant: 'orange' as const,
    bild: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    body: 'Den ekonomiska planen upprättas när föreningen bildas och ska ge en rättvisande bild av föreningens ekonomi. Den revideras när stora förändringar sker — t.ex. vid stora renoveringar eller omstrukturering av lån.',
    punkter: [
      'Upprättas av två intygsgivare vid föreningsbildning',
      'Revideras vid väsentliga förändringar i ekonomin',
      'Registreras hos Bolagsverket',
    ],
    fakta: [
      { etikett: 'Upprättas av', värde: '2 intygsgivare' },
      { etikett: 'Registreras', värde: 'Bolagsverket' },
      { etikett: 'Revideras', värde: 'Vid behov' },
    ],
  },
];

// ─── Kortfärger ───────────────────────────────────────────
const kortStyle = (variant: 'navy' | 'orange' | 'sand' | 'cream') => {
  switch (variant) {
    case 'navy':   return { bg: NAVY,  textColor: '#fff',  subColor: 'rgba(255,255,255,0.60)', nrColor: 'rgba(255,255,255,0.25)' };
    case 'orange': return { bg: O,     textColor: '#fff',  subColor: 'rgba(255,255,255,0.70)', nrColor: 'rgba(255,255,255,0.30)' };
    case 'sand':   return { bg: SAND,  textColor: NAVY,    subColor: MID,                       nrColor: `${O}40` };
    case 'cream':  return { bg: CREAM, textColor: NAVY,    subColor: MID,                       nrColor: `${O}40` };
  }
};

// ─── Modal ────────────────────────────────────────────────
const DokModal = ({ dok, onClose }: { dok: typeof DOKUMENT[0] | null; onClose: () => void }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <AnimatePresence>
      {dok && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,24,0.82)', backdropFilter: 'blur(6px)', zIndex: 50 }}
            onClick={onClose}
          />
          <motion.div
            key={dok.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--header-height, 60px)',
              left: 0, right: 0, bottom: 0,
              zIndex: 51,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 16,
            }}
          >
            <div style={{
              width: '100%', maxWidth: 820,
              maxHeight: '100%',
              background: '#FAFAF8',
              borderRadius: 20,
              boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Bildhuvud */}
              <div style={{ position: 'relative', flexShrink: 0, height: 200 }} className="sm:h-56">
                <img src={dok.bild} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 20%, #FAFAF8 100%)' }} />

                {/* Blob i bilden */}
                <svg style={{ position: 'absolute', top: -20, right: -30, width: 180, height: 165, opacity: 0.65, zIndex: 1 }} viewBox="0 0 180 165">
                  <path d="M98,14 C132,3 168,30 162,78 C156,126 120,158 80,150 C40,142 6,108 14,64 C22,20 64,25 98,14Z" fill={NAVY2}/>
                </svg>
                <svg style={{ position: 'absolute', top: 28, right: 50, width: 72, height: 66, opacity: 0.88, zIndex: 2 }} viewBox="0 0 72 66">
                  <path d="M38,5 C52,1 66,14 62,34 C58,54 44,64 28,60 C12,56 2,40 7,22 C12,4 24,9 38,5Z" fill={O}/>
                </svg>

                <button onClick={onClose} style={{
                  position: 'absolute', top: 14, right: 14, zIndex: 10,
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <X size={15} style={{ color: NAVY }} />
                </button>

                <div style={{ position: 'absolute', bottom: 20, left: 32, right: 60, zIndex: 5 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 6px' }}>
                    Dokument {dok.nr}
                  </p>
                  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: NAVY, lineHeight: 1.1, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
                    {dok.titel}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
                <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#4a4a4a', lineHeight: 1.78, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
                  {dok.body}
                </p>

                <div style={{ padding: '14px 18px', borderRadius: 12, background: CREAM, border: `1px solid ${SAND2}`, borderLeft: `4px solid ${O}` }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>
                    Styrelsens ansvar
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {dok.punkter.map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${O}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: O }} />
                        </div>
                        <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', color: '#4a4a4a', lineHeight: 1.6, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
                          {p}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Snabbfakta sand */}
                <div style={{ borderRadius: 12, background: SAND, border: `1px solid ${SAND2}`, padding: '14px 18px' }}>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>
                    Snabbfakta
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${dok.fakta.length}, 1fr)`, gap: 8 }}>
                    {dok.fakta.map((f, i) => (
                      <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${SAND2}` : 'none', paddingLeft: i > 0 ? 14 : 0 }}>
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 3px' }}>
                          {f.etikett}
                        </p>
                        <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 800, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
                          {f.värde}
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

// ─── Kort ─────────────────────────────────────────────────
const DokKort = ({ dok, index, onClick }: { dok: typeof DOKUMENT[0]; index: number; onClick: () => void }) => {
  const s = kortStyle(dok.variant);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: s.bg,
        borderRadius: 14,
        padding: '22px 20px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 10,
        minHeight: 160,
      }}
    >
      <span style={{ fontSize: 26, fontWeight: 900, color: s.nrColor, fontFamily: "'Nunito', sans-serif", lineHeight: 1 }}>
        {dok.nr}
      </span>
      <p style={{ fontSize: 16, fontWeight: 800, color: s.textColor, fontFamily: "'Nunito', sans-serif", margin: 0, lineHeight: 1.25 }}>
        {dok.titel}
      </p>
      <p style={{ fontSize: 13, color: s.subColor, lineHeight: 1.55, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
        {dok.kort}
      </p>
    </motion.div>
  );
};

// ─── Import useEffect ─────────────────────────────────────
import { useEffect } from 'react';

// ─── Huvud-komponent ──────────────────────────────────────
const DokumentationSection: React.FC = () => {
  const [aktivt, setAktivt] = useState<typeof DOKUMENT[0] | null>(null);

  return (
    <div style={{ height: '100%', background: SAND, position: 'relative', overflowY: 'auto' }}>
    <div style={{ padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>

      {/* Blob-bakgrund */}
      <svg style={{ position: 'absolute', top: -40, right: -60, width: 340, height: 310, opacity: 0.55, pointerEvents: 'none' }} viewBox="0 0 340 310">
        <path d="M182,28 C242,8 318,54 306,142 C294,230 220,284 148,268 C76,252 14,182 32,104 C50,26 122,48 182,28Z" fill={SAND2}/>
      </svg>
      <svg style={{ position: 'absolute', bottom: -30, left: -40, width: 250, height: 228, opacity: 0.40, pointerEvents: 'none' }} viewBox="0 0 250 228">
        <path d="M120,20 C162,5 218,38 212,98 C206,158 160,196 108,188 C56,180 8,138 18,82 C28,26 78,35 120,20Z" fill={CREAM}/>
      </svg>

      {/* Eyebrow + rubrik */}
      <div style={{ position: 'relative', zIndex: 10, marginBottom: 32 }}>
        <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 10px' }}>
          Kapitel 2 · Dokumentation
        </p>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: NAVY, lineHeight: 1.08, fontFamily: "'Nunito', sans-serif", margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Föreningens viktigaste dokument
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: MID, lineHeight: 1.7, fontFamily: "'Nunito', sans-serif", maxWidth: 560, margin: 0 }}>
          En välskött BRF har ett komplett dokumentarkiv. Det skyddar föreningen vid tvister,
          revisioner och ägarbyten — och det är styrelsens ansvar att hålla det uppdaterat.
        </p>
      </div>

      {/* Kortgrid — broschyrens 3x2 */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {DOKUMENT.map((dok, i) => (
          <DokKort key={dok.id} dok={dok} index={i} onClick={() => setAktivt(dok)} />
        ))}
      </div>

      {/* Snabbfakta-remsa — cream */}
      <div style={{
        position: 'relative', zIndex: 10,
        borderRadius: 12, background: CREAM, border: `1px solid ${SAND2}`,
        padding: '16px 22px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
      }}>
        {[
          { etikett: 'Sparas permanent', värde: 'Protokoll' },
          { etikett: 'Klar inom', värde: '6 månader' },
          { etikett: 'Tillgänglig', värde: '1 v. före stämma' },
          { etikett: 'Registreras hos', värde: 'Bolagsverket' },
        ].map((f, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${SAND2}` : 'none', paddingLeft: i > 0 ? 16 : 0 }}>
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: O, fontFamily: 'monospace', margin: '0 0 3px' }}>
              {f.etikett}
            </p>
            <p style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 800, color: NAVY, fontFamily: "'Nunito', sans-serif", margin: 0 }}>
              {f.värde}
            </p>
          </div>
        ))}
      </div>

      <DokModal dok={aktivt} onClose={() => setAktivt(null)} />
    </div>
    </div>
  );
};

export default DokumentationSection;