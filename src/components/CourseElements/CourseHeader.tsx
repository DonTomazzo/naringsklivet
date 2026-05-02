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
      className="fixed top-0 left-0 right-0 z-40"
      style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}
    >
      <div
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width, 320px)' }}
      >
        <div className="max-w-none mx-auto px-6 py-2">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                <img
                  src="/logo.png"
                  alt="Näringsklivet Logotyp"
                  width={15}
                  height={15}
                  className="object-contain opacity-90"
                />
                <div className="text-sm sm:text-base font-bold" style={{ color: '#1a1a1a' }}>
                  <span className="text-[#FF5421]">Styrelse</span>körkortet®
                </div>
              </motion.div>
            </Link>

           {/* Dots desktop */}
{slideProgress && (
  <div className="hidden md:flex flex-1 items-center justify-center gap-1.5 max-w-sm mx-auto">
    {Array.from({ length: slideProgress.total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width:   i === slideProgress.current ? 20 : 6,
          opacity: i <= slideProgress.current ? 1 : 0.25,
          backgroundColor: i <= slideProgress.current ? '#FF5421' : '#cbd5e1',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ height: 6, borderRadius: 3, flexShrink: 0 }}
      />
    ))}
  </div>
)}

{/* Dots mobil — rad under headern */}
{slideProgress && (
  <div className="md:hidden absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 pb-1.5 pt-1">
    {Array.from({ length: slideProgress.total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width:           i === slideProgress.current ? 16 : 5,
          opacity:         i <= slideProgress.current ? 1 : 0.2,
          backgroundColor: i <= slideProgress.current ? '#FF5421' : '#cbd5e1',
        }}
        transition={{ duration: 0.25 }}
        style={{ height: 5, borderRadius: 3, flexShrink: 0 }}
      />
    ))}
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
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      openMenu === menu.title
                        ? 'bg-slate-100 text-[#FF5421]'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#FF5421]'
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