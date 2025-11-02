import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReportForm from '../components/ReportForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { FileText } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach';

const Report = () => {
  const navigate = useNavigate();
  const { coachData, roster, loading } = useHydrateCoach();
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

  const handleSubmit = (report) => {
    console.log('Report submitted:', report);
    // In production, this would send to backend
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Feedback Report</h1>
            <p className="text-gray-600">
              Submit feedback for athletes (1-10 rating + notes)
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>About Feedback Reports</span>
              </CardTitle>
              <CardDescription>
                Provide detailed feedback for each athlete after this week's session. 
                Ratings are on a 1-10 scale, and notes are visible to parents after 24 hours.
              </CardDescription>
            </CardHeader>
          </Card>

          <ReportForm athletes={roster || []} onSubmit={handleSubmit} />
        </main>
      </div>
    </div>
  );
};

export default Report;

