// src/modules/Naringsklivet/ModuleTedAI.tsx
// Gratiskurs: TED Talks om AI och framtiden
// Typ: free | 4 videos + reflektion

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import { SlideG, SlideC, Ingress, InfoBox } from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

const FAQ = [
  { question: 'Måste jag titta på alla videos?', answer: 'Nej — välj de som intresserar dig mest. Varje TED Talk är fristående.' },
  { question: 'Kan jag pausa och fortsätta senare?', answer: 'Ja, din progress sparas automatiskt.' },
  { question: 'Är det här kursen gratis?', answer: 'Ja, helt gratis. Ingen registrering krävs.' },
];

const ModuleTedAI: React.FC = () => {
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

  const allDone = ['ted-1','ted-2','ted-3','ted-4'].every(id => completedLessons.has(id));

  const slides = [
    {
      id: 'intro',
      title: 'Välkommen',
      component: (
        <SlideC
          bild="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&q=80"
          bildHöjd="40%"
          badge="TED Talks · AI & Framtiden · Gratis"
          title="De bästa TED Talks om <span style='color:#FF5421'>AI</span>"
        >
          <Ingress>
            Fyra av världens mest visade TED Talks om artificiell intelligens — utvalda för dig som vill förstå vad AI egentligen innebär för samhälle, arbete och framtid.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              'Ca 60 minuter totalt — titta i din egen takt',
              'Fyra talare, fyra perspektiv på AI',
              'Reflektionsfråga efter varje talk',
              'Helt gratis — ingen registrering',
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
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentIndex(1)}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
            Starta →
          </motion.button>
        </SlideC>
      ),
    },
    {
      id: 'ted-1',
      title: '🎬 Sam Gregory — AI & Manipulation',
      component: (
        <SlideG
          videoId="t4kyRyAsn3s"
          badge="TED Talk 1 av 4"
          title="The wonderful and terrifying implications of computers that can learn"
          speaker="Jeremy Howard · TED2014"
          duration="20 min"
          desc="En av de mest visade TED Talks om maskininlärning. Jeremy Howard förklarar på ett enkelt sätt hur datorer lär sig — och vad det kan innebära för mänskligheten."
          onComplete={() => handleComplete('ted-1')}
          isDone={completedLessons.has('ted-1')}
        />
      ),
    },
    {
      id: 'ted-2',
      title: '🎬 Kai-Fu Lee — AI & Jobben',
      component: (
        <SlideG
          videoId="ajGgd9Ld-Wc"
          badge="TED Talk 2 av 4"
          title="How AI can save our humanity"
          speaker="Kai-Fu Lee · TED2018"
          duration="15 min"
          desc="Kai-Fu Lee, en av världens ledande AI-experter, argumenterar för att AI inte ska ses som ett hot — utan som en möjlighet att återuppväcka det som gör oss mänskliga."
          onComplete={() => handleComplete('ted-2')}
          isDone={completedLessons.has('ted-2')}
        />
      ),
    },
    {
      id: 'ted-3',
      title: '🎬 Cédric Villani — Matematiken bakom AI',
      component: (
        <SlideG
          videoId="5b5RYHG_5qI"
          badge="TED Talk 3 av 4"
          title="What's so sexy about math?"
          speaker="Cédric Villani · TED2016"
          duration="13 min"
          desc="Nobelpristagaren Cédric Villani om skönheten i matematiken — och hur den driver fram AI:ns kraftfullaste genombrott."
          onComplete={() => handleComplete('ted-3')}
          isDone={completedLessons.has('ted-3')}
        />
      ),
    },
    {
      id: 'ted-4',
      title: '🎬 Tristan Harris — Teknikens makt',
      component: (
        <SlideG
          videoId="C74amJRp730"
          badge="TED Talk 4 av 4"
          title="How a handful of tech companies control billions of minds every day"
          speaker="Tristan Harris · TED2017"
          duration="17 min"
          desc="Tidigare etikchef på Google berättar hur techbolag designar sina produkter för att ta kontroll över vår uppmärksamhet — och vad vi kan göra åt det."
          onComplete={() => handleComplete('ted-4')}
          isDone={completedLessons.has('ted-4')}
        />
      ),
    },
    {
      id: 'avslut',
      title: '✅ Avslutning',
      component: (
        <SlideC
          bild="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80"
          bildHöjd="30%"
          badge="Sammanfattning"
          title="Vad tar du med dig?"
        >
          <Ingress>
            Du har nu sett fyra av världens mest inflytelserika TED Talks om AI. Varje talare ger ett unikt perspektiv.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { name: 'Jeremy Howard', punkt: 'Maskininlärning förändrar allt — men vi kan styra hur.' },
              { name: 'Kai-Fu Lee', punkt: 'AI frigör oss från rutinarbete och ger tid för mänsklig kontakt.' },
              { name: 'Cédric Villani', punkt: 'Matematiken är vacker — och driver AI:ns framsteg.' },
              { name: 'Tristan Harris', punkt: 'Teknik designas för att fånga vår uppmärksamhet. Var medveten.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-sm font-black flex-shrink-0 w-28" style={{ color: O }}>{item.name}</span>
                <p className="text-sm text-gray-600">{item.punkt}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Din reflektion">
            Välj en insikt från någon av talks:arna och fundera: Hur påverkar det ditt arbete eller vardag?
          </InfoBox>
          {allDone && (
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => alert('Grattis! Du har genomfört kursen.')}
              className="w-full mt-6 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
              <Award className="w-5 h-5" /> Markera kurs som avslutad
            </motion.button>
          )}
        </SlideC>
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
        courseTitle="TED Talks om AI & Framtiden"
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
      <FloatingFAQ faqs={FAQ} title="Frågor om kursen" subtitle="" buttonColor={O} />
    </div>
  );
};

export default ModuleTedAI;