import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display">
      <div className="flex h-full w-full flex-1 flex-col justify-between p-4 pt-12">
        <div className="flex flex-col items-center flex-1 justify-center">
          <h1 className="text-[#F5F5F5] tracking-tight text-[32px] font-bold leading-tight pt-6 pb-2 text-center">
            AdCoins
          </h1>
          
          {/* Hero Image */}
          <div className="flex w-full max-w-xs grow py-8 justify-center items-center">
            <img 
              className="w-48 h-48 object-contain drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6o-I8vMJuzmv4sVpU5puyjh89ZwPD6qXhgs7nmt2fy8cwKyVadyX2djiux47fJCoZZH_XSEMYgVJBpe-sH3Kh3qcRjUGgG8DkmsKN7g318cxzCJabXQTpLjogWFV807X3IIH1bDaOGhf1_xb9xO-3C0ewlhH0fKqbvohiaFwGX8qh0QYLOe-OQuIa1Dzytf4xlXbTlAx4ojoUR_9HU6qEeZPQ3M5S875b-GzhYvAfGTGoqnpnZPcnaFpynEevnCbSvVqfy85dHT7_"
              alt="AdCoins Hero"
            />
          </div>

          <h2 className="text-[#F5F5F5] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pt-2 pb-2">
            Your Ad Rewards Start Here
          </h2>
          
          <p className="text-[#A0A0A0] text-base font-normal leading-normal pb-6 px-4 text-center max-w-sm">
            Earn crypto rewards for every ad you watch and level up for even greater benefits.
          </p>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: 'play_circle', title: 'Watch & Earn', desc: 'Earn AdCoins for every ad you view.' },
              { icon: 'trending_up', title: 'Level Up', desc: 'Unlock more rewards as you advance.' },
              { icon: 'group', title: 'Invite Friends', desc: 'Get bonuses for bringing friends.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-1 gap-3 rounded-lg border border-[#395356] bg-black/20 p-4 flex-col items-center text-center backdrop-blur-sm">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-3xl">
                  {item.icon}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#F5F5F5] text-base font-bold leading-tight">{item.title}</h3>
                  <p className="text-[#A0A0A0] text-sm font-normal leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full pt-8 pb-4">
          <button 
            onClick={() => navigate('/home')}
            className="flex w-full items-center justify-center rounded-lg bg-primary py-4 px-6 text-center text-base font-bold text-background-dark shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Earning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;