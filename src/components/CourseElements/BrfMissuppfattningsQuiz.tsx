// src/components/CourseElements/BrfMissuppfattningsQuiz.tsx
// Fristående quiz-komponent — BRF vanliga missuppfattningar
// Importeras precis som ScenarioAndrahand i ModuleStyrelsenArbete
// Stil: exakt samma som QuizSalesPage (persona-bubbla vänster, vit panel höger)

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, ChevronRight, RotateCcw,
  Award, HelpCircle, X
} from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

// ─────────────────────────────────────────────
// TYPER
// ─────────────────────────────────────────────
interface Alternativ {
  text: string;
  korrekt: boolean;
  feedback: string;
}

interface Fraga {
  id: number;
  persona: string;
  roll: string;
  bild: string;
  kategori: string;
  bubbla: string;
  fraga: string;
  alternativ: Alternativ[];
  tips: string[];
}

interface Props {
  onComplete?: (id: string) => void;
  isDone?: boolean;
  /** Bakgrundsbild bakom persona-sidan (vänster). Default: kontorsbild */
  bakgrundsbild?: string;
}

// ─────────────────────────────────────────────
// FRÅGOR — vanliga missuppfattningar i BRF
// ─────────────────────────────────────────────
const fragor: Fraga[] = [
  {
    id: 1,
    persona: 'Fatima', roll: 'Ny bostadsrättsinnehavare, BRF Lönnen',
    bild: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    kategori: 'Ägande',
    bubbla: '"Jag köpte lägenheten för 3 miljoner — den är ju min. Jag kan göra precis vad jag vill med den?"',
    fraga: 'Vad äger egentligen Fatima?',
    alternativ: [
      { text: 'Lägenheten och sin andel av hela fastigheten', korrekt: false, feedback: 'Inte riktigt. Lägenheten i sig är fast egendom som ägs av föreningen — inte av Fatima.' },
      { text: 'En bostadsrätt — en andel i föreningen med nyttjanderätt till lägenheten', korrekt: true, feedback: 'Precis rätt. Bostadsrätten är lös egendom. Fatima äger rätten att bo där, medan föreningen äger fastigheten.' },
      { text: 'Ingenting — hon hyr av föreningen', korrekt: false, feedback: 'Fel. Bostadsrätt och hyresrätt är helt olika upplåtelseformer. Fatima äger en andel i föreningen.' },
      { text: 'Lägenheten, men inte marken den står på', korrekt: false, feedback: 'Fel. Varken lägenheten eller marken ägs av Fatima — det är föreningen som äger fastigheten.' },
    ],
    tips: [
      'Fastigheten (mark + byggnad) = fast egendom, ägs av föreningen',
      'Bostadsrätten = lös egendom, ägs av dig',
      'Din rätt att bo kvar är trygg — men du äger rätten, inte lägenheten',
    ],
  },
  {
    id: 2,
    persona: 'Björn', roll: 'Styrelseledamot, BRF Granskogen',
    bild: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    kategori: 'Beslutsmässighet',
    bubbla: '"Vi är fem i styrelsen. Tre är bortresta. Kan jag och ordföranden besluta ändå — vi är ju två?"',
    fraga: 'Är styrelsen beslutsmässig med två av fem ledamöter?',
    alternativ: [
      { text: 'Ja — ordföranden och en till räcker alltid', korrekt: false, feedback: 'Fel. Ordföranden har ingen särskild rätt att ensam bilda beslutsunderlag med bara en ledamot.' },
      { text: 'Ja — om besluten inte är viktiga', korrekt: false, feedback: 'Fel. Det finns ingen distinktion i lagen om "viktiga" och "oviktiga" beslut när det gäller beslutsmässighet.' },
      { text: 'Nej — minst hälften måste vara närvarande, dvs. minst 3 av 5', korrekt: true, feedback: 'Rätt. Mer än hälften av ledamöterna måste vara närvarande. Med 5 ledamöter krävs minst 3.' },
      { text: 'Det beror på vad stadgarna säger om ordförandens befogenhet', korrekt: false, feedback: 'Stadgarna kan aldrig undanta kravet på beslutsmässighet. Men de kan ställa strängare krav.' },
    ],
    tips: [
      'Mer än hälften av ledamöterna = beslutsmässigt',
      'Suppleanter kan kallas in för att uppnå beslutsmässighet',
      'Beslut utan beslutsmässighet kan vara juridiskt ogiltiga',
    ],
  },
  {
    id: 3,
    persona: 'Helena', roll: 'Nybliven ordförande, BRF Ekbacken',
    bild: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    kategori: 'Likhetsprincipen',
    bubbla: '"En granne på plan 4 fick tillstånd att sätta upp en markis. Nu vill grannen bredvid samma sak — men vi tycker det blir för många. Kan vi säga nej?"',
    fraga: 'Vad säger likhetsprincipen om detta?',
    alternativ: [
      { text: 'Ja — styrelsen kan alltid ompröva sin policy', korrekt: false, feedback: 'Att ompröva en policy är okej, men det kräver sakliga skäl som gäller framåt — inte godtyckliga undantag.' },
      { text: 'Nej — alla medlemmar ska behandlas lika utan godtyckliga undantag', korrekt: true, feedback: 'Rätt. Likhetsprincipen innebär att styrelsen inte får missgynna en enskild medlem utan sakliga skäl. Samma förutsättningar ska ge samma svar.' },
      { text: 'Ja — om styrelsen är enig i beslutet', korrekt: false, feedback: 'Enhällighet gör inte ett diskriminerande beslut lagligt. Likhetsprincipen gäller oavsett hur styrelsen röstar.' },
      { text: 'Det beror på om markiserna ser likadana ut', korrekt: false, feedback: 'Utseendet avgör inte saken. Frågan är om omständigheterna är de samma — och om de är det måste styrelsen behandla dem lika.' },
    ],
    tips: [
      'Samma förutsättningar = samma beslut',
      'Vill ni ändra policy — gör det explicit och tillämpa det framåt',
      'Dokumentera alltid motiveringen bakom avvikande beslut',
    ],
  },
  {
    id: 4,
    persona: 'Rolf', roll: 'Kassör, BRF Tallkotten',
    bild: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&q=80',
    kategori: 'Underhållsansvar',
    bubbla: '"Vattnet rinner in längs ett rör inne i Annas vägg. Hon kräver att föreningen fixar det. Vi menar att det är hennes ansvar — det är ju i hennes lägenhet."',
    fraga: 'Vems ansvar är läckande ledningar inne i väggen?',
    alternativ: [
      { text: 'Alltid innehavarens — allt innanför dörren är hennes', korrekt: false, feedback: 'Fel. Ansvaret avgörs inte av var ledningen är placerad, utan av vad den betjänar.' },
      { text: 'Alltid föreningens — föreningen äger fastigheten', korrekt: false, feedback: 'Fel. Innehavaren ansvarar för en del av underhållet, även om föreningen äger fastigheten.' },
      { text: 'Stamledningar och sådana som betjänar flera lägenheter är föreningens ansvar', korrekt: true, feedback: 'Rätt. Ledningar som ingår i stammen eller betjänar fler lägenheter = föreningens ansvar. Ledningar som bara betjänar Annas lägenhet = hennes ansvar.' },
      { text: 'Det avgörs av hur gammal ledningen är', korrekt: false, feedback: 'Ålder avgör inte ansvaret. Det är ledningens funktion och om den betjänar en eller flera lägenheter som räknas.' },
    ],
    tips: [
      'Stamledning = föreningens ansvar',
      'Ledning enbart till din lägenhet = ditt ansvar',
      'Kontrollera stadgarna — de kan precisera ansvarsfördelningen',
    ],
  },
  {
    id: 5,
    persona: 'Susanne', roll: 'Sekreterare, BRF Forsen',
    bild: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
    kategori: 'Protokoll',
    bubbla: '"Vi fattade ett beslut förra mötet. En ledamot ringer nu och vill att vi ändrar formuleringen i protokollet — det låter bättre så."',
    fraga: 'Kan ett justerat protokoll ändras i efterhand?',
    alternativ: [
      { text: 'Ja — om alla ledamöter är eniga', korrekt: false, feedback: 'Fel. Ett justerat och undertecknat protokoll är en officiell handling. Enighet i styrelsen ändrar inte det.' },
      { text: 'Ja — sekreteraren kan alltid rätta felaktigheter', korrekt: false, feedback: 'Uppenbara felskrivningar kan rättas, men substansen i ett justerat protokoll får inte ändras utan formellt beslut.' },
      { text: 'Nej — fel i ett justerat protokoll rättas via ett nytt beslut på nästa möte', korrekt: true, feedback: 'Rätt. Det justerade protokollet är oföränderligt. Eventuella rättelser hanteras formellt på nästa möte.' },
      { text: 'Det spelar ingen roll — protokoll är interna dokument utan juridisk betydelse', korrekt: false, feedback: 'Fel. Protokoll är officiella handlingar som kan behövas vid tvister, myndighetskontakter och revisioner.' },
    ],
    tips: [
      'Justerat protokoll = officiellt dokument, kan inte ändras',
      'Rättelse sker via nytt beslut på nästa möte',
      'Spara alla protokoll — de är juridiskt viktiga',
    ],
  },
  {
    id: 6,
    persona: 'Marcus', roll: 'Nyinflyttad, BRF Viken',
    bild: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&q=80',
    kategori: 'Rösträtt',
    bubbla: '"Min sambo och jag bor i lägenheten tillsammans. Vi borde väl få rösta på stämman, båda två?"',
    fraga: 'Har Marcus sambo rösträtt på föreningsstämman?',
    alternativ: [
      { text: 'Ja — alla som bor i huset har rösträtt', korrekt: false, feedback: 'Fel. Det är inte boende i huset som ger rösträtt, utan formellt medlemskap i föreningen.' },
      { text: 'Ja — sambor är automatiskt medlemmar', korrekt: false, feedback: 'Fel. Sambor är inte automatiska medlemmar. Medlemskapet följer den som köpt och registrerats för bostadsrätten.' },
      { text: 'Nej — rösträtt kräver formellt medlemskap, och sambor är inte automatiskt medlemmar', korrekt: true, feedback: 'Rätt. Bara den som är registrerad som medlem i föreningens register har rösträtt. Sambos, makar och anhöriga är inte automatiska medlemmar.' },
      { text: 'Det beror på om de är gifta eller sambor', korrekt: false, feedback: 'Civilstånd påverkar inte saken. Varken makar eller sambor är automatiskt medlemmar.' },
    ],
    tips: [
      'Rösträtt = formellt medlemskap i föreningens register',
      'Makar, sambor och barn är inte automatiska medlemmar',
      'Styrelsen ansvarar för att hålla medlemsregistret korrekt',
    ],
  },
  {
    id: 7,
    persona: 'Ingrid', roll: 'Ordförande, BRF Stenhuset',
    bild: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80',
    kategori: 'Stämmobeslut',
    bubbla: '"Vi vill ta ett lån på 4 miljoner för att renovera fasaden. En ledamot säger att vi kan besluta det själva — det är väl löpande förvaltning?"',
    fraga: 'Kan styrelsen besluta om ett större fasadlån utan stämman?',
    alternativ: [
      { text: 'Ja — lån är alltid löpande förvaltning', korrekt: false, feedback: 'Fel. Lån som väsentligt påverkar föreningens ekonomi faller utanför styrelsens löpande förvaltning.' },
      { text: 'Ja — om kassören godkänner', korrekt: false, feedback: 'Fel. Kassören har ingen individuell beslutanderätt att godkänna större lån.' },
      { text: 'Nej — åtgärder som väsentligt förändrar föreningens ekonomi kräver stämmobeslut', korrekt: true, feedback: 'Rätt. Styrelsen hanterar löpande förvaltning. Beslut som väsentligt förändrar föreningens ekonomiska situation kräver stämmans mandat.' },
      { text: 'Det beror på om summan överstiger 5 miljoner', korrekt: false, feedback: 'Det finns ingen generell beloppsgräns i lagen. Det avgörande är om åtgärden är ordinär förvaltning eller en väsentlig förändring.' },
    ],
    tips: [
      'Löpande förvaltning = styrelsebeslut',
      'Väsentliga ekonomiska förändringar = stämmobeslut',
      'Kontrollera stadgarna för era eventuella beloppsgränser',
    ],
  },
  {
    id: 8,
    persona: 'Pernilla', roll: 'Ledamot, BRF Almhagen',
    bild: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    kategori: 'Förvaltaren',
    bubbla: '"Vår förvaltare har tecknat ett nytt städavtal utan att fråga oss. De sköter ju det löpande — det är väl deras jobb?"',
    fraga: 'Vem bär det juridiska ansvaret för avtal som förvaltaren tecknar?',
    alternativ: [
      { text: 'Förvaltaren — de har mandat att agera självständigt', korrekt: false, feedback: 'Fel. Förvaltaren är en extern leverantör som arbetar på styrelsens uppdrag, inte med självständigt mandat.' },
      { text: 'Ansvaret delas lika mellan styrelsen och förvaltaren', korrekt: false, feedback: 'Fel. Det juridiska ansvaret vilar alltid på styrelsen. Förvaltaren kan ha kontraktsansvar, men styrelsen är ytterst ansvarig gentemot föreningen.' },
      { text: 'Styrelsen — de har alltid det yttersta juridiska ansvaret', korrekt: true, feedback: 'Rätt. Förvaltaren är en leverantör. Det är alltid styrelsen som bär det yttersta ansvaret för vad som sker i föreningens namn.' },
      { text: 'Stämman — eftersom de valde att anlita förvaltaren', korrekt: false, feedback: 'Fel. Stämman väljer styrelsen, och styrelsen ansvarar för att anlita och följa upp förvaltaren.' },
    ],
    tips: [
      'Förvaltaren = leverantör, arbetar på styrelsens uppdrag',
      'Styrelsen bär alltid det juridiska ansvaret',
      'Kräv tydliga rapporter och följ upp leveransen löpande',
    ],
  },
];

const maxPoäng = fragor.length * 100;

// ─────────────────────────────────────────────
// HJÄLPKOMPONENT: Alternativknapp
// ─────────────────────────────────────────────
const AlternativKnapp = ({
  alt, valt, visar, onVälj,
}: {
  alt: Alternativ; valt: string | null; visar: boolean; onVälj: (t: string) => void;
}) => {
  const isValt             = valt === alt.text;
  const visaRes            = visar && isValt;
  const isCorrectUnselected = visar && alt.korrekt && !isValt;

  return (
    <motion.button
      onClick={() => !visar && onVälj(alt.text)}
      whileHover={!visar ? { scale: 1.01, boxShadow: `0 4px 20px ${O}25`, borderColor: O } : {}}
      whileTap={!visar ? { scale: 0.98 } : {}}
      style={{
        width: '100%', textAlign: 'left',
        padding: '16px 18px', minHeight: 60,
        borderRadius: 14,
        background: visaRes
          ? (alt.korrekt ? `${O}15` : 'rgba(80,80,90,0.08)')
          : isCorrectUnselected ? `${O}08`
          : isValt ? OL : '#fff',
        border: `2px solid ${
          visaRes ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}50`
          : isValt ? O : '#e5e7eb'
        }`,
        cursor: visar ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 14,
        transition: 'all 0.18s',
        boxShadow: isValt && !visar ? `0 4px 16px ${O}20` : 'none',
      }}>
      {/* Radio-cirkel */}
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: visaRes
          ? (alt.korrekt ? O : '#9ca3af')
          : isCorrectUnselected ? `${O}30`
          : isValt ? O : '#f0f0f0',
        border: `2px solid ${visaRes ? 'transparent' : isValt ? O : '#d1d5db'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900,
        color: isValt || visaRes ? '#fff' : '#9ca3af',
        transition: 'all 0.18s',
      }}>
        {visaRes ? (alt.korrekt ? '✓' : '✗') : isValt ? '●' : null}
      </div>
      <p style={{
        fontSize: 15, lineHeight: 1.5, flex: 1,
        color: visaRes ? (alt.korrekt ? '#b84400' : '#6b7280') : '#1f2937',
        fontWeight: isValt ? 700 : 500,
      }}>
        {alt.text}
      </p>
    </motion.button>
  );
};

// ─────────────────────────────────────────────
// HUVUD-KOMPONENT
// ─────────────────────────────────────────────
export default function BrfMissuppfattningsQuiz({
  onComplete,
  isDone = false,
  bakgrundsbild = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
}: Props) {
  const [fas, setFas]     = useState<'intro' | 'quiz' | 'result'>('intro');
  const [idx, setIdx]     = useState(0);
  const [valt, setValt]   = useState<string | null>(null);
  const [visar, setVisar] = useState(false);
  const [poäng, setPoäng] = useState(0);
  const [rätt, setRätt]   = useState(0);
  const [svar, setSvar]   = useState<boolean[]>([]);

  const current  = fragor[idx];
  const valtAlt  = valt ? current.alternativ.find(a => a.text === valt) : null;
  const pctNow   = Math.round((poäng / maxPoäng) * 100);

  const handleVälj = (text: string) => {
    if (visar) return;
    const alt = current.alternativ.find(a => a.text === text)!;
    setValt(text);
    setVisar(true);
    if (alt.korrekt) { setPoäng(p => p + 100); setRätt(r => r + 1); }
    setSvar(s => [...s, alt.korrekt]);
  };

  const handleNästa = () => {
    if (idx < fragor.length - 1) {
      setIdx(i => i + 1);
      setValt(null);
      setVisar(false);
    } else {
      setFas('result');
      onComplete?.('brf-missuppfattningar');
    }
  };

  const handleOm = () => {
    setFas('intro');
    setIdx(0);
    setValt(null);
    setVisar(false);
    setPoäng(0);
    setRätt(0);
    setSvar([]);
  };

  const progress = ((idx) / fragor.length) * 100;

  // ── INTRO ────────────────────────────────
  if (fas === 'intro') {
    return (
      <div className="h-full relative overflow-hidden flex items-center justify-center"
        style={{ background: '#0f1623' }}>
        <img src={bakgrundsbild} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(15,22,35,0.97) 0%, rgba(15,22,35,0.85) 100%)' }} />
        <div className="relative z-10 max-w-lg mx-auto px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
            style={{ background: `${O}22`, color: O, border: `1px solid ${O}44` }}>
            <HelpCircle size={13} /> Vanliga missuppfattningar · {fragor.length} situationer
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            Vad tror du att du vet om <span style={{ color: O }}>BRF-reglerna?</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Dessa är de vanligaste misstagen och missuppfattningarna i bostadsrättsföreningar.
            Testa hur du klarar dig — och lär dig av svaren.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { val: `${fragor.length}`, label: 'Situationer' },
              { val: '~8 min',           label: 'Tid' },
              { val: 'Praktisk',         label: 'Fokus' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-lg font-black text-white">{s.val}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          {isDone && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-semibold"
              style={{ background: `${O}20`, color: O, border: `1px solid ${O}40` }}>
              ✓ Du har redan genomfört detta quiz
            </div>
          )}
          <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => setFas('quiz')}
            className="w-full py-5 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 8px 32px ${O}45` }}>
            {isDone ? 'Gör om quizet' : 'Starta quizet'} <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    );
  }

  // ── RESULT ───────────────────────────────
  if (fas === 'result') {
    const label = pctNow >= 80 ? 'Utmärkt! Du kan det här.' : pctNow >= 50 ? 'Bra jobbat — men några luckor finns kvar.' : 'Det finns mer att lära sig — och det är precis vad kursen ger dig.';
    return (
      <div className="h-full relative overflow-hidden flex items-center justify-center"
        style={{ background: '#0f1623' }}>
        <img src={bakgrundsbild} alt="" className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,16,28,0.9)' }} />
        <div className="relative z-10 max-w-md mx-auto px-8 py-12 text-center space-y-6">
          <Award size={48} style={{ color: O, margin: '0 auto' }} />
          <div>
            <p className="text-6xl font-black text-white">{pctNow}%</p>
            <p className="text-white/40 mt-1">{rätt} av {fragor.length} rätt</p>
          </div>
          <div className="flex justify-center gap-2">
            {svar.map((r, i) => (
              <div key={i} className="w-3 h-3 rounded-full"
                style={{ background: r ? O : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <p className="text-white/70 text-base leading-relaxed">{label}</p>
          <button onClick={handleOm}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
            <RotateCcw size={14} /> Gör om quizet
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Bakgrund */}
      <img src={bakgrundsbild} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,16,28,0.88)', zIndex: 1 }} />

      {/* ── TOPBAR ── */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(to right, ${O}, ${OD})` }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px',
          background: 'rgba(10,16,28,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O }}>
              {current.kategori}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              {idx + 1} / {fragor.length}
            </span>
          </div>
          {/* Dot-indikatorer */}
          <div style={{ display: 'flex', gap: 4, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {fragor.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 20 : 8, height: 8, borderRadius: 4,
                background: i < idx
                  ? (svar[i] ? O : 'rgba(255,255,255,0.2)')
                  : i === idx ? O : 'rgba(255,255,255,0.12)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
          <button onClick={handleOm}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <X size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>
      </div>

      {/* ── DESKTOP: vänster + höger ── */}
      <div className="hidden lg:grid flex-1"
        style={{ gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 10, overflow: 'hidden' }}>

        {/* VÄNSTER — persona + bubbla */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '48px 56px', height: '100%',
        }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

              {/* Persona */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%', maxWidth: 520 }}>
                <img src={current.bild} alt={current.persona}
                  style={{
                    width: 90, height: 90, borderRadius: '50%', objectFit: 'cover',
                    border: `4px solid ${O}`, boxShadow: `0 0 20px ${O}40`, flexShrink: 0,
                  }} />
                <div>
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{current.persona}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{current.roll}</p>
                </div>
              </div>

              {/* Bubbla */}
              <div style={{
                padding: '40px 48px', borderRadius: 28,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                maxWidth: 520, width: '100%',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              }}>
                <p style={{ fontSize: 22, color: '#fff', lineHeight: 1.55, fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
                  {current.bubbla}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HÖGER — vit panel */}
        <div style={{
          background: '#FAFAF8', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '36px 44px',
        }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`q${idx}`}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                <h3 style={{
                  fontSize: 26, fontWeight: 900, color: '#111827',
                  lineHeight: 1.35, fontFamily: "'Nunito', sans-serif", marginBottom: 24,
                }}>
                  {current.fraga}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`f${idx}`}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}>
                {/* Feedback */}
                <div style={{
                  padding: '18px 22px', borderRadius: 14, marginBottom: 16,
                  background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)',
                  border: `2px solid ${valtAlt?.korrekt ? O + '50' : '#9ca3af40'}`,
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  {valtAlt?.korrekt
                    ? <CheckCircle size={22} style={{ color: O, flexShrink: 0, marginTop: 2 }} />
                    : <XCircle    size={22} style={{ color: '#9ca3af', flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 6 }}>
                      {valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}
                    </p>
                    <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65 }}>{valtAlt?.feedback}</p>
                  </div>
                </div>

                {/* Tips */}
                <div style={{
                  padding: '14px 18px', borderRadius: 12,
                  background: OL, border: `1px solid ${O}30`, marginBottom: 16,
                }}>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: O, marginBottom: 8 }}>
                    Kom ihåg
                  </p>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                      <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{tip}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleNästa}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 14,
                    cursor: 'pointer', border: 'none', color: '#fff',
                    fontSize: 16, fontWeight: 800,
                    background: `linear-gradient(135deg, ${O}, ${OD})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: `0 6px 24px ${O}40`,
                  }}>
                  {idx < fragor.length - 1
                    ? <>Nästa situation <ChevronRight size={17} /></>
                    : <>Se mitt resultat <ChevronRight size={17} /></>}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBIL ── */}
      <div className="lg:hidden flex-1" style={{ position: 'relative', zIndex: 10, overflowY: 'auto' }}>
        {/* Persona-rad */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
            <img src={current.bild} alt={current.persona}
              style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${O}`, flexShrink: 0, marginTop: 4 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{current.persona}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{current.roll}</p>
              <div style={{
                padding: '10px 14px', borderRadius: '4px 14px 14px 14px',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', marginTop: 8,
              }}>
                <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.6 }}>{current.bubbla}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vit fråge-card */}
        <div style={{
          background: '#fff', borderRadius: '20px 20px 0 0',
          minHeight: '60vh', padding: '22px 18px 40px', marginTop: 8,
        }}>
          <AnimatePresence mode="wait">
            {!visar ? (
              <motion.div key={`mq${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 style={{
                  fontSize: 24, fontWeight: 900, color: '#111827',
                  lineHeight: 1.3, fontFamily: "'Nunito', sans-serif",
                  marginBottom: 24, letterSpacing: '-0.02em',
                }}>
                  {current.fraga}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {current.alternativ.map(alt => (
                    <AlternativKnapp key={alt.text} alt={alt} valt={valt} visar={visar} onVälj={handleVälj} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key={`mf${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{
                  padding: '14px 16px', borderRadius: 14, marginBottom: 14,
                  background: valtAlt?.korrekt ? `${O}12` : 'rgba(80,80,90,0.08)',
                  border: `2px solid ${valtAlt?.korrekt ? O + '50' : '#9ca3af40'}`,
                  display: 'flex', gap: 12,
                }}>
                  {valtAlt?.korrekt
                    ? <CheckCircle size={20} style={{ color: O, flexShrink: 0 }} />
                    : <XCircle    size={20} style={{ color: '#9ca3af', flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 5 }}>
                      {valtAlt?.korrekt ? 'Rätt svar! 🎉' : 'Inte riktigt'}
                    </p>
                    <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{valtAlt?.feedback}</p>
                  </div>
                </div>
                <div style={{
                  padding: '12px 14px', borderRadius: 12,
                  background: OL, border: `1px solid ${O}30`, marginBottom: 14,
                }}>
                  {current.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: O, flexShrink: 0, marginTop: 7 }} />
                      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.55 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <button onClick={handleNästa} style={{
                  width: '100%', padding: '16px', borderRadius: 14,
                  cursor: 'pointer', border: 'none', color: '#fff',
                  fontSize: 16, fontWeight: 800,
                  background: `linear-gradient(135deg, ${O}, ${OD})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {idx < fragor.length - 1 ? 'Nästa situation' : 'Se mitt resultat'} <ChevronRight size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}