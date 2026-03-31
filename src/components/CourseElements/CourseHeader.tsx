import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CourseHeaderProps {
  isSidebarMinimized: boolean;
  isDesktop: boolean;
  userName?: string;
  userAvatar?: string;
  slideProgress?: {
    current: number;
    total: number;
  };
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  isSidebarMinimized,
  isDesktop,
  userName,
  userAvatar,
  slideProgress,
}) => {
  const navigate = useNavigate();
  const [isVisible,  setIsVisible]  = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openMenu,   setOpenMenu]   = useState<string | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(true);
      clearTimeout(timeout);
      if (currentScrollY > 100) {
        timeout = setTimeout(() => setIsVisible(false), 3000);
      }
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsVisible(false), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  const menuItems = [
    {
      title: 'Kurser',
      items: [
        { label: 'Alla moduler',          path: '/ai-modules' },
        { label: 'AI-träningsprogrammet', path: '/purchase/naringsklivet-ai' },
        { label: 'Mina framsteg',         path: '/dashboard' },
      ],
    },
    
   
    {
      title: 'Certifiering',
      items: [
        { label: 'Gör slutprovet', path: '/slutprov' },
        { label: 'Mina diplom',    path: '/mina-sidor' },
      ],
    },
  ];

  const progressPct = slideProgress
    ? Math.round(((slideProgress.current + 1) / slideProgress.total) * 100)
    : null;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm"
    >
      <div
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width, 320px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                <img
                  src="/logo.png"
                  alt="Näringsklivet Logotyp"
                  width={20}
                  height={20}
                  className="object-contain opacity-90"
                />
                <div className="text-lg sm:text-xl font-bold" style={{ color: '#171f32' }}>
                  <span className="text-[#FF5421]">Närings</span>klivet®
                </div>
              </motion.div>
            </Link>

            {/* Progressbar desktop */}
            {slideProgress && (
              <div className="hidden md:flex flex-1 items-center gap-3 max-w-xs mx-auto">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-[#FF5421]"
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 flex-shrink-0 tabular-nums">
                  {slideProgress.current + 1}/{slideProgress.total}
                </span>
              </div>
            )}

            {/* Progressbar mobil */}
            {slideProgress && (
              <div className="md:hidden absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                <motion.div
                  className="h-full bg-[#FF5421]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {menuItems.map((menu, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      openMenu === menu.title
                        ? 'bg-slate-100 text-[#FF5421]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#FF5421]'
                    }`}
                  >
                    {menu.title}
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      openMenu === menu.title ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {openMenu === menu.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                      >
                        {menu.items.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => { navigate(item.path); setOpenMenu(null); }}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 hover:text-[#FF5421] transition-colors border-b border-slate-100 last:border-b-0"
                          >
                            <span className="font-medium text-slate-800 hover:text-[#FF5421]">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* User */}
              <Link
                to="/mina-sidor"
                className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-3 py-2 transition-colors group ml-4 mr-10"
                title="Mina sidor"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName || 'Användare'}
                    className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 group-hover:border-[#FF5421] transition-colors"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5421] to-[#FF5421] flex items-center justify-center border-2 border-slate-200 group-hover:border-[#FF5421] transition-colors">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                {userName && (
                  <span className="hidden lg:block text-sm font-medium text-slate-700 group-hover:text-[#FF5421] transition-colors">
                    {userName}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default CourseHeader;