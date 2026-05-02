// src/pages/MinaSidor.tsx
// Styrelsekörkortet® — Mina sidor
// Design: Refined luxury dashboard — marinblå + orange, Nunito, glassmorphism cards

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, Circle, Download, Star, FileText,
  ChevronRight, Award, MessageSquare, LogOut, BookOpen,
  Search, X, Lock, FolderOpen, Play, ArrowRight,
  LayoutDashboard, GraduationCap, Menu, Shield, Zap,
  Clock, TrendingUp, ChevronDown, ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { modulesData } from '../data/modules2';

// ── Tokens ───────────────────────────────────────────────
const C = {
  orange:  '#FF5421',
  orangeD: '#E04619',
  orangeL: '#FFF0EB',
  navy:    '#1e2d4a',
  navyL:   '#253860',
  dark:    '#111827',
  mid:     '#4B5563',
  muted:   '#9CA3AF',
  bg:      '#F8F7F4',
  bgAlt:   '#F1EFE9',
  white:   '#FFFFFF',
  border:  '#E5E2DA',
  green:   '#10B981',
};

// ── Mock framsteg (ersätt med Supabase-tabell) ───────────
const KURSER = [
  { id: 'intro',      slug: 'introduktion',          titel: 'Introduktion',          kategori: 'Grunderna',  completed: 6,  total: 6,  bild: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80' },
  { id: 'roller',     slug: 'styrelsens-roller',      titel: 'Styrelsens roller',      kategori: 'Grunderna',  completed: 4,  total: 6,  bild: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80' },
  { id: 'gdpr',       slug: 'gdpr-dataskydd',         titel: 'GDPR & Dataskydd',       kategori: 'Juridik',    completed: 0,  total: 8,  bild: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80' },
  { id: 'ekonomi',    slug: 'ekonomiansvar',          titel: 'Ekonomiansvar',          kategori: 'Ekonomi',    completed: 0,  total: 7,  bild: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&q=80' },
  { id: 'fastigheten',slug: 'fastigheten-sakerhet',  titel: 'Fastigheten',            kategori: 'Fastighet',  completed: 0,  total: 10, bild: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80' },
  { id: 'stamma',     slug: 'foreningsstamman',      titel: 'Föreningsstämman',       kategori: 'Juridik',    completed: 0,  total: 5,  bild: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
];

const DOKUMENT = [
  { titel: 'Mötesprotokoll – mall',             kat: 'Protokoll', storlek: '42 KB' },
  { titel: 'Kallelse till styrelsemöte',         kat: 'Protokoll', storlek: '28 KB' },
  { titel: 'GDPR-policy för BRF',               kat: 'GDPR',      storlek: '88 KB' },
  { titel: 'Årsredovisning – checklista',        kat: 'Ekonomi',   storlek: '65 KB' },
  { titel: 'Bostadsrättslagen – sammanfattning', kat: 'Juridik',   storlek: '75 KB' },
  { titel: 'Välkomstbrev till ny medlem',        kat: 'Mallar',    storlek: '35 KB' },
];
const DOC_KATS = ['Alla', 'Protokoll', 'Ekonomi', 'GDPR', 'Juridik', 'Mallar'];

// ── Progress-cirkel ───────────────────────────────────────
const ProgressRing = ({ pct, size = 120, stroke = 8, color = C.orange }: {
  pct: number; size?: number; stroke?: number; color?: string;
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }} />
    </svg>
  );
};

// ── Feedback modal ────────────────────────────────────────
const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(17,24,39,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.93, y: 20 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 20 }} transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-7 py-5 border-b flex items-center justify-between" style={{ borderColor: C.border }}>
          <div>
            <h3 className="font-black text-base" style={{ color: C.dark, fontFamily: 'Nunito, sans-serif' }}>Lämna feedback</h3>
            <p className="text-xs mt-0.5" style={{ color: C.muted }}>Hjälp oss göra kursen bättre</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-gray-100">
            <X size={15} style={{ color: C.muted }} />
          </button>
        </div>
        <div className="p-7">
          {!sent ? (
            <div className="space-y-5">
              <div className="flex justify-center gap-3">
                {[1,2,3,4,5].map(s => (
                  <motion.button key={s} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}>
                    <Star size={36} fill={(hovered||rating)>=s ? C.orange : 'transparent'}
                      color={(hovered||rating)>=s ? C.orange : C.border}
                      strokeWidth={1.5} />
                  </motion.button>
                ))}
              </div>
              <textarea value={text} onChange={e => setText(e.target.value)}
                placeholder="Skriv gärna en kommentar..." rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm resize-none focus:outline-none border-2 transition-colors"
                style={{ borderColor: text ? C.orange : C.border, color: C.dark, fontFamily: 'Nunito, sans-serif' }} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => rating && setSent(true)} disabled={!rating}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm disabled:opacity-30 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>
                Skicka feedback
              </motion.button>
            </div>
          ) : (
            <div className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: C.orangeL }}>
                <CheckCircle size={28} style={{ color: C.orange }} />
              </motion.div>
              <h4 className="font-black text-lg mb-1" style={{ color: C.dark }}>Tack!</h4>
              <p className="text-sm mb-6" style={{ color: C.muted }}>Din feedback hjälper oss förbättra kursen.</p>
              <motion.button whileHover={{ scale: 1.02 }} onClick={onClose}
                className="px-8 py-3 rounded-2xl font-bold text-white text-sm"
                style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})` }}>Stäng</motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ════════════════════════════════════════════════════════
// OVERVIEW TAB
// ════════════════════════════════════════════════════════
const OverviewTab = ({ user, profile, onFeedback }: { user: any; profile: any; onFeedback: () => void }) => {
  const navigate = useNavigate();
  const totalCompleted = KURSER.reduce((s, k) => s + k.completed, 0);
  const totalSlides   = KURSER.reduce((s, k) => s + k.total, 0);
  const pct = Math.round((totalCompleted / totalSlides) * 100);
  const klarKurser = KURSER.filter(k => k.completed === k.total).length;
  const nastaKurs  = KURSER.find(k => k.completed > 0 && k.completed < k.total) || KURSER.find(k => k.completed === 0);
  const allDone    = klarKurser === KURSER.length;
  const displayName = user?.user_metadata?.name || profile?.email?.split('@')[0] || 'Välkommen';

  return (
    <div className="space-y-5">

      {/* ── Hero-kort ── */}
      <div className="rounded-3xl overflow-hidden relative" style={{ background: C.navy, minHeight: 200 }}>
        {/* Bakgrundsgradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e2d4a 0%, #253860 60%, #1e2d4a 100%)' }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${C.orange}20 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />

        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Vänster — text */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${C.orange}` }}>
              Styrelsekörkortet®
            </p>
            <h2 className="text-2xl font-black text-white leading-tight mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Hej, {displayName.split(' ')[0]}!
            </h2>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {user?.email}
              {profile?.role && <span className="ml-2 capitalize px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>{profile.role}</span>}
            </p>

            {/* Stats-rad */}
            <div className="flex gap-5">
              {[
                { val: klarKurser, label: 'Klara kurser', color: C.green },
                { val: `${KURSER.length - klarKurser}`, label: 'Kvar', color: 'rgba(255,255,255,0.5)' },
                { val: '365d', label: 'Åtkomst', color: 'rgba(255,255,255,0.5)' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-xl font-black" style={{ color: s.color, fontFamily: 'Nunito, sans-serif' }}>{s.val}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Höger — progress-cirkel */}
          <div className="relative flex-shrink-0">
            <ProgressRing pct={pct} size={110} stroke={9} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-black text-white leading-none" style={{ fontFamily: 'Nunito, sans-serif' }}>{pct}%</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>klart</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Snabbknappar ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { ikon: Play,        label: 'Fortsätt kursen',   action: () => nastaKurs && navigate(`/module/${nastaKurs.slug}`), primary: true },
          { ikon: Award,       label: 'Certifikat',        action: () => {},               primary: false },
          { ikon: MessageSquare, label: 'Feedback',        action: onFeedback,             primary: false },
        ].map((btn, i) => {
          const Icon = btn.ikon;
          return (
            <motion.button key={i} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
              onClick={btn.action}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl text-center transition-all"
              style={btn.primary
                ? { background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, color: 'white', boxShadow: `0 8px 24px ${C.orange}35` }
                : { background: C.white, border: `1.5px solid ${C.border}`, color: C.mid }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: btn.primary ? 'rgba(255,255,255,0.2)' : C.bgAlt }}>
                <Icon size={18} style={{ color: btn.primary ? 'white' : C.orange }} />
              </div>
              <p className="text-xs font-bold leading-tight">{btn.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* ── Nästa kurs ── */}
      {nastaKurs && !allDone && (
        <motion.div whileHover={{ y: -2 }} onClick={() => navigate(`/module/${nastaKurs.slug}`)}
          className="rounded-2xl overflow-hidden cursor-pointer relative group"
          style={{ background: C.white, border: `1.5px solid ${C.border}` }}>
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img src={nastaKurs.bild} alt="" className="w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
          </div>
          <div className="relative z-10 flex items-center gap-4 p-5">
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={nastaKurs.bild} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: C.orange }}>
                {nastaKurs.completed > 0 ? 'Fortsätt' : 'Starta nästa'}
              </p>
              <p className="font-black text-base truncate" style={{ color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
                {nastaKurs.titel}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.bgAlt }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(nastaKurs.completed/nastaKurs.total)*100}%`, background: C.orange }} />
                </div>
                <p className="text-xs font-semibold flex-shrink-0" style={{ color: C.muted }}>
                  {nastaKurs.completed}/{nastaKurs.total}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: C.orangeL }}>
              <ArrowRight size={16} style={{ color: C.orange }} />
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Certifikat-kort ── */}
      <div className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: allDone ? C.navy : C.white, border: `1.5px solid ${allDone ? C.navy : C.border}` }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: allDone ? `${C.orange}30` : C.bgAlt }}>
          {allDone
            ? <Award size={24} style={{ color: C.orange }} />
            : <Lock size={20} style={{ color: C.muted }} />}
        </div>
        <div className="flex-1">
          <p className="font-black text-sm" style={{ color: allDone ? 'white' : C.dark, fontFamily: 'Nunito, sans-serif' }}>
            Styrelsekörkortet® — Diplom
          </p>
          <p className="text-xs mt-0.5" style={{ color: allDone ? 'rgba(255,255,255,0.5)' : C.muted }}>
            {allDone ? 'Klart! Ladda ner ditt kursbevis.' : `${KURSER.length - klarKurser} kurser kvar för diplom`}
          </p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          disabled={!allDone}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-30"
          style={{ background: allDone ? C.orange : C.bgAlt, color: allDone ? 'white' : C.muted }}>
          <Download size={13} /> Ladda ner
        </motion.button>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════
// KURSER TAB
// ════════════════════════════════════════════════════════
const KurserTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: C.muted }}>
        {KURSER.filter(k => k.completed === k.total).length} av {KURSER.length} kurser klara
      </p>
      {KURSER.map((kurs, i) => {
        const pct = Math.round((kurs.completed / kurs.total) * 100);
        const done = kurs.completed === kurs.total;
        const started = kurs.completed > 0;
        return (
          <motion.div key={kurs.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => navigate(`/module/${kurs.slug}`)}
            className="rounded-2xl overflow-hidden cursor-pointer group"
            style={{ background: C.white, border: `1.5px solid ${done ? C.green + '40' : C.border}`, boxShadow: done ? `0 2px 12px ${C.green}15` : 'none' }}>
            <div className="flex items-center gap-4 p-4">
              {/* Bild */}
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={kurs.bild} alt={kurs.titel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {done && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${C.green}cc` }}>
                    <CheckCircle size={20} color="white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-black text-sm truncate" style={{ color: C.dark, fontFamily: 'Nunito, sans-serif' }}>
                    {kurs.titel}
                  </p>
                  {done && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `${C.green}15`, color: C.green }}>Klar</span>
                  )}
                </div>
                <p className="text-xs mb-2" style={{ color: C.muted }}>{kurs.kategori}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.bgAlt }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
                      style={{ background: done ? C.green : C.orange }} />
                  </div>
                  <p className="text-xs font-semibold flex-shrink-0" style={{ color: C.muted }}>
                    {kurs.completed}/{kurs.total}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{ background: done ? `${C.green}15` : C.bgAlt }}>
                {done
                  ? <CheckCircle size={16} style={{ color: C.green }} />
                  : started
                    ? <Play size={14} style={{ color: C.orange }} />
                    : <Lock size={13} style={{ color: C.muted }} />}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// ════════════════════════════════════════════════════════
// CERTIFIKAT TAB
// ════════════════════════════════════════════════════════
const CertifikatTab = () => {
  const klarKurser = KURSER.filter(k => k.completed === k.total);
  const allDone = klarKurser.length === KURSER.length;
  return (
    <div className="space-y-4">
      {/* Huvud-diplom */}
      <div className="rounded-3xl p-7 relative overflow-hidden"
        style={{ background: allDone ? C.navy : C.bgAlt, border: `2px solid ${allDone ? C.orange + '40' : C.border}` }}>
        {allDone && (
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.orange}20 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
        )}
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
            style={{ background: allDone ? `${C.orange}25` : C.white, border: `2px solid ${allDone ? C.orange + '40' : C.border}` }}>
            <Award size={36} style={{ color: allDone ? C.orange : C.muted }} />
          </div>
          <h3 className="text-xl font-black mb-2" style={{ color: allDone ? 'white' : C.dark, fontFamily: 'Nunito, sans-serif' }}>
            Styrelsekörkortet® — Diplom
          </h3>
          <p className="text-sm mb-6" style={{ color: allDone ? 'rgba(255,255,255,0.5)' : C.muted }}>
            {allDone ? 'Grattis! Du har klarat hela utbildningen.' : `Slutför alla ${KURSER.length} kurser för att låsa upp diplomet.`}
          </p>
          {allDone ? (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.orangeD})`, boxShadow: `0 8px 24px ${C.orange}40` }}>
              <Download size={16} /> Ladda ner diplom
            </motion.button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className="h-2 rounded-full overflow-hidden flex-1 max-w-48" style={{ background: 'rgba(0,0,0,0.1)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${(klarKurser.length / KURSER.length) * 100}%`, background: C.orange }} />
              </div>
              <p className="text-sm font-bold" style={{ color: C.orange }}>{klarKurser.length}/{KURSER.length}</p>
            </div>
          )}
        </div>
      </div>

      {/* Per-kurs certifikat */}
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: C.muted }}>Kursbevis</p>
      {KURSER.map((kurs, i) => {
        const done = kurs.completed === kurs.total;
        return (
          <motion.div key={kurs.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 p-4 rounded-2xl border"
            style={{ background: C.white, borderColor: done ? C.green + '30' : C.border }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: done ? `${C.green}15` : C.bgAlt }}>
              {done ? <Award size={18} style={{ color: C.green }} /> : <Lock size={15} style={{ color: C.muted }} />}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: done ? C.dark : C.muted, fontFamily: 'Nunito, sans-serif' }}>{kurs.titel}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>{done ? 'Avklarad' : `${kurs.total - kurs.completed} avsnitt kvar`}</p>
            </div>
            <button disabled={!done}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl disabled:opacity-30"
              style={{ background: done ? `${C.green}15` : C.bgAlt, color: done ? C.green : C.muted }}>
              <Download size={12} /> PDF
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

// ════════════════════════════════════════════════════════
// DOKUMENT TAB
// ════════════════════════════════════════════════════════
const DokumentTab = () => {
  const [query, setQuery] = useState('');
  const [kat, setKat] = useState('Alla');
  const filtered = DOKUMENT.filter(d =>
    (kat === 'Alla' || d.kat === kat) &&
    (!query || d.titel.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: C.muted }} />
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Sök bland dokument..."
          className="w-full pl-10 pr-4 py-3.5 rounded-2xl border text-sm focus:outline-none transition-colors"
          style={{ background: C.white, borderColor: query ? C.orange : C.border, color: C.dark, fontFamily: 'Nunito, sans-serif' }} />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DOC_KATS.map(k => (
          <button key={k} onClick={() => setKat(k)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={kat === k
              ? { background: C.navy, color: 'white' }
              : { background: C.white, color: C.mid, border: `1px solid ${C.border}` }}>
            {k}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((doc, i) => (
            <motion.a key={doc.titel} href="#" download
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }} transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 p-4 rounded-2xl border group cursor-pointer transition-all"
              style={{ background: C.white, borderColor: C.border }}
              whileHover={{ y: -1, borderColor: C.orange + '40' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: C.orangeL }}>
                <FileText size={18} style={{ color: C.orange }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: C.dark, fontFamily: 'Nunito, sans-serif' }}>{doc.titel}</p>
                <p className="text-xs mt-0.5" style={{ color: C.muted }}>{doc.kat} · {doc.storlek}</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                style={{ background: C.bgAlt }}>
                <Download size={14} style={{ color: C.orange }} />
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════
// NAV CONFIG
// ════════════════════════════════════════════════════════
const TABS = [
  { id: 'overview',   label: 'Översikt',   icon: LayoutDashboard },
  { id: 'kurser',     label: 'Mina kurser', icon: BookOpen },
  { id: 'certifikat', label: 'Certifikat',  icon: Award },
  { id: 'dokument',   label: 'Dokument',    icon: FolderOpen },
];

// ════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════
export default function MinaSidor() {
  const [tab, setTab] = useState('overview');
  const [showFeedback, setFeedback] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
          style={{ borderColor: C.orange, borderTopColor: 'transparent' }} />
        <p className="text-sm font-medium" style={{ color: C.muted }}>Laddar...</p>
      </div>
    </div>
  );

  const displayName = user?.user_metadata?.name || profile?.email?.split('@')[0] || 'Användare';
  const initial = displayName[0]?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: 'Nunito, sans-serif' }}>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(248,247,244,0.95)', backdropFilter: 'blur(12px)', borderColor: C.border }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
            <span className="font-black text-sm" style={{ color: C.dark }}>
              <span style={{ color: C.orange }}>Styrelse</span>körkortet
            </span>
          </div>

          {/* Desktop user */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: C.bgAlt }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
                style={{ background: C.orange }}>{initial}</div>
              <span className="text-xs font-semibold" style={{ color: C.mid }}>{user?.email}</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors hover:bg-red-50"
              style={{ color: C.muted }}>
              <LogOut size={13} /> Logga ut
            </motion.button>
          </div>

          <button className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: C.bgAlt }} onClick={() => setMobileNav(p => !p)}>
            <Menu size={17} style={{ color: C.dark }} />
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6 items-start">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden sm:flex flex-col w-56 flex-shrink-0 sticky top-20 gap-2">
          {/* User card */}
          <div className="rounded-2xl p-4 mb-1" style={{ background: C.navy }}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-base text-white flex-shrink-0"
                style={{ background: `${C.orange}30`, border: `2px solid ${C.orange}40` }}>{initial}</div>
              <div className="min-w-0">
                <p className="font-black text-sm text-white truncate">{displayName}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="rounded-2xl p-2" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            {TABS.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left mb-0.5 last:mb-0"
                style={tab === item.id
                  ? { background: C.navy, color: 'white' }
                  : { color: C.mid }}>
                <item.icon size={15} style={{ color: tab === item.id ? C.orange : C.muted }} />
                {item.label}
              </button>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.01 }} onClick={handleLogout}
            className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl mt-1 transition-colors hover:bg-red-50"
            style={{ color: C.muted, border: `1px solid ${C.border}` }}>
            <LogOut size={13} /> Logga ut
          </motion.button>
        </aside>

        {/* ── MOBILE DRAWER ── */}
        <AnimatePresence>
          {mobileNav && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 sm:hidden"
                style={{ background: 'rgba(17,24,39,0.6)', backdropFilter: 'blur(4px)' }}
                onClick={() => setMobileNav(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-72 sm:hidden flex flex-col p-5 gap-3"
                style={{ background: C.white }}>
                {/* User */}
                <div className="rounded-2xl p-4" style={{ background: C.navy }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white"
                      style={{ background: `${C.orange}30`, border: `2px solid ${C.orange}40` }}>{initial}</div>
                    <div>
                      <p className="font-black text-sm text-white">{displayName}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email}</p>
                    </div>
                  </div>
                </div>
                {/* Nav */}
                {TABS.map(item => (
                  <button key={item.id} onClick={() => { setTab(item.id); setMobileNav(false); }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-left transition-all"
                    style={tab === item.id
                      ? { background: C.navy, color: 'white' }
                      : { color: C.mid, border: `1px solid ${C.border}` }}>
                    <item.icon size={16} style={{ color: tab === item.id ? C.orange : C.muted }} />
                    {item.label}
                  </button>
                ))}
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold mt-auto"
                  style={{ color: C.muted, border: `1px solid ${C.border}` }}>
                  <LogOut size={15} /> Logga ut
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">
          {/* Mobile tab-bar */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4 sm:hidden">
            {TABS.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={tab === item.id
                  ? { background: C.navy, color: 'white' }
                  : { background: C.white, color: C.mid, border: `1px solid ${C.border}` }}>
                <item.icon size={13} />
                {item.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              {tab === 'overview'   && <OverviewTab user={user} profile={profile} onFeedback={() => setFeedback(true)} />}
              {tab === 'kurser'     && <KurserTab />}
              {tab === 'certifikat' && <CertifikatTab />}
              {tab === 'dokument'   && <DokumentTab />}
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