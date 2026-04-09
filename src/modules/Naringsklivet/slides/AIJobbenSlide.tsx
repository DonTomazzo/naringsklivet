// src/modules/Naringsklivet/slides/AIJobbenSlide.tsx
// Slide: AI och jobben – frågan alla tänker på men ingen ställer
// Källmaterial: Almega rapport Generativ AI i tjänstesektorn 2025,
//               Swedish JobTech Jobben framtiden och AI 2025

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ChevronDown } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

const BgSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full relative overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: 'rgba(15,22,35,0.88)' }} />
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

export const AIJobbenSlide: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const fragor = [
    {
      q: 'Kommer AI att ta mitt jobb?',
      a: 'Förmodligen inte ditt jobb – men hur ditt jobb ser ut kommer att förändras. Almega (2025) visar att AI frigör tid till mer produktivt arbete snarare än ersätter hela yrkesroller. Enligt Autor (2024) arbetar 60% av amerikanerna i yrken som inte existerade för 80 år sedan. Historiskt skapar teknikskiften fler jobb än de tar.',
      nyans: 'Men: De som inte lär sig använda AI riskerar att konkurreras ut av dem som gör det. Det är inte AI som tar ditt jobb – det är en person som kan AI.',
    },
    {
      q: 'Vilka jobb är mest exponerade?',
      a: 'Kunskapsintensiva tjänsteyrken – kommunikation, juridik, ekonomi, HR, marknadsföring – är mest exponerade. Men exponering betyder inte ersättning: det betyder att AI förändrar hur uppgifterna utförs, inte att yrkena försvinner.',
      nyans: 'Intressant: Forskning visar att AI jämnar ut prestationen inom yrken – de som presterat sämre har störst produktivitetsvinst av AI-stöd. Det minskar lönegapen inom yrket.',
    },
    {
      q: 'Hur snabbt går det?',
      a: 'Snabbare än vi tror men långsammare än rubriker antyder. EY (2024): 65% av nordiska anställda uppger att de använder generativ AI på jobbet – en ökning från 12% på ett år. Implementeringen i organisationer tar tid, men individuell adoption kan ske omedelbart.',
      nyans: 'Swedish JobTech (2025): Sverige behöver riktade insatser för högt AI-exponerade yrken och ett brett kompetenslyft – det pågår redan.',
    },
    {
      q: 'Vad kan jag göra nu?',
      a: 'Du gör det redan – du är här. Forskning (Benify 2026) visar att medarbetare som arbetar med AI inte bara är mer produktiva, de är också mer nöjda och lojala. Att lära sig AI är en karriärinvestering med omedelbar avkastning.',
      nyans: null,
    },
  ];

  return (
    <BgSlide>
      <Badge text="Avsnitt 03 · AI och jobben" />

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 flex items-center gap-3"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <TrendingUp className="w-9 h-9 flex-shrink-0" style={{ color: O }} />
        AI och jobben – frågan alla tänker på
      </h2>

      <p className="text-white/70 text-base leading-relaxed mb-8">
        Låt oss ta den direkt. Klicka på varje fråga för ett ärligt svar baserat på
        aktuell forskning – inte rubriker.
      </p>

      <div className="space-y-3 mb-8">
        {fragor.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <p className="text-white font-bold text-sm sm:text-base leading-snug">
                {item.q}
              </p>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown size={18} style={{ color: O }} />
              </motion.div>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3">
                    <p className="text-white/70 text-sm leading-relaxed">{item.a}</p>
                    {item.nyans && (
                      <div
                        className="rounded-xl p-3 border-l-4"
                        style={{ borderColor: O, background: `${O}12` }}
                      >
                        <p className="text-white/80 text-sm leading-relaxed italic">
                          {item.nyans}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Forskningsnot */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-white/30 text-xs font-bold uppercase tracking-wide mb-2">
          Källor
        </p>
        <ul className="space-y-1">
          {[
            'Almega: Generativ AI i tjänstesektorn (jan 2025)',
            'Swedish JobTech: Jobben, framtiden och AI (jul 2025)',
            'EY: Work Reimagined Survey 2024 (nov 2024)',
            'Benify: Pulsen på arbetslivet 2026 (mar 2026)',
            'Autor (2024): 60% av jobb i yrken som inte fanns för 80 år sedan',
          ].map((k, i) => (
            <li key={i} className="text-white/25 text-xs italic">
              · {k}
            </li>
          ))}
        </ul>
      </div>
    </BgSlide>
  );
};

export default AIJobbenSlide;
