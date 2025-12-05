import React, { useState, useRef } from 'react';
import { useUser } from '../context/UserContext';

const ProfileScreen: React.FC = () => {
    const { user, updateAvatar } = useUser();
    const [activeTab, setActiveTab] = useState<'history' | 'achievements'>('achievements');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    updateAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // Mock achievement data
    const allAchievements = [
        { id: 'first_ad', title: 'First Ad Watched', desc: 'Watch your first ad', icon: 'play_circle' },
        { id: 'ad_novice', title: 'Ad Novice', desc: 'Watch 10 ads', icon: 'trending_up' },
        { id: 'streak_3', title: 'Daily Streak', desc: 'Watch ads 3 days in a row', icon: 'local_fire_department' },
        { id: 'streak_5', title: 'Committed Viewer', desc: 'Watch ads 5 days in a row', icon: 'workspace_premium' },
        { id: 'ad_100', title: 'Ad Master', desc: 'Watch 100 ads', icon: 'lock' },
        { id: 'earn_5000', title: 'Coin Collector', desc: 'Earn 5,000 AdCoins', icon: 'lock' },
    ];

    // Filter achievements based on completedTasks
    const completedAchievements = allAchievements.filter(ach => user.completedTasks.includes(ach.id));
    const inProgressAchievements = allAchievements.filter(ach => !user.completedTasks.includes(ach.id));

    return (
        <div className="flex flex-col h-full font-display">
            <header className="flex items-center justify-between p-4 sticky top-0 z-20 bg-background-dark/80 backdrop-blur-sm">
                <div className="size-10"></div>
                <h1 className="text-lg font-bold leading-tight flex-1 text-center">Profile</h1>
                <button className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            <div className="flex flex-col items-center gap-4 p-4 pt-2">
                <div className="relative group">
                    <div 
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 border-4 border-primary shadow-[0_0_20px_rgba(0,229,255,0.2)]" 
                        style={{backgroundImage: `url("${user.avatar}")`}}
                    ></div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />
                    <button 
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background-dark bg-primary text-background-dark hover:scale-110 transition-transform cursor-pointer"
                    >
                        <span className="material-symbols-outlined" style={{fontSize: '20px'}}>edit</span>
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[22px] font-bold leading-tight">{user.name}</p>
                    <p className="text-gray-400 text-base font-normal">{user.handle}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-4">
                <div className="flex w-full flex-col gap-3 rounded-2xl bg-surface-dark border border-white/5 p-6 shadow-lg">
                    <p className="text-base font-medium text-gray-400">AdCoin Balance</p>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                        <p className="text-4xl font-bold leading-tight tracking-tight text-white">{user.balance.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 px-4 pb-4">
                <div className="flex gap-6 justify-between items-center">
                    <p className="text-base font-bold">Level {user.level} <span className="text-gray-400 font-normal">- {user.levelName}</span></p>
                    <p className="text-sm font-normal text-gray-400">{user.xp} / {user.maxXp} XP</p>
                </div>
                <div className="h-2.5 rounded-full bg-surface-dark">
                    <div className="h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.5)] transition-all duration-1000" style={{width: `${(user.xp / user.maxXp) * 100}%`}}></div>
                </div>
            </div>

            <div className="sticky top-[70px] z-10 bg-background-dark/95 backdrop-blur-md px-4 pt-2 pb-4">
                <div className="flex w-full rounded-full bg-surface-dark p-1">
                    <button 
                        className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-primary text-background-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('history')}
                    >
                        History
                    </button>
                    <button 
                        className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${activeTab === 'achievements' ? 'bg-primary text-background-dark shadow-md' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('achievements')}
                    >
                        Achievements
                    </button>
                </div>
            </div>

            <div className="flex-1 px-4 pb-4 min-h-[300px]">
                {activeTab === 'history' ? (
                    <div className="flex flex-col gap-3 animate-fade-in">
                        {user.completedTasks.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <span className="material-symbols-outlined text-4xl mb-2">history</span>
                                <p>No history yet. Start earning!</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between rounded-xl bg-surface-dark p-4 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>
                                            play_circle
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-white">Task Completed</p>
                                        <p className="text-sm text-gray-400">Just now</p>
                                    </div>
                                </div>
                                <p className="font-bold text-primary">+10 AdCoins</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col animate-fade-in pb-20">
                        {completedAchievements.length > 0 && (
                            <>
                                <h2 className="text-lg font-bold mb-4">Completed</h2>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {completedAchievements.map((item) => (
                                        <div key={item.id} className="flex flex-col items-center gap-3 rounded-xl bg-surface-dark p-4 border border-white/5">
                                            <div className="relative">
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                                                    <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>{item.icon}</span>
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary border-2 border-surface-dark">
                                                    <span className="material-symbols-outlined text-background-dark text-base font-bold">check</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className="text-sm text-center font-bold text-white">{item.title}</p>
                                                <p className="text-xs text-center text-gray-400 mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <h2 className="text-lg font-bold mb-4">In Progress</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {inProgressAchievements.map((item) => (
                                <div key={item.id} className="flex flex-col items-center gap-3 rounded-xl bg-surface-dark p-4 border border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                    <div className="relative">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-700/50">
                                            <span className="material-symbols-outlined text-gray-400 text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>{item.icon}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-sm text-center font-bold text-white">{item.title}</p>
                                        <p className="text-xs text-center text-gray-400 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;