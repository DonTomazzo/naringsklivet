import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../contexts/MockTeamContext';
import { useNavigate } from 'react-router-dom';
import DashboardCourseCard from './DashboardCourseCard';
import {
  BookOpen, TrendingUp, Award, Clock, Users, 
  LogOut, Bell, Target, CheckCircle, Play,
  ChevronRight, Star, Building2, Trophy
} from 'lucide-react';

function TeamMemberDashboard() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    logout, 
    getCurrentTeam,
    getCurrentUserCourses,
    getTeamMembersWithProgress 
  } = useTeam();

  const currentTeam = getCurrentTeam();
  const myCourses = getCurrentUserCourses();
  const teamMembers = currentTeam ? getTeamMembersWithProgress(currentTeam.id) : [];

  // My stats
  const myProgress = myCourses.length > 0
    ? Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length)
    : 0;
  
  const myCompletedCourses = myCourses.filter(c => c.progress === 100).length;
  const myInProgressCourses = myCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const myNotStartedCourses = myCourses.filter(c => c.progress === 0).length;

  // Team stats
  const teamAvgProgress = teamMembers.length > 0
    ? Math.round(
        teamMembers.reduce((sum, member) => {
          const memberAvg = member.courses.reduce((s, c) => s + c.progress, 0) / member.courses.length;
          return sum + memberAvg;
        }, 0) / teamMembers.length
      )
    : 0;

  // My rank in team
  const memberProgressList = teamMembers.map(member => ({
    id: member.id,
    name: member.name,
    avgProgress: Math.round(member.courses.reduce((s, c) => s + c.progress, 0) / member.courses.length)
  })).sort((a, b) => b.avgProgress - a.avgProgress);

  const myRank = memberProgressList.findIndex(m => m.id === currentUser?.id) + 1;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStartCourse = (courseId) => {
    // Här kan du navigera till kurssidan
    console.log('Starting course:', courseId);
    // navigate(`/course/${courseId}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ej inloggad</h2>
          <p className="text-slate-600 mb-4">Du måste logga in för att se dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Logga in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Välkommen, {currentUser.name}!</h1>
        <p className="text-sm text-slate-600">{currentTeam?.name || 'Ditt team'}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* NY - Team Hem knapp */}
        {currentTeam && (
          <button
            onClick={() => {
              const teamSlug = currentTeam.slug || 
                currentTeam.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/å/g, 'a')
                  .replace(/ä/g, 'a')
                  .replace(/ö/g, 'o');
              window.location.href = `/teams/${teamSlug}`;
            }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
          >
            <Building2 size={18} />
            Team Hem
          </button>
        )}
        
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logga ut</span>
        </button>
      </div>
    </div>
  </div>
</header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Target size={24} />
                <span className="text-sm opacity-90">Min Progress</span>
              </div>
              <div className="text-3xl font-bold">{myProgress}%</div>
              <p className="text-sm opacity-90 mt-1">Genomsnittlig progress</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <CheckCircle size={24} />
                <span className="text-sm opacity-90">Avklarade</span>
              </div>
              <div className="text-3xl font-bold">{myCompletedCourses}</div>
              <p className="text-sm opacity-90 mt-1">Kurser klara</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Clock size={24} />
                <span className="text-sm opacity-90">Pågående</span>
              </div>
              <div className="text-3xl font-bold">{myInProgressCourses}</div>
              <p className="text-sm opacity-90 mt-1">Kurser startade</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Trophy size={24} />
                <span className="text-sm opacity-90">Placering</span>
              </div>
              <div className="text-3xl font-bold">#{myRank}</div>
              <p className="text-sm opacity-90 mt-1">I teamet</p>
            </motion.div>
          </div>

          {/* My Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen size={24} />
                Mina kurser ({myCourses.length})
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {myCompletedCourses} klara
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                  {myInProgressCourses} pågående
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCourses.map((course, index) => (
                // 🟢 ERSÄTT DEN GAMLA MOCK-DIV:en MED DEN NYA KOMPONENTEN
                <DashboardCourseCard
                  key={course.id} 
                  course={course} 
                  delay={0.05 * index} 
                />
              ))}
            </div>
          </div>
                    
                   
                  
          {/* Team Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Trophy size={24} />
              Team Leaderboard
            </h3>
            
            <div className="space-y-3">
              {memberProgressList.map((member, index) => {
                const isMe = member.id === currentUser.id;
                
                return (
                  <div 
                    key={member.id}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isMe 
                        ? 'bg-orange-50 border-2 border-orange-300' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-300 text-orange-900' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isMe ? 'text-orange-900' : 'text-slate-900'}`}>
                        {member.name} {isMe && '(Du)'}
                      </h4>
                    </div>

                    {/* Progress */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{member.avgProgress}%</div>
                    </div>

                    {/* Trophy for top 3 */}
                    {index < 3 && (
                      <div className="hidden sm:block">
                        {index === 0 && <Trophy className="text-yellow-500" size={24} />}
                        {index === 1 && <Trophy className="text-gray-400" size={24} />}
                        {index === 2 && <Trophy className="text-orange-400" size={24} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Overview */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users size={20} />
                Team Översikt
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Antal medlemmar</span>
                  <span className="font-bold text-slate-900">{teamMembers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Genomsnittlig progress</span>
                  <span className="font-bold text-slate-900">{teamAvgProgress}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tillgängliga kurser</span>
                  <span className="font-bold text-slate-900">{currentTeam?.coursesIncluded.length || 0}</span>
                </div>
              </div>
            </div>

            {/* My Performance */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star size={20} />
                Min Prestation
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Jämfört med teamet</span>
                  <span className={`font-bold ${
                    myProgress >= teamAvgProgress ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {myProgress >= teamAvgProgress ? '+' : ''}{(myProgress - teamAvgProgress).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Placering</span>
                  <span className="font-bold text-slate-900">#{myRank} av {teamMembers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status</span>
                  <span className={`font-bold ${
                    myProgress >= 75 ? 'text-green-600' :
                    myProgress >= 50 ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {myProgress >= 75 ? '🔥 Excellent!' : myProgress >= 50 ? '💪 Bra jobbat!' : '📚 Fortsätt så!'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default TeamMemberDashboard;