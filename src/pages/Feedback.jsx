import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Star, ArrowLeft, Check } from 'lucide-react';
import { useHydrateCoach } from '../hooks/useHydrateCoach.js';

const Feedback = () => {
  const navigate = useNavigate();
  const { coachData, roster, loading } = useHydrateCoach();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [feedbackData, setFeedbackData] = useState({});
  const [submittedAthletes, setSubmittedAthletes] = useState(new Set());

  // Mock data for Discovery and Hydrate sites - expand roster to ~10 kids
  const allAthletes = [
    ...(roster || []),
    { id: '6', name: 'River Martinez', age: 10, grade: '5th', site: 'Discovery' },
    { id: '7', name: 'Skyler Chen', age: 11, grade: '6th', site: 'Discovery' },
    { id: '8', name: 'Phoenix Taylor', age: 9, grade: '4th', site: 'Hydrate' },
    { id: '9', name: 'Sage Johnson', age: 10, grade: '5th', site: 'Hydrate' },
    { id: '10', name: 'Rowan Davis', age: 11, grade: '6th', site: 'Discovery' },
  ].slice(0, 10);

  const handleLogout = () => {
    localStorage.removeItem('bgr_coach_auth');
    navigate('/');
  };

  const categoryLabels = {
    effort: 'Effort',
    attitude: 'Attitude',
    performance: 'Performance',
    listening: 'Listening',
    workingWithOthers: 'Working with Others'
  };

  const handleFeedbackChange = (athleteId, category, value) => {
    setFeedbackData(prev => ({
      ...prev,
      [athleteId]: {
        ...prev[athleteId],
        [category]: value
      }
    }));
  };

  const handleCommentChange = (athleteId, comment) => {
    setFeedbackData(prev => ({
      ...prev,
      [athleteId]: {
        ...prev[athleteId],
        comments: comment
      }
    }));
  };

  const handleSubmit = (athleteId) => {
    const feedback = feedbackData[athleteId];
    if (!feedback || !feedback.comments) {
      alert('Please add a comment before submitting feedback.');
      return;
    }

    // Save to localStorage (demo)
    const existingReports = JSON.parse(localStorage.getItem('bgr_reports') || '[]');
    existingReports.push({
      athleteId,
      ...feedback,
      date: new Date().toISOString(),
    });
    localStorage.setItem('bgr_reports', JSON.stringify(existingReports));

    setSubmittedAthletes(prev => new Set([...prev, athleteId]));
    setSelectedAthlete(null);
  };

  const renderStars = (rating, athleteId, category, onChange) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
        onClick={() => onChange(athleteId, category, i + 1)}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (selectedAthlete) {
    const athlete = allAthletes.find(a => a.id === selectedAthlete);
    const feedback = feedbackData[selectedAthlete] || {};
    const isSubmitted = submittedAthletes.has(selectedAthlete);

    // Get current week info
    const currentWeek = 7;
    const weekFocus = 'Dependability & Loyalty';
    const today = new Date();
    const sessionDate = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
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
          <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedAthlete(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Athletes
            </Button>

            <Card className="mb-6 border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Give Feedback: {athlete.name}</CardTitle>
                <CardDescription className="text-orange-100">
                  Week {currentWeek}: {weekFocus} • {sessionDate}
                </CardDescription>
                <CardDescription className="text-orange-100">
                  {athlete.age} years old • {athlete.grade} • {athlete.site || 'Your Site'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-green-600">Feedback submitted!</p>
                    <p className="text-gray-600 mt-2">Parents will see this after 24 hours</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-700">{label}</span>
                              <span className="text-sm font-semibold text-orange-600">
                                {feedback[key] || 0}/5
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {renderStars(
                                feedback[key] || 0,
                                selectedAthlete,
                                key,
                                handleFeedbackChange
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Coach Comments</h3>
                      <p className="text-sm text-gray-500 mb-2">These comments will be visible to parents after 24 hours</p>
                      <textarea
                        value={feedback.comments || ''}
                        onChange={(e) => handleCommentChange(selectedAthlete, e.target.value)}
                        className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                        placeholder="Add your observations, progress notes, and recommendations..."
                      />
                    </div>

                    <Button
                      onClick={() => handleSubmit(selectedAthlete)}
                      className="w-full"
                      size="lg"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                )}
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
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Give Feedback</h1>
            <p className="text-gray-600">
              Provide feedback for athletes after this week's session
            </p>
          </div>

          <div className="space-y-4">
            {allAthletes.map((athlete) => {
              const isSubmitted = submittedAthletes.has(athlete.id);
              return (
                <Card
                  key={athlete.id}
                  className={`cursor-pointer hover:shadow-lg transition-all border-2 ${
                    isSubmitted
                      ? 'border-green-300 bg-green-50'
                      : 'hover:border-orange-300'
                  }`}
                  onClick={() => !isSubmitted && setSelectedAthlete(athlete.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {athlete.name}
                          {isSubmitted && (
                            <Check className="w-5 h-5 text-green-500 inline-block ml-2" />
                          )}
                        </CardTitle>
                        <CardDescription>
                          {athlete.age} years old • {athlete.grade} • {athlete.site || 'Your Site'}
                        </CardDescription>
                      </div>
                      {isSubmitted ? (
                        <span className="text-green-600 font-semibold">Feedback Submitted</span>
                      ) : (
                        <Button variant="outline">Give Feedback</Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;

