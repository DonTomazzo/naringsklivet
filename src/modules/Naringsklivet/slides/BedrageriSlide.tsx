// src/modules/Naringsklivet/slides/BedrageriSlide.tsx
// Slide: AI-driven bedrägeri – deepfakes, VD-bluffar, phishing
// Målgrupp: Medarbetare i arbetslivet

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const O  = '#FF5421';

const BgSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.90)' }} />
    <div className="relative z-10 h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 pb-28">{children}</div>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div
    className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
    style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}
  >
    {text}
  </div>
);

interface BedrageriItem {
  id: string;
  label: string;
  short: string;
  emoji: string;
  hur: string;
  exempel: string;
  skydda: string;
}

const Modal = ({ item, onClose }: { item: BedrageriItem | null; onClose: () => void }) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed z-50"
          style={{ top: 'var(--header-height, 60px)', left: 0, right: 0, bottom: 0 }}
        >
          <div className="h-full flex items-center justify-center p-0 md:p-6">
            <div className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-3xl md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div
                className="relative flex-shrink-0 px-6 pt-8 pb-6"
                style={{ background: '#0f1623' }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <X size={16} className="text-white" />
                </button>
                <span className="text-5xl block mb-3">{item.emoji}</span>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 text-white"
                  style={{ background: O }}
                >
                  Bedrägeri
                </span>
                <h3 className="text-2xl font-black text-white leading-tight">{item.label}</h3>
                <p className="text-white/60 text-sm mt-1">{item.short}</p>
              </div>

              {/* Body */}
              <div className="px-6 py-5 overflow-y-auto space-y-4 flex-1 bg-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
                    Hur det fungerar
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.hur}</p>
                </div>

                <div
                  className="rounded-xl p-4 border-l-4"
                  style={{ borderColor: '#ef4444', background: '#fef2f2' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 text-red-600">
                    Verkligt exempel
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed italic">"{item.exempel}"</p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1 text-green-700">
                    Hur du skyddar dig
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.skydda}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export const BedrageriSlide: React.FC = () => {
  const [active, setActive] = useState<BedrageriItem | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const items: BedrageriItem[] = [
    {
      id: 'vd-bluff',
      emoji: '👔',
      label: 'VD-bedrägeriet',
      short: 'Falsk röst eller video från chefen',
      hur: 'Med AI kan bedragare klona en persons röst från bara några sekunders ljudklipp – t.ex. från ett poddavsnitt eller en YouTube-video. De ringer sedan en ekonomimedarbetare och låtsas vara VD:n, och ber om en brådskande banköverföring. Deepfake-video gör att de till och med kan dyka upp i ett videomöte.',
      exempel: 'En finanschef i Hongkong överförde 25 miljoner dollar efter ett videomöte med sin "VD och kollegor" – alla var AI-genererade deepfakes. (CNN, 2024)',
      skydda: 'Inför alltid ett kodord för brådskande betalningar. Ring upp på ett känt nummer – inte ett nummer som uppringarens skickade. Ingen seriös chef vill att du hoppar över rutiner.',
    },
    {
      id: 'phishing',
      emoji: '🎣',
      label: 'AI-phishing',
      short: 'Felfria bluffmejl på perfekt svenska',
      hur: 'Traditionella phishing-mejl var lätta att avslöja – dålig svenska, konstiga formuleringar. Idag genererar AI perfekta mejl på valfritt språk, anpassade till mottagaren med information hämtad från LinkedIn och företagets hemsida. AI kan även skicka tusentals personaliserade mejl per timme.',
      exempel: 'Du får ett mejl som verkar komma från din IT-avdelning: "Vi har noterat en inloggning från okänd enhet. Verifiera ditt konto här." Avsändaradressen ser korrekt ut. Länken leder till en perfekt kopia av företagets inloggningssida.',
      skydda: 'Gå aldrig via en länk i ett mejl – navigera alltid direkt till sidan i webbläsaren. Kolla avsändarens faktiska e-postadress (inte visningsnamnet). Vid minsta tvivel – ring IT.',
    },
    {
      id: 'deepfake',
      emoji: '🎭',
      label: 'Deepfakes',
      short: 'AI-genererade bilder, röster och videor',
      hur: 'Deepfake-tekniken kan skapa övertygande video och ljud av vem som helst. Det används för att skapa falskt "bevismaterial", manipulera aktiekurser med falska uttalanden från VD:ar, eller lura anställda att tro att de pratar med sin chef.',
      exempel: 'En anställd får ett röstmeddelande från sin chefs nummer: "Jag är på möte, kan inte svara. Skicka årsrapporten direkt till den nya revisionsbyrån på det här mailet." Rösten låter precis som chefen. Rapporten innehåller affärshemligheter.',
      skydda: 'Känslig information skickas aldrig via en kanal du inte initierat själv. Bekräfta alltid via en annan kanal. Om något känns bråttom och ovanligt – det är ett varningstecken.',
    },
    {
      id: 'faktura',
      emoji: '📄',
      label: 'AI-fakturabedrägerier',
      short: 'Falska fakturor som ser äkta ut',
      hur: 'AI kan analysera ett företags offentliga information och generera övertygande fakturor som matchar leverantörernas stil – rätt logotyp, rätt format, rätt belopp. De skickas med en liten ändring: nytt kontonummer.',
      exempel: 'Företaget får en faktura från "sin" städfirma. Allt ser rätt ut. Men i ett litet notat i slutet: "Nytt bankkontonummer fr.o.m. denna månad." Betalningen går till bedragaren.',
      skydda: 'Verifiera alltid kontonummerbyten via telefon till ett känt nummer. Inför en rutin: inga kontonummerbyten genomförs utan muntlig bekräftelse. Betala aldrig en faktura med nytt kontonummer utan extra kontroll.',
    },
    {
      id: 'social',
      emoji: '🤝',
      label: 'Social manipulation',
      short: 'AI-chattbots som bygger förtroende',
      hur: 'AI-drivna chattbots kan föra trovärdiga konversationer på LinkedIn eller via mejl under lång tid – veckor eller månader. De bygger upp en relation, etablerar förtroende, och ber sedan om en tjänst: en introduktion, ett dokument eller tillgång till ett system.',
      exempel: 'En "rekryterare" på LinkedIn kontaktar dig med ett spännande jobberbjudande. Under flera veckors konversation verkar hen verklig. Till slut ber hen dig att testa ett "verktyg" – som installerar skadlig kod på din dator.',
      skydda: 'Googla alltid personers namn och arbetsplats. Träffas de inte på video med fungerande kamera? Varna. Installera aldrig program från okända kontakter. Om det låter för bra för att vara sant – det är det förmodligen.',
    },
    {
      id: 'ai-policy',
      emoji: '📋',
      label: 'Saknad AI-policy',
      short: 'Det största risken du inte tänker på',
      hur: 'Många organisationer saknar tydliga regler för AI-användning. Medarbetare laddar upp konfidentiella dokument till externa AI-tjänster utan att tänka på att informationen kan användas för träning, läcka eller lagras på servrar utanför EU.',
      exempel: 'En medarbetare klistrar in hela kontraktet med en ny kund i ChatGPT för att få hjälp att sammanfatta det. Kontraktet innehåller affärshemligheter, priser och NDA-skyddad information.',
      skydda: 'Fråga din chef eller IT om företagets AI-policy. Anta att allt du skriver till en extern AI-tjänst kan läsas av tredje part. Känslig information – kunddata, affärshemligheter, personaluppgifter – hör inte hemma i externa AI-verktyg.',
    },
  ];

  const handleClick = (item: BedrageriItem) => {
    setActive(item);
    setViewed(prev => new Set([...prev, item.id]));
  };

  return (
    <BgSlide>
      <Badge text="Avsnitt 10 · Bedrägeri och risker" />

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 flex items-center gap-3"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <AlertTriangle className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
        AI-driven bedrägeri – skydda dig och din organisation
      </h2>

      <p className="text-white/70 text-base leading-relaxed mb-4">
        AI gör bedragare bättre och snabbare. Samma teknik som gör ditt jobb enklare
        används för att manipulera, lura och stjäla. Klicka på varje typ för att förstå
        hur de fungerar – och hur du skyddar dig.
      </p>

      {/* Cirklar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-6 px-2">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-center p-3 font-bold text-xs leading-tight gap-1"
              style={{
                background: isViewed ? '#991b1b' : '#ef4444',
                color: 'white',
                boxShadow: isViewed
                  ? '0 0 0 3px white, 0 0 0 5px #991b1b, 0 4px 16px rgba(239,68,68,0.6)'
                  : '0 4px 20px rgba(239,68,68,0.5)',
              }}
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {viewed.size > 0 && viewed.size < items.length && (
        <p className="text-center text-xs text-white/40 pb-4">
          {viewed.size}/{items.length} utforskade – klicka på fler
        </p>
      )}
      {viewed.size === items.length && (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: '#fca5a5' }}>
          ✓ Du har gått igenom alla – nu vet du vad du ska se upp för
        </p>
      )}

      {/* Varningsruta */}
      <div
        className="rounded-2xl p-5 border mt-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2 text-red-400">
          Grundregeln
        </p>
        <p className="text-white/80 text-sm leading-relaxed">
          Om något är bråttom, ovanligt eller ber dig kringgå en rutin –{' '}
          <strong className="text-white">stanna upp och verifiera via en annan kanal</strong>.
          Bedragare lever på att du inte tar den extra sekunden.
        </p>
      </div>

      <Modal item={active} onClose={() => setActive(null)} />
    </BgSlide>
  );
};

export default BedrageriSlide;