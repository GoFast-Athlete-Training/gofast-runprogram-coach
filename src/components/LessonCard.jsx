import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Calendar } from 'lucide-react';

const LessonCard = ({ workout }) => {
  const navigate = useNavigate();

  if (!workout) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No workout scheduled for this week</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/workout')}>
      <CardHeader>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4 mb-4 border-2 border-white/30">
          <p className="text-2xl font-bold text-white mb-2">Character Focus</p>
          <p className="text-3xl font-extrabold text-white">{workout.weekFocus || workout.title}</p>
        </div>
        <CardTitle className="text-2xl">{workout.title}</CardTitle>
        <CardDescription className="text-orange-100">
          {workout.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5" />
          <span>{workout.date}</span>
        </div>
        {workout.goal && (
          <div className="mb-4">
            <p className="text-lg font-semibold">Goal: {workout.goal}</p>
          </div>
        )}
        <Button
          variant="outline"
          className="bg-white text-orange-500 hover:bg-orange-50"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/workout');
          }}
        >
          View Full Workout Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;

