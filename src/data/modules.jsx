import HTMLModule from '../modules/HTMLModule';
import DiskrimineringModule from '../modules/DiskrimineringModule';
import ai1 from '../modules/ai1'; 

export const modulesData = [
  {
    id: 'html-grundkurs',
    slug: 'html-grundkurs',
    title: 'HTML Grundkurs',
    category: 'HTML',
    short_description: 'Lär dig grunderna i HTML och bygg din första webbsida från grunden.',
    long_description: 'En komplett introduktion till HTML där du lär dig allt från grundläggande taggar till semantisk HTML och tillgänglighet. Perfekt för nybörjare!',
    image_url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1280&h=720',
    author: 'Erik Andersson',
    logo_url: 'https://ui-avatars.com/api/?name=Erik+Andersson&background=FF5421&color=fff',
    
    duration: '3 timmar',
    level: 'Nybörjare',
    lessons: 12,
    videoLessons: 3,
    quizzes: 2,
    
    rating: 4.8,
    students: 1250,
    
    previewVideoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    
    component: HTMLModule,
    
    learningPoints: [
      'Grundläggande HTML-struktur',
      'Semantiska element',
      'Formulär och tabeller',
      'Tillgänglighet och best practices'
    ]
  },
  {
    id: 'ai-grunderna',
    slug: 'ai-grunderna',
    title: 'AI-Grunderna för Företag',
    category: 'AI',
    short_description: 'Lär dig grunderna i artificiell intelligens och hur AI kan transformera ditt företag.',
    long_description: 'En komplett introduktion till AI för företagare och beslutsfattare. Ingen teknisk bakgrund krävs! Lär dig vad AI är, hur det fungerar och konkreta användningsområden för ditt företag.',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1280&h=720',
    author: 'AI Expert',
    logo_url: 'https://ui-avatars.com/api/?name=AI+Expert&background=8B5CF6&color=fff',
    duration: '1.5 timmar',
    level: 'Nybörjare',
    lessons: 9,
    videoLessons: 1,
    quizzes: 3,
    rating: 5.0,
    students: 0,
    previewVideoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    component: ai1,
    learningPoints: [
      'Förstå vad AI är i enkla termer',
      'Skillnaden mellan AI och traditionell programmering',
      'AI i vardagen - konkreta exempel',
      'Machine Learning basics',
      'Hur AI kan transformera företag'
    ]
  },
  {
    id: 'diskriminering-brf',
    slug: 'diskriminering-brf',
    title: 'Diskriminering i Bostadsrättsföreningar',
    category: 'JURIDIK', // eller annan passande kategori
    short_description: 'Lär dig om diskrimineringslagen och hur du förebygger diskriminering i din BRF.',
    long_description: 'En komplett utbildning om de sju diskrimineringsgrunderna, direkt och indirekt diskriminering, trakasserier och styrelsens ansvar i bostadsrättsföreningar.',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&h=720', // Välj en passande bild
    author: 'Juridisk Expert',
    logo_url: 'https://ui-avatars.com/api/?name=Juridisk+Expert&background=F59E0B&color=fff',
    duration: '2 timmar',
    level: 'Nybörjare',
    lessons: 8,
    videoLessons: 0,
    quizzes: 1,
    rating: 4.9,
    students: 0,
    previewVideoUrl: null,
    component: DiskrimineringModule, // ✅ Koppla till din komponent
    learningPoints: [
      'Förstå de sju diskrimineringsgrunderna',
      'Känna igen direkt och indirekt diskriminering',
      'Identifiera trakasserier och sexuella trakasserier',
      'Förstå vad repressalier innebär',
      'Kunna agera korrekt vid misstänkt diskriminering'
    ]
  },
    {
    id: 'css-styling',
    slug: 'css-styling',
    title: 'CSS Styling & Layout',
    category: 'CSS',
    short_description: 'Behärska CSS och skapa vackra, responsiva webbdesigner.',
    long_description: 'Lär dig allt om CSS från grunden - färger, typografi, Flexbox, Grid och responsiv design.',
    image_url: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=1280&h=720',
    author: 'Maria Svensson',
    logo_url: 'https://ui-avatars.com/api/?name=Maria+Svensson&background=0EA5E9&color=fff',
    
    duration: '4 timmar',
    level: 'Nybörjare',
    lessons: 15,
    videoLessons: 4,
    quizzes: 3,
    
    rating: 4.9,
    students: 980,
    
    previewVideoUrl: null,
    component: null,
    
    learningPoints: [
      'CSS-syntax och selektorer',
      'Flexbox och Grid',
      'Responsiv design',
      'Animationer och övergångar'
    ]
  },
];

export const getModuleBySlug = (slug) => {
  return modulesData.find(module => module.slug === slug);
};

export const getModulesByCategory = (category) => {
  if (category === 'ALLA') return modulesData;
  return modulesData.filter(module => module.category === category);
};

export const categories = ['ALLA', 'AI','HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'PYTHON'];