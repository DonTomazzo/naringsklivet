// src/modules/Styrelsekorkortet/Module4Diskriminering.tsx
// Förenklad diskrimineringsmodul — bygger på samma designspråk som
// övriga Styrelsekörkortet-moduler (SplitSlide, SlideJ, SlideK).
//
// STRUKTUR:
//  1. Intro (ModuleIntroSlide)
//  2. Vad är diskriminering? — SplitSlide med definitioner
//  3. De sju grunderna — interaktiva kort (KortGrid)
//  4. Direkt vs indirekt — SplitSlide
//  5. Quiz 1 (SlideK, 12 frågor) — Grundläggande situationer
//  6. Quiz 2 (SlideK, 12 frågor) — Komplexa avvägningar  [BYGGS I BLOCK 2]

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Scale, Shield, AlertTriangle, Eye, Target,
  HelpCircle, Award, X, CheckCircle
} from 'lucide-react';

import CourseHeader         from '../../components/CourseElements/CourseHeader';
import GlobalSidebar        from '../../components/GlobalSidebar';
import FloatingFAQ          from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout    from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide     from '../../components/CourseElements/ModuleIntroSlide';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import { SlideK }           from '../../components/CourseElements/SlideTemplates';

import { diskrimineringFragorBlock1 } from '../../data/diskrimineringFragorBlock1';
import { diskrimineringFragorBlock2 } from '../../data/diskrimineringFragorBlock2';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

const IMGS = {
  tra:       'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
  juridik:   'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  manniskor: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
  stamma:    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
};

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Gäller diskrimineringslagen verkligen för vår BRF?',
    answer:
      'Ja. Bostadsrättsföreningar omfattas av diskrimineringslagen när det gäller tillhandahållande av tjänster till allmänheten — t.ex. uthyrning av lokaler, hantering av medlemsansökningar och ordningsregler.',
  },
  {
    question: 'Vad händer om vi bryter mot lagen?',
    answer:
      'Den drabbade kan anmäla till Diskrimineringsombudsmannen (DO) eller stämma föreningen i allmän domstol. Skadestånd ligger vanligen mellan 10 000–150 000 kr, men kan vara högre vid allvarliga kränkningar.',
  },
  {
    question: 'Måste vi ha en likabehandlingspolicy?',
    answer:
      'BRF:er är inte skyldiga att ha en formell plan (kravet gäller arbetsgivare och skolor). Men det är god praxis — en enkel riktlinje visar medlemmarna hur ni tänker, och hjälper styrelsen att fatta konsekventa beslut.',
  },
  {
    question: 'Hur dokumenterar vi våra beslut på rätt sätt?',
    answer:
      'Skriv ner sakliga skäl för varje beslut som rör enskilda medlemmar — uthyrning, varningar, ordningsfrågor. Använd neutralt språk. Undvik subjektiva omdömen om personer.',
  },
  {
    question: 'Vad är skillnaden på direkt och indirekt diskriminering?',
    answer:
      'Direkt: någon behandlas sämre på grund av en skyddad egenskap. Indirekt: en regel som verkar neutral drabbar en skyddad grupp oproportionerligt — och kan inte motiveras sakligt.',
  },
];

// ═══════════════════════════════════════════════════════════
// SLIDE 1 — INTRO
// ═══════════════════════════════════════════════════════════
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="JURIDIK"
    titel="Diskriminering och <span style='color:#FF5421'>likabehandling</span>"
    ingress="Styrelsen fattar beslut som påverkar medlemmars vardag. I det här avsnittet lär du dig vad diskrimineringslagen kräver — och hur ni undviker vanliga fallgropar."
    bild={IMGS.manniskor}
    längd="45 min"
    avsnitt={5}
    onStart={onStart}
    videoUrl="/video/intro-diskriminering.mp4"
    videoTitel="Introduktion till diskrimineringslagen"
    vadLärDuDig={[
      'De sju diskrimineringsgrunderna',
      'Skillnaden mellan direkt och indirekt diskriminering',
      'Vanliga BRF-situationer och rätt hantering',
      'Så dokumenterar ni beslut för att undvika problem',
      'Hur ni hanterar anmälningar om trakasserier',
      'Vad som gäller kring tillgänglighet och anpassning',
    ]}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 2 — VAD ÄR DISKRIMINERING?
// ═══════════════════════════════════════════════════════════
const VadArDiskrimineringSlide = () => (
  <SplitSlide
    badge="Avsnitt 01 · Grunderna"
    title="Vad är <span style='color:#FF5421'>diskriminering?</span>"
    ingress="Diskriminering handlar inte om avsikt — det handlar om effekt. När någon behandlas sämre på grund av en skyddad egenskap har diskriminering skett, oavsett om det var medvetet eller inte."
    bild={IMGS.juridik}
    bildPosition="right"
    badge2="Diskrimineringslagen (2008:567)"
    badge2Sub="Gäller även bostadsrättsföreningar"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Sämre behandling',
        desc: 'Någon behandlas sämre än en annan person skulle ha behandlats i en jämförbar situation.',
      },
      {
        nr: '02',
        titel: 'Kopplat till skyddad grund',
        desc: 'Den sämre behandlingen har samband med en av de sju diskrimineringsgrunderna — kön, etnicitet, religion, funktionsnedsättning, sexuell läggning, ålder, könsöverskridande identitet.',
      },
      {
        nr: '03',
        titel: 'Effekten — inte avsikten',
        desc: 'Lagen frågar inte "vad menade ni?" utan "vilket blev resultatet?". Även välmenande beslut kan vara diskriminerande.',
      },
    ]} />
    <InfoRuta>
      Tre vanliga missuppfattningar: "Vi har alltid gjort så här", "Vi menade inte illa", "Det är bara grannar som bråkar" — inget av detta skyddar föreningen från ansvar.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 3 — DE SJU GRUNDERNA (interaktiv)
// ═══════════════════════════════════════════════════════════

interface GrundKort {
  id: string;
  label: string;
  kort: string;
  full: string;
  exempel: string;
}

const GRUNDER: GrundKort[] = [
  {
    id: 'kon',
    label: 'Kön',
    kort: 'Kvinna, man eller annat kön.',
    full: 'Skyddar mot sämre behandling på grund av att någon är kvinna, man eller annat kön. Gäller t.ex. vid styrelserekrytering, hantering av klagomål och fördelning av förmåner.',
    exempel: 'En kvinnas förslag på styrelsemötet ignoreras systematiskt, medan identiska förslag från manliga ledamöter lyfts fram.',
  },
  {
    id: 'konsidentitet',
    label: 'Könsöverskridande identitet',
    kort: 'Transpersoner och icke-binära.',
    full: 'Skyddar personer som inte identifierar sig med sitt juridiska kön eller uttrycker sitt kön på ett sätt som avviker från normen.',
    exempel: 'En icke-binär ledamot ber att kallas "hen" i protokollet. Att konsekvent ignorera detta kan vara trakasserier.',
  },
  {
    id: 'etnicitet',
    label: 'Etnisk tillhörighet',
    kort: 'Nationellt ursprung, hudfärg.',
    full: 'Skyddar mot diskriminering på grund av nationellt eller etniskt ursprung, hudfärg eller liknande. Detta är den vanligaste diskrimineringsgrunden i bostadsärenden.',
    exempel: 'Styrelsen är snabbare att skicka varningar till familjer med utländsk bakgrund vid liknande störningsärenden.',
  },
  {
    id: 'religion',
    label: 'Religion/trosuppfattning',
    kort: 'Religiös eller filosofisk övertygelse.',
    full: 'Skyddar mot diskriminering på grund av religiös tro eller filosofisk övertygelse. Gäller uthyrning av lokal, hantering av symboler, matkrav vid gemensamma evenemang.',
    exempel: 'Föreningen hyr ut lokalen till privatfester men nekar en muslimsk fredagsbön utan saklig motivering.',
  },
  {
    id: 'funktion',
    label: 'Funktionsnedsättning',
    kort: 'Fysisk eller psykisk nedsättning.',
    full: 'Kräver att skäliga tillgänglighetsåtgärder görs. Bristande tillgänglighet räknas sedan 2015 som en form av diskriminering. Assistanshund är ett hjälpmedel, inte husdjur.',
    exempel: 'En rullstolsburen medlem nekas delta på stämman som hålls i en otillgänglig lokal utan att alternativ erbjuds.',
  },
  {
    id: 'sexuell',
    label: 'Sexuell läggning',
    kort: 'Hetero-, homo-, bisexuell.',
    full: 'Skyddar alla sexuella läggningar mot diskriminering. Gäller vid uthyrning av lokaler, medlemsansökningar och behandling av ärenden.',
    exempel: 'Föreningen nekar uthyrning av festlokalen till ett samkönat bröllop men hyr ut till andra privatfester.',
  },
  {
    id: 'alder',
    label: 'Ålder',
    kort: 'Alla åldrar skyddas.',
    full: 'Skyddar mot diskriminering på grund av ålder — gäller alla åldrar, inte bara äldre. Åldersgränser i stadgar eller vid rekrytering kräver sakliga skäl.',
    exempel: 'Stadgarna kräver att styrelseledamöter är under 65 år utan saklig grund — åldersdiskriminering.',
  },
];

const GrundModal = ({ kort, onClose }: { kort: GrundKort | null; onClose: () => void }) => (
  <AnimatePresence>
    {kort && (
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
            <div className="bg-white w-full h-full md:h-auto md:max-w-xl md:rounded-3xl md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
              <div className="px-6 sm:px-8 pt-7 pb-4 border-b" style={{ borderColor: '#f0ede8' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
                  Skyddad grund
                </p>
                <h3 className="text-3xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {kort.label}
                </h3>
                <button onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: '#f0ede8' }}>
                  <X size={16} style={{ color: '#1a1a1a' }} />
                </button>
              </div>
              <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5 flex-1">
                <p className="text-base text-gray-700 leading-relaxed">{kort.full}</p>
                <div className="rounded-2xl p-5 border-l-4" style={{ borderColor: O, background: OL }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
                    Exempel ur en BRF
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed italic">{kort.exempel}</p>
                </div>
                <div className="h-4 md:hidden" />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const SjuGrunderSlide = () => {
  const [active, setActive] = useState<GrundKort | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (grund: GrundKort) => {
    setActive(grund);
    setViewed(prev => new Set([...prev, grund.id]));
  };

  return (
    <div className="h-full relative overflow-hidden">
      <img src={IMGS.manniskor} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 pb-28">

          <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: `${O}22`, color: O, border: `1px solid ${O}40` }}>
            Avsnitt 02 · De sju grunderna
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4 flex items-center gap-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Shield className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
            Sju skyddade grunder
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl">
            Diskrimineringslagen skyddar sju specifika grunder. Klicka på varje grund för att se
            vad den innebär och ett konkret BRF-exempel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {GRUNDER.map((g, i) => {
              const isViewed = viewed.has(g.id);
              return (
                <motion.button key={g.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(g)}
                  className="text-left rounded-2xl p-4 transition-all border-2"
                  style={{
                    background: isViewed ? `${O}18` : 'rgba(255,255,255,0.06)',
                    borderColor: isViewed ? O : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-black text-base text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {g.label}
                    </p>
                    {isViewed && (
                      <CheckCircle size={16} style={{ color: O, flexShrink: 0, marginTop: 2 }} />
                    )}
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed">{g.kort}</p>
                </motion.button>
              );
            })}
          </div>

          {viewed.size > 0 && viewed.size < GRUNDER.length && (
            <p className="text-center text-xs text-white/40">
              {viewed.size}/{GRUNDER.length} utforskade
            </p>
          )}
          {viewed.size === GRUNDER.length && (
            <p className="text-center text-xs font-semibold" style={{ color: OL }}>
              ✓ Du har utforskat alla sju grunder!
            </p>
          )}
        </div>
      </div>

      <GrundModal kort={active} onClose={() => setActive(null)} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 4 — DIREKT VS INDIREKT
// ═══════════════════════════════════════════════════════════
const DirektIndirektSlide = () => (
  <SplitSlide
    badge="Avsnitt 03 · Former av diskriminering"
    title="Direkt och <span style='color:#FF5421'>indirekt</span> diskriminering"
    ingress="Två huvudformer — lätta att blanda ihop, men juridiskt mycket olika. Det är viktigt att ni känner igen båda."
    bild={IMGS.juridik}
    bildPosition="right"
    badge2="Testet: vem drabbas?"
    badge2Sub="Och varför?"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Direkt diskriminering',
        desc: 'Någon behandlas sämre än en jämförbar person och det beror på en skyddad egenskap. Exempel: en styrelse nekar uthyrning med hänvisning till sökandes etnicitet.',
      },
      {
        nr: '02',
        titel: 'Indirekt diskriminering',
        desc: 'En regel som verkar neutral drabbar en skyddad grupp oproportionerligt. Exempel: "5 års boende för styrelseuppdrag" utesluter systematiskt nyanlända.',
      },
      {
        nr: '03',
        titel: 'Proportionalitetstestet',
        desc: 'Indirekt diskriminering kan tillåtas om regeln har ett legitimt syfte OCH är nödvändig OCH proportionerlig. Alla tre kraven måste uppfyllas.',
      },
      {
        nr: '04',
        titel: 'Trakasserier & repressalier',
        desc: 'Utöver direkt/indirekt finns även trakasserier (kränkande beteende kopplat till skyddad grund) och repressalier (att straffa någon för en anmälan).',
      },
    ]} />
    <InfoRuta>
      Granska era ordningsregler och rutiner regelbundet: drabbar någon regel en grupp mer än andra? Finns ett legitimt syfte? Kan ni nå syftet på mindre ingripande sätt?
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 5 — QUIZ BLOCK 1 (12 frågor)
// ═══════════════════════════════════════════════════════════
const QuizBlock1Slide = ({
  onComplete, onNext, isDone,
}: {
  onComplete: (id: string) => void;
  onNext: () => void;
  isDone: boolean;
}) => (
  <SlideK
    fragor={diskrimineringFragorBlock1}
    completionId="diskriminering-quiz-1"
    onComplete={onComplete}
    onNext={onNext}
    isDone={isDone}
    bakgrundsbild={IMGS.stamma}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 6 — QUIZ BLOCK 2 (12 frågor)
// ═══════════════════════════════════════════════════════════
const QuizBlock2Slide = ({
  onComplete, onNext, isDone,
}: {
  onComplete: (id: string) => void;
  onNext: () => void;
  isDone: boolean;
}) => (
  <SlideK
    fragor={diskrimineringFragorBlock2}
    completionId="diskriminering-quiz-2"
    onComplete={onComplete}
    onNext={onNext}
    isDone={isDone}
    bakgrundsbild={IMGS.juridik}
  />
);

// ═══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════
const Module4Diskriminering: React.FC = () => {
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
      audioSrc: '/audio/diskriminering-intro.mp3',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'vad-ar-diskriminering',
      title: 'Vad är diskriminering?',
      audioSrc: '/audio/diskriminering-vad-ar.mp3',
      component: <VadArDiskrimineringSlide />,
    },
    {
      id: 'sju-grunderna',
      title: 'De sju grunderna',
      audioSrc: '/audio/diskriminering-sju-grunder.mp3',
      component: <SjuGrunderSlide />,
    },
    {
      id: 'direkt-indirekt',
      title: 'Direkt & indirekt',
      audioSrc: '/audio/diskriminering-direkt-indirekt.mp3',
      component: <DirektIndirektSlide />,
    },
    {
      id: 'quiz-block-1',
      title: '🧠 Quiz · Grundläggande situationer',
      component: (
        <QuizBlock1Slide
          onComplete={handleComplete}
          onNext={() => setCurrentIndex(i => i + 1)}
          isDone={completedLessons.has('diskriminering-quiz-1')}
        />
      ),
    },
    {
      id: 'quiz-block-2',
      title: '🧠 Quiz · Komplexa avvägningar',
      component: (
        <QuizBlock2Slide
          onComplete={handleComplete}
          onNext={() => setCurrentIndex(i => i + 1)}
          isDone={completedLessons.has('diskriminering-quiz-2')}
        />
      ),
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
        title="Frågor om diskriminering i BRF"
        subtitle="Vanliga frågor om hur ni hanterar likabehandling"
        buttonColor={O}
      />
    </div>
  );
};

export default Module4Diskriminering;