import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceModal from '../components/InvoiceModal';
import {
  CheckCircle, Shield, Clock, Users, Play,
  Award, FileText, X, Zap, ArrowLeft, Star,
  CreditCard, Building2, MessageSquare, Mic, Wrench,
  ArrowRight, ExternalLink
} from 'lucide-react';

// ── Brand tokens ────────────────────────────────────────
const ORANGE   = '#FF5421';
const DARK     = '#171f32';
const DARK_MID = '#1e2a42';

// ── Prisvolym-rabatter ──────────────────────────────────
const getDiscountedPrice = (basePrice, qty) => {
  if (qty >= 20) return Math.round(basePrice * 0.65);
  if (qty >= 10) return Math.round(basePrice * 0.75);
  if (qty >= 5)  return Math.round(basePrice * 0.85);
  if (qty >= 2)  return Math.round(basePrice * 0.90);
  return basePrice;
};

const getDiscountLabel = (qty) => {
  if (qty >= 20) return '35% rabatt';
  if (qty >= 10) return '25% rabatt';
  if (qty >= 5)  return '15% rabatt';
  if (qty >= 2)  return '10% rabatt';
  return null;
};

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
      { icon: Clock,  text: '14',        label: 'Moduler' },
      { icon: Users,  text: 'Nyhet',     label: '2026' },
      { icon: Star,   text: 'Praktisk',  label: 'Metodik' },
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

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Betalningsväljare ────────────────────────────────────
const PaymentToggle = ({ selected, onChange }) => (
  <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
    {[
      { id: 'card',    icon: CreditCard, label: 'Kortbetalning' },
      { id: 'invoice', icon: Building2,  label: 'Faktura' },
    ].map(({ id, icon: Icon, label }) => (
      <button
        key={id}
        onClick={() => onChange(id)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all"
        style={{ background: selected === id ? ORANGE : 'white', color: selected === id ? 'white' : '#64748b' }}
      >
        <Icon size={14} />
        {label}
      </button>
    ))}
  </div>
);

// ── Licens-väljare ───────────────────────────────────────
const LicenseCounter = ({ qty, onChange, basePrice }) => {
  const pricePerUnit  = getDiscountedPrice(basePrice, qty);
  const discountLabel = getDiscountLabel(qty);
  const total         = pricePerUnit * qty;

  return (
    <div className="space-y-3">
      {/* Counter */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(1, qty - 1))}
          className="w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-colors hover:border-[#FF5421] hover:text-[#FF5421]"
          style={{ borderColor: '#e2e8f0', color: '#64748b' }}
        >
          −
        </button>
        <span className="text-2xl font-bold w-8 text-center" style={{ color: DARK }}>
          {qty}
        </span>
        <button
          onClick={() => onChange(Math.min(100, qty + 1))}
          className="w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-colors hover:border-[#FF5421] hover:text-[#FF5421]"
          style={{ borderColor: '#e2e8f0', color: '#64748b' }}
        >
          +
        </button>
        <span className="text-sm ml-1" style={{ color: '#94a3b8' }}>
          {qty === 1 ? 'licens' : 'licenser'}
        </span>
      </div>

      {/* Rabatt-tiers */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { min: 1,  label: '1',    discount: null },
          { min: 2,  label: '2–4',  discount: '10%' },
          { min: 5,  label: '5–9',  discount: '15%' },
          { min: 10, label: '10+',  discount: '25%' },
        ].map((tier, i) => {
          const active = (i === 0 && qty === 1) ||
                         (i === 1 && qty >= 2 && qty < 5) ||
                         (i === 2 && qty >= 5 && qty < 10) ||
                         (i === 3 && qty >= 10);
          return (
            <button
              key={i}
              onClick={() => onChange(tier.min)}
              className="rounded-lg py-1.5 px-1 text-center transition-all"
              style={{
                background: active ? `${ORANGE}15` : '#f8fafc',
                border: `1px solid ${active ? ORANGE : '#e2e8f0'}`,
              }}
            >
              <div className="text-xs font-bold" style={{ color: active ? ORANGE : '#64748b' }}>
                {tier.label}
              </div>
              {tier.discount && (
                <div className="text-xs" style={{ color: active ? ORANGE : '#94a3b8' }}>
                  -{tier.discount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Totalpris */}
      <div className="rounded-xl p-3 flex items-center justify-between"
        style={{ background: `${ORANGE}08`, border: `1px solid ${ORANGE}20` }}>
        <div>
          <div className="text-xs" style={{ color: '#94a3b8' }}>
            {qty > 1 ? `${pricePerUnit.toLocaleString()} kr/licens` : 'Per licens'}
          </div>
          {discountLabel && (
            <div className="text-xs font-bold" style={{ color: ORANGE }}>
              🎉 {discountLabel} tillämpad
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold" style={{ color: DARK }}>
            {total.toLocaleString()} kr
          </div>
          <div className="text-xs" style={{ color: '#94a3b8' }}>exkl. moms · totalt</div>
        </div>
      </div>
    </div>
  );
};

// ── Tjänstekort för upsell-sektionen ─────────────────────
const ServiceCard = ({ icon: Icon, label, title, desc, points, cta, path }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: 'white', borderColor: '#e2e8f0' }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${ORANGE}15` }}>
            <Icon size={16} style={{ color: ORANGE }} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: ORANGE }}>
            {label}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: DARK }}>{title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{desc}</p>
        <ul className="space-y-2 mb-5">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#475569' }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: ORANGE }}>
                <CheckCircle size={9} color="white" />
              </div>
              {p}
            </li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate(path)}
          className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${ORANGE}, #E04619)` }}
        >
          {cta} <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

const PurchasePage = () => {
  const { courseId }  = useParams();
  const navigate      = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [licenseQty,    setLicenseQty]    = useState(1);
  const [showInvoice,   setShowInvoice]   = useState(false);
  const [showSuccess,   setShowSuccess]   = useState(false);

  const course        = MOCK_COURSES[courseId] || MOCK_COURSES['naringsklivet-ai'];
  const pricePerUnit  = getDiscountedPrice(course.price, licenseQty);
  const totalPrice    = pricePerUnit * licenseQty;
  const savings       = course.originalPrice - pricePerUnit;
  const discountLabel = getDiscountLabel(licenseQty);

  const handleInvoiceSubmit = async (data) => {
    console.log('Faktura:', data);
    setShowInvoice(false);
    setTimeout(() => setShowSuccess(true), 300);
  };

  const handleCardPayment = () => {
    console.log('Stripe checkout, qty:', licenseQty, 'total:', totalPrice);
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
    : <><CreditCard size={18} /> Betala {totalPrice.toLocaleString()} kr</>;

  // ── Checkout-box (återanvänds på desktop och mobil) ─────
  const CheckoutBox = () => (
    <div className="rounded-2xl overflow-hidden shadow-xl border"
      style={{ background: 'white', borderColor: '#e2e8f0' }}>

      {/* Pris-header */}
      <div className="p-6" style={{ background: DARK }}>
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
          style={{ background: `${ORANGE}25`, color: ORANGE, border: `1px solid ${ORANGE}40` }}>
          Introduktionspris
        </div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-4xl font-bold text-white">
            {pricePerUnit.toLocaleString()}
            <span className="text-xl ml-1 font-normal text-white/60">kr</span>
          </span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-base line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {course.originalPrice.toLocaleString()} kr
          </span>
          {discountLabel && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${ORANGE}30`, color: ORANGE }}>
              {discountLabel}
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Per licens · exkl. moms
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <PaymentToggle selected={paymentMethod} onChange={setPaymentMethod} />

        {/* Licenser */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#64748b' }}>
            <Users size={11} className="inline mr-1" />
            Antal licenser
          </p>
          <LicenseCounter
            qty={licenseQty}
            onChange={setLicenseQty}
            basePrice={course.price}
          />
        </div>

        {/* Checkboxlista */}
        <ul className="space-y-2">
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

        {/* CTA */}
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
            <motion.p key="inv" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs text-center" style={{ color: '#94a3b8' }}>
              Faktura skickas inom 1 arbetsdag · 30 dagars betalningsvillkor
            </motion.p>
          )}
          {paymentMethod === 'card' && (
            <motion.p key="card" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-xs text-center" style={{ color: '#94a3b8' }}>
              Säker betalning via Stripe · Visa, Mastercard, Apple Pay
            </motion.p>
          )}
        </AnimatePresence>

        {/* Trust + villkor */}
        <div className="pt-3 border-t space-y-2" style={{ borderColor: '#f1f5f9' }}>
          <button
            onClick={() => navigate('/villkor')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ExternalLink size={12} style={{ color: '#94a3b8' }} />
            <span className="text-xs underline" style={{ color: '#94a3b8' }}>Allmänna villkor</span>
          </button>
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
  );

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>

      {/* ── Header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'white', borderColor: '#e2e8f0' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: '#64748b' }}>
            <ArrowLeft size={16} /> Tillbaka
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-base" style={{ color: DARK }}>
              <span style={{ color: ORANGE }}>Närings</span>klivet
            </span>
          </div>
          <button onClick={() => navigate('/')}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
            <X size={18} style={{ color: '#94a3b8' }} />
          </button>
        </div>
      </header>

      {/* ── Hero banner ─────────────────────────────────── */}
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <img src={course.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${DARK}ee, ${DARK_MID}bb)` }} />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 sm:px-10 sm:pb-8 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div {...fu(0)}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: `${ORANGE}22`, color: ORANGE, border: `1px solid ${ORANGE}44` }}>
              Lansering 2026 · Introduktionspris
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{course.title}</h1>
            <p className="text-white/70 text-sm sm:text-base mt-1">{course.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── LEFT ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Stats */}
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

            {/* Om kursen */}
            <motion.div {...fu(0.12)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: DARK }}>Om kursen</h2>
              <p className="leading-relaxed text-sm sm:text-base" style={{ color: '#64748b' }}>
                {course.description}
              </p>
            </motion.div>

            {/* Vad ingår */}
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

            {/* Kursinnehåll */}
            <motion.div {...fu(0.2)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: DARK }}>Kursinnehåll</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.modules.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium"
                    style={{ background: '#FFF0EB', borderColor: '#FFD5C7', color: DARK }}>
                    <Play size={13} style={{ color: ORANGE }} className="flex-shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* För vem */}
            <motion.div {...fu(0.22)} className="rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'white', borderColor: '#e2e8f0' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: DARK }}>För vem?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { emoji: '👩‍💼', title: 'Anställda',       desc: 'Som vill jobba smartare och leverera mer på kortare tid' },
                  { emoji: '🧑‍💻', title: 'Egenföretagare',  desc: 'Som vill frigöra tid från administration och fokusera på tillväxt' },
                  { emoji: '👔', title: 'Chefer',            desc: 'Som vill leda en organisation som håller jämna steg med AI-utvecklingen' },
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

            {/* Garanti */}
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

            {/* ── UPSELL: Tjänster ─────────────────────── */}
            <div className="pt-4">
              <motion.div {...fu(0.1)} className="mb-6">
                <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5
                                rounded-full mb-3 text-white" style={{ background: ORANGE }}>
                  Vill du ha mer?
                </div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: DARK }}>
                  Komplettera med en personlig session
                </h2>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Kursen ger dig grunden – våra tjänster ger dig djupet för just din situation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ServiceCard
                  icon={MessageSquare}
                  label="One on One"
                  title="Personlig AI-genomgång – anpassad helt efter dig"
                  desc="En intensiv session där vi går igenom dina specifika arbetsuppgifter och identifierar exakt hur AI kan spara tid just för dig. Du lämnar med konkreta verktyg, promptmallar och en plan."
                  points={[
                    '90 minuter via Zoom eller på plats',
                    'Genomgång av dina topp 3 tidskrävande uppgifter',
                    'Skräddarsydda promptmallar att använda direkt',
                    'Uppföljningsmejl med resurser och nästa steg',
                  ]}
                  cta="Boka One on One"
                  path="/seminarier#events"
                />
                <ServiceCard
                  icon={Mic}
                  label="Föreläsning"
                  title="AI-föreläsning som väcker din organisation"
                  desc="En engagerande keynote eller halvdagsföreläsning om AI i arbetslivet. Praktiska demos, verkliga exempel och ett budskap som fastnar. Anpassas efter er bransch och era utmaningar."
                  points={[
                    'Från 45 min keynote till halvdag',
                    'Online, på plats eller hybrid',
                    'Branschanpassat innehåll och exempel',
                    'Interaktiva moment och Q&A',
                  ]}
                  cta="Boka föreläsning"
                  path="/seminarier#events"
                />
                <ServiceCard
                  icon={Wrench}
                  label="Workshop"
                  title="Hands-on workshop – lär genom att göra"
                  desc="En praktisk halvdags- eller heldagsworkshop där deltagarna arbetar med sina egna arbetsuppgifter och AI-verktyg i realtid. Det snabbaste sättet att bygga kompetens som faktiskt fastnar."
                  points={[
                    'Halvdag (3h) eller heldag (6h)',
                    'Max 20 deltagare för djup interaktion',
                    'Alla jobbar med sina egna use cases',
                    'Certifikat och material med hem',
                  ]}
                  cta="Boka workshop"
                  path="/om-oss"
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sticky checkout ──────────────────── */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <motion.div {...fu(0.1)}>
                <CheckoutBox />
              </motion.div>

              {/* Social proof */}
              <div className="rounded-xl p-4 flex items-start gap-3 border"
                style={{ background: 'white', borderColor: '#e2e8f0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#FFF0EB' }}>
                  <Users size={15} style={{ color: ORANGE }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                  <strong style={{ color: DARK }}>Framtidssäkra din organisation</strong> –
                  ett träningsprogram byggt för medarbetare, chefer och egenföretagare som vill ligga steget före.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobil: sticky bottom bar ────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t shadow-2xl px-4 py-3"
        style={{ background: 'white', borderColor: '#e2e8f0' }}>
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto mb-2">
          <div>
            <div className="text-xs" style={{ color: '#94a3b8' }}>
              {licenseQty} licens{licenseQty > 1 ? 'er' : ''}
              {discountLabel && <span style={{ color: ORANGE }}> · {discountLabel}</span>}
            </div>
            <div className="font-bold text-lg" style={{ color: DARK }}>
              {totalPrice.toLocaleString()} kr
              <span className="text-sm line-through ml-2" style={{ color: '#cbd5e1' }}>
                {(course.originalPrice * licenseQty).toLocaleString()} kr
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
        <div className="max-w-lg mx-auto">
          <PaymentToggle selected={paymentMethod} onChange={setPaymentMethod} />
        </div>
      </div>

      <div className="h-28 lg:hidden" />

      {/* ── Modals ───────────────────────────────────────── */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        course={{ ...course, qty: licenseQty, totalPrice }}
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
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#64748b' }}>
                {paymentMethod === 'invoice'
                  ? `Faktura för ${licenseQty} licens${licenseQty > 1 ? 'er' : ''} (${totalPrice.toLocaleString()} kr) skickas till din e-post inom 1 arbetsdag.`
                  : `Din betalning på ${totalPrice.toLocaleString()} kr är bekräftad. Du har nu omedelbar tillgång.`
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleSuccessClose}
                className="w-full py-3.5 rounded-xl font-bold text-white mt-4"
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