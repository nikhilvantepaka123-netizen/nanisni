import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import BottomNav from './components/BottomNav';
import LoadingScreen from './pages/LoadingScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import HomeScreen from './pages/HomeScreen';
import TasksScreen from './pages/TasksScreen';
import LeaderboardScreen from './pages/LeaderboardScreen';
import ProfileScreen from './pages/ProfileScreen';
import ReferralScreen from './pages/ReferralScreen';
import AirdropScreen from './pages/AirdropScreen';

const AppContent = () => {
  const location = useLocation();
  
  // Define routes that should show the bottom navigation
  const showBottomNavRoutes = ['/home', '/tasks', '/leaderboard', '/profile'];
  const shouldShowBottomNav = showBottomNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-display overflow-x-hidden max-w-md mx-auto shadow-2xl relative">
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/tasks" element={<TasksScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/referral" element={<ReferralScreen />} />
          <Route path="/airdrop" element={<AirdropScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </UserProvider>
  );
};

export default App;