// src/components/InvoiceModal.jsx
// Tar emot props från PurchasePage:
//   course     – kursobjektet
//   qty        – antal licenser
//   totalPrice – totalpris i SEK (exkl. moms)
//   isOpen     – boolean
//   onClose    – callback
//   onSubmit   – callback(formData)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, Building2, User, Mail, Phone, FileText, Hash,
  CheckCircle, ChevronRight, ChevronLeft,
  ExternalLink, Users, MapPin, Sparkles, Globe, Target
} from 'lucide-react';

// ─── Brand ───────────────────────────────────────────────
const ORANGE = '#FF5421';
const DARK   = '#171f32';

// ─── Steg-konfiguration ──────────────────────────────────
const STEPS = [
  { id: 1, label: 'Kursval',      icon: Target },
  { id: 2, label: 'Fakturering',  icon: Building2 },
  { id: 3, label: 'Granska',      icon: CheckCircle },
];

// ─── Kursmål-alternativ ──────────────────────────────────
const COURSE_GOALS = [
  'Spara tid i vardagen med AI-verktyg',
  'Förstå hur AI fungerar och var det passar',
  'Lära oss använda ChatGPT, Claude eller Gemini',
  'Bygga en AI-strategi för vår organisation',
  'Öka produktiviteten i teamet',
  'Hålla oss uppdaterade om AI-utvecklingen',
  'Minska repetitivt administrativt arbete',
  'Stärka vår konkurrenskraft',
];

// ─────────────────────────────────────────────
// HJÄLPKOMPONENTER
// ─────────────────────────────────────────────

const Field = ({ label, error, required, hint, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span style={{ color: ORANGE }} className="ml-0.5">*</span>}
      {hint && <span className="text-gray-400 font-normal ml-1.5 text-xs">({hint})</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-red-500 text-xs mt-1">{error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const VI = ({ value, onChange, error, placeholder, type = 'text', icon: Icon }) => {
  const ok = value.trim().length > 0 && !error;
  return (
    <div className="relative">
      {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full py-3.5 pr-10 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all
          ${Icon ? 'pl-10' : 'pl-4'}
          ${error
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

// Steg-indikator
const StepBar = ({ step }) => (
  <div className="flex items-center px-6 sm:px-10 pt-5 pb-3">
    {STEPS.map((s, i) => {
      const Icon  = s.icon;
      const active = step === s.id;
      const done   = step > s.id;
      return (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
              ${done ? 'bg-gray-700' : active ? '' : 'bg-gray-100'}`}
              style={active ? { background: ORANGE } : {}}>
              {done
                ? <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path d="M1 5.5l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                : <Icon size={15} className={active ? 'text-white' : 'text-gray-400'} />
              }
            </div>
            <span className={`text-xs mt-1 font-medium whitespace-nowrap
              ${active ? '' : done ? 'text-gray-600' : 'text-gray-400'}`}
              style={active ? { color: ORANGE } : {}}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mb-5 mx-2 transition-all duration-300
              ${step > s.id ? 'bg-gray-400' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// Prissammanfattning
const PriceSummary = ({ qty, pricePerUnit, courseName }) => {
  const sub = pricePerUnit * qty;
  const vat = Math.round(sub * 0.25);
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Prissammanfattning</p>
      <div className="flex justify-between text-gray-600">
        <span>{qty} × {pricePerUnit.toLocaleString('sv-SE')} kr ({courseName})</span>
        <span className="font-semibold text-gray-800">{sub.toLocaleString('sv-SE')} kr</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Moms (25%)</span>
        <span>{vat.toLocaleString('sv-SE')} kr</span>
      </div>
      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
        <span className="text-gray-700">Totalt inkl. moms</span>
        <span style={{ color: ORANGE }}>{(sub + vat).toLocaleString('sv-SE')} kr</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────

const InvoiceModal = ({ isOpen, onClose, course, onSubmit }) => {
  const qty          = course?.qty          ?? 1;
  const pricePerUnit = course?.price        ?? 1995;
  const courseName   = course?.title        ?? 'AI-träningsprogrammet';

  const [step,          setStep]          = useState(1);
  const [errors,        setErrors]        = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError,    setTermsError]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [goals,         setGoals]         = useState([]);

  const [f, setF] = useState({
    // Fakturering
    organizationName:   '',
    organizationNumber: '',
    vatNumber:          '',
    invoiceEmail:       '',
    invoiceAddress:     '',
    postalCode:         '',
    city:               '',
    reference:          '',
    // Kontakt
    contactPerson:      '',
    contactEmail:       '',
    phone:              '',
    // Övrigt
    notes:              '',
  });

  const set = (k, v) => {
    setF(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const toggleGoal = (g) =>
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  // ── Validering steg 1 (kursmål) ──
  const v1 = () => {
    const e = {};
    if (goals.length === 0) e.goals = 'Välj minst ett kursmål';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Validering steg 2 (fakturering) ──
  const v2 = () => {
    const e = {};
    if (!f.organizationName.trim())   e.organizationName   = 'Obligatoriskt';
    if (!f.organizationNumber.trim()) e.organizationNumber = 'Obligatoriskt';
    else if (!/^\d{6}-\d{4}$/.test(f.organizationNumber))
      e.organizationNumber = 'Format: XXXXXX-XXXX';
    if (!f.invoiceEmail.trim())       e.invoiceEmail       = 'Obligatoriskt';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.invoiceEmail))
      e.invoiceEmail = 'Ogiltig e-postadress';
    if (!f.invoiceAddress.trim())     e.invoiceAddress     = 'Obligatoriskt';
    if (!f.postalCode.trim())         e.postalCode         = 'Obligatoriskt';
    else if (!/^\d{3}\s?\d{2}$/.test(f.postalCode.replace(/\s/g, '')))
      e.postalCode = 'Format: 123 45';
    if (!f.city.trim())               e.city               = 'Obligatoriskt';
    if (!f.contactPerson.trim())      e.contactPerson      = 'Obligatoriskt';
    if (!f.contactEmail.trim())       e.contactEmail       = 'Obligatoriskt';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.contactEmail))
      e.contactEmail = 'Ogiltig e-postadress';
    if (!f.phone.trim())              e.phone              = 'Obligatoriskt';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && v1()) setStep(2);
    if (step === 2 && v2()) setStep(3);
  };

  const submit = () => {
    if (!acceptedTerms) { setTermsError(true); return; }
    setSubmitted(true);
    onSubmit?.({ ...f, goals, qty, pricePerUnit, courseName });
  };

  const close = () => {
    if (submitted) return;
    setStep(1); setErrors({}); setGoals([]);
    setAcceptedTerms(false); setTermsError(false); setSubmitted(false);
    setF({
      organizationName: '', organizationNumber: '', vatNumber: '',
      invoiceEmail: '', invoiceAddress: '', postalCode: '', city: '',
      reference: '', contactPerson: '', contactEmail: '', phone: '', notes: '',
    });
    onClose?.();
  };

  if (!isOpen) return null;

  // ── Bekräftelseskärm ──
  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 20 }}
          className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: ORANGE }}>
            <Sparkles size={34} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: DARK }}>Beställning mottagen!</h2>
          <p className="text-gray-500 text-sm mb-2 leading-relaxed">
            Tack, <strong>{f.contactPerson}</strong>! Din beställning på{' '}
            <strong>{qty} licens{qty > 1 ? 'er' : ''}</strong> är registrerad.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            Faktura skickas till <strong>{f.invoiceEmail}</strong> inom 1–2 arbetsdagar.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Du får ett separat mejl med en länk för att fördela licenserna till deltagarna.
          </p>
          <motion.div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: ORANGE }}
              initial={{ width: 0 }} animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'linear' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/55 backdrop-blur-sm"
        onClick={close}>
        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-white w-full h-full sm:h-auto sm:rounded-2xl sm:max-w-2xl flex flex-col shadow-2xl overflow-hidden"
          style={{ maxHeight: '100dvh' }}
        >

          {/* Top-bar */}
          <div className="flex-shrink-0 border-b border-gray-100 px-5 sm:px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${ORANGE}18` }}>
                <FileText size={16} style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">Beställ med faktura</p>
                <p className="text-gray-400 text-xs">{qty} licens{qty > 1 ? 'er' : ''} · {courseName}</p>
              </div>
            </div>
            <button onClick={close}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Steg-indikator */}
          <div className="flex-shrink-0 bg-white border-b border-gray-100">
            <div className="max-w-2xl mx-auto">
              <StepBar step={step} />
            </div>
          </div>

          {/* Scrollbart innehåll */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-5 sm:px-10 py-8">
              <AnimatePresence mode="wait">

                {/* ════ STEG 1: Kursmål ════ */}
                {step === 1 && (
                  <motion.div key="s1"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                    <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Vad vill ni uppnå?</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Välj de mål som stämmer bäst för er organisation.
                      Det hjälper oss skräddarsy er start.
                    </p>

                    {/* Prissammanfattning överst */}
                    <div className="mb-6">
                      <PriceSummary qty={qty} pricePerUnit={pricePerUnit} courseName={courseName} />
                    </div>

                    {/* Kursmål-rutor */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {COURSE_GOALS.map((goal) => {
                        const selected = goals.includes(goal);
                        return (
                          <motion.button
                            key={goal}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleGoal(goal)}
                            className="flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all text-sm"
                            style={{
                              borderColor: selected ? ORANGE : '#e2e8f0',
                              background:  selected ? `${ORANGE}08` : 'white',
                            }}
                          >
                            <div className="w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all"
                              style={{
                                borderColor: selected ? ORANGE : '#cbd5e1',
                                background:  selected ? ORANGE : 'white',
                              }}>
                              {selected && (
                                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                  <path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span style={{ color: selected ? ORANGE : '#475569', fontWeight: selected ? 600 : 400 }}>
                              {goal}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {errors.goals && (
                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-red-500 text-xs mt-1 mb-3">{errors.goals}</motion.p>
                      )}
                    </AnimatePresence>

                    {/* Övriga önskemål */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Övriga önskemål eller frågor <span className="text-gray-400 font-normal text-xs">(valfritt)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={f.notes}
                        onChange={e => set('notes', e.target.value)}
                        placeholder="Berätta gärna mer om er situation eller era förväntningar..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all resize-none hover:border-gray-300"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ════ STEG 2: Fakturering ════ */}
                {step === 2 && (
                  <motion.div key="s2"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                    <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Faktureringsuppgifter</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Fyll i era uppgifter. Faktura skickas till angiven e-post inom 1–2 arbetsdagar.
                    </p>

                    <div className="space-y-5">

                      {/* Organisation */}
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Organisation</p>
                        <Field label="Företag / organisation" error={errors.organizationName} required>
                          <VI value={f.organizationName} onChange={e => set('organizationName', e.target.value)}
                            error={errors.organizationName} placeholder="Acme AB" icon={Building2} />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Field label="Organisationsnummer" error={errors.organizationNumber} required>
                            <VI value={f.organizationNumber} onChange={e => set('organizationNumber', e.target.value)}
                              error={errors.organizationNumber} placeholder="XXXXXX-XXXX" icon={Hash} />
                          </Field>
                          <Field label="Momsreg.nr (VAT)" hint="valfritt">
                            <VI value={f.vatNumber} onChange={e => set('vatNumber', e.target.value)}
                              placeholder="SE556XXXXXXXXXX01" icon={Globe} />
                          </Field>
                        </div>
                        <Field label="Er referens / kostnadsställe" hint="valfritt">
                          <VI value={f.reference} onChange={e => set('reference', e.target.value)}
                            placeholder="t.ex. KST-1234 eller projektnamn" />
                        </Field>
                      </div>

                      {/* Fakturaadress */}
                      <div className="space-y-4 pt-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fakturaadress</p>
                        <Field label="E-post för faktura" error={errors.invoiceEmail} required>
                          <VI type="email" value={f.invoiceEmail} onChange={e => set('invoiceEmail', e.target.value)}
                            error={errors.invoiceEmail} placeholder="faktura@foretaget.se" icon={Mail} />
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
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kontaktperson</p>
                        <Field label="Namn" error={errors.contactPerson} required>
                          <VI value={f.contactPerson} onChange={e => set('contactPerson', e.target.value)}
                            error={errors.contactPerson} placeholder="Anna Svensson" icon={User} />
                        </Field>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Field label="E-post" error={errors.contactEmail} required>
                            <VI type="email" value={f.contactEmail} onChange={e => set('contactEmail', e.target.value)}
                              error={errors.contactEmail} placeholder="anna@foretaget.se" icon={Mail} />
                          </Field>
                          <Field label="Telefon" error={errors.phone} required>
                            <VI type="tel" value={f.phone} onChange={e => set('phone', e.target.value)}
                              error={errors.phone} placeholder="070-000 00 00" icon={Phone} />
                          </Field>
                        </div>
                      </div>

                      {/* Licensinfo */}
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: `${ORANGE}08`, border: `1px solid ${ORANGE}20` }}>
                        <Users size={15} style={{ color: ORANGE }} className="flex-shrink-0" />
                        <p className="text-sm" style={{ color: '#475569' }}>
                          <strong style={{ color: DARK }}>{qty} licens{qty > 1 ? 'er' : ''}</strong> beställd{qty > 1 ? 'a' : ''}.
                          Du får ett separat mejl med länk för att fördela licenserna efter betalning.
                        </p>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* ════ STEG 3: Granska ════ */}
                {step === 3 && (
                  <motion.div key="s3"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}>

                    <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>Granska din beställning</h2>
                    <p className="text-gray-500 text-sm mb-6">Kontrollera uppgifterna och godkänn villkoren.</p>

                    <div className="space-y-4">

                      {/* Prissammanfattning */}
                      <PriceSummary qty={qty} pricePerUnit={pricePerUnit} courseName={courseName} />

                      {/* Kursmål */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Valda kursmål</p>
                        <div className="flex flex-wrap gap-1.5">
                          {goals.map(g => (
                            <span key={g} className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                              style={{ background: ORANGE }}>
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Faktureringssummering */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Fakturering</p>
                        {[
                          ['Organisation',  f.organizationName],
                          ['Org.nummer',    f.organizationNumber],
                          f.vatNumber ? ['VAT-nummer', f.vatNumber] : null,
                          f.reference ? ['Referens',  f.reference]  : null,
                          ['Faktura e-post', f.invoiceEmail],
                          ['Adress',        `${f.invoiceAddress}, ${f.postalCode} ${f.city}`],
                          ['Kontaktperson', f.contactPerson],
                          ['Kontakt e-post', f.contactEmail],
                          ['Telefon',       f.phone],
                        ].filter(Boolean).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4">
                            <span className="text-gray-500 flex-shrink-0">{k}</span>
                            <span className="font-medium text-gray-800 text-right">{v}</span>
                          </div>
                        ))}
                      </div>

                      {f.notes && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meddelande</p>
                          <p className="text-gray-600 leading-relaxed">{f.notes}</p>
                        </div>
                      )}

                      <p className="text-xs text-gray-400 leading-relaxed">
                        Faktura skickas till angiven e-postadress inom 1–2 arbetsdagar.
                        Betalningsvillkor 30 dagar netto. Tillgång ges när betalningen registrerats.
                        Licensfördelningsmejl skickas separat till {f.contactEmail}.
                      </p>

                      {/* Villkor-checkbox */}
                      <div>
                        <div
                          onClick={() => { setAcceptedTerms(p => !p); setTermsError(false); }}
                          className={`flex items-start gap-3 cursor-pointer p-3.5 rounded-xl transition-colors select-none border
                            ${termsError ? 'bg-red-50 border-red-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                        >
                          <div className="w-5 h-5 mt-0.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all"
                            style={{
                              background:  acceptedTerms ? ORANGE : 'white',
                              borderColor: acceptedTerms ? ORANGE : termsError ? '#f87171' : '#cbd5e1',
                            }}>
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
                              className="font-medium hover:underline inline-flex items-center gap-0.5"
                              style={{ color: ORANGE }}>
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

          {/* Sticky bottom-knappar */}
          <div className="flex-shrink-0 border-t border-gray-100 bg-white px-5 sm:px-10 py-4">
            <div className="max-w-2xl mx-auto flex gap-3">
              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => step > 1 ? setStep(s => s - 1) : close()}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors min-h-[52px] flex-shrink-0">
                <ChevronLeft size={16} />
                {step > 1 ? 'Tillbaka' : 'Avbryt'}
              </motion.button>

              {step < 3 ? (
                <motion.button whileTap={{ scale: 0.97 }} onClick={next}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm min-h-[52px]"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)`, boxShadow: `0 4px 16px ${ORANGE}30` }}>
                  Nästa steg <ChevronRight size={16} />
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={submit}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm min-h-[52px]"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)`, boxShadow: `0 4px 16px ${ORANGE}30` }}>
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