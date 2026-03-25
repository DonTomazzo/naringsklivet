import { motion } from "framer-motion";
import QuizCard from './QuizCard2';

export default function QuizCarousel({ title, quizzes }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
        <div className="text-sm text-gray-500 hidden sm:block hover:text-purple-600 transition-colors cursor-pointer">
          Visa alla →
        </div>
      </div>

      <motion.div
        className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {quizzes.map((quiz, idx) => (
          <div 
            key={quiz.slug || `quiz-${idx}`}
           className="snap-start flex-shrink-0 w-3/5 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <QuizCard 
              quiz={quiz} 
              index={idx} 
              delay={idx * 0.05}
            />
          </div>
        ))}
      </motion.div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}