// src/modules/Naringsklivet/ModuleMejl.tsx
// Nanokurs: Skriva professionellt mejl
// Målgrupp: Alla medarbetare i en organisation
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
  Ingress,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

// ── Kursdata ──────────────────────────────────────────────
export const courseData = {
  learningPoints: [
    'Skriva mejl som faktiskt läses och förstås',
    'Anpassa ton och stil efter mottagare och syfte',
    'Strukturera ett mejl så att budskapet är tydligt',
    'Skriva en bra ämnesrad som öppnas',
    'Undvika de vanligaste misstagen i professionell mejlkommunikation',
    'Hantera känsliga ärenden och konflikter via mejl',
    'Använda AI som hjälp för att skriva bättre mejl snabbare',
    'Skriva kortare — utan att förlora något viktigt',
  ],
  forWho: [
    'Alla som skriver mejl på jobbet — dvs alla',
    'Dig som vill att dina mejl faktiskt leder till handling',
    'Chefer och säljare som kommunicerar med externa parter',
    'Nyanställda som vill etablera ett professionellt intryck',
  ],
  modules: [
    { title: 'Varför mejlkommunikation spelar roll',    duration: '3 min', free: true },
    { title: 'Ämnesraden — din viktigaste mening',      duration: '3 min', free: true },
    { title: 'Struktur — bygg ett tydligt mejl',        duration: '4 min', free: true },
    { title: 'Ton och stil — anpassa efter mottagaren', duration: '4 min', free: true },
    { title: 'Vanliga misstag att undvika',             duration: '3 min', free: true },
    { title: 'Känsliga ärenden via mejl',               duration: '3 min', free: true },
    { title: 'AI som mejlassistent',                    duration: '3 min', free: true },
    { title: 'Slutquiz',                                duration: '5 min', free: true },
  ],
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'Kursledare — Näringsklivet',
    img:   '/founder.png',
    bio:   'Tomas Mauritzson har lång erfarenhet av kommunikation, kundrelationer och ledarskap. Näringsklivets kurser är kända för att vara praktiska, tydliga och direkt applicerbara i vardagen.',
  },
  faq: [
    { question: 'Gäller det här även interna mejl?', answer: 'Ja — ofta är interna mejl ännu viktigare. Det är kollegor och chefer som formar din professionella bild varje dag.' },
    { question: 'Hur lång ska ett professionellt mejl vara?', answer: 'Så kort som möjligt utan att förlora essensen. Tumregel: om det inte ryms på en skärm — korta ner det.' },
    { question: 'Ska man alltid skriva formellt?', answer: 'Nej. Ton ska anpassas efter relation, kontext och syfte. Formellt med externa parter, mer avslappnat med nära kollegor.' },
    { question: 'Kan AI skriva mina mejl?', answer: 'AI kan hjälpa dig strukturera, formulera och korta ner — men du behöver fortfarande vara ansvarig för innehållet och tonen.' },
  ],
};

// ── Bilder ────────────────────────────────────────────────
const IMGS = {
  intro:    'https://images.unsplash.com/photo-1596526131083-e8c633964948?w=1280&q=80',
  amne:     'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1280&q=80',
  struktur: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1280&q=80',
  ton:      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1280&q=80',
  misstag:  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1280&q=80',
  kanslig:  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
  ai:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&q=80',
  avslut:   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
};

// ── Quiz-frågor ───────────────────────────────────────────
const quiz1 = [{
  id: 'm1', question_text: 'Vilken ämnesrad är mest effektiv?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: [
    'Hej',
    'Angående mötet',
    'Beslut behövs: offert till Volvo — svar senast fredag',
    'Viktig information från säljavdelningen',
  ]},
  correct_answer: 'Beslut behövs: offert till Volvo — svar senast fredag',
  explanation: 'En bra ämnesrad är specifik, handlingsorienterad och anger gärna en deadline. "Beslut behövs" + vad + när ger mottagaren direkt kontext.',
  points: 100,
}];

const quiz2 = [{
  id: 'm2', question_text: 'I vilket läge passar ett längre, mer detaljerat mejl?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: [
    'Alltid — mer information är alltid bättre',
    'När du skickar ett komplext beslutsunderlag som behöver förklaras',
    'Till chefen — de förväntar sig mer text',
    'Aldrig — mejl ska alltid vara korta',
  ]},
  correct_answer: 'När du skickar ett komplext beslutsunderlag som behöver förklaras',
  explanation: 'Längd ska matchas mot komplexitet och syfte. Ett enkelt svar ska vara kort. Ett beslutsunderlag behöver mer utrymme — men fortfarande strukturerat och utan onödigt fluff.',
  points: 100,
}];

const quiz3 = [{
  id: 'm3', question_text: 'Du behöver ge en kollega negativ feedback via mejl. Vad är rätt tillvägagångssätt?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: [
    'Skriv allt du tänker — ärlighet är bäst',
    'Undvik det helt — känsliga ärenden hör inte hemma i mejl',
    'Skriv sakligt, fokusera på beteende och föreslå ett uppföljningsmöte',
    'Cc:a chefen så att det dokumenteras',
  ]},
  correct_answer: 'Skriv sakligt, fokusera på beteende och föreslå ett uppföljningsmöte',
  explanation: 'Känsliga ärenden kan hanteras via mejl om du är saklig och fokuserar på beteende, inte person. Men mejlet ska leda till ett samtal — inte ersätta det.',
  points: 100,
}];

const slutquiz = [
  { id: 'sq1', question_text: 'Vad är den viktigaste delen av ett professionellt mejl?', question_type: 'single_choice' as const, question_order: 1, options: { choices: ['Hälsningsfrasen', 'Ämnesraden', 'Signaturen', 'Antalet mottagare'] }, correct_answer: 'Ämnesraden', explanation: 'Ämnesraden avgör om mejlet öppnas eller inte. Det är den enda meningen som mottagaren ser innan de bestämmer sig.', points: 100 },
  { id: 'sq2', question_text: 'Vilket av dessa är ett vanligt misstag i professionella mejl?', question_type: 'single_choice' as const, question_order: 2, options: { choices: ['Att ha en tydlig struktur', 'Att skriva i korta stycken', 'Att cc:a alla utan anledning', 'Att ha en konkret avslutning'] }, correct_answer: 'Att cc:a alla utan anledning', explanation: 'Onödig cc:ing skapar mejltrötthet, suddar ut ansvaret och irriterar mottagarna. Cc:a bara dem som faktiskt behöver informationen.', points: 100 },
  { id: 'sq3', question_text: 'Hur ska du avsluta ett mejl där du behöver ett svar?', question_type: 'single_choice' as const, question_order: 3, options: { choices: ['Med "Mvh" och ditt namn', 'Med en tydlig call to action och eventuell deadline', 'Med en fråga om allt är klart', 'Med en lång sammanfattning av mejlet'] }, correct_answer: 'Med en tydlig call to action och eventuell deadline', explanation: 'Avslutningen ska göra det kristallklart vad du förväntar dig av mottagaren och när. Vaga avslutningar leder till försenade svar.', points: 100 },
  { id: 'sq4', question_text: 'Vad innebär "bottom line up front" i mejlskrivning?', question_type: 'single_choice' as const, question_order: 4, options: { choices: ['Att skriva signaturen sist', 'Att börja med det viktigaste budskapet', 'Att avsluta med en sammanfattning', 'Att hålla mejlet under 5 rader'] }, correct_answer: 'Att börja med det viktigaste budskapet', explanation: 'Bottom line up front (BLUF) innebär att du skriver det viktigaste budskapet eller beslutet först — sedan ger du kontexten. Mottagaren förstår syftet direkt.', points: 100 },
  { id: 'sq5', question_text: 'När ska du INTE skicka ett mejl?', question_type: 'single_choice' as const, question_order: 5, options: { choices: ['När du behöver dokumentera en överenskommelse', 'När du behöver hantera en konflikt eller ett känsligt ämne', 'När du skickar ett beslutsunderlag', 'När du bekräftar en mötestid'] }, correct_answer: 'När du behöver hantera en konflikt eller ett känsligt ämne', explanation: 'Konflikter och riktigt känsliga ämnen hanteras bäst i person eller via telefon. Mejl saknar tonfall och kan lätt missuppfattas i laddade situationer.', points: 100 },
  { id: 'sq6', question_text: 'Hur kan AI hjälpa dig med mejlskrivning?', question_type: 'single_choice' as const, question_order: 6, options: { choices: ['AI kan fatta beslut åt dig om vad som ska stå i mejlet', 'AI kan strukturera, formulera och korta ner — men du ansvarar för innehållet', 'AI kan skicka mejl automatiskt utan din inblandning', 'AI är inte lämplig för mejlkommunikation'] }, correct_answer: 'AI kan strukturera, formulera och korta ner — men du ansvarar för innehållet', explanation: 'AI är ett kraftfullt verktyg för att förbättra struktur och formulering — men du måste alltid läsa igenom och ta ansvar för det som skickas i ditt namn.', points: 100 },
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

// ── Mejlexempel-komponent ─────────────────────────────────
const MejlExempel = ({ bad, good }: { bad: string; good: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: '#EF4444', background: '#FEF2F2' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-red-500">❌ Undvik</p>
      <p className="text-sm text-gray-700 leading-relaxed italic">"{bad}"</p>
    </div>
    <div className="rounded-xl p-4 border-l-4" style={{ borderColor: O, background: '#FFF5F2' }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>✅ Gör så här</p>
      <p className="text-sm text-gray-700 leading-relaxed italic">"{good}"</p>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleMejl: React.FC = () => {
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

  const allDone = ['q1','q2','q3','slutquiz'].every(id => completedLessons.has(id));

  const slides = [

    // ── 0: Intro ──────────────────────────────────────────
    {
      id: 'intro',
      title: 'Välkommen',
      audioSrc: '/audio/mejl-intro.mp3',
      component: (
        <div className="h-full flex overflow-hidden bg-white">
          <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto">
            <div className="w-full px-8 sm:px-12 py-10">
              <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
                <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white" style={{ background: O }}>
                Kommunikation · Alla medarbetare · 25–30 min
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Skriva professionellt <span style={{ color: O }}>mejl</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Du skriver kanske 20–50 mejl om dagen. Varje mejl är ett tillfälle att skapa klarhet, bygga förtroende — eller tappa det. Den här kursen ger dig verktygen för att skriva mejl som faktiskt fungerar.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Ämnesrader som öppnas',
                  'Struktur som gör budskapet kristallklart',
                  'Ton som passar mottagaren',
                  'Undvika de vanligaste misstagen',
                ].map((p, i) => (
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

    // ── 1: Varför mejl spelar roll ────────────────────────
    {
      id: 'varfor',
      title: '📧 Varför mejl spelar roll',
      audioSrc: '/audio/mejl-varfor.mp3',
      component: (
        <SlideH
          bild={IMGS.intro}
          bildBg="#1e2d4a"
          badge="Avsnitt 1 · Grunderna"
          title="Dina mejl formar din <span style='color:#FF5421'>professionella bild</span>"
          ingress="Vi skriver hundratals mejl i veckan utan att tänka på det. Men varje mejl är ett visitkort — det visar hur du tänker, hur du kommunicerar och hur du respekterar mottagarens tid."
          punkter={[
            '<strong>Förtroende byggs i detaljer</strong> — stavfel, otydliga budskap och dålig struktur signalerar slarvighet även om innehållet är bra.',
            '<strong>Tid är pengar</strong> — ett otydligt mejl skapar följdfrågor, missförstånd och möten som hade kunnat undvikas.',
            '<strong>Mejl är dokument</strong> — det du skriver finns kvar. Tänk innan du skickar.',
            '<strong>Alla kan bli bättre</strong> — det handlar inte om att vara begåvad. Det handlar om att känna till ett par enkla principer.',
          ]}
        >
          <InfoBox title="Kom ihåg">
            Det bästa mejlet är det som inte behöver skickas — men när du väl skriver, skriv det rätt.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 2: Ämnesraden ─────────────────────────────────────
    {
      id: 'amne',
      title: '📌 Ämnesraden',
      audioSrc: '/audio/mejl-amne.mp3',
      component: (
        <SlideA
          bild={IMGS.amne}
          badge="Avsnitt 2 · Ämnesraden"
          title="Din viktigaste <span style='color:#FF5421'>mening</span>"
        >
          <Ingress>
            Ämnesraden är allt. Den avgör om mejlet öppnas, ignoreras eller hamnar i skräpkorgen. Ändå är det den meningen de flesta skriver sist — och snabbast.
          </Ingress>

          <div className="space-y-3 mb-5">
            <StegRad nr="1" titel="Var specifik" desc="Inte 'Angående projektet' utan 'Beslut om budget: Projekt Alpha — svar senast torsdag'" />
            <StegRad nr="2" titel="Ange syfte direkt" desc="Börja med vad du behöver: 'Godkännande krävs:', 'FYI:', 'Fråga:', 'Uppföljning:'" />
            <StegRad nr="3" titel="Håll det kort" desc="Max 50–60 tecken — resten kapas i mobilvyn. Det viktigaste ska synas utan att öppna mejlet." />
          </div>

          <MejlExempel
            bad="Hej / Mötet / Viktig info"
            good="Beslut behövs: ny leverantör — svar senast fredag"
          />

          <QuizBlock questions={quiz1} onComplete={() => handleComplete('q1')} isDone={completedLessons.has('q1')} />
        </SlideA>
      ),
    },

    // ── 3: Struktur ───────────────────────────────────────
    {
      id: 'struktur',
      title: '🏗️ Struktur',
      audioSrc: '/audio/mejl-struktur.mp3',
      component: (
        <SlideB
          bild={IMGS.struktur}
          badge="Avsnitt 3 · Struktur"
          title="Bygg ett <span style='color:#FF5421'>tydligt mejl</span>"
        >
          <Ingress>
            Ett välstrukturerat mejl gör att mottagaren förstår vad du vill — direkt. Använd BLUF-principen: Bottom Line Up Front.
          </Ingress>

          <StegRad nr="1" titel="Budskapet först" desc="Vad vill du att mottagaren ska veta, göra eller besluta? Skriv det i första meningen." />
          <StegRad nr="2" titel="Sedan kontexten" desc="Ge den bakgrundsinformation som behövs för att förstå — men bara det som faktiskt behövs." />
          <StegRad nr="3" titel="Tydlig avslutning" desc="Vad förväntar du dig av mottagaren, och när? 'Kan du bekräfta senast fredag?' är bättre än 'Återkoppla gärna'." />

          <MejlExempel
            bad="Jag ville höra av mig angående det vi pratade om på mötet förra veckan om projektet. Det är lite oklart vad vi kom fram till..."
            good="Vi behöver ett beslut om leverantör för Projekt Alpha. Jag föreslår Företag X baserat på pris och leveranstid. Kan du godkänna senast torsdag?"
          />

          <QuizBlock questions={quiz2} onComplete={() => handleComplete('q2')} isDone={completedLessons.has('q2')} />
        </SlideB>
      ),
    },

    // ── 4: Ton och stil ───────────────────────────────────
    {
      id: 'ton',
      title: '🎭 Ton och stil',
      audioSrc: '/audio/mejl-ton.mp3',
      component: (
        <SlideE
          bild={IMGS.ton}
          badge="Avsnitt 4 · Ton och stil"
          title="Anpassa tonen efter mottagaren"
          punkter={[
            '<strong>Extern/formell</strong> — kunder, myndigheter, nya kontakter. Fullständiga meningar, "Du" med stor bokstav, artig ton utan att vara stel.',
            '<strong>Intern/semi-formell</strong> — kollegor och chefer du känner. Mer avslappnat, kortare meningar, direkt och effektivt.',
            '<strong>Informell</strong> — nära kollegor och team du jobbar tätt med varje dag. Nästan som en chatt — men fortfarande professionellt.',
            '<strong>Läs alltid igenom</strong> — ställ dig frågan: skulle jag säga det här på det här sättet i ett möte med den här personen?',
            '<strong>Undvik ironi och sarkasm</strong> — text saknar tonfall. Det som är roligt i ett rum kan vara kränkande i ett mejl.',
          ]}
          fotnot="När du är osäker på tonen — välj ett steg mer formellt. Det är lättare att slappna av ett tonat upp mejl än tvärtom."
          fotnotColor={O}
        />
      ),
    },

    // ── 5: Vanliga misstag ────────────────────────────────
    {
      id: 'misstag',
      title: '⚠️ Vanliga misstag',
      audioSrc: '/audio/mejl-misstag.mp3',
      component: (
        <SlideA
          bild={IMGS.misstag}
          badge="Avsnitt 5 · Misstag"
          title="De <span style='color:#FF5421'>vanligaste misstagen</span>"
        >
          <Ingress>
            De flesta mejlmisstag handlar inte om stavfel — utan om struktur, ton och timing. Här är de vanligaste att undvika.
          </Ingress>
          <TwoCol
            left={
              <FrameBox title="❌ Undvik">
                <Bullet>Otydlig eller tom ämnesrad</Bullet>
                <Bullet>Onödig cc: och reply all</Bullet>
                <Bullet>Långa block utan radbrytning</Bullet>
                <Bullet>Vag avslutning utan nästa steg</Bullet>
                <Bullet>Skicka i affekt — vänta alltid</Bullet>
              </FrameBox>
            }
            right={
              <FrameBox title="✅ Gör istället">
                <CheckItem>Specifik ämnesrad med syfte</CheckItem>
                <CheckItem>Cc: bara de som faktiskt behöver</CheckItem>
                <CheckItem>Korta stycken, luft mellan</CheckItem>
                <CheckItem>Tydlig call to action + deadline</CheckItem>
                <CheckItem>Vänta en natt vid känsliga mejl</CheckItem>
              </FrameBox>
            }
          />
          <InfoBox title="Regeln om en natt">
            Skriv aldrig ett argt eller känsligt mejl och skicka direkt. Spara som utkast. Läs nästa morgon. Du kommer tacka dig själv.
          </InfoBox>
        </SlideA>
      ),
    },

    // ── 6: Känsliga ärenden ───────────────────────────────
    {
      id: 'kanslig',
      title: '🤝 Känsliga ärenden',
      audioSrc: '/audio/mejl-kanslig.mp3',
      component: (
        <ScenarioQuiz
          bild={IMGS.kanslig}
          bubbla="Min kollega levererade inte det vi kom överens om. Jag är frustrerad och behöver ta upp det — kan jag skriva ett mejl?"
          bubblaSida="left"
          fråga="Vad är rätt tillvägagångssätt?"
          alternativ={[
            { text: 'Ja — skriv allt du känner, ärlighet är bäst', korrekt: false },
            { text: 'Nej — känsliga ärenden hör aldrig hemma i mejl', korrekt: false },
            { text: 'Ja — men sakligt, fokus på beteende, och föreslå ett möte för uppföljning', korrekt: true },
            { text: 'Skicka mejlet med chefen i cc för dokumentation', korrekt: false },
          ]}
          förklaring="Känsliga ärenden kan hanteras via mejl — men mejlet ska vara sakligt, fokusera på specifika beteenden (inte personen) och leda till ett samtal. Att cc:a chefen direkt eskalerar i onödan."
          onComplete={() => handleComplete('q3')}
          isDone={completedLessons.has('q3')}
        />
      ),
    },

    // ── 7: AI som mejlassistent ───────────────────────────
    {
      id: 'ai-hjalp',
      title: '🤖 AI som mejlassistent',
      audioSrc: '/audio/mejl-ai.mp3',
      component: (
        <SlideH
          bild={IMGS.ai}
          bildBg="#0f1623"
          badge="Avsnitt 7 · AI & mejl"
          title="AI som din <span style='color:#FF5421'>mejlassistent</span>"
          ingress="Copilot, ChatGPT och liknande verktyg kan hjälpa dig skriva bättre mejl snabbare. Men de är verktyg — inte ghostwriters. Du ansvarar alltid för det du skickar."
          punkter={[
            '<strong>Strukturera</strong> — ge AI ett utkast och be den strukturera det tydligare med BLUF-principen.',
            '<strong>Korta ner</strong> — "Gör det här mejlet 30% kortare utan att tappa essensen" är ett kraftfullt kommando.',
            '<strong>Ändra ton</strong> — "Gör tonen mer formell/mer avslappnad" justerar registret snabbt.',
            '<strong>Kontrollera alltid</strong> — läs igenom AI:ns förslag. Den kan ha ändrat nyanser eller lagt till saker du inte sa.',
          ]}
        >
          <InfoBox title="Prova nu">
            Öppna ett mejl du nyligen skickade. Klistra in det i Copilot eller ChatGPT och skriv: "Gör det här kortare och tydligare med budskapet först." Se vad som händer.
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 8: Slutquiz ───────────────────────────────────────
    {
      id: 'slutquiz',
      title: '🧠 Slutquiz',
      component: (
        <SlideF bild={IMGS.avslut} badge="Slutquiz · 6 frågor">
          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Testa dina kunskaper
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            6 frågor om professionell mejlkommunikation.
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

    // ── 9: Avslutning ─────────────────────────────────────
    {
      id: 'avslut',
      title: '✅ Sammanfattning',
      audioSrc: '/audio/mejl-avslut.mp3',
      component: (
        <SlideC
          bild={IMGS.avslut}
          bildHöjd="30%"
          badge="Sammanfattning"
          title="Ditt mejlkit från <span style='color:#FF5421'>och med idag</span>"
        >
          <Ingress>
            Fem principer som gör dina mejl tydligare, snabbare att läsa och mer effektiva — börja idag.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Ämnesraden — specifik, kort och handlingsorienterad' },
              { nr: '02', text: 'Budskapet först — skriv vad du vill att mottagaren ska göra direkt' },
              { nr: '03', text: 'Anpassa tonen — formell utåt, avslappnad inåt' },
              { nr: '04', text: 'Tydlig avslutning — vad, vem och när' },
              { nr: '05', text: 'Vänta en natt på känsliga mejl — skicka aldrig i affekt' },
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
          <div className="rounded-2xl p-5 border mb-6" style={{ background: `${O}10`, borderColor: `${O}25` }}>
            <p className="font-bold text-gray-900 mb-1">👉 Din uppgift nu</p>
            <p className="text-sm text-gray-600">Nästa mejl du skriver — börja med budskapet, inte med bakgrunden. Testa BLUF-principen en gång, och se skillnaden.</p>
          </div>
          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört kursen.')}
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
        courseTitle="Skriva professionellt mejl" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={courseData.faq} title="Frågor om kursen"
        subtitle="Vanliga frågor om mejlskrivning" buttonColor={O} />
    </div>
  );
};

export default ModuleMejl;