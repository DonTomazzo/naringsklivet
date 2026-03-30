// Module1Dataskydd.tsx
// Dataskyddsutbildning – E.ON-inspirerad design med bildbaserade slides
// Navigation och progress hanteras av ModuleSlideLayout + CourseHeader

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, CheckCircle, X,
  Shield, Eye, Database, Lock, AlertTriangle,
  FileText, Users, Globe, Award
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';

import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import AudioPlayer       from '../../components/AudioPlayer';

// ── Design tokens ─────────────────────────────────────────
const O  = '#FF5421';   // orange primary
const OD = '#E04619';   // orange dark
const OL = '#FFF0EB';   // orange light bg

// ─────────────────────────────────────────────────────────
// SLIDE SHELL – begränsad bredd, vit bakgrund (E.ON-känsla)
// ─────────────────────────────────────────────────────────
const SlideShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-full w-full overflow-y-auto bg-[#f5f5f0] flex items-start justify-center pt-40 pb-20">
    <div className="w-full max-w-5xl px-4 sm:px-8">
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// BILD-SLIDE – fullwidth bild med orange textruta ovanpå
// Inspirerat av E.ON slide 1, 4, 6
// ─────────────────────────────────────────────────────────
const ImageSlide = ({
  img, title, subtitle, children, captionPos = 'bottom', imgHeight = 420
}: {
  img: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  captionPos?: 'top' | 'bottom' | 'overlay';
  imgHeight?: number;
}) => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      {/* Titel ovanför bilden (E.ON-stil) */}
      {(title || subtitle) && (
        <div className="px-5 py-3 bg-white border-b border-gray-100">
          {title && <p className="font-bold text-sm text-gray-800">{title}</p>}
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      )}

      {/* Bild med overlay */}
      <div className="relative" style={{ height: imgHeight }}>
        <img src={img} alt="" className="w-full h-full object-cover" />
        {captionPos === 'overlay' && children && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {children}
          </div>
        )}
        {captionPos === 'top' && children && (
          <div className="absolute top-4 left-4 right-4">{children}</div>
        )}
      </div>

      {/* Text under bilden */}
      {captionPos === 'bottom' && children && (
        <div className="p-5">{children}</div>
      )}
    </div>
  </SlideShell>
);

// Orange textruta (E.ON-stil header-banner)
const OrangeBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-5 py-3 rounded-xl text-white font-semibold text-sm leading-snug ${className}`}
    style={{ background: O }}>
    {children}
  </div>
);

// Vit informationsruta med skugga (de vita rutorna i E.ON-slides)
const InfoCard = ({ children, icon, className = '' }: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-xl shadow-md p-4 flex items-start gap-3 ${className}`}>
    {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
    <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
  </div>
);

// ─────────────────────────────────────────────────────────
// SLIDE 1 – VÄLKOMMEN / INTRO
// Bild med man + budskap (liknande E.ON slide 3)
// ─────────────────────────────────────────────────────────
const Slide1Intro = ({ onStart }: { onStart: () => void }) => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className="relative" style={{ height: 460 }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85"
          alt="Dataskydd intro"
          className="w-full h-full object-cover"
        />
        {/* Halvgenomskinligt mörkt lager vänster */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

        {/* Innehåll */}
        <div className="absolute inset-0 flex items-center p-8 sm:p-12">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} className="max-w-md">

            {/* Modul-badge */}
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
              style={{ background: O }}>
              MODUL 1 · DATASKYDD
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Grunderna för<br />
              <span style={{ color: OL }}>dataskydd</span>
            </h1>

            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Lär dig vad dataskydd innebär, varför det är viktigt och
              vilka regler som gäller för din organisation.
            </p>

            {/* Stats */}
            <div className="flex gap-4 mb-8">
              {[
                { val: '25 min', label: 'Tid' },
                { val: '6', label: 'Avsnitt' },
                { val: 'Certifikat', label: 'Ingår' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-black text-white">{s.val}</p>
                  <p className="text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: O, boxShadow: `0 4px 20px ${O}50` }}>
              Starta utbildningen <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Instruktioner under bilden */}
      <div className="p-5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: '⏱', text: 'Ca 25 minuter' },
          { icon: '⏸', text: 'Pausa när som helst' },
          { icon: '→', text: 'Nästa-knappen för att gå vidare' },
          { icon: '←', text: 'Bakåt-knappen för föregående' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-base flex-shrink-0" style={{ color: O }}>{item.icon}</span>
            <p className="text-xs text-gray-500 leading-snug">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 2 – VAD ÄR DATASKYDD?
// Bild med paragraf-rutor ovanpå (E.ON slide 1-stil)
// ─────────────────────────────────────────────────────────
const Slide2VadArDataskydd = () => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="font-bold text-sm text-gray-800">Grunderna för dataskydd</p>
        <p className="text-xs text-gray-400">Introduktion</p>
      </div>

      <div className="relative" style={{ height: 380 }}>
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85"
          alt="Digital data"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Orange rubrikbanner (E.ON-stil) */}
        <div className="absolute top-4 left-4 right-4">
          <OrangeBox>Vad är dataskydd och varför är det viktigt?</OrangeBox>
        </div>

        {/* Vita textrutor (E.ON-stil) */}
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <InfoCard>
            Syftet med dataskydd är att skydda <strong>personuppgifter</strong>. I grund och botten
            ska det vara möjligt för varje person att bestämma med vem och för vilket syfte
            personuppgifter delas. Dataskyddslagstiftning ska förstärka din rätt att välja.
          </InfoCard>
          <InfoCard
            icon={
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#003399' }}>
                <Globe size={18} className="text-white" />
              </div>
            }
          >
            Den europeiska allmänna dataskyddsförordningen (GDPR), gällande från 25 maj 2018,
            har i stora delar förenklat kraven inom EU men innebär också väsentligt ökade sanktioner.
          </InfoCard>
        </div>
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 3 – PRINCIPERNA (klickbara rundade cirklar, E.ON slide 8)
// ─────────────────────────────────────────────────────────
const PRINCIPER = [
  { id: 'laglighet',  label: 'Laglighet, hantering i god tro och transparens',
    desc: 'Personuppgifter ska behandlas på ett lagligt, korrekt och öppet sätt i förhållande till den registrerade.' },
  { id: 'andamal',    label: 'Ändamål',
    desc: 'Uppgifterna ska samlas in för ett specifikt, uttryckligt och legitimt ändamål och inte behandlas på ett oförenligt sätt.' },
  { id: 'minimering', label: 'Data­minimering',
    desc: 'Uppgifterna ska vara adekvata, relevanta och inte för omfattande i förhållande till det ändamål de behandlas för.' },
  { id: 'noggrannhet',label: 'Noggrannhet',
    desc: 'Uppgifterna ska vara korrekta och aktuella. Felaktiga uppgifter ska raderas eller rättas utan dröjsmål.' },
  { id: 'begransning',label: 'Begränsning av förvaring',
    desc: 'Uppgifterna ska inte lagras längre än nödvändigt för det ändamål de samlades in för.' },
  { id: 'integritet',  label: 'Integritet och sekretess',
    desc: 'Uppgifterna ska behandlas på ett säkert sätt och skyddas mot obehörig åtkomst eller förlust.' },
  { id: 'ansvar',     label: 'Ansvar',
    desc: 'Den personuppgiftsansvarige är ansvarig för att dessa principer efterlevs och ska kunna påvisa detta.' },
];

const Slide3Principer = () => {
  const [active, setActive] = useState<string | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const activePrincip = PRINCIPER.find(p => p.id === active);

  const handleClick = (id: string) => {
    setActive(prev => prev === id ? null : id);
    setViewed(prev => new Set([...prev, id]));
  };

  return (
    <SlideShell>
      <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="font-bold text-sm text-gray-800">GDPR:s sju principer</p>
          <p className="text-xs text-gray-400">Klicka på varje princip för att läsa mer</p>
        </div>

        {/* Bild-bakgrund med cirklar ovanpå */}
        <div className="relative">
          <div className="w-full" style={{ height: 320 }}>
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
              alt="Träbakgrund"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Cirklar ovanpå bilden */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {PRINCIPER.map((p, i) => (
                <motion.button key={p.id}
                  whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(p.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-2 font-bold text-xs leading-tight transition-all shadow-lg"
                  style={{
                    background: active === p.id ? OD : O,
                    color: active === p.id ? 'white' : viewed.has(p.id) ? '#FFD0C0' : 'white',
                    boxShadow: active === p.id ? `0 0 0 4px white, 0 0 0 6px ${O}` : `0 4px 16px ${O}40`,
                  }}>
                  {p.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Beskrivning under */}
        <div className="p-4 min-h-[80px]">
          <AnimatePresence mode="wait">
            {activePrincip ? (
              <motion.div key={activePrincip.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-xl p-4 border"
                style={{ background: OL, borderColor: O + '40' }}>
                <p className="font-bold text-sm mb-1" style={{ color: OD }}>{activePrincip.label}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{activePrincip.desc}</p>
              </motion.div>
            ) : (
              <motion.p key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm text-gray-400 text-center py-4">
                Klicka på en princip ovan för att läsa mer
                {viewed.size > 0 && <span className="ml-2 text-xs">({viewed.size}/{PRINCIPER.length} utforskade)</span>}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 4 – PRIVACY BY DEFAULT
// Bild med tablet + text, E.ON slide 2-stil
// ─────────────────────────────────────────────────────────
const Slide4PrivacyByDefault = () => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="font-bold text-sm text-gray-800">Dataskydd som standard</p>
        <p className="text-xs text-gray-400">Privacy by default</p>
      </div>

      <div className="relative" style={{ height: 420 }}>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85"
          alt="Tablet och data"
          className="w-full h-full object-cover"
        />
        {/* Grön/tonat overlay – som i E.ON slide 4 men med varm ton */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,42,66,0.75) 0%, rgba(255,84,33,0.15) 100%)' }} />

        {/* Vit informationsruta vänster */}
        <div className="absolute top-4 left-4 max-w-xs">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
            <p className="font-bold text-sm text-gray-800 mb-2">
              <strong>Integritetsskydd som standard</strong> ("privacy by default")
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Förinställningar måste väljas som säkerställer att hantering av
              personuppgifter minimeras. Detta gäller till exempel
              integritetsinställningar på appar.
            </p>
          </div>
        </div>

        {/* Checklistor */}
        <div className="absolute bottom-16 left-4 right-4">
          <div className="space-y-2">
            {[
              'Kvantiteten av personuppgifter som hanteras',
              'Varaktigheten av lagring av uppgifter',
              'Utomstående parters åtkomst till uppgifter',
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: O }}>
                  <CheckCircle size={12} className="text-white" />
                </div>
                <p className="text-xs text-gray-700 font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Orange bottom-banner */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{ background: O }}>
          <p className="text-white text-xs font-semibold text-center">
            Den berörda personen ska själv kunna bestämma om den vill ändra de skyddande
            förinställningarna och därigenom tillåta hantering av ytterligare uppgifter.
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 5 – PERSONUPPGIFTER (quiz-liknande interaktiv)
// ─────────────────────────────────────────────────────────
const EXAMPLES = [
  { text: 'Personnummer',    isPersonal: true,  explanation: 'Direkt kopplad till en specifik person.' },
  { text: 'IP-adress',       isPersonal: true,  explanation: 'Kan spåras till en individ via leverantören.' },
  { text: 'Företagsnamn',    isPersonal: false, explanation: 'Juridisk person – inte en fysisk individ.' },
  { text: 'E-postadress',    isPersonal: true,  explanation: 'Kopplas direkt till en person.' },
  { text: 'Husdjurets namn', isPersonal: false, explanation: 'Identifierar inte en fysisk person.' },
  { text: 'Ansiktsigenkänning', isPersonal: true, explanation: 'Biometrisk data – känslig personuppgift.' },
];

const Slide5Personuppgifter = () => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleAnswer = (i: number, val: boolean) => {
    if (revealed.has(i)) return;
    setAnswers(prev => ({ ...prev, [i]: val }));
    setRevealed(prev => new Set([...prev, i]));
  };

  const correct = Object.entries(answers).filter(([i, v]) => v === EXAMPLES[+i].isPersonal).length;

  return (
    <SlideShell>
      <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
        <div className="px-5 py-3 border-b border-gray-100">
          <p className="font-bold text-sm text-gray-800">Vad är en personuppgift?</p>
          <p className="text-xs text-gray-400">Svara Ja eller Nej på varje exempel</p>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80"
            alt="Data säkerhet"
            className="w-full object-cover"
            style={{ height: 120 }}
          />
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(255,84,33,0.85)' }}>
            <p className="text-white font-bold text-lg text-center px-4">
              Är detta en personuppgift?
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {EXAMPLES.map((ex, i) => {
              const answered = revealed.has(i);
              const wasCorrect = answered && answers[i] === ex.isPersonal;

              return (
                <motion.div key={i}
                  className="rounded-xl border-2 p-3 transition-all"
                  style={{
                    borderColor: answered ? (wasCorrect ? '#22c55e' : '#ef4444') : '#e5e7eb',
                    background: answered ? (wasCorrect ? '#f0fdf4' : '#fef2f2') : 'white',
                  }}>
                  <p className="font-semibold text-sm text-gray-800 mb-2">{ex.text}</p>

                  {!answered ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleAnswer(i, true)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
                        style={{ background: O }}>
                        Ja
                      </button>
                      <button onClick={() => handleAnswer(i, false)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all hover:bg-gray-50"
                        style={{ color: O, borderColor: O }}>
                        Nej
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                      <p className="text-xs font-bold mb-0.5"
                        style={{ color: wasCorrect ? '#16a34a' : '#dc2626' }}>
                        {wasCorrect ? '✓ Rätt!' : '✗ Fel'} – {ex.isPersonal ? 'Ja, personuppgift' : 'Nej, inte personuppgift'}
                      </p>
                      <p className="text-xs text-gray-500">{ex.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {revealed.size === EXAMPLES.length && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-4 text-center"
              style={{ background: OL }}>
              <p className="font-bold text-lg" style={{ color: O }}>
                {correct}/{EXAMPLES.length} rätt
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {correct >= 5 ? 'Bra jobbat! Du har bra koll på personuppgifter.' : 'Gå gärna igenom exemplen igen.'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </SlideShell>
  );
};

// ─────────────────────────────────────────────────────────
// SLIDE 6 – RÄTTSLIGA GRUNDER
// Enkel textslide med bild, kort och tydlig
// ─────────────────────────────────────────────────────────
const GRUNDER = [
  { icon: FileText, title: 'Samtycke', desc: 'Den registrerade har gett ett tydligt samtycke till behandlingen.' },
  { icon: Shield,   title: 'Avtal',    desc: 'Behandlingen är nödvändig för att fullgöra ett avtal med den registrerade.' },
  { icon: Globe,    title: 'Rättslig förpliktelse', desc: 'Behandlingen är nödvändig för att uppfylla en rättslig förpliktelse.' },
  { icon: Users,    title: 'Allmänt intresse', desc: 'Behandlingen är nödvändig för att utföra en uppgift av allmänt intresse.' },
  { icon: Eye,      title: 'Berättigat intresse', desc: 'Berättigat intresse hos den personuppgiftsansvarige, om det inte väger tyngre än den registrerades intressen.' },
];

const Slide6RattsligaGrunder = () => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="font-bold text-sm text-gray-800">Rättsliga grunder för behandling</p>
        <p className="text-xs text-gray-400">Det måste alltid finnas en rättslig grund</p>
      </div>

      <div className="relative" style={{ height: 160 }}>
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
          alt="Juridik"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center p-6"
          style={{ background: 'rgba(255,84,33,0.82)' }}>
          <p className="text-white font-semibold text-base leading-snug max-w-lg">
            All behandling av personuppgifter måste ha en rättslig grund.
            Det räcker inte att syftet är gott – det måste vara lagligt.
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GRUNDER.map((g, i) => {
          const Icon = g.icon;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }} viewport={{ once: true }}
              className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors"
              style={{ background: '#fafafa' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: OL }}>
                <Icon size={16} style={{ color: O }} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">{g.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{g.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// SLIDE 7 – SAMMANFATTNING
// ─────────────────────────────────────────────────────────
const Slide7Summary = ({ onComplete }: { onComplete: () => void }) => (
  <SlideShell>
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
      <div className="relative" style={{ height: 200 }}>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85"
          alt="Team"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(255,84,33,0.88)' }}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
              <Award size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Avsnitt genomfört!
            </h2>
            <p className="text-white/80 text-sm mt-1">Det här har du lärt dig</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-2.5 mb-6">
          {[
            'Syftet med dataskydd och varför GDPR kom till',
            'GDPR:s sju grundläggande principer',
            'Vad som räknas som en personuppgift',
            'De fem rättsliga grunderna för personuppgiftsbehandling',
            'Vad "privacy by default" innebär i praktiken',
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{ background: OL }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: O }}>
                <CheckCircle size={11} className="text-white" />
              </div>
              <span className="text-sm text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onComplete}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-sm"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})`,
              boxShadow: `0 4px 20px ${O}40` }}>
            Fortsätt till modul 2 <ChevronRight size={16} />
          </motion.button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          Nästa: Dataskydd på arbetsplatsen – vad gäller för dig?
        </p>
      </div>
    </div>
  </SlideShell>
);

// ─────────────────────────────────────────────────────────
// MODUL – MAIN
// ─────────────────────────────────────────────────────────
const dataFaqs = [
  { question: 'Vad är skillnaden mellan personuppgifter och känsliga personuppgifter?',
    answer: 'Känsliga personuppgifter inkluderar t.ex. hälsoinformation, etniskt ursprung, politiska åsikter och biometrisk data. Dessa kräver extra skydd och en starkare rättslig grund.' },
  { question: 'Vad händer om vår organisation bryter mot GDPR?',
    answer: 'Sanktionerna kan bli mycket stora – upp till 4% av global omsättning eller 20 miljoner euro, beroende på vilken som är störst.' },
  { question: 'Vad menas med "privacy by design"?',
    answer: 'Dataskydd ska byggas in i system och processer från start, inte läggas till i efterhand. Det är ett krav enligt GDPR.' },
  { question: 'Hur länge får vi spara personuppgifter?',
    answer: 'Uppgifterna får inte sparas längre än nödvändigt för det ändamål de samlades in för. Sätt upp rutiner för regelbunden gallring.' },
];

const Module1Dataskydd: React.FC = () => {
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop]               = useState(false);
  const [userData]                              = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    { id: 'intro',       title: 'Välkommen',
      component: <Slide1Intro onStart={() => setCurrentIndex(1)} /> },
    { id: 'vad-ar',      title: 'Vad är dataskydd?',
      component: <Slide2VadArDataskydd /> },
    { id: 'principer',   title: 'GDPR:s sju principer',
      component: <Slide3Principer /> },
    { id: 'privacy',     title: 'Privacy by default',
      component: <Slide4PrivacyByDefault /> },
    { id: 'personuppgift', title: 'Vad är en personuppgift?',
      component: <Slide5Personuppgifter /> },
    { id: 'grunder',     title: 'Rättsliga grunder',
      component: <Slide6RattsligaGrunder /> },
    { id: 'summary',     title: 'Sammanfattning',
      component: <Slide7Summary onComplete={() => handleComplete('summary')} /> },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#0f1623' }}>
      <div className="flex-shrink-0">
        <CourseHeader
          isSidebarMinimized={false}
          isDesktop={isDesktop}
          userName={userData.name}
          userAvatar={userData.avatar}
          slideProgress={{ current: currentIndex, total: slides.length }}
        />
      </div>

      <GlobalSidebar />

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

     
    </div>
  );
};

export default Module1Dataskydd;