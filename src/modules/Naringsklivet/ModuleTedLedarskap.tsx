// src/modules/Naringsklivet/ModuleTedLedarskap.tsx
// Gratiskurs: TED Talks om ledarskap och kommunikation
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
  { question: 'Måste jag titta på alla videos?', answer: 'Nej — välj de som intresserar dig mest. Varje TED Talk är fristående.' },
  { question: 'Är det här kursen gratis?', answer: 'Ja, helt gratis. Ingen registrering krävs.' },
];

const ModuleTedLedarskap: React.FC = () => {
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
          bild="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1280&q=80"
          bildHöjd="40%"
          badge="TED Talks · Ledarskap & Kommunikation · Gratis"
          title="De bästa TED Talks om <span style='color:#FF5421'>ledarskap</span>"
        >
          <Ingress>
            Fyra klassiska TED Talks som förändrat hur vi tänker kring ledarskap, kommunikation och påverkan — utvalda för chefer, teamledare och alla som vill växa.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              'Ca 55 minuter totalt — titta i din egen takt',
              'Fyra världsledande talare om ledarskap',
              'Direkt applicerbart i ditt arbete',
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
      title: '🎬 Simon Sinek — Start With Why',
      component: (
        <SlideG
          videoId="qp0HIF3SfI4"
          badge="TED Talk 1 av 4"
          title="How great leaders inspire action"
          speaker="Simon Sinek · TEDx Puget Sound 2009"
          duration="18 min"
          desc="En av de mest visade TED Talks någonsin. Simon Sinek förklarar varför de mest framgångsrika ledarna och organisationerna alltid börjar med 'varför' — inte 'vad' eller 'hur'."
          onComplete={() => handleComplete('ted-1')}
          isDone={completedLessons.has('ted-1')}
        />
      ),
    },
    {
      id: 'ted-2',
      title: '🎬 Brené Brown — Sårbarhet & Mod',
      component: (
        <SlideG
          videoId="iCvmsMzlF7o"
          badge="TED Talk 2 av 4"
          title="The power of vulnerability"
          speaker="Brené Brown · TEDxHouston 2010"
          duration="20 min"
          desc="Brené Browns genombrott om hur sårbarhet — inte svaghet — är grunden för äkta ledarskap, kreativitet och tillhörighet. En av de mest transformerande TED Talks om mänskliga relationer."
          onComplete={() => handleComplete('ted-2')}
          isDone={completedLessons.has('ted-2')}
        />
      ),
    },
    {
      id: 'ted-3',
      title: '🎬 Amy Cuddy — Kroppsspråk',
      component: (
        <SlideG
          videoId="Ks-_Mh1QhMc"
          badge="TED Talk 3 av 4"
          title="Your body language may shape who you are"
          speaker="Amy Cuddy · TED Global 2012"
          duration="21 min"
          desc="Socialpsykologen Amy Cuddy visar hur ditt kroppsspråk inte bara påverkar hur andra uppfattar dig — utan också hur du uppfattar dig själv. Praktisk och direkt applicerbar forskning."
          onComplete={() => handleComplete('ted-3')}
          isDone={completedLessons.has('ted-3')}
        />
      ),
    },
    {
      id: 'ted-4',
      title: '🎬 Julian Treasure — Tala så att folk lyssnar',
      component: (
        <SlideG
          videoId="eIho2S0ZahI"
          badge="TED Talk 4 av 4"
          title="How to speak so that people want to listen"
          speaker="Julian Treasure · TED Global 2013"
          duration="10 min"
          desc="Ljudexperten Julian Treasure ger sju konkreta verktyg för att tala på ett sätt som folk faktiskt vill lyssna på — avgörande för alla som presenterar, leder möten eller säljer idéer."
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
            Fyra perspektiv på ledarskap som tillsammans ger en stark grund — oavsett om du leder ett team, ett projekt eller dig själv.
          </Ingress>
          <div className="space-y-3 mb-6">
            {[
              { name: 'Simon Sinek', punkt: 'Börja alltid med varför — det inspirerar och skapar lojalitet.' },
              { name: 'Brené Brown', punkt: 'Sårbarhet är mod, inte svaghet. Äkta ledarskap kräver öppenhet.' },
              { name: 'Amy Cuddy', punkt: 'Kroppen påverkar sinnet. Inta utrymme — det ger självförtroende.' },
              { name: 'Julian Treasure', punkt: 'Hur du talar avgör om folk lyssnar. Öva din röst och ditt tempo.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border"
                style={{ background: '#F8F7F4', borderColor: '#e5e5e3' }}>
                <span className="text-sm font-black flex-shrink-0 w-32" style={{ color: O }}>{item.name}</span>
                <p className="text-sm text-gray-600">{item.punkt}</p>
              </div>
            ))}
          </div>
          <InfoBox title="Din reflektion">
            Vilken av de fyra insikterna vill du börja tillämpa redan den här veckan?
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
        courseTitle="TED Talks om Ledarskap"
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

export default ModuleTedLedarskap;