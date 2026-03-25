import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodesSection from './sections/CodesSection';
import CoursesSection from './sections/CoursesSection';
import TeamsSection from './sections/teams/TeamsSection';
import UsersSection from './sections/users/UsersSection'; 
import DocumentLibrary from './sections/documents/DocumentLibrary';
import EventsSection from './sections/events/EventsSection';
import SurveySection from './sections/surveys/SurveySection';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Key, FileText, BookOpen, 
  TrendingUp, Inbox, Building2, Mail, Activity, Menu, X, 
  LogOut, ChevronLeft, Calendar, ChevronRight, Settings,
  Plus, ClipboardList , Bell
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Översikt', icon: LayoutDashboard, badge: null },
    { id: 'teams', label: 'Teams', icon: Building2, badge: '8' }, // NY RAD - lägg till här
    { id: 'users', label: 'Användare', icon: Users, badge: '127' },
    { id: 'codes', label: 'Aktiverings koder', icon: Key, badge: '12' },
    { id: 'posts', label: 'Blogginlägg', icon: FileText, badge: null },
    { id: 'courses', label: 'Kurser', icon: BookOpen, badge: '4' },
    { id: 'surveys', label: 'Enkäter', icon: ClipboardList, badge: '2' },
    { id: 'events', label: 'Events', icon: Calendar, badge: '3' },
    { id: 'documents', label: 'Dokument', icon: FileText, badge: null },
    { id: 'sales', label: 'Försäljning', icon: TrendingUp, badge: null },
    { id: 'leads', label: 'Leads', icon: Inbox, badge: '23' },
    { id: 'email', label: 'E-post', icon: Mail, badge: null },
    { id: 'progress', label: 'Progresser', icon: Activity, badge: null },
  ];

  const stats = [
    { label: 'Totala användare', value: '127', change: '+12%', color: 'blue' },
    { label: 'Aktiva team', value: '34', change: '+8%', color: 'green' },
    { label: 'Genomförd kurser', value: '289', change: '+23%', color: 'orange' },
    { label: 'Denna månads försäljning', value: '127 500 kr', change: '+15%', color: 'purple' },
  ];

  const recentActivity = [
    { type: 'user', text: 'Anna Lindberg registrerade sig', time: '5 min sedan' },
    { type: 'course', text: 'Ny kurs "Arbetsgivaransvar" skapad', time: '1 timme sedan' },
    { type: 'sale', text: 'Brf Kastanjen förnyade licens', time: '2 timmar sedan' },
    { type: 'lead', text: 'Ny lead från kontaktformuläret', time: '3 timmar sedan' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-600">{stat.label}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      stat.change.startsWith('+') 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Snabbåtgärder</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Skapa team', icon: Building2, action: () => setActiveSection('teams') }, // NY
                  { label: 'Skapa användare', icon: Users, action: () => setActiveSection('users') },
                  { label: 'Generera kod', icon: Key, action: () => setActiveSection('codes') },
                  { label: 'Nytt blogginlägg', icon: FileText, action: () => setActiveSection('posts') },
                  { label: 'Skapa kurs', icon: BookOpen, action: () => setActiveSection('courses') },
                  { label: 'Skapa event', icon: Calendar, action: () => setActiveSection('events') },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-lg border border-orange-200 transition-all"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <action.icon className="text-white" size={20} />
                    </div>
                    <span className="font-medium text-slate-900">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Senaste aktivitet</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'course' ? 'bg-green-500' :
                      activity.type === 'sale' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-slate-900">{activity.text}</p>
                      <p className="text-sm text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

        case 'teams':  // NY CASE - lägg till här
      return <TeamsSection />;
      
      case 'users':
  return <UsersSection />;
      
      case 'codes':
        return <CodesSection />;

        case 'surveys':
  return <SurveySection />;

  case 'events':  // <-- NY CASE
  return <EventsSection />;

  case 'documents':
      return <DocumentLibrary />; 

      
      case 'posts':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Blogginlägg</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Plus size={20} />
                Nytt inlägg
              </button>
            </div>
            <p className="text-slate-600">Här kommer CRUD-funktionalitet för blogginlägg...</p>
          </div>
        );
      
      case 'courses':
        return <CoursesSection />;
      
      case 'sales':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Försäljningsstatistik</h2>
            <p className="text-slate-600">Här kommer grafer och statistik...</p>
          </div>
        );
      
      case 'leads':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Leads & Meddelanden</h2>
            <p className="text-slate-600">Här kommer leadskorg med meddelandefunktion...</p>
          </div>
        );
      
      case 'email':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">E-postutskick</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Mail size={20} />
                Nytt utskick
              </button>
            </div>
            <p className="text-slate-600">Här kommer e-postfunktionalitet...</p>
          </div>
        );
      
      case 'progress':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Deltagarprogresser</h2>
            <p className="text-slate-600">Här kommer översikt över alla deltagares progression...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col bg-slate-900 text-white fixed h-full z-40"
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-lg">Admin</span>
              </motion.div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors ml-auto"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-slate-700 rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
            <Settings size={20} />
            {isSidebarOpen && <span>Inställningar</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logga ut</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-slate-900 text-white z-50 overflow-y-auto"
            >
              {/* Same content as desktop sidebar */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                  <span className="font-bold text-lg">Admin</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-slate-700 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-800 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-300">
                  <Settings size={20} />
                  <span>Inställningar</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-300"
                >
                  <LogOut size={20} />
                  <span>Logga ut</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

{/* Main Content */}
<main className={`
  transition-all 
  duration-300
  ${isSidebarOpen ? 'lg:ml-[280px] lg:w-[calc(100%-280px)]' : 'lg:ml-[80px] lg:w-[calc(100%-80px)]'}
  w-full
`}>
  {/* Top Bar */}
  <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
    <div className="flex items-center justify-between px-4 sm:px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
          A
        </div>
      </div>
    </div>
  </header>

  {/* Content Area */}
  <div className="p-4 sm:p-6">
    {renderContent()}
  </div>
</main>
</div>
);
}

export default AdminDashboard;