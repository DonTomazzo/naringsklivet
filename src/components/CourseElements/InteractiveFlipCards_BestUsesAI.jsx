// src/modules/InteractiveFlipCards_BestUsesAI.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Lightbulb, Brain, Code, FileText, 
  MessageSquare, Image as ImageIcon, RefreshCw
} from 'lucide-react';

// ============================================
// 1. 📊 MOCKDATA
// ============================================

const SECTION_ID = 'best-uses-ai';
const SECTION_TITLE = 'Best Uses of AI';
const SECTION_SUBTITLE = 'Klicka på korten för att se olika användningsområden för AI';
const SECTION_POINTS = 100;
const SECTION_ICON = Brain;
const COMPLETE_BUTTON_COLOR = "bg-slate-900";

const FLIP_CARDS_DATA = [
  {
    id: 1,
    frontTitle: "Idea Generation and Problem-Solving",
    backTitle: "Kreativ Problemlösning",
    frontDescription: "AI quickly generates ideas, suggests solutions, and helps overcome creative blocks.",
    backContent: "AI kan snabbt generera kreativa idéer och lösningar genom att analysera mönster och kombinera information på nya sätt. Perfect för brainstorming och när du behöver nya perspektiv.",
    icon: Lightbulb,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    examples: ["Brainstorming sessions", "Content ideation", "Strategic planning"]
  },
  {
    id: 2,
    frontTitle: "Best Use 2",
    backTitle: "Kodgenerering & Utveckling",
    frontDescription: "Transform your ideas into working code instantly.",
    backContent: "AI kan skriva, debugga och optimera kod i många programmeringsspråk. Den kan förklara komplex kod och hjälpa dig lära dig nya tekniker snabbare.",
    icon: Code,
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
    examples: ["Code generation", "Bug fixing", "Code review"]
  },
  {
    id: 3,
    frontTitle: "Best Use 3",
    backTitle: "Textbearbetning & Skrivande",
    frontDescription: "Create, edit and improve any type of content.",
    backContent: "Från e-post till rapporter - AI kan hjälpa dig formulera, förbättra och anpassa din text för olika målgrupper och syften.",
    icon: FileText,
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    examples: ["Email writing", "Reports", "Documentation"]
  },
  {
    id: 4,
    frontTitle: "Best Use 4",
    backTitle: "Dataanalys & Insikter",
    frontDescription: "Turn raw data into actionable insights.",
    backContent: "AI kan snabbt analysera stora mängder data, hitta mönster och presentera insikter på ett lättförståeligt sätt.",
    icon: Brain,
    color: "bg-gradient-to-br from-pink-500 to-red-500",
    examples: ["Data visualization", "Trend analysis", "Predictions"]
  },
  {
    id: 5,
    frontTitle: "Best Use 5",
    backTitle: "Konversation & Support",
    frontDescription: "24/7 intelligent assistance and conversation.",
    backContent: "AI kan föra naturliga konversationer, svara på frågor och ge support dygnet runt på många språk.",
    icon: MessageSquare,
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
    examples: ["Customer service", "Virtual assistants", "Language practice"]
  },
  {
    id: 6,
    frontTitle: "Best Use 6",
    backTitle: "Bild & Kreativt Innehåll",
    frontDescription: "Generate and edit images with AI.",
    backContent: "Skapa unika bilder, redigera foton och generera visuellt innehåll baserat på textbeskrivningar.",
    icon: ImageIcon,
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    examples: ["Image generation", "Photo editing", "Design mockups"]
  }
];

// ============================================
// 2. 📦 UNDERKOMPONENTER
// ============================================

const FlipCard = ({ card, isFlipped, onFlip }) => {
  const Icon = card.icon;
  
  return (
    <motion.div
      className="relative h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className={`w-full h-full ${card.color} p-6 flex flex-col items-center justify-center text-white relative`}>
            {/* Refresh icon in top right */}
            <div className="absolute top-4 right-4 bg-white/20 rounded-full p-2">
              <RefreshCw className="w-5 h-5" />
            </div>
            
            {/* Icon */}
            <div className="bg-white/20 rounded-full p-6 mb-6">
              <Icon className="w-12 h-12" />
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-center mb-4">
              {card.frontTitle}
            </h3>
            
            {/* Description */}
            <p className="text-center text-white/90 text-sm px-4">
              {card.frontDescription}
            </p>
            
            {/* Click hint */}
            <div className="absolute bottom-4 text-sm text-white/70">
              Klicka för mer info
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-full p-6 flex flex-col">
            {/* Header with color accent */}
            <div className={`${card.color} -mx-6 -mt-6 mb-4 p-4 flex items-center justify-between`}>
              <h3 className="text-xl font-bold text-white">
                {card.backTitle}
              </h3>
              <div className="bg-white/20 rounded-full p-2">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <p className="text-slate-700 mb-4 leading-relaxed">
                {card.backContent}
              </p>
              
              {/* Examples */}
              {card.examples && card.examples.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    Exempel:
                  </h4>
                  <ul className="space-y-1">
                    {card.examples.map((example, i) => (
                      <li key={i} className="text-sm text-slate-600">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Click hint */}
            <div className="text-center text-sm text-slate-500 mt-4">
              Klicka för att vända tillbaka
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FlipCardsGrid = ({ cards }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {cards.map((card) => (
        <FlipCard
          key={card.id}
          card={card}
          isFlipped={flippedCards[card.id] || false}
          onFlip={() => toggleFlip(card.id)}
        />
      ))}
    </div>
  );
};

// ============================================
// 3. 🚀 EXPORTERBAR SLUTKOMPONENT
// ============================================

const BestUsesAISection = ({ isCompleted, onComplete }) => {
  const Icon = SECTION_ICON;
  
  return (
    <section 
      data-section={SECTION_ID} 
      className="min-h-screen flex items-center py-20"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block bg-white rounded-full p-4 mb-6 shadow-xl"
            >
              <Icon className="w-16 h-16 text-purple-600" />
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white mb-4">
              {SECTION_TITLE}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {SECTION_SUBTITLE}
            </p>
          </div>

          {/* Cards Grid */}
          <FlipCardsGrid cards={FLIP_CARDS_DATA} />

          {/* Complete Button */}
          {!isCompleted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onComplete(SECTION_ID)}
              className={`mt-12 mx-auto block ${COMPLETE_BUTTON_COLOR} text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Slutför lektion ({SECTION_POINTS > 0 ? `+${SECTION_POINTS}p` : 'Klar'})</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BestUsesAISection;


