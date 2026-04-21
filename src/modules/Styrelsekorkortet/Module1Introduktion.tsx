// src/modules/Styrelsekorkortet/ModuleStyrelsenArbete.tsx
// Modul: Styrelsens arbete – roller, möten, ansvar och mötesteknik
// Stil: Bakgrundsbilder, vita rubriker, klickbara cirklar, InlineQuiz, slutquiz
// Baserad på: HSB Styrelsens arbete (exkl. HSB-specifikt innehåll)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Gavel, FileText, Calendar, MessageSquare,
  Shield, HelpCircle, Award, Search, CheckCircle, X
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide from '../../components/CourseElements/ModuleIntroSlide';
import BrfFlödesdiagramSlide from '../../components/CourseElements/BrfFlödesdiagramSlide';
import BuildingCrossSectionSection from '../../components/CourseElements/IntressenterSection';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import AudioPlayer from '../../components/AudioPlayer';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';
import IntressenterElevatorSection from '../../components/CourseElements/IntressenterElevatorSection';
import ScenarioAndrahand from '../../components/CourseElements/ScenarioAndrahand';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

const IMGS = {
  möte:      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
  dokument:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
  juridik:   'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  bygg:      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  team:      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
  kalender:  'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1920&q=80',
  protokoll: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
  ansvar:    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80',
};

// ─── Hjälpkomponenter ────────────────────────────────────
const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.82)' }: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
    {text}
  </div>
);

const H = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Icon className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
    {title}
  </h2>
);

// ─── Klickbara cirklar + modal ───────────────────────────
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
                    style={{ background: O }}>{item.nr}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{item.label}</h3>
                  <p className="text-white/70 text-base mt-1">{item.short}</p>
                </div>
              </div>
              <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-5 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>Vad innebär det?</p>
                  <p className="text-base text-gray-600 leading-relaxed">{item.body}</p>
                </div>
                {item.tips && (
                  <div className="rounded-2xl p-5 border" style={{ background: OL, borderColor: `${O}20` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Tänk på detta</p>
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
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O, color: 'white',
                boxShadow: isViewed ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60` : `0 4px 20px ${O}50`,
              }}>
              {item.label}
            </motion.button>
          );
        })}
      </div>
      {viewed.size > 0 && viewed.size < items.length && (
        <p className="text-center text-xs text-white/40 pb-4">{viewed.size}/{items.length} utforskade – klicka på fler</p>
      )}
      {viewed.size === items.length && (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>✓ Du har utforskat alla!</p>
      )}
      <KortModal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

const MODULE_FAQ = [
  { question: 'Hur ofta måste styrelsen ha möte?', answer: 'Det finns ingen lagstadgad minimifrekvens, men ordföranden ansvarar för att möten hålls regelbundet. Viktiga tillfällen är konstituerande möte, planeringsmöte, budgetmöte och möte inför stämman.' },
  { question: 'Vad händer om styrelsen fattar ett felaktigt beslut?', answer: 'Om styrelsen medvetet bryter mot lagen eller orsakar ekonomisk skada genom slarv kan stämman vägra ansvarsfrihet. Ledamöter kan i allvarliga fall bli skadeståndsskyldiga.' },
  { question: 'Måste protokollen vara offentliga för alla i föreningen?', answer: 'Nej. Den som inte är styrelseledamot eller vald revisor har inte rätt att ta del av styrelseprotokollen. Styrelsen bestämmer utifrån sin vårdnadsplikt vilken information som lämnas ut.' },
  { question: 'Vad är skillnaden på bordläggning och återremiss?', answer: 'Bordläggning skjuter upp en fråga utan att utreda den vidare. Återremiss innebär att styrelsen får tillbaka en fråga som behöver utredas ytterligare innan beslut fattas.' },
];

const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="JURIDIK"
    titel="Välkommen till <span style='color:#FF5421'>bostadsrättsföreningen</span>"
    ingress="I det här avsnittet kommer vi att kika närmre på hur bostadsrättsföreningen fungerar"
    bild="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
    längd="2 timmar"
    avsnitt={11}
    onStart={onStart}
   videoUrl="/video/intro-brf2.mp4"
    videoTitel="Introduktion till bostadsrättsföreningen"
    vadLärDuDig={[
      'Styrelsens tre kärnuppgifter ',
  'Rollerna – ordförande,  ',
  'Hur styrelsen fattar beslut och ',
  'Protokollets juridiska betydelse t',
  'Jäv, bordläggning och',
  'Vad som händer om styrelsen ',
    ]}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 2 – ROLLERNA (klickbara cirklar)
// ═══════════════════════════════════════════════════════════
const RollernaSlide = () => {
  const roller: KortItem[] = [
    {
      id: 'ordforande', nr: 'Roll 1', label: 'Ordförande',
      short: 'Leder styrelsen och ansvarar för att beslut verkställs.',
      bild: IMGS.möte,
      body: 'Ordföranden ska regelbundet följa föreningens verksamhet, se till att styrelseprotokoll förs och justeras, ansvara för att Bolagsverket anmäls om ändringar och hålla medlemmarna informerade. Det är ordförandens ansvar att kalla till möten och säkerställa att beslut fattas demokratiskt och korrekt.',
      tips: 'Ordföranden leder processen — inte innehållet. Alla ledamöter ska ha samma möjlighet att komma till tals och påverka besluten.',
    },
    {
      id: 'sekreterare', nr: 'Roll 2', label: 'Sekreterare',
      short: 'Ansvarar för protokoll och uppföljning av beslut.',
      bild: IMGS.dokument,
      body: 'Enligt lagen om ekonomiska föreningar är alla föreningar skyldiga att föra protokoll vid sina sammanträden. Det är sekreterarens uppgift. Sekreteraren håller också reda på bordlagda frågor och bevakar att styrelsens beslut verkställs.',
      tips: 'Protokollet är juridiskt viktigt — frågor med ekonomiska konsekvenser måste dokumenteras ordentligt. Justera protokollet inom 2–4 veckor.',
    },
    {
      id: 'kassör', nr: 'Roll 3', label: 'Kassör',
      short: 'Hanterar ekonomi, budget och bokföring.',
      bild: IMGS.protokoll,
      body: 'Kassören ansvarar för föreningens löpande ekonomi och ser till att bokföringen sköts korrekt. Budgetuppföljning bör vara en stående punkt på styrelsemötets dagordning.',
      tips: 'Styrelsen ansvarar för ekonomin även om en förvaltare sköter redovisningen. Säkerställ att ni förstår siffrorna — det är ert ansvar, inte förvaltarens.',
    },
    {
      id: 'ledamot', nr: 'Roll 4', label: 'Ledamot',
      short: 'Deltar i beslut och tar ansvar för tilldelade områden.',
      bild: IMGS.team,
      body: 'Alla styrelseledamöter kallas ledamöter. De deltar i beslut, tar ansvar för sina ansvarsområden och ser till att styrelsens arbete fungerar som ett team. En ledamot som inte kan närvara kan ersättas av en suppleant om sådan finns.',
      tips: 'Se till att alla ledamöter har "sina" ansvarsområden. Det ökar engagemanget och minskar risken för att viktiga frågor faller mellan stolarna.',
    },
    {
      id: 'revisor', nr: 'Extern', label: 'Revisorn',
      short: 'Granskar styrelsens förvaltning och årsredovisning.',
      bild: IMGS.ansvar,
      body: 'Revisorn väljs av föreningsstämman — inte av styrelsen. Revisorn granskar att årsredovisningen ger en rättvisande bild av ekonomin och uttalar sig om styrelsens förvaltning. Det är viktigt att revisorn inte blir för involverad i styrelsearbetet eftersom hens uppgift är att granska det.',
      tips: 'En revisor får inte vara styrelseledamot, suppleant eller VD. Revisorn är medlemmarnas ögon — inte styrelsens redskap.',
    },
    {
      id: 'valberedning', nr: 'Extern', label: 'Valberedning',
      short: 'Föreslår nya ledamöter till styrelsen.',
      bild: IMGS.team,
      body: 'Valberedningen väljs av stämman och föreslår vilka som ska väljas in i styrelsen. De ska ha god kontakt med många medlemmar och veta vilka kompetenser som behövs. En välfungerande valberedning tänker på ålder, bakgrund och kön för en balanserad styrelse.',
      tips: 'Valberedningen arbetar på förtroende från medlemmarna — inte på uppdrag av styrelsen. De ska vara oberoende.',
    },
    {
  id: 'Suppleanterna',
  nr: 'Extern',
  label: 'Suppleanterna',
  color: '#171f32', // <--- Lägg till denna rad
  short: 'Granskar styrelsens förvaltning och årsredovisning.',
  // ... resten av objektet
},
{
  id: 'valberedning',
  nr: 'Extern',
  label: 'Valberedning',
  color: '#171f32', // <--- Lägg till denna rad
  short: 'Föreslår nya ledamöter till styrelsen.',
  // ... resten av objektet
},
  ];

  return (
    <BgSlide bild={IMGS.team}>
    {/* Denna div sköter centreringen */}
    <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto px-6">
      
      <Badge text="Block 1 · Avsnitt 01" />
      
      <H icon={Users} title="De olika rollerna i föreningen" />
      
      <p className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl">
        Klicka på varje roll för att förstå ansvar och befogenheter.
      </p>

      {/* Grid-komponenten behöver ofta w-full för att inte krympa ihop i flex-boxen */}
      <div className="w-full">
        <KortGrid items={roller} />
      </div>
      
    </div>
  </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 3 – STYRELSENS ANSVAR
// ═══════════════════════════════════════════════════════════
const AnsvarSlide = () => (
  <BgSlide bild={IMGS.juridik}>
    <Badge text="Avsnitt 02 · Ansvar" />
    <H icon={Shield} title="Styrelsens ansvar – och konsekvenserna" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Styrelseuppdraget är ett förtroendeuppdrag med reellt juridiskt ansvar.
      Att inte förstå sitt ansvar är ingen ursäkt inför lagen.
    </p>

    {/* Tre ansvarsområden */}
    <div className="space-y-3 mb-6">
      {[
        { nr: '01', titel: 'Förvalta fastigheter', text: 'Byggnader och tillgångar ska hållas i gott skick. Underhållsplan ska finnas och följas.' },
        { nr: '02', titel: 'Sköta ekonomin', text: 'Redovisning enligt lag, budget och intern kontroll. Styrelsen ansvarar även om en förvaltare anlitas.' },
        { nr: '03', titel: 'Väl fungerande organisation', text: 'Tydliga roller, attesträtt, protokoll och rutiner. Ingen enskild person ska avgöra stora ekonomiska frågor på egen hand.' },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl border"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span className="text-3xl font-black flex-shrink-0 w-10" style={{ color: `${O}50` }}>{item.nr}</span>
          <div>
            <p className="text-white font-bold text-sm sm:text-base mb-1">{item.titel}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Konsekvenser */}
    <div className="rounded-2xl p-5 border" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-red-400">Om styrelsen inte sköter sig</p>
      <div className="space-y-2">
        {[
          'Föreningsstämman kan vägra ansvarsfrihet',
          'Ledamöter kan stämmas och bli skadeståndsskyldiga',
          'Vid brott mot lagen kan åtal väckas',
          'Stämman kan avsätta en eller flera ledamöter — utan att motivera beslutet',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-red-400" />
            <p className="text-white/80 text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 4 – QUIZ 1
// ═══════════════════════════════════════════════════════════
const Quiz1Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.juridik} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 1" />
    <H icon={HelpCircle} title="Roller och ansvar" />
    <p className="text-white/60 text-sm mb-6">Tre frågor om styrelsens roller och juridiska ansvar.</p>
    <InlineQuiz dark onComplete={() => onComplete('quiz-1')} questions={[
      {
        id: 'q1', question_text: "Vems uppgift är det att föra protokoll vid styrelsemöten?",
        question_type: 'single_choice', question_order: 1,
        options: { choices: ['Ordförandens', 'Sekreterarens', 'Kassörens', 'Revisorns'] },
        correct_answer: 'Sekreterarens',
        explanation: 'Enligt lagen om ekonomiska föreningar är alla föreningar skyldiga att föra protokoll. Det är sekreterarens uppgift.',
        points: 100,
      },
      {
        id: 'q2', question_text: "Vad kan hända om en styrelseledamot medvetet bryter mot lagen?",
        question_type: 'single_choice', question_order: 2,
        options: { choices: [
          'Ingenting – styrelseuppdraget skyddar mot personligt ansvar',
          'Stämman kan vägra ansvarsfrihet och ledamoten kan bli skadeståndsskyldig',
          'Bara ordföranden kan hållas ansvarig',
          'Revisorn tar över ansvaret',
        ]},
        correct_answer: 'Stämman kan vägra ansvarsfrihet och ledamoten kan bli skadeståndsskyldig',
        explanation: 'Styrelseuppdraget ger inget skydd mot personligt ansvar. Vid slarv eller medvetna brott kan stämman vägra ansvarsfrihet och ledamöter kan bli skadeståndsskyldiga.',
        points: 100,
      },
      {
        id: 'q3', question_text: "Varför ska revisorn inte bli för involverad i styrelsearbetet?",
        question_type: 'single_choice', question_order: 3,
        options: { choices: [
          'Det är inte tillåtet enligt lagen',
          'Revisorn har inte rätt kompetens',
          'Revisorns uppgift är att granska styrelsens arbete – inte delta i det',
          'Det finns inga regler om detta',
        ]},
        correct_answer: 'Revisorns uppgift är att granska styrelsens arbete – inte delta i det',
        explanation: 'Revisorn är medlemmarnas granskare. Om revisorn deltar aktivt i styrelsearbetet kan hen inte vara objektiv i sin granskning.',
        points: 100,
      },
    ]} />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 5 – STYRELSEMÖTET
// ═══════════════════════════════════════════════════════════
const MötetSlide = () => (
  <BgSlide bild={IMGS.kalender}>
    <Badge text="Avsnitt 03 · Styrelsemötet" />
    <H icon={Calendar} title="Styrelsemötet – förberedelse och beslut" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Det är på mötet som besluten fattas. Välförberedda möten sparar tid
      och säkerställer demokratiska och korrekta beslut.
    </p>

    {/* Viktiga mötestillfällen */}
    <div className="rounded-2xl p-5 border mb-5" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: O }}>Obligatoriska mötestillfällen</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { tid: 'Jan–Mar', rubrik: 'Bokslut & årsredovisning', desc: 'Godkänna årsredovisningen inför stämman' },
          { tid: 'Apr–Maj', rubrik: 'Föreningsstämman', desc: 'Konstituerande möte direkt efteråt – fördela roller' },
          { tid: 'Maj–Jun', rubrik: 'Verksamhetsplanering', desc: 'Planera det kommande verksamhetsåret' },
          { tid: 'Nov', rubrik: 'Budgetmöte', desc: 'Fastställ budget och avgiftsnivå' },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3">
            <span className="text-xs font-bold" style={{ color: O }}>{item.tid}</span>
            <p className="text-white font-bold text-sm mt-0.5">{item.rubrik}</p>
            <p className="text-white/50 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Beslutsregler */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl p-4 border" style={{ background: `${O}15`, border: `1px solid ${O}30` }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Beslutsmässighet</p>
        <p className="text-white text-sm leading-relaxed">
          Styrelsen kan besluta när <strong>mer än hälften</strong> av ledamöterna är närvarande.
          I en styrelse med 7 ledamöter krävs minst 4 närvarande.
        </p>
      </div>
      <div className="rounded-xl p-4 border" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Majoritet</p>
        <p className="text-white text-sm leading-relaxed">
          Enkel majoritet (mer än hälften av rösterna) krävs normalt.
          Vid minsta antalet ledamöter krävs <strong>enhällighet</strong>.
          Lika röstetal — ordföranden avgör.
        </p>
      </div>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 6 – PROTOKOLLET
// ═══════════════════════════════════════════════════════════
const ProtokollSlide = () => (
  <BgSlide bild={IMGS.protokoll}>
    <Badge text="Avsnitt 04 · Protokollet" />
    <H icon={FileText} title="Protokollet är mötets spegel" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Protokollet är juridiskt bindande dokumentation av styrelsens beslut.
      Det ska justeras av ordföranden och ytterligare en person som utses vid mötet.
    </p>

    {/* Tre typer */}
    <div className="space-y-3 mb-6">
      {[
        { typ: 'Beslutsprotokoll', desc: 'Återger bara de beslut som fattats. Inget av det deltagarna sagt finns med. Vanligast i praktiken.' },
        { typ: 'Diskussionsprotokoll', desc: 'Återger mer eller mindre utförligt vad deltagarna sagt, vilka yrkanden som framförts och vilka beslut som fattats.' },
        { typ: 'Kombinerat protokoll', desc: 'De flesta frågor noteras kort, men frågor med ekonomiska konsekvenser dokumenteras mer utförligt.' },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl border"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: O }} />
          <div>
            <p className="text-white font-bold text-sm mb-1">{item.typ}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: 'rgba(255,84,33,0.1)' }}>
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>Viktigt: </span>
        Protokollen är <strong>inte offentliga</strong>. Den som inte är styrelseledamot eller
        vald revisor har inte rätt att ta del av dem. Styrelsen bestämmer vilken information
        som lämnas ut.
      </p>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 7 – QUIZ 2
// ═══════════════════════════════════════════════════════════
const Quiz2Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.möte} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 2" />
    <H icon={HelpCircle} title="Möten och protokoll" />
    <p className="text-white/60 text-sm mb-6">Tre frågor om hur styrelsen fattar beslut och dokumenterar dem.</p>
    <InlineQuiz dark onComplete={() => onComplete('quiz-2')} questions={[
      {
        id: 'q1', question_text: "Hur många ledamöter måste vara närvarande för att styrelsen ska kunna fatta beslut (vid 7 ledamöter)?",
        question_type: 'single_choice', question_order: 1,
        options: { choices: ['Minst 2', 'Minst 3', 'Minst 4', 'Alla 7'] },
        correct_answer: 'Minst 4',
        explanation: 'Styrelsen kan besluta när mer än hälften av ledamöterna är närvarande. Med 7 ledamöter krävs minst 4.',
        points: 100,
      },
      {
        id: 'q2', question_text: "Vem avgör om röstantalet är lika vid en omröstning?",
        question_type: 'single_choice', question_order: 2,
        options: { choices: ['Sekreteraren', 'Den äldste ledamoten', 'Ordföranden', 'Revisorn'] },
        correct_answer: 'Ordföranden',
        explanation: 'Om röstantalet är lika avgör ordföranden. Det är en av anledningarna till att ordföranderollen är central.',
        points: 100,
      },
      {
        id: 'q3', question_text: "Vem har rätt att ta del av styrelseprotokollen?",
        question_type: 'single_choice', question_order: 3,
        options: { choices: [
          'Alla boende i föreningen',
          'Alla betalande medlemmar',
          'Bara styrelseledamöter och valda revisorer',
          'Alla som begär det skriftligt',
        ]},
        correct_answer: 'Bara styrelseledamöter och valda revisorer',
        explanation: 'Protokollen är inte offentliga. Den som inte är styrelseledamot eller vald revisor har inte rätt att ta del av dem.',
        points: 100,
      },
    ]} />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 8 – MÖTESTEKNIK (klickbara cirklar)
// ═══════════════════════════════════════════════════════════
const MötesteknikSlide = () => {
  const tekniker: KortItem[] = [
    {
      id: 'foredragning', nr: 'Steg 1', label: 'Föredragning',
      short: 'Varje ärende presenteras sakligt.',
      bild: IMGS.möte,
      body: 'Varje ärende ska presenteras av en föredragande som belyser frågan så sakligt och fullständigt som möjligt. Syftet är att ge alla ledamöter tillräcklig information för att fatta ett välgrundat beslut.',
      tips: 'Förbered föredragningar i förväg och skicka beslutsunderlag med kallelsen. Det kortar ner mötestiden och höjer kvaliteten på besluten.',
    },
    {
      id: 'overlaggning', nr: 'Steg 2', label: 'Överläggning',
      short: 'Öppen diskussion med tydlig talarordning.',
      bild: IMGS.team,
      body: 'Ordföranden förklarar ordet fritt. Den som vill tala anmäler sig. Ordningsfråga kan ropas om talaren inte håller sig till ämnet. Proposition (streck) kan föreslås när diskussionen inte tillför något nytt.',
      tips: 'Ordföranden ska se till att alla kommer till tals — inte dominera innehållet. En ledamot som inte känner sig hörd slutar engagera sig.',
    },
    {
      id: 'beslut', nr: 'Steg 3', label: 'Beslut',
      short: 'Acklamation eller votering.',
      bild: IMGS.juridik,
      body: 'Acklamation: ordföranden frågar om mötet kan godkänna förslaget. Entydigt ja = beslut klart. Votering: handuppräckning (öppen) eller röstsedlar (sluten). Reservation måste anmälas under mötet och tas med i protokollet.',
      tips: 'Det är viktigt att alla förstår när ett beslut faktiskt fattats. Ordföranden ska tydligt konstatera beslutet och protokollföra det omedelbart.',
    },
    {
      id: 'bordlaggning', nr: 'Verktyg', label: 'Bordläggning',
      short: 'Skjuta upp ett ärende till nästa möte.',
      bild: IMGS.kalender,
      body: 'Bordläggning innebär att man skjuter upp en fråga till ett senare möte, ofta på grund av tidsbrist. En bordlagd fråga kräver ingen ytterligare utredning — den tas bara upp igen vid nästa möte.',
    },
    {
      id: 'aterremiss', nr: 'Verktyg', label: 'Återremiss',
      short: 'Skicka tillbaka för ytterligare utredning.',
      bild: IMGS.dokument,
      body: 'Återremiss innebär att styrelsen skickar tillbaka en fråga för ytterligare utredning. Till skillnad från bordläggning ska frågan aktivt bearbetas vidare och presenteras med nytt underlag vid nästa möte.',
      tips: 'Använd återremiss när ni behöver mer fakta — inte för att undvika ett svårt beslut. Beslut som skjuts upp utan anledning skadar förtroendet.',
    },
    {
      id: 'jav', nr: 'Viktigt', label: 'Jäv',
      short: 'Personligt intresse i en fråga.',
      bild: IMGS.ansvar,
      body: 'En styrelseledamot är jävig om hen har ett direkt eller indirekt intresse i en fråga som kan strida mot föreningens bästa. En jävig ledamot ska lämna sammanträdet under hela behandlingen av ärendet — inte bara omröstningen.',
      tips: 'Gör det till en rutin att fråga om jäv i början av varje möte. Protokollför att den jävige ledamoten lämnade rummet.',
    },
  ];

  return (
    <BgSlide bild={IMGS.möte}>
      <Badge text="Avsnitt 05 · Mötesteknik" />
      <H icon={MessageSquare} title="Mötesteknik – demokratiska beslut" />
      <p className="text-white/70 text-base leading-relaxed mb-4">
        Med bra mötesteknik säkerställer ni att besluten är demokratiska och korrekta.
        Klicka för att lära dig de viktigaste verktygen.
      </p>
      <KortGrid items={tekniker} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 8b – PER CAPSULAM
// ═══════════════════════════════════════════════════════════
const PerCapsulamSlide = () => (
  <SplitSlide
    badge="Avsnitt 05 · Fördjupning"
    title="Per <span style='color:#FF5421'>capsulam</span>"
    ingress="Beslut utan fysiskt möte — juridiskt giltigt men med strikta krav. Används när ett möte inte hinner kallas."
    bild="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
    bildPosition="right"
    badge2="Krav: enhällighet"
    badge2Sub="Ett nej stoppar beslutet"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Skicka skriftligt underlag',
        desc: 'Ordföranden skickar ett tydligt beslutsunderlag till alla ledamöter via e-post.',
      },
      {
        nr: '02',
        titel: 'Inhämta skriftlig bekräftelse',
        desc: 'Varje ledamot svarar skriftligt — ja eller nej. Alla måste svara för att beslutet ska vara giltigt.',
      },
      {
        nr: '03',
        titel: 'Enhällighet krävs',
        desc: 'Till skillnad från ett vanligt möte räcker det inte med majoritet — alla ledamöter måste vara eniga.',
      },
      {
        nr: '04',
        titel: 'Protokollför i efterhand',
        desc: 'Beslutet måste protokollföras och justeras precis som ett vanligt styrelsebeslut.',
      },
    ]} />
    <InfoRuta>
      Använd per capsulam för tidskänsliga och okomplicerade beslut. För komplexa frågor — kalla alltid till möte.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 9 – VAD SKA DU TÄNKA PÅ? (6 signaler)
// ═══════════════════════════════════════════════════════════
const SignalerSlide = () => {
  const signaler: KortItem[] = [
    {
      id: 'planering', nr: 'Signal 1', label: 'Planera i tid',
      short: 'Årsplan för möten och verksamhet.',
      bild: IMGS.kalender,
      body: 'Med en årsplan för styrelsemötena är det lättare för alla att hålla datum fria. En effektiv styrelse pratar igenom vilka mål gruppen har och planerar verksamheten utifrån stämmobeslut och underhållsplan.',
      tips: 'Boka in alla mötesdatum för hela året på det konstituerande mötet. Det minskar risken för att viktiga möten ställs in.',
    },
    {
      id: 'fordelning', nr: 'Signal 2', label: 'Fördela arbetet',
      short: 'Alla ledamöter ska ha tydliga ansvarsområden.',
      bild: IMGS.team,
      body: 'Se till att alla ledamöter har sina arbetsuppgifter och ansvarsområden. Då växer engagemanget och risken minskar att frågor faller mellan stolarna. En styrelse där en person gör allt är sårbar.',
    },
    {
      id: 'information', nr: 'Signal 3', label: 'Informera löpande',
      short: 'Medlemmar som inte informeras blir passiva.',
      bild: IMGS.dokument,
      body: 'De föreningar som är öppna och generösa med information har ofta de mest engagerade medlemmarna. Information kan spridas via anslag, hemsida, sociala medier och informationskvällar. Årsredovisningen är en viktig informationskanal.',
      tips: 'Informera även om det inte hänt så mycket. Tystnaden tolkas alltid som att styrelsen döljer något.',
    },
    {
      id: 'underhall', nr: 'Signal 4', label: 'Underhållsplan',
      short: 'Fastigheten ska hållas i gott skick.',
      bild: IMGS.bygg,
      body: 'Styrelsen är skyldig att upprätta en underhållsplan. Planen beskriver det kommande behovet av underhåll och är grunden för att budgetera rätt avgiftsnivå. Utan plan riskerar ni att tvingas till drastiska avgiftshöjningar.',
      tips: 'Ta in professionell hjälp för besiktning och upprättande av underhållsplan. En bra plan är en av styrelsens viktigaste investeringar.',
    },
    {
      id: 'ekonomi', nr: 'Signal 5', label: 'Förstå siffrorna',
      short: 'Styrelsen ansvarar för ekonomin — oavsett om en förvaltare anlitas.',
      bild: IMGS.protokoll,
      body: 'Av alla styrelsebeslut är fastställande av budget bland de viktigaste. Det kan vara frestande att hålla avgiften låg — men en styrelse som skjuter kostnader på framtiden skadar föreningen och dess medlemmar.',
      tips: 'Ha budgetuppföljning som en stående punkt på varje styrelsemöte. Det är styrelsen som ansvarar för ekonomin, inte förvaltaren.',
    },
    {
      id: 'trygghet', nr: 'Signal 6', label: 'Trygghet & gemenskap',
      short: 'Styrelsen sätter tonen i föreningen.',
      bild: IMGS.team,
      body: 'Trygghet skapas inte med enskilda åtgärder. Det handlar om att bryta anonymiteten och skapa samhörighetskänsla. Styrelsen är de som initierar gemensamma aktiviteter och visar att boendet är mer än ett kontrakt.',
    },
  ];

  return (
    <BgSlide bild={IMGS.bygg}>
      <Badge text="Avsnitt 06 · Praktiken" />
      <H icon={Search} title="Vad ska du tänka på?" />
      <p className="text-white/70 text-base leading-relaxed mb-4">
        Sex signaler för en välfungerande styrelse. Klicka för att läsa mer.
      </p>
      <KortGrid items={signaler} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 10 – QUIZ 3
// ═══════════════════════════════════════════════════════════
const Quiz3Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <BgSlide bild={IMGS.team} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 3" />
    <H icon={HelpCircle} title="Mötesteknik och praktiken" />
    <p className="text-white/60 text-sm mb-6">Tre frågor om mötesteknik och effektivt styrelsearbete.</p>
    <InlineQuiz dark onComplete={() => onComplete('quiz-3')} questions={[
      {
        id: 'q1', question_text: "Vad innebär det att en ledamot är jävig?",
        question_type: 'single_choice', question_order: 1,
        options: { choices: [
          'Ledamoten är sjuk och kan inte närvara',
          'Ledamoten har ett personligt intresse i frågan som kan strida mot föreningens bästa',
          'Ledamoten har inte fått kallelsen i tid',
          'Ledamoten röstar emot majoriteten',
        ]},
        correct_answer: 'Ledamoten har ett personligt intresse i frågan som kan strida mot föreningens bästa',
        explanation: 'Jäv innebär att ledamoten har ett direkt eller indirekt intresse i en fråga. En jävig ledamot ska lämna sammanträdet under hela behandlingen av ärendet.',
        points: 100,
      },
      {
        id: 'q2', question_text: "Vad är skillnaden mellan bordläggning och återremiss?",
        question_type: 'single_choice', question_order: 2,
        options: { choices: [
          'Det är samma sak – båda innebär att frågan skjuts upp',
          'Bordläggning skjuter upp utan utredning, återremiss kräver ytterligare utredning',
          'Återremiss är bara för ekonomiska frågor',
          'Bordläggning kan bara beslutas av ordföranden',
        ]},
        correct_answer: 'Bordläggning skjuter upp utan utredning, återremiss kräver ytterligare utredning',
        explanation: 'Bordläggning = skjut upp till nästa möte utan åtgärd. Återremiss = skicka tillbaka för ytterligare utredning och nytt underlag.',
        points: 100,
      },
      {
        id: 'q3', question_text: "Varför är underhållsplanen så viktig?",
        question_type: 'single_choice', question_order: 3,
        options: { choices: [
          'Den krävs bara av Bolagsverket',
          'Den är grunden för att budgetera rätt avgiftsnivå och undvika framtida avgiftschocker',
          'Den ersätter behovet av en revisor',
          'Den är frivillig men rekommenderad',
        ]},
        correct_answer: 'Den är grunden för att budgetera rätt avgiftsnivå och undvika framtida avgiftschocker',
        explanation: 'Utan underhållsplan riskerar föreningen att tvingas till drastiska avgiftshöjningar när stora underhållsprojekt inte är budgeterade.',
        points: 100,
      },
    ]} />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 11 – SLUTTEST
// ═══════════════════════════════════════════════════════════
const SlutprovSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const fragor = [
    {
      id: 'sq1', question_text: 'Vilka är styrelsens tre kärnuppgifter?',
      question_type: 'single_choice', question_order: 1,
      options: { choices: [
        'Välja revisor, upprätta stadgar och hålla stämma',
        'Förvalta fastigheter, sköta ekonomin och ha en väl fungerande organisation',
        'Protokollföra möten, betala räkningar och informera media',
        'Anmäla till Bolagsverket, budgetera och renovera',
      ]},
      correct_answer: 'Förvalta fastigheter, sköta ekonomin och ha en väl fungerande organisation',
      explanation: 'Styrelsens tre kärnuppgifter är: förvalta fastigheter och tillgångar, sköta redovisningen enligt lag, och upprätthålla en väl fungerande organisation.',
      points: 100,
    },
    {
      id: 'sq2', question_text: 'Vad krävs för att styrelsen ska vara beslutsmässig?',
      question_type: 'single_choice', question_order: 2,
      options: { choices: [
        'Att alla ledamöter är närvarande',
        'Att mer än hälften av ledamöterna är närvarande',
        'Att ordföranden och sekreteraren är närvarande',
        'Att minst en tredjedel av ledamöterna är närvarande',
      ]},
      correct_answer: 'Att mer än hälften av ledamöterna är närvarande',
      explanation: 'Styrelsen kan besluta när antalet närvarande ledamöter är mer än hälften av det totala antalet ledamöter.',
      points: 100,
    },
    {
      id: 'sq3', question_text: 'Vad innebär jäv?',
      question_type: 'single_choice', question_order: 3,
      options: { choices: [
        'Att en ledamot är sjuk',
        'Att en ledamot röstar emot förslaget',
        'Att en ledamot har ett personligt intresse som kan strida mot föreningens bästa',
        'Att en ledamot saknar rätt kompetens',
      ]},
      correct_answer: 'Att en ledamot har ett personligt intresse som kan strida mot föreningens bästa',
      explanation: 'En jävig ledamot ska lämna sammanträdet under hela behandlingen av ärendet och detta ska protokollföras.',
      points: 100,
    },
    {
      id: 'sq4', question_text: 'Hur ofta ska underhållsplanen uppdateras?',
      question_type: 'single_choice', question_order: 4,
      options: { choices: ['En gång per mandatperiod', 'Varje år', 'Vart femte år', 'Bara vid stora renoveringar'] },
      correct_answer: 'Varje år',
      explanation: 'Underhållsplanen ska uppdateras varje år utifrån den årliga besiktningen. Den är grunden för att budgetera rätt avgiftsnivå.',
      points: 100,
    },
    {
      id: 'sq5', question_text: 'Vem har rätt att ta del av styrelseprotokollen?',
      question_type: 'single_choice', question_order: 5,
      options: { choices: [
        'Alla boende i föreningen',
        'Alla betalande medlemmar som begär det',
        'Bara styrelseledamöter och valda revisorer',
        'Alla som är inskrivna i lägenhetsförteckningen',
      ]},
      correct_answer: 'Bara styrelseledamöter och valda revisorer',
      explanation: 'Protokollen är inte offentliga. Styrelsen bestämmer utifrån sin vårdnadsplikt vilken information som lämnas ut till övriga.',
      points: 100,
    },
  ];

  return (
    <BgSlide bild={IMGS.ansvar} overlay="rgba(15,22,35,0.92)">
      <div className="text-center">
        <Badge text="Sluttest · Styrelsens arbete" />
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Testa dina kunskaper
        </h2>
        <p className="text-white/50 text-sm mb-8">5 frågor · 80% rätt krävs för godkänt</p>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizOpen(true)}
          className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
          <HelpCircle className="w-6 h-6" /> Starta sluttest
        </motion.button>
        <AnimatePresence>
          {isDone && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border-2 border-green-400 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Modul klar!</h3>
              <p className="text-white/60 text-sm">Du har klarat modulen om styrelsens arbete.</p>
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
const Module1Introduktion: React.FC = () => {
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
    { 
      id: 'intro', 
      title: 'Introduktion', 
      // 1. Detta visar spelaren i navigationsfältet längst ner:
      audioSrc: '/audio/intro-brf-1.mp3', 
      // 2. Detta skickar in spelaren till själva slide-ytan (den stora vyn):
      component: (
        <IntroSlide 
          onStart={() => setCurrentIndex(1)} 
          onQuizOpen={() => setQuizOpen(true)} 
        />
      ) 
    },

    { id: 'brf-struktur', title: 'Så fungerar BRF:en', component: <BrfFlödesdiagramSlide /> },

    {
  id: 'scenario-andrahand',
  title: '📋 Scenario: Andrahandsuthyrning',
  component: (
    <ScenarioAndrahand
      onComplete={handleComplete}
      isDone={completedLessons.has('scenario-andrahand')}
    />
  ),
},

    {
  id: 'intressenter',
  title: 'Föreningens intressenter',
  component: (
    <IntressenterElevatorSection
      isCompleted={completedLessons.has('intressenter')}
      onComplete={() => handleComplete('intressenter')}
    />
  ),
},
     {
    id: 'byggnad',
    title: 'Fastigheten',
    component: (
      <BuildingCrossSectionSection
        isCompleted={completedLessons.has('byggnad')}
        onComplete={handleComplete}
      />
    ),
  },
    { id: 'rollerna',   title: 'Rollerna i styrelsen', component: <RollernaSlide /> },
    
    { id: 'ansvar',     title: 'Styrelsens ansvar',    component: <AnsvarSlide /> },
    { id: 'quiz-1',     title: '🧠 Kunskapstest 1',    component: <Quiz1Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-1')} /> },
    { id: 'motet',      title: 'Styrelsemötet',        component: <MötetSlide /> },
    { id: 'protokoll',  title: 'Protokollet',          component: <ProtokollSlide /> },
    { id: 'quiz-2',     title: '🧠 Kunskapstest 2',    component: <Quiz2Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-2')} /> },
    { id: 'motesteknik',title: 'Mötesteknik',          component: <MötesteknikSlide /> },
    { id: 'per-capsulam',   title: 'Per capsulam',     component: <PerCapsulamSlide /> },
    { id: 'signaler',   title: 'Vad ska du tänka på?', component: <SignalerSlide /> },
    { id: 'quiz-3',     title: '🧠 Kunskapstest 3',    component: <Quiz3Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-3')} /> },
    { id: 'slutprov',   title: '🎯 Sluttest',          component: <SlutprovSlide isDone={completedLessons.has('slutprov')} onComplete={handleComplete} /> },
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
        title="Frågor om styrelsens arbete"
        subtitle="Vanliga frågor om möten, protokoll och ansvar"
        buttonColor={O}
      />
    </div>
  );
};

export default Module1Introduktion;
