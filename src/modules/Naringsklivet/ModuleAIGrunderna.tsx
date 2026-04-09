// src/modules/Naringsklivet/ModuleAIGrunderna.tsx
// Modul: AI i arbetslivet – verktyg, promptteknik och praktisk användning
// Stil: Bakgrundsbilder, vita rubriker, klickbara cirklar, InlineQuiz, slutquiz
// Matchar: ModuleStyrelsenArbete.tsx – exakt samma komponentstruktur

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, MessageSquare, Zap, Search,
  Shield, HelpCircle, Award, BarChart2, CheckCircle, X, Layers
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide  from '../../components/CourseElements/ModuleIntroSlide';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';
import SverigeAISlide   from './slides/SverigeAISlide';
import AIJobbenSlide    from './slides/AIJobbenSlide';
import BedrageriSlide   from './slides/BedrageriSlide';
import KallkritikSlide  from './slides/KallkritikSlide';
import CoStarSlide        from './slides/CoStarSlide';
import CoStarPraktikSlide from './slides/CoStarPraktikSlide';
import OvrigaRamverkSlide from './slides/OvrigaRamverkSlide';
import AIHistoriaSlide from './slides/AIHistoriaSlide';

// ─── Färger (identiska med Styrelsekörkortet) ────────────────────────────────
const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

// ─── Unsplash-bilder ─────────────────────────────────────────────────────────
const IMGS = {
  ai:        'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80',
  laptop:    'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1920&q=80',
  team:      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
  kontor:    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  data:      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
  kreativ:   'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1920&q=80',
  robot:     'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80',
  skrivbord: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=80',
};

// ═══════════════════════════════════════════════════════════════════════════════
// HJÄLPKOMPONENTER (identiska med original)
// ═══════════════════════════════════════════════════════════════════════════════

const BgSlide = ({
  bild,
  children,
  overlay = 'rgba(15,22,35,0.82)',
}: {
  bild: string;
  children: React.ReactNode;
  overlay?: string;
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
  <div
    className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}
  >
    {text}
  </div>
);

const H = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2
    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif" }}
  >
    <Icon className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
    {title}
  </h2>
);

// ─── KortItem + Modal + Grid (identiska med original) ────────────────────────
interface KortItem {
  id: string;
  nr: string;
  label: string;
  short: string;
  bild: string;
  body: string;
  tips?: string;
}

const KortModal = ({
  item,
  onClose,
}: {
  item: KortItem | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed z-50"
          style={{ top: 'var(--header-height, 60px)', left: 0, right: 0, bottom: 0 }}
        >
          <div className="h-full flex items-center justify-center p-0 md:p-6">
            <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-3xl md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
              <div className="relative flex-shrink-0 h-44 sm:h-52">
                <img
                  src={item.bild}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.65))',
                  }}
                />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <X size={16} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-5 right-14">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 text-white"
                    style={{ background: O }}
                  >
                    {item.nr}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {item.label}
                  </h3>
                  <p className="text-white/70 text-base mt-1">{item.short}</p>
                </div>
              </div>
              <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-5 flex-1">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: O }}
                  >
                    Vad innebär det?
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">{item.body}</p>
                </div>
                {item.tips && (
                  <div
                    className="rounded-2xl p-5 border"
                    style={{ background: OL, borderColor: `${O}20` }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: O }}
                    >
                      Tänk på detta
                    </p>
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
    setViewed((prev) => new Set([...prev, item.id]));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-6 px-2">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}
            >
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
          ✓ Du har utforskat alla!
        </p>
      )}
      <KortModal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Är ChatGPT och Claude samma sak?',
    answer:
      'Nej. ChatGPT är OpenAIs produkt, Claude är Anthropics och Gemini är Googles. De bygger på liknande teknik (stora språkmodeller) men är separata produkter med olika styrkor. Principerna för bra promptar fungerar i alla tre.',
  },
  {
    question: 'Kan AI ersätta mitt jobb?',
    answer:
      'AI automatiserar uppgifter, inte yrken. Forskning visar att de som lär sig använda AI produktivt stärker sin position på arbetsmarknaden. Målet med den här kursen är att du ska bli en av dem.',
  },
  {
    question: 'Är det säkert att skriva in företagsinformation i ChatGPT?',
    answer:
      'Var försiktig. Som standard kan OpenAI använda konversationer för träning. Använd aldrig känsliga personuppgifter, interna siffror eller konfidentiell affärsinformation i gratisversionen. Kolla ditt företags AI-policy.',
  },
  {
    question: 'Varför ger AI ibland felaktiga svar?',
    answer:
      'AI-modeller är tränade på stora textmängder och "förutspår" nästa ord – de söker inte fakta som en sökmotor. Det kallas hallucination. Kontrollera alltid faktapåståenden, särskilt siffror och datum, mot tillförlitliga källor.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 1 – INTRO
// ═══════════════════════════════════════════════════════════════════════════════
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="AI & PRODUKTIVITET"
    titel="Välkommen till <span style='color:#FF5421'>AI i arbetslivet</span>"
    ingress="I det här avsnittet lär du dig hur AI-verktyg fungerar och hur du använder dem effektivt på jobbet."
    bild={IMGS.ai}
    längd="2 timmar"
    avsnitt={11}
    onStart={onStart}
    vadLärDuDig={[
      'Hur stora språkmodeller (LLM) fungerar',
      'Skillnaden mellan ChatGPT, Claude och Gemini',
      'FAKTAP-modellen för kraftfulla promptar',
      'Praktiska användningsområden på jobbet',
      'Källkritik och säker AI-användning',
      'Vad du aldrig ska skriva till en AI',
    ]}
  />
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 2 – HUR AI FUNGERAR (klickbara cirklar)
// ═══════════════════════════════════════════════════════════════════════════════
const HurAIFungerarSlide = () => {
  const begrepp: KortItem[] = [
    {
      id: 'llm',
      nr: 'Begrepp 1',
      label: 'Stor språk-\nmodell (LLM)',
      short: 'Kärnan i ChatGPT, Claude och Gemini.',
      bild: IMGS.ai,
      body: 'En Large Language Model (LLM) är ett neuralt nätverk tränat på enorma textmängder – böcker, webbsidor, kod och mer. Modellen lär sig statistiska mönster: givet dessa ord, vilket ord kommer troligast härnäst? Det är därför AI:n låter flytande men ibland har fel – den förutspår, söker inte fakta.',
      tips: 'Tänk på AI:n som en extremt välläst person som inte kan googla. Den vet mycket men kan inte kolla upp aktuell information efter sitt träningsdatum.',
    },
    {
      id: 'token',
      nr: 'Begrepp 2',
      label: 'Token &\nkontext',
      short: 'Hur AI:n "minns" konversationen.',
      bild: IMGS.data,
      body: 'AI:n delar upp text i tokens (ungefär ¾ av ett ord). Varje modell har ett kontextfönster – hur mycket text den kan "hålla i minnet" åt gången. GPT-4o hanterar ~128 000 tokens, Claude 3.5 upp till 200 000. Utanför fönstret glömmer AI:n vad som sagts.',
      tips: 'Startar du ett nytt chattfönster börjar AI:n från noll. Om du jobbar med ett långt dokument – håll kvar i samma konversation.',
    },
    {
      id: 'hallucination',
      nr: 'Begrepp 3',
      label: 'Hallucination',
      short: 'När AI:n hittar på trovärdiga fakta.',
      bild: IMGS.robot,
      body: 'Hallucination är när modellen genererar information som låter korrekt men är felaktig. Det kan röra sig om påhittade källhänvisningar, fel datum, fel namn eller felaktiga statistiksiffror. Det händer även de bästa modellerna.',
      tips: 'Kontrollera alltid faktapåståenden, siffror och citat mot primärkällor. Be AI:n motivera sitt svar – det avslöjar ofta osäkerheter.',
    },
    {
      id: 'prompt',
      nr: 'Begrepp 4',
      label: 'Prompt',
      short: 'Din instruktion till AI:n.',
      bild: IMGS.laptop,
      body: 'En prompt är meddelandet du skickar till AI:n. Kvaliteten på din prompt avgör kvaliteten på svaret. En vag prompt ger ett generiskt svar. En välstrukturerad prompt med kontext, ton och format ger ett svar du faktiskt kan använda direkt.',
      tips: 'Du kan alltid följa upp med "Förklara varför du svarade så" eller "Ge mig tre alternativa versioner". Konversationen är ditt viktigaste verktyg.',
    },
    {
      id: 'temperatur',
      nr: 'Begrepp 5',
      label: 'Kreativitet\nvs precision',
      short: 'Hur "kreativ" eller "faktabaserad" AI:n är.',
      bild: IMGS.kreativ,
      body: 'De flesta AI-verktyg låter dig (direkt eller indirekt) styra hur kreativ modellen är. Hög kreativitet = varierade, originella svar. Låg kreativitet = mer förutsägbara, faktabaserade svar. För analytiska uppgifter vill du ha precision. För copywriting vill du ha kreativitet.',
      tips: 'I ChatGPT kan du skriva i prompten: "Var strikt faktabaserad och undvik spekulationer" eller "Var kreativ och ge mig oväntade vinklar".',
    },
    {
      id: 'training',
      nr: 'Begrepp 6',
      label: 'Tränings-\ndatum',
      short: 'AI:n vet inte vad som hänt nyligen.',
      bild: IMGS.data,
      body: 'Varje modell har ett träningsdatum – en tidpunkt då datainsamlingen avslutades. Händelser efter det datumet finns inte i modellens kunskapsbas. GPT-4o:s träningsdata sträcker sig till april 2024. För aktuella nyheter och priser – använd web search-funktionen eller verifiera manuellt.',
      tips: 'Fråga alltid AI:n: "Vad är ditt träningsdatum och kan din information vara inaktuell här?" Det är ett enkelt sätt att avslöja begränsningar.',
    },
  ];

  return (
    <BgSlide bild={IMGS.robot}>
      <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto px-6">
        <Badge text="Block 1 · Avsnitt 01" />
        <H icon={Brain} title="Hur AI fungerar – sex nyckelbegrepp" />
        <p className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl">
          Klicka på varje begrepp för att förstå tekniken bakom AI-verktygen.
        </p>
        <div className="w-full">
          <KortGrid items={begrepp} />
        </div>
      </div>
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 3 – AI-VERKTYGENS LANDSKAP
// ═══════════════════════════════════════════════════════════════════════════════
const VerktygensLandskapSlide = () => (
  <BgSlide bild={IMGS.kontor}>
    <Badge text="Avsnitt 02 · Verktygen" />
    <H icon={Layers} title="Vilka AI-verktyg finns – och vilket passar dig?" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Det finns hundratals AI-verktyg men ett fåtal dominerar. Förstå skillnaderna
      så väljer du rätt verktyg för rätt uppgift.
    </p>

    {/* Jämförelsetabell */}
    <div
      className="rounded-2xl p-5 border mb-5"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: O }}
      >
        De fyra ledande assistenterna
      </p>
      <div className="space-y-3">
        {[
          {
            namn: 'ChatGPT',
            företag: 'OpenAI',
            styrka: 'Bäst för kreativt skrivande, kod och bildgenerering (DALL-E)',
            notering: 'Populärast globalt',
          },
          {
            namn: 'Claude',
            företag: 'Anthropic',
            styrka: 'Utmärkt för långa dokument, analys och nyanserade resonemang',
            notering: 'Störst kontextfönster',
          },
          {
            namn: 'Gemini',
            företag: 'Google',
            styrka: 'Integreras sömlöst med Google Workspace (Docs, Sheets, Gmail)',
            notering: 'Bäst Google-integration',
          },
          {
            namn: 'Copilot',
            företag: 'Microsoft',
            styrka: 'Inbyggt i Word, Excel, PowerPoint och Teams',
            notering: 'Bäst Microsoft-integration',
          },
        ].map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-start gap-4 p-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex-shrink-0 w-20">
              <p className="text-white font-black text-sm">{v.namn}</p>
              <p className="text-xs" style={{ color: O }}>
                {v.företag}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm leading-snug">{v.styrka}</p>
            </div>
            <span
              className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: `${O}20`, color: O }}
            >
              {v.notering}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Råd */}
    <div
      className="rounded-xl p-4 border-l-4"
      style={{ borderColor: O, background: 'rgba(255,84,33,0.1)' }}
    >
      <p className="text-white text-sm leading-relaxed">
        <span className="font-bold" style={{ color: O }}>
          Praktiskt råd:{' '}
        </span>
        Principerna för bra promptar fungerar i <strong>alla</strong> verktygen. Lär dig
        ett ordentligt – resten är enkelt att plocka upp. Välj det som passar ditt
        befintliga arbetsflöde bäst.
      </p>
    </div>
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 4 – QUIZ 1
// ═══════════════════════════════════════════════════════════════════════════════
const Quiz1Slide = ({
  onComplete,
  isDone,
}: {
  onComplete: (id: string) => void;
  isDone: boolean;
}) => (
  <BgSlide bild={IMGS.robot} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 1" />
    <H icon={HelpCircle} title="Hur AI fungerar" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om LLM, hallucination och AI-verktygens landskap.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-1')}
      questions={[
        {
          id: 'q1',
          question_text:
            'Vad är "hallucination" i sammanhanget AI?',
          question_type: 'single_choice',
          question_order: 1,
          options: {
            choices: [
              'När AI:n inte kan svara på en fråga',
              'När AI:n genererar information som låter korrekt men är felaktig',
              'När AI:n vägrar följa instruktioner',
              'När svaret är för kreativt',
            ],
          },
          correct_answer:
            'När AI:n genererar information som låter korrekt men är felaktig',
          explanation:
            'Hallucination innebär att modellen förutspår text som låter rimlig men inte stämmer med fakta. Det kan röra sig om påhittade källhänvisningar, fel siffror eller felaktiga påståenden.',
          points: 100,
        },
        {
          id: 'q2',
          question_text:
            'Vilket AI-verktyg är bäst integrerat med Google Docs och Gmail?',
          question_type: 'single_choice',
          question_order: 2,
          options: {
            choices: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
          },
          correct_answer: 'Gemini',
          explanation:
            'Gemini (Google) är designat för att arbeta sömlöst med hela Google Workspace – Docs, Sheets, Slides och Gmail.',
          points: 100,
        },
        {
          id: 'q3',
          question_text: 'Vad händer när du startar ett nytt chattfönster med en AI?',
          question_type: 'single_choice',
          question_order: 3,
          options: {
            choices: [
              'AI:n minns allt från tidigare konversationer',
              'AI:n börjar från noll utan minne av tidigare samtal',
              'AI:n sparar automatiskt kontexten i molnet',
              'AI:n frågar om du vill fortsätta från förra gången',
            ],
          },
          correct_answer: 'AI:n börjar från noll utan minne av tidigare samtal',
          explanation:
            'Varje nytt chattfönster är en fristående session. AI:n har inget minne av vad du diskuterat i andra fönster om du inte klistrar in kontexten manuellt.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 5 – FAKTAP-MODELLEN (klickbara cirklar)
// ═══════════════════════════════════════════════════════════════════════════════
const FAKTAPSlide = () => {
  const byggstenar: KortItem[] = [
    {
      id: 'format',
      nr: 'F – Format',
      label: 'Format',
      short: 'Vilket format vill du ha svaret i?',
      bild: IMGS.laptop,
      body: 'Specificera hur du vill ha svaret presenterat: punktlista, tabell, numrerad lista, löpande text, email-format, JSON eller något annat. Om du inte anger format väljer AI:n själv – och det matchar sällan exakt vad du behöver.',
      tips: 'Exempel: "Svara i form av en punktlista med max 5 punkter" eller "Skriv som ett formellt mejl med ämnesrad, hälsningsfras och avslutning."',
    },
    {
      id: 'agerande',
      nr: 'A – Agerande',
      label: 'Agerande',
      short: 'Vad ska AI:n faktiskt göra?',
      bild: IMGS.kontor,
      body: 'Var tydlig med uppgiften: Skriv, Sammanfatta, Analysera, Förklara, Jämför, Översätt, Förbättra, Korrekturläs, Brainstorma, Planera. En specifik verb i prompten är en av de starkaste signalerna AI:n kan få.',
      tips: 'Undvik vaga verb som "hjälp mig med" eller "titta på". Använd aktiva, specifika verb: "Skriv", "Analysera", "Lista", "Förkorta".',
    },
    {
      id: 'kontext',
      nr: 'K – Kontext',
      label: 'Kontext',
      short: 'Vad är bakgrunden och situationen?',
      bild: IMGS.team,
      body: 'Ju mer relevant bakgrundsinformation du ger, desto mer träffsäkert svar får du. Berätta om din bransch, din roll, din målgrupp, syftet med uppgiften och eventuella begränsningar. AI:n kan inte läsa tankar.',
      tips: 'Exempel: "Jag är marknadsförare på ett B2B-teknikföretag och ska presentera en ny produkt för beslutsfattare inom logistik."',
    },
    {
      id: 'ton',
      nr: 'T – Ton',
      label: 'Ton',
      short: 'Vilket tonläge ska svaret ha?',
      bild: IMGS.kreativ,
      body: 'Tonen sätter hela känslan i texten. Formellt, informellt, tekniskt, enkelt, entusiasmerande, lugnt, humoristiskt, empatiskt. Utan tonangivelse väljer AI:n ett neutralt standardtonläge som kan kännas livlöst.',
      tips: 'Exempel: "Skriv på ett varmt och uppmuntrande sätt, som om du pratar med en kollega du gillar." eller "Formellt, inga förkortningar."',
    },
    {
      id: 'avgransning',
      nr: 'A – Avgränsning',
      label: 'Avgräns-\nning',
      short: 'Vad ska INTE ingå? Vilka begränsningar gäller?',
      bild: IMGS.skrivbord,
      body: 'Ange tydliga begränsningar: ordgräns, vad som ska uteslutas, tidsram, målgrupp. Att berätta vad du INTE vill ha är lika viktigt som vad du vill ha. Utan avgränsning tenderar AI:n att bli för bred och generisk.',
      tips: 'Exempel: "Max 150 ord. Inkludera inga prisjämförelser. Anta att läsaren inte har teknisk bakgrund."',
    },
    {
      id: 'persona',
      nr: 'P – Persona',
      label: 'Persona',
      short: 'Vilken roll ska AI:n anta?',
      bild: IMGS.robot,
      body: 'Att ge AI:n en roll eller persona förändrar drastiskt kvaliteten och vinkeln på svaret. "Du är en erfaren HR-chef", "Du är en skicklig copywriter som specialiserar sig på B2B SaaS" eller "Du är en skeptisk journalist" ger helt olika svar på samma fråga.',
      tips: 'Kombinera persona med kontext för bästa resultat: "Du är en erfaren ekonomichef på ett medelstort industriföretag. Jag är nyanställd controller och behöver..."',
    },
  ];

  return (
    <BgSlide bild={IMGS.laptop}>
      <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto px-6">
        <Badge text="Block 2 · Avsnitt 03" />
        <H icon={Sparkles} title="FAKTAP-modellen – sex byggstenar" />
        <p className="text-white/70 text-base leading-relaxed mb-8 max-w-2xl">
          FAKTAP är ett ramverk för kraftfulla promptar. Klicka på varje bokstav
          för att lära dig vad den innebär.
        </p>
        <div className="w-full">
          <KortGrid items={byggstenar} />
        </div>
      </div>
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 6 – FAKTAP I PRAKTIKEN (SplitSlide)
// ═══════════════════════════════════════════════════════════════════════════════
const FAKTAPPraktikSlide = () => (
  <SplitSlide
    badge="Avsnitt 03 · Fördjupning"
    title="FAKTAP i <span style='color:#FF5421'>praktiken</span>"
    ingress="Skillnaden mellan en svag och en stark prompt är enorm. Här ser du samma uppgift löst på båda sätten."
    bild={IMGS.skrivbord}
    bildPosition="right"
    badge2="Svag → Stark"
    badge2Sub="Samma uppgift, helt olika resultat"
  >
    <StegLista
      steg={[
        {
          nr: '✗',
          titel: 'Svag prompt',
          desc: '"Hjälp mig skriva ett mejl."',
        },
        {
          nr: '✓',
          titel: 'Stark prompt med FAKTAP',
          desc: '"Du är en erfaren projektledare (Persona). Skriv ett professionellt mejl (Format + Agerande) till en kund om att projektet försenas en vecka pga sjukdom (Kontext). Tonen ska vara empatisk men professionell (Ton). Max 150 ord, inkludera förslag på nytt datum (Avgränsning)."',
        },
        {
          nr: '→',
          titel: 'Resultatet',
          desc: 'Den starka prompten ger ett mejl du kan skicka direkt. Den svaga ger ett generiskt utkast du ändå måste skriva om.',
        },
      ]}
    />
    <InfoRuta>
      Du behöver inte alltid använda alla sex byggstenar. Men ju fler du inkluderar,
      desto mer träffsäkert blir svaret. Börja med Format, Agerande och Kontext.
    </InfoRuta>
  </SplitSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 7 – QUIZ 2
// ═══════════════════════════════════════════════════════════════════════════════
const Quiz2Slide = ({
  onComplete,
  isDone,
}: {
  onComplete: (id: string) => void;
  isDone: boolean;
}) => (
  <BgSlide bild={IMGS.laptop} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 2" />
    <H icon={HelpCircle} title="Prompt Engineering" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om FAKTAP-modellen och hur du skriver bra promptar.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-2')}
      questions={[
        {
          id: 'q1',
          question_text: 'Vad står "K" för i FAKTAP-modellen?',
          question_type: 'single_choice',
          question_order: 1,
          options: {
            choices: ['Kreativitet', 'Kontext', 'Korrekthet', 'Komprimering'],
          },
          correct_answer: 'Kontext',
          explanation:
            'K står för Kontext – bakgrundsinformationen som hjälper AI:n att förstå situationen, din roll, din bransch och syftet med uppgiften.',
          points: 100,
        },
        {
          id: 'q2',
          question_text:
            'Varför är det viktigt att ange en "Persona" i din prompt?',
          question_type: 'single_choice',
          question_order: 2,
          options: {
            choices: [
              'Det är bara ett trick – det påverkar inte svaret',
              'Att ge AI:n en roll förändrar vinkeln och kvaliteten på svaret dramatiskt',
              'Det krävs av ChatGPT:s användarvillkor',
              'Persona ersätter behovet av kontext',
            ],
          },
          correct_answer:
            'Att ge AI:n en roll förändrar vinkeln och kvaliteten på svaret dramatiskt',
          explanation:
            'En persona ger AI:n ett perspektiv och en kunskapsbas att utgå ifrån. "Du är en erfaren HR-chef" och "Du är en skeptisk journalist" ger helt olika svar på samma fråga.',
          points: 100,
        },
        {
          id: 'q3',
          question_text:
            'Vilken av dessa är den starkaste prompten för att skriva ett kundmejl?',
          question_type: 'single_choice',
          question_order: 3,
          options: {
            choices: [
              '"Skriv ett mejl till min kund."',
              '"Hjälp mig med ett mejl."',
              '"Du är en kundansvarig på ett IT-bolag. Skriv ett kort, formellt uppföljningsmejl (max 100 ord) till en kund som inte svarat på offerten efter 5 dagar."',
              '"Skriv ett bra mejl om vår offert."',
            ],
          },
          correct_answer:
            '"Du är en kundansvarig på ett IT-bolag. Skriv ett kort, formellt uppföljningsmejl (max 100 ord) till en kund som inte svarat på offerten efter 5 dagar."',
          explanation:
            'Den tredje prompten inkluderar Persona (kundansvarig på IT-bolag), Agerande (skriv uppföljningsmejl), Kontext (offerten, 5 dagar utan svar), Ton (formellt) och Avgränsning (max 100 ord).',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 8 – PRAKTISKA ANVÄNDNINGSOMRÅDEN (klickbara cirklar)
// ═══════════════════════════════════════════════════════════════════════════════
const AnvändningsområdenSlide = () => {
  const områden: KortItem[] = [
    {
      id: 'mejl',
      nr: 'Område 1',
      label: 'Mejl &\nkommunikation',
      short: 'Skriv, förbättra och svara på mejl snabbare.',
      bild: IMGS.kontor,
      body: 'AI:n kan skriva utkast, förbättra ton, korta ner och anpassa mejl till olika mottagare. Klistra in ett mottaget mejl och be AI:n föreslå ett svar – det sparar i genomsnitt 15–20 minuter per mejlkonversation.',
      tips: 'Nyckelpromptar: "Sammanfatta det här mejlet i tre punkter", "Skriv ett professionellt svar", "Gör det kortare utan att tappa kärnan."',
    },
    {
      id: 'rapporter',
      nr: 'Område 2',
      label: 'Rapporter &\nsammanfatt-\nningar',
      short: 'Kondensera långa dokument till kärnpunkter.',
      bild: IMGS.data,
      body: 'Klistra in en lång rapport eller artikel och be AI:n sammanfatta den för en specifik målgrupp. Lägg till: "lyft fram de tre viktigaste insikterna för en styrelse" eller "förklara på ett sätt som en icke-teknisk chef förstår."',
      tips: 'Claude är särskilt bra på långa dokument (upp till 200 000 tokens). Perfekt för att sammanfatta årsredovisningar, forskningsrapporter eller långa kontrakt.',
    },
    {
      id: 'möten',
      nr: 'Område 3',
      label: 'Möten &\nprotokoll',
      short: 'Förvandla röriga anteckningar till strukturerade protokoll.',
      bild: IMGS.team,
      body: 'Klistra in dina råa mötesanteckningar och be AI:n skriva ett strukturerat protokoll med beslutspunkter och nästa steg. Eller använd AI:n för att skriva dagordningen: "Skapa en dagordning för ett 60-minuters strategimöte om Q3-prioriteringar."',
      tips: 'Använd AI:n även för att förbereda mötet: "Ge mig de fem viktigaste frågorna att ställa vid ett möte med en ny leverantör inom [bransch]."',
    },
    {
      id: 'data',
      nr: 'Område 4',
      label: 'Data &\nExcel',
      short: 'Analysera data och skapa formler med AI.',
      bild: IMGS.data,
      body: 'Be AI:n förklara data, hitta mönster och ge rekommendationer. Eller be om Excel-formler: "Skriv en XLOOKUP-formel som söker i kolumn A och returnerar värdet i kolumn D." ChatGPT kan också analysera uppladdade Excel-filer direkt.',
      tips: 'Nyckelpromptar: "Förklara vad den här datan visar och ge tre rekommendationer", "Skriv en Excel-formel som beräknar [beskriv]", "Skapa en pivottabellstruktur för..."',
    },
    {
      id: 'content',
      nr: 'Område 5',
      label: 'Content &\nsociala medier',
      short: 'Skapa engagerande innehåll snabbare.',
      bild: IMGS.kreativ,
      body: 'AI:n kan hjälpa dig brainstorma idéer, skriva inlägg i tre olika tonlägen, optimera för SEO och anpassa samma budskap för olika kanaler. Be alltid om alternativ: "ge mig tre versioner – en formell, en personlig och en frågebaserad."',
      tips: 'LinkedIn-prompten som fungerar: "Skriv tre LinkedIn-inlägg om [ämne]. Version 1: personlig berättelse. Version 2: praktiskt råd. Version 3: provocerande fråga."',
    },
    {
      id: 'kod',
      nr: 'Område 6',
      label: 'Kod &\nautomation',
      short: 'Skriv, förklara och felsök kod – även om du inte kan programmera.',
      bild: IMGS.laptop,
      body: 'AI:n kan skriva Python-skript för att automatisera repetitiva uppgifter, förklara kod du inte förstår, och hjälpa dig felsöka. Du behöver inte kunna programmera – men ju mer du förstår grunderna desto bättre kan du styra AI:n.',
      tips: 'Promptmall: "Jag kan inte programmera. Skriv ett enkelt Python-skript som [beskriv uppgiften]. Förklara varje rad på svenska."',
    },
  ];

  return (
    <BgSlide bild={IMGS.kontor}>
      <Badge text="Avsnitt 04 · Praktiken" />
      <H icon={Zap} title="Sex praktiska användningsområden" />
      <p className="text-white/70 text-base leading-relaxed mb-4">
        Klicka på varje område för att se hur AI sparar tid och höjer kvaliteten.
      </p>
      <KortGrid items={områden} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 9 – QUIZ 3
// ═══════════════════════════════════════════════════════════════════════════════
const Quiz3Slide = ({
  onComplete,
  isDone,
}: {
  onComplete: (id: string) => void;
  isDone: boolean;
}) => (
  <BgSlide bild={IMGS.team} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 3" />
    <H icon={HelpCircle} title="Praktiska användningsområden" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om hur du använder AI effektivt i verkliga arbetsuppgifter.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-3')}
      questions={[
        {
          id: 'q1',
          question_text:
            'Vilket AI-verktyg är bäst lämpat för att analysera ett mycket långt dokument (t.ex. en 200-sidig årsredovisning)?',
          question_type: 'single_choice',
          question_order: 1,
          options: {
            choices: ['Copilot', 'Gemini', 'Claude', 'ChatGPT-3.5'],
          },
          correct_answer: 'Claude',
          explanation:
            'Claude (Anthropic) har det längsta kontextfönstret – upp till 200 000 tokens – och är känt för sin förmåga att hantera och analysera långa dokument med hög precision.',
          points: 100,
        },
        {
          id: 'q2',
          question_text:
            'Du har ett mötesprotokoll på 3 sidor. Hur formulerar du bäst din prompt för att få en bra sammanfattning?',
          question_type: 'single_choice',
          question_order: 2,
          options: {
            choices: [
              '"Sammanfatta det här."',
              '"Sammanfatta det här protokollet i tre punkter: beslut som fattades, åtgärdspunkter med ansvarig person och deadline för varje punkt."',
              '"Gör kortare."',
              '"Hjälp mig förstå mötet."',
            ],
          },
          correct_answer:
            '"Sammanfatta det här protokollet i tre punkter: beslut som fattades, åtgärdspunkter med ansvarig person och deadline för varje punkt."',
          explanation:
            'Specifika instruktioner om format och vad du vill extrahera ger ett direkt användbart svar. Den vaga prompten ger en generisk sammanfattning du ändå måste bearbeta.',
          points: 100,
        },
        {
          id: 'q3',
          question_text:
            'Vad bör du ALDRIG skriva in i ett AI-verktyg?',
          question_type: 'single_choice',
          question_order: 3,
          options: {
            choices: [
              'Ditt namn och din yrkesroll',
              'Offentlig information om din bransch',
              'Känsliga personuppgifter om kunder eller konfidentiella affärssiffror',
              'Korrekturläsning av ett eget utkast',
            ],
          },
          correct_answer:
            'Känsliga personuppgifter om kunder eller konfidentiella affärssiffror',
          explanation:
            'Gratis AI-tjänster kan använda konversationer för träning. Dela aldrig känsliga personuppgifter (GDPR-skyddat), interna finansiella siffror eller affärshemligheter. Kolla alltid ditt företags AI-policy.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 10 – SÄKER AI-ANVÄNDNING
// ═══════════════════════════════════════════════════════════════════════════════
const SäkerAnvändningSlide = () => (
  <BgSlide bild={IMGS.skrivbord}>
    <Badge text="Avsnitt 05 · Säkerhet & etik" />
    <H icon={Shield} title="Säker AI-användning – vad du måste veta" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      AI är kraftfullt – men med kraft följer ansvar. Här är de viktigaste
      reglerna för att använda AI professionellt och lagligt.
    </p>

    {/* Fyra regler */}
    <div className="space-y-3 mb-6">
      {[
        {
          nr: '01',
          titel: 'GDPR och personuppgifter',
          text: 'Dela aldrig personnummer, kunduppgifter, hälsoinformation eller andra skyddade personuppgifter med ett AI-verktyg. Det kan strida mot GDPR och ditt företags integritetspolicy.',
        },
        {
          nr: '02',
          titel: 'Konfidentiell affärsinformation',
          text: 'Interna finansiella siffror, ej offentliga affärsstrategier, löneuppgifter och affärshemligheter ska aldrig skrivas in i ett externt AI-verktyg.',
        },
        {
          nr: '03',
          titel: 'Källkritik och verifiering',
          text: 'Kontrollera alltid faktapåståenden, siffror och citat från AI mot primärkällor. AI kan ha fel – och det låter aldrig som om den har fel. Det är det farliga.',
        },
        {
          nr: '04',
          titel: 'Transparens och ägarskap',
          text: 'Om du publicerar AI-genererat innehåll – var transparent om det. Kolla upphovsrättsläget och ditt företags policy. AI-genererade texter och bilder kan ha juridiska begränsningar.',
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="flex items-start gap-4 p-4 rounded-xl border"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <span
            className="text-3xl font-black flex-shrink-0 w-10"
            style={{ color: `${O}50` }}
          >
            {item.nr}
          </span>
          <div>
            <p className="text-white font-bold text-sm sm:text-base mb-1">
              {item.titel}
            </p>
            <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Varningsruta */}
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
      }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-red-400">
        Kom ihåg
      </p>
      <div className="space-y-2">
        {[
          'AI förstärker det du matar in – skräp in ger skräp ut',
          'AI är ett verktyg, inte ett svar – din bedömning är fortfarande avgörande',
          'Kolla ditt företags AI-policy innan du börjar använda verktyget i jobbet',
          'Om du är osäker – fråga din chef eller IT-avdelningen',
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

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 11 – AVANCERADE PROMTTEKNIKER (klickbara cirklar)
// ═══════════════════════════════════════════════════════════════════════════════
const AvanceradeTekniker = () => {
  const tekniker: KortItem[] = [
    {
      id: 'chain',
      nr: 'Teknik 1',
      label: 'Chain-of-\nThought',
      short: 'Be AI:n tänka steg för steg.',
      bild: IMGS.ai,
      body: 'Lägg till "Tänk steg för steg" eller "Förklara ditt resonemang" i prompten. Det tvingar modellen att strukturera sitt svar och minskar risken för hallucination. Fungerar särskilt bra för analys, matematik och logiska resonemang.',
      tips: 'Exempel: "Analysera den här situationen steg för steg och presentera för- och nackdelar innan du ger din rekommendation."',
    },
    {
      id: 'fewshot',
      nr: 'Teknik 2',
      label: 'Few-shot\nexempel',
      short: 'Visa AI:n vad du vill ha med konkreta exempel.',
      bild: IMGS.laptop,
      body: 'Ge AI:n ett eller flera konkreta exempel på det du vill ha. "Skriv en produktbeskrivning i den här stilen: [exempel]." Modellen lär sig snabbt av exemplen och matchar formatet och tonen.',
      tips: 'Särskilt effektivt för: tonläge, format, rubriknivåer, längd och stil. Ge minst ett tydligt exempel.',
    },
    {
      id: 'roleplay',
      nr: 'Teknik 3',
      label: 'Rollspel &\ntestning',
      short: 'Använd AI:n för att simulera scenarier.',
      bild: IMGS.team,
      body: 'Be AI:n spela rollen av en kritisk kund, en strikt chef eller en skeptisk investerare för att förbereda dig. "Agera som en potentiell kund som är skeptisk till vår prissättning och ställ svåra frågor om vår produkt."',
      tips: 'Perfekt för att förbereda presentationer, förhandlingar och kundmöten. AI:n kan vara din övertygelsepartner.',
    },
    {
      id: 'iteration',
      nr: 'Teknik 4',
      label: 'Iterativ\nförbättring',
      short: 'Bygg vidare på svaret i samma konversation.',
      bild: IMGS.kreativ,
      body: 'Behandla konversationen som ett samarbete. "Det var bra, men gör inledningen starkare." "Byt ut det tredje stycket mot ett fokus på ROI." "Skriv om det i en mer empatisk ton." Varje iteration förbättrar resultatet.',
      tips: 'Spara konversationer du är nöjd med. Nästa gång du har en liknande uppgift kan du referera till den: "Använd samma tonläge och struktur som i det här exemplet: [klistra in]."',
    },
    {
      id: 'systempropt',
      nr: 'Teknik 5',
      label: 'System-\nprompten',
      short: 'Sätt grundregler för hela konversationen i förväg.',
      bild: IMGS.skrivbord,
      body: 'I ChatGPT kan du skapa "Custom Instructions" (Personliga inställningar) som gäller för alla dina konversationer. Berätta om din roll, dina preferenser och hur du vill att AI:n ska bete sig. Det sparar tid vid varje ny konversation.',
      tips: 'Exempel på systemprompt: "Jag är projektledare inom IT. Svara alltid på svenska. Håll svar under 200 ord om jag inte ber om mer. Anta att jag har teknisk grundkunskap."',
    },
    {
      id: 'kontroll',
      nr: 'Teknik 6',
      label: 'Kritisk\nkontroll',
      short: 'Be AI:n granska sitt eget svar.',
      bild: IMGS.data,
      body: 'Be AI:n kritisera och förbättra sitt eget svar: "Vilka svagheter finns i det du just skrivit?", "Vad är de tre starkaste motargumenten mot det du föreslog?" eller "Är du säker på det här påståendet? Vad är källan?"',
      tips: 'Det är ett av de mest kraftfulla sätten att höja kvaliteten och fånga hallucinations. AI:n är ofta bättre på att hitta sina egna fel när den uppmanas att leta efter dem.',
    },
  ];

  return (
    <BgSlide bild={IMGS.ai}>
      <Badge text="Avsnitt 06 · Avancerat" />
      <H icon={BarChart2} title="Avancerade prompttekniker" />
      <p className="text-white/70 text-base leading-relaxed mb-4">
        Sex tekniker som tar ditt AI-arbete till nästa nivå. Klicka för att utforska.
      </p>
      <KortGrid items={tekniker} />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 12 – QUIZ 4
// ═══════════════════════════════════════════════════════════════════════════════
const Quiz4Slide = ({
  onComplete,
  isDone,
}: {
  onComplete: (id: string) => void;
  isDone: boolean;
}) => (
  <BgSlide bild={IMGS.ai} overlay="rgba(15,22,35,0.90)">
    <Badge text="Kunskapstest · Block 4" />
    <H icon={HelpCircle} title="Säkerhet och avancerade tekniker" />
    <p className="text-white/60 text-sm mb-6">
      Tre frågor om säker AI-användning och avancerade prompttekniker.
    </p>
    <InlineQuiz
      dark
      onComplete={() => onComplete('quiz-4')}
      questions={[
        {
          id: 'q1',
          question_text:
            'Vad innebär "Chain-of-Thought"-teknik i prompt engineering?',
          question_type: 'single_choice',
          question_order: 1,
          options: {
            choices: [
              'Att skicka flera promptar i följd',
              'Att be AI:n tänka och resonera steg för steg innan den svarar',
              'Att kedja ihop flera AI-verktyg',
              'Att använda AI:n för att skriva kod',
            ],
          },
          correct_answer:
            'Att be AI:n tänka och resonera steg för steg innan den svarar',
          explanation:
            'Chain-of-Thought innebär att du ber AI:n visa sitt resonemang: "Tänk steg för steg." Det förbättrar kvaliteten på komplexa analyser och minskar hallucination.',
          points: 100,
        },
        {
          id: 'q2',
          question_text:
            'Du vill att ChatGPT alltid ska svara på svenska och hålla sig under 150 ord. Var ställer du in det effektivast?',
          question_type: 'single_choice',
          question_order: 2,
          options: {
            choices: [
              'Du måste skriva det i varje prompt',
              'I Custom Instructions (Personliga inställningar)',
              'Det är inte möjligt att ställa in',
              'Via ChatGPT:s inställningsapp',
            ],
          },
          correct_answer: 'I Custom Instructions (Personliga inställningar)',
          explanation:
            'ChatGPT:s Custom Instructions (systemprompt) gäller för alla dina konversationer. Det sparar tid och säkerställer konsekvent beteende utan att du behöver upprepa instruktionerna.',
          points: 100,
        },
        {
          id: 'q3',
          question_text:
            'Hur kan du bäst kontrollera om AI:n har "hallucinerat" i sitt svar?',
          question_type: 'single_choice',
          question_order: 3,
          options: {
            choices: [
              'Lita på att AI:n alltid är korrekt',
              'Be AI:n repetera svaret en gång till',
              'Be AI:n identifiera svagheter och osäkerheter i sitt eget svar, och verifiera nyckeluppgifter mot primärkällor',
              'Använd ett annat AI-verktyg för att bekräfta',
            ],
          },
          correct_answer:
            'Be AI:n identifiera svagheter och osäkerheter i sitt eget svar, och verifiera nyckeluppgifter mot primärkällor',
          explanation:
            'Kritisk självgranskning är ett kraftfullt verktyg. Kombinera det med manuell verifiering av faktapåståenden mot tillförlitliga primärkällor.',
          points: 100,
        },
      ]}
    />
  </BgSlide>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDE 13 – SLUTTEST
// ═══════════════════════════════════════════════════════════════════════════════
const SlutprovSlide = ({
  isDone,
  onComplete,
}: {
  isDone: boolean;
  onComplete: (id: string) => void;
}) => {
  const [quizOpen, setQuizOpen] = useState(false);

  const fragor = [
    {
      id: 'sq1',
      question_text: 'Vad är en LLM (Large Language Model)?',
      question_type: 'single_choice',
      question_order: 1,
      options: {
        choices: [
          'En databas som lagrar fakta och söker efter rätt svar',
          'Ett neuralt nätverk tränat på stora textmängder som förutspår nästa ord',
          'En sökmotor med AI-filtrering',
          'Ett verktyg för att generera bilder från text',
        ],
      },
      correct_answer:
        'Ett neuralt nätverk tränat på stora textmängder som förutspår nästa ord',
      explanation:
        'En LLM förutspår nästa token baserat på statistiska mönster från träningsdata. Det är därför den låter flytande men ibland har fel – den söker inte, den förutspår.',
      points: 100,
    },
    {
      id: 'sq2',
      question_text: 'Vilka sex bokstäver ingår i FAKTAP-modellen?',
      question_type: 'single_choice',
      question_order: 2,
      options: {
        choices: [
          'Format, Analys, Kontext, Tid, Antal, Precision',
          'Format, Agerande, Kontext, Ton, Avgränsning, Persona',
          'Fakta, AI, Kunskap, Tillämpning, Automatisering, Process',
          'Fritext, Arbetsuppgift, Klarhet, Tone, Alternativ, Projekt',
        ],
      },
      correct_answer:
        'Format, Agerande, Kontext, Ton, Avgränsning, Persona',
      explanation:
        'FAKTAP: Format, Agerande, Kontext, Ton, Avgränsning, Persona – sex byggstenar för kraftfulla promptar som fungerar i alla AI-verktyg.',
      points: 100,
    },
    {
      id: 'sq3',
      question_text:
        'Vilket AI-verktyg är optimerat för Microsoft Word och Excel?',
      question_type: 'single_choice',
      question_order: 3,
      options: {
        choices: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
      },
      correct_answer: 'Copilot',
      explanation:
        'Microsoft Copilot är inbyggt i hela Microsoft 365-sviten – Word, Excel, PowerPoint och Teams. Det är det naturliga valet om du arbetar primärt i Microsofts ekosystem.',
      points: 100,
    },
    {
      id: 'sq4',
      question_text:
        'Vad bör du göra om AI:n ger ett faktapåstående du är osäker på?',
      question_type: 'single_choice',
      question_order: 4,
      options: {
        choices: [
          'Lita på svaret – AI:n har tillgång till all världens information',
          'Be AI:n upprepa svaret tills det verkar rätt',
          'Verifiera mot tillförlitliga primärkällor och be AI:n identifiera sina osäkerheter',
          'Byta till ett annat AI-verktyg och jämföra',
        ],
      },
      correct_answer:
        'Verifiera mot tillförlitliga primärkällor och be AI:n identifiera sina osäkerheter',
      explanation:
        'AI kan hallucera – generera trovärdigt felaktig information. Verifiera alltid viktiga fakta och be AI:n "Vad är du osäker på i det här svaret?"',
      points: 100,
    },
    {
      id: 'sq5',
      question_text:
        'Vilket av följande är ett exempel på korrekt och säker AI-användning på jobbet?',
      question_type: 'single_choice',
      question_order: 5,
      options: {
        choices: [
          'Klistra in en kundlista med personnummer för att få hjälp med segmentering',
          'Be AI:n skriva ett internt PM baserat på er konfidentiella årsplan',
          'Be AI:n skriva ett mejl till en ny kund baserat på offentlig information om dem',
          'Ladda upp hela lönespecifikationsfilen för analys',
        ],
      },
      correct_answer:
        'Be AI:n skriva ett mejl till en ny kund baserat på offentlig information om dem',
      explanation:
        'Att använda offentligt tillgänglig information är säkert. Personnummer, interna ekonomiska siffror och konfidentiella dokument ska aldrig delas med externa AI-tjänster.',
      points: 100,
    },
  ];

  return (
    <BgSlide bild={IMGS.kontor} overlay="rgba(15,22,35,0.92)">
      <div className="text-center">
        <Badge text="Sluttest · AI i arbetslivet" />
        <h2
          className="text-3xl sm:text-4xl font-black text-white mb-3"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Testa dina kunskaper
        </h2>
        <p className="text-white/50 text-sm mb-8">
          5 frågor · 80% rätt krävs för godkänt
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setQuizOpen(true)}
          className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
        >
          <HelpCircle className="w-6 h-6" /> Starta sluttest
        </motion.button>
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border-2 border-green-400 rounded-2xl p-6 text-center"
            >
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Modul klar!</h3>
              <p className="text-white/60 text-sm">
                Du har klarat modulen om AI i arbetslivet. Välkommen till
                AI-generationen!
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
        onComplete={(passed) => {
          if (passed) onComplete('slutprov');
        }}
      />
    </BgSlide>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const ModuleAIGrunderna: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(
    new Set<string>(['intro'])
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const [userData] = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons((prev) => new Set([...prev, id]));

  const slides = [
  {
    id: 'intro',
    title: 'Introduktion',
    component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
  },
  { id: 'ai-historia',  title: 'AI:ns fyra pusselbitar', component: <AIHistoriaSlide /> }, 
  {
    id: 'hur-ai-fungerar',
    title: 'Hur AI fungerar',
    component: <HurAIFungerarSlide />,
  },
  {
    id: 'verktygen',
    title: 'AI-verktygens landskap',
    component: <VerktygensLandskapSlide />,
  },
  {
    id: 'quiz-1',
    title: '🧠 Kunskapstest 1',
    component: <Quiz1Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-1')} />,
  },
  // ── NYA SLIDES ────────────────────────────────────────
  {
    id: 'sverige-ai',
    title: 'Sverige och AI',
    component: <SverigeAISlide />,
  },
  {
    id: 'ai-jobben',
    title: 'AI och jobben',
    component: <AIJobbenSlide />,
  },
  // ─────────────────────────────────────────────────────
  {
    id: 'faktap',
    title: 'FAKTAP-modellen',
    component: <FAKTAPSlide />,
  },
  {
    id: 'faktap-praktik',
    title: 'FAKTAP i praktiken',
    component: <FAKTAPPraktikSlide />,
  },
  { id: 'costar',          title: 'CO-STAR',               component: <CoStarSlide /> },
{ id: 'costar-praktik',  title: 'CO-STAR i praktiken',   component: <CoStarPraktikSlide /> },
{ id: 'ovriga-ramverk',  title: 'ERA · CREATE · ROSES',  component: <OvrigaRamverkSlide /> },
  {
    id: 'quiz-2',
    title: '🧠 Kunskapstest 2',
    component: <Quiz2Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-2')} />,
  },
  {
    id: 'anvandningsomraden',
    title: 'Användningsområden',
    component: <AnvändningsområdenSlide />,
  },
  {
    id: 'quiz-3',
    title: '🧠 Kunskapstest 3',
    component: <Quiz3Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-3')} />,
  },
  // ── NYA SLIDES ────────────────────────────────────────
  {
    id: 'bedrägeri',
    title: 'AI-bedrägeri',
    component: <BedrageriSlide />,
  },
  {
    id: 'kallkritik',
    title: 'Källkritik',
    component: <KallkritikSlide />,
  },
  // ─────────────────────────────────────────────────────
  {
    id: 'saker-anvandning',
    title: 'Säker AI-användning',
    component: <SäkerAnvändningSlide />,
  },
  {
    id: 'avancerade-tekniker',
    title: 'Avancerade tekniker',
    component: <AvanceradeTekniker />,
  },
  {
    id: 'quiz-4',
    title: '🧠 Kunskapstest 4',
    component: <Quiz4Slide onComplete={handleComplete} isDone={completedLessons.has('quiz-4')} />,
  },
  {
    id: 'slutprov',
    title: '🎯 Sluttest',
    component: <SlutprovSlide isDone={completedLessons.has('slutprov')} onComplete={handleComplete} />,
  },
];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: DARK }}
    >
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
        title="Frågor om AI i arbetslivet"
        subtitle="Vanliga frågor om verktyg, promptar och säkerhet"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleAIGrunderna;
