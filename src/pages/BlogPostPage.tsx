// src/pages/BlogPostPage.tsx
import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPostBySlug, getRelatedPosts } from '../data/posts';
import ArticlePost from '../components/blog/ArticlePost';
import VideoPost from '../components/blog/VideoPost';
import RelatedPosts from '../components/blog/RelatedPosts';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Scrolla till toppen när komponenten laddas
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]); // Körs när slug ändras (dvs när man navigerar till en ny artikel)
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.id, 3);
  const isVideoPost = post.type === 'video' && post.video_url;

  return (
    <div>
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Bakåtlänk */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-[#FF5421] hover:text-[#E04619] mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tillbaka till artiklar
        </Link>

        {/* Rendera rätt typ av post */}
        {isVideoPost ? (
          <VideoPost post={post} />
        ) : (
          <ArticlePost post={post} />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center py-8 border-t border-gray-200">
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all font-bold shadow-lg"
            style={{ backgroundColor: '#FF5421' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Alla inlägg
          </Link>
          
          <div className="text-sm text-slate-600 font-medium">
            Dela detta {isVideoPost ? 'video' : 'inlägg'}
          </div>
        </div>
      </article>

      {/* Relaterade inlägg */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} currentType={post.type || 'article'} />
      )}
    </div>
  );
}
