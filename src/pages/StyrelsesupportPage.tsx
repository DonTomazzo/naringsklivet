// src/pages/StyrelsesupportPage.tsx
// AI-assistent för BRF-styrelser – Styrelsesupport
// Anropar Claude API direkt från klienten via VITE_ANTHROPIC_API_KEY

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertTriangle, RefreshCw, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const ORANGE = '#FF5421';
const DARK   = '#0f1623';

// ─── Personnummer-regex ───────────────────────────────────
const PERSONNUMMER_REGEX = /\b\d{6}[-–]?\d{4}\b/;
const BANKKONTONUMMER_REGEX = /\b\d{4}[-\s]?\d{2,10}\b/;

const harKansligInfo = (text: string) =>
  PERSONNUMMER_REGEX.test(text) || BANKKONTONUMMER_REGEX.test(text);

// ─── Snabbfrågor ─────────────────────────────────────────
const SNABBFRAGOR = [
  'Hur skriver vi ett korrekt styrelsemötesprotokoll?',
  'Vad gäller vid andrahandsuthyrning i BRF?',
  'När måste vi anmäla ny styrelse till Bolagsverket?',
  'Hur hanterar vi en störande granne rätt?',
  'Vad är skillnaden på K2 och K3?',
  'Vilka bidrag finns för solceller på BRF-tak?',
];

// ─── Typer ───────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  error?: boolean;
}

// ─── Markdown-renderer (enkel) ───────────────────────────
const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Fet text
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Numrerade listor
    if (/^\d+\.\s/.test(line)) {
      return <li key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '') }} />;
    }
    // Punktlistor
    if (/^[-•]\s/.test(line)) {
      return <li key={i} className="ml-4 mb-1 list-disc" dangerouslySetInnerHTML={{ __html: line.replace(/^[-•]\s/, '') }} />;
    }
    // Tom rad
    if (line.trim() === '') return <br key={i} />;
    // Vanlig rad
    return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line }} />;
  });
};

// ─── Meddelandebubbla ────────────────────────────────────
const MessageBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
        style={{ background: isUser ? 'rgba(255,255,255,0.1)' : ORANGE }}
      >
        {isUser
          ? <User size={14} className="text-white/70" />
          : <Bot size={14} className="text-white" />
        }
      </div>

      {/* Bubbla */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
        }`}
        style={{
          background: isUser
            ? 'rgba(255,255,255,0.1)'
            : msg.error
            ? 'rgba(239,68,68,0.15)'
            : 'rgba(255,255,255,0.07)',
          border: isUser
            ? '1px solid rgba(255,255,255,0.12)'
            : msg.error
            ? '1px solid rgba(239,68,68,0.3)'
            : '1px solid rgba(255,255,255,0.1)',
          color: msg.error ? '#fca5a5' : 'rgba(255,255,255,0.9)',
        }}
      >
        {isUser
          ? <p>{msg.content}</p>
          : <div className="prose-sm">{renderMarkdown(msg.content)}</div>
        }
        <p className="text-right text-xs mt-1.5 opacity-30">
          {msg.timestamp.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Skriver-indikator ───────────────────────────────────
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex gap-3 items-center"
  >
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: ORANGE }}>
      <Bot size={14} className="text-white" />
    </div>
    <div className="flex gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: ORANGE }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </motion.div>
);

// ─── HUVUD-KOMPONENT ──────────────────────────────────────
const StyrelsesupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [showInfo, setShowInfo]     = useState(true);
  const messagesEndRef              = useRef<HTMLDivElement>(null);
  const inputRef                    = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Kolla känslig info
    if (harKansligInfo(trimmed)) {
      const warningMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '⚠️ Jag kan inte ta emot personnummer, bankkontonummer eller andra känsliga personuppgifter. Vänligen omformulera din fråga utan sådana uppgifter.',
        timestamp: new Date(),
        error: true,
      };
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), role: 'user', content: trimmed, timestamp: new Date(),
      }, warningMsg]);
      setInput('');
      return;
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setShowInfo(false);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/.netlify/functions/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: history,
        }),
      });

      if (!response.ok) {
        throw new Error(`API-fel: ${response.status}`);
      }

      const data = await response.json();
      const assistantText = data.content?.[0]?.text ?? 'Inget svar från assistenten.';

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: assistantText,
        timestamp: new Date(),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Ett fel uppstod. Kontrollera din internetanslutning och försök igen.',
        timestamp: new Date(),
        error: true,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowInfo(true);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: DARK, fontFamily: "'Nunito', sans-serif" }}>
      <Navigation />

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pt-24 pb-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: ORANGE }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Styrelsesupport</h1>
              <p className="text-white/40 text-xs">AI-assistent för BRF-styrelser</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5">
              <RefreshCw size={12} /> Ny konversation
            </button>
          )}
        </div>

        {/* Infobox – visas tills första frågan ställs */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="rounded-2xl p-5 mb-6 border"
              style={{ background: 'rgba(255,84,33,0.08)', borderColor: 'rgba(255,84,33,0.2)' }}
            >
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Viktigt att veta</p>
                  <p className="text-white/55 text-xs leading-relaxed">
                    Styrelsesupport ger vägledning och information – inte juridiskt bindande råd.
                    Ange aldrig personnummer, bankuppgifter eller känsliga personuppgifter.
                    Kontakta alltid jurist eller revisor vid komplexa ärenden.
                  </p>
                </div>
              </div>

              {/* Snabbfrågor */}
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Vanliga frågor</p>
              <div className="flex flex-wrap gap-2">
                {SNABBFRAGOR.map((q, i) => (
                  <motion.button key={i}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border text-white/65 hover:text-white transition-colors text-left"
                    style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meddelandelista */}
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          <AnimatePresence>
            {messages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
          </AnimatePresence>

          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Snabbfrågor när man chattat ett tag */}
        {messages.length > 0 && messages.length % 4 === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 mb-3">
            {SNABBFRAGOR.slice(0, 3).map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full border text-white/40 hover:text-white/70 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                {q}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Skriv din fråga om BRF och styrelsearbete..."
            rows={1}
            disabled={loading}
            className="w-full bg-transparent px-4 pt-3.5 pb-2 text-sm text-white placeholder-white/25 focus:outline-none resize-none"
            style={{ minHeight: 52, maxHeight: 120 }}
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <p className="text-white/20 text-xs">
              Enter för att skicka · Shift+Enter för ny rad
            </p>
            <motion.button
              whileHover={input.trim() ? { scale: 1.05 } : {}}
              whileTap={input.trim() ? { scale: 0.95 } : {}}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: input.trim() && !loading ? ORANGE : 'rgba(255,255,255,0.08)',
                color: input.trim() && !loading ? 'white' : 'rgba(255,255,255,0.2)',
              }}
            >
              <Send size={15} />
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-4">
          Styrelsesupport · Styrelsekörkortet · Drivs av Claude
        </p>
      </div>
    </div>
  );
};

export default StyrelsesupportPage;