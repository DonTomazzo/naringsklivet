// src/pages/TeamLeaderDashboard.tsx
// TeamLeader-vy — bjud in team, se deras framsteg, faktura
// Vid login styrs hit om roll === 'teamleader'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, UserPlus, Mail, CheckCircle, Circle, Trash2,
  LogOut, Menu, X, Receipt, Download, LayoutDashboard,
  BookOpen, ChevronRight, Send, Copy, Check
} from 'lucide-react';

const C = {
  orange: '#FF5421', orangeD: '#E04619', orangeL: '#FFF0EB',
  dark: '#1A1A1A', mid: '#4A4A4A', muted: '#8A8A8A',
  bg: '#FAFAF8', bgAlt: '#F4F2EE', bgCard: '#FFFFFF', border: '#E8E5E0',
};

// ── MOCK — ersätt med Supabase-queries senare ─────────────
const LEADER = {
  name: 'Maria Lindqvist',
  email: 'maria@brfkastanjen.se',
  forening: 'BRF Kastanjen',
  roll: 'Ordförande',
  platform: 'styrelsekorkortet',
  maxMembers: 6,
  faktura: {
    referens: 'INV-2025-0042', belopp: '4 900 kr',
    datum: '15 jan 2025', status: 'Betald',
  },
};

const TEAM_MEMBERS = [
  { id: '1', name: 'Anna Eriksson',   email: 'anna@brfkastanjen.se',  roll: 'Kassör',   progress: 100, joined: '16 jan 2025' },
  { id: '2', name: 'Erik Johansson',  email: 'erik@brfkastanjen.se',  roll: 'Ledamot',  progress: 57,  joined: '16 jan 2025' },
  { id: '3', name: 'Sara Nilsson',    email: 'sara@brfkastanjen.se',  roll: 'Ledamot',  progress: 28,  joined: '17 jan 2025' },
  { id: '4', name: 'Johan Bergström', email: 'johan@brfkastanjen.se', roll: 'Suppleant', progress: 0,   joined: '20 jan 2025' },
];

// ── Bjud in modal ─────────────────────────────────────────
const InviteModal = ({ onClose, currentCount, maxCount }: { onClose: () => void; currentCount: number; maxCount: number }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const spotsLeft = maxCount - currentCount;

  const handleSend = async () => {
    if (!email.trim() || spotsLeft <= 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // mock delay
    setSent(true);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <div>
            <h3 className="font-bold text-base" style={{ color: C.dark }}>Bjud in ledamot</h3>
            <p className="text-xs mt-0.5" style={{ color: C.muted }}>{spotsLeft} platser kvar av {maxCount}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <X size={15} style={{ color: C.muted }} />
          </button>
        </div>
        <div className="p-6">
          {!sent ? (
            <div className="space-y-4">
              {spotsLeft <= 0 && (
                <div className="p-3 rounded-xl text-sm" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                  Alla platser är använda. Kontakta oss för att lägga till fler.
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.mid }}>
                  E-postadress
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: C.muted }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="ledamot@brf.se" disabled={spotsLeft <= 0}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors disabled:opacity-40"
                    style={{ borderColor: C.border, color: C.dark }}
                    onFocus={e => e.target.style.borderColor = C.orange}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>
              <p className="text-xs" style={{ color: C.muted }}>
                Ledamoten får en inloggningslänk via mejl och får direkt tillgång till kursen.
              </p>
              <button onClick={handleSend} disabled={!email.trim() || loading || spotsLeft <= 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                {loading ? 'Skickar...' : <><Send size={14} /> Skicka inbjudan</>}
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: C.orangeL }}>
                <CheckCircle size={26} style={{ color: C.orange }} />
              </div>
              <h4 className="font-bold text-base mb-1" style={{ color: C.dark }}>Inbjudan skickad!</h4>
              <p className="text-sm mb-5" style={{ color: C.muted }}>En magic link har skickats till <strong>{email}</strong>.</p>
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
const TeamTab = ({ onInvite }: { onInvite: () => void }) => {
  const [members, setMembers] = useState(TEAM_MEMBERS);

  const avgProgress = Math.round(members.reduce((s, m) => s + m.progress, 0) / members.length);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: members.length, label: 'Ledamöter', sub: `av ${LEADER.maxMembers}` },
          { val: `${avgProgress}%`, label: 'Snitt progress', sub: 'alla ledamöter' },
          { val: members.filter(m => m.progress === 100).length, label: 'Klara', sub: 'certifikat utfärdade' },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-4 border text-center" style={{ background: C.bgCard, borderColor: C.border }}>
            <p className="text-2xl font-black" style={{ color: C.orange }}>{s.val}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: C.dark }}>{s.label}</p>
            <p className="text-xs" style={{ color: C.muted }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Bjud in-knapp */}
      {members.length < LEADER.maxMembers && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onInvite}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-white text-sm"
          style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 4px 16px ${C.orange}30` }}>
          <UserPlus size={16} /> Bjud in ledamot ({LEADER.maxMembers - members.length} platser kvar)
        </motion.button>
      )}

      {/* Teamlista */}
      <div className="space-y-2">
        {members.map((member, i) => (
          <motion.div key={member.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border p-4" style={{ background: C.bgCard, borderColor: C.border }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
                style={{ background: member.progress === 100 ? C.orange : C.dark }}>
                {member.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm truncate" style={{ color: C.dark }}>{member.name}</p>
                  {member.progress === 100 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                      style={{ background: C.orange }}>✓ Klar</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: C.muted }}>{member.email} · {member.roll}</p>
              </div>
              <button onClick={() => setMembers(m => m.filter(x => x.id !== member.id))}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors flex-shrink-0">
                <Trash2 size={13} style={{ color: C.muted }} className="hover:text-red-400" />
              </button>
            </div>
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: C.bgAlt }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${member.progress}%`, background: `linear-gradient(to right, ${C.orange}, ${C.orangeD})` }} />
              </div>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: member.progress === 100 ? C.orange : C.muted }}>
                {member.progress}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FakturaTab = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(LEADER.faktura.referens);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border }}>
        <div className="px-5 py-4 border-b" style={{ background: C.bgAlt, borderColor: C.border }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>Faktura</p>
          <div className="flex items-center gap-2">
            <h3 className="font-bold" style={{ color: C.dark }}>{LEADER.faktura.referens}</h3>
            <button onClick={handleCopy} className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors">
              {copied ? <Check size={12} style={{ color: C.orange }} /> : <Copy size={12} style={{ color: C.muted }} />}
            </button>
          </div>
        </div>
        <div className="divide-y" style={{ background: C.bgCard, borderColor: C.border }}>
          {[
            { label: 'Belopp',          value: LEADER.faktura.belopp },
            { label: 'Datum',           value: LEADER.faktura.datum },
            { label: 'Status',          value: LEADER.faktura.status, highlight: true },
            { label: 'Antal platser',   value: `${LEADER.maxMembers} ledamöter` },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-sm" style={{ color: C.muted }}>{label}</span>
              <span className="text-sm font-semibold" style={{ color: highlight ? C.orange : C.dark }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border-2 transition-all hover:border-orange-300"
        style={{ borderColor: C.border, color: C.mid, background: C.bgCard }}>
        <Download size={15} /> Ladda ner faktura (PDF)
      </button>
      <div className="rounded-2xl p-4 border" style={{ background: C.bgAlt, borderColor: C.border }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.orange }}>Fler platser?</p>
        <p className="text-sm mb-3" style={{ color: C.mid }}>
          Vill ni utbilda fler ledamöter eller suppleanter? Kontakta oss så ordnar vi det.
        </p>
        <a href="mailto:tomas@styrelsekorkortet.se"
          className="text-sm font-bold" style={{ color: C.orange }}>
          tomas@styrelsekorkortet.se →
        </a>
      </div>
    </div>
  );
};

// ── MAIN ──────────────────────────────────────────────────
const NAV = [
  { id: 'team',    label: 'Mitt team',  icon: Users },
  { id: 'faktura', label: 'Faktura',    icon: Receipt },
];

export default function TeamLeaderDashboard() {
  const [tab, setTab] = useState('team');
  const [showInvite, setInvite] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();

  const NavItem = ({ item }: { item: typeof NAV[0] }) => (
    <button onClick={() => { setTab(item.id); setMobileNav(false); }}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left"
      style={tab === item.id ? { background: C.orange, color: 'white' } : { color: C.mid }}>
      <item.icon size={16} />
      {item.label}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <header className="sticky top-0 z-30 border-b bg-white" style={{ borderColor: C.border }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="" className="w-7 h-7 object-contain" />
            <span className="font-bold text-sm" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{ background: C.orangeL, color: C.orange }}>
              Teamledare
            </span>
            <span className="text-xs" style={{ color: C.muted }}>{LEADER.email}</span>
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
                style={{ background: C.orange }}>{LEADER.name[0]}</div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: C.dark }}>{LEADER.name}</p>
                <p className="text-xs truncate" style={{ color: C.muted }}>{LEADER.forening}</p>
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
                    style={{ background: C.orange }}>{LEADER.name[0]}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.dark }}>{LEADER.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{LEADER.forening}</p>
                  </div>
                </div>
                {NAV.map(item => <NavItem key={item.id} item={item} />)}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <motion.h1 className="text-xl font-bold" style={{ color: C.dark }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              {NAV.find(n => n.id === tab)?.label}
            </motion.h1>
            {tab === 'team' && (
              <button onClick={() => setInvite(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white text-xs"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                <UserPlus size={14} /> Bjud in
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              {tab === 'team'    && <TeamTab onInvite={() => setInvite(true)} />}
              {tab === 'faktura' && <FakturaTab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {showInvite && (
          <InviteModal onClose={() => setInvite(false)}
            currentCount={TEAM_MEMBERS.length} maxCount={LEADER.maxMembers} />
        )}
      </AnimatePresence>
    </div>
  );
}