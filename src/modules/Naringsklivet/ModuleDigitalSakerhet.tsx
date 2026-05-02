// src/modules/Naringsklivet/ModuleDigitalSakerhet.tsx
// Digital säkerhet för alla — KOMPLETT 14 moduler
// Designkoncept: Pusselbitar som bakgrundselement

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Shield, Key, Lock, Eye, Brain,
  CheckCircle, HelpCircle, Award, Zap, X, Bot,
  Wifi, Database, UserX, Phone, Mail, Building,
  Users, FileWarning, Fingerprint, Server, AlertOctagon
} from 'lucide-react';

import CourseHeader      from '../../components/CourseElements/CourseHeader';
import GlobalSidebar     from '../../components/GlobalSidebar';
import FloatingFAQ       from '../../components/CourseElements/FloatingFAQ';
import ModuleSlideLayout from '../../components/CourseElements/ModuleSlideLayout';
import ModuleIntroSlide  from '../../components/CourseElements/ModuleIntroSlide';
import SplitSlide, { StegLista, InfoRuta } from '../../components/CourseElements/SplitSlide';
import InlineQuiz        from '../../components/CourseElements/InlineQuiz';
import GdprQuizOverlay   from '../../components/CourseElements/GdprQuizOverlay';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

// ── Bilder ────────────────────────────────────────────────
const IMGS = {
  cyber:    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
  lock:     'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1920&q=80',
  phishing: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80',
  mobile:   'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80',
  network:  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80',
  backup:   'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80',
  id:       'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
  office:   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  gdpr:     'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=80',
  ai:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&q=80',
  team:     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80',
  alert:    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1920&q=80',
  email:    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&q=80',
  laptop:   'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&q=80',
};

// ─────────────────────────────────────────────────────────
// PUSSELBITAR — SVG bakgrundselement
// ─────────────────────────────────────────────────────────
const PuzzlePiece = ({ x, y, size = 80, rotation = 0, opacity = 0.06, color = '#ffffff' }: {
  x: string; y: string; size?: number; rotation?: number; opacity?: number; color?: string;
}) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `rotate(${rotation}deg)`, opacity, pointerEvents: 'none' }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M20 20 L40 20 Q40 10 50 10 Q60 10 60 20 L80 20 L80 40 Q90 40 90 50 Q90 60 80 60 L80 80 L60 80 Q60 90 50 90 Q40 90 40 80 L20 80 L20 60 Q10 60 10 50 Q10 40 20 40 Z" fill={color} />
    </svg>
  </div>
);

const PuzzleBg = ({ dark = true, accent = false }: { dark?: boolean; accent?: boolean }) => {
  const color = accent ? O : dark ? '#ffffff' : '#0f1623';
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <PuzzlePiece x="-2%" y="5%"  size={120} rotation={15}  opacity={0.05} color={color} />
      <PuzzlePiece x="8%"  y="60%" size={80}  rotation={-20} opacity={0.04} color={color} />
      <PuzzlePiece x="75%" y="3%"  size={100} rotation={30}  opacity={0.06} color={color} />
      <PuzzlePiece x="85%" y="55%" size={140} rotation={-10} opacity={0.04} color={color} />
      <PuzzlePiece x="45%" y="80%" size={90}  rotation={45}  opacity={0.05} color={color} />
      <PuzzlePiece x="20%" y="15%" size={60}  rotation={-35} opacity={0.03} color={color} />
      <PuzzlePiece x="60%" y="40%" size={70}  rotation={20}  opacity={0.04} color={color} />
      <PuzzlePiece x="92%" y="20%" size={55}  rotation={-45} opacity={0.05} color={color} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Layout-komponenter
// ─────────────────────────────────────────────────────────
const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.84)', accent = false }: {
  bild: string; children: React.ReactNode; overlay?: string; accent?: boolean;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <PuzzleBg accent={accent} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const LightSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full relative overflow-hidden" style={{ background: '#FAFAF8' }}>
    <PuzzleBg dark={false} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>{text}</div>
);

const H = ({ icon: Icon, title, dark = false }: { icon: React.ElementType; title: string; dark?: boolean }) => (
  <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-6 flex items-center gap-3"
    style={{ fontFamily: "'Nunito', sans-serif", color: dark ? '#111827' : '#ffffff' }}>
    <Icon className="w-8 h-8 flex-shrink-0" style={{ color: O }} />
    <span dangerouslySetInnerHTML={{ __html: title }} />
  </h2>
);

const StatGrid = ({ stats }: { stats: { s: string; t: string }[] }) => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    {stats.map((s, i) => (
      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
        className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-3xl font-black mb-1" style={{ color: O, fontFamily: "'Nunito', sans-serif" }}>{s.s}</p>
        <p className="text-sm text-white/60 leading-snug">{s.t}</p>
      </motion.div>
    ))}
  </div>
);

const DangerBox = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
    <p className="text-white/80 text-sm leading-relaxed">{children}</p>
  </div>
);

const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 rounded-xl p-4" style={{ background: OL, border: `1px solid ${O}30` }}>
    <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
  </div>
);

const BigStat = ({ val, label, color = '#ef4444' }: { val: string; label: string; color?: string }) => (
  <div className="mb-6">
    <p className="font-black leading-none mb-2" style={{ fontSize: '5rem', color, fontFamily: "'Nunito', sans-serif" }}>{val}</p>
    <p className="text-xl text-white/70">{label}</p>
  </div>
);

const QuizSlide = ({ badge, title, quizId, questions, onComplete, isDone }: any) => (
  <BgSlide bild={IMGS.cyber} overlay="rgba(10,16,28,0.92)">
    <Badge text={`Kunskapstest · ${badge}`} />
    <H icon={HelpCircle} title={`Testa: ${title}`} />
    <InlineQuiz dark onComplete={() => onComplete(quizId)} questions={questions} />
  </BgSlide>
);

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────
const MODULE_FAQ = [
  { question: 'Hur lång tid tar det att knäcka ett svagt lösenord?', answer: 'Ett 6-siffrigt lösenord knäcks på under en sekund. "Sommar2024" tar ca 13 sekunder. 12+ tecken med specialtecken tar miljoner år.' },
  { question: 'Är det säkert att använda en lösenordshanterare?', answer: 'Ja — mycket säkrare än att återanvända lösenord. Bitwarden krypterar all data lokalt.' },
  { question: 'Vad gör jag om jag klickat på en phishing-länk?', answer: '1) Koppla från internet. 2) Byt lösenord. 3) Kontakta IT-support. 4) Anmäl till chefen.' },
  { question: 'Kan AI verkligen klona min röst?', answer: 'Ja — 3 sekunder av din röst räcker. Verifiera alltid via en annan kanal.' },
  { question: 'Vad är 2FA och varför behöver jag det?', answer: '2FA är ett extra steg vid inloggning. Även om ditt lösenord stjäls kan angriparen inte logga in utan din telefon.' },
  { question: 'Vem kontaktar jag om något händer på jobbet?', answer: 'Kontakta alltid IT-support eller din chef direkt. Ta reda på rutinerna i förväg — inte när det händer.' },
];

// ════════════════════════════════════════════════════════════════════
// MODUL 0 — INTRO
// ════════════════════════════════════════════════════════════════════
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="DIGITAL SÄKERHET"
    titel="Digital säkerhet <span style='color:#FF5421'>för alla</span>"
    ingress="Från lösenord och phishing till AI-hot och deepfakes — praktisk kunskap som skyddar dig på jobbet och privat."
    bild={IMGS.cyber}
    längd="~3 timmar"
    avsnitt={14}
    onStart={onStart}
    vadLärDuDig={[
      'Skapa starka lösenord & använda lösenordshanterare',
      'Aktivera tvåfaktorsautentisering (2FA)',
      'Känna igen phishing och bedrägerier',
      'Skydda din identitet och dina personuppgifter',
      'Säkra dina enheter, nätverk och backuper',
      'Förstå AI-hot: deepfakes och röstkloning',
      'Vad du gör när något gått fel',
    ]}
  />
);

// ════════════════════════════════════════════════════════════════════
// MODUL 1 — LÖSENORD
// ════════════════════════════════════════════════════════════════════
const M1_Skrack = () => (
  <BgSlide bild={IMGS.lock} accent>
    <Badge text="Modul 1 · Lösenord & lösenordshanterare" />
    <BigStat val="3 434" label="arbetsplatser drabbades förra året av intrång via stulna lösenord" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      En angripare behöver i snitt <span style={{ color: '#ef4444', fontWeight: 800 }}>6 sekunder</span> för att knäcka "Sommar2024". De vanligaste lösenorden i läckt svensk data:
    </p>
    <div className="grid grid-cols-3 gap-3 max-w-sm">
      {['123456', 'password', 'qwerty', 'Sommar2024', '111111', 'abc123'].map((pw, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }}
          className="px-3 py-2 rounded-xl text-center font-mono text-sm font-bold"
          style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
          {pw}
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M1_Nulage = () => (
  <BgSlide bild={IMGS.cyber}>
    <Badge text="Modul 1 · Nuläget" />
    <H icon={Eye} title="65% återanvänder <span style='color:#FF5421'>samma lösenord</span> överallt" />
    <StatGrid stats={[
      { s: '65%', t: 'återanvänder lösenord på flera tjänster' },
      { s: '45%', t: 'har aldrig bytt sitt e-postlösenord' },
      { s: '13s',  t: 'tar det att knäcka ett 6-siffrigt lösenord' },
      { s: '81%', t: 'av intrång beror på svaga eller stulna lösenord' },
    ]} />
    <DangerBox>💡 <strong className="text-white">Det räcker att ett enda konto läcker</strong> — om du använder samma lösenord på jobbet och privat kan angriparen komma in överallt.</DangerBox>
  </BgSlide>
);

const M1_Losning = () => (
  <SplitSlide
    badge="Modul 1 · Lösningen"
    title="Så skapar du ett <span style='color:#FF5421'>lösenord som håller</span>"
    ingress="Längd slår komplexitet. 16 tecken utan specialtecken är starkare än 8 med. Och du behöver inte komma ihåg dem — det gör lösenordshanteraren."
    bild={IMGS.lock}
    bildPosition="right"
    badge2="Bitwarden rekommenderas"
    badge2Sub="Gratis och öppen källkod">
    <StegLista steg={[
      { nr: '01', titel: 'Minst 12 tecken', desc: 'Längd är det viktigaste. Varje extra tecken gör det exponentiellt svårare.' },
      { nr: '02', titel: 'Slumpmässigt', desc: 'Inga ord, datum eller namn — det är det första angripare provar.' },
      { nr: '03', titel: 'Blandade tecken', desc: 'Stora + små bokstäver, siffror och specialtecken (#!@$).' },
      { nr: '04', titel: 'Unikt per tjänst', desc: 'Aldrig samma lösenord på jobbet och privat.' },
    ]} />
    <InfoRuta>Använd Bitwarden (gratis), 1Password eller Dashlane. Kolla om din e-post läckt på haveibeenpwned.com — tar 10 sekunder.</InfoRuta>
  </SplitSlide>
);

const M1_Quiz = ({ onComplete, isDone }: any) => (
  <QuizSlide badge="Lösenord" title="Lösenord" quizId="quiz-m1" onComplete={onComplete} isDone={isDone} questions={[
    { id: 'lq1', question_text: 'Vilket lösenord är säkrast?', question_type: 'single_choice', question_order: 1,
      options: { choices: ['Fluffy1234', 'k#9mX!vQ2@nL', 'password', 'Sommar2024'] },
      correct_answer: 'k#9mX!vQ2@nL',
      explanation: 'Rätt. Slumpmässigt, långt och blandade tecken. "Sommar2024" knäcks på sekunder.', points: 100 },
    { id: 'lq2', question_text: 'Vad är fördelen med en lösenordshanterare?', question_type: 'single_choice', question_order: 2,
      options: { choices: ['Den är gratis', 'Du slipper komma ihåg unika starka lösenord', 'Den gör lösenorden kortare', 'Den delar lösenord automatiskt'] },
      correct_answer: 'Du slipper komma ihåg unika starka lösenord',
      explanation: 'En lösenordshanterare genererar och lagrar unika lösenord. Du behöver bara ett huvudlösenord.', points: 100 },
  ]} />
);

// ════════════════════════════════════════════════════════════════════
// MODUL 2 — 2FA
// ════════════════════════════════════════════════════════════════════
const M2_Skrack = () => (
  <BgSlide bild={IMGS.mobile} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 2 · Tvåfaktorsautentisering (2FA)" />
    <BigStat val="1,2 mkr" label="konton kapades på en dag — alla saknade 2FA" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      2FA blockerar <span style={{ color: O, fontWeight: 800 }}>99,9% av automatiserade attacker</span> — även om ditt lösenord är stulet kan angriparen inte logga in utan din telefon.
    </p>
    <DangerBox>Bara <strong className="text-white">28% av svenska internetanvändare</strong> har aktiverat 2FA. Du är sannolikt i minoriteten om du redan använder det.</DangerBox>
  </BgSlide>
);

const M2_Nulage = () => (
  <BgSlide bild={IMGS.mobile}>
    <Badge text="Modul 2 · Nuläget" />
    <H icon={Phone} title="Tre typer av <span style='color:#FF5421'>2FA — inte alla är lika säkra</span>" />
    <div className="space-y-4 mb-6">
      {[
        { typ: 'SMS-kod', säk: 'Svag', color: '#f59e0b', desc: 'Vanligast men svagast. SIM-swapping-attacker kan kapa ditt nummer och fånga upp koden.' },
        { typ: 'Authenticator-app (Google/Microsoft)', säk: 'Stark', color: '#10b981', desc: 'Genererar en tidsbegränsad kod lokalt på din telefon. Kan inte fångas upp på distans. Rekommenderas.' },
        { typ: 'Hårdvarunyckel (YubiKey)', säk: 'Starkast', color: O, desc: 'Fysisk nyckel du sätter i USB-porten. Nästintill omöjlig att kapa på distans. Används av säkerhetskritiska organisationer.' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-white text-sm">{item.typ}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>{item.säk}</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M2_Losning = () => (
  <SplitSlide
    badge="Modul 2 · Lösningen"
    title="Aktivera 2FA <span style='color:#FF5421'>på 5 minuter</span>"
    ingress="Ladda ner Google Authenticator eller Microsoft Authenticator. Aktivera sedan 2FA på dina viktigaste konton — börja med e-post och bank."
    bild={IMGS.mobile}
    bildPosition="left"
    badge2="Authenticator-app"
    badge2Sub="Starkare än SMS">
    <StegLista steg={[
      { nr: '01', titel: 'Ladda ner Google Authenticator', desc: 'App Store eller Google Play. Gratis.' },
      { nr: '02', titel: 'Gå till kontoinställningar', desc: 'Leta efter "Säkerhet" eller "Tvåfaktors­autentisering" på respektive tjänst.' },
      { nr: '03', titel: 'Skanna QR-koden', desc: 'Appen genererar nu en ny 6-siffrig kod var 30:e sekund.' },
      { nr: '04', titel: 'Spara reservkoderna', desc: 'Dessa behöver du om du tappar telefonen. Förvara dem säkert — inte på telefonen.' },
    ]} />
    <InfoRuta>Prioritet: E-post → Bank → Arbetsverktyg → Sociala medier. E-post är viktigast — den ger tillgång till alla andra konton via lösenordsåterställning.</InfoRuta>
  </SplitSlide>
);

const M2_Quiz = ({ onComplete, isDone }: any) => (
  <QuizSlide badge="2FA" title="Tvåfaktorsautentisering" quizId="quiz-m2" onComplete={onComplete} isDone={isDone} questions={[
    { id: '2q1', question_text: 'Vilken typ av 2FA är säkrast?', question_type: 'single_choice', question_order: 1,
      options: { choices: ['SMS-kod', 'E-postkod', 'Authenticator-app', 'Säkerhetsfråga'] },
      correct_answer: 'Authenticator-app',
      explanation: 'Authenticator-appar genererar koder lokalt och kan inte fångas upp på distans. SMS kan kapas via SIM-swapping.', points: 100 },
    { id: '2q2', question_text: 'Varför är e-post det viktigaste kontot att skydda med 2FA?', question_type: 'single_choice', question_order: 2,
      options: { choices: ['För att den innehåller mest data', 'För att den ger tillgång till alla andra konton via lösenordsåterställning', 'För att e-post är mest hackat', 'Det spelar ingen roll vilket konto man börjar med'] },
      correct_answer: 'För att den ger tillgång till alla andra konton via lösenordsåterställning',
      explanation: 'Den som kontrollerar din e-post kan återställa lösenord på alla dina andra konton. Skydda e-posten först.', points: 100 },
  ]} />
);

// ════════════════════════════════════════════════════════════════════
// MODUL 3 — PHISHING
// ════════════════════════════════════════════════════════════════════
const M3_Skrack = () => (
  <BgSlide bild={IMGS.phishing} overlay="rgba(10,16,28,0.86)">
    <Badge text="Modul 3 · Bedrägerier & phishing" />
    <BigStat val="4,2 mkr" label="kostade en enda phishing-attack ett medelstort företag" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      <span style={{ color: '#ef4444', fontWeight: 800 }}>91% av alla cyberattacker</span> börjar med ett phishing-mejl. Angriparen behöver inte hacka tekniken — de hackar <em>dig</em>.
    </p>
    <div className="space-y-3">
      {[
        { ikon: '📧', text: 'Falska mejl från "banken" eller "IT-support"' },
        { ikon: '📱', text: 'SMS-phishing — "Din leverans kräver åtgärd"' },
        { ikon: '📞', text: 'Telefonbedrägerier — utger sig för att vara chefen' },
        { ikon: '🌐', text: 'Falska inloggningssidor som kopierar riktiga sajter' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-xl">{item.ikon}</span>
          <p className="text-white/80 text-sm">{item.text}</p>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M3_Losning = () => (
  <SplitSlide
    badge="Modul 3 · Lösningen"
    title="Känna igen och <span style='color:#FF5421'>stoppa phishing</span>"
    ingress="Angripare skapar stress och brådska. Pausa alltid — det är den enskilt viktigaste åtgärden."
    bild={IMGS.email}
    bildPosition="right"
    badge2="Verifiera alltid"
    badge2Sub="Via en annan kanal">
    <StegLista steg={[
      { nr: '🚩', titel: 'Kontrollera avsändaradressen', desc: 'support@bankennnn.se är inte banken. Titta noga på hela domänen.' },
      { nr: '🚩', titel: 'Hovra över länkar', desc: 'Se vart länken faktiskt leder innan du klickar.' },
      { nr: '🚩', titel: 'Brådska är en röd flagga', desc: '"Agera nu eller ditt konto stängs" — det är aldrig sant.' },
      { nr: '🚩', titel: 'Ring och verifiera', desc: 'Oväntat mejl om betalning? Ring personen på ett känt nummer.' },
    ]} />
    <InfoRuta>Om du är osäker — lita på osäkerheten. Det är alltid okej att pausa och fråga en kollega.</InfoRuta>
  </SplitSlide>
);

const M3_Quiz = ({ onComplete, isDone }: any) => (
  <QuizSlide badge="Phishing" title="Phishing & bedrägerier" quizId="quiz-m3" onComplete={onComplete} isDone={isDone} questions={[
    { id: 'pq1', question_text: 'Vilket är det tydligaste tecknet på ett phishing-mejl?', question_type: 'single_choice', question_order: 1,
      options: { choices: ['Det är skickat på kvällen', 'Det skapar brådska och kräver omedelbar handling', 'Det innehåller bilagor', 'Det är på engelska'] },
      correct_answer: 'Det skapar brådska och kräver omedelbar handling',
      explanation: 'Brådska är angriparens viktigaste vapen. De vill att du agerar utan att tänka.', points: 100 },
    { id: 'pq2', question_text: 'Du får ett mejl från "chefen" om en brådskande betalning. Vad gör du?', question_type: 'single_choice', question_order: 2,
      options: { choices: ['Genomför betalningen', 'Svarar på mejlet och frågar om det stämmer', 'Ringer chefen på ett känt nummer för att verifiera', 'Vidarebefordrar till ekonomiavdelningen'] },
      correct_answer: 'Ringer chefen på ett känt nummer för att verifiera',
      explanation: 'Ring alltid tillbaka via ett nummer du vet är korrekt. Svara aldrig i samma mejltråd — den kan vara kontrollerad av angriparen.', points: 100 },
  ]} />
);

// ════════════════════════════════════════════════════════════════════
// MODUL 4 — IDENTITET & PERSONUPPGIFTER
// ════════════════════════════════════════════════════════════════════
const M4_Skrack = () => (
  <BgSlide bild={IMGS.id} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 4 · Identitet & personuppgifter" />
    <BigStat val="87 000" label="anmälningar om ID-kapning gjordes i Sverige förra året" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      Ditt personnummer räcker för att ta lån i ditt namn. Det finns på <span style={{ color: '#ef4444', fontWeight: 800 }}>hundratals ställen</span> online — och du vet inte var.
    </p>
    <DangerBox>En kreditupplysning på ditt namn tar 30 sekunder att beställa. Utan en kreditspärr kan vem som helst göra det.</DangerBox>
  </BgSlide>
);

const M4_Losning = () => (
  <SplitSlide
    badge="Modul 4 · Lösningen"
    title="Skydda din <span style='color:#FF5421'>identitet aktivt</span>"
    ingress="En kreditspärr kostar ingenting och tar 5 minuter att lägga. Det är den enskilt mest effektiva åtgärden mot ID-kapning."
    bild={IMGS.id}
    bildPosition="left"
    badge2="UC.se"
    badge2Sub="Gratis kreditspärr">
    <StegLista steg={[
      { nr: '01', titel: 'Lägg en kreditspärr', desc: 'Gå till UC.se och lägg en spärr. Gratis. Förhindrar att lån tas i ditt namn.' },
      { nr: '02', titel: 'Övervaka ditt ID', desc: 'Tjänster som Kivra och Mina sidor ger dig koll på vad som händer med din identitet.' },
      { nr: '03', titel: 'Ge aldrig ut personnummer i onödan', desc: 'Fråga alltid varför det behövs. Många frågar utan att faktiskt behöva det.' },
      { nr: '04', titel: 'Om det händer — agera snabbt', desc: 'Kontakta banken, polisen och UC. Spara all dokumentation.' },
    ]} />
    <InfoRuta>Kolla om dina uppgifter läckt: haveibeenpwned.com (e-post) och dataintrång.se (personnummer).</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 5 — ENHETER & NÄTVERK
// ════════════════════════════════════════════════════════════════════
const M5_Skrack = () => (
  <BgSlide bild={IMGS.network} overlay="rgba(10,16,28,0.86)">
    <Badge text="Modul 5 · Enheter & nätverk" />
    <BigStat val="70%" label="av hemnätverk använder tillverkarens standardlösenord" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      En osäkrad router gav angripare tillgång till ett helt kontorsnätverk. Alla enheter på samma nätverk — datorer, mobiler, smarta TV — var exponerade.
    </p>
    <StatGrid stats={[
      { s: '1 av 5', t: 'bärbara datorer som försvinner saknar kryptering' },
      { s: '300 000', t: 'routrar i Sverige har kända sårbarheter just nu' },
      { s: '2,3 mdr', t: 'IoT-enheter attackerades globalt förra året' },
      { s: 'Dag 1', t: 'angripare skannar internet för nya sårbarheter' },
    ]} />
  </BgSlide>
);

const M5_Losning = () => (
  <SplitSlide
    badge="Modul 5 · Lösningen"
    title="Säkra dina enheter <span style='color:#FF5421'>och nätverk</span>"
    ingress="De flesta attacker utnyttjar kända sårbarheter som redan är patchade — om du bara uppdaterat."
    bild={IMGS.laptop}
    bildPosition="right"
    badge2="Uppdatera alltid"
    badge2Sub="Direkt när det dyker upp">
    <StegLista steg={[
      { nr: '01', titel: 'Byt routerns standardlösenord', desc: 'Logga in på 192.168.1.1 och byt till ett unikt, starkt lösenord.' },
      { nr: '02', titel: 'Aktivera WPA3 (eller WPA2)', desc: 'I routerns säkerhetsinställningar. WEP och WPA är för gamla och osäkra.' },
      { nr: '03', titel: 'Aktivera helhetskryptering', desc: 'BitLocker (Windows) eller FileVault (Mac). Skyddar data om datorn försvinner.' },
      { nr: '04', titel: 'Skapa ett gästnätverk', desc: 'Separera besökare och smarta prylar från dina egna enheter.' },
    ]} />
    <InfoRuta>Slå på automatiska uppdateringar på alla enheter — dator, mobil och router. Det är gratis och tar noll effort.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 6 — BACKUP & ÅTERSTÄLLNING
// ════════════════════════════════════════════════════════════════════
const M6_Skrack = () => (
  <BgSlide bild={IMGS.backup} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 6 · Backup & återställning" />
    <BigStat val="50%" label="av alla som förlorar data har aldrig haft en backup" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      Ransomware låste 40 000 patientjournaler på ett sjukhus i Sverige. Sjukhuset saknade fungerande backup. Återhämtningen tog <span style={{ color: '#ef4444', fontWeight: 800 }}>tre månader</span>.
    </p>
    <DangerBox>En backup du aldrig testat är ingen backup. Den kanske inte fungerar när du väl behöver den.</DangerBox>
  </BgSlide>
);

const M6_Losning = () => (
  <SplitSlide
    badge="Modul 6 · Lösningen"
    title="3-2-1-regeln <span style='color:#FF5421'>räddar dig</span>"
    ingress="3 kopior av din data. 2 olika medier. 1 offsite (på annan plats). Det är den enklaste och mest beprövade backup-strategin som finns."
    bild={IMGS.backup}
    bildPosition="left"
    badge2="3-2-1-regeln"
    badge2Sub="Branschstandard sedan 1990-talet">
    <StegLista steg={[
      { nr: '3', titel: '3 kopior', desc: 'Original + 2 säkerhetskopior. Om en misslyckas finns alltid en till.' },
      { nr: '2', titel: '2 olika medier', desc: 'T.ex. extern hårddisk + molntjänst. En diskkrasch tar inte båda.' },
      { nr: '1', titel: '1 offsite-kopia', desc: 'En kopia på annan plats. Brand, stöld eller ransomware kan inte ta allt.' },
      { nr: '✓', titel: 'Testa återställningen', desc: 'Återställ en testfil minst en gång per år. En otesterad backup är otillförlitlig.' },
    ]} />
    <InfoRuta>Enklaste starten: Aktivera iCloud, OneDrive eller Google Drive automatisk säkerhetskopiering nu. Tar 3 minuter.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 7 — NÄR NÅGOT GÅTT FEL
// ════════════════════════════════════════════════════════════════════
const M7_Skrack = () => (
  <BgSlide bild={IMGS.alert} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 7 · När något gått fel" />
    <BigStat val="3 dagar" label="väntade en medarbetare med att rapportera — det kostade 800 000 kr extra" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      De flesta vet inte vad de ska göra de första 30 minuterna. Varje minut av fördröjning ökar skadan exponentiellt.
    </p>
    <DangerBox>Genomsnittlig tid att <strong className="text-white">upptäcka</strong> ett intrång: 207 dagar. Genomsnittlig tid att <strong className="text-white">begränsa</strong> det: 73 dagar. Snabb rapportering ändrar allt.</DangerBox>
  </BgSlide>
);

const M7_Losning = () => (
  <SplitSlide
    badge="Modul 7 · Lösningen"
    title="De första <span style='color:#FF5421'>30 minuterna</span>"
    ingress="Ha en plan klar i förväg. När det händer är det för sent att tänka ut en strategi — panik tar över."
    bild={IMGS.alert}
    bildPosition="right"
    badge2="Agera snabbt"
    badge2Sub="Varje minut räknas">
    <StegLista steg={[
      { nr: '01', titel: 'Konto kapat → Byt lösenord direkt', desc: 'Börja med e-post. Aktivera 2FA om du inte redan gjort det. Kontrollera om angriparen ändrat något.' },
      { nr: '02', titel: 'Bankbedrägeri → Ring banken omedelbart', desc: 'Be dem spärra transaktioner. De kan ofta återkalla betalningar gjorda inom de senaste timmarna.' },
      { nr: '03', titel: 'Klickat på phishing → Koppla från internet', desc: 'Hindra eventuell skadlig kod från att kommunicera. Kontakta IT-support direkt.' },
      { nr: '04', titel: 'Anmäl till polisen', desc: 'Polisanmäl alltid — det hjälper andra och kan behövas för försäkring.' },
    ]} />
    <InfoRuta>Spara dessa nummer nu: bankens säkerhetslinje, IT-support och närmaste chef. Inte när det händer.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 8 — PHISHING PÅ JOBBET
// ════════════════════════════════════════════════════════════════════
const M8_Skrack = () => (
  <BgSlide bild={IMGS.office} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 8 · Phishing på jobbet" />
    <BigStat val="2,3 mkr" label="betalade en bokförare till fel konto efter ett falskt VD-mejl" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      VD-bedrägeri (BEC) är en av de snabbast växande attacktyperna. Angriparen studerar din organisation och skickar mejl som ser ut att komma från chefen.
    </p>
    <StatGrid stats={[
      { s: '+65%', t: 'ökning av riktade phishing-attacker per år' },
      { s: '43 mdr', t: 'USD förlorades globalt på VD-bedrägerier 2023' },
      { s: '94%', t: 'av skadlig kod levereras via e-post' },
      { s: '3 min', t: 'tar det att skapa ett övertygande falsktvd-mejl med AI' },
    ]} />
  </BgSlide>
);

const M8_Losning = () => (
  <SplitSlide
    badge="Modul 8 · Lösningen"
    title="Stoppa <span style='color:#FF5421'>VD-bedrägerier</span>"
    ingress="Angripare studerar LinkedIn, hemsidor och pressreleaser för att skapa övertygande attacker. Du är målet."
    bild={IMGS.email}
    bildPosition="left"
    badge2="Ring och bekräfta"
    badge2Sub="Alltid vid ovanliga förfrågningar">
    <StegLista steg={[
      { nr: '🚩', titel: 'Ovanlig betalningsförfrågan', desc: 'Ring alltid avsändaren på ett känt nummer innan du genomför en ovanlig betalning.' },
      { nr: '🚩', titel: 'Byta betalningsuppgifter', desc: 'Leverantörer som plötsligt vill byta bankkontonummer — verifiera alltid via telefon.' },
      { nr: '🚩', titel: 'Brådska och sekretess', desc: '"Berätta inte för någon" är alltid en röd flagga. Inga legitima chefer ber om det.' },
      { nr: '✓', titel: 'Bekräfta via annan kanal', desc: 'Mejl kan vara kapat. Ring eller skicka ett nytt mejl till en adress du vet är korrekt.' },
    ]} />
    <InfoRuta>Ha ett kodord med närmaste chef för brådskande betalningar. Enkelt att sätta upp, svårt för angripare att replikera.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 9 — GDPR PÅ JOBBET
// ════════════════════════════════════════════════════════════════════
const M9_Skrack = () => (
  <BgSlide bild={IMGS.gdpr} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 9 · GDPR & personuppgifter på jobbet" />
    <BigStat val="4 mkr" label="fick ett företag i böter efter att en medarbetare skickat fel fil" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      <span style={{ color: '#ef4444', fontWeight: 800 }}>60% av GDPR-incidenter</span> orsakas av mänskliga misstag — inte hackers. Du är den vanligaste risken.
    </p>
    <DangerBox>Personuppgifter i fel hands är inte bara ett juridiskt problem — det är ett etiskt. Bakom varje personnummer finns en verklig person.</DangerBox>
  </BgSlide>
);

const M9_Losning = () => (
  <SplitSlide
    badge="Modul 9 · Lösningen"
    title="GDPR i <span style='color:#FF5421'>praktiken</span>"
    ingress="Du behöver inte vara jurist. Du behöver tre enkla frågor som du ställer dig varje gång du hanterar andras uppgifter."
    bild={IMGS.gdpr}
    bildPosition="right"
    badge2="Tre frågor"
    badge2Sub="Ställ dem varje gång">
    <StegLista steg={[
      { nr: '?', titel: 'Behöver jag detta?', desc: 'Samla aldrig in mer uppgifter än du faktiskt behöver. Dataminimering är grundprincipen.' },
      { nr: '?', titel: 'Har jag rätt att hantera det?', desc: 'Finns det ett avtal, ett samtycke eller en laglig grund? Om du är osäker — fråga.' },
      { nr: '?', titel: 'Är det säkert?', desc: 'Skickas det krypterat? Lagras det rätt? Har bara de som behöver det tillgång?' },
      { nr: '!', titel: 'Rapportera misstag direkt', desc: 'Om du skickat fel — säg till chefen omedelbart. Att dölja förvärrar alltid situationen.' },
    ]} />
    <InfoRuta>Personnummer och hälsouppgifter kräver extra skydd. Skicka aldrig sådant via okrypterad e-post.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════════════════════
// MODUL 13 — AI-HOT
// ════════════════════════════════════════════════════════════════════
const M13_Skrack = () => (
  <BgSlide bild={IMGS.ai} overlay="rgba(10,16,28,0.88)">
    <Badge text="Modul 13 · AI-verktyg & nya hot" />
    <BigStat val="270 mkr" label="kr överfördes i ett deepfake-videomöte i Hongkong 2024" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      En ekonomichef deltog i ett videomöte med sin VD och flera kollegor. Alla godkände en betalning.
      <span style={{ color: '#ef4444', fontWeight: 800 }}> Alla var deepfakes — genererade i realtid med AI.</span>
    </p>
    <div className="grid grid-cols-3 gap-3">
      {[
        { ikon: '🎭', text: 'Deepfake-video i realtid' },
        { ikon: '🎙️', text: 'Röstkloning på 3 sekunder' },
        { ikon: '📧', text: 'AI-phishing i massiv skala' },
      ].map((s, i) => (
        <div key={i} className="rounded-xl p-4 text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <p className="text-2xl mb-2">{s.ikon}</p>
          <p className="text-xs text-white/60 leading-snug">{s.text}</p>
        </div>
      ))}
    </div>
  </BgSlide>
);

const M13_Dataskydd = () => (
  <LightSlide>
    <Badge text="Modul 13 · Vad du får lägga in i AI" />
    <H icon={Shield} title="Trafikljuset för <span style='color:#FF5421'>AI-verktyg</span>" dark />
    <p className="text-gray-600 text-base leading-relaxed mb-6">
      Samsung-ingenjörer klistrade in hemlig källkod i ChatGPT. Datan laddades upp till OpenAIs servrar. Samsung förbjöd sedan all AI-användning internt.
    </p>
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        { färg: '#10b981', label: 'OK', ikon: '✅', items: ['Anonymiserade mallar', 'Allmän fakta', 'Fiktiva exempel'] },
        { färg: '#f59e0b', label: 'Var försiktig', ikon: '⚠️', items: ['Interna processer', 'Affärsstrategier', 'Icke-offentliga planer'] },
        { färg: '#ef4444', label: 'Aldrig', ikon: '🚫', items: ['Kunduppgifter', 'Personnummer', 'Källkod & avtal'] },
      ].map((k, i) => (
        <div key={i} className="rounded-2xl p-4" style={{ background: '#fff', border: `2px solid ${k.färg}40`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="text-2xl mb-2">{k.ikon}</p>
          <p className="text-xs font-bold mb-3" style={{ color: k.färg }}>{k.label}</p>
          {k.items.map((item, j) => <p key={j} className="text-xs text-gray-500 mb-1">· {item}</p>)}
        </div>
      ))}
    </div>
    <TipBox>💡 <strong>Tumregeln:</strong> Om du inte skulle sätta upp det på anslagstavlan — lägg inte in det i ett publikt AI-verktyg.</TipBox>
  </LightSlide>
);

const M13_Quiz = ({ onComplete, isDone }: any) => (
  <QuizSlide badge="AI & säkerhet" title="AI-hot" quizId="quiz-m13" onComplete={onComplete} isDone={isDone} questions={[
    { id: 'aiq1', question_text: 'Din chef ringer och ber om en brådskande betalning — rösten låter exakt rätt. Vad gör du?', question_type: 'single_choice', question_order: 1,
      options: { choices: ['Genomför betalningen', 'Ber om skriftligt godkännande', 'Lägger på och ringer tillbaka på ett känt nummer', 'Frågar om ett kodord'] },
      correct_answer: 'Lägger på och ringer tillbaka på ett känt nummer',
      explanation: 'Röstkloning är möjlig med 3 sekunders ljud. Lägg alltid på och ring tillbaka på ett nummer du vet är korrekt.', points: 100 },
    { id: 'aiq2', question_text: 'Vad ska du ALDRIG lägga in i ett publikt AI-verktyg?', question_type: 'single_choice', question_order: 2,
      options: { choices: ['En allmän fråga om grammatik', 'En anonymiserad mall', 'Kunduppgifter och personnummer', 'Fakta du kan googla'] },
      correct_answer: 'Kunduppgifter och personnummer',
      explanation: 'Personuppgifter, kunddata och avtal ska aldrig in i publika AI-verktyg. Anonymisera alltid.', points: 100 },
  ]} />
);

// ════════════════════════════════════════════════════════════════════
// CHECKLISTA
// ════════════════════════════════════════════════════════════════════
const Checklista = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const items = [
    'Installera Bitwarden och byt lösenord på dina 3 viktigaste konton',
    'Aktivera 2FA med authenticator-app på e-post och bank',
    'Kolla om din e-post läckt på haveibeenpwned.com',
    'Lägg en kreditspärr på UC.se (tar 5 minuter, gratis)',
    'Byt routerns standardlösenord och aktivera WPA3',
    'Aktivera automatisk säkerhetskopiering (iCloud/OneDrive)',
    'Lägg ett kodord med chefen för brådskande betalningar',
    'Spara IT-suppports nummer i kontakterna',
  ];
  return (
    <LightSlide>
      <Badge text="Din checklista · 5 minuter" />
      <H icon={Zap} title="Gör det nu" dark />
      <p className="text-gray-500 text-base mb-6">Bocka av när du är klar — du kan göra det direkt</p>
      <div className="space-y-3">
        {items.map((item, i) => {
          const done = checked.includes(i);
          return (
            <motion.button key={i} onClick={() => toggle(i)} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all"
              style={{ background: done ? `${O}10` : '#fff', border: `2px solid ${done ? O + '50' : '#e5e7eb'}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: done ? O : '#f0f0f0', border: `2px solid ${done ? O : '#d1d5db'}` }}>
                {done && <CheckCircle size={14} color="#fff" />}
              </div>
              <p className="text-sm font-medium" style={{ color: done ? '#b84400' : '#374151', textDecoration: done ? 'line-through' : 'none' }}>
                {item}
              </p>
            </motion.button>
          );
        })}
      </div>
      {checked.length === items.length && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl text-center" style={{ background: `${O}12`, border: `1px solid ${O}40` }}>
          <p className="font-bold text-base" style={{ color: O }}>🎉 Du är nu säkrare än 90% av alla användare!</p>
        </motion.div>
      )}
    </LightSlide>
  );
};

// ════════════════════════════════════════════════════════════════════
// SLUTTEST
// ════════════════════════════════════════════════════════════════════
const Slutprov = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const fragor = [
    { id: 'sq1', question_text: 'Vad är det viktigaste kriteriet för ett starkt lösenord?', question_type: 'single_choice', question_order: 1,
      options: { choices: ['Specialtecken', 'Minst 12 tecken', 'Byts varje månad', 'Innehåller ditt namn'] },
      correct_answer: 'Minst 12 tecken', explanation: 'Längd är viktigast. 16 tecken utan specialtecken slår 8 med.', points: 100 },
    { id: 'sq2', question_text: 'Vilken typ av 2FA är starkast?', question_type: 'single_choice', question_order: 2,
      options: { choices: ['SMS-kod', 'E-postkod', 'Authenticator-app', 'Säkerhetsfråga'] },
      correct_answer: 'Authenticator-app', explanation: 'Genererar koder lokalt — kan inte fångas upp på distans.', points: 100 },
    { id: 'sq3', question_text: '91% av alla cyberattacker börjar med vad?', question_type: 'single_choice', question_order: 3,
      options: { choices: ['Teknisk sårbarhet', 'Phishing-mejl', 'Svagt lösenord', 'Insider-attack'] },
      correct_answer: 'Phishing-mejl', explanation: 'Phishing är vanligaste attackvektorn. Angripare hackar dig — inte tekniken.', points: 100 },
    { id: 'sq4', question_text: 'Vad innebär 3-2-1-regeln?', question_type: 'single_choice', question_order: 4,
      options: { choices: ['3 lösenord, 2 enheter, 1 backup', '3 kopior, 2 medier, 1 offsite', '3 backuper per dag', '3 minuter, 2 knappar, 1 fil'] },
      correct_answer: '3 kopior, 2 medier, 1 offsite', explanation: '3 kopior, 2 olika medier, 1 kopia på annan plats. Branschstandard för backup.', points: 100 },
    { id: 'sq5', question_text: 'Hur lång tid av din röst behöver AI för att klona den?', question_type: 'single_choice', question_order: 5,
      options: { choices: ['30 minuter', '5 minuter', '3 sekunder', '1 timme'] },
      correct_answer: '3 sekunder', explanation: 'Moderna AI-verktyg klarar röstkloning med bara 3 sekunders ljud.', points: 100 },
    { id: 'sq6', question_text: 'Vad ska du ALDRIG lägga in i ett publikt AI-verktyg?', question_type: 'single_choice', question_order: 6,
      options: { choices: ['En allmän grammatikfråga', 'En anonymiserad mall', 'Kunduppgifter och personnummer', 'Offentliga fakta'] },
      correct_answer: 'Kunduppgifter och personnummer', explanation: 'Personuppgifter och kunddata ska aldrig in i publika AI-verktyg.', points: 100 },
  ];

  return (
    <BgSlide bild={IMGS.cyber} overlay="rgba(10,16,28,0.93)">
      <div className="text-center">
        <Badge text="Sluttest · Digital säkerhet för alla" />
        <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Testa dina kunskaper
        </h2>
        <p className="text-white/50 text-sm mb-8">6 frågor · 80% rätt krävs för godkänt</p>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizOpen(true)}
          className="w-full py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 shadow-xl mb-6"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
          <HelpCircle className="w-6 h-6" /> Starta sluttest
        </motion.button>
        <AnimatePresence>
          {isDone && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(16,185,129,0.5)' }}>
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-1">Kurs klar! 🎉</h3>
              <p className="text-white/60 text-sm">Du har klarat Digital säkerhet för alla.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <GdprQuizOverlay
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        questions={fragor}
        passingPercent={80}
        onComplete={(passed: boolean) => { if (passed) onComplete('slutprov'); }}
      />
    </BgSlide>
  );
};

// ════════════════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════════════════
const ModuleDigitalSakerhet: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set<string>(['intro']));
  const [isDesktop, setIsDesktop] = useState(false);
  const [userData] = useState({ name: 'Anna Svensson', avatar: '' });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleComplete = (id: string) =>
    setCompletedLessons(prev => new Set([...prev, id]));

  const slides = [
    // Intro
    { id: 'intro',       title: 'Introduktion',                component: <IntroSlide onStart={() => setCurrentIndex(1)} /> },
    // Modul 1 — Lösenord
    { id: 'm1-skrack',   title: '🔐 Lösenord — 3 434 intrång', component: <M1_Skrack /> },
    { id: 'm1-nulage',   title: '🔐 Hur ser det ut idag?',     component: <M1_Nulage /> },
    { id: 'm1-losning',  title: '🔐 Skapa starka lösenord',    component: <M1_Losning /> },
    { id: 'quiz-m1',     title: '🧠 Quiz: Lösenord',           component: <M1_Quiz onComplete={handleComplete} isDone={completedLessons.has('quiz-m1')} /> },
    // Modul 2 — 2FA
    { id: 'm2-skrack',   title: '📱 2FA — 1,2 miljoner konton',component: <M2_Skrack /> },
    { id: 'm2-nulage',   title: '📱 Tre typer av 2FA',         component: <M2_Nulage /> },
    { id: 'm2-losning',  title: '📱 Aktivera 2FA',             component: <M2_Losning /> },
    { id: 'quiz-m2',     title: '🧠 Quiz: 2FA',                component: <M2_Quiz onComplete={handleComplete} isDone={completedLessons.has('quiz-m2')} /> },
    // Modul 3 — Phishing
    { id: 'm3-skrack',   title: '🎣 Phishing — 4,2 miljoner',  component: <M3_Skrack /> },
    { id: 'm3-losning',  title: '🎣 Stoppa phishing',          component: <M3_Losning /> },
    { id: 'quiz-m3',     title: '🧠 Quiz: Phishing',           component: <M3_Quiz onComplete={handleComplete} isDone={completedLessons.has('quiz-m3')} /> },
    // Modul 4 — Identitet
    { id: 'm4-skrack',   title: '🪪 Identitet — 87 000 fall',  component: <M4_Skrack /> },
    { id: 'm4-losning',  title: '🪪 Skydda din identitet',     component: <M4_Losning /> },
    // Modul 5 — Enheter & nätverk
    { id: 'm5-skrack',   title: '📶 Enheter — 70% osäkra',     component: <M5_Skrack /> },
    { id: 'm5-losning',  title: '📶 Säkra enheter & nätverk',  component: <M5_Losning /> },
    // Modul 6 — Backup
    { id: 'm6-skrack',   title: '💾 Backup — 50% har ingen',   component: <M6_Skrack /> },
    { id: 'm6-losning',  title: '💾 3-2-1-regeln',             component: <M6_Losning /> },
    // Modul 7 — När något gått fel
    { id: 'm7-skrack',   title: '🚨 När det gått fel',         component: <M7_Skrack /> },
    { id: 'm7-losning',  title: '🚨 De första 30 minuterna',   component: <M7_Losning /> },
    // Modul 8 — Phishing på jobbet
    { id: 'm8-skrack',   title: '📧 VD-bedrägeri — 2,3 mkr',  component: <M8_Skrack /> },
    { id: 'm8-losning',  title: '📧 Stoppa VD-bedrägerier',    component: <M8_Losning /> },
    // Modul 9 — GDPR
    { id: 'm9-skrack',   title: '📋 GDPR — 4 mkr i böter',    component: <M9_Skrack /> },
    { id: 'm9-losning',  title: '📋 GDPR i praktiken',        component: <M9_Losning /> },
    // Modul 13 — AI
    { id: 'm13-skrack',  title: '🤖 AI-hot — 270 mkr',        component: <M13_Skrack /> },
    { id: 'm13-data',    title: '🤖 Vad får du lägga i AI?',  component: <M13_Dataskydd /> },
    { id: 'quiz-m13',    title: '🧠 Quiz: AI & säkerhet',      component: <M13_Quiz onComplete={handleComplete} isDone={completedLessons.has('quiz-m13')} /> },
    // Avslut
    { id: 'checklista',  title: '✅ Din 5-minuterschecklista', component: <Checklista /> },
    { id: 'slutprov',    title: '🎯 Sluttest',                  component: <Slutprov isDone={completedLessons.has('slutprov')} onComplete={handleComplete} /> },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: DARK }}>
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
      <div className="flex-1 overflow-hidden"
        style={{ marginLeft: isDesktop ? 'var(--sidebar-width, 320px)' : '0px' }}>
        <ModuleSlideLayout
          slides={slides}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          showHeader={currentIndex > 0}>
          {slides[currentIndex].component}
        </ModuleSlideLayout>
      </div>
      <FloatingFAQ
        faqs={MODULE_FAQ}
        title="Frågor om digital säkerhet"
        subtitle="Vanliga frågor om lösenord, phishing och AI-hot"
        buttonColor={O}
      />
    </div>
  );
};

export default ModuleDigitalSakerhet;