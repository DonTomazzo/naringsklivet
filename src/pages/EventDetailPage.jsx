import { useState } from 'react'; 
import { motion } from 'framer-motion';
import EventRegistrationForm from '../components/events/EventRegistrationForm';
import { Calendar, Clock, Users, Video, Mail, ArrowLeft, Laptop, Wifi, CheckCircle, Download, Link as LinkIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventsContext';
import { createSlug } from '../utils/slugify';

function EventDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useEvents();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const event = events.find(e => createSlug(e.title) === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5421]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Seminariet hittades inte</h2>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-[#FF5421] text-white rounded-lg hover:bg-[#E04A1D] transition-colors"
          >
            Tillbaka till seminarier
          </button>
        </div>
      </div>
    );
  }

  const categoryColors = {
    webinar: 'bg-[#FF5421]',
    workshop: 'bg-purple-500',
    training: 'bg-green-500',
    meeting: 'bg-[#FF5421]',
    conference: 'bg-red-500'
  };

  const categoryLabels = {
    webinar: 'Webbinarium',
    workshop: 'Workshop',
    training: 'Utbildning',
    meeting: 'Seminarium',
    conference: 'Konferens'
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('sv-SE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatShortDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('sv-SE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const categoryColor = categoryColors[event.category] || 'bg-[#FF5421]';
  const categoryLabel = categoryLabels[event.category] || 'Seminarium';
  const spotsLeft = event.maxParticipants - (event.participants?.length || 0);

  // Online seminarie features
  const platformIcons = {
    teams: '🟣',
    meet: '🟢',
    zoom: '🔵'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.thumbnailUrl || 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <button
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-white mb-6 hover:text-[#FF5421] transition-colors"
            >
              <ArrowLeft size={20} />
              Tillbaka till seminarier
            </button>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className={`${categoryColor} text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                {categoryLabel}
              </span>
              <span className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Video size={16} />
                Online Seminarium
              </span>
              {event.isFree && (
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Kostnadsfritt
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-[#FF5421]" />
                <span className="font-medium">{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#FF5421]" />
                <span className="font-medium">{event.startTime} - {event.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop size={20} className="text-[#FF5421]" />
                <span className="font-medium">Delta hemifrån</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Om seminariet
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  {event.description}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Detta onlineseminarium ger dig praktisk kunskap som du direkt kan tillämpa i din styrelseroll. Vi går igenom verkliga exempel och du får möjlighet att ställa frågor direkt till våra experter.
                </p>
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Det här tar vi upp
              </h2>
              <div className="space-y-4">
                {[
                  'Aktuell lagstiftning och hur den påverkar er förening',
                  'Praktiska tips från erfarna styrelseledamöter',
                  'Vanliga fallgropar och hur ni undviker dem',
                  'Checklista för er nästa styrelsemöte',
                  'Tid för frågor och svar'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#FF5421] mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 rounded-xl p-8 border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="text-[#FF5421]" size={24} />
                <h3 className="text-xl font-bold text-slate-900">
                  Tekniska krav
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Stabil internetanslutning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Dator, surfplatta eller mobil</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Webbläsare (Chrome, Safari, Edge)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Mikrofon för frågor (frivilligt)</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-sm text-slate-600">
                  💡 <strong>Tips:</strong> Länk till seminariet skickas via e-post 24 timmar innan start. 
                  Ingen installation krävs - klicka bara på länken och delta direkt i webbläsaren.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900 text-white rounded-xl shadow-xl p-8 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF5421] rounded-full mb-4">
                  <Video size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#FF5421]">Anmäl dig idag</h3>
                <p className="text-slate-300 text-sm mt-2">
                  Säkra din plats på detta populära seminarium
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-[#FF5421]" />
                    <span className="text-slate-300 text-sm">Datum</span>
                  </div>
                  <span className="font-semibold text-sm">{formatShortDate(event.startDate)}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#FF5421]" />
                    <span className="text-slate-300 text-sm">Tid</span>
                  </div>
                  <span className="font-semibold text-sm">{event.startTime} - {event.endTime}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Video size={18} className="text-[#FF5421]" />
                    <span className="text-slate-300 text-sm">Plattform</span>
                  </div>
                  <span className="font-semibold text-sm">Microsoft Teams</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#FF5421]" />
                    <span className="text-slate-300 text-sm">Längd</span>
                  </div>
                  <span className="font-semibold text-sm">90 minuter</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#FF5421]" />
                    <span className="text-slate-300 text-sm">Lediga platser</span>
                  </div>
                  <span className="font-semibold text-sm">
                    {spotsLeft > 10 ? (
                      <span className="text-green-400">{spotsLeft} kvar</span>
                    ) : (
                      <span className="text-yellow-400">Endast {spotsLeft} kvar!</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Price Badge */}
              {event.isFree ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6 text-center">
                  <div className="text-2xl font-bold text-green-400">Kostnadsfritt</div>
                  <div className="text-sm text-green-300 mt-1">Ordinarie pris: 1 495 kr</div>
                </div>
              ) : (
                <div className="bg-[#FF5421]/20 border border-[#FF5421] rounded-lg p-4 mb-6 text-center">
                  <div className="text-sm text-slate-300 line-through">Ordinarie: {event.price * 1.5} kr</div>
                  <div className="text-3xl font-bold text-[#FF5421]">{event.price} kr</div>
                  <div className="text-sm text-slate-300 mt-1">Kampanjpris</div>
                </div>
              )}

              <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => setIsRegistrationOpen(true)}
  className="w-full px-6 py-4 bg-[#FF5421] text-white rounded-lg hover:bg-[#E04A1D] transition-colors font-bold text-lg shadow-lg mb-4"
>
  Anmäl dig nu
</motion.button>

              <div className="text-center text-xs text-slate-400 mb-6">
                ✓ Ingen bindningstid • ✓ Certifikat ingår • ✓ Inspelning tillgänglig
              </div>

              {/* What's Included */}
              <div className="bg-slate-800 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">Detta ingår:</h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#FF5421]" />
                    <span>Live-seminarium (90 min)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#FF5421]" />
                    <span>Inspelning i 30 dagar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#FF5421]" />
                    <span>PDF-material att ladda ner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#FF5421]" />
                    <span>Deltagarcertifikat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#FF5421]" />
                    <span>Q&A med experter</span>
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Seminarieledar</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FF5421] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {event.instructorName?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <div className="font-semibold">{event.instructorName || 'Expert Juridik'}</div>
                    <div className="text-sm text-slate-400">
                      Specialist i bostadsrättslagen
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

           {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="text-center space-y-4">
                <div>
                  <div className="text-3xl font-bold text-[#FF5421]">400+</div>
                  <div className="text-sm text-slate-600">Nöjda deltagare</div>
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <div className="text-sm text-slate-600">
                  "Bästa onlineseminariet jag deltagit i!"
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Modal - Lägg till HÄR, precis innan sista </div> */}
      <EventRegistrationForm
        event={event}
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={() => {
          console.log('Registration successful!');
        }}
      />
    </div>
  );
}

export default EventDetailPage;