import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';

const STATS = [
  { value: '10',    label: 'frågor' },
  { value: '3 min', label: 'tid' },
  { value: 'Gratis',label: 'kostnad' },
];

const TEASERS = [
  'Vem ansvarar för rörläckage inne i en lägenhet?',
  'Hur lång tid innan stämman måste kallelsen skickas?',
  'Vad händer om styrelsen fattar ett olagligt beslut?',
];

const QuizPromoSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-20 sm:py-28 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Overlay – matchar TestimonialsSection */}
      <div className="absolute inset-0 bg-slate-900/85" />

      {/* Orange accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(255,84,33,0.15)',
              color: '#FF5421',
              border: '1px solid rgba(255,84,33,0.3)',
            }}
          >
            <Zap size={12} /> Gratis kunskapstest
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Hur trygg är du egentligen<br className="hidden sm:block" />
            i din <span style={{ color: '#FF5421' }}>styrelseroll?</span>
          </h2>
          <p className="text-white/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Testa dina kunskaper i BRF-juridik, ekonomi och förvaltning.
            Ta reda på var du står – och vad du behöver lära dig.
          </p>
        </motion.div>

       

        {/* Stats + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
         


          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(255,84,33,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/testa-dig')}
            className="w-full sm:flex-1 py-4 sm:py-5 rounded-2xl font-bold text-white
                       text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
          >
            Starta testet nu
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="text-center text-white/30 text-xs mt-5 flex items-center justify-center gap-1.5"
        >
          <CheckCircle size={11} />
          Ingen registrering · Tar 3 minuter · 1 450+ har redan testat sig
        </motion.p>

      </div>
    </section>
  );
};

export default QuizPromoSection;