import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Calendar, Clock, Users, Video, MapPin, Mail, 
  Edit2, Trash2, Copy, Check, Download, Send,
  UserPlus, UserMinus, CheckCircle, XCircle, Phone,
  Link as LinkIcon, DollarSign, Share2, MoreVertical,
  AlertCircle, TrendingUp, Award
} from 'lucide-react';

function EventDetailModal({ event, onClose, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Mock participants data
  const mockParticipants = [
    {
      id: 'p1',
      name: 'Anna Andersson',
      email: 'anna@example.com',
      phone: '+46 70 123 4567',
      status: 'confirmed',
      registeredAt: '2025-01-15T10:00:00',
      attended: null
    },
    {
      id: 'p2',
      name: 'Erik Eriksson',
      email: 'erik@example.com',
      phone: '+46 70 234 5678',
      status: 'confirmed',
      registeredAt: '2025-01-16T14:30:00',
      attended: null
    },
    {
      id: 'p3',
      name: 'Maria Svensson',
      email: 'maria@example.com',
      phone: '+46 70 345 6789',
      status: 'waitlist',
      registeredAt: '2025-01-17T09:15:00',
      attended: null
    }
  ];

  const participants = event.participants || mockParticipants.filter(p => p.status === 'confirmed');
  const waitlist = event.waitlist || mockParticipants.filter(p => p.status === 'waitlist');

  const getMeetingIcon = (type) => {
    switch(type) {
      case 'zoom': return '🎥';
      case 'teams': return '💼';
      case 'meet': return '📹';
      case 'physical': return '📍';
      default: return '🔗';
    }
  };

  const getMeetingPlatformName = (type) => {
    switch(type) {
      case 'zoom': return 'Zoom';
      case 'teams': return 'Microsoft Teams';
      case 'meet': return 'Google Meet';
      case 'physical': return 'Fysiskt möte';
      default: return 'Online möte';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendReminder = () => {
    console.log('Sending reminders to all participants');
    // TODO: Implement reminder sending
  };

  const handleExportParticipants = () => {
    console.log('Exporting participants list');
    // TODO: Implement CSV export
  };

  const handleMarkAttendance = (participantId, attended) => {
    console.log(`Marking attendance for ${participantId}: ${attended}`);
    // TODO: Implement attendance marking
  };

  const handleMoveFromWaitlist = (participantId) => {
    console.log(`Moving participant ${participantId} from waitlist`);
    // TODO: Implement waitlist management
  };

  const handleRemoveParticipant = (participantId) => {
    if (confirm('Är du säker på att du vill ta bort denna deltagare?')) {
      console.log(`Removing participant ${participantId}`);
      // TODO: Implement participant removal
    }
  };

  const stats = {
    confirmed: participants.length,
    waitlist: waitlist.length,
    capacity: event.maxParticipants,
    attended: participants.filter(p => p.attended === true).length
  };

  const capacityPercentage = (stats.confirmed / stats.capacity) * 100;

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
          className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{event.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.category === 'webinar' ? 'bg-blue-400' :
                    event.category === 'workshop' ? 'bg-purple-400' :
                    event.category === 'training' ? 'bg-green-400' :
                    event.category === 'meeting' ? 'bg-orange-400' :
                    'bg-red-400'
                  }`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-blue-100">{event.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {showActions && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowActions(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <button
                          onClick={() => {
                            onEdit(event);
                            setShowActions(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50"
                        >
                          <Edit2 size={16} />
                          Redigera
                        </button>
                        <button
                          onClick={() => copyToClipboard(window.location.href)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50"
                        >
                          <Share2 size={16} />
                          Dela länk
                        </button>
                        <button
                          onClick={handleExportParticipants}
                          className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-50"
                        >
                          <Download size={16} />
                          Exportera lista
                        </button>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          onClick={() => {
                            onDelete(event.id);
                            setShowActions(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Ta bort
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.confirmed}</div>
                <div className="text-xs text-blue-100">Anmälda</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.capacity}</div>
                <div className="text-xs text-blue-100">Max platser</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.waitlist}</div>
                <div className="text-xs text-blue-100">Väntelista</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{Math.round(capacityPercentage)}%</div>
                <div className="text-xs text-blue-100">Beläggning</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Översikt
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'participants'
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Deltagare ({stats.confirmed})
              </button>
              <button
                onClick={() => setActiveTab('waitlist')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'waitlist'
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Väntelista ({stats.waitlist})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-350px)]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Eventdetaljer</h3>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Datum</div>
                        <div className="font-medium text-slate-900">
                          {new Date(event.startDate).toLocaleDateString('sv-SE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Tid</div>
                        <div className="font-medium text-slate-900">
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Kapacitet</div>
                        <div className="font-medium text-slate-900">
                          {stats.confirmed} / {stats.capacity} platser
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden w-48">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: `${capacityPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {event.isFree ? (
                      <div className="flex items-start gap-3">
                        <DollarSign className="text-slate-400 mt-1" size={18} />
                        <div>
                          <div className="text-sm text-slate-500">Pris</div>
                          <div className="font-medium text-green-600">Gratis</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <DollarSign className="text-slate-400 mt-1" size={18} />
                        <div>
                          <div className="text-sm text-slate-500">Pris</div>
                          <div className="font-medium text-slate-900">{event.price} SEK</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Meeting Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Mötesinfo</h3>
                    
                    <div className="flex items-start gap-3">
                      {event.meetingType === 'physical' ? (
                        <MapPin className="text-slate-400 mt-1" size={18} />
                      ) : (
                        <Video className="text-slate-400 mt-1" size={18} />
                      )}
                      <div>
                        <div className="text-sm text-slate-500">Plattform</div>
                        <div className="font-medium text-slate-900">
                          {getMeetingIcon(event.meetingType)} {getMeetingPlatformName(event.meetingType)}
                        </div>
                      </div>
                    </div>

                    {event.meetingType === 'physical' ? (
                      <div className="flex items-start gap-3">
                        <MapPin className="text-slate-400 mt-1" size={18} />
                        <div>
                          <div className="text-sm text-slate-500">Plats</div>
                          <div className="font-medium text-slate-900">{event.location}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">Möteslänk</span>
                          <button
                            onClick={() => copyToClipboard(event.meetingLink)}
                            className="p-1 hover:bg-blue-100 rounded transition-colors"
                          >
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-blue-600" />}
                          </button>
                        </div>
                        <a 
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 break-all font-mono"
                        >
                          {event.meetingLink}
                        </a>
                        {event.meetingId && (
                          <div className="mt-2 text-xs text-blue-800">
                            Meeting ID: <span className="font-mono">{event.meetingId}</span>
                          </div>
                        )}
                        {event.meetingPassword && (
                          <div className="text-xs text-blue-800">
                            Lösenord: <span className="font-mono">{event.meetingPassword}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Mail className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Instruktör</div>
                        <div className="font-medium text-slate-900">{event.instructorName}</div>
                        <div className="text-sm text-slate-600">{event.instructorEmail}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Snabbåtgärder</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={handleSendReminder}
                      className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                    >
                      <Send size={20} className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Skicka påminnelse</span>
                    </button>
                    <button
                      onClick={handleExportParticipants}
                      className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors"
                    >
                      <Download size={20} className="text-green-600" />
                      <span className="text-sm font-medium text-slate-900">Exportera lista</span>
                    </button>
                    <button
                      onClick={() => onEdit(event)}
                      className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors"
                    >
                      <Edit2 size={20} className="text-orange-600" />
                      <span className="text-sm font-medium text-slate-900">Redigera event</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(window.location.href)}
                      className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
                    >
                      <Share2 size={20} className="text-purple-600" />
                      <span className="text-sm font-medium text-slate-900">Dela event</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Participants Tab */}
            {activeTab === 'participants' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900">Bekräftade deltagare</h3>
                  <button
                    onClick={() => console.log('Add participant')}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <UserPlus size={16} />
                    Lägg till
                  </button>
                </div>

                {participants.length > 0 ? (
                  <div className="space-y-3">
                    {participants.map(participant => (
                      <div
                        key={participant.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {participant.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900">{participant.name}</div>
                              <div className="text-sm text-slate-600 flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail size={14} />
                                  {participant.email}
                                </span>
                                {participant.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone size={14} />
                                    {participant.phone}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                Anmäld: {new Date(participant.registeredAt).toLocaleString('sv-SE')}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {participant.attended === null ? (
                              <>
                                <button
                                  onClick={() => handleMarkAttendance(participant.id, true)}
                                  className="p-1.5 hover:bg-green-50 text-green-600 rounded transition-colors"
                                  title="Markera närvarande"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  onClick={() => handleMarkAttendance(participant.id, false)}
                                  className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                                  title="Markera frånvarande"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            ) : (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                participant.attended 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {participant.attended ? 'Närvarande' : 'Frånvarande'}
                              </span>
                            )}
                            <button
                              onClick={() => handleRemoveParticipant(participant.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                              title="Ta bort deltagare"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600">Inga deltagare ännu</p>
                  </div>
                )}
              </div>
            )}

            {/* Waitlist Tab */}
            {activeTab === 'waitlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900">Väntelista</h3>
                  {stats.confirmed < stats.capacity && waitlist.length > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      {stats.capacity - stats.confirmed} platser lediga
                    </div>
                  )}
                </div>

                {waitlist.length > 0 ? (
                  <div className="space-y-3">
                    {waitlist.map((participant, index) => (
                      <div
                        key={participant.id}
                        className="border border-orange-200 bg-orange-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                              #{index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-900">{participant.name}</div>
                              <div className="text-sm text-slate-600 flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1">
                                  <Mail size={14} />
                                  {participant.email}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                Anmäld: {new Date(participant.registeredAt).toLocaleString('sv-SE')}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {stats.confirmed < stats.capacity && (
                              <button
                                onClick={() => handleMoveFromWaitlist(participant.id)}
                                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                              >
                                Flytta till deltagare
                              </button>
                            )}
                            <button
                              onClick={() => handleRemoveParticipant(participant.id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600">Ingen väntelista</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EventDetailModal;