import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, MapPin } from 'lucide-react';

function EventCard({ event, index, onViewDetails }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const categoryColors = {
    webinar: 'bg-[#FF5421] text-white',
    workshop: 'bg-purple-500 text-white',
    training: 'bg-green-500 text-white',
    meeting: 'bg-[#FF5421] text-white',
    conference: 'bg-red-500 text-white'
  };

  const categoryLabels = {
    webinar: 'Webbinarium',
    workshop: 'Workshop',
    training: 'Utbildning',
    meeting: 'Seminarium',
    conference: 'Konferens'
  };

  const spotsLeft = event.maxParticipants - (event.participants?.length || 0);
  const categoryColor = categoryColors[event.category] || 'bg-[#FF5421] text-white';
  const categoryLabel = categoryLabels[event.category] || 'Seminarium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
    >
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.thumbnailUrl || 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`${categoryColor} px-3 py-1 rounded-full text-xs font-semibold`}>
            {categoryLabel}
          </span>
          {event.meetingType !== 'physical' && (
            <span className="bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Video size={12} />
              Online
            </span>
          )}
        </div>

        {/* Free Badge */}
        {event.isFree && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Gratis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FF5421] transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={16} className="text-[#FF5421]" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock size={16} className="text-[#FF5421]" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>

          {event.meetingType === 'physical' ? (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-[#FF5421]" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Video size={16} className="text-[#FF5421]" />
              <span>Microsoft Teams</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users size={16} className="text-[#FF5421]" />
            <span>
              {spotsLeft > 10 ? (
                `${spotsLeft} platser kvar`
              ) : spotsLeft > 0 ? (
                <span className="text-yellow-600 font-semibold">Endast {spotsLeft} platser kvar!</span>
              ) : (
                <span className="text-red-600 font-semibold">Fullbokat</span>
              )}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails(event)}
          disabled={spotsLeft === 0}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            spotsLeft === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#FF5421] text-white hover:bg-[#E04A1D]'
          }`}
        >
          {spotsLeft === 0 ? 'Fullbokat' : 'Läs mer & Anmäl dig'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default EventCard;