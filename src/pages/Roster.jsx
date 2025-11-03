import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import AttendanceTable from '../components/AttendanceTable.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Users, Search } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Roster = () => {
  const navigate = useNavigate();
  const { coachData, roster, loading } = useHydrateCoach();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('bgr_coach_auth');
    if (!auth) {
      navigate('/');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bgr_coach_auth');
    navigate('/');
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const filteredRoster = roster?.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Athlete Roster</h1>
            <p className="text-gray-600">
              Manage attendance for this week's session
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
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

export default Roster;

