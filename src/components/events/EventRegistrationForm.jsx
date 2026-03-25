// src/components/events/EventRegistrationForm.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Mail, User, Phone, Building, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

function EventRegistrationForm({ event, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    brfName: '',
    position: '',
    dietary: '',
    questions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulera API-anrop (ersätt med din backend)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Skapa Teams-möte och skicka mail
      const registrationData = {
        ...formData,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.startDate,
        eventTime: event.startTime,
        teamsLink: generateTeamsLink(event) // Generera Teams-länk
      };

      console.log('Registration data:', registrationData);
      
      // Här skulle du skicka till din backend som:
      // 1. Sparar anmälan i databasen
      // 2. Skickar bekräftelsemejl med Teams-länk
      // 3. Lägger till i kalendern
      
      setIsSuccess(true);
      toast.success('Anmälan mottagen! Kolla din e-post för Teams-länk.');
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast.error('Något gick fel. Försök igen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generera Teams-länk (i produktion görs detta av backend)
  const generateTeamsLink = (event) => {
    // Detta är en placeholder - riktiga Teams-länkar genereras via Microsoft Graph API
    return `https://teams.microsoft.com/l/meetup-join/19%3ameeting_${event.id}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#FF5421] to-[#E04A1D] text-white p-6 rounded-t-2xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h2 className="text-2xl font-bold mb-2">Anmäl dig till seminariet</h2>
                <p className="text-white/90">{event.title}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{new Date(event.startDate).toLocaleDateString('sv-SE')}</span>
                  </div>
                  <div>•</div>
                  <div>{event.startTime} - {event.endTime}</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Förnamn *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                        placeholder="Anna"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Efternamn *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                        placeholder="Andersson"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    E-postadress *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                      placeholder="anna.andersson@example.com"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Teams-länken skickas hit
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Telefonnummer *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                      placeholder="070-123 45 67"
                    />
                  </div>
                </div>

                {/* BRF Info */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bostadsrättsförening *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      name="brfName"
                      value={formData.brfName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                      placeholder="BRF Solbacken"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Roll i styrelsen *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent"
                  >
                    <option value="">Välj din roll</option>
                    <option value="ordforande">Ordförande</option>
                    <option value="vice-ordforande">Vice ordförande</option>
                    <option value="kassör">Kassör</option>
                    <option value="sekreterare">Sekreterare</option>
                    <option value="ledamot">Ledamot</option>
                    <option value="suppleant">Suppleant</option>
                  </select>
                </div>

                {/* Questions */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Frågor eller önskemål? (frivilligt)
                  </label>
                  <textarea
                    name="questions"
                    value={formData.questions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent resize-none"
                    placeholder="Finns det något särskilt du vill att vi tar upp?"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="text-[#FF5421]" size={18} />
                    Vad händer efter anmälan?
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1 ml-6 list-disc">
                    <li>Du får en bekräftelse direkt via e-post</li>
                    <li>24h innan: Teams-länk och påminnelse</li>
                    <li>1h innan: SMS-påminnelse med länk</li>
                    <li>Efter seminariet: Inspelning och material</li>
                  </ul>
                </div>

                {/* GDPR */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="gdpr"
                    required
                    className="mt-1 w-4 h-4 text-[#FF5421] rounded focus:ring-[#FF5421]"
                  />
                  <label htmlFor="gdpr" className="text-xs text-slate-600">
                    Jag godkänner att mina uppgifter används för att skicka information om detta seminarium. 
                    Läs mer i vår <a href="/privacy" className="text-[#FF5421] hover:underline">integritetspolicy</a>.
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-[#FF5421] text-white rounded-lg font-bold text-lg hover:bg-[#E04A1D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Skickar anmälan...
                    </span>
                  ) : (
                    'Bekräfta anmälan'
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Tack för din anmälan!
              </h3>
              <p className="text-slate-600 mb-6">
                Vi har skickat en bekräftelse till <strong>{formData.email}</strong>
              </p>
              
              <div className="bg-slate-50 rounded-lg p-6 text-left max-w-md mx-auto mb-6">
                <h4 className="font-semibold text-slate-900 mb-3">Nästa steg:</h4>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#FF5421] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <span>Kolla din inkorg för bekräftelse</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#FF5421] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <span>Lägg till eventet i din kalender</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#FF5421] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <span>Teams-länk skickas 24h innan</span>
                  </li>
                </ol>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
              >
                Stäng
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventRegistrationForm;