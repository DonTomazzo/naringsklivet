import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Upload, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

function SurveyEmailModal({ survey, onClose, onSend }) {
  const [emailText, setEmailText] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [subject, setSubject] = useState(`Feedback önskas: ${survey.title}`);
  const [message, setMessage] = useState(
    `Hej!\n\nDu har blivit inbjuden att delta i enkäten "${survey.title}".\n\nKlicka på länken nedan för att svara:\n{SURVEY_LINK}\n\nTack för din tid!\n\nMed vänliga hälsningar`
  );
  const [sending, setSending] = useState(false);
  const [validEmails, setValidEmails] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const parseEmails = () => {
    const emails = emailText
      .split(/[\n,;]/)
      .map(e => e.trim())
      .filter(e => e.length > 0);

    const valid = [];
    const invalid = [];

    emails.forEach(email => {
      if (validateEmail(email)) {
        valid.push(email);
      } else {
        invalid.push(email);
      }
    });

    setValidEmails(valid);
    setInvalidEmails(invalid);
    setEmailList(valid);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setEmailText(text);
      
      // Auto-parse after upload
      setTimeout(() => {
        const emails = text
          .split(/[\n,;]/)
          .map(e => e.trim())
          .filter(e => e.length > 0);

        const valid = [];
        const invalid = [];

        emails.forEach(email => {
          if (validateEmail(email)) {
            valid.push(email);
          } else {
            invalid.push(email);
          }
        });

        setValidEmails(valid);
        setInvalidEmails(invalid);
        setEmailList(valid);
      }, 100);
    };
    reader.readAsText(file);
  };

  const handleSend = async () => {
    if (validEmails.length === 0) {
      toast.error('Inga giltiga email-adresser');
      return;
    }

    setSending(true);

    // Simulate sending
    setTimeout(() => {
      const invites = validEmails.map(email => ({
        email,
        surveyId: survey.id,
        token: `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sentAt: new Date().toISOString(),
        opened: false,
        completed: false
      }));

      onSend(invites);
      toast.success(`${validEmails.length} inbjudningar skickade!`);
      setSending(false);
      onClose();
    }, 2000);
  };

  const surveyLink = `${window.location.origin}/survey/${survey.slug}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Skicka ut enkät</h2>
                <p className="text-blue-100">{survey.title}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Email-adresser
                </label>
                <div className="space-y-3">
                  <textarea
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder="Klistra in email-adresser här (en per rad, eller separerade med komma/semikolon)&#10;&#10;exempel:&#10;anna@example.com&#10;erik@example.com&#10;maria@example.com"
                  />
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={parseEmails}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Validera emails
                    </button>
                    
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload size={18} />
                      Ladda upp CSV/TXT
                      <input
                        type="file"
                        accept=".csv,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(surveyLink);
                        toast.success('Länk kopierad!');
                      }}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
                    >
                      <Copy size={18} />
                      Kopiera länk
                    </button>
                  </div>
                </div>

                {/* Validation Results */}
                {(validEmails.length > 0 || invalidEmails.length > 0) && (
                  <div className="mt-4 space-y-3">
                    {validEmails.length > 0 && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="text-green-600" size={20} />
                          <span className="font-medium text-green-900">
                            {validEmails.length} giltiga email{validEmails.length !== 1 && 's'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {validEmails.slice(0, 10).map((email, i) => (
                            <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                              {email}
                            </span>
                          ))}
                          {validEmails.length > 10 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                              +{validEmails.length - 10} fler
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {invalidEmails.length > 0 && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="text-red-600" size={20} />
                          <span className="font-medium text-red-900">
                            {invalidEmails.length} ogiltig{invalidEmails.length !== 1 && 'a'} email{invalidEmails.length !== 1 && 's'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {invalidEmails.map((email, i) => (
                            <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm line-through">
                              {email}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Email Template */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Ämne
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Meddelande
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                  <code className="bg-gray-100 px-2 py-1 rounded">{'{SURVEY_LINK}'}</code> kommer att ersättas med en unik spårbar länk för varje mottagare
                </p>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-slate-900 mb-2">Förhandsvisning</div>
                <div className="text-sm text-slate-700 whitespace-pre-wrap">
                  {message.replace('{SURVEY_LINK}', surveyLink)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {validEmails.length > 0 && (
                <span>Redo att skicka till <strong>{validEmails.length}</strong> mottagare</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={sending}
                className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleSend}
                disabled={sending || validEmails.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Skickar...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Skicka inbjudningar
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SurveyEmailModal;