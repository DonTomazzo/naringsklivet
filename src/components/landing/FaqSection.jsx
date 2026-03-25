import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Passar kursen mig som aldrig använt AI förut?",
    answer: "Ja, kursen är byggd just för dig. Vi börjar från grunden och förklarar hur AI fungerar på ett praktiskt och lättförståeligt sätt – utan teknisk jargong. Många deltagare har aldrig öppnat ChatGPT innan och kände sig trygga redan efter första modulen.",
  },
  {
    question: "Hur lång tid tar det att genomföra kursen?",
    answer: "De flesta genomför kursen på 4–6 veckor med cirka 2–3 timmar per vecka. Du bestämmer helt själv takten – allt material finns tillgängligt direkt och du har tillgång till det i 365 dagar.",
  },
  {
    question: "Håller sig kursen uppdaterad när nya AI-verktyg lanseras?",
    answer: "Ja. AI-landskapet förändras snabbt och kursmaterialet uppdateras löpande med nya verktyg och metoder. Som deltagare får du alltid tillgång till den senaste versionen utan extra kostnad.",
  },
  {
    question: "Kan hela mitt team eller företag gå kursen?",
    answer: "Absolut, och vi rekommenderar det. När hela organisationen har samma grund blir samarbetet bättre och ni drar nytta av AI-kunskapen gemensamt. Vi erbjuder licenspaket för företag – kontakta oss så berättar vi mer.",
  },
  {
    question: "Behöver jag installera eller köpa några AI-verktyg?",
    answer: "Nej. Kursen visar dig hur du använder gratisversioner av de vanligaste verktygen – ChatGPT, Claude och Gemini. Du kan komma igång direkt utan att spendera en krona extra.",
  },
  {
    question: "Får jag ett certifikat när jag är klar?",
    answer: "Ja. När du genomfört alla moduler och klarat kursen får du ett digitalt certifikat som intygar att du genomgått Näringsklivets AI-träningsprogram. Det kan visas upp för arbetsgivare eller läggas till på LinkedIn.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Vanliga frågor om AI-kursen
          </h2>
          <p className="text-lg text-slate-600">Här är svaren på det vi får frågor om mest</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <button
                className="w-full px-5 sm:px-8 py-5 text-left flex justify-between items-center gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-slate-900 text-base sm:text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={22} style={{ color: '#FF5421' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-8 pb-5 text-slate-700 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;