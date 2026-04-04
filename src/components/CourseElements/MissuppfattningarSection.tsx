// src/components/CourseElements/MissuppfattningarSection.tsx
// Bara cirklar + modal – ingen bakgrundsbild eller header.
// Föräldern ansvarar för bakgrundsbild och layout.
// Samma struktur som LagandringarSection / GdprPrinciplesSection.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';
const OL = '#FFF0EB';

const MISSUPPFATTNINGAR = [
  {
    id: 'fel-antal',
    nr: '1',
    label: 'Fel antal ledamöter',
    short: 'Styrelsen har för få eller för många ledamöter enligt stadgarna.',
    body: 'En vanlig miss är att styrelsen inte kontrollerar vad stadgarna faktiskt säger om antalet ledamöter och suppleanter. Om en ledamot avgår mitt i mandatperioden och ingen suppleant finns kan styrelsen bli beslutsoförmögen. Stadgarna styr – inte gammal vana.',
    tips: 'Läs era stadgar inför varje stämma. Kontrollera att antalet valda ledamöter stämmer och att det finns suppleanter som kan träda in vid behov.',
  },
  {
    id: 'fel-beslut',
    nr: '2',
    label: 'Styrelsen bestämmer det som stämman ska besluta',
    short: 'Styrelsen fattar beslut som rätteligen tillhör stämman – och tvärtom.',
    body: 'Det är vanligt att styrelsen tar beslut om saker som kräver stämmobeslut – till exempel stora investeringar, ändringar i stadgar eller uttaxering av extra avgifter. Lika vanligt är att stämman används för småfrågor som styrelsen borde hantera löpande.',
    tips: 'Tumregel: allt som rör enskilda medlemmars rättigheter, stadgeändringar och större ekonomiska beslut kräver stämma. Löpande förvaltning sköter styrelsen.',
  },
  {
    id: 'jav',
    nr: '3',
    label: 'Jävssituationer hanteras fel',
    short: 'Ledamöter deltar i beslut där de är jäviga.',
    body: 'En ledamot som har ett personligt intresse i ett ärende – till exempel om styrelsen ska anlita ett företag som ledamoten äger – ska inte delta i diskussionen eller rösta. Många styrelser känner inte till jävsreglerna eller tycker att det "känns onödigt formellt".',
    tips: 'Gör det till en rutin: fråga i början av varje möte om någon är jävig i något ärende. Protokollför att jävig ledamot lämnade rummet.',
  },
  {
    id: 'protokoll',
    nr: '4',
    label: 'Protokollen är för bristfälliga',
    short: 'Protokollen saknar beslut, motiveringar eller är aldrig justerade.',
    body: 'Många styrelser skriver protokoll som mer liknar anteckningar än formella beslutsdokument. Beslut måste framgå tydligt, vem som ansvarar och vad som ska göras. Ojusterade protokoll är ett vanligt problem som kan orsaka problem om beslut ifrågasätts i efterhand.',
    tips: 'Varje protokoll ska ha: datum, plats, deltagare, §-numrerade beslut med tydlig beslutsformulering, ansvarig och uppföljning. Justera inom 2–4 veckor.',
  },
  {
    id: 'underhall',
    nr: '5',
    label: 'Underhållet skjuts på framtiden',
    short: 'Styrelsen prioriterar bort underhåll tills det blir akut och dyrt.',
    body: 'Det är mänskligt att skjuta på obehagliga kostnader – men i en BRF kan det bli katastrofalt. En fuktskada som kostar 50 000 kr att åtgärda kan kosta 500 000 kr om den ignoreras i tre år. Styrelsen har ett juridiskt ansvar att förvalta fastigheten väl.',
    tips: 'Ha alltid en aktuell underhållsplan. Gör en enkel inspektion av fastigheten varje år och avsätt medel för planerat underhåll i budgeten.',
  },
  {
    id: 'storningar',
    nr: '6',
    label: 'Störningar hanteras inte – eller felaktigt',
    short: 'Styrelsen agerar för sent, inkonsekvent eller för hårt.',
    body: 'Många styrelser undviker att ta tag i störningar för att det "känns jobbigt". Andra agerar inkonsekvent – snabba med varningar mot vissa grannar men inte andra. Båda misstagen kan leda till klagomål om diskriminering eller att den störande grannen hävdar att styrelsen accepterat beteendet.',
    tips: 'Ha en tydlig rutin: ta emot klagomålet skriftligt, skicka påminnelse om ordningsregler, dokumentera och agera konsekvent oavsett vem det gäller.',
  },
  {
    id: 'arsredovisning',
    nr: '7',
    label: 'Styrelsen tror att alla poster är pengar',
    short: 'Årsredovisningen missförstås – avskrivningar är inte utgifter.',
    body: 'En mycket vanlig missuppfattning: styrelseledamöter tror att ett "underskott" i resultaträkningen betyder att föreningen är på väg mot konkurs. Men avskrivningar är bokföringsmässiga kostnader – inga pengar lämnar kontot. En förening kan ha bra likviditet och ändå visa underskott i resultaträkningen.',
    tips: 'Lär er skillnaden mellan resultat (bokföring) och kassaflöde (faktiska pengar). Titta på balansräkningen och likviditeten, inte bara årets resultat.',
  },
  {
    id: 'ekonomiskt-ansvar',
    nr: '8',
    label: 'Styrelsen förstår inte det ekonomiska ansvaret',
    short: 'Ledamöter tror att de inte kan hållas personligt ansvariga.',
    body: 'Det är ett vanligt missförstånd att styrelseuppdraget i en BRF inte innebär något personligt ansvar. Men om styrelsen fattat beslut som skadat föreningen genom vårdslöshet kan ledamöter bli personligt skadeståndsskyldiga. Ansvarsfriheten på stämman är inte en garanti.',
    tips: 'Fatta välgrundade beslut, dokumentera era överväganden och anlita experter när ni är osäkra. Kontrollera att föreningen har en styrelseansvarförsäkring.',
  },
  {
    id: 'kommunikation',
    nr: '9',
    label: 'Styrelsen svarar inte på medlemmar',
    short: 'Frågor och klagomål från boende ignoreras eller dröjer för länge.',
    body: 'Ingenting skapar mer frustration och misstro i en förening än en styrelse som inte svarar. Många styrelser saknar rutiner för hur inkommande ärenden hanteras – vem ansvarar, inom vilken tid och hur bekräftas mottagandet? Tystnaden tolkas alltid som ointresse eller inkompetens.',
    tips: 'Bekräfta alltid mottagandet inom 2–3 dagar, även om ni inte har ett svar ännu. Ha en gemensam e-postadress (inte privata) och bestäm vem som hanterar vad.',
  },
  {
    id: 'herskartekniker',
    nr: '10',
    label: 'Härskarteknik på styrelsemötet',
    short: 'En eller några röster dominerar – andra vågar inte säga sin mening.',
    body: 'En välmående styrelse kräver att alla ledamöter känner att deras röst räknas. Vanliga problem: ordföranden avfärdar förslag utan diskussion, vissa ledamöter pratar över andra, eller en stark personlighet har informell vetorätt. Det skapar passivitet, dåliga beslut och hög omsättning bland ledamöter.',
    tips: 'Låt alla komma till tals – gå gärna laget runt inför viktiga beslut. Ordföranden ska leda processen, inte dominera innehållet. Utvärdera styrelsens samarbete en gång per år.',
  },
];

// ── Modal ─────────────────────────────────────────────────
const Modal = ({
  item,
  onClose,
}: {
  item: typeof MISSUPPFATTNINGAR[0] | null;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50"
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Stäng-knapp */}
            <div className="flex justify-end px-5 pt-5">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            {/* Rubrik */}
            <div className="px-6 pb-5 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: O }}
              >
                <span className="text-white font-black text-lg">{item.nr}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">
                {item.label}
              </h3>
              <p className="text-sm text-gray-500">{item.short}</p>
            </div>

            <div className="h-px bg-gray-100 mx-6" />

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              <div
                className="rounded-xl p-4 border-l-4"
                style={{ borderColor: O, background: OL }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: OD }}
                >
                  Tips för er styrelse
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.tips}</p>
              </div>
            </div>

            {/* Stäng-knapp */}
            <div className="px-6 pb-6 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
              >
                Stäng
              </button>
            </div>

          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ── Huvudkomponent ────────────────────────────────────────
const MissuppfattningarSection: React.FC = () => {
  const [active, setActive] = useState<typeof MISSUPPFATTNINGAR[0] | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const handleClick = (item: typeof MISSUPPFATTNINGAR[0]) => {
    setActive(item);
    setViewed(prev => new Set([...prev, item.id]));
  };

  const allDone = viewed.size === MISSUPPFATTNINGAR.length;

  return (
    <div className="w-full">
      {/* Cirklar */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-8 px-4">
        {MISSUPPFATTNINGAR.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item)}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-center p-3 font-bold text-xs leading-tight"
              style={{
                background: isViewed ? OD : O,
                color: 'white',
                boxShadow: isViewed
                  ? `0 0 0 3px white, 0 0 0 5px ${OD}, 0 4px 16px ${O}60`
                  : `0 4px 20px ${O}50`,
              }}
            >
              {item.label}
            </motion.button>
          );
        })}
      </div>

      {/* Status */}
      {allDone ? (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>
          ✓ Du har utforskat alla 10 missuppfattningar!
        </p>
      ) : viewed.size > 0 ? (
        <p className="text-center text-xs pb-4 text-white/40">
          {viewed.size}/{MISSUPPFATTNINGAR.length} utforskade – klicka på fler
        </p>
      ) : null}

      <Modal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default MissuppfattningarSection;