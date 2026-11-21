import { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Hash, Music, User, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Search() {
  const { videos, searchVideos } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(videos);
  const [activeFilter, setActiveFilter] = useState<'all' | 'users' | 'videos' | 'hashtags' | 'sounds'>('all');

  const trendingHashtags = [
    { tag: 'dance', views: '12.5M', icon: '💃' },
    { tag: 'comedy', views: '8.9M', icon: '😂' },
    { tag: 'food', views: '6.7M', icon: '🍕' },
    { tag: 'travel', views: '5.4M', icon: '✈️' },
    { tag: 'fitness', views: '4.2M', icon: '💪' },
    { tag: 'ukraine', views: '3.8M', icon: '🇺🇦' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchVideos(query);
      setSearchResults(results);
    } else {
      setSearchResults(videos);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(videos);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pt-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="relative mb-4">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Пошук відео, користувачів та хештегів..."
              className="w-full bg-gray-900 text-white rounded-full pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-pink-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { value: 'all', label: 'Все', icon: SearchIcon },
              { value: 'users', label: 'Користувачі', icon: User },
              { value: 'videos', label: 'Відео', icon: TrendingUp },
              { value: 'hashtags', label: 'Хештеги', icon: Hash },
              { value: 'sounds', label: 'Музика', icon: Music },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === value
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {!searchQuery ? (
          <div>
            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-pink-500" />
                <h2 className="text-xl font-bold">Тренди</h2>
              </div>
              <div className="space-y-1">
                {trendingHashtags.map((item, index) => (
                  <div
                    key={item.tag}
                    onClick={() => handleSearch(`#${item.tag}`)}
                    className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-400" />
                        <h3 className="font-semibold">#{item.tag}</h3>
                      </div>
                      <p className="text-sm text-gray-400">{item.views} переглядів</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-600">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div>
              <h2 className="text-xl font-bold mb-4">Рекомендовані акаунти</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['🎨', '🍕', '✈️', '💪'].map((avatar, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 rounded-lg p-4 flex flex-col items-center hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl mb-3">
                      {avatar}
                    </div>
                    <h3 className="font-semibold mb-1">user_{i + 1}</h3>
                    <p className="text-xs text-gray-400 mb-3">123K підписників</p>
                    <button className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600">
                      Підписатись
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Search Results */}
            {searchResults.length > 0 ? (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Результати пошуку "{searchQuery}" ({searchResults.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {searchResults.map((video) => (
                    <div
                      key={video.id}
                      className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt={video.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-sm">
                            {video.avatar}
                          </div>
                          <span className="text-xs font-semibold text-white truncate">
                            @{video.username}
                          </span>
                        </div>
                        <p className="text-xs text-white line-clamp-2">{video.caption}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-white">
                          <span className="flex items-center gap-1">
                            ❤️ {video.likes > 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold mb-2">Нічого не знайдено</h3>
                <p className="text-gray-400">
                  Спробуйте інший запит
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
