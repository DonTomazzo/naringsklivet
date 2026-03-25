import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceModal from '../components/InvoiceModal';
import {
  CheckCircle, Shield, Clock, Users, Play,
  Award, FileText, X, Zap, ArrowLeft, Star,
  CreditCard, Building2
} from 'lucide-react';

// ── Brand tokens ────────────────────────────────────────
const ORANGE   = '#FF5421';
const DARK     = '#171f32';
const DARK_MID = '#1e2a42';

const MOCK_COURSES = {
  'naringsklivet-ai': {
    id: 'naringsklivet-ai',
    title: 'Framtidssäkra dig med AI',
    subtitle: 'Praktiskt AI-träningsprogram för medarbetare, chefer och egenföretagare',
    description:
      'Lär dig använda AI i din faktiska arbetsdag – inte i teorin. Kursen ger dig konkreta verktyg, ' +
      'färdiga promptmallar och praktiska övningar som direkt frigör tid. Byggt för alla som vill ' +
      'jobba smartare, oavsett roll, bransch eller teknisk bakgrund.',
    price: 1995,
    originalPrice: 2995,
    image: '/t2.png',
    features: [
      '14 moduler med praktiska AI-verktyg',
      'Videolektioner i din egen takt',
      'Övningar direkt kopplade till din arbetsdag',
      'Certifikat vid genomförd kurs',
      '365 dagars åtkomst till materialet',
      'Uppdateras löpande med nya verktyg',
    ],
    highlights: [
      { icon: Clock,  text: '14',       label: 'Moduler' },
      { icon: Users,  text: 'Nyhet',    label: '2026' },
      { icon: Star,   text: 'Praktisk', label: 'Metodik' },
      { icon: Award,  text: 'Certifikat', label: 'Ingår' },
    ],
    modules: [
      'AI – din nya kollega',
      'Vad är generativ AI?',
      'Säkerhet & policy på jobbet',
      'Promptteknik som faktiskt funkar',
      'Källkritik & AI:s begränsningar',
      'AI för text & kommunikation',
      'AI för analys & research',
      'AI för bilder & presentationer',
      'Automatisering av repetitivt arbete',
      'AI i din yrkesroll',
      'Verktygskartan 2026',
      'Bygga din AI-rutin',
      'Etik & ansvarsfullt AI-användande',
      'Workshop & examensuppgift',
    ],
  },
};

// ── Fade-up animation ───────────────────────────────────
const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Betalningsväljare ────────────────────────────────────
const PaymentToggle = ({ selected, onChange }) => (
  <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
    {[
      { id: 'card',    icon: CreditCard,  label: 'Kortbetalning' },
      { id: 'invoice', icon: Building2,   label: 'Faktura' },
    ].map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        onClick={() => onChange(id)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all"
        style={{
          background: selected === id ? ORANGE : 'white',
          color: selected === id ? 'white' : '#64748b',
        }}
      >
        <Icon size={14} />
        {label}
      </button>
    ))}
  </div>
);

const PurchasePage = () => {
  const { courseId }  = useParams();
  const navigate      = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showInvoice,   setShowInvoice]   = useState(false);
  const [showSuccess,   setShowSuccess]   = useState(false);
  const [showSticky,    setShowSticky]    = useState(false);

  const course  = MOCK_COURSES[courseId] || MOCK_COURSES['naringsklivet-ai'];
  const savings = course.originalPrice - course.price;

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleInvoiceSubmit = async (data) => {
    console.log('Faktura:', data);
    setShowInvoice(false);
    setTimeout(() => setShowSuccess(true), 300);
  };

  const handleCardPayment = () => {
    // TODO: integrera Stripe checkout
    console.log('Stripe checkout för:', course.id);
  };

  const handlePrimaryAction = () => {
    if (paymentMethod === 'invoice') setShowInvoice(true);
    else handleCardPayment();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/modules');
  };

  const ctaLabel = paymentMethod === 'invoice'
    ? <><FileText size={18} /> Beställ med faktura</>
    : <><CreditCard size={18} /> Betala nu – {course.price.toLocaleString()} kr</>;

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>

      {/* ── Sticky header ──────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'white', borderColor: '#e2e8f0' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#64748b' }}
          >
            <ArrowLeft size={16} />
            Tillbaka
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
          >
            <X size={18} style={{ color: '#94a3b8' }} />
          </button>
        </div>
      </header>

      {/* ── Hero banner ────────────────────────────────── */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <img src={course.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${DARK}ee, ${DARK_MID}bb)` }} />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 sm:px-10 sm:pb-8 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div {...fu(0)}>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}44` }}
            >
              Lansering 2026 · Introduktionspris
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{course.title}</h1>
            <p className="text-white/70 text-sm sm:text-base mt-1">{course.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── LEFT: Course info ──────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Stats row */}
            <motion.div {...fu(0.08)} className="grid grid-cols-4 gap-3">
              {course.highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="rounded-xl p-3 text-center border"
                    style={{ background: 'white', borderColor: '#e2e8f0' }}>
                    <Icon className="mx-auto mb-1.5" size={18} style={{ color: ORANGE }} />
                    <div className="text-base font-bold" style={{ color: DARK }}>{h.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{h.label}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Description */}
            <motion.div {...fu(0.12)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: DARK }}>Om kursen</h2>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#64748b' }}>
                {course.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div {...fu(0.16)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: DARK }}>Vad ingår?</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: ORANGE }}>
                      <CheckCircle size={11} color="white" />
                    </div>
                    <span className="text-sm" style={{ color: '#475569' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Modules */}
            <motion.div {...fu(0.2)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: DARK }}>Kursinnehåll</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.modules.map((m, i) => (
                  <div key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium"
                    style={{ background: '#FFF0EB', borderColor: '#FFD5C7', color: DARK }}>
                    <Play size={13} style={{ color: ORANGE }} className="flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For who */}
            <motion.div {...fu(0.22)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: DARK }}>För vem?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { emoji: '👩‍💼', title: 'Anställda', desc: 'Som vill jobba smartare och leverera mer på kortare tid' },
                  { emoji: '🧑‍💻', title: 'Egenföretagare', desc: 'Som vill frigöra tid från administration och fokusera på tillväxt' },
                  { emoji: '👔', title: 'Chefer', desc: 'Som vill leda en organisation som håller jämna steg med AI-utvecklingen' },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl p-4 text-center"
                    style={{ background: '#F8F7F4', border: '1px solid #e2e8f0' }}>
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <p className="font-semibold text-sm mb-1" style={{ color: DARK }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div {...fu(0.26)} className="rounded-2xl p-5 sm:p-6 border-2 flex items-start gap-4"
              style={{ background: '#F8F7F4', borderColor: '#e2e8f0' }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${ORANGE}15` }}>
                <Shield size={22} style={{ color: ORANGE }} />
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: DARK }}>14 dagars öppet köp</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                  Om du inte är nöjd med kursen får du pengarna tillbaka utan krångel.
                  Vi tar all risk – du kan köpa tryggt.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Checkout box ────────────────────── */}
          <div className="hidden lg:block lg:col-span-1">
            <motion.div {...fu(0.1)} className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl border"
                style={{ background: 'white', borderColor: '#e2e8f0' }}>

                {/* Price header */}
                <div className="p-6" style={{ background: DARK }}>
                  <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                    style={{ background: `${ORANGE}25`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
                    Introduktionspris
                  </div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl font-bold text-white">
                      {course.price.toLocaleString()}
                      <span className="text-xl ml-1 font-normal text-white/60">kr</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {course.originalPrice.toLocaleString()} kr
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${ORANGE}30`, color: ORANGE }}>
                      Du sparar {savings.toLocaleString()} kr
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Per person · exkl. moms
                  </p>
                </div>

                {/* Payment toggle + CTA */}
                <div className="p-6 space-y-4">
                  <PaymentToggle selected={paymentMethod} onChange={setPaymentMethod} />

                  <ul className="space-y-2.5">
                    {[
                      'Omedelbar tillgång',
                      '365 dagars åtkomst',
                      'Alla uppdateringar ingår',
                      'Certifikat vid avslut',
                      '14 dagars öppet köp',
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle size={15} style={{ color: ORANGE }} className="flex-shrink-0" />
                        <span className="text-sm" style={{ color: '#475569' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02, opacity: 0.95 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrimaryAction}
                    className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2.5 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${ORANGE}, #E04619)`,
                      boxShadow: `0 4px 20px ${ORANGE}40`,
                    }}
                  >
                    {ctaLabel}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {paymentMethod === 'invoice' && (
                      <motion.p
                        key="invoice-note"
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-center" style={{ color: '#94a3b8' }}>
                        Faktura skickas inom 1 arbetsdag · 30 dagars betalningsvillkor
                      </motion.p>
                    )}
                    {paymentMethod === 'card' && (
                      <motion.p
                        key="card-note"
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-center" style={{ color: '#94a3b8' }}>
                        Säker betalning via Stripe · Visa, Mastercard, Apple Pay
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Trust */}
                  <div className="pt-3 border-t space-y-2" style={{ borderColor: '#f1f5f9' }}>
                    {[
                      [Shield, 'SSL-krypterad anslutning'],
                      [Zap,    'Tillgång direkt efter betalning'],
                    ].map(([Icon, text], i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Icon size={12} style={{ color: '#94a3b8' }} />
                        <span className="text-xs" style={{ color: '#94a3b8' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-4 rounded-xl p-4 flex items-start gap-3 border"
                style={{ background: 'white', borderColor: '#e2e8f0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#FFF0EB' }}>
                  <Users size={15} style={{ color: ORANGE }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                  <strong style={{ color: DARK }}>Framtidssäkra din organisation</strong> –
                  ett träningsprogram byggt för medarbetare, chefer och egenföretagare som
                  vill ligga steget före.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Mobil: sticky bottom bar ───────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t shadow-2xl px-4 py-3"
        style={{ background: 'white', borderColor: '#e2e8f0' }}>
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>Introduktionspris</div>
            <div className="font-bold text-lg" style={{ color: DARK }}>
              {course.price.toLocaleString()} kr
              <span className="text-sm line-through ml-2" style={{ color: '#cbd5e1' }}>
                {course.originalPrice.toLocaleString()} kr
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handlePrimaryAction}
            className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2"
            style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
          >
            {paymentMethod === 'invoice'
              ? <><FileText size={15} /> Faktura</>
              : <><CreditCard size={15} /> Betala nu</>
            }
          </motion.button>
        </div>
        {/* Mobile payment toggle */}
        <div className="mt-2 max-w-lg mx-auto">
          <PaymentToggle selected={paymentMethod} onChange={setPaymentMethod} />
        </div>
      </div>

      <div className="h-28 lg:hidden" />

      {/* ── Modals ─────────────────────────────────────── */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        course={course}
        onSubmit={handleInvoiceSubmit}
      />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.55)' }}
            onClick={handleSuccessClose}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              style={{ background: 'white' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: `${ORANGE}15` }}>
                <CheckCircle size={32} style={{ color: ORANGE }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: DARK }}>
                Tack för din beställning!
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>
                {paymentMethod === 'invoice'
                  ? 'Vi skickar en faktura till din e-post inom 1 arbetsdag. Du får tillgång till kursen så snart betalningen registrerats.'
                  : 'Din betalning är bekräftad. Du har nu omedelbar tillgång till hela kursen.'
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleSuccessClose}
                className="w-full py-3.5 rounded-xl font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
              >
                {paymentMethod === 'card' ? 'Starta kursen nu' : 'Tillbaka till startsidan'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchasePage;