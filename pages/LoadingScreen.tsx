import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    const redirect = setTimeout(() => {
      navigate('/welcome');
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full grow flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center gap-8 text-center animate-fade-in">
          <div className="flex items-center justify-center animate-bounce">
            <span className="material-symbols-outlined text-8xl text-primary" style={{ fontSize: '96px' }}>
                toll
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">AdCoins</h1>
          <div className="w-full max-w-[200px]">
            <div className="relative w-full h-2 overflow-hidden rounded-full bg-primary/20">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;