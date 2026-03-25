import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FloatingFAQProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  buttonColor?: string;
}

const FloatingFAQ: React.FC<FloatingFAQProps> = ({
  faqs,
  title = "Vanliga frågor",
  subtitle = "Här är svaren på de vanligaste frågorna om kursen",
  buttonColor = "#FF5421"
}) => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFaqOpen(true)}
        className="fixed bottom-20 right-12 z-50 text-white p-4 rounded-full shadow-2xl"
        style={{ backgroundColor: buttonColor }}
        title="Vanliga frågor"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isFaqOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFaqOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-4xl md:w-full z-50 max-h-[90vh] overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl h-full flex flex-col">
                {/* Header */}
                <div 
                  className="p-6 text-white"
                  style={{ backgroundColor: buttonColor }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <button
                      onClick={() => setIsFaqOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-white/90 mt-2">{subtitle}</p>
                </div>

                {/* FAQ Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
                      >
                        <motion.button
                          whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
                          className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                          <span className="font-bold text-slate-900 pr-4">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: openFaq === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown 
                              size={20} 
                              className="flex-shrink-0" 
                              style={{ color: buttonColor }}
                            />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 text-slate-700 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer (optional) */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 text-center">
                  <p className="text-sm text-slate-600">
                    Har du fler frågor? Kontakta oss på{' '}
                    <a 
                      href="mailto:support@styrelsekorkortet.se" 
                      className="font-semibold hover:underline"
                      style={{ color: buttonColor }}
                    >
                      support@styrelsekorkortet.se
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFAQ;