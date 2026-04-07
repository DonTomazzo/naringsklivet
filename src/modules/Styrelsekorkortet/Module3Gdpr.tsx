// src/modules/Styrelsekorkortet/Module3Gdpr.tsx
// Uppgraderad med ModuleIntroSlide, SplitSlide och InlineQuiz per block

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, Shield, Database,
         Users, Scale, Camera, Lock,
         FileText, Target, Zap, AlertTriangle, HelpCircle } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer       from '../../components/AudioPlayer';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide  from '../../components/CourseElements/ModuleIntroSlide';
import SplitSlide, { StegLista, CheckLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprPrinciplesSection from '../../components/CourseElements/GdprPrinciplesSection';
import GdprMjukIntroSlide    from '../../components/CourseElements/GdprMjukIntroSlide';
import Slide5Personuppgifter from '../../components/CourseElements/Slide5Personuppgifter';
import GdprRolesSection      from '../../components/CourseElements/GdprRolesSection';
import AudioCTA              from '../../components/CourseElements/AudioCTA';
import { gdprQuiz }          from '../../data/quizzes/gdpr-quiz';
import GdprQuizOverlay       from '../../components/CourseElements/GdprQuizOverlay';

const O  = '#FF5421';
const OD = '#E04619';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  { question: 'Måste vår BRF ha ett dataskyddsombud?', answer: 'Nej, de flesta BRF:er är för små för att vara skyldiga att utse ett dataskyddsombud. Men ni måste ändå följa GDPR.' },
  { question: 'Hur länge får vi spara protokoll?', answer: 'Styrelseprotokoll bör sparas i minst 10 år. Personuppgifter i protokollet ska minimeras – skriv inte mer om enskilda personer än nödvändigt.' },
  { question: 'Vad händer om vi bryter mot GDPR?', answer: 'IMY kan utfärda anmärkningar, förelägganden och sanktionsavgifter. För BRF:er rör det sig oftast om lägre belopp, men det kan bli kostsamt.' },
  { question: 'Behöver vi samtycke för kontaktuppgifter?', answer: 'Nej – kontaktuppgifter för löpande förvaltning av medlemskapet behandlas med stöd av avtal eller rättslig förpliktelse.' },
  { question: 'Vad är ett biträdesavtal?', answer: 'Ett skriftligt avtal med externa leverantörer som behandlar personuppgifter på er uppdrag. Kravet finns i GDPR artikel 28.' },
];

// ─── Delade stilkomponenter ───────────────────────────────
const SlideShell = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={`h-full w-full overflow-y-auto ${dark ? 'bg-[#0f1623]' : 'bg-[#F8F7F4]'}`}
    style={{ paddingTop: 'var(--header-height, 60px)' }}>
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 pb-28">{children}</div>
  </div>
);

const Badge = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <div className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide uppercase ${
    dark ? 'bg-[#FF5421]/20 text-[#FF5421] border border-[#FF5421]/30' : 'bg-[#FF5421]/10 text-[#FF5421]'
  }`}>{text}</div>
);

const H = ({ icon: Icon, title, dark = false }: { icon: React.ElementType; title: string; dark?: boolean }) => (
  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-3 leading-tight ${dark ? 'text-white' : 'text-slate-800'}`}
    style={{ fontFamily: "'Nunito', sans-serif" }}>
    <Icon className="w-8 h-8 text-[#FF5421] flex-shrink-0" />{title}
  </h2>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 1 – INTRO
// ═══════════════════════════════════════════════════════════
const IntroSlide = ({ onStart, onQuizOpen }: { onStart: () => void; onQuizOpen: () => void }) => (
  <ModuleIntroSlide
    kategori="JURIDIK"
    titel="GDPR för <span style='color:#FF5421'>BRF-styrelsen</span>"
    ingress="Som styrelseledamot hanterar du personuppgifter varje dag – medlemsregister, fakturor, protokoll, kamerainspelningar. Lär dig vad GDPR kräver och hur ni skyddar medlemmarnas integritet."
    bild="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80"
    längd="3 timmar"
    avsnitt={13}
    onStart={onStart}
    vadLärDuDig={[
      'GDPR:s sju grundprinciper och vad de innebär i praktiken',
      'Vilka personuppgifter er BRF hanterar och var de finns',
      'De fyra rättsliga grunderna – och vilken som gäller när',
      'Regler för kameraövervakning i BRF',
      'Privacy by Design och dataskydd som standard',
      'Vad som händer om ni bryter mot GDPR',
    ]}
  />
);

// ═══════════════════════════════════════════════════════════
// SLIDE 2 – VAD ÄR GDPR? (befintlig komponent)
// ═══════════════════════════════════════════════════════════
const VadArGdprSlide = () => (
  <div className="h-full relative overflow-hidden" style={{ paddingTop: 'var(--header-height, 60px)' }}>
    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
      alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/55" />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 pb-28">
        <Badge text="Block 1 · Grunderna" dark />
        <p className="font-bold text-white text-xl sm:text-2xl mb-2">GDPR:s sju principer</p>
        <p className="text-white/60 text-sm mb-6">Klicka på varje cirkel för att läsa mer</p>
        <p className="text-white/80 text-base leading-relaxed mb-8 max-w-2xl">
          GDPR – <em>General Data Protection Regulation</em> – är EU:s dataskyddsförordning
          sedan 25 maj 2018. Den vilar på sju grundprinciper.
        </p>
        <GdprPrinciplesSection />
        <div className="mt-8 p-4 rounded-xl border-l-4 border-orange-400 bg-black/40 backdrop-blur-sm max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest mb-1 text-orange-400">IMY – Integritetsskyddsmyndigheten</p>
          <p className="text-sm text-white/80 leading-relaxed">
            IMY är den svenska tillsynsmyndigheten. De kan utfärda böter på upp till 20 miljoner euro eller 4% av omsättningen.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 3 – VILKA UPPGIFTER (SplitSlide)
// ═══════════════════════════════════════════════════════════
const VilkaUppgifterSlide = () => (
  <SplitSlide
    badge="Block 1 · Personuppgifter"
    title="Vad är en <span style='color:#FF5421'>personuppgift?</span>"
    ingress="All information som direkt eller indirekt kan kopplas till en levande fysisk person. Ni hanterar troligtvis fler uppgifter än ni tror."
    bild="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80"
    bildPosition="right"
    badge2="Tumregel"
    badge2Sub="Kartlägg en gång per år"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div className="rounded-2xl p-4 border-2 border-gray-200 bg-white">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>Vanliga uppgifter</p>
        <CheckLista punkter={[
          'Namn, adress, e-post, telefon',
          'Lägenhetsnummer',
          'Bankkontonummer',
          'Köpeavtal och överlåtelsehandlingar',
          'Protokoll där namn förekommer',
        ]} />
      </div>
      <div className="rounded-2xl p-4 border-2 border-red-200 bg-red-50">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-red-600">Känsliga uppgifter</p>
        <CheckLista punkter={[
          'Hälsoinformation',
          'Etniskt ursprung',
          'Religiös övertygelse',
          'Politisk åsikt',
          'Biometriska uppgifter',
        ]} />
        <p className="text-xs text-red-600 mt-3 font-medium">⚠️ Kräver explicit samtycke</p>
      </div>
    </div>
    <InfoRuta>
      Gör en enkel kartläggning en gång per år — lista var ni lagrar personuppgifter, varför, hur länge och vem som har åtkomst.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 4 – QUIZ 1
// ═══════════════════════════════════════════════════════════
const Quiz1Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <SlideShell dark>
    <Badge text="Kunskapstest · Block 1" dark />
    <H icon={HelpCircle} title="GDPR:s grunder" dark />
    <p className="text-white/60 text-sm mb-6">Tre frågor om GDPR:s principer och personuppgifter.</p>
    <InlineQuiz dark onComplete={() => onComplete('quiz-1')} questions={[
      {
        id: 'q1', question_text: 'Sedan vilket år gäller GDPR?',
        question_type: 'single_choice', question_order: 1,
        options: { choices: ['2015', '2016', '2018', '2020'] },
        correct_answer: '2018',
        explanation: 'GDPR trädde i kraft den 25 maj 2018 i hela EU.',
        points: 100,
      },
      {
        id: 'q2', question_text: 'Vilken myndighet är tillsynsmyndighet för GDPR i Sverige?',
        question_type: 'single_choice', question_order: 2,
        options: { choices: ['Datainspektionen', 'IMY – Integritetsskyddsmyndigheten', 'Bolagsverket', 'Konsumentverket'] },
        correct_answer: 'IMY – Integritetsskyddsmyndigheten',
        explanation: 'IMY (Integritetsskyddsmyndigheten) är den svenska tillsynsmyndigheten för GDPR.',
        points: 100,
      },
      {
        id: 'q3', question_text: 'Vilken typ av personuppgift kräver i princip alltid explicit samtycke?',
        question_type: 'single_choice', question_order: 3,
        options: { choices: ['Namn och adress', 'Lägenhetsnummer', 'Hälsoinformation och biometriska uppgifter', 'E-postadress'] },
        correct_answer: 'Hälsoinformation och biometriska uppgifter',
        explanation: 'Känsliga personuppgifter som hälsoinformation och biometriska uppgifter kräver extra skydd och i princip alltid explicit samtycke.',
        points: 100,
      },
    ]} />
  </SlideShell>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 5 – RÄTTSLIGA GRUNDER (SplitSlide)
// ═══════════════════════════════════════════════════════════
const RattsligaGrunderSlide = () => (
  <SplitSlide
    badge="Block 2 · Rättsliga grunder"
    title="Fyra grunder att <span style='color:#FF5421'>känna till</span>"
    ingress="Varje gång ni behandlar en personuppgift måste det finnas en laglig grund. Här är de fyra som är mest relevanta för en BRF."
    bild="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
    bildPosition="left"
    badge2="Viktigast"
    badge2Sub="Rättslig förpliktelse"
  >
    <StegLista steg={[
      {
        nr: '⚖️',
        titel: 'Rättslig förpliktelse',
        desc: 'Ni är skyldiga att behandla uppgifterna enligt lag — bokföring, lägenhetsregister, årsredovisning. Inget samtycke behövs.',
      },
      {
        nr: '📄',
        titel: 'Avtal',
        desc: 'Behandlingen behövs för att uppfylla ett avtal — nyttjanderättsavtal med hyresgäst, överlåtelseavtal vid köp.',
      },
      {
        nr: '✋',
        titel: 'Samtycke',
        desc: 'Frivilligt och informerat samtycke. Kan återkallas när som helst. Använd bara när ingen annan grund passar.',
      },
      {
        nr: '🎯',
        titel: 'Berättigat intresse',
        desc: 'Legitimt intresse som väger tyngre än skyddsintresset. Kräver dokumenterad intresseavvägning.',
      },
    ]} />
    <InfoRuta>
      Dokumentera alltid vilken rättslig grund ni använder för varje typ av behandling — ni kan behöva visa det för IMY.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 6 – KAMERAÖVERVAKNING (SplitSlide)
// ═══════════════════════════════════════════════════════════
const KameraovervakningSlide = () => (
  <SplitSlide
    badge="Block 2 · Kameraövervakning"
    title="Kamera i <span style='color:#FF5421'>BRF:en</span>"
    ingress="Regleras av kamerabevakningslagen (2018:1200) och GDPR. Balansen mellan säkerhet och integritet."
    bild="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
    bildPosition="right"
    badge2="Skyltning"
    badge2Sub="Obligatorisk — alltid"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div className="rounded-2xl p-4 border-2 border-green-200 bg-green-50">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-green-700">✅ Tillåtet</p>
        <CheckLista punkter={[
          'Entré och parkering',
          'Tvättstuga och förråd',
          'Cykelrum och soprum',
        ]} />
      </div>
      <div className="rounded-2xl p-4 border-2 border-amber-200 bg-amber-50">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-amber-700">⚠️ Kräver övervägning</p>
        <CheckLista punkter={[
          'Kamera mot grannens tomt',
          'Inomhus i korridorer',
          'Ansiktsigenkänning',
        ]} />
      </div>
    </div>
    <StegLista steg={[
      { nr: '01', titel: 'Dokumentera syftet', desc: 'Varför sätter ni upp kameran? Spara dokumentationen.' },
      { nr: '02', titel: 'Sätt upp skylt', desc: 'Obligatoriskt. Ska visa vem som ansvarar och kontaktuppgifter.' },
      { nr: '03', titel: 'Bestäm lagringstid', desc: '72 timmar rekommenderas — max 30 dagar.' },
      { nr: '04', titel: 'Biträdesavtal', desc: 'Med leverantören av kamerasystemet.' },
    ]} />
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 7 – QUIZ 2
// ═══════════════════════════════════════════════════════════
const Quiz2Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <SlideShell>
    <Badge text="Kunskapstest · Block 2" />
    <H icon={HelpCircle} title="Rättsliga grunder och kamera" />
    <p className="text-slate-500 text-sm mb-6">Tre frågor om rättsliga grunder och kameraövervakning.</p>
    <InlineQuiz onComplete={() => onComplete('quiz-2')} questions={[
      {
        id: 'q1', question_text: 'Vilken rättslig grund gäller för bokföring och lägenhetsregister?',
        question_type: 'single_choice', question_order: 1,
        options: { choices: ['Samtycke', 'Avtal', 'Rättslig förpliktelse', 'Berättigat intresse'] },
        correct_answer: 'Rättslig förpliktelse',
        explanation: 'Bokföring och lägenhetsregister är lagkrav — de behandlas med stöd av rättslig förpliktelse utan att samtycke behövs.',
        points: 100,
      },
      {
        id: 'q2', question_text: 'Vad är obligatoriskt vid kameraövervakning?',
        question_type: 'single_choice', question_order: 2,
        options: { choices: ['Tillstånd från IMY', 'Synlig skyltning', 'Godkännande från alla boende', 'Inspelning i minst 30 dagar'] },
        correct_answer: 'Synlig skyltning',
        explanation: 'Skyltning är obligatoriskt vid all kameraövervakning. Utan skylt är bevakningen otillåten oavsett syfte.',
        points: 100,
      },
      {
        id: 'q3', question_text: 'Hur länge rekommenderas att kamerainspelningar sparas?',
        question_type: 'single_choice', question_order: 3,
        options: { choices: ['24 timmar', '72 timmar', '7 dagar', '30 dagar'] },
        correct_answer: '72 timmar',
        explanation: '72 timmar är rekommendationen. Maxgränsen är 30 dagar och kräver starka skäl.',
        points: 100,
      },
    ]} />
  </SlideShell>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 8 – PRIVACY BY DESIGN (SplitSlide)
// ═══════════════════════════════════════════════════════════
const PrivacyByDesignSlide = () => (
  <SplitSlide
    badge="Block 3 · Privacy by Design"
    title="Bygg in <span style='color:#FF5421'>skyddet</span> från start"
    ingress="GDPR kräver att ni bygger in integritetsskydd från start — inte lägger till det i efterhand."
    bild="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
    bildPosition="left"
    badge2="Grundregeln"
    badge2Sub="Minsta möjliga data"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div className="rounded-2xl p-4 border-2 overflow-hidden" style={{ borderColor: `${O}30`, background: '#FFF0EB' }}>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} style={{ color: O }} />
          <p className="font-bold text-sm" style={{ color: O }}>Privacy by Design</p>
        </div>
        <p className="text-xs text-gray-600 mb-3">Tänk på dataskydd INNAN ni startar ett projekt.</p>
        <CheckLista punkter={[
          'Krypterar data som standard',
          'Minimera åtkomst',
          'Automatisk radering',
          'Konsekvensbedömning (DPIA)',
        ]} />
      </div>
      <div className="rounded-2xl p-4 border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-blue-600" />
          <p className="font-bold text-sm text-blue-700">Privacy by Default</p>
        </div>
        <p className="text-xs text-gray-600 mb-3">Standardinställning = minst integritetskränkande.</p>
        <CheckLista punkter={[
          'Bara nödvändiga uppgifter',
          'Dela inte utan skäl',
          'Begränsa lagringstiden',
          'Need-to-know-åtkomst',
        ]} />
      </div>
    </div>
    <StegLista steg={[
      { nr: '01', titel: 'Behövs personuppgifter?', desc: 'Fråga innan ni startar ett nytt system eller projekt.' },
      { nr: '02', titel: 'EU-datalagring', desc: 'Välj leverantör med tydligt biträdesavtal och europeisk lagring.' },
      { nr: '03', titel: 'Automatisk radering', desc: 'Konfigurera borttagning av data efter fastställd tid.' },
      { nr: '04', titel: 'Begränsad åtkomst', desc: 'Ge bara ordförande och sekreterare admin-åtkomst.' },
    ]} />
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 9 – QUIZ 3
// ═══════════════════════════════════════════════════════════
const Quiz3Slide = ({ onComplete, isDone }: { onComplete: (id: string) => void; isDone: boolean }) => (
  <SlideShell dark>
    <Badge text="Kunskapstest · Block 3" dark />
    <H icon={HelpCircle} title="Privacy by Design" dark />
    <p className="text-white/60 text-sm mb-6">Tre frågor om inbyggt dataskydd.</p>
    <InlineQuiz dark onComplete={() => onComplete('quiz-3')} questions={[
      {
        id: 'q1', question_text: 'Vad innebär Privacy by Design?',
        question_type: 'single_choice', question_order: 1,
        options: { choices: [
          'Att designa hemsidan med GDPR-ikoner',
          'Att bygga in dataskydd från start i system och processer',
          'Att anlita en designer för dataskyddspolicyn',
          'Att använda krypterade e-postmeddelanden',
        ]},
        correct_answer: 'Att bygga in dataskydd från start i system och processer',
        explanation: 'Privacy by Design innebär att tänka på dataskydd INNAN ni startar ett projekt — inte lägga till det i efterhand.',
        points: 100,
      },
      {
        id: 'q2', question_text: 'Vad ska standardinställningen alltid vara enligt Privacy by Default?',
        question_type: 'single_choice', question_order: 2,
        options: { choices: [
          'Det mest funktionsrika alternativet',
          'Det minst integritetskränkande alternativet',
          'Det billigaste alternativet',
          'Det alternativ som ger mest data',
        ]},
        correct_answer: 'Det minst integritetskränkande alternativet',
        explanation: 'Privacy by Default innebär att standardinställningen alltid ska vara det minst integritetskränkande alternativet.',
        points: 100,
      },
      {
        id: 'q3', question_text: 'Vad är en DPIA?',
        question_type: 'single_choice', question_order: 3,
        options: { choices: [
          'En typ av biträdesavtal',
          'En konsekvensbedömning för dataskydd vid hög risk',
          'En EU-certifiering för dataskydd',
          'En rapport till IMY',
        ]},
        correct_answer: 'En konsekvensbedömning för dataskydd vid hög risk',
        explanation: 'DPIA (Data Protection Impact Assessment) är en konsekvensbedömning som görs när behandlingen innebär hög risk för de registrerades rättigheter.',
        points: 100,
      },
    ]} />
  </SlideShell>
);

// ═══════════════════════════════════════════════════════════
// SLIDE 10 – SLUTPROV
// ═══════════════════════════════════════════════════════════
const SlutprovSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <div className="h-full flex items-center relative overflow-hidden"
      style={{ paddingTop: 'var(--header-height, 60px)' }}>
      <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
        alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1623]/92" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full relative z-10 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">SLUTPROV</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Testa dina GDPR-kunskaper</h2>
            <p className="text-white/50 text-sm">50 frågor · 80% rätt krävs för godkänt</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setQuizOpen(true)}
            className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
            <HelpCircle className="w-6 h-6" /> Starta provet
          </motion.button>
          <AnimatePresence>
            {isDone && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border-2 border-green-400 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Grattis!</h3>
                <p className="text-white/60 text-sm">Du har klarat GDPR-modulen. Ditt diplom finns i <strong className="text-white">Mina sidor</strong>.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <GdprQuizOverlay isOpen={quizOpen} onClose={() => setQuizOpen(false)}
        questions={gdprQuiz.questions}
        onComplete={(passed) => { if (passed) onComplete('slutprov'); }} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════
const Module3Gdpr: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Anna Svensson', avatar: '' });
  const [quizOpen, setQuizOpen]                 = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    // ── Block 1: Grunderna ─────────────────────────────
    { id: 'intro',           title: 'Introduktion',         component: <IntroSlide onStart={() => setCurrentIndex(1)} onQuizOpen={() => setQuizOpen(true)} /> },
    { id: 'mjuk-intro',      title: 'GDPR & förtroende',    component: <GdprMjukIntroSlide /> },
    { id: 'vad-ar-gdpr',     title: 'Sju principer',        component: <VadArGdprSlide /> },
    { id: 'personuppgifter', title: 'Personuppgifter',      component: <Slide5Personuppgifter /> },
    { id: 'vilka-uppgifter', title: 'Vad är en personuppgift?', component: <VilkaUppgifterSlide /> },
    { id: 'quiz-1',          title: '🧠 Kunskapstest 1',    component: <Quiz1Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-1')} /> },

    // ── Block 2: Rättsliga grunder & kamera ───────────
    { id: 'gdpr-i-foreningen', title: 'GDPR i föreningen',  component: <GdprRolesSection /> },
    { id: 'rattsliga-grunder', title: 'Rättsliga grunder',  component: <RattsligaGrunderSlide /> },
    { id: 'kameraovervakning', title: 'Kameraövervakning',  component: <KameraovervakningSlide /> },
    { id: 'quiz-2',            title: '🧠 Kunskapstest 2',  component: <Quiz2Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-2')} /> },

    // ── Block 3: Privacy by Design ────────────────────
    { id: 'privacy-by-design', title: 'Privacy by Design',  component: <PrivacyByDesignSlide /> },
    { id: 'quiz-3',            title: '🧠 Kunskapstest 3',  component: <Quiz3Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-3')} /> },

    // ── Slutprov ──────────────────────────────────────
    { id: 'slutprov', title: '🎯 Slutprov', component: <SlutprovSlide isDone={completedLessons.has('slutprov')} onComplete={handleComplete} /> },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0f1623' }}>
      <div className="flex-shrink-0">
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
        snabbfragor={[
          'Behöver vi samtycke för att spara kontaktuppgifter?',
          'Hur länge får vi spara protokoll?',
          'Vad är skillnaden på personuppgiftsansvarig och biträde?',
          'Måste vi anmäla dataintrång till IMY?',
        ]}
      />
      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={gdprQuiz.questions}
      />
    </div>
  );
};

export default Module3Gdpr;
