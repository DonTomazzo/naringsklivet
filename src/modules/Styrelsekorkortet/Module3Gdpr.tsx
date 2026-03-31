// src/modules/Styrelsekorkortet/Module3Gdpr.tsx
// Slide-baserad GDPR-modul – samma struktur som Module2Arsredovisning
// AudioPlayer på varje slide – byt ut audioSrc mot rätt fil när inspelning är klar

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Award, Shield, Database,
         Users, Scale, Camera, Lock, Key, FileText,
         Target, Zap, AlertTriangle, Lightbulb, HelpCircle } from 'lucide-react';         

import CourseHeader  from '../../components/CourseElements/CourseHeader';
import GlobalSidebar from '../../components/GlobalSidebar';
import FloatingFAQ   from '../../components/CourseElements/FloatingFAQ';
import AudioPlayer   from '../../components/AudioPlayer';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import GdprPrinciplesSection from '../../components/CourseElements/GdprPrinciplesSection';
import GdprMjukIntroSlide from '../../components/CourseElements/GdprMjukIntroSlide';
import GdprRolesSection from '../../components/CourseElements/GdprRolesSection';
import AudioCTA from '../../components/CourseElements/AudioCTA';
import { gdprQuiz } from '../../data/quizzes/gdpr-quiz';
import GdprQuizOverlay from '../../components/CourseElements/GdprQuizOverlay';



// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  { question: 'Måste vår BRF ha ett dataskyddsombud?', answer: 'Nej, de flesta BRF:er är för små för att vara skyldiga att utse ett dataskyddsombud. Men ni måste ändå följa GDPR.' },
  { question: 'Hur länge får vi spara protokoll?', answer: 'Styrelseprotokoll bör sparas i minst 10 år. Personuppgifter i protokollet ska minimeras – skriv inte mer om enskilda personer än nödvändigt.' },
  { question: 'Vad händer om vi bryter mot GDPR?', answer: 'Integritetsskyddsmyndigheten (IMY) kan utfärda anmärkningar, förelägganden och sanktionsavgifter. För BRF:er rör det sig oftast om lägre belopp, men det kan bli kostsamt.' },
  { question: 'Behöver vi samtycke för att spara medlemmars kontaktuppgifter?', answer: 'Nej – kontaktuppgifter för löpande förvaltning av medlemskapet behandlas med stöd av avtal eller rättslig förpliktelse. Samtycke behövs inte.' },
  { question: 'Vad är ett biträdesavtal?', answer: 'Ett skriftligt avtal med externa leverantörer (t.ex. förvaltare, bokföringsbyrå) som behandlar personuppgifter på er uppdrag. Kravet finns i GDPR artikel 28.' },
];

// ─────────────────────────────────────────────────────────
// DELADE STILKOMPONENTER
// ─────────────────────────────────────────────────────────

const InfoBox = ({ color = 'blue', icon, title, children }: {
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
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
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

const IntroSlide = ({ onStart, onQuizOpen }: { onStart: () => void; onQuizOpen: () => void }) => {
  const [played, setPlayed] = useState(false);

  return (
    <div className="min-h-full flex items-center relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=80"
        alt="GDPR bakgrund"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(15,22,35,.93),rgba(23,31,50,.86))' }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Inledning
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            GDPR för <span className="text-[#FF5421]">BRF-styrelsen</span>
          </h1>

          {/* --- LJUDSPELARE MED ABSOLUT POSITIONERAD CTA TILL VÄNSTER --- */}
          <div className="relative mb-8 max-w-xl"> 
            {/* CTA: hamnar utanför till vänster om spelaren */}
            <div className="absolute right-full mr-8 top-0 -mt-12 hidden lg:block whitespace-nowrap">
              <AudioCTA visible={!played} direction="right" />
            </div>

            <div className="w-full">
              <AudioPlayer 
                audioSrc="/audio/gdpr-intro.mp3" 
                onPlay={() => setPlayed(true)} 
              />
            </div>
          </div>
          {/* --------------------------------------------------------- */}

          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
            Som styrelseledamot hanterar du personuppgifter varje dag – medlemsregister, fakturor,
            protokoll, kamerainspelningar. Lär dig vad GDPR kräver och hur ni skyddar
            medlemmarnas integritet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Shield, title: '7 Avsnitt', sub: 'Från grundprinciper till Privacy by Design' },
              {
                icon: Database,
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
              <motion.div key={i} whileHover={{ scale: 1.03, y: -3 }}
                className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20">
                <item.icon className="w-9 h-9 text-[#FF5421] mb-3" />
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{item.sub}</p>
              </motion.div>
            ))}

            <motion.a
              href="/pdf/GDPR_Kursmaterial.pdf"
              download="GDPR_Kursmaterial.pdf"
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 block"
            >
              <Award className="w-9 h-9 text-[#FF5421] mb-3" />
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">Ladda ner kursmaterial</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Ett steg närmre Certifierad styrelseledamot</p>
            </motion.a>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

const VadArGdprSlide = () => (
  <div className="min-h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/55" />

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14">

      <div className="mb-6">
        <p className="font-bold text-white text-xl sm:text-2xl mb-1">GDPR:s sju principer</p>
        <p className="text-white/60 text-sm">
          Klicka på varje cirkel för att läsa mer
        </p>
      </div>

      <p className="text-white/80 text-base leading-relaxed mb-8 max-w-2xl">
        GDPR – <em>General Data Protection Regulation</em> – är EU:s dataskyddsförordning
        som gäller sedan 25 maj 2018. Den vilar på sju grundprinciper.
      </p>

      <GdprPrinciplesSection />

      <div className="mt-8 p-4 rounded-xl border-l-4 border-orange-400 bg-black/40 backdrop-blur-sm max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-orange-400">
          IMY – Integritetsskyddsmyndigheten
        </p>
        <p className="text-sm text-white/80 leading-relaxed">
          IMY är den svenska tillsynsmyndigheten för GDPR. De kan utfärda böter på upp
          till 20 miljoner euro eller 4% av omsättningen vid överträdelser.
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// SLIDE 3 – GDPR I FÖRENINGEN
// ─────────────────────────────────────────────────────────
const GdprIForeningenSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Grunderna · 2" dark />
    <SlideHeading icon={Users} title="GDPR i föreningen" dark />

    <AudioPlayer audioSrc="/audio/gdpr-i-foreningen.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Er BRF är ett eget juridiskt subjekt och behandlar personuppgifter om medlemmar,
      hyresgäster och leverantörer. Det innebär att föreningen är{' '}
      <span className="text-white font-semibold">personuppgiftsansvarig</span> – och att
      styrelsen bär det praktiska ansvaret.
    </p>

    <GdprRolesSection />

    <InfoBox color="red" icon="⚠️" title="Styrelseledamötens personliga ansvar">
      Det räcker inte att "förvaltaren sköter det". Styrelsen kan inte delegera bort det
      rättsliga ansvaret. Se till att biträdesavtal finns på plats med samtliga externa
      leverantörer som hanterar personuppgifter.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 4 – VILKA UPPGIFTER?
// ─────────────────────────────────────────────────────────
const VilkaUppgifterSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Grunderna · 3" />
    <SlideHeading icon={Database} title="Vad är en personuppgift?" />

    <AudioPlayer audioSrc="/audio/gdpr-vilka-uppgifter.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      En <strong>personuppgift</strong> är all information som direkt eller indirekt kan kopplas
      till en levande fysisk person. Ni hanterar troligtvis fler uppgifter än ni tror.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          title: 'Vanliga personuppgifter',
          border: 'border-slate-200',
          items: ['Namn, adress, e-post, telefon', 'Lägenhetsnummer', 'Bankkontonummer för avgiftsavisering', 'Köpeavtal och överlåtelsehandlingar', 'Protokoll där namn förekommer'],
        },
        {
          title: 'Känsliga personuppgifter',
          border: 'border-red-300',
          warning: 'Kräver extra skydd och i princip alltid explicit samtycke',
          items: ['Hälsoinformation (t.ex. tillgänglighetsbehov)', 'Etniskt ursprung', 'Religiös övertygelse', 'Politisk åsikt', 'Biometriska uppgifter'],
        },
      ].map((cat, i) => (
        <div key={i} className={`bg-white border-2 ${cat.border} rounded-xl p-4 sm:p-5 shadow-sm`}>
          <h4 className="font-bold text-slate-800 mb-3 text-sm sm:text-base">{cat.title}</h4>
          <ul className="space-y-1.5 mb-3">
            {cat.items.map((item, j) => (
              <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="text-[#FF5421] mt-0.5 flex-shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
          {cat.warning && (
            <p className="text-xs text-red-600 font-medium bg-red-50 rounded-lg px-3 py-2">⚠️ {cat.warning}</p>
          )}
        </div>
      ))}
    </div>

    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Var i föreningen finns uppgifterna?</h3>
    <div className="bg-[#171f32] rounded-xl p-4 sm:p-5 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: FileText, area: 'Styrelseprotokoll', items: ['Namn på deltagare', 'Beslut som rör enskilda'] },
          { icon: Users,    area: 'Medlemsregister',   items: ['Kontaktuppgifter', 'Ägarandelar och insatser'] },
          { icon: Camera,   area: 'Kamerasystem',      items: ['Bildinspelningar', 'Passage-loggar'] },
        ].map((a, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <a.icon className="w-5 h-5 text-[#FF5421] mb-2" />
            <p className="font-semibold text-white text-sm mb-2">{a.area}</p>
            {a.items.map((it, j) => <p key={j} className="text-gray-400 text-xs">• {it}</p>)}
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="green" icon="✅" title="Praktisk tumregel">
      Gör en enkel <strong>kartläggning</strong> en gång per år: lista var ni lagrar
      personuppgifter, varför, hur länge och vem som har åtkomst.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 5 – RÄTTSLIGA GRUNDER
// ─────────────────────────────────────────────────────────
const RattsligaGrunderSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Avancerat · 1" dark />
    <SlideHeading icon={Scale} title="Rättsliga grunder" dark />

    <AudioPlayer audioSrc="/audio/gdpr-rattsliga-grunder.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      Varje gång ni behandlar en personuppgift måste det finnas en <span className="text-white font-semibold">laglig grund</span>.
      Här är de fyra som är mest relevanta för en BRF.
    </p>

    <div className="space-y-3 mb-6">
      {[
        {
          grund: 'Rättslig förpliktelse',
          icon: Scale,
          border: 'border-white/20',
          bg: 'bg-white/5',
          desc: 'Ni är skyldiga att behandla uppgifterna enligt lag. Inget samtycke behövs.',
          examples: ['Bokföring och räkenskaper (bokföringslagen)', 'Lägenhetsregister (bostadsrättslagen)', 'Årsredovisning'],
        },
        {
          grund: 'Avtal',
          icon: FileText,
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/5',
          desc: 'Behandlingen behövs för att uppfylla ett avtal som den registrerade är part i.',
          examples: ['Nyttjanderättsavtal med hyresgäst', 'Överlåtelseavtal vid köp av bostadsrätt'],
        },
        {
          grund: 'Samtycke',
          icon: CheckCircle,
          border: 'border-green-500/30',
          bg: 'bg-green-500/5',
          desc: 'Den registrerade har frivilligt och informerat samtyckt. Kan återkallas när som helst.',
          examples: ['Publicera foto från föreningsevent', 'Nyhetsbrev utöver vad avtalet kräver'],
          warning: 'Samtycke är den svagaste grunden – använd den bara när ingen annan passar.',
        },
        {
          grund: 'Berättigat intresse',
          icon: Target,
          border: 'border-orange-500/30',
          bg: 'bg-orange-500/5',
          desc: 'Ni har ett legitimt intresse som väger tyngre än den registrerades skyddsintresse. Kräver dokumenterad intresseavvägning.',
          examples: ['Spara kontaktuppgifter till tidigare leverantörer', 'Logga passage vid incident'],
          warning: 'Dokumentera intresseavvägningen – ni kan behöva visa den för IMY.',
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }} viewport={{ once: true }}
          className={`border ${item.border} ${item.bg} rounded-xl p-4 sm:p-5`}>
          <div className="flex items-start gap-3 mb-2">
            <item.icon className="w-5 h-5 text-[#FF5421] mt-0.5 flex-shrink-0" />
            <h4 className="font-bold text-white text-sm sm:text-base">{item.grund}</h4>
          </div>
          <p className="text-gray-400 text-sm mb-2 ml-8">{item.desc}</p>
          <div className="ml-8 bg-white/5 rounded-lg p-3 space-y-1 mb-2">
            {item.examples.map((ex, j) => <p key={j} className="text-gray-400 text-xs">• {ex}</p>)}
          </div>
          {item.warning && (
            <p className="ml-8 text-xs font-medium text-amber-300 bg-amber-500/10 rounded-lg px-3 py-2">
              💡 {item.warning}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 6 – KAMERAÖVERVAKNING
// ─────────────────────────────────────────────────────────
const KameraovervakningSlide = () => (
  <SlideShell>
    <SlidePhaseBadge text="Avancerat · 2" />
    <SlideHeading icon={Camera} title="Kameraövervakning" />

    <AudioPlayer audioSrc="/audio/gdpr-kamera.mp3" />

    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
      Kameraövervakning i en BRF regleras av <strong>kamerabevakningslagen (2018:1200)</strong> och GDPR.
      Det handlar om att balansera säkerhetsintressen mot enskildas rätt till privatliv.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          icon: CheckCircle, title: 'Tillåtet utan tillstånd',
          border: 'border-green-300', bg: 'bg-green-50', textColor: 'text-green-800',
          items: ['Kamera mot fastigheten utifrån (entrédörr, parkering)', 'Tvättstuga, förråd och gemensamma utrymmen', 'Cykelrum och soprum'],
        },
        {
          icon: AlertTriangle, title: 'Kräver extra övervägning',
          border: 'border-amber-300', bg: 'bg-amber-50', textColor: 'text-amber-800',
          items: ['Kamera mot grannens tomt eller allmän väg', 'Inomhus i korridorer', 'Ansiktsigenkänning eller biometri'],
        },
      ].map((col, i) => (
        <div key={i} className={`${col.bg} border-2 ${col.border} rounded-xl p-4 sm:p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <col.icon className={`w-5 h-5 ${col.textColor}`} />
            <h4 className={`font-bold text-sm sm:text-base ${col.textColor}`}>{col.title}</h4>
          </div>
          <ul className="space-y-1.5">
            {col.items.map((it, j) => (
              <li key={j} className={`text-sm ${col.textColor} flex items-start gap-2`}>
                <span className="mt-0.5 flex-shrink-0">•</span>{it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">Styrelsens checklista</h3>
    <div className="bg-[#171f32] rounded-xl p-4 sm:p-5 mb-6">
      <div className="space-y-3">
        {[
          'Dokumentera syftet – varför sätter ni upp kameran?',
          'Utför en intresseavvägning och spara dokumentationen',
          'Sätt upp skylt som informerar om bevakning (obligatoriskt)',
          'Bestäm lagringstid – 72 timmar rekommenderas, max 30 dagar',
          'Begränsa åtkomst – vem kan se inspelningarna?',
          'Ingå biträdesavtal med leverantör av kamerasystemet',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded border-2 border-white/30 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>

    <InfoBox color="blue" icon="💡" title="Skyltning är obligatoriskt">
      Skylten ska vara synlig och innehålla vem som ansvarar för bevakningen (er BRF)
      samt kontaktuppgifter. Utan skylt är bevakningen otillåten oavsett syfte.
    </InfoBox>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 7 – PRIVACY BY DESIGN & DEFAULT
// ─────────────────────────────────────────────────────────
const PrivacyByDesignSlide = () => (
  <SlideShell dark>
    <SlidePhaseBadge text="Avancerat · 3" dark />
    <SlideHeading icon={Lock} title="Privacy by Design & Default" dark />

    <AudioPlayer audioSrc="/audio/gdpr-privacy-by-design.mp3" />

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
      GDPR kräver att ni <em>bygger in</em> integritetsskydd från start – inte lägger till det
      i efterhand. Det kallas <span className="text-white font-semibold">inbyggt dataskydd</span>{' '}
      och <span className="text-white font-semibold">dataskydd som standard</span>.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {[
        {
          title: 'Privacy by Design',
          subtitle: 'Inbyggt dataskydd',
          icon: Zap,
          gradient: 'from-[#FF5421] to-orange-600',
          desc: 'Tänk på dataskydd INNAN ni startar ett nytt projekt eller köper ett system.',
          points: ['Välj system som krypterar data som standard', 'Minimera antalet personer med åtkomst', 'Bygg in automatisk radering i era processer', 'Gör en konsekvensbedömning (DPIA) vid hög risk'],
        },
        {
          title: 'Privacy by Default',
          subtitle: 'Dataskydd som standard',
          icon: Shield,
          gradient: 'from-indigo-600 to-blue-600',
          desc: 'Standardinställningen ska alltid vara det minst integritetskränkande alternativet.',
          points: ['Samla bara in uppgifter som faktiskt behövs', 'Dela inte uppgifter vidare utan skäl', 'Begränsa lagringstiden från start', 'Ge åtkomst på need-to-know-basis'],
        },
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }} viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${item.gradient} p-4 sm:p-5`}>
            <item.icon className="w-7 h-7 text-white mb-2" />
            <h4 className="font-bold text-white text-base sm:text-lg">{item.title}</h4>
            <p className="text-white/70 text-sm">{item.subtitle}</p>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
            <ul className="space-y-2">
              {item.points.map((pt, j) => (
                <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF5421] mt-0.5 flex-shrink-0" />{pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>

    <h3 className="text-base sm:text-lg font-bold text-white mb-3">Praktiskt exempel: ny digital anslagstavla</h3>
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
      <div className="space-y-3">
        {[
          'Behöver systemet spara personuppgifter överhuvudtaget?',
          'Välj leverantör med EU-datalagring och klart biträdesavtal.',
          'Konfigurera automatisk radering av meddelanden efter 6 månader.',
          'Ge bara ordförande och sekreterare admin-åtkomst.',
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#FF5421] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-gray-300 text-sm">{s}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 8 – SLUTPROV
// ─────────────────────────────────────────────────────────
const SlutprovSlide = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Testa dina GDPR-kunskaper</h2>
            <p className="text-white/50 text-sm">50 frågor · Du behöver 80% rätt för att klara provet.</p>
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
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border-2 border-green-400 rounded-xl p-6 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Grattis!</h3>
                <p className="text-white/60 text-sm">
                  Du har klarat GDPR-modulen. Ditt diplom finns i{' '}
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
        questions={gdprQuiz.questions}
        onComplete={(passed) => { if (passed) onComplete('slutprov'); }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────
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
    {
      id: 'intro',
      title: 'Introduktion',
      component: <IntroSlide onStart={() => setCurrentIndex(1)} onQuizOpen={() => setQuizOpen(true)} />,
    },
    {
    id: 'mjuk-intro',
    title: 'GDPR & förtroende',
    component: <GdprMjukIntroSlide />,
  },
  {
      id: 'vilka-uppgifter',
      title: 'Vilka uppgifter?',
      component: <VilkaUppgifterSlide />,
    },
    {
      id: 'vad-ar-gdpr',
      title: 'Vad är GDPR?',
      component: <VadArGdprSlide />,
    },
    {
      id: 'gdpr-i-foreningen',
      title: 'GDPR i föreningen',
      component: <GdprRolesSection />,
    },
        {
      id: 'rattsliga-grunder',
      title: 'Rättsliga grunder',
      component: <RattsligaGrunderSlide />,
    },
    {
      id: 'kameraovervakning',
      title: 'Kameraövervakning',
      component: <KameraovervakningSlide />,
    },
    {
      id: 'privacy-by-design',
      title: 'Privacy by Design',
      component: <PrivacyByDesignSlide />,
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
        title="Vanliga GDPR-frågor"
        subtitle="Svar på de vanligaste frågorna om GDPR i BRF"
        buttonColor="#FF5421"
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