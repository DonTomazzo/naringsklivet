// src/modules/Styrelsekorkortet/ModuleHallbarhet.tsx
// Hållbarhet i föreningen – hub + individuella ämnesslides
// Fokus på ROI, praktiska åtgärder och aktuella regler
// Fullwidth bilder med orange cirklar

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Award, CheckCircle,
  Zap, Sun, Car, Thermometer, Recycle, Droplets,
  TrendingUp, BarChart2, Leaf, Shield, Clock, Euro
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import AudioPlayer       from '../../components/AudioPlayer';

const ORANGE = '#FF5421';
const DARK   = '#0f1623';
const GREEN  = '#16a34a';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Finns det bidrag för solceller på BRF-fastigheter?',
    answer: 'Ja – Skattereduktion för grön teknik (ROT-avdrag för solceller) gäller för bostadsrättsföreningar. Reduktionen är 15% av materialkostnaden. Ansök via Skatteverket efter installation.',
  },
  {
    question: 'Vad är en energideklaration och måste vi ha en?',
    answer: 'Ja, alla flerbostadshus måste ha en energideklaration som förnyas vart 10:e år. Den visar byggnadens energiprestanda och ger förslag på förbättringar. Boverket är ansvarig myndighet.',
  },
  {
    question: 'Hur finansierar vi en laddstolpsinstallation?',
    answer: 'Vanligast är att föreningen tar ett lån och debiterar medlemmarna via månadsavgiften, eller att varje intresserad boende betalar sin andel. Klimatklivet från Naturvårdsverket ger ibland bidrag för laddinfrastruktur.',
  },
  {
    question: 'Vad innebär EU:s energidirektiv EPBD för vår förening?',
    answer: 'EU:s renoverade energidirektiv (EPBD) kräver att flerbostadshus förbättrar sin energiprestanda successivt fram till 2033. De sämsta byggnaderna (energiklass F–G) berörs först. Sverige håller på att implementera direktivet i nationell lag.',
  },
  {
    question: 'Är det lönsamt med bergvärme för en BRF?',
    answer: 'Ofta ja – återbetalningstiden är typiskt 8–14 år för en BRF som byter från direktel eller olja. Med nuvarande energipriser kan besparingen vara 30–60% av uppvärmningskostnaden. Räkna alltid på era specifika förutsättningar med en energikonsult.',
  },
];

// ─── Ämnen ───────────────────────────────────────────────
const AMNEN = [
  {
    id: 'solceller',
    namn: 'Solceller',
    kort: 'Egenproducerad el och skattereduktion',
    emoji: '☀️',
    icon: Sun,
    bild: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80',
    roi: { aterbet: '10–15 år', besparing: '15–25%', bidrag: 'Ja – grön teknik' },
    intro: 'Solceller är idag en av de mest lönsamma hållbarhetsinvesteringarna för en BRF. Priserna har sjunkit dramatiskt det senaste decenniet och staten erbjuder skattereduktion för installation.',
    fakta: [
      {
        rubrik: 'Hur fungerar det?',
        text: 'Solpanelerna producerar el som föreningen använder direkt – till gemensamma utrymmen, hissar, tvättstugor och eventuellt laddstolpar. Överskottselen säljs tillbaka till elnätet.',
        icon: Sun,
      },
      {
        rubrik: 'Ekonomin i siffror',
        text: 'En typisk BRF med 40 lägenheter och 100 kWp solceller producerar ca 90 000 kWh/år. Med ett elpris på 1,50 kr/kWh ger det en besparing på ca 135 000 kr/år. Installationskostnad: ca 900 000–1 200 000 kr.',
        icon: BarChart2,
      },
      {
        rubrik: 'Skattereduktion för grön teknik',
        text: 'Föreningen kan ansöka om skattereduktion med 15% av materialkostnaden (ej arbete). Reduktionen kvittas mot föreningens inkomstskatt. Kontakta er revisor för att maxima nyttan.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Processen – steg för steg',
        text: 'Energikartläggning → Offertförfrågan (minst 3) → Stämmobeslut om investering → Nätanmälan till elnätsbolaget → Installation → Ansökan om skattereduktion.',
        icon: CheckCircle,
      },
    ],
    cirklar: [
      { label: '☀️ Produktion', text: 'Panelerna producerar el under dagtid. Maximalt utbyte april–september.' },
      { label: '⚡ Egenanvändning', text: 'El används direkt i fastigheten – hissar, belysning, tvättstuga, laddstolpar.' },
      { label: '🔄 Nätförsäljning', text: 'Överskott säljs till elnätet. Inkomsten kvittas mot inköpt el.' },
      { label: '📊 ROI', text: 'Typisk återbetalningstid 10–15 år. Livslängd 25–30 år.' },
      { label: '🏛️ Bidrag', text: '15% skattereduktion på materialkostnad via grön teknik-avdraget.' },
    ],
    tips: 'Be alltid om en energikartläggning innan ni beställer solceller. Rätt dimensionering är avgörande för lönsamheten.',
    bildtext: 'Solceller på BRF-tak',
  },
  {
    id: 'laddstolpar',
    namn: 'Laddstolpar',
    kort: 'Elbilsladdning för boende och gäster',
    emoji: '⚡',
    icon: Zap,
    bild: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80',
    roi: { aterbet: '5–10 år', besparing: 'Intäkt till föreningen', bidrag: 'Klimatklivet möjligt' },
    intro: 'Laddmöjlighet är idag en av de mest efterfrågade faciliteterna i en BRF. En välplanerad laddinfrastruktur höjer fastighetens värde och kan ge föreningen intäkter.',
    fakta: [
      {
        rubrik: 'Smart laddinfrastruktur',
        text: 'Installera hellre en robust kabelinfrastruktur med lastbalansering från start än att lappa till efterhand. En laddbox per plats idag kostar lite mer nu men sparar stora ombyggnadskostnader senare.',
        icon: Zap,
      },
      {
        rubrik: 'Finansieringsmodeller',
        text: 'Tre vanliga modeller: (1) Föreningen installerar och debiterar el + serviceavgift. (2) Extern operatör installerar och driver – föreningen får provision. (3) Individuell installation per boende – kräver noggrann samordning.',
        icon: BarChart2,
      },
      {
        rubrik: 'Moms och IMD',
        text: 'Om föreningen säljer el till boende baserat på faktisk förbrukning är det momspliktig tjänst om omsättningen överstiger 80 000 kr/år. Kontakta revisor innan ni sätter upp faktureringsmodell.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Elnätskapacitet',
        text: 'Kontakta elnätsbolaget tidigt – kapaciteten i transformatorn begränsar hur många laddboxar ni kan installera. Lastbalansering är obligatoriskt vid fler än 3–4 laddpunkter.',
        icon: Shield,
      },
    ],
    cirklar: [
      { label: '🔌 Infrastruktur', text: 'Dra kabel till alla parkeringsplatser nu – billigast i samband med andra markarbeten.' },
      { label: '⚖️ Lastbalansering', text: 'Systemet fördelar tillgänglig effekt intelligent mellan aktiva laddningar.' },
      { label: '💰 Intäktsmodell', text: 'Debitera el + servicemarginal. Typisk intäkt: 200–400 kr/mån per aktiv laddare.' },
      { label: '📱 App-styrning', text: 'Moderna system låter boende starta/stoppa och se sin förbrukning via app.' },
      { label: '🏛️ Bidrag', text: 'Klimatklivet från Naturvårdsverket – kontrollera aktuella villkor på naturvardsverket.se.' },
    ],
    tips: 'Skaffa en samordnare för laddinstallationen – en person i styrelsen som driver processen från offert till drift.',
    bildtext: 'Laddstolpar i BRF-garage',
  },
  {
    id: 'uppvarmning',
    namn: 'Uppvärmning',
    kort: 'Bergvärme, fjärrvärme och värmepumpar',
    emoji: '🔥',
    icon: Thermometer,
    bild: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    roi: { aterbet: '8–14 år', besparing: '30–60%', bidrag: 'Energiskatten sänkt' },
    intro: 'Uppvärmning är den enskilt största energikostnaden för de flesta BRF:er. Rätt system kan halvera kostnaden och är ofta den investering med bäst ROI.',
    fakta: [
      {
        rubrik: 'Bergvärme vs fjärrvärme',
        text: 'Bergvärme ger lägre driftskostnad men kräver stor investering och fungerande berggrund. Fjärrvärme är enklare att administrera men priset styrs av leverantören. Geoenergi (berg+sol) är ett framtidssäkert alternativ.',
        icon: Thermometer,
      },
      {
        rubrik: 'Frånluftsvärmepump – lågt hängande frukt',
        text: 'En frånluftsvärmepump återvinner värme från ventilationsluften. Passar de flesta flerbostadshus, relativt låg installationskostnad (300–600 kkr) och återbetalningstid på 4–8 år.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Styr- och reglersystem',
        text: 'Modern styrautomatik kan sänka uppvärmningskostnaden med 10–20% utan någon investering i nytt värmesystem. Individuell mätning (IMD) ökar dessutom boendes incitament att spara.',
        icon: BarChart2,
      },
      {
        rubrik: 'EU:s EPBD-direktiv',
        text: 'EU:s energidirektiv kräver successiv förbättring av flerbostadshusets energiprestanda. Byggnader med energiklass F–G måste renoveras först. Planera nu för att undvika framtida tvångsinvesteringar.',
        icon: Shield,
      },
    ],
    cirklar: [
      { label: '⛰️ Berg-värme', text: 'Hämtar värme ur marken. COP 3–4: varje kWh el ger 3–4 kWh värme.' },
      { label: '🌬️ Frånluft', text: 'Återvinner värme från ventilationen. Snabbast och billigast att installera.' },
      { label: '📡 Styr-system', text: 'Smart reglering sänker kostnaden 10–20% utan systembyten.' },
      { label: '🌡️ IMD', text: 'Individuell mätning sänker snittförbrukningen med 10–25%.' },
      { label: '📋 EPBD', text: 'EU-krav på energiförbättringar. Planera nu – undvik tvångsinvesteringar.' },
    ],
    tips: 'Gör en energikartläggning (obligatoriskt för byggnader >1000 m²) och prioritera åtgärderna efter bäst ROI.',
    bildtext: 'Energieffektiv uppvärmning',
  },
  {
    id: 'energieffektivisering',
    namn: 'Energieffektivisering',
    kort: 'Belysning, isolering och styrning',
    emoji: '💡',
    icon: Zap,
    bild: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80',
    roi: { aterbet: '2–8 år', besparing: '20–40%', bidrag: 'ROT för vissa åtgärder' },
    intro: 'Energieffektivisering handlar om att minska förbrukningen utan att sänka komforten. Många åtgärder är billiga med snabb återbetalningstid.',
    fakta: [
      {
        rubrik: 'LED-belysning – snabbast ROI',
        text: 'Byte till LED i trapphus, garage, källare och utemiljö är den åtgärd med kortast återbetalningstid – ofta 1–3 år. Energibesparingen är 60–80% jämfört med äldre armatur. Kombinera med rörelsesensorer.',
        icon: Zap,
      },
      {
        rubrik: 'Fönster och isolering',
        text: 'Byte av äldre fönster (1- eller 2-glas) till moderna 3-glasfönster minskar värmeförluster med 50–70%. Tilläggsisolering av vindsbjälklag är ofta kostnadseffektivt med återbetalningstid 5–10 år.',
        icon: Shield,
      },
      {
        rubrik: 'Ventilation och FTX',
        text: 'Byte till FTX-ventilation (från- och tilluftsventilation med värmeåtervinning) minskar ventilationsförluster med upp till 80%. Kostsamt men ger också bättre inomhusmiljö.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Grön el och ursprungsgarantier',
        text: 'Köp el med ursprungsgaranti från förnybar källa. Kostar marginellt mer men minskar föreningens klimatavtryck direkt och kan vara en profileringsfråga mot potentiella köpare.',
        icon: Leaf,
      },
    ],
    cirklar: [
      { label: '💡 LED', text: 'Byt all belysning till LED med sensorer. ROI 1–3 år. Bästa start.' },
      { label: '🪟 Fönster', text: 'Moderna 3-glasfönster halverar värmeförluster. ROI 8–15 år.' },
      { label: '🏠 Isolering', text: 'Vindsisolering ger snabb ROI. Fasad är dyrare men ger mer.' },
      { label: '🌬️ FTX', text: 'Värmeåtervinning ur ventilationsluften. ROI 10–15 år.' },
      { label: '🌱 Grön el', text: 'Ursprungsgaranterad förnybar el. Liten kostnad, stor profil.' },
    ],
    tips: 'Börja alltid med LED och styrning – billigast, snabbast ROI och inga stämmobeslut krävs för löpande drift.',
    bildtext: 'Energieffektiv fastighet',
  },
  {
    id: 'vatten',
    namn: 'Vatten & avlopp',
    kort: 'Vattenbesparing och stamrenovering',
    emoji: '💧',
    icon: Droplets,
    bild: 'https://images.unsplash.com/photo-1504383633899-3e3b56d3d0a2?w=1920&q=80',
    roi: { aterbet: '5–20 år', besparing: '15–30% vatten', bidrag: 'ROT för stambyten' },
    intro: 'Vatten och avlopp är ofta underprioriterade i hållbarhetsarbetet – men stamrenovering är oundviklig förr eller senare, och vattenbesparande åtgärder betalar sig snabbt.',
    fakta: [
      {
        rubrik: 'Stambyte – planera i tid',
        text: 'Gjutjärnsrör från 1950–1970-talen har en livslängd på 50–60 år. Många föreningar sitter på tidsbomber. Planerat stambyte kostar 150–300 kkr per lägenhet. Akut stambyte efter skada kostar 2–3 gånger mer.',
        icon: Clock,
      },
      {
        rubrik: 'Relining – alternativ till stambyte',
        text: 'Relining innebär att man gjuter ett nytt rör i det befintliga – utan att riva upp golv och väggar. Kostar 50–70% av ett traditionellt stambyte. Livslängd 25–30 år. Passar inte alla rördimensioner.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Snålspolande armaturer',
        text: 'Byte till snålspolande toaletter (4/2 liter) och lågflödescensorer på kranar kan minska vattenförbrukningen med 20–30%. ROI ofta 3–5 år och inga stora ingrepp krävs.',
        icon: Droplets,
      },
      {
        rubrik: 'Individuell mätning (IMD) av vatten',
        text: 'IMD vatten ger boende incitament att spara och kan sänka total förbrukning med 15–25%. Obs: utlöser momsplikt om omsättningen överstiger 80 000 kr/år. Kontakta revisor.',
        icon: BarChart2,
      },
    ],
    cirklar: [
      { label: '🔧 Stambyte', text: 'Planerat stambyte kostar hälften mot ett akut. Planera tidigt.' },
      { label: '🔄 Relining', text: 'Nytt rör i befintligt. 50–70% billigare. Livslängd 25–30 år.' },
      { label: '🚿 Snålspol', text: 'Snålspolande toaletter och kranar. ROI 3–5 år.' },
      { label: '📊 IMD', text: 'Individuell mätning sänker förbrukning 15–25%.' },
      { label: '⚠️ Moms', text: 'IMD vatten kan utlösa momsplikt. Kontakta revisor.' },
    ],
    tips: 'Beställ en rörinspektionsrapport (kamera i stammarna) om ni inte gjort det de senaste 10 åren. Det bästa underlaget för att planera stambyte.',
    bildtext: 'Stamrenovering och vattenbesparing',
  },
  {
    id: 'avfall',
    namn: 'Avfall & cirkulär ekonomi',
    kort: 'Sortering, miljörum och återbruk',
    emoji: '♻️',
    icon: Recycle,
    bild: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&q=80',
    roi: { aterbet: 'Lagkrav', besparing: 'Minskade avfallskostnader', bidrag: 'Kommunala stöd möjliga' },
    intro: 'Avfallshantering har gått från frivillig miljöfråga till lagkrav. 2024 kom obligatorisk matavfallssortering – och 2027 krävs fastighetsnära förpackningsinsamling.',
    fakta: [
      {
        rubrik: 'Matavfall – krav sedan 2024',
        text: 'Sedan januari 2024 är det lag på att alla hushåll ska sortera matavfall separat. Föreningen ansvarar för att kärl finns och att boende kan sortera rätt. Kontakta kommunens renhållningsbolag för lösning.',
        icon: Recycle,
      },
      {
        rubrik: 'Förpackningar – krav 2027',
        text: 'Senast januari 2027 ska alla BRF:er erbjuda fastighetsnära insamling av förpackningar (plast, papper, metall, glas). Många miljörum behöver byggas om. Börja planera nu.',
        icon: Clock,
      },
      {
        rubrik: 'Återbruksrum',
        text: 'Allt fler föreningar inrättar återbruksrum – ett utrymme där boende kan lämna och hämta saker gratis. Det minskar avfallsmängden, skapar gemenskap och är skattemässigt neutralt för föreningen.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Byggavfall vid renoveringar',
        text: 'Renoverings- och byggnadsavfall måste sorteras. Anlita alltid en certifierad avfallshanterare. Farligt avfall (asbest, PCB) kräver specialhantering och kan vara dyrt om det hittas oväntat.',
        icon: Shield,
      },
    ],
    cirklar: [
      { label: '🥗 Mat-avfall', text: 'Lagkrav sedan 2024. Ordna kärl och information till boende.' },
      { label: '♻️ Förpack-ningar', text: 'Fastighetsnära insamling senast jan 2027. Bygg om miljörummet nu.' },
      { label: '🔄 Återbruk', text: 'Återbruksrum minskar avfall och skapar gemenskap.' },
      { label: '🏗️ Bygg-avfall', text: 'Sortera vid renoveringar. Farligt avfall kräver certifierad hantering.' },
      { label: '💶 Kostnad', text: 'Välskött sortering sänker avfallskostnader med 10–20%.' },
    ],
    tips: 'Kontakta kommunen nu om 2027-kravet. Många kommuner erbjuder stöd och rådgivning för BRF:ers omställning.',
    bildtext: 'Miljörum och avfallssortering',
  },
  {
    id: 'roi-kalkyl',
    namn: 'ROI & Finansiering',
    kort: 'Räkna hem investeringen',
    emoji: '📊',
    icon: TrendingUp,
    bild: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
    roi: { aterbet: 'Varierar', besparing: 'Paketlösning ger bäst ROI', bidrag: 'Flera möjliga' },
    intro: 'Hållbarhetsinvesteringar ska löna sig. Här är ramverket för att räkna hem en investering och presentera den för stämman – oavsett om det gäller solceller, laddstolpar eller energirenovering.',
    fakta: [
      {
        rubrik: 'Enkel ROI-kalkyl',
        text: 'ROI (år) = Investeringskostnad ÷ Årlig besparing. Exempel: Solceller kostar 1 000 000 kr och sparar 135 000 kr/år → ROI = 1 000 000 ÷ 135 000 = 7,4 år. Räkna alltid med energiprisökning på 2–3%/år för att se verklig ROI.',
        icon: BarChart2,
      },
      {
        rubrik: 'Finansieringsalternativ',
        text: 'Fyra vanliga alternativ: (1) Föreningslån via bank. (2) Höjd månadsavgift under en period. (3) Engångsuttaxering vid stämman. (4) Extern finansiering via energibolag som tar del av besparingen.',
        icon: Euro,
      },
      {
        rubrik: 'Paketlösningar ger bäst ROI',
        text: 'Om ni ändå renoverar fasad eller tak – lägg på solceller och isolering i samma projekt. Ställningskostnaden delas och ROI förbättras dramatiskt. Planera alltid hållbarhetsåtgärder i kombination med planerat underhåll.',
        icon: TrendingUp,
      },
      {
        rubrik: 'Bidrag och stöd att söka',
        text: 'Grön teknik (15% på solceller), Klimatklivet (laddinfrastruktur), ROT-avdraget (vid vissa arbeten), kommunala energistöd och EU-finansierade program via Energimyndigheten. Kontrollera aktuella villkor.',
        icon: Award,
      },
    ],
    cirklar: [
      { label: '🧮 ROI-formel', text: 'Kostnad ÷ Årlig besparing = Återbetalningstid i år.' },
      { label: '📈 Energipris', text: 'Räkna med 2–3% prisstegring per år. Förbättrar ROI markant.' },
      { label: '🏦 Lån', text: 'Föreningslån för hållbarhetsinvesteringar – vanligast och enklast.' },
      { label: '📦 Paket', text: 'Kombinera med planerat underhåll. Ger bäst ROI.' },
      { label: '🎁 Bidrag', text: 'Grön teknik, Klimatklivet, ROT, kommunala stöd.' },
    ],
    tips: 'Presentera alltid en 20-årig livscykelkostnad för stämman – inte bara installationskostnad. Det ger en rättvisande bild.',
    bildtext: 'Hållbar ekonomi för BRF',
  },
];

// ─── FadeIn ───────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── ROI-BADGE ────────────────────────────────────────────
const RoiBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center text-center p-4 rounded-2xl border"
    style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}>
    <span className="text-white/50 text-xs uppercase tracking-widest mb-1">{label}</span>
    <span className="text-white font-bold text-sm leading-tight">{value}</span>
  </div>
);

// ─── HUB-SLIDE ────────────────────────────────────────────
const HubSlide = ({ onNavigate }: { onNavigate: (i: number) => void }) => (
  <div className="w-full h-full overflow-y-auto relative pb-28"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, rgba(5,20,10,0.80) 0%, rgba(5,20,10,0.65) 50%, rgba(5,20,10,0.85) 100%)' }}
    />

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16">

      {/* Rubrik */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} className="text-center mb-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                         rounded-full mb-4 text-white" style={{ background: ORANGE }}>
          Hållbarhet
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          En grönare förening –<br />
          <span style={{ color: ORANGE }}>med lönsamhet i fokus</span>
        </h1>
        <p className="text-white/55 text-sm sm:text-base max-w-xl mx-auto mb-10">
          Hållbarhetsinvesteringar ska löna sig. Klicka på ett område för att läsa om
          ROI, bidrag och praktiska steg.
        </p>
      </motion.div>

      {/* Cirklar */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-12">
        {AMNEN.map((amne, i) => (
          <motion.button
            key={amne.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(i + 1)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-center p-2 font-bold text-xs leading-tight shadow-lg"
              style={{
                background: ORANGE,
                boxShadow: `0 4px 24px rgba(255,84,33,0.5)`,
              }}
            >
              <div>
                <div className="text-2xl mb-0.5">{amne.emoji}</div>
                <div className="text-[10px] leading-tight">{amne.namn}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
        {[
          { val: '30–60%', label: 'Besparing uppvärmning' },
          { val: '10–15 år', label: 'ROI solceller' },
          { val: '2027', label: 'Krav förpackningar' },
        ].map((s, i) => (
          <div key={i} className="text-center rounded-2xl py-4 px-2"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <p className="font-black text-lg text-white mb-0.5" style={{ color: ORANGE }}>{s.val}</p>
            <p className="text-white/45 text-xs leading-tight">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);

// ─── ÄMNES-SLIDE ──────────────────────────────────────────
const AmnesSlide = ({ amne, onBack, onNext, onPrev, isLast, isFirst }: {
  amne: typeof AMNEN[0];
  onBack: () => void; onNext: () => void; onPrev: () => void;
  isLast: boolean; isFirst: boolean;
}) => {
  const [activeCircle, setActiveCircle] = useState<number | null>(null);

  return (
    <div className="w-full h-full overflow-y-auto pb-28" style={{ background: '#F8F7F4' }}>

      {/* Hero */}
      <div className="relative h-52 sm:h-72 overflow-hidden">
        <img src={amne.bild} alt={amne.namn}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Tillbaka */}
        <button onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ArrowLeft size={12} /> Alla områden
        </button>

        {/* ROI-badges */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-0.5">
                {amne.emoji} {amne.namn}
              </p>
              <p className="text-white/65 text-sm">{amne.kort}</p>
            </div>
            <div className="hidden sm:grid grid-cols-3 gap-2">
              <RoiBadge label="Återbetalningstid" value={amne.roi.aterbet} />
              <RoiBadge label="Besparing" value={amne.roi.besparing} />
              <RoiBadge label="Bidrag" value={amne.roi.bidrag} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobil ROI */}
      <div className="sm:hidden grid grid-cols-3 gap-2 px-4 pt-4">
        <div className="text-center rounded-xl p-3 border" style={{ background: `${ORANGE}10`, borderColor: `${ORANGE}30` }}>
          <p className="text-xs text-slate-500 mb-0.5">Återbetalningstid</p>
          <p className="font-bold text-sm" style={{ color: ORANGE }}>{amne.roi.aterbet}</p>
        </div>
        <div className="text-center rounded-xl p-3 border" style={{ background: `${GREEN}10`, borderColor: `${GREEN}30` }}>
          <p className="text-xs text-slate-500 mb-0.5">Besparing</p>
          <p className="font-bold text-sm" style={{ color: GREEN }}>{amne.roi.besparing}</p>
        </div>
        <div className="text-center rounded-xl p-3 border border-slate-200 bg-white">
          <p className="text-xs text-slate-500 mb-0.5">Bidrag</p>
          <p className="font-bold text-sm text-slate-700">{amne.roi.bidrag}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">

        {/* Intro */}
        <FadeIn>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 border-l-4 pl-4"
            style={{ borderColor: ORANGE }}>
            {amne.intro}
          </p>
        </FadeIn>

        {/* Fakta-kort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {amne.fakta.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-5 border shadow-sm h-full"
                  style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ORANGE}15` }}>
                      <Icon size={16} style={{ color: ORANGE }} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{f.rubrik}</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Cirkel-sektion med fullwidth bild */}
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{ minHeight: 320 }}>
            <img src={amne.bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.58)' }} />

            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-white font-bold text-base sm:text-lg mb-1">{amne.namn} – nyckelbegrepp</p>
              <p className="text-white/50 text-xs mb-6">Klicka på varje cirkel för att läsa mer</p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                {amne.cirklar.map((c, i) => (
                  <motion.button key={i}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCircle(activeCircle === i ? null : i)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-center p-2 text-white font-bold text-xs leading-tight transition-all"
                    style={{
                      background: activeCircle === i ? '#E04619' : ORANGE,
                      boxShadow: activeCircle === i
                        ? `0 0 0 3px white, 0 0 0 5px ${ORANGE}`
                        : `0 4px 16px rgba(255,84,33,0.5)`,
                    }}
                  >
                    {c.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeCircle !== null && (
                  <motion.div
                    key={activeCircle}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-6 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm"
                  >
                    <p className="text-white font-bold text-sm mb-1">{amne.cirklar[activeCircle].label}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{amne.cirklar[activeCircle].text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        {/* Tips */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl p-5 mb-8 border-l-4"
            style={{ background: `${ORANGE}08`, borderColor: ORANGE }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: ORANGE }}>
              💡 Styrelsens tips
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">{amne.tips}</p>
          </div>
        </FadeIn>

        {/* Navigering */}
        <div className="flex gap-3">
          {!isFirst && (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onPrev}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border font-semibold text-sm"
              style={{ borderColor: 'rgba(0,0,0,0.1)', color: DARK, background: 'white' }}>
              <ArrowLeft size={15} /> Föregående
            </motion.button>
          )}
          {!isLast ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}>
              Nästa område <ArrowRight size={15} />
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${GREEN}, #15803d)` }}>
              <Award size={15} /> Tillbaka till översikten
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── HUVUD-KOMPONENT ──────────────────────────────────────
const ModuleHallbarhet: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop]       = useState(false);
  const [userData]                      = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const slides = [
    {
      id: 'hub',
      title: 'Hållbarhet i föreningen',
      component: <HubSlide onNavigate={setCurrentIndex} />,
    },
    ...AMNEN.map((amne, i) => ({
      id: amne.id,
      title: amne.namn,
      component: (
        <AmnesSlide
          amne={amne}
          onBack={() => setCurrentIndex(0)}
          onNext={() => setCurrentIndex(i + 2)}
          onPrev={() => setCurrentIndex(i)}
          isLast={i === AMNEN.length - 1}
          isFirst={i === 0}
        />
      ),
    })),
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: DARK }}>
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
        title="Vanliga frågor om hållbarhet"
        subtitle="Solceller, laddstolpar, energi och ROI"
        buttonColor={ORANGE}
      />
    </div>
  );
};

export default ModuleHallbarhet;