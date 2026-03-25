// src/modules/InteractiveDragMatch_Carousel.jsx

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, X, RefreshCw, Award, Sparkles, 
  AlertCircle, ThumbsUp, Target, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';

// ============================================
// 1. 📊 MOCKDATA
// ============================================

const SECTION_ID = 'drag-match-styrelseroller';
const SECTION_TITLE = 'Matcha Styrelserollerna';
const SECTION_SUBTITLE = 'Dra varje ansvar till rätt styrelseroll';
const SECTION_POINTS = 150;
const SECTION_ICON = Target;
const COMPLETE_BUTTON_COLOR = "bg-gradient-to-r from-[#FF5421] to-[#E64A1E]";

// Kategorier (drop zones)
const CATEGORIES = [
  {
    id: 'ordforande',
    title: 'Ordföranden',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: '👔',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Man i kostym
    name: 'Erik Andersson',
    description: 'Leder styrelsens arbete'
  },
  {
    id: 'kassör',
    title: 'Kassören',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    icon: '💰',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', // Kvinna professionell
    name: 'Anna Karlsson',
    description: 'Ansvarar för ekonomin'
  },
  {
    id: 'sekreterare',
    title: 'Sekreteraren',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    icon: '📝',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', // Kvinna glad
    name: 'Maria Nilsson',
    description: 'Dokumenterar möten'
  },
  {
    id: 'ledamot',
    title: 'Ledamoten',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    icon: '👥',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', // Man professionell
    name: 'Johan Svensson',
    description: 'Stödjer styrelsen'
  }
];

// Items att matcha (draggables)
const ITEMS = [
  { 
    id: 1, 
    text: 'Kallar till styrelsemöten', 
    correctCategory: 'ordforande',
    explanation: 'Ordföranden ansvarar för att kalla till och leda möten.'
  },
  { 
    id: 2, 
    text: 'Skriver mötesprotokoll', 
    correctCategory: 'sekreterare',
    explanation: 'Sekreteraren dokumenterar allt som sägs och beslutas.'
  },
  { 
    id: 3, 
    text: 'Bevakar föreningens ekonomi', 
    correctCategory: 'kassör',
    explanation: 'Kassören har översikt över alla ekonomiska transaktioner.'
  },
  { 
    id: 4, 
    text: 'Representerar föreningen utåt', 
    correctCategory: 'ordforande',
    explanation: 'Ordföranden är föreningens ansikte utåt.'
  },
  { 
    id: 5, 
    text: 'Betalar fakturor', 
    correctCategory: 'kassör',
    explanation: 'Kassören hanterar alla betalningar.'
  },
  { 
    id: 6, 
    text: 'Arkiverar handlingar', 
    correctCategory: 'sekreterare',
    explanation: 'Sekreteraren ser till att dokument sparas korrekt.'
  },
  { 
    id: 7, 
    text: 'Deltar i styrelsebeslut', 
    correctCategory: 'ledamot',
    explanation: 'Alla ledamöter har lika rösträtt i beslut.'
  },
  { 
    id: 8, 
    text: 'Arbetar i arbetsgrupper', 
    correctCategory: 'ledamot',
    explanation: 'Ledamöter kan ta specifika ansvarsområden.'
  }
];

// ============================================
// 2. 📦 UNDERKOMPONENTER
// ============================================

// Draggable Item (Kompakt chip-stil)
const DraggableChip = ({ item, onDragStart, isPlaced, onClick }) => {
  return (
    <motion.div
      draggable={!isPlaced}
      onDragStart={(e) => onDragStart(e, item)}
      onClick={() => !isPlaced && onClick && onClick(item)}
      className={`
        ${isPlaced ? 'opacity-30 pointer-events-none' : 'cursor-pointer'}
        bg-white border-2 border-slate-300 rounded-full px-4 py-2 shadow-md
        hover:shadow-lg hover:border-[#FF5421] hover:scale-105 transition-all
        inline-flex items-center gap-2
      `}
      whileHover={!isPlaced ? { scale: 1.05 } : {}}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
    >
      <Sparkles className="w-4 h-4 text-[#FF5421] flex-shrink-0" />
      <span className="text-sm font-medium text-slate-800">{item.text}</span>
    </motion.div>
  );
};

// Carousel Drop Zone (Den aktiva rollen)
const CarouselDropZone = ({ category, items, onDrop, onDragOver, isCorrect, showFeedback, onRemoveItem }) => {
  const hasItems = items.length > 0;
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipingItem, setSwipingItem] = useState(null);
  const touchTimeoutRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  const longPressDelay = 500; // 500ms för långtryck

  const onTouchStart = (e, item) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    setSwipingItem(item.id);
    
    // Långtryck för alternativ borttagning
    touchTimeoutRef.current = setTimeout(() => {
      if (!showFeedback && onRemoveItem && touchStart) {
        // Vibration om tillgängligt
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        onRemoveItem(item, category.id);
        setSwipingItem(null);
        setTouchStart(null);
      }
    }, longPressDelay);
  };

  const onTouchMove = (e, item) => {
    // Rensa långtryck-timer om användaren börjar swipea
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    
    setTouchEnd(e.targetTouches[0].clientY);
    
    // Förhindra scroll om vi swipear uppåt
    const distance = touchStart - e.targetTouches[0].clientY;
    if (distance > 10) { // Små swipes uppåt
      e.preventDefault();
    }
  };

  const onTouchEnd = (item) => {
    // Rensa långtryck-timer
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    
    if (!touchStart || !touchEnd) {
      setSwipingItem(null);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    
    if (isUpSwipe && !showFeedback && onRemoveItem) {
      // Vibration vid borttagning
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      onRemoveItem(item, category.id);
    }
    
    setSwipingItem(null);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getSwipeOffset = (itemId) => {
    if (swipingItem !== itemId || !touchStart || !touchEnd) return 0;
    const distance = touchStart - touchEnd;
    return distance > 0 ? Math.min(distance, 100) : 0;
  };

  // Cleanup på unmount
  React.useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onDrop={(e) => onDrop(e, category.id)}
      onDragOver={onDragOver}
      className={`
        relative rounded-3xl p-8 min-h-[500px] border-4 border-dashed
        transition-all duration-300
        ${hasItems ? 'border-slate-300 bg-white' : 'border-slate-300 bg-slate-50'}
        ${showFeedback && hasItems ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : ''}
      `}
    >
      {/* Header with Image */}
      <div className={`${category.color} rounded-2xl p-6 mb-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative text-center">
          {/* Profile Image */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white"
          >
            <img 
              src={category.imageUrl} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <h3 className="text-3xl font-bold mb-1">{category.title}</h3>
          <p className="text-lg font-semibold text-white/90 mb-2">{category.name}</p>
          <p className="text-white/80 text-sm">{category.description}</p>
        </div>
        
        {/* Feedback Badge */}
        {showFeedback && hasItems && (
          <div className="absolute top-4 right-4 bg-white/20 rounded-full p-2">
            {isCorrect ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <X className="w-8 h-8 text-white" />
            )}
          </div>
        )}
      </div>

      {/* Drop Area */}
      <div className="min-h-[200px] bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
            <Target className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">Släpp ansvar här</p>
            <p className="text-sm text-slate-400 mt-2">Klicka på kort ovan eller dra hit</p>
            <p className="text-xs text-slate-400 mt-1">📱 Swipe upp eller långtryck för att ta bort</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => {
              const swipeOffset = getSwipeOffset(item.id);
              const isSwiping = swipingItem === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0, x: -20 }}
                  animate={{ 
                    scale: 1, 
                    opacity: isSwiping ? Math.max(1 - swipeOffset / 100, 0.3) : 1, 
                    x: 0,
                    y: isSwiping ? -swipeOffset : 0
                  }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (!showFeedback && onRemoveItem) {
                      onRemoveItem(item, category.id);
                    }
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    onTouchStart(e, item);
                  }}
                  onTouchMove={(e) => {
                    e.stopPropagation();
                    onTouchMove(e, item);
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    onTouchEnd(item);
                  }}
                  className={`
                    bg-white rounded-xl p-4 shadow-md group relative
                    ${!showFeedback ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}
                    ${showFeedback ? (isCorrect ? 'border-2 border-green-500' : 'border-2 border-red-500') : 'border border-slate-200'}
                    transition-all select-none
                  `}
                  style={{
                    touchAction: 'none', // Ändrat från pan-y till none för bättre kontroll
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                >
                  {/* Swipe indicator */}
                  {isSwiping && swipeOffset > 20 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center pointer-events-none z-10"
                    >
                      <div className="text-red-600 font-bold flex items-center gap-2">
                        <motion.div
                          animate={{ y: [-5, 0, -5] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        >
                          ↑
                        </motion.div>
                        <span className="text-sm">Släpp för att ta bort</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Hover hint för desktop */}
                  {!showFeedback && (
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block z-20">
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                        Högerklick, swipe upp eller långtryck
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-slate-800 font-medium flex-1">{item.text}</p>
                    {showFeedback && (
                      isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )
                    )}
                  </div>
                  {showFeedback && !isCorrect && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-sm text-red-600 flex items-start gap-2">
                        <span>💡</span>
                        <span>{item.explanation}</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Counter */}
      <div className="mt-4 text-center">
        <span className="text-sm text-slate-600 font-medium">
          {items.length} {items.length === 1 ? 'ansvar' : 'ansvar'} placerade
        </span>
      </div>
    </motion.div>
  );
};

// Carousel Navigation Dots
const CarouselDots = ({ total, active, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`
            transition-all duration-300 rounded-full
            ${active === index 
              ? 'w-8 h-3 bg-[#FF5421]' 
              : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'}
          `}
        />
      ))}
    </div>
  );
};

// Results Modal
const ResultsModal = ({ isOpen, onClose, score, total, onRetry }) => {
  const percentage = Math.round((score / total) * 100);
  const isPerfect = score === total;
  const isGood = percentage >= 70;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className={`${isPerfect ? 'bg-gradient-to-br from-green-500 to-green-600' : isGood ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'} p-8 text-white text-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10"></div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  {isPerfect ? (
                    <Award className="w-20 h-20 mx-auto mb-4" />
                  ) : isGood ? (
                    <ThumbsUp className="w-20 h-20 mx-auto mb-4" />
                  ) : (
                    <Target className="w-20 h-20 mx-auto mb-4" />
                  )}
                  <h3 className="text-3xl font-bold mb-2">
                    {isPerfect ? 'Perfekt! 🎉' : isGood ? 'Bra jobbat! 👏' : 'Fortsätt öva! 💪'}
                  </h3>
                  <p className="text-white/90">
                    {isPerfect ? 'Du matchade alla helt rätt!' : isGood ? 'Du är på rätt väg!' : 'Läs igenom och försök igen!'}
                  </p>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-slate-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-600">Resultat:</span>
                    <span className="text-3xl font-bold text-slate-800">{score}/{total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`h-full ${isPerfect ? 'bg-green-500' : isGood ? 'bg-blue-500' : 'bg-orange-500'}`}
                    />
                  </div>
                  <p className="text-center text-slate-600 mt-2">{percentage}% rätt</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onRetry}
                    className="flex-1 bg-slate-100 text-slate-800 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Försök igen</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-[#FF5421] text-white py-3 rounded-xl font-semibold hover:bg-[#E64A1E] transition-colors"
                  >
                    Fortsätt
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Drag & Drop Component with Carousel
const DragMatchCarousel = ({ categories, items, onComplete }) => {
  const [availableItems, setAvailableItems] = useState(items);
  const [categoryItems, setCategoryItems] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: [] }), {})
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, categoryId) => {
    e.preventDefault();
    if (!draggedItem) return;

    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    setCategoryItems(prev => ({
      ...prev,
      [categoryId]: [...prev[categoryId], draggedItem]
    }));
    setDraggedItem(null);
  };

  // Click to place item in active category
  const handleChipClick = (item) => {
    const activeCategoryId = categories[activeIndex].id;
    
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    setCategoryItems(prev => ({
      ...prev,
      [activeCategoryId]: [...prev[activeCategoryId], item]
    }));
  };

  // Right-click to remove item from category
  const handleRemoveItem = (item, categoryId) => {
    setCategoryItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(i => i.id !== item.id)
    }));
    setAvailableItems(prev => [...prev, item]);
  };

  const nextCategory = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const checkAnswers = () => {
    setShowFeedback(true);
    
    let correct = 0;
    let total = 0;

    categories.forEach(category => {
      const itemsInCategory = categoryItems[category.id];
      itemsInCategory.forEach(item => {
        total++;
        if (item.correctCategory === category.id) {
          correct++;
        }
      });
    });

    setTimeout(() => {
      setShowResults(true);
      if (onComplete) {
        onComplete(correct, total);
      }
    }, 1500);
  };

  const resetGame = () => {
    setAvailableItems(items);
    setCategoryItems(categories.reduce((acc, cat) => ({ ...acc, [cat.id]: [] }), {}));
    setShowFeedback(false);
    setShowResults(false);
    setDraggedItem(null);
    setActiveIndex(0);
  };

  const allItemsPlaced = availableItems.length === 0;
  const activeCategory = categories[activeIndex];

  let currentScore = 0;
  let currentTotal = 0;
  categories.forEach(category => {
    const itemsInCategory = categoryItems[category.id];
    itemsInCategory.forEach(item => {
      currentTotal++;
      if (item.correctCategory === category.id) {
        currentScore++;
      }
    });
  });

  return (
    <div className="w-full">
      {/* Available Items - Chips at top */}
      {!showFeedback && (
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-2 text-[#FF5421]" />
              Välj och dra ett ansvar
            </h3>
            <p className="text-slate-600">Dra korten till rätt styrelseroll nedan</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 min-h-[120px]">
            {availableItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-semibold text-lg">Alla kort placerade! 🎉</p>
                <p className="text-slate-600 text-sm">Klicka på "Kontrollera svar" för att se resultatet</p>
              </motion.div>
            ) : (
              availableItems.map((item) => (
                <DraggableChip
                  key={item.id}
                  item={item}
                  onDragStart={handleDragStart}
                  onClick={handleChipClick}
                  isPlaced={false}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Carousel Section */}
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevCategory}
            className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center hover:border-[#FF5421] hover:text-[#FF5421] transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-slate-600 mb-2">
              Roll {activeIndex + 1} av {categories.length}
            </p>
            <CarouselDots 
              total={categories.length} 
              active={activeIndex} 
              onChange={setActiveIndex}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCategory}
            className="w-12 h-12 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center hover:border-[#FF5421] hover:text-[#FF5421] transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Active Drop Zone */}
        <AnimatePresence mode="wait">
          <CarouselDropZone
            key={activeCategory.id}
            category={activeCategory}
            items={categoryItems[activeCategory.id]}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onRemoveItem={handleRemoveItem}
            isCorrect={categoryItems[activeCategory.id].every(item => item.correctCategory === activeCategory.id)}
            showFeedback={showFeedback}
          />
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        {!showFeedback ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={checkAnswers}
              disabled={!allItemsPlaced}
              className={`
                px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg
                ${allItemsPlaced 
                  ? 'bg-gradient-to-r from-[#FF5421] to-[#E64A1E] text-white hover:shadow-xl' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'}
              `}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Kontrollera svar</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-4 rounded-xl font-semibold text-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Börja om</span>
            </motion.button>
          </>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl flex items-center space-x-2 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Försök igen</span>
          </motion.button>
        )}
      </div>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        score={currentScore}
        total={currentTotal}
        onRetry={resetGame}
      />
    </div>
  );
};

// ============================================
// 3. 🚀 EXPORTERBAR SLUTKOMPONENT
// ============================================

const DragMatchSection = ({ isCompleted, onComplete }) => {
  const Icon = SECTION_ICON;

  const handleGameComplete = (score, total) => {
    console.log(`Spelet klart! Poäng: ${score}/${total}`);
  };

  return (
    <section 
      data-section={SECTION_ID} 
      className="min-h-screen flex items-center py-20 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
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
              className="inline-block bg-white rounded-full p-4 mb-6 shadow-xl border-4 border-[#FF5421]"
            >
              <Icon className="w-16 h-16 text-[#FF5421]" />
            </motion.div>
            
            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              {SECTION_TITLE}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {SECTION_SUBTITLE}
            </p>
          </div>

          {/* Game */}
          <DragMatchCarousel
            categories={CATEGORIES}
            items={ITEMS}
            onComplete={handleGameComplete}
          />

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

export default DragMatchSection;






