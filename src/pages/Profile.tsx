import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Settings, Share2, Grid, Heart, Bookmark, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { username } = useParams();
  const { currentUser, videos, followedUsers, toggleFollow } = useApp();
  const [activeTab, setActiveTab] = useState<'videos' | 'likes' | 'saved'>('videos');

  const isOwnProfile = !username || username === currentUser.username;
  const user = isOwnProfile ? currentUser : {
    id: 'other',
    username: username || 'user',
    displayName: username || 'User',
    avatar: '🎭',
    followers: 5432,
    following: 234,
    likes: 123400,
    bio: 'Контент креатор | Україна 🇺🇦',
    verified: false,
  };

  const userVideos = videos.filter(v => isOwnProfile || v.username === username);
  const isFollowing = followedUsers.includes(user.id);

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{isOwnProfile ? 'Профіль' : `@${username}`}</h1>
          <div className="flex gap-4">
            <button className="hover:opacity-80">
              <Share2 className="w-6 h-6" />
            </button>
            {isOwnProfile && (
              <button className="hover:opacity-80">
                <Settings className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-5xl mb-4 border-4 border-white">
            {user.avatar}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">@{user.username}</h2>
            {user.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs">
                ✓
              </div>
            )}
          </div>
          <p className="text-gray-400 text-center mb-4">{user.bio}</p>

          {/* Stats */}
          <div className="flex gap-8 mb-6">
            <div className="text-center">
              <div className="font-bold text-lg">{user.following}</div>
              <div className="text-gray-400 text-sm">Підписки</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{user.followers}</div>
              <div className="text-gray-400 text-sm">Підписники</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">
                {user.likes > 1000 ? `${(user.likes / 1000).toFixed(1)}K` : user.likes}
              </div>
              <div className="text-gray-400 text-sm">Вподобання</div>
            </div>
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex gap-3 w-full max-w-md">
              <button
                onClick={() => toggleFollow(user.id)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  isFollowing
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {isFollowing ? 'Відписатись' : 'Підписатись'}
              </button>
              <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700">
                Повідомлення
              </button>
            </div>
          )}

          {isOwnProfile && (
            <div className="flex gap-3 w-full max-w-md">
              <button className="flex-1 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700">
                Редагувати профіль
              </button>
              <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700">
                Поділитись
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="font-semibold">Відео</span>
          </button>
          {isOwnProfile && (
            <>
              <button
                onClick={() => setActiveTab('likes')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'likes'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Вподобання</span>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'saved'
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                <span className="font-semibold">Збережені</span>
              </button>
            </>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-1">
          {activeTab === 'videos' && userVideos.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Поки що немає відео</p>
            </div>
          )}
          
          {activeTab === 'videos' &&
            userVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm font-semibold">
                  <Heart className="w-4 h-4 fill-white" />
                  {video.likes > 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
                </div>
              </div>
            ))}

          {activeTab === 'likes' && isOwnProfile && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <Lock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="font-semibold mb-2">Ваші вподобання приватні</p>
              <p className="text-sm">Тільки ви можете бачити відео, які вам подобаються</p>
            </div>
          )}

          {activeTab === 'saved' && isOwnProfile && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              <Bookmark className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Збережених відео поки немає</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
