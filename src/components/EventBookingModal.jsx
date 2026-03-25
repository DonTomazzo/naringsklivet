// src/components/EventBookingModal.jsx
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle, ArrowRight, CreditCard,
  FileText, Gift, MapPin, Monitor, Shuffle,
  Calendar, Clock, Users, Tag
} from 'lucide-react';
import {
  isEarlyBird, currentPrice, formatPrice,
  eventTypeLabel, eventTypeIcon, createRegistration
} from '../hooks/useEvents';

// ─── Hjälp-komponent: fält ────────────────────────────────

const Field = ({ label, id, type = 'text', placeholder, value, onChange, required, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(id, e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 border-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5421]/20
        ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#FF5421]'}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// ─── Betalningsknapp ──────────────────────────────────────

const PaymentOption = ({ id, icon: Icon, label, desc, selected, onClick, disabled }) => (
  <button
    onClick={() => !disabled && onClick(id)}
    disabled={disabled}
    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all
      ${selected ? 'border-[#FF5421] bg-orange-50' : 'border-gray-200 hover:border-gray-300 bg-white'}
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
      ${selected ? 'bg-[#FF5421]' : 'bg-gray-100'}`}>
      <Icon size={16} className={selected ? 'text-white' : 'text-gray-500'} />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold ${selected ? 'text-[#FF5421]' : 'text-gray-800'}`}>{label}</p>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0
      ${selected ? 'border-[#FF5421] bg-[#FF5421]' : 'border-gray-300'}`}>
      {selected && <div className="w-full h-full rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>}
    </div>
  </button>
);

// ─── Event-sammanfattning (liten) ─────────────────────────

const EventSummaryBar = ({ event }) => {
  const early = isEarlyBird(event);
  const price = currentPrice(event);

  return (
    <div className="bg-gradient-to-r from-[#171f32] to-[#1e2a42] px-6 py-4 flex-shrink-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#FF5421] uppercase tracking-widest mb-1">
            {eventTypeIcon(event.event_type)} {eventTypeLabel(event.event_type)}
          </p>
          <h3 className="text-white font-bold text-base leading-snug truncate">{event.title}</h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
            <span className="text-white/50 text-xs flex items-center gap-1">
              <Calendar size={11} />
              {new Date(event.starts_at).toLocaleDateString('sv-SE', {
                weekday: 'short', day: 'numeric', month: 'long'
              })}
            </span>
            <span className="text-white/50 text-xs flex items-center gap-1">
              <Clock size={11} />
              {new Date(event.starts_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}–
              {new Date(event.ends_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {event.location_name && (
              <span className="text-white/50 text-xs flex items-center gap-1">
                <MapPin size={11} />{event.location_name}
              </span>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-white">{formatPrice(price)}</div>
          {early && event.price_early && (
            <div className="text-xs text-[#FF5421] font-semibold">Early bird</div>
          )}
          {!event.is_free && !early && event.price_early && (
            <div className="text-xs line-through text-white/30">
              {formatPrice(event.price_early)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── STEG 1: Deltagarinfo ─────────────────────────────────

const Step1Form = ({ event, form, onChange, errors, paymentMethod, onPaymentChange, onNext }) => {
  const isFree = event.is_free || currentPrice(event) === 0;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Dina uppgifter</p>
          <div className="space-y-3">
            <Field label="Namn" id="name" placeholder="Anna Svensson"
              value={form.name} onChange={onChange} required error={errors.name} />
            <Field label="E-post" id="email" type="email" placeholder="anna@foretaget.se"
              value={form.email} onChange={onChange} required error={errors.email} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Telefon" id="phone" type="tel" placeholder="070-000 00 00"
                value={form.phone} onChange={onChange} />
              <Field label="Företag / organisation" id="organisation" placeholder="Valfritt"
                value={form.organisation} onChange={onChange} />
            </div>
          </div>
        </div>

        {!isFree && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Betalningssätt</p>
            <div className="space-y-2">
              <PaymentOption
                id="stripe" icon={CreditCard} label="Kortbetalning"
                desc="Visa, Mastercard, Apple Pay – betala direkt"
                selected={paymentMethod === 'stripe'}
                onClick={onPaymentChange}
              />
              <PaymentOption
                id="invoice" icon={FileText} label="Faktura"
                desc="30 dagars betalningsvillkor – skickas till din e-post"
                selected={paymentMethod === 'invoice'}
                onClick={onPaymentChange}
              />
            </div>
          </div>
        )}

        {isFree && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
            <Gift size={16} className="text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700 font-medium">Det här eventet är gratis – ingen betalning krävs.</p>
          </div>
        )}

        <div className="flex items-start gap-2 pt-1">
          <Users size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-400 leading-relaxed">
            Anmälan gäller en person. Vill du anmäla flera kollegor?{' '}
            <button className="text-[#FF5421] hover:underline font-medium">Kontakta oss för grupprabatt.</button>
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <button onClick={onNext}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
          {isFree ? 'Anmäl mig gratis' : 'Fortsätt till bekräftelse'}
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
};

// ─── STEG 2: Bekräftelse ──────────────────────────────────

const Step2Confirm = ({ event, form, paymentMethod, loading, onSubmit, onBack }) => {
  const isFree = event.is_free || currentPrice(event) === 0;
  const price  = currentPrice(event);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kontrollera din anmälan</p>

        {/* Deltagarinfo */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          {[
            ['Namn',         form.name],
            ['E-post',       form.email],
            ['Telefon',      form.phone || '–'],
            ['Organisation', form.organisation || '–'],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="font-medium text-gray-800">{val}</span>
            </div>
          ))}
        </div>

        {/* Betalning */}
        {!isFree && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Betalningssätt</span>
              <span className="font-medium text-gray-800">
                {paymentMethod === 'stripe' ? '💳 Kortbetalning' : '📄 Faktura'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {isEarlyBird(event) ? 'Early bird-pris' : 'Pris'}
              </span>
              <span className="font-bold text-[#FF5421]">{formatPrice(price)}</span>
            </div>
            {paymentMethod === 'invoice' && (
              <p className="text-xs text-gray-400 pt-1">
                Faktura skickas till {form.email} efter anmälan. 30 dagars betalningsvillkor.
              </p>
            )}
          </div>
        )}

        {/* Vad händer sen */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vad händer nu?</p>
          {[
            ['📧', 'Bekräftelsemejl', `Skickas till ${form.email}`],
            ['📅', 'Kalenderinbjudan', '.ics-fil bifogas i mejlet'],
            ...(event.zoom_url || event.teams_url
              ? [['🔗', 'Möteslänk', 'Zoom/Teams-länk inkluderas i bekräftelsen']]
              : [['📍', 'Plats', event.location_addr || event.location_name]]
            ),
            ['🔔', 'Påminnelse', 'Du får en påminnelse dagen innan eventet'],
          ].map(([icon, label, desc]) => (
            <div key={label} className="flex items-start gap-2.5 text-sm">
              <span className="text-base">{icon}</span>
              <div>
                <span className="font-medium text-gray-700">{label} </span>
                <span className="text-gray-400 text-xs">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 space-y-2">
        <button onClick={onSubmit} disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)', boxShadow: '0 4px 16px rgba(255,84,33,0.25)' }}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Skickar anmälan...
            </span>
          ) : (
            <><CheckCircle size={16} />
              {isFree ? 'Bekräfta gratis anmälan'
                : paymentMethod === 'stripe' ? 'Gå till betalning'
                : 'Skicka anmälan & begär faktura'}
            </>
          )}
        </button>
        <button onClick={onBack}
          className="w-full py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-700 transition-colors">
          ← Tillbaka och ändra
        </button>
      </div>
    </>
  );
};

// ─── STEG 3: Tack-skärm ──────────────────────────────────

const Step3Success = ({ event, form, paymentMethod, onClose }) => {
  const isFree = event.is_free || currentPrice(event) === 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-[#FF5421] flex items-center justify-center mb-5">
        <CheckCircle size={36} className="text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isFree ? 'Du är anmäld!' : paymentMethod === 'stripe' ? 'Betalning genomförd!' : 'Anmälan mottagen!'}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
          {isFree
            ? `Vi har skickat en bekräftelse och kalenderinbjudan till ${form.email}.`
            : paymentMethod === 'stripe'
              ? `Din plats är bokad. Bekräftelse och kalenderinbjudan skickas till ${form.email}.`
              : `Faktura skickas till ${form.email} inom 1 arbetsdag. Din plats är reserverad.`
          }
        </p>

        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6 w-full max-w-xs mx-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Kom ihåg</p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar size={13} className="text-[#FF5421] flex-shrink-0" />
            {new Date(event.starts_at).toLocaleDateString('sv-SE', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Clock size={13} className="text-[#FF5421] flex-shrink-0" />
            {new Date(event.starts_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}–
            {new Date(event.ends_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
          </p>
          {(event.zoom_url || event.teams_url) && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Monitor size={13} className="text-[#FF5421] flex-shrink-0" />
              Länk skickas i bekräftelsemejlet
            </p>
          )}
          {event.location_name && !event.zoom_url && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={13} className="text-[#FF5421] flex-shrink-0" />
              {event.location_name}
            </p>
          )}
        </div>

        <button onClick={onClose}
          className="px-8 py-3 rounded-xl font-bold text-white"
          style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
          Stäng
        </button>
      </motion.div>
    </div>
  );
};

// ─── MODAL: HUVUD ─────────────────────────────────────────

const EventBookingModal = ({ event, onClose }) => {
  const [step,          setStep]          = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(
    event.is_free || currentPrice(event) === 0 ? 'free' : 'stripe'
  );
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', organisation: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((id, value) => {
    setForm(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: null }));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name  = 'Ange ditt namn';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Ange en giltig e-postadress';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const isFree = event.is_free || currentPrice(event) === 0;
      const price  = isFree ? 0 : currentPrice(event);

      // 1. Spara registrering i Supabase
      const { data, error } = await createRegistration(event.id, {
        ...form,
        paymentMethod: isFree ? 'free' : paymentMethod,
        pricePaid:     paymentMethod === 'invoice' ? 0 : price, // stripe sätts via webhook
      });

      if (error) throw new Error(error.message);

      // 2. Om Stripe – redirecta till checkout (implementeras med Edge Function)
      if (paymentMethod === 'stripe' && !isFree) {
        // TODO: anropa /functions/v1/stripe-checkout med registration id
        // const res = await fetch('/functions/v1/stripe-checkout', { ... })
        // window.location.href = res.checkoutUrl
        console.log('→ Stripe checkout för registrering:', data.id);
      }

      // 3. Visa tack-skärm (för faktura/gratis direkt, för Stripe efter redirect)
      setStep(3);
    } catch (err) {
      console.error('Booking error:', err);
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Steg-indikator
  const StepIndicator = () => (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-100 flex-shrink-0">
      {[1, 2].map(s => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${step > s ? 'bg-green-500 text-white'
              : step === s ? 'bg-[#FF5421] text-white'
              : 'bg-gray-100 text-gray-400'}`}>
            {step > s ? <CheckCircle size={12} /> : s}
          </div>
          <span className={`text-xs ${step === s ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
            {s === 1 ? 'Dina uppgifter' : 'Bekräftelse'}
          </span>
          {s < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
        </div>
      ))}
    </div>
  );

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

          {/* Header: event-info */}
          <EventSummaryBar event={event} />

          {/* Stäng-knapp */}
          <button onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
            <X size={14} className="text-white" />
          </button>

          {/* Steg-indikator (dold på step 3) */}
          {step < 3 && <StepIndicator />}

          {/* Innehåll */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1 overflow-hidden">
                <Step1Form
                  event={event} form={form} onChange={handleChange}
                  errors={errors} paymentMethod={paymentMethod}
                  onPaymentChange={setPaymentMethod} onNext={handleNext}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1 overflow-hidden">
                <Step2Confirm
                  event={event} form={form} paymentMethod={paymentMethod}
                  loading={loading} onSubmit={handleSubmit} onBack={() => setStep(1)}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col flex-1 overflow-hidden">
                <Step3Success
                  event={event} form={form} paymentMethod={paymentMethod} onClose={onClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default EventBookingModal;