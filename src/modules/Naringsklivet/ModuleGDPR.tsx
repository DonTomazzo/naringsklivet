// src/modules/Naringsklivet/ModuleGDPR.tsx
// Nanokurs: GDPR för alla medarbetare
// Målgrupp: Alla anställda i en organisation
// Längd: 25–30 min | 10 slides + micro-quiz + slutquiz
// Ton: Enkel men seriös

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import ScenarioQuiz      from '../../components/CourseElements/ScenarioQuiz';

import {
  SlideA, SlideB, SlideC, SlideE, SlideF, SlideH, SlideI,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol,
  Badge, Heading, Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

// ── Kursdata ─────────────────────────────────────────────
export const courseData = {
  learningPoints: [
    'Förstå vad GDPR är och varför det gäller dig',
    'Veta vilka uppgifter som räknas som personuppgifter',
    'Känna igen de vanligaste rättsliga grunderna',
    'Veta vad de registrerades rättigheter innebär i praktiken',
    'Hantera personuppgifter rätt i ditt dagliga arbete',
    'Veta hur du rapporterar en personuppgiftsincident',
    'Förstå vad som händer vid en GDPR-överträdelse',
    'Känna igen när du behöver kontakta dataskyddsombudet',
  ],
  forWho: [
    'Alla medarbetare i en organisation',
    'Nyanställda som behöver grundläggande GDPR-kunskap',
    'Chefer som vill säkerställa att teamet följer reglerna',
    'Alla som hanterar kunddata, personaldata eller patientdata',
  ],
  modules: [
    { title: 'Vad är GDPR?',                    duration: '3 min',  free: true },
    { title: 'Vad är en personuppgift?',         duration: '3 min',  free: true },
    { title: 'De rättsliga grunderna',           duration: '4 min',  free: true },
    { title: 'De registrerades rättigheter',     duration: '4 min',  free: true },
    { title: 'Ditt ansvar i vardagen',           duration: '4 min',  free: true },
    { title: 'Personuppgiftsincidenter',         duration: '3 min',  free: true },
    { title: 'Konsekvenser och sanktioner',      duration: '3 min',  free: true },
    { title: 'Dataskyddsombudet — din resurs',  duration: '2 min',  free: true },
    { title: 'Slutquiz',                          duration: '5 min',  free: true },
  ],
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'Kursledare — Näringsklivet',
    img:   '/founder.png',
    bio:   'Tomas Mauritzson har lång erfarenhet av att förklara komplexa regelverk på ett sätt som faktiskt fastnar. Näringsklivets kurser är kända för att vara praktiska, tydliga och direkt applicerbara i vardagen.',
  },
  faq: [
    { question: 'Gäller GDPR verkligen mig som anställd?', answer: 'Ja. Alla som hanterar personuppgifter i sitt arbete — oavsett roll — berörs av GDPR. Det handlar inte bara om IT eller HR.' },
    { question: 'Vad händer om jag gör fel?', answer: 'Organisationen kan drabbas av böter på upp till 4% av den globala omsättningen eller 20 miljoner euro. Allvarliga överträdelser kan även leda till disciplinära åtgärder för den anställde.' },
    { question: 'Vad är skillnaden mellan GDPR och PuL?', answer: 'PuL (Personuppgiftslagen) ersattes av GDPR 2018. GDPR är en EU-förordning som gäller direkt i alla medlemsländer och innebär hårdare krav och högre sanktioner.' },
    { question: 'Behöver jag kontakta dataskyddsombudet ofta?', answer: 'Inte nödvändigtvis — men vid osäkerhet är det alltid bättre att fråga. Dataskyddsombudet finns till för att hjälpa, inte granska.' },
  ],
};

// ── Bilder ────────────────────────────────────────────────
const IMGS = {
  intro:      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&q=80',
  vad:        'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1280&q=80',
  grund:      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
  rattigheter:'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
  vardag:     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
  incident:   'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1280&q=80',
  sanktion:   'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
  dso:        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1280&q=80',
  avslut:     'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
};

// ── Quiz-frågor ───────────────────────────────────────────
const quiz1 = [{
  id: 'g1', question_text: 'Vilket av dessa är INTE en personuppgift?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: ['Ett namn och en e-postadress', 'En IP-adress', 'En allmän postadress till ett företag', 'Ett personnummer'] },
  correct_answer: 'En allmän postadress till ett företag',
  explanation: 'En allmän företagsadress är inte en personuppgift — den identifierar inte en fysisk person. Namn, e-post, IP-adresser och personnummer är däremot personuppgifter.',
  points: 100,
}];

const quiz2 = [{
  id: 'g2', question_text: 'Vad innebär "samtycke" som rättslig grund?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: ['Att personen inte har sagt nej', 'Att personen frivilligt och tydligt gett sitt godkännande', 'Att företaget har ett avtal med personen', 'Att behandlingen är lagstadgad'] },
  correct_answer: 'Att personen frivilligt och tydligt gett sitt godkännande',
  explanation: 'Samtycke måste vara frivilligt, specifikt, informerat och otvetydigt. "Tyst" samtycke eller förifyllda kryssrutor räknas inte.',
  points: 100,
}];

const quiz3 = [{
  id: 'g3', question_text: 'En kund ber om att få ut all data ni har om hen. Vad gäller?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: ['Ni behöver inte svara om det är besvärligt', 'Ni ska besvara begäran inom en månad', 'Ni kan ta betalt för att ta fram uppgifterna', 'Ni kan vänta tills nästa kvartal'] },
  correct_answer: 'Ni ska besvara begäran inom en månad',
  explanation: 'Rätten till tillgång innebär att den registrerade ska få svar inom en månad. I komplexa fall kan fristen förlängas med ytterligare två månader — men personen måste informeras.',
  points: 100,
}];

const quiz4 = [{
  id: 'g4', question_text: 'Du märker att en kollega av misstag skickat ett kundregister till fel person. Vad gör du?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: ['Hoppas att ingen märker det', 'Rapporterar det till din chef eller dataskyddsombudet direkt', 'Väntar och ser om det får konsekvenser', 'Skickar ett rättande mejl till kunden'] },
  correct_answer: 'Rapporterar det till din chef eller dataskyddsombudet direkt',
  explanation: 'En personuppgiftsincident ska rapporteras internt omedelbart. Om incidenten är allvarlig måste IMY underrättas inom 72 timmar.',
  points: 100,
}];

const slutquiz = [
  { id: 'sq1', question_text: 'Vad står GDPR för?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['General Data Protection Regulation', 'Global Data Privacy Rules', 'General Digital Privacy Regulation', 'Government Data Protection Rules'] }, correct_answer: 'General Data Protection Regulation', explanation: 'GDPR — General Data Protection Regulation — är EU:s dataskyddsförordning som gäller sedan maj 2018.', points: 100 },
  { id: 'sq2', question_text: 'Vilket av dessa är en känslig personuppgift?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Namn och adress', 'Hälsoinformation', 'E-postadress', 'Anställningsdatum'] }, correct_answer: 'Hälsoinformation', explanation: 'Hälsouppgifter är en särskild kategori av känsliga personuppgifter som kräver extra skydd och en specifik rättslig grund.', points: 100 },
  { id: 'sq3', question_text: 'Hur många rättsliga grunder finns det i GDPR?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['3', '4', '6', '8'] }, correct_answer: '6', explanation: 'Det finns sex rättsliga grunder: samtycke, avtal, rättslig förpliktelse, skydd av vitala intressen, uppgift av allmänt intresse och berättigat intresse.', points: 100 },
  { id: 'sq4', question_text: 'Inom hur många timmar ska IMY underrättas om en allvarlig personuppgiftsincident?', question_type: 'single_choice' as const, question_order: 4, options: { choices: ['24 timmar', '48 timmar', '72 timmar', '1 vecka'] }, correct_answer: '72 timmar', explanation: 'Organisationen måste anmäla allvarliga personuppgiftsincidenter till Integritetsskyddsmyndigheten (IMY) inom 72 timmar från det att de blivit medvetna om incidenten.', points: 100 },
  { id: 'sq5', question_text: 'Vad innebär "rätten att bli bortglömd"?', question_type: 'single_choice' as const, question_order: 5, options: { choices: ['Att personen kan begära att ni raderar deras uppgifter', 'Att ni måste radera all data efter 1 år', 'Att den registrerade kan kräva anonymisering', 'Att ni inte får kontakta personen igen'] }, correct_answer: 'Att personen kan begära att ni raderar deras uppgifter', explanation: 'Rätten till radering (rätten att bli bortglömd) innebär att den registrerade under vissa omständigheter kan begära att deras personuppgifter raderas.', points: 100 },
  { id: 'sq6', question_text: 'Vad är en personuppgiftsincident?', question_type: 'single_choice' as const, question_order: 6, options: { choices: ['En GDPR-böter', 'En säkerhetsincident som leder till att personuppgifter röjs, förstörs eller förloras', 'En begäran om tillgång till data', 'En uppdatering av integritetspolicyn'] }, correct_answer: 'En säkerhetsincident som leder till att personuppgifter röjs, förstörs eller förloras', explanation: 'En personuppgiftsincident är en säkerhetshändelse som leder till oavsiktlig eller otillåten åtkomst, röjande, ändring, förlust eller förstöring av personuppgifter.', points: 100 },
];

// ── QuizBlock ─────────────────────────────────────────────
const QuizBlock = ({ questions, onComplete, isDone }: { questions: any[]; onComplete: () => void; isDone: boolean }) => (
  <div className="mt-6">
    <div className="rounded-2xl border-l-4 px-5 py-3 mb-4" style={{ borderColor: O, background: '#FFF5F2' }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: O }}>💡 Kontrollera din förståelse</p>
    </div>
    <AnimatePresence>
      {isDone && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-3 border mb-4 flex items-center gap-2"
          style={{ background: `${O}10`, borderColor: `${O}25` }}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
          <p className="text-sm font-semibold text-gray-800">Rätt! Gå vidare.</p>
        </motion.div>
      )}
    </AnimatePresence>
    <div className="max-w-xl">
      <InlineQuiz questions={questions} onComplete={onComplete} />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleGDPR: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Medarbetare', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const allDone = ['q1','q2','q3','q4','slutquiz'].every(id => completedLessons.has(id));

  const slides = [

    // ── 0: Intro ─────────────────────────────────────────
    {
      id: 'intro',
      title: 'Välkommen',
      audioSrc: '/audio/gdpr-intro.mp3',
      component: (
        <div className="h-full flex overflow-hidden bg-white">
          <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto">
            <div className="w-full px-8 sm:px-12 py-10">
              <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
                <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white" style={{ background: O }}>
                GDPR · Alla medarbetare · 25–30 min
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
                GDPR för <span style={{ color: O }}>alla medarbetare</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                GDPR gäller alla — inte bara jurister och IT. Den här kursen ger dig det du faktiskt behöver veta för att hantera personuppgifter rätt i ditt dagliga arbete.
              </p>
              <div className="space-y-2 mb-8">
                {['Vad GDPR är och varför det spelar roll', 'Vad du får och inte får göra med personuppgifter', 'Hur du hanterar en incident korrekt', 'Dina rättigheter och skyldigheter som anställd'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${O}20` }}>
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
                    </div>
                    <p className="text-gray-700 text-sm">{p}</p>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentIndex(1)}
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
                Starta kursen →
              </motion.button>
            </div>
          </div>
        </div>
      ),
    },

    // ── 1: Vad är GDPR? ──────────────────────────────────
    {
      id: 'vad-ar-gdpr',
      title: '📋 Vad är GDPR?',
      audioSrc: '/audio/gdpr-vad.mp3',
      component: (
        <SlideH
          bild={IMGS.vad}
          bildBg="#1e2d4a"
          badge="Avsnitt 1 · Grunderna"
          title="Vad är <span style='color:#FF5421'>GDPR</span>?"
          ingress="GDPR — General Data Protection Regulation — är EU:s dataskyddsförordning som gäller sedan maj 2018. Den ger individer kontroll över sina personuppgifter och ställer krav på alla organisationer som hanterar dem."
          punkter={[
            '<strong>Gäller hela EU</strong> — och alla organisationer som hanterar uppgifter om EU-medborgare, oavsett var organisationen finns.',
            '<strong>Ersatte PuL</strong> — Personuppgiftslagen ersattes av GDPR 2018. Kraven är nu hårdare och mer enhetliga.',
            '<strong>Gäller dig</strong> — oavsett din roll. Hanterar du uppgifter om kunder, kollegor eller andra — berörs du.',
            '<strong>Tillsynsmyndighet</strong> — I Sverige är det IMY (Integritetsskyddsmyndigheten) som kontrollerar att GDPR följs.',
          ]}
        >
          <InfoBox title="Kom ihåg">
            GDPR handlar inte om att krångla till vardagen — det handlar om att behandla människors information med respekt.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 2: Vad är en personuppgift? ───────────────────────
    {
      id: 'personuppgift',
      title: '🔍 Vad är en personuppgift?',
      audioSrc: '/audio/gdpr-personuppgift.mp3',
      component: (
        <SlideA
          bild={IMGS.vad}
          badge="Avsnitt 2 · Personuppgifter"
          title="Vad är en <span style='color:#FF5421'>personuppgift</span>?"
        >
          <Ingress>
            En personuppgift är all information som direkt eller indirekt kan identifiera en levande fysisk person. Det är bredare än de flesta tror.
          </Ingress>
          <TwoCol
            left={
              <FrameBox title="Vanliga personuppgifter">
                <Bullet>Namn och adress</Bullet>
                <Bullet>E-postadress och telefonnummer</Bullet>
                <Bullet>Personnummer</Bullet>
                <Bullet>IP-adress och cookies</Bullet>
                <Bullet>Foto och videoupptagning</Bullet>
              </FrameBox>
            }
            right={
              <FrameBox title="Känsliga personuppgifter">
                <Bullet>Hälsa och sjukdom</Bullet>
                <Bullet>Etniskt ursprung</Bullet>
                <Bullet>Politiska åsikter</Bullet>
                <Bullet>Religiös övertygelse</Bullet>
                <Bullet>Sexuell läggning</Bullet>
              </FrameBox>
            }
          />
          <InfoBox title="Känsliga uppgifter kräver extra skydd">
            Känsliga personuppgifter får bara behandlas om det finns en uttrycklig rättslig grund. Var extra försiktig med dessa.
          </InfoBox>
          <QuizBlock questions={quiz1} onComplete={() => handleComplete('q1')} isDone={completedLessons.has('q1')} />
        </SlideA>
      ),
    },

    // ── 3: Rättsliga grunder ──────────────────────────────
    {
      id: 'rattsliga-grunder',
      title: '⚖️ Rättsliga grunder',
      audioSrc: '/audio/gdpr-grunder.mp3',
      component: (
        <SlideB
          bild={IMGS.grund}
          badge="Avsnitt 3 · Rättsliga grunder"
          title="Du måste alltid ha en <span style='color:#FF5421'>rättslig grund</span>"
        >
          <Ingress>
            Varje gång ni behandlar personuppgifter måste det finnas en rättslig grund. Det finns sex stycken — här är de viktigaste för dig i vardagen.
          </Ingress>
          <StegRad nr="1" titel="Samtycke" desc="Personen har frivilligt och tydligt godkänt. Observera: förifyllda kryssrutor räknas inte." />
          <StegRad nr="2" titel="Avtal" desc="Behandlingen är nödvändig för att fullgöra ett avtal med personen — t.ex. leverera en beställning." />
          <StegRad nr="3" titel="Rättslig förpliktelse" desc="Lagen kräver det — t.ex. bokföring, arbetsrätt eller skattelagstiftning." />
          <StegRad nr="4" titel="Berättigat intresse" desc="Organisationens intresse väger tyngre än individens integritet — men kräver alltid en avvägning." />
          <InfoBox title="Osäker på vilken grund som gäller?">
            Kontakta dataskyddsombudet. Det är bättre att fråga en gång för mycket än att behandla uppgifter utan grund.
          </InfoBox>
          <QuizBlock questions={quiz2} onComplete={() => handleComplete('q2')} isDone={completedLessons.has('q2')} />
        </SlideB>
      ),
    },

    // ── 4: De registrerades rättigheter ───────────────────
    {
      id: 'rattigheter',
      title: '🧑‍⚖️ De registrerades rättigheter',
      audioSrc: '/audio/gdpr-rattigheter.mp3',
      component: (
        <SlideE
          bild={IMGS.rattigheter}
          badge="Avsnitt 4 · Rättigheter"
          title="Individens rättigheter enligt GDPR"
          punkter={[
            '<strong>Rätt till tillgång</strong> — Personen kan begära ut all data ni har om hen. Svar inom 1 månad.',
            '<strong>Rätt till rättelse</strong> — Felaktiga uppgifter ska korrigeras utan dröjsmål.',
            '<strong>Rätt till radering</strong> — "Rätten att bli bortglömd" — under vissa omständigheter kan personen begära radering.',
            '<strong>Rätt till begränsning</strong> — Personen kan begära att behandlingen begränsas medan en tvist utreds.',
            '<strong>Rätt till dataportabilitet</strong> — Personen kan begära att få ut sina uppgifter i ett maskinläsbart format.',
            '<strong>Rätt att invända</strong> — Personen kan invända mot behandling som baseras på berättigat intresse.',
          ]}
          fotnot="Alla rättigheter har undantag — men utgångspunkten är att ta dem på allvar och svara inom en månad."
          fotnotColor={O}
        >
          <QuizBlock questions={quiz3} onComplete={() => handleComplete('q3')} isDone={completedLessons.has('q3')} />
        </SlideE>
      ),
    },

    // ── 5: Ditt ansvar i vardagen ─────────────────────────
    {
      id: 'vardag',
      title: '💼 Ditt ansvar i vardagen',
      audioSrc: '/audio/gdpr-vardag.mp3',
      component: (
        <SlideA
          bild={IMGS.vardag}
          badge="Avsnitt 5 · Din vardag"
          title="Vad du ska tänka på <span style='color:#FF5421'>varje dag</span>"
        >
          <Ingress>
            GDPR är inte ett projekt — det är ett sätt att arbeta. Här är de viktigaste principerna att ta med sig in i vardagen.
          </Ingress>
          <TwoCol
            left={
              <FrameBox title="✅ Gör detta">
                <CheckItem>Samla bara in det du faktiskt behöver</CheckItem>
                <CheckItem>Förvara uppgifter säkert och med rätt behörigheter</CheckItem>
                <CheckItem>Radera data när den inte längre behövs</CheckItem>
                <CheckItem>Fråga vid minsta osäkerhet</CheckItem>
              </FrameBox>
            }
            right={
              <FrameBox title="❌ Undvik detta">
                <Bullet>Dela personuppgifter i öppna kanaler</Bullet>
                <Bullet>Spara känslig data i privata mejl</Bullet>
                <Bullet>Ge obehöriga tillgång till register</Bullet>
                <Bullet>Använda persondata för andra syften än ursprunget</Bullet>
              </FrameBox>
            }
          />
          <InfoBox title="Dataminimering — gyllene regeln">
            Samla aldrig in mer information än vad som krävs för ändamålet. Fråga dig alltid: behöver vi verkligen den här uppgiften?
          </InfoBox>
        </SlideA>
      ),
    },

    // ── 6: Personuppgiftsincidenter ───────────────────────
    {
      id: 'incident',
      title: '🚨 Personuppgiftsincidenter',
      audioSrc: '/audio/gdpr-incident.mp3',
      component: (
        <ScenarioQuiz
          bild={IMGS.incident}
          bubbla="Jag råkade skicka ett mejl med kundlistan till fel person... måste jag berätta det för någon?"
          bubblaSida="left"
          fråga="Vad ska du göra vid en personuppgiftsincident?"
          alternativ={[
            { text: 'Hoppas att ingen märker det och gå vidare', korrekt: false },
            { text: 'Rapportera till chef eller dataskyddsombud direkt', korrekt: true },
            { text: 'Vänta och se om det får konsekvenser', korrekt: false },
            { text: 'Skicka ett rättande mejl till kunden', korrekt: false },
          ]}
          förklaring="En personuppgiftsincident ska alltid rapporteras internt omedelbart. Om incidenten är allvarlig måste IMY underrättas inom 72 timmar — och i vissa fall även de drabbade personerna."
          onComplete={() => handleComplete('q4')}
          isDone={completedLessons.has('q4')}
        />
      ),
    },

    // ── 7: Konsekvenser ───────────────────────────────────
    {
      id: 'konsekvenser',
      title: '⚠️ Konsekvenser',
      audioSrc: '/audio/gdpr-konsekvenser.mp3',
      component: (
        <SlideH
          bild={IMGS.sanktion}
          bildBg="#1a1a2e"
          badge="Avsnitt 7 · Sanktioner"
          title="Vad händer vid en <span style='color:#FF5421'>överträdelse?</span>"
          ingress="GDPR har tänder. Sanktionerna är avsedda att göra det ekonomiskt olönsamt att bryta mot reglerna."
          punkter={[
            '<strong>Upp till 20 miljoner euro</strong> — eller 4% av den globala årsomsättningen, det som är högst.',
            '<strong>Administrativa sanktioner</strong> — IMY kan utfärda anmärkningar, förelägganden och begränsningar.',
            '<strong>Skadestånd</strong> — Den registrerade kan begära skadestånd för skada orsakad av GDPR-brott.',
            '<strong>Reputationsrisk</strong> — Offentliga böter och incidenter skadar varumärket och förtroendet.',
          ]}
        >
          <InfoBox title="Sverige 2024">
            Flera svenska organisationer har fått böter på miljontals kronor. Google, Meta och H&M är exempel på bolag som drabbats av stora GDPR-böter i Europa.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 8: Dataskyddsombudet ──────────────────────────────
    {
      id: 'dso',
      title: '🧑‍💼 Dataskyddsombudet',
      audioSrc: '/audio/gdpr-dso.mp3',
      component: (
        <SlideC
          bild={IMGS.dso}
          bildHöjd="35%"
          badge="Avsnitt 8 · Din resurs"
          title="Dataskyddsombudet — <span style='color:#FF5421'>din resurs</span>"
        >
          <Ingress>
            Dataskyddsombudet (DSO) är organisationens expert på GDPR. Ombudet är där för att hjälpa — inte granska eller anklaga.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { icon: '📞', text: 'Kontakta DSO när du är osäker på om en behandling är tillåten' },
              { icon: '📝', text: 'Kontakta DSO när du får en begäran om tillgång, rättelse eller radering' },
              { icon: '🚨', text: 'Kontakta DSO omedelbart vid misstänkt personuppgiftsincident' },
              { icon: '🤝', text: 'DSO har tystnadsplikt — du kan prata öppet utan att oroa dig' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Kom ihåg">
            Det finns inga dumma frågor när det gäller GDPR. En fråga i rätt tid är alltid bättre än ett misstag i efterhand.
          </InfoBox>
        </SlideC>
      ),
    },

    // ── 9: Slutquiz ───────────────────────────────────────
    {
      id: 'slutquiz',
      title: '🧠 Slutquiz',
      component: (
        <SlideF bild={IMGS.vardag} badge="Slutquiz · 6 frågor">
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Testa dina GDPR-kunskaper
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            6 frågor som täcker det viktigaste från kursen.
          </p>
          <AnimatePresence>
            {completedLessons.has('slutquiz') && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-3 border mb-5 flex items-center gap-2"
                style={{ background: `${O}10`, borderColor: `${O}25` }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
                <p className="text-sm font-semibold text-gray-800">Quiz avklarat! Gå vidare för kursbeviset.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="max-w-xl">
            <InlineQuiz questions={slutquiz} onComplete={() => handleComplete('slutquiz')} />
          </div>
        </SlideF>
      ),
    },

    // ── 10: Avslutning ────────────────────────────────────
    {
      id: 'avslut',
      title: '✅ Sammanfattning',
      audioSrc: '/audio/gdpr-avslut.mp3',
      component: (
        <SlideC
          bild={IMGS.avslut}
          bildHöjd="30%"
          badge="Sammanfattning · GDPR för alla"
          title="Det du tar med dig från <span style='color:#FF5421'>kursen</span>"
        >
          <Ingress>
            GDPR handlar i grunden om respekt för människors integritet. Här är de fem viktigaste sakerna att komma ihåg.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Samla bara in det du behöver — och ha alltid en rättslig grund' },
              { nr: '02', text: 'Känsliga personuppgifter kräver extra försiktighet och skydd' },
              { nr: '03', text: 'Individen har rättigheter — ta begäranden på allvar och svara i tid' },
              { nr: '04', text: 'Rapportera incidenter direkt — vänta aldrig' },
              { nr: '05', text: 'Dataskyddsombudet är din vän — fråga vid minsta osäkerhet' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 p-4 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-lg font-black flex-shrink-0" style={{ color: `${O}60` }}>{item.nr}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört GDPR-kursen.')}
              className="w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              <Award className="w-6 h-6" /> Hämta kursbevis
            </motion.button>
          )}
        </SlideC>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader isSidebarMinimized={false} isDesktop={isDesktop}
          userName={userData.name} userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }} />
      </div>
      <SlideSidebar slides={slides} currentIndex={currentIndex}
        completedLessons={completedLessons} onNavigate={setCurrentIndex}
        courseTitle="GDPR för alla medarbetare" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={courseData.faq} title="Frågor om GDPR"
        subtitle="Vanliga frågor om dataskydd och GDPR" buttonColor={O} />
    </div>
  );
};

export default ModuleGDPR;