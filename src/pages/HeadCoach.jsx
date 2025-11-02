import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BroadcastForm from '../components/BroadcastForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Crown, Users, Activity, TrendingUp, Building } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach';

const HeadCoach = () => {
  const navigate = useNavigate();
  const { coachData, headCoachStats, loading } = useHydrateCoach();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('bgr_coach_auth');
    if (!auth) {
      navigate('/');
      return;
    }
    const parsed = JSON.parse(auth);
    if (parsed.role !== 'headcoach') {
      navigate('/dashboard');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bgr_coach_auth');
    navigate('/');
  };

  const handleBroadcast = (broadcast) => {
    console.log('Broadcast sent:', broadcast);
    // In production, this would send to backend
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const stats = headCoachStats || {
    totalSites: 3,
    totalCoaches: 8,
    totalAthletes: 45,
    attendanceRate: 92,
    reportsSubmitted: 38
  };

  const sites = [
    { id: '1', name: 'Downtown Site', coaches: 3, athletes: 15 },
    { id: '2', name: 'North Site', coaches: 2, athletes: 18 },
    { id: '3', name: 'South Site', coaches: 3, athletes: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isHeadCoach={true} />
      <div className="flex-1 flex flex-col">
        <Header
          coachName={coachData?.name || 'Head Coach'}
          isHeadCoach={true}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <Crown className="w-8 h-8 text-orange-500" />
              <span>Head Coach HQ</span>
            </h1>
            <p className="text-gray-600">
              Program-wide overview and management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <CardTitle>{stats.totalSites}</CardTitle>
                <CardDescription>Total Sites</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>{stats.totalCoaches}</CardTitle>
                <CardDescription>Active Coaches</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <CardTitle>{stats.totalAthletes}</CardTitle>
                <CardDescription>Registered Athletes</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <CardTitle>{stats.attendanceRate}%</CardTitle>
                <CardDescription>Attendance Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Overview</CardTitle>
                <CardDescription>All program sites and their stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sites.map((site) => (
                    <div key={site.id} className="border-b pb-4 last:border-0">
                      <h4 className="font-semibold mb-1">{site.name}</h4>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{site.coaches} coaches</span>
                        <span>{site.athletes} athletes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <BroadcastForm onSend={handleBroadcast} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HeadCoach;

