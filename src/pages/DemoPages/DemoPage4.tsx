import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  CheckCircle, Star, Users, Clock, Award, ChevronDown, 
  Play, Phone, Mail, MapPin, Calendar, BookOpen, Target,
  ArrowRight, Quote, Shield, TrendingUp, FileText, Menu, X
} from 'lucide-react';

const HousingAssociationCoursePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    association: '',
    message: ''
  });

   const [isScrolled, setIsScrolled] = useState(false);

  // Scroll-listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroSlides = [
    {
      title: "Bli en trygg och kompetent styrelseledamot",
      subtitle: "Lär dig allt du behöver veta för att lyckas som förtroendevald",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
      cta: "Starta din resa idag"
    },
    {
      title: "Från osäker till expert på 8 veckor",
      subtitle: "Praktisk kunskap som du kan använda direkt i din styrelse",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
      cta: "Se vad kursen innehåller"
    },
    {
      title: "500+ förtroendevalda har redan genomgått kursen",
      subtitle: "Få samma kunskap och självförtroende som de",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80",
      cta: "Läs deras berättelser"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: "Juridisk säkerhet",
      description: "Förstå dina rättigheter och skyldigheter som styrelseledamot"
    },
    {
      icon: TrendingUp,
      title: "Ekonomisk kompetens",
      description: "Lär dig läsa ekonomiska rapporter och förstå föreningens ekonomi"
    },
    {
      icon: Users,
      title: "Ledarskap & kommunikation",
      description: "Utveckla dina färdigheter i att leda möten och kommunicera med medlemmar"
    },
    {
      icon: FileText,
      title: "Praktiska verktyg",
      description: "Få tillgång till mallar, checklistor och praktiska verktyg"
    }
  ];

  const testimonials = [
    {
      name: "Anna Lindberg",
      role: "Styrelseordförande, Brf Kastanjen",
      text: "Fantastisk kurs! Jag kände mig så mycket tryggare i min roll efter att ha gått kursen. Särskilt den juridiska delen var ovärderlig.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Lars Eriksson", 
      role: "Vice ordförande, Brf Sjöutsikt",
      text: "Som ny styrelseledamot var jag helt vilse. Den här kursen gav mig all kunskap jag behövde för att vara en effektiv ledamot.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Maria Johansson",
      role: "Kassör, Brf Tallkotten", 
      text: "Ekonomidelen var precis vad jag behövde! Nu förstår jag verkligen hur man läser en årsredovisning och budget.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    }
  ];

  const courseModules = [
    {
      title: "Grunderna i bostadsrätt",
      lessons: ["Bostadsrättslagen", "Föreningens organisation", "Medlemmarnas rättigheter"],
      duration: "2 timmar"
    },
    {
      title: "Styrelsens ansvar och uppgifter", 
      lessons: ["Juridiskt ansvar", "Beslutsfattande", "Dokumentation"],
      duration: "2.5 timmar"
    },
    {
      title: "Ekonomi och förvaltning",
      lessons: ["Budgetprocess", "Årsredovisning", "Avgifter och skulder"],
      duration: "3 timmar"
    },
    {
      title: "Kommunikation och möten",
      lessons: ["Årsmöten", "Styrelseprotokoll", "Konflikhantering"],
      duration: "2 timmar"
    },
    {
      title: "Praktiska fall och verktyg",
      lessons: ["Fallstudier", "Mallar", "Checklistor"],
      duration: "1.5 timmar"
    }
  ];

  const faqs = [
    {
      question: "Vem är kursen för?",
      answer: "Kursen riktar sig till både nya och erfarna förtroendevalda i bostadsrättsföreningar. Oavsett om du precis blivit vald eller har suttit i styrelsen i flera år, kommer du att få värdefull kunskap."
    },
    {
      question: "Hur lång tid tar kursen?",
      answer: "Kursen består av ca 11 timmar fördelat på 5 moduler. Du kan genomföra kursen i din egen takt, de flesta tar mellan 4-8 veckor att slutföra den."
    },
    {
      question: "Får jag ett certifikat?",
      answer: "Ja, efter genomförd kurs får du ett digitalt certifikat som bekräftar dina kunskaper inom bostadsrättsförvaltning."
    },
    {
      question: "Kan jag få kursen ersatt av föreningen?",
      answer: "Många föreningar ersätter kursavgiften för sina styrelseledamöter. Vi kan hjälpa dig med underlag för att ansöka om ersättning."
    },
    {
      question: "Vad händer om jag inte är nöjd?",
      answer: "Vi erbjuder 30 dagars pengarna-tillbaka-garanti. Är du inte nöjd får du pengarna tillbaka, inga frågor ställda."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Tack för ditt intresse! Vi återkommer inom 24 timmar.', {
      position: "top-right",
      autoClose: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      association: '',
      message: ''
    });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      
      {/* Header/Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm fixed w-full top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-slate-800 cursor-pointer"
            >
              BRF<span className="text-[#FF5421]">Akademin</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {[
                { name: 'Kursen', id: 'kurs' },
                { name: 'Innehåll', id: 'innehall' },
                { name: 'Omdömen', id: 'omdomen' },
                { name: 'FAQ', id: 'faq' },
                { name: 'Kontakt', id: 'kontakt' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ color: '#FF5421' }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-600 hover:text-[#FF5421] transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block bg-[#FF5421] text-white px-6 py-2 rounded-lg hover:bg-[#E04A1D] transition-colors"
              >
                Boka demo
              </motion.button>
              
              {/* Mobile menu button */}
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
                    { name: 'Kursen', id: 'kurs' },
                    { name: 'Innehåll', id: 'innehall' },
                    { name: 'Omdömen', id: 'omdomen' },
                    { name: 'FAQ', id: 'faq' },
                    { name: 'Kontakt', id: 'kontakt' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-slate-600 hover:text-[#FF5421] py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                  <button className="bg-[#FF5421] text-white px-6 py-2 rounded-lg w-fit">
                    Boka demo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section with Slider */}
      <section className="pt-16 relative overflow-hidden">
        <div className="relative h-[600px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={heroSlides[activeSlide].image}
                alt="Hero"
                className="w-full h-full object-cover opacity-30"
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-white"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`title-${activeSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-5xl font-bold mb-6 leading-tight"
                >
                  {heroSlides[activeSlide].title}
                </motion.h1>
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={`subtitle-${activeSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl mb-8 text-slate-200"
                >
                  {heroSlides[activeSlide].subtitle}
                </motion.p>
              </AnimatePresence>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF5421] hover:bg-[#E04A1D] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
                >
                  <Play size={20} />
                  {heroSlides[activeSlide].cta}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Läs mer
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

         
{/* Floating CTA-knapp - visas vid scroll */}
{isScrolled && (
  <motion.button
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    className="fixed bottom-8 right-8 bg-[#FF5421] hover:bg-[#E04A1D] text-white px-6 py-4 rounded-full shadow-xl z-[9999] font-semibold"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    Kom igång med kursen →
  </motion.button>
)}
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-[#FF5421]' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Genomförda kurser' },
              { number: '4.9/5', label: 'Snittbetyg' },
              { number: '11h', label: 'Kursinnehåll' },
              { number: '100%', label: 'Nöjdhetsgaranti' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="kurs" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Varför behöver du den här kursen?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Som förtroendevald bär du ett stort ansvar. Få den kunskap och de verktyg du behöver för att lyckas i din roll.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon size={32} className="text-[#FF5421]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section id="innehall" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Vad ingår i kursen?
            </h2>
            <p className="text-xl text-slate-600">
              5 omfattande moduler som täcker allt du behöver veta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Course content"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            
            <div className="space-y-4">
              {courseModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg shadow-sm cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-slate-800">{module.title}</h3>
                    <span className="text-[#FF5421] font-medium">{module.duration}</span>
                  </div>
                  <ul className="text-slate-600 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="omdomen" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Vad säger våra deltagare?
            </h2>
            <p className="text-xl text-slate-600">
              Hör från andra förtroendevalda som genomgått kursen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <Quote size={32} className="text-[#FF5421] mb-4" />
                <p className="text-slate-700 mb-6 italic">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Investera i din kunskap idag
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Få tillgång till all kunskap du behöver för att vara en framgångsrik styrelseledamot
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-slate-800 rounded-lg p-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF5421] mb-2">2 995 kr</div>
                <div className="text-slate-600 mb-6">Engångsavgift</div>
                
                <ul className="text-left space-y-3 mb-8">
                  {[
                    '11 timmar videoinnehåll',
                    'Praktiska verktyg och mallar',
                    'Certifikat vid genomförd kurs',
                    'Livstidstillgång',
                    '30 dagars pengarna-tillbaka-garanti'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#FF5421] hover:bg-[#E04A1D] text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
                  onClick={() => toast.info('Köpprocess öppnas här!')}
                >
                  Köp kursen nu
                </motion.button>
                
                <p className="text-sm text-slate-500 mt-4">
                  Eller kontakta oss för grupprabatt
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Vanliga frågor
            </h2>
            <p className="text-xl text-slate-600">
              Har du frågor? Här hittar du svar på de vanligaste frågorna
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
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                  className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-slate-600" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-slate-600">
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

      {/* Contact Form */}
      <section id="kontakt" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Har du frågor? Kontakta oss!
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Vi hjälper gärna dig med information om kursen eller svarar på dina frågor om bostadsrättsföreningar.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Phone, text: '08-123 456 78' },
                  { icon: Mail, text: 'info@brfakademin.se' },
                  { icon: MapPin, text: 'Stockholm, Sverige' }
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-4"
                    >
                      <Icon className="text-[#FF5421]" size={24} />
                      <span className="text-slate-700">{contact.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Office"
                className="w-full h-64 object-cover rounded-lg mt-8 shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-lg"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Namn *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    E-post *
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Telefon
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bostadsrättsförening
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="association"
                    value={formData.association}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meddelande
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF5421] focus:border-transparent transition-all resize-none"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-[#FF5421] hover:bg-[#E04A1D] text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  Skicka meddelande
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold mb-4">
                BRF<span className="text-[#FF5421]">Akademin</span>
              </div>
              <p className="text-slate-400">
                Sveriges ledande utbildningsplattform för förtroendevalda i bostadsrättsföreningar.
              </p>
            </motion.div>
            
            {[
              {
                title: 'Kurser',
                links: ['Grundkurs', 'Fördjupningskurs', 'Ekonomikurs']
              },
              {
                title: 'Support',
                links: ['Kontakt', 'FAQ', 'Hjälp']
              },
              {
                title: 'Företag',
                links: ['Om oss', 'Integritet', 'Villkor']
              }
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-slate-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        whileHover={{ color: '#FF5421', x: 5 }}
                        href="#"
                        className="hover:text-[#FF5421] transition-colors"
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
            className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400"
          >
            <p>&copy; 2024 BRF Akademin. Alla rättigheter förbehållna.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HousingAssociationCoursePage;