import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

const GuaranteeSection = () => (
  <section className="py-16 sm:py-20 bg-slate-50">
    <div className="max-w-3xl mx-auto px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ backgroundColor: '#FFF0EB' }}>
          <Shield size={32} style={{ color: '#FF5421' }} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          30 dagars nöjd-kund-garanti
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          Vi är så säkra på att Styrelsekörkortet kommer att göra dig tryggare i din styrelseroll
          att vi backar upp det med en full återbetalning inom 30 dagar – inga frågor ställs.
          Du tar ingen risk alls.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-slate-600">
          {["Säker betalning", "Omedelbar tillgång", "30 dagars garanti"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
export default GuaranteeSection;