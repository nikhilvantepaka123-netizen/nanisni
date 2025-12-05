import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CoinShower: React.FC = () => {
  // Generate random coins configuration
  const [coins] = useState(() => 
    Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      duration: 1.5 + Math.random() * 2,
      delay: Math.random() * 0.5,
      size: 20 + Math.random() * 20,
      rotation: Math.random() * 360,
      color: Math.random() > 0.7 ? '#FFD700' : '#00e5ff' // Mix of Gold and Primary Cyan
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {coins.map((coin, i) => (
        <div
            key={i}
            className="absolute top-[-50px] flex items-center justify-center"
            style={{
                left: `${coin.left}%`,
                color: coin.color,
                animation: `fall ${coin.duration}s linear forwards`,
                animationDelay: `${coin.delay}s`,
            }}
        >
             <span 
                className="material-symbols-outlined" 
                style={{ 
                    fontSize: `${coin.size}px`, 
                    fontVariationSettings: "'FILL' 1",
                    transform: `rotate(${coin.rotation}deg)` 
                }}
            >
                toll
            </span>
        </div>
      ))}
    </div>
  );
};

const TasksScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addCoins, completeTask, user } = useUser();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleStartTask = () => {
    setIsPlaying(true);
    // Mock video playing for 3 seconds then completion
    setTimeout(() => {
        setIsPlaying(false);
        setShowConfirmation(true);
        completeTask('video_ad_1', 5);
    }, 3000);
  };

  const availableTasks = [
      { icon: 'play_circle', title: 'Watch 30s Ad', sub: 'Premium video content', reward: 10, id: 'video_ad_2' },
      { icon: 'play_circle', title: 'Watch Short Ad', sub: 'Quick 15s video', reward: 5, id: 'video_ad_3' },
      { icon: 'quiz', title: 'Complete Survey', sub: 'Share your opinion', reward: 15, id: 'survey_1' },
      { icon: 'download', title: 'Download App', sub: 'Install and open the app', reward: 25, id: 'app_1' }
  ];

  return (
    <div className="flex flex-col h-full p-4 font-display">
      <header className="flex items-center justify-between pb-4 sticky top-0 bg-background-dark z-10">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-start text-white/80 hover:text-white">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-10">AdCoins Task</h1>
      </header>

      <div className="flex flex-1 flex-col gap-6">
        <div className="rounded-2xl bg-surface-dark border border-white/5 p-4 overflow-hidden shadow-lg relative">
          {!showConfirmation ? (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black group cursor-pointer" onClick={handleStartTask}>
                <img 
                    alt="Video Thumbnail" 
                    className={`h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-80'}`} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg1x6Lw7aBYH9PtNFDyw4ugZOJQTjZbY4LDUmwr_Vb35DoYH8V4OiA4jHhtL5cIOkeWo98FQ6k0aEdcZBKmcB6bXK3iTprqxcJN0-xnMarPFqk8IPIPnuDzJOpQYFXGzDnx-tZq5i_zek3vizI_z9j_tuEjVZzB7yoJy7U7BtSedpEHMss2sizLZbvKm1Pb--FSuj1-yzAl6keG4GYU1swjCWeWPGwYXXNOF1DTA7PhsUFi0P_kAYxD3Rx5VPP9LjCold0KV9KXFYU"
                />
                
                {isPlaying ? (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                     </div>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-white opacity-90 drop-shadow-lg scale-100 group-hover:scale-110 transition-transform">play_circle</span>
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium">
                            <span className="material-symbols-outlined !text-base text-primary">play_circle</span>
                            <span>0:15</span>
                        </div>
                    </>
                )}
              </div>
              
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-bold text-white">Watch Video Ad</p>
                  <p className="text-sm text-gray-400">Watch the full video to earn your reward.</p>
                </div>
                <button 
                    onClick={handleStartTask}
                    disabled={isPlaying}
                    className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-background-dark shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPlaying ? 'Watching...' : 'Start Task (+5 AdCoins)'}
                </button>
              </div>
            </div>
          ) : (
            <>
                <CoinShower />
                <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-scale-in">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping"></div>
                    <span className="material-symbols-outlined text-7xl text-primary drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">check_circle</span>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Task Completed!</h2>
                    <h2 className="text-2xl font-bold text-primary">+5 AdCoins</h2>
                    <p className="text-gray-400 mt-2 text-sm">Your balance has been updated to {(user.balance).toLocaleString()}.</p>
                </div>
                <button 
                    onClick={() => setShowConfirmation(false)}
                    className="mt-2 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-white/10 py-3 font-bold text-white hover:bg-white/20 transition-colors border border-white/10"
                >
                    <span>Next Task</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold px-1">Available Tasks</h2>
          <div className="flex flex-col gap-3">
            {availableTasks.map(task => (
                <button 
                    key={task.id}
                    disabled={user.completedTasks.includes(task.id)}
                    onClick={() => completeTask(task.id, task.reward)}
                    className={`flex items-center justify-between rounded-xl bg-surface-dark border border-white/5 p-4 transition-all ${user.completedTasks.includes(task.id) ? 'opacity-50' : 'hover:bg-white/5 active:scale-[0.99]'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined" style={task.icon === 'play_circle' ? {fontVariationSettings: "'FILL' 1"} : {}}>{user.completedTasks.includes(task.id) ? 'check' : task.icon}</span>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-white">{task.title}</p>
                            <p className="text-xs text-gray-400">{task.sub}</p>
                        </div>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-sm font-bold ${user.completedTasks.includes(task.id) ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}`}>
                        {user.completedTasks.includes(task.id) ? 'Done' : `+${task.reward}`}
                    </div>
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksScreen;