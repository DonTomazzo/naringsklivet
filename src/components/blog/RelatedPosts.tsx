// src/components/blog/RelatedPosts.tsx
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Post } from '../../data/posts';
import { motion } from 'framer-motion';

interface RelatedPostsProps {
  posts: Post[];
  currentType: string;
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
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
            RELATERAT INNEHÅLL
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Läs även dessa artiklar
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Mer kunskap om styrelsearbete i bostadsrättsföreningar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 h-full flex flex-col"
                >
                  {post.header_image_url && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.header_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span 
                            className="px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg"
                            style={{ backgroundColor: '#FF5421' }}
                          >
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#FF5421] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    {post.subtitle && (
                      <p className="text-slate-700 mb-3 line-clamp-2 text-sm font-medium">
                        {post.subtitle}
                      </p>
                    )}

                    {post.excerpt && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.published_at).toLocaleDateString('sv-SE', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      
                      <div className="flex items-center text-sm font-bold text-[#FF5421] opacity-0 group-hover:opacity-100 transition-opacity">
                        Läs mer
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.article>
          ))}
        </div>

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
