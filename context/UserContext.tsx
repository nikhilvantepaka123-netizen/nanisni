import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserState {
  balance: number;
  xp: number;
  level: number;
  levelName: string;
  maxXp: number;
  streak: number;
  completedTasks: string[];
  avatar: string;
  name: string;
  handle: string;
  referralCount: number;
  referralEarnings: number;
}

interface UserContextType {
  user: UserState;
  addCoins: (amount: number) => void;
  completeTask: (taskId: string, reward: number) => void;
  updateAvatar: (newAvatar: string) => void;
}

const defaultUser: UserState = {
  balance: 0,
  xp: 0,
  level: 1,
  levelName: "Novice",
  maxXp: 100,
  streak: 0,
  completedTasks: [],
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAApV6Hw2mOmbLAhx2hMMzAW9AKkICNnkYJa1TMGgPeWkezNm2f1hcNyJRQyqNG3UFHPhY2LHRXpaXUCDyFVVy40txe9zj10qsubacPS4S1Ue_b8yRQ2HmKEf7QjBkfBemw7hgDPE4aUdjJtcykgkgDNrtj1EWsRVISa6vZF4VFEEfGEhs_mGdvYXuRyLCgoyUsC35Izo1bzBZb0hoSmog8EXEZ_GqW__olEv85QhkCfZ5UpwVrey5KJNpntx3Mc_CUZRzgqQ9ik0Vw",
  name: "Telegram User",
  handle: "@user",
  referralCount: 0,
  referralEarnings: 0
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(defaultUser);

  useEffect(() => {
    // Check if running inside Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      const tgUser = tg.initDataUnsafe.user;
      setUser(prev => ({
        ...prev,
        name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
        handle: tgUser.username ? `@${tgUser.username}` : prev.handle,
      }));
    }
  }, []);

  const addCoins = (amount: number) => {
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
  };

  const completeTask = (taskId: string, reward: number) => {
    if (user.completedTasks.includes(taskId)) return;
    
    setUser(prev => ({
      ...prev,
      balance: prev.balance + reward,
      completedTasks: [...prev.completedTasks, taskId],
      xp: Math.min(prev.xp + 10, prev.maxXp) // Mock XP gain
    }));
  };

  const updateAvatar = (newAvatar: string) => {
    setUser(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <UserContext.Provider value={{ user, addCoins, completeTask, updateAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};