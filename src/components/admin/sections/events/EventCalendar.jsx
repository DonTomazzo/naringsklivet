import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Clock, Users, Video, MapPin, Plus
} from 'lucide-react';

function EventCalendar({ events, onEventClick, onDateClick, onCreateEvent }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  const categories = {
    webinar: { color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
    workshop: { color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50' },
    training: { color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' },
    meeting: { color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50' },
    conference: { color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.startDate === dateStr);
  };

  const getEventsForTimeSlot = (date, hour) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      if (event.startDate !== dateStr) return false;
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const previousPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const nextPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = view === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const monthName = currentDate.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white capitalize">
            {view === 'month' ? monthName : 
             view === 'week' ? `Vecka ${Math.ceil((currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) / 7)}` :
             currentDate.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={previousPeriod} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goToToday} className="px-3 py-1.5 text-sm bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white font-medium">
              Idag
            </button>
            <button onClick={nextPeriod} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {['month', 'week', 'day'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === v ? 'bg-white text-blue-600' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {v === 'month' ? 'Månad' : v === 'week' ? 'Vecka' : 'Dag'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {view === 'month' && (
          <div className="grid grid-cols-7 gap-2">
            {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600 py-2">{day}</div>
            ))}

            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isCurrentDay = isToday(day.date);

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onDateClick && onDateClick(day.date)}
                  className={`min-h-28 p-2 border rounded-lg cursor-pointer ${
                    !day.isCurrentMonth ? 'bg-gray-50 opacity-40 border-gray-200' :
                    isCurrentDay ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' :
                    'bg-white border-gray-200 hover:bg-gray-50'
                  } transition-all`}
                >
                  <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? 'text-blue-600' : 'text-slate-900'}`}>
                    {day.date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => {
                      const cat = categories[event.category] || categories.webinar;
                      return (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick && onEventClick(event);
                          }}
                          className={`text-xs px-2 py-1 rounded truncate ${cat.bgLight} ${cat.textColor} font-medium hover:shadow-sm transition-all cursor-pointer`}
                          title={event.title}
                        >
                          <Clock size={10} className="inline mr-1" />
                          {event.startTime} {event.title}
                        </motion.div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-slate-500 px-2 font-medium">+{dayEvents.length - 3} till</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {view === 'week' && (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-xs font-semibold text-slate-600"></div>
                {days.map((day, index) => {
                  const isCurrentDay = isToday(day);
                  return (
                    <div key={index} className={`text-center p-2 rounded-lg ${isCurrentDay ? 'bg-blue-100 text-blue-600' : 'text-slate-600'}`}>
                      <div className="text-xs font-semibold">{day.toLocaleDateString('sv-SE', { weekday: 'short' })}</div>
                      <div className={`text-lg font-bold ${isCurrentDay ? 'text-blue-600' : 'text-slate-900'}`}>{day.getDate()}</div>
                    </div>
                  );
                })}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {hours.filter(h => h >= 6 && h <= 22).map(hour => (
                  <div key={hour} className="grid grid-cols-8 gap-2 border-t border-gray-100">
                    <div className="text-xs text-slate-500 py-2 pr-2 text-right">{hour.toString().padStart(2, '0')}:00</div>
                    {days.map((day, index) => {
                      const slotEvents = getEventsForTimeSlot(day, hour);
                      return (
                        <div key={index} onClick={() => onDateClick && onDateClick(day)} className="min-h-12 p-1 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                          {slotEvents.map(event => {
                            const cat = categories[event.category] || categories.webinar;
                            return (
                              <motion.div
                                key={event.id}
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEventClick && onEventClick(event);
                                }}
                                className={`text-xs px-2 py-1 rounded truncate ${cat.bgLight} ${cat.textColor} font-medium mb-1 cursor-pointer`}
                                title={event.title}
                              >
                                {event.title}
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'day' && (
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="font-semibold text-blue-900">
                {currentDate.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-1">
              {hours.filter(h => h >= 6 && h <= 22).map(hour => {
                const slotEvents = getEventsForTimeSlot(currentDate, hour);
                return (
                  <div key={hour} className="flex gap-3 border-t border-gray-100 py-2 hover:bg-gray-50 rounded transition-colors">
                    <div className="w-16 text-sm text-slate-600 font-medium">{hour.toString().padStart(2, '0')}:00</div>
                    <div className="flex-1 space-y-2">
                      {slotEvents.length > 0 ? (
                        slotEvents.map(event => {
                          const cat = categories[event.category] || categories.webinar;
                          return (
                            <motion.div
                              key={event.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => onEventClick && onEventClick(event)}
                              className={`${cat.bgLight} border ${cat.color.replace('bg-', 'border-')} rounded-lg p-3 cursor-pointer transition-all hover:shadow-md`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className={`font-semibold ${cat.textColor}`}>{event.title}</div>
                                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                                    <span className="flex items-center gap-1">
                                      <Clock size={12} />
                                      {event.startTime} - {event.endTime}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users size={12} />
                                      {event.participants?.length || 0}/{event.maxParticipants}
                                    </span>
                                    {event.meetingType === 'physical' ? <MapPin size={12} /> : <Video size={12} />}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div
                          onClick={() => onCreateEvent && onCreateEvent(currentDate, `${hour.toString().padStart(2, '0')}:00`)}
                          className="text-xs text-slate-400 hover:text-blue-500 cursor-pointer flex items-center gap-1"
                        >
                          <Plus size={12} />
                          Skapa event
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCalendar;