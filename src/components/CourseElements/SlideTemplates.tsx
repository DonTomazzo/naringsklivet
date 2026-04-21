// src/components/CourseElements/SlideTemplates.tsx
//
// Bibliotek av slide-mallar i SplitSlide-familjen
// Inspirerade av E.ON-kursernas konstruktioner
//
// MALLAR:
//   SlideA  – Bild vänster, text höger (original SplitSlide-känsla)
//   SlideB  – Bild höger, text vänster
//   SlideC  – Bild som header fullwidth, vitt content-block under
//   SlideD  – Pratbubbla-layout (två personer, dialog)
//   SlideE  – Punktlista med bild som bakgrund i övre zonen
//   SlideF  – Quiz med bild header
//   SlideG  – Video 75% av skärmen, textremsa under
//   SlideH  – Illustration vänster (rundad yta) + text höger (Styrelsekörkortet-stilen)
//   SlideI  – Person vänster + pratbubbla + rubrik/text höger (E.ON-stilen)
//
// HJÄLPKOMPONENTER (återanvändbara i alla mallar):
//   <Bullet>         – Orange punkt + text
//   <CheckItem>      – Grön check + text
//   <StegRad>        – Numrerat steg
//   <InfoBox>        – Orange accent-ruta
//   <FrameBox>       – Grå faktaruta
//   <TwoCol>         – Två kolumner

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

// ══════════════════════════════════════════════════════════
// HJÄLPKOMPONENTER
// ══════════════════════════════════════════════════════════

export const Badge = ({ text }: { text: string }) => (
  <div
    className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
    style={{ background: `${O}18`, color: O, border: `1px solid ${O}35` }}
  >
    {text}
  </div>
);

export const Heading = ({
  children,
  size = 'lg',
}: {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const cls = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  }[size];
  return (
    <h2
      className={`${cls} font-black leading-tight mb-3 text-gray-900`}
      style={{ fontFamily: "'Nunito', sans-serif" }}
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  );
};

export const Ingress = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-500 text-base leading-relaxed mb-5">{children}</p>
);

export const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 mb-3">
    <div
      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
      style={{ background: O }}
    />
    <p className="text-gray-700 text-sm leading-relaxed">{children}</p>
  </div>
);

export const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 mb-3">
    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: O }} />
    <p className="text-gray-700 text-sm leading-relaxed">{children}</p>
  </div>
);

export const StegRad = ({
  nr,
  titel,
  desc,
}: {
  nr: string;
  titel: string;
  desc?: string;
}) => (
  <div className="flex items-start gap-4 mb-4">
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
      style={{ background: O }}
    >
      {nr}
    </div>
    <div>
      <p className="font-bold text-gray-900 text-sm">{titel}</p>
      {desc && <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>}
    </div>
  </div>
);

export const InfoBox = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div
    className="rounded-2xl p-4 border-l-4 mt-5"
    style={{ borderColor: O, background: '#FFF5F2' }}
  >
    {title && (
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: O }}>
        {title}
      </p>
    )}
    <p className="text-gray-700 text-sm leading-relaxed">{children}</p>
  </div>
);

export const FrameBox = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-4 border border-gray-200 bg-gray-50 mt-4">
    {title && (
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">{title}</p>
    )}
    <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
  </div>
);

export const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE A — Bild vänster, text höger (klassisk SplitSlide)
// ══════════════════════════════════════════════════════════
interface SlideAProps {
  bild: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
}

export const SlideA = ({ bild, badge, title, children }: SlideAProps) => (
  <div className="h-full flex overflow-hidden bg-white">
    {/* Vänster: bild — desktop */}
    <div className="hidden lg:block w-[42%] flex-shrink-0 relative">
      <img
        src={bild}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>

    {/* Höger: content */}
    <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 pb-28">
      {/* Mobilbild — fullwidth, fast höjd */}
      <div className="lg:hidden w-full rounded-2xl overflow-hidden mb-6"
        style={{ height: 220 }}>
        <img src={bild} alt="" className="w-full h-full object-cover" />
      </div>

      {badge && <Badge text={badge} />}
      <Heading>{title}</Heading>
      {children}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE B — Bild höger, text vänster
// ══════════════════════════════════════════════════════════
interface SlideBProps {
  bild: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
}

export const SlideB = ({ bild, badge, title, children }: SlideBProps) => (
  <div className="h-full flex overflow-hidden bg-white">
    {/* Vänster: content */}
    <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-10 pb-28">
      {/* Mobilbild */}
      <div className="lg:hidden w-full h-48 rounded-2xl overflow-hidden mb-6">
        <img src={bild} alt="" className="w-full h-full object-cover" />
      </div>

      {badge && <Badge text={badge} />}
      <Heading>{title}</Heading>
      {children}
    </div>

    {/* Höger: bild */}
    <div className="hidden lg:block w-[42%] flex-shrink-0 relative">
      <img
        src={bild}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE C — Bild som header fullwidth, vitt content under
// (E.ON-klassikern)
// ══════════════════════════════════════════════════════════
interface SlideCProps {
  bild: string;
  bildHöjd?: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
}

export const SlideC = ({
  bild,
  bildHöjd = '38%',
  badge,
  title,
  children,
}: SlideCProps) => (
  <div className="h-full flex flex-col overflow-hidden bg-white">
    {/* Header-bild */}
    <div
      className="w-full flex-shrink-0 relative"
      style={{ height: bildHöjd, minHeight: 160, maxHeight: 320 }}
    >
      <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      {/* Subtil gradient nederkant */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
      />
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto px-6 sm:px-12 pt-4 pb-28">
      {badge && <Badge text={badge} />}
      <Heading>{title}</Heading>
      {children}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE D — Pratbubbla-dialog (E.ON two-person layout)
// Bild fullscreen, pratbubblor ovanpå
// ══════════════════════════════════════════════════════════
interface Bubbla {
  text: string;
  position: 'left-top' | 'left-mid' | 'left-bot' | 'right-top' | 'right-mid' | 'right-bot';
  color?: 'orange' | 'dark' | 'light';
}

interface SlideDProps {
  bild: string;
  badge?: string;
  bubblor: Bubbla[];
}

const BUBBLA_POS: Record<Bubbla['position'], string> = {
  'left-top':  'top-[8%]  left-[32%]',
  'left-mid':  'top-[38%] left-[28%]',
  'left-bot':  'top-[65%] left-[30%]',
  'right-top': 'top-[12%] right-[6%]',
  'right-mid': 'top-[40%] right-[4%]',
  'right-bot': 'top-[68%] right-[6%]',
};

const BUBBLA_COLOR: Record<NonNullable<Bubbla['color']>, string> = {
  orange: O,
  dark:   '#1e293b',
  light:  '#e2e8f0',
};

const BUBBLA_TEXT: Record<NonNullable<Bubbla['color']>, string> = {
  orange: 'white',
  dark:   'white',
  light:  '#1e293b',
};

export const SlideD = ({ bild, badge, bubblor }: SlideDProps) => (
  <div className="h-full relative overflow-hidden">
    <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.08)' }} />

    {/* Badge */}
    {badge && (
      <div className="absolute top-4 left-4 z-10">
        <div
          className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: O, color: 'white' }}
        >
          {badge}
        </div>
      </div>
    )}

    {/* Pratbubblor */}
    {bubblor.map((b, i) => {
      const color = b.color ?? 'orange';
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
          className={`absolute z-10 max-w-[240px] rounded-2xl px-4 py-3 shadow-lg ${BUBBLA_POS[b.position]}`}
          style={{
            background: BUBBLA_COLOR[color],
            color: BUBBLA_TEXT[color],
          }}
        >
          <p className="text-sm font-medium leading-snug">{b.text}</p>
        </motion.div>
      );
    })}
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE E — Bild i övre zonen, punktlista under
// (E.ON "Tillse att..."-konstruktionen)
// ══════════════════════════════════════════════════════════
interface SlideEProps {
  bild: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  punkter: string[];
  fotnot?: string;
  fotnotColor?: string;
}

export const SlideE = ({
  bild,
  badge,
  badgeColor = O,
  title,
  punkter,
  fotnot,
  fotnotColor = O,
}: SlideEProps) => (
  <div className="h-full flex flex-col overflow-hidden">
    {/* Övre bildsegment — större höjd för synlighet */}
    <div className="relative flex-shrink-0" style={{ height: '45%', minHeight: 180, maxHeight: 340 }}>
      <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />

      {/* Badge ovanpå bilden */}
      {badge && (
        <div className="absolute bottom-0 left-0 m-4">
          <div
            className="inline-block px-4 py-2 font-bold text-sm text-white rounded-r-xl rounded-tl-xl"
            style={{ background: badgeColor }}
          >
            {badge}
          </div>
        </div>
      )}
    </div>

    {/* Undre content */}
    <div className="flex-1 overflow-y-auto bg-white px-6 sm:px-10 pt-5 pb-28">
      <h2
        className="text-xl sm:text-2xl font-black text-gray-900 mb-5 leading-tight"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {title}
      </h2>

      <div className="space-y-3 mb-6">
        {punkter.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3"
          >
            <CheckCircle
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: '#22c55e' }}
            />
            <p
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          </motion.div>
        ))}
      </div>

      {fotnot && (
        <div
          className="rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ background: `${fotnotColor}12`, border: `1px solid ${fotnotColor}25` }}
        >
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-black"
            style={{ background: fotnotColor }}
          >
            !
          </div>
          <p
            className="text-sm leading-relaxed font-medium"
            style={{ color: fotnotColor === O ? '#b91c1c' : fotnotColor }}
            dangerouslySetInnerHTML={{ __html: fotnot }}
          />
        </div>
      )}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE F — Quiz-layout: bild som header + fråga under
// (E.ON Kunskapskoll-konstruktionen)
// ══════════════════════════════════════════════════════════
interface SlideFProps {
  bild: string;
  badge?: string;
  children: React.ReactNode; // InlineQuiz eller annan quiz-komponent
}

export const SlideF = ({ bild, badge, children }: SlideFProps) => (
  <div className="h-full flex flex-col overflow-hidden">
    {/* Header-bild — tydligare höjd */}
    <div className="relative flex-shrink-0" style={{ height: '42%', minHeight: 160, maxHeight: 300 }}>
      <img src={bild} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.18)' }} />

      {badge && (
        <div className="absolute bottom-0 left-0 m-4">
          <div
            className="inline-block px-4 py-2 font-bold text-sm text-white"
            style={{ background: O, borderRadius: '0 12px 12px 0' }}
          >
            {badge}
          </div>
        </div>
      )}
    </div>

    {/* Quiz-content */}
    <div className="flex-1 overflow-y-auto bg-white px-6 sm:px-10 pt-6 pb-28">
      {children}
    </div>
  </div>
);

// ── SLIDE G — Video thumbnail centrerad + modal ──────────
interface SlideGProps {
  videoId: string;
  badge?: string;
  title: string;
  desc?: string;
  speaker?: string;
  duration?: string;
  onComplete?: () => void;
  isDone?: boolean;
}

export const SlideG = ({
  videoId, badge, title, desc, speaker, duration, onComplete, isDone,
}: SlideGProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-6 pb-24">

      {/* Badge */}
      {badge && (
        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: `${O}18`, color: O, border: `1px solid ${O}35` }}>
            {badge}
          </span>
        </div>
      )}

      {/* Titel */}
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-2 max-w-xl leading-tight"
        style={{ fontFamily: "'Nunito', sans-serif" }}>
        {title}
      </h2>
      {speaker && <p className="text-sm text-gray-400 text-center mb-1">{speaker}</p>}
      {duration && <p className="text-xs text-gray-300 text-center mb-8">{duration}</p>}
      {!speaker && !duration && <div className="mb-6" />}

      {/* Thumbnail */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOpen}
        className="relative rounded-2xl overflow-hidden shadow-2xl group"
        style={{ width: '100%', maxWidth: 560, aspectRatio: '16/9' }}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
          onError={e => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill={O} className="w-7 h-7 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Speltid */}
        {duration && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.75)' }}>
            {duration}
          </div>
        )}
      </motion.button>

      {/* Beskrivning */}
      {desc && (
        <p className="text-gray-500 text-sm text-center mt-5 max-w-md leading-relaxed">{desc}</p>
      )}

      {/* Sedd-status */}
      {isDone && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
          style={{ background: `${O}15`, color: O }}>
          <CheckCircle className="w-4 h-4" /> Markerad som sedd
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-12 lg:inset-20 z-50 rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10">
                ✕
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SLIDE H — Illustration/bild vänster + text höger
// Inspirerad av Styrelsekörkortet landing-sektionen:
// Rundad bildyta vänster, badge + rubrik + checkpunkter + knapp höger
// ══════════════════════════════════════════════════════════
interface SlideHProps {
  bild: string;
  bildBg?: string;       // bakgrundsfärg bakom bilden, ex '#EEF2F8'
  badge?: string;
  title: string;         // stöder <span> för orange ord
  ingress?: string;
  punkter?: string[];
  knappText?: string;
  onKnapp?: () => void;
  children?: React.ReactNode;
}

export const SlideH = ({
  bild,
  bildBg = '#F0F2F5',
  badge,
  title,
  ingress,
  punkter,
  knappText,
  onKnapp,
  children,
}: SlideHProps) => (
  <div className="h-full flex overflow-hidden bg-white">

    {/* Vänster — rundad bildyta med bakgrundsfärg */}
    <div
      className="hidden lg:flex w-[45%] flex-shrink-0 items-center justify-center p-8"
      style={{ background: bildBg }}
    >
      <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg">
        <img
          src={bild}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Höger — text */}
    <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-10 pb-28">

      {/* Mobilbild */}
      <div
        className="lg:hidden w-full rounded-2xl overflow-hidden mb-6 p-4"
        style={{ background: bildBg }}
      >
        <img src={bild} alt="" className="w-full rounded-xl object-cover max-h-48" />
      </div>

      {badge && (
        <div
          className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          style={{ background: O, color: 'white' }}
        >
          {badge}
        </div>
      )}

      <h2
        className="text-3xl sm:text-4xl font-black leading-tight mb-4 text-gray-900"
        style={{ fontFamily: "'Nunito', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {ingress && (
        <p className="text-gray-500 text-base leading-relaxed mb-6">{ingress}</p>
      )}

      {punkter && (
        <div className="space-y-3 mb-7">
          {punkter.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${O}20` }}
              >
                <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p }} />
            </div>
          ))}
        </div>
      )}

      {children}

      {knappText && onKnapp && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onKnapp}
          className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white shadow-md mt-6"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}
        >
          {knappText} →
        </motion.button>
      )}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
// SLIDE I — Person vänster + pratbubbla + rubrik/text höger
// Inspirerad av E.ON "Cirkulär ekonomi"-konstruktionen:
// Foto av person tar vänster halva, pratbubbla ovanpå,
// rubrik + brödtext + punktlista till höger
// ══════════════════════════════════════════════════════════
interface SlideIProps {
  bild: string;
  bubbla?: string;           // pratbubblans text
  bubblaSida?: 'left' | 'right'; // bubbla pekar mot vänster eller höger
  badge?: string;
  title: string;
  ingress?: string;
  punkter?: string[];
  children?: React.ReactNode;
}

export const SlideI = ({
  bild,
  bubbla,
  bubblaSida = 'right',
  badge,
  title,
  ingress,
  punkter,
  children,
}: SlideIProps) => (
  <div className="h-full flex overflow-hidden bg-white">

    {/* Vänster — personfoto med pratbubbla */}
    <div className="hidden lg:block w-[42%] flex-shrink-0 relative overflow-hidden">
      <img
        src={bild}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Pratbubbla */}
      {bubbla && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
          className="absolute top-[18%] z-10 max-w-[200px]"
          style={{ [bubblaSida === 'right' ? 'right' : 'left']: '1rem' }}
        >
          {/* Bubbla-kropp */}
          <div
            className="rounded-2xl px-4 py-3 text-white text-sm font-medium leading-snug shadow-lg"
            style={{ background: O }}
          >
            {bubbla}
          </div>
          {/* Pil som pekar nedåt-vänster mot personen */}
          <div
            className="w-0 h-0 ml-5"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: `10px solid ${O}`,
            }}
          />
        </motion.div>
      )}
    </div>

    {/* Höger — text */}
    <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-10 pb-28">

      {/* Mobil: bild + bubbla */}
      <div className="lg:hidden relative w-full h-52 rounded-2xl overflow-hidden mb-6">
        <img src={bild} alt="" className="w-full h-full object-cover object-top" />
        {bubbla && (
          <div
            className="absolute top-4 right-4 max-w-[160px] rounded-2xl px-3 py-2 text-white text-xs font-medium shadow-lg"
            style={{ background: O }}
          >
            {bubbla}
          </div>
        )}
      </div>

      {badge && (
        <p
          className="text-sm font-black uppercase tracking-widest mb-3"
          style={{ color: O, fontFamily: "'Nunito', sans-serif" }}
        >
          {badge}
        </p>
      )}

      <h2
        className="text-2xl sm:text-3xl font-black leading-tight mb-4 text-gray-900"
        style={{ fontFamily: "'Nunito', sans-serif" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {ingress && (
        <p className="text-gray-600 text-base leading-relaxed mb-5">{ingress}</p>
      )}

      {punkter && (
        <ul className="space-y-2 mb-6">
          {punkter.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
              <p className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p }} />
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  </div>
);

export default SlideA;