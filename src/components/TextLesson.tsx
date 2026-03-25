import { motion } from 'framer-motion';

interface TextLessonProps {
  content: string;
}

export const TextLesson: React.FC<TextLessonProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      <motion.div
        className="relative backdrop-blur-xl bg-gradient-to-br from-slate-100/95 to-white/90 border border-slate-300 rounded-3xl p-12 shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF5421]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5421] to-[#E04619] text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <span className="text-lg">📚</span>
            <span>Instuderingstext</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-slate-800 text-xl leading-relaxed font-light whitespace-pre-line">
              {content}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-[#FF5421] via-purple-500 to-transparent rounded-full mt-8 mb-8"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};