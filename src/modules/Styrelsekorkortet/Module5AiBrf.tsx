// src/modules/Styrelsekorkortet/Module5AiBrf.tsx
// Slide-baserad AI-modul – samma struktur som Module3Gdpr & Module4Diskriminering
// AudioPlayer på varje slide – byt ut audioSrc mot rätt fil när inspelning är klar

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, CheckCircle, Award, Shield, Zap, Users,
  MessageSquare, FileText, Mail, BarChart2, HelpCircle,
  Lightbulb, Clock, Bot, Search, Star, AlertTriangle, Lock
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer       from '../../components/AudioPlayer';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import AudioCTA          from '../../components/CourseElements/AudioCTA';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Passar kursen mig som aldrig använt AI?',
    answer: 'Absolut. Kursen är skapad för den som är skeptisk eller nybörjare. Vi börjar från noll – ingen teknisk bakgrund krävs.',
  },
  {
    question: 'Behöver vi köpa AI-verktyg?',
    answer: 'Nej. Vi visar hur ni kommer igång med gratisversioner. En Plus-prenumeration (ca 200 kr/mån) rekommenderas men är inget krav.',
  },
  {
    question: 'Är det GDPR-säkert att använda AI i styrelsearbetet?',
    answer: 'Det beror på verktyget och hur ni använder det. Vi går igenom vad som är säkert, vad ni ska undvika och vilka inställningar som skyddar era medlemmars uppgifter.',
  },
  {
    question: 'Kan hela styrelsen delta?',
    answer: 'Ja – och det rekommenderas. Kurspriset gäller per styrelse, oavsett hur många ledamöter ni är.',
  },
  {
    question: 'Hur lång tid tar det att genomföra kursen?',
    answer: '3 timmar live-genomgång ingår, plus onlinemoduler du gör i din egen takt. De flesta är klara på 2–3 veckor.',
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
const IntroSlide = ({ onStart, onQuizOpen }: { onStart: () => void; onQuizOpen: () => void }) => {
  const [played, setPlayed] = useState(false);

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80"
        alt="AI bakgrund"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(15,22,35,.93),rgba(23,31,50,.86))' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 py-16 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Inledning
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            AI för <span className="text-[#FF5421]">BRF-styrelsen</span>
          </h1>

          <div className="relative mb-8 max-w-xl">
            <div className="absolute right-full mr-8 top-0 -mt-12 hidden lg:block whitespace-nowrap">
              <AudioCTA visible={!played} direction="right" />
            </div>
            <div className="w-full">
              <AudioPlayer audioSrc="/audio/test1.mp3" onPlay={() => setPlayed(true)} />
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Styrelsearbete i en BRF är ofta ett tidsödande uppdrag – men det behöver inte vara så.
            Den här kursen handlar inte bara om teknik, den handlar om att ge er styrelse
            <span className="text-[#FF5421] font-semibold"> superkrafter</span>. Inga tekniska
            förkunskaper krävs – vi börjar från noll.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Bot,      title: '8 Avsnitt',          sub: 'Från AI-grunderna till upphandling och juridik' },
              { icon: Clock,    title: 'Online + Live',       sub: '3 tim live-session + moduler i din egen takt' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }}
                className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
                <item.icon className="w-9 h-9 text-[#FF5421] mb-3" />
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{item.sub}</p>
              </motion.div>
            ))}

            <motion.a
              href="/pdf/AI_BRF_Kursmaterial.pdf"
              download="AI_BRF_Kursmaterial.pdf"
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 block"
            >
              <Award className="w-9 h-9 text-[#FF5421] mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">Ladda ner kursmaterial</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Mallbank med färdiga prompter ingår</p>
            </motion.a>
          </div>

          {/* Tre löften */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: '⚡', label: 'Eliminera tidstjuvarna', desc: 'Automatisera det som tar timmar' },
              { icon: '🎯', label: 'Strategiskt bollplank',  desc: 'Granska offerter och avtal med AI' },
              { icon: '🔒', label: 'Total kontroll',         desc: 'Vi visar fallgroparna – gör rätt från start' },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{p.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 2 – VAD ÄR AI? (Avsnitt 01)
// ─────────────────────────────────────────────────────────
const VadArAiSlide = () => {
  const [active, setActive] = useState<number | null>(null);

  const begrepp = [
    {
      term: 'AI',
      icon: '🤖',
      kort: 'Artificiell intelligens',
      lång: 'Program som kan utföra uppgifter som normalt kräver mänsklig intelligens – som att förstå text, sammanfatta dokument eller svara på frågor.',
    },
    {
      term: 'LLM',
      icon: '📚',
      kort: 'Stor språkmodell',
      lång: 'Grunden bakom ChatGPT, Claude och Copilot. Tränad på enorma mängder text och kan generera, sammanfatta och analysera skriven text.',
    },
    {
      term: 'Prompt',
      icon: '💬',
      kort: 'Din instruktion till AI',
      lång: 'Det du skriver till AI:n. En bra prompt ger ett bra svar. En vag prompt ger ett vagt svar. Vi lär er skriva bra prompter i avsnitt 04.',
    },
    {
      term: 'Hallucination',
      icon: '⚠️',
      kort: 'När AI hittar på',
      lång: 'AI kan ibland presentera felaktig information med stor säkerhet. Kontrollera alltid viktiga uppgifter – särskilt juridik, datum och siffror.',
    },
    {
      term: 'Kontextfönster',
      icon: '🪟',
      kort: 'AI:ns arbetsminne',
      lång: 'Hur mycket text AI:n kan "hålla i huvudet" under ett samtal. Moderna modeller klarar långa dokument – men minnet nollställs vid ny chatt.',
    },
    {
      term: 'Generativ AI',
      icon: '✨',
      kort: 'AI som skapar nytt',
      lång: 'Till skillnad från äldre AI som bara klassificerar, kan generativ AI skapa ny text, bilder och kod – t.ex. skriva ett störningsbrev åt er.',
    },
  ];

  return (
    <SlideShell dark>
      <SlidePhaseBadge text="Avsnitt 01" dark />
      <SlideHeading icon={Bot} title="Vad är AI – och vad är det inte?" dark />

      <AudioPlayer audioSrc="/audio/test1.mp3" />

      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
        Inga tekniska förkunskaper krävs. Vi börjar från noll och förklarar vad AI
        <em> faktiskt</em> kan göra för en BRF-styrelse – konkret, praktiskt och utan jargong.
        Klicka på ett begrepp för att läsa mer.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {begrepp.map((b, i) => (
          <motion.button key={i}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActive(active === i ? null : i)}
            className={`rounded-xl p-4 text-left border-2 transition-all ${
              active === i
                ? 'bg-[#FF5421] border-[#FF5421] text-white shadow-lg'
                : 'bg-white/5 border-white/15 text-gray-200 hover:border-[#FF5421]/50'
            }`}>
            <span className="text-2xl block mb-2">{b.icon}</span>
            <span className="font-black text-base block">{b.term}</span>
            <span className="text-xs opacity-70">{b.kort}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div key={active}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-white/5 border border-white/20 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{begrepp[active].icon}</span>
              <div>
                <p className="text-white font-black text-lg">{begrepp[active].term}</p>
                <p className="text-[#FF5421] text-sm font-medium">{begrepp[active].kort}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{begrepp[active].lång}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-white font-bold mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#FF5421]" />
          Vad AI är bra på i en BRF
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Sammanfatta långa dokument på sekunder',
            'Skriva utkast till brev och protokoll',
            'Förklara juridiska paragrafer på klarspråk',
            'Generera checklistor och dagordningar',
            'Jämföra alternativ och strukturera beslut',
            'Svara på frågor om BRL och stadgar',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#FF5421] mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 3 – SPARA TID (Avsnitt 02)
// ─────────────────────────────────────────────────────────
const SparaTidSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Avsnitt 02" />
    <SlideHeading icon={Clock} title="Spara tid med AI i styrelsearbetet" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Det här avsnittet visar konkreta tidstjuvar ni kan eliminera direkt. Inga abstrakta
      löften – bara verkliga exempel från styrelsearbete.
    </p>

    <div className="space-y-4 mb-6">
      {[
        {
          before: '45 min',
          after: '2 min',
          task: 'Sammanfatta tio mejltrådar',
          how: 'Klistra in mejlen i Claude eller ChatGPT → "Sammanfatta de viktigaste punkterna och eventuella åtgärder."',
          icon: Mail,
        },
        {
          before: '30 min',
          after: '3 min',
          task: 'Förklara en paragraf i BRL',
          how: '"Förklara §9 i Bostadsrättslagen på klarspråk för en styrelseledamot utan juridisk bakgrund."',
          icon: FileText,
        },
        {
          before: '20 min',
          after: '1 min',
          task: 'Ta fram checklista inför mötet',
          how: '"Skapa en checklista för styrelsemöte i BRF. Vi ska behandla årsavstämning, underhållsplan och val av ny revisor."',
          icon: CheckCircle,
        },
        {
          before: '60 min',
          after: '8 min',
          task: 'Skriva störningsbrev till granne',
          how: '"Skriv ett formellt men vänligt brev till en bostadsrättsinnehavare om upprepade bullerstörningar efter kl 22:00."',
          icon: MessageSquare,
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          className="bg-white border-2 border-slate-100 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-[#FF5421]/10 rounded-xl p-3 flex-shrink-0">
              <item.icon className="w-6 h-6 text-[#FF5421]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{item.task}</h4>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-slate-400 line-through">{item.before}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    → {item.after}
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-[#FF5421] font-bold uppercase tracking-wide mb-1">Prompt-exempel</p>
                <p className="text-slate-600 text-xs italic leading-relaxed">"{item.how}"</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <InfoBox color="green" icon="✅" title="Tumregel">
      Om en uppgift tar mer än 10 minuter och handlar om att skriva, sammanfatta eller
      strukturera information – testa om AI kan göra det på en minut. Ni granskar och
      justerar. AI levererar råmaterialet.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 4 – VÄLJ RÄTT VERKTYG (Avsnitt 03)
// ─────────────────────────────────────────────────────────
const ValjVerktygSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Avsnitt 03" dark />
    <SlideHeading icon={Search} title="Välj rätt AI-verktyg för er förening" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      ChatGPT, Claude, Copilot – vad är skillnaden och vilket passar er? Vi går igenom
      alternativen, vad de kostar och vad som är GDPR-säkert för en BRF att använda.
    </p>

    <div className="space-y-3 mb-6">
      {[
        {
          namn: 'ChatGPT',
          org: 'OpenAI',
          gratis: true,
          plus: '~200 kr/mån',
          styrka: 'Bäst känd, stor community, bra för allmänna uppgifter',
          gdpr: 'Kräver att ni stänger av chatthistorik-träning i inställningarna',
          betyg: 4,
          tag: 'Populärast',
          tagColor: 'bg-blue-500',
        },
        {
          namn: 'Claude',
          org: 'Anthropic',
          gratis: true,
          plus: '~200 kr/mån',
          styrka: 'Utmärkt på långa dokument och nyanserade svar. Bra för protokoll och juridisk text',
          gdpr: 'Bättre standardinställningar för integritet. Rekommenderas för känsliga dokument',
          betyg: 5,
          tag: 'Rekommenderas',
          tagColor: 'bg-[#FF5421]',
        },
        {
          namn: 'Microsoft Copilot',
          org: 'Microsoft',
          gratis: true,
          plus: 'Ingår i M365',
          styrka: 'Integrerat i Word, Outlook och Teams. Bra om ni redan använder Office',
          gdpr: 'EU-datalagring i M365 Business-planer. Kontrollera er licens',
          betyg: 4,
          tag: 'Om ni kör Office',
          tagColor: 'bg-emerald-500',
        },
      ].map((v, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }} viewport={{ once: true }}
          className="bg-white/5 border border-white/15 rounded-xl p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white font-black text-lg">{v.namn}</h4>
                <span className={`${v.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                  {v.tag}
                </span>
              </div>
              <p className="text-gray-500 text-xs">{v.org}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-gray-400 text-xs">Gratis + betald</p>
              <p className="text-white text-xs font-bold">{v.plus}</p>
            </div>
          </div>
          <div className="flex mb-2">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className={`w-3.5 h-3.5 ${j < v.betyg ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
            ))}
          </div>
          <p className="text-gray-300 text-sm mb-2">{v.styrka}</p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
            <p className="text-amber-300 text-xs">
              <span className="font-bold">GDPR: </span>{v.gdpr}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    <InfoBox color="slate" icon="🔒" title="GDPR och AI – grundregel för BRF:er">
      Lägg aldrig in personnummer, bankuppgifter eller känsliga personuppgifter i ett
      AI-verktyg utan att ha läst igenom deras integritetspolicy och stängt av
      träningsdelning. Använd AI för struktur och formuleringar – inte som databas
      för medlemsuppgifter.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 5 – PROMPTA RÄTT (Avsnitt 04)
// ─────────────────────────────────────────────────────────
const PromptaRattSlide = () => {
  const [visaResultat, setVisaResultat] = useState<number | null>(null);

  const ovningar = [
    {
      rubrik: 'Protokollparagraf',
      dalig: 'Skriv ett protokoll.',
      bra: 'Du är sekreterare i BRF Solgläntan. Skriv en formell protokollsparagraf för ett styrelsebeslut om att anlita Janssons VVS för akut rörreparation till ett belopp om 38 500 kr exkl. moms. Inkludera beslutsformulering, ansvarig och uppföljningsdatum.',
      resultat: '§ 7 Akut rörreparation – uppdrag till Janssons VVS\nStyrelsen beslutade att anlita Janssons VVS för akut rörreparation av stamledning i källarplan. Uppdragets kostnad uppgår till 38 500 kr exkl. moms.\nAnsvarig: Kassören\nUppföljning: Nästa styrelsemöte 15/3',
    },
    {
      rubrik: 'Juridisk fråga',
      dalig: 'Vad säger lagen om balkongbygge?',
      bra: 'Jag är ordförande i en BRF. En bostadsrättsinnehavare vill bygga till sin balkong. Förklara vilka tillstånd som krävs enligt Bostadsrättslagen och Plan- och bygglagen, och vilket ansvar som ligger på föreningen respektive bostadsrättsinnehavaren. Svara på klarspråk utan juridisk jargong.',
      resultat: 'Balkongutbyggnad kräver i regel: 1) Bygglov från kommunen (PBL), 2) Styrelsens godkännande enligt BRL §12 då det rör föreningens fasad. Föreningen äger fasaden – innehavaren äger rätten att nyttja lägenheten. Styrelsen bör kräva ritningar och skriftlig ansökan innan beslut.',
    },
    {
      rubrik: 'Störningsbrev',
      dalig: 'Skriv ett brev om buller.',
      bra: 'Skriv ett formellt men vänligt brev från BRF Ekbackens styrelse till innehavaren av lägenhet 304 angående upprepade bullerstörningar efter kl 22:00 under helger. Brevet ska referera till föreningens ordningsregler och be om svar inom 14 dagar. Undvik anklagande ton.',
      resultat: 'Till innehavaren av lägenhet 304\n\nStyrelsen har mottagit klagomål från grannar angående störningar efter kl 22:00 under helger. Enligt föreningens ordningsregler §3 ska ro råda mellan kl 22:00–08:00.\n\nVi ber er höra av er inom 14 dagar. Tack för er förståelse.\n\nMed vänliga hälsningar\nStyrelsen, BRF Ekbacken',
    },
  ];

  return (
    <SlideShell>
      <SlidePhaseBadge text="Avsnitt 04" />
      <SlideHeading icon={MessageSquare} title="Lär dig att prompta – få svar som fungerar" />

      <AudioPlayer audioSrc="/audio/test1.mp3" />

      <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
        Det viktigaste du lär dig i hela kursen. Hur du ställer frågor till AI så att svaret
        är konkret och användbart – inte vagt och generellt.
      </p>

      {/* Formel */}
      <div className="bg-[#171f32] rounded-2xl p-5 mb-6">
        <p className="text-[#FF5421] font-bold text-xs uppercase tracking-wide mb-3">Prompt-formeln</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Roll',     desc: 'Du är sekreterare i en BRF',       icon: '👤' },
            { label: 'Uppgift',  desc: 'Skriv ett störningsbrev',           icon: '📝' },
            { label: 'Kontext',  desc: 'Buller efter 22:00, tredje gången', icon: '📋' },
            { label: 'Format',   desc: 'Formellt men vänligt, max 150 ord', icon: '✉️' },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
              <span className="text-2xl block mb-1">{f.icon}</span>
              <p className="text-[#FF5421] font-bold text-xs uppercase tracking-wide mb-1">{f.label}</p>
              <p className="text-gray-400 text-xs leading-tight">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Övningar */}
      <h3 className="text-lg font-bold text-slate-800 mb-3">Jämför: dålig vs bra prompt</h3>
      <div className="space-y-3 mb-6">
        {ovningar.map((ov, i) => (
          <div key={i} className="bg-white border-2 border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setVisaResultat(visaResultat === i ? null : i)}
              className="w-full p-4 text-left"
            >
              <p className="font-bold text-slate-800 text-sm mb-3">{ov.rubrik}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-red-600 mb-1">❌ Dålig prompt</p>
                  <p className="text-slate-600 text-xs italic">"{ov.dalig}"</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-700 mb-1">✅ Bra prompt</p>
                  <p className="text-slate-600 text-xs italic line-clamp-3">"{ov.bra}"</p>
                </div>
              </div>
              <p className="text-[#FF5421] text-xs font-bold mt-2 text-right">
                {visaResultat === i ? '↑ Dölj exempel-svar' : '↓ Visa exempel-svar'}
              </p>
            </button>
            <AnimatePresence>
              {visaResultat === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-100 bg-slate-50 px-4 py-3 overflow-hidden">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">AI:ns svar</p>
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">{ov.resultat}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <InfoBox color="orange" icon="💡" title="Gyllene regel">
        Mer kontext = bättre svar. Berätta för AI:n vem du är, vad du vill ha och vilket
        format du förväntar dig. Det tar 30 sekunder extra och gör svaret tio gånger bättre.
      </InfoBox>
    </SlideShell>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 6 – PROTOKOLL (Avsnitt 05)
// ─────────────────────────────────────────────────────────
const ProtokolSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Avsnitt 05" dark />
    <SlideHeading icon={FileText} title="Protokoll på 10 minuter – inte en timme" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Från anteckningar till formellt protokoll på ett knapptryck. Beslutsparagrafer,
      dagordningar och bilagehänvisningar – vi visar hur steg för steg.
    </p>

    <div className="space-y-4 mb-6">
      {[
        {
          steg: '1',
          titel: 'Ta anteckningar under mötet',
          desc: 'Skriv stödord, beslut och åtgärder i fritext under mötet. Behöver inte vara perfekt – bara komplett.',
          tips: 'Använd telefonen eller en delad anteckningsfil om ni är flera.',
        },
        {
          steg: '2',
          titel: 'Mata in anteckningarna i AI',
          desc: 'Klistra in era råanteckningar och använd prompten nedan.',
          prompt: 'Du är sekreterare i [BRF-namn]. Formatera dessa råanteckningar till ett formellt styrelsemötesprotokoll med: rubrik, datum och plats, närvarolista, §-numrerade punkter, tydliga beslut markerade med "Styrelsen beslutade att...", ansvarig person och uppföljningsdatum på varje beslut, samt avslutning med justeringssignaturer.',
        },
        {
          steg: '3',
          titel: 'Granska och justera',
          desc: 'Läs igenom AI:ns utkast. Kontrollera att beslut är korrekt formulerade och fakta stämmer.',
          tips: 'AI hallucinerar ibland datum och namn – dubbelkolla alltid dessa.',
        },
        {
          steg: '4',
          titel: 'Justera och arkivera',
          desc: 'Skicka till justeringspersoner, samla signaturer och arkivera enligt er dokumentationsrutin.',
          tips: 'Spara protokollet i föreningens gemensamma molnlagring – inte på privat dator.',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FF5421] flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {item.steg}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm sm:text-base mb-1">{item.titel}</h4>
              <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
              {item.prompt && (
                <div className="bg-[#FF5421]/10 border border-[#FF5421]/20 rounded-lg p-3">
                  <p className="text-[#FF5421] text-xs font-bold uppercase tracking-wide mb-1">Prompt att kopiera</p>
                  <p className="text-gray-300 text-xs leading-relaxed italic">"{item.prompt}"</p>
                </div>
              )}
              {item.tips && (
                <p className="text-amber-300 text-xs bg-amber-500/10 rounded-lg px-3 py-2">
                  💡 {item.tips}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <InfoBox color="slate" icon="⏱️" title="Tidsvinst i praktiken">
      En sekreterare som skriver protokoll manuellt lägger i snitt 45–90 minuter per möte.
      Med AI-assistans: 8–15 minuter. För en styrelse med 10 möten per år sparar ni
      6–12 timmar per år – bara på protokollskrivning.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 7 – KOMMUNIKATION (Avsnitt 06)
// ─────────────────────────────────────────────────────────
const KommunikationSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Avsnitt 06" />
    <SlideHeading icon={Mail} title="Kommunicera professionellt med dina medlemmar" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Störningsärenden, klagomål, informationsbrev om pågående arbeten. AI hjälper dig
      hitta rätt ton och formulering – så att varje brev bygger förtroende.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          typ: 'Störningsbrev',
          icon: AlertTriangle,
          border: 'border-red-200',
          bg: 'bg-red-50',
          prompt: '"Skriv ett formellt men respektfullt brev till innehavaren av lgh [nr] angående [typ av störning] efter kl [tid]. Referera till ordningsreglerna och be om svar inom 14 dagar."',
          tips: 'Undvik anklagande ton – AI hjälper er hitta balansen',
        },
        {
          typ: 'Informationsbrev',
          icon: FileText,
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          prompt: '"Skriv ett informationsbrev till alla boende om stambyte som startar [datum]. Inkludera: vad som görs, hur länge, vilka lägenheter påverkas och kontaktuppgifter vid frågor."',
          tips: 'Be AI skriva på klarspråk – undvik teknisk jargong',
        },
        {
          typ: 'Svar på klagomål',
          icon: MessageSquare,
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          prompt: '"En boende klagar på [problem]. Skriv ett svar som bekräftar att vi tagit emot klagomålet, förklarar vad vi gör och sätter realistiska förväntningar på tidsplan."',
          tips: 'Alltid bekräfta mottagandet – det minskar uppföljningskontakt',
        },
        {
          typ: 'Stämmoinbjudan',
          icon: Users,
          border: 'border-green-200',
          bg: 'bg-green-50',
          prompt: '"Skriv en kallelse till ordinarie föreningsstämma [datum] kl [tid] i [plats]. Dagordning: val av ordförande, årsredovisning, ansvarsfrihet, val av styrelse. Bifoga hur man anmäler ombud."',
          tips: 'Kontrollera att formkraven i era stadgar uppfylls',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          className={`bg-white border-2 ${item.border} rounded-xl p-4 sm:p-5 shadow-sm`}>
          <div className={`${item.bg} rounded-lg p-3 flex items-center gap-2 mb-3`}>
            <item.icon className="w-5 h-5 text-slate-600" />
            <h4 className="font-bold text-slate-800 text-sm">{item.typ}</h4>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 mb-2">
            <p className="text-xs text-[#FF5421] font-bold mb-1">Prompt</p>
            <p className="text-slate-600 text-xs italic leading-relaxed">{item.prompt}</p>
          </div>
          <p className="text-xs text-slate-500 flex items-start gap-1">
            <span className="text-amber-500">💡</span> {item.tips}
          </p>
        </motion.div>
      ))}
    </div>

    <InfoBox color="blue" icon="🎯" title="Ton är allt">
      Berätta alltid för AI vilken ton du vill ha: "formellt men vänligt", "bestämt men
      respektfullt", "enkelt och tydligt för alla åldrar". AI anpassar sig direkt.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 8 – BESLUTSUNDERLAG (Avsnitt 07)
// ─────────────────────────────────────────────────────────
const BeslutsunderlagSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Avsnitt 07" dark />
    <SlideHeading icon={BarChart2} title="Ta fram bättre beslutsunderlag – snabbare" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Jämför alternativ, lista risker och strukturera konsekvenser. AI är din "second opinion"
      som inte tar betalt per timme – och som aldrig har en dålig dag.
    </p>

    <div className="space-y-4 mb-6">
      {[
        {
          scenario: 'Jämföra tre offerter',
          icon: '📊',
          prompt: '"Vi har fått tre offerter för fasadmålning: Firma A 280 000 kr, Firma B 310 000 kr (inkl 10-årsgaranti), Firma C 265 000 kr. Hjälp mig strukturera en jämförelse med pro/cons för varje alternativ och vilket som verkar mest fördelaktigt på lång sikt."',
          output: 'Strukturerad tabell med kriterier, riskbedömning och rekommendation',
        },
        {
          scenario: 'Riskanalys inför stambyte',
          icon: '⚠️',
          prompt: '"Vi planerar stambyte i vår BRF med 40 lägenheter. Skapa en riskanalys med de 8 vanligaste riskerna vid stambyte, sannolikhet, konsekvens och hur vi kan förebygga varje risk."',
          output: 'Riskmatris med åtgärdsplan – perfekt som bilaga till styrelsebeslut',
        },
        {
          scenario: 'Konsekvensanalys avgiftshöjning',
          icon: '💰',
          prompt: '"Vi överväger att höja månadsavgiften med 8% eller alternativt ta ett lån på 2 mkr. Lista konsekvenser, risker och fördelar med varje alternativ för en BRF med 35 lägenheter och nuvarande avgift 4 200 kr/mån."',
          output: 'Strukturerad analys att presentera för stämman',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }} viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{item.icon}</span>
            <h4 className="text-white font-bold text-sm sm:text-base">{item.scenario}</h4>
          </div>
          <div className="bg-[#FF5421]/10 border border-[#FF5421]/20 rounded-lg p-3 mb-2">
            <p className="text-[#FF5421] text-xs font-bold uppercase tracking-wide mb-1">Prompt</p>
            <p className="text-gray-300 text-xs italic leading-relaxed">"{item.prompt}"</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <p className="text-green-300 text-xs">{item.output}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <InfoBox color="slate" icon="🧠" title="AI är second opinion – inte sista ord">
      Använd AI för att strukturera och analysera. Beslutet fattar ni. Konsultera alltid
      förvaltare, revisor eller jurist för beslut med stor ekonomisk eller juridisk påverkan.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 9 – UPPHANDLING & JURIDIK (Avsnitt 08)
// ─────────────────────────────────────────────────────────
const UpphandlingSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Avsnitt 08" />
    <SlideHeading icon={Shield} title="AI som bollplank – upphandling, juridik och mer" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Ska ni upphandla ny förvaltare? Undrar ni vad BRL säger? AI kan inte ersätta en jurist –
      men det hjälper er ställa rätt frågor och komma väl förberedda till mötet med proffsen.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          area: 'Ny förvaltare',
          icon: '🏢',
          steps: [
            '"Skapa en kravlista för upphandling av ny fastighetsförvaltare för BRF med 45 lägenheter."',
            '"Vilka 10 frågor bör vi ställa till en förvaltare vid upphandling?"',
            '"Granska detta förvaltningsavtal och lista klausuler vi bör förhandla om."',
          ],
        },
        {
          area: 'Juridiska frågor',
          icon: '⚖️',
          steps: [
            '"Förklara vad BRL §7 säger om styrelsens ansvar vid vattenskada på klarspråk."',
            '"Vad är skillnaden mellan underhållsansvar för BRF och bostadsrättsinnehavare?"',
            '"Lista de 5 vanligaste juridiska misstagen BRF-styrelser gör."',
          ],
        },
        {
          area: 'Energieffektivisering',
          icon: '🌱',
          steps: [
            '"Vilka energiåtgärder ger bäst ROI för en 1970-tals BRF med 40 lägenheter?"',
            '"Förklara EU:s energidirektiv EPBD och vad det betyder för vår BRF."',
            '"Skapa en checklista för energikartläggning av vår fastighet."',
          ],
        },
        {
          area: 'Konflikthantering',
          icon: '🤝',
          steps: [
            '"Skriv ett neutralt svar till en boende som klagar på grannens hund."',
            '"Hur hanterar styrelsen en granne som vägrar betala avgift? Lista stegen."',
            '"Formulera ordningsregler för balkongmöbler och markiser."',
          ],
        },
      ].map((area, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }} viewport={{ once: true }}
          className="bg-white border-2 border-slate-100 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{area.icon}</span>
            <h4 className="font-bold text-slate-800 text-sm sm:text-base">{area.area}</h4>
          </div>
          <ul className="space-y-2">
            {area.steps.map((step, j) => (
              <li key={j} className="text-xs text-slate-500 italic bg-slate-50 rounded-lg p-2 leading-relaxed">
                {step}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <InfoBox color="red" icon="⚠️" title="AI ersätter inte juristen">
      AI kan ge er bakgrundskunskap och hjälpa er formulera rätt frågor – men för
      bindande juridiska beslut, tvister och avtalsskrivning: anlita alltid en kvalificerad
      jurist eller er förvaltare. AI har rätt ungefär 90% av tiden – men den 10% kan kosta er.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 10 – SLUTPROV
// ─────────────────────────────────────────────────────────
const SlutprovSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);

  // Enkelt quiz utan extern fil – några snabba kunskapsfrågor
  const aiFragor = [
    {
      id: 'q1', question_text: 'Vad kallas ett AI-systems förmåga att generera felaktig information med stor säkerhet?',
      question_type: 'single_choice', question_order: 1,
      options: { choices: ['Kontextfönster', 'Hallucination', 'Prompt-fel', 'Tokenfel'] },
      correct_answer: 'Hallucination',
      explanation: 'Hallucination är när AI presenterar felaktig information med stor säkerhet. Kontrollera alltid viktiga uppgifter – särskilt juridik, datum och siffror.',
      points: 100,
    },
    {
      id: 'q2', question_text: 'Vilken grundregel gäller för GDPR och AI-verktyg i BRF-styrelsearbetet?',
      question_type: 'single_choice', question_order: 2,
      options: { choices: [
        'Inga personuppgifter får användas med AI överhuvudtaget',
        'Personnummer och känsliga uppgifter ska inte matas in utan att ha kontrollerat verktygets integritetspolicy',
        'Samtycke från alla medlemmar krävs',
        'Enbart kommunala BRF:er får använda AI',
      ]},
      correct_answer: 'Personnummer och känsliga uppgifter ska inte matas in utan att ha kontrollerat verktygets integritetspolicy',
      explanation: 'Lägg aldrig in personnummer, bankuppgifter eller känsliga personuppgifter utan att ha läst igenom integritetspolicyn och stängt av träningsdelning.',
      points: 100,
    },
    {
      id: 'q3', question_text: 'Vad är den viktigaste komponenten i en effektiv AI-prompt?',
      question_type: 'single_choice', question_order: 3,
      options: { choices: [
        'Att skriva på engelska',
        'Att ge kontext: roll, uppgift, format',
        'Att använda korta meningar',
        'Att upprepa frågan flera gånger',
      ]},
      correct_answer: 'Att ge kontext: roll, uppgift, format',
      explanation: 'Mer kontext = bättre svar. Berätta vem du är, vad du vill ha och vilket format du förväntar dig. Det gör svaret tio gånger bättre.',
      points: 100,
    },
    {
      id: 'q4', question_text: 'Hur bör AI-genererade protokoll hanteras?',
      question_type: 'single_choice', question_order: 4,
      options: { choices: [
        'Publiceras direkt utan granskning',
        'Granskas alltid av sekreteraren innan de justeras',
        'Skickas direkt till alla boende',
        'Lagras automatiskt av AI-verktyget',
      ]},
      correct_answer: 'Granskas alltid av sekreteraren innan de justeras',
      explanation: 'AI levererar råmaterialet – ni granskar och ansvarar. Kontrollera alltid att beslut är korrekt formulerade och att fakta som datum och namn stämmer.',
      points: 100,
    },
    {
      id: 'q5', question_text: 'Vilket påstående om AI och juridisk rådgivning är korrekt?',
      question_type: 'single_choice', question_order: 5,
      options: { choices: [
        'AI kan ersätta juristen helt för BRF-frågor',
        'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad juridisk rådgivning',
        'AI är alltid juridiskt korrekt',
        'AI-svar har samma rättskraft som advokats yttrande',
      ]},
      correct_answer: 'AI hjälper er ställa rätt frågor men ersätter inte kvalificerad juridisk rådgivning',
      explanation: 'AI kan ge bakgrundskunskap och formulera rätt frågor – men för bindande juridiska beslut, tvister och avtalsskrivning ska ni alltid anlita jurist eller förvaltare.',
      points: 100,
    },
  ];

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1623]/92" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
              KUNSKAPSTEST
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Testa dina AI-kunskaper
            </h2>
            <p className="text-white/50 text-sm">5 frågor · Du behöver 80% rätt för att klara testet.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setQuizOpen(true)}
            className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
            style={{ background: 'linear-gradient(135deg,#FF5421,#E04619)' }}
          >
            <HelpCircle className="w-6 h-6" />
            Starta kunskapstestet
          </motion.button>

          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border-2 border-green-400 rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Grattis!</h3>
                <p className="text-white/60 text-sm">
                  Du har klarat AI-modulen. Ditt kursbevis finns i{' '}
                  <strong className="text-white">Mina sidor</strong>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={aiFragor}
        onComplete={(passed) => { if (passed) onComplete('slutprov'); }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────
const Module5AiBrf: React.FC = () => {
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
    {
      id: 'intro',
      title: 'Introduktion',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} onQuizOpen={() => setQuizOpen(true)} />,
    },
    {
      id: 'vad-ar-ai',
      title: 'Vad är AI?',
      component: <VadArAiSlide />,
    },
    {
      id: 'spara-tid',
      title: 'Spara tid med AI',
      component: <SparaTidSlide />,
    },
    {
      id: 'valj-verktyg',
      title: 'Välj rätt verktyg',
      component: <ValjVerktygSlide />,
    },
    {
      id: 'prompta-ratt',
      title: 'Lär dig prompta',
      component: <PromptaRattSlide />,
    },
    {
      id: 'protokoll',
      title: 'Protokoll på 10 min',
      component: <ProtokolSlide />,
    },
    {
      id: 'kommunikation',
      title: 'Kommunikation',
      component: <KommunikationSlide />,
    },
    {
      id: 'beslutsunderlag',
      title: 'Beslutsunderlag',
      component: <BeslutsunderlagSlide />,
    },
    {
      id: 'upphandling',
      title: 'Upphandling & juridik',
      component: <UpphandlingSlide />,
    },
    {
      id: 'slutprov',
      title: 'Kunskapstest',
      component: (
        <SlutprovSlide
          isDone={completedLessons.has('slutprov')}
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
        title="Vanliga frågor om AI-kursen"
        subtitle="Svar på de vanligaste frågorna om AI för BRF-styrelsen"
        buttonColor="#FF5421"
      />

      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={[]}
      />
    </div>
  );
};

export default Module5AiBrf;