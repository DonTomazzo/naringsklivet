// src/modules/Naringsklivet/ModuleJavaScript.tsx
// Gratiskurs: JavaScript Course for Beginners – Your First Step to Web Development
// Av: Programming with Mosh | YouTube: https://youtu.be/W6NZfCO5SIk

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import {
  SlideG, SlideC, SlideA,
  Ingress, InfoBox, CheckItem, StegRad,
} from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';
const VIDEO_ID = 'W6NZfCO5SIk';

// ── Kursdata (exporteras för naringsklivetData.ts) ────────
export const courseData = {
  learningPoints: [
    'Förstå vad JavaScript är och varför det används',
    'Arbeta med variabler, datatyper och strängar',
    'Skriva if/else-satser och jämförelseoperatorer',
    'Bygga loopar för att upprepa kod',
    'Definiera och anropa funktioner',
    'Förstå objekt och arrays',
    'Hantera DOM och göra webbsidor interaktiva',
    'Felsöka JavaScript-kod i webbläsaren',
  ],
  forWho: [
    'Dig som vill börja med webbutveckling',
    'Dig som kan HTML/CSS och vill ta nästa steg',
    'Alla som vill förstå hur moderna webbsidor fungerar',
    'Nybörjare utan tidigare programmeringskunskaper',
  ],
  modules: [
    { title: 'Kapitel 1 — Intro & Installation', duration: '15 min', free: true },
    { title: 'Kapitel 2 — Variabler och datatyper', duration: '20 min', free: true },
    { title: 'Kapitel 3 — Operatorer och if/else', duration: '20 min', free: true },
    { title: 'Kapitel 4 — Loopar', duration: '15 min', free: true },
    { title: 'Kapitel 5 — Funktioner', duration: '20 min', free: true },
    { title: 'Kapitel 6 — Objekt och Arrays', duration: '25 min', free: true },
  ],
  instructor: {
    name:  'Mosh Hamedani',
    title: 'Software Engineer & Kursledare',
    img:   'https://avatars.githubusercontent.com/u/1613093?v=4',
    bio:   'Mosh Hamedani är en mjukvaruingenjör med över 20 års erfarenhet och en av världens mest populära kodningslärare. Hans kurser har hjälpt miljontals studenter att bli professionella utvecklare. Känd för sin tydliga, strukturerade och praktikorienterade undervisningsstil.',
  },
  faq: [
    { question: 'Behöver jag kunna programmera sedan tidigare?', answer: 'Nej — kursen är designad för absoluta nybörjare. Det hjälper om du känner till grunderna i HTML och CSS men det är inte ett krav.' },
    { question: 'Vad behöver jag installera?', answer: 'Ingenting speciellt — du kan köra JavaScript direkt i webbläsarens konsol. VS Code rekommenderas som editor.' },
    { question: 'Är kursen helt gratis?', answer: 'Ja — Mosh har publicerat hela kursen gratis på YouTube. Vi har strukturerat den i kapitel för dig.' },
    { question: 'Vad kan jag göra efter kursen?', answer: 'Du har grunderna för att börja bygga interaktiva webbsidor och kan sedan gå vidare med React, Node.js eller andra JavaScript-ramverk.' },
  ],
};

// ── Komponent ─────────────────────────────────────────────
const ModuleJavaScript: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Gäst', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const allDone = ['kap-1','kap-2','kap-3','kap-4','kap-5','kap-6']
    .every(id => completedLessons.has(id));

  const slides = [

    // ── Intro ──────────────────────────────────────────────
    {
      id: 'intro',
      title: 'Välkommen',
      component: (
        <SlideC
          bild="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1280&q=80"
          bildHöjd="38%"
          badge="Gratiskurs · Programming with Mosh · JavaScript"
          title="JavaScript för <span style='color:#FF5421'>nybörjare</span>"
        >
          <Ingress>
            JavaScript är webbens språk — det som gör sidor interaktiva och levande. Den här kursen tar dig från noll till att förstå grunderna, med Mosh Hamedani som guide.
          </Ingress>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {courseData.learningPoints.slice(0, 6).map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${O}20` }}>
                  <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
                </div>
                <p className="text-gray-700 text-sm">{p}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 border mb-6"
            style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
              Du behöver bara
            </p>
            <div className="space-y-1.5">
              {[
                'En webbläsare (Chrome rekommenderas)',
                'VS Code — code.visualstudio.com (gratis)',
                'Nyfikenhet och lite tid varje dag',
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 text-white"
                    style={{ background: O }}>{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(1)}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
            Starta kurs →
          </motion.button>
        </SlideC>
      ),
    },

    // ── Kapitel 1 ──────────────────────────────────────────
    {
      id: 'kap-1',
      title: '🌐 Kap 1 — Intro & Setup',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 1 av 6"
          title="Introduktion till JavaScript"
          speaker="Programming with Mosh"
          duration="Första delen"
          desc="Vad är JavaScript och varför är det viktigt? Mosh förklarar hur JavaScript fungerar i webbläsaren och hur du sätter upp din utvecklingsmiljö med VS Code."
          onComplete={() => handleComplete('kap-1')}
          isDone={completedLessons.has('kap-1')}
        />
      ),
    },

    // ── Kapitel 2 ──────────────────────────────────────────
    {
      id: 'kap-2',
      title: '📦 Kap 2 — Variabler',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 2 av 6"
          title="Variabler och datatyper"
          speaker="Programming with Mosh"
          duration="Ca 20 min"
          desc="let, const och var — vad är skillnaden? Strängar, tal, booleans och undefined. Mosh förklarar hur JavaScript hanterar data och varför det spelar roll."
          onComplete={() => handleComplete('kap-2')}
          isDone={completedLessons.has('kap-2')}
        />
      ),
    },

    // ── Kapitel 3 ──────────────────────────────────────────
    {
      id: 'kap-3',
      title: '🔀 Kap 3 — if/else',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 3 av 6"
          title="Operatorer och if/else"
          speaker="Programming with Mosh"
          duration="Ca 20 min"
          desc="Jämförelseoperatorer (===, !==, >, <), logiska operatorer (&&, ||, !) och if/else-satser. Du börjar nu skriva kod som kan fatta beslut."
          onComplete={() => handleComplete('kap-3')}
          isDone={completedLessons.has('kap-3')}
        />
      ),
    },

    // ── Kapitel 4 ──────────────────────────────────────────
    {
      id: 'kap-4',
      title: '🔄 Kap 4 — Loopar',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 4 av 6"
          title="For-loopar och while-loopar"
          speaker="Programming with Mosh"
          duration="Ca 15 min"
          desc="for, while och do-while. Hur du upprepar kod effektivt och undviker att skriva samma sak om och om igen. Praktiska övningar ingår."
          onComplete={() => handleComplete('kap-4')}
          isDone={completedLessons.has('kap-4')}
        />
      ),
    },

    // ── Kapitel 5 ──────────────────────────────────────────
    {
      id: 'kap-5',
      title: '⚙️ Kap 5 — Funktioner',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 5 av 6"
          title="Funktioner"
          speaker="Programming with Mosh"
          duration="Ca 20 min"
          desc="Definiera funktioner, skicka in parametrar och returnera värden. Arrow functions och varför funktioner är grunden för all JavaScript-programmering."
          onComplete={() => handleComplete('kap-5')}
          isDone={completedLessons.has('kap-5')}
        />
      ),
    },

    // ── Kapitel 6 ──────────────────────────────────────────
    {
      id: 'kap-6',
      title: '🗂️ Kap 6 — Objekt & Arrays',
      component: (
        <SlideG
          videoId={VIDEO_ID}
          badge="Kapitel 6 av 6"
          title="Objekt och Arrays"
          speaker="Programming with Mosh"
          duration="Ca 25 min"
          desc="Arrays för listor av data, objekt för att gruppera relaterade värden. forEach, map och filter — de mest användbara verktygen i modern JavaScript."
          onComplete={() => handleComplete('kap-6')}
          isDone={completedLessons.has('kap-6')}
        />
      ),
    },

    // ── Avslutning ─────────────────────────────────────────
    {
      id: 'avslut',
      title: '✅ Nästa steg',
      component: (
        <SlideA
          bild="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1280&q=80"
          badge="Klart! Vad händer nu?"
          title="Du kan nu grunderna i <span style='color:#FF5421'>JavaScript</span>"
        >
          <Ingress>
            Grattis! Du har nu en solid grund i JavaScript. Här är din naturliga väg framåt.
          </Ingress>

          <div className="space-y-3 mb-6">
            <StegRad
              nr="1"
              titel="Bygg något eget"
              desc="En enkel räknare, en to-do-lista eller ett quiz. Det bästa sättet att lära sig är att göra."
            />
            <StegRad
              nr="2"
              titel="Lär dig React"
              desc="React är det mest populära JavaScript-ramverket och nästa naturliga steg efter grunderna."
            />
            <StegRad
              nr="3"
              titel="Utforska Node.js"
              desc="Med Node.js kan du använda JavaScript på servern — och bli en fullstack-utvecklare."
            />
          </div>

          <InfoBox title="Fortsätt med Mosh på YouTube">
            Moshs kanal 'Programming with Mosh' har gratis kurser i React, Node.js, TypeScript och mycket mer. Allt i samma tydliga stil.
          </InfoBox>

          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har slutfört grundkursen i JavaScript.')}
              className="w-full mt-6 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              <Award className="w-5 h-5" /> Markera kurs som avslutad
            </motion.button>
          )}
        </SlideA>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <div className="flex-shrink-0" data-course-header>
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>
      <SlideSidebar
        slides={slides}
        currentIndex={currentIndex}
        completedLessons={completedLessons}
        onNavigate={setCurrentIndex}
        courseTitle="JavaScript för nybörjare — Mosh"
        userName={userData.name}
        onDiplomaDownload={() => alert('Grattis!')}
      />
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
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
        faqs={courseData.faq}
        title="Frågor om JavaScript-kursen"
        subtitle="Vanliga frågor om kursen och JavaScript"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleJavaScript;