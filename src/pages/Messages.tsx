import { useState } from 'react';
import { Search, Send, ArrowLeft, Phone, Video, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Messages() {
  const { chats, currentUser } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const mockMessages = [
    {
      id: '1',
      userId: selectedChatData?.userId || '',
      username: selectedChatData?.username || '',
      avatar: selectedChatData?.avatar || '',
      text: 'Привіт! Як справи?',
      timestamp: '10:30',
      isOwn: false,
    },
    {
      id: '2',
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: 'Привіт! Все супер, дякую! 😊',
      timestamp: '10:32',
      isOwn: true,
    },
    {
      id: '3',
      userId: selectedChatData?.userId || '',
      username: selectedChatData?.username || '',
      avatar: selectedChatData?.avatar || '',
      text: 'Твоє відео дуже круте! 🔥',
      timestamp: '10:33',
      isOwn: false,
    },
    {
      id: '4',
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: 'Дякую за підтримку! ❤️',
      timestamp: '10:35',
      isOwn: true,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pt-20">
      <div className="max-w-6xl mx-auto h-screen flex">
        {/* Chat List - Left Side */}
        <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-96 border-r border-gray-800 flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-2xl font-bold mb-4">Повідомлення</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук..."
                className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-900 transition-colors ${
                  selectedChat === chat.id ? 'bg-gray-900' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl">
                    {chat.avatar}
                  </div>
                  {chat.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold truncate">{chat.username}</h3>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-semibold' : 'text-gray-400'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window - Right Side */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden hover:opacity-80"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl">
                  {selectedChatData?.avatar}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedChatData?.username}</h2>
                  <p className="text-xs text-gray-400">Онлайн</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="hover:opacity-80">
                  <Phone className="w-6 h-6" />
                </button>
                <button className="hover:opacity-80">
                  <Video className="w-6 h-6" />
                </button>
                <button className="hover:opacity-80">
                  <Info className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className={`max-w-[70%] ${message.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Написати повідомлення..."
                  className="flex-1 bg-gray-900 text-white rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ваші повідомлення</h3>
              <p>Виберіть чат щоб почати розмову</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
