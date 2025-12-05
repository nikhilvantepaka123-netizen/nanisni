import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/home', icon: 'home' },
    { name: 'Task', path: '/tasks', icon: 'task_alt' },
    { name: 'Leaderboard', path: '/leaderboard', icon: 'leaderboard' },
    { name: 'Profile', path: '/profile', icon: 'account_circle' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-dark bg-background-dark/90 px-2 pt-2 pb-4 backdrop-blur-lg max-w-md mx-auto">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 p-2 text-center transition-colors ${
              isActive(item.path) ? 'text-primary' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default BottomNav;