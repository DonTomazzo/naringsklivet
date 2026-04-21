// src/modules/Naringsklivet/ModuleDatalackor.tsx
// Nanokurs: 5 misstag som leder till dataläckor (och hur ni stoppar dem)
// Målgrupp: Alla anställda (icke-tekniska + chefer)
// Längd: 20–30 min | 7 slides + quiz
// Mallar: SlideA, SlideB, SlideH, SlideI, SlideC, SlideE

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import ClickableCircles from '../../components/CourseElements/ClickableCircles';
import DataIncidentSlide from './slides/DataIncidentSlide';
import ScenarioQuiz from '../../components/CourseElements/ScenarioQuiz';

import {
  SlideA, SlideB, SlideC, SlideE, SlideH, SlideF, SlideI,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol,
  Badge, Heading, Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

const quizStyle = `
  .nk-quiz .option-btn {
    color: #1A1A1A !important;
    border-color: #E8E5E0 !important;
    background: #FAFAF8 !important;
  }
  .nk-quiz .option-btn:hover {
    border-color: #FF5421 !important;
    background: #FFF5F2 !important;
  }
  .nk-quiz .option-btn.selected {
    border-color: #FF5421 !important;
    background: #FFF5F2 !important;
    color: #FF5421 !important;
  }
  .nk-quiz .option-btn.correct {
    border-color: #FF5421 !important;
    background: #FFF5F2 !important;
    color: #FF5421 !important;
  }
  .nk-quiz .option-btn.incorrect {
    border-color: #D1D5DB !important;
    background: #F9FAFB !important;
    color: #6B7280 !important;
  }
`;

const SLIDE_MAP: Record<string, number> = {
  'fildelning': 3,
  'ai':         4,
  'losenord':   5,
  'phishing':   6,
  'atkomst':    7,
};

const goBack = () => setCurrentIndex(2);


// ─── Bilder ───────────────────────────────────────────────
const IMGS = {
  intro:    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
  fildelning: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=1280&q=80',
  ai:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&q=80',
  losenord: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&q=80',
  phishing: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1280&q=80',
  atkomst:  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1280&q=80',
  avslut:   'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
};

// ─── FAQ ─────────────────────────────────────────────────
const FAQ = [
  {
    question: 'Vad är den vanligaste orsaken till dataläckor?',
    answer: 'Mänskliga misstag — inte hackare. Feldelning av filer, svaga lösenord och att klicka på phishing-mejl är de vanligaste orsakerna.',
  },
  {
    question: 'Är det ok att använda ChatGPT i jobbet?',
    answer: 'Det beror på vad du klistrar in. Aldrig kunddata, personnummer, interna dokument eller affärshemligheter. Använd företagsgodkända AI-verktyg som Microsoft 365 Copilot när det gäller känslig information.',
  },
  {
    question: 'Vad är MFA och varför behöver jag det?',
    answer: 'MFA (multifaktorautentisering) kräver ett extra steg utöver lösenordet — exempelvis en kod via app. Det stoppar 99% av alla automatiska kontokapningsförsök.',
  },
  {
    question: 'Hur vet jag om ett mejl är phishing?',
    answer: 'Kontrollera avsändarens faktiska e-postadress (inte bara visningsnamnet), leta efter ovanliga länkar, och verifiera via en annan kanal om mejlet ber om känslig information.',
  },
];

const quizHuvud = [
  {
    id: 'qh-1',
    question_text: 'Vad innebär "Anyone with the link" i OneDrive/Google Drive?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Endast interna användare kan öppna länken',
      'Vem som helst med länken kan öppna filen',
      'Länken kräver inloggning med företagskonto',
      'Filen är krypterad och säker',
    ]},
    correct_answer: 'Vem som helst med länken kan öppna filen',
    explanation: '"Anyone with the link" betyder att filen är helt öppen — vem som helst som får länken, internt eller externt, kan öppna den.',
    points: 100,
  },
  {
    id: 'qh-2',
    question_text: 'Vilket är det säkraste sättet att dela en känslig fil?',
    question_type: 'single_choice' as const,
    question_order: 2,
    options: { choices: [
      'Skicka som e-postbilaga',
      'Dela med "Anyone with the link"',
      'Dela med specifika personer och sätt ett utgångsdatum',
      'Ladda upp på en offentlig webbplats',
    ]},
    correct_answer: 'Dela med specifika personer och sätt ett utgångsdatum',
    explanation: 'Specifik delning + utgångsdatum ger full kontroll över vem som kan se filen och hur länge.',
    points: 100,
  },
  {
    id: 'qh-3',
    question_text: 'Vad är "Think before you paste"-regeln?',
    question_type: 'single_choice' as const,
    question_order: 3,
    options: { choices: [
      'Kontrollera stavningen innan du skickar ett mejl',
      'Tänk på om informationen är ok att lämna organisationen innan du klistrar in i AI',
      'Spara alltid en kopia innan du klistrar in text',
      'Använd alltid Ctrl+V istället för högerklick',
    ]},
    correct_answer: 'Tänk på om informationen är ok att lämna organisationen innan du klistrar in i AI',
    explanation: 'Regeln påminner dig att stanna upp och fråga: är det ok att den här informationen hamnar utanför organisationen?',
    points: 100,
  },
  {
    id: 'qh-4',
    question_text: 'Vilket AI-verktyg är säkrast för känslig företagsinformation?',
    question_type: 'single_choice' as const,
    question_order: 4,
    options: { choices: [
      'ChatGPT gratisversion',
      'Microsoft 365 Copilot (tenant-baserad)',
      'Claude.ai konsumentversion',
      'Alla AI-verktyg är lika säkra',
    ]},
    correct_answer: 'Microsoft 365 Copilot (tenant-baserad)',
    explanation: 'Microsoft 365 Copilot körs inom er egen Microsoft-tenant — data lämnar inte organisationen. Öppna konsumentverktyg har inte samma garanti.',
    points: 100,
  },
  {
    id: 'qh-5',
    question_text: 'Vad händer om du använder samma lösenord på flera tjänster?',
    question_type: 'single_choice' as const,
    question_order: 5,
    options: { choices: [
      'Ingenting — det är praktiskt och säkert',
      'Ett enda läckt lösenord ger angripare tillgång till alla dina konton',
      'Det gör inloggning snabbare och mer säker',
      'Det påverkar bara privata konton, inte jobbkonton',
    ]},
    correct_answer: 'Ett enda läckt lösenord ger angripare tillgång till alla dina konton',
    explanation: 'Credential stuffing — att testa läckta lösenord på andra tjänster — är en av de vanligaste attackmetoderna. Unika lösenord är avgörande.',
    points: 100,
  },
  {
    id: 'qh-6',
    question_text: 'Vad gör MFA (multifaktorautentisering)?',
    question_type: 'single_choice' as const,
    question_order: 6,
    options: { choices: [
      'Krypterar alla dina filer automatiskt',
      'Kräver ett extra verifieringssteg utöver lösenordet',
      'Blockerar alla inloggningsförsök från utlandet',
      'Byter ditt lösenord automatiskt varje månad',
    ]},
    correct_answer: 'Kräver ett extra verifieringssteg utöver lösenordet',
    explanation: 'MFA innebär att du behöver bekräfta inloggningen via en app, SMS eller hårdvarunyckel — även om angriparen har ditt lösenord kan de inte logga in.',
    points: 100,
  },
  {
    id: 'qh-7',
    question_text: 'Hur känner du igen ett phishing-mejl?',
    question_type: 'single_choice' as const,
    question_order: 7,
    options: { choices: [
      'Det är alltid skrivet på dålig svenska',
      'Det innehåller alltid bilagor',
      'Avsändaradressen stämmer inte, det skapar stress och ber om känslig info',
      'Det skickas alltid sent på kvällen',
    ]},
    correct_answer: 'Avsändaradressen stämmer inte, det skapar stress och ber om känslig info',
    explanation: 'Moderna AI-genererade phishing-mejl är välskrivna. Fokusera på avsändaradressen, konstlad brådska och ovanliga förfrågningar.',
    points: 100,
  },
  {
    id: 'qh-8',
    question_text: 'Du får ett brådskande mejl från "din chef" med en okänd avsändaradress. Vad gör du?',
    question_type: 'single_choice' as const,
    question_order: 8,
    options: { choices: [
      'Följer instruktionerna direkt eftersom det är bråttom',
      'Svarar på mejlet och frågar om mer info',
      'Kontaktar chefen via telefon eller personligen för att verifiera',
      'Vidarebefordrar till alla kollegor för att varna',
    ]},
    correct_answer: 'Kontaktar chefen via telefon eller personligen för att verifiera',
    explanation: 'Verifiera alltid via en annan kanal. Aldrig via samma mejlkedja — angriparen kontrollerar den konversationen.',
    points: 100,
  },
  {
    id: 'qh-9',
    question_text: 'Vad innebär "least privilege"-principen?',
    question_type: 'single_choice' as const,
    question_order: 9,
    options: { choices: [
      'Alla anställda ska ha tillgång till alla system',
      'Chefer ska ha mer åtkomst än andra',
      'Anställda ska bara ha den åtkomst de faktiskt behöver',
      'Systemet ska ha minimal processor-kapacitet',
    ]},
    correct_answer: 'Anställda ska bara ha den åtkomst de faktiskt behöver',
    explanation: 'Least privilege begränsar skadan vid en incident. Om ett konto kapas eller en anställd gör ett misstag är påverkan minimal.',
    points: 100,
  },
  {
    id: 'qh-10',
    question_text: 'En anställd slutar sin tjänst. Vad ska göras med deras systemåtkomst?',
    question_type: 'single_choice' as const,
    question_order: 10,
    options: { choices: [
      'Ingenting — de loggar aldrig in efter de slutat',
      'Minska till läsrättigheter',
      'Ta bort åtkomsten samma dag de slutar',
      'Vänta 6 månader och se om de hör av sig',
    ]},
    correct_answer: 'Ta bort åtkomsten samma dag de slutar',
    explanation: 'Gamla konton är en av de vanligaste säkerhetsriskerna. Åtkomst ska tas bort omedelbart — inte efter några månader.',
    points: 100,
  },
  {
    id: 'qh-11',
    question_text: 'Vilken typ av information FÅR du dela med ett öppet AI-verktyg?',
    question_type: 'single_choice' as const,
    question_order: 11,
    options: { choices: [
      'Kundens personnummer och adress',
      'Interna löner och anställningsvillkor',
      'Offentlig information som redan finns tillgänglig',
      'Konfidentiella affärsstrategier',
    ]},
    correct_answer: 'Offentlig information som redan finns tillgänglig',
    explanation: 'Offentlig information är ok att använda i öppna AI-verktyg. Allt som är konfidentiellt, personuppgiftsrelaterat eller affärskänsligt hör inte dit.',
    points: 100,
  },
  {
    id: 'qh-12',
    question_text: 'Vad är den viktigaste orsaken till att dataläckor sker?',
    question_type: 'single_choice' as const,
    question_order: 12,
    options: { choices: [
      'Avancerade hackerattacker utifrån',
      'Tekniska systemfel i molntjänster',
      'Mänskliga misstag och bristande rutiner',
      'Virus och skadlig kod',
    ]},
    correct_answer: 'Mänskliga misstag och bristande rutiner',
    explanation: 'Enligt IBM Cost of a Data Breach är mänskliga misstag den dominerande orsaken till dataläckor — inte sofistikerade hackerattacker.',
    points: 100,
  },
];

// ─── QUIZFRÅGOR ───────────────────────────────────────────
const quiz1 = [
  {
    id: 'q1-1',
    question_text: 'En kollega ber om en länk till er budgetfil. Vad är rätt att göra?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Skicka länken med "Anyone with the link" — det är snabbast',
      'Dela med specifik person och sätt eventuellt ett utgångsdatum',
      'Skicka hela filen som e-postbilaga istället',
      'Det spelar ingen roll hur man delar internt',
    ]},
    correct_answer: 'Dela med specifik person och sätt eventuellt ett utgångsdatum',
    explanation: 'Öppna länkar kan spridas okontrollerat. Dela alltid med specifika personer och begränsa åtkomsttiden för känsliga dokument.',
    points: 100,
  },
];

const quiz2 = [
  {
    id: 'q2-1',
    question_text: 'Vilket av följande FÅR du klistra in i ett öppet AI-verktyg som ChatGPT?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'En kunds personnummer för att skriva ett brev',
      'Internt avtal med affärsvillkor',
      'En offentlig nyhetsartikel du vill sammanfatta',
      'Löner och anställningsvillkor',
    ]},
    correct_answer: 'En offentlig nyhetsartikel du vill sammanfatta',
    explanation: 'Offentlig information är ok. Känslig intern data, kunduppgifter och personuppgifter ska aldrig klistras in i öppna AI-verktyg.',
    points: 100,
  },
];

const quiz3 = [
  {
    id: 'q3-1',
    question_text: 'Vilket lösenord är starkast?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Sommar2024!',
      'qwerty123',
      'Tr0ub4dor&3',
      'GulBil-Kaffe-Paraply-47',
    ]},
    correct_answer: 'GulBil-Kaffe-Paraply-47',
    explanation: 'Långa lösenfraser med slumpmässiga ord är svårare att knäcka än korta lösenord med siffror och specialtecken. Längd slår komplexitet.',
    points: 100,
  },
  {
    id: 'q3-2',
    question_text: 'Vad skyddar MFA mot?',
    question_type: 'single_choice' as const,
    question_order: 2,
    options: { choices: [
      'Virus och skadlig kod',
      'Att någon loggar in med ditt lösenord utan din godkännande',
      'Phishing-mejl',
      'Datorkrascher',
    ]},
    correct_answer: 'Att någon loggar in med ditt lösenord utan din godkännande',
    explanation: 'Även om ditt lösenord läckt ut stoppar MFA angriparen — de behöver fortfarande din telefon eller app för att slutföra inloggningen.',
    points: 100,
  },
];

const quiz4 = [
  {
    id: 'q4-1',
    question_text: 'Du får ett mejl från "ceo@foret4get.com" som ber dig swisha 15 000 kr. Vad gör du?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Betalar direkt — det är bråttom enligt mejlet',
      'Vidarebefordrar till ekonomiavdelningen utan att fråga',
      'Kontaktar VD via telefon eller personligen för att verifiera',
      'Svarar på mejlet och frågar om mer information',
    ]},
    correct_answer: 'Kontaktar VD via telefon eller personligen för att verifiera',
    explanation: 'VD-bluff är en av de vanligaste phishing-attackerna. Verifiera alltid via en annan kanal — aldrig via samma mejlkedja.',
    points: 100,
  },
];

const quiz5 = [
  {
    id: 'q5-1',
    question_text: 'En tidigare kollega som slutade för 3 månader sedan har fortfarande tillgång till er SharePoint. Vad bör ni göra?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Ingenting — de kommer aldrig logga in ändå',
      'Ta bort åtkomsten omedelbart',
      'Vänta till nästa access-review om ett år',
      'Minska deras behörighet till läsrättigheter',
    ]},
    correct_answer: 'Ta bort åtkomsten omedelbart',
    explanation: 'Gamla konton med onödig åtkomst är en av de vanligaste säkerhetsriskerna. Åtkomst ska tas bort direkt när en anställd slutar.',
    points: 100,
  },
];

const quizSlut = [
  {
    id: 'qs-1',
    question_text: 'Vilket misstag orsakar flest dataläckor globalt?',
    question_type: 'single_choice' as const,
    question_order: 1,
    options: { choices: [
      'Avancerade hackerattacker',
      'Mänskliga misstag och felaktigt beteende',
      'Tekniska systemfel',
      'Naturkatastrofer',
    ]},
    correct_answer: 'Mänskliga misstag och felaktigt beteende',
    explanation: 'Enligt IBM:s Cost of a Data Breach-rapport beror majoriteten av dataläckor på mänskliga misstag — inte hackare.',
    points: 100,
  },
  {
    id: 'qs-2',
    question_text: '"Least privilege"-principen innebär att...',
    question_type: 'single_choice' as const,
    question_order: 2,
    options: { choices: [
      'Alla ska ha tillgång till allt för att jobba effektivt',
      'Chefer ska ha mer åtkomst än andra',
      'Anställda bara ska ha den åtkomst de faktiskt behöver för sitt arbete',
      'Systemen ska ha minimal prestanda',
    ]},
    correct_answer: 'Anställda bara ska ha den åtkomst de faktiskt behöver för sitt arbete',
    explanation: 'Minsta möjliga behörighet begränsar skadan vid en incident — om ett konto kapas eller en anställd gör ett misstag är skaderadien liten.',
    points: 100,
  },
];

// ─── QuizBlock ────────────────────────────────────────────
const QuizBlock = ({ questions, onComplete, isDone }: {
  questions: any[];
  onComplete: () => void;
  isDone: boolean;
}) => (
  <div className="mt-6">
    <div className="rounded-2xl border-l-4 px-5 py-4 mb-4"
      style={{ borderColor: O, background: '#FFF5F2' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: O }}>
        💡 Micro-övning
      </p>
      <p className="text-gray-600 text-sm">Testa din förståelse innan du går vidare.</p>
    </div>
    <AnimatePresence>
      {isDone && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-3 border mb-4 flex items-center gap-2"
          style={{ background: `${O}10`, borderColor: `${O}25` }}>
          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
          <p className="text-sm font-semibold text-gray-800">Rätt! Gå vidare till nästa avsnitt.</p>
        </motion.div>
      )}
    </AnimatePresence>
    <InlineQuiz questions={questions} onComplete={onComplete} />
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE 0 — INTRO (SlideH)
// ══════════════════════════════════════════════════════════
const SlideIntro = ({ onStart }: { onStart: () => void }) => (
  <div className="h-full flex overflow-hidden bg-white">
    <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
      <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
    </div>
    <div className="flex-1 flex items-center overflow-y-auto">
      <div className="w-full px-8 sm:px-12 py-10">
        <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 220 }}>
          <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white" style={{ background: O }}>
          Informationssäkerhet · Alla anställda
        </div>
        <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
          5 misstag som leder till <span style={{ color: O }}>dataläckor</span>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          De flesta dataläckor beror inte på hackare — utan på vanliga misstag som görs varje dag på kontoret.
        </p>
        <div className="space-y-2 mb-8">
          {['Lär dig känna igen de 5 vanligaste misstagen','Praktiska övningar efter varje avsnitt','Du kan direkt minska risker i ditt dagliga arbete','Ca 20–30 minuter — gör det i din egen takt'].map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${O}20` }}>
                <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
              </div>
              <p className="text-gray-700 text-sm">{p}</p>
            </div>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onStart}
          className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
          Starta kursen →
        </motion.button>
      </div>
    </div>
  </div>
);



// ══════════════════════════════════════════════════════════
// SLIDE 1 — MISSTAG 1: Fildelning (SlideA)
// ══════════════════════════════════════════════════════════
const SlideMisstag1 = ({ onComplete, isDone, onBack }: { onComplete: () => void; isDone: boolean }) => (
  <SlideA
    bild={IMGS.fildelning}
    badge="Misstag 01 · Fildelning"
    title="❌ Delar filer med <span style='color:#FF5421'>fel inställningar</span>"
  >
    <Ingress>
      "Anyone with the link" — tre ord som orsakar otaliga oavsiktliga dataläckor varje dag.
      Det är den vanligaste typen av informationsincident i moderna organisationer.
    </Ingress>

    <TwoCol
      left={
        <FrameBox title="Problemet">
          <Bullet>Öppna delningslänkar sprids okontrollerat</Bullet>
          <Bullet>Fel personer får tillgång till känslig info</Bullet>
          <Bullet>Vanligt i OneDrive och Google Drive</Bullet>
          <Bullet>Svårt att spåra vem som sett vad</Bullet>
        </FrameBox>
      }
      right={
        <FrameBox title="Lösningen">
          <CheckItem>Dela med specifika personer</CheckItem>
          <CheckItem>Sätt utgångsdatum på känsliga länkar</CheckItem>
          <CheckItem>Kontrollera rättigheter innan du skickar</CheckItem>
          <CheckItem>Granska delade mappar regelbundet</CheckItem>
        </FrameBox>
      }
    />

    <InfoBox title="Kom ihåg">
      Innan du delar — fråga dig: <em>Vem ska egentligen ha tillgång till det här?</em>
      Begränsa alltid till de som faktiskt behöver det.
    </InfoBox>

    <QuizBlock questions={quiz1} onComplete={onComplete} isDone={isDone} />
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// SLIDE 2 — MISSTAG 2: AI-verktyg (SlideB)
// ══════════════════════════════════════════════════════════
const SlideMisstag2 = ({ onComplete, isDone, onBack }: { onComplete: () => void; isDone: boolean }) => (
  <SlideB
    bild={IMGS.ai}
    badge="Misstag 02 · AI-verktyg"
    title="❌ Klistrar in känslig data i <span style='color:#FF5421'>AI-verktyg</span>"
  >
    <Ingress>
      AI-verktyg är fantastiska hjälpmedel — men de flesta anställda tänker inte på vad
      de faktiskt klistrar in. Kunddata och interna dokument hamnar i fel system varje dag.
    </Ingress>

    <StegRad
      nr="1"
      titel="Think before you paste"
      desc="Innan du klistrar in något i ChatGPT eller liknande — är det ok att den informationen lämnar organisationen?"
    />
    <StegRad
      nr="2"
      titel="Vad som ALDRIG får delas"
      desc="Personnummer, kunddata, löner, interna avtal, affärshemligheter, lösenord."
    />
    <StegRad
      nr="3"
      titel="Använd rätt verktyg"
      desc="Microsoft 365 Copilot är tenant-baserad — data stannar inom er organisation. Öppna verktyg som ChatGPT är det."
    />

    <InfoBox title="Viktig skillnad">
      <strong>Copilot (M365)</strong> — data stannar inom er Microsoft-tenant. ✅<br/>
      <strong>ChatGPT/Claude (öppet)</strong> — data kan användas för träning om du inte har avtal. ⚠️
    </InfoBox>

    <QuizBlock questions={quiz2} onComplete={onComplete} isDone={isDone} />
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// SLIDE 3 — MISSTAG 3: Lösenord & MFA (SlideH)
// ══════════════════════════════════════════════════════════
const SlideMisstag3 = ({ onComplete, isDone, onBack }: { onComplete: () => void; isDone: boolean }) => (
  <SlideH
    bild={IMGS.losenord}
    bildBg="#0f1623"
    badge="Misstag 03 · Lösenord och MFA"
    title="❌ Svaga lösenord & <span style='color:#FF5421'>ingen MFA</span>"
    ingress="Återanvända lösenord och avsaknad av multifaktorautentisering är fortfarande bland de vanligaste orsakerna till kontokapning — och konsekvensen är full datatillgång."
    punkter={[
      '<strong>Lösenordshanterare</strong> — använd 1Password, Bitwarden eller liknande. Du behöver bara komma ihåg ett lösenord.',
      '<strong>MFA på ALLA konton</strong> — Microsoft Authenticator eller liknande app. Stoppar 99% av automatiska attacker.',
      '<strong>Unika lösenord</strong> — återanvänd aldrig samma lösenord på flera tjänster.',
      '<strong>Längd slår komplexitet</strong> — "GulBil-Kaffe-Paraply" är starkare än "P@ssw0rd!".',
    ]}
  >
    <QuizBlock questions={quiz3} onComplete={onComplete} isDone={isDone} />
  </SlideH>
);

// ══════════════════════════════════════════════════════════
// SLIDE 4 — MISSTAG 4: Phishing (SlideI dialog)
// ══════════════════════════════════════════════════════════
const SlideMisstag4 = ({ onComplete, isDone, onBack }: { onComplete: () => void; isDone: boolean }) => (
  <SlideI
    bild={IMGS.phishing}
    bubbla="Jag fick ett mejl från VD som ber mig swisha 15 000 kr direkt... Det verkar bråttom?"
    bubblaSida="right"
    badge="Misstag 04 · Phishing"
    title="❌ Faller för <span style='color:#FF5421'>phishing</span> — nu med AI"
    ingress="AI-genererade phishing-mejl är idag nästan omöjliga att skilja från äkta. Deepfake-röster och video gör det ännu svårare. Konsekvensen: du lämnar ut data frivilligt."
    punkter={[
      '<strong>Kontrollera avsändaradressen</strong> — inte bara visningsnamnet. "CEO" kan dölja vilken adress som helst.',
      '<strong>Klicka inte direkt</strong> — hovra över länkar för att se vart de faktiskt leder.',
      '<strong>Verifiera via annan kanal</strong> — ring personen om ett mejl verkar konstigt. Aldrig via samma mejlkedja.',
      '<strong>Bråttom = varningssignal</strong> — angripare skapar konstlad stress för att du ska sluta tänka.',
    ]}
  >
    <QuizBlock questions={quiz4} onComplete={onComplete} isDone={isDone} />
  </SlideI>
);

// ══════════════════════════════════════════════════════════
// SLIDE 5 — MISSTAG 5: Åtkomst (SlideE)
// ══════════════════════════════════════════════════════════
const SlideMisstag5 = ({ onComplete, isDone, onBack }: { onComplete: () => void; isDone: boolean }) => (
  <SlideE
    bild={IMGS.atkomst}
    badge="Misstag 05 · Åtkomstkontroll"
    title="❌ Alla har tillgång till allt"
    punkter={[
      '<strong>Gamla konton lever kvar</strong> — anställda som slutat har fortfarande tillgång till SharePoint, Slack och system.',
      '<strong>Delade mappar växer okontrollerat</strong> — ingen vet längre vem som har tillgång till vad.',
      '<strong>"Least privilege"-principen</strong> — ge bara den åtkomst som faktiskt behövs för jobbet.',
      '<strong>Regelbundna access-reviews</strong> — gå igenom vem som har tillgång till vad minst en gång per kvartal.',
      '<strong>Rensa gamla användare</strong> — ta bort åtkomst direkt när en anställd slutar, byter roll eller avslutar ett projekt.',
    ]}
    fotnot="Interna dataläckor är lika vanliga som externa — och ofta svårare att upptäcka."
    fotnotColor={O}
  >
    <QuizBlock questions={quiz5} onComplete={onComplete} isDone={isDone} />
  </SlideE>
);

// ══════════════════════════════════════════════════════════
// SLIDE 6 — AVSLUTNING (SlideC)
// ══════════════════════════════════════════════════════════
const SlideAvslut = ({
  isDone,
  onDiploma,
  onComplete,
  quizDone,
}: {
  isDone: boolean;
  onDiploma: () => void;
  onComplete: () => void;
  quizDone: boolean;
}) => (
  <SlideC
    bild={IMGS.avslut}
    bildHöjd="35%"
    badge="Sammanfattning · 5 misstag"
    title="5 misstag = 5 <span style='color:#FF5421'>beteenden att ändra</span>"
  >
    <Ingress>
      Du vet nu vad du ska göra annorlunda. Välj ett av dessa fem och ändra det idag.
    </Ingress>

    <div className="space-y-3 mb-6">
      {[
        { nr: '01', text: 'Dela aldrig med "Anyone with the link" — specificera mottagare' },
        { nr: '02', text: 'Tänk innan du klistrar in — känslig data hör inte hemma i öppna AI-verktyg' },
        { nr: '03', text: 'Aktivera MFA och använd en lösenordshanterare idag' },
        { nr: '04', text: 'Verifiera alltid via annan kanal om ett mejl verkar konstigt' },
        { nr: '05', text: 'Rensa gamla åtkomster — ta bort det du inte längre behöver' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl border"
          style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}
        >
          <span className="text-lg font-black flex-shrink-0" style={{ color: `${O}60` }}>
            {item.nr}
          </span>
          <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
        </motion.div>
      ))}
    </div>

    <div
      className="rounded-2xl p-5 border mb-6"
      style={{ background: `${O}10`, borderColor: `${O}25` }}
    >
      <p className="font-bold text-gray-900 mb-1">👉 Din uppgift nu</p>
      <p className="text-sm text-gray-600">
        Välj <strong>1 sak</strong> du ändrar idag. Inte fem — en. Det räcker för att göra skillnad.
      </p>
    </div>

    {!quizDone && (
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
          🧠 Slutquiz
        </p>
        <InlineQuiz questions={quizSlut} onComplete={onComplete} />
      </div>
    )}

    {isDone && (
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onDiploma}
        className="w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-xl"
        style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
      >
        <Award className="w-6 h-6" />
        Hämta kursbevis
      </motion.button>
    )}
  </SlideC>
);

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleDatalackor: React.FC = () => {
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

const allDone = [
  'quiz-1','quiz-2','quiz-3','quiz-4','quiz-5','quiz-huvud',
].every(id => completedLessons.has(id));

  const slides = [

    // ── 0: Intro ──────────────────────────────────────────
    {
      id: 'intro',
      title: 'Introduktion',
      audioSrc: '/audio/datalackor-intro.mp3',
      component: <SlideIntro onStart={() => setCurrentIndex(1)} />,
    },

    // ── 1: Svenska incidenter ─────────────────────────────
    {
      id: 'incidenter',
      title: '🇸🇪 Svenska dataläckor',
      audioSrc: '/audio/exempel-datalackor.mp3',
      component: <DataIncidentSlide bild="/images/datalackor.png" />,
    },

    // ── 2: Översikt ───────────────────────────────────────
    {
      id: 'oversikt',
      title: '5 misstag — översikt',
      audioSrc: '/audio/datalackor-oversikt.mp3',
      component: (
        <div className="h-full flex flex-col overflow-hidden bg-white">
          <div className="w-full flex-shrink-0 relative" style={{ height: '30%', minHeight: 140, maxHeight: 240 }}>
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute bottom-0 left-0 right-0 h-12" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
            <div className="absolute bottom-0 left-0 m-4">
              <div className="inline-block px-4 py-2 font-bold text-sm text-white" style={{ background: O, borderRadius: '0 12px 12px 0' }}>
                Översikt · Klicka för att utforska
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col items-center px-6 pt-6 pb-28">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 text-center"
              style={{ fontFamily: "'Nunito', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: "De <span style='color:#FF5421'>5 misstagen</span> — en snabb översikt" }}
            />
            <ClickableCircles
              items={[
                { id: 'fildelning', label: 'Delar filer fel', short: 'Vanligaste typen av oavsiktlig dataläcka', body: '"Anyone with the link" sprids okontrollerat. Fel personer får tillgång till känslig info utan att du vet om det.', extra: { label: 'Lösningen', text: 'Dela med specifika personer och sätt utgångsdatum på känsliga länkar.' }, badge: { text: 'Hög risk', color: '#DC2626', bg: '#FEE2E2' } },
                { id: 'ai', label: 'Känslig data i AI', short: 'Kunddata hamnar i öppna AI-system', body: 'Anställda klistrar in personnummer, kunddata och interna avtal i ChatGPT utan att tänka på konsekvenserna.', extra: { label: 'Lösningen', text: 'Tänk innan du klistrar in. Använd Microsoft 365 Copilot för känslig data.' }, badge: { text: 'Compliance-risk', color: '#DC2626', bg: '#FEE2E2' } },
                { id: 'losenord', label: 'Svaga lösenord', short: 'Återanvända lösenord + ingen MFA', body: 'Ett enda läckt lösenord ger tillgång till flera system. Utan MFA är kontokapning enkelt.', extra: { label: 'Lösningen', text: 'Lösenordshanterare + MFA på alla konton.' }, badge: { text: 'Kritisk risk', color: '#DC2626', bg: '#FEE2E2' } },
                { id: 'phishing', label: 'Faller för phishing', short: 'AI-genererade mejl är svåra att upptäcka', body: 'Deepfake-röster och AI-genererade mejl gör att du frivilligt lämnar ut inloggningar och pengar.', extra: { label: 'Lösningen', text: 'Verifiera alltid via annan kanal. Bråttom = varningssignal.' }, badge: { text: 'Kritisk risk', color: '#DC2626', bg: '#FEE2E2' } },
                { id: 'atkomst', label: 'Alla har tillgång till allt', short: 'Gamla konton och okontrollerade mappar', body: 'Anställda som slutat har fortfarande åtkomst. Interna dataläckor är lika vanliga som externa.', extra: { label: 'Lösningen', text: 'Least privilege + regelbundna access-reviews.' }, badge: { text: 'Hög risk', color: '#DC2626', bg: '#FEE2E2' } },
              ]}
              onItemClick={(id) => setCurrentIndex(SLIDE_MAP[id])}
              instructionText="Klicka på ett misstag för att gå direkt dit"
              doneText="✓ Bra! Gå nu igenom varje misstag i detalj"
            />
          </div>
        </div>
      ),
    },

    // ── 3: Misstag 1 — Fildelning ─────────────────────────
    {
      id: 'misstag-1',
      title: '❌ Felaktig fildelning',
      audioSrc: '/audio/datalackor-fildelning.mp3',
      component: (
        <SlideMisstag1
          isDone={completedLessons.has('quiz-1')}
          onComplete={() => handleComplete('quiz-1')}
          onBack={() => setCurrentIndex(2)}
        />
      ),
    },

    // ── 4: Misstag 2 — AI-verktyg ─────────────────────────
    {
      id: 'misstag-2',
      title: '❌ Känslig data i AI',
      audioSrc: '/audio/datalackor-ai.mp3',
      component: (
        <SlideMisstag2
          isDone={completedLessons.has('quiz-2')}
          onComplete={() => handleComplete('quiz-2')}
          onBack={() => setCurrentIndex(2)}
        />
      ),
    },

    // ── 5: Misstag 3 — Lösenord ───────────────────────────
    {
      id: 'misstag-3',
      title: '❌ Svaga lösenord',
      audioSrc: '/audio/datalackor-losenord.mp3',
      component: (
        <SlideMisstag3
          isDone={completedLessons.has('quiz-3')}
          onComplete={() => handleComplete('quiz-3')}
          onBack={() => setCurrentIndex(2)}
        />
      ),
    },

    // ── 6: Misstag 4 — Phishing ───────────────────────────
    {
      id: 'misstag-4',
      title: '❌ Phishing',
      audioSrc: '/audio/datalackor-phishing.mp3',
      component: (
        <SlideMisstag4
          isDone={completedLessons.has('quiz-4')}
          onComplete={() => handleComplete('quiz-4')}
          onBack={() => setCurrentIndex(2)}
        />
      ),
    },

    // ── 7: Misstag 5 — Åtkomst ────────────────────────────
    {
      id: 'misstag-5',
      title: '❌ För bred åtkomst',
      audioSrc: '/audio/datalackor-atkomst.mp3',
      component: (
        <SlideMisstag5
          isDone={completedLessons.has('quiz-5')}
          onComplete={() => handleComplete('quiz-5')}
          onBack={() => setCurrentIndex(2)}
        />
      ),
    },

    // ── 8: Quiz 1 — Fildelning ────────────────────────────
    {
      id: 'quiz-1',
      title: '💡 Övning — fildelning',
      component: (
        <ScenarioQuiz
          bild={IMGS.fildelning}
          bubbla="Jag har bråttom — kan jag inte bara skicka länken med 'Anyone with the link'?"
          bubblaSida="left"
          fråga="Vad bör du göra?"
          alternativ={[
            { text: 'Ja, det går snabbt och smidigt', korrekt: false },
            { text: 'Dela med specifik person och sätt ett utgångsdatum', korrekt: true },
            { text: 'Skicka hela filen som e-postbilaga istället', korrekt: false },
            { text: 'Det spelar ingen roll hur man delar internt', korrekt: false },
          ]}
          förklaring="Öppna länkar kan spridas okontrollerat. Dela alltid med specifika personer och begränsa åtkomsttiden för känsliga dokument."
          onComplete={() => handleComplete('quiz-1')}
          isDone={completedLessons.has('quiz-1')}
        />
      ),
    },

    // ── 9: Quiz 2 — AI-verktyg ────────────────────────────
    {
      id: 'quiz-2',
      title: '💡 Övning — AI-verktyg',
      component: (
        <ScenarioQuiz
          bild={IMGS.ai}
          bubbla="Jag klistrade in hela kundlistan i ChatGPT för att analysera den — var det okej?"
          bubblaSida="right"
          fråga="Vilket av följande FÅR du klistra in i ett öppet AI-verktyg?"
          alternativ={[
            { text: 'En kunds personnummer för att skriva ett brev', korrekt: false },
            { text: 'Internt avtal med affärsvillkor', korrekt: false },
            { text: 'En offentlig nyhetsartikel du vill sammanfatta', korrekt: true },
            { text: 'Löner och anställningsvillkor', korrekt: false },
          ]}
          förklaring="Offentlig information är ok. Känslig intern data, kunduppgifter och personuppgifter ska aldrig klistras in i öppna AI-verktyg."
          onComplete={() => handleComplete('quiz-2')}
          isDone={completedLessons.has('quiz-2')}
        />
      ),
    },

    // ── 10: Quiz 3 — Lösenord ─────────────────────────────
    {
      id: 'quiz-3',
      title: '💡 Övning — lösenord',
      component: (
        <ScenarioQuiz
          bild={IMGS.losenord}
          bubbla="Mitt lösenord är 'Sommar2023!' — det är unikt för varje tjänst... ungefär."
          bubblaSida="left"
          fråga="Vilket lösenord är egentligen starkast?"
          alternativ={[
            { text: 'Sommar2024!', korrekt: false },
            { text: 'qwerty123', korrekt: false },
            { text: 'Tr0ub4dor&3', korrekt: false },
            { text: 'GulBil-Kaffe-Paraply-47', korrekt: true },
          ]}
          förklaring="Långa lösenfraser med slumpmässiga ord är svårare att knäcka. Längd slår komplexitet — och de är lättare att komma ihåg."
          onComplete={() => handleComplete('quiz-3')}
          isDone={completedLessons.has('quiz-3')}
        />
      ),
    },

    // ── 11: Quiz 4 — Phishing ─────────────────────────────
    {
      id: 'quiz-4',
      title: '💡 Övning — phishing',
      component: (
        <ScenarioQuiz
          bild={IMGS.phishing}
          bubbla="Jag fick ett mejl från VD som ber mig swisha 15 000 kr direkt... Det verkar bråttom?"
          bubblaSida="right"
          fråga="Vad gör du?"
          alternativ={[
            { text: 'Betalar direkt — det är bråttom enligt mejlet', korrekt: false },
            { text: 'Vidarebefordrar till ekonomiavdelningen utan att fråga', korrekt: false },
            { text: 'Kontaktar VD via telefon eller personligen för att verifiera', korrekt: true },
            { text: 'Svarar på mejlet och frågar om mer information', korrekt: false },
          ]}
          förklaring="VD-bluff är en av de vanligaste phishing-attackerna. Verifiera alltid via en annan kanal — aldrig via samma mejlkedja."
          onComplete={() => handleComplete('quiz-4')}
          isDone={completedLessons.has('quiz-4')}
        />
      ),
    },

    // ── 12: Quiz 5 — Åtkomst ──────────────────────────────
    {
      id: 'quiz-5',
      title: '💡 Övning — åtkomst',
      component: (
        <ScenarioQuiz
          bild={IMGS.atkomst}
          bubbla="En kollega slutade för 3 månader sedan men har fortfarande tillgång till vår SharePoint..."
          bubblaSida="left"
          fråga="Vad bör ni göra?"
          alternativ={[
            { text: 'Ingenting — de loggar aldrig in ändå', korrekt: false },
            { text: 'Ta bort åtkomsten omedelbart', korrekt: true },
            { text: 'Vänta till nästa access-review om ett år', korrekt: false },
            { text: 'Minska deras behörighet till läsrättigheter', korrekt: false },
          ]}
          förklaring="Gamla konton med onödig åtkomst är en av de vanligaste säkerhetsriskerna. Åtkomst ska tas bort direkt när en anställd slutar."
          onComplete={() => handleComplete('quiz-5')}
          isDone={completedLessons.has('quiz-5')}
        />
      ),
    },

    // ── 13: Kunskapstest ──────────────────────────────────
    {
      id: 'quiz-huvud',
      title: '🧠 Kunskapstest',
      audioSrc: '/audio/datalackor-quiz.mp3',
      component: (
        <SlideF bild={IMGS.losenord} badge="Kunskapstest · 12 frågor">
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Testa dina kunskaper
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            12 frågor om de 5 misstagen — visa att du är redo.
          </p>
          <AnimatePresence>
            {completedLessons.has('quiz-huvud') && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-3 border mb-5 flex items-center gap-2"
                style={{ background: `${O}10`, borderColor: `${O}25` }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
                <p className="text-sm font-semibold text-gray-800">Quiz avklarat! Gå vidare för kursbeviset.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <InlineQuiz questions={quizHuvud} onComplete={() => handleComplete('quiz-huvud')} />
        </SlideF>
      ),
    },

    // ── 14: Avslutning ────────────────────────────────────
    {
      id: 'avslut',
      title: '🏆 Sammanfattning',
      audioSrc: '/audio/datalackor-avslut.mp3',
      component: (
        <SlideAvslut
          isDone={allDone}
          quizDone={completedLessons.has('quiz-huvud')}
          onComplete={() => handleComplete('quiz-huvud')}
          onDiploma={() => alert(`Grattis ${userData.name}! Kursbevis laddas ner...`)}
        />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>

      <SlideSidebar
        slides={slides}
        currentIndex={currentIndex}
        completedLessons={completedLessons}
        onNavigate={setCurrentIndex}
        courseTitle="5 misstag som leder till dataläckor"
        userName={userData.name}
        onDiplomaDownload={() => alert(`Grattis ${userData.name}! Kursbevis laddas ner...`)}
      />

      <div
        className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}
      >
        <ModuleSlideLayout
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          showHeader={currentIndex > 0}
        >
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>

      <FloatingFAQ
        faqs={FAQ}
        title="Frågor om informationssäkerhet"
        subtitle="Vanliga frågor om dataläckor och säkert beteende"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleDatalackor;