import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, Award, Users, BookOpen, Shield, Zap, Printer } from 'lucide-react';

const stats = [
  { val: '1 450+', label: 'Utbildade ledamöter' },
  { val: '4.9/5', label: 'Genomsnittligt betyg' },
  { val: '14', label: 'Moduler' },
  { val: '98%', label: 'Rekommenderar kursen' },
];

const modules = [
  { n: 1,  title: 'Din roll i styrelsen',           cat: 'Juridik' },
  { n: 2,  title: 'Årsredovisningen',               cat: 'Ekonomi' },
  { n: 3,  title: 'Föreningsstämman',               cat: 'Juridik' },
  { n: 4,  title: 'Stadgar och lagar',              cat: 'Juridik' },
  { n: 5,  title: 'Styrelsearbetet i praktiken',    cat: 'Ledarskap' },
  { n: 6,  title: 'Ekonomi och budget',             cat: 'Ekonomi' },
  { n: 7,  title: 'Underhållsplanering',            cat: 'Teknik' },
  { n: 8,  title: 'Juridiskt ansvar',               cat: 'Juridik' },
  { n: 9,  title: 'Medlemmar och lägenheter',       cat: 'Juridik' },
  { n: 10, title: 'Revisorn och valberedningen',    cat: 'Ekonomi' },
  { n: 11, title: 'GDPR i föreningen',              cat: 'Juridik' },
  { n: 12, title: 'Diskrimineringslagstiftning',    cat: 'Juridik' },
  { n: 13, title: 'Brandskydd och teknisk förvaltning', cat: 'Teknik' },
  { n: 14, title: 'Slutprov och certifiering',      cat: 'Certifikat' },
];

const included = [
  '14 moduler inom ekonomi, juridik och teknisk förvaltning',
  'Videolektioner du tar i din egen takt',
  'Quiz efter varje modul för att befästa kunskapen',
  'Praktiska exempel från verkliga BRF-situationer',
  'Checklistor för stämmor och styrelsemöten',
  'Officiellt utbildningsdiplom vid godkänt slutprov',
  'Livstidsåtkomst – gå tillbaka när du behöver',
  'Uppdateras löpande när lagstiftning förändras',
];

const testimonials = [
  {
    name: 'Maria K.',
    role: 'Ordförande, BRF Solbacken',
    text: 'Äntligen en utbildning som passar oss som sitter i styrelsen på fritiden. Tydlig, relevant och rakt på sak.',
  },
  {
    name: 'Anders L.',
    role: 'Kassör, BRF Ekdungen',
    text: 'Jag kände mig trygg på nästa styrelsemöte direkt efter modul 2. Årsredovisningen är inte längre ett mysterium.',
  },
  {
    name: 'Eva S.',
    role: 'Sekreterare, BRF Linden',
    text: 'Kursen gav mig struktur och självförtroende. Modulen om GDPR var ovärderlig – vi hade missat mycket.',
  },
];

const catColors = {
  Juridik:    { bg: '#EEF2FF', text: '#4338CA' },
  Ekonomi:    { bg: '#FFF7ED', text: '#C2410C' },
  Teknik:     { bg: '#F0FDF4', text: '#15803D' },
  Ledarskap:  { bg: '#FDF4FF', text: '#9333EA' },
  Certifikat: { bg: '#FFF5F2', text: '#FF5421' },
};

const OmOssPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Print CSS ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-shadow { box-shadow: none !important; }
        }
        @page { margin: 1.5cm; }
      `}</style>

      <div className="min-h-screen bg-[#E9ECF1]">

        {/* ── Topbar (döljs vid print) ── */}
        <div className="no-print bg-[#171f32] text-white sticky top-0 z-40 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Tillbaka
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
            >
              <Printer size={15} /> Spara som PDF
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* ── HERO ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden print-shadow"
            style={{ background: 'linear-gradient(135deg, #171f32 0%, #1E2A45 60%, #2a1810 100%)' }}
          >
            <div className="px-8 sm:px-12 py-12 sm:py-16">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="Logotyp" className="w-12 h-12 object-contain" />
                <div className="text-2xl font-bold text-white">
                  <span style={{ color: '#FF5421' }}>Styrelse</span>körkortet
                </div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
                Bli tryggare i din<br />
                <span style={{ color: '#FF5421' }}>styrelseroll.</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-8">
                Sveriges mest effektiva utbildning för förtroendevalda i bostadsrättsföreningar – 
                på dina villkor, i din egen takt.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm border border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: '#FF5421' }}>{s.val}</div>
                    <div className="text-white/50 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── VARFÖR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 print-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                <Zap size={18} style={{ color: '#FF5421' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Varför Styrelsekörkortet finns</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Varje år väljs tusentals personer in i BRF-styrelser utan att ha fått en enda timmes utbildning 
                  för uppdraget. De förväntas förstå bostadsrättslagen, granska årsredovisningar, leda stämmor 
                  och fatta beslut som påverkar hundratals hushåll – ofta på sin fritid.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Det är bakgrunden till Styrelsekörkortet. Vi skapade en utbildning som är specifikt anpassad 
                  för den verklighet som förtroendevalda i bostadsrättsföreningar möter varje dag.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  'Ett felaktigt styrelsebeslut kan kosta föreningen tiotusentals kronor',
                  'De flesta styrelseledamöter saknar formell utbildning för uppdraget',
                  'Juridiska krav och lagstiftning förändras – det gäller att hålla sig uppdaterad',
                  'Trygg styrelse = välskött förening = nöjda medlemmar',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-orange-50 rounded-xl p-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#FF5421' }}>
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── VAD INGÅR ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 print-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                <BookOpen size={18} style={{ color: '#FF5421' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Vad ingår i kursen</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={17} className="flex-shrink-0 mt-0.5" style={{ color: '#FF5421' }} />
                  <span className="text-gray-600 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── MODULER ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 print-shadow print-break"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                <BookOpen size={18} style={{ color: '#FF5421' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Kursens 14 moduler</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {modules.map((m) => {
                const cat = catColors[m.cat] || catColors.Juridik;
                return (
                  <div key={m.n} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}>
                      {m.n}
                    </div>
                    <span className="text-gray-800 text-sm font-medium flex-1">{m.title}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cat.bg, color: cat.text }}>
                      {m.cat}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── OM GRUNDAREN ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-sm print-shadow"
            style={{ background: 'linear-gradient(135deg, #171f32, #1E2A45)' }}
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                  <Users size={18} style={{ color: '#FF5421' }} />
                </div>
                <h2 className="text-2xl font-bold text-white">Om grundaren</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-8 items-start">
                <div className="sm:col-span-1">
                  {/* Platshållare för bild */}
                  <div className="w-full aspect-square rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <p className="text-white/30 text-xs text-center px-4">[ Infoga grundarens foto ]</p>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-1">[ Grundarens namn ]</h3>
                  <p className="text-[#FF5421] text-sm font-semibold mb-4">Grundare, Styrelsekörkortet</p>
                  <p className="text-white/70 leading-relaxed mb-4 text-sm">
                    [ Skriv grundarens bakgrund här – t.ex. antal år i styrelsearbete, yrkesmässig bakgrund 
                    inom fastighetsbranschen eller juridik, varför kursen skapades. ]
                  </p>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Styrelsekörkortet grundades ur insikten att det saknades en tillgänglig, 
                    praktiskt inriktad utbildning för de hundratusentals förtroendevalda som varje dag 
                    gör ett ovärderligt arbete i sina föreningar.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── OMDÖMEN ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 print-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                <Star size={18} style={{ color: '#FF5421' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Vad deltagarna säger</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={13} className="text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── PRIS + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-sm print-shadow"
            style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
          >
            <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
                  <Award size={20} className="text-white" />
                  <span className="text-white font-bold text-sm uppercase tracking-wider">Officiellt certifikat vid godkänt slutprov</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Undviker du ett enda felaktigt beslut<br className="hidden sm:block" /> har kursen betalat sig mångfalt
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Gå med 1 450+ styrelseledamöter som redan tar sitt uppdrag på allvar.
                </p>
              </div>
              <div className="text-center shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <p className="text-white/60 text-sm line-through mb-1">Ord. pris 5 995 kr</p>
                <p className="text-4xl font-bold text-white mb-1">3 995 kr</p>
                <p className="text-white/70 text-xs mb-4">inkl. moms · livstidsåtkomst</p>
                <button
                  onClick={() => navigate('/purchase/styrelsekorkortet-grund')}
                  className="no-print px-6 py-3 rounded-xl font-bold text-sm bg-white transition-all hover:bg-gray-100"
                  style={{ color: '#FF5421' }}
                >
                  Kom igång idag →
                </button>
                <p className="no-print text-white/60 text-xs mt-2">styrelsekörkortet.se</p>
                <p className="hidden print:block text-white font-bold text-sm mt-2">styrelsekörkortet.se</p>
              </div>
            </div>
          </motion.div>

          {/* ── KONTAKT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 print-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FF54211A' }}>
                <Shield size={18} style={{ color: '#FF5421' }} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Kontakt</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Webbplats', val: 'styrelsekörkortet.se' },
                { label: 'E-post', val: '[ e-post ]' },
                { label: 'Telefon', val: '[ telefonnummer ]' },
              ].map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#FF5421' }}>{c.label}</p>
                  <p className="text-gray-800 font-semibold text-sm">{c.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default OmOssPage;