// src/modules/Naringsklivet/ModulePhishing.tsx
// Phishing & social engineering — komplett fristående kurs
// Struktur per modul: Skräckexempel → Nuläge → Lösning → Quiz

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Shield, Mail, Phone, Eye,
  CheckCircle, HelpCircle, Award, Zap, X,
  UserX, Link, MessageSquare, Building
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

const IMGS = {
  phishing: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80',
  email:    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&q=80',
  phone:    'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1920&q=80',
  office:   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  hacker:   'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1920&q=80',
  lock:     'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
  stress:   'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1920&q=80',
  meeting:  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
};

// ── Pusselbitar ───────────────────────────────
const PuzzlePiece = ({ x, y, size = 80, rotation = 0, opacity = 0.06, color = '#ffffff' }: {
  x: string; y: string; size?: number; rotation?: number; opacity?: number; color?: string;
}) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `rotate(${rotation}deg)`, opacity, pointerEvents: 'none' }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M20 20 L40 20 Q40 10 50 10 Q60 10 60 20 L80 20 L80 40 Q90 40 90 50 Q90 60 80 60 L80 80 L60 80 Q60 90 50 90 Q40 90 40 80 L20 80 L20 60 Q10 60 10 50 Q10 40 20 40 Z" fill={color} />
    </svg>
  </div>
);

const PuzzleBg = ({ dark = true }: { dark?: boolean }) => {
  const color = dark ? '#ffffff' : '#0f1623';
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

const BgSlide = ({ bild, children, overlay = 'rgba(15,22,35,0.84)' }: {
  bild: string; children: React.ReactNode; overlay?: string;
}) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: overlay }} />
    <PuzzleBg />
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

const BigStat = ({ val, label, color = '#ef4444' }: { val: string; label: string; color?: string }) => (
  <div className="mb-6">
    <p className="font-black leading-none mb-2" style={{ fontSize: '5rem', color, fontFamily: "'Nunito', sans-serif" }}>{val}</p>
    <p className="text-xl text-white/70">{label}</p>
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

// ── FAQ ───────────────────────────────────────
const MODULE_FAQ = [
  { question: 'Vad är skillnaden på phishing och spear phishing?', answer: 'Phishing skickas massmässigt till tusentals mottagare. Spear phishing är riktad mot en specifik person — angriparen har studerat dig och anpassar mejlet med ditt namn, din roll och aktuella detaljer.' },
  { question: 'Hur vet jag om ett mejl är falskt?', answer: 'Kontrollera avsändaradressen noga (hela domänen, inte bara visningsnamnet), hovra över länkar för att se vart de faktiskt leder, och var extra vaksam om mejlet skapar brådska eller hot.' },
  { question: 'Vad gör jag om jag klickat på en phishing-länk?', answer: '1) Koppla från internet direkt. 2) Byt lösenord på berörda konton. 3) Kontakta IT-support. 4) Anmäl till chefen. Agera snabbt — de första minuterna är avgörande.' },
  { question: 'Kan phishing se ut som ett SMS?', answer: 'Ja — det kallas smishing (SMS-phishing). Vanliga varianter: "Din betalning misslyckades", "Din leverans kräver åtgärd", "Din bank behöver bekräftelse". Klicka aldrig på okända länkar i SMS.' },
  { question: 'Vad är vishing?', answer: 'Vishing är röst-phishing — telefonsamtal där angriparen utger sig för att vara bank, IT-support, myndighet eller chef. De skapar brådska och ber dig bekräfta uppgifter eller genomföra betalningar.' },
  { question: 'Hur skyddar jag mig mot VD-bedrägeri?', answer: 'Ha ett verifieringsprotokoll för alla ovanliga betalningsförfrågningar — ring alltid tillbaka på ett känt nummer. Inför gärna ett kodord med närmaste chef för brådskande situationer.' },
];

// ════════════════════════════════════════════════════
// SLIDE 0 — INTRO
// ════════════════════════════════════════════════════
const IntroSlide = ({ onStart }: { onStart: () => void }) => (
  <ModuleIntroSlide
    kategori="DIGITAL SÄKERHET"
    titel="Phishing & <span style='color:#FF5421'>social engineering</span>"
    ingress="91% av alla cyberattacker börjar med ett phishing-mejl. Lär dig känna igen och stoppa dem — innan det är för sent."
    bild={IMGS.phishing}
    längd="~25 min"
    avsnitt={5}
    onStart={onStart}
    vadLärDuDig={[
      'Vad phishing, spear phishing och whaling är',
      'Känna igen falska mejl, SMS och samtal',
      'Förstå social engineering — hur angripare manipulerar dig',
      'Stoppa VD-bedrägeri och fakturabedrägeri',
      'Vad du gör om du råkat klicka',
    ]}
  />
);

// ════════════════════════════════════════════════════
// MODUL 1 — VAD ÄR PHISHING?
// ════════════════════════════════════════════════════
const M1_Skrack = () => (
  <BgSlide bild={IMGS.phishing} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 1 · Vad är phishing?" />
    <BigStat val="4,2 mkr" label="kostade en enda phishing-attack ett medelstort svenskt företag" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      <span style={{ color: '#ef4444', fontWeight: 800 }}>91% av alla cyberattacker</span> börjar med ett phishing-mejl.
      Angriparen behöver inte hacka tekniken — de hackar <em>dig</em>.
    </p>
    <div className="space-y-3">
      {[
        { ikon: '🎣', titel: 'Phishing', text: 'Massutskick till tusentals mottagare — ett brett nät.' },
        { ikon: '🎯', titel: 'Spear phishing', text: 'Riktat mot en specifik person med personliga detaljer.' },
        { ikon: '🐋', titel: 'Whaling', text: 'Riktat mot chefer och beslutsfattare — högre risk, högre vinst.' },
        { ikon: '📱', titel: 'Smishing', text: 'Phishing via SMS — "Din leverans kräver åtgärd".' },
        { ikon: '📞', titel: 'Vishing', text: 'Röst-phishing — angriparen ringer och utger sig för att vara banken.' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-xl flex-shrink-0">{item.ikon}</span>
          <div>
            <p className="font-bold text-white text-sm">{item.titel}</p>
            <p className="text-white/60 text-xs mt-0.5">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M1_Nulage = () => (
  <BgSlide bild={IMGS.email}>
    <Badge text="Modul 1 · Nuläget" />
    <H icon={Mail} title="Hur ser ett <span style='color:#FF5421'>phishing-mejl</span> ut?" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Moderna phishing-mejl är svåra att skilja från äkta. AI gör dem nu perfekt grammatiska och personliga. Här är de röda flaggorna:
    </p>

    {/* Exempel-mejl */}
    <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.15)', borderBottom: '1px solid rgba(239,68,68,0.3)' }}>
        <Mail size={16} color="#ef4444" />
        <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Falsk avsändare</span>
      </div>
      <div className="p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-white/40 w-16 flex-shrink-0">Från:</span>
            <span className="text-red-400 font-mono">support@swedbank-secure.net</span>
          </div>
          <div className="flex gap-2">
            <span className="text-white/40 w-16 flex-shrink-0">Ämne:</span>
            <span className="text-white/80">⚠️ BRÅDSKANDE: Ditt konto stängs om 24 timmar</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-white/60 leading-relaxed">
            Kära kund, vi har upptäckt misstänkt aktivitet på ditt konto. Du måste bekräfta dina uppgifter omedelbart för att undvika att kontot stängs...
            <span className="text-blue-400 underline ml-1">Klicka här för att verifiera</span>
          </div>
        </div>
      </div>
    </div>

    {/* Röda flaggor */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { flagga: '🚩', text: 'Domänen stämmer inte (swedbank-secure.net ≠ swedbank.se)' },
        { flagga: '🚩', text: 'Skapar brådska — "stängs om 24 timmar"' },
        { flagga: '🚩', text: 'Generisk hälsning — "Kära kund"' },
        { flagga: '🚩', text: 'Ber dig klicka på en länk för att "verifiera"' },
      ].map((f, i) => (
        <div key={i} className="flex items-start gap-2 p-3 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <span className="text-base">{f.flagga}</span>
          <p className="text-xs text-white/70 leading-snug">{f.text}</p>
        </div>
      ))}
    </div>
  </BgSlide>
);

const M1_Losning = () => (
  <SplitSlide
    badge="Modul 1 · Lösningen"
    title="Pausa och <span style='color:#FF5421'>verifiera</span>"
    ingress="Angripare är experter på att skapa stress. Din viktigaste försvarsmekanism är att ta en sekund och tänka innan du klickar."
    bild={IMGS.email}
    bildPosition="right"
    badge2="STOP — TÄNK — VERIFIERA"
    badge2Sub="Tre sekunder kan rädda miljoner">
    <StegLista steg={[
      { nr: '01', titel: 'Kontrollera avsändaradressen', desc: 'Titta på hela domänen — inte bara visningsnamnet. "Swedbank" i visningsnamnet kan dölja en helt annan avsändare.' },
      { nr: '02', titel: 'Hovra över länken', desc: 'Flytta musen över länken utan att klicka. Se vart den faktiskt leder i webbläsarens statusfält.' },
      { nr: '03', titel: 'Ring och verifiera', desc: 'Oväntat mejl om betalning eller inloggning? Ring avsändaren på ett känt nummer — aldrig numret i mejlet.' },
      { nr: '04', titel: 'Lita på magkänslan', desc: 'Om något känns fel — är det förmodligen fel. Det är alltid okej att pausa och fråga en kollega.' },
    ]} />
    <InfoRuta>Banker, myndigheter och IT-avdelningar ber ALDRIG dig klicka på en länk för att "bekräfta" dina uppgifter via mejl.</InfoRuta>
  </SplitSlide>
);

const M1_Quiz = ({ onComplete, isDone }: any) => (
  <BgSlide bild={IMGS.lock} overlay="rgba(10,16,28,0.92)">
    <Badge text="Kunskapstest · Phishing-grunder" />
    <H icon={HelpCircle} title="Testa: Phishing" />
    <InlineQuiz dark onComplete={() => onComplete('quiz-m1')} questions={[
      { id: 'pq1', question_text: 'Vilket är det tydligaste tecknet på ett phishing-mejl?',
        question_type: 'single_choice', question_order: 1,
        options: { choices: ['Det är skickat på kvällen', 'Det skapar brådska och kräver omedelbar handling', 'Det innehåller bilagor', 'Det är skrivet på engelska'] },
        correct_answer: 'Det skapar brådska och kräver omedelbar handling',
        explanation: 'Brådska är angriparens viktigaste vapen — de vill att du agerar utan att tänka. Ta alltid en sekund extra när ett mejl kräver omedelbar handling.', points: 100 },
      { id: 'pq2', question_text: 'Du får ett mejl från "support@swedbank-secure.net". Vad gör du?',
        question_type: 'single_choice', question_order: 2,
        options: { choices: ['Klickar på länken och loggar in', 'Svarar på mejlet och frågar om det stämmer', 'Kontrollerar avsändaradressen och ringer banken direkt', 'Vidarebefordrar till en kollega'] },
        correct_answer: 'Kontrollerar avsändaradressen och ringer banken direkt',
        explanation: '"Swedbank-secure.net" är inte Swedbanks domän (swedbank.se). Ring alltid banken på ett känt nummer — aldrig via kontaktuppgifter i mejlet.', points: 100 },
      { id: 'pq3', question_text: 'Vad kallas phishing via SMS?',
        question_type: 'single_choice', question_order: 3,
        options: { choices: ['Vishing', 'Smishing', 'Whaling', 'Spear phishing'] },
        correct_answer: 'Smishing',
        explanation: 'Smishing = SMS + phishing. Vanliga varianter: "Din leverans kräver åtgärd", "Din betalning misslyckades", "Din bank behöver bekräftelse".', points: 100 },
    ]} />
  </BgSlide>
);

// ════════════════════════════════════════════════════
// MODUL 2 — SOCIAL ENGINEERING
// ════════════════════════════════════════════════════
const M2_Skrack = () => (
  <BgSlide bild={IMGS.hacker} overlay="rgba(10,16,28,0.88)">
    <Badge text="Modul 2 · Social engineering" />
    <BigStat val="95%" label="av alla säkerhetsincidenter har den mänskliga faktorn inblandad" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      Social engineering handlar om att manipulera <em>dig</em> — inte tekniken.
      Angriparen studerar dig, bygger förtroende och utnyttjar grundläggande mänskliga reflexer.
    </p>
    <div className="grid grid-cols-2 gap-3">
      {[
        { känsla: '😰', namn: 'Rädsla', ex: '"Ditt konto stängs om 24h"' },
        { känsla: '🏃', namn: 'Brådska', ex: '"Betala nu — chefen väntar"' },
        { känsla: '🤝', namn: 'Auktoritet', ex: '"Hej, jag ringer från Skatteverket"' },
        { känsla: '🎁', namn: 'Nyfikenhet', ex: '"Du har vunnit ett presentkort"' },
        { känsla: '🫂', namn: 'Hjälpsamhet', ex: '"Kan du bara hålla upp dörren?"' },
        { känsla: '💼', namn: 'Förtroende', ex: '"Din kollega Anna bad mig kontakta dig"' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
          className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{item.känsla}</span>
            <p className="font-bold text-white text-sm">{item.namn}</p>
          </div>
          <p className="text-white/50 text-xs italic">{item.ex}</p>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M2_Nulage = () => (
  <BgSlide bild={IMGS.stress}>
    <Badge text="Modul 2 · Så funkar det" />
    <H icon={UserX} title="Angriparen <span style='color:#FF5421'>studerar dig</span> först" />
    <p className="text-white/70 text-base leading-relaxed mb-6">
      Innan en riktad attack har angriparen ofta spenderat dagar eller veckor på att samla information om dig och din organisation — helt öppet.
    </p>
    <div className="space-y-3 mb-6">
      {[
        { källa: 'LinkedIn', info: 'Din roll, dina kollegor, din chef, dina projekt och kontakter' },
        { källa: 'Företagets hemsida', info: 'Organisationsstruktur, e-postformat, nyheter och pressreleaser' },
        { källa: 'Sociala medier', info: 'Var du befinner dig, vad du jobbar med, privata detaljer' },
        { källa: 'Tidigare dataintrång', info: 'Ditt gamla lösenord, din e-post, ditt telefonnummer' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="flex gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-28 flex-shrink-0">
            <p className="font-bold text-xs" style={{ color: O }}>{item.källa}</p>
          </div>
          <p className="text-white/65 text-sm leading-snug">{item.info}</p>
        </motion.div>
      ))}
    </div>
    <DangerBox>
      💡 Med den här informationen kan angriparen skriva: <strong className="text-white">"Hej Anna, det är Erik på IT. Din chef Marcus bad mig kontakta dig angående inloggningen till projektportalen — kan du bekräfta dina uppgifter?"</strong>
    </DangerBox>
  </BgSlide>
);

const M2_Losning = () => (
  <SplitSlide
    badge="Modul 2 · Lösningen"
    title="Verifiera via <span style='color:#FF5421'>annan kanal</span>"
    ingress="Den viktigaste regeln mot social engineering: verifiera alltid via en separat kanal — inte via kontaktuppgifterna i det misstänkta meddelandet."
    bild={IMGS.phone}
    bildPosition="left"
    badge2="Annan kanal"
    badge2Sub="Aldrig samma mejltråd">
    <StegLista steg={[
      { nr: '🛡️', titel: 'Ifrågasätt ovanliga förfrågningar', desc: 'Legitima organisationer skapar aldrig onödig brådska. En sekunds tvekan är alltid okej.' },
      { nr: '🛡️', titel: 'Ring tillbaka på ett känt nummer', desc: 'Hitta numret på den officiella hemsidan eller i telefonboken — aldrig i mejlet eller SMS:et.' },
      { nr: '🛡️', titel: 'Lämna aldrig ut känslig info via telefon', desc: 'Bank, Skatteverket och IT ringer aldrig och ber om lösenord eller BankID-koder.' },
      { nr: '🛡️', titel: 'Rapportera misstänkta kontaktförsök', desc: 'Berätta för chefen eller IT-säkerhet. Du kanske inte är den enda som blivit kontaktad.' },
    ]} />
    <InfoRuta>Kom ihåg: Det är alltid okej att säga "Jag ringer tillbaka". En legitim person förstår det — en bedragare försöker övertala dig att inte göra det.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════
// MODUL 3 — VD-BEDRÄGERI
// ════════════════════════════════════════════════════
const M3_Skrack = () => (
  <BgSlide bild={IMGS.office} overlay="rgba(10,16,28,0.87)">
    <Badge text="Modul 3 · VD-bedrägeri & fakturabedrägeri" />
    <BigStat val="2,3 mkr" label="betalade en bokförare till fel konto efter ett falskt VD-mejl" />
    <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
      BEC — Business Email Compromise — är en av de snabbast växande attacktyperna.
      <span style={{ color: '#ef4444', fontWeight: 800 }}> Globalt förlorades 43 miljarder dollar</span> på denna typ av bedrägeri 2023.
    </p>
    <div className="space-y-3">
      {[
        { typ: 'VD-mejl', desc: 'Angriparen utger sig för att vara VD eller chef och ber om en brådskande betalning — "ring inte, svara bara på mejlet".' },
        { typ: 'Leverantörsbedrägeri', desc: 'Ni får ett mejl från en "leverantör" om byte av bankkontonummer. Pengarna hamnar hos bedragaren.' },
        { typ: 'Fakturabedrägeri', desc: 'Falska fakturor skickas som ser äkta ut — rätt logotyp, rätt format, fel bankgiro.' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-bold text-sm mb-1" style={{ color: O }}>{item.typ}</p>
          <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </BgSlide>
);

const M3_Losning = () => (
  <SplitSlide
    badge="Modul 3 · Lösningen"
    title="Stoppa <span style='color:#FF5421'>VD-bedrägerier</span>"
    ingress="En enkel rutin kan spara miljoner. Alla ovanliga betalningsförfrågningar ska verifieras via telefon — oavsett vem som verkar ha skickat dem."
    bild={IMGS.meeting}
    bildPosition="right"
    badge2="Ring och bekräfta"
    badge2Sub="Alltid vid ovanliga betalningar">
    <StegLista steg={[
      { nr: '🚩', titel: '"Ring inte — svara bara på mejlet"', desc: 'Det är den starkaste röda flaggan. Lägg alltid på och ring via ett känt nummer.' },
      { nr: '🚩', titel: 'Byte av bankkontonummer', desc: 'Ring leverantören på ett gammalt känt nummer och bekräfta innan du ändrar något.' },
      { nr: '🚩', titel: 'Brådska + sekretess', desc: '"Berätta inte för någon" är alltid fel. Inga legitima chefer ber om det.' },
      { nr: '✓', titel: 'Inför ett verifieringsprotokoll', desc: 'Alla betalningar över X kronor eller till nya konton kräver muntlig bekräftelse. Dokumentera rutinen.' },
    ]} />
    <InfoRuta>Tips: Skapa ett kodord med din chef för brådskande betalningsförfrågningar. Enkelt, effektivt och svårt för angripare att replikera.</InfoRuta>
  </SplitSlide>
);

// ════════════════════════════════════════════════════
// MODUL 4 — OM DU KLICKAT
// ════════════════════════════════════════════════════
const M4_Akut = () => (
  <LightSlide>
    <Badge text="Modul 4 · Om det händer" />
    <H icon={AlertTriangle} title="Du har klickat — <span style='color:#FF5421'>agera nu</span>" dark />
    <p className="text-gray-600 text-base leading-relaxed mb-6">
      Panik hjälper inte — snabb och metodisk handling gör det. De första minuterna är avgörande.
    </p>
    <div className="space-y-3 mb-6">
      {[
        { tid: '0–2 min', steg: 'Koppla från internet', desc: 'Stäng av WiFi eller dra ur nätverkskabeln. Hindrar eventuell skadlig kod från att kommunicera hem.', color: '#ef4444' },
        { tid: '2–5 min', steg: 'Byt lösenord', desc: 'Börja med e-posten — den ger tillgång till allt annat. Gör det från en annan enhet.', color: O },
        { tid: '5–10 min', steg: 'Kontakta IT-support', desc: 'Ring direkt — inte via mejl. Berätta exakt vad som hände och när.', color: '#f59e0b' },
        { tid: '10–15 min', steg: 'Informera chefen', desc: 'Transparens är avgörande. Fördröjd rapportering förvärrar alltid situationen.', color: '#10b981' },
        { tid: 'Senare', steg: 'Polisanmäl', desc: 'Anmäl alltid — det hjälper andra och kan behövas för försäkringsändamål.', color: '#6366f1' },
      ].map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="flex gap-4 p-3 rounded-xl"
          style={{ background: '#fff', border: `2px solid ${item.color}30`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="w-16 flex-shrink-0 text-center">
            <p className="text-xs font-bold" style={{ color: item.color }}>{item.tid}</p>
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-gray-800 mb-0.5">{item.steg}</p>
            <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="rounded-xl p-4" style={{ background: OL, border: `1px solid ${O}30` }}>
      <p className="text-sm text-gray-700 leading-relaxed">
        💡 <strong>Det viktigaste:</strong> Skäms inte för att du klickat. Det händer alla — även IT-proffs. Det avgörande är hur snabbt du rapporterar.
      </p>
    </div>
  </LightSlide>
);

// ════════════════════════════════════════════════════
// CHECKLISTA
// ════════════════════════════════════════════════════
const Checklista = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);
  const items = [
    'Kontrollera alltid hela avsändaradressen — inte bara visningsnamnet',
    'Hovra över länkar innan du klickar för att se vart de leder',
    'Ring tillbaka på ett känt nummer vid ovanliga förfrågningar',
    'Inför kodord med chefen för brådskande betalningar',
    'Rapportera misstänkta mejl till IT-support',
    'Spara IT-suppports telefonnummer i kontakterna nu',
  ];
  return (
    <LightSlide>
      <Badge text="Din checklista · 5 minuter" />
      <H icon={Zap} title="Gör det nu" dark />
      <p className="text-gray-500 text-base mb-6">Bocka av när du är klar</p>
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
          <p className="font-bold text-base" style={{ color: O }}>🎉 Du är nu bättre rustad än de flesta mot phishing!</p>
        </motion.div>
      )}
    </LightSlide>
  );
};

// ════════════════════════════════════════════════════
// SLUTTEST
// ════════════════════════════════════════════════════
const Slutprov = ({ isDone, onComplete }: { isDone: boolean; onComplete: (id: string) => void }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const fragor = [
    { id: 'sq1', question_text: 'Vad är spear phishing?',
      question_type: 'single_choice', question_order: 1,
      options: { choices: ['Massutskick till tusentals mottagare', 'Riktad attack mot en specifik person med personliga detaljer', 'Phishing via SMS', 'Phishing via telefon'] },
      correct_answer: 'Riktad attack mot en specifik person med personliga detaljer',
      explanation: 'Spear phishing är skräddarsytt mot en specifik person — angriparen har studerat dig och anpassat meddelandet med dina uppgifter.', points: 100 },
    { id: 'sq2', question_text: 'Vilken känsla utnyttjar angripare mest effektivt?',
      question_type: 'single_choice', question_order: 2,
      options: { choices: ['Nyfikenhet', 'Glädje', 'Brådska och rädsla', 'Tristess'] },
      correct_answer: 'Brådska och rädsla',
      explanation: 'Brådska och rädsla stänger av kritiskt tänkande. Angripare skapar alltid en känsla av att du måste agera omedelbart.', points: 100 },
    { id: 'sq3', question_text: 'Du får ett mejl från "chefen" om en brådskande betalning. Vad gör du?',
      question_type: 'single_choice', question_order: 3,
      options: { choices: ['Genomför betalningen direkt', 'Svarar på mejlet för bekräftelse', 'Ringer chefen på ett känt nummer', 'Vidarebefordrar till ekonomi'] },
      correct_answer: 'Ringer chefen på ett känt nummer',
      explanation: 'Ring alltid tillbaka via ett nummer du vet är korrekt — aldrig via kontaktuppgifter i mejlet. Mejlet kan vara kapat eller förfalskat.', points: 100 },
    { id: 'sq4', question_text: 'Vad är det första du gör om du klickat på en phishing-länk?',
      question_type: 'single_choice', question_order: 4,
      options: { choices: ['Startar om datorn', 'Kopplar från internet', 'Byter lösenord', 'Berättar för chefen'] },
      correct_answer: 'Kopplar från internet',
      explanation: 'Koppla från internet omedelbart — det hindrar eventuell skadlig kod från att kommunicera med angriparen. Sedan byter du lösenord från en annan enhet.', points: 100 },
    { id: 'sq5', question_text: 'En leverantör mejlar och vill byta bankkontonummer. Vad gör du?',
      question_type: 'single_choice', question_order: 5,
      options: { choices: ['Uppdaterar direkt i systemet', 'Svarar på mejlet och bekräftar', 'Ringer leverantören på ett gammalt känt nummer', 'Frågar en kollega om det verkar rimligt'] },
      correct_answer: 'Ringer leverantören på ett gammalt känt nummer',
      explanation: 'Leverantörsbedrägerier är vanliga. Ring alltid på ett nummer du haft sedan tidigare — aldrig på numret i det nya mejlet.', points: 100 },
  ];

  return (
    <BgSlide bild={IMGS.lock} overlay="rgba(10,16,28,0.93)">
      <div className="text-center">
        <Badge text="Sluttest · Phishing & social engineering" />
        <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Testa dina kunskaper
        </h2>
        <p className="text-white/50 text-sm mb-8">5 frågor · 80% rätt krävs för godkänt</p>
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
              <p className="text-white/60 text-sm">Du har klarat Phishing & social engineering.</p>
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

// ════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════
const ModulePhishing: React.FC = () => {
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
    { id: 'intro',       title: 'Introduktion',                      component: <IntroSlide onStart={() => setCurrentIndex(1)} /> },
    // Modul 1 — Vad är phishing?
    { id: 'm1-skrack',   title: '🎣 Phishing — 4,2 miljoner kr',     component: <M1_Skrack /> },
    { id: 'm1-nulage',   title: '🎣 Hur ser ett phishing-mejl ut?',  component: <M1_Nulage /> },
    { id: 'm1-losning',  title: '🎣 Pausa och verifiera',            component: <M1_Losning /> },
    { id: 'quiz-m1',     title: '🧠 Quiz: Phishing-grunder',         component: <M1_Quiz onComplete={handleComplete} isDone={completedLessons.has('quiz-m1')} /> },
    // Modul 2 — Social engineering
    { id: 'm2-skrack',   title: '🎭 Social engineering — 95%',       component: <M2_Skrack /> },
    { id: 'm2-nulage',   title: '🎭 Angriparen studerar dig',        component: <M2_Nulage /> },
    { id: 'm2-losning',  title: '🎭 Verifiera via annan kanal',      component: <M2_Losning /> },
    // Modul 3 — VD-bedrägeri
    { id: 'm3-skrack',   title: '💼 VD-bedrägeri — 2,3 mkr',        component: <M3_Skrack /> },
    { id: 'm3-losning',  title: '💼 Stoppa VD-bedrägerier',          component: <M3_Losning /> },
    // Modul 4 — Om det händer
    { id: 'm4-akut',     title: '🚨 Om du klickat — agera nu',      component: <M4_Akut /> },
    // Avslut
    { id: 'checklista',  title: '✅ Din checklista',                  component: <Checklista /> },
    { id: 'slutprov',    title: '🎯 Sluttest',                        component: <Slutprov isDone={completedLessons.has('slutprov')} onComplete={handleComplete} /> },
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
        title="Frågor om phishing"
        subtitle="Vanliga frågor om phishing och social engineering"
        buttonColor={O}
      />
    </div>
  );
};

export default ModulePhishing;