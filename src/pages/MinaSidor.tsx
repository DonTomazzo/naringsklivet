// src/pages/MinaSidor.tsx
// TeamMember-vy — bara kursåtkomst, framsteg och dokument
// Vid login styrs användaren hit via AuthCallback om roll === 'teammember'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, Circle, Download, Star, FileText,
  ChevronRight, Award, MessageSquare, LogOut, BookOpen,
  Search, X, Lock, Receipt, FolderOpen,
  LayoutDashboard, GraduationCap, Menu, ArrowRight
} from 'lucide-react';

const C = {
  orange: '#FF5421', orangeD: '#E04619', orangeL: '#FFF0EB',
  dark: '#1A1A1A', mid: '#4A4A4A', muted: '#8A8A8A',
  bg: '#FAFAF8', bgAlt: '#F4F2EE', bgCard: '#FFFFFF', border: '#E8E5E0',
};

// ── MOCK — ersätt med useSupabaseUser() senare ────────────
const USER = {
  name: 'Anna Lindström',
  email: 'anna@brf-solglansen.se',
  forening: 'BRF Solglänsen',
  roll: 'Ordförande',
  platform: 'styrelsekorkortet', // eller 'naringsklivet'
};

const PROGRESS = [
  { id: 'intro',      title: 'Välkommen & Introduktion',  icon: BookOpen,      completed: true  },
  { id: 'roller',     title: 'Styrelsens roller',          icon: BookOpen,      completed: true  },
  { id: 'gdpr',       title: 'GDPR & Dataskydd',           icon: FileText,      completed: false },
  { id: 'ekonomi',    title: 'Ekonomiansvar',              icon: FileText,      completed: false },
  { id: 'stamma',     title: 'Föreningsstämman',           icon: BookOpen,      completed: false },
  { id: 'underhall',  title: 'Underhåll & planering',      icon: BookOpen,      completed: false },
  { id: 'slutprov',   title: 'Slutprov & certifikat',      icon: GraduationCap, completed: false },
];

const DOCUMENTS = [
  { title: 'Mötesprotokoll – mall',             cat: 'Protokoll & stämma', size: '42 KB' },
  { title: 'Kallelse till styrelsemöte',         cat: 'Protokoll & stämma', size: '28 KB' },
  { title: 'GDPR-policy för BRF',               cat: 'GDPR',               size: '88 KB' },
  { title: 'Årsredovisning – checklista',        cat: 'Ekonomi',            size: '65 KB' },
  { title: 'Bostadsrättslagen – sammanfattning', cat: 'Juridik',            size: '75 KB' },
  { title: 'Välkomstbrev till ny medlem',        cat: 'Mallar',             size: '35 KB' },
];
const PDF_CATS = ['Alla', 'Protokoll & stämma', 'Ekonomi', 'GDPR', 'Juridik', 'Mallar'];

// ── Feedback modal ────────────────────────────────────────
const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }} onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <h3 className="font-bold text-base" style={{ color: C.dark }}>Lämna feedback</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <X size={15} style={{ color: C.muted }} />
          </button>
        </div>
        <div className="p-6">
          {!sent ? (
            <div className="space-y-5">
              <p className="text-sm" style={{ color: C.muted }}>Hur upplever du kursen hittills?</p>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                    <Star size={34} fill={(hovered||rating)>=s ? C.orange : 'transparent'}
                      color={(hovered||rating)>=s ? C.orange : C.border} />
                  </button>
                ))}
              </div>
              <textarea value={text} onChange={e => setText(e.target.value)}
                placeholder="Skriv gärna en kommentar..." rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none border-2"
                style={{ borderColor: C.border, color: C.dark }} />
              <button onClick={() => rating && setSent(true)} disabled={!rating}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm disabled:opacity-30"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                Skicka feedback
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: C.orangeL }}>
                <CheckCircle size={26} style={{ color: C.orange }} />
              </div>
              <h4 className="font-bold text-base mb-1" style={{ color: C.dark }}>Tack!</h4>
              <p className="text-sm mb-5" style={{ color: C.muted }}>Din feedback hjälper oss förbättra kursen.</p>
              <button onClick={onClose} className="px-8 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>Stäng</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── TABS ──────────────────────────────────────────────────
const OverviewTab = ({ onFeedback }: { onFeedback: () => void }) => {
  const completed = PROGRESS.filter(p => p.completed).length;
  const pct = Math.round((completed / PROGRESS.length) * 100);
  const allDone = completed === PROGRESS.length;
  const navigate = useNavigate();
  const next = PROGRESS.find(p => !p.completed);
  return (
    <div className="space-y-4">
      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: C.dark }}>
        <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=60"
          alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="relative z-10 px-6 py-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-xl text-white"
            style={{ background: C.orange }}>{USER.name[0]}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white">Hej, {USER.name.split(' ')[0]}!</h2>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {USER.forening} · {USER.roll}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-black text-white">{pct}%</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>genomfört</p>
          </div>
        </div>
        <div className="h-1.5 mx-6 mb-5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
        </div>
        <div className="grid grid-cols-3 mx-6 mb-5 rounded-xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          {[{ val: completed, label: 'Klara' }, { val: PROGRESS.length - completed, label: 'Kvar' }, { val: '365d', label: 'Åtkomst' }].map((s, i) => (
            <div key={i} className="px-4 py-3 text-center">
              <p className="text-lg font-black text-white">{s.val}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fortsätt */}
      {!allDone && next && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/modules')}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left"
          style={{ borderColor: C.orange, background: C.orangeL }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: C.orange }}>
            <BookOpen size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: C.dark }}>Fortsätt där du slutade</p>
            <p className="text-xs mt-0.5" style={{ color: C.muted }}>{next.title}</p>
          </div>
          <ArrowRight size={18} style={{ color: C.orange }} />
        </motion.button>
      )}

      {/* Certifikat */}
      <div className="rounded-2xl border-2 p-5 flex items-center gap-4"
        style={{ background: allDone ? C.orangeL : C.bgCard, borderColor: allDone ? C.orange + '40' : C.border }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: allDone ? C.orange : C.bgAlt }}>
          {allDone ? <Award size={22} className="text-white" /> : <Lock size={18} style={{ color: C.muted }} />}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm" style={{ color: allDone ? C.dark : C.muted }}>Styrelsekörkortet – Certifikat</p>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>{allDone ? 'Klar! Ladda ner ditt kursbevis.' : `${PROGRESS.length - completed} avsnitt kvar`}</p>
        </div>
        <button disabled={!allDone} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-30"
          style={{ background: allDone ? C.orange : C.bgAlt }}>
          <Download size={13} /> Ladda ner
        </button>
      </div>

      {/* Feedback */}
      <button onClick={onFeedback}
        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left group transition-all hover:border-orange-200 hover:bg-orange-50"
        style={{ background: C.bgCard, borderColor: C.border }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100"
          style={{ background: C.bgAlt }}>
          <MessageSquare size={17} className="group-hover:text-orange-500" style={{ color: C.muted }} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: C.dark }}>Lämna feedback</p>
          <p className="text-xs mt-0.5" style={{ color: C.muted }}>Hjälp oss göra kursen bättre</p>
        </div>
        <ChevronRight size={16} style={{ color: C.muted }} />
      </button>
    </div>
  );
};

const ProgressTab = () => {
  const completed = PROGRESS.filter(p => p.completed).length;
  const pct = Math.round((completed / PROGRESS.length) * 100);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: C.dark }}>
        <div className="flex-1">
          <p className="font-bold text-white mb-1">Kursframsteg</p>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-black text-white">{pct}%</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{completed}/{PROGRESS.length}</p>
        </div>
      </div>
      <div className="space-y-2">
        {PROGRESS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border"
              style={{ background: item.completed ? C.orangeL : C.bgCard, borderColor: item.completed ? C.orange + '30' : C.border }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: item.completed ? C.orange + '20' : C.bgAlt }}>
                <Icon size={15} style={{ color: item.completed ? C.orange : C.muted }} />
              </div>
              <p className="flex-1 font-semibold text-sm" style={{ color: item.completed ? C.dark : C.muted }}>{item.title}</p>
              {item.completed ? <CheckCircle size={16} style={{ color: C.orange }} /> : <Circle size={16} style={{ color: C.border }} />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const DokumentTab = () => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('Alla');
  const filtered = DOCUMENTS.filter(d =>
    (cat === 'Alla' || d.cat === cat) && (!query || d.title.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: C.muted }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Sök dokument..."
          className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm focus:outline-none"
          style={{ background: C.bgCard, borderColor: C.border, color: C.dark }} />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PDF_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={cat === c ? { background: C.orange, color: 'white' } : { background: C.bgAlt, color: C.mid, border: `1px solid ${C.border}` }}>
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((doc, i) => (
          <motion.a key={doc.title} href="#" download initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border group transition-all hover:border-orange-200 hover:bg-orange-50"
            style={{ background: C.bgCard, borderColor: C.border }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.orangeL }}>
              <FileText size={15} style={{ color: C.orange }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: C.dark }}>{doc.title}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>{doc.cat} · {doc.size}</p>
            </div>
            <Download size={14} className="flex-shrink-0 group-hover:text-orange-400" style={{ color: C.muted }} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// ── MAIN ──────────────────────────────────────────────────
const NAV = [
  { id: 'overview', label: 'Översikt',  icon: LayoutDashboard },
  { id: 'progress', label: 'Framsteg',  icon: CheckCircle },
  { id: 'dokument', label: 'Dokument',  icon: FolderOpen },
];

export default function MinaSidor() {
  const [tab, setTab] = useState('overview');
  const [showFeedback, setFeedback] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();

  const NavItem = ({ item }: { item: typeof NAV[0] }) => (
    <button onClick={() => { setTab(item.id); setMobileNav(false); }}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left"
      style={tab === item.id
        ? { background: C.orange, color: 'white' }
        : { color: C.mid }}>
      <item.icon size={16} />
      {item.label}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white" style={{ borderColor: C.border }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="font-bold text-sm" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs" style={{ color: C.muted }}>{USER.email}</span>
            <button onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-100"
              style={{ color: C.mid }}>
              <LogOut size={13} /> Logga ut
            </button>
          </div>
          <button className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: C.bgAlt }} onClick={() => setMobileNav(p => !p)}>
            <Menu size={17} style={{ color: C.dark }} />
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6 items-start">
        {/* Desktop sidebar */}
        <aside className="hidden sm:flex flex-col w-52 flex-shrink-0 sticky top-20">
          <div className="rounded-2xl border p-4 mb-3" style={{ background: C.bgCard, borderColor: C.border }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                style={{ background: C.orange }}>{USER.name[0]}</div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: C.dark }}>{USER.name}</p>
                <p className="text-xs truncate" style={{ color: C.muted }}>{USER.forening}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border p-2 space-y-0.5 mb-3" style={{ background: C.bgCard, borderColor: C.border }}>
            {NAV.map(item => <NavItem key={item.id} item={item} />)}
          </div>
          <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-xs px-4 py-2" style={{ color: C.muted }}>
            <LogOut size={13} /> Logga ut
          </button>
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileNav && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                onClick={() => setMobileNav(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-64 sm:hidden p-5 space-y-2"
                style={{ background: C.bgCard }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                    style={{ background: C.orange }}>{USER.name[0]}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.dark }}>{USER.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{USER.forening}</p>
                  </div>
                </div>
                {NAV.map(item => <NavItem key={item.id} item={item} />)}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <motion.div className="mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-xl font-bold" style={{ color: C.dark }}>
              {NAV.find(n => n.id === tab)?.label}
            </h1>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              {tab === 'overview' && <OverviewTab onFeedback={() => setFeedback(true)} />}
              {tab === 'progress' && <ProgressTab />}
              {tab === 'dokument' && <DokumentTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showFeedback && <FeedbackModal onClose={() => setFeedback(false)} />}
      </AnimatePresence>
    </div>
  );
}