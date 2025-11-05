import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import AttendanceTable from '../components/AttendanceTable.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Calendar, Search } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Attendance = () => {
  const navigate = useNavigate();
  const { coachData, roster, loading } = useHydrateCoach();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('bgr_coach_auth');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Expand roster to ~10 kids for demo
  const allAthletes = [
    ...(roster || []),
    { id: '6', name: 'River Martinez', age: 10, grade: '5th', site: 'Discovery' },
    { id: '7', name: 'Skyler Chen', age: 11, grade: '6th', site: 'Discovery' },
    { id: '8', name: 'Phoenix Taylor', age: 9, grade: '4th', site: 'Hydrate' },
    { id: '9', name: 'Sage Johnson', age: 10, grade: '5th', site: 'Hydrate' },
    { id: '10', name: 'Rowan Davis', age: 11, grade: '6th', site: 'Discovery' },
  ].slice(0, 10);

  const filteredRoster = allAthletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current date for session
  const today = new Date();
  const sessionDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isHeadCoach={coachData?.role === 'headcoach'} />
      <div className="flex-1 flex flex-col">
        <Header
          coachName={coachData?.name || 'Coach'}
          isHeadCoach={coachData?.role === 'headcoach'}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <p>Mark attendance for this week's session</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">{sessionDate}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Search Athletes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {filteredRoster.length} Athlete{filteredRoster.length !== 1 ? 's' : ''}
              </CardTitle>
              <CardDescription>
                Mark attendance for each athlete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceTable athletes={filteredRoster} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Attendance;

