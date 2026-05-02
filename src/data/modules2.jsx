// src/data/modules2.jsx
import Bostadsrattsforeningen from '../modules/Styrelsekorkortet/BRFModule.tsx';
import Module1Introduktion from '../modules/Styrelsekorkortet/Module1Introduktion.tsx';
import Module3Gdpr from '../modules/Styrelsekorkortet/Module3Gdpr.tsx';
import ModuleDokumentation from '../modules/Styrelsekorkortet/ModuleDokumentation';
import Module5AiBrf from '../modules/Styrelsekorkortet/Module5AiBrf.tsx';
import ModuleHallbarhet from '../modules/Styrelsekorkortet/ModuleHallbarhet.tsx';
import ModuleIntressenter from '../modules/Styrelsekorkortet/ModuleIntressenter.tsx';
import Module4Diskriminering from '../modules/Styrelsekorkortet/Module4Diskriminering.tsx';
import Module0Introduktion from '../modules/Styrelsekorkortet/Module0Introduktion.tsx';
import Module2Arsredovisning from '../modules/Styrelsekorkortet/Module2Arsredovisning';
import ModuleMotesledning, { courseData as motenData } from '../modules/Styrelsekorkortet/ModuleMotesledning';
import FastighetenOversikt from '../pages/FastighetenOversikt';
import ModuleFastighetenSakerhet, { courseData as fastighetenData } from '../modules/Styrelsekorkortet/ModuleFastighetenSakerhet';
import ModuleFastighetenUnderhall from '../modules/Styrelsekorkortet/ModuleFastighetenUnderhall';
import ModuleFastighetenEnergi from '../modules/Styrelsekorkortet/ModuleFastighetenEnergi';
import ModuleFastighetenDrift from '../modules/Styrelsekorkortet/ModuleFastighetenDrift';
import digitalSakerhetKurs from '../data/digitalSakerhetData';
import ModuleDigitalSakerhet from '../modules/Naringsklivet/ModuleDigitalSakerhet';
import ModulePhishing from '../modules/Naringsklivet/ModulePhishing';
import ModuleNIS2 from '../modules/Naringsklivet/ModuleNIS2';


// ── Delad instruktör ──────────────────────────────────────
const INSTRUCTOR = {
  name:  'Tomas Mauritzson',
  title: 'Kursledare, Styrelsekörkortet',
  img:   '/founder.png',
  bio:   '15+ års erfarenhet av styrelsearbete, föreningsjuridik och utbildning. Grundare av Styrelsekörkortet.',
};

export const isBundle = true; // markerar att alla kurser ingår i ett paket

const STYRELSEKORKORTET_LIVE = {
  id:       'styrelsekorkortet-plats',
  slug:     'styrelsekorkortet-plats',
  type:     'live',
  category: 'GRUNDERNA',
  title: 'Styrelsekörkortet — live via Teams',
  subtitle: 'Tomas Mauritzson kommer till er förening och utbildar hela styrelsen på 3 timmar.',
  short_description: 'Komplett styrelseutbildning live via Teams — praktisk, interaktiv och skräddarsydd.',
  image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
  duration: '3 timmar',
  price: 4900,
  priceTeam: 'Fast pris per styrelse — alla ledamöter ingår',
  location: 'Microsoft Teams',
  maxParticipants: 16,
  component: null,
  rating: 5.0,
  students: 0,
  instructor: {
    name:  'Tomas Mauritzson',
    title: 'Kursledare — Styrelsekörkortet',
    img:   '/founder.png',
    bio:   'Tomas Mauritzson har 15+ års erfarenhet av styrelsearbete, föreningsjuridik och utbildning. Han har utbildat hundratals styrelseledamöter i hela Sverige och är känd för sin pedagogiska och jordnära stil. Som grundare av Styrelsekörkortet är han den enda kursledaren i Sverige med ett komplett utbildningsprogram skräddarsytt för BRF-styrelser.',
  },
  learningPoints: [
    'Styrelsens roller, ansvar och befogenheter',
    'Vad som gäller på styrelsemöten — formalia och protokoll',
    'Ekonomin i föreningen — läsa en årsredovisning',
    'Juridiska grunderna — bostadsrättslagen i praktiken',
    'GDPR och personuppgiftshantering i föreningen',
    'Föreningsstämman — från kallelse till ansvarsfrihet',
    'Underhållsplanering och fastighetens skötsel',
    'Praktiska verktyg och AI för styrelsearbetet',
  ],
  forWho: [
    'Nyvalda BRF-styrelser som vill starta rätt',
    'Befintliga styrelser som vill fräscha upp kunskapen',
    'Föreningar inför en föreningsstämma',
    'Styrelser som vill genomföra utbildningen tillsammans — på plats',
  ],
  modules: [
    { title: 'Block 1 — Styrelsen, roller och juridik',      duration: '60 min', free: true  },
    { title: 'Block 2 — Ekonomi och underhållsplanering',    duration: '60 min', free: true  },
    { title: 'Block 3 — Stämman, GDPR och smarta verktyg',   duration: '60 min', free: true  },
  ],
  testimonials: [
    { name: 'Maria L.', role: 'Ordförande BRF Kastanjen', text: 'Äntligen förstår hela styrelsen vad som gäller. Tomas förklarar på ett sätt som fastnar.', rating: 5 },
    { name: 'Anders K.', role: 'Kassör BRF Eken', text: 'Vi lärde oss mer på 3 timmar med Tomas än på 5 år i styrelsen.', rating: 5 },
    { name: 'Sofia B.', role: 'Sekreterare BRF Linden', text: 'Perfekt inför vår första stämma. Praktisk, tydlig och faktiskt rolig.', rating: 5 },
  ],
  faq: [
    { question: 'Var hålls utbildningen?', answer: 'Via Microsoft Teams. Vi skickar en möteslänk när datum är bekräftat. Ni behöver bara en dator eller surfplatta.' },
    { question: 'Hur många kan delta?', answer: 'Priset gäller för upp till 16 deltagare. Perfekt för en hel styrelse med suppleanter. Fler deltagare? Kontakta oss för offert.' },
    { question: 'Vad ingår i priset?', answer: '3 timmars interaktiv utbildning på plats, digitalt kursbevis till alla deltagare och komplett kursmaterial som PDF. Moms tillkommer.' },
    { question: 'Kan vi anpassa innehållet?', answer: 'Ja — vi kan lägga extra fokus på de ämnen just er förening behöver. Hör av er när ni bokar så diskuterar vi upplägget.' },
    { question: 'Hur lång framförhållning behövs?', answer: 'Vi rekommenderar att boka minst 3 veckor i förväg. Vi försöker alltid vara flexibla — kontakta oss så hittar vi ett datum.' },
    { question: 'Vad händer om vi behöver avboka?', answer: 'Kostnadsfri avbokning upp till 7 dagar före utbildningen. Därefter debiteras 50% av kursavgiften.' },
  ],
  pdfUrl: '/pdfs/styrelsekorkortet-plats-program.pdf',
};
 
 
// ═══════════════════════════════════════════════════════════
// DEL 2: Skapa en dedikerad bokningssida
// src/pages/BookingPage.tsx
// Route: /boka-styrelsekorkortet
// ═══════════════════════════════════════════════════════════
 
/*
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, Users, Award, CheckCircle,
  ChevronRight, Star, Phone, Mail, ArrowRight,
  Calendar, FileText, Zap,
} from 'lucide-react';
 
const O  = '#FF5421';
const OD = '#E04619';
 
const C = {
  orange:  O,
  orangeD: OD,
  orangeL: '#FFF0EB',
  dark:    '#1A1A1A',
  mid:     '#4A4A4A',
  muted:   '#8A8A8A',
  bg:      '#FAFAF8',
  border:  '#E8E5E0',
  white:   '#FFFFFF',
};
 
export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    foreningNamn: '',
    kontaktNamn: '',
    email: '',
    telefon: '',
    ort: '',
    antal: '',
    datum1: '',
    datum2: '',
    datum3: '',
    meddelande: '',
  });
  const [submitted, setSubmitted] = useState(false);
 
  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));
 
  const handleSubmit = async () => {
    // Skicka till Netlify Forms eller eget API
    setSubmitted(true);
  };
 
  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full mx-4 rounded-3xl p-10 text-center border shadow-xl"
        style={{ background: C.white, borderColor: C.border }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: C.orangeL }}>
          <CheckCircle className="w-8 h-8" style={{ color: O }} />
        </div>
        <h2 className="text-2xl font-black mb-3" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
          Tack för din förfrågan!
        </h2>
        <p className="text-base mb-6" style={{ color: C.mid }}>
          Vi återkommer inom 24 timmar för att bekräfta datum och detaljer.
        </p>
        <div className="rounded-2xl p-5 mb-6 text-left space-y-2" style={{ background: C.bg }}>
          <p className="text-sm font-bold" style={{ color: C.dark }}>Dina uppgifter:</p>
          <p className="text-sm" style={{ color: C.mid }}>{form.foreningNamn}</p>
          <p className="text-sm" style={{ color: C.mid }}>{form.kontaktNamn} · {form.email}</p>
          <p className="text-sm" style={{ color: C.mid }}>Önskade datum: {form.datum1}{form.datum2 ? `, ${form.datum2}` : ''}{form.datum3 ? `, ${form.datum3}` : ''}</p>
        </div>
        <button onClick={() => navigate('/')}
          className="w-full py-3.5 rounded-xl font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${O}, ${OD})` }}>
          Tillbaka till startsidan
        </button>
      </motion.div>
    </div>
  );
 
  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Nunito', sans-serif" }}>
 
      // Hero
      <div style={{ background: 'linear-gradient(135deg, #171f32 0%, #1e2d4a 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-24 pb-16">
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <button onClick={() => navigate('/')} className="hover:text-white">Hem</button>
            <ChevronRight size={12} />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Boka Styrelsekörkortet</span>
          </div>
 
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: C.orangeL, color: O }}>
              Platsbaserad utbildning · 3 timmar
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Styrelsekörkortet<br />
              <span style={{ color: O }}>på plats hos er</span>
            </h1>
            <p className="text-white/60 text-lg mb-6">
              Vi kommer till er förening och utbildar hela styrelsen på 3 timmar. Praktisk, interaktiv och skräddarsydd efter era behov.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: MapPin, text: 'Hos er — inga resor för er' },
                { icon: Clock,  text: '3 timmar' },
                { icon: Users,  text: 'Upp till 16 deltagare' },
                { icon: Award,  text: 'Kursbevis + PDF-material' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon size={14} style={{ color: O }} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      // Pris-banner
      <div style={{ background: O }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Pris</p>
              <p className="text-white font-black text-2xl">4 900 kr</p>
            </div>
            <p className="text-white/70 text-sm">per styrelse · exkl. moms · faktura 30 dagar</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('bokningsformular')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"
            style={{ background: C.white, color: O }}>
            Boka nu <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
 
      // Innehåll + formulär
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
 
          // Vänster — info
          <div className="lg:col-span-3 space-y-10">
 
            // Vad ingår
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Vad ingår?</h2>
              <div className="space-y-4">
                {[
                  { icon: '🎓', title: '3 timmars utbildning', desc: 'Interaktiv genomgång av alla viktiga ämnen — anpassad efter er förening och era frågor.' },
                  { icon: '📜', title: 'Digitalt kursbevis', desc: 'Alla deltagare får ett personligt kursbevis som intygar genomförd utbildning.' },
                  { icon: '📚', title: 'Kursmaterial som PDF', desc: 'Komplett kursmaterial att spara och återvända till — allt ni gick igenom och mer.' },
                  { icon: '❓', title: 'Fri frågestund', desc: 'Riktig tid för era specifika frågor — inget är för litet eller för stort.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border"
                    style={{ background: C.white, borderColor: C.border }}>
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ color: C.dark }}>{item.title}</p>
                      <p className="text-sm" style={{ color: C.mid }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            // Innehåll
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Vi går igenom</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Styrelsens roller och ansvar',
                  'Möten, kallelse och protokoll',
                  'Ekonomin och årsredovisningen',
                  'Juridiska grunderna i BRL',
                  'GDPR i föreningen',
                  'Föreningsstämman — rätt till rätt',
                  'Underhållsplanering',
                  'AI och smarta verktyg för styrelsen',
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${O}20` }}>
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: O }} />
                    </div>
                    <p className="text-sm" style={{ color: C.mid }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
 
            // Omdömen
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: C.dark }}>Vad säger andra styrelser?</h2>
              <div className="space-y-4">
                {[
                  { name: 'Maria L.', role: 'Ordförande BRF Kastanjen', text: 'Äntligen förstår hela styrelsen vad som gäller. Tomas förklarar på ett sätt som fastnar — och vi fick svar på frågor vi burit på i år.' },
                  { name: 'Anders K.', role: 'Kassör BRF Eken', text: 'Vi lärde oss mer på 3 timmar med Tomas än på 5 år i styrelsen. Hade vi haft den här utbildningen från början hade vi undvikit många misstag.' },
                  { name: 'Sofia B.', role: 'Sekreterare BRF Linden', text: 'Perfekt timing inför vår första stämma. Praktisk, tydlig och faktiskt rolig. Hela styrelsen var engagerad hela tiden.' },
                ].map((t, i) => (
                  <div key={i} className="rounded-2xl border p-5" style={{ background: C.white, borderColor: C.border }}>
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={O} color={O} />)}
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: C.mid }}>"{t.text}"</p>
                    <div>
                      <p className="text-sm font-bold" style={{ color: C.dark }}>{t.name}</p>
                      <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          // Höger — bokningsformulär
          <div className="lg:col-span-2">
            <div id="bokningsformular" className="sticky top-24 rounded-3xl border overflow-hidden shadow-xl"
              style={{ borderColor: C.border }}>
 
              // Header
              <div className="px-6 py-5" style={{ background: `linear-gradient(135deg, #171f32, #1e2d4a)` }}>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Boka utbildning</p>
                <p className="text-white font-black text-xl">Styrelsekörkortet på plats</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-white font-black text-3xl">4 900 kr</span>
                  <span className="text-white/50 text-sm">/styrelse · exkl. moms</span>
                </div>
              </div>
 
              // Formulär
              <div className="p-6 space-y-4" style={{ background: C.white }}>
                {[
                  { key: 'foreningNamn', label: 'Föreningens namn', type: 'text', placeholder: 'BRF Kastanjen' },
                  { key: 'kontaktNamn', label: 'Ditt namn', type: 'text', placeholder: 'Anna Andersson' },
                  { key: 'email', label: 'E-postadress', type: 'email', placeholder: 'anna@brfkastanjen.se' },
                  { key: 'telefon', label: 'Telefonnummer', type: 'tel', placeholder: '070-123 45 67' },
                  { key: 'ort', label: 'Ort', type: 'text', placeholder: 'Stockholm' },
                  { key: 'antal', label: 'Antal deltagare (ca)', type: 'number', placeholder: '5' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: C.dark }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => set(f.key, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-orange-400 transition-colors"
                      style={{ borderColor: C.border, background: C.bg, color: C.dark }}
                    />
                  </div>
                ))}
 
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: C.dark }}>
                    Önskade datum (ange 2–3 alternativ)
                  </label>
                  <div className="space-y-2">
                    {['datum1', 'datum2', 'datum3'].map((key, i) => (
                      <input key={key} type="date" value={form[key]} onChange={e => set(key, e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-orange-400 transition-colors"
                        style={{ borderColor: C.border, background: C.bg, color: C.dark }} />
                    ))}
                  </div>
                </div>
 
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: C.dark }}>
                    Önskemål eller frågor (valfritt)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Berätta gärna om ni har specifika ämnen ni vill fördjupa er i..."
                    value={form.meddelande}
                    onChange={e => set('meddelande', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    style={{ borderColor: C.border, background: C.bg, color: C.dark }}
                  />
                </div>
 
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-xl font-black text-white text-sm flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${O}, ${OD})`, boxShadow: `0 4px 16px ${O}35` }}>
                  Skicka bokningsförfrågan <ArrowRight size={15} />
                </motion.button>
 
                <p className="text-xs text-center" style={{ color: C.muted }}>
                  Vi återkommer inom 24 timmar · Ingen bindning innan ni bekräftar
                </p>
 
                // Kontaktinfo
                <div className="pt-2 border-t space-y-2" style={{ borderColor: C.border }}>
                  <p className="text-xs font-bold" style={{ color: C.dark }}>Föredrar du att ringa?</p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.mid }}>
                    <Phone size={12} style={{ color: O }} />
                    <a href="tel:+46000000000" className="hover:underline">070-XXX XX XX</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: C.mid }}>
                    <Mail size={12} style={{ color: O }} />
                    <a href="mailto:tomas@naringsklivet.se" className="hover:underline">tomas@naringsklivet.se</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}
*/

export const modulesData = [
  {
    id: 'styrelseroller',
    slug: 'styrelseroller',
    title: 'Lär känna din nya kollega i teamet',
    subtitle: 'Förstå rollerna i styrelsen – vem gör vad och varför det spelar roll',
    category: 'STYRELSEN',
    short_description: 'Lär dig om de olika rollerna i en bostadsrättsförenings styrelse.',
    long_description: 'Detaljerad genomgång av ordförande, vice ordförande, sekreterare, kassör och ledamöters ansvarsområden.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    duration: '2.5 timmar',
    lessons: 11,
    videoLessons: 2,
    quizzes: 2,
    rating: 5.0,
    students: 520,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    isTrial: true,
    previewVideoUrl: 'https://www.youtube.com/embed/NO-Lq3w94Tg',
    component: Module1Introduktion,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Ordförandens ansvar och uppgifter',
      'Vice ordförandens roll',
      'Sekreterarens dokumentationsansvar',
      'Kassörens ekonomiska ansvar',
      'Ledamotens grundläggande skyldigheter',
      'Hur styrelsen fattar beslut tillsammans',
    ],
    modules: [
      { title: 'Välkommen & Introduktion',      duration: '20 min', free: true  },
      { title: 'Ordförande – rollen och ansvaret', duration: '25 min', free: false },
      { title: 'Sekreterare – dokumentation',   duration: '20 min', free: false },
      { title: 'Kassör – ekonomi och kontroll', duration: '25 min', free: false },
      { title: 'Ledamot – ansvar och rättigheter', duration: '20 min', free: false },
      { title: 'Styrelsen som team',            duration: '20 min', free: false },
    ],
    forWho: [
      'Nya styrelseledamöter som vill förstå sin roll',
      'Ordföranden som vill stärka hela styrelsens kompetens',
      'Föreningar som vill säkerställa tydlig ansvarsfördelning',
      'Dig som funderar på att gå in i styrelsen',
    ],
    testimonials: [
      { name: 'Anna K.', role: 'Ordförande BRF Solen',
        text: 'Äntligen förstår hela styrelsen vem som ansvarar för vad.', rating: 5 },
      { name: 'Marcus L.', role: 'Kassör BRF Eken',
        text: 'Tydlig och pedagogisk genomgång. Rekommenderar varmt.', rating: 5 },
    ],
  },

  {
    id: 'fastigheten',
    slug: 'fastigheten',
    title: 'Fastigheten — översikt',
    subtitle: 'Välj ett av fyra kapitel: säkerhet, underhåll, energi eller drift.',
    category: 'FASTIGHET',
    type: 'bundle',
    duration: '60–90 min totalt',
    lessons: 25,
    videoLessons: 0,
    quizzes: 4,
    rating: 5.0,
    students: 0,
    price: 1490,
    priceTeam: 'Ingår i Styrelsekörkortet',
    isTrial: false,
    previewVideoUrl: null,
    image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1280',
    component: FastighetenOversikt,
    instructor: INSTRUCTOR,
    ...fastighetenData,
  },
 
  {
    id: 'fastigheten-sakerhet',
    slug: 'fastigheten-sakerhet',
    title: 'Fastigheten — Säkerhet',
    subtitle: 'Brandskydd, hissar, radon och legionella — lagstadgade krav som skyddar dina boende.',
    category: 'FASTIGHET',
    type: 'bundle',
    duration: '20–25 min',
    lessons: 7,
    videoLessons: 0,
    quizzes: 1,
    rating: 5.0,
    students: 0,
    price: 1490,
    priceTeam: 'Ingår i Styrelsekörkortet',
    isTrial: false,
    previewVideoUrl: null,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280',
    component: ModuleFastighetenSakerhet,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Vad SBA — systematiskt brandskyddsarbete — innebär i praktiken',
      'Hur ofta hissar måste besiktigas och vad som händer vid brister',
      'Gränsvärdet för radon och hur ni mäter rätt',
      'Legionellarisk i varmvattensystem och hur ni förebygger det',
    ],
    modules: [
      { title: 'Brandskydd & SBA',          duration: '5 min', free: true  },
      { title: '📋 Scenario: Brandinspektion', duration: '4 min', free: true  },
      { title: 'Hissar & taksäkerhet',       duration: '5 min', free: false },
      { title: '📋 Scenario: Hissbesiktning', duration: '4 min', free: false },
      { title: 'Radon & Legionella',         duration: '5 min', free: false },
      { title: '📋 Scenario: Radonmätning',  duration: '4 min', free: false },
      { title: '🧠 Quiz: Säkerhet',          duration: '5 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter med fastighetsansvar',
      'Ordföranden som ansvarar för säkerheten',
      'Alla ledamöter som vill förstå lagkraven',
    ],
    faq: [
      { question: 'Hur ofta ska hissar besiktigas?', answer: 'Vart 2:e år av ackrediterat organ. Styrelsen ansvarar för att boka besiktning i tid.' },
      { question: 'Vad är SBA?', answer: 'Systematiskt Brandskyddsarbete — ett kontinuerligt, dokumenterat arbete. Inte en engångshändelse.' },
      { question: 'Vad är gränsvärdet för radon?', answer: '200 Bq/m³ enligt Folkhälsomyndigheten. Rekommenderas starkt att mäta — särskilt hus från 1945–1985.' },
    ],
    testimonials: [],
  },
 
  {
    id: 'fastigheten-underhall',
    slug: 'fastigheten-underhall',
    title: 'Fastigheten — Underhåll & planering',
    subtitle: 'OVK, egenkontroll och underhållsplanering — systemen som håller fastigheten i skick.',
    category: 'FASTIGHET',
    type: 'bundle',
    duration: '20–25 min',
    lessons: 6,
    videoLessons: 0,
    quizzes: 1,
    rating: 5.0,
    students: 0,
    price: 1490,
    priceTeam: 'Ingår i Styrelsekörkortet',
    isTrial: false,
    previewVideoUrl: null,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280',
    component: ModuleFastighetenUnderhall,
    instructor: INSTRUCTOR,
    learningPoints: [
      'OVK — obligatorisk ventilationskontroll — intervaller och konsekvenser',
      'Föreningens egenkontroll — vad ska kontrolleras och hur ofta',
      'Vad som händer om ni missar en besiktning',
      'Ansvarsgränsen mellan förening och bostadsrättsinnehavare',
    ],
    modules: [
      { title: 'OVK — obligatorisk ventilationskontroll', duration: '5 min', free: true  },
      { title: '📋 Scenario: OVK-besiktning',             duration: '4 min', free: true  },
      { title: 'Egenkontroll',                            duration: '5 min', free: false },
      { title: '📋 Scenario: Golvbrunn läcker',           duration: '4 min', free: false },
      { title: '🧠 Quiz: Underhåll',                      duration: '5 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter med fastighetsansvar',
      'Ordföranden som planerar underhåll',
      'Alla som vill förstå föreningens underhållsskyldigheter',
    ],
    faq: [
      { question: 'Hur ofta måste OVK göras?', answer: 'FT/FTX-ventilation: vart 3:e år. S-ventilation: vart 6:e år. Nybyggda hus: inom 2 år från inflyttning.' },
      { question: 'Vad är egenkontroll?', answer: 'Föreningens eget system för att löpande kontrollera att fastigheten uppfyller krav. Ska dokumenteras.' },
      { question: 'Vad händer om vi missar OVK?', answer: 'Kommunen kan förelägga föreningen och ta ut sanktionsavgift. Vid allvarliga brister kan fastigheten förbjudas att brukas.' },
    ],
    testimonials: [],
  },
 
  {
    id: 'fastigheten-energi',
    slug: 'fastigheten-energi',
    title: 'Fastigheten — Energi & miljö',
    subtitle: 'Energideklaration, solceller och laddstolpar — hållbarhet och lagkrav i praktiken.',
    category: 'FASTIGHET',
    type: 'bundle',
    duration: '20–25 min',
    lessons: 6,
    videoLessons: 0,
    quizzes: 1,
    rating: 5.0,
    students: 0,
    price: 1490,
    priceTeam: 'Ingår i Styrelsekörkortet',
    isTrial: false,
    previewVideoUrl: null,
    image_url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1280',
    component: ModuleFastighetenEnergi,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Energideklarationens krav — obligatorisk vart 10:e år',
      'Vad som gäller för solceller och bygglov',
      'Bostadsrättsinnehavarens rätt att installera laddpunkt sedan 2022',
      'Hur styrelsen tar beslut om solceller på rätt sätt',
    ],
    modules: [
      { title: 'Energideklaration',              duration: '5 min', free: true  },
      { title: 'Solceller & laddstolpar',         duration: '5 min', free: true  },
      { title: '📋 Scenario: Solceller på taket', duration: '4 min', free: false },
      { title: '📋 Scenario: Laddstolpe-ansökan', duration: '4 min', free: false },
      { title: '🧠 Quiz: Energi & miljö',          duration: '5 min', free: false },
    ],
    forWho: [
      'Styrelser som planerar energiinvesteringar',
      'Ordföranden som hanterar laddstolpsansökningar',
      'Alla som vill förstå energilagstiftningen',
    ],
    faq: [
      { question: 'Måste vi ha en energideklaration?', answer: 'Ja — obligatorisk för flerbostadshus, uppdateras vart 10:e år. Ska finnas tillgänglig vid försäljning.' },
      { question: 'Behövs bygglov för solceller?', answer: 'Vanligtvis inte om de följer takets form och inte sticker ut mer än 20 cm. Kontrollera med kommunen.' },
      { question: 'Kan vi neka laddstolpsinstallation?', answer: 'Nej — sedan 2022 har boende lagstadgad rätt att installera laddpunkt. Styrelsen kan ange tekniska krav men inte neka utan sakliga skäl.' },
    ],
    testimonials: [],
  },

  {
  id: 'phishing-social-engineering',
  slug: 'phishing-social-engineering',
  title: 'Phishing & social engineering',
  subtitle: 'Känna igen och stoppa attacker innan det är för sent',
  category: 'SÄKERHET',
  type: 'bundle',
  duration: '25 min',
  lessons: 13,
  quizzes: 2,
  rating: 5.0,
  students: 0,
  price: 1490,
  short_description: 'Lär dig känna igen falska mejl, SMS och samtal — och vad du gör om du råkat klicka.',
  image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&q=80',
  component: ModulePhishing,
  instructor: INSTRUCTOR,
},

{
  id: 'nis2-iso27001',
  slug: 'nis2-iso27001',
  title: 'NIS2 & ISO 27001',
  subtitle: 'Vad EU:s cybersäkerhetsdirektiv betyder för dig',
  category: 'SÄKERHET',
  type: 'bundle',
  duration: '25 min',
  lessons: 15,
  quizzes: 3,
  rating: 5.0,
  students: 0,
  price: 1490,
  short_description: 'Lär dig vad NIS2 kräver av dig som medarbetare och hur ISO 27001 hänger ihop.',
  image_url: 'https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=1280&q=80',
  component: ModuleNIS2,
  instructor: INSTRUCTOR,
},
 
  {
    id: 'fastigheten-drift',
    slug: 'fastigheten-drift',
    title: 'Fastigheten — Praktisk drift',
    subtitle: 'Sopor, PCB, lekplatser och bygglov — vardagliga frågor med juridiska konsekvenser.',
    category: 'FASTIGHET',
    type: 'bundle',
    duration: '20–25 min',
    lessons: 6,
    videoLessons: 0,
    quizzes: 1,
    rating: 5.0,
    students: 0,
    price: 1490,
    priceTeam: 'Ingår i Styrelsekörkortet',
    isTrial: false,
    previewVideoUrl: null,
    image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1280',
    component: ModuleFastighetenDrift,
    instructor: INSTRUCTOR,
    learningPoints: [
      'PCB-inventering — vilka fastigheter berörs och vad krävs',
      'Lekplatsbesiktning — föreningens produktansvar',
      'När krävs bygglov och när inte',
      'Sophantering och källsorteringskrav 2024–2027',
    ],
    modules: [
      { title: 'Sophantering, snöröjning & PCB', duration: '6 min', free: true  },
      { title: 'Bygglov & tekniska krav',          duration: '6 min', free: false },
      { title: '📋 Scenario: Takpåbyggnad',        duration: '4 min', free: false },
      { title: '🧠 Quiz: Praktisk drift',           duration: '5 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter med driftsansvar',
      'Ordföranden som hanterar bygglovsärenden',
      'Alla som vill förstå föreningens miljöansvar',
    ],
    faq: [
      { question: 'Vad är PCB och är det ett problem?', answer: 'PCB är ett miljögift som förbjöds på 70-talet och kan finnas i fogmassor. Fastigheter byggda 1956–1973 kan behöva inventeras.' },
      { question: 'När krävs bygglov?', answer: 'Vid fasadändring, tillbyggnad eller ändrad användning. Underhåll som inte ändrar utseendet kräver normalt inte lov.' },
      { question: 'Vem ansvarar för lekplatsen?', answer: 'Föreningen ansvarar för alla lekplatser på föreningens mark. Besiktning minst en gång per år.' },
    ],
    testimonials: [],
  },

  {
  id: 'effektivare-moten',
  slug: 'effektivare-moten',
  title: 'Effektivare styrelsemöten',
  subtitle: 'Beslutsmässighet, protokoll, härskartekniker och AI-tips för BRF-styrelsen.',
  category: 'ADMINISTRATION',
  duration: '25–30 min',
  type: 'bundle', 
  price: 1490,
  image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280',
  component: ModuleMotesledning,
  ...motenData,
},

  {
  id: 'introduktion',
  slug: 'introduktion',
  title: 'Introduktion till Styrelsekörkortet',
  subtitle: 'Styrelsen, valbarhetsregler och aktuella lagändringar 2023–2027',
  category: 'GRUNDERNA',
  short_description: 'Kom igång rätt – lär dig vad styrelsen är, vem som får sitta i den och vilka lagar som ändrats.',
  long_description: 'Grundläggande introduktion till BRF-styrelsens uppdrag, sammansättning och valbarhetsregler, samt genomgång av de fyra viktigaste lagändringarna: rösträtt 2023, K3-övergången 2026, moms på el/vatten/parkering och miljökraven 2024–2027.',
  image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720',
  duration: '1.5 timmar',
  lessons: 8,
  videoLessons: 0,
  quizzes: 0,
  rating: 5.0,
  students: 0,
  type: 'bundle', 
  price: 1490,
  priceTeam: 'Volymrabatt från 2 licenser',
  isTrial: true,
  previewVideoUrl: null,
  component: null,
  instructor: INSTRUCTOR,
  learningPoints: [
    'Styrelsens uppdrag och sammansättning',
    'Vem som är valbar och vem som inte är det',
    'Rösträtten – en röst per lägenhet (2023)',
    'K2 → K3-övergången i redovisning (2026)',
    'Moms på el, vatten och parkering',
    'Obligatorisk matavfallssortering (2024)',
    'Fastighetsnära förpackningsinsamling (2027)',
  ],
  modules: [
    { title: 'Vad är styrelsen?',              duration: '15 min', free: true  },
    { title: 'Vem får sitta i styrelsen?',     duration: '15 min', free: true  },
    { title: 'Rösträtt – en röst per lägenhet', duration: '15 min', free: false },
    { title: 'K2 → K3-övergången',             duration: '20 min', free: false },
    { title: 'Moms på el, vatten & parkering', duration: '15 min', free: false },
    { title: 'Sopor och miljörum 2024–2027',   duration: '15 min', free: false },
    { title: 'Checklista & nästa steg',        duration: '10 min', free: false },
  ],
  forWho: [
    'Helt nya styrelseledamöter',
    'Föreningar som vill ha koll på aktuella lagkrav',
    'Ordföranden som vill uppdatera hela styrelsens kunskap',
  ],
  testimonials: [],
},

  {
    id: 'bostadsrattsforeningen',
    slug: 'bostadsrattsforeningen',
    title: 'Prompttekniker',
    subtitle: 'Förstå hur föreningen fungerar – från stadgar till beslut',
    category: 'Juridik',
    short_description: 'Lär dig allt om hur en bostadsrättsförening fungerar.',
    long_description: 'En komplett introduktion till bostadsrättsföreningen - vad den är, hur den styrs och vilka regler som gäller.',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1280&h=720',
    duration: '2 timmar',
    lessons: 8,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.9,
    students: 450,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
    component: Bostadsrattsforeningen,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Förstå vad en bostadsrättsförening är',
      'Lära dig om medlemskap och rättigheter',
      'Få kunskap om stadgar och regler',
      'Förstå föreningens ekonomi',
      'Skillnaden mot hyresrätt och äganderätt',
      'Stämma och styrelsebeslut',
    ],
    modules: [
      { title: 'Vad är en bostadsrättsförening?', duration: '20 min', free: true  },
      { title: 'Stadgar och regler',              duration: '25 min', free: false },
      { title: 'Medlemskap och rättigheter',      duration: '20 min', free: false },
      { title: 'Föreningens ekonomi',             duration: '25 min', free: false },
      { title: 'Föreningsstämman',                duration: '20 min', free: false },
    ],
    forWho: [
      'Nya bostadsrättsägare som vill förstå föreningen',
      'Styrelseledamöter som vill lära sig grunderna',
      'Dig som funderar på att köpa en bostadsrätt',
    ],
    testimonials: [
      { name: 'Sofia B.', role: 'Ny bostadsrättsägare',
        text: 'Äntligen förstår jag hur allt hänger ihop.', rating: 5 },
    ],
  },

  {
    id: 'gdpr-personuppgifter',
    slug: 'gdpr-personuppgifter',
    title: 'GDPR i föreningen',
    subtitle: 'Hantera personuppgifter rätt – skydda medlemmarna och föreningen',
    category: 'Juridik',
    short_description: 'Lär dig om GDPR och hur bostadsrättsföreningar ska hantera personuppgifter.',
    long_description: 'Komplett guide till GDPR-regler för bostadsrättsföreningar.',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&h=720',
    duration: '2 timmar',
    lessons: 9,
    videoLessons: 1,
    quizzes: 2,
    rating: 4.9,
    students: 420,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: Module3Gdpr,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Förstå GDPR och dataskyddsförordningen',
      'Hantera personuppgifter korrekt i föreningen',
      'Registerföring och dokumentation',
      'Medlemmars rättigheter enligt GDPR',
      'Kameraövervakning – vad är tillåtet?',
      'Privacy by Design i praktiken',
    ],
    modules: [
      { title: 'Introduktion till GDPR',   duration: '20 min', free: true  },
      { title: 'Personuppgifter i BRF',    duration: '25 min', free: false },
      { title: 'Rättsliga grunder',        duration: '20 min', free: false },
      { title: 'Kameraövervakning',        duration: '25 min', free: false },
      { title: 'Privacy by Design',        duration: '20 min', free: false },
      { title: 'Slutprov & certifikat',    duration: '15 min', free: false },
    ],
    forWho: [
      'Styrelseledamöter som hanterar medlemsregister',
      'Föreningar som vill undvika GDPR-böter',
      'Kassörer och sekreterare med tillgång till personuppgifter',
    ],
    testimonials: [
      { name: 'Erik S.', role: 'Kassör BRF Linden',
        text: 'Mycket tydlig genomgång av vad vi faktiskt måste göra.', rating: 5 },
    ],
  },

  

  {
  id:       'styrelsekorkortet-plats',
  slug:     'styrelsekorkortet-plats',
  type:     'live',
  category: 'GRUNDERNA',
  title:    'Styrelsekörkortet — på plats hos er',
  subtitle: 'Tomas kommer till er förening och utbildar hela styrelsen på 3 timmar.',
  short_description: 'Komplett styrelseutbildning på plats — praktisk, interaktiv och skräddarsydd.',
  image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
  duration: '3 timmar',
  price: 4900,
  priceTeam: 'Fast pris per styrelse · alla ledamöter ingår · exkl. moms',
  location: 'Hos er förening',
  maxParticipants: 16,
  component: null,
  rating: 5.0,
  students: 0,
  instructor: INSTRUCTOR,
  learningPoints: [
    'Styrelsens roller, ansvar och befogenheter',
    'Styrelsemöten — formalia, protokoll och beslut',
    'Ekonomin — läsa och förstå årsredovisningen',
    'Juridiska grunderna i bostadsrättslagen',
    'GDPR och personuppgiftshantering i föreningen',
    'Föreningsstämman — från kallelse till ansvarsfrihet',
    'Underhållsplanering och fastighetens skötsel',
    'AI och smarta verktyg för styrelsearbetet',
  ],
  forWho: [
    'Nyvalda BRF-styrelser som vill starta rätt',
    'Befintliga styrelser som vill fräscha upp kunskapen',
    'Föreningar inför en kommande föreningsstämma',
    'Styrelser som vill utbildas tillsammans på plats',
  ],
  modules: [
    { title: 'Block 1 — Styrelsen, roller och juridik',    duration: '60 min', free: true },
    { title: 'Block 2 — Ekonomi och underhållsplanering',  duration: '60 min', free: true },
    { title: 'Block 3 — Stämman, GDPR och smarta verktyg', duration: '60 min', free: true },
  ],
  testimonials: [
    { name: 'Maria L.', role: 'Ordförande BRF Kastanjen',
      text: 'Äntligen förstår hela styrelsen vad som gäller. Tomas förklarar på ett sätt som fastnar.', rating: 5 },
    { name: 'Anders K.', role: 'Kassör BRF Eken',
      text: 'Vi lärde oss mer på 3 timmar med Tomas än på 5 år i styrelsen.', rating: 5 },
  ],
  faq: [
    { question: 'Var hålls utbildningen?', answer: 'Vi kommer till er — i er föreningslokal eller var det passar er bäst. Inga resor för er.' },
    { question: 'Hur många kan delta?', answer: 'Priset gäller för upp till 16 deltagare. Fler deltagare? Kontakta oss för offert.' },
    { question: 'Vad ingår i priset?', answer: '3 timmars interaktiv utbildning, digitalt kursbevis till alla deltagare och komplett kursmaterial som PDF. Moms tillkommer.' },
    { question: 'Kan vi anpassa innehållet?', answer: 'Ja — vi kan lägga extra fokus på era specifika frågor och behov. Hör av er när ni bokar.' },
    { question: 'Hur lång framförhållning behövs?', answer: 'Vi rekommenderar minst 3 veckor. Kontakta oss så hittar vi ett datum som passar.' },
    { question: 'Vad händer om vi behöver avboka?', answer: 'Kostnadsfri avbokning upp till 7 dagar före. Därefter debiteras 50% av kursavgiften.' },
  ],
  pdfUrl: '/pdfs/styrelsekorkortet-plats-program.pdf',
},

  {
    id: 'diskrimineringslagen',
    slug: 'diskrimineringslagen',
    title: 'Diskrimineringslagen',
    subtitle: 'Förstå lagen och styrelsens ansvar för en rättvis förening',
    category: 'Juridik',
    short_description: 'Förstå diskrimineringslagen och hur den tillämpas i bostadsrättsföreningar.',
    long_description: 'Lär dig om de sju diskrimineringsgrunderna, direkt och indirekt diskriminering samt styrelsens ansvar.',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&h=720',
    duration: '2 timmar',
    lessons: 8,
    videoLessons: 1,
    quizzes: 2,
    rating: 4.8,
    students: 380,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: Module4Diskriminering,
    instructor: INSTRUCTOR,
    learningPoints: [
      'De sju diskrimineringsgrunderna',
      'Direkt vs indirekt diskriminering',
      'Trakasserier och sexuella trakasserier',
      'Styrelsens ansvar och åtgärder',
      'Hur ni förebygger diskriminering',
      'Vad händer vid en anmälan?',
    ],
    modules: [
      { title: 'Vad är diskriminering?',      duration: '20 min', free: true  },
      { title: 'De sju grunderna',            duration: '25 min', free: false },
      { title: 'Styrelsens skyldigheter',     duration: '20 min', free: false },
      { title: 'Förebyggande arbete',         duration: '20 min', free: false },
      { title: 'Slutprov',                    duration: '15 min', free: false },
    ],
    forWho: [
      'Alla styrelseledamöter',
      'Ordföranden som hanterar konflikter',
      'Föreningar som vill arbeta aktivt med inkludering',
    ],
    testimonials: [
      { name: 'Lena M.', role: 'Vice ordförande BRF Björken',
        text: 'Öppnade mina ögon för hur viktigt det här är.', rating: 5 },
    ],
  },

  {
  id: 'ai-brf-styrelsen',
  slug: 'ai-brf-styrelsen',
  title: 'AI för BRF-styrelsen',
  subtitle: 'Spara tid, fatta bättre beslut och känn dig trygg med AI',
  category: 'LEDARSKAP',
  short_description: 'Lär dig använda AI i styrelsearbetet – protokoll, kommunikation och beslutsunderlag.',
  long_description: 'Praktisk kurs i AI för BRF-styrelser. Inga förkunskaper krävs. Vi går igenom verktyg, promptteknik, protokollskrivning, kommunikation med medlemmar och hur AI kan hjälpa vid upphandling och juridiska frågor.',
  image_url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1280&h=720',
  duration: '3 timmar',
  lessons: 10,
  videoLessons: 0,
  quizzes: 1,
  rating: 5.0,
  students: 0,
  type: 'bundle', 
  price: 4500,
  priceTeam: 'Fast pris per styrelse – alla ledamöter ingår',
  isTrial: false,
  previewVideoUrl: null,
  component: Module5AiBrf,
  instructor: INSTRUCTOR,
  learningPoints: [
    'Vad AI är – och vad det inte är',
    'Spara tid med AI i styrelsearbetet',
    'Välj rätt verktyg: ChatGPT, Claude eller Copilot',
    'Lär dig prompta – få svar som faktiskt fungerar',
    'Protokoll på 10 minuter istället för en timme',
    'Kommunicera professionellt med dina medlemmar',
    'Ta fram bättre beslutsunderlag – snabbare',
    'AI som bollplank vid upphandling och juridik',
  ],
  modules: [
    { title: 'Vad är AI?',                    duration: '20 min', free: true  },
    { title: 'Spara tid med AI',              duration: '20 min', free: false },
    { title: 'Välj rätt verktyg',             duration: '20 min', free: false },
    { title: 'Lär dig prompta',               duration: '25 min', free: false },
    { title: 'Protokoll på 10 minuter',       duration: '20 min', free: false },
    { title: 'Kommunikation med medlemmar',   duration: '20 min', free: false },
    { title: 'Beslutsunderlag',               duration: '20 min', free: false },
    { title: 'Upphandling & juridik',         duration: '20 min', free: false },
    { title: 'Kunskapstest',                  duration: '15 min', free: false },
  ],
  forWho: [
    'BRF-styrelser som vill arbeta smartare',
    'Sekreterare som skriver protokoll',
    'Ordföranden som kommunicerar med medlemmar',
    'Kassörer som tar fram beslutsunderlag',
    'Alla som är nyfikna på AI men inte vet var man börjar',
  ],
  testimonials: [],
},

  {
    id: 'foreningens-principer',
    slug: 'foreningens-principer',
    title: 'Föreningens olika principer',
    subtitle: 'Demokrati, transparens och likställdhet – grunderna för en välskött förening',
    category: 'GRUNDERNA',
    short_description: 'Lär dig de grundläggande principerna för hur en förening ska drivas.',
    long_description: 'Genomgång av demokrati, likställdhet, transparens och andra viktiga principer för föreningsstyrning.',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&h=720',
    duration: '1.5 timmar',
    lessons: 7,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.7,
    students: 290,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Demokratiprincipen',
      'Likställdhet och rättvisa',
      'Transparens och öppenhet',
      'Medlemmarnas rättigheter',
    ],
    modules: [
      { title: 'Demokratiprincipen',      duration: '20 min', free: true  },
      { title: 'Likställdhet',            duration: '20 min', free: false },
      { title: 'Transparens',             duration: '20 min', free: false },
      { title: 'Medlemmarnas rättigheter', duration: '20 min', free: false },
    ],
    forWho: [
      'Nya styrelseledamöter',
      'Föreningar som vill stärka demokratin',
    ],
    testimonials: [],
  },

  {
    id: 'styrelsens-dokumentation',
    slug: 'styrelsens-dokumentation',
    title: 'Styrelsens dokumentation',
    subtitle: 'Protokoll, kallelser och arkivering – gör det rätt från start',
    category: 'ADMINISTRATION',
    short_description: 'Lär dig hur styrelsen dokumenterar möten och beslut korrekt.',
    long_description: 'Allt om protokoll, kallelser, beslutsunderlag och hur dokumentation ska arkiveras enligt lag.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    duration: '2 timmar',
    lessons: 9,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.9,
    students: 410,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: ModuleDokumentation, 
    instructor: INSTRUCTOR,
    learningPoints: [
      'Skriva korrekta protokoll',
      'Kallelser och dagordningar',
      'Arkivering och dokumenthantering',
      'Digitala verktyg för dokumentation',
    ],
    modules: [
      { title: 'Protokollets struktur',    duration: '20 min', free: true  },
      { title: 'Kallelser och dagordning', duration: '20 min', free: false },
      { title: 'Arkivering',              duration: '20 min', free: false },
      { title: 'Digitala verktyg',        duration: '20 min', free: false },
    ],
    forWho: [
      'Sekreterare i styrelsen',
      'Ordföranden som ansvarar för dokumentation',
    ],
    testimonials: [
      { name: 'Peter A.', role: 'Sekreterare BRF Kastanjen',
        text: 'Sparar mig massor av tid nu när jag vet hur det ska göras.', rating: 5 },
    ],
  },

  {
    id: 'foreningens-intressenter',
    slug: 'foreningens-intressenter',
    title: 'Föreningens intressenter',
    subtitle: 'Bygg bra relationer med medlemmar, myndigheter och leverantörer',
    category: 'KOMMUNIKATION',
    short_description: 'Förstå och hantera relationer med föreningens olika intressenter.',
    long_description: 'Lär dig om medlemmar, myndigheter, leverantörer och andra viktiga intressenter.',
    image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&h=720',
    duration: '1.5 timmar',
    lessons: 6,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.6,
    students: 320,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: ModuleIntressenter,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Identifiera viktiga intressenter',
      'Kommunikation med medlemmar',
      'Hantera myndighetskontakter',
      'Samarbete med leverantörer',
    ],
    modules: [
      { title: 'Vilka är intressenterna?',  duration: '20 min', free: true  },
      { title: 'Kommunikation med medlemmar', duration: '20 min', free: false },
      { title: 'Myndigheter och lag',       duration: '20 min', free: false },
      { title: 'Leverantörsrelationer',     duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som kommunicerar utåt',
      'Styrelseledamöter med kontaktansvar',
    ],
    testimonials: [],
  },

  {
    id: 'styrelsen',
    slug: 'styrelsen',
    title: 'Styrelsen',
    subtitle: 'Fördjupning i styrelsens arbete, ansvar och befogenheter',
    category: 'STYRELSEN',
    short_description: 'Fördjupning i styrelsens arbete, ansvar och befogenheter.',
    long_description: 'Omfattande kurs om styrelsens roll, arbetssätt, beslutsprocesser och juridiska ansvar.',
    image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&h=720',
    duration: '3 timmar',
    lessons: 12,
    videoLessons: 3,
    quizzes: 2,
    rating: 4.9,
    students: 480,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Styrelsens befogenheter och ansvar',
      'Beslutsprocesser och delegering',
      'Styrelsens juridiska ansvar',
      'Effektiva styrelsemöten',
    ],
    modules: [
      { title: 'Styrelsens roll',           duration: '25 min', free: true  },
      { title: 'Befogenheter och ansvar',   duration: '25 min', free: false },
      { title: 'Beslutsprocessen',          duration: '25 min', free: false },
      { title: 'Juridiskt ansvar',          duration: '25 min', free: false },
      { title: 'Effektiva möten',           duration: '25 min', free: false },
    ],
    forWho: [
      'Erfarna styrelseledamöter som vill fördjupa sig',
      'Ordföranden som vill förstå det juridiska ansvaret',
    ],
    testimonials: [],
  },

  {
  ...digitalSakerhetKurs.modules[0], // Lösenord
  slug: 'digital-sakerhet-losenord',
  component: null, // ModuleDigitalSakerhetLosenord när du importerat den
  type: 'bundle',
  category: 'SÄKERHET',
  image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
  instructor: INSTRUCTOR,
  price: 1490,
},

{
  id: 'digital-sakerhet',
  slug: 'digital-sakerhet',
  title: 'Digital säkerhet för alla',
  subtitle: 'Från lösenord och phishing till AI-hot och deepfakes',
  category: 'SÄKERHET',
  type: 'bundle',
  duration: '3 timmar',
  lessons: 13,
  quizzes: 3,
  rating: 5.0,
  students: 0,
  price: 1490,
  image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
  component: ModuleDigitalSakerhet,
  instructor: INSTRUCTOR,
},

  {
    id: 'konflikthantering',
    slug: 'konflikthantering',
    title: 'Konflikthantering',
    subtitle: 'Förebygg, identifiera och lös konflikter i föreningen professionellt',
    category: 'LEDARSKAP',
    short_description: 'Lär dig hantera och lösa konflikter i föreningen professionellt.',
    long_description: 'Praktiska verktyg och tekniker för att förebygga, identifiera och lösa konflikter.',
    image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1280&h=720',
    duration: '2 timmar',
    lessons: 8,
    videoLessons: 2,
    quizzes: 1,
    rating: 4.8,
    students: 350,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Identifiera konflikter tidigt',
      'Medlingsteknik och kommunikation',
      'Konfliktlösningsmodeller',
      'Förebyggande arbete',
    ],
    modules: [
      { title: 'Vad är en konflikt?',      duration: '20 min', free: true  },
      { title: 'Tidiga signaler',          duration: '20 min', free: false },
      { title: 'Medlingsteknik',           duration: '25 min', free: false },
      { title: 'Förebygga konflikter',     duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som hanterar konflikter',
      'Hela styrelsen för bättre samarbete',
    ],
    testimonials: [],
  },

  {
    id: 'arsredovisningen',
    slug: 'arsredovisningen',
    title: 'Årsredovisningen',
    subtitle: 'Läs och förstå föreningens årsredovisning – resultat, balans och nyckeltal',
    category: 'EKONOMI',
    short_description: 'Förstå och tolka bostadsrättsföreningens årsredovisning.',
    long_description: 'Lär dig läsa resultaträkning, balansräkning och förvaltningsberättelse.',
    image_url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1280&h=720',
    duration: '2.5 timmar',
    lessons: 10,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.7,
    students: 390,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: Module2Arsredovisning,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Läsa resultaträkningen',
      'Förstå balansräkningen',
      'Tolka nyckeltal',
      'Förvaltningsberättelsen',
      'Revisionsberättelsen',
      'Jämföra med tidigare år',
    ],
    modules: [
      { title: 'Årsredovisningens struktur', duration: '20 min', free: true  },
      { title: 'Resultaträkningen',          duration: '25 min', free: false },
      { title: 'Balansräkningen',            duration: '25 min', free: false },
      { title: 'Nyckeltal',                  duration: '20 min', free: false },
      { title: 'Förvaltningsberättelsen',    duration: '20 min', free: false },
    ],
    forWho: [
      'Kassörer och styrelseledamöter',
      'Alla som ska godkänna årsredovisningen på stämman',
    ],
    testimonials: [
      { name: 'Johan P.', role: 'Kassör BRF Almarna',
        text: 'Förstår äntligen vad alla siffror betyder.', rating: 5 },
    ],
  },

  {
    id: 'fatta-ratt-beslut',
    slug: 'fatta-ratt-beslut',
    title: 'Fatta rätt beslut',
    subtitle: 'Strukturerad beslutsfattning med rätt underlag och process',
    category: 'LEDARSKAP',
    short_description: 'Lär dig strukturerad beslutsfattande och beslutsunderlag.',
    long_description: 'Metoder och verktyg för att fatta välgrundade beslut i styrelsearbetet.',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&h=720',
    duration: '2 timmar',
    lessons: 7,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.8,
    students: 310,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Beslutsprocessen steg-för-steg',
      'Riskanalys och konsekvenser',
      'Beslutsunderlag och dokumentation',
      'Gruppbeslut vs individuella beslut',
    ],
    modules: [
      { title: 'Beslutsprocessen',         duration: '25 min', free: true  },
      { title: 'Riskanalys',               duration: '25 min', free: false },
      { title: 'Beslutsunderlag',          duration: '20 min', free: false },
      { title: 'Gruppdynamik',             duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som leder beslutsmöten',
      'Hela styrelsen för bättre beslut',
    ],
    testimonials: [],
  },

  {
    id: 'effektivt-styrelsearbete',
    slug: 'effektivt-styrelsearbete',
    title: 'Effektivt styrelsearbete',
    subtitle: 'Optimera möten, delegera rätt och få mer gjort på kortare tid',
    category: 'LEDARSKAP',
    short_description: 'Optimera styrelsens arbete för bättre resultat och effektivitet.',
    long_description: 'Praktiska tips och metoder för att göra styrelsearbetet mer effektivt och produktivt.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720',
    duration: '1.5 timmar',
    lessons: 6,
    videoLessons: 1,
    quizzes: 1,
    rating: 4.9,
    students: 440,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Effektiva styrelsemöten',
      'Tidsplanering och prioritering',
      'Delegering och uppföljning',
      'Digitala verktyg för styrelsen',
    ],
    modules: [
      { title: 'Effektiva möten',          duration: '20 min', free: true  },
      { title: 'Tidsplanering',            duration: '20 min', free: false },
      { title: 'Delegering',               duration: '20 min', free: false },
      { title: 'Digitala verktyg',         duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som vill effektivisera mötena',
      'Styrelseledamöter som vill bidra mer',
    ],
    testimonials: [],
  },

  
  {
  id: 'hallbarhet',
  slug: 'hallbarhet',
  title: 'Hållbarhet i föreningen',
  subtitle: 'Solceller, laddstolpar, energi och ROI – en grönare förening som lönar sig',
  category: 'FÖRVALTNING',
  short_description: 'Lär dig om hållbarhetsinvesteringar och hur ni räknar hem dem.',
  long_description: 'Solceller, laddstolpar, uppvärmning, energieffektivisering, vatten och avfall – med fokus på ROI och praktiska steg för styrelsen.',
  image_url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1280&h=720',
  duration: '2 timmar',
  lessons: 8,
  videoLessons: 0,
  quizzes: 0,
  rating: 5.0,
  students: 0,
  type: 'bundle', 
  price: 1490,
  priceTeam: 'Volymrabatt från 2 licenser',
  previewVideoUrl: null,
  component: ModuleHallbarhet,
  instructor: INSTRUCTOR,
  learningPoints: [
    'Solceller – ROI, skattereduktion och processen',
    'Laddstolpar – infrastruktur och finansiering',
    'Uppvärmning – bergvärme, värmepumpar och EPBD',
    'Energieffektivisering – LED, fönster och FTX',
    'Vatten och stambyte – relining och IMD',
    'Avfallskrav 2024 och 2027',
    'ROI-kalkyl och bidragsöversikt',
  ],
  modules: [
    { title: 'Solceller',             duration: '20 min', free: true  },
    { title: 'Laddstolpar',           duration: '20 min', free: false },
    { title: 'Uppvärmning',           duration: '20 min', free: false },
    { title: 'Energieffektivisering', duration: '15 min', free: false },
    { title: 'Vatten & avlopp',       duration: '15 min', free: false },
    { title: 'Avfall & miljö',        duration: '15 min', free: false },
    { title: 'ROI & Finansiering',    duration: '20 min', free: false },
  ],
  forWho: [
    'Styrelser som planerar energiinvesteringar',
    'Kassörer som ska räkna hem ett projekt',
    'Föreningar med gamla stammar eller otidsenlig uppvärmning',
  ],
  testimonials: [],
},

  {
    id: 'forhandlingsteknik-upphandling',
    slug: 'forhandlingsteknik-upphandling',
    title: 'Förhandlingsteknik & Upphandling',
    subtitle: 'Förhandla bättre och upphandla rätt – spara pengar och få bättre avtal',
    category: 'ADMINISTRATION',
    short_description: 'Lär dig professionell förhandlingsteknik och upphandlingsprocess.',
    long_description: 'Praktiska verktyg för framgångsrika förhandlingar och korrekt upphandling.',
    image_url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1280&h=720',
    duration: '2.5 timmar',
    lessons: 9,
    videoLessons: 2,
    quizzes: 2,
    rating: 4.9,
    students: 330,
    type: 'bundle', 
    price: 1490,
    priceTeam: 'Volymrabatt från 2 licenser',
    previewVideoUrl: null,
    component: null,
    instructor: INSTRUCTOR,
    learningPoints: [
      'Förhandlingsstrategier och taktik',
      'Upphandlingsprocessen',
      'Kontraktsförhandling',
      'Leverantörsutvärdering',
    ],
    modules: [
      { title: 'Förhandlingens grunder',   duration: '25 min', free: true  },
      { title: 'Förhandlingstaktik',       duration: '25 min', free: false },
      { title: 'Upphandlingsprocessen',    duration: '25 min', free: false },
      { title: 'Kontraktsförhandling',     duration: '25 min', free: false },
      { title: 'Leverantörsutvärdering',   duration: '20 min', free: false },
    ],
    forWho: [
      'Ordföranden som förhandlar med leverantörer',
      'Styrelseledamöter med inköpsansvar',
    ],
    testimonials: [],
  },
];

export const getModuleBySlug = (slug) => {
  return modulesData.find(module => module.slug === slug);
};

export const getModulesByCategory = (category) => {
  if (category === 'ALLA') return modulesData;
  return modulesData.filter(module => module.category === category);
};

export const categories = [
  'ALLA',
  'GRUNDERNA',
  'STYRELSEN',
  'JURIDIK',
  'ADMINISTRATION',
  'KOMMUNIKATION',
  'LEDARSKAP',
  'EKONOMI',
  'FÖRVALTNING'
];