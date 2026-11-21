import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music2, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { videos, toggleLike, followedUsers, toggleFollow } = useApp();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    // Auto-play current video
    const currentVideoElement = videoRefs.current[currentVideoIndex];
    if (currentVideoElement) {
      currentVideoElement.play().catch(() => {
        // Autoplay might be blocked
      });
    }

    // Pause other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause();
      }
    });
  }, [currentVideoIndex]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const videoHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / videoHeight);
    
    if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex);
    }
  };

  const isFollowing = followedUsers.includes(currentVideo?.userId || '');

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Feed */}
      <div
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="relative h-screen snap-start flex items-center justify-center bg-black"
          >
            {/* Video */}
            <video
              ref={el => { videoRefs.current[index] = el; }}
              src={video.videoUrl}
              className="h-full w-full object-cover md:object-contain"
              loop
              playsInline
              onClick={(e) => {
                if (e.currentTarget.paused) {
                  e.currentTarget.play();
                } else {
                  e.currentTarget.pause();
                }
              }}
            />

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent md:mt-16">
              <div className="text-white font-semibold">Для вас</div>
              <div className="text-gray-300">Підписки</div>
              <MoreHorizontal className="text-white w-6 h-6" />
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-24 flex flex-col gap-6">
              {/* Avatar & Follow */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl border-2 border-white">
                  {video.avatar}
                </div>
                {!isFollowing && (
                  <button
                    onClick={() => toggleFollow(video.userId)}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  >
                    +
                  </button>
                )}
              </div>

              {/* Like */}
              <button
                onClick={() => toggleLike(video.id)}
                className="flex flex-col items-center gap-1"
              >
                <Heart
                  className={`w-9 h-9 ${
                    video.isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                  }`}
                  strokeWidth={1.5}
                />
                <span className="text-white text-xs font-semibold">
                  {video.likes > 1000
                    ? `${(video.likes / 1000).toFixed(1)}K`
                    : video.likes}
                </span>
              </button>

              {/* Comments */}
              <button
                onClick={() => setShowComments(true)}
                className="flex flex-col items-center gap-1"
              >
                <MessageCircle className="w-9 h-9 text-white" strokeWidth={1.5} />
                <span className="text-white text-xs font-semibold">
                  {video.comments}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1">
                <Share2 className="w-8 h-8 text-white" strokeWidth={1.5} />
                <span className="text-white text-xs font-semibold">
                  {video.shares}
                </span>
              </button>

              {/* Music Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
                <Music2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-24 left-4 right-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">@{video.username}</span>
                {!isFollowing && (
                  <button
                    onClick={() => toggleFollow(video.userId)}
                    className="text-sm font-semibold text-red-400"
                  >
                    Підписатись
                  </button>
                )}
              </div>
              <p className="text-sm mb-2">{video.caption}</p>
              <div className="flex items-center gap-2 text-sm">
                <Music2 className="w-4 h-4" />
                <span className="truncate">{video.music}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setShowComments(false)}
        >
          <div
            className="bg-gray-900 rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[80vh] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {currentVideo?.comments} коментарів
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[60vh]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">
                    😊
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">user_{i}</span>
                      <span className="text-xs text-gray-400">{i}г</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Супер відео! 🔥
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Додати коментар..."
                className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600">
                Надіслати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
