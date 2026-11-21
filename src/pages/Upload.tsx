import { useState, useRef } from 'react';
import { Upload as UploadIcon, Image, Video, Music, X, Sparkles, Hash } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const { addVideo, currentUser } = useApp();
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState<'video' | 'photo' | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [music, setMusic] = useState('Original Sound');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim().replace('#', '')]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handlePost = () => {
    if (preview && caption) {
      addVideo({
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        videoUrl: preview,
        thumbnailUrl: preview,
        caption,
        music,
        hashtags,
      });
      
      // Reset form
      setPreview('');
      setCaption('');
      setMusic('Original Sound');
      setHashtags([]);
      setUploadType(null);
      
      // Navigate to home
      navigate('/');
    }
  };

  const resetUpload = () => {
    setPreview('');
    setCaption('');
    setHashtags([]);
    setUploadType(null);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Завантажити контент</h1>
          <p className="text-gray-400">Поділіться своїм креативом зі світом</p>
        </div>

        {!uploadType ? (
          /* Upload Type Selection */
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <button
              onClick={() => setUploadType('video')}
              className="bg-gradient-to-br from-pink-500 to-purple-500 p-8 rounded-2xl hover:scale-105 transition-transform"
            >
              <Video className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Відео</h3>
              <p className="text-white/80">Завантажте відео до 60 секунд</p>
            </button>

            <button
              onClick={() => setUploadType('photo')}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl hover:scale-105 transition-transform"
            >
              <Image className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Фото</h3>
              <p className="text-white/80">Поділіться моментами у фото</p>
            </button>
          </div>
        ) : !preview ? (
          /* File Upload */
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setUploadType(null)}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
            >
              ← Назад
            </button>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-pink-500 transition-colors cursor-pointer"
            >
              <UploadIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">
                Виберіть {uploadType === 'video' ? 'відео' : 'фото'}
              </h3>
              <p className="text-gray-400 mb-4">
                Або перетягніть файл сюди
              </p>
              <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors">
                Вибрати файл
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={uploadType === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <div className="mt-6 bg-gray-900 rounded-lg p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Поради для кращого контенту
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Використовуйте високу якість ({uploadType === 'video' ? '1080p або вище' : 'мінімум 1080x1080'})</li>
                <li>✓ Переконайтесь що освітлення добре</li>
                <li>✓ {uploadType === 'video' ? 'Перші 3 секунди найважливіші' : 'Використовуйте яскраві кольори'}</li>
                <li>✓ Додайте цікавий опис та хештеги</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Edit & Post */
          <div className="max-w-5xl mx-auto">
            <button
              onClick={resetUpload}
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
            >
              ← Назад
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Попередній перегляд</h3>
                <div className="relative aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden">
                  {uploadType === 'video' ? (
                    <video
                      src={preview}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Form */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Деталі</h3>
                
                <div className="space-y-4">
                  {/* Caption */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Опис
                    </label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Розкажіть про своє відео..."
                      rows={4}
                      className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      {caption.length}/150
                    </p>
                  </div>

                  {/* Music */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Music className="w-4 h-4 inline mr-1" />
                      Музика
                    </label>
                    <input
                      type="text"
                      value={music}
                      onChange={(e) => setMusic(e.target.value)}
                      placeholder="Назва треку або Original Sound"
                      className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  {/* Hashtags */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Hash className="w-4 h-4 inline mr-1" />
                      Хештеги
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={hashtagInput}
                        onChange={(e) => setHashtagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                        placeholder="Додати хештег"
                        className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <button
                        onClick={handleAddHashtag}
                        className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600"
                      >
                        Додати
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          #{tag}
                          <button
                            onClick={() => handleRemoveHashtag(tag)}
                            className="hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Privacy */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Приватність
                    </label>
                    <select className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500">
                      <option>Публічний</option>
                      <option>Тільки друзі</option>
                      <option>Приватний</option>
                    </select>
                  </div>

                  {/* Post Button */}
                  <button
                    onClick={handlePost}
                    disabled={!caption.trim()}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Опублікувати
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
