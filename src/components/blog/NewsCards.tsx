// src/components/blog/NewsCards.tsx
import { Link } from 'react-router-dom';
import { Calendar, User, Play, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPublishedPosts } from "../../data/posts";

export default function NewsCards() {
  // Hämta de 4 senaste artiklarna
  const latestPosts = getPublishedPosts().slice(0, 4);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div 
            className="inline-block px-4 py-2 rounded-full font-bold mb-4 text-white text-sm"
            style={{ backgroundColor: '#FF5421' }}
          >
            SENASTE ARTIKLARNA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Läs våra senaste guider
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Få expertkunskap om styrelsearbete i bostadsrättsföreningar
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {latestPosts.map((post, index) => {
            const isVideo = post.type === 'video';
            
            return (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col"
                >
                  
                  {/* Image/Video Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {post.header_image_url ? (
                      <>
                        <img
                          src={post.header_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full p-4 shadow-lg" style={{ backgroundColor: '#FF5421' }}>
                              <Play className="w-6 h-6 text-white fill-current" />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF5421, #E04619)' }}>
                        <BookOpen className="w-12 h-12 text-white opacity-50" />
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    {post.category && (
                      <div className="absolute top-3 left-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                          style={{ backgroundColor: '#FF5421' }}
                        >
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#FF5421] transition-colors leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {(post.excerpt || post.subtitle) && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt || post.subtitle}
                      </p>
                    )}

                    {/* Footer with Author & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        {post.user_profiles?.avatar_url ? (
                          <img 
                            src={post.user_profiles.avatar_url}
                            alt={post.user_profiles.name}
                            className="w-6 h-6 rounded-full mr-2 ring-2 ring-gray-100"
                          />
                        ) : (
                          <User className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-medium">{post.user_profiles?.name}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString('sv-SE', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="flex items-center text-sm font-bold text-[#FF5421] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Läs mer
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#FF5421' }}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Se alla artiklar
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
