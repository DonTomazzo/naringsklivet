// src/modules/Styrelsekorkortet/Module0Introduktion.tsx
// Introduktionsmodul – styrelsen, vem får sitta i den, och aktuella lagändringar
// Samma struktur som Module3Gdpr, Module4Diskriminering, Module5AiBrf

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Award, Users, Scale, AlertTriangle,
  Lightbulb, HelpCircle, FileText, TrendingUp,
  Building, Gavel, Leaf, BarChart2, ChevronRight, Info
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer       from '../../components/AudioPlayer';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import AudioCTA          from '../../components/CourseElements/AudioCTA';
import LagandringarSection from '../../components/CourseElements/LagandringarSection';
import ValbarhetsSlide from '../../components/CourseElements/ValbarhetsSlide';
import MissuppfattningarSection from '../../components/CourseElements/MissuppfattningarSection';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Hur många ledamöter måste en BRF-styrelse ha?',
    answer: 'Enligt bostadsrättslagen ska styrelsen bestå av minst tre ledamöter. Exakt antal regleras i föreningens stadgar. Styrelsen väljs på föreningsstämman.',
  },
  {
    question: 'Kan en hyresgäst sitta i styrelsen?',
    answer: 'Nej. Endast bostadsrättsinnehavare (medlemmar i föreningen) får sitta i styrelsen. Hyresgäster i andrahand är inte medlemmar och har därför inte rätt att väljas in.',
  },
  {
    question: 'Vad innebär K3-övergången i praktiken för vår styrelse?',
    answer: 'Ni behöver anlita en revisor eller förvaltare som gör en komponentuppdelning av fastigheten – tak, stammar, fönster osv skrivs av separat. Det ger en mer rättvisande bild av fastighetens skick men kräver mer arbete. Gäller räkenskapsår som börjar efter 31 december 2025.',
  },
  {
    question: 'Måste vi momsregistrera oss om vi debiterar el individuellt?',
    answer: 'Ja, om omsättningen av el, vatten eller laddning till medlemmarna överstiger 80 000 kr per år och baseras på faktisk förbrukning (IMD) ska föreningen momsregistreras. Kontakta er revisor för en bedömning.',
  },
  {
    question: 'När måste vi ha fastighetsnära insamling av förpackningar?',
    answer: 'Senast januari 2027. Från 2024 är det redan krav på matavfallssortering. Börja planera om ert miljörum nu om det behöver byggas om för att rymma fler kärl.',
  },
];

// ─────────────────────────────────────────────────────────
// DELADE STILKOMPONENTER
// ─────────────────────────────────────────────────────────
const InfoBox = ({
  color = 'blue', icon, title, children,
}: {
  color?: 'blue' | 'orange' | 'red' | 'green' | 'slate';
  icon?: string; title?: string; children: React.ReactNode;
}) => {
  const styles = {
    blue:   'bg-blue-50   border-blue-200   text-blue-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    red:    'bg-red-50    border-red-200    text-red-900',
    green:  'bg-green-50  border-green-200  text-green-900',
    slate:  'bg-slate-800 border-slate-700  text-white',
  };
  return (
    <div className={`border rounded-xl p-4 sm:p-5 ${styles[color]}`}>
      {title && <p className="font-bold mb-2 text-sm sm:text-base">{icon} {title}</p>}
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
};

const SlideShell = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={`min-h-full w-full overflow-y-auto ${dark ? 'bg-[#0f1623]' : 'bg-[#F8F7F4]'}`}>
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 pb-24 sm:pb-28">
      {children}
    </div>
  </div>
);

const SlidePhaseBadge = ({ text, dark = false }: { text: string; dark?: boolean }) => (
  <div className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide uppercase ${
    dark ? 'bg-[#FF5421]/20 text-[#FF5421] border border-[#FF5421]/30'
         : 'bg-[#FF5421]/10 text-[#FF5421]'
  }`}>
    {text}
  </div>
);

const SlideHeading = ({ icon: Icon, title, dark = false }: {
  icon: React.ElementType; title: string; dark?: boolean;
}) => (
  <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-3 leading-tight ${
    dark ? 'text-white' : 'text-slate-800'
  }`}>
    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF5421] flex-shrink-0" />
    {title}
  </h2>
);

// ─────────────────────────────────────────────────────────
// SLIDE 1 – INTRO
// ─────────────────────────────────────────────────────────
const LAG_DATA = [
  {
    år: '2023', label: 'Rösträtt', color: 'bg-blue-500', ring: 'ring-blue-400',
    titel: 'En röst per lägenhet',
    text: 'Från 1 januari 2023 gäller att varje bostadslägenhet ger en röst på stämman – oavsett hur många lägenheter en person äger. Äldre stadgar som tillät fler röster är överspelda av lagen.',
  },
  {
    år: '2024', label: 'Matavfall', color: 'bg-green-500', ring: 'ring-green-400',
    titel: 'Obligatorisk matavfallssortering',
    text: 'Sedan januari 2024 är det lag på att alla hushåll – inklusive BRF:er – ska sortera ut matavfall separat. Föreningen ansvarar för att kärl finns och att de boende kan göra rätt.',
  },
  {
    år: '2024–', label: 'Moms', color: 'bg-amber-500', ring: 'ring-amber-400',
    titel: 'Moms på el, vatten & parkering',
    text: 'Högsta förvaltningsdomstolen har fastställt att individuell debitering av el, vatten eller laddning baserad på faktisk förbrukning (IMD) är momspliktig om omsättningen överstiger 80 000 kr/år. Parkeringsregler skärps ytterligare hösten 2026.',
  },
  {
    år: '2026', label: 'K2→K3', color: 'bg-[#FF5421]', ring: 'ring-orange-400',
    titel: 'Från K2 till K3 i redovisning',
    text: 'För räkenskapsår som börjar efter 31 december 2025 får BRF:er inte längre använda K2. Alla måste gå över till K3 med komponentavskrivning – fastigheten delas upp i delar (tak, stammar, fönster) som skrivs av separat utifrån verklig livslängd.',
  },
  {
    år: '2027', label: 'Förpackningar', color: 'bg-purple-500', ring: 'ring-purple-400',
    titel: 'Fastighetsnära insamling av förpackningar',
    text: 'Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar (plast, papper, metall, glas) i eller direkt i anslutning till fastigheten. Många föreningar behöver bygga om sina miljörum redan nu.',
  },
];

const IntroSlide = ({ onStart }: { onStart: () => void }) => {
  const [played, setPlayed] = useState(false);
  const [activeCircle, setActiveCircle] = useState<number | null>(null);

  return (
    // Scrollbar container – INGEN flex items-center, INGEN overflow-hidden
    <div className="min-h-full w-full overflow-y-auto relative">

      {/* Bakgrund – pointer-events-none så den aldrig fångar klick */}
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg,rgba(15,22,35,.93),rgba(23,31,50,.86))' }}
      />

      {/* Innehåll – pb-28 för att ge plats åt nav-knapparna */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-16 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Välkommen
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Introduktion till <span className="text-[#FF5421]">Styrelsekörkortet</span>
          </h1>

          <div className="relative mb-8 max-w-xl">
            <div className="absolute right-full mr-8 top-0 -mt-12 hidden lg:block whitespace-nowrap">
              <AudioCTA visible={!played} direction="right" />
            </div>
            <AudioPlayer audioSrc="/audio/test1.mp3" onPlay={() => setPlayed(true)} />
          </div>

          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Välkommen som förtroendevald i din bostadsrättsförening. Det här avsnittet
            ger dig grunden – vad styrelsen är, vem som får sitta i den och vilka
            <span className="text-[#FF5421] font-semibold"> lagändringar</span> du
            behöver ha koll på just nu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Users,      title: 'Styrelsen',           sub: 'Roller, ansvar och valbarhetsregler' },
              { icon: Scale,      title: 'Aktuell lagstiftning', sub: '5 viktiga förändringar 2023–2027' },
              { icon: TrendingUp, title: 'Framåtblick',          sub: 'Vad ni behöver planera för redan nu' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }}
                className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
                <item.icon className="w-9 h-9 text-[#FF5421] mb-3" />
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{item.sub}</p>
              </motion.div>
            ))}
          </div>

         

        </motion.div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────────────────
// SLIDE 3 – VAD ÄR STYRELSEN?
// ─────────────────────────────────────────────────────────
const VadArStyrelsenSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Om styrelsen · 1" dark />
    <SlideHeading icon={Building} title="Vad är en BRF-styrelse?" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Styrelsen är föreningens verkställande organ – den som sköter den löpande
      förvaltningen mellan stämmorna. Det är ett uppdrag med både ansvar och befogenheter.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          title: 'Styrelsens uppdrag',
          icon: Gavel,
          border: 'border-[#FF5421]/30',
          bg: 'bg-[#FF5421]/5',
          items: [
            'Förvalta föreningens fastighet och ekonomi',
            'Verkställa stämmans beslut',
            'Upprätta årsredovisning och budget',
            'Hantera in- och utträde av medlemmar',
            'Teckna avtal med leverantörer',
            'Upprätthålla ordning och trivsel',
          ],
        },
        {
          title: 'Styrelsens sammansättning',
          icon: Users,
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/5',
          items: [
            'Minst 3 ledamöter (enligt BRL)',
            'Exakt antal bestäms i stadgarna',
            'Väljs på ordinarie föreningsstämma',
            'Mandatperiod enligt stadgarna (1–4 år)',
            'Minst en suppleant rekommenderas',
            'Styrelsen utser ordförande inom sig (om inte stämman gör det)',
          ],
        },
      ].map((col, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }} viewport={{ once: true }}
          className={`border ${col.border} ${col.bg} rounded-xl p-4 sm:p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <col.icon className="w-5 h-5 text-[#FF5421]" />
            <h4 className="text-white font-bold text-sm sm:text-base">{col.title}</h4>
          </div>
          <ul className="space-y-2">
            {col.items.map((item, j) => (
              <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                <ChevronRight className="w-3 h-3 text-[#FF5421] mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    {/* Rollerna */}
    <h3 className="text-white font-bold text-base sm:text-lg mb-3">De centrala rollerna</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {[
        { roll: 'Ordförande', ansvar: 'Leder möten, är föreningens ansikte utåt och har det övergripande ansvaret för styrelsens arbete.' },
        { roll: 'Vice ordförande', ansvar: 'Träder in när ordföranden är frånvarande. Viktigt att alla vet vem det är.' },
        { roll: 'Sekreterare', ansvar: 'Skriver protokoll, hanterar kallelser och ansvarar för föreningens dokumentation.' },
        { roll: 'Kassör', ansvar: 'Ansvarar för bokföring, betalningar, avgiftsavier och ekonomisk rapportering.' },
      ].map((r, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-[#FF5421] font-bold text-xs uppercase tracking-wide mb-1">{r.roll}</p>
          <p className="text-gray-300 text-sm leading-relaxed">{r.ansvar}</p>
        </div>
      ))}
    </div>

    <InfoBox color="slate" icon="⚖️" title="Kollektivt ansvar">
      Styrelsen fattar beslut gemensamt. En enskild ledamot kan inte agera på egen hand
      – beslut kräver majoritet. Alla ledamöter delar ansvaret för styrelsens beslut,
      även om man röstat emot, om man inte reserverat sig i protokollet.
    </InfoBox>
  </SlideShell>
);



// ─────────────────────────────────────────────────────────
// SLIDE 4 – RÖSTRÄTT (2023)
// ─────────────────────────────────────────────────────────
const RostrattSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Lagändring 2023" dark />
    <SlideHeading icon={Gavel} title="Rösträtt: En röst per lägenhet" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
      <span className="w-2 h-2 bg-blue-400 rounded-full" />
      <span className="text-blue-300 text-sm font-semibold">Trädde i kraft 1 januari 2023 – "Tryggare bostadsrätt"</span>
    </div>

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      En av de mest betydelsefulla demokratireformerna för bostadsrättsföreningar på länge.
      Lagen syftar till att förhindra att enskilda storägare kan dominera en stämma.
    </p>

    <div className="space-y-4 mb-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#FF5421]" />
          Huvudregeln
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 font-bold text-xs uppercase tracking-wide mb-2">Gäller nu</p>
            <p className="text-white text-sm font-semibold mb-1">En röst per lägenhet</p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Varje bostadslägenhet ger en röst på stämman – oavsett hur många lägenheter
              en person eller ett företag äger.
            </p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 font-bold text-xs uppercase tracking-wide mb-2">Gäller inte längre</p>
            <p className="text-white text-sm font-semibold mb-1">Fler röster vid fler lägenheter</p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Äldre stadgar som tillät fler röster vid innehav av flera lägenheter
              är nu överspelda av lagen.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="text-white font-bold text-base mb-3">Vad gäller för samägda lägenheter?</h3>
        <div className="space-y-3">
          {[
            { situation: 'Lars och Karin äger lgh 3A gemensamt', röster: '1 röst gemensamt', ok: true },
            { situation: 'Byggbolaget AB äger lgh 1B och 2B',    röster: '1 röst per lägenhet = 2 röster', ok: true },
            { situation: 'Erik äger 4 lägenheter',               röster: '4 röster (en per lägenhet)', ok: true },
          ].map((ex, i) => (
            <div key={i} className="flex items-start justify-between gap-4 bg-white/5 rounded-lg p-3">
              <p className="text-gray-300 text-sm">{ex.situation}</p>
              <div className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                ex.ok ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {ex.röster}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
        <h3 className="text-amber-300 font-bold text-sm mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Undantag – lokaler, garage och förråd
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          För lokaler, garageplatser och förråd kan stadgarna fortfarande reglera
          rösträtten annorlunda. Kontrollera era aktuella stadgar – och om de innehåller
          äldre rösträttsregler för bostadslägenheter, uppdatera dem på nästa stämma.
        </p>
      </div>
    </div>

    <InfoBox color="slate" icon="📋" title="Åtgärd för er styrelse">
      Gå igenom era stadgar. Om de innehåller regler om fler röster vid innehav av
      flera bostadslägenheter är dessa nu ogiltiga – men det är ändå god praxis att
      uppdatera stadgarna på kommande stämma så att de stämmer överens med lagen.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 5 – K2 → K3 (2026)
// ─────────────────────────────────────────────────────────
const K3Slide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Lagändring 2025/2026" />
    <SlideHeading icon={BarChart2} title="Redovisning: Från K2 till K3" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <div className="inline-flex items-center gap-2 bg-[#FF5421]/10 border border-[#FF5421]/20 rounded-full px-4 py-2 mb-6">
      <span className="w-2 h-2 bg-[#FF5421] rounded-full animate-pulse" />
      <span className="text-[#FF5421] text-sm font-semibold">Beslut 2025 – krav från räkenskapsår som börjar efter 31 dec 2025</span>
    </div>

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Bokföringsnämnden (BFN) har beslutat om stora förändringar i hur BRF:er ska
      redovisa sin ekonomi. Den största förändringen: <strong>komponentavskrivning</strong>.
    </p>

    {/* K2 vs K3 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          titel: 'K2 – det gamla regelverket',
          icon: '📦',
          border: 'border-slate-300',
          bg: 'bg-slate-50',
          textColor: 'text-slate-700',
          badgeColor: 'bg-slate-200 text-slate-600',
          badge: 'Upphör efter 2025',
          punkter: [
            'Enklare och mer schablonmässigt',
            'Fastigheten skrivs av som en helhet',
            'Lägre administrativ börda',
            'Ger inte alltid en rättvisande bild av husets skick',
          ],
        },
        {
          titel: 'K3 – det nya regelverket',
          icon: '🏗️',
          border: 'border-[#FF5421]',
          bg: 'bg-orange-50',
          textColor: 'text-orange-900',
          badgeColor: 'bg-[#FF5421] text-white',
          badge: 'Krav från 2026',
          punkter: [
            'Komponentavskrivning – varje byggnadsdel separat',
            'Mer rättvisande bild av fastighetens skick',
            'Kräver komponentuppdelning av fastigheten',
            'Mer administration men bättre underlag för underhållsplan',
          ],
        },
      ].map((col, i) => (
        <div key={i} className={`bg-white border-2 ${col.border} rounded-xl p-4 sm:p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{col.icon}</span>
              <h4 className={`font-bold text-sm sm:text-base ${col.textColor}`}>{col.titel}</h4>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${col.badgeColor}`}>
              {col.badge}
            </span>
          </div>
          <ul className="space-y-2">
            {col.punkter.map((p, j) => (
              <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-[#FF5421] mt-0.5 flex-shrink-0">•</span>{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Komponentavskrivning förklarat */}
    <div className="bg-[#171f32] rounded-2xl p-5 mb-6">
      <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
        <Building className="w-5 h-5 text-[#FF5421]" />
        Komponentavskrivning – ett praktiskt exempel
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Istället för att skriva av hela fastigheten över 50 år delas den upp i
        komponenter med olika livslängd:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { del: 'Stomme',    år: '100 år', icon: '🏛️' },
          { del: 'Tak',       år: '30 år',  icon: '🏠' },
          { del: 'Fönster',   år: '25 år',  icon: '🪟' },
          { del: 'Stammar',   år: '50 år',  icon: '🔧' },
          { del: 'Hissar',    år: '20 år',  icon: '🛗' },
          { del: 'Fasad',     år: '40 år',  icon: '🧱' },
        ].map((k, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-2xl block mb-1">{k.icon}</span>
            <p className="text-white font-bold text-xs">{k.del}</p>
            <p className="text-[#FF5421] text-xs">≈ {k.år}</p>
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="orange" icon="📅" title="Vad ni behöver göra">
      Kontakta er revisor eller förvaltare redan nu för att starta en
      komponentuppdelning av fastigheten. Ju längre ni väntar, desto mer stressad
      blir övergången. Räkna med ökade redovisningskostnader det första året.
    </InfoBox>
  </SlideShell>
);



// ─────────────────────────────────────────────────────────
// SLIDE 6 – MOMS PÅ EL, VATTEN & PARKERING
// ─────────────────────────────────────────────────────────
const MomsSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Lagändring 2024–2026" dark />
    <SlideHeading icon={TrendingUp} title="Moms på el, vatten och parkering" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Momsfrågan har länge varit en följetång i domstolarna. Nu finns tydligare besked –
      och fler BRF:er berörs än vad många tror.
    </p>

    <div className="space-y-4 mb-6">
      {/* IMD */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">⚡</span>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg">
              IMD – Individuell mätning och debitering
            </h3>
            <p className="text-gray-400 text-sm">El, vatten och laddning</p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-4">
          <p className="text-amber-300 font-bold text-sm mb-1">
            Högsta förvaltningsdomstolens dom
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Om föreningen säljer el, vatten eller elbilsladdning till medlemmar
            baserat på <strong className="text-white">faktisk förbrukning</strong>,
            räknas det som en momspliktig tjänst.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 font-bold text-xs uppercase tracking-wide mb-2">Momspliktigt</p>
            <ul className="space-y-1">
              {[
                'El debiterat efter faktisk förbrukning',
                'Vatten mätt individuellt per lägenhet',
                'Elbilsladdning i garaget',
              ].map((it, i) => (
                <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>{it}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <p className="text-green-400 font-bold text-xs uppercase tracking-wide mb-2">Ej momspliktigt</p>
            <ul className="space-y-1">
              {[
                'El ingår i avgiften (ej individuellt mätt)',
                'Vatten ingår i månadsavgiften',
                'Värme via fjärrvärme i avgiften',
              ].map((it, i) => (
                <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5">•</span>{it}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 bg-white/5 rounded-lg p-3">
          <p className="text-white text-sm">
            <span className="text-[#FF5421] font-bold">Gränsvärde: </span>
            <span className="text-gray-300">Momsregistrering krävs om omsättningen överstiger </span>
            <span className="text-white font-bold">80 000 kr/år</span>
          </p>
        </div>
      </div>

      {/* Parkering */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">🅿️</span>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg">
              Parkering – nya regler oktober 2026
            </h3>
            <p className="text-gray-400 text-sm">Fler typer av parkeringsupplåtelse blir momspliktiga</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Från hösten 2026 gäller nya regler som gör att fler typer av parkeringsupplåtelser
          till medlemmar räknas som momspliktig tjänst. Detta påverkar hyresnivåerna
          och föreningens administration.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
          <p className="text-amber-300 text-sm">
            💡 Börja kartlägga er parkeringssituation nu och diskutera med er revisor
            om ni berörs av de nya reglerna.
          </p>
        </div>
      </div>
    </div>

    <InfoBox color="slate" icon="📊" title="Åtgärd för er styrelse">
      Kontakta er revisor och gå igenom hur ni debiterar el, vatten och parkering.
      Om ni redan har IMD – kontrollera om ni passerar 80 000 kr-gränsen och behöver
      momsregistrera er. Vänta inte tills Skatteverket hör av sig.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 7 – SOPOR & MILJÖRUM
// ─────────────────────────────────────────────────────────
const SoporSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Lagändring 2024 & 2027" />
    <SlideHeading icon={Leaf} title="Sopor och miljörum" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Hanteringen av avfall har blivit ett lagkrav snarare än ett frivilligt val för
      att vara "miljövänlig". Två viktiga datum gäller – ett har redan passerat.
    </p>

    <div className="space-y-5 mb-6">
      {/* Matavfall 2024 */}
      <div className="bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-green-500 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥗</span>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">Obligatorisk matavfallssortering</p>
              <p className="text-green-100 text-xs">Gäller sedan januari 2024</p>
            </div>
          </div>
          <span className="bg-white text-green-700 font-black text-xs px-3 py-1 rounded-full">
            GÄLLER NU
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Det är nu lag på att alla hushåll – inklusive de i BRF:er – ska sortera ut
            matavfall separat. Föreningen ansvarar för att:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: '🗑️', text: 'Det finns separata kärl för matavfall' },
              { icon: '📍', text: 'Kärlen är lättillgängliga för de boende' },
              { icon: '📋', text: 'Informera de boende om hur sorteringen fungerar' },
            ].map((item, i) => (
              <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <span className="text-2xl block mb-1">{item.icon}</span>
                <p className="text-green-800 text-xs leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fastighetsnära insamling 2027 */}
      <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-purple-600 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">♻️</span>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">Fastighetsnära insamling av förpackningar</p>
              <p className="text-purple-200 text-xs">Krav senast januari 2027</p>
            </div>
          </div>
          <span className="bg-white text-purple-700 font-black text-xs px-3 py-1 rounded-full">
            PLANERA NU
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Senast januari 2027 ska alla BRF:er erbjuda insamling av förpackningar
            <strong> i eller i direkt anslutning till fastigheten</strong>. Det innebär
            att ni behöver plats för kärl för:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { material: 'Plast', icon: '🧴' },
              { material: 'Papper', icon: '📦' },
              { material: 'Metall', icon: '🥫' },
              { material: 'Glas', icon: '🫙' },
            ].map((m, i) => (
              <div key={i} className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
                <span className="text-2xl block mb-1">{m.icon}</span>
                <p className="text-purple-800 text-xs font-bold">{m.material}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-amber-800 text-sm">
              <span className="font-bold">⚠️ Många föreningar behöver bygga om sina miljörum</span> för att
              få plats med fler kärl. Påbörja planering, budgetering och eventuellt bygglov redan nu.
            </p>
          </div>
        </div>
      </div>
    </div>

    <InfoBox color="blue" icon="📅" title="Tidplan att förhålla sig till">
      <div className="space-y-1">
        <p><strong>2024:</strong> Matavfallssortering ska fungera – kontrollera att ni uppfyller kravet.</p>
        <p><strong>2025:</strong> Planera om ert miljörum och ta in offerter.</p>
        <p><strong>2026:</strong> Genomför ombyggnad om nödvändigt.</p>
        <p><strong>Januari 2027:</strong> Fastighetsnära förpackningsinsamling ska vara på plats.</p>
      </div>
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 8 – SAMMANFATTNING & NÄSTA STEG
// ─────────────────────────────────────────────────────────
const SammanfattningSlide = ({ isDone, onComplete }: {
  isDone: boolean; onComplete: (id: string) => void;
}) => {
  const [checkat, setCheckat] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    const next = new Set(checkat);
    next.has(i) ? next.delete(i) : next.add(i);
    setCheckat(next);
    if (next.size === atgarder.length) onComplete('sammanfattning');
  };

  const atgarder = [
    { text: 'Gå igenom era stadgar – innehåller de äldre rösträttsregler?', kategori: 'Röstättt 2023' },
    { text: 'Kontakta er revisor om K3-övergång och komponentuppdelning', kategori: 'K3 2026' },
    { text: 'Kartlägg om föreningen debiterar el/vatten individuellt (IMD)', kategori: 'Moms' },
    { text: 'Kontrollera parkeringssituation inför momsregler 2026', kategori: 'Moms' },
    { text: 'Bekräfta att matavfallssortering fungerar i er fastighet', kategori: 'Miljö 2024' },
    { text: 'Planera och budgetera om av miljörum inför 2027', kategori: 'Miljö 2027' },
  ];

  const progress = Math.round((checkat.size / atgarder.length) * 100);

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1623]/92" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
              Sammanfattning
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Er checklista för aktuella lagkrav
            </h2>
            <p className="text-white/50 text-sm">
              Markera av punkterna när ni har tagit tag i dem
            </p>
          </div>

          {/* Progressbar */}
          <div className="bg-white/10 rounded-full h-2 mb-2">
            <motion.div
              className="h-full bg-[#FF5421] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-white/40 text-xs text-right mb-6">{checkat.size} / {atgarder.length} avklarade</p>

          <div className="space-y-3 mb-6">
            {atgarder.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={() => toggle(i)}
                className={`w-full rounded-xl p-4 text-left border-2 transition-all flex items-start gap-3 ${
                  checkat.has(i)
                    ? 'bg-green-500/10 border-green-500/40'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  checkat.has(i) ? 'bg-green-500 border-green-500' : 'border-white/30'
                }`}>
                  {checkat.has(i) && <CheckCircle className="w-3 h-3 text-white fill-white" />}
                </div>
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${
                    item.kategori.includes('Röst') ? 'bg-blue-500/20 text-blue-300' :
                    item.kategori.includes('K3')   ? 'bg-[#FF5421]/20 text-[#FF5421]' :
                    item.kategori.includes('Moms') ? 'bg-amber-500/20 text-amber-300' :
                                                     'bg-green-500/20 text-green-300'
                  }`}>
                    {item.kategori}
                  </span>
                  <span className={`text-sm ${checkat.has(i) ? 'text-green-300 line-through' : 'text-gray-200'}`}>
                    {item.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border-2 border-green-400 rounded-xl p-6 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Introduktionen klar!</h3>
                <p className="text-white/60 text-sm">
                  Du har gått igenom alla lagändringar och er styrelses grundläggande
                  ansvar. Fortsätt till nästa avsnitt.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────
const Module0Introduktion: React.FC = () => {
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
      title: 'Välkommen',
      videoUrl: 'https://player.vimeo.com/video/123456789',
  videoTitle: 'Välkommen till kursen',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} />,
    },
    {
  id: 'valbarhet',
  title: 'Vem får sitta i styrelsen?',
  audioSrc: '/audio/lagandringar.mp3',
  component: <ValbarhetsSlide />,
},
    {
      id: 'lagändringar',
      title: 'Aktuella lagändringar',
      component: (
        <div className="min-h-full relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14 pb-24">
            <div className="mb-6 text-center">
  <p className="font-bold text-white text-xl sm:text-2xl mb-1">Aktuella lagändringar 2023–2027</p>
  <p className="text-white/60 text-sm">Klicka på varje cirkel för att läsa mer</p>
</div>
            <LagandringarSection />
          </div>
        </div>
      ),
    },
    
    {
      id: 'vad-ar-styrelsen',
      title: 'Vad är styrelsen?',
      component: <VadArStyrelsenSlide />,
    },
    {
  id: 'missuppfattningar',
  title: '10 vanliga misstag',
  component: (
    <div className="min-h-full relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14 pb-24">
        <div className="mb-6">
          <p className="font-bold text-white text-xl sm:text-2xl mb-1">
            10 vanliga misstag i BRF-styrelsen
          </p>
          <p className="text-white/60 text-sm">
            Klicka på varje cirkel för att läsa mer
          </p>
        </div>
        <MissuppfattningarSection />
      </div>
    </div>
  ),
},
    {
      id: 'valbarhet',
      title: 'Vem får sitta i styrelsen?',
      component: <ValbarhetsSlide />,
    },
    {
      id: 'rostratt',
      title: 'Rösträtt – en röst per lägenhet',
      component: <RostrattSlide />,
    },
    {
      id: 'k3',
      title: 'K2 → K3-övergången',
      component: <K3Slide />,
    },
    {
      id: 'moms',
      title: 'Moms på el, vatten & parkering',
      component: <MomsSlide />,
    },
    {
      id: 'sopor',
      title: 'Sopor och miljörum',
      component: <SoporSlide />,
    },
    {
      id: 'sammanfattning',
      title: 'Checklista',
      component: (
        <SammanfattningSlide
          isDone={completedLessons.has('sammanfattning')}
          onComplete={handleComplete}
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
        faqs={MODULE_FAQ}
        title="Vanliga frågor om styrelsen"
        subtitle="Svar på de vanligaste frågorna om styrelsearbete och lagkrav"
        buttonColor="#FF5421"
      />
    </div>
  );
};

export default Module0Introduktion;