import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { createSlug } from '../../utils/slugify';

function EventsSidebar() {
  const { events, loading } = useEvents();
  const navigate = useNavigate();

  // Filtrera kommande events och ta de 4 första
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) >= new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 4);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleDateString('sv-SE', { month: 'short' }).replace('.', ''),
      day: date.getDate()
    };
  };

  const handleEventClick = (event) => {
    const slug = createSlug(event.title);
    navigate(`/events/${slug}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-b-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5421]"></div>
        </div>
      </div>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <div className="bg-white rounded-b-xl shadow-lg p-8">
        <p className="text-center text-slate-500">
          Inga kommande seminarier just nu. Håll utkik!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
      {upcomingEvents.map((event, index) => {
        const { month, day } = formatDate(event.startDate);
        return (
          <div 
            key={event.id}
            onClick={() => handleEventClick(event)}
            className={`flex items-start p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
              index !== upcomingEvents.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex-shrink-0 text-center mr-6">
              <div className="text-sm text-slate-600 font-medium mb-1 capitalize">{month}</div>
              <div className="text-4xl font-bold text-[#FF5421]">{day}</div>
            </div>
            <div className="flex-1">
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 hover:text-[#FF5421] transition-colors">
                {event.title}
              </h4>
            </div>
          </div>
        );
      })}
      
      {/* "Se alla seminarier"-knapp */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/events')}
          className="w-full py-3 bg-[#FF5421] text-white rounded-lg font-semibold hover:bg-[#E04A1D] transition-colors"
        >
          Se alla seminarier →
        </motion.button>
      </div>
    </div>
  );
}

export default EventsSidebar;