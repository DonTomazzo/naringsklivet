// src/modules/Naringsklivet/slides/CoStarSlide.tsx
// CO-STAR – sex byggstenar med klickbara cirklar, identisk struktur som FAKTAPSlide
// Vann Anthropics globala prompt engineering-tävling 2023 (Sheila Teo, Singapore)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';

const O    = '#FF5421';
const OD   = '#E04619';
const OL   = '#FFF0EB';
const DARK = '#0f1623';

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

  const handleClick = (item: KortItem) => {
    setActive(item);
    setViewed(prev => new Set([...prev, item.id]));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto py-6 px-2">
        {items.map((item, i) => {
          const isViewed = viewed.has(item.id);
          return (
            <motion.button key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
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
      {viewed.size > 0 && viewed.size < items.length && (
        <p className="text-center text-xs text-white/40 pb-4">
          {viewed.size}/{items.length} utforskade – klicka på fler
        </p>
      )}
      {viewed.size === items.length && (
        <p className="text-center text-xs font-semibold pb-4" style={{ color: OL }}>
          ✓ Du har utforskat alla!
        </p>
      )}
      <KortModal item={active} onClose={() => setActive(null)} />
    </div>
  );
};

export const CoStarSlide: React.FC = () => {
  const byggstenar: KortItem[] = [
    {
      id: 'context',
      nr: 'C – Context',
      label: 'Context',
      short: 'Bakgrunden och situationen.',
      bild: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      body: 'Ge AI:n den bakgrundsinformation som behövs för att förstå din situation. Vad handlar det om? Vad har hänt? Vilka är omständigheterna? Utan kontext ger AI:n ett generellt svar. Med kontext ger den ett svar anpassat just för din situation.',
      tips: 'Exempel: "Vi är ett medelstort B2B-företag som just har förlorat vår största kund. Vi ska kommunicera detta till styrelsen på måndag."',
    },
    {
      id: 'objective',
      nr: 'O – Objective',
      label: 'Objective',
      short: 'Målet med uppgiften.',
      bild: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&q=80',
      body: 'Vad vill du uppnå med svaret? Vilket är det slutgiltiga målet? Objective skiljer sig från uppgiften — uppgiften är "skriv ett mejl", målet är "övertala kunden att stanna". AI:n anpassar hela sitt svar utifrån målet.',
      tips: 'Exempel: "Målet är att återskapa förtroende och boka ett möte, inte att argumentera för vår sak."',
    },
    {
      id: 'style',
      nr: 'S – Style',
      label: 'Style',
      short: 'Skrivstil och format.',
      bild: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
      body: 'Vilket skrivstil ska AI:n använda? Berättande, akademisk, journalistisk, listor, bullet points? Style handlar om hur texten är uppbyggd och presenterad — inte om ton (det är T:et). En rapport har en annan stil än en bloggpost, även om tonen är densamma.',
      tips: 'Exempel: "Skriv i en berättande stil, som en krönika — inte som en rapport med rubriker och punktlistor."',
    },
    {
      id: 'tone',
      nr: 'T – Tone',
      label: 'Tone',
      short: 'Det känslomässiga tonläget.',
      bild: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
      body: 'Vilket känslomässigt klimat ska texten ha? Professionellt, empatiskt, entusiastiskt, allvarligt, humoristiskt, uppmuntrande? Ton är den känsla läsaren upplever — inte hur texten är strukturerad. Samma information kan levereras kallt eller varmt beroende på ton.',
      tips: 'Exempel: "Tonen ska vara varm och mänsklig, inte kylig och korporativ. Läsaren ska känna att det finns en människa bakom texten."',
    },
    {
      id: 'audience',
      nr: 'A – Audience',
      label: 'Audience',
      short: 'Vem ska läsa svaret?',
      bild: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      body: 'Audience är CO-STAR:s starkaste kort — och det som saknas i de flesta andra ramverk. Vem är läsaren? Vad vet de redan? Vad bryr de sig om? AI:n anpassar ordval, komplexitetsnivå och argument helt efter målgruppen.',
      tips: 'Exempel: "Mottagaren är en 60-årig ordförande utan teknisk bakgrund. Undvik jargong. Förklara allt som om det är första gången hen hör det."',
    },
    {
      id: 'response',
      nr: 'R – Response',
      label: 'Response',
      short: 'Hur svaret ska se ut.',
      bild: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
      body: 'Vilket format vill du ha på svaret? Lista, tabell, mejl, rapport, punkter, JSON, kod, ett enda stycke? Response är det sista steget — du berättar för AI:n exakt hur outputen ska levereras. Utan detta väljer AI:n själv.',
      tips: 'Exempel: "Svara med max tre stycken. Inget rubriksystem. Avsluta med en tydlig call to action i en enda mening."',
    },
  ];

  return (
    <div className="h-full relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.87)' }} />
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 pb-28">

          <div className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest"
            style={{ background: `${O}25`, color: O, border: `1px solid ${O}40` }}>
            Fördjupning · CO-STAR
          </div>

          {/* Tävlingsbadge */}
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-300 text-sm">
              Vann Anthropics globala prompt engineering-tävling 2023 · Skapad av Sheila Teo, Singapore ·
              <span className="text-yellow-300/70"> 🇰🇷 Nationell standard i Sydkorea</span>
            </p>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            CO-STAR – sex byggstenar
          </h2>

          <p className="text-white/70 text-base leading-relaxed mb-2 max-w-2xl">
            Den globalt erkända standarden för kraftfulla promptar. Klicka på varje
            byggsten för att förstå vad den innebär.
          </p>

          <div className="w-full">
            <KortGrid items={byggstenar} />
          </div>

          {/* Jämförelse med FAKTAP */}
          <div
            className="rounded-xl p-4 border mt-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
              CO-STAR vs FAKTAP
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs text-white/60">
              <div>
                <p className="text-white font-bold mb-1">CO-STAR</p>
                <p>Betonar <strong className="text-white/80">målgrupp</strong> och <strong className="text-white/80">stil</strong> — starkast för kommunikation och skrivande.</p>
              </div>
              <div>
                <p className="text-white font-bold mb-1">FAKTAP</p>
                <p>Betonar <strong className="text-white/80">avgränsning</strong> och <strong className="text-white/80">agerande</strong> — starkast för analytiska och tekniska uppgifter.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoStarSlide;
