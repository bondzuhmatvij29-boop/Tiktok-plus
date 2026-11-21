import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  bio: string;
  verified: boolean;
}

export interface Video {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  hashtags: string[];
  isLiked: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Chat {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface AppContextType {
  currentUser: User;
  videos: Video[];
  followedUsers: string[];
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => void;
  addVideo: (video: Omit<Video, 'id' | 'likes' | 'comments' | 'shares' | 'isLiked'>) => void;
  searchVideos: (query: string) => Video[];
  chats: Chat[];
  addMessage: (chatId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Моковані дані
const mockCurrentUser: User = {
  id: 'current',
  username: 'my_account',
  displayName: 'Мій Акаунт',
  avatar: '👤',
  followers: 1234,
  following: 567,
  likes: 89012,
  bio: 'Створюй, дивись, натхнюйся 🎥✨',
  verified: true,
};

const mockVideos: Video[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'cool_creator',
    avatar: '🎨',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-with-led-lights-1240-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    caption: 'Новий танець! 💃 #dance #trending',
    likes: 45600,
    comments: 234,
    shares: 123,
    music: 'Original Sound - cool_creator',
    hashtags: ['dance', 'trending'],
    isLiked: false,
  },
  {
    id: '2',
    userId: 'user2',
    username: 'food_lover',
    avatar: '🍕',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-of-the-sea-on-the-sand-of-a-beach-4164-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400',
    caption: 'Рецепт найкращої піци 🍕 #food #cooking',
    likes: 23400,
    comments: 156,
    shares: 89,
    music: 'Cooking Beats',
    hashtags: ['food', 'cooking'],
    isLiked: false,
  },
  {
    id: '3',
    userId: 'user3',
    username: 'traveler_pro',
    avatar: '✈️',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
    caption: 'Подорож у Карпати 🏔️ #travel #ukraine',
    likes: 78900,
    comments: 445,
    shares: 234,
    music: 'Adventure Time',
    hashtags: ['travel', 'ukraine'],
    isLiked: true,
  },
  {
    id: '4',
    userId: 'user4',
    username: 'fitness_girl',
    avatar: '💪',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-walking-in-a-forest-589-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    caption: 'Ранкове тренування 🔥 #fitness #workout',
    likes: 34500,
    comments: 267,
    shares: 145,
    music: 'Workout Mix 2024',
    hashtags: ['fitness', 'workout'],
    isLiked: false,
  },
  {
    id: '5',
    userId: 'user5',
    username: 'comedy_king',
    avatar: '😂',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1241-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400',
    caption: 'Коли забув виключити камеру 😅 #funny #comedy',
    likes: 123400,
    comments: 1234,
    shares: 567,
    music: 'Funny Sound Effect',
    hashtags: ['funny', 'comedy'],
    isLiked: false,
  },
];

const mockChats: Chat[] = [
  {
    id: 'chat1',
    userId: 'user1',
    username: 'cool_creator',
    avatar: '🎨',
    lastMessage: 'Дякую за підписку! ❤️',
    timestamp: '2 хв',
    unread: 2,
  },
  {
    id: 'chat2',
    userId: 'user3',
    username: 'traveler_pro',
    avatar: '✈️',
    lastMessage: 'Супер відео!',
    timestamp: '1 год',
    unread: 0,
  },
  {
    id: 'chat3',
    userId: 'user4',
    username: 'fitness_girl',
    avatar: '💪',
    lastMessage: 'Хочеш потренуватися разом?',
    timestamp: '3 год',
    unread: 1,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState<User>(mockCurrentUser);
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [followedUsers, setFollowedUsers] = useState<string[]>(['user3']);
  const [chats] = useState<Chat[]>(mockChats);

  const toggleLike = (videoId: string) => {
    setVideos(prev =>
      prev.map(video =>
        video.id === videoId
          ? {
              ...video,
              isLiked: !video.isLiked,
              likes: video.isLiked ? video.likes - 1 : video.likes + 1,
            }
          : video
      )
    );
  };

  const toggleFollow = (userId: string) => {
    setFollowedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const addVideo = (video: Omit<Video, 'id' | 'likes' | 'comments' | 'shares' | 'isLiked'>) => {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const searchVideos = (query: string): Video[] => {
    if (!query) return videos;
    const lowerQuery = query.toLowerCase();
    return videos.filter(
      video =>
        video.caption.toLowerCase().includes(lowerQuery) ||
        video.username.toLowerCase().includes(lowerQuery) ||
        video.hashtags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const addMessage = (chatId: string, text: string) => {
    console.log('Message sent:', chatId, text);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        videos,
        followedUsers,
        toggleLike,
        toggleFollow,
        addVideo,
        searchVideos,
        chats,
        addMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
