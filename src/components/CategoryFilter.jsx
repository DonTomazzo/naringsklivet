import { useState, useEffect } from "react";

const CATEGORIES = [
    "Alla",
    "Populärt",            // NY
    "HR",
    "Sälj",
    "Marknad",
    "AI",
    "Teknik",
    "Design",
    "Ekonomi",
    "Ledarskap",
    "Personlig Utveckling", // NY
    "Entreprenörskap",      // NY
    "Beteendevetenskap",    // NY
    "Nyheter & Trend",      // NY
    "Konst & Kultur",       // NY
    "Hälsa & Välmående",    // NY
    "Mat & Dryck",          // NY
    "Juridik",              // NY
    "Skola",
    "Språk",
    "Historia",
    "Naturvetenskap",
    "Kort & Intensivt",     // NY
];

export default function CategoryFilter({ active, onSelect }) {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Simulera Ajax-hämtning av quiz-räknare per kategori
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      setLoading(true);
      
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulerad data - ersätt med riktig Ajax-call
      const mockCounts = {
        "Alla": 247,
        "HR": 32,
        "Sälj": 28,
        "Marknad": 41,
        "AI": 56,
        "Teknik": 38,
        "Design": 24,
        "Ekonomi": 19,
        "Ledarskap": 15,
        "Skola": 45,
        "Språk": 22,
        "Historia": 18,
        "Naturvetenskap": 31,
        "Populärt": 89,          // Tydlig Netflix-genre
    "Beteendevetenskap": 12, // Djuplodande ämne
    "Kort & Intensivt": 68,  // Format istället för ämne
    "Nyheter & Trend": 14,   // Aktuella ämnen
    "Konst & Kultur": 21,
    "Personlig Utveckling": 49,
    "Entreprenörskap": 35,
    "Hälsa & Välmående": 17,
    "Mat & Dryck": 9,
    "Juridik": 11,
      };
      
      setCounts(mockCounts);
      setLoading(false);
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryChange = async (cat) => {
    setLoading(true);
    
    // Simulera att data laddas när kategori byts
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onSelect(cat);
    setLoading(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-black border-t border-b border-gray-800 relative overflow-hidden">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 animate-pulse"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex gap-3 items-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {CATEGORIES.map((cat, index) => {
            const isActive = active === cat;
            const count = counts[cat] || 0;
            const isHovered = hoveredCategory === cat;
            
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                disabled={loading}
                className={`
                  group relative flex-shrink-0 text-sm font-medium px-5 py-2.5 rounded-full 
                  border transition-all duration-300 transform
                  ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
                  ${isActive
                    ? "bg-gradient-to-r from-[#FF5421] to-[#FF7851] text-white border-[#FF5421] shadow-lg shadow-orange-500/50 scale-105"
                    : "bg-gray-800/80 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600 hover:text-white hover:scale-105"
                  }
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideIn 0.4s ease-out forwards'
                }}
              >
                {/* Glow effect on active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5421] to-[#FF7851] blur-xl opacity-50 animate-pulse"></div>
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {cat}
                  
                  {/* Count badge */}
                  {!loading && count > 0 && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full transition-all duration-300
                      ${isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white"
                      }
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}>
                      {count}
                    </span>
                  )}

                  {/* Loading spinner */}
                  {loading && isActive && (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </span>

                {/* Hover indicator line */}
                {!isActive && (
                  <div className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#FF5421] to-[#FF7851]
                    transition-all duration-300
                    ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
                  `}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF5421] to-[#FF7851] animate-loading-bar"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-loading-bar {
          animation: loading-bar 1s ease-in-out infinite;
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: rgba(55, 65, 81, 0.8);
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb:hover {
          background-color: rgba(75, 85, 99, 1);
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}