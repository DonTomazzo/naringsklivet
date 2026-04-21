// src/modules/Naringsklivet/ModuleTedProduktivitet.tsx
// Gratiskurs: TED Talks om produktivitet, fokus och välmående
// Typ: free | 4 videos + reflektion

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import SlideSidebar      from '../../components/SlideSidebar';
import { SlideG, SlideC, Ingress, InfoBox } from '../../components/CourseElements/SlideTemplates';

const O  = '#FF5421';
const OD = '#E04619';

const FAQ = [
  { question: 'Måste jag titta på alla videos?', answer: 'Nej — välj de som intresserar dig mest.' },
  { question: 'Är det här kursen gratis?', answer: 'Ja, helt gratis. Ingen registrering krävs.' },
];

const ModuleTedProduktivitet: React.FC = () => {
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
          bild="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1280&q=80"
          bildHöjd="40%"
          badge="TED Talks · Produktivitet & Fokus · Gratis"
          title="De bästa TED Talks om <span style='color:#FF5421'>produktivitet</span>"
        >
          <Ingress>
            Fyra TED Talks som utmanar hur vi tänker kring tid, fokus, motivation och välmående — för dig som vill jobba smartare, inte hårdare.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              'Ca 60 minuter totalt — titta när det passar dig',
              'Forskning som direkt kan förändra dina vanor',
              'Fyra talare med kompletterande perspektiv',
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
      title: '🎬 Cal Newport — Djupt arbete',
      component: (
        <SlideG
          videoId="lgIBmtHi_xg"
          badge="TED Talk 1 av 4"
          title="Beyond Passion: The Science of Loving What You Do"
          speaker="Cal Newport · TEDxDrexel 2012"
          duration="14 min"
          desc="Cal Newport, författaren bakom 'Deep Work', argumenterar mot myten om att följa sin passion — och förklarar istället hur man bygger meningsfullt arbete genom att bli riktigt bra på något."
          onComplete={() => handleComplete('ted-1')}
          isDone={completedLessons.has('ted-1')}
        />
      ),
    },
    {
      id: 'ted-2',
      title: '🎬 Dan Pink — Vad motiverar oss?',
      component: (
        <SlideG
          videoId="rrkrvAUbU9Y"
          badge="TED Talk 2 av 4"
          title="The puzzle of motivation"
          speaker="Dan Pink · TED Global 2009"
          duration="19 min"
          desc="Dan Pink presenterar den kontraintuitiva vetenskapen om motivation — och varför morot-och-piska-modellen inte fungerar för kreativt och kognitivt arbete. En klassiker för alla chefer."
          onComplete={() => handleComplete('ted-2')}
          isDone={completedLessons.has('ted-2')}
        />
      ),
    },
    {
      id: 'ted-3',
      title: '🎬 Matt Cutts — 30-dagarsprojekt',
      component: (
        <SlideG
          videoId="UNP03fDSj1U"
          badge="TED Talk 3 av 4"
          title="Try something new for 30 days"
          speaker="Matt Cutts · TED2011"
          duration="4 min"
          desc="En av de kortaste men mest inspirerande TED Talks. Googles Matt Cutts förklarar hur 30-dagarsprojekt kan hjälpa dig bygga nya vanor och skapa minnen som faktiskt fastnar."
          onComplete={() => handleComplete('ted-3')}
          isDone={completedLessons.has('ted-3')}
        />
      ),
    },
    {
      id: 'ted-4',
      title: '🎬 Kelly McGonigal — Stress som vän',
      component: (
        <SlideG
          videoId="RcGyVTAoXEU"
          badge="TED Talk 4 av 4"
          title="How to make stress your friend"
          speaker="Kelly McGonigal · TED Global 2013"
          duration="15 min"
          desc="Hälsopsykologen Kelly McGonigal presenterar forskning som förändrar hur vi ser på stress — och visar att det inte är stressen i sig som är farlig, utan hur vi tänker om den."
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
          bild="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1280&q=80"
          bildHöjd="30%"
          badge="Sammanfattning"
          title="Vad tar du med dig?"
        >
          <Ingress>
            Fyra perspektiv som tillsammans ger en mer nyanserad bild av hur vi presterar, motiveras och mår på jobbet.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { name: 'Cal Newport', punkt: 'Bli riktigt bra på något — det skapar passion, inte tvärtom.' },
              { name: 'Dan Pink', punkt: 'Autonomi, mästerskap och mening motiverar mer än pengar.' },
              { name: 'Matt Cutts', punkt: '30 dagar räcker för att bygga en ny vana. Börja idag.' },
              { name: 'Kelly McGonigal', punkt: 'Stress är inte farlig om du ser den som energi och engagemang.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-sm font-black flex-shrink-0 w-32" style={{ color: O }}>{item.name}</span>
                <p className="text-sm text-gray-600">{item.punkt}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Din reflektion">
            Vilket av de fyra perspektiven utmanade dig mest? Vad vill du testa under de kommande 30 dagarna?
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
        courseTitle="TED Talks om Produktivitet"
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

export default ModuleTedProduktivitet;