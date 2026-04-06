// src/modules/Styrelsekorkortet/ModuleDokumentation.tsx
// Föreningens dokumentation – hub + individuella dokumentslides
// Tre block: Grunddokument, Löpande dokumentation, GDPR & arkivering

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Award, CheckCircle,
  FileText, BookOpen, Users, Home, Shield,
  Clock, AlertTriangle, Lock, Folder, Scale,
  Building2, ChevronDown, Eye, EyeOff
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';

const ORANGE = '#FF5421';
const DARK   = '#0f1623';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Hur länge måste vi spara styrelseprotokoll?',
    answer: 'Styrelseprotokoll bör sparas permanent eller minst 10 år. De kan behövas vid tvister, revisioner och överlåtelser långt efter att besluten fattades.',
  },
  {
    question: 'Vem har rätt att läsa styrelseprotokollen?',
    answer: 'Styrelseprotokoll är interna dokument — bara styrelseledamöter har automatisk rätt att ta del av dem. Medlemmar har inte laglig rätt att läsa dem, men stämmoprotokoll är alltid offentliga för medlemmarna.',
  },
  {
    question: 'Måste vi ha ett skriftligt medlemsregister?',
    answer: 'Ja — bostadsrättslagen kräver att föreningen för en lägenhetsförteckning med uppgifter om innehavare, lägenhetsnummer och upplåtelsedatum. Registret är personuppgiftsbehandling och kräver GDPR-hantering.',
  },
  {
    question: 'Vad är skillnaden på ekonomisk plan och budget?',
    answer: 'Den ekonomiska planen är ett juridiskt grunddokument som upprättas när föreningen bildas och registreras hos Bolagsverket. Budgeten är ett internt styrdokument som sätts varje år för att planera intäkter och kostnader.',
  },
  {
    question: 'Måste stadgarna registreras hos Bolagsverket?',
    answer: 'Ja — stadgar och stadgeändringar måste registreras hos Bolagsverket för att gälla. En stadgeändring träder inte i kraft förrän den är registrerad.',
  },
  {
    question: 'Hur länge måste vi spara årsredovisningen?',
    answer: 'Årsredovisningen ska sparas i minst 10 år enligt bokföringslagen. Originalhandlingar kan sparas digitalt om de är behörigt signerade.',
  },
];

// ─── Dokument-data ────────────────────────────────────────
const BLOCK_1 = {
  titel: 'Grunddokumenten',
  beskrivning: 'De juridiska grunddokumenten som styr föreningens existens',
  emoji: '📋',
  bild: 'https://images.unsplash.com/photo-1568695174537-f4e4f8b73688?w=1920&q=80',
};

const BLOCK_2 = {
  titel: 'Löpande dokumentation',
  beskrivning: 'Dokument som skapas och uppdateras under föreningens drift',
  emoji: '📁',
  bild: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1920&q=80',
};

const BLOCK_3 = {
  titel: 'GDPR & arkivering',
  beskrivning: 'Personuppgifter, bevaringstider och säker hantering',
  emoji: '🔒',
  bild: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80',
};

interface Dokument {
  id: string;
  namn: string;
  kort: string;
  emoji: string;
  icon: React.ElementType;
  bild: string;
  block: 1 | 2 | 3;
  intro: string;
  avsnitt: Array<{ rubrik: string; text: string; icon: React.ElementType }>;
  bevaringstid: string;
  ansvarig: string;
  tips: string;
  cirklar: Array<{ label: string; text: string }>;
}

const DOKUMENT: Dokument[] = [
  // ── BLOCK 1: Grunddokumenten ──────────────────────────
  {
    id: 'stadgar',
    namn: 'Stadgar',
    kort: 'Föreningens grundlag',
    emoji: '📜',
    icon: Scale,
    bild: 'https://images.unsplash.com/photo-1568695174537-f4e4f8b73688?w=1920&q=80',
    block: 1,
    intro: 'Stadgarna är föreningens grundlag — det dokument som styr allt från hur styrelsen väljs till hur avgifter sätts. Alla andra beslut måste vara förenliga med stadgarna.',
    avsnitt: [
      {
        rubrik: 'Vad reglerar stadgarna?',
        text: 'Stadgarna reglerar föreningens namn och säte, ändamål, hur styrelsen ska väljas och hur många ledamöter den ska ha, hur stämman kallas och beslutar, rösträttsregler, hur avgifter bestäms och hur stadgarna ändras.',
        icon: FileText,
      },
      {
        rubrik: 'Hur ändrar man stadgarna?',
        text: 'Stadgeändring kräver beslut på stämma med kvalificerad majoritet — oftast 2/3 av rösterna. Vissa ändringar kräver beslut på två på varandra följande stämmor. Ändringen träder inte i kraft förrän den är registrerad hos Bolagsverket.',
        icon: Scale,
      },
      {
        rubrik: 'Gamla stadgar — en vanlig fallgrop',
        text: 'Många föreningar har stadgar från 1970–90-talen som inte stämmer överens med gällande lag. Till exempel kan rösträttsregler vara föråldrade sedan lagändringen 2023. Granska stadgarna regelbundet — minst vart femte år.',
        icon: AlertTriangle,
      },
      {
        rubrik: 'Registrering hos Bolagsverket',
        text: 'Aktuella stadgar ska alltid finnas registrerade hos Bolagsverket. Föreningens registreringsbevis visar vilken version som gäller. Skicka alltid med gällande stadgar vid överlåtelser och till mäklare.',
        icon: Building2,
      },
    ],
    bevaringstid: 'Permanent — aldrig förstöra gamla versioner',
    ansvarig: 'Ordföranden / sekreteraren',
    tips: 'Lägg stadgarna på föreningens hemsida eller i en delad mapp — alla boende bör ha enkel tillgång till dem.',
    cirklar: [
      { label: '⚖️ Grundlag', text: 'Alla styrelsebeslut måste vara förenliga med stadgarna.' },
      { label: '🗳️ Ändring', text: 'Kräver 2/3 majoritet på stämma. Gäller ej förrän registrerat hos Bolagsverket.' },
      { label: '📅 Granska', text: 'Se över stadgarna minst vart femte år. Jämför med gällande BRL.' },
      { label: '🏛️ Registrera', text: 'Alltid registrera ändringar hos Bolagsverket via verksamt.se.' },
      { label: '📤 Dela', text: 'Skicka till mäklare vid försäljning. Publicera gärna på hemsidan.' },
    ],
  },
  {
    id: 'ekonomisk-plan',
    namn: 'Ekonomisk plan',
    kort: 'Föreningens finansiella grunddokument',
    emoji: '📊',
    icon: FileText,
    bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1920&q=80',
    block: 1,
    intro: 'Den ekonomiska planen är ett juridiskt grunddokument som upprättades när föreningen bildades. Den beskriver fastighetens värde, lånens storlek och hur avgifterna beräknades från start.',
    avsnitt: [
      {
        rubrik: 'Vad innehåller den ekonomiska planen?',
        text: 'Planen innehåller uppgifter om fastigheten, byggnadskostnader, finansiering (lån och insatser), beräkning av månadsavgifter och en bedömning av föreningens ekonomiska hållbarhet. Den upprättas av två intygsgivare.',
        icon: FileText,
      },
      {
        rubrik: 'När måste planen uppdateras?',
        text: 'Vid väsentliga förändringar — till exempel stora nyupplåningar, omstrukturering av lån eller om föreningens ekonomiska förutsättningar ändrats avsevärt. Uppdatering kräver ny intygsgivarprövning och registrering.',
        icon: Clock,
      },
      {
        rubrik: 'Intygsgivare',
        text: 'Den ekonomiska planen måste intygas av två av Boverket godkända intygsgivare. De bedömer att föreningens ekonomi är hållbar och att avgifterna är realistiska. Utan godkänd plan kan bostadsrätter inte upplåtas.',
        icon: CheckCircle,
      },
      {
        rubrik: 'Skillnad mot budgeten',
        text: 'Den ekonomiska planen är ett juridiskt grunddokument — den visar föreningens ursprungliga ekonomiska förutsättningar. Budgeten är ett löpande styrdokument som uppdateras varje år och stämmas av mot utfallet.',
        icon: Scale,
      },
    ],
    bevaringstid: 'Permanent — historik ska bevaras',
    ansvarig: 'Styrelsen / förvaltaren',
    tips: 'Spara alla versioner av den ekonomiska planen, även gamla. De kan behövas vid tvister om ursprungliga avgiftsnivåer.',
    cirklar: [
      { label: '📋 Grunddokument', text: 'Upprättas vid föreningens bildande. Juridiskt bindande.' },
      { label: '👥 Intygsgivare', text: 'Måste intygas av två Boverket-godkända intygsgivare.' },
      { label: '🔄 Uppdatering', text: 'Krävs vid väsentliga ekonomiska förändringar.' },
      { label: '🏛️ Registrering', text: 'Registreras hos Bolagsverket och är offentlig handling.' },
      { label: '📁 Arkivering', text: 'Spara alla versioner — gamla planer kan behövas vid tvister.' },
    ],
  },
  {
    id: 'upplatelseavtal',
    namn: 'Upplåtelseavtal',
    kort: 'Avtalet om bostadsrätten per lägenhet',
    emoji: '🔑',
    icon: Home,
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    block: 1,
    intro: 'Upplåtelseavtalet är det avtal som ger en specifik person rätt att nyttja en specifik lägenhet som bostadsrätt. Det är grunden för hela bostadsrättsinnehavet.',
    avsnitt: [
      {
        rubrik: 'Vad är ett upplåtelseavtal?',
        text: 'Upplåtelseavtalet tecknas mellan föreningen och den ursprungliga bostadsrättsinnehavaren. Det anger vilken lägenhet som avses, insatsens storlek, upplåtelsedatum och de villkor som gäller för innehavet.',
        icon: FileText,
      },
      {
        rubrik: 'Vad händer vid överlåtelse?',
        text: 'Vid försäljning av en bostadsrätt överlåts innehavet — inte upplåtelseavtalet. Det ursprungliga upplåtelseavtalet kvarstår och den nya innehavaren träder in i den förres ställe. Föreningen uppdaterar lägenhetsförteckningen.',
        icon: Home,
      },
      {
        rubrik: 'Förlorat upplåtelseavtal',
        text: 'Om ett upplåtelseavtal förkommit kan man i de flesta fall rekonstruera det från föreningens register och Bolagsverkets handlingar. Kontakta förvaltaren eller en bostadsrättsjurist om det uppstår problem.',
        icon: AlertTriangle,
      },
      {
        rubrik: 'Arkivering',
        text: 'Föreningen ska bevara kopior av samtliga upplåtelseavtal permanent. De är nödvändiga vid tvister om innehavet, vid ombildningar och vid historisk dokumentation av föreningen.',
        icon: Folder,
      },
    ],
    bevaringstid: 'Permanent per lägenhet',
    ansvarig: 'Styrelsen / förvaltaren',
    tips: 'Digitalisera alla gamla upplåtelseavtal om de bara finns i pappersform. Lagra säkert med backup.',
    cirklar: [
      { label: '🔑 Nyckelhandling', text: 'Grunden för bostadsrättsinnehavet. Måste bevaras permanent.' },
      { label: '👤 Per lägenhet', text: 'Ett avtal per bostadsrätt. Knyts till lägenheten, inte personen.' },
      { label: '🔄 Överlåtelse', text: 'Avtalet kvarstår vid försäljning. Ny innehavare träder in.' },
      { label: '📁 Arkiv', text: 'Föreningen sparar original. Digitalisera gamla pappersavtal.' },
      { label: '⚠️ Förkommet', text: 'Kan rekonstrueras. Kontakta förvaltare eller jurist.' },
    ],
  },
  {
    id: 'lagenhetsforteckning',
    namn: 'Lägenhets- och medlemsförteckning',
    kort: 'Register över innehavare och lägenheter',
    emoji: '📒',
    icon: Users,
    bild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
    block: 1,
    intro: 'Lägenhetsförteckningen är ett lagstadgat register som föreningens styrelse är skyldig att föra. Den visar vem som innehar vilken bostadsrätt och är grunden för allt föreningsarbete.',
    avsnitt: [
      {
        rubrik: 'Lägenhetsförteckningen — ett lagkrav',
        text: 'Bostadsrättslagen kräver att föreningen för en lägenhetsförteckning med uppgifter om varje bostadsrätt: innehavarens namn och adress, lägenhetsnummer, insatsens storlek och datum för upplåtelse och överlåtelser.',
        icon: FileText,
      },
      {
        rubrik: 'Vem har rätt att se förteckningen?',
        text: 'Bostadsrättsinnehavare har rätt att se uppgifterna om sin egen lägenhet. Hela förteckningen är intern och ska inte lämnas ut okritiskt. Kreditgivare och myndigheter kan under vissa förutsättningar begära uppgifter.',
        icon: Eye,
      },
      {
        rubrik: 'Medlemsregistret och GDPR',
        text: 'Lägenhetsförteckningen innehåller personuppgifter och är därmed GDPR-reglerad. Föreningen är personuppgiftsansvarig. Det krävs en laglig grund (rättslig förpliktelse) för behandlingen, en integritetspolicy och rutiner för radering.',
        icon: Shield,
      },
      {
        rubrik: 'Uppdatering vid överlåtelse',
        text: 'Vid varje överlåtelse ska förteckningen uppdateras omgående. Den nya innehavarens uppgifter registreras och det är föreningens ansvar att ha korrekt information — inte mäklarens eller köparens.',
        icon: Clock,
      },
    ],
    bevaringstid: 'Löpande — historik bevaras permanent',
    ansvarig: 'Styrelsen (kan delegeras till förvaltaren)',
    tips: 'Använd förvaltarens system eller ett dedikerat register. Undvik Excel-filer på privata datorer — det skapar GDPR-risker.',
    cirklar: [
      { label: '📋 Lagkrav', text: 'BRL kräver att föreningen för lägenhetsförteckning.' },
      { label: '👁️ Tillgång', text: 'Intern handling. Innehavare ser egna uppgifter.' },
      { label: '🔒 GDPR', text: 'Personuppgifter. Kräver integritetspolicy och rutiner.' },
      { label: '🔄 Uppdatera', text: 'Uppdatera direkt vid varje överlåtelse.' },
      { label: '💻 System', text: 'Använd förvaltarens system — inte privata Excel-filer.' },
    ],
  },

  // ── BLOCK 2: Löpande dokumentation ───────────────────
  {
    id: 'stämmoprotokoll',
    namn: 'Stämmoprotokoll',
    kort: 'Dokumentation av föreningsstämmans beslut',
    emoji: '🗳️',
    icon: BookOpen,
    bild: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80',
    block: 2,
    intro: 'Stämmoprotokollet är det officiella dokumentet över föreningsstämmans beslut. Det är en offentlig handling som alla medlemmar har rätt att ta del av.',
    avsnitt: [
      {
        rubrik: 'Vad ska stämmoprotokollet innehålla?',
        text: 'Datum, plats och hur stämman tillkännagetts. Antal röstberättigade och antal representerade röster. Ordförande och sekreterare. Dagordningen och besluten under varje punkt. Omröstningsresultat och eventuella reservationer.',
        icon: FileText,
      },
      {
        rubrik: 'Justering av protokollet',
        text: 'Stämmoprotokollet ska justeras av ordföranden och minst en utsedd justeringsperson (inte sekreteraren). Justering ska ske skyndsamt — normalt inom 2–4 veckor. Ojusterat protokoll har begränsad rättsverkan.',
        icon: CheckCircle,
      },
      {
        rubrik: 'Offentlighet för medlemmar',
        text: 'Alla medlemmar har rätt att ta del av stämmoprotokollet. Det ska hållas tillgängligt hos styrelsen och skickas till de medlemmar som begär det. Publicera gärna på föreningens hemsida eller i en delad mapp.',
        icon: Eye,
      },
      {
        rubrik: 'Felaktiga beslut i protokollet',
        text: 'Om ett beslut protokollerats felaktigt kan det rättas via ett tillägg. Om ett beslut fattades i strid med lag eller stadgar kan det klandras i domstol inom tre månader från stämman. Korrekt protokoll skyddar styrelsen.',
        icon: AlertTriangle,
      },
    ],
    bevaringstid: 'Permanent',
    ansvarig: 'Sekreteraren — justeras av ordföranden',
    tips: 'Skriv protokollet inom en vecka efter stämman medan minnet är färskt. Skicka ut det till alla medlemmar utan att de behöver begära det.',
    cirklar: [
      { label: '📋 Innehåll', text: 'Datum, plats, deltagare, dagordning, beslut och omröstning.' },
      { label: '✅ Justering', text: 'Justeras av ordföranden + justeringsperson inom 2–4 veckor.' },
      { label: '👁️ Offentlig', text: 'Alla medlemmar har rätt att ta del av protokollet.' },
      { label: '⚠️ Klander', text: 'Felaktiga beslut kan klandras i domstol inom 3 månader.' },
      { label: '💾 Permanent', text: 'Spara alla stämmoprotokoll permanent med bilagor.' },
    ],
  },
  {
    id: 'styrelseprotokoll',
    namn: 'Styrelseprotokoll',
    kort: 'Dokumentation av styrelsens beslut',
    emoji: '📝',
    icon: FileText,
    bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
    block: 2,
    intro: 'Styrelseprotokollet dokumenterar styrelsens beslut och är styrelsens viktigaste interna dokument. Det skyddar ledamöterna och bevisar att styrelsen skött sitt uppdrag korrekt.',
    avsnitt: [
      {
        rubrik: 'Vad ska finnas med?',
        text: 'Datum, plats och deltagare (inkl. suppleanter och adjungerade). Beslutsföra: antal ledamöter och om kvorum uppnåtts. Varje beslut som eget §. Beslutsformulering, ansvarig och uppföljningsdatum. Anmälan av jäv om relevant.',
        icon: FileText,
      },
      {
        rubrik: 'Formkrav och justering',
        text: 'Styrelseprotokoll ska justeras av ordföranden och en utsedd justeringsperson. Det finns inga formkrav på att det sker vid nästa möte, men snabb justering är god praxis. Numrera §:erna löpande under hela verksamhetsåret.',
        icon: CheckCircle,
      },
      {
        rubrik: 'Intern handling',
        text: 'Till skillnad från stämmoprotokollet är styrelseprotokollet en intern handling. Medlemmar har inte automatisk rätt att läsa det. Styrelsen beslutar vad som kan lämnas ut — men beslutsfattanden bör aldrig hemlighållas.',
        icon: EyeOff,
      },
      {
        rubrik: 'Varför protokoll är styrelseledamotens försäkring',
        text: 'Om en ledamot i efterhand anklagas för ett felaktigt beslut är protokollet beviset för vad som beslutades och på vilka grunder. En ledamot som reserverat sig mot ett beslut bör begära att reservationen antecknas i protokollet.',
        icon: Shield,
      },
    ],
    bevaringstid: 'Minst 10 år — permanent rekommenderas',
    ansvarig: 'Sekreteraren — justeras av ordföranden',
    tips: 'Skriv aldrig "styrelsen beslutade att se över frågan". Varje § ska ha ett tydligt beslut, en ansvarig och ett datum för uppföljning.',
    cirklar: [
      { label: '§ Beslut', text: 'Varje beslut = eget §. Tydlig formulering, ansvarig, datum.' },
      { label: '✅ Kvorum', text: 'Protokollera alltid hur många ledamöter som var med.' },
      { label: '🔒 Internt', text: 'Intern handling. Styrelsen bestämmer vad som lämnas ut.' },
      { label: '⚖️ Skydd', text: 'Protokollet skyddar ledamöterna. Reservationer ska antecknas.' },
      { label: '📅 Numrering', text: 'Numrera §:er löpande per verksamhetsår: § 1/2025, § 2/2025...' },
    ],
  },
  {
    id: 'arsredovisning',
    namn: 'Årsredovisning',
    kort: 'Föreningens ekonomiska årsberättelse',
    emoji: '📈',
    icon: FileText,
    bild: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    block: 2,
    intro: 'Årsredovisningen är föreningens officiella ekonomiska rapport. Den granskas av revisorn, godkänns av stämman och ligger till grund för beslut om ansvarsfrihet.',
    avsnitt: [
      {
        rubrik: 'Vad innehåller årsredovisningen?',
        text: 'Förvaltningsberättelse (styrelsens berättelse om året), resultaträkning (intäkter och kostnader), balansräkning (tillgångar och skulder), noter och kassaflödesanalys (K3). Från 2026 gäller K3 med komponentavskrivning för alla BRF:er.',
        icon: FileText,
      },
      {
        rubrik: 'Tidsplan',
        text: 'Årsredovisningen ska vara klar senast sex veckor före ordinarie stämma. Stämman ska hållas inom sex månader från räkenskapsårets slut. För kalenderårsföretag: årsredovisning klar senast ca 15 april, stämma senast 30 juni.',
        icon: Clock,
      },
      {
        rubrik: 'Revisorns granskning',
        text: 'Revisorn granskar årsredovisningen och förvaltningen. De lämnar en revisionsberättelse med rekommendation om ansvarsfrihet. Stämman beslutar sedan om styrelsen beviljas ansvarsfrihet baserat på revisionsberättelsen.',
        icon: CheckCircle,
      },
      {
        rubrik: 'K3-övergången 2026',
        text: 'Från räkenskapsår som börjar efter 31 december 2025 gäller K3 för alla BRF:er. Komponentavskrivning innebär att fastigheten delas upp i delar (tak, stammar, fönster) som skrivs av separat. Kontakta revisor nu för att förbereda.',
        icon: AlertTriangle,
      },
    ],
    bevaringstid: 'Minst 10 år',
    ansvarig: 'Styrelsen — upprättas av kassör/förvaltare',
    tips: 'Skicka ut årsredovisningen till alla medlemmar (eller publicera digitalt) minst en vecka före stämman. Förberedda medlemmar ger bättre stämmor.',
    cirklar: [
      { label: '📋 Innehåll', text: 'Förvaltningsberättelse, resultat, balans, noter.' },
      { label: '📅 Tidplan', text: 'Klar 6 veckor före stämma. Stämma senast 6 mån efter räkenskapsår.' },
      { label: '🔍 Revision', text: 'Granskas av revisor. Revisionsberättelse → ansvarsfrihet.' },
      { label: '⚠️ K3 2026', text: 'Ny redovisningsstandard från 2026. Förbered med revisorn nu.' },
      { label: '📤 Dela', text: 'Skicka till alla medlemmar 1 vecka före stämman.' },
    ],
  },
  {
    id: 'underhallsplan',
    namn: 'Underhållsplan',
    kort: 'Plan för fastighetens löpande och planerade underhåll',
    emoji: '🔧',
    icon: Building2,
    bild: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    block: 2,
    intro: 'Underhållsplanen är ett av de viktigaste styrdokumenten för en BRF. Den visar när olika delar av fastigheten behöver underhåll och vad det kommer att kosta.',
    avsnitt: [
      {
        rubrik: 'Varför en underhållsplan?',
        text: 'Utan en underhållsplan styrs underhållet av akuta behov — vilket alltid kostar mer. En plan gör det möjligt att budgetera, avsätta medel i underhållsfonden och informera boende om kommande arbeten. Det höjer också fastighetens och bostadsrätternas värde.',
        icon: FileText,
      },
      {
        rubrik: 'Vad ska planen innehålla?',
        text: 'Inventering av alla byggnadens delar (tak, fasad, fönster, hissar, stammar, värme, el). Beräknad återstående livslängd för varje del. Kostnad för byte/underhåll. Tidplan för när åtgärder ska genomföras. Koppling till föreningens fond för yttre underhåll.',
        icon: Building2,
      },
      {
        rubrik: 'Fond för yttre underhåll',
        text: 'Föreningen är skyldig att avsätta medel till fond för yttre underhåll. Fondens storlek ska motsvara behovet enligt underhållsplanen. För lite avsättning kan leda till att framtida styrelser tvingas höja avgifterna kraftigt eller ta nya lån.',
        icon: Shield,
      },
      {
        rubrik: 'Uppdatering',
        text: 'Underhållsplanen bör uppdateras vart 3–5 år och alltid efter genomförda större arbeten. En professionell besiktningsman kan göra en teknisk statusbedömning som underlag. Koppla planen till K3-komponentavskrivningen.',
        icon: Clock,
      },
    ],
    bevaringstid: 'Löpande — bevara alla versioner',
    ansvarig: 'Styrelsen — ofta upprättad av förvaltare eller besiktningsman',
    tips: 'Visa underhållsplanen öppet för medlemmarna. En transparent förening med välskött underhåll har nöjdare boende och högre bostadsrättsvärden.',
    cirklar: [
      { label: '🏠 Inventering', text: 'Alla byggnadens delar med livslängd och kostnad.' },
      { label: '📅 Tidplan', text: '5–30 år framåt. Uppdatera vart 3–5 år.' },
      { label: '💰 Fond', text: 'Avsättning ska matcha planens behov. Underskott = framtida avgiftschock.' },
      { label: '🔧 K3', text: 'Koppla till komponentavskrivningen från 2026.' },
      { label: '👁️ Öppen', text: 'Visa planen för medlemmarna. Bygger förtroende.' },
    ],
  },

  // ── BLOCK 3: GDPR & arkivering ────────────────────────
  {
    id: 'gdpr-rutiner',
    namn: 'GDPR & personuppgifter',
    kort: 'Hantering av personuppgifter i föreningen',
    emoji: '🔒',
    icon: Shield,
    bild: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=80',
    block: 3,
    intro: 'Föreningen behandlar personuppgifter dagligen — i lägenhetsförteckningen, protokoll, e-post och felanmälningar. GDPR ställer krav på hur detta hanteras.',
    avsnitt: [
      {
        rubrik: 'Vilka personuppgifter hanterar en BRF?',
        text: 'Lägenhetsförteckning med namn och adress. Kontaktuppgifter till boende. Betalningsuppgifter och avgiftshistorik. Störnings- och tvistärenden. E-postkorrespondens. Bilder från kameror i gemensamma utrymmen.',
        icon: Users,
      },
      {
        rubrik: 'Laglig grund och integritetspolicy',
        text: 'Föreningen behöver en laglig grund för varje typ av behandling. Lägenhetsförteckningen vilar på rättslig förpliktelse (BRL). Marknadsföring kräver samtycke. Föreningen ska ha en integritetspolicy tillgänglig för alla boende.',
        icon: Scale,
      },
      {
        rubrik: 'Personuppgiftsbiträdesavtal',
        text: 'Om föreningen använder externa system — förvaltarens system, bokningssystem, låssystem — krävs ett personuppgiftsbiträdesavtal (PUB-avtal) med varje leverantör. Utan PUB-avtal bryter föreningen mot GDPR.',
        icon: FileText,
      },
      {
        rubrik: 'Radering och bevarandetider',
        text: 'Personuppgifter ska inte sparas längre än nödvändigt. Störningsärenden: radera när ärendet är avslutat och preskriptionstiden löpt ut. Avgiftshistorik: bokföringslagen kräver 7 år. Bilder: normalt 30–90 dagar.',
        icon: Clock,
      },
    ],
    bevaringstid: 'Varierar per uppgiftstyp — se rutindokument',
    ansvarig: 'Styrelsen — personuppgiftsansvarig',
    tips: 'Upprätta ett enkelt register över era behandlingar (behandlingsregister). Det tar en timme och visar att ni tagit GDPR på allvar om tillsynsmyndigheten (IMY) hör av sig.',
    cirklar: [
      { label: '📋 Register', text: 'Upprätta ett behandlingsregister. Visar vilka uppgifter ni hanterar.' },
      { label: '⚖️ Laglig grund', text: 'Varje behandling behöver laglig grund — förpliktelse, samtycke eller intresse.' },
      { label: '📄 PUB-avtal', text: 'Krävs med alla externa leverantörer som hanterar era data.' },
      { label: '🗑️ Radering', text: 'Radera uppgifter när de inte längre behövs.' },
      { label: '🏛️ IMY', text: 'Integritetsskyddsmyndigheten — dit klagomål lämnas. imy.se.' },
    ],
  },
  {
    id: 'arkivering',
    namn: 'Arkivering & bevarandetider',
    kort: 'Vad sparas, hur länge och hur?',
    emoji: '🗂️',
    icon: Folder,
    bild: 'https://images.unsplash.com/photo-1568695174537-f4e4f8b73688?w=1920&q=80',
    block: 3,
    intro: 'Att veta vad som ska sparas — och hur länge — är en central del av styrelseansvaret. Felaktig hantering kan ge juridiska problem och förlorad historik.',
    avsnitt: [
      {
        rubrik: 'Bevarandetider — en översikt',
        text: 'Permanent: Stadgar, ekonomisk plan, upplåtelseavtal, stämmoprotokoll. Minst 10 år: Styrelseprotokoll, årsredovisningar, revisionsberättelser, avtal. 7 år: Bokföringsmaterial (bokföringslagen). Kortare: Bilder, störningsärenden, tillfällig korrespondens.',
        icon: Clock,
      },
      {
        rubrik: 'Digitalt vs. fysiskt',
        text: 'Digitala handlingar är juridiskt likvärdiga med fysiska om de är behörigt signerade och kan presenteras läsbart. Se till att digitala arkiv har backup på minst två platser — gärna en extern molntjänst och ett lokalt system.',
        icon: Lock,
      },
      {
        rubrik: 'Överlämning vid styrelsebyte',
        text: 'Vid styrelsebyte ska all dokumentation överlämnas till den nya styrelsen. Upprätta en checklista och kvittera överlämningen skriftligt. En ny styrelse som inte får tillgång till historiken har svårt att fatta välgrundade beslut.',
        icon: Users,
      },
      {
        rubrik: 'Vad händer med gamla e-postmeddelanden?',
        text: 'E-post som innehåller beslut eller åtaganden bör sparas som del av ärendehanteringen. Privata e-postkonton ska aldrig användas för föreningsärenden — använd en gemensam föreningsadress.',
        icon: AlertTriangle,
      },
    ],
    bevaringstid: 'Se bevarandetabellen',
    ansvarig: 'Hela styrelsen — ansvar kan delegeras till sekreteraren',
    tips: 'Skapa en gemensam digital mapp (t.ex. Google Drive eller SharePoint) med tydlig mappstruktur. Ge alla nuvarande ledamöter tillgång — men bara dem.',
    cirklar: [
      { label: '♾️ Permanent', text: 'Stadgar, ekonomisk plan, upplåtelseavtal, stämmoprotokoll.' },
      { label: '📅 10 år', text: 'Styrelseprotokoll, årsredovisningar, avtal, revisionsberättelser.' },
      { label: '📅 7 år', text: 'Bokföringsmaterial — bokföringslagens krav.' },
      { label: '🔄 Överlämning', text: 'Checklista + kvittens vid styrelsebyte. Kritiskt moment.' },
      { label: '📧 E-post', text: 'Använd gemensam föreningsadress. Aldrig privata konton.' },
    ],
  },
];

// ─── FadeIn ───────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── HUB-SLIDE ────────────────────────────────────────────
const HubSlide = ({ onNavigate }: { onNavigate: (i: number) => void }) => {
  const block1 = DOKUMENT.filter(d => d.block === 1);
  const block2 = DOKUMENT.filter(d => d.block === 2);
  const block3 = DOKUMENT.filter(d => d.block === 3);

  const getSlideIndex = (doc: Dokument) => DOKUMENT.indexOf(doc) + 1;

  const BlockSection = ({ block, docs, bild, delay }: {
    block: typeof BLOCK_1; docs: Dokument[]; bild: string; delay: number;
  }) => (
    <FadeIn delay={delay} className="mb-10">
      <div className="mb-4">
        <p className="text-white font-bold text-lg mb-0.5">
          {block.emoji} {block.titel}
        </p>
        <p className="text-white/45 text-sm">{block.beskrivning}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {docs.map((doc, i) => (
          <motion.button
            key={doc.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + i * 0.06 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(getSlideIndex(doc))}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-center p-2 font-bold text-xs leading-tight shadow-lg"
              style={{ background: ORANGE, boxShadow: `0 4px 20px rgba(255,84,33,0.4)` }}
            >
              <div>
                <div className="text-2xl mb-0.5">{doc.emoji}</div>
                <div className="text-[10px] leading-tight">{doc.namn}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </FadeIn>
  );

  return (
    <div className="w-full h-full overflow-y-auto relative pb-28"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1568695174537-f4e4f8b73688?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(10,15,30,0.88) 0%, rgba(10,15,30,0.78) 60%, rgba(10,15,30,0.92) 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                           rounded-full mb-4 text-white" style={{ background: ORANGE }}>
            Dokumentation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Föreningens dokumentation
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            Rätt dokument, rätt tid, rätt plats. Klicka på ett dokument för att läsa mer
            om vad det innehåller och hur det ska hanteras.
          </p>
        </motion.div>

        <BlockSection block={BLOCK_1} docs={block1} bild={BLOCK_1.bild} delay={0.1} />
        <BlockSection block={BLOCK_2} docs={block2} bild={BLOCK_2.bild} delay={0.2} />
        <BlockSection block={BLOCK_3} docs={block3} bild={BLOCK_3.bild} delay={0.3} />

        {/* Bevarandetabell */}
        <FadeIn delay={0.4}>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="px-5 py-4" style={{ background: 'rgba(255,84,33,0.15)' }}>
              <p className="text-white font-bold text-sm">⏱️ Snabböversikt – bevarandetider</p>
            </div>
            <div className="divide-y divide-white/8">
              {[
                { tid: 'Permanent', dok: 'Stadgar, ekonomisk plan, upplåtelseavtal, stämmoprotokoll' },
                { tid: '≥ 10 år',   dok: 'Styrelseprotokoll, årsredovisningar, avtal, revisionsberättelser' },
                { tid: '7 år',      dok: 'Bokföringsmaterial (bokföringslagens krav)' },
                { tid: 'Löpande',   dok: 'Underhållsplan, lägenhetsförteckning (uppdateras kontinuerligt)' },
                { tid: '30–90 dgr', dok: 'Kamerabilder från gemensamma utrymmen' },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-3"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-xs font-bold flex-shrink-0 w-20" style={{ color: ORANGE }}>
                    {row.tid}
                  </span>
                  <span className="text-white/60 text-xs">{row.dok}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

// ─── DOKUMENT-SLIDE ───────────────────────────────────────
const DokumentSlide = ({ dok, onBack, onNext, onPrev, isLast, isFirst }: {
  dok: Dokument; onBack: () => void; onNext: () => void;
  onPrev: () => void; isLast: boolean; isFirst: boolean;
}) => {
  const [activeCircle, setActiveCircle] = useState<number | null>(null);
  const Icon = dok.icon;

  const blockLabel = dok.block === 1 ? BLOCK_1.titel : dok.block === 2 ? BLOCK_2.titel : BLOCK_3.titel;
  const blockEmoji = dok.block === 1 ? BLOCK_1.emoji : dok.block === 2 ? BLOCK_2.emoji : BLOCK_3.emoji;

  return (
    <div className="w-full h-full overflow-y-auto pb-28" style={{ background: '#F8F7F4' }}>

      {/* Hero */}
      <div className="relative h-48 sm:h-60 overflow-hidden">
        <img src={dok.bild} alt={dok.namn} className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)' }} />

        <button onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ArrowLeft size={12} /> Alla dokument
        </button>

        <div className="absolute bottom-5 left-5">
          <p className="text-white/50 text-xs mb-1">{blockEmoji} {blockLabel}</p>
          <p className="text-white text-2xl sm:text-3xl font-bold leading-tight mb-0.5">
            {dok.emoji} {dok.namn}
          </p>
          <p className="text-white/60 text-sm">{dok.kort}</p>
        </div>

        {/* Meta-badges */}
        <div className="absolute bottom-5 right-5 hidden sm:flex flex-col gap-2 items-end">
          <div className="px-3 py-1.5 rounded-xl text-xs"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <p className="text-white/40 text-xs">Bevarandetid</p>
            <p className="text-white font-bold text-xs">{dok.bevaringstid}</p>
          </div>
          <div className="px-3 py-1.5 rounded-xl text-xs"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <p className="text-white/40 text-xs">Ansvarig</p>
            <p className="text-white font-bold text-xs">{dok.ansvarig}</p>
          </div>
        </div>
      </div>

      {/* Mobil meta */}
      <div className="sm:hidden grid grid-cols-2 gap-2 px-4 pt-4">
        <div className="rounded-xl p-3 border border-orange-200 bg-orange-50">
          <p className="text-xs text-slate-500 mb-0.5">Bevarandetid</p>
          <p className="font-bold text-xs" style={{ color: ORANGE }}>{dok.bevaringstid}</p>
        </div>
        <div className="rounded-xl p-3 border border-slate-200 bg-white">
          <p className="text-xs text-slate-500 mb-0.5">Ansvarig</p>
          <p className="font-bold text-xs text-slate-700">{dok.ansvarig}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">

        {/* Intro */}
        <FadeIn>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 border-l-4 pl-4"
            style={{ borderColor: ORANGE }}>
            {dok.intro}
          </p>
        </FadeIn>

        {/* Avsnitt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {dok.avsnitt.map((av, i) => {
            const AvIcon = av.icon;
            return (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-5 border shadow-sm h-full"
                  style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${ORANGE}15` }}>
                      <AvIcon size={15} style={{ color: ORANGE }} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{av.rubrik}</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{av.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Cirkelsektion */}
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{ minHeight: 280 }}>
            <img src={dok.bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.62)' }} />

            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-white font-bold text-base sm:text-lg mb-1">{dok.namn} – nyckelbegrepp</p>
              <p className="text-white/45 text-xs mb-6">Klicka på varje cirkel för att läsa mer</p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                {dok.cirklar.map((c, i) => (
                  <motion.button key={i}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCircle(activeCircle === i ? null : i)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-center p-2 text-white font-bold text-xs leading-tight"
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
                    <p className="text-white font-bold text-sm mb-1">{dok.cirklar[activeCircle].label}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{dok.cirklar[activeCircle].text}</p>
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
              💡 Tips för er styrelse
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">{dok.tips}</p>
          </div>
        </FadeIn>

        {/* Nav */}
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
              Nästa dokument <ArrowRight size={15} />
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}>
              <Award size={15} /> Tillbaka till översikten
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── HUVUD-KOMPONENT ──────────────────────────────────────
const ModuleDokumentation: React.FC = () => {
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
      title: 'Föreningens dokumentation',
      component: <HubSlide onNavigate={setCurrentIndex} />,
    },
    ...DOKUMENT.map((dok, i) => ({
      id: dok.id,
      title: dok.namn,
      component: (
        <DokumentSlide
          dok={dok}
          onBack={() => setCurrentIndex(0)}
          onNext={() => setCurrentIndex(i + 2)}
          onPrev={() => setCurrentIndex(i)}
          isLast={i === DOKUMENT.length - 1}
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
        title="Vanliga frågor om dokumentation"
        subtitle="Protokoll, arkivering, GDPR och bevarandetider"
        buttonColor={ORANGE}
      />
    </div>
  );
};

export default ModuleDokumentation;