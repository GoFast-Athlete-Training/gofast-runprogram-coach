import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import LessonCard from '../components/LessonCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Activity, FileText } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach';

const Dashboard = () => {
  const navigate = useNavigate();
  const { coachData, currentWorkout, roster, stats, loading } = useHydrateCoach();
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

  const isHeadCoach = coachData?.role === 'headcoach';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isHeadCoach={isHeadCoach} />
      <div className="flex-1 flex flex-col">
        <Header
          coachName={coachData?.name || 'Coach'}
          isHeadCoach={isHeadCoach}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach's Corner</h1>
            <p className="text-gray-600">
              Weekly overview and quick stats
            </p>
          </div>

          <div className="mb-6">
            <LessonCard workout={currentWorkout} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/roster')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Athletes</CardTitle>
                <CardDescription>{stats?.totalAthletes || roster?.length || 0} registered</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/workout')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <CardTitle>Workout Plan</CardTitle>
                <CardDescription>View this week's lesson</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/report')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <CardTitle>Feedback Reports</CardTitle>
                <CardDescription>{stats?.reportsSubmitted || 0} submitted this week</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {isHeadCoach && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/headcoach')}>
              <CardHeader>
                <CardTitle>Head Coach HQ</CardTitle>
                <CardDescription>Manage all sites and view program-wide stats</CardDescription>
              </CardHeader>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

