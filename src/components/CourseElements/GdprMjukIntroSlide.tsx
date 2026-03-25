// GdprMjukIntroSlide.tsx
// Slide 2 – Mjuk inledning till GDPR
// Placeras MELLAN IntroSlide och VadArGdprSlide
// Manus: "Nu kanske ni tänker, å nej, inte ännu en lag..."

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Scale, AlertCircle, ChevronRight } from 'lucide-react';
import AudioPlayer from '../../components/AudioPlayer';

// ── Animations ──────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Stat pill ────────────────────────────────────────────
const StatPill = ({
  value, label, delay,
}: { value: string; label: string; delay: number }) => (
  <motion.div
    {...fadeUp(delay)}
    className="flex flex-col items-center bg-white/6 border border-white/10
               rounded-2xl px-5 py-4 backdrop-blur-sm text-center"
  >
    <span className="text-2xl sm:text-3xl font-bold text-[#FF5421] leading-none mb-1">
      {value}
    </span>
    <span className="text-xs text-gray-400 leading-snug max-w-[90px]">{label}</span>
  </motion.div>
);

// ── Quote block ─────────────────────────────────────────
const QuoteBlock = ({
  quote, delay,
}: { quote: string; delay: number }) => (
  <motion.blockquote
    {...fadeUp(delay)}
    className="border-l-2 border-[#FF5421] pl-4 sm:pl-5 py-1 my-4"
  >
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
      {quote}
    </p>
  </motion.blockquote>
);

// ── Trust card ───────────────────────────────────────────
const TrustCard = ({
  icon: Icon, title, body, delay,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  delay: number;
}) => (
  <motion.div
    {...fadeUp(delay)}
    className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5
               hover:bg-white/8 transition-colors duration-300"
  >
    <div className="w-9 h-9 rounded-xl bg-[#FF5421]/15 flex items-center justify-center mb-3">
      <Icon className="w-5 h-5 text-[#FF5421]" />
    </div>
    <h4 className="text-white font-semibold text-sm sm:text-base mb-1.5">{title}</h4>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{body}</p>
  </motion.div>
);

// ── Main component ───────────────────────────────────────
const GdprMjukIntroSlide: React.FC = () => {
  const [played, setPlayed] = useState(false);

  return (
    <div className="min-h-full w-full bg-[#0f1623] overflow-y-auto">

      {/* ── Hero band ─────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* orange glow top-left */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle,#FF5421,transparent 70%)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-8">

          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-block bg-[#FF5421]/15 text-[#FF5421] border border-[#FF5421]/25
                             px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5">
              Kapitel · 1
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.06)}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
          >
            VAD ÄR GDPR{' '}
            <span className="text-[#FF5421]"> - en introduktion</span> {' '}
            
          </motion.h2>

          {/* Narrator */}
          <motion.div {...fadeUp(0.1)} className="mb-6">
            <AudioPlayer
              audioSrc="/audio/vad-ar-gdpr.mp3"
              onPlay={() => setPlayed(true)}
            />
          </motion.div>

         
        </div>
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16 space-y-8">

        

        {/* What is GDPR – 3 trust cards */}
        <div>
          <motion.h3
            {...fadeUp(0.3)}
            className="text-white font-bold text-base sm:text-lg mb-4"
          >
            Vad är GDPR?
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <TrustCard
              icon={Shield}
              title="En EU-förordning"
              body="General Data Protection Regulation gäller i hela EU sedan maj 2018 och ersatte den tidigare PUL - Personuppgiftslagen i Sverige."
              delay={0.32}
            />
            <TrustCard
              icon={Heart}
              title="Skyddar integritet"
              body="Syftet är att stärka enskildas rätt till sina egna personuppgifter och harmonisera lagstiftningen i Europa."
              delay={0.38}
            />
            <TrustCard
              icon={Scale}
              title="Gäller alla BRF:er"
              body="Er förening är personuppgiftsansvarig och måste följa GDPR – oavsett storlek. Det praktiska ansvaret ligger hos styrelsen."
              delay={0.44}
            />
          </div>
        </div>

        

        {/* Bottom nudge – contextualise for next slide */}
        <motion.div
          {...fadeUp(0.68)}
          className="flex items-center gap-3 bg-white/4 border border-white/8
                     rounded-xl px-4 sm:px-5 py-3 sm:py-4"
        >
          <ChevronRight className="w-4 h-4 text-[#FF5421] flex-shrink-0" />
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            <strong className="text-gray-200">Härnäst:</strong> Vi tittar på de
            sju grundprinciperna i GDPR – de är mer logiska än du tror.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default GdprMjukIntroSlide;