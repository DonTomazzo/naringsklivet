import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizCard from '../components/QuizCard';
import allQuizzes from '../data/quizzes/index';
import { useTeam } from '../contexts/MockTeamContext';
import {
  BookOpen, Users, TrendingUp, Award, Play, ArrowRight, 
  CheckCircle, Clock, Star, Mail, Phone, User, LogOut,
  LayoutDashboard, Menu, X, Home, Settings, Bell
} from 'lucide-react';

function TeamView() {
  const { currentUser, getCurrentTeam, getTeamMembersWithProgress, logout } = useTeam();
  const currentTeam = getCurrentTeam();
  const teamMembers = currentTeam ? getTeamMembersWithProgress(currentTeam.id) : [];
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      window.location.href = '/login';
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigateToDashboard = () => {
    if (currentUser.role === 'team_leader') {
      window.location.href = '/team-leader-dashboard';
    } else {
      window.location.href = '/dashboard';
    }
  };

  if (!currentUser || !currentTeam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const teamQuizzes = currentTeam?.assignedCourses 
    ? allQuizzes.filter(quiz => currentTeam.assignedCourses.includes(quiz.slug))
    : allQuizzes;

  const totalMembers = teamMembers.length;
  const avgProgress = teamMembers.length > 0
    ? Math.round(
        teamMembers.reduce((sum, member) => {
          const memberAvg = member.courses.reduce((s, c) => s + c.progress, 0) / member.courses.length;
          return sum + memberAvg;
        }, 0) / teamMembers.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {currentTeam.logoUrl ? (
                <img 
                  src={currentTeam.logoUrl} 
                  alt={currentTeam.name}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {currentTeam.name.charAt(0)}
                </div>
              )}
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900">{currentTeam.name}</div>
                <div className="text-xs text-slate-500">{currentTeam.company}</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => window.location.href = window.location.pathname}
                className="flex items-center gap-2 px-4 py-2 text-orange-600 bg-orange-50 rounded-lg font-medium transition-colors"
              >
                <Home size={18} />
                Team Hem
              </button>
              <button 
                onClick={navigateToDashboard}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                <LayoutDashboard size={18} />
                Mitt Dashboard
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-slate-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-slate-900">{currentUser.name}</div>
                    <div className="text-xs text-slate-500">
                      {currentUser.role === 'team_leader' ? 'Team Leader' : 'Medlem'}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-semibold text-slate-900">{currentUser.name}</div>
                          <div className="text-sm text-slate-500">{currentUser.email}</div>
                        </div>

                        <div className="py-2">
                          <button
                            onClick={navigateToDashboard}
                            className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                          >
                            <LayoutDashboard size={18} />
                            <span>Mitt Dashboard</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/documents'}
                            className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                          >
                            <BookOpen size={18} />
                            <span>Dokumentbibliotek</span>
                          </button>
                          <button
                            onClick={() => console.log('Settings')}
                            className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                          >
                            <Settings size={18} />
                            <span>Installningar</span>
                          </button>
                        </div>

                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={18} />
                            <span>Logga ut</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                <button 
                  onClick={() => {
                    window.location.href = window.location.pathname;
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-orange-600 bg-orange-50 rounded-lg font-medium"
                >
                  <Home size={18} />
                  Team Hem
                </button>
                <button 
                  onClick={() => {
                    navigateToDashboard();
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <LayoutDashboard size={18} />
                  Mitt Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                Valkommen till {currentTeam.name}
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                {currentTeam.company}
              </p>

              {currentTeam.description && (
                <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto lg:mx-0">
                  {currentTeam.description}
                </p>
              )}

              {(currentTeam.contactEmail || currentTeam.contactPhone) && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm">
                  {currentTeam.contactEmail && (
                    <a 
                      href={`mailto:${currentTeam.contactEmail}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Mail size={16} />
                      {currentTeam.contactEmail}
                    </a>
                  )}
                  {currentTeam.contactPhone && (
                    <a 
                      href={`tel:${currentTeam.contactPhone}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Phone size={16} />
                      {currentTeam.contactPhone}
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-96">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <Users className="mb-2 text-blue-400" size={28} />
                <div className="text-3xl font-bold">{totalMembers}</div>
                <div className="text-sm text-slate-300">Medlemmar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <BookOpen className="mb-2 text-green-400" size={28} />
                <div className="text-3xl font-bold">{teamQuizzes.length}</div>
                <div className="text-sm text-slate-300">Kurser</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <TrendingUp className="mb-2 text-orange-400" size={28} />
                <div className="text-3xl font-bold">{avgProgress}%</div>
                <div className="text-sm text-slate-300">Progress</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <Star className="mb-2 text-yellow-400" size={28} />
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm text-slate-300">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button 
            onClick={navigateToDashboard}
            className="group p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-orange-600" size={24} />
              </div>
              <ArrowRight className="text-orange-600 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Mina kurser</h3>
            <p className="text-sm text-slate-600">Fortsatt dar du slutade</p>
          </button>

          <button 
            onClick={navigateToDashboard}
            className="group p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <ArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Min progress</h3>
            <p className="text-sm text-slate-600">Se din utveckling</p>
          </button>

          <button 
            onClick={navigateToDashboard}
            className="group p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="text-purple-600" size={24} />
              </div>
              <ArrowRight className="text-purple-600 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Certifikat</h3>
            <p className="text-sm text-slate-600">Dina prestationer</p>
          </button>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Tillgangliga quiz
            </h2>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold text-sm">
              {teamQuizzes.length} quiz
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamQuizzes && teamQuizzes.length > 0 ? (
              teamQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.slug}
                  quiz={quiz}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Inga quiz tillgangliga annu</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award size={28} className="text-orange-600" />
              Team Leaderboard
            </h2>
            <button 
              onClick={navigateToDashboard}
              className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
            >
              Se alla
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {teamMembers.slice(0, 5).map((member, index) => {
              const memberAvgProgress = Math.round(
                member.courses.reduce((sum, c) => sum + c.progress, 0) / member.courses.length
              );
              const isMe = member.id === currentUser.id;

              return (
                <div 
                  key={member.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    isMe 
                      ? 'bg-orange-50 border-2 border-orange-300' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-orange-300 text-orange-900' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold truncate ${isMe ? 'text-orange-900' : 'text-slate-900'}`}>
                      {member.name} {isMe && '(Du)'}
                    </h4>
                    <p className="text-sm text-slate-500 truncate">{member.email}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-slate-900">{memberAvgProgress}%</div>
                    <div className="text-xs text-slate-500">progress</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamView;