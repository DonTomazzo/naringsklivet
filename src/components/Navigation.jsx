import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '../contexts/MockTeamContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout } = useTeam();
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [showUserMenu,  setShowUserMenu]  = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isAboutOpen,   setIsAboutOpen]   = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const userMenuRef  = useRef(null);
  const aboutMenuRef = useRef(null);

  const menuItems = [
    { name: 'Kursinnehåll',           id: 'content' },
    { name: 'Omdömen',                id: 'results' },
    { name: 'Boka',                   id: 'guarantee' },
    { name: 'Vanliga frågor',         id: 'faq' },
    { name: 'Testa dina AI-kunskaper', id: null, path: '/testa-dig' },
  ];

  const aboutSubItems = [
    
    { name: 'Boka One on One',  path: '/seminarier#events' },
    { name: 'Boka föreläsning', path: '/seminarier#events' },
    { name: 'Boka workshop',    path: '/seminarier#events' },
    { name: 'Boka AI-implementering',     path: '/seminarier#events' },
    { name: 'Om Näringsklivet',           path: '/om-oss' },
  ];

  const urgencyMessages = [
    '🔥 Ny AI-kurs lanseras 2026 – anmäl intresse nu',
    '⚡ Begränsat antal platser på kommande seminarier',
    '🎯 Nästa seminarium: april 2026',
  ];

  // Scroll-detektor
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const timer = setTimeout(() => {
      const observers = menuItems.map(item => {
        if (!item.id) return null;
        const el = document.getElementById(item.id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveSection(item.id); },
          { threshold: 0, rootMargin: '-10% 0px -80% 0px' }
        );
        observer.observe(el);
        return observer;
      });
      return () => observers.forEach(obs => obs?.disconnect());
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Stäng user-dropdown vid klick utanför
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      {/* Urgency Bar */}
      {!isScrolled && (
        <div className="bg-[#1E1E1E] text-white py-2 overflow-hidden">
          <motion.div
            animate={{ x: [-1000, 1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {urgencyMessages.concat(urgencyMessages).map((message, index) => (
              <div key={index} className="text-sm font-medium">{message}</div>
            ))}
          </motion.div>
        </div>
      )}

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`z-50 transition-all duration-300 w-full ${
          isScrolled
            ? 'sticky top-0 bg-[#F9FAFB] shadow-sm border-b border-gray-200'
            : 'absolute top-10 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all ${
            isScrolled ? 'py-1' : 'py-2'
          }`}>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img
                src="/logo.png"
                alt="Näringsklivet Logotyp"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'w-12 h-12' : 'w-10 h-10'
                }`}
              />
              <div className={`font-bold transition-all duration-300 ${
                isScrolled ? 'text-[#2C2C2C] text-lg' : 'text-white text-xl'
              }`}>
                <span className="text-[#FF5421]">Närings</span>klivet®
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id ?? item.path}
                  onClick={() => item.path ? navigate(item.path) : scrollToSection(item.id)}
                  className={`transition-colors font-medium relative pb-1 ${
                    activeSection === item.id
                      ? 'text-[#FF5421]'
                      : isScrolled
                        ? 'text-[#2C2C2C] hover:text-[#FF5421]'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: '#FF5421' }}
                    />
                  )}
                </motion.button>
              ))}

              {/* ── Om oss dropdown ── */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
                ref={aboutMenuRef}
              >
                <button
                  className={`flex items-center gap-1 font-medium transition-colors pb-1 ${
                    isScrolled
                      ? 'text-[#2C2C2C] hover:text-[#FF5421]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Boka
                  <motion.div
                    animate={{ rotate: isAboutOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {aboutSubItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            navigate(subItem.path);
                            setIsAboutOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-[#2C2C2C] hover:bg-orange-50 hover:text-[#FF5421] transition-colors text-sm font-medium border-b border-gray-50 last:border-0"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* CTA + User Menu */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="hidden sm:flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isScrolled ? 'text-[#2C2C2C] hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <User size={20} />
                    <span className="hidden lg:block">Mitt konto</span>
                  </motion.button>

                  <div className="relative" ref={userMenuRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                        isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                      }`}
                    >
                      {currentUser?.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-9 h-9 rounded-full border-2 border-[#FF5421]"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5421] to-[#E04A1D] flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <span className={`hidden lg:block ${isScrolled ? 'text-[#2C2C2C]' : 'text-white'}`}>
                        {currentUser?.name || 'Användare'}
                      </span>
                    </motion.button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                        >
                          <button
                            onClick={() => { navigate('/dashboard'); setShowUserMenu(false); }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2"
                          >
                            <User size={18} className="text-gray-500" />
                            <span className="text-[#2C2C2C]">Mina sidor</span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-100"
                          >
                            <LogOut size={18} className="text-red-500" />
                            <span className="text-red-500 font-medium">Logga ut</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className={`hidden sm:block px-6 py-2 rounded-lg font-semibold shadow-lg transition-all ${
                    isScrolled
                      ? 'bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white'
                      : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30'
                  }`}
                >
                  Logga in
                </motion.button>
              )}

              {/* Hamburger */}
              <button
                className={`md:hidden transition-colors ${isScrolled ? 'text-[#2C2C2C]' : 'text-white'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t py-4 border-gray-200 bg-white"
              >
                <div className="flex flex-col space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id ?? item.path}
                      onClick={() => {
                        item.path ? navigate(item.path) : scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left px-2 py-3 rounded-lg transition-colors font-medium ${
                        activeSection === item.id
                          ? 'text-[#FF5421] bg-orange-50'
                          : 'text-[#2C2C2C] hover:text-[#FF5421] hover:bg-orange-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}

                  {/* ── Om oss i mobil ── */}
                  <div className="border-t border-gray-100 pt-2 mt-1">
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="w-full flex items-center justify-between px-2 py-3 rounded-lg font-medium text-[#2C2C2C] hover:text-[#FF5421] hover:bg-orange-50 transition-colors"
                    >
                      Om oss
                      <motion.div
                        animate={{ rotate: mobileAboutOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {aboutSubItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => {
                                navigate(subItem.path);
                                setIsMenuOpen(false);
                                setMobileAboutOpen(false);
                              }}
                              className="w-full text-left pl-6 pr-2 py-2.5 text-sm text-[#2C2C2C] hover:text-[#FF5421] hover:bg-orange-50 transition-colors rounded-lg"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Login / Logout */}
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-gray-100 text-[#2C2C2C] mt-2"
                      >
                        <User size={20} />
                        Mitt konto
                      </button>
                      <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-red-500 text-white"
                      >
                        <LogOut size={20} />
                        Logga ut
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                      className="px-6 py-3 rounded-lg font-semibold text-center bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white shadow-lg mt-2"
                    >
                      Logga in
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Navigation;