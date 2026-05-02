// src/pages/QuizSalesPage.tsx
// BRF Kunskapstest — bästa versionen
// 1. Ny intro-sida (från senaste designen)
// 2. Avatar + bubbla centrerad på desktop
// 3. Förbättrad mobil-layout

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw,
  ArrowRight, Trophy, Star, AlertTriangle, X
} from 'lucide-react';

const O = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ─────────────────────────────────────────────
// FRÅGOR
// ─────────────────────────────────────────────
const questions = [
  {
    id: 1, persona: 'Eva', roll: 'Ordförande, BRF Kastanjen',
    bild: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    kategori: 'Likhetsprincipen', highlight: ['likhetsprincipen', 'lika'],
    bubbla: 'En ledamot föreslår att vi ger grannen på plan 3 tillstånd att bygga en altan — men vi nekade samma sak för lägenheten på plan 1 förra året.',
    fraga: 'Vad gäller enligt likhetsprincipen?',
    alternativ: [
      { text: 'Styrelsen kan alltid göra undantag om omständigheterna skiljer sig åt', korrekt: false, feedback: 'Undantag kräver sakliga skäl — inte bara att styrelsen tycker det är lämpligt. Godtyckliga beslut strider mot likhetsprincipen.' },
      { text: 'Alla medlemmar ska behandlas lika — styrelsen måste antingen neka båda eller godkänna båda', korrekt: true, feedback: 'Rätt. Likhetsprincipen i bostadsrättslagen innebär att styrelsen inte får gynna eller missgynna enskilda medlemmar utan sakliga skäl.' },
      { text: 'Det är okej om styrelsen är enig i beslutet', korrekt: false, feedback: 'Enhällighet i styrelsen gör inte ett diskriminerande beslut lagligt. Likhetsprincipen gäller oavsett hur styrelsen röstar.' },
      { text: 'Grannen på plan 3 har bott längre i föreningen och har därför mer rätt', korrekt: false, feedback: 'Vistelsetid ger ingen juridisk fördel. Alla bostadsrättsinnehavare har samma rättigheter enligt lagen.' },
    ],
    tips: ['Likhetsprincipen gäller alla beslut om enskilda medlemmar', 'Dokumentera alltid motiveringen till era beslut', 'Skilda omständigheter kan motivera skilda beslut — men skälen måste vara sakliga'],
  },
  {
    id: 2, persona: 'Magnus', roll: 'Sekreterare, BRF Ekbacken',
    bild: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    kategori: 'Beslutsmässighet', highlight: ['beslutsmässig', 'hälften'],
    bubbla: 'Vi är fem ledamöter i styrelsen. Tre är bortresta och kan inte komma. Kan vi hålla möte med bara mig och ordföranden?',
    fraga: 'Vad krävs för att styrelsen ska vara beslutsmässig?',
    alternativ: [
      { text: 'Minst hälften av ledamöterna måste vara närvarande', korrekt: true, feedback: 'Rätt. Styrelsen är beslutsmässig när fler än hälften av ledamöterna är närvarande. Med 5 ledamöter krävs minst 3 personer.' },
      { text: 'Ordföranden och en ledamot räcker alltid', korrekt: false, feedback: 'Fel. Ordföranden har ingen särskild rätt att ensam bilda beslutsunderlag. Majoritetsregeln gäller.' },
      { text: 'Det räcker om de frånvarande skickar ett skriftligt godkännande', korrekt: false, feedback: 'Skriftliga godkännanden i förväg är inte detsamma som närvaro. Styrelsen måste kunna diskutera frågorna gemensamt.' },
      { text: 'Det spelar ingen roll hur många som är med — alla beslut är giltiga', korrekt: false, feedback: 'Fel. Beslut fattade utan beslutsmässighet kan vara ogiltiga och angripas rättsligt.' },
    ],
    tips: ['Hälften + 1 av ledamöterna måste vara närvarande', 'Kontrollera era stadgar — de kan ha strängare krav', 'Suppleanter kan kallas in för att uppnå beslutsmässighet'],
  },
  {
    id: 3, persona: 'Anna', roll: 'Ledamot, BRF Linden',
    bild: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
    kategori: 'Jäv', highlight: ['jävig', 'Jäv'],
    bubbla: 'Vår kassör vill att föreningen ska anlita hans egen firma för att renovera trapphuset. Han säger att han kan vara med och rösta eftersom det gynnar föreningen.',
    fraga: 'Hur ska styrelsen hantera detta?',
    alternativ: [
      { text: 'Kassören får rösta om majoriteten anser att det är en bra affär', korrekt: false, feedback: 'Fel. Jäv är personligt och kan inte röstas bort av övriga styrelsen. Kassören måste lämna rummet vid beslutet.' },
      { text: 'Kassören är jävig och ska inte delta i beredning eller beslut i ärendet', korrekt: true, feedback: 'Rätt. En ledamot som har ett väsentligt intresse i ett ärende — till exempel äger ett anlitat företag — är jävig och ska inte delta i beslut.' },
      { text: 'Det är okej om kassören informerar om jävet men ändå röstar', korrekt: false, feedback: 'Att informera om jäv räcker inte. Kassören måste aktivt avstå från att delta i ärendet.' },
      { text: 'Föreningen kan anlita vem den vill — det är styrelsens beslut', korrekt: false, feedback: 'Styrelsen får anlita vem den vill — men en jävig ledamot får inte delta i det beslutet.' },
    ],
    tips: ['Jäv gäller när en ledamot har eget intresse i ärendet', 'Den jävige ska lämna rummet — inte bara avstå från att rösta', 'Protokollför alltid att jäv har anmälts'],
  },
  {
    id: 4, persona: 'Karin', roll: 'Ordförande, BRF Solbacken',
    bild: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
    kategori: 'Diskriminering', highlight: ['Diskriminering', 'diskrimineringslagen'],
    bubbla: 'En medlem ansöker om att hyra ut sin lägenhet i andra hand. Styrelsen vill neka — men egentligen för att de inte gillar vem han vill hyra ut till.',
    fraga: 'Vad riskerar styrelsen att göra sig skyldig till?',
    alternativ: [
      { text: 'Ingenting — styrelsen har alltid rätt att neka andrahandsuthyrning', korrekt: false, feedback: 'Fel. Styrelsen kan neka andrahandsuthyrning, men skälen får inte strida mot diskrimineringslagen.' },
      { text: 'Diskriminering, om skälet för nekandet rör en skyddad egenskap hos hyresgästen', korrekt: true, feedback: 'Rätt. Om nekandet grundas på hyresgästens etnicitet, religion, kön eller annan skyddad egenskap bryter styrelsen mot diskrimineringslagen.' },
      { text: 'Styrelseansvar, men bara om de skriver ner skälet i protokollet', korrekt: false, feedback: 'Fel. Diskriminering är olagligt oavsett om skälet protokollförs eller inte.' },
      { text: 'Inget — beslutet är internt och påverkar inte föreningen juridiskt', korrekt: false, feedback: 'Fel. Diskriminerande beslut kan leda till skadeståndsskyldighet och anmälan till DO.' },
    ],
    tips: ['Neka alltid av sakliga skäl — och dokumentera dem', 'Skyddade egenskaper: kön, etnicitet, religion, funktionsnedsättning, sexuell läggning, ålder', 'Vid tvekan — konsultera juridisk hjälp innan beslut'],
  },
  {
    id: 5, persona: 'Lars', roll: 'Kassör, BRF Björken',
    bild: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
    kategori: 'Årsredovisning', highlight: ['årsredovisning', 'revisionsberättelse'],
    bubbla: 'Stämman ska hållas om 6 veckor. Revisorn har inte hunnit granska årsredovisningen än. Kan vi hålla stämman ändå?',
    fraga: 'Vad gäller för årsredovisning och stämma?',
    alternativ: [
      { text: 'Ja — stämman kan hållas och revisionsberättelsen lämnas in senare', korrekt: false, feedback: 'Fel. Revisionsberättelsen måste vara klar och tillgänglig för medlemmarna innan stämman.' },
      { text: 'Årsredovisning och revisionsberättelse ska hållas tillgängliga minst en vecka innan stämman', korrekt: true, feedback: 'Rätt. Enligt lag ska årsredovisning och revisionsberättelse finnas tillgängliga minst en vecka innan stämman.' },
      { text: 'Det räcker att ordföranden presenterar siffrorna muntligt på stämman', korrekt: false, feedback: 'Fel. Muntlig redovisning ersätter inte kravet på skriftlig årsredovisning och revisionsberättelse.' },
      { text: 'Stämman kan hållas om styrelsen tar ansvar för att revisionen är korrekt', korrekt: false, feedback: 'Fel. Det är revisorns uppgift att granska och intyga — styrelsen kan inte ta den rollen.' },
    ],
    tips: ['Årsredovisning ska tillhandahållas minst 1 vecka före stämman', 'Revisionsberättelse krävs alltid', 'Planera stämman med tillräcklig framförhållning'],
  },
  {
    id: 6, persona: 'Sofia', roll: 'Suppleant, BRF Granbacken',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    kategori: 'Underhållsansvar', highlight: ['stamledningar', 'betjänar fler lägenheter'],
    bubbla: 'Det läcker från en ledning inuti väggen i en lägenhet. Innehavaren säger att det är föreningens ansvar. Styrelsen menar att det är hennes.',
    fraga: 'Vem ansvarar för ledningar inuti väggarna?',
    alternativ: [
      { text: 'Alltid bostadsrättsinnehavarens ansvar — allt innanför dörren är hennes', korrekt: false, feedback: 'Fel. Ansvaret beror på ledningens funktion — inte på var den fysiskt befinner sig.' },
      { text: 'Alltid föreningens ansvar — föreningen äger fastigheten', korrekt: false, feedback: 'Fel. Bostadsrättsinnehavaren ansvarar för en del av underhållet även om föreningen äger fastigheten.' },
      { text: 'Stamledningar och ledningar som betjänar fler lägenheter är föreningens ansvar', korrekt: true, feedback: 'Rätt. Ledningar som ingår i stammen eller betjänar flera lägenheter är föreningens ansvar.' },
      { text: 'Det beror på hur gammal ledningen är', korrekt: false, feedback: 'Ålder avgör inte ansvaret — det gör ledningens funktion och om den betjänar en eller flera lägenheter.' },
    ],
    tips: ['Stamledningar = föreningens ansvar', 'Ledningar som enbart betjänar lägenheten = innehavarens ansvar', 'Kontrollera stadgarna — de kan specificera ansvarsfördelningen'],
  },
  {
    id: 7, persona: 'Peter', roll: 'Ordförande, BRF Almarna',
    bild: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
    kategori: 'Stämmobeslut', highlight: ['stämmobeslut', 'väsentligt'],
    bubbla: 'Styrelsen vill ta ett lån på 3 miljoner för att renovera taket. En ledamot säger att styrelsen kan besluta om det utan stämman.',
    fraga: 'Vem beslutar om större lån i föreningen?',
    alternativ: [
      { text: 'Styrelsen kan alltid besluta om lån — det är löpande förvaltning', korrekt: false, feedback: 'Fel. Lån som väsentligt påverkar föreningens ekonomi kräver stämmobeslut.' },
      { text: 'Större lån som väsentligt påverkar föreningens ekonomi kräver stämmobeslut', korrekt: true, feedback: 'Rätt. Åtgärder som väsentligt förändrar föreningens ekonomiska situation faller utanför styrelsens löpande förvaltning.' },
      { text: 'Det räcker med att kassören godkänner lånet', korrekt: false, feedback: 'Fel. Kassören har ingen individuell beslutanderätt att godkänna större lån.' },
      { text: 'Styrelsen beslutar om alla lån upp till 5 miljoner', korrekt: false, feedback: 'Det finns ingen generell beloppsgräns i lagen. Det avgörande är om åtgärden är ordinär förvaltning.' },
    ],
    tips: ['Löpande förvaltning = styrelsebeslut', 'Väsentliga förändringar = stämmobeslut', 'Kontrollera stadgarna för era specifika beloppsgränser'],
  },
  {
    id: 8, persona: 'Ingrid', roll: 'Ledamot, BRF Viken',
    bild: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    kategori: 'Protokoll', highlight: ['justerat', 'oföränderligt'],
    bubbla: 'Vi fattade ett viktigt beslut om att höja årsavgiften på förra mötet. Nu vill en ledamot ändra i protokollet efteråt.',
    fraga: 'Hur ska ett justerat styrelsemötesprotokoll hanteras?',
    alternativ: [
      { text: 'Protokollet kan ändras om styrelsen är enig', korrekt: false, feedback: 'Fel. Ett justerat protokoll är ett officiellt dokument. Det kan inte ändras i efterhand utan formellt beslut.' },
      { text: 'Protokollet justeras av ordföranden och en justeringsperson — efter det är det oföränderligt', korrekt: true, feedback: 'Rätt. När protokollet är justerat och undertecknat är det en officiell handling. Fel rättas via ett nytt beslut på nästa möte.' },
      { text: 'Sekreteraren kan alltid rätta uppenbara felskrivningar', korrekt: false, feedback: 'Uppenbara felskrivningar kan rättas, men substansen i ett justerat protokoll får inte ändras.' },
      { text: 'Det spelar ingen roll — protokoll är interna dokument', korrekt: false, feedback: 'Fel. Protokoll är officiella handlingar som kan behövas vid tvister och revisioner.' },
    ],
    tips: ['Justera protokollet snarast efter mötet', 'Fel i ett justerat protokoll rättas via beslut på nästa möte', 'Spara alla protokoll — de är viktiga juridiska dokument'],
  },
  {
    id: 9, persona: 'Johan', roll: 'Kassör, BRF Tallbacken',
    bild: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    kategori: 'Avgiftshöjning', highlight: ['styrelsen', 'årsavgiften'],
    bubbla: 'Föreningen behöver höja årsavgiften med 15%. En medlem på stämman hävdar att detta kräver kvalificerad majoritet.',
    fraga: 'Vad krävs för att besluta om avgiftshöjning?',
    alternativ: [
      { text: 'Kvalificerad majoritet (2/3) krävs alltid vid avgiftshöjning', korrekt: false, feedback: 'Fel. Avgiftshöjningar beslutas normalt av styrelsen — inte av stämman.' },
      { text: 'Styrelsen beslutar om årsavgiften inom ramen för föreningens ekonomiska behov', korrekt: true, feedback: 'Rätt. Styrelsen har rätt att besluta om årsavgiften. Det är inte ett stämmobeslut.' },
      { text: 'Enkel majoritet på stämman räcker', korrekt: false, feedback: 'Avgiftshöjning är normalt ett styrelsebeslut, inte ett stämmobeslut.' },
      { text: 'Avgiften kan bara höjas en gång per år', korrekt: false, feedback: 'Det finns ingen lagstadgad begränsning om hur ofta avgiften kan höjas.' },
    ],
    tips: ['Styrelsen beslutar normalt om årsavgiften', 'Motivera alltid höjningen med föreningens kostnader', 'Kommunicera beslutet i god tid till medlemmarna'],
  },
  {
    id: 10, persona: 'Maria', roll: 'Ordförande, BRF Stenen',
    bild: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
    kategori: 'Andrahandsuthyrning', highlight: ['beaktansvärda skäl', 'hyresnämnden'],
    bubbla: 'En medlem vill hyra ut sin lägenhet i andra hand i ett år för att han ska arbeta utomlands. Han har betalat sina avgifter och skött sig exemplariskt.',
    fraga: 'Kan styrelsen neka honom tillstånd?',
    alternativ: [
      { text: 'Ja — styrelsen bestämmer alltid vem som får bo i föreningen', korrekt: false, feedback: 'Fel. Styrelsen kan neka, men bara av godtagbara skäl. Godtyckliga nekanden strider mot lagen.' },
      { text: 'Nej — en skötsam member med beaktansvärda skäl har rätt att hyra ut i andra hand', korrekt: true, feedback: 'Rätt. Tillfälligt arbete utomlands är ett beaktansvärt skäl. Om styrelsen nekar kan hyresnämnden ge tillstånd.' },
      { text: 'Styrelsen kan alltid neka utan att motivera beslutet', korrekt: false, feedback: 'Fel. Nekandet ska alltid kunna motiveras. Godtyckliga beslut kan överprövas av hyresnämnden.' },
      { text: 'Det krävs stämmobeslut för att godkänna andrahandsuthyrning', korrekt: false, feedback: 'Fel. Andrahandsuthyrning beslutas av styrelsen — inte av stämman.' },
    ],
    tips: ['Beaktansvärda skäl: arbete/studier på annan ort, provsamboende, sjukdom', 'Neka alltid med skriftlig motivering', 'Hyresnämnden kan överpröva styrelsens beslut'],
  },
  {
    id: 11, persona: 'Erik', roll: 'Suppleant, BRF Furuhöjden',
    bild: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    kategori: 'Föreningsstämma', highlight: ['stadgarna', 'motionsfrist'],
    bubbla: 'En motion lämnades in av en medlem för sent — bara 3 dagar innan stämman. Ordföranden vill ändå ta upp den på dagordningen.',
    fraga: 'Hur ska motioner hanteras?',
    alternativ: [
      { text: 'Styrelsen kan alltid välja att ta upp en motion oavsett när den lämnades in', korrekt: false, feedback: 'Fel. Motioner ska lämnas in inom den tid som stadgarna anger.' },
      { text: 'Motioner ska lämnas in i den tid stadgarna föreskriver — annars behöver stämman inte behandla den', korrekt: true, feedback: 'Rätt. En motion som lämnats in för sent är inte giltig. Stämman kan välja att behandla den, men är inte skyldig.' },
      { text: 'Alla motioner måste behandlas på stämman oavsett när de lämnades in', korrekt: false, feedback: 'Fel. Sent inlämnade motioner behöver inte tas upp.' },
      { text: 'Motioner måste lämnas in minst 30 dagar i förväg enligt lag', korrekt: false, feedback: 'Det finns ingen generell lagstadgad tid — det regleras i varje förenings stadgar.' },
    ],
    tips: ['Kontrollera era stadgar för motionsfrist', 'Informera medlemmarna om fristen i god tid', 'En sent inlämnad motion kan tas upp om stämman beslutar det enhälligt'],
  },
  {
    id: 12, persona: 'Birgitta', roll: 'Ledamot, BRF Havsutsikt',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    kategori: 'Styrelsens ansvar', highlight: ['personligt ansvariga', 'oaktsamhet'],
    bubbla: 'Styrelsen fattade ett beslut som ledde till en stor ekonomisk förlust för föreningen. En medlem vill hålla styrelsen personligt ansvarig.',
    fraga: 'När kan styrelseledamöter bli personligt ansvariga?',
    alternativ: [
      { text: 'Aldrig — styrelseledamöter är alltid skyddade av föreningen', korrekt: false, feedback: 'Fel. Styrelseledamöter kan bli personligt ansvariga om de agerat vårdslöst eller i strid med lag.' },
      { text: 'Vid oaktsamhet, brott mot stadgarna eller mot bostadsrättslagen', korrekt: true, feedback: 'Rätt. Styrelseledamöter kan hållas personligt ansvariga om de orsakat skada genom oaktsamhet eller lagbrott. Välgrundade beslut som slår fel ger normalt inte ansvar.' },
      { text: 'Alltid om ett beslut leder till ekonomisk förlust', korrekt: false, feedback: 'Fel. Det är inte personligt ansvar att ha fattat ett välgrundat beslut som fick negativa konsekvenser.' },
      { text: 'Bara om styrelsen medvetet har handlat mot medlemmarnas intressen', korrekt: false, feedback: 'Oaktsamhet räcker — det krävs inte uppsåt.' },
    ],
    tips: ['Dokumentera alltid underlagen för era beslut', 'Välgrundade beslut som slår fel ger normalt inte personligt ansvar', 'Teckna en styrelseansvarsförsäkring'],
  },
];

const maxScore = questions.length * 100;

const getResult = (score: number) => {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return { label: 'Imponerande styrelsekunskap!', sub: 'Du har redan en god grund. Styrelsekörkortet ger dig den kompletta verktygslådan för att hantera alla situationer med trygghet.', icon: Trophy, color: O };
  if (pct >= 50) return { label: 'Du är på rätt väg', sub: 'Du har grunderna — men det finns viktiga luckor. Styrelsekörkortet täcker exakt de situationer du missade.', icon: Star, color: '#f59e0b' };
  return { label: 'Här finns mycket att vinna', sub: 'Som styrelseledamot bär du ett juridiskt ansvar. Styrelsekörkortet ger dig kunskapen du behöver — snabbt och praktiskt.', icon: AlertTriangle, color: '#ef4444' };
};

// ── HighlightText ─────────────────────────────────────────
const HighlightText = ({ text, words }: { text: string; words: string[] }) => {
  if (!words?.length) return <>{text}</>;
  const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return <>{parts.map((p, i) => words.some(w => w.toLowerCase() === p.toLowerCase()) ? <span key={i} style={{ color: O, fontWeight: 900 }}>{p}</span> : <span key={i}>{p}</span>)}</>;
};

// ── AlternativKnapp ───────────────────────────────────────
const AlternativKnapp = ({ alt, valt, visar, onVälj }: any) => {
  const isValt = valt === alt.text;
  const visaRes = visar && isValt;
  const isCorrectUnselected = visar && alt.korrekt && !isValt;
  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { scale: 1.01, x: 3, boxShadow: `0 4px 20px ${O}25` } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left', padding: '20px 22px', minHeight: 72,
        borderRadius: 16,
        background: visaRes ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)') : isCorrectUnselected ? `${O}08` : isValt ? OL : '#fff',
        border: `2px solid ${visaRes ? (alt.korrekt ? O : '#9ca3af') : isCorrectUnselected ? `${O}50` : isValt ? O : '#e5e7eb'}`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 18,
        transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 4px 16px ${O}20` : 'none',
      }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: visaRes ? (alt.korrekt ? O : '#9ca3af') : isCorrectUnselected ? `${O}30` : isValt ? O : '#f0f0f0',
        border: `2px solid ${visaRes ? 'transparent' : isValt ? O : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, fontWeight: 900, color: isValt || visaRes ? '#fff' : '#9ca3af',
        transition: 'all 0.18s',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : isValt ? '●' : null}
      </div>
      <p style={{ fontSize: 19, color: visaRes ? (alt.korrekt ? '#b84400' : '#6b7280') : '#1f2937', lineHeight: 1.45, flex: 1, fontWeight: isValt ? 700 : 500 }}>
        {alt.text}
      </p>
    </motion.button>
  );
};

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function QuizSalesPage() {
  const navigate = useNavigate();
  const [fas, setFas] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [idx, setIdx] = useState(0);
  const [valt, setValt] = useState<string | null>(null);
  const [visar, setVisar] = useState(false);
  const [score, setScore] = useState(0);
  const [ratt, setRatt] = useState(0);
  const [svar, setSvar] = useState<boolean[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, [idx, fas]);

  const current = questions[idx];
  const valtAlt = valt ? current.alternativ.find(a => a.text === valt) : null;
  const pctProgress = (idx / questions.length) * 100;

  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = current.alternativ.find(a => a.text === text)!;
    setValt(text);
    setVisar(true);
    if (alt.korrekt) { setScore(s => s + 100); setRatt(r => r + 1); }
    setSvar(s => [...s, alt.korrekt]);
  };

  const handleNästa = () => {
    if (idx < questions.length - 1) { setIdx(i => i + 1); setValt(null); setVisar(false); }
    else setFas('result');
  };

  const handleOm = () => { setFas('intro'); setIdx(0); setValt(null); setVisar(false); setScore(0); setRatt(0); setSvar([]); };

  const result = getResult(score);
  const ResultIcon = result.icon;

  // ══════════════════════════════════════════
  // INTRO — ny design
  // ══════════════════════════════════════════
  if (fas === 'intro') return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#0f1623', fontFamily: "'Nunito', sans-serif" }}>
      {/* Vänster — bild + stats */}
      <div className="hidden lg:flex w-1/2 flex-shrink-0 relative flex-col justify-center" style={{ padding: '60px 56px' }}>
        <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,22,35,0.3), #0f1623)' }} />
        <div className="relative z-10">
          <div style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg, ${O}, ${OD})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 32, boxShadow: `0 12px 40px ${O}40` }}>
            ⚖️
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase' as const, color: O, marginBottom: 16 }}>Styrelsekörkortet®</p>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Vet du vad som gäller<br />när det väl händer?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 40 }}>
            12 verkliga situationer från svenska BRF-styrelser. Jäv, diskriminering, underhåll och stämmobeslut.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[{ v: '12', l: 'situationer' }, { v: '~5', l: 'minuter' }, { v: '100%', l: 'gratis' }].map((s, i) => (
              <div key={i} style={{ padding: '18px 12px', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <p style={{ fontSize: 26, fontWeight: 900, color: O }}>{s.v}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Höger — CTA */}
      <div className="flex-1 flex items-center overflow-y-auto px-8 sm:px-14 py-16">
        <motion.div className="max-w-md w-full" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{ background: `${O}22`, color: O, border: `1px solid ${O}44` }}>
            Gratis BRF-test · 12 frågor · ~5 min
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Hur trygg är du i<br /><span style={{ color: O }}>styrelserollen?</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Ta testet och se exakt var du står. Vi berättar vad du bör veta — och hur du lär dig det snabbt.
          </p>
          {/* Vad testas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
            {['Likhetsprincipen & diskriminering', 'Jäv, protokoll & beslutsmässighet', 'Underhållsansvar & stämmobeslut', 'Andrahandsuthyrning & styrelsens ansvar'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${O}22`, border: `1px solid ${O}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: O }} />
                </div>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{item}</p>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => setFas('quiz')}
            className="w-full py-5 rounded-2xl font-black text-white text-xl flex items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 10px 36px ${O}45` }}>
            Starta testet <ArrowRight size={22} />
          </motion.button>
          <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Ingen registrering · Direkt resultat · Används av styrelser i hela Sverige
          </p>
        </motion.div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════
  // RESULT
  // ══════════════════════════════════════════
  if (fas === 'result') {
    const pct = Math.round((score / maxScore) * 100);
    return (
      <div className="min-h-screen flex overflow-hidden" style={{ background: '#0f1623', fontFamily: "'Nunito', sans-serif" }}>
        <div className="hidden lg:block w-1/2 flex-shrink-0 relative">
          <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
            className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, #0f1623)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-9xl font-black text-white">{pct}%</p>
              <p className="text-lg mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{ratt} av {questions.length} rätt</p>
              <div className="flex justify-center gap-2 mt-6 flex-wrap max-w-xs mx-auto">
                {svar.map((r, i) => (
                  <div key={i} className="w-4 h-4 rounded-full" style={{ background: r ? O : 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center overflow-y-auto px-8 sm:px-14 py-16">
          <div className="max-w-md w-full space-y-6">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${result.color}20` }}>
                <ResultIcon size={30} style={{ color: result.color }} />
              </div>
              <h2 className="text-3xl font-black text-white mb-3">{result.label}</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: 17 }}>{result.sub}</p>
            </div>
            <div className="lg:hidden rounded-2xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-5xl font-black text-white">{pct}%</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{ratt} av {questions.length} rätt</p>
            </div>
            <div className="rounded-2xl p-7" style={{ background: `${O}15`, border: `1px solid ${O}35` }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>Styrelsekörkortet®</p>
              <h3 className="text-xl font-black text-white mb-2">Lär dig hantera alla dessa situationer — med trygghet</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                14 moduler med verkliga scenarier, juridik och praktiska verktyg. I din egen takt. Certifikat när du är klar.
              </p>
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-black text-white">1 490 kr</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>/ styrelse · exkl. moms</span>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                className="w-full py-4 rounded-xl font-black text-white text-lg flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 6px 24px ${O}40` }}>
                Kom igång idag <ArrowRight size={18} />
              </motion.button>
            </div>
            <button onClick={handleOm} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
              <RotateCcw size={13} /> Gör om testet
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // QUIZ
  // ══════════════════════════════════════════
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', fontFamily: "'Nunito', sans-serif" }}>
      <video ref={videoRef} src="/video/intro-brf-1.mp4" muted playsInline loop
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.88)', zIndex: 1 }} />

      {/* Sticky topbar */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
          <motion.div animate={{ width: `${pctProgress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(to right, ${O}, ${OD})` }} />
        </div>
        {/* Info-rad: kategori centrerat, X till höger */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', background: 'rgba(10,16,28,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Centrerat innehåll */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O }}>{current.kategori}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{idx + 1} / {questions.length}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {questions.map((_, i) => (
                <div key={i} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, background: i < idx ? (svar[i] ? O : 'rgba(255,255,255,0.2)') : i === idx ? O : 'rgba(255,255,255,0.12)', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>
          {/* X absolut till höger */}
          <button onClick={() => navigate(-1)} style={{ position: 'absolute', right: 24, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:grid" style={{ flex: 1, gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 10, overflow: 'hidden' }}>

        {/* Vänster — persona CENTRERAD */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 56px', gap: 28 }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%', maxWidth: 440 }}>

              {/* Persona — centrerad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <img src={current.bild} alt={current.persona}
                  style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `4px solid ${O}`, boxShadow: `0 0 40px ${O}55`, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{current.persona}</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{current.roll}</p>
                </div>
              </div>

              {/* Bubbla — centrerad, god storlek */}
              <div style={{ padding: '28px 32px', borderRadius: '4px 24px 24px 24px', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(20px)', width: '100%' }}>
                <p style={{ fontSize: 22, color: '#ffffff', lineHeight: 1.8, fontWeight: 400, textAlign: 'center' }}>
                  "{current.bubbla}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Höger — vit sida */}
        <div style={{ background: '#FAFAF8', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 52px' }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`q${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                <h3 style={{ fontSize: 36, fontWeight: 900, color: '#111827', lineHeight: 1.2, marginBottom: 32 }}>
                  <HighlightText text={current.fraga} words={current.highlight || []} />
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {current.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`f${idx}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ padding: '22px 26px', borderRadius: 18, marginBottom: 20, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af40'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    {valtAlt?.korrekt ? <CheckCircle size={28} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={28} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#111827' }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                  </div>
                  <p style={{ fontSize: 18, color: '#374151', lineHeight: 1.7 }}>{valtAlt?.feedback}</p>
                </div>
                <div style={{ padding: '18px 22px', borderRadius: 14, background: OL, border: `1px solid ${O}30`, marginBottom: 22 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 12 }}>Kom ihåg</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 8 }} />
                      <p style={{ fontSize: 17, color: '#374151', lineHeight: 1.65 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleNästa}
                  style={{ width: '100%', padding: '20px', borderRadius: 16, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 20, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 6px 24px ${O}40` }}>
                  {idx < questions.length - 1 ? <>Nästa situation <ChevronRight size={22} /></> : <>Se mitt resultat <ChevronRight size={22} /></>}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBIL — ren bottom-sheet design ── */}
      <div className="lg:hidden flex flex-col" style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 10 }}>

        {/* Mörk topp ~40% — persona + bubbla */}
        <div style={{ padding: '20px 20px 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <img src={current.bild} alt={current.persona}
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${O}`, flexShrink: 0, boxShadow: `0 0 20px ${O}50` }} />
            <div>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{current.persona}</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{current.roll}</p>
            </div>
          </div>
          <div style={{ padding: '18px 20px', borderRadius: '4px 20px 20px 20px', background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)' }}>
            <p style={{ fontSize: 17, color: '#fff', lineHeight: 1.7, fontWeight: 400 }}>"{current.bubbla}"</p>
          </div>
        </div>

        {/* Vit bottom card — kompakt */}
        <div style={{ borderRadius: '28px 28px 0 0', flex: 1, overflowY: 'auto', padding: '20px 16px 36px' }}>
          {/* Drag-indikator */}
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto 18px' }} />

          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`mq${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', lineHeight: 1.3, marginBottom: 18 }}>
                  <HighlightText text={current.fraga} words={current.highlight || []} />
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => {
                    const isValt = valt === alt.text;
                    const visaRes = visar && isValt;
                    return (
                      <button key={alt.text} onClick={() => !visar && handleVälj(alt.text)}
                        style={{
                          textAlign: 'left', padding: '14px 16px', minHeight: 60,
                          borderRadius: 14,
                          background: isValt ? `${O}20` : 'rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(12px)',
                          border: `2px solid ${isValt ? O : 'rgba(255,255,255,0.35)'}`,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: isValt ? O : 'rgba(255,255,255,0.2)', border: `2px solid ${isValt ? O : 'rgba(255,255,255,0.4)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 900, color: isValt ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                          {isValt ? '●' : null}
                        </div>
                        <span style={{ fontSize: 16, color: '#ffffff', lineHeight: 1.45, fontWeight: isValt ? 700 : 500 }}>{alt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`mf${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                {/* Feedback */}
                <div style={{ padding: '18px 20px', borderRadius: 18, marginBottom: 14, background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.07)', border: `2px solid ${valtAlt?.korrekt ? O + '55' : '#9ca3af35'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    {valtAlt?.korrekt ? <CheckCircle size={24} style={{ color: O, flexShrink: 0 }} /> : <XCircle size={24} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                    <p style={{ fontSize: 18, fontWeight: 900, color: '#ffffff' }}>{valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}</p>
                  </div>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>{valtAlt?.feedback}</p>
                </div>
                {/* Tips */}
                <div style={{ padding: '14px 16px', borderRadius: 14, background: OL, border: `1px solid ${O}30`, marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' as const, color: O, marginBottom: 8 }}>Kom ihåg</p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 8 }} />
                      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleNästa}
                  style={{ width: '100%', padding: '18px', borderRadius: 16, cursor: 'pointer', background: `linear-gradient(135deg, ${O}, ${OD})`, border: 'none', color: '#fff', fontSize: 17, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 6px 20px ${O}40` }}>
                  {idx < questions.length - 1 ? 'Nästa situation' : 'Se mitt resultat'} <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}