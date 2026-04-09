// src/modules/Naringsklivet/slides/OvrigaRamverkSlide.tsx
// ERA, CREATE och ROSES – tre ramverk med cirklar + "i praktiken"-del
// Identisk struktur som FAKTAPSlide + FAKTAPPraktikSlide

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X } from 'lucide-react';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';

interface KortItem {
  id: string;
  nr: string;
  label: string;
  short: string;
  bild: string;
  body: string;
  tips?: string;
}

const KortModal = ({ item, onClose }: { item: KortItem | null; onClose: () => void }) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
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
              <div className="relative flex-shrink-0 h-44 sm:h-52">
                <img src={item.bild} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.65))' }} />
                <button onClick={onClose}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20"
                  style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <X size={16} className="text-white" />
                </button>
                <div className="absolute bottom-4 left-5 right-14">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 text-white"
                    style={{ background: O }}>{item.nr}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{item.label}</h3>
                  <p className="text-white/70 text-base mt-1">{item.short}</p>
                </div>
              </div>
              <div className="px-5 sm:px-7 py-6 overflow-y-auto space-y-5 flex-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
                    Vad innebär det?
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">{item.body}</p>
                </div>
                {item.tips && (
                  <div className="rounded-2xl p-5 border" style={{ background: OL, borderColor: `${O}20` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
                      Tänk på detta
                    </p>
                    <p className="text-base text-gray-700 leading-relaxed">{item.tips}</p>
                  </div>
                )}
                <div className="h-4 md:hidden" />
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const KortGrid = ({ items }: { items: KortItem[] }) => {
  const [active, setActive] = useState<KortItem | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-4 px-2">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActive(item); setViewed(p => new Set([...p, item.id])); }}
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
      {viewed.size === items.length && (
        <p className="text-center text-xs font-semibold pb-2" style={{ color: OL }}>
          ✓ Du har utforskat alla!
        </p>
      )}
      <KortModal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

// ─── Bilder ───────────────────────────────────────────────
const IMGS = {
  laptop:  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&q=80',
  kreativ: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  team:    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
  data:    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  kontor:  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  skriva:  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
  strateg: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&q=80',
};

// ══════════════════════════════════════════════════════════
// ERA
// ══════════════════════════════════════════════════════════
const eraItems: KortItem[] = [
  {
    id: 'expectation',
    nr: 'E – Expectation',
    label: 'Expectation',
    short: 'Vad ska AI:n göra?',
    bild: IMGS.laptop,
    body: 'Expectation är den konkreta uppgiften du vill att AI:n ska utföra. Var specifik: "Skriv en sammanfattning", "Ge mig tre alternativ", "Skapa en att-göra-lista". Ju tydligare förväntan, desto mer träffsäkert svar.',
    tips: 'Exempel: "Skriv en sammanfattning av det här mötesprotokollet i fem punkter."',
  },
  {
    id: 'role',
    nr: 'R – Role',
    label: 'Role',
    short: 'Vem är AI:n?',
    bild: IMGS.team,
    body: 'Ge AI:n en roll att utgå ifrån. En senior projektledare svarar annorlunda än en junior assistent på samma fråga. Rollen sätter expertisens nivå, perspektiv och ordval i svaret.',
    tips: 'Exempel: "Du är en senior projektledare med 15 års erfarenhet av IT-implementationer."',
  },
  {
    id: 'action',
    nr: 'A – Action',
    label: 'Action',
    short: 'Vilket specifikt resultat?',
    bild: IMGS.kontor,
    body: 'Action specificerar det konkreta leverablet — vad ska finnas i svaret? En lista? En rekommendation? En mall? Action är mer specifikt än Expectation: det är inte bara "vad" AI:n ska göra, utan "vad" som ska finnas i output.',
    tips: 'Exempel: "Skapa en att-göra-lista med max fem punkter, sorterade efter prioritet."',
  },
];

// ══════════════════════════════════════════════════════════
// CREATE
// ══════════════════════════════════════════════════════════
const createItems: KortItem[] = [
  {
    id: 'character',
    nr: 'C – Character',
    label: 'Character',
    short: 'AI:ns persona och röst.',
    bild: IMGS.kreativ,
    body: 'Definiera AI:ns karaktär och röst. Till skillnad från "Role" i ERA och CO-STAR handlar Character om personligheten bakom texten — inte bara expertisen. En varumärkesröst, en specifik persons stil, eller ett bestämt personlighetsdrag.',
    tips: 'Exempel: "Skriv som en entusiastisk men jordnära marknadsförare som pratar med vänner, inte kunder."',
  },
  {
    id: 'request',
    nr: 'R – Request',
    label: 'Request',
    short: 'Uppgiften i detalj.',
    bild: IMGS.skriva,
    body: 'Beskriv uppgiften så detaljerat som möjligt. Vad ska skapas? För vilket syfte? Var ska det publiceras? Request i CREATE är mer detaljerat än Expectation i ERA just för att CREATE används för kreativa, längre uppgifter.',
    tips: 'Exempel: "Skriv ett LinkedIn-inlägg om vår nya produktlansering som ska generera kommentarer och delningar."',
  },
  {
    id: 'examples',
    nr: 'E – Examples',
    label: 'Examples',
    short: 'Visa vad du gillar.',
    bild: IMGS.data,
    body: 'CREATE:s hemliga vapen. Ge AI:n exempel på texter, stil eller ton du gillar. AI:n analyserar exemplen och matchar stil, rytm och ordval. Det är det snabbaste sättet att få en text som faktiskt låter som dig eller ditt varumärke.',
    tips: 'Klistra in ett gammalt inlägg du är nöjd med: "Skriv i samma stil som detta: [exempel]"',
  },
  {
    id: 'additions',
    nr: 'A – Additions',
    label: 'Additions',
    short: 'Vad ska inkluderas eller undvikas?',
    bild: IMGS.kontor,
    body: 'Specificera vad som ska vara med och vad som ska uteslutas. Undvik branschjargong? Måste innehålla en call to action? Får inte nämna konkurrenter? Additions är avgränsningar och obligatoriska element i ett och samma steg.',
    tips: 'Exempel: "Inkludera alltid en statistik. Undvik ord som \'lösning\', \'synergier\' och \'best practice\'."',
  },
  {
    id: 'type',
    nr: 'T – Type',
    label: 'Type',
    short: 'Typ av output.',
    bild: IMGS.laptop,
    body: 'Vilket format ska den färdiga texten ha? LinkedIn-inlägg, e-postkampanj, bloggartikel, videomanus, presentationstext, produktbeskrivning? Type berättar för AI:n vilket medium och format som gäller.',
    tips: 'Exempel: "Leverera som ett LinkedIn-inlägg med max 150 ord och tre emoji strategiskt placerade."',
  },
  {
    id: 'extras',
    nr: 'E – Extras',
    label: 'Extras',
    short: 'Finjusteringar av ton och nivå.',
    bild: IMGS.kreativ,
    body: 'Sista steget — finjustera med detaljer som inte passar i de andra kategorierna. Komplexitetsnivå, läsbarhetsnivå (ex. "skriv på gymnasienivå"), specifika ord att använda, eller hur avslutningen ska se ut.',
    tips: 'Exempel: "Avsluta alltid med en fråga. Sikta på Flesch-läsbarhetsnivå 60+. Använd gärna ordet \'du\' direkt till läsaren."',
  },
];

// ══════════════════════════════════════════════════════════
// ROSES
// ══════════════════════════════════════════════════════════
const rosesItems: KortItem[] = [
  {
    id: 'role-r',
    nr: 'R – Role',
    label: 'Role',
    short: 'AI:ns expertområde.',
    bild: IMGS.strateg,
    body: 'Specificera vilket expertområde AI:n ska utgå ifrån när den löser problemet. I ROSES är Role mer strategiskt definierat — det handlar om domänexpertis, inte bara en titel.',
    tips: 'Exempel: "Du är en managementkonsult specialiserad på organisationsförändringar i medelstora svenska tillverkningsföretag."',
  },
  {
    id: 'objective-r',
    nr: 'O – Objective',
    label: 'Objective',
    short: 'Det slutgiltiga målet.',
    bild: IMGS.data,
    body: 'Vad är det övergripande strategiska målet? I ROSES är Objective bredare än i CO-STAR — det är ofta ett affärsmål, inte bara ett kommunikationsmål. Vad ska uppnås på lång sikt?',
    tips: 'Exempel: "Målet är att minska personalomsättningen med 20% inom 12 månader utan att öka lönekostnaderna."',
  },
  {
    id: 'scenario',
    nr: 'S – Scenario',
    label: 'Scenario',
    short: 'Situationen och miljön.',
    bild: IMGS.kontor,
    body: 'Beskriv den faktiska situationen så detaljerat som möjligt. Scenario är ROSES kraftfullaste element — det ger AI:n den kontextuella förståelse som krävs för strategisk rådgivning. Ju mer specifikt, desto bättre.',
    tips: 'Exempel: "Vi är ett 80-personers företag i Malmö. Vi har haft tre chefsbyten på två år. Medarbetarundersökningen visar 38% nöjdhet, ner från 67% för tre år sedan."',
  },
  {
    id: 'expected',
    nr: 'E – Expected',
    label: 'Expected\nSolution',
    short: 'Vilken typ av svar hjälper dig mest?',
    bild: IMGS.team,
    body: 'Berätta vilken typ av output som är mest värdefull för dig. Vill du ha en lista med åtgärder? En analys av orsaker? En prioriterad handlingsplan? En SWOT? Expected Solution styr vilket format svaret levereras i.',
    tips: 'Exempel: "Ge mig de fem viktigaste rotorsakerna och för varje en konkret åtgärd med ansvarig roll och tidsram."',
  },
  {
    id: 'steps',
    nr: 'S – Steps',
    label: 'Steps',
    short: 'Be AI:n bryta ner i steg.',
    bild: IMGS.laptop,
    body: 'Avsluta med att be AI:n strukturera svaret som en steg-för-steg-plan. Steps tvingar AI:n att tänka sekventiellt och leverera ett svar som faktiskt går att implementera — inte bara ett generellt råd.',
    tips: 'Exempel: "Strukturera svaret som en 30-60-90-dagarsplan med konkreta aktiviteter, ansvariga och framgångsmått."',
  },
];

// ══════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ══════════════════════════════════════════════════════════
export const OvrigaRamverkSlide: React.FC = () => {
  const [activeRamverk, setActiveRamverk] = useState<'era' | 'create' | 'roses'>('era');

  const praktikExempel = {
    era: {
      svag: '"Hjälp mig med ett kundmejl."',
      stark: '"Expectation: Skriv ett uppföljningsmejl till en kund som inte svarat på vår offert på 5 dagar. Role: Du är en erfaren kundansvarig på ett IT-bolag. Action: Mejlet ska vara max 80 ord, ha en mjuk påminnelse och avsluta med en konkret fråga om vi kan boka ett kort samtal."',
      lärdom: 'ERA är snabbt och effektivt för vardagsuppgifter. Tre ingredienser — under 30 sekunder att skriva.',
    },
    create: {
      svag: '"Skriv ett LinkedIn-inlägg om AI."',
      stark: '"Character: Skriv som en jordnära men nyfiken HR-chef. Request: LinkedIn-inlägg om hur AI förändrat mitt sätt att jobba med rekrytering. Examples: [klistra in ett gammalt inlägg du gillar]. Additions: Inkludera ett konkret exempel, inga buzzwords. Type: LinkedIn-inlägg 100-150 ord. Extras: Avsluta med en fråga till läsaren."',
      lärdom: 'Examples-steget är guld — ge AI:n ett verkligt exempel på din stil och texten låter som du.',
    },
    roses: {
      svag: '"Hur ska vi förbättra vår teamkultur?"',
      stark: '"Role: Du är en organisationskonsult specialiserad på SME. Objective: Minska konflikter och öka samarbetet i ett 15-personersteam. Scenario: Vi har blandade senioriteter, två personer dominerar möten, tre är tysta. Vi har inga tydliga processer. Expected Solution: Tre konkreta interventioner vi kan göra nästa månad. Steps: Rangordna efter impact vs implementation effort."',
      lärdom: 'ROSES lyser när du behöver tänka igenom ett komplext problem. AI:n fungerar som en konsult — inte en svarsgenerator.',
    },
  };

  const ramverkInfo = {
    era:    { namn: 'ERA',    tagline: 'Snabba vardagsuppgifter',      items: eraItems    },
    create: { namn: 'CREATE', tagline: 'Skrivande & innehållsskapande', items: createItems },
    roses:  { namn: 'ROSES',  tagline: 'Strategi & problemlösning',     items: rosesItems  },
  };

  const info = ramverkInfo[activeRamverk];
  const ex   = praktikExempel[activeRamverk];

  return (
    <div className="h-full relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 pb-28">

          <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
            style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
            Fördjupning · Fler ramverk
          </div>

          <h2
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3 flex items-center gap-3"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <Layers className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
            ERA · CREATE · ROSES
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-6 max-w-2xl">
            Tre ramverk för tre olika situationer. Välj ett och utforska byggstenar
            och ett praktikexempel.
          </p>

          {/* Ramverksväljare */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(['era', 'create', 'roses'] as const).map(rv => (
              <button
                key={rv}
                onClick={() => setActiveRamverk(rv)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={activeRamverk === rv
                  ? { background: O, color: 'white' }
                  : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(255,255,255,0.10)' }
                }
              >
                {ramverkInfo[rv].namn}
                <span className="ml-2 text-xs font-normal opacity-70">
                  {ramverkInfo[rv].tagline}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRamverk}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Cirklar */}
              <KortGrid items={info.items} />

              {/* Praktik */}
              <div className="mt-4 rounded-2xl border overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="px-5 py-3 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    {info.namn} i praktiken – svag vs stark
                  </p>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl p-4"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <p className="text-red-400 text-xs font-bold uppercase tracking-wide mb-2">✗ Svag</p>
                    <p className="text-white/60 text-sm italic leading-relaxed">{ex.svag}</p>
                  </div>
                  <div className="rounded-xl p-4"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-2">✓ Stark</p>
                    <p className="text-white/60 text-sm italic leading-relaxed">{ex.stark}</p>
                  </div>
                </div>
                <div className="px-5 pb-4">
                  <div className="rounded-xl p-3"
                    style={{ background: `${O}12`, border: `1px solid ${O}25` }}>
                    <p className="text-white/80 text-sm leading-relaxed">
                      <span className="font-bold" style={{ color: O }}>→ </span>
                      {ex.lärdom}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Oversikt */}
          <div className="mt-6 rounded-xl p-4 border"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: O }}>
              Välj rätt ramverk för uppgiften
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { namn: 'FAKTAP',  för: 'Teknik, analys, juridik' },
                { namn: 'CO-STAR', för: 'Kommunikation, skrivande' },
                { namn: 'ERA',     för: 'Vardagsuppgifter snabbt' },
                { namn: 'CREATE',  för: 'Marknadsföring, content' },
              ].map((r, i) => (
                <div key={i} className="text-center">
                  <p className="text-white font-bold mb-0.5">{r.namn}</p>
                  <p className="text-white/40">{r.för}</p>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs italic mt-3 text-center">
              ROSES: Strategi, problemlösning, komplexa beslut
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OvrigaRamverkSlide;
