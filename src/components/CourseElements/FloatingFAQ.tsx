// src/components/CourseElements/FloatingSupport.tsx
// Flytande AI-assistent som ersätter FloatingFAQ.
// Öppnar en kompakt chat-overlay direkt i kursen.
// Anropar /.netlify/functions/claude med kurskontext.

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

const O = '#FF5421';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const PERSONNUMMER_REGEX = /\b\d{6}[-–]?\d{4}\b/;

// Enkel markdown → JSX
const renderMd = (text: string) =>
  text.split('\n').map((line, i) => {
    const html = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    if (/^[-•]\s/.test(line))
      return <li key={i} className="ml-3 mb-0.5 list-disc text-sm"
        dangerouslySetInnerHTML={{ __html: html.replace(/^[-•]\s/, '') }} />;
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-sm mb-0.5 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }} />;
  });

interface FloatingSupportProps {
  /** Kurskontext som skickas som systemprompt-tillägg */
  kursämne?: string;
  /** Snabbfrågor att visa i tomt tillstånd */
  snabbfragor?: string[];
  buttonColor?: string;
}

const FloatingFAQ: React.FC<FloatingSupportProps> = ({
  kursämne = 'BRF-styrelsearbete och bostadsrättsföreningen',
  snabbfragor = [
    'Förklara detta med egna ord',
    'Vad är det viktigaste att komma ihåg?',
    'Ge mig ett praktiskt exempel',
    'Vad händer om vi inte följer detta?',
  ],
  buttonColor = O,
}) => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height =
        Math.min(inputRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (PERSONNUMMER_REGEX.test(trimmed)) {
      setMessages(prev => [...prev,
        { id: crypto.randomUUID(), role: 'user', content: trimmed },
        { id: crypto.randomUUID(), role: 'assistant', error: true,
          content: '⚠️ Ange aldrig personnummer eller känsliga personuppgifter här.' },
      ]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev,
      { id: crypto.randomUUID(), role: 'user', content: trimmed },
    ]);
    setInput('');
    setLoading(true);

    try {
      const history = [
        ...messages,
        { id: '', role: 'user' as const, content: trimmed },
      ].map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/.netlify/functions/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: `Du är en hjälpsam AI-assistent för Styrelsekörkortet, en digital utbildning för BRF-styrelseledamöter. Du hjälper kursdeltagare att fördjupa sig i ämnet: ${kursämne}. Svara kort, pedagogiskt och på svenska. Undvik juridiskt bindande råd.`,
          messages: history,
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? 'Inget svar.';

      setMessages(prev => [...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages(prev => [...prev,
        { id: crypto.randomUUID(), role: 'assistant', error: true,
          content: 'Ett fel uppstod. Försök igen.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* ── FAB-knapp ─────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full text-white shadow-2xl flex items-center justify-center"
        style={{ background: buttonColor, boxShadow: `0 8px 24px ${buttonColor}60` }}
        title="Fråga AI-assistenten"
      >
        <Sparkles size={22} />
      </motion.button>

      {/* ── Chat-overlay ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed z-50 flex flex-col"
              style={{
                bottom: 24, right: 24,
                width: 'min(420px, calc(100vw - 32px))',
                height: 'min(560px, calc(100vh - 120px))',
                background: '#0f1623',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: buttonColor }}>
                    <Bot size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">Styrelsesupport</p>
                    <p className="text-white/40 text-xs mt-0.5">AI-assistent</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button onClick={() => setMessages([])}
                      className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                      <RefreshCw size={13} />
                    </button>
                  )}
                  <button onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Meddelanden */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

                {/* Tom state – snabbfrågor */}
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-center mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: `${buttonColor}20` }}>
                        <Sparkles size={20} style={{ color: buttonColor }} />
                      </div>
                      <p className="text-white font-semibold text-sm">Fördjupa dig med AI</p>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">
                        Ställ en fråga om det du just lärt dig
                      </p>
                    </div>
                    <div className="space-y-2">
                      {snabbfragor.map((q, i) => (
                        <motion.button key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => send(q)}
                          className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl border text-white/65 hover:text-white transition-colors"
                          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Meddelandebubblar */}
                {messages.map(msg => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : buttonColor }}>
                      <Bot size={11} className="text-white" />
                    </div>
                    <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5"
                      style={{
                        background: msg.role === 'user'
                          ? 'rgba(255,255,255,0.08)'
                          : msg.error ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${msg.error ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)'}`,
                        color: msg.error ? '#fca5a5' : 'rgba(255,255,255,0.88)',
                      }}>
                      {msg.role === 'user'
                        ? <p className="text-sm">{msg.content}</p>
                        : <div>{renderMd(msg.content)}</div>
                      }
                    </div>
                  </motion.div>
                ))}

                {/* Loading */}
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex gap-2.5 items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: buttonColor }}>
                      <Bot size={11} className="text-white" />
                    </div>
                    <div className="flex gap-1 px-3.5 py-3 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {[0,1,2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: buttonColor }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-end gap-2 rounded-xl border px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ställ en fråga..."
                    rows={1}
                    disabled={loading}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/25 focus:outline-none resize-none"
                    style={{ minHeight: 24, maxHeight: 100 }}
                  />
                  <motion.button
                    whileTap={input.trim() ? { scale: 0.92 } : {}}
                    onClick={() => send(input)}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: input.trim() && !loading ? buttonColor : 'rgba(255,255,255,0.06)',
                      color: input.trim() && !loading ? 'white' : 'rgba(255,255,255,0.2)',
                    }}>
                    <Send size={13} />
                  </motion.button>
                </div>
                <p className="text-white/20 text-xs text-center mt-1.5">
                  Drivs av Claude · Ger ej juridiska råd
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingFAQ;
