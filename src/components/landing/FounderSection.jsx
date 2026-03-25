import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkshopCta from './WorkshopCta';
import {
  Clock, X, ArrowRight, CheckCircle, Users,
  CalendarCheck, Building2, User, Mail, Phone
} from 'lucide-react';

// ─────────────────────────────────────────────
// UPPSTARTSDATUM
// ─────────────────────────────────────────────

const DATES = [
  { id: 1, datum: '18 mars 2026',  dag: 'Onsdag', platser: 8,  full: false },
  { id: 2, datum: '1 april 2026',  dag: 'Onsdag', platser: 12, full: false },
  { id: 3, datum: '22 april 2026', dag: 'Onsdag', platser: 3,  full: false },
  { id: 4, datum: '6 maj 2026',    dag: 'Onsdag', platser: 10, full: false },
  { id: 5, datum: '20 maj 2026',   dag: 'Onsdag', platser: 0,  full: true  },
];

// ─────────────────────────────────────────────
// INPUT-FÄLT
// ─────────────────────────────────────────────

const Field = ({ label, id, type = 'text', placeholder, value, onChange, onBlur, touched, valid, error }) => {
  const isInvalid = touched && !valid && value;
  const isValid   = touched && valid;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(id, e.target.value)}
          onBlur={() => onBlur(id)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF5421]/20
            ${isValid   ? 'border-[#FF5421] bg-orange-50 text-[#FF5421] font-medium' : ''}
            ${isInvalid ? 'border-red-300 bg-red-50' : ''}
            ${!isValid && !isInvalid ? 'border-gray-300 focus:border-[#FF5421]' : ''}
          `}
        />
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

// ─────────────────────────────────────────────
// MODAL STEG 1
// ─────────────────────────────────────────────

const BookingModal = ({ valt, onClose, onNext }) => {
  const [form, setForm]       = useState({ organisation: '', namn: '', telefon: '', mejl: '', licenser: '1' });
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((id, value) => {
    setForm(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleBlur = useCallback((id) => {
    setTouched(prev => ({ ...prev, [id]: true }));
  }, []);

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
        style={{ maxHeight: '92vh' }}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-1">Uppstartsdatum</p>
                <h3 className="text-xl font-bold text-gray-900">{valt.datum}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{valt.dag} · {valt.platser} platser kvar</p>
              </div>
              <button onClick={onClose}
                className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-7 h-7 rounded-full bg-[#FF5421] flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div className="flex-1 h-1 rounded-full bg-gray-200">
                <div className="w-1/2 h-full bg-[#FF5421] rounded-full" />
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
                  id="organisation" value={form.organisation} placeholder="Acme AB (eller ditt namn om du är egenföretagare)"
                  onChange={handleChange} onBlur={handleBlur}
                  touched={touched.organisation} valid={isValid.organisation} error="Ange företag eller namn" />
              </div>
              <div className="sm:col-span-2">
                <Field label={<><User className="w-4 h-4 inline mr-1.5" />Kontaktperson</>}
                  id="namn" value={form.namn} placeholder="Anna Svensson"
                  onChange={handleChange} onBlur={handleBlur}
                  touched={touched.namn} valid={isValid.namn} error="Ange ditt namn" />
              </div>
              <Field label={<><Phone className="w-4 h-4 inline mr-1.5" />Telefonnummer</>}
                id="telefon" type="tel" value={form.telefon} placeholder="070-000 00 00"
                onChange={handleChange} onBlur={handleBlur}
                touched={touched.telefon} valid={isValid.telefon} error="Ange telefonnummer" />
              <Field label={<><Mail className="w-4 h-4 inline mr-1.5" />E-post</>}
                id="mejl" type="email" value={form.mejl} placeholder="anna@företaget.se"
                onChange={handleChange} onBlur={handleBlur}
                touched={touched.mejl} valid={isValid.mejl} error="Ange en giltig e-postadress" />
            </div>

            {/* Antal licenser */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1.5" />Antal licenser
              </label>
              <p className="text-xs text-gray-400 mb-3">En licens per deltagare – oavsett om det är anställda, kollegor eller dig själv.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleChange('licenser', String(Math.max(1, Number(form.licenser) - 1)))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5421] hover:text-[#FF5421] transition-colors font-bold text-lg">
                  −
                </button>
                <span className="text-2xl font-bold text-gray-900 w-8 text-center">{form.licenser}</span>
                <button
                  onClick={() => handleChange('licenser', String(Math.min(100, Number(form.licenser) + 1)))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF5421] hover:text-[#FF5421] transition-colors font-bold text-lg">
                  +
                </button>
                <span className="text-sm text-gray-400 ml-1">deltagare</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
            <button onClick={handleNext}
              className="w-full py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
              Fortsätt till fullständigt formulär <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─────────────────────────────────────────────
// STEG 2 – FULLSTÄNDIGT FORMULÄR
// ─────────────────────────────────────────────

const FullFormModal = ({ valt, prefill, onClose }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ ...prefill, meddelande: '' });

  const handleChange = useCallback((id, value) => {
    setForm(prev => ({ ...prev, [id]: value }));
  }, []);

  const inp = "w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#FF5421] focus:ring-2 focus:ring-[#FF5421]/20 transition-all";

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
        style={{ maxHeight: '92vh' }}
      >
        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white h-full">

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-1">Fullständig anmälan</p>
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
              <div className="flex-1 h-1 rounded-full bg-[#FF5421]" />
              <div className="w-7 h-7 rounded-full bg-[#FF5421] flex items-center justify-center">
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
                className="w-20 h-20 rounded-full bg-[#FF5421] flex items-center justify-center mb-6">
                <CheckCircle size={36} className="text-white" />
              </motion.div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Tack för din anmälan!</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                Vi återkommer till <strong>{form.mejl}</strong> inom 24 timmar med bekräftelse,
                licensinformation och betalningsuppgifter.
              </p>
              <button onClick={onClose}
                className="px-8 py-3 rounded-lg font-medium text-white"
                style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
                Stäng
              </button>
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
                    ['col-span-2', 'Företag / organisation', 'organisation', 'text', 'Acme AB'],
                    ['col-span-2', 'Kontaktperson',          'namn',         'text', 'Anna Svensson'],
                    ['col-span-1', 'Telefon',                'telefon',      'tel',  '070-000 00 00'],
                    ['col-span-1', 'E-post',                 'mejl',         'email','anna@...'],
                  ].map(([span, label, id, type, placeholder]) => (
                    <div key={id} className={span}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                      <input type={type} value={form[id] || ''} onChange={e => handleChange(id, e.target.value)}
                        placeholder={placeholder} className={inp} />
                    </div>
                  ))}

                  {/* Licenser – readonly */}
                  <div className="col-span-2 flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 border-2 border-orange-100">
                    <Users size={16} className="text-[#FF5421] flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      <strong>{form.licenser}</strong> {Number(form.licenser) === 1 ? 'licens' : 'licenser'} beställd{Number(form.licenser) === 1 ? '' : 'a'}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meddelande (valfritt)</label>
                    <textarea value={form.meddelande} onChange={e => handleChange('meddelande', e.target.value)}
                      rows={3} placeholder="Eventuella önskemål, fakturareferens eller frågor..."
                      className={`${inp} resize-none`} />
                  </div>

                  {/* Sammanfattning */}
                  <div className="col-span-2 bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">Sammanfattning</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Organisation:</strong> {form.organisation}</p>
                      <p><strong>Uppstartsdatum:</strong> {valt.datum}</p>
                      <p><strong>Licenser:</strong> {form.licenser} st</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
                <button
                  onClick={() => { console.log('Booking:', { valt, ...form }); setSent(true); }}
                  className="w-full py-3.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(to right, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
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

// ─────────────────────────────────────────────
// DATUMVÄLJARE
// ─────────────────────────────────────────────

const DatePicker = () => {
  const [valt, setValt]       = useState(null);
  const [step, setStep]       = useState(null);
  const [prefill, setPrefill] = useState(null);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-2"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
          <CalendarCheck size={18} className="text-white" />
          <h3 className="text-white font-bold text-base">Kommande uppstartsdatum</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {DATES.map((d, i) => (
            <motion.button key={d.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              disabled={d.full}
              onClick={() => { if (!d.full) { setValt(d); setStep('quick'); } }}
              className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left
                ${d.full ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50 cursor-pointer'}`}>
              <div className="flex-shrink-0 w-14 text-center">
                <div className="text-xs text-gray-400 font-medium uppercase leading-tight">
                  {d.datum.split(' ')[1]}
                </div>
                <div className="text-2xl font-black leading-tight"
                  style={{ color: d.full ? '#9ca3af' : '#FF5421' }}>
                  {d.datum.split(' ')[0]}
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">{d.datum}</p>
                <p className="text-xs text-slate-400 mt-0.5">{d.dag}</p>
              </div>
              <div className="flex-shrink-0">
                {d.full ? (
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">Fullbokat</span>
                ) : d.platser <= 4 ? (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,84,33,0.1)', color: '#FF5421' }}>
                    {d.platser} kvar
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(251,146,60,0.12)', color: '#EA6C00' }}>
                    Ledigt
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Klicka på ett datum för att anmäla dig eller din organisation
      </p>

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
};

// ─────────────────────────────────────────────
// FOUNDER SECTION
// ─────────────────────────────────────────────

const FounderSection = () => (
  <section className="py-20 bg-[#F9FAFB]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-3">14 stegsprogram - från lekman till AI-proffs</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug">
                Vi hjälper medarbetare, chefer och egenföretagare att jobba smartare – från dag ett.
              </h2>
            </div>
          </div>
          <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base">
            Näringsklivet AI grundades ur en enkel insikt: de flesta som börjar använda AI i jobbet
            lär sig på egen hand – utan struktur, utan strategi och utan att få ut det fulla värdet.
            Vi har samlat det viktigaste i ett träningsprogram byggt för verkliga arbetssituationer,
            inte för tekniker. Glöm timslånga teorigenomgångar.
          </p>
          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-3">Vad ingår?</p>
            <div className="grid grid-cols-2 gap-6">
              <ul className="space-y-3">
                {[
                  '14 moduler med praktiska AI-verktyg och metoder',
                  'Videolektioner i din egen takt',
                  'Övningar direkt kopplade till din arbetsdag',
                  'Certifikat vid genomförd kurs',
                  '365 dagars åtkomst till materialet',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF5421] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <img src="/founder.png" alt="Grundare"
                className="w-full rounded-2xl object-contain object-bottom self-end" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Clock size={13} /> Boka uppstartsdatum & licenser
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 leading-snug">
            Välj ett datum som passar dig eller din organisation
          </h3>
          <DatePicker />
          <WorkshopCta /> 
        </motion.div>

      </div>
    </div>
  </section>
);

export default FounderSection;