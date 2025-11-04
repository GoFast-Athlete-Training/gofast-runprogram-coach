import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import LessonCard from '../components/LessonCard.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Users, Activity, FileText, MessageSquare } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { coachData, currentWorkout, roster, stats, loading } = useHydrateCoach();

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

          {currentWorkout && (
            <div className="mb-6 bg-orange-500 text-white py-3 px-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold">{currentWorkout.school || 'Your Site'}</h2>
            </div>
          )}

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
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/feedback')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <CardTitle>Give Feedback</CardTitle>
                <CardDescription>Provide feedback to athletes</CardDescription>
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

