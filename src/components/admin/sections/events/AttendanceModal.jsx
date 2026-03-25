import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, CheckCircle, XCircle, Search, Download, 
  TrendingUp, Users, Clock, Award, Filter
} from 'lucide-react';

function AttendanceModal({ event, onClose, onSave }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [attendance, setAttendance] = useState({});

  const mockParticipants = [
    {
      id: 'p1',
      name: 'Anna Andersson',
      email: 'anna@example.com',
      registeredAt: '2025-01-15T10:00:00',
      attended: null
    },
    {
      id: 'p2',
      name: 'Erik Eriksson',
      email: 'erik@example.com',
      registeredAt: '2025-01-16T14:30:00',
      attended: true
    },
    {
      id: 'p3',
      name: 'Maria Svensson',
      email: 'maria@example.com',
      registeredAt: '2025-01-17T09:15:00',
      attended: false
    },
    {
      id: 'p4',
      name: 'Johan Johansson',
      email: 'johan@example.com',
      registeredAt: '2025-01-18T11:20:00',
      attended: null
    },
    {
      id: 'p5',
      name: 'Sara Larsson',
      email: 'sara@example.com',
      registeredAt: '2025-01-19T16:45:00',
      attended: true
    },
    {
      id: 'p6',
      name: 'Peter Pettersson',
      email: 'peter@example.com',
      registeredAt: '2025-01-20T08:30:00',
      attended: null
    }
  ];

  const participants = event.participants || mockParticipants;

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const currentStatus = attendance[p.id] !== undefined ? attendance[p.id] : p.attended;
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'present' && currentStatus === true) ||
      (filterStatus === 'absent' && currentStatus === false) ||
      (filterStatus === 'pending' && currentStatus === null);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: participants.length,
    present: participants.filter(p => {
      const status = attendance[p.id] !== undefined ? attendance[p.id] : p.attended;
      return status === true;
    }).length,
    absent: participants.filter(p => {
      const status = attendance[p.id] !== undefined ? attendance[p.id] : p.attended;
      return status === false;
    }).length,
    pending: participants.filter(p => {
      const status = attendance[p.id] !== undefined ? attendance[p.id] : p.attended;
      return status === null;
    }).length
  };

  const attendanceRate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  const handleMarkAttendance = (participantId, status) => {
    setAttendance(prev => ({
      ...prev,
      [participantId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const newAttendance = {};
    filteredParticipants.forEach(p => {
      newAttendance[p.id] = true;
    });
    setAttendance(prev => ({ ...prev, ...newAttendance }));
  };

  const handleMarkAllAbsent = () => {
    const newAttendance = {};
    filteredParticipants.forEach(p => {
      newAttendance[p.id] = false;
    });
    setAttendance(prev => ({ ...prev, ...newAttendance }));
  };

  const handleSave = () => {
    console.log('Saving attendance:', attendance);
    onSave && onSave(attendance);
    onClose();
  };

  const handleExport = () => {
    console.log('Exporting attendance report');
  };

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
          className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Närvaroregistrering</h2>
                <p className="text-green-100">{event.title}</p>
                <p className="text-sm text-green-100 mt-1">
                  {new Date(event.startDate).toLocaleDateString('sv-SE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })} • {event.startTime} - {event.endTime}
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-green-100">Totalt</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-100">{stats.present}</div>
                <div className="text-xs text-green-100">Närvarande</div>
              </div>
              <div className="bg-red-500/30 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{stats.absent}</div>
                <div className="text-xs text-green-100">Frånvarande</div>
              </div>
              <div className="bg-blue-500/30 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{attendanceRate}%</div>
                <div className="text-xs text-green-100">Närvaro</div>
              </div>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Alla ({stats.total})</option>
                <option value="present">Närvarande ({stats.present})</option>
                <option value="absent">Frånvarande ({stats.absent})</option>
                <option value="pending">Väntande ({stats.pending})</option>
              </select>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={20} />
                Exportera
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleMarkAllPresent}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
              >
                <CheckCircle size={16} />
                Markera alla närvarande
              </button>
              <button
                onClick={handleMarkAllAbsent}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                <XCircle size={16} />
                Markera alla frånvarande
              </button>
            </div>

            {/* Progress Bar */}
            {stats.pending > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Registreringsframsteg
                  </span>
                  <span className="text-sm text-blue-700">
                    {stats.present + stats.absent} / {stats.total} markerade
                  </span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${((stats.present + stats.absent) / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-450px)]">
            {filteredParticipants.length > 0 ? (
              <div className="space-y-2">
                {filteredParticipants.map((participant, index) => {
                  const currentStatus = attendance[participant.id] !== undefined 
                    ? attendance[participant.id] 
                    : participant.attended;

                  return (
                    <motion.div
                      key={participant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`border rounded-lg p-4 transition-all ${
                        currentStatus === true ? 'bg-green-50 border-green-200' :
                        currentStatus === false ? 'bg-red-50 border-red-200' :
                        'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            currentStatus === true ? 'bg-green-600' :
                            currentStatus === false ? 'bg-red-600' :
                            'bg-gradient-to-br from-slate-400 to-slate-600'
                          }`}>
                            {currentStatus === true ? (
                              <CheckCircle size={20} />
                            ) : currentStatus === false ? (
                              <XCircle size={20} />
                            ) : (
                              participant.name.charAt(0)
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="font-semibold text-slate-900">{participant.name}</div>
                            <div className="text-sm text-slate-600">{participant.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {currentStatus !== null && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              currentStatus === true 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {currentStatus === true ? 'Närvarande' : 'Frånvarande'}
                            </span>
                          )}

                          <div className="flex gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkAttendance(participant.id, true)}
                              className={`p-2 rounded-lg transition-all ${
                                currentStatus === true
                                  ? 'bg-green-600 text-white shadow-md'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                              title="Markera närvarande"
                            >
                              <CheckCircle size={20} />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkAttendance(participant.id, false)}
                              className={`p-2 rounded-lg transition-all ${
                                currentStatus === false
                                  ? 'bg-red-600 text-white shadow-md'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                              title="Markera frånvarande"
                            >
                              <XCircle size={20} />
                            </motion.button>

                            {currentStatus !== null && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMarkAttendance(participant.id, null)}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                title="Återställ"
                              >
                                <X size={20} />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
              {stats.present} närvarande • {stats.absent} frånvarande • {stats.pending} väntande
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Avbryt
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <CheckCircle size={20} />
                Spara närvaro
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AttendanceModal;