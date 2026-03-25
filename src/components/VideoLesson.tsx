import { motion } from 'framer-motion';

interface VideoLessonProps {
  videoUrl: string;
}

export const VideoLesson: React.FC<VideoLessonProps> = ({ videoUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={videoUrl}
            title="Lesson Video"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.div>
  );
};