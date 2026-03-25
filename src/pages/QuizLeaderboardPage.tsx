import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeaderboardComponent from '../components/Leaderboard';

const QuizLeaderboardPage = () => {
  const { slug } = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to={`/quizzes/${slug}`}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka till quiz
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-white/70">Se topp-resultaten för detta quiz</p>
        </motion.div>
        
        <LeaderboardComponent quizSlug={slug!} />
      </div>
    </div>
  );
};

export default QuizLeaderboardPage;