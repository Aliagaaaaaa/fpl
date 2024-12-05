import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainMenu } from './pages/MainMenu';
import { MatchDetails } from './pages/MatchDetails';
import { LeaderboardDetails } from './pages/LeaderboardDetails';
import { HubProvider } from './contexts/HubContext';

function App() {
  return (
    <HubProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/match/:matchId" element={<MatchDetails />} />
          <Route path="/leaderboard/:leaderboardId" element={<LeaderboardDetails />} />
        </Routes>
      </BrowserRouter>
    </HubProvider>
  );
}

export default App;