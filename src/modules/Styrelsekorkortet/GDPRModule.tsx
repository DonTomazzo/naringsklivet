import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, ChevronDown } from 'lucide-react';
import GlobalSidebar from '../../components/GlobalSidebar';
import CourseQuiz from '../../components/CourseElements/CourseQuiz';
import { useCompletion } from '../../contexts/CompletionContext';

const GDPRModule = () => {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const { completeModule } = useCompletion();

  const handleQuizComplete = (score: number, maxScore: number) => {
    setActiveQuizId(null);
    // Spara till global completion
    completeModule('gdpr-personuppgifter', score, maxScore);
  };

  // Quiz data - enkel GDPR quiz
  const gdprQuiz = {
    id: 'gdpr-quiz',
    title: 'GDPR & Personuppgifter Quiz',
    slug: 'gdpr-quiz',
    questions: [
      {
        id: '1',
        question_text: 'Vad står GDPR för?',
        question_type: 'single_choice',
        question_order: 1,
        options: {
          choices: [
            'General Data Protection Regulation',
            'Global Data Privacy Rules',
            'General Document Protection Rights',
            'Government Data Privacy Requirements'
          ]
        },
        correct_answer: 'General Data Protection Regulation',
        explanation: 'GDPR står för General Data Protection Regulation och är EU:s dataskyddsförordning som trädde i kraft 2018.',
        points: 20
      },
      {
        id: '2',
        question_text: 'Vad räknas som personuppgifter enligt GDPR?',
        question_type: 'multiple_choice',
        question_order: 2,
        options: {
          choices: [
            'Namn och personnummer',
            'E-postadress',
            'Telefonnummer',
            'IP-adress'
          ]
        },
        correct_answer: ['Namn och personnummer', 'E-postadress', 'Telefonnummer', 'IP-adress'],
        explanation: 'Alla dessa är personuppgifter eftersom de kan användas för att identifiera en person direkt eller indirekt.',
        points: 25
      },
      {
        id: '3',
        question_text: 'Hur länge får en bostadsrättsförening spara medlemsuppgifter?',
        question_type: 'single_choice',
        question_order: 3,
        options: {
          choices: [
            'Så länge personen är medlem',
            'I 10 år efter utträde',
            'I 7 år efter utträde (bokföringslagens krav)',
            'För alltid'
          ]
        },
        correct_answer: 'I 7 år efter utträde (bokföringslagens krav)',
        explanation: 'Bokföringslagen kräver att ekonomiska handlingar sparas i 7 år. Efter det ska personuppgifter raderas om det inte finns annan rättslig grund.',
        points: 25
      },
      {
        id: '4',
        question_text: 'Vilka rättigheter har medlemmar enligt GDPR?',
        question_type: 'multiple_choice',
        question_order: 4,
        options: {
          choices: [
            'Rätt till tillgång (få ut sina uppgifter)',
            'Rätt till rättelse',
            'Rätt till radering',
            'Rätt till dataportabilitet'
          ]
        },
        correct_answer: ['Rätt till tillgång (få ut sina uppgifter)', 'Rätt till rättelse', 'Rätt till radering', 'Rätt till dataportabilitet'],
        explanation: 'GDPR ger registrerade personer flera viktiga rättigheter för att kontrollera sina personuppgifter.',
        points: 30
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalSidebar />

      <div 
        className="transition-all duration-300 pt-20"
        style={{ marginLeft: 'var(--sidebar-width, 320px)' }}
      >
        {/* INTRO SECTION */}
        <section data-section="intro" className="min-h-screen flex items-center relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&q=80" 
            alt="GDPR och Dataskydd"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75"></div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-block bg-[#FF5421] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ MODUL 3
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                GDPR & Personuppgifter
              </h1>
              
              <p className="text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                Lär dig hur bostadsrättsföreningar ska hantera personuppgifter enligt GDPR. 
                Förstå medlemmars rättigheter och föreningens skyldigheter.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 max-w-4xl">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Shield className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">1 Video</h3>
                  <p className="text-gray-300">Komplett genomgång av GDPR</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Play className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">15 minuter</h3>
                  <p className="text-gray-300">Snabb och effektiv inlärning</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <Shield className="w-12 h-12 text-[#FF5421] mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">100 Poäng</h3>
                  <p className="text-gray-300">Bli certifierad i GDPR</p>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FF5421] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#E64A1E] transition-all flex items-center space-x-2"
              >
                <span>Börja lära dig nu</span>
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section id="video-section" className="min-h-screen flex items-center py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Video
              </div>

              <h2 className="text-5xl font-bold text-slate-800 mb-6">
                GDPR för bostadsrättsföreningar
              </h2>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                I denna video går vi igenom allt du behöver veta om GDPR och personuppgiftshantering 
                i bostadsrättsföreningar.
              </p>

              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/qz0aGYrrlhU"
                    title="GDPR för bostadsrättsföreningar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  I videon lär du dig:
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF5421] font-bold">✓</span>
                    <span>Vad GDPR innebär för bostadsrättsföreningar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF5421] font-bold">✓</span>
                    <span>Vilka personuppgifter ni får behandla</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF5421] font-bold">✓</span>
                    <span>Medlemmars rättigheter enligt GDPR</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF5421] font-bold">✓</span>
                    <span>Hur länge ni får spara uppgifter</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF5421] font-bold">✓</span>
                    <span>Dokumentation och registerföring</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-8 bg-gradient-to-r from-[#FF5421] to-[#E64A1E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <span>Gå vidare till quiz</span>
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* QUIZ SECTION */}
        <section id="quiz-section" className="min-h-screen flex items-center relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80" 
              alt="Quiz bakgrund"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#171f32]/90"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-white mb-6 text-center">
                Testa dina kunskaper
              </h2>

              <p className="text-xl text-gray-300 mb-8 text-center">
                Visa att du behärskar GDPR! Få minst 80% rätt för att klara modulen.
              </p>

              {activeQuizId !== 'gdpr-quiz' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveQuizId('gdpr-quiz')}
                  className="bg-gradient-to-r from-[#FF5421] to-[#E64A1E] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Starta Quiz</span>
                </motion.button>
              ) : (
                <CourseQuiz
                  quizData={gdprQuiz}
                  onComplete={handleQuizComplete}
                />
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GDPRModule;