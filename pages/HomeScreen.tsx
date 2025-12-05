import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const { user } = useUser();

  // Get first name for the greeting
  const firstName = user.name.split(' ')[0] || 'User';

  // Calculate days to show for streak
  // Show a sliding window of 5 days based on current streak
  const itemsToShow = 5;
  let startDay = 1;
  // Adjust window if streak is high
  if (user.streak + 1 > itemsToShow) {
    startDay = user.streak + 1 - Math.floor(itemsToShow / 2);
  }
  const days = Array.from({ length: itemsToShow }, (_, i) => startDay + i);

  return (
    <div className="flex flex-col gap-4 p-4 font-display">
      <header className="flex items-center justify-between sticky top-0 z-10 pt-2 pb-4 bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img 
            alt="User Avatar" 
            className="h-10 w-10 rounded-full border-2 border-primary object-cover" 
            src={user.avatar} 
          />
          <div>
            <h1 className="text-lg font-bold leading-tight">Hi, {firstName}!</h1>
            <p className="text-sm text-gray-400">Let's get those coins</p>
          </div>
        </div>
        <button className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface-dark text-white hover:bg-surface-dark/80 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-surface-dark"></span>
        </button>
      </header>

      <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-dark p-6 pb-6 text-center shadow-lg border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-9xl">toll</span>
        </div>
        <p className="text-sm font-medium text-gray-400 relative z-10">Your AdCoin Balance</p>
        <div className="flex items-center gap-3 py-2 relative z-10">
          <img 
            alt="AdCoin Icon" 
            className="h-10 w-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDy8GD9cKKHACG0j0we6E0DS1Oa7uZTbdWVGlYvnoXO6TRIiELW2ys7FlxexwjF4kFgT4LAEKdKYO8CykVw4tdVNOspe6GB0aCaUDg2aPlErmcnaNk1TQCrfZq7WVDBH99cxADAtSO3mqhAzO8Gu22rfqh8JssfBQnqvgowJl1i2OcGBpvq9F-HvWOaGGAKCsT2B3aMoEsamvkSrSlZ4jLTFjOj9CEbEYxGNrSnUE3xavroOkIr2Z1_brrmB-HlTMSpzwjj6IfagkM" 
          />
          <p className="text-5xl font-bold leading-tight tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            {user.balance.toLocaleString()}
          </p>
        </div>
        <Link to="/tasks" className="mt-4 w-full relative z-10">
          <button className="w-full rounded-xl bg-primary py-3.5 text-base font-bold text-background-dark shadow-[0_0_20px_rgba(0,229,255,0.4)] animate-pulse-bright hover:scale-[1.02] active:scale-[0.98] transition-transform">
            Watch Ads
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-surface-dark p-5 shadow-lg border border-white/5">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold">Level {user.level}: {user.levelName}</p>
          <p className="text-sm font-semibold text-primary">{user.xp} / {user.maxXp} XP</p>
        </div>
        <div className="relative h-3 w-full rounded-full bg-background-dark">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out" 
            style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl bg-surface-dark p-5 shadow-lg border border-white/5 transition-all duration-500 hover:border-primary/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Daily Streak</h3>
          <div className="flex items-center gap-1.5 rounded-full bg-background-dark border border-white/5 px-3 py-1">
            <span className="material-symbols-outlined !text-xl text-amber-500 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <span className="text-sm font-bold text-amber-500">{user.streak} Days</span>
          </div>
        </div>
        
        {/* Streak Message */}
        <div className="rounded-xl bg-background-dark/50 p-4 border border-white/5">
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
                {user.streak > 0 
                    ? `Keep the streak going! You've been logging in for ${user.streak} days in a row. Don't miss a day to keep earning rewards!`
                    : "Your streak has been reset. Start a new streak today to earn maximum rewards!"
                }
            </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          {days.map((day) => {
            const isCompleted = day <= user.streak;
            const isCurrent = day === user.streak + 1;
            const isLocked = day > user.streak + 1;

            return (
              <div key={day} className={`flex flex-col items-center gap-2 text-center transition-all duration-500 ${isLocked ? 'opacity-40' : 'opacity-100'}`}>
                <div className={`
                    relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300
                    ${isCompleted ? 'bg-surface-dark border-primary/30 text-primary' : ''}
                    ${isCurrent ? 'bg-primary/10 border-dashed border-primary text-primary shadow-[0_0_15px_rgba(0,229,255,0.3)] scale-110' : ''}
                    ${isLocked ? 'bg-background-dark border-white/5 text-gray-500' : ''}
                `}>
                    {isCompleted && <span className="material-symbols-outlined !text-xl font-bold animate-fade-in">check</span>}
                    {isCurrent && <span className="material-symbols-outlined !text-xl animate-bounce">redeem</span>}
                    {isLocked && <span className="material-symbols-outlined !text-lg">lock</span>}
                    
                    {/* Ring animation for current */}
                    {isCurrent && (
                        <div className="absolute inset-0 -m-1 rounded-full border border-primary/30 animate-ping"></div>
                    )}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : 'text-gray-500'}`}>
                    Day {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Link to="/airdrop" className="flex items-center justify-between rounded-2xl bg-surface-dark p-4 shadow-lg border border-white/5 hover:bg-surface-dark/80 transition-colors group">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-3xl">toll</span>
          </div>
          <div>
            <h3 className="font-bold text-white">Crypto Airdrop</h3>
            <p className="text-sm text-gray-400">Join for exclusive rewards!</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">arrow_forward_ios</span>
      </Link>

      <Link to="/referral" className="flex items-center justify-between rounded-2xl bg-surface-dark p-4 shadow-lg border border-white/5 hover:bg-surface-dark/80 transition-colors group">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-3xl">group_add</span>
          </div>
          <div>
            <h3 className="font-bold text-white">Referral Program</h3>
            <p className="text-sm text-gray-400">Invite friends, earn more!</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">arrow_forward_ios</span>
      </Link>
    </div>
  );
};

export default HomeScreen;