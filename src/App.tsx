import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainMenu } from './pages/MainMenu';
import { MatchDetails } from './pages/MatchDetails';
import { LeaderboardDetails } from './pages/LeaderboardDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
        <Route path="/leaderboard/:leaderboardId" element={<LeaderboardDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;