// modules2.jsx
import Bostadsrattsforeningen from '../modules/Styrelsekorkortet/BRFModule.tsx';
import DiskrimineringslagenModule from '../modules/Styrelsekorkortet/DiskrimineringslagenModule.tsx';
// import GDPRModule from '../modules/Styrelsekorkortet/GDPRModule';
// import BostadsrattsforeningenModule from "../../modules/Styrelsekorkortet/Bostadsrattsforeningen.tsx";
import StyrelsenRollerModule from '../modules/Styrelsekorkortet/StyrelsenRollerModule.tsx';
import Module1Introduktion from '../modules/Styrelsekorkortet/Module1Introduktion.tsx';
// import DiskrimineringslagenModule from '../modules/DiskrimineringslagenModule';
import Module3Gdpr from '../modules/Styrelsekorkortet/Module3Gdpr.tsx';
// import ForeningsPrinciperModule from '../modules/Styrelsekorkortet/ForeningsPrinciperModule';
import DokumentationModule from '../modules/DocuModule.tsx';
// import IntressenterModule from '../modules/IntressenterModule';
// import StyrelsenModule from '../modules/StyrelsenModule';
// import KonflikthanteringModule from '../modules/KonflikthanteringModule';
// import ArsredovisningModule from '../modules/ArsredovisningModule';
import Module2Arsredovisning from '../modules/Styrelsekorkortet/Module2Arsredovisning';
// import FattaRattBeslutModule from '../modules/FattaRattBeslutModule';
// import EffektivtStyrelsearbeteModule from '../modules/EffektivtStyrelsearbeteModule';
// import FastighetenModule from '../modules/FastighetenModule';
// import ForhandlingsteknikModule from '../modules/ForhandlingsteknikModule';

export const modulesData = [
   {
    id: 'styrelseroller',
    slug: 'styrelseroller',
    title: 'Välkommen till bostadsrättsföreningen',
    category: 'STYRELSEN',
    short_description: 'Lär dig om de olika rollerna i en bostadsrättsförenings styrelse.',
    long_description: 'Detaljerad genomgång av ordförande, vice ordförande, sekreterare, kassör och ledamöters ansvarsområden.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    author: 'Styrelse Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Styrelse+Expert&background=3B82F6&color=fff',
    duration: '2.5 timmar',
    level: '',
    lessons: 11,
    videoLessons: 2,
    quizzes: 2,
    rating: 5.0,
    students: 520,
    isTrial: true,
    previewVideoUrl: 'https://www.youtube.com/embed/NO-Lq3w94Tg',
    component: Module1Introduktion, // ⭐ Ändrat till null
    learningPoints: [
      'Ordförandens ansvar och uppgifter',
      'Vice ordförandens roll',
      'Sekreterarens dokumentationsansvar',
      'Kassörens ekonomiska ansvar'
    ]
  },
  {
    id: 'bostadsrattsforeningen',
    slug: 'bostadsrattsforeningen',
    title: 'Bostadsrättsföreningen',
    category: 'Juridik',
    short_description: 'Lär dig allt om hur en bostadsrättsförening fungerar. Från beslut till',
    long_description: 'En komplett introduktion till bostadsrättsföreningen - vad den är, hur den styrs och vilka regler som gäller. Perfekt för nya styrelsemedlemmar!',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720',
    author: 'BRF Expert',
    logo_url: 'https://ui-avatars.com/api/?name=BRF+Expert&background=FF5421&color=fff',
    duration: '2 timmar',
    level: 'Kapitel 2',
    lessons: 8,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.9,
    students: 450,
    previewVideoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    component: Bostadsrattsforeningen,
    learningPoints: [
      'Förstå vad en bostadsrättsförening är',
      'Lära dig om medlemskap och rättigheter',
      'Få kunskap om stadgar och regler',
      'Förstå föreningens ekonomi'
    ]
  },
  {
  id: 'gdpr-personuppgifter',
  slug: 'gdpr-personuppgifter',
  title: 'GDPR i föreningen',
  category: 'Juridik',
  short_description: 'Lär dig om GDPR och hur bostadsrättsföreningar ska hantera personuppgifter.',
  long_description: 'Komplett guide till GDPR-regler för bostadsrättsföreningar. Lär dig om personuppgiftshantering, registerföring och medlemmars rättigheter.',
  image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&h=720',
  author: 'GDPR Specialist',
  logo_url: 'https://ui-avatars.com/api/?name=GDPR+Specialist&background=6366F1&color=fff',
  duration: '2 timmar',
  level: 'Kapitel 3',
  lessons: 9,
  videoLessons: 1,
  quizzes: 2,
  rating: 4.9,
  students: 420,
  previewVideoUrl: null,
  component: Module3Gdpr,
  learningPoints: [
    'Förstå GDPR och dataskyddsförordningen',
    'Hantera personuppgifter korrekt',
    'Registerföring och dokumentation',
    'Medlemmars rättigheter enligt GDPR'
  ]
},
 
  {
    id: 'diskrimineringslagen',
    slug: 'diskrimineringslagen',
    title: 'Diskrimineringslagen',
    category: 'Juridik',
    short_description: 'Förstå diskrimineringslagen och hur den tillämpas i bostadsrättsföreningar.',
    long_description: 'Lär dig om de sju diskrimineringsgrunderna, direkt och indirekt diskriminering samt styrelsens ansvar.',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&h=720',
    author: 'Juridisk Specialist',
    logo_url: 'https://ui-avatars.com/api/?name=Juridisk+Specialist&background=10B981&color=fff',
    duration: '2 timmar',
    level: 'Modul 4',
    lessons: 8,
    videoLessons: 1,
    quizzes: 2,
    rating: 4.8,
    students: 380,
    previewVideoUrl: null,
    component: DiskrimineringslagenModule,
    learningPoints: [
      'De sju diskrimineringsgrunderna',
      'Direkt vs indirekt diskriminering',
      'Trakasserier och sexuella trakasserier',
      'Styrelsens ansvar och åtgärder'
    ]
  },
  {
    id: 'foreningens-principer',
    slug: 'foreningens-principer',
    title: 'Föreningens olika principer',
    category: 'GRUNDERNA',
    short_description: 'Lär dig de grundläggande principerna för hur en förening ska drivas.',
    long_description: 'Genomgång av demokrati, likställdhet, transparens och andra viktiga principer för föreningsstyrning.',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&h=720',
    author: 'Förenings Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Forenings+Expert&background=8B5CF6&color=fff',
    duration: '1.5 timmar',
    level: 'Modul 5',
    lessons: 7,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.7,
    students: 290,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Demokratiprincipen',
      'Likställdhet och rättvisa',
      'Transparens och öppenhet',
      'Medlemmarnas rättigheter'
    ]
  },
  {
    id: 'styrelsens-dokumentation',
    slug: 'styrelsens-dokumentation',
    title: 'Styrelsens dokumentation',
    category: 'ADMINISTRATION',
    short_description: 'Lär dig hur styrelsen dokumenterar möten och beslut korrekt.',
    long_description: 'Allt om protokoll, kallelser, beslutsunderlag och hur dokumentation ska arkiveras enligt lag.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    author: 'Administrations Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Admin+Expert&background=F59E0B&color=fff',
    duration: '2 timmar',
    level: 'Modul 6',
    lessons: 9,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.9,
    students: 410,
    previewVideoUrl: null,
    component: DokumentationModule, // ⭐ Ändrat till null
    learningPoints: [
      'Skriva korrekta protokoll',
      'Kallelser och dagordningar',
      'Arkivering och dokumenthantering',
      'Digitala verktyg för dokumentation'
    ]
  },
  {
    id: 'foreningens-intressenter',
    slug: 'foreningens-intressenter',
    title: 'Föreningens intressenter',
    category: 'KOMMUNIKATION',
    short_description: 'Förstå och hantera relationer med föreningens olika intressenter.',
    long_description: 'Lär dig om medlemmar, myndigheter, leverantörer och andra viktiga intressenter.',
    image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720',
    author: 'Relations Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Relations+Expert&background=EC4899&color=fff',
    duration: '1.5 timmar',
    level: 'Modul 7',
    lessons: 6,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.6,
    students: 320,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Identifiera viktiga intressenter',
      'Kommunikation med medlemmar',
      'Hantera myndighetskontakter',
      'Samarbete med leverantörer'
    ]
  },
  {
    id: 'styrelsen',
    slug: 'styrelsen',
    title: 'Styrelsen',
    category: 'STYRELSEN',
    short_description: 'Fördjupning i styrelsens arbete, ansvar och befogenheter.',
    long_description: 'Omfattande kurs om styrelsens roll, arbetssätt, beslutsprocesser och juridiska ansvar.',
    image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&h=720',
    author: 'Styrnings Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Styrnings+Expert&background=EF4444&color=fff',
    duration: '3 timmar',
    level: 'Modul 8',
    lessons: 12,
    videoLessons: 3,
    quizzes: 2,
    rating: 4.9,
    students: 480,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Styrelsens befogenheter och ansvar',
      'Beslutsprocesser och delegering',
      'Styrelsens juridiska ansvar',
      'Effektiv styrelsemöten'
    ]
  },
  {
    id: 'konflikthantering',
    slug: 'konflikthantering',
    title: 'Konflikthantering',
    category: 'LEDARSKAP',
    short_description: 'Lär dig hantera och lösa konflikter i föreningen professionellt.',
    long_description: 'Praktiska verktyg och tekniker för att förebygga, identifiera och lösa konflikter.',
    image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1280&h=720',
    author: 'Konfliktlösnings Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Konflikt+Expert&background=06B6D4&color=fff',
    duration: '2 timmar',
    level: 'Modul 9',
    lessons: 8,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.8,
    students: 350,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Identifiera konflikter tidigt',
      'Medlingsteknik och kommunikation',
      'Konfliktlösningsmodeller',
      'Förebyggande arbete'
    ]
  },
  {
    id: 'arsredovisningen',
    slug: 'arsredovisningen',
    title: 'Årsredovisningen',
    category: 'EKONOMI',
    short_description: 'Förstå och tolka bostadsrättsföreningens årsredovisning.',
    long_description: 'Lär dig läsa resultaträkning, balansräkning och förvaltningsberättelse.',
    image_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1280&h=720',
    author: 'Ekonomi Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Ekonomi+Expert&background=14B8A6&color=fff',
    duration: '2.5 timmar',
    level: 'Modul 10',
    lessons: 10,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.7,
    students: 390,
    previewVideoUrl: null,
    component: Module2Arsredovisning, // ⭐ Ändrat till null
    learningPoints: [
      'Läsa resultaträkningen',
      'Förstå balansräkningen',
      'Tolka nyckeltal',
      'Förvaltningsberättelsen'
    ]
  },
  {
    id: 'fatta-ratt-beslut',
    slug: 'fatta-ratt-beslut',
    title: 'Fatta rätt beslut',
    category: 'LEDARSKAP',
    short_description: 'Lär dig strukturerad beslutsfattande och beslutsunderlag.',
    long_description: 'Metoder och verktyg för att fatta välgrundade beslut i styrelsearbetet.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    author: 'Besluts Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Besluts+Expert&background=F97316&color=fff',
    duration: '2 timmar',
    level: 'Modul 11',
    lessons: 7,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.8,
    students: 310,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Beslutsprocessen steg-för-steg',
      'Riskanalys och konsekvenser',
      'Beslutsunderlag och dokumentation',
      'Gruppbeslut vs individuella beslut'
    ]
  },
  {
    id: 'effektivt-styrelsearbete',
    slug: 'effektivt-styrelsearbete',
    title: 'Effektivt styrelsearbete',
    category: 'LEDARSKAP',
    short_description: 'Optimera styrelsens arbete för bättre resultat och effektivitet.',
    long_description: 'Praktiska tips och metoder för att göra styrelsearbetet mer effektivt och produktivt.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    author: 'Effektivitets Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Effektivitets+Expert&background=A855F7&color=fff',
    duration: '1.5 timmar',
    level: 'Modul 12',
    lessons: 6,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.9,
    students: 440,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Effektiva styrelsemöten',
      'Tidsplanering och prioritering',
      'Delegering och uppföljning',
      'Digitala verktyg för styrelsen'
    ]
  },
  {
    id: 'fastigheten',
    slug: 'fastigheten',
    title: 'Fastigheten',
    category: 'FÖRVALTNING',
    short_description: 'Lär dig om fastighetsförvaltning och underhåll av bostadsrättsföreningens fastighet.',
    long_description: 'Allt om underhållsplanering, energieffektivisering, renovering och fastighetens skötsel.',
    image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1280&h=720',
    author: 'Fastighets Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Fastighets+Expert&background=22C55E&color=fff',
    duration: '3 timmar',
    level: 'Modul 13',
    lessons: 11,
    videoLessons: 3,
    quizzes: 2,
    rating: 4.8,
    students: 370,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Underhållsplan och stambyten',
      'Energieffektivisering',
      'Fastighetsskötsel och drift',
      'Större renoveringsprojekt'
    ]
  },
  {
    id: 'forhandlingsteknik-upphandling',
    slug: 'forhandlingsteknik-upphandling',
    title: 'Förhandlingsteknik & Upphandling',
    category: 'ADMINISTRATION',
    short_description: 'Lär dig professionell förhandlingsteknik och upphandlingsprocess.',
    long_description: 'Praktiska verktyg för framgångsrika förhandlingar och korrekt upphandling enligt LOU.',
    image_url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1280&h=720',
    author: 'Förhandlings Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Forhandlings+Expert&background=DC2626&color=fff',
    duration: '2.5 timmar',
    level: 'Modul 14',
    lessons: 9,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.9,
    students: 330,
    previewVideoUrl: null,
    component: null, // ⭐ Ändrat till null
    learningPoints: [
      'Förhandlingsstrategier och taktik',
      'Upphandlingsprocessen (LOU)',
      'Kontraktsförhandling',
      'Leverantörsutvärdering'
    ]
  }
];

export const getModuleBySlug = (slug) => {
  return modulesData.find(module => module.slug === slug);
};

export const getModulesByCategory = (category) => {
  if (category === 'ALLA') return modulesData;
  return modulesData.filter(module => module.category === category);
};

export const categories = [
  'ALLA', 
  'GRUNDERNA', 
  'STYRELSEN', 
  'JURIDIK', 
  'ADMINISTRATION', 
  'KOMMUNIKATION', 
  'LEDARSKAP', 
  'EKONOMI', 
  'FÖRVALTNING'
];