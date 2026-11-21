import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, MessageCircle, Radio, User } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Головна' },
    { path: '/search', icon: Search, label: 'Пошук' },
    { path: '/upload', icon: PlusSquare, label: 'Додати' },
    { path: '/live', icon: Radio, label: 'Ефір' },
    { path: '/messages', icon: MessageCircle, label: 'Повідомлення' },
    { path: '/profile', icon: User, label: 'Профіль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-8">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 transition-colors ${
                isActive(path)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  path === '/upload' && isActive(path) ? 'fill-white' : ''
                }`}
                strokeWidth={isActive(path) ? 2.5 : 2}
              />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
