// src/pages/NetflixPage2.tsx
// Styrelsekörkortet® — säljande kursbibliotekssida
// Stil: StyrelsekorkortetLanding (ljus, varm) + ModulesSection-modal + säljande sektioner

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Play, Lock, X, Clock,
  BookOpen, CheckCircle, ChevronRight, Star, Users,
  Shield, Award, ChevronDown, Zap, Quote
} from "lucide-react";
import { modulesData } from "../data/modules2";

// ── Design tokens ─────────────────────────────────────────
const C = {
  orange:  "#FF5421",
  orangeD: "#E04619",
  orangeL: "#FFF0EB",
  dark:    "#1A1A1A",
  mid:     "#4A4A4A",
  muted:   "#8A8A8A",
  bg:      "#FAFAF8",
  bgAlt:   "#F4F2EE",
  border:  "#E8E5E0",
  white:   "#FFFFFF",
  navy:    "#1e2d4a",
};

// ── Reveal helper ──────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 24, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════
const Nav = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="Styrelsekörkortet" className="w-8 h-8 object-contain" />
            <span className="font-bold text-base tracking-tight" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet<span style={{ color: C.orange }}>®</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[["Utbildningen", "#utbildningen"], ["Vad ingår", "#innehall"], ["Omdömen", "#omdomen"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={label} href={href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: C.mid }}>{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")}
              className="hidden md:block text-sm font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ color: C.dark, border: `1.5px solid ${C.border}` }}>
              Logga in
            </button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/purchase/styrelsekorkortet-grund")}
              className="text-sm font-bold px-4 py-2 rounded-lg text-white"
              style={{ background: C.orange }}>
              Kom igång
            </motion.button>
          </div>
        </div>
      </header>
    </>
  );
};

// ════════════════════════════════════════════════════════
// MODAL
// ════════════════════════════════════════════════════════
const KursModal = ({ modul, onClose }: { modul: any; onClose: () => void }) => {
  const navigate = useNavigate();
  if (!modul) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        {modul.image_url && (
          <div className="aspect-video overflow-hidden rounded-t-2xl relative">
            <img src={modul.image_url} alt={modul.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {modul.category && (
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: C.orange }}>{modul.category}</span>
              )}
              {modul.isTrial && (
                <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ color: C.orange, borderColor: C.orange }}>Prova gratis</span>
              )}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-shrink-0 ml-2 transition-colors">
              <X size={16} className="text-gray-600" />
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mb-2 leading-snug" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>{modul.title}</h2>
          {modul.subtitle && <p className="text-sm mb-4" style={{ color: C.muted }}>{modul.subtitle}</p>}
          <div className="flex flex-wrap gap-4 mb-5 text-sm" style={{ color: C.mid }}>
            {modul.duration && <div className="flex items-center gap-1.5"><Clock size={13} style={{ color: C.orange }} /><span>{modul.duration}</span></div>}
            {modul.lessons && <div className="flex items-center gap-1.5"><BookOpen size={13} style={{ color: C.orange }} /><span>{modul.lessons} avsnitt</span></div>}
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: C.mid }}>{modul.short_description || "Mer information om denna modul kommer snart."}</p>
          {modul.learningPoints && modul.learningPoints.length > 0 && (
            <div className="mb-6 rounded-xl p-4" style={{ background: C.bgAlt }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Vad du lär dig</p>
              <ul className="space-y-2">
                {modul.learningPoints.slice(0, 4).map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.dark }}>
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: C.orange }} />{p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {modul.component ? (
            <Link to={`/module/${modul.slug}`}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
              <Play size={16} /> Starta kursen
            </Link>
          ) : (
            <div className="w-full py-4 rounded-xl font-bold text-center border-2 flex items-center justify-center gap-2" style={{ color: C.muted, borderColor: C.border }}>
              <Lock size={16} /> Lanseras snart
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-28 pb-0 overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.orangeL} 0%, transparent 70%)`, transform: "translate(30%, -20%)" }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{ background: C.orangeL, color: C.orange }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.orange }} />
          Certifieringsutbildning för BRF-styrelser
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
            <h1 className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-8"
              style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Bli tryggare<br /><span style={{ color: C.orange }}>i din styrelseroll</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-lg" style={{ color: C.mid }}>
              Praktisk utbildning för förtroendevalda i bostadsrättsföreningar. Juridik, ekonomi och mötesteknik — i din egen takt, med certifikat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/purchase/styrelsekorkortet-grund")}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base text-white"
                style={{ background: C.orange, boxShadow: `0 8px 32px ${C.orange}40` }}>
                Kom igång <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("utbildningen")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base"
                style={{ color: C.dark, border: `2px solid ${C.border}`, background: C.white }}>
                Se utbildningen
              </motion.button>
            </div>
            {/* Sociala bevis */}
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: C.muted }}>
              {[["500+", "utbildade styrelser"], ["4,8/5", "i genomsnittligt betyg"], ["14", "moduler"]].map(([val, label]) => (
                <div key={label}>
                  <span className="font-black text-lg" style={{ color: C.dark }}>{val}</span>
                  <span className="ml-1">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.25 }}
            className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img src="/founder3.png" alt="Tomas Mauritzson" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl border" style={{ borderColor: C.border }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>Styrelsekörkortet®</p>
              <p className="text-sm font-bold" style={{ color: C.dark }}>Grundat 2024</p>
            </div>
          </motion.div>
        </div>
        {/* Hero-bild */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.36 }}
          className="mt-20 rounded-t-3xl overflow-hidden relative"
          style={{ height: "380px", marginLeft: "-1.25rem", marginRight: "-1.25rem" }}>
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1600&q=85"
            alt="Styrelsemöte" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.dark}55 0%, transparent 50%)` }} />
          <div className="absolute bottom-6 left-6 sm:left-10 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.orange }} />
            <span className="text-sm font-bold" style={{ color: C.dark }}>
              Nästa styrelseseminarium: <span style={{ color: C.orange }}>maj 2026</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// FORTROENDE-BAND
// ════════════════════════════════════════════════════════
const FortroendeBand = () => (
  <section className="py-12 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-center mb-8" style={{ color: C.muted }}>
        Utbildar styrelser i hela Sverige
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[["14", "Moduler"], ["500+", "Utbildade styrelser"], ["8 000+", "Genomförda kurser"], ["4,8/5", "Genomsnittligt omdöme"]].map(([val, label], i) => (
          <div key={i} className="text-center">
            <p className="text-3xl sm:text-4xl font-black mb-1" style={{ color: C.orange, fontFamily: "'Nunito', sans-serif" }}>{val}</p>
            <p className="text-xs sm:text-sm font-semibold" style={{ color: C.mid }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ════════════════════════════════════════════════════════
// VAD INGÅR — modulkort med modal
// ════════════════════════════════════════════════════════
const KATEGORIER = [
  { id: "alla", label: "Alla", color: C.orange },
  { id: "GRUNDERNA", label: "Grunderna", color: "#6366F1" },
  { id: "STYRELSEN", label: "Styrelsen", color: "#10B981" },
  { id: "JURIDIK", label: "Juridik", color: "#F59E0B" },
  { id: "EKONOMI", label: "Ekonomi", color: "#EC4899" },
  { id: "ADMINISTRATION", label: "Administration", color: "#8B5CF6" },
  { id: "FASTIGHET", label: "Fastigheten", color: "#EF4444" },
  { id: "LEDARSKAP", label: "Ledarskap", color: "#14B8A6" },
];

const ModulKort = ({ modul, index, onOpen }: { modul: any; index: number; onOpen: () => void }) => {
  const hasContent = !!modul.component;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className="rounded-2xl overflow-hidden border cursor-pointer group"
      style={{ borderColor: C.border, background: C.white, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="relative overflow-hidden" style={{ height: 148 }}>
        <img src={modul.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"}
          alt={modul.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, transparent 55%)" }} />
        {modul.isTrial && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: C.orange }}>Gratis</div>
        )}
        {!hasContent && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
            <Lock size={11} color="rgba(255,255,255,0.6)" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-black text-sm leading-snug mb-1" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>{modul.title}</h3>
        <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: C.muted }}>{modul.short_description}</p>
        <div className="flex items-center justify-between">
          {modul.duration && <span className="text-xs" style={{ color: C.muted }}>{modul.duration}</span>}
          <div className="flex items-center gap-1 text-xs font-bold" style={{ color: hasContent ? C.orange : C.muted }}>
            {hasContent ? <><Play size={10} className="fill-current" /> Tillgänglig</> : "Snart"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Innehall = ({ onOpenModul }: { onOpenModul: (m: any) => void }) => {
  const [aktivKat, setAktivKat] = useState("alla");
  const [visaAlla, setVisaAlla] = useState(false);

  const filtrade = aktivKat === "alla"
    ? modulesData
    : modulesData.filter((m: any) => (m.category || "").toUpperCase() === aktivKat.toUpperCase());

  const visade = visaAlla ? filtrade : filtrade.slice(0, 6);

  return (
    <section id="innehall" className="py-20 sm:py-28" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.orange }}>Kursinnehåll</p>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
                {modulesData.length} moduler.<br />Ett certifikat.
              </h2>
            </div>
          </Reveal>
        </div>
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {KATEGORIER.map(k => {
            const antal = k.id === "alla" ? modulesData.length : modulesData.filter((m: any) => (m.category || "").toUpperCase() === k.id).length;
            if (antal === 0 && k.id !== "alla") return null;
            return (
              <button key={k.id} onClick={() => { setAktivKat(k.id); setVisaAlla(false); }}
                className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: aktivKat === k.id ? k.color : C.bgAlt,
                  color: aktivKat === k.id ? "white" : C.mid,
                  border: `1px solid ${aktivKat === k.id ? k.color : C.border}`,
                }}>
                {k.label} <span className="opacity-60 ml-1">({antal})</span>
              </button>
            );
          })}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visade.map((m: any, i: number) => (
              <ModulKort key={m.id} modul={m} index={i} onOpen={() => onOpenModul(m)} />
            ))}
          </AnimatePresence>
        </div>
        {/* Visa fler */}
        {filtrade.length > 6 && (
          <div className="mt-8 flex justify-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setVisaAlla(v => !v)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 transition-all"
              style={{ borderColor: C.orange, color: C.orange, background: C.white }}>
              {visaAlla ? "Visa färre" : `Se alla ${filtrade.length} moduler`} <ChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// METODIK
// ════════════════════════════════════════════════════════
const Metodik = () => (
  <section id="utbildningen" className="py-20 sm:py-28 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Vår metodik</p>
          <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            Från osäker till<br />trygg ledamot —<br /><span style={{ color: C.orange }}>på några veckor.</span>
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: C.mid }}>
            Vi bygger utbildning som utgår från er faktiska situation. Inga onödiga juridiska floskler — bara det ni behöver för att fatta rätt beslut.
          </p>
          <div className="space-y-3">
            {[
              ["01", "Förstå", "Vad er styrelses faktiska ansvar innebär"],
              ["02", "Lär", "Moduler om juridik, ekonomi och mötesteknik"],
              ["03", "Tillämpa", "Ni testar direkt på era egna beslut"],
              ["04", "Förankra", "Delas i styrelsen för gemensam grund"],
            ].map(([nr, titel, desc]) => (
              <div key={nr} className="flex items-center gap-4 py-4 border-b" style={{ borderColor: C.border }}>
                <span className="text-2xl font-black flex-shrink-0 w-8" style={{ color: `${C.orange}50` }}>{nr}</span>
                <div>
                  <span className="font-bold" style={{ color: C.dark }}>{titel}</span>
                  <span className="ml-2 text-sm" style={{ color: C.muted }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-48 h-48 rounded-3xl -z-10" style={{ background: C.orangeL }} />
            <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85"
                alt="Metodik" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 shadow-xl" style={{ background: C.white, border: `1px solid ${C.border}` }}>
              <p className="text-3xl font-black" style={{ color: C.orange, fontFamily: "'Nunito', sans-serif" }}>Från dag ett</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: C.muted }}>Konkreta verktyg direkt</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ════════════════════════════════════════════════════════
// VAD INGÅR (fördelar)
// ════════════════════════════════════════════════════════
const Fordelar = () => (
  <section className="py-20 sm:py-28" style={{ background: C.white }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <Reveal className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Vad du får</p>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
          Allt du behöver — ingenting du inte behöver.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { ikon: "🎓", titel: "14 interaktiva moduler", desc: "Juridik, ekonomi, fastighet och ledarskap. Välj din egen ordning och takt." },
          { ikon: "🎯", titel: "Scenarios från verkligheten", desc: "Träna på riktiga situationer — andrahandsuthyrning, OVK, jäv och stämman." },
          { ikon: "🧠", titel: "Quiz efter varje modul", desc: "Testa att kunskapen fastnat innan du går vidare. Repetition som fungerar." },
          { ikon: "🏆", titel: "Certifikat vid godkänt", desc: "Digitalt kursbevis för varje modul och ett samlat Styrelsekörkortet®-diplom." },
          { ikon: "💬", titel: "AI-chattbot i kursen", desc: "Ställ frågor direkt i kursen och få svar baserade på BRF-lagstiftning." },
          { ikon: "♾️", titel: "24 månaders tillgång", desc: "Nya ledamöter som väljs in kan också ta kursen — utan extra kostnad." },
        ].map((f, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <div className="rounded-2xl p-6 border h-full" style={{ borderColor: C.border, background: C.bgAlt }}>
              <div className="text-3xl mb-4">{f.ikon}</div>
              <h3 className="font-black text-lg mb-2" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>{f.titel}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.mid }}>{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ════════════════════════════════════════════════════════
// TESTIMONIALS
// ════════════════════════════════════════════════════════
const TESTIMONIALS = [
  { name: "Maja Lindström", roll: "Ordförande, BRF Lönnen", text: "Äntligen en utbildning som förklarar vad vi faktiskt ansvarar för — utan att göra oss livrädda. Hela styrelsen har gått den.", resultat: "Hela styrelsen utbildad" },
  { name: "Erik Johansson", roll: "Kassör, BRF Ekbacken", text: "Vi undvek en stor ekonomisk miss på vårt första årsbokslut efter kursen. Den betalade sig själv direkt.", resultat: "Rätt på första bokslutet" },
  { name: "Sara Nilsson", roll: "Sekreterare, BRF Kastanjen", text: "Jag var nervös över att bli invald utan erfarenhet. Nu vet jag vad som förväntas av mig — och vad som inte gör det.", resultat: "Trygg i rollen från dag ett" },
];

const Omdomen = () => {
  const [aktiv, setAktiv] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAktiv(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[aktiv];

  return (
    <section id="omdomen" className="py-20 sm:py-28 border-y" style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>Omdömen</p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-10" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
              Röster från<br />styrelserummet.
            </h2>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setAktiv(i)}
                  className="rounded-full transition-all"
                  style={{ width: aktiv === i ? 28 : 10, height: 10, background: aktiv === i ? C.orange : C.border }} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div key={aktiv}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                className="rounded-3xl p-8 sm:p-10"
                style={{ background: C.white, border: `1px solid ${C.border}` }}>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: C.orangeL, color: C.orange }}>
                  ✓ {t.resultat}
                </div>
                <div className="mb-6">
                  <Quote size={24} style={{ color: C.orange, opacity: 0.4 }} />
                </div>
                <blockquote className="text-xl sm:text-2xl font-semibold leading-snug mb-8" style={{ color: C.dark }}>
                  {t.text}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: C.orange }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{t.roll}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════
const FAQS = [
  { q: "Passar utbildningen även små föreningar?", a: "Absolut. Kursen är lika relevant för en styrelse med 10 lägenheter som för en med 200. Ansvaret och ramverket är detsamma — bara skalan skiljer." },
  { q: "Behöver hela styrelsen gå kursen?", a: "Vi rekommenderar att minst ordförande och kassör går den, men hela styrelsen får mest värde. Ni får en gemensam grund och undviker missförstånd om roller och ansvar." },
  { q: "Kan fakturan skickas till föreningen?", a: "Ja. Vi fakturerar direkt till bostadsrättsföreningen med 30 dagars netto. Ni kan betala med organisationsnummer utan kreditkort." },
  { q: "Hur länge har vi tillgång till materialet?", a: "Ni har tillgång i 24 månader från köpdatum. Det innebär att nya ledamöter som väljs in under mandatperioden också kan gå kursen utan extra kostnad." },
  { q: "Är kursen uppdaterad med senaste lagändringarna?", a: "Ja. Vi uppdaterar innehållet löpande när bostadsrättslagen eller andra relevanta lagar ändras. Ni får alltid senaste versionen." },
  { q: "Vad gäller om vi inte är nöjda?", a: "30 dagars pengarna tillbaka-garanti. Är ni inte nöjda returnerar vi hela beloppet utan frågor." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 sm:py-28 border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.orange }}>FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: C.dark, fontFamily: "'Nunito', sans-serif" }}>
            Vanliga frågor.
          </h2>
        </Reveal>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border, background: C.white }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-bold text-base" style={{ color: C.dark }}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: open === i ? C.orange : C.bgAlt }}>
                    <span className="text-lg font-black leading-none" style={{ color: open === i ? C.white : C.muted }}>+</span>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: C.mid }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// CTA BANNER
// ════════════════════════════════════════════════════════
const CTABanner = () => {
  const navigate = useNavigate();
  return (
    <section className="py-4 px-4 sm:px-8" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="rounded-3xl px-8 sm:px-14 py-14 sm:py-20 relative overflow-hidden" style={{ background: C.orange }}>
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Redo att ta klivet?</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Trygga styrelsens<br />arbete idag.
                </h2>
                <p className="text-white/70 mt-3 max-w-md text-sm leading-relaxed">
                  Börja med den första modulen gratis. Ingen bindning, ingen kreditkortsuppgift.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/purchase/styrelsekorkortet-grund")}
                  className="px-8 py-4 rounded-2xl font-bold text-base" style={{ background: C.white, color: C.orange }}>
                  Kom igång →
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/seminarier")}
                  className="px-8 py-4 rounded-2xl font-bold text-base text-white"
                  style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  Boka seminarium
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="py-12 mt-4 border-t" style={{ background: C.bgAlt, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Styrelsekörkortet" className="w-8 h-8 object-contain" />
              <span className="font-bold" style={{ color: C.dark }}>
                <span style={{ color: C.orange }}>Styrelse</span>körkortet<span style={{ color: C.orange }}>®</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Praktisk styrelseutbildning för BRF.<br />Malmö / Lund — online & på plats.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Utbildningar</p>
            <div className="space-y-2">
              {["Onlinekurser", "Seminarier", "Coaching", "Certifiering"].map(l => (
                <button key={l} className="block text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>Företaget</p>
            <div className="space-y-2">
              {[["Om oss", "/om-oss"], ["Seminarier", "/seminarier"], ["Kontakt", "/om-oss"]].map(([l, p]) => (
                <button key={l} onClick={() => navigate(p)} className="block text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: C.dark }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t" style={{ borderColor: C.border }}>
          <p className="text-xs" style={{ color: C.muted }}>© 2026 Styrelsekörkortet®. Alla rättigheter förbehållna.</p>
          <div className="flex gap-5">
            {["Integritetspolicy", "Villkor"].map(l => (
              <button key={l} className="text-xs hover:opacity-80 transition-opacity" style={{ color: C.muted }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ════════════════════════════════════════════════════════
// HUVUD-KOMPONENT
// ════════════════════════════════════════════════════════
export default function NetflixPage2() {
  const [valtModul, setValtModul] = useState<any>(null);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg }}>
      <Nav />
      <Hero />
      <FortroendeBand />
      <Metodik />
      <Innehall onOpenModul={setValtModul} />
      <Fordelar />
      <Omdomen />
      <FAQ />
      <CTABanner />
      <Footer />
      <AnimatePresence>
        {valtModul && <KursModal modul={valtModul} onClose={() => setValtModul(null)} />}
      </AnimatePresence>
    </div>
  );
}