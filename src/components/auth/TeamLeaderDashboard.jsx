import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeam } from '../../contexts/MockTeamContext';
import { useNavigate } from 'react-router-dom';
import {
  Users, Key, TrendingUp, Award, Copy, Check, Mail, 
  X, LogOut, Menu, Bell, BookOpen, Target, Clock,
  ChevronRight, Download, Building2, Send, ArrowRight
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

function TeamLeaderDashboard() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    logout, 
    generateMemberCode, 
    getCurrentTeam,
    getTeamMembersWithProgress 
  } = useTeam();

  const [copiedCode, setCopiedCode] = useState(null);
  const [showBulkInvite, setShowBulkInvite] = useState(false);
  const [showSingleInvite, setShowSingleInvite] = useState(false);
  const [emailList, setEmailList] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [lastGeneratedCode, setLastGeneratedCode] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentTeam = getCurrentTeam();
  const teamMembers = currentTeam ? getTeamMembersWithProgress(currentTeam.id) : [];

  // Stats calculations
  const totalMembers = teamMembers.length;
  const avgProgress = teamMembers.length > 0
    ? Math.round(
        teamMembers.reduce((sum, member) => {
          const memberAvg = member.courses.reduce((s, c) => s + c.progress, 0) / member.courses.length;
          return sum + memberAvg;
        }, 0) / teamMembers.length
      )
    : 0;
  
  const completedCourses = teamMembers.reduce((sum, member) => 
    sum + member.courses.filter(c => c.progress === 100).length, 0
  );

  const activeCodes = currentTeam?.createdCodes.filter(c => !c.used).length || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGenerateMemberCode = () => {
    if (!currentTeam) {
      toast.error('Inget team hittat');
      return;
    }
    
    const code = generateMemberCode(currentTeam.id);
    setLastGeneratedCode(code);
    toast.success('Ny medlem-kod genererad!');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Kod kopierad!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSingleInvite = async () => {
    if (!singleEmail.trim() || !singleEmail.includes('@')) {
      toast.error('Ange en giltig email-adress');
      return;
    }

    setSending(true);

    try {
      const code = lastGeneratedCode || generateMemberCode(currentTeam.id);
      
      // Simulera email-sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Sending invite to:', singleEmail, 'with code:', code);
      
      toast.success(`Inbjudan skickad till ${singleEmail}!`);
      setShowSingleInvite(false);
      setSingleEmail('');
      setLastGeneratedCode(null);

    } catch (error) {
      console.error('Error sending invite:', error);
      toast.error('Något gick fel vid skickande');
    } finally {
      setSending(false);
    }
  };

  const handleBulkInvite = async () => {
    const emails = emailList
      .split('\n')
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    if (emails.length === 0) {
      toast.error('Inga giltiga email-adresser hittades');
      return;
    }

    setSending(true);

    try {
      const invites = [];

      for (const email of emails) {
        const code = generateMemberCode(currentTeam.id);
        
        invites.push({
          email,
          code,
          teamId: currentUser.teamId,
          sentAt: new Date().toISOString(),
          used: false
        });

        // Simulera email-sending
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log('Generated invites:', invites);
      toast.success(`${emails.length} inbjudningar skickade!`);
      
      setShowBulkInvite(false);
      setEmailList('');

    } catch (error) {
      console.error('Error sending invites:', error);
      toast.error('Något gick fel vid skickande');
    } finally {
      setSending(false);
    }
  };

  if (!currentUser || currentUser.role !== 'team_leader') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Åtkomst nekad</h2>
          <p className="text-slate-600 mb-4">Du måste vara team leader för att se denna sida.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Gå till dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
<header className="bg-white border-b border-gray-200 sticky top-0 z-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team Leader Dashboard</h1>
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
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="text-blue-500" size={24} />
                <span className="text-sm text-slate-500">Medlemmar</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">{totalMembers}</div>
              <p className="text-sm text-slate-600 mt-1">Aktiva medlemmar</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="text-green-500" size={24} />
                <span className="text-sm text-slate-500">Genomsnitt</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">{avgProgress}%</div>
              <p className="text-sm text-slate-600 mt-1">Team progress</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <Award className="text-purple-500" size={24} />
                <span className="text-sm text-slate-500">Avklarade</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">{completedCourses}</div>
              <p className="text-sm text-slate-600 mt-1">Kurser klara</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <Key className="text-orange-500" size={24} />
                <span className="text-sm text-slate-500">Aktiva koder</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">{activeCodes}</div>
              <p className="text-sm text-slate-600 mt-1">Oanvända koder</p>
            </motion.div>
          </div>

          {/* Invite Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Key className="text-green-600" size={24} />
              Bjud in teammedlemmar
            </h3>
            
            <p className="text-slate-700 mb-6">
              Välj hur du vill bjuda in dina teammedlemmar. Du kan generera koder att dela själv, 
              eller skicka automatiska inbjudningar via email.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {/* Alternativ 1: Generera kod */}
              <button
                onClick={handleGenerateMemberCode}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-lg transition-all"
              >
                <Key className="text-green-600" size={32} />
                <span className="font-semibold text-slate-900">Generera kod</span>
                <span className="text-xs text-slate-600 text-center">Kopiera och dela manuellt</span>
              </button>

              {/* Alternativ 2: Skicka till en person */}
              <button
                onClick={() => setShowSingleInvite(true)}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 rounded-lg transition-all"
              >
                <Mail className="text-blue-600" size={32} />
                <span className="font-semibold text-slate-900">Skicka till en</span>
                <span className="text-xs text-slate-600 text-center">Ange email och skicka direkt</span>
              </button>

              {/* Alternativ 3: Bulk invite */}
              <button
                onClick={() => setShowBulkInvite(true)}
                className="flex flex-col items-center gap-2 p-4 bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-lg transition-all"
              >
                <Users className="text-purple-600" size={32} />
                <span className="font-semibold text-slate-900">Bjud in flera</span>
                <span className="text-xs text-slate-600 text-center">Lista med emails (bulk)</span>
              </button>
            </div>

            {/* Visa senast genererade kod */}
            {lastGeneratedCode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border-2 border-green-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Ny medlem-kod genererad:</span>
                  {copiedCode === lastGeneratedCode && (
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <Check size={14} />
                      Kopierad!
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <code className="flex-1 text-lg font-mono font-bold text-slate-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
                    {lastGeneratedCode}
                  </code>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyCode(lastGeneratedCode)}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedCode === lastGeneratedCode ? <Check size={18} /> : <Copy size={18} />}
                      <span className="sm:hidden md:inline">Kopiera</span>
                    </button>
                    <button
                      onClick={() => {
                        setSingleEmail('');
                        setShowSingleInvite(true);
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      <span className="sm:hidden md:inline">Skicka</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Team Members List */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users size={24} />
              Dina teammedlemmar ({totalMembers})
            </h3>
            
            <div className="space-y-3">
              {teamMembers.map((member) => {
                const memberAvgProgress = Math.round(
                  member.courses.reduce((sum, c) => sum + c.progress, 0) / member.courses.length
                );
                const completedCount = member.courses.filter(c => c.progress === 100).length;

                return (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{member.name}</h4>
                          <p className="text-sm text-slate-600">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{memberAvgProgress}%</div>
                          <div className="text-xs text-slate-500">{completedCount} av {member.courses.length} klara</div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                          style={{ width: `${memberAvgProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generated Codes List */}
          {currentTeam?.createdCodes && currentTeam.createdCodes.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Genererade koder</h3>
              <div className="space-y-2">
                {currentTeam.createdCodes.map((codeObj, index) => (
                  <div 
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${codeObj.used ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <code className="font-mono font-semibold text-slate-900">{codeObj.code}</code>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        codeObj.used 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {codeObj.used ? 'Använd' : 'Aktiv'}
                      </span>
                      {!codeObj.used && (
                        <button
                          onClick={() => handleCopyCode(codeObj.code)}
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        >
                          {copiedCode === codeObj.code ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Single Email Invite Modal */}
      <AnimatePresence>
        {showSingleInvite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSingleInvite(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Skicka inbjudan
                </h3>
                <button
                  onClick={() => setShowSingleInvite(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email-adress
                  </label>
                  <input
                    type="email"
                    value={singleEmail}
                    onChange={(e) => setSingleEmail(e.target.value)}
                    placeholder="medlem@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>

                {lastGeneratedCode && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Kod som skickas:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">{lastGeneratedCode}</code>
                    </p>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Emailet kommer innehålla:</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>✉️ Personlig hälsning från dig</li>
                    <li>🔑 Unik registreringskod</li>
                    <li>🔗 Länk till registrering</li>
                    <li>📚 Information om kursen</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSingleInvite(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={handleSingleInvite}
                    disabled={!singleEmail.trim() || !singleEmail.includes('@') || sending}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg"
                  >
                    {sending ? '⏳ Skickar...' : '✉️ Skicka inbjudan'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Invite Modal */}
      <AnimatePresence>
        {showBulkInvite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBulkInvite(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  Bjud in flera medlemmar
                </h3>
                <button
                  onClick={() => setShowBulkInvite(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ange email-adresser (en per rad)
                  </label>
                  <textarea
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                    placeholder="anna@example.com&#10;erik@example.com&#10;maria@example.com"
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    💡 Varje person får en unik kod skickad till sin email
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Vad händer när du klickar "Skicka"?</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>✅ En unik kod genereras för varje email</li>
                    <li>✅ Ett välkomstmail skickas automatiskt</li>
                    <li>✅ Koden sparas och knyts till email-adressen</li>
                    <li>✅ Du kan se status på alla inbjudningar</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBulkInvite(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={handleBulkInvite}
                    disabled={!emailList.trim() || sending}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg"
                  >
                    {sending ? '⏳ Skickar...' : '✉️ Skicka inbjudningar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeamLeaderDashboard;