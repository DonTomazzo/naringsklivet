import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Building2, CheckCircle, Circle, Download, Star,
  FileText, ChevronRight, Award, MessageSquare, LogOut,
  BookOpen, Zap, HelpCircle, Target, X, Send, Lock
} from 'lucide-react';

// ─── MOCK DATA (ersätt med Supabase auth/data) ───────────────────────────────
const MOCK_USER = {
  name: 'Anna Lindström',
  email: 'anna@brf-solglansen.se',
  avatar: null,
  forening: 'BRF Solglänsen',
  roll: 'Ordförande',
  joinedDate: '2025-01-15',
  faktura: {
    referens: 'INV-2025-0042',
    belopp: '3 995 kr',
    datum: '2025-01-15',
    status: 'Betald',
    org: '559123-4567',
    adress: 'Storgatan 12, 211 45 Malmö',
  },
  totalPoang: 400,
  maxPoang: 500,
};

const MOCK_PROGRESS = [
  { id: 'intro',            title: 'Välkommen & Introduktion', icon: BookOpen, completed: true,  points: 0   },
  { id: 'ai-idag',          title: 'Styrelsens roller',        icon: Zap,      completed: true,  points: 100 },
  { id: 'ordforande',       title: 'Ordförande',               icon: Target,   completed: true,  points: 100 },
  { id: 'quiz-grundroller', title: 'Quiz: Grundroller',        icon: HelpCircle, completed: true, points: 200 },
  { id: 'gdpr',             title: 'GDPR & Dataskydd',         icon: FileText, completed: false, points: 150 },
  { id: 'ekonomi',          title: 'Ekonomiansvar',            icon: FileText, completed: false, points: 150 },
];

const MOCK_DOCUMENTS = [
  { title: 'Mötesprotokoll – mall',        size: '42 KB',  url: '/pdf/motesprotokoll.pdf' },
  { title: 'Kallelse till styrelsemöte',   size: '28 KB',  url: '/pdf/kallelse.pdf' },
  { title: 'Årsredovisning – checklista',  size: '65 KB',  url: '/pdf/arsredovisning.pdf' },
  { title: 'GDPR-policy för BRF',          size: '88 KB',  url: '/pdf/gdpr-policy.pdf' },
  { title: 'Budget – mall',                size: '120 KB', url: '/pdf/budget.pdf' },
  { title: 'Välkomstbrev till ny medlem',  size: '35 KB',  url: '/pdf/valkombrev.pdf' },
];

// ─── GavelIcon ────────────────────────────────────────────────────────────────
const GavelIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 6L18 10L10 18L6 14L14 6Z" fill={color} opacity="0.9" />
    <path d="M14 6L18 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 20L8 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="15" y="2" width="5" height="7" rx="1.5" transform="rotate(45 15 2)" fill={color} />
  </svg>
);

// ─── TabButton ────────────────────────────────────────────────────────────────
const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
      active
        ? 'bg-[#FF5421] text-white shadow-lg shadow-[#FF5421]/25'
        : 'text-white/50 hover:text-white hover:bg-white/8'
    }`}
  >
    <Icon size={15} />
    {label}
  </button>
);

// ─── Card wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/8 backdrop-blur-md p-5 sm:p-6 ${className}`}>
    {children}
  </div>
);

// ─── FeedbackModal ────────────────────────────────────────────────────────────
const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!rating) return;
    // TODO: skicka till Supabase
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#1a2235] border border-white/10 rounded-2xl w-full max-w-md p-6 sm:p-8"
      >
        {!sent ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Lämna feedback</h3>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <p className="text-white/50 text-sm mb-5">Hur upplever du kursen hittills?</p>

            {/* Stjärnor */}
            <div className="flex justify-center gap-2 mb-6">
              {[1,2,3,4,5].map(s => (
                <button
                  key={s}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(s)}
                >
                  <Star
                    size={36}
                    className="transition-all"
                    fill={(hovered || rating) >= s ? '#FF5421' : 'transparent'}
                    color={(hovered || rating) >= s ? '#FF5421' : 'rgba(255,255,255,0.2)'}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Skriv gärna en kommentar (valfritt)..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 text-sm resize-none outline-none focus:border-[#FF5421]/50 transition-colors"
            />

            <button
              onClick={handleSend}
              disabled={!rating}
              className={`mt-4 w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                rating ? 'text-white shadow-lg' : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
              style={rating ? { background: 'linear-gradient(135deg, #FF5421, #E04619)' } : {}}
            >
              <Send size={15} /> Skicka feedback
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#FF5421]/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#FF5421]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tack!</h3>
            <p className="text-white/50 text-sm mb-6">Din feedback hjälper oss att förbättra kursen.</p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}
            >
              Stäng
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── TABS ─────────────────────────────────────────────────────────────────────

const OverviewTab = ({ user, progress, onFeedback, onDownloadDiploma }) => {
  const completed = progress.filter(p => p.completed).length;
  const pct = Math.round((completed / progress.length) * 100);
  const earnedPoints = progress.filter(p => p.completed).reduce((s, p) => s + p.points, 0);
  const allDone = completed === progress.length;

  return (
    <div className="space-y-4">
      {/* Välkomsthälsning */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF5421] to-[#E04619] flex items-center justify-center flex-shrink-0">
            {user.avatar
              ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
              : <User size={26} className="text-white" />
            }
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Hej, {user.name.split(' ')[0]}!</h2>
            <p className="text-white/50 text-sm">{user.forening} · {user.roll}</p>
          </div>
        </div>
      </Card>

      {/* Framstegsring */}
      <Card>
        <div className="flex items-center gap-5">
          {/* Ring */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
              <motion.circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#FF5421" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 34}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - pct / 100) }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{pct}%</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">Kursframsteg</h3>
            <p className="text-white/50 text-sm mb-3">{completed} av {progress.length} avsnitt klara</p>
            <div className="flex items-center gap-2">
              <GavelIcon size={16} color="#FF5421" />
              <span className="text-sm font-semibold text-white/70">{earnedPoints} poäng intjänade</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Diplom */}
      <Card className={allDone ? 'border-[#FF5421]/30 bg-[#FF5421]/10' : ''}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${allDone ? 'bg-[#FF5421]' : 'bg-white/10'}`}>
            <Award size={22} className={allDone ? 'text-white' : 'text-white/30'} />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-sm ${allDone ? 'text-white' : 'text-white/50'}`}>Styrelsekörkortet – Diplom</h3>
            <p className="text-xs text-white/40 mt-0.5">
              {allDone ? 'Kursen avklarad – grattis!' : `${progress.length - completed} avsnitt kvar för diplom`}
            </p>
          </div>
          <button
            onClick={allDone ? onDownloadDiploma : undefined}
            disabled={!allDone}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              allDone
                ? 'text-white shadow-lg'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
            style={allDone ? { background: 'linear-gradient(135deg, #FF5421, #E04619)' } : {}}
          >
            {allDone ? <><Download size={14} /> Ladda ner</> : <><Lock size={14} /> Låst</>}
          </button>
        </div>
      </Card>

      {/* Feedback */}
      <button
        onClick={onFeedback}
        className="w-full flex items-center gap-4 rounded-2xl border border-white/10 bg-white/8 p-5 hover:border-[#FF5421]/30 hover:bg-[#FF5421]/5 transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#FF5421]/20 transition-colors">
          <MessageSquare size={20} className="text-white/60 group-hover:text-[#FF5421] transition-colors" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-sm text-white">Lämna feedback</h3>
          <p className="text-xs text-white/40 mt-0.5">Hjälp oss göra kursen bättre</p>
        </div>
        <ChevronRight size={18} className="text-white/20 group-hover:text-[#FF5421] transition-colors" />
      </button>
    </div>
  );
};

const ProgressTab = ({ progress }) => (
  <div className="space-y-3">
    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold px-1 mb-4">Alla avsnitt</p>
    {progress.map((item, i) => {
      const Icon = item.icon;
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
            item.completed
              ? 'border-[#FF5421]/25 bg-[#FF5421]/8'
              : 'border-white/8 bg-white/5'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            item.completed ? 'bg-[#FF5421]/20' : 'bg-white/8'
          }`}>
            <Icon size={18} className={item.completed ? 'text-[#FF5421]' : 'text-white/30'} />
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold text-sm ${item.completed ? 'text-white' : 'text-white/40'}`}>
              {item.title}
            </h4>
            {item.points > 0 && (
              <p className={`text-xs mt-0.5 ${item.completed ? 'text-[#FF5421]/70' : 'text-white/25'}`}>
                +{item.points} poäng
              </p>
            )}
          </div>
          {item.completed
            ? <CheckCircle size={18} className="text-[#FF5421] flex-shrink-0" />
            : <Circle size={18} className="text-white/15 flex-shrink-0" />
          }
        </motion.div>
      );
    })}
  </div>
);

const FakturaTab = ({ faktura }) => (
  <div className="space-y-4">
    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold px-1">Fakturauppgifter</p>

    <Card>
      <div className="space-y-4">
        {[
          { label: 'Fakturanummer',    value: faktura.referens },
          { label: 'Belopp',           value: faktura.belopp },
          { label: 'Betalningsdatum',  value: faktura.datum },
          { label: 'Status',           value: faktura.status, highlight: true },
          { label: 'Org.nummer',       value: faktura.org },
          { label: 'Faktureringsadress', value: faktura.adress },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-white/5 last:border-0">
            <span className="text-sm text-white/40">{label}</span>
            <span className={`text-sm font-semibold text-right ${highlight ? 'text-[#FF5421]' : 'text-white'}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>

    <button
      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/10 text-white/60 hover:border-[#FF5421]/40 hover:text-white transition-all"
    >
      <Download size={15} /> Ladda ner faktura (PDF)
    </button>
  </div>
);

const DokumentTab = ({ documents }) => (
  <div className="space-y-3">
    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold px-1 mb-4">Praktiska mallar & dokument</p>
    {documents.map((doc, i) => (
      <motion.a
        key={i}
        href={doc.url}
        download
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
        className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 p-4 hover:border-[#FF5421]/30 hover:bg-[#FF5421]/8 transition-all group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF5421]/20 transition-colors">
          <FileText size={18} className="text-white/40 group-hover:text-[#FF5421] transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-white truncate">{doc.title}</h4>
          <p className="text-xs text-white/30 mt-0.5">{doc.size}</p>
        </div>
        <Download size={16} className="text-white/20 group-hover:text-[#FF5421] flex-shrink-0 transition-colors" />
      </motion.a>
    ))}
  </div>
);

// ─── HUVUDKOMPONENT ───────────────────────────────────────────────────────────
export default function MinaSidor() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFeedback, setShowFeedback] = useState(false);

  // TODO: ersätt med Supabase useSession/useUser
  const user = MOCK_USER;
  const progress = MOCK_PROGRESS;

  const handleDownloadDiploma = () => {
    // TODO: generera och ladda ner diplom
    alert('Diplom laddas ner...');
  };

  const tabs = [
    { id: 'overview',  label: 'Översikt',  icon: User },
    { id: 'progress',  label: 'Framsteg',  icon: CheckCircle },
    { id: 'faktura',   label: 'Faktura',   icon: FileText },
    { id: 'dokument',  label: 'Dokument',  icon: Download },
  ];

  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(135deg, #0f1623 0%, #171f32 60%, #1a2540 100%)' }}
    >
      {/* Subtil bakgrundstextur */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,84,33,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,84,33,0.05) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Mina sidor</h1>
            <p className="text-white/40 text-sm mt-0.5">Styrelsekörkortet</p>
          </div>
          <button className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors px-3 py-2 rounded-xl hover:bg-white/8">
            <LogOut size={15} />
            <span className="hidden sm:inline">Logga ut</span>
          </button>
        </div>

        {/* Tab-navigation */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <TabButton key={tab.id} {...tab} active={activeTab === tab.id} onClick={setActiveTab} />
          ))}
        </div>

        {/* Tab-innehåll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <OverviewTab
                user={user}
                progress={progress}
                onFeedback={() => setShowFeedback(true)}
                onDownloadDiploma={handleDownloadDiploma}
              />
            )}
            {activeTab === 'progress' && <ProgressTab progress={progress} />}
            {activeTab === 'faktura'  && <FakturaTab faktura={user.faktura} />}
            {activeTab === 'dokument' && <DokumentTab documents={MOCK_DOCUMENTS} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback-modal */}
      <AnimatePresence>
        {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      </AnimatePresence>
    </div>
  );
}