// src/components/events/EventListItem.jsx
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createSlug } from '../../utils/slugify';

function EventListItem({ event }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      month: date.toLocaleDateString('sv-SE', { month: 'short' }),
      day: date.getDate()
    };
  };

  const { month, day } = formatDate(event.startDate);

  const handleClick = () => {
    const slug = createSlug(event.title);
    navigate(`/events/${slug}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-start p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer last:border-b-0"
    >
      <div className="flex-shrink-0 text-center mr-6">
        <div className="text-sm text-slate-600 font-medium mb-1 capitalize">
          {month}
        </div>
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
}

export default EventListItem;