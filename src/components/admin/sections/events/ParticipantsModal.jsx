import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Search, Filter, Download, Send, Mail, Phone, 
  CheckCircle, XCircle, UserPlus, Trash2, MoreVertical,
  Clock, AlertCircle, Users, TrendingUp
} from 'lucide-react';

function ParticipantsModal({ event, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('confirmed');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const mockParticipants = [
    {
      id: 'p1',
      name: 'Anna Andersson',
      email: 'anna@example.com',
      phone: '+46 70 123 4567',
      status: 'confirmed',
      registeredAt: '2025-01-15T10:00:00',
      attended: null,
      paymentStatus: 'paid'
    },
    {
      id: 'p2',
      name: 'Erik Eriksson',
      email: 'erik@example.com',
      phone: '+46 70 234 5678',
      status: 'confirmed',
      registeredAt: '2025-01-16T14:30:00',
      attended: true,
      paymentStatus: 'paid'
    },
    {
      id: 'p3',
      name: 'Maria Svensson',
      email: 'maria@example.com',
      phone: '+46 70 345 6789',
      status: 'confirmed',
      registeredAt: '2025-01-17T09:15:00',
      attended: false,
      paymentStatus: 'pending'
    },
    {
      id: 'p4',
      name: 'Johan Johansson',
      email: 'johan@example.com',
      phone: '+46 70 456 7890',
      status: 'waitlist',
      registeredAt: '2025-01-18T11:20:00',
      attended: null,
      paymentStatus: 'pending'
    },
    {
      id: 'p5',
      name: 'Sara Larsson',
      email: 'sara@example.com',
      phone: '+46 70 567 8901',
      status: 'waitlist',
      registeredAt: '2025-01-19T16:45:00',
      attended: null,
      paymentStatus: 'pending'
    }
  ];

  const participants = mockParticipants.filter(p => 
    activeTab === 'confirmed' ? p.status === 'confirmed' : p.status === 'waitlist'
  );

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'attended' && p.attended === true) ||
      (filterStatus === 'absent' && p.attended === false) ||
      (filterStatus === 'pending' && p.attended === null);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockParticipants.filter(p => p.status === 'confirmed').length,
    attended: mockParticipants.filter(p => p.attended === true).length,
    absent: mockParticipants.filter(p => p.attended === false).length,
    pending: mockParticipants.filter(p => p.attended === null && p.status === 'confirmed').length,
    waitlist: mockParticipants.filter(p => p.status === 'waitlist').length,
    capacity: event.maxParticipants
  };

  const handleSelectParticipant = (participantId) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSelectAll = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map(p => p.id));
    }
  };

  const handleMarkAttendance = (participantId, attended) => {
    console.log(`Marking attendance for ${participantId}: ${attended}`);
  };

  const handleMoveFromWaitlist = (participantId) => {
    console.log(`Moving ${participantId} from waitlist to confirmed`);
  };

  const handleRemoveParticipant = (participantId) => {
    if (confirm('Är du säker på att du vill ta bort denna deltagare?')) {
      console.log(`Removing participant ${participantId}`);
    }
  };

  const handleSendReminders = () => {
    console.log(`Sending reminders to ${selectedParticipants.length} participants`);
  };

  const handleExport = () => {
    console.log('Exporting participant list');
  };

  const attendanceRate = stats.total > 0 ? Math.round((stats.attended / stats.total) * 100) : 0;

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
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Deltagarhantering</h2>
                <p className="text-purple-100">{event.title}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-purple-100">Totalt</div>
              </div>
              <div className="bg-green-500/30 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">{stats.attended}</div>
                <div className="text-xs text-purple-100">Närvarande</div>
              </div>
              <div className="bg-red-500/30 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">{stats.absent}</div>
                <div className="text-xs text-purple-100">Frånvarande</div>
              </div>
              <div className="bg-orange-500/30 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">{stats.waitlist}</div>
                <div className="text-xs text-purple-100">Väntelista</div>
              </div>
              <div className="bg-blue-500/30 backdrop-blur rounded-lg p-3">
                <div className="text-2xl font-bold">{attendanceRate}%</div>
                <div className="text-xs text-purple-100">Närvaro</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'confirmed'
                    ? 'border-purple-500 text-purple-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Bekräftade ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('waitlist')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'waitlist'
                    ? 'border-purple-500 text-purple-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Väntelista ({stats.waitlist})
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Sök deltagare..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {activeTab === 'confirmed' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Alla</option>
                  <option value="attended">Närvarande</option>
                  <option value="absent">Frånvarande</option>
                  <option value="pending">Väntande</option>
                </select>
              )}

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <UserPlus size={20} />
                Lägg till
              </button>
            </div>

            {selectedParticipants.length > 0 && (
              <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3">
                <span className="text-sm font-medium text-purple-900">
                  {selectedParticipants.length} deltagare valda
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleSendReminders}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Send size={16} />
                    Skicka påminnelse
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <Download size={16} />
                    Exportera
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-450px)]">
            {filteredParticipants.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedParticipants.length === filteredParticipants.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-600">Välj alla</span>
                </div>

                {filteredParticipants.map(participant => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={() => handleSelectParticipant(participant.id)}
                        className="mt-1 w-4 h-4 text-purple-500 rounded focus:ring-purple-500"
                      />

                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {participant.name.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{participant.name}</h3>
                          {participant.attended === true && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              Närvarande
                            </span>
                          )}
                          {participant.attended === false && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              Frånvarande
                            </span>
                          )}
                          {!event.isFree && (
                            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                              participant.paymentStatus === 'paid' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {participant.paymentStatus === 'paid' ? 'Betald' : 'Väntande'}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-2">
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

                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock size={12} />
                          Anmäld: {new Date(participant.registeredAt).toLocaleString('sv-SE')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {activeTab === 'confirmed' && participant.attended === null && (
                          <>
                            <button
                              onClick={() => handleMarkAttendance(participant.id, true)}
                              className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                              title="Markera närvarande"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={() => handleMarkAttendance(participant.id, false)}
                              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                              title="Markera frånvarande"
                            >
                              <XCircle size={20} />
                            </button>
                          </>
                        )}

                        {activeTab === 'waitlist' && stats.total < stats.capacity && (
                          <button
                            onClick={() => handleMoveFromWaitlist(participant.id)}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Flytta till bekräftade
                          </button>
                        )}

                        <button
                          onClick={() => handleRemoveParticipant(participant.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Ta bort"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Inga deltagare hittades</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-slate-600">
              {stats.total} / {stats.capacity} platser upptagna
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              Stäng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ParticipantsModal;