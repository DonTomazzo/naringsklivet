// src/components/CourseElements/CourseFeedback.tsx
// Används under kursens gång för att samla löpande feedback
// Trigger: knapp i FloatingFAQ, sidebaren eller efter varje slide
//
// TODO: koppla handleSend till Supabase
//   const { error } = await supabase.from('feedback').insert({
//     user_id: session.user.id,
//     module_id: moduleId,
//     slide_id: slideId,
//     rating,
//     comment: text,
//     created_at: new Date().toISOString(),
//   })

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, CheckCircle, MessageSquare } from 'lucide-react';

// ── Props ────────────────────────────────────────────────
interface CourseFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId?: string;   // t.ex. 'gdpr-personuppgifter'
  slideId?: string;    // t.ex. 'rattsliga-grunder'
  moduleTitle?: string; // visas i modalens header
}

const CourseFeedback = ({
  isOpen,
  onClose,
  moduleId,
  slideId,
  moduleTitle = 'kursen',
}: CourseFeedbackProps) => {
  const [rating,  setRating]  = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text,    setText]    = useState('');
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);

  const handleClose = () => {
    onClose();
    // Återställ state efter animation
    setTimeout(() => {
      setRating(0);
      setHovered(0);
      setText('');
      setSent(false);
    }, 300);
  };

  const handleSend = async () => {
    if (!rating) return;
    setSending(true);

    // TODO: ersätt med Supabase-insert
    console.log('Feedback:', { moduleId, slideId, rating, text });
    await new Promise(r => setTimeout(r, 400)); // simulera nätverksanrop

    setSending(false);
    setSent(true);
  };

  const LABELS = ['', 'Inte bra', 'Kunde vara bättre', 'Okej', 'Bra', 'Utmärkt!'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2
                       sm:-translate-x-1/2 sm:-translate-y-1/2
                       sm:w-full sm:max-w-md z-50 flex flex-col"
            style={{ maxHeight: '92vh' }}
          >
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">

              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5
                              flex-shrink-0 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,84,33,0.1)' }}>
                      <MessageSquare size={17} style={{ color: '#FF5421' }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest">
                        Feedback
                      </p>
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        Hur upplever du {moduleTitle}?
                      </h3>
                    </div>
                  </div>
                  <button onClick={handleClose}
                    className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300
                               flex items-center justify-center transition-colors flex-shrink-0">
                    <X size={15} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AnimatePresence mode="wait">
                  {sent ? (
                    /* ── Bekräftelse ── */
                    <motion.div key="sent"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                        style={{ background: 'rgba(255,84,33,0.1)' }}>
                        <CheckCircle size={30} style={{ color: '#FF5421' }} />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Tack!</h4>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        Din feedback hjälper oss att göra kursen bättre
                        för alla styrelseledamöter.
                      </p>
                      <button onClick={handleClose}
                        className="mt-7 px-8 py-3 rounded-xl font-bold text-white text-sm"
                        style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
                        Stäng
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Formulär ── */
                    <motion.div key="form" className="space-y-6">

                      {/* Stjärnor */}
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-4">Välj ett betyg</p>
                        <div className="flex justify-center gap-2 mb-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button
                              key={s}
                              onMouseEnter={() => setHovered(s)}
                              onMouseLeave={() => setHovered(0)}
                              onClick={() => setRating(s)}
                              className="transition-transform hover:scale-110 active:scale-95"
                            >
                              <Star
                                size={38}
                                className="transition-all duration-150"
                                fill={(hovered || rating) >= s ? '#FF5421' : 'transparent'}
                                color={(hovered || rating) >= s ? '#FF5421' : '#cbd5e1'}
                              />
                            </button>
                          ))}
                        </div>
                        <AnimatePresence mode="wait">
                          {(hovered || rating) > 0 && (
                            <motion.p
                              key={hovered || rating}
                              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-sm font-semibold"
                              style={{ color: '#FF5421' }}
                            >
                              {LABELS[hovered || rating]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Kommentar */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kommentar{' '}
                          <span className="text-gray-400 font-normal">(valfritt)</span>
                        </label>
                        <textarea
                          value={text}
                          onChange={e => setText(e.target.value)}
                          placeholder="Vad tyckte du var bra? Vad kan bli bättre?"
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm
                                     text-gray-800 placeholder-gray-300 resize-none
                                     focus:outline-none focus:border-[#FF5421]
                                     focus:ring-2 focus:ring-[#FF5421]/20 transition-all"
                        />
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!sent && (
                <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                  <button
                    onClick={handleSend}
                    disabled={!rating || sending}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm
                               flex items-center justify-center gap-2
                               transition-all hover:opacity-90 disabled:opacity-35"
                    style={{
                      background: 'linear-gradient(to right, #FF5421, #E04619)',
                      boxShadow: rating ? '0 4px 16px rgba(255,84,33,0.25)' : 'none',
                    }}
                  >
                    {sending ? (
                      <motion.div animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                        <Send size={15} />
                      </motion.div>
                    ) : (
                      <Send size={15} />
                    )}
                    {sending ? 'Skickar...' : 'Skicka feedback'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CourseFeedback;