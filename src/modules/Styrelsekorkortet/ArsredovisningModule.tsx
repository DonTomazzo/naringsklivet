// src/modules/Styrelsekorkortet/Module6Arsredovisning.tsx
// Modul: Årsredovisningen – lär dig tyda
// Stil: Bakgrundsbilder per tema, klickbara kort, InlineQuiz per block, slutquiz
// Baserad på PDF: ÅRSREDOVISNINGEN_LÄR_DIG_TYDA

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, TrendingUp, BarChart2, BookOpen,
  Shield, Search, HelpCircle, Award, CheckCircle,
  ChevronDown, X
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';
const DARK = '#0f1623';

// ─── Bakgrundsbilder per tema ─────────────────────────────
const IMGS = {
  dokument:    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
  bygg:        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  ekonomi:     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
  mynt:        'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1920&q=80',
  möte:        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
  revision:    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
  analys:      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
  fasad:       'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
};

// ─── Slide-skal med bakgrundsbild ────────────────────────
const BgSlide = ({
  bild, children, overlay = 'rgba(15,22,35,0.82)'
}: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">
        {children}
      </div>
    </div>
  </div>
);

// ─── Badge + rubrik ───────────────────────────────────────
const Badge = ({ text }: { text: string }) => (
  <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
    {text}
  </div>
);

const Heading = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Icon className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
    {title}
  </h2>
);

// ─── Klickbart kort (som MissuppfattningarSection) ────────
interface KortItem {
  id: string; nr: string; label: string; short: string;
  bild: string; body: string; tips?: string;
}

const KortModal = ({ item, onClose }: { item: KortItem | null; onClose: () => void }) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed z-50"
          style={{ top: 'var(--header-height, 60px)', left: 0, right: 0, bottom: 0 }}>
          <div className="h-full flex items-center justify-center p-0 md:p-6">
            <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-3xl md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
              {/* Bildtopp */}
              <div className="relative flex-shrink-0 h-44 sm:h-52">
                <img src={item.bild} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.65))' }} />
                <button onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20"
                  style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <X size={16} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-5 right-14">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 text-white"
                    style={{ background: O }}>
                    {item.nr}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{item.label}</h3>
                  <p className="text-white/70 text-base mt-1">{item.short}</p>
                </div>
              </div>
              {/* Body */}
              <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-5 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>Vad innebär det?</p>
                  <p className="text-base text-gray-600 leading-relaxed">{item.body}</p>
                </div>
                {item.tips && (
                  <div className="rounded-2xl p-5 border" style={{ background: OL, borderColor: `${O}20` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Tips för er styrelse</p>
                    <p className="text-base text-gray-700 leading-relaxed">{item.tips}</p>
                  </div>
                )}
                <div className="h-4 md:hidden" />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const KortGrid = ({ items }: { items: KortItem[] }) => {
  const [active, setActive] = useState<KortItem | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (item: KortItem) => {
    setActive(item);
    setViewed(prev => new Set([...prev, item.id]));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-6 px-2">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}>
              {item.label}
            </motion.button>
          );
        })}
      </div>
      {viewed.size > 0 && viewed.size < items.length && (
        <p className="text-center text-xs text-white/40 pb-4">
          {viewed.size}/{items.length} utforskade – klicka på fler
        </p>
      )}
      {viewed.size === items.length && (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>
          ✓ Du har utforskat alla delar!
        </p>
      )}
      <KortModal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

// ─── FAQ-sektion ──────────────────────────────────────────
const MODULE_FAQ = [
  { question: 'Behöver jag ekonomisk bakgrund?', answer: 'Nej – modulen förklarar allt på klarspråk utan ekonomijargong. Vi utgår från vad styrelseledamöter faktiskt behöver förstå.' },
  { question: 'Vad är skillnaden på K2 och K3?', answer: 'K2 och K3 är olika redovisningsregelverk. BRF:er måste från 2026 använda K3 som kräver komponentavskrivning – fastighetens delar skrivs av separat.' },
  { question: 'Måste jag förstå alla siffror i årsredovisningen?', answer: 'Nej – du behöver förstå de viktigaste signalerna. Modulen visar exakt vad du ska titta på och vad du kan lämna till revisorn.' },
];

// ═══════════════════════════════════════════════════════════
// SLIDE 1 – INTRO
// ═══════════════════════════════════════════════════════════
const IntroSlide = () => (
  <BgSlide bild={IMGS.dokument}>
    <Badge text="Ekonomi · Avsnitt 06" />
    <Heading icon={FileText} title="Årsredovisningen – lär dig tyda" />
    <p className="text-white/70 text-lg leading-relaxed mb-8">
      Årsredovisningen är föreningens viktigaste dokument – och en av de vanligaste
      källorna till oro och missförstånd i styrelserummet. I den här modulen lär du
      dig tyda den med säkerhet.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {[
        { icon: '📋', title: 'Förvaltningsberättelse', desc: 'Vad styrelsen redovisar om föreningen' },
        { icon: '📊', title: 'Resultat & balans', desc: 'Intäkter, kostnader och tillgångar' },
        { icon: '🔍', title: 'Noter & kassaflöde', desc: 'Detaljer och pengarörelser' },
        { icon: '✅', title: 'Revisionsberättelse', desc: 'Revisorns granskning och rekommendationer' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          className="rounded-xl p-4 border flex items-start gap-3"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span className="text-2xl">{item.icon}</span>
          <div>
            <p className="text-white font-bold text-sm">{item.title}</p>
            <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="rounded-xl p-4 border" style={{ background: `${O}18`, borderColor: `${O}30` }}>
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>Kom ihåg: </span>
        Årsredovisningen är en offentlig handling reglerad i lag – men den är också
        en säljhandling och ersätter delvis den ekonomiska planen som bild av föreningens hälsa.
        Den gäller normalt 12 månader men kan avse upp till 18.
      </p>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 2 – ÅRSREDOVISNINGENS DELAR (klickbara kort)
// ═══════════════════════════════════════════════════════════
const DelarnasSlide = () => {
  const delar: KortItem[] = [
    {
      id: 'forvaltning', nr: 'Del 1', label: 'Förvaltnings-berättelse',
      short: 'Styrelsens berättelse om föreningens verksamhet.',
      bild: IMGS.möte,
      body: 'Förvaltningsberättelsen är styrelsens egna beskrivning av föreningen under året. Den ska innehålla: beskrivning av föreningen (storlek, styrelse, revisor, leverantörer), väsentliga händelser (underhåll, styrelsens möten), flerårsöversikt med nyckeltal, förändring i eget kapital samt resultatdisposition.',
      tips: 'Läs förvaltningsberättelsen noggrant – det är här ni som styrelse berättar er historia. Jämför gärna med föregående år för att se om det rapporteras konsekvent.',
    },
    {
      id: 'resultat', nr: 'Del 2', label: 'Resultat-räkning',
      short: 'Alla intäkter och kostnader under räkenskapsåret.',
      bild: IMGS.ekonomi,
      body: 'Resultaträkningen visar alla intäkter och kostnader för hela räkenskapsperioden. Viktigt: intäkter och kostnader periodiseras – en försäkring betald i april fördelas över de månader den avser. I K2 är underhåll en direkt kostnad. I K3 är det en fastighetsförbättring som aktiveras och skrivs av.',
      tips: 'Ett negativt resultat behöver inte vara alarmerande – avskrivningar är bokföringsmässiga kostnader utan att pengar lämnar kontot. Titta på kassaflödet för att se hur kassan faktiskt påverkats.',
    },
    {
      id: 'balans', nr: 'Del 3', label: 'Balans-räkning',
      short: 'Ögonblicksbild av tillgångar och skulder sista dagen.',
      bild: IMGS.bygg,
      body: 'Balansräkningen är en ögonblicksbild per sista dagen i räkenskapsperioden och består av två sidor: Tillgångar (anläggningstillgångar/fastighet, kassa, kund- och avgiftsfordringar) och Skuld/eget kapital (eget kapital/insatser, lån, leverantörsfakturor). Soliditet = andel eget kapital av totalt kapital.',
      tips: 'Soliditeten berättar hur mycket av finansieringen ni och medlemmarna själva står för. Hög soliditet = finansiellt stabilt. Jämför lånets storlek mot fastighetens värde.',
    },
    {
      id: 'kassaflode', nr: 'Del 4', label: 'Kassaflödes-analys',
      short: 'Hur kassan förändrats under räkenskapsåret.',
      bild: IMGS.mynt,
      body: 'Kassaflödesanalysen beskriver förändringen i kassan från första till sista dagen. Den delas in i kassaflöde från: resultatet, förändring kortfristiga skulder/fordringar, finansiering och investeringar. Poster som INTE påverkar kassaflödet: avskrivningar, yttre fond och reserver.',
      tips: 'Det är kassaflödet som visar om föreningen faktiskt har råd med planerade investeringar. En förening kan ha positivt resultat men ändå ha likviditetsproblem.',
    },
    {
      id: 'noter', nr: 'Del 5', label: 'Noter',
      short: 'Specifikationer och förklaringar till räkningarna.',
      bild: IMGS.dokument,
      body: 'Noterna är specifikationer till resultat- och balansräkning. Not 1 beskriver vilket redovisningsregelverk (K2/K3) och vilka avskrivningstider som tillämpas. Noten Uttagna pantbrev beskriver hur stora säkerheter föreningen tagit ut – skillnaden mot lånebelopp ger belåningsutrymme. Sista noten är väsentliga händelser efter årets slut.',
      tips: 'Noterna innehåller ofta viktig information om lån och pantsättning. Kontrollera alltid Not 1 för att förstå vilket regelverk som använts.',
    },
    {
      id: 'revision', nr: 'Del 6', label: 'Revisions-berättelse',
      short: 'Revisorns granskning och rekommendationer.',
      bild: IMGS.revision,
      body: 'Revisionsberättelsen är uppdelad i två delar: (1) Styrelsens förvaltning av föreningen – ger rekommendation om ansvarsfrihet. (2) Granskning av räkenskaper och årsredovisning – leder till rekommendation om fastställande av resultat- och balansräkning. Stadgarna anger vilket krav som finns på revisor (auktoriserad, suppleanter).',
      tips: 'Läs revisorns anmärkningar noga. En "oren" revisionsberättelse med avvikande mening är ett allvarligt varningssignal som måste hanteras på stämman.',
    },
  ];

  return (
    <BgSlide bild={IMGS.dokument}>
      <Badge text="Block 1 · Avsnitt 01–02" />
      <Heading icon={BookOpen} title="Årsredovisningens sex delar" />
      <p className="text-white/70 text-base leading-relaxed mb-6">
        En BRF-årsredovisning består alltid av dessa sex delar. Klicka på varje del
        för att lära dig mer.
      </p>
      <KortGrid items={delar} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 3 – FÖRVALTNINGSBERÄTTELSE (fördjupning)
// ═══════════════════════════════════════════════════════════
const FörvaltningSlide = () => (
  <BgSlide bild={IMGS.möte}>
    <Badge text="Avsnitt 02 · Fördjupning" />
    <Heading icon={FileText} title="Förvaltningsberättelsen i detalj" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Det är styrelsens egen röst i årsredovisningen. Här rapporterar ni vad ni gjort,
      hur ekonomin sett ut och vad som hänt under året.
    </p>
    <div className="space-y-4">
      {[
        {
          rubrik: 'Beskrivning av föreningen',
          detalj: 'Storlek, leverantörer, styrelse och revisor. En faktasammanställning om föreningen.',
          icon: '🏢',
        },
        {
          rubrik: 'Väsentliga händelser',
          detalj: 'Utförda underhållsarbeten, styrelsens möten och verksamhet under året.',
          icon: '📅',
        },
        {
          rubrik: 'Flerårsöversikt',
          detalj: 'Nyckeltal, nettoomsättning, soliditet och resultat efter finansiella poster (K2). Från 2026 tillkommer obligatoriska nyckeltal i K3.',
          icon: '📈',
        },
        {
          rubrik: 'Förändring eget kapital',
          detalj: 'Vinst/förlust, avsättning till fond och eventuella nya medlemsinsatser.',
          icon: '💰',
        },
        {
          rubrik: 'Resultatdisposition',
          detalj: 'Eventuell avsättning eller ianspråkstagande av yttre fond – styrs av stadgarna.',
          icon: '⚖️',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl border"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span className="text-2xl flex-shrink-0">{item.icon}</span>
          <div>
            <p className="text-white font-bold text-sm sm:text-base mb-1">{item.rubrik}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.detalj}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 4 – QUIZ 1 (Block 1)
// ═══════════════════════════════════════════════════════════
const Quiz1Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.fasad} overlay="rgba(15,22,35,0.88)">
    <Badge text="Kunskapstest · Block 1" />
    <Heading icon={HelpCircle} title="Årsredovisningens delar" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om årsredovisningens struktur och förvaltningsberättelsen.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-1')}
      questions={[
        {
          id: 'q1',
          question_text: "Hur många delar består en BRF-årsredovisning av?",
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: ['Tre', 'Fyra', 'Sex', 'Åtta'] },
          correct_answer: 'Sex',
          explanation: 'En BRF-årsredovisning består av sex delar: förvaltningsberättelse, resultaträkning, balansräkning, kassaflödesanalys, noter och revisionsberättelse.',
          points: 100,
        },
        {
          id: 'q2',
          question_text: "Vad beskriver förvaltningsberättelsens flerårsöversikt?",
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Enbart årets resultat',
            'Nyckeltal, nettoomsättning, soliditet och resultat',
            'Lista på alla leverantörer',
            'Styrelsens arvoden',
          ]},
          correct_answer: 'Nyckeltal, nettoomsättning, soliditet och resultat',
          explanation: 'Flerårsöversikten ska innehålla nyckeltal, nettoomsättning, soliditet och resultat efter finansiella poster – så att man kan följa trenden över tid.',
          points: 100,
        },
        {
          id: 'q3',
          question_text: "Hur länge gäller en årsredovisning normalt?",
          question_type: 'single_choice',
          question_order: 3,
          options: { choices: ['6 månader', '12 månader, men kan avse upp till 18', '24 månader', 'Tills ny årsredovisning upprättas'] },
          correct_answer: '12 månader, men kan avse upp till 18',
          explanation: 'En årsredovisning gäller normalt i 12 månader men kan avse upp till 18 månader – till exempel vid ett förenings första räkenskapsår.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 5 – RESULTATRÄKNING
// ═══════════════════════════════════════════════════════════
const ResultatSlide = () => (
  <BgSlide bild={IMGS.ekonomi}>
    <Badge text="Avsnitt 03 · Resultaträkning" />
    <Heading icon={TrendingUp} title="Resultaträkningen – intäkter och kostnader" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Resultaträkningen visar alla intäkter och kostnader för hela räkenskapsperioden.
      Det viktigaste att förstå: <span className="text-white font-bold">betalning ≠ kostnad.</span>
    </p>

    {/* Exempel-box */}
    <div className="rounded-2xl p-5 border mb-6"
      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
        Praktiskt exempel – periodisering
      </p>
      <p className="text-white/80 text-sm leading-relaxed">
        En försäkring betalas i <strong className="text-white">april 2024</strong> och täcker perioden
        maj 2024 – april 2025. Betalningen hamnar på april 2024, men kostnaden fördelas
        månadsvis. I april 2024 finns <strong className="text-white">ingen kostnad</strong> för försäkringen
        i resultaträkningen – den periodiseras.
      </p>
    </div>

    {/* K2 vs K3 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#60a5fa' }}>
          K2 (t.o.m. 2025)
        </p>
        <p className="text-white font-bold text-sm mb-1">Underhåll = direkt kostnad</p>
        <p className="text-white/60 text-xs leading-relaxed">
          Stambytet på 2 mkr hamnar som en kostnad i resultaträkningen direkt. Ger ofta stort underskott det år arbetet utförs.
        </p>
      </div>
      <div className="rounded-xl p-4 border" style={{ background: `${O}15`, border: `1px solid ${O}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
          K3 (från 2026)
        </p>
        <p className="text-white font-bold text-sm mb-1">Underhåll = tillgång + avskrivning</p>
        <p className="text-white/60 text-xs leading-relaxed">
          Stambytet aktiveras som en fastighetsförbättring och skrivs av under sin ekonomiska livslängd (t.ex. 50 år). Jämnare resultat.
        </p>
      </div>
    </div>

    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: 'rgba(255,84,33,0.1)' }}>
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>Viktigt: </span>
        Avskrivningar är bokföringsmässiga kostnader – inga pengar lämnar kontot.
        En förening kan ha negativt resultat men ändå ha god likviditet.
      </p>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 6 – BALANSRÄKNING
// ═══════════════════════════════════════════════════════════
const BalansSlide = () => (
  <BgSlide bild={IMGS.bygg}>
    <Badge text="Avsnitt 04 · Balansräkning" />
    <Heading icon={BarChart2} title="Balansräkningen – vad föreningen äger och är skyldig" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      En ögonblicksbild per sista dagen i räkenskapsperioden. Alltid två sidor som
      ska gå ihop – därav namnet.
    </p>

    {/* Balansräkningstabell */}
    <div className="rounded-2xl overflow-hidden border mb-6" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="grid grid-cols-2">
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: O }}>
            Tillgångar
          </p>
          <p className="text-white/50 text-xs text-center mb-3 italic">Vad föreningen äger</p>
          {['Anläggningstillgångar (fastighet)', 'Kassa och bank', 'Kund- och avgiftsfordringar'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: O }} />
              <p className="text-white text-sm">{t}</p>
            </div>
          ))}
        </div>
        <div className="p-5 border-l" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: '#60a5fa' }}>
            Skuld & eget kapital
          </p>
          <p className="text-white/50 text-xs text-center mb-3 italic">Hur det finansierats</p>
          {['Eget kapital (insatser)', 'Lån', 'Leverantörsfakturor'].map((t, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#60a5fa' }} />
              <p className="text-white text-sm">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Soliditet */}
    <div className="rounded-2xl p-5 border" style={{ background: `${O}15`, border: `1px solid ${O}30` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
        Nyckeltalet Soliditet
      </p>
      <p className="text-white font-black text-xl mb-2">
        Soliditet = Eget kapital / Totalt kapital
      </p>
      <p className="text-white/70 text-sm leading-relaxed">
        Visar hur stor del av finansieringen som ni och era medlemmar själva står för –
        och hur stor del som är lån från banken. Hög soliditet = finansiellt starkt.
        BRF:er med soliditet under 10% bör ha en plan.
      </p>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 7 – QUIZ 2 (Block 2)
// ═══════════════════════════════════════════════════════════
const Quiz2Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.ekonomi} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 2" />
    <Heading icon={HelpCircle} title="Resultat och balans" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om resultaträkning, K2/K3 och balansräkning.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-2')}
      questions={[
        {
          id: 'q1',
          question_text: "Vad innebär det att en kostnad periodiseras?",
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Betalningen och kostnaden hamnar alltid samma månad',
            'Kostnaden fördelas över de perioder den avser, oavsett när betalning sker',
            'Kostnaden bokas bort från räkenskaperna',
            'Betalningen skjuts upp till nästa år',
          ]},
          correct_answer: 'Kostnaden fördelas över de perioder den avser, oavsett när betalning sker',
          explanation: 'Periodisering innebär att kostnader och intäkter matchas mot de perioder de faktiskt avser – inte när pengarna betalas.',
          points: 100,
        },
        {
          id: 'q2',
          question_text: "Hur behandlas ett stambyte i K3 (från 2026)?",
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Som en direkt kostnad i resultaträkningen',
            'Det bokförs inte alls',
            'Som en tillgång som aktiveras och skrivs av',
            'Som en skuld till banken',
          ]},
          correct_answer: 'Som en tillgång som aktiveras och skrivs av',
          explanation: 'I K3 är underhåll en fastighetsförbättring – det aktiveras som en tillgång i balansräkningen och skrivs av under sin ekonomiska livslängd.',
          points: 100,
        },
        {
          id: 'q3',
          question_text: "Vad mäter soliditet?",
          question_type: 'single_choice',
          question_order: 3,
          options: { choices: [
            'Föreningens kassalikviditet',
            'Andelen eget kapital av totalt kapital',
            'Hur stor del av lägenhetsavgifterna som täcker underhåll',
            'Förhållandet mellan intäkter och kostnader',
          ]},
          correct_answer: 'Andelen eget kapital av totalt kapital',
          explanation: 'Soliditet = eget kapital delat med totalt kapital. Det visar hur stor del av finansieringen som föreningen och dess medlemmar själva står för.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 8 – VAD SKA DU TITTA EFTER? (klickbara kort)
// ═══════════════════════════════════════════════════════════
const AnalysSlide = () => {
  const signaler: KortItem[] = [
    {
      id: 'underhall', nr: 'Signal 1', label: 'Planerat underhåll',
      short: 'Ta bort underhåll och avskrivningar från resultatet.',
      bild: IMGS.bygg,
      body: 'Ta bort planerat underhåll och avskrivningar från resultatet och jämför med 200 kr per kvm i föreningen. Det ger en bild av om föreningen avsätter tillräckligt för framtida underhåll.',
      tips: 'En förening som konstant avsätter under 200 kr/kvm riskerar att skjuta underhållskostnader på framtida ledamöter och ägare.',
    },
    {
      id: 'dolda', nr: 'Signal 2', label: 'Dolda tillgångar',
      short: 'Hyresrätter, lokaler och övriga ytor som ger intäkter.',
      bild: IMGS.fasad,
      body: 'Dolda tillgångar kan t.ex. vara hyresrätter eller övriga ytor som genererar hyresintäkter. Dessa påverkar föreningens ekonomi positivt och bör identifieras vid analys.',
      tips: 'Hyresintäkter från lokaler kan ha stor påverkan på ekonomin. Kontrollera att dessa redovisas korrekt och att GDPR följs vid uthyrning till privatpersoner.',
    },
    {
      id: 'gang', nr: 'Signal 3', label: 'Gångna underhållsåtgärder',
      short: 'Belåning i relation till underhållscykeln.',
      bild: IMGS.möte,
      body: 'Vad har hänt för underhåll? Belåningen bör stå i relation till var föreningen befinner sig i underhållscykeln. En nyligen stambytt förening med hög belåning kan vara mer försvarbar än en med gammalt system.',
    },
    {
      id: 'lan', nr: 'Signal 4', label: 'Lånefinansiering',
      short: 'Hur stor del finansieras med lån och till vilka räntor?',
      bild: IMGS.mynt,
      body: 'Hur stor del finansieras med lån och hur höga räntor har ni? Det ger räntekänslighet och potential. En förening med lång räntebindning är skyddad på kort sikt men kan missa att dra nytta av räntenedgångar.',
      tips: 'Jämför alltid räntenivån mot marknadens rörliga ränta. En förening med enbart rörlig ränta är mer känslig för räntehöjningar.',
    },
    {
      id: 'amortering', nr: 'Signal 5', label: 'Amorteringar',
      short: 'Amorterar ni på lånen?',
      bild: IMGS.ekonomi,
      body: 'Amorterar ni på lånen? Det ger indirekta kapitaltillskott för medlemmarna. En förening som amorterar ökar soliditeten och minskar den totala räntekostnaden över tid.',
      tips: 'En förening utan amorteringsplan kan ha en latent ekonomisk risk. Kontrollera låneavtalen och fråga om amorteringsplan.',
    },
    {
      id: 'likvida', nr: 'Signal 6', label: 'Likvida medel',
      short: 'Hur mycket likvida medel finns – potentiella kapitaltillskott?',
      bild: IMGS.analys,
      body: 'Hur mycket likvida medel finns det? Det kan vara potentiella kapitaltillskott till föreningens medlemmar. En förening med mycket likvida medel kan ha valt att inte ta ut dessa via avgiftssänkning.',
    },
  ];

  return (
    <BgSlide bild={IMGS.analys}>
      <Badge text="Avsnitt 05 · Analys" />
      <Heading icon={Search} title="Vad ska du titta efter?" />
      <p className="text-white/70 text-base leading-relaxed mb-4">
        Sex signaler att analysera när du läser en årsredovisning – antingen som
        styrelseledamot eller inför ett köp av bostadsrätt.
      </p>
      <KortGrid items={signaler} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 9 – NYCKELTAL & K3 (fördjupning)
// ═══════════════════════════════════════════════════════════
const NyckeltalsSlide = () => (
  <BgSlide bild={IMGS.bygg}>
    <Badge text="Avsnitt 06 · Nyckeltal & K3" />
    <Heading icon={TrendingUp} title="Obligatoriska nyckeltal och K3-övergången" />

    <div className="space-y-5 mb-6">
      <div className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
          Obligatoriska nyckeltal (K3 från 2026)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { nyckeltal: 'Årsavgift/kvm boarea', forklaring: 'Vad varje kvadratmeter kostar per år i avgift' },
            { nyckeltal: 'Lån/kvm boarea', forklaring: 'Föreningens skuld fördelad per kvm' },
            { nyckeltal: 'Energiförbrukning/kvm', forklaring: 'Föreningens energieffektivitet' },
            { nyckeltal: 'Sparande/kvm', forklaring: 'Hur mycket avsätts per kvm för underhåll' },
          ].map((n, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3">
              <p className="text-white font-bold text-sm">{n.nyckeltal}</p>
              <p className="text-white/50 text-xs mt-0.5">{n.forklaring}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-5 border" style={{ background: `${O}12`, border: `1px solid ${O}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
          K3-övergången 2026 – vad händer?
        </p>
        <div className="space-y-3">
          {[
            { steg: '1', text: 'Alla BRF:er måste byta från K2 till K3 för räkenskapsår som börjar efter 31 december 2025.' },
            { steg: '2', text: 'K3 kräver komponentavskrivning – fastigheten delas upp i delar (tak, stammar, hissar, fönster) som skrivs av separat.' },
            { steg: '3', text: 'Övergången kräver en komponentuppdelning av fastigheten i samarbete med revisor och förvaltare.' },
            { steg: '4', text: 'Räkna med ökade redovisningskostnader det första K3-året. Börja förbereda nu.' },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                style={{ background: O }}>
                {s.steg}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 10 – QUIZ 3 (Block 3)
// ═══════════════════════════════════════════════════════════
const Quiz3Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.analys} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 3" />
    <Heading icon={HelpCircle} title="Analys och nyckeltal" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om vad du ska titta efter och K3-övergången.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-3')}
      questions={[
        {
          id: 'q1',
          question_text: "Vilket riktvärde används för att bedöma om föreningen avsätter tillräckligt för underhåll?",
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: ['100 kr/kvm', '200 kr/kvm', '500 kr/kvm', 'Det finns inget riktvärde'] },
          correct_answer: '200 kr/kvm',
          explanation: 'Ta bort planerat underhåll och avskrivningar från resultatet och jämför med 200 kr per kvm. Det ger en indikation på om föreningen sparar tillräckligt.',
          points: 100,
        },
        {
          id: 'q2',
          question_text: "Vad innebär komponentavskrivning i K3?",
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Hela fastigheten skrivs av med ett belopp per år',
            'Fastigheten delas upp i delar som skrivs av separat utifrån livslängd',
            'Avskrivningar slopas helt',
            'Avskrivningarna ökar med 50%',
          ]},
          correct_answer: 'Fastigheten delas upp i delar som skrivs av separat utifrån livslängd',
          explanation: 'I K3 delas fastigheten upp i komponenter (tak, stammar, hissar, fönster) som var och en skrivs av under sin faktiska ekonomiska livslängd.',
          points: 100,
        },
        {
          id: 'q3',
          question_text: "Vad är en signal om att amorteringar ger indirekt nytta för medlemmarna?",
          question_type: 'single_choice',
          question_order: 3,
          options: { choices: [
            'Avgifterna sänks direkt',
            'Föreningens soliditet ökar och räntekostnaden minskar över tid',
            'Avskrivningarna försvinner',
            'Revisorn rekommenderar ansvarsfrihet',
          ]},
          correct_answer: 'Föreningens soliditet ökar och räntekostnaden minskar över tid',
          explanation: 'Amorteringar ger indirekta kapitaltillskott för medlemmarna genom att soliditeten ökar och den totala räntekostnaden minskar.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 11 – SLUTPROV
// ═══════════════════════════════════════════════════════════
const SlutprovSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);

  const fragor = [
    {
      id: 'sq1', question_text: 'Vilka sex delar innehåller en BRF-årsredovisning?',
      question_type: 'single_choice', question_order: 1,
      options: { choices: [
        'Förvaltningsberättelse, resultat, balans, kassaflöde, noter, revisionsberättelse',
        'Budget, prognos, protokoll, stadgar, underhållsplan, revisionsberättelse',
        'Styrelseprotokoll, budget, resultat, balans, noter, stämmoprotokoll',
        'Årsrapport, delårsrapport, kvartalsrapport, revisionsberättelse, stadgar, budget',
      ]},
      correct_answer: 'Förvaltningsberättelse, resultat, balans, kassaflöde, noter, revisionsberättelse',
      explanation: 'De sex delarna är: förvaltningsberättelse, resultaträkning, balansräkning, kassaflödesanalys, noter och revisionsberättelse.',
      points: 100,
    },
    {
      id: 'sq2', question_text: 'Kan en förening ha negativt resultat men ändå god likviditet?',
      question_type: 'single_choice', question_order: 2,
      options: { choices: [
        'Nej, negativt resultat innebär alltid likviditetsbrist',
        'Ja, eftersom avskrivningar är bokföringsmässiga kostnader utan kassapåverkan',
        'Ja, men bara om föreningen har banklån',
        'Nej, resultatet och kassan är alltid lika',
      ]},
      correct_answer: 'Ja, eftersom avskrivningar är bokföringsmässiga kostnader utan kassapåverkan',
      explanation: 'Avskrivningar minskar resultatet men inga pengar lämnar kontot. En förening kan ha stort underskott i resultaträkningen och ändå ha god kassa.',
      points: 100,
    },
    {
      id: 'sq3', question_text: 'Vad ska soliditet beräknas på?',
      question_type: 'single_choice', question_order: 3,
      options: { choices: [
        'Eget kapital delat med totala skulder',
        'Totala skulder delat med totala tillgångar',
        'Eget kapital delat med totalt kapital',
        'Årsresultat delat med nettoomsättning',
      ]},
      correct_answer: 'Eget kapital delat med totalt kapital',
      explanation: 'Soliditet = eget kapital / totalt kapital. Det visar hur stor andel av tillgångarna som finansieras med eget kapital.',
      points: 100,
    },
    {
      id: 'sq4', question_text: 'Från vilket räkenskapsår måste BRF:er använda K3?',
      question_type: 'single_choice', question_order: 4,
      options: { choices: [
        'Från 2024',
        'Från 2025',
        'För räkenskapsår som börjar efter 31 december 2025',
        'K3 är frivilligt för BRF:er',
      ]},
      correct_answer: 'För räkenskapsår som börjar efter 31 december 2025',
      explanation: 'Bokföringsnämnden har beslutat att BRF:er inte längre får använda K2 för räkenskapsår som börjar efter 31 december 2025.',
      points: 100,
    },
    {
      id: 'sq5', question_text: 'Vad innehåller revisionsberättelsens två delar?',
      question_type: 'single_choice', question_order: 5,
      options: { choices: [
        'Granskning av underhållsplan och budget',
        'Styrelsens förvaltning (ansvarsfrihet) och räkenskapsgranskning (fastställande av räkningar)',
        'Jämförelse med föregående år och framtidsprognos',
        'Notkontroll och kassaflödesanalys',
      ]},
      correct_answer: 'Styrelsens förvaltning (ansvarsfrihet) och räkenskapsgranskning (fastställande av räkningar)',
      explanation: 'Revisionsberättelsen består av: (1) granskning av styrelsens förvaltning med rekommendation om ansvarsfrihet, och (2) granskning av räkenskaper med rekommendation om fastställande.',
      points: 100,
    },
  ];

  return (
    <BgSlide bild={IMGS.revision} overlay="rgba(15,22,35,0.92)">
      <div className="text-center">
        <Badge text="Sluttest · Avsnitt 06" />
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Testa dina kunskaper
        </h2>
        <p className="text-white/50 text-sm mb-8">
          5 frågor · 80% rätt krävs för godkänt
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizOpen(true)}
          className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
          <HelpCircle className="w-6 h-6" />
          Starta sluttest
        </motion.button>

        <AnimatePresence>
          {isDone && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border-2 border-green-400 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Modul klar!</h3>
              <p className="text-white/60 text-sm">
                Du har klarat årsredovisningsmodulen. Ditt framsteg sparas automatiskt.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={fragor}
        passingPercent={80}
        onComplete={(passed) => { if (passed) onComplete('slutprov'); }}
      />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════
const Module6Arsredovisning: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    // ── Block 1: Introduktion ──────────────────────────────
    {
      id: 'intro',
      title: 'Introduktion',
      component: <IntroSlide />,
    },
    {
      id: 'delar',
      title: 'Årsredovisningens delar',
      component: <DelarnasSlide />,
    },
    {
      id: 'forvaltning',
      title: 'Förvaltningsberättelsen',
      component: <FörvaltningSlide />,
    },

    // ── Kunskapstest 1 ─────────────────────────────────────
    {
      id: 'quiz-1',
      title: '🧠 Kunskapstest 1',
      component: <Quiz1Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-1')} />,
    },

    // ── Block 2: Räkningar ─────────────────────────────────
    {
      id: 'resultat',
      title: 'Resultaträkning',
      component: <ResultatSlide />,
    },
    {
      id: 'balans',
      title: 'Balansräkning',
      component: <BalansSlide />,
    },

    // ── Kunskapstest 2 ─────────────────────────────────────
    {
      id: 'quiz-2',
      title: '🧠 Kunskapstest 2',
      component: <Quiz2Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-2')} />,
    },

    // ── Block 3: Analys ────────────────────────────────────
    {
      id: 'analys',
      title: 'Vad ska du titta efter?',
      component: <AnalysSlide />,
    },
    {
      id: 'nyckeltal',
      title: 'Nyckeltal & K3',
      component: <NyckeltalsSlide />,
    },

    // ── Kunskapstest 3 ─────────────────────────────────────
    {
      id: 'quiz-3',
      title: '🧠 Kunskapstest 3',
      component: <Quiz3Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-3')} />,
    },

    // ── Slutprov ───────────────────────────────────────────
    {
      id: 'slutprov',
      title: '🎯 Sluttest',
      component: <SlutprovSlide isDone={completedLessons.has('slutprov')} onComplete={handleComplete} />,
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: DARK }}>
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>

      <GlobalSidebar />

      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>

      <FloatingFAQ
        faqs={MODULE_FAQ}
        title="Frågor om årsredovisningen"
        subtitle="Vanliga frågor om att läsa och förstå BRF-årsredovisningen"
        buttonColor={O}
      />
    </div>
  );
};

export default ArsredovisningModule;
