import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Workout = () => {
  const navigate = useNavigate();
  const { coachData, currentWorkout, loading } = useHydrateCoach();

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
          <main className="flex-1 container mx-auto px-4 py-8">
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex">
        <Sidebar isHeadCoach={coachData?.role === 'headcoach'} />
        <div className="flex-1 flex flex-col">
          <Header
            coachName={coachData?.name || 'Coach'}
            isHeadCoach={coachData?.role === 'headcoach'}
            onLogout={handleLogout}
          />
          <main className="flex-1 container mx-auto px-4 py-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl">{currentWorkout.title}</CardTitle>
                <CardDescription className="text-lg">{currentWorkout.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{currentWorkout.date}</span>
                  </div>
                  {currentWorkout.goal && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Goal</h3>
                      <p className="text-gray-700">{currentWorkout.goal}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Workout Plan</h3>
                  <div className="space-y-4">
                    {currentWorkout.workout?.map((exercise, index) => (
                      <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                        <h4 className="font-semibold">{exercise.name}</h4>
                        {exercise.description && (
                          <p className="text-gray-600 text-sm">{exercise.description}</p>
                        )}
                        {exercise.reps && (
                          <p className="text-gray-500 text-xs mt-1">Reps: {exercise.reps}</p>
                        )}
                        {exercise.exercises && (
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-2 ml-2">
                            {exercise.exercises.map((ex, i) => (
                              <li key={i}>{ex}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {currentWorkout.discussion && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">{currentWorkout.discussion.topic}</h3>
                    <div className="space-y-4">
                      <p className="text-gray-700">{currentWorkout.discussion.example}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 italic">"{currentWorkout.discussion.story}"</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold">Definitions:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li><strong>Dependability:</strong> {currentWorkout.discussion.definitions.dependability}</li>
                          <li><strong>Loyalty:</strong> {currentWorkout.discussion.definitions.loyalty}</li>
                        </ul>
                      </div>
                      <p className="text-sm text-gray-600">{currentWorkout.discussion.notes}</p>
                    </div>
                  </div>
                )}

                {currentWorkout.homeAssignment && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Home Assignment</h3>
                    <p className="text-gray-700">{currentWorkout.homeAssignment}</p>
                  </div>
                )}

                {currentWorkout.instructorNotes && currentWorkout.instructorNotes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Coach Instructions</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {currentWorkout.instructorNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Workout;

