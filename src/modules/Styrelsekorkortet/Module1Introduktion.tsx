// src/modules/Naringsklivet/Module1AiTeam.tsx
// "Ditt AI-team – rekrytera rätt verktyg"
// Slide-baserad introduktionsmodul, samma struktur som Module1Introduktion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Award, Video, Target,
  CheckCircle, Star, Zap, Shield,
  TrendingUp, Code2, Palette, BarChart3,
  MessageSquare, Search, Globe, Users,
  ArrowRight, X, ChevronDown
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer       from '../../components/AudioPlayer';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';

// ─────────────────────────────────────────────────────────
// DATA – AI-VERKTYG
// ─────────────────────────────────────────────────────────

const AI_TOOLS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    maker: 'OpenAI',
    emoji: '🤖',
    color: '#10a37f',
    tagline: 'Allroundern – bäst på det mesta',
    description: 'Den mest kända AI-assistenten. Stark på textgenerering, brainstorming, sammanfattningar och kod. GPT-4o har även bild- och röststöd.',
    bestFor: ['Skriva & omformulera', 'Brainstorming', 'Kodhjälp', 'Sammanfatta dokument'],
    pros: ['Mycket bred kompetens', 'Stort ekosystem av plugins', 'Röst- och bildstöd', 'Välkänd – lätt att få hjälp med'],
    cons: ['Kan hitta på fakta (hallucination)', 'Gratisnivån är begränsad', 'Dataintegritet kräver inställningar'],
    freeVersion: true,
    category: 'generell',
  },
  {
    id: 'claude',
    name: 'Claude',
    maker: 'Anthropic',
    emoji: '🧠',
    color: '#FF5421',
    tagline: 'Analytikern – djup och genomtänkt',
    description: 'Känd för långa, välstrukturerade svar och hög träffsäkerhet. Utmärkt för analys, långa dokument och känsliga uppgifter som kräver nyans.',
    bestFor: ['Långa dokument & analys', 'Juridik & policy', 'Känslig kommunikation', 'Kod & teknisk skrivning'],
    pros: ['Hanterar mycket långa texter', 'Nyanserade och genomtänkta svar', 'Stark på etiska avvägningar', 'Bra källhänvisningar'],
    cons: ['Inte lika känd – färre integrationer', 'Kan vara mer försiktig/restriktiv', 'Inget bildgenereringsstöd'],
    freeVersion: true,
    category: 'generell',
  },
  {
    id: 'copilot',
    name: 'Copilot',
    maker: 'Microsoft',
    emoji: '🪟',
    color: '#0078d4',
    tagline: 'Office-kollegan – inbyggd i ditt arbetsflöde',
    description: 'Microsofts AI inbyggd direkt i Word, Excel, Outlook och Teams. Perfekt om du redan lever i Office 365-ekosystemet.',
    bestFor: ['Word & PowerPoint', 'Excel-formler', 'E-postsammanfattning', 'Teams-möten'],
    pros: ['Direkt i Office-apparna', 'Sammanfattar möten automatiskt', 'Ingen extra inloggning', 'Företagsdata stannar i M365'],
    cons: ['Kräver Microsoft 365-licens', 'Begränsad utanför Office-ekosystemet', 'Dyrare än fristående verktyg'],
    freeVersion: false,
    category: 'integration',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    maker: 'Google',
    emoji: '✨',
    color: '#4285f4',
    tagline: 'Googlarens AI – sökning möter skapande',
    description: 'Googles AI med direkt koppling till sökmotorn och Google Workspace (Docs, Gmail, Drive). Stark på aktuell information och research.',
    bestFor: ['Research & faktasökning', 'Google Docs & Gmail', 'Aktuella nyheter', 'Bildanalys'],
    pros: ['Aktuell information via Google', 'Integrerat i Google Workspace', 'Stark bildförståelse', 'Gratisversion är generös'],
    cons: ['Sämre på kreativt skrivande', 'Integritet – Googles datamodell', 'Ojämn kvalitet på svenska'],
    freeVersion: true,
    category: 'integration',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    maker: 'Mistral AI',
    emoji: '🌬️',
    color: '#ff7000',
    tagline: 'Europas svar – snabb och öppen',
    description: 'Franskt AI-bolag som bygger effektiva, öppna modeller. Starkt fokus på europeisk dataintegritet och GDPR-efterlevnad.',
    bestFor: ['GDPR-känsliga uppgifter', 'Snabb textbearbetning', 'Tekniska uppgifter', 'Egenhostad AI'],
    pros: ['Europeisk dataintegritet', 'Öppen källkod tillgänglig', 'Snabb och effektiv', 'Kan köras lokalt'],
    cons: ['Mindre känd – färre resurser', 'Svagare ekosystem', 'Mer teknisk att sätta upp'],
    freeVersion: true,
    category: 'generell',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    maker: 'DeepSeek AI',
    emoji: '🔬',
    color: '#6366f1',
    tagline: 'Kodaren – teknisk precision',
    description: 'Kinesiskt AI-bolag med modeller som presterar exceptionellt på kodning och matematik till låg kostnad. Väcker diskussion om datasekretess.',
    bestFor: ['Programmering & kod', 'Matematik & logik', 'Teknisk analys', 'Kostnadseffektiv API'],
    pros: ['Exceptionell på kodning', 'Mycket kostnadseffektiv', 'Stark på matematik', 'Öppen källkod (R1)'],
    cons: ['Kinesisk ägare – integritetsrisker', 'Inte GDPR-certifierad', 'Bör undvikas för känslig data', 'Ej lämplig för företagsbruk utan utredning'],
    freeVersion: true,
    category: 'kod',
  },
];

const BRANCH_TOOLS = [
  {
    branch: 'Marknadsföring & innehåll',
    icon: Palette,
    color: '#e91e8c',
    tools: [
      { name: 'Jasper', use: 'Marknadsföringstext & annonser' },
      { name: 'Copy.ai', use: 'Produktbeskrivningar & e-post' },
      { name: 'Midjourney', use: 'Bildgenerering för kampanjer' },
      { name: 'Canva AI', use: 'Design med AI-hjälp' },
    ],
  },
  {
    branch: 'Försäljning & CRM',
    icon: TrendingUp,
    color: '#22c55e',
    tools: [
      { name: 'Salesforce Einstein', use: 'AI i CRM-flödet' },
      { name: 'HubSpot AI', use: 'Lead-scoring & e-post' },
      { name: 'Gong', use: 'Analys av säljsamtal' },
      { name: 'Lavender', use: 'AI-optimerade säljmejl' },
    ],
  },
  {
    branch: 'Programmering & IT',
    icon: Code2,
    color: '#3b82f6',
    tools: [
      { name: 'GitHub Copilot', use: 'Kodkomplettering i editorn' },
      { name: 'Cursor', use: 'AI-first kodredigerare' },
      { name: 'Tabnine', use: 'Lokal kodassistent' },
      { name: 'Replit AI', use: 'Kodning & deployment' },
    ],
  },
  {
    branch: 'HR & rekrytering',
    icon: Users,
    color: '#f59e0b',
    tools: [
      { name: 'Workday AI', use: 'HR-processer & analys' },
      { name: 'HireVue', use: 'AI-videoinsintervjuer' },
      { name: 'Textio', use: 'Inkluderande jobbtexter' },
      { name: 'Leena AI', use: 'Intern HR-bot' },
    ],
  },
  {
    branch: 'Analys & data',
    icon: BarChart3,
    color: '#8b5cf6',
    tools: [
      { name: 'Julius AI', use: 'Analysera Excel/CSV med AI' },
      { name: 'Tableau AI', use: 'Datavisualisering' },
      { name: 'Polymer', use: 'AI-driven dataanalys' },
      { name: 'Obviously AI', use: 'Prediktiv analys utan kod' },
    ],
  },
  {
    branch: 'Kundservice & support',
    icon: MessageSquare,
    color: '#06b6d4',
    tools: [
      { name: 'Intercom AI', use: 'AI-chatbot för support' },
      { name: 'Zendesk AI', use: 'Automatisk ärendehantering' },
      { name: 'Tidio', use: 'Chatbot för e-handel' },
      { name: 'Freshdesk AI', use: 'Supportautomatisering' },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// DELADE STILKOMPONENTER
// ─────────────────────────────────────────────────────────

const SlideShell = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={`min-h-full w-full overflow-y-auto ${dark ? 'bg-[#0f1623]' : 'bg-[#F8F7F4]'}`}>
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// SLIDE 1 – INTRO
// ─────────────────────────────────────────────────────────

const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(15,22,35,.93),rgba(23,31,50,.86))' }} />
    <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 py-16">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          MODUL 1 · DITT AI-TEAM
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Rekrytera rätt verktyg –{' '}
          <span className="text-[#FF5421]">bygg ditt AI-team</span>
        </h1>

        <AudioPlayer audioSrc="/audio/ai-team-intro.mp3" />

        <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
          Det finns hundratals AI-verktyg. Men du behöver inte alla.
          I det här avsnittet lär du dig navigera AI-kartan och välja de
          kolleger som faktiskt gör skillnad i din arbetsdag.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Globe,  title: '6 generella verktyg',  sub: 'ChatGPT, Claude, Copilot och fler' },
            { icon: Target, title: 'Branschspecifika',      sub: 'Rätt verktyg för din yrkesroll' },
            { icon: Award,  title: 'AI-kartan',             sub: 'Interaktiv översikt över hela ekosystemet' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
              <item.icon className="w-8 h-8 text-[#FF5421] mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <button onClick={onStart}
          className="bg-[#FF5421] text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-[#E04A1D] transition-all flex items-center gap-2">
          Börja utforska
          <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// SLIDE 2 – VAD ÄR SKILLNADEN? (textslide)
// ─────────────────────────────────────────────────────────

const VadArSkillnadenSlide = () => (
  <SlideShell>
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2"
      style={{ fontFamily: "'Nunito', sans-serif" }}>
      Alla AI-verktyg är inte likadana
    </h2>
    <p className="text-slate-500 text-sm mb-6">Förstå kartan innan du väljer ditt team</p>

    <AudioPlayer audioSrc="/audio/ai-skillnader.mp3" />

    <p className="text-slate-600 text-base leading-relaxed mb-6">
      Det är lätt att tro att "AI" är ett enda verktyg. Men precis som du inte använder
      en hammare för att skruva, passar olika AI-verktyg för olika uppgifter.
      Det finns <strong>generella assistenter</strong>, <strong>specialiserade branschverktyg</strong>
      och <strong>inbyggda AI-funktioner</strong> i program du redan använder.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {[
        {
          icon: '🧩',
          title: 'Generella assistenter',
          desc: 'ChatGPT, Claude, Gemini. Klarar det mesta – text, kod, analys, samtal. Bra startpunkt för alla.',
          color: 'border-orange-200 bg-orange-50',
        },
        {
          icon: '🔧',
          title: 'Inbyggd i dina appar',
          desc: 'Copilot i Word/Teams, Gemini i Google Docs. Du behöver inte byta verktyg – AI:n kommer till dig.',
          color: 'border-blue-200 bg-blue-50',
        },
        {
          icon: '🎯',
          title: 'Branschspecifika',
          desc: 'Jasper för marknadsföring, GitHub Copilot för kod, Gong för försäljning. Djup expertis i ett smalt område.',
          color: 'border-purple-200 bg-purple-50',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          className={`border rounded-xl p-4 shadow-sm ${item.color}`}>
          <div className="text-2xl mb-2">{item.icon}</div>
          <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
          <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="bg-slate-800 text-white rounded-xl p-4 sm:p-5">
      <p className="font-bold text-sm mb-1">💡 Rådet</p>
      <p className="text-sm text-white/80 leading-relaxed">
        Börja med ett generellt verktyg och lär känna det väl. Lägg sedan till
        branschspecifika verktyg när du vet vad du saknar. Att äga fem verktyg
        halvhjärtat är sämre än att behärska ett till fullo.
      </p>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 3 – INTERAKTIVA VERKTYGSKORT
// ─────────────────────────────────────────────────────────

const ToolCard = ({ tool, isSelected, onClick }: { tool: typeof AI_TOOLS[0]; isSelected: boolean; onClick: () => void }) => (
  <motion.button
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`text-left w-full rounded-2xl border-2 p-4 transition-all ${
      isSelected ? 'border-[#FF5421] shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300'
    }`}
    style={isSelected ? { background: 'rgba(255,84,33,0.04)' } : {}}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl">{tool.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-800 text-sm">{tool.name}</span>
          <span className="text-xs text-slate-400">{tool.maker}</span>
          {tool.freeVersion && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Gratis nivå</span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">{tool.tagline}</p>
      </div>
      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: tool.color }} />
    </div>
  </motion.button>
);

const ToolDetail = ({ tool, onClose }: { tool: typeof AI_TOOLS[0]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="bg-white rounded-2xl border-2 p-5 shadow-xl"
    style={{ borderColor: tool.color }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{tool.emoji}</span>
        <div>
          <h3 className="font-bold text-slate-800">{tool.name}</h3>
          <p className="text-xs text-slate-400">{tool.maker}</p>
        </div>
      </div>
      <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
        <X size={14} className="text-slate-500" />
      </button>
    </div>

    <p className="text-sm text-slate-600 leading-relaxed mb-4">{tool.description}</p>

    <div className="mb-3">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Bäst för</p>
      <div className="flex flex-wrap gap-1.5">
        {tool.bestFor.map(b => (
          <span key={b} className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: `${tool.color}15`, color: tool.color }}>
            {b}
          </span>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-xs font-bold text-green-600 mb-1.5">✓ Fördelar</p>
        <ul className="space-y-1">
          {tool.pros.map(p => (
            <li key={p} className="text-xs text-slate-600 flex items-start gap-1.5">
              <span className="text-green-500 mt-0.5 flex-shrink-0">+</span>{p}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-bold text-red-500 mb-1.5">✗ Begränsningar</p>
        <ul className="space-y-1">
          {tool.cons.map(c => (
            <li key={c} className="text-xs text-slate-600 flex items-start gap-1.5">
              <span className="text-red-400 mt-0.5 flex-shrink-0">−</span>{c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const AiToolsSlide = ({ onComplete }: { onComplete: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [viewed, setViewed]     = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    setSelected(prev => prev === id ? null : id);
    setViewed(prev => new Set([...prev, id]));
  };

  const selectedTool = AI_TOOLS.find(t => t.id === selected);
  const allViewed    = AI_TOOLS.every(t => viewed.has(t.id));

  return (
    <div className="min-h-full bg-[#F8F7F4] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14">

        <div className="mb-2">
          <span className="text-xs font-bold text-[#FF5421] uppercase tracking-widest">De generella</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Välj din AI-kollega
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Klicka på varje verktyg för att läsa mer om vad det är bra på – och när du ska undvika det.
        </p>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#FF5421' }}
              animate={{ width: `${(viewed.size / AI_TOOLS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs text-slate-400 flex-shrink-0">{viewed.size}/{AI_TOOLS.length} utforskade</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {AI_TOOLS.map(tool => (
            <div key={tool.id} className="relative">
              {viewed.has(tool.id) && (
                <div className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
              <ToolCard
                tool={tool}
                isSelected={selected === tool.id}
                onClick={() => handleSelect(tool.id)}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedTool && (
            <ToolDetail
              key={selectedTool.id}
              tool={selectedTool}
              onClose={() => setSelected(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allViewed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-slate-500 mb-3">Du har utforskat alla verktyg 🎉</p>
              <button
                onClick={onComplete}
                className="bg-[#FF5421] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#E04A1D] transition-all flex items-center gap-2 mx-auto"
              >
                Fortsätt till branschverktygen <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 4 – BRANSCHVERKTYG
// ─────────────────────────────────────────────────────────

const BranchToolsSlide = ({ onComplete }: { onComplete: () => void }) => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-[#F8F7F4] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">

        <div className="mb-2">
          <span className="text-xs font-bold text-[#FF5421] uppercase tracking-widest">De specialiserade</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          AI-verktyg per bransch & roll
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Generella verktyg klarar det mesta, men branschspecifika kan spara ännu mer tid
          när du vet vad du behöver.
        </p>

        <div className="space-y-3 mb-8">
          {BRANCH_TOOLS.map((branch) => {
            const Icon = branch.icon;
            const isOpen = open === branch.branch;
            return (
              <motion.div
                key={branch.branch}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : branch.branch)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${branch.color}18` }}>
                    <Icon size={18} style={{ color: branch.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{branch.branch}</p>
                    <p className="text-xs text-slate-400">{branch.tools.length} rekommenderade verktyg</p>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {branch.tools.map(tool => (
                          <div key={tool.name}
                            className="flex items-start gap-2.5 p-3 rounded-xl"
                            style={{ background: `${branch.color}08` }}>
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: branch.color }} />
                            <div>
                              <p className="text-sm font-semibold text-slate-700">{tool.name}</p>
                              <p className="text-xs text-slate-400">{tool.use}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-slate-800 text-white rounded-2xl p-5 mb-6">
          <p className="font-bold text-sm mb-2">🗺️ Det stora perspektivet</p>
          <p className="text-sm text-white/80 leading-relaxed">
            Listan ovan är ett urval – det finns tusentals AI-verktyg. Fokus för den här kursen
            är de <strong className="text-white">generella verktygen</strong> som alla kan använda.
            Branschspecifika verktyg lär du dig bäst genom att testa dem i din faktiska vardag.
          </p>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-[#FF5421] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#E04A1D] transition-all flex items-center justify-center gap-2"
        >
          Jag har koll på AI-kartan <CheckCircle size={16} />
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 5 – HUR VÄLJER JAG? (beslutsguide)
// ─────────────────────────────────────────────────────────

const HurVäljerJagSlide = () => (
  <SlideShell>
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2"
      style={{ fontFamily: "'Nunito', sans-serif" }}>
      Hur väljer jag rätt verktyg?
    </h2>
    <p className="text-slate-500 text-sm mb-6">Tre frågor som gör valet enkelt</p>

    <AudioPlayer audioSrc="/audio/valja-verktyg.mp3" />

    <div className="space-y-4 mb-6">
      {[
        {
          q: '1. Har mitt företag redan ett AI-avtal?',
          a: 'Börja alltid med det din arbetsgivare tillhandahåller. Copilot via Microsoft 365 eller Gemini via Google Workspace är ofta redan betalat och GDPR-säkrat.',
          icon: Shield,
          color: '#3b82f6',
        },
        {
          q: '2. Vilken typ av uppgift ska jag lösa?',
          a: 'Text och analys → ChatGPT eller Claude. Kod → Claude, ChatGPT eller DeepSeek. Aktuell research → Gemini. Branschspecifikt → utforska verktygen i din kategori.',
          icon: Target,
          color: '#FF5421',
        },
        {
          q: '3. Hur känslig är informationen?',
          a: 'Känslig kunddata, personuppgifter eller affärshemligheter ska inte läggas in i gratisversionerna utan att kontrollera datapolicyn. Nästa modul handlar om detta.',
          icon: Shield,
          color: '#ef4444',
        },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }} viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}15` }}>
              <Icon size={18} style={{ color: item.color }} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm mb-1">{item.q}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        );
      })}
    </div>

    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
      <p className="font-bold text-orange-900 text-sm mb-1">🎯 Din uppgift</p>
      <p className="text-orange-800 text-sm leading-relaxed">
        Välj <strong>ett verktyg</strong> att testa den här veckan. Installera det, skapa ett konto
        och ge det en arbetsuppgift du har just nu. Det är så du lär dig – inte genom att läsa om det.
      </p>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 6 – AVSNITTSSAMMANFATTNING
// ─────────────────────────────────────────────────────────

const SummarySlide = ({ onComplete }: { onComplete: () => void }) => (
  <div className="min-h-full flex items-center relative overflow-hidden">
    <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#0f1623]/92" />
    <div className="max-w-2xl mx-auto px-4 sm:px-8 relative z-10 py-16 w-full">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#FF5421] flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-white" />
          </div>
          <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
            AVSNITT KLART
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ditt AI-team är valt
          </h2>
          <p className="text-white/60 text-sm">Det här har du lärt dig i det här avsnittet</p>
        </div>

        <div className="space-y-3 mb-8">
          {[
            'AI-verktyg delas in i generella assistenter, inbyggda appar och branschspecifika verktyg',
            'ChatGPT, Claude, Gemini, Copilot, Mistral och DeepSeek – deras styrkor och begränsningar',
            'Vilka branschverktyg som finns för marknadsföring, försäljning, HR, kod och mer',
            'Tre frågor som hjälper dig välja rätt verktyg för rätt uppgift',
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <CheckCircle size={16} className="text-[#FF5421] flex-shrink-0 mt-0.5" />
              <span className="text-white/85 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/40 text-xs mb-4">Nästa: Vad är generativ AI? (Tekniken bakom, enkelt förklarat)</p>
          <button onClick={onComplete}
            className="bg-[#FF5421] text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-[#E04A1D] transition-all flex items-center gap-2 mx-auto">
            Fortsätt till modul 2
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────

const aiFaqs = [
  { question: 'Vilket AI-verktyg är bäst?', answer: 'Det beror på uppgiften. ChatGPT och Claude är starka allrounders. Copilot passar om du jobbar i Office 365. Välj ett och lär känna det väl.' },
  { question: 'Är gratisversionerna tillräckliga?', answer: 'Ja, för att komma igång. De betalde versionerna ger bättre svar, fler funktioner och högre användningsgränser – men gratisversionen räcker för att testa och lära sig.' },
  { question: 'Kan jag använda AI för känslig information?', answer: 'Det beror på verktygets datapolicy. Som standard – lägg inte in konfidentiell kunddata eller affärshemligheter i gratisversioner. Mer om detta i modul 3.' },
  { question: 'Kostar verktygen pengar?', answer: 'De flesta generella verktygen har en gratisnivå. Betalversioner kostar typiskt 20–30 USD/månad. Copilot ingår i Microsoft 365-licensen om din arbetsgivare har den.' },
];

const Module1AiTeam: React.FC = () => {
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

  const handleComplete = (id: string) => {
    setCompletedLessons(prev => new Set([...prev, id]));
    // Auto-advance to next slide
    setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
  };

  const slides = [
    {
      id: 'intro',
      title: 'Välkommen',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
      id: 'skillnaden',
      title: 'Inte alla är likadana',
      component: <VadArSkillnadenSlide />,
    },
    {
      id: 'verktyg',
      title: 'De generella verktygen',
      component: <AiToolsSlide onComplete={() => handleComplete('verktyg')} />,
    },
    {
      id: 'bransch',
      title: 'Branschverktyg',
      component: <BranchToolsSlide onComplete={() => handleComplete('bransch')} />,
    },
    {
      id: 'valja',
      title: 'Hur väljer jag?',
      component: <HurVäljerJagSlide />,
    },
    {
      id: 'summary',
      title: 'Sammanfattning',
      component: (
        <SummarySlide
          onComplete={() => handleComplete('summary')}
        />
      ),
    },
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
        faqs={aiFaqs}
        title="Vanliga frågor"
        subtitle="Svar på vanliga frågor om AI-verktyg"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default Module1AiTeam;