import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LeaderboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // Mock data with Telegram handles
    const topUsers = [
        { rank: 1, name: '@crypto_whale', role: 'Level 10 - Ad King', score: 25000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWidh6iotKY7zuc9UzhgvbIrmVxzh584ETGD2UQ_NbT8H1TebnJFyB8e5ceQHU3f0h9pBKAhzDt5sBJp8ptkUTJOXmJukBdUvhgGdhPdjbO-hkBoz1eSAWHXLu6bdMWWAk-fB-IXiyIQaPlR5cHHDMA2gCZ4QZnLZCqqJgUbDmPeqZ_VcvdQEUHzusfKgfeT8pQZDHSxFoVv18r1DqqpxbToBHS16Lz4FkAFcgk_YACN0EfSeIidMvsA6UALKL8ojVFYNVUrjjeC8X' },
        { rank: 2, name: '@daily_earner', role: 'Level 8 - Ad Master', score: 18500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkKYb0preKvyzloPWS-SRBkjqhdjmtQv1qLAd6mRyzEqzKO1Ym3J53GaIsgj2dYtvSYQTs2lTsocxlUnIRx2WrmZho4TC1qrQk4TKB3ZK5HAw5pC4JVXUA2CDRqY-vcAjkb5z1_X6cWU3fyQz39jFfX23aw50IrBmb68_vcrs8mpsMhZAyBdgYgZzjX6TncCyiqCCNbEWquE5KiztCIkK9MiLIixUbO1ySlq2v3wjmpiUfRsqiUFMVeZW3ysWviyHSvziCZ8DWPGdM' },
        { rank: 3, name: '@lucky_charm', role: 'Level 7 - Elite', score: 15200, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-ZUSgSAfR-Jmr-H0vnrJmSTQ5K4H-aa60T19i3omUGbG2lPUrj4gchNJHAu253ubBPL8IUbJ4iLqcgAdIvWnZkzmZyTZUP7qPicsdHV7ixQ3_XjfT7xmgAouu0CxjO7Zc1SbzHBpKKNA9TGXKZC8vDIV2JlvkKSGOwEPjgvId44Up3Y9UmIK4gTp65YSUA-vGWvX-umtBX5u2xWNjM9GbqyRkyK_xze6qgTe1RAWIB5MhY7hCP796BmfVygbujMfvzIWiTnGS-Ki' },
    ];

    const otherUsers = [
        { rank: 4, name: '@ad_surfer', role: 'Level 5 - Ad Captain', score: 9000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT7WGyEyCkZxswtLUFeoDhPQnBwuO5jmVdD1mKzIJA5w089aW_7JoiCgT_1WR0dsBoWh9lV750Jynd75NXY7yk5SaeFRCPQm6TQopxreO7OsnoNbOP2-StOytuhBKrNDtjxYx0ZG-B0Iw3-fFAKNWGiz4stKCXNEqco3ojdNbxNhGRE35UBHu7xD7d9T_khCUUmEN0gHQ_bX8lF08d3s9h1h69-URjGzBwYADEAq7nEmzUTU_vpsA4UzQhvBTeX2vklw-yspdIZyG9' },
        { rank: 5, name: '@coin_hunter', role: 'Level 5 - Ad Captain', score: 8750, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdgkovGegNOOGCXGrVTXkaNglV5xvJnJ9R1pwQyklArIJ_hRQPe7_Q8uUuM0wcgl2rCiUzNR05J6-jO3d-SsfO9BXpYaxpZHLc0Im-55ipb25kpaA_AoUTu5wkVziJIdkkqi1nHTVSWoNlwXevaDZEYVGt3pqDytCTxD9_0DMi0tD0o9-yzl0Jcf6rjAUAeVNImKBx9bqE0V1fgmsdNN6vm8a2g6zy_vTHMqJi7nOSM1bVWaoQpDpLjbEkEl_v1R7M_vSOldIgvDN2' },
        { rank: 6, name: '@reward_seeker', role: 'Level 4 - Ad Enthusiast', score: 8500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvBofNG7qdS-2hWjeIlVfncBLgYXWao-DRfuYO_yYcbL3FsGX3sWPj1ooEPE9Bh-fj4yLW5c1EKxTwwZc9nohfgQ7bVoF_MSTDRkvtSQm4cGATjHyIgPYB1uk92dVvphSj_9OkyEXjPR3WD55sRYLMxc-jQeCQrGtX5t3Vha6TCPUnmXuxfho0XBtWfRtxZvgVxC3Ko-pVSyUCgu0bVfEqSox7NdZ7i2QmHj9HT346RJ-mziNHxzhQwywGg2Rz7Ez2eSqGQ36f33Th' },
        { rank: 7, name: '@fast_clicker', role: 'Level 3 - Viewer', score: 8200, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDy8GD9cKKHACG0j0we6E0DS1Oa7uZTbdWVGlYvnoXO6TRIiELW2ys7FlxexwjF4kFgT4LAEKdKYO8CykVw4tdVNOspe6GB0aCaUDg2aPlErmcnaNk1TQCrfZq7WVDBH99cxADAtSO3mqhAzO8Gu22rfqh8JssfBQnqvgowJl1i2OcGBpvq9F-HvWOaGGAKCsT2B3aMoEsamvkSrSlZ4jLTFjOj9CEbEYxGNrSnUE3xavroOkIr2Z1_brrmB-HlTMSpzwjj6IfagkM' },
    ];

    return (
        <div className="relative flex flex-col w-full h-full font-display">
            <header className="sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md pt-4 pb-2">
                <div className="flex items-center px-4 mb-4">
                    <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="flex-1 text-center text-xl font-bold tracking-tight pr-10">Leaderboard</h1>
                </div>
                <div className="flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary/20 px-5 text-sm font-bold text-primary border border-primary/20">All Time</button>
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-surface-dark px-5 text-sm font-medium text-gray-400 border border-white/5">This Week</button>
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-surface-dark px-5 text-sm font-medium text-gray-400 border border-white/5">Today</button>
                </div>
            </header>

            <main className="flex-1 px-4 pb-32">
                <div className="grid grid-cols-3 items-end gap-2 pb-8 pt-6">
                    {/* Rank 2 */}
                    <div className="flex flex-col items-center gap-2 order-1">
                        <div className="relative group">
                            <div className="h-20 w-20 rounded-full border-4 border-silver bg-cover bg-center shadow-[0_0_15px_rgba(192,192,192,0.3)]" style={{backgroundImage: `url("${topUsers[1].img}")`}}></div>
                            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-silver text-lg font-bold text-background-dark border-2 border-background-dark">2</div>
                        </div>
                        <p className="mt-1 max-w-[100px] truncate text-sm font-bold text-white">{topUsers[1].name}</p>
                        <div className="flex items-center gap-1 bg-surface-dark px-2 py-0.5 rounded-md">
                            <span className="material-symbols-outlined text-xs text-primary" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                            <p className="text-xs font-bold text-gray-300">{topUsers[1].score.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Rank 1 */}
                    <div className="flex flex-col items-center gap-2 order-2 -mt-4">
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold animate-bounce">
                                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>crown</span>
                            </div>
                            <div className="h-24 w-24 rounded-full border-4 border-gold bg-cover bg-center shadow-[0_0_20px_rgba(255,215,0,0.4)]" style={{backgroundImage: `url("${topUsers[0].img}")`}}></div>
                            <div className="absolute -bottom-2 -right-0 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-xl font-bold text-background-dark border-2 border-background-dark">1</div>
                        </div>
                        <p className="mt-1 max-w-[120px] truncate text-base font-bold text-white text-gold">{topUsers[0].name}</p>
                        <div className="flex items-center gap-1 bg-surface-dark px-2 py-0.5 rounded-md border border-gold/20">
                            <span className="material-symbols-outlined text-sm text-gold" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                            <p className="text-sm font-bold text-gold">{topUsers[0].score.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Rank 3 */}
                    <div className="flex flex-col items-center gap-2 order-3">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full border-4 border-bronze bg-cover bg-center shadow-[0_0_15px_rgba(205,127,50,0.3)]" style={{backgroundImage: `url("${topUsers[2].img}")`}}></div>
                            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-bronze text-lg font-bold text-background-dark border-2 border-background-dark">3</div>
                        </div>
                        <p className="mt-1 max-w-[100px] truncate text-sm font-bold text-white">{topUsers[2].name}</p>
                        <div className="flex items-center gap-1 bg-surface-dark px-2 py-0.5 rounded-md">
                            <span className="material-symbols-outlined text-xs text-primary" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                            <p className="text-xs font-bold text-gray-300">{topUsers[2].score.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {otherUsers.map(item => (
                        <div key={item.rank} className="flex items-center gap-4 rounded-xl bg-surface-dark p-3 border border-white/5">
                            <div className="w-8 text-center text-lg font-semibold text-gray-500">{item.rank}</div>
                            <div className="aspect-square h-12 w-12 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${item.img}")`}}></div>
                            <div className="flex-1 flex-col justify-center">
                                <p className="line-clamp-1 text-base font-bold text-white">{item.name}</p>
                                <p className="line-clamp-2 text-xs font-medium text-gray-400">{item.role}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-gray-400" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                                <p className="text-base font-bold text-white">{item.score.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Sticky User Stat (Above Bottom Nav) */}
            <div className="fixed bottom-[80px] left-0 right-0 z-20 px-4 max-w-md mx-auto">
                <div className="flex items-center gap-4 rounded-xl border-2 border-primary bg-surface-darker/90 backdrop-blur-md p-3 shadow-2xl">
                    <div className="w-8 text-center text-lg font-bold text-primary">128</div>
                    <div className="aspect-square h-12 w-12 rounded-full bg-cover bg-center border border-white/10" style={{backgroundImage: `url("${user.avatar}")`}}></div>
                    <div className="flex-1 flex-col justify-center">
                        <p className="line-clamp-1 text-base font-bold text-white">{user.handle}</p>
                        <p className="line-clamp-2 text-xs font-medium text-gray-400">Level {user.level} - {user.levelName}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>toll</span>
                        <p className="text-base font-bold text-primary">{user.balance.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardScreen;