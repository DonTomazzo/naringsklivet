import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '../../data/posts';

interface NewsroomClientProps {
  initialPosts: Post[];
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article 
        whileHover={{ y: -5 }}
        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200"
      >
        {post.header_image_url && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={post.header_image_url}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        <div className="p-6 flex-1 flex flex-col">
          {post.category && (
            <div className="mb-3">
              <span 
                className="inline-block text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full"
                style={{ backgroundColor: '#FF5421', color: 'white' }}
              >
                {post.category}
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#FF5421] transition-colors">
            {post.title}
          </h3>
          
          {post.subtitle && (
            <p className="text-slate-700 mb-3 line-clamp-2 text-sm font-medium">
              {post.subtitle}
            </p>
          )}

          {post.excerpt && (
            <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
            <div className="flex items-center text-sm text-slate-600">
              <User className="w-4 h-4 mr-2 text-slate-400" />
              <span className="font-medium">{post.user_profiles?.name}</span>
            </div>
            
            <div className="flex items-center text-sm text-slate-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.published_at).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function NewsroomClient({ initialPosts }: NewsroomClientProps) {
  const [allPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = allPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
        case 'name':
          return a.title.localeCompare(b.title, 'sv');
        case 'newest':
        default:
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      }
    });
  }, [allPosts, selectedCategory, searchTerm, sortOrder]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortOrder('newest');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (searchTerm ? 1 : 0) + 
    (sortOrder !== 'newest' ? 1 : 0);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allPosts.forEach(post => {
      if (post.category) {
        counts[post.category] = (counts[post.category] || 0) + 1;
      }
    });
    return counts;
  }, [allPosts]);

  const availableCategories = Object.keys(categoryCounts).sort();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div 
              className="inline-block px-4 py-2 rounded-full font-bold mb-6 text-white"
              style={{ backgroundColor: '#FF5421' }}
            >
              KUNSKAPSBANK
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Aktuella artiklar och guider
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Allt du behöver veta om styrelsearbete i bostadsrättsföreningar
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and filters */}
        <div className="mb-12 space-y-6">
          {/* Search bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Sök artiklar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5421] transition-colors text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          {/* Categories */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 text-sm font-bold rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-gray-200 hover:border-[#FF5421]'
                }`}
                style={selectedCategory === 'all' ? { backgroundColor: '#FF5421' } : {}}
              >
                Alla ({allPosts.length})
              </motion.button>
              {availableCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm font-bold rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-gray-200 hover:border-[#FF5421]'
                  }`}
                  style={selectedCategory === category ? { backgroundColor: '#FF5421' } : {}}
                >
                  {category} ({categoryCounts[category]})
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4 justify-center">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5421] text-sm font-medium"
              >
                <option value="newest">Nyaste först</option>
                <option value="oldest">Äldsta först</option>
                <option value="name">Namn A-Ö</option>
              </select>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-600 hover:text-[#FF5421] font-medium underline"
                >
                  Rensa filter ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="text-center text-slate-600 font-medium">
            Visar {filteredAndSortedPosts.length} av {allPosts.length} artiklar
          </div>
        </div>

        {/* Posts grid */}
        {filteredAndSortedPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-gray-50 rounded-2xl"
          >
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Inga artiklar hittades
            </h3>
            <p className="text-slate-600 mb-8">
              Prova att ändra dina sökkriterier eller filter
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#FF5421' }}
            >
              Visa alla artiklar
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
