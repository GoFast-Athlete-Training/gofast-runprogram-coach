import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Workout = () => {
  const navigate = useNavigate();
  const { coachData, currentWorkout, loading } = useHydrateCoach();
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

  if (!currentWorkout) {
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
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No workout scheduled for this week</p>
              </CardContent>
            </Card>
          </main>
        </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">This Week's Workout</h1>
            <p className="text-gray-600">
              Lesson plan and exercise breakdown
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{currentWorkout.title}</CardTitle>
              <CardDescription className="text-lg">{currentWorkout.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{currentWorkout.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{currentWorkout.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{currentWorkout.location}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Workout Plan</h3>
                <div className="space-y-4">
                  {currentWorkout.workout?.map((exercise, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Duration: {exercise.duration} | Reps: {exercise.reps || 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {currentWorkout.focusAreas?.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {currentWorkout.notes && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Coach Notes</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{currentWorkout.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Workout;

