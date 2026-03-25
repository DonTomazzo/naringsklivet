// src/components/blog/VideoPost.tsx
import { CalendarDays, User, Play, Share2, Clock, ThumbsUp, Eye } from 'lucide-react';
import { Post } from '../../data/posts';

interface VideoPostProps {
  post: Post;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(.+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].split('&')[0];
    }
  }
  return null;
}

function YouTubePlayer({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8 bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&color=white&theme=dark`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/20 rounded-2xl"></div>
    </div>
  );
}

export default function VideoPost({ post }: VideoPostProps) {
  const videoId = post.video_url ? extractYouTubeId(post.video_url) : null;

  return (
    <>
      <div className="mb-8">
        {videoId ? (
          <YouTubePlayer videoId={videoId} title={post.title} />
        ) : (
          <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center mb-8">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Video ej tillgänglig</p>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-red-50 rounded-xl p-6 mb-8 border border-red-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full">
                <Play className="w-4 h-4 mr-1" />
                <span className="font-medium">Video</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>YouTube</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>Streama nu</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-[#0c5370] hover:text-[#083a4c] transition-colors px-3 py-1 rounded-lg hover:bg-white/50">
                <ThumbsUp className="w-4 h-4" />
                <span className="hidden sm:inline">Gilla</span>
              </button>
              <button className="flex items-center space-x-1 text-[#0c5370] hover:text-[#083a4c] transition-colors px-3 py-1 rounded-lg hover:bg-white/50">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Dela</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {post.subtitle && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        <div className="flex items-center space-x-6 text-gray-500 mb-6">
          <div className="flex items-center">
            {post.user_profiles?.avatar_url ? (
              <img 
                src={post.user_profiles.avatar_url} 
                alt={post.user_profiles.name}
                className="w-10 h-10 rounded-full mr-3 ring-2 ring-red-100"
              />
            ) : (
              <User className="w-5 h-5 mr-2" />
            )}
            <div>
              <span className="font-medium text-gray-700 block">
                {post.user_profiles?.name || 'Okänd skapare'}
              </span>
              <span className="text-sm text-gray-500">Video Creator</span>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            <time>
              {new Date(post.published_at).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>

        {post.excerpt && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-6 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-700 italic leading-relaxed">
              🎬 {post.excerpt}
            </p>
          </div>
        )}
      </header>

      <div className="prose prose-lg prose-red max-w-none mb-12">
        {post.content ? (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
              📝 Video-sammanfattning & Nyckelpoäng
            </h3>
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              className="text-gray-800 leading-relaxed"
            />
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
            <Play className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Titta på videon ovan för fullständigt innehåll</p>
          </div>
        )}
      </div>

      {post.user_profiles && (
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-red-50 rounded-xl p-8 mb-12 border border-red-100 shadow-sm">
          <div className="flex items-start space-x-6">
            {post.user_profiles.avatar_url && (
              <img 
                src={post.user_profiles.avatar_url} 
                alt={post.user_profiles.name}
                className="w-20 h-20 rounded-full shadow-lg ring-4 ring-white"
              />
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                🎥 Video av {post.user_profiles.name}
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                Skapare av pedagogiska videos inom webbutveckling, design och modern teknik. 
                Följ med på resan från koncept till färdig produkt!
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                  Prenumerera
                </button>
                <button className="border border-red-200 hover:border-red-300 text-red-600 px-6 py-2 rounded-lg transition-colors">
                  Fler videos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-white text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">Gillade du denna video?</h3>
        <p className="text-lg mb-6 opacity-90">
          Prenumerera för fler tutorials och tips inom webbutveckling!
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            👍 Gilla & Prenumerera
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
            🔔 Notifikationer
          </button>
        </div>
      </div>
    </>
  );
}