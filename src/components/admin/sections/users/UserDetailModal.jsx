import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTeam } from '../../../../contexts/MockTeamContext';
import {
  X, Mail, Phone, Calendar, Activity, BookOpen,
  TrendingUp, Award, Edit2, Trash2, Lock, MessageSquare,
  Crown, Users as UsersIcon, Shield, Plus, CheckCircle, Clock, Circle
} from 'lucide-react';

function UserDetailModal({ user, onClose, onEdit }) {
  const { teams, courses, getCurrentUserCourses } = useTeam();
  const [activeTab, setActiveTab] = useState('overview');

  const userTeam = user.teamId ? teams[user.teamId] : null;
  const userCourses = courses[user.id] || [];

  // Calculate stats
  const avgProgress = userCourses.length > 0
    ? Math.round(userCourses.reduce((sum, c) => sum + c.progress, 0) / userCourses.length)
    : 0;
  
  const completedCourses = userCourses.filter(c => c.progress === 100).length;
  const inProgressCourses = userCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStartedCourses = userCourses.filter(c => c.progress === 0).length;

  const getRoleBadge = (role) => {
    const badges = {
      admin: { label: 'Admin', color: 'bg-purple-100 text-purple-700', icon: Shield },
      team_leader: { label: 'Team Leader', color: 'bg-blue-100 text-blue-700', icon: Crown },
      team_member: { label: 'Member', color: 'bg-green-100 text-green-700', icon: UsersIcon }
    };
    return badges[role] || badges.team_member;
  };

  const roleBadge = getRoleBadge(user.role);
  const RoleIcon = roleBadge.icon;

  const getCourseIcon = (progress) => {
    if (progress === 100) return <CheckCircle className="text-green-500" size={20} />;
    if (progress > 0) return <Clock className="text-orange-500" size={20} />;
    return <Circle className="text-gray-400" size={20} />;
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
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-orange-100">{user.email}</p>
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
                <div className="text-2xl font-bold">{avgProgress}%</div>
                <div className="text-xs text-orange-100">Genomsnitt</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{completedCourses}</div>
                <div className="text-xs text-orange-100">Avklarade</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{inProgressCourses}</div>
                <div className="text-xs text-orange-100">Pågående</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{notStartedCourses}</div>
                <div className="text-xs text-orange-100">Ej startade</div>
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
                    ? 'border-orange-500 text-orange-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Översikt
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'courses'
                    ? 'border-orange-500 text-orange-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Kurser ({userCourses.length})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'activity'
                    ? 'border-orange-500 text-orange-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Aktivitet
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Användarinformation</h3>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium text-slate-900">{user.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Telefon</div>
                        <div className="font-medium text-slate-900">{user.phone || 'Ej angiven'}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RoleIcon className="text-slate-400 mt-1" size={18} />
                      <div>
                        <div className="text-sm text-slate-500">Roll</div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge.color}`}>
                          <RoleIcon size={12} />
                          {roleBadge.label}
                        </span>
                      </div>
                    </div>

                    {userTeam && (
                      <div className="flex items-start gap-3">
                        <UsersIcon className="text-slate-400 mt-1" size={18} />
                        <div>
                          <div className="text-sm text-slate-500">Team</div>
                          <div className="font-medium text-slate-900">{userTeam.name}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Statistik</h3>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-900">Genomsnittlig progress</span>
                        <TrendingUp className="text-blue-600" size={18} />
                      </div>
                      <div className="text-2xl font-bold text-blue-900">{avgProgress}%</div>
                      <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${avgProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-green-900">Avklarade kurser</span>
                        <Award className="text-green-600" size={18} />
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        {completedCourses} / {userCourses.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Kurser</h3>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Plus size={16} />
                    Tilldela kurs
                  </button>
                </div>

                {/* Team Courses */}
                {userTeam && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <UsersIcon size={16} className="text-slate-500" />
                      <h4 className="text-sm font-medium text-slate-700">
                        Team-kurser (från {userTeam.name})
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {userCourses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {getCourseIcon(course.progress)}
                            <div>
                              <div className="font-medium text-slate-900">{course.title}</div>
                              {course.completedAt && (
                                <div className="text-xs text-slate-500">
                                  Avklarad: {new Date(course.completedAt).toLocaleDateString('sv-SE')}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-slate-900">{course.progress}%</div>
                              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div
                                  className={`h-full rounded-full transition-all ${
                                    course.progress === 100
                                      ? 'bg-green-500'
                                      : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Individual Courses Section (for future) */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className="text-slate-500" />
                    <h4 className="text-sm font-medium text-slate-700">
                      Individuella kurser (0)
                    </h4>
                  </div>
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-slate-500 mb-3">Inga individuella kurser tilldelade</p>
                    <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                      + Tilldela kurs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Senaste aktivitet</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-slate-900">Avklarade kursen "Diskriminering"</div>
                      <div className="text-xs text-slate-500">För 2 dagar sedan</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-slate-900">Loggade in</div>
                      <div className="text-xs text-slate-500">För 5 timmar sedan</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-slate-900">Började kursen "Föreningens intressenter"</div>
                      <div className="text-xs text-slate-500">För 1 vecka sedan</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => console.log('Send message')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageSquare size={18} />
                Skicka meddelande
              </button>
              <button
                onClick={() => console.log('Reset password')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Lock size={18} />
                Återställ lösenord
              </button>
            </div>
            <div className="flex gap-2">
              {user.role !== 'admin' && (
                <button
                  onClick={() => console.log('Delete user')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                  Ta bort
                </button>
              )}
              <button
                onClick={() => onEdit(user)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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

export default UserDetailModal;