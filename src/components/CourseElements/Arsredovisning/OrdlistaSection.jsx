// src/components/CourseElements/Arsredovisning/OrdlistaSection.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen } from 'lucide-react';

const ORDLISTA = [
  { ord: 'Årsavgift', kategori: 'Ekonomi', definition: 'Den avgift som bostadsrättsinnehavaren betalar månadsvis till föreningen för att täcka föreningens gemensamma kostnader. Sätts av styrelsen och beslutas på stämman.' },
  { ord: 'Årsredovisning', kategori: 'Dokument', definition: 'Det officiella ekonomiska bokslutet som föreningen är skyldig att upprätta varje år. Innehåller förvaltningsberättelse, resultaträkning, balansräkning, noter och revisionsberättelse.' },
  { ord: 'Avskrivning', kategori: 'Bokföring', definition: 'En bokföringsmässig kostnad som speglar att tillgångar (t.ex. fastigheten) minskar i värde med åren. Påverkar resultatet men inte kassaflödet.' },
  { ord: 'Balansräkning', kategori: 'Dokument', definition: 'Del av årsredovisningen som visar föreningens tillgångar, skulder och eget kapital vid ett visst datum (vanligtvis 31 december).' },
  { ord: 'Balanskrav', kategori: 'Lag', definition: 'Regler som styr hur föreningen ska redovisa sin ekonomi. BRF-er tillämpar antingen K2 eller K3-regelverket.' },
  { ord: 'Belåningsgrad', kategori: 'Nyckeltal', definition: 'Hur stor del av fastighetens värde som är finansierat med lån. Hög belåningsgrad innebär högre risk vid räntehöjningar.' },
  { ord: 'Bostadsrättsförening (BRF)', kategori: 'Organisation', definition: 'En ekonomisk förening som äger en fastighet och upplåter lägenheter med bostadsrätt till sina medlemmar.' },
  { ord: 'Driftkostnader', kategori: 'Ekonomi', definition: 'Löpande kostnader för att sköta fastigheten: el, vatten, sophämtning, försäkringar, städning, fastighetsskötsel m.m.' },
  { ord: 'Eget kapital', kategori: 'Bokföring', definition: 'Skillnaden mellan tillgångar och skulder. I en BRF är eget kapital ofta negativt pga hur insatser och lån bokförs – detta är normalt och inget farlighetstecken.' },
  { ord: 'Fond för yttre underhåll', kategori: 'Ekonomi', definition: 'Avsättningar som föreningen gör varje år för att finansiera framtida underhåll av fastigheten (tak, fasad, stammar m.m.). En stor fond är positivt.' },
  { ord: 'Förvaltningsberättelse', kategori: 'Dokument', definition: 'Den del av årsredovisningen där styrelsen med egna ord beskriver verksamheten, viktiga händelser och föreningens ekonomiska situation under året.' },
  { ord: 'Inre reparationsfond', kategori: 'Ekonomi', definition: 'Fond som varje bostadsrättsinnehavare kan bygga upp för underhåll av den egna lägenheten. Regleras i stadgarna.' },
  { ord: 'Insats', kategori: 'Ekonomi', definition: 'Det belopp som en bostadsrättsinnehavare betalat för att erhålla sin bostadsrätt. Insatsen är kopplad till lägenheten, inte personen.' },
  { ord: 'K2-regelverket', kategori: 'Bokföring', definition: 'Förenklat regelverk för redovisning i mindre föreningar. Vanligast i BRF-er. Komponentavskrivning är inte obligatorisk i K2.' },
  { ord: 'K3-regelverket', kategori: 'Bokföring', definition: 'Det mer avancerade regelverket med komponentavskrivning – varje del av fastigheten (tak, fasad, stammar) skrivs av separat efter sin livslängd.' },
  { ord: 'Kassaflöde', kategori: 'Ekonomi', definition: 'Hur pengar faktiskt flödar in och ut ur föreningen. En förening kan ha positivt kassaflöde trots ett negativt resultat (pga avskrivningar).' },
  { ord: 'Kreditinstitut', kategori: 'Ekonomi', definition: 'Bank eller annat låneinstitut hos vilket föreningen har lån. Skulder till kreditinstitut är vanligtvis föreningens största skuld.' },
  { ord: 'Komponentavskrivning', kategori: 'Bokföring', definition: 'Metod där fastighetens delar (tak, fasad, stammar) skrivs av separat utifrån varje dels beräknade livslängd. Obligatoriskt i K3.' },
  { ord: 'Leverantörsskulder', kategori: 'Bokföring', definition: 'Fakturor som kommit in till föreningen men ännu inte betalts vid bokslutstillfället.' },
  { ord: 'Likviditet', kategori: 'Ekonomi', definition: 'Föreningens förmåga att betala sina kortfristiga skulder. Mäts ofta som likvida medel per lägenhet.' },
  { ord: 'Likvida medel', kategori: 'Ekonomi', definition: 'Kontanter och bankmedel som föreningen har tillgängliga omedelbart. En god likviditetsbuffert är viktigt.' },
  { ord: 'Not', kategori: 'Dokument', definition: 'Fotnoter i årsredovisningen som ger detaljerad information och förklaringar till poster i resultat- och balansräkningen.' },
  { ord: 'Nettoomsättning', kategori: 'Ekonomi', definition: 'Föreningens totala intäkter från sin ordinarie verksamhet – årsavgifter, hyror och liknande. Exklusive t.ex. försäljning av fastigheter.' },
  { ord: 'Obligatoriska nyckeltal', kategori: 'Nyckeltal', definition: 'Sedan 2023 ska BRF-er redovisa ett antal standardiserade nyckeltal i årsredovisningen för att underlätta jämförelser mellan föreningar.' },
  { ord: 'Pantbrev', kategori: 'Lag', definition: 'Dokument som fungerar som säkerhet för ett lån med fastigheten som pant. Föreningen intecknar fastigheten för att kunna låna.' },
  { ord: 'Realisationsvinst/-förlust', kategori: 'Bokföring', definition: 'Vinst eller förlust vid försäljning av tillgångar, t.ex. om föreningen säljer en del av fastigheten.' },
  { ord: 'Resultatdisposition', kategori: 'Bokföring', definition: 'Styrelsens förslag till hur årets resultat ska hanteras – t.ex. hur mycket som förs till balanserat resultat eller underhållsfond.' },
  { ord: 'Resultaträkning', kategori: 'Dokument', definition: 'Del av årsredovisningen som visar alla intäkter och kostnader under ett år och räknar fram årets resultat.' },
  { ord: 'Revision', kategori: 'Kontroll', definition: 'Oberoende granskning av föreningens räkenskaper och förvaltning. Utförs av en auktoriserad eller godkänd revisor.' },
  { ord: 'Revisionsberättelse', kategori: 'Dokument', definition: 'Revisorns skriftliga utlåtande om att årsredovisningen är rättvisande och att styrelsen skött sitt uppdrag korrekt.' },
  { ord: 'Ren revisionsberättelse', kategori: 'Kontroll', definition: 'En revisionsberättelse utan anmärkningar – allt är i ordning. Det normala och önskvärda utfallet.' },
  { ord: 'Oren revisionsberättelse', kategori: 'Kontroll', definition: 'En revisionsberättelse med anmärkningar om fel eller brister. Ska alltid tas på allvar och diskuteras på stämman.' },
  { ord: 'Soliditet', kategori: 'Nyckeltal', definition: 'Eget kapital i procent av totala tillgångar. I en BRF är negativt eget kapital normalt – fokusera istället på skuldsättning och likviditet.' },
  { ord: 'Stambyte', kategori: 'Underhåll', definition: 'Byte av vatten- och avloppsrör i hela fastigheten. En av de dyraste underhållsåtgärderna – kan kosta 30 000–80 000 kr per lägenhet.' },
  { ord: 'Taxeringsvärde', kategori: 'Fastigheten', definition: 'Skatteverkets värdering av fastigheten som används som underlag för fastighetsskatt. Uppdateras inte varje år.' },
  { ord: 'Tillgångar', kategori: 'Bokföring', definition: 'Allt som föreningen äger och har rätt till – fastigheten, pengar på kontot, fordringar m.m. Redovisas på balansräkningens tillgångssida.' },
  { ord: 'Underhållsplan', kategori: 'Underhåll', definition: 'En plan för föreningens kommande underhåll de närmaste 10–30 åren. Viktig grund för att sätta rätt avgiftsnivå och underhållsfond.' },
  { ord: 'Upplupna kostnader', kategori: 'Bokföring', definition: 'Kostnader som uppstått under räkenskapsåret men ännu inte fakturerats eller betalts.' },
  { ord: 'Årets resultat', kategori: 'Ekonomi', definition: 'Skillnaden mellan totala intäkter och totala kostnader under ett år. I en BRF bör detta ligga nära noll.' },
];

const KATEGORIER = ['Alla', ...Array.from(new Set(ORDLISTA.map(o => o.kategori))).sort()];

const kategoriColor = {
  'Ekonomi': '#0EA5E9',
  'Bokföring': '#8B5CF6',
  'Dokument': '#10B981',
  'Nyckeltal': '#FF5421',
  'Lag': '#F59E0B',
  'Kontroll': '#EC4899',
  'Organisation': '#6366F1',
  'Underhåll': '#14B8A6',
  'Fastigheten': '#F97316',
};

const OrdlistaSection = ({ onComplete, isCompleted }) => {
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('Alla');
  const [visited, setVisited] = useState(new Set());
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    let list = ORDLISTA;
    if (kategori !== 'Alla') list = list.filter(o => o.kategori === kategori);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o => o.ord.toLowerCase().includes(q) || o.definition.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.ord.localeCompare(b.ord, 'sv'));
  }, [search, kategori]);

  const handleExpand = (ord) => {
    setExpanded(expanded === ord ? null : ord);
    setVisited(prev => new Set([...prev, ord]));
  };

  const allVisited = visited.size >= 5;

  return (
    <section data-section="ar-ordlista" className="min-h-screen relative py-16 sm:py-24"
      style={{ background: 'linear-gradient(160deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-block bg-[#FF5421] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Ordlista
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Svåra ord förklarade</h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            Sök efter ett begrepp eller bläddra kategorier. {ORDLISTA.length} termer från årsredovisningens värld.
          </p>
        </motion.div>

        {/* Sök */}
        <div className="relative mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Sök efter ett ord..."
            className="w-full pl-11 pr-10 py-4 rounded-2xl text-white placeholder-white/25 text-sm font-medium focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Kategoriknappar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {KATEGORIER.map(k => (
            <button key={k} onClick={() => setKategori(k)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={kategori === k
                ? { background: '#FF5421', color: '#fff' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
              {k}
            </button>
          ))}
        </div>

        {/* Träffar */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-white/30 text-sm">{filtered.length} begrepp</p>
          <p className="text-white/30 text-sm">{visited.size} lästa</p>
        </div>

        {/* Lista */}
        <div className="space-y-2 mb-10">
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-12 text-white/25">
                <BookOpen size={32} className="mx-auto mb-3 opacity-40" />
                <p>Inga träffar för "{search}"</p>
              </motion.div>
            )}
            {filtered.map((item) => {
              const isOpen = expanded === item.ord;
              const isRead = visited.has(item.ord);
              const color = kategoriColor[item.kategori] || '#FF5421';
              return (
                <motion.div
                  key={item.ord}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border overflow-hidden cursor-pointer"
                  style={{
                    borderColor: isOpen ? `${color}40` : isRead ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
                    background: isOpen ? `${color}0c` : isRead ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
                  }}
                  onClick={() => handleExpand(item.ord)}
                >
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="font-bold text-sm flex-1"
                      style={{ color: isOpen ? color : isRead ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.6)' }}>
                      {item.ord}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                      {item.kategori}
                    </span>
                    {isRead && !isOpen && <span className="text-green-400 text-xs flex-shrink-0">✓</span>}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-white/30 flex-shrink-0 text-xs">▼</motion.span>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: `${color}20` }}>
                          <p className="text-white/65 text-sm leading-relaxed">{item.definition}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Slutför */}
        <div className="flex justify-center">
          {!isCompleted && (
            <button
              onClick={() => allVisited && onComplete?.('ar-ordlista')}
              disabled={!allVisited}
              className="px-8 py-4 rounded-2xl font-bold text-sm transition-all"
              style={allVisited
                ? { background: 'linear-gradient(135deg, #FF5421, #E04619)', color: '#fff', boxShadow: '0 4px 20px rgba(255,84,33,0.3)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)', cursor: 'not-allowed' }
              }>
              {allVisited ? '✓ Fortsätt (+75 poäng)' : `Läs minst 5 begrepp`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrdlistaSection;