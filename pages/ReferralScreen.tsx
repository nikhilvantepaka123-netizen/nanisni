import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ReferralScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    
    // Pull-to-refresh state
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullY, setPullY] = useState(0);
    const startY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        const scrollContainer = containerRef.current?.closest('.overflow-y-auto');
        if (scrollContainer && scrollContainer.scrollTop <= 0) {
            startY.current = e.touches[0].clientY;
        } else {
            startY.current = 0;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startY.current === 0 || isRefreshing) return;
        
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;
        
        if (diff > 0) {
             // Add resistance to the pull
             setPullY(Math.pow(diff, 0.8) * 0.5); 
        }
    };

    const handleTouchEnd = () => {
        if (pullY > 60) {
            setIsRefreshing(true);
            setPullY(60); // Snap to loading position
            
            // Simulate API refresh
            setTimeout(() => {
                setIsRefreshing(false);
                setPullY(0);
            }, 2000);
        } else {
            setPullY(0);
        }
        startY.current = 0;
    };

    return (
        <div 
            ref={containerRef}
            className="relative flex flex-col w-full min-h-screen bg-background-dark font-sans"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="sticky top-0 z-20 flex items-center bg-background-dark/95 p-4 backdrop-blur-sm border-b border-white/5">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors hover:bg-white/15">
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold tracking-wide">Referral Program</h1>
                <div className="w-10"></div>
            </div>

            {/* Refresh Indicator */}
            <div 
                className="absolute top-16 left-0 right-0 flex justify-center items-center pointer-events-none transition-transform duration-300 z-10"
                style={{ 
                    transform: `translateY(${pullY - 50}px)`,
                    opacity: pullY > 10 ? 1 : 0 
                }}
            >
                <div className="flex size-10 items-center justify-center rounded-full bg-surface-dark border border-primary shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <span className={`material-symbols-outlined text-primary ${isRefreshing ? 'animate-spin' : ''}`} style={{transform: `rotate(${pullY * 2}deg)`}}>
                        refresh
                    </span>
                </div>
            </div>

            <main 
                className="flex flex-col gap-8 px-4 pb-8 pt-6 transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${pullY}px)` }}
            >
                <section className="text-center animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <h2 className="text-2xl font-bold leading-tight">Invite Friends,</h2>
                    <h2 className="text-2xl font-bold leading-tight text-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">Earn More AdCoins!</h2>
                </section>

                <section className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex flex-col gap-1 rounded-2xl bg-surface-dark p-4 border border-white/5 shadow-lg group hover:border-primary/30 transition-colors">
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Friends</p>
                        <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{user.referralCount}</p>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl bg-surface-dark p-4 border border-white/5 shadow-lg group hover:border-primary/30 transition-colors">
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Earned</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-3xl font-bold text-primary group-hover:scale-105 transition-transform origin-left">{user.referralEarnings.toLocaleString()}</p>
                        </div>
                    </div>
                </section>

                {/* Progress Bar Section */}
                <section className="rounded-2xl bg-surface-dark p-5 border border-white/5 shadow-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <div className="flex justify-between items-end mb-2">
                        <p className="text-sm font-bold text-white">Next Reward: Silver Tier</p>
                        <p className="text-xs font-medium text-primary">{user.referralCount}/20 Friends</p>
                    </div>
                    <div className="h-3 w-full rounded-full bg-background-dark overflow-hidden">
                        <div 
                            className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary animate-grow-right shadow-[0_0_10px_rgba(0,229,255,0.5)]" 
                            style={{ width: `${Math.min((user.referralCount / 20) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-xs text-zinc-400">Invite {Math.max(20 - user.referralCount, 0)} more friends to unlock a <span className="text-white font-bold">500 AdCoin Bonus</span>.</p>
                </section>

                <section className="rounded-2xl bg-surface-dark p-5 text-center border border-white/5 shadow-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Unique Referral Link</p>
                    <div className="my-4 flex items-center gap-2 rounded-xl bg-background-dark p-3 border border-white/5 group hover:border-white/10 transition-colors">
                        <p className="flex-1 truncate text-left text-sm text-zinc-300 font-mono">adcoin.app/ref/{user.handle.replace('@', '').toUpperCase()}123</p>
                        <button className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary active:bg-primary/30 transition-colors hover:bg-primary/30">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                    </div>
                    <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary text-base font-bold text-black hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]">
                        <span className="material-symbols-outlined">share</span>
                        <span className="truncate">Share Your Link</span>
                    </button>
                </section>

                <section className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    <h3 className="text-xl font-bold mb-4">Your Referral Tree</h3>
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-surface-dark p-6 text-center border border-white/5 relative overflow-hidden min-h-[220px]">
                        {/* Animated Connecting Lines */}
                        <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-0.5 bg-primary/30 animate-grow-down origin-top shadow-[0_0_5px_rgba(0,229,255,0.2)]" style={{height: '64px', animationDelay: '0.6s', '--target-height': '64px'} as React.CSSProperties}></div>
                        
                        {/* Horizontal Line */}
                        <div className="absolute top-[134px] left-1/2 -translate-x-1/2 bg-primary/30 animate-grow-right shadow-[0_0_5px_rgba(0,229,255,0.2)]" style={{width: '60%', height: '2px', animationDelay: '1s'}}></div>
                        
                        {/* Vertical Drops */}
                        <div className="absolute top-[134px] left-[20%] w-0.5 bg-primary/30 animate-grow-down origin-top" style={{height: '32px', animationDelay: '1.4s', '--target-height': '32px'} as React.CSSProperties}></div>
                        <div className="absolute top-[134px] right-[20%] w-0.5 bg-primary/30 animate-grow-down origin-top" style={{height: '32px', animationDelay: '1.4s', '--target-height': '32px'} as React.CSSProperties}></div>

                        {/* You Node */}
                        <div className="relative z-10 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <div className="relative">
                                <img alt="You" className="size-16 shrink-0 rounded-full object-cover ring-4 ring-primary bg-background-dark shadow-[0_0_20px_rgba(0,229,255,0.4)]" src={user.avatar}/>
                                <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background-dark border-2 border-surface-dark">Lvl {user.level}</div>
                            </div>
                            <p className="mt-2 font-bold text-white">You</p>
                        </div>

                        {/* Referrals Placeholder - Since new users have 0 referrals, show placeholders with transparency or a message */}
                        <div className="relative z-10 flex justify-between w-full mt-8 px-4 opacity-30 grayscale">
                             <div className="flex flex-col items-center">
                                <div className="size-12 shrink-0 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600"></div>
                                <p className="mt-1 text-sm font-medium">?</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="size-12 shrink-0 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600"></div>
                                <p className="mt-1 text-sm font-medium">?</p>
                            </div>
                             <div className="flex flex-col items-center">
                                <div className="flex size-12 items-center justify-center rounded-full border-2 border-dashed border-primary/50 text-sm font-bold text-primary/70 bg-primary/10">+</div>
                                <p className="mt-1 text-sm font-medium text-zinc-400">Invite</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <h3 className="text-xl font-bold mb-4">How It Works</h3>
                    <div className="flex flex-col gap-6">
                        {[
                            { step: '1. SHARE YOUR LINK', desc: 'Send your unique link to friends.', icon: 'share' },
                            { step: '2. FRIENDS JOIN', desc: 'Friends who sign up through your link become your direct referrals.', icon: 'group_add' },
                            { step: '3. EARN REWARDS', desc: 'You earn a percentage of the AdCoins your friends earn from watching ads.', icon: 'paid' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:rotate-12">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-white">{item.step}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                    <h3 className="text-xl font-bold mb-4">Your Referrals</h3>
                    {user.referralCount === 0 ? (
                         <div className="rounded-2xl bg-surface-dark p-8 border border-white/5 text-center flex flex-col items-center gap-2">
                             <span className="material-symbols-outlined text-4xl text-gray-500">group_off</span>
                             <p className="text-gray-400">You haven't invited anyone yet.</p>
                             <button className="text-primary text-sm font-bold mt-2">Start Inviting Now</button>
                         </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                             <div className="flex w-full items-center gap-3 rounded-2xl bg-surface-dark p-3 border border-white/5">
                                <div className="flex-1">
                                    <p className="font-semibold text-white">Sample Friend</p>
                                    <p className="text-xs font-medium text-primary">Active</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ReferralScreen;