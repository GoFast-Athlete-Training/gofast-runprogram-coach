import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Roster from './pages/Roster';
import Workout from './pages/Workout';
import Report from './pages/Report';
import HeadCoach from './pages/HeadCoach';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/report" element={<Report />} />
        <Route path="/headcoach" element={<HeadCoach />} />
      </Routes>
    </Router>
  );
}

export default App;

