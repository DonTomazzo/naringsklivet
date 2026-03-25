import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicVideoModule from "../components/CourseElements/DynamicVideoModule.jsx";
import AiDailyLifeSection from "../components/CourseElements/AiDailyLifeSection";
import { 
  CheckCircle, Clock, Award, ChevronDown, Menu, X,
  BookOpen, HelpCircle, ChevronRight, Brain, Sparkles, 
  Cpu, Zap, Film, Youtube, Lightbulb, Target, TrendingUp, Users, 
  BarChart, Play, Pause, Volume2, VolumeX, Info,
  ArrowRight, FileText, Code, Database, MessageSquare,
  ShoppingCart, Car, Heart, Phone
} from 'lucide-react';

// ============================================
// 🎨 INTERACTIVE COMPONENTS
// ============================================

// Pulsating Hotspot Component
const Hotspot = ({ x, y, title, description, icon: Icon, color, onClick }) => {
  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Pulse rings */}
      <motion.div
        className={`absolute inset-0 rounded-full ${color} opacity-30`}
        animate={{
          scale: [1, 2, 2],
          opacity: [0.3, 0, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        style={{ width: '48px', height: '48px', marginLeft: '-24px', marginTop: '-24px' }}
      />
      
      <motion.div
        className={`absolute inset-0 rounded-full ${color} opacity-40`}
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.4, 0, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{ width: '48px', height: '48px', marginLeft: '-24px', marginTop: '-24px' }}
      />

      {/* Main button */}
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none">
        {title}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
      </div>
    </motion.div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, color = "bg-[#FF5421]" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full md:h-auto max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className={`${color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {children}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={onClose}
                  className={`w-full ${color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                >
                  Stäng
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Mermaid Diagram Component (using simple SVG for demo - you can add real Mermaid later)
const SimpleDiagram = ({ type = "ai-flow" }) => {
  if (type === "ai-flow") {
    return (
      <svg viewBox="0 0 800 400" className="w-full h-auto">
        {/* Traditional Programming */}
        <g>
          <rect x="50" y="50" width="150" height="80" rx="10" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2" />
          <text x="125" y="85" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">Traditionell</text>
          <text x="125" y="105" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="bold">Programmering</text>
          <foreignObject x="60" y="60" width="130" height="60">
            <div className="text-xs text-red-700 text-center">
              Exakta instruktioner<br/>Gör alltid samma sak
            </div>
          </foreignObject>
        </g>

        {/* Arrow */}
        <path d="M 200 90 L 280 90" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        
        {/* VS Text */}
        <text x="240" y="85" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>

        {/* AI/Machine Learning */}
        <g>
          <rect x="300" y="50" width="150" height="80" rx="10" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="2" />
          <text x="375" y="85" textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="bold">AI / Machine</text>
          <text x="375" y="105" textAnchor="middle" fill="#16a34a" fontSize="14" fontWeight="bold">Learning</text>
          <foreignObject x="310" y="60" width="130" height="60">
            <div className="text-xs text-green-700 text-center">
              Lär sig från data<br/>Blir bättre med tiden
            </div>
          </foreignObject>
        </g>

        {/* Examples below */}
        <g>
          <rect x="50" y="180" width="150" height="60" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
          <foreignObject x="60" y="190" width="130" height="40">
            <div className="text-xs text-slate-700">
              <div className="font-bold mb-1">Exempel:</div>
              • Kalkylator<br/>
              • Excel-formler
            </div>
          </foreignObject>
        </g>

        <g>
          <rect x="300" y="180" width="150" height="60" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
          <foreignObject x="310" y="190" width="130" height="40">
            <div className="text-xs text-slate-700">
              <div className="font-bold mb-1">Exempel:</div>
              • ChatGPT<br/>
              • Spotify
            </div>
          </foreignObject>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
          </marker>
        </defs>
      </svg>
    );
  }

  // ML Process Flow
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#8B5CF6" />
        </marker>
      </defs>

      {/* Step 1: Data */}
      <g>
        <circle cx="100" cy="150" r="50" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
        <text x="100" y="145" textAnchor="middle" fill="#6D28D9" fontSize="14" fontWeight="bold">1. Data</text>
        <text x="100" y="165" textAnchor="middle" fill="#6D28D9" fontSize="11">Samla in</text>
      </g>
      
      <path d="M 150 150 L 230 150" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Step 2: Training */}
      <g>
        <circle cx="280" cy="150" r="50" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
        <text x="280" y="145" textAnchor="middle" fill="#6D28D9" fontSize="14" fontWeight="bold">2. Träning</text>
        <text x="280" y="165" textAnchor="middle" fill="#6D28D9" fontSize="11">AI lär sig</text>
      </g>

      <path d="M 330 150 L 410 150" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Step 3: Model */}
      <g>
        <circle cx="460" cy="150" r="50" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
        <text x="460" y="145" textAnchor="middle" fill="#6D28D9" fontSize="14" fontWeight="bold">3. Modell</text>
        <text x="460" y="165" textAnchor="middle" fill="#6D28D9" fontSize="11">Färdig AI</text>
      </g>

      <path d="M 510 150 L 590 150" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Step 4: Prediction */}
      <g>
        <circle cx="640" cy="150" r="50" fill="#8B5CF6" opacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
        <text x="640" y="145" textAnchor="middle" fill="#6D28D9" fontSize="14" fontWeight="bold">4. Användning</text>
        <text x="640" y="165" textAnchor="middle" fill="#6D28D9" fontSize="11">Förutsägelser</text>
      </g>
    </svg>
  );
};



// Interactive Image with Hotspots
const InteractiveImage = ({ imageUrl, hotspots, title }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="relative">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <p className="text-slate-600 text-sm">Klicka på de pulserande punkterna för mer info</p>
      </div>
      
      <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-200">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-auto"
        />
        
        {/* Hotspots overlay */}
        <div className="absolute inset-0">
          {hotspots.map((hotspot, index) => (
            <Hotspot
              key={index}
              {...hotspot}
              onClick={() => setActiveModal(hotspot)}
            />
          ))}
        </div>
      </div>

      {/* Modal for hotspot content */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={activeModal.title}
          color={activeModal.color}
        >
          <div className="prose prose-slate max-w-none">
            {activeModal.icon && (
              <div className="flex items-center justify-center mb-4">
                <div className={`${activeModal.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                  <activeModal.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
            <p className="text-lg leading-relaxed">{activeModal.description}</p>
            {activeModal.examples && (
              <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Exempel:</h4>
                <ul className="space-y-1">
                  {activeModal.examples.map((example, i) => (
                    <li key={i} className="text-sm text-slate-700">• {example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================
// 🎬 MAIN COMPONENT
// ============================================

const ai1 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set(['intro']));
  const [isDesktop, setIsDesktop] = useState(true);

  const [userProgress, setUserProgress] = useState({ progress: 0, total: 10 });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSidebarOpen(false);
  };

  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  

  // AI in Daily Life Hotspots
  const aiDailyLifeHotspots = [
    {
      x: 15, y: 20,
      title: "Smartphone AI",
      icon: Phone,
      color: "bg-blue-500",
      description: "Din mobil är full av AI! Ansiktsigenkänning låser upp telefonen, röstassistenter som Siri förstår vad du säger, och autokorrigering hjälper dig skriva. Fotoappen kan till och med söka efter 'hund' eller 'semester' och hitta rätt bilder automatiskt.",
      examples: ["Face ID", "Siri/Google Assistant", "Autokorrigering", "Foto-sökning"]
    },
    {
      x: 85, y: 25,
      title: "Streaming Services",
      icon: Play,
      color: "bg-red-500",
      description: "Netflix, Spotify och YouTube använder AI för att rekommendera innehåll du gillar. AI analyserar vad du tittar på, hur länge, vad du skippar - och hittar mönster för att föreslå nästa serie eller låt du kommer älska.",
      examples: ["Netflix rekommendationer", "Spotify Discover Weekly", "YouTube-förslag"]
    },
    {
      x: 50, y: 45,
      title: "E-handel & Shopping",
      icon: ShoppingCart,
      color: "bg-green-500",
      description: "När du shoppar online använder AI för att visa produkter du troligen vill ha, optimera priser i realtid, och chatbots svarar på frågor 24/7. Amazon använder AI för att förutse vad du ska köpa innan du vet det själv!",
      examples: ["Produktrekommendationer", "Dynamic pricing", "Chatbots", "Fraud detection"]
    },
    {
      x: 20, y: 70,
      title: "Transport & Navigation",
      icon: Car,
      color: "bg-yellow-500",
      description: "Google Maps använder AI för att förutse trafikstockningar och föreslå snabbaste vägen. Uber/Bolt optimerar rutter och priser. Nya bilar har AI-assisterad parkering och filhållning.",
      examples: ["Google Maps trafikprediktion", "Uber dynamic pricing", "Parkeringshjälp", "Kollektivtrafik-appar"]
    },
    {
      x: 75, y: 65,
      title: "Hälsa & Fitness",
      icon: Heart,
      color: "bg-pink-500",
      description: "Träningsappar använder AI för att personalisera träningsprogram. Smartklockor analyserar din sömn och hjärtfrekvens. AI kan till och med upptäcka sjukdomar på röntgenbilder tidigare än läkare.",
      examples: ["Apple Health", "Garmin träningsanalys", "Sömnspårning", "Sjukdomsdiagnostik"]
    }
  ];

  const courseContent = [
    { id: 'intro', title: 'Välkommen', icon: Brain, duration: '5 min' },
    { id: 'vad-ar-ai', title: 'Vad är AI?', icon: Sparkles, duration: '10 min', points: 100 },
    { id: 'ai-idag', title: 'AI i vardagen', icon: Zap, duration: '10 min', points: 100 },
  ];

  const totalPoints = Array.from(completedLessons).reduce((sum, lessonId) => {
    const lesson = courseContent.find(l => l.id === lessonId);
    return sum + (lesson?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 bg-[#FF5421] text-white p-3 rounded-xl shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <motion.aside
            initial={isDesktop ? { x: 0 } : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-screen bg-[#171f32] text-white shadow-2xl z-40 overflow-y-auto w-80"
          >
            <div className="p-6">
              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-lg">{totalPoints} poäng</span>
                </div>
              </div>

              <nav className="space-y-2">
                {courseContent.map((lesson) => {
                  const Icon = lesson.icon;
                  const isActive = activeSection === lesson.id;
                  const isCompleted = completedLessons.has(lesson.id);

                  return (
                    <motion.button
                      key={lesson.id}
                      onClick={() => scrollToSection(lesson.id)}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        isActive ? 'bg-[#FF5421] text-white shadow-lg' :
                        isCompleted ? 'bg-white/5 text-gray-300' : 'text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs opacity-70">{lesson.duration}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isDesktop ? 'mr-80' : 'mr-0'} transition-all`}>
        
        {/* Intro Hero */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80" 
              alt="AI"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171f32]/95 to-[#171f32]/80" />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-block bg-[#FF5421]/20 text-[#FF5421] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#FF5421]/30">
                <Sparkles className="inline w-4 h-4 mr-2" />
                Interaktiv AI-kurs
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
                AI-Grunderna <br />
                <span className="text-[#FF5421]">För Företag</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                En visuell och interaktiv resa genom AI-världen. Klicka, utforska och lär dig!
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('vad-ar-ai')}
                className="bg-gradient-to-r from-[#FF5421] to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2"
              >
                <span>Börja utforska</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* 🚀 Lektion: AI i vardagen (Här ersätter du den gamla koden!) 🚀 */}
        <AiDailyLifeSection
            isCompleted={completedLessons.has('ai-idag')}
            onComplete={handleCompleteLesson}
        />
<DynamicVideoModule
    SECTION_ID="ai-etik-video"
    SECTION_TITLE="Etiska utmaningar med AI"
    VIDEO_URL="https://www.youtube.com/watch?v=l_t69x2j44o" 
    POINTS={150}
    ICON={Film} 
    DESCRIPTION="Se den här korta filmen för att förstå varför etik är kritiskt i AI-utveckling."
    REFLECTION_QUESTION="Ge ett exempel på bias i AI som nämndes i videon."
    BUTTON_COLOR="bg-purple-700"
    
    isCompleted={completedLessons.has('ai-etik-video')} 
    onComplete={handleCompleteLesson} // ✅ Ändra till det definierade namnet
/>

        {/* Vad är AI - With Diagram */}
        <section data-section="vad-ar-ai" className="min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-slate-800 mb-6">
                  <Sparkles className="inline-block w-12 h-12 text-[#FF5421] mr-3" />
                  Vad är AI egentligen?
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  En enkel förklaring som gör AI begripligt för alla
                </p>
              </div>

              {/* Interactive Diagram */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8 border-4 border-slate-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">
                  AI vs Traditionell Programmering
                </h3>
                <SimpleDiagram type="ai-flow" />
              </div>

              {/* Machine Learning Process */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8 border-4 border-purple-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">
                  <Brain className="inline w-8 h-8 text-purple-600 mr-2" />
                  Så fungerar Machine Learning
                </h3>
                <SimpleDiagram type="ml-process" />
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { num: "1", title: "Data", desc: "Samla in exempel", color: "purple" },
                    { num: "2", title: "Träning", desc: "AI lär sig mönster", color: "purple" },
                    { num: "3", title: "Modell", desc: "Färdig AI", color: "purple" },
                    { num: "4", title: "Användning", desc: "Gör förutsägelser", color: "purple" }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-purple-50 p-4 rounded-xl text-center border-2 border-purple-200"
                    >
                      <div className="text-3xl font-bold text-purple-600 mb-2">{step.num}</div>
                      <div className="font-bold text-slate-800 mb-1">{step.title}</div>
                      <div className="text-sm text-slate-600">{step.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!completedLessons.has('vad-ar-ai') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('vad-ar-ai')}
                  className="mt-8 mx-auto block bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Slutför lektion (+100p)</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </section>

        {/* AI i vardagen - Interactive Image */}
        <section data-section="ai-idag" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <InteractiveImage
                imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80"
                hotspots={aiDailyLifeHotspots}
                title="AI i din vardag - Klicka och utforska!"
              />

              {!completedLessons.has('ai-idag') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompleteLesson('ai-idag')}
                  className="mt-8 mx-auto block bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Slutför lektion (+100p)</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ai1;
