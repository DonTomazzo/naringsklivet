import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Play, ArrowRight, Download } from 'lucide-react';

// ── Animation helpers ─────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const bullets = [
  'Frigör timmar varje vecka – direkt från dag ett',
  'Fungerar oavsett roll, bransch eller förkunskap',
  'Konkreta resultat, inte teknisk teori',
];

const HeroSection = ({ onVideoClick }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Background ───────────────────────────────── */}
      <img
        src="/t5.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Layered overlays: dark base + subtle vignette */}
      <div className="absolute inset-0 bg-[#0f1623]/45" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(10,14,26,0.6) 100%)',
        }}
      />
      {/* Subtle orange glow behind headline */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[300px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ background: '#FF5421' }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 text-center pt-24 pb-16">

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-5"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Framtidssäkra 
          <br />
          <span
            style={{
              color: '#FF5421',
              textShadow: '0 0 40px rgba(255,84,33,0.35)',
            }}
          >
            ditt workflow & organisation med AI.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.18)}
          className="text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-xl mx-auto"
        >
          Näringsklivet® är landets mest effektiva träningsprogram AI-utbildning – för medarbetare, chefer och egenföretagare
          som vill ligga steget före och jobba smartare, inte hårdare.
        </motion.p>

        {/* Bullets */}
        <motion.ul
          {...fadeUp(0.26)}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-2 mb-10"
        >
          {bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle
                size={14}
                className="flex-shrink-0"
                style={{ color: '#FF5421' }}
              />
              <span className="text-sm text-white/75 font-medium">{b}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.34)}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/purchase/naringsklivet-ai')}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                       rounded-xl font-bold text-base text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #FF5421 0%, #E04619 100%)',
              boxShadow: '0 4px 24px rgba(255,84,33,0.35), 0 1px 0 rgba(255,255,255,0.12) inset',
            }}
          >
            Köp licenser här
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onVideoClick}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                       rounded-xl font-semibold text-base text-white transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Play size={16} className="fill-current" />
            Se videon om kursen
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            href="/pdf/Naringsklivet_AI_Broschyr.pdf"
            download
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4
                       rounded-xl font-semibold text-base text-white transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Download size={16} />
            Ladda ner broschyr
          </motion.a>
        </motion.div>

      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </motion.div>

    </section>
  );
};

export default HeroSection;