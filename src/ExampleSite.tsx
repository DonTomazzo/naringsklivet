import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Star, Users, Clock, Award, ChevronDown, 
  Play, Phone, Mail, MapPin, Calendar, BookOpen, Target,
  ArrowRight, Quote, Shield, TrendingUp, FileText, Menu, X,
  AlertCircle, ThumbsUp, Video, Download, Lock, Zap
} from 'lucide-react';

const PremiumCoursePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 32 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => setShowFloatingCTA(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const urgencyMessages = [
    "🔥 127 personer kollar på denna kurs just nu",
    "⚡ Endast 18 platser kvar i nästa omgång",
    "🎯 Nästa start: 15 oktober - Missa inte!"
  ];

  const testimonials = [
    {
      name: "Anna Lindberg",
      role: "Styrelseordförande, Brf Kastanjen",
      text: "Efter kursen sparade vi 180 000 kr på vårt fasadprojekt genom bättre förhandling. Kursen betalade sig själv 60 gånger om!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Sparade 180 000 kr",
      beforeAfter: "Från att inte förstå anbud till att förhandla som en expert"
    },
    {
      name: "Lars Eriksson", 
      role: "Vice ordförande, Brf Sjöutsikt",
      text: "Jag gick från att vara tyst i styrelsen till att leda vårt största renoveringsprojekt någonsin. Kursen gav mig verktyg och självförtroende.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Ledde 2,3M SEK projekt",
      beforeAfter: "Från tystlåten till projektledare"
    },
    {
      name: "Maria Johansson",
      role: "Kassör, Brf Tallkotten", 
      text: "Tack vare kursen upptäckte jag fel i vår budget som skulle ha kostat oss 75 000 kr. Nu förstår jag varenda siffra i årsredovisningen.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      result: "Sparade 75 000 kr",
      beforeAfter: "Från förvirrad till ekonomi-expert"
    }
  ];

  const transformationSteps = [
    {
      phase: "Dag 1-7",
      title: "Diskriminering",
      description: "Lär dig lagarna och reglerna så du aldrig behöver gissa igen",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 8-21", 
      title: "Föreningens intressenter",
      description: "Förstå varje post i budgeten och upptäck besparingspotential",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 22-42",
      title: "Likhetsprincipen", 
      description: "Lär dig leda möten och hantera konflikter som en professionell",
      icon: Users,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 43-56",
      title: "Arbetsgivaransvar",
      description: "Avancerade tekniker för förhandling, projektstyrning och beslutsfattande",
      icon: Award,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 1-7",
      title: "Diskriminering",
      description: "Lär dig lagarna och reglerna så du aldrig behöver gissa igen",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 8-21", 
      title: "Föreningens intressenter",
      description: "Förstå varje post i budgeten och upptäck besparingspotential",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 22-42",
      title: "Likhetsprincipen", 
      description: "Lär dig leda möten och hantera konflikter som en professionell",
      icon: Users,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      phase: "Dag 43-56",
      title: "Arbetsgivaransvar",
      description: "Avancerade tekniker för förhandling, projektstyrning och beslutsfattande",
      icon: Award,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const faqs = [
    {
      question: "Är det här verkligen värt pengarna om jag redan sitter i styrelsen?",
      answer: "Absolut! 73% av våra deltagare har redan erfarenhet. De flesta sparar mer än kursavgiften på sitt första projekt efter kursen. Anna Lindberg sparade 180 000 kr på sitt fasadprojekt efter kursen."
    },
    {
      question: "Hur lång tid tar det att genomföra kursen?",
      answer: "Kursen är designad för upptagna människor. Du kan genomföra den på 8 veckor med 1 timme per vecka, eller snabbare om du vill. Allt material finns tillgängligt direkt och du har livstidsåtkomst."
    },
    {
      question: "Vad händer om min förening inte vill betala för kursen?",
      answer: "Många får kursen betald av föreningen, men även om du betalar själv tjänar du in pengarna snabbt. Genomsnittlig besparing första året är 127 000 kr per förening. Dessutom får du kunskap för livet."
    },
    {
      question: "Är kursen uppdaterad med senaste lagändringarna?",
      answer: "Ja! Vi uppdaterar kursen kontinuerligt. Som deltagare får du alla uppdateringar gratis för livet. Vi följer alla lagändringar och säkerställer att du alltid har senaste informationen."
    },
    {
      question: "Fungerar garantin verkligen? Inga dolda villkor?",
      answer: "Garantin är 100% äkta. Om du inte är nöjd inom 60 dagar får du alla pengar tillbaka. Inga frågor, inga krångel. Vi har mindre än 2% som begär återbetalning, men garantin gäller för alla."
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Urgency Bar */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 text-center relative overflow-hidden"
      >
        <motion.div 
          animate={{ x: [-1000, 1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="relative z-10 font-semibold">
          🎯 BEGRÄNSAT MED PLATSER: Nästa kursstart {timeLeft.days} dagar, {timeLeft.hours}h, {timeLeft.minutes}min
        </div>
      </motion.div>

      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1"
            >
              <img 
                src="/logo.png" 
                alt="Styrelseexpert Logotyp"
                width={40} 
                height={40}
                className="object-contain" 
              />
              <div>
                <div className="text-xl font-bold text-slate-800">
                  <span className="text-[#FF5421]">Styrelse</span>körkortet
                </div>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'Kursens innehåll', id: 'transformation' },
                { name: 'Omdömen & recensioner', id: 'results' },
                { name: 'Kursinnehåll', id: 'content' },
                { name: 'Garanti', id: 'guarantee' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ color: '#FF5421' }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-700 hover:text-orange-500 transition-colors font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                <Users size={16} />
                <span>847+ genomförda</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
                style={{ backgroundColor: '#FF5421' }}
              >
                Jag har en gruppkod
              </motion.button>
              
              <button
                className="md:hidden text-slate-600"
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
                className="md:hidden border-t border-slate-200 py-4"
              >
                <div className="flex flex-col space-y-4">
                  {[
                    { name: 'Kursens innehåll', id: 'transformation' },
                    { name: 'Resultat', id: 'results' },
                    { name: 'Kursinnehåll', id: 'content' },
                    { name: 'Garanti', id: 'guarantee' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-slate-600 hover:text-orange-500 py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section with Background Image */}
      <section 
        className="pt-16 pb-20 relative min-h-screen flex items-center bg-no-repeat"
      >
        <img 
          src="https://wzpjchonkpandfuiofcb.supabase.co/storage/v1/object/public/course_thumbnails/c1.jpg" 
          alt="Bakgrundsbild för styrelseutbildning"
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/75"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                  EN KURS FÖR FÖRTROENDEVALDA I BOSTADSRÄTTSFÖRENINGAR
                </div>
                <span className="text-white/80">Du känner dig osäker som styrelseledamot</span>
              </div>
              
              <h1 className="text-5xl font-bold text-white leading-tight">
                <span style={{ color: '#FF5421' }}>Kvalitetssäkra </span> er bostadsrättsförening idag och bli 
                <span style={{ color: '#FF5421' }}> tryggare i din styrelse</span>roll
              </h1>
              
              <div className="space-y-4">
                <p className="text-xl text-white/90">
                  Om 8 veckor kommer du att vara den styrelseledamot som:
                </p>
                <ul className="space-y-3">
                  {[
                    "Förstår varenda post i årsredovisningen",
                    "Leder komplicerade diskussioner med självförtroende", 
                    "Sparar föreningen tusentals kronor genom smart förhandling",
                    "Hanterar konflikter innan de exploderar"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="text-green-400 mt-1" size={20} />
                      <span className="text-white/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
                >
                  <Zap size={24} />
                  JA, jag vill bli expert!
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Video size={20} />
                  Se transformation (2 min)
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 3).map((person, index) => (
                      <img 
                        key={index}
                        src={person.image} 
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt=""
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/80">847+ nöjda deltagare</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-white/80 ml-2">4.9/5 betyg</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm animate-pulse">
                  18 platser kvar
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-slate-900">Erbjudande</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-2xl text-slate-500 line-through">4 995 kr</span>
                    <span className="text-4xl font-bold" style={{ color: '#FF5421' }}>2 995 kr</span>
                  </div>
                  <div className="text-slate-600 mt-2">Spara 2 000 kr - bara denna vecka</div>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    "✅ 8 veckors steg-för-steg transformation",
                    "✅ 15+ praktiska mallar och verktyg", 
                    "✅ Livstidsåtkomst + uppdateringar",
                    "✅ Certifikat från Styrelseexpert",
                    "✅ 60 dagars pengarna-tillbaka-garanti"
                  ].map((feature, index) => (
                    <div key={index} className="text-slate-700">{feature}</div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-slate-950 to-slate-950 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg"
                >
                  🔒 Säkra min plats nu
                </motion.button>
                
                <div className="text-center mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                    <Lock size={14} />
                    <span>Säker betalning med Klarna/Swish</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Nästa omgång startar {timeLeft.days} dagar, {timeLeft.hours}h, {timeLeft.minutes}min
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-4 bg-slate-900 text-white overflow-hidden">
        <motion.div 
          animate={{ x: [-1000, 1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {urgencyMessages.concat(urgencyMessages).map((message, index) => (
            <div key={index} className="text-sm font-medium">
              {message}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section with Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-slate-100 text-slate-800 rounded-full font-semibold mb-4">
              VARFÖR VÄLJA OSS
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Komplett styrelseutbildning för moderna ledamöter
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "All inclusive",
                subtitle: "Teknik, juridik & ekonomi",
                icon: "📚",
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Expert instruktörer", 
                subtitle: "Lär av branschens bästa",
                icon: "👨‍🏫",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Livstidsåtkomst",
                subtitle: "Lär dig i din egen takt",
                icon: "🕐",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[4/3] relative">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Journey with Images */}
      <section id="transformation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 text-white rounded-full font-semibold mb-4" style={{ backgroundColor: '#FF5421' }}>
              DIN 8-VECKORS TRANSFORMATION
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Från lekman till styrelseproffs i 4 enkla steg
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Följ vår beprövade process som redan hjälpt 847+ styrelseledamöter att bli trygga och kompetenta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 h-full hover:shadow-2xl transition-shadow">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/40"></div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-xs font-bold" style={{ color: '#FF5421' }}>{step.phase}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF5421' }}>
                          <Icon className="text-white" size={24} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {index < transformationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 rounded-full flex items-center justify-center transform -translate-y-1/2 z-10" style={{ backgroundColor: '#FF5421' }}>
                      <ArrowRight className="text-white" size={16} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section 
        id="results" 
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-slate-900/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Verkliga resultat från verkliga människor
            </h2>
            <p className="text-xl text-white/80">
              Se exakt vad som händer när du går från osäker till expert
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{testimonials[activeTestimonial].name}</div>
                      <div className="text-slate-600">{testimonials[activeTestimonial].role}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-slate-800 text-lg italic mb-4">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>
                  
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="font-bold text-green-600 text-lg mb-1">
                      🎯 Konkret resultat: {testimonials[activeTestimonial].result}
                    </div>
                    <div className="text-slate-600">
                      {testimonials[activeTestimonial].beforeAfter}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeTestimonial === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/95 backdrop-blur-sm text-slate-900 rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6">Genomsnittliga resultat:</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '127 000 kr', label: 'Sparade per förening' },
                    { number: '87%', label: 'Känner sig säkrare' },
                    { number: '4.9/5', label: 'Snittbetyg' },
                    { number: '94%', label: 'Rekommenderar kursen' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: '#FF5421' }}>{stat.number}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50/95 border border-green-200 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp className="text-green-600" size={24} />
                  <span className="font-bold text-green-800">Garanterat resultat</span>
                </div>
                <p className="text-green-700">
                  Om du inte känner dig betydligt säkrare som styrelseledamot efter 60 dagar, 
                  får du alla pengar tillbaka. Inga krångliga villkor.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content with Images */}
      <section id="content" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Exakt vad du får för 2 995 kr
            </h2>
            <p className="text-xl text-slate-600">
              Komplett toolkit för att bli en framgångsrik styrelseledamot
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "📋 Praktiska verktyg",
                subtitle: "värde: 2 500 kr",
                items: [
                  "15+ färdiga mallar",
                  "Ekonomiska checklistor",
                  "Mötesprotokoll-mallar",
                  "Budgetplanerare"
                ],
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "🏆 Support & Certifiering", 
                subtitle: "värde: 1 500 kr",
                items: [
                  "Officiellt certifikat",
                  "Email-support i 6 månader",
                  "Månatliga Q&A sessioner",
                  "Livstidsuppdateringar"
                ],
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden group"
              >
                <div className="aspect-[3/2] relative">
                  <img 
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/70"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{section.subtitle}</p>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle className="text-green-400 mt-0.5" size={16} />
                          <span className="text-white/90 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-white rounded-2xl p-8 max-w-2xl mx-auto" style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}>
              <h3 className="text-2xl font-bold mb-2">Totalt värde: 8 000 kr</h3>
              <h4 className="text-3xl font-bold mb-4">Du betalar: 2 995 kr</h4>
              <p className="text-white/90 mb-6">
                Du sparar 5 005 kr och får allt du behöver för att lyckas som styrelseledamot
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🔥 Få tillgång nu - Spara 5 005 kr
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section 
        id="guarantee" 
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-green-900/80"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-white/20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-white" size={48} />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              60 Dagars Pengarna-Tillbaka-Garanti
            </h2>
            
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Vi är så säkra på att den här kursen kommer att transformera dig från osäker till expert 
              att vi erbjuder en <strong>fullständig 60-dagars garanti</strong>.
            </p>
            
            <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
              <p className="text-green-800 font-semibold">
                Om du inte känner dig betydligt tryggare och mer kompetent som styrelseledamot 
                efter 60 dagar, kontakta oss så återbetalar vi varenda krona. 
                <span className="underline">Inga krångliga villkor. Inga frågor.</span>
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>Säker betalning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>Omedelbar tillgång</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span>30s återbetalning</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Vanliga frågor
            </h2>
            <p className="text-xl text-slate-600">
              Här är svaren på de frågor vi får mest
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
                  className="w-full px-8 py-6 text-left flex justify-between items-center transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-slate-900 text-lg pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={24} className="flex-shrink-0" style={{ color: '#FF5421' }} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-700 text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        className="py-20 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-slate-900/85"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-slate-950 text-white rounded-full font-bold mb-6 animate-pulse">
              ⏰ BEGRÄNSAT MED PLATSER
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ditt val just nu avgör din framtid som styrelseledamot
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Om 8 veckor kan du antingen vara <span className="font-bold" style={{ color: '#FF5421' }}>experten</span> som andra 
              lyssnar på, eller <span className="text-red-400 font-bold">fortfarande den osäkra</span> som inte vågar säga något.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-red-400 mb-4">❌ Utan kursen:</h3>
                <ul className="text-left space-y-2 text-white/90">
                  <li>• Fortsätt vara osäker i styrelsen</li>
                  <li>• Missa viktiga besparingsmöjligheter</li>
                  <li>• Riskera dyra misstag</li>
                  <li>• Förbli "den tysta" ledamoten</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-green-400 mb-4">✅ Med kursen:</h3>
                <ul className="text-left space-y-2 text-white/90">
                  <li>• Bli experten andra lyssnar på</li>
                  <li>• Spara tusentals kronor för föreningen</li>
                  <li>• Hantera alla situationer med självförtroende</li>
                  <li>• Få respekt och uppskattning</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm text-slate-900 rounded-2xl p-8 mb-8 max-w-lg mx-auto border border-white/20">
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-2">Specialpris slutar om:</div>
                <div className="flex justify-center gap-4 mb-4">
                  {[
                    { value: timeLeft.days, label: 'dagar' },
                    { value: timeLeft.hours, label: 'timmar' }, 
                    { value: timeLeft.minutes, label: 'min' }
                  ].map((time, index) => (
                    <div key={index} className="bg-slate-900 text-white px-3 py-2 rounded-lg">
                      <div className="text-2xl font-bold">{time.value}</div>
                      <div className="text-xs">{time.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="text-3xl font-bold mb-2" style={{ color: '#FF5421' }}>2 995 kr</div>
                <div className="text-sm text-slate-600 line-through mb-4">Ordinarie pris: 4 995 kr</div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-xl mb-4"
                >
                  🚀 JA, jag vill bli expert nu!
                </motion.button>
                
                <div className="text-xs text-slate-600 space-y-1">
                  <div>✅ Omedelbar tillgång</div>
                  <div>✅ 60 dagars garanti</div>
                  <div>✅ Säker betalning</div>
                </div>
              </div>
            </div>
            
            <p className="text-white/80 text-sm">
              Över 847+ styrelseledamöter har redan gjort valet. 
              <span className="font-semibold" style={{ color: '#FF5421' }}>Vad väntar du på?</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating CTA */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 text-white rounded-full shadow-2xl border-4 border-white"
            style={{ background: 'linear-gradient(to right, #FF5421, #E04619)' }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 font-bold flex items-center gap-2"
            >
              <Zap size={20} />
              Starta nu - 2 995 kr
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1 mb-4">
                <img
                  src="/footer.png"
                  alt="Styrelsekörkortet Logotyp"
                  width={32}
                  height={32}
                  className="object-contain" 
                />
                <div className="text-xl font-bold text-white">
                  <span className="text-[#FF5421]">Styrelse</span>körkortet
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Sveriges ledande utbildningsplattform för styrelseledamöter i bostadsrättsföreningar.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>⭐⭐⭐⭐⭐</div>
                <div>4.9/5 av 847+ deltagare</div>
              </div>
            </motion.div>
            
            {[
              {
                title: 'Kurser',
                links: ['Styrelseutbildning', 'Ekonomi för styrelser', 'Juridik för ledamöter']
              },
              {
                title: 'Support',
                links: ['Kontakt', 'FAQ', 'Teknisk hjälp', 'Återbetalning']
              },
              {
                title: 'Företag',
                links: ['Om oss', 'Integritetspolicy', 'Användarvillkor', 'Certifiering']
              }
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h4 className="font-bold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        whileHover={{ color: '#FF5421', x: 5 }}
                        href="#"
                        className="hover:text-orange-500 transition-all cursor-pointer"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-slate-400 text-sm">
              © 2024 Styrelseexpert. Alla rättigheter förbehållna.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm">
              <span className="flex items-center gap-2">
                <Lock size={14} />
                Säkra betalningar
              </span>
              <span className="flex items-center gap-2">
                <Shield size={14} />
                60 dagars garanti
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumCoursePage;