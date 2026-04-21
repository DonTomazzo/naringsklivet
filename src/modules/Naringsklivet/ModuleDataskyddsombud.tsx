// src/modules/Naringsklivet/ModuleDataskyddsombud.tsx
// Kurs: Dataskyddsombud – programmet för dagen
// Målgrupp: Medarbetare som ska bli dataskyddsombud
// Mallar: SlideA, SlideB, SlideD, SlideH
// Bilder: /images/co1–co4 (byt ut mot egna)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Play } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';

import {
  SlideA, SlideB, SlideD, SlideH,
  Bullet, CheckItem, StegRad, InfoBox, FrameBox, TwoCol,
  Badge, Heading, Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

// ─── Bildvägar ───────────────────────────────────────────
const B1 = '/images/co1.png';
const B2 = '/images/co2.png';
const B3 = '/images/co3.png';
const B4 = '/images/co4.png';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Måste alla organisationer ha ett dataskyddsombud?',
    answer: 'Nej, men det krävs för offentliga myndigheter och organisationer som behandlar personuppgifter i stor skala eller behandlar känsliga uppgifter systematiskt.',
  },
  {
    question: 'Kan dataskyddsombudet hållas personligt ansvarigt?',
    answer: 'Nej — det är organisationen (personuppgiftsansvarig) som bär det juridiska ansvaret. Ombudet är ett stöd och en kontaktpunkt, inte den ansvarige.',
  },
  {
    question: 'Hur länge måste man spara dokumentation enligt GDPR?',
    answer: 'GDPR anger ingen specifik tid — dokumentationen ska finnas så länge behandlingen pågår. Registerförteckningen ska alltid vara aktuell.',
  },
  {
    question: 'Vad är skillnaden mellan personuppgiftsansvarig och biträde?',
    answer: 'Personuppgiftsansvarig bestämmer varför och hur uppgifterna behandlas. Biträdet behandlar uppgifterna på den ansvariges uppdrag — t.ex. ett IT-system eller en leverantör.',
  },
  {
    question: 'Hur snabbt måste en dataincidens rapporteras?',
    answer: 'Inom 72 timmar från att incidenten upptäcktes ska Integritetsskyddsmyndigheten (IMY) informeras — om det finns risk för de registrerades rättigheter.',
  },
];

// ══════════════════════════════════════════════════════════
// HJÄLP: InlineQuiz-wrapper med matchande design
// ══════════════════════════════════════════════════════════
const QuizBlock = ({
  id,
  questions,
  onComplete,
  isDone,
}: {
  id: string;
  questions: any[];
  onComplete: () => void;
  isDone: boolean;
}) => (
  <div className="mt-6">
    <div
      className="rounded-2xl border-l-4 px-5 py-4 mb-4"
      style={{ borderColor: O, background: '#FFF5F2' }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: O }}>
        Kunskapskoll
      </p>
      <p className="text-gray-600 text-sm">Svara på frågorna innan du går vidare.</p>
    </div>

    <AnimatePresence>
      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-3 border mb-4 flex items-center gap-2"
          style={{ background: `${O}10`, borderColor: `${O}25` }}
        >
          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: O }} />
          <p className="text-sm font-semibold text-gray-800">Avklarat — fortsätt till nästa avsnitt.</p>
        </motion.div>
      )}
    </AnimatePresence>

    <InlineQuiz questions={questions} onComplete={onComplete} />
  </div>
);

const SlideIntro = ({ onStart }: { onStart: () => void }) => (
  <SplitSlide
    badge="Dataskyddsombud · Programmet för dagen"
    title="Bli ett <span style='color:#FF5421'>kunnigt dataskyddsombud</span>"
    ingress="En heldagsutbildning för dig som ska axla rollen som dataskyddsombud."
    bild="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
    bildPosition="right"
    badge2="Vad du lär dig"
    badge2Sub="Förmiddag och eftermiddag"
  >
    <StegLista steg={[
      { nr: '01', titel: '12 avsnitt', desc: 'Förmiddag och eftermiddag med kunskapskontroller.' },
      { nr: '02', titel: 'Praktiska exempel', desc: 'Mallar för registerförteckning, DPIA och biträdesavtal.' },
      { nr: '03', titel: 'AI och GDPR', desc: 'Hur AI-förordningen förhåller sig till dataskyddsreglerna.' },
    ]} />
    <InfoRuta>
      Dataskyddsombudet är inte personligt juridiskt ansvarigt — det är organisationen som bär ansvaret.
    </InfoRuta>
    <button
      onClick={onStart}
      className="mt-6 px-8 py-4 rounded-2xl font-bold text-white text-base shadow-lg"
      style={{ background: `linear-gradient(135deg, #FF5421, #E04619)` }}
    >
      Starta utbildningen →
    </button>
  </SplitSlide>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 01 — INTRODUKTION (SlideB)
// ══════════════════════════════════════════════════════════
const Slide01Intro = () => (
  <SlideB
    bild={B2}
    badge="Avsnitt 01 · Förmiddag"
    title="Introduktion"
  >
    <Ingress>
      Välkommen till utbildningen. Vi börjar med att gå igenom målet med dagen,
      upplägget och praktiska frågor.
    </Ingress>

    <StegRad
      nr="1"
      titel="Mål med dagen"
      desc="Du ska lämna utbildningen med en klar bild av dataskyddsombudets roll, ansvar och verktyg — och känna dig trygg i att ta rollen."
    />
    <StegRad
      nr="2"
      titel="Upplägg"
      desc="Förmiddag: roll, ansvar, dokumentation och internationella regler. Eftermiddag: informationssäkerhet, AI, konsekvensbedömning och incidenthantering."
    />
    <StegRad
      nr="3"
      titel="Praktiska frågor"
      desc="Kursen är uppdelad i 12 avsnitt med kunskapskontroller. Du kan gå i din egen takt och återkomma till avsnitt vid behov."
    />

    <InfoBox title="Viktigt att veta">
      Dataskyddsombudet är inte personligt juridiskt ansvarigt — det är
      organisationen som är personuppgiftsansvarig. Ditt uppdrag är att
      vägleda, informera och övervaka.
    </InfoBox>
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 02 — ROLL, ANSVAR OCH ARBETSUPPGIFTER (SlideA)
// ══════════════════════════════════════════════════════════
const Slide02Roll = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideA
    bild={B1}
    badge="Avsnitt 02 · Roll och ansvar"
    title="Vad gör ett dataskyddsombud?"
  >
    <Ingress>
      Dataskyddsombudet är organisationens expert på GDPR — men inte den som
      bär det juridiska ansvaret. Rollen handlar om rådgivning, övervakning
      och att vara kontaktpunkt mot tillsynsmyndigheten.
    </Ingress>

    <TwoCol
      left={
        <FrameBox title="Kärnuppgifter">
          <CheckItem>Informera och ge råd om GDPR-skyldigheter</CheckItem>
          <CheckItem>Övervaka att organisationen följer dataskyddsreglerna</CheckItem>
          <CheckItem>Vara kontaktpunkt för Integritetsskyddsmyndigheten (IMY)</CheckItem>
          <CheckItem>Ge råd om konsekvensbedömningar (DPIA)</CheckItem>
        </FrameBox>
      }
      right={
        <FrameBox title="Vem kan vara DSO?">
          <CheckItem>Intern anställd eller extern konsult</CheckItem>
          <CheckItem>Kräver expertkunskap i dataskyddslagstiftning</CheckItem>
          <CheckItem>Får inte ha intressekonflikt med rollen</CheckItem>
          <CheckItem>Ska ha tillräckliga resurser för uppdraget</CheckItem>
        </FrameBox>
      }
    />

    <QuizBlock
      id="quiz-02"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q02-1',
          question_text: 'Vem är personuppgiftsansvarig i en organisation?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Dataskyddsombudet',
            'Organisationen (juridisk person)',
            'IT-chefen',
            'Tillsynsmyndigheten',
          ]},
          correct_answer: 'Organisationen (juridisk person)',
          explanation: 'Det är organisationen — inte dataskyddsombudet — som bär det juridiska ansvaret för personuppgiftsbehandlingen.',
          points: 100,
        },
        {
          id: 'q02-2',
          question_text: 'Vilket av följande är INTE en uppgift för dataskyddsombudet?',
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Ge råd om GDPR-skyldigheter',
            'Fatta beslut om vilka personuppgifter som får behandlas',
            'Övervaka efterlevnad av dataskyddsregler',
            'Vara kontaktpunkt för IMY',
          ]},
          correct_answer: 'Fatta beslut om vilka personuppgifter som får behandlas',
          explanation: 'DSO ger råd och övervakar — men det är den personuppgiftsansvarige (organisationen) som fattar besluten.',
          points: 100,
        },
      ]}
    />
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 03 — ANSVARSSKYLDIGHET (SlideH)
// ══════════════════════════════════════════════════════════
const Slide03Ansvar = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideH
    bild={B3}
    bildBg="#F0F4FF"
    badge="Avsnitt 03 · Ansvarsskyldighet"
    title="Ansvarsskyldighet — <span style='color:#FF5421'>accountability</span>"
    ingress="GDPR kräver att organisationen inte bara följer reglerna — den ska också kunna bevisa att den gör det. Det kallas ansvarsskyldighet (accountability)."
    punkter={[
      '<strong>Principerna</strong> — Personuppgifter ska behandlas lagligt, korrekt och öppet, med ändamålsbegränsning och dataminimering.',
      '<strong>Information till de registrerade</strong> — Tydlig och lättillgänglig information om hur uppgifter behandlas, i enlighet med artiklarna 13–14.',
      '<strong>Registerförteckning</strong> — Dokumentera alla behandlingar som pågår i organisationen (artikel 30).',
      '<strong>Interna riktlinjer</strong> — Dataskyddspolicy och rutiner ska finnas dokumenterade och följas.',
    ]}
  >
    <QuizBlock
      id="quiz-03"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q03-1',
          question_text: 'Vad innebär principen om dataminimering?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Att man ska radera all data efter ett år',
            'Att man bara får samla in uppgifter som är nödvändiga för ändamålet',
            'Att databasen ska vara så liten som möjligt tekniskt sett',
            'Att känsliga uppgifter ska krypteras',
          ]},
          correct_answer: 'Att man bara får samla in uppgifter som är nödvändiga för ändamålet',
          explanation: 'Dataminimering innebär att personuppgifterna ska vara adekvata, relevanta och begränsade till vad som är nödvändigt för ändamålet.',
          points: 100,
        },
        {
          id: 'q03-2',
          question_text: 'Vad är syftet med ansvarsskyldighet (accountability) enligt GDPR?',
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Att dataskyddsombudet ska kunna straffas vid överträdelser',
            'Att organisationen ska kunna bevisa att den följer GDPR',
            'Att alla anställda ska skriva under ett avtal',
            'Att revisorer ska granska all databehandling',
          ]},
          correct_answer: 'Att organisationen ska kunna bevisa att den följer GDPR',
          explanation: 'Ansvarsskyldighet innebär att det inte räcker att följa reglerna — organisationen ska också kunna demonstrera och bevisa att den gör det.',
          points: 100,
        },
      ]}
    />
  </SlideH>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 04 — DOKUMENTATION (SlideB)
// ══════════════════════════════════════════════════════════
const Slide04Dokumentation = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideB
    bild={B4}
    badge="Avsnitt 04 · Dokumentation"
    title="Vad måste dokumenteras?"
  >
    <Ingress>
      Dokumentation är grunden för att kunna visa att organisationen följer GDPR.
      Här är de viktigaste dokumenten varje organisation behöver.
    </Ingress>

    <StegRad
      nr="1"
      titel="Registerförteckning (artikel 30)"
      desc="Ska innehålla: ändamål, kategorier av registrerade, kategorier av uppgifter, mottagare, överföringar till tredje land och lagringstider."
    />
    <StegRad
      nr="2"
      titel="Dataskyddspolicy"
      desc="Intern policy som beskriver hur organisationen hanterar personuppgifter, vem som ansvarar för vad och vilka rutiner som gäller."
    />
    <StegRad
      nr="3"
      titel="Rättslig grund"
      desc="För varje behandling ska det dokumenteras vilken rättslig grund som tillämpas: samtycke, avtal, rättslig förpliktelse, berättigat intresse m.fl."
    />
    <StegRad
      nr="4"
      titel="Konsekvensbedömningar (DPIA)"
      desc="Ska dokumenteras och sparas när behandlingen medför hög risk för de registrerades rättigheter och friheter."
    />

    <QuizBlock
      id="quiz-04"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q04-1',
          question_text: 'Vad ska en registerförteckning enligt artikel 30 innehålla?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Enbart namn och personnummer på de registrerade',
            'Ändamål, kategorier av uppgifter, mottagare och lagringstider',
            'Samtliga anställdas löner och arbetsuppgifter',
            'IT-systemens tekniska specifikationer',
          ]},
          correct_answer: 'Ändamål, kategorier av uppgifter, mottagare och lagringstider',
          explanation: 'Registerförteckningen är ett centralt GDPR-krav och ska beskriva alla behandlingar av personuppgifter i organisationen.',
          points: 100,
        },
      ]}
    />
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 05 — BITRÄDESAVTAL (SlideA)
// ══════════════════════════════════════════════════════════
const Slide05Bitradsavtal = () => (
  <SlideA
    bild={B1}
    badge="Avsnitt 05 · Biträdesavtal"
    title="Biträdesavtal — vad ska de innehålla?"
  >
    <Ingress>
      När ni anlitar en leverantör som behandlar personuppgifter för er räkning
      krävs ett biträdesavtal (artikel 28 GDPR). Det är ett obligatoriskt juridiskt
      dokument som reglerar hur biträdet får hantera uppgifterna.
    </Ingress>

    <FrameBox title="Obligatoriskt innehåll i biträdesavtalet">
      <CheckItem>Behandlingens föremål, varaktighet, art och ändamål</CheckItem>
      <CheckItem>Typ av personuppgifter och kategorier av registrerade</CheckItem>
      <CheckItem>Den personuppgiftsansvariges skyldigheter och rättigheter</CheckItem>
      <CheckItem>Att biträdet bara behandlar uppgifter på dokumenterade instruktioner</CheckItem>
      <CheckItem>Krav på konfidentialitet för behörig personal</CheckItem>
      <CheckItem>Krav på lämpliga tekniska och organisatoriska säkerhetsåtgärder</CheckItem>
      <CheckItem>Regler för anlitande av underbiträden</CheckItem>
      <CheckItem>Biträdets skyldighet att bistå den ansvarige vid incidenter och DPIA</CheckItem>
      <CheckItem>Radering eller återlämnande av uppgifter när uppdraget avslutas</CheckItem>
    </FrameBox>

    <InfoBox title="Praktisk tips">
      Gå igenom alla era leverantörsavtal och säkerställ att biträdesavtal finns
      på plats för varje leverantör som behandlar personuppgifter. Saknas avtalet
      är det en GDPR-överträdelse — oavsett om leverantören i övrigt sköter sig.
    </InfoBox>
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 06 — INTERNATIONELLT (SlideD)
// ══════════════════════════════════════════════════════════
const Slide06Internationellt = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <>
    <SlideD
      bild={B2}
      badge="Avsnitt 06 · Internationellt"
      bubblor={[
        {
          text: 'Vad gäller när vi skickar data till USA?',
          position: 'left-top',
          color: 'light',
        },
        {
          text: 'Det krävs en giltig överföringsmekanism — t.ex. standardavtalsklausuler.',
          position: 'right-top',
          color: 'orange',
        },
        {
          text: 'Och om landet inte har adekvat skyddsnivå?',
          position: 'left-mid',
          color: 'light',
        },
        {
          text: 'Då måste ni använda SCC, BCR eller undantag enligt artikel 49.',
          position: 'right-mid',
          color: 'dark',
        },
        {
          text: 'EU-US Data Privacy Framework gäller sedan 2023!',
          position: 'right-bot',
          color: 'orange',
        },
      ]}
    />
  </>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 06B — INTERNATIONELLT FÖRDJUPNING (SlideA)
// ══════════════════════════════════════════════════════════
const Slide06bInternationellt = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideA
    bild={B3}
    badge="Avsnitt 06 · Fördjupning"
    title="Internationell överföring av personuppgifter"
  >
    <Ingress>
      Att skicka personuppgifter utanför EU/EES kräver att en av GDPR:s
      godkända mekanismer används.
    </Ingress>

    <StegRad
      nr="1"
      titel="Adekvat skyddsnivå"
      desc="EU-kommissionen har beslutat att vissa länder har tillräckligt skydd — t.ex. UK, Japan, Schweiz och sedan 2023 USA (EU-US Data Privacy Framework)."
    />
    <StegRad
      nr="2"
      titel="Standardavtalsklausuler (SCC)"
      desc="EU-kommissionens färdiga avtalsmallar som ger ett tillräckligt skydd vid överföring. Vanligaste mekanismen i praktiken."
    />
    <StegRad
      nr="3"
      titel="Bindande företagsbestämmelser (BCR)"
      desc="Används inom koncerner för att reglera intern överföring av personuppgifter. Kräver godkännande från tillsynsmyndigheten."
    />
    <StegRad
      nr="4"
      titel="Undantag (artikel 49)"
      desc="I undantagsfall tillåts överföring utan mekanism — t.ex. vid samtycke, avtal eller rättsliga anspråk. Ska inte vara regeln."
    />

    <QuizBlock
      id="quiz-06"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q06-1',
          question_text: 'Vilken mekanism är vanligast vid överföring av personuppgifter till tredje land?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Bindande företagsbestämmelser (BCR)',
            'Standardavtalsklausuler (SCC)',
            'Samtycke från varje registrerad',
            'EU-US Privacy Shield',
          ]},
          correct_answer: 'Standardavtalsklausuler (SCC)',
          explanation: 'SCC är den vanligaste och mest praktiska mekanismen. EU-US Privacy Shield ogiltigförklarades 2020 och ersattes av EU-US Data Privacy Framework 2023.',
          points: 100,
        },
      ]}
    />
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 07 — INFORMATIONSSÄKERHET (SlideH)
// ══════════════════════════════════════════════════════════
const Slide07Sakerhet = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideH
    bild={B4}
    bildBg="#F0F4F0"
    badge="Avsnitt 07 · Eftermiddag"
    title="Informationssäkerhet och <span style='color:#FF5421'>dataskydd</span>"
    ingress="Tekniska och organisatoriska säkerhetsåtgärder är en grundpelare i GDPR. Organisationen ska implementera lämpliga åtgärder för att skydda personuppgifter."
    punkter={[
      '<strong>Behörighets- och åtkomstkontroller</strong> — Bara de som behöver tillgång till personuppgifter ska ha det. Principen om minsta möjliga behörighet.',
      '<strong>Skydd mot dataförlust</strong> — Regelbundna säkerhetskopior, kryptering av känsliga uppgifter och rutiner för återställning.',
      '<strong>Skydd mot otillåten behandling</strong> — Loggning av åtkomst, behörighetskontroll och rutiner för att upptäcka och hantera obehörig åtkomst.',
      '<strong>Pseudonymisering och kryptering</strong> — Rekommenderas för känsliga personuppgifter och uppgifter som överförs externt.',
    ]}
  >
    <QuizBlock
      id="quiz-07"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q07-1',
          question_text: 'Vad innebär principen om minsta möjliga behörighet?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Att lösenord ska vara så korta som möjligt',
            'Att bara de som behöver tillgång till uppgifter för sitt arbete ska ha det',
            'Att organisationen ska spara så lite data som möjligt',
            'Att IT-system ska ha minimala resurser',
          ]},
          correct_answer: 'Att bara de som behöver tillgång till uppgifter för sitt arbete ska ha det',
          explanation: 'Behörighetsstyrning är en central säkerhetsåtgärd — tillgång till personuppgifter ska begränsas till de som faktiskt behöver dem i sitt arbete.',
          points: 100,
        },
      ]}
    />
  </SlideH>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 08 — AI OCH DATASKYDD (SlideB)
// ══════════════════════════════════════════════════════════
const Slide08AI = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideB
    bild={B1}
    badge="Avsnitt 08 · AI och dataskydd"
    title="AI och GDPR — vad gäller?"
  >
    <Ingress>
      Artificiell intelligens ställer nya krav på dataskyddsarbetet. AI-system
      behandlar ofta stora mängder personuppgifter och kan medföra risker som
      kräver särskild uppmärksamhet.
    </Ingress>

    <StegRad
      nr="1"
      titel="AI och personuppgiftsbehandling"
      desc="AI-system som tränas på eller använder personuppgifter omfattas av GDPR. Rättslig grund krävs — precis som för all annan behandling."
    />
    <StegRad
      nr="2"
      titel="AI-förordningen (EU AI Act)"
      desc="Kompletterar GDPR med riskbaserade krav på AI-system. Hög-risk-system (t.ex. i HR, kreditbedömning, brottsbekämpning) har skärpta krav."
    />
    <StegRad
      nr="3"
      titel="Automatiserat beslutsfattande"
      desc="Artikel 22 GDPR ger registrerade rätt att inte vara föremål för enbart automatiserade beslut med rättsliga konsekvenser — utan mänsklig granskning."
    />
    <StegRad
      nr="4"
      titel="LLM:er och tredjepartstjänster"
      desc="ChatGPT, Copilot m.fl. är biträden om de behandlar personuppgifter. Biträdesavtal krävs. Känsliga uppgifter ska inte matas in utan avtal."
    />

    <InfoBox title="DSO:s roll vid AI-införande">
      Dataskyddsombudet ska involveras tidigt när organisationen inför
      AI-system — gärna i kravspecifikationsfasen. En DPIA är ofta obligatorisk
      för AI-system som behandlar personuppgifter i stor skala.
    </InfoBox>

    <QuizBlock
      id="quiz-08"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q08-1',
          question_text: 'Vad ger artikel 22 GDPR de registrerade rätt till?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Rätt att kräva att AI-system raderas',
            'Rätt att inte vara föremål för enbart automatiserade beslut med rättsliga konsekvenser',
            'Rätt att få veta vilka algoritmer som används',
            'Rätt att använda AI-tjänster gratis',
          ]},
          correct_answer: 'Rätt att inte vara föremål för enbart automatiserade beslut med rättsliga konsekvenser',
          explanation: 'Artikel 22 skyddar mot automatiserat beslutsfattande utan mänsklig inblandning när det har rättsliga eller liknande konsekvenser för den registrerade.',
          points: 100,
        },
        {
          id: 'q08-2',
          question_text: 'Vad krävs om organisationen använder en LLM-tjänst som ChatGPT för att behandla personuppgifter?',
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Ingenting — konsumenttjänster är undantagna från GDPR',
            'Enbart ett samtycke från de registrerade',
            'Ett biträdesavtal med tjänsteleverantören',
            'Godkännande från IMY',
          ]},
          correct_answer: 'Ett biträdesavtal med tjänsteleverantören',
          explanation: 'När en extern tjänst behandlar personuppgifter på organisationens uppdrag är det ett biträdesförhållande som kräver ett biträdesavtal.',
          points: 100,
        },
      ]}
    />
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 09 — KONSEKVENSBEDÖMNING / DPIA (SlideA)
// ══════════════════════════════════════════════════════════
const Slide09DPIA = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideA
    bild={B2}
    badge="Avsnitt 09 · Konsekvensbedömning"
    title="DPIA — när och hur?"
  >
    <Ingress>
      En konsekvensbedömning (Data Protection Impact Assessment, DPIA) är
      obligatorisk när en behandling sannolikt medför hög risk för de
      registrerades rättigheter och friheter.
    </Ingress>

    <FrameBox title="När är DPIA obligatorisk?">
      <CheckItem>Systematisk och omfattande bedömning av personliga aspekter med automatiserat beslutsfattande</CheckItem>
      <CheckItem>Behandling i stor skala av känsliga personuppgifter</CheckItem>
      <CheckItem>Systematisk övervakning av allmänt tillgängliga platser</CheckItem>
      <CheckItem>Behandling med ny teknik som medför hög risk</CheckItem>
    </FrameBox>

    <div className="mt-4">
      <StegRad
        nr="1"
        titel="Beskriv behandlingen"
        desc="Vad behandlas, varför, hur länge och vem har tillgång?"
      />
      <StegRad
        nr="2"
        titel="Bedöm nödvändighet och proportionalitet"
        desc="Är behandlingen nödvändig för ändamålet? Finns alternativ med lägre risk?"
      />
      <StegRad
        nr="3"
        titel="Identifiera och bedöm risker"
        desc="Vilka risker finns för de registrerade? Sannolikhet och konsekvens?"
      />
      <StegRad
        nr="4"
        titel="Identifiera åtgärder"
        desc="Vilka tekniska och organisatoriska åtgärder minskar riskerna till acceptabel nivå?"
      />
    </div>

    <QuizBlock
      id="quiz-09"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q09-1',
          question_text: 'När är en konsekvensbedömning (DPIA) obligatorisk?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'Vid all behandling av personuppgifter',
            'Enbart vid behandling av personnummer',
            'När behandlingen sannolikt medför hög risk för de registrerades rättigheter',
            'Enbart för offentliga myndigheter',
          ]},
          correct_answer: 'När behandlingen sannolikt medför hög risk för de registrerades rättigheter',
          explanation: 'DPIA krävs när behandlingen är av sådan karaktär att den kan medföra hög risk — inte vid all behandling av personuppgifter.',
          points: 100,
        },
      ]}
    />
  </SlideA>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 10 — INCIDENTHANTERING (SlideH)
// ══════════════════════════════════════════════════════════
const Slide10Incident = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideH
    bild={B3}
    bildBg="#FFF0F0"
    badge="Avsnitt 10 · Incidenthantering"
    title="Dataincidenter — <span style='color:#FF5421'>72 timmar gäller</span>"
    ingress="En personuppgiftsincident är en säkerhetsincident som leder till oavsiktlig eller otillåten förstöring, förlust, ändring, obehörigt röjande av eller åtkomst till personuppgifter."
    punkter={[
      '<strong>72-timmarsregeln</strong> — Anmälan till IMY ska göras inom 72 timmar från det att incidenten upptäcktes, om den medför risk för de registrerade.',
      '<strong>Riskbedömning</strong> — Bedöm sannolikhet och allvarlighetsgrad av risken för de registrerade. Låg risk → intern dokumentation. Hög risk → anmäl till IMY och informera de registrerade.',
      '<strong>Dokumentation alltid</strong> — Alla incidenter ska dokumenteras internt, oavsett om de anmäls eller inte. Detta är DSO:s ansvar.',
      '<strong>DSO:s roll</strong> — Ge råd om huruvida incidenten ska anmälas, bistå vid riskbedömningen och säkerställa att dokumentationen är korrekt.',
    ]}
  >
    <QuizBlock
      id="quiz-10"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q10-1',
          question_text: 'Inom hur många timmar ska en dataincidens anmälas till IMY?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            '24 timmar',
            '48 timmar',
            '72 timmar',
            '7 dagar',
          ]},
          correct_answer: '72 timmar',
          explanation: 'Anmälan till tillsynsmyndigheten ska göras inom 72 timmar från det att incidenten upptäcktes — om det inte är möjligt ska skälen till förseningen förklaras.',
          points: 100,
        },
        {
          id: 'q10-2',
          question_text: 'Vilka incidenter behöver anmälas till IMY?',
          question_type: 'single_choice',
          question_order: 2,
          options: { choices: [
            'Alla personuppgiftsincidenter oavsett risk',
            'Enbart incidenter som involverar mer än 100 personer',
            'Incidenter som medför risk för de registrerades rättigheter och friheter',
            'Enbart incidenter som orsakats av externa aktörer',
          ]},
          correct_answer: 'Incidenter som medför risk för de registrerades rättigheter och friheter',
          explanation: 'Anmälningsplikten gäller när incidenten medför risk — vid låg risk räcker intern dokumentation, vid hög risk ska även de registrerade informeras.',
          points: 100,
        },
      ]}
    />
  </SlideH>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 11 — ÖVERVAKNING OCH INTERNREVISION (SlideB)
// ══════════════════════════════════════════════════════════
const Slide11Revision = ({
  onComplete,
  isDone,
}: {
  onComplete: () => void;
  isDone: boolean;
}) => (
  <SlideB
    bild={B4}
    badge="Avsnitt 11 · Övervakning och revision"
    title="Övervaka, mät och rapportera"
  >
    <Ingress>
      Dataskydd är inte ett projekt som avslutas — det är ett löpande arbete.
      DSO ska säkerställa att organisationen kontinuerligt övervakar och
      förbättrar sitt dataskyddsarbete.
    </Ingress>

    <TwoCol
      left={
        <FrameBox title="Övervakningsmetoder">
          <CheckItem>Regelbundna internrevisioner av behandlingar</CheckItem>
          <CheckItem>Granskning av registerförteckning (minst årligen)</CheckItem>
          <CheckItem>Uppföljning av biträdesavtal</CheckItem>
          <CheckItem>Kontroll av att utbildning genomförs</CheckItem>
        </FrameBox>
      }
      right={
        <FrameBox title="Rapportering till ledningen">
          <CheckItem>Resultat av internrevisioner</CheckItem>
          <CheckItem>Status för pågående behandlingar</CheckItem>
          <CheckItem>Incidenter och avvikelser</CheckItem>
          <CheckItem>Risker och förslag till åtgärder</CheckItem>
        </FrameBox>
      }
    />

    <InfoBox title="Ledningens översyn">
      Ledningen ska regelbundet gå igenom resultaten av internrevisioner,
      rapporterade risker och hantering av incidenter. DSO:s rapport till
      ledningen är ett centralt underlag för denna översyn.
    </InfoBox>

    <QuizBlock
      id="quiz-11"
      isDone={isDone}
      onComplete={onComplete}
      questions={[
        {
          id: 'q11-1',
          question_text: 'Hur ofta bör registerförteckningen granskas?',
          question_type: 'single_choice',
          question_order: 1,
          options: { choices: [
            'En gång vid implementering, sedan aldrig',
            'Minst en gång per år och vid förändringar i behandlingarna',
            'Enbart när IMY begär det',
            'Vart femte år',
          ]},
          correct_answer: 'Minst en gång per år och vid förändringar i behandlingarna',
          explanation: 'Registerförteckningen ska alltid spegla de faktiska behandlingarna — den bör ses över minst årligen och uppdateras när nya behandlingar tillkommer eller befintliga förändras.',
          points: 100,
        },
      ]}
    />
  </SlideB>
);

// ══════════════════════════════════════════════════════════
// AVSNITT 12 — SAMMANFATTNING OCH AVSLUT (SlideH)
// ══════════════════════════════════════════════════════════
const Slide12Avslut = ({
  isDone,
  onDiploma,
}: {
  isDone: boolean;
  onDiploma: () => void;
}) => (
  <SlideH
    bild={B1}
    bildBg="#F0F8F0"
    badge="Avsnitt 12 · Sammanfattning"
    title="Du är redo att ta <span style='color:#FF5421'>rollen som DSO</span>"
    ingress="Grattis — du har genomfört utbildningen för dataskyddsombud. Här är en sammanfattning av dina viktigaste arbetsuppgifter."
    punkter={[
      '<strong>Rådge och informera</strong> — Håll dig uppdaterad och vägled organisationen i dataskyddsfrågor.',
      '<strong>Övervaka</strong> — Säkerställ att GDPR följs och genomför regelbundna internrevisioner.',
      '<strong>Dokumentera</strong> — Registerförteckning, dataskyddspolicy och DPIA:er ska vara aktuella.',
      '<strong>Hantera incidenter</strong> — Bistå vid riskbedömning och säkerställ korrekt rapportering inom 72 timmar.',
      '<strong>Rapportera till ledningen</strong> — Ge regelbundna rapporter om dataskyddsarbetets status.',
      '<strong>Följ AI-utvecklingen</strong> — AI-förordningen och GDPR ställer nya krav — håll dig à jour.',
    ]}
    knappText={isDone ? 'Hämta kursbevis' : undefined}
    onKnapp={isDone ? onDiploma : undefined}
  />
);

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleDataskyddsombud: React.FC = () => {
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
    'quiz-02','quiz-03','quiz-04','quiz-06',
    'quiz-07','quiz-08','quiz-09','quiz-10','quiz-11',
  ].every(id => completedLessons.has(id));

  const slides = [
    {
      id: 'intro',
      title: 'Välkommen',
      component: <SlideIntro onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'avsnitt-01',
      title: '01 · Introduktion',
      component: <Slide01Intro />,
    },
    {
      id: 'avsnitt-02',
      title: '02 · Roll och ansvar',
      component: (
        <Slide02Roll
          isDone={completedLessons.has('quiz-02')}
          onComplete={() => handleComplete('quiz-02')}
        />
      ),
    },
    {
      id: 'avsnitt-03',
      title: '03 · Ansvarsskyldighet',
      component: (
        <Slide03Ansvar
          isDone={completedLessons.has('quiz-03')}
          onComplete={() => handleComplete('quiz-03')}
        />
      ),
    },
    {
      id: 'avsnitt-04',
      title: '04 · Dokumentation',
      component: (
        <Slide04Dokumentation
          isDone={completedLessons.has('quiz-04')}
          onComplete={() => handleComplete('quiz-04')}
        />
      ),
    },
    {
      id: 'avsnitt-05',
      title: '05 · Biträdesavtal',
      component: <Slide05Bitradsavtal />,
    },
    {
      id: 'avsnitt-06',
      title: '06 · Internationellt',
      component: (
        <Slide06Internationellt
          isDone={completedLessons.has('quiz-06')}
          onComplete={() => handleComplete('quiz-06')}
        />
      ),
    },
    {
      id: 'avsnitt-06b',
      title: '06 · Fördjupning',
      component: (
        <Slide06bInternationellt
          isDone={completedLessons.has('quiz-06')}
          onComplete={() => handleComplete('quiz-06')}
        />
      ),
    },
    {
      id: 'avsnitt-07',
      title: '07 · Informationssäkerhet',
      component: (
        <Slide07Sakerhet
          isDone={completedLessons.has('quiz-07')}
          onComplete={() => handleComplete('quiz-07')}
        />
      ),
    },
    {
      id: 'avsnitt-08',
      title: '08 · AI och dataskydd',
      component: (
        <Slide08AI
          isDone={completedLessons.has('quiz-08')}
          onComplete={() => handleComplete('quiz-08')}
        />
      ),
    },
    {
      id: 'avsnitt-09',
      title: '09 · Konsekvensbedömning',
      component: (
        <Slide09DPIA
          isDone={completedLessons.has('quiz-09')}
          onComplete={() => handleComplete('quiz-09')}
        />
      ),
    },
    {
      id: 'avsnitt-10',
      title: '10 · Incidenthantering',
      component: (
        <Slide10Incident
          isDone={completedLessons.has('quiz-10')}
          onComplete={() => handleComplete('quiz-10')}
        />
      ),
    },
    {
      id: 'avsnitt-11',
      title: '11 · Övervakning',
      component: (
        <Slide11Revision
          isDone={completedLessons.has('quiz-11')}
          onComplete={() => handleComplete('quiz-11')}
        />
      ),
    },
    {
      id: 'avsnitt-12',
      title: '🏆 Sammanfattning',
      component: (
        <Slide12Avslut
          isDone={allDone}
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
        courseTitle="Dataskyddsombud"
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
        faqs={MODULE_FAQ}
        title="Frågor om GDPR och DSO-rollen"
        subtitle="Vanliga frågor från dataskyddsombud"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleDataskyddsombud;