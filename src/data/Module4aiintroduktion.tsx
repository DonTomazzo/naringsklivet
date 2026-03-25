// ============================================================
// src/pages/modules/Naringsklivet/Module4AiIntroduktion.tsx
//
// AI i ditt yrke – Introduktionskurs
// Näringsklivet · AI-träningsprogrammet
//
// Arkitektur: samma som Module2Arsredovisning / Module3Gdpr
//   - slides[] array – varje slide = ett React-element
//   - ModuleSlideLayout hanterar navigation + transition
//   - CourseHeader med slideProgress
//   - GlobalSidebar + FloatingFAQ
//   - QuizWidget på dedikerade quiz-slides
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Zap, MessageSquare, Shield, BarChart2,
  Users, FileText, Bot, Sparkles, Globe,
  ChevronRight, CheckCircle, AlertTriangle, Lock,
  Lightbulb, Target, TrendingUp, Code2,
} from 'lucide-react';

import CourseHeader      from '../../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../../components/GlobalSidebar';
import FloatingFAQ       from '../../../components/CourseElements/FloatingFAQ';
import AudioPlayer       from '../../../components/AudioPlayer';
import ModuleSlideLayout from '../../../components/CourseElements/ModuleSlideLayout';
import QuizWidget        from '../../../components/QuizWidget';

// ── Framtida interaktiva komponenter (skapa separat) ────────
// import PromptBuilderSection   from '../../../components/CourseElements/Ai/PromptBuilderSection';
// import AiToolCompareSection   from '../../../components/CourseElements/Ai/AiToolCompareSection';
// import RolePickerSection      from '../../../components/CourseElements/Ai/RolePickerSection';
// import HallucinationDemoSection from '../../../components/CourseElements/Ai/HallucinationDemoSection';
// import EthicsScenarioSection  from '../../../components/CourseElements/Ai/EthicsScenarioSection';
// import AutomationFlowSection  from '../../../components/CourseElements/Ai/AutomationFlowSection';

// ── Quiz-data (skapa i data/quiz/ai-introduktion-quiz.ts) ───
// import { aiIntroduktionQuiz } from '../../../data/quiz/ai-introduktion-quiz';

// ─────────────────────────────────────────────────────────────
// TYPER
// ─────────────────────────────────────────────────────────────
interface UserData {
  name: string;
  avatar?: string;
}

// ─────────────────────────────────────────────────────────────
// DELADE STILKOMPONENTER
// Återanvänd samma mönster som i Module2 / Module3
// ─────────────────────────────────────────────────────────────

/** Vit slide-wrapper med padding och max-bredd */
const SlideShell = ({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`min-h-full flex flex-col ${
      dark ? 'bg-[#171f32] text-white' : 'bg-white text-[#334155]'
    }`}
  >
    <div className="max-w-3xl mx-auto w-full px-6 py-10 flex flex-col gap-6">
      {children}
    </div>
  </div>
);

/** Orange sektion-label */
const SectionLabel = ({ text }: { text: string }) => (
  <p className="text-[11px] font-bold tracking-widest text-[#FF5421] uppercase">
    {text}
  </p>
);

/** Stor slide-rubrik */
const SlideH1 = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <h1
    className={`text-3xl md:text-4xl font-bold leading-tight ${
      light ? 'text-white' : 'text-[#171f32]'
    }`}
  >
    {children}
  </h1>
);

/** Mellanstor rubrik */
const SlideH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-[#171f32]">{children}</h2>
);

/** Brödtext */
const BodyText = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <p
    className={`text-base leading-relaxed ${
      light ? 'text-[#94a3b8]' : 'text-[#334155]'
    }`}
  >
    {children}
  </p>
);

/** Informationsruta med accentlinje */
const InfoBox = ({
  title,
  children,
  accent = '#FF5421',
  bg = '#FFF3EF',
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
  bg?: string;
}) => (
  <div
    className="rounded-lg p-5"
    style={{ background: bg, borderTop: `2.5px solid ${accent}` }}
  >
    <p
      className="text-[10px] font-bold tracking-widest mb-2 uppercase"
      style={{ color: accent }}
    >
      {title}
    </p>
    <div className="text-sm text-[#334155] leading-relaxed">{children}</div>
  </div>
);

/** Numrerat kort med orange badge */
const NumberedCard = ({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) => (
  <div className="flex gap-4 bg-[#F0EFEC] rounded-lg p-4">
    <div className="shrink-0 w-9 h-9 rounded-md bg-[#FF5421] flex items-center justify-center">
      <span className="text-white font-bold text-sm">{num}</span>
    </div>
    <div>
      <p className="font-semibold text-[#171f32] text-sm mb-1">{title}</p>
      <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
    </div>
  </div>
);

/** Check-rad */
const CheckRow = ({ text }: { text: string }) => (
  <div className="flex gap-3 items-start">
    <CheckCircle size={16} className="text-[#FF5421] shrink-0 mt-0.5" />
    <span className="text-sm text-[#334155] leading-relaxed">{text}</span>
  </div>
);

/** Begreppskort med symbol */
const ConceptCard = ({
  symbol,
  term,
  desc,
  example,
}: {
  symbol: React.ReactNode;
  term: string;
  desc: string;
  example: string;
}) => (
  <div className="bg-[#F0EFEC] rounded-lg p-4 border-t-2 border-[#FF5421]">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-[#FF5421]">{symbol}</div>
      <p className="font-bold text-[#171f32] text-sm">{term}</p>
    </div>
    <p className="text-xs text-[#64748b] leading-relaxed mb-2">{desc}</p>
    <p className="text-xs text-[#FF5421] italic">
      Exempel: {example}
    </p>
  </div>
);

/** Yrkesrollskort */
const RoleCard = ({
  emoji,
  title,
  tasks,
  promptEx,
}: {
  emoji: string;
  title: string;
  tasks: string[];
  promptEx: string;
}) => (
  <div className="bg-white border border-[#E2E1DC] rounded-lg p-4 border-t-2 border-t-[#FF5421]">
    <p className="font-bold text-[#171f32] text-sm mb-3">
      {emoji} {title}
    </p>
    <div className="flex flex-col gap-1.5 mb-3">
      {tasks.map((t, i) => (
        <div key={i} className="flex gap-2 items-start">
          <ChevronRight size={12} className="text-[#FF5421] shrink-0 mt-0.5" />
          <span className="text-xs text-[#334155]">{t}</span>
        </div>
      ))}
    </div>
    <div className="bg-[#F0F9FF] rounded p-2.5 border-l-2 border-[#3B82F6]">
      <p className="text-[10px] font-bold text-[#3B82F6] mb-1">EXEMPEL-PROMPT</p>
      <p className="text-xs text-[#334155] italic">"{promptEx}"</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Behöver jag ha teknisk bakgrund för att lära mig AI?',
    answer:
      'Nej. Den här kursen kräver inga förkunskaper. Du behöver inte förstå hur AI byggs – du behöver förstå hur du använder det effektivt i din yrkesroll.',
  },
  {
    question: 'Vad är skillnaden mellan ChatGPT och Copilot?',
    answer:
      'ChatGPT är OpenAIs fristående chattgränssnitt. Copilot är Microsofts AI-assistent som är integrerad i Office 365 (Word, Excel, Outlook, Teams). Om du jobbar i Microsofts ekosystem är Copilot ofta mer praktisk.',
  },
  {
    question: 'Är det säkert att använda AI på jobbet?',
    answer:
      'Det beror på vilket verktyg och vilken data. Klistra aldrig in personuppgifter, affärshemligheter eller känslig kunddata i publika AI-tjänster. Kontrollera er organisations AI-policy och välj enterprise-versioner för känslig data.',
  },
  {
    question: 'Vad är en hallucination i AI-sammanhang?',
    answer:
      'En hallucination är när AI-modellen genererar information som låter trovärdig men är fel eller fabricerad. AI vet inte att den har fel – det är därför du alltid måste källkontrollera viktig information.',
  },
  {
    question: 'Kan AI ta mitt jobb?',
    answer:
      'AI ersätter uppgifter, inte roller. Den är bäst på repetitiva, väldefinierade uppgifter. Yrkesroller som kräver omdöme, relationer och kreativitet förstärks av AI snarare än ersätts. Den som lär sig använda AI i sin roll är mer konkurrenskraftig.',
  },
  {
    question: 'Hur skriver jag en bra prompt?',
    answer:
      'Ge kontext (vem du är och i vilket sammanhang), specificera vad du vill ha, ange format och ton, och be om alternativ om du är osäker. CO-STAR-ramverket är ett bra verktyg – det gås igenom i detalj i modul 3.',
  },
];

// ─────────────────────────────────────────────────────────────
// SLIDES – en per logisk enhet
// ─────────────────────────────────────────────────────────────
// TODO: Ersätt kommenterade interaktiva komponenter med
// faktiska importer när komponenterna är byggda.
//
// KONVENTION:
//   - Slide 0  = Intro (mörk, ingen header)
//   - Slide 1+ = Innehåll (ljus, med header)
//   - Quiz-slides = <QuizWidget quiz={...} />
//   - Interaktiva = fullskärmskomponenter utan SlideShell
// ─────────────────────────────────────────────────────────────

const slides = [

  // ── MODUL 1: Introduktion ──────────────────────────────────

  // Slide 0 – Intro / Mörk välkomstslide
  // TODO: Lägg till AudioPlayer med narratorscript när voiceover är inspelad
  <SlideShell key="intro" dark>
    <div className="flex flex-col gap-4 py-6">
      <SectionLabel text="AI-träningsprogrammet · Modul 1" />
      <SlideH1 light>
        AI i ditt yrke –{' '}
        <span className="text-[#FF5421]">introduktionen</span>
      </SlideH1>
      <BodyText light>
        Välkommen. Den här modulen ger dig grunderna du behöver för att
        förstå vad AI faktiskt är, hur det fungerar och hur du börjar
        använda det i din yrkesroll – oavsett bakgrund.
      </BodyText>
      <div className="flex flex-col gap-2 mt-2">
        {[
          'Förstå AI-begreppen utan teknisk jargong',
          'Se hur AI används i din specifika yrkesroll',
          'Skriva din första effektiva prompt',
          'Veta vad du aldrig ska klistra in i ett AI-verktyg',
        ].map((item, i) => (
          <CheckRow key={i} text={item} />
        ))}
      </div>
      {/* <AudioPlayer src="/audio/module4/intro.mp3" /> */}
    </div>
  </SlideShell>,

  // Slide 1 – Vad är AI? (begrepp)
  <SlideShell key="vad-ar-ai">
    <SectionLabel text="Modul 1 · Grundläggande begrepp" />
    <SlideH1>Vad är AI – egentligen?</SlideH1>
    <BodyText>
      AI är ett samlingsbegrepp för system som kan utföra uppgifter som
      traditionellt kräver mänsklig intelligens. Inte ett enda system –
      utan en familj av tekniker. Här är de sex begrepp du behöver känna till.
    </BodyText>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ConceptCard
        symbol={<Brain size={16} />}
        term="AI – Artificiell intelligens"
        desc="Samlingsbegrepp för system som efterliknar mänskligt tänkande: förstå språk, känna igen mönster, fatta beslut."
        example="ChatGPT, Gemini, Copilot är alla AI-system."
      />
      <ConceptCard
        symbol={<Zap size={16} />}
        term="Maskininlärning (ML)"
        desc="AI som lär sig mönster från stora mängder data istället för att programmeras med explicita regler."
        example="Spamfilter lär sig skilja skräppost från riktig post."
      />
      <ConceptCard
        symbol={<MessageSquare size={16} />}
        term="Stor språkmodell (LLM)"
        desc="Modell tränad på enorma textmängder som kan generera, sammanfatta och bearbeta språk med hög kvalitet."
        example="'Skriv ett mejl till kunden om leveransförseningen.'"
      />
      <ConceptCard
        symbol={<Sparkles size={16} />}
        term="Generativ AI"
        desc="AI som skapar nytt innehåll – text, bilder, kod, ljud – snarare än bara analyserar befintligt."
        example="Skapa en bildpresentation, skriv ett blogginlägg."
      />
      <ConceptCard
        symbol={<FileText size={16} />}
        term="Prompt"
        desc="Den instruktion du ger AI-modellen. Kvaliteten på din prompt avgör nästan alltid kvaliteten på svaret."
        example="'Förklara hållbarhet för en 12-åring i tre meningar.'"
      />
      <ConceptCard
        symbol={<AlertTriangle size={16} />}
        term="Hallucination"
        desc="När AI genererar information som låter trovärdig men är fel. Alltid ett skäl att källkontrollera viktiga påståenden."
        example="AI anger fel datum, person eller statistik med stor självförtroende."
      />
    </div>
    <InfoBox title="VARFÖR SPELAR BEGREPPEN ROLL?" accent="#FF5421">
      Du behöver inte vara ingenjör – men om du förstår grundbegreppen
      kan du använda AI smartare, undvika fällorna och förklara för
      kollegor och kunder varför ett AI-svar ibland är fel.
    </InfoBox>
  </SlideShell>,

  // Slide 2 – Hur fungerar en LLM? (5 steg)
  <SlideShell key="hur-fungerar-llm">
    <SectionLabel text="Modul 1 · Hur det fungerar" />
    <SlideH1>Från prompt till svar – fem steg</SlideH1>
    <BodyText>
      Du behöver inte förstå matematiken – men det hjälper att veta
      vad som faktiskt händer när du skickar en prompt.
    </BodyText>
    <div className="flex flex-col gap-3">
      <NumberedCard
        num="1"
        title="Du skriver en prompt"
        desc="Din text skickas till modellen. Den ser hela din konversationshistorik i samma 'kontext'."
      />
      <NumberedCard
        num="2"
        title="Tokenisering"
        desc="Din text bryts ned i tokens – ungefär ord eller delar av ord. GPT-4 kan hantera ~128 000 tokens åt gången."
      />
      <NumberedCard
        num="3"
        title="Sannolikhetsberäkning"
        desc="Modellen förutsäger vilket token som med störst sannolikhet ska komma härnäst. Den 'väljer' inte – den beräknar."
      />
      <NumberedCard
        num="4"
        title="Svar genereras token för token"
        desc="Det är därför svaret skrivs ut i realtid – modellen genererar ett token i taget, inte hela texten på en gång."
      />
      <NumberedCard
        num="5"
        title="Kontextfönstret"
        desc="Allt i samma konversation ryms i kontextfönstret. Startar du ett nytt fönster börjar modellen om från noll."
      />
    </div>
    <InfoBox title="AI MINNS INTE" accent="#F59E0B" bg="#FFFBEB">
      Varje ny konversation börjar från noll. Vill du att AI ska känna
      till din roll, ditt projekt eller din stil – berätta det i varje
      ny session. Spara dina bästa systeminstruktioner som mallar.
    </InfoBox>
  </SlideShell>,

  // ── MODUL 2: AI-verktyg ───────────────────────────────────

  // Slide 3 – AI-verktyg & jämförelse
  <SlideShell key="ai-verktyg">
    <SectionLabel text="Modul 2 · AI-verktygen" />
    <SlideH1>De viktigaste verktygen – och när du väljer vilket</SlideH1>
    <BodyText>
      Du behöver inte välja ett verktyg. De flesta yrkesanvändare
      kombinerar flera beroende på uppgift. Här är de fem du bör känna till.
    </BodyText>
    {/* TODO: Ersätt med <AiToolCompareSection /> när komponenten är byggd.
        Komponenten ska visa verktygen i ett interaktivt jämförelseläge
        där användaren kan klicka sig fram och se styrkor/svagheter. */}
    <div className="flex flex-col gap-3">
      {[
        {
          name: 'ChatGPT (OpenAI)',
          desc: 'Mest kända. GPT-4o hanterar text, bilder och kod. Excellent för skrivande, analys och brainstorming.',
          best: 'Generellt skrivande och analys',
        },
        {
          name: 'Copilot (Microsoft)',
          desc: 'Integrerat i Microsoft 365 – Word, Excel, Outlook, Teams. Bäst för yrkesanvändare i Microsofts ekosystem.',
          best: 'Office-miljö',
        },
        {
          name: 'Gemini (Google)',
          desc: 'Integrerat i Google Workspace. Bra på att söka och sammanfatta webbaserad information i realtid.',
          best: 'Google Workspace-användare',
        },
        {
          name: 'Claude (Anthropic)',
          desc: 'Utmärkt för långa dokument och nyanserade resonemang. Bra på att följa komplexa instruktioner.',
          best: 'Långa dokument och noggrann analys',
        },
        {
          name: 'Llama (Meta)',
          desc: 'Open source-modell som organisationer kan köra lokalt. Bra när data inte får lämna företaget.',
          best: 'Känslig data, intern deployment',
        },
      ].map((tool, i) => (
        <div
          key={i}
          className="bg-[#F0EFEC] rounded-lg p-4 border-l-4 border-[#FF5421]"
        >
          <div className="flex justify-between items-start gap-2 mb-1">
            <p className="font-bold text-[#171f32] text-sm">{tool.name}</p>
            <span className="text-[10px] bg-[#FF5421] text-white px-2 py-0.5 rounded-full shrink-0">
              Bäst för: {tool.best}
            </span>
          </div>
          <p className="text-xs text-[#64748b] leading-relaxed">{tool.desc}</p>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 3: Promptteknik ─────────────────────────────────

  // Slide 4 – CO-STAR-ramverket
  <SlideShell key="co-star">
    <SectionLabel text="Modul 3 · Promptteknik" />
    <SlideH1>CO-STAR – strukturerade prompts som ger resultat</SlideH1>
    <BodyText>
      CO-STAR är ett enkelt ramverk för att bygga prompts som faktiskt fungerar.
      Du behöver inte använda alla sex delar varje gång – men ju mer kontext
      du ger, desto bättre svar får du.
    </BodyText>
    <div className="flex flex-col gap-2">
      {[
        {
          letter: 'C',
          name: 'Kontext',
          desc: 'Berätta vem du är och i vilket sammanhang frågan ställs.',
          ex: 'Jag är marknadskoordinator på ett medelstort B2B-företag.',
        },
        {
          letter: 'O',
          name: 'Mål (Objective)',
          desc: 'Vad vill du att AI ska åstadkomma? Var specifik.',
          ex: 'Jag vill skriva ett nyhetsbrev till våra befintliga kunder.',
        },
        {
          letter: 'S',
          name: 'Stil',
          desc: 'Vilket tonläge och vilken stil passar mottagaren?',
          ex: 'Professionellt men varmt. Inte för formellt. Max 200 ord.',
        },
        {
          letter: 'T',
          name: 'Ton',
          desc: 'Känsla och attityd i texten.',
          ex: 'Entusiastisk, positiv och lösningsorienterad.',
        },
        {
          letter: 'A',
          name: 'Målgrupp (Audience)',
          desc: 'Vem läser? Vad kan de? Vad bryr de sig om?',
          ex: 'IT-chefer på medelstora företag, 35–55 år, tekniskt kunniga.',
        },
        {
          letter: 'R',
          name: 'Respons-format',
          desc: 'Hur ska svaret struktureras?',
          ex: 'Rubriker + tre stycken + en tydlig CTA i slutet.',
        },
      ].map((step, i) => (
        <div key={i} className="flex gap-3 bg-[#F0EFEC] rounded-lg p-3">
          <div className="shrink-0 w-8 h-8 rounded-md bg-[#FF5421] flex items-center justify-center">
            <span className="text-white font-bold text-sm">{step.letter}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[#171f32] text-sm">{step.name}</p>
            <p className="text-xs text-[#64748b] mt-0.5">{step.desc}</p>
            <p className="text-xs text-[#FF5421] italic mt-1">"{step.ex}"</p>
          </div>
        </div>
      ))}
    </div>
    <InfoBox title="KOMPLETT EXEMPEL" accent="#FF5421">
      <span className="italic text-xs leading-relaxed">
        "Jag är ekonomichef på ett tillverkningsföretag med 80 anställda.
        Förklara varför vi behöver investera i ett nytt ERP-system.
        Tydligt och faktabaserat, inga tekniska termer. Övertygande men inte säljigt.
        Målgrupp: styrelseledamöter utan IT-bakgrund.
        Format: tre punkter, max två meningar vardera."
      </span>
    </InfoBox>
  </SlideShell>,

  // Slide 5 – Interaktiv promptbyggare
  // TODO: Bygg PromptBuilderSection – låter användaren välja
  // CO-STAR-komponenter via dropdowns och genererar en komplett prompt
  <SlideShell key="prompt-builder-placeholder">
    <SectionLabel text="Modul 3 · Övning" />
    <SlideH1>Bygg din egen prompt</SlideH1>
    <BodyText>
      Öva på CO-STAR-ramverket med en interaktiv promptbyggare.
    </BodyText>
    <InfoBox title="🚧 INTERAKTIV KOMPONENT" accent="#3B82F6" bg="#EFF6FF">
      <p className="text-sm font-semibold text-[#1e3a5f] mb-2">
        PromptBuilderSection.tsx
      </p>
      <p className="text-xs text-[#334155] leading-relaxed">
        Användaren väljer: Yrkesroll · Uppgiftstyp · Målgrupp · Ton · Format.
        Komponenten genererar en komplett CO-STAR-prompt i realtid och
        låter användaren kopiera den eller skicka den direkt till ChatGPT.
      </p>
      <div className="mt-3 flex flex-col gap-1 text-xs text-[#64748b]">
        <span>→ Props: <code>roles</code>, <code>taskTypes</code>, <code>onGenerate</code></span>
        <span>→ State: CO-STAR-fälten + genererad prompt-sträng</span>
        <span>→ Output: Kopierings-knapp + länk till ChatGPT</span>
      </div>
    </InfoBox>
    {/* Platshållar-mockup */}
    <div className="bg-[#F0EFEC] rounded-xl p-6 flex flex-col gap-4 opacity-60 pointer-events-none select-none">
      <div className="grid grid-cols-2 gap-3">
        {['Yrkesroll', 'Typ av uppgift', 'Målgrupp', 'Tonläge'].map((label) => (
          <div key={label}>
            <p className="text-[10px] text-[#64748b] mb-1">{label}</p>
            <div className="h-9 bg-white rounded border border-[#E2E1DC]" />
          </div>
        ))}
      </div>
      <div className="h-24 bg-white rounded border border-[#E2E1DC] flex items-center justify-center">
        <p className="text-xs text-[#94a3b8]">Din genererade prompt visas här…</p>
      </div>
      <div className="h-10 bg-[#FF5421] rounded-lg opacity-40" />
    </div>
  </SlideShell>,

  // Slide 6 – Sex konkreta prompttips
  <SlideShell key="prompt-tips">
    <SectionLabel text="Modul 3 · Best practice" />
    <SlideH1>Sex prompttips som gör skillnad direkt</SlideH1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          title: 'Ge alltid kontext',
          desc: 'Istället för "Skriv ett mejl" – ge bakgrund, mottagare och syfte. AI är ett tomt blad utan din kontext.',
        },
        {
          title: 'Specificera format',
          desc: '"Max 150 ord", "Tre punkter", "Tabellformat". AI ger bättre svar när det vet hur svaret ska se ut.',
        },
        {
          title: 'Iterera och förfina',
          desc: 'Det bästa promptet är sällan det första. Bygg vidare: "Gör det kortare", "Mer formellt", "Lägg till ett exempel".',
        },
        {
          title: 'Ge exempel',
          desc: '"Skriv i samma stil som detta: [klistra in text]." Exempel är det kraftfullaste sättet att styra utskriften.',
        },
        {
          title: 'Be om alternativ',
          desc: '"Ge mig tre varianter" eller "Föreslå ett annat angreppssätt". AI är snabb på att brainstorma – utnyttja det.',
        },
        {
          title: 'Kontrollera alltid',
          desc: 'AI kan ha fel – särskilt om fakta, datum och citat. Kritiskt tänkande är inte valbart för en professionell AI-användare.',
        },
      ].map((tip, i) => (
        <div
          key={i}
          className="bg-white border border-[#E2E1DC] rounded-lg p-4 border-t-2 border-t-[#FF5421]"
        >
          <p className="font-bold text-[#171f32] text-sm mb-1">{tip.title}</p>
          <p className="text-xs text-[#64748b] leading-relaxed">{tip.desc}</p>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 4: AI i yrkesroller ─────────────────────────────

  // Slide 7 – Yrkesroller (del 1)
  // TODO: Ersätt med <RolePickerSection /> – interaktiv komponent där
  // användaren väljer sin roll och får anpassade tips + prompts
  <SlideShell key="yrkesroller-1">
    <SectionLabel text="Modul 4 · AI i din yrkesroll" />
    <SlideH1>Hitta din roll – och börja där</SlideH1>
    <BodyText>
      AI är inte ett verktyg för IT-avdelningen. Det är ett verktyg för alla.
      Här är konkreta användningsfall för tre vanliga yrkesroller.
    </BodyText>
    <div className="flex flex-col gap-4">
      <RoleCard
        emoji="📋"
        title="Administratör / koordinator"
        tasks={[
          'Sammanfatta långa mejlkonversationer på sekunder',
          'Skapa dagordningar och mötesprotokoll utifrån stödord',
          'Generera standardsvar för vanliga frågor',
        ]}
        promptEx="Sammanfatta dessa mötesanteckningar i tre åtgärdspunkter med ansvarig person och deadline."
      />
      <RoleCard
        emoji="💼"
        title="Säljare / affärsutvecklare"
        tasks={[
          'Skriv personliga uppföljningsmejl på halva tiden',
          'Researcha kunder och branscher inför möten',
          'Generera säljargument anpassade till kundens utmaningar',
        ]}
        promptEx="Jag ska träffa en inköpschef på ett logistikföretag. Ge mig tre öppningsfrågor som visar att jag förstår deras bransch."
      />
      <RoleCard
        emoji="📣"
        title="Marknadsförare / kommunikatör"
        tasks={[
          'Generera innehållsidéer för sociala medier i bulk',
          'Skriv om samma budskap i fem olika tonlägen',
          'Skapa SEO-optimerade metabeskrivningar',
        ]}
        promptEx="Skriv fem LinkedIn-inlägg om hållbarhet i [bransch], anpassade för beslutsfattare. Variera format: lista, personligt inlägg, fråga till publiken."
      />
    </div>
  </SlideShell>,

  // Slide 8 – Yrkesroller (del 2)
  <SlideShell key="yrkesroller-2">
    <SectionLabel text="Modul 4 · AI i din yrkesroll" />
    <SlideH2>Tre fler yrkesroller</SlideH2>
    <div className="flex flex-col gap-4">
      <RoleCard
        emoji="👥"
        title="HR & rekrytering"
        tasks={[
          'Skriv jobbannonser som attraherar rätt kandidater',
          'Generera strukturerade intervjufrågor per roll',
          'Utforma onboarding-material och välkomstbrev',
        ]}
        promptEx="Skriv en jobbannons för en senior redovisningsekonom. Tonläge: professionellt men personligt. Inkludera tre unika fördelar med att jobba hos oss: [klistra in fördelar]."
      />
      <RoleCard
        emoji="📊"
        title="Ekonom / analytiker"
        tasks={[
          'Förklara komplexa datamönster i klartext för ledningen',
          'Skriv kommentarer till budget- och prognosavvikelser',
          'Strukturera rapporter och sammanfattningar',
        ]}
        promptEx="Här är nyckeltal från vår senaste rapport: [klistra in]. Skriv en kortfattad ledningskommentar på 100 ord som lyfter de tre viktigaste punkterna."
      />
      <RoleCard
        emoji="💻"
        title="IT / tekniker / utvecklare"
        tasks={[
          'Debugga kod och få förklaringar på klarspråk',
          'Generera boilerplate-kod och testcase',
          'Skriv teknisk dokumentation för icke-tekniska läsare',
        ]}
        promptEx="Förklara vad den här koden gör på svenska, skriven för en projektledare utan programmeringskunskaper: [klistra in kod]."
      />
    </div>
    <InfoBox title="OAVSETT ROLL GÄLLER SAMMA GRUNDREGEL" accent="#FF5421">
      Börja med de uppgifter du gör ofta och som tar lång tid.
      Om du skriver samma typ av mejl, rapport eller dokument regelbundet
      – det är AI:ns bästa användningsområde.
    </InfoBox>
  </SlideShell>,

  // ── MODUL 5: GDPR, etik & säkerhet ───────────────────────

  // Slide 9 – GDPR & säkerhet
  <SlideShell key="gdpr-sakerhet">
    <SectionLabel text="Modul 5 · GDPR, etik & säkerhet" />
    <SlideH1>Vad du aldrig ska klistra in – och varför</SlideH1>
    <BodyText>
      Att använda AI professionellt kräver att du förstår var gränsen går.
      Fyra regler du alltid ska följa.
    </BodyText>
    <div className="flex flex-col gap-3">
      {[
        {
          num: '1',
          title: 'Aldrig personuppgifter',
          desc: 'Namn, personnummer, kontaktuppgifter, hälsodata eller annan identifierbar information om kunder, patienter eller anställda hör inte hemma i en publik AI-tjänst. Anonymisera alltid.',
        },
        {
          num: '2',
          title: 'Kontrollera er AI-policy',
          desc: 'Många organisationer har specifika riktlinjer för vilka AI-verktyg som är godkända. Om er policy saknas – lyft frågan till ledningen.',
        },
        {
          num: '3',
          title: 'Förstå var data lagras',
          desc: 'Data du matar in i ChatGPT kan lagras av OpenAI och användas för träning om du inte aktivt stängt av det. Läs villkoren.',
        },
        {
          num: '4',
          title: 'Enterprise-versioner för känslig data',
          desc: 'ChatGPT Enterprise, Microsoft 365 Copilot och liknande enterprise-lösningar lovar att inte använda er data för träning och erbjuder data residency i EU.',
        },
      ].map((r) => (
        <NumberedCard key={r.num} num={r.num} title={r.title} desc={r.desc} />
      ))}
    </div>
    <InfoBox title="TUMREGELN" accent="#FF5421">
      Om du inte skulle känna dig bekväm med att din chef såg exakt vad
      du klistrade in i AI-verktyget – klistra inte in det.
      Anonymisera, generalisera eller be om IT-avdelningens råd.
    </InfoBox>
  </SlideShell>,

  // Slide 10 – Etikscenario (interaktiv placeholder)
  // TODO: Bygg EthicsScenarioSection – visar ett dilemma och låter
  // användaren välja alternativ med förklaring efteråt
  <SlideShell key="etik-scenario">
    <SectionLabel text="Modul 5 · Övning" />
    <SlideH1>Etiska dilemman – vad väljer du?</SlideH1>
    <BodyText>
      Öva på att fatta rätt beslut när AI-användningen rör gränszoner.
    </BodyText>
    <InfoBox title="🚧 INTERAKTIV KOMPONENT" accent="#3B82F6" bg="#EFF6FF">
      <p className="text-sm font-semibold text-[#1e3a5f] mb-2">
        EthicsScenarioSection.tsx
      </p>
      <p className="text-xs text-[#334155] leading-relaxed">
        Presenterar 4–6 etikscenarier ett i taget. Användaren väljer ett
        av tre alternativ. Direkt feedback + förklaring visas.
        Poängsättning i slutet.
      </p>
      <div className="mt-3 flex flex-col gap-1 text-xs text-[#64748b]">
        <span>→ Data: <code>scenarios[]</code> med <code>question</code>, <code>options[]</code>, <code>correct</code>, <code>explanation</code></span>
        <span>→ State: currentScenario, selectedOption, showFeedback, score</span>
        <span>→ Transition: fade-slide mellan scenarierna</span>
      </div>
    </InfoBox>
    {/* Statisk förhandsvisning */}
    <div className="bg-[#F0EFEC] rounded-xl p-5 flex flex-col gap-4 opacity-60 pointer-events-none select-none">
      <div className="flex items-center gap-2 mb-1">
        <Shield size={14} className="text-[#FF5421]" />
        <span className="text-xs font-bold text-[#FF5421]">SCENARIO 1 AV 5</span>
      </div>
      <p className="text-sm font-semibold text-[#171f32]">
        "Din kollega ber dig klistra in ett kundavtal i ChatGPT för att
        sammanfatta det. Vad gör du?"
      </p>
      {['Klistrar in det – det är snabbt och praktiskt',
        'Anonymiserar avtalet innan jag klistrar in det',
        'Använder en enterprise-version med dataskydd'].map((opt, i) => (
        <div key={i} className="bg-white rounded-lg p-3 border border-[#E2E1DC] text-xs text-[#334155]">
          {String.fromCharCode(65 + i)}. {opt}
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 6: AI för skrivande & kommunikation ─────────────

  // Slide 11 – AI för skrivande
  <SlideShell key="ai-skrivande">
    <SectionLabel text="Modul 6 · AI för skrivande & kommunikation" />
    <SlideH1>AI som din skrivassistent</SlideH1>
    <BodyText>
      Skrivande är det område där AI ger störst tidsbesparing för de
      flesta yrkesroller. Här är de vanligaste användningsområdena och
      hur du gör dem rätt.
    </BodyText>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          type: 'E-post & mejl',
          tips: [
            'Beskriv syfte + mottagare + önskad ton',
            'Be om tre varianter i olika längd',
            'Ange om det är ett uppföljningsmejl eller cold outreach',
          ],
          ex: '"Skriv ett uppföljningsmejl till [roll] som visat intresse men inte svarat på 10 dagar. Vänlig men tydlig."',
        },
        {
          type: 'Rapporter & sammanfattningar',
          tips: [
            'Ge AI rå text – be om strukturerad version',
            'Ange målgrupp: ledning, styrelse, operativt team',
            'Be AI lyfta de tre viktigaste punkterna',
          ],
          ex: '"Sammanfatta den här rapporten i en executive summary på 150 ord för en styrelse utan teknisk bakgrund."',
        },
        {
          type: 'Presentationer & pitches',
          tips: [
            'Be AI om storyline-förslag innan du öppnar PowerPoint',
            'Använd AI för att generera talarnoter per slide',
            'Ber AI om invändningar du bör förbereda svar på',
          ],
          ex: '"Jag ska pitcha en investering på 2 mkr. Ge mig fem potentiella invändningar och korta svar på dem."',
        },
        {
          type: 'Sociala medier & content',
          tips: [
            'Generera 10 inlägg på en gång – välj ut bäst',
            'Be AI variera format: lista, fråga, personlig berättelse',
            'Ange plattform – LinkedIn, Instagram, X har olika nyanser',
          ],
          ex: '"Skriv fem LinkedIn-inlägg om [ämne] i tre varianter per inlägg: informerande, provocerande och personlig."',
        },
      ].map((item, i) => (
        <div key={i} className="bg-[#F0EFEC] rounded-lg p-4">
          <p className="font-bold text-[#171f32] text-sm mb-2 flex items-center gap-1.5">
            <FileText size={13} className="text-[#FF5421]" />
            {item.type}
          </p>
          <div className="flex flex-col gap-1 mb-3">
            {item.tips.map((tip, j) => (
              <div key={j} className="flex gap-2 items-start">
                <ChevronRight size={11} className="text-[#FF5421] shrink-0 mt-0.5" />
                <span className="text-xs text-[#334155]">{tip}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded p-2.5 border-l-2 border-[#FF5421]">
            <p className="text-xs text-[#64748b] italic">{item.ex}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 7: AI för data & analys ─────────────────────────

  // Slide 12 – AI för data & analys
  <SlideShell key="ai-data-analys">
    <SectionLabel text="Modul 7 · AI för data & analys" />
    <SlideH1>Förvandla siffror till insikter</SlideH1>
    <BodyText>
      AI är utmärkt på att hjälpa dig förstå och kommunicera data –
      även om du inte är analytiker. Här är tre konkreta användningsområden.
    </BodyText>
    <div className="flex flex-col gap-4">
      <NumberedCard
        num="1"
        title="Förklara data för en icke-teknisk publik"
        desc="Klistra in en tabell eller nyckeltal och be AI skriva en kortfattad ledningskommentar. Specificera målgrupp och maxlängd."
      />
      <NumberedCard
        num="2"
        title="Identifiera mönster och avvikelser"
        desc="Be AI analysera en dataserie och peka ut ovanliga avvikelser, trender eller samband. Perfekt som ett första filter innan djupare analys."
      />
      <NumberedCard
        num="3"
        title="Skapa visualiseringsförslag"
        desc="Ge AI din data och be om förslag på vilket diagram som bäst kommunicerar budskapet – stapeldiagram, linjediagram, scatter plot etc."
      />
      <NumberedCard
        num="4"
        title="Formler och beräkningar i Excel / Sheets"
        desc="Beskriv vad du vill beräkna på vanlig svenska. Be AI generera rätt formel. Fungerar utmärkt för XLOOKUP, pivottabeller och komplexa IF-satser."
      />
    </div>
    <InfoBox title="VIKTIGT: AI RÄKNAR INTE ALLTID RÄTT" accent="#F59E0B" bg="#FFFBEB">
      Stora språkmodeller är inte primärt byggda för matematik.
      Verifiera alltid beräkningar och nyckeltal mot källdata.
      Använd AI för att strukturera och kommunicera – inte som primär
      kalkylator för kritiska beslut.
    </InfoBox>
    {/* TODO: Lägg till ett interaktivt "Data-to-insight"-exempel
        där användaren klistrar in fiktiv data och ser AI:s analys */}
  </SlideShell>,

  // ── MODUL 8: Avancerad promptteknik ──────────────────────

  // Slide 13 – Avancerad promptteknik
  <SlideShell key="avancerad-prompt">
    <SectionLabel text="Modul 8 · Avancerad promptteknik" />
    <SlideH1>Nästa nivå – tekniker som proffs använder</SlideH1>
    <BodyText>
      När du bemästrat CO-STAR är du redo för nästa nivå.
      Dessa tekniker ger märkbart bättre resultat på komplexa uppgifter.
    </BodyText>
    <div className="flex flex-col gap-3">
      {[
        {
          tech: 'Chain-of-thought',
          desc: 'Be AI tänka högt steg för steg innan det ger ett svar. Minskar fel drastiskt på komplexa resonemang.',
          ex: '"Tänk igenom problemet steg för steg innan du ger ditt svar."',
        },
        {
          tech: 'Few-shot prompting',
          desc: 'Ge 2–3 exempel på hur du vill ha svaret. AI lär sig av exempelmönstret snarare än av instruktioner.',
          ex: '"Här är tre exempel på hur jag brukar skriva: [ex1], [ex2], [ex3]. Skriv nu ett fjärde i samma stil."',
        },
        {
          tech: 'Persona-prompting',
          desc: 'Ge AI en specifik roll att spela. Det aktiverar rätt kunskapsmönster och tonläge.',
          ex: '"Agera som en erfaren CFO och analysera följande budget…"',
        },
        {
          tech: 'Systeminstruktioner / Custom instructions',
          desc: 'Spara en fast bakgrundsinstruktion som gäller för alla dina konversationer. Sätter kontext, ton och begränsningar permanent.',
          ex: '"Du är min professionella skrivassistent. Jag jobbar som [roll]. Svara alltid på svenska. Var kortfattad."',
        },
        {
          tech: 'Iterativ förfining',
          desc: 'Bygg vidare på svaret i flera steg. AI kommer ihåg hela konversationen – utnyttja det för att finslipa output.',
          ex: '"Gör punkt 2 mer konkret. Lägg till ett exempel från [bransch]. Förkorta övriga stycken med 30%."',
        },
      ].map((item, i) => (
        <div key={i} className="bg-[#F0EFEC] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5421]" />
            <p className="font-bold text-[#171f32] text-sm">{item.tech}</p>
          </div>
          <p className="text-xs text-[#64748b] leading-relaxed mb-2">{item.desc}</p>
          <div className="bg-white rounded p-2 border-l-2 border-[#FF5421]">
            <p className="text-xs text-[#334155] italic">{item.ex}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 9: Automatisering & agenter ────────────────────

  // Slide 14 – Automatisering & AI-agenter
  // TODO: Bygg AutomationFlowSection – visar ett flödesschema
  // hur agenter kopplas ihop för att utföra flerstegsuppgifter
  <SlideShell key="automatisering-agenter">
    <SectionLabel text="Modul 9 · Automatisering & AI-agenter" />
    <SlideH1>Nästa steg: AI som gör jobbet åt dig</SlideH1>
    <BodyText>
      En AI-agent är ett system som kan utföra sekvenser av uppgifter
      självständigt – söka information, köra kod, fatta delbeslut – utan
      att du behöver guida varje steg. Här är vad du behöver förstå.
    </BodyText>
    <div className="flex flex-col gap-3">
      <NumberedCard
        num="1"
        title="Vad är en AI-agent?"
        desc="En agent har ett mål, kan använda verktyg (webssökning, kod, API:er) och planerar sina egna steg. ChatGPT med verktyg aktiverade, Copilot Agents och Microsoft Power Automate är exempel."
      />
      <NumberedCard
        num="2"
        title="Vanliga användningsfall"
        desc="Sammanfatta och svara på mejl automatiskt. Extrahera data ur dokument och fylla i kalkylblad. Bevaka nyheter och sammanfatta dagliga briefings. Generera rapporter från interna system."
      />
      <NumberedCard
        num="3"
        title="Verktyg att känna till"
        desc="Microsoft Copilot Studio, Zapier AI, Make (Integromat), n8n och Notion AI är exempel på plattformar för att bygga automatiserade AI-arbetsflöden utan kod."
      />
      <NumberedCard
        num="4"
        title="Var försiktig – granska agentens output"
        desc="Agenter kan göra fel – och felet kan sprida sig i flera steg. Inför alltid en mänsklig godkännandesekvens för kritiska beslut och granska output regelbundet."
      />
    </div>
    <InfoBox title="🚧 INTERAKTIV KOMPONENT" accent="#3B82F6" bg="#EFF6FF">
      <p className="text-sm font-semibold text-[#1e3a5f] mb-1">
        AutomationFlowSection.tsx
      </p>
      <p className="text-xs text-[#334155]">
        Klickbart flödesschema som visar hur en AI-agent hanterar en komplex uppgift
        steg för steg. Användaren klickar sig igenom varje beslutspunkt.
      </p>
    </InfoBox>
  </SlideShell>,

  // ── MODUL 10: Praktiska övningar ──────────────────────────

  // Slide 15 – Praktisk övning: 30-dagars startplan
  <SlideShell key="praktiska-ovningar">
    <SectionLabel text="Modul 10 · Praktiska övningar & case" />
    <SlideH1>Din 30-dagars AI-startplan</SlideH1>
    <BodyText>
      Kompetens byggs genom systematisk övning – inte genom att titta på
      en demo en gång. Den här planen ger dig ett konkret upplägg.
    </BodyText>
    <div className="flex flex-col gap-3">
      {[
        {
          period: 'Dag 1–3',
          title: 'Välj ett verktyg och prova tre uppgifter',
          desc: 'Skapa konto på ChatGPT, Claude eller Copilot. Prova tre uppgifter du gör varje dag – sammanfatta ett mejl, skriv ett utkast, ställ en fråga. Sänk ribban – det handlar om att komma igång.',
        },
        {
          period: 'Dag 4–7',
          title: 'Öva CO-STAR på fem olika uppgifter',
          desc: 'Använd CO-STAR-ramverket på minst fem uppgifter. Iterera på varje svar – be AI förbättra, förkorta eller byta ton. Spara de bästa promptsen.',
        },
        {
          period: 'Vecka 2',
          title: 'Hitta din "bästa uppgift" och bygg en mall',
          desc: 'Identifiera en uppgift du gör minst en gång per vecka. Bygg en återanvändbar prompt-mall som fungerar direkt nästa gång.',
        },
        {
          period: 'Vecka 3–4',
          title: 'Dela med en kollega',
          desc: 'Visa en kollega vad du lärt dig. Utbyt prompt-mallar. Kollegor hittar användningsfall du inte tänkt på. Lär i grupp – det ger 3× effekten.',
        },
        {
          period: 'Löpande',
          title: 'Håll dig uppdaterad',
          desc: 'AI-landskapet förändras snabbt. Följ Näringsklivets uppdateringar – kursen uppdateras löpande med nya verktyg och tekniker.',
        },
      ].map((step, i) => (
        <div key={i} className="flex gap-3 bg-[#F0EFEC] rounded-lg p-4">
          <div className="shrink-0">
            <span className="text-[10px] font-bold text-white bg-[#FF5421] px-2 py-1 rounded-full whitespace-nowrap">
              {step.period}
            </span>
          </div>
          <div>
            <p className="font-bold text-[#171f32] text-sm mb-1">{step.title}</p>
            <p className="text-xs text-[#64748b] leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 11: Framtidens AI ───────────────────────────────

  // Slide 16 – Trender & omvärld
  <SlideShell key="framtidens-ai">
    <SectionLabel text="Modul 11 · Framtidens AI – trender & omvärld" />
    <SlideH1>Vad händer härnäst?</SlideH1>
    <BodyText>
      AI-landskapet förändras snabbare än något annat teknikskifte i modern tid.
      Dessa trender är viktiga att känna till – de påverkar hur du arbetar
      inom 12–24 månader.
    </BodyText>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          icon: <Bot size={15} />,
          trend: 'Multimodal AI',
          desc: 'AI som hanterar text, bilder, ljud och video i samma konversation. GPT-4o och Gemini Ultra är tidiga exempel. Snart standard.',
        },
        {
          icon: <Zap size={15} />,
          trend: 'AI-agenter i arbetsflöden',
          desc: 'Agenter som självständigt hanterar komplexa flerstegsuppgifter. Automatisering av kunskapsarbete ökar kraftigt.',
        },
        {
          icon: <Code2 size={15} />,
          trend: 'AI för kodgenerering',
          desc: 'GitHub Copilot och liknande verktyg skriver redan 30–40% av koden i många team. Påverkar IT-roller och alla som jobbar med data.',
        },
        {
          icon: <Globe size={15} />,
          trend: 'Reglering & EU AI Act',
          desc: 'EU:s AI-förordning (AI Act) ställer krav på transparens och riskklassificering. Påverkar hur organisationer får använda AI.',
        },
        {
          icon: <TrendingUp size={15} />,
          trend: 'Personliga AI-assistenter',
          desc: 'AI-assistenter som känner till din roll, dina preferenser och din historia. Börjar rulla ut i Microsoft 365 och Google Workspace.',
        },
        {
          icon: <Lightbulb size={15} />,
          trend: 'Lokala modeller',
          desc: 'Mindre, kraftfulla modeller som körs lokalt utan internetanslutning. Löser GDPR- och dataskyddsproblem för känsliga branscher.',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[#F0EFEC] rounded-lg p-4 border-t-2 border-[#FF5421]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="text-[#FF5421]">{item.icon}</div>
            <p className="font-bold text-[#171f32] text-sm">{item.trend}</p>
          </div>
          <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </SlideShell>,

  // ── MODUL 12: Quiz + Avslutning ───────────────────────────

  // Slide 17 – Quiz
  // TODO: Skapa data/quiz/ai-introduktion-quiz.ts med 10–12 frågor
  // som täcker grundbegrepp, promptteknik, GDPR och verktyg
  <div key="quiz" className="min-h-full flex flex-col bg-white">
    <div className="max-w-3xl mx-auto w-full px-6 py-10">
      <SectionLabel text="Modul 12 · Kunskapskontroll" />
      <SlideH1>Testa dina kunskaper</SlideH1>
      {/* <QuizWidget quiz={aiIntroduktionQuiz} /> */}
      <InfoBox title="🚧 QUIZ-KOMPONENT" accent="#3B82F6" bg="#EFF6FF">
        <p className="text-sm font-semibold text-[#1e3a5f] mb-2">
          Skapa: data/quiz/ai-introduktion-quiz.ts
        </p>
        <p className="text-xs text-[#334155] leading-relaxed mb-3">
          Quizet ska innehålla 10–12 frågor fördelade på:
        </p>
        <div className="flex flex-col gap-1 text-xs text-[#64748b]">
          <span>→ 3 frågor: Grundläggande AI-begrepp (vad är LLM, hallucination, token)</span>
          <span>→ 2 frågor: CO-STAR och promptteknik</span>
          <span>→ 2 frågor: GDPR och vad som aldrig får klistras in</span>
          <span>→ 2 frågor: AI-verktyg och när du väljer vilket</span>
          <span>→ 2 frågor: Etik och källkritik</span>
          <span>→ 1 fråga: Framtidens AI / agenter</span>
        </div>
      </InfoBox>
    </div>
  </div>,

  // Slide 18 – Avslutning / Certifikat-slide
  <SlideShell key="avslutning" dark>
    <div className="flex flex-col gap-5 py-6 items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#FF5421] flex items-center justify-center">
        <CheckCircle size={32} className="text-white" />
      </div>
      <SectionLabel text="Modul 1 · Klar" />
      <SlideH1 light>
        Bra jobbat – du är{' '}
        <span className="text-[#FF5421]">redo att använda AI</span>
      </SlideH1>
      <BodyText light>
        Du har gått igenom introduktionskursen i AI för anställda.
        Du känner nu till grundbegreppen, verktygen och hur du börjar
        använda AI i din yrkesroll – på ett säkert och effektivt sätt.
      </BodyText>
      <div className="bg-[#1e2a42] rounded-xl p-6 w-full text-left">
        <p className="text-[11px] font-bold tracking-widest text-[#FF5421] mb-3">
          NÄSTA STEG I PROGRAMMET
        </p>
        <div className="flex flex-col gap-2">
          {[
            'Modul 2 – Avancerad promptteknik & CO-STAR i praktiken',
            'Modul 3 – AI för din specifika yrkesroll (fördjupning)',
            'Modul 4 – Automatisering och AI-agenter',
            'Modul 5 – GDPR, juridik och AI-policy',
          ].map((m, i) => (
            <div key={i} className="flex gap-2 items-center">
              <ChevronRight size={12} className="text-[#FF5421] shrink-0" />
              <span className="text-xs text-[#94a3b8]">{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 mt-2">
        <p className="text-xs text-[#64748b]">Näringsklivet · AI-träningsprogrammet</p>
        <p className="text-xs font-bold text-[#FF5421]">näringsklivet.se</p>
      </div>
    </div>
  </SlideShell>,
];

// ─────────────────────────────────────────────────────────────
// HUVUDKOMPONENT
// ─────────────────────────────────────────────────────────────
const Module4AiIntroduktion: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // TODO: Hämta userData från auth-context / user store
  const userData: UserData = {
    name: 'Användare',
    avatar: undefined,
  };

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#171f32]">
      {/* Sidebar */}
      <GlobalSidebar />

      {/* Innehållsyta */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header med slideProgress */}
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{
            current: currentIndex,
            total: slides.length,
          }}
        />

        {/* Slide-layout */}
        <ModuleSlideLayout
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          showHeader={currentIndex > 0}
        >
          {slides[currentIndex]}
        </ModuleSlideLayout>
      </div>

      {/* Flytande FAQ */}
      <FloatingFAQ
        faqs={MODULE_FAQ}
        title="Vanliga frågor om AI"
        subtitle="Svar på de vanligaste frågorna från kursdeltagare"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default Module4AiIntroduktion;

// ─────────────────────────────────────────────────────────────
// KOMPONENT-TODO-LISTA (interaktiva slides)
// ─────────────────────────────────────────────────────────────
//
// Prioritet 1 (blockerar kursstart):
//   □ data/quiz/ai-introduktion-quiz.ts           – 10–12 frågor
//   □ Aktivera QuizWidget på slide 17
//
// Prioritet 2 (förbättrar upplevelsen):
//   □ PromptBuilderSection.tsx                    – Slide 5
//       Interaktiv CO-STAR-promptbyggare
//   □ EthicsScenarioSection.tsx                   – Slide 10
//       Flervalsfrågor med etikscenarion
//
// Prioritet 3 (framtida moduler):
//   □ AiToolCompareSection.tsx                    – Slide 3
//       Interaktiv jämförelse av AI-verktyg
//   □ RolePickerSection.tsx                       – Slide 7–8
//       Välj din roll, få anpassade tips & prompts
//   □ AutomationFlowSection.tsx                   – Slide 14
//       Klickbart flödesschema för AI-agenter
//
// Voiceover (ElevenLabs):
//   □ /audio/module4/intro.mp3                    – Slide 0
//   □ /audio/module4/begrepp.mp3                  – Slide 1
//   □ /audio/module4/gdpr.mp3                     – Slide 9
//
// ─────────────────────────────────────────────────────────────