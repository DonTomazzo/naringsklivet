// src/components/blog/ArticlePost.tsx
import { BookOpen, Clock, Share2, BookmarkPlus } from 'lucide-react';
import { Post } from '../../data/posts';
import { motion } from 'framer-motion';

interface ArticlePostProps {
  post: Post;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function ArticlePost({ post }: ArticlePostProps) {
  const readingTime = post.content ? calculateReadingTime(post.content) : 0;

  return (
    <>
      {/* Header Image med overlay */}
      {post.header_image_url && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 -mx-4 md:mx-0"
        >
          <div className="relative aspect-[21/9] md:aspect-[21/9] overflow-hidden md:rounded-2xl shadow-2xl">
            <img 
              src={post.header_image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          </div>
        </motion.div>
      )}

      {/* Kategori, lästid och actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {post.category && (
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg"
              style={{ backgroundColor: '#FF5421' }}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {post.category}
            </div>
          )}
          <div className="flex items-center text-slate-600 bg-gray-100 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">{readingTime} min läsning</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Dela artikel"
          >
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Spara artikel"
          >
            <BookmarkPlus className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1]">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
            {post.subtitle}
          </p>
        )}
      </motion.header>

      {/* Excerpt - Sammanfattning */}
      {post.excerpt && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-50 to-gray-50 border-l-4 p-8 mb-12 rounded-r-xl shadow-sm" 
          style={{ borderColor: '#FF5421' }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF5421' }}>
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">Sammanfattning</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Article Content */}
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg max-w-none mb-16"
      >
        {post.content ? (
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="article-content"
          />
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg text-slate-500">Inget innehåll tillgängligt för denna artikel.</p>
          </div>
        )}
      </motion.article>

      {/* Share CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-8 text-center border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Var denna artikel till hjälp?
        </h3>
        <p className="text-slate-600 mb-6">
          Dela den med andra som kan ha nytta av informationen
        </p>
        <button 
          className="inline-flex items-center px-8 py-3 text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-lg"
          style={{ backgroundColor: '#FF5421' }}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Dela artikel
        </button>
      </motion.div>

      <style>{`
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid #f1f5f9;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #475569;
          font-size: 1.125rem;
        }
        
        .article-content ul, 
        .article-content ol {
          margin-bottom: 2rem;
          padding-left: 1.75rem;
        }
        
        .article-content li {
          margin-bottom: 0.75rem;
          color: #475569;
          line-height: 1.7;
          padding-left: 0.5rem;
        }
        
        .article-content ul li {
          position: relative;
        }
        
        .article-content ul li::marker {
          color: #FF5421;
          font-size: 1.2em;
        }
        
        .article-content strong {
          color: #0f172a;
          font-weight: 700;
        }
        
        .article-content a {
          color: #FF5421;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.2s;
        }
        
        .article-content a:hover {
          color: #E04619;
          text-decoration-thickness: 2px;
        }
        
        .article-content blockquote {
          border-left: 4px solid #FF5421;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #475569;
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        .article-content code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #FF5421;
          font-weight: 600;
        }
        
        .article-content pre {
          background: #1e293b;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        .article-content pre code {
          background: transparent;
          color: #e2e8f0;
          padding: 0;
          font-weight: 400;
        }
        
        /* Table styling */
        .article-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }
        
        .article-content th {
          background: #FF5421;
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 700;
        }
        
        .article-content td {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .article-content tr:hover {
          background: #f8fafc;
        }
      `}</style>
    </>
  );
}

