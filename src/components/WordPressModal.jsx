import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// WordPress Modal Component med Framer Motion
const WordPressModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const wordpressThemes = [
    {
    id: 1,
    title: "Listeo Theme",
    description: "Ett av de tyngsta all-in-one för annonser och bokningar",
    image: "/listify.png", 
    year: "2023",
    },
    {
      id: 2,
      title: "Divi Builder",
      description: "Kraftfull drag-and-drop builder för kreativa lösningar",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      year: "2022",
    },
    {
      id: 3,
      title: "Elementor Pro",
      description: "Visuell editor för professionella webbplatser",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      year: "2023",
    },
    {
      id: 4,
      title: "GeneratePress",
      description: "Minimalistisk och SEO-optimerad",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
      year: "2022",
    },
    {
      id: 5,
      title: "OceanWP",
      description: "Mångsidig och funktionsrik för e-handel",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      year: "2021",
    },
  ];

  const handlePrevImage = () => {
    const currentIndex = wordpressThemes.findIndex(t => t.id === selectedImage);
    const prevIndex = currentIndex === 0 ? wordpressThemes.length - 1 : currentIndex - 1;
    setSelectedImage(wordpressThemes[prevIndex].id);
  };

  const handleNextImage = () => {
    const currentIndex = wordpressThemes.findIndex(t => t.id === selectedImage);
    const nextIndex = currentIndex === wordpressThemes.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(wordpressThemes[nextIndex].id);
  };

  const selectedTheme = wordpressThemes.find(t => t.id === selectedImage);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black bg-opacity-80 flex justify-center items-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-6xl bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 bg-gray-800 border-b border-purple-500/30">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Wordpress-eran
                </h2>
                <p className="text-gray-400 mt-1">Themes och tekniker jag har arbetat med</p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                aria-label="Stäng galleriet"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Gallery Grid */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wordpressThemes.map((theme, index) => (
                  <motion.div 
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => setSelectedImage(theme.id)}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <motion.img 
                        src={theme.image}
                        alt={theme.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-white font-semibold">Klicka för större bild</span>
                      </div>
                    </div>
                    <motion.div 
                      className="p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-purple-400">
                          {theme.title}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {theme.year}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{theme.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lightbox för större bilder */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronLeft size={32} />
                </motion.button>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="max-w-5xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedTheme?.image}
                    alt={selectedTheme?.title}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-center"
                  >
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">
                      {selectedTheme?.title}
                    </h3>
                    <p className="text-gray-300">{selectedTheme?.description}</p>
                  </motion.div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                >
                  <ChevronRight size={32} />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WordPressModal;