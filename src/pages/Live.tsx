import { Radio, Eye, Heart, MessageCircle, Gift, Users } from 'lucide-react';

export default function Live() {
  const liveStreams = [
    {
      id: '1',
      username: 'dj_music',
      avatar: '🎧',
      title: 'Танцювальна музика 🎵 DJ SET',
      viewers: 12345,
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600',
      isLive: true,
    },
    {
      id: '2',
      username: 'gamer_pro',
      avatar: '🎮',
      title: 'Проходжу нову гру! Приєднуйтесь',
      viewers: 8967,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
      isLive: true,
    },
    {
      id: '3',
      username: 'chef_master',
      avatar: '👨‍🍳',
      title: 'Готуємо українські вареники 🥟',
      viewers: 5432,
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600',
      isLive: true,
    },
    {
      id: '4',
      username: 'artist_life',
      avatar: '🎨',
      title: 'Малюю портрет наживо',
      viewers: 3210,
      thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
      isLive: true,
    },
    {
      id: '5',
      username: 'yoga_girl',
      avatar: '🧘‍♀️',
      title: 'Ранкова йога - приєднуйтесь! ☀️',
      viewers: 2876,
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
      isLive: true,
    },
    {
      id: '6',
      username: 'comedy_show',
      avatar: '😂',
      title: 'Stand Up комедія LIVE',
      viewers: 9123,
      thumbnail: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600',
      isLive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Radio className="w-8 h-8 text-pink-500" />
              <h1 className="text-3xl font-bold">LIVE трансляції</h1>
            </div>
            <p className="text-gray-400">Дивіться прямі ефіри від креаторів</p>
          </div>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2">
            <Radio className="w-5 h-5" />
            Почати ефір
          </button>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6 flex items-center justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-pink-500 mb-1">
              <Radio className="w-5 h-5" />
              <span className="text-2xl font-bold">{liveStreams.length}</span>
            </div>
            <p className="text-sm text-gray-400">Активних ефірів</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-purple-500 mb-1">
              <Eye className="w-5 h-5" />
              <span className="text-2xl font-bold">
                {(liveStreams.reduce((acc, s) => acc + s.viewers, 0) / 1000).toFixed(1)}K
              </span>
            </div>
            <p className="text-sm text-gray-400">Загалом глядачів</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-500 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-2xl font-bold">∞</span>
            </div>
            <p className="text-sm text-gray-400">Доступно для всіх</p>
          </div>
        </div>

        {/* Live Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStreams.map((stream) => (
            <div
              key={stream.id}
              className="relative group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/16] md:aspect-video rounded-lg overflow-hidden bg-gray-900">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                {/* LIVE Badge */}
                {stream.isLive && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 font-semibold text-sm animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    LIVE
                  </div>
                )}

                {/* Viewers Count */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Eye className="w-4 h-4" />
                  {stream.viewers > 1000 
                    ? `${(stream.viewers / 1000).toFixed(1)}K`
                    : stream.viewers}
                </div>

                {/* Stream Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl border-2 border-white">
                      {stream.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        @{stream.username}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white font-medium line-clamp-2">
                    {stream.title}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Heart className="w-6 h-6 text-white" />
                    </button>
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </button>
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Gift className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no streams) */}
        {liveStreams.length === 0 && (
          <div className="text-center py-16">
            <Radio className="w-20 h-20 mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold mb-2">Наразі немає активних ефірів</h3>
            <p className="text-gray-400 mb-6">
              Будьте першим хто почне трансляцію!
            </p>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
              Почати LIVE
            </button>
          </div>
        )}

        {/* How to Go Live Section */}
        <div className="mt-12 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20">
          <h2 className="text-2xl font-bold mb-4">Як почати трансляцію?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                1️⃣
              </div>
              <h3 className="font-semibold mb-2">Натисніть кнопку</h3>
              <p className="text-sm text-gray-400">
                Натисніть "Почати ефір" щоб розпочати
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                2️⃣
              </div>
              <h3 className="font-semibold mb-2">Налаштуйте камеру</h3>
              <p className="text-sm text-gray-400">
                Виберіть камеру та мікрофон
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                3️⃣
              </div>
              <h3 className="font-semibold mb-2">Почніть трансляцію</h3>
              <p className="text-sm text-gray-400">
                Спілкуйтесь з глядачами у прямому ефірі
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
