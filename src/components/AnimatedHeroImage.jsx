import { motion } from 'framer-motion';

const AnimatedHeroImage = ({ 
  imagePath = '/BILD.png', 
  alt = 'Hero Image',
  className = '' 
}) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {/* Animated image with multiple effects */}
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.8,
          x: 100,
          rotateY: 45
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: 0,
          rotateY: 0
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.8 },
          scale: { duration: 1, ease: "easeOut" },
        }}
        className="relative"
        style={{ perspective: '1000px' }}
      >
        <motion.img
          src={imagePath}
          alt={alt}
          className="w-full h-auto max-w-full object-contain"
          initial={{ filter: 'blur(10px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ 
            duration: 2,
            times: [0, 0.5, 1],
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Floating particles effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          initial={{ 
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedHeroImage;