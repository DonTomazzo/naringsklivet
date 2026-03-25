// src/components/CourseElements/Arsredovisning/RevisionsberattelsenSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, X, Shield, AlertCircle } from 'lucide-react';

const REN = {
  typ: 'ren',
  label: 'Ren revisionsberättelse',
  emoji: '✅',
  color: '#10B981',
  bg: 'rgba(16,185,129,0.08)',
  border: 'rgba(16,185,129,0.25)',
  rubrik: 'Vad en ren revisionsberättelse innebär',
  ingress: 'En ren revisionsberättelse är det normala och önskvärda utfallet. Revisorn bekräftar att räkenskaperna är rättvisande och att styrelsen skött sitt uppdrag korrekt.',
  punkter: [
    { icon: CheckCircle, text: 'Räkenskaperna ger en rättvisande bild av föreningens ekonomi', color: '#10B981' },
    { icon: CheckCircle, text: 'Årsredovisningen är upprättad enligt tillämpliga lagar och regler', color: '#10B981' },
    { icon: CheckCircle, text: 'Styrelsen föreslås beviljas ansvarsfrihet', color: '#10B981' },
    { icon: CheckCircle, text: 'Inga väsentliga brister har hittats i förvaltningen', color: '#10B981' },
  ],
  exempeltext: `Till föreningsstämman i BRF Solbacken

Rapport om årsredovisningen

Jag har utfört en revision av årsredovisningen för BRF Solbacken för räkenskapsåret 2024-01-01 – 2024-12-31.

Uttalanden

Årsredovisningen har upprättats i enlighet med årsredovisningslagen och ger en i alla väsentliga avseenden rättvisande bild av föreningens finansiella ställning per den 31 december 2024.

Rapport om andra krav enligt lagar och andra författningar

Utöver min revision av årsredovisningen har jag även utfört en revision av styrelsens förvaltning för BRF Solbacken för räkenskapsåret 2024.

Rekommendation

Jag tillstyrker att föreningsstämman beviljar styrelsens ledamöter ansvarsfrihet för räkenskapsåret.

Stockholm den 15 mars 2025
Anna Lindström
Auktoriserad revisor`,
  tips: 'En ren revisionsberättelse år efter år är ett tecken på att styrelsen sköter sitt uppdrag och att ekonomin är välskött.',
};

const OREN = {
  typ: 'oren',
  label: 'Oren revisionsberättelse',
  emoji: '⚠️',
  color: '#F59E0B',
  bg: 'rgba(245,158,11,0.08)',
  border: 'rgba(245,158,11,0.25)',
  rubrik: 'Vad en oren revisionsberättelse innebär',
  ingress: 'En oren revisionsberättelse innehåller anmärkningar från revisorn. Det kan vara allt från administrativa brister till allvarliga fel i ekonomin. Ta det alltid på allvar.',
  punkter: [
    { icon: AlertTriangle, text: 'Revisorn har hittat väsentliga brister eller felaktigheter', color: '#F59E0B' },
    { icon: AlertTriangle, text: 'Kan innebära att styrelsen nekas ansvarsfrihet på stämman', color: '#F59E0B' },
    { icon: AlertCircle, text: 'Vanliga orsaker: försenad bokföring, bristande protokoll, felaktig redovisning', color: '#FB7185' },
    { icon: AlertCircle, text: 'Allvarligare fall: misstanke om oegentligheter eller ekonomiska oegentligheter', color: '#FB7185' },
  ],
  exempeltext: `Till föreningsstämman i BRF Exempelvägen

Rapport om årsredovisningen

Jag har utfört en revision av årsredovisningen för BRF Exempelvägen för räkenskapsåret 2024.

ANMÄRKNING: Jag vill framhålla att föreningen under räkenskapsåret har genomfört inköp om sammanlagt 380 000 kronor utan att ha inhämtat konkurrerande offerter i enlighet med föreningens inköpspolicy.

Modifierat uttalande

Med undantag för den möjliga effekten av den fråga som beskrivs i avsnittet "Grund för modifierat uttalande" är det min uppfattning att årsredovisningen i övrigt ger en rättvisande bild.

Rapport om förvaltningen

Med anledning av ovan anmärkning tillstyrker jag inte att stämman beviljar styrelseledamöterna ansvarsfrihet.

Malmö den 10 mars 2025
Per Johansson
Godkänd revisor`,
  tips: 'Om föreningen har fått en oren revisionsberättelse – ta upp det på stämman, begär en förklaring av styrelsen och kräv åtgärdsplan.',
};

const ANMARKNINGAR = [
  { rubrik: 'Försenad årsredovisning', allvar: 'Lägre', beskrivning: 'Årsredovisningen lämnades in för sent till Bolagsverket. Vanligt men bör åtgärdas.' },
  { rubrik: 'Bristande protokollföring', allvar: 'Lägre', beskrivning: 'Styrelsemötesprotokoll saknas eller är ofullständiga för delar av året.' },
  { rubrik: 'Inköp utan offertinhämtning', allvar: 'Medel', beskrivning: 'Större inköp har gjorts utan att konkurrerande offerter inhämtats enligt policy.' },
  { rubrik: 'Felaktig fondavsättning', allvar: 'Medel', beskrivning: 'Avsättning till yttre underhållsfond avviker från vad underhållsplanen föreskriver.' },
  { rubrik: 'Bristande intern kontroll', allvar: 'Högre', beskrivning: 'Samma person hanterar både utbetalningar och bokföring utan kontroll.' },
  { rubrik: 'Misstänkta oegentligheter', allvar: 'Allvarligt', beskrivning: 'Revisorn har hittat tecken på att medel kan ha använts felaktigt. Polisanmälan kan bli aktuellt.' },
];

const allvarColor = { 'Lägre': '#10B981', 'Medel': '#F59E0B', 'Högre': '#FB7185', 'Allvarligt': '#EF4444' };

const DocumentPreview = ({ doc, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="text-left rounded-2xl border p-6 w-full transition-all"
    style={{
      background: isActive ? doc.bg : 'rgba(255,255,255,0.03)',
      borderColor: isActive ? doc.border : 'rgba(255,255,255,0.08)',
      boxShadow: isActive ? `0 8px 32px ${doc.color}20` : 'none',
    }}
  >
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl">{doc.emoji}</span>
      <div>
        <h3 className="font-bold text-white text-base">{doc.label}</h3>
        <p className="text-xs" style={{ color: doc.color }}>
          {doc.typ === 'ren' ? 'Det normala utfallet' : 'Kräver uppmärksamhet'}
        </p>
      </div>
    </div>
    <p className="text-white/45 text-sm leading-relaxed line-clamp-2">{doc.ingress}</p>
  </motion.button>
);

const RevisionsberattelsenSection = ({ onComplete, isCompleted }) => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [showAnmarkningar, setShowAnmarkningar] = useState(false);

  const handleDocClick = (doc) => {
    setActiveDoc(doc);
    setVisited(prev => new Set([...prev, doc.typ]));
  };

  const allVisited = visited.has('ren') && visited.has('oren');

  return (
    <section data-section="ar-revision" className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(160deg, #0d1420 0%, #171f32 60%, #1c2640 100%)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Revisionsberättelsen
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ren eller oren berättelse?
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Revisionsberättelsen är revisorns omdöme om föreningen. Klicka på varje typ för att se hur de ser ut och vad de innebär.
          </p>
        </motion.div>

        {/* De två korten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <DocumentPreview doc={REN} isActive={visited.has('ren')} onClick={() => handleDocClick(REN)} />
          <DocumentPreview doc={OREN} isActive={visited.has('oren')} onClick={() => handleDocClick(OREN)} />
        </div>

        {/* Aktiv förklaring */}
        <AnimatePresence mode="wait">
          {activeDoc && (
            <motion.div
              key={activeDoc.typ}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-2xl border overflow-hidden mb-8"
              style={{ background: activeDoc.bg, borderColor: activeDoc.border }}
            >
              <div className="p-6 border-b" style={{ borderColor: activeDoc.border }}>
                <h3 className="font-bold text-white text-xl mb-2">{activeDoc.rubrik}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{activeDoc.ingress}</p>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-6">
                {/* Punkter */}
                <div>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">Det innebär att...</p>
                  <ul className="space-y-3">
                    {activeDoc.punkter.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                          <Icon size={15} style={{ color: p.color, flexShrink: 0, marginTop: 1 }} />
                          {p.text}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,84,33,0.08)', border: '1px solid rgba(255,84,33,0.2)' }}>
                    <p className="text-[#FF5421] text-xs font-bold mb-1">💡 Tips</p>
                    <p className="text-white/55 text-xs leading-relaxed">{activeDoc.tips}</p>
                  </div>
                </div>
                {/* Exempeltext */}
                <div>
                  <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">Exempel</p>
                  <div className="rounded-xl p-4 font-mono text-xs text-white/45 leading-relaxed overflow-auto"
                    style={{ background: 'rgba(0,0,0,0.3)', maxHeight: 220, whiteSpace: 'pre-wrap' }}>
                    {activeDoc.exempeltext}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vanliga anmärkningar */}
        <div className="rounded-2xl border border-white/8 overflow-hidden mb-10"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <button
            className="w-full flex items-center justify-between p-5"
            onClick={() => setShowAnmarkningar(!showAnmarkningar)}
          >
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#FF5421]" />
              <div className="text-left">
                <p className="font-bold text-white text-sm">Vanliga typer av anmärkningar</p>
                <p className="text-white/35 text-xs">Vad brukar revisorn anmärka på?</p>
              </div>
            </div>
            <motion.span animate={{ rotate: showAnmarkningar ? 180 : 0 }} className="text-white/30 text-xs">▼</motion.span>
          </button>
          <AnimatePresence>
            {showAnmarkningar && (
              <motion.div
                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                className="overflow-hidden border-t border-white/8"
              >
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ANMARKNINGAR.map((a, i) => (
                    <div key={i} className="rounded-xl border border-white/8 bg-white/3 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: allvarColor[a.allvar] }} />
                        <span className="font-bold text-white text-sm">{a.rubrik}</span>
                        <span className="text-xs ml-auto px-2 py-0.5 rounded-full"
                          style={{ background: `${allvarColor[a.allvar]}20`, color: allvarColor[a.allvar] }}>
                          {a.allvar}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed">{a.beskrivning}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slutför */}
        <div className="flex justify-center">
          {!isCompleted && (
            <button
              onClick={() => allVisited && onComplete?.('ar-revision')}
              disabled={!allVisited}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              style={allVisited
                ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
              }>
              {allVisited ? '✓ Slutför avsnittet (+75 poäng)' : 'Klicka på båda typerna av revisionsberättelse'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RevisionsberattelsenSection;