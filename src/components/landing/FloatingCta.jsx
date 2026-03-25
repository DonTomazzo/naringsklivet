import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, CheckCircle } from 'lucide-react';

const FloatingContact = ({ show }) => {
  const [open, setOpen] = useState(false);
  const [sent, setSent]  = useState(false);
  const [form, setForm]  = useState({ namn: '', mejl: '', telefon: '' });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = () => {
    if (!form.namn || !form.mejl) return;
    console.log('Kontakt:', form);
    setSent(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setForm({ namn: '', mejl: '', telefon: '' });
    }, 300);
  };

  const inp = "w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#FF5421] focus:ring-2 focus:ring-[#FF5421]/20 transition-all";

  return (
    <>
      {/* ── Floating trigger ─────────────────────────── */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-8 sm:right-8 sm:left-auto"
          >
            {/* Mobil – full bredd */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              className="sm:hidden w-full min-h-[56px] px-6 py-4 font-bold
                         flex items-center justify-center gap-2 text-white text-base"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            >
              <Mail size={18} />
              Jag vill veta mer
            </motion.button>

            {/* Desktop – cirkel */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              title="Kontakta oss"
              className="hidden sm:flex w-16 h-16 rounded-full items-center justify-center border-4 border-white"
              style={{
                background: 'linear-gradient(135deg, #FF5421, #E04619)',
                boxShadow: '0 8px 32px rgba(255,84,33,0.45)',
              }}
            >
              <Mail size={26} fill="white" className="text-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
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
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 flex flex-col"
              style={{ maxHeight: '92vh' }}
            >
              <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">

                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 flex-shrink-0 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-1">Mer information</p>
                      <h3 className="text-xl font-bold text-gray-900">Jag vill veta mer</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Vi kontaktar dig inom 24 timmar</p>
                    </div>
                    <button onClick={handleClose}
                      className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                      <X size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div key="sent"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-12 text-center">
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                          className="w-20 h-20 rounded-full bg-[#FF5421] flex items-center justify-center mb-6">
                          <CheckCircle size={36} className="text-white" />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">Tack, {form.namn}!</h4>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                          Vi kontaktar dig på <strong>{form.mejl}</strong> eller <strong>{form.telefon}</strong> inom 24 timmar med mer information.
                        </p>
                        <button onClick={handleClose}
                          className="mt-8 px-8 py-3 rounded-lg font-medium text-white"
                          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
                          Stäng
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div key="form" className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Namn</label>
                          <input value={form.namn} onChange={e => set('namn', e.target.value)}
                            placeholder="Anna Svensson" className={inp} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-postadress</label>
                          <input type="email" value={form.mejl} onChange={e => set('mejl', e.target.value)}
                            placeholder="anna@brfrackmackan.se" className={inp} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefonnummer <span className="text-gray-400 font-normal text-xs">(valfritt)</span>
                          </label>
                          <input type="tel" value={form.telefon} onChange={e => set('telefon', e.target.value)}
                            placeholder="070-000 00 00" className={inp} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                {!sent && (
                  <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                    <button
                      onClick={handleSubmit}
                      disabled={!form.namn || !form.mejl || !form.meddelande}
                      className="w-full py-3.5 rounded-lg font-medium text-white flex items-center
                                 justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
                      style={{
                        background: 'linear-gradient(to right, #FF5421, #E04619)',
                        boxShadow: '0 4px 16px rgba(255,84,33,0.25)',
                      }}
                    >
                      <Send size={16} />
                      Skicka – jag vill veta mer
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
                      Genom att skicka godkänner du att vi kontaktar dig med den information du efterfrågat.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContact;