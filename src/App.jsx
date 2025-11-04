import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import pages
import Welcome from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roster from './pages/Roster.jsx';
import Workout from './pages/Workout.jsx';
import Report from './pages/Report.jsx';
import Feedback from './pages/Feedback.jsx';
import HeadCoach from './pages/HeadCoach.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/report" element={<Report />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/headcoach" element={<HeadCoach />} />
      </Routes>
    </Router>
  );
}

export default App;

