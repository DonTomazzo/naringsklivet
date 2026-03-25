import { useState, useEffect, useMemo } from 'react'; // <-- useMemo importerad
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface HighScore {
  username: string;
  score: number;
  maxScore: number;
  date: string;
}

interface LeaderboardProps {
  quizSlug: string;
}


const LeaderboardComponent: React.FC<LeaderboardProps> = ({ quizSlug }) => {
  // Korrekt typning för useState
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'percentage' | 'date'>('percentage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
  const fetchLeaderboard = async () => {
    console.log('Fetching leaderboard for slug:', quizSlug);
    
    const { data, error } = await supabase
      .from('quiz_leaderboard')
      .select('player_name, score, max_score, created_at, time_taken_seconds')
      .eq('quiz_slug', quizSlug)
      .order('score', { ascending: false })
      .order('time_taken_seconds', { ascending: true })
      .limit(50);

    console.log('Leaderboard data:', data);
    console.log('Leaderboard error:', error);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return;
    }

    if (data) {
      const formattedScores: HighScore[] = data.map(entry => ({
        username: entry.player_name,
        score: entry.score,
        maxScore: entry.max_score,
        date: entry.created_at
      }));
      setHighScores(formattedScores);
    }
  };

  fetchLeaderboard();
}, [quizSlug]);

  // useMemo Hook för att sortera poängen
  const sortedScores = useMemo(() => {
    return [...highScores].sort((a, b) => {
      let compareA: number;
      let compareB: number;

      switch (sortBy) {
        case 'score':
          compareA = a.score;
          compareB = b.score;
          break;
        case 'percentage':
          // Förhindra division med noll om maxScore skulle vara 0
          compareA = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0;
          compareB = b.maxScore > 0 ? (b.score / b.maxScore) * 100 : 0;
          break;
        case 'date':
          compareA = new Date(a.date).getTime();
          compareB = new Date(b.date).getTime();
          // Fallback för ogiltiga datum
          if (isNaN(compareA)) compareA = 0;
          if (isNaN(compareB)) compareB = 0;
          break;
      }

      return sortOrder === 'desc' ? compareB - compareA : compareA - compareB;
    });
  }, [highScores, sortBy, sortOrder]);

  const toggleSort = (newSortBy: typeof sortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder(newSortBy === 'date' ? 'asc' : 'desc'); // Standard sortering för datum är vanligtvis ASC (äldst först) eller DESC (nyast först). Jag valde DESC för poäng/procent, men du kanske vill ha 'desc' även för datum (nyast först). Jag ändrar den till 'desc' för att matcha dina poängsorteringar.
    }
  };
  
  // Återställer till desc om kolumnen byts
  const toggleSortHandler = (newSortBy: typeof sortBy) => {
    if (newSortBy === sortBy) {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
        setSortBy(newSortBy);
        setSortOrder('desc'); // Återställ till DESC vid byte av kolumn
    }
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return null;
    return sortOrder === 'desc' ? '▼' : '▲';
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-2xl max-w-2xl mx-auto text-white">
      <div className="flex flex-col space-y-4">
        
        {/* Rubrik */}
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Leaderboard
        </h2>

        {/* --- */}

        {/* Sorteringsknappar */}
        <div className="flex justify-center space-x-2 p-2">
          <motion.button
            onClick={() => toggleSortHandler('percentage')}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${sortBy === 'percentage' ? 'bg-yellow-500 text-black shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Procent {getSortIcon('percentage')}
          </motion.button>
          <motion.button
            onClick={() => toggleSortHandler('score')}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${sortBy === 'score' ? 'bg-yellow-500 text-black shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Poäng {getSortIcon('score')}
          </motion.button>
          <motion.button
            onClick={() => toggleSortHandler('date')}
            whileHover={{ scale: 1.05 }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${sortBy === 'date' ? 'bg-yellow-500 text-black shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Datum {getSortIcon('date')}
          </motion.button>
        </div>

        {/* --- */}

        {/* Leaderboard Tabell */}
        <div className="overflow-x-auto">
          {highScores.length > 0 && (
            <motion.table 
              className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
              {/* Tabellhuvud */}
              <thead>
                <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
                  <th scope="col" className="p-3">#</th>
                  <th scope="col" className="p-3">Användare</th>
                  <th scope="col" className="p-3">Poäng</th>
                  <th scope="col" className="p-3">Procent</th>
                  <th scope="col" className="p-3">Datum</th>
                </tr>
              </thead>
              
              {/* Tabellkropp */}
              <AnimatePresence mode="popLayout">
                <motion.tbody 
                  className="divide-y divide-gray-800"
                >
                  {sortedScores.map((entry, index) => (
                    <motion.tr 
                      key={entry.date + entry.username + entry.score} // Använd en unik nyckel
                      className="transition-colors duration-150 hover:bg-gray-700/50"
                      variants={itemVariants}
                      layout // För framer-motion layout animering
                    >
                      <td className="p-3 whitespace-nowrap font-bold text-center">
                        {getRankEmoji(index + 1)}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium text-yellow-300">
                        {entry.username}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {entry.score} / {entry.maxScore}
                      </td>
                      <td className="p-3 whitespace-nowrap font-mono">
                        {Math.round((entry.score / entry.maxScore) * 100)}%
                      </td>
                      <td className="p-3 whitespace-nowrap text-sm text-gray-400">
                        {new Date(entry.date).toLocaleDateString('sv-SE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </motion.table>
          )}
        </div>

        {/* --- */}

        {/* Tomt tillstånd */}
        {highScores.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 text-center bg-gray-700/50 rounded-lg text-gray-400"
          >
            <p className="text-lg font-semibold">
                Inga poäng registrerade ännu. Spela quizet för att hamna på leaderboarden!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardComponent;