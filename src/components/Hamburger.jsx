import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hamburger = ({ scrollToSection, activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: "hero", label: "Hem", path: "/" },
        { id: "about", label: "Om", path: "/#about" },
        { id: "skills", label: "Färdigheter", path: "/#skills" },
        { id: "knowledgestack", label: "Kunskap", path: "/#knowledgestack" },
        { id: "experience", label: "Erfarenhet", path: "/#experience" },
        { id: "education", label: "Utbildning", path: "/#education" },
        { id: "portfolio", label: "Portfölj", path: "/#portfolio" },
        { id: "quizzes", label: "Quiz", path: "/quizzes" },
        { id: "contact", label: "Kontakt", path: "/#contact" },
    ];

    return (
        <>
            {/* Hamburger Button - Endast synlig på mobil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white hover:text-purple-400 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop - Klicka för att stänga */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Menu Panel - Glider in från höger */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-slate-800 shadow-2xl z-50 md:hidden border-l-2 border-slate-700"
                        >
                            <div className="flex flex-col h-full p-6">
                                {/* Header med Close button */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="font-bold text-lg">Meny</span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-white hover:text-purple-400 transition-colors"
                                        aria-label="Stäng meny"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <nav className="flex flex-col space-y-2 flex-1">
                                    {menuItems.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={() => {
                                                    if (item.id !== 'quizzes') {
                                                        scrollToSection(item.id);
                                                    }
                                                    setIsOpen(false);
                                                }}
                                                className={`text-base font-medium transition-all py-3 px-4 rounded-lg flex items-center space-x-3 ${
                                                    activeSection === item.id 
                                                        ? 'text-purple-400 bg-purple-400/10 border-l-4 border-purple-400' 
                                                        : 'text-gray-300 hover:text-purple-400 hover:bg-white/5'
                                                }`}
                                            >
                                                <span>{item.label}</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Footer med Kontaktknapp och Social Links */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="pt-6 border-t border-white/10 space-y-4"
                                >
                                    {/* Kontakta mig knapp */}
                                    <button
                                        onClick={() => {
                                            setShowContactModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition-transform text-center"
                                    >
                                        Kontakta mig
                                    </button>

                                    <p className="text-gray-400 text-sm text-center">Följ mig</p>
                                    <div className="flex justify-center space-x-6">
                                        <a
                                            href="https://www.linkedin.com/in/tomas-mauritzon/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-transform hover:scale-110"
                                            aria-label="LinkedIn"
                                        >
                                            <img src="/linked.png" alt="LinkedIn" className="w-8 h-8 object-contain" />
                                        </a>
                                        <a
                                            href="https://github.com/DonTomazzo"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-transform hover:scale-110"
                                            aria-label="GitHub"
                                        >
                                            <img 
                                                src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" 
                                                alt="GitHub" 
                                                className="w-8 h-8 object-contain"
                                            />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Hamburger;