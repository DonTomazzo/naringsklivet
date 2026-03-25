import VadArEnAktieModule from '../modules/Aktiekorkortet/Modul01_VadArEnAktie.tsx';
// import AktiemarknadenModule from '../modules/Aktiekurs/AktiemarknadenModule.tsx';
// import FundamentalAnalysModule from '../modules/Aktiekurs/FundamentalAnalysModule.tsx';
// import TekniskAnalysModule from '../modules/Aktiekorkortet/Modul04_TekniskAnalys.tsx';
// import RiskhanteringModule from '../modules/Aktiekurs/RiskhanteringModule.tsx';
// import InvesteringsstrategierModule from '../modules/Aktiekurs/InvesteringsstrategierModule.tsx';
// import FonderETFModule from '../modules/Aktiekurs/FonderETFModule.tsx';
// import SkatterModule from '../modules/Aktiekurs/SkatterModule.tsx';
// import PsykologiModule from '../modules/Aktiekurs/PsykologiModule.tsx';
// import MakroEkonomiModule from '../modules/Aktiekurs/MakroEkonomiModule.tsx';
// import TillgangsklasserModule from '../modules/Aktiekurs/TillgangsklasserModule.tsx';
// import GlobalaMarknadenModule from '../modules/Aktiekurs/GlobalaMarknadenModule.tsx';
// import ESGModule from '../modules/Aktiekurs/ESGModule.tsx';
// import VanligaMisstakModule from '../modules/Aktiekurs/VanligaMisstakModule.tsx';
// import ByggPortfoljModule from '../modules/Aktiekurs/ByggPortfoljModule.tsx';

export const aktieModulesData = [
  {
    id: 'vad-ar-en-aktie',
    slug: 'vad-ar-en-aktie',
    title: 'Vad är en aktie?',
    category: 'GRUNDERNA',
    short_description: 'Din första steg in i aktiemarknaden - lär dig grunderna.',
    long_description: 'En komplett introduktion till aktier - vad de är, hur de fungerar och varför företag ger ut aktier. Perfekt för dig som är helt ny inom aktier!',
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1280&h=720',
    author: 'Aktie Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Aktie+Expert&background=10B981&color=fff',
    duration: '2 timmar',
    level: 'Nybörjare',
    lessons: 13,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.9,
    students: 1250,
    isTrial: true,
    previewVideoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    component: VadArEnAktieModule,
    learningPoints: [
      'Vad en aktie är och vad den representerar',
      'Ägarandel och dina rättigheter som aktieägare',
      'Olika typer av aktier',
      'Hur aktier värderas och handlas'
    ]
  },
  {
    id: 'aktiemarknaden-borsen',
    slug: 'aktiemarknaden-borsen',
    title: 'Aktiemarknaden och börsen',
    category: 'GRUNDERNA',
    short_description: 'Lär dig hur aktiemarknaden och börsen fungerar.',
    long_description: 'Förstå hur börsen fungerar, olika börser i världen, börsindex och hur handel går till under en börsdag.',
    image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1280&h=720',
    author: 'Marknads Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Marknads+Expert&background=3B82F6&color=fff',
    duration: '2.5 timmar',
    level: 'Nybörjare',
    lessons: 14,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.8,
    students: 1120,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Vad en börs är och dess funktion',
      'Olika börser i världen',
      'Börsindex som OMX30 och S&P 500',
      'Hur du köper och säljer aktier'
    ]
  },
  {
    id: 'fundamental-analys',
    slug: 'fundamental-analys',
    title: 'Fundamental analys',
    category: 'ANALYS',
    short_description: 'Lär dig analysera företag och deras verkliga värde.',
    long_description: 'Djupdyk i fundamental analys - lär dig läsa årsredovisningar, nyckeltal och värdera företag som en proffs.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720',
    author: 'Analys Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Analys+Expert&background=8B5CF6&color=fff',
    duration: '3 timmar',
    level: 'Mellan',
    lessons: 15,
    videoLessons: 3,
    quizzes: 3,
    rating: 4.9,
    students: 980,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Läsa och förstå årsredovisningar',
      'Viktiga nyckeltal som P/E och P/B',
      'Analysera lönsamhet och tillväxt',
      'Bransch- och konkurrentanalys'
    ]
  },
  {
    id: 'teknisk-analys',
    slug: 'teknisk-analys',
    title: 'Teknisk analys',
    category: 'ANALYS',
    short_description: 'Förstå diagram, trender och tekniska indikatorer.',
    long_description: 'Lär dig grunderna i teknisk analys - diagram, trendlinjer, stöd och motstånd samt populära indikatorer.',
    image_url: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720',
    author: 'Teknisk Analytiker',
    logo_url: 'https://ui-avatars.com/api/?name=Teknisk+Analytiker&background=EF4444&color=fff',
    duration: '2.5 timmar',
    level: 'Mellan',
    lessons: 14,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.7,
    students: 850,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Läsa olika typer av diagram',
      'Identifiera trender och mönster',
      'Använda tekniska indikatorer',
      'Stöd- och motståndsnivåer'
    ]
  },
  {
    id: 'riskhantering-diversifiering',
    slug: 'riskhantering-diversifiering',
    title: 'Riskhantering och diversifiering',
    category: 'STRATEGI',
    short_description: 'Lär dig hantera risk och skydda ditt kapital.',
    long_description: 'Förstå olika typer av risk, vikten av diversifiering och hur du bygger en balanserad portfölj.',
    image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1280&h=720',
    author: 'Risk Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Risk+Expert&background=F59E0B&color=fff',
    duration: '2 timmar',
    level: 'Mellan',
    lessons: 13,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.9,
    students: 920,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Olika typer av risk',
      'Vikten av diversifiering',
      'Stop loss och take profit',
      'Bedöma din risktolerans'
    ]
  },
  {
    id: 'investeringsstrategier',
    slug: 'investeringsstrategier',
    title: 'Investeringsstrategier',
    category: 'STRATEGI',
    short_description: 'Upptäck olika sätt att investera i aktier.',
    long_description: 'Lär dig om olika investeringsstrategier - från värdeinvestering till indexinvestering och dollar cost averaging.',
    image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1280&h=720',
    author: 'Strategi Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Strategi+Expert&background=06B6D4&color=fff',
    duration: '3 timmar',
    level: 'Mellan',
    lessons: 15,
    videoLessons: 3,
    quizzes: 2,
    rating: 4.8,
    students: 1050,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Värdeinvestering och tillväxtinvestering',
      'Utdelningsinvestering',
      'Indexinvestering och passiv förvaltning',
      'Buy and hold strategin'
    ]
  },
  {
    id: 'fonder-etf',
    slug: 'fonder-etf',
    title: 'Fonder och ETF:er',
    category: 'PRODUKTER',
    short_description: 'Lär dig om fonder och ETF:er som investeringsalternativ.',
    long_description: 'Förstå skillnaden mellan olika fondtyper, aktivt vs passivt förvaltade fonder och hur du väljer rätt fond.',
    image_url: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1280&h=720',
    author: 'Fond Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Fond+Expert&background=EC4899&color=fff',
    duration: '2 timmar',
    level: 'Nybörjare',
    lessons: 13,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.8,
    students: 1180,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Skillnaden mellan fonder och ETF:er',
      'Aktivt vs passivt förvaltade fonder',
      'Fondavgifter och TER',
      'Månadssparande i fonder'
    ]
  },
  {
    id: 'skatter-beskattning',
    slug: 'skatter-beskattning',
    title: 'Skatter och beskattning',
    category: 'PRAKTISKT',
    short_description: 'Förstå hur aktier beskattas i Sverige.',
    long_description: 'Lär dig om kapitalvinstskatt, ISK vs AF-konto, deklaration och hur du skatteplanerar smart.',
    image_url: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1280&h=720',
    author: 'Skatte Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Skatte+Expert&background=14B8A6&color=fff',
    duration: '2 timmar',
    level: 'Mellan',
    lessons: 12,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.7,
    students: 890,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Kapitalvinstskatt i Sverige',
      'ISK vs Aktie- och fondkonto',
      'Deklarera aktievinster och förluster',
      'Utdelningsskatt och utländska aktier'
    ]
  },
  {
    id: 'psykologi-beteendeekonomi',
    slug: 'psykologi-beteendeekonomi',
    title: 'Psykologi och beteendeekonomi',
    category: 'PSYKOLOGI',
    short_description: 'Förstå hur känslor påverkar dina investeringsbeslut.',
    long_description: 'Lär dig om vanliga psykologiska fallgropar, flockbeteende och hur du håller disciplin i din investering.',
    image_url: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=1280&h=720',
    author: 'Psykolog',
    logo_url: 'https://ui-avatars.com/api/?name=Psykolog&background=A855F7&color=fff',
    duration: '2 timmar',
    level: 'Mellan',
    lessons: 13,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.9,
    students: 780,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Känslor och investeringsbeslut',
      'Vanliga kognitiva bias',
      'FOMO och panikförsäljning',
      'Disciplin och långsiktighet'
    ]
  },
  {
    id: 'ekonomiska-indikatorer',
    slug: 'ekonomiska-indikatorer',
    title: 'Ekonomiska indikatorer och makroekonomi',
    category: 'EKONOMI',
    short_description: 'Lär dig hur makroekonomin påverkar aktiemarknaden.',
    long_description: 'Förstå BNP, inflation, räntor, centralbanker och hur ekonomiska cykler påverkar dina investeringar.',
    image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1280&h=720',
    author: 'Ekonom',
    logo_url: 'https://ui-avatars.com/api/?name=Ekonom&background=22C55E&color=fff',
    duration: '2.5 timmar',
    level: 'Avancerad',
    lessons: 14,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.6,
    students: 650,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'BNP och ekonomisk tillväxt',
      'Inflation och räntors påverkan',
      'Centralbanker och penningpolitik',
      'Ekonomiska cykler'
    ]
  },
  {
    id: 'olika-tillgangsklasser',
    slug: 'olika-tillgangsklasser',
    title: 'Olika tillgångsklasser',
    category: 'DIVERSIFIERING',
    short_description: 'Utforska olika sätt att investera utöver aktier.',
    long_description: 'Lär dig om obligationer, råvaror, fastigheter, krypto och hur olika tillgångsklasser kompletterar varandra.',
    image_url: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1280&h=720',
    author: 'Portfölj Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Portfolj+Expert&background=F97316&color=fff',
    duration: '2.5 timmar',
    level: 'Avancerad',
    lessons: 13,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.7,
    students: 720,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Aktier, obligationer och råvaror',
      'Fastigheter och REITs',
      'Kryptovalutor som tillgångsklass',
      'Balanserad portföljallokering'
    ]
  },
  {
    id: 'globala-marknader',
    slug: 'globala-marknader',
    title: 'Globala marknader',
    category: 'GLOBALT',
    short_description: 'Investera globalt - lär dig om olika marknader.',
    long_description: 'Förstå skillnader mellan utvecklade och tillväxtmarknader, valutarisk och hur du investerar internationellt.',
    image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1280&h=720',
    author: 'Global Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Global+Expert&background=DC2626&color=fff',
    duration: '2 timmar',
    level: 'Avancerad',
    lessons: 12,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.6,
    students: 580,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'USA, Europa och Asien-marknader',
      'Tillväxtmarknader vs utvecklade marknader',
      'Valutarisk och hedging',
      'Investera i utländska aktier'
    ]
  },
  {
    id: 'hallbara-investeringar-esg',
    slug: 'hallbara-investeringar-esg',
    title: 'Hållbara investeringar (ESG)',
    category: 'HÅLLBARHET',
    short_description: 'Investera hållbart och ansvarsfullt.',
    long_description: 'Lär dig om ESG-investeringar, gröna obligationer, impact investing och hur du undviker greenwashing.',
    image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1280&h=720',
    author: 'ESG Expert',
    logo_url: 'https://ui-avatars.com/api/?name=ESG+Expert&background=10B981&color=fff',
    duration: '2 timmar',
    level: 'Mellan',
    lessons: 12,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.8,
    students: 690,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Vad ESG betyder och varför det är viktigt',
      'ESG-rating och betyg',
      'Undvik greenwashing',
      'Impact investing och artikel 8/9-fonder'
    ]
  },
  {
    id: 'vanliga-misstag',
    slug: 'vanliga-misstag',
    title: 'Vanliga misstag att undvika',
    category: 'VARNINGAR',
    short_description: 'Lär av andras misstag och undvik de vanligaste fallgroparna.',
    long_description: 'Upptäck de vanligaste misstagen som nybörjare gör och lär dig hur du undviker dem.',
    image_url: 'https://images.unsplash.com/photo-1533093818801-fa616a2676cd?w=1280&h=720',
    author: 'Erfaren Investerare',
    logo_url: 'https://ui-avatars.com/api/?name=Erfaren+Investerare&background=F59E0B&color=fff',
    duration: '1.5 timmar',
    level: 'Nybörjare',
    lessons: 11,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.9,
    students: 1340,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Att inte ha en plan',
      'Försöka tajma marknaden',
      'Att inte diversifiera',
      'Ignorera avgifter och skatter'
    ]
  },
  {
    id: 'bygg-din-forsta-portfolio',
    slug: 'bygg-din-forsta-portfolio',
    title: 'Bygg din första portfölj',
    category: 'PRAKTISKT',
    short_description: 'Praktisk guide - gör din första investering!',
    long_description: 'Steg-för-steg guide för att bygga din första aktieportfölj - från att sätta mål till att göra din första investering.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    author: 'Portfölj Coach',
    logo_url: 'https://ui-avatars.com/api/?name=Portfolj+Coach&background=6366F1&color=fff',
    duration: '3 timmar',
    level: 'Nybörjare',
    lessons: 16,
    videoLessons: 3,
    quizzes: 3,
    rating: 5.0,
    students: 1520,
    previewVideoUrl: null,
    component: null,
    learningPoints: [
      'Sätt upp investeringsmål',
      'Välj rätt konto och mäklare',
      'Gör din första investering',
      'Långsiktig uppföljning och rebalansering'
    ]
  }
];

export const getAktieModuleBySlug = (slug) => {
  return aktieModulesData.find(module => module.slug === slug);
};

export const getAktieModulesByCategory = (category) => {
  if (category === 'ALLA') return aktieModulesData;
  return aktieModulesData.filter(module => module.category === category);
};

export const aktieCategories = [
  'ALLA',
  'GRUNDERNA',
  'ANALYS',
  'STRATEGI',
  'PRODUKTER',
  'PRAKTISKT',
  'PSYKOLOGI',
  'EKONOMI',
  'DIVERSIFIERING',
  'GLOBALT',
  'HÅLLBARHET',
  'VARNINGAR'
];
