import { motion } from 'framer-motion';

const messages = [
  "🔥 17 förtroendevalda kollar på denna kurs just nu",
  "⚡ Endast 12 platser kvar i nästa kursstart",
  "🎯 Nästa start: 15 oktober – Bli tryggare i din styrelseroll!",
  "✅ 1 450+ styrelseledamöter har redan genomfört kursen",
];

const SocialProofTicker = () => {
  const repeated = [...messages, ...messages, ...messages];
  return (
    <section className="py-3 bg-slate-900 text-white overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="flex items-center gap-12 whitespace-nowrap"
      >
        {repeated.map((msg, i) => (
          <span key={i} className="text-sm font-medium flex-shrink-0">{msg}</span>
        ))}
      </motion.div>
    </section>
  );
};
export default SocialProofTicker;