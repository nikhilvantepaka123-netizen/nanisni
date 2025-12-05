import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AirdropScreen: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 240,
    hours: 18,
    minutes: 36,
    seconds: 52
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden p-4 font-display">
      <div className="flex items-center justify-end pb-2">
        <button 
          onClick={() => navigate('/home')}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#F0F0F0] hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center pt-2 pb-24 animate-fade-in">
        <div className="text-center">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight text-[#F0F0F0] animate-fade-in-up">
            AdCoin Airdrop Coming Soon!
          </h1>
          <p className="mt-2 max-w-sm text-base font-normal leading-normal text-gray-400 mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            The official crypto of our rewards ecosystem is launching soon.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-md items-center justify-center rounded-2xl bg-surface-dark border border-white/5 px-4 py-8 text-center shadow-[0_0_30px_rgba(0,229,255,0.15)] relative overflow-hidden group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="flex items-center justify-around w-full relative z-10">
            {Object.entries(timeLeft).map(([unit, value], index, arr) => (
              <React.Fragment key={unit}>
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-bold leading-tight tracking-tighter text-primary tabular-nums animate-pulse-bright" style={{animationDuration: '3s'}}>
                    {value.toString().padStart(2, '0')}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase leading-normal tracking-wider text-gray-400">
                    {unit}
                  </p>
                </div>
                {index < arr.length - 1 && <div className="text-4xl font-bold text-primary/50 -mt-4 animate-pulse">:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-md text-left">
          <h3 className="text-xl font-bold leading-tight text-[#F0F0F0] mb-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>Frequently Asked Questions</h3>
          <div className="flex flex-col gap-3">
            {[
              { q: 'What is AdCoin?', a: 'AdCoin is the official cryptocurrency of our rewards ecosystem, allowing you to own, trade, and use your rewards both inside and outside the app.' },
              { q: 'How do I participate?', a: 'Simply be an active user of the app. All eligible users will receive an allocation of AdCoins automatically when we launch.' },
              { q: 'Is it free?', a: 'Yes! The airdrop is completely free for all our valued users as a thank you for your support.' }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="rounded-xl border border-white/5 bg-surface-dark p-4 animate-fade-in-up hover:border-primary/30 transition-colors duration-300"
                style={{animationDelay: `${0.4 + (i * 0.1)}s`}}
              >
                <h4 className="text-base font-bold text-[#F0F0F0]">{faq.q}</h4>
                <p className="mt-1 text-sm font-normal text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirdropScreen;