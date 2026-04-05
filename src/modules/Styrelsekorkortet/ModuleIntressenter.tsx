// src/modules/Styrelsekorkortet/ModuleIntressenter.tsx
// Föreningens intressenter – hub + individuella slides
// Ljust tema (Om Oss-stil), orange cirklar, bilder per intressent

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, CheckCircle, Award,
  Building2, Scale, Wrench, Shield, TrendingUp,
  Users, Gavel, FileText, Home, Landmark, BookOpen,
  ChevronRight, ExternalLink
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';

const ORANGE = '#FF5421';
const DARK   = '#171f32';

// ─── FAQ ─────────────────────────────────────────────────
const MODULE_FAQ = [
  {
    question: 'Vad är skillnaden på förvaltare och fastighetsskötare?',
    answer: 'Förvaltaren hanterar ekonomi, juridik och administration. Fastighetsskötaren sköter det praktiska – städning, skötsel, felanmälningar och enklare reparationer.',
  },
  {
    question: 'Måste vi ha en förvaltare?',
    answer: 'Nej, BRF:er kan sköta sig själva (egenförvaltning). Men de flesta anlitar en förvaltare för att avlasta styrelsen från löpande administration.',
  },
  {
    question: 'Vad gör Hyresnämnden för en BRF?',
    answer: 'Hyresnämnden hanterar tvister om hyra och boende – t.ex. om en andrahandshyresgäst vägrar flytta eller vid tvister om hyressättning.',
  },
  {
    question: 'Varför har BRF:en en revisor?',
    answer: 'Revisorn granskar styrelsens förvaltning och föreningens räkenskaper. Stämman väljer revisor och beslutar om ansvarsfrihet baserat på revisionsberättelsen.',
  },
];

// ─── Intressenter ─────────────────────────────────────────
const INTRESSENTER = [
  {
    id: 'forsakringsbolag',
    namn: 'Försäkringsbolag',
    kort: 'Skyddar fastigheten och föreningen',
    icon: Shield,
    emoji: '🛡️',
    color: '#2563eb',
    bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    intro: 'Försäkringsbolaget är en av föreningens viktigaste skyddsnät. En BRF ska alltid ha en fullvärdesförsäkring på fastigheten.',
    avsnitt: [
      {
        rubrik: 'Vad täcker föreningens försäkring?',
        text: 'Föreningens fastighetsförsäkring täcker byggnaden, gemensamma utrymmen och fast inredning. Den täcker skador från brand, vatten, inbrott och naturkatastrofer. Bostadsrättsinnehavare behöver en separat bostadsrättstillägg för sin lägenhet.',
      },
      {
        rubrik: 'Bostadsrättstillägget',
        text: 'Föreningens försäkring täcker inte bostadsrättsinnehavarens egna renoveringar och tillbehör. Varje boende bör ha ett bostadsrättstillägg i sin hemförsäkring som täcker det de lagt till i lägenheten.',
      },
      {
        rubrik: 'Styrelsens ansvar',
        text: 'Styrelsen ska se till att föreningen alltid har en aktuell och tillräcklig försäkring. Granska försäkringen inför varje förnyelse – täcker den hela fastighetens värde? Finns ansvarsskydd för styrelseledamöter?',
      },
    ],
    tips: 'Kontrollera varje år att försäkringsbeloppet matchar fastighetens återuppbyggnadsvärde. Underförsäkring är ett vanligt och kostsamt misstag.',
    kontakt: 'Kontaktas vid skador, försäkringsfrågor och vid inköp av ny försäkring.',
  },
  {
    id: 'byggherre',
    namn: 'Byggherre',
    kort: 'Ansvarar för ny- och ombyggnation',
    icon: Building2,
    emoji: '🏗️',
    color: '#7c3aed',
    bild: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    intro: 'Byggherren är den som tar ansvar för ett byggprojekt – antingen föreningen själv vid renoveringar, eller en extern aktör vid nybyggnation.',
    avsnitt: [
      {
        rubrik: 'När är föreningen byggherre?',
        text: 'Vid större renoveringar, stambyten och tillbyggnader blir föreningen byggherre. Det innebär ansvar för att följa Plan- och bygglagen, anlita behöriga hantverkare och säkerställa att bygglov finns.',
      },
      {
        rubrik: 'Upphandling av entreprenörer',
        text: 'Styrelsen bör alltid begära in minst tre offerter vid större arbeten. Kontrollera F-skattsedel, ansvarsförsäkring och referenser. Skriv alltid avtal med tydliga garantier och betalningsvillkor.',
      },
      {
        rubrik: 'ByggherreAnsvar',
        text: 'Som byggherre ansvarar föreningen för arbetsmiljön på byggarbetsplatsen enligt Arbetsmiljölagen. Det kan krävas att en Byggarbetsmiljösamordnare (BAS) utses för projektet.',
      },
    ],
    tips: 'Ta aldrig genvägar med obehöriga hantverkare. Om något går fel kan föreningen stå med hela kostnaden.',
    kontakt: 'Relevant vid renoveringar, stambyten, tillbyggnader och nyproduktion.',
  },
  {
    id: 'maklare',
    namn: 'Mäklare',
    kort: 'Förmedlar bostadsrätter vid köp och försäljning',
    icon: Home,
    emoji: '🏡',
    color: '#059669',
    bild: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    intro: 'Mäklaren spelar en viktig roll i föreningens ekosystem. De förmedlar bostadsrätter och har lagstadgad skyldighet att lämna korrekt information om föreningen.',
    avsnitt: [
      {
        rubrik: 'Mäklarens informationsskyldighet',
        text: 'En mäklare som säljer en bostadsrätt är skyldig att ge köparen en korrekt bild av föreningen – ekonomi, lån, underhållsplan och pågående projekt. Styrelsen bör ha aktuell information lättillgänglig.',
      },
      {
        rubrik: 'Överlåtelseprocessen',
        text: 'Vid försäljning hanterar mäklaren kontakten med föreningen kring överlåtelse, upplåtelseavtal och köparens ansökan om medlemskap. Styrelsen ska behandla medlemsansökan skyndsamt.',
      },
      {
        rubrik: 'Vad styrelsen bör ge mäklaren',
        text: 'Årsredovisning, ekonomisk plan, stadgar, underhållsplan och information om pågående eller planerade projekt. En välskött förening med tydlig dokumentation höjer bostadsrätternas marknadsvärde.',
      },
    ],
    tips: 'Ha alltid en uppdaterad "föreningspresentation" redo att skicka till mäklare. Det underlättar försäljningar och ger ett professionellt intryck.',
    kontakt: 'Kontaktas vid överlåtelser och vid behov av marknadsinformation.',
  },
  {
    id: 'boverket',
    namn: 'Boverket',
    kort: 'Statlig myndighet för boende och byggande',
    icon: Landmark,
    emoji: '🏛️',
    color: '#d97706',
    bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    intro: 'Boverket är den statliga myndigheten som ansvarar för frågor om byggande, förvaltning och boende i Sverige.',
    avsnitt: [
      {
        rubrik: 'Boverkets roll',
        text: 'Boverket tar fram föreskrifter, allmänna råd och vägledning för byggande och förvaltning. De hanterar inte enskilda ärenden men sätter ramarna för hur byggnader ska utformas och underhållas.',
      },
      {
        rubrik: 'BBR – Boverkets Byggregler',
        text: 'Boverkets byggregler (BBR) styr hur byggnader ska utformas tekniskt – ventilation, brandskydd, tillgänglighet och energiprestanda. Relevanta vid renovering och nybyggnation.',
      },
      {
        rubrik: 'Energikrav och hållbarhet',
        text: 'Boverket driver också frågor kring energieffektivisering. EU:s energidirektiv (EPBD) ställer ökade krav på BRF:er att förbättra fastigheternas energiprestanda fram till 2033.',
      },
    ],
    tips: 'Boverket.se är en utmärkt kunskapskälla för styrelseledamöter. Deras vägledningar är skrivna på klarspråk.',
    kontakt: 'Inte en direkt kontakt för BRF:er – men deras föreskrifter påverkar alla byggprojekt.',
  },
  {
    id: 'bolagsverket',
    namn: 'Bolagsverket',
    kort: 'Registrerar styrelsen och föreningens ändringar',
    icon: FileText,
    emoji: '📋',
    color: '#0891b2',
    bild: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    intro: 'Bolagsverket är den myndighet där BRF:en är registrerad. Styrelseändringar, stadgeändringar och annat som rör föreningens formella status registreras här.',
    avsnitt: [
      {
        rubrik: 'Registrering av ny styrelse',
        text: 'Efter varje stämma där styrelsen väljs eller byts ut ska förändringen anmälas till Bolagsverket inom 4 veckor. Det görs via verksamt.se av behörig firmatecknare.',
      },
      {
        rubrik: 'Vad registreras?',
        text: 'Namn, personnummer och adress på samtliga ordinarie ledamöter och suppleanter. Även firmateckningsrätt registreras – vem som kan skriva under avtal å föreningens vägnar.',
      },
      {
        rubrik: 'Stadgeändringar',
        text: 'Om stämman beslutar om att ändra föreningens stadgar måste de nya stadgarna registreras hos Bolagsverket. Ändringen gäller inte förrän den är registrerad.',
      },
    ],
    tips: 'Glöm inte anmäla avgång! Om en ledamot lämnar styrelsen under mandatperioden ska även det anmälas.',
    kontakt: 'verksamt.se – digital anmälan om styrelseändringar och stadgefrågor.',
  },
  {
    id: 'skatteverket',
    namn: 'Skatteverket',
    kort: 'Hanterar skattefrågor och momsregistrering',
    icon: TrendingUp,
    emoji: '📊',
    color: '#dc2626',
    bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80',
    intro: 'Skatteverket hanterar BRF:ens skattefrågor – allt från inkomstdeklaration till momsregistrering vid uthyrning av lokaler.',
    avsnitt: [
      {
        rubrik: 'BRF:ens skattskyldighet',
        text: 'En BRF är som huvudregel inte skattskyldig för inkomster från medlemmarnas avgifter. Men hyresintäkter från lokaler och p-platser kan vara skattepliktiga.',
      },
      {
        rubrik: 'Moms vid lokaluthyrning',
        text: 'Om föreningen frivilligt momsregistrerar sig vid uthyrning av lokaler kan man dra av ingående moms på kostnader kopplade till lokalen. En ny HFD-dom (2024) stärker BRF:ers rätt till momsavdrag vid blandad verksamhet.',
      },
      {
        rubrik: 'IMD och momsplikt',
        text: 'Individuell mätning och debitering (IMD) av el och vatten till medlemmar kan utlösa momsplikt om omsättningen överstiger 80 000 kr/år. Kontakta revisor för bedömning.',
      },
    ],
    tips: 'Skatteregler för BRF:er är komplexa. Anlita alltid en kunnig revisor för deklaration och momsfrågor.',
    kontakt: 'skatteverket.se – deklaration, momsregistrering och skattefrågor.',
  },
  {
    id: 'leverantorer',
    namn: 'Leverantörer',
    kort: 'Hantverkare, städ och serviceavtal',
    icon: Wrench,
    emoji: '🔧',
    color: '#ea580c',
    bild: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    intro: 'Leverantörer är alla externa aktörer som utför tjänster åt föreningen – från hantverkare och städfirmor till IT-system och energileverantörer.',
    avsnitt: [
      {
        rubrik: 'Upphandling och avtal',
        text: 'Styrelsen bör alltid begära minst tre offerter vid nya avtal. Kontrollera alltid F-skattsedel, ansvarsförsäkring och referensuppdrag. Dokumentera upphandlingsprocessen och spara avtal säkert.',
      },
      {
        rubrik: 'Löpande serviceavtal',
        text: 'Hissar, ventilation, brandlarm och värmesystem kräver regelbunden service. Dessa avtal bör ses över regelbundet – inte bara förnyas automatiskt. Jämför pris och villkor med jämna mellanrum.',
      },
      {
        rubrik: 'GDPR och leverantörer',
        text: 'Leverantörer som hanterar personuppgifter (t.ex. bokningssystem, förvaltare) kräver ett personuppgiftsbiträdesavtal. Styrelsen är ansvarig för att dessa avtal finns.',
      },
    ],
    tips: 'Bygg relationer med pålitliga lokala leverantörer. En bra hantverkare som känner fastigheten är värd mycket.',
    kontakt: 'Kontaktas löpande för underhåll, reparationer och serviceavtal.',
  },
  {
    id: 'bank',
    namn: 'Bank',
    kort: 'Finansiering, lån och föreningskonto',
    icon: Landmark,
    emoji: '🏦',
    color: '#1d4ed8',
    bild: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80',
    intro: 'Banken är en central intressent för föreningen – inte bara som kontoinnehavare utan som långivare vid större investeringar och renoveringar.',
    avsnitt: [
      {
        rubrik: 'Föreningens lån',
        text: 'De flesta BRF:er har fastighetslån. Låneskulden per lägenhet är ett viktigt nyckeltal – högt skuldsatta föreningar är mer känsliga för ränteförändringar. Styrelsen bör ha koll på lånestruktur och räntebindning.',
      },
      {
        rubrik: 'Refinansiering och nya lån',
        text: 'Vid större renoveringar tar föreningen ofta nya lån. Jämför alltid villkor från flera banker. Räntebindningstid är ett strategiskt beslut – korta lån ger lägre ränta men högre risk.',
      },
      {
        rubrik: 'Föreningskonto och likviditet',
        text: 'Föreningens konto ska ha tillräcklig likviditet för löpande utgifter. Fond för yttre underhåll bör hållas separat. Kassören ansvarar för att betalningar görs i tid.',
      },
    ],
    tips: 'Granska alltid lånevillkoren noggrant inför omförhandling. En procentenhet i ränteskillnad kan innebära hundratusentals kronor över löptiden.',
    kontakt: 'Kontaktas vid lånefrågor, kontoöppning och finansieringsstrategier.',
  },
  {
    id: 'hyresnamnd',
    namn: 'Hyresnämnden',
    kort: 'Hanterar tvister om hyra och boende',
    icon: Gavel,
    emoji: '⚖️',
    color: '#7c3aed',
    bild: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80',
    intro: 'Hyresnämnden är en statlig nämnd som hanterar tvister och ärenden kopplat till hyresrätt och bostadsrätt. De är ofta mer tillgängliga och billigare än domstol.',
    avsnitt: [
      {
        rubrik: 'När vänder man sig till Hyresnämnden?',
        text: 'Hyresnämnden hanterar tvister om andrahandsuthyrning, tillståndsfrågor, hyressättning och besittningsskydd. Om en andrahandshyresgäst vägrar flytta kan föreningen ansöka om handräckning.',
      },
      {
        rubrik: 'Tillstånd till andrahandsuthyrning',
        text: 'Om styrelsen nekar en bostadsrättsinnehavare tillstånd till andrahandsuthyrning kan denne ansöka hos Hyresnämnden om tillstånd. Nämnden prövar om skälen för uthyrning är godtagbara.',
      },
      {
        rubrik: 'Tvister om avgifter',
        text: 'Om en bostadsrättsinnehavare bestrider en avgiftshöjning kan tvisten prövas av Hyresnämnden. Styrelsen bör dokumentera sina beslut noggrant för att kunna försvara dem.',
      },
    ],
    tips: 'Hyresnämnden erbjuder medling som ett första steg – ofta ett snabbare och billigare alternativ än rättegång.',
    kontakt: 'hyresnamnd.domstol.se – ansökan och information om ärenden.',
  },
  {
    id: 'revisorer',
    namn: 'Revisorer',
    kort: 'Granskar föreningens ekonomi och förvaltning',
    icon: CheckCircle,
    emoji: '🔍',
    color: '#059669',
    bild: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    intro: 'Revisorn är stämmans representant gentemot styrelsen. Deras uppdrag är att kontrollera att styrelsen skött sin förvaltning korrekt och att räkenskaperna stämmer.',
    avsnitt: [
      {
        rubrik: 'Vad granskar revisorn?',
        text: 'Revisorn granskar årsredovisningen, styrelsens protokoll, avtal, fakturor och att pengar använts korrekt. De tittar också på intern kontroll – finns det rutiner som förhindrar fel och fusk?',
      },
      {
        rubrik: 'Revisionsberättelsen',
        text: 'Revisorn lämnar en revisionsberättelse till stämman. Den rekommenderar antingen ansvarsfrihet för styrelsen eller inte. En "ren" berättelse är normalt – anmärkningar är allvarligt.',
      },
      {
        rubrik: 'Vem kan vara revisor?',
        text: 'Revisorn måste vara oberoende från styrelsen. En f.d. styrelseledamot kan inte vara revisor för det räkenskapsår de satt i styrelsen. Större föreningar bör ha en auktoriserad revisor.',
      },
    ],
    tips: 'Ha en öppen dialog med revisorn under året – inte bara inför bokslutet. Fråga om råd vid osäkra ekonomiska beslut.',
    kontakt: 'Väljs av stämman. Kontaktas vid ekonomiska frågor och inför bokslutet.',
  },
  {
    id: 'bokforingsnamnden',
    namn: 'Bokföringsnämnden',
    kort: 'Sätter reglerna för redovisning',
    icon: BookOpen,
    emoji: '📚',
    color: '#0891b2',
    bild: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    intro: 'Bokföringsnämnden (BFN) är en statlig myndighet som ger ut normgivning för redovisning i Sverige – däribland de viktiga K-regelverken.',
    avsnitt: [
      {
        rubrik: 'K2 och K3',
        text: 'BFN har beslutat att BRF:er inte längre får använda K2 för räkenskapsår som börjar efter 31 december 2025. Alla föreningar måste gå över till K3 med komponentavskrivning.',
      },
      {
        rubrik: 'Komponentavskrivning',
        text: 'K3 kräver att fastigheten delas upp i komponenter (tak, stammar, fönster etc.) som skrivs av separat utifrån verklig livslängd. Det ger en mer rättvisande bild men kräver mer arbete.',
      },
      {
        rubrik: 'BFN:s vägledningar',
        text: 'BFN publicerar vägledningar och exempel som hjälper revisorer och redovisningskonsulter att tillämpa regelverken korrekt. Dessa är fritt tillgängliga på bfn.se.',
      },
    ],
    tips: 'Kontakta er revisor redan nu om K3-övergången – ju tidigare ni startar komponentuppdelningen, desto smidigare blir bytet.',
    kontakt: 'bfn.se – normgivning och vägledningar för redovisning.',
  },
  {
    id: 'grannar',
    namn: 'Grannar',
    kort: 'Boende och fastighetsägare i närheten',
    icon: Users,
    emoji: '🏘️',
    color: '#16a34a',
    bild: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    intro: 'Grannarna – både inom föreningen och i kringliggande fastigheter – är viktiga intressenter i föreningens vardag och projekt.',
    avsnitt: [
      {
        rubrik: 'Grannar inom föreningen',
        text: 'Bostadsrättsinnehavarna är föreningens medlemmar och dess viktigaste intressenter. Styrelsen har ett ansvar att hantera konflikter rättvist och att upprätthålla ordning och trivsel.',
      },
      {
        rubrik: 'Yttre grannar och fastighetsägare',
        text: 'Angränsande fastighetsägare berörs av föreningens byggprojekt, fasadarbeten och utomhusåtgärder. God grannrelation underlättar bygglov, serveringstillstånd och anläggningsarbeten.',
      },
      {
        rubrik: 'Störningar och ordning',
        text: 'Styrelsens hantering av störningsärenden påverkar trivseln för alla boende. Dokumentera, agera konsekvent och kommunicera tydligt. Diskriminering vid hanteringen är förbjudet.',
      },
    ],
    tips: 'Informera grannfastigheter i god tid om större arbeten. Det bygger goodwill och förebygger klagomål.',
    kontakt: 'Löpande kontakt via styrelsen, stämman och informationsutskick.',
  },
  {
    id: 'lagstiftaren',
    namn: 'Lagstiftaren',
    kort: 'Riksdag och regering sätter ramarna',
    icon: Scale,
    emoji: '⚖️',
    color: '#dc2626',
    bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    intro: 'Riksdag och regering sätter de lagar och regler som styr BRF:ers verksamhet. Det är en intressent som sällan märks i vardagen – men vars beslut kan ha stora konsekvenser.',
    avsnitt: [
      {
        rubrik: 'De viktigaste lagarna för BRF:er',
        text: 'Bostadsrättslagen (BRL) reglerar föreningens organisation och bostadsrättsinnehavarnas rättigheter. Bokföringslagen styr redovisningen. Plan- och bygglagen styr byggandet. Diskrimineringslagen och GDPR gäller också fullt ut.',
      },
      {
        rubrik: 'Löpande lagändringar',
        text: 'Lagar förändras kontinuerligt. "Tryggare bostadsrätt" (2023) ändrade rösträttsreglerna. K3-kravet (2026) förändrar redovisningen. Miljökraven 2024 och 2027 ändrar avfallshanteringen.',
      },
      {
        rubrik: 'Hur håller man sig uppdaterad?',
        text: 'Följ branschorganisationer som SBC, HSB och Riksbyggen. Prenumerera på nyhetsbrev från Boverket och Skatteverket. Delta i stämman hos er rikstäckande organisation.',
      },
    ],
    tips: 'Avsätt 30 minuter per kvartal till att läsa branschnyheter. Lagändringar ger sällan lång förberedelsetid.',
    kontakt: 'Indirekt kontakt via branschorganisationer, revisorer och förvaltare.',
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

// ─── HUB-SLIDE ────────────────────────────────────────────
const HubSlide = ({ onNavigate, currentIndex }: {
  onNavigate: (i: number) => void; currentIndex: number;
}) => (
  <div className="w-full h-full overflow-y-auto relative pb-28"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, rgba(10,15,25,0.72) 0%, rgba(10,15,25,0.60) 60%, rgba(10,15,25,0.80) 100%)' }}
    />

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16">

      {/* Rubrik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-14"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          Föreningens intressenter
        </h1>
        <p className="text-white/55 text-sm sm:text-base">
          Klicka på varje cirkel för att läsa mer
        </p>
      </motion.div>

      {/* Cirklar – samma stil som GdprPrinciplesSection */}
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mb-12">
        {INTRESSENTER.map((int, i) => (
          <motion.button
            key={int.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(i + 1)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-center p-3 font-bold text-xs leading-tight shadow-lg transition-all"
              style={{
                background: ORANGE,
                boxShadow: `0 4px 20px rgba(255,84,33,0.45)`,
              }}
            >
              {int.namn}
            </div>
          </motion.button>
        ))}
      </div>

      {/* AudioPlayer + nedladdning */}
      <div className="flex flex-col items-center gap-5">
        <div className="w-full max-w-md">
          {/* placeholder – ersätt med AudioPlayer när ljud finns */}
        </div>

        {/* Nedladdningsknapp */}
        <motion.a
          href="/pdf/Intressenter_Kursmaterial.pdf"
          download
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 group"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.25)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <span className="text-white/55 text-xs group-hover:text-white transition-colors">
            Ladda ner kursmaterial
          </span>
        </motion.a>
      </div>
    </div>
  </div>
);

// ─── INTRESSENT-SLIDE ─────────────────────────────────────
const IntressentSlide = ({ intressent, onBack, onNext, onPrev, isLast, isFirst }: {
  intressent: typeof INTRESSENTER[0];
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
}) => {
  const Icon = intressent.icon;

  return (
    <div className="min-h-full w-full overflow-y-auto pb-28" style={{ background: '#F8F7F4' }}>

      {/* Hero-bild */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img
          src={intressent.bild}
          alt={intressent.namn}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />

        {/* Tillbaka-knapp */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:bg-white/20"
          style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <ArrowLeft size={13} /> Alla intressenter
        </button>

        {/* Badge */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2.5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
            style={{ background: `${intressent.color}25`, border: `2px solid ${intressent.color}60` }}
          >
            {intressent.emoji}
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">{intressent.namn}</p>
            <p className="text-white/65 text-xs">{intressent.kort}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">

        {/* Intro */}
        <FadeIn>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 border-l-4 pl-4"
            style={{ borderColor: intressent.color }}>
            {intressent.intro}
          </p>
        </FadeIn>

        {/* Avsnitt */}
        <div className="space-y-5 mb-8">
          {intressent.avsnitt.map((av, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border shadow-sm"
                style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-slate-800 text-base mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-5 rounded-full flex-shrink-0" style={{ background: intressent.color }} />
                  {av.rubrik}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{av.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tips */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl p-5 mb-8 border-l-4"
            style={{ background: `${ORANGE}08`, borderColor: ORANGE }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: ORANGE }}>
              💡 Tips för er styrelse
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">{intressent.tips}</p>
          </div>
        </FadeIn>

        {/* Kontakt */}
        <FadeIn delay={0.25}>
          <div className="bg-white rounded-2xl p-5 border mb-8 flex items-start gap-3"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <Icon size={20} className="flex-shrink-0 mt-0.5" style={{ color: intressent.color }} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-400">Kontakt</p>
              <p className="text-slate-700 text-sm leading-relaxed">{intressent.kontakt}</p>
            </div>
          </div>
        </FadeIn>

        {/* Navigering föregående/nästa */}
        <div className="flex gap-3">
          {!isFirst && (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onPrev}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border font-semibold text-sm transition-all"
              style={{ borderColor: 'rgba(0,0,0,0.1)', color: DARK, background: 'white' }}
            >
              <ArrowLeft size={15} /> Föregående
            </motion.button>
          )}
          {!isLast && (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
            >
              Nästa intressent <ArrowRight size={15} />
            </motion.button>
          )}
          {isLast && (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
            >
              <Award size={15} /> Tillbaka till översikten
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── HUVUD-KOMPONENT ──────────────────────────────────────
const ModuleIntressenter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop]       = useState(false);
  const [userData]                      = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Slide 0 = hub, slide 1–13 = intressenter
  const slides = [
    {
      id: 'hub',
      title: 'Föreningens intressenter',
      component: (
        <HubSlide
          onNavigate={setCurrentIndex}
          currentIndex={currentIndex}
        />
      ),
    },
    ...INTRESSENTER.map((int, i) => ({
      id: int.id,
      title: int.namn,
      component: (
        <IntressentSlide
          intressent={int}
          onBack={() => setCurrentIndex(0)}
          onNext={() => setCurrentIndex(i + 2)}
          onPrev={() => setCurrentIndex(i)}
          isLast={i === INTRESSENTER.length - 1}
          isFirst={i === 0}
        />
      ),
    })),
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#F8F7F4' }}>
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
        title="Vanliga frågor om intressenter"
        subtitle="Svar på de vanligaste frågorna om föreningens omvärld"
        buttonColor={ORANGE}
      />
    </div>
  );
};

export default ModuleIntressenter;