import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Plus, Search, Filter, List, Grid,
  Clock, Users, MapPin, Video, ChevronLeft, ChevronRight
} from 'lucide-react';
import EventCreateModal from './EventCreateModal';

import { toast } from 'react-toastify';

function EventsSection() {
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Introduktion till Digital Marknadsföring',
      description: 'Lär dig grunderna i digital marknadsföring',
      category: 'webinar',
      startDate: '2025-01-25',
      startTime: '10:00',
      endTime: '12:00',
      meetingType: 'zoom',
      meetingLink: 'https://zoom.us/j/123456',
      instructorName: 'Anna Andersson',
      instructorEmail: 'anna@example.com',
      maxParticipants: 50,
      participants: [],
      waitlist: [],
      isFree: true,
      sendReminders: true
    },
    {
      id: 'event-2',
      title: 'Excel för nybörjare',
      description: 'Grundläggande Excel-funktioner',
      category: 'training',
      startDate: '2025-01-28',
      startTime: '13:00',
      endTime: '15:00',
      meetingType: 'teams',
      meetingLink: 'https://teams.microsoft.com/...',
      instructorName: 'Erik Eriksson',
      instructorEmail: 'erik@example.com',
      maxParticipants: 30,
      participants: [],
      waitlist: [],
      isFree: false,
      price: 500,
      sendReminders: true
    }
  ]);

  const categories = [
    { value: 'all', label: 'Alla', color: 'bg-gray-100' },
    { value: 'webinar', label: 'Webinar', color: 'bg-blue-100' },
    { value: 'workshop', label: 'Workshop', color: 'bg-purple-100' },
    { value: 'training', label: 'Utbildning', color: 'bg-green-100' },
    { value: 'meeting', label: 'Möte', color: 'bg-orange-100' },
    { value: 'conference', label: 'Konferens', color: 'bg-red-100' }
  ];

  const getMeetingIcon = (type) => {
    switch(type) {
      case 'zoom': return '🎥';
      case 'teams': return '💼';
      case 'meet': return '📹';
      case 'physical': return '📍';
      default: return '🔗';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => event.startDate === dateStr);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
    setShowCreateModal(false);
    toast.success('Event skapat!');
  };

  // Calendar generation
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });

  // Stats
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => new Date(e.startDate) >= new Date()).length;
  const totalParticipants = events.reduce((sum, e) => sum + e.participants.length, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalEvents}</div>
          <p className="text-sm text-slate-600 mt-1">Totala events</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{upcomingEvents}</div>
          <p className="text-sm text-slate-600 mt-1">Kommande</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalParticipants}</div>
          <p className="text-sm text-slate-600 mt-1">Deltagare</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Video className="text-orange-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {events.filter(e => e.meetingType !== 'physical').length}
          </div>
          <p className="text-sm text-slate-600 mt-1">Online events</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Events & Utbildningar</h2>
              <p className="text-sm text-slate-600 mt-1">
                Skapa och hantera online-utbildningar och events
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Nytt event
            </button>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök events..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setView('calendar')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'calendar' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                <Calendar size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 capitalize">{monthName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Idag
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday headers */}
              {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                const isCurrentDay = isToday(day.date);

                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border rounded-lg ${
                      !day.isCurrentMonth 
                        ? 'bg-gray-50 opacity-40' 
                        : isCurrentDay
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${
                      isCurrentDay ? 'text-blue-600' : 'text-slate-900'
                    }`}>
                      {day.date.getDate()}
                    </div>

                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded truncate cursor-pointer ${
                            event.category === 'webinar' ? 'bg-blue-100 text-blue-700' :
                            event.category === 'workshop' ? 'bg-purple-100 text-purple-700' :
                            event.category === 'training' ? 'bg-green-100 text-green-700' :
                            event.category === 'meeting' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}
                          title={event.title}
                        >
                          {getMeetingIcon(event.meetingType)} {event.startTime} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-slate-500 px-2">
                          +{dayEvents.length - 2} till
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="p-6">
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-slate-900 text-lg">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.category === 'webinar' ? 'bg-blue-100 text-blue-700' :
                            event.category === 'workshop' ? 'bg-purple-100 text-purple-700' :
                            event.category === 'training' ? 'bg-green-100 text-green-700' :
                            event.category === 'meeting' ? 'bg-orange-100 text-orange-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {categories.find(c => c.value === event.category)?.label}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">{event.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(event.startDate).toLocaleDateString('sv-SE')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            {event.participants.length}/{event.maxParticipants}
                          </div>
                          <div className="flex items-center gap-1">
                            {event.meetingType === 'physical' ? <MapPin size={16} /> : <Video size={16} />}
                            {getMeetingIcon(event.meetingType)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        {event.isFree ? (
                          <span className="text-green-600 font-semibold">Gratis</span>
                        ) : (
                          <span className="font-semibold text-slate-900">{event.price} SEK</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">Inga events hittades</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <EventCreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateEvent}
        />
      )}
    </div>
  );
}

export default EventsSection;