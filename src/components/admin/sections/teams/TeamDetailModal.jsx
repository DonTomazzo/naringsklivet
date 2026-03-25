import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  X, Mail, Phone, Calendar, Users, BookOpen,
  Edit2, Trash2, Key, Copy, Check, Building2,
  Crown, User, TrendingUp
} from 'lucide-react';

function TeamDetailModal({ team, users, onClose, onEdit, onManageCourses }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [codeCopied, setCodeCopied] = useState(false);

  // Get team members
  const teamMembers = Object.values(users).filter(u => u.teamId === team.id);
  const teamLeaders = teamMembers.filter(u => u.role === 'team_leader');
  const regularMembers = teamMembers.filter(u => u.role === 'team_member');

  // Mock course data
  const assignedCourses = [
    { id: 'course-1', title: 'Diskriminering', category: 'Compliance', completed: 8, total: 12 },
    { id: 'course-2', title: 'Föreningens intressenter', category: 'Organisation', completed: 5, total: 12 },
    { id: 'course-3', title: 'Arbetsmiljö', category: 'Säkerhet', completed: 12, total: 12 }
  ];

  const copyAccessCode = () => {
    navigator.clipboard.writeText(team.accessCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const getCompletionRate = () => {
    const total = assignedCourses.reduce((sum, c) => sum + c.total, 0);
    const completed = assignedCourses.reduce((sum, c) => sum + c.completed, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
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
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {team.logoUrl ? (
                  <img
                    src={team.logoUrl}
                    alt={team.name}
                    className="w-16 h-16 bg-white/20 rounded-lg object-contain p-2"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center text-2xl font-bold">
                    {team.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold">{team.name}</h2>
                  <p className="text-blue-100">{team.company}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <div className="text-xs text-blue-100">Medlemmar</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{assignedCourses.length}</div>
                <div className="text-xs text-blue-100">Kurser</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{getCompletionRate()}%</div>
                <div className="text-xs text-blue-100">Genomförande</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{teamLeaders.length}</div>
                <div className="text-xs text-blue-100">Ledare</div>
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
                onClick={() => setActiveTab('members')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'members'
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Medlemmar ({teamMembers.length})
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'courses'
                    ? 'border-blue-500 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Kurser ({assignedCourses.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-350px)]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Team Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Teaminformation</h3>

                    <div className="flex items-start gap-3">
                      <Building2 className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Företag</div>
                        <div className="font-medium text-slate-900">{team.company}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Kontaktemail</div>
                        <div className="font-medium text-slate-900">{team.contactEmail || 'Ej angiven'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Telefon</div>
                        <div className="font-medium text-slate-900">{team.contactPhone || 'Ej angiven'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Max medlemmar</div>
                        <div className="font-medium text-slate-900">{team.maxMembers || 50}</div>
                      </div>
                    </div>

                    {team.description && (
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Beskrivning</div>
                        <div className="text-sm text-slate-700 bg-gray-50 p-3 rounded-lg">
                          {team.description}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Access Code & Stats */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Åtkomst</h3>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-900 flex items-center gap-2">
                          <Key size={16} />
                          Åtkomstkod
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-4 py-2 bg-white border border-orange-300 rounded-lg text-xl font-mono font-bold text-orange-900">
                          {team.accessCode}
                        </code>
                        <button
                          onClick={copyAccessCode}
                          className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          {codeCopied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-orange-800 mt-2">
                        Dela denna kod med team leader för att bjuda in medlemmar
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-900">Kursgenomförande</span>
                        <TrendingUp className="text-green-600" size={18} />
                      </div>
                      <div className="text-2xl font-bold text-green-900">{getCompletionRate()}%</div>
                      <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full transition-all"
                          style={{ width: `${getCompletionRate()}%` }}
                        />
                      </div>
                    </div>

                    {team.createdAt && (
                      <div className="flex items-start gap-3">
                        <Calendar className="text-slate-400 mt-1" size={18} />
                        <div>
                          <div className="text-sm text-slate-500">Skapat</div>
                          <div className="font-medium text-slate-900">
                            {new Date(team.createdAt).toLocaleDateString('sv-SE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                {/* Team Leaders */}
                {teamLeaders.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Crown className="text-yellow-500" size={18} />
                      Team Leaders ({teamLeaders.length})
                    </h3>
                    <div className="space-y-2">
                      {teamLeaders.map(member => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{member.name}</div>
                              <div className="text-sm text-slate-600">{member.email}</div>
                            </div>
                          </div>
                          <Crown className="text-yellow-600" size={20} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Members */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <User size={18} />
                    Medlemmar ({regularMembers.length})
                  </h3>
                  {regularMembers.length > 0 ? (
                    <div className="space-y-2">
                      {regularMembers.map(member => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{member.name}</div>
                              <div className="text-sm text-slate-600">{member.email}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Users className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-sm text-slate-500">Inga medlemmar ännu</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Medlemmar kommer att visas här när de registrerar sig med åtkomstkoden
                      </p>
                    </div>
                  )}
                </div>

                {/* Capacity */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Kapacitet</span>
                    <span className="text-sm text-blue-700">
                      {teamMembers.length} / {team.maxMembers || 50}
                    </span>
                  </div>
                  <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(teamMembers.length / (team.maxMembers || 50)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Tilldelade kurser</h3>
                  <button
                    onClick={() => onManageCourses(team)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Edit2 size={16} />
                    Hantera kurser
                  </button>
                </div>

                {assignedCourses.length > 0 ? (
                  <div className="space-y-3">
                    {assignedCourses.map(course => {
                      const progress = Math.round((course.completed / course.total) * 100);
                      return (
                        <div
                          key={course.id}
                          className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-semibold text-slate-900">{course.title}</div>
                              <div className="text-xs text-slate-500 mt-1">{course.category}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-slate-900">{progress}%</div>
                              <div className="text-xs text-slate-500">
                                {course.completed}/{course.total} klara
                              </div>
                            </div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                progress === 100 ? 'bg-green-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-slate-500 mb-3">Inga kurser tilldelade</p>
                    <button
                      onClick={() => onManageCourses(team)}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      + Tilldela kurser
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
            <button
              onClick={() => console.log('Delete team')}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={18} />
              Ta bort team
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onManageCourses(team)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BookOpen size={18} />
                Hantera kurser
              </button>
              <button
                onClick={() => onEdit(team)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit2 size={18} />
                Redigera
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TeamDetailModal;