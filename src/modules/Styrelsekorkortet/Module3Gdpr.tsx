// src/modules/Styrelsekorkortet/Module3Gdpr.tsx
// Förenklad GDPR-modul — bygger på samma designspråk som
// Module4Diskriminering (SplitSlide, interaktiva kort, SlideK-quiz).
//
// STRUKTUR:
//  1. Intro (ModuleIntroSlide)
//  2. Vad är GDPR? — SplitSlide med de sex principerna
//  3. Medlemmarnas rättigheter — interaktiva kort
//  4. Rättsliga grunder & kamera — SplitSlide
//  5. Quiz 1 (SlideK, 12 frågor) — Grunderna
//  6. Säkerhet, gallring & incidenter — SplitSlide
//  7. Quiz 2 (SlideK, 12 frågor) — Praktiska situationer

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Database, Lock, X, CheckCircle } from 'lucide-react';

import CourseHeader         from '../../components/CourseElements/CourseHeader';
import GlobalSidebar        from '../../components/GlobalSidebar';
import FloatingFAQ          from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout    from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide     from '../../components/CourseElements/ModuleIntroSlide';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import { SlideK }           from '../../components/CourseElements/SlideTemplates';

import { gdprFragorBlock1 } from '../../data/gdprFragorBlock1';
import { gdprFragorBlock2 } from '../../data/gdprFragorBlock2';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

const IMGS = {
  juridik:    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  data:       'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=80',
  kontor:     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  hemsida:    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80',
  sakerhet:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
  medlemmar:  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
};

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Behöver vår BRF ett dataskyddsombud?',
    answer:
      'Nej, de flesta BRF:er är för små för att vara skyldiga att utse ett formellt dataskyddsombud. Men någon i styrelsen bör ha huvudansvar för GDPR-arbetet.',
  },
  {
    question: 'Hur länge får vi spara protokoll?',
    answer:
      'Stämmoprotokoll bevaras permanent. Styrelseprotokoll ofta 10+ år. Minimera personuppgifter i protokollen — skriv fakta, inte värderingar.',
  },
  {
    question: 'Vad händer om vi bryter mot GDPR?',
    answer:
      'IMY kan utfärda anmärkningar, förelägganden och sanktionsavgifter. För BRF:er ofta lägre belopp, men förtroendeskadan och skadeståndskrav från drabbade medlemmar kan bli större problem än böterna.',
  },
  {
    question: 'Behöver vi samtycke för kontaktuppgifter?',
    answer:
      'Nej — kontaktuppgifter för löpande förvaltning av medlemskapet behandlas med stöd av avtal eller rättslig förpliktelse. Samtycke används främst för frivilliga ändamål som nyhetsbrev.',
  },
  {
    question: 'Vad är ett personuppgiftsbiträdesavtal?',
    answer:
      'Ett skriftligt avtal (PUB-avtal) med externa leverantörer som hanterar era personuppgifter — förvaltare, IT-leverantörer, revisorer. Kravet finns i GDPR artikel 28.',
  },
];

// ═══════════════════════════════════════════════════════════
// SLIDE 1 — INTRO
// ═══════════════════════════════════════════════════════════
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="JURIDIK"
    titel="GDPR för <span style='color:#FF5421'>BRF-styrelsen</span>"
    ingress="Ni hanterar personuppgifter varje dag — medlemsregister, fakturor, protokoll, kameror. Lär dig vad lagen kräver och hur ni skyddar medlemmarnas integritet utan att krångla till vardagen."
    bild={IMGS.data}
    längd="45 min"
    avsnitt={7}
    onStart={onStart}
    videoUrl="/video/intro-gdpr.mp4"
    videoTitel="Introduktion till GDPR i BRF"
    vadLärDuDig={[
      'De sex grundprinciperna i GDPR',
      'Skillnaden mellan personuppgiftsansvarig och biträde',
      'Fyra rättsliga grunder — och vilken som gäller när',
      'Regler för kameraövervakning i BRF',
      'Medlemmarnas sex rättigheter',
      'Så hanterar ni incidenter inom 72 timmar',
    ]}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 2 — VAD ÄR GDPR?
// ═══════════════════════════════════════════════════════════
const VadArGdprSlide = () => (
  <SplitSlide
    badge="Avsnitt 01 · Grunderna"
    title="GDPR — sex <span style='color:#FF5421'>grundprinciper</span>"
    ingress="GDPR trädde i kraft 25 maj 2018 och gäller alla som hanterar personuppgifter om personer i EU — inklusive bostadsrättsföreningar. All behandling måste följa sex grundprinciper."
    bild={IMGS.juridik}
    bildPosition="right"
    badge2="Dataskyddsförordningen"
    badge2Sub="Gäller alla BRF:er oavsett storlek"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Laglighet & öppenhet',
        desc: 'Uppgifter får bara behandlas om det finns en laglig grund. Behandlingen ska vara korrekt och transparent mot de registrerade.',
      },
      {
        nr: '02',
        titel: 'Ändamålsbegränsning',
        desc: 'Uppgifter får bara samlas in för specifika, uttryckliga och legitima ändamål. Får inte användas till något annat senare.',
      },
      {
        nr: '03',
        titel: 'Uppgiftsminimering',
        desc: 'Bara de uppgifter som faktiskt behövs för ändamålet får samlas in. Inte "för säkerhets skull".',
      },
      {
        nr: '04',
        titel: 'Riktighet',
        desc: 'Personuppgifter ska vara korrekta och hållas aktuella. Felaktiga uppgifter ska rättas utan dröjsmål.',
      },
      {
        nr: '05',
        titel: 'Lagringsminimering',
        desc: 'Uppgifter får inte sparas längre än nödvändigt. Ha rutiner för när och hur gallring sker.',
      },
      {
        nr: '06',
        titel: 'Integritet & konfidentialitet',
        desc: 'Skydda uppgifterna mot obehörig åtkomst, förlust eller förstöring. Tekniska och organisatoriska åtgärder krävs.',
      },
    ]} />
    <InfoRuta>
      IMY (Integritetsskyddsmyndigheten) utövar tillsyn i Sverige. De kan utfärda sanktionsavgifter — men förtroendeskadan efter en incident blir ofta större än bötesbeloppet.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 3 — MEDLEMMARNAS RÄTTIGHETER (interaktiv)
// ═══════════════════════════════════════════════════════════

interface Rättighet {
  id: string;
  label: string;
  kort: string;
  full: string;
  rutin: string;
}

const RÄTTIGHETER: Rättighet[] = [
  {
    id: 'information',
    label: 'Rätt till information',
    kort: 'Veta att och varför ni behandlar uppgifter.',
    full: 'Den registrerade har rätt att veta att ni behandlar deras uppgifter, varför, hur länge och vem som är ansvarig. Informationen ska ges i samband med inträde i föreningen.',
    rutin: 'Skicka en kort integritetspolicy till nya medlemmar. Publicera den på hemsidan. En sida räcker.',
  },
  {
    id: 'tillgang',
    label: 'Rätt till tillgång',
    kort: 'Registerutdrag på begäran.',
    full: 'Varje person har rätt att begära ett registerutdrag — en kopia på alla uppgifter ni har om dem. Gratis och inom en månad.',
    rutin: 'Ha en rutin för vem som hanterar begäran och var uppgifterna finns. Mall för utdraget. Då blir varje begäran bara en rutinärende.',
  },
  {
    id: 'rattelse',
    label: 'Rätt till rättelse',
    kort: 'Felaktiga uppgifter ska rättas.',
    full: 'Om uppgifter är felaktiga — fel adress, gammalt telefonnummer, felstavat namn — ska de rättas utan dröjsmål. Även inaktuell information räknas som felaktig.',
    rutin: 'Uppdatera omedelbart vid anmälan. Bekräfta skriftligt att ändringen gjorts. Ge gärna medlemmar tillgång att uppdatera själva.',
  },
  {
    id: 'radering',
    label: 'Rätt till radering',
    kort: 'Rätten att bli glömd.',
    full: 'Den registrerade kan begära att uppgifter raderas. Men rätten är inte absolut — bokföringslagen kräver att ekonomiska handlingar sparas i 7 år. Stämmoprotokoll bevaras permanent.',
    rutin: 'Bedöm vad som kan raderas omedelbart (kontaktuppgifter, fritextkommentarer) och vad som måste sparas enligt lag. Dokumentera bedömningen och informera medlemmen.',
  },
  {
    id: 'begransning',
    label: 'Rätt till begränsning',
    kort: 'Stopp för behandling vid tvist.',
    full: 'Medan en tvist om riktigheten eller lagligheten pågår kan behandlingen begränsas. Ni får lagra uppgifterna men inte behandla dem aktivt.',
    rutin: 'Märk uppgifterna som "begränsade" i systemet. Behandla dem inte förrän tvisten är löst. Dokumentera begränsningen.',
  },
  {
    id: 'invanda',
    label: 'Rätt att invända',
    kort: 'Invändning mot berättigat intresse.',
    full: 'Om behandlingen grundas på "berättigat intresse" kan den registrerade invända. Ni måste då göra en ny avvägning mellan föreningens intresse och individens.',
    rutin: 'Ta invändningen på allvar. Gör ny intresseavvägning. Dokumentera avvägningen. Om föreningens intresse inte är starkare — avsluta behandlingen.',
  },
];

const RättighetModal = ({ rätt, onClose }: { rätt: Rättighet | null; onClose: () => void }) => (
  <AnimatePresence>
    {rätt && (
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
                  Medlemsrättighet
                </p>
                <h3 className="text-3xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {rätt.label}
                </h3>
                <button onClick={onClose}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: '#f0ede8' }}>
                  <X size={16} style={{ color: '#1a1a1a' }} />
                </button>
              </div>
              <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5 flex-1">
                <p className="text-base text-gray-700 leading-relaxed">{rätt.full}</p>
                <div className="rounded-2xl p-5 border-l-4" style={{ borderColor: O, background: OL }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
                    Så gör ni
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{rätt.rutin}</p>
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

const RättigheterSlide = () => {
  const [active, setActive] = useState<Rättighet | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (r: Rättighet) => {
    setActive(r);
    setViewed(prev => new Set([...prev, r.id]));
  };

  return (
    <div className="h-full relative overflow-hidden">
      <img src={IMGS.medlemmar} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 pb-28">

          <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: `${O}22`, color: O, border: `1px solid ${O}40` }}>
            Avsnitt 02 · Medlemmarnas rättigheter
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4 flex items-center gap-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            <Users className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
            Sex rättigheter
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl">
            GDPR ger medlemmarna sex specifika rättigheter gentemot er. Klicka på varje rättighet för att se
            vad den innebär och hur ni hanterar den praktiskt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {RÄTTIGHETER.map((r, i) => {
              const isViewed = viewed.has(r.id);
              return (
                <motion.button key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(r)}
                  className="text-left rounded-2xl p-4 transition-all border-2"
                  style={{
                    background: isViewed ? `${O}18` : 'rgba(255,255,255,0.06)',
                    borderColor: isViewed ? O : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-black text-base text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {r.label}
                    </p>
                    {isViewed && <CheckCircle size={16} style={{ color: O, flexShrink: 0, marginTop: 2 }} />}
                  </div>
                  <p className="text-white/55 text-xs leading-relaxed">{r.kort}</p>
                </motion.button>
              );
            })}
          </div>

          {viewed.size > 0 && viewed.size < RÄTTIGHETER.length && (
            <p className="text-center text-xs text-white/40">
              {viewed.size}/{RÄTTIGHETER.length} utforskade
            </p>
          )}
          {viewed.size === RÄTTIGHETER.length && (
            <p className="text-center text-xs font-semibold" style={{ color: OL }}>
              ✓ Du har utforskat alla sex rättigheter!
            </p>
          )}
        </div>
      </div>

      <RättighetModal rätt={active} onClose={() => setActive(null)} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// SLIDE 4 — RÄTTSLIGA GRUNDER & KAMERA
// ═══════════════════════════════════════════════════════════
const RattsligaGrunderSlide = () => (
  <SplitSlide
    badge="Avsnitt 03 · Rättslig grund"
    title="Fyra <span style='color:#FF5421'>rättsliga grunder</span>"
    ingress="All behandling av personuppgifter kräver en laglig grund. Här är de fyra som är mest relevanta för en BRF — välj den starkaste som passar syftet."
    bild={IMGS.kontor}
    bildPosition="left"
    badge2="Starkast först"
    badge2Sub="Undvik samtycke när möjligt"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Rättslig förpliktelse',
        desc: 'Lagen kräver behandlingen. Bokföringslagen (7-årsregeln), bostadsrättslagen (medlemsförteckning), skattelagstiftning. Inget samtycke behövs.',
      },
      {
        nr: '02',
        titel: 'Avtal',
        desc: 'Behandlingen behövs för att uppfylla ett avtal med personen. Medlemskap, hyresavtal, överlåtelseavtal, styrelsearvode.',
      },
      {
        nr: '03',
        titel: 'Berättigat intresse',
        desc: 'Föreningens legitima intresse väger tyngre än integriteten. Kräver dokumenterad intresseavvägning. Exempel: kameraövervakning, störningshantering.',
      },
      {
        nr: '04',
        titel: 'Samtycke',
        desc: 'Frivilligt och informerat. Kan återkallas när som helst — därför svagast. Används för frivilliga ändamål som nyhetsbrev och fotografering.',
      },
    ]} />
    <InfoRuta>
      Kameraövervakning kräver proportionalitetsbedömning (dokumenterad), synlig skyltning och kort lagringstid (ofta 72 timmar, max 30 dagar). Biträdesavtal med kamerasystemsleverantören.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 5 — QUIZ BLOCK 1
// ═══════════════════════════════════════════════════════════
const QuizBlock1Slide = ({
  onComplete, onNext, isDone,
}: {
  onComplete: (id: string) => void;
  onNext: () => void;
  isDone: boolean;
}) => (
  <SlideK
    fragor={gdprFragorBlock1}
    completionId="gdpr-quiz-1"
    onComplete={onComplete}
    onNext={onNext}
    isDone={isDone}
    bakgrundsbild={IMGS.data}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 6 — SÄKERHET, GALLRING & INCIDENTER
// ═══════════════════════════════════════════════════════════
const SakerhetSlide = () => (
  <SplitSlide
    badge="Avsnitt 04 · Praktiken"
    title="Säkerhet, <span style='color:#FF5421'>gallring</span> och incidenter"
    ingress="GDPR handlar inte bara om regler — det handlar om vardagsrutiner. Tre områden där ni som styrelse faktiskt måste agera löpande."
    bild={IMGS.sakerhet}
    bildPosition="right"
    badge2="Incident?"
    badge2Sub="72 timmar till IMY"
  >
    <StegLista steg={[
      {
        nr: '01',
        titel: 'Begränsa åtkomsten',
        desc: 'Bara de som behöver uppgifterna för sitt uppdrag ska ha tillgång. Unika inloggningar per ledamot. Återkalla åtkomst direkt vid avgång.',
      },
      {
        nr: '02',
        titel: 'Kryptera känslig data',
        desc: 'Heldiskkryptering på mobila enheter (BitLocker/FileVault). Aldrig personnummer eller ekonomiska uppgifter i okrypterad e-post.',
      },
      {
        nr: '03',
        titel: 'Årsrutin för gallring',
        desc: 'Boka in en timme varje januari — gå igenom register, radera uppgifter som passerat sin gallringstid, dokumentera vad som gjorts.',
      },
      {
        nr: '04',
        titel: 'Incidentplan redo',
        desc: 'Bestäm i förväg: vem anmäler vid incident, var dokumenteras, hur informeras drabbade. Mall färdig INNAN något händer. 72 timmar till IMY gäller vid risk.',
      },
    ]} />
    <InfoRuta>
      PUB-avtal (personuppgiftsbiträdesavtal) krävs med alla som hanterar era personuppgifter: förvaltare, IT-leverantörer, bokningssystem, revisorer. Kontrollera era leverantörer.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 7 — QUIZ BLOCK 2
// ═══════════════════════════════════════════════════════════
const QuizBlock2Slide = ({
  onComplete, onNext, isDone,
}: {
  onComplete: (id: string) => void;
  onNext: () => void;
  isDone: boolean;
}) => (
  <SlideK
    fragor={gdprFragorBlock2}
    completionId="gdpr-quiz-2"
    onComplete={onComplete}
    onNext={onNext}
    isDone={isDone}
    bakgrundsbild={IMGS.sakerhet}
  />
);

// ═══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════
const Module3Gdpr: React.FC = () => {
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
      audioSrc: '/audio/gdpr-intro.mp3',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'vad-ar-gdpr',
      title: 'Vad är GDPR?',
      audioSrc: '/audio/gdpr-vad-ar.mp3',
      component: <VadArGdprSlide />,
    },
    {
      id: 'rattigheter',
      title: 'Medlemmarnas rättigheter',
      audioSrc: '/audio/gdpr-rattigheter.mp3',
      component: <RättigheterSlide />,
    },
    {
      id: 'rattsliga-grunder',
      title: 'Rättsliga grunder',
      audioSrc: '/audio/gdpr-rattsliga-grunder.mp3',
      component: <RattsligaGrunderSlide />,
    },
    {
      id: 'quiz-block-1',
      title: '🧠 Quiz · Grunderna',
      component: (
        <QuizBlock1Slide
          onComplete={handleComplete}
          onNext={() => setCurrentIndex(i => i + 1)}
          isDone={completedLessons.has('gdpr-quiz-1')}
        />
      ),
    },
    {
      id: 'sakerhet',
      title: 'Säkerhet & gallring',
      audioSrc: '/audio/gdpr-sakerhet.mp3',
      component: <SakerhetSlide />,
    },
    {
      id: 'quiz-block-2',
      title: '🧠 Quiz · Praktiska situationer',
      component: (
        <QuizBlock2Slide
          onComplete={handleComplete}
          onNext={() => setCurrentIndex(i => i + 1)}
          isDone={completedLessons.has('gdpr-quiz-2')}
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
        title="Vanliga GDPR-frågor"
        subtitle="Svar på de vanligaste frågorna om GDPR i BRF"
        buttonColor={O}
        kursämne="GDPR och dataskydd för bostadsrättsföreningar"
      />
    </div>
  );
};

export default Module3Gdpr;