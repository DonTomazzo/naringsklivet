// src/data/coursesData.ts
//
// Master-källa för ALLA kurser på båda plattformarna.
// Importeras av CoursePage, ModulesPage och filtreringsfunktioner.
//
// Plattformar:
//   'styrelsekorkortet' – BRF-kurser
//   'naringsklivet'     – AI/arbetslivskurser
//
// Routing:
//   /kurs/:slug    → CoursePage (kursöversikt)
//   /module/:slug  → ModuleRouter (renderar modulkomponent)

// ── Importer – Styrelsekörkortet ────────────────────────────────────────────
import Bostadsrattsforeningen  from '../modules/Styrelsekorkortet/BRFModule';
import Module0Introduktion     from '../modules/Styrelsekorkortet/Module0Introduktion';
import Module1Introduktion     from '../modules/Styrelsekorkortet/Module1Introduktion';
import Module2Arsredovisning   from '../modules/Styrelsekorkortet/Module2Arsredovisning';
import Module3Gdpr             from '../modules/Styrelsekorkortet/Module3Gdpr';
import Module4Diskriminering   from '../modules/Styrelsekorkortet/Module4Diskriminering';
import Module5AiBrf            from '../modules/Styrelsekorkortet/Module5AiBrf';
import ModuleDokumentation     from '../modules/Styrelsekorkortet/ModuleDokumentation';
import ModuleHallbarhet        from '../modules/Styrelsekorkortet/ModuleHallbarhet';
import ModuleIntressenter      from '../modules/Styrelsekorkortet/ModuleIntressenter';

// ── Importer – Näringsklivet ─────────────────────────────────────────────────
import ModuleAIGrunderna       from '../modules/Naringsklivet/ModuleAIGrunderna';

// ── Typdefinitioner ──────────────────────────────────────────────────────────
export type Platform = 'styrelsekorkortet' | 'naringsklivet';

export type Category =
  | 'GRUNDERNA'
  | 'STYRELSEN'
  | 'JURIDIK'
  | 'ADMINISTRATION'
  | 'KOMMUNIKATION'
  | 'LEDARSKAP'
  | 'EKONOMI'
  | 'FÖRVALTNING'
  | 'AI & PRODUKTIVITET';

export interface CourseModule {
  title:    string;
  duration: string;
  free:     boolean;
}

export interface Testimonial {
  name:   string;
  role:   string;
  text:   string;
  rating: number;
}

export interface Instructor {
  name:  string;
  title: string;
  img:   string;
  bio:   string;
}

export interface Course {
  // Identitet
  id:          string;
  slug:        string;
  platform:    Platform;
  category:    Category;

  // Texter
  title:             string;
  subtitle:          string;
  short_description: string;
  long_description:  string;

  // Media
  image_url:       string;
  previewVideoUrl: string | null;

  // Metadata
  duration:     string;
  lessons:      number;
  videoLessons: number;
  quizzes:      number;
  rating:       number;
  students:     number;

  // Ekonomi
  price:       number;
  priceTeam:   string;
  isTrial?:    boolean;

  // Innehåll
  component:      React.ComponentType | null;
  instructor:     Instructor;
  learningPoints: string[];
  modules:        CourseModule[];
  forWho:         string[];
  testimonials:   Testimonial[];
}

// ── Delad instruktör – Styrelsekörkortet ────────────────────────────────────
const INSTRUCTOR_BRF: Instructor = {
  name:  'Tomas Mauritzson',
  title: 'Kursledare, Styrelsekörkortet',
  img:   '/founder.png',
  bio:   '15+ års erfarenhet av styrelsearbete, föreningsjuridik och utbildning. Grundare av Styrelsekörkortet.',
};

// ── Delad instruktör – Näringsklivet ────────────────────────────────────────
const INSTRUCTOR_NK: Instructor = {
  name:  'Tomas Mauritzson',
  title: 'Kursledare, Näringsklivet',
  img:   '/founder.png',
  bio:   'Grundare av Näringsklivet. Arbetar dagligen med AI-verktyg i affärsutveckling och utbildning.',
};

// ════════════════════════════════════════════════════════════════════════════
// KURSER – STYRELSEKÖRKORTET
// ════════════════════════════════════════════════════════════════════════════
const STYRELSEKORKORTET_COURSES: Course[] = [
  {
    id:       'styrelseroller',
    slug:     'styrelseroller',
    platform: 'styrelsekorkortet',
    category: 'STYRELSEN',
    title:    'Lär känna din nya kollega i teamet',
    subtitle: 'Förstå rollerna i styrelsen – vem gör vad och varför det spelar roll',
    short_description: 'Lär dig om de olika rollerna i en bostadsrättsförenings styrelse.',
    long_description:  'Detaljerad genomgång av ordförande, vice ordförande, sekreterare, kassör och ledamöters ansvarsområden.',
    image_url:       'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    previewVideoUrl: 'https://www.youtube.com/embed/NO-Lq3w94Tg',
    duration:     '2.5 timmar',
    lessons:      11,
    videoLessons: 2,
    quizzes:      2,
    rating:       5.0,
    students:     520,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    isTrial:      true,
    component:    Module1Introduktion,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Ordförandens ansvar och uppgifter',
      'Vice ordförandens roll',
      'Sekreterarens dokumentationsansvar',
      'Kassörens ekonomiska ansvar',
      'Ledamotens grundläggande skyldigheter',
      'Hur styrelsen fattar beslut tillsammans',
    ],
    modules: [
      { title: 'Välkommen & Introduktion',         duration: '20 min', free: true  },
      { title: 'Ordförande – rollen och ansvaret', duration: '25 min', free: false },
      { title: 'Sekreterare – dokumentation',      duration: '20 min', free: false },
      { title: 'Kassör – ekonomi och kontroll',    duration: '25 min', free: false },
      { title: 'Ledamot – ansvar och rättigheter', duration: '20 min', free: false },
      { title: 'Styrelsen som team',               duration: '20 min', free: false },
    ],
    forWho: [
      'Nya styrelseledamöter som vill förstå sin roll',
      'Ordföranden som vill stärka hela styrelsens kompetens',
      'Föreningar som vill säkerställa tydlig ansvarsfördelning',
      'Dig som funderar på att gå in i styrelsen',
    ],
    testimonials: [
      { name: 'Anna K.',   role: 'Ordförande BRF Solen', text: 'Äntligen förstår hela styrelsen vem som ansvarar för vad.',  rating: 5 },
      { name: 'Marcus L.', role: 'Kassör BRF Eken',      text: 'Tydlig och pedagogisk genomgång. Rekommenderar varmt.',      rating: 5 },
    ],
  },

  {
    id:       'introduktion',
    slug:     'introduktion',
    platform: 'styrelsekorkortet',
    category: 'GRUNDERNA',
    title:    'Introduktion till Styrelsekörkortet',
    subtitle: 'Styrelsen, valbarhetsregler och aktuella lagändringar 2023–2027',
    short_description: 'Kom igång rätt – lär dig vad styrelsen är, vem som får sitta i den och vilka lagar som ändrats.',
    long_description:  'Grundläggande introduktion till BRF-styrelsens uppdrag, sammansättning och valbarhetsregler.',
    image_url:       'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '1.5 timmar',
    lessons:      8,
    videoLessons: 0,
    quizzes:      0,
    rating:       5.0,
    students:     0,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    isTrial:      true,
    component:    Module0Introduktion,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Styrelsens uppdrag och sammansättning',
      'Vem som är valbar och vem som inte är det',
      'Rösträtten – en röst per lägenhet (2023)',
      'K2 → K3-övergången i redovisning (2026)',
      'Moms på el, vatten och parkering',
      'Obligatorisk matavfallssortering (2024)',
      'Fastighetsnära förpackningsinsamling (2027)',
    ],
    modules: [
      { title: 'Vad är styrelsen?',               duration: '15 min', free: true  },
      { title: 'Vem får sitta i styrelsen?',      duration: '15 min', free: true  },
      { title: 'Rösträtt – en röst per lägenhet', duration: '15 min', free: false },
      { title: 'K2 → K3-övergången',              duration: '20 min', free: false },
      { title: 'Moms på el, vatten & parkering',  duration: '15 min', free: false },
      { title: 'Sopor och miljörum 2024–2027',    duration: '15 min', free: false },
      { title: 'Checklista & nästa steg',         duration: '10 min', free: false },
    ],
    forWho: [
      'Helt nya styrelseledamöter',
      'Föreningar som vill ha koll på aktuella lagkrav',
      'Ordföranden som vill uppdatera hela styrelsens kunskap',
    ],
    testimonials: [],
  },

  {
    id:       'bostadsrattsforeningen',
    slug:     'bostadsrattsforeningen',
    platform: 'styrelsekorkortet',
    category: 'JURIDIK',
    title:    'Bostadsrättsföreningen',
    subtitle: 'Förstå hur föreningen fungerar – från stadgar till beslut',
    short_description: 'Lär dig allt om hur en bostadsrättsförening fungerar.',
    long_description:  'En komplett introduktion till bostadsrättsföreningen - vad den är, hur den styrs och vilka regler som gäller.',
    image_url:       'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720',
    previewVideoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    duration:     '2 timmar',
    lessons:      8,
    videoLessons: 2,
    quizzes:      1,
    rating:       4.9,
    students:     450,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    Bostadsrattsforeningen,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Förstå vad en bostadsrättsförening är',
      'Lära dig om medlemskap och rättigheter',
      'Få kunskap om stadgar och regler',
      'Förstå föreningens ekonomi',
      'Skillnaden mot hyresrätt och äganderätt',
      'Stämma och styrelsebeslut',
    ],
    modules: [
      { title: 'Vad är en bostadsrättsförening?', duration: '20 min', free: true  },
      { title: 'Stadgar och regler',              duration: '25 min', free: false },
      { title: 'Medlemskap och rättigheter',      duration: '20 min', free: false },
      { title: 'Föreningens ekonomi',             duration: '25 min', free: false },
      { title: 'Föreningsstämman',                duration: '20 min', free: false },
    ],
    forWho: [
      'Nya bostadsrättsägare som vill förstå föreningen',
      'Styrelseledamöter som vill lära sig grunderna',
      'Dig som funderar på att köpa en bostadsrätt',
    ],
    testimonials: [
      { name: 'Sofia B.', role: 'Ny bostadsrättsägare', text: 'Äntligen förstår jag hur allt hänger ihop.', rating: 5 },
    ],
  },

  {
    id:       'gdpr-personuppgifter',
    slug:     'gdpr-personuppgifter',
    platform: 'styrelsekorkortet',
    category: 'JURIDIK',
    title:    'GDPR i föreningen',
    subtitle: 'Hantera personuppgifter rätt – skydda medlemmarna och föreningen',
    short_description: 'Lär dig om GDPR och hur bostadsrättsföreningar ska hantera personuppgifter.',
    long_description:  'Komplett guide till GDPR-regler för bostadsrättsföreningar.',
    image_url:       'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      9,
    videoLessons: 1,
    quizzes:      2,
    rating:       4.9,
    students:     420,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    Module3Gdpr,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Förstå GDPR och dataskyddsförordningen',
      'Hantera personuppgifter korrekt i föreningen',
      'Registerföring och dokumentation',
      'Medlemmars rättigheter enligt GDPR',
      'Kameraövervakning – vad är tillåtet?',
      'Privacy by Design i praktiken',
    ],
    modules: [
      { title: 'Introduktion till GDPR', duration: '20 min', free: true  },
      { title: 'Personuppgifter i BRF',  duration: '25 min', free: false },
      { title: 'Rättsliga grunder',      duration: '20 min', free: false },
      { title: 'Kameraövervakning',      duration: '25 min', free: false },
      { title: 'Privacy by Design',      duration: '20 min', free: false },
      { title: 'Slutprov & certifikat',  duration: '15 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter som hanterar medlemsregister',
      'Föreningar som vill undvika GDPR-böter',
      'Kassörer och sekreterare med tillgång till personuppgifter',
    ],
    testimonials: [
      { name: 'Erik S.', role: 'Kassör BRF Linden', text: 'Mycket tydlig genomgång av vad vi faktiskt måste göra.', rating: 5 },
    ],
  },

  {
    id:       'diskrimineringslagen',
    slug:     'diskrimineringslagen',
    platform: 'styrelsekorkortet',
    category: 'JURIDIK',
    title:    'Diskrimineringslagen',
    subtitle: 'Förstå lagen och styrelsens ansvar för en rättvis förening',
    short_description: 'Förstå diskrimineringslagen och hur den tillämpas i bostadsrättsföreningar.',
    long_description:  'Lär dig om de sju diskrimineringsgrunderna, direkt och indirekt diskriminering samt styrelsens ansvar.',
    image_url:       'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      8,
    videoLessons: 1,
    quizzes:      2,
    rating:       4.8,
    students:     380,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    Module4Diskriminering,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'De sju diskrimineringsgrunderna',
      'Direkt vs indirekt diskriminering',
      'Trakasserier och sexuella trakasserier',
      'Styrelsens ansvar och åtgärder',
      'Hur ni förebygger diskriminering',
      'Vad händer vid en anmälan?',
    ],
    modules: [
      { title: 'Vad är diskriminering?',  duration: '20 min', free: true  },
      { title: 'De sju grunderna',        duration: '25 min', free: false },
      { title: 'Styrelsens skyldigheter', duration: '20 min', free: false },
      { title: 'Förebyggande arbete',     duration: '20 min', free: false },
      { title: 'Slutprov',                duration: '15 min', free: false },
    ],
    forWho: [
      'Alla styrelseledamöter',
      'Ordföranden som hanterar konflikter',
      'Föreningar som vill arbeta aktivt med inkludering',
    ],
    testimonials: [
      { name: 'Lena M.', role: 'Vice ordförande BRF Björken', text: 'Öppnade mina ögon för hur viktigt det här är.', rating: 5 },
    ],
  },

  {
    id:       'ai-brf-styrelsen',
    slug:     'ai-brf-styrelsen',
    platform: 'styrelsekorkortet',
    category: 'LEDARSKAP',
    title:    'AI för BRF-styrelsen',
    subtitle: 'Spara tid, fatta bättre beslut och känn dig trygg med AI',
    short_description: 'Lär dig använda AI i styrelsearbetet – protokoll, kommunikation och beslutsunderlag.',
    long_description:  'Praktisk kurs i AI för BRF-styrelser. Inga förkunskaper krävs.',
    image_url:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '3 timmar',
    lessons:      10,
    videoLessons: 0,
    quizzes:      1,
    rating:       5.0,
    students:     0,
    price:        4500,
    priceTeam:    'Fast pris per styrelse – alla ledamöter ingår',
    isTrial:      false,
    component:    Module5AiBrf,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Vad AI är – och vad det inte är',
      'Spara tid med AI i styrelsearbetet',
      'Välj rätt verktyg: ChatGPT, Claude eller Copilot',
      'Lär dig prompta – få svar som faktiskt fungerar',
      'Protokoll på 10 minuter istället för en timme',
      'Kommunicera professionellt med dina medlemmar',
      'Ta fram bättre beslutsunderlag – snabbare',
      'AI som bollplank vid upphandling och juridik',
    ],
    modules: [
      { title: 'Vad är AI?',                  duration: '20 min', free: true  },
      { title: 'Spara tid med AI',            duration: '20 min', free: false },
      { title: 'Välj rätt verktyg',           duration: '20 min', free: false },
      { title: 'Lär dig prompta',             duration: '25 min', free: false },
      { title: 'Protokoll på 10 minuter',     duration: '20 min', free: false },
      { title: 'Kommunikation med medlemmar', duration: '20 min', free: false },
      { title: 'Beslutsunderlag',             duration: '20 min', free: false },
      { title: 'Upphandling & juridik',       duration: '20 min', free: false },
      { title: 'Kunskapstest',                duration: '15 min', free: false },
    ],
    forWho: [
      'BRF-styrelser som vill arbeta smartare',
      'Sekreterare som skriver protokoll',
      'Ordföranden som kommunicerar med medlemmar',
      'Kassörer som tar fram beslutsunderlag',
      'Alla som är nyfikna på AI men inte vet var man börjar',
    ],
    testimonials: [],
  },

  {
    id:       'foreningens-principer',
    slug:     'foreningens-principer',
    platform: 'styrelsekorkortet',
    category: 'GRUNDERNA',
    title:    'Föreningens olika principer',
    subtitle: 'Demokrati, transparens och likställdhet – grunderna för en välskött förening',
    short_description: 'Lär dig de grundläggande principerna för hur en förening ska drivas.',
    long_description:  'Genomgång av demokrati, likställdhet, transparens och andra viktiga principer.',
    image_url:       'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '1.5 timmar',
    lessons:      7,
    videoLessons: 1,
    quizzes:      1,
    rating:       4.7,
    students:     290,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Demokratiprincipen',
      'Likställdhet och rättvisa',
      'Transparens och öppenhet',
      'Medlemmarnas rättigheter',
    ],
    modules: [
      { title: 'Demokratiprincipen',       duration: '20 min', free: true  },
      { title: 'Likställdhet',             duration: '20 min', free: false },
      { title: 'Transparens',              duration: '20 min', free: false },
      { title: 'Medlemmarnas rättigheter', duration: '20 min', free: false },
    ],
    forWho: [
      'Nya styrelseledamöter',
      'Föreningar som vill stärka demokratin',
    ],
    testimonials: [],
  },

  {
    id:       'styrelsens-dokumentation',
    slug:     'styrelsens-dokumentation',
    platform: 'styrelsekorkortet',
    category: 'ADMINISTRATION',
    title:    'Styrelsens dokumentation',
    subtitle: 'Protokoll, kallelser och arkivering – gör det rätt från start',
    short_description: 'Lär dig hur styrelsen dokumenterar möten och beslut korrekt.',
    long_description:  'Allt om protokoll, kallelser, beslutsunderlag och hur dokumentation ska arkiveras.',
    image_url:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      9,
    videoLessons: 2,
    quizzes:      1,
    rating:       4.9,
    students:     410,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    ModuleDokumentation,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Skriva korrekta protokoll',
      'Kallelser och dagordningar',
      'Arkivering och dokumenthantering',
      'Digitala verktyg för dokumentation',
    ],
    modules: [
      { title: 'Protokollets struktur',    duration: '20 min', free: true  },
      { title: 'Kallelser och dagordning', duration: '20 min', free: false },
      { title: 'Arkivering',              duration: '20 min', free: false },
      { title: 'Digitala verktyg',        duration: '20 min', free: false },
    ],
    forWho: [
      'Sekreterare i styrelsen',
      'Ordföranden som ansvarar för dokumentation',
    ],
    testimonials: [
      { name: 'Peter A.', role: 'Sekreterare BRF Kastanjen', text: 'Sparar mig massor av tid nu när jag vet hur det ska göras.', rating: 5 },
    ],
  },

  {
    id:       'foreningens-intressenter',
    slug:     'foreningens-intressenter',
    platform: 'styrelsekorkortet',
    category: 'KOMMUNIKATION',
    title:    'Föreningens intressenter',
    subtitle: 'Bygg bra relationer med medlemmar, myndigheter och leverantörer',
    short_description: 'Förstå och hantera relationer med föreningens olika intressenter.',
    long_description:  'Lär dig om medlemmar, myndigheter, leverantörer och andra viktiga intressenter.',
    image_url:       'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '1.5 timmar',
    lessons:      6,
    videoLessons: 1,
    quizzes:      1,
    rating:       4.6,
    students:     320,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    ModuleIntressenter,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Identifiera viktiga intressenter',
      'Kommunikation med medlemmar',
      'Hantera myndighetskontakter',
      'Samarbete med leverantörer',
    ],
    modules: [
      { title: 'Vilka är intressenterna?',    duration: '20 min', free: true  },
      { title: 'Kommunikation med medlemmar', duration: '20 min', free: false },
      { title: 'Myndigheter och lag',         duration: '20 min', free: false },
      { title: 'Leverantörsrelationer',       duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som kommunicerar utåt',
      'Styrelseledamöter med kontaktansvar',
    ],
    testimonials: [],
  },

  {
    id:       'arsredovisningen',
    slug:     'arsredovisningen',
    platform: 'styrelsekorkortet',
    category: 'EKONOMI',
    title:    'Årsredovisningen',
    subtitle: 'Läs och förstå föreningens årsredovisning – resultat, balans och nyckeltal',
    short_description: 'Förstå och tolka bostadsrättsföreningens årsredovisning.',
    long_description:  'Lär dig läsa resultaträkning, balansräkning och förvaltningsberättelse.',
    image_url:       'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2.5 timmar',
    lessons:      10,
    videoLessons: 2,
    quizzes:      2,
    rating:       4.7,
    students:     390,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    Module2Arsredovisning,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Läsa resultaträkningen',
      'Förstå balansräkningen',
      'Tolka nyckeltal',
      'Förvaltningsberättelsen',
      'Revisionsberättelsen',
      'Jämföra med tidigare år',
    ],
    modules: [
      { title: 'Årsredovisningens struktur', duration: '20 min', free: true  },
      { title: 'Resultaträkningen',          duration: '25 min', free: false },
      { title: 'Balansräkningen',            duration: '25 min', free: false },
      { title: 'Nyckeltal',                  duration: '20 min', free: false },
      { title: 'Förvaltningsberättelsen',    duration: '20 min', free: false },
    ],
    forWho: [
      'Kassörer och styrelseledamöter',
      'Alla som ska godkänna årsredovisningen på stämman',
    ],
    testimonials: [
      { name: 'Johan P.', role: 'Kassör BRF Almarna', text: 'Förstår äntligen vad alla siffror betyder.', rating: 5 },
    ],
  },

  {
    id:       'hallbarhet',
    slug:     'hallbarhet',
    platform: 'styrelsekorkortet',
    category: 'FÖRVALTNING',
    title:    'Hållbarhet i föreningen',
    subtitle: 'Solceller, laddstolpar, energi och ROI – en grönare förening som lönar sig',
    short_description: 'Lär dig om hållbarhetsinvesteringar och hur ni räknar hem dem.',
    long_description:  'Solceller, laddstolpar, uppvärmning, energieffektivisering, vatten och avfall – med fokus på ROI.',
    image_url:       'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      8,
    videoLessons: 0,
    quizzes:      0,
    rating:       5.0,
    students:     0,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    ModuleHallbarhet,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Solceller – ROI, skattereduktion och processen',
      'Laddstolpar – infrastruktur och finansiering',
      'Uppvärmning – bergvärme, värmepumpar och EPBD',
      'Energieffektivisering – LED, fönster och FTX',
      'Vatten och stambyte – relining och IMD',
      'Avfallskrav 2024 och 2027',
      'ROI-kalkyl och bidragsöversikt',
    ],
    modules: [
      { title: 'Solceller',             duration: '20 min', free: true  },
      { title: 'Laddstolpar',           duration: '20 min', free: false },
      { title: 'Uppvärmning',           duration: '20 min', free: false },
      { title: 'Energieffektivisering', duration: '15 min', free: false },
      { title: 'Vatten & avlopp',       duration: '15 min', free: false },
      { title: 'Avfall & miljö',        duration: '15 min', free: false },
      { title: 'ROI & Finansiering',    duration: '20 min', free: false },
    ],
    forWho: [
      'Styrelser som planerar energiinvesteringar',
      'Kassörer som ska räkna hem ett projekt',
      'Föreningar med gamla stammar eller otidsenlig uppvärmning',
    ],
    testimonials: [],
  },

  {
    id:       'konflikthantering',
    slug:     'konflikthantering',
    platform: 'styrelsekorkortet',
    category: 'LEDARSKAP',
    title:    'Konflikthantering',
    subtitle: 'Förebygg, identifiera och lös konflikter i föreningen professionellt',
    short_description: 'Lär dig hantera och lösa konflikter i föreningen professionellt.',
    long_description:  'Praktiska verktyg och tekniker för att förebygga, identifiera och lösa konflikter.',
    image_url:       'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      8,
    videoLessons: 2,
    quizzes:      1,
    rating:       4.8,
    students:     350,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Identifiera konflikter tidigt',
      'Medlingsteknik och kommunikation',
      'Konfliktlösningsmodeller',
      'Förebyggande arbete',
    ],
    modules: [
      { title: 'Vad är en konflikt?', duration: '20 min', free: true  },
      { title: 'Tidiga signaler',     duration: '20 min', free: false },
      { title: 'Medlingsteknik',      duration: '25 min', free: false },
      { title: 'Förebygga konflikter', duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som hanterar konflikter',
      'Hela styrelsen för bättre samarbete',
    ],
    testimonials: [],
  },

  {
    id:       'fatta-ratt-beslut',
    slug:     'fatta-ratt-beslut',
    platform: 'styrelsekorkortet',
    category: 'LEDARSKAP',
    title:    'Fatta rätt beslut',
    subtitle: 'Strukturerad beslutsfattning med rätt underlag och process',
    short_description: 'Lär dig strukturerad beslutsfattande och beslutsunderlag.',
    long_description:  'Metoder och verktyg för att fatta välgrundade beslut i styrelsearbetet.',
    image_url:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      7,
    videoLessons: 1,
    quizzes:      1,
    rating:       4.8,
    students:     310,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Beslutsprocessen steg-för-steg',
      'Riskanalys och konsekvenser',
      'Beslutsunderlag och dokumentation',
      'Gruppbeslut vs individuella beslut',
    ],
    modules: [
      { title: 'Beslutsprocessen', duration: '25 min', free: true  },
      { title: 'Riskanalys',       duration: '25 min', free: false },
      { title: 'Beslutsunderlag',  duration: '20 min', free: false },
      { title: 'Gruppdynamik',     duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som leder beslutsmöten',
      'Hela styrelsen för bättre beslut',
    ],
    testimonials: [],
  },

  {
    id:       'effektivt-styrelsearbete',
    slug:     'effektivt-styrelsearbete',
    platform: 'styrelsekorkortet',
    category: 'LEDARSKAP',
    title:    'Effektivt styrelsearbete',
    subtitle: 'Optimera möten, delegera rätt och få mer gjort på kortare tid',
    short_description: 'Optimera styrelsens arbete för bättre resultat och effektivitet.',
    long_description:  'Praktiska tips och metoder för att göra styrelsearbetet mer effektivt och produktivt.',
    image_url:       'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '1.5 timmar',
    lessons:      6,
    videoLessons: 1,
    quizzes:      1,
    rating:       4.9,
    students:     440,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Effektiva styrelsemöten',
      'Tidsplanering och prioritering',
      'Delegering och uppföljning',
      'Digitala verktyg för styrelsen',
    ],
    modules: [
      { title: 'Effektiva möten', duration: '20 min', free: true  },
      { title: 'Tidsplanering',   duration: '20 min', free: false },
      { title: 'Delegering',      duration: '20 min', free: false },
      { title: 'Digitala verktyg', duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som vill effektivisera mötena',
      'Styrelseledamöter som vill bidra mer',
    ],
    testimonials: [],
  },

  {
    id:       'fastigheten',
    slug:     'fastigheten',
    platform: 'styrelsekorkortet',
    category: 'FÖRVALTNING',
    title:    'Fastigheten',
    subtitle: 'Underhållsplanering, energieffektivisering och fastighetsskötsel',
    short_description: 'Lär dig om fastighetsförvaltning och underhåll.',
    long_description:  'Allt om underhållsplanering, energieffektivisering, renovering och fastighetens skötsel.',
    image_url:       'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '3 timmar',
    lessons:      11,
    videoLessons: 3,
    quizzes:      2,
    rating:       4.8,
    students:     370,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Underhållsplan och stambyten',
      'Energieffektivisering',
      'Fastighetsskötsel och drift',
      'Större renoveringsprojekt',
    ],
    modules: [
      { title: 'Underhållsplanering',          duration: '25 min', free: true  },
      { title: 'Stambyten och renoveringar',   duration: '30 min', free: false },
      { title: 'Energieffektivisering',        duration: '25 min', free: false },
      { title: 'Löpande drift',                duration: '25 min', free: false },
      { title: 'Upphandling av entreprenörer', duration: '25 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter med fastighetsansvar',
      'Ordföranden som planerar underhåll',
    ],
    testimonials: [],
  },

  {
    id:       'forhandlingsteknik-upphandling',
    slug:     'forhandlingsteknik-upphandling',
    platform: 'styrelsekorkortet',
    category: 'ADMINISTRATION',
    title:    'Förhandlingsteknik & Upphandling',
    subtitle: 'Förhandla bättre och upphandla rätt – spara pengar och få bättre avtal',
    short_description: 'Lär dig professionell förhandlingsteknik och upphandlingsprocess.',
    long_description:  'Praktiska verktyg för framgångsrika förhandlingar och korrekt upphandling.',
    image_url:       'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2.5 timmar',
    lessons:      9,
    videoLessons: 2,
    quizzes:      2,
    rating:       4.9,
    students:     330,
    price:        1490,
    priceTeam:    'Volymrabatt från 2 licenser',
    component:    null,
    instructor:   INSTRUCTOR_BRF,
    learningPoints: [
      'Förhandlingsstrategier och taktik',
      'Upphandlingsprocessen',
      'Kontraktsförhandling',
      'Leverantörsutvärdering',
    ],
    modules: [
      { title: 'Förhandlingens grunder',  duration: '25 min', free: true  },
      { title: 'Förhandlingstaktik',      duration: '25 min', free: false },
      { title: 'Upphandlingsprocessen',   duration: '25 min', free: false },
      { title: 'Kontraktsförhandling',    duration: '25 min', free: false },
      { title: 'Leverantörsutvärdering',  duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som förhandlar med leverantörer',
      'Styrelseledamöter med inköpsansvar',
    ],
    testimonials: [],
  },
];

// ════════════════════════════════════════════════════════════════════════════
// KURSER – NÄRINGSKLIVET
// ════════════════════════════════════════════════════════════════════════════
const NARINGSKLIVET_COURSES: Course[] = [
  {
    id:       'ai-arbetslivet',
    slug:     'ai-arbetslivet',
    platform: 'naringsklivet',
    category: 'AI & PRODUKTIVITET',
    title:    'AI i arbetslivet',
    subtitle: 'Från nybörjare till säker AI-användare – praktisk kurs för hela organisationen',
    short_description: 'Lär dig använda AI-verktyg effektivt på jobbet. Ingen förkunskap krävs.',
    long_description:  'Praktisk kurs som täcker LLM-grunder, FAKTAP-modellen för prompt engineering, användningsområden och säker AI-hantering. Fungerar med ChatGPT, Claude, Gemini och Copilot.',
    image_url:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&h=720',
    previewVideoUrl: null,
    duration:     '2 timmar',
    lessons:      13,
    videoLessons: 0,
    quizzes:      4,
    rating:       5.0,
    students:     0,
    price:        1990,
    priceTeam:    'Volymrabatt från 5 licenser',
    isTrial:      true,
    component:    ModuleAIGrunderna,
    instructor:   INSTRUCTOR_NK,
    learningPoints: [
      'Hur stora språkmodeller (LLM) fungerar',
      'Skillnaden mellan ChatGPT, Claude, Gemini och Copilot',
      'FAKTAP-modellen för kraftfulla promptar',
      'Praktiska användningsområden: mejl, rapporter, möten, data',
      'Källkritik och säker AI-användning',
      'Avancerade tekniker: Chain-of-Thought, few-shot, iteration',
      'Vad du aldrig ska skriva till en AI (GDPR)',
      'Certifiering som AI Prompt Engineer',
    ],
    modules: [
      { title: 'Introduktion',              duration: '10 min', free: true  },
      { title: 'Hur AI fungerar',           duration: '15 min', free: true  },
      { title: 'AI-verktygens landskap',    duration: '10 min', free: false },
      { title: '🧠 Kunskapstest 1',         duration: '5 min',  free: false },
      { title: 'FAKTAP-modellen',           duration: '15 min', free: false },
      { title: 'FAKTAP i praktiken',        duration: '10 min', free: false },
      { title: '🧠 Kunskapstest 2',         duration: '5 min',  free: false },
      { title: 'Användningsområden',        duration: '20 min', free: false },
      { title: '🧠 Kunskapstest 3',         duration: '5 min',  free: false },
      { title: 'Säker AI-användning',       duration: '15 min', free: false },
      { title: 'Avancerade tekniker',       duration: '15 min', free: false },
      { title: '🧠 Kunskapstest 4',         duration: '5 min',  free: false },
      { title: '🎯 Sluttest & certifikat',  duration: '10 min', free: false },
    ],
    forWho: [
      'Anställda som vill spara tid med AI i vardagen',
      'Chefer och projektledare som vill fatta bättre beslut',
      'Marknadsförare och kommunikatörer',
      'Administratörer och ekonomer',
      'Alla som är nyfikna men inte vet var man börjar',
    ],
    testimonials: [],
  },

  // ── Platshållare för kommande Näringsklivet-kurser ──────────────────────
  // Lägg till fler kurser här med platform: 'naringsklivet'
];

// ════════════════════════════════════════════════════════════════════════════
// EXPORT – sammanslagen array
// ════════════════════════════════════════════════════════════════════════════
export const coursesData: Course[] = [
  ...STYRELSEKORKORTET_COURSES,
  ...NARINGSKLIVET_COURSES,
];

// ── Hjälpfunktioner (samma API som gamla modules2.jsx) ───────────────────────

/** Hämta en kurs baserat på slug – används av CoursePage */
export const getCourseBySlug = (slug: string): Course | undefined =>
  coursesData.find(c => c.slug === slug);

/** Bakåtkompatibelt alias – används där getModuleBySlug importeras */
export const getModuleBySlug = getCourseBySlug;

/** Filtrera per plattform */
export const getCoursesByPlatform = (platform: Platform): Course[] =>
  coursesData.filter(c => c.platform === platform);

/** Filtrera per kategori (inom valfri plattform) */
export const getCoursesByCategory = (
  category: string,
  platform?: Platform,
): Course[] => {
  const base = platform ? getCoursesByPlatform(platform) : coursesData;
  return category === 'ALLA' ? base : base.filter(c => c.category === category);
};

// ── Kategorier per plattform ─────────────────────────────────────────────────
export const CATEGORIES_BRF = [
  'ALLA', 'GRUNDERNA', 'STYRELSEN', 'JURIDIK',
  'ADMINISTRATION', 'KOMMUNIKATION', 'LEDARSKAP', 'EKONOMI', 'FÖRVALTNING',
] as const;

export const CATEGORIES_NK = [
  'ALLA', 'AI & PRODUKTIVITET',
] as const;

/** Bakåtkompatibelt alias */
export const categories = CATEGORIES_BRF;