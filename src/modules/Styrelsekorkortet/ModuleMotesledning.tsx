// src/modules/Styrelsekorkortet/ModuleMotesledning.tsx
// Kurs: Effektivare möten för BRF-styrelsen
// Målgrupp: Styrelseledamöter i bostadsrättsföreningar
// Längd: 25–30 min | 10 slides + micro-quiz + slutquiz
// Ton: Praktisk och jordnära

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
    'Förstå vad som krävs för att ett styrelsemöte ska vara beslutsmässigt',
    'Sätta en tydlig dagordning som håller mötet på rätt spår',
    'Leda och delta i ett strukturerat styrelsemöte',
    'Skriva ett korrekt och juridiskt hållbart protokoll',
    'Känna igen och hantera härskartekniker i möten',
    'Använda AI för att spara tid på protokoll och kallelser',
    'Fatta beslut demokratiskt och dokumentera dem rätt',
    'Göra möten kortare utan att tappa viktig information',
  ],
  forWho: [
    'Nya och erfarna styrelseledamöter i BRF',
    'Ordföranden som vill leda effektivare möten',
    'Sekreterare som skriver protokoll',
    'Alla som vill förstå mötesreglerna i en bostadsrättsförening',
  ],
  modules: [
    { title: 'Varför möten spelar roll',          duration: '3 min',  free: true  },
    { title: 'Beslutsmässighet och kallelse',      duration: '4 min',  free: true  },
    { title: 'Dagordning och mötesstruktur',       duration: '4 min',  free: true  },
    { title: 'Protokollet — vad ska stå?',         duration: '4 min',  free: false },
    { title: 'Härskartekniker i möten',            duration: '4 min',  free: false },
    { title: 'Kommunikation och beslutskultur',    duration: '3 min',  free: false },
    { title: 'AI som mötesassistent',              duration: '3 min',  free: false },
    { title: 'Slutquiz',                           duration: '5 min',  free: false },
  ],
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'Kursledare — Styrelsekörkortet',
    img:   '/founder.png',
    bio:   'Tomas Mauritzson har 15+ års erfarenhet av styrelsearbete, föreningsjuridik och utbildning. Grundare av Styrelsekörkortet — den enda utbildningen i Sverige som är skräddarsydd för BRF-styrelser.',
  },
  faq: [
    { question: 'Hur många ledamöter måste vara med för att vi ska kunna fatta beslut?', answer: 'Styrelsen är beslutsmässig när mer än hälften av ledamöterna är närvarande. Om styrelsen har 5 ledamöter krävs alltså minst 3 för att mötet ska vara beslutsmässigt.' },
    { question: 'Måste vi skicka en kallelse inför varje möte?', answer: 'Ja — alla ledamöter ska ha haft möjlighet att delta och fått tillräckligt underlag. Hur lång tid i förväg kallelsen ska skickas regleras i stadgarna eller av styrelsen själv.' },
    { question: 'Vad händer om vi fattar beslut utan att mötet är beslutsmässigt?', answer: 'Beslutet kan ogiltigförklaras. I allvarliga fall kan styrelseledamöter drabbas av personligt ansvar. Dokumentera alltid vilka som var med på mötet.' },
    { question: 'Är styrelseprotokoll offentliga?', answer: 'Nej — styrelseprotokoll är inte offentliga för medlemmar. De kan innehålla känsliga uppgifter om enskilda. Revisorn har dock alltid rätt att läsa dem.' },
  ],
};

// ── Bilder ────────────────────────────────────────────────
const IMGS = {
  intro:      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&q=80',
  kallelse:   'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1280&q=80',
  dagordning: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1280&q=80',
  protokoll:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80',
  harsk:      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1280&q=80',
  komm:       'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
  ai:         'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&q=80',
  avslut:     'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&q=80',
};

// ── Quiz-frågor ───────────────────────────────────────────
const quiz1 = [{
  id: 'mo1',
  question_text: 'Styrelsen har 5 ledamöter. Hur många måste närvara för att mötet ska vara beslutsmässigt?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: ['2 ledamöter', '3 ledamöter', '4 ledamöter', 'Alla 5 måste vara med'] },
  correct_answer: '3 ledamöter',
  explanation: 'Mer än hälften av ledamöterna måste vara närvarande. 5 ÷ 2 = 2,5 → minst 3 ledamöter krävs. Dessutom ska samtliga ha fått kallelse och underlag i god tid.',
  points: 100,
}];

const quiz2 = [{
  id: 'mo2',
  question_text: 'Vad ska alltid framgå av ett styrelsemötes protokoll?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: [
    'Exakt vad varje ledamot sa under diskussionen',
    'Datum, vilka som deltog, vilka beslut som fattades och hur omröstningen föll',
    'Alla frågor som diskuterades men som inte ledde till beslut',
    'En sammanfattning av hela mötet med citat',
  ]},
  correct_answer: 'Datum, vilka som deltog, vilka beslut som fattades och hur omröstningen föll',
  explanation: 'Protokollet ska dokumentera besluten — inte diskussionerna. Datum, deltagare, beslut och eventuell omröstning är obligatoriskt. Diskussioner sammanfattas bara om det är relevant för beslutet.',
  points: 100,
}];

const quiz3 = [{
  id: 'mo3',
  question_text: 'En ledamot avbryter alltid den som pratar och skjuter ner andras förslag direkt. Det kallas?',
  question_type: 'single_choice' as const, question_order: 1,
  options: { choices: [
    'Effektivt ledarskap',
    'Härskartekniker',
    'Konstruktiv kritik',
    'Beslutsfattande under tidspress',
  ]},
  correct_answer: 'Härskartekniker',
  explanation: 'Avbrytning, osynliggörande och nedvärdering är klassiska härskartekniker som underminerar demokratin i mötet. Ordföranden har ansvar för att sätta stopp och ge alla lika utrymme.',
  points: 100,
}];

const slutquiz = [
  {
    id: 'sq1', question_text: 'Vad menas med att ett möte är "beslutsmässigt"?',
    question_type: 'single_choice' as const, question_order: 1,
    options: { choices: ['Att alla ledamöter är nöjda med dagordningen', 'Att mer än hälften av ledamöterna är närvarande och alla fått kallelse', 'Att ordföranden är på plats', 'Att revisorerna är inbjudna'] },
    correct_answer: 'Att mer än hälften av ledamöterna är närvarande och alla fått kallelse',
    explanation: 'Beslutsmässighet kräver att mer än hälften är närvarande och att samtliga fått kallelse med underlag. Annars kan beslut ogiltigförklaras.',
    points: 100,
  },
  {
    id: 'sq2', question_text: 'Vilken punkt ska alltid stå SIST på dagordningen?',
    question_type: 'single_choice' as const, question_order: 2,
    options: { choices: ['Ekonomirapport', 'Övriga frågor', 'Mötets avslutning', 'Nästa möte'] },
    correct_answer: 'Mötets avslutning',
    explanation: '"Övriga frågor" och "Nästa möte" ska komma före "Mötets avslutning" som alltid är sista punkten. Inga beslut får fattas under "Övriga frågor" — bara informationsutbyte.',
    points: 100,
  },
  {
    id: 'sq3', question_text: 'Är styrelseprotokoll offentliga handlingar som alla medlemmar har rätt att läsa?',
    question_type: 'single_choice' as const, question_order: 3,
    options: { choices: ['Ja, alla handlingar i en förening är offentliga', 'Nej, protokoll är interna och inte offentliga för medlemmar', 'Ja, men bara om de begär det skriftligen', 'Det beror på vad som diskuterades'] },
    correct_answer: 'Nej, protokoll är interna och inte offentliga för medlemmar',
    explanation: 'Styrelseprotokoll är inte offentliga — de kan innehålla känsliga uppgifter om enskilda. Revisorn har alltid rätt att läsa dem. Om stadgarna säger annat gäller det specifikt för din förening.',
    points: 100,
  },
  {
    id: 'sq4', question_text: 'Vad är "bordläggning"?',
    question_type: 'single_choice' as const, question_order: 4,
    options: { choices: ['Att ett ärende avslutas utan beslut för alltid', 'Att ett ärende skjuts upp till nästa möte för mer underlag', 'Att ett ärende delegeras till en enskild ledamot', 'Att ett ärende skickas tillbaka till stämman'] },
    correct_answer: 'Att ett ärende skjuts upp till nästa möte för mer underlag',
    explanation: 'Bordläggning innebär att ett ärende skjuts upp — vanligtvis för att underlag saknas eller för att alla ledamöter inte är närvarande. Ärendet tas upp igen vid nästa möte.',
    points: 100,
  },
  {
    id: 'sq5', question_text: 'Hur kan AI hjälpa dig som sekreterare?',
    question_type: 'single_choice' as const, question_order: 5,
    options: { choices: ['AI kan delta på mötet och fatta beslut åt styrelsen', 'AI kan strukturera anteckningar till ett korrekt protokoll på några minuter', 'AI kan skicka kallelsen automatiskt utan din inblandning', 'AI ersätter behovet av mötesprotokoll'] },
    correct_answer: 'AI kan strukturera anteckningar till ett korrekt protokoll på några minuter',
    explanation: 'AI som Copilot eller ChatGPT kan ta dina råa mötesanteckningar och strukturera dem till ett korrekt protokoll med rätt rubriker och formalia. Du granskar och godkänner — men sparar massor av tid.',
    points: 100,
  },
  {
    id: 'sq6', question_text: 'Vad ska ordföranden göra om en ledamot använder härskartekniker under mötet?',
    question_type: 'single_choice' as const, question_order: 6,
    options: { choices: ['Ignorera det och gå vidare — det ordnar sig', 'Sätta stopp direkt och ge alla lika utrymme att yttra sig', 'Ta upp det efter mötet i ett enskilt samtal', 'Låta de andra ledamöterna hantera det'] },
    correct_answer: 'Sätta stopp direkt och ge alla lika utrymme att yttra sig',
    explanation: 'Ordföranden har ansvar för mötesklimat och att alla ges lika möjlighet att delta. Härskartekniker som avbrytningar och osynliggörande ska bemötas direkt och tydligt under mötet.',
    points: 100,
  },
];

// ── QuizBlock ─────────────────────────────────────────────
const QuizBlock = ({ questions, onComplete, isDone }: {
  questions: any[]; onComplete: () => void; isDone: boolean;
}) => (
  <div className="mt-6">
    <div className="rounded-2xl border-l-4 px-5 py-3 mb-4"
      style={{ borderColor: O, background: '#FFF5F2' }}>
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: O }}>
        💡 Kontrollera din förståelse
      </p>
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

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
const ModuleMotesledning: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Ledamot', avatar: '' });

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
      audioSrc: '/audio/sk-moten-intro.mp3',
      component: (
        <div className="h-full flex overflow-hidden bg-white">
          <div className="hidden lg:block w-[45%] flex-shrink-0 relative">
            <img src={IMGS.intro} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
          </div>
          <div className="flex-1 flex items-center overflow-y-auto">
            <div className="w-full px-8 sm:px-12 py-10">
              <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
                <img src={IMGS.intro} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5 text-white"
                style={{ background: O }}>
                Styrelsekörkortet · Möten & Beslut · 25–30 min
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900"
                style={{ fontFamily: "'Nunito', sans-serif" }}>
                Effektivare <span style={{ color: O }}>styrelsemöten</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                Dåliga möten kostar tid, skapar frustration och leder till dåliga beslut. Den här kursen ger dig verktygen för att leda och delta i möten som faktiskt fungerar — och dokumentera dem rätt.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  'Vad som krävs för att beslut ska vara giltiga',
                  'Dagordning och kallelse — formalia som skyddar dig',
                  'Protokollet — vad ska stå och varför',
                  'Härskartekniker — känna igen och stoppa dem',
                  'AI som hjälper dig skriva protokoll på 10 minuter',
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${O}20` }}>
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

    // ── 1: Beslutsmässighet ───────────────────────────────
    {
      id: 'beslut',
      title: '⚖️ Beslutsmässighet & kallelse',
      audioSrc: '/audio/sk-moten-beslut.mp3',
      component: (
        <SlideH
          bild={IMGS.kallelse}
          bildBg="#1e2d4a"
          badge="Avsnitt 1 · Formalia"
          title="Innan mötet ens börjar — <span style='color:#FF5421'>formalia som skyddar dig</span>"
          ingress="Två saker måste vara på plats för att styrelsensbeslut ska vara giltiga: rätt antal ledamöter och en korrekt kallelse. Missar ni det kan beslut ogiltigförklaras — och ni riskerar personligt ansvar."
          punkter={[
            '<strong>Beslutsmässighet</strong> — mer än hälften av ledamöterna måste vara närvarande. Har ni 5 ledamöter krävs minst 3.',
            '<strong>Kallelse</strong> — samtliga ledamöter (och suppleanter) ska ha fått kallelse med dagordning och underlag i god tid.',
            '<strong>Ärenden på agendan</strong> — ni kan bara besluta om ärenden som stod på dagordningen. Nya ärenden kan inte beslutas direkt.',
            '<strong>Jäv</strong> — en ledamot som är jävig i ett ärende ska lämna rummet innan ärendet diskuteras och beslutas.',
          ]}
        >
          <InfoBox title="Kom ihåg">
            Dokumentera alltid vilka som var med på mötet. Om en ledamot är frånvarande — anteckna det. Vid tvist är protokollet ert skydd.
          </InfoBox>
          <QuizBlock questions={quiz1} onComplete={() => handleComplete('q1')} isDone={completedLessons.has('q1')} />
        </SlideH>
      ),
    },

    // ── 2: Dagordning ─────────────────────────────────────
    {
      id: 'dagordning',
      title: '📋 Dagordning & struktur',
      audioSrc: '/audio/sk-moten-dagordning.mp3',
      component: (
        <SlideB
          bild={IMGS.dagordning}
          badge="Avsnitt 2 · Dagordningen"
          title="En bra dagordning håller mötet på <span style='color:#FF5421'>rätt spår</span>"
        >
          <Ingress>
            Dagordningen är mötets ryggrad. En välstrukturerad dagordning gör att alla vet vad som ska beslutas, vad som är information och hur lång tid varje punkt beräknas ta.
          </Ingress>

          <StegRad nr="1" titel="Mötets öppnande" desc="Ordföranden förklarar mötet öppnat och kontrollerar att mötet är beslutsmässigt." />
          <StegRad nr="2" titel="Val av justerare" desc="En ledamot (inte ordföranden) utses att justera protokollet." />
          <StegRad nr="3" titel="Föregående protokoll" desc="Eventuella frågor från föregående mötes protokoll hanteras." />
          <StegRad nr="4" titel="Beslutspunkter" desc="De ärenden som kräver beslut — tydligt markerade som sådana i kallelsen." />
          <StegRad nr="5" titel="Informationspunkter" desc="Rapporter och information som inte kräver beslut." />
          <StegRad nr="6" titel="Övriga frågor & Nästa möte" desc="Inga beslut får fattas under 'Övriga frågor' — bara informationsutbyte." />

          <InfoBox title="Gyllene regel">
            Markera tydligt i kallelsen vilka punkter som är beslutspunkter och vilka som är information. Det minskar förvirringen och gör mötet effektivare.
          </InfoBox>
        </SlideB>
      ),
    },

    // ── 3: Protokollet ────────────────────────────────────
    {
      id: 'protokoll',
      title: '📝 Protokollet',
      audioSrc: '/audio/sk-moten-protokoll.mp3',
      component: (
        <SlideA
          bild={IMGS.protokoll}
          badge="Avsnitt 3 · Dokumentation"
          title="Protokollet — ert <span style='color:#FF5421'>juridiska skydd</span>"
        >
          <Ingress>
            Protokollet dokumenterar vad som beslutades — inte vad som sades. Det är ert bevis vid tvist och grunden för ansvarsfrihet på stämman.
          </Ingress>
          <TwoCol
            left={
              <FrameBox title="Måste finnas med">
                <CheckItem>Datum, tid och plats för mötet</CheckItem>
                <CheckItem>Vilka ledamöter som deltog</CheckItem>
                <CheckItem>Att mötet var beslutsmässigt</CheckItem>
                <CheckItem>Vem som justerar protokollet</CheckItem>
                <CheckItem>Varje beslut med exakt formulering</CheckItem>
                <CheckItem>Hur omröstningen föll (om oenighet)</CheckItem>
              </FrameBox>
            }
            right={
              <FrameBox title="Behövs inte">
                <Bullet>Exakt vad varje ledamot sa</Bullet>
                <Bullet>Långa diskussioner ord för ord</Bullet>
                <Bullet>Personliga åsikter utan koppling till beslut</Bullet>
                <Bullet>Referat av information som inte ledde till beslut</Bullet>
              </FrameBox>
            }
          />
          <InfoBox title="Protokollet ska justeras">
            Protokollet ska skrivas under av ordföranden och den utsedda justeraren. Osignerade protokoll har inget juridiskt värde.
          </InfoBox>
          <QuizBlock questions={quiz2} onComplete={() => handleComplete('q2')} isDone={completedLessons.has('q2')} />
        </SlideA>
      ),
    },

    // ── 4: Härskartekniker ────────────────────────────────
    {
      id: 'harsk',
      title: '🚩 Härskartekniker',
      audioSrc: '/audio/sk-moten-harsk.mp3',
      component: (
        <SlideE
          bild={IMGS.harsk}
          badge="Avsnitt 4 · Möteskultur"
          title="Härskartekniker — känna igen och <span style='color:#FF5421'>stoppa dem</span>"
          punkter={[
            '<strong>Osynliggörande</strong> — någons förslag ignoreras eller upprepas av annan person som får äran. Motdrag: "Det var precis vad [namn] föreslog."',
            '<strong>Avbrytande</strong> — någon avbryts konstant medan andra tillåts tala klart. Motdrag: Ordföranden ger ordet och skyddar talutrymmet.',
            '<strong>Nedvärdering</strong> — förslag avfärdas med "det har vi testat" eller "det förstår du nog inte". Motdrag: Kräv sakliga argument, inte tyckande.',
            '<strong>Dubbelbestraffning</strong> — ledamot kritiseras oavsett vad de säger eller gör. Motdrag: Lyft fram det konkreta och be om specificering.',
            '<strong>Förlöjligande</strong> — skämt på andras bekostnad för att minska trovärdigheten. Motdrag: Ta upp det direkt och utan ironi.',
            '<strong>Informationsförvägran</strong> — någon hålls utanför information som alla andra har. Motdrag: All relevant information ska delas med hela styrelsen.',
          ]}
          fotnot="Ordföranden ansvarar för att alla ges lika utrymme och att möteskulturen är respektfull. Det är inte förhandlingsbart."
          fotnotColor={O}
        >
          <QuizBlock questions={quiz3} onComplete={() => handleComplete('q3')} isDone={completedLessons.has('q3')} />
        </SlideE>
      ),
    },

    // ── 5: Beslutskultur ──────────────────────────────────
    {
      id: 'beslutskultur',
      title: '🗳️ Beslutskultur & kommunikation',
      audioSrc: '/audio/sk-moten-beslutsk.mp3',
      component: (
        <SlideI
          bild={IMGS.komm}
          bubbla="Vi verkar aldrig komma fram till beslut... hur får vi det att flyta bättre?"
          bubblaSida="left"
          badge="Avsnitt 5 · Beslutsfattande"
          title="Bra beslut kräver <span style='color:#FF5421'>bra process</span>"
          ingress="Det handlar inte om att alla alltid ska vara överens — det handlar om att alla ska ha hörts och att besluten fattas på rätt sätt."
        >
          <div className="space-y-3 mt-4">
            <StegRad nr="1" titel="Föredragning" desc="Den som tar upp ärendet presenterar fakta och bakgrund — kort och sakligt." />
            <StegRad nr="2" titel="Överläggning" desc="Alla ledamöter ges möjlighet att yttra sig. Ordföranden håller ordningen." />
            <StegRad nr="3" titel="Beslut" desc="Omröstning om ej konsensus. Majoritet avgör. Ordföranden har utslagsröst vid lika." />
            <StegRad nr="4" titel="Reservation" desc="En ledamot som röstat nej kan lägga en reservation i protokollet — det skyddar ledamoten personligen." />
          </div>
          <InfoBox title="Bordläggning och återremiss">
            Om underlag saknas eller viktiga ledamöter är frånvarande — bordlägg ärendet till nästa möte. Hellre ett fördröjt bra beslut än ett snabbt dåligt.
          </InfoBox>
        </SlideI>
      ),
    },

    // ── 6: AI som mötesassistent ──────────────────────────
    {
      id: 'ai-moten',
      title: '🤖 AI som mötesassistent',
      audioSrc: '/audio/sk-moten-ai.mp3',
      component: (
        <SlideH
          bild={IMGS.ai}
          bildBg="#0f1623"
          badge="Avsnitt 6 · AI-tips"
          title="Protokoll på <span style='color:#FF5421'>10 minuter</span> istället för en timme"
          ingress="AI-verktyg som Copilot, ChatGPT och Claude kan hjälpa sekreteraren dramatiskt. Mata in dina råa anteckningar — och få ut ett strukturerat protokoll på minuter."
          punkter={[
            '<strong>Protokollskrivning</strong> — klistra in dina mötesanteckningar och be AI strukturera dem till ett korrekt protokoll med rätt formalia.',
            '<strong>Kallelse och dagordning</strong> — be AI ta fram en dagordningsmall baserad på era återkommande punkter.',
            '<strong>Beslutsunderlag</strong> — låt AI sammanfatta offerter, rapporter och underlag till en enkel jämförelsetabell.',
            '<strong>Kommunikation till medlemmar</strong> — be AI formulera ett informationsbrev om ett styrelsebeslut på ett tydligt och vänligt sätt.',
          ]}
        >
          <InfoBox title="Prova nu — en prompt som fungerar">
            "Nedan är mina anteckningar från ett styrelsemöte. Strukturera dem till ett korrekt styrelsemötesprotokoll med punkterna: datum, deltagare, beslutsmässighet, justerare, och beslut per ärende. Lägg till rätt formalia."
          </InfoBox>
        </SlideH>
      ),
    },

    // ── 7: Slutquiz ───────────────────────────────────────
    {
      id: 'slutquiz',
      title: '🧠 Slutquiz',
      component: (
        <SlideF bild={IMGS.avslut} badge="Slutquiz · 6 frågor">
          <h2 className="text-2xl font-black text-gray-900 mb-1"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Testa dina möteskunskaper
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            6 frågor om beslutsmässighet, protokoll, härskartekniker och AI.
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

    // ── 8: Avslutning ─────────────────────────────────────
    {
      id: 'avslut',
      title: '✅ Sammanfattning',
      audioSrc: '/audio/sk-moten-avslut.mp3',
      component: (
        <SlideC
          bild={IMGS.avslut}
          bildHöjd="30%"
          badge="Sammanfattning · Effektivare möten"
          title="Ditt <span style='color:#FF5421'>möteskit</span> från och med idag"
        >
          <Ingress>
            Fem saker du tar med dig som gör era styrelsemöten bättre — direkt.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { nr: '01', text: 'Kontrollera alltid beslutsmässigheten — och dokumentera vilka som var med' },
              { nr: '02', text: 'Skicka kallelse med dagordning och underlag i god tid — helst samma dag varje gång' },
              { nr: '03', text: 'Protokollet dokumenterar besluten, inte diskussionerna — håll det kort och juridiskt korrekt' },
              { nr: '04', text: 'Härskartekniker underminerar demokratin — ordföranden har ansvar att sätta stopp direkt' },
              { nr: '05', text: 'AI kan skriva protokollet åt dig på 10 minuter — ge det ett försök redan till nästa möte' },
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
          <div className="rounded-2xl p-5 border mb-6"
            style={{ background: `${O}10`, borderColor: `${O}25` }}>
            <p className="font-bold text-gray-900 mb-1">👉 Nästa steg</p>
            <p className="text-sm text-gray-600">
              Ta med dig protokoll-prompten till nästa möte. Skriv anteckningar under mötet och låt AI strukturera dem efteråt. Du sparar 30–45 minuter per möte.
            </p>
          </div>
          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört kursen om effektivare möten.')}
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
        courseTitle="Effektivare styrelsemöten" userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')} />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout slides={slides} currentIndex={currentIndex}
          onNavigate={setCurrentIndex} showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ faqs={courseData.faq} title="Frågor om styrelsemöten"
        subtitle="Vanliga frågor om formalia, protokoll och beslut" buttonColor={O} />
    </div>
  );
};

export default ModuleMotesledning;