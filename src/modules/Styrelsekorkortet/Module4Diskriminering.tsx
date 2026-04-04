// src/modules/Styrelsekorkortet/Module4Diskriminering.tsx
// Slide-baserad diskrimineringsmodul – samma struktur som Module3Gdpr
// AudioPlayer på varje slide – byt ut audioSrc mot rätt fil när inspelning är klar

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, CheckCircle, Award, Shield, Users,
  Scale, AlertTriangle, Lightbulb, HelpCircle, FileText,
  Heart, Eye, Gavel, BookOpen, Target, Zap, Lock, Flag
} from 'lucide-react';

import CourseHeader       from '../../components/CourseElements/CourseHeader';
import GlobalSidebar      from '../../components/GlobalSidebar';
import FloatingFAQ        from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer        from '../../components/AudioPlayer';
import ModuleSlideLayout  from '../../components/CourseElements/ModuleSlideLayout';
import AudioCTA           from '../../components/CourseElements/AudioCTA';
import { diskrimineringQuiz } from '../../data/quizzes/diskriminering-quiz';
import GdprQuizOverlay    from '../../components/CourseElements/GdprQuizOverlay';

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Gäller diskrimineringslagen för vår BRF?',
    answer:
      'Ja – BRF:er är bundna av diskrimineringslagen (2008:567) när det gäller bostäder och tjänster till allmänheten. Det innebär att ni inte får diskriminera vid uthyrning av lokal, hantering av störningsärenden eller i era ordningsregler.',
  },
  {
    question: 'Vad händer om vi bryter mot diskrimineringslagen?',
    answer:
      'Den drabbade kan anmäla till Diskrimineringsombudsmannen (DO) eller stämma föreningen direkt i allmän domstol. Skadestånd (diskrimineringsersättning) utgår och beloppen varierar ofta mellan 10 000–150 000 kr beroende på kränkningens allvar.',
  },
  {
    question: 'Måste vi ha en likabehandlingsplan?',
    answer:
      'Aktiva åtgärder (och planer) är primärt krav för arbetsgivare och skolor. BRF:er är inte skyldiga att ha en formell plan, men det är god praxis att anta riktlinjer för likabehandling och kommunicera dem till boende.',
  },
  {
    question: 'Kan vi ställa krav på att sökande talar svenska?',
    answer:
      'Grundläggande kommunikationsförmåga kan vara legitimt, men krav på "flytande svenska" för styrelseuppdrag riskerar att vara indirekt diskriminering på etnisk grund om det inte är nödvändigt för uppdraget.',
  },
  {
    question: 'Vad är skillnaden på trakasserier och diskriminering?',
    answer:
      'Diskriminering innebär sämre behandling kopplat till en skyddad grund. Trakasserier är ett specifikt beteende som kränker någons värdighet och har samband med en diskrimineringsgrund – t.ex. upprepade nedsättande kommentarer. Båda är förbjudna.',
  },
];

// ─────────────────────────────────────────────────────────
// DELADE STILKOMPONENTER (identiska med GDPR-modulen)
// ─────────────────────────────────────────────────────────

const InfoBox = ({
  color = 'blue',
  icon,
  title,
  children,
}: {
  color?: 'blue' | 'orange' | 'red' | 'green' | 'slate';
  icon?: string;
  title?: string;
  children: React.ReactNode;
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
      {title && (
        <p className="font-bold mb-2 text-sm sm:text-base">
          {icon} {title}
        </p>
      )}
      <div className="text-sm leading-relaxed opacity-90">{children}</div>
    </div>
  );
};

const SlideShell = ({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`min-h-full w-full overflow-y-auto ${
      dark ? 'bg-[#0f1623]' : 'bg-[#F8F7F4]'
    }`}
  >
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      {children}
    </div>
  </div>
);

const SlidePhaseBadge = ({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) => (
  <div
    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide uppercase ${
      dark
        ? 'bg-[#FF5421]/20 text-[#FF5421] border border-[#FF5421]/30'
        : 'bg-[#FF5421]/10 text-[#FF5421]'
    }`}
  >
    {text}
  </div>
);

const SlideHeading = ({
  icon: Icon,
  title,
  dark = false,
}: {
  icon: React.ElementType;
  title: string;
  dark?: boolean;
}) => (
  <h2
    className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-3 leading-tight ${
      dark ? 'text-white' : 'text-slate-800'
    }`}
  >
    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF5421] flex-shrink-0" />
    {title}
  </h2>
);

// ─────────────────────────────────────────────────────────
// SLIDE 1 – INTRO
// ─────────────────────────────────────────────────────────
const IntroSlide = ({
  onStart,
  onQuizOpen,
}: {
  onStart: () => void;
  onQuizOpen: () => void;
}) => {
  const [played, setPlayed] = useState(false);

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=1920&q=80"
        alt="Diskriminering bakgrund"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg,rgba(15,22,35,.93),rgba(23,31,50,.86))',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Inledning
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Diskrimineringslagen för{' '}
            <span className="text-[#FF5421]">BRF-styrelsen</span>
          </h1>

          {/* Ljudspelare med AudioCTA */}
          <div className="relative mb-8 max-w-xl">
            <div className="absolute right-full mr-8 top-0 -mt-12 hidden lg:block whitespace-nowrap">
              <AudioCTA visible={!played} direction="right" />
            </div>
            <div className="w-full">
              <AudioPlayer
                audioSrc="/audio/test1.mp3"
                onPlay={() => setPlayed(true)}
              />
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Som styrelseledamot fattar du beslut som direkt påverkar medlemmarnas
            vardag – vid störningsärenden, lokaluthyrning, tillståndsgivning och mycket
            mer. Lär dig diskrimineringslagens krav och hur ni skapar en rättvis förening
            för alla.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Shield,
                title: '8 Avsnitt',
                sub: 'Från grundprinciper till praktiska BRF-situationer',
              },
              {
                icon: Scale,
                title: (
                  <motion.span
                    onClick={onQuizOpen}
                    className="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-[#FF5421] transition-colors"
                    whileHover={{ scale: 1.03 }}
                  >
                    Gå direkt till kunskapstest
                  </motion.span>
                ),
                sub: 'Klicka här för att komma direkt till övningstestet',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -3 }}
                className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20"
              >
                <item.icon className="w-9 h-9 text-[#FF5421] mb-3" />
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">{item.sub}</p>
              </motion.div>
            ))}

            <motion.a
              href="/pdf/Diskriminering_Kursmaterial.pdf"
              download="Diskriminering_Kursmaterial.pdf"
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 block"
            >
              <Award className="w-9 h-9 text-[#FF5421] mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Ladda ner kursmaterial
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Ett steg närmre Certifierad styrelseledamot
              </p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 2 – MJUK INTRO / VARFÖR DETTA SPELAR ROLL
// ─────────────────────────────────────────────────────────
const MjukIntroSlide = () => (
  <div className="min-h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#0f1623]/80" />

    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <SlidePhaseBadge text="Varför detta spelar roll" dark />
      <SlideHeading icon={Heart} title="En rättvis förening för alla" dark />

      <AudioPlayer audioSrc="/audio/test1.mp3" />

      <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8">
        En bostadsrättsförening är mer än en fastighetsägare – den är ett
        <span className="text-white font-semibold"> litet samhälle</span>. Era beslut
        påverkar om grannar känner sig välkomna, rättvist behandlade och trygga.
        Diskrimineringslagen är inte bara juridik – det handlar om grundläggande
        respekt för varje människa.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            num: '7',
            label: 'skyddade grunder',
            desc: 'Kön, etnicitet, religion, funktionsnedsättning, sexuell läggning, könsöverskridande identitet, ålder',
            color: 'border-[#FF5421]',
          },
          {
            num: 'DO',
            label: 'tillsynsmyndighet',
            desc: 'Diskrimineringsombudsmannen tar emot anmälningar och kan driva ärenden i domstol',
            color: 'border-blue-400',
          },
          {
            num: '≤150k',
            label: 'kr i skadestånd',
            desc: 'Diskrimineringsersättning – domstolen bedömer kränkningens allvar, utan fast tak',
            color: 'border-amber-400',
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`bg-white/10 backdrop-blur-sm border-t-4 ${stat.color} rounded-xl p-5`}
          >
            <p className="text-4xl font-black text-white mb-1">{stat.num}</p>
            <p className="text-[#FF5421] font-bold text-sm uppercase tracking-wide mb-2">
              {stat.label}
            </p>
            <p className="text-gray-300 text-xs leading-relaxed">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/20 rounded-xl p-5">
        <p className="text-white font-bold mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#FF5421]" />
          Tre vanliga missuppfattningar
        </p>
        <div className="space-y-3">
          {[
            {
              myth: '"Vi har alltid gjort så här."',
              fact: 'Tradition skyddar inte mot diskrimineringsanspråk. Lagen gäller oavsett praxis.',
            },
            {
              myth: '"Vi menade inte illa."',
              fact: 'Avsikt spelar ingen roll. Det är effekten av handlingen som avgör.',
            },
            {
              myth: '"Det är bara grannar som bråkar."',
              fact: 'BRF:en kan ha ansvar för trakasserier i gemensamma utrymmen som föreningen känner till men inte agerar på.',
            },
          ].map((item, i) => (
            <div key={i} className="border-l-2 border-[#FF5421]/50 pl-4">
              <p className="text-red-300 text-sm font-medium italic">{item.myth}</p>
              <p className="text-gray-300 text-sm mt-0.5">{item.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// SLIDE 3 – DE SJU GRUNDERNA
// ─────────────────────────────────────────────────────────
const SjuGrundernaSlide = () => {
  const [active, setActive] = useState<number | null>(null);

  const grunder = [
    {
      label: 'Kön',
      icon: '⚥',
      color: 'from-pink-500 to-rose-600',
      border: 'border-pink-300',
      desc: 'Skyddar mot sämre behandling på grund av att man är kvinna, man eller har ett annat kön. Gäller t.ex. vid styrelserekrytering och hantering av ärenden.',
      example: 'En kvinnas förslag på styrelsemötet ignoreras systematiskt, medan identiska förslag från manliga kollegor lyfts fram.',
    },
    {
      label: 'Könsöverskridande identitet/uttryck',
      icon: '🏳️‍⚧️',
      color: 'from-indigo-500 to-blue-600',
      border: 'border-indigo-300',
      desc: 'Skyddar transpersoner och personer som på annat sätt inte identifierar sig med sitt juridiska kön eller uttrycker sitt kön på ett normbrytande sätt.',
      example: 'En styrelseledamot som identifierar sig som icke-binär ber att kallas "hen" i protokollet. Att ignorera detta kan vara diskriminering.',
    },
    {
      label: 'Etnisk tillhörighet',
      icon: '🌍',
      color: 'from-orange-500 to-amber-600',
      border: 'border-orange-300',
      desc: 'Skyddar mot diskriminering på grund av nationellt eller etniskt ursprung, hudfärg eller liknande förhållande. Den vanligaste diskrimineringsgrunden i bostadsärenden.',
      example: 'Styrelsen är snabbare att skicka varningar till familjer med utländsk bakgrund än till svenska grannar vid liknande störningsärenden.',
    },
    {
      label: 'Religion/trosuppfattning',
      icon: '☮️',
      color: 'from-purple-500 to-violet-600',
      border: 'border-purple-300',
      desc: 'Skyddar mot diskriminering på grund av religiös tro eller filosofisk övertygelse. Gäller t.ex. vid uthyrning av lokal och hantering av religiösa symboler.',
      example: 'Föreningen hyr ut lokalen till de flesta privatfester, men nekar uthyrning till en grupp muslimer utan saklig motivering.',
    },
    {
      label: 'Funktionsnedsättning',
      icon: '♿',
      color: 'from-teal-500 to-cyan-600',
      border: 'border-teal-300',
      desc: 'Skyddar mot diskriminering och kräver att skäliga tillgänglighetsanpassningar görs. Assistanshund är ett hjälpmedel, inte ett husdjur.',
      example: 'En rullstolsburen bostadsrättsinnehavare nekas delta på stämman som hålls i en otillgänglig lokal utan alternativ erbjuds.',
    },
    {
      label: 'Sexuell läggning',
      icon: '🏳️‍🌈',
      color: 'from-emerald-500 to-green-600',
      border: 'border-emerald-300',
      desc: 'Skyddar homosexuella, bisexuella och heterosexuella mot diskriminering. Gäller vid uthyrning av lokaler, bostadsköp och behandling av ärenden.',
      example: 'Föreningen nekar uthyrning av festlokalen till ett HBTQ+-evenemang men hyr ut till andra privatfester.',
    },
    {
      label: 'Ålder',
      icon: '🕰️',
      color: 'from-slate-500 to-gray-600',
      border: 'border-slate-300',
      desc: 'Skyddar mot diskriminering på grund av ålder – gäller alla åldrar, inte bara äldre. Åldersgränser i rekrytering kräver sakliga skäl.',
      example: 'Stadgarna kräver att styrelseledamöter är under 65 år – utan saklig grund är detta åldersdiskriminering.',
    },
  ];

  return (
    <SlideShell>
      <SlidePhaseBadge text="Grunderna · 1" />
      <SlideHeading icon={Flag} title="De sju diskrimineringsgrunderna" />

      <AudioPlayer audioSrc="/audio/test1.mp3" />

      <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
        Diskrimineringslagen (2008:567) förbjuder diskriminering på sju grunder. Klicka
        på varje grund för att läsa mer och se ett BRF-exempel.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {grunder.map((g, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActive(active === i ? null : i)}
            className={`rounded-xl p-3 text-left border-2 transition-all ${
              active === i
                ? `bg-gradient-to-br ${g.color} text-white border-transparent shadow-lg`
                : `bg-white ${g.border} text-slate-700 hover:shadow-md`
            }`}
          >
            <span className="text-2xl block mb-2">{g.icon}</span>
            <span className="text-xs font-bold leading-tight">{g.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#171f32] rounded-2xl p-5 sm:p-6 mb-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{grunder[active].icon}</span>
              <h3 className="text-white font-bold text-lg">{grunder[active].label}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {grunder[active].desc}
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-[#FF5421] text-xs font-bold uppercase tracking-wide mb-2">
                BRF-exempel
              </p>
              <p className="text-gray-200 text-sm leading-relaxed italic">
                "{grunder[active].example}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InfoBox color="blue" icon="💡" title="Kom ihåg">
        Avsikt spelar ingen roll. Det är <strong>effekten</strong> av handlingen eller
        beslutet som avgör om diskriminering har skett – inte om ni menade väl.
      </InfoBox>
    </SlideShell>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 4 – TYPER AV DISKRIMINERING
// ─────────────────────────────────────────────────────────
const TyperSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Grunderna · 2" dark />
    <SlideHeading icon={BookOpen} title="Former av diskriminering" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Diskrimineringslagen identifierar flera olika former av diskriminering. Här är de
      viktigaste för en BRF-styrelse att känna till.
    </p>

    <div className="space-y-4 mb-6">
      {[
        {
          typ: 'Direkt diskriminering',
          icon: Target,
          border: 'border-red-500/30',
          bg: 'bg-red-500/5',
          desc: 'Någon behandlas sämre än en annan person i en jämförbar situation och det har samband med en diskrimineringsgrund.',
          example: 'Styrelsen nekar Ahmed att hyra festlokalen med motiveringen "vi vill inte ha bråk" – men hyr ut till svenska grannar utan samma prövning.',
          tip: null,
        },
        {
          typ: 'Indirekt diskriminering',
          icon: Eye,
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          desc: 'En neutral regel eller praxis som verkar gälla lika för alla, men som i praktiken drabbar en grupp med skyddad egenskap oproportionerligt.',
          example: 'Krav på "minst 5 år folkbokförd i kommunen" för styrelseuppdrag låter neutralt men utesluter effektivt nyanlända.',
          tip: 'Granska era ordningsregler och krav – fråga: drabbar detta någon grupp mer än andra?',
        },
        {
          typ: 'Trakasserier',
          icon: AlertTriangle,
          border: 'border-orange-500/30',
          bg: 'bg-orange-500/5',
          desc: 'Ett uppträdande som kränker en persons värdighet och har samband med en diskrimineringsgrund. BRF:en kan ha ansvar för trakasserier i gemensamma utrymmen.',
          example: 'En granne utsätter upprepade gånger sin muslimska granne för nedsättande kommentarer om hennes tro i trapphuset. Styrelsen känner till det men agerar inte.',
          tip: 'Dokumentera alla anmälningar och agera skyndsamt – passivitet kan ge er ansvar.',
        },
        {
          typ: 'Sexuella trakasserier',
          icon: Shield,
          border: 'border-purple-500/30',
          bg: 'bg-purple-500/5',
          desc: 'Uppträdande av sexuell natur som kränker en persons värdighet. Gäller i gemensamma utrymmen som trapphus, tvättstuga och parkeringsplats.',
          example: 'En granne kommenterar upprepade gånger en kvinnas utseende i hissen och lämnar obscena meddelanden i hennes brevlåda.',
          tip: null,
        },
        {
          typ: 'Repressalier',
          icon: Gavel,
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/5',
          desc: 'Att behandla en person sämre för att de anmält eller påtalat diskriminering. Förbjudet och kan ge rätt till ytterligare skadestånd.',
          example: 'En granne anmäler föreningen till DO. Styrelsen börjar sedan krångla med hens ombyggnadsansökan och ignorerar hens störningsklagomål.',
          tip: 'Behandla ärenden från anmälare exakt som andra – dokumentera noga.',
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          viewport={{ once: true }}
          className={`border ${item.border} ${item.bg} rounded-xl p-4 sm:p-5`}
        >
          <div className="flex items-start gap-3 mb-2">
            <item.icon className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
            <h4 className="font-bold text-white text-sm sm:text-base">{item.typ}</h4>
          </div>
          <p className="text-gray-400 text-sm mb-3 ml-8">{item.desc}</p>
          <div className="ml-8 bg-white/5 rounded-lg p-3 mb-2">
            <p className="text-xs text-[#FF5421] font-bold uppercase tracking-wide mb-1">
              Exempel
            </p>
            <p className="text-gray-300 text-xs italic">{item.example}</p>
          </div>
          {item.tip && (
            <p className="ml-8 text-xs font-medium text-amber-300 bg-amber-500/10 rounded-lg px-3 py-2">
              💡 {item.tip}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 5 – PRAKTISKA BRF-SITUATIONER
// ─────────────────────────────────────────────────────────
const PraktiskaSituationerSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Praktiken · 1" />
    <SlideHeading icon={FileText} title="Vanliga BRF-situationer" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Diskrimineringslagens krav dyker upp i situationer ni möter regelbundet. Här är de
      viktigaste att ha koll på.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          situation: 'Störningsärenden',
          icon: AlertTriangle,
          border: 'border-red-200',
          bg: 'bg-red-50',
          dos: [
            'Tillämpa samma tröskel för alla – oavsett vem grannen är',
            'Dokumentera objektivt: datum, tid, typ av störning',
            'Skicka varning konsekvent vid jämförbara händelser',
          ],
          donts: [
            'Agera snabbare mot familjer med utländsk bakgrund',
            'Anteckna subjektiva värderingar ("jobbig", "konstig")',
            'Ignorera klagomål från en viss grupp',
          ],
        },
        {
          situation: 'Lokaluthyrning',
          icon: FileText,
          border: 'border-orange-200',
          bg: 'bg-orange-50',
          dos: [
            'Ha tydliga och sakliga uthyrningskriterier (pris, skick, beläggning)',
            'Tillämpa kriterierna lika för alla sökande',
            'Dokumentera varför du nekat uthyrning',
          ],
          donts: [
            'Neka baserat på etnisk tillhörighet eller religion',
            'Neka HBTQ+-evenemang men tillåta liknande arrangemang',
            'Använda vaga motiv som "passar inte vår förening"',
          ],
        },
        {
          situation: 'Tillgänglighet',
          icon: Users,
          border: 'border-blue-200',
          bg: 'bg-blue-50',
          dos: [
            'Utreda skäliga tillgänglighetsanpassningar vid begäran',
            'Hålla stämmor i tillgängliga lokaler eller erbjuda alternativ',
            'Acceptera assistanshund som hjälpmedel, inte husdjur',
          ],
          donts: [
            'Automatiskt neka tillgänglighetsanpassning utan utredning',
            'Hänvisa rullstolsburen till att "läsa protokollet efteråt"',
            'Strunta i funktionsnedsättning vid störningsärenden',
          ],
        },
        {
          situation: 'Ordningsregler & stadgar',
          icon: Scale,
          border: 'border-purple-200',
          bg: 'bg-purple-50',
          dos: [
            'Granska att regler inte drabbar en grupp oproportionerligt',
            'Tillämpa regler konsekvent oavsett vem som bor i lägenheten',
            'Ha sakliga motiv till alla krav och begränsningar',
          ],
          donts: [
            'Förbjuda "utländska flaggor" men tillåta svenska',
            'Kräva "flytande svenska" för styrelseuppdrag utan saklig grund',
            'Anta åldersgränser för styrelseledamöter utan saklig grund',
          ],
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          viewport={{ once: true }}
          className={`bg-white border-2 ${item.border} rounded-xl overflow-hidden shadow-sm`}
        >
          <div className={`${item.bg} px-5 py-3 flex items-center gap-2`}>
            <item.icon className="w-5 h-5 text-slate-700" />
            <h4 className="font-bold text-slate-800 text-sm sm:text-base">
              {item.situation}
            </h4>
          </div>
          <div className="p-4 sm:p-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">
                ✅ Gör så
              </p>
              <ul className="space-y-1.5">
                {item.dos.map((d, j) => (
                  <li key={j} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">
                ❌ Undvik
              </p>
              <ul className="space-y-1.5">
                {item.donts.map((d, j) => (
                  <li key={j} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <InfoBox color="orange" icon="⚠️" title="Konsekvent dokumentation skyddar er">
      Spara alltid skriftlig motivering till beslut om uthyrning, varningar och avslag.
      Om en tvist uppstår behöver ni kunna visa att ni agerat på sakliga och lika grunder.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 6 – BEVISBÖRDA & DO
// ─────────────────────────────────────────────────────────
const BevisbordeSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Juridiken · 1" dark />
    <SlideHeading icon={Gavel} title="Bevisbörda & Diskrimineringsombudsmannen" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Diskrimineringslagen har speciella bevisbörderegler – och en dedikerad
      tillsynsmyndighet. Det är viktigt att förstå hur en tvist faktiskt kan se ut.
    </p>

    {/* Bevisbördan */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
      <h3 className="text-white font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
        <Scale className="w-5 h-5 text-[#FF5421]" />
        Delad bevisbörda – hur det fungerar
      </h3>
      <div className="space-y-4">
        {[
          {
            step: '1',
            color: 'bg-blue-500',
            title: 'Den drabbade gör det sannolikt',
            desc: 'Klaganden behöver inte bevisa diskriminering – det räcker att göra det sannolikt att sämre behandling skett och att det kan ha samband med en skyddad grund.',
          },
          {
            step: '2',
            color: 'bg-[#FF5421]',
            title: 'Bevisbördan går över',
            desc: 'När klaganden gjort det sannolikt går bevisbördan över till er. Ni måste nu visa att det finns en annan, godtagbar förklaring till behandlingen.',
          },
          {
            step: '3',
            color: 'bg-green-500',
            title: 'Ni måste ha dokumentation',
            desc: 'Utan dokumenterade, sakliga motiv till era beslut är det svårt att bryta presumtionen om diskriminering. Skriv alltid ner era skäl.',
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <div
              className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
            >
              {item.step}
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* DO */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
      <h3 className="text-white font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-[#FF5421]" />
        Diskrimineringsombudsmannen (DO)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: 'DO:s uppgifter',
            items: [
              'Ta emot och utreda anmälningar',
              'Driva ärenden i Arbetsdomstolen och allmän domstol',
              'Utfärda vägledning och information',
              'Bedriva tillsyn över diskrimineringslagen',
            ],
          },
          {
            title: 'Vad händer vid anmälan?',
            items: [
              'DO utreder om diskriminering kan ha skett',
              'DO kan försöka lösa ärendet via förlikning',
              'DO kan välja att inte driva ärendet vidare',
              'Den drabbade kan alltid stämma direkt i domstol',
            ],
          },
        ].map((col, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4">
            <p className="text-[#FF5421] font-bold text-xs uppercase tracking-wide mb-3">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.items.map((item, j) => (
                <li key={j} className="text-gray-300 text-sm flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 text-[#FF5421] mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="slate" icon="💡" title="Skadestånd – inga fasta belopp">
      Diskrimineringsersättning har ingen lagstadgad maxgräns. Domstolen bedömer
      kränkningens allvar, varaktighet och om det finns försvårande omständigheter.
      Vanliga belopp: 10 000–150 000 kr. Därtill kan ekonomisk skada tillkomma.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 7 – TILLGÄNGLIGHET & SKÄLIGA ÅTGÄRDER
// ─────────────────────────────────────────────────────────
const TillganglighetsSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Praktiken · 2" />
    <SlideHeading icon={Users} title="Tillgänglighet & skäliga anpassningar" />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Diskrimineringslagen kräver att BRF:er gör <strong>skäliga tillgänglighetsåtgärder</strong>{' '}
      för personer med funktionsnedsättning. "Skälig" innebär att ni måste utreda och
      väga kostnad mot nytta – men ni kan inte automatiskt neka.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          icon: CheckCircle,
          title: 'Klart tillåtet/skyldigt',
          border: 'border-green-300',
          bg: 'bg-green-50',
          textColor: 'text-green-800',
          items: [
            'Acceptera assistanshund trots djurförbud i stadgarna',
            'Erbjuda digital anslutning till stämman vid otillgänglig lokal',
            'Utreda om ramp kan installeras vid entré',
            'Reservera handikapparkeringsplats om möjligt',
          ],
        },
        {
          icon: AlertTriangle,
          title: 'Kräver noggrann utredning',
          border: 'border-amber-300',
          bg: 'bg-amber-50',
          textColor: 'text-amber-800',
          items: [
            'Bygga om entré för rullstolsanpassning (kostnad vs nytta)',
            'Installera hiss i befintlig fastighet',
            'Anpassa badrum för rörelsehinder',
            'Skapa tillgängliga parkeringsplatser om inga finns',
          ],
        },
      ].map((col, i) => (
        <div
          key={i}
          className={`${col.bg} border-2 ${col.border} rounded-xl p-4 sm:p-5`}
        >
          <div className="flex items-center gap-2 mb-3">
            <col.icon className={`w-5 h-5 ${col.textColor}`} />
            <h4 className={`font-bold text-sm sm:text-base ${col.textColor}`}>
              {col.title}
            </h4>
          </div>
          <ul className="space-y-1.5">
            {col.items.map((it, j) => (
              <li
                key={j}
                className={`text-sm ${col.textColor} flex items-start gap-2`}
              >
                <span className="mt-0.5 flex-shrink-0">•</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
      Bedömningsfaktorer för "skälighet"
    </h3>
    <div className="bg-[#171f32] rounded-xl p-4 sm:p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            faktor: 'Kostnad',
            desc: 'Vad kostar åtgärden? Är den rimlig i förhållande till föreningens ekonomi?',
          },
          {
            faktor: 'Teknisk möjlighet',
            desc: 'Är åtgärden tekniskt genomförbar? Finns det hinder som bygglov, konstruktion?',
          },
          {
            faktor: 'Nyttans storlek',
            desc: 'Hur stor är vinsten för den enskilde? Handlar det om grundläggande tillgång?',
          },
          {
            faktor: 'Alternativa lösningar',
            desc: 'Finns det enklare, billigare alternativ som ger likvärdig tillgänglighet?',
          },
        ].map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-[#FF5421] font-bold text-xs uppercase tracking-wide mb-1">
              {f.faktor}
            </p>
            <p className="text-gray-300 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="red" icon="⚠️" title="Automatiskt nej är inte tillräckligt">
      Att säga "vi har inga pengar" eller "det har aldrig gjorts" utan att faktiskt
      utreda är inte ett godtagbart svar. Dokumentera er bedömning – visa att ni har
      tagit begäran på allvar och vägt faktorer mot varandra.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 8 – PROAKTIVT ARBETE
// ─────────────────────────────────────────────────────────
const ProaktivtArbeteSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Förebyggande" dark />
    <SlideHeading icon={Zap} title="Proaktivt likabehandlingsarbete" dark />

    <AudioPlayer audioSrc="/audio/test1.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Bästa sättet att undvika diskrimineringsproblem är att bygga in likabehandling i
      er verksamhet från start – inte hantera det i efterhand. Här är ett ramverk för
      proaktivt arbete.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          title: 'Likabehandlingspolicy',
          icon: FileText,
          gradient: 'from-[#FF5421] to-orange-600',
          desc: 'Anta en tydlig policy och kommunicera den till alla boende.',
          points: [
            'Definiera vad som inte tolereras (diskriminering, trakasserier)',
            'Beskriv hur boende kan anmäla kränkningar',
            'Inkludera i välkomstbrevet till nya boende',
            'Revidera policyn vid lagändringar',
          ],
        },
        {
          title: 'Rutiner & dokumentation',
          icon: Lock,
          gradient: 'from-indigo-600 to-blue-600',
          desc: 'Säkerställ att alla ärenden hanteras konsekvent och dokumenterat.',
          points: [
            'Ha standardiserade mallar för störningsärenden',
            'Dokumentera motivering till alla beslut',
            'Notera fakta – inte värderingar – i protokoll',
            'Bevara dokumentation tillräckligt länge',
          ],
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${item.gradient} p-4 sm:p-5`}>
            <item.icon className="w-7 h-7 text-white mb-2" />
            <h4 className="font-bold text-white text-base sm:text-lg">{item.title}</h4>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
            <ul className="space-y-2">
              {item.points.map((pt, j) => (
                <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF5421] mt-0.5 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>

    <h3 className="text-base sm:text-lg font-bold text-white mb-3">
      Checklista: Granskning av ordningsregler
    </h3>
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
      <div className="space-y-3">
        {[
          'Drabbar denna regel någon grupp med skyddad egenskap oproportionerligt?',
          'Har vi ett legitimt, proportionerligt syfte med regeln?',
          'Tillämpas regeln konsekvent – oavsett vem grannen är?',
          'Finns det alternativa, mindre ingripande vägar att nå samma syfte?',
          'Har vi dokumenterat sakliga skäl till alla krav och begränsningar?',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border-2 border-white/30 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="green" icon="✅" title="Välkomstbrevet – en enkel åtgärd med stor effekt">
      Inkludera en kort likabehandlingstext i välkomstbrevet till nya boende. Beskriv
      de sju diskrimineringsgrunderna, att föreningen inte tolererar diskriminering eller
      trakasserier, och vart man vänder sig om man upplever något. Det sätter tonen
      från dag ett.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 9 – SLUTPROV
// ─────────────────────────────────────────────────────────
const SlutprovSlide = ({
  isDone,
  onComplete,
}: {
  isDone: boolean;
  onComplete: (id: string) => void;
}) => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img src="/t2.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#0f1623]/92" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full relative z-10 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
              SLUTPROV
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Testa dina kunskaper om diskrimineringslagen
            </h2>
            <p className="text-white/50 text-sm">
              50 frågor · Du behöver 80% rätt för att klara provet.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setQuizOpen(true)}
            className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-4"
            style={{ background: 'linear-gradient(135deg,#FF5421,#E04619)' }}
          >
            <HelpCircle className="w-6 h-6" />
            Starta provet
          </motion.button>

          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border-2 border-green-400 rounded-xl p-6 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Grattis!</h3>
                <p className="text-white/60 text-sm">
                  Du har klarat diskrimineringsmodulen. Ditt diplom finns i{' '}
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
        questions={diskrimineringQuiz.questions}
        onComplete={(passed) => {
          if (passed) onComplete('slutprov');
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────
const Module4Diskriminering: React.FC = () => {
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
      component: (
        <IntroSlide
          onStart={() => setCurrentIndex(1)}
          onQuizOpen={() => setQuizOpen(true)}
        />
      ),
    },
    {
      id: 'mjuk-intro',
      title: 'Varför detta spelar roll',
      component: <MjukIntroSlide />,
    },
    {
      id: 'sju-grunderna',
      title: 'De sju grunderna',
      component: <SjuGrundernaSlide />,
    },
    {
      id: 'typer',
      title: 'Former av diskriminering',
      component: <TyperSlide />,
    },
    {
      id: 'praktiska-situationer',
      title: 'Vanliga BRF-situationer',
      component: <PraktiskaSituationerSlide />,
    },
    {
      id: 'bevisb%C3%B6rda',
      title: 'Bevisbörda & DO',
      component: <BevisbordeSlide />,
    },
    {
      id: 'tillganglighet',
      title: 'Tillgänglighet',
      component: <TillganglighetsSlide />,
    },
    {
      id: 'proaktivt',
      title: 'Proaktivt arbete',
      component: <ProaktivtArbeteSlide />,
    },
    {
      id: 'slutprov',
      title: 'Slutprov',
      component: (
        <SlutprovSlide
          isDone={completedLessons.has('slutprov')}
          onComplete={handleComplete}
        />
      ),
    },
  ];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: '#0f1623' }}
    >
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
        title="Vanliga frågor om diskrimineringslagen"
        subtitle="Svar på de vanligaste frågorna om diskriminering i BRF"
        buttonColor="#FF5421"
      />

      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={diskrimineringQuiz.questions}
      />
    </div>
  );
};

export default Module4Diskriminering;