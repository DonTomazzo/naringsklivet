import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowRight, CheckCircle,
  Users, Building2, User, Mail, Phone
} from 'lucide-react';

const O  = '#FF5421';
const OD = '#E04619';

const DATES = [
  { id: 1, datum: '18 mars 202jhj6',  dag: 'Onsdag', platser: 8,  full: false },
  { id: 2, datum: '1 april 2026',  dag: 'Onsdag', platser: 12, full: false },
  { id: 3, datum: '22 april 2026', dag: 'Onsdag', platser: 3,  full: false },
  { id: 4, datum: '6 maj 2026',    dag: 'Onsdag', platser: 10, full: false },
  { id: 5, datum: '20 maj 2026',   dag: 'Onsdag', platser: 0,  full: true  },
];

// ── Validerat input ───────────────────────────────────────
const Field = ({ label, id, type = 'text', placeholder, value, onChange, onBlur, touched, valid, error }) => {
  const isInvalid = touched && !valid && value;
  const isValid   = touched && valid;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input type={type} value={value}
          onChange={e => onChange(id, e.target.value)}
          onBlur={() => onBlur(id)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#FF5421]/20
            ${isValid   ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium' : ''}
            ${isInvalid ? 'border-red-300 bg-red-50' : ''}
            ${!isValid && !isInvalid ? 'border-gray-300 focus:border-[#FF5421]' : ''}`} />
        {isValid && (
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-[#FF5421] fill-current" />
          </motion.div>
        )}
      </div>
      {isInvalid && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

// ── Modal steg 1 ──────────────────────────────────────────
const BookingModal = ({ valt, onClose, onNext }) => {
  const [form, setForm]       = useState({ organisation: '', namn: '', telefon: '', mejl: '', licenser: '1' });
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((id, value) => setForm(p => ({ ...p, [id]: value })), []);
  const handleBlur   = useCallback((id) => setTouched(p => ({ ...p, [id]: true })), []);

  const isValid = {
    organisation: form.organisation.trim().length > 0,
    namn:         form.namn.trim().length > 0,
    telefon:      /^[\d\s\-+()]{6,}$/.test(form.telefon),
    mejl:         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mejl),
  };
  const allValid = Object.values(isValid).every(Boolean);

  const handleNext = () => {
    setTouched({ organisation: true, namn: true, telefon: true, mejl: true });
    if (allValid) onNext(form);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 flex flex-col"
        style={{ maxHeight: '92vh' }}>
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Uppstartsdatum</p>
                <h3 className="text-xl font-bold text-gray-900">{valt.datum}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{valt.dag} · {valt.platser} platser kvar</p>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: O }}>
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div className="flex-1 h-1 rounded-full bg-gray-200">
                <div className="w-1/2 h-full rounded-full" style={{ background: O }} />
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-bold">2</span>
              </div>
              <span className="text-xs text-gray-400">Steg 1 av 2</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">Dina uppgifter</h4>
              <p className="text-sm text-gray-500">Grunduppgifter för din anmälan och licensköp</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label={<><Building2 className="w-4 h-4 inline mr-1.5" />Företag / organisation</>}
                  id="organisation" value={form.organisation}
                  placeholder="Acme AB" onChange={handleChange} onBlur={handleBlur}
                  touched={touched.organisation} valid={isValid.organisation} error="Ange företag eller namn" />
              </div>
              <div className="sm:col-span-2">
                <Field label={<><User className="w-4 h-4 inline mr-1.5" />Kontaktperson</>}
                  id="namn" value={form.namn} placeholder="Anna Svensson"
                  onChange={handleChange} onBlur={handleBlur}
                  touched={touched.namn} valid={isValid.namn} error="Ange ditt namn" />
              </div>
              <Field label={<><Phone className="w-4 h-4 inline mr-1.5" />Telefon</>}
                id="telefon" type="tel" value={form.telefon} placeholder="070-000 00 00"
                onChange={handleChange} onBlur={handleBlur}
                touched={touched.telefon} valid={isValid.telefon} error="Ange telefonnummer" />
              <Field label={<><Mail className="w-4 h-4 inline mr-1.5" />E-post</>}
                id="mejl" type="email" value={form.mejl} placeholder="anna@företaget.se"
                onChange={handleChange} onBlur={handleBlur}
                touched={touched.mejl} valid={isValid.mejl} error="Ange giltig e-post" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Users className="w-4 h-4 inline mr-1.5" />Antal licenser
              </label>
              <p className="text-xs text-gray-400 mb-3">En licens per deltagare.</p>
              <div className="flex items-center gap-3">
                <button onClick={() => handleChange('licenser', String(Math.max(1, Number(form.licenser) - 1)))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center
                             text-gray-600 hover:border-[#FF5421] hover:text-[#FF5421] transition-colors font-bold text-lg">−</button>
                <span className="text-2xl font-bold text-gray-900 w-8 text-center">{form.licenser}</span>
                <button onClick={() => handleChange('licenser', String(Math.min(100, Number(form.licenser) + 1)))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center
                             text-gray-600 hover:border-[#FF5421] hover:text-[#FF5421] transition-colors font-bold text-lg">+</button>
                <span className="text-sm text-gray-400 ml-1">deltagare</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <button onClick={handleNext}
              className="w-full py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              style={{ background: `linear-gradient(to right, ${O}, ${OD})`, boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
              Fortsätt <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ── Modal steg 2 ──────────────────────────────────────────
const FullFormModal = ({ valt, prefill, onClose }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ ...prefill, meddelande: '' });
  const handleChange = useCallback((id, value) => setForm(p => ({ ...p, [id]: value })), []);

  const inp = `w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800
    placeholder-gray-300 focus:outline-none focus:border-[#FF5421] focus:ring-2 focus:ring-[#FF5421]/20 transition-all`;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl z-50 flex flex-col"
        style={{ maxHeight: '92vh' }}>
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: O }}>Fullständig anmälan</p>
                <h3 className="text-xl font-bold text-gray-900">{valt.datum}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{valt.dag}</p>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
              <div className="flex-1 h-1 rounded-full" style={{ background: O }} />
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: O }}>
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-xs text-gray-400">Steg 2 av 2</span>
            </div>
          </div>

          {sent ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: O }}>
                <CheckCircle size={36} className="text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Tack för din anmälan!</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                Vi återkommer till <strong>{form.mejl}</strong> inom 24 timmar.
              </p>
              <button onClick={onClose} className="px-8 py-3 rounded-lg font-medium text-white"
                style={{ background: `linear-gradient(to right, ${O}, ${OD})` }}>Stäng</button>
            </motion.div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="mb-5">
                  <h4 className="text-base font-semibold text-gray-900 mb-1">Komplettera din anmälan</h4>
                  <p className="text-sm text-gray-500">Bekräfta uppgifterna och slutför din licensbeställning</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['col-span-2', 'Företag / organisation', 'organisation', 'text',  'Acme AB'],
                    ['col-span-2', 'Kontaktperson',          'namn',         'text',  'Anna Svensson'],
                    ['col-span-1', 'Telefon',                'telefon',      'tel',   '070-000 00 00'],
                    ['col-span-1', 'E-post',                 'mejl',         'email', 'anna@...'],
                  ].map(([span, label, id, type, placeholder]) => (
                    <div key={id} className={span}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                      <input type={type} value={form[id] || ''} onChange={e => handleChange(id, e.target.value)}
                        placeholder={placeholder} className={inp} />
                    </div>
                  ))}
                  <div className="col-span-2 flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 border-2 border-orange-100">
                    <Users size={16} className="text-[#FF5421] flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>{form.licenser}</strong> {Number(form.licenser) === 1 ? 'licens' : 'licenser'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande (valfritt)</label>
                    <textarea value={form.meddelande} onChange={e => handleChange('meddelande', e.target.value)}
                      rows={3} placeholder="Eventuella önskemål eller frågor..."
                      className={`${inp} resize-none`} />
                  </div>
                  <div className="col-span-2 bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">Sammanfattning</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Organisation:</strong> {form.organisation}</p>
                      <p><strong>Datum:</strong> {valt.datum}</p>
                      <p><strong>Licenser:</strong> {form.licenser} st</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                <button onClick={() => setSent(true)}
                  className="w-full py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                  style={{ background: `linear-gradient(to right, ${O}, ${OD})`, boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
                  <CheckCircle size={16} /> Skicka anmälan & beställ licenser
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

// ── HUVUDKOMPONENT ────────────────────────────────────────
export default function DatePicker() {
  const [valt, setValt]       = useState(null);
  const [step, setStep]       = useState(null);
  const [prefill, setPrefill] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        {DATES.map((d, i) => (
          <button key={d.id}
            disabled={d.full}
            onClick={() => { if (!d.full) { setValt(d); setStep('quick'); } }}
            className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-gray-100 last:border-0 transition-colors
              ${d.full ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 cursor-pointer'}
              ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>

            {/* Dato */}
            <div className="flex-shrink-0 w-12 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide"
                style={{ color: d.full ? '#9ca3af' : '#94a3b8' }}>
                {d.datum.split(' ')[1]}
              </div>
              <div className="text-2xl font-black leading-tight"
                style={{ color: d.full ? '#9ca3af' : O }}>
                {d.datum.split(' ')[0]}
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-gray-200 flex-shrink-0" />

            {/* Datum + dag */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800">{d.datum}</p>
              <p className="text-xs text-gray-400 mt-0.5">{d.dag}</p>
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
              {d.full ? (
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  Fullbokat
                </span>
              ) : d.platser <= 4 ? (
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,84,33,0.1)', color: O }}>
                  {d.platser} kvar
                </span>
              ) : (
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(251,146,60,0.1)', color: '#EA6C00' }}>
                  Ledigt
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {step === 'quick' && valt && (
          <BookingModal valt={valt}
            onClose={() => { setStep(null); setValt(null); }}
            onNext={(data) => { setPrefill(data); setStep('full'); }} />
        )}
        {step === 'full' && valt && prefill && (
          <FullFormModal valt={valt} prefill={prefill}
            onClose={() => { setStep(null); setValt(null); setPrefill(null); }} />
        )}
      </AnimatePresence>
    </>
  );
}