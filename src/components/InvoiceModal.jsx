// src/components/InvoiceModal.jsx
//
// Uppstartsdatum: hårdkodat tills vidare – byt ut mot Supabase-fetch:
//   const { data } = await supabase.from('start_dates').select('*').gte('date', today).order('date')
//   setAvailableDates(data)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X, Building2, User, Mail, Phone, FileText, Hash,
  CheckCircle, ChevronRight, ChevronLeft, Calendar,
  ExternalLink, Users, MapPin, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────
// KONFIGURATION
// ─────────────────────────────────────────
const PRICE_PER_PERSON = 1490;

// TODO: byt ut mot Supabase-fetch
const AVAILABLE_START_DATES = [
  { value: '2026-04-07', label: 'Måndag 7 april 2026' },
  { value: '2026-04-28', label: 'Måndag 28 april 2026' },
  { value: '2026-05-12', label: 'Måndag 12 maj 2026' },
  { value: '2026-06-02', label: 'Måndag 2 juni 2026' },
];

const PARTICIPANT_OPTIONS = [
  { value: 1, label: 'Bara jag (1 person)' },
  { value: 2, label: '2 styrelseledamöter' },
  { value: 3, label: '3 styrelseledamöter' },
  { value: 4, label: '4 styrelseledamöter' },
  { value: 5, label: '5 styrelseledamöter' },
  { value: 6, label: '6 styrelseledamöter' },
  { value: 7, label: '7 styrelseledamöter' },
  { value: 8, label: '8 styrelseledamöter' },
  { value: 9, label: '9 styrelseledamöter' },
];

const STEPS = [
  { id: 1, label: 'Beställning',  icon: Users },
  { id: 2, label: 'Fakturering',  icon: Building2 },
  { id: 3, label: 'Bekräftelse',  icon: CheckCircle },
];

// ─────────────────────────────────────────
// HJÄLPKOMPONENTER
// ─────────────────────────────────────────

const Field = ({ label, error, required, hint, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}{required && <span className="text-[#FF5421] ml-0.5">*</span>}
      {hint && <span className="text-gray-400 font-normal ml-1.5 text-xs">({hint})</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-red-500 text-xs mt-1">{error}</motion.p>
      )}
    </AnimatePresence>
  </div>
);

// Input med checkmark
const VI = ({ value, onChange, error, placeholder, type = 'text', icon: Icon }) => {
  const ok = value.trim().length > 0 && !error;
  return (
    <div className="relative">
      {Icon && (
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full py-3.5 pr-10 border rounded-xl text-base focus:outline-none focus:ring-2 transition-all ${
          Icon ? 'pl-10' : 'pl-4'
        } ${
          error
            ? 'border-red-400 bg-red-50 focus:ring-red-200'
            : ok
              ? 'border-gray-300 bg-gray-50 focus:ring-gray-200 focus:border-gray-400'
              : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200 focus:border-gray-400'
        }`}
      />
      <AnimatePresence>
        {ok && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Select med checkmark
const VS = ({ value, onChange, error, children, icon: Icon }) => {
  const ok = value !== '';
  return (
    <div className="relative">
      {Icon && (
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
      )}
      <select value={value} onChange={onChange}
        className={`w-full py-3.5 pr-14 border rounded-xl text-base focus:outline-none focus:ring-2 transition-all appearance-none ${
          Icon ? 'pl-10' : 'pl-4'
        } ${
          error
            ? 'border-red-400 bg-red-50 focus:ring-red-200'
            : ok
              ? 'border-gray-300 bg-gray-50 focus:ring-gray-200 focus:border-gray-400'
              : 'border-gray-200 hover:border-gray-300 focus:ring-gray-200 focus:border-gray-400'
        }`}>
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
        <AnimatePresence>
          {ok && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5l2.5 2.5 4.5-5" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
          <path d="M1 1l4.5 4.5L10 1" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

// Steg-indikator
const Steps = ({ step }) => (
  <div className="flex items-center px-6 sm:px-10 pt-6 pb-2">
    {STEPS.map((s, i) => {
      const Icon = s.icon;
      const active = step === s.id;
      const done = step > s.id;
      return (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              done ? 'bg-gray-700' : active ? 'bg-[#FF5421]' : 'bg-gray-100'}`}>
              {done
                ? <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <Icon size={15} className={active ? 'text-white' : 'text-gray-400'} />}
            </div>
            <span className={`text-xs mt-1 font-medium whitespace-nowrap ${
              active ? 'text-[#FF5421]' : done ? 'text-gray-600' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mb-5 mx-2 transition-all duration-300 ${
              step > s.id ? 'bg-gray-400' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// Prisruta
const Price = ({ n }) => {
  const sub = PRICE_PER_PERSON * n;
  const vat = sub * 0.25;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>{n} × {PRICE_PER_PERSON.toLocaleString('sv-SE')} kr</span>
        <span className="font-semibold text-gray-800">{sub.toLocaleString('sv-SE')} kr</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Moms (25%)</span>
        <span>{Math.round(vat).toLocaleString('sv-SE')} kr</span>
      </div>
      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
        <span className="text-gray-700">Totalt inkl. moms</span>
        <span className="text-[#FF5421]">{Math.round(sub + vat).toLocaleString('sv-SE')} kr</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────
const InvoiceModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [f, setF] = useState({
    // Steg 1
    numberOfParticipants: '',
    startDate: '',
    // Steg 2
    organizationName: '',
    organizationNumber: '',
    invoiceEmail: '',
    invoiceAddress: '',
    postalCode: '',
    city: '',
    reference: '',
    // Kontakt
    contactPerson: '',
    contactEmail: '',
    phone: '',
    notes: '',
  });

  const set = (k, v) => { setF(p => ({ ...p, [k]: v })); if (errors[k]) setErrors(p => ({ ...p, [k]: '' })); };

  // Validering steg 1
  const v1 = () => {
    const e = {};
    if (!f.numberOfParticipants) e.numberOfParticipants = 'Välj antal deltagare';
    if (!f.startDate) e.startDate = 'Välj ett uppstartsdatum';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Validering steg 2
  const v2 = () => {
    const e = {};
    if (!f.organizationName.trim()) e.organizationName = 'Obligatoriskt';
    if (!f.organizationNumber.trim()) e.organizationNumber = 'Obligatoriskt';
    else if (!/^\d{6}-\d{4}$/.test(f.organizationNumber)) e.organizationNumber = 'Format: XXXXXX-XXXX';
    if (!f.invoiceEmail.trim()) e.invoiceEmail = 'Obligatoriskt';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.invoiceEmail)) e.invoiceEmail = 'Ogiltig e-postadress';
    if (!f.invoiceAddress.trim()) e.invoiceAddress = 'Obligatoriskt';
    if (!f.postalCode.trim()) e.postalCode = 'Obligatoriskt';
    else if (!/^\d{3}\s?\d{2}$/.test(f.postalCode.replace(/\s/g, ''))) e.postalCode = 'Ogiltigt';
    if (!f.city.trim()) e.city = 'Obligatoriskt';
    if (!f.contactPerson.trim()) e.contactPerson = 'Obligatoriskt';
    if (!f.contactEmail.trim()) e.contactEmail = 'Obligatoriskt';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.contactEmail)) e.contactEmail = 'Ogiltig e-postadress';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && v1()) setStep(2);
    if (step === 2 && v2()) setStep(3);
  };

  const submit = () => {
    if (!acceptedTerms) { setTermsError(true); return; }
    // TODO: skicka till Supabase / Resend här
    setSubmitted(true);
    setTimeout(() => navigate('/modules'), 2200);
  };

  const close = () => {
    if (submitted) return;
    setStep(1); setErrors({}); setAcceptedTerms(false); setTermsError(false); setSubmitted(false);
    setF({ numberOfParticipants: '', startDate: '', organizationName: '', organizationNumber: '',
      invoiceEmail: '', invoiceAddress: '', postalCode: '', city: '', reference: '',
      contactPerson: '', contactEmail: '', phone: '', notes: '' });
    onClose();
  };

  const n = parseInt(f.numberOfParticipants) || 0;
  const startLabel = AVAILABLE_START_DATES.find(d => d.value === f.startDate)?.label ?? '–';

  if (!isOpen) return null;

  // ── Bekräftelseskärm ──
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 20 }}
          className="text-center px-8 max-w-md">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-[#FF5421] flex items-center justify-center mx-auto mb-6">
            <Sparkles size={34} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Beställning mottagen!</h2>
          <p className="text-gray-500 mb-2">
            Tack, <strong>{f.contactPerson}</strong>! Din beställning för{' '}
            <strong>{f.numberOfParticipants} deltagare</strong> är registrerad.
          </p>
          <p className="text-gray-400 text-sm">
            Faktura skickas till <strong>{f.invoiceEmail}</strong> inom 1–2 arbetsdagar.
            Du skickas nu vidare till kursöversikten…
          </p>
          <motion.div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#FF5421] rounded-full"
              initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50"
        onClick={close}>
        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-white w-full h-full sm:h-auto sm:rounded-2xl sm:max-w-2xl sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          style={{ maxHeight: '100dvh' }}
          >

        {/* ── Top-bar ── */}
        <div className="flex-shrink-0 border-b border-gray-100 px-5 sm:px-10 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF5421]/10 flex items-center justify-center">
              <FileText size={16} className="text-[#FF5421]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight">Beställ med faktura</p>
              <p className="text-gray-400 text-xs">Styrelsekörkortet</p>
            </div>
          </div>
          <button onClick={close}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* ── Steg-indikator ── */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100">
          <div className="max-w-2xl mx-auto">
            <Steps step={step} />
          </div>
        </div>

        {/* ── Scrollbart innehåll ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-5 sm:px-10 py-8">
            <AnimatePresence mode="wait">

              {/* ════════ STEG 1: Beställning ════════ */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">Din beställning</h2>
                  <p className="text-gray-500 text-sm mb-6">Välj antal deltagare och önskat uppstartsdatum.</p>

                  <div className="space-y-5">
                    {/* Antal deltagare */}
                    <Field label="Antal deltagare" error={errors.numberOfParticipants} required>
                      <VS value={f.numberOfParticipants} onChange={e => set('numberOfParticipants', e.target.value)}
                        error={errors.numberOfParticipants} icon={Users}>
                        <option value="">Välj antal</option>
                        {PARTICIPANT_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </VS>
                    </Field>

                    {/* Prisvisning */}
                    <AnimatePresence>
                      {n > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}>
                          <Price n={n} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Uppstartsdatum */}
                    <Field label="Önskat uppstartsdatum" error={errors.startDate} required
                      hint="välj bland tillgängliga datum">
                      <VS value={f.startDate} onChange={e => set('startDate', e.target.value)}
                        error={errors.startDate} icon={Calendar}>
                        <option value="">Välj datum</option>
                        {AVAILABLE_START_DATES.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </VS>
                    </Field>

                    {/* Anteckning */}
                    <Field label="Övriga önskemål">
                      <textarea value={f.notes} onChange={e => set('notes', e.target.value)} rows={3}
                        placeholder="Frivilligt – eventuella frågor eller önskemål"
                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all resize-none hover:border-gray-300" />
                    </Field>
                  </div>
                </motion.div>
              )}

              {/* ════════ STEG 2: Fakturering ════════ */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">Faktureringsuppgifter</h2>
                  <p className="text-gray-500 text-sm mb-6">Fyll i era faktureringsuppgifter och kontaktinformation.</p>

                  <div className="space-y-5">
                    {/* Organisation */}
                    <div className="space-y-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Organisation</p>

                      <Field label="Organisationsnamn" error={errors.organizationName} required>
                        <VI value={f.organizationName} onChange={e => set('organizationName', e.target.value)}
                          error={errors.organizationName} placeholder="BRF Solgläntan" icon={Building2} />
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Organisationsnummer" error={errors.organizationNumber} required>
                          <VI value={f.organizationNumber} onChange={e => set('organizationNumber', e.target.value)}
                            error={errors.organizationNumber} placeholder="XXXXXX-XXXX" icon={Hash} />
                        </Field>
                        <Field label="Er referens" hint="frivilligt">
                          <VI value={f.reference} onChange={e => set('reference', e.target.value)}
                            placeholder="t.ex. kostnadsställe" />
                        </Field>
                      </div>
                    </div>

                    {/* Fakturaadress */}
                    <div className="space-y-4 pt-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Fakturaadress</p>

                      <Field label="E-post för faktura" error={errors.invoiceEmail} required>
                        <VI type="email" value={f.invoiceEmail} onChange={e => set('invoiceEmail', e.target.value)}
                          error={errors.invoiceEmail} placeholder="faktura@brfexempel.se" icon={Mail} />
                      </Field>

                      <Field label="Gatuadress" error={errors.invoiceAddress} required>
                        <VI value={f.invoiceAddress} onChange={e => set('invoiceAddress', e.target.value)}
                          error={errors.invoiceAddress} placeholder="Storgatan 1" icon={MapPin} />
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Postnummer" error={errors.postalCode} required>
                          <VI value={f.postalCode} onChange={e => set('postalCode', e.target.value)}
                            error={errors.postalCode} placeholder="123 45" />
                        </Field>
                        <Field label="Ort" error={errors.city} required>
                          <VI value={f.city} onChange={e => set('city', e.target.value)}
                            error={errors.city} placeholder="Stockholm" />
                        </Field>
                      </div>
                    </div>

                    {/* Kontaktperson */}
                    <div className="space-y-4 pt-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kontaktperson</p>

                      <Field label="Namn" error={errors.contactPerson} required>
                        <VI value={f.contactPerson} onChange={e => set('contactPerson', e.target.value)}
                          error={errors.contactPerson} placeholder="Anna Andersson" icon={User} />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="E-post" error={errors.contactEmail} required>
                          <VI type="email" value={f.contactEmail} onChange={e => set('contactEmail', e.target.value)}
                            error={errors.contactEmail} placeholder="anna@brfexempel.se" icon={Mail} />
                        </Field>
                        <Field label="Telefon" hint="frivilligt">
                          <VI type="tel" value={f.phone} onChange={e => set('phone', e.target.value)}
                            placeholder="070-123 45 67" icon={Phone} />
                        </Field>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ════════ STEG 3: Bekräftelse ════════ */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">Granska din beställning</h2>
                  <p className="text-gray-500 text-sm mb-6">Kontrollera uppgifterna innan du skickar.</p>

                  <div className="space-y-4">
                    {/* Beställningsruta */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
                      <p className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-3">Beställning</p>
                      {[
                        ['Kurs',        'Styrelsekörkortet'],
                        ['Uppstart',    startLabel],
                        ['Deltagare',   `${f.numberOfParticipants} st`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4">
                          <span className="text-gray-500">{k}</span>
                          <span className="font-medium text-gray-800 text-right">{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Prisruta */}
                    <Price n={n || 1} />

                    {/* Faktureringssummering */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
                      <p className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-3">Fakturering</p>
                      {[
                        ['Organisation',  f.organizationName],
                        ['Org.nr',        f.organizationNumber],
                        f.reference ? ['Referens', f.reference] : null,
                        ['Faktura e-post', f.invoiceEmail],
                        ['Adress',        `${f.invoiceAddress}, ${f.postalCode} ${f.city}`],
                        ['Kontakt',       f.contactPerson],
                        ['Kontakt e-post', f.contactEmail],
                        f.phone ? ['Telefon', f.phone] : null,
                      ].filter(Boolean).map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4">
                          <span className="text-gray-500 flex-shrink-0">{k}</span>
                          <span className="font-medium text-gray-800 text-right">{v}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      Faktura skickas till angiven e-postadress inom 1–2 arbetsdagar.
                      Betalningsvillkor 30 dagar netto. Tillgång till kursen ges när betalningen registrerats.
                    </p>

                    {/* Villkors-checkbox */}
                    <div>
                      <div
                        onClick={() => { setAcceptedTerms(p => !p); setTermsError(false); }}
                        className={`flex items-start gap-3 cursor-pointer p-3.5 rounded-xl transition-colors select-none ${
                          termsError ? 'bg-red-50 border border-red-300' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                        }`}>
                        <div className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                          acceptedTerms ? 'bg-[#FF5421] border-[#FF5421]'
                            : termsError ? 'border-red-400 bg-white'
                              : 'border-gray-300 bg-white'
                        }`}>
                          <AnimatePresence>
                            {acceptedTerms && (
                              <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                                width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          Jag har läst och godkänner{' '}
                          <Link to="/villkor" target="_blank" onClick={e => e.stopPropagation()}
                            className="text-[#FF5421] hover:underline font-medium inline-flex items-center gap-0.5">
                            allmänna villkor <ExternalLink size={11} className="inline mb-0.5 ml-0.5" />
                          </Link>
                        </span>
                      </div>
                      <AnimatePresence>
                        {termsError && (
                          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="text-red-500 text-xs mt-1.5 ml-1">
                            Du måste godkänna villkoren för att fortsätta
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Sticky bottom-knappar ── */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white px-5 sm:px-10 py-4">
          <div className="max-w-2xl mx-auto flex gap-3">

            {/* Tillbaka – alltid synlig, grayed när steg 1 */}
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => step > 1 ? setStep(s => s - 1) : close()}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors min-h-[52px] flex-shrink-0">
              <ChevronLeft size={16} />
              {step > 1 ? 'Tillbaka' : 'Avbryt'}
            </motion.button>

            {/* Nästa / Skicka – fullwidth */}
            {step < 3 ? (
              <motion.button whileTap={{ scale: 0.97 }} onClick={next}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm min-h-[52px]"
                style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.28)' }}>
                Nästa steg <ChevronRight size={16} />
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={submit}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm min-h-[52px]"
                style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.28)' }}>
                <FileText size={16} /> Skicka beställning
              </motion.button>
            )}
          </div>
        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvoiceModal;