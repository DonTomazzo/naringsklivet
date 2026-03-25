import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Calendar, Clock, Users, Video, MapPin, DollarSign,
  MoreVertical, Edit2, Trash2, Eye, Copy, Share2,
  TrendingUp, AlertCircle, CheckCircle
} from 'lucide-react';

function EventsList({ events, onEventClick, onEdit, onDelete, onDuplicate }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const categories = {
    webinar: { color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', label: 'Webinar' },
    workshop: { color: 'bg-purple-500', textColor: 'text-purple-700', bgLight: 'bg-purple-50', label: 'Workshop' },
    training: { color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50', label: 'Utbildning' },
    meeting: { color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50', label: 'Möte' },
    conference: { color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', label: 'Konferens' }
  };

  const getMeetingIcon = (type) => {
    switch(type) {
      case 'zoom': return '🎥';
      case 'teams': return '💼';
      case 'meet': return '📹';
      case 'physical': return '📍';
      default: return '🔗';
    }
  };

  const getMeetingLabel = (type) => {
    switch(type) {
      case 'zoom': return 'Zoom';
      case 'teams': return 'Teams';
      case 'meet': return 'Meet';
      case 'physical': return 'Fysiskt';
      default: return 'Online';
    }
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.startDate);
    const participants = event.participants?.length || 0;
    const capacity = event.maxParticipants;
    const capacityPercent = (participants / capacity) * 100;

    if (eventDate < now) {
      return { 
        label: 'Avslutad', 
        color: 'bg-gray-100 text-gray-700',
        icon: CheckCircle 
      };
    }

    if (capacityPercent >= 100) {
      return { 
        label: 'Fullt', 
        color: 'bg-red-100 text-red-700',
        icon: AlertCircle 
      };
    }

    if (capacityPercent >= 80) {
      return { 
        label: 'Nästan fullt', 
        color: 'bg-orange-100 text-orange-700',
        icon: TrendingUp 
      };
    }

    return { 
      label: 'Öppet', 
      color: 'bg-green-100 text-green-700',
      icon: CheckCircle 
    };
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('sv-SE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateStr) => {
    return new Date(dateStr) >= new Date();
  };

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA - dateB;
  });

  const upcomingEvents = sortedEvents.filter(e => isUpcoming(e.startDate));
  const pastEvents = sortedEvents.filter(e => !isUpcoming(e.startDate));

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Kommande events ({upcomingEvents.length})
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => {
              const cat = categories[event.category] || categories.webinar;
              const status = getEventStatus(event);
              const participants = event.participants?.length || 0;
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => onEventClick && onEventClick(event)}
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className={`${cat.color} rounded-lg p-3 text-white flex-shrink-0 text-center min-w-16`}>
                      <div className="text-xs font-semibold opacity-90">
                        {new Date(event.startDate).toLocaleDateString('sv-SE', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-2xl font-bold">
                        {new Date(event.startDate).getDate()}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cat.bgLight} ${cat.textColor}`}>
                              {cat.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">{event.description}</p>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu(activeMenu === event.id ? null : event.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical size={18} className="text-slate-600" />
                          </button>

                          {activeMenu === event.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-40"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(null);
                                }}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEventClick && onEventClick(event);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Eye size={16} />
                                  Visa detaljer
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit && onEdit(event);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Edit2 size={16} />
                                  Redigera
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDuplicate && onDuplicate(event);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Copy size={16} />
                                  Duplicera
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(window.location.href);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Share2 size={16} />
                                  Dela
                                </button>
                                <div className="border-t border-gray-200 my-2"></div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete && onDelete(event.id);
                                    setActiveMenu(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={16} />
                                  Ta bort
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-slate-400" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {event.meetingType === 'physical' ? (
                            <MapPin size={16} className="text-slate-400" />
                          ) : (
                            <Video size={16} className="text-slate-400" />
                          )}
                          <span>{getMeetingIcon(event.meetingType)} {getMeetingLabel(event.meetingType)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Users size={16} className="text-slate-400" />
                          <span>{participants}/{event.maxParticipants}</span>
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden ml-1">
                            <div 
                              className={`h-full ${cat.color} transition-all`}
                              style={{ width: `${(participants / event.maxParticipants) * 100}%` }}
                            />
                          </div>
                        </div>

                        {!event.isFree && (
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={16} className="text-slate-400" />
                            <span className="font-semibold">{event.price} SEK</span>
                          </div>
                        )}
                      </div>

                      {/* Status & Instructor */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                          </span>
                          {event.isFree && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              Gratis
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          Instruktör: <span className="font-medium text-slate-700">{event.instructorName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Tidigare events ({pastEvents.length})
          </h3>
          <div className="space-y-3">
            {pastEvents.map((event, index) => {
              const cat = categories[event.category] || categories.webinar;
              const participants = event.participants?.length || 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-5 opacity-75 hover:opacity-100 transition-all cursor-pointer"
                  onClick={() => onEventClick && onEventClick(event)}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-400 rounded-lg p-3 text-white flex-shrink-0 text-center min-w-16">
                      <div className="text-xs font-semibold opacity-90">
                        {new Date(event.startDate).toLocaleDateString('sv-SE', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-2xl font-bold">
                        {new Date(event.startDate).getDate()}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-700 text-lg">{event.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700`}>
                              {cat.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-1">{event.description}</p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick && onEventClick(event);
                          }}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Eye size={18} className="text-slate-600" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={16} />
                          <span>{participants} deltagare</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                          Avslutad
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-20 h-20 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Inga events hittades</h3>
          <p className="text-slate-600">Skapa ditt första event för att komma igång</p>
        </div>
      )}
    </div>
  );
}

export default EventsList;